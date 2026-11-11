import React from "react";
import { Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setRecipientFile, removeRecipientFile } from "../../../../redux/Operations/BulkEmailSlice";

const BulkEmailsRecipientList = () => {
  const dispatch = useDispatch();
  const process = useSelector((state) => state.bulkEmails.process);
  const recipientFile = useSelector((state) => state.bulkEmails.recipientFile);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      dispatch(setRecipientFile({ file, fileName: file.name, fileURL: URL.createObjectURL(file) }));
      event.target.value = "";
    }
  };

  const removeFile = () => {
    if (process === "New") {
      dispatch(removeRecipientFile());
      const fileInput = document.getElementById("fileInput");
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div>
      <Form.Group className="form-group invisible m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label p-l-15">General Manager</Form.Label>
        </Col>
        <Col xs={1} md={1} sm={1} className="p-0">
          <input type="checkbox" />
        </Col>
      </Form.Group>

      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label p-l-15">Email List</Form.Label>
        </Col>

        {/* Input Field with Hyperlinked File Name */}
        <Col xs={6} md={6} sm={6} className="p-0 d-flex position-relative">
          <input
            type="text"
            className="customFormControl p-l-15 pr-4"
            readOnly
            value={recipientFile ? "" : "No file selected"}
          />
          {recipientFile && (
            <a
              href={recipientFile.fileURL}
              target="_blank"
              rel="noopener noreferrer"
              className="file-link"
              style={{
                position: "absolute",
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
                width: "90%",
                textAlign: "left",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {recipientFile.fileName}
            </a>
          )}
          {recipientFile && (
            <i
              className="fa-solid fa-xmark"
              onClick={removeFile}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "black",
              }}
            />
          )}
        </Col>

        <Col sm={2} md={2} xs={2} className="p-0 p-l-15" style={{ width: "130px" }}>
          <button
            className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            disabled={process !== "New"}
            onClick={triggerFileInput}
          >
            Browse
          </button>
          <input
            type="file"
            id="fileInput"
            accept=".csv, .xlsx, .xls"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Col>
      </Form.Group>
    </div>
  );
};

export default BulkEmailsRecipientList;
