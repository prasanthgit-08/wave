/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPortOfEntryData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setTotalElements,
  setTotalPages,
  setSelectedId,
  setLoading,
} from "../../../redux/LookupScreens/PortOfEntryLookupSlice";
import OrderEntryService from "../../../services/OrderEntryService";
import PortsOfEntryService from "../../../services/PortsOfEntryService";
import CustomerDealersService from "../../../services/CustomerDealersService";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  brokerType,
  MaintenanceProgram,
  customFetchFunction,
}) => {
  // ------------------------------------------------------------------------
  const [portOfEntryListingData, setPortOfEntryListingData] = useState([]);
  const [city, setCity] = useState("");

  const portOfEntryData = useSelector((state) => state.portOfEntryLookup.portOfEntryData);
  const changeColor = useSelector((state) => state.portOfEntryLookup.changeColor);
  const loading = useSelector((state) => state.portOfEntryLookup.loading);
  const pageNumberPortOfEntryLookup = useSelector(
    (state) => state.portOfEntryLookup.pageNumberPortOfEntryLookup
  );
  let sortFlag = useSelector((state) => state.portOfEntryLookup.normalSortFlag);
  let sortValue = useSelector((state) => state.portOfEntryLookup.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.portOfEntryLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.portOfEntryLookup.searchTerms);
  const selectedId = useSelector((state) => state.portOfEntryLookup.selectedId);
  const brokerTypeforOrderEntry = useSelector((state) => state.orderEntryReducer.brokerType);

  const dispatch = useDispatch();

  const getPortOfEntryDetails = () => {
    if (MaintenanceProgram) {
      getPOEMaintennace();
    } else if (customFetchFunction) {
      customFetchFunction();
    } else {
      // Default Case - Order Entry
      OrderEntryService.getPortOfEntryDetails(
        pageNumberPortOfEntryLookup,
        selectedSearchCriteria,
        searchTerms,
        sortValue,
        sortFlag,
        brokerTypeforOrderEntry
      )
        .then((response) => {
          const data = response.data;
          dispatch(setPortOfEntryData(data.content));
          dispatch(setTotalElements(data.totalElements));
          dispatch(setTotalPages(data.totalPages));
          dispatch(setLoading(false));
        })
        .catch((err) => {
          dispatch(setLoading(false));
        });
    }
  };

  const getPOEMaintennace = () => {
    PortsOfEntryService.getPOEforLookup(
      pageNumberPortOfEntryLookup,
      selectedSearchCriteria,
      searchTerms,
      sortValue,
      sortFlag,
      brokerType
    )
      .then((response) => {
        const data = response.data;
        const trimmedList = data.content?.map((port) => ({ ...port, usCity: port.usCity?.trim() }));
        dispatch(setPortOfEntryData(trimmedList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;
    getPortOfEntryDetails();
  };

  useEffect(() => {
    if (portOfEntryData != null) {
      setPortOfEntryListingData(portOfEntryData);
    }
  }, [portOfEntryData, sortFlag, sortValue]);

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      getPortOfEntryDetails();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumberPortOfEntryLookup, searchTerms]);

  useEffect(() => {
    if (brokerType === "export") {
      setCity("usCity");
    } else if (brokerType === "import") {
      setCity("usCity");
    } else if (MaintenanceProgram) {
      setCity("usCity");
    } else if (customFetchFunction) {
      setCity("usCity");
    }
  }, [brokerType]);

  const renderPortOfEntryLisitng = portOfEntryListingData?.map((port) => (
    <tr
      id="rowId"
      key={renderItemId(port)}
      onClick={(event) => {
        handleLookupSelection(port, event);
        dispatch(setChangeColor(true));
        dispatch(setSelectedId(renderItemId(port)));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(port) === selectedId && changeColor ? "tableSelected" : " "}
    >
      {city === "canadianCity" ? (
        <td className="f-w-600"> {port.canadianCity} </td>
      ) : (
        <td className="f-w-600"> {port.usCity} </td>
      )}
      <td className="f-w-600"> {port.stateCode} </td>
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
                onhandleNormalSort(city, !sortFlag);
              }}
            >
              City
              {sortFlag && sortValue === city && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === city && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("stateCode", !sortFlag);
              }}
            >
              State Code
              {sortFlag && sortValue === "stateCode" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "stateCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {!loading && portOfEntryListingData.length !== 0 && <tbody>{renderPortOfEntryLisitng}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        portOfEntryListingData.length === 0 && (
          <div className="noRecordsSmallerFont">No Records Available</div>
        )
      )}
    </div>
  );
};

export default TableListing;
