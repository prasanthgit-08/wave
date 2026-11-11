import React, { useRef, useState } from "react";
import {
  setTestFile,
  setCustomerPlantReleaseId,
  setPlantReleaseDescription,
} from "../../../../redux/PlantReleaseSlice";
import { useDispatch } from "react-redux";
import { Form, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import PlantReleaseService from "../../../../services/PlantReleaseService";
import LoadingIcon from "../../../common/LoadingIcon";
const ImportContent = ({ loading, processLoading }) => {
  const dispatch = useDispatch();
  const testFile = useSelector((state) => state.plantReleaseReducer.testFile);
  const customerPlantReleaseId = useSelector((state) => state.plantReleaseReducer.customerPlantReleaseId);
  const plantReleaseDescription = useSelector((state) => state.plantReleaseReducer.plantReleaseDescription);
  const [importArray, setImportArray] = useState([]);
  const [load, setLoad] = useState(false);

  const handleFileChange = (event) => {
    const input = event.target;
    const file = input.files && input.files[0];
    if (!file) return;
    dispatch(setTestFile({ file, fileName: file.name, fileURL: URL.createObjectURL(file) }));
    input.value = "";
  };

  const removeFile = () => {
    dispatch(setTestFile([]));

    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.value = "";
    }
  };
  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  /**
   * Fetch all fetchCustomerPlantReleases
   * Used for CustomerPlantReleases Autocomplete
   */
  const fetchCustomerPlantReleases = (string) => {
    setLoad(true);
    PlantReleaseService.getAllCustomerPlantReleases(string)
      .then((response) => {
        setLoad(false);
        const data = response.data;
        const list = data?.map((pl) => ({ ...pl, Description: pl.Description?.trim() }));
        setImportArray(list);
      })
      .catch((error) => {
        setLoad(false);
      });
  };

  const handleLookupSelection = (item) => {
    dispatch(setCustomerPlantReleaseId(item?.CustomerPlantReleasePK));
    dispatch(setPlantReleaseDescription(item.Description?.trim()));
  };
  return (
    <div className="w-100 p-2">
      {(loading || processLoading) && <LoadingIcon />}
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <div className="p-15 w-100">
          <Row className="m-0 p-10">
            <Col xs={12}>
              <Form.Group className="form-group mt-5  m-b-10 align-items-center row m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0 w-150px">
                  <Form.Label className="customColFormLabel">Import List</Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={importArray}
                    searchString={plantReleaseDescription}
                    loading={load}
                    renderItemId={(item) => item.CustomerPlantReleasePK}
                    renderItemField={(item) => item.Description?.trim()}
                    handleSearchString={(string) => dispatch(setPlantReleaseDescription(string))}
                    fetchDataBySearchString={fetchCustomerPlantReleases}
                    onSelect={handleLookupSelection}
                    clearInputCallback={() => {
                      dispatch(setCustomerPlantReleaseId(null));
                    }}
                    selectedId={customerPlantReleaseId}
                    className={`customFormControl ${
                      customerPlantReleaseId && plantReleaseDescription ? "borderGreen" : "borderRed"
                    }
             `}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="form-group m-t-3 m-b-10 align-items-center row m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0 w-150px">
                  <Form.Label className="customColFormLabel">File To Be Processed</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className="p-0 d-flex position-relative">
                  {/* Display file name */}
                  <input
                    type="text"
                    className="customFormControl p-l-15 pr-4"
                    readOnly
                    value={testFile ? "" : "No file selected"}
                  />
                  {testFile && (
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
                  {testFile && (
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
                    disabled={!customerPlantReleaseId}
                    className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
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
  );
};

export default ImportContent;
