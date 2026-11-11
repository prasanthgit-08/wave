/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderEntryService from "../../../services/OrderEntryService";
import { setTotalElements, setTotalPages } from "../../../redux/LookupScreens/YardLookupSlice";
import {
  setYardsData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
} from "../../../redux/LookupScreens/YardLookupSlice";

const TableListing = ({ onHide, OEUnitTab }) => {
  // --------------------------------------------------------------------------
  const yardsData = useSelector((state) => state.yardLookupReducer.yardsData);
  const changeColor = useSelector((state) => state.yardLookupReducer.changeColor);
  const loading = useSelector((state) => state.yardLookupReducer.loading);
  const pageNumberYardLookup = useSelector((state) => state.yardLookupReducer.pageNumberYardLookup);
  const [yardsListingData, setYardsListingData] = useState([]);
  let sortFlag = useSelector((state) => state.yardLookupReducer.normalSortFlag);
  let sortValue = useSelector((state) => state.yardLookupReducer.normalSortValue);
  const reload = useSelector((state) => state.orderEntryReducer.reload);
  const selectedCustomerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);
  const id = useSelector((state) => state.orderEntryReducer.selectedCustomerBillingPlantId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (yardsData != null) {
      setYardsListingData(yardsData);
    }
  }, [yardsData, sortFlag, sortValue]);

  const selectedSearchCriteria = useSelector((state) => state.yardLookupReducer.selectedSearchCriteria);

  const searchTerms = useSelector((state) => state.yardLookupReducer.searchTerms);
  const pickupYardId = useSelector((state) => state.yardLookupReducer.pickupYardId);

  const [outbound, setOutbound] = useState(false);

  useEffect(() => {
    if (!reload) {
      setOutbound(true);
    }
  }, [reload]);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;
    getYardsdetails(selectedCustomerId, id, reload, outbound);
  };

  const getYardsdetails = (selectedCustomerId, id, reload, outbound) => {
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
    ).then((response) => {
      const data = response.data;
      dispatch(setYardsData(data.content));
      dispatch(setTotalElements(data.totalElements));
      dispatch(setTotalPages(data.totalPages));
      dispatch(setChangeColor(true));
    });
  };

  const handleOEUnitTab = (yard, event) => {
    dispatch(setChangeColor(true));
    onHide();
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      getYardsdetails(selectedCustomerId, id, reload, outbound);
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumberYardLookup, searchTerms]);

  const renderUnitMultiLoadListing = yardsListingData.map((yard) => (
    <tr
      id="rowId"
      key={yard.yardPK}
      onClick={(event) => {
        // dispatch(setChangeColor(false));
        /**
         * Calling different handler functions based on where the Lookup Screen is called from
         */
        if (OEUnitTab) {
          handleOEUnitTab(yard, event);
        }
        // TODO: add common functionalities here
        // *************************************
      }}
      onDoubleClick={(event) => {}}
      className={yard.yardPK === pickupYardId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {yard.name} </td>
      <td className="f-w-600"> {yard.name} </td>
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
              Column 1
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
                onhandleNormalSort("description", !sortFlag);
              }}
            >
              Column 2
              {sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {!loading && yardsListingData.length !== 0 && <tbody>{renderUnitMultiLoadListing}</tbody>}
      </table>
      {loading ? (
        <p className="loadingStyling">LOADING...</p>
      ) : (
        yardsListingData.length === 0 && <p className="noRecordsSmallerFont">No Records Available</p>
      )}
    </div>
  );
};

export default TableListing;
