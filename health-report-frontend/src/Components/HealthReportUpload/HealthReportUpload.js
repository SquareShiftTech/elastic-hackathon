import { useState } from "react";

import "./HealthReportUpload.css";
import { useNavigate } from "react-router-dom";

export const HealthReportUpload = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const userName = localStorage.getItem("userName");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      if (selectedFile.type === "application/pdf" && selectedFile.size <= 10 * 1024 * 1024) {
        setFile(selectedFile);
        setUploadStatus("idle");
        setErrorMessage("");
      } else {
        setErrorMessage("Please select a PDF file under 10MB");
      }
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus("idle");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userName);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 95));
      }, 200);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/upload_pdf`, {
        method: "POST",
        body: formData
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      // Assuming the response is in JSON format
      const data = await response.json();

      setUploadStatus("success");
      navigate(`/video/${data?.data?.patient_id}`);
    } catch (error) {
      setUploadStatus("error");
      setErrorMessage("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="health-report-upload">
      {/* File Input */}
      <div className="file-input-container">
        <button
          className="button button-outline"
          onClick={() => document.getElementById("file-upload").click()}
          disabled={isUploading}>
          Select PDF
        </button>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <span>{file ? file.name : "No file selected"}</span>
      </div>

      {/* Error Message */}
      {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

      {/* Upload Progress Bar */}
      {isUploading && (
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      )}

      {/* Success Message */}
      {uploadStatus === "success" && (
        <div className="alert alert-success">Report uploaded successfully!</div>
      )}

      {/* Upload Button */}
      <button
        onClick={uploadFile}
        disabled={!file || isUploading}
        className="button button-primary">
        {isUploading ? "Uploading..." : "Upload Report"}
      </button>
    </div>
  );
};
