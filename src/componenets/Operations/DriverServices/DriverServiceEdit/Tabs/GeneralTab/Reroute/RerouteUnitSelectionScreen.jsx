import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUndeliveredActiveDispatchList,
  setChangeColor,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setIsunitsLoading,
  setDispatchPK,
  setDriverFK,
  setUnitFK,
  setRerouteType,
  setIsPartialTrip,
  setPickupDealerFK,
  setPickupUnitAddressFK,
  setDeliveryDealerFK,
  setDeliveryUnitAddressFK,
  setCompanyId,
  setMiscellaneousPickup,
  setSortValue,
  setSortFlag,
  setSelectedUnitInfo,
  setMiscellaneousDelivery,
  setNavigatedFromRerouteBrowse,
  setInitialUnitCardDetails,
} from "../../../../../../../redux/RerouteSlice";
import RerouteService from "../../../../../../../services/RerouteService";
import { PaginationComponent } from "../../../../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../../../../services/constants/applicationConstants";
import QuarterScreenWrapper from "../../../../../../Templates/Screens/QuarterScreenWrapper";
import RerouteHeader from "./RerouteHeader";
import RerouteFooter from "./RerouteFooter";
import AscendingIcon from "../../../../../../common/AscendingIcon";
import DescendingIcon from "../../../../../../common/DescendingIcon";

function RerouteUnitSelectionScreen() {
  const { driverId } = useParams();
  localStorage.setItem("driverId", driverId);
  const dispatch = useDispatch();
  const currentURL = window.location.pathname;

  const dispatchPK = useSelector((state) => state.rerouteReducer.dispatchPK);
  const pageNumber = useSelector((state) => state.rerouteReducer.pageNumber);
  const totalPages = useSelector((state) => state.rerouteReducer.totalPages);
  const totalElements = useSelector((state) => state.rerouteReducer.totalElements);
  const isunitsLoading = useSelector((state) => state.rerouteReducer.isunitsLoading);
  const undeliveredActiveDispatchList = useSelector(
    (state) => state.rerouteReducer.undeliveredActiveDispatchList
  );
  const sortFlag = useSelector((state) => state.rerouteReducer.sortFlag);
  const sortValue = useSelector((state) => state.rerouteReducer.sortValue);
  const getActiveUndeliveredDispatch = (id) => {
    dispatch(setIsunitsLoading(true));
    if (id) {
      RerouteService.getAllUnitsForSelectedDriver(id, pageNumber, sortValue, sortFlag)
        .then((response) => {
          const { data } = response;
          if (data) {
            const listingData = data.filter((item) => item.Type !== "pagination");
            const paginationData = data.find((item) => item.Type === "pagination");
            dispatch(setUndeliveredActiveDispatchList(listingData || []));
            if (paginationData) {
              dispatch(setTotalElements(paginationData.TotalElements || 0));
              dispatch(setTotalPages(paginationData.TotalPages || 0));
            }
          } else {
            dispatch(setUndeliveredActiveDispatchList([]));
            dispatch(setTotalElements(0));
            dispatch(setTotalPages(0));
          }
          dispatch(setIsunitsLoading(false));
        })
        .catch((error) => {
          dispatch(setIsunitsLoading(false));
        });
    }
  };
  useEffect(() => {
    getActiveUndeliveredDispatch(driverId);
    dispatch(setDriverFK(driverId));
  }, [pageNumber, driverId, sortValue, sortFlag]);

  // On the browse page, always consider that we are "outside"
  // the reroute flow so any later page refresh will redirect back here
  useEffect(() => {
    dispatch(setNavigatedFromRerouteBrowse(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: undeliveredActiveDispatchList,
  };

  const handleNormalSort = (val, data) => {
    dispatch(setSortValue(val));
    dispatch(setSortFlag(data));
  };
  return (
    <QuarterScreenWrapper>
      <RerouteHeader />
      <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
        <div className="d-flex h-100">
          <div className="w-100">
            <div className="fixTableHead" style={{ height: "441px" }}>
              <table className="table table-striped f-w-600">
                <thead>
                  <tr disabled>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        handleNormalSort("unitNumber", !sortFlag);
                      }}
                    >
                      Unit Number
                      {sortFlag && sortValue === "unitNumber" && <AscendingIcon />}
                      {!sortFlag && sortValue === "unitNumber" && <DescendingIcon />}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        handleNormalSort("PickupLocation", !sortFlag);
                      }}
                    >
                      Pickup Location
                      {sortFlag && sortValue === "PickupLocation" && <AscendingIcon />}
                      {!sortFlag && sortValue === "PickupLocation" && <DescendingIcon />}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        handleNormalSort("DeliveryLocation", !sortFlag);
                      }}
                    >
                      Delivery Location
                      {sortFlag && sortValue === "DeliveryLocation" && <AscendingIcon />}
                      {!sortFlag && sortValue === "DeliveryLocation" && <DescendingIcon />}
                    </th>
                  </tr>
                </thead>
                {isunitsLoading
                  ? null
                  : undeliveredActiveDispatchList?.length !== 0 && (
                      <tbody>
                        {undeliveredActiveDispatchList?.map((dispatches, index) => (
                          <tr
                            id="rowId"
                            key={dispatches.dispatchPK}
                            onClick={(event) => {
                              dispatch(setSelectedUnitInfo(null));
                              dispatch(setInitialUnitCardDetails([]));
                              dispatch(setChangeColor(true));
                              dispatch(setDispatchPK(dispatches.dispatchPK));
                              dispatch(setUnitFK(dispatches.unitFK));
                              dispatch(setPickupDealerFK(dispatches.pickupDealerFK));
                              dispatch(setPickupUnitAddressFK(dispatches.pickupUnitAddressFK));
                              dispatch(setDeliveryDealerFK(dispatches.deliveryDealerFK));
                              dispatch(setDeliveryUnitAddressFK(dispatches.deliveryUnitAddressFK));
                              dispatch(setCompanyId(dispatches?.companyId || null));
                              let unitInfo = {
                                unitPK: dispatches?.unitFK,
                                companyName: dispatches?.CompanyName,
                                pickupCustomerPlantFK: dispatches?.pickupCustomerPlantFK,
                                pickupDealerFK: dispatches?.pickupDealerFK,
                                pickupUnitAddressFK: dispatches?.pickupUnitAddressFK,
                                usePlants: dispatches?.usePlants,
                                miscellaneousCustomer: dispatches?.miscellaneousCustomer,
                                deliveryCustomerPlantFK: dispatches?.deliveryCustomerPlantFK,
                                deliveryDealerFK: dispatches?.deliveryDealerFK,
                                deliveryUnitAddressFK: dispatches?.deliveryUnitAddressFK,
                                billingCustomerPlantFK: dispatches?.billingCustomerPlantFK,
                                customerFK: dispatches?.customerFK,
                                pickupAddress1: dispatches?.pickupAddress1,
                                pickupAddress2: dispatches?.pickupAddress2,
                                pickupCity: dispatches?.pickupCity,
                                pickupStateCode: dispatches?.pickupStateCode,
                                pickupPostalCode: dispatches?.pickupPostalCode,
                                deliveryAddress1: dispatches?.deliveryAddress1,
                                deliveryAddress2: dispatches?.deliveryAddress2,
                                deliveryCity: dispatches?.deliveryCity,
                                deliveryStateCode: dispatches?.deliveryStateCode,
                                deliveryPostalCode: dispatches?.deliveryPostalCode,
                                multiUnit: dispatches?.multiUnit,
                                pickupName: dispatches?.pickupName,
                                deliveryName: dispatches?.deliveryName,
                                invoiceCustomerRateFK: dispatches?.invoiceCustomerRateFK,
                                driverCustomerRateFK: dispatches?.driverCustomerRateFK,
                                unitTypeFK: dispatches?.unitTypeFK,
                                unitsPerDispatch: dispatches?.totalUnits,
                                isMilesLowBoy: dispatches?.milesLowBoy,
                                invoice2as3: dispatches?.invoice2as3,
                                invoiceRate: dispatches?.invoiceRate,
                                invoiceSupplementalRate: dispatches?.invoiceSupplementalRate,
                                invoiceAdditionalFlatRate: dispatches?.invoiceAdditionalFlatRate,
                                invoiceAdditionalRate: dispatches?.invoiceAdditionalRate,
                                invoiceLengthRate: dispatches?.invoiceLengthRate,
                                invoiceCDLARate: dispatches?.invoiceCDLARate,
                                invoiceUSCNSurcharge: dispatches?.invoiceUSCNSurcharge,
                                invoicePortEscortFee: dispatches?.invoicePortEscortFee,
                                invoiceELDFee: dispatches?.invoiceELDFee,
                                invoiceSpecialRate: dispatches?.invoiceSpecialRate,
                                driverSupplementalRate: dispatches?.driverSupplementalRate,
                                driverBaseRate: dispatches?.driverBaseRate,
                                driverAdditionalFlatRate: dispatches?.driverAdditionalFlatRate,
                                driverAdditionalRate: dispatches?.driverAdditionalRate,
                                driverLengthRate: dispatches?.driverLengthRate,
                                driverCDLARate: dispatches?.driverCDLARate,
                                driverUSCNSurcharge: dispatches?.driverUSCNSurcharge,
                                driverELDFee: dispatches?.driverELDFee,
                                driverSpecialRate: dispatches?.driverSpecialRate,
                                invoiceRateType: dispatches?.invoiceRateType,
                                driverRateType: dispatches?.driverRateType,
                                reload: dispatches?.reload,
                                returnRated: dispatches?.returnRated,
                                invoicePercentage: dispatches?.invoicePercentage,
                                creditCardPrepaid: dispatches?.creditCardPrepaid,
                                invoiceMiles: dispatches?.invoiceMiles,
                                driverMiles: dispatches?.driverMiles,
                                driverRate: dispatches?.driverRate,
                                longUnitRate: dispatches?.longUnitRate,
                                halfTonAdjustmentRate: dispatches?.halfTonAdjustmentRate,
                                driverFuelSurcharge: dispatches?.driverFuelSurcharge,
                                invoiceDriverRate: dispatches?.invoiceDriverRate,
                                invoiceDriverFuelSurchargeRate: dispatches?.invoiceDriverFuelSurchargeRate,
                                pickedUp: dispatches?.pickedUp,
                                pickupLocationCanadian: dispatches?.pickupLocationCanadian,
                                phone: dispatches?.phone,
                                contact: dispatches?.contact,
                                pickupPostalCodePK: dispatches?.pickupPostalCodePK,
                              };
                              dispatch(setSelectedUnitInfo(unitInfo));
                              if (
                                dispatches?.partialTrip ||
                                (dispatches?.pickupDealerFK === null &&
                                  dispatches?.pickupUnitAddressFK === null &&
                                  (dispatches?.deliveryDealerFK !== null ||
                                    dispatches?.deliveryUnitAddressFK !== null))
                              ) {
                                dispatch(setRerouteType("Delivery"));
                                dispatch(setIsPartialTrip(true));
                              } else {
                                if (
                                  (dispatches?.pickupDealerFK !== null ||
                                    dispatches?.pickupUnitAddressFK !== null) &&
                                  (dispatches?.deliveryDealerFK !== null ||
                                    dispatches?.deliveryUnitAddressFK !== null)
                                ) {
                                  dispatch(setRerouteType("Delivery"));
                                } else {
                                  dispatch(setRerouteType("Pickup"));
                                }
                              }
                              if (dispatches.pickupUnitAddressFK !== null) {
                                dispatch(setMiscellaneousPickup(true));
                              }
                              if (dispatches.deliveryUnitAddressFK != null) {
                                dispatch(setMiscellaneousDelivery(true));
                              }
                            }}
                            className={dispatchPK === dispatches.dispatchPK ? "tableSelected" : " "}
                          >
                            <td className="f-w-600">{dispatches.unitNumber}</td>
                            <td className="f-w-600">
                              {dispatches.pickupCity ? dispatches.pickupCity?.trim() + "," : ""}{" "}
                              {dispatches.pickupStateCode}
                            </td>
                            <td className="f-w-600">
                              {dispatches.deliveryCity ? dispatches.deliveryCity?.trim() + "," : ""}{" "}
                              {dispatches.deliveryStateCode}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
              </table>
              {isunitsLoading ? (
                <div className="fade modal-backdrop show">
                  <div className="pos-center">
                    <div className="loader"></div>
                  </div>
                </div>
              ) : (
                undeliveredActiveDispatchList?.length === 0 && (
                  <h2 className="empty-list" align="center">
                    No Records Available
                  </h2>
                )
              )}
            </div>
          </div>
          <PaginationComponent
            {...paginationProps}
            loading={isunitsLoading}
            recordsPerPage={QuarterScreen_RecordsPerPage}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
          />
        </div>
      </div>
      <RerouteFooter />
    </QuarterScreenWrapper>
  );
}

export default RerouteUnitSelectionScreen;
