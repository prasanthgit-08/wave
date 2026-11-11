/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setBrokerData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setBrokerLookupId,
  setLoading,
  setTotalElements,
  setTotalPages,
} from "../../../redux/LookupScreens/BrokerLookupSlice";
import ImportBrokersService from "../../../services/ImportBrokersService";
import OrderEntryService from "../../../services/OrderEntryService";
import ExportBrokersService from "../../../services/ExportBrokersService";
import LoadingIcon from "../../common/LoadingIcon";

const TableListing = ({
  brokerType,
  renderItemId,
  handleLookupSelection,
  OrderEntry,
  MaintenanceProgram,
  customFetchFunction,
}) => {
  // --------------------------------------------------------------
  const brokerData = useSelector((state) => state.brokerLookup.brokerData);
  const changeColor = useSelector((state) => state.brokerLookup.changeColor);
  const loading = useSelector((state) => state.brokerLookup.loading);
  const pageNumberBrokerLookup = useSelector((state) => state.brokerLookup.pageNumberBrokerLookup);
  const sortFlag = useSelector((state) => state.brokerLookup.normalSortFlag);
  const sortValue = useSelector((state) => state.brokerLookup.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.brokerLookup.selectedSearchCriteria);
  const brokerId = useSelector((state) => state.brokerLookup.brokerId);
  const searchTerms = useSelector((state) => state.brokerLookup.searchTerms);
  const brokerTypeOE = useSelector((state) => state.orderEntryReducer.brokerType);

  const dispatch = useDispatch();

  const getBrokersForOrderEntry = () => {
    dispatch(setLoading(true));
    OrderEntryService.fetchBrokerDetails(
      pageNumberBrokerLookup,
      selectedSearchCriteria,
      searchTerms,
      sortValue,
      sortFlag,
      brokerType || brokerTypeOE
    )
      .then((response) => {
        const data = response.data;
        const trimmedList = data.content?.map((broker) => ({ ...broker, name: broker.name?.trim() }));
        dispatch(setBrokerData(trimmedList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setChangeColor(true));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const getBrokersForMaintenance = () => {
    if (brokerType === "import") {
      // API call for importBroker
      dispatch(setLoading(true));
      ImportBrokersService.fetchBrokerDetails(
        pageNumberBrokerLookup,
        selectedSearchCriteria,
        searchTerms,
        sortValue,
        sortFlag
      )
        .then((response) => {
          const data = response.data;
          dispatch(setBrokerData(data.content));
          dispatch(setTotalElements(data.totalElements));
          dispatch(setTotalPages(data.totalPages));
          dispatch(setChangeColor(true));
          dispatch(setLoading(false));
        })
        .catch((err) => {
          dispatch(setLoading(false));
        });
    } else if (brokerType === "export") {
      // API call for exportBroker
      dispatch(setLoading(true));
      ExportBrokersService.fetchBrokerDetails(
        pageNumberBrokerLookup,
        selectedSearchCriteria,
        searchTerms,
        sortValue,
        sortFlag
      )
        .then((response) => {
          const data = response.data;
          dispatch(setBrokerData(data.content));
          dispatch(setTotalElements(data.totalElements));
          dispatch(setTotalPages(data.totalPages));
          dispatch(setChangeColor(true));
          dispatch(setLoading(false));
        })
        .catch((err) => {
          dispatch(setLoading(false));
        });
    }
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  /**
   * Fetch Brokers conditionally for Order Entry & Maintenance Programs
   */
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      // Fetch Brokers for Order Entry
      if (OrderEntry) {
        getBrokersForOrderEntry();
      }
      // Fetch Brokers for Maintenance Programs
      if (MaintenanceProgram) {
        getBrokersForMaintenance();
      }
      // Optional Custom Fetch Function
      if (customFetchFunction) {
        customFetchFunction();
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumberBrokerLookup, searchTerms, sortValue, sortFlag]);

  const renderBrokerListingData = brokerData?.map((broker) => (
    <tr
      id="rowId"
      key={renderItemId(broker)}
      onClick={(event) => {
        handleLookupSelection(broker);
        dispatch(setBrokerLookupId(renderItemId(broker)));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(broker) === brokerId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {broker.description} </td>
      <td className="f-w-600"> {broker.name} </td>
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
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("name", !sortFlag);
              }}
            >
              Name
              {sortFlag && sortValue === "name" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "name" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>

        {!loading && brokerData.length !== 0 && <tbody>{renderBrokerListingData}</tbody>}
      </table>
      {loading ? (
        <LoadingIcon />
      ) : (
        brokerData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
