/* eslint-disable react-hooks/exhaustive-deps */
import { t } from "i18next";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setChangeColor,
  setDealerData,
  setLoading,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedId,
  setTotalElements,
  setTotalPages,
} from "../../../redux/LookupScreens/DealerLookupSlice";
import DealerService from "../../../services/DealerService";
import { AdvancedLookupScreen_RecordsPerPage } from "../../../services/constants/applicationConstants";
import DelayProcessingService from "../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import MiscInvoiceService from "../../../services/Invoicing/MiscInvoiceService";
import RerouteService from "../../../services/RerouteService";
import LoadingText from "../../common/LoadingText";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  delay,
  isMiscInvoice,
  customerId,
  includePostalCodePK,
  DriverReroutes,
  companyId,
  customServiceCallback,
  tripListing,
  onRoadNotDeliveredReport,
  common,
  reportType,
}) => {
  // -----------------------------------------------------------------------
  const dealerData = useSelector((state) => state.dealerLookup.dealerData);
  const pageNumber = useSelector((state) => state.dealerLookup.pageNumber);
  const selectedSearchCriteria = useSelector((state) => state.dealerLookup.selectedSearchCriteria);
  const searchedDealer = useSelector((state) => state.dealerLookup.searchedDealer);
  const sortFlag = useSelector((state) => state.dealerLookup.normalSortFlag);
  const sortValue = useSelector((state) => state.dealerLookup.normalSortValue);
  const advanceSortingOrder = useSelector((state) => state.dealerLookup.advanceSortingOrder);
  const searchTerm = useSelector((state) => state.dealerLookup.searchTerms);
  const selectedId = useSelector((state) => state.dealerLookup.selectedId);
  const changeColor = useSelector((state) => state.dealerLookup.changeColor);
  const loading = useSelector((state) => state.dealerLookup.loading);
  const showAdvanceSort = useSelector((state) => state.dealerLookup.showAdvanceSort);
  const companyName = useSelector((state) => state.unitSelection.selectedCompanyName);
  const [adSort] = useState(false);
  const dispatch = useDispatch();

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  const fetchDealersForMaintenance = () => {
    dispatch(setLoading(true));
    DealerService.getDealersForLookup(
      "Active",
      pageNumber,
      searchedDealer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerm,
      sortValue,
      sortFlag,
      "Complete",
      "",
      null,
      AdvancedLookupScreen_RecordsPerPage,
      includePostalCodePK || false
    )
      .then((response) => {
        const data = response.data;
        const trimmedList = data.content?.map((dealer) => ({ ...dealer, name: dealer.name?.trim() }));
        dispatch(setDealerData(trimmedList));
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

  //tripListingByCustomerReport
  const fetchDealersForTripListing = () => {
    dispatch(setLoading(true));
    DealerService.getDealersForTripListingLookup(
      pageNumber,
      searchTerm,
      sortValue,
      sortFlag,
      selectedSearchCriteria,
      "Lookup",
      AdvancedLookupScreen_RecordsPerPage,
      searchedDealer?.name,
      searchedDealer?.dba,
      searchedDealer?.city,
      searchedDealer?.stateCode,
      advanceSortingOrder?.firstField,
      advanceSortingOrder?.secondField,
      advanceSortingOrder?.thirdField,
      advanceSortingOrder?.fourthField
    )
      .then((response) => {
        const data = response.data;
        const paginationData = data?.slice(data.length - 1);
        const browseData = data?.slice(0, data.length - 1);
        const dealerList = browseData?.map((dealer) => ({
          ...dealer,
          name: dealer?.Name?.trim(),
          dba: dealer?.DBA?.trim(),
          city: dealer?.City?.trim(),
          stateCode: dealer?.Statecode?.trim(),
        }));
        dispatch(setDealerData(dealerList));
        dispatch(setTotalElements(paginationData[0]?.TotalElements));
        dispatch(setTotalPages(paginationData[0]?.TotalPages));
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
  const fetchDealersForOnRoad = () => {
    dispatch(setLoading(true));
    DealerService.getDealersForOnRoadNotDelivered(
      pageNumber,
      searchTerm,
      sortValue,
      sortFlag,
      selectedSearchCriteria,
      "Lookup",
      AdvancedLookupScreen_RecordsPerPage,
      searchedDealer?.name,
      searchedDealer?.dba,
      searchedDealer?.city,
      searchedDealer?.stateCode,
      advanceSortingOrder?.firstField,
      advanceSortingOrder?.secondField,
      advanceSortingOrder?.thirdField,
      advanceSortingOrder?.fourthField
    )
      .then((response) => {
        const data = response.data;
        const paginationData = data?.slice(data.length - 1);
        const browseData = data?.slice(0, data.length - 1);
        const dealerList = browseData?.map((dealer) => ({
          ...dealer,
          name: dealer?.Name?.trim(),
          dba: dealer?.DBA?.trim(),
          city: dealer?.City?.trim(),
          stateCode: dealer?.Statecode?.trim(),
        }));
        dispatch(setDealerData(dealerList));
        dispatch(setTotalElements(paginationData[0]?.TotalElements));
        dispatch(setTotalPages(paginationData[0]?.TotalPages));
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
  const fetchDealersForCommonLookup = () => {
    dispatch(setLoading(true));
    DealerService.getDealersForCommonLookup({
      reportType,
      customerPK: customerId || null,
      pageNumber,
      pageSize: AdvancedLookupScreen_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      searchTerms: searchTerm,
      sortValue,
      sortType: sortFlag,
      type: "Lookup",
      firstField: advanceSortingOrder?.firstField,
      secondField: advanceSortingOrder?.secondField,
      thirdField: advanceSortingOrder?.thirdField,
      fourthField: advanceSortingOrder?.fourthField,
      name: searchedDealer?.name,
      dba: searchedDealer?.dba,
      city: searchedDealer?.city,
      stateCode: searchedDealer?.stateCode,
    })
      .then((response) => {
        const data = response.data;
        const paginationData = data?.slice(data.length - 1);
        const browseData = data?.slice(0, data.length - 1);
        const dealerList = browseData?.map((dealer) => ({
          ...dealer,
          name: dealer?.name?.trim(),
          dba: dealer?.dba?.trim(),
          city: dealer?.city?.trim(),
          stateCode: dealer?.stateCode?.trim(),
        }));
        dispatch(setDealerData(dealerList));
        dispatch(setTotalElements(paginationData[0]?.TotalElements));
        dispatch(setTotalPages(paginationData[0]?.TotalPages));
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const fetchDealersForMiscInvoice = () => {
    dispatch(setLoading(true));
    MiscInvoiceService.getDealers(
      "Active",
      pageNumber,
      searchedDealer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerm,
      sortValue,
      sortFlag,
      "Complete",
      "",
      null,
      AdvancedLookupScreen_RecordsPerPage,
      customerId
    )
      .then((response) => {
        const data = response.data;
        const trimmedList = data.content?.map((dealer) => ({ ...dealer, name: dealer.name?.trim() }));
        dispatch(setDealerData(trimmedList));
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

  const fetchDealersForDelay = () => {
    DelayProcessingService.getDealers(
      "Active",
      pageNumber,
      searchedDealer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerm,
      sortValue,
      sortFlag,
      "Complete",
      "",
      null,
      AdvancedLookupScreen_RecordsPerPage,
      companyName
    )
      .then((response) => {
        const data = response.data;
        const trimmedList = data.content?.map((dealer) => ({ ...dealer, name: dealer.name?.trim() }));
        dispatch(setDealerData(trimmedList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const customFetchCallback = (customServiceCallback) => {
    customServiceCallback()
      .then((response) => {
        const data = response.data;
        const trimmedList = data.content?.map((dealer) => ({ ...dealer, name: dealer.name?.trim() }));
        dispatch(setDealerData(trimmedList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const getDealersForLookupSP = () => {
    RerouteService.getDealersForLookupSP({
      active: "Active",
      pageNumber,
      searchCriteria: selectedSearchCriteria,
      advancedSortingOrder: advanceSortingOrder,
      searchTerm,
      sortValue,
      sortFlag,
      companyId,
      advancedSearchString: searchedDealer,
    })
      .then((response) => {
        const data = response.data;

        const browseData = data?.slice(0, data?.length - 1); // Slice everything except the last item
        const pagination = data?.slice(data?.length - 1); // Get only the last item (or empty array if data is empty)

        dispatch(setDealerData(browseData || []));
        if (pagination) {
          dispatch(setTotalElements(pagination[0].TotalElements || 0));
          dispatch(setTotalPages(pagination[0].TotalPages || 1));
        }
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const customFetchSPCallback = (customServiceCallback) => {
    customServiceCallback()
      .then((response) => {
        const data = response.data;
        const listingData = data.filter((item) => item.Type !== "Pagination" && item.Type !== "plantEnabled");
        const paginationData = data.find((item) => item.Type === "Pagination");

        dispatch(setDealerData(listingData));

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
  /**
   * Fetch Dealers conditionally for differenct cases
   */
  useEffect(() => {
    dispatch(setLoading(true));
    const debounceFunction = setTimeout(() => {
      // Fetch Dealers for MP
      if (MaintenanceProgram) {
        fetchDealersForMaintenance();
      }
      // Fetch Dealers using Optional Custom Fetch Function
      if (customFetchFunction) {
        customFetchFunction();
      }

      //Fetch Dealers for delay
      if (delay) {
        fetchDealersForDelay();
      }

      if (isMiscInvoice) {
        fetchDealersForMiscInvoice();
      }

      if (DriverReroutes) {
        getDealersForLookupSP();
      }

      if (tripListing) {
        fetchDealersForTripListing();
      }
      if (common) {
        fetchDealersForCommonLookup();
      }
      if (onRoadNotDeliveredReport) {
        fetchDealersForOnRoad();
      }

      if (customServiceCallback) {
        customFetchSPCallback(customServiceCallback);
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    pageNumber,
    searchTerm,
    selectedSearchCriteria,
    searchedDealer,
    advanceSortingOrder,
    sortValue,
    sortFlag,
  ]);

  const renderDealerData = () => {
    if (DriverReroutes) {
      return dealerData?.map((dealer) => (
        <tr
          id="rowId"
          key={renderItemId(dealer)}
          onClick={(event) => {
            handleLookupSelection(dealer, event);
            dispatch(setSelectedId(renderItemId(dealer)));
            dispatch(setChangeColor(true));
          }}
          onDoubleClick={(event) => {}}
          className={renderItemId(dealer) === selectedId && changeColor ? "tableSelected" : ""}
        >
          <td className="f-w-600"> {dealer.Name} </td>
          <td className="f-w-600"> {dealer.Dba} </td>
          <td className="f-w-600"> {dealer.City} </td>
          <td className="f-w-600"> {dealer.StateCode} </td>
        </tr>
      ));
    } else {
      return dealerData?.map((dealer) => (
        <tr
          id="rowId"
          key={renderItemId(dealer)}
          onClick={(event) => {
            handleLookupSelection(dealer, event);
            dispatch(setSelectedId(renderItemId(dealer)));
            dispatch(setChangeColor(true));
          }}
          onDoubleClick={(event) => {}}
          className={renderItemId(dealer) === selectedId && changeColor ? "tableSelected" : ""}
        >
          <td className="f-w-600"> {dealer.name} </td>
          <td className="f-w-600"> {dealer.dba} </td>
          <td className="f-w-600"> {dealer.city} </td>
          <td className="f-w-600"> {dealer.stateCode} </td>
        </tr>
      ));
    }
  };

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
                    onhandleNormalSort("dba", !sortFlag);
                  }
              }}
            >
              {t("dealers.list.page.table.heading.dba")}
              {showAdvanceSort !== true && sortFlag && sortValue === "dba" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "dba" && (
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

        {!loading && dealerData?.length !== 0 && <tbody>{renderDealerData()}</tbody>}
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        dealerData?.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
