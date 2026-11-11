import { formatForApi, parseLocalDate } from "../../../../../utils/dateUtils";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Col, Form, Row, Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import OrderEntryService from "../../../../../services/OrderEntryService";
import DealerService from "../../../../../services/DealerService";
import { Formik } from "formik";
import * as yup from "yup";
import numberValidation from "../../../../../utils/validation/NumberValidation";
import CustomerBulkInvoice from "../../../../../services/CustomerBulkInvoice";
import { t } from "i18next";
import { toast } from "react-hot-toast";
import PcMilerService from "../../../../../services/PcMilerService";
import DynamicTextFields from "../../../../common/AutoWrapTextFields/DynamicTextFields";

import {
  setUnitNumber,
  setModel,
  setModelCode,
  setVin,
  setSerialNumber,
  setStockNumber,
  setUnitTypesFK,
  setUnitTypeData,
  setEngineGas,
  setEngineDiesel,
  setSpecialCodesFK,
  setPickupDealersFK,
  setMiscPickup,
  setDeliveryDealersFK,
  setMiscellaneousDelivery,
  setCollectForCustomer,
  setPoNumberRedux,
  setAuthorizedByUnit,
  setProjectCodeUnit,
  setBankUnit,
  setClientUnit,
  setGVWRUnit,
  setShippingWeightUnit,
  setDriverTollsUnit,
  setDriverPermitsUnit,
  setDriverWashUnit,
  setPortEscortFeeUnit,
  setInvoiceMiles,
  setDriverMiles,
  setDriverMilesBalance,
  setInvoiceFlatrate,
  setDriverFlatrate,
  setInvoiceFlatrate2,
  setDriverFlatrate2,
  setCommissionUnit,
  setCommissionDriverFK,
  setFreezePortOFEntryUnit,
  setRequiredCDLAUnit,
  setTankerUnit,
  setRequiredTWICUnit,
  setRequiredIFTAUnit,
  setHasDriveBys,
  setDPUUnit,
  setStorageUnit,
  setOnHold,
  setDoNotInvoiceUnit,
  setDoNotDispatchUnit,
  setActivateDispatchUnit,
  setInvoice2as3Unit,
  setRequireFlatbedUnit,
  setContactDealerDelayUnit,
  setInvoiceDealerBreakdownUnit,
  setMiscellaneousBolTextUnit,
  setMiscellaneousBolTextUnit1,
  setMiscellaneousBolTextUnit2,
  setMiscellaneousBolTextUnit3,
  setMiscellaneousBolTextUnit4,
  setMiscellaneousBolTextUnit5,
  setMiscellaneousBolTextUnit6,
  setMiscellaneousBolTextUnit7,
  setOrderDateUnit,
  setReleaseDateUnit,
  setDeliveryByDateUnit,
  setEarliestPickUpDateUnit,
  setEarliestDeliveryDateUnit,
  setLatestPickUpDateUnit,
  setLatestDeliveryDateUnit,
  setUnitMultiLoads,
  setUnitTypeSelection,
  setSpecialCodeSelection,
  setPickupDealerSelection1,
  setPickupDealerSelection2,
  setDeliveryDealerSelection1,
  setDeliveryDealerSelection2,
  setBrokerSelection,
  setPortOfEntrySelection,
  setUnitMultiLoadSelection,
  setOverWidthLoad,
  setUnitTabIsValid,
  setPickupDealerInput,
  setSpecialCodeInput,
  setPickupDealerId,
  setDeliveryDealerInput,
  setSelectedSpecialCode,
  setSelectedPickupDealer,
  setSelectedDeliveryDealer,
  setUnitTypeInput,
  setActiveKey,
  setBrokerInput,
  setbrokerId,
  setBrokerId,
  setHasRates,
  setCustomerRatesList,
  setSelectedBroker,
  setBrokerType,
  setSpecialCodeId,
  setPortOfEntryInput,
  setPortOfEntryId,
  setSelectedPortOfEntry,
  setDealerConnectionFlatrateFK,
  setRateType,
  setCustomerPickupYardData,
  setMultiUnilLoad,
  setReleaseProcessFlag,
  setPlantRelease,
  setPlantReleaseDate,
  setIsInvoiceFlatrateVisible,
  setIsDriverFlatrateVisible,
  setSelectedBillingPlantId,
  setSelectedBillingPlantDetails,
  setCustomerRateStructureRedux,
  setIsInvoiceMileageRateRedux,
  setIsDriverMileageRateRedux,
  setFlatRateErrorMsg,
  setInvoiceAmount,
  setInvoiceAmountBackend,
  setInvoiceFuelSurchargeAmount,
  setDriverAmount,
  setDriverFuelSurchargeAmount,
  setIsDefaultDriverMilesRedux,
  setIsDefaultInvoiceMilesRedux,
  setMileagedErrorMsg,
  setReduxDriverFlatRate,
  setCanadianPickup,
  setCanadianDelivery,
  setAllowedInvoicePercentageRedux,
  setUnitsPerDispatchUnit,
  setInvoiceSupplementalRate,
  setInvoiceSupplementalFuelSurchargeRate,
  setInvoiceSupplementalDescription,
  setDriverSupplementalRate,
  setDriverSupplementalFuelSurchargeRate,
  setDriverSupplementalDescription,
  setInvoiceSpecialRate,
  setInvoiceSpecialFuelSurchargeRate,
  setInvoiceSpecialDescription,
  setDriverSpecialRate,
  setDriverSpecialFuelSurchargeRate,
  setDriverSpecialDescription,
  setInvoiceAdditionalRate,
  setInvoiceAdditionalFuelSurchargeRate,
  setInvoiceAdditionalDescription,
  setInvoiceAdditionalFlatRate,
  setAdditionalFlatRateDescription,
  setDriverAdditionalFlatRate,
  setDriverAdditionalRate,
  setDriverAdditionalFuelSurchargeRate,
  setDriverAdditionalDescription,
  setInvoiceCanadianCharge,
  setDriverCanadianCharge,
  setInvoiceUSCharge,
  setDriverUSCharge,
  setInvoiceCDLARate,
  setDriverCDLARate,
  setInvoiceCDLAReturn,
  setDriverCDLAReturn,
  setInvoiceReturnFlatRate,
  setDriverReturnFlatRate,
  setInvoiceRate,
  setDriverRate,
  setInvoiceFuelSurchargeRate,
  setDriverFuelSurchargeRate,
  setInvoiceReturnRate,
  setDriverReturnRate,
  setInvoiceLengthRate,
  setDriverLengthRate,
  setInvoiceCanadianRate,
  setInvoiceCanadianFuelSurchargeRate,
  setInvoiceCanadianDescription,
  setDriverCanadianRate,
  setDriverCanadianFuelSurchargeRate,
  setDriverCanadianDescription,
  setDefaultInvoiceMiles,
  setDefaultDriverMiles,
  setELDRequiredRedux,
  setInvoiceELDFeeRedux,
  setDriverELDFeeRedux,
  setInvoiceELDDescription,
  setDPUPickupOwnerRedux,
  setDriverCDLARequiredRedux,
  setIsFODInvoice,
  setPlantOrderNumber,
  setIsMilesLowBoyRedux,
  setPcMilerError,
  setTowableRedux,
  setInvoiceCustomerRateFK,
  setDriverCustomerRateFK,
  setPreInvoiced,
  setPayTolls,
  setFODTolls,
  setBillTolls,
  setPayPermits,
  setFODPermits,
  setBillPermits,
  setPayWash,
  setBillWash,
  setInvoiceSupplementalReturn,
  setInvoiceSpecialReturn,
  setInvoiceAdditionalReturn,
  setDriverSupplementalReturn,
  setDriverSpecialReturn,
  setDriverAdditionalReturn,
  setInvoiceLengthReturn,
  setDriverLengthReturn,
  setShowOverrideButton,
  setInvoiceMinimumRate,
  setDriverMinimumRate,
  setUnitOverride,
  setShowUnitOverride,
  setFodDealer,
  setSaveTollsAndPermits,
  setEmailBOLAtOrderEntry,
  setBatchEmailBOLAtOrderEntry,
  setBatchEmailBOLDaily,
  setEmailPlantBOLAtOrderEntry,
  setEmailPlantBOLAtOrderEntryDPU,
  setBatchEmailPlantBOLAtOrderEntry,
  setBatchEmailPlantBOLDaily,
  setDataReset,
  setMiscPickupID as setMiscellaneousPickupID,
  setMiscDeliveryID as setMiscellaneousDeliveryID,
  setCompanyName,
} from "../../../../../redux/OrderEntryFilterSlice";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import ModalComponent from "../../../../common/ModalComponent";
import {
  resetUnitTypeSearchSettings,
  setUnitTypePageNumber,
} from "../../../../../redux/LookupScreens/UnitTypeLookupSlice";
import UnitTypeLookup from "../../../../LookupScreens/UnitType/UnitTypeLookup";
import SpecialCodeLookup from "../../../../LookupScreens/SpecialCode/SpecialCodeLookup";
import DealerLookup from "../../../../LookupScreens/Dealer/DealerLookup";
import BrokerLookup from "../../../../LookupScreens/Broker/BrokerLookup";
import PortOfEntryLookup from "../../../../LookupScreens/PortOfEntry/PortOfEntryLookup";
import UnitMultiLoadLookup from "../../../../LookupScreens/UnitMultiLoad/UnitMultiLoadLookup";
import LookupButton from "../../../../common/LookupButton";
import DateInputField from "../../../../common/DateInputField";
import MultiUnitModal from "./modal/MultiUnitLoadModal";
import { set } from "lodash";
import Tooltip from "../../../../common/Tooltip";
import { invalid } from "moment";
import LoadingIcon from "../../../../common/LoadingIcon";
import { correctDecimalInputOnBlur } from "../../../../../utils/utils";
import useDebouncer from "../../../../../hooks/useDebouncer";

const programName = "OrderEntry";
const tabName = "Unit";
const TooltipWrapper = ({ fieldName }) => (
  <Tooltip programName={programName} tabName={tabName} fieldName={fieldName} />
);

function Unit({ styles }) {
  /* UNIT TAB LOCAL STATES*/
  const dispatch = useDispatch();
  const [unitTypeLoading, setUnitTypeLoading] = useState(false);
  const [brokerLoading, setBrokerLoading] = useState(false);
  const [portOfEntryLoading, setPortOfEntryLoading] = useState(false);
  const [unitTypesList, setUnitTypesList] = useState([]);
  const [specialCodeList, setSpecialCodeList] = useState([]);
  const [brokerList, setBrokerList] = useState([]);
  const [portOfEntryList, setPortOfEntryList] = useState([]);
  const [pickupDealerList, setPickupDealerList] = useState([]);
  const [deliveryDealersList, setDeliveryDealersList] = useState([]);
  const [customerDealerList, setCustomerDealerList] = useState(null);
  const [listingDealerData, setListingDealerData] = useState([]);
  const [towable, setTowable] = useState(false);
  const [isUnitPopUp, setIsUnitPopUp] = useState(false);
  const [isUnitTruckCamper, setIsUnitTruckCamper] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isCustUsePlants, setIsCustUsePlants] = useState(false);
  const [isOutBoundUsePlants, setisOutBoundUsePlants] = useState(false);
  const [checkUnitNumber, setCheckUnitNumber] = useState("");
  const [radioValue, setRadioValue] = useState("enginena");
  const [showMultiUnitLoadDiv, setShowMultiUnitLoadDiv] = useState(false);
  const [towableTrueAllowMultiLoadFalse, settowableTrueAllowMultiLoadFalse] = useState(false);
  const [requiredCDLAHidden, setRequiredCDLAHidden] = useState(true);
  const [selectedUnitMultiLoadObj, setSelectedUnitMultiLoadObj] = useState(null);
  const [unitNum, setUnitNum] = useState("");
  const [model, setUnitModel] = useState("");
  const [modelCode, setUnitModelCode] = useState("");
  const [unitVin, setUnitVin] = useState("");
  const [serialNumber, setUnitSerialNumber] = useState("");
  const [stockNumber, setUnitStockNumber] = useState("");
  const [unitTypeFK, setUnitTypeFK] = useState("");
  const [isEngineNAVisible, setIsEngineNAVisible] = useState(true);
  const [specialCodeFK, setSpecialCodeFK] = useState(null);
  const [pickupDealerFK, setPickupDealerFK] = useState(null);
  const [pickupDealerLoading, setPickupDealerLoading] = useState(false);
  const [miscellaneousPickup, setMiscellaneousPickup] = useState(false);
  const [deliveryDealerFK, setDeliveryDealerFK] = useState(null);
  const [deliveryDealerLoading, setDeliveryDealerLoading] = useState(false);
  const [miscDelivery, setMiscDelivery] = useState(false);
  const [collectForCustomers, setCollectForCustomers] = useState("");
  const [poNumber, setPoNumber] = useState(null);
  const [authorizedBy, setAuthorizedBy] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [bank, setBank] = useState(null);
  const [client, setClient] = useState(null);
  const [GVWR, setGVWR] = useState("");
  const [shippingWeight, setShippingWeight] = useState("");
  const [driverTolls, setDriverTolls] = useState(null);
  const [driverPermits, setDriverPermits] = useState(null);
  const [isDisableddriverTolls, setIsDisabledDriverTolls] = useState(false);
  const [isDisableddriverPermits, setIsDisabledDriverPermits] = useState(false);
  const [portEscortFee, setPortEscortFee] = useState("");
  const [invoiceMile, setInvoiceMile] = useState(0);
  const [driverMile, setDriverMile] = useState(0);
  const [isDefaultInvoiceMiles, setIsDefaultInvoiceMiles] = useState(false);
  const [isDefaultDriverMiles, setIsDefaultDriverMiles] = useState(false);
  const [isMilesLowBoy, setIsMilesLowBoy] = useState(false);
  const [invoiceFlatrates, setInvoiceFlatrates] = useState(0);
  const [driverFlatrates, setDriverFlatrates] = useState(0);
  const [customerInvoiceFlatrates, setCustomerInvoiceFlatrates] = useState(0);
  const [customerDriverFlatrates, setCustomerDriverFlatrates] = useState(0);
  const [isDefaultInvoiceFlatrates, setIsDefaultInvoiceFlatrates] = useState(false);
  const [isDefaultDriverFlatrates, setIsDefaultDriverFlatrates] = useState(false);
  const [commission, setCommission] = useState(null);
  const [brokerFK, setBrokerFK] = useState(null);
  const [freezeBroker, setFreezeBroker] = useState(false);
  const [portOfEntryFK, setPortOfEntryFK] = useState(null);
  const [freezePortOFEntry, setFreezePortOFEntry] = useState(false);
  const [freezePOE, setFreezePOE] = useState(false);
  const [requiredCDLA, setRequiredCDLA] = useState(false);
  const [tanker, setTanker] = useState(false);
  const [requiredTWIC, setRequiredTWIC] = useState(false);
  const [requiredIFTA, setRequiredIFTA] = useState(false);
  const [hasDriveBy, setHasDriveBy] = useState(false);
  const [DPU, setDPU] = useState(false);
  const [storage, setStorage] = useState(false);
  const [onHold, setOnHoldUnit] = useState(false);
  const [doNotInvoice, setdoNotInvoice] = useState(false);
  const [doNotDispatch, setdoNotDispatch] = useState(false);
  const [activateDispatch, setActivateDispatch] = useState(false);
  const [factoryRelease, setFactoryRelease] = useState(false);
  const [unitsPerDispatch, setUnitsPerDispatch] = useState(2);
  const [multiUnit, setMultiUnit] = useState(false);
  const [isMultiUnitDefault, setIsMultiUnitDefault] = useState(false);
  const [unitMultiLoadList, setUnitMultiLoadList] = useState([]);
  const [filteredUnitMultiLoadList, setFilteredUnitMultiLoadList] = useState([]);
  const [multiUnitLoadInput, setMultiUnitLoadInput] = useState("");
  const [unitMultiLoadPK, setUnitMultiLoadPK] = useState("");
  const [invoice2as3, setInvoice2as3] = useState(false);
  const [requireFlatbed, setRequireFlatbed] = useState(false);
  const [contactDealerDelay, setcontactDealerDelay] = useState(false);
  const [invoiceDealerBreakdown, setInvoiceDealerBreakdown] = useState(false);
  const [miscellaneousBolText, setMiscellaneousBolText] = useState("");
  const [miscellaneousBolText1, setMiscellaneousBolText1] = useState(null);
  const [miscellaneousBolText2, setMiscellaneousBolText2] = useState(null);
  const [miscellaneousBolText3, setMiscellaneousBolText3] = useState(null);
  const [miscellaneousBolText4, setMiscellaneousBolText4] = useState(null);
  const [miscellaneousBolText5, setMiscellaneousBolText5] = useState(null);
  const [miscellaneousBolText6, setMiscellaneousBolText6] = useState(null);
  const [miscellaneousBolText7, setMiscellaneousBolText7] = useState(null);
  const [orderDate, setOrderDate] = useState("");
  const [isOrderDateValid, setIsOrderDateValid] = useState(true);
  const [releaseDate, setReleaseDate] = useState("");
  const [isReleaseDateValid, setIsReleaseDateValid] = useState(true);
  const [deliveryByDate, setDeliveryByDate] = useState("");
  const [isDeliveryDateValid, setIsDeliveryDateValid] = useState(true);
  const [earliestPickUpDate, setEarliestPickUpDate] = useState("");
  const [isEarliestPickupDateValid, setIsEarliestPickupDateValid] = useState(true);
  const [latestPickUpDate, setLatestPickUpDate] = useState("");
  const [isLatestPickupDateValid, setIsLatestPickupDateValid] = useState(true);
  const [earliestDeliveryDate, setEarliestDeliveryDate] = useState("");
  const [isEarliestDeliveryDateValid, setIsEarliestDeliveryDateValid] = useState(true);
  const [latestDeliveryDate, setLatestDeliveryDate] = useState("");
  const [isLatestDeliveryDateValid, setIsLatestDeliveryDateValid] = useState(true);
  const [warningPopUP, setWarningPopUP] = useState(false);
  const [pickupDealerCSZ, setPickupDealerCSZ] = useState("");
  const [pickupDealerAdd1, setPickupDealerAdd1] = useState("");
  const [pickupDealerAdd2, setPickupDealerAdd2] = useState("");
  const [pickupDealerCity, setPickupDealerCity] = useState("");
  const [pickupDealerState, setPickupDealerState] = useState("");
  const [pickupDealerZip, setPickupDealerZip] = useState("");
  const [deliveryDealerCSZ, setDeliveryDealerCSZ] = useState("");
  const [deliveryDealerAdd1, setDeliveryDealerAdd1] = useState("");
  const [deliveryDealerAdd2, setDeliveryDealerAdd2] = useState("");
  const [deliveryDealerCity, setDeliveryDealerCity] = useState("");
  const [deliveryDealerState, setDeliveryDealerState] = useState("");
  const [deliveryDealerZip, setDeliveryDealerZip] = useState("");
  const [customerCanadianCheck, setCustomerCanadianCheck] = useState(false);
  const [customerRequirePO, setCustomerRequirePO] = useState(false);
  const [customerRequireBankClient, setCustomerRequireBankClient] = useState(false);
  const [customerAskTolls, setCustomerAskTolls] = useState(false);
  const [customerAskPermits, setCustomerAskPermits] = useState(false);
  const [customerAskWash, setCustomerAskWash] = useState(false);
  const [isCustomerRequireModel, setIsCustomerRequireModel] = useState(false);
  const [isCustomerRequireModelCode, setIsCustomerRequireModelCode] = useState(false);
  const [isCustomerRequireVIN, setIsCustomerRequireVIN] = useState(false);
  const [isCustomerRequireSerialNum, setIsCustomerRequireSerialNum] = useState(false);
  const [isCustomerRequireStockNum, setIsCustomerRequireStockNum] = useState(false);
  const [isallDealersFOD, setIsallDealersFOD] = useState(false);
  const [isCustomerRequireFactoryRelease, setIsCustomerRequireFactoryRelease] = useState(false);
  const [poNumberFromBulkInvoice, setPoNumberFromBulkInvoice] = useState("");
  const [projectCodeFromBulkInvoice, setProjectCodeFromBulkInvoice] = useState("");
  const [dealerTWIC, setDealerTWIC] = useState(false);
  const [allowMiscDealer, setAllowMiscDealer] = useState(false);
  const [isMotorized, setIsMotorized] = useState(false);
  const [pickupDealersearchType, setPickupDealersearchType] = useState("searchByStateCity");
  const [deliveryDealersearchType, setDeliveryDealersearchType] = useState("searchByStateCity");
  const [defaultSpecialCode, setDefaultSpecialCode] = useState("");
  const [isDPUCustomer, setIsDPUCustomer] = useState(false);
  const [isCommissionRequired, setIsCommissionRequired] = useState(false);
  const [customerRateStructure, setCustomerRateStructure] = useState("");
  const [invoiceRateStructure, setInvoiceRateStructure] = useState("");
  const [driverRateStructure, setDriverRateStructure] = useState("");
  const [supplementalRateStructure, setSupplementalRateStructure] = useState("");
  const [specialRateStructure, setSpecialRateStructure] = useState("");
  const [additionalRateStructure, setAdditionalRateStructure] = useState("");

  const [errorFlag, setErrorFlag] = useState(false);
  const [showOverrideErrorMessage, setShowOverrideErrorMessage] = useState("");
  const [isInvoiceMileageRate, setIsInvoiceMileageRate] = useState(false);
  const [isDriverMileageRate, setIsDriverMileageRate] = useState(false);
  const [cdlCutoffs, setCdlCutoffs] = useState(false);
  const [isContactorInvoiceVisible, setIsContactorInvoiceVisible] = useState(false);
  const [isCommissionVisible, setIsCommissionVisible] = useState(false);
  const [invoiceCDLASurcharge, setInvoiceCDLASurcharge] = useState(0);
  const [driverCDLASurcharge, setDriverCDLASurcharge] = useState(0);
  const [invoiceUSCNSurcharge, setInvoiceUSCNSurcharge] = useState(0);
  const [driverUSCNSurcharge, setDriverUSCNSurcharge] = useState(0);
  const [unitTypeLength, setUnitTypeLength] = useState(0);
  const [allowedInvoicePercentage, setAllowedInvoicePercentage] = useState(0);
  const [unitPercentage, setUnitPercentage] = useState(0);
  const [DPUPickupOwner, setDPUPickupOwner] = useState("");
  const [isELDFeeVisible, setIsELDFeeVisible] = useState(false);
  const [isDefaultInvoiceELD, setIsDefaultInvoiceELD] = useState(false);
  const [isDefaultDriverELD, setIsDefaultDriverELD] = useState(false);
  const [invoiceELD, setInvoiceELD] = useState(0);
  const [driverELD, setDriverELD] = useState(0);
  const [showPCMilerModal, setShowPCMilerModal] = useState(false);
  const [showPCMilerErrorModal, setShowPCMilerErrorModal] = useState(false);
  const [DPUPickup, setDPUPickup] = useState(false);
  const [promptDPUOwner, setPromptDPUOwner] = useState(false);
  const [invoiceFuelSurcharge, setInvoiceFuelSurcharge] = useState(0);
  const [driverFuelSurcharge, setDriverFuelSurcharge] = useState(0);
  const [maximumLengthFlatbed, setMaximumLengthFlatbed] = useState(0);
  const [maximumLengthHaulAndTow, setMaximumLengthHaulAndTow] = useState(0);
  //Flat rates modal
  const [showFlatRateModal, setShowFlatRateModal] = useState(false);
  const [showOverrideErrorModal, setShowOverrideErrorModal] = useState(false);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [showOverrideAppliedModal, setShowOverrideAppliedModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userCode, setUserCode] = useState("");

  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidDateError, setInvalidDateError] = useState("");
  const [invalidDateLabel, setInvalidDateLabel] = useState("");
  const [isLatestPickupDateDefault, setIsLatestPickupDateDefault] = useState(false);
  const [isLatestDeliveryDateDefault, setIsLatestDeliveryDateDefault] = useState(false);
  const [latestPickUpDateDefault, setLatestPickUpDateDefault] = useState("");
  const [latestDeliveryDateDefault, setLatestDeliveryDateDefault] = useState("");
  const [isDriverTollsVisible, setIsDriverTollsVisible] = useState(false);
  const [isDriverPermitsVisible, setIsDriverPermitsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  //Miscellaneous BOL Text Fields
  const [inputValues, setInputValues] = useState(["", "", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const decimal9Validation = /^\d{0,9}(?:\.\d{0,2})?$/;
  const numberGreaterThan0Validation = /^[1-9][0-9]*$/;

  const currentCompany = localStorage.getItem("currentCompany")
    ? JSON.parse(localStorage.getItem("currentCompany"))
    : null;

  /* YUP VALIDATION SCHEMA */

  const validationSchema = yup.object({
    unitNumber: yup.string().required().min(5),
    collectForCustomers: yup.string().required().matches(decimal9Validation),
  });

  /* UNIT TAB REDUX STATES */

  //Unit Tab fields validation based on selected customer

  //Get All details of selected customer by ID
  const selectedCustomerAllData = useSelector((state) => state.orderEntryReducer.customerData);
  const selectedCustomerPlantData = useSelector(
    (state) => state.orderEntryReducer.selectedCustomerPlantDetails
  );
  const { pageNumber, totalPages, totalElements } = useSelector((state) => state.paginationReducer);
  const searchedDealer = useSelector((state) => state.dealerSearchReducer.searchedDealer);
  const specialCodeId = useSelector((state) => state.specialCodeLookup.specialCodeId);
  const searchTerms = useSelector((state) => state.unitTypeLookup.searchTerms);
  const selectedSearchCriteria = useSelector((state) => state.unitTypeLookup.selectedSearchCriteria);
  const unitTypeSearchCriteria = useSelector((state) => state.unitTypeLookup.unitTypeSearchCriteria);
  const pickupDealerSelection1 = useSelector((state) => state.orderEntryReducer.pickupDealerSelection1);
  const deliveryDealerSelection1 = useSelector((state) => state.orderEntryReducer.deliveryDealerSelection1);
  const selectedPickupDealer = useSelector((state) => state.orderEntryReducer.selectedPickupDealer);
  const selectedDeliveryDealer = useSelector((state) => state.orderEntryReducer.selectedDeliveryDealer);
  const brokerSelection = useSelector((state) => state.orderEntryReducer.brokerSelection);
  const unitMultiLoadSelection = useSelector((state) => state.orderEntryReducer.unitMultiLoadSelection);
  const portOfEntrySelection = useSelector((state) => state.orderEntryReducer.portOfEntrySelection);
  const specialCodeInput = useSelector((state) => state.orderEntryReducer.specialCodeInput);
  const brokerInput = useSelector((state) => state.orderEntryReducer.brokerInput);
  const brokerId = useSelector((state) => state.orderEntryReducer.brokerId);
  const portOfEntryInput = useSelector((state) => state.orderEntryReducer.portOfEntryInput);
  const portOfEntryId = useSelector((state) => state.orderEntryReducer.portOfEntryId);
  const pickupDealerInput = useSelector((state) => state.orderEntryReducer.pickupDealerInput);
  const specialCodeSelection = useSelector((state) => state.orderEntryReducer.specialCodeSelection);
  const unitTypeSelection = useSelector((state) => state.orderEntryReducer.unitTypeSelection);
  const selectedCustomerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);
  const invoiceMiles = useSelector((state) => state.orderEntryReducer.invoiceMiles);
  const driverMiles = useSelector((state) => state.orderEntryReducer.driverMiles);
  const invoiceFlatrate = useSelector((state) => state.orderEntryReducer.invoiceFlatrate);
  const driverFlatrate = useSelector((state) => state.orderEntryReducer.driverFlatrate);
  const invoiceFlatrate2 = useSelector((state) => state.orderEntryReducer.invoiceFlatrate2);
  const driverFlatrate2 = useSelector((state) => state.orderEntryReducer.driverFlatrate2);
  const selectedCustomerBillingPlantId = useSelector(
    (state) => state.orderEntryReducer.selectedCustomerBillingPlantId
  );
  const pickupDealersFK = useSelector((state) => state.orderEntryReducer.pickupDealersFK);
  const deliveryDealersFK = useSelector((state) => state.orderEntryReducer.deliveryDealersFK);
  const unitTypesFK = useSelector((state) => state.orderEntryReducer.unitTypesFK);
  const unitTypeInput = useSelector((state) => state.orderEntryReducer.unitTypeInput);
  const customerRatesList = useSelector((state) => state.orderEntryReducer.customerRatesList);
  const pickupAtPlant = useSelector((state) => state.orderEntryReducer.pickupAtPlant);
  const deliverToPlant = useSelector((state) => state.orderEntryReducer.deliverToPlant);
  const pickupCustomerPlantId = useSelector((state) => state.orderEntryReducer.pickupCustomerPlantId);
  const deliveryCustomerPlantId = useSelector((state) => state.orderEntryReducer.deliveryCustomerPlantId);
  const miscPickupDealerData = useSelector((state) => state.orderEntryReducer.miscPickupDealerData);
  const miscDeliveryDealerFormData = useSelector(
    (state) => state.orderEntryReducer.miscDeliveryDealerFormData
  );
  const miscPickupDealerTabIsValid = useSelector(
    (state) => state.orderEntryReducer.miscPickupDealerTabIsValid
  );
  const miscDeliveryDealerTabIsValid = useSelector(
    (state) => state.orderEntryReducer.miscDeliveryDealerTabIsValid
  );
  const isCustomerMisc = useSelector((state) => state.orderEntryReducer.isCustomerMisc);
  const reload = useSelector((state) => state.orderEntryReducer.reload);
  const unitNumber = useSelector((state) => state.orderEntryReducer.unitNumber);
  const vin = useSelector((state) => state.orderEntryReducer.vin);
  const customerData = useSelector((state) => state.orderEntryReducer.customerData);
  const unitTabIsValid = useSelector((state) => state.orderEntryReducer.unitTabIsValid);
  const deliveryDealerInput = useSelector((state) => state.orderEntryReducer.deliveryDealerInput);
  const dataResetFlag = useSelector((state) => state.orderEntryReducer.dataReset);
  const selectedUnitType = useSelector((state) => state.orderEntryReducer.unitTypeData);
  const hasRates = useSelector((state) => state.orderEntryReducer.hasRates);
  const brokerType = useSelector((state) => state.orderEntryReducer.brokerType);
  const bulkInvoiceFK = useSelector((state) => state.orderEntryReducer.bulkInvoiceFK);
  const shuttleToYard = useSelector((state) => state.orderEntryReducer.shuttleToYard);
  const selectedPortOfEntry = useSelector((state) => state.orderEntryReducer.selectedPortOfEntry);
  const customerPickupYardData = useSelector((state) => state.orderEntryReducer.customerPickupYardData);
  const pickupCustomerYardId = useSelector((state) => state.orderEntryReducer.pickupCustomerYardId);
  const deliveryCustomerYardId = useSelector((state) => state.orderEntryReducer.deliveryCustomerYardId);
  const pickupYardInput = useSelector((state) => state.orderEntryReducer.pickupYardInput);
  const selectedSpecialCode = useSelector((state) => state.orderEntryReducer.selectedSpecialCode);
  const driverCDLARequiredRedux = useSelector((state) => state.orderEntryReducer.driverCDLARequiredRedux);
  const defaultInvoiceMiles = useSelector((state) => state.orderEntryReducer.defaultInvoiceMiles);
  const returnRates = useSelector((state) => state.orderEntryReducer.returnRates);
  const isInvoiceFlatrateVisible = useSelector((state) => state.orderEntryReducer.isInvoiceFlatrateVisible);
  const isDriverFlatrateVisible = useSelector((state) => state.orderEntryReducer.isDriverFlatrateVisible);
  const selectedBillingPlantDetails = useSelector(
    (state) => state.orderEntryReducer.selectedBillingPlantDetails
  );
  const customerRateStructureRedux = useSelector(
    (state) => state.orderEntryReducer.customerRateStructureRedux
  );
  const isInvoiceMileageRateRedux = useSelector((state) => state.orderEntryReducer.isInvoiceMileageRateRedux);
  const isDriverMileageRateRedux = useSelector((state) => state.orderEntryReducer.isDriverMileageRateRedux);
  const errorMsgFromRedux = useSelector((state) => state.orderEntryReducer.flatRateErrorMsg);
  const invoiceAmount = useSelector((state) => state.orderEntryReducer.invoiceAmount);
  const invoiceFuelSurchargeAmount = useSelector(
    (state) => state.orderEntryReducer.invoiceFuelSurchargeAmount
  );
  const driverAmount = useSelector((state) => state.orderEntryReducer.driverAmount);
  const driverFuelSurchargeAmount = useSelector((state) => state.orderEntryReducer.driverFuelSurchargeAmount);
  const firstBatchSequence = useSelector((state) => state.orderEntryReducer.firstBatchSequence);
  const batchLoadCustomerTab = useSelector((state) => state.orderEntryReducer.batchLoadCustomerTab);
  const driverFlatRateFromRedux = useSelector((state) => state.orderEntryReducer.reduxDriverFlatRate);
  const flatRateErrorMsgFromRedux = useSelector((state) => state.orderEntryReducer.flatRateErrorMsg);
  const mileagErrorMsgFromRedux = useSelector((state) => state.orderEntryReducer.mileagedErrorMsg);
  const allowedInvoicePercentageRedux = useSelector(
    (state) => state.orderEntryReducer.allowedInvoicePercentageRedux
  );
  const invoiceAmtRedux = useSelector((state) => state.orderEntryReducer.invoiceAmount);
  const driverAmtRedux = useSelector((state) => state.orderEntryReducer.driverAmount);
  const invoiceMilesFromDriveBy = useSelector((state) => state.orderEntryReducer.invoiceMiles);
  const driverMilesFromDriveBy = useSelector((state) => state.orderEntryReducer.driverMiles);
  const invoiceCanadianRate = useSelector((state) => state.orderEntryReducer.invoiceCanadianRate);
  const invoiceCanadianFuelSurchargeRate = useSelector(
    (state) => state.orderEntryReducer.invoiceCanadianFuelSurchargeRate
  );
  const driverCanadianRate = useSelector((state) => state.orderEntryReducer.driverCanadianRate);
  const driverCanadianFuelSurchargeRate = useSelector(
    (state) => state.orderEntryReducer.driverCanadianFuelSurchargeRate
  );
  const ELDRequiredRedux = useSelector((state) => state.orderEntryReducer.ELDRequiredRedux);
  const plantOrderNumber = useSelector((state) => state.orderEntryReducer.plantOrderNumber);
  const pcMilerError = useSelector((state) => state.orderEntryReducer.pcMilerError);
  const shuttleFromYard = useSelector((state) => state.orderEntryReducer.shuttleFromYard);
  const plantRelease = useSelector((state) => state.orderEntryReducer.plantRelease);
  const pickupCustomerShuttleCityId = useSelector(
    (state) => state.orderEntryReducer.pickupCustomerShuttleCityId
  );
  const releaseProcessFlag = useSelector((state) => state.orderEntryReducer.releaseProcessFlag);
  const showOverrideButton = useSelector((state) => state.orderEntryReducer.showOverrideButton);
  const unitOverride = useSelector((state) => state.orderEntryReducer.unitOverride);
  const showUnitOverride = useSelector((state) => state.orderEntryReducer.showUnitOverride);
  const customerPickupPlantData = useSelector((state) => state.orderEntryReducer.customerPickupPlantData);
  const invoiceMilesAdjustment = useSelector((state) => state.orderEntryReducer.invoiceMilesAdjustment);
  const driverMilesAdjustment = useSelector((state) => state.orderEntryReducer.driverMilesAdjustment);
  const releaseDateUnit = useSelector((state) => state.orderEntryReducer.releaseDateUnit);
  const invoiceELDDescription = useSelector((state) => state.orderEntryReducer.invoiceELDDescription);

  //Multi Unit Load
  const selectedMiscPickupID = useSelector((state) => state.orderEntryReducer.miscPickupID);
  const selectedMiscDeliveryID = useSelector((state) => state.orderEntryReducer.miscDeliveryID);
  const unitsPerDispatchUnit = useSelector((state) => state.orderEntryReducer.unitsPerDispatchUnit);
  // FOD Invoice
  const isFODInvoice = useSelector((state) => state.orderEntryReducer.isFODInvoice);

  const [miscPickupID, setMiscPickupID] = useState("");
  const [miscDeliveryID, setMiscDeliveryID] = useState("");

  const calculateInvoiceDebouncer = useDebouncer(() => getInvoiceAmount(), 2000);
  const calculateDriverDebouncer = useDebouncer(() => getDriverAmount(), 2000);

  /** HANDLER FUNCTIONS */

  const handleUnitMultiLOadDefault = () => {
    OrderEntryService.getUnitMultiLoad({
      customerFK: selectedCustomerId ? selectedCustomerId : -1,
      selectedCustomerBillingPlantId: selectedCustomerBillingPlantId ? selectedCustomerBillingPlantId : -1,
      pickupDealerFK: pickupDealerFK ? pickupDealerFK : -1,
      pickupCustomerPlantFK: pickupCustomerPlantId ? pickupCustomerPlantId : -1,
      deliveryDealerFK: deliveryDealerFK ? deliveryDealerFK : -1,
    }).then((res) => {
      if (res != null && res.data !== "") {
        const data = res.data;
        const recordIdToFind = data.UnitMultiLoadPK;
        // Find record by ID
        const matchedrecord = filteredUnitMultiLoadList?.find(
          (rec) => rec.unitMultiLoadPK === recordIdToFind
        );
        setMultiUnitLoadInput(matchedrecord?.city);
        setUnitMultiLoadPK(matchedrecord?.unitMultiLoadPK);
        setMultiUnitLoadData(matchedrecord);
      }
    });
  };

  const handleCDLRateFetch = (
    type,
    gvwr,
    length,
    invoiceCustomerRateFK,
    driverCustomerRateFK,
    reload,
    returnBit,
    requireCDLA,
    canadian
  ) => {
    OrderEntryService.getCDLARate({
      gvwr: gvwr ? gvwr : 0,
      length: length ? length : 0,
      invoiceCustomerRateFK: invoiceCustomerRateFK ? invoiceCustomerRateFK : 0,
      driverCustomerRateFK: driverCustomerRateFK ? driverCustomerRateFK : 0,
      reload: reload,
      returnBit: returnBit,
      requireCDLA: requireCDLA,
      canadian: canadian,
    }).then((res) => {
      const data = res.data;
      if (type === "Invoice") setInvoiceCDLASurcharge(data.Invoice);
      else setDriverCDLASurcharge(data.Driver);
    });
  };

  const handleUnitOverrideCloseNo = () => {
    dispatch(setUnitNumber(""));
    dispatch(setShowUnitOverride(false));
  };
  const handleUnitOverrideYes = () => {
    dispatch(setUnitOverride(true));
    dispatch(setShowUnitOverride(false));
  };
  /**
   * Setting Tolls Permits switches for FOD and Non FOD Units
   */

  const setTollsPermitsWashOnSaveObject = () => {
    if (!isFODInvoice) {
      if (isInvoiceMileageRate) {
        dispatch(setBillTolls(selectedCustomerAllData.invoiceTolls));
        dispatch(setPayTolls(selectedCustomerAllData.driverTolls));
        dispatch(setBillPermits(selectedCustomerAllData.invoicePermits));
        dispatch(setPayPermits(selectedCustomerAllData.driverPermits));
        dispatch(setBillWash(selectedCustomerAllData.invoiceWash));
        dispatch(setPayWash(selectedCustomerAllData.driverWash));
      } else {
        dispatch(setBillTolls(selectedCustomerAllData.invoiceTollsFlatrate));
        dispatch(setPayTolls(selectedCustomerAllData.driverTollsFlatrate));
        dispatch(setBillPermits(selectedCustomerAllData.invoicePermitsFlatrate));
        dispatch(setPayPermits(selectedCustomerAllData.driverPermitsFlatrate));
        dispatch(setBillWash(selectedCustomerAllData.invoiceWashFlatrate));
        dispatch(setPayWash(selectedCustomerAllData.driverWashFlatrate));
      }
    } else {
      dispatch(setBillWash(false));
      dispatch(setPayWash(false));
      dispatch(setBillTolls(false));
      dispatch(setBillPermits(false));

      if (isInvoiceMileageRate) {
        if (selectedCustomerAllData.driverFODTolls)
          dispatch(setFODTolls(selectedCustomerAllData.driverFODTolls));
        else dispatch(setPayTolls(selectedCustomerAllData.driverTolls));

        if (selectedCustomerAllData.driverFODPermits)
          dispatch(setFODPermits(selectedCustomerAllData.driverFODPermits));
        else dispatch(setPayPermits(selectedCustomerAllData.driverPermits));
      } else {
        dispatch(setPayTolls(selectedCustomerAllData.driverTollsFlatrate));
        dispatch(setPayPermits(selectedCustomerAllData.driverPermitsFlatrate));
      }
    }
  };

  /**
   * Set Driver Tolls and Permits Visibility
   */
  const setDriverTollsPermitsVisibilityForFODMileage = () => {
    // Set Driver Tolls visibility
    if (selectedCustomerAllData.driverFODTolls) {
      setIsDriverTollsVisible(false);
      setDriverTolls("");
      dispatch(setDriverTollsUnit(null));
    } else {
      if (!selectedCustomerAllData.driverTolls) {
        setIsDriverTollsVisible(false);
        setDriverTolls("");
        dispatch(setDriverTollsUnit(null));
      } else {
        if (selectedCustomerAllData.askTolls) setIsDriverTollsVisible(true);
        else {
          setIsDriverTollsVisible(false);
          setDriverTolls("");
          dispatch(setDriverTollsUnit(null));
        }
      }
    }

    // Set Driver Permits Visibility
    if (selectedCustomerAllData.driverFODPermits) {
      setIsDriverPermitsVisible(false);
      setDriverPermits("");
      dispatch(setDriverPermitsUnit(null));
    } else {
      if (!selectedCustomerAllData.driverPermits) {
        setIsDriverPermitsVisible(false);
        setDriverPermits("");
        dispatch(setDriverPermitsUnit(null));
      } else {
        if (selectedCustomerAllData.askPermits) setIsDriverPermitsVisible(true);
        else {
          setIsDriverPermitsVisible(false);
          setDriverPermits("");
          dispatch(setDriverPermitsUnit(null));
        }
      }
    }
  };

  const setDriverTollsPermitsVisibilityForFlatrate = () => {
    // Set Driver Tolls visibility
    if (!selectedCustomerAllData.driverTollsFlatrate) {
      setIsDriverTollsVisible(false);
      setDriverTolls("");
      dispatch(setDriverTollsUnit(null));
    } else {
      if (selectedCustomerAllData.askTolls) setIsDriverTollsVisible(true);
      else {
        setIsDriverTollsVisible(false);
        setDriverTolls("");
        dispatch(setDriverTollsUnit(null));
      }
    }

    // Set Driver Permits Visibility
    if (!selectedCustomerAllData.driverPermitsFlatrate) {
      setIsDriverPermitsVisible(false);
      setDriverPermits("");
      dispatch(setDriverPermitsUnit(null));
    } else {
      if (selectedCustomerAllData.askPermits) setIsDriverPermitsVisible(true);
      else {
        setIsDriverPermitsVisible(false);
        setDriverPermits("");
        dispatch(setDriverPermitsUnit(null));
      }
    }
  };

  const setDriverTollsPermitsVisibilityForMileage = () => {
    // Set Driver Tolls visibility
    if (!selectedCustomerAllData.driverTolls) {
      setIsDriverTollsVisible(false);
      setDriverTolls("");
      dispatch(setDriverTollsUnit(null));
    } else {
      if (selectedCustomerAllData.askTolls) setIsDriverTollsVisible(true);
      else {
        setIsDriverTollsVisible(false);
        setDriverTolls("");
        dispatch(setDriverTollsUnit(null));
      }
    }

    // Set Driver Permits Visibility
    if (!selectedCustomerAllData.driverPermits) {
      setIsDriverPermitsVisible(false);
      setDriverPermits("");
      dispatch(setDriverPermitsUnit(null));
    } else {
      if (selectedCustomerAllData.askPermits) setIsDriverPermitsVisible(true);
      else {
        setIsDriverPermitsVisible(false);
        setDriverPermits("");
        dispatch(setDriverPermitsUnit(null));
      }
    }
  };

  /**
   * Set Required IFTA based on GVWR
   */
  const setIFTADefault = () => {
    if (GVWR !== "" && GVWR >= 32000) setRequiredIFTA(true);
    else if (GVWR !== "" && GVWR < 32000) setRequiredIFTA(false);
  };

  /**
   * Set Selected Customer's default values on Unit Tab
   */
  const setCustomerDefaults = () => {
    if (selectedCustomerAllData !== null) {
      setCustomerCanadianCheck(selectedCustomerAllData.canadian);
      setCustomerRequirePO(selectedCustomerAllData.requirePO);
      setCustomerRequireBankClient(selectedCustomerAllData.requireBankClient);
      setCustomerAskTolls(selectedCustomerAllData.askTolls);
      setCustomerAskPermits(selectedCustomerAllData.askPermits);
      setCustomerAskWash(selectedCustomerAllData.askWash);
      setAllowMiscDealer(selectedCustomerAllData.allowMiscellaneousDealers);
      setIsCustomerRequireModel(selectedCustomerAllData.requireModel);
      setIsCustomerRequireModelCode(selectedCustomerAllData.requireModelCode);
      setIsCustomerRequireVIN(selectedCustomerAllData.requireVIN);
      setIsCustomerRequireSerialNum(selectedCustomerAllData.requireSerialNumber);
      setIsCustomerRequireStockNum(selectedCustomerAllData.requireStockNumber);
      setIsallDealersFOD(selectedCustomerAllData.allDealersFOD);
      setIsCustomerRequireFactoryRelease(selectedCustomerAllData.requireFactoryRelease);
      setFreezePOE(selectedCustomerAllData.freezePOE);
      setIsDPUCustomer(selectedCustomerAllData.dpuCustomer);
      setMaximumLengthFlatbed(selectedCustomerAllData.maximumLengthFlatbed);
      setMaximumLengthHaulAndTow(selectedCustomerAllData.maximumLengthHaulAndTow);
      dispatch(setPreInvoiced(selectedCustomerAllData.preinvoiceUnits));
      dispatch(setSaveTollsAndPermits(selectedCustomerAllData.saveTollsAndPermits));
      dispatch(setEmailBOLAtOrderEntry(selectedCustomerAllData.emailBOLAtOrderEntry));
      dispatch(setBatchEmailBOLAtOrderEntry(selectedCustomerAllData.batchEmailBOLAtOrderEntry));
      dispatch(setBatchEmailBOLDaily(selectedCustomerAllData.batchEmailBOLDaily));

      if (selectedCustomerAllData.authorizedBy !== null) {
        setAuthorizedBy(selectedCustomerAllData?.authorizedBy);
      }
      if (selectedCustomerAllData.specialcodefk != null)
        setDefaultSpecialCode(selectedCustomerAllData.specialcodefk);

      if (selectedCustomerAllData.invoiceELDAmount > 0) {
        setIsDefaultInvoiceELD(true);
        setInvoiceELD(selectedCustomerAllData.invoiceELDAmount);
        dispatch(setInvoiceELDFeeRedux(selectedCustomerAllData.invoiceELDAmount));
      } else {
        setIsDefaultInvoiceELD(false);
        setInvoiceELD(0);
        dispatch(setInvoiceELDFeeRedux(0));
      }

      if (selectedCustomerAllData.driverELDAmount > 0) {
        setIsDefaultDriverELD(true);
        setDriverELD(selectedCustomerAllData.driverELDAmount);
        dispatch(setDriverELDFeeRedux(selectedCustomerAllData.driverELDAmount));
      } else {
        setIsDefaultDriverELD(false);
        setDriverELD(0);
        dispatch(setDriverELDFeeRedux(0));
      }
    }
  };

  /**
   * Setting RequiredCDLA visibility
   */
  const setRequiredCDLAVisibility = () => {
    if (selectedUnitType != null) {
      // Conditions for Motorized
      if (!towable) {
        if (!reload || (reload && pickupAtPlant)) {
          setRequiredCDLAHidden(true);
          setRequiredCDLA(false);
        }
        if (reload && !pickupAtPlant) {
          setRequiredCDLAHidden(false);
        }
      }

      // Conditions for Towable
      if (towable && !isDriverMileageRate) {
        setRequiredCDLAHidden(false);
      } else if (towable && isDriverMileageRate) {
        if (driverCDLASurcharge > 0) {
          setRequiredCDLAHidden(true);
          setRequiredCDLA(true);

          if (reload && !pickupAtPlant) {
            if (!driverRateStructure.useCDLReload) {
              setRequiredCDLAHidden(true);
              setRequiredCDLA(false);
            }
            if (returnRates && !driverRateStructure.useCDLReturns) {
              setRequiredCDLAHidden(true);
              setRequiredCDLA(false);
            }
          }
        } else if (driverCDLASurcharge == 0) {
          if (reload && !pickupAtPlant) {
            if (!driverRateStructure.useCDLReload) {
              setRequiredCDLAHidden(true);
              setRequiredCDLA(false);
            }
            if (returnRates && !driverRateStructure.useCDLReturns) {
              setRequiredCDLAHidden(true);
              setRequiredCDLA(false);
            }
          } else {
            setRequiredCDLAHidden(false);
            setRequiredCDLA(false);
          }
        }
      }
    } else {
      setRequiredCDLAHidden(true);
    }
  };

  /**
   * Set Broker & POE default values
   */
  const setBrokerAndPOEValues = () => {
    if (selectedPickupDealer !== null && selectedDeliveryDealer !== null) {
      let pickupDealerCanadian = selectedPickupDealer.canadian;
      let deliveryDealerCanadian = selectedDeliveryDealer.canadian;
      if (pickupDealerCanadian !== deliveryDealerCanadian) {
        // import or export
        if (!pickupDealerCanadian && deliveryDealerCanadian) {
          // export
          dispatch(setBrokerType("export"));
          dispatch(setCanadianDelivery(true));
          if (pickupAtPlant && !deliverToPlant) {
            if (customerDealerList !== null) {
              if (customerDealerList.length > 0) {
                if (customerDealerList[0].brokerFK != null) {
                  dispatch(setBrokerId(customerDealerList[0].brokerFK.exportBrokerPK));
                  dispatch(setSelectedBroker(customerDealerList[0].brokerFK));
                  dispatch(setBrokerInput(customerDealerList[0].brokerFK.name));
                  setFreezeBroker(true);
                } else {
                  if (selectedDeliveryDealer.brokerfk != null) {
                    dispatch(setBrokerId(selectedDeliveryDealer.brokerfk.exportBrokerPK));
                    dispatch(setSelectedBroker(selectedDeliveryDealer.brokerfk));
                    dispatch(setBrokerInput(selectedDeliveryDealer.brokerfk.name));
                    setFreezeBroker(false);
                  }
                  setFreezeBroker(false);
                }

                if (customerDealerList[0].poefk != null) {
                  dispatch(setPortOfEntryId(customerDealerList[0].poefk.poePK));
                  dispatch(setSelectedPortOfEntry(customerDealerList[0].poefk));
                  dispatch(setPortOfEntryInput(customerDealerList[0].poefk.usCity));
                }
              } else {
                if (selectedDeliveryDealer.brokerfk != null) {
                  dispatch(setBrokerId(selectedDeliveryDealer.brokerfk.exportBrokerPK));
                  dispatch(setSelectedBroker(selectedDeliveryDealer.brokerfk));
                  dispatch(setBrokerInput(selectedDeliveryDealer.brokerfk.name));
                  setFreezeBroker(false);
                }
                setFreezeBroker(false);
              }
            }
          }
        } else if (pickupDealerCanadian && !deliveryDealerCanadian) {
          // import
          dispatch(setBrokerType("import"));
          dispatch(setCanadianPickup(true));
          if (selectedCustomerAllData.importBrokerFK !== null) {
            dispatch(setBrokerId(selectedCustomerAllData.importBrokerFK.importBrokerPK));
            dispatch(setSelectedBroker(selectedCustomerAllData.importBrokerFK));
            dispatch(setBrokerInput(selectedCustomerAllData.importBrokerFK.name));
            setFreezeBroker(true);
          }
          setFreezeBroker(false);
        }
      } else {
        dispatch(setBrokerType("default"));
      }
    } else {
      dispatch(setBrokerType("default"));
    }
  };

  /**
   * Set CDL Surcharges
   */
  const setCDLSurchargesForRates = () => {
    // INVOICE CDL RATE SETUP
    if (invoiceRateStructure != "" && selectedDeliveryDealer != null) {
      if (
        (invoiceRateStructure.invoiceCDLGVWRCutoff != 0 &&
          GVWR !== "" &&
          GVWR >= invoiceRateStructure.invoiceCDLGVWRCutoff) ||
        (invoiceRateStructure.invoiceCDLLengthCutoff != 0 &&
          unitTypeLength >= invoiceRateStructure.invoiceCDLLengthCutoff)
      ) {
        if (towable && reload && !pickupAtPlant) {
          handleCDLRateFetch(
            "Invoice",
            GVWR,
            unitTypeLength,
            invoiceRateStructure.customerRatePK,
            0,
            reload,
            returnRates,
            requiredCDLA,
            selectedDeliveryDealer.canadian
          );
        } else if (towable && reload && returnRates && !pickupAtPlant) {
          handleCDLRateFetch(
            "Invoice",
            GVWR,
            unitTypeLength,
            invoiceRateStructure.customerRatePK,
            0,
            reload,
            returnRates,
            requiredCDLA,
            selectedDeliveryDealer.canadian
          );
        } else {
          handleCDLRateFetch(
            "Invoice",
            GVWR,
            unitTypeLength,
            invoiceRateStructure.customerRatePK,
            0,
            reload,
            returnRates,
            requiredCDLA,
            selectedDeliveryDealer.canadian
          );
        }
      } else if (requiredCDLA && !driverCDLARequiredRedux) {
        handleCDLRateFetch(
          "Invoice",
          GVWR,
          unitTypeLength,
          invoiceRateStructure.customerRatePK,
          0,
          reload,
          returnRates,
          requiredCDLA,
          selectedDeliveryDealer.canadian
        );
      }
    } else setInvoiceCDLASurcharge(0);

    // DRIVER CDL RATE SETUP
    if (driverRateStructure != "" && selectedDeliveryDealer != null) {
      if (
        (driverRateStructure.driverCDLGVWRCutoff != 0 &&
          GVWR != "" &&
          GVWR >= driverRateStructure.driverCDLGVWRCutoff) ||
        (driverRateStructure.driverCDLLengthCutoff != 0 &&
          unitTypeLength >= driverRateStructure.driverCDLLengthCutoff)
      ) {
        if (towable) {
          if (reload && !pickupAtPlant) {
            handleCDLRateFetch(
              "Driver",
              GVWR,
              unitTypeLength,
              0,
              driverRateStructure.customerRatePK,
              reload,
              returnRates,
              requiredCDLA,
              selectedDeliveryDealer.canadian
            );

            if (returnRates) {
              handleCDLRateFetch(
                "Driver",
                GVWR,
                unitTypeLength,
                0,
                driverRateStructure.customerRatePK,
                reload,
                returnRates,
                requiredCDLA,
                selectedDeliveryDealer.canadian
              );
            }
          } else {
            handleCDLRateFetch(
              "Driver",
              GVWR,
              unitTypeLength,
              0,
              driverRateStructure.customerRatePK,
              reload,
              returnRates,
              requiredCDLA,
              selectedDeliveryDealer.canadian
            );
          }
        }
      } else if (requiredCDLA && !driverCDLARequiredRedux) {
        handleCDLRateFetch(
          "Driver",
          GVWR,
          unitTypeLength,
          0,
          driverRateStructure.customerRatePK,
          reload,
          returnRates,
          requiredCDLA,
          selectedDeliveryDealer.canadian
        );
      }
    } else {
      setDriverCDLASurcharge(0);
    }
  };

  /**
   *  UseEffect for Setting  Commission
   */
  const fetchCommissionAmount = () => {
    if (selectedPickupDealer !== null && selectedDeliveryDealer !== null) {
      /* Dealer to Dealer**/
      if (pickupDealerFK !== null && deliveryDealerFK !== null) {
        fetchCommission(
          selectedCustomerId,
          pickupDealerFK,
          deliveryDealerFK,
          null,
          null,
          selectedCustomerBillingPlantId
        );
      }
      /*Plant to Dealer */
      if (
        pickupAtPlant &&
        pickupCustomerPlantId !== null &&
        selectedCustomerBillingPlantId !== null &&
        deliveryDealerFK !== null &&
        unitTypesFK !== ""
      ) {
        fetchCommission(
          selectedCustomerId,
          null,
          deliveryDealerFK,
          pickupCustomerPlantId,
          null,
          selectedCustomerBillingPlantId
        );
      }

      /*Dealer to Plant*/
      if (
        pickupDealerFK !== null &&
        deliverToPlant &&
        deliveryCustomerPlantId !== "" &&
        selectedCustomerBillingPlantId !== null &&
        unitTypesFK !== ""
      ) {
        fetchCommission(
          selectedCustomerId,
          pickupDealerFK,
          null,
          null,
          deliveryCustomerPlantId,
          selectedCustomerBillingPlantId
        );
      }

      /*DPU Customer - Plant to Dealer */
      if (
        pickupAtPlant &&
        pickupCustomerPlantId !== null &&
        selectedCustomerBillingPlantId == null &&
        deliveryDealerFK !== null &&
        unitTypesFK !== ""
      ) {
        fetchCommission(selectedCustomerId, null, deliveryDealerFK, pickupCustomerPlantId, null, null);
      }

      /*Plant to Plant */
      if (
        pickupAtPlant &&
        pickupCustomerPlantId !== null &&
        deliverToPlant &&
        deliveryCustomerPlantId !== "" &&
        selectedCustomerBillingPlantId !== null &&
        unitTypesFK !== ""
      ) {
        fetchCommission(
          selectedCustomerId,
          null,
          null,
          pickupCustomerPlantId,
          deliveryCustomerPlantId,
          selectedCustomerBillingPlantId
        );
      }
    }
  };

  /**
   * Set Fields and Tabs when UnitType changed
   */
  const changeUnitTypeRelatedFields = () => {
    if (
      selectedUnitType != null &&
      selectedUnitType.allowMultiUnit === true &&
      selectedUnitType.motorized == false
    ) {
      setShowMultiUnitLoadDiv(true);

      // Set Defaults of MultiUnit
      if (maximumLengthHaulAndTow > 0 && selectedUnitType.length <= maximumLengthHaulAndTow) {
        setMultiUnit(true);
        setIsMultiUnitDefault(true);
      } else {
        setMultiUnit(false);
        setIsMultiUnitDefault(false);
      }
      if (pickupAtPlant && pickupCustomerPlantId !== null && deliveryDealerFK !== null) {
        if (
          maximumLengthFlatbed === 0 ||
          (selectedUnitType.length > maximumLengthFlatbed &&
            selectedUnitType.length <= maximumLengthHaulAndTow) ||
          (maximumLengthFlatbed === 0 &&
            maximumLengthHaulAndTow > 0 &&
            selectedUnitType.length <= maximumLengthHaulAndTow)
        ) {
          setUnitsPerDispatch(2);
        }

        if (maximumLengthFlatbed > 0 && selectedUnitType.length <= maximumLengthFlatbed) {
          setUnitsPerDispatch(3);
        }
      } else setUnitsPerDispatch(2);
    } else if (selectedUnitType != null && selectedUnitType.allowMultiUnit === false) {
      setShowMultiUnitLoadDiv(false);
      settowableTrueAllowMultiLoadFalse(true);
    } else {
      settowableTrueAllowMultiLoadFalse(false);
    }

    if (selectedUnitType != null) {
      setIsMotorized(selectedUnitType.motorized);
      setUnitTypeLength(selectedUnitType.length);

      if (selectedUnitType.requiresELD) dispatch(setELDRequiredRedux(true));
      else dispatch(setELDRequiredRedux(false));
    }

    //For enabling OverWidth OVT -overwidth trailer OVR -OverWidth boat
    if (selectedUnitType != null && selectedUnitType.overWidth) {
      dispatch(setOverWidthLoad(true));
    } else {
      dispatch(setOverWidthLoad(false));
    }

    if (selectedUnitType != null && selectedUnitType.motorized == false) {
      setTowable(true);
      dispatch(setTowableRedux(true));
      dispatch(setEngineGas(false));
      dispatch(setEngineDiesel(true));
      setRadioValue("enginediesel");
    } else {
      setTowable(false);
      dispatch(setTowableRedux(false));
      dispatch(setEngineGas(false));
      dispatch(setEngineDiesel(false));
      setRadioValue("enginena");
    }

    // Set ELD Fee Visible
    if (selectedUnitType !== null && selectedUnitType !== undefined && selectedCustomerAllData !== null) {
      if (selectedUnitType.requiresELD && selectedCustomerAllData.eldFee) {
        setIsELDFeeVisible(true);
      } else setIsELDFeeVisible(false);
    }
    setGVWR("");

    if (selectedUnitType === null) {
      setIsELDFeeVisible(false);
    }

    if (selectedUnitType !== null && selectedUnitType !== undefined && selectedUnitType.allowPopup) {
      setIsUnitPopUp(true);
    } else setIsUnitPopUp(false);

    if (selectedUnitType !== null && selectedUnitType !== undefined && selectedUnitType.allowTruckCamper) {
      setIsUnitTruckCamper(true);
      setMultiUnitTruckCamper(true);
    } else {
      setIsUnitTruckCamper(false);
      setMultiUnitTruckCamper(false);
    }
  };

  const setTollsPermitsWash = () => {
    if ((pickupAtPlant && !deliverToPlant) || (!pickupAtPlant && deliverToPlant)) {
      if (customerDealerList != null && customerDealerList.length > 0) {
        if (customerDealerList[0].driverMaxTollsAmount > 0 && customerAskTolls) {
          dispatch(setDriverTollsUnit(customerDealerList[0].driverMaxTollsAmount));
          setDriverTolls(customerDealerList[0].driverMaxTollsAmount);
          setIsDisabledDriverTolls(true);
        }
        if (customerDealerList[0].driverMaxPermitsAmount > 0 && customerAskPermits) {
          dispatch(setDriverPermitsUnit(customerDealerList[0].driverMaxPermitsAmount));
          setDriverPermits(customerDealerList[0].driverMaxPermitsAmount);
          setIsDisabledDriverPermits(true);
        }
        if (
          pickupAtPlant &&
          !deliverToPlant &&
          customerDealerList[0].driverMaxWashAmount > 0 &&
          customerAskWash
        ) {
          dispatch(setDriverWashUnit(customerDealerList[0].driverMaxWashAmount));
        }
      }
    }
  };

  const resetInvoiceMileageData = () => {
    // ReSetting Invoice Rate
    dispatch(setInvoiceRate(0));
    dispatch(setInvoiceFuelSurchargeRate(0));
    dispatch(setInvoiceReturnRate(0));

    // ReSetting Length Rate
    dispatch(setInvoiceLengthRate(0));
    dispatch(setInvoiceLengthReturn(false));

    // ReSetting Invoice Supplemental Rates
    dispatch(setInvoiceSupplementalRate(0));
    dispatch(setInvoiceSupplementalFuelSurchargeRate(0));
    dispatch(setInvoiceSupplementalDescription(""));
    dispatch(setInvoiceSupplementalReturn(false));

    // ReSetting Additional Rate
    dispatch(setInvoiceAdditionalDescription(""));
    dispatch(setInvoiceAdditionalRate(0));
    dispatch(setInvoiceAdditionalFuelSurchargeRate(0));
    dispatch(setInvoiceAdditionalReturn(false));

    // ReSetting Additional Flatrate
    dispatch(setAdditionalFlatRateDescription(""));
    dispatch(setInvoiceAdditionalFlatRate(0));

    // ReSetting Special Rate
    dispatch(setInvoiceSpecialDescription(""));
    dispatch(setInvoiceSpecialRate(0));
    dispatch(setInvoiceSpecialFuelSurchargeRate(0));
    dispatch(setInvoiceSpecialReturn(false));
  };

  const resetDriverMileageData = () => {
    // ReSetting Driver Rate
    dispatch(setDriverRate(0));
    dispatch(setDriverFuelSurchargeRate(0));
    dispatch(setDriverReturnRate(0));

    // ReSetting Driver Length Rate
    dispatch(setDriverLengthRate(0));
    dispatch(setDriverLengthReturn(false));

    // ReSetting Driver Supplemental Rates
    dispatch(setDriverSupplementalRate(0));
    dispatch(setDriverSupplementalFuelSurchargeRate(0));
    dispatch(setDriverSupplementalDescription(""));
    dispatch(setDriverSupplementalReturn(false));

    // ReSetting Additional Rates
    dispatch(setDriverAdditionalDescription(""));
    dispatch(setDriverAdditionalRate(0));
    dispatch(setDriverAdditionalFuelSurchargeRate(0));
    dispatch(setDriverAdditionalReturn(false));

    // ReSetting Additional Flatrate
    dispatch(setDriverAdditionalFlatRate(0));
    dispatch(setAdditionalFlatRateDescription(""));

    // ReSetting Driver Special Rate
    dispatch(setDriverSpecialDescription(""));
    dispatch(setDriverSpecialRate(0));
    dispatch(setDriverSpecialFuelSurchargeRate(0));
    dispatch(setDriverSpecialReturn(false));
  };

  const checkAndSetInvoiceAmount = (data) => {
    if (invoiceFlatrate > 0) {
      let grossInvoiceAmount = invoiceFlatrate + invoiceUSCNSurcharge;
      dispatch(setInvoiceAmount(grossInvoiceAmount));
      setIsInvoiceMileageRate(false);
      dispatch(setIsInvoiceMileageRateRedux(false));
      resetInvoiceMileageData();
    } else if (data !== "") {
      dispatch(setInvoiceAmount(data.invoiceAmount));

      // Setting Invoice Rate
      dispatch(setInvoiceRate(data.invoiceRate));
      dispatch(setInvoiceFuelSurchargeRate(data.invoiceFuelSurchargeRate));
      dispatch(setInvoiceReturnRate(data.invoiceReturnRate));

      // Setting Length Rate
      dispatch(setInvoiceLengthRate(data.invoiceLengthRate));
      dispatch(setInvoiceLengthReturn(data.invoiceLengthReturn));

      // Setting Invoice Supplemental Rates
      dispatch(setInvoiceSupplementalRate(data.invoiceSupplementalRate));
      dispatch(setInvoiceSupplementalFuelSurchargeRate(data.invoiceSupplementalFuelSurchargeRate));
      dispatch(setInvoiceSupplementalDescription(data.invoiceSupplementalDescription));
      dispatch(setInvoiceSupplementalReturn(data.invoiceSupplementalReturn));

      // Setting Additional Rate
      dispatch(setInvoiceAdditionalDescription(data.invoiceAdditionalDescription));
      dispatch(setInvoiceAdditionalRate(data.invoiceAdditionalRate));
      dispatch(setInvoiceAdditionalFuelSurchargeRate(data.invoiceAdditionalFuelSurchargeRate));
      dispatch(setInvoiceAdditionalReturn(data.invoiceAdditionalReturn));

      // Setting Additional Flatrate
      dispatch(setAdditionalFlatRateDescription(data.additionalFlatRateDescription));
      dispatch(setInvoiceAdditionalFlatRate(data.invoiceAdditionalFlatRate));

      // Setting Special Rate
      dispatch(setInvoiceSpecialDescription(data.invoiceSpecialDescription));
      dispatch(setInvoiceSpecialRate(data.invoiceSpecialRate));
      dispatch(setInvoiceSpecialFuelSurchargeRate(data.invoiceSpecialFuelSurchargeRate));
      dispatch(setInvoiceSpecialReturn(data.invoiceSpecialReturn));

      setIsInvoiceMileageRate(true);
      dispatch(setIsInvoiceMileageRateRedux(true));
    } else {
      let grossInvoiceAmount = invoiceFlatrate + invoiceUSCNSurcharge;
      dispatch(setInvoiceAmount(grossInvoiceAmount));
    }
  };

  const checkAndSetDriverAmount = (data) => {
    if (driverFlatrate > 0) {
      let grossDriverAmount = driverFlatrate + driverUSCNSurcharge;
      dispatch(setDriverAmount(grossDriverAmount));
      setIsDriverMileageRate(false);
      dispatch(setIsDriverMileageRateRedux(false));
      resetDriverMileageData();
    } else if (data !== "") {
      dispatch(setDriverAmount(data.driverAmount));

      // Setting Driver Rate
      dispatch(setDriverRate(data.driverRate));
      dispatch(setDriverFuelSurchargeRate(data.driverFuelSurchargeRate));
      dispatch(setDriverReturnRate(data.driverReturnRate));

      // Setting Driver Length Rate
      dispatch(setDriverLengthRate(data.driverLengthRate));
      dispatch(setDriverLengthReturn(data.driverLengthReturn));

      // Setting Driver Supplemental Rates
      dispatch(setDriverSupplementalRate(data.driverSupplementalRate));
      dispatch(setDriverSupplementalFuelSurchargeRate(data.driverSupplementalFuelSurchargeRate));
      dispatch(setDriverSupplementalDescription(data.driverSupplementalDescription));
      dispatch(setDriverSupplementalReturn(data.driverSupplementalReturn));

      // Setting Driver Additional Rates
      dispatch(setDriverAdditionalDescription(data.driverAdditionalDescription));
      dispatch(setDriverAdditionalRate(data.driverAdditionalRate));
      dispatch(setDriverAdditionalFuelSurchargeRate(data.driverAdditionalFuelSurchargeRate));
      dispatch(setDriverAdditionalReturn(data.driverAdditionalReturn));

      // Setting Driver Additional Flatrate
      dispatch(setDriverAdditionalFlatRate(data.driverAdditionalFlatRate));
      dispatch(setAdditionalFlatRateDescription(data.additionalFlatRateDescription));

      // Setting Driver Special Rate
      dispatch(setDriverSpecialDescription(data.driverSpecialDescription));
      dispatch(setDriverSpecialRate(data.driverSpecialRate));
      dispatch(setDriverSpecialFuelSurchargeRate(data.driverSpecialFuelSurchargeRate));
      dispatch(setDriverSpecialReturn(data.driverSpecialReturn));

      setIsDriverMileageRate(true);
      dispatch(setIsDriverMileageRateRedux(true));
    }
  };

  const handleAmountExceedsPercentage = () => {
    let unitPercentage = Number(driverAmount) / Number(invoiceAmount);
    setUnitPercentage(unitPercentage);

    if (driverAmount > 0) {
      if (invoiceAmount > 0) {
        if (Number(unitPercentage) > Number(allowedInvoicePercentageRedux)) {
          dispatch(setFlatRateErrorMsg("Unit Percentage exceeds Allowed percentage"));

          dispatch(setShowOverrideButton(true));
        } else {
          dispatch(setFlatRateErrorMsg(""));

          dispatch(setShowOverrideButton(false));
        }
      }
    }
  };

  const driverTollsFormatHandler = (e) => {
    const driverTolls = numberValidation(e.target.value);
    setDriverTolls(driverTolls);
  };

  const driverPermitsFormatHandler = (e) => {
    const driverPermits = numberValidation(e.target.value);
    setDriverPermits(driverPermits);
  };

  const GVWRFormatHandler = (e) => {
    const gvwr = numberValidation(e.target.value);
    setGVWR(gvwr);
  };

  const portEscortFeeFormatHandler = (e) => {
    const portEscortFee = numberValidation(e.target.value);
    setPortEscortFee(portEscortFee);
  };

  const calculateDistance = () => {
    if (selectedPickupDealer !== null && selectedDeliveryDealer !== null) {
      let pickupDeliverylocation = {
        src: {
          city: selectedPickupDealer.city || "",
          stateCode: selectedPickupDealer.stateCode || "",
        },
        dst: {
          city: selectedDeliveryDealer.city || "",
          stateCode: selectedDeliveryDealer.stateCode || "",
        },
      };
      setLoader(true);
      PcMilerService.calculateDistance(pickupDeliverylocation)
        .then((res) => {
          if (res != null && res.data !== "") {
            const data = res.data;
            let distance = data.distance ? Math.round(data.distance) : 0;
            dispatch(setInvoiceMiles(Number(distance)));
            dispatch(setDriverMiles(distance));

            dispatch(setDefaultInvoiceMiles(Number(distance)));
            dispatch(setDefaultDriverMiles(distance));
            setShowPCMilerErrorModal(false);
            dispatch(setPcMilerError(""));
            setLoader(false);
          }
        })
        .catch((err) => {
          setShowPCMilerErrorModal(true);
          dispatch(setPcMilerError("PC Miler is not available"));
          setLoader(false);
        });
    }
  };

  // TO DO
  const handleUnitTypeLookupModalShow = () => {
    dispatch(setUnitTypeSelection(true));
    dispatch(setUnitTypePageNumber(0));
    dispatch(resetUnitTypeSearchSettings());
  };

  const handleSpecialCodeLookupModalShow = () => {
    dispatch(setSpecialCodeSelection(true));
  };

  const handlePickupDealerLookupModalShow = () => {
    dispatch(setPickupDealerSelection1(true));
  };

  const handlePickupDealerLookupSelection = (dealer) => {
    dispatch(setSelectedPickupDealer(dealer));
    dispatch(setPickupDealerId(dealer.dealerPK));
    dispatch(setPickupDealerSelection1(false));
  };

  const handleDeliveryDealerLookupModalShow = () => {
    if (deliverToPlant || miscDelivery) {
    } else {
      dispatch(setDeliveryDealerSelection1(true));
    }
  };

  const handleDeliveryDealerLookupSelection = (dealer, event) => {
    dispatch(setSelectedDeliveryDealer(dealer));
    setDeliveryDealerFK(dealer.dealerPK);
    dispatch(setDeliveryDealersFK(dealer.dealerPK));
    dispatch(setDeliveryDealerSelection1(false));
  };

  // TO DO for Broker, POE, Multi Unit Load
  const handleBrokerLookupModalShow = () => {
    dispatch(setBrokerSelection(true));
  };

  const handleBrokerLookupSelection = (broker, event) => {
    dispatch(setBrokerId(returnBrokerPK(broker)));
    dispatch(setBrokerInput(broker.name?.trim()));
    dispatch(setBrokerSelection(false));
  };

  const handlePortOfEntryLookupModalShow = () => {
    dispatch(setPortOfEntrySelection(true));
  };
  const handleUnitMultiLoadLookupModalShow = () => {
    dispatch(setUnitMultiLoadSelection(true));
  };

  // Handle Lookup functions
  const handlePortOfEntryLookupSelection = (port) => {
    dispatch(setPortOfEntryId(port.poePK));
    let city = "";
    if (brokerType === "export") {
      city = port.canadianCity;
    } else if (brokerType === "import") {
      city = port.usCity;
    }
    dispatch(setPortOfEntryInput(port.usCity?.trim()));
    dispatch(setPortOfEntrySelection(false));
    dispatch(setSelectedPortOfEntry(port));
  };

  const hanldeCheckUnitNumber = (unitNum) => {
    if (unitNum?.length >= 5) {
      OrderEntryService.checkUnitNumberValid(unitNum, selectedCustomerId, selectedCustomerBillingPlantId)
        .then((res) => {
          if (res.data === "This is currently an active unit number") setCheckUnitNumber(res.data);
          if (res.data === "This unit number exists, Do you want to override this unit?") {
            dispatch(setShowUnitOverride(true));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (unitNum.length < 5) {
      setCheckUnitNumber("");
    }
  };

  const handleOverideButton = () => {
    setShowFlatRateModal(true);
  };

  const handlePCMiler = () => {
    if (invoiceMiles > 0) setShowPCMilerModal(true);
    else handlePCMilerOK();
  };

  const handlePCMilerCancel = () => {
    setShowPCMilerModal(false);
  };

  const handlePCMilerErrorClose = () => {
    setShowPCMilerErrorModal(false);
    dispatch(setPcMilerError(""));
  };
  const handlePCMilerOK = () => {
    calculateDistance();
    setShowPCMilerModal(false);
  };

  const handleFlatRateCancel = () => {
    setShowFlatRateModal(false);
  };
  const handleFlatRateOK = () => {
    dispatch(setReduxDriverFlatRate(0));
    setUserName("");
    setUserCode("");
    setShowOverrideErrorMessage("");
    setShowFlatRateModal(false);
    setShowOverrideModal(true);
  };
  const handleOverrideCancel = () => {
    setShowOverrideModal(false);
  };
  const handleOverrideOK = () => {
    // To be done : get override percentage of selected user
    //if override percentage is less than customers allowed percentage , show error
    //if the entered value is more than allowed what should we do ?

    let overrideValue;

    OrderEntryService.getOverInvoiceAmt(userCode)
      .then((res) => {
        overrideValue = res.data;

        //if no record present in the db with the given details
        if (
          overrideValue === null ||
          overrideValue === undefined ||
          overrideValue === "" ||
          overrideValue === 0
        ) {
          setShowOverrideErrorModal(true);
          setShowOverrideErrorMessage("Invalid code or user has no permission !!");
          setShowOverrideModal(false);
        } else {
          //record is present but, find the sum
          let newOverrideVal =
            Number(overrideValue / 100) + Number(selectedCustomerAllData.invoicePercentage);

          setAllowedInvoicePercentage(newOverrideVal);

          if (newOverrideVal < 100) {
            if (unitPercentage > newOverrideVal) {
              setShowOverrideErrorModal(true);
              setShowOverrideErrorMessage(
                "New invoice percentage is insufficient !! Please try another code."
              );
            } else {
              setAllowedInvoicePercentage(newOverrideVal);

              dispatch(setAllowedInvoicePercentageRedux(newOverrideVal));
              dispatch(setFlatRateErrorMsg(""));
              setShowOverrideModal(false);
            }
          } else {
            setShowOverrideErrorMessage("Override Percentage is greater than 100");
            setShowOverrideErrorModal(true);
            setShowOverrideModal(false);
            dispatch(setReduxDriverFlatRate(0));
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOverrideErrorCancel = () => {
    setShowOverrideErrorModal(false);
    dispatch(setReduxDriverFlatRate(0));
  };
  const handleOverrideAppliedCancel = () => {
    setShowOverrideAppliedModal(false);
  };

  const handleFlatRateOverride = () => {
    if (Number(invoiceMiles) > 0 && Number(driverMiles) > 0) {
      //For Flatrated units need do allowed Percentage check and Users override percentage

      if (selectedCustomerAllData !== null && selectedCustomerAllData.invoicePercentage !== 0) {
        let allowedInvoicePercentage = selectedCustomerAllData.invoicePercentage;

        if (invoiceFlatrate > 0) {
          let allowedInvoiceAmt = Number((invoiceFlatrate * allowedInvoicePercentage) / 100);

          if (
            driverFlatrate <= allowedInvoiceAmt ||
            (driverFlatRateFromRedux !== 0 && driverFlatrate <= driverFlatRateFromRedux)
          ) {
            dispatch(setFlatRateErrorMsg(""));
          } else {
            let val = driverFlatRateFromRedux !== 0 ? driverFlatRateFromRedux : allowedInvoiceAmt;
            dispatch(setFlatRateErrorMsg("Maximum value that can be given for Driver Flat Rate is " + val));
            // dont show popup if override is already applied
            if (driverFlatRateFromRedux === 0) setShowFlatRateModal(true);
            else setShowFlatRateModal(false);
          }
        }
      }
    }
  };
  const handleMilesOverride = () => {
    if (Number(invoiceMiles) > 0 && Number(driverMiles) > 0) {
      //For Mileaged units we need do allowed Percentage check and Users override percentage
      if (selectedCustomerAllData !== null && selectedCustomerAllData.invoicePercentage !== 0) {
        let allowedInvoicePercentage = selectedCustomerAllData.invoicePercentage;
        // if(customerRateStructureRedux !== null  ){ // mileaged unit

        if (invoiceAmtRedux > 0) {
          var allowedInvoiceAmt = Number((invoiceAmtRedux * allowedInvoicePercentage) / 100);

          if (driverAmtRedux <= allowedInvoiceAmt) {
            dispatch(setMileagedErrorMsg(""));
          } else {
            if (isInvoiceMileageRateRedux || isDriverMileageRateRedux)
              //show error message for mileaged units only
              dispatch(setMileagedErrorMsg("Driver amount exceeds allowed percentage.Adjust Miles"));
          }
        } else {
          dispatch(setMileagedErrorMsg(""));
        }
      }
      // }
    }
  };

  const checkInvoicePercentage = () => {
    if (selectedCustomerAllData !== null) {
      OrderEntryService.getUserInvoicePercentage().then((res) => {
        if (res !== null && res.data !== "") {
          let allowedInvoicePercentage1 = 0;
          let userInvoicePercentage = res.data;

          if (userInvoicePercentage > 0) {
            allowedInvoicePercentage1 =
              Number(userInvoicePercentage / 100) + Number(selectedCustomerAllData.invoicePercentage);
          } else if (selectedCustomerAllData.invoicePercentage > 0) {
            allowedInvoicePercentage1 = Number(selectedCustomerAllData.invoicePercentage);
          }

          setAllowedInvoicePercentage(allowedInvoicePercentage1);

          dispatch(setAllowedInvoicePercentageRedux(allowedInvoicePercentage1));
        }
      });
    }
  };

  const fetchInvoiceMilesAndDriverMiles = () => {
    if (selectedPickupDealer !== null && selectedDeliveryDealer !== null) {
      /* Dealer to Dealer**/
      if (pickupDealerFK !== null && deliveryDealerFK !== null) {
        fetchInvoiceAndDriverMiles(
          pickupDealerFK,
          deliveryDealerFK,
          selectedCustomerId,
          isCustUsePlants,
          pickupCustomerPlantId,
          deliveryCustomerPlantId,
          selectedCustomerBillingPlantId,
          isMilesLowBoy
        );
      }

      /*Plant to Dealer */
      if (
        pickupAtPlant &&
        pickupCustomerPlantId !== null &&
        selectedCustomerBillingPlantId !== null &&
        deliveryDealerFK !== null &&
        unitTypesFK !== ""
      ) {
        fetchInvoiceAndDriverMiles(
          null,
          deliveryDealerFK,
          selectedCustomerId,
          isCustUsePlants,
          pickupCustomerPlantId,
          null,
          selectedCustomerBillingPlantId,
          isMilesLowBoy
        );
      }

      /*Dealer to Plant*/
      if (
        pickupDealerFK !== null &&
        deliverToPlant &&
        deliveryCustomerPlantId !== "" &&
        selectedCustomerBillingPlantId !== null &&
        unitTypesFK !== ""
      ) {
        fetchInvoiceAndDriverMiles(
          pickupDealerFK,
          null,
          selectedCustomerId,
          isCustUsePlants,
          null,
          deliveryCustomerPlantId,
          selectedCustomerBillingPlantId,
          isMilesLowBoy
        );
      }

      /*DPU Customer - Plant to Dealer */
      if (
        pickupAtPlant &&
        pickupCustomerPlantId !== null &&
        selectedCustomerBillingPlantId == null &&
        deliveryDealerFK !== null &&
        unitTypesFK !== ""
      ) {
        fetchInvoiceAndDriverMiles(
          null,
          deliveryDealerFK,
          selectedCustomerId,
          isCustUsePlants,
          pickupCustomerPlantId,
          null,
          selectedCustomerBillingPlantId,
          isMilesLowBoy
        );
      }

      /*Plant to Plant */
      if (
        pickupAtPlant &&
        pickupCustomerPlantId !== null &&
        deliverToPlant &&
        deliveryCustomerPlantId !== "" &&
        selectedCustomerBillingPlantId !== null &&
        unitTypesFK !== ""
      ) {
        fetchInvoiceAndDriverMiles(
          null,
          null,
          selectedCustomerId,
          isCustUsePlants,
          pickupCustomerPlantId,
          deliveryCustomerPlantId,
          selectedCustomerBillingPlantId,
          isMilesLowBoy
        );
      }
    }
  };

  /**
   * Function for Setting Flatrates
   */
  const fetchFlatrates = () => {
    if (selectedPickupDealer !== null && selectedDeliveryDealer !== null) {
      if (unitTypesFK !== "") {
        if (customerRateStructure != "") {
          // dispatch(setIsInvoiceFlatrateVisible(true))
          // dispatch(setIsDriverFlatrateVisible(true))
        }
      }

      /* Dealer to Dealer**/
      if (
        pickupDealerFK !== null &&
        deliveryDealerFK !== null &&
        unitTypesFK !== "" &&
        unitsPerDispatch !== ""
      ) {
        fetchInvoiceAndDriverFlatRates(
          pickupDealerFK,
          deliveryDealerFK,
          unitTypesFK,
          multiUnit,
          selectedCustomerId,
          isCustUsePlants,
          pickupCustomerPlantId,
          deliveryCustomerPlantId,
          selectedCustomerBillingPlantId,
          unitsPerDispatch,
          invoice2as3,
          isMilesLowBoy
        );
      }
    }

    /*Plant to Dealer */
    if (
      pickupAtPlant &&
      pickupCustomerPlantId !== null &&
      selectedCustomerBillingPlantId !== null &&
      deliveryDealerFK !== null &&
      unitTypesFK !== "" &&
      unitsPerDispatch !== ""
    ) {
      fetchInvoiceAndDriverFlatRates(
        null,
        deliveryDealerFK,
        unitTypesFK,
        multiUnit,
        selectedCustomerId,
        isCustUsePlants,
        pickupCustomerPlantId,
        null,
        selectedCustomerBillingPlantId,
        unitsPerDispatch,
        invoice2as3,
        isMilesLowBoy
      );
    }

    /*Dealer to Plant*/
    if (
      pickupDealerFK !== null &&
      deliverToPlant &&
      deliveryCustomerPlantId !== "" &&
      selectedCustomerBillingPlantId !== null &&
      unitTypesFK !== "" &&
      unitsPerDispatch !== ""
    ) {
      fetchInvoiceAndDriverFlatRates(
        pickupDealerFK,
        null,
        unitTypesFK,
        multiUnit,
        selectedCustomerId,
        isCustUsePlants,
        null,
        deliveryCustomerPlantId,
        selectedCustomerBillingPlantId,
        unitsPerDispatch,
        invoice2as3,
        isMilesLowBoy
      );
    }

    /*DPU Customer - Plant to Dealer */
    if (
      pickupAtPlant &&
      pickupCustomerPlantId !== null &&
      selectedCustomerBillingPlantId == null &&
      deliveryDealerFK !== null &&
      unitTypesFK !== "" &&
      unitsPerDispatch !== ""
    ) {
      fetchInvoiceAndDriverFlatRates(
        null,
        deliveryDealerFK,
        unitTypesFK,
        multiUnit,
        selectedCustomerId,
        isCustUsePlants,
        pickupCustomerPlantId,
        null,
        null,
        unitsPerDispatch,
        invoice2as3,
        isMilesLowBoy
      );
    }

    /*Plant to Plant */
    if (
      pickupAtPlant &&
      pickupCustomerPlantId !== null &&
      deliverToPlant &&
      deliveryCustomerPlantId !== "" &&
      selectedCustomerBillingPlantId !== null &&
      unitTypesFK !== "" &&
      unitsPerDispatch !== ""
    ) {
      fetchInvoiceAndDriverFlatRates(
        null,
        null,
        unitTypesFK,
        multiUnit,
        selectedCustomerId,
        isCustUsePlants,
        pickupCustomerPlantId,
        deliveryCustomerPlantId,
        selectedCustomerBillingPlantId,
        unitsPerDispatch,
        invoice2as3,
        isMilesLowBoy
      );
    }
  };

  /**
   *  Calculate Invoice Amount
   */
  const getInvoiceAmount = () => {
    if (
      invoiceRateStructure !== "" &&
      (invoiceFlatrate === 0 || invoiceFlatrate === "") &&
      (pickupAtPlant || pickupDealersFK !== null) &&
      (deliverToPlant || deliveryDealersFK !== null)
    ) {
      if (invoiceMiles > 0) {
        OrderEntryService.calculateInvoiceAmount({
          invoiceRateStructure: invoiceRateStructure,
          supplementalRateStructure: supplementalRateStructure !== "" ? supplementalRateStructure : null,
          specialRateStructure: specialRateStructure !== "" ? specialRateStructure : null,
          additionalRateStructure: additionalRateStructure !== "" ? additionalRateStructure : null,
          returnRates: returnRates,
          reload: reload,
          invoiceMiles: invoiceMiles,
          pickupAtPlant: pickupAtPlant,
          invoiceCDLARate: invoiceCDLASurcharge,
          invoiceUSCNSurcharge: invoiceUSCNSurcharge,
          invoiceFuelSurcharge: invoiceFuelSurcharge,
          portEscortFee: portEscortFee ? portEscortFee : 0,
          invoiceELDFee: invoiceELD,
          driverELDFee: driverELD,
          invoice: true,
          unitTypeLength: unitTypeLength,
          brokerType: brokerType,
        }).then((response) => {
          const ratesData = response.data;

          dispatch(setInvoiceAmountBackend(ratesData.invoiceAmount));
          if (ratesData.rateType == "F") {
            if (ratesData.invoiceAmount > 0) {
              dispatch(setInvoiceAmount(ratesData.invoiceAmount));
              dispatch(setInvoiceFlatrate2(ratesData.invoiceRate));
              dispatch(setInvoiceReturnFlatRate(ratesData.invoiceReturnFlatRate));
              dispatch(setInvoiceMinimumRate(ratesData.invoiceMinimumRate));
            }
            setIsInvoiceMileageRate(false);
            dispatch(setIsInvoiceMileageRateRedux(false));
            resetInvoiceMileageData();
          } else if (ratesData.rateType == "M" || ratesData.rateType == "N") {
            if (ratesData.invoiceAmount > 0) {
              checkAndSetInvoiceAmount(ratesData);
            } else {
              setIsInvoiceMileageRate(false);
              dispatch(setIsInvoiceMileageRateRedux(false));
              checkAndSetInvoiceAmount("");
              resetInvoiceMileageData();
            }
          }
        });
      } else {
        dispatch(setInvoiceAmount(0));
      }
    } else {
    }
  };

  /**
   *  Calculate Driver Amount
   */
  const getDriverAmount = () => {
    // Driver Amount

    if (
      driverRateStructure !== "" &&
      (driverFlatrate === 0 || driverFlatrate === "") &&
      (pickupAtPlant || pickupDealersFK !== null) &&
      (deliverToPlant || deliveryDealersFK !== null)
    ) {
      if (driverMiles > 0) {
        OrderEntryService.calculateInvoiceAmount({
          driverRateStructure: driverRateStructure,
          supplementalRateStructure: supplementalRateStructure !== "" ? supplementalRateStructure : null,
          specialRateStructure: specialRateStructure !== "" ? specialRateStructure : null,
          additionalRateStructure: additionalRateStructure !== "" ? additionalRateStructure : null,
          returnRates: returnRates,
          reload: reload,
          driverMiles: driverMiles,
          pickupAtPlant: pickupAtPlant,
          driverCDLARate: driverCDLASurcharge,
          driverUSCNSurcharge: driverUSCNSurcharge,
          driverFuelSurcharge: driverFuelSurcharge,
          driverELDFee: driverELD,
          invoice: false,
          unitTypeLength: unitTypeLength,
          brokerType: brokerType,
        }).then((response) => {
          const ratesData = response.data;

          if (ratesData.rateType == "F") {
            if (ratesData.driverAmount > 0) {
              dispatch(setDriverAmount(ratesData.driverAmount));
              dispatch(setDriverFlatrate2(ratesData.driverRate));
              dispatch(setDriverReturnFlatRate(ratesData.driverReturnFlatRate));
              dispatch(setDriverMinimumRate(ratesData.invoiceMinimumRate));
            }
            setIsDriverMileageRate(false);
            dispatch(setIsDriverMileageRateRedux(false));
            resetDriverMileageData();
          } else if (ratesData.rateType == "M" || ratesData.rateType == "N") {
            if (ratesData.driverAmount > 0) {
              checkAndSetDriverAmount(ratesData);
            } else {
              setIsDriverMileageRate(false);
              dispatch(setIsDriverMileageRateRedux(false));
              checkAndSetDriverAmount("");
              resetDriverMileageData();
            }
          }
        });
      } else {
        dispatch(setDriverAmount(0));
        dispatch(setDriverFuelSurchargeAmount(""));
      }
    } else {
    }
  };

  /**
   * Calculating Invoice Amount and Driver Amount
   */
  const getInvoiceAndDriverAmount = () => {
    // Invoice Amount

    if (invoiceFlatrate > 0) {
      if (invoiceRateStructure !== "" && (invoiceFlatrate === 0 || invoiceFlatrate === "")) {
        if (invoiceMiles > 0) {
          let ratesData = OrderEntryService.calculateInvoiceAmount({
            invoiceRateStructure: invoiceRateStructure,
            supplementalRateStructure: supplementalRateStructure !== "" ? supplementalRateStructure : null,
            specialRateStructure: specialRateStructure !== "" ? specialRateStructure : null,
            additionalRateStructure: additionalRateStructure !== "" ? additionalRateStructure : null,
            returnRates: returnRates,
            reload: reload,
            invoiceMiles: invoiceMiles,
            pickupAtPlant: pickupAtPlant,
            invoiceCDLARate: invoiceCDLASurcharge,
            invoiceUSCNSurcharge: invoiceUSCNSurcharge,
            invoiceFuelSurcharge: invoiceFuelSurcharge,
            portEscortFee: portEscortFee,
            invoiceELDFee: invoiceELD,
            driverELDFee: driverELD,
            invoice: true,
            unitTypeLength: unitTypeLength,
            brokerType: brokerType,
          });

          if (ratesData.rateType == "F") {
            if (ratesData.invoiceAmount > 0) {
              dispatch(setInvoiceAmount(ratesData.invoiceAmount));
              dispatch(setInvoiceFlatrate2(ratesData.invoiceRate));
              dispatch(setInvoiceReturnFlatRate(ratesData.invoiceReturnFlatRate));
            }
            setIsInvoiceMileageRate(false);
            dispatch(setIsInvoiceMileageRateRedux(false));
            resetInvoiceMileageData();
          } else if (ratesData.rateType == "M" || ratesData.rateType == "N") {
            if (ratesData.invoiceAmount > 0) {
              checkAndSetInvoiceAmount(ratesData);
            } else {
              setIsInvoiceMileageRate(false);
              dispatch(setIsInvoiceMileageRateRedux(false));
              checkAndSetInvoiceAmount("");
              resetInvoiceMileageData();
            }
          }
        } else {
          dispatch(setInvoiceAmount(0));
        }
      } else {
      }

      // Driver Amount

      let grossDriverAmount = driverFlatrate + driverUSCNSurcharge;
      dispatch(setDriverAmount(grossDriverAmount));
    } else if (driverRateStructure !== "" && (driverFlatrate === 0 || driverFlatrate === "")) {
      if (driverMiles > 0) {
        let ratesData = OrderEntryService.calculateInvoiceAmount({
          driverRateStructure: driverRateStructure,
          supplementalRateStructure: supplementalRateStructure !== "" ? supplementalRateStructure : null,
          specialRateStructure: specialRateStructure !== "" ? specialRateStructure : null,
          additionalRateStructure: additionalRateStructure !== "" ? additionalRateStructure : null,
          returnRates: returnRates,
          reload: reload,
          driverMiles: driverMiles,
          pickupAtPlant: pickupAtPlant,
          driverCDLARate: driverCDLASurcharge,
          driverUSCNSurcharge: driverUSCNSurcharge,
          driverFuelSurcharge: driverFuelSurcharge,
          driverELDFee: driverELD,
          invoice: false,
          unitTypeLength: unitTypeLength,
          brokerType: brokerType,
        });

        if (ratesData.rateType == "F") {
          if (ratesData.driverAmount > 0) {
            dispatch(setDriverAmount(ratesData.driverAmount));
            dispatch(setDriverFlatrate2(ratesData.driverRate));
            dispatch(setDriverReturnFlatRate(ratesData.driverReturnFlatRate));
          }
          setIsDriverMileageRate(false);
          dispatch(setIsDriverMileageRateRedux(false));
          resetDriverMileageData();
        } else if (ratesData.rateType == "M" || ratesData.rateType == "N") {
          if (ratesData.driverAmount > 0) {
            checkAndSetDriverAmount(ratesData);
          } else {
            setIsDriverMileageRate(false);
            dispatch(setIsDriverMileageRateRedux(false));
            checkAndSetDriverAmount("");
            resetDriverMileageData();
          }
        }
      } else {
        dispatch(setDriverAmount(0));
        dispatch(setDriverFuelSurchargeAmount(""));
      }
    } else {
    }
  };

  const minMaxCalculation = (value, min, max) => {
    if (!value) return value;

    const number = value.replace(/[^\d]/g, "");
    if (number > max) return max;
    else if (number < min) return min;
    else return number;
  };

  const isValidDecimal = (value) => {
    if (value === "" || value === "0") return true;

    // 1–5 digits with optional .xx  OR  leading dot with 1–2 digits
    const regexp = /^(?:\d{1,5}(?:\.\d{1,2})?|\.\d{1,2})$/;
    return regexp.test(value);
  };

  //edited by akhil
  const isValidDecimalforNine = (value) => {
    if (value === "" || value === "0") return true;

    // 1–7 digits with optional .xx  OR  leading dot with 1–2 digits
    const regexp = /^(?:\d{1,7}(?:\.\d{1,2})?|\.\d{1,2})$/;
    return regexp.test(value);

    // var regexp = /^\d{0,7}(\.\d{0,2})?$/;
    // if (regexp.test(value)) {
    //   return true;
    // } else {
    //   return false;
    // }
  };

  const between = (x, min, max) => {
    return x >= min && x <= max;
  };

  // Set Miles Adjustment
  const setMilesAdjustment = (data) => {
    if (data.invoiceMiles > 0) {
      let invoiceMiles = data.invoiceMiles + invoiceMilesAdjustment;
      dispatch(setInvoiceMiles(invoiceMiles));
      dispatch(setDefaultInvoiceMiles(invoiceMiles));
    } else {
      dispatch(setInvoiceMiles(data.invoiceMiles ? Number(data.invoiceMiles) : 0));
      dispatch(setDefaultInvoiceMiles(data.invoiceMiles ? Number(data.invoiceMiles) : 0));
    }
    if (data.driverMiles > 0) {
      let driverMiles = data.driverMiles + driverMilesAdjustment;

      dispatch(setDriverMiles(driverMiles));
      dispatch(setDefaultDriverMiles(driverMiles));
    } else {
      dispatch(setDriverMiles(data.driverMiles ? data.driverMiles : 0));
      dispatch(setDefaultDriverMiles(data.driverMiles ? data.driverMiles : 0));
    }
  };

  /**
   * Used for Special Code selection AutoComplete
   */
  const fetchSpecialCodeByName = (string) => {
    if (unitTypeFK !== "") {
      OrderEntryService.fetchSpecialCodeByName(string, pageNumber)
        .then((response) => {
          const data = response.data.content;
          const trimmedList = data?.map((specialCode) => ({
            ...specialCode,
            description: specialCode.description?.trim(),
          }));
          setSpecialCodeList(trimmedList);
        })
        .catch((err) => {});
    }
  };

  /**
   * Used for Pickup Dealer selection AutoComplete
   */
  const fetchPickupDealerByName = (string) => {
    setPickupDealerLoading(true);
    if (unitTypeFK !== "") {
      OrderEntryService.fetchPickupDealerByName(string, pageNumber, pickupDealersearchType)
        .then((response) => {
          const data = response.data.content;
          const trimmedList = data?.map((dealer) => ({ ...dealer, name: dealer.name?.trim() }));
          setPickupDealerList(trimmedList);
          setPickupDealerLoading(false);
        })
        .catch((err) => {
          setPickupDealerLoading(false);
        });
    }
  };

  /**
   * Used for Delivery Dealer selection AutoComplete
   */
  const fetchDeliveryDealerByName = async (string) => {
    setDeliveryDealerLoading(true);
    if (unitTypeFK !== "") {
      await OrderEntryService.fetchPickupDealerByName(string, pageNumber, deliveryDealersearchType)
        .then((response) => {
          const data = response.data.content;
          const trimmedList = data?.map((dealer) => ({ ...dealer, name: dealer.name?.trim() }));
          setDeliveryDealersList(trimmedList);
          setDeliveryDealerLoading(false);
        })
        .catch((err) => {
          setDeliveryDealerLoading(false);
        });
    }
  };
  /**
   * Used for Broker selection AutoComplete
   */
  const fetchBrokerByName = (string) => {
    if (unitTypeFK !== "") {
      setBrokerLoading(true);
      OrderEntryService.fetchBrokerByName(string, pageNumber, brokerType)
        .then((response) => {
          const data = response.data.content;
          const trimmedList = data?.map((broker) => ({ ...broker, name: broker.name?.trim() }));
          setBrokerList(trimmedList);
        })
        .catch((err) => {})
        .finally(() => {
          setBrokerLoading(false);
        });
    }
  };
  /**
   * Used for Broker selection AutoComplete
   */
  const fetchPortOfEntryByName = (string) => {
    if (unitTypeFK !== "") {
      setPortOfEntryLoading(true);
      OrderEntryService.fetchPortOfEntryByName(string, pageNumber, brokerType)
        .then((response) => {
          const data = response.data.content;
          const trimmedList = data?.map((port) => ({ ...port, usCity: port.usCity?.trim() }));
          setPortOfEntryList(trimmedList);
        })
        .catch((err) => {})
        .finally(() => {
          setPortOfEntryLoading(false);
        });
    }
  };
  /**
   * Used for UnitType selection AutoComplete
   */
  const fetchUnitTypeByName = async (string) => {
    if (selectedCustomerId != null) {
      if (customerRatesList.length > 0) {
        setUnitTypeLoading(true);
        OrderEntryService.fetchUnitTypesByCustomerAuto(
          selectedCustomerId,
          selectedCustomerBillingPlantId,
          pageNumber,
          string,
          selectedSearchCriteria,
          hasRates,
          towable,
          multiUnit
        )
          .then((res) => {
            const trimmedList = res.data.content?.map((unitType) => ({
              ...unitType,
              descriptionLong: unitType.descriptionLong?.trim(),
            }));
            setUnitTypesList(trimmedList);
          })
          .finally(() => {
            setUnitTypeLoading(false);
          });
      } else {
        setUnitTypeLoading(true);
        OrderEntryService.findAllUnitTypes(
          pageNumber,
          string,
          selectedSearchCriteria,
          hasRates,
          null,
          null,
          false,
          false
        )
          .then((res) => {
            const trimmedList = res.data.content?.map((unitType) => ({
              ...unitType,
              descriptionLong: unitType.descriptionLong?.trim(),
            }));
            setUnitTypesList(trimmedList);
          })
          .finally(() => {
            setUnitTypeLoading(false);
          });
      }
    }
  };

  /**
   * Fetch Bulk Invoice By Id
   * Set PO NUmber and Project Code
   */
  const getBulkInvoiceById = (bulkInvoiceFK) => {
    if (bulkInvoiceFK !== null && bulkInvoiceFK !== "") {
      CustomerBulkInvoice.getBulkInvoicesEdit(bulkInvoiceFK)
        .then((response) => {
          const data = response.data;
          setPoNumberFromBulkInvoice(data?.poNumber || "");
          setProjectCodeFromBulkInvoice(data?.projectCode || "");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  /**
   * Fetch Regular dealer by id and
   * Set TWIC from Delivery Dealers record
   */
  const getRegularDealerById = (deliveryDealerFK) => {
    if (deliveryDealerFK !== null && deliveryDealerFK !== "" && selectedDeliveryDealer !== null) {
      setDealerTWIC(selectedDeliveryDealer.twicRequired);

      // For Reference
      // DealerService.getDealerById(deliveryDealerFK)
      //   .then((response) => {
      //     const data = response.data;
      //     setDealerTWIC(data ? data.twicRequired : "");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  };

  const getCustomerRatesDataByCustomerId = (customerId) => {
    if (customerId != null) {
      OrderEntryService.getCustomerRatesDataByCustomerId(customerId)
        .then((response) => {
          const data = response.data;
          dispatch(setCustomerRatesList(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getCustomerDealerData = (deliveryDealerPK, pickupDealerPK) => {
    OrderEntryService.getCustomerDealerData(
      selectedCustomerId,
      pickupDealerPK,
      deliveryDealerPK,
      null,
      null
    ).then((response) => {
      const data = response.data;
      setCustomerDealerList(data);
    });
  };

  const fetchInvoiceAndDriverMiles = (
    pickupDealerFK,
    deliveryDealerFK,
    selectedCustomerId,
    isCustUsePlants,
    pickupCustomerPlantId,
    deliveryCustomerPlantId,
    selectedCustomerBillingPlantId,
    isMilesLowBoy
  ) => {
    OrderEntryService.fetchInvoiceAndDriverMiles(
      pickupDealerFK,
      deliveryDealerFK,
      selectedCustomerId,
      isCustUsePlants,
      pickupCustomerPlantId,
      deliveryCustomerPlantId,
      selectedCustomerBillingPlantId,
      isMilesLowBoy
    )
      .then((res) => {
        if (res != null && res.data !== "") {
          const data = res.data;
          if (
            pickupCustomerPlantId !== null &&
            pickupCustomerPlantId !== undefined &&
            pickupCustomerPlantId !== "" &&
            deliveryCustomerPlantId !== null &&
            deliveryCustomerPlantId !== undefined &&
            deliveryCustomerPlantId !== ""
          ) {
            dispatch(setInvoiceMiles(data.miles ? data.miles : 0));
            dispatch(setDriverMiles(data.miles ? data.miles : 0));
            if (data.miles > 0) {
              setIsDefaultInvoiceMiles(true);
              dispatch(setIsDefaultInvoiceMilesRedux(true));
            }
            if (data.miles > 0) {
              setIsDefaultDriverMiles(true);
              dispatch(setIsDefaultDriverMilesRedux(true));
            }
          } else {
            dispatch(setInvoiceMiles(data.invoiceMiles ? Number(data.invoiceMiles) : 0));
            dispatch(setDriverMiles(data.driverMiles ? data.driverMiles : 0));
          }

          // Setting Defaults
          if (data.invoiceMiles > 0) {
            setIsDefaultInvoiceMiles(true);
            dispatch(setIsDefaultInvoiceMilesRedux(true));
          } else {
            setIsDefaultInvoiceMiles(false);
            dispatch(setIsDefaultInvoiceMilesRedux(false));
          }
          if (data.driverMiles > 0) {
            setIsDefaultDriverMiles(true);
            dispatch(setIsDefaultDriverMilesRedux(true));
          } else {
            setIsDefaultDriverMiles(false);
            dispatch(setIsDefaultDriverMilesRedux(false));
          }
        } else {
          // To fix bug of miles and rate changing to zero while changing gvwr.
          // dispatch(setInvoiceMiles(0)) commented for fix Multiunit check miles clear issue
          // dispatch(setDriverMiles(0))
          setIsDefaultInvoiceMiles(false);
          dispatch(setIsDefaultInvoiceMilesRedux(false));
          setIsDefaultDriverMiles(false);
          dispatch(setIsDefaultDriverMilesRedux(false));
        }
      })
      .catch((err) => {
        console.log(err, "error in fetch miles");
      });
  };
  // Set current company from localStorage to redux
  useEffect(() => {
    if (currentCompany) {
      dispatch(setCompanyName(currentCompany?.name));
      dispatch(setInvoiceELDDescription(currentCompany?.eldDescription));
    } else {
      // dispatch(setInvoiceELDDescription(''));
    }
  }, [currentCompany]);

  useEffect(() => {
    if (unitsPerDispatch > 2) {
      setRequireFlatbed(false);
    }
  }, [unitsPerDispatch]);

  const fetchCommission = (
    selectedCustomerId,
    pickupDealerFK,
    deliveryDealerFK,
    pickupCustomerPlantFK,
    deliveryCustomerPlantFK,
    selectedCustomerBillingPlantId
  ) => {
    OrderEntryService.fetchCommission(
      selectedCustomerId,
      deliveryDealerFK,
      pickupDealerFK,
      pickupCustomerPlantFK,
      deliveryCustomerPlantFK,
      selectedCustomerBillingPlantId
    ).then((res) => {
      const data = res.data;

      if (data.commission !== null && Number(data.commission) !== 0) {
        setCommission(data.commission);
        setIsCommissionRequired(true);
        setIsCommissionVisible(false);
      } else {
        setIsCommissionRequired(false);
        setIsCommissionVisible(true);
      }
    });
  };

  const fetchInvoiceAndDriverFlatRates = (
    pickupDealerFK,
    deliveryDealerFK,
    unitTypesFK,
    multiUnit,
    selectedCustomerId,
    isCustUsePlants,
    pickupCustomerPlantId,
    deliveryCustomerPlantId,
    selectedCustomerBillingPlantId,
    unitsPerDispatch,
    invoice2as3,
    isMilesLowBoy
  ) => {
    setLoading(true);
    dispatch(setIsDriverFlatrateVisible(true));
    dispatch(setIsInvoiceFlatrateVisible(true));

    // if ((pickupAtPlant && pickupCustomerPlantId != null && deliveryDealerFK !== null)
    //         || (deliverToPlant && deliveryCustomerPlantId != '' && pickupDealerFK != '')
    //         || (pickupAtPlant && pickupCustomerPlantId != null && deliverToPlant && deliveryCustomerPlantId != null)) {
    //           // dispatch(setIsInvoiceFlatrateVisible(false)) //please add condition here
    //           // dispatch(setIsDriverFlatrateVisible(false)) //please add condition here
    //         } else {
    //           dispatch(setIsInvoiceFlatrateVisible(true)) //please add condition here
    //           dispatch(setIsDriverFlatrateVisible(true)) //please add condition here
    //         }

    OrderEntryService.fetchInvoiceAndDriverFlatRates(
      pickupDealerFK,
      deliveryDealerFK,
      unitTypesFK,
      multiUnit,
      selectedCustomerId,
      isCustUsePlants,
      pickupCustomerPlantId,
      deliveryCustomerPlantId,
      selectedCustomerBillingPlantId,
      unitsPerDispatch,
      invoice2as3,
      isMilesLowBoy,
      GVWR
    )
      .then((res) => {
        if (res != null && res.data !== "") {
          const data = res.data;

          if (data.foddealer != null) {
            dispatch(setFodDealer(data.foddealer));
          } else {
            dispatch(setFodDealer(false));
          }

          //Incomming changes 2443 and 2444
          if (data.invoiceFlatrates !== null && data.invoiceFlatrates > 0)
            dispatch(setInvoiceFlatrate(data.invoiceFlatrates ? data.invoiceFlatrates : 0));

          if (Number(data.invoiceFlatrates) > 0) {
            dispatch(setInvoiceAmount(data.invoiceFlatrates));
          }

          if (data.invoiceFlatrates !== null && data.invoiceFlatrates > 0) {
            dispatch(setInvoiceFlatrate(data.invoiceFlatrates));
            dispatch(setInvoiceAmount(data.invoiceFlatrates));
          }

          if (data.driverFlatrates !== null && data.driverFlatrates > 0) {
            dispatch(setDriverFlatrate(data.driverFlatrates ? data.driverFlatrates : 0));
            dispatch(setDriverAmount(data.driverFlatrates ? data.driverFlatrates : driverAmount));
          }
          dispatch(
            setDealerConnectionFlatrateFK(
              data.dealerConnectionFlatratePK ? data.dealerConnectionFlatratePK : null
            )
          );
          dispatch(setRateType(data.rateType ? data.rateType : "Motorized"));
          //      Setting Flaterate fields Visibility
          if (
            (pickupAtPlant && pickupCustomerPlantId != null && deliveryDealerFK !== null) ||
            (deliverToPlant && deliveryCustomerPlantId != "" && pickupDealerFK != "") ||
            (pickupAtPlant &&
              pickupCustomerPlantId != null &&
              deliverToPlant &&
              deliveryCustomerPlantId != null)
          ) {
            if (data.invoiceFlatrates === 0 || data.invoiceFlatrates === null)
              dispatch(setIsInvoiceFlatrateVisible(true));
            else {
              dispatch(setIsInvoiceFlatrateVisible(false));
              setIsDefaultInvoiceFlatrates(true);
            }

            if (data.driverFlatrates == 0 || data.driverFlatrates === null)
              dispatch(setIsDriverFlatrateVisible(true));
            else {
              dispatch(setIsDriverFlatrateVisible(false));
              setIsDefaultDriverFlatrates(true);
            }
          } else if (pickupDealerFK != "" && deliveryDealerFK !== null) {
            if (data.invoiceFlatrates > 0) setIsDefaultInvoiceFlatrates(true);
            if (data.driverFlatrates > 0) setIsDefaultDriverFlatrates(true);

            dispatch(setIsInvoiceFlatrateVisible(true));
            dispatch(setIsDriverFlatrateVisible(true));
          }
        } else {
          //To fix rates clearing while clearing gvwr
          // Commenting out for pc miler optimize button bugfix (10/08/25)
          // dispatch(setInvoiceFlatrate(0));
          // dispatch(setDriverFlatrate(0));
          setIsDefaultInvoiceFlatrates(false);
          setIsDefaultDriverFlatrates(false);
          dispatch(setDealerConnectionFlatrateFK(null));
          dispatch(setRateType("Motorized"));
          dispatch(setIsInvoiceFlatrateVisible(true));
          dispatch(setIsDriverFlatrateVisible(true));
          // setPortEscortFee('');
        }
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchCustomerRates = async (unitTypesFK, selectedCustomerId, invoiceRates, driverRates) => {
    const response = OrderEntryService.fetchCustomerRates(
      unitTypesFK,
      selectedCustomerId,
      invoiceRates,
      driverRates,
      selectedCustomerBillingPlantId,
      multiUnit,
      unitsPerDispatch,
      invoice2as3
    );

    const responseData = (await response).data;
    return responseData;
  };

  //  Fetch Supplementory Rates by Dealer, DealerGroup, State
  const fetchSupplementalRates = (unitTypesFK, selectedCustomerId, deliveryDealerFK, stateCode) => {
    OrderEntryService.fetchSupplementalRates(
      unitTypesFK,
      selectedCustomerId,
      selectedCustomerBillingPlantId,
      deliveryDealerFK,
      stateCode,
      reload,
      returnRates
    ).then((res) => {
      if (res !== null && res.data !== "") {
        const data = res.data;
        setSupplementalRateStructure(data);
      } else {
        setSupplementalRateStructure("");
      }
    });
  };

  const fetchAdditionalRates = (unitTypesFK, selectedCustomerId) => {
    OrderEntryService.fetchAdditionalRates(
      unitTypesFK,
      selectedCustomerId,
      selectedCustomerBillingPlantId,
      reload,
      returnRates
    ).then((res) => {
      if (res !== null && res.data !== "") {
        const data = res.data;
        setAdditionalRateStructure(data);
      } else {
        setAdditionalRateStructure("");
      }
    });
  };

  const fetchSpecialRates = (unitTypesFK, selectedCustomerId, specialCodeFK) => {
    OrderEntryService.fetchSpecialRates(
      unitTypesFK,
      selectedCustomerId,
      selectedCustomerBillingPlantId,
      specialCodeFK,
      reload,
      returnRates
    ).then((res) => {
      if (res !== null && res.data !== "") {
        const data = res.data;
        setSpecialRateStructure(data);
      } else {
        setSpecialRateStructure("");
      }
    });
  };

  // const fetchCompanyDetails = () => {
  //   OrderEntryService.fetchCompanyDetails("Horizon Transport")
  //     .then((res) => {
  //       if (res !== null && res.data !== '') {
  //         const data = res.data;
  //         dispatch(setCompanyName(data.name))
  //         if (ELDRequiredRedux) dispatch(setInvoiceELDDescription(data.eldDescription));
  //         else dispatch(setInvoiceELDDescription(''))
  //       } else dispatch(setInvoiceELDDescription(''))
  //     })
  // }
  //  For set Normal Rates and  Split Rates
  const setCustomerRates = async (unitTypesFK, selectedCustomerId) => {
    const data = await fetchCustomerRates(unitTypesFK, selectedCustomerId, false, false);
    if (data != null) {
      setCustomerRateStructure(data);
      dispatch(setCustomerRateStructureRedux(data));

      let invoiceBaseRate = 0;
      if (returnRates) invoiceBaseRate = data.invoiceReturnRate1;
      else invoiceBaseRate = data.invoiceRate1;

      if (data.invoiceRates && invoiceBaseRate > 0) {
        setInvoiceRateStructure(data);
        setIsInvoiceMileageRate(true);
        dispatch(setIsInvoiceMileageRateRedux(true));
        dispatch(setInvoiceCustomerRateFK(data.customerRatePK));
      } else {
        fetchCustomerRates(
          unitTypesFK,
          selectedCustomerId,
          true,
          false,
          selectedCustomerBillingPlantId,
          multiUnit,
          unitsPerDispatch,
          invoice2as3
        ).then((invoiceRatesData) => {
          if (invoiceRatesData !== null) {
            let invoiceBaseRate = 0;
            if (returnRates) invoiceBaseRate = invoiceRatesData.invoiceReturnRate1;
            else invoiceBaseRate = invoiceRatesData.invoiceRate1;

            if (invoiceRatesData.invoiceRates && invoiceBaseRate > 0) {
              setInvoiceRateStructure(invoiceRatesData);
              setIsInvoiceMileageRate(true);
              dispatch(setIsInvoiceMileageRateRedux(true));
              dispatch(setInvoiceCustomerRateFK(invoiceRatesData.customerRatePK));
            } else {
              setIsInvoiceMileageRate(false);
              dispatch(setIsInvoiceMileageRateRedux(false));
            }
          }
        });
      }

      let driverBaseRate = 0;
      if (returnRates) driverBaseRate = data.driverReturnRate1;
      else driverBaseRate = data.driverRate1;

      if (data.driverRates && driverBaseRate > 0) {
        setDriverRateStructure(data);
        setIsDriverMileageRate(true);
        dispatch(setIsDriverMileageRateRedux(true));
        dispatch(setDriverCustomerRateFK(data.customerRatePK));
      } else {
        fetchCustomerRates(
          unitTypesFK,
          selectedCustomerId,
          false,
          true,
          selectedCustomerBillingPlantId,
          multiUnit,
          unitsPerDispatch,
          invoice2as3
        ).then((driverRatesData) => {
          if (driverRatesData !== null) {
            let driverBaseRate = 0;
            if (returnRates) driverBaseRate = driverRatesData.driverReturnRate1;
            else driverBaseRate = driverRatesData.driverRate1;

            if (driverRatesData.driverRates && driverBaseRate > 0) {
              setDriverRateStructure(driverRatesData);
              setIsDriverMileageRate(true);
              dispatch(setIsDriverMileageRateRedux(true));
              dispatch(setDriverCustomerRateFK(driverRatesData.customerRatePK));
            } else {
              setIsDriverMileageRate(false);
              dispatch(setIsDriverMileageRateRedux(false));
            }
          }
        });
      }
    } else {
      setIsInvoiceMileageRate(false);
      dispatch(setIsInvoiceMileageRateRedux(false));
      setIsDriverMileageRate(false);
      dispatch(setIsDriverMileageRateRedux(false));
    }
  };

  const callHandleInvoiceAmt = () => {
    // setErrorMsg("");
    dispatch(setFlatRateErrorMsg(""));
    handleFlatRateOverride();
  };

  const setInvoiceMilesFromData = (data) => {
    dispatch(setInvoiceMiles(data.invoiceMiles ? Number(data.invoiceMiles) : 0));
    dispatch(setDriverMiles(data.driverMiles ? data.driverMiles : 0));
    if (data.invoiceMiles > 0) {
      setIsDefaultInvoiceMiles(true);
      dispatch(setIsDefaultInvoiceMilesRedux(true));
    } else {
      setIsDefaultInvoiceMiles(false);
      dispatch(setIsDefaultInvoiceMilesRedux(false));
    }
    if (data.driverMiles > 0) {
      setIsDefaultDriverMiles(true);
      dispatch(setIsDefaultDriverMilesRedux(true));
    } else {
      setIsDefaultDriverMiles(false);
      dispatch(setIsDefaultDriverMilesRedux(false));
    }
  };

  const hideUnitTypeModal = () => dispatch(setUnitTypeSelection(false));
  const hideSpecialCodeModal = () => dispatch(setSpecialCodeSelection(false));
  const hidePickupDealer1Modal = () => dispatch(setPickupDealerSelection1(false));
  const hideDeliveryDealer1Modal = () => dispatch(setDeliveryDealerSelection1(false));
  const hideBrokerModal = () => dispatch(setBrokerSelection(false));
  const hidePortOfEntryModal = () => dispatch(setPortOfEntrySelection(false));
  const hideUnitMultiLoadModal = () => dispatch(setUnitMultiLoadSelection(false));

  const handleInvalidDateClose = () => {
    switch (invalidDateLabel) {
      case "earliestPickUpDate":
        setEarliestPickUpDate("");
        break;
      case "latestPickUpDate":
        if (latestPickUpDateDefault !== "") {
          setIsLatestPickupDateDefault(true);
          setTimeout(() => {
            setLatestPickUpDate(latestPickUpDateDefault);
            setIsLatestPickupDateDefault(false);
          }, 350);
        } else setLatestPickUpDate("");
        break;
      case "latestDeliveryDate":
        if (latestDeliveryDateDefault !== "") {
          setIsLatestDeliveryDateDefault(true);
          setTimeout(() => {
            setLatestDeliveryDate(latestDeliveryDateDefault);
            setIsLatestDeliveryDateDefault(false);
          }, 350);
        } else setLatestDeliveryDate("");
        break;
      case "earliestDeliveryDate":
        setEarliestDeliveryDate("");
        break;

      case "deliveryByDate":
        setDeliveryByDate("");
        break;

      default:
        break;
    }
    setInvalidDate(false);
  };

  /** USE EFFECTS */

  /**
   * Send Customer and Shuttle BOL Email when Customer changes
   */

  useEffect(() => {
    if (selectedCustomerId !== null && selectedCustomerId !== "") {
      OrderEntryService.sendNotificationMail("Bol");
      OrderEntryService.sendNotificationMail("Shuttle");
    }
  }, [selectedCustomerId]);

  useEffect(() => {
    if (isCustomerMisc) {
      setInvoiceDealerBreakdown(true);
      setcontactDealerDelay(true);
    }
  }, [isCustomerMisc]);

  useEffect(() => {
    if (filteredUnitMultiLoadList.length > 1) {
      handleUnitMultiLOadDefault();
    }
  }, [filteredUnitMultiLoadList]);

  useEffect(() => {
    handleAmountExceedsPercentage();
  }, [driverAmount, invoiceAmount]);

  /**
   * Setting Visibility of Driver Tolls and Driver Permits
   */
  useEffect(() => {
    if (!selectedCustomerId) return;

    const delay = setTimeout(() => {
      if (selectedCustomerAllData !== null) {
        // If Non FOD Invoice Mileage
        if (!isFODInvoice && isInvoiceMileageRate) {
          // Set Driver Tolls and Permits Visibility for Mileage
          setDriverTollsPermitsVisibilityForMileage();
        }

        // If Non FOD Invoice Flatrate
        if (!isFODInvoice && !isInvoiceMileageRate) {
          // Set Driver Tolls and Permits Visibility for Flatrate
          setDriverTollsPermitsVisibilityForFlatrate();
        }

        // If FOD Invoice Mileage

        if (isFODInvoice && isInvoiceMileageRate) {
          setDriverTollsPermitsVisibilityForFODMileage();
        }
        // Setting Tolls Permits switches for FOD and Non FOD Units
        setTollsPermitsWashOnSaveObject();
      }
    }, 300); // Debounce time of 300ms

    return () => clearTimeout(delay);
  }, [selectedCustomerAllData, isFODInvoice, isInvoiceMileageRate, selectedCustomerId]);

  /**
   * Set Required IFTA based on GVWR
   */
  useEffect(() => {
    setIFTADefault();
  }, [GVWR]);

  useEffect(() => {
    if (isDefaultInvoiceFlatrates && invoiceFlatrate > 0) {
      let grossInvoiceAmount = invoiceFlatrate + invoiceUSCNSurcharge;
    }
  }, [isDefaultInvoiceFlatrates, invoiceFlatrate]);

  useEffect(() => {
    if (isDefaultDriverFlatrates && driverFlatrate > 0) {
      let grossDriverAmount = driverFlatrate + driverUSCNSurcharge;
      dispatch(setDriverAmount(grossDriverAmount));
    }
  }, [isDefaultDriverFlatrates, driverFlatrate]);

  useEffect(() => {}, [requiredCDLA]);

  useEffect(() => {
    if (commission > 0 && selectedCustomerAllData !== null) {
      if (
        selectedCustomerAllData.generateCommision !== "N" &&
        selectedCustomerAllData.payCommissionToDriver
      ) {
        dispatch(setCommissionDriverFK(selectedCustomerAllData.commissionDriverFK));
      }
    }
  }, [commission]);

  useEffect(() => {
    setTollsPermitsWash();
  }, [customerDealerList]);

  useEffect(() => {
    if (!shuttleFromYard) {
      setInvalidDateLabel("deliveryByDate");
      handleInvalidDateClose();
    }
  }, [shuttleFromYard]);

  useEffect(() => {
    if (
      deliveryByDate !== "" &&
      (deliveryDealerFK !== null ||
        (miscDelivery && selectedDeliveryDealer !== null) ||
        (deliverToPlant && deliveryCustomerPlantId !== null && deliveryCustomerYardId == null))
    ) {
      OrderEntryService.checkDateValid({
        selectedDate: deliveryByDate,
        deliveryDealerFK: deliveryDealerFK,
        miscellaneousDelivery: miscDelivery,
        selectedUnitAddress: selectedDeliveryDealer,
        deliveryCustomerPlantFK: deliveryCustomerPlantId,
        deliverToPlant: deliverToPlant,
      }).then((res) => {
        const data = res.data;
        if (data.errorMsg) {
          setInvalidDate(true);
          setInvalidDateError(data.errorMsg);
          setInvalidDateLabel("deliveryByDate");
        } else {
          setDeliveryByDate(data.selectedDeliveryDate);
        }
      });
    }
  }, [deliveryByDate]);

  useEffect(() => {
    if (
      selectedCustomerAllData !== null &&
      selectedCustomerAllData.reloadDays > 0 &&
      miscellaneousPickup &&
      selectedPickupDealer !== null &&
      !pickupAtPlant &&
      reload
    ) {
      if (
        selectedPickupDealer.openMonday ||
        selectedPickupDealer.openTuesday ||
        selectedPickupDealer.openWednesday ||
        selectedPickupDealer.openThursday ||
        selectedPickupDealer.openFriday ||
        selectedPickupDealer.openSaturday ||
        selectedPickupDealer.openSunday
      ) {
        const defaultLatestPickupDate = new Date();
        defaultLatestPickupDate.setDate(
          defaultLatestPickupDate.getDate() + selectedCustomerAllData.reloadDays
        );
        setIsLatestPickupDateDefault(true);
        setLatestPickUpDateDefault(defaultLatestPickupDate);

        OrderEntryService.checkDefaultDateValid({
          selectedDate: formatForApi(defaultLatestPickupDate),
          pickupDealerFK: pickupDealerFK,
          miscellaneousPickup: miscellaneousPickup,
          selectedUnitAddress: selectedPickupDealer,
        }).then((res) => {
          const data = res.data;
          setLatestPickUpDate(data.selectedPickupDate);
          setIsLatestPickupDateDefault(false);
          setLatestPickUpDateDefault(data.selectedPickupDate);
        });
      }
    }
  }, [selectedPickupDealer, reload, pickupAtPlant]);

  useEffect(() => {
    if (
      selectedCustomerAllData !== null &&
      selectedCustomerAllData.deliverByDays > 0 &&
      miscDelivery &&
      selectedDeliveryDealer !== null &&
      !pickupAtPlant &&
      reload
    ) {
      if (
        selectedPickupDealer.openMonday ||
        selectedPickupDealer.openTuesday ||
        selectedPickupDealer.openWednesday ||
        selectedPickupDealer.openThursday ||
        selectedPickupDealer.openFriday ||
        selectedPickupDealer.openSaturday ||
        selectedPickupDealer.openSunday
      ) {
        const defaultLatestDeliveryDate = new Date();
        defaultLatestDeliveryDate.setDate(
          defaultLatestDeliveryDate.getDate() + selectedCustomerAllData.deliverByDays
        );
        setIsLatestDeliveryDateDefault(true);
        setLatestDeliveryDateDefault(defaultLatestDeliveryDate);

        OrderEntryService.checkDefaultDateValid({
          selectedDate: formatForApi(defaultLatestDeliveryDate),
          deliveryDealerFK: deliveryDealerFK,
          miles: driverMiles,
          pickupDate: latestPickUpDate,
          miscellaneousDelivery: miscDelivery,
          selectedUnitAddress: selectedDeliveryDealer,
        }).then((res) => {
          const data = res.data;
          setLatestDeliveryDate(data.selectedDeliveryDate);
          setIsLatestDeliveryDateDefault(false);
          setLatestDeliveryDateDefault(data.selectedDeliveryDate);
        });
      }
    }
  }, [selectedDeliveryDealer, driverMiles, reload, pickupAtPlant]);

  useEffect(() => {
    if (
      selectedCustomerAllData !== null &&
      selectedCustomerAllData.reloadDays > 0 &&
      pickupDealerFK !== null &&
      !pickupAtPlant &&
      reload
    ) {
      const defaultLatestPickupDate = new Date();
      defaultLatestPickupDate.setDate(defaultLatestPickupDate.getDate() + selectedCustomerAllData.reloadDays);
      setIsLatestPickupDateDefault(true);
      setLatestPickUpDateDefault(defaultLatestPickupDate);

      OrderEntryService.checkDefaultDateValid({
        selectedDate: formatForApi(defaultLatestPickupDate),
        pickupDealerFK: pickupDealerFK,
      }).then((res) => {
        const data = res.data;
        setLatestPickUpDate(data.selectedPickupDate);
        setIsLatestPickupDateDefault(false);
        setLatestPickUpDateDefault(data.selectedPickupDate);
      });
    }
  }, [pickupDealerFK, reload, pickupAtPlant]);

  useEffect(() => {
    if (
      selectedCustomerAllData !== null &&
      selectedCustomerAllData.deliverByDays > 0 &&
      deliveryDealerFK !== null &&
      !pickupAtPlant &&
      reload
    ) {
      const defaultLatestDeliveryDate = new Date();
      defaultLatestDeliveryDate.setDate(
        defaultLatestDeliveryDate.getDate() + selectedCustomerAllData.deliverByDays
      );
      setIsLatestDeliveryDateDefault(true);
      setLatestDeliveryDateDefault(defaultLatestDeliveryDate);

      OrderEntryService.checkDefaultDateValid({
        selectedDate: formatForApi(defaultLatestDeliveryDate),
        deliveryDealerFK: deliveryDealerFK,
        miles: driverMiles,
        pickupDate: latestPickUpDate,
      }).then((res) => {
        const data = res.data;
        setLatestDeliveryDate(data.selectedDeliveryDate);
        setIsLatestDeliveryDateDefault(false);
        setLatestDeliveryDateDefault(data.selectedDeliveryDate);
      });
    }
  }, [deliveryDealerFK, driverMiles, reload, pickupAtPlant]);

  useEffect(() => {
    if (
      latestPickUpDate !== "" &&
      (pickupDealerFK !== null || (miscellaneousPickup && selectedPickupDealer !== null)) &&
      !isLatestPickupDateDefault
    ) {
      OrderEntryService.checkDateValid({
        selectedDate: latestPickUpDate,
        pickupDealerFK: pickupDealerFK,
        miscellaneousPickup: miscellaneousPickup,
        selectedUnitAddress: selectedPickupDealer,
      }).then((res) => {
        const data = res.data;

        if (data.errorMsg) {
          setInvalidDate(true);
          setInvalidDateError(data.errorMsg);
          setInvalidDateLabel("latestPickUpDate");
        } else {
          setLatestPickUpDate(data.selectedPickupDate);
        }
      });
    }
  }, [latestPickUpDate]);

  useEffect(() => {
    if (
      earliestPickUpDate !== "" &&
      (pickupDealerFK !== null || (miscellaneousPickup && selectedPickupDealer !== null))
    ) {
      OrderEntryService.checkDateValid({
        selectedDate: earliestPickUpDate,
        pickupDealerFK: pickupDealerFK,
        miscellaneousPickup: miscellaneousPickup,
        selectedUnitAddress: selectedPickupDealer,
      }).then((res) => {
        const data = res.data;

        if (data.errorMsg) {
          setInvalidDate(true);
          setInvalidDateError(data.errorMsg);
          setInvalidDateLabel("earliestPickUpDate");
        } else {
          setEarliestPickUpDate(data.selectedPickupDate);
        }
      });
    }
  }, [earliestPickUpDate]);

  useEffect(() => {
    if (
      latestDeliveryDate !== "" &&
      (deliveryDealerFK !== null ||
        (miscDelivery && selectedDeliveryDealer !== null) ||
        (deliverToPlant && deliveryCustomerPlantId !== null)) &&
      !isLatestDeliveryDateDefault
    ) {
      OrderEntryService.checkDateValid({
        selectedDate: latestDeliveryDate,
        deliveryDealerFK: deliveryDealerFK,
        miles: driverMiles,
        pickupDate: latestPickUpDate,
        miscellaneousDelivery: miscDelivery,
        selectedUnitAddress: selectedDeliveryDealer,
        deliveryCustomerPlantFK: deliveryCustomerPlantId,
        deliverToPlant: deliverToPlant,
      }).then((res) => {
        const data = res.data;

        if (data.errorMsg) {
          setInvalidDate(true);
          setInvalidDateError(data.errorMsg);
          setInvalidDateLabel("latestDeliveryDate");
        } else {
          setLatestDeliveryDate(data.selectedDeliveryDate);
        }
      });
    }
  }, [latestDeliveryDate, latestPickUpDate, driverMiles]);

  useEffect(() => {
    if (
      earliestDeliveryDate !== "" &&
      (deliveryDealerFK !== null ||
        (miscDelivery && selectedDeliveryDealer !== null) ||
        (deliverToPlant && deliveryCustomerPlantId !== null))
    ) {
      OrderEntryService.checkDateValid({
        selectedDate: earliestDeliveryDate,
        deliveryDealerFK: deliveryDealerFK,
        miles: driverMiles,
        pickupDate: earliestPickUpDate,
        miscellaneousDelivery: miscDelivery,
        selectedUnitAddress: selectedDeliveryDealer,
        deliveryCustomerPlantFK: deliveryCustomerPlantId,
        deliverToPlant: deliverToPlant,
      }).then((res) => {
        const data = res.data;

        if (data.errorMsg) {
          setInvalidDate(true);
          setInvalidDateError(data.errorMsg);
          setInvalidDateLabel("earliestDeliveryDate");
        } else {
          setEarliestDeliveryDate(data.selectedDeliveryDate);
        }
      });
    }
  }, [earliestDeliveryDate, earliestPickUpDate, driverMiles]);

  useEffect(() => {
    if (DPU || storage || batchLoadCustomerTab) {
      dispatch(setMultiUnilLoad(false));
      setMultiUnit(false);
      setIsMultiUnitDefault(false);
      setUnitMultiLoadList([]);
      setMultiUnitLoadInput("");
      setUnitMultiLoadPK("");
      setInvoice2as3(false);
      setUnitsPerDispatch(2);
    }
  }, [DPU, storage, batchLoadCustomerTab]);

  useEffect(() => {
    if (requiredCDLA) {
      if (towable && reload && !pickupAtPlant) {
        dispatch(setDriverCDLARequiredRedux(true));
      } else dispatch(setDriverCDLARequiredRedux(false));
    } else {
      dispatch(setDriverCDLARequiredRedux(false));
    }
  }, [requiredCDLA, pickupAtPlant, reload, towable]);

  useEffect(() => {
    setInvoiceFuelSurcharge(
      !towable
        ? radioValue == "enginediesel"
          ? invoiceRateStructure.invoiceFuelSurchargeDiesel
          : radioValue == "enginegas"
            ? invoiceRateStructure.invoiceFuelSurchargeGas
            : 0
        : invoiceRateStructure.invoiceFuelSurchargeDiesel
    );
  }, [invoiceRateStructure, radioValue]);

  useEffect(() => {
    setDriverFuelSurcharge(
      !towable
        ? radioValue == "enginediesel"
          ? driverRateStructure.driverFuelSurchargeDiesel
          : radioValue == "enginegas"
            ? driverRateStructure.driverFuelSurchargeGas
            : 0
        : driverRateStructure.driverFuelSurchargeDiesel
    );
  }, [driverRateStructure]);

  useEffect(() => {
    if (selectedSpecialCode === null) {
      setSpecialRateStructure("");
      dispatch(setInvoiceSpecialRate(0));
      dispatch(setInvoiceSpecialFuelSurchargeRate(0));
      dispatch(setInvoiceSpecialDescription(""));
      dispatch(setDriverSpecialRate(0));
      dispatch(setDriverSpecialFuelSurchargeRate(0));
      dispatch(setDriverSpecialDescription(""));
    }
  }, [selectedSpecialCode]);

  useEffect(() => {
    if (driverAmount > 0) {
      if (invoiceAmount > 0) {
        let unitPercentage = Number(driverAmtRedux) / Number(invoiceAmtRedux);
        setUnitPercentage(unitPercentage);
      }
    }
  }, [invoiceAmount, driverAmount]);

  useEffect(() => {
    if (isDefaultInvoiceMiles) dispatch(setDefaultInvoiceMiles(invoiceMiles));
    if (isDefaultDriverMiles) dispatch(setDefaultDriverMiles(driverMiles));
  }, [isDefaultInvoiceMiles, isDefaultDriverMiles]);

  useEffect(() => {
    checkInvoicePercentage();
  }, [selectedCustomerId, selectedUnitType]); // Changeed as multiple calls are going in the backend

  useEffect(() => {
    dispatch(setDriverMilesBalance(driverMiles));
  }, [driverMiles]);

  useEffect(() => {
    if (specialCodeFK !== null && selectedCustomerId !== null && unitTypeFK !== "") {
      fetchSpecialRates(unitTypeFK, selectedCustomerId, specialCodeFK);
    }
  }, [specialCodeFK, reload]);

  //added for errormessage common to Unit and driveby
  useEffect(() => {
    if (errorMsgFromRedux === null || errorMsgFromRedux === undefined || errorMsgFromRedux === "") {
      setErrorFlag(false);
    } else {
      setErrorFlag(true);
    }
  }, [errorMsgFromRedux]);

  useEffect(() => {
    if (unitsPerDispatch !== "" && unitTypeFK !== "" && selectedCustomerId !== null)
      setCustomerRates(unitTypeFK, selectedCustomerId);
  }, [multiUnit, invoice2as3, unitsPerDispatch]);

  // useEffect(() => {
  //    fetchCompanyDetails();
  // }, [ELDRequiredRedux, selectedCustomerId])

  useEffect(() => {
    if (selectedCustomerId) {
      if (unitTypeFK !== "") {
        setCustomerRates(unitTypeFK, selectedCustomerId);
        fetchSpecialCodeByName();
        fetchPickupDealerByName();
        fetchBrokerByName();
        fetchPortOfEntryByName();
        fetchDeliveryDealerByName();
      }
      if (!unitTypeFK) {
        getCustomerRatesDataByCustomerId(selectedCustomerId);
      }
    }
  }, [selectedCustomerId, unitTypeFK, reload, returnRates]);

  useEffect(() => {
    if (selectedCustomerId) {
      if (unitTypeFK !== "") {
        fetchAdditionalRates(unitTypeFK, selectedCustomerId);
      }
    }
  }, [selectedCustomerId, unitTypeFK, reload]);

  /**
   * Tab Validation
   */
  useEffect(() => {
    if (
      unitNum !== "" &&
      unitNum.length >= 5 &&
      unitTypeFK !== "" &&
      !checkUnitNumber &&
      (!customerRequirePO || (poNumber !== null && poNumber !== "")) &&
      (!customerRequireBankClient || (bank !== null && bank !== "")) &&
      (!customerRequireBankClient || (client !== null && client !== "")) &&
      (!isCustomerRequireModel || (model !== null && model !== "")) &&
      (!isCustomerRequireModelCode || (modelCode !== null && modelCode !== "")) &&
      (!isCustomerRequireVIN || (unitVin !== null && unitVin !== "")) &&
      (!isCustomerRequireSerialNum || (serialNumber !== null && serialNumber !== "")) &&
      (!isCustomerRequireStockNum || (stockNumber !== null && stockNumber !== "")) &&
      (!isCommissionRequired || (commission !== null && Number(commission) !== 0)) &&
      isValidDecimal(commission) &&
      (brokerType === "default" ||
        (brokerId !== null && brokerId !== "" && portOfEntryId !== null && portOfEntryId !== "")) &&
      (GVWR === "" || String(GVWR).match(numberGreaterThan0Validation)) &&
      (portEscortFee === "" ||
        portEscortFee === null ||
        (isValidDecimal(portEscortFee) && Number(portEscortFee) > 0)) /* && */ &&
      // ((driverTolls === '' || driverTolls === null) || String(driverTolls).match(numberGreaterThan0Validation)) &&
      // ((driverPermits === '' || driverPermits === null) || String(driverPermits).match(numberGreaterThan0Validation))
      ((pickupAtPlant !== false && pickupCustomerPlantId !== null) ||
        (miscellaneousPickup !== false && miscPickupDealerTabIsValid !== false) ||
        pickupDealerFK !== null) &&
      ((deliverToPlant !== false && deliveryCustomerPlantId != null) ||
        (miscDelivery !== false && miscDeliveryDealerTabIsValid !== false) ||
        deliveryDealerFK !== null) &&
      invoiceMiles > 0 &&
      driverMiles > 0 &&
      (!isDPUCustomer || (commission !== null && commission !== "")) &&
      ((!isInvoiceMileageRate && invoiceFlatrate) || isInvoiceMileageRate) &&
      ((invoiceFlatrate !== "" && isValidDecimal(invoiceFlatrate)) || Number(invoiceFlatrate2) !== 0) &&
      !errorFlag &&
      ((!isDriverMileageRate && driverFlatrate) || isDriverMileageRate) &&
      ((driverFlatrate !== "" && isValidDecimal(driverFlatrate)) || Number(driverFlatrate2) !== 0) &&
      !errorFlag &&
      isValidDecimalforNine(collectForCustomers) &&
      (!collectForCustomers || Number(collectForCustomers) > 0) &&
      isValidDecimal(driverTolls) &&
      (!driverTolls || Number(driverTolls) > 0) &&
      isValidDecimal(driverPermits) &&
      (!driverPermits || Number(driverPermits) > 0) &&
      (parseFloat(driverAmount) < parseFloat(invoiceAmount) ||
        !(Number(unitPercentage) > Number(allowedInvoicePercentageRedux))) &&
      flatRateErrorMsgFromRedux === "" &&
      mileagErrorMsgFromRedux === "" &&
      (multiUnit === false || (multiUnitLoadInput !== "" && multiUnitLoadInput !== undefined)) &&
      unitsPerDispatch &&
      unitsPerDispatch <= 10 &&
      unitsPerDispatch >= 2 &&
      isOrderDateValid &&
      isReleaseDateValid &&
      isDeliveryDateValid &&
      isEarliestPickupDateValid &&
      isLatestPickupDateValid &&
      isEarliestDeliveryDateValid &&
      isLatestDeliveryDateValid
    ) {
      dispatch(setUnitTabIsValid(true));
    } else {
      dispatch(setUnitTabIsValid(false));
    }
  }, [
    unitNum,
    unitTypeFK,
    checkUnitNumber,
    model,
    modelCode,
    unitVin,
    serialNumber,
    stockNumber,
    miscellaneousPickup,
    miscPickupDealerTabIsValid,
    miscDelivery,
    miscDeliveryDealerTabIsValid,
    pickupDealerFK,
    deliveryDealerFK,
    deliverToPlant,
    deliveryCustomerPlantId,
    customerRequireBankClient,
    bank,
    client,
    GVWR,
    driverTolls,
    driverPermits,
    poNumber,
    portEscortFee,
    pickupAtPlant,
    pickupCustomerPlantId,
    invoiceMiles,
    driverMiles,
    storage,
    DPU,
    brokerType,
    brokerId,
    portOfEntryId,
    commission,
    errorFlag,
    driverFlatrate,
    invoiceFlatrate,
    isInvoiceMileageRate,
    isDriverMileageRate,
    isCommissionRequired,
    isDPUCustomer,
    flatRateErrorMsgFromRedux,
    mileagErrorMsgFromRedux,
    multiUnit,
    multiUnitLoadInput,
    unitsPerDispatch,
    isOrderDateValid,
    isReleaseDateValid,
    isDeliveryDateValid,
    isEarliestPickupDateValid,
    isLatestPickupDateValid,
    isEarliestDeliveryDateValid,
    isLatestDeliveryDateValid,
    collectForCustomers,
  ]);

  /**
   * Set Fields and Tabs when UnitType changed
   */

  useEffect(() => {
    setMultiUnitLoadInput("");
    if (!isMultiUnitDefault) setMultiUnit(false);
  }, [unitTypeFK]);

  useEffect(() => {
    changeUnitTypeRelatedFields();
  }, [selectedUnitType, deliveryDealerFK, pickupAtPlant]);

  useEffect(() => {
    if (showMultiUnitLoadDiv === true) {
      fetchAllMultiUnitLoads();
    }

    if (selectedCustomerBillingPlantId !== null || selectedCustomerId !== null) {
      if (customerRatesList.length > 0 && selectedCustomerId !== null) {
        OrderEntryService.fetchUnitTypesByCustomer(
          selectedCustomerId,
          selectedCustomerBillingPlantId,
          pageNumber,
          searchTerms,
          selectedSearchCriteria,
          hasRates,
          towable,
          false
        ).then((res) => {
          const trimmedList = res.data.content?.map((unitType) => ({
            ...unitType,
            descriptionLong: unitType.descriptionLong?.trim(),
          }));
          setUnitTypesList(trimmedList);
        });
      } else {
        OrderEntryService.findAllUnitTypes(
          pageNumber,
          searchTerms,
          selectedSearchCriteria,
          hasRates,
          null,
          null,
          false,
          false
        ).then((res) => {
          const trimmedList = res.data.content?.map((unitType) => ({
            ...unitType,
            descriptionLong: unitType.descriptionLong?.trim(),
          }));
          setUnitTypesList(trimmedList);
        });
      }
    }
  }, [
    selectedCustomerId,
    selectedCustomerBillingPlantId,
    pickupDealerFK,
    pickupCustomerPlantId,
    miscPickupID,
    showMultiUnitLoadDiv,
  ]);

  // Clear fields related to UnitType on change
  useEffect(() => {
    if (unitTypesFK == "") {
      dispatch(setMultiUnilLoad(false));
      setMultiUnit(false);
      setIsMultiUnitDefault(false);
      setUnitMultiLoadList([]);
      setMultiUnitLoadInput("");
      setUnitMultiLoadPK("");
      setInvoice2as3(false);
      setUnitsPerDispatch(2);
    }
    setUnitTypeFK(unitTypesFK);
  }, [unitTypesFK]);

  useEffect(() => {
    setDataInUnits();
  }, [
    unitNum,
    model,
    modelCode,
    unitVin,
    serialNumber,
    stockNumber,
    unitTypeFK,
    specialCodeFK,
    pickupDealerFK,
    miscellaneousPickup,
    deliveryDealerFK,
    miscDelivery,
    collectForCustomers,
    poNumber,
    authorizedBy,
    projectCode,
    bank,
    client,
    GVWR,
    shippingWeight,
    driverTolls,
    driverPermits,
    portEscortFee,
    invoiceFlatrates,
    driverFlatrates,
    commission,
    freezePortOFEntry,
    requiredCDLA,
    tanker,
    requiredTWIC,
    requiredIFTA,
    hasDriveBy,
    DPU,
    storage,
    onHold,
    doNotInvoice,
    doNotDispatch,
    activateDispatch,
    invoice2as3,
    requireFlatbed,
    contactDealerDelay,
    invoiceDealerBreakdown,
    inputValues,
    miscellaneousBolText1,
    miscellaneousBolText2,
    miscellaneousBolText3,
    miscellaneousBolText4,
    miscellaneousBolText5,
    miscellaneousBolText6,
    miscellaneousBolText7,
    orderDate,
    releaseDate,
    deliveryByDate,
    earliestPickUpDate,
    earliestDeliveryDate,
    latestPickUpDate,
    latestDeliveryDate,
    radioValue,
    multiUnit,
    pickupAtPlant,
    isCustomerRequireFactoryRelease,
    releaseProcessFlag,
    factoryRelease,
    unitsPerDispatch,
  ]);

  /**
   * If pickup dealer is selected from lookup or dropdown, set value for required fields
   */
  useEffect(() => {
    if (selectedPickupDealer !== null) {
      const cityCtateZip =
        selectedPickupDealer.city?.trim() +
        " " +
        selectedPickupDealer.stateCode +
        " " +
        selectedPickupDealer.postalCode;
      if (!miscellaneousPickup && !pickupAtPlant) setPickupDealerFK(selectedPickupDealer.dealerPK);
      dispatch(setPickupDealerInput(selectedPickupDealer.name || ""));
      setPickupDealerCSZ(cityCtateZip || "");
      setPickupDealerAdd1(selectedPickupDealer.address1 || "");
      setPickupDealerAdd2(selectedPickupDealer.address2 || "");
      setPickupDealerCity(selectedPickupDealer.city || "");
      setPickupDealerState(selectedPickupDealer.stateCode || "");
      setPickupDealerZip(selectedPickupDealer.postalCode || "");
    } else {
      dispatch(setPickupDealerInput(""));
      setPickupDealerCSZ("");
      setPickupDealerState("");
      setPickupDealerCity("");
      setPickupDealerAdd1("");
      setPickupDealerAdd2("");
      setPickupDealerZip("");
      setPickupDealerFK(null);
      dispatch(setPickupDealersFK(null));
      setLatestPickUpDate("");
      setLatestPickUpDateDefault("");
      setIsLatestPickupDateDefault(false);
    }
  }, [selectedPickupDealer]);

  useEffect(() => {
    if (selectedDeliveryDealer !== null) {
      const cityStateZip =
        selectedDeliveryDealer.city?.trim() +
        " " +
        selectedDeliveryDealer.stateCode +
        " " +
        selectedDeliveryDealer.postalCode;
      if (!miscDelivery && !deliverToPlant) setDeliveryDealerFK(selectedDeliveryDealer.dealerPK);
      dispatch(setDeliveryDealerInput(selectedDeliveryDealer.name || ""));
      setDeliveryDealerCSZ(cityStateZip || "");
      setDeliveryDealerCity(selectedDeliveryDealer.city || "");
      setDeliveryDealerState(selectedDeliveryDealer.stateCode || "");
      setDeliveryDealerZip(selectedDeliveryDealer.postalCode || "");
      setDeliveryDealerAdd1(selectedDeliveryDealer.address1 || "");
      setDeliveryDealerAdd2(selectedDeliveryDealer.address2 || "");
    } else {
      dispatch(setDeliveryDealerInput(""));
      setDeliveryDealerCSZ("");
      setDeliveryDealerCity("");
      setDeliveryDealerState("");
      setDeliveryDealerAdd1("");
      setDeliveryDealerAdd2("");
      setDeliveryDealerZip("");
      setDeliveryDealerFK(null);
      dispatch(setDeliveryDealersFK(null));
      setLatestDeliveryDate("");
      setLatestDeliveryDateDefault("");
      setIsLatestDeliveryDateDefault(false);
    }
  }, [selectedDeliveryDealer]);

  useEffect(() => {
    if (selectedPickupDealer === null || selectedDeliveryDealer === null) {
      dispatch(setBrokerId(null));
      dispatch(setSelectedBroker(null));
      dispatch(setBrokerInput(""));
      setCustomerDealerList(null);
      setFreezeBroker(false);
      dispatch(setPortOfEntryId(null));
      dispatch(setSelectedPortOfEntry(null));
      dispatch(setPortOfEntryInput(""));
    }
  }, [selectedDeliveryDealer, selectedPickupDealer]);

  useEffect(() => {
    if (pickupAtPlant && pickupCustomerPlantId !== null) {
      setMiscellaneousPickup(false);
      OrderEntryService.getPlantById(pickupCustomerPlantId).then((res) => {
        const data = res.data;
        dispatch(setSelectedPickupDealer(data));
      });
    }
  }, [pickupCustomerPlantId, pickupAtPlant]);

  useEffect(() => {
    if (deliverToPlant && deliveryCustomerPlantId !== null) {
      setMiscDelivery(false);
      OrderEntryService.getPlantById(deliveryCustomerPlantId).then((res) => {
        const data = res.data;
        dispatch(setSelectedDeliveryDealer(data));
      });
    }
  }, [deliverToPlant, deliveryCustomerPlantId]);

  useEffect(() => {
    if (pickupAtPlant && selectedCustomerBillingPlantId !== null) {
      OrderEntryService.getPlantById(selectedCustomerBillingPlantId).then((res) => {
        const data = res.data;
        dispatch(setSelectedBillingPlantDetails(data));
      });
    }
  }, [selectedCustomerBillingPlantId, pickupAtPlant, pickupCustomerPlantId, deliveryCustomerPlantId]);

  useEffect(() => {
    if (miscellaneousPickup && miscPickupDealerTabIsValid && miscPickupDealerData) {
      dispatch(setSelectedPickupDealer(miscPickupDealerData));
    }
  }, [miscPickupDealerData, miscPickupDealerTabIsValid, miscellaneousPickup]);

  // clear selected pickup dealer
  useEffect(() => {
    if (
      (!pickupAtPlant && !miscPickupDealerTabIsValid) ||
      (!miscellaneousPickup && !miscPickupDealerTabIsValid)
    ) {
      dispatch(setSelectedPickupDealer(null));
    }
  }, [pickupAtPlant, miscellaneousPickup, miscPickupDealerTabIsValid]);

  useEffect(() => {
    if (miscDelivery && miscDeliveryDealerTabIsValid && miscDeliveryDealerFormData) {
      dispatch(setSelectedDeliveryDealer(miscDeliveryDealerFormData));
    }
  }, [miscDelivery, miscDeliveryDealerFormData, miscDeliveryDealerTabIsValid]);

  // clear selected delivery dealer
  useEffect(() => {
    if (
      (!deliverToPlant && !miscDeliveryDealerTabIsValid) ||
      (!miscDelivery && !miscDeliveryDealerTabIsValid)
    ) {
      dispatch(setSelectedDeliveryDealer(null));
    }
  }, [deliverToPlant, miscDelivery, miscDeliveryDealerTabIsValid]);

  useEffect(() => {
    if (
      selectedPickupDealer !== null &&
      selectedDeliveryDealer !== null &&
      !miscDelivery &&
      !miscellaneousPickup
    ) {
      getCustomerDealerData(selectedDeliveryDealer.dealerPK, selectedPickupDealer.dealerPK);
    }

    if (selectedPickupDealer === null || selectedDeliveryDealer === null) {
      dispatch(setSelectedPortOfEntry(null));
      dispatch(setPortOfEntryInput(""));
      setIsCommissionRequired(false);
      if (pickupDealersFK === null || deliveryDealersFK === null) {
        dispatch(setInvoiceMiles(0));
        dispatch(setDriverMiles(0));
        dispatch(setDefaultInvoiceMiles(0));
        dispatch(setDefaultDriverMiles(0));
        dispatch(setInvoiceFlatrate(0));
        dispatch(setDriverFlatrate(0));
        setInvoiceFlatrates(0);
        setDriverFlatrates(0);
        dispatch(setDealerConnectionFlatrateFK(null));
        dispatch(setRateType("Motorized"));
        setCommission(0);
        setIsDefaultInvoiceMiles(false);
        setIsDefaultDriverMiles(false);
        dispatch(setIsDefaultInvoiceMilesRedux(false));
        dispatch(setIsDefaultDriverMilesRedux(false));
        dispatch(setInvoiceAmount(0));
        dispatch(setInvoiceFuelSurchargeAmount(""));
        dispatch(setDriverAmount(0));
        dispatch(setDriverFuelSurchargeAmount(""));
        //Added on 11.05.2023 for clearing state
        dispatch(setIsDriverFlatrateVisible(false));
        dispatch(setIsInvoiceFlatrateVisible(false));
        setIsCommissionVisible(false);
      }
    }
  }, [pickupDealersFK, deliveryDealersFK, selectedPickupDealer, selectedDeliveryDealer, unitTypesFK]);

  useEffect(() => {
    if (
      (miscDelivery || miscellaneousPickup) &&
      (selectedPickupDealer !== null || selectedDeliveryDealer !== null)
    ) {
      dispatch(setIsDriverFlatrateVisible(true));
      dispatch(setIsInvoiceFlatrateVisible(true));
    }
  }, [selectedPickupDealer, selectedDeliveryDealer]);

  useEffect(() => {
    if (pickupDealersFK !== null) setPickupDealerFK(pickupDealersFK);
    if (deliveryDealersFK !== null) setDeliveryDealerFK(deliveryDealersFK);
  }, [pickupDealersFK, deliveryDealersFK]);

  /**
   * UseEffect for Setting Flatrates and Miles
   */
  useEffect(() => {
    fetchFlatrates();
  }, [
    pickupDealersFK,
    deliveryDealersFK,
    pickupCustomerPlantId,
    deliveryCustomerPlantId,
    unitTypesFK,
    multiUnit,
    unitsPerDispatch,
    invoice2as3,
    isMilesLowBoy,
    invoiceMiles, // added recently otherwise flatrates gets overwritten by mileage rate
    driverMiles,
  ]);

  useEffect(() => {
    fetchInvoiceMilesAndDriverMiles();
  }, [
    pickupDealersFK,
    deliveryDealersFK,
    pickupCustomerPlantId,
    deliveryCustomerPlantId,
    unitTypesFK,
    multiUnit,
    unitsPerDispatch,
    invoice2as3,
    isMilesLowBoy,
    GVWR,
    invoiceMilesAdjustment,
    driverMilesAdjustment,
  ]);

  useEffect(() => {
    if (!hasDriveBy) {
      fetchFlatrates();
      fetchInvoiceMilesAndDriverMiles();
    }
  }, [hasDriveBy]);

  /**
   * Calculating Invoice Amount and Driver Amount
   */

  useEffect(() => {
    if (invoiceMiles > 0 && invoiceFlatrate === 0 && !isDefaultInvoiceFlatrates) {
      calculateInvoiceDebouncer();
    } else {
      dispatch(setInvoiceAmount(0));
    }

    if (driverMiles > 0 && driverFlatrate === 0 && !isDefaultDriverFlatrates) {
      calculateDriverDebouncer();
    } else {
      dispatch(setDriverAmount(0));
    }
  }, [
    supplementalRateStructure,
    GVWR,
    unitTypeFK,
    specialRateStructure,
    additionalRateStructure,
    radioValue,
  ]);

  /**
   *  Calculate Invoice Amount
   */
  useEffect(() => {
    if (invoiceMiles > 0 && invoiceFlatrate === 0 && !isDefaultInvoiceFlatrates) {
      calculateInvoiceDebouncer();
    }
  }, [
    invoiceRateStructure,
    invoiceMiles,
    invoiceFlatrate,
    invoiceMilesFromDriveBy,
    isDefaultInvoiceFlatrates,
    invoiceCDLASurcharge,
    invoiceUSCNSurcharge,
  ]);

  /**
   *  Calculate Driver Amount
   */
  useEffect(() => {
    if (driverMiles > 0 && driverFlatrate === 0 && !isDefaultDriverFlatrates) {
      calculateDriverDebouncer();
    }
  }, [
    driverRateStructure,
    driverMiles,
    driverFlatrate,
    driverMilesFromDriveBy,
    isDefaultDriverFlatrates,
    driverCDLASurcharge,
    driverUSCNSurcharge,
  ]);

  /**
   *  UseEffect for Setting  Commission
   */

  useEffect(() => {
    fetchCommissionAmount();
  }, [pickupDealersFK, deliveryDealersFK, pickupCustomerPlantId, deliveryCustomerPlantId]);

  /**
   * Misc Pickup or Misc Delivery
   */
  useEffect(() => {
    if (miscDelivery || miscellaneousPickup) {
      setIsCommissionVisible(true);
      dispatch(setIsInvoiceFlatrateVisible(true));
      dispatch(setIsDriverFlatrateVisible(true));
    }
  }, [unitTypesFK, miscDelivery, miscellaneousPickup]);

  /**
   * Setting CDL Surcharges
   */
  useEffect(() => {
    if (!miscDelivery && !miscellaneousPickup) {
      setCDLSurchargesForRates();
    }
  }, [requiredCDLA, requiredCDLAHidden, selectedDeliveryDealer, customerRateStructure, GVWR, reload]);

  useEffect(() => {
    dispatch(setInvoiceCDLARate(invoiceCDLASurcharge));
    dispatch(setDriverCDLARate(driverCDLASurcharge));
  }, [invoiceCDLASurcharge, driverCDLASurcharge]);

  /**
   * Set Broker & POE default values
   */
  useEffect(() => {
    setBrokerAndPOEValues();
  }, [selectedPickupDealer, selectedDeliveryDealer, customerDealerList, selectedCustomerAllData]);

  /**
   * Setting US and CN Surcharges for Rates
   */
  useEffect(() => {
    if (selectedCustomerAllData !== null) {
      if (brokerType === "export") {
        setInvoiceUSCNSurcharge(selectedCustomerAllData.invoiceCanadianSurcharge);
        setDriverUSCNSurcharge(selectedCustomerAllData.driverCanadianSurcharge);
        dispatch(setInvoiceCanadianCharge(selectedCustomerAllData.invoiceCanadianSurcharge));
        dispatch(setDriverCanadianCharge(selectedCustomerAllData.driverCanadianSurcharge));
      } else {
        setInvoiceUSCNSurcharge(selectedCustomerAllData.invoiceUSSurcharge);
        setDriverUSCNSurcharge(selectedCustomerAllData.driverUSSurcharge);
        dispatch(setInvoiceUSCharge(selectedCustomerAllData.invoiceUSSurcharge));
        dispatch(setDriverUSCharge(selectedCustomerAllData.driverUSSurcharge));
      }
    }
  }, [selectedDeliveryDealer, brokerType]);

  /**
   * Setting RequiredCDLA visibility
   */
  useEffect(() => {
    setRequiredCDLAVisibility();
  }, [
    selectedUnitType,
    returnRates,
    reload,
    towable,
    driverCDLASurcharge,
    isDriverMileageRate,
    pickupAtPlant,
    driverRateStructure,
  ]);

  /**
   * Set old Unit No. and VIN for Duplicate Loads
   */
  useEffect(() => {
    if (unitNumber) setUnitNum(unitNumber);
    else setUnitNum("");
    if (!unitNumber) setUnitNum("");
    if (vin) setUnitVin(unitVin);
    else setUnitVin("");
  }, [unitNumber, vin]);

  useEffect(() => {
    if (!unitNum) dispatch(setUnitNumber(""));
  }, [unitNum]);

  /**
   * Set UsePlants
   */
  useEffect(() => {
    if (customerData) {
      if (customerData.usePlants) {
        setIsCustUsePlants(true);
      } else setIsCustUsePlants(false);
    }
  }, [customerData]);

  /**
   * Set OutBound Useplants
   */
  useEffect(() => {
    if (reload == false && isCustUsePlants == true) setisOutBoundUsePlants(true);
    else if (reload == true && isCustUsePlants == false) setisOutBoundUsePlants(false);
  }, [reload, isCustUsePlants]);

  /**
   * Reset Unit Tab fields on Customer change and Reset Flag change
   */
  useEffect(() => {
    resetDatainUnits();
  }, [selectedCustomerId]);

  useEffect(() => {
    resetDatainUnits();
  }, [dataResetFlag]);

  // For Bugfix: If invoiceMiles is 0, set invoiceAmount to 0
  useEffect(() => {
    if (Number(invoiceMiles) === 0) {
      dispatch(setInvoiceAmountBackend(0));
    }
  }, [invoiceMiles]);

  /**
   * Miles Overide Percentage
   */
  useEffect(() => {
    if (invoiceMiles > 0 && driverMiles > 0 && isDefaultInvoiceMiles && !hasDriveBy) {
      handleAmountExceedsPercentage();
    }
    if (invoiceMiles == 0 || driverMiles == 0) {
      dispatch(setFlatRateErrorMsg(""));
      setShowFlatRateModal(false);
      setUnitPercentage(0);
      dispatch(setShowOverrideButton(false));
    }
  }, [
    invoiceMiles,
    driverMiles,
    unitPercentage,
    isDefaultInvoiceMiles,
    hasDriveBy,
    selectedDeliveryDealer,
    selectedPickupDealer,
  ]);

  /**
   * Update global state for pickupDealerFK
   */
  useEffect(() => {
    dispatch(setPickupDealerId(pickupDealerFK));
  }, [pickupDealerFK]);

  /**
   * Setting Selected Customer's default values on Unit Tab
   */
  useEffect(() => {
    setCustomerDefaults();
  }, [selectedCustomerAllData]);

  /**
   * Find Bulk Invoice By Id
   */
  useEffect(() => {
    if (selectedCustomerId !== null && selectedCustomerId !== "") {
      if (bulkInvoiceFK !== "") {
        getBulkInvoiceById(bulkInvoiceFK);
      }
    }
  }, [bulkInvoiceFK]);

  /**
   * Set PO Number from Bulk Invoice
   */
  useEffect(() => {
    poNumberFromBulkInvoice !== "" ? setPoNumber(poNumberFromBulkInvoice) : setPoNumber("");
  }, [poNumberFromBulkInvoice]);

  /**
   * Set Project Code from Bulk Invoice
   */
  useEffect(() => {
    // projectCodeFromBulkInvoice !== '' ? setProjectCode(projectCodeFromBulkInvoice) : setProjectCode('');
    // Refactroing for bugfix
    // if (projectCodeFromBulkInvoice) {
    setProjectCode(projectCodeFromBulkInvoice);
    // }
  }, [projectCodeFromBulkInvoice]);

  /**
   * Set Authorized By, DPU PickUp, PromptDPUOwner
   * from Customers Plant
   */
  useEffect(() => {
    if (
      (pickupCustomerPlantId !== "" || pickupCustomerPlantId !== null) &&
      selectedBillingPlantDetails !== null
    ) {
      setAuthorizedBy(selectedBillingPlantDetails?.authorizedBy);
      setDPUPickup(selectedBillingPlantDetails.dpuPickup);
      setPromptDPUOwner(selectedBillingPlantDetails.promptDPUOwner);
      dispatch(setEmailPlantBOLAtOrderEntry(selectedBillingPlantDetails.emailBOLAtOrderEntry));
      dispatch(setEmailPlantBOLAtOrderEntryDPU(selectedBillingPlantDetails.emailBOLAtOrderEntryDPU));
      dispatch(setBatchEmailPlantBOLAtOrderEntry(selectedBillingPlantDetails.batchEmailBOLAtOrderEntry));
      dispatch(setBatchEmailPlantBOLDaily(selectedBillingPlantDetails.batchEmailBOLDaily));
    } else {
    }
  }, [pickupCustomerPlantId, selectedBillingPlantDetails]);

  /**
   * Set TWIC from Delivery Dealers record
   */
  useEffect(() => {
    if (deliveryDealerFK !== null && miscDelivery === false && !deliverToPlant) {
      getRegularDealerById(deliveryDealerFK);
    } else if (deliveryDealerFK === null) {
      setDealerTWIC(false);
      setPortEscortFee("");
    }
  }, [deliveryDealerFK]);

  useEffect(() => {
    if (customerRatesList.length > 0) {
      dispatch(setHasRates(true));
    } else dispatch(setHasRates(false));
  }, [customerRatesList]);

  useEffect(() => {
    dispatch(setReduxDriverFlatRate(0));
  }, [invoiceFlatrate]);

  useEffect(() => {
    dispatch(setDeliveryDealerInput(""));
  }, [deliveryDealersearchType]);

  useEffect(() => {
    dispatch(setPickupDealerInput(""));
  }, [pickupDealersearchType]);

  /**
   * Setting CDL CutOFFs flag for rates and
   * EngineNA Visible flag for Unit Tab
   */
  useEffect(() => {
    if (customerRateStructure !== "") {
      const customerRateForUnit = customerRateStructure;
      if (
        customerRateForUnit.invoiceFuelSurchargeGas > 0 ||
        customerRateForUnit.invoiceFuelSurchargeDiesel > 0 ||
        customerRateForUnit.driverFuelSurchargeGas > 0 ||
        customerRateForUnit.driverFuelSurchargeDiesel > 0
      ) {
        setIsEngineNAVisible(false);
      } else setIsEngineNAVisible(true);

      if (
        customerRateForUnit.invoiceCDLGVWRCutoff > 0 &&
        customerRateForUnit.invoiceCDLLengthCutoff > 0 &&
        customerRateForUnit.driverCDLGVWRCutoff > 0 &&
        customerRateForUnit.driverCDLLengthCutoff > 0
      ) {
        setCdlCutoffs(true);
      } else setCdlCutoffs(false);
    } else {
      setCdlCutoffs(false);
      setIsEngineNAVisible(true);
    }
  }, [customerRateStructure]);

  /**
   * Setting Engine Radio button value defaults
   */
  useEffect(() => {
    if (!isEngineNAVisible && !towable) {
      setRadioValue("enginegas");
    } else if (!isEngineNAVisible && towable) {
      setRadioValue("enginediesel");
    } else if (isEngineNAVisible) {
      setRadioValue("enginena");
    }
  }, [isEngineNAVisible, towable, selectedUnitType]);

  useEffect(() => {
    if (shuttleToYard && pickupAtPlant && isCustUsePlants && !deliverToPlant) {
    } else {
      setDPU(false);
      setStorage(false);
    }
  }, [shuttleToYard, pickupAtPlant, isCustUsePlants, deliverToPlant, selectedCustomerId]);

  useEffect(() => {
    if (defaultSpecialCode != "") {
      setSpecialCodeFK(defaultSpecialCode.specialCodePK);
      dispatch(setSpecialCodeId(defaultSpecialCode.specialCodePK));
      dispatch(setSpecialCodeInput(defaultSpecialCode.description));
      dispatch(setSelectedSpecialCode(defaultSpecialCode));
    }
  }, [defaultSpecialCode]);

  /**
   * Unit Number Duplicate Check
   */
  useEffect(() => {
    // Set up a timeout to debounce the API call
    const timeoutId = setTimeout(() => {
      // hanldeCheckUnitNumber(unitNum)
    }, 500); // 500ms delay

    // Cleanup timeout if customerNameInput or pageNumber changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [unitNum]);

  /**
   * Get Supplemental Rates
   */
  useEffect(() => {
    handleSupplementalRates();
  }, [selectedDeliveryDealer?.stateCode, unitTypeFK, selectedCustomerId, reload]);

  function handleSupplementalRates() {
    if (selectedDeliveryDealer !== null && unitTypeFK !== "" && selectedCustomerId != null) {
      if (deliveryDealerFK !== null) {
        fetchSupplementalRates(unitTypeFK, selectedCustomerId, deliveryDealerFK, null);
      } else {
        fetchSupplementalRates(unitTypeFK, selectedCustomerId, null, selectedDeliveryDealer.stateCode);
      }
    }
  }

  /** RENDER FUNCTIONS */

  function setDataInUnits() {
    // if (unitNum) dispatch(setUnitNumber(unitNum));
    dispatch(setUnitNumber(unitNum));
    // if (model) dispatch(setModel(model));
    dispatch(setModel(model));
    // if (modelCode) dispatch(setModelCode(modelCode));
    dispatch(setModelCode(modelCode));
    // if (unitVin) dispatch(setVin(unitVin));
    dispatch(setVin(unitVin));
    // if (serialNumber) dispatch(setSerialNumber(serialNumber));
    dispatch(setSerialNumber(serialNumber));
    // if (stockNumber) dispatch(setStockNumber(stockNumber));
    dispatch(setStockNumber(stockNumber));
    /* if (unitTypeFK) {
      dispatch(setUnitTypesFK(unitTypeFK));
    } */
    dispatch(setUnitTypesFK(unitTypeFK));
    if (radioValue == "enginegas") {
      dispatch(setEngineGas(true));
      dispatch(setEngineDiesel(false));
    }
    if (radioValue == "enginediesel") {
      dispatch(setEngineGas(false));
      dispatch(setEngineDiesel(true));
    }
    if (radioValue == "enginena") {
      dispatch(setEngineGas(false));
      dispatch(setEngineDiesel(false));
    }
    // TODO: remove one global state for specialCodeFK later, setSpecialCodesFK is used for saving to backend and
    // setSpecialCodeId is used for Lookup & Autocomplete
    dispatch(setSpecialCodesFK(specialCodeFK));
    dispatch(setSpecialCodeId(specialCodeFK));
    dispatch(setPickupDealersFK(pickupDealerFK));
    dispatch(setMiscPickup(miscellaneousPickup));
    dispatch(setDeliveryDealersFK(deliveryDealerFK));
    dispatch(setMiscellaneousDelivery(miscDelivery));
    dispatch(setCollectForCustomer(collectForCustomers));
    dispatch(setPoNumberRedux(poNumber));
    dispatch(setAuthorizedByUnit(authorizedBy));
    dispatch(setProjectCodeUnit(projectCode));
    dispatch(setBankUnit(bank));
    dispatch(setClientUnit(client));
    dispatch(setGVWRUnit(GVWR));
    dispatch(setShippingWeightUnit(shippingWeight));
    dispatch(setDriverTollsUnit(driverTolls));
    dispatch(setDriverPermitsUnit(driverPermits));
    dispatch(setPortEscortFeeUnit(portEscortFee));

    if (!invoiceFlatrate) dispatch(setInvoiceFlatrate(invoiceFlatrates));
    if (!driverFlatrate) dispatch(setDriverFlatrate(driverFlatrates));
    dispatch(setCommissionUnit(commission));
    dispatch(setFreezePortOFEntryUnit(freezePortOFEntry));
    dispatch(setRequiredCDLAUnit(requiredCDLA));
    dispatch(setTankerUnit(tanker));
    dispatch(setRequiredTWICUnit(requiredTWIC));
    dispatch(setRequiredIFTAUnit(requiredIFTA));
    dispatch(setHasDriveBys(hasDriveBy));
    dispatch(setDPUUnit(DPU));
    dispatch(setStorageUnit(storage));
    dispatch(setOnHold(onHold));
    dispatch(setDoNotInvoiceUnit(doNotInvoice));
    dispatch(setDoNotDispatchUnit(doNotDispatch));
    dispatch(setActivateDispatchUnit(activateDispatch));
    dispatch(setInvoice2as3Unit(invoice2as3));
    dispatch(setRequireFlatbedUnit(requireFlatbed));
    dispatch(setContactDealerDelayUnit(contactDealerDelay));
    dispatch(setInvoiceDealerBreakdownUnit(invoiceDealerBreakdown));
    dispatch(setMiscellaneousBolTextUnit(inputValues));
    dispatch(setMiscellaneousBolTextUnit1(miscellaneousBolText1));
    dispatch(setMiscellaneousBolTextUnit2(miscellaneousBolText2));
    dispatch(setMiscellaneousBolTextUnit3(miscellaneousBolText3));
    dispatch(setMiscellaneousBolTextUnit4(miscellaneousBolText4));
    dispatch(setMiscellaneousBolTextUnit5(miscellaneousBolText5));
    dispatch(setMiscellaneousBolTextUnit6(miscellaneousBolText6));
    dispatch(setMiscellaneousBolTextUnit7(miscellaneousBolText7));
    dispatch(setOrderDateUnit(orderDate));
    dispatch(setReleaseDateUnit(releaseDate));
    dispatch(setDeliveryByDateUnit(deliveryByDate));
    dispatch(setEarliestPickUpDateUnit(earliestPickUpDate));
    dispatch(setEarliestDeliveryDateUnit(earliestDeliveryDate));
    dispatch(setLatestPickUpDateUnit(latestPickUpDate));
    dispatch(setLatestDeliveryDateUnit(latestDeliveryDate));
    dispatch(setMultiUnilLoad(multiUnit));
    dispatch(setUnitsPerDispatchUnit(unitsPerDispatch));
    //Factory Release

    if (
      releaseProcessFlag == false ||
      isCustomerRequireFactoryRelease == false ||
      pickupAtPlant == false ||
      factoryRelease == true
    ) {
      dispatch(setPlantRelease(true));
    } else {
      dispatch(setPlantRelease(false));
      dispatch(setPlantReleaseDate(""));
    }
  }

  useEffect(() => {
    if (
      !miscellaneousBolText1 &&
      !miscellaneousBolText2 &&
      !miscellaneousBolText3 &&
      !miscellaneousBolText4 &&
      !miscellaneousBolText5 &&
      !miscellaneousBolText6 &&
      !miscellaneousBolText7
    ) {
      dispatch(setMiscellaneousBolTextUnit(["", "", "", "", "", "", ""]));
    }
  }, [
    miscellaneousBolText1,
    miscellaneousBolText2,
    miscellaneousBolText3,
    miscellaneousBolText4,
    miscellaneousBolText5,
    miscellaneousBolText6,
    miscellaneousBolText7,
  ]);

  function resetDatainUnits() {
    setUnitNum("");
    setCheckUnitNumber("");
    setUnitModel("");
    setUnitModelCode("");
    setUnitVin("");
    setUnitSerialNumber("");
    setUnitStockNumber("");
    setPickupDealerFK(null);
    setUnitTypeFK("");
    dispatch(setEngineGas(false));
    dispatch(setEngineDiesel(false));
    setInputValues(["", "", "", "", "", "", ""]);

    setRadioValue("enginena");
    dispatch(setHasRates(false));
    dispatch(setUnitTypeInput(""));
    dispatch(setSpecialCodeId(""));
    setDeliveryDealerFK(null);
    setMiscDelivery(false);
    setMiscellaneousPickup(false);
    dispatch(setMiscellaneousPickupID(""));
    dispatch(setMiscellaneousDeliveryID(""));
    dispatch(setSpecialCodeInput(""));
    dispatch(setBrokerInput(""));
    dispatch(setPortOfEntryInput(""));
    dispatch(setBrokerType("default"));
    setFreezeBroker(false);
    if (!pickupAtPlant) {
      dispatch(setPickupDealerInput(""));
      setPickupDealerCSZ("");
      setPickupDealerCity("");
      setPickupDealerState("");
    }
    if (!deliverToPlant) {
      dispatch(setDeliveryDealerInput(""));
      setDeliveryDealerCSZ("");
      setDeliveryDealerCity("");
      setDeliveryDealerState("");
    }
    dispatch(setPickupDealersFK(null));
    dispatch(setDeliveryDealersFK(null));
    setCollectForCustomers("");
    if (bulkInvoiceFK == "") setProjectCode("");
    setBank("");
    setClient("");
    setGVWR("");
    dispatch(setGVWRUnit(0));
    setDriverTolls("");
    setDriverPermits("");
    dispatch(setDriverTollsUnit(null));
    dispatch(setDriverPermitsUnit(null));
    dispatch(setDriverWashUnit(null));
    setIsDisabledDriverTolls(false);
    setIsDisabledDriverPermits(false);
    // setIsDriverTollsVisible(false);
    // setIsDriverPermitsVisible(false);
    if (bulkInvoiceFK == "") setPoNumber("");
    if (bulkInvoiceFK == "") setPoNumberFromBulkInvoice("");
    if (bulkInvoiceFK == "") setProjectCodeFromBulkInvoice("");
    if (!selectedCustomerAllData?.authorizedBy) setAuthorizedBy("");

    setShippingWeight("");
    setPortEscortFee("");
    dispatch(setPortEscortFeeUnit(null));
    setDealerTWIC(false);

    dispatch(setInvoiceMiles(0));
    setIsDefaultInvoiceMiles(false);
    dispatch(setDefaultInvoiceMiles(0));
    dispatch(setDefaultDriverMiles(0));
    dispatch(setIsDefaultInvoiceMilesRedux(false));
    dispatch(setDriverMiles(0));
    setIsDefaultDriverMiles(false);
    dispatch(setIsDefaultDriverMilesRedux(false));
    setInvoiceFlatrates(0);
    dispatch(setReduxDriverFlatRate(0));
    dispatch(setInvoiceFlatrate(0));
    dispatch(setInvoiceFlatrate2(0));
    setDriverFlatrates(0);
    dispatch(setDriverFlatrate(0));
    dispatch(setDriverFlatrate2(0));
    setCustomerRateStructure("");
    dispatch(setCustomerRateStructureRedux(""));
    setInvoiceRateStructure("");
    setDriverRateStructure("");
    setCommission(0);
    dispatch(setCommissionUnit(0));
    setIsCommissionRequired(false);
    dispatch(setOverWidthLoad(false));
    setRequiredCDLA(false);
    setTanker(false);
    setRequiredTWIC(false);
    setRequiredIFTA(false);
    setHasDriveBy(false);
    setDPU(false);
    setStorage(false);
    setOnHoldUnit(false);
    setdoNotInvoice(false);
    setFactoryRelease(false);
    setdoNotDispatch(false);
    setActivateDispatch(false);
    setMultiUnit(false);
    setIsMultiUnitDefault(false);
    setShowMultiUnitLoadDiv(false);
    setUnitsPerDispatch(2);
    setUnitMultiLoadPK(null);
    setInvoice2as3(false);
    setRequireFlatbed(false);
    setcontactDealerDelay(false);
    setInvoiceDealerBreakdown(false);
    setReleaseDate("");
    setOrderDate("");
    setDeliveryByDate("");
    setEarliestPickUpDate("");
    setLatestPickUpDate("");
    setEarliestDeliveryDate("");
    setLatestDeliveryDate("");
    setPickupDealersearchType("searchByStateCity");
    setDeliveryDealersearchType("searchByStateCity");
    setErrorFlag(false);
    dispatch(setFlatRateErrorMsg(""));
    dispatch(setIsInvoiceFlatrateVisible(false));
    dispatch(setIsDriverFlatrateVisible(false));
    setIsInvoiceMileageRate(false);
    dispatch(setIsInvoiceMileageRateRedux(false));
    setIsDriverMileageRate(false);
    dispatch(setIsDriverMileageRateRedux(false));
    setCdlCutoffs(false);
    setMiscPickupID("");
    setMiscDeliveryID("");
    setIsContactorInvoiceVisible(false);
    dispatch(setInvoiceAmount(0));
    dispatch(setInvoiceFuelSurchargeAmount(""));
    dispatch(setDriverAmount(0));
    dispatch(setDriverFuelSurchargeAmount(""));
    setIsCommissionVisible(false);
    setUnitTypeLength(0);
    setInvoiceCDLASurcharge(0);
    setDriverCDLASurcharge(0);
    setRequiredCDLAHidden(true);
    dispatch(setCanadianPickup(false));
    dispatch(setCanadianDelivery(false));
    setIsDefaultInvoiceFlatrates(false);
    setIsDefaultDriverFlatrates(false);
    setSpecialCodeFK(null);
    dispatch(setSpecialCodeId(null));
    dispatch(setSelectedSpecialCode(null));
    setInvoiceUSCNSurcharge(0);
    setDriverUSCNSurcharge(0);
    dispatch(setInvoiceSupplementalRate(0));
    dispatch(setInvoiceSupplementalFuelSurchargeRate(0));
    dispatch(setInvoiceSupplementalDescription(""));
    dispatch(setDriverSupplementalRate(0));
    dispatch(setDriverSupplementalFuelSurchargeRate(0));
    dispatch(setDriverSupplementalDescription(""));
    dispatch(setInvoiceSpecialRate(0));
    dispatch(setInvoiceSpecialFuelSurchargeRate(0));
    dispatch(setInvoiceSpecialDescription(""));
    dispatch(setDriverSpecialRate(0));
    dispatch(setDriverSpecialFuelSurchargeRate(0));
    dispatch(setDriverSpecialDescription(""));
    dispatch(setInvoiceAdditionalRate(0));
    dispatch(setInvoiceAdditionalFuelSurchargeRate(0));
    dispatch(setInvoiceAdditionalDescription(""));
    dispatch(setDriverAdditionalRate(0));
    dispatch(setDriverAdditionalFuelSurchargeRate(0));
    dispatch(setDriverAdditionalDescription(""));
    setIsELDFeeVisible(false);
    setIsDefaultInvoiceELD(false);
    setIsDefaultDriverELD(false);
    setInvoiceELD(0);
    setDriverELD(0);
    dispatch(setELDRequiredRedux(false));
    dispatch(setInvoiceELDFeeRedux(0));
    dispatch(setDriverELDFeeRedux(0));
    dispatch(setInvoiceELDDescription(""));
    dispatch(setShowOverrideButton(false));
    setPromptDPUOwner(false);
    setDPUPickupOwner("");
    dispatch(setDPUPickupOwnerRedux(null));
    dispatch(setDriverCDLARequiredRedux(false));
    setMultiUnitLoadInput("");
    setMultiUnitLoadData("");
    setCitiesWithStatecode("");
    setWarningPopUP(false);
    setShowMoreInfo(false);
    setDistanceCalculationInitiated(false);
    setIsMilesLowBoy(false);
    dispatch(setIsMilesLowBoyRedux(false));
    setIsUnitPopUp(false);
    setIsUnitTruckCamper(false);
    dispatch(setPlantOrderNumber(""));
    setShowPCMilerErrorModal(false);
    dispatch(setPcMilerError(""));
    dispatch(setIsFODInvoice(false));
    // ReSetting Invoice Rate
    dispatch(setInvoiceRate(0));
    dispatch(setInvoiceFuelSurchargeRate(0));
    dispatch(setInvoiceReturnRate(0));

    // ReSetting Length Rate
    dispatch(setInvoiceLengthRate(0));
    dispatch(setInvoiceLengthReturn(false));

    dispatch(setInvoiceSupplementalReturn(false));
    dispatch(setInvoiceAdditionalReturn(false));

    // ReSetting Additional Flatrate
    dispatch(setAdditionalFlatRateDescription(""));
    dispatch(setInvoiceAdditionalFlatRate(0));
    dispatch(setInvoiceSpecialReturn(false));

    // ReSetting Driver Rate
    dispatch(setDriverRate(0));
    dispatch(setDriverFuelSurchargeRate(0));
    dispatch(setDriverReturnRate(0));

    // ReSetting Driver Length Rate
    dispatch(setDriverLengthRate(0));
    dispatch(setDriverLengthReturn(false));

    dispatch(setDriverSupplementalReturn(false));
    dispatch(setDriverAdditionalReturn(false));
    dispatch(setDriverSpecialReturn(false));

    // ReSetting Additional Flatrate
    dispatch(setDriverAdditionalFlatRate(0));
    dispatch(setAdditionalFlatRateDescription(""));

    dispatch(setUnitOverride(false));
    dispatch(setShowUnitOverride(false));
    dispatch(setSaveTollsAndPermits(false));
    dispatch(setEmailBOLAtOrderEntry(false));
    dispatch(setBatchEmailBOLAtOrderEntry(false));
    dispatch(setBatchEmailBOLDaily(false));

    dispatch(setOrderDateUnit(""));
    dispatch(setReleaseDateUnit(""));
    dispatch(setDeliveryByDateUnit(""));
    dispatch(setEarliestPickUpDateUnit(""));
    dispatch(setEarliestDeliveryDateUnit(""));
    dispatch(setLatestPickUpDateUnit(""));
    dispatch(setLatestDeliveryDateUnit(""));

    dispatch(setDataReset(false));
  }

  const handleUnitTypeSelection = (unitType) => {
    dispatch(setUnitTypeInput(unitType.descriptionLong));
    setUnitTypeFK(unitType.unitTypePK);
    // setSelectedUnitType(unitType);
    dispatch(setUnitTypeData(unitType));
  };

  const handleSpecialCodeSelection = (code) => {
    dispatch(setSpecialCodeInput(code.description?.trim()));
    setSpecialCodeFK(code.specialCodePK);
    dispatch(setSpecialCodeId(code.specialCodePK));
    dispatch(setSelectedSpecialCode(code));

    dispatch(setSpecialCodeSelection(false));
  };

  const handlePickupDealerSelection = (dealer) => {
    dispatch(setPickupDealerInput(dealer.name));
    setPickupDealerFK(dealer.dealerPK);
    dispatch(setSelectedPickupDealer(dealer));
  };

  const handleDeliveryDealerSelection = (dealer) => {
    dispatch(setDeliveryDealerInput(dealer.name));
    setDeliveryDealerFK(dealer.dealerPK);
    dispatch(setSelectedDeliveryDealer(dealer));
  };

  const returnBrokerPK = (broker) => {
    if (brokerType === "export") {
      return broker.exportBrokerPK;
    } else if (brokerType === "import") {
      return broker.importBrokerPK;
    }
  };
  const handleBrokerSelection = (broker) => {
    let brokerPK = returnBrokerPK(broker);
    dispatch(setBrokerInput(broker.name));
    dispatch(setBrokerId(brokerPK));
    dispatch(setSelectedBroker(broker));
  };

  function setDPUPickupData(e) {
    dispatch(
      setDPUPickupOwnerRedux({
        owner: e.target.value,
      })
    );
  }

  //this function is for validation of decimal
  function handleBeforeInput(e) {
    if (e.data === ".") {
      if (e.target.value.includes(".")) {
        e.preventDefault();
      }
    } else if (e.target.value.includes(".")) {
      const parts = e.target.value.split(".");
      if (parts.length > 1 && parts[1].length === 2) {
        e.preventDefault();
      }
    }
  }
  const handleInputValue = (e, setValue) => {
    let value = e.target.value;
    let indexOfDecimal = value.indexOf(".");

    if (value.length === 6 && indexOfDecimal === -1) {
      value = value.slice(0, 5) + "." + value.slice(5);
    } else if (indexOfDecimal === 5 && value.length === 6) {
    } else {
      value = value.replace(/[^\d\.]/g, "");
    }

    if (e.inputType === "deleteContentBackward" && value[indexOfDecimal - 1] === ".") {
      value = value.slice(0, indexOfDecimal - 1) + value.slice(indexOfDecimal);
      e.target.value = value;
      return;
    }

    e.target.value = value;
    setValue(e.target.value);
  };

  function handleBeforeInputForInteger(e, maxValue) {
    const currentValue = e.target.value;
    const inputChar = e.data;

    if (inputChar !== null && !/^[0-9+e]*$/.test(inputChar)) {
      e.preventDefault();
      return;
    }

    const newValue = parseInt(currentValue + inputChar, 10);
    if (newValue > maxValue) {
      e.preventDefault();
      return;
    }
  }

  const handlePortOfEntrySelection = (port) => {
    let portCity = port.usCity;
    dispatch(setPortOfEntryInput(portCity));
    dispatch(setPortOfEntryId(port.poePK));
    dispatch(setSelectedPortOfEntry(port));
  };

  const handlePaste = (index, event) => {
    event.preventDefault();
    let pasteData = event.clipboardData.getData("Text");
    if (pasteData.length > 205) {
      //30 * 7 characters
      pasteData = pasteData.substring(0, 205);
    }

    const words = pasteData.split(/\s+/); // split by any whitespace character
    const newInputValues = [...inputValues];
    let currentIndex = index;
    let truncated = false; // flag to check if paste data was truncated
    let i = 0; // counter for words array
    while (i < words.length && currentIndex < inputRefs.current.length) {
      const word = words[i];
      if (newInputValues[currentIndex].length + word.length > 30) {
        // check if word can fit into next input field
        if (
          currentIndex + 1 < newInputValues.length &&
          newInputValues[currentIndex + 1].length + word.length <= 30
        ) {
          currentIndex++;
        } else {
          // word cannot fit in current or next input field, truncate it
          const truncatedWord = word.substring(0, 30 - newInputValues[currentIndex].length);
          newInputValues[currentIndex] = newInputValues[currentIndex] + " " + truncatedWord;
          truncated = true;
          break;
        }
      } else {
        newInputValues[currentIndex] = newInputValues[currentIndex]
          ? newInputValues[currentIndex] + " " + word
          : word;
        if (newInputValues[currentIndex].length === 30) {
          // move to next input field if current input is full
          if (currentIndex === 6 && i < words.length - 1) {
            // if we're on the last input field and there are still words left
            const truncatedWord = words
              .slice(i + 1)
              .join(" ")
              .substring(0, 30);
            newInputValues[currentIndex] = newInputValues[currentIndex] + " " + truncatedWord;
            truncated = true;
            break;
          }
          currentIndex++;
        }
        i++;
      }
    }
    setInputValues(newInputValues);
    // move focus to next input field
    setTimeout(() => {
      if (newInputValues[currentIndex].length === 30 && currentIndex < inputRefs.current.length - 1) {
        inputRefs.current[currentIndex + 1].focus();
      } else {
        inputRefs.current[currentIndex].focus();
      }
    }, 0);
  };

  //Miscellaneous Text Fields Functionality
  const handleChange = useCallback(
    (index, event) => {
      const { value } = event.target;
      setInputValues((prevState) => {
        const newState = [...prevState];
        newState[index] = value;
        return newState;
      });

      if (value.length === 30 && index < inputRefs.current.length - 1) {
        if (value.endsWith(" ")) {
          inputRefs.current[index + 1].focus();
        } else {
          const words = value.split(" ");
          const lastWord = words.pop();
          const remainingText = words.join(" ");
          setInputValues((prevState) => {
            const newState = [...prevState];
            newState[index] = remainingText?.trim();
            return newState;
          });

          const nextIndex = index + 1;
          const nextValue = inputValues[nextIndex];
          if (nextValue.length === 30) {
            if (nextValue.endsWith(" ")) {
              inputRefs.current[nextIndex + 1].focus();
            } else {
              const nextWords = nextValue.split(" ");
              const firstWord = nextWords.shift();
              const remainingSpace = 30 - lastWord.length;
              if (remainingSpace >= firstWord.length + 1) {
                nextWords.unshift(lastWord);
                setInputValues((prevState) => {
                  const newState = [...prevState];
                  newState[nextIndex] = nextWords.filter((w) => w !== "").join(" ");
                  return newState;
                });
                inputRefs.current[nextIndex].focus();
              } else {
                inputRefs.current[nextIndex].focus();
                setInputValues((prevState) => {
                  const newState = [...prevState];
                  newState[nextIndex] = lastWord?.trim();
                  return newState;
                });
              }
            }
          } else {
            inputRefs.current[nextIndex].focus();
            setInputValues((prevState) => {
              const newState = [...prevState];
              newState[nextIndex] = lastWord?.trim();
              return newState;
            });
          }
        }
      } else if (value.length === 0 && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    },
    [inputRefs, inputValues, setInputValues]
  );

  // set input values
  useEffect(() => {
    //backend data
    const backendValues = [
      miscellaneousBolText1,
      miscellaneousBolText2,
      miscellaneousBolText3,
      miscellaneousBolText4,
      miscellaneousBolText5,
      miscellaneousBolText6,
      miscellaneousBolText7,
    ];
    setInputValues(backendValues);
  }, [
    miscellaneousBolText1,
    miscellaneousBolText2,
    miscellaneousBolText3,
    miscellaneousBolText4,
    miscellaneousBolText5,
    miscellaneousBolText6,
    miscellaneousBolText7,
    selectedCustomerAllData,
    selectedCustomerPlantData,
  ]);

  // render input fields
  const renderInputFields = () => {
    return inputValues.map((value, index) => {
      return (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="search"
          value={value}
          maxLength="30"
          onChange={(e) => handleChange(index, e)}
          onPaste={(e) => handlePaste(index, e)}
          style={{ whiteSpace: "pre-wrap", marginBottom: "10px" }}
          className={`customFormControl `}
        />
      );
    });
  };

  useEffect(() => {
    if (selectedCustomerAllData !== null) {
      setMiscellaneousBolText1(
        selectedCustomerAllData.miscellaneous1 ? selectedCustomerAllData.miscellaneous1 : ""
      );
      setMiscellaneousBolText2(
        selectedCustomerAllData.miscellaneous2 ? selectedCustomerAllData.miscellaneous2 : ""
      );
      setMiscellaneousBolText3(
        selectedCustomerAllData.miscellaneous3 ? selectedCustomerAllData.miscellaneous3 : ""
      );
      setMiscellaneousBolText4(
        selectedCustomerAllData.miscellaneous4 ? selectedCustomerAllData.miscellaneous4 : ""
      );
      setMiscellaneousBolText5(
        selectedCustomerAllData.miscellaneous5 ? selectedCustomerAllData.miscellaneous5 : ""
      );
      setMiscellaneousBolText6(
        selectedCustomerAllData.miscellaneous6 ? selectedCustomerAllData.miscellaneous6 : ""
      );
      setMiscellaneousBolText7(
        selectedCustomerAllData.miscellaneous7 ? selectedCustomerAllData.miscellaneous7 : ""
      );
    }
  }, [selectedCustomerAllData]);

  useEffect(() => {
    if (selectedCustomerPlantData !== null) {
      setInputValues(["", "", "", "", "", "", ""]);
      setTimeout(() => {
        setMiscellaneousBolText1(selectedCustomerPlantData?.miscellaneous1?.trim());
        setMiscellaneousBolText2(selectedCustomerPlantData?.miscellaneous2?.trim());
        setMiscellaneousBolText3(selectedCustomerPlantData?.miscellaneous3?.trim());
        setMiscellaneousBolText4(selectedCustomerPlantData?.miscellaneous4?.trim());
        setMiscellaneousBolText5(selectedCustomerPlantData?.miscellaneous5?.trim());
        setMiscellaneousBolText6(selectedCustomerPlantData?.miscellaneous6?.trim());
        setMiscellaneousBolText7(selectedCustomerPlantData?.miscellaneous7?.trim());
      }, 500);
    }
  }, [selectedCustomerPlantData]);

  useEffect(() => {
    setInputValues(["", "", "", "", "", "", ""]);
  }, [selectedCustomerId]);

  // Factory Release Process
  const getPlantReleaseValue = () => {
    OrderEntryService.getPlantReleaseFlag()
      .then((response) => {
        const data = response.data;
        dispatch(setReleaseProcessFlag(data.requirePlantReleases));
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (selectedCustomerId) {
      getPlantReleaseValue();
    }
  }, [selectedCustomerId]);

  /**
   * Setting as FOD Unit
   */
  useEffect(() => {
    if (isallDealersFOD) {
      setIsContactorInvoiceVisible(true);
      dispatch(setIsFODInvoice(true));
    } else if (isCustomerMisc) {
      setIsContactorInvoiceVisible(true);
      dispatch(setIsFODInvoice(true));
    } else if (deliveryDealerFK !== null && customerDealerList && customerDealerList.length > 0) {
      if (customerDealerList[0]?.foddealer === true) {
        setIsContactorInvoiceVisible(true);
        dispatch(setIsFODInvoice(true));
      } else setIsContactorInvoiceVisible(false);
      dispatch(setIsFODInvoice(false));
    } else {
      setIsContactorInvoiceVisible(false);
      dispatch(setIsFODInvoice(false));
    }
  }, [customerDealerList, isCustomerMisc, deliveryDealerFK, selectedDeliveryDealer, isallDealersFOD]);

  //Multi Load Implementation
  const fetchAllMultiUnitLoads = () => {
    OrderEntryService.fetchAllUnitMultiLoads(
      selectedCustomerId,
      selectedCustomerBillingPlantId,
      pickupDealerFK,
      pickupCustomerPlantId,
      miscPickupID
    ).then((response) => {
      const data = response.data;
      const trimmedList = data?.map((multiload) => ({ ...multiload, city: multiload.city?.trim() }));
      setUnitMultiLoadList(trimmedList);
    });
  };

  const [multiUnitLoadData, setMultiUnitLoadData] = useState("");
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [cityMaxLimit, setCityMaxLimit] = useState(false);
  const [citiesWithStatecode, setCitiesWithStatecode] = useState("");
  const [distanceINMiles, setDistanceINMiles] = useState(0);
  const [hideInvoiceFlag, setHideInvoiceFlag] = useState(true);
  const [multiUnitLoadError, setMultiUnitLoadError] = useState(false);
  const [distanceCalculationInitiated, setDistanceCalculationInitiated] = useState(false);
  const [loadingForMultiUnitLoad, setLoadingForMultiUnitLoad] = useState(false);
  const [isMultiUnitPopUpLoad, setIsMultiUnitPopUpLoad] = useState(false);
  const [multiUnitPopupLoad, setMultiUnitPopupLoad] = useState(false);
  const [isMultiUnitTruckCamper, setIsMultiUnitTruckCamper] = useState(false);
  const [multiUnitTrcukCamper, setMultiUnitTruckCamper] = useState(false);

  const handleMultiLoadSelectionFromDropdown = (multiload) => {
    setMultiUnitLoadInput(multiload.city);
    setUnitMultiLoadPK(multiload.unitMultiLoadPK);
    setCitiesWithStatecode(multiload.cityWithStateCode);
    setMultiUnitLoadData(multiload);
  };

  const handleClose = () => {
    setMultiUnitLoadInput("");
    setMultiUnitLoadData("");
    setCitiesWithStatecode("");
    setWarningPopUP(false);
    setShowMoreInfo(false);
    setDistanceCalculationInitiated(false);
  };

  const handleYes = () => {
    dispatch(setUnitMultiLoads(unitMultiLoadsData));
    setWarningPopUP(false);
    setCitiesWithStatecode("");
    setDistanceCalculationInitiated(false);
  };

  const handleToggleShowMoreInfo = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  const unitMultiLoadsData = {
    customerFK: selectedCustomerId,
    customerPlantFK: selectedCustomerBillingPlantId,
    pickupDealerFK: pickupDealerFK,
    pickupCustomerPlantFK: pickupCustomerPlantId,
    pickupUnitAddressFK: miscPickupID,
    deliveryDealerFK: deliveryDealerFK,
    deliveryUnitAddressFK: miscDeliveryID,
    deliveryCustomerPlantFK: deliveryCustomerPlantId,
    unitMultiLoadPK: unitMultiLoadPK,
    totalUnits: unitsPerDispatch,
    twoAsThree: invoice2as3,
    popupLoad: multiUnitPopupLoad,
    truckCamperLoad: multiUnitTrcukCamper,
  };
  // Finding distance between using PC Miler
  const findDistancePCMiler = (primaryCity, primaryStateCode) => {
    if (primaryCity !== null && primaryStateCode !== null && selectedDeliveryDealer !== null) {
      let pickupDeliverylocation = {
        src: {
          city: primaryCity || "",
          stateCode: primaryStateCode || "",
        },
        dst: {
          city: selectedDeliveryDealer.city || "",
          stateCode: selectedDeliveryDealer.stateCode || "",
        },
      };
      PcMilerService.calculateDistance(pickupDeliverylocation)
        .then((res) => {
          if (res != null && res.data !== "") {
            const data = res.data;
            setDistanceINMiles(data.distance ? Math.round(data.distance) : 0);
          }
        })
        .catch((err) => {
          setMultiUnitLoadError(true);
          console.log(err);
        });
    }
  };

  //Delivery Dealer
  useEffect(() => {
    if (
      deliveryDealerFK !== "" &&
      multiUnitLoadInput !== "" &&
      multiUnitLoadInput !== undefined &&
      unitMultiLoadPK !== null &&
      citiesWithStatecode !== ""
    ) {
      const cityWithStateCode = citiesWithStatecode
        .split("--")
        .map((cityState) => cityState.replace(/\s/g, ""));
      const deliveryDealerCityWithStateCode = `${deliveryDealerCity.replace(/\s/g, "")},${deliveryDealerState.replace(/\s/g, "")}`;
      const isCityStateAvailable = cityWithStateCode.includes(deliveryDealerCityWithStateCode?.trim());
      if (!isCityStateAvailable) {
        if (cityWithStateCode.length === 3) {
          setCityMaxLimit(true);
        }
        const [city, state] = cityWithStateCode[0]?.split(",") || "";
        if (!distanceCalculationInitiated && !loadingForMultiUnitLoad) {
          setDistanceCalculationInitiated(true);
          setLoadingForMultiUnitLoad(true); // Set loading to true
          //Call PC Miler Calculation
          findDistancePCMiler(city, state);
        }
        if (distanceINMiles > 15 || multiUnitLoadError) {
          setWarningPopUP(true);
          setLoadingForMultiUnitLoad(false); // Set loading to false when modal is shown
        }
      } else {
        dispatch(setUnitMultiLoads(unitMultiLoadsData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    citiesWithStatecode,
    deliveryDealerCity,
    deliveryDealerFK,
    deliveryDealerState,
    multiUnitLoadInput,
    unitMultiLoadPK,
    unitMultiLoadsData,
    distanceINMiles,
    distanceCalculationInitiated,
    loadingForMultiUnitLoad,
  ]);

  //Delivery Micellaneous Dealer
  useEffect(() => {
    if (
      miscDeliveryID !== "" &&
      multiUnitLoadInput !== "" &&
      multiUnitLoadInput !== undefined &&
      unitMultiLoadPK !== null &&
      citiesWithStatecode !== ""
    ) {
      const cityWithStateCode = citiesWithStatecode
        .split("--")
        .map((cityState) => cityState.replace(/\s/g, ""));
      const deliveryDealerCityWithStateCode = `${deliveryDealerCity.replace(/\s/g, "")},${deliveryDealerState.replace(/\s/g, "")}`;
      const isCityStateAvailable = cityWithStateCode.includes(deliveryDealerCityWithStateCode?.trim());
      if (!isCityStateAvailable) {
        if (cityWithStateCode.length === 3) {
          setCityMaxLimit(true);
        }
        const [city, state] = cityWithStateCode[0]?.split(",") || "";
        if (!distanceCalculationInitiated && !loadingForMultiUnitLoad) {
          //Set the flag to indicate that the calculation is initiated
          setDistanceCalculationInitiated(true);
          setLoadingForMultiUnitLoad(true); // Set loading to true
          //Call PC Miler Calculation
          findDistancePCMiler(city, state);
        }
        if (distanceINMiles > 15 || multiUnitLoadError) {
          setWarningPopUP(true);
          setLoadingForMultiUnitLoad(false); // Set loading to false when modal is shown
        }
      } else {
        dispatch(setUnitMultiLoads(unitMultiLoadsData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    citiesWithStatecode,
    deliveryDealerCity,
    miscDeliveryID,
    deliveryDealerState,
    multiUnitLoadInput,
    unitMultiLoadPK,
    unitMultiLoadsData,
    distanceINMiles,
    distanceCalculationInitiated,
    loadingForMultiUnitLoad,
  ]);

  //Delivery Plant
  useEffect(() => {
    if (
      deliveryCustomerPlantId !== null &&
      multiUnitLoadInput !== "" &&
      multiUnitLoadInput !== undefined &&
      unitMultiLoadPK !== null &&
      citiesWithStatecode !== ""
    ) {
      const cityWithStateCode = citiesWithStatecode
        .split("--")
        .map((cityState) => cityState.replace(/\s/g, ""));
      const deliveryDealerCityWithStateCode = `${deliveryDealerCity.replace(/\s/g, "")},${deliveryDealerState.replace(/\s/g, "")}`;
      const isCityStateAvailable = cityWithStateCode.includes(deliveryDealerCityWithStateCode?.trim());
      if (!isCityStateAvailable) {
        if (cityWithStateCode.length === 3) {
          setCityMaxLimit(true);
        }
        const [city, state] = cityWithStateCode[0]?.split(",") || "";
        if (!distanceCalculationInitiated && !loadingForMultiUnitLoad) {
          //Set the flag to indicate that the calculation is initiated
          setDistanceCalculationInitiated(true);
          setLoadingForMultiUnitLoad(true); // Set loading to true
          //Call PC Miler Calculation
          findDistancePCMiler(city, state);
        }
        if (distanceINMiles > 15 || multiUnitLoadError) {
          setWarningPopUP(true);
          setLoadingForMultiUnitLoad(false); // Set loading to false when modal is shown
        }
      } else {
        dispatch(setUnitMultiLoads(unitMultiLoadsData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    citiesWithStatecode,
    deliveryDealerCity,
    deliveryCustomerPlantId,
    deliveryDealerState,
    multiUnitLoadInput,
    unitMultiLoadPK,
    unitMultiLoadsData,
    distanceINMiles,
    distanceCalculationInitiated,
    loadingForMultiUnitLoad,
  ]);

  useEffect(() => {
    if (unitsPerDispatch > 2) {
      if (multiUnitLoadData !== "") {
        if (multiUnitLoadData?.city === "Add New Record") {
          if (isUnitPopUp || isUnitTruckCamper) {
            setIsMilesLowBoy(false);
            dispatch(setIsMilesLowBoyRedux(false));
          } else {
            setIsMilesLowBoy(true);
            dispatch(setIsMilesLowBoyRedux(true));
          }
        } else if (multiUnitLoadData?.popupLoad || multiUnitLoadData?.truckCamperLoad) {
          setIsMilesLowBoy(false);
          dispatch(setIsMilesLowBoyRedux(false));
        } else if (!multiUnitLoadData?.popupLoad && !multiUnitLoadData?.truckCamperLoad) {
          setIsMilesLowBoy(true);
          dispatch(setIsMilesLowBoyRedux(true));
        }
      } else {
        if (isUnitPopUp || isUnitTruckCamper) {
          setIsMilesLowBoy(false);
          dispatch(setIsMilesLowBoyRedux(false));
        } else {
          setIsMilesLowBoy(true);
          dispatch(setIsMilesLowBoyRedux(true));
        }
      }
    } else {
      setIsMilesLowBoy(false);
      dispatch(setIsMilesLowBoyRedux(false));
    }

    if (!multiUnit) {
      setIsMilesLowBoy(false);
      dispatch(setIsMilesLowBoyRedux(false));
    }
  }, [unitsPerDispatch, multiUnitLoadData, selectedUnitType, multiUnit]);

  useEffect(() => {
    if (multiUnit === false) {
      setMultiUnitLoadInput("");
      setWarningPopUP(false);
      setShowMoreInfo(false);
      setCityMaxLimit(false);
      setUnitsPerDispatch(2);
    }
  }, [multiUnit]);

  useEffect(() => {
    dispatch(setUnitMultiLoads(unitMultiLoadsData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCustomerId, deliveryDealerFK, unitMultiLoadPK, unitMultiLoadsData]);

  useEffect(() => {
    setMiscPickupID(selectedMiscPickupID);
  }, [selectedMiscPickupID]);

  useEffect(() => {
    setMiscDeliveryID(selectedMiscDeliveryID);
  }, [selectedMiscDeliveryID]);

  useEffect(() => {
    if (miscellaneousPickup === false) setMiscPickupID("");
    setMultiUnitLoadInput("");
  }, [miscellaneousPickup]);

  useEffect(() => {
    if (miscDelivery === false) setMiscDeliveryID("");
    setMultiUnitLoadInput("");
  }, [miscDelivery]);

  useEffect(() => {
    if (
      (pickupDealerFK === null || pickupCustomerPlantId === null || miscPickupID === "") &&
      (deliveryDealerFK === null || deliveryCustomerPlantId === null || miscDeliveryID === "")
    ) {
      if (!isMultiUnitDefault) setMultiUnit(false);
    }
  }, [
    deliveryCustomerPlantId,
    deliveryDealerFK,
    miscDeliveryID,
    miscPickupID,
    pickupCustomerPlantId,
    pickupDealerFK,
  ]);

  useEffect(() => {
    setInvoice2as3(multiUnitLoadData?.twoAsThree || false);
  }, [multiUnitLoadData]);
  //code by akhil bugfixing
  useEffect(() => {
    if (
      selectedUnitType != null &&
      selectedUnitType.towable === true &&
      selectedUnitType.allowMultiUnit === true &&
      selectedUnitType.allowOnThirtyFive === true
    ) {
      setUnitsPerDispatch(2);
    }
  }, [selectedUnitType]);

  //Invoice 2 as 3 check box visibility
  useEffect(() => {
    if (multiUnit && multiUnitLoadInput?.length > 0) {
      if (unitsPerDispatch > 2) {
        setHideInvoiceFlag(true);
      } else {
        if (batchLoadCustomerTab) setHideInvoiceFlag(true);
        else setHideInvoiceFlag(false);
      }
    } else {
      setHideInvoiceFlag(true);
    }
  }, [unitsPerDispatch, multiUnit, multiUnitLoadInput]);

  useEffect(() => {
    const filteredList = unitMultiLoadList.filter((item) => item.totalUnits == unitsPerDispatch);
    const extraRecord = {
      unitMultiLoadPK: null,
      city: "Add New Record",
    };
    if (isUnitPopUp) {
      // Include only records where `popup` is true
      const popupRecords = filteredList.filter((item) => item.popupLoad === true);
      const updatedData = [...popupRecords, extraRecord];
      setFilteredUnitMultiLoadList(updatedData);
    } else if (isUnitTruckCamper) {
      // Include only records where `truckCamperLoad` is true
      const truckCamperRecords = filteredList.filter((item) => item.truckCamperLoad === true);
      const updatedData = [...truckCamperRecords, extraRecord];
      setFilteredUnitMultiLoadList(updatedData);
    } else {
      // Exclude records where `popupLoad` is true or 'truckCamperLoad' is true
      const nonPopupAndNonTruckCamperRecords = filteredList.filter(
        (item) => !item.popupLoad && !item.truckCamperLoad
      );
      const updatedData = [...nonPopupAndNonTruckCamperRecords, extraRecord];
      setFilteredUnitMultiLoadList(updatedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitMultiLoadList, unitsPerDispatch, multiUnit]);

  useEffect(() => {
    setMultiUnitLoadInput("");
    setMultiUnitLoadData("");
  }, [unitsPerDispatch]);

  // Multi Unit Pop up Load
  useEffect(() => {
    if (isUnitPopUp) {
      if (multiUnitLoadData?.city === "Add New Record" && unitsPerDispatch >= 3) {
        setIsMultiUnitPopUpLoad(true);
      }
    } else {
      setIsMultiUnitPopUpLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiUnitLoadData]);

  const handleMultiUnitPopupLoadModalYes = () => {
    setMultiUnitPopupLoad(true);
    setIsMultiUnitPopUpLoad(false);
    setMultiUnitTruckCamper(false);
  };

  const handleMultiUnitPopupLoadModalNo = () => {
    setIsMultiUnitPopUpLoad(false);
  };

  const handleMultiUnitPopupLoadModalClose = () => {
    setMultiUnitLoadInput("");
    setIsMultiUnitPopUpLoad(false);
  };

  useEffect(() => {
    if (parseFloat(invoiceFlatrate) > 0) {
      dispatch(setInvoiceAmount(invoiceFlatrate));
    } else if (invoiceFlatrate == "") dispatch(setInvoiceAmount(0));
  }, [invoiceFlatrate]);

  useEffect(() => {
    if (parseFloat(driverFlatrate) > 0) {
      dispatch(setDriverAmount(driverFlatrate));
    } else if (driverFlatrate == "") dispatch(setDriverAmount(0));
  }, [driverFlatrate]);

  // For pop up load and truck camper clearing fix
  useEffect(() => {
    if (!unitTypeFK) {
      setMultiUnitPopupLoad(false);
      setMultiUnitTruckCamper(false);
    }
  }, [unitTypeFK]);

  const handleMultiUnitTruckCamperModalYes = () => {
    setMultiUnitTruckCamper(true);
    setIsMultiUnitTruckCamper(false);
    setMultiUnitPopupLoad(false);
  };

  const handleMultiUnitTruckCamperModalNo = () => {
    setIsMultiUnitTruckCamper(false);
  };

  const handleMultiUnitTruckCamperModalClose = () => {
    setMultiUnitLoadInput("");
    setIsMultiUnitTruckCamper(false);
  };

  return (
    <Formik
      initialValues={{
        unitNum,
        collectForCustomers,
      }}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <div style={{ minWidth: "1230px !important" }}>
          <div
            style={{ minWidth: "1230px !important" }}
            className={`p-2 mb-0  ${styles.miscConatiner} ${styles.orderEntryHeight} `}
          >
            <Row>
              {/* COL 1 */}
              <Col xs={4}>
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className={`customColFormLabel text-capitalize`}>Unit Type</Form.Label>
                    <TooltipWrapper fieldName={"unitType"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className={`p-0 ${styles.selectContainer}`}>
                    {/* Unit Type Autocomplete */}
                    <AutoCompleteDropdown
                      arrayList={unitTypesList}
                      searchString={unitTypeInput}
                      renderItemId={(unitType) => unitType.unitTypePK}
                      renderItemField={(unitType) => unitType.descriptionLong}
                      handleSearchString={(string) => dispatch(setUnitTypeInput(string))}
                      fetchDataBySearchString={fetchUnitTypeByName}
                      onSelect={handleUnitTypeSelection}
                      matchContains
                      loading={unitTypeLoading}
                      selectedId={unitTypeFK}
                      clearInputCallback={() => {
                        dispatch(setUnitTypeData(null));
                        setUnitTypeFK("");
                        dispatch(setUnitTypesFK(""));
                        setShowMultiUnitLoadDiv(false);
                      }}
                      className={`${unitTypeFK === "" || unitTypeFK === null ? "borderRed" : "borderGreen"}`}
                    />
                    <LookupButton onClick={handleUnitTypeLookupModalShow} />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label
                      htmlFor="name"
                      className={`customColFormLabel text-capitalize`}
                      id="unitNumber"
                    >
                      unit number
                    </Form.Label>
                    <TooltipWrapper fieldName={"unitNumber"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0">
                    <input
                      className={`customFormControl 
                      ${
                        unitNum || (unitNum.length >= 1 && formik.errors.unitNumber === undefined)
                          ? checkUnitNumber
                            ? "borderRed"
                            : formik.errors.unitNumber !== undefined
                              ? "borderRed"
                              : "borderGreen"
                          : "borderRed"
                      }`}
                      id="unitNumber"
                      name="unitNumber"
                      type="text"
                      maxLength={batchLoadCustomerTab ? 21 - firstBatchSequence.length : 21}
                      value={unitNum}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        formik.handleChange(e);
                        const value = e.target?.value?.toUpperCase();
                        setUnitNum(value);
                        setCheckUnitNumber("");
                      }}
                      onBlur={(e) => {
                        hanldeCheckUnitNumber(e.target?.value);
                      }}
                      style={{
                        borderColor:
                          unitNum || (unitNum.length >= 1 && formik.errors.unitNumber === undefined)
                            ? checkUnitNumber
                              ? "red"
                              : formik.errors.unitNumber !== undefined
                                ? "red"
                                : "green"
                            : "red",
                      }}
                    />
                  </Col>
                </Form.Group>

                {
                  <Row className={`${(unitTypeFK === "" || !checkUnitNumber) && "hide-elements"}`}>
                    <Col xs={4} md={4} sm={4}></Col>
                    <Col style={{ paddingLeft: "5px" }}>
                      <p className="mb-0 text-danger" style={{ height: "7px" }}>
                        {checkUnitNumber}
                      </p>
                    </Col>
                  </Row>
                }

                <Form.Group
                  className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label htmlFor="name" className={`customColFormLabel text-capitalize`} id="model">
                      model
                    </Form.Label>
                    <TooltipWrapper fieldName={"model"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl 
                      ${
                        !isCustomerRequireModel
                          ? ""
                          : model || model.length >= 1
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="model"
                      name="model"
                      type="text"
                      maxLength={21}
                      value={model}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        setUnitModel(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label
                      htmlFor="name"
                      className={`customColFormLabel text-capitalize`}
                      id="modelCode"
                    >
                      model code
                    </Form.Label>
                    <TooltipWrapper fieldName={"modelCode"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl 
                      ${
                        !isCustomerRequireModelCode
                          ? ""
                          : modelCode || modelCode.length >= 1
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="modelCode"
                      name="modelCode"
                      type="text"
                      maxLength={21}
                      value={modelCode}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        setUnitModelCode(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label htmlFor="name" className={`customColFormLabel text-capitalize`} id="vin">
                      VIN
                    </Form.Label>
                    <TooltipWrapper fieldName={"vin"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl 
                      ${
                        !isCustomerRequireVIN
                          ? ""
                          : unitVin || unitVin.length >= 1
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="vin"
                      name="vin"
                      type="text"
                      maxLength={21}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={unitVin}
                      onChange={(e) => {
                        setUnitVin(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label
                      htmlFor="name"
                      className={`customColFormLabel text-capitalize`}
                      id="serialNumber"
                    >
                      serial number
                    </Form.Label>
                    <TooltipWrapper fieldName={"serialNumber"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl 
                      ${
                        !isCustomerRequireSerialNum
                          ? ""
                          : serialNumber || serialNumber.length >= 1
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="serialNumber"
                      name="serialNumber"
                      type="text"
                      maxLength={21}
                      value={serialNumber}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        setUnitSerialNumber(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label
                      htmlFor="name"
                      className={`customColFormLabel text-capitalize`}
                      id="stockNumber"
                    >
                      stock number
                    </Form.Label>
                    <TooltipWrapper fieldName={"stockNumber"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl 
                      ${
                        !isCustomerRequireStockNum
                          ? ""
                          : stockNumber || stockNumber.length >= 1
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="stockNumber"
                      name="stockNumber"
                      type="text"
                      maxLength={21}
                      value={stockNumber}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        setUnitStockNumber(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                ${unitTypeFK == "" || !isMotorized ? "hide-elements" : ""}`}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className={`customColFormLabel text-capitalize`} id="engineType">
                      engine type
                    </Form.Label>
                    <TooltipWrapper fieldName={"engineType"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className={`p-0 ${styles.selectContainer}`}>
                    <Col className="d-flex align-items-center">
                      <input
                        type="radio"
                        name="engine"
                        id="enginegas"
                        value="enginegas"
                        checked={radioValue === "enginegas"}
                        disabled={towable}
                        onChange={(e) => {
                          setRadioValue(e.target.value);
                        }}
                      />{" "}
                      <label className="ms-2" htmlFor="">
                        Gas
                      </label>{" "}
                    </Col>
                    <Col className="d-flex align-items-center">
                      <input
                        type="radio"
                        name="engine"
                        id="enginediesel"
                        value="enginediesel"
                        checked={radioValue === "enginediesel"}
                        disabled={towable}
                        onChange={(e) => {
                          setRadioValue(e.target.value);
                        }}
                      />{" "}
                      <label className="ms-2" htmlFor="">
                        Diesel
                      </label>{" "}
                    </Col>
                    <Col className={`d-flex align-items-center ${!isEngineNAVisible ? "hide-elements" : ""}`}>
                      <input
                        type="radio"
                        name="engine"
                        id="enginena"
                        value="enginena"
                        checked={towable || radioValue === "enginena"}
                        disabled={towable}
                        onChange={(e) => {
                          setRadioValue(e.target.value);
                        }}
                      />{" "}
                      <label className="ms-2" htmlFor="">
                        NA
                      </label>{" "}
                    </Col>
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className={`customColFormLabel text-capitalize`} id="specialCode">
                      special code
                    </Form.Label>
                    <TooltipWrapper fieldName={"specialCode"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className={`p-0 ${styles.selectContainer}`}>
                    {/* Special Code Autocomplete */}

                    <AutoCompleteDropdown
                      arrayList={specialCodeList}
                      searchString={specialCodeInput}
                      renderItemId={(code) => code.specialCodePK}
                      renderItemField={(code) => code.description}
                      handleSearchString={(string) => dispatch(setSpecialCodeInput(string))}
                      fetchDataBySearchString={fetchSpecialCodeByName}
                      onSelect={handleSpecialCodeSelection}
                      selectedId={specialCodeFK || specialCodeId}
                      clearInputCallback={() => {
                        setSpecialCodeFK(null);
                        dispatch(setSpecialCodeId(null));
                        dispatch(setSelectedSpecialCode(null));
                      }}
                    />
                    <i
                      className={`fa-solid fa-magnifying-glass lookupMagnifierIcon`}
                      onClick={handleSpecialCodeLookupModalShow}
                      // Special Code Modal Lookup @ Bottom
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className={`customColFormLabel text-capitalize`} id="pickupDealer">
                      pickup dealer
                    </Form.Label>
                    <TooltipWrapper fieldName={"pickupDealer"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className={`p-0 ${styles.selectContainer}`}>
                    {/* Pickup Dealer Autocomplete */}
                    <AutoCompleteDropdown
                      arrayList={pickupDealerList}
                      searchString={pickupDealerInput}
                      renderItemId={(dealer) => dealer.dealerPK}
                      renderItemField={(dealer) => dealer.name}
                      handleSearchString={(string) => dispatch(setPickupDealerInput(string))}
                      fetchDataBySearchString={fetchPickupDealerByName}
                      onSelect={handlePickupDealerSelection}
                      selectedId={pickupDealerFK}
                      matchContains
                      clearInputCallback={() => {
                        setPickupDealerFK(null);
                        dispatch(setSelectedPickupDealer(null));
                        dispatch(setSelectedPortOfEntry(null));
                        dispatch(setPortOfEntryInput(""));
                      }}
                      className={
                        pickupAtPlant || miscellaneousPickup
                          ? ""
                          : pickupDealerFK === null && pickupAtPlant == false && miscellaneousPickup == false
                            ? "borderRed"
                            : "borderGreen"
                      }
                      disabled={pickupAtPlant || miscellaneousPickup}
                      loading={pickupDealerLoading}
                    />
                    <i
                      className={`fa-solid fa-magnifying-glass lookupMagnifierIcon 
                      ${pickupAtPlant || miscellaneousPickup ? "hide-elements" : ""}`}
                      onClick={handlePickupDealerLookupModalShow}
                      style={
                        pickupAtPlant || miscellaneousPickup ? { pointerEvents: "none", opacity: "0.7" } : {}
                      }

                      // Dealer Modal Lookup @ Bottom
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0`}
                  hidden={unitTypeFK == ""}
                >
                  <Col
                    sm={4}
                    md={4}
                    xs={4}
                    className="p-0  d-flex justify-content-end"
                    style={{
                      position: "relative",
                      right: "20px",
                    }}
                  >
                    <Form.Label
                      htmlFor=""
                      className={`customColFormLabel text-capitalize
                      ${pickupAtPlant || miscellaneousPickup ? "hide-elements" : ""}`}
                    >
                      Search By State/City
                    </Form.Label>
                    <input
                      type="radio"
                      name="name"
                      id="searchByStateCity"
                      value="searchByStateCity"
                      checked={pickupDealersearchType === "searchByStateCity"}
                      onChange={(e) => {
                        setPickupDealersearchType(e.target.value);
                      }}
                      className={`mt-1 ${pickupAtPlant || miscellaneousPickup ? "hide-elements" : ""}`}
                      style={{ marginLeft: "5px" }}
                    />
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl `}
                      id="dealerSelectionOne"
                      name="dealerSelectionOne"
                      value={pickupDealerAdd1}
                      disabled
                      type="text"
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col
                    sm={4}
                    md={4}
                    xs={4}
                    className="p-0  d-flex justify-content-end"
                    style={{
                      position: "relative",
                      right: "20px",
                    }}
                  >
                    <Form.Label
                      htmlFor=""
                      className={`customColFormLabel text-capitalize 
                      ${pickupAtPlant || miscellaneousPickup ? "hide-elements" : ""}`}
                    >
                      Search By Name
                    </Form.Label>
                    <input
                      type="radio"
                      name="name"
                      id="name"
                      value="Name"
                      checked={pickupDealersearchType === "Name"}
                      onChange={(e) => {
                        setPickupDealersearchType(e.target.value);
                      }}
                      className={`mt-1 ${pickupAtPlant || miscellaneousPickup ? "hide-elements" : ""}`}
                      style={{ marginLeft: "5px" }}
                    />
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl `}
                      id="dealerSelectionTwo"
                      name="dealerSelectionTwo"
                      value={pickupDealerAdd2}
                      disabled
                      type="text"
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`}></Form.Label>
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl `}
                      id="dealerSelectionThree"
                      name="dealerSelectionThree"
                      value={pickupDealerCSZ}
                      disabled
                      type="text"
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                ${!allowMiscDealer || pickupAtPlant || pickupDealerFK !== null ? "hide-elements" : ""}`}
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className={`customColFormLabel text-capitalize`} id="miscellaneousPickup">
                      Miscellaneous pickup
                    </Form.Label>
                    <TooltipWrapper fieldName={"miscellaneousPickup"} />
                  </Col>

                  <Col xs={7} md={5} sm={7} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="miscellaneousPickup"
                      name="miscellaneousPickup"
                      value={miscellaneousPickup}
                      checked={miscellaneousPickup}
                      disabled={pickupAtPlant || pickupDealerFK !== null}
                      onChange={(e) => {
                        setMiscellaneousPickup(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className={`customColFormLabel text-capitalize`} id="deliveryDealer">
                      delivery dealer
                    </Form.Label>
                    <TooltipWrapper fieldName={"deliveryDealer"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className={`p-0 ${styles.selectContainer}`}>
                    {/* Delivery Dealer Autocomplete */}
                    <AutoCompleteDropdown
                      arrayList={deliveryDealersList}
                      searchString={deliveryDealerInput}
                      renderItemId={(dealer) => dealer.dealerPK}
                      renderItemField={(dealer) => dealer.name}
                      handleSearchString={(string) => dispatch(setDeliveryDealerInput(string))}
                      fetchDataBySearchString={fetchDeliveryDealerByName}
                      onSelect={handleDeliveryDealerSelection}
                      selectedId={deliveryDealerFK}
                      clearInputCallback={() => {
                        setDeliveryDealerFK(null);
                        dispatch(setSelectedDeliveryDealer(null));
                        dispatch(setSelectedPortOfEntry(null));
                      }}
                      className={
                        deliverToPlant || miscDelivery
                          ? ""
                          : deliveryDealerFK === null && deliverToPlant == false && miscDelivery == false
                            ? "borderRed"
                            : "borderGreen"
                      }
                      disabled={deliverToPlant || miscDelivery}
                      loading={deliveryDealerLoading}
                      towardsTop
                    />
                    <i
                      className={`fa-solid fa-magnifying-glass lookupMagnifierIcon
                      ${deliverToPlant || miscDelivery ? "hide-elements" : ""}`}
                      onClick={handleDeliveryDealerLookupModalShow}
                      style={deliverToPlant || miscDelivery ? { pointerEvents: "none", opacity: "0.7" } : {}}
                      // Dealer Modal Lookup @ Bottom
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col
                    sm={4}
                    md={4}
                    xs={4}
                    className="p-0  d-flex justify-content-end"
                    style={{
                      position: "relative",
                      right: "20px",
                    }}
                  >
                    <Form.Label
                      htmlFor=""
                      className={`customColFormLabel text-capitalize
                      ${deliverToPlant || miscDelivery ? "hide-elements" : ""}`}
                    >
                      Search By State/City
                    </Form.Label>
                    <input
                      type="radio"
                      name="deliverydealer"
                      id="searchByStateCity"
                      value="searchByStateCity"
                      checked={deliveryDealersearchType === "searchByStateCity"}
                      onChange={(e) => {
                        setDeliveryDealersearchType(e.target.value);
                      }}
                      className={`mt-1 ${deliverToPlant || miscDelivery ? "hide-elements" : ""}`}
                      style={{ marginLeft: "5px" }}
                    />
                  </Col>
                  <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl `}
                      id="dealerSectionOne"
                      name="dealerSectionOne"
                      type="text"
                      value={deliveryDealerAdd1}
                      disabled
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col
                    sm={4}
                    md={4}
                    xs={4}
                    className="p-0  d-flex justify-content-end"
                    style={{
                      position: "relative",
                      right: "20px",
                    }}
                  >
                    <Form.Label
                      htmlFor=""
                      className={`customColFormLabel text-capitalize
                      ${deliverToPlant || miscDelivery ? "hide-elements" : ""}`}
                    >
                      Search By Name
                    </Form.Label>
                    <input
                      type="radio"
                      name="deliverydealer"
                      id="name"
                      value="Name"
                      checked={deliveryDealersearchType === "Name"}
                      onChange={(e) => {
                        setDeliveryDealersearchType(e.target.value);
                      }}
                      className={`mt-1 ${deliverToPlant || miscDelivery ? "hide-elements" : ""}`}
                      style={{ marginLeft: "5px" }}
                    />
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl `}
                      id="dealerSectionTwo"
                      name="dealerSectionTwo"
                      type="text"
                      value={deliveryDealerAdd2}
                      disabled
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`}></Form.Label>
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl `}
                      id="dealerSectionTwo"
                      name="dealerSectionTwo"
                      type="text"
                      value={deliveryDealerCSZ}
                      disabled
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-3 form-group m-t-5 m-b-15 align-items-center row  m-l-0 m-r-0 ms-0
                ${!allowMiscDealer || deliverToPlant || deliveryDealerFK !== null ? "hide-elements" : ""}`}
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className={`customColFormLabel text-capitalize`} id="miscellaneousDelivery">
                      Miscellaneous delivery
                    </Form.Label>
                    <TooltipWrapper fieldName={"miscellaneousDelivery"} />
                  </Col>

                  <Col xs={7} md={5} sm={7} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id=" miscellaneousDelivery"
                      name=" miscellaneousDelivery"
                      value={miscDelivery}
                      checked={miscDelivery}
                      disabled={deliverToPlant || deliveryDealerFK !== null}
                      onChange={(e) => {
                        setMiscDelivery(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>

              {/* COL 2 */}
              <Col xs={3} hidden={unitTypeFK == ""}>
                <Form.Group
                  className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0`}
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label
                      htmlFor=""
                      className={`customColFormLabel text-capitalize`}
                      id="collectForCustomer"
                    >
                      collect for customers
                    </Form.Label>
                    <TooltipWrapper fieldName={"collectForCustomer"} />
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl 

                        ${
                          !collectForCustomers
                            ? ""
                            : collectForCustomers > 0 && isValidDecimalforNine(collectForCustomers)
                              ? ""
                              : "borderRed"
                        }`}

                      id="colectCustomers"
                      name="colectCustomers"
                      type="text"
                      value={collectForCustomers}
                      maxLength={10}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onBeforeInput={(e) => {
                        if (e.data === ".") {
                          if (e.target.value.includes(".")) {
                            e.preventDefault();
                          }
                        } else if (e.target.value.includes(".")) {
                          const parts = e.target.value.split(".");
                          if (parts.length > 1 && parts[1].length === 2) {
                            e.preventDefault();
                          }
                        }
                      }}
                      // correctDecimalInputOnBlur
                      onBlur={(e) => {
                        formik.handleBlur(e);
                        setCollectForCustomers(correctDecimalInputOnBlur(collectForCustomers));
                      }}

                      onChange={(e) => {
                        let value = e.target.value;
                        let indexOfDecimal = value.indexOf(".");

                        if (value.length === 8 && indexOfDecimal === -1) {
                          value = value.slice(0, 7) + "." + value.slice(7);
                        } else if (indexOfDecimal === 7 && value.length === 8) {
                        } else {
                          value = value.replace(/[^\d\.]/g, "");
                        }

                        if (e.inputType === "deleteContentBackward" && value[indexOfDecimal - 1] === ".") {
                          value = value.slice(0, indexOfDecimal - 1) + value.slice(indexOfDecimal);
                          e.target.value = value;
                          return;
                        }

                        e.target.value = value;
                        formik.handleChange(e);
                        setCollectForCustomers(numberValidation(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="poNumber">
                      PO Number
                    </Form.Label>
                    <TooltipWrapper fieldName={"poNumber"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl  
                      ${
                        (!customerRequirePO && (poNumber === "" || poNumber === null)) ||
                        poNumberFromBulkInvoice != ""
                          ? ""
                          : customerRequirePO && (poNumber === null || poNumber === "")
                            ? "borderRed"
                            : ""
                      }`}
                      id="poNumber"
                      name="poNumber"
                      type="text"
                      value={poNumber}
                      disabled={poNumberFromBulkInvoice != "" ? true : false}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        setPoNumber(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="authorizedBy">
                      authorized by
                    </Form.Label>
                    <TooltipWrapper fieldName={"authorizedBy"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl `}
                      id="authorizedBy"
                      name="authorizedBy"
                      type="text"
                      value={authorizedBy?.trim()}
                      maxLength={25}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        setAuthorizedBy(e.target.value?.trim());
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="projectCode">
                      project code
                    </Form.Label>
                    <TooltipWrapper fieldName={"projectCode"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl `}
                      id="projectCode"
                      name="projectCode"
                      type="text"
                      value={projectCode}
                      maxLength={30}
                      disabled={projectCodeFromBulkInvoice != "" ? true : false}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        setProjectCode(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0 
                  ${!pickupAtPlant || deliveryDealerFK === null ? "hide-elements" : ""}`}
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label
                      htmlFor=""
                      className={`customColFormLabel text-capitalize`}
                      id="plantOrderNumber"
                    >
                      plant order number
                    </Form.Label>
                    <TooltipWrapper fieldName={"plantOrderNumber"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl `}
                      id="plantOrderNumber"
                      name="plantOrderNumber"
                      type="text"
                      value={plantOrderNumber}
                      maxLength={15}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        dispatch(setPlantOrderNumber(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0 
                  ${!customerRequireBankClient ? "hide-elements" : ""}`}
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    {" "}
                    <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="bank">
                      bank
                    </Form.Label>
                    <TooltipWrapper fieldName={"bank"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl  ${
                        (customerRequireBankClient && bank === null) || bank === ""
                          ? "borderRed"
                          : "borderGreen"
                      }`}
                      id="bank"
                      name="bank"
                      type="text"
                      value={bank}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        setBank(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0 
                  ${!customerRequireBankClient ? "hide-elements" : ""}`}
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={5} md={5} xs={5} className="p-0 flex-shrink-0">
                    <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="client">
                      client
                    </Form.Label>
                    <TooltipWrapper fieldName={"client"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                    <input
                      className={`customFormControl  
                        ${
                          (customerRequireBankClient && client === null) || client === ""
                            ? "borderRed"
                            : "borderGreen"
                        }`}
                      id="client"
                      name="client"
                      type="text"
                      value={client}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        setClient(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="gvwr">
                      GVWR
                    </Form.Label>
                    <TooltipWrapper fieldName={"gvwr"} />
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 flex-shrink-0" style={{ width: "70px" }}>
                    <input
                      className={`customFormControl  ${
                        GVWR === "" || GVWR === null
                          ? ""
                          : !String(GVWR).match(numberGreaterThan0Validation)
                            ? "borderRed"
                            : ""
                      }`}
                      id="gvwr"
                      name="gvwr"
                      type="text"
                      value={GVWR}
                      maxLength={10}
                      autoComplete="off"
                      onBeforeInput={(e) => handleBeforeInputForInteger(e, 2147483647)}

                      aria-autocomplete="list"
                      onBlur={fetchFlatrates}
                      onChange={(e) => {
                        GVWRFormatHandler(e);
                        setGVWR(numberValidation(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label
                      htmlFor=""
                      className={`customColFormLabel text-capitalize`}
                      id="shippingWeight"
                    >
                      shipping weight
                    </Form.Label>
                    <TooltipWrapper fieldName={"shippingWeight"} />
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0  flex-shrink-0" style={{ width: "70px" }}>
                    <input
                      className={`customFormControl `}
                      id="shippingWeight"
                      name="shippingWeight"
                      type="text"
                      value={shippingWeight}
                      maxLength={10}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onBeforeInput={(e) => handleBeforeInputForInteger(e, 2147483647)}

                      onChange={(e) => {
                        setShippingWeight(numberValidation(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0 
                ${unitTypeFK == "" || !isDriverTollsVisible ? "hide-elements" : ""}`}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="driverTolls">
                      driver tolls
                    </Form.Label>
                    <TooltipWrapper fieldName={"driverTolls"} />
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0  flex-shrink-0" style={{ width: "70px" }}>
                    <input
                      className={`customFormControl  ${
                        driverTolls === "" || driverTolls === null
                          ? !isValidDecimal(driverTolls)
                            ? "borderRed"
                            : ""
                          : !isValidDecimal(driverTolls)
                            ? //is this needed validation (!String(driverTolls).match(numberGreaterThan0Validation))
                              "borderRed"
                            : ""
                      }`}
                      id="driverTols"
                      name="driverTols"
                      type="text"
                      value={driverTolls}
                      maxLength={8}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={isDisableddriverTolls}
                      onBeforeInput={handleBeforeInput}
                      onChange={(e) => {
                        driverTollsFormatHandler(e);
                        handleInputValue(e, setDriverTolls);
                      }}
                      onBlur={() => {}}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0 
                   ${!isDriverPermitsVisible ? "hide-elements" : ""}`}
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label
                      htmlFor=""
                      className={`customColFormLabel text-capitalize`}
                      id="driverPermits"
                    >
                      driver permits
                    </Form.Label>
                    <TooltipWrapper fieldName={"driverPermits"} />
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0  flex-shrink-0" style={{ width: "70px" }}>
                    <input
                      className={`customFormControl  ${
                        driverPermits === "" || driverPermits === null
                          ? !isValidDecimal(driverPermits)
                            ? "borderRed"
                            : ""
                          : !isValidDecimal(driverPermits)
                            ? //  (!String(driverPermits).match(numberGreaterThan0Validation))  is this needed
                              "borderRed"
                            : ""
                      }`}
                      id="driverPermits"
                      name="driverPermits"
                      type="text"
                      value={driverPermits}
                      maxLength={8}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={isDisableddriverPermits}
                      onBeforeInput={handleBeforeInput}
                      onChange={(e) => {
                        driverPermitsFormatHandler(e);
                        handleInputValue(e, setDriverPermits);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0 
                  ${!dealerTWIC ? "hide-elements" : ""}`}
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label
                      htmlFor=""
                      className={`customColFormLabel text-capitalize`}
                      id="invoicePortEscortFee"
                    >
                      port escort fee
                    </Form.Label>
                    <TooltipWrapper fieldName={"invoicePortEscortFee"} />
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0 p-0 flex-shrink-0" style={{ width: "70px" }}>
                    <input
                      className={`customFormControl  ${
                        portEscortFee === "" || portEscortFee === null
                          ? ""
                          : !isValidDecimal(portEscortFee) || Number(portEscortFee) === 0
                            ? "borderRed"
                            : ""
                      }`}
                      id="portEscortFee"
                      name="portEscortFee"
                      type="text"
                      value={portEscortFee}
                      maxLength={8}
                      autoComplete="off"
                      onBeforeInput={handleBeforeInput}
                      aria-autocomplete="list"
                      onChange={(e) => {
                        portEscortFeeFormatHandler(e);
                        handleInputValue(e, setPortEscortFee);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="invoiceMiles">
                      invoice miles
                    </Form.Label>
                    <TooltipWrapper fieldName={"invoiceMiles"} />
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 p-0 flex-shrink-0" style={{ width: "70px" }}>
                    <input
                      className={`customFormControl 
                      ${
                        isDefaultInvoiceMiles
                          ? ""
                          : invoiceMiles >= 1 && mileagErrorMsgFromRedux === ""
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="invoiceMiles"
                      name="invoiceMiles"
                      type="text"
                      value={invoiceMiles}
                      onBeforeInput={(e) => handleBeforeInputForInteger(e, 2147483647)}

                      maxLength={9}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={isDefaultInvoiceMiles}
                      onChange={(e) => {
                        dispatch(setDefaultInvoiceMiles(numberValidation(e.target.value)));

                        dispatch(setInvoiceMiles(numberValidation(e.target.value)));
                      }}
                      onBlur={(e) => {
                        handleAmountExceedsPercentage();

                        if (!invoiceMiles) {
                          dispatch(setDefaultInvoiceMiles(numberValidation(0)));

                          dispatch(setInvoiceMiles(numberValidation(0)));
                        }

                        if (!driverMiles && e.target.value) {
                          dispatch(setDefaultDriverMiles(e.target.value));
                          setDriverMile(e.target.value);
                          dispatch(setDriverMiles(e.target.value));
                        }
                      }}
                    />
                  </Col>

                  <Col xs={3} md={3} sm={3} className={`${!isDefaultInvoiceMiles ? "" : "hide-elements"}`}>
                    <button className={`btn btn-secondary font-12 btn-sm w-70px `} onClick={handlePCMiler}>
                      PC Miler
                    </button>
                    {loader && <LoadingIcon />}
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="driverMiles">
                      driver miles
                    </Form.Label>
                    <TooltipWrapper fieldName={"driverMiles"} />
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0 p-0 flex-shrink-0" style={{ width: "70px" }}>
                    <input
                      className={`customFormControl 
                      ${
                        driverMiles >= 1 && mileagErrorMsgFromRedux === ""
                          ? isDefaultDriverMiles
                            ? ""
                            : "borderGreen"
                          : "borderRed"
                      }`}
                      id="driverMiles"
                      name="driverMiles"
                      type="text"
                      value={driverMiles}
                      maxLength={9}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onBeforeInput={(e) => handleBeforeInputForInteger(e, 2147483647)}
                      disabled={isDefaultDriverMiles}
                      onChange={(e) => {
                        dispatch(setDefaultDriverMiles(numberValidation(e.target.value)));
                        dispatch(setDriverMiles(numberValidation(e.target.value)));
                      }}
                      onBlur={() => {
                        handleAmountExceedsPercentage();

                        if (!driverMiles) {
                          dispatch(setDefaultDriverMiles(0));
                          dispatch(setDriverMiles(0));
                        }
                      }}
                    />
                  </Col>
                  <Col
                    xs={3}
                    md={3}
                    sm={3}
                    className={`${showOverrideButton && errorMsgFromRedux ? "" : "hide-elements"}`}
                  >
                    <button
                      type="button"
                      className={`btn btn-secondary font-12 btn-sm w-70px `}
                      onClick={handleOverideButton}
                    >
                      Override
                    </button>
                  </Col>
                </Form.Group>
                {
                  <Row className={`${(unitTypeFK === "" || !errorMsgFromRedux) && "invisible"}`}>
                    <p className="mb-0 mt-1 text-danger">
                      {unitTypeFK === "" || !errorMsgFromRedux ? "no Error" : errorMsgFromRedux}
                    </p>
                    {/* </Col> */}
                  </Row>
                }
                <Form.Group
                  className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 
                ${!isInvoiceFlatrateVisible ? "hide-elements" : ""}`}
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label
                      htmlFor=""
                      className={`customColFormLabel text-capitalize`}
                      id="invoiceFlatRate"
                    >
                      invoice flatrate
                    </Form.Label>
                    <TooltipWrapper fieldName={"invoiceFlatRate"} />
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0 p-0 flex-shrink-0" style={{ width: "70px" }}>
                    <div className="position-relative">
                      <input
                        className={`customFormControl 
                        ${
                          loading
                            ? ""
                            : errorMsgFromRedux
                              ? "borderRed"
                              : isInvoiceMileageRate
                                ? invoiceFlatrate !== "" && !isValidDecimal(invoiceFlatrate) && errorFlag
                                  ? "borderRed"
                                  : !isValidDecimal(invoiceFlatrate)
                                    ? "borderRed"
                                    : ""
                                : (Number(invoiceFlatrate) > 0 &&
                                      invoiceFlatrate !== "" &&
                                      isValidDecimal(invoiceFlatrate)) ||
                                    (Number(invoiceFlatrate2) > 0 && !errorFlag)
                                  ? Number(invoiceFlatrate2) > 0
                                    ? !isValidDecimal(invoiceFlatrate)
                                      ? "borderRed"
                                      : ""
                                    : "borderGreen"
                                  : "borderRed"
                        }
                        
                        `}
                        id="invoiceFlatrate"
                        name="invoiceFlatrate"
                        type="text"
                        value={invoiceFlatrate}
                        maxLength={8}
                        autoComplete="off"
                        disabled={loading}
                        onBeforeInput={handleBeforeInput}
                        aria-autocomplete="list"
                        onChange={(e) => {
                          handleInputValue(e, setInvoiceFlatrates);
                          dispatch(setInvoiceFlatrate(numberValidation(e.target.value)));
                        }}
                        onBlur={handleAmountExceedsPercentage}
                      />

                      {loading && (
                        <div
                          style={{ right: "21px", top: "-3px" }}
                          className="loader-container position-absolute"
                        >
                          <div className="input_loader"></div>
                        </div>
                      )}
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0
                ${!isDriverFlatrateVisible ? "hide-elements" : ""}`}
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label
                      htmlFor=""
                      className={`customColFormLabel text-capitalize`}
                      id="driverFlatRate"
                    >
                      driver flatrate
                    </Form.Label>
                    <TooltipWrapper fieldName={"driverFlatRate"} />
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0 p-0 flex-shrink-0" style={{ width: "70px" }}>
                    <div className="position-relative">
                      <input
                        className={`customFormControl 
                      ${
                        loading
                          ? ""
                          : errorMsgFromRedux
                            ? "borderRed"
                            : isDriverMileageRate
                              ? driverFlatrate !== "" && !isValidDecimal(driverFlatrate) && errorFlag
                                ? "borderRed"
                                : !isValidDecimal(driverFlatrate)
                                  ? "borderRed"
                                  : ""
                              : (Number(driverFlatrate) !== 0 &&
                                    driverFlatrate !== "" &&
                                    isValidDecimal(driverFlatrate)) ||
                                  (Number(driverFlatrate2) !== 0 && !errorFlag)
                                ? Number(driverFlatrate2) !== 0
                                  ? !isValidDecimal(driverFlatrate)
                                    ? "borderRed"
                                    : ""
                                  : "borderGreen"
                                : "borderRed"
                      }`}
                        id="driverFlatrate"
                        name="driverFlatrate"
                        type="text"
                        value={driverFlatrate}
                        disabled={loading}
                        maxLength={8}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onBeforeInput={handleBeforeInput}
                        onChange={(e) => {
                          handleInputValue(e, setDriverFlatrates);
                          dispatch(setDriverFlatrate(numberValidation(e.target.value)));
                        }}
                        onBlur={handleAmountExceedsPercentage}
                      />

                      {loading && (
                        <div
                          style={{ right: "21px", top: "-3px" }}
                          className="loader-container position-absolute"
                        >
                          <div className="input_loader"></div>
                        </div>
                      )}
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0 ${!isCommissionVisible ? "hide-elements" : ""}`}
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="commission">
                      commission
                    </Form.Label>
                    <TooltipWrapper fieldName={"commission"} />
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0 flex-shrink-0" style={{ width: "70px" }}>
                    <input
                      className={`form-control 
                      ${
                        isCommissionRequired
                          ? commission !== 0 && isValidDecimal(commission)
                            ? "borderGreen"
                            : "borderRed"
                          : commission != ""
                            ? isValidDecimal(commission)
                              ? !isValidDecimal(commission)
                                ? "borderRed"
                                : ""
                              : "borderRed"
                            : !isValidDecimal(commission)
                              ? "borderRed"
                              : ""
                      }`}
                      id="commission"
                      name="commission"
                      type="text"
                      value={commission}
                      maxLength={8}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onBeforeInput={handleBeforeInput}
                      onChange={(e) => {
                        handleInputValue(e, setCommission);
                        dispatch(setCommissionUnit(numberValidation(e.target.value)));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
                    unitTypeFK === "" || brokerType === "default" ? "hide-elements" : ""
                  }`}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label className={`customColFormLabel text-capitalize`} id="broker">
                      broker
                    </Form.Label>
                    <TooltipWrapper fieldName={"broker"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className={`p-0 ${styles.selectContainer}`}>
                    {/* Broker Autocomplete */}

                    <AutoCompleteDropdown
                      arrayList={brokerList}
                      searchString={brokerInput}
                      renderItemId={(broker) => returnBrokerPK(broker)}
                      renderItemField={(broker) => broker.name}
                      handleSearchString={(string) => dispatch(setBrokerInput(string))}
                      fetchDataBySearchString={fetchBrokerByName}
                      onSelect={handleBrokerSelection}
                      loading={brokerLoading}
                      selectedId={brokerId}
                      clearInputCallback={() => {
                        dispatch(setBrokerId(null));
                        dispatch(setSelectedBroker(null));
                      }}
                      className={`${brokerId === null || brokerInput === "" ? "borderRed" : "borderGreen"}`}
                      disabled={freezeBroker ? true : false}
                      towardsTop
                    />
                    <i
                      className={`fa-solid fa-magnifying-glass lookupMagnifierIcon ${freezeBroker ? "hide-elements" : ""}`}
                      onClick={handleBrokerLookupModalShow}
                      // Broker Modal Lookup @ Bottom
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
                    unitTypeFK === "" || brokerType === "default" ? "hide-elements" : ""
                  }`}
                >
                  <Col sm={5} md={5} xs={5} className="p-0">
                    <Form.Label className={`customColFormLabel text-capitalize`} id="poe">
                      port of entry
                    </Form.Label>
                    <TooltipWrapper fieldName={"poe"} />
                  </Col>

                  <Col xs={7} md={7} sm={7} className={`p-0 ${styles.selectContainer}`}>
                    {/* Port of Entry Autocomplete */}

                    <AutoCompleteDropdown
                      arrayList={portOfEntryList}
                      searchString={portOfEntryInput}
                      renderItemId={(port) => port.poePK}
                      renderItemField={(port) => {
                        if (brokerType === "export") {
                          return port.usCity;
                        } else if (brokerType === "import") {
                          return port.usCity;
                        }
                      }}
                      handleSearchString={(string) => dispatch(setPortOfEntryInput(string))}
                      fetchDataBySearchString={fetchPortOfEntryByName}
                      onSelect={handlePortOfEntrySelection}
                      selectedId={portOfEntryId}
                      loading={portOfEntryLoading}
                      clearInputCallback={() => {
                        dispatch(setPortOfEntryId(null));
                        dispatch(setSelectedPortOfEntry(null));
                      }}
                      className={`${
                        portOfEntryId === null || portOfEntryInput === "" ? "borderRed" : "borderGreen"
                      }`}
                      disabled={freezePOE ? true : false}
                      towardsTop
                    />
                    <i
                      className={`fa-solid fa-magnifying-glass lookupMagnifierIcon`}
                      onClick={handlePortOfEntryLookupModalShow}
                      // Port of Entry Modal Lookup @ Bottom
                    />
                  </Col>
                </Form.Group>
              </Col>
              {/* COL 3 */}
              <Col xs={5} hidden={unitTypeFK == ""}>
                <Row>
                  <Col xs={5} className={"pe-0"}>
                    <Form.Group
                      className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                    ${requiredCDLAHidden ? "hide-elements" : ""}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="cdlaRequired">
                          required CDL-A
                        </Form.Label>
                        <TooltipWrapper fieldName={"cdlaRequired"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id=" requiredCDLA"
                          name=" requiredCDLA"
                          value={requiredCDLA}
                          checked={requiredCDLA}
                          onChange={(e) => {
                            setRequiredCDLA(e.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-5 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                    ${reload && !towable ? "" : "hide-elements"}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="tankerRequired">
                          tanker{" "}
                        </Form.Label>
                        <TooltipWrapper fieldName={"tankerRequired"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="tank"
                          name="tank"
                          value={tanker}
                          checked={tanker}
                          onChange={(e) => {
                            setTanker(e.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-5 form-group  align-items-center row  m-l-0 m-r-0 ms-0  ${
                        deliveryDealerFK && dealerTWIC ? "" : "hide-elements"
                      }`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="twicRequired">
                          required TWIC
                        </Form.Label>
                        <TooltipWrapper fieldName={"twicRequired"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id=" requiredTWIC"
                          name="requiredTWIC"
                          value={requiredTWIC}
                          checked={requiredTWIC}
                          onChange={(e) => {
                            setRequiredTWIC(e.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-5 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                    ${towable ? "hide-elements" : ""}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="ifta">
                          required IFTA reporting
                        </Form.Label>
                        <TooltipWrapper fieldName={"ifta"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="requiredIFTA"
                          name="requiredIFTA"
                          disabled={GVWR == "" ? false : true}
                          value={requiredIFTA}
                          checked={requiredIFTA}
                          onChange={(e) => {
                            setRequiredIFTA(e.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0"
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="hasDrivebys">
                          has driveby's
                        </Form.Label>
                        <TooltipWrapper fieldName={"hasDrivebys"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="hasdriveby"
                          name="hasdriveby"
                          value={hasDriveBy}
                          checked={hasDriveBy}
                          onChange={(e) => {
                            setHasDriveBy(e.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                    ${shuttleToYard && pickupAtPlant && isCustUsePlants && DPUPickup ? "" : "hide-elements"}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="dealerPickup">
                          dealer pickup
                        </Form.Label>
                        <TooltipWrapper fieldName={"dealerPickup"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="dealerPickup"
                          name="dealerPickup"
                          value={DPU}
                          checked={DPU}
                          disabled={storage || onHold}
                          onChange={(e) => {
                            setDPU(e.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${shuttleToYard && pickupAtPlant && isCustUsePlants ? "" : "hide-elements"}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="storage">
                          storage
                        </Form.Label>
                        <TooltipWrapper fieldName={"storage"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id=" storage"
                          name=" storage"
                          value={storage}
                          checked={storage}
                          disabled={DPU || onHold}
                          onChange={(e) => {
                            setStorage(e.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0"
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="unitOnHold">
                          on Hold
                        </Form.Label>
                        <TooltipWrapper fieldName={"unitOnHold"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="onHold"
                          name="onHold"
                          value={onHold}
                          checked={onHold}
                          disabled={DPU}
                          onChange={(e) => {
                            setOnHoldUnit(e.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0"
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="noInvoice">
                          do not invoice
                        </Form.Label>
                        <TooltipWrapper fieldName={"noInvoice"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="doNotInvoice"
                          name="doNotInvoice"
                          value={doNotInvoice}
                          checked={doNotInvoice}
                          onChange={(e) => {
                            setdoNotInvoice(e.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                    ${pickupAtPlant && isCustomerRequireFactoryRelease && releaseProcessFlag ? "" : "hide-elements"}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="plantRelease">
                          factory release
                        </Form.Label>
                        <TooltipWrapper fieldName={"plantRelease"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="factoryRelease"
                          name="factoryRelease"
                          value={factoryRelease}
                          checked={factoryRelease}
                          onChange={(e) => {
                            setFactoryRelease(e.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                    ${
                      showMultiUnitLoadDiv &&
                      (pickupDealerFK !== null || pickupCustomerPlantId !== null || miscPickupID !== "") &&
                      (deliveryDealerFK !== null ||
                        deliveryCustomerPlantId !== null ||
                        miscDeliveryID !== "") &&
                      !batchLoadCustomerTab
                        ? ""
                        : "hide-elements"
                    }`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="multiUnit">
                          multi unit load
                        </Form.Label>
                        <TooltipWrapper fieldName={"multiUnit"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id=" multiUnit"
                          name=" multiUnit"
                          disabled={!showMultiUnitLoadDiv || DPU}
                          value={multiUnit}
                          checked={storage || doNotDispatch ? false : multiUnit}
                          onChange={(event) => {
                            setMultiUnit(event.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col xs={7} hidden={unitTypeFK == ""}>
                    <p
                      className={`mt-3  customColFormLabel text-capitalize`}
                      style={{ marginBottom: "-6px" }}
                      id="miscellaneousBOLText"
                    >
                      miscellaneous BOL text
                      <TooltipWrapper fieldName={"miscellaneousBOLText"} />
                    </p>
                    {/* miscellaneous BOL text fields */}
                    <Form.Group
                      className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0"
                      hidden={unitTypeFK == ""}
                    >
                      <Col xs={11} md={11} sm={11} className="p-0">
                        <DynamicTextFields
                          numFields={7}
                          maxCharLimit={42}
                          inputValues={inputValues}
                          setInputValues={setInputValues}
                          // disabled={viewDetail}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                    ${DPU && promptDPUOwner ? "" : "hide-elements"}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col xs={7} md={7} sm={7} className="p-0 flex-shrink-0">
                        <input
                          className={`customFormControl `}
                          id="pickupOwner"
                          name="pickupOwner"
                          type="text"
                          value={DPUPickupOwner}
                          maxLength={30}
                          autoComplete="off"
                          aria-autocomplete="list"
                          onChange={(e) => {
                            setDPUPickupOwner(e.target.value);
                            setDPUPickupData(e);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                    ${isELDFeeVisible ? "" : "hide-elements"}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label
                          htmlFor=""
                          className={`customColFormLabel text-capitalize`}
                          id="invoiceELDFee"
                        >
                          invoice ELD fee
                        </Form.Label>
                        <TooltipWrapper fieldName={"invoiceELDFee"} />
                      </Col>

                      <Col xs={4} md={4} sm={4} className="p-0 p-0 flex-shrink-0">
                        <input
                          className={`customFormControl ${!isValidDecimal(invoiceELD) ? "borderRed" : ""}`}
                          id="invoiceEld"
                          name="invoiceEld"
                          type="text"
                          value={invoiceELD}
                          onBeforeInput={(e) => handleBeforeInputForInteger(e, 2147483647)}

                          maxLength={10}
                          autoComplete="off"
                          aria-autocomplete="list"
                          disabled={isDefaultInvoiceELD}
                          onChange={(e) => {
                            setInvoiceELD(numberValidation(e.target.value));
                            dispatch(setInvoiceELDFeeRedux(e.target.value));
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                    ${isELDFeeVisible ? "" : "hide-elements"}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label
                          htmlFor=""
                          className={`customColFormLabel text-capitalize`}
                          id="driverELDFee"
                        >
                          driver ELD fee
                        </Form.Label>
                        <TooltipWrapper fieldName={"driverELDFee"} />
                      </Col>

                      <Col xs={4} md={4} sm={4} className="p-0 p-0 flex-shrink-0">
                        <input
                          className={`customFormControl ${!isValidDecimal(driverELD) ? "borderRed" : ""}`}
                          id="driverEld"
                          name="driverEld"
                          type="text"
                          value={driverELD}
                          maxLength={10}
                          autoComplete="off"
                          aria-autocomplete="list"
                          onBeforeInput={(e) => handleBeforeInputForInteger(e, 2147483647)}
                          disabled={isDefaultInvoiceELD}
                          onChange={(e) => {
                            setDriverELD(numberValidation(e.target.value));
                            dispatch(setDriverELDFeeRedux(e.target.value));
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0"
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="doNotDispatch">
                          do not dispatch
                        </Form.Label>
                        <TooltipWrapper fieldName={"doNotDispatch"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id=" doNotDispatch"
                          name=" doNotDispatch"
                          // value={doNotDispatch}
                          checked={doNotDispatch || DPU || storage || onHold}
                          onChange={(e) => {
                            setdoNotDispatch(e.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0"
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="activateDispatch">
                          activate dispatch
                        </Form.Label>
                        <TooltipWrapper fieldName={"activateDispatch"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="activateDispatch"
                          name="activateDispatch"
                          value={activateDispatch}
                          checked={activateDispatch}
                          disabled={
                            DPU ||
                            storage ||
                            onHold ||
                            doNotDispatch ||
                            !plantRelease ||
                            (pickupCustomerYardId !== null && pickupCustomerShuttleCityId !== null)
                          }
                          onChange={(e) => {
                            setActivateDispatch(e.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                    ${multiUnit === false || batchLoadCustomerTab ? "hide-elements" : ""}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="unitsPerDispatch">
                          units per dispatch
                        </Form.Label>
                        <TooltipWrapper fieldName={"unitsPerDispatch"} />
                      </Col>
                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          className={` ${
                            unitsPerDispatch === "" || unitsPerDispatch > 10 || unitsPerDispatch < 2
                              ? "borderRed"
                              : "borderGreen"
                          }`}
                          type="number"
                          placeholder=""
                          step="1"
                          min={2}
                          max={10}
                          maxLength={2}
                          pattern="[0-9]*"
                          value={unitsPerDispatch}
                          onChange={(e) => {
                            setUnitsPerDispatch(
                              minMaxCalculation(
                                e.target.value,
                                2,
                                selectedUnitType?.allowTruckCamper ? 5 : 10
                              )
                            );
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "e" || e.key === ".") {
                              e.preventDefault();
                            }
                          }}
                          style={{ borderRadius: "5px" }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Col xs={9}>
                  <Form.Group
                    className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                    ${!multiUnit || batchLoadCustomerTab ? "hide-elements" : ""}`}
                    hidden={unitTypeFK === ""}
                  >
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={`customColFormLabel text-capitalize`} id="unitMultiLoad">
                        multi unit load
                      </Form.Label>
                      <TooltipWrapper fieldName={"unitMultiLoad"} />
                    </Col>

                    <Col xs={7} md={7} sm={7} className={` ps-3 pe-0 ${styles.selectContainer}`}>
                      {/* Mutli Unit load Autocomplete */}
                      <AutoCompleteDropdown
                        arrayList={filteredUnitMultiLoadList}
                        searchString={multiUnitLoadInput}
                        renderItemId={(multiload) => multiload.unitMultiLoadPK}
                        renderItemField={(multiload) => multiload.city}
                        handleSearchString={(string) => setMultiUnitLoadInput("")}
                        fetchDataBySearchString={fetchAllMultiUnitLoads}
                        onSelect={handleMultiLoadSelectionFromDropdown}
                        selectedId={unitMultiLoadPK}
                        clearInputCallback={() => {
                          setCitiesWithStatecode("");
                          setWarningPopUP(false);
                          setShowMoreInfo(false);
                          setCityMaxLimit(false);
                        }}
                        className={`${multiUnitLoadInput?.trim() === "" || multiUnitLoadInput?.trim() === undefined ? "borderRed" : "borderGreen"}`}
                        disabled={!showMultiUnitLoadDiv || DPU || storage || doNotDispatch}
                        hidePlaceholder
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Row>
                  <Col xs={5} className="pe-0">
                    <Form.Group
                      className={`mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                    ${hideInvoiceFlag ? "hide-elements" : ""}`}
                      hidden={unitTypeFK === ""}
                    >
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="twoAsThree">
                          invoice 2 as 3
                        </Form.Label>
                        <TooltipWrapper fieldName={"twoAsThree"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id=" invoice2as3"
                          name=" invoice2as3"
                          value={invoice2as3}
                          checked={invoice2as3}
                          disabled={
                            !showMultiUnitLoadDiv || DPU || storage || doNotDispatch || unitMultiLoadPK
                          }
                          onChange={(e) => {
                            setInvoice2as3(e.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                    ${multiUnit && unitsPerDispatch > 2 ? "hide-elements" : ""} `}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="requireFlatbed">
                          require flatbed
                        </Form.Label>
                        <TooltipWrapper fieldName={"requireFlatbed"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id=" requireFlatbed"
                          name=" requireFlatbed"
                          value={requireFlatbed}
                          checked={requireFlatbed}
                          onChange={(e) => {
                            setRequireFlatbed(e.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                    ${isallDealersFOD || isContactorInvoiceVisible ? "" : "hide-elements"}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label
                          className={`customColFormLabel text-capitalize`}
                          id="deliveryDelayContact"
                        >
                          contact dealer for delay
                        </Form.Label>
                        <TooltipWrapper fieldName={"deliveryDelayContact"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id=" contactDealerDelay"
                          name=" contactDealerDelay"
                          value={contactDealerDelay}
                          checked={contactDealerDelay || isCustomerMisc}
                          disabled={isCustomerMisc}
                          onChange={(e) => {
                            setcontactDealerDelay(e.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-3 mb-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                    ${isallDealersFOD || isContactorInvoiceVisible ? "" : "hide-elements"}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label
                          className={`customColFormLabel text-capitalize`}
                          id="invoiceFODBreakdownToDealer"
                        >
                          invoice dealer for breakdown
                        </Form.Label>
                        <TooltipWrapper fieldName={"invoiceFODBreakdownToDealer"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="invoiceDealerBreakdown"
                          name="invoiceDealerBreakdown"
                          value={invoiceDealerBreakdown}
                          checked={invoiceDealerBreakdown || isCustomerMisc}
                          disabled={isCustomerMisc}
                          onChange={(e) => {
                            setInvoiceDealerBreakdown(e.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-5 pt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                    ${unitTypeFK === "" || brokerType === "default" ? "hide-elements" : ""}`}
                    >
                      <Col sm={8} md={8} xs={8} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="freezePOE">
                          freeze port of entry
                        </Form.Label>
                        <TooltipWrapper fieldName={"freezePOE"} />
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="freezePortOFEntry"
                          name="freezePortOFEntry"
                          value={freezePortOFEntry}
                          checked={freezePortOFEntry || freezePOE}
                          onChange={(e) => {
                            setFreezePortOFEntry(e.target.checked);
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col xs={7}>
                    <Form.Group
                      className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0"
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="orderDate">
                          order date
                        </Form.Label>
                        <TooltipWrapper fieldName={"orderDate"} />
                      </Col>

                      <Col xs={6} md={6} sm={6} className="p-0" style={{ width: "95px" }}>
                        <DateInputField
                          date={orderDate ? orderDate : new Date()}
                          setDate={setOrderDate}
                          max={new Date()}
                          setIsDateValid={setIsOrderDateValid}
                          className={isOrderDateValid ? "" : "borderRed"}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                    ${!pickupAtPlant && reload ? "hide-elements" : ""}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="dispatchReleaseDate">
                          release date
                        </Form.Label>
                        <TooltipWrapper fieldName={"dispatchReleaseDate"} />
                      </Col>

                      <Col xs={6} md={6} sm={6} className="p-0" style={{ width: "95px" }}>
                        <DateInputField
                          date={releaseDate}
                          setDate={setReleaseDate}
                          min={new Date()}
                          setIsDateValid={setIsReleaseDateValid}
                          className={isReleaseDateValid ? "" : "borderRed"}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                    ${!pickupAtPlant && reload ? "hide-elements" : ""}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="deliverByDate">
                          delivery by date
                        </Form.Label>
                        <TooltipWrapper fieldName={"deliverByDate"} />
                      </Col>

                      <Col xs={6} md={6} sm={6} className="p-0" style={{ width: "95px" }}>
                        <DateInputField
                          date={deliveryByDate}
                          setDate={setDeliveryByDate}
                          min={releaseDate.date ? parseLocalDate(releaseDate.date) : new Date()}
                          setIsDateValid={setIsDeliveryDateValid}
                          className={isDeliveryDateValid ? "" : "borderRed"}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                     ${!pickupAtPlant && reload ? "" : "hide-elements"}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="minimumPickupDate">
                          earliest pickup date
                        </Form.Label>
                        <TooltipWrapper fieldName={"minimumPickupDate"} />
                      </Col>

                      <Col xs={6} md={6} sm={6} className="p-0" style={{ width: "95px" }}>
                        <DateInputField
                          date={earliestPickUpDate}
                          setDate={setEarliestPickUpDate}
                          min={new Date()}
                          max={
                            (earliestDeliveryDate && parseLocalDate(earliestDeliveryDate)) ||
                            (latestPickUpDate && parseLocalDate(latestPickUpDate))
                          }
                          setIsDateValid={setIsEarliestPickupDateValid}
                          className={isEarliestPickupDateValid ? "" : "borderRed"}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                    ${!pickupAtPlant && reload ? "" : "hide-elements"}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="maximumPickupDate">
                          latest pickup date
                        </Form.Label>
                        <TooltipWrapper fieldName={"maximumPickupDate"} />
                      </Col>

                      <Col xs={6} md={6} sm={6} className="p-0 flex-shrink-0" style={{ width: "95px" }}>
                        <DateInputField
                          date={latestPickUpDate}
                          setDate={setLatestPickUpDate}
                          min={earliestPickUpDate ? parseLocalDate(earliestPickUpDate) : new Date()}
                          max={latestDeliveryDate && parseLocalDate(latestDeliveryDate)}
                          setIsDateValid={setIsLatestPickupDateValid}
                          className={isLatestPickupDateValid ? "" : "borderRed"}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                    ${!pickupAtPlant && reload ? "" : "hide-elements"}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="minimumDeliveryDate">
                          Earliest delivery date
                        </Form.Label>
                        <TooltipWrapper fieldName={"minimumDeliveryDate"} />
                      </Col>

                      <Col xs={6} md={6} sm={6} className="p-0 flex-shrink-0" style={{ width: "95px" }}>
                        <DateInputField
                          date={earliestDeliveryDate}
                          setDate={setEarliestDeliveryDate}
                          min={earliestPickUpDate ? parseLocalDate(earliestPickUpDate) : new Date()}
                          max={latestDeliveryDate && parseLocalDate(latestDeliveryDate)}
                          setIsDateValid={setIsEarliestDeliveryDateValid}
                          className={isEarliestDeliveryDateValid ? "" : "borderRed"}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                    ${!pickupAtPlant && reload ? "" : "hide-elements"}`}
                      hidden={unitTypeFK == ""}
                    >
                      <Col sm={5} md={5} xs={5} className="p-0">
                        <Form.Label className={`customColFormLabel text-capitalize`} id="maximumDeliveryDate">
                          latest delivery date
                        </Form.Label>
                        <TooltipWrapper fieldName={"maximumDeliveryDate"} />
                      </Col>

                      <Col xs={6} md={6} sm={6} className="p-0 flex-shrink-0" style={{ width: "95px" }}>
                        <DateInputField
                          date={latestDeliveryDate}
                          setDate={setLatestDeliveryDate}
                          min={
                            earliestDeliveryDate
                              ? parseLocalDate(earliestDeliveryDate)
                              : latestPickUpDate
                                ? parseLocalDate(latestPickUpDate)
                                : new Date()
                          }
                          setIsDateValid={setIsLatestDeliveryDateValid}
                          className={isLatestDeliveryDateValid ? "" : "borderRed"}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className={`col-xs-12`}>
              {loadingForMultiUnitLoad ? (
                <div className="fade modal-backdrop show">
                  {" "}
                  <div className="pos-center">
                    {" "}
                    <div className="loader"></div>
                  </div>
                </div>
              ) : (
                <MultiUnitModal
                  show={warningPopUP}
                  onHide={handleClose}
                  title={"Warning"}
                  body={
                    cityMaxLimit === true
                      ? "Exceeded maximum city limit. Please select 'Add New Record' option to add this delivery location."
                      : multiUnitLoadError === true
                        ? "Sorry, something went wrong.Please try again."
                        : `The distance between ${selectedDeliveryDealer?.city} ,${selectedDeliveryDealer?.stateCode} and ${citiesWithStatecode?.split(",")[0] || ""}, ${citiesWithStatecode?.split(",")[1]?.substring(0, 2) || ""} is ${distanceINMiles} miles, which is more than the allowed 15 miles. Are you sure you want to add this location?`
                  }
                  handleYES={handleYes}
                  handleNO={handleClose}
                  moreInfo={multiUnitLoadData}
                  showMoreInfo={showMoreInfo}
                  showOK={cityMaxLimit || multiUnitLoadError}
                  multiUnitLoadError={cityMaxLimit ? false : multiUnitLoadError}
                  handleToggleShowMoreInfo={handleToggleShowMoreInfo}
                />
              )}

              {/* Multi Unit PopUp Load Modal */}
              <MultiUnitModal
                show={isMultiUnitPopUpLoad}
                onHide={handleMultiUnitPopupLoadModalClose}
                title={"Pop up Load"}
                body={"Is this a pop up trailer load?"}
                handleYES={handleMultiUnitPopupLoadModalYes}
                handleNO={handleMultiUnitPopupLoadModalNo}
                isPopupLoad={true}
              />
              {/* Multi Unit Truck Camper Modal */}
              <MultiUnitModal
                show={isMultiUnitTruckCamper}
                onHide={handleMultiUnitTruckCamperModalClose}
                title={"Truck Camper"}
                body={"Is this a Truck Camper load?"}
                handleYES={handleMultiUnitTruckCamperModalYes}
                handleNO={handleMultiUnitTruckCamperModalNo}
                isPopupLoad={true}
              />
              {/* UnitType Lookup Modal */}
              <UnitTypeLookup
                show={unitTypeSelection}
                onHide={hideUnitTypeModal}
                OEUnitTab={true}
                setShowMultiUnitLoadDiv={setShowMultiUnitLoadDiv}
              />
              {/* SpecialCode Lookup Modal */}
              <SpecialCodeLookup
                show={specialCodeSelection}
                onHide={hideSpecialCodeModal}
                renderItemId={(codes) => codes.specialCodePK}
                handleLookupSelection={handleSpecialCodeSelection}
                MaintenanceProgram
              />

              {/* Pickup Dealer Lookup Modal */}
              <DealerLookup
                show={pickupDealerSelection1}
                onHide={hidePickupDealer1Modal}
                renderItemId={(dealer) => dealer.dealerPK}
                handleLookupSelection={handlePickupDealerLookupSelection}
                MaintenanceProgram
              />

              {/* Delivery Dealer Lookup Modal */}
              <DealerLookup
                show={deliveryDealerSelection1}
                onHide={hideDeliveryDealer1Modal}
                renderItemId={(dealer) => dealer.dealerPK}
                handleLookupSelection={handleDeliveryDealerLookupSelection}
                MaintenanceProgram
              />

              {/* Broker Lookup Modal */}
              <BrokerLookup
                show={brokerSelection}
                onHide={hideBrokerModal}
                renderItemId={(broker) => {
                  returnBrokerPK(broker);
                }}
                handleLookupSelection={handleBrokerLookupSelection}
                OrderEntry
                // brokerType
              />

              {/* PortOfEntry Lookup Modal */}
              <PortOfEntryLookup
                show={portOfEntrySelection}
                onHide={hidePortOfEntryModal}
                renderItemId={(poe) => poe.poePK}
                handleLookupSelection={handlePortOfEntryLookupSelection}
              />
              {/* UnitMultiLoad Lookup Modal */}
              <UnitMultiLoadLookup
                show={unitMultiLoadSelection}
                onHide={hideUnitMultiLoadModal}
                OEUnitTab={true}
              />

              {/* PC Miler Popup */}
              <Modal show={showPCMilerModal} onHide={handlePCMilerCancel} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                  <Modal.Title>Warning !!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-14 h-100">
                  <p>
                    {errorMsgFromRedux}
                    <p>Do you want to override the miles ? </p>
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handlePCMilerOK}>
                    {loader === true ? (
                      <div className="loader-container">
                        <div className="loader"></div>
                      </div>
                    ) : (
                      "YES"
                    )}
                  </Button>
                  <Button variant="secondary" onClick={handlePCMilerCancel}>
                    NO
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* PC Miler Error Popup */}
              <Modal
                show={showPCMilerErrorModal}
                onHide={handlePCMilerErrorClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Warning !!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-14 h-100">
                  <p>{pcMilerError}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handlePCMilerErrorClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

              {/*Invoice flatrate modal*/}
              <Modal
                show={showFlatRateModal}
                onHide={handleFlatRateCancel}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Warning !!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-14 h-100">
                  <p>
                    <p>
                      Invoice Amount : {invoiceAmtRedux}, Driver Amount : {driverAmtRedux}{" "}
                    </p>
                    <p>
                      Unit Percentage : {(unitPercentage * 100).toFixed(2)}%, Allowed Percentage :{" "}
                      {(allowedInvoicePercentageRedux * 100).toFixed(2)}%
                    </p>

                    <p>{errorMsgFromRedux}</p>
                    <p>Do you want to override the allowed percentage ? </p>
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleFlatRateOK}>
                    YES
                  </Button>
                  <Button variant="secondary" onClick={handleFlatRateCancel}>
                    NO
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* Override flatrate modal*/}
              <Modal
                show={showOverrideModal}
                onHide={handleOverrideCancel}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Please enter the details for overriding the rate</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-14 h-100">
                  <p>
                    <div hidden="true">
                      <Form.Group className="margin-box-5  align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} xs={3}>
                          <Form.Label className={` col-form-label ${styles.orderLabel}`}>Name</Form.Label>
                        </Col>
                        <Col sm={6} xs={6} className="p-0 flex-shrink-0">
                          <input
                            className={`customFormControl  `}
                            id="userName"
                            name="userName"
                            type="text"
                            hidden="true"
                            value={userName}
                            maxLength={30}
                            autoComplete="off"
                            aria-autocomplete="list"
                            onChange={(e) => setUserName("Mark")}
                          />
                        </Col>
                      </Form.Group>
                    </div>
                    <Form.Group className="margin-box-5  align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} xs={3}>
                        <Form.Label className={` col-form-label ${styles.orderLabel}`}> Code</Form.Label>
                      </Col>
                      <Col sm={6} xs={6} className="p-0 flex-shrink-0">
                        <input
                          className={`customFormControl  `}
                          id="userCode"
                          name="userCode"
                          type="password"
                          value={userCode}
                          maxLength={20}
                          autoComplete="new-password"
                          aria-autocomplete="list"
                          onChange={(e) => setUserCode(e.target.value)}
                        />
                      </Col>
                    </Form.Group>
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleOverrideOK}>
                    OVERRIDE
                  </Button>
                  <Button variant="secondary" onClick={handleOverrideCancel}>
                    NO
                  </Button>
                </Modal.Footer>
              </Modal>
              {/*Override Error modal*/}
              <Modal
                show={showOverrideErrorModal}
                onHide={handleOverrideErrorCancel}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Warning !!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-14 h-100">
                  <p className="mb-0 text-danger">{showOverrideErrorMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleOverrideErrorCancel}>
                    OK
                  </Button>
                </Modal.Footer>
              </Modal>
              {/*Override Error modal*/}
              <Modal show={showOverrideAppliedModal} onHide={handleOverrideAppliedCancel}>
                <Modal.Header closeButton>
                  <Modal.Title>Override Flat Rate</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-14 h-100">
                  <p>Maximum driver flat rate after applying override code is {driverFlatRateFromRedux}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleOverrideAppliedCancel}>
                    OK
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* Date Validation Error Modal */}
              <ModalComponent
                show={invalidDate}
                onHide={() => setInvalidDate(false)}
                title={"Warning! Invalid Date!"}
                showError={true}
                body={invalidDateError}
                closeButton
                handleClose={handleInvalidDateClose}
              />

              {/* Unit Override Modal */}
              <ModalComponent
                show={showUnitOverride}
                onHide={handleUnitOverrideCloseNo}
                title="Warning!"
                body="This unit number exists, Do you want to override this unit?"
                handleYES={handleUnitOverrideYes}
                handleNO={handleUnitOverrideCloseNo}
              />
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Unit;
