/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {} from "../../../../../services/constants/applicationConstants";
import {
  setDescription,
  setDisableSave,
  setDriverFK,
  setDriverTMRLogPK,
  setDriverTrailerDescription,
  setDriverTrailerFK,
  setDriverTruckFK,
  setDriverTrucksDescription,
  setDue,
  setEditFormData,
  setIsDueValid,
  setIsExpired,
  setIsReturnedValid,
  setListingDriverTMRLogsData,
  setLoginUserData,
  setLoginUserPK,
  setNotes,
  setNotified,
  setReturnUserFK,
  setReturned,
  setShowUserLookup,
  setTMRPeriod,
  setUserFK,
  setUserInput,
  setViewDetail,
} from "../../../../../redux/DriverTMRLogsSlice";
import DateInputField from "../../../../common/DateInputField";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import DriverTMRLogsService from "../../../../../services/DriverTMRLogsService";
import UserLookup from "../../../../LookupScreens/User/UserLookup";
import YardService from "../../../../../services/YardService";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";
import DriverDeleaseRequestsService from "../../../../../services/DriverDeleaseRequestsService";
import LoadingIcon from "../../../../common/LoadingIcon";
import Input from "../../../../../components/common/input";
const DriverTMRLogsContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const { id, driverTMRLogPK } = useParams();
  const [loader, setLoader] = useState(true);
  const tmrperiod = useSelector((state) => state.driverTMRLogsReducer.tmrperiod);
  const notified = useSelector((state) => state.driverTMRLogsReducer.notified);
  const returned = useSelector((state) => state.driverTMRLogsReducer.returned);
  const driverTrailerFK = useSelector((state) => state.driverTMRLogsReducer.driverTrailerFK);
  const description = useSelector((state) => state.driverTMRLogsReducer.description);
  const driverTruckFK = useSelector((state) => state.driverTMRLogsReducer.driverTruckFK);
  const driverTrailerDescription = useSelector(
    (state) => state.driverTMRLogsReducer.driverTrailerDescription
  );
  const driverTrucksDescription = useSelector((state) => state.driverTMRLogsReducer.driverTrucksDescription);
  const due = useSelector((state) => state.driverTMRLogsReducer.due);
  const returnUserFK = useSelector((state) => state.driverTMRLogsReducer.returnUserFK);
  const notes = useSelector((state) => state.driverTMRLogsReducer.notes);
  const viewDetail = useSelector((state) => state.driverTMRLogsReducer.viewDetail);
  const editFormData = useSelector((state) => state.driverTMRLogsReducer.editFormData);
  const changesCancelled = useSelector((state) => state.driverTMRLogsReducer.changesCancelled);
  const userInput = useSelector((state) => state.driverTMRLogsReducer.userInput);
  const userFK = useSelector((state) => state.driverTMRLogsReducer.userFK);
  const showUserLookup = useSelector((state) => state.driverTMRLogsReducer.showUserLookup);
  const isExpired = useSelector((state) => state.driverTMRLogsReducer.isExpired);
  const isDueValid = useSelector((state) => state.driverTMRLogsReducer.isDueValid);
  const isReturnedValid = useSelector((state) => state.driverTMRLogsReducer.isReturnedValid);

  const [loading, setLoading] = useState(false);
  const [returnLoading, setReturnLoading] = useState(false);

  /**
   * API call for fetching Driver TMR records based on Id
   */
  const fetchRecordById = (driverTMRLogPK) => {
    setLoader(true);
    DriverTMRLogsService.getRecordById(driverTMRLogPK)
      .then((response) => {
        setLoader(true);
        const data = response.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
        dispatch(setTMRPeriod(data.tmrperiod));
        setTimeout(() => {
          setLoader(false);
        }, 300);
      })
      .catch((error) => {
        navigate(`/driver-TMRlogs/${id}`);
        setLoader(false);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  /**
   * API call for fetching a User
   */
  const fetchUser = (string) => {
    setReturnLoading(true);
    DriverTMRLogsService.getAllActiveNonPseudoUsers(string)
      .then((response) => {
        const data = response.data.content;
        const managerList = data?.map((managers) => ({
          ...managers,
          name: managers.name?.trim(),
        }));
        setUserData(managerList);

        setTimeout(() => {
          setLoader(false);
        }, 400);
      })
      .catch((error) => {
        setReturnLoading(false);
      })
      .finally(() => setReturnLoading(false));
  };
  /**
   * used for user selection
   */
  const handleUserSelection = (item) => {
    dispatch(setUserFK(item.userPK));
    dispatch(setReturnUserFK(item.userPK));
    dispatch(setUserInput(item.name?.trim()));
  };

  /**
   * used for user selection Lookup
   */
  const handleUserLookup = () => {
    dispatch(setShowUserLookup(true));
  };
  const handleUserLookupSelection = (item) => {
    dispatch(setUserFK(item.userPK));
    dispatch(setReturnUserFK(item.userPK));
    dispatch(setUserInput(item.name?.trim()));
    dispatch(setShowUserLookup(false));
  };

  //to backend data
  const getDriverTMRLogs = () => {
    dispatch(
      setListingDriverTMRLogsData({
        driverTMRLogPK,
        driverFK: id,
        driverTrailerFK: driverTrailerFK,
        driverTrailerDescription,
        driverTruckFK: driverTruckFK,
        driverTrucksDescription,
        tmrperiod,
        notified: notified,
        due: due,
        returned: returned,
        returnUserFK: userFK,
        notes: notes,
      })
    );
  };

  useEffect(() => {
    if (editFormData === undefined || editFormData == null || editFormData === "") {
      dispatch(setDescription(""));
      dispatch(setTMRPeriod(""));
      dispatch(setReturned(""));
      dispatch(setDriverTMRLogPK(""));
      dispatch(setNotified(""));
      dispatch(setDue(""));
      dispatch(setReturnUserFK(""));
      dispatch(setNotes(""));
    }
  }, [editFormData]);

  useEffect(() => {
    setTMRPeriod(null);

    if (tmrperiod) {
      HandlerExpDate(tmrperiod);
    }
  }, [tmrperiod]);

  useEffect(() => {
    if (driverTMRLogPK) {
      fetchRecordById(driverTMRLogPK);
    }
  }, [driverTMRLogPK]);

  useEffect(() => {
    if (!returned) {
      dispatch(setUserFK(""));
      dispatch(setReturnUserFK(""));
      dispatch(setUserInput(""));
    }
  }, [returned, returnUserFK, userFK]);

  useEffect(() => {
    if (driverTMRLogPK) getDriverTMRLogs();
  }, [driverTMRLogPK]);

  useEffect(() => {
    dispatch(setUserInput(""));
  }, []);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setDriverTMRLogPK(editFormData?.driverTMRLogPK || ""));
      dispatch(setDriverFK(editFormData?.driverFK || ""));
      dispatch(setDriverTrailerFK(editFormData?.driverTrailerFK || ""));
      dispatch(setDriverTruckFK(editFormData?.driverTruckFK || ""));
      if (editFormData?.driverTrailerDescription)
        dispatch(setDriverTrailerDescription(editFormData?.driverTrailerDescription));
      if (editFormData?.driverTrucksDescription)
        dispatch(setDriverTrucksDescription(editFormData?.driverTrucksDescription));
      dispatch(
        setDescription(editFormData?.driverTrucksDescription || editFormData?.driverTrailerDescription)
      );
      dispatch(setTMRPeriod(editFormData?.tmrperiod || ""));
      dispatch(setNotified(editFormData?.notified || ""));
      dispatch(setDue(editFormData?.due != null ? formatDatetimeToDate(editFormData?.due) : ""));
      dispatch(
        setReturned(editFormData?.returned != null ? formatDatetimeToDate(editFormData?.returned) : "")
      );
      dispatch(setUserFK(editFormData?.returned != null ? editFormData?.returnUserFK : ""));
      dispatch(setReturnUserFK(editFormData?.returnUserFK ? editFormData?.returnUserFK : ""));
      setUserValue(editFormData?.returnUserFK);
      dispatch(setNotes(editFormData?.notes || ""));
    }
  }, [editFormData, changesCancelled]);

  const HandlerExpDate = () => {
    var dateObj = new Date();
    setLoader(true);
    var currentMonth = dateObj.getUTCMonth() + 1; //months from 1-12 // number
    var Yearstr = dateObj.getUTCFullYear().toString().slice(2);

    //convert year to number
    var currentYear = parseInt(Yearstr); // number

    var date = tmrperiod.split("/");
    var month = parseInt(date[0]); //number
    var year = parseInt(date[1]); //number

    // Comparing month and year components
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      setLoader(false);
      dispatch(setIsExpired(true));
      //  setTimeout(() => {
      //   setLoader(false);
      //          }, 300);
    } else {
      dispatch(setIsExpired(false));
      // setLoader(true);
    }
    setLoader(true);
  };

  // Save Validation
  useEffect(() => {
    if (description && tmrperiod) {
      dispatch(setDisableSave(false));
    } else {
      dispatch(setDisableSave(true));
    }
  }, [description, tmrperiod]);

  //User name set when Edit data
  const setUserValue = (returnUserFK) => {
    if (editFormData != null && returnUserFK != null) {
      YardService.getUserById(returnUserFK)
        .then((response) => {
          const data = response.data;
          dispatch(setUserFK(data.userPK));
          dispatch(setReturnUserFK(data.userPK));
          if (data.userPK !== null) {
            dispatch(setUserInput(data.name?.trim()));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setUserInput(""));
    }
  };
  /******Fetch the Current Login User */
  /****Fetch the user data to display the current user Name */
  const fetchCurrentLoginUser = () => {
    DriverTMRLogsService.getCurrentLoginUser().then(({ data }) => {
      // DriverDeleaseRequestsService.getCurrentLoginUser().then(({ data }) => {
      dispatch(setLoginUserData(data));
      dispatch(setLoginUserPK(data.userPK));
    });
  };

  useEffect(() => {
    fetchCurrentLoginUser();
  }, []);
  useEffect(() => {
    if (!returned) dispatch(setUserInput(""));
  }, [returned]);

  return (
    <div className="w-100 p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row className="m-0 p-10">
              <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items-center row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Description</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <Input
                      name="description"
                      id="description"
                      type="text"
                      className={`customFormControl ${!viewDetail || loading ? (description ? "" : "") : ""}`}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={viewDetail || driverTMRLogPK}
                      maxLength={30}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className=" mt-3 form-group m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Period</Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0">
                    <Input
                      name={tmrperiod}
                      type="text"
                      className={`customFormControl  ${
                        viewDetail === true || loading ? "" : tmrperiod !== "" ? "" : ""
                      }`}
                      maxLength={30}
                      id="tmrperiod"
                      value={tmrperiod}
                      disabled={viewDetail || driverTMRLogPK}

                      onChange={(e) => {
                        dispatch(setTMRPeriod(e.target.value.replace(/^\s+/g, "")));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className=" mt-3 form-group m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col xs={2} sm={2} md={2} className="p-0 ">
                    <Form.Label className="customColFormLabel">Notified</Form.Label>
                  </Col>

                  <Col xs={3} sm={3} className="p-0" style={{ maxWidth: "96px" }}>
                    <DateInputField
                      date={notified}
                      className={"styles.formControl"}
                      setDate={(value) => dispatch(setNotified(value))}
                      disabled={viewDetail || driverTMRLogPK}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className=" mt-3 form-group m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col xs={2} sm={2} md={2} className="p-0 ">
                    <Form.Label className="customColFormLabel">Due</Form.Label>
                  </Col>

                  <Col xs={3} sm={3} className="p-0" style={{ maxWidth: "96px" }}>
                    <DateInputField
                      date={due}
                      className={`styles.formControl ${
                        viewDetail === true || loading || (returned && due !== "")
                          ? ""
                          : due !== "" && isDueValid !== false
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      reduxSetDate={(value) => dispatch(setDue(value))}
                      disabled={viewDetail || (returned && due !== "")}
                      setIsDateValid={(value) => dispatch(setIsDueValid(value))}
                      min={new Date()}
                      onChange={(e) => {
                        dispatch(setDue(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className=" mt-3 form-group m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col xs={2} sm={2} md={2} className="p-0 ">
                    <Form.Label className="customColFormLabel">Returned</Form.Label>
                  </Col>

                  <Col xs={3} sm={3} className="p-0" style={{ maxWidth: "96px" }}>
                    <DateInputField
                      date={returned}
                      className={`styles.formControl ${
                        viewDetail === true ? "" : isReturnedValid ? "" : "borderRed"
                      }`}
                      reduxSetDate={(value) => dispatch(setReturned(value))}
                      min={new Date()}
                      disabled={viewDetail || isExpired}
                      setIsDateValid={(value) => dispatch(setIsReturnedValid(value))}
                      onChange={(e) => {
                        dispatch(setReturned(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className=" mt-3 form-group m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Returned By</Form.Label>
                  </Col>
                  {/* { !loader && ( */}
                  <Col sm={4} md={4} xs={4} className={`p-0 d-flex`}>
                    <AutoCompleteDropdown
                      arrayList={userData}
                      searchString={userInput}
                      renderItemId={(item) => item.userPK}
                      renderItemField={(item) => item.name}
                      handleSearchString={(string) => dispatch(setUserInput(string))}
                      fetchDataBySearchString={fetchUser}
                      onSelect={handleUserSelection}
                      selectedId={returnUserFK}
                      clearInputCallback={() => {
                        dispatch(setReturnUserFK(""));
                        dispatch(setUserFK(""));
                      }}
                      maxHeight={"150px"}
                      disabled={viewDetail || due === "" || isExpired || returned === ""}
                      loading={returnLoading}
                      className={`${
                        viewDetail || !returned || isExpired
                          ? ""
                          : returnUserFK && userInput
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                    />

                    <LookupButton
                      onClick={handleUserLookup}
                      disabled={viewDetail || !returned || isExpired}
                    />
                  </Col>
                  {/* )} */}
                </Form.Group>

                <Form.Group className=" mt-3 m-b-10 align-items row  m-l-0 m-r-0 ">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Notes</Form.Label>
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0">
                    <textarea
                      id="notes"
                      className={`customFormControl h-100 `}
                      rows={7}
                      cols={18}
                      name="notes"
                      type="text"
                      value={notes}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setNotes(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
          {loader && (
            <div className="fade modal-backdrop show">
              {" "}
              <div className="pos-center">
                {" "}
                <div className="loader"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/*User Lookup Modal */}
      <UserLookup
        show={showUserLookup}
        onHide={() => dispatch(setShowUserLookup(false))}
        renderItemId={(user) => user.userPK}
        handleLookupSelection={handleUserLookupSelection}
        MaintenanceProgram
        // YardCheckin
      />
    </div>
  );
};

export default DriverTMRLogsContent;
