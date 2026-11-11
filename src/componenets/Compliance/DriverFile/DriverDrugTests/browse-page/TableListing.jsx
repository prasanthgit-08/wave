import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DriverDrugTestsService from "../../../../../services/DriverDrugTestsService";
import {
  setFormData,
  setListingData,
  setPaginationLoader,
  setResultClicked,
  setSelectedId,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../../redux/DriverDrugTestsSlice";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";
import LoadingIcon from "../../../../common/LoadingIcon";

const TableListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { driverId } = useParams();
  const [loading, setLoading] = useState(true);

  const searchTerm = useSelector((state) => state.driverDrugTests.searchTerm);
  const searchCriteria = useSelector((state) => state.driverDrugTests.searchCriteria);
  const sortValue = useSelector((state) => state.driverDrugTests.sortValue);
  const sortFlag = useSelector((state) => state.driverDrugTests.sortFlag);
  const selectedStatus = useSelector((state) => state.driverDrugTests.selectedStatus);
  const listingData = useSelector((state) => state.driverDrugTests.listingData);
  const pageNumber = useSelector((state) => state.driverDrugTests.pageNumber);
  const dateFrom = useSelector((state) => state.driverDrugTests.dateFrom);
  const dateTo = useSelector((state) => state.driverDrugTests.dateTo);
  const selectedId = useSelector((state) => state.driverDrugTests.selectedId);
  const searchStatus = useSelector((state) => state.driverDrugTests.searchStatus);
  const type = useSelector((state) => state.driverDrugTests.type);
  const isDrugTestForm = useSelector((state) => state.driverDrugTests.isDrugTestForm);
  const paginationLoader = useSelector((state) => state.driverDrugTests.paginationLoader);

  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));
    dispatch(setSortFlag(val));
  };

  const fetchTableData = () => {
    dispatch(setPaginationLoader(true));
    DriverDrugTestsService.getDriverDrugTests(
      searchTerm,
      searchCriteria,
      pageNumber,
      sortValue,
      sortFlag,
      dateFrom,
      dateTo,
      driverId,
      searchStatus,
      type
    )
      .then((response) => {
        const { data } = response;
        dispatch(setListingData(data.content || []));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        setLoading(false);
        dispatch(setPaginationLoader(false));
      })
      .catch((error) => {
        setLoading(false);
      })
      .finally(() => {
        dispatch(setPaginationLoader(false));
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 100);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, searchCriteria, pageNumber, sortValue, sortFlag, dateFrom, dateTo, searchStatus, type]);

  useEffect(() => {
    dispatch(setFormData(null));
    if (isDrugTestForm === false) {
      navigate(`/driver-maintenance-add/${driverId}`);
    }
  }, []);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("selectionDate", !sortFlag);
              }}
            >
              Selection Date
              {sortFlag && sortValue === "selectionDate" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "selectionDate" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th className="f-w-600">Drug</th>

            <th className="f-w-600">Alcohol</th>

            <th className="f-w-600">No Test</th>

            <th className="f-w-600">Notified Date</th>

            <th className="f-w-600">Test Date</th>
            <th className="f-w-600">Results Date</th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? null
            : listingData?.length >= 1 &&
              listingData?.map((data) => (
                <tr
                  id="rowId"
                  key={data.driverDrugTestPK}
                  onClick={() => {
                    dispatch(setSelectedId(null));
                  }}
                  onDoubleClick={() => {
                    dispatch(setSelectedId(data.driverDrugTestPK));
                    dispatch(setViewDetail(true));
                    dispatch(setResultClicked(false));
                    setTimeout(() => {
                      navigate(`/driver-drugtests/${driverId}/${data.driverDrugTestPK}`);
                    }, 100);
                  }}
                  className={data.driverDrugTestPK === selectedId ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{formatDatetimeToDate(data.selectionDate, "MM/DD/YY")}</td>
                  <td className="f-w-600"> {data.drugTest ? "Yes" : "No"} </td>
                  <td className="f-w-600"> {data.alcoholTest ? "Yes" : "No"} </td>
                  <td className="f-w-600">
                    {data.refusedDrugTest ||
                    data.drugTestCanceled ||
                    data.refusedAlcoholTest ||
                    data.alcoholTestCanceled ||
                    data.notTested
                      ? "Yes"
                      : "No"}{" "}
                  </td>
                  <td className="f-w-600">{formatDatetimeToDate(data.notificationDate, "MM/DD/YY")} </td>
                  <td className="f-w-600">{formatDatetimeToDate(data.testDate, "MM/DD/YY")}</td>
                  <td className="f-w-600">{formatDatetimeToDate(data.resultsDate, "MM/DD/YY")}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loading ? (
        <LoadingIcon />
      ) : (
        listingData?.length === 0 && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )
      )}
    </div>
  );
};

export default TableListing;
