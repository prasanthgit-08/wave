import React, { useEffect, useRef, useState } from "react";
import DriverTrailerLookup from "../../../../../../LookupScreens/DriverTrailer/DriverTrailerLookup";
import { Col, Form, Modal } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../../common/LookupButton";
import DateInputField from "../../../../../../common/DateInputField";
import DriverDOTInspectionService from "../../../../../../../services/Compliance/DriverDOTInspectionService";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetEditGeneralTab,
  setEditGeneralTabValid,
  setMaintenanceViolation,
  setNewGeneralTabValid,
  setSaveFormData,
  setStateCode,
  setUsCity,
  setViewdetail,
  setpostalCodePK,
  setDaysTillHold as setDaysTillHoldRedux,
  setComplianceHold as setComplianceHoldRedux,
} from "../../../../../../../redux/Compliance/DriverDOTInspectionSlice";
import PortsOfEntryService from "../../../../../../../services/PortsOfEntryService";
import DriverTruckLookup from "../../../../../../LookupScreens/DriverTruck/DriverTruckLookup";
import LoadingIcon from "../../../../../../common/LoadingIcon";
import { preventNegative } from "../../../../../../../utils/utils";
import Input from "../../../../../../../components/common/input";
import PostalCodeComponent from "../../../../../../common/PostalCodeComponent";

const DOTEditGeneral = () => {
  const { driverId, dotInspectionPK } = useParams();
  const dispatch = useDispatch();
  const [driverDotInspectionData, setDriverDotInspectionData] = useState();
  const [postalOptions, setPostalOptions] = useState([]);
  const [currentLocationPostalCode, setCurrentLocationPostalCode] = useState("");
  const [truckId, setTruckId] = useState(null);
  const [truckInput, setTruckInput] = useState("");
  const [trailerId, setTrailerId] = useState(null);
  const [trailerInput, setTrailerInput] = useState("");
  const [inspectionDate, setInspectionDate] = useState(null);
  const [isInspectionDateValid, setIsInspectionDateValid] = useState(true);
  const [isResponseDateValid, setIsResponseDateValid] = useState(true);
  const [dotInspectionData, setDotInspectionData] = useState(null);
  const [reportNumber, setReportNumber] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [hoursOfServiceViolation, setHoursOfServiceViolation] = useState(false);
  const [unsafeDrivingViolation, setUnsafeDrivingViolation] = useState(false);
  const [physicalFitnessViolation, setPhysicalFitnessViolation] = useState(false);
  const [drugAlcoholViolation, setDrugAlcoholViolation] = useState(false);
  const [notifiedByDOT, setNotifiedByDOT] = useState(false);
  const [finedByDOT, setFinedByDOT] = useState(false);
  const [driverDOTFine, setDriverDOTFine] = useState(0);
  const [companyDOTFine, setCompanyDOTFine] = useState(0);
  const [awardDriver, setAwardDriver] = useState(false);
  const [awardAmount, setAwardAmount] = useState(0);
  const [defaultAwardAmount, setDefaultAwardAmount] = useState(0);
  const [awardSafetyMiles, setAwardSafetyMiles] = useState(0);
  const [defaultAwardSafetyMiles, setDefaultAwardSafetyMiles] = useState(0);
  const [driverFined, setDriverFined] = useState(false);
  const [fineAmount, setFineAmount] = useState(0);
  const [inspectionFineAmount, setinspectionFineAmount] = useState(0);
  const [defaultFineAmount, setDefaultFineAmount] = useState(0);
  const [fineSafetyMiles, setFineSafetyMiles] = useState(0);
  const [defaultFineSafetyMiles, setDefaultFineSafetyMiles] = useState(0);
  const [responseDate, setResponseDate] = useState("");
  const [driverReportedFine, setDriverReportedFine] = useState(0);
  const [dotInspectionHosFine, setDotInspectionHosFine] = useState(0);
  const [daysTillHold, setDaysTillHold] = useState("");
  const [complianceHold, setComplianceHold] = useState(false);
  const initialDriverFinedRef = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [truckLoading, setTruckLoading] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [showTrailerLookup, setShowTrailerLookup] = useState(false);
  const [trailerList, setTrailerList] = useState([]);
  const [showTruckLookup, setShowTruckLookup] = useState(false);
  const [truckList, setTruckList] = useState([]);
  const [isApiPending, setIsApiPending] = useState(false);
  const [isUsStateTrue, setIsUsStateTrue] = useState(false);
  const [isPostalData, setPostalData] = useState(false);
  const [statesList, setStateList] = useState([]);
  const [checkOnvalue, setCheckOnValue] = useState(false);
  const [selectedCityUS, setSelectedCityUS] = useState("");
  const [selectedStateCodeUS, setSelectedStateCodeUS] = useState("");
  const [selectedPostalCodePK, setSelectedPostalCodePK] = useState(null);
  const [editFlag, setEditFlag] = useState(true);
  const [isNuetralRecord, setIsNuetralRecord] = useState(false);
  const [minAmount, setMinAmount] = useState("");
  const [tempCheck, setTempCheck] = useState(false);
  const [fineAmountFlag, setFineAmountFlag] = useState(true);
  const [postalCodePkView, setpostalCodePkView] = useState(null);
  const didInitHold = useRef(false);

  const truckData = useSelector((state) => state.driverDOTInspection.truckData);
  const searchTerm = useSelector((state) => state.driverDOTInspection.searchTerm);
  const searchCriteria = useSelector((state) => state.driverDOTInspection.searchCriteria);
  const sortValue = useSelector((state) => state.driverDOTInspection.sortValue);
  const sortType = useSelector((state) => state.driverDOTInspection.sortType);
  const pageNumber = useSelector((state) => state.driverDOTInspection.pageNumber);
  const type = useSelector((state) => state.driverDOTInspection.type);
  const usCity = useSelector((state) => state.driverDOTInspection.usCity);
  const stateCode = useSelector((state) => state.driverDOTInspection.stateCode);
  const driverFK = useSelector((state) => state.driverDOTInspection.driverFK);
  const maintenanceViolation = useSelector((state) => state.driverDOTInspection.maintenanceViolation);
  const viewDetail = useSelector((state) => state.driverDOTInspection.viewDetail);
  const postalCodePK = useSelector((state) => state.driverDOTInspection.postalCodePK);

  const fetchDriverDOTInspectionDetails = () => {
    setIsLoading(true);
    DriverDOTInspectionService.getDriverDOTInspectionDetails({
      driverDotInspectionPK: dotInspectionPK,
      tab: "General",
      driverFK: driverId,
    })
      .then((res) => {
        if (res.data != null || res.data != "") {
          const dotInspectionData = res.data;
          setDriverDotInspectionData(dotInspectionData);
          setTruckId(dotInspectionData?.DriverTruckFK || "");
          setTrailerId(dotInspectionData?.DriverTrailerFK || "");
          setTruckInput(dotInspectionData?.TruckDescription);
          setTrailerInput(dotInspectionData?.TrailerDescription);
          setInspectionDate(dotInspectionData?.InspectionDate || null);
          setReportNumber(dotInspectionData?.ReportNumber || "");
          dispatch(setUsCity(dotInspectionData?.City));
          dispatch(setStateCode(dotInspectionData?.StateCode));
          setAwardDriver(dotInspectionData?.DriverPaid);
          setAwardAmount(dotInspectionData?.DriverPaid ? dotInspectionData?.DriverAward || 0 : 0);
          setDefaultAwardAmount(dotInspectionData?.AwardAmount || 0);
          setAwardSafetyMiles(dotInspectionData?.DriverPaid ? dotInspectionData?.DriverAwardMiles || 0 : 0);
          setDefaultAwardSafetyMiles(dotInspectionData?.AwardSafetyMiles || 0);

          const initialDriverFined = Boolean(dotInspectionData?.DriverFined);
          initialDriverFinedRef.current = initialDriverFined;
          setDriverFined(initialDriverFined);
          setMinAmount(dotInspectionData?.DriverFined ? dotInspectionData?.DriverCompanyFine : 0);
          setinspectionFineAmount(dotInspectionData?.DriverCompanyFine || 0);
          setDefaultFineAmount(calculateDefault(dotInspectionData));
          setFineAmount(dotInspectionData?.DriverFined ? dotInspectionData?.DriverFine : 0);
          setFineSafetyMiles(dotInspectionData?.DriverFined ? dotInspectionData?.DriverFineMiles : 0);
          setDefaultFineSafetyMiles(dotInspectionData?.FineSafetyMiles || 0);
          setNotifiedByDOT(dotInspectionData.NotifiedByDOT || false);
          setFinedByDOT(dotInspectionData.DOTFine || false);
          setHoursOfServiceViolation(dotInspectionData.LogViolation || false);
          setUnsafeDrivingViolation(dotInspectionData.SafetyViolation || false);
          setPhysicalFitnessViolation(dotInspectionData.PhysicalFitnessViolation || false);
          setDrugAlcoholViolation(dotInspectionData.DrugAlcoholViolation || false);
          dispatch(setMaintenanceViolation(dotInspectionData.MaintenanceViolation || false));
          setDriverReportedFine(dotInspectionData?.DriverDOTFine || 0);
          setDotInspectionHosFine(dotInspectionData?.DriverHOSFine || 0);
          setDriverDOTFine(dotInspectionData?.DOTDriverFine);
          setCompanyDOTFine(dotInspectionData.DOTCompanyFine || 0);
          setResponseDate(dotInspectionData?.ResponceDate);
          setIsUsStateTrue(true);
          dispatch(setpostalCodePK(dotInspectionData?.PostalCodePK));
          setpostalCodePkView(dotInspectionData?.PostalCodePK);
          // The initial Driver Fined value determines whether they can be enabled.
          setDaysTillHold("");
          setComplianceHold(false);
          didInitHold.current = true;
        }
      })
      .catch(() => {
        console.error();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //function for setting the defaultamount when it comes to the edit
  const calculateDefault = (value) => {
    let minAmount = parseFloat(value.DriverFine) || 0;

    if (value.NotifiedByDOT || value.DOTFine) {
      minAmount -= parseFloat(value.DriverDOTFine) || 0;
    }
    if (value.LogViolation) {
      minAmount -= parseFloat(value.DriverHOSFine) || 0;
    }
    return minAmount;
  };

  useEffect(() => {
    dispatch(setUsCity(""));
    dispatch(setStateCode(""));
    fetchDriverDOTInspectionDetails();
  }, []);

  useEffect(() => {
    if (viewDetail && driverDotInspectionData) {
      setTruckInput(driverDotInspectionData?.TruckDescription);
      setTrailerInput(driverDotInspectionData?.TrailerDescription);
      setInspectionDate(driverDotInspectionData?.InspectionDate);
      setReportNumber(driverDotInspectionData?.ReportNumber);
      dispatch(setUsCity(driverDotInspectionData?.City));
      dispatch(setStateCode(driverDotInspectionData?.StateCode));
      setNotifiedByDOT(driverDotInspectionData?.NotifiedByDOT || false);
      setFinedByDOT(driverDotInspectionData?.DOTFine || false);
      setHoursOfServiceViolation(driverDotInspectionData?.LogViolation || false);
      setUnsafeDrivingViolation(driverDotInspectionData?.SafetyViolation || false);
      setPhysicalFitnessViolation(driverDotInspectionData?.PhysicalFitnessViolation || false);
      setDrugAlcoholViolation(driverDotInspectionData?.DrugAlcoholViolation || false);
      dispatch(setMaintenanceViolation(driverDotInspectionData?.MaintenanceViolation || false));
      setDriverDOTFine(driverDotInspectionData?.DOTDriverFine);
      setCompanyDOTFine(driverDotInspectionData?.DOTCompanyFine);
      setAwardDriver(driverDotInspectionData?.DriverPaid);
      setAwardAmount(driverDotInspectionData?.DriverAward);
      setAwardSafetyMiles(driverDotInspectionData?.DriverAwardMiles);
      setDriverFined(driverDotInspectionData?.DriverFined);
      setFineAmount(driverDotInspectionData?.DriverFine);
      setFineSafetyMiles(driverDotInspectionData?.DriverFineMiles);
      setResponseDate(driverDotInspectionData?.ResponceDate);
      setPostalData(false);
      setIsUsStateTrue(true);
      dispatch(setpostalCodePK(postalCodePkView));
    }
  }, [viewDetail]);

  useEffect(() => {
    if (!didInitHold.current) return;
    if (initialDriverFinedRef.current) {
      setDaysTillHold("");
      setComplianceHold(false);
      return;
    }

    if (!driverFined) {
      setDaysTillHold("");
      setComplianceHold(false);
    } else {
      setDaysTillHold((current) => (current === "" || current == null ? 0 : current));
      setComplianceHold((current) => current || daysTillHold === "" || daysTillHold == null);
    }
  }, [driverFined]);

  useEffect(() => {
    dispatch(setDaysTillHoldRedux(daysTillHold));
  }, [daysTillHold, dispatch]);

  useEffect(() => {
    dispatch(setComplianceHoldRedux(complianceHold));
  }, [complianceHold, dispatch]);

  const checkUSCityState = () => {
    if (usCity?.length > 2 && !selectedPostalCodePK) {
      setIsLoading(true);
      DriverDOTInspectionService.checkUSCityStateCode(usCity?.trim(), stateCode)
        .then((res) => {
          if (res.data.length == 1) {
            setIsUsStateTrue(true);
            dispatch(setUsCity(res.data[0]?.City));
            dispatch(setStateCode(res.data[0]?.StateCode));
            dispatch(setpostalCodePK(res.data[0]?.PostalCodePK));
            setpostalCodePkView(res.data[0]?.PostalCodePK);
          } else if (res.data.length > 1) {
            setPostalData(true);
            setStateList(res.data);
            setIsUsStateTrue(true);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const onHandleCloseNo = () => {
    setPostalData(false);
    setCheckOnValue(false);
  };

  const onHandlePostalClick = () => {
    dispatch(setUsCity(selectedCityUS));
    dispatch(setStateCode(selectedStateCodeUS));
    dispatch(setpostalCodePK(selectedPostalCodePK));
    setPostalData(false);
  };

  const payload = {
    searchCriteria,
    sortValue,
    sortType,
    pageNumber: 0,
    pageSize: 10,
    status: "All",
    type: "Autocomplete",
    driverFK: driverId,
  };

  const fetchTruckList = (string) => {
    setTruckLoading(true);
    DriverDOTInspectionService.getTruckData({ ...payload, searchTerm: string })
      .then((res) => {
        const { data } = res;
        setTruckList(truckList);
      })
      .catch((err) => {})
      .finally(() => {
        setTruckLoading(false);
      });
  };

  const fetchTrailerList = (string) => {
    setTrailerLoading(true);
    DriverDOTInspectionService.getDriverTrailerData({ ...payload, searchTerm: string })
      .then((res) => {
        const data = res.data;
        setTrailerList(data);
      })
      .catch((err) => {
        setTrailerLoading(false);
      });
  };

  const handleTrailerSelection = (data) => {
    setShowTrailerLookup(false);
    setTrailerInput(data?.Description);
    setTrailerId(data?.DriverTrailerPK);
  };

  const handleTruckSelection = (data) => {
    setShowTrailerLookup(false);
    setTrailerInput(data?.Description);
    setTrailerId(data?.DriverTrailerPK);
  };

  //floatingPointHandler
  const handleInputValue = (e, setValue) => {
    let value = e.target.value;
    let indexOfDecimal = value.indexOf(".");

    if (value.length === 7 && indexOfDecimal === -1) {
      value = value.slice(0, 5) + "." + value.slice(5);
    } else if (indexOfDecimal === 5 && value.length === 7) {
      ///
    } else {
      value = value.replace(/[^\d\.]/g, "");
    }

    if (e.inputType === "deleteContentBackward" && value[indexOfDecimal - 1] === ".") {
      value = value.slice(0, indexOfDecimal - 1) + value.slice(indexOfDecimal);
      e.target.value = value;
      return;
    }
    e.target.value = value;
    setValue(e.target.value);
  };

  //calculate the minAmount
  const calculateMinFineAmount = () => {
    let minimumAmount = parseFloat(inspectionFineAmount) || 0;

    if (notifiedByDOT || finedByDOT) {
      minimumAmount += parseFloat(driverReportedFine) || 0;
    }
    if (hoursOfServiceViolation) {
      minimumAmount += parseFloat(dotInspectionHosFine) || 0;
    }
    return minimumAmount;
  };

  const handleFineAmount = (driverFined) => {
    // When editing an Award Record
    if (!driverDotInspectionData?.DriverFined) {
      if (!driverFined) {
        setFineAmount(0);
        setFineSafetyMiles(0);
        setinspectionFineAmount(0);
        setDefaultFineSafetyMiles(0);
        // When editing an Award Record to Fine record
      } else if (driverFined) {
        setFineAmount(driverDotInspectionData?.DriverCompanyFine);
        setFineSafetyMiles(driverDotInspectionData?.FineSafetyMiles);
        setinspectionFineAmount(driverDotInspectionData?.DriverCompanyFine);
        setDefaultFineSafetyMiles(driverDotInspectionData?.FineSafetyMiles);
      }
    } else if (driverDotInspectionData?.DriverFined && driverFined) {
      if (driverDotInspectionData?.DriverFine !== 0 && fineAmountFlag) {
        setFineAmount(driverDotInspectionData?.DriverFine);
        setFineSafetyMiles(driverDotInspectionData?.DriverFineMiles);
      } else {
        setFineAmount(driverDotInspectionData?.DriverCompanyFine);
        setFineSafetyMiles(driverDotInspectionData?.FineSafetyMiles);
      }
    } else if (driverDotInspectionData?.DriverFined && !driverFined) {
      setFineAmount(0);
      setFineSafetyMiles(0);
    }
  };
  // Update fine amount whenever relevant checkboxes change

  // Handle fine amount blur (when tabbing away)
  const handleFineAmountBlur = () => {
    if (driverFined) {
      const minimumAmount = calculateMinFineAmount();
      const currentAmount = parseFloat(fineAmount) || 0;

      if (currentAmount < minimumAmount || !Number(fineAmount)) {
        setFineAmount(minimumAmount.toString());
      }
    }
  };

  //Border color class for fine amount field
  const getFineAmountBorderClass = () => {
    if (!driverFined) return "";
    const minimumAmount = calculateMinFineAmount();
    const currentAmount = parseFloat(fineAmount);
    return currentAmount !== 0 ? (currentAmount >= minimumAmount ? "borderGreen" : "borderRed") : "borderRed";
  };

  const driverFineVal = Number(driverDOTFine) || 0;
  const companyFineVal = Number(companyDOTFine) || 0;
  const hasAnyFine = driverFineVal > 0 || companyFineVal > 0;
  const getFineClass = (value) => {
    if (!finedByDOT || viewDetail || isLoading) return "";
    if (value > 0) return "borderGreen";
    if (!hasAnyFine) return "borderRed";
    return "";
  };

  useEffect(() => {
    const firstSection =
      (truckId || trailerId) &&
      isResponseDateValid &&
      inspectionDate &&
      isInspectionDateValid &&
      reportNumber &&
      postalCodePK;

    // Fine by DOT validation
    const finedByDOTValid = !finedByDOT || driverFineVal > 0 || companyFineVal > 0;

    // Award driver validation
    const awardDriverValid =
      !awardDriver ||
      (awardDriver &&
        Number(awardAmount) &&
        Number(awardSafetyMiles) &&
        !(parseFloat(awardAmount || 0) < parseFloat(defaultAwardAmount || 0)) &&
        !(parseFloat(awardSafetyMiles || 0) < parseFloat(defaultAwardSafetyMiles || 0)));

    const holdFieldsEnabled = !initialDriverFinedRef.current && driverFined;
    const daysTillHoldValid =
      !holdFieldsEnabled ||
      (daysTillHold !== "" &&
        daysTillHold != null &&
        Number.isInteger(Number(daysTillHold)) &&
        Number(daysTillHold) >= 0);

    // Driver fined validation
    const driverFinedValid =
      !driverFined ||
      (driverFined &&
        fineAmount !== "" &&
        fineAmount !== "-" &&
        parseFloat(fineAmount || 0) >= calculateMinFineAmount() &&
        fineSafetyMiles !== "" &&
        fineSafetyMiles !== "-" &&
        parseFloat(fineSafetyMiles || 0) >= parseFloat(defaultFineSafetyMiles || 0));

    if (firstSection && finedByDOTValid && awardDriverValid && driverFinedValid && daysTillHoldValid) {
      dispatch(setEditGeneralTabValid(true));
    } else {
      dispatch(setEditGeneralTabValid(false));
    }
  }, [
    truckId,
    trailerId,
    inspectionDate,
    reportNumber,
    isInspectionDateValid,
    isResponseDateValid,
    finedByDOT,
    driverDOTFine,
    companyDOTFine,
    awardDriver,
    awardAmount,
    awardSafetyMiles,
    driverFined,
    fineAmount,
    fineSafetyMiles,
    postalCodePK,
    viewDetail,
    daysTillHold,
  ]);

  const generalTabData = () => {
    dispatch(
      setSaveFormData({
        driverFK: driverId,
        driverTruckFK: truckId,
        driverTrailerFK: trailerId,
        reportNumber: reportNumber,
        inspectionDate: inspectionDate,
        city: usCity,
        stateCode: stateCode,
        logViolation: hoursOfServiceViolation,
        safetyViolation: unsafeDrivingViolation,
        physicalFitnessViolation: physicalFitnessViolation,
        drugAlcoholViolation: drugAlcoholViolation,
        maintenanceViolation: maintenanceViolation,
        notifiedByDOT: notifiedByDOT,
        dotFine: finedByDOT,
        dotDriverFine: driverDOTFine,
        dotCompanyFine: companyDOTFine,
        driverPaid: awardDriver,
        driverAward: awardAmount,
        driverAwardMiles: awardSafetyMiles,
        driverFined: driverFined,
        driverFine: fineAmount,
        driverFineMiles: fineSafetyMiles,
        driverCompanyFine: driverDotInspectionData?.DriverCompanyFine,
        driverHOSFine: dotInspectionHosFine,
        driverDOTFine: driverReportedFine,
        responseDate: responseDate,
        daysTillHold:
          !initialDriverFinedRef.current &&
          driverFined &&
          daysTillHold !== "" &&
          Number.isInteger(Number(daysTillHold)) &&
          Number(daysTillHold) >= 0
            ? Number(daysTillHold)
            : null,
        complianceHold: !initialDriverFinedRef.current && driverFined ? Boolean(complianceHold) : false,
      })
    );
  };

  useEffect(() => {
    generalTabData();
  }, [
    driverFK,
    truckId,
    trailerId,
    reportNumber,
    inspectionDate,
    usCity,
    stateCode,
    hoursOfServiceViolation,
    unsafeDrivingViolation,
    physicalFitnessViolation,
    drugAlcoholViolation,
    maintenanceViolation,
    notifiedByDOT,
    finedByDOT,
    driverDOTFine,
    companyDOTFine,
    awardDriver,
    awardAmount,
    awardSafetyMiles,
    driverFined,
    fineAmount,
    fineSafetyMiles,
    driverDotInspectionData?.DriverCompanyFine,
    dotInspectionHosFine,
    driverReportedFine,
    responseDate,
    daysTillHold,
    complianceHold,
  ]);

  return (
    <div className="p-2">
      {isLoading && <LoadingIcon />}
      <div className=" p-2 d-flex align-items-center mb-0">
        <Col sm={6} md={6} xs={6} className="mt-1">
          <Form.Group className={` m-b-10 align-items-center row  m-l-0 m-r-0  `}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label  ">Truck</Form.Label>
            </Col>
            <Col xs={7} md={7} sm={7} className="d-flex ">
              <AutoCompleteDropdown
                className={`customFormControl ${viewDetail || isLoading || editFlag ? "" : truckInput || truckId ? "borderGreen" : "borderRed"}`}
                arrayList={truckList}
                searchString={truckInput}
                renderItemId={(item) => item.DriverTruckPK}
                renderItemField={(item) => item.Description}
                handleSearchString={(string) => setTruckInput(string)}
                fetchDataBySearchString={fetchTruckList}
                onSelect={handleTruckSelection}
                selectedId={truckId}
                clearInputCallback={() => {
                  setTruckId("");
                }}
                disabled={viewDetail || editFlag || trailerId}
                loading={truckLoading}
              />
              <LookupButton
                onClick={() => setShowTruckLookup(true)}
                disabled={viewDetail || editFlag || trailerId}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label  ">Trailer</Form.Label>
            </Col>
            <Col xs={7} md={7} sm={7} className="d-flex ">
              <AutoCompleteDropdown
                arrayList={trailerList}
                searchString={trailerInput}
                renderItemId={(item) => item.DriverTrailerPK}
                renderItemField={(item) => item.Description}
                handleSearchString={(string) => setTrailerInput(string)}
                fetchDataBySearchString={fetchTrailerList}
                onSelect={handleTrailerSelection}
                selectedId={trailerId}
                clearInputCallback={() => {
                  setTrailerId("");
                }}
                disabled={viewDetail || editFlag || truckId}
                className={`customFormControl ${
                  viewDetail || editFlag || isLoading
                    ? ""
                    : trailerInput || trailerId
                      ? "borderGreen"
                      : "borderRed"
                }`}
              />
              <LookupButton
                onClick={() => setShowTrailerLookup(true)}
                disabled={viewDetail || editFlag || truckId}
                loading={trailerLoading}
              />
            </Col>
          </Form.Group>

          <Form.Group className={` m-b-10 align-items-center row  m-l-0 m-r-0 mt-2  d-flex`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label ">Inspection Date</Form.Label>
            </Col>
            <Col xs={4} md={4} sm={4} className=" w-120px">
              <DateInputField
                className={`customFormControl ${
                  viewDetail || isLoading
                    ? ""
                    : inspectionDate && isInspectionDateValid
                      ? "borderGreen"
                      : "borderRed"
                }`}
                date={inspectionDate}
                setDate={(value) => {
                  setInspectionDate(value);
                }}
                setIsDateValid={setIsInspectionDateValid}
                max={new Date()}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-15 align-items-center row  m-l-0 m-r-0 mt-3 `}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="reportNumber" className="col-form-label">
                Report Number
              </Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5}>
              <Input
                className={`customFormControl ${viewDetail || isLoading ? "" : !reportNumber ? "borderRed" : "borderGreen"}`}
                id="reportNumber"
                name="reprtNmbr"
                type="search"
                value={reportNumber}
                onChange={(e) => setReportNumber(e.target.value)}
                disabled={viewDetail}
                maxLength={15}
              />
            </Col>
          </Form.Group>

          <PostalCodeComponent
            hideZip
            marginTop="-6px"
            disabled={viewDetail}
            city={usCity}
            setCity={(value) => dispatch(setUsCity(value))}
            stateCode={stateCode}
            setStateCode={(value) => dispatch(setStateCode(value))}
            postalCode={currentLocationPostalCode}
            setPostalCode={setCurrentLocationPostalCode}
            postalCodePK={postalCodePK}
            setPostalCodePK={(postalCodePK) => dispatch(setpostalCodePK(postalCodePK))}
            postalOptions={postalOptions}
            setPostalValues={setPostalOptions}
            canadian={false}
            minLabelWidth={163}
            setCanadian={() => {}}
            cityColNumber={5}
            stateInputWidth={"60px"}
          />

          <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2 `}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className=" col-form-label">Hours Of Service Violation</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3}>
              <input
                type="checkbox"
                className="form-check-input p-0"
                id="hoursOfServiceViolation"
                name="hoursOfServiceViolation"
                checked={hoursOfServiceViolation}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setHoursOfServiceViolation(isChecked);
                  if (isChecked) {
                    if (!driverFined) {
                      setFineAmount(
                        Number(driverDotInspectionData?.DriverCompanyFine) +
                          Number(driverDotInspectionData?.DriverHOSFine)
                      );
                      setDriverFined(true);
                      setFineSafetyMiles(driverDotInspectionData?.FineSafetyMiles);
                    } else {
                      setFineAmount((prev) => Number(prev) + Number(driverDotInspectionData?.DriverHOSFine));
                      setDriverFined(true);
                    }
                  } else {
                    setFineAmount((prev) => prev - driverDotInspectionData?.DriverHOSFine);
                  }
                }}
                disabled={viewDetail || awardDriver}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2  `}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className=" col-form-label">Unsafe Driving Violation</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3}>
              <input
                type="checkbox"
                className="form-check-input p-0"
                id="unsafeDrivingViolation"
                name="unsafeDrivingViolation"
                checked={unsafeDrivingViolation}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setUnsafeDrivingViolation(isChecked);
                  if (isChecked) {
                    if (!driverFined) {
                      setFineAmount(Number(driverDotInspectionData?.DriverCompanyFine));
                      setDriverFined(true);
                      setFineSafetyMiles(driverDotInspectionData?.FineSafetyMiles);
                    }
                  }
                }}
                disabled={viewDetail || awardDriver}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2  `}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className=" col-form-label">Physical Fitness Violation</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3}>
              <input
                type="checkbox"
                className="form-check-input p-0"
                id="physicalFitnessViolation"
                name="physicalFitnessViolation"
                checked={physicalFitnessViolation}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setPhysicalFitnessViolation(isChecked);
                  if (isChecked) {
                    if (!driverFined) {
                      setFineAmount(Number(driverDotInspectionData?.DriverCompanyFine));
                      setDriverFined(true);
                      setFineSafetyMiles(driverDotInspectionData?.FineSafetyMiles);
                    }
                  }
                }}
                disabled={viewDetail || awardDriver}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2  `}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className=" col-form-label">Drug/Alcohol Violation</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3}>
              <input
                type="checkbox"
                className="form-check-input p-0"
                id="drugAlcoholViolation"
                name="drugAlcoholViolation"
                checked={drugAlcoholViolation}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setDrugAlcoholViolation(isChecked);
                  if (isChecked) {
                    if (!driverFined) {
                      setFineAmount(Number(driverDotInspectionData?.DriverCompanyFine));
                      setDriverFined(true);
                      setFineSafetyMiles(driverDotInspectionData?.FineSafetyMiles);
                    }
                  }
                }}
                disabled={viewDetail || awardDriver}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2  `}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className=" col-form-label">Maintenance Violation</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3}>
              <input
                type="checkbox"
                className="form-check-input p-0"
                id="maintenanceViolation"
                name="maintenanceViolation"
                checked={maintenanceViolation}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  dispatch(setMaintenanceViolation(isChecked));
                  if (isChecked) {
                    if (!driverFined) {
                      setFineAmount(Number(driverDotInspectionData?.DriverCompanyFine));
                      setDriverFined(true);
                      setFineSafetyMiles(driverDotInspectionData?.FineSafetyMiles);
                    }
                  }
                }}
                disabled={viewDetail || awardDriver}
              />
            </Col>
          </Form.Group>
          {!viewDetail && (
            <>
              <Form.Group className="mt-0 m-b-10 align-items-center row m-l-0 m-r-0 mt-2">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label">Days Till Hold</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2}>
                  <input
                    type="number"
                    className="customFormControl"
                    id="daysTillHold"
                    name="daysTillHold"
                    value={daysTillHold}
                    min={0}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^\d+$/.test(value)) setDaysTillHold(value);
                    }}
                    step={1}
                    disabled={viewDetail || initialDriverFinedRef.current || !driverFined}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-0 m-b-10 align-items-center row m-l-0 m-r-0 mt-2">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className="col-form-label">Compliance Hold</Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3}>
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="complianceHold"
                    name="complianceHold"
                    checked={complianceHold}
                    onChange={(e) => setComplianceHold(e.target.checked)}
                    disabled={viewDetail || initialDriverFinedRef.current || !driverFined}
                  />
                </Col>
              </Form.Group>
            </>
          )}
        </Col>

        <Col sm={6} md={6} xs={6} className="m-l-70 mt-2">
          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-0  `}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className=" col-form-label">Notified By DOT</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3}>
              <input
                type="checkbox"
                className="form-check-input p-0"
                id="notifiedByDOT"
                name="notifiedByDOT"
                checked={notifiedByDOT}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setNotifiedByDOT(isChecked);
                  if (isChecked) {
                    if (!finedByDOT) {
                      if (!driverFined) {
                        setDriverFined(true);
                        setFineAmount(
                          Number(driverDotInspectionData?.DriverCompanyFine) +
                            Number(driverDotInspectionData?.DriverDOTFine)
                        );
                        setFineSafetyMiles(driverDotInspectionData?.FineSafetyMiles);
                      } else {
                        setFineAmount(
                          (prev) => Number(prev) + Number(driverDotInspectionData?.DriverDOTFine)
                        );
                        setDriverFined(true);
                      }
                    }
                  } else {
                    if (!finedByDOT) {
                      setFineAmount((prev) => Number(prev) - Number(driverDotInspectionData?.DriverDOTFine));
                    }
                  }
                }}
                disabled={viewDetail || awardDriver}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2  `}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className=" col-form-label">Fined By DOT</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3}>
              <input
                type="checkbox"
                className="form-check-input p-0"
                id="finedByDOT"
                name="finedByDOT"
                checked={finedByDOT}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setFinedByDOT(isChecked);
                  if (isChecked) {
                    if (!notifiedByDOT) {
                      if (!driverFined) {
                        setDriverFined(true);
                        setFineAmount(
                          Number(driverDotInspectionData?.DriverCompanyFine) +
                            Number(driverDotInspectionData?.DriverDOTFine)
                        );
                        setFineSafetyMiles(driverDotInspectionData?.FineSafetyMiles);
                      } else {
                        setFineAmount(
                          (prev) => Number(prev) + Number(driverDotInspectionData?.DriverDOTFine)
                        );
                        setDriverFined(true);
                      }
                    }
                  } else {
                    setCompanyDOTFine(0);
                    setDriverDOTFine(0);

                    if (!notifiedByDOT) {
                      setFineAmount((prev) => Number(prev) - Number(driverDotInspectionData?.DriverDOTFine));
                    }
                  }
                }}
                disabled={viewDetail || awardDriver}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="driverDOTFine" className="col-form-label">
                Driver DOT Fine
              </Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3}>
              <input
                className={`customFormControl ${getFineClass(driverFineVal)}`}
                id="driverDOTFine"
                name="driverDOTFine"
                type="search"
                value={driverDOTFine}
                maxLength={8}
                onChange={(e) => {
                  handleInputValue(e, setDriverDOTFine);
                  setDriverDOTFine(preventNegative(e.target.value));
                }}
                disabled={
                  viewDetail ||
                  !!(
                    !hoursOfServiceViolation &&
                    !unsafeDrivingViolation &&
                    !physicalFitnessViolation &&
                    !drugAlcoholViolation &&
                    !maintenanceViolation &&
                    !notifiedByDOT &&
                    !finedByDOT &&
                    !awardDriver &&
                    !driverFined
                  ) ||
                  !finedByDOT
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="companyDOTFine" className="col-form-label">
                Company DOT Fine
              </Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3}>
              <input
                className={`customFormControl ${getFineClass(companyFineVal)}`}
                id="companyDOTFine"
                name="companyDOTFine"
                type="search"
                value={companyDOTFine}
                maxLength={8}
                onChange={(e) => {
                  handleInputValue(e, setCompanyDOTFine);
                  setCompanyDOTFine(preventNegative(e.target.value));
                }}
                disabled={
                  viewDetail ||
                  !!(
                    !hoursOfServiceViolation &&
                    !unsafeDrivingViolation &&
                    !physicalFitnessViolation &&
                    !drugAlcoholViolation &&
                    !maintenanceViolation &&
                    !notifiedByDOT &&
                    !finedByDOT &&
                    !awardDriver &&
                    !driverFined
                  ) ||
                  !finedByDOT
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2  `}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className=" col-form-label">Award Driver</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3}>
              <input
                type="checkbox"
                className="form-check-input p-0"
                id="awardDriver"
                name="awardDriver"
                checked={awardDriver}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setAwardDriver(isChecked);
                  if (isChecked) {
                    setAwardAmount(defaultAwardAmount);
                    setAwardSafetyMiles(defaultAwardSafetyMiles);
                    setDriverFined(false);
                  } else {
                    setAwardAmount("0");
                    setAwardSafetyMiles("0");
                    setHoursOfServiceViolation(false);
                    setUnsafeDrivingViolation(false);
                    setPhysicalFitnessViolation(false);
                    setDrugAlcoholViolation(false);
                    setMaintenanceViolation(false);
                    setNotifiedByDOT(false);
                    setFinedByDOT(false);
                    setDriverFined(false);
                  }
                }}
                disabled={viewDetail || driverFined}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="awardAmount" className="col-form-label">
                Award Amount
              </Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3}>
              <Input
                className={`customFormControl ${
                  viewDetail || isLoading
                    ? ""
                    : awardDriver
                      ? awardAmount === "" ||
                        parseFloat(awardAmount || 0) < parseFloat(defaultAwardAmount || 0)
                        ? "borderRed"
                        : "borderGreen"
                      : ""
                }`}
                id="awardAmount"
                name="awardAmount"
                type="search"
                value={awardAmount}
                maxLength={8}
                onChange={(e) => {
                  handleInputValue(e, setAwardAmount);
                  setAwardAmount(preventNegative(e.target.value));
                }}
                onBlur={(e) => {
                  if (
                    awardDriver &&
                    (awardAmount === "" || awardAmount === "-" || parseFloat(e.target.value)) <
                      parseFloat(defaultAwardAmount)
                  ) {
                    setAwardAmount(defaultAwardAmount);
                  }
                }}
                disabled={
                  viewDetail ||
                  !!(
                    !hoursOfServiceViolation &&
                    !unsafeDrivingViolation &&
                    !physicalFitnessViolation &&
                    !drugAlcoholViolation &&
                    !maintenanceViolation &&
                    !notifiedByDOT &&
                    !finedByDOT &&
                    !awardDriver &&
                    !driverFined
                  ) ||
                  !awardDriver
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="awardSafetyMiles" className="col-form-label">
                Award Safety Miles
              </Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3}>
              <Input
                className={`customFormControl ${
                  viewDetail || isLoading
                    ? ""
                    : awardDriver
                      ? awardSafetyMiles === "" ||
                        awardSafetyMiles === "-" ||
                        parseFloat(awardSafetyMiles || 0) < parseFloat(defaultAwardSafetyMiles || 0)
                        ? "borderRed"
                        : "borderGreen"
                      : ""
                }`}
                id="awardSafetyMiles"
                name="awardSafetyMiles"
                type="search"
                value={awardSafetyMiles}
                maxLength={8}
                onChange={(e) => {
                  const value = e.target.value;
                  if (Number(value) <= 32767 && value.charAt(value.length - 1) !== ".") {
                    setAwardSafetyMiles(preventNegative(value));
                  }
                }}
                onBlur={(e) => {
                  if (
                    awardDriver &&
                    (awardSafetyMiles === "" || awardSafetyMiles === "-" || parseFloat(e.target.value)) <
                      parseFloat(defaultAwardSafetyMiles)
                  ) {
                    setAwardSafetyMiles(defaultAwardSafetyMiles);
                  }
                }}
                disabled={
                  viewDetail ||
                  !!(
                    !hoursOfServiceViolation &&
                    !unsafeDrivingViolation &&
                    !physicalFitnessViolation &&
                    !drugAlcoholViolation &&
                    !maintenanceViolation &&
                    !notifiedByDOT &&
                    !finedByDOT &&
                    !awardDriver &&
                    !driverFined
                  ) ||
                  !awardDriver
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2  `}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className=" col-form-label">Driver Fined</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3}>
              <input
                type="checkbox"
                className="form-check-input p-0"
                id="driverFined"
                name="driverFined"
                checked={driverFined}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setDriverFined(e.target.checked);
                  if (isChecked) {
                    handleFineAmount(isChecked);
                    setAwardDriver(false);
                  } else {
                    setFineAmountFlag(false);
                    setFineAmount(0);
                    setFineSafetyMiles(0);
                    setDaysTillHold("");
                    setComplianceHold(false);
                  }
                }}
                disabled={
                  viewDetail ||
                  awardDriver ||
                  hoursOfServiceViolation ||
                  unsafeDrivingViolation ||
                  physicalFitnessViolation ||
                  drugAlcoholViolation ||
                  maintenanceViolation ||
                  notifiedByDOT ||
                  finedByDOT
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="fineAmount" className="col-form-label">
                Fine Amount
              </Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3}>
              <Input
                className={`customFormControl ${viewDetail || isLoading ? "" : getFineAmountBorderClass()}`}
                id="fineAmount"
                name="fineAmount"
                type="search"
                value={fineAmount}
                maxLength={8}
                onChange={(e) => {
                  handleInputValue(e, setFineAmount);
                  const value = e.target.value;
                  setFineAmount(preventNegative(value));
                }}
                onBlur={handleFineAmountBlur}
                disabled={
                  viewDetail ||
                  !!(
                    !hoursOfServiceViolation &&
                    !unsafeDrivingViolation &&
                    !physicalFitnessViolation &&
                    !drugAlcoholViolation &&
                    !maintenanceViolation &&
                    !notifiedByDOT &&
                    !finedByDOT &&
                    !awardDriver &&
                    !driverFined
                  ) ||
                  !driverFined
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="fineSafetyMiles" className="col-form-label">
                Fine Safety Miles
              </Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3}>
              <Input
                className={`customFormControl ${
                  viewDetail || isLoading
                    ? ""
                    : driverFined
                      ? fineSafetyMiles === 0 ||
                        fineSafetyMiles === "" ||
                        fineSafetyMiles === "-" ||
                        parseFloat(fineSafetyMiles || 0) < parseFloat(defaultFineSafetyMiles || 0)
                        ? "borderRed"
                        : "borderGreen"
                      : ""
                }`}
                id="fineSafetyMiles"
                name="fineSafetyMiles"
                type="search"
                value={fineSafetyMiles}
                maxLength={5}
                onChange={(e) => {
                  const value = e.target.value;
                  if (Number(value) <= 32767 && value.charAt(value.length - 1) !== ".") {
                    setFineSafetyMiles(preventNegative(value));
                  }
                }}
                onBlur={(e) => {
                  if (
                    driverFined &&
                    (fineSafetyMiles === "" ||
                      fineSafetyMiles === "-" ||
                      parseFloat(e.target.value) < parseFloat(defaultFineSafetyMiles))
                  ) {
                    setFineSafetyMiles(defaultFineSafetyMiles);
                  }
                }}
                disabled={
                  viewDetail ||
                  !!(
                    !hoursOfServiceViolation &&
                    !unsafeDrivingViolation &&
                    !physicalFitnessViolation &&
                    !drugAlcoholViolation &&
                    !maintenanceViolation &&
                    !notifiedByDOT &&
                    !finedByDOT &&
                    !awardDriver &&
                    !driverFined
                  ) ||
                  !driverFined
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2  d-flex`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label ">Response Date</Form.Label>
            </Col>
            <Col xs={4} md={4} sm={4} className=" w-120px">
              <DateInputField
                className={`customFormControl ${
                  viewDetail || isLoading ? "" : isResponseDateValid ? "" : "borderRed"
                }`}
                date={responseDate ? responseDate : null}
                setDate={(value) => {
                  setResponseDate(value);
                }}
                setIsDateValid={setIsResponseDateValid}
                max={new Date()}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>
        </Col>
      </div>
      <DriverTrailerLookup
        show={showTrailerLookup}
        onHide={() => setShowTrailerLookup(false)}
        DOTInspection
      />
      <DriverTruckLookup show={showTruckLookup} onHide={() => setShowTruckLookup(false)} DOTInspection />
    </div>
  );
};

export default DOTEditGeneral;
