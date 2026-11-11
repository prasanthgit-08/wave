import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSelectedDealerShuttleData } from "../../../../../redux/YardCheckinSlice";

function DealerShuttleListing() {
  //dispatch
  const dispatch = useDispatch();

  //Get value from redux
  const allDealerShuttleData = useSelector((state) => state.yardCheckinReducer.allDealerShuttleData);
  const loader = useSelector((state) => state.yardCheckinReducer.loader);

  const [selectedDealerShuttle, setSelectedDealerShuttle] = useState("");
  const [isRowSelected, setIsRowSelected] = useState(false);

  const handleRowClick = (dealerShuttle) => {
    setSelectedDealerShuttle(dealerShuttle);
    dispatch(setSelectedDealerShuttleData(dealerShuttle));
    setIsRowSelected(true);
  };

  const renderDealerShuttleRecordsData = allDealerShuttleData?.map((dealerShuttle) => (
    <tr
      id="rowId"
      key={dealerShuttle.dispatchPK}
      onClick={() => handleRowClick(dealerShuttle)}
      className={
        isRowSelected && selectedDealerShuttle?.dispatchPK === dealerShuttle.dispatchPK ? "tableSelected" : ""
      }
    >
      <td className="f-w-600 col-2">{dealerShuttle.unitId?.unitNumber || ""}</td>
      <td className="f-w-600 col-3">
        {dealerShuttle.pickupCustomerPlant != null
          ? dealerShuttle.pickupCustomerPlant?.name
          : dealerShuttle.pickupYard != null
            ? dealerShuttle.unitId?.pickupCustomerPlantFK?.name?.trim()
            : dealerShuttle.pickupDealer != null
              ? dealerShuttle.pickupDealer?.name?.trim()
              : dealerShuttle.pickupUnitAddress != null
                ? dealerShuttle.pickupUnitAddress?.name?.trim()
                : ""}
      </td>
      <td className="f-w-600 col-2">
        {dealerShuttle.pickupCustomerPlant != null
          ? ""
          : dealerShuttle.pickupYard != null
            ? dealerShuttle.pickupYard?.description
            : dealerShuttle.deliveryYard?.description || ""}
      </td>
      <td className="f-w-600 col-3">
        {dealerShuttle.deliveryCustomerPlant?.name ||
          dealerShuttle.deliveryDealer?.name ||
          dealerShuttle.deliveryUnitAddress?.name ||
          ""}
      </td>
      <td className="f-w-600 col-2">{dealerShuttle.unitId?.unitTypeFK?.descriptionLong?.trim() || ""}</td>
    </tr>
  ));

  return (
    <div className="fixTableHead border border-1 mb-0 ">
      <table className="table table-striped mb-0">
        <thead>
          <tr disabled>
            <th className="f-w-600">Unit Number</th>
            <th className="f-w-600">Pickup</th>
            <th className="f-w-600">Yard</th>
            <th className="f-w-600">Delivery</th>
            <th className="f-w-600">Unit Type</th>
          </tr>
        </thead>
        {!loader && renderDealerShuttleRecordsData.length !== 0 && (
          <tbody>{renderDealerShuttleRecordsData}</tbody>
        )}
      </table>
      {loader ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        allDealerShuttleData.length === 0 && (
          <div style={{ height: "150px" }} className="noRecordsSmallerFont">
            No Records Available
          </div>
        )
      )}
    </div>
  );
}

export default DealerShuttleListing;
