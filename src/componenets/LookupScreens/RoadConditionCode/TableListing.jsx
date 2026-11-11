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
} from "../../../redux/LookupScreens/RoadConditionLookupSlice";
import DelayUnitCodesService from "../../../services/DelayUnitCodesService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const TableListing = ({ renderItemId, handleLookupSelection, MaintenanceProgram }) => {
  const dispatch = useDispatch();
  const formsData = useSelector((state) => state.roadConditionLookup.formsData);
  const changeColor = useSelector((state) => state.roadConditionLookup.changeColor);
  const loading = useSelector((state) => state.roadConditionLookup.loading);
  const pageNumber = useSelector((state) => state.roadConditionLookup.pageNumber);
  let sortFlag = useSelector((state) => state.roadConditionLookup.normalSortFlag);
  let sortValue = useSelector((state) => state.roadConditionLookup.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.roadConditionLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.roadConditionLookup.searchTerms);
  const id = useSelector((state) => state.roadConditionLookup.id);

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
            <th className="f-w-600">
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
