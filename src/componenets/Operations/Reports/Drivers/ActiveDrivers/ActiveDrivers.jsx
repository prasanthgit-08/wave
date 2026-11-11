import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import UserLookup from "../../../../LookupScreens/User/UserLookup";
import YardService from "../../../../../services/YardService";
import ReportComponent from "../../../../common/ReportComponent";
import UsersService from "../../../../../services/UsersService";
import LoadingIcon from "../../../../common/LoadingIcon";

const ActiveDrivers = () => {
  const [activeDriverType, setActiveDriverType] = useState("");
  const [dispatcherList, setDispatcherList] = useState([]);
  const [dispatcherInput, setDispatcherInput] = useState("");
  const [dispatcherId, setDispatcherId] = useState(null);
  const [showUserLookup, setShowUserLookup] = useState(false);
  const [isTabValid, setIsTabValid] = useState(false);
  const [dispatcherLoading, setDispatcherLoading] = useState(false);
  const [permissionLoader, setPermissionLoader] = useState(false);
  const [dispatchUserFlag, setDispatchUserFlag] = useState(false);

  const ACTIVE_DRIVERS_REPORT_ID = process.env.REACT_APP_SP_ACTIVE_DRIVERS_REPORT;

  const loggedUserData = JSON.parse(localStorage.getItem("loggedInUserData"));
  const id = loggedUserData?.userPK;
  const name = loggedUserData?.name;

  const getDispatchUserByPermission = () => {
    setPermissionLoader(true);
    UsersService.getDispatcherUserByPermission(id)
      .then((res) => {
        const response = res?.data;
        setDispatchUserFlag(response[0]?.IsDispatcher);
        if (response[0]?.IsDispatcher) {
          setDispatcherId(id);
          setDispatcherInput(name?.trim());
        } else {
          setDispatcherId("");
          setDispatcherInput("");
        }
      })
      .catch(() => {})
      .finally(() => {
        setPermissionLoader(false);
      });
  };

  const returnFormData = {
    activeShuttleDrivers: activeDriverType === "activeShuttleDrivers",
    activeDriveAwayDrivers: activeDriverType === "activeDriveAwayDrivers",
    activePickUpDrivers: activeDriverType === "activePickUpDrivers",
    activeFlatBedDrivers: activeDriverType === "activeFlatBedDrivers",
    activeDriversWithDispatch: activeDriverType === "activeDriversWithDispatch",
    dispatcherUserFK: dispatcherId,
  };

  const getDispatchUser = (string) => {
    setDispatcherLoading(true);
    YardService.getAllUsersWithActiveDriversUserFilter(string)
      .then((response) => {
        const data = response.data.content;
        const userList = data?.map((users) => ({
          ...users,
          name: users.name?.trim(),
        }));
        setDispatcherList(userList);
      })
      .finally(() => {
        setDispatcherLoading(false);
      });
  };

  const handleDispatcherSelection = (item) => {
    setShowUserLookup(false);
    setDispatcherId(item.userPK);
    setDispatcherInput(item.name);
    setShowUserLookup(false);
  };

  const resetFormData = () => {
    setActiveDriverType("");
    getDispatchUserByPermission();
  };

  useEffect(() => {
    getDispatchUserByPermission();
  }, []);

  // Tab Validation
  useEffect(() => {
    if (activeDriverType && (dispatcherId || !dispatcherInput)) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [activeDriverType, dispatcherId, dispatcherInput]);

  const body = (
    <>
      <div className="w-100 p-2">
        {permissionLoader && <LoadingIcon />}
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col xs={11}>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel" />
                    </Col>

                    <Col xs={8} className="p-0">
                      <CustomRadioGroup
                        name="division"
                        verticalAlignmentClassName="mb-3"
                        options={[
                          { value: "activeShuttleDrivers", label: "Active Shuttle Drivers" },
                          { value: "activeDriveAwayDrivers", label: "Active Drive Away Drivers" },
                          { value: "activePickUpDrivers", label: "Active Pick Up Drivers" },
                          { value: "activeFlatBedDrivers", label: "Active Flatbed Drivers" },
                          {
                            value: "activeDriversWithDispatch",
                            label: "Active Drivers With Dispatch In 30 Days",
                          },
                        ]}
                        selectedOption={activeDriverType}
                        onChange={(value) => setActiveDriverType(value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Dispatcher</Form.Label>
                    </Col>

                    <Col xs={5} className="p-0 d-flex">
                      <AutoCompleteDropdown
                        arrayList={dispatcherList}
                        searchString={dispatcherInput}
                        renderItemId={(item) => item.userPK}
                        renderItemField={(item) => item.name}
                        handleSearchString={(string) => setDispatcherInput(string)}
                        fetchDataBySearchString={getDispatchUser}
                        onSelect={handleDispatcherSelection}
                        selectedId={dispatcherId}
                        clearInputCallback={() => setDispatcherId(null)}
                        className={dispatcherId || !dispatcherInput ? "" : "borderRed"}
                        disabled={!activeDriverType}
                        maxHeight="185px"
                        loading={dispatcherLoading}
                      />
                      <LookupButton onClick={() => setShowUserLookup(true)} disabled={!activeDriverType} />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>

      <UserLookup
        show={showUserLookup}
        onHide={() => setShowUserLookup(false)}
        renderItemId={(user) => user.userPK}
        handleLookupSelection={handleDispatcherSelection}
        MaintenanceProgram
      />
    </>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        resetFormData();
      }}
      id={ACTIVE_DRIVERS_REPORT_ID}
      isTabValid={isTabValid}
      payload={returnFormData}
    />
  );
};

export default ActiveDrivers;
