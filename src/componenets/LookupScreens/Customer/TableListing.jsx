/* eslint- react-hooks/exhaustive-deps */
import { t } from "i18next";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setTotalElements,
  setTotalPages,
  setCustomerData,
  setNormalSortValue,
  setNormalSortFlag,
  setId,
  setChangeColorCustomerLookup,
  setLoading,
} from "../../../redux/LookupScreens/CustomerLookupSlice";
import OrderEntryService from "../../../services/OrderEntryService";
import CustomerService from "../../../services/CustomerService";
import CustomerDPURestrictionsService from "../../../services/CustomerDPURestrictionsService";
import CustomerPlantMaintenanceService from "../../../services/CustomerPlantMaintenanceService";
import { setSelectedStatus } from "../../../redux/CustomerPlantSearchFilterSlice";
import { setSelectedCustomerStatus } from "../../../redux/UsePlantCustomerSearchFilterSlice";
import { setViewDetail } from "../../../redux/CustomerPlantMaintenanceSlice";
import YardCheckinService from "../../../services/shuttle/process/YardCheckinService";
import DelayProcessingService from "../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import RerouteService from "../../../services/RerouteService";
import LoadingText from "../../common/LoadingText";

const TableListing = ({
  renderItemId,
  fetchFunction,
  renderCol1,
  renderCol2,
  renderCol3,
  handleLookupSelection,
  OrderEntry,
  shuttle,
  selectedCompanyName,
  MaintenanceProgram,
  customFetchFunction,
  DriverDispatch,
  usePlantsCustomer,
  customServiceCallback,
  delay,
  RerouteProgram,
  isMiscInvoice,
  restrictedCustomerId,
  restrictedCustomer,
  CompanyId,
  customerActivitySummary,
  plantId,
  accountManagerId,
  undispatchedListing,
  onRoadNotDeliveredReport,
  unitException,
  customerSalesReport,
  common,
}) => {
  // ------------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customerLookupReducer.customerData);
  const id = useSelector((state) => state.customerLookupReducer.id);
  const changeColorCustomerLookup = useSelector(
    (state) => state.customerLookupReducer.changeColorCustomerLookup
  );
  const loading = useSelector((state) => state.customerLookupReducer.loading);
  const pageNo = useSelector((state) => state.customerLookupReducer.pageNo);
  const sortFlag = useSelector((state) => state.customerLookupReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.customerLookupReducer.normalSortValue);
  const showAdvanceSort = useSelector((state) => state.customerLookupReducer.showAdvanceSort);
  const [adSort] = useState(false);
  const searchedCustomer = useSelector((state) => state.customerLookupReducer.searchedCustomer);
  const selectedSearchCriteria = useSelector((state) => state.customerLookupReducer.selectedSearchCriteria);
  const advanceSortingOrder = useSelector((state) => state.customerLookupReducer.advanceSortingOrder);
  const searchTerms = useSelector((state) => state.customerLookupReducer.searchTerms);
  const customers = useSelector((state) => state.customerDPURestrictions.customers);
  const companyName = useSelector((state) => state.unitSelection.selectedCompanyName);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  const getAllCustomers = () => {
    dispatch(setLoading(true));
    OrderEntryService.getAllCustomers(
      pageNo,
      searchedCustomer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        const customers = data.content?.map((customer) => ({ ...customer, name: customer.name?.trim() }));
        dispatch(setCustomerData(customers));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const getCustomersRestrictions = () => {
    dispatch(setLoading(true));
    CustomerService.getAllRestrictedCustomerForLookup(
      "Active",
      pageNo,
      searchedCustomer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      "Complete",
      restrictedCustomerId
    )
      .then((response) => {
        const data = response.data;
        const customers = data.content?.map((customer) => ({ ...customer, name: customer.name?.trim() }));
        dispatch(setCustomerData(customers));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const getCustomersForMaintenance = () => {
    dispatch(setLoading(true));
    CustomerService.getAllCustomersForLookup(
      "Active",
      pageNo,
      searchedCustomer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      "Complete"
    )
      .then((response) => {
        const data = response.data;
        const customers = data.content?.map((customer) => ({ ...customer, name: customer.name?.trim() }));
        dispatch(setCustomerData(customers));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  //Delay Process
  const getCustomersForDelay = () => {
    dispatch(setLoading(true));
    DelayProcessingService.getAllCustomersForLookup(
      "Active",
      pageNo,
      searchedCustomer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      "Complete",
      null,
      companyName
    )
      .then((response) => {
        const data = response.data;
        const customers = data.content?.map((customer) => ({ ...customer, name: customer.name?.trim() }));
        dispatch(setCustomerData(customers));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  //Shuttle Process
  const getCustomersForShuttleProcess = () => {
    dispatch(setLoading(true));
    YardCheckinService.getAllCustomerDetails(
      pageNo,
      searchedCustomer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      selectedCompanyName
    )
      .then((response) => {
        const data = response.data;
        dispatch(setCustomerData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  const fetchCustomerForUsePlants = () => {
    dispatch(setLoading(true));
    CustomerPlantMaintenanceService.getAlluseplantsCustomers(
      "Active",
      // setSelectedStatus,
      pageNo,
      searchedCustomer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      setSelectedCustomerStatus,
      setViewDetail
    )
      .then((response) => {
        const data = response.data;
        dispatch(setCustomerData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const DriverDispatchCustomer = () => {
    dispatch(setLoading(true));
    CustomerService.getAllCustomersForLookup(
      "Active",
      pageNo,
      searchedCustomer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      "Complete",
      DriverDispatch
    )
      .then((response) => {
        const data = response.data;
        dispatch(setCustomerData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const customFetchCallback = (customServiceCallback) => {
    dispatch(setLoading(true));
    customServiceCallback()
      .then((response) => {
        const { data } = response;
        dispatch(setCustomerData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const fetchCallbackForSP = (fetchFunction) => {
    dispatch(setLoading(true));
    fetchFunction({
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: pageNo,
      sortValue,
      sortType: sortFlag,
      advancedSortingOrder: advanceSortingOrder,
      advancedSearchObject: searchedCustomer,
    })
      .then((response) => {
        const { data } = response;
        const paginationData = data?.find((item) => item?.Type === "Pagination");
        const filteredList = data?.filter((item) => item?.Type !== "Pagination");
        dispatch(setCustomerData(filteredList || []));
        dispatch(setTotalElements(paginationData.TotalElements || 0));
        dispatch(setTotalPages(paginationData.TotalPages || 0));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const DriverRerouteDealerCustomer = () => {
    dispatch(setLoading(true));
    RerouteService.getAllDealerCustomersForLookup(
      "Active",
      pageNo,
      searchedCustomer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      "Complete",
      CompanyId
    )
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setCustomerData(listingData?.length > 0 ? listingData : []));
        dispatch(setTotalElements(paginationData[0].TotalElements || 0));
        dispatch(setTotalPages(paginationData[0].TotalPages || 0));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const getCustomersForMiscInvoice = () => {
    dispatch(setLoading(true));
    CustomerService.getAllCustomersForLookup(
      "Active",
      pageNo,
      searchedCustomer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      "Complete",
      null,
      isMiscInvoice
    )
      .then((response) => {
        const data = response.data;
        const customers = data.content?.map((customer) => ({ ...customer, name: customer.name?.trim() }));
        dispatch(setCustomerData(customers));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const getUndispatchedListingReport = () => {
    dispatch(setLoading(true));
    CustomerService.getAllCustomersForUndispatchedLookup(
      "Active",
      pageNo,
      selectedSearchCriteria,
      searchTerms,
      sortValue,
      sortFlag,
      "Lookup",
      advanceSortingOrder?.firstField,
      advanceSortingOrder?.secondField,
      advanceSortingOrder?.thirdField,
      searchedCustomer?.name,
      searchedCustomer?.city,
      searchedCustomer?.stateCode
    )
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setCustomerData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  //onRoadNotDeliveredReport
  const getCustomersForOnRoadNotDeliveredReport = () => {
    dispatch(setLoading(true));
    CustomerService.getAllCustomersForOnRoadNotDelivered(
      plantId,
      pageNo,
      15,
      selectedSearchCriteria,
      searchTerms,
      sortValue,
      sortFlag,
      "Lookup",
      advanceSortingOrder?.firstField,
      advanceSortingOrder?.secondField,
      advanceSortingOrder?.thirdField,
      searchedCustomer?.name,
      searchedCustomer?.city,
      searchedCustomer?.stateCode
    )
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setCustomerData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  //unitException Report
  const fetchCustomersForUnitExceptionReport = () => {
    dispatch(setLoading(true));
    CustomerService.getCustomersForUnitExceptionReport({
      plantId,
      pageNo: 0,
      pageSize: 15,
      selectedSearchCriteria,
      searchTerms,
      sortValue,
      sortFlag,
      type: "Lookup",
      firstField: advanceSortingOrder?.firstField,
      secondField: advanceSortingOrder?.secondField,
      thirdField: advanceSortingOrder?.thirdField,
      name: searchedCustomer?.name,
      city: searchedCustomer?.city,
      stateCode: searchedCustomer?.stateCode,
    })
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setCustomerData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  //common Lookup
  const fetchCustomersForCommonLookup = () => {
    dispatch(setLoading(true));
    CustomerService.getCustomersForCommonLookup({
      plantId,
      pageNo: 0,
      pageSize: 15,
      selectedSearchCriteria,
      searchTerms,
      sortValue,
      sortFlag,
      type: "Lookup",
      firstField: advanceSortingOrder?.firstField,
      secondField: advanceSortingOrder?.secondField,
      thirdField: advanceSortingOrder?.thirdField,
      name: searchedCustomer?.name,
      city: searchedCustomer?.city,
      stateCode: searchedCustomer?.stateCode,
    })
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setCustomerData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  //customerSalesReport
  const getCustomersForCustomerSalesReport = () => {
    dispatch(setLoading(true));
    CustomerService.getAllCustomersForCustomerSalesReport({
      pageNumber: pageNo,
      plantPK: plantId,
      accountManagerPK: accountManagerId,
      pageSize: 15,
      selectedSearchCriteria,
      searchTerms,
      sortValue,
      sortType: sortFlag,
      type: "LookUp",
      FirstField: advanceSortingOrder?.firstField,
      secondField: advanceSortingOrder?.secondField,
      thirdField: advanceSortingOrder?.thirdField,
      name: searchedCustomer?.name,
      city: searchedCustomer?.city,
      stateCode: searchedCustomer?.stateCode,
    })
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setCustomerData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const getDriverCustomerActivityReport = () => {
    dispatch(setLoading(true));
    CustomerService.getAllCustomersForLookupReport(
      plantId,
      selectedSearchCriteria,
      searchTerms,
      pageNo,
      sortValue,
      sortFlag,
      "lookup",
      15,
      advanceSortingOrder?.firstField,
      advanceSortingOrder?.secondField,
      advanceSortingOrder?.thirdField,
      searchedCustomer?.name,
      searchedCustomer?.city,
      searchedCustomer?.stateCode
    )
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setCustomerData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  /**
   * Fetch Customers conditionally for differenct cases
   */
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      if (fetchFunction) {
        fetchCallbackForSP(fetchFunction);
      }

      if (restrictedCustomer) {
        getCustomersRestrictions();
      }
      // Fetch Customers for OE
      if (OrderEntry) {
        getAllCustomers();
      }
      // Fetch Customers for MP
      if (MaintenanceProgram) {
        getCustomersForMaintenance();
      }
      //Fetch Customers for shuttle process
      if (shuttle) {
        getCustomersForShuttleProcess();
      }
      //Fetch Delay Customers
      if (delay) {
        getCustomersForDelay();
      }
      if (usePlantsCustomer) {
        fetchCustomerForUsePlants();
      }
      // Fetch Customers using Optional Custom Fetch Function
      if (customFetchFunction) {
        customFetchFunction();
      }
      if (DriverDispatch) {
        DriverDispatchCustomer();
      }

      if (customServiceCallback) {
        customFetchCallback(customServiceCallback);
      }

      if (isMiscInvoice) {
        getCustomersForMiscInvoice();
      }

      if (RerouteProgram) {
        DriverRerouteDealerCustomer();
      }
      if (customerActivitySummary) {
        getDriverCustomerActivityReport();
      }
      if (undispatchedListing) {
        getUndispatchedListingReport();
      }
      if (onRoadNotDeliveredReport) {
        getCustomersForOnRoadNotDeliveredReport();
      }
      if (unitException) {
        fetchCustomersForUnitExceptionReport();
      }
      if (customerSalesReport) {
        getCustomersForCustomerSalesReport();
      }
      if (common) {
        fetchCustomersForCommonLookup();
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    selectedSearchCriteria,
    searchedCustomer,
    advanceSortingOrder,
    pageNo,
    showAdvanceSort,
    searchTerms,
    sortValue,
    sortFlag,
  ]);

  const renderCustomerListingData = customerData?.map((customer) => (
    <tr
      id="rowId"
      key={renderItemId(customer)}
      onClick={(event) => {
        handleLookupSelection(customer, event);
        dispatch(setId(renderItemId(customer)));
        dispatch(setChangeColorCustomerLookup(true));
      }}
      className={renderItemId(customer) === id && changeColorCustomerLookup ? "tableSelected" : " "}
    >
      <td className="f-w-600">
        {" "}
        {(renderCol1 && renderCol1(customer)) || customer?.name || customer?.Name || ""}
      </td>
      <td className="f-w-600">
        {" "}
        {(renderCol2 && renderCol2(customer)) || customer?.city || customer?.City || ""}
      </td>
      <td className="f-w-600">
        {" "}
        {(renderCol3 && renderCol3(customer)) || customer?.stateCode || customer?.StateCode || ""}
      </td>
    </tr>
  ));

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr d>
            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("name", !sortFlag);
                  }
              }}
            >
              {t("dealers.list.page.table.heading.name")}
              {showAdvanceSort !== true && sortFlag && sortValue === "name" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "name" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("city", !sortFlag);
                  }
              }}
            >
              {t("dealers.list.page.table.heading.city")}
              {showAdvanceSort !== true && sortFlag && sortValue === "city" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "city" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("stateCode", !sortFlag);
                  }
              }}
            >
              {t("dealers.list.page.table.heading.state")}
              {showAdvanceSort !== true && sortFlag && sortValue === "stateCode" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "stateCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {!loading && customerData?.length !== 0 && <tbody>{renderCustomerListingData}</tbody>}
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        customerData?.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
