import React, { useEffect } from "react";
import {
  setFormsData,
  setTotalElements,
  setTotalPages,
  setLoading,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setId,
} from "../../../redux/LookupScreens/RoadTypeCodeLookupSlice";
import Damage from "../../../services/DelayUnitCodesService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
//import DelayProcessingService from "../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";

const TableListing = ({ renderItemId, handleLookupSelection, MaintenanceProgram }) => {
  const dispatch = useDispatch();
  const formsData = useSelector((state) => state.roadTypeLookup.formsData);
  const changeColor = useSelector((state) => state.roadTypeLookup.changeColor);
  const loading = useSelector((state) => state.roadTypeLookup.loading);
  const pageNumber = useSelector((state) => state.roadTypeLookup.pageNumber);
  let sortFlag = useSelector((state) => state.roadTypeLookup.normalSortFlag);
  let sortValue = useSelector((state) => state.roadTypeLookup.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.roadTypeLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.roadTypeLookup.searchTerms);
  const id = useSelector((state) => state.roadTypeLookup.id);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;
  };

  const renderStateListing = formsData.map((form) => (
    <tr
      id="rowId"
      key={renderItemId(form)}
      onClick={(event) => {
        handleLookupSelection(form, event);
        dispatch(setId(renderItemId(form)));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(form) === id && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {form.description} </td>
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
        {!loading && formsData.length !== 0 && <tbody>{renderStateListing}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        formsData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
