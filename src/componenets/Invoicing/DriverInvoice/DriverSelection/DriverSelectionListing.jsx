import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NoRecordsMessage from "../../../common/NoRecordsMessage";
import {
  setActiveDriver,
  setChangeColor,
  setDocumentFiles,
  setDriverId,
  setInvoiceDetailsData,
  setPrint,
  setSelectedId,
  setSortType,
  setSortValue,
  setUnitFK,
  setUnitNumber,
  setUnitNumberId,
  setUnitNumberLast5,
} from "../../../../redux/DriverInvoiceSlice";
import LoadingIcon from "../../../common/LoadingIcon";
import DriverService from "../../../../services/DriverService";

function DriverSelectionListing({ loader }) {
  const driverData = useSelector((state) => state.driverInvoiceReducer.driverData);
  const driverId = useSelector((state) => state.driverInvoiceReducer.driverId);
  const selectedStatus = useSelector((state) => state.driverInvoiceReducer.selectedStatus);
  const isSelectedStatusActive = selectedStatus === "Active";
  const sortValue = useSelector((state) => state.driverInvoiceReducer.sortValue);
  const sortType = useSelector((state) => state.driverInvoiceReducer.sortType);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchRecord = (driverId) => {
    setLoading(true);
    DriverService.getDriverRecordById(driverId)

      .then((res) => {
        const data = res?.data;
        dispatch(setActiveDriver(data?.active));
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (driverId) {
      fetchRecord(driverId);
    }
  }, [driverId, isSelectedStatusActive]);

  return (
    <div className="fixTableHead border border-2 " style={{ height: "465px" }}>
      {loading && <LoadingIcon />}

      <table className="table table-striped mb-0 f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600 col-3"
              onClick={() => {
                dispatch(setSortValue("firstName"));
                if (sortType) {
                  dispatch(setSortType(false));
                } else {
                  dispatch(setSortType(true));
                }
              }}
            >
              First Name{" "}
              {sortValue === "firstName" && sortType && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "firstName" && !sortType && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-3"
              onClick={() => {
                dispatch(setSortValue("lastName"));
                if (sortType) {
                  dispatch(setSortType(false));
                } else {
                  dispatch(setSortType(true));
                }
              }}
            >
              Last Name{" "}
              {sortValue === "lastName" && sortType && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "lastName" && !sortType && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-3"
              onClick={() => {
                dispatch(setSortValue("mailingCity"));
                if (sortType) {
                  dispatch(setSortType(false));
                } else {
                  dispatch(setSortType(true));
                }
              }}
            >
              City
              {sortValue === "mailingCity" && sortType && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "mailingCity" && !sortType && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-4"
              onClick={() => {
                dispatch(setSortValue("mailingStateCode"));
                if (sortType) {
                  dispatch(setSortType(false));
                } else {
                  dispatch(setSortType(true));
                }
              }}
            >
              State
              {sortValue === "mailingStateCode" && sortType && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "mailingStateCode" && !sortType && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {loader ? (
            <tr>
              <td colSpan="4" className="text-center">
                <LoadingIcon />
              </td>
            </tr>
          ) : driverData && driverData?.length > 0 ? (
            driverData.map((data) => (
              <tr
                key={data?.driverPK}
                onClick={() => {
                  dispatch(setDriverId(data?.driverPK));
                  dispatch(setSelectedId(data?.driverPK));
                  dispatch(setDocumentFiles([]));
                  dispatch(setChangeColor(true));
                  dispatch(setInvoiceDetailsData({ type: "clear" }));
                  dispatch(setUnitFK(0));
                  dispatch(setUnitNumberId(null));
                  dispatch(setUnitNumber(""));
                  dispatch(setUnitNumberLast5(""));
                  dispatch(setPrint(false));
                }}
                onDoubleClick={() => {
                  dispatch(setDriverId(data?.driverPK));
                }}
                className={data?.driverPK === driverId ? "tableSelected" : ""}
              >
                <td className="f-w-600">{data?.firstName}</td>
                <td className="f-w-600">{data?.lastName}</td>
                <td className="f-w-600">{data?.city}</td>
                <td className="f-w-600">{data?.state}</td>
              </tr>
            ))
          ) : null}
        </tbody>
      </table>
      {loader && <LoadingIcon />}
      {loader ? "" : driverData?.length === 0 && <NoRecordsMessage />}
    </div>
  );
}

export default DriverSelectionListing;
