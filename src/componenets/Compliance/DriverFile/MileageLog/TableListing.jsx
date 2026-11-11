import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MileageLogService from "../../../../services/MileageLogService";
import {
  setEndDate,
  setListingData,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/MileageLogSlice";
import formatDatetimeToDate from "../../../../utils//formatDateTimeToDate";
import LoadingText from "../../../common/LoadingText";
import { t } from "i18next";
import { setBeginningDate } from "../../../../redux/MileageLogSlice";
import useDebouncer from "../../../../hooks/useDebouncer";

const TableListing = ({ pageLoading, setPageLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { driverId } = useParams();

  const [loading, setLoading] = useState(true);

  const searchTerm = useSelector((state) => state.driverMileageLogs.searchTerm);
  const searchCriteria = useSelector((state) => state.driverMileageLogs.searchCriteria);
  const sortValue = useSelector((state) => state.driverMileageLogs.sortValue);
  const sortFlag = useSelector((state) => state.driverMileageLogs.sortFlag);
  const pageNumber = useSelector((state) => state.driverMileageLogs.pageNumber);
  const loadedPageNumber = useSelector((state) => state.driverMileageLogs.loadedPageNumber);
  const editFormData = useSelector((state) => state.driverMaintenanceReducer.editFormData);

  const listingData = useSelector((state) => state.driverMileageLogs.listingData);
  const selectionType = useSelector((state) => state.driverMileageLogs.selectionType);
  const beginningDate = useSelector((state) => state.driverMileageLogs.beginningDate);
  const endDate = useSelector((state) => state.driverMileageLogs.endDate);
  const isBeginningDateValid = useSelector((state) => state.driverMileageLogs.isBeginningDateValid);
  const isEndDateValid = useSelector((state) => state.driverMileageLogs.isEndDateValid);

  const handleNormalSort = (val, data) => {
    dispatch(setSortValue(val));
    dispatch(setSortFlag(data));
  };

  const fetchTableData = () => {
    setLoading(true);
    setPageLoading(true);

    MileageLogService.getAllSafetyMilesRecords(
      driverId,
      sortValue,
      sortFlag,
      selectionType === "safety miles" ? pageNumber : loadedPageNumber,
      selectionType,
      beginningDate,
      endDate
    )
      .then((response) => {
        const { data } = response;

        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
      })
      .finally(() => {
        setLoading(false);
        setPageLoading(false);
      });
  };

  const debounceFetchTableData = useDebouncer(fetchTableData, 300);

  useEffect(() => {
    dispatch(setBeginningDate(editFormData?.hireDate || new Date()));
    dispatch(setEndDate(new Date()));
  }, [editFormData?.hireDate]);

  useEffect(() => {
    if (!editFormData) {
      navigate(`/driver-maintenance-add/${driverId}/form`);
    }
    if (
      !endDate ||
      !beginningDate ||
      !editFormData ||
      !(isEndDateValid && endDate) ||
      !(isBeginningDateValid && beginningDate)
    )
      return;

    setLoading(true);
    setPageLoading(true);
    debounceFetchTableData();
  }, [
    pageNumber,
    selectionType,
    sortValue,
    sortFlag,
    loadedPageNumber,
    beginningDate,
    endDate,
    editFormData,
    isEndDateValid,
    isBeginningDateValid,
  ]);

  return (
    <div className="fixTableHead">
      <table className={`table ${selectionType === "safety miles" ? "table-striped" : ""} f-w-600`}>
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                handleNormalSort("addDate", !sortFlag);
              }}
            >
              Date
              {sortFlag && sortValue === "addDate" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "addDate" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                handleNormalSort("unitNumber", !sortFlag);
              }}
            >
              Unit Number
              {sortFlag && sortValue === "unitNumber" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "unitNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                handleNormalSort("source", !sortFlag);
              }}
            >
              Source
              {sortFlag && sortValue === "source" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "source" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                handleNormalSort("miles", !sortFlag);
              }}
            >
              Miles
              {sortFlag && sortValue === "miles" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "miles" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            !pageLoading &&
            listingData?.length >= 1 &&
            listingData?.map((data) => (
              <tr
                id="rowId"
                className={
                  selectionType !== "safety miles"
                    ? !data.eventh
                      ? "whiteBackground"
                      : "greyBackground"
                    : ""
                }
              >
                <td className="f-w-600">{formatDatetimeToDate(data.addDate, "MM/DD/YY")}</td>

                <td className="f-w-600"> {data.unitNumber} </td>
                <td className="f-w-600"> {data.source} </td>
                <td className="f-w-600">{data.miles} </td>
              </tr>
            ))}
        </tbody>
      </table>

      {loading && pageLoading && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
      {!loading && !pageLoading && listingData?.length === 0 && (
        <h2 className="empty-list" align="center">
          {t("dealers.list.empty.message")}
        </h2>
      )}
    </div>
  );
};

export default TableListing;
