import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../common/Header";
import ReportsFooter from "../../../../common/ReportsFooter";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
import DateInputField from "../../../../common/DateInputField";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import SupplementalRatesService from "../../../../../services/SupplementalRatesService";
import CustomerLookup from "../../../../LookupScreens/Customer/CustomerLookup";
import YardService from "../../../../../services/YardService";
import UserLookup from "../../../../LookupScreens/User/UserLookup";
import UsersService from "../../../../../services/UsersService";
import DispatchedUnitReportService from "../../../../../services/Reports/DispatchedUnitReportService";
import toast from "react-hot-toast";
import PreviewPopup from "../../../../common/PreviewPopup";
import { parseLocalDate, formatDatetimeToDate, normalizeDate } from "../../../../../utils/dateUtils";
import LoadingIcon from "../../../../common/LoadingIcon";
import ReportComponent from "../../../../common/ReportComponent";

const DispatchedUnitReport = () => {
  const [divisionStatus, setDivisionStatus] = useState("All");
  const [source, setSource] = useState("Both");
  const [beginningDate, setBeginningDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [includeHistory, setIncludeHistory] = useState(false);
  const [assigned, setAssigned] = useState(true);
  const [orderByDispatchDate, setOrderByDispatchDate] = useState(false);
  const [orderByOrderDate, setOrderByOrderDate] = useState(false);
  const [customerFK, setCustomerFK] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [customerInput, setCustomerInput] = useState("");
  const [showCustomerLookup, setShowCustomerLookup] = useState("");
  const [dispatchUserData, setDispatchUserData] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userFK, setUserFK] = useState("");
  const [showUserLookup, setShowUserLookup] = useState("");
  const [orderBy, setOrderBy] = useState("Dispatch Date");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState();
  const [isTabValid, setIsTabValid] = useState(false);
  const [dispatcherLoading, setDispatcherLoading] = useState(false);
  const [customerLoading, setcustomerLoading] = useState(false);
  const [permissionLoader, setPermissionLoader] = useState(false);
  const [dispatchUserFlag, setDispatchUserFlag] = useState(false);
  const DISPATCHED_UNIT_LIST_ID = process.env.REACT_APP_SP_GET_DISPATCHED_UNIT_LIST;

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userID = loggedInUser?.userPK;

  const getDispatchUserByPermission = () => {
    setPermissionLoader(true);
    UsersService.getDispatcherUserByPermission(userID)
      .then((res) => {
        const response = res?.data;
        setDispatchUserFlag(response[0]?.IsDispatcher);
        if (response[0]?.IsDispatcher) {
          setUserFK(loggedInUser?.userPK);
          setUserInput(loggedInUser?.name?.trim());
        } else {
          setUserFK("");
          setUserInput("");
        }
      })
      .catch(() => {})
      .finally(() => {
        setPermissionLoader(false);
      });
  };

  const params = {
    divisionParam: divisionStatus,
    sourceParam: source,
    beginningDate: formatDatetimeToDate(beginningDate),
    endDate: formatDatetimeToDate(endDate),
    includeHistory: includeHistory,
    dispatcherId: userFK || null,
    assigned: assigned,
    customerId: customerFK || null,
    orderBy,
  };

  const getCustomers = (string) => {
    setcustomerLoading(true);
    SupplementalRatesService.fetchCustomerAutoComplete(string)
      .then((response) => {
        const data = response.data.content;
        const customerList = data?.map((customers) => ({
          ...customers,
          name: customers.name?.trim(),
        }));
        setCustomerData(customerList);
      })
      .finally(() => {
        setcustomerLoading(false);
      });
  };

  const handleCustomerSelection = (item) => {
    setCustomerFK(item.customerPK);
    setCustomerName(item.name);
    setCustomerInput(item.name?.trim());
  };

  const resetCustomerVariables = () => {
    setCustomerFK(null);
    setCustomerName("");
    // setCustomerInput();
  };

  const handleCustomerLookup = () => {
    setShowCustomerLookup(true);
  };

  const handleCustomerLookupSelection = (item) => {
    setCustomerFK(item.customerPK);
    setCustomerName(item.name);
    setCustomerInput(item.name?.trim());
    setShowCustomerLookup(false);
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
    setUserFK("");
    setUserInput("");
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

  const resetAllVariables = () => {
    setDivisionStatus("All");
    setSource("Both");
    setCustomerFK(null);
    setCustomerInput("");
    setUserFK(null);
    setUserInput("");
    setBeginningDate(new Date());
    setEndDate(new Date());
    setIncludeHistory(false);
    setAssigned(true);
    setOrderBy("Dispatch Date");
  };

  useEffect(() => {
    getDispatchUserByPermission();
  }, []);

  // Tab Validation
  useEffect(() => {
    if (
      beginningDate &&
      isBeginningDateValid &&
      endDate &&
      isEndDateValid &&
      normalizeDate(endDate) >= normalizeDate(beginningDate) &&
      (userFK || !userInput) &&
      (customerFK || !customerInput)
    ) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [
    beginningDate,
    isBeginningDateValid,
    endDate,
    isEndDateValid,
    userFK,
    userInput,
    customerFK,
    customerInput,
  ]);

  const body = (
    <div className="w-100 p-2">
      {permissionLoader && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row className="m-0 p-10">
              <Col xs={11}>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Division</Form.Label>
                  </Col>

                  <Col xs={8} className="p-0">
                    <CustomRadioGroup
                      name="divisionValue"
                      horizontal
                      horizontalAlignmentClassName="pe-4"
                      options={["All", "Driveaway", "Towaway", "Single", "Flatbed", "Popup", "Truckcamper"]}
                      selectedOption={divisionStatus}
                      onChange={(value) => setDivisionStatus(value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Source</Form.Label>
                  </Col>

                  <Col xs={8} className="p-0">
                    <CustomRadioGroup
                      name="source"
                      horizontal
                      horizontalAlignmentClassName="pe-3"
                      options={["Both", "Outbound", "Reload"]}
                      selectedOption={source}
                      onChange={(value) => setSource(value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Beginning Date</Form.Label>
                  </Col>

                  <Col xs={2} className="p-0">
                    <DateInputField
                      date={beginningDate}
                      setDate={setBeginningDate}
                      setIsDateValid={setIsBeginningDateValid}
                      className={beginningDate && isBeginningDateValid ? "borderGreen" : "borderRed"}
                      max={endDate && parseLocalDate(endDate)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">End Date</Form.Label>
                  </Col>

                  <Col xs={2} className="p-0">
                    <DateInputField
                      date={endDate}
                      setDate={setEndDate}
                      setIsDateValid={setIsEndDateValid}
                      className={
                        endDate && isEndDateValid && normalizeDate(endDate) >= normalizeDate(beginningDate)
                          ? "borderGreen"
                          : "borderRed"
                      }
                      min={beginningDate && parseLocalDate(beginningDate)}
                      max={new Date()}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Include History</Form.Label>
                  </Col>

                  <Col xs={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="includeHistory"
                      name="includeHistory"
                      value={includeHistory}
                      checked={includeHistory}
                      onChange={(e) => {
                        setIncludeHistory(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Assigned</Form.Label>
                  </Col>

                  <Col xs={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="assigned"
                      name="assigned"
                      value={assigned}
                      checked={assigned}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setAssigned(checked);
                        setOrderBy(checked ? "Dispatch Date" : "Order Date");
                        if (checked && dispatchUserFlag) {
                          setUserFK(loggedInUser?.userPK);
                          setUserInput(loggedInUser?.name?.trim());
                        } else if (!checked) {
                          setUserFK("");
                          setUserInput("");
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Dispatcher</Form.Label>
                  </Col>

                  <Col xs={5} className="p-0 d-flex">
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
                      handleAutoCompleteClose={resetVariables}
                      disabled={!assigned}
                      className={userFK || !userInput ? "" : "borderRed"}
                      loading={dispatcherLoading}
                      maxHeight="180px"
                    />
                    <LookupButton onClick={handleUserLookup} disabled={!assigned} />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Customer</Form.Label>
                  </Col>

                  <Col xs={5} className="p-0 d-flex">
                    <AutoCompleteDropdown
                      arrayList={customerData}
                      searchString={customerInput}
                      renderItemId={(item) => item.customerPK}
                      renderItemField={(item) => item.name}
                      handleSearchString={(string) => setCustomerInput(string)}
                      fetchDataBySearchString={getCustomers}
                      onSelect={handleCustomerSelection}
                      selectedId={customerFK}
                      clearInputCallback={() => {
                        setCustomerFK("");
                      }}
                      handleAutoCompleteClose={resetCustomerVariables}
                      // disabled={viewDetail}
                      className={customerFK || !customerInput ? "" : "borderRed"}
                      towardsTop
                      loading={customerLoading}
                    />
                    <LookupButton onClick={handleCustomerLookup} />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Order By</Form.Label>
                  </Col>

                  <Col xs={8} className="p-0">
                    <CustomRadioGroup
                      name="orderBy"
                      horizontal
                      horizontalAlignmentClassName="pe-3"
                      options={["Dispatch Date", "Order Date"]}
                      selectedOption={orderBy}
                      onChange={(value) => setOrderBy(value)}
                      disabled={!assigned}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
        <CustomerLookup
          show={showCustomerLookup}
          onHide={() => setShowCustomerLookup(false)}
          renderItemId={(customer) => customer.customerPK}
          renderItemField={(customer) => customer.name}
          handleLookupSelection={handleCustomerLookupSelection}
          MaintenanceProgram
        />
        <UserLookup
          show={showUserLookup}
          onHide={() => setShowUserLookup(false)}
          renderItemId={(user) => user.userPK}
          handleLookupSelection={handleUserLookupSelection}
          MaintenanceProgram
        />
      </div>
    </div>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        resetAllVariables();
        if (dispatchUserFlag) {
          getDispatchUserByPermission();
        }
      }}
      id={DISPATCHED_UNIT_LIST_ID}
      isTabValid={isTabValid}
      payload={params}
    />
  );
};

export default DispatchedUnitReport;
