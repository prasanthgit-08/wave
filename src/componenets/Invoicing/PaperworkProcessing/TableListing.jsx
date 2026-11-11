/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import NoRecordsMessage from "../../common/NoRecordsMessage";

const TableListing = ({
  loading = false,
  listingData,
  renderItemId,
  onTableRowDoubleClick,
  onTableRowSingleClick = () => {},
  tableRowclassName,
  tableHeight = "200px",
  selectedId,
  errorCheck = false,
}) => {
  return (
    <div
      className="fixTableHead border border-secondary"
      style={{ overflowY: "auto", height: `${tableHeight}` }}
    >
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th className="f-w-600" onClick={() => {}}>
              Unit Number
            </th>
            <th className="f-w-600" onClick={() => {}}>
              Unit Type
            </th>
            <th className="f-w-600" onClick={() => {}}>
              Customer
            </th>
            <th className="f-w-600" onClick={() => {}}>
              Pickup
            </th>
            <th className="f-w-600" onClick={() => {}}>
              Delivery
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            listingData?.length > 0 &&
            listingData?.map((element, index) => (
              <tr
                id="rowId"
                key={(renderItemId && renderItemId(element)) || element.unitPK}
                onClick={(e) => onTableRowSingleClick(element, index, e)}
                onDoubleClick={(e) => onTableRowDoubleClick(element, index, e)}
                className={`${tableRowclassName} ${selectedId === ((renderItemId && renderItemId(element)) || element.unitPK) && !((element.unitOnInvoiceHold || !element?.deliveredDate) && errorCheck) && !loading ? "tableSelected" : ""} ${(element.unitOnInvoiceHold || !element?.deliveredDate) && errorCheck && !loading ? "driverComplainceItemsDateCheck" : ""} `}
              >
                <td className="f-w-600">{element.unitNumber}</td>
                <td className="f-w-600">{element.descriptionLong}</td>
                <td className="f-w-600">{element.name}</td>
                <td className="f-w-600">
                  {element.isShuttle && element.invoiceShuttle
                    ? element.shuttlePickupPlantName
                      ? element.shuttlePickupPlantName?.trim()
                      : element.shuttlePickupYardName
                        ? element.shuttlePickupYardName?.trim()
                        : ""
                    : element.pickupDealerName
                      ? element.pickupDealerName?.trim()
                      : element.pickupPlantName
                        ? element.pickupPlantName?.trim()
                        : element.pickupUnitAddressName
                          ? element.pickupUnitAddressName
                          : ""}
                </td>
                <td className="f-w-600">
                  {element.isShuttle && element.invoiceShuttle
                    ? element.shuttleDeliveryPlantName
                      ? element.shuttleDeliveryPlantName?.trim()
                      : element.shuttleDeliveryYardName
                        ? element.shuttleDeliveryYardName?.trim()
                        : ""
                    : element.deliveryDealerName
                      ? element.deliveryDealerName?.trim()
                      : element.deliveryPlantName
                        ? element.deliveryPlantName?.trim()
                        : element.deliveryUnitAddressName
                          ? element.deliveryUnitAddressName
                          : ""}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading ? null : (!listingData || listingData?.length === 0) && <NoRecordsMessage />}
    </div>
  );
};

export default TableListing;
