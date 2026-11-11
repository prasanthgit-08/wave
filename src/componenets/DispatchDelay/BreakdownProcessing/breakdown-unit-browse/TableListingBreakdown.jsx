import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { t } from "i18next";
import BreakdownProcessingService from "../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import {
  setDamageData,
  setChangeColor,
  setId,
  setNormalSortFlag,
  setNormalSortValue,
  setTotalElements,
  setTotalPages,
  setBreakdownData,
  setViewOnly,
  setBreakdownBrowseData,
  setEditTabData,
  setBreakdownbrowseClicked,
  setDocumentsData,
  setDocumentTotalElements,
  setDocuemntTotalPages,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import { formatDate } from "../../../../utils/dateUtils";
import LoadingText from "../../../common/LoadingText";
import useDebouncer from "../../../../hooks/useDebouncer";

const TableListingBreakdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companyName, driverfk, unitfk, delayedUnitPK } = useParams();
  const [loader, setLoader] = useState(true);

  // Redux selectors
  const pageNumber = useSelector((state) => state.delaybreakdown.pageNumber);
  const searchTerm = useSelector((state) => state.delaybreakdown.searchTerm);
  const searchCriteria = useSelector((state) => state.delaybreakdown.searchCriteria);
  const breakdownData = useSelector((state) => state.delaybreakdown.breakdownBrowseData);
  const normalSortValue = useSelector((state) => state.delaybreakdown.normalSortValue);
  const normalSortFlag = useSelector((state) => state.delaybreakdown.normalSortFlag);
  const changeColor = useSelector((state) => state.delaybreakdown.changeColor);
  const editTabData = useSelector((state) => state.delaybreakdown.editTabData);
  const id = useSelector((state) => state.delaybreakdown.id);

  const handleDoubleClick = (value) => {
    dispatch(setId(value));
    dispatch(setChangeColor(true));
    navigate(`/breakdown-processing/view-breakdown/${value}`);
    localStorage.setItem("breakdownCompanyName", companyName);
    localStorage.setItem("breakdownDriverFK", driverfk);
    localStorage.setItem("breakdownUnitFK", unitfk);
    localStorage.setItem("delayedUnitFK", delayedUnitPK);
    getBreakdownInfo(value);
    dispatch(setBreakdownbrowseClicked(true));
    dispatch(setDocumentsData([]));
    dispatch(setDocumentTotalElements(0));
    dispatch(setDocuemntTotalPages(0));
  };

  const getBreakdownInfo = (breakdownId) => {
    //getBreakdownInfo
    const payload = {
      company: companyName,
      breakdownPk: breakdownId,
    };
    BreakdownProcessingService.getBreakdownInfo(payload)
      .then((response) => {
        if (response && response?.data) {
          const breakdownDetails = response?.data?.breakdownDetails;
          dispatch(setEditTabData(breakdownDetails[0]));
        }
      })
      .catch((err) => {
        console.error("Error fetching breakdown data:", err);
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  const fetchTableData = () => {
    const payload = {
      pageNumber,
      pageSize: 12,
      sortValue: normalSortValue || "",
      sortType: normalSortFlag,
      searchCriteria,
      searchTerm,
      delayedUnitFk: delayedUnitPK,
      company: companyName,
    };

    BreakdownProcessingService.getBreakdownBrowseDetails(payload)
      .then((response) => {
        if (response && response?.data) {
          const breakdownDetails = response?.data?.breakdownDetails?.filter(
            (item) => "DelayedUnitBreakdownPK" in item
          );
          const paginationData = response?.data?.pagination?.find((item) => "TotalElements" in item);
          setLoader(false);
          const uniqueBreakdownDetails = breakdownDetails?.filter(
            (record, index, self) =>
              index ===
              self?.findIndex(
                (r) =>
                  r.DelayedUnitBreakdownPK === record.DelayedUnitBreakdownPK &&
                  r.AddDate === record.AddDate &&
                  r.Description?.trim() === record.Description?.trim()
              )
          );
          dispatch(setBreakdownBrowseData(uniqueBreakdownDetails));
          dispatch(setViewOnly(true));

          if (paginationData) {
            dispatch(setTotalElements(paginationData.TotalElements));
            dispatch(setTotalPages(paginationData.TotalPages));
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching damage data:", err);
        setLoader(false);
      });
  };

  const debounceFetchTableData = useDebouncer(fetchTableData, 500);
  useEffect(() => {
    debounceFetchTableData();
  }, [searchCriteria, searchTerm, pageNumber, normalSortValue, normalSortFlag]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr>
            <th onClick={() => onhandleNormalSort("Adddate", !normalSortFlag)} className="f-w-600 col-3">
              Date
              {normalSortFlag && normalSortValue === "Adddate" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "Adddate" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th onClick={() => onhandleNormalSort("Description", !normalSortFlag)} className="f-w-600 col-3">
              Breakdown Code
              {normalSortFlag && normalSortValue === "Description" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "Description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {loader
            ? null
            : breakdownData?.length > 0 &&
              breakdownData?.map((record) => (
                <tr
                  key={record.DelayedUnitBreakdownPK}
                  className={record.DelayedUnitBreakdownPK === id && changeColor ? "tableSelected" : ""}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={() => handleDoubleClick(record.DelayedUnitBreakdownPK)}
                >
                  <td>{formatDate(record.AddDate)}</td>
                  <td>{record.Description}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader
        ? ""
        : breakdownData?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
      {loader && <LoadingText />}
    </div>
  );
};

export default TableListingBreakdown;
