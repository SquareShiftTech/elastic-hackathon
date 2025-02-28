from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pdfplumber
import json
import boto3
from elasticsearch import Elasticsearch
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app, resources={r"/upload_pdf": {"origins": "*"}})

# Function to extract text from PDF
def extract_pdf_text(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
    return text

# Function to load prompt from a file and format it dynamically
def load_prompt(pdf_text):
    with open("prompt_template.txt", "r") as file:
        prompt_template = file.read()
    
    # Replace placeholders with dynamic values
    return prompt_template.format(
        timestamp=get_current_timestamp(),
        auto_id=str(uuid.uuid4()),
        pdf_text=pdf_text
    )

# Function to get the current timestamp in ISO 8601 format
def get_current_timestamp():
    return datetime.now().isoformat() + "Z" # Adds the 'Z' to indicate UTC timezone

# Initialize Bedrock and Elasticsearch clients
bedrock_runtime = boto3.client('bedrock-runtime', region_name='ap-south-1', aws_access_key_id="$ACCESS_KEY",
        aws_secret_access_key="$SECRET_KEY")
es = Elasticsearch(
    ['https://ss-pet-store.es.us-central1.gcp.cloud.es.io:9243'],
    basic_auth=('logstash_user', '123456')
)

# Define inference profile
inference_profile_id = 'apac.anthropic.claude-3-5-sonnet-20241022-v2:0'

@app.route('/upload_pdf', methods=['POST'])
def upload_pdf():
    try:
        # Ensure that file is present in the request
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400
        
        # Save the file temporarily
        file_path = f"/tmp/{file.filename}"
        file.save(file_path)
        
        print(f"File saved to {file_path}")
        
        # Extract text from the uploaded PDF
        pdf_text = extract_pdf_text(file_path)
        print(f"Extracted text: {pdf_text[:500]}...")  # Log a snippet of the extracted text for debugging

        # Function to get the current timestamp in ISO 8601 format
        def get_current_timestamp():
            return datetime.now().isoformat() + "Z" # Adds the 'Z' to indicate UTC timezone
        
        # Define the prompt with the required structure, now with the dynamic timestamp
        timestamp = get_current_timestamp()

        # Generate a unique ID
        auto_id = str(uuid.uuid4())

        # Load the formatted prompt
        prompt = load_prompt(pdf_text)
        # Define the prompt for the model
        
        body = {
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 2000,
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }
        
        # Invoke the Bedrock model
        response = bedrock_runtime.invoke_model(
            modelId=inference_profile_id,
            body=json.dumps(body).encode('utf-8')
        )
        
        # Process the raw response from Bedrock
        raw_response = response['body'].read().decode('utf-8')
        print(f"Raw response from Bedrock: {raw_response}")
        
        # Check if raw response is empty or malformed
        if not raw_response:
            return jsonify({"error": "Empty or malformed response from Bedrock"}), 500
        
        # Parse the response and check if valid JSON
        try:
            model_output = json.loads(raw_response)
            print(f"Parsed Bedrock response: {json.dumps(model_output, indent=4)}")

            # Extract the JSON content from the model's response
            json_data = model_output["content"][0]["text"]
            extracted_data = json.loads(json_data)
            
            # Ingest data into Elasticsearch
            es_response = es.index(index='medical_records', body=extracted_data, id=auto_id)
            print(f"Data ingested into Elasticsearch: {es_response['result']}")
            
            return jsonify({"message": "File processed successfully", "data": extracted_data}), 200

        except json.JSONDecodeError:
            print("Error: Response could not be parsed as JSON.")
            return jsonify({"error": "Invalid JSON format in model response"}), 500
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
