import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import {
  setChangeColor,
  setEditUnitData,
  setPageNumber,
  setUnitNumberInput,
  setUnitNumberLast5,
  setUnitNumberPK,
  setViewDetail,
} from "../../../../../redux/EditYardUnitSlice";
import EditYardUnitService from "../../../../../services/shuttle/process/EditYardUnitService";
import { useEffect } from "react";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";
import LoadingText from "../../../../common/LoadingText";
import moment from "moment";

function EditYardUnitSelectionListing() {
  const dispatch = useDispatch();

  /********************************************* Redux variable declaration starts here *********************************************/

  const unitNumberLast5 = useSelector((state) => state.editYardUnitsReducer.unitNumberLast5);
  const unitNumberInput = useSelector((state) => state.editYardUnitsReducer.unitNumberInput);
  const unitNumberPK = useSelector((state) => state.editYardUnitsReducer.unitNumberPK);
  const pageNumber = useSelector((state) => state.editYardUnitsReducer.pageNumber);
  const unitDetails = useSelector((state) => state.editYardUnitsReducer.unitDetails);
  const unitsLoading = useSelector((state) => state.editYardUnitsReducer.unitsLoading);
  const changeColor = useSelector((state) => state.editYardUnitsReducer.changeColor);

  /********************************************* Redux variable declaration ends here **********************************************/

  /***************************************************  UseEffects starts here  ****************************************************/
  /**
   *  call functions on page load
   **/
  useEffect(() => {
    if (unitNumberPK === null || unitNumberPK === undefined) dispatch(setChangeColor(false));
  }, [unitNumberInput, unitNumberLast5, pageNumber]);

  /***************************************************  UseEffects ends here  ****************************************************/

  return (
    <div className="fixTableHead border" style={{ height: "458px" }}>
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th className="f-w-600">Company</th>
            <th className="f-w-600">Unit Number</th>
            <th className="f-w-600">Order Date</th>
            <th className="f-w-600">Plant</th>
            <th className="f-w-600">Unit Type</th>
          </tr>
        </thead>
        {unitsLoading
          ? null
          : unitDetails?.length !== 0 && (
              <tbody>
                {unitDetails?.map((units, index) => (
                  <tr
                    id="rowId"
                    key={units.unitPK}
                    onClick={(event) => {
                      dispatch(setChangeColor(true));
                      dispatch(setUnitNumberInput(units.unitNumber));
                      dispatch(setUnitNumberPK(units.unitPK));
                      dispatch(setEditUnitData(units));
                      dispatch(setPageNumber(0));
                    }}
                    className={unitNumberPK === units.unitPK && changeColor ? "tableSelected" : " "}
                  >
                    <td className="f-w-600">{units.unitCompanyName}</td>
                    <td className="f-w-600">{units.unitNumber}</td>
                    <td className="f-w-600">{moment(units.orderDate).format("MM/DD/YY")}</td>
                    <td className="f-w-600">{units.pickupCustomerPlantName}</td>
                    <td className="f-w-600">{units.unitType}</td>
                  </tr>
                ))}
              </tbody>
            )}
      </table>
      {unitsLoading ? "" : unitDetails?.length === 0 && <NoRecordsMessage />}
    </div>
  );
}

export default EditYardUnitSelectionListing;
