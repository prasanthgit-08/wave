import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LoadingIcon from "../../../common/LoadingIcon";
import LookupButton from "../../../common/LookupButton";
import CustomerUnitTypeGroupLookup from "../../../LookupScreens/CustomerUnitTypeGroup/CustomerUnitTypeGroupLookup";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdditional,
  setAdditionalDescription,
  setAdditionalFlatRate,
  setChangesCancelled,
  setCheckDpu,
  setCustomerGroupId,
  setCustomerGroupInput,
  setCustomerId,
  setCustomerInput,
  setCustomerPlantGroupId,
  setCustomerPlantGroupInput,
  setCustomerPlantId,
  setCustomerPlantInput,
  setCustomerUnitTypeGroupId,
  setCustomerUnitTypeGroupInput,
  setCustomerUnitTypeGroupSelection,
  setDealerGroupId,
  setDealerGroupInput,
  setDealerGroupSelection,
  setDealerId,
  setDealerInput,
  setDealerSelection,
  setDescription,
  setDriverAdditionalFlatRate,
  setDriverFuelSurchargeRate,
  setDriverFullRate,
  setDriverId,
  setDriverInput,
  setDriverRate,
  setDriverSelection,
  setEditFormData,
  setInVoiceRate,
  setInvoiceAdditionalFlatRate,
  setInvoiceFuelSurchargeRate,
  setInvoiceFullRate,
  setIsDescriptionUnique,
  setOutbound,
  setPickupCustomerId,
  setPickupCustomerInput,
  setPickupCustomerPlantId,
  setPickupCustomerPlantInput,
  setPickupCustomerPlantSelection,
  setPickupCustomerSelection,
  setReload,
  setRestrictedCustomer,
  setReturns,
  setSpecialCodeId,
  setSpecialCodeInput,
  setSpecialCodeSelection,
  setStateGroupsId,
  setStateGroupsInput,
  setStateGroupsSelection,
  setTransportCompanyId,
  setTransportCompanyInput,
  setTransportCompanySelection,
  setUnitTypeGroupId,
  setUnitTypeGroupInput,
  setUnitTypeGroupSelection,
  setUnitTypeId,
  setUnitTypeInput,
  setUnitTypeSelection,
  setViewDetail,
  setWhichOne,
} from "../../../../redux/SupplementalRatesSlice";
import CustomerUnitTypeGroupsService from "../../../../services/CustomerUnitTypeGroupsService";
import UnitTypeLookup from "../../../LookupScreens/UnitType/UnitTypeLookup";
import UnitTypeService from "../../../../services/UnitTypeService";
import TransportCompanysLookup from "../../../LookupScreens/TransportCompanys/TransportCompanysLookup";
import TransportCompanysService from "../../../../services/TransportCompanysService";
import DealerGroupsLookup from "../../../LookupScreens/DealerGroups/DealerGroupsLookup";
import DealerGroupService from "../../../../services/DealerGroupService";
import DealerLookup from "../../../LookupScreens/Dealer/DealerLookup";
import DealerService from "../../../../services/DealerService";
import DriverSelectionLookupTemplate from "../../../LookupScreens/Driver/DriverLookup";
import DriverService from "../../../../services/DriverService";
import StateGroupsLookup from "../../../LookupScreens/StateGroups/StateGroupsLookup";
import StateGroupsService from "../../../../services/StateGroupsService";
import SpecialCodeLookup from "../../../LookupScreens/SpecialCode/SpecialCodeLookup";
import SpecialCodesService from "../../../../services/SpecialCodesService";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import CustomerService from "../../../../services/CustomerService";
import SupplementalRatesService from "../../../../services/SupplementalRatesService";
import CustomerGroupService from "../../../../services/CustomerGroupService";
import { useNavigate, useParams } from "react-router-dom";
import CustomerPlantsLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import CustomerPlantMaintenanceService from "../../../../services/CustomerPlantMaintenanceService";
import UnitTypeGroupLookup from "../../../LookupScreens/UnitTypeGroup/UnitTypeGroupLookup";
import UnitTypeGroupsService from "../../../../services/UnitTypeGroupsService";
import CustomerPlantGroupService from "../../../../services/CustomerPlantGroupService";
import DriverLookup from "../../../LookupScreens/Driver/DriverLookup";

function FormContent({ styles }) {
  const { supplementalRatesPK, pageNumber } = useParams();
  const dispatch = useDispatch();
  const currentURL = window.location.pathname;

  const [customerUnitTypeGroupdata, setCustomerUnitTypeGroupdata] = useState([]);
  const [unitTypedata, setUnitTypedata] = useState([]);
  const [transportCompanyData, setTransportCompanyData] = useState([]);
  const [dealerGroupData, setDealerGroupData] = useState([]);
  const [dealerDropDownData, setDealerDropDownData] = useState([]);
  const [driverDropDownData, setDriverDropDownData] = useState([]);
  const [stateGroupDropdown, setStateGroupDropdown] = useState([]);
  const [specialCodeDropdown, setSpecialCodeDropdown] = useState([]);
  const [pickupCustomerDropdown, setPickupCustomerDropdown] = useState([]);
  const [pickupCustomerPlantDropdown, setPickupCustomerPlantDropdown] = useState([]);
  const [unitTypeGroupDropdown, setUnitTypeGroupDropDown] = useState([]);
  const [unitTypeGroupPKS, setUnitTypeGroupPKS] = useState([]);
  const [restrictedCustomerId, setRestrictedCustomerId] = useState([]);
  const [restrictedPlantLists, setRestrictedPlantLists] = useState([]);
  const [pickupLoader, setPickupLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [descriptionLoader, setDescriptionLoader] = useState(false);

  const [customerUnitTypeGroupLoader, setCustomerUnitTypeGroupLoader] = useState(false);
  const [unitTypeGroupLoader, setUnitTypeGroupLoader] = useState(false);
  const [unitTypeLoader, setUnitTypeLoader] = useState(false);
  const [dealerGroupLoader, setDealerGroupLoader] = useState(false);
  const [dealerLoader, setDealerLoader] = useState(false);
  const [stateGroupLoader, setStateGroupLoader] = useState(false);
  const [driverLoader, setDriverLoader] = useState(false);
  const [transportLoader, setTransportLoader] = useState(false);
  const [specialCodeLoader, setSpecialCodeLoader] = useState(false);
  const [pickupCustomerLoader, setPickupCustomerLoader] = useState(false);
  const [pickupPlantLoader, setPickupPlantLoader] = useState(false);

  const navigate = useNavigate();
  const customerUnitTypeGroupSelection = useSelector(
    (state) => state.supplementalRatesReducer.customerUnitTypeGroupSelection
  );

  const unitTypeGroupSelection = useSelector(
    (state) => state.supplementalRatesReducer.unitTypeGroupSelection
  );
  const editFormData = useSelector((state) => state.supplementalRatesReducer.editFormData);

  const customerUnitTypeGroupInput = useSelector(
    (state) => state.supplementalRatesReducer.customerUnitTypeGroupInput
  );
  const unitTypeGroupInput = useSelector((state) => state.supplementalRatesReducer.unitTypeGroupInput);
  const whichOne = useSelector((state) => state.supplementalRatesReducer.whichOne);

  const unitTypeGroupId = useSelector((state) => state.supplementalRatesReducer.unitTypeGroupId);
  const customerUnitTypeGroupId = useSelector(
    (state) => state.supplementalRatesReducer.customerUnitTypeGroupId
  );
  const unitTypeSelection = useSelector((state) => state.supplementalRatesReducer.unitTypeSelection);
  const unitTypeInput = useSelector((state) => state.supplementalRatesReducer.unitTypeInput);
  const unitTypeId = useSelector((state) => state.supplementalRatesReducer.unitTypeId);
  const transportCompanySelection = useSelector(
    (state) => state.supplementalRatesReducer.transportCompanySelection
  );
  const transportCompanyInput = useSelector((state) => state.supplementalRatesReducer.transportCompanyInput);
  const transportCompanyId = useSelector((state) => state.supplementalRatesReducer.transportCompanyId);
  const dealerGroupSelection = useSelector((state) => state.supplementalRatesReducer.dealerGroupSelection);
  const dealerGroupInput = useSelector((state) => state.supplementalRatesReducer.dealerGroupInput);
  const dealerGroupId = useSelector((state) => state.supplementalRatesReducer.dealerGroupId);
  const dealerSelection = useSelector((state) => state.supplementalRatesReducer.dealerSelection);
  const dealerInput = useSelector((state) => state.supplementalRatesReducer.dealerInput);
  const dealerId = useSelector((state) => state.supplementalRatesReducer.dealerId);
  const driverSelection = useSelector((state) => state.supplementalRatesReducer.driverSelection);
  const driverInput = useSelector((state) => state.supplementalRatesReducer.driverInput);
  const driverId = useSelector((state) => state.supplementalRatesReducer.driverId);
  const stateGroupsSelection = useSelector((state) => state.supplementalRatesReducer.stateGroupsSelection);
  const stateGroupsInput = useSelector((state) => state.supplementalRatesReducer.stateGroupsInput);
  const stateGroupsId = useSelector((state) => state.supplementalRatesReducer.stateGroupsId);
  const specialCodeSelection = useSelector((state) => state.supplementalRatesReducer.specialCodeSelection);
  const specialCodeInput = useSelector((state) => state.supplementalRatesReducer.specialCodeInput);
  const specialCodeId = useSelector((state) => state.supplementalRatesReducer.specialCodeId);
  const pickupCustomerSelection = useSelector(
    (state) => state.supplementalRatesReducer.pickupCustomerSelection
  );
  const pickupCustomerInput = useSelector((state) => state.supplementalRatesReducer.pickupCustomerInput);
  const pickupCustomerId = useSelector((state) => state.supplementalRatesReducer.pickupCustomerId);
  const pickupCustomerPlantSelection = useSelector(
    (state) => state.supplementalRatesReducer.pickupCustomerPlantSelection
  );
  const pickupCustomerPlantInput = useSelector(
    (state) => state.supplementalRatesReducer.pickupCustomerPlantInput
  );
  const pickupCustomerPlantId = useSelector((state) => state.supplementalRatesReducer.pickupCustomerPlantId);
  const description = useSelector((state) => state.supplementalRatesReducer.description);
  const outbound = useSelector((state) => state.supplementalRatesReducer.outbound);
  const reload = useSelector((state) => state.supplementalRatesReducer.reload);
  const returns = useSelector((state) => state.supplementalRatesReducer.returns);
  const inVoiceRate = useSelector((state) => state.supplementalRatesReducer.inVoiceRate);
  const invoiceFuelSurchargeRate = useSelector(
    (state) => state.supplementalRatesReducer.invoiceFuelSurchargeRate
  );
  const invoiceFullRate = useSelector((state) => state.supplementalRatesReducer.invoiceFullRate);
  const driverRate = useSelector((state) => state.supplementalRatesReducer.driverRate);
  const driverFuelSurchargeRate = useSelector(
    (state) => state.supplementalRatesReducer.driverFuelSurchargeRate
  );
  const driverFullRate = useSelector((state) => state.supplementalRatesReducer.driverFullRate);
  const additional = useSelector((state) => state.supplementalRatesReducer.additional);
  const additionalDescription = useSelector((state) => state.supplementalRatesReducer.additionalDescription);
  const viewDetail = useSelector((state) => state.supplementalRatesReducer.viewDetail);
  const customerId = useSelector((state) => state.supplementalRatesReducer.customerId);
  const customerPlantId = useSelector((state) => state.supplementalRatesReducer.customerPlantId);
  const customerPlantGroupId = useSelector((state) => state.supplementalRatesReducer.customerPlantGroupId);
  const customerGroupId = useSelector((state) => state.supplementalRatesReducer.customerGroupId);
  const customerInput = useSelector((state) => state.supplementalRatesReducer.customerInput);
  const customerPlantInput = useSelector((state) => state.supplementalRatesReducer.customerPlantInput);
  const customerGroupInput = useSelector((state) => state.supplementalRatesReducer.customerGroupInput);
  const customerPlantGroupInput = useSelector(
    (state) => state.supplementalRatesReducer.customerPlantGroupInput
  );
  const isDescriptionUnique = useSelector((state) => state.supplementalRatesReducer.isDescriptionUnique);
  const checkDpu = useSelector((state) => state.supplementalRatesReducer.checkDpu);
  const additionalFlatRate = useSelector((state) => state.supplementalRatesReducer.additionalFlatRate);
  const invoiceAdditionalFlatRate = useSelector(
    (state) => state.supplementalRatesReducer.invoiceAdditionalFlatRate
  );
  const driverAdditionalFlatRate = useSelector(
    (state) => state.supplementalRatesReducer.driverAdditionalFlatRate
  );
  const changesCancelled = useSelector((state) => state.supplementalRatesReducer.changesCancelled);

  const customerunitTypeGroupModalHide = () => {
    dispatch(setCustomerUnitTypeGroupSelection(false));
  };

  const unitTypeGroupModalHide = () => {
    dispatch(setUnitTypeGroupSelection(false));
  };
  const transportCompanyModalHide = () => {
    dispatch(setTransportCompanySelection(false));
  };
  const dealerModalHide = () => {
    dispatch(setDealerSelection(false));
  };
  const driverModalHide = () => {
    dispatch(setDriverSelection(false));
  };
  const stateGroupModalHide = () => {
    dispatch(setStateGroupsSelection(false));
  };
  const specialCodeModalHide = () => {
    dispatch(setSpecialCodeSelection(false));
  };
  const pickupCustomerModalHide = () => {
    dispatch(setPickupCustomerSelection(false));
  };

  const pickupCustomerPlantModalHide = () => {
    dispatch(setPickupCustomerPlantSelection(false));
  };
  const customerUnitTypeModalHide = () => {
    dispatch(setUnitTypeSelection(false));
  };

  const handleCustomerUnitTypeGroupLookupModalShow = () => {
    dispatch(setCustomerUnitTypeGroupSelection(true));
  };
  const handleUnitTypeGroupLookupModalShow = () => {
    dispatch(setUnitTypeGroupSelection(true));
  };
  const handleUnitTypeLookupModalShow = () => {
    dispatch(setUnitTypeSelection(true));
  };

  const handleTransportModalShow = () => {
    dispatch(setTransportCompanySelection(true));
  };
  const handleSpecialCodeModalShow = () => {
    dispatch(setSpecialCodeSelection(true));
  };
  const handlecustomerUnitTypeGroupLookupSelection = (unitType) => {
    dispatch(setCustomerUnitTypeGroupInput(unitType.description));
    dispatch(setCustomerUnitTypeGroupId(unitType.customerunittypegroupPK));
    dispatch(setCustomerUnitTypeGroupSelection(false));
  };

  const handleUnitTypeGroupLookupSelection = (unitType) => {
    dispatch(setUnitTypeGroupInput(unitType.description));
    dispatch(setUnitTypeGroupId(unitType.unitTypeGroupPK));
    dispatch(setUnitTypeGroupSelection(false));
  };

  const dealerLookupSelection = (data) => {
    dispatch(setDealerInput(data?.name));
    dispatch(setDealerId(data?.dealerPK));

    dispatch(setDealerSelection(false));
  };
  const driverLookupSelection = (data) => {
    dispatch(setDriverInput(data?.firstName?.trim() + (data?.lastName ? " " + data?.lastName?.trim() : "")));
    dispatch(setDriverId(data?.driverPK));

    dispatch(setDriverSelection(false));
  };

  const handleDriverLookupModalShow = () => {
    dispatch(setDriverSelection(true));
  };

  const stateGroupLookupSelection = (data) => {
    dispatch(setStateGroupsInput(data?.description));
    dispatch(setStateGroupsId(data?.stateGroupPK));

    dispatch(setStateGroupsSelection(false));
  };

  const specialCodeLookupSelection = (data) => {
    dispatch(setSpecialCodeInput(data?.description));
    dispatch(setSpecialCodeId(data?.specialCodePK));

    dispatch(setSpecialCodeSelection(false));
  };

  const customerLookupSelection = (data) => {
    dispatch(setPickupCustomerInput(data?.name));
    dispatch(setPickupCustomerId(data?.customerPK));

    dispatch(setPickupCustomerSelection(false));
  };

  const transportCompanyLookupSelection = (data) => {
    dispatch(setTransportCompanyInput(data?.name));
    dispatch(setTransportCompanyId(data?.transportCompanyPK));

    dispatch(setTransportCompanySelection(false));
  };

  const handlePickupcustomerPlantLookupSelection = (customer) => {
    dispatch(setPickupCustomerPlantInput(customer.name));
    dispatch(setPickupCustomerPlantId(customer.customerPlantPK));

    dispatch(setPickupCustomerPlantSelection(false));
  };

  const handleDealerGroupLookupSelection = (data) => {
    dispatch(setDealerGroupInput(data?.description));
    dispatch(setDealerGroupId(data?.dealerGroupPK));

    dispatch(setDealerGroupSelection(false));
  };

  const hideDealerGroupModel = () => {
    dispatch(setDealerGroupSelection(false));
  };
  const handleUnitTypeLookupSelection = (unitType) => {
    dispatch(setUnitTypeInput(unitType.descriptionLong));
    dispatch(setUnitTypeId(unitType.unitTypePK));

    dispatch(setUnitTypeSelection(false));
  };
  const handleDealerGroupLookupModalShow = () => {
    dispatch(setDealerGroupSelection(true));
  };
  const handleDealerLookupModalShow = () => {
    dispatch(setDealerSelection(true));
  };
  const handleStateGroupLookupModalShow = () => {
    dispatch(setStateGroupsSelection(true));
  };
  const handlePickupCustomerLookupModalShow = () => {
    dispatch(setPickupCustomerSelection(true));
  };
  const handleCustomerPlantLookupModalShow = () => {
    dispatch(setPickupCustomerPlantSelection(true));
  };

  window.addEventListener("popstate", () => {
    dispatch(setDescription(null));
    dispatch(setViewDetail(true));
    dispatch(setIsDescriptionUnique(true));
  });
  const fetchCustomerById = (customerId) => {
    if (customerId != null) {
      CustomerService.getCustomerById(customerId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCheckDpu(data?.dpuCustomer));
          dispatch(setCustomerInput(data?.name));
        })
        .catch((err) => {});
    } else {
      dispatch(setCustomerInput(""));
      dispatch(setCheckDpu(false));
    }
  };

  const fetchRecord = (supplementalRatesPK) => {
    setLoader(true);
    dispatch(setDescription(null));

    SupplementalRatesService.getRecordById(supplementalRatesPK)
      .then((res) => {
        dispatch(setEditFormData(res?.data));
        dispatch(setViewDetail(true));
      })
      .catch((err) => {
        navigate(`/supplemental-rates`);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const fetchRestrictedCustomer = (customerId) => {
    SupplementalRatesService.getRestrictedCustomerId(customerId)
      .then((res) => {
        dispatch(setRestrictedCustomer(res?.data?.customerFK));
        setRestrictedCustomerId(res?.data);
      })
      .catch((err) => {
        // navigate(`/supplemental-rates`);
      });
  };

  const listOfRestrictedCustomerPlants = (customerId) => {
    SupplementalRatesService.getListOfPlantsRestricted(customerId)
      .then((res) => {
        setRestrictedPlantLists(res?.data);
      })
      .catch((err) => {
        // navigate(`/supplemental-rates`);
      });
  };

  const fetchCustomerUnitTypeGroup = (string) => {
    setCustomerUnitTypeGroupLoader(true);
    CustomerUnitTypeGroupsService.getCustomerUnitTypeGroupForAuto(
      string,
      customerId,
      customerPlantId,
      customerPlantGroupId,
      customerGroupId
    )
      .then((response) => {
        const data = response?.data;
        const customerUnitTypeGroupList = (data?.content || []).map((data) => ({
          ...data,
          description: data?.description?.trim(),
        }));

        setCustomerUnitTypeGroupdata(customerUnitTypeGroupList);
        const customerunittypegroupPKs = (data?.content || []).map((item) => item.customerunittypegroupPK);
        setUnitTypeGroupPKS(customerunittypegroupPKs);
      })
      .catch((err) => {})
      .finally(() => {
        setCustomerUnitTypeGroupLoader(false);
      });
  };

  const fetchUnitTypeGroup = (string) => {
    if (unitTypeGroupPKS !== true && unitTypeGroupPKS !== null) {
      setUnitTypeGroupLoader(true);
      UnitTypeGroupsService.getUnitTypesGroupForAuto(unitTypeGroupPKS, string)
        .then((response) => {
          setTimeout(() => {
            const data = response?.data;
            const unitTypeGroupList = (data?.content || []).map((data) => ({
              ...data,
              description: data?.description?.trim(),
            }));
            setUnitTypeGroupDropDown(unitTypeGroupList);
          }, 1000);
        })
        .catch((err) => {})
        .finally(() => {
          setUnitTypeGroupLoader(false);
        });
    }
  };
  const fetchUnitTypeAuto = (string) => {
    setUnitTypeLoader(true);
    UnitTypeService.getUnitTypeServiceForAuto(string)
      .then((response) => {
        const data = response?.data?.content;
        setUnitTypedata(data);
      })
      .catch((err) => {})
      .finally(() => {
        setUnitTypeLoader(false);
      });
  };
  const fetchTransportCompanyAuto = (string) => {
    setTransportLoader(true);
    TransportCompanysService.getTransportCompanyForAuto(string)
      .then((response) => {
        const data = response?.data;
        const transportCompanyList = (data?.content || []).map((data) => ({
          ...data,
          name: data?.name?.trim(),
        }));

        setTransportCompanyData(transportCompanyList);
      })
      .catch((err) => {})
      .finally(() => {
        setTransportLoader(false);
      });
  };

  const fetchSpecialCode = (string) => {
    setSpecialCodeLoader(true);
    SpecialCodesService.getSpecialCodeForAuto(string)
      .then((response) => {
        const data = response?.data;
        const specialCodeList = (data?.content || []).map((data) => ({
          ...data,
          description: data?.description?.trim(),
        }));

        setSpecialCodeDropdown(specialCodeList);
      })
      .catch((err) => {})
      .finally(() => {
        setSpecialCodeLoader(false);
      });
  };
  const fetchStateGroupsData = (string) => {
    setStateGroupLoader(true);
    StateGroupsService.getStateGroupForAuto(string)
      .then((response) => {
        const data = response?.data;
        const stateGroupList = (data?.content || []).map((data) => ({
          ...data,
          description: data?.description?.trim(),
        }));

        setStateGroupDropdown(stateGroupList);
      })
      .catch((err) => {})
      .finally(() => {
        setStateGroupLoader(false);
      });
  };

  const fetchDealerGroups = (string) => {
    setDealerGroupLoader(true);
    DealerGroupService.getDealerGroupsForAuto(string)
      .then((response) => {
        const data = response?.data;
        const dealerGroupList = (data?.content || []).map((data) => ({
          ...data,
          description: data?.description?.trim(),
        }));

        setDealerGroupData(dealerGroupList);
      })
      .catch((err) => {})
      .finally(() => {
        setDealerGroupLoader(false);
      });
  };

  const fetchDealers = (string) => {
    setDealerLoader(true);
    DealerService.fetchDealerForAuto(string)
      .then((response) => {
        const data = response?.data;
        const dealerList = (data?.content || []).map((data) => ({ ...data, name: data?.name?.trim() }));

        setDealerDropDownData(dealerList);
      })
      .catch((err) => {})
      .finally(() => {
        setDealerLoader(false);
      });
  };

  const fetchDrivers = (string) => {
    setDriverLoader(true);
    DriverService.getDriverForAuto(string)
      .then((response) => {
        const data = response?.data?.content;
        const driverList = data?.map((item) => ({
          ...item,
          name: item.name?.trim(),
          firstName: item.firstName,
          lastName: item.lastName,
        }));

        setDriverDropDownData(driverList);
      })
      .catch((err) => {})
      .finally(() => {
        setDriverLoader(false);
      });
  };

  const fetchPickupCustomer = (string) => {
    setPickupCustomerLoader(true);
    SupplementalRatesService.fetchCustomerAutoComplete(string)
      .then((response) => {
        const data = response?.data;

        const pickupCustomerList = data?.content
          ?.filter((item) => {
            const isValidPlant = item.usePlants === true;
            const isNotRestricted =
              Array.isArray(restrictedCustomerId) && restrictedCustomerId?.length > 0
                ? !restrictedCustomerId?.includes(item.customerPK)
                : true;

            return isValidPlant && isNotRestricted;
          })
          .map((item) => ({ ...item, name: item.name?.trim() }));

        setPickupCustomerDropdown(pickupCustomerList);
      })
      .catch((err) => {})
      .finally(() => {
        setPickupCustomerLoader(false);
      });
  };
  const fetchPickupCustomerGroup = (string) => {
    setPickupPlantLoader(true);
    CustomerPlantMaintenanceService.getAllPlantsByCustomerAuto(string)
      .then((response) => {
        const data = response?.data;

        let CustomerPlantList = data?.content || [];

        if (restrictedPlantLists && restrictedPlantLists?.length > 0) {
          CustomerPlantList = CustomerPlantList?.filter(
            (item) =>
              !restrictedPlantLists?.some((restricted) =>
                typeof restricted === "number"
                  ? restricted === item.customerPlantPK
                  : restricted.customerPlantPK === item.customerPlantPK
              )
          );
        }

        const trimmedList = (CustomerPlantList || []).map((item) => ({
          ...item,
          name: item.name?.trim(),
        }));

        setPickupCustomerPlantDropdown(trimmedList);
      })
      .catch((err) => {})
      .finally(() => {
        setPickupPlantLoader(false);
      });
  };

  const checkDescriptionExist = (value) => {
    setDescriptionLoader(true);
    SupplementalRatesService.checkDescriptionExist(supplementalRatesPK, value)
      .then((res) => {
        dispatch(setIsDescriptionUnique(res?.data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setDescriptionLoader(false));
  };

  /* onBlur passes the event, so the current description is read from the state instead */
  const hanldeCheckDescription = () => checkDescriptionExist(description);

  //setting Lookup Values
  const setCustomerUnitTypeGroupValue = (customerUnitTypeGroupId) => {
    if (customerUnitTypeGroupId !== null) {
      CustomerUnitTypeGroupsService.getRecord(customerUnitTypeGroupId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerUnitTypeGroupInput(data?.description));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setCustomerUnitTypeGroupInput(""));
    }
  };

  const setUnitTypeValue = (unitTypeId) => {
    if (unitTypeId !== null) {
      UnitTypeService.getRecord(unitTypeId)
        .then((response) => {
          const data = response?.data;
          dispatch(setUnitTypeInput(data?.descriptionLong));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setUnitTypeInput(""));
    }
  };
  const setUnitTypeGroupValue = (unitTypeGroupId) => {
    if (unitTypeGroupId !== null) {
      UnitTypeGroupsService.getRecord(unitTypeGroupId)
        .then((response) => {
          const data = response?.data;
          dispatch(setUnitTypeGroupInput(data?.description));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setUnitTypeGroupInput(""));
    }
  };

  const setDealerGroupValue = (dealerGroupId) => {
    if (dealerGroupId !== null) {
      DealerGroupService.getDealerGroupById(dealerGroupId)
        .then((response) => {
          const data = response?.data;
          dispatch(setDealerGroupInput(data?.description));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setDealerGroupInput(""));
    }
  };

  const setDealerValue = (dealerId) => {
    if (dealerId !== null) {
      DealerService.getDealerById(dealerId)
        .then((response) => {
          const data = response?.data;
          dispatch(setDealerInput(data?.name));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setDealerInput(""));
    }
  };

  const setStateGroupValue = (stateGroupsId) => {
    if (stateGroupsId !== null) {
      StateGroupsService.getRecord(stateGroupsId)
        .then((response) => {
          const data = response?.data;
          dispatch(setStateGroupsInput(data?.description));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setStateGroupsInput(""));
    }
  };

  const setTransportCompanyValue = (transportCompanyId) => {
    if (transportCompanyId !== null) {
      TransportCompanysService.getRecord(transportCompanyId)
        .then((response) => {
          const data = response?.data;
          dispatch(setTransportCompanyInput(data?.name));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setTransportCompanyInput(""));
    }
  };

  const setSpecialCodeValue = (specialCodeId) => {
    if (specialCodeId !== null) {
      SpecialCodesService.getSpecialCodesById(specialCodeId)
        .then((response) => {
          const data = response?.data;
          dispatch(setSpecialCodeInput(data?.description));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setSpecialCodeInput(""));
    }
  };

  const setPickupCustomerValue = (pickupCustomerId) => {
    if (pickupCustomerId !== null) {
      CustomerService.getCustomerById(pickupCustomerId)
        .then((response) => {
          const data = response?.data;
          dispatch(setPickupCustomerInput(data?.name));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setPickupCustomerInput(""));
    }
  };
  const setPlantValue = (customerPlantId) => {
    if (customerPlantId !== null) {
      CustomerPlantMaintenanceService.getcompleteCustomerPlantsById(customerPlantId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerPlantInput(data?.name));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setCustomerPlantInput(""));
    }
  };
  const setPickupPlantValue = (pickupCustomerPlantId) => {
    if (pickupCustomerPlantId !== null) {
      CustomerPlantMaintenanceService.getcompleteCustomerPlantsById(pickupCustomerPlantId)
        .then((response) => {
          const data = response?.data;
          dispatch(setPickupCustomerPlantInput(data?.name));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setPickupCustomerPlantInput(""));
    }
  };

  const setPlantGroupValue = (customerPlantGroupId) => {
    if (customerPlantGroupId !== null) {
      CustomerPlantGroupService.getRecord(customerPlantGroupId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerPlantGroupInput(data?.description));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setCustomerPlantInput(""));
    }
  };

  const setCustomerGroupValue = (customerGroupId) => {
    if (customerGroupId !== null) {
      CustomerGroupService.getRecord(customerGroupId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerGroupInput(data?.description));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setCustomerPlantInput(""));
    }
  };

  useEffect(() => {
    if (editFormData === undefined) {
      dispatch(setDescription(""));
      dispatch(setCustomerUnitTypeGroupInput(""));
      dispatch(setUnitTypeGroupInput(""));
      dispatch(setTransportCompanyInput(""));
      dispatch(setSpecialCodeInput(""));
      dispatch(setDealerGroupInput(""));
      dispatch(setStateGroupsInput(""));
      dispatch(setDealerInput(""));
      dispatch(setPickupCustomerPlantInput(""));
      dispatch(setPickupCustomerInput(""));
      dispatch(setOutbound(false));
      dispatch(setReload(false));
      dispatch(setReturns(false));
      dispatch(setAdditional(false));
      dispatch(setAdditionalDescription(""));
      dispatch(setInvoiceFuelSurchargeRate(null));
      dispatch(setInvoiceFullRate(false));
      dispatch(setInVoiceRate(null));
      dispatch(setDriverFuelSurchargeRate(null));
      dispatch(setDriverFullRate(false));
      dispatch(setDriverRate(null));
      dispatch(setCheckDpu(false));
      dispatch(setInvoiceAdditionalFlatRate(null));
      dispatch(setDriverAdditionalFlatRate(null));
      dispatch(setAdditionalFlatRate(false));
    }
    if (editFormData != null) {
      dispatch(setCustomerId(editFormData?.customerId || null));
      const trimmedDescription = (editFormData.description ? editFormData.description : "")?.trim();
      dispatch(setDescription(trimmedDescription));
      checkDescriptionExist(trimmedDescription);
      dispatch(setCustomerPlantId(editFormData?.customerPlantId || null));
      setPlantValue(editFormData?.customerPlantId);
      dispatch(setCustomerPlantGroupId(editFormData?.customerPlantGroupId || null));
      setPlantGroupValue(editFormData?.customerPlantGroupId);
      dispatch(setCustomerGroupId(editFormData?.customerGroupId || null));
      setCustomerGroupValue(editFormData?.customerGroupId);
      dispatch(setCustomerPlantId(editFormData?.customerPlantId || null));
      dispatch(setCustomerPlantGroupId(editFormData?.customerPlantGroupId || null));
      dispatch(setCustomerGroupId(editFormData?.customerGroupId || null));
      dispatch(setCustomerUnitTypeGroupId(editFormData?.customerUnitTypeGroupFK || null));
      setCustomerUnitTypeGroupValue(editFormData?.customerUnitTypeGroupFK);
      dispatch(setUnitTypeId(editFormData?.unitTypeFK || null));
      dispatch(setUnitTypeGroupId(editFormData?.unitTypeGroupFK || null));
      setUnitTypeGroupValue(editFormData?.unitTypeGroupFK);
      setUnitTypeValue(editFormData?.unitTypeFK);
      dispatch(setDealerGroupId(editFormData?.dealerGroupFK || null));
      setDealerGroupValue(editFormData?.dealerGroupFK);
      dispatch(setDealerId(editFormData?.dealerFK || null));
      setDealerValue(editFormData?.dealerFK);
      dispatch(setStateGroupsId(editFormData?.stateGroupFK || null));
      setStateGroupValue(editFormData?.stateGroupFK);
      dispatch(setTransportCompanyId(editFormData?.transportCompanyFK || null));
      setTransportCompanyValue(editFormData?.transportCompanyFK);
      dispatch(setSpecialCodeId(editFormData?.specialCodeFK || null));
      setSpecialCodeValue(editFormData?.specialCodeFK);
      dispatch(setPickupCustomerId(editFormData?.pickupCustomerFK || null));
      setPickupCustomerValue(editFormData?.pickupCustomerFK);
      dispatch(setPickupCustomerPlantId(editFormData?.pickupCustomerPlantFK || null));
      setPickupPlantValue(editFormData?.pickupCustomerPlantFK || null);
      dispatch(
        setInVoiceRate(
          Number.isInteger(Number(editFormData?.invoiceRate ?? 0))
            ? Number(editFormData?.invoiceRate ?? 0)
            : Number(editFormData?.invoiceRate ?? 0)
        )
      );

      dispatch(
        setInvoiceFuelSurchargeRate(
          Number.isInteger(Number(editFormData?.invoiceFuelSurchargeRate ?? 0))
            ? Number(editFormData?.invoiceFuelSurchargeRate ?? 0)
            : Number(editFormData?.invoiceFuelSurchargeRate ?? 0)
        )
      );

      dispatch(
        setDriverRate(
          Number.isInteger(Number(editFormData?.driverRate ?? 0))
            ? Number(editFormData?.driverRate ?? 0)
            : Number(editFormData?.driverRate ?? 0)
        )
      );

      dispatch(
        setDriverFuelSurchargeRate(
          Number.isInteger(Number(editFormData?.driverFuelSurchargeRate ?? 0))
            ? Number(editFormData?.driverFuelSurchargeRate ?? 0)
            : Number(editFormData?.driverFuelSurchargeRate ?? 0)
        )
      );

      dispatch(
        setInvoiceAdditionalFlatRate(
          Number.isInteger(Number(editFormData?.invoiceAdditionalFlatRate ?? 0))
            ? Number(editFormData?.invoiceAdditionalFlatRate ?? 0).toFixed(2)
            : Number(editFormData?.invoiceAdditionalFlatRate ?? 0)
        )
      );

      dispatch(
        setDriverAdditionalFlatRate(
          Number.isInteger(Number(editFormData?.driverAdditionalFlatRate ?? 0))
            ? Number(editFormData?.driverAdditionalFlatRate ?? 0).toFixed(2)
            : Number(editFormData?.driverAdditionalFlatRate ?? 0)
        )
      );
      dispatch(setAdditionalFlatRate(editFormData?.additionalFlatRate));
      dispatch(setInvoiceFullRate(editFormData?.invoiceFullRate));
      dispatch(setDriverFullRate(editFormData?.driverFullRate));
      dispatch(setAdditional(editFormData?.additional));
      dispatch(setAdditionalDescription(editFormData?.additionalDescription || ""));
      dispatch(setOutbound(editFormData?.outbound || false));
      dispatch(setReload(editFormData?.reload || false));
      dispatch(setReturns(editFormData?.returns || false));
    }
  }, [editFormData, viewDetail]);

  useEffect(() => {
    fetchCustomerById(customerId);
  }, [customerId]);
  useEffect(() => {
    if (additional) {
      dispatch(setTransportCompanyId(null));
      dispatch(setTransportCompanyInput(""));
      dispatch(setSpecialCodeId(null));
      dispatch(setSpecialCodeInput(""));
      dispatch(setDriverId(null));
      dispatch(setDriverInput(""));
      dispatch(setPickupCustomerPlantId(null));
      dispatch(setPickupCustomerPlantInput(""));
      dispatch(setPickupCustomerId(null));
      dispatch(setPickupCustomerInput(""));
    }
  }, [additional]);

  useEffect(() => {
    const dealerSelected = dealerId || dealerGroupId || stateGroupsId;
    const transportSelected = transportCompanyId || specialCodeId || driverId;
    const pickupSelected = pickupCustomerId || pickupCustomerPlantId;

    if (dealerSelected || transportSelected || pickupSelected) {
      if (!dealerId) {
        dispatch(setDealerInput(""));
        dispatch(setDealerId(null));
      }
      if (!dealerGroupId) {
        dispatch(setDealerGroupInput(""));
        dispatch(setDealerGroupId(null));
      }
      if (!stateGroupsId) {
        dispatch(setStateGroupsInput(""));
        dispatch(setStateGroupsId(null));
      }

      // Clear Transport fields
      if (!transportCompanyId) {
        dispatch(setTransportCompanyInput(""));
        dispatch(setTransportCompanyId(null));
      }
      if (!specialCodeId) {
        dispatch(setSpecialCodeInput(""));
        dispatch(setSpecialCodeId(null));
      }
      if (!driverId) {
        dispatch(setDriverInput(""));
        dispatch(setDriverId(null));
      }

      // Clear Pickup fields
      if (!pickupCustomerId) {
        dispatch(setPickupCustomerInput(""));
        dispatch(setPickupCustomerId(null));
      }
      if (!pickupCustomerPlantId) {
        dispatch(setPickupCustomerPlantInput(""));
        dispatch(setPickupCustomerPlantId(null));
      }
    }

    // --- unitType-related logic remains unchanged ---
    if (customerUnitTypeGroupId) {
      dispatch(setUnitTypeGroupId(null));
      dispatch(setUnitTypeGroupInput(""));
      dispatch(setUnitTypeId(null));
      dispatch(setUnitTypeInput(""));
    }
    if (unitTypeId) {
      dispatch(setUnitTypeGroupId(null));
      dispatch(setUnitTypeGroupInput(""));
      dispatch(setCustomerUnitTypeGroupId(null));
      dispatch(setCustomerUnitTypeGroupInput(""));
    }
    if (unitTypeGroupId) {
      dispatch(setUnitTypeId(null));
      dispatch(setUnitTypeInput(""));
      dispatch(setCustomerUnitTypeGroupId(null));
      dispatch(setCustomerUnitTypeGroupInput(""));
    }
  }, [
    dealerId,
    dealerGroupId,
    stateGroupsId,
    transportCompanyId,
    specialCodeId,
    driverId,
    pickupCustomerId,
    pickupCustomerPlantId,
    customerUnitTypeGroupId,
    unitTypeId,
    unitTypeGroupId,
  ]);

  useEffect(() => {
    if (!additional) {
      dispatch(setAdditionalDescription(""));
      dispatch(setAdditionalFlatRate(false));
      dispatch(setInvoiceAdditionalFlatRate(""));

      dispatch(setDriverAdditionalFlatRate(""));
    }
    if (!additionalFlatRate) {
      dispatch(setInvoiceAdditionalFlatRate(""));

      dispatch(setDriverAdditionalFlatRate(""));
    }
  }, [additional, supplementalRatesPK, additionalFlatRate]);

  useEffect(() => {
    fetchCustomerUnitTypeGroup();
  }, []);
  useEffect(() => {
    fetchUnitTypeGroup();
  }, [unitTypeGroupPKS]);
  useEffect(() => {
    if (
      currentURL === `/supplemental-rates-new` &&
      customerInput === "" &&
      customerPlantInput === "" &&
      customerPlantGroupInput === "" &&
      customerGroupInput === ""
    ) {
      if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        navigate("/supplemental-rates-customer-new");
      }
    }
  }, [
    customerId,
    customerPlantId,
    customerGroupId,
    customerPlantGroupId,
    currentURL,
    whichOne,
    customerInput,
    customerPlantInput,
    customerPlantGroupInput,
    customerGroupInput,
    whichOne,
  ]);

  const isValidPositiveDecimal = (value) => {
    if (!value || value === "." || value === "0" || value === "0." || parseFloat(value) <= 0) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (supplementalRatesPK) fetchRecord(supplementalRatesPK);
  }, [supplementalRatesPK]);

  useEffect(() => {
    if (customerId) fetchRestrictedCustomer(customerId);
  }, [customerId]);

  useEffect(() => {
    if (customerId) listOfRestrictedCustomerPlants(customerId);
  }, [customerId]);

  useEffect(() => {
    if (additionalFlatRate) {
      dispatch(setInvoiceFuelSurchargeRate(0));
      dispatch(setInvoiceFullRate(false));
      dispatch(setInVoiceRate(0));
      dispatch(setDriverFuelSurchargeRate(0));
      dispatch(setDriverFullRate(false));
      dispatch(setDriverRate(0));
    }
  }, [additionalFlatRate]);

  const isDecimalInvalid = (value) => {
    const strVal = value?.toString() || "";

    return strVal === "." || strVal === "0." || strVal?.endsWith(".");
  };

  return (
    <Form>
      {descriptionLoader && <LoadingIcon />}
      <div className="p-2">
        <div className="shadow-sm rounded border halfScreenFormContentHeight">
          {loader ? (
            <div className="fade modal-backdrop show">
              <div className="pos-center">
                <div className="loader"></div>
              </div>
            </div>
          ) : (
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 ">Description</Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="d-flex">
                    {/* Yard Autocomplete */}
                    <input
                      className={`${styles.formControl} ${
                        viewDetail
                          ? ""
                          : description !== "" && isDescriptionUnique
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="description"
                      name="description"
                      type="search"
                      value={description}
                      onBeforeInput={(e) => {
                        if (e.data === " " && e.target.value?.trim()?.length === 0) {
                          e.preventDefault();
                        }
                      }}
                      onBlur={hanldeCheckDescription}
                      maxLength={50}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setDescription(e.target.value));
                        dispatch(setIsDescriptionUnique(true));
                      }}
                      disabled={viewDetail}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 ">
                      {customerId
                        ? "Customer"
                        : "" || customerPlantId
                          ? "Plant"
                          : "" || customerPlantGroupId
                            ? "Plant Group"
                            : "" || customerGroupId
                              ? "Customer Group"
                              : ""}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="d-flex">
                    <input
                      className={"customFormControl"}
                      id="whichOne"
                      name="whichOne"
                      type="text"
                      value={
                        customerId
                          ? customerInput?.toUpperCase()
                          : "" || customerPlantId
                            ? customerPlantInput?.toUpperCase()
                            : "" || customerPlantGroupId
                              ? customerPlantGroupInput?.toUpperCase()
                              : "" || customerGroupId
                                ? customerGroupInput?.toUpperCase()
                                : ""
                      }
                      disabled
                      maxLength={50}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setWhichOne(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Row className={` "hide-elements" : ""}`}>
                  <Col style={{ marginLeft: "" }}>
                    <p className="p-0 text-danger alert" style={{ height: "15px" }}></p>
                  </Col>
                </Row>
                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 ">
                      Customer Unit Type Group
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="d-flex">
                    {/* customer unit Type Group Autocomplete */}
                    <AutoCompleteDropdown
                      className={` ${styles.formControl} ${
                        !viewDetail && customerUnitTypeGroupId
                          ? "borderGreen"
                          : !viewDetail && !unitTypeGroupId && !unitTypeId
                            ? (!customerUnitTypeGroupId && customerUnitTypeGroupInput) ||
                              (additional && customerUnitTypeGroupId === null && unitTypeGroupId === null) ||
                              (!driverId && !transportCompanyId && !specialCodeId && !customerUnitTypeGroupId)
                              ? "borderRed"
                              : ""
                            : ""
                      }`}
                      arrayList={customerUnitTypeGroupdata}
                      searchString={customerUnitTypeGroupInput}
                      renderItemId={(unitType) => unitType.customerunittypegroupPK}
                      renderItemField={(unitType) => unitType.description}
                      handleSearchString={(string) => dispatch(setCustomerUnitTypeGroupInput(string))}
                      fetchDataBySearchString={fetchCustomerUnitTypeGroup}
                      onSelect={handlecustomerUnitTypeGroupLookupSelection}
                      selectedId={(unitType) => unitType.customerunittypegroupPK}
                      clearInputCallback={() => {
                        dispatch(setCustomerUnitTypeGroupId(null));
                      }}
                      loading={customerUnitTypeGroupLoader}
                      disabled={viewDetail || unitTypeGroupId || unitTypeId}
                    />
                    <LookupButton
                      onClick={handleCustomerUnitTypeGroupLookupModalShow}
                      disabled={viewDetail || unitTypeGroupId || unitTypeId}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 ">Unit Type Group</Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="d-flex">
                    {/* UnitType Group Autocomplete */}
                    <AutoCompleteDropdown
                      className={` ${styles.formControl} ${
                        !viewDetail && unitTypeGroupId
                          ? "borderGreen"
                          : !viewDetail && !customerUnitTypeGroupId && !unitTypeId
                            ? (!unitTypeGroupId && unitTypeGroupInput) ||
                              (additional && customerUnitTypeGroupId === null && unitTypeGroupId === null) ||
                              (!driverId &&
                                !transportCompanyId &&
                                !specialCodeId &&
                                !customerUnitTypeGroupId &&
                                !unitTypeGroupId &&
                                !unitTypeId)
                              ? "borderRed"
                              : ""
                            : ""
                      }`}
                      arrayList={unitTypeGroupDropdown}
                      searchString={unitTypeGroupInput}
                      renderItemId={(unitType) => unitType.unitTypeGroupPK}
                      renderItemField={(unitType) => unitType.description}
                      handleSearchString={(string) => dispatch(setUnitTypeGroupInput(string))}
                      fetchDataBySearchString={fetchUnitTypeGroup}
                      onSelect={handleUnitTypeGroupLookupSelection}
                      selectedId={unitTypeGroupId}
                      clearInputCallback={() => {
                        dispatch(setUnitTypeGroupId(null));
                      }}
                      loading={unitTypeGroupLoader}
                      disabled={viewDetail || customerUnitTypeGroupId || unitTypeId}
                    />
                    <LookupButton
                      onClick={handleUnitTypeGroupLookupModalShow}
                      disabled={viewDetail || customerUnitTypeGroupId || unitTypeId}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 ">Unit Type </Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="d-flex">
                    {/* unit Type  Autocomplete */}
                    <AutoCompleteDropdown
                      className={` ${styles.formControl} ${
                        !viewDetail && unitTypeId
                          ? "borderGreen"
                          : !viewDetail && !customerUnitTypeGroupId && !unitTypeGroupId
                            ? (!unitTypeId && unitTypeInput) ||
                              (additional && customerUnitTypeGroupId === null && unitTypeId === null) ||
                              (!driverId &&
                                !transportCompanyId &&
                                !specialCodeId &&
                                !customerUnitTypeGroupId &&
                                !unitTypeId &&
                                !customerGroupId)
                              ? "borderRed"
                              : ""
                            : ""
                      }`}
                      arrayList={unitTypedata}
                      searchString={unitTypeInput}
                      renderItemId={(unitType) => unitType.unitTypePK}
                      renderItemField={(unitType) => unitType.descriptionLong}
                      handleSearchString={(string) => dispatch(setUnitTypeInput(string))}
                      fetchDataBySearchString={fetchUnitTypeAuto}
                      onSelect={handleUnitTypeLookupSelection}
                      selectedId={unitTypeId}
                      loading={unitTypeLoader}
                      clearInputCallback={() => {
                        dispatch(setUnitTypeId(null));
                      }}
                      disabled={viewDetail || customerUnitTypeGroupId || unitTypeGroupId}
                    />
                    <LookupButton
                      onClick={handleUnitTypeLookupModalShow}
                      disabled={viewDetail || customerUnitTypeGroupId || unitTypeGroupId}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 ">Dealer Group </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="d-flex">
                    <AutoCompleteDropdown
                      className={`${
                        !viewDetail &&
                        !driverId &&
                        !transportCompanyId &&
                        !specialCodeId &&
                        !dealerGroupId &&
                        !pickupCustomerPlantId &&
                        !pickupCustomerId &&
                        !dealerId &&
                        !stateGroupsId &&
                        !additional
                          ? "borderRed"
                          : "" ||
                            (!viewDetail &&
                              (!dealerGroupId && dealerGroupInput
                                ? "borderRed"
                                : !driverId &&
                                    !transportCompanyId &&
                                    !specialCodeId &&
                                    dealerGroupId &&
                                    !additional
                                  ? "borderGreen"
                                  : ""))
                      }`}
                      arrayList={dealerGroupData}
                      searchString={dealerGroupInput}
                      handleSearchString={(string) => dispatch(setDealerGroupInput(string))}
                      fetchDataBySearchString={fetchDealerGroups}
                      renderItemId={(data) => data?.dealerGroupPK}
                      renderItemField={(data) => data?.description}
                      onSelect={handleDealerGroupLookupSelection}
                      selectedId={dealerGroupId}
                      clearInputCallback={() => {
                        dispatch(setDealerGroupId(null));
                      }}
                      loading={dealerGroupLoader}
                      disabled={
                        viewDetail ||
                        (additional === false
                          ? dealerId ||
                            driverId ||
                            specialCodeId ||
                            stateGroupsId ||
                            transportCompanyId ||
                            pickupCustomerId ||
                            pickupCustomerPlantId
                          : dealerId || stateGroupsId)
                      }
                    />
                    <LookupButton
                      onClick={handleDealerGroupLookupModalShow}
                      disabled={
                        viewDetail ||
                        (additional === false
                          ? dealerId ||
                            driverId ||
                            specialCodeId ||
                            stateGroupsId ||
                            transportCompanyId ||
                            pickupCustomerId ||
                            pickupCustomerPlantId
                          : dealerId || stateGroupsId)
                      }
                    />{" "}
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 ">Dealer </Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="d-flex">
                    <AutoCompleteDropdown
                      className={`${
                        !viewDetail &&
                        !driverId &&
                        !transportCompanyId &&
                        !specialCodeId &&
                        !pickupCustomerPlantId &&
                        !pickupCustomerId &&
                        !dealerId &&
                        !dealerGroupId &&
                        !stateGroupsId &&
                        !additional
                          ? "borderRed"
                          : "" ||
                            (!viewDetail &&
                              (!dealerId && dealerInput
                                ? "borderRed"
                                : !driverId &&
                                    !transportCompanyId &&
                                    !specialCodeId &&
                                    dealerId &&
                                    !additional
                                  ? "borderGreen"
                                  : ""))
                      }`}
                      arrayList={dealerDropDownData}
                      searchString={dealerInput}
                      renderItemId={(data) => data?.dealerPK}
                      renderItemField={(data) => data?.name}
                      handleSearchString={(string) => dispatch(setDealerInput(string))}
                      fetchDataBySearchString={fetchDealers}
                      onSelect={dealerLookupSelection}
                      selectedId={dealerId}
                      clearInputCallback={() => {
                        dispatch(setDealerId(null));
                      }}
                      loading={dealerLoader}
                      disabled={
                        viewDetail ||
                        (additional === false
                          ? dealerGroupId ||
                            driverId ||
                            specialCodeId ||
                            stateGroupsId ||
                            transportCompanyId ||
                            pickupCustomerId ||
                            pickupCustomerPlantId
                          : dealerGroupId || stateGroupsId)
                      }
                      towardsTop
                    />
                    <LookupButton
                      onClick={handleDealerLookupModalShow}
                      disabled={
                        viewDetail ||
                        (additional === false
                          ? dealerGroupId ||
                            driverId ||
                            specialCodeId ||
                            stateGroupsId ||
                            transportCompanyId ||
                            pickupCustomerId ||
                            pickupCustomerPlantId
                          : dealerGroupId || stateGroupsId)
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 ">State Group </Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="d-flex">
                    {/* Yard Autocomplete */}

                    <AutoCompleteDropdown
                      className={`${
                        !viewDetail &&
                        !driverId &&
                        !transportCompanyId &&
                        !specialCodeId &&
                        !pickupCustomerPlantId &&
                        !pickupCustomerId &&
                        !stateGroupsId &&
                        !dealerId &&
                        !dealerGroupId &&
                        !additional
                          ? "borderRed"
                          : "" ||
                            (!viewDetail &&
                              (!stateGroupsId && stateGroupsInput
                                ? "borderRed"
                                : !driverId &&
                                    !transportCompanyId &&
                                    !specialCodeId &&
                                    stateGroupsId &&
                                    !additional
                                  ? "borderGreen"
                                  : ""))
                      }`}
                      arrayList={stateGroupDropdown}
                      searchString={stateGroupsInput}
                      renderItemId={(data) => data?.stateGroupPK}
                      renderItemField={(data) => data?.description}
                      handleSearchString={(string) => dispatch(setStateGroupsInput(string))}
                      fetchDataBySearchString={fetchStateGroupsData}
                      onSelect={stateGroupLookupSelection}
                      selectedId={stateGroupsId}
                      clearInputCallback={() => {
                        dispatch(setStateGroupsId(null));
                      }}
                      loading={stateGroupLoader}
                      disabled={
                        viewDetail ||
                        (additional === false
                          ? dealerGroupId ||
                            dealerId ||
                            specialCodeId ||
                            driverId ||
                            transportCompanyId ||
                            pickupCustomerId ||
                            pickupCustomerPlantId
                          : dealerGroupId || dealerId)
                      }
                      towardsTop
                    />
                    <LookupButton
                      onClick={handleStateGroupLookupModalShow}
                      disabled={
                        viewDetail ||
                        (additional === false
                          ? dealerGroupId ||
                            dealerId ||
                            specialCodeId ||
                            driverId ||
                            transportCompanyId ||
                            pickupCustomerId ||
                            pickupCustomerPlantId
                          : dealerGroupId || dealerId)
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 ">Driver </Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="d-flex">
                    {/* Driver Autocomplete */}
                    <AutoCompleteDropdown
                      className={` ${styles.formControl} ${
                        !viewDetail &&
                        !driverId &&
                        !transportCompanyId &&
                        !specialCodeId &&
                        !pickupCustomerPlantId &&
                        !pickupCustomerId &&
                        !dealerId &&
                        !dealerGroupId &&
                        !stateGroupsId &&
                        !additional
                          ? "borderRed"
                          : !viewDetail && !driverId && driverInput
                            ? "borderRed"
                            : !viewDetail && driverId && !additional
                              ? "borderGreen"
                              : ""
                      }`}
                      arrayList={driverDropDownData}
                      searchString={driverInput}
                      renderItemId={(data) => data?.driverPK}
                      renderItemField={(data) => `${data?.firstName ?? ""} ${data?.lastName ?? ""}`?.trim()}
                      handleSearchString={(string) => dispatch(setDriverInput(string))}
                      fetchDataBySearchString={fetchDrivers}
                      onSelect={driverLookupSelection}
                      selectedId={driverId}
                      clearInputCallback={() => {
                        dispatch(setDriverId(null));
                      }}
                      loading={driverLoader}
                      disabled={
                        viewDetail ||
                        additional ||
                        (additional === false
                          ? dealerGroupId ||
                            dealerId ||
                            specialCodeId ||
                            stateGroupsId ||
                            transportCompanyId ||
                            pickupCustomerId ||
                            pickupCustomerPlantId
                          : transportCompanyId)
                      }
                      towardsTop
                    />
                    <LookupButton
                      onClick={handleDriverLookupModalShow}
                      disabled={
                        viewDetail ||
                        additional ||
                        (additional === false
                          ? dealerGroupId ||
                            dealerId ||
                            specialCodeId ||
                            stateGroupsId ||
                            transportCompanyId ||
                            pickupCustomerId ||
                            pickupCustomerPlantId
                          : transportCompanyId)
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 ">Transport Company </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="d-flex">
                    {/* Yard Autocomplete */}
                    <AutoCompleteDropdown
                      className={` ${styles.formControl} ${
                        !viewDetail &&
                        !driverId &&
                        !transportCompanyId &&
                        !specialCodeId &&
                        !pickupCustomerPlantId &&
                        !pickupCustomerId &&
                        !dealerId &&
                        !dealerGroupId &&
                        !stateGroupsId &&
                        !additional
                          ? "borderRed"
                          : !viewDetail && !transportCompanyId && transportCompanyInput
                            ? "borderRed"
                            : !viewDetail && transportCompanyId && !additional
                              ? "borderGreen"
                              : ""
                      }`}
                      arrayList={transportCompanyData}
                      searchString={transportCompanyInput}
                      renderItemId={(data) => data?.transportCompanyPK}
                      renderItemField={(data) => data?.name}
                      handleSearchString={(string) => dispatch(setTransportCompanyInput(string))}
                      fetchDataBySearchString={fetchTransportCompanyAuto}
                      onSelect={transportCompanyLookupSelection}
                      selectedId={transportCompanyId}
                      clearInputCallback={() => {
                        dispatch(setTransportCompanyId(null));
                      }}
                      loading={transportLoader}
                      disabled={
                        viewDetail ||
                        additional ||
                        (additional === false
                          ? dealerGroupId ||
                            dealerId ||
                            specialCodeId ||
                            stateGroupsId ||
                            driverId ||
                            pickupCustomerId ||
                            pickupCustomerPlantId
                          : driverId)
                      }
                      towardsTop
                    />
                    <LookupButton
                      onClick={handleTransportModalShow}
                      disabled={
                        viewDetail ||
                        additional ||
                        (additional === false
                          ? dealerGroupId ||
                            dealerId ||
                            specialCodeId ||
                            stateGroupsId ||
                            driverId ||
                            pickupCustomerId ||
                            pickupCustomerPlantId
                          : driverId)
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 ">Special Code</Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="d-flex">
                    {/* Yard Autocomplete */}
                    <AutoCompleteDropdown
                      className={` ${styles.formControl} ${
                        !viewDetail &&
                        !driverId &&
                        !transportCompanyId &&
                        !specialCodeId &&
                        !dealerId &&
                        !pickupCustomerPlantId &&
                        !pickupCustomerId &&
                        !dealerGroupId &&
                        !stateGroupsId &&
                        !additional
                          ? "borderRed"
                          : !viewDetail && !specialCodeId && specialCodeInput
                            ? "borderRed"
                            : !viewDetail && specialCodeId && !additional
                              ? "borderGreen"
                              : ""
                      }`}
                      arrayList={specialCodeDropdown}
                      searchString={specialCodeInput}
                      renderItemId={(data) => data?.specialCodePK}
                      renderItemField={(data) => data?.description}
                      handleSearchString={(string) => dispatch(setSpecialCodeInput(string))}
                      fetchDataBySearchString={fetchSpecialCode}
                      onSelect={specialCodeLookupSelection}
                      selectedId={specialCodeId}
                      clearInputCallback={() => {
                        dispatch(setSpecialCodeId(null));
                      }}
                      loading={specialCodeLoader}
                      disabled={
                        viewDetail ||
                        additional ||
                        (additional === false
                          ? dealerGroupId ||
                            dealerId ||
                            transportCompanyId ||
                            stateGroupsId ||
                            driverId ||
                            pickupCustomerId ||
                            pickupCustomerPlantId
                          : "")
                      }
                      towardsTop
                    />
                    <LookupButton
                      onClick={handleSpecialCodeModalShow}
                      disabled={
                        viewDetail ||
                        additional ||
                        (additional === false
                          ? dealerGroupId ||
                            dealerId ||
                            transportCompanyId ||
                            stateGroupsId ||
                            driverId ||
                            pickupCustomerId ||
                            pickupCustomerPlantId
                          : "")
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}  ${
                    !checkDpu ? "hide-elements" : ""
                  }`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 "> Pickup Customer</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="d-flex">
                    {/* Yard Autocomplete */}
                    <AutoCompleteDropdown
                      className={` ${styles.formControl} ${
                        !viewDetail &&
                        !driverId &&
                        !transportCompanyId &&
                        !specialCodeId &&
                        !pickupCustomerId &&
                        !pickupCustomerPlantId &&
                        !dealerId &&
                        !dealerGroupId &&
                        !stateGroupsId &&
                        !additional
                          ? "borderRed"
                          : !viewDetail && !pickupCustomerId && pickupCustomerInput
                            ? "borderRed"
                            : !viewDetail && pickupCustomerId && !additional
                              ? "borderGreen"
                              : ""
                      }`}
                      arrayList={pickupCustomerDropdown}
                      searchString={pickupCustomerInput}
                      renderItemId={(customer) => customer.customerPK}
                      renderItemField={(customer) => customer.name}
                      handleSearchString={(string) => dispatch(setPickupCustomerInput(string))}
                      fetchDataBySearchString={fetchPickupCustomer}
                      onSelect={customerLookupSelection}
                      selectedId={pickupCustomerId}
                      clearInputCallback={() => {
                        dispatch(setPickupCustomerId(null));
                      }}
                      loading={pickupCustomerLoader}
                      disabled={
                        viewDetail ||
                        additional ||
                        (additional === false
                          ? dealerGroupId ||
                            dealerId ||
                            transportCompanyId ||
                            stateGroupsId ||
                            driverId ||
                            specialCodeId ||
                            pickupCustomerPlantId
                          : pickupCustomerPlantId)
                      }
                      towardsTop
                    />
                    <LookupButton
                      onClick={handlePickupCustomerLookupModalShow}
                      disabled={
                        viewDetail ||
                        additional ||
                        (additional === false
                          ? dealerGroupId ||
                            dealerId ||
                            transportCompanyId ||
                            stateGroupsId ||
                            driverId ||
                            specialCodeId ||
                            pickupCustomerPlantId
                          : pickupCustomerPlantId)
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}  ${
                    !checkDpu ? "hide-elements" : ""
                  }`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 ">Pickup Plant</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="d-flex">
                    {/* Yard Autocomplete */}
                    <AutoCompleteDropdown
                      className={` ${styles.formControl} ${
                        !viewDetail &&
                        !driverId &&
                        !transportCompanyId &&
                        !pickupCustomerPlantId &&
                        !pickupCustomerId &&
                        !specialCodeId &&
                        !dealerId &&
                        !dealerGroupId &&
                        !stateGroupsId &&
                        !additional
                          ? "borderRed"
                          : !viewDetail && !pickupCustomerPlantId && pickupCustomerPlantInput
                            ? "borderRed"
                            : !viewDetail && pickupCustomerPlantId && !additional
                              ? "borderGreen"
                              : ""
                      }`}
                      arrayList={pickupCustomerPlantDropdown}
                      searchString={pickupCustomerPlantInput}
                      renderItemId={(customer) => customer.customerPlantPK}
                      renderItemField={(customer) => customer.name}
                      handleSearchString={(string) => dispatch(setPickupCustomerPlantInput(string))}
                      fetchDataBySearchString={fetchPickupCustomerGroup}
                      onSelect={handlePickupcustomerPlantLookupSelection}
                      selectedId={pickupCustomerPlantId}
                      clearInputCallback={() => {
                        dispatch(setPickupCustomerPlantId(null));
                      }}
                      disabled={
                        viewDetail ||
                        additional ||
                        (additional === false
                          ? dealerGroupId ||
                            dealerId ||
                            transportCompanyId ||
                            stateGroupsId ||
                            driverId ||
                            specialCodeId ||
                            pickupCustomerId
                          : pickupCustomerId)
                      }
                      loading={pickupPlantLoader}
                      towardsTop
                    />
                    <LookupButton
                      onClick={handleCustomerPlantLookupModalShow}
                      disabled={
                        viewDetail ||
                        additional ||
                        (additional === false
                          ? dealerGroupId ||
                            dealerId ||
                            transportCompanyId ||
                            stateGroupsId ||
                            driverId ||
                            specialCodeId ||
                            pickupCustomerId
                          : pickupCustomerId)
                      }
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col xs={6} className="flex-column  d-flex">
                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  {" "}
                  <Col sm={1} md={1} xs={1} className="p-0">
                    <Form.Label className=" col-form-label dealer-label m-l-0">Outbound</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-3">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        !viewDetail
                          ? outbound
                            ? "borderGreen"
                            : !outbound && !reload && !returns
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      id="outbound"
                      name="outbound"
                      checked={outbound}
                      onChange={(e) => {
                        dispatch(setOutbound(e.target.checked));
                      }}
                      disabled={viewDetail}
                    />
                  </Col>
                  <Col sm={1} md={1} xs={1} className="p-0">
                    <Form.Label className=" col-form-label dealer-label m-l-0">Reload</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        !viewDetail
                          ? reload
                            ? "borderGreen"
                            : !outbound && !reload && !returns
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      id="reload"
                      name="reload"
                      checked={reload}
                      onChange={(e) => {
                        dispatch(setReload(e.target.checked));
                      }}
                      disabled={viewDetail}
                    />
                  </Col>
                  <Col sm={1} md={1} xs={1} className="p-0">
                    <Form.Label className=" col-form-label dealer-label m-l-0">Return</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        !viewDetail
                          ? returns
                            ? "borderGreen"
                            : !outbound && !reload && !returns
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      id="returns"
                      name="returns"
                      checked={returns}
                      onChange={(e) => {
                        dispatch(setReturns(e.target.checked));
                      }}
                      disabled={viewDetail}
                    />
                  </Col>
                </Form.Group>

                <Row className={` "hide-elements" : ""}`}>
                  <Col style={{ marginLeft: "" }}>
                    <p className="p-0 text-danger alert" style={{ height: "3px" }}></p>
                  </Col>
                </Row>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 "> Invoice Rate</Form.Label>
                  </Col>
                  <div className="p-0 w-60px">
                    <input
                      className={`customFormControl ${
                        !viewDetail && isDecimalInvalid(inVoiceRate)
                          ? "borderRed"
                          : viewDetail || additionalFlatRate || !additional
                            ? ""
                            : (outbound || reload || returns) && inVoiceRate <= 0 && !driverRate
                              ? "borderRed"
                              : (outbound || reload || returns) && inVoiceRate > 0
                                ? "borderGreen"
                                : ""
                      }`}
                      id="inVoiceRate"
                      name="inVoiceRate"
                      type="text"
                      maxLength={8}
                      value={inVoiceRate}
                      disabled={viewDetail || additionalFlatRate}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        e.target.value?.match(/^[-]?\d{0,2}(\.\d{0,4})?$/) &&
                          dispatch(setInVoiceRate(e.target.value));
                      }}
                    />
                  </div>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 ">
                      Invoice Fuel Surcharge Rate
                    </Form.Label>
                  </Col>

                  <div className="p-0 w-60px">
                    <input
                      className={`customFormControl ${
                        !viewDetail && isDecimalInvalid(invoiceFuelSurchargeRate) ? "borderRed" : ""
                      }`}
                      id="invoiceFuelSurchargeRate"
                      name="invoiceFuelSurchargeRate"
                      type="text"
                      maxLength={8}
                      value={invoiceFuelSurchargeRate}
                      disabled={viewDetail || additionalFlatRate}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        let value = e.target.value;

                        value?.match(/^[-]?\d{0,2}(\.\d{0,4})?$/) &&
                          dispatch(setInvoiceFuelSurchargeRate(value));
                      }}
                    />
                  </div>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  {" "}
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label m-l-0">Invoice Full Rate</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="invoiceFullRate"
                      name="invoiceFullRate"
                      checked={invoiceFullRate}
                      onChange={(e) => {
                        dispatch(setInvoiceFullRate(e.target.checked));
                      }}
                      disabled={viewDetail || additionalFlatRate}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0">
                      Driver Rate
                    </Form.Label>
                  </Col>

                  <div className="p-0 w-60px">
                    <input
                      className={`customFormControl ${
                        !viewDetail && isDecimalInvalid(driverRate)
                          ? "borderRed"
                          : viewDetail || additionalFlatRate || !additional
                            ? ""
                            : (outbound || reload || returns) && inVoiceRate <= 0 && driverRate <= 0
                              ? "borderRed"
                              : (outbound || reload || returns) && driverRate > 0
                                ? "borderGreen"
                                : ""
                      }`}
                      id="driverRate"
                      name="driverRate"
                      type="text"
                      maxLength={8}
                      value={driverRate}
                      disabled={viewDetail || additionalFlatRate}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        e.target.value?.match(/^[-]?\d{0,2}(\.\d{0,4})?$/) &&
                          dispatch(setDriverRate(e.target.value));
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 ">
                      {" "}
                      Driver Fuel Surcharge Rate
                    </Form.Label>
                  </Col>

                  <div className="p-0 w-60px">
                    <input
                      className={`customFormControl ${
                        !viewDetail && isDecimalInvalid(driverFuelSurchargeRate) ? "borderRed" : ""
                      }`}
                      id="driverFuelSurchargeRate"
                      name="driverFuelSurchargeRate"
                      type="text"
                      disabled={viewDetail || additionalFlatRate}
                      maxLength={8}
                      value={driverFuelSurchargeRate}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        e.target.value?.match(/^[-]?\d{0,2}(\.\d{0,4})?$/) &&
                          dispatch(setDriverFuelSurchargeRate(e.target.value));
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  {" "}
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label m-l-0">Driver Full Rate</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="driverFullRate"
                      name="driverFullRate"
                      checked={driverFullRate}
                      disabled={viewDetail || additionalFlatRate}
                      onChange={(e) => {
                        dispatch(setDriverFullRate(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Row className={` "hide-elements" : ""}`}>
                  <Col style={{ marginLeft: "" }}>
                    <p className="p-0 text-danger alert" style={{ height: "10px" }}></p>
                  </Col>
                </Row>
                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  {" "}
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label m-l-0">Additional Rate</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="additional"
                      name="additional"
                      checked={additional}
                      disabled={viewDetail}
                      onChange={(e) => {
                        dispatch(setAdditional(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  {" "}
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label m-l-0">
                      Additional As Flat Rate
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="additional"
                      name="additional"
                      checked={additionalFlatRate}
                      disabled={viewDetail || !additional}
                      onChange={(e) => {
                        dispatch(setAdditionalFlatRate(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0">
                      Additional Description
                    </Form.Label>
                  </Col>
                  <Col sm={8} md={8} xs={8} className="p-0">
                    <input
                      className={`customFormControl ${
                        !viewDetail && additional && !additionalDescription
                          ? "borderRed"
                          : viewDetail
                            ? ""
                            : additionalDescription
                              ? "borderGreen"
                              : ""
                      }`}
                      id="additionalDescription"
                      name="additionalDescription"
                      type="text"
                      maxLength={50}
                      value={additionalDescription}
                      disabled={viewDetail || !additional}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setAdditionalDescription(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 "> Invoice Amount </Form.Label>
                  </Col>

                  <div className="p-0 w-60px">
                    <input
                      className={`customFormControl ${
                        viewDetail
                          ? ""
                          : isDecimalInvalid(invoiceAdditionalFlatRate)
                            ? "borderRed"
                            : additionalFlatRate
                              ? parseFloat(invoiceAdditionalFlatRate) > 0.0
                                ? "borderGreen"
                                : "borderRed"
                              : ""
                      }`}
                      id="invoiceAdditionalFlatRate"
                      name="invoiceAdditionalFlatRate"
                      type="text"
                      disabled={viewDetail || !additionalFlatRate}
                      maxLength={8}
                      value={invoiceAdditionalFlatRate}
                      autoComplete="off"
                      aria-autocomplete="list"

                      onInput={(e) => {
                        e.target.value?.match(/^[-]?\d{0,5}(\.\d{0,2})?$/) &&
                          dispatch(setInvoiceAdditionalFlatRate(e.target.value));
                      }}
                    />
                  </div>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label m-l-0 "> Driver Amount</Form.Label>
                  </Col>

                  <div className="p-0 w-60px">
                    <input
                      className={`customFormControl ${
                        viewDetail
                          ? ""
                          : isDecimalInvalid(driverAdditionalFlatRate)
                            ? "borderRed"
                            : additionalFlatRate
                              ? parseFloat(driverAdditionalFlatRate) > 0.0
                                ? "borderGreen"
                                : "borderRed"
                              : ""
                      }`}
                      id="driverFuelSurchargeRate"
                      name="driverFuelSurchargeRate"
                      type="text"
                      disabled={viewDetail || !additionalFlatRate}
                      maxLength={8}
                      value={driverAdditionalFlatRate}
                      autoComplete="off"
                      aria-autocomplete="list"

                      onInput={(e) => {
                        e.target.value?.match(/^[-]?\d{0,5}(\.\d{0,2})?$/) &&
                          dispatch(setDriverAdditionalFlatRate(e.target.value));
                      }}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          )}

          <CustomerUnitTypeGroupLookup
            show={customerUnitTypeGroupSelection}
            onHide={customerunitTypeGroupModalHide}
            renderItemId={(unitType) => unitType.customerUnitTypeGroupPK}
            handleLookupSelection={handlecustomerUnitTypeGroupLookupSelection}
            supplementalRates
            customerId={customerId}
            customerPlantId={customerPlantId}
            customerPlantGroupId={customerPlantGroupId}
            customerGroupId={customerGroupId}
          />
          <UnitTypeGroupLookup
            show={unitTypeGroupSelection}
            onHide={unitTypeGroupModalHide}
            renderItemId={(unitType) => unitType.unitTypeGroupPK}
            handleLookupSelection={handleUnitTypeGroupLookupSelection}
            unitTypeGroupPKS={unitTypeGroupPKS}
          />

          <UnitTypeLookup
            MaintenanceProgram
            show={unitTypeSelection}
            onHide={customerUnitTypeModalHide}
            renderItemId={(unitType) => unitType.unitTypePK}
            handleLookupSelection={handleUnitTypeLookupSelection}
          />

          <DealerGroupsLookup
            show={dealerGroupSelection}
            onHide={hideDealerGroupModel}
            renderItemId={(data) => data?.dealerGroupPK}
            renderItemField={(data) => data?.description}
            handleLookupSelection={handleDealerGroupLookupSelection}
            MaintenanceProgram
          />

          <TransportCompanysLookup
            show={transportCompanySelection}
            onHide={transportCompanyModalHide}
            renderItemId={(data) => data?.transportCompanysPK}
            handleLookupSelection={transportCompanyLookupSelection}
            MaintenanceProgram
          />

          <DealerLookup
            show={dealerSelection}
            onHide={dealerModalHide}
            renderItemId={(data) => data?.dealerPK}
            handleLookupSelection={dealerLookupSelection}
            MaintenanceProgram
          />
          <DriverSelectionLookupTemplate
            show={driverSelection}
            onHide={driverModalHide}
            renderItemId={(data) => data?.driverPK}
            handleLookupSelection={driverLookupSelection}
            MaintenanceProgram
          />
          <StateGroupsLookup
            show={stateGroupsSelection}
            onHide={stateGroupModalHide}
            renderItemId={(data) => data?.stateGroupPK}
            handleLookupSelection={stateGroupLookupSelection}
            MaintenanceProgram
          />

          <SpecialCodeLookup
            show={specialCodeSelection}
            onHide={specialCodeModalHide}
            renderItemId={(data) => data?.specialCodePK}
            handleLookupSelection={specialCodeLookupSelection}
            MaintenanceProgram
          />

          <CustomerLookup
            show={pickupCustomerSelection}
            onHide={pickupCustomerModalHide}
            renderItemId={(customer) => customer.customerPK}
            renderItemField={(customer) => customer.name}
            handleLookupSelection={customerLookupSelection}
            restrictedCustomerId={restrictedCustomerId}
            restrictedCustomer
          />

          <CustomerPlantsLookup
            show={pickupCustomerPlantSelection}
            onHide={pickupCustomerPlantModalHide}
            renderItemId={(plant) => plant.customerPlantPK}
            handleLookupSelection={handlePickupcustomerPlantLookupSelection}
            restrictedPlantLists={restrictedPlantLists}
          />

          <DriverLookup
            show={driverSelection}
            onHide={() => dispatch(setDriverSelection(false))}
            renderItemId={(driver) => driver.driverPK}
            handleLookupSelection={driverLookupSelection}
          />
        </div>
      </div>
    </Form>
  );
}

export default FormContent;
