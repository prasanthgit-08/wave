import React, { useState } from "react";
import LoadingIcon from "../../../common/LoadingIcon";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import PlantReleaseTestFooter from "./PlantReleaseTestFooter";
import Header from "../../../common/Header";
import { useDispatch, useSelector } from "react-redux";
import { resetChanges, setTestFile } from "../../../../redux/CustomerPlantReleasesSlice";

const PlantReleaseTest = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const testFile = useSelector((state) => state.customerPlantReleaseReducer.testFile);

  // Check if a file is selected
  const hasFile = testFile && testFile.fileName;

  const handleFileChange = (event) => {
    const input = event.target;
    const file = input.files && input.files[0];
    if (!file) return;
    dispatch(setTestFile({ file, fileName: file.name, fileURL: URL.createObjectURL(file) }));
    input.value = "";
  };

  const removeFile = () => {
    dispatch(setTestFile(null));
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <QuarterScreenWrapper>
      <Header
        closeNavigationURL={`/customer-plant-release-browse`}
        confirmClose
        closeModalTitle="Close Plant Release Maintenance"
        closeModalBody="Please confirm you want to close and go back to browse page"
        closeConfirmationHandler={() => {
          dispatch(resetChanges());
        }}
      />
      {loading && <LoadingIcon />}
      <div className="w-100 p-1">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100 m-t-125">
              <Row className="m-0 p-10">
                <Col xs={11}>
                  <Form.Group className="form-group align-items-center row m-l-50 m-r-0 mb-3">
                    <Col xs={2} className="p-0">
                      <Form.Label className="customColFormLabel">File To Be Processed</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0 d-flex position-relative">
                      <input
                        type="text"
                        className="customFormControl"
                        readOnly
                        placeholder={!hasFile ? "No file selected" : ""}
                        value={hasFile ? "" : ""}
                      />
                      {hasFile && (
                        <a
                          href={testFile.fileURL}
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
                          {testFile.fileName}
                        </a>
                      )}
                      {hasFile && (
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
                        onClick={triggerFileInput}
                      >
                        Browse
                      </button>
                      <input
                        type="file"
                        id="fileInput"
                        accept=".csv, .txt, .xlsx"
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
      <PlantReleaseTestFooter />
    </QuarterScreenWrapper>
  );
};

export default PlantReleaseTest;
