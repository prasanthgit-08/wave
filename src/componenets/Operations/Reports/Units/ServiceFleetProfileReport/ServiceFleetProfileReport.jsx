import React, { useEffect, useState } from "react";
import UsersService from "../../../../../services/UsersService";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../common/Header";
import LoadingIcon from "../../../../common/LoadingIcon";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import UserLookup from "../../../../LookupScreens/User/UserLookup";
import ReportComponent from "../../../../common/ReportComponent";
import PreviewPopup from "../../../../common/PreviewPopup";

const ServiceFleetProfileReport = () => {
  const [dispatcherList, setDispatcherList] = useState([]);
  const [dispatcherInput, setDispatcherInput] = useState("");
  const [dispatcherId, setDispatcherId] = useState(null);
  const [showUserLookup, setShowUserLookup] = useState("");
  const [loadingAuto, setLoadingAuto] = useState(false);
  const [dispatcherLoading, setDispatcherLoading] = useState(false);
  const [dispatcherdata, setDispatcherdata] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState();
  const [isTabValid, setIsTabValid] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;
  const SERVICE_FLEET_PROFILE_REPORT_ID = process.env.REACT_APP_SP_SERVICE_FLEET_PROFILE_REPORT;

  const params = {
    DispatcherFK: dispatcherId,
  };

  const getDispatchUserByPermission = () => {
    setDispatcherLoading(true);
    UsersService.getDispatcherUserByPermission(userPK)
      .then((res) => {
        const response = res?.data;
        setDispatcherdata(response[0]?.IsDispatcher);
        if (response[0]?.IsDispatcher) {
          setDispatcherId(loggedInUser?.userPK);
          setDispatcherInput(loggedInUser?.name?.trim());
        }
      })
      .catch(() => {})
      .finally(() => {
        setDispatcherLoading(false);
      });
  };

  const getDispatchUser = (string) => {
    setLoadingAuto(true);
    UsersService.getAllDispatchUser({
      searchTerm: string,
    })
      .then((response) => {
        const data = response?.data;
        const backendList = data?.map((users) => ({
          ...users,
          name: users?.Name?.trim(),
          login: users?.Login?.trim(),
        }));

        let dispatcherList = backendList;
        setDispatcherList(dispatcherList);
      })
      .finally(() => {
        setLoadingAuto(false);
      });
  };

  const handleUserSelection = (item) => {
    setDispatcherId(item.UserPK);
    setDispatcherInput(item.Name?.trim());
    setShowUserLookup(false);
  };

  const resetAllVariables = () => {
    if (dispatcherdata) {
      setDispatcherId(loggedInUser?.userPK);
      setDispatcherInput(loggedInUser?.name?.trim());
    } else {
      setDispatcherId(null);
      setDispatcherInput("");
    }
  };

  // Based on Permission & logged in user, set default user
  useEffect(() => {
    getDispatchUserByPermission();
  }, []);

  // Tab Validation
  useEffect(() => {
    if (dispatcherId || !dispatcherInput) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [dispatcherId, dispatcherInput]);
  const body = (
    <>
      {(loading || dispatcherLoading) && <LoadingIcon />}
      {/* Form Contents */}
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col xs={11}>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-3">
                    <Col xs={2} className="p-0">
                      <Form.Label className="customColFormLabel">Dispatcher</Form.Label>
                    </Col>

                    <Col xs={5} className="p-0 d-flex">
                      <AutoCompleteDropdown
                        arrayList={dispatcherList}
                        searchString={dispatcherInput}
                        renderItemId={(item) => item.UserPK}
                        renderItemField={(item) => item.Name}
                        handleSearchString={(string) => setDispatcherInput(string)}
                        fetchDataBySearchString={getDispatchUser}
                        onSelect={handleUserSelection}
                        selectedId={dispatcherId}
                        clearInputCallback={() => {
                          setDispatcherId(null);
                        }}
                        loading={loadingAuto}
                        // handleAutoCompleteClose={resetVariables}
                        //disabled={viewDetail}
                        className={dispatcherId || !dispatcherInput ? "" : "borderRed"}
                      />
                      <LookupButton onClick={() => setShowUserLookup(true)} />
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
        renderItemId={(user) => user.UserPK}
        handleLookupSelection={handleUserSelection}
        DriverDispatchUser
      />
    </>
  );
  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        resetAllVariables();
      }}
      id={SERVICE_FLEET_PROFILE_REPORT_ID}
      isTabValid={isTabValid}
      payload={params}
      // useType={true}
    />
  );
};

export default ServiceFleetProfileReport;
