import React, { useEffect, useState } from "react";
import OutstandingPaperworkService from "../../../../services/operations/OutstandingPaperworkService";
import { useDispatch, useSelector } from "react-redux";
import {
  setBrowseList,
  setLatePaperworkNotes,
  setLoading,
  setPageNumber,
  setSelectedDispatchPK,
  setSortType,
  setSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/OutstandingPaperworkSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import TruncatedStringWithTooltip from "../../../common/TruncatedStringWithTooltip";

export const TableListing = () => {
  const deliveryDateFrom = useSelector((state) => state.outstandingPaperwork.deliveryDateFrom);
  const deliveryDateTo = useSelector((state) => state.outstandingPaperwork.deliveryDateTo);
  const assignedDispatcher = useSelector((state) => state.outstandingPaperwork.assignedDispatcher);
  const dispatchedBy = useSelector((state) => state.outstandingPaperwork.dispatchedBy);
  const dispatcherPK = useSelector((state) => state.outstandingPaperwork.dispatcherPK);
  const customerPK = useSelector((state) => state.outstandingPaperwork.customerPK);
  const unitNumberPK = useSelector((state) => state.outstandingPaperwork.unitNumberPK);
  const unitNumberLast5 = useSelector((state) => state.outstandingPaperwork.unitNumberLast5);
  const onlyUnitsWithNotes = useSelector((state) => state.outstandingPaperwork.onlyUnitsWithNotes);
  const unitsEnteredByPK = useSelector((state) => state.outstandingPaperwork.unitsEnteredByPK);
  const motorized = useSelector((state) => state.outstandingPaperwork.motorized);
  const towable = useSelector((state) => state.outstandingPaperwork.towable);
  const flatbed = useSelector((state) => state.outstandingPaperwork.flatbed);
  const pageNumber = useSelector((state) => state.outstandingPaperwork.pageNumber);
  const pageSize = useSelector((state) => state.outstandingPaperwork.pageSize);
  const sortValue = useSelector((state) => state.outstandingPaperwork.sortValue);
  const sortType = useSelector((state) => state.outstandingPaperwork.sortType);
  const selectedDispatchPK = useSelector((state) => state.outstandingPaperwork.selectedDispatchPK);
  const browseList = useSelector((state) => state.outstandingPaperwork.browseList);
  const loading = useSelector((state) => state.outstandingPaperwork.loading);
  const companyPK = useSelector((state) => state.outstandingPaperwork.companyPK);
  const includeNotes = useSelector((state) => state.outstandingPaperwork.includeNotes);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBrowseData();
  }, [pageNumber, sortType, companyPK]);

  useEffect(() => {
    if (!deliveryDateTo) {
      navigate(`/outstanding-paperwork-settings-screen`);
    }
  }, []);

  const fetchBrowseData = async () => {
    dispatch(setLoading(true));
    try {
      const response = await OutstandingPaperworkService.getOutstandingPaperworkBrowse(
        deliveryDateFrom,
        deliveryDateTo,
        assignedDispatcher,
        dispatchedBy,
        dispatcherPK,
        customerPK,
        unitNumberPK,
        unitNumberLast5,
        onlyUnitsWithNotes,
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
    dispatch(setLatePaperworkNotes(row.LatePaperworkNotes ? row.LatePaperworkNotes : ""));
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
            browseList?.map((row, index) => (
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
