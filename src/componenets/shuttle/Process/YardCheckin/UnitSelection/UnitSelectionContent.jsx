import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import UnitSelectionListing from "./UnitSelectionListing";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import {
  setUnitDefaultCompanyName,
  setSelectedUnitCompanyName,
  setSelectedUnitCompanyFK,
  setAllUnitsData,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setLoader,
  setUnitNumberLast5,
  setUnitNumberInput,
  setUnitNumberPK,
  setChangeColor,
  setIsSelectedUnitTowable,
  setIsSelectedUnitMotorized,
  setPickupCityIDForPlantToYard,
  setDeliveryYardIDForPlantToYard,
  setUnitData,
  setSpecialCodeOfSelectedUnit,
  setCustomerFKForPlantToPlant,
  setPickupYardIDForYardToPlant,
  setPickupYardNameForYardToPlant,
  setPickupYardCodeForYardToPlant,
  setDeliveryCityIDForYardToPlant,
  setDeliveryCityNameForYardToPlant,
  setPickupCityNameForPlantToYard,
  setDeliveryYardNameForPlantToYard,
  setDeliveryYardCodeForPlantToYard,
  setGvwrForPlantToYard,
  setPickupCityIDForDryRun,
  setPickupCityNameForDryRun,
  setDeliveryYardIDForDryRun,
  setDeliveryYardNameForDryRun,
  setPickupPlantCodeForPlantToPlant,
  setDeliveryPlantCodeForPlantToPlant,
  setIsEligibleForBonus,
  setDeliveryPlantNameForYardToPlant,
  setDeliveryPlantIDForYardToPlant,
  setPickupYardNameForYardToYard,
  setPickupYardIDForYardToYard,
  setPickupPlantNameForPlantToPlant,
  setPickupPlantIDForPlantToPlant,
} from "../../../../../redux/YardCheckinSlice";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import LookupButton from "../../../../common/LookupButton";
import UnitSelectionLookup from "../../../../LookupScreens/UnitSelection/UnitSelectionLookup";
import { setListingData } from "../../../../../redux/YardCheckinSecondShuttleSlice";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import LoadingIcon from "../../../../common/LoadingIcon";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";

function UnitSelectionContent() {
  //navigate, dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Local State Declaration
  const selectedDriverFK = useSelector((state) => state.yardCheckinReducer.selectedDriverID);
  const selectedDriverCompany = useSelector(
    (state) => state.yardCheckinReducer.companyNameForDriverSelection
  );
  const [selectedDriverName, setSelectedDriverName] = useState("");
  const [companyNames, setCompanyNames] = useState([]);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [companyNameFK, setCompanyNameFK] = useState("");
  const [allUnitNumbers, setAllUnitNumbers] = useState([]);
  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);
  const [unitNumberLoading, setUnitNumberLoading] = useState(false);
  const [unitsLoading, setUnitsLoading] = useState(false);

  //Get Value From Redux
  const selectedDriverData = useSelector((state) => state.yardCheckinReducer.selectedDriver);
  const allUnitsData = useSelector((state) => state.yardCheckinReducer.allUnitsData);
  const selectedUnitCompanyName = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyName);
  const pageNumber = useSelector((state) => state.yardCheckinReducer.pageNumber);
  const totalPages = useSelector((state) => state.yardCheckinReducer.totalPages);
  const totalElements = useSelector((state) => state.yardCheckinReducer.totalElements);
  const unitNumberLast5 = useSelector((state) => state.yardCheckinReducer.unitNumberLast5);
  const unitNumberInput = useSelector((state) => state.yardCheckinReducer.unitNumberInput);
  const unitNumberPK = useSelector((state) => state.yardCheckinReducer.unitNumberPK);
  const cancelChanges = useSelector((state) => state.yardCheckinReducer.cancelChanges);
  const listingData = useSelector((state) => state.yardCheckinSecondShuttleReducer.listingData);
  const selectedDriverCompanyID = useSelector((state) => state.yardCheckinReducer.selectedDriverCompanyID);
  const isUnitShuttleONEUnique = useSelector((state) => state.yardCheckinReducer.isUnitShuttleONEUnique);
  const unitNumberSelected = useSelector((state) => state.yardCheckinReducer.unitNumberInput);
  const loader = useSelector((state) => state.yardCheckinReducer.loader);
  const towable = useSelector((state) => state.yardCheckinReducer.towable);
  const motorized = useSelector((state) => state.yardCheckinReducer.motorized);

  //Props for Pagination component
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: allUnitsData,
  };

  /****** Company Names dropdown******/
  // Fetch all company names

  const getCompanyNames = () => {
    DelayProcessingService.getAllCompanyData()
      .then((res) => {
        if (res?.data) {
          setCompanyNames(res?.data);

          if (!companyNameFK) {
            const value = res?.data?.find((item) => item.LocalCompany === true);
            dispatch(setUnitDefaultCompanyName(value.Name));
            setCompanyNameFK(value.CompanyPK);
            setSelectedCompanyName(value.Name);
          }
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  /****** Unit Number dropdown and lookup ******/
  //Fetch all Unit Number for Auto Complete dropdown
  const getAllUnitNumbers = (string) => {
    setUnitNumberLoading(true);
    let last5 = unitNumberLast5;
    if (unitNumberPK) {
      last5 = "";
    }
    YardCheckinService.getAllUnitNumbers(string, last5, 0, 100, selectedCompanyName, motorized, towable)
      .then((response) => {
        const data = response.data.content;
        const unitNumberList = data?.map((units) => ({ ...units, unitNumber: units.unitNumber?.trim() }));
        setAllUnitNumbers(unitNumberList);
        if (string !== "" && unitNumberPK === null) {
          dispatch(setPageNumber(0));
        }
        setUnitNumberLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setUnitNumberLoading(false);
      });
  };

  //Fetch Unit Number for browse list
  const getAllUnitNumbersList = () => {
    dispatch(setLoader(true));
    YardCheckinService.getAllUnitNumbers(
      unitNumberInput,
      unitNumberLast5,
      pageNumber,
      10,
      selectedCompanyName,
      motorized,
      towable
    )
      .then((response) => {
        const { data } = response;
        dispatch(setAllUnitsData(data.content || []));
        dispatch(setTotalElements(data.totalElements || 0));
        dispatch(setTotalPages(data.totalPages || 0));
        dispatch(setLoader(false));
      })
      .catch((error) => {
        dispatch(setLoader(false));
      });
  };

  // Fetch Unit Shuttle by driver and unit
  const getUnitShuttleByDriverAndUnit = (unitNumberPK) => {
    YardCheckinService.getUnitShuttleByDriverAndUnit(selectedDriverFK, unitNumberPK, selectedDriverCompany)
      .then((response) => {
        const data = response;
        dispatch(setIsEligibleForBonus(data.data));
      })
      .catch((error) => {});
  };

  const handleUnitNumberSelection = (unit) => {
    dispatch(setPageNumber(0));
    dispatch(setUnitData(unit));
    dispatch(setUnitNumberLast5(""));
    dispatch(setUnitNumberPK(unit.unitPK));
    dispatch(setUnitNumberInput(unit.unitNumber));
    dispatch(setChangeColor(true));
    setShowUnitSelectionLookup(false);

    //Unit Details
    dispatch(setPageNumber(0));
    dispatch(setChangeColor(true));
    dispatch(setUnitData(unit));
    dispatch(setUnitNumberPK(unit.unitPK ?? ""));
    dispatch(setUnitNumberInput(unit.unitNumber ?? ""));
    dispatch(setSpecialCodeOfSelectedUnit(unit.specialCode ?? ""));
    dispatch(setIsSelectedUnitTowable(unit.unitTypeTowable ?? ""));
    dispatch(setIsSelectedUnitMotorized(unit.unitTypeMotorized ?? ""));
    dispatch(setCustomerFKForPlantToPlant(unit.customerIntFK ?? ""));

    //Yard to City
    dispatch(setPickupYardIDForYardToPlant(unit.pickupYardIntFK || ""));
    dispatch(setPickupYardNameForYardToPlant(unit.pickupYardName || ""));
    dispatch(setPickupYardCodeForYardToPlant(unit.pickupYardCode || ""));
    dispatch(setDeliveryCityIDForYardToPlant(unit.pickupShuttleCityIntFK || ""));
    dispatch(setDeliveryCityNameForYardToPlant(unit.pickupShuttleCityName || ""));
    dispatch(
      setDeliveryPlantNameForYardToPlant(unit.pickupCustomerPlantName || unit.customerPlantName || "")
    );
    dispatch(
      setDeliveryPlantIDForYardToPlant(unit.pickupCustomerPlantIntFK || unit.customerPlantIntFK || "")
    );

    //Plant to Yard
    dispatch(setPickupCityIDForPlantToYard(unit.pickupShuttleCityIntFK || ""));
    dispatch(setPickupCityNameForPlantToYard(unit.pickupShuttleCityName || ""));
    dispatch(setDeliveryYardIDForPlantToYard(unit.pickupYardIntFK || ""));
    dispatch(setDeliveryYardNameForPlantToYard(unit.pickupYardName || ""));
    dispatch(setDeliveryYardCodeForPlantToYard(unit.pickupYardCode || ""));
    dispatch(setGvwrForPlantToYard(unit.gvwr || ""));

    //Yard To Yard
    dispatch(setPickupYardNameForYardToYard(unit.pickupYardName || ""));
    dispatch(setPickupYardIDForYardToYard(unit.pickupYardIntFK || ""));

    //Plant to Plant
    dispatch(
      setPickupPlantNameForPlantToPlant(
        unit.pickupCustomerPlantName?.trim() || unit.customerPlantName?.trim() || ""
      )
    );
    dispatch(setPickupPlantIDForPlantToPlant(unit.pickupCustomerPlantIntFK || unit.customerPlantIntFK || ""));

    //Dry Run
    dispatch(setPickupCityIDForDryRun(unit.pickupShuttleCityIntFK ?? ""));
    dispatch(setPickupCityNameForDryRun(unit.pickupShuttleCityName ?? ""));
    dispatch(setDeliveryYardIDForDryRun(unit.pickupYardIntFK ?? ""));
    dispatch(setDeliveryYardNameForDryRun(unit.pickupYardName ?? ""));

    dispatch(setPickupPlantCodeForPlantToPlant(unit.pickupPlantCode));
    dispatch(setDeliveryPlantCodeForPlantToPlant(unit.deliveryPlantCode));

    //Fetch Unit Shuttle by driver and unit for applying bonus
    getUnitShuttleByDriverAndUnit(unit.unitPK ?? "");
  };

  /*** call functions on page load ***/
  useEffect(() => {
    if (selectedCompanyName) {
      if (unitNumberLast5 && unitNumberLast5.length === 5) {
        getAllUnitNumbersList();
      } else if (!unitNumberLast5) {
        getAllUnitNumbersList();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitNumberLast5, pageNumber, selectedCompanyName, unitNumberInput]);

  /*** UseEffects ***/
  // UseEffect for setting selected Driver Name in local state
  useEffect(() => {
    if (selectedDriverData) {
      const fullName = `${selectedDriverData.firstName ? selectedDriverData.firstName?.trim() : ""} ${
        selectedDriverData.lastName ? selectedDriverData.lastName?.trim() : ""
      }`;
      setSelectedDriverName(fullName?.trim());
    }
  }, [selectedDriverData]);

  useEffect(() => {
    getCompanyNames();
  }, []);

  useEffect(() => {
    dispatch(setAllUnitsData([]));
    dispatch(setUnitNumberInput(""));
    setAllUnitNumbers([]);
    dispatch(setUnitNumberLast5(""));
    dispatch(setPageNumber(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompanyName]);

  // If unit number is not valid
  useEffect(() => {
    if (allUnitsData?.length === 0) {
      dispatch(setIsSelectedUnitTowable(""));
      dispatch(setIsSelectedUnitMotorized(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allUnitsData]);

  //dispatch selected unit company name and unit company FK.
  useEffect(() => {
    dispatch(setSelectedUnitCompanyName(selectedCompanyName));
    dispatch(setSelectedUnitCompanyFK(companyNameFK));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompanyName, companyNameFK]);

  // On page refresh navigates to initial page
  useEffect(() => {
    if (selectedDriverData === "") {
      navigate("/yard-checkin-driver-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDriverData]);

  /*For checking if records are present in Dispatch table for the unit with isShuttle and Active true*/
  const fetchSecondShuttleBrowseData = () => {
    YardCheckinService.getSecondShuttleBrowse(
      unitNumberPK,
      selectedUnitCompanyName,
      selectedDriverCompanyID,
      0,
      QuarterScreen_RecordsPerPage,
      "",
      false
    )
      .then((response) => {
        const { data } = response;
        dispatch(setListingData(data?.secondShuttleBrowse || []));
      })
      .catch((err) => {});
  };
  useEffect(() => {
    if (!selectedUnitCompanyName || !unitNumberPK) return;
    fetchSecondShuttleBrowseData();
  }, [unitNumberPK, selectedUnitCompanyName]);

  return (
    <div className="w-100 p-2">
      {(unitNumberLoading || loader) && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Col className="p-15 " xs={7}>
              {/* Driver */}
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-end">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Driver
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    id="selectedDriverName"
                    name="selectedDriverName"
                    value={selectedDriverName}
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>

              {/* Unit Company */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-end">
                  <Form.Label className="col-form-label me-4">Unit Company</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <Form.Select
                    className="customFormControl p-"
                    value={`${companyNameFK}-${selectedCompanyName}`}
                    onChange={(e) => {
                      const [companyId, companyName] = e.target.value.split("-");
                      setCompanyNameFK(companyId);
                      setSelectedCompanyName(companyName);
                    }}
                  >
                    {companyNames?.map((item) => (
                      <option key={item.CompanyPK} value={`${item.CompanyPK}-${item.Name}`}>
                        {item.Name.toUpperCase()}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              {/* Last 5 */}
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-end">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Last 5
                  </Form.Label>
                </Col>

                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    className="customFormControl"
                    name="unitNumberLast5"
                    type="text"
                    maxLength={5}
                    value={unitNumberLast5}
                    onChange={(e) => {
                      dispatch(setUnitNumberPK(""));
                      dispatch(setUnitNumberInput(""));
                      dispatch(setPageNumber(0));
                      dispatch(setUnitNumberLast5(e.target.value));
                    }}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>

              {/* Unit Number */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-end">
                  <Form.Label className="col-form-label me-4">Unit Number</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  {/* Unit Number Autocomplete */}
                  <AutoCompleteDropdown
                    arrayList={allUnitNumbers}
                    searchString={unitNumberInput}
                    renderItemId={(units) => units.unitPK}
                    maxLength={21}
                    renderItemField={(units) => units.unitNumber}
                    handleSearchString={(string) => dispatch(setUnitNumberInput(string))}
                    fetchDataBySearchString={(string) => getAllUnitNumbers(string, unitNumberLast5)}
                    onSelect={handleUnitNumberSelection}
                    selectedId={unitNumberPK}
                    loading={unitNumberLoading}
                    clearInputCallback={() => {
                      dispatch(setPageNumber(0));
                      dispatch(setUnitNumberPK(""));
                      dispatch(setPickupCityIDForPlantToYard(""));
                      dispatch(setDeliveryYardIDForPlantToYard(""));
                    }}
                    handleAutoCompleteClose={() => {
                      dispatch(setUnitNumberPK(""));
                      dispatch(setUnitNumberLast5(""));
                    }}
                    className={`${(unitNumberPK === "" || unitNumberInput === "") && !(allUnitsData?.length === 0 && unitNumberSelected.length >= 5 && isUnitShuttleONEUnique) ? "borderRed" : "borderGreen"}`}
                  />
                  <LookupButton onClick={() => setShowUnitSelectionLookup(true)} />
                </Col>
              </Form.Group>
            </Col>
            {/* Unit Number Browse list */}
            <Col className="px-4 py-2">
              <div className="row border border-dark border-1">
                <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
                  <div className="d-flex h-100">
                    <div className="w-100">
                      <UnitSelectionListing />
                    </div>
                    {/* Pagination Component */}
                    <PaginationComponent
                      {...paginationProps}
                      loading={loader}
                      firstPage
                      lastPage
                      singleArrowUp
                      singleArrowDown
                      recordsPerPage={5}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <UnitSelectionLookup
              show={showUnitSelectionLookup}
              onHide={() => setShowUnitSelectionLookup(false)}
              YardCheckin
              unitCompanyName={selectedUnitCompanyName}
              handleLookupSelection={handleUnitNumberSelection}
              motorized={motorized}
              towable={towable}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnitSelectionContent;
