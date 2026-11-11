import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { Col, Form, Row } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import YardService from "../../../../../services/YardService";
import UserLookup from "../../../../LookupScreens/User/UserLookup";
import ReportsFooter from "../../../../common/ReportsFooter";
import AvailableDriverListService from "../../../../../services/Reports/AvailableDriverListService";
import toast from "react-hot-toast";
import LoadingIcon from "../../../../common/LoadingIcon";
import PDFPreviewPopup from "../../../../common/PDFPreviewPopup";
import Header from "../../../../common/Header";
import PreviewPopup from "../../../../common/PreviewPopup";
import UsersService from "../../../../../services/UsersService";
import ReportComponent from "../../../../common/ReportComponent";
import { useDispatch, useSelector } from "react-redux";
import { setBrowseFlag } from "../../../../../redux/UndispatchSlice";
import {
  setDispatchUserId,
  setDispatchUserName,
  setDispatcherDefaulted,
  setOption,
  setDriverDivision,
} from "../../../../../redux/Reports/AvailableDriversSlice";

function AvailableDriverList() {
  const dispatch = useDispatch();

  const savedDispatchUserId = useSelector((state) => state.availableDriversSlice.dispatchUserId);
  const savedDispatchUserName = useSelector((state) => state.availableDriversSlice.dispatchUserName);
  const dispatcherDefaulted = useSelector((state) => state.availableDriversSlice.dispatcherDefaulted);

  const [divisionStatus, setDivisionStatus] = useState("all");
  const [driverOption, setDriverOption] = useState("all");
  const [dispatchUserData, setDispatchUserData] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userFK, setUserFK] = useState("");
  const [showUserLookup, setShowUserLookup] = useState("");
  const [loading, setLoading] = useState(false);
  const [base64PDF, setBase64PDF] = useState();
  const [showPreview, setShowPreview] = useState(false);
  const [isTabValid, setIsTabValid] = useState(false);
  const [dispatcherLoading, setDispatcherLoading] = useState(false);
  const [dispatcherdata, setDispatcherdata] = useState(false);
  const [dispatcherPermissionLoader, setDispatcherPermissionLoader] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;
  const REACT_APP_SP_AVAILABLE_DRIVERS_LIST_REPORT_ID =
    process.env.REACT_APP_SP_AVAILABLE_DRIVERS_LIST_REPORT;

  const getDispatchUserByPermission = () => {
    setDispatcherPermissionLoader(true);
    UsersService.getDispatcherUserByPermission(userPK)
      .then((res) => {
        const response = res?.data;
        setDispatcherdata(response[0]?.IsDispatcher);
        if (response[0]?.IsDispatcher) {
          setUserFK(loggedInUser?.userPK);
          setUserInput(loggedInUser?.name?.trim());
        }
      })
      .catch(() => {})
      .finally(() => {
        setDispatcherPermissionLoader(false);
      });
  };

  const getDispatchUser = (string) => {
    setDispatcherLoading(true);
    YardService.getAllDispatchUserData(string)
      .then((response) => {
        const data = response.data.content;
        const userList = data?.map((users) => ({
          ...users,
          name: users.name?.trim(),
        }));
        setDispatchUserData(userList);
      })
      .finally(() => {
        setDispatcherLoading(false);
      });
  };

  const resetVariables = () => {
    setDivisionStatus("all");
    setDriverOption("all");
    getDispatchUserByPermission();
  };

  const handleUserSelection = (item) => {
    setUserFK(item.userPK);
    setUserInput(item.name?.trim());
  };

  const handleUserLookup = () => {
    setShowUserLookup(true);
  };

  const handleUserLookupSelection = (item) => {
    setUserFK(item.userPK);
    setUserInput(item.name?.trim());
    setShowUserLookup(false);
  };

  useEffect(() => {
    /* the default belongs to a fresh open only, coming back from the browse page restores what
       was left on screen so a cleared dispatcher stays cleared */
    if (dispatcherDefaulted) {
      setUserFK(savedDispatchUserId || "");
      setUserInput(savedDispatchUserName || "");
      return;
    }

    getDispatchUserByPermission();
    dispatch(setDispatcherDefaulted(true));
  }, []);

  // Tab Validation
  useEffect(() => {
    if (userFK || !userInput) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [userFK, userInput]);

  const params = {
    division: divisionStatus,
    driverFilter: driverOption,
    dispatcherFK: userFK,
  };
  useEffect(() => {
    dispatch(setDispatchUserId(userFK || null));
    dispatch(setDispatchUserName(userInput));
    dispatch(setOption(driverOption));
    dispatch(setDriverDivision(divisionStatus));
  }, [userFK, userInput, driverOption, divisionStatus]);

  const body = (
    <>
      {dispatcherPermissionLoader && <LoadingIcon />}
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-5 w-100 mt-0">
              <Form.Group
                className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
              >
                <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "210px" }}>
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Division
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} style={{ right: "300 px" }} className="px-0">
                  <RadioGroup
                    name="divisionValue"
                    className="d-flex"
                    selectedValue={divisionStatus}
                    onChange={(value) => {
                      setDivisionStatus(value);
                    }}
                  >
                    <div className={"d-flex align-items-center me-4 m-b-5"}>
                      <Radio value="all" />
                      <label className="f-w-600 m-l-5">All</label>
                    </div>
                    <div className={"d-flex align-items-center me-4 m-b-5"}>
                      <Radio value="driveAway" />
                      <label className="f-w-600 m-l-5">Driveaway</label>
                    </div>
                    <div className={"d-flex align-items-center me-4 m-b-5 "}>
                      <Radio value="towaway" />
                      <label className="f-w-600 m-l-5">Towaway</label>
                    </div>
                    <div className={"d-flex align-items-center me-4 m-b-5 "}>
                      <Radio value="flatBed" />
                      <label className="f-w-600 m-l-5">Flatbed</label>
                    </div>
                    <div className={"d-flex align-items-center me-4 m-b-5 "}>
                      <Radio value="single" />
                      <label className="f-w-600 m-l-5">Single</label>
                    </div>
                  </RadioGroup>
                </Col>
              </Form.Group>

              <Form.Group
                className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
              >
                <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "210px" }}>
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Drivers
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} style={{ right: "300 px" }} className="px-0">
                  <RadioGroup
                    name="driverValue"
                    className="d-flex"
                    selectedValue={driverOption}
                    onChange={(value) => {
                      setDriverOption(value);
                    }}
                  >
                    <div className={"d-flex align-items-center me-4 m-b-5"}>
                      <Radio value="all" />
                      <label className="f-w-600 m-l-5">All</label>
                    </div>
                    <div className={"d-flex align-items-center me-4 m-b-5"}>
                      <Radio value="new" />
                      <label className="f-w-600 m-l-5">New</label>
                    </div>
                    <div className={"d-flex align-items-center me-4 m-b-5 "}>
                      <Radio value="undispatched" />
                      <label className="f-w-600 m-l-5">Undispatched</label>
                    </div>
                  </RadioGroup>
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "210px" }}>
                  <Form.Label className="col-form-label dealer-label">Dispatcher</Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={dispatchUserData}
                    searchString={userInput}
                    renderItemId={(item) => item.userPK}
                    renderItemField={(item) => item.name}
                    handleSearchString={(string) => setUserInput(string)}
                    fetchDataBySearchString={getDispatchUser}
                    onSelect={handleUserSelection}
                    selectedId={userFK}
                    clearInputCallback={() => {
                      setUserFK("");
                    }}
                    //  handleAutoCompleteClose={resetVariables}
                    //disabled={viewDetail}
                    className={`${!userFK && userInput ? "borderRed" : ""}`}
                    loading={dispatcherLoading}
                  />
                  <LookupButton onClick={handleUserLookup} />
                </Col>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
      <UserLookup
        show={showUserLookup}
        onHide={() => setShowUserLookup(false)}
        renderItemId={(user) => user.userPK}
        handleLookupSelection={handleUserLookupSelection}
        DispatchUserFilter
      />
    </>
  );
  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        resetVariables();
      }}
      id={REACT_APP_SP_AVAILABLE_DRIVERS_LIST_REPORT_ID}
      isTabValid={isTabValid}
      payload={params}
      pageRedirection={"/avaliable-driver-browse-page"}
    />
  );
}

export default AvailableDriverList;
