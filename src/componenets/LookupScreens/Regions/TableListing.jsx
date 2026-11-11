/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setRegionsData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setTotalElements,
  setTotalPages,
  setRegionsId,
  setLoading,
} from "../../../redux/LookupScreens/RegionsLookupSlice";
import CustomerService from "../../../services/CustomerService";
import RegionsService from "../../../services/RegionsService";
import LoadingIcon from "../../common/LoadingIcon";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  UndispatchedListing,
}) => {
  // -----------------------------------------------------------
  const regionsData = useSelector((state) => state.regionsReducer.regionsData);
  const changeColor = useSelector((state) => state.regionsReducer.changeColor);
  const loading = useSelector((state) => state.regionsReducer.loading);
  const pageNumberRegionsLookup = useSelector((state) => state.regionsReducer.pageNumberRegionsLookup);
  const sortFlag = useSelector((state) => state.regionsReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.regionsReducer.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.regionsReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.regionsReducer.searchTerms);
  const regionsId = useSelector((state) => state.regionsReducer.regionsId);

  const dispatch = useDispatch();

  const getAllRegions = () => {
    dispatch(setLoading(true));
    RegionsService.getRegions(
      pageNumberRegionsLookup,
      searchTerms,
      selectedSearchCriteria,
      sortValue,
      sortFlag,
      12
    )
      .then((response) => {
        const { data } = response;
        dispatch(setRegionsData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const getRegionForUndispatchedListing = () => {
    dispatch(setLoading(true));
    RegionsService.fetchRegionForUndispatchedListing(
      pageNumberRegionsLookup,
      searchTerms,
      selectedSearchCriteria,
      sortValue,
      sortFlag,
      12,
      "Lookup"
    )
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setRegionsData(listingData));
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

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  /**
   * Fetch Unit Type Groups conditionally
   */
  useEffect(() => {
    dispatch(setLoading(true));

    const debounceFunction = setTimeout(() => {
      // Fetch Unit Type Groups for MP
      if (MaintenanceProgram) {
        getAllRegions();
      }
      // Fetch Unit Type Groups using Optional Custom Fetch Function
      if (customFetchFunction) {
        customFetchFunction();
      }
      if (UndispatchedListing) {
        getRegionForUndispatchedListing();
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumberRegionsLookup, searchTerms, sortFlag, sortValue]);

  const renderRegionsListingData = regionsData.map((regions) => (
    <tr
      id="rowId"
      key={renderItemId(regions)}
      onClick={(event) => {
        handleLookupSelection(regions, event);
        dispatch(setChangeColor(true));
        dispatch(setRegionsId(renderItemId(regions)));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(regions) === regionsId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {regions.regionCode || regions.RegionCode} </td>
      <td className="f-w-600"> {regions.description || regions.Description} </td>
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
                onhandleNormalSort("regionCode", !sortFlag);
              }}
            >
              Region Code
              {sortFlag && sortValue === "regionCode" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "regionCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
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
        {!loading && regionsData.length !== 0 && <tbody>{renderRegionsListingData}</tbody>}
      </table>
      {loading ? (
        <LoadingIcon />
      ) : (
        regionsData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
