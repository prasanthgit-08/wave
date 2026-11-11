import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../../../../../../componenets/common/PaginationComponent";
import UnitBrowseFooter from "./UnitBrowseFooter";
import UnitBrowseHeader from "./UnitBrowseHeader";
import {
  setTotalElements,
  setPageNumber,
  setTotalPages,
  setShortListedTrucKMap,
  setSelectedDispatchPK,
  setRatePerMile,
  setFlatRated,
  setRateObj,
  setReloadCountWithOutbound,
  setReloadDispatchPKSWithOutbound,
  setHasCodriverOrBobtaildriverPassport,
  setCanadianPickup,
  setCanadianDelivery,
} from "../../../../../../../../redux/DispatchesSlice";
import DispatchesService from "../../../../../../../../services/DispatchesService";
import DispatchHeader from "../DriverDispatchHeader";
import NoRecordsMessage from "../../../../../../../../componenets/common/NoRecordsMessage";
import LoadingIcon from "../../../../../../../common/LoadingIcon";
import TruncatedStringWithTooltip from "../../../../../../../common/TruncatedStringWithTooltip";
import { customFormatDate } from "../../../../../../../../utils/validation/DateFormatUtils";

function OutBoundUnitBrowse() {
  const dispatch = useDispatch();
  const selectedDispatchPK = useSelector((state) => state.dispatchesReducer.selectedDispatchPK);
  const pickupStateCodes = useSelector((state) => state.dispatchesReducer.pickupStateCodes);
  const isWeekendDelivery = useSelector((state) => state.dispatchesReducer.isWeekendDelivery);
  const reloadChecked = useSelector((state) => state.dispatchesReducer.reloadChecked);
  const minimumPriority = useSelector((state) => state.dispatchesReducer.minimumPriority);
  const selectedYardPK = useSelector((state) => state.dispatchesReducer.selectedYardPK);
  const selectedCustomerPK = useSelector((state) => state.dispatchesReducer.selectedCustomerPK);
  const selectedPlantPK = useSelector((state) => state.dispatchesReducer.selectedPlantPK);
  const unitNumber = useSelector((state) => state.dispatchesReducer.enteredUnitNumber);
  const driverData = useSelector((state) => state.dispatchesReducer.driverData);
  const eligibleTruckPKS = useSelector((state) => state.dispatchesReducer.eligibleTruckPKS);
  const regionStatus = useSelector((state) => state.dispatchesReducer.regionStatus);
  const divisionStatus = useSelector((state) => state.dispatchesReducer.divisionStatus);
  const pageNumber = useSelector((state) => state.dispatchesReducer.pageNumber);
  const mileageFrom = useSelector((state) => state.dispatchesReducer.mileageFrom);
  const mileageTo = useSelector((state) => state.dispatchesReducer.mileageTo);
  const reloadDispatchPKSWithOutbound = useSelector(
    (state) => state.dispatchesReducer.reloadDispatchPKSWithOutbound
  );
  const sortByRatePerMile = useSelector((state) => state.dispatchesReducer.sortByRatePerMile);
  const requireFlatbed = useSelector((state) => state.dispatchesReducer.isFlatBedRequired);
  const flatbedVisible = useSelector((state) => state.dispatchesReducer.isFlatBedVisible);
  const totalElements = useSelector((state) => state.dispatchesReducer.totalElements);
  const hasValidFlatbedTruck = useSelector((state) => state.dispatchesReducer.validFlatbedTruck);
  const hasValidFlatbedTrailer = useSelector((state) => state.dispatchesReducer.validFlatbedTrailer);
  const hasHaulAndTow = useSelector((state) => state.dispatchesReducer.validHaulAndTowTruck);

  const totalPages = useSelector((state) => state.dispatchesReducer.totalPages);
  const [unitData, setUnitData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageContent, setPageContent] = useState("");
  const selectedDriverFKForDispatch = driverData?.driverPK;
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: unitData,
  };

  const fetchDispatchesForUnitBrowse = () => {
    var driverflatbed = driverData?.flatbed ? driverData.flatbed : false;
    var isrequireFlatbedVisible =
      driverflatbed && ((hasValidFlatbedTruck && hasValidFlatbedTrailer) || hasHaulAndTow);
    setLoading(true);
    DispatchesService.fetchDispatchesForUnitBrowse(
      pageNumber,
      19,
      regionStatus,
      divisionStatus,
      pickupStateCodes,
      unitNumber,
      selectedYardPK,
      selectedCustomerPK,
      selectedPlantPK,
      selectedDriverFKForDispatch,
      eligibleTruckPKS,
      null,
      minimumPriority,
      isWeekendDelivery,
      mileageFrom,
      mileageTo,
      reloadChecked,
      null,
      sortByRatePerMile,
      null,
      null,
      requireFlatbed,
      flatbedVisible,
      isrequireFlatbedVisible
    )
      .then((response) => {
        const { data } = response;
        if (data?.dispatchUnitBrowseData) {
          setUnitData(data?.dispatchUnitBrowseData);
        }
        dispatch(setTotalElements(data?.pagination[0]?.TotalElements));
        dispatch(setTotalPages(data.pagination[0]?.TotalPages));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDispatchesForUnitBrowse();
  }, [pageNumber]);

  useEffect(() => {
    if (unitData && unitData.length >= 1 && selectedDispatchPK) {
      unitData.forEach((unit) => {
        if (unit.DispatchPK === selectedDispatchPK) {
          handleOnClick(unit);
        }
      });
    }
  }, [unitData]);

  const handleOnClick = (data) => {
    dispatch(setSelectedDispatchPK(data.DispatchPK));
    dispatch(setRatePerMile(data?.RatePerMile));
    dispatch(setReloadCountWithOutbound(data?.Reload || 0));
    dispatch(setCanadianPickup(data?.CanadianPickup));
    dispatch(setCanadianDelivery(data?.CanadianDelivery));
  };

  return (
    <div className="">
      <div
        className="add-form-component customMaintenanceFormWidth   border border-dark border-2 "
        style={{ minWidth: "1800px" }}
      >
        <DispatchHeader />
        <div className="d-flex col-12 fit-heightDispatchBrowse  " style={{ minHeight: "720px" }}>
          <div className="flex-grow-1 ">
            <div className="fixTableHead  h-100  " style={{ display: "flex", flexDirection: "column" }}>
              <table className="table border-bottom  f-w-600">
                <thead>
                  <tr>
                    <th className="f-w-600">Date</th>
                    <th className="f-w-600">Unit Number</th>
                    <th className="f-w-600">Unit Type</th>
                    <th className="f-w-600">Special</th>
                    <th className="f-w-600">Pickup</th>
                    <th className="f-w-600">Delivery</th>
                    <th className="f-w-600">Deliver By</th>
                    <th className="f-w-600">Miles</th>
                    <th className="f-w-600">Rate/Mile</th>
                    <th className="f-w-600">Customer</th>
                    <th className="f-w-600">Restricted</th>
                    <th className="f-w-600">Sat Delv</th>
                    <th className="f-w-600">Sun Delv</th>
                    <th className="f-w-600">Driver</th>
                    <th className="f-w-600">Reloads</th>
                  </tr>
                </thead>
                <tbody>
                  {unitData.length >= 1 &&
                    unitData.map((data, index) => (
                      <tr
                        className={selectedDispatchPK === data.DispatchPK ? "tableSelected" : ""}
                        onClick={() => {
                          handleOnClick(data);
                        }}
                        key={index}
                      >
                        <td>{data.Available ? customFormatDate(data.Available) : ""}</td>
                        <td>
                          <TruncatedStringWithTooltip text={data.UnitNumber} charLimit={25} />
                        </td>
                        <td>
                          <TruncatedStringWithTooltip text={data.UnitType} charLimit={25} />
                        </td>
                        <td>
                          <TruncatedStringWithTooltip text={data.Special || ""} charLimit={25} />
                        </td>
                        <td>
                          <TruncatedStringWithTooltip text={data.Pickup} charLimit={25} />
                        </td>
                        <td>
                          <TruncatedStringWithTooltip text={data.Delivery} charLimit={25} />
                        </td>
                        <td>{data.DeliveryBy ? customFormatDate(data.DeliveryBy) : ""}</td>
                        <td>{data.Miles}</td>
                        <td>{data.RatePerMile}</td>
                        <td>
                          <TruncatedStringWithTooltip text={data.Customer} charLimit={25} />
                        </td>
                        <td>{data.Restricted && data.Restricted !== "0" ? "Yes" : "No"}</td>
                        <td>{data.SatDeliv && data.SatDeliv !== "0" ? "Yes" : "No"}</td>
                        <td>{data.SunDeliv && data.SunDeliv !== "0" ? "Yes" : "No"}</td>
                        <td>{data.Driver && data.Driver !== "0" ? "Yes" : "No"}</td>
                        <td>{data.Reload}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {loading ? <LoadingIcon /> : unitData.length === 0 && <NoRecordsMessage />}
            </div>
          </div>
          <PaginationComponent
            {...paginationProps}
            recordsPerPage={3}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
            doubleArrowUp
            doubleArrowDown
            hideBorderBottom
            hideBorderRight
            hideBorderTop
            loading={loading}
          />
        </div>
        <UnitBrowseFooter />
      </div>
    </div>
  );
}

export default OutBoundUnitBrowse;
