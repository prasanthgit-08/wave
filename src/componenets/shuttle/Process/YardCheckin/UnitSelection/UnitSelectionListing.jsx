import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setUnitNumberPK,
  setUnitNumberInput,
  setSpecialCodeOfSelectedUnit,
  setIsSelectedUnitTowable,
  setIsSelectedUnitMotorized,
  setCustomerFKForPlantToPlant,
  setChangeColor,
  setPageNumber,
  setIsEligibleForBonus,
  setUnitPickupCustomerPlantFK,
  setIsEligibleForDelay,
  //Yard to Plant
  setPickupYardIDForYardToPlant,
  setPickupYardNameForYardToPlant,
  setPickupYardCodeForYardToPlant,
  setDeliveryCityIDForYardToPlant,
  setDeliveryCityNameForYardToPlant,
  setDeliveryPlantIDForYardToPlant,
  setDeliveryPlantNameForYardToPlant,
  //Plant to Yard
  setPickupCityIDForPlantToYard,
  setPickupCityNameForPlantToYard,
  setDeliveryYardIDForPlantToYard,
  setDeliveryYardNameForPlantToYard,
  setDeliveryYardCodeForPlantToYard,
  setGvwrForPlantToYard,
  //Dry Run
  setPickupCityIDForDryRun,
  setPickupCityNameForDryRun,
  setDeliveryYardIDForDryRun,
  setDeliveryYardNameForDryRun,
  setUnitData,
  //Plant to Plant
  setPickupPlantCodeForPlantToPlant,
  setDeliveryPlantCodeForPlantToPlant,
  setPickupYardNameForYardToYard,
  setPickupYardIDForYardToYard,
  setPickupPlantNameForPlantToPlant,
  setPickupPlantIDForPlantToPlant,
} from "../../../../../redux/YardCheckinSlice";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";

function UnitSelectionListing() {
  //Dispatch
  const dispatch = useDispatch();

  //Fetch value from redux
  const allUnitsData = useSelector((state) => state.yardCheckinReducer.allUnitsData);
  const unitNumberLast5 = useSelector((state) => state.yardCheckinReducer.unitNumberLast5);
  const unitNumberInput = useSelector((state) => state.yardCheckinReducer.unitNumberInput);
  const selectedDriverFK = useSelector((state) => state.yardCheckinReducer.selectedDriverID);
  const selectedDriverCompany = useSelector(
    (state) => state.yardCheckinReducer.companyNameForDriverSelection
  );
  const unitNumberPK = useSelector((state) => state.yardCheckinReducer.unitNumberPK);
  const pageNumber = useSelector((state) => state.yardCheckinReducer.pageNumber);
  const selectedUnitCompanyName = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyName);
  const loader = useSelector((state) => state.yardCheckinReducer.loader);
  const changeColor = useSelector((state) => state.yardCheckinReducer.changeColor);

  // Fetch Unit Shuttle by driver and unit
  const getUnitShuttleByDriverAndUnit = (unitNumberPK) => {
    YardCheckinService.getUnitShuttleByDriverAndUnit(selectedDriverFK, unitNumberPK, selectedDriverCompany)
      .then((response) => {
        const data = response;
        dispatch(setIsEligibleForBonus(data.data));
      })
      .catch((error) => {});
  };

  //check eligible For Delay
  const checkEligibleForDelay = (unitNumberPK) => {
    YardCheckinService.checkEligibleForDelay(unitNumberPK, selectedUnitCompanyName)
      .then((response) => {
        const data = response.data;
        dispatch(setIsEligibleForDelay(data));
      })
      .catch((error) => {});
  };

  /***** call functions on page load *****/
  useEffect(() => {
    if (unitNumberPK === null || unitNumberPK === undefined) dispatch(setChangeColor(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitNumberInput, unitNumberLast5, pageNumber]);

  const renderUnitListingData = allUnitsData?.map((unit) => (
    <tr
      id="rowId"
      key={unit.unitPK}
      onClick={() => {
        dispatch(setPageNumber(0));
        dispatch(setChangeColor(true));
        dispatch(setUnitData(unit));
        dispatch(setUnitNumberPK(unit.unitPK ?? ""));
        dispatch(setUnitNumberInput(unit.unitNumber ?? ""));
        dispatch(setSpecialCodeOfSelectedUnit(unit.specialCode ?? ""));
        dispatch(setIsSelectedUnitTowable(unit.unitTypeTowable ?? ""));
        dispatch(setIsSelectedUnitMotorized(unit.unitTypeMotorized ?? ""));
        dispatch(setCustomerFKForPlantToPlant(unit.customerIntFK ?? ""));
        dispatch(setUnitPickupCustomerPlantFK(unit.customerIntFK ?? ""));

        //Yard to City
        dispatch(setPickupYardIDForYardToPlant(unit.pickupYardIntFK ?? ""));
        dispatch(setPickupYardNameForYardToPlant(unit.pickupYardName?.trim() ?? ""));
        dispatch(setPickupYardCodeForYardToPlant(unit.pickupYardCode ?? ""));
        dispatch(setDeliveryCityIDForYardToPlant(unit.pickupShuttleCityIntFK ?? ""));
        dispatch(setDeliveryCityNameForYardToPlant(unit.pickupShuttleCityName?.trim() ?? ""));

        dispatch(setDeliveryPlantIDForYardToPlant(unit.pickupCustomerPlantIntFK || unit.customerPlantIntFK));
        dispatch(
          setDeliveryPlantNameForYardToPlant(
            unit.pickupCustomerPlantName?.trim() || unit.customerPlantName?.trim()
          )
        );

        //Plant to Yard
        dispatch(setPickupCityIDForPlantToYard(unit.pickupShuttleCityIntFK ?? ""));
        dispatch(setPickupCityNameForPlantToYard(unit.pickupShuttleCityName?.trim() ?? ""));
        dispatch(setDeliveryYardIDForPlantToYard(unit.pickupYardIntFK ?? ""));
        dispatch(setDeliveryYardNameForPlantToYard(unit.pickupYardName?.trim() ?? ""));
        dispatch(setDeliveryYardCodeForPlantToYard(unit.pickupYardCode ?? ""));
        dispatch(setGvwrForPlantToYard(unit.gvwr ?? ""));

        //Yard To Yard
        dispatch(setPickupYardNameForYardToYard(unit.pickupYardName?.trim() || ""));
        dispatch(setPickupYardIDForYardToYard(unit.pickupYardIntFK || ""));

        //Plant to Plant
        dispatch(setPickupPlantNameForPlantToPlant(unit.pickupCustomerPlantName?.trim() || ""));
        dispatch(setPickupPlantIDForPlantToPlant(unit.pickupCustomerPlantIntFK || ""));

        //Dry Run
        if (unit.pickupAtPlant && unit.shuttleToYard) {
          dispatch(setPickupCityIDForDryRun(unit.pickupShuttleCityIntFK ?? ""));
          dispatch(setPickupCityNameForDryRun(unit.pickupShuttleCityName ?? ""));
          dispatch(setDeliveryYardIDForDryRun(unit.pickupYardIntFK ?? ""));
          dispatch(setDeliveryYardNameForDryRun(unit.pickupYardName?.trim() ?? ""));
        }

        dispatch(setPickupPlantCodeForPlantToPlant(unit.pickupPlantCode));
        dispatch(setDeliveryPlantCodeForPlantToPlant(unit.deliveryPlantCode));

        //Fetch Unit Shuttle by driver and unit for applying bonus
        getUnitShuttleByDriverAndUnit(unit.unitPK ?? "");
        checkEligibleForDelay(unit.unitPK ?? "");
      }}
      //onDoubleClick={(event) => {}}
      className={unit.unitPK === unitNumberPK && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600">{unit.unitNumber}</td>
      <td className="f-w-600">{moment(unit.orderDate).format("MM/DD/YY")}</td>
      <td className="f-w-600">{unit.pickupCustomerPlantName || unit.customerPlantName}</td>
      <td className="f-w-600">{unit.unitType}</td>
    </tr>
  ));
  return (
    <div className="fixTableHead  ">
      <table className="table table-striped mb-0 f-w-600">
        <thead>
          <tr disabled>
            <th className="f-w-600">Unit Number</th>
            <th className="f-w-600">Order Date</th>
            <th className="f-w-600">Plant</th>
            <th className="f-w-600">Unit Type</th>
          </tr>
        </thead>

        {!loader && allUnitsData?.length !== 0 && <tbody>{renderUnitListingData}</tbody>}
      </table>
      {loader ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        (allUnitsData?.length === 0 || !allUnitsData) && (
          <div className="noRecordsSmallerFont">No Records Available</div>
        )
      )}
    </div>
  );
}

export default UnitSelectionListing;
