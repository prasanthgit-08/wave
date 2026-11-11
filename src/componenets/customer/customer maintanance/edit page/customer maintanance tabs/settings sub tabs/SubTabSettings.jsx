import { t } from "i18next";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import CustomerService from "../../../../../../services/CustomerService";
import {
  setWebsiteLogin as setWebsiteLoginToRedux,
  setCustomerType as setCustomerTypeToRedux,
  setCustomerDealerSelection,
  setCustomerFormData,
  setDpuCustomer as setDpuCustomerToRedux,
  setIsSettingsTabValid,
  setDispatcheUser,
} from "../../../../../../redux/CustomerMaintenanceSlice";
import { Modal, Button } from "react-bootstrap";
import {
  setSettingsTabmiscellaneousCustomer,
  setSettingsAllDealersFOD,
} from "../../../../../../redux/CustomerMaintenanceSlice";

import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import Input from "../../../../../../components/common/input";
import LookupButton from "../../../../../common/LookupButton";
import DealerLookup from "../../../../../LookupScreens/Dealer/DealerLookup";
import UserLookup from "../../../../../LookupScreens/User/UserLookup";
import UnitTypeGroupsLookup from "../../../../../LookupScreens/UnitTypeGroups/UnitTypeGroupsLookup";
import RegionsLookup from "../../../../../LookupScreens/Regions/RegionsLookup";
import { lastpointer, removeLeadingWhitespace, getCurrentCompany } from "../../../../../../utils/utils";
import { useParams } from "react-router-dom";

function SubTabSettings() {
  const dispatch = useDispatch();
  const params = useParams();
  const customerPk = params.id;

  const [miscellaneousCustomer, setMiscellaneousCustomer] = useState(false);
  const [allowMiscellaneousDealers, setAllowMiscellaneousDealers] = useState("");
  const [allDealersFOD, setAllDealersFOD] = useState(false);
  const [usePlants, setUsePlants] = useState(false);
  const [longUnitRestriction, setLongUnitRestriction] = useState(false);
  const [longUnitUnitTypeGroup, setLongunitUnitTypeGroup] = useState([]);
  const [longUnitUnitTypeGroupFK, setLongUnitUnitTypeGroupFK] = useState("");
  const [longUnitUnitTypeGroupInput, setLongUnitUnitTypeGroupInput] = useState("");
  const [qualifyingUnitTypeGroup, setQualifyingUnitTypeGroup] = useState([]);
  const [qualifyingUnitTypeGroupFK, setQualifyingUnitTypeGroupFK] = useState("");
  const [qualifyingUnitTypeGroupInput, setQualifyingUnitTypeGroupInput] = useState("");
  const [longUnitRestrictionUnit, setLongUnitRestrictionUnit] = useState("");
  const [longUnitRateUnit, setLongUnitRateUnit] = useState("");
  const [longUnitRate, setLongUnitRate] = useState("");
  const [longUnitRateDescription, setLongUnitRateDescription] = useState("");

  const [dpuCustomer, setDpuCustomer] = useState(false);
  const [quickPayCustomer, setQuickPayCustomer] = useState("");
  const [freezePOE, setFreezePOE] = useState("");
  const [requireFactoryRelease, setRequireFactoryRelease] = useState(false);
  const [outBoundCustomer, setOutBoundCustomer] = useState(false);
  const [campfireCrew, setCampfireCrew] = useState(false);
  const [requireCustomerPlate, setRequireCustomerPlate] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [showLongUnitTypeGroupLookup, setshowLongUnitTypeGroupLookup] = useState(false);
  const [showQualifyingTypeGroupLookup, setShowQualifyingTypeGroupLookup] = useState(false);
  const [showRegionLookup, setShowRegionLookup] = useState(false);
  const [showAccountManagerLookup, setShowaAcountManagerLookup] = useState(false);
  const [forcedRestrictedDispatch, setForcedRestrictedDispatch] = useState(false);

  const [websiteLogin, setWebsiteLogin] = useState("");
  const [websitePassword, setWebsitePassword] = useState("");
  const [allCustomerType, setAllCustomerType] = useState([]);
  const [customerType, setCustomerType] = useState("");
  const [accountManagerNotes, setAccountManagerNotes] = useState("");
  const [customerDealerFK, setCustomerDealerFK] = useState(null);
  const [customerDealerInput, setCustomerDealerInput] = useState("");
  const [customerDealer, setCustomerDealer] = useState([]);
  const [allRegions, setAllRegions] = useState([]);
  const [regionInput, setRegionInput] = useState("");
  const [regionFK, setRegionFK] = useState(null);
  const [region, setRegion] = useState(null);
  const [accountManager, setAccountManager] = useState([]);
  const [accountManagerInput, setAccountManagerInput] = useState("");
  const [accountManagerFK, setAccountManagerFK] = useState(null);
  const [visibiltyRequiereFactory, setVisibiltyRequiereFactory] = useState(false);
  const [closeShow, setCloseShow] = useState(false);
  const [dpuORusePlantsModal, setDpuORusePlantsModal] = useState(false);
  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseDpuORUseplantsModal = () => setDpuORusePlantsModal(false);
  const [dispatchUsers, setDispatchUsers] = useState("");
  const [dispatchUsersList, setDispatchUsersList] = useState([]);

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);
  const customerDealerSelection = useSelector(
    (state) => state.customerMaintenanceReducer.customerDealerSelection
  );

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);
  let activeTab = useSelector((state) => state.customerMaintenanceReducer.activeTab);

  const [longUnitLoading, setLongUnitLoading] = useState(false);
  const [qualifyingUnitLoading, setQualifyingUnitLoading] = useState(false);
  const [regionLoading, setRegionLoading] = useState(false);
  const [customerDealerLoading, setCustomerDealerLoading] = useState(false);
  const [accountManagerLoading, setAccountManagerLoading] = useState(false);
  const [hasPlant, setHasPlant] = useState(false);

  const getCustomerPlantCheck = () => {
    if (customerPk) {
      CustomerService.checkCustomerPlantExist(customerPk)
        .then((response) => {
          const data = response?.data;
          setHasPlant(data);
        })
        .catch((error) => {});
    }
  };

  const getOrderEntryUsers = () => {
    CustomerService.getOrderEntryUsers()
      .then((response) => {
        const data = response?.data;
        setDispatchUsersList(data);
      })
      .catch((error) => {});
  };

  /************** Fetch Company Name of the logged in user, from the cached login data when available, else from the Property file API ***************/
  const getUserCompanyName = () => {
    const cachedCompany = getCurrentCompany();
    if (cachedCompany?.name != null) {
      setCompanyName(cachedCompany.name);
      return;
    }
    CustomerService.getUserCompanyName()
      .then((response) => {
        const data = response?.data;
        setCompanyName(data);
      })
      .catch((error) => {});
  };
  /************** Fetch visiblity condition for Requiere factory release, from the cached login data when available, else from the Company Name API ***************/
  const getVisibiltyRequiereFactory = () => {
    const cachedCompany = getCurrentCompany();
    if (cachedCompany?.requirePlantReleases != null) {
      setVisibiltyRequiereFactory(cachedCompany.requirePlantReleases);
      return;
    }
    CustomerService.getVisibiltyRequiereFactory()
      .then((response) => {
        const data = response?.data;
        setVisibiltyRequiereFactory(data);
      })
      .catch((error) => {});
  };

  /************** Unit Type Groups Autocomplete Fetch function ***************/
  const getAllUnitTypeGroupsByName = (string) => {
    setLongUnitLoading(true);
    CustomerService.getAllUnitTypeGroupsByName(string)
      .then((response) => {
        const data = response?.data;
        const unitTypeGroupList = (data?.content || []).map((unitType) => ({
          ...unitType,
          description: unitType.description?.trim(),
        }));
        setLongunitUnitTypeGroup(unitTypeGroupList);
      })
      .finally(() => {
        setLongUnitLoading(false);
      });
  };

  /************** Unit Type Groups Autocomplete Fetch function ***************/
  const getAllQualifyingUnitTypeGroupsByName = (string) => {
    setQualifyingUnitLoading(true);
    CustomerService.getAllUnitTypeGroupsByName(string)
      .then((response) => {
        const data = response?.data;
        const unitTypeGroupList = (data?.content || []).map((unitType) => ({
          ...unitType,
          description: unitType.description?.trim(),
        }));
        setQualifyingUnitTypeGroup(unitTypeGroupList);
      })
      .finally(() => {
        setQualifyingUnitLoading(false);
      });
  };

  /************** Unit Type Groups Autocomplete Handle function On select ***************/
  const handleUnitTypeGroupsSelection = (unitTypeGroups) => {
    setLongUnitUnitTypeGroupFK(unitTypeGroups.unitTypeGroupPK);
    setLongUnitUnitTypeGroupInput(unitTypeGroups.description?.trim());
  };

  /************** Unit Type Groups Lookup Show ***************/
  const handleUnitTypeGroupsLookupModalshow = () => {
    setshowLongUnitTypeGroupLookup(true);
  };

  /************** Unit Type Groups Lookup Handle function ***************/
  const handleUnitTypeGroupsLookupSelection = (unitTypeGroups) => {
    setLongUnitUnitTypeGroupFK(unitTypeGroups.unitTypeGroupPK);
    setLongUnitUnitTypeGroupInput(unitTypeGroups.description?.trim());
    setshowLongUnitTypeGroupLookup(false);
  };

  /************** Qualifying Unit Type Groups Lookup Handle function ***************/
  const handleQualifyingUnitTypeGroupsLookupSelection = (unitTypeGroups) => {
    setQualifyingUnitTypeGroupFK(unitTypeGroups.unitTypeGroupPK);
    setQualifyingUnitTypeGroupInput(unitTypeGroups.description?.trim());
    setShowQualifyingTypeGroupLookup(false);
  };

  /************** Unit Type Groups Lookup Hide ***************/
  const hideUnitTypeGroupsModal = () => {
    setshowLongUnitTypeGroupLookup(false);
    setShowQualifyingTypeGroupLookup(false);
  };

  /************** Customer Dealer Autocomplete Fetch function ***************/
  const fetchDealerByName = (string) => {
    setCustomerDealerLoading(true);
    CustomerService.fetchDealerByName(string)
      .then((response) => {
        const data = response?.data;
        const dealerList = (data?.content || []).map((dealer) => ({ ...dealer, name: dealer.name?.trim() }));
        setCustomerDealer(dealerList);
      })
      .finally(() => {
        setCustomerDealerLoading(false);
      });
  };

  /************** Customer Dealer Autocomplete Default setting in Edit Mode ***************/
  const fetchInputValueforCustomerDealer = (customerDealerFK, dealerName) => {
    if (customerDealerFK && dealerName) {
      setCustomerDealerInput(dealerName.trim());
    } else if (customerDealerFK) {
      CustomerService.getCustomerDealerById(customerDealerFK)
        .then((response) => {
          const data = response?.data;
          setCustomerDealerInput(data?.name?.trim());
          setCustomerDealerFK(data?.dealerPK);
        })
        .catch((err) => {});
    } else {
      setCustomerDealerInput("");
    }
  };

  /************** Customer Dealer Autocomplete Handle function On select ***************/
  const handleCustomerDealerSelection = (customerDealer) => {
    setCustomerDealerFK(customerDealer.dealerPK);
    setCustomerDealerInput(customerDealer.name?.trim());
  };

  /************** Customer Dealer Lookup Show ***************/
  const handleCustomerDealerLookupModalshow = () => {
    dispatch(setCustomerDealerSelection(true));
  };

  /************** Customer Dealer Lookup Handle function ***************/
  const handleCustomerDealerLookupSelection = (customerDealer) => {
    setCustomerDealerFK(customerDealer.dealerPK);
    setCustomerDealerInput(customerDealer.name?.trim());
    dispatch(setCustomerDealerSelection(false));
  };

  /************** Customer Dealer Lookup Hide ***************/
  const hideCustomerDealerModal = () => {
    dispatch(setCustomerDealerSelection(false));
  };

  /************** Regions Autocomplete Fetch function ***************/
  const getAllRegionsByName = (string) => {
    setRegionLoading(true);
    CustomerService.getAllRegionsByName(string)
      .then((response) => {
        const data = response?.data;
        const regionList = (data?.content || []).map((region) => ({
          ...region,
          description: region.description?.trim(),
        }));
        setAllRegions(regionList);
      })
      .finally(() => {
        setRegionLoading(false);
      });
  };
  /************** Regions Autocomplete Default setting in Edit Mode ***************/
  const fetchInputValueforRegions = (regionCode, regionName, regionPK) => {
    if (regionCode && regionName && regionPK != null) {
      setRegionInput(regionName.trim());
      setRegionFK(regionPK);
    } else if (regionCode) {
      CustomerService.getRegionsByCode(regionCode)
        .then((response) => {
          const data = response?.data;
          if (data !== null && data !== "" && data !== undefined) {
            setRegionInput(data?.description?.trim());
            setRegionFK(data?.regionPK);
          }
        })
        .catch((err) => {});
    } else {
      setRegionInput("");
    }
  };

  /************** Regions Autocomplete Handle function On select ***************/
  const handleRegionsSelection = (regions) => {
    setRegionFK(regions.regionPK);
    setRegion(regions.regionCode);
    setRegionInput(regions.description?.trim());
  };

  /************** Regions Lookup Show ***************/
  const handleRegionsLookupModalshow = () => {
    setShowRegionLookup(true);
  };

  /************** Regions Lookup Handle function ***************/
  const handleRegionsLookupSelection = (regions) => {
    setRegionFK(regions.regionPK);
    setRegion(regions.regionCode);
    setRegionInput(regions.description?.trim());
    setShowRegionLookup(false);
  };

  /************** Regions Lookup Hide ***************/
  const hideRegionsModal = () => {
    setShowRegionLookup(false);
  };

  const getCustomerType = () => {
    CustomerService.getCustomerType()
      .then((response) => {
        const data = response?.data;
        setAllCustomerType(data);
      })
      .catch((error) => {});
  };

  /************** Account Manager Autocomplete Fetch function ***************/
  const getAccountManagerByName = (string) => {
    setAccountManagerLoading(true);
    CustomerService.getUsersByName(string, 100)
      .then((response) => {
        const data = response?.data;
        const userList = (data?.content || []).map((user) => ({ ...user, name: user.name?.trim() }));
        setAccountManager(userList);
      })
      .finally(() => {
        setAccountManagerLoading(false);
      });
  };

  /************** Account Manager Autocomplete Default setting in Edit Mode ***************/
  const fetchInputValueforAccountManager = (userFK, userName) => {
    if (userFK && userName) {
      setAccountManagerInput(userName.trim());
    } else if (userFK) {
      CustomerService.getUserById(userFK)
        .then((response) => {
          const data = response?.data;
          setAccountManagerInput(data?.name?.trim());
        })
        .catch((err) => {});
    } else {
      setAccountManagerInput("");
    }
  };

  /************** Account Manager Autocomplete Handle function On select ***************/
  const handleAccountManagerSelection = (user) => {
    setAccountManagerFK(user.userPK);
    setAccountManagerInput(user.name?.trim());
  };

  /************** Account Manager Lookup Show ***************/
  const handleAccountManagerLookupModalshow = () => {
    setShowaAcountManagerLookup(true);
  };

  /************** Account Manager Lookup Handle function ***************/
  const handleAccountManagerLookupSelection = (user) => {
    setAccountManagerFK(user.userPK);
    setAccountManagerInput(user.name?.trim());
    setShowaAcountManagerLookup(false);
  };

  /************** Account Manager Lookup Hide ***************/
  const hideAccountManagerModal = () => {
    setShowaAcountManagerLookup(false);
  };

  const settingsTabFormData = () => {
    dispatch(
      setCustomerFormData({
        miscellaneousCustomer: miscellaneousCustomer,
        allowMiscellaneousDealers: allowMiscellaneousDealers,
        allDealersFOD: allDealersFOD,
        usePlants: usePlants,
        longUnitRestriction: longUnitRestriction,
        longUnitUnitTypeGroupFK: longUnitUnitTypeGroupFK,
        qualifyingUnitTypeGroupFK: qualifyingUnitTypeGroupFK,
        longUnitRestrictionUnits: longUnitRestrictionUnit,
        longUnitRateUnits: longUnitRateUnit,
        longUnitRate: longUnitRate,
        longUnitRateDescription: longUnitRateDescription,
        dpuCustomer: dpuCustomer,
        quickPayCustomer: quickPayCustomer,
        freezePOE: freezePOE,
        requireFactoryRelease: requireFactoryRelease,
        outBound: outBoundCustomer,
        campfireCrew: campfireCrew,
        requireCustomerPlate: requireCustomerPlate,
        dealerFK: customerDealerFK,
        region: region,
        login: websiteLogin,
        password: websitePassword,
        accountManagerUserFK: accountManagerFK,
        customerType: customerType,
        accountManagerNotes: accountManagerNotes,
        dispatchUsers: dispatchUsers,
        forceRestrictedDispatch: forcedRestrictedDispatch,
      })
    );
  };

  useEffect(() => {}, [editCustomerData]);

  useEffect(() => {
    if (customerType !== "D") {
      setCustomerDealerFK(null);
      setCustomerDealerInput("");
    }
  }, [customerType]);

  useEffect(() => {
    dispatch(setSettingsTabmiscellaneousCustomer(miscellaneousCustomer));
    dispatch(setSettingsAllDealersFOD(allDealersFOD));
  }, [miscellaneousCustomer, usePlants, allDealersFOD]);

  useEffect(() => {
    getCustomerType();
    getUserCompanyName();
    getVisibiltyRequiereFactory();
    getOrderEntryUsers();
  }, []);

  // The fetched customer already says whether it has plants; call the plant check only when it doesn't.
  useEffect(() => {
    if (!customerPk) return;
    if (editCustomerData && String(editCustomerData.customerPK) === String(customerPk)) {
      if (editCustomerData.hasCustomerPlants != null) setHasPlant(!!editCustomerData.hasCustomerPlants);
      else getCustomerPlantCheck();
    }
  }, [editCustomerData, customerPk]);

  useEffect(() => {
    if (websiteLogin === "" || websiteLogin === null) {
      setWebsitePassword("");
    }
  }, [websiteLogin]);

  useEffect(() => {
    if (editCustomerData === null) {
      setMiscellaneousCustomer(false);
      setAllowMiscellaneousDealers("");
      setAllDealersFOD(false);
      setUsePlants(false);
      setLongUnitRestriction(false);
      setLongUnitUnitTypeGroupFK("");
      setQualifyingUnitTypeGroupFK(null);
      setLongUnitUnitTypeGroupInput("");
      setLongUnitRestrictionUnit("");
      setLongUnitRateUnit("");
      setLongUnitRate("");
      setLongUnitRateDescription("");
      setDpuCustomer(false);
      setQuickPayCustomer("");
      setFreezePOE("");
      setRequireFactoryRelease(false);
      setOutBoundCustomer(false);
      setCampfireCrew(false);
      setRequireCustomerPlate(false);
      setCustomerDealerFK(null);
      setCustomerDealerInput("");
      setDispatchUsers("");
      setRegion(null);
      setRegionInput("");
      setWebsiteLogin("");
      setWebsitePassword("");
      setCustomerType("");
      setAccountManagerFK(null);
      setAccountManagerInput("");
      setAccountManagerNotes("");
      setForcedRestrictedDispatch(false);
      dispatch(setCustomerTypeToRedux(""));
    }

    if (editCustomerData !== null) {
      setMiscellaneousCustomer(
        editCustomerData.miscellaneousCustomer != null ? editCustomerData.miscellaneousCustomer : ""
      );
      setAllowMiscellaneousDealers(
        editCustomerData.allowMiscellaneousDealers != null ? editCustomerData.allowMiscellaneousDealers : ""
      );
      setDispatchUsers(editCustomerData.dispatchUsers != null ? editCustomerData.dispatchUsers : "");
      setAllDealersFOD(editCustomerData.allDealersFOD != null ? editCustomerData.allDealersFOD : "");
      setUsePlants(editCustomerData.usePlants != null ? editCustomerData.usePlants : "");
      setLongUnitRestriction(
        editCustomerData.longUnitRestriction != null ? editCustomerData.longUnitRestriction : ""
      );
      setLongUnitUnitTypeGroupFK(
        editCustomerData.longUnitUnitTypeGroupFK != null ? editCustomerData.longUnitUnitTypeGroupFK : ""
      );
      setQualifyingUnitTypeGroupFK(
        editCustomerData.qualifyingUnitTypeGroupFK != null ? editCustomerData.qualifyingUnitTypeGroupFK : ""
      );
      setLongUnitUnitTypeGroupInput(editCustomerData.longUnitUnitTypeGroupName?.trim() || "");
      setQualifyingUnitTypeGroupInput(editCustomerData.qualifyingUnitTypeGroupName?.trim() || "");
      setLongUnitRestrictionUnit(
        editCustomerData.longUnitRestrictionUnits != null && editCustomerData.longUnitRestrictionUnits > 0
          ? editCustomerData.longUnitRestrictionUnits
          : ""
      );
      setLongUnitRateUnit(
        editCustomerData.longUnitRateUnits != null && editCustomerData.longUnitRateUnits > 0
          ? editCustomerData.longUnitRateUnits
          : ""
      );
      setLongUnitRate(
        editCustomerData.longUnitRate != null && editCustomerData.longUnitRate > 0
          ? editCustomerData.longUnitRate
          : ""
      );
      setLongUnitRateDescription(
        editCustomerData.longUnitRateDescription != null ? editCustomerData.longUnitRateDescription : ""
      );

      setDpuCustomer(editCustomerData.dpuCustomer != null ? editCustomerData.dpuCustomer : "");
      setQuickPayCustomer(editCustomerData.quickPayCustomer != null ? editCustomerData.quickPayCustomer : "");
      setFreezePOE(editCustomerData.freezePOE != null ? editCustomerData.freezePOE : "");
      setRequireFactoryRelease(
        editCustomerData.requireFactoryRelease != null ? editCustomerData.requireFactoryRelease : ""
      );
      setOutBoundCustomer(editCustomerData.outBound != null ? editCustomerData.outBound : "");
      setCampfireCrew(editCustomerData.campfireCrew != null ? editCustomerData.campfireCrew : "");
      setRequireCustomerPlate(
        editCustomerData.requireCustomerPlate != null ? editCustomerData.requireCustomerPlate : ""
      );

      setCustomerDealerFK(editCustomerData.dealerFK != null ? editCustomerData.dealerFK : "");
      fetchInputValueforCustomerDealer(editCustomerData.dealerFK, editCustomerData.dealerName);
      setRegion(
        editCustomerData.region != null && editCustomerData.region != "" ? editCustomerData.region : ""
      );
      fetchInputValueforRegions(
        editCustomerData.region?.trim(),
        editCustomerData.regionName,
        editCustomerData.regionPK
      );
      setWebsiteLogin(editCustomerData.login != null ? editCustomerData.login : "");
      setWebsitePassword(editCustomerData.password != null ? editCustomerData.password : "");
      setCustomerType(
        editCustomerData.customerType != null && editCustomerData.customerType != " "
          ? editCustomerData.customerType
          : ""
      );
      dispatch(
        setCustomerTypeToRedux(
          editCustomerData.customerType != null && editCustomerData.customerType != " "
            ? editCustomerData.customerType
            : ""
        )
      );
      setAccountManagerFK(
        editCustomerData.accountManagerUserFK != null ? editCustomerData.accountManagerUserFK : ""
      );
      fetchInputValueforAccountManager(
        editCustomerData.accountManagerUserFK,
        editCustomerData.accountManagerName
      );
      setAccountManagerNotes(
        editCustomerData.accountManagerNotes != null ? editCustomerData.accountManagerNotes : ""
      );
      setForcedRestrictedDispatch(
        editCustomerData.forceRestrictedDispatch != null ? editCustomerData.forceRestrictedDispatch : false
      );
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    dispatch(setDispatcheUser(dispatchUsers));
  }, [dispatchUsers]);

  useEffect(() => {
    settingsTabFormData();
  }, [
    miscellaneousCustomer,
    allowMiscellaneousDealers,
    allDealersFOD,
    usePlants,
    dispatchUsers,
    longUnitRestriction,
    longUnitUnitTypeGroupFK,
    qualifyingUnitTypeGroupFK,
    longUnitRestrictionUnit,
    longUnitRateUnit,
    longUnitRate,
    longUnitRateDescription,
    dpuCustomer,
    quickPayCustomer,
    freezePOE,
    requireFactoryRelease,
    outBoundCustomer,
    campfireCrew,
    requireCustomerPlate,
    customerDealerFK,
    region,
    websiteLogin,
    websitePassword,
    accountManagerFK,
    customerType,
    accountManagerNotes,
    forcedRestrictedDispatch,
  ]);

  useEffect(() => {
    if (miscellaneousCustomer === false && quickPayCustomer === true) {
      setQuickPayCustomer(false);
    }
    if (miscellaneousCustomer) {
      setAllDealersFOD(true);
      setDpuCustomer(false);
      setUsePlants(false);
    } else {
      setAllDealersFOD(false);
    }
  }, [miscellaneousCustomer]);

  useEffect(() => {
    if (dpuCustomer === false && requireFactoryRelease === true) {
      setRequireFactoryRelease(false);
    }
  }, [dpuCustomer]);

  useEffect(() => {
    if (dpuCustomer || usePlants) {
      setAllDealersFOD(false);
    }
  }, [usePlants, dpuCustomer]);

  useEffect(() => {
    if (accountManagerInput && !accountManagerFK) {
      dispatch(setIsSettingsTabValid(false));
    } else if (regionInput && !region) {
      dispatch(setIsSettingsTabValid(false));
    } else if (customerDealerInput && !customerDealerFK) {
      dispatch(setIsSettingsTabValid(false));
    } else if (longUnitUnitTypeGroupInput && !longUnitUnitTypeGroupFK) {
      dispatch(setIsSettingsTabValid(false));
    } else if (websiteLogin && !websitePassword) {
      dispatch(setIsSettingsTabValid(false));
    } else if (customerType === "D" && !customerDealerFK) {
      dispatch(setIsSettingsTabValid(false));
    } else if (
      longUnitRestriction &&
      !(
        longUnitRateDescription &&
        longUnitRate &&
        !lastpointer(longUnitRate) &&
        longUnitRateUnit &&
        !lastpointer(longUnitRateUnit) &&
        longUnitRestrictionUnit &&
        longUnitUnitTypeGroupFK &&
        qualifyingUnitTypeGroupFK
      )
    ) {
      dispatch(setIsSettingsTabValid(false));
    } else if (!customerType) {
      dispatch(setIsSettingsTabValid(false));
    } else if (
      customerType === "D" &&
      longUnitRestriction &&
      !(
        customerDealerFK &&
        longUnitRateDescription &&
        longUnitRate &&
        longUnitRateUnit &&
        longUnitRestrictionUnit &&
        longUnitUnitTypeGroupFK &&
        qualifyingUnitTypeGroupFK
      )
    ) {
      dispatch(setIsSettingsTabValid(false));
    } else {
      dispatch(setIsSettingsTabValid(true));
    }
  }, [
    longUnitRestriction,
    longUnitUnitTypeGroupFK,
    qualifyingUnitTypeGroupFK,
    longUnitUnitTypeGroupInput,
    longUnitRestrictionUnit,
    longUnitRateUnit,
    longUnitRate,
    longUnitRateDescription,
    customerDealerFK,
    customerType,
    customerDealerInput,
    regionFK,
    regionInput,
    accountManagerFK,
    accountManagerInput,
    websiteLogin,
    websitePassword,
    viewDetail,
  ]);

  useEffect(() => {
    if (!longUnitRestriction) {
      setLongUnitRate("");
      setLongUnitRateDescription("");
      setLongUnitRateUnit("");
      setLongUnitUnitTypeGroupFK(null);
      setLongUnitUnitTypeGroupInput("");
      setLongUnitRestrictionUnit("");
      setQualifyingUnitTypeGroupFK(null);
      setQualifyingUnitTypeGroupInput("");
    }
  }, [longUnitRestriction]);
  useEffect(() => {
    dispatch(setDpuCustomerToRedux(dpuCustomer));
    dispatch(setWebsiteLoginToRedux(websiteLogin));
  }, [dpuCustomer, websiteLogin]);
  useEffect(() => {
    if (!accountManagerFK) {
      setAccountManagerNotes("");
    }
  }, [accountManagerFK]);

  useEffect(() => {
    if (!usePlants) {
      setRequireFactoryRelease(false);
    }
  }, [usePlants]);

  return (
    <div className="p-2 w-100">
      <Row className="m-0 p-0">
        {/* COL 1 */}
        <Col sm={6} md={6} lg={6} xl={6} xs={6}>
          {/* ROW 1 */}
          <Row>
            {/* COL 1 */}
            <Col xs={6} sm={6} md={6}>
              {/* Miscellaneous Customer */}
              <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.settings.tab.miscellaneous.customer.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="miscellaneousCustomer"
                    value={miscellaneousCustomer}
                    checked={miscellaneousCustomer}
                    disabled={viewDetail || hasPlant}
                    onChange={(e) => setMiscellaneousCustomer(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/* Allow Miscellaneous Dealers*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.settings.tab.allow.miscellaneous.dealers.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="allowMiscellaneousDealers"
                    value={allowMiscellaneousDealers}
                    checked={allowMiscellaneousDealers}
                    disabled={viewDetail}
                    onChange={(e) => setAllowMiscellaneousDealers(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/* All Dealer FOD*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.settings.tab.all.dealers.fod.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="allDealersFOD"
                    value={allDealersFOD}
                    checked={allDealersFOD}
                    disabled={viewDetail || miscellaneousCustomer || usePlants || dpuCustomer}
                    onChange={(e) => {
                      setAllDealersFOD(e.target.checked);
                    }}
                  />
                </Col>
              </Form.Group>

              {/*Use Plants*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.settings.tab.use.plants.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="usePlants"
                    value={usePlants}
                    checked={usePlants}
                    disabled={viewDetail || dpuCustomer || miscellaneousCustomer || hasPlant}
                    onChange={(e) => {
                      setUsePlants(e.target.checked);
                    }}
                  />
                </Col>
              </Form.Group>

              {/*Require Factory Release*/}
              <Form.Group
                className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0`}
                hidden={!visibiltyRequiereFactory}
              >
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.settings.tab.require.factory.release.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="requireFactoryRelease"
                    value={requireFactoryRelease}
                    checked={requireFactoryRelease}
                    disabled={viewDetail || (!dpuCustomer && !usePlants)}
                    onChange={(e) => setRequireFactoryRelease(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Force Restricted Dispatch*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Forced Restricted Dispatch</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="allDealersFOD"
                    value={forcedRestrictedDispatch}
                    checked={forcedRestrictedDispatch}
                    disabled={viewDetail}
                    onChange={(e) => {
                      setForcedRestrictedDispatch(e.target.checked);
                    }}
                  />
                </Col>
              </Form.Group>

              {/* Long Unit Restriction */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.settings.tab.long.unit.restriction")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    name="longUnitRestriction"
                    value={longUnitRestriction}
                    checked={longUnitRestriction}
                    disabled={viewDetail}
                    onChange={(e) => {
                      setLongUnitRestriction(e.target.checked);
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>

            {/* COL 2 */}
            <Col xs={6} sm={6} md={6}>
              {/*DPU Customer*/}
              <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.settings.tab.dpu.customer.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="dpuCustomer"
                    value={dpuCustomer}
                    checked={dpuCustomer}
                    disabled={viewDetail || usePlants || miscellaneousCustomer || hasPlant}
                    onChange={(e) => {
                      setDpuCustomer(e.target.checked);
                    }}
                  />
                </Col>
              </Form.Group>

              {/*Quick Pay Customer*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.settings.tab.quick.pay.customer.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="quickPayCustomer"
                    value={quickPayCustomer}
                    checked={quickPayCustomer}
                    disabled={viewDetail || miscellaneousCustomer === false ? true : false}
                    onChange={(e) => setQuickPayCustomer(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Freeze POE*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.settings.tab.freeze.poe.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="freezePOE"
                    value={freezePOE}
                    checked={freezePOE}
                    disabled={viewDetail}
                    onChange={(e) => setFreezePOE(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/* Outbound Customer */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Outbound Customer</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="outBoundCustomer"
                    value={outBoundCustomer}
                    checked={outBoundCustomer}
                    disabled={viewDetail}
                    onChange={(e) => setOutBoundCustomer(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/* Campfire Crew */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.settings.tab.campfire.crew.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="campfireCrew"
                    value={campfireCrew}
                    checked={campfireCrew}
                    disabled={viewDetail}
                    onChange={(e) => setCampfireCrew(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Requires Customer Plate*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={6} md={6} xs={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Requires Customer Plate</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="requireFactoryRelease"
                    value={requireCustomerPlate}
                    checked={requireCustomerPlate}
                    disabled={viewDetail}
                    onChange={(e) => setRequireCustomerPlate(e.target.checked)}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          {/* ROW 2 */}
          <Row>
            {/* Long Unit UnitType Group */}
            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Long Unit Unit Type Group</Form.Label>
              </Col>
              <Col xs={6} sm={6} md={6} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={longUnitUnitTypeGroup}
                  searchString={longUnitUnitTypeGroupInput}
                  customFormatSearchString={(searchString) => searchString}
                  renderItemId={(unitType) => unitType.unitTypeGroupPK}
                  renderItemField={(unitType) => unitType.description}
                  handleSearchString={(string) => setLongUnitUnitTypeGroupInput(string)}
                  fetchDataBySearchString={getAllUnitTypeGroupsByName}
                  onSelect={handleUnitTypeGroupsSelection}
                  clearInputCallback={() => {
                    setLongUnitUnitTypeGroupFK("");
                  }}
                  disabled={viewDetail || !longUnitRestriction}
                  className={`${
                    viewDetail
                      ? ""
                      : longUnitRestriction
                        ? longUnitUnitTypeGroupFK !== "" && longUnitUnitTypeGroupInput !== ""
                          ? "borderGreen"
                          : "borderRed"
                        : ""
                  }`}
                  selectedId={longUnitUnitTypeGroupFK}
                  loading={longUnitLoading}
                />
                <LookupButton
                  onClick={handleUnitTypeGroupsLookupModalshow}
                  disabled={viewDetail || !longUnitRestriction}
                />
              </Col>
            </Form.Group>
            {/* Qualifying UnitType Group */}
            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Qualifying Unit Type Group</Form.Label>
              </Col>
              <Col xs={6} sm={6} md={6} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={qualifyingUnitTypeGroup}
                  searchString={qualifyingUnitTypeGroupInput}
                  customFormatSearchString={(searchString) => searchString}
                  renderItemId={(unitType) => unitType.unitTypeGroupPK}
                  renderItemField={(unitType) => unitType.description}
                  handleSearchString={(string) => setQualifyingUnitTypeGroupInput(string)}
                  fetchDataBySearchString={getAllQualifyingUnitTypeGroupsByName}
                  onSelect={handleQualifyingUnitTypeGroupsLookupSelection}
                  clearInputCallback={() => {
                    setQualifyingUnitTypeGroupFK(null);
                  }}
                  disabled={viewDetail || !longUnitRestriction}
                  className={`${
                    viewDetail
                      ? ""
                      : longUnitRestriction
                        ? qualifyingUnitTypeGroupFK && qualifyingUnitTypeGroupInput !== ""
                          ? "borderGreen"
                          : "borderRed"
                        : ""
                  }`}
                  selectedId={qualifyingUnitTypeGroupFK}
                  loading={qualifyingUnitLoading}
                />
                <LookupButton
                  onClick={() => {
                    setShowQualifyingTypeGroupLookup(true);
                  }}
                  disabled={viewDetail || !longUnitRestriction}
                />
              </Col>
            </Form.Group>

            {/* Long Unit Restriction Units */}
            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Long Unit Restriction Units</Form.Label>
              </Col>
              <Col xs={1} sm={1} md={1} className="p-0 d-flex">
                <Input
                  type="text"
                  className={`customFormControl ${
                    !viewDetail
                      ? longUnitRestriction
                        ? longUnitRestrictionUnit !== "" &&
                          String(longUnitRestrictionUnit).match(/^\d{0,5}?$/)
                          ? "borderGreen"
                          : "borderRed"
                        : ""
                      : ""
                  }`}
                  name="longUnitRestrictionUnit"
                  value={longUnitRestrictionUnit || ""}
                  disabled={viewDetail || !longUnitRestriction}
                  maxLength={5}
                  onChange={(e) => {
                    e.target.value?.match(/^\d{0,5}?$/) &&
                      e.target.value <= 32767 &&
                      setLongUnitRestrictionUnit(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === ".") {
                      e.preventDefault();
                    }
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Long Unit Rate Units</Form.Label>
              </Col>

              <Col xs={1} sm={1} md={1} className="p-0">
                <Input
                  type="text"
                  className={`customFormControl ${
                    !viewDetail && longUnitRestriction
                      ? longUnitRateUnit === ""
                        ? "borderRed"
                        : "borderGreen"
                      : ""
                  }`}
                  name="longUnitRateUnit"
                  value={longUnitRateUnit}
                  disabled={viewDetail || !longUnitRestriction}
                  maxLength={5} // SMALLINT max is 32767
                  onChange={(e) => {
                    const value = e.target.value;

                    // allow empty
                    if (value === "") {
                      setLongUnitRateUnit("");
                      return;
                    }

                    const regex = /^\d+$/;

                    if (regex.test(value)) {
                      setLongUnitRateUnit(value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "." || e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
                      e.preventDefault();
                    }
                  }}
                />
              </Col>
            </Form.Group>

            {/* Long Unit Rate */}
            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Long Unit Rate</Form.Label>
              </Col>
              <Col xs={1} sm={1} md={1} className="p-0">
                <Input
                  className={`customFormControl ${
                    !viewDetail
                      ? longUnitRestriction
                        ? longUnitRate !== "" &&
                          String(longUnitRate).match(/^\d{0,2}(\.\d{0,2})?$/) &&
                          !lastpointer(longUnitRate)
                          ? "borderGreen"
                          : "borderRed"
                        : ""
                      : ""
                  }`}
                  name="longUnitRate"
                  value={longUnitRate}
                  disabled={viewDetail || !longUnitRestriction}
                  maxLength={5}
                  onKeyDown={(evt) => {
                    (evt.key === "e" || evt.key === "-" || evt.key === "+") && evt.preventDefault();
                  }}
                  onChange={(e) => {
                    let val = e.target.value;

                    if (/^\d{0,2}(\.\d{0,2})?$/.test(val)) {
                      setLongUnitRate(val);
                    }
                  }}
                />
              </Col>
            </Form.Group>
            {/* Long Unit Restriction Units */}
            <Form.Group className="mt-3 mb-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Long Unit Rate Description</Form.Label>
              </Col>
              <Col xs={6} sm={6} md={6} className="p-0">
                <Input
                  className={`customFormControl ${
                    !viewDetail
                      ? longUnitRestriction
                        ? longUnitRateDescription !== ""
                          ? "borderGreen"
                          : "borderRed"
                        : ""
                      : ""
                  }`}
                  name="longUnitRateDescription"
                  value={longUnitRateDescription}
                  disabled={viewDetail || !longUnitRestriction}
                  maxLength={50}
                  onChange={(e) => {
                    const cleanedValue = removeLeadingWhitespace(e.target.value);
                    setLongUnitRateDescription(cleanedValue);
                  }}
                />
              </Col>
            </Form.Group>
          </Row>
        </Col>

        {/* COL 2 */}
        <Col sm={6} md={6} xs={6}>
          {/*Customer Dealer*/}
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("customer.maintanance.settings.tab.customer.dealer.field")}
              </Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0 d-flex">
              {/* Customer Dealer Autocomplete */}
              <AutoCompleteDropdown
                arrayList={customerDealer}
                searchString={customerDealerInput}
                customFormatSearchString={(searchString) => searchString}
                renderItemId={(dealer) => dealer.dealerPK}
                renderItemField={(dealer) => dealer.name}
                handleSearchString={(string) => setCustomerDealerInput(string)}
                fetchDataBySearchString={fetchDealerByName}
                onSelect={handleCustomerDealerSelection}
                loading={customerDealerLoading}
                clearInputCallback={() => {
                  setCustomerDealerFK(null);
                }}
                disabled={viewDetail}
                className={`${
                  viewDetail === true
                    ? "black 1px solid"
                    : customerType === "D"
                      ? customerDealerFK === "" || customerDealerFK === null || customerDealerInput === ""
                        ? "borderRed"
                        : "borderGreen"
                      : customerDealerFK === null && customerDealerInput !== ""
                        ? "borderRed"
                        : ""
                }`}
                selectedId={customerDealerFK}
              />
              <LookupButton onClick={handleCustomerDealerLookupModalshow} disabled={viewDetail} />
            </Col>
          </Form.Group>

          {/*Region*/}
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("customer.maintanance.settings.tab.region.field")}
              </Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0 d-flex">
              {/* Region Autocomplete */}
              <AutoCompleteDropdown
                arrayList={allRegions}
                searchString={regionInput}
                customFormatSearchString={(searchString) => searchString}
                renderItemId={(region) => region.regionPK}
                renderItemField={(region) => region.description}
                handleSearchString={(string) => setRegionInput(string)}
                fetchDataBySearchString={getAllRegionsByName}
                onSelect={handleRegionsSelection}
                clearInputCallback={() => {
                  setRegion(null);
                }}
                disabled={viewDetail}
                className={`${region === null && regionInput !== "" ? "borderRed" : ""}`}
                selectedId={regionFK}
                loading={regionLoading}
              />
              <LookupButton onClick={handleRegionsLookupModalshow} disabled={viewDetail} />
            </Col>
          </Form.Group>

          {/* Website Login Field */}
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("customer.maintanance.settings.tab.website.login.field")}
              </Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <Input
                className="customFormControl"
                name="websiteLogin"
                maxLength={50}
                value={websiteLogin}
                disabled={viewDetail}
                onChange={(e) => {
                  const cleanedValue = removeLeadingWhitespace(e.target.value);
                  setWebsiteLogin(cleanedValue);
                }}
              />
            </Col>
          </Form.Group>

          {/* Website Password */}
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("customer.maintanance.settings.tab.website.password.field")}
              </Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <Input
                className={`customFormControl  ${websiteLogin === "" || websitePassword !== "" ? "black" : "borderRed"}`}
                name="webPswd"
                maxLength={20}
                type="password"
                spellCheck={false}
                value={websitePassword}
                disabled={viewDetail || websiteLogin === ""}
                onChange={(e) => setWebsitePassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          {/*Account Manager*/}
          <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("customer.maintanance.settings.tab.account.manager.field")}
              </Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0 d-flex">
              <AutoCompleteDropdown
                arrayList={accountManager}
                searchString={accountManagerInput}
                customFormatSearchString={(searchString) => searchString}
                renderItemId={(user) => user.userPK}
                renderItemField={(user) => user.name}
                handleSearchString={(string) => setAccountManagerInput(string)}
                fetchDataBySearchString={getAccountManagerByName}
                onSelect={handleAccountManagerSelection}
                clearInputCallback={() => {
                  setAccountManagerFK(null);
                }}
                disabled={viewDetail}
                className={`${accountManagerFK === null && accountManagerInput !== "" ? "borderRed" : ""}`}
                selectedId={accountManagerFK}
                loading={accountManagerLoading}
              />
              <LookupButton onClick={handleAccountManagerLookupModalshow} disabled={viewDetail} />
            </Col>
          </Form.Group>

          {/* Customer Type */}
          <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("customer.maintanance.settings.tab.customer.type.field")}
              </Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <Form.Select
                className={`customFormControl ${
                  viewDetail ? "" : !customerType || customerType === " " ? "borderRed" : "borderGreen"
                }`}
                name="customerType"
                id="customerType"
                value={customerType}
                disabled={viewDetail}
                onChange={(e) => {
                  setCustomerType(e.target.value);
                  dispatch(setCustomerTypeToRedux(e.target.value?.charAt(0)));
                }}
              >
                <option value="">--Select--</option>
                {allCustomerType?.map((item) => (
                  <option key={item.customerTypeId} value={item.customerTypeId}>
                    {item.customerTypeName}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

          {/*Dispatch Users*/}
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Dispatch Users</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <Form.Select
                className="customFormControl"
                name="dispatchUsers"
                id="dispatchUsers"
                value={dispatchUsers}
                disabled={viewDetail}
                onChange={(e) => {
                  setDispatchUsers(e.target.value);
                }}
              >
                <option value="">--Select--</option>
                {dispatchUsersList?.map((item) => (
                  <option key={item.orderEntryUserTypeId} value={item.orderEntryUserTypeId}>
                    {item.orderEntryUserTypeName}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

          {/* Account Manager Notes */}
          <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0">
            <Col sm={12} md={12} xs={12} className="p-0">
              <label className="col-form-label dealer-label p-0 m-b-20">
                {t("customer.maintanance.settings.tab.account.manager.notes.field")}
              </label>
            </Col>

            <Col sm={12} md={10} className="p-0">
              <textarea
                rows={9}
                cols={20}
                type="text"
                className="customFormControl h-100 "
                name="accountManagerNotes"
                value={accountManagerNotes}
                disabled={viewDetail || !accountManagerFK}
                autoComplete="off"
                onChange={(e) => {
                  const cleanedValue = removeLeadingWhitespace(e.target.value);
                  setAccountManagerNotes(cleanedValue);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      {/* Unit Type Groups Lookup Modal */}
      <UnitTypeGroupsLookup
        show={showLongUnitTypeGroupLookup}
        onHide={hideUnitTypeGroupsModal}
        renderItemId={(unitTypeGroups) => unitTypeGroups.unitTypeGroupPK}
        handleLookupSelection={handleUnitTypeGroupsLookupSelection}
        MaintenanceProgram
      />
      <UnitTypeGroupsLookup
        show={showQualifyingTypeGroupLookup}
        onHide={hideUnitTypeGroupsModal}
        renderItemId={(unitTypeGroups) => unitTypeGroups.unitTypeGroupPK}
        handleLookupSelection={handleQualifyingUnitTypeGroupsLookupSelection}
        MaintenanceProgram
      />
      {/* Customer Dealer Lookup Modal */}
      <DealerLookup
        show={customerDealerSelection}
        onHide={hideCustomerDealerModal}
        renderItemId={(customerDealer) => customerDealer.dealerPK}
        handleLookupSelection={handleCustomerDealerLookupSelection}
        MaintenanceProgram
      />
      {/* Regions Lookup Modal */}
      <RegionsLookup
        show={showRegionLookup}
        onHide={hideRegionsModal}
        renderItemId={(region) => region.regionCode}
        handleLookupSelection={handleRegionsLookupSelection}
        MaintenanceProgram
      />
      {/* Account Manager Lookup Modal */}
      <UserLookup
        show={showAccountManagerLookup}
        onHide={hideAccountManagerModal}
        renderItemId={(user) => user.userPK}
        handleLookupSelection={handleAccountManagerLookupSelection}
        CustomUserPermission
        userType="PU11002200"
      />
      {/* <div className="col-xs-6">
        <Modal show={closeShow} onHide={onHandleCloseNo} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100">Please Note</Modal.Title>
          </Modal.Header>
          <Modal.Body className="font-14 h-100">
            {miscellaneousCustomer === true
              ? "You need to uncheck miscellaneous Customer first!"
              : "You need to select miscellaneous Customer first!"}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={onHandleCloseNo}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div> */}
      <div className="col-xs-6">
        <Modal
          show={dpuORusePlantsModal}
          onHide={onHandleCloseDpuORUseplantsModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100">Please Note</Modal.Title>
          </Modal.Header>
          <Modal.Body className="font-14 h-100">
            {dpuCustomer === true
              ? "You can not check both Dpu Customer and Use Plants.Dpu Customer is checked already!"
              : "You can not check both Dpu Customer and Use Plants.Use Plants is checked already!"}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={onHandleCloseDpuORUseplantsModal}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
export default SubTabSettings;
