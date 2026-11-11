import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import CustomDropzone from "../../../../common/CustomDropzone";
import DWTComponent from "../../../../../modules/dwt";
import CustomDropzoneDisabled from "../../../../common/CustomDropzoneDisabled";
import { useDispatch, useSelector } from "react-redux";
import {
  setDelayDamageFiles,
  setDocumentsTabRedisKeys,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayDamageSlice";
import DocumentTypeService from "../../../../../services/DocumentTypeService";
import DocumentTypeLookup from "../../../../LookupScreens/DocumentType/DocumentTypeLookup";
import DelayDamageService from "../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";

const DocumentsEditScreen = () => {
  const dispatch = useDispatch();

  const [isUploadActive, setIsUploadActive] = useState(false);
  const [isScanActive, setIsScanActive] = useState(false);
  const [documentTypeArrayList, setDocumentTypeArrayList] = useState([]);
  const [documentTypeInput, setDocumentTypeInput] = useState("");
  const [documentTypeId, setDocumentTypeId] = useState(null);
  const [showDocumentTypeLookup, setShowDocumentTypeLookup] = useState(false);
  const [description, setDescription] = useState("");
  const [disableProcess, setDisableProcess] = useState(true);

  const { uploadFiles, scanFiles } = useSelector((state) => state.delayDamage.delayDamageFiles);

  const fetchDocumentTypeList = (string) => {
    DocumentTypeService.getDocumentTypeForAutoComplete(string)
      .then((response) => {
        const { data } = response;
        const filteredList = data?.filter((item) => item?.Type !== "Pagination");
        setDocumentTypeArrayList(filteredList || []);
      })
      .catch(() => {});
  };

  const handleDocumentTypeSelection = (item) => {
    setDocumentTypeId(item?.DocumentTypePK);
    setDocumentTypeInput(item?.Description);
    setShowDocumentTypeLookup(false);
  };

  const clearForm = () => {
    setDocumentTypeInput("");
    setDocumentTypeId(null);
    setDescription("");
    dispatch(setDelayDamageFiles({ actionType: "clear" }));
  };

  const handleProcess = () => {
    DelayDamageService.processCacheSave(documentTypeId, description, [...uploadFiles, ...scanFiles])
      .then((response) => {
        dispatch(
          setDocumentsTabRedisKeys({
            actionType: "update",
            payload: response?.data,
          })
        );
      })
      .catch(() => {})
      .finally(() => {
        clearForm();
      });
  };

  // Process Button Validation Save Validation
  useEffect(() => {
    if (
      !isUploadActive &&
      !isScanActive &&
      documentTypeId &&
      description &&
      (uploadFiles?.length || scanFiles?.length)
    ) {
      setDisableProcess(false);
    } else {
      setDisableProcess(true);
    }
  }, [isUploadActive, isScanActive, documentTypeInput, documentTypeId, description, uploadFiles, scanFiles]);

  return (
    <Form /* on={formik.handle} */>
      <div className={"p-10 w-100"}>
        <Row className="m-0 p-0">
          <Col xs={9}>
            <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label">Document Type</Form.Label>
              </Col>

              <Col
                xs={3}
                className={`p-0 d-flex`} /* hidden={shouldHideButton("delayed-details") && viewOnly} */
              >
                <AutoCompleteDropdown
                  arrayList={documentTypeArrayList}
                  searchString={documentTypeInput}
                  renderItemId={(item) => item?.DocumentTypePK}
                  renderItemField={(item) => item?.Description}
                  handleSearchString={(string) => setDocumentTypeInput(string)}
                  fetchDataBySearchString={fetchDocumentTypeList}
                  onSelect={handleDocumentTypeSelection}
                  selectedId={documentTypeId}
                  clearInputCallback={() => setDocumentTypeId(null)}
                  className={documentTypeId ? "borderGreen" : "borderRed"}
                />
                <LookupButton onClick={() => setShowDocumentTypeLookup(true)} />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label">Description</Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0 w-300">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  name="Description"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className={`form-group align-items-center row m-l-0 m-r-0 mb-2 mt-5`}>
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel"></Form.Label>
              </Col>

              <Col xs={1} className="p-0 w-125px">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isUploadActive ? "btn-warning" : uploadFiles?.length ? "btn-success" : "btn-secondary"
                  }`}
                  type="button"
                  onClick={() => setIsUploadActive((state) => !state)}
                  disabled={isScanActive}
                >
                  <i className="fa-solid fa-cloud-arrow-up me-1" />
                  Upload
                </button>
              </Col>
              <Col xs={2} className="p-0">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isScanActive ? "btn-warning" : scanFiles?.length ? "btn-success" : "btn-secondary"
                  }`}
                  type="button"
                  onClick={() => setIsScanActive((state) => !state)}
                  disabled={isUploadActive}
                >
                  <i class="fa-solid fa-expand me-2" />
                  Scan
                </button>
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-4">
              <Col xs={2} className="p-0" />
              <Col xs={10}>
                {/* Drag & Drop Component for Upload */}
                {isUploadActive && (
                  <CustomDropzone
                    files={uploadFiles}
                    setFiles={(files) =>
                      dispatch(setDelayDamageFiles({ actionType: "uploadFiles", payload: files }))
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      uploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                  />
                )}
                {/* Scan Component for scanning documents */}
                {isScanActive && (
                  <DWTComponent
                    files={scanFiles}
                    setFiles={(files) =>
                      dispatch(setDelayDamageFiles({ actionType: "scanFiles", payload: files }))
                    }
                  />
                )}
                {!isUploadActive && !isScanActive && <CustomDropzoneDisabled />}
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row className="m-0 p-0 mt-4">
          <Col xs={9}>
            <Form.Group>
              <Col xs={12} className="d-flex justify-content-end">
                <button
                  className={`btn btn-secondary customButtonMediumWidth btn-sm me-4 mt-4 m-b-5`}
                  type="button"
                  onClick={() => handleProcess()}
                  disabled={disableProcess}
                >
                  Process
                </button>
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {showDocumentTypeLookup && (
        <DocumentTypeLookup
          show={showDocumentTypeLookup}
          onHide={() => setShowDocumentTypeLookup(false)}
          handleLookupSelection={handleDocumentTypeSelection}
          MaintenanceProgram
        />
      )}
    </Form>
  );
};

export default DocumentsEditScreen;
