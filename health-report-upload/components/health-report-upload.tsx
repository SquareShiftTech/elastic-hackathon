"use client"

import type React from "react"

import { useState } from "react"
import { FileUp, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export function HealthReportUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === "application/pdf" && selectedFile.size <= 10 * 1024 * 1024) {
        setFile(selectedFile)
        setUploadStatus("idle")
        setErrorMessage("")
      } else {
        setErrorMessage("Please select a PDF file under 10MB")
      }
    }
  }

  const uploadFile = async () => {
    if (!file) return
    setIsUploading(true)
    setUploadProgress(0)
    setUploadStatus("idle")
    setErrorMessage("")

    const formData = new FormData()
    formData.append("file", file)

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 95))
      }, 200)

      const response = await fetch("http://127.0.0.1:5000/upload_pdf", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      setUploadStatus("success")
    } catch (error) {
      setUploadStatus("error")
      setErrorMessage("Failed to upload file. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => document.getElementById("file-upload")?.click()}
          disabled={isUploading}
          className="bg-vibrant-blue hover:bg-vibrant-purple text-white border-none transition-colors duration-300"
        >
          <FileUp className="w-4 h-4 mr-2" />
          Select PDF
        </Button>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <span className="text-sm text-gray-700">{file ? file.name : "No file selected"}</span>
      </div>

      {errorMessage && (
        <Alert variant="destructive" className="bg-red-100 border-red-400 text-red-700">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {isUploading && (
        <Progress
          value={uploadProgress}
          className="w-full h-2 bg-gray-200"
          indicatorClassName="bg-gradient-to-r from-vibrant-blue to-vibrant-purple"
        />
      )}

      {uploadStatus === "success" && (
        <Alert className="bg-green-100 border-green-400 text-green-700">
          <Check className="h-4 w-4" />
          <AlertDescription>Report uploaded successfully!</AlertDescription>
        </Alert>
      )}

      <Button
        onClick={uploadFile}
        disabled={!file || isUploading}
        className="w-full bg-gradient-to-r from-vibrant-green to-vibrant-blue text-white hover:from-vibrant-blue hover:to-vibrant-purple transition-all duration-300"
      >
        {isUploading ? "Uploading..." : "Upload Report"}
      </Button>
    </div>
  )
}

