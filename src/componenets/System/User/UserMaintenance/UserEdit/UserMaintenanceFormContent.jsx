import { formatForApi } from "../../../../../utils/dateUtils";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setActive,
  setId,
  setSaveData,
  setSaveDisable,
  setViewDetail,
  setLoader,
  setLoginValid,
  setOverrideCode,
  setPhoneExtensionExist,
  setPhoneExtensionNumber,
  setPhoneExist,
  setDirectDialPhone,
  setEmailExist,
  setCompanyEmail,
  setLogin,
  setLoginExist,
  setPasswordOk,
  setPassword,
  setOverrideCodeExist,
  setDecryptedPassword,
  setPseudo,
} from "../../../../../redux/UserMaintenanceSearchFilterSlice";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import phoneExtension from "../../../../../utils/validation/PhoneExtension";
import numberValidation from "../../../../../utils/validation/NumberValidation";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import UsersService from "../../../../../services/UsersService";
import LookupButton from "../../../../common/LookupButton";
import CustomerLookup from "../../../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import DealerLookup from "../../../../LookupScreens/Dealer/DealerLookup";
import UserLookup from "../../../../LookupScreens/User/UserLookup";
import DateInputField from "../../../../common/DateInputField";
import { useNavigate } from "react-router-dom";
import StateGroupsLookup from "../../../../LookupScreens/StateGroups/StateGroupsLookup";
import StateGroupsService from "../../../../../services/StateGroupsService";
import DriverLookup from "../../../../LookupScreens/Driver/DriverLookup";
import LoadingIcon from "../../../../common/LoadingIcon";
import { setCurrentUserName } from "../../../../../redux/UserPermissionGroupSlice";
import Input from "../../../../../components/common/input";

/**
 *                              Future Works
 * -----------------------------------------------------------------------------
 * In future when this component is integrated with permission module, then
 * user.view, user.edit permission is required for viewing and editing this
 * maintenance. In addision to that, lastPasswordChangePermission,
 * invoiceOverridePercentagePermission, reloadStateGroupPermission,
 * dispatchRestrictionsPermission,userEditPermission, supervisorUserPermission,
 * viewUserPermissionsPermission and viewUserPermissionsGroupsPermission has to
 * be included in this maintenance. Further when a user is checked as master,
 * then is was said it overrides all other permissions which is not implemented.
 *
 */

function UserMaintenanceFormContent({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStatus = "Active";
  const users = null;
  const searchCriteria = "Beginning";
  const advanceSortingOrder = null;
  const sortValue = null;
  const sortFlag = null;
  const selectedUserStatus = null;
  const type = "Autocomplete";
  const userType = "Supervisor";
  const lastPasswordChangePermission = false;
  const invoiceOverridePercentagePermission = true;
  const reloadStateGroupPermission = true;
  const dispatchRestrictionsPermission = true;

  const [showUserLookUp, setShowUserLookUp] = useState(false);
  const [showCustomerLookUp, setShowCustomerLookUp] = useState(false);
  const [showPlantLookUp, setShowPlantLookUp] = useState(false);
  const [showDealerLookUp, setShowDealerLookUp] = useState(false);
  const [showReloadStateGroupLookUp, setShowReloadStateGroupLookUp] = useState(false);
  const [driverLookUpShow, setDriverLookUpShow] = useState(false);

  const [userData, setUserData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [plantData, setPlantData] = useState([]);
  const [dealerData, setDealerData] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [reloadStateGroups, setReloadStateGroups] = useState([]);
  const [masterExist, setMasterExist] = useState(true);
  const [companyEmailPasswordOK, setCompanyEmailPasswordOK] = useState(false);
  const [companyEmailOk, setcompanyEmailOk] = useState(false);
  const [personalEmailOk, setPersonalEmailOk] = useState(false);
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [initials, setInitials] = useState("");
  const [initialsBackend, setInitialsBackend] = useState("");
  const [passwordBackend, setPasswordBackend] = useState(null);
  const [forcePasswordChange, setForcePasswordChange] = useState(false);
  const [lastPasswordChange, setLastPasswordChange] = useState(formatForApi(new Date()));
  const [companyEmailPassword, setCompanyEmailPassword] = useState("");
  const [companyCellPhone, setCompanyCellPhone] = useState("");
  const [fax, setFax] = useState("");
  const [master, setMaster] = useState(false);
  const [driver, setDriver] = useState(false);
  const [customer, setCustomer] = useState(false);
  const [plant, setPlant] = useState(false);
  const [dealer, setDealer] = useState(false);
  const [driverName, setDriverName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [plantName, setPlantName] = useState("");
  const [dealerName, setDealerName] = useState("");
  const [driverId, setDriverId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [plantId, setPlantId] = useState(null);
  const [dealerId, setDealerId] = useState(null);
  const [supervisor, setSupervisor] = useState("");
  const [supervisorId, setSupervisorId] = useState(null);
  const [division, setDivision] = useState("");
  const [position, setPosition] = useState("");
  const [personalPhone, setPersonalPhone] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [invoiceOverridePercentage, setInvoiceOverridePercentage] = useState("");
  const [reloadStateGroupId, setReloadStateGroupId] = useState(null);
  const [reloadStateGroup, setReloadStateGroup] = useState("");
  const [startTime, setStartTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("00:01:00");
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const pageNumber = useSelector((state) => state.userMaintenanceReducer.pageNumber);
  const active = useSelector((state) => state.userMaintenanceReducer.active);
  const viewDetail = useSelector((state) => state.userMaintenanceReducer.viewDetail);
  const loader = useSelector((state) => state.userMaintenanceReducer.loader);
  const loginValid = useSelector((state) => state.userMaintenanceReducer.loginValid);

  const overrideCodeExist = useSelector((state) => state.userMaintenanceReducer.overrideCodeExist);
  const overrideCode = useSelector((state) => state.userMaintenanceReducer.overrideCode);
  const phoneExtensionNumber = useSelector((state) => state.userMaintenanceReducer.phoneExtensionNumber);
  const phoneExtensionExist = useSelector((state) => state.userMaintenanceReducer.phoneExtensionExist);
  const directDialPhone = useSelector((state) => state.userMaintenanceReducer.directDialPhone);
  const phoneExist = useSelector((state) => state.userMaintenanceReducer.phoneExist);
  const emailExist = useSelector((state) => state.userMaintenanceReducer.emailExist);
  const companyEmail = useSelector((state) => state.userMaintenanceReducer.companyEmail);
  const password = useSelector((state) => state.userMaintenanceReducer.password);
  const passwordOk = useSelector((state) => state.userMaintenanceReducer.passwordOk);
  const login = useSelector((state) => state.userMaintenanceReducer.login);
  const loginExist = useSelector((state) => state.userMaintenanceReducer.loginExist);
  const decryptedPassword = useSelector((state) => state.userMaintenanceReducer.decryptedPassword);
  const pseudo = useSelector((state) => state.userMaintenanceReducer.pseudo);
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUserData"));

  const [referenceLoading, setReferenceLoading] = useState(false);
  const [supervisorLoading, setsupervisorLoading] = useState(false);
  const [reloadStateLoading, setReloadStateLoading] = useState(false);

  useEffect(() => {
    if (id === "") {
      navigate("/user-maintenance");
    }
  }, []);

  const checkEmailFormat = (email) => {
    const regex = /^\w+([.|]\w+)*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    // Trim the email to remove leading/trailing whitespaces
    email = email?.trim();

    if (email !== "" && regex.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  // for upadting end time when start time changes
  const endTimeChange = (startTime) => {
    let timeOne = startTime?.split(":");
    let timeTwo = endTime?.split(":");
    let minutes = (Number(timeOne[1]) + 1).toString();
    let hour = (Number(timeOne[0]) + 1).toString();

    if (timeOne[0] > timeTwo[0]) {
      if (minutes < 60) {
        setEndTime(timeOne[0] + ":" + (minutes.length === 2 ? minutes : "0" + minutes + ":00"));
      } else {
        if (hour === "24") {
          setStartTime("23:58:00");
          setEndTime("23:59:00");
        } else {
          setEndTime((hour.length === 2 ? hour : "0" + hour) + ":00:00");
        }
      }
    } else if (timeOne[0] === timeTwo[0]) {
      if (timeOne[1] >= timeTwo[1]) {
        if (minutes < 60) {
          setEndTime(timeOne[0] + ":" + (minutes.length === 2 ? minutes : "0" + minutes) + ":00");
        } else {
          if (hour === "24") {
            setStartTime("23:58:00");
            setEndTime("23:59:00");
          } else {
            setEndTime((hour.length === 2 ? hour : "0" + hour) + ":00:00");
          }
        }
      }
    }
  };

  // for upadting start time when end time changes
  const startTimeChange = (endTime) => {
    let timeOne = startTime?.split(":");
    let timeTwo = endTime?.split(":");
    let hour = (Number(timeTwo[0]) - 1).toString();
    let minutes = (Number(timeTwo[1]) - 1).toString();

    if (timeOne[0] > timeTwo[0]) {
      if (minutes >= 0) {
        setStartTime(timeTwo[0] + ":" + (minutes.length === 2 ? minutes : "0" + minutes + ":00"));
      } else {
        if (hour < 0) {
          setStartTime("00:00:00");
          setEndTime("00:01:00");
        } else {
          setStartTime((hour.length === 2 ? hour : "0" + hour) + ":59:00");
        }
      }
    } else if (timeOne[0] === timeTwo[0]) {
      if (timeOne[1] >= timeTwo[1]) {
        if (minutes >= 0) {
          setStartTime(timeTwo[0] + ":" + (minutes.length === 2 ? minutes : "0" + minutes) + ":00");
        } else {
          if (hour < 0) {
            setStartTime("00:00:00");
            setEndTime("00:01:00");
          } else {
            setStartTime((hour.length === 2 ? hour : "0" + hour) + ":59:00");
          }
        }
      }
    }
  };

  const clearFields = () => {
    dispatch(setLogin(""));
    dispatch(setPassword(""));
    setForcePasswordChange(false);
    dispatch(setDecryptedPassword(null));
  };

  const clearDriverData = () => {
    setDriver(false);
    setDriverId(null);
    setDriverName("");
  };

  const clearCustomerData = () => {
    setCustomer(false);
    setCustomerId(null);
    setCustomerName("");
  };

  const clearPlantData = () => {
    setPlant(false);
    setPlantId(null);
    setPlantName("");
  };

  const clearDealerData = () => {
    setDealer(false);
    setDealerId(null);
    setDealerName("");
  };

  const handleDriverSelection = (driver) => {
    setDriverName(driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : ""));

    setDriverId(driver.driverPK);
    setDriverLookUpShow(false);
  };

  const handleCustomerSelection = (customer) => {
    setCustomerName(customer.name?.trim());
    setCustomerId(customer.customerPK);
    setShowCustomerLookUp(false);
  };

  const handlePlantSelection = (plant) => {
    setPlantName(plant.name?.trim());
    setPlantId(plant.customerPlantPK);
    setShowPlantLookUp(false);
  };

  const handleDealerSelection = (dealer) => {
    setDealerName(dealer.name?.trim());
    setDealerId(dealer.dealerPK);
    setShowDealerLookUp(false);
  };

  const handleSupervisorSelection = (supervisor) => {
    setSupervisor(supervisor.name?.trim());
    setSupervisorId(supervisor.userPK);
    setShowUserLookUp(false);
  };

  const handleReloadStateGroupSelection = (stateGroup) => {
    setReloadStateGroup(stateGroup.description?.trim());
    setReloadStateGroupId(stateGroup.stateGroupPK);
    setShowReloadStateGroupLookUp(false);
  };

  // service calls
  const isExistingLogin = (login) => {
    if (login !== "") {
      UsersService.isExistingLogin(id, login)
        .then((response) => {
          dispatch(setLoginExist(response.data));
          if (response.data) {
            dispatch(setLoginValid(false));
          } else {
            dispatch(setLoginValid(true));
          }
        })
        .catch((error) => {});
    }
  };

  const checkPasswordFormatBackend = (passowrd) => {
    if (passwordBackend && passwordBackend === passowrd) {
      dispatch(setPasswordOk(true));
    } else {
      if (passowrd.length > 0) {
        UsersService.checkPasswordFormat(id, passowrd)
          .then((response) => {
            dispatch(setPasswordOk(response.data));
          })
          .catch((error) => {});
      } else {
        dispatch(setPasswordOk(true));
      }
    }
  };

  const isExistingEmail = (email) => {
    if (email !== "") {
      UsersService.isExistingEmail(id, email)
        .then((response) => {
          dispatch(setEmailExist(response.data));
        })
        .catch((error) => {});
    }
  };

  const isExistingPhone = (phone) => {
    if (phone !== "") {
      UsersService.isExistingPhone(id, phone.slice(0, 5) + phone.slice(6))
        .then((response) => {
          dispatch(setPhoneExist(response.data));
        })
        .catch((error) => {});
    }
  };

  const isExistingPhoneExtension = (phoneExtension) => {
    if (phoneExtension !== "") {
      UsersService.isExistingPhoneExtension(id, phoneExtension)
        .then((response) => {
          dispatch(setPhoneExtensionExist(response.data));
        })
        .catch((error) => {});
    }
  };

  const isExistingOverrideCode = (overrideCode) => {
    if (overrideCode !== "") {
      UsersService.isExistingOverrideCode(id, overrideCode)
        .then((response) => {
          dispatch(setOverrideCodeExist(response.data));
        })
        .catch((error) => {});
    }
  };

  const fetchDriver = (searchString) => {
    setReferenceLoading(true);
    UsersService.getAllDrivers(searchString, pageNumber)
      .then((response) => {
        const data = response.data;
        const drName = data.content?.map((data) => ({
          ...data,
          firstName: data.firstName,
          lastName: data.lastName ? " " + data.lastName?.trim() : "",
        }));
        setDriverData(drName);
      })
      .finally(() => {
        setReferenceLoading(false);
      });
  };

  const fetchCustomer = (customerName) => {
    setReferenceLoading(true);
    UsersService.getAllCustomers(customerName, pageNumber)
      .then((response) => {
        const data = response.data;
        const cusName = data.content?.map((data) => ({ ...data, name: data.name?.trim() }));
        setCustomerData(cusName);
      })
      .finally(() => {
        setReferenceLoading(false);
      });
  };

  const fetchPlant = (plantName) => {
    setReferenceLoading(true);
    UsersService.getAllPlant(plantName, pageNumber)
      .then((response) => {
        const data = response.data;
        const plName = data.content?.map((data) => ({ ...data, name: data.name?.trim() }));
        setPlantData(plName);
      })
      .finally(() => {
        setReferenceLoading(false);
      });
  };

  const fetchDealer = (dealerName) => {
    setReferenceLoading(true);
    UsersService.getAllDealers(dealerName, pageNumber)
      .then((response) => {
        const data = response.data;
        const dlName = data.content?.map((data) => ({ ...data, name: data.name?.trim() }));
        setDealerData(dlName);
      })
      .finally(() => {
        setReferenceLoading(false);
      });
  };
  const fetchSupervisor = (searchString) => {
    setsupervisorLoading(true);
    UsersService.getAllUsers(
      userStatus,
      0,
      users,
      searchCriteria,
      advanceSortingOrder,
      searchString,
      sortValue,
      sortFlag,
      selectedUserStatus,
      type,
      userType
    )
      .then((response) => {
        const data = response.data;
        const userNames = data.content?.map((data) => ({ ...data, name: data.name?.trim() }));
        // if id is present, filtering out the selected user from supervisor listing as supervisor cannot be the user itself.
        if (id !== null) {
          const filteredData = userNames.filter((item) => item.userPK !== Number(id));
          setUserData(filteredData);
        } else {
          setUserData(userNames);
        }
      })
      .finally(() => {
        setsupervisorLoading(false);
      });
  };

  const fetchDivision = () => {
    UsersService.fetchDivision()
      .then((response) => {
        const data = response.data;
        setDivisions(data);
      })
      .catch((error) => {});
  };

  const fetchReloadStateGroups = (string) => {
    setReloadStateLoading(true);
    StateGroupsService.getStateGroupForAuto(string)
      .then((response) => {
        const data = response.data;
        const reloadDesc = data.content?.map((data) => ({ ...data, description: data.description?.trim() }));
        setReloadStateGroups(reloadDesc);
        setReloadStateLoading(false);
      })
      .catch((error) => {
        setReloadStateLoading(false);
      });
  };

  const checkMasterExist = () => {
    UsersService.checkMasterExist()
      .then((response) => {
        const data = response.data;
        setMasterExist(data ? true : false);
      })
      .catch((error) => {});
  };

  const fetchUserById = () => {
    dispatch(setLoader(true));

    UsersService.fetchUserById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setLoader(false));
        dispatch(setCurrentUserName(data.name?.trim() || ""));
        localStorage.setItem("userName", data.name?.trim() || "");
        setName(data.name?.trim() || "");
        setShortName(data.shortName || "");
        setInitials(data.initials || "");
        setInitialsBackend(data.initials || "");
        dispatch(setLogin(data.login?.startsWith("UNASSIGNED") ? "" : data.login?.trim()));
        dispatch(setPassword(data.password || ""));
        dispatch(setDecryptedPassword(data.decryptedPassword || null));
        // Saved password is valid; clear any stale validation state left over from a cancelled edit
        dispatch(setPasswordOk(true));
        setPasswordBackend(data.decryptedPassword || null);
        setLastPasswordChange(data.lastPasswordChange || "");
        setForcePasswordChange(data.forcePasswordChange || false);
        dispatch(setCompanyEmail(data.email?.trim() || ""));
        setCompanyEmailPassword(data.emailPassword?.trim() || "");
        dispatch(setDirectDialPhone(data.phone ? data.phone?.slice(0, 5) + " " + data.phone?.slice(5) : ""));
        dispatch(setPhoneExtensionNumber(data.phoneExtension || ""));
        setCompanyCellPhone(
          data.cellPhone ? data.cellPhone?.slice(0, 5) + " " + data.cellPhone?.slice(5) : ""
        );
        setFax(data.fax ? data?.fax?.slice(0, 5) + " " + data?.fax?.slice(5) : "");
        setMaster(data.master || false);
        if (data.master) {
          checkMasterExist();
        }
        dispatch(setPseudo(data.pseudoUser || false));
        if (data.pseudoUser) {
          clearFields();
        }
        setDriver(data.driver || false);
        setDriverId(data.driverFK?.driverPK || null);
        setDriverName(
          (
            (data.driverFK?.firstName?.trim() || "") +
            (data.driverFK?.lastName ? " " + data.driverFK.lastName?.trim() : "")
          )?.trim()
        );
        setCustomer(data.customer || false);
        setCustomerName(data.customerFK?.name || "");
        setCustomerId(data.customerFK?.customerPK || null);
        setDealer(data.dealer || false);
        setDealerName(data.dealerFK?.name || "");
        setDealerId(data.dealerFK?.dealerPK || null);
        setPlant(data.customerPlant || false);
        setPlantName(data.customerPlantFK?.name || "");
        setPlantId(data.customerPlantFK?.customerPlantPK || null);
        setSupervisor(data.supervisorUserFKName?.trim() || "");
        setSupervisorId(data.supervisorUserFK || null);
        setDivision(data?.division?.trim() || "");
        setPosition(data.position?.trim() || "");
        setPersonalPhone(
          data.personalPhone ? data?.personalPhone?.slice(0, 5) + " " + data?.personalPhone?.slice(5) : ""
        );
        setPersonalEmail(data.personalEmail || "");
        dispatch(setOverrideCode(data.overrideCode || ""));
        setInvoiceOverridePercentage(data.overInvoicePercentageAmount || "");
        setReloadStateGroupId(data.stateGroupFK?.stateGroupPK || null);
        setReloadStateGroup(data.stateGroupFK?.description || "");
        setStartTime(data.beginDispatch || "00:00:00");
        setEndTime(data.endDispatch || "00:01:00");
        setMonday(data.dispatchMonday || false);
        setTuesday(data.dispatchTuesday || false);
        setWednesday(data.dispatchWendesday || false);
        setThursday(data.dispatchThursday || false);
        setFriday(data.dispatchFriday || false);
        dispatch(setActive(data.active || false));
        if (data.division !== null) {
          fetchDivision();
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  // useeffect for saveData and saveDisable
  useEffect(() => {
    let saveObject = null;
    if (id) {
      saveObject = { ...saveObject, userPK: id };
    }
    if (shortName !== "") {
      saveObject = { ...saveObject, shortName: shortName?.trim() };
    }
    if (initials !== "") {
      saveObject = { ...saveObject, initials: initials };
    }
    if (login !== "") {
      saveObject = { ...saveObject, login: login?.trim() };
    }

    saveObject = { ...saveObject, password: decryptedPassword };

    if (forcePasswordChange) {
      saveObject = { ...saveObject, forcePasswordChange: forcePasswordChange };
    }
    if (!pseudo && lastPasswordChange !== "") {
      saveObject = { ...saveObject, lastPasswordChange: lastPasswordChange };
    }
    if (directDialPhone !== "") {
      saveObject = {
        ...saveObject,
        phone: directDialPhone.slice(0, 5) + directDialPhone.slice(6),
      };
    }
    if (phoneExtensionNumber !== "") {
      saveObject = { ...saveObject, phoneExtension: phoneExtensionNumber };
    }
    if (companyCellPhone !== "") {
      saveObject = {
        ...saveObject,
        cellPhone: companyCellPhone.slice(0, 5) + companyCellPhone.slice(6),
      };
    }
    if (fax !== "") {
      saveObject = { ...saveObject, fax: fax.slice(0, 5) + fax.slice(6) };
    }
    if (master) {
      saveObject = { ...saveObject, master: master };
    }
    if (pseudo) {
      saveObject = { ...saveObject, pseudoUser: pseudo };
    }
    if (driver) {
      saveObject = { ...saveObject, driver: driver, driverIntFK: driverId };
    }
    if (customer) {
      saveObject = {
        ...saveObject,
        customer: customer,
        customerIntFK: customerId,
      };
    }
    if (plant) {
      saveObject = {
        ...saveObject,
        customerPlant: plant,
        customerPlantIntFK: plantId,
      };
    }
    if (dealer) {
      saveObject = { ...saveObject, dealer: dealer, dealerIntFK: dealerId };
    }
    if (supervisorId) {
      saveObject = { ...saveObject, supervisorUserFK: supervisorId };
    }
    if (personalPhone !== "") {
      saveObject = {
        ...saveObject,
        personalPhone: personalPhone.slice(0, 5) + personalPhone.slice(6),
      };
    }
    if (personalEmail !== "") {
      saveObject = { ...saveObject, personalEmail: personalEmail?.trim() };
    }
    if (overrideCode !== "") {
      saveObject = { ...saveObject, overrideCode: overrideCode };
    }
    if (invoiceOverridePercentagePermission && invoiceOverridePercentage > 0) {
      saveObject = {
        ...saveObject,
        overInvoicePercentageAmount: invoiceOverridePercentage,
      };
    }
    if (reloadStateGroupPermission && reloadStateGroupId !== null) {
      saveObject = { ...saveObject, stateGroupIntFK: reloadStateGroupId };
    }
    if (dispatchRestrictionsPermission) {
      saveObject = {
        ...saveObject,
        beginDispatch: startTime?.trim()?.length === 5 ? `${startTime?.trim()}:00` : startTime,
      };
    }
    if (dispatchRestrictionsPermission) {
      saveObject = {
        ...saveObject,
        endDispatch: endTime?.trim()?.length === 5 ? `${endTime?.trim()}:00` : endTime,
      };
    }
    if (dispatchRestrictionsPermission && monday) {
      saveObject = { ...saveObject, dispatchMonday: monday };
    }
    if (dispatchRestrictionsPermission && tuesday) {
      saveObject = { ...saveObject, dispatchTuesday: tuesday };
    }
    if (dispatchRestrictionsPermission && wednesday) {
      saveObject = { ...saveObject, dispatchWendesday: wednesday };
    }
    if (dispatchRestrictionsPermission && thursday) {
      saveObject = { ...saveObject, dispatchThursday: thursday };
    }
    if (dispatchRestrictionsPermission && friday) {
      saveObject = { ...saveObject, dispatchFriday: friday };
    }

    dispatch(
      setSaveData({
        name: name?.trim(),
        email: companyEmail?.trim(),
        emailPassword: companyEmailPassword,
        division: division,
        position: position?.trim(),
        active: active,
        ...saveObject,
      })
    );
  }, [
    name,
    active,
    shortName,
    initials,
    login,
    password,
    passwordOk,
    decryptedPassword,
    forcePasswordChange,
    lastPasswordChange,
    companyEmail,
    companyEmailPassword,
    directDialPhone,
    phoneExtensionNumber,
    companyCellPhone,
    fax,
    master,
    pseudo,
    driver,
    customer,
    plant,
    dealer,
    driverName,
    customerName,
    plantName,
    dealerName,
    driverId,
    customerId,
    plantId,
    dealerId,
    supervisor,
    supervisorId,
    division,
    position,
    personalPhone,
    personalEmail,
    overrideCode,
    invoiceOverridePercentage,
    reloadStateGroup,
    reloadStateGroupId,
    startTime,
    endTime,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    loginExist,
    phoneExtensionExist,
    overrideCodeExist,
    phoneExist,
  ]);

  useEffect(() => {
    if (
      name &&
      companyEmail &&
      !emailExist &&
      companyEmailOk &&
      companyEmailPassword &&
      (initials === "" || (initials && initials.length === 2)) &&
      division &&
      position &&
      (companyCellPhone === "" || (companyCellPhone && companyCellPhone.length === 14)) &&
      (fax === "" || (fax && fax.length === 14)) &&
      (personalPhone === "" || (personalPhone && personalPhone.length === 14)) &&
      (personalEmail === "" || (personalEmail && personalEmailOk)) &&
      (!overrideCode || (overrideCode && overrideCode.length >= 8 && !overrideCodeExist)) &&
      supervisorId &&
      ((reloadStateGroupId && reloadStateGroup) || !reloadStateGroup) &&
      (!dispatchRestrictionsPermission ||
        (dispatchRestrictionsPermission && (monday || tuesday || wednesday || thursday || friday))) &&
      // if pseudo user
      ((pseudo &&
        (!driver || (driver && driverId)) &&
        (!customer || (customer && customerId)) &&
        (!plant || (plant && plantId)) &&
        (!dealer || (dealer && dealerId)) &&
        (directDialPhone === "" || (directDialPhone && directDialPhone.length === 14 && !phoneExist)) &&
        (phoneExtensionNumber === "" ||
          (phoneExtensionNumber && phoneExtensionNumber.length >= 3 && !phoneExtensionExist))) ||
        // if not pseudo
        (!pseudo &&
          shortName &&
          initials &&
          initials.length === 2 &&
          !loginExist &&
          login &&
          decryptedPassword &&
          passwordOk &&
          directDialPhone &&
          directDialPhone.length === 14 &&
          !phoneExist &&
          phoneExtensionNumber &&
          phoneExtensionNumber.length >= 3 &&
          !phoneExtensionExist))
    ) {
      dispatch(setSaveDisable(false));
    } else {
      dispatch(setSaveDisable(true));
    }
  }, [
    companyCellPhone,
    companyEmail,
    emailExist,
    companyEmailOk,
    companyEmailPassword,
    customer,
    customerId,
    dealer,
    dealerId,
    decryptedPassword,
    directDialPhone,
    dispatchRestrictionsPermission,
    division,
    driver,
    driverId,
    fax,
    friday,
    initials,
    login,
    loginExist,
    monday,
    name,
    overrideCode,
    overrideCodeExist,
    password,
    passwordOk,
    personalEmail,
    personalEmailOk,
    personalPhone,
    phoneExist,
    phoneExtensionExist,
    phoneExtensionNumber,
    plant,
    plantId,
    position,
    pseudo,
    reloadStateGroup,
    reloadStateGroupId,
    shortName,
    supervisorId,
    thursday,
    tuesday,
    wednesday,
  ]);

  useEffect(() => {
    if (active && !viewDetail) {
      isExistingPhone(directDialPhone);
      isExistingPhoneExtension(phoneExtensionNumber);
    } else {
      dispatch(setPhoneExist(false));
      dispatch(setPhoneExtensionExist(false));
    }
  }, [viewDetail, active, masterExist, master]);

  useEffect(() => {
    dispatch(setLoginExist(false));
    dispatch(setLoginValid(true));
  }, [viewDetail]);

  useEffect(() => {
    if (viewDetail && id) {
      fetchUserById();
      dispatch(setViewDetail(true));
    }
    if (!viewDetail) {
      fetchDivision();
      fetchReloadStateGroups();
      isExistingLogin(login);
      setcompanyEmailOk(checkEmailFormat(companyEmail));
      setPersonalEmailOk(checkEmailFormat(personalEmail));
      setCompanyEmailPasswordOK(true);
    }
  }, [viewDetail, id]);

  useEffect(() => {
    if (pseudo) {
      clearFields();
    }
  }, [pseudo]);

  useEffect(() => {
    dispatch(setId(id || null));
    dispatch(setActive(false));
    if (id) {
      dispatch(setViewDetail(true));
    } else {
      dispatch(setViewDetail(false));
    }
  }, []);

  useEffect(() => {
    if (initials === "") {
      setInitialsBackend("");
    }
  }, [initials]);

  const handleDriverLookupModalShow = () => {
    setDriverLookUpShow(true);
  };

  const handleDriverLookupModalHide = () => {
    setDriverLookUpShow(false);
  };

  useEffect(() => {
    if (!viewDetail && !pseudo) {
      if (name !== "") {
        setShortName(name.split(" ")[0]);
        if (name.split(" ").length > 1) {
          setInitials(
            name?.trim().split(" ")[0][0].toUpperCase() + (name.split(" ").pop().toUpperCase()[0] || "")
          );
        } else {
          setInitials(initialsBackend?.length === 2 ? initialsBackend : name.split(" ")[0][0].toUpperCase());
        }
      } else {
        setShortName("");
        setInitials("");
      }
    }
  }, [!viewDetail, name, pseudo]);

  useEffect(() => {
    if (!id || id === undefined || id === " ") {
      setForcePasswordChange(true);
      dispatch(setLoader(false));
    }
  }, []);

  return (
    <div className="p-2">
      {loader && <LoadingIcon />}
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <Row className="m-0 p-0">
          <Col md={6} lg={6} xl={6} xs={6}>
            <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  {t("edit.dealer.page.general.tab.name")}
                </Form.Label>
              </Col>
              <Col xs={6} className="p-0">
                <Input
                  className={`${"customFormControl"} ${viewDetail ? "" : name !== "" ? "borderGreen" : "borderRed"}`}
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  maxLength={50}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    setName(e.target.value.replace(/^\s+/, ""));
                  }}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Short Name
                </Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <Input
                  className={`${"customFormControl"} ${
                    viewDetail ? "" : pseudo ? "" : shortName !== "" ? "borderGreen" : "borderRed"
                  }`}
                  id="dba"
                  name="dba"
                  type="text"
                  value={shortName}
                  maxLength={20}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    setShortName(e.target.value.replace(/[\s.]+/g, ""));
                  }}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="initials" className="col-form-label dealer-label">
                  Initials
                </Form.Label>
              </Col>
              <div className="p-0 w-40px">
                <Input
                  className={`${"customFormControl"} ${
                    viewDetail
                      ? ""
                      : pseudo
                        ? initials !== "" && initials.length !== 2
                          ? "borderRed"
                          : ""
                        : initials.length === 2
                          ? "borderGreen"
                          : "borderRed"
                  }`}
                  id="initials"
                  name="initials"
                  type="text"
                  value={initials}
                  maxLength={2}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    setInitials(e.target.value.toUpperCase().replace(/[\s.]+/g, ""));
                  }}
                  disabled={viewDetail}
                />
              </div>
            </Form.Group>

            <Form.Group className="mt-3 row  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="login" className="col-form-label dealer-label">
                  Login
                </Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0">
                <Input
                  className={`${"customFormControl"} ${
                    viewDetail
                      ? ""
                      : pseudo
                        ? ""
                        : login !== "" && !loginExist && loginValid
                          ? "borderGreen"
                          : "borderRed"
                  }`}
                  name="login"
                  id="login"
                  type="text"
                  value={login}
                  maxLength={128}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    dispatch(setLoginExist(false));
                    dispatch(setLoginValid(true));
                    dispatch(setLogin(e.target.value.replace(/[\s.]+/g, "")));
                  }}
                  onBlur={(e) => {
                    isExistingLogin(e.target.value);
                  }}
                  disabled={pseudo || viewDetail}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="decryptedPassword" className=" col-form-label dealer-label">
                  Password
                </Form.Label>
              </Col>
              <Col xs={3} className="p-0">
                <input
                  className={`${"customFormControl"} ${
                    viewDetail
                      ? ""
                      : pseudo
                        ? ""
                        : decryptedPassword && decryptedPassword?.length !== 0 && passwordOk
                          ? "borderGreen"
                          : "borderRed"
                  }`}
                  name="decryptedPswd"
                  id="decryptedPswd"
                  value={decryptedPassword || ""}
                  readOnly={viewDetail}
                  maxLength={50}
                  aria-autocomplete="list"
                  type="password"
                  autoComplete="one-time-code"
                  spellCheck={false}
                  onChange={(e) => {
                    dispatch(setDecryptedPassword(e.target.value.replace(/\s+/g, "")));
                    const value = e.target.value.replace(/\s+/g, "");
                    if (value) {
                      checkPasswordFormatBackend(value);
                    }
                  }}
                  disabled={pseudo || viewDetail}
                />
              </Col>
            </Form.Group>

            <Row
              className={
                !viewDetail &&
                decryptedPassword !== null &&
                decryptedPassword.length !== 0 &&
                !passwordOk &&
                !pseudo
                  ? ""
                  : "hide-elements"
              }
            >
              <Col xs={3} md={3} sm={3}></Col>
              <Col style={{ paddingLeft: "5px" }}>
                <p className="mb-0 text-danger">Invalid Password Format!</p>
              </Col>
            </Row>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={3} className="p-0">
                <Form.Label htmlFor="forcePasswordChange" className=" col-form-label dealer-label">
                  Force Password Change
                </Form.Label>
              </Col>
              <Col xs={5} md={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  value={forcePasswordChange}
                  checked={forcePasswordChange}
                  onChange={(e) => {
                    setForcePasswordChange(e.target.checked);
                  }}
                  disabled={viewDetail || pseudo}
                  readOnly={pseudo}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="forcePasswordChange" className=" col-form-label dealer-label">
                  Last Password Change
                </Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <DateInputField
                  date={lastPasswordChange}
                  setDate={setLastPasswordChange}
                  disabled={viewDetail || !lastPasswordChangePermission || pseudo}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="companyEmail" className="col-form-label dealer-label">
                  Company Email
                </Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <Input
                  className={`${"customFormControl"} ${
                    viewDetail
                      ? ""
                      : companyEmail !== "" && companyEmailOk && !emailExist
                        ? "borderGreen"
                        : "borderRed"
                  }`}
                  id="companyEmail"
                  type="text"
                  name="companyEmail"
                  value={companyEmail}
                  maxLength={70}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    dispatch(setEmailExist(false));
                    const value = e.target.value.replace(/\s+/, "");
                    dispatch(setCompanyEmail(value));
                    if (value) {
                      setcompanyEmailOk(checkEmailFormat(value));
                    }
                  }}
                  onBlur={(e) => {
                    if (companyEmailOk) {
                      isExistingEmail(e.target.value);
                    }
                  }}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="companyEmailPassword" className="col-form-label dealer-label">
                  Company Email Password
                </Form.Label>
              </Col>

              <Col xs={3} className="p-0">
                <Input
                  className={`${"customFormControl"} ${
                    viewDetail ? "" : companyEmailPassword.length > 0 ? "borderGreen" : "borderRed"
                  }`}
                  id="companyEmailPassword"
                  type="text"
                  name="companyEmailPassword"
                  value={companyEmailPassword}
                  maxLength={20}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    setCompanyEmailPassword(e.target.value.replace(/\s+/g, ""));
                  }}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="directDialPhone" className="col-form-label dealer-label">
                  Direct Dial Phone
                </Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
                <Input
                  className={`${"customFormControl"} ${
                    !viewDetail
                      ? pseudo
                        ? !directDialPhone || (directDialPhone.length === 14 && !phoneExist)
                          ? ""
                          : "borderRed"
                        : directDialPhone && directDialPhone.length === 14 && !phoneExist
                          ? "borderGreen"
                          : "borderRed"
                      : ""
                  }`}
                  id="directDialPhone"
                  type="tel"
                  name="directDialPhone"
                  value={directDialPhone}
                  maxLength={14}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    dispatch(setPhoneExist(false));
                    dispatch(setDirectDialPhone(formatPhoneNumber(e.target.value)));
                  }}
                  onBlur={(e) => {
                    active && isExistingPhone(e.target.value);
                  }}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="phoneExtensionNumber" className="col-form-label dealer-label">
                  Phone Extension
                </Form.Label>
              </Col>

              <div className="p-0 w-40px">
                <Input
                  className={`${"customFormControl"} ${
                    viewDetail
                      ? ""
                      : pseudo
                        ? phoneExtensionNumber !== "" && phoneExtensionNumber.length < 3
                          ? "borderRed"
                          : ""
                        : phoneExtensionNumber !== "" &&
                            phoneExtensionNumber.length >= 3 &&
                            !phoneExtensionExist
                          ? "borderGreen"
                          : "borderRed"
                  }`}
                  id="phoneExtensionNumber"
                  type="text"
                  name="phoneExtensionNumber"
                  value={phoneExtensionNumber}
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    dispatch(setPhoneExtensionExist(false));
                    dispatch(setPhoneExtensionNumber(phoneExtension(numberValidation(e.target.value))));
                  }}
                  onBlur={(e) => {
                    isExistingPhoneExtension(e.target.value);
                  }}
                  disabled={viewDetail}
                />
              </div>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="companyCellPhone" className="col-form-label dealer-label">
                  Company Cell Phone
                </Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
                <Input
                  className={`${"customFormControl"} ${
                    viewDetail
                      ? ""
                      : companyCellPhone !== "" && companyCellPhone.length !== 14
                        ? "borderRed"
                        : ""
                  }`}
                  id="companyCellPhone"
                  type="tel"
                  name="companyCellPhone"
                  value={companyCellPhone}
                  maxLength={14}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    setCompanyCellPhone(formatPhoneNumber(e.target.value));
                  }}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="fax" className="col-form-label dealer-label">
                  FAX
                </Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
                <Input
                  className={`${"customFormControl"} ${
                    viewDetail ? "" : fax !== "" && fax.length > 0 && fax.length !== 14 ? "borderRed" : ""
                  }`}
                  id="fax"
                  type="tel"
                  name="fax"
                  value={fax}
                  maxLength={14}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    setFax(formatPhoneNumber(e.target.value));
                  }}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>
          </Col>

          <Col sm={6} md={6} xs={6}>
            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">User Type</Form.Label>
              </Col>

              <Col
                xs={8}
                md={8}
                sm={8}
                className="p-0 d-flex flex-wrap align-items-center justify-content-start"
              >
                <div className="align-items-center d-flex me-3">
                  <input
                    type="checkbox"
                    id="master"
                    name="master"
                    disabled={pseudo || viewDetail || (master && !masterExist) || !loggedUser?.master}
                    value={master}
                    onChange={(e) => {
                      setMaster(e.target.checked);
                    }}
                    checked={master}
                  />
                  <label className="ms-1" htmlFor="master">
                    Master
                  </label>
                </div>

                <div className="align-items-center d-flex me-3">
                  <input
                    type="checkbox"
                    id="pseudo"
                    name="pseudo"
                    disabled={master || viewDetail}
                    value={pseudo}
                    onChange={(e) => {
                      dispatch(setPseudo(e.target.checked));
                      clearDriverData();
                      clearCustomerData();
                      clearPlantData();
                      clearDealerData();
                    }}
                    checked={pseudo}
                  />
                  <label className="ms-1" htmlFor="pseudo">
                    Pseudo
                  </label>
                </div>

                <div className="align-items-center d-flex me-3">
                  <input
                    type="checkbox"
                    id="driver"
                    name="driver"
                    disabled={!pseudo || viewDetail}
                    value={driver}
                    onChange={(e) => {
                      setDriver(e.target.checked);
                      !e.target.checked && clearDriverData();
                      clearCustomerData();
                      clearPlantData();
                      clearDealerData();
                    }}
                    checked={driver}
                  />
                  <label className="ms-1" htmlFor="driver">
                    Driver
                  </label>
                </div>

                <div className="align-items-center d-flex me-3">
                  <input
                    type="checkbox"
                    id="customer"
                    name="customer"
                    disabled={!pseudo || viewDetail}
                    value={customer}
                    onChange={(e) => {
                      setCustomer(e.target.checked);
                      clearDriverData();
                      !e.target.checked && clearCustomerData();
                      clearPlantData();
                      clearDealerData();
                    }}
                    checked={customer}
                  />
                  <label className="ms-1" htmlFor="customer">
                    Customer
                  </label>
                </div>

                <div className="align-items-center d-flex me-3">
                  <input
                    type="checkbox"
                    id="plant"
                    name="plant"
                    disabled={!pseudo || viewDetail}
                    value={plant}
                    onChange={(e) => {
                      setPlant(e.target.checked);
                      clearDriverData();
                      clearCustomerData();
                      !e.target.checked && clearPlantData();
                      clearDealerData();
                    }}
                    checked={plant}
                  />
                  <label className="ms-1" htmlFor="plant">
                    Plant
                  </label>
                </div>
                <div className="align-items-center d-flex ">
                  <input
                    type="checkbox"
                    id="dealer"
                    name="dealer"
                    disabled={!pseudo || viewDetail}
                    value={dealer}
                    onChange={(e) => {
                      setDealer(e.target.checked);
                      clearDriverData();
                      clearCustomerData();
                      clearPlantData();
                      !e.target.checked && clearDealerData();
                    }}
                    checked={dealer}
                  />
                  <label className="ms-1" htmlFor="dealer">
                    Dealer
                  </label>
                </div>
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="referenceName" className="col-form-label dealer-label">
                  Reference Name
                </Form.Label>
              </Col>
              {/* Autocomplete for driverdata. In future change dealerPk to driverPK */}
              {!customer && !plant && !dealer && (
                <Col xs={5} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={driverData}
                    searchString={driverName}
                    renderItemId={(driver) => driver.driverPK}
                    renderItemField={(driver) =>
                      driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : "")
                    }
                    handleSearchString={(string) => setDriverName(string)}
                    fetchDataBySearchString={fetchDriver}
                    onSelect={handleDriverSelection}
                    selectedId={driverId}
                    loading={referenceLoading}
                    clearInputCallback={() => {
                      setDriverId(null);
                    }}
                    className={`${"customFormControl"} ${
                      viewDetail
                        ? ""
                        : driver
                          ? driverId === "" || driverId === null || driverName === ""
                            ? "borderRed"
                            : "borderGreen"
                          : null
                    }`}
                    disabled={!driver || viewDetail}
                  />
                  <LookupButton
                    disabled={!driver || viewDetail}
                    onClick={() => handleDriverLookupModalShow(true)}
                  />
                </Col>
              )}
              {customer && (
                <Col xs={5} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={customerData}
                    searchString={customerName}
                    renderItemId={(customer) => customer.customerPK}
                    renderItemField={(customer) => customer.name}
                    handleSearchString={(string) => setCustomerName(string)}
                    fetchDataBySearchString={fetchCustomer}
                    onSelect={handleCustomerSelection}
                    selectedId={customerId}
                    loading={referenceLoading}
                    clearInputCallback={() => {
                      setCustomerId(null);
                    }}
                    className={`${"customFormControl"} ${
                      viewDetail ? "" : !customerId || customerName === "" ? "borderRed" : "borderGreen"
                    }`}
                    disabled={!customer || viewDetail}
                  />
                  <LookupButton
                    disabled={!customer || viewDetail}
                    onClick={() => setShowCustomerLookUp(true)}
                  />
                </Col>
              )}
              {plant && (
                <Col xs={5} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={plantData}
                    searchString={plantName}
                    renderItemId={(plant) => plant.customerPlantPK}
                    renderItemField={(plant) => plant.name}
                    handleSearchString={(string) => setPlantName(string)}
                    fetchDataBySearchString={fetchPlant}
                    onSelect={handlePlantSelection}
                    selectedId={plantId}
                    loading={referenceLoading}
                    clearInputCallback={() => {
                      setPlantId(null);
                    }}
                    className={`${"customFormControl"} ${
                      viewDetail
                        ? ""
                        : plant
                          ? !plantId || plantName === ""
                            ? "borderRed"
                            : "borderGreen"
                          : null
                    }`}
                    disabled={!plant || viewDetail}
                  />
                  <LookupButton disabled={!plant || viewDetail} onClick={() => setShowPlantLookUp(true)} />
                </Col>
              )}
              {dealer && (
                <Col xs={5} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={dealerData}
                    searchString={dealerName}
                    renderItemId={(dealer) => dealer.dealerPK}
                    renderItemField={(dealer) => dealer.name}
                    handleSearchString={(string) => setDealerName(string)}
                    fetchDataBySearchString={fetchDealer}
                    onSelect={handleDealerSelection}
                    selectedId={dealerId}
                    loading={referenceLoading}
                    clearInputCallback={() => {
                      setDealerId(null);
                    }}
                    className={`${"customFormControl"} ${
                      viewDetail
                        ? ""
                        : dealer
                          ? !dealerId || dealerName === ""
                            ? "borderRed"
                            : "borderGreen"
                          : null
                    }`}
                    disabled={!dealer || viewDetail}
                  />
                  <LookupButton disabled={!dealer || viewDetail} onClick={() => setShowDealerLookUp(true)} />
                </Col>
              )}
            </Form.Group>
            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="supervisor" className="col-form-label dealer-label">
                  Supervisor
                </Form.Label>
              </Col>
              <Col xs={5} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={userData}
                  searchString={supervisor}
                  renderItemId={(supervisor) => supervisor.userPK}
                  renderItemField={(supervisor) => supervisor.name?.trim()}
                  handleSearchString={(string) => setSupervisor(string)}
                  fetchDataBySearchString={fetchSupervisor}
                  onSelect={handleSupervisorSelection}
                  selectedId={supervisorId}
                  loading={supervisorLoading}
                  clearInputCallback={() => {
                    setSupervisorId("");
                  }}
                  className={`${"customFormControl"} ${
                    viewDetail ? "" : !supervisorId ? "borderRed" : "borderGreen"
                  }`}
                  disabled={viewDetail}
                />
                <LookupButton disabled={viewDetail} onClick={() => setShowUserLookUp(true)} />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="division" className="col-form-label dealer-label">
                  Division
                </Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0">
                <Form.Select
                  className={`${"customFormControl"} ${
                    viewDetail ? "" : !division ? "borderRed" : "borderGreen"
                  }`}
                  name="division"
                  id="division"
                  value={division}
                  onChange={(e) => {
                    setDivision(e.target.value);
                  }}
                  disabled={viewDetail}
                >
                  <option value="">--Select--</option>
                  {divisions?.map((division) => (
                    <option key={division.divisionID} value={division.divisionID}>
                      {division.divisionName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="position" className="col-form-label dealer-label">
                  Position
                </Form.Label>
              </Col>

              <Col xs={4} md={4} sm={4} className="p-0">
                <Input
                  className={`${"customFormControl"} ${
                    viewDetail ? "" : position === null || position === "" ? "borderRed" : "borderGreen"
                  }`}
                  id="position"
                  type="text"
                  name="position"
                  value={position}
                  maxLength={40}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    setPosition(e.target.value.replace(/^\s+/, ""));
                  }}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="personalPhone" className="col-form-label dealer-label">
                  Personal Phone
                </Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
                <Input
                  className={`${"customFormControl"} ${
                    viewDetail ? "" : personalPhone !== "" && personalPhone.length !== 14 ? "borderRed" : ""
                  }`}
                  id="personalPhone"
                  type="tel"
                  name="personalPhone"
                  value={personalPhone}
                  maxLength={14}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    setPersonalPhone(formatPhoneNumber(e.target.value));
                  }}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="personalEmail" className="col-form-label dealer-label">
                  Personal Email
                </Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0">
                <Input
                  className={`${"customFormControl"} ${
                    viewDetail ? "" : personalEmail !== "" && !personalEmailOk ? "borderRed" : ""
                  }`}
                  id="personalEmail"
                  type="text"
                  name="personalEmail"
                  value={personalEmail}
                  maxLength={70}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    setPersonalEmail(e.target.value.replace(/\s+/g, ""));
                    const value = e.target.value.replace(/\s+/g, "");
                    if (value) {
                      setPersonalEmailOk(checkEmailFormat(value));
                    }
                  }}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="overrideCode" className="col-form-label dealer-label">
                  Override Code
                </Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
                <Input
                  className={`${"customFormControl"} ${
                    viewDetail
                      ? ""
                      : (overrideCode && overrideCode.length < 8) || overrideCodeExist
                        ? "borderRed"
                        : ""
                  }`}
                  id="overrideCode"
                  type="text"
                  name="overrideCode"
                  value={overrideCode}
                  maxLength={20}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    dispatch(setOverrideCodeExist(false));
                    dispatch(setOverrideCode(e.target.value.replace(/[^0-9a-zA-Z]*$/, "")));
                  }}
                  onBlur={(e) => {
                    isExistingOverrideCode(e.target.value);
                  }}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>

            <Form.Group
              className="mt-3  align-items-center row  m-l-0 m-r-0"
              hidden={!invoiceOverridePercentagePermission}
            >
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="invoiceOverridePercentage" className="col-form-label dealer-label">
                  Invoice Override Percentage
                </Form.Label>
              </Col>

              <div className="p-0 w-40px">
                <Input
                  className="customFormControl"
                  id="invoiceOverridePercentage"
                  type="text"
                  name="invoiceOverridePercentage"
                  value={invoiceOverridePercentage}
                  maxLength={2}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    setInvoiceOverridePercentage(e.target.value.replace(/([^0-9])/g, ""));
                  }}
                  disabled={viewDetail}
                />
              </div>
            </Form.Group>

            <Form.Group
              className="mt-3 form-group  align-items-center row  m-l-0 m-r-0"
              hidden={!reloadStateGroupPermission}
            >
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="reloadStateGroup" className="col-form-label dealer-label">
                  Reload State Group
                </Form.Label>
              </Col>

              <Col xs={5} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={reloadStateGroups}
                  searchString={reloadStateGroup}
                  loading={reloadStateLoading}
                  renderItemId={(stateGroup) => stateGroup.stateGroupPK}
                  renderItemField={(stateGroup) => stateGroup.description}
                  handleSearchString={(string) => setReloadStateGroup(string)}
                  fetchDataBySearchString={fetchReloadStateGroups}
                  onSelect={handleReloadStateGroupSelection}
                  selectedId={reloadStateGroupId}
                  clearInputCallback={() => {
                    setReloadStateGroupId(null);
                  }}
                  className={`${reloadStateGroupId === null && reloadStateGroup !== "" ? "borderRed" : ""}`}
                  disabled={viewDetail}
                  towardsTop
                />
                <LookupButton disabled={viewDetail} onClick={() => setShowReloadStateGroupLookUp(true)} />
              </Col>
            </Form.Group>

            <Form.Group
              className="mt-4 form-group  align-items-center row  m-l-0 m-r-0"
              hidden={!dispatchRestrictionsPermission}
            >
              <Col sm={3} md={3} xs={3} className="text-end p-0">
                <Form.Label className="col-form-label dealer-label ">Dispatch Restrictions</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <Form.Select
                  className="customFormControl invisible p-0"
                  name="groupDealer"
                  id="group"
                  disabled
                >
                  <option value={""}></option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group
              className="mt-3 form-group  align-items-center row  m-l-0 m-r-0"
              hidden={!dispatchRestrictionsPermission}
            >
              <Col sm={3} md={3} xs={3} className="text-end pe-5">
                <Form.Label className="col-form-label me-5">Time</Form.Label>
              </Col>

              <Col
                xs={8}
                md={8}
                sm={8}
                className="p-0 d-flex flex-wrap align-items-center justify-content-start"
              >
                <div className="col-2 ">Start Time</div>
                <div className="col-2 ms-1 me-4 text-center">
                  <Input
                    className=" customFormControl"
                    name="startTime"
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => {
                      setStartTime(e.target.value);
                    }}
                    onBlur={(e) => {
                      endTimeChange(e.target.value);
                    }}
                    disabled={viewDetail}
                  />
                </div>
                <div className="col-2 me-1">End Time </div>
                <div className="col-2">
                  <Input
                    className=" customFormControl"
                    name="endTime"
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => {
                      setEndTime(e.target.value);
                    }}
                    onBlur={(e) => {
                      startTimeChange(e.target.value);
                    }}
                    disabled={viewDetail}
                  />
                </div>
              </Col>
            </Form.Group>

            <Form.Group
              className="mt-3 form-group  align-items-center row  m-l-0 m-r-0"
              hidden={!dispatchRestrictionsPermission}
            >
              <Col sm={3} md={3} xs={3} className=" text-end pe-5">
                <Form.Label className="col-form-label me-5">Days</Form.Label>
              </Col>

              <Col xs={8} className="p-0 d-flex align-items-center flex-wrap  justify-content-start">
                <div className="align-items-center d-flex me-3">
                  <input
                    type="checkbox"
                    id="monday"
                    name="monday"
                    disabled={viewDetail}
                    value={monday}
                    onChange={(e) => {
                      setMonday(e.target.checked);
                    }}
                    checked={monday}
                    className={
                      !viewDetail &&
                      dispatchRestrictionsPermission &&
                      !monday &&
                      !tuesday &&
                      !wednesday &&
                      !thursday &&
                      !friday
                        ? "borderRed form-check-input mt-0"
                        : "form-check-input mt-0"
                    }
                  />
                  <label className="ms-1" htmlFor="monday">
                    Monday
                  </label>
                </div>

                <div className="align-items-center d-flex me-3">
                  <input
                    className={
                      !viewDetail &&
                      dispatchRestrictionsPermission &&
                      !monday &&
                      !tuesday &&
                      !wednesday &&
                      !thursday &&
                      !friday
                        ? "borderRed form-check-input mt-0"
                        : "form-check-input mt-0"
                    }
                    type="checkbox"
                    id="tuesday"
                    name="tuesday"
                    disabled={viewDetail}
                    value={tuesday}
                    onChange={(e) => {
                      setTuesday(e.target.checked);
                    }}
                    checked={tuesday}
                  />
                  <label className="ms-1" htmlFor="tuesday">
                    Tuesday
                  </label>
                </div>

                <div className="align-items-center d-flex me-3">
                  <input
                    type="checkbox"
                    id="wednesday"
                    name="wednesday"
                    disabled={viewDetail}
                    value={wednesday}
                    onChange={(e) => {
                      setWednesday(e.target.checked);
                    }}
                    checked={wednesday}
                    className={
                      !viewDetail &&
                      dispatchRestrictionsPermission &&
                      !monday &&
                      !tuesday &&
                      !wednesday &&
                      !thursday &&
                      !friday
                        ? "borderRed form-check-input mt-0"
                        : "form-check-input mt-0"
                    }
                  />
                  <label className="ms-1" htmlFor="wednesday">
                    Wednesday
                  </label>
                </div>

                <div className="align-items-center d-flex me-3">
                  <input
                    type="checkbox"
                    id="thursday"
                    name="thursday"
                    disabled={viewDetail}
                    value={thursday}
                    onChange={(e) => {
                      setThursday(e.target.checked);
                    }}
                    checked={thursday}
                    className={
                      !viewDetail &&
                      dispatchRestrictionsPermission &&
                      !monday &&
                      !tuesday &&
                      !wednesday &&
                      !thursday &&
                      !friday
                        ? "borderRed form-check-input mt-0"
                        : "form-check-input mt-0"
                    }
                  />
                  <label className="ms-1" htmlFor="thursday">
                    Thursday
                  </label>
                </div>

                <div className="align-items-center d-flex me-3">
                  <input
                    type="checkbox"
                    id="friday"
                    name="friday"
                    disabled={viewDetail}
                    value={friday}
                    onChange={(e) => {
                      setFriday(e.target.checked);
                    }}
                    checked={friday}
                    className={
                      !viewDetail &&
                      dispatchRestrictionsPermission &&
                      !monday &&
                      !tuesday &&
                      !wednesday &&
                      !thursday &&
                      !friday
                        ? "borderRed form-check-input mt-0"
                        : "form-check-input mt-0"
                    }
                  />
                  <label className="ms-1" htmlFor="friday">
                    Friday
                  </label>
                </div>
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <CustomerLookup
          show={showCustomerLookUp}
          onHide={() => setShowCustomerLookUp(false)}
          renderItemId={(customer) => customer.customerPK}
          handleLookupSelection={handleCustomerSelection}
          MaintenanceProgram
        />

        <CustomerPlantsLookup
          show={showPlantLookUp}
          onHide={() => setShowPlantLookUp(false)}
          renderItemId={(plant) => plant.customerPlantPK}
          handleLookupSelection={handlePlantSelection}
          MaintenanceProgram
        />

        <DealerLookup
          show={showDealerLookUp}
          onHide={() => setShowDealerLookUp(false)}
          renderItemId={(dealer) => dealer.dealerPK}
          handleLookupSelection={handleDealerSelection}
          MaintenanceProgram
        />

        <UserLookup
          show={showUserLookUp}
          onHide={() => setShowUserLookUp(false)}
          renderItemId={(user) => user.userPK}
          handleLookupSelection={handleSupervisorSelection}
          CustomUserPermission
          userType="Supervisor"
          currentUserId={id}
        />

        <StateGroupsLookup
          show={showReloadStateGroupLookUp}
          onHide={() => setShowReloadStateGroupLookUp(false)}
          renderItemId={(stateGroup) => stateGroup.StateGroupPK}
          handleLookupSelection={handleReloadStateGroupSelection}
          MaintenanceProgram
        />

        <DriverLookup
          show={driverLookUpShow}
          onHide={handleDriverLookupModalHide}
          renderItemId={(driver) => driver.driverPK}
          handleLookupSelection={handleDriverSelection}
          MaintenanceProgram
        />
      </div>
    </div>
  );
}

export default UserMaintenanceFormContent;
