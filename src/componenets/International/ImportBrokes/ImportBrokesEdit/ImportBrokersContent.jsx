import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import { useNavigate, useParams } from "react-router-dom";
import LookupButton from "../../../common/LookupButton";
import ImportBrokersService from "../../../../services/ImportBrokersService";

import {
  resetChanges,
  setDescription,
  setName,
  setFormFK,
  setPhone,
  setFax,
  setNotes,
  setDisableSave,
  setEditFormData,
  setId,
  setViewDetail,
  setImportBrokers,
  setFormInput,
  setFormId,
  setFormSelection,
  setFormTypeSelection,
  setFormTypeInput,
  setFormTypeId,
} from "../../../../redux/ImportBrokersSlice";
import { changeLanguage } from "i18next";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import FormTypesLookup from "../../../LookupScreens/FormTypes/FormTypesLookup";
import FormsLookup from "../../../LookupScreens/Forms/FormsLookup";
import FormsService from "../../../../services/FormsService";
import Input from "../../../../components/common/input";

function ImportBrokersContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState([]);
  const [formTypeData, setFormTypeData] = useState([]);
  const formTypeSelection = useSelector((state) => state.importBrokersReducer.formTypeSelection);
  const formSelection = useSelector((state) => state.importBrokersReducer.formSelection);
  const formTypeInput = useSelector((state) => state.importBrokersReducer.formTypeInput);
  const formInput = useSelector((state) => state.importBrokersReducer.formInput);
  const formTypeId = useSelector((state) => state.importBrokersReducer.formTypeId);
  const formFK = useSelector((state) => state.importBrokersReducer.formFK);
  const viewDetail = useSelector((state) => state.importBrokersReducer.viewDetail);
  const description = useSelector((state) => state.importBrokersReducer.description);
  const name = useSelector((state) => state.importBrokersReducer.name);
  const phone = useSelector((state) => state.importBrokersReducer.phone);
  const fax = useSelector((state) => state.importBrokersReducer.fax);
  const notes = useSelector((state) => state.importBrokersReducer.notes);
  const editFormData = useSelector((state) => state.importBrokersReducer.editFormData);
  const changesCancelled = useSelector((state) => state.importBrokersReducer.changesCancelled);
  const [isDescriptionDuplicate, setIsDescriptionDuplicate] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loadingValue, setLoadingValue] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setPhone(formattedPhoneNumber));
  };
  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setFax(formattedPhoneNumber));
  };
  useEffect(() => {
    if (id) {
      setLoader(true);
      ImportBrokersService.getImportBrokersById(id)
        .then((response) => {
          const { data } = response;
          dispatch(setEditFormData(data));
          dispatch(setViewDetail(true));
          setLoader(false);
        })
        .catch((err) => {
          navigate("/import-brokers");
          setLoader(false);
        });
    }
  }, [id]);
  useEffect(() => {
    if (editFormData === null) {
      dispatch(setDescription(""));
      dispatch(setName(""));
      dispatch(setFormFK(""));
      dispatch(setPhone(""));
      dispatch(setFax(""));
      dispatch(setNotes(""));
    }
  }, [editFormData]);
  useEffect(() => {
    if (editFormData != null) {
      dispatch(setDescription(editFormData.description ? editFormData.description : ""));
      dispatch(setName(editFormData.name ? editFormData.name : ""));
      dispatch(setFormFK(editFormData.formFK ? editFormData.formFK : ""));
      setFormValue(editFormData?.formFK);
      dispatch(setPhone(editFormData.phone ? formatPhoneNumber(editFormData.phone) : ""));
      dispatch(setFax(editFormData.fax ? formatPhoneNumber(editFormData.fax) : ""));
      dispatch(setNotes(editFormData.notes ? editFormData.notes : ""));
    }
  }, [editFormData, changesCancelled]);
  useEffect(() => {
    return () => {
      dispatch(setFormFK(""));
      dispatch(setFormTypeId(""));
      dispatch(setFormTypeInput(""));
      dispatch(setFormInput(""));
    };
  }, []);
  //description unique
  const checkUniqueDescription = (description) => {
    ImportBrokersService.checkDescriptionExist(id, description)
      .then((res) => {
        setIsDescriptionDuplicate(res.data);
      })
      .catch((err) => {
        console.log("error");
      });
  };
  useEffect(() => {
    return () => {
      dispatch(setFormTypeInput(""));
      dispatch(setFormInput(""));
    };
  }, []);
  //save validation
  useEffect(() => {
    if (
      name &&
      formFK &&
      phone &&
      phone.length === 14 &&
      phone.match(phoneRegex) &&
      (!fax || fax.length === 14 || fax.match(phoneRegex)) &&
      description &&
      !isDescriptionDuplicate
    ) {
      // enable save if all conditions
      dispatch(setDisableSave(false));
    } else {
      // disable save
      dispatch(setDisableSave(true));
    }
  }, [description, isDescriptionDuplicate, name, formFK, phone, fax]);

  //save object for backend
  useEffect(() => {
    dispatch(
      setImportBrokers({
        importBrokerPK: id,
        description: description,
        name: name,
        phone: phone?.replace(/\s+/g, ""),
        formFK: formFK,
        fax: fax?.replace(/\s+/g, ""),
        notes: notes,
        addUserFK: id ? editFormData?.addUserFK : null,
      })
    );
  }, [description, name, phone, formFK, fax, notes, editFormData]);

  //auto complete formFK
  const fetchForm = (string) => {
    setFormLoading(true);
    FormsService.getFormsForAuto(string)
      .then((response) => {
        const data = response.data;
        const formList = data.content?.map((form) => ({ ...form, description: form.description?.trim() }));
        setFormData(formList);
        setFormLoading(false);
      })
      .catch((err) => {
        setFormLoading(false);
      });
  };
  const setFormValue = (formFK) => {
    if (formFK !== null) {
      // setLoader(true);
      setLoadingValue(true);
      FormsService.getRecord(formFK)
        .then((response) => {
          const data = response.data;
          dispatch(setFormInput(data.description));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          // setLoader(false);
          setLoadingValue(false);
        });
    } else {
      dispatch(setFormInput(""));
    }
  };
  //form type lookup
  const hideFormTypeModal = () => {
    dispatch(setFormTypeSelection(false));
  };
  const handleFormTypeLookupSelection = (data) => {
    dispatch(setFormTypeInput(data.description));
    dispatch(setFormTypeId(data.formTypePK));
    dispatch(setFormTypeSelection(false));
  };
  //form lookup
  const hideFormModal = () => {
    dispatch(setFormSelection(false));
  };
  const handleFormLookupModalShow = () => {
    dispatch(setFormSelection(true));
  };
  const handleFormLookupSelection = (data) => {
    dispatch(setFormInput(data.description));
    dispatch(setFormFK(data.formPK));
    dispatch(setFormSelection(false));
  };
  useEffect(() => {
    if (id) {
      if (!viewDetail) {
        setIsDescriptionDuplicate(false);
      }
    }
  }, [viewDetail]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          {(loader || loadingValue) && (
            <div className="fade modal-backdrop show">
              <div className="pos-center">
                <div className="loader"></div>
              </div>
            </div>
          )}
          <div className="p-15 w-100">
            <Col xs={9} className="ps-3">
              <Form.Group
                className={`mt-1 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
              >
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Description
                  </Form.Label>
                </Col>

                <Col xs={5} md={5} className="p-0 me-2">
                  <Input
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={(e) => {
                      dispatch(setDescription(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                      setIsDescriptionDuplicate(false);
                    }}
                    onBlur={(e) => {
                      checkUniqueDescription(e.target.value);
                    }}
                    disabled={viewDetail}
                    maxLength={30}

                    className={`${styles.formControl} ${
                      !viewDetail
                        ? description && !isDescriptionDuplicate
                          ? "borderGreen"
                          : "borderRed"
                        : ""
                    }`}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
              >
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Name
                  </Form.Label>
                </Col>

                <Col xs={5} md={5} className="p-0 me-2">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    maxLength={30}
                    value={name}
                    onChange={(e) => {
                      dispatch(setName(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                    }}
                    disabled={viewDetail}

                    className={`${styles.formControl} ${!viewDetail ? (name ? "borderGreen" : "borderRed") : ""}`}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
              >
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Form
                  </Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className={`p-0 d-flex`}>
                  <AutoCompleteDropdown
                    className={`${styles.formControl} ${viewDetail ? "" : formFK ? "borderGreen" : "borderRed"}`}
                    arrayList={formData}
                    searchString={formInput}
                    renderItemId={(data) => data.formPK}
                    renderItemField={(data) => data.description}
                    handleSearchString={(string) => dispatch(setFormInput(string))}
                    fetchDataBySearchString={fetchForm}
                    onSelect={handleFormLookupSelection}
                    selectedId={() => {}}
                    disabled={viewDetail}
                    loading={formLoading}
                    clearInputCallback={() => {
                      dispatch(setFormFK(null));
                    }}
                  />
                  <LookupButton onClick={handleFormLookupModalShow} disabled={viewDetail} />
                </Col>
              </Form.Group>

              <Form.Group
                className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
              >
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Phone
                  </Form.Label>
                </Col>

                <Col xs={4} md={2} sm={4} className="p-0" style={{ width: "110px" }}>
                  <Input
                    className={`${styles.formControl} ${
                      !viewDetail
                        ? phone && String(phone).match(phoneRegex)
                          ? "borderGreen"
                          : "borderRed"
                        : ""
                    }`}
                    id="phone"
                    name="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => phoneFormatHandler(e)}
                    disabled={viewDetail}
                    maxLength={14}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
              >
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Fax
                  </Form.Label>
                </Col>

                <Col xs={4} md={2} sm={4} className="p-0" style={{ width: "110px" }}>
                  <Input
                    className={`${styles.formControl} ${
                      !viewDetail ? (!fax || fax?.length === 14 ? "" : "borderRed") : ""
                    }`}
                    id="fax"
                    name="fax"
                    type="text"
                    value={fax}
                    onChange={(e) => faxFormatHandler(e)}
                    disabled={viewDetail}
                    maxLength={14}
                  />
                </Col>
              </Form.Group>
              <Form.Group className={`mt-1 m-b-10 align-items-start row  m-l-0 m-r-0 ${styles.colFormLabel}`}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Notes
                  </Form.Label>
                </Col>

                <Col xs={8} md={8} className="p-0 me-2">
                  <textarea
                    rows={8}
                    cols={10}
                    type="text"
                    className={`${styles.formControl} h-100 `}
                    id="notes"
                    name="notes"
                    value={notes}
                    disabled={viewDetail}
                    onChange={(e) => {
                      dispatch(setNotes(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>
            {/* </div> */}

            <FormTypesLookup
              show={formTypeSelection}
              onHide={hideFormTypeModal}
              renderItemId={(data) => data.formTypePK}
              renderItemField={(data) => data.description}
              handleLookupSelection={handleFormTypeLookupSelection}
              MaintenanceProgram
            />
            <FormsLookup
              show={formSelection}
              onHide={hideFormModal}
              renderItemId={(data) => data.formPK}
              renderItemField={(data) => data.description}
              handleLookupSelection={handleFormLookupSelection}
              MaintenanceProgram
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportBrokersContent;
