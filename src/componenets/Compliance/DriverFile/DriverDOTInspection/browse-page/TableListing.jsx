import React, { useEffect, useState } from "react";
import DriverDOTInspectionService from "../../../../../services/Compliance/DriverDOTInspectionService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setSortType,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setDriverList,
  setSelectedPK,
  setChangeColor,
} from "../../../../../redux/Compliance/DriverDOTInspectionSlice";
import { formatDatetimeToDate } from "../../../../../utils/dateUtils";

const TableListing = ({ values, formik }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const driverFK = useParams().driverId;
  const searchTerm = useSelector((state) => state.driverDOTInspection.searchTerm);
  const searchCriteria = useSelector((state) => state.driverDOTInspection.searchCriteria);
  const radioButtons = useSelector((state) => state.driverDOTInspection.radioButtons);
  const pageNumber = useSelector((state) => state.driverDOTInspection.pageNumber);
  const pageSize = useSelector((state) => state.driverDOTInspection.pageSize);
  const sortType = useSelector((state) => state.driverDOTInspection.sortType);
  const sortValue = useSelector((state) => state.driverDOTInspection.sortValue);
  const driverList = useSelector((state) => state.driverDOTInspection.driverList);
  const selectedPK = useSelector((state) => state.driverDOTInspection.selectedPK);
  const changeColor = useSelector((state) => state.driverDOTInspection.changeColor);

  const { notYetResponded, isLoading } = values;

  const payload = {
    ...values,
    searchTerm,
    searchCriteria,
    radioButtons,
    sortValue,
    sortType,
    pageNumber,
    driverFK,
    pageSize,
  };

  const fetchDriverList = () => {
    formik.setFieldValue("isLoading", true);
    DriverDOTInspectionService.getDriverDOTInspectionData(payload)
      .then(({ data }) => {
        const paginationInfo = data[data.length - 1]; // last element
        dispatch(setDriverList(data.slice(0, -1)));
        dispatch(setTotalElements(paginationInfo.TotalElements));
        dispatch(setTotalPages(paginationInfo.TotalPages));
      })
      .catch(() => {
        console.log("error");
      })
      .finally(() => {
        formik.setFieldValue("isLoading", false);
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchDriverList();
    }, 200);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerm, pageNumber, radioButtons, notYetResponded, sortValue, sortType]);

  return (
    <div className="fixTableHead">
      {isLoading && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader" />
          </div>
        </div>
      )}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              xs={4}
              sm={4}
              md={4}
              className="f-w-600 col-4"
              onClick={() => {
                dispatch(setSortType(!sortType));
                dispatch(setSortValue("reportNumber"));
              }}
            >
              Report Number
              {sortType && sortValue === "reportNumber" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "reportNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600 col-2"
              onClick={() => {
                dispatch(setSortType(!sortType));
                dispatch(setSortValue("date"));
              }}
            >
              Date
              {sortType && sortValue === "date" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "date" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>

            <th
              xs={4}
              sm={4}
              md={4}
              className="f-w-600 col-4"
              onClick={() => {
                dispatch(setSortType(!sortType));
                dispatch(setSortValue("city"));
              }}
            >
              City
              {sortType && sortValue === "city" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "city" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>

            <th
              xs={2}
              sm={2}
              md={2}
              className="f-w-600 col-2"
              onClick={() => {
                dispatch(setSortType(!sortType));
                dispatch(setSortValue("state"));
              }}
            >
              State
              {sortType && sortValue === "state" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "state" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>

        <tbody>
          {isLoading
            ? null
            : driverList?.length >= 1 &&
              driverList?.map((data) => (
                <tr
                  id="rowId"
                  key={data.DriverDOTInspectionPK}
                  onClick={() => {
                    dispatch(setChangeColor(false));
                  }}
                  onDoubleClick={() => {
                    dispatch(setSelectedPK(data.DriverDOTInspectionPK));
                    dispatch(setChangeColor(true));
                    setTimeout(() => {
                      navigate(`/driver-dot-inspection-content/${driverFK}/${data.DriverDOTInspectionPK}`);
                    }, 100);
                  }}
                  className={data.DriverDOTInspectionPK === selectedPK && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{data.ReportNumber}</td>
                  <td className="f-w-600"> {formatDatetimeToDate(data?.Date, "MM/DD/YY")} </td>
                  <td className="f-w-600"> {data?.City} </td>
                  <td className="f-w-600">{data?.State} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {isLoading
        ? ""
        : driverList?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
    </div>
  );
};

export default TableListing;
