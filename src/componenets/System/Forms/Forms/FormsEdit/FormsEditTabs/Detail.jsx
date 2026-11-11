import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormsService from "../../../../../../services/FormsService";
import {
  resetForms,
  setCustomerGroupId,
  setCustomerId,
  setCustomerPlantGroupId,
  setCustomerPlantId,
  setCustomerUnitTypeGroupId,
  setDeliveryDealerGroupId,
  setDeliveryDealerId,
  setIsDetailTabValid,
  setPickupDealerGroupId,
  setPickupDealerId,
  setResponseData,
  setSaveFormObject,
  setSpecialCodeId,
  setUnitTypeGroupId,
  setUnitTypeId,
  setViewDetail,
  setYardId,
} from "../../../../../../redux/FormsSlice";
import CustomerService from "../../../../../../services/CustomerService";
import CustomerUnitTypeGroupsService from "../../../../../../services/CustomerUnitTypeGroupsService";
import UnitTypeService from "../../../../../../services/UnitTypeService";
import UnitTypeGroupsService from "../../../../../../services/UnitTypeGroupsService";
import CustomerUnitTypeGroupLookup from "../../../../../LookupScreens/CustomerUnitTypeGroup/CustomerUnitTypeGroupLookup";
import LookupButton from "../../../../../common/LookupButton";
import UnitTypeLookup from "../../../../../LookupScreens/UnitType/UnitTypeLookup";
import UnitTypeGroupLookup from "../../../../../LookupScreens/UnitTypeGroup/UnitTypeGroupLookup";
import SpecialCodesService from "../../../../../../services/SpecialCodesService";
import DealerService from "../../../../../../services/DealerService";
import DealerGroupService from "../../../../../../services/DealerGroupService";
import DealerLookup from "../../../../../LookupScreens/Dealer/DealerLookup";
import DealerGroupsLookup from "../../../../../LookupScreens/DealerGroups/DealerGroupsLookup";
import CustomerLookup from "../../../../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantsLookup from "../../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import SupplementalRatesService from "../../../../../../services/SupplementalRatesService";
import CustomerPlantMaintenanceService from "../../../../../../services/CustomerPlantMaintenanceService";
import YardLookup from "../../../../../LookupScreens/Yard/YardLookup";
import SpecialCodeLookup from "../../../../../LookupScreens/SpecialCode/SpecialCodeLookup";
import YardService from "../../../../../../services/YardService";
import CustomerGroupService from "../../../../../../services/CustomerGroupService";
import CustomerPlantGroupsLookup from "../../../../../LookupScreens/CustomerPlantGroups/CustomerPlantGroupsLookup";
import CustomerGroupsLookup from "../../../../../LookupScreens/CustomerGroups/CustomerGroupsLookup";
import CustomerPlantGroupService from "../../../../../../services/CustomerPlantGroupService";

function Detail() {
  const { id, pageNumber } = useParams();
  const formPK = id;
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.forms.viewDetail);
  const changesCancelled = useSelector((state) => state.forms.changesCancelled);
  const responseData = useSelector((state) => state.forms.responseData);

  const customerId = useSelector((state) => state.forms.customerId);
  const customerPlantId = useSelector((state) => state.forms.customerPlantId);
  const customerPlantGroupId = useSelector((state) => state.forms.customerPlantGroupId);
  const customerGroupId = useSelector((state) => state.forms.customerGroupId);
  const customerUnitTypeGroupId = useSelector((state) => state.forms.customerUnitTypeGroupId);
  const pickupDealerId = useSelector((state) => state.forms.pickupDealerId);
  const pickupDealerGroupId = useSelector((state) => state.forms.pickupDealerGroupId);
  const deliveryDealerId = useSelector((state) => state.forms.deliveryDealerId);
  const deliveryDealerGroupId = useSelector((state) => state.forms.deliveryDealerGroupId);
  const unitTypeId = useSelector((state) => state.forms.unitTypeId);
  const unitTypeGroupId = useSelector((state) => state.forms.unitTypeGroupId);
  const yardId = useSelector((state) => state.forms.yardId);
  const specialCodeId = useSelector((state) => state.forms.specialCodeId);
  const clearDetailForm = useSelector((state) => state.forms.clearDetailForm);

  const [customerDataList, setCustomerDataList] = useState([]);
  const [customerData, setCustomerData] = useState("");
  const [showCustomerLookup, setShowCustomerLookup] = useState(false);

  const [customerPlantDataList, setCustomerPlantDataList] = useState([]);
  const [customerPlantData, setCustomerPlantData] = useState("");
  const [showCustomerPlantLookup, setShowCustomerPlantLookup] = useState(false);

  const [customerPlantGroupDataList, setCustomerPlantGroupDataList] = useState([]);
  const [customerPlantGroupData, setCustomerPlantGroupData] = useState("");
  const [showCustomerPlantGroupLookup, setShowCustomerPlantGroupLookup] = useState(false);

  const [customerGroupDataList, setCustomerGroupDataList] = useState([]);
  const [customerGroupData, setCustomerGroupData] = useState("");
  const [showCustomerGroupLookup, setShowCustomerGroupLookup] = useState(false);

  const [customerUnitTypeGroupDataList, setCustomerUnitTypeGroupDataList] = useState([]);
  const [customerUnitTypeGroupData, setCustomerUnitTypeGroupData] = useState("");
  const [showCustomerUnitTypeGroupLookup, setShowCustomerUnitTypeGroupLookUp] = useState(false);

  const [pickupDealerDataList, setPickupDealerDataList] = useState([]);
  const [pickupDealerData, setPickupDealerData] = useState("");
  const [showPickupDealerLookup, setShowPickupDealerLookup] = useState(false);

  const [pickupDealerGroupDataList, setPickupDealerGroupDataList] = useState([]);
  const [pickupDealerGroupData, setPickupDealerGroupData] = useState("");
  const [showPickupDealerGroupLookup, setShowPickupDealerGroupLookup] = useState(false);

  const [deliveryDealerDataList, setDeliveryDealerDataList] = useState([]);
  const [deliveryDealerData, setDeliveryDealerData] = useState("");
  const [showDeliveryDealerLookup, setShowDeliveryDealerLookup] = useState(false);

  const [deliveryDealerGroupDataList, setDeliveryDealerGroupDataList] = useState([]);
  const [deliveryDealerGroupData, setDeliveryDealerGroupData] = useState("");
  const [showDeliveryDealerGroupLookup, setShowDeliveryDealerGroupLookup] = useState(false);

  const [unitTypeDataList, setUnitTypeDataList] = useState([]);
  const [unitTypeData, setUnitTypeData] = useState("");
  const [showUnitTypeLookup, setShowUnitTypeLookup] = useState("");

  const [unitTypeGroupDataList, setUnitTypeGroupDataList] = useState([]);
  const [unitTypeGroupData, setUnitTypeGroupData] = useState("");
  const [showUnitTypeGroupLookup, setShowUnitTypeGroupLookup] = useState(false);

  const [yardDataList, setYardDataList] = useState([]);
  const [yardData, setYardData] = useState("");
  const [showYardLookup, setShowYardLookup] = useState(false);

  const [specialCodeDataList, setSpecialCodeDataList] = useState([]);
  const [specialCodeData, setSpecialCodeData] = useState("");
  const [showSpecialCodeLookup, setShowSpecialCodeLookup] = useState(false);

  const [unitTypeGroupPKS, setUnitTypeGroupPKS] = useState([]);
  const [dropdownLoading, setDropdownLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (responseData != null) {
      dispatch(setCustomerId(responseData ? responseData.customerFK || "" : ""));
      fetchCustomerById(responseData.customerFK);
      dispatch(setCustomerPlantId(responseData ? responseData.customerPlantFK || "" : ""));
      fetchCustomerPlantById(responseData.customerPlantFK);
      dispatch(setCustomerPlantGroupId(responseData ? responseData.customerPlantGroupFK || "" : ""));
      dispatch(setCustomerGroupId(responseData ? responseData.customerPlantGroupFK || "" : ""));
      fetchCustomerPlantGroupById(responseData.customerPlantGroupFK);
      fetchCustomerGroupById(responseData.customerGroupFK || "");
      dispatch(
        setCustomerUnitTypeGroupId(responseData ? responseData.customerUnitTypeGroupFK || null : null)
      );
      fetchCustomerUnitTypeGroupById(responseData.customerUnitTypeGroupFK);
      dispatch(setPickupDealerId(responseData ? responseData.pickupDealerFK || "" : ""));
      fetchPickupDealerById(responseData.pickupDealerFK);
      dispatch(setPickupDealerGroupId(responseData ? responseData.pickupDealerGroupFK || "" : ""));
      fetchPickupDealerGroupById(responseData.pickupDealerGroupFK);
      dispatch(setDeliveryDealerId(responseData ? responseData.deliveryDealerFK || "" : ""));
      fetchDeliveryDealerById(responseData.deliveryDealerFK);
      dispatch(setDeliveryDealerGroupId(responseData ? responseData.deliveryDealerGroupFK || "" : ""));
      fetchDeliveryDealerGroupById(responseData.deliveryDealerGroupFK);
      dispatch(setUnitTypeId(responseData ? responseData.unitTypeFK || "" : ""));
      fetchUnitTypeById(responseData.unitTypeFK);
      dispatch(setUnitTypeGroupId(responseData ? responseData.unitTypeGroupFK || "" : ""));
      fetchUnitTypeGroupById(responseData.unitTypeGroupFK);
      dispatch(setYardId(responseData ? responseData.yardFK || "" : ""));
      fetchYardById(responseData.yardFK);
      dispatch(setSpecialCodeId(responseData ? responseData.specialCodeFK || "" : ""));
      fetchSpecialCodeById(responseData.specialCodeFK);
    } else if (responseData === undefined || responseData === null) {
      dispatch(setCustomerId(null));
      setCustomerData("");
      dispatch(setCustomerPlantId(null));
      setCustomerPlantData("");
      dispatch(setCustomerPlantGroupId(null));
      setCustomerPlantGroupData("");
      dispatch(setCustomerGroupId(null));
      setCustomerGroupData("");
      dispatch(setCustomerUnitTypeGroupId(null));
      setCustomerUnitTypeGroupData("");
      dispatch(setPickupDealerId(null));
      setPickupDealerData("");
      dispatch(setPickupDealerGroupId(null));
      setPickupDealerGroupData("");
      dispatch(setDeliveryDealerId(null));
      setDeliveryDealerData("");
      dispatch(setDeliveryDealerGroupId(null));
      setDeliveryDealerGroupData("");
      dispatch(setUnitTypeId(null));
      setUnitTypeData("");
      dispatch(setUnitTypeGroupId(null));
      setUnitTypeGroupData("");
      dispatch(setYardId(null));
      setYardData("");
      dispatch(setSpecialCodeId(null));
      setSpecialCodeData("");
    }
  }, [responseData, viewDetail]);

  useEffect(() => {
    dispatch(
      setSaveFormObject({
        formPK: id,
        customerFK: customerId,
        customerPlantFK: customerPlantId,
        customerPlantGroupFK: customerPlantGroupId,
        customerGroupFK: customerGroupId,
        customerUnitTypeGroupFK: customerUnitTypeGroupId,
        pickupDealerFK: pickupDealerId,
        pickupDealerGroupFK: pickupDealerGroupId,
        deliveryDealerFK: deliveryDealerId,
        deliveryDealerGroupFK: deliveryDealerGroupId,
        unitTypeFK: unitTypeId,
        unitTypeGroupFK: unitTypeGroupId,
        yardFK: yardId,
        specialCodeFK: specialCodeId,
      })
    );
  }, [
    customerId,
    customerPlantId,
    customerPlantGroupId,
    customerGroupId,
    customerUnitTypeGroupId,
    pickupDealerId,
    pickupDealerGroupId,
    deliveryDealerId,
    deliveryDealerGroupId,
    unitTypeId,
    unitTypeGroupId,
    yardId,
    specialCodeId,
  ]);

  useEffect(() => {
    if (customerData && !customerId) {
      dispatch(setIsDetailTabValid(false));
    } else if (customerPlantData && !customerPlantId) {
      dispatch(setIsDetailTabValid(false));
    } else if (customerGroupData && !customerGroupId) {
      dispatch(setIsDetailTabValid(false));
    } else if (customerUnitTypeGroupData && !customerUnitTypeGroupId) {
      dispatch(setIsDetailTabValid(false));
    } else if (pickupDealerData && !pickupDealerId) {
      dispatch(setIsDetailTabValid(false));
    } else if (pickupDealerGroupData && !pickupDealerGroupId) {
      dispatch(setIsDetailTabValid(false));
    } else if (deliveryDealerData && !deliveryDealerId) {
      dispatch(setIsDetailTabValid(false));
    } else if (deliveryDealerGroupData && !deliveryDealerGroupId) {
      dispatch(setIsDetailTabValid(false));
    } else if (unitTypeData && !unitTypeId) {
      dispatch(setIsDetailTabValid(false));
    } else if (unitTypeGroupData && !unitTypeGroupId) {
      dispatch(setIsDetailTabValid(false));
    } else if (yardData && !yardId) {
      dispatch(setIsDetailTabValid(false));
    } else if (specialCodeData && !specialCodeId) {
      dispatch(setIsDetailTabValid(false));
    } else {
      dispatch(setIsDetailTabValid(true));
    }
  }, [
    deliveryDealerId,
    deliveryDealerData,
    customerData,
    customerId,
    customerPlantData,
    customerPlantId,
    customerGroupData,
    customerGroupId,
    customerUnitTypeGroupData,
    customerUnitTypeGroupId,
    pickupDealerData,
    pickupDealerId,
    pickupDealerGroupData,
    pickupDealerGroupId,
    deliveryDealerGroupData,
    deliveryDealerGroupId,
    unitTypeData,
    unitTypeId,
    unitTypeGroupData,
    unitTypeGroupId,
    yardData,
    yardId,
    specialCodeData,
    specialCodeId,
  ]);

  useEffect(() => {
    if (clearDetailForm) {
      setCustomerData("");
      setCustomerPlantData("");
      setCustomerPlantGroupData("");
      setCustomerGroupData("");
      setCustomerUnitTypeGroupData("");
      setPickupDealerData("");
      setPickupDealerGroupData("");
      setDeliveryDealerData("");
      setDeliveryDealerGroupData("");
      setUnitTypeData("");
      setUnitTypeGroupData("");
      setYardData("");
      setSpecialCodeData("");
    }
  }, [clearDetailForm]);

  const fetchCustomerById = (customerId) => {
    if (customerId) {
      CustomerService.getCustomerById(customerId)
        .then((response) => {
          const data = response.data;
          setCustomerData(data.name?.trim());
        })
        .catch((err) => {});
    } else {
      setCustomerData("");
    }
  };

  const fetchCustomerPlantById = (customerPlantId) => {
    if (customerPlantId) {
      CustomerPlantMaintenanceService.getcompleteCustomerPlantsById(customerPlantId)
        .then((response) => {
          const data = response.data;
          setCustomerPlantData(data.name?.trim());
        })
        .catch((err) => {});
    } else {
      setCustomerPlantData("");
    }
  };

  const fetchCustomerPlantGroupById = (customerPlantGroupId) => {
    if (customerPlantGroupId) {
      CustomerPlantGroupService.getRecord(customerPlantGroupId).then((response) => {
        const data = response.data;
        setCustomerPlantGroupData(data.description?.trim());
      });
    }
  };

  const fetchCustomerGroupById = (customerGroupId) => {
    if (customerGroupId) {
      CustomerGroupService.getRecord(customerGroupId).then((response) => {
        const data = response.data;
        setCustomerGroupData(data.description?.trim());
      });
    }
  };

  const fetchCustomerUnitTypeGroupById = (customerUnitTypeGroupId) => {
    if (customerUnitTypeGroupId) {
      CustomerUnitTypeGroupsService.getRecord(customerUnitTypeGroupId)
        .then((response) => {
          const data = response.data;
          setCustomerUnitTypeGroupData(data.description?.trim());
        })
        .catch((err) => {});
    } else {
      setCustomerUnitTypeGroupData("");
    }
  };

  const fetchPickupDealerById = (pickupDealerId) => {
    if (pickupDealerId) {
      DealerService.getDealerById(pickupDealerId)
        .then((response) => {
          const data = response.data;
          setPickupDealerData(data.name?.trim());
        })
        .catch((err) => {});
    } else {
      setPickupDealerData("");
    }
  };

  const fetchPickupDealerGroupById = (pickupDealerGroupId) => {
    if (pickupDealerGroupId) {
      DealerGroupService.getDealerGroupById(pickupDealerGroupId)
        .then((response) => {
          const data = response.data;
          setPickupDealerGroupData(data.description?.trim());
        })
        .catch((err) => {});
    } else {
      setPickupDealerGroupData("");
    }
  };

  const fetchDeliveryDealerById = (deliveryDealerId) => {
    if (deliveryDealerId) {
      DealerService.getDealerById(deliveryDealerId)
        .then((response) => {
          const data = response.data;
          setDeliveryDealerData(data.name?.trim());
        })
        .catch((err) => {});
    } else {
      setDeliveryDealerData("");
    }
  };

  const fetchDeliveryDealerGroupById = (deliveryDealerGroupId) => {
    if (deliveryDealerGroupId) {
      DealerGroupService.getDealerGroupById(deliveryDealerGroupId)
        .then((response) => {
          const data = response.data;
          setDeliveryDealerGroupData(data.description?.trim());
        })
        .catch((err) => {});
    } else {
      setDeliveryDealerGroupData("");
    }
  };

  const fetchUnitTypeById = (unitTypeId) => {
    if (unitTypeId) {
      UnitTypeService.getRecord(unitTypeId)
        .then((response) => {
          const data = response.data;
          setUnitTypeData(data.descriptionLong?.trim());
        })
        .catch((err) => {});
    } else {
      setUnitTypeData("");
    }
  };

  const fetchUnitTypeGroupById = (unitTypeGroupId) => {
    if (unitTypeGroupId) {
      CustomerService.getUnitTypeGroupsById(unitTypeGroupId)
        .then((response) => {
          const data = response.data;
          setUnitTypeGroupData(data.description?.trim());
        })
        .catch((err) => {});
    } else {
      setUnitTypeGroupData("");
    }
  };

  const fetchYardById = (yardId) => {
    if (yardId) {
      CustomerService.getCustomerYardById(yardId)
        .then((response) => {
          const data = response.data;
          setYardData(data.name?.trim());
        })
        .catch((err) => {});
    } else {
      setYardData("");
    }
  };

  const fetchSpecialCodeById = (specialCodeId) => {
    if (specialCodeId) {
      CustomerService.getSpecialCodeById(specialCodeId)
        .then((response) => {
          const data = response.data;
          setSpecialCodeData(data.description?.trim());
        })
        .catch((err) => {});
    } else {
      setSpecialCodeData("");
    }
  };

  const fetchCustomer = (string) => {
    setDropdownLoading(true);
    FormsService.fetchCustomerAutoComplete(string)
      .then((response) => {
        const data = response.data;
        const customerList = data.content?.map((data) => ({ ...data, name: data.name?.trim() }));

        setCustomerDataList(customerList);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };

  const fetchCustomerPlant = (string) => {
    setDropdownLoading(true);
    CustomerPlantMaintenanceService.getAllPlantsByCustomerAuto(string)
      .then((response) => {
        const data = response.data;
        const customerPlantList = data.content?.map((data) => ({ ...data, name: data.name?.trim() }));

        setCustomerPlantDataList(customerPlantList);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };

  const fetchCustomerPlantGroups = (string) => {
    setDropdownLoading(true);
    CustomerService.getAllCustomerPlantGroups(string)
      .then((response) => {
        const data = response.data;
        const customerPlantGroupList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));

        setCustomerPlantGroupDataList(customerPlantGroupList);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };

  const fetchCustomerGroups = (string) => {
    setDropdownLoading(true);
    CustomerGroupService.getCustomerGroupForAuto(string)
      .then((response) => {
        const data = response.data;
        const customerGroupList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));

        setCustomerGroupDataList(customerGroupList);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };

  const fetchCustomerUnitTypeGroup = (
    string,
    customerId,
    customerPlantId,
    customerPlantGroupId,
    customerGroupId
  ) => {
    setDropdownLoading(true);
    CustomerUnitTypeGroupsService.getCustomerUnitTypeGroupForAuto(
      string,
      customerId,
      customerPlantId,
      customerPlantGroupId,
      customerGroupId
    )
      .then((response) => {
        const data = response.data;
        const customerUnitTypeGroupList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));

        setCustomerUnitTypeGroupDataList(customerUnitTypeGroupList);
        const customerUnitTypeGroupPKs = data.content?.map((item) => item.customerunittypegroupPK);
        setUnitTypeGroupPKS(customerUnitTypeGroupPKs);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };

  const fetchUnitTypes = (string, customerUnitTypeGroupId) => {
    setDropdownLoading(true);
    FormsService.getUnitTypeServiceForAuto(string, customerUnitTypeGroupId)
      .then((response) => {
        const data = response.data;
        const unitTypeList = data.content?.map((data) => ({
          ...data,
          descriptionLong: data.descriptionLong?.trim(),
        }));
        setUnitTypeDataList(unitTypeList);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };

  const fetchUnitTypeGroups = (string, customerUnitTypeGroupId) => {
    setDropdownLoading(true);
    FormsService.getUnitTypesGroupForAuto(customerUnitTypeGroupId, string)
      .then((response) => {
        setTimeout(() => {
          const data = response.data;
          const unitTypeGroupList = data.content?.map((data) => ({
            ...data,
            description: data.description?.trim(),
          }));
          setUnitTypeGroupDataList(unitTypeGroupList);
        }, 1000);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };

  const fetchPickupDealers = (string) => {
    setDropdownLoading(true);
    DealerService.fetchDealerForAuto(string)
      .then((response) => {
        const data = response.data;
        const dealerList = data.content?.map((data) => ({ ...data, name: data.name?.trim() }));

        setPickupDealerDataList(dealerList);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };

  const fetchPickupDealerGroups = (string) => {
    setDropdownLoading(true);
    DealerGroupService.getDealerGroupsForAuto(string)
      .then((response) => {
        const data = response.data;
        const dealerGroupList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));

        setPickupDealerGroupDataList(dealerGroupList);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };

  const fetchDeliveryDealers = (string) => {
    setDropdownLoading(true);
    DealerService.fetchDealerForAuto(string)
      .then((response) => {
        const data = response.data;
        const dealerList = data.content?.map((data) => ({ ...data, name: data.name?.trim() }));

        setDeliveryDealerDataList(dealerList);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };

  const fetchDeliveryDealerGroups = (string) => {
    setDropdownLoading(true);
    DealerGroupService.getDealerGroupsForAuto(string)
      .then((response) => {
        const data = response.data;
        const dealerGroupList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));

        setDeliveryDealerGroupDataList(dealerGroupList);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };

  const fetchYard = (string) => {
    setDropdownLoading(true);
    YardService.getAllYardsForAutoComplete(string)
      .then((response) => {
        const data = response.data;
        const yardList = data.content.map((yard) => ({ ...yard, description: yard.description?.trim() }));
        setYardDataList(yardList);
      })
      .catch((error) => {})
      .finally(() => setDropdownLoading(false));
  };

  const fetchSpecialCode = (string) => {
    setDropdownLoading(true);
    SpecialCodesService.getSpecialCodeForAuto(string)
      .then((response) => {
        const data = response.data;
        const specialCodeList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));

        setSpecialCodeDataList(specialCodeList);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };

  const handleCustomerLookupSelection = (customer) => {
    setCustomerData(customer.name);
    dispatch(setCustomerId(customer.customerPK));
    fetchCustomerUnitTypeGroup(
      customerUnitTypeGroupData,
      customer.customerPK,
      customerPlantId,
      customerPlantGroupId,
      customerGroupId
    );
    setCustomerPlantData("");
    setShowCustomerLookup(false);
    setCustomerUnitTypeGroupData("");
    setPickupDealerData("");
    setPickupDealerGroupData("");
    setDeliveryDealerData("");
    setDeliveryDealerGroupData("");
    setUnitTypeData("");
    setUnitTypeGroupData("");
    setYardData("");
    setSpecialCodeData("");
  };

  const handleCustomerPlantLookupSelection = (customerPlant) => {
    setCustomerPlantData(customerPlant.name);
    dispatch(setCustomerPlantId(customerPlant.customerPlantPK));
    fetchCustomerUnitTypeGroup(
      customerUnitTypeGroupData,
      customerId,
      customerPlant.customerPlantPK,
      customerPlantGroupId,
      customerGroupId
    );
    setCustomerData("");
    setShowCustomerPlantLookup(false);
    setCustomerUnitTypeGroupData("");
    setCustomerGroupData("");
    setCustomerPlantGroupData("");
    setPickupDealerData("");
    setPickupDealerGroupData("");
    setDeliveryDealerData("");
    setDeliveryDealerGroupData("");
    setUnitTypeData("");
    setUnitTypeGroupData("");
    setYardData("");
    setSpecialCodeData("");
  };

  const handleCustomerPlantGroupLookupSelection = (customerPlantGroup) => {
    setCustomerPlantGroupData(customerPlantGroup.description);
    dispatch(setCustomerPlantGroupId(customerPlantGroup.customerPlantGroupPK));
    fetchCustomerUnitTypeGroup(
      customerUnitTypeGroupData,
      customerId,
      customerPlantId,
      customerPlantGroup.customerPlantGroupPK,
      customerGroupId
    );
    setCustomerData("");
    setCustomerPlantData("");
    setCustomerGroupData("");
    setShowCustomerPlantGroupLookup(false);
    setCustomerUnitTypeGroupData("");
    setPickupDealerData("");
    setPickupDealerGroupData("");
    setDeliveryDealerData("");
    setDeliveryDealerGroupData("");
    setUnitTypeData("");
    setUnitTypeGroupData("");
    setYardData("");
    setSpecialCodeData("");
  };

  const handleCustomerGroupLookupSelection = (customerGroup) => {
    setCustomerGroupData(customerGroup.description);
    dispatch(setCustomerGroupId(customerGroup.customerGroupPK));
    fetchCustomerUnitTypeGroup(
      customerUnitTypeGroupData,
      customerId,
      customerPlantId,
      customerPlantGroupId,
      customerGroup.customerGroupPK
    );
    setCustomerData("");
    setShowCustomerGroupLookup(false);
    setCustomerPlantGroupData("");
    setCustomerPlantData("");
    setCustomerUnitTypeGroupData("");
    setPickupDealerData("");
    setPickupDealerGroupData("");
    setDeliveryDealerData("");
    setDeliveryDealerGroupData("");
    setUnitTypeData("");
    setUnitTypeGroupData("");
    setYardData("");
    setSpecialCodeData("");
  };

  const handleCustomerUnitTypeGroupLookupSelection = (customerUnitTypeGroup) => {
    setCustomerUnitTypeGroupData(customerUnitTypeGroup.description);
    dispatch(setCustomerUnitTypeGroupId(customerUnitTypeGroup.customerunittypegroupPK));
    fetchUnitTypes(unitTypeData, customerUnitTypeGroup.customerunittypegroupPK);
    fetchUnitTypeGroups(unitTypeGroupData, customerUnitTypeGroup.customerunittypegroupPK);
    setUnitTypeData("");
    setUnitTypeGroupData("");
    setShowCustomerUnitTypeGroupLookUp(false);
  };

  const handleUnitTypeLookupSelection = (unitType) => {
    setUnitTypeData(unitType.descriptionLong);
    dispatch(setUnitTypeId(unitType.unitTypePK));
    setUnitTypeGroupData("");
    setShowUnitTypeLookup(false);
  };

  const handleUnitTypeGroupLookupSelection = (unitTypeGroup) => {
    setUnitTypeGroupData(unitTypeGroup?.description?.trim());
    dispatch(setUnitTypeGroupId(unitTypeGroup.unitTypeGroupPK));
    setUnitTypeData("");
    setShowUnitTypeGroupLookup(false);
  };

  const handlePickupDealerLookupSelection = (pickupDealer) => {
    setPickupDealerData(pickupDealer.name);
    dispatch(setPickupDealerId(pickupDealer.dealerPK));
    setPickupDealerGroupData("");
    setDeliveryDealerData("");
    setDeliveryDealerGroupData("");
    setYardData("");
    setShowPickupDealerLookup(false);
  };

  const handlePickupDealerGroupLookupSelection = (pickupDealerGroup) => {
    setPickupDealerGroupData(pickupDealerGroup.description);
    dispatch(setPickupDealerGroupId(pickupDealerGroup.dealerGroupPK));
    setPickupDealerData("");
    setDeliveryDealerData("");
    setDeliveryDealerGroupData("");
    setYardData("");
    setShowPickupDealerGroupLookup(false);
  };

  const handleDeliveryDealerLookupSelection = (deliveryDealer) => {
    setDeliveryDealerData(deliveryDealer.name);
    dispatch(setDeliveryDealerId(deliveryDealer.dealerPK));
    setPickupDealerData("");
    setPickupDealerGroupData("");
    setDeliveryDealerGroupData("");
    setYardData("");
    setShowDeliveryDealerLookup(false);
  };

  const handleDeliveryDealerGroupLookupSelection = (deliveryDealerGroup) => {
    setDeliveryDealerGroupData(deliveryDealerGroup.description);
    dispatch(setDeliveryDealerGroupId(deliveryDealerGroup.dealerGroupPK));
    setPickupDealerData("");
    setPickupDealerGroupData("");
    setDeliveryDealerData("");
    setYardData("");
    setShowDeliveryDealerGroupLookup(false);
  };

  const handleYardLookupSelection = (data) => {
    setYardData(data.description);
    dispatch(setYardId(data.yardPK));
    setPickupDealerData("");
    setPickupDealerGroupData("");
    setDeliveryDealerData("");
    setDeliveryDealerGroupData("");
    setShowYardLookup(false);
  };

  const handleSpecialCodeLookupSelection = (data) => {
    setSpecialCodeData(data.description);
    dispatch(setSpecialCodeId(data.specialCodePK));
    setShowSpecialCodeLookup(false);
  };

  return (
    // <>
    <div className="p-2 ps-3 w-100">
      <div className="d-flex">
        <Col xs={6}>
          <Form.Group className={`mt-4 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 `}>
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Customer
              </Form.Label>
            </Col>

            <Col xs={6} md={6} className="p-0 me-2 d-flex">
              <AutoCompleteDropdown
                arrayList={customerDataList}
                searchString={customerData}
                renderItemId={(customer) => customer.customerPK}
                renderItemField={(customer) => customer.name}
                handleSearchString={(string) => {
                  setCustomerData(string);
                }}
                loading={dropdownLoading}
                fetchDataBySearchString={fetchCustomer}
                onSelect={handleCustomerLookupSelection}
                selectedId={customerId}
                clearInputCallback={() => {
                  dispatch(setCustomerId(null));
                }}
                disabled={!!(viewDetail || customerPlantId || customerPlantGroupId || customerGroupId)}
                className={`${customerId === null && customerData !== "" ? "borderRed" : ""}`}
                maxHeight={"200px"}
                // towardsTop
              />
              <LookupButton
                disabled={viewDetail || customerPlantId || customerPlantGroupId || customerGroupId}
                onClick={() => setShowCustomerLookup(true)}
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-4 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 `}>
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Customer Plant
              </Form.Label>
            </Col>

            <Col xs={6} md={6} className="p-0 me-2 d-flex">
              <AutoCompleteDropdown
                arrayList={customerPlantDataList}
                searchString={customerPlantData}
                renderItemId={(customerPlant) => customerPlant.customerPlantPK}
                renderItemField={(customerPlant) => customerPlant.name}
                handleSearchString={(string) => {
                  setCustomerPlantData(string);
                }}
                loading={dropdownLoading}
                fetchDataBySearchString={fetchCustomerPlant}
                onSelect={handleCustomerPlantLookupSelection}
                selectedId={customerPlantId}
                clearInputCallback={() => {
                  dispatch(setCustomerPlantId(null));
                }}
                disabled={!!(viewDetail || customerId || customerPlantGroupId || customerGroupId)}
                className={`${customerPlantId === null && customerPlantData !== "" ? "borderRed" : ""}`}
                maxHeight={"200px"}
                // towardsTop
              />
              <LookupButton
                disabled={viewDetail || customerId || customerPlantGroupId || customerGroupId}
                onClick={() => setShowCustomerPlantLookup(true)}
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-4 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 `}>
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Customer Plant Group
              </Form.Label>
            </Col>

            <Col xs={6} md={6} className="p-0 me-2 d-flex">
              <AutoCompleteDropdown
                arrayList={customerPlantGroupDataList}
                searchString={customerPlantGroupData}
                renderItemId={(data) => data.customerPlantGroupPK}
                renderItemField={(data) => data.description}
                handleSearchString={(string) => setCustomerPlantGroupData(string)}
                loading={dropdownLoading}
                fetchDataBySearchString={fetchCustomerPlantGroups}
                onSelect={handleCustomerPlantGroupLookupSelection}
                selectedId={customerPlantGroupId}
                clearInputCallback={() => {
                  dispatch(setCustomerPlantGroupId(null));
                }}
                disabled={!!(viewDetail || customerId || customerPlantId || customerGroupId)}
                className={`${
                  customerPlantGroupId === null && customerPlantGroupData !== "" ? "borderRed" : ""
                }`}
                maxHeight={"200px"}
                towardsTop
              />
              <LookupButton
                disabled={viewDetail || customerId || customerPlantId || customerGroupId}
                onClick={() => setShowCustomerPlantGroupLookup(true)}
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-4 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 `}>
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Customer Group
              </Form.Label>
            </Col>

            <Col xs={6} md={6} className="p-0 me-2 d-flex">
              <AutoCompleteDropdown
                arrayList={customerGroupDataList}
                searchString={customerGroupData}
                renderItemId={(data) => data.customerGroupPK}
                renderItemField={(data) => data.description}
                loading={dropdownLoading}
                handleSearchString={(string) => setCustomerGroupData(string)}
                fetchDataBySearchString={fetchCustomerGroups}
                onSelect={handleCustomerGroupLookupSelection}
                selectedId={customerGroupId}
                clearInputCallback={() => {
                  dispatch(setCustomerGroupId(null));
                }}
                disabled={!!(viewDetail || customerId || customerPlantId || customerPlantGroupId)}
                className={`${customerGroupId === null && customerGroupData !== "" ? "borderRed" : ""}`}
                maxHeight={"200px"}
                towardsTop
              />
              <LookupButton
                disabled={
                  viewDetail || pickupDealerGroupId || deliveryDealerId || deliveryDealerGroupId || yardId
                }
                onClick={() => setShowCustomerGroupLookup(true)}
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-4 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 `}>
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Customer Unit Type Group
              </Form.Label>
            </Col>

            <Col xs={6} md={6} className="p-0 me-2 d-flex">
              <AutoCompleteDropdown
                arrayList={customerUnitTypeGroupDataList}
                searchString={customerUnitTypeGroupData}
                renderItemId={(customerUnitTypeGroup) => customerUnitTypeGroup.customerunittypegroupPK}
                loading={dropdownLoading}
                renderItemField={(customerUnitTypeGroup) => customerUnitTypeGroup.description}
                handleSearchString={(string) => {
                  setCustomerUnitTypeGroupData(string);
                }}
                fetchDataBySearchString={(string) =>
                  fetchCustomerUnitTypeGroup(
                    string,
                    customerId,
                    customerPlantId,
                    customerPlantGroupId,
                    customerGroupId
                  )
                }
                onSelect={handleCustomerUnitTypeGroupLookupSelection}
                selectedId={customerUnitTypeGroupId}
                clearInputCallback={() => {
                  dispatch(setCustomerUnitTypeGroupId(null));
                }}
                disabled={viewDetail}
                className={`${customerUnitTypeGroupData && !customerUnitTypeGroupId ? "borderRed" : ""}`}
                maxHeight={"200px"}
                // towardsTop
              />
              <LookupButton disabled={viewDetail} onClick={() => setShowCustomerUnitTypeGroupLookUp(true)} />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-5 mb-0 pb-0 align-items-center row invisible m-l-0 m-r-0 `}>
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Customer Unit Type Group
              </Form.Label>
            </Col>

            <Col xs={6} md={6} className="p-0 me-2">
              <AutoCompleteDropdown fetchDataBySearchString={() => {}} />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-4 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 `}>
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Pickup Dealer
              </Form.Label>
            </Col>

            <Col xs={6} md={6} className="p-0 me-2 d-flex">
              <AutoCompleteDropdown
                arrayList={pickupDealerDataList}
                searchString={pickupDealerData}
                renderItemId={(data) => data.dealerPK}
                renderItemField={(data) => data.name}
                loading={dropdownLoading}
                handleSearchString={(string) => setPickupDealerData(string)}
                fetchDataBySearchString={fetchPickupDealers}
                onSelect={handlePickupDealerLookupSelection}
                selectedId={pickupDealerId}
                clearInputCallback={() => {
                  dispatch(setPickupDealerId(null));
                }}
                disabled={
                  !!(viewDetail || pickupDealerGroupId || deliveryDealerId || deliveryDealerGroupId || yardId)
                }
                className={`${pickupDealerId === null && pickupDealerData !== "" ? "borderRed" : ""}`}
                maxHeight={"200px"}
                towardsTop
              />
              <LookupButton
                disabled={
                  viewDetail || pickupDealerGroupId || deliveryDealerId || deliveryDealerGroupId || yardId
                }
                onClick={() => setShowPickupDealerLookup(true)}
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-4 mb-2 pb-0 align-items-center row  m-l-0 m-r-0 `}>
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Pickup Dealer Group
              </Form.Label>
            </Col>

            <Col xs={6} md={6} className="p-0 me-2 d-flex">
              <AutoCompleteDropdown
                arrayList={pickupDealerGroupDataList}
                searchString={pickupDealerGroupData}
                renderItemId={(data) => data.dealerGroupPK}
                renderItemField={(data) => data.description}
                handleSearchString={(string) => setPickupDealerGroupData(string)}
                loading={dropdownLoading}
                fetchDataBySearchString={fetchPickupDealerGroups}
                onSelect={handlePickupDealerGroupLookupSelection}
                selectedId={pickupDealerGroupId}
                clearInputCallback={() => {
                  dispatch(setPickupDealerGroupId(null));
                }}
                disabled={
                  !!(viewDetail || pickupDealerId || deliveryDealerId || deliveryDealerGroupId || yardId)
                }
                className={`${
                  pickupDealerGroupId === null && pickupDealerGroupData !== "" ? "borderRed" : ""
                }`}
                maxHeight={"200px"}
                towardsTop
              />
              <LookupButton
                disabled={viewDetail || pickupDealerId || deliveryDealerId || deliveryDealerGroupId || yardId}
                onClick={() => setShowPickupDealerGroupLookup(true)}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className={`mt-4 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 `}>
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Delivery Dealer
              </Form.Label>
            </Col>

            <Col xs={6} md={6} className="p-0 me-2 d-flex">
              <AutoCompleteDropdown
                arrayList={deliveryDealerDataList}
                searchString={deliveryDealerData}
                renderItemId={(data) => data.dealerPK}
                renderItemField={(data) => data.name}
                loading={dropdownLoading}
                handleSearchString={(string) => setDeliveryDealerData(string)}
                fetchDataBySearchString={fetchDeliveryDealers}
                onSelect={handleDeliveryDealerLookupSelection}
                selectedId={deliveryDealerId}
                clearInputCallback={() => {
                  dispatch(setDeliveryDealerId(null));
                }}
                disabled={
                  !!(viewDetail || pickupDealerId || pickupDealerGroupId || deliveryDealerGroupId || yardId)
                }
                className={`${deliveryDealerId === null && deliveryDealerData !== "" ? "borderRed" : ""}`}
                maxHeight={"200px"}
              />
              <LookupButton
                disabled={
                  viewDetail || pickupDealerId || pickupDealerGroupId || deliveryDealerGroupId || yardId
                }
                onClick={() => setShowDeliveryDealerLookup(true)}
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-4 mb-0 pb-0 align-items-center row  m-l-0 m-r-0 `}>
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Delivery Dealer Group
              </Form.Label>
            </Col>

            <Col xs={6} md={6} className="p-0 me-2 d-flex">
              <AutoCompleteDropdown
                arrayList={deliveryDealerGroupDataList}
                searchString={deliveryDealerGroupData}
                handleSearchString={(string) => setDeliveryDealerGroupData(string)}
                loading={dropdownLoading}
                fetchDataBySearchString={fetchDeliveryDealerGroups}
                renderItemId={(data) => data.dealerGroupPK}
                renderItemField={(data) => data.description}
                onSelect={handleDeliveryDealerGroupLookupSelection}
                selectedId={deliveryDealerGroupId}
                clearInputCallback={() => {
                  dispatch(setDeliveryDealerGroupId(null));
                }}
                disabled={
                  !!(viewDetail || pickupDealerId || pickupDealerGroupId || deliveryDealerId || yardId)
                }
                className={`${
                  deliveryDealerGroupId === null && deliveryDealerGroupData !== "" ? "borderRed" : ""
                }`}
                maxHeight={"200px"}
              />
              <LookupButton
                disabled={viewDetail || pickupDealerId || pickupDealerGroupId || deliveryDealerId || yardId}
                onClick={() => setShowDeliveryDealerGroupLookup(true)}
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-4 mb-0 pb-0 align-items-center invisible row  m-l-0 m-r-0 `}>
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Delivery Dealer Group
              </Form.Label>
            </Col>

            <Col xs={6} md={6} className="p-0 me-2 d-flex">
              <AutoCompleteDropdown fetchDataBySearchString={() => {}} />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-4 mb-0 pb-0 align-items-center  row  m-l-0 m-r-0 `}>
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Unit Type
              </Form.Label>
            </Col>

            <Col xs={6} md={6} className="p-0 me-2 d-flex">
              <AutoCompleteDropdown
                arrayList={unitTypeDataList}
                searchString={unitTypeData}
                loading={dropdownLoading}
                renderItemId={(unitType) => unitType.unitTypePK}
                renderItemField={(unitType) => unitType.descriptionLong?.trim()}
                handleSearchString={(string) => {
                  setUnitTypeData(string);
                }}
                fetchDataBySearchString={(string) => fetchUnitTypes(string, customerUnitTypeGroupId)}
                onSelect={handleUnitTypeLookupSelection}
                selectedId={unitTypeId}
                clearInputCallback={() => {
                  dispatch(setUnitTypeId(null));
                }}
                disabled={!!(viewDetail || unitTypeGroupId)}
                className={`${unitTypeId === null && unitTypeData !== "" ? "borderRed" : ""}`}
                maxHeight={"200px"}
              />
              <LookupButton
                disabled={viewDetail || unitTypeGroupId}
                onClick={() => setShowUnitTypeLookup(true)}
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-4 mb-0 pb-0 align-items-center  row  m-l-0 m-r-0 `}>
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Unit Type Group
              </Form.Label>
            </Col>

            <Col xs={6} md={6} className="p-0 me-2 d-flex">
              <AutoCompleteDropdown
                arrayList={unitTypeGroupDataList}
                searchString={unitTypeGroupData}
                renderItemId={(unitTypeGroup) => unitTypeGroup.unitTypeGroupPK}
                renderItemField={(unitTypeGroup) => unitTypeGroup.description}
                handleSearchString={(string) => setUnitTypeGroupData(string)}
                fetchDataBySearchString={(string) => fetchUnitTypeGroups(string, customerUnitTypeGroupId)}
                loading={dropdownLoading}
                onSelect={handleUnitTypeGroupLookupSelection}
                selectedId={unitTypeGroupId}
                clearInputCallback={() => {
                  dispatch(setUnitTypeGroupId(null));
                }}
                disabled={!!(viewDetail || unitTypeId)}
                className={`${unitTypeGroupId === null && unitTypeGroupData !== "" ? "borderRed" : ""}`}
                maxHeight={"200px"}
              />
              <LookupButton
                disabled={viewDetail || unitTypeId}
                onClick={() => setShowUnitTypeGroupLookup(true)}
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-5 mb-0 pb-0 align-items-center invisible row  m-l-0 m-r-0 `}>
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Unit Type Group
              </Form.Label>
            </Col>

            <Col xs={6} md={6} className="p-0 me-2 d-flex">
              <AutoCompleteDropdown fetchDataBySearchString={() => {}} />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-4 mb-0 pb-0 align-items-center  row  m-l-0 m-r-0 `}>
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Yard
              </Form.Label>
            </Col>

            <Col xs={6} md={6} className="p-0 me-2 d-flex">
              <AutoCompleteDropdown
                arrayList={yardDataList}
                searchString={yardData}
                renderItemId={(yard) => yard.yardPK}
                renderItemField={(yard) => yard.description}
                handleSearchString={(string) => setYardData(string)}
                loading={dropdownLoading}
                fetchDataBySearchString={fetchYard}
                onSelect={handleYardLookupSelection}
                selectedId={yardId}
                clearInputCallback={() => {
                  dispatch(setYardId(null));
                }}
                disabled={
                  !!(
                    viewDetail ||
                    pickupDealerId ||
                    pickupDealerGroupId ||
                    deliveryDealerId ||
                    deliveryDealerGroupId
                  )
                }
                className={`${yardId === null && yardData !== "" ? "borderRed" : ""}`}
                maxHeight={"200px"}
                towardsTop
              />
              <LookupButton
                disabled={
                  viewDetail ||
                  pickupDealerId ||
                  pickupDealerGroupId ||
                  deliveryDealerId ||
                  deliveryDealerGroupId
                }
                onClick={() => setShowYardLookup(true)}
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-4 mb-3 pb-0 align-items-center  row  m-l-0 m-r-0 `}>
            <Col xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Special Code
              </Form.Label>
            </Col>

            <Col xs={6} md={6} className="p-0 me-2 d-flex">
              <AutoCompleteDropdown
                arrayList={specialCodeDataList}
                searchString={specialCodeData}
                renderItemId={(data) => data.specialCodePK}
                renderItemField={(data) => data.description}
                loading={dropdownLoading}
                handleSearchString={(string) => setSpecialCodeData(string)}
                fetchDataBySearchString={fetchSpecialCode}
                onSelect={handleSpecialCodeLookupSelection}
                selectedId={specialCodeId}
                clearInputCallback={() => {
                  dispatch(setSpecialCodeId(null));
                }}
                disabled={viewDetail}
                className={`${specialCodeId === null && specialCodeData !== "" ? "borderRed" : ""}`}
                maxHeight={"200px"}
                towardsTop
              />
              <LookupButton disabled={viewDetail} onClick={() => setShowSpecialCodeLookup(true)} />
            </Col>
          </Form.Group>
        </Col>
      </div>
      <CustomerLookup
        show={showCustomerLookup}
        onHide={() => setShowCustomerLookup(false)}
        renderItemId={(customer) => customer.customerPK}
        renderItemField={(customer) => customer.name}
        handleLookupSelection={handleCustomerLookupSelection}
        MaintenanceProgram
      />

      <CustomerPlantsLookup
        show={showCustomerPlantLookup}
        onHide={() => setShowCustomerPlantLookup(false)}
        renderItemId={(plant) => plant.customerPlantPK}
        renderItemField={(data) => data.name}
        handleLookupSelection={handleCustomerPlantLookupSelection}
        MaintenanceProgram
      />

      <CustomerPlantGroupsLookup
        show={showCustomerPlantGroupLookup}
        onHide={() => setShowCustomerPlantGroupLookup(false)}
        renderItemId={(customerPlantGroup) => customerPlantGroup.customerPlantGroupPK}
        handleLookupSelection={handleCustomerPlantGroupLookupSelection}
        MaintenanceProgram
      />

      <CustomerGroupsLookup
        show={showCustomerGroupLookup}
        onHide={() => setShowCustomerGroupLookup(false)}
        renderItemId={(customerGroup) => customerGroup.customerGroupPK}
        handleLookupSelection={handleCustomerGroupLookupSelection}
        MaintenanceProgram
      />

      <CustomerUnitTypeGroupLookup
        show={showCustomerUnitTypeGroupLookup}
        onHide={() => setShowCustomerUnitTypeGroupLookUp(false)}
        renderItemId={(customerUnitTypeGroup) => customerUnitTypeGroup.customerunittypegroupPK}
        renderItemField={(data) => data.description}
        handleLookupSelection={handleCustomerUnitTypeGroupLookupSelection}
        MaintenanceProgram
        customerId={customerId}
        customerPlantId={customerPlantId}
        customerPlantGroupId={customerPlantGroupId}
        customerGroupId={customerGroupId}
      />

      <UnitTypeLookup
        show={showUnitTypeLookup}
        onHide={() => setShowUnitTypeLookup(false)}
        renderItemId={(unitType) => unitType.unitTypePK}
        renderItemField={(data) => data.descriptionLong}
        //  MaintenanceProgram
        FormsMaintenance
        handleLookupSelection={handleUnitTypeLookupSelection}
        customerUnitTypeGroupId={customerUnitTypeGroupId}
      />

      <UnitTypeGroupLookup
        show={showUnitTypeGroupLookup}
        onHide={() => setShowUnitTypeGroupLookup(false)}
        renderItemId={(unitTypeGroup) => unitTypeGroup.unitTypeGroupPK}
        renderItemField={(data) => data.description}
        handleLookupSelection={handleUnitTypeGroupLookupSelection}
        unitTypeGroupPKS={customerUnitTypeGroupId ? [customerUnitTypeGroupId] : null}
        MaintenanceProgram
      />

      <DealerLookup
        show={showPickupDealerLookup}
        onHide={() => setShowPickupDealerLookup(false)}
        renderItemId={(data) => data.dealerPK}
        renderItemField={(data) => data.name}
        handleLookupSelection={handlePickupDealerLookupSelection}
        MaintenanceProgram
      />

      <DealerLookup
        show={showDeliveryDealerLookup}
        onHide={() => setShowDeliveryDealerLookup(false)}
        renderItemId={(data) => data.dealerPK}
        renderItemField={(data) => data.name}
        handleLookupSelection={handleDeliveryDealerLookupSelection}
        MaintenanceProgram
      />

      <DealerGroupsLookup
        show={showPickupDealerGroupLookup}
        onHide={() => setShowPickupDealerGroupLookup(false)}
        renderItemId={(data) => data.dealerGroupPK}
        renderItemField={(data) => data.description}
        handleLookupSelection={handlePickupDealerGroupLookupSelection}
        MaintenanceProgram
      />

      <DealerGroupsLookup
        show={showDeliveryDealerGroupLookup}
        onHide={() => setShowDeliveryDealerGroupLookup(false)}
        renderItemId={(data) => data.dealerGroupPK}
        renderItemField={(data) => data.description}
        handleLookupSelection={handleDeliveryDealerGroupLookupSelection}
        MaintenanceProgram
      />

      <YardLookup
        show={showYardLookup}
        onHide={() => setShowYardLookup(false)}
        renderItemId={(data) => data.yardPK}
        renderItemField={(data) => data.name}
        handleLookupSelection={handleYardLookupSelection}
        MaintenanceProgram
      />

      <SpecialCodeLookup
        show={showSpecialCodeLookup}
        onHide={() => setShowSpecialCodeLookup(false)}
        renderItemId={(data) => data.specialCodePK}
        renderItemField={(data) => data.description}
        handleLookupSelection={handleSpecialCodeLookupSelection}
        MaintenanceProgram
      />
    </div>
    // </>
  );
}

export default Detail;
