"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadPage() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  // Upload PDF and extract text
  const onDrop = async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0];

      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/extract-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();

        console.error("API Error:", errorData);

        alert(
          `Error: ${
            errorData.error || "Unknown error occurred"
          }`
        );

        return;
      }

      const data = await response.json();

      setText(data.text);
      setSummary("");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Something went wrong while uploading.");
    }
  };

  // Generate AI Summary
  const generateSummary = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to generate summary");
        setLoading(false);
        return;
      }

      setSummary(data.summary);
      setLoading(false);
    } catch (error) {
      console.error("Summary Error:", error);
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: false,
    });

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">
        Upload Notes
      </h1>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-400 p-10 rounded-xl cursor-pointer hover:bg-gray-50 transition"
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <p className="text-center">
            Drop the PDF here...
          </p>
        ) : (
          <p className="text-center">
            Drag & Drop PDF here or click to upload
          </p>
        )}
      </div>

      {text && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Extracted Text
          </h2>

          <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap overflow-auto max-h-[500px]">
            {text}
          </pre>

          <button
            onClick={generateSummary}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded mt-4"
          >
            {loading
              ? "Generating..."
              : "Generate Summary"}
          </button>

          {summary && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">
                AI Summary
              </h2>

              <pre className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap">
                {summary}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}