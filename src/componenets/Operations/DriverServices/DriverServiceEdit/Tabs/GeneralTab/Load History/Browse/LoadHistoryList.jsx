import React, { useEffect, useState } from "react";
import LoadHistoryService from "../../../../../../../../services/LoadHistoryService";
import { useDispatch, useSelector } from "react-redux";
import {
  resetEdit,
  setHistoryData,
  setload,
  setSelectedDispatch,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../../../../../redux/LoadHistorySlice";
import formatDatetimeToDate from "../../../../../../../../utils/formatDateTimeToDate";
import { useNavigate, useParams } from "react-router-dom";
import LoadingText from "../../../../../../../common/LoadingText";
import useDebouncer from "../../../../../../../../hooks/useDebouncer";

const LoadHistoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { driverId } = useParams();

  const historyData = useSelector((state) => state.loadHistory.historyData);
  const sortFlag = useSelector((state) => state.loadHistory.sortFlag);
  const sortValue = useSelector((state) => state.loadHistory.sortValue);
  const pageNumber = useSelector((state) => state.loadHistory.pageNumber);
  const toDate = useSelector((state) => state.loadHistory.toDate);
  const fromDate = useSelector((state) => state.loadHistory.fromDate);
  const toDateValid = useSelector((state) => state.loadHistory.toDateValid);
  const fromDateValid = useSelector((state) => state.loadHistory.fromDateValid);
  const load = useSelector((state) => state.loadHistory.load);
  const dateLoading = useSelector((state) => state.loadHistory.dateLoading);

  const fetchBrowseList = () => {
    dispatch(setload(true));
    LoadHistoryService.getLoadHistoryData(pageNumber, 20, sortValue, sortFlag, driverId, toDate, fromDate)
      .then(({ data }) => {
        const listingData = data.slice(0, data.length - 1);
        const paginationData = data[data.length - 1];
        dispatch(setHistoryData(listingData));
        dispatch(setTotalElements(paginationData.TotalElements || 0));
        dispatch(setTotalPages(paginationData.TotalPages || 0));
        dispatch(setload(false));
      })
      .catch((err) => {
        console.error("err", err);
      })
      .finally(() => {
        dispatch(setload(false));
      });
  };

  const handleNormalSort = (val, data) => {
    dispatch(setSortValue(val));
    dispatch(setSortFlag(data));
  };
  const debouncerFetchBrowseList = useDebouncer(fetchBrowseList, 300);

  useEffect(() => {
    if (toDate && fromDate && toDateValid && fromDateValid) {
      dispatch(setload(true));
      debouncerFetchBrowseList();
    }
  }, [pageNumber, sortValue, sortFlag, toDate, fromDate, toDateValid, fromDateValid]);

  return (
    <div className="">
      <div className="shadow-sm rounded border fitHeightLargeScreen1  m-t-10 m-b-10 " /**/>
        <div className={`d-flex  `}>
          <div className="w-100">
            <div className="fixTableHead">
              <div>
                <div
                  className={`border border-dark border-left-0  border-top-0 border-bottom-0 border-right-0 `}
                  style={{ height: "700px" }}
                >
                  <table className="table  f-w-600">
                    <thead>
                      <tr disabled>
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
                            handleNormalSort("customer", !sortFlag);
                          }}
                        >
                          Customer
                          {sortFlag && sortValue === "customer" && (
                            <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                          )}
                          {!sortFlag && sortValue === "customer" && (
                            <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                          )}
                        </th>
                        <th
                          className="f-w-600"
                          onClick={() => {
                            handleNormalSort("plant", !sortFlag);
                          }}
                        >
                          Plant
                          {sortFlag && sortValue === "plant" && (
                            <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                          )}
                          {!sortFlag && sortValue === "plant" && (
                            <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                          )}
                        </th>
                        <th
                          className="f-w-600"
                          onClick={() => {
                            handleNormalSort("unitType", !sortFlag);
                          }}
                        >
                          Unit Type
                          {sortFlag && sortValue === "unitType" && (
                            <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                          )}
                          {!sortFlag && sortValue === "unitType" && (
                            <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                          )}
                        </th>
                        <th
                          className="f-w-600"
                          onClick={() => {
                            handleNormalSort("special", !sortFlag);
                          }}
                        >
                          Special
                          {sortFlag && sortValue === "special" && (
                            <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                          )}
                          {!sortFlag && sortValue === "special" && (
                            <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                          )}
                        </th>
                        <th
                          className="f-w-600"
                          onClick={() => {
                            handleNormalSort("pickup", !sortFlag);
                          }}
                        >
                          Pickup
                          {sortFlag && sortValue === "pickup" && (
                            <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                          )}
                          {!sortFlag && sortValue === "pickup" && (
                            <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                          )}
                        </th>
                        <th
                          className="f-w-600"
                          onClick={() => {
                            handleNormalSort("delivery", !sortFlag);
                          }}
                        >
                          Delivery
                          {sortFlag && sortValue === "delivery" && (
                            <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                          )}
                          {!sortFlag && sortValue === "delivery" && (
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
                          {!sortFlag && sortValue === "miles" && (
                            <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                          )}
                        </th>
                        <th
                          className="f-w-600"
                          onClick={() => {
                            handleNormalSort("payBalance", !sortFlag);
                          }}
                        >
                          Pay Balance
                          {sortFlag && sortValue === "payBalance" && (
                            <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                          )}
                          {!sortFlag && sortValue === "payBalance" && (
                            <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                          )}
                        </th>
                        <th
                          className="f-w-600"
                          onClick={() => {
                            handleNormalSort("dispatched", !sortFlag);
                          }}
                        >
                          Dispatched
                          {sortFlag && sortValue === "dispatched" && (
                            <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                          )}
                          {!sortFlag && sortValue === "dispatched" && (
                            <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                          )}
                        </th>
                        <th
                          className="f-w-600"
                          onClick={() => {
                            handleNormalSort("delivered", !sortFlag);
                          }}
                        >
                          Delivered
                          {sortFlag && sortValue === "delivered" && (
                            <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                          )}
                          {!sortFlag && sortValue === "delivered" && (
                            <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                          )}
                        </th>
                        <th
                          className="f-w-600"
                          onClick={() => {
                            handleNormalSort("invoiced", !sortFlag);
                          }}
                        >
                          Invoiced
                          {sortFlag && sortValue === "invoiced" && (
                            <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                          )}
                          {!sortFlag && sortValue === "invoiced" && (
                            <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {!load &&
                        historyData.map((history) => (
                          <tr
                            key={history.DispatchPK}
                            onClick={() => {
                              dispatch(setSelectedDispatch(null));
                            }}
                            onDoubleClick={() => {
                              dispatch(setSelectedDispatch(history.DispatchPK));
                              dispatch(resetEdit());
                              navigate("/load-history-detail/" + driverId + "/" + history.DispatchPK);
                            }}
                            className={history?.EvenRow ? "greyBackground" : "whiteBackground"}
                          >
                            <td className="f-w-600"> {history?.UnitNumber} </td>
                            <td className="f-w-600"> {history?.Customer} </td>
                            <td className="f-w-600"> {history?.CustomerPlant} </td>
                            <td className="f-w-600"> {history?.UnitType} </td>
                            <td className="f-w-600"> {history?.Special} </td>
                            <td className="f-w-600"> {history?.PickUp} </td>
                            <td className="f-w-600"> {history?.Delivery} </td>
                            <td className="f-w-600"> {history?.Miles} </td>
                            <td className="f-w-600"> {history?.PayBalance} </td>
                            <td className="f-w-600">
                              {" "}
                              {formatDatetimeToDate(history?.Dispatched, "MM/DD/YY")}
                            </td>
                            <td className="f-w-600">
                              {" "}
                              {formatDatetimeToDate(history?.Delivered, "MM/DD/YY")}
                            </td>
                            <td className="f-w-600">
                              {" "}
                              {formatDatetimeToDate(history?.Invoiced, "MM/DD/YY")}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {historyData?.length === 0 && !load && !dateLoading && (
                    <h2 className="empty-list" align="center">
                      No Records Available
                    </h2>
                  )}
                  {(load || dateLoading) && (
                    <div className="fade modal-backdrop show">
                      <div className="pos-center">
                        <div className="loader"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadHistoryList;
