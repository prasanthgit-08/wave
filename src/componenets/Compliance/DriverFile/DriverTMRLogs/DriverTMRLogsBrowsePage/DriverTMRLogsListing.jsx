import React from "react";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  setChangeColor,
  setSelectedId,
  setNormalSortFlag,
  setNormalSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
  setDriverTMRLogPK,
  setListingDriverTMRLogsData,
  setUserFK,
  resetFields,
} from "../../../../../redux/DriverTMRLogsSlice";
import DriverTMRLogsService from "../../../../../services/DriverTMRLogsService";
import { customFormatDate } from "../../../../../utils/validation/DateFormatUtils";
import LoadingIcon from "../../../../common/LoadingIcon";

const DriverTMRLogsListing = ({ loader, setLoader }) => {
  const params = useParams();
  const id = params.id;
  const pageNumber = useSelector((state) => state.driverTMRLogsReducer.pageNumber);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedId = useSelector((state) => state.driverTMRLogsReducer.selectedId);
  const searchTerm = useSelector((state) => state.driverTMRLogsReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.driverTMRLogsReducer.searchCriteria);
  const listingDriverTMRLogsData = useSelector(
    (state) => state.driverTMRLogsReducer.listingDriverTMRLogsData
  );
  const dateTo = useSelector((state) => state.driverTMRLogsReducer.dateTo);
  const dateFrom = useSelector((state) => state.driverTMRLogsReducer.dateFrom);
  const dateType = useSelector((state) => state.driverTMRLogsReducer.dateType);
  let sortValue = useSelector((state) => state.driverTMRLogsReducer.normalSortValue);
  let sortFlag = useSelector((state) => state.driverTMRLogsReducer.normalSortFlag);
  const [hasLoaded, setHasLoaded] = useState(false);
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;

    fetchTableData();
  };

  const fetchTableData = () => {
    setLoader(true);
    DriverTMRLogsService.getDriverTMRLogs(
      searchTerm,
      searchCriteria,
      pageNumber,
      sortValue,
      sortFlag,
      dateType,
      dateFrom,
      dateTo,
      id
    )
      .then((response) => {
        const { data } = response;
        setLoader(false);
        dispatch(setListingDriverTMRLogsData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoader(false);
      })
      .finally(() => {
        setLoader(false);
        setHasLoaded(true);
      });
  };

  const handleDoubleClick = (event) => {
    dispatch(setDriverTMRLogPK(event));
    dispatch(setChangeColor(true));
    dispatch(setViewDetail(true));
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      setLoader(true);
      fetchTableData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, searchCriteria, pageNumber, dateType, dateFrom, dateTo]);

  return (
    <div className="fixTableHead">
      {loader && <LoadingIcon />}
      <table className="table table-striped f-w-600 ">
        <thead>
          <tr disabled>
            <th
              className="f-w-600 col-4"
              onClick={() => {
                onhandleNormalSort("Description", !sortFlag);
              }}
            >
              Description
              {sortFlag && sortValue === "Description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "Description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("tmrperiod", !sortFlag);
              }}
            >
              Period
              {sortFlag && sortValue === "tmrperiod" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "tmrperiod" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("Notified", !sortFlag);
              }}
            >
              Notified
              {sortFlag && sortValue === "Notified" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "Notified" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("Due", !sortFlag);
              }}
            >
              Due
              {sortFlag && sortValue === "Due" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "Due" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("Returned", !sortFlag);
              }}
            >
              Returned
              {sortFlag && sortValue === "Returned" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "Returned" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {loader
            ? ""
            : listingDriverTMRLogsData.length > 0 &&
              listingDriverTMRLogsData.map((driverTMRLogs) => (
                <tr
                  id="rowId"
                  key={driverTMRLogs.driverTMRLogPK}
                  onClick={(e) => {
                    dispatch(setDriverTMRLogPK(driverTMRLogs.driverTMRLogPK));
                    dispatch(setSelectedId(null));
                  }}
                  onDoubleClick={() => {
                    handleDoubleClick(driverTMRLogs.driverTMRLogPK);
                    dispatch(setDriverTMRLogPK(driverTMRLogs.driverTMRLogPK));
                    dispatch(setSelectedId(driverTMRLogs.driverTMRLogPK));
                    dispatch(resetFields());
                    setTimeout(() => {
                      navigate(`/driver-TMRlogs/${id}/${driverTMRLogs.driverTMRLogPK}/${pageNumber}`);
                    }, 100);
                  }}

                  className={driverTMRLogs.driverTMRLogPK === selectedId ? "tableSelected" : ""}
                >
                  <td className="f-w-600">
                    {driverTMRLogs.driverTrailerDescription ? driverTMRLogs.driverTrailerDescription : ""}

                    {driverTMRLogs.driverTrucksDescription ? driverTMRLogs.driverTrucksDescription : ""}
                  </td>
                  <td className="f-w-600">{driverTMRLogs.tmrperiod} </td>
                  <td className="f-w-600">{customFormatDate(driverTMRLogs.notified)} </td>
                  <td className="f-w-600">{customFormatDate(driverTMRLogs.due)} </td>
                  <td className="f-w-600">
                    {driverTMRLogs.returned ? customFormatDate(driverTMRLogs.returned) : ""}{" "}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {/* {loader
        ? ''
        :listingDriverTMRLogsData.length === 0 && ( */}

      {hasLoaded && !loader && listingDriverTMRLogsData?.length === 0 && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};

export default DriverTMRLogsListing;
