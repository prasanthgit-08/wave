/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setYardsData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setTotalElements,
  setTotalPages,
  setYardId,
  setLoading,
} from "../../../redux/LookupScreens/YardLookupSlice";
import YardService from "../../../services/YardService";
import OrderEntryService from "../../../services/OrderEntryService";
import YardCheckinService from "../../../services/shuttle/process/YardCheckinService";
import EditShuttleService from "../../../services/shuttle/process/EditShuttleService";
import EditMasterExpressService from "../../../services/Units/EditMasterExpressService";
import {
  HalfScreen_RecordsPerPage,
  QuarterScreen_RecordsPerPage,
} from "../../../services/constants/applicationConstants";
import LoadingIcon from "../../common/LoadingIcon";

const TableListing = ({
  renderItemId,
  onHide,
  handleLookupSelection,
  OrderEntry,
  MaintenanceProgram,
  customFetchFunction,
  OECustomerPickupYard,
  OECustomerDeliveryYard,
  shuttle,
  EditShuttle,
  EditYardUnit,
  selectedCompanyName,
  DriverDispatch,
  EditMasterExpress,
  EditMasterExpressShuttle,
  undispatchedListing,
  unitException,
  yardInventory,
}) => {
  // -----------------------------------------------------------
  const yardsData = useSelector((state) => state.yardLookupReducer.yardsData);
  const changeColor = useSelector((state) => state.yardLookupReducer.changeColor);
  const loading = useSelector((state) => state.yardLookupReducer.loading);
  const pageNumberYardLookup = useSelector((state) => state.yardLookupReducer.pageNumberYardLookup);
  const sortFlag = useSelector((state) => state.yardLookupReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.yardLookupReducer.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.yardLookupReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.yardLookupReducer.searchTerms);
  const yardId = useSelector((state) => state.yardLookupReducer.yardId);

  const pickupPlantOutbound = useSelector((state) => state.orderEntryReducer.pickupPlantOutbound);
  const deliveryPlantOutbound = useSelector((state) => state.orderEntryReducer.deliveryPlantOutbound);
  const selectedCustomerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);
  const id = useSelector((state) => state.orderEntryReducer.selectedCustomerBillingPlantId);
  const shuttleToYard = useSelector((state) => state.orderEntryReducer.shuttleToYard);
  const shuttleFromYard = useSelector((state) => state.orderEntryReducer.shuttleFromYard);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);

  const dispatch = useDispatch();

  const getYardsForOrderEntry = (selectedCustomerId, id, reload, outbound) => {
    if (
      shuttleToYard ||
      shuttleFromYard ||
      selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleToYard ||
      selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleFromYard
    ) {
      dispatch(setLoading(true));
      OrderEntryService.fetchYardDetials(
        pageNumberYardLookup,
        selectedSearchCriteria,
        searchTerms,
        sortValue,
        sortFlag,
        selectedCustomerId,
        id,
        reload,
        outbound
      )
        .then((response) => {
          const { data } = response;
          const yards = data.content?.map((yard) => ({ ...yard, description: yard.description?.trim() }));
          dispatch(setYardsData(yards));
          dispatch(setTotalElements(data.totalElements));
          dispatch(setTotalPages(data.totalPages));
          dispatch(setLoading(false));
        })
        .catch((err) => {
          dispatch(setLoading(false));
        })
        .finally(() => dispatch(setLoading(false)));
    }
  };

  const getYardsForMaintenance = () => {
    dispatch(setLoading(true));
    YardService.getYardsForLookup(
      selectedSearchCriteria,
      searchTerms,
      pageNumberYardLookup,
      sortValue,
      sortFlag,
      "Active"
    )
      .then((response) => {
        const { data } = response;
        const yards = data.content?.map((yard) => ({ ...yard, description: yard.description?.trim() }));
        dispatch(setYardsData(yards));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  //Yards With Printer
  const getYardsWithPrinter = () => {
    dispatch(setLoading(true));
    EditMasterExpressService.getYardsForLookup(
      selectedSearchCriteria,
      searchTerms,
      pageNumberYardLookup,
      sortValue,
      sortFlag,
      "Active"
    )
      .then((response) => {
        const { data } = response;
        const yards = data.content?.map((yard) => ({ ...yard, description: yard.description?.trim() }));
        dispatch(setYardsData(yards));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  //Shuttle Process
  const getYardsForShuttleProcess = () => {
    dispatch(setLoading(true));
    YardCheckinService.getYardsForLookup(
      selectedSearchCriteria,
      searchTerms,
      pageNumberYardLookup,
      sortValue,
      sortFlag,
      "Active",
      selectedCompanyName
    )
      .then((response) => {
        const { data } = response;
        dispatch(setYardsData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const getAllYardsForEdit = () => {
    dispatch(setLoading(true));
    EditShuttleService.getYardsForLookup(
      selectedSearchCriteria,
      searchTerms,
      pageNumberYardLookup,
      sortValue,
      sortFlag,
      selectedCompanyName
    )
      .then((response) => {
        const { data } = response;
        const yards = data.content?.map((yard) => ({ ...yard, description: yard.description?.trim() }));
        dispatch(setYardsData(yards));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const returnOutboundForOrderEntry = () => {
    let outbound;
    if (OECustomerPickupYard) {
      outbound = pickupPlantOutbound;
    } else if (OECustomerDeliveryYard) {
      outbound = deliveryPlantOutbound;
    }
    return outbound;
  };

  const returnOutboundForEditMasterExpress = () => {
    let outbound;
    if (OECustomerPickupYard) {
      outbound = selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantOutbound;
    } else if (OECustomerDeliveryYard) {
      outbound = selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantOutbound;
    }
    return outbound;
  };

  const driverdistpatchFetch = () => {
    dispatch(setLoading(true));
    YardService.getAllYards(
      selectedSearchCriteria,
      searchTerms,
      pageNumberYardLookup,
      "Active",
      sortValue,
      sortFlag,
      DriverDispatch
    )
      .then((response) => {
        const { data } = response;
        dispatch(setYardsData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  //fetch pickup yard for Undispatched Listing Report
  const fetckPickupYard = () => {
    dispatch(setLoading(true));
    YardService.getPickupYards(
      selectedSearchCriteria,
      searchTerms,
      pageNumberYardLookup,
      sortValue,
      sortFlag,
      QuarterScreen_RecordsPerPage,
      "Lookup"
    )
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setYardsData(listingData));
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

  //UnitPickupExceptionReport
  const fetchYardForUnitException = () => {
    dispatch(setLoading(true));
    YardService.getPickupYardForUnitException(
      selectedSearchCriteria,
      searchTerms,
      pageNumberYardLookup,
      sortValue,
      sortFlag,
      QuarterScreen_RecordsPerPage,
      "Lookup"
    )
      .then((response) => {
        const data = response.data;
        const listingData = data?.slice(0, data?.length - 1);
        const paginationData = data?.slice(data?.length - 1);
        dispatch(setYardsData(listingData));
        dispatch(setTotalElements(paginationData?.[0].TotalElements));
        dispatch(setTotalPages(paginationData?.[0].TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  //yardInventoryReport
  const fetchYardForYardInventory = () => {
    dispatch(setLoading(true));
    YardService.getYardForYardInventory({
      searchcriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: pageNumberYardLookup,
      sortValue,
      sortFlag,
      pageSize: QuarterScreen_RecordsPerPage,
      resultType: 1,
    })
      .then((response) => {
        const data = response?.data;
        const listingData = data?.slice(0, data?.length - 1);
        const paginationData = data?.slice(data?.length - 1);
        dispatch(setYardsData(listingData));
        dispatch(setTotalElements(paginationData?.[0].TotalElements));
        dispatch(setTotalPages(paginationData?.[0].TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
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
   * Fetch Yards conditionally for Order Entry & Maintenance Programs
   */
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      // Fetch Yards for OE
      if (OrderEntry) {
        let outbound;
        if (OECustomerPickupYard) {
          outbound = pickupPlantOutbound;
        } else if (OECustomerDeliveryYard) {
          outbound = deliveryPlantOutbound;
        }
        getYardsForOrderEntry(selectedCustomerId, id, !outbound, outbound);
      }
      // Fetch Yards for Edit Master Express
      if (EditMasterExpress) {
        let outbound;
        if (OECustomerPickupYard) {
          outbound = selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantOutbound;
        } else if (OECustomerDeliveryYard) {
          outbound = selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantOutbound;
        }
        getYardsForOrderEntry(
          selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPK,
          selectedUnitData?.editMasterExpressCustomerTabDTO?.billingPlantPK,
          !outbound,
          outbound
        );
      }

      // Fetch Yards for MP
      if (MaintenanceProgram) {
        getYardsForMaintenance();
      }
      // Yards with printer
      if (EditMasterExpressShuttle) {
        getYardsWithPrinter();
      }
      // Handle normal sort for Shuttle Process
      if (shuttle) {
        getYardsForShuttleProcess();
      }
      if (EditShuttle || EditYardUnit) {
        getAllYardsForEdit();
      }
      // Fetch Yards using Optional Custom Fetch Function
      if (customFetchFunction) {
        customFetchFunction();
      }
      if (DriverDispatch) {
        driverdistpatchFetch();
      }
      if (undispatchedListing) {
        fetckPickupYard();
      }
      if (unitException) {
        fetchYardForUnitException();
      }
      if (yardInventory) {
        fetchYardForYardInventory();
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumberYardLookup, searchTerms, sortFlag, sortValue]);

  const renderYardListingData = yardsData?.map((yard) => (
    <tr
      id="rowId"
      key={renderItemId(yard)}
      onClick={(event) => {
        handleLookupSelection(yard, event);
        dispatch(setChangeColor(true));
        dispatch(setYardId(renderItemId(yard)));
        onHide();
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(yard) === yardId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {yard.description || yard.Description || yard.PickUpYardName} </td>
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
                onhandleNormalSort("description", !sortFlag);
              }}
            >
              Description
              {sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {!loading && yardsData?.length !== 0 && <tbody>{renderYardListingData}</tbody>}
      </table>
      {loading ? (
        <LoadingIcon />
      ) : (
        yardsData?.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
