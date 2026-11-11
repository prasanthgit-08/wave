import { parseLocalDate } from "../../../../../utils/dateUtils";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setNormalSortValue,
  setNormalSortFlag,
  setViewDetail,
  setComplianceHistoryData,
  setDriverComplianceItemHistoryPK,
  setDriverComplianceItemFK,
  setTotalElementsOfHistory,
  setTotalPagesOfHistory,
  setChangeColorOfHistory,
  setSortValue,
  setSortFlag,
} from "../../../../../redux/DriverComplianceItemsSlice";
import DriverComplianceItemsService from "../../../../../services/DriverComplianceItemsService";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { ThreeForthScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";

function ComplianceHistoryListing(props) {
  const params = useParams();
  const driverComplianceItemsId = params.id;
  const driverId = params.driverId;
  const dispatch = useDispatch();

  const { loadings, setLoadings } = props;
  const searchTerm = useSelector((state) => state.DriverComplianceItemsReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.DriverComplianceItemsReducer.searchCriteria);
  const changeColor = useSelector((state) => state.DriverComplianceItemsReducer.changeColor);
  const selectedStatus = useSelector((state) => state.DriverComplianceItemsReducer.selectedStatus);
  const complianceHistoryData = useSelector(
    (state) => state.DriverComplianceItemsReducer.complianceHistoryData
  );
  const number = useSelector((state) => state.DriverComplianceItemsReducer.number);
  const driverComplianceItemFK = useSelector(
    (state) => state.DriverComplianceItemsReducer.driverComplianceItemFK
  );
  const driverComplianceItemHistoryPK = useSelector(
    (state) => state.DriverComplianceItemsReducer.driverComplianceItemHistoryPK
  );

  const navigate = useNavigate();

  let sortFlag = useSelector((state) => state.DriverComplianceItemsReducer.sortFlag);

  let sortValue = useSelector((state) => state.DriverComplianceItemsReducer.sortValue);
  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));

    dispatch(setSortFlag(val));

    sortValue = value;

    sortFlag = val;
  };

  const fetchDriverComplaintsData = () => {
    setLoadings(true);
    DriverComplianceItemsService.fetchDriverComplianceItemsForHistory(
      searchCriteria,
      searchTerm,
      number,
      sortValue,
      sortFlag,
      driverComplianceItemsId
    )
      .then((response) => {
        const { data } = response;
        dispatch(setComplianceHistoryData(data.content));

        dispatch(setTotalElementsOfHistory(data.totalElements));
        dispatch(setTotalPagesOfHistory(data.totalPages));
      })
      .catch((error) => {
        setLoadings(false);
      })
      .finally(() => {
        setLoadings(false);
      });
  };

  useEffect(() => {
    setLoadings(true);
    const debounceFunction = setTimeout(() => {
      fetchDriverComplaintsData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, searchCriteria, number, selectedStatus, sortValue, sortFlag, driverComplianceItemsId]);

  function CustomDatetimeFormat(datetime, format) {
    const dateObj = parseLocalDate(datetime);

    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // This ensures the 24-hour format
    };

    return dateObj.toLocaleDateString("en-US", options).replace(",", "");
  }

  return (
    <div>
      <div className="fixTableHead  h-200px " style={{ height: "400px" }}>
        <table className="table table-striped f-w-500 ">
          <thead>
            <tr disabled>
              <th
                className="f-w-600 col-2"
                onClick={() => {
                  onhandleNormalSort("lastDate", !sortFlag);
                }}
              >
                Last Date{" "}
                {sortFlag && sortValue === "lastDate" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "lastDate" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600 col-2"
                onClick={() => {
                  onhandleNormalSort("nextDate", !sortFlag);
                }}
              >
                Next Date{" "}
                {sortFlag && sortValue === "nextDate" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "nextDate" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600 col-2"
                onClick={() => {
                  onhandleNormalSort("blockDate", !sortFlag);
                }}
              >
                Block Date{" "}
                {sortFlag && sortValue === "blockDate" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "blockDate" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600 col-2"
                onClick={() => {
                  onhandleNormalSort("addDate", !sortFlag);
                }}
              >
                Updated{" "}
                {sortFlag && sortValue === "addDate" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "addDate" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600 col-2"
                onClick={() => {
                  onhandleNormalSort("user", !sortFlag);
                }}
              >
                User{" "}
                {sortFlag && sortValue === "user" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "user" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {loadings
              ? ""
              : complianceHistoryData.length >= 1 &&
                complianceHistoryData.map((data) => (
                  <tr
                    id="rowId"
                    key={data.driverComplianceItemHistoryPK}
                    onClick={() => {
                      dispatch(setChangeColorOfHistory(true));
                      dispatch(setViewDetail(true));
                      dispatch(setDriverComplianceItemHistoryPK(data?.driverComplianceItemHistoryPK));
                    }}
                    onDoubleClick={() => {
                      dispatch(setChangeColorOfHistory(true));
                    }}
                    className={
                      data.driverComplianceItemHistoryPK === driverComplianceItemHistoryPK && changeColor
                        ? "tableSelected"
                        : ""
                    }
                  >
                    <td className="f-w-600">
                      {" "}
                      {formatDatetimeToDate(data?.lastDateForHistory, "MM/DD/YY")}{" "}
                    </td>
                    <td className="f-w-600">
                      {" "}
                      {formatDatetimeToDate(data?.nextDateForHistory, "MM/DD/YY")}{" "}
                    </td>
                    <td className="f-w-600">
                      {" "}
                      {formatDatetimeToDate(data?.blockDateForHistory, "MM/DD/YY")}{" "}
                    </td>
                    <td className="f-w-600">
                      {" "}
                      {CustomDatetimeFormat(data?.addDateForHistory, "MM/DD/YY HH:MM:SS")}{" "}
                    </td>
                    <td className="f-w-600"> {data.user} </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {loadings
          ? ""
          : complianceHistoryData.length === 0 && (
              <h2 className="empty-list " align="center">
                {t("dealers.list.empty.message")}
              </h2>
            )}
      </div>
    </div>
  );
}

export default ComplianceHistoryListing;
