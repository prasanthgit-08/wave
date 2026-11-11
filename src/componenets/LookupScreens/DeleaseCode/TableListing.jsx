import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleaseCodeService from "../../../services/DeleaseCodeService";
import {
  setChangeColor,
  setDeleaseCodeData,
  setLoading,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedId,
  setTotalElements,
  setTotalPages,
} from "../../../redux/LookupScreens/DeleaseCodeLookupSlice";
import useDebouncer from "../../../hooks/useDebouncer";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  assignedIrp,
}) => {
  const pageNumber = useSelector((state) => state.deleaseCodeLookup.pageNumber);
  const deleaseCodeData = useSelector((state) => state.deleaseCodeLookup.deleaseCodeData);
  let sortFlag = useSelector((state) => state.deleaseCodeLookup.normalSortFlag);
  let sortValue = useSelector((state) => state.deleaseCodeLookup.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.deleaseCodeLookup.selectedSearchCriteria);
  const searchTerm = useSelector((state) => state.deleaseCodeLookup.searchTerm);
  const selectedId = useSelector((state) => state.deleaseCodeLookup.selectedId);
  const loading = useSelector((state) => state.deleaseCodeLookup.loading);
  const changeColor = useSelector((state) => state.deleaseCodeLookup.changeColor);
  const dispatch = useDispatch();
  const FetchDeleaseCodeForMaintenance = () => {
    dispatch(setLoading(true));
    DeleaseCodeService.getDeleaseCodeForLookup(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        dispatch(setDeleaseCodeData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {})
      .finally(() => dispatch(setLoading(false)));
  };

  const onHandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;
  };
  const debounceFetchDeleaseCodeForMaintenance = useDebouncer(FetchDeleaseCodeForMaintenance, 500);
  useEffect(() => {
    if (MaintenanceProgram) {
      dispatch(setLoading(true));
      debounceFetchDeleaseCodeForMaintenance();
    }
  }, [selectedSearchCriteria, pageNumber, searchTerm, sortValue, sortFlag]);

  const renderDeleaseCodeListingData = deleaseCodeData.map((deleaseCode) => (
    <tr
      id="rowId"
      key={renderItemId(deleaseCode)}
      onClick={(event) => {
        handleLookupSelection(deleaseCode, event);
        dispatch(setChangeColor(true));
        dispatch(setSelectedId(renderItemId(deleaseCode)));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(deleaseCode) === selectedId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {deleaseCode.deleaseCode} </td>
      <td className="f-w-600"> {deleaseCode.description} </td>
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
                onHandleNormalSort("deleaseCode", !sortFlag);
              }}
            >
              Code
              {sortFlag && sortValue === "deleaseCode" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "deleaseCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onHandleNormalSort("description", !sortFlag);
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
        {!loading && deleaseCodeData.length !== 0 && <tbody>{renderDeleaseCodeListingData}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        deleaseCodeData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
