import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Col, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AutoCompleteDropdown from "../../common/AutoCompleteDropdown";
import LookupButton from "../../common/LookupButton";
import {
  setAllowmultiunit,
  setAllowonthirtyfive,
  setDescriptionLong,
  setDescriptionShort,
  setEditFormData,
  setFormId,
  setFormInput,
  setFormSelection,
  setFormTypeId,
  setFormTypeInput,
  setFormTypeSelection,
  setIsDescriptionUnique,
  setIsUnitCodeUnique,
  setLength,
  setOverwidth,
  setOverwidthformtypefk,
  setRequireseld,
  setRequiresflagsandsigns,
  setSpecialinstruction,
  setType,
  setUnitCode,
  setUnitTypePK,
  setViewDetail,
  setAllowPopup,
  setAllowOnTruckCamperTrailor,
} from "../../../redux/UnitTypeSlice";

import UnitTypeService from "../../../services/UnitTypeService";
import FormTypesLookup from "../../LookupScreens/FormTypes/FormTypesLookup";
import FormsLookup from "../../LookupScreens/Forms/FormsLookup";
import FormsService from "../../../services/FormsService";
import FormTypesService from "../../../services/FormTypesService";
import CustomRadioGroup from "../../common/CustomRadioGroup";
import LoadingIcon from "../../common/LoadingIcon";

function UnitTypeContent({ styles }) {
  const { id } = useParams();
  const [formData, setFormData] = useState([]);
  const [formTypeData, setFormTypeData] = useState([]);
  const [descriptionLoading, setDescriptionLoading] = useState(false);
  const [ptiLoading, setPtiLoading] = useState(false);
  const [overWidthLoading, setOverWidthLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editFormData = useSelector((state) => state.unitTypeReducer.editFormData);

  const viewDetail = useSelector((state) => state.unitTypeReducer.viewDetail);
  const unitCode = useSelector((state) => state.unitTypeReducer.unitCode);
  const descriptionShort = useSelector((state) => state.unitTypeReducer.descriptionShort);
  const descriptionLong = useSelector((state) => state.unitTypeReducer.descriptionLong);
  const length = useSelector((state) => state.unitTypeReducer.length);
  const overwidth = useSelector((state) => state.unitTypeReducer.overwidth);
  const specialinstruction = useSelector((state) => state.unitTypeReducer.specialinstruction);
  const allowmultiunit = useSelector((state) => state.unitTypeReducer.allowmultiunit);
  const allowonthirtyfive = useSelector((state) => state.unitTypeReducer.allowonthirtyfive);
  const requiresflagsandsigns = useSelector((state) => state.unitTypeReducer.requiresflagsandsigns);
  const requireseld = useSelector((state) => state.unitTypeReducer.requireseld);
  const formTypeSelection = useSelector((state) => state.unitTypeReducer.formTypeSelection);
  const formSelection = useSelector((state) => state.unitTypeReducer.formSelection);
  const formTypeInput = useSelector((state) => state.unitTypeReducer.formTypeInput);
  const formInput = useSelector((state) => state.unitTypeReducer.formInput);
  const formTypeId = useSelector((state) => state.unitTypeReducer.formTypeId);
  const formId = useSelector((state) => state.unitTypeReducer.formId);
  const isUnitCodeUnique = useSelector((state) => state.unitTypeReducer.isUnitCodeUnique);
  const allowPopup = useSelector((state) => state.unitTypeReducer.allowPopup);
  const allowOnTruckCamperTrailor = useSelector((state) => state.unitTypeReducer.allowOnTruckCamperTrailor);

  const isDescriptionUnique = useSelector((state) => state.unitTypeReducer.isDescriptionUnique);
  const type = useSelector((state) => state.unitTypeReducer.type);

  window.addEventListener("popstate", () => {
    dispatch(setIsUnitCodeUnique(true));
    dispatch(setIsDescriptionUnique(true));
  });

  const fetchRecord = (id) => {
    setLoading(true);
    dispatch(setEditFormData(null));
    UnitTypeService.getRecord(id)
      .then((res) => {
        if (res.data) {
          dispatch(setEditFormData(res.data));
          dispatch(setViewDetail(true));
        } else {
          navigate(`/unit-type`);
        }
      })
      .catch((err) => {
        navigate(`/unit-type`);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //form lookup code
  const hideFormModal = () => {
    dispatch(setFormSelection(false));
  };
  const handleFormLookupModalShow = () => {
    dispatch(setFormSelection(true));
  };
  const handleFormLookupSelection = (data) => {
    dispatch(setFormInput(data.description));
    dispatch(setFormId(data.formPK));
    dispatch(setFormSelection(false));
  };
  //form type lookup
  const hideFormTypeModal = () => {
    dispatch(setFormTypeSelection(false));
  };
  const handleFirmTypeLookupModalShow = () => {
    dispatch(setFormTypeSelection(true));
  };
  const handleFormTypeLookupSelection = (data) => {
    dispatch(setFormTypeInput(data.description));
    dispatch(setFormTypeId(data.formTypePK));
    dispatch(setFormTypeSelection(false));
  };
  //auto
  const fetchForm = (string) => {
    setPtiLoading(true);
    FormsService.getFormsForAuto(string)
      .then((response) => {
        const data = response.data;
        const formList = data.content?.map((form) => ({ ...form, description: form.description?.trim() }));
        setFormData(formList);
      })
      .catch((err) => {})
      .finally(() => {
        setPtiLoading(false);
      });
  };

  const fetchFormType = (string) => {
    setOverWidthLoading(true);
    FormTypesService.getFormsTypeForAuto(string)
      .then((response) => {
        const data = response.data;
        const foemTypeList = data.content?.map((form) => ({
          ...form,
          description: form.description?.trim(),
        }));
        setFormTypeData(foemTypeList);
      })
      .catch((err) => {})
      .finally(() => {
        setOverWidthLoading(false);
      });
  };

  const setFormTypeValue = (formTypeId) => {
    if (formTypeId) {
      setOverWidthLoading(true);
      FormTypesService.getRecord(formTypeId)
        .then((response) => {
          const data = response.data;
          dispatch(setFormTypeInput(data?.description?.trim()));
          dispatch(setFormTypeId(data.formTypePK));
        })
        .finally(() => setOverWidthLoading(false));
    } else {
      dispatch(setFormTypeInput(""));
      dispatch(setFormTypeId(null));
    }
  };

  const setPTIFormValue = (formId) => {
    if (formId) {
      setPtiLoading(true);
      FormsService.getRecord(formId)
        .then((response) => {
          const data = response.data;
          dispatch(setFormInput(data?.description?.trim()));
          dispatch(setFormId(data.formPK));
        })
        .finally(() => {
          setPtiLoading(false);
        });
    } else {
      dispatch(setFormInput(""));
      dispatch(setFormId(null));
    }
  };

  //validation

  const hanldeCheckUnitCode = (string) => {
    if (unitCode !== "" || id) {
      UnitTypeService.checkUnitCodeExist(id, unitCode)
        .then((res) => {
          dispatch(setIsUnitCodeUnique(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const hanldeCheckDescription = (string) => {
    if (descriptionLong !== "" || id) {
      UnitTypeService.checkDescriptionExist(id, descriptionLong)
        .then((res) => {
          dispatch(setIsDescriptionUnique(res.data));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    }
  };

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setUnitTypePK(editFormData.unitTypePK ? editFormData.unitTypePK : ""));

      dispatch(setUnitCode(editFormData.unitCode ? editFormData.unitCode?.trim() : ""));
      setFormTypeValue(editFormData?.overWidthFormTypeFK);
      setPTIFormValue(editFormData?.ptiFormFK);
      dispatch(
        setDescriptionShort(editFormData.descriptionShort ? editFormData.descriptionShort?.trim() : "")
      );
      dispatch(setDescriptionLong(editFormData.descriptionLong ? editFormData.descriptionLong?.trim() : ""));
      dispatch(setLength(editFormData.length ? editFormData.length : ""));
      dispatch(setOverwidth(editFormData.overWidth ? editFormData.overWidth : ""));
      dispatch(
        setOverwidthformtypefk(editFormData.overWidthFormTypeFK ? editFormData.overWidthFormTypeFK : "")
      );
      dispatch(setFormTypeId(editFormData.overWidthFormTypeFK || null));
      dispatch(setFormId(editFormData?.ptiFormFK));
      dispatch(setAllowmultiunit(editFormData.allowMultiUnit ? editFormData.allowMultiUnit : ""));
      dispatch(setAllowonthirtyfive(editFormData.allowOnThirtyFive ? editFormData.allowOnThirtyFive : ""));
      dispatch(
        setRequiresflagsandsigns(editFormData.requiresFlagsAndSigns ? editFormData.requiresFlagsAndSigns : "")
      );
      dispatch(setAllowPopup(editFormData.allowPopup || false));
      dispatch(setRequireseld(editFormData.requiresELD ? editFormData.requiresELD : ""));
      dispatch(setSpecialinstruction(editFormData.specialInstruction ? editFormData.specialInstruction : ""));
      dispatch(setType(editFormData.motorized ? "Motorized" : "Towable"));
      dispatch(
        setAllowOnTruckCamperTrailor(editFormData.allowTruckCamper ? editFormData.allowTruckCamper : false)
      );
    }
  }, [editFormData, viewDetail]);
  useEffect(() => {
    if (!overwidth) {
      dispatch(setFormTypeInput(""));
      dispatch(setFormTypeId(null));
    }
  }, [overwidth]);

  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setUnitTypePK(""));

      dispatch(setUnitCode(""));

      dispatch(setDescriptionShort(""));
      dispatch(setDescriptionLong(""));
      dispatch(setLength(""));
      dispatch(setOverwidth(""));
      dispatch(setOverwidthformtypefk(""));
      dispatch(setFormTypeId(null));
      dispatch(setFormId(null));
      dispatch(setFormInput(""));
      dispatch(setAllowmultiunit(""));
      dispatch(setAllowonthirtyfive(""));
      dispatch(setRequiresflagsandsigns(""));
      dispatch(setRequireseld(""));
      dispatch(setSpecialinstruction(""));
      dispatch(setType("Motorized"));
    }
  }, [editFormData]);

  useEffect(() => {
    if (allowmultiunit) {
      dispatch(setRequiresflagsandsigns(false));
      dispatch(setRequireseld(false));
    } else {
      dispatch(setAllowonthirtyfive(false));
      dispatch(setAllowPopup(false));
      dispatch(setAllowOnTruckCamperTrailor(false));
    }
  }, [allowmultiunit]);

  useEffect(() => {
    if (viewDetail && unitCode && descriptionLong) {
      hanldeCheckUnitCode(unitCode);
      hanldeCheckDescription(descriptionLong);
    }
  }, [unitCode, descriptionLong, viewDetail]);

  useEffect(() => {
    if (id) fetchRecord(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Formik
      initialValues={{}}
      validationSchema={""}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{}}
    >
      {(formik) => (
        <div className="p-2">
          <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight">
            <Row>
              <Col md={6} xs={6}>
                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Unit Code
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} className="p-0" style={{ width: "80px" }}>
                    <input
                      className={`${styles.formControl} ${
                        viewDetail ? "" : unitCode !== "" && isUnitCodeUnique ? "borderGreen" : "borderRed"
                      }`}
                      id="unitCode"
                      name="unitCode"
                      type="text"
                      value={unitCode}
                      maxLength={6}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setUnitCode(e.target.value?.trim()));
                        dispatch(setIsUnitCodeUnique(true));
                      }}
                      onBlur={(e) => hanldeCheckUnitCode(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Description
                    </Form.Label>
                  </Col>

                  <Col xs={8} md={8} className="p-0" style={{ width: "350px" }}>
                    <input
                      className={`${styles.formControl} ${
                        viewDetail
                          ? ""
                          : descriptionLong !== "" && isDescriptionUnique
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="descriptionLong"
                      name="descriptionLong"
                      type="text"
                      value={descriptionLong}
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setDescriptionLong(e.target.value));
                        dispatch(setIsDescriptionUnique(true));
                      }}
                      onBlur={(e) => hanldeCheckDescription(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      BOL Text
                    </Form.Label>
                  </Col>

                  <Col xs={5} md={5} className="p-0" style={{ width: "185px" }}>
                    <input
                      className={`${styles.formControl} ${
                        viewDetail ? "" : descriptionShort !== "" ? "borderGreen" : "borderRed"
                      }`}
                      id="descriptionShort"
                      name="descriptionShort"
                      type="text"
                      value={descriptionShort}
                      maxLength={15}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setDescriptionShort(e.target.value));
                      }}
                    />
                  </Col>
                  <Row className={""}>
                    <Col xs={3} md={3} sm={3}></Col>
                    <Col style={{ paddingLeft: "200px" }}>
                      <p className="p-0 text-danger alert" style={{ height: "30px" }}></p>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Type
                    </Form.Label>
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0">
                    <CustomRadioGroup
                      name="Type"
                      horizontal
                      horizontalAlignmentClassName={"me-4"}
                      options={["Motorized", "Towable"]}
                      selectedOption={type}
                      disabled={viewDetail}
                      onChange={(option) => dispatch(setType(option))}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Length
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} className="p-0" style={{ width: "50px" }}>
                    <input
                      className={`${styles.formControl} ${
                        viewDetail ? "" : length > 32767 ? "borderRed" : ""
                      }`}
                      id="length"
                      name="length"
                      type="text"
                      value={length}
                      onBeforeInput={(e) => {
                        if (
                          e.data === "+" ||
                          e.data === "e" ||
                          !/^[0-9]*$/.test(e.data) ||
                          (e.target.value === "" && e.data === "0")
                        ) {
                          e.preventDefault();
                        }
                      }}
                      maxLength={5}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setLength(e.target.value));
                      }}
                    />
                  </Col>
                  <Row className={""}>
                    <Col xs={3} md={3} sm={3}></Col>
                    <Col style={{ paddingLeft: "200px" }}>
                      <p className="p-0 text-danger alert" style={{ height: "30px" }}></p>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group
                  className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Over Width</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="overwidth"
                      name="overwidth"
                      checked={overwidth}
                      disabled={viewDetail}
                      onChange={(e) => {
                        dispatch(setOverwidth(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className=" form-group mt-2 m-b-10 align-items-center d-flex m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 w-90px">
                    <Form.Label className="col-form-label dealer-label m-l-0">Over Width Form</Form.Label>
                  </Col>

                  <Col xs={7} md={7} sm={7} className="d-flex">
                    {/* FormType Autocomplete */}

                    <AutoCompleteDropdown
                      className={`${styles.formControl} ${
                        viewDetail || (!viewDetail && !overwidth)
                          ? ""
                          : "borderRed" && formTypeId
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      arrayList={formTypeData}
                      searchString={formTypeInput}
                      renderItemId={(formtype) => formtype.formTypePK}
                      renderItemField={(formtype) => formtype.description}
                      handleSearchString={(string) => dispatch(setFormTypeInput(string))}
                      fetchDataBySearchString={fetchFormType}
                      onSelect={handleFormTypeLookupSelection}
                      selectedId={formTypeId}
                      disabled={viewDetail || !overwidth}
                      clearInputCallback={() => {
                        dispatch(setFormTypeId(null));
                      }}
                      towardsTop
                      loading={overWidthLoading}
                    />
                    <LookupButton
                      onClick={handleFirmTypeLookupModalShow}
                      disabled={viewDetail || !overwidth}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className=" form-group mt-3 m-b-5 align-items-center d-flex m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0  w-90px">
                    <Form.Label className="col-form-label dealer-label m-l-0">PTI Form</Form.Label>
                  </Col>

                  <Col xs={7} md={7} sm={7} className="d-flex">
                    {/* Form Autocomplete */}

                    <AutoCompleteDropdown
                      className={`${styles.formControl} ${
                        viewDetail ? "" : formId ? "borderGreen" : "borderRed"
                      }`}
                      arrayList={formData}
                      searchString={formInput}
                      renderItemId={(data) => data.formPK}
                      renderItemField={(data) => data.description}
                      handleSearchString={(string) => dispatch(setFormInput(string))}
                      fetchDataBySearchString={fetchForm}
                      onSelect={handleFormLookupSelection}
                      selectedId={formId}
                      disabled={viewDetail}
                      clearInputCallback={() => {
                        dispatch(setFormId(null));
                      }}
                      towardsTop
                      loading={ptiLoading}
                    />
                    <LookupButton onClick={handleFormLookupModalShow} disabled={viewDetail} />
                  </Col>
                </Form.Group>
              </Col>

              <Col className="pt-0 p-10" xs={6} md={6}>
                <Form.Group
                  className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Multi Unit Loads</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="allowmultiunit"
                      name="allowmultiunit"
                      checked={allowmultiunit}
                      disabled={viewDetail}
                      onChange={(e) => {
                        dispatch(setAllowmultiunit(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Allow on 35' Trailer</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="allowonthirtyfive"
                      name="allowonthirtyfive"
                      checked={allowonthirtyfive}
                      disabled={viewDetail || !allowmultiunit}
                      onChange={(e) => {
                        dispatch(setAllowonthirtyfive(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Allow on Popup Trailer</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="allowonthirtyfive"
                      name="allowonthirtyfive"
                      checked={allowPopup}
                      disabled={viewDetail || !allowmultiunit || allowOnTruckCamperTrailor}
                      onChange={(e) => {
                        dispatch(setAllowPopup(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">
                      Allow on Truck Camper Trailer
                    </Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="allowOnTruckCamperTrailor"
                      name="allowOnTruckCamperTrailor"
                      checked={allowOnTruckCamperTrailor}
                      disabled={viewDetail || !allowmultiunit || allowPopup}
                      onChange={(e) => {
                        dispatch(setAllowOnTruckCamperTrailor(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Requires Flags and Sign</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="requiresflagsandsigns"
                      name="requiresflagsandsigns"
                      checked={requiresflagsandsigns}
                      onChange={(e) => {
                        dispatch(setRequiresflagsandsigns(e.target.checked));
                      }}
                      disabled={viewDetail || allowmultiunit}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Requires ELD</Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="requireseld"
                      name="requireseld"
                      checked={requireseld}
                      disabled={viewDetail || allowmultiunit}
                      onChange={(e) => {
                        dispatch(setRequireseld(e.target.checked));
                      }}
                    />
                  </Col>
                  <Row className={""}>
                    <Col xs={3} md={3} sm={3}></Col>
                    <Col style={{ paddingLeft: "200px" }}>
                      <p className="p-0 text-danger alert" style={{ height: "30px" }}></p>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group
                  className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={4} md={4} xs={4} className="p-0" style={{ height: "165px" }}>
                    <Form.Label htmlFor="name" style={{ marginTop: "0px" }} className=" ">
                      Special Instructions
                    </Form.Label>
                  </Col>
                  <br></br>
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <textarea
                      rows={10}
                      cols={10}
                      type="text"
                      className={`${styles.formControl}`}
                      id="specialinstruction"
                      name="specialinstruction"
                      value={specialinstruction}
                      disabled={viewDetail}
                      style={{
                        resize: "none",
                        display: "fixed",
                        minHeight: "172px",
                        minWidth: "370px",
                        boxShadow: "none",
                        fontSize: "12px",
                      }}
                      onInput={(e) => {
                        dispatch(setSpecialinstruction(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
          {(descriptionLoading || loading) && <LoadingIcon />}
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
      )}
    </Formik>
  );
}

export default UnitTypeContent;
