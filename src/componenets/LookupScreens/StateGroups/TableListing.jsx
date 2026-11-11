/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import StateService from "../../../services/StateService";

import {
  setStateGroupsData,
  setTotalElements,
  setTotalPages,
  setLoading,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
} from "../../../redux/LookupScreens/StateGroupsLookupSlice";
import StateGroupsService from "../../../services/StateGroupsService";
import { setStateGroupsId } from "../../../redux/SupplementalRatesSlice";

const TableListing = ({ renderItemId, handleLookupSelection, MaintenanceProgram }) => {
  // -----------------------------------------------------------------------
  const stateGroupsData = useSelector((state) => state.stateGroupsReducer.stateGroupsData);
  const changeColor = useSelector((state) => state.stateGroupsReducer.changeColor);
  const loading = useSelector((state) => state.stateGroupsReducer.loading);
  const pageNumber = useSelector((state) => state.stateGroupsReducer.pageNumber);
  let sortFlag = useSelector((state) => state.stateGroupsReducer.normalSortFlag);
  let sortValue = useSelector((state) => state.stateGroupsReducer.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.stateGroupsReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.stateGroupsReducer.searchTerms);
  const stateGroupsId = useSelector((state) => state.stateGroupsReducer.stateGroupsId);

  const dispatch = useDispatch();

  const FetchstateGroupsForMaintenance = () => {
    StateGroupsService.getStateGroupForLookup(
      selectedSearchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        const stateGroupList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));
        dispatch(setStateGroupsData(stateGroupList));
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
    // Hanle Optional Custom Fetch Function
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      if (MaintenanceProgram) {
        FetchstateGroupsForMaintenance();
      }
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumber, searchTerms, sortValue, sortFlag]);

  const renderStateListing = stateGroupsData.map((data) => (
    <tr
      id="rowId"
      key={renderItemId(data)}
      onClick={(event) => {
        handleLookupSelection(data, event);
        dispatch(setStateGroupsId(renderItemId(data)));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(data) === stateGroupsId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {data.description} </td>
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
        {!loading && stateGroupsData.length !== 0 && <tbody>{renderStateListing}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        stateGroupsData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
