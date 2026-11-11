import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import DocumentTypeService from "../../../../../../services/DocumentTypeService";
import {
  setDelayBreakdownDocumentFiles,
  setDocumentsTabRedisKeys,
  setEditDocumentTabValid,
  setRepairPlantFlag,
} from "../../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import BreakdownProcessingService from "../../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../common/LookupButton";
import CustomDropzone from "../../../../../common/CustomDropzone";
import DWTComponent from "../../../../../../modules/dwt";
import CustomDropzoneDisabled from "../../../../../common/CustomDropzoneDisabled";
import DocumentTypeLookup from "../../../../../LookupScreens/DocumentType/DocumentTypeLookup";
import LoadingIcon from "../../../../../common/LoadingIcon";

const Documents = () => {
  const { breakdownFK } = useParams();
  const location = useLocation();
  const isEditMode = location.pathname?.includes("edit");
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");
  const breakdownUnitFK = localStorage.getItem("breakdownUnitFK");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [isUploadActive, setIsUploadActive] = useState(false);
  const [isScanActive, setIsScanActive] = useState(false);
  const [documentTypeArrayList, setDocumentTypeArrayList] = useState([]);
  const [documentTypeInput, setDocumentTypeInput] = useState("");
  const [documentTypeId, setDocumentTypeId] = useState(null);
  const [showDocumentTypeLookup, setShowDocumentTypeLookup] = useState(false);
  const [description, setDescription] = useState("");
  const [processing, setProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { uploadFiles, scanFiles } = useSelector((state) => state.delaybreakdown.delayBreakdownDocumentFiles);
  const delayBreakdownDocumentFiles = useSelector(
    (state) => state.delaybreakdown.delayBreakdownDocumentFiles
  );
  const documentsTabRedisKeys = useSelector((state) => state.delaybreakdown.documentsTabRedisKeys);
  //used for Documenttype lookup
  const { pageNumber, normalSortFlag, selectedSearchCriteria, normalSortValue, searchTerms } = useSelector(
    (state) => state.documentTypeLookup
  );

  //usedto fetch documentttype autocomplete
  const fetchDocumentTypeList = (string) => {
    setIsLoading(true);
    BreakdownProcessingService.getDocumentTypeForAutoComplete(string, breakdownCompanyName, breakdownUnitFK)
      .then((response) => {
        const { data } = response;
        const filteredList = data?.filter(
          (item) => item.Type !== "Pagination" && item.Type !== "plantEnabled"
        );
        setDocumentTypeArrayList(filteredList || []);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
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
    dispatch(setDelayBreakdownDocumentFiles({ actionType: "clear" }));
  };

  const handleProcess = () => {
    setProcessing(true);
    BreakdownProcessingService.processCacheSave(documentTypeId, description, [...uploadFiles, ...scanFiles])
      .then((response) => {
        setIsProcessed(true);
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
        setProcessing(false);
      });
  };

  // Process Button Validation Save Validation
  useEffect(() => {
    if (
      (documentTypeInput && !documentTypeId) ||
      (documentTypeId && !description) ||
      isUploadActive ||
      isScanActive ||
      (documentTypeId && description && uploadFiles?.length === 0 && scanFiles?.length === 0) ||
      (documentTypeId && description && !isProcessed)
    ) {
      dispatch(setEditDocumentTabValid(false));
    } else {
      dispatch(setEditDocumentTabValid(true));
    }
  }, [
    isUploadActive,
    isScanActive,
    documentTypeInput,
    documentTypeId,
    description,
    uploadFiles,
    scanFiles,
    isProcessed,
  ]);

  // Clear files if document type is cleared
  useEffect(() => {
    if (!documentTypeInput) {
      dispatch(setDelayBreakdownDocumentFiles({ actionType: "clear" }));
    }
  }, [documentTypeInput]);

  const documentPayload = {
    selectedSearchCriteria,
    searchTerms,
    pageNumber,
    normalSortFlag,
    normalSortValue,
    breakdownCompanyName,
    breakdownUnitFK,
  };

  return (
    <Form>
      {processing && <LoadingIcon />}
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
                  loading={isLoading}
                  className={documentTypeInput && !documentTypeId ? "borderRed" : ""}
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
                  id="Description"

                  className={`customFormControl ${
                    documentTypeId ? (!description ? "borderRed" : "borderGreen") : ""
                  }`}
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
                    isUploadActive
                      ? "btn-warning"
                      : uploadFiles?.length
                        ? "btn-success"
                        : documentTypeId && !uploadFiles?.length && !scanFiles?.length
                          ? "btn-danger"
                          : "btn-secondary"
                  }`}
                  type="button"
                  onClick={() => setIsUploadActive((state) => !state)}
                  disabled={isScanActive || !documentTypeId}
                >
                  <i className="fa-solid fa-cloud-arrow-up me-1" />
                  Upload
                </button>
              </Col>
              <Col xs={2} className="p-0">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                    isScanActive
                      ? "btn-warning"
                      : scanFiles?.length
                        ? "btn-success"
                        : documentTypeId && !uploadFiles?.length && !scanFiles?.length
                          ? "btn-danger"
                          : "btn-secondary"
                  }`}
                  type="button"
                  onClick={() => setIsScanActive((state) => !state)}
                  disabled={isUploadActive || !documentTypeId}
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
                      dispatch(setDelayBreakdownDocumentFiles({ actionType: "uploadFiles", payload: files }))
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
                      dispatch(setDelayBreakdownDocumentFiles({ actionType: "scanFiles", payload: files }))
                    }
                  />
                )}
                {!isUploadActive && !isScanActive && <CustomDropzoneDisabled invisible />}
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
                  disabled={
                    !(documentTypeId && description && (uploadFiles?.length > 0 || scanFiles?.length > 0)) ||
                    isUploadActive ||
                    isScanActive
                  }
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

          customServiceCallback={() => BreakdownProcessingService.getDocumentTypeForLookup(documentPayload)}
        />
      )}
    </Form>
  );
};

export default Documents;
