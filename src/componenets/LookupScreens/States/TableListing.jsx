/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setStateId,
  setTotalElements,
  setTotalPages,
  setStateData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setLoading,
} from "../../../redux/LookupScreens/StateLookupSlice";
import OrderEntryService from "../../../services/OrderEntryService";
import ShuttleCitysService from "../../../services/ShuttleCitysService";
import StateService from "../../../services/StateService";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  OrderEntry,
  MaintenanceProgram,
  customFetchFunction,
  OECustomerPickupCity,
  OECustomerDeliveryCity,
}) => {
  // -----------------------------------------------------------------------
  const stateData = useSelector((state) => state.stateReducer.stateData);
  const changeColor = useSelector((state) => state.stateReducer.changeColor);
  const loading = useSelector((state) => state.stateReducer.loading);
  const pageNumber = useSelector((state) => state.stateReducer.pageNumber);
  const sortFlag = useSelector((state) => state.stateReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.stateReducer.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.stateReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.stateReducer.searchTerms);
  const stateId = useSelector((state) => state.stateReducer.stateId);

  const dispatch = useDispatch();

  const fetchStatesForMaintenance = () => {
    StateService.getStatesForLookup(selectedSearchCriteria, searchTerms, pageNumber, sortValue, sortFlag)
      .then((response) => {
        const data = response.data;
        const stateList = data.content?.map((state) => ({
          ...state,
          stateName: state.stateName?.trim(),
        }));
        dispatch(setStateData(stateList));
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
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      if (MaintenanceProgram) {
        fetchStatesForMaintenance();
      }
      if (customFetchFunction) {
        customFetchFunction();
      }
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumber, searchTerms, sortValue, sortFlag]);

  const renderStateListing = stateData.map((state) => (
    <tr
      id="rowId"
      key={renderItemId(state)}
      onClick={(event) => {
        handleLookupSelection(state, event);
        dispatch(setStateId(renderItemId(state)));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(state) === stateId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {state.stateCode} </td>
      <td className="f-w-600"> {state.stateName} </td>
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
                onhandleNormalSort("stateCode", !sortFlag);
              }}
            >
              State
              {sortFlag && sortValue === "stateCode" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "stateCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("stateName", !sortFlag);
              }}
            >
              Abbreviation
              {sortFlag && sortValue === "stateName" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "stateName" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {!loading && stateData.length !== 0 && <tbody>{renderStateListing}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        stateData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
