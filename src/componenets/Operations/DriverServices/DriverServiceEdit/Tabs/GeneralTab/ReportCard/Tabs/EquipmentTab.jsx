import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEquipmentList,
  setPageNumber,
  setSortFlag,
  setSortValue,
} from "../../../../../../../../redux/DriverReportCardSlice";
import usePagination from "../../../../../../../../hooks/usePagination";
import { PaginationComponent } from "../../../../../../../common/PaginationComponent";
import formatDatetimeToDate from "../../../../../../../../utils/formatDateTimeToDate";

const EquipmentTab = () => {
  const dispatch = useDispatch();

  const equipmentList = useSelector((state) => state.driverReportCard.equipmentList);
  const sortFlag = useSelector((state) => state.driverReportCard.sortFlag);
  const sortValue = useSelector((state) => state.driverReportCard.sortValue);
  const pageNumber = useSelector((state) => state.driverReportCard.pageNumber);

  const handleNormalSort = (value, flag) => {
    dispatch(setSortFlag(flag));
    dispatch(setSortValue(value));
  };
  const equipmentPagination = usePagination(equipmentList, pageNumber, 9);

  useEffect(() => {
    setTimeout(() => {
      sortEquipmentList();
    }, 50);
  }, [sortFlag, sortValue]);

  const sortEquipmentList = () => {
    let sortedList = [];
    const compareFunction = (key) => (a, b) => (a[key] ?? "").localeCompare(b[key] ?? "");
    const compareBoolean = (key) => (a, b) => {
      return a[key] === b[key] ? 0 : a[key] ? -1 : 1;
    };
    switch (sortValue) {
      case "description":
        sortedList = [...equipmentList].sort(compareFunction("description"));
        break;
      case "registration":
        sortedList = [...equipmentList].sort(compareFunction("registartion"));
        break;
      case "insurance":
        sortedList = [...equipmentList].sort(compareFunction("insurance"));
        break;
      case "inspection":
        sortedList = [...equipmentList].sort(compareFunction("inspection"));
        break;
      case "missingTMR":
        sortedList = [...equipmentList].sort(compareBoolean("missingTMR"));
        break;
      default:
        sortedList = [...equipmentList];
    }

    if (!sortFlag) {
      sortedList.reverse();
    }
    dispatch(setEquipmentList(sortedList));
  };

  return (
    <div className="d-flex p-2 " style={{ height: "372px" }}>
      <div className="w-100">
        <div className="border border-dark h-100 fixTableHead">
          <table className="table table-striped f-w-600">
            {" "}
            <thead>
              <tr>
                <th
                  className="f-w-600"
                  onClick={() => {
                    handleNormalSort("description", !sortFlag);
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
                <th
                  className="f-w-600"
                  onClick={() => {
                    handleNormalSort("registration", !sortFlag);
                  }}
                >
                  Registration
                  {sortFlag && sortValue === "registration" && (
                    <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {!sortFlag && sortValue === "registration" && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>
                <th
                  className="f-w-600"
                  onClick={() => {
                    handleNormalSort("insurance", !sortFlag);
                  }}
                >
                  Insurance
                  {sortFlag && sortValue === "insurance" && (
                    <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {!sortFlag && sortValue === "insurance" && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>
                <th
                  className="f-w-600"
                  onClick={() => {
                    handleNormalSort("inspection", !sortFlag);
                  }}
                >
                  Inspection
                  {sortFlag && sortValue === "inspection" && (
                    <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {!sortFlag && sortValue === "inspection" && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>

                <th
                  className="f-w-600"
                  onClick={() => {
                    handleNormalSort("missingTMR", !sortFlag);
                  }}
                >
                  Missing TMR
                  {sortFlag && sortValue === "missingTMR" && (
                    <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {!sortFlag && sortValue === "missingTMR" && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {equipmentPagination?.paginatedArray?.map((equipment, id) => (
                <tr key={id}>
                  <td className="f-w-600">{equipment?.description}</td>
                  <td className="f-w-600">{formatDatetimeToDate(equipment?.registartion, "MM/DD/YY")}</td>
                  <td className="f-w-600">{formatDatetimeToDate(equipment?.insurance, "MM/DD/YY")}</td>
                  <td className="f-w-600">{formatDatetimeToDate(equipment?.inspection, "MM/DD/YY")}</td>
                  <td className="f-w-600">{equipment?.missingTMR ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {equipmentPagination?.paginatedArray?.length == 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
        </div>
      </div>
      <PaginationComponent
        firstPage
        lastPage
        singleArrowDown
        singleArrowUp
        hideBorderLeft
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalElements={equipmentPagination.totalElements}
        totalPages={equipmentPagination.totalPages}
        recordsPerPage={equipmentPagination.numberOfElements}
        listingData={equipmentPagination.paginatedArray}
      />
    </div>
  );
};

export default EquipmentTab;
