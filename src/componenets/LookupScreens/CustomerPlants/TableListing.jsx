/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setTotalElements,
  setTotalPages,
  setCustomerPlantData,
  setNormalSortValue,
  setNormalSortFlag,
  setBillingPlantId,
  setChangeColorCustomerPlantLookup,
} from "../../../redux/LookupScreens/CustomerPlantsLookupSlice";
import CustomerPlantMaintenanceService from "../../../services/CustomerPlantMaintenanceService";
import OrderEntryService from "../../../services/OrderEntryService";
import YardCheckinService from "../../../services/shuttle/process/YardCheckinService";
import CustomerDPURestrictionsService from "../../../services/CustomerDPURestrictionsService";
import EditShuttleService from "../../../services/shuttle/process/EditShuttleService";
import { AdvancedLookupScreen_RecordsPerPage } from "../../../services/constants/applicationConstants";
import LoadingText from "../../common/LoadingText";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  OrderEntry,
  MaintenanceProgram,
  customerId,
  customFetchFunction,
  shuttle,
  yardCheckin,
  selectedCompanyName,
  isDPUCustomer,
  EditShuttle,
  companyName,
  usePlants,
  EditMasterExpress,
  restrictedPlantLists,
  customServiceCallback,
  customerActivitySummary,
  fetchFunction,
  renderCol1,
  renderCol2,
  renderCol3,
  normalfetchFunction,
  tripListingByCustomer,
  onRoadNotDeliveredReport,
  unitException,
  customerSalesReport,
  returnProcess,
  unitfk,
  common,
  reportType,
}) => {
  // ---------------------------------------------------------------------------------------------------
  const customerPlantData = useSelector((state) => state.customerPlantsLookupReducer.customerPlantData);
  const billingPlantId = useSelector((state) => state.customerPlantsLookupReducer.billingPlantId);
  const loading = useSelector((state) => state.customerPlantsLookupReducer.loading);
  const changeColorCustomerPlantLookup = useSelector(
    (state) => state.customerPlantsLookupReducer.changeColorCustomerPlantLookup
  );
  const pageNoPlantsLookup = useSelector((state) => state.customerPlantsLookupReducer.pageNoPlantsLookup);
  const sortFlag = useSelector((state) => state.customerPlantsLookupReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.customerPlantsLookupReducer.normalSortValue);
  const showAdvanceSort = useSelector((state) => state.customerPlantsLookupReducer.showAdvanceSort);
  const searchedCustomerPlant = useSelector(
    (state) => state.customerPlantsLookupReducer.searchedCustomerPlant
  );
  const selectedSearchCriteria = useSelector(
    (state) => state.customerPlantsLookupReducer.selectedSearchCriteria
  );
  const advanceSortingOrder = useSelector((state) => state.customerPlantsLookupReducer.advanceSortingOrder);
  const searchTerms = useSelector((state) => state.customerPlantsLookupReducer.searchTerms);
  const customerPlantFKS = useSelector((state) => state.customerPlantsLookupReducer.customerPlantFKS);
  const advanceSearchObject = useSelector((state) => state.customerPlantsLookupReducer.advancedSearchObject);
  const [adSort] = useState(false);

  const isCustomerDpu = useSelector((state) => state.orderEntryReducer.isCustomerDpu);
  const isSelectedCustomerDPU = useSelector((state) => state.yardCheckinReducer.isSelectedCustomerDPU);

  const dispatch = useDispatch();

  const fetchCustomerPlantsDetails = () => {
    let dpuCustomer = EditMasterExpress ? isDPUCustomer : isCustomerDpu;
    let companyName = "";
    OrderEntryService.fetchCustomerPlantsLookupDetails(
      pageNoPlantsLookup,
      searchedCustomerPlant,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      customerId /* || selectedCustomerId, */,
      dpuCustomer,
      companyName
    )
      .then((response) => {
        const data = response.data;
        const customerPlants = data.content?.map((plant) => ({ ...plant, name: plant.name?.trim() }));
        dispatch(setCustomerPlantData(customerPlants));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const fetchCustomerPlantsForMaintenance = () => {
    dispatch(setLoading(true));
    CustomerPlantMaintenanceService.getAllPlantsByCustomer(
      "Complete",
      "Active",
      selectedSearchCriteria,
      searchedCustomerPlant,
      pageNoPlantsLookup,
      searchTerms,
      customerId,
      customerPlantFKS,
      sortValue,
      sortFlag,
      AdvancedLookupScreen_RecordsPerPage
      // isCustomerDpu
    )
      .then((response) => {
        const data = response.data;
        const customerPlants = data.content?.map((plant) => ({ ...plant, name: plant.name?.trim() }));
        dispatch(setCustomerPlantData(customerPlants));
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

  const fetchRestrictedCustomerPlants = () => {
    CustomerPlantMaintenanceService.getRestrictedCustomerPlants(
      "Complete",
      "Active",
      selectedSearchCriteria,
      searchedCustomerPlant,
      pageNoPlantsLookup,
      searchTerms,
      customerId,
      customerPlantFKS,
      sortValue,
      sortFlag,
      AdvancedLookupScreen_RecordsPerPage,
      restrictedPlantLists
      // isCustomerDpu
    )
      .then((response) => {
        const data = response.data;
        const customerPlants = data.content?.map((plant) => ({ ...plant, name: plant.name?.trim() }));
        dispatch(setCustomerPlantData(customerPlants));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  //Shuttle Process
  const fetchCustomerPlantsDetailsForShuttle = () => {
    YardCheckinService.fetchCustomerPlantsLookupDetails(
      pageNoPlantsLookup,
      searchedCustomerPlant,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      customerId /* || selectedCustomerId, */,
      isDPUCustomer,
      selectedCompanyName
    )
      .then((response) => {
        const data = response.data;
        dispatch(setCustomerPlantData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  //Yard Checkin
  const fetchCustomerPlantsForYardCheckin = () => {
    YardCheckinService.getAllPlantsByCustomerForLookup(
      "Complete",
      "Active",
      selectedSearchCriteria,
      searchedCustomerPlant,
      pageNoPlantsLookup,
      searchTerms,
      customerId,
      customerPlantFKS,
      sortValue,
      sortFlag,
      selectedCompanyName
    )
      .then((response) => {
        const data = response.data;
        const customerPlants = data.content?.map((plant) => ({ ...plant, name: plant.name?.trim() }));
        dispatch(setCustomerPlantData(customerPlants));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const fetchCustomerPlantsDetailsForEditShuttle = () => {
    EditShuttleService.fetchPlantDetailsForLookup(
      pageNoPlantsLookup,
      searchedCustomerPlant,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      customerId /* || selectedCustomerId, */,
      isDPUCustomer,
      companyName
    )
      .then((response) => {
        const data = response.data;
        const customerPlants = data.content?.map((plant) => ({ ...plant, name: plant.name?.trim() }));
        dispatch(setCustomerPlantData(customerPlants));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  //customerActivitySummaryReport
  const fetchCustomerPlants = () => {
    CustomerPlantMaintenanceService.getCustomerPlantsForReport(
      customerId,
      selectedSearchCriteria,
      searchTerms,
      pageNoPlantsLookup,
      sortValue,
      sortFlag,
      "lookup",
      15,
      advanceSearchObject?.firstField,
      advanceSearchObject?.secondField,
      advanceSearchObject?.thirdField
    )
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setCustomerPlantData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  /*****Used for Breakdown,Damage  Program */
  const customFetchCallback = (customServiceCallback) => {
    customServiceCallback()
      .then((response) => {
        const data = response.data;
        const listingData = data.filter((item) => item.Type !== "Pagination" && item.Type !== "plantEnabled");
        const paginationData = data.find((item) => item.Type === "Pagination");

        dispatch(setCustomerPlantData(listingData));

        if (paginationData) {
          dispatch(setTotalElements(paginationData.TotalElements || 0));
          dispatch(setTotalPages(paginationData.TotalPages || 0));
        }
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const fetchCallbackForSP = (fetchFunction) => {
    fetchFunction({
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: pageNoPlantsLookup,
      sortValue,
      sortType: sortFlag,
      advancedSortingOrder: advanceSortingOrder,
      advancedSearchObject: searchedCustomerPlant,
    })
      .then((response) => {
        const { data } = response;
        const paginationData = data?.find((item) => item?.Type === "Pagination");
        const filteredList = data?.filter((item) => item?.Type !== "Pagination");
        dispatch(setCustomerPlantData(filteredList || []));
        dispatch(setTotalElements(paginationData.TotalElements || 0));
        dispatch(setTotalPages(paginationData.TotalPages || 0));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };

  const fetchCallbackForNormal = (normalfetchFunction) => {
    normalfetchFunction({
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: pageNoPlantsLookup,
      sortValue,
      sortType: sortFlag,
      advancedSortingOrder: advanceSortingOrder,
      advancedSearchObject: searchedCustomerPlant,
    })
      .then((response) => {
        const data = response.data;
        const customerPlants = data.content?.map((plant) => ({ ...plant, name: plant.name?.trim() }));
        dispatch(setCustomerPlantData(customerPlants));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };

  //tripListingByCustomerReport
  const fetchPlantsForTripListing = () => {
    CustomerPlantMaintenanceService.getPlantsForTripListingReport(
      selectedSearchCriteria,
      searchTerms,
      pageNoPlantsLookup,
      sortValue,
      sortFlag,
      "lookup",
      15,
      advanceSearchObject?.firstField,
      advanceSearchObject?.secondField,
      advanceSearchObject?.thirdField
    )
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setCustomerPlantData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  //onRoadNotDeliveredReport
  const fetchPlantsForOnRoad = () => {
    CustomerPlantMaintenanceService.getPlantsForOnRoadNotDeliveredReport(
      customerId,
      selectedSearchCriteria,
      searchTerms,
      pageNoPlantsLookup,
      sortValue,
      sortFlag,
      "lookup",
      15,
      advanceSearchObject?.firstField,
      advanceSearchObject?.secondField,
      advanceSearchObject?.thirdField
    )
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setCustomerPlantData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  //customerSalesReport
  const fetchPlantsForCustomerSalesReport = () => {
    CustomerPlantMaintenanceService.getPlantsForCustomerSalesReport({
      customerPK: customerId,
      selectedSearchCriteria,
      searchTerms,
      pageNoPlantsLookup,
      sortValue,
      sortFlag,
      type: "LookUp",
      pageNumber: 0,
      FirstField: advanceSearchObject?.firstField,
      secondField: advanceSearchObject?.secondField,
      thirdField: advanceSearchObject?.thirdField,
      name: searchedCustomerPlant?.name,
      brand: searchedCustomerPlant?.brand,
      productLine: searchedCustomerPlant?.productLine,
    })
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setCustomerPlantData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  //common Lookup
  const fetchPlantsForCommonLookup = () => {
    dispatch(setLoading(true));
    CustomerPlantMaintenanceService.getPlantsForCommonLookup({
      reportType,
      customerPK: customerId || null,
      pageNumber: pageNoPlantsLookup,
      pageSize: AdvancedLookupScreen_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      searchTerms,
      sortValue,
      sortType: sortFlag,
      type: "Lookup",
      firstField: advanceSearchObject?.firstField,
      secondField: advanceSearchObject?.secondField,
      thirdField: advanceSearchObject?.thirdField,
      name: searchedCustomerPlant?.name,
      brand: searchedCustomerPlant?.brand,
      productLine: searchedCustomerPlant?.productLine,
    })
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setCustomerPlantData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  //unitExceptionReport
  const fetchPlantsForUnitExceptionreport = () => {
    CustomerPlantMaintenanceService.getPlantsForUnitExceptionReport({
      selectedSearchCriteria,
      searchTerms,
      pageNoPlantsLookup,
      sortValue,
      sortFlag,
      type: "lookup",
      pageSize: 15,
      name: advanceSearchObject?.firstField,
      brand: advanceSearchObject?.secondField,
      productLine: advanceSearchObject?.thirdField,
    })
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setCustomerPlantData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const fetchreturnProcess = () => {
    const requestData = {
      customerPK: customerId,
      pageNumber: pageNoPlantsLookup,
      pageSize: 15,
      searchCriteria: selectedSearchCriteria,
      searchTerms: searchTerms,
      sortValue: sortValue,
      sortType: sortFlag,
      type: "Lookup",
      FirstField: advanceSearchObject?.firstField || "",
      secondField: advanceSearchObject?.secondField || "",
      thirdField: advanceSearchObject?.thirdField || "",
      name: searchedCustomerPlant?.name,
      brand: searchedCustomerPlant?.brand,
      productLine: searchedCustomerPlant?.productLine,
      companyName: companyName,
      unitFK: unitfk,
    };
    CustomerPlantMaintenanceService.getPlantsForReturn(requestData)
      .then(({ data }) => {
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setCustomerPlantData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  /**
   * Fetch Customers conditionally for differenct cases
   */
  useEffect(() => {
    dispatch(setLoading(true));
    const debounceFunction = setTimeout(() => {
      // Fetch Customers for OE
      if (OrderEntry) {
        fetchCustomerPlantsDetails();
      }
      // Fetch Customers for MP
      if (MaintenanceProgram) {
        fetchCustomerPlantsForMaintenance();
      }
      // Fetch Customers for Shuttle
      if (shuttle) {
        fetchCustomerPlantsDetailsForShuttle();
      }
      // Fetch Customer Plants By Selected Company Name
      if (yardCheckin) {
        fetchCustomerPlantsForYardCheckin();
      }
      // Fetch Customers using Optional Custom Fetch Function
      if (customFetchFunction) {
        customFetchFunction();
      }
      // Fetch Customer plants for Edit Shuttle
      if (EditShuttle) {
        fetchCustomerPlantsDetailsForEditShuttle();
      }

      if (customServiceCallback) {
        customFetchCallback(customServiceCallback);
      }
      if (customerActivitySummary) {
        fetchCustomerPlants();
      }
      if (tripListingByCustomer) {
        fetchPlantsForTripListing();
      }
      if (onRoadNotDeliveredReport) {
        fetchPlantsForOnRoad();
      }
      if (customerSalesReport) {
        fetchPlantsForCustomerSalesReport();
      }
      if (fetchFunction) {
        fetchCallbackForSP(fetchFunction);
      }
      if (normalfetchFunction) {
        fetchCallbackForNormal(normalfetchFunction);
      }
      if (unitException) {
        fetchPlantsForUnitExceptionreport();
      }
      if (returnProcess) {
        fetchreturnProcess();
      }
      if (common) {
        fetchPlantsForCommonLookup();
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    selectedSearchCriteria,
    searchedCustomerPlant,
    advanceSortingOrder,
    pageNoPlantsLookup,
    showAdvanceSort,
    searchTerms,
    sortValue,
    sortFlag,
  ]);

  useEffect(() => {
    if (restrictedPlantLists) {
      dispatch(setLoading(true));
      fetchRestrictedCustomerPlants();
    }
  }, [
    restrictedPlantLists,
    pageNoPlantsLookup,
    sortValue,
    sortFlag,
    selectedSearchCriteria,
    searchedCustomerPlant,
    searchTerms,
    advanceSortingOrder,
  ]);

  const renderCustomerPlantData = customerPlantData?.map((plant) => (
    <tr
      id="rowId"
      key={renderItemId(plant)}
      onClick={(event) => {
        handleLookupSelection(plant, event);
        dispatch(setBillingPlantId(renderItemId(plant)));
        dispatch(setChangeColorCustomerPlantLookup(true));
      }}
      onDoubleClick={(event) => {}}
      className={
        renderItemId(plant) === billingPlantId && changeColorCustomerPlantLookup ? "tableSelected" : " "
      }
    >
      <td className="f-w-600"> {(renderCol1 && renderCol1(plant)) || plant.name || plant.Name} </td>
      <td className="f-w-600"> {(renderCol2 && renderCol2(plant)) || plant.brand || plant.Brand} </td>
      <td className="f-w-600">
        {" "}
        {(renderCol3 && renderCol3(plant)) || plant.productLine || plant.ProductLine}{" "}
      </td>
    </tr>
  ));

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("name", !sortFlag);
                  }
              }}
            >
              Name
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
                    onhandleNormalSort("brand", !sortFlag);
                  }
              }}
            >
              Brand
              {showAdvanceSort !== true && sortFlag && sortValue === "brand" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "brand" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("productLine", !sortFlag);
                  }
              }}
            >
              Product Line
              {showAdvanceSort !== true && sortFlag && sortValue === "productLine" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "productLine" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {!loading && customerPlantData.length !== 0 && <tbody>{renderCustomerPlantData}</tbody>}
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        customerPlantData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
