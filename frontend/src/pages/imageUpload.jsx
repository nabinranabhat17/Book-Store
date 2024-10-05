import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", "hello this ist");

    try {
      const res = await axios.post(
        "https://book-store-backend-6fgb.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadedFile(res.data);
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
      {uploadedFile && (
        <div>
          <h3>Uploaded File:</h3>
          <p>{uploadedFile}</p>
          <img
            src={`http://localhost:3001/uploads/${uploadedFile}`}
            alt="Uploaded file"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
