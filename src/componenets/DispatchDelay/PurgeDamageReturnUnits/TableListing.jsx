import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedId, setSortValue } from "../../../redux/PurgeDamageReturnUnitsSlice";
import { setSortFlag } from "../../../redux/PurgeDamageReturnUnitsSlice";
import NoRecordsMessage from "../../common/NoRecordsMessage";

const TableListing = () => {
  const dispatch = useDispatch();

  const loader = useSelector((state) => state.purgeDamageReturnUnits.loader);
  const listingData = useSelector((state) => state.purgeDamageReturnUnits.listingData);
  const sortValue = useSelector((state) => state.purgeDamageReturnUnits.sortValue);
  const sortFlag = useSelector((state) => state.purgeDamageReturnUnits.sortFlag);
  const selectedId = useSelector((state) => state.purgeDamageReturnUnits.selectedId);

  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));
    dispatch(setSortFlag(val));
  };

  return (
    <div className="fixTableHead border border-2 h-100  " style={{ minHeight: "250px" }}>
      <table className="table table-striped mb-0 f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("unitNumber", !sortFlag);
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
                onhandleNormalSort("model", !sortFlag);
              }}
            >
              Model
              {sortFlag && sortValue === "model" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "model" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("unitType", !sortFlag);
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
                onhandleNormalSort("pickUpName", !sortFlag);
              }}
            >
              Pickup
              {sortFlag && sortValue === "pickUpName" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "pickUpName" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("deliveryName", !sortFlag);
              }}
            >
              Delivery
              {sortFlag && sortValue === "deliveryName" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "deliveryName" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {loader
            ? null
            : listingData?.length >= 1 &&
              listingData?.map((unit) => (
                <tr
                  id="rowId"
                  onClick={() => {
                    dispatch(setSelectedId(unit.dispatchPK));
                  }}
                  className={unit.dispatchPK === selectedId ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{unit?.unitNumber}</td>
                  <td className="f-w-600">{unit?.model}</td>
                  <td className="f-w-600">{unit?.unitType || unit?.unitTypeDescription}</td>
                  <td className="f-w-600">{unit?.pickUpName || unit?.pickupPlantForDpu}</td>
                  <td className="f-w-600">{unit?.deliveryName}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader ? "" : listingData?.length === 0 && <NoRecordsMessage />}
    </div>
  );
};

export default TableListing;
