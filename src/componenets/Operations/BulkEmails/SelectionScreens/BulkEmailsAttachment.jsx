import React, { useEffect, useRef, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addFiles, removeFile } from "../../../../redux/Operations/BulkEmailSlice";

const BulkEmailsAttachment = () => {
  const dispatch = useDispatch();
  const uploadList = useSelector((state) => state.bulkEmails.uploadList);
  const process = useSelector((state) => state.bulkEmails.process);

  const [selectedFiles, setSelectedFiles] = useState([]); // Temporarily selected files
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Allowed file types
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/bmp",
      "image/svg+xml",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "text/plain",
      "application/zip",
      "application/x-rar-compressed",
      "application/x-7z-compressed",
      "audio/mpeg",
      "audio/wav",
      "video/mp4",
      "video/x-msvideo",
      "video/x-matroska",
      "video/quicktime",
      "video/x-flv",
      "video/x-ms-wmv",
      "application/x-msdownload",
      "application/octet-stream",
      "application/x-iso9660-image",
    ];
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      alert("Some files were rejected due to invalid file type.");
    }

    setSelectedFiles(validFiles);
  };

  const handleAddFiles = () => {
    if (selectedFiles.length === 0) return;

    const filePromises = selectedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // Read file as a Blob
        reader.readAsArrayBuffer(file);

        reader.onload = () => {
          const blob = new Blob([reader.result], { type: file.type });

          resolve({
            file: file, // Original File object
            name: file.name,
            url: URL.createObjectURL(file), // Temporary preview URL
            blob: blob, // Store as Blob
          });
        };

        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(filePromises)
      .then((filesWithBlobs) => {
        dispatch(addFiles(filesWithBlobs)); // Store in Redux
        setSelectedFiles([]); // Clear temporary selection
      })
      .catch((error) => console.error("Error reading files:", error));
  };

  const handleRemoveFile = (fileName) => {
    if (process === "New") {
      dispatch(removeFile(fileName)); // Remove from Redux store

      // Remove from selectedFiles state as well
      setSelectedFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));

      // Reset file input to allow reselecting the same file
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div>
      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label p-l-15">File Name</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0 d-flex">
          <input
            type="file"
            multiple
            accept=".png,.jpg,.jpeg,.gif,.bmp,.svg,.pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.txt,.zip,.rar,.7z,.tar,.mp3,.wav,.mp4,.avi,.mkv,.mov,.flv,.wmv,.exe,.dmg,.iso"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            disabled={process !== "New"}
          />
          <input
            type="text"
            className={`customFormControl p-l-15`}
            value={selectedFiles.map((file) => file.name).join(", ")}
            placeholder="No file selected"
            readOnly
            disabled={process !== "New"}
          />
        </Col>
        <Col sm={2} md={2} xs={2} className="p-0 p-l-15" style={{ width: "130px" }}>
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            onClick={handleButtonClick}
            type="button"
            disabled={process !== "New"}
          >
            Browse
          </button>
        </Col>
        <Col sm={2} md={2} xs={2} className="p-0 p-l-15">
          <button
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            onClick={handleAddFiles}
            type="button"
            disabled={process !== "New" || selectedFiles?.length < 1}
          >
            Add
          </button>
        </Col>
      </Form.Group>

      <Form.Group className="form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label "></Form.Label>
        </Col>
        <Col className="p-0" style={{ height: "170px" }}>
          <Col
            xs={8}
            className="customDropzone customDropzoneDisabledBulkEmails"
            style={{
              width: "440px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              textAlign: "left",
            }}
          >
            <ul style={{ padding: "0", margin: "0", listStyle: "none", cursor: "default" }}>
              {uploadList.map((file, index) => (
                <li
                  key={index}
                  style={{ marginBottom: "5px", display: "flex", alignItems: "center", cursor: "default" }}
                >
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#000", marginRight: "10px", cursor: "pointer" }}
                  >
                    {file.name}
                  </a>
                  <i
                    className="fa-solid fa-xmark"
                    // onClick={() => dispatch(removeFile(file.name))}
                    onClick={() => handleRemoveFile(file.name)}
                    style={{
                      cursor: "pointer",
                      color: "#000",
                      fontSize: "16px",
                    }}
                  />
                </li>
              ))}
            </ul>
          </Col>
        </Col>
      </Form.Group>
    </div>
  );
};

export default BulkEmailsAttachment;
