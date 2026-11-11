/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BreakdownFeesService from "../../../../services/DispatchDelay/BreakdownProcessing/BreakdownFeesService";
import {
  setBrowseData,
  setTotalPages,
  setTotalElements,
  setNormalSortValue,
  setNormalSortFlag,
  setIsLoading,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownFeesSlice";
import LoadingText from "../../../common/LoadingText";
import LoadingIcon from "../../../common/LoadingIcon";

const TableListing = () => {
  const params = useParams();
  const breakdownFK = params.breakdownFK;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");

  const { pageNumber, browseData, normalSortFlag, normalSortValue, displayFlag, isLoading } = useSelector(
    (state) => state.breakdownFeesReducer
  );
  const fetchBrowseData = () => {
    dispatch(setIsLoading(true));
    BreakdownFeesService.fetchBrowseData(
      pageNumber,
      normalSortValue,
      normalSortFlag,
      breakdownFK,
      breakdownCompanyName,
      1
    )
      .then((response) => {
        const { data } = response;
        const listingData = data?.breakdownFeeDetails;
        const paginationData = data?.pagination;
        dispatch(setBrowseData(listingData));
        if (paginationData) {
          dispatch(setTotalElements(paginationData[0].TotalElements));
          dispatch(setTotalPages(paginationData[0].TotalPages));
        }
        dispatch(setIsLoading(false));
      })
      .catch(() => {
        dispatch(setIsLoading(false));
      });
  };
  const handleNormalSort = (val, data) => {
    dispatch(setNormalSortValue(val));
    dispatch(setNormalSortFlag(data));
  };
  useEffect(() => {
    fetchBrowseData();
  }, [pageNumber, normalSortFlag, normalSortValue, breakdownFK]);

  useEffect(() => {
    if (!displayFlag) {
      navigate("/breakdown-processing/view-breakdown/" + breakdownFK);
    }
  }, [displayFlag]);
  return (
    <div className="fixTableHead">
      {isLoading && <LoadingIcon />}
      <table className="table table-striped f-w-600 ">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                handleNormalSort("Description", !normalSortFlag);
              }}
            >
              Description
              {normalSortFlag && normalSortValue === "Description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "Description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th className="f-w-600">Invoice</th>
            <th className="f-w-600">Invoiced</th>
            <th className="f-w-600">Driver</th>
            <th className="f-w-600">Reimburse</th>
            <th className="f-w-600">Paid</th>
          </tr>
        </thead>

        <tbody>
          {isLoading
            ? null
            : browseData?.length >= 1 &&
              browseData?.map((data) => (
                <tr id="rowId" key={data?.delayedUnitFeePK} onClick={() => {}}>
                  <td className="f-w-600"> {data?.description} </td>
                  <td className="f-w-600"> {data?.invoiceAmount} </td>
                  <td className="f-w-600"> {data?.invoiced ? "Yes" : "No"} </td>
                  <td className="f-w-600"> {data?.driverAmount} </td>
                  <td className="f-w-600"> {data?.reimbursment ? "Yes" : "No"} </td>
                  <td className="f-w-600"> {data?.paid ? "Yes" : "No"} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {isLoading
        ? ""
        : browseData?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
      {isLoading && <LoadingText />}
    </div>
  );
};

export default TableListing;
