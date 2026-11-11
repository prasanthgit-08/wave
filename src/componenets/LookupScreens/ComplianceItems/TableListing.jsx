/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setComplianceId,
  setTotalElements,
  setTotalPages,
  setComplianceData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setLoading,
} from "../../../redux/LookupScreens/ComplianceItemsLookupSlice";
import BlockedLogReportService from "../../../services/Reports/BlockedLogReportService";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  orderEntry,
  MaintenanceProgram,
  customFetchFunction,
  blockedLogReport,
}) => {
  // -----------------------------------------------------------------------
  const complianceData = useSelector((state) => state.complianceItemsLookupReducer.complianceData);
  const changeColor = useSelector((state) => state.complianceItemsLookupReducer.changeColor);
  const loading = useSelector((state) => state.complianceItemsLookupReducer.loading);
  const pageNumber = useSelector((state) => state.complianceItemsLookupReducer.pageNumber);
  let sortFlag = useSelector((state) => state.complianceItemsLookupReducer.normalSortFlag);
  let sortValue = useSelector((state) => state.complianceItemsLookupReducer.normalSortValue);
  const selectedSearchCriteria = useSelector(
    (state) => state.complianceItemsLookupReducer.selectedSearchCriteria
  );
  const searchTerms = useSelector((state) => state.complianceItemsLookupReducer.searchTerms);
  const complianceId = useSelector((state) => state.complianceItemsLookupReducer.complianceId);

  const dispatch = useDispatch();

  const FetchComplianceItems = () => {
    BlockedLogReportService.fetchComplianceBlockedLogLookup(
      searchTerms,
      selectedSearchCriteria,
      pageNumber,
      sortFlag,
      sortValue
    )
      .then((response) => {
        const data = response.data;
        const complianceItems = data.filter((item) => item.Type !== "Pagination");
        const paginationInfo = data.find((item) => item.Type === "Pagination");

        const formList = complianceItems.map((forms) => ({
          ...forms,
          Description: forms.Description?.trim(),
        }));
        dispatch(setComplianceData(formList));
        dispatch(setTotalElements(paginationInfo?.TotalElements || 0));
        dispatch(setTotalPages(paginationInfo?.TotalPages || 0));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        console.error(err);
        dispatch(setLoading(false));
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;
  };

  const handleRowClick = (form, event) => {
    handleLookupSelection(form, event);
    dispatch(setComplianceId(renderItemId(form)));
    dispatch(setChangeColor(true));
  };

  useEffect(() => {
    if (blockedLogReport) {
      dispatch(setLoading(true));
    }
    const debounceFunction = setTimeout(() => {
      if (customFetchFunction) {
        customFetchFunction();
      }
      if (blockedLogReport) {
        FetchComplianceItems();
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumber, searchTerms, sortFlag]);

  const renderStateListing = complianceData.map((data) => (
    <tr
      id="rowId"
      key={renderItemId(data)}
      onClick={(event) => handleRowClick(data, event)}
      onDoubleClick={(event) => handleRowClick(data, event)}
      className={renderItemId(data) === complianceId && changeColor ? "tableSelected" : ""}
    >
      <td className="f-w-600"> {data.Description} </td>
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
        {!loading && complianceData.length !== 0 && <tbody>{renderStateListing}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        complianceData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
