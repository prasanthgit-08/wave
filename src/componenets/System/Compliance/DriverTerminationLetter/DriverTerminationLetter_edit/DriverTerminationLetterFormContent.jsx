import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import Input from "../../../../../components/common/input";
import LookupButton from "../../../../common/LookupButton";
import { useDispatch, useSelector } from "react-redux";
import {
  resetEdit,
  setAdminAmount,
  setAdminCharge,
  setAdminDays,
  setDamage,
  setDescription,
  setEditPage,
  setFormId,
  setFormValue,
  setLetter,
  setRehire,
  setUniqueCombination,
  setUnqiueDescription,
  setViewData,
} from "../../../../../redux/DriverTerminationLetterSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DriverTerminationLetterService from "../../../../../services/DriverTerminationLetterService";
import { useState } from "react";
import FormsLookup from "../../../../LookupScreens/Forms/FormsLookup";
import LoadingIcon from "../../../../common/LoadingIcon";

const DriverTerminationLetterFormContent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [showFormLookup, setShowFormLookup] = useState(false);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [doCheck, setDoCheck] = useState(false);
  const [formLoader, setFormLoader] = useState(false);

  const description = useSelector((state) => state.driverTerminationLetterReducer.description);
  const unqiueDescription = useSelector((state) => state.driverTerminationLetterReducer.unqiueDescription);
  const uniqueCombination = useSelector((state) => state.driverTerminationLetterReducer.uniqueCombination);
  const damage = useSelector((state) => state.driverTerminationLetterReducer.damage);
  const rehire = useSelector((state) => state.driverTerminationLetterReducer.rehire);
  const adminCharge = useSelector((state) => state.driverTerminationLetterReducer.adminCharge);
  const adminAmount = useSelector((state) => state.driverTerminationLetterReducer.adminAmount);
  const adminDays = useSelector((state) => state.driverTerminationLetterReducer.adminDays);
  const formValue = useSelector((state) => state.driverTerminationLetterReducer.formValue);
  const formId = useSelector((state) => state.driverTerminationLetterReducer.formId);
  const letter = useSelector((state) => state.driverTerminationLetterReducer.letter);
  const editPage = useSelector((state) => state.driverTerminationLetterReducer.editPage);
  const viewData = useSelector((state) => state.driverTerminationLetterReducer.viewData);

  const numberRegex = /^[1-9][0-9]*$/;
  const decimalRegex = /^\d{0,5}(\.\d{0,2})*$/;
  const id = params.id;
  const pageNumber = params.pageNumber;

  const fetchLetter = () => {
    setLoading(true);
    DriverTerminationLetterService.fetchById(id)
      .then((response) => {
        dispatch(setAdminCharge(response.data.adminCharge));
        dispatch(setDescription(response.data.description));
        dispatch(setDamage(response.data.damage));
        dispatch(setRehire(response.data.rehire));
        dispatch(setLetter(response.data.letter));
        dispatch(setAdminAmount(response.data.adminCharge ? response.data.adminAmount : ""));
        dispatch(setAdminDays(response.data.adminCharge ? response.data.adminChargeDays : ""));
        dispatch(setFormValue(response.data.formName));
        dispatch(setFormId(response.data.formId));
        dispatch(setViewData(response.data));
        setDoCheck(true);
      })
      .catch((err) => {
        navigate("/driver-termination-letter");
      })
      .finally(() => setLoading(false));
  };
  const handleFormLookupSelection = (data) => {
    dispatch(setFormId(data.formPK));
    dispatch(setFormValue(data.description));
    setShowFormLookup(false);
  };

  const fetchFormAutoComplete = (string) => {
    setFormLoader(true);
    DriverTerminationLetterService.getFormsForAuto(string)
      .then((response) => {
        setFormData(response.data.content);
      })
      .catch((err) => {
        setFormLoader(false);
      })
      .finally(() => setFormLoader(false));
  };

  useEffect(() => {
    if (window.location.pathname === "/edit-driver-termination-letter/" + id + "/" + pageNumber) {
      dispatch(setEditPage(false));
      fetchLetter();
    } else {
      dispatch(setEditPage(true));
      dispatch(resetEdit());
      setDoCheck(true);
    }
  }, [id]);

  const checkunique = () => {
    if (viewData) {
      if (description === viewData.description) {
        dispatch(setUnqiueDescription(true));
      } else
        DriverTerminationLetterService.checkUnique(description).then((response) => {
          dispatch(setUnqiueDescription(response.data));
        });
    } else if (description) {
      DriverTerminationLetterService.checkUnique(description).then((response) => {
        dispatch(setUnqiueDescription(response.data));
      });
    }
  };
  useEffect(() => {
    if (doCheck) {
      DriverTerminationLetterService.getByCombination(damage, rehire, adminCharge).then(({ data }) => {
        const pk = data.driverTerminationLetterPK;
        if (pk && String(pk) !== String(id)) {
          dispatch(setUniqueCombination(false));
        } else {
          dispatch(setUniqueCombination(true));
        }
      });
    }
  }, [adminCharge, damage, rehire, doCheck]);

  useEffect(() => {
    if (!editPage) {
      dispatch(setUnqiueDescription(true));
    }
  }, [editPage]);

  return (
    <Form>
      {loading && <LoadingIcon />}
      <div className="p-2">
        <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight">
          <Row className="m-0 p-0">
            <Col sm={6} md={6} lg={6} xl={6} xs={6}>
              <Form.Group className="form-group p-b-5 form-group m-t-12 m-b-15 align-items-center row m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 mt-5">
                  <Form.Label className={styles.colFormLabel}>Description</Form.Label>
                </Col>
                <Col xs={7} md={7} sm={7} className="p-0 mt-5">
                  <Input
                    name="description"
                    type="text"
                    maxLength={30}
                    id="description"
                    value={description}
                    disabled={!editPage}
                    onChange={(e) => {
                      e.target.value !== " " && dispatch(setDescription(e.target.value));
                      dispatch(setUnqiueDescription(true));
                    }}
                    className={`${styles.formControl} ${
                      editPage
                        ? !description || !unqiueDescription
                          ? "borderRed"
                          : "borderGreen"
                        : "borderBlack"
                    }`}
                    onBlur={() => {
                      checkunique();
                    }}
                  />
                </Col>
                {/* Would be Required for future reference */}
                {/* <Row className={`${!unqiueDescription && editPage ? "" : "hide-elements"}`}>
                  <Col xs={3} md={3} sm={3}></Col>
                  <Col style={{ paddingLeft: "5px" }}>
                    <p className="p-0 text-danger alert" style={{ height: "1px" }}>
                      {description && !unqiueDescription && `Description '${description}' already exists!`}
                    </p>
                  </Col>
                </Row> */}
              </Form.Group>
              <Form.Group className="form-group p-b-5 form-group m-t-12 m-b-15 align-items-center row m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className={styles.colFormLabel}>Damage</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    name="damage"
                    type="checkbox"
                    id="damage"
                    className={`form-check-input p-0  ${
                      editPage
                        ? !(damage || rehire || adminCharge) || !uniqueCombination
                          ? "borderRed"
                          : "borderGreen"
                        : "borderBlack"
                    }`}
                    checked={damage}
                    disabled={!editPage}
                    onChange={(e) => {
                      dispatch(setDamage(e.target.checked));
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group p-b-5 form-group m-t-12 m-b-15 align-items-center row m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className={styles.colFormLabel}>Rehire</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    className={`form-check-input p-0  ${
                      editPage
                        ? !(damage || rehire || adminCharge) || !uniqueCombination
                          ? "borderRed"
                          : "borderGreen"
                        : "borderBlack"
                    }`}
                    name="rehire"
                    type="checkbox"
                    maxLength={2}
                    id="rehire"
                    checked={rehire}
                    disabled={!editPage}
                    onChange={(e) => {
                      dispatch(setRehire(e.target.checked));
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group p-b-10 form-group m-t-12 m-b-15 align-items-center row m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className={styles.colFormLabel}>Administrative Charge</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    name="adminCharge"
                    type="checkbox"
                    maxLength={2}
                    id="adminCharge"
                    autoComplete="off"
                    className={`form-check-input p-0  ${
                      editPage
                        ? !(damage || rehire || adminCharge) || !uniqueCombination
                          ? "borderRed"
                          : "borderGreen"
                        : "borderBlack"
                    }`}
                    checked={adminCharge}
                    disabled={!editPage}
                    onChange={(e) => {
                      dispatch(setAdminCharge(e.target.checked));
                      if (e.target.checked) {
                        dispatch(setAdminAmount(""));
                        dispatch(setAdminDays(""));
                      } else {
                        dispatch(setAdminAmount(0));
                        dispatch(setAdminDays(0));
                      }
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group p-b-5 p-t-2 form-group m-t-15 m-b-15 align-items-center row m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className={styles.colFormLabel}>Administrative Amount</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0">
                  <Input
                    name="adminAmount"
                    type="text"
                    maxLength={9}
                    id="adminAmount"
                    value={adminAmount}
                    disabled={!editPage || !adminCharge}
                    className={`${styles.formControl} ${
                      editPage && adminCharge && !(adminAmount > 0)
                        ? "borderRed"
                        : !editPage || !adminCharge
                          ? "borderBlack"
                          : "borderGreen"
                    }`}
                    onChange={(e) => {
                      if (!adminCharge) {
                        dispatch(setAdminAmount(0));
                      } else {
                        if (decimalRegex.test(e.target.value) || e.target.value === "") {
                          dispatch(setAdminAmount(e.target.value));
                        }
                      }
                    }}
                  />
                </Col>
                <Row
                  className={`${adminCharge && !adminAmount && editPage ? "hide-elements" : "hide-elements"}`}
                >
                  <Col xs={3} md={3} sm={3}></Col>
                  <Col style={{ paddingLeft: "5px" }}>
                    <p className="p-0 text-danger alert" style={{ height: "1px" }}>
                      {`Adminstarive Amount should be greater than 0`}
                    </p>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="form-group  p-b-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className={styles.colFormLabel}>Administrative Days</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <Input
                    name="regionCode"
                    type="text"
                    maxLength={9}
                    id="regionCode"
                    value={adminDays}
                    disabled={!editPage || !adminCharge}
                    onChange={(e) => {
                      if (!adminCharge) {
                        dispatch(setAdminDays(0));
                      } else {
                        if (
                          (numberRegex.test(e.target.value) && e.target.value <= 32767) ||
                          e.target.value === ""
                        )
                          dispatch(setAdminDays(e.target.value));
                      }
                    }}
                    className={`${styles.formControl} ${
                      editPage && adminCharge && !adminDays && !Number(adminDays > 0)
                        ? "borderRed"
                        : !editPage || !adminCharge
                          ? "borderBlack"
                          : "borderGreen"
                    }`}
                  />
                </Col>
                <Row
                  className={`${adminCharge && !adminDays && editPage ? "hide-elements" : "hide-elements"}`}
                >
                  <Col xs={3} md={3} sm={3}></Col>
                  <Col style={{ paddingLeft: "5px" }}>
                    <p className="p-0 text-danger alert" style={{ height: "1px" }}>
                      {`Adminstarive Days should be greater than 0`}
                    </p>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="form-group  p-b-5 form-group m-t-5  align-items-center row m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="mt-3 p-0">
                  <Form.Label className={`${styles.colFormLabel}`}>Form</Form.Label>
                </Col>
                <Col xs={7} md={7} sm={7} className=" mt-3 p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={formData}
                    searchString={formValue}
                    fetchDataBySearchString={fetchFormAutoComplete}
                    disabled={!editPage}
                    renderItemId={(data) => data.formPK}
                    renderItemField={(data) => String(data.description)?.trim()}
                    handleSearchString={(string) => dispatch(setFormValue(string))}
                    onSelect={(form) => {
                      dispatch(setFormValue(String(form.description)?.trim()));
                      dispatch(setFormId(form.formPK));
                    }}
                    selectedId={formId}
                    clearInputCallback={() => {
                      dispatch(setFormId(""));
                    }}
                    className={`${styles.formControl} ${!editPage ? "" : formId ? "borderGreen" : "borderRed"}`}
                    towardsTop
                    maxHeight={"200px"}
                    loading={formLoader}
                  />
                  <LookupButton
                    disabled={!editPage}
                    onClick={() => {
                      setShowFormLookup(true);
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col sm={6} md={6} lg={6} xl={6} xs={6}>
              <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0 ">
                <Col sm={12} md={12} xs={12} className=" mt-5 p-0 p-b-10">
                  <Form.Label className={`${styles.colFormLabel}`}>Letter Body Text</Form.Label>
                </Col>
                <Col sm={11} className="p-0">
                  <textarea
                    rows={16}
                    cols={60}
                    type="text"
                    style={{
                      resize: "none",
                      display: "fixed",
                      minHeight: "400px",
                      minWidth: "400px",
                      boxShadow: "none",
                      fontSize: "12px",
                    }}
                    className="customFormControl h-100"
                    id="holdNotes"
                    name="holdNotes"
                    value={letter}
                    disabled={!editPage}
                    onChange={(e) => {
                      dispatch(setLetter(e.target.value));
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </div>
        <FormsLookup
          show={showFormLookup}
          onHide={() => {
            setShowFormLookup(false);
          }}
          MaintenanceProgram
          renderItemId={(data) => data.formPK}
          renderItemField={(data) => data.description}
          FormTypeObjectKey={"DriverTerm"}
          handleLookupSelection={handleFormLookupSelection}
        />
      </div>
    </Form>
  );
};

export default DriverTerminationLetterFormContent;
