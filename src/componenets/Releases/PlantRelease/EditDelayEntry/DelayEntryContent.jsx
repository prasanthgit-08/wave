import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import LookupButton from "../../../common/LookupButton";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import {
  setAuthorizedBy,
  setDelayDate,
  setDriverId,
  setDriverInput,
  setNotes,
  setReason,
  setReportedBy,
  setUserId,
  setUserInput,
  setDelayFormData,
  setUnitInput,
  setDelayUnitId,
  setSingleFormData,
  setUnitNumberValue,
  setDelayDateValid,
} from "../../../../redux/PlantReleaseSlice";
import UserLookup from "../../../LookupScreens/User/UserLookup";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import PlantReleaseService from "../../../../services/PlantReleaseService";
import { useNavigate } from "react-router-dom";
import DateInputField from "../../../common/DateInputField";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import DriverLookup from "../../../LookupScreens/Driver/DriverLookup";
import DriverService from "../../../../services/DriverService";

const DelayEntryContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showUserLookup, setShowUserLookup] = useState(false);

  const [no, setNo] = useState("");
  const [driverLookUpShow, setDriverLookUpShow] = useState(false);
  const [userArray, setUserArray] = useState([]);
  const [driverArray, setDriverArray] = useState([]);
  const [atleastOnerror, setAtleastOneError] = useState(true);
  const delay = useSelector((state) => state.plantReleaseReducer.delay);
  const unitNumber = useSelector((state) => state.plantReleaseReducer.unitNumber);
  const reason = useSelector((state) => state.plantReleaseReducer.reason);
  const authorizedBy = useSelector((state) => state.plantReleaseReducer.authorizedBy);
  const driverInput = useSelector((state) => state.plantReleaseReducer.driverInput);
  const driverId = useSelector((state) => state.plantReleaseReducer.driverId);
  const userInput = useSelector((state) => state.plantReleaseReducer.userInput);

  const userId = useSelector((state) => state.plantReleaseReducer.userId);
  const reportedBy = useSelector((state) => state.plantReleaseReducer.reportedBy);
  const unitInput = useSelector((state) => state.plantReleaseReducer.unitInput);
  const delayDate = useSelector((state) => state.plantReleaseReducer.delayDate);
  const notes = useSelector((state) => state.plantReleaseReducer.notes);
  const unitId = useSelector((state) => state.plantReleaseReducer.unitId);
  const unitPk = useSelector((state) => state.plantReleaseReducer.unitPk);
  const delayInputArray = useSelector((state) => state.plantReleaseReducer.delayInputArray);
  const delayArrayIndex = useSelector((state) => state.plantReleaseReducer.delayArrayIndex);
  const delayUnitId = useSelector((state) => state.plantReleaseReducer.delayUnitId);
  const browseUnits = useSelector((state) => state.plantReleaseReducer.browseUnits);
  const singleUnits = useSelector((state) => state.plantReleaseReducer.singleUnits);
  const unitNo = useSelector((state) => state.plantReleaseReducer.unitNo);
  const unitNumberValue = useSelector((state) => state.plantReleaseReducer.unitNumberValue);
  const delayDateValid = useSelector((state) => state.plantReleaseReducer.delayDateValid);
  const singleFormData = useSelector((state) => state.plantReleaseReducer.singleFormData);
  const [userLoading, setUserLoading] = useState(false);
  const [driverLoading, setDriverLoading] = useState(false);
  /**
   * Fetch all Users
   * Used for  User Autocomplete
   */
  const fetchAllUsers = (string) => {
    setUserLoading(true);
    PlantReleaseService.getAllUsersForAutocomplete(string)
      .then((response) => {
        const data = response.data.content;
        const userList = data?.map((user) => ({ ...user, name: user.name?.trim() }));
        setUserArray(userList);
        setUserLoading(false);
      })
      .catch((error) => {
        setUserLoading(false);
      });
  };

  /**
   * Fetch all Drivers
   * Used for Driver Autocomplete
   */
  const fetchAllDrivers = (string) => {
    setDriverLoading(true);
    DriverService.getDriverForAuto(string)
      .then((response) => {
        const data = response.data.content;
        const driverList = data?.map((drivers) => ({
          ...drivers,
          firstName: drivers.firstName?.trim(),
        }));
        setDriverArray(driverList);
        setDriverLoading(false);
      })
      .catch((error) => {
        setDriverLoading(false);
      });
  };
  /**
   * used for User selection Lookup
   */
  const handleUserLookup = () => {
    setShowUserLookup(true);
  };
  const handleUserLookupSelection = (item) => {
    setShowUserLookup(false);
    dispatch(setUserId(item.userPK));
    dispatch(setUserInput(item.name?.trim()));
  };

  /**
   * used for Driver  selection Lookup
   */
  const handleDriverLookupModalShow = () => {
    setDriverLookUpShow(true);
  };

  const handleDriverLookupModalHide = () => {
    setDriverLookUpShow(false);
  };
  const handleDriverLookupSelection = (item) => {
    dispatch(setDriverId(item.driverPK));
    dispatch(setDriverInput(item.firstName?.trim() + (item.lastName ? " " + item.lastName?.trim() : "")));
    setDriverLookUpShow(false);
  };

  /**
   * For save - multiple delay
   */
  const getDelayValue = () => {
    dispatch(
      setDelayFormData({
        unitFK: delayUnitId,
        authorizedBy: authorizedBy,
        reportingUserFK: userId,
        reportingDriverFK: driverId,
        reason: reason,
        reportedBy: reportedBy,
        addUserFK: 8,
        delayDate: delayDate,
        notes: notes,
      })
    );
  };
  /**
   * For save - single delay
   */
  const getSingleDelayData = () => {
    dispatch(
      setSingleFormData({
        unitFK: unitPk,
        authorizedBy: authorizedBy,
        reportingUserFK: userId,
        reportingDriverFK: driverId,
        reason: reason,
        reportedBy: reportedBy,
        addUserFK: 8,
        delayDate: delayDate,
        notes: notes,
      })
    );
  };

  useEffect(() => {
    getDelayValue();
    getSingleDelayData();
  }, [delayUnitId, unitId, authorizedBy, reason, userId, driverId, delayDate, notes, reportedBy]);
  /**
   * Used for setting  unitNumber
   */
  useEffect(() => {
    if (browseUnits) {
      if (delayInputArray?.length > 0 && delayArrayIndex < delayInputArray?.length) {
        dispatch(setUnitInput(delayInputArray[delayArrayIndex].unitNumber));
        dispatch(setDelayUnitId(delayInputArray[delayArrayIndex].unitPK));
      }
    }
    if (singleUnits) {
      dispatch(setUnitInput(unitNo));
    }
  }, [browseUnits, delayArrayIndex, delayInputArray, singleUnits]);

  const validationSchema = yup.object({
    authorizedBy: yup.string().required(),
    reason: yup.string().required(),
  });

  useEffect(() => {
    dispatch(setDelayDate(new Date()));
  }, [delayArrayIndex]);

  /**
   * For reload
   */
  useEffect(() => {
    if (singleUnits === false && browseUnits === false) {
      navigate("/plant-release-selection-screen");
    }
  }, [singleUnits, browseUnits]);
  //clearing value

  useEffect(() => {
    if (reportedBy !== "") {
      dispatch(setDriverInput(""));
      dispatch(setUserInput(""));
    }
  }, [reportedBy]);
  useEffect(() => {
    if (userInput !== "") {
      dispatch(setDriverInput(""));
      dispatch(setReportedBy(""));
    }
  }, [userInput]);

  useEffect(() => {
    if (driverInput !== "") {
      dispatch(setUserInput(""));
      dispatch(setReportedBy(""));
    }
  }, [driverInput]);

  return (
    <Formik
      initialValues={{
        authorizedBy,
        reason,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        authorizedBy: true,
        reason: true,
      }}
    >
      {(formik) => (
        <div className="p-2">
          <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight">
            <Row className="m-0 p-10">
              <Col xs={7}>
                <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 w-120px">
                    <Form.Label className={`${styles.colFormLabel}`}>Unit</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0 w-300">
                    <input
                      type="text"
                      className={`${styles.formControl}`}
                      id="browseUnits"
                      name="browseUnits"
                      disabled
                      value={unitInput}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 w-120px">
                    <Form.Label className={`${styles.colFormLabel}`}>Reason</Form.Label>
                  </Col>
                  <Col xs={7} md={7} sm={7} className="p-0 d-flex w-350">
                    <input
                      type="text"
                      className={`${styles.formControl}  ${
                        formik.errors.reason === undefined && reason != null && reason.length >= 1
                          ? "borderGreen"
                          : formik.errors.reason !== undefined
                            ? "borderRed"
                            : ""
                      }
                      `}
                      id="reason"
                      name="reason"
                      value={reason}
                      maxLength={40}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      onInput={(e) => dispatch(setReason(e.target.value.replace(/^\s+/g, "")))}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 w-120px">
                    <Form.Label className={`${styles.colFormLabel}`}>Authorized By</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0 w-300">
                    <input
                      type="text"
                      className={`${styles.formControl}  ${
                        formik.errors.authorizedBy === undefined &&
                        authorizedBy != null &&
                        authorizedBy.length >= 1
                          ? "borderGreen"
                          : formik.errors.authorizedBy !== undefined
                            ? "borderRed"
                            : ""
                      }
                   `}
                      id="browseUnits"
                      name="browseUnits"
                      value={authorizedBy}
                      maxLength={30}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      onInput={(e) => dispatch(setAuthorizedBy(e.target.value.replace(/^\s+/g, "")))}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 w-120px">
                    <Form.Label className={`${styles.colFormLabel}`}>Reporting Driver</Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="p-0 d-flex w-350">
                    <AutoCompleteDropdown
                      arrayList={driverArray}
                      searchString={driverInput}
                      loading={driverLoading}
                      renderItemId={(item) => item.driverPK}
                      renderItemField={(item) =>
                        item.firstName?.trim() + (item.lastName ? " " + item.lastName?.trim() : "")
                      }
                      handleSearchString={(string) => dispatch(setDriverInput(string))}
                      fetchDataBySearchString={fetchAllDrivers}
                      onSelect={handleDriverLookupSelection}
                      clearInputCallback={() => {
                        dispatch(setDriverId(""));
                      }}
                      selectedId={driverId}
                      disabled={userId !== "" || reportedBy !== ""}

                      className={` ${
                        driverId && driverInput
                          ? ""
                          : (!driverId && !userId && !reportedBy) || (driverId === "" && driverInput != "")
                            ? "borderRed"
                            : ""
                      }`}
                    />
                    <LookupButton
                      onClick={handleDriverLookupModalShow}
                      disabled={userId !== "" || reportedBy !== ""}
                      // driver lookup Modal @ Bottom
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 w-120px">
                    <Form.Label className={`${styles.colFormLabel}`}>Reporting User</Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="p-0 d-flex w-350">
                    <AutoCompleteDropdown
                      arrayList={userArray}

                      searchString={userInput}
                      renderItemId={(item) => item.userPK}
                      renderItemField={(item) => item.name}
                      handleSearchString={(string) => dispatch(setUserInput(string))}
                      selectedId={userId}
                      fetchDataBySearchString={fetchAllUsers}
                      onSelect={handleUserLookupSelection}
                      clearInputCallback={() => {
                        dispatch(setUserId(""));
                      }}
                      loading={userLoading}
                      disabled={driverId !== "" || reportedBy !== ""}
                      className={` ${
                        userId && userInput
                          ? ""
                          : (!driverId && !userId && !reportedBy) || (userId === "" && userInput !== "")
                            ? "borderRed"
                            : ""
                      }`}
                    />
                    <LookupButton
                      onClick={handleUserLookup}
                      disabled={driverId !== "" || reportedBy !== ""}
                      // User lookup Modal @ Bottom
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 w-120px">
                    <Form.Label className={`${styles.colFormLabel}`}>Reported By</Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="p-0  w-300">
                    <input
                      type="text"
                      id="reportedBy"
                      name="reportedBy"
                      maxLength={30}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      value={reportedBy}
                      onInput={(e) => dispatch(setReportedBy(e.target.value.replace(/^\s+/g, "")))}
                      disabled={userId !== "" || driverId !== ""}
                      className={`${styles.formControl}  ${
                        reportedBy ? "" : !driverId && !userId && !reportedBy ? "borderRed" : ""
                      }
                   `}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 w-120px">
                    <Form.Label className={`${styles.colFormLabel}`}>Date Reported</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0  w-100px">
                    <DateInputField
                      date={delayDate}
                      min={new Date()}
                      reduxSetDate={(value) => {
                        dispatch(setDelayDate(value));
                      }}
                      setIsDateValid={(value) => {
                        dispatch(setDelayDateValid(value));
                      }}
                      className={`customFormControl ${
                        !delayDate ? "" : delayDateValid && delayDate ? "" : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col className="ps-lg-5 ">
                <Form.Group className="form-group margin-box-18  customforplantrelease  m-b-10 align-items-center row m-l-0 m-r-0 ">
                  <Col sm={11} md={11} xs={11} className="p-0  w-100px">
                    <label className={`${styles.colFormLabel}`}>Notes</label>
                  </Col>

                  <Col sm={13} md={13} className="p-0 500px">
                    <textarea
                      rows={10}
                      cols={20}
                      type="text"
                      className="form-control h-100 500px"
                      id="notes"
                      name="notes"
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      value={notes}
                      onInput={(e) => dispatch(setNotes(e.target.value.replace(/^\s+/g, "")))}
                    />
                  </Col>
                </Form.Group>
              </Col>

              {/*User Lookup Modal */}
              <UserLookup
                show={showUserLookup}
                onHide={() => setShowUserLookup(false)}
                renderItemId={(user) => user.userPK}
                handleLookupSelection={handleUserLookupSelection}
                MaintenanceProgram
              />
              <DriverLookup
                show={driverLookUpShow}
                onHide={handleDriverLookupModalHide}
                renderItemId={(driver) => driver.driverPK}
                handleLookupSelection={handleDriverLookupSelection}
                MaintenanceProgram
              />
            </Row>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default DelayEntryContent;
