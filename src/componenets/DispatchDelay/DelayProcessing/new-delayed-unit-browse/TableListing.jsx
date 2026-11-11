/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UnitSelectionService from "../../../../services/EditMaster/UnitSelectionService";
import {
  setListingData,
  setLoading,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedId,
  setTotalElements,
  setTotalPages,
  setRowData,
} from "../../../../redux/DispatchDelay/DelayProcessing/NewDelayedBrowseSlice";
import {
  setViewDetail,
  setSelectedUnitData,
} from "../../../../redux/EditMasterExpress/EditMasterExpressUnitSelectionSlice";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import LoadingText from "../../../common/LoadingText";
import EditYardUnitService from "../../../../services/shuttle/process/EditYardUnitService";
import { useNavigate } from "react-router-dom";
import AscendingIcon from "../../../common/AscendingIcon";
import DescendingIcon from "../../../common/DescendingIcon";
import moment from "moment";
import YardCheckinService from "../../../../services/shuttle/process/YardCheckinService";
import EditShuttleService from "../../../../services/shuttle/process/EditShuttleService";
import { UnitSelectionLookup_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import ShuttleInquiryService from "../../../../services/shuttle/process/ShuttleInquiryService";
import UnitActivationService from "../../../../services/UnitActivationService";
import EquipmentCheckInOutService from "../../../../services/EquipmentCheckInOutService";
import DelayProcessingService from "../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { customFormatDate } from "../../../../utils/validation/DateFormatUtils";
import {
  setBreakdown,
  setCustomerNotes,
  setDamage,
  setDelayContact,
  setDelayContactExtension,
  setDelayContactPhone,
  setDelayedUnitPK,
  setDelayCustomerNotes,
  setDelayInHouseNotes,
  setDriverAtFault,
  setDelayCustomerPKList,
  setDelayCustomerPlantPKList,
  setDelayDealerPKList,
  setInHouseNotes,
  setViewOnly,
  setUnitConfirmationData,
  setGeneralData,
  setActiveDisable,
} from "../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import PlantReleaseService from "../../../../services/PlantReleaseService";
import TruncatedStringWithTooltip from "../../../common/TruncatedStringWithTooltip";
import EditMasterExpressService from "../../../../services/Units/EditMasterExpressService";
import MiscInvoiceService from "../../../../services/Invoicing/MiscInvoiceService";
import UnitStatusService from "../../../../services/Units/UnitStatusService";
import { library } from "@fortawesome/fontawesome-svg-core";
import LoadingIcon from "../../../common/LoadingIcon";

const TableListing = ({
  // Pass componentType as either 'Maintenance' or 'Lookup'
  // DelayedUnitBrowse, NewDelayedUnitBrowse
  componentType,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  customServiceCallback,
  EditYardUnit,
  YardCheckin,
  unitCompanyName,
  EditShuttle,
  ShuttleInquiry,
  driverFK,
  companyName,
  UnitActivation,
  selectedDriverFK,
  driverCompanyName,
  fromDate,
  toDate,
  EquipmentCheckOut,
  PlantRelease,
  miscInvoice,
  isShuttleFlag,
  lookupIncludingCROSSDB,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.newDelayedBrowseSlice.loading);
  const selectedId = useSelector((state) => state.newDelayedBrowseSlice.selectedId);
  const listingData = useSelector((state) => state.newDelayedBrowseSlice.listingData);
  const pageNumber = useSelector((state) => state.newDelayedBrowseSlice.pageNumber);
  const advancedSearchPayload = useSelector((state) => state.newDelayedBrowseSlice.advancedSearchPayload);

  const showAdvancedSort = useSelector((state) => state.newDelayedBrowseSlice.showAdvancedSort);
  const advancedSortingOrder = useSelector((state) => state.newDelayedBrowseSlice.advancedSortingOrder);
  const normalSortFlag = useSelector((state) => state.newDelayedBrowseSlice.normalSortFlag);
  const normalSortValue = useSelector((state) => state.newDelayedBrowseSlice.normalSortValue);

  const globalSearchTerm = useSelector((state) => state.newDelayedBrowseSlice.globalSearchTerm);
  const selectedSearchCriteria = useSelector((state) => state.newDelayedBrowseSlice.selectedSearchCriteria);
  const unitLast5 = useSelector((state) => state.newDelayedBrowseSlice.unitLast5);
  const unitType = useSelector((state) => state.newDelayedBrowseSlice.unitType);
  const orderType = useSelector((state) => state.newDelayedBrowseSlice.orderType);
  const dateType = useSelector((state) => state.newDelayedBrowseSlice.dateType);

  const dateFrom = useSelector((state) => state.newDelayedBrowseSlice.dateFrom);
  const dateTo = useSelector((state) => state.newDelayedBrowseSlice.dateTo);
  const unitStatus = useSelector((state) => state.newDelayedBrowseSlice.unitStatus);
  const pickupBy = useSelector((state) => state.newDelayedBrowseSlice.pickupBy);
  const deliveryBy = useSelector((state) => state.newDelayedBrowseSlice.deliveryBy);
  const unitOrderStatus = useSelector((state) => state.newDelayedBrowseSlice.unitOrderStatus);
  const unitDelayType = useSelector((state) => state.newDelayedBrowseSlice.unitDelayType);
  const dispatchDelayType = useSelector((state) => state.newDelayedBrowseSlice.dispatchDelayType);
  const delayedUnitType = useSelector((state) => state.newDelayedBrowseSlice.delayedUnitType);
  const advancedSearchString = useSelector((state) => state.newDelayedBrowseSlice.advancedSearchString);
  const advancedSearchByInputs = useSelector((state) => state.newDelayedBrowseSlice.advancedSearchByInputs);
  const customerId = useSelector((state) => state.newDelayedBrowseSlice.customerId);
  const customerPlantId = useSelector((state) => state.newDelayedBrowseSlice.customerPlantId);
  const dealerId = useSelector((state) => state.newDelayedBrowseSlice.dealerId);
  const selectedDispatchStatus = useSelector((state) => state.newDelayedBrowseSlice.selectedDispatchStatus);
  const selectedCompanyName = useSelector((state) => state.newDelayedBrowseSlice.selectedCompanyName);
  const selectedCompanyPK = useSelector((state) => state.newDelayedBrowseSlice.companyPK);
  const isDelayLocalCompany = useSelector((state) => state.delayProcessing.isDelayLocalCompany);
  const browsePageNumber = useSelector((state) => state.unitStatusReducer.browsePageNumber);
  const showAdvancedSearch = useSelector((state) => state.newDelayedBrowseSlice.showAdvancedSearch);
  const [unitList, setUnitList] = useState([]);
  const [customerPKList, setcustomerPKList] = useState([]);
  const [customerPlantPKList, setcustomerPlantPKList] = useState([]);
  const [dealerPKList, setdealerPKList] = useState([]);
  const [savedCompanyName, setSavedCompanyName] = useState(() => {
    // Initialize state from localstorage
    return localStorage.getItem("selectedCompany");
  });

  /**
   *  Unit Selection Browse Fetch function in Invoice
   **/
  const customFetchCallback = (customServiceCallback) => {
    customServiceCallback()
      .then((response) => {
        const { data } = response;
        const unitLists = data?.content?.map((units) => ({ ...units, unitNumber: units.unitNumber?.trim() }));
        dispatch(setListingData(unitLists || []));
        dispatch(setTotalElements(data?.totalElements || 0));
        dispatch(setTotalPages(data?.totalPages || 0));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  /**
   *  Unit Selection Browse Fetch function
   **/
  const getAllUnitNumbers = (pageSize) => {
    UnitSelectionService.getAllUnitNumbers(
      globalSearchTerm,
      unitLast5,
      pageNumber,
      selectedSearchCriteria,
      advancedSearchPayload,
      advancedSortingOrder,
      normalSortValue,
      normalSortFlag,
      unitType,
      orderType,
      dateType,
      dateFrom,
      dateTo,
      unitStatus,
      pickupBy,
      deliveryBy,
      unitOrderStatus,
      unitDelayType,
      dispatchDelayType,
      advancedSearchString,
      advancedSearchByInputs,
      customerId,
      customerPlantId,
      dealerId,
      pageSize,
      isShuttleFlag
    )
      .then((response) => {
        const { data } = response;
        const unitLists = data?.content?.map((units) => ({ ...units, unitNumber: units.unitNumber?.trim() }));
        dispatch(setListingData(unitLists || []));
        dispatch(setTotalElements(data?.totalElements || 0));
        dispatch(setTotalPages(data?.totalPages || 0));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoading(false));
      });
  };

  /**
   *  Delay Browse Fetch function
   **/

  const getNewDelayUnitSelectionBrowse = (pageSize) => {
    dispatch(setLoading(true));
    DelayProcessingService.getNewDelayUnitSelectionBrowse(
      selectedCompanyName,
      selectedCompanyPK,
      globalSearchTerm,
      unitLast5,
      pageNumber,
      selectedSearchCriteria,
      advancedSearchPayload,
      advancedSortingOrder,
      normalSortValue,
      normalSortFlag,
      unitType,
      orderType,
      dateType,
      dateFrom,
      dateTo,
      unitStatus,
      pickupBy,
      deliveryBy,
      unitOrderStatus,
      unitDelayType,
      dispatchDelayType,
      selectedDispatchStatus,
      advancedSearchString,
      advancedSearchByInputs,
      customerId,
      customerPlantId,
      dealerId,
      pageSize
    )
      .then((response) => {
        const { data } = response;

        const listingData = data?.filter((item) => item.Type !== "Pagination");
        const paginationData = data?.find((item) => item.Type === "Pagination");
        dispatch(setListingData([]));
        dispatch(setListingData(listingData));
        setUnitList(listingData || []);
        // Dispatch pagination info
        if (paginationData) {
          dispatch(setTotalElements(paginationData.TotalElements || 0));
          dispatch(setTotalPages(paginationData.TotalPages || 0));
        }

        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log("### error", error);
        dispatch(setLoading(false));
      });
  };

  const getBreakdownDetails = (delayedUnitPK) => {
    DelayProcessingService.getBreakdownDataForDelay(selectedCompanyName, delayedUnitPK)
      .then((response) => {
        dispatch(setBreakdown(response?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDamageDetails = (delayedUnitPK) => {
    DelayProcessingService.getDamageDataForDelay(selectedCompanyName, delayedUnitPK)
      .then((response) => {
        dispatch(setDamage(response?.data));
        dispatch(setDriverAtFault(response?.data?.driverAtFault));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //used to fetch delay main browse page
  const getAllDelayedUnitNumbersForBrowse = (pageSize) => {
    DelayProcessingService.getUnitBrowse(
      selectedCompanyName,
      selectedCompanyPK,
      globalSearchTerm,
      unitLast5,
      pageNumber,
      selectedSearchCriteria,
      advancedSearchPayload,
      advancedSortingOrder,
      normalSortValue,
      normalSortFlag,
      unitType,
      orderType,
      dateType,
      dateFrom,
      dateTo,
      unitStatus,
      pickupBy,
      deliveryBy,
      unitOrderStatus,
      unitDelayType,
      dispatchDelayType,
      selectedDispatchStatus,
      advancedSearchString,
      advancedSearchByInputs,
      customerId,
      customerPlantId,
      dealerId,
      pageSize
    )
      .then((response) => {
        const { data } = response;

        const listingData = data?.filter((item) => item.Type !== "Pagination");
        const paginationData = data?.find((item) => item.Type === "Pagination");
        dispatch(setListingData([]));
        dispatch(setListingData(listingData));
        setUnitList(listingData || []);
        // Dispatch pagination info
        if (paginationData) {
          dispatch(setTotalElements(paginationData.TotalElements || 0));
          dispatch(setTotalPages(paginationData.TotalPages || 0));
        }

        dispatch(setLoading(false));
      })
      .catch((error) => {
        //  console.log("### error", error);
        dispatch(setLoading(false));
      });
  };
  const fetchAllCustomersOfDelayedUnits = (company) => {
    DelayProcessingService.fetchAllCustomersOfDelayedUnits(company)
      .then((response) => {
        if (isDelayLocalCompany) {
          setcustomerPKList(response?.data?.map((customer) => customer.customerPK));
        } else {
          setcustomerPKList(response?.data);
        }

        fetchAllCustomerPlantsOfDelayedUnits(selectedCompanyName);
        fetchAllDealersOfDelayedUnits(selectedCompanyName);
      })
      .catch((err) => {});
  };

  const fetchAllCustomerPlantsOfDelayedUnits = (company) => {
    DelayProcessingService.fetchAllCustomerPlantsOfDelayedUnits(company)
      .then((response) => {
        if (isDelayLocalCompany) {
          setcustomerPlantPKList(response?.data?.map((customerplant) => customerplant.customerPlantPK));
        } else {
          setcustomerPlantPKList(response?.data);
        }
        fetchAllDealersOfDelayedUnits(selectedCompanyName);
      })
      .catch((err) => {});
  };

  const fetchAllDealersOfDelayedUnits = (company) => {
    DelayProcessingService.fetchAllDealersOfDelayedUnits(company)
      .then((response) => {
        if (isDelayLocalCompany) {
          setdealerPKList(response?.data?.map((dealer) => dealer.dealerPK));
        } else {
          setdealerPKList(response?.data);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    dispatch(setDelayCustomerPKList(customerPKList));
  }, [customerPKList]);

  useEffect(() => {
    dispatch(setDelayCustomerPlantPKList(customerPlantPKList));
  }, [customerPlantPKList]);

  useEffect(() => {
    dispatch(setDelayDealerPKList(dealerPKList));
  }, [dealerPKList]);

  /**
   *  Unit Selection Browse Fetch function for EditShuttle
   **/
  const getAllUnitNumbersForEditShuttle = () => {
    EditShuttleService.getAllUnitNumbersForLookup(
      globalSearchTerm,
      unitLast5,
      pageNumber,
      selectedSearchCriteria,
      advancedSearchPayload,
      advancedSortingOrder,
      normalSortValue,
      normalSortFlag,
      unitType,
      orderType,
      dateType,
      dateFrom,
      dateTo,
      unitStatus,
      pickupBy,
      deliveryBy,
      unitOrderStatus,
      unitDelayType,
      dispatchDelayType,
      advancedSearchString,
      advancedSearchByInputs,
      customerId,
      customerPlantId,
      dealerId,
      driverFK,
      companyName,
      fromDate,
      toDate
    )
      .then((response) => {
        const { data } = response;
        const unitLists = data?.content?.map((units) => ({ ...units, unitNumber: units.unitNumber?.trim() }));
        dispatch(setListingData(unitLists || []));
        dispatch(setTotalElements(data?.totalElements || 0));
        dispatch(setTotalPages(data?.totalPages || 0));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };
  /** */
  const getAllUnitNumbersForShuttleInquiry = () => {
    ShuttleInquiryService.getAllUnitNumbersForLookup(
      globalSearchTerm,
      unitLast5,
      pageNumber,
      selectedSearchCriteria,
      advancedSearchPayload,
      advancedSortingOrder,
      normalSortValue,
      normalSortFlag,
      unitType,
      orderType,
      dateType,
      dateFrom,
      dateTo,
      unitStatus,
      pickupBy,
      deliveryBy,
      unitOrderStatus,
      unitDelayType,
      dispatchDelayType,
      advancedSearchString,
      advancedSearchByInputs,
      customerId,
      customerPlantId,
      dealerId,
      driverFK,
      companyName,
      selectedDriverFK,
      driverCompanyName
    )
      .then((response) => {
        const { data } = response;
        dispatch(setListingData(data?.content || []));
        dispatch(setTotalElements(data?.totalElements || 0));
        dispatch(setTotalPages(data?.totalPages || 0));
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };

  /**
   *  Unit Selection Browse Fetch function for EditYardUnit
   **/
  const getAllUnitNumbersForEditYardUnit = () => {
    EditYardUnitService.getAllUnitNumbersForLookup(
      globalSearchTerm,
      unitLast5,
      pageNumber,
      selectedSearchCriteria,
      advancedSearchPayload,
      advancedSortingOrder,
      normalSortValue,
      normalSortFlag,
      unitType,
      orderType,
      dateType,
      dateFrom,
      dateTo,
      unitStatus,
      pickupBy,
      deliveryBy,
      unitOrderStatus,
      unitDelayType,
      dispatchDelayType,
      advancedSearchString,
      advancedSearchByInputs,
      customerId,
      customerPlantId,
      dealerId
    )
      .then((response) => {
        const { data } = response;
        const unitLists = data?.content?.map((units) => ({ ...units, unitNumber: units.unitNumber?.trim() }));
        dispatch(setListingData(unitLists || []));
        dispatch(setTotalElements(data?.totalElements || 0));
        dispatch(setTotalPages(data?.totalPages || 0));
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };
  /**
   *  Unit Selection Browse Fetch function for Yard Check in
   **/
  const getAllUnitNumbersForYardCheckin = () => {
    YardCheckinService.getAllUnitNumbersForLookup(
      globalSearchTerm,
      unitLast5,
      pageNumber,
      selectedSearchCriteria,
      advancedSearchPayload,
      advancedSortingOrder,
      normalSortValue,
      normalSortFlag,
      unitType,
      orderType,
      dateType,
      dateFrom,
      dateTo,
      unitStatus,
      pickupBy,
      deliveryBy,
      unitOrderStatus,
      unitDelayType,
      dispatchDelayType,
      advancedSearchString,
      advancedSearchByInputs,
      customerId,
      customerPlantId,
      dealerId,
      unitCompanyName
    )
      .then((response) => {
        const { data } = response;
        dispatch(setListingData(data?.content || []));
        dispatch(setTotalElements(data?.totalElements || 0));
        dispatch(setTotalPages(data?.totalPages || 0));
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };

  /**
   *  Unit Selection Browse Fetch function for Unit Activation
   **/
  const getAllUnitNumbersForUnitActivation = () => {
    UnitActivationService.getAllUnitNumbersForLookup(
      globalSearchTerm,
      unitLast5,
      pageNumber,
      selectedSearchCriteria,
      advancedSearchPayload,
      advancedSortingOrder,
      normalSortValue,
      normalSortFlag,
      unitType,
      orderType,
      dateType,
      dateFrom,
      dateTo,
      unitStatus,
      pickupBy,
      deliveryBy,
      unitOrderStatus,
      unitDelayType,
      dispatchDelayType,
      advancedSearchString,
      advancedSearchByInputs,
      customerId,
      customerPlantId,
      dealerId,
      companyName
    )
      .then((response) => {
        const { data } = response;
        const unitLists = data?.content?.map((units) => ({
          ...units,
          unitNumber: units.unitNumber?.trim(),
        }));
        dispatch(setListingData(unitLists || []));
        dispatch(setTotalElements(data?.totalElements || 0));
        dispatch(setTotalPages(data?.totalPages || 0));
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };

  /**
   *  Unit Selection Browse Fetch function for EquipmentCheckOut
   **/
  const getAllUnitNumbersForEquipmentCheckOut = () => {
    EquipmentCheckInOutService.getAllUnitNumbersForLookup(
      globalSearchTerm,
      unitLast5,
      pageNumber,
      selectedSearchCriteria,
      advancedSearchPayload,
      advancedSortingOrder,
      normalSortValue,
      normalSortFlag,
      unitType,
      orderType,
      dateType,
      dateFrom,
      dateTo,
      unitStatus,
      pickupBy,
      deliveryBy,
      unitOrderStatus,
      unitDelayType,
      dispatchDelayType,
      advancedSearchString,
      advancedSearchByInputs,
      customerId,
      customerPlantId,
      dealerId,
      driverFK
    )
      .then((response) => {
        const { data } = response;
        const unitLists = data?.content?.map((units) => ({
          ...units,
          unitNumber: units.unitNumber?.trim(),
        }));
        dispatch(setListingData(unitLists || []));
        dispatch(setTotalElements(data?.totalElements || 0));
        dispatch(setTotalPages(data?.totalPages || 0));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };
  const onhandleNormalSort = (sortValue) => {
    if (!showAdvancedSort) {
      dispatch(setNormalSortValue(sortValue));
      dispatch(setNormalSortFlag(!normalSortFlag));
    }
  };

  /**
   *  Unit Selection Browse Fetch function for EditYardUnit
   **/
  const getAllUnitNumbersForPlantRelease = () => {
    PlantReleaseService.getAllUnitNumbersForLookup(
      globalSearchTerm,
      unitLast5,
      pageNumber,
      selectedSearchCriteria,
      advancedSearchPayload,
      advancedSortingOrder,
      normalSortValue,
      normalSortFlag,
      unitType,
      orderType,
      dateType,
      dateFrom,
      dateTo,
      unitStatus,
      pickupBy,
      deliveryBy,
      unitOrderStatus,
      unitDelayType,
      dispatchDelayType,
      advancedSearchString,
      advancedSearchByInputs,
      customerId,
      customerPlantId,
      dealerId
    )
      .then((response) => {
        const { data } = response;
        const unitLists = data?.content?.map((units) => ({ ...units, unitNumber: units.unitNumber?.trim() }));
        dispatch(setListingData(unitLists || []));
        dispatch(setTotalElements(data?.totalElements || 0));
        dispatch(setTotalPages(data?.totalPages || 0));
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };

  /**
   *  Unit Selection Browse Fetch Function For Edit Master Express
   **/
  const getAllUnitNumbersForEditMasterExpress = (pageSize) => {
    EditMasterExpressService.getAllUnitNumbersForEditMasterExpressBrowseList(
      globalSearchTerm,
      unitLast5,
      pageNumber,
      selectedSearchCriteria,
      advancedSearchPayload,
      advancedSortingOrder,
      normalSortValue,
      normalSortFlag,
      unitType,
      orderType,
      dateType,
      dateFrom,
      dateTo,
      unitStatus,
      pickupBy,
      deliveryBy,
      unitOrderStatus,
      unitDelayType,
      dispatchDelayType,
      advancedSearchString,
      advancedSearchByInputs,
      customerId,
      customerPlantId,
      dealerId,
      pageSize
    )
      .then((response) => {
        const { data } = response;
        const unitLists = data?.content?.map((units) => ({
          ...units,
          unitNumber: units.unitNumber?.trim(),
        }));
        dispatch(setListingData(unitLists || []));
        dispatch(setTotalElements(data?.totalElements || 0));
        dispatch(setTotalPages(data?.totalPages || 0));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoading(false));
      });
  };

  const getUnitLookupForInvoicing = (pageSize) => {
    const unitSelectionRequestVO = {
      unitSelection: true,
      type: "Lookup",
      searchTerm: globalSearchTerm,
      unitNumberLast5: unitLast5,
      pageNumber: pageNumber,
      pageSize: pageSize,
      searchCriteria: selectedSearchCriteria,

      unitNumber: advancedSearchPayload?.unitNumber,
      customer: advancedSearchPayload?.customer,
      pickup: advancedSearchPayload?.pickup,
      delivery: advancedSearchPayload?.delivery,
      unitType: advancedSearchPayload?.unitType,
      specialCode: advancedSearchPayload?.specialCode,

      firstField: advancedSortingOrder?.firstField,
      secondField: advancedSortingOrder?.secondField,
      thirdField: advancedSortingOrder?.thirdField,
      fourthField: advancedSortingOrder?.fourthField,
      fifthField: advancedSortingOrder?.fifthField,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      unitTypeSearchCriteria: unitType,
      orderType: orderType,
      dateType: dateType,
      fromDate: dateFrom,
      toDate: dateTo,
      unitStatus: unitStatus,
      pickupBy: pickupBy,
      deliveryBy: deliveryBy,
      unitOrderStatus: unitOrderStatus,
      unitDelayType: unitDelayType,
      dispatchDelayType: dispatchDelayType,
      advancedSearchString: advancedSearchString,
      pars: advancedSearchByInputs?.pars,
      bolNumber: advancedSearchByInputs?.bolNumber,
      vin: advancedSearchByInputs?.vin,
      stockNumber: advancedSearchByInputs?.stockNumber,
      projectCode: advancedSearchByInputs?.projectCode,
      poNumber: advancedSearchByInputs?.poNumber,
      serialNumber: advancedSearchByInputs?.serialNumber,
      model: advancedSearchByInputs?.model,
      companyName: companyName,
      customerId: customerId,
      customerPlantsId: customerPlantId,
      dealerId: dealerId,
    };
    UnitStatusService.getUnitSelectionLookUp(unitSelectionRequestVO)
      .then((response) => {
        const { data } = response;
        const listingData = data?.filter((item) => item.Type !== "Pagination");
        const paginationData = data?.find((item) => item.Type === "Pagination");
        dispatch(setListingData(listingData || []));
        if (paginationData) {
          dispatch(setTotalElements(paginationData.TotalElements));
          dispatch(setTotalPages(paginationData.TotalPages));
          dispatch(setLoading(false));
        }
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoading(false));
      });
  };
  /**
   * Fetch Units conditionally for differenct cases
   */
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      if (componentType === "Maintenance") {
        getAllUnitNumbers();
      }
      // Fetch Units for Delay
      if (componentType === "DelayedUnitBrowse") {
        if (selectedCompanyName && selectedCompanyPK) {
          getAllDelayedUnitNumbersForBrowse();
        }
      }
      // Fetch Units for New Delay
      if (componentType === "NewDelayedUnitBrowse") {
        if (selectedCompanyName) {
          getNewDelayUnitSelectionBrowse();
        }
      }

      // Edit Master Express
      if (componentType === "EditMasterExpress") {
        getAllUnitNumbersForEditMasterExpress(UnitSelectionLookup_RecordsPerPage);
      }

      if (componentType === "Lookup") {
        // Fetch Units for EditMaster
        if (MaintenanceProgram) {
          getAllUnitNumbers(UnitSelectionLookup_RecordsPerPage);
        }
        // Fetch Units for EditYardUnit
        if (EditYardUnit) {
          getAllUnitNumbersForEditYardUnit();
        }
        //Fetch Units for Yard Checkin
        if (YardCheckin) {
          getAllUnitNumbersForYardCheckin();
        }
        // Fetch Units for EditShuttle
        if (EditShuttle) {
          getAllUnitNumbersForEditShuttle();
        }
        // Fetch Units for ShuttleInquiry
        if (ShuttleInquiry) {
          getAllUnitNumbersForShuttleInquiry();
        }
        // Fetch Units for Unit Activation
        if (UnitActivation) {
          getAllUnitNumbersForUnitActivation();
        }
        if (EquipmentCheckOut) {
          getAllUnitNumbersForEquipmentCheckOut();
        }

        // Fetch Units using Optional Custom Fetch Function
        if (customFetchFunction) {
          customFetchFunction();
        }
        if (PlantRelease) {
          getAllUnitNumbersForPlantRelease();
        }
        if (customServiceCallback) {
          customFetchCallback(customServiceCallback);
        }

        if (lookupIncludingCROSSDB) {
          getUnitLookupForInvoicing(UnitSelectionLookup_RecordsPerPage);
        }
      }
    }, 150);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    pageNumber,
    selectedCompanyName,
    globalSearchTerm,
    selectedSearchCriteria,
    advancedSearchPayload,
    advancedSortingOrder,
    normalSortFlag,
    normalSortValue,
    unitLast5,
    unitType,
    orderType,
    dateType,
    dateFrom,
    dateTo,
    unitStatus,
    pickupBy,
    deliveryBy,
    unitOrderStatus,
    unitDelayType,
    dispatchDelayType,
    selectedDispatchStatus,
    advancedSearchString,
    advancedSearchByInputs,
    customerId,
    customerPlantId,
    dealerId,
    selectedCompanyPK,
  ]);

  useEffect(() => {
    if (showAdvancedSearch && componentType === "DelayedUnitBrowse") {
      if (selectedCompanyName) {
        fetchAllCustomersOfDelayedUnits(selectedCompanyName);
      }
    }
  }, [showAdvancedSearch, selectedCompanyName]);

  //delay first unit browse page
  const renderDelayedUnitBrowseList = listingData?.map((DelayedUnit) => (
    <tr
      id="rowId"
      key={renderItemId ? renderItemId(DelayedUnit) : DelayedUnit?.DelayedUnitFK}
      onClick={(event) => {
        dispatch(setSelectedId(renderItemId ? renderItemId(DelayedUnit) : DelayedUnit?.DelayedUnitFK));
      }}
      onDoubleClick={(event) => {
        const comName = !selectedCompanyName ? savedCompanyName : selectedCompanyName;
        dispatch(setActiveDisable(false));

        navigate(
          `/delay-processing/delayed-details/${comName}/${Number(DelayedUnit?.UnitFK)}/${Number(DelayedUnit?.DriverFK)}/${Number(DelayedUnit?.DelayedUnitFK)}`
        );
      }}
      className={
        (renderItemId ? renderItemId(DelayedUnit) : DelayedUnit?.DelayedUnitFK) === selectedId
          ? "tableSelected"
          : ""
      }
    >
      <td className="f-w-600">{customFormatDate(DelayedUnit?.Date)} </td>
      <td class="no-relative">
        <TruncatedStringWithTooltip text={DelayedUnit?.UnitNumber} charLimit={25} />
      </td>
      <td class="no-relative">
        <TruncatedStringWithTooltip text={DelayedUnit?.Customer} charLimit={25} />
      </td>
      <td class="no-relative">
        <TruncatedStringWithTooltip text={DelayedUnit.PickUp} charLimit={25} />
      </td>
      <td class="no-relative">
        <TruncatedStringWithTooltip text={DelayedUnit.Delivery} charLimit={25} />
      </td>
      <td class="no-relative">
        <TruncatedStringWithTooltip text={DelayedUnit?.UnitType} charLimit={25} />
      </td>
      <td class="no-relative">
        <TruncatedStringWithTooltip text={DelayedUnit?.SpecialCode} charLimit={25} />
      </td>
    </tr>
  ));
  //new-dealy -unit
  const renderNewDelayedUnitBrowseList = listingData?.map((ActiveUnit) => (
    <tr
      id="rowId"
      key={renderItemId ? renderItemId(ActiveUnit) : ActiveUnit?.UnitFK}
      onClick={(event) => {
        dispatch(setSelectedId(renderItemId ? renderItemId(ActiveUnit) : ActiveUnit?.UnitFK));
      }}

      onDoubleClick={(event) => {
        dispatch(setRowData(ActiveUnit));

        localStorage.setItem("storedRowData", JSON.stringify(ActiveUnit));
        dispatch(setUnitConfirmationData(null));
        navigate(
          "/delay-processing/new-delayed-unit-confirmation/" +
            selectedCompanyName?.trim() +
            "/" +
            Number(ActiveUnit?.UnitFK) +
            "/" +
            Number(ActiveUnit?.DriverFK)
        );
      }}
      className={
        (renderItemId ? renderItemId(ActiveUnit) : ActiveUnit?.UnitFK) === selectedId ? "tableSelected" : ""
      }
    >
      <td className="f-w-600">{customFormatDate(ActiveUnit.Date)}</td>

      <td class="no-relative">
        <TruncatedStringWithTooltip text={ActiveUnit.UnitNumber} charLimit={25} />
      </td>

      <td class="no-relative">
        <TruncatedStringWithTooltip text={ActiveUnit.Customer} charLimit={25} />
      </td>
      <td class="no-relative">
        <TruncatedStringWithTooltip text={ActiveUnit.PickUp} charLimit={25} />
      </td>
      <td class="no-relative">
        <TruncatedStringWithTooltip text={ActiveUnit.Delivery} charLimit={25} />
      </td>
      <td class="no-relative">
        {" "}
        <TruncatedStringWithTooltip text={ActiveUnit.UnitType} charLimit={25} />
      </td>
      <td class="no-relative">
        <TruncatedStringWithTooltip text={ActiveUnit.SpecialCode} charLimit={25} />
      </td>
    </tr>
  ));

  //Edit Master Express
  const renderEditMasterExpress = listingData?.map((unit) => (
    <tr
      id="rowId"
      key={renderItemId ? renderItemId(unit) : unit.unitPK || ""}
      onDoubleClick={() => {
        EditMasterExpressService.getUnitDataById(unit.unitPK)
          .then((response) => {
            const data = response?.data;
            dispatch(setSelectedUnitData(data));
          })
          .catch((error) => {
            dispatch(setSelectedUnitData(""));
          });

        dispatch(setSelectedId(renderItemId ? renderItemId(unit) : unit.unitPK));
        dispatch(setViewDetail(true));
        setTimeout(() => {
          navigate("/edit-master-express-edit-page/" + unit.unitPK + "/" + pageNumber);
        }, 100);
      }}
      className={(renderItemId ? renderItemId(unit) : unit.unitPK) === selectedId ? "tableSelected" : ""}
    >
      <td className="f-w-600">
        {dateType === "Entry"
          ? unit.entryDate
            ? moment(unit.entryDate).format("MM/DD/YY")
            : ""
          : dateType === "Order"
            ? unit.orderDate
              ? moment(unit.orderDate).format("MM/DD/YY")
              : ""
            : dateType === "Shuttle"
              ? unit.inPickupYardDate
                ? moment(unit.inPickupYardDate).format("MM/DD/YY")
                : ""
              : dateType === "Dispatch"
                ? unit.dispatchDate
                  ? moment(unit.dispatchDate).format("MM/DD/YY")
                  : ""
                : dateType === "Invoice"
                  ? unit.invoiceDate
                    ? moment(unit.invoiceDate).format("MM/DD/YY")
                    : ""
                  : ""}
      </td>
      <td className="f-w-600">{unit.unitNumber}</td>
      <td className="f-w-600">{unit.customer}</td>
      <td className="f-w-600">{pickupBy === "City, ST" ? unit.pickupByCityState : unit.pickupByName}</td>
      <td className="f-w-600">
        {deliveryBy === "City, ST" ? unit.deliveryByCityState : unit.deliveryByName}
      </td>
      <td className="f-w-600">{unit.unitType}</td>
      <td className="f-w-600">{unit.specialCode}</td>
    </tr>
  ));

  //Lookup For Invoicing
  const renderLookupForInvoicing = listingData?.map((unit) => (
    <tr
      id="rowId"
      key={renderItemId ? renderItemId(unit) : unit.UnitPK || ""}
      onClick={(event) => {
        if (componentType === "Lookup") {
          handleLookupSelection(unit, event);
          dispatch(setSelectedId(renderItemId ? renderItemId(unit) : unit.UnitPK));
        }
      }}
      onDoubleClick={() => {
        dispatch(setSelectedId(renderItemId ? renderItemId(unit) : unit.UnitPK));
      }}
      className={(renderItemId ? renderItemId(unit) : unit.UnitPK) === selectedId ? "tableSelected" : ""}
    >
      <td className="f-w-600">{unit.EntryDate ? moment(unit.EntryDate).format("MM/DD/YY") : ""}</td>
      <td className="f-w-600">{unit.UnitNumber}</td>
      <td className="f-w-600">{unit.Customer}</td>
      <td className="f-w-600">{unit.Pickup}</td>
      <td className="f-w-600">{unit.Delivery}</td>
      <td className="f-w-600">{unit.UnitType}</td>
      <td className="f-w-600">{unit.SpecialCode}</td>
    </tr>
  ));
  return (
    <div className="fixTableHead unitSelection">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("date");
              }}
            >
              Date
              {!showAdvancedSort && normalSortValue === "date" ? (
                normalSortFlag ? (
                  <AscendingIcon />
                ) : (
                  <DescendingIcon />
                )
              ) : null}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("unitNumber");
              }}
            >
              Unit Number
              {!showAdvancedSort && normalSortValue === "unitNumber" ? (
                normalSortFlag ? (
                  <AscendingIcon />
                ) : (
                  <DescendingIcon />
                )
              ) : null}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("customer");
              }}
            >
              Customer
              {!showAdvancedSort && normalSortValue === "customer" ? (
                normalSortFlag ? (
                  <AscendingIcon />
                ) : (
                  <DescendingIcon />
                )
              ) : null}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("pickup");
              }}
            >
              Pickup
              {!showAdvancedSort && normalSortValue === "pickup" ? (
                normalSortFlag ? (
                  <AscendingIcon />
                ) : (
                  <DescendingIcon />
                )
              ) : null}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("delivery");
              }}
            >
              Delivery
              {!showAdvancedSort && normalSortValue === "delivery" ? (
                normalSortFlag ? (
                  <AscendingIcon />
                ) : (
                  <DescendingIcon />
                )
              ) : null}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("unitType");
              }}
            >
              Unit Type
              {!showAdvancedSort && normalSortValue === "unitType" ? (
                normalSortFlag ? (
                  <AscendingIcon />
                ) : (
                  <DescendingIcon />
                )
              ) : null}
            </th>
            <th className="f-w-600">Special Code</th>
          </tr>
        </thead>

        <tbody>
          {/* Default Case (Edit Master & Unit Selection) */}
          {componentType !== "DelayedUnitBrowse" &&
            componentType !== "NewDelayedUnitBrowse" &&
            componentType !== "EditMasterExpress" &&
            componentType !== "NewDelayedUnitBrowse" &&
            !lookupIncludingCROSSDB &&
            listingData?.length > 0 &&
            listingData?.map((unit) => (
              <tr
                id="rowId"
                key={renderItemId ? renderItemId(unit) : unit.unitPK || unit.unitShuttlePK}
                onClick={(event) => {
                  if (componentType === "Lookup") {
                    handleLookupSelection(unit, event);
                    dispatch(setSelectedId(renderItemId ? renderItemId(unit) : unit.unitPK));
                    if (EditShuttle) {
                      dispatch(setSelectedId(renderItemId ? renderItemId(unit) : unit.unitShuttlePK));
                    }
                    if (UnitActivation) {
                      dispatch(setSelectedId(renderItemId ? renderItemId(unit) : unit.id));
                    }
                  }
                  if (componentType === "Maintenance") {
                    dispatch(setSelectedId(""));
                  }
                }}
                onDoubleClick={() => {
                  if (UnitActivation) {
                    dispatch(setSelectedId(renderItemId ? renderItemId(unit) : unit.id));
                  } else {
                    dispatch(setSelectedId(renderItemId ? renderItemId(unit) : unit.unitPK));
                  }
                }}
                className={
                  UnitActivation
                    ? (renderItemId ? renderItemId(unit) : unit.id) === selectedId
                      ? "tableSelected"
                      : ""
                    : (renderItemId ? renderItemId(unit) : unit.unitPK) === selectedId
                      ? "tableSelected"
                      : ""
                }
              >
                <td className="f-w-600">
                  {dateType === "Entry"
                    ? unit.entryDate
                      ? moment(unit.entryDate).format("MM/DD/YY")
                      : ""
                    : dateType === "Order"
                      ? unit.orderDate
                        ? moment(unit.orderDate).format("MM/DD/YY")
                        : ""
                      : dateType === "Shuttle"
                        ? unit.inPickupYardDate
                          ? moment(unit.inPickupYardDate).format("MM/DD/YY")
                          : ""
                        : dateType === "Dispatch"
                          ? unit.dispatchDate
                            ? moment(unit.dispatchDate).format("MM/DD/YY")
                            : ""
                          : dateType === "Invoice"
                            ? unit.invoiceDate
                              ? moment(unit.invoiceDate).format("MM/DD/YY")
                              : ""
                            : ""}
                </td>
                <td className="f-w-600">{unit.unitNumber}</td>
                <td className="f-w-600">{unit.customer}</td>
                <td className="f-w-600">
                  {pickupBy === "City, ST" ? unit.pickupByCityState : unit.pickupByName}
                </td>
                <td className="f-w-600">
                  {deliveryBy === "City, ST" ? unit.deliveryByCityState : unit.deliveryByName}
                </td>
                <td className="f-w-600">{unit.unitType}</td>
                <td className="f-w-600">{unit.specialCode}</td>
              </tr>
            ))}
          {componentType === "Lookup" && lookupIncludingCROSSDB && renderLookupForInvoicing}
          {componentType === "EditMasterExpress" && renderEditMasterExpress}
          {componentType === "DelayedUnitBrowse" &&
            listingData?.length > 0 &&
            !loading &&
            renderDelayedUnitBrowseList}
          {componentType === "NewDelayedUnitBrowse" &&
            listingData?.length > 0 &&
            !loading &&
            renderNewDelayedUnitBrowseList}
        </tbody>
      </table>
      {loading ? <LoadingIcon /> : (!listingData || listingData?.length === 0) && <NoRecordsMessage />}
    </div>
  );
};

export default TableListing;
