/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setShuttleCityId,
  setTotalElements,
  setTotalPages,
  setShuttleCityData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setLoading,
} from "../../../redux/LookupScreens/ShuttleCityLookupSlice";
import OrderEntryService from "../../../services/OrderEntryService";
import YardCheckinService from "../../../services/shuttle/process/YardCheckinService";
import ShuttleCitysService from "../../../services/ShuttleCitysService";
import EditShuttleService from "../../../services/shuttle/process/EditShuttleService";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  OrderEntry,
  MaintenanceProgram,
  customFetchFunction,
  OECustomerPickupCity,
  OECustomerDeliveryCity,
  shuttle,
  EditShuttle,
  selectedCompanyName,
  EditMasterExpress,
  outbound,
  isCustomerPlantMaintenance,
}) => {
  // -----------------------------------------------------------------------
  const shuttleCityData = useSelector((state) => state.shuttleCityLookupReducer.shuttleCityData);
  const changeColor = useSelector((state) => state.shuttleCityLookupReducer.changeColor);
  const loading = useSelector((state) => state.shuttleCityLookupReducer.loading);
  const pageNumberShuttleCityLookup = useSelector(
    (state) => state.shuttleCityLookupReducer.pageNumberShuttleCityLookup
  );
  const sortFlag = useSelector((state) => state.shuttleCityLookupReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.shuttleCityLookupReducer.normalSortValue);
  const selectedSearchCriteria = useSelector(
    (state) => state.shuttleCityLookupReducer.selectedSearchCriteria
  );
  const searchTerms = useSelector((state) => state.shuttleCityLookupReducer.searchTerms);
  const shuttleCityId = useSelector((state) => state.shuttleCityLookupReducer.shuttleCityId);

  const pickupPlantOutbound = useSelector((state) => state.orderEntryReducer.pickupPlantOutbound);
  const deliveryPlantOutbound = useSelector((state) => state.orderEntryReducer.deliveryPlantOutbound);
  const selectedCustomerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);
  const id = useSelector((state) => state.orderEntryReducer.selectedCustomerBillingPlantId);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);

  const dispatch = useDispatch();

  const fetchShuttleCitysForOrderEntry = (selectedCustomerId, id, reload, outbound) => {
    dispatch(setLoading(true));
    OrderEntryService.fetchShuttleCityDetials(
      pageNumberShuttleCityLookup,
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
        const data = response.data;
        const shuttleCity = data.content?.map((city) => ({ ...city, city: city.city?.trim() }));
        dispatch(setShuttleCityData(shuttleCity));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const fetchShuttleCitysForMaintenance = () => {
    dispatch(setLoading(true));
    ShuttleCitysService.getShuttleCitysForLookup(
      selectedSearchCriteria,
      searchTerms,
      pageNumberShuttleCityLookup,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        const shuttleCity = data.content?.map((city) => ({ ...city, city: city.city?.trim() }));
        dispatch(setShuttleCityData(shuttleCity));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  // Fetch Shuttle City by selected company - Shuttle Process
  const fetchShuttleCitysForShuttleProcess = () => {
    dispatch(setLoading(true));
    YardCheckinService.getShuttleCitysForLookup(
      selectedSearchCriteria,
      searchTerms,
      pageNumberShuttleCityLookup,
      sortValue,
      sortFlag,
      selectedCompanyName
    )
      .then((response) => {
        const data = response.data;
        dispatch(setShuttleCityData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const fetchShuttleCitysForEditShuttle = () => {
    dispatch(setLoading(true));
    EditShuttleService.getShuttleCitysForLookup(
      selectedSearchCriteria,
      searchTerms,
      pageNumberShuttleCityLookup,
      sortValue,
      sortFlag,
      selectedCompanyName
    )
      .then((response) => {
        const data = response.data;
        const shuttleCity = data.content?.map((city) => ({ ...city, city: city.city?.trim() }));
        dispatch(setShuttleCityData(shuttleCity));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const fetchShuttleCitysForCustomerPlantMaintenance = () => {
    dispatch(setLoading(true));
    ShuttleCitysService.getShuttleCitysForLookupForPlantMaintenance(
      selectedSearchCriteria,
      searchTerms,
      pageNumberShuttleCityLookup,
      sortValue,
      sortFlag,
      outbound
    )
      .then((response) => {
        const data = response.data;
        const shuttleCity = data.content?.map((city) => ({ ...city, city: city.city?.trim() }));
        dispatch(setShuttleCityData(shuttleCity));
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
    if (OECustomerPickupCity) {
      outbound = pickupPlantOutbound;
    } else if (OECustomerDeliveryCity) {
      outbound = deliveryPlantOutbound;
    }
    return outbound;
  };

  const returnOutboundForEditMasterExpress = () => {
    let outbound;
    if (OECustomerPickupCity) {
      outbound = selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantOutbound;
    } else if (OECustomerDeliveryCity) {
      outbound = selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantOutbound;
    }
    return outbound;
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  /**
   * Fetch Shuttle Cities conditionally for Order Entry & Maintenance Programs
   */
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      // Fetch Shuttle Cities for OE
      if (OrderEntry) {
        let outbound;
        if (OECustomerPickupCity) {
          outbound = pickupPlantOutbound;
        } else if (OECustomerDeliveryCity) {
          outbound = deliveryPlantOutbound;
        }
        fetchShuttleCitysForOrderEntry(selectedCustomerId, id, !outbound, outbound);
      }
      // Fetch Shuttle Cities for Edit Master Express
      if (EditMasterExpress) {
        let outbound;
        if (OECustomerPickupCity) {
          outbound = selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantOutbound;
        } else if (OECustomerDeliveryCity) {
          outbound = selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantOutbound;
        }
        fetchShuttleCitysForOrderEntry(
          selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPK,
          selectedUnitData?.editMasterExpressCustomerTabDTO?.billingPlantPK,
          !outbound,
          outbound
        );
      }
      // Fetch Shuttle Cities for MP
      if (MaintenanceProgram) {
        fetchShuttleCitysForMaintenance();
      }
      // Fetch Shuttle City by selected company - Shuttle Process
      if (shuttle) {
        fetchShuttleCitysForShuttleProcess();
      }
      if (EditShuttle) {
        fetchShuttleCitysForEditShuttle();
      }
      if (isCustomerPlantMaintenance) {
        fetchShuttleCitysForCustomerPlantMaintenance();
      }
      // Fetch Shuttle Cities using Custom Fetch Function
      if (customFetchFunction) {
        customFetchFunction();
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumberShuttleCityLookup, searchTerms, sortValue, sortFlag]);

  const renderShuttleCityListing = shuttleCityData?.map((shuttleCity) => (
    <tr
      id="rowId"
      key={renderItemId(shuttleCity)}
      onClick={(event) => {
        handleLookupSelection(shuttleCity, event);
        dispatch(setShuttleCityId(renderItemId(shuttleCity)));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(shuttleCity) === shuttleCityId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {shuttleCity.city} </td>
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
                onhandleNormalSort("city", !sortFlag);
              }}
            >
              City
              {sortFlag && sortValue === "city" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "city" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>
        {!loading && shuttleCityData.length !== 0 && <tbody>{renderShuttleCityListing}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        shuttleCityData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
