import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChangeColor,
  setCompanyFK,
  setCompanyName,
  setIsCrossDB,
  setShuttleType,
  setSisterUnitShuttleFK,
  setUnitNumberInput,
  setUnitNumberPK,
  setUnitShuttleData,
  setUnitShuttlePK,
  setPageNumber,
  setPickupCustomerFK,
  setYardToYardCity,
  setYardToYardState,
  setYardToYardPostCode,
} from "../../../../../redux/EditShuttleSlice";
import moment from "moment";
import { Navigate, useNavigate } from "react-router-dom";
import EditShuttleService from "../../../../../services/shuttle/process/EditShuttleService";

function EditShuttleUnitListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const unitShuttlePK = useSelector((state) => state.editShuttleReducer.unitShuttlePK);
  const unitsLoading = useSelector((state) => state.editShuttleReducer.unitsLoading);
  const driverData = useSelector((state) => state.editShuttleReducer.driverData);
  const unitNumberBrowse = useSelector((state) => state.editShuttleReducer.unitNumberBrowse);
  const companyName = useSelector((state) => state.editShuttleReducer.companyName);
  const currentCompanyName = useSelector((state) => state.editShuttleReducer.currentCompanyName);

  /**
   * get CustomerFK of Pickup Plant
   */
  const getPlantCustomer = (customerPlantsFK, companyName) => {
    EditShuttleService.getPlantCustomer(customerPlantsFK, companyName)
      .then((response) => {
        const data = response.data;
        dispatch(setPickupCustomerFK(data));
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (driverData === null || driverData === undefined || driverData.length === 0) {
      navigate("/edit-shuttle-driver");
    }
  }, [driverData]);

  return (
    <div className="fixTableHead border" style={{ height: "209px" }}>
      <table className="table table-striped  mb-0 f-w-600">
        <thead>
          <tr disabled>
            <th className="f-w-600">Date</th>
            <th className="f-w-600">Unit Number</th>
            <th className="f-w-600">Pickup</th>
            <th className="f-w-600">Delivery</th>
          </tr>
        </thead>

        {unitsLoading
          ? null
          : unitNumberBrowse?.length !== 0 && (
              <tbody>
                {unitNumberBrowse?.map((units, index) => (
                  <tr
                    id="rowId"
                    key={units.unitShuttlePK}
                    onClick={(event) => {
                      dispatch(setChangeColor(true));
                      dispatch(setPageNumber(0));
                      dispatch(setUnitNumberInput(units.unitNumber));
                      dispatch(setUnitShuttlePK(units.unitShuttlePK));
                      dispatch(setSisterUnitShuttleFK(units.sisterUnitShuttleFK));
                      dispatch(setUnitShuttleData(units));
                      dispatch(setYardToYardCity(units?.deliveryByCityState?.split(",")[0]?.trim()));
                      dispatch(setYardToYardState(units?.deliveryByCityState?.split(",")[1]?.trim()));
                      dispatch(setYardToYardPostCode(units?.deliveryByCityState?.split(",")[2]?.trim()));
                      dispatch(setUnitNumberPK(units.unitId ? units.unitId : units.sisterUnitFK));
                      dispatch(setCompanyFK(units.unitCompanyId));
                      dispatch(setCompanyName(units.unitCompanyName));
                      if (currentCompanyName !== units.unitCompanyName) {
                        dispatch(setIsCrossDB(true));
                      }
                      if (units.plantToYard) {
                        dispatch(setShuttleType("plantToYard"));
                      } else if (units.yardToPlant) {
                        dispatch(setShuttleType("yardToPlant"));
                      } else if (units.yardTransfer) {
                        dispatch(setShuttleType("yardToYard"));
                      } else if (units.plantTransfer) {
                        dispatch(setShuttleType("plantToPlant"));
                      }
                      if (units?.pickupCustomerPlantId) {
                        getPlantCustomer(units?.pickupCustomerPlantId, companyName);
                      }
                    }}
                    className={unitShuttlePK === units.unitShuttlePK ? "tableSelected" : " "}
                  >
                    <td className="f-w-600">{moment(units.shuttleDate).format("MM/DD/YY")}</td>
                    <td className="f-w-600">{units.unitNumber}</td>
                    <td className="f-w-600">{units.pickupByName}</td>
                    <td className="f-w-600">{units.deliveryByName}</td>
                  </tr>
                ))}
              </tbody>
            )}
      </table>
      {unitsLoading
        ? ""
        : unitNumberBrowse?.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>}
    </div>
  );
}

export default EditShuttleUnitListing;
