import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedId, setSortFlag, setSortValue } from "../../../../../../../redux/DispatchDocumentSlice";

const TableListing = () => {
  const dispatch = useDispatch();

  const loader = useSelector((state) => state.dispatchDocuments.loader);
  const listingData = useSelector((state) => state.dispatchDocuments.listingData);
  const sortValue = useSelector((state) => state.dispatchDocuments.sortValue);
  const sortFlag = useSelector((state) => state.dispatchDocuments.sortFlag);
  const selectedId = useSelector((state) => state.dispatchDocuments.selectedId);

  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));
    dispatch(setSortFlag(val));
  };

  return (
    <div className="fixTableHead border border-2 h-100 " style={{ height: "250px" }}>
      <table className="table table-striped f-w-600">
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
                onhandleNormalSort("pickupLocation", !sortFlag);
              }}
            >
              Pickup Location
              {sortFlag && sortValue === "pickupLocation" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "pickupLocation" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("deliveryLocation", !sortFlag);
              }}
            >
              Delivery Location
              {sortFlag && sortValue === "deliveryLocation" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "deliveryLocation" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("bolNumber", !sortFlag);
              }}
            >
              BOL Number
              {sortFlag && sortValue === "bolNumber" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "bolNumber" && (
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
                  <td className="f-w-600">{unit?.pickupLocation}</td>
                  <td className="f-w-600">{unit?.deliveryLocation}</td>
                  <td className="f-w-600">{unit?.bolNumber}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader ? (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        listingData?.length === 0 && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )
      )}
    </div>
  );
};

export default TableListing;
