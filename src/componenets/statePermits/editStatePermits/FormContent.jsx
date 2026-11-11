import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Col, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import StatePermitsService from "../../../services/StatePermitsService";
import {
  setEditFormData,
  setEmailText,
  setIsStateAndTowableUnique,
  setMotorized,
  setPickupStateId,
  setPickupStateInput,
  setPickupStateSelection,
  setStateFK,
  setStatePermitPK,
  setTowable,
  setViewDetail,
} from "../../../redux/StatePermitsSlice";
import AutoCompleteDropdown from "../../common/AutoCompleteDropdown";
import LookupButton from "../../common/LookupButton";
import StateLookup from "../../LookupScreens/States/StateLookup";
import StateService from "../../../services/StateService";
import { setStateId } from "../../../redux/LookupScreens/StateLookupSlice";
import LoadingIcon from "../../common/LoadingIcon";

function FormContent({ styles }) {
  const { id, pageNumber } = useParams();
  const [stateData, setStateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statePermitLoading, setStatePermitLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [atleastOneCheck, setAtleastOneCheck] = useState(true);

  const editFormData = useSelector((state) => state.statePermitsReducer.editFormData);
  const changesCancelled = useSelector((state) => state.statePermitsReducer.changesCancelled);

  const viewDetail = useSelector((state) => state.statePermitsReducer.viewDetail);
  const searchCriteria = useSelector((state) => state.statePermitsReducer.searchCriteria);

  const stateFK = useSelector((state) => state.statePermitsReducer.stateFK);
  const towable = useSelector((state) => state.statePermitsReducer.towable);
  const motorized = useSelector((state) => state.statePermitsReducer.motorized);
  const statePermitPK = useSelector((state) => state.statePermitsReducer.statePermitPK);
  const emailText = useSelector((state) => state.statePermitsReducer.emailText);
  const pickupStateId = useSelector((state) => state.statePermitsReducer.pickupStateId);
  const pickupStateInput = useSelector((state) => state.statePermitsReducer.pickupStateInput);
  const pickupStateSelection = useSelector((state) => state.statePermitsReducer.pickupStateSelection);
  const isStateAndTowableUnique = useSelector((state) => state.statePermitsReducer.isStateAndTowableUnique);
  const navigateToMainPage = useSelector((state) => state.statePermitsReducer.navigateToMainPage);

  const fetchRecord = (id) => {
    setLoading(true);
    StatePermitsService.getRecord(id)
      .then((res) => {
        const data = res.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));

        const stateId = data.stateFK?.statesPK;
        const stateName = data.stateName;

        if (stateId && stateName) {
          dispatch(setStateFK(stateId));
          dispatch(setPickupStateId(stateId));
          dispatch(setPickupStateInput(stateName));
        } else {
          dispatch(setPickupStateInput(""));
        }
      })
      .catch((err) => {
        console.log("Fetch failed", err);
        navigate(`/state-permits`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const hanldeCheckForm = (name) => {
    if (pickupStateInput && pickupStateId) {
      StatePermitsService.checkStateExist(stateFK, towable, motorized, id)
        .then((res) => {
          dispatch(setIsStateAndTowableUnique(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handlePickupStateLookupModalShow = () => {
    dispatch(setPickupStateSelection(true));
  };

  const fetchPickupState = (string) => {
    setStatePermitLoading(true);
    StateService.fetchPickupState(string, searchCriteria, pageNumber)
      .then((response) => {
        const data = response.data.content;
        const stateList = data?.map((state) => ({
          ...state,
          stateName: state.stateName?.trim(),
        }));
        setStateData(stateList);
      })
      .catch((err) => {})
      .finally(() => {
        setStatePermitLoading(false);
      });
  };

  const handlePickupStateLookupSelection = (state) => {
    dispatch(setPickupStateInput(state.stateName));
    dispatch(setStateId(state.statesPK));

    dispatch(setStateFK(state.statesPK));
    dispatch(setPickupStateId(state.statesPK));

    dispatch(setPickupStateSelection(false));
  };

  const hidePickupStateModal = () => {
    dispatch(setPickupStateSelection(false));
  };

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setStatePermitPK(editFormData.statePermitPK ? editFormData.statePermitPK : ""));
      dispatch(setStateFK(editFormData.stateFK.statesPK != null ? editFormData.stateFK.statesPK : ""));
      dispatch(setTowable(editFormData.towable ? editFormData.towable : false));
      dispatch(setMotorized(editFormData.motorized ? editFormData.motorized : false));
      dispatch(setEmailText(editFormData.emailText ? editFormData.emailText : ""));
    }
  }, [editFormData, changesCancelled]);

  useEffect(() => {
    if (towable) {
      setMotorized(false);
    } else {
      setTowable(false);
    }
  }, [towable, motorized]);
  useEffect(() => {
    if (towable || motorized) {
      setAtleastOneCheck(false);
    } else {
      setAtleastOneCheck(true);
    }
  }, [towable, motorized]);
  // Debounced so the state/towable/motorized updates dispatched while loading a record
  // collapse into a single stateexists call with the final values.
  useEffect(() => {
    if (pickupStateId == null) return;
    const debounceFunction = setTimeout(() => {
      hanldeCheckForm();
    }, 300);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [towable, motorized, pickupStateId, stateFK]);

  useEffect(() => {
    if (stateFK === null || stateFK === undefined) dispatch(setIsStateAndTowableUnique(false));
  }, []);

  useEffect(() => {
    if (id) fetchRecord(id);
  }, []);

  useEffect(() => {
    if (navigateToMainPage) {
      navigate(`/state-permits`);
    }
  }, [navigateToMainPage]);
  return (
    <Formik initialValues={{}} validateOnMount enableReinitialize={true} initialTouched={{}}>
      {(formik) => (
        <div className="w-100 p-2">
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            {loading && <LoadingIcon />}

            <div className="m-b-10">
              <div className="p-3 w-100">
                <Col md={6} xs={6}>
                  <Form.Group
                    className={`mt-1 m-b-5 align-items-center row  m-l-0 m-r-0  ${styles.colFormLabel}`}
                  >
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <div className="p-0 w-75px">
                        <Form.Label className="col-form-label dealer-label m-l-0 ">State</Form.Label>
                      </div>
                    </Col>

                    <Col xs={7} md={7} sm={7} className="d-flex p-0">
                      {/* State Autocomplete */}
                      <AutoCompleteDropdown
                        className={`${
                          viewDetail || id
                            ? "borderBlack"
                            : pickupStateInput !== "" && stateFK !== "" && isStateAndTowableUnique
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        arrayList={stateData}
                        searchString={pickupStateInput}
                        renderItemId={(state) => state.statesPK}
                        renderItemField={(state) => state.stateName}
                        handleSearchString={(string) => dispatch(setPickupStateInput(string))}
                        fetchDataBySearchString={fetchPickupState}
                        onSelect={handlePickupStateLookupSelection}
                        selectedId={pickupStateId}
                        disabled={viewDetail || id}
                        loading={statePermitLoading}
                        clearInputCallback={() => {
                          dispatch(setPickupStateId(null));
                          dispatch(setStateFK(""));
                        }}
                      />
                      <LookupButton onClick={handlePickupStateLookupModalShow} disabled={viewDetail || id} />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className={`mt-1 m-b-5 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                  >
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className=" col-form-label dealer-label">Towable</Form.Label>
                    </Col>

                    <Col xs={3} md={3} sm={3} className="p-0">
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${
                          !viewDetail
                            ? towable
                              ? "borderGreen"
                              : !motorized && !towable
                                ? "borderRed"
                                : ""
                            : ""
                        }`}
                        id="towable"
                        name="towable"
                        checked={towable}
                        disabled={viewDetail || id || motorized}
                        onChange={(e) => {
                          dispatch(setTowable(e.target.checked));
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                  >
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className=" col-form-label dealer-label">Motorized</Form.Label>
                    </Col>

                    <Col xs={3} md={3} sm={3} className="p-0">
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${
                          !viewDetail
                            ? motorized
                              ? "borderGreen"
                              : !motorized && !towable
                                ? "borderRed"
                                : ""
                            : ""
                        }`}
                        id="motorized"
                        name="motorized"
                        disabled={viewDetail || id || towable}
                        checked={motorized}
                        onChange={(e) => {
                          dispatch(setMotorized(e.target.checked));
                        }}
                      />
                      -
                    </Col>
                  </Form.Group>
                  <Form.Group
                    className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                  >
                    <Col xs={3} md={3} sm={3} className="p-0" style={{ height: "180px" }}>
                      <Form.Label htmlFor="name" style={{ marginTop: "0px" }} className=" ">
                        Permit Instructions
                      </Form.Label>
                    </Col>
                    <br></br>
                    <Col sm={9} md={9} xs={9} className="p-0">
                      <textarea
                        rows={10}
                        cols={20}
                        type="text"
                        className={`form-control h-100 textarea-height textAreaWidthTwoRow ${
                          viewDetail ? "borderBlack" : emailText.length >= 1 ? "borderGreen" : "borderRed"
                        }`}
                        id="emailText"
                        name="emailText"
                        value={emailText}
                        style={{
                          resize: "none",
                          display: "fixed",
                          minHeight: "210px",
                          minWidth: "610px",
                          boxShadow: "none",
                          fontSize: "12px",
                        }}
                        onBeforeInput={(e) => {
                          if (emailText.length === 0 && /^\s$/.test(e.data)) {
                            e.preventDefault();
                          }
                        }}
                        disabled={viewDetail}
                        onInput={(e) => {
                          dispatch(setEmailText(e.target.value));
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </div>

              <StateLookup
                show={pickupStateSelection}
                onHide={hidePickupStateModal}
                renderItemId={(state) => state.statesPK}
                renderItemField={(state) => state.stateName}
                handleLookupSelection={handlePickupStateLookupSelection}
                MaintenanceProgram
              />
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default FormContent;
