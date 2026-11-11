import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NoRecordsMessage from "../../../common/NoRecordsMessage";
import {
  setChangeColor,
  setDispatchId,
  setSaveType,
  setSortType1,
  setSortValueOfunit,
  setUnitId,
} from "../../../../redux/DriverCheckinSlice";
import { t } from "i18next";

function UnitSelectionListing({ loader }) {
  const dispatch = useDispatch();
  const unitData = useSelector((state) => state.driverCheckinReducer.unitData);
  const unitId = useSelector((state) => state.driverCheckinReducer.unitId);
  const sortValueOfunit = useSelector((state) => state.driverCheckinReducer.sortValueOfunit);
  const sortType1 = useSelector((state) => state.driverCheckinReducer.sortType1);
  const changeColor = useSelector((state) => state.driverCheckinReducer.changeColor);
  const unitSelectionLoader = useSelector((state) => state.driverCheckinReducer.unitSelectionLoader);

  return (
    <div className="fixTableHead border border-2   " style={{ minHeight: "370px" }}>
      <table className="table table-striped mb-0 f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600 col-4"
              onClick={() => {
                dispatch(setSortValueOfunit("unitNumber"));
                if (sortType1) {
                  dispatch(setSortType1(false));
                } else {
                  dispatch(setSortType1(true));
                }
              }}
            >
              Unit Number{" "}
              {sortValueOfunit === "unitNumber" && sortType1 && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValueOfunit === "unitNumber" && !sortType1 && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-4"
              onClick={() => {
                dispatch(setSortValueOfunit("pickupLocation"));
                if (sortType1) {
                  dispatch(setSortType1(false));
                } else {
                  dispatch(setSortType1(true));
                }
              }}
            >
              Pickup Location{" "}
              {sortValueOfunit === "pickupLocation" && sortType1 && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValueOfunit === "pickupLocation" && !sortType1 && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-4"
              onClick={() => {
                dispatch(setSortValueOfunit("deliveryLocation"));
                if (sortType1) {
                  dispatch(setSortType1(false));
                } else {
                  dispatch(setSortType1(true));
                }
              }}
            >
              Delivery Location
              {sortValueOfunit === "deliveryLocation" && sortType1 && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValueOfunit === "deliveryLocation" && !sortType1 && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {loader
            ? null
            : unitData.length >= 1 &&
              unitData.map((data) => (
                <tr
                  id="rowId"
                  key={data.unitPK}
                  onClick={() => {
                    dispatch(setUnitId(data.unitPK));
                    dispatch(setDispatchId(data.dispatchId));
                    dispatch(setChangeColor(true));
                    dispatch(setSaveType(""));
                  }}
                  className={data.unitPK === unitId && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600"> {data.unitNumber} </td>
                  <td className="f-w-600"> {data.pickupLocation} </td>
                  <td className="f-w-600"> {data.deliveryLocation} </td>
                </tr>
              ))}
        </tbody>{" "}
      </table>
      {unitSelectionLoader ? (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        !unitSelectionLoader &&
        unitData?.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
}

export default UnitSelectionListing;
