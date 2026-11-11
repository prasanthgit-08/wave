import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setBrowseList,
  setLoading,
  setMissingPaperworkNotes,
  setSelectedDispatchPK,
  setSortType,
  setSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/MissingPaperworkSlice";
import MissingPaperworkService from "../../../../services/operations/MissingPaperworkService";
import moment from "moment";
import TruncatedStringWithTooltip from "../../../common/TruncatedStringWithTooltip";

export const TableListing = () => {
  const deliveryDateFrom = useSelector((state) => state.missingPaperwork.deliveryDateFrom);
  const deliveryDateTo = useSelector((state) => state.missingPaperwork.deliveryDateTo);
  const assignedDispatcher = useSelector((state) => state.missingPaperwork.assignedDispatcher);
  const dispatchedBy = useSelector((state) => state.missingPaperwork.dispatchedBy);
  const dispatcherPK = useSelector((state) => state.missingPaperwork.dispatcherPK);
  const customerPK = useSelector((state) => state.missingPaperwork.customerPK);
  const unitNumberPK = useSelector((state) => state.missingPaperwork.unitNumberPK);
  const unitNumberLast5 = useSelector((state) => state.missingPaperwork.unitNumberLast5);
  const unitsEnteredByPK = useSelector((state) => state.missingPaperwork.unitsEnteredByPK);
  const motorized = useSelector((state) => state.missingPaperwork.motorized);
  const towable = useSelector((state) => state.missingPaperwork.towable);
  const flatbed = useSelector((state) => state.missingPaperwork.flatbed);
  const pageNumber = useSelector((state) => state.missingPaperwork.pageNumber);
  const pageSize = useSelector((state) => state.missingPaperwork.pageSize);
  const sortValue = useSelector((state) => state.missingPaperwork.sortValue);
  const sortType = useSelector((state) => state.missingPaperwork.sortType);
  const selectedDispatchPK = useSelector((state) => state.missingPaperwork.selectedDispatchPK);
  const browseList = useSelector((state) => state.missingPaperwork.browseList);
  const loading = useSelector((state) => state.missingPaperwork.loading);
  const includeNotes = useSelector((state) => state.missingPaperwork.includeNotes);
  const companyPK = useSelector((state) => state.missingPaperwork.companyPK);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoading(true));
    fetchBrowseData();
  }, [pageNumber, sortType]);

  useEffect(() => {
    if (!deliveryDateTo) {
      navigate(`/missing-paperwork-settings-screen`);
    }
  }, []);

  const fetchBrowseData = async () => {
    dispatch(setLoading(true));
    try {
      const response = await MissingPaperworkService.getMissingPaperworkBrowse(
        deliveryDateFrom,
        deliveryDateTo,
        assignedDispatcher,
        dispatchedBy,
        dispatcherPK,
        customerPK,
        unitNumberPK,
        unitNumberLast5,
        unitsEnteredByPK,
        motorized,
        towable,
        flatbed,
        pageNumber,
        pageSize,
        sortValue,
        sortType,
        false,
        includeNotes,
        companyPK
      );
      if (response && response.data) {
        const data = response.data;
        const filteredList = data?.slice(0, data.length - 1);
        const paginationData = data?.filter((item) => item?.Type === "Pagination");
        dispatch(setBrowseList(filteredList || []));
        if (paginationData) {
          dispatch(setTotalPages(paginationData[0]?.TotalPages));
          dispatch(setTotalElements(paginationData[0]?.TotalElements));
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRowClick = (row) => {
    dispatch(setSelectedDispatchPK(row.DispatchPK));
    dispatch(setMissingPaperworkNotes(row.MissingPaperworkNotes ? row.MissingPaperworkNotes : ""));
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));

    dispatch(setSortType(val));
  };

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              onClick={() => {
                onhandleNormalSort("Date", !sortType);
              }}
              className="f-w-600 col-1"
            >
              Date
              {sortType && sortValue === "Date" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Date" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              onClick={() => {
                onhandleNormalSort("Customer", !sortType);
              }}
              className="f-w-600 col-2"
            >
              Customer
              {sortType && sortValue === "Customer" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Customer" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => {
                onhandleNormalSort("UnitNumber", !sortType);
              }}
              className="f-w-600 col-2"
            >
              Unit Number
              {sortType && sortValue === "UnitNumber" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "UnitNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => {
                onhandleNormalSort("Delivery", !sortType);
              }}
              className="f-w-600 col-2"
            >
              Delivery
              {sortType && sortValue === "Delivery" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Delivery" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => {
                onhandleNormalSort("UnitType", !sortType);
              }}
              className="f-w-600 col-2"
            >
              Unit Type
              {sortType && sortValue === "UnitType" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "UnitType" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => {
                onhandleNormalSort("Driver", !sortType);
              }}
              className="f-w-600 col-1"
            >
              Driver
              {sortType && sortValue === "Driver" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Driver" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => {
                onhandleNormalSort("Dispatcher", !sortType);
              }}
              className="f-w-600 col-2"
            >
              Dispatcher
              {sortType && sortValue === "Dispatcher" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Dispatcher" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            browseList.map((row, index) => (
              <tr
                key={index}
                className={selectedDispatchPK === row.DispatchPK ? "tableSelected" : ""}
                onClick={() => handleRowClick(row)}
              >
                <td>
                  <TruncatedStringWithTooltip text={moment(row.Date).format("MM/DD/YY")} charLimit={8} />
                </td>{" "}
                <td>
                  <TruncatedStringWithTooltip text={row.Customer} charLimit={15} />
                </td>
                <td>
                  <TruncatedStringWithTooltip text={row.UnitNumber} charLimit={15} />
                </td>
                <td>
                  <TruncatedStringWithTooltip text={row.Delivery} charLimit={15} />
                </td>
                <td>
                  <TruncatedStringWithTooltip text={row.UnitType} charLimit={7} />
                </td>
                <td>
                  <TruncatedStringWithTooltip text={row.Driver} charLimit={7} />
                </td>
                <td>
                  <TruncatedStringWithTooltip text={row.Dispatcher} charLimit={7} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading
        ? ""
        : browseList?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
      {loading && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableListing;
