import { parseLocalDate } from "../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import { useDispatch, useSelector } from "react-redux";
import { setIsUsersTabValid, setSaveCompanyObject } from "../../../../../redux/CompanySlice";
import CompanyService from "../../../../../services/CompanyService";
import UserLookup from "../../../../LookupScreens/User/UserLookup";
import {
  setLoading,
  setTotalElements,
  setTotalPages,
  setUsersData,
} from "../../../../../redux/LookupScreens/UserLookupSlice";
import DateInputField from "../../../../common/DateInputField";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";
import Input from "../../../../../components/common/input";

function Users() {
  const dispatch = useDispatch();
  const companyData = useSelector((state) => state.companyReducer.companyData);
  const viewDetail = useSelector((state) => state.companyReducer.viewDetail);
  let currentTab = useSelector((state) => state.companyReducer.currentTab);
  // local states for system user autocomplete and lookup
  const [userData, setUserData] = useState([]);
  const [systemAdministratorUserName, setSystemAdministratorUserName] = useState("");
  const [systemAdministratorUserId, setSystemAdministratorUserId] = useState(null);
  const [showSystemAdminUserLookup, setShowSystemAdminUserLookup] = useState(false);
  // local states for customer user autocomplete and lookup
  const [customerUserData, setCustomerUserData] = useState([]);
  const [customerUserName, setCustomerUserName] = useState("");
  const [customerUserId, setCustomerUserId] = useState(null);
  const [showCustomerUserLookup, setShowCustomerUserLookup] = useState(false);
  // local states for dealer user autocomplete and lookup
  const [dealerUserData, setDealerUserData] = useState([]);
  const [dealerUserName, setDealerUserName] = useState("");
  const [dealerUserId, setDealerUserId] = useState(null);
  const [showDealerUserLookup, setShowDealerUserLookup] = useState(false);
  // local states for dealer user autocomplete and lookup
  const [driverUserData, setDriverUserData] = useState([]);
  const [driverUserName, setDriverUserName] = useState("");
  const [driverUserId, setDriverUserId] = useState(null);
  const [showDriverUserLookup, setShowDriverUserLookup] = useState(false);
  // local states for dealer user autocomplete and lookup
  const [shuttleDriverUserData, setShuttleDriverUserData] = useState([]);
  const [shuttleDriverUserName, setShuttleDriverUserName] = useState("");
  const [shuttleDriverUserId, setShuttleDriverUserId] = useState(null);
  const [showShuttleDriverUserLookup, setShowShuttleDriverUserLookup] = useState(false);

  const [passwordLifeTime, setPasswordLifeTime] = useState(null);
  const [passwordDays, setPasswordDays] = useState(null);
  const [passwordHistory, setPasswordHistory] = useState(null);
  const [passwordFormat, setPasswordFormat] = useState(null);
  const [employeeBonus, setEmployeeBonus] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [employeeBonusBegin, setEmployeeBonusBegin] = useState("");
  const [employeeBonusEnd, setEmployeeBonusEnd] = useState("");
  const [bonusMilesCurrent, setBonusMilesCurrent] = useState(null);
  const [bonusMilesTrend, setBonusMilesTrend] = useState(null);
  const [bonusMilesDate, setBonusMilesDate] = useState(null);
  const [driverRetentionPercentage, setDriverRetentionPercentage] = useState(null);
  const [isEmployeeBonusBeginValid, setIsEmployeeBonusBeginValid] = useState(true);
  const [isEmployeeBonusEndValid, setIsEmployeeBonusEndValid] = useState(true);
  const [isBonusMilesDateValid, setIsBonusMilesDateValid] = useState(true);
  const [userLoading, setUserLoading] = useState(false);

  // For passing as arguments for common UsersLookup API Call
  const userLookupPageNumber = useSelector((state) => state.userLookupReducer.userLookupPageNumber);
  const searchTerms = useSelector((state) => state.userLookupReducer.searchTerms);
  const sortValue = useSelector((state) => state.userLookupReducer.normalSortValue);
  const sortFlag = useSelector((state) => state.userLookupReducer.normalSortFlag);
  const advanceSortingOrder = useSelector((state) => state.userLookupReducer.advanceSortingOrder);
  const selectedSearchCriteria = useSelector((state) => state.userLookupReducer.selectedSearchCriteria);
  const searchedUser = useSelector((state) => state.userLookupReducer.searchedUser);

  const fetchUserForAutocomplete = (string, label) => {
    setUserLoading(true);
    if (currentTab === "users") {
      CompanyService.fetchUsers(string, label)
        .then((response) => {
          const data = response.data;
          const userList = data.content?.map((data) => ({ ...data, name: data.name?.trim() }));
          if (label === "systemAdmin") {
            setUserData(userList);
          }
          if (label === "customerUser") {
            setCustomerUserData(userList);
          }
          if (label === "dealerUser") {
            setDealerUserData(userList);
          }
          if (label === "driverUser") {
            setDriverUserData(userList);
          }
          if (label === "shuttleDriverUser") {
            setShuttleDriverUserData(userList);
          }
          setUserLoading(false);
        })
        .catch((error) => {
          setUserLoading(false);
          console.error("error..");
        });
    }
  };

  const fetchUserForLookup = (label) => {
    if (currentTab === "users") {
      CompanyService.fetchUsersLookup(
        userLookupPageNumber,
        searchTerms,
        selectedSearchCriteria,
        searchedUser,
        sortValue,
        sortFlag,
        advanceSortingOrder,
        label
      )
        .then((response) => {
          const { data } = response;
          const userList = data.content?.map((users) => ({
            ...users,
            name: users.name?.trim(),
          }));
          dispatch(setUsersData(userList));
          dispatch(setTotalElements(data.totalElements));
          dispatch(setTotalPages(data.totalPages));
          dispatch(setLoading(false));
        })
        .catch((error) => {
          dispatch(setLoading(false));
        });
    }
  };

  const handleUserSelectionAutocomplete = (user) => {
    setSystemAdministratorUserName(user.name?.trim());
    setSystemAdministratorUserId(user.userPK);
    setShowSystemAdminUserLookup(false);
  };
  const handleCustomerUserSelectionAutocomplete = (user) => {
    setCustomerUserName(user.name?.trim());
    setCustomerUserId(user.userPK);
    setShowCustomerUserLookup(false);
  };
  const handleDealerUserSelectionAutocomplete = (user) => {
    setDealerUserName(user.name?.trim());
    setDealerUserId(user.userPK);
    setShowDealerUserLookup(false);
  };
  const handleDriverUserSelectionAutocomplete = (user) => {
    setDriverUserName(user.name?.trim());
    setDriverUserId(user.userPK);
    setShowDriverUserLookup(false);
  };
  const handleShuttleDriverUserSelectionAutocomplete = (user) => {
    setShuttleDriverUserName(user.name?.trim());
    setShuttleDriverUserId(user.userPK);
    setShowShuttleDriverUserLookup(false);
  };

  // to set data from beckend
  useEffect(() => {
    setSystemAdministratorUserId(companyData ? companyData.systemAdministratorUserId || "" : "");
    setSystemAdministratorUserName(companyData ? companyData.systemAdministratorUserName || "" : "");
    setCustomerUserId(companyData ? companyData.customerUserId || "" : "");
    setCustomerUserName(companyData ? companyData.customerUserName || "" : "");
    setDealerUserId(companyData ? companyData.dealerUserId || "" : "");
    setDealerUserName(companyData ? companyData.dealerUserName || "" : "");
    setDriverUserId(companyData ? companyData.driverUserId || "" : "");
    setDriverUserName(companyData ? companyData.driverUserName || "" : "");
    setShuttleDriverUserId(companyData ? companyData.shuttleDriverUserId || "" : "");
    setShuttleDriverUserName(companyData ? companyData.shuttleDriverUserName || "" : "");
    setPasswordLifeTime(companyData ? companyData.passwordLifeTime || "" : "");
    setPasswordDays(companyData ? companyData.passwordDays || "" : "");
    setPasswordHistory(companyData ? companyData.passwordHistory || "" : "");
    setPasswordFormat(companyData ? companyData.passwordFormat?.trim() || "" : "");
    setEmployeeBonus(companyData ? companyData.employeeBonus || "0" : "");
    setEmployees(companyData ? companyData.employees || "0" : "");
    setEmployeeBonusBegin(companyData ? formatDatetimeToDate(companyData.employeeBonusBegin) || "" : "");
    setEmployeeBonusEnd(companyData ? formatDatetimeToDate(companyData.employeeBonusEnd) || "" : "");
    setBonusMilesCurrent(companyData ? companyData.bonusMilesCurrent || "0" : "");
    setBonusMilesTrend(companyData ? companyData.bonusMilesTrend || "0" : "");
    setBonusMilesDate(companyData ? formatDatetimeToDate(companyData.bonusMilesDate) || "" : "");
    setDriverRetentionPercentage(
      companyData ? Math.floor(companyData.driverRetentionPercentage * 100) || "" : ""
    );
  }, [companyData, viewDetail]);

  // setting data to save object
  useEffect(() => {
    dispatch(
      setSaveCompanyObject({
        systemAdministratorUserFK: systemAdministratorUserId,
        customerUserFK: customerUserId,
        dealerUserFK: dealerUserId,
        driverUserFK: driverUserId,
        shuttleDriverUserFK: shuttleDriverUserId,
        passwordLifeTime: passwordLifeTime,
        passwordDays: passwordDays,
        passwordHistory: passwordHistory,
        passwordFormat: passwordFormat,
        employeeBonus: employeeBonus,
        employees: employees,
        employeeBonusBegin: employeeBonusBegin,
        employeeBonusEnd: employeeBonusEnd,
        bonusMilesCurrent: bonusMilesCurrent,
        bonusMilesTrend: bonusMilesTrend,
        bonusMilesDate: bonusMilesDate,
        driverRetentionPercentage: driverRetentionPercentage / 100,
      })
    );
  }, [
    systemAdministratorUserId,
    customerUserId,
    dealerUserId,
    driverUserId,
    shuttleDriverUserId,
    passwordLifeTime,
    passwordDays,
    passwordHistory,
    passwordFormat,
    employeeBonus,
    employees,
    employeeBonusBegin,
    employeeBonusEnd,
    bonusMilesCurrent,
    bonusMilesTrend,
    bonusMilesDate,
    driverRetentionPercentage,
  ]);

  // for save validation of users tab
  useEffect(() => {
    if (
      !systemAdministratorUserId ||
      !customerUserId ||
      !dealerUserId ||
      !driverUserId ||
      !shuttleDriverUserId ||
      !passwordLifeTime ||
      parseInt(passwordLifeTime) > 999 ||
      parseInt(passwordLifeTime) <= 0 ||
      !passwordDays ||
      parseInt(passwordDays) > 999 ||
      parseInt(passwordDays) <= 0 ||
      !passwordHistory ||
      parseInt(passwordHistory) > 999 ||
      parseInt(passwordHistory) <= 0 ||
      !passwordFormat ||
      parseInt(employees) > 32767 ||
      parseInt(employees) < 0 ||
      parseFloat(employeeBonus) < 0.0 ||
      employeeBonus === "." ||
      /^\d*\.$/.test(employeeBonus) ||
      (employeeBonusEnd !== "" && employeeBonusBegin >= employeeBonusEnd) ||
      (employeeBonusEnd !== "" && employeeBonusBegin === "") ||
      (employeeBonusBegin !== "" && employeeBonusEnd <= employeeBonusBegin) ||
      (employeeBonusBegin !== "" && employeeBonusEnd === "") ||
      parseInt(driverRetentionPercentage) > 99 ||
      parseInt(driverRetentionPercentage) <= 0 ||
      !isBonusMilesDateValid ||
      !isEmployeeBonusBeginValid ||
      !isEmployeeBonusEndValid
    ) {
      dispatch(setIsUsersTabValid(false));
    } else {
      dispatch(setIsUsersTabValid(true));
    }
  }, [
    systemAdministratorUserId,
    customerUserId,
    dealerUserId,
    driverUserId,
    shuttleDriverUserId,
    passwordLifeTime,
    passwordDays,
    passwordHistory,
    passwordFormat,
    employees,
    employeeBonus,
    employeeBonusEnd,
    employeeBonusBegin,
    driverRetentionPercentage,
    isBonusMilesDateValid,
    isEmployeeBonusBeginValid,
    isEmployeeBonusEndValid,
  ]);

  return (
    <div className="p-2">
      <div className="d-flex">
        <Col xs={6}>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize  dealer-label">
                system administrator
              </Form.Label>
            </Col>

            <Col xs={5} className="ps-0 pe-3 d-flex">
              <AutoCompleteDropdown
                arrayList={userData}
                searchString={systemAdministratorUserName}
                renderItemId={(item) => item.userPK}
                renderItemField={(item) => item.name}
                handleSearchString={(string) => {
                  setSystemAdministratorUserName(string);
                }}
                loading={userLoading}
                fetchDataBySearchString={(string) => fetchUserForAutocomplete(string, "systemAdmin")}
                onSelect={handleUserSelectionAutocomplete}
                selectedId={systemAdministratorUserId}
                clearInputCallback={() => {
                  setSystemAdministratorUserId(null);
                }}
                disabled={viewDetail}
                className={`customFormControl ${
                  !viewDetail ? (!systemAdministratorUserId ? "borderRed" : "borderGreen") : ""
                }`}
              />

              <LookupButton
                disabled={viewDetail}
                onClick={() => {
                  setShowSystemAdminUserLookup(true);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize  dealer-label">
                Customer User
              </Form.Label>
            </Col>

            <Col xs={5} className="ps-0 pe-3 d-flex">
              <AutoCompleteDropdown
                arrayList={customerUserData}
                searchString={customerUserName}
                renderItemId={(item) => item.userPK}
                renderItemField={(item) => item.name}
                handleSearchString={(string) => {
                  setCustomerUserName(string);
                }}
                loading={userLoading}
                fetchDataBySearchString={(string) => fetchUserForAutocomplete(string, "customerUser")}
                onSelect={handleCustomerUserSelectionAutocomplete}
                selectedId={customerUserId}
                clearInputCallback={() => {
                  setCustomerUserId(null);
                }}
                disabled={viewDetail}
                className={`customFormControl ${
                  !viewDetail ? (!customerUserId ? "borderRed" : "borderGreen") : ""
                }`}
              />

              <LookupButton
                onClick={() => {
                  setShowCustomerUserLookup(true);
                }}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize  dealer-label">
                dealer User
              </Form.Label>
            </Col>

            <Col xs={5} className="ps-0 pe-3 d-flex">
              <AutoCompleteDropdown
                arrayList={dealerUserData}
                searchString={dealerUserName}
                renderItemId={(item) => item.userPK}
                renderItemField={(item) => item.name}
                handleSearchString={(string) => {
                  setDealerUserName(string);
                }}
                loading={userLoading}
                fetchDataBySearchString={(string) => fetchUserForAutocomplete(string, "dealerUser")}
                onSelect={handleDealerUserSelectionAutocomplete}
                selectedId={dealerUserId}
                clearInputCallback={() => {
                  setDealerUserId(null);
                }}
                disabled={viewDetail}
                className={`customFormControl ${
                  !viewDetail ? (!dealerUserId ? "borderRed" : "borderGreen") : ""
                }`}
              />
              <LookupButton
                onClick={() => {
                  setShowDealerUserLookup(true);
                }}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize  dealer-label">
                driver User
              </Form.Label>
            </Col>

            <Col xs={5} className="ps-0 pe-3 d-flex">
              <AutoCompleteDropdown
                arrayList={driverUserData}
                searchString={driverUserName}
                renderItemId={(item) => item.userPK}
                renderItemField={(item) => item.name}
                handleSearchString={(string) => {
                  setDriverUserName(string);
                }}
                loading={userLoading}
                fetchDataBySearchString={(string) => fetchUserForAutocomplete(string, "driverUser")}
                onSelect={handleDriverUserSelectionAutocomplete}
                selectedId={driverUserId}
                clearInputCallback={() => {
                  setDriverUserId(null);
                }}
                disabled={viewDetail}
                className={`customFormControl ${
                  !viewDetail ? (!driverUserId ? "borderRed" : "borderGreen") : ""
                }`}
              />

              <LookupButton
                onClick={() => {
                  setShowDriverUserLookup(true);
                }}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize  dealer-label">
                shuttle driver
              </Form.Label>
            </Col>

            <Col xs={5} className="ps-0 pe-3 d-flex">
              <AutoCompleteDropdown
                arrayList={shuttleDriverUserData}
                searchString={shuttleDriverUserName}
                renderItemId={(item) => item.userPK}
                renderItemField={(item) => item.name}
                handleSearchString={(string) => {
                  setShuttleDriverUserName(string);
                }}
                loading={userLoading}
                fetchDataBySearchString={(string) => fetchUserForAutocomplete(string, "shuttleDriverUser")}
                onSelect={handleShuttleDriverUserSelectionAutocomplete}
                selectedId={shuttleDriverUserId}
                clearInputCallback={() => {
                  setShuttleDriverUserId(null);
                }}
                disabled={viewDetail}
                className={`customFormControl ${
                  !viewDetail ? (!shuttleDriverUserId ? "borderRed" : "borderGreen") : ""
                }`}
              />

              <LookupButton
                onClick={() => {
                  setShowShuttleDriverUserLookup(true);
                }}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center invisible row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                credit card cancel fee
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <Input
                className={`customFormControl `}
                id="name"
                name="name"
                type="text"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                password lifetime
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(passwordLifeTime) > 999 ||
                      parseInt(passwordLifeTime) <= 0 ||
                      passwordLifeTime === ""
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={passwordLifeTime}
                disabled={viewDetail}
                maxLength={5}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  const inputValue = e.target.value;
                  // Check if the input is a positive integer or empty string
                  if (/^\d+$/.test(inputValue) || inputValue === "") {
                    setPasswordLifeTime(inputValue);
                  }
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                password days
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(passwordDays) > 999 || parseInt(passwordDays) <= 0 || passwordDays === ""
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                maxLength={5}
                value={passwordDays}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  const inputValue = e.target.value;
                  // Check if the input is a positive integer or empty string
                  if (/^\d+$/.test(inputValue) || inputValue === "") {
                    setPasswordDays(inputValue);
                  }
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                password history
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(passwordHistory) > 999 ||
                      parseInt(passwordHistory) <= 0 ||
                      passwordHistory === ""
                      ? "borderRed"
                      : "borderGreen"
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                value={passwordHistory}
                disabled={viewDetail}
                maxLength={5}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  const inputValue = e.target.value;
                  // Check if the input is a positive integer or empty string
                  if (/^\d+$/.test(inputValue) || inputValue === "") {
                    setPasswordHistory(inputValue);
                  }
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                password format
              </Form.Label>
            </Col>

            <div className="p-0 col-6">
              <input
                className={`customFormControl ${
                  !viewDetail ? (passwordFormat === "" ? "borderRed" : "borderGreen") : ""
                }`}
                id="name"
                name="name"
                type="text"
                maxLength={100}
                value={passwordFormat}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setPasswordFormat(e.target.value.replace(/ /g, ""));
                }}
              />
            </div>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                employee bonus
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(employeeBonus) < 0.0 ||
                      employeeBonus === "." ||
                      /^\d*\.$/.test(employeeBonus)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                maxLength={8}
                value={employeeBonus}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setEmployeeBonus(e.target.value);
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                employee
              </Form.Label>
            </Col>

            <div className="p-0 col-1">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(employees) > 32767 || parseInt(employees) < 0
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                maxLength={5}
                value={employees}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setEmployees(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                employee bonus begin
              </Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                setIsDateValid={setIsEmployeeBonusBeginValid}
                date={employeeBonusBegin}
                setDate={(value) => setEmployeeBonusBegin(value)}
                disabled={viewDetail}
                max={
                  employeeBonusEnd ? new Date(parseLocalDate(employeeBonusEnd).getTime() - 24 * 60 * 60 * 1000) : ""
                }
                className={`customFormControl ${
                  !viewDetail
                    ? (employeeBonusEnd !== "" && employeeBonusBegin >= employeeBonusEnd) ||
                      (employeeBonusEnd !== "" && employeeBonusBegin === "")
                      ? "borderRed"
                      : isEmployeeBonusBeginValid
                        ? ""
                        : "borderRed"
                    : ""
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                employee bonus end
              </Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                setIsDateValid={setIsEmployeeBonusEndValid}
                date={employeeBonusEnd}
                setDate={(value) => setEmployeeBonusEnd(value)}
                disabled={viewDetail}
                min={
                  employeeBonusBegin
                    ? new Date(parseLocalDate(employeeBonusBegin).getTime() + 24 * 60 * 60 * 1000)
                    : ""
                }

                className={`customFormControl ${
                  !viewDetail
                    ? (employeeBonusBegin !== "" && employeeBonusEnd <= employeeBonusBegin) ||
                      (employeeBonusBegin !== "" && employeeBonusEnd === "")
                      ? "borderRed"
                      : isEmployeeBonusEndValid
                        ? ""
                        : "borderRed"
                    : ""
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                bonus miles current
              </Form.Label>
            </Col>

            <div className="p-0 w-80px">
              <input
                className={`customFormControl ${
                  !viewDetail ? (parseInt(bonusMilesCurrent) < 0 ? "borderRed" : "") : ""
                }`}
                id="name"
                name="name"
                type="text"
                maxLength={9}
                value={bonusMilesCurrent}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  const inputValue = e.target.value;
                  // Check if the input is a positive integer or empty string
                  if (/^\d+$/.test(inputValue) || inputValue === "") {
                    setBonusMilesCurrent(inputValue);
                  }
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                bonus miles trend
              </Form.Label>
            </Col>

            <div className="p-0 w-80px">
              <input
                className={`customFormControl ${
                  !viewDetail ? (parseInt(bonusMilesTrend) < 0 ? "borderRed" : "") : ""
                }`}
                id="name"
                name="name"
                type="text"
                maxLength={9}
                value={bonusMilesTrend}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  const inputValue = e.target.value;
                  // Check if the input is a positive integer or empty string
                  if (/^\d+$/.test(inputValue) || inputValue === "") {
                    setBonusMilesTrend(inputValue);
                  }
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                bonus miles date
              </Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                setIsDateValid={setIsBonusMilesDateValid}
                date={bonusMilesDate}
                setDate={(value) => setBonusMilesDate(value)}
                disabled={viewDetail}
                className={isBonusMilesDateValid ? "" : "borderRed"}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                driver retention percentage
              </Form.Label>
            </Col>

            <div xs={1} sm={1} md={1} className="p-0" style={{ width: "40px" }}>
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(driverRetentionPercentage) > 99 || parseInt(driverRetentionPercentage) <= 0
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                maxLength={2}
                value={driverRetentionPercentage}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setDriverRetentionPercentage(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
        </Col>

        {/* lookup for system admin user */}
        <UserLookup
          show={showSystemAdminUserLookup}
          onHide={() => setShowSystemAdminUserLookup(false)}
          renderItemId={(user) => user.userPK}
          customFetchFunction={() => fetchUserForLookup("systemAdmin")}
          handleLookupSelection={handleUserSelectionAutocomplete}
        />
        {/* lookup for customer user */}
        <UserLookup
          show={showCustomerUserLookup}
          onHide={() => setShowCustomerUserLookup(false)}
          renderItemId={(user) => user.userPK}
          customFetchFunction={() => fetchUserForLookup("customerUser")}
          handleLookupSelection={handleCustomerUserSelectionAutocomplete}
        />
        {/* lookup for dealer user */}
        <UserLookup
          show={showDealerUserLookup}
          onHide={() => setShowDealerUserLookup(false)}
          renderItemId={(user) => user.userPK}
          customFetchFunction={() => fetchUserForLookup("dealerUser")}
          handleLookupSelection={handleDealerUserSelectionAutocomplete}
        />
        {/* lookup for driver user */}
        <UserLookup
          show={showDriverUserLookup}
          onHide={() => setShowDriverUserLookup(false)}
          renderItemId={(user) => user.userPK}
          customFetchFunction={() => fetchUserForLookup("driverUser")}
          handleLookupSelection={handleDriverUserSelectionAutocomplete}
        />
        {/* lookup for shuttle driver user */}
        <UserLookup
          show={showShuttleDriverUserLookup}
          onHide={() => setShowShuttleDriverUserLookup(false)}
          renderItemId={(user) => user.userPK}
          customFetchFunction={() => fetchUserForLookup("shuttleDriverUser")}
          handleLookupSelection={handleShuttleDriverUserSelectionAutocomplete}
        />
      </div>
    </div>
  );
}

export default Users;
