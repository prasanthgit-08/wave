import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EmailAttachmentService from "../../../../../services/EmailAttachmentService";
import {
  resetChanges,
  resetEmailAttachment,
  setAlternateForm,
  setCheckFormName,
  setDisableSave,
  setDocumentType,
  setDocumentTypeDescriptionId,
  setEmailAttachmentData,
  setEmailAttachmentPK,
  setForm,
  setFormDescriptionId,
  setIsUniqueDescription,
  setOnlyEmailIf,
  setResponseData,
  setViewDetail,
} from "../../../../../redux/EmailAttachmentSlice";
import FormsService from "../../../../../services/FormsService";
import FormsLookup from "../../../../LookupScreens/Forms/FormsLookup";
import DocumentTypeLookup from "../../../../LookupScreens/DocumentType/DocumentTypeLookup";
import DocumentTypeService from "../../../../../services/DocumentTypeService";
import { setLoading } from "../../../../../redux/LookupScreens/FormsLookupSlice";
const FormContent = () => {
  const form = useSelector((state) => state.emailAttachmentReducer.form);
  const onlyEmailIf = useSelector((state) => state.emailAttachmentReducer.onlyEmailIf);
  const alternateForm = useSelector((state) => state.emailAttachmentReducer.alternateForm);
  const emailAttachmentPK = useSelector((state) => state.emailAttachmentReducer.emailAttachmentPK);
  const formDescriptionId = useSelector((state) => state.emailAttachmentReducer.formDescriptionId);
  const documentTypeDescriptionId = useSelector(
    (state) => state.emailAttachmentReducer.documentTypeDescriptionId
  );
  const viewDetail = useSelector((state) => state.emailAttachmentReducer.viewDetail);
  const responseData = useSelector((state) => state.emailAttachmentReducer.responseData);

  const [formDescriptions, setFormDescriptions] = useState([]);
  const [formDescription, setFormDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [showFormDescriptionLookUp, setShowFormDescriptionLookUp] = useState(false);

  const [DocumentTypeDescriptions, setDocumentTypeDescriptions] = useState([]);
  const [DocumentTypeDescription, setDocumentTypeDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setloading2] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { emailMaintenanceId, id, pageNumber } = useParams();
  const isUniqueDescription = useSelector((state) => state.emailAttachmentReducer.isUniqueDescription);

  const [showDocumentTypeLookUp, setShowDocumentTypeLookUp] = useState(false);

  const fetchRecordById = () => {
    setloading2(true);
    EmailAttachmentService.getEmailAttachmentById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setResponseData(data));
        dispatch(setViewDetail(true));
      })
      .catch((error) => {
        navigate(`/email-attachment/${emailMaintenanceId}/${pageNumber}`);
      })
      .finally(() => setloading2(false));
  };

  useEffect(() => {
    if (id) {
      fetchRecordById();
    }
  }, []);

  useEffect(() => {
    if (responseData) {
      dispatch(setEmailAttachmentPK(responseData.emailAttachmentPK || ""));
      dispatch(setForm(responseData.formDescription?.trim() || ""));
      dispatch(setOnlyEmailIf(responseData.onlyEmailIf?.trim() || ""));
      dispatch(setAlternateForm(responseData.alternateForm?.trim() || ""));
      dispatch(setFormDescriptionId(responseData.formFKInt));
      setFormDescription(responseData.formDescription?.trim());
      setDocumentTypeDescription(responseData.documentTypeDescription?.trim() || "");
      dispatch(setDocumentTypeDescriptionId(responseData.documentTypeFK || ""));
    } else if (responseData === undefined || responseData === null) {
      dispatch(setFormDescriptionId(null));
      dispatch(setDocumentTypeDescriptionId(null));
      setDocumentTypeDescription("");
      setFormDescription("");
      dispatch(resetChanges());
    }
  }, [responseData, viewDetail]);

  const fetchFormDescriptions = (string) => {
    setLoading(true);
    FormsService.getFormsForAuto(string)
      .then((response) => {
        const data = response.data;
        const formDesc = data.content?.map((data) => ({ ...data, description: data.description?.trim() }));
        setFormDescriptions(formDesc);
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchDocumentTypeDescriptions = (string) => {
    setLoading1(true);
    DocumentTypeService.getDocumentTypeForLookup("Beginning", string, 0, "", false)
      .then((response) => {
        const data = response.data;
        const browseData = data.slice(0, data.length - 1);
        const documentTypeDesc = browseData.map((data) => ({
          ...data,
          Description: data.Description?.trim(),
        }));
        const paginationData = data.slice(data.length - 1);
        setDocumentTypeDescriptions(documentTypeDesc);
      })
      .catch((error) => {})
      .finally(() => {
        setLoading1(false);
      });
  };

  const handleUniqueFormDescriptionSelection = (formDesc) => {
    setFormDescription(formDesc.description?.trim());
    dispatch(setFormDescriptionId(formDesc.formPK));
    setShowFormDescriptionLookUp(false);
    setCheckFormName("Form");
    checkUniqueDescription(formDesc.description, "Form", formDesc.formPK);
  };

  const handleDocumentTypeDescriptionSelection = (documentTypeDesc) => {
    setDocumentTypeDescription(documentTypeDesc.Description?.trim());
    dispatch(setDocumentTypeDescriptionId(documentTypeDesc.DocumentTypePK));
    setShowDocumentTypeLookUp(false);
    setCheckFormName("Document");
    checkUniqueDescription(documentTypeDesc.Description, "Document", documentTypeDesc.DocumentTypePK);
  };
  const checkUniqueDescription = (description, type, id) => {
    if (responseData === null || responseData.formDescription?.trim() !== description?.trim()) {
      EmailAttachmentService.checkUniqueFormDescription(emailMaintenanceId, description, type, id)
        .then((response) => {
          dispatch(setIsUniqueDescription(response.data));
        })
        .catch((err) => {
          dispatch(setIsUniqueDescription(false));
        });
    } else {
      dispatch(setIsUniqueDescription(true));
    }
  };

  useEffect(() => {
    if (!alternateForm && formDescriptionId && isUniqueDescription) {
      dispatch(setDisableSave(false));
    } else if (alternateForm) {
      dispatch(setDisableSave(false));
    } else if (documentTypeDescriptionId) {
      dispatch(setDisableSave(false));
    } else {
      dispatch(setDisableSave(true));
    }
  }, [formDescriptionId, isUniqueDescription, alternateForm, documentTypeDescriptionId]);

  useEffect(() => {
    if (!formDescriptionId) {
      dispatch(setIsUniqueDescription(true));
    }
  }, [formDescriptionId]);

  useEffect(() => {
    if (!isUniqueDescription) {
      dispatch(setDisableSave(true));
    }
  }, [isUniqueDescription, alternateForm, fetchDocumentTypeDescriptions]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        {loading2 && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row className="m-0 p-10">
              <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                <Form.Group className="mt-0 align-items  row  m-l-0 m-r-0">
                  <Col xs={2} sm={2} md={2} className="p-0">
                    <Form.Label className="customColFormLabel">Form</Form.Label>
                  </Col>
                  <Col md={5} sm={5} xs={5} className={`p-0 d-flex`}>
                    <AutoCompleteDropdown
                      loading={loading}
                      className={`customFormControl ${
                        viewDetail || alternateForm || DocumentTypeDescription
                          ? ""
                          : formDescriptionId && isUniqueDescription
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      arrayList={formDescriptions}
                      searchString={formDescription}
                      renderItemId={(form) => form.formPK}
                      renderItemField={(form) => form.description}
                      handleSearchString={(string) => {
                        setFormDescription(string);
                      }}
                      selectedId={formDescriptionId}
                      fetchDataBySearchString={fetchFormDescriptions}
                      onSelect={handleUniqueFormDescriptionSelection}
                      clearInputCallback={() => {
                        dispatch(setFormDescriptionId(null));
                      }}
                      disabled={viewDetail || alternateForm || DocumentTypeDescription}
                      maxHeight={"136px"}
                    />
                    <LookupButton
                      onClick={() => {
                        setShowFormDescriptionLookUp(true);
                      }}
                      disabled={viewDetail || alternateForm || DocumentTypeDescription}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className={`mt-3 m-b-10 align-items-center row  m-l-0 m-r-0`}>
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Alternate Form
                    </Form.Label>
                  </Col>

                  <Col xs={8} md={8} className="p-0 me-2">
                    <input
                      name={alternateForm}
                      type="text"
                      className={`customFormControl ${
                        viewDetail === true || formDescription !== "" || DocumentTypeDescription
                          ? ""
                          : alternateForm !== "" && formDescription == "" && isUniqueDescription
                            ? "borderGreen"
                            : alternateForm == "" && formDescription == ""
                              ? "borderRed"
                              : "borderRed"
                      }`}
                      id="alternateForm"
                      value={alternateForm}
                      disabled={viewDetail || formDescription || DocumentTypeDescription}
                      maxLength={60}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        dispatch(setAlternateForm(e.target.value));
                        dispatch(setIsUniqueDescription(true));
                      }}
                      onBlur={() => {
                        setCheckFormName("AlternateForm");
                        checkUniqueDescription(alternateForm, "AlternateForm");
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-4 align-items  row  m-l-0 m-r-0">
                  <Col xs={2} sm={2} md={2} className="p-0">
                    <Form.Label className="customColFormLabel">Document Type</Form.Label>
                  </Col>
                  <Col md={5} sm={5} xs={5} className={`p-0 d-flex`}>
                    <AutoCompleteDropdown
                      loading={loading1}
                      className={`customFormControl ${
                        viewDetail || alternateForm || formDescription
                          ? ""
                          : documentTypeDescriptionId && isUniqueDescription
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      arrayList={DocumentTypeDescriptions}
                      searchString={DocumentTypeDescription}
                      renderItemId={(item) => item.DocumentTypePK}
                      renderItemField={(item) => item.Description}
                      handleSearchString={(string) => {
                        setDocumentTypeDescription(string);
                      }}
                      selectedId={documentTypeDescriptionId}
                      fetchDataBySearchString={fetchDocumentTypeDescriptions}
                      onSelect={handleDocumentTypeDescriptionSelection}
                      clearInputCallback={() => {
                        dispatch(setDocumentTypeDescriptionId(null));
                      }}
                      disabled={viewDetail || alternateForm || formDescription}
                      maxHeight={"136px"}
                    />
                    <LookupButton
                      onClick={() => {
                        setShowDocumentTypeLookUp(true);
                      }}
                      disabled={viewDetail || alternateForm || formDescription}
                      onBlur={() => {
                        checkUniqueDescription(DocumentTypeDescription, "Document");
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col /* sm={2} md={2} */ xs={2} className="p-0">
                    <label className="customColFormLabel p-0 m-b-20">Email Condition</label>
                  </Col>

                  <Col /* sm={10} md={10} */ xs={10} className="p-0">
                    <textarea
                      id="onlyEmailIf"
                      name="onlyEmailIf"
                      cols={20}
                      type="text"
                      className="customFormControl "
                      style={{
                        resize: "none",
                        display: "fixed",
                        height: "200px",
                        minWidth: "610px",
                        boxShadow: "none",
                        fontSize: "12px",
                      }}
                      value={onlyEmailIf}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail}
                      onInput={(e) => {
                        dispatch(setOnlyEmailIf(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <FormsLookup
              show={showFormDescriptionLookUp}
              onHide={() => setShowFormDescriptionLookUp(false)}
              renderItemId={(form) => form.formPK}
              renderItemField={(data) => data.description}
              handleLookupSelection={handleUniqueFormDescriptionSelection}
              MaintenanceProgram
            />

            <DocumentTypeLookup
              show={showDocumentTypeLookUp}
              onHide={() => setShowDocumentTypeLookUp(false)}
              renderItemId={(item) => item.DocumentTypePK}
              renderItemField={(data) => data.Description}
              handleLookupSelection={handleDocumentTypeDescriptionSelection}
              MaintenanceProgram
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContent;
