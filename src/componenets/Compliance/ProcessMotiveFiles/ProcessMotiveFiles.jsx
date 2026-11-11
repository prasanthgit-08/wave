import React, { useRef, useState } from "react";
import QuarterScreenWrapper from "../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../common/Header";
import { Col, Form, Row } from "react-bootstrap";
import CommonFooter from "../../common/CommonFooter";
import CustomRadioGroup from "../../common/CustomRadioGroup";
import ProcessMotiveService from "../../../services/Compliance/ProcessMotiveService";
import toast from "react-hot-toast";
import LoadingIcon from "../../common/LoadingIcon";

const ProcessMotiveFiles = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [processRadio, setProcessRadio] = useState("Logs");
  const [process, setProcess] = useState("New");
  const [recipientFile, setRecipientFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const input = event.target;
    const file = input.files && input.files[0];
    if (!file) return;
    setRecipientFile({ file, fileName: file.name, fileURL: URL.createObjectURL(file) });
    input.value = ""; // clear AFTER extracting
  };

  const removeFile = () => {
    if (process === "New") {
      setRecipientFile(null);
      const fileInput = document.getElementById("fileInput");
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const handleProcess = () => {
    setLoading(true);
    ProcessMotiveService.postProcessMotive(recipientFile?.file, processRadio)
      .then((response) => {
        const data = response?.data;
        if (data.errorCode === 1) {
          toast.error(data.errorMessage);
        } else {
          toast.success(data.errorMessage);
        }
      })
      .catch(() => {})
      .finally(() => {
        setRecipientFile(null);
        setProcessRadio("Logs");
        setLoading(false);
      });
  };

  const footerButtons = [{ label: "Process", onClick: () => handleProcess(), disabled: !recipientFile }];

  return (
    <QuarterScreenWrapper>
      <Header />
      {loading && <LoadingIcon />}
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col xs={11}>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-5">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Process</Form.Label>
                    </Col>

                    <Col xs={1} className="p-0">
                      <CustomRadioGroup
                        horizontal
                        options={["Logs", "Drivers"]}
                        selectedOption={processRadio}
                        onChange={(value) => setProcessRadio(value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Motive Spreadsheet</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0 d-flex position-relative">
                      {/* Display file name */}
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

                    <Col className="ms-2">
                      <button
                        type="button"
                        className="btn btn-secondary customButtonMediumWidth btn-sm"
                        disabled={process !== "New"}
                        onClick={triggerFileInput}
                      >
                        Browse
                      </button>
                      <input
                        type="file"
                        id="fileInput"
                        accept=".csv"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <CommonFooter buttons={footerButtons} />
    </QuarterScreenWrapper>
  );
};

export default ProcessMotiveFiles;
