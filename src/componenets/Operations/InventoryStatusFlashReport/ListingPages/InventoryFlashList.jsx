import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InventoryStatusFlashService from "../../../../services/InventoryStatusFlashService";
import { setKeys, setListingData, setPageNumber } from "../../../../redux/InventoryStatusFlashReportSlice";
import usePagination from "../../../../hooks/usePagination";
import { formatDatetimeToDate } from "../../../../utils/dateUtils";

const InventoryFlashList = ({ displayData, loading, setLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    outboundTowableSingle,
    outboundTowableMultiUnit,
    outboundMotorized,
    reloadTowableSingle,
    reloadTowableMultiUnit,
    reloadMotorized,
    listingData,
  } = useSelector((state) => state.inventoryStatusFlashReportSlice);

  const params = {
    "Outbound Towable Single": outboundTowableSingle || false,
    "Outbound Towable MultiUnit": outboundTowableMultiUnit || false,
    "Outbound Motorized": outboundMotorized || false,
    "Reload Towable Single": reloadTowableSingle || false,
    "Reload Towable MultiUnit": reloadTowableMultiUnit || false,
    "Reload Motorized": reloadMotorized || false,
  };

  useEffect(() => {
    if (
      outboundMotorized ||
      outboundTowableMultiUnit ||
      outboundTowableSingle ||
      reloadMotorized ||
      reloadTowableMultiUnit ||
      reloadTowableSingle
    ) {
      setLoading(true);
      InventoryStatusFlashService.getListingData(params)
        .then(({ data }) => {
          dispatch(setListingData(data));
          setLoading(false);
        })
        .catch(() => {
          dispatch(setListingData([]));
        });
    } else {
      navigate("/inventory-status-flash-selection");
    }
  }, []);

  useEffect(() => {
    const tempKey = Object.keys(listingData); // Extract all keys
    dispatch(setKeys(tempKey));

    dispatch(setPageNumber(tempKey.reduce((acc, key) => ({ ...acc, [key]: 0 }), {})));
  }, [listingData]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th className="f-w-600"> Status </th>
            <th className="f-w-600"> Units </th>
            <th className="f-w-600"> Order Date </th>
            <th className="f-w-600"> Unit Number </th>
          </tr>
        </thead>
        {!loading && displayData.length !== 0 && (
          <tbody>
            {displayData.map((data) => (
              <tr id="rowId" key={data.Category}>
                <td className="f-w-600">{data.Category}</td>
                <td className="f-w-600">{data.TotalCount}</td>
                <td className="f-w-600">{formatDatetimeToDate(data.OldestOrderDate, "MM/DD/YY")}</td>
                <td className="f-w-600">{data.UnitNumber}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {!loading && displayData.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
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

export default InventoryFlashList;
