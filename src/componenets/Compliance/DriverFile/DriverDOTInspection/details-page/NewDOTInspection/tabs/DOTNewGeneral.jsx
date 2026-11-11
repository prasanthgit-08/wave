import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Modal } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../../common/LookupButton";
import DateInputField from "../../../../../../common/DateInputField";
import DriverTrailerLookup from "../../../../../../LookupScreens/DriverTrailer/DriverTrailerLookup";
import DriverDOTInspectionService from "../../../../../../../services/Compliance/DriverDOTInspectionService";
import { useDispatch, useSelector } from "react-redux";
import DriverTruckLookup from "../../../../../../LookupScreens/DriverTruck/DriverTruckLookup";
import {
  setMaintenanceViolation,
  setNewGeneralTabValid,
  setSaveFormData,
  setStateCode,
  setUsCity,
  setNewLoading,
  setpostalCodePK,
  setDaysTillHold as setDaysTillHoldRedux,
  setComplianceHold as setComplianceHoldRedux,
} from "../../../../../../../redux/Compliance/DriverDOTInspectionSlice";
import PortsOfEntryService from "../../../../../../../services/PortsOfEntryService";
import { useParams } from "react-router-dom";
import LoadingIcon from "../../../../../../common/LoadingIcon";
import { preventNegative } from "../../../../../../../utils/utils";
import numberValidation from "../../../../../../../utils/validation/NumberValidation";
import { DriverDOTInspection_Base_URL } from "../../../../../../../services/constants/applicationConstants";
import toast from "react-hot-toast";
import Input from "../../../../../../../components/common/input";
import PostalCodeComponent from "../../../../../../common/PostalCodeComponent";

const DOTNewGeneral = () => {
  const dispatch = useDispatch();
  const { driverId } = useParams();
  const [driverDotInspectionData, setDriverDotInspectionData] = useState();
  const [truckId, setTruckId] = useState(null);
  const [truckInput, setTruckInput] = useState("");
  const [trailerId, setTrailerId] = useState(null);
  const [trailerInput, setTrailerInput] = useState("");
  const [postalOptions, setPostalOptions] = useState([]);
  const [currentLocationPostalCode, setCurrentLocationPostalCode] = useState("");
  const [inspectionDate, setInspectionDate] = useState(null);
  const [isInspectionDateValid, setIsInspectionDateValid] = useState(true);
  const [reportNumber, setReportNumber] = useState("");
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
  const [defaultFineAmount, setDefaultFineAmount] = useState(0);
  const [fineSafetyMiles, setFineSafetyMiles] = useState(0);
  const [defaultFineSafetyMiles, setDefaultFineSafetyMiles] = useState(0);
  const [responseDate, setResponseDate] = useState(null);
  const [driverReportedFine, setDriverReportedFine] = useState(0);
  const [dotInspectionHosFine, setDotInspectionHosFine] = useState(0);
  const [truckLoading, setTruckLoading] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [daysTillHold, setDaysTillHold] = useState("");
  const [complianceHold, setComplianceHold] = useState(false);

  const [showTrailerLookup, setShowTrailerLookup] = useState(false);
  const [trailerList, setTrailerList] = useState([]);
  const [showTruckLookup, setShowTruckLookup] = useState(false);
  const [truckList, setTruckList] = useState([]);
  const [isUsStateTrue, setIsUsStateTrue] = useState(false);
  const [isApiPending, setIsApiPending] = useState(false);
  const [isPostalData, setPostalData] = useState(false);
  const [statesList, setStateList] = useState([]);
  const [checkOnvalue, setCheckOnValue] = useState(false);
  const [selectedCityUS, setSelectedCityUS] = useState("");
  const [selectedStateCodeUS, setSelectedStateCodeUS] = useState("");
  const [selectedPostalCodePK, setSelectedPostalCodePK] = useState(null);
  const [minAmount, setMinAmount] = useState(0);
  const didInitHold = useRef(false);

  const searchCriteria = useSelector((state) => state.driverDOTInspection.searchCriteria);
  const usCity = useSelector((state) => state.driverDOTInspection.usCity);
  const stateCode = useSelector((state) => state.driverDOTInspection.stateCode);
  const postalCodePK = useSelector((state) => state.driverDOTInspection.postalCodePK);
  const driverFK = useSelector((state) => state.driverDOTInspection.driverFK);
  const maintenanceViolation = useSelector((state) => state.driverDOTInspection.maintenanceViolation);
  const newLoading = useSelector((state) => state.driverDOTInspection.newLoading);

  useEffect(() => {
    dispatch(setUsCity(""));
    dispatch(setStateCode(""));
    dispatch(setpostalCodePK(null));
  }, []);

  const fetchDriverDOTInspectionDetails = () => {
    dispatch(setNewLoading(true));
    DriverDOTInspectionService.getDriverDOTInspectionDetails({
      driverDotInspectionPK: -1,
      tab: "General",
      driverFK: -1,
    })
      .then((res) => {
        const dotInspectionData = res.data;
        setDriverDotInspectionData(dotInspectionData);
        setInspectionDate(dotInspectionData.InspectionDate);
        setReportNumber(dotInspectionData.ReportNumber || "");
        dispatch(setUsCity(dotInspectionData?.City || ""));
        dispatch(setStateCode(dotInspectionData?.StateCode || ""));
        setAwardDriver(dotInspectionData?.DriverPaid || false);
        setAwardAmount(dotInspectionData?.DriverPaid ? dotInspectionData?.AwardAmount || 0 : 0);
        setDefaultAwardAmount(dotInspectionData?.AwardAmount || 0);
        setAwardSafetyMiles(dotInspectionData?.DriverPaid ? dotInspectionData?.AwardSafetyMiles || 0 : 0);
        setDefaultAwardSafetyMiles(dotInspectionData?.AwardSafetyMiles || 0);

        setDriverFined(dotInspectionData?.DriverFined || false);
        setMinAmount(dotInspectionData?.FineAmount);
        setFineAmount(driverFined ? dotInspectionData.FineAmount || 0 : 0);
        setDefaultFineAmount(dotInspectionData.FineAmount || 0);
        setFineSafetyMiles(driverFined ? dotInspectionData.FineSafetyMiles || 0 : 0);
        setDefaultFineSafetyMiles(dotInspectionData?.FineSafetyMiles || 0);
        setNotifiedByDOT(dotInspectionData.NotifiedByDOT || false);
        setFinedByDOT(dotInspectionData.DOTFine || false);
        setHoursOfServiceViolation(dotInspectionData.LogViolation || false);
        setUnsafeDrivingViolation(dotInspectionData.SafetyViolation || false);
        setPhysicalFitnessViolation(dotInspectionData.PhysicalFitnessViolation || false);
        setDrugAlcoholViolation(dotInspectionData.DrugAlcoholViolation || false);
        dispatch(setMaintenanceViolation(dotInspectionData.DrugAlcoholViolation || false));

        setDriverReportedFine(dotInspectionData?.DOTInspectionDOTReportedFine || 0);
        setDotInspectionHosFine(dotInspectionData?.DOTInspectionHOSFine || 0);
        setCompanyDOTFine(finedByDOT ? dotInspectionData?.DOTCompanyFine || 0 : 0);
        setDriverDOTFine(finedByDOT ? dotInspectionData?.DriverDOTFine || 0 : 0);
        setResponseDate(null);
        // Hold fields are processing-only. Initialize them from the Driver Fined state,
        setDaysTillHold("");
        setComplianceHold(false);
        didInitHold.current = true;
      })
      .catch(() => {})
      .finally(() => {
        dispatch(setNewLoading(false));
      });
  };

  useEffect(() => {
    fetchDriverDOTInspectionDetails();
  }, []);

  useEffect(() => {
    if (!didInitHold.current) return;

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
    if (usCity?.length > 2) {
      setIsApiPending(true);
      DriverDOTInspectionService.checkUSCityStateCode(usCity?.trim(), stateCode || "")
        .then((res) => {
          if (res.data.length == 1) {
            setIsUsStateTrue(true);
            dispatch(setUsCity(res.data[0]?.City));
            dispatch(setStateCode(res.data[0]?.StateCode));
            dispatch(setpostalCodePK(res.data[0]?.PostalCodePK));
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
          setIsApiPending(false);
        });
    }
  };

  const onHandleCloseNo = () => {
    setPostalData(false);
    setCheckOnValue(false);
    dispatch(setUsCity(""));
    dispatch(setStateCode(""));
    dispatch(setpostalCodePK(null));
  };

  const onHandlePostalClick = () => {
    dispatch(setUsCity(selectedCityUS));
    dispatch(setStateCode(selectedStateCodeUS));
    dispatch(setpostalCodePK(selectedPostalCodePK));
    setPostalData(false);
  };

  const payload = {
    searchCriteria,
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
        setTruckList(data);
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
      .catch((err) => {})
      .finally(() => {
        setTrailerLoading(false);
      });
  };

  const handleTrailerSelection = (data) => {
    setShowTrailerLookup(false);
    setTrailerInput(data?.Description);
    setTrailerId(data?.DriverTrailerPK);
  };

  const handleTruckSelection = (data) => {
    setShowTruckLookup(false);
    setTruckInput(data?.Description);
    setTruckId(data?.DriverTruckPK);
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

  //Function for calculating the minimum amount
  const calculateMinFineAmount = (type) => {
    let minimumAmount = 0;
    if (minAmount > defaultFineAmount && type && minAmount !== 0) {
      minimumAmount = parseFloat(minAmount);
    } else {
      minimumAmount = parseFloat(defaultFineAmount) || 0;
    }

    if (notifiedByDOT || finedByDOT) {
      minimumAmount += parseFloat(driverReportedFine) || 0;
    }
    if (hoursOfServiceViolation) {
      minimumAmount += parseFloat(dotInspectionHosFine) || 0;
    }
    return minimumAmount;
  };

  //Function for setting the minimum amount when the fine amount changes
  const handleNewMinimum = (value) => {
    let minimumAmount = parseFloat(value) || 0;
    if (notifiedByDOT || finedByDOT) {
      minimumAmount -= parseFloat(driverReportedFine) || 0;
    }
    if (hoursOfServiceViolation) {
      minimumAmount -= parseFloat(dotInspectionHosFine) || 0;
    }
    if (minimumAmount > defaultFineAmount) {
      setMinAmount(minimumAmount);
    } else {
      setMinAmount(defaultFineAmount);
    }
  };

  // Update fine amount whenever relevant checkboxes change
  useEffect(() => {
    if (!newLoading) {
      if (driverFined) {
        const minimumAmount = calculateMinFineAmount(true);
        setFineAmount(minimumAmount);
        setFineSafetyMiles(defaultFineSafetyMiles || 0);
      } else {
        setFineAmount(0);
        setFineSafetyMiles(0);
      }
    }
  }, [driverFined, notifiedByDOT, hoursOfServiceViolation, finedByDOT]);

  // Handle fine amount blur (when tabbing away)
  const handleFineAmountBlur = () => {
    if (driverFined) {
      const minimumAmount = calculateMinFineAmount(false);
      const currentAmount = parseFloat(fineAmount) || 0;
      if (currentAmount < minimumAmount || !Number(fineAmount)) {
        setFineAmount(minimumAmount);
      }
    }
  };

  //Border color class for fine amount field
  const getFineAmountBorderClass = () => {
    if (newLoading) return "";
    if (!driverFined) return "";
    const minimumAmount = calculateMinFineAmount(false);

    const currentAmount = isNaN(parseFloat(fineAmount)) ? 0 : parseFloat(fineAmount);
    if (currentAmount === 0) return "borderRed";

    return currentAmount >= minimumAmount ? "borderGreen" : "borderRed";
  };

  //finebydotvalidation
  const driverFineVal = Number(driverDOTFine) || 0;
  const companyFineVal = Number(companyDOTFine) || 0;
  const hasAnyFine = driverFineVal > 0 || companyFineVal > 0;
  const getFineClass = (value) => {
    if (!finedByDOT || newLoading) return "";
    if (value > 0) return "borderGreen";
    if (!hasAnyFine) return "borderRed";
    return "";
  };

  //generalTab Validation
  useEffect(() => {
    const firstSection =
      (truckId || trailerId) &&
      inspectionDate &&
      isInspectionDateValid &&
      reportNumber &&
      !isPostalData &&
      postalCodePK;

    // Fine by DOT validation
    const finedByDOTValid = !finedByDOT || driverFineVal > 0 || companyFineVal > 0;

    // Award driver validation
    const awardDriverValid =
      !awardDriver ||
      (awardDriver &&
        Number(awardAmount) &&
        Number(awardSafetyMiles) &&
        parseFloat(awardAmount) >= parseFloat(defaultAwardAmount) &&
        parseFloat(awardSafetyMiles) >= parseFloat(defaultAwardSafetyMiles));

    const daysTillHoldValid =
      !driverFined ||
      (daysTillHold !== "" &&
        daysTillHold != null &&
        Number.isInteger(Number(daysTillHold)) &&
        Number(daysTillHold) >= 0);

    const minimumFineAmount = calculateMinFineAmount(false);
    const driverFinedValid =
      !driverFined ||
      (driverFined &&
        Number(fineAmount) &&
        Number(fineSafetyMiles) &&
        parseFloat(fineAmount) >= minimumFineAmount &&
        parseFloat(fineSafetyMiles) >= parseFloat(defaultFineSafetyMiles));

    if (firstSection && finedByDOTValid && awardDriverValid && driverFinedValid && daysTillHoldValid) {
      dispatch(setNewGeneralTabValid(true));
    } else {
      dispatch(setNewGeneralTabValid(false));
    }
  }, [
    truckInput,
    truckId,
    trailerId,
    trailerInput,
    inspectionDate,
    reportNumber,
    isPostalData,
    isInspectionDateValid,
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
    defaultFineSafetyMiles,
    daysTillHold,
    postalCodePK,
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
        driverCompanyFine: driverDotInspectionData?.FineAmount,
        driverHOSFine: driverDotInspectionData?.DOTInspectionHOSFine,
        driverDOTFine: driverDotInspectionData?.DOTInspectionDOTReportedFine,
        responseDate: null,
        daysTillHold:
          driverFined &&
          daysTillHold !== "" &&
          Number.isInteger(Number(daysTillHold)) &&
          Number(daysTillHold) >= 0
            ? Number(daysTillHold)
            : null,
        complianceHold: driverFined ? Boolean(complianceHold) : false,
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
    driverDotInspectionData?.DriverHOSFine,
    driverDotInspectionData?.DriverDOTFine,
    daysTillHold,
    complianceHold,
  ]);

  return (
    <div className="p-2">
      {(newLoading || isApiPending) && <LoadingIcon />}
      <div className=" p-2 d-flex align-items-center mb-0 mt-2">
        <Col sm={6} md={6} xs={6} className="mt-0">
          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0  `}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label  ">Truck</Form.Label>
            </Col>
            <Col xs={7} md={7} sm={7} className="d-flex ">
              {/*  Autocomplete */}
              <AutoCompleteDropdown
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
                disabled={trailerId}
                className={`customFormControl ${
                  newLoading || trailerId ? "" : truckId ? "borderGreen" : "borderRed"
                }`}
                loading={truckLoading}
              />
              <LookupButton onClick={() => setShowTruckLookup(true)} disabled={trailerId} />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label  ">Trailer</Form.Label>
            </Col>
            <Col xs={7} md={7} sm={7} className="d-flex ">
              {/*  Autocomplete */}
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
                disabled={truckId}
                className={`customFormControl ${
                  newLoading || truckId ? "" : trailerId ? "borderGreen" : "borderRed"
                }`}
                loading={trailerLoading}
              />
              <LookupButton onClick={() => setShowTrailerLookup(true)} disabled={truckId} />
            </Col>
          </Form.Group>

          <Form.Group className={` m-b-10 align-items-center row  m-l-0 m-r-0 mt-2  d-flex`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label ">Inspection Date</Form.Label>
            </Col>
            <Col xs={4} md={4} sm={4} className=" w-120px">
              <DateInputField
                className={`customFormControl ${
                  newLoading ? "" : inspectionDate && isInspectionDateValid ? "borderGreen" : "borderRed"
                }`}
                date={inspectionDate}
                setDate={(value) => {
                  setInspectionDate(value);
                }}
                setIsDateValid={setIsInspectionDateValid}
                max={new Date()}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-15 align-items-center row  m-l-0 m-r-0 mt-2`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="reportNumber" className="col-form-label">
                Report Number
              </Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5}>
              <Input
                className={`customFormControl ${
                  newLoading ? "" : reportNumber ? "borderGreen" : "borderRed"
                }`}
                id="reportNumber"
                name="reprtNmbr"
                type="search"
                value={reportNumber}
                onChange={(e) => setReportNumber(e.target.value)}
                maxLength={15}
              />
            </Col>
          </Form.Group>
          <PostalCodeComponent
            hideZip
            marginTop="-6px"
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
                    setDriverFined(true);
                  } else {
                  }
                }}
                disabled={awardDriver}
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
                    setDriverFined(true);
                    setFineAmount(fineAmount);
                    setFineSafetyMiles(fineSafetyMiles);
                  } else {
                  }
                }}
                disabled={awardDriver}
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
                    setDriverFined(true);
                    setFineAmount(fineAmount);
                    setFineSafetyMiles(fineSafetyMiles);
                  } else {
                  }
                }}
                disabled={awardDriver}
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
                    setDriverFined(true);
                    setFineAmount(fineAmount);
                    setFineSafetyMiles(fineSafetyMiles);
                  } else {
                  }
                }}
                disabled={awardDriver}
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
                    setDriverFined(true);
                    setFineAmount(fineAmount);
                    setFineSafetyMiles(fineSafetyMiles);
                  }
                }}
                disabled={awardDriver}
              />
            </Col>
          </Form.Group>

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
                disabled={newLoading || !driverFined}
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
                disabled={newLoading || !driverFined}
              />
            </Col>
          </Form.Group>
        </Col>

        <Col sm={6} md={6} xs={6} className="m-l-70 mt-0">
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
                    setDriverFined(true);
                  } else {
                  }
                }}
                disabled={awardDriver}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3  `}>
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
                    setDriverFined(true);
                  } else {
                    setDriverDOTFine(0);
                    setCompanyDOTFine(0);
                  }
                }}
                disabled={awardDriver}
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
              <Input
                className={`customFormControl ${getFineClass(driverFineVal)}`}
                id="driverDOTFine"
                name="driverDOTFine"
                type="search"
                value={driverDOTFine}
                maxLength={8}
                onChange={(e) => {
                  handleInputValue(e, setDriverDOTFine);
                  const value = e.target.value;
                  setDriverDOTFine(numberValidation(preventNegative(value)));
                }}
                disabled={
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
                  ) || !finedByDOT
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
              <Input
                className={`customFormControl ${getFineClass(companyFineVal)}`}
                id="companyDOTFine"
                name="companyDOTFine"
                type="search"
                value={companyDOTFine}
                maxLength={8}
                onChange={(e) => {
                  handleInputValue(e, setCompanyDOTFine);
                  const value = e.target.value;
                  setCompanyDOTFine(numberValidation(preventNegative(value)));
                }}
                disabled={
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
                  ) || !finedByDOT
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3  `}>
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
                    // Reset award fields to 0 when unchecked
                    setAwardAmount(0);
                    setAwardSafetyMiles(0);
                    // disable all other checkboxes
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
                disabled={driverFined}
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
              <input
                className={`customFormControl ${
                  newLoading
                    ? ""
                    : awardDriver
                      ? awardAmount === "" || awardAmount === "-" || awardAmount < defaultAwardAmount
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
                  const value = e.target.value;
                  setAwardAmount(numberValidation(preventNegative(value)));
                }}
                onBlur={(e) => {
                  if (
                    awardAmount === "" ||
                    awardAmount === "-" ||
                    (awardDriver && parseFloat(e.target.value) < parseFloat(defaultAwardAmount))
                  ) {
                    setAwardAmount(defaultAwardAmount);
                  }
                }}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={
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
                  ) || !awardDriver
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
              <input
                className={`customFormControl ${
                  newLoading
                    ? ""
                    : awardDriver
                      ? awardSafetyMiles === "" ||
                        awardSafetyMiles === "-" ||
                        awardSafetyMiles < defaultAwardSafetyMiles
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
                    awardSafetyMiles === "" ||
                    awardSafetyMiles === "-" ||
                    (awardDriver && parseFloat(e.target.value) < parseFloat(defaultAwardSafetyMiles))
                  ) {
                    setAwardSafetyMiles(defaultAwardSafetyMiles);
                  }
                }}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={
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
                  ) || !awardDriver
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3  `}>
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
                  setDriverFined(isChecked);

                  if (isChecked) {
                    setAwardDriver(false);
                  } else {
                    setMinAmount(defaultFineAmount);
                    setFineAmount(0);
                    setFineSafetyMiles(0);
                    setDaysTillHold("");
                    setComplianceHold(false);
                  }
                }}
                disabled={
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
              <input
                className={`customFormControl ${getFineAmountBorderClass()}`}
                id="fineAmount"
                name="fineAmount"
                type="search"
                value={fineAmount}
                maxLength={8}
                onChange={(e) => {
                  handleInputValue(e, setFineAmount);
                  const value = e.target.value;
                  if (value) {
                    setFineAmount(numberValidation(preventNegative(value)));
                    handleNewMinimum(preventNegative(value));
                  }
                }}
                onBlur={() => handleFineAmountBlur()}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={
                  (!hoursOfServiceViolation &&
                    !unsafeDrivingViolation &&
                    !physicalFitnessViolation &&
                    !drugAlcoholViolation &&
                    !maintenanceViolation &&
                    !notifiedByDOT &&
                    !finedByDOT &&
                    !awardDriver &&
                    !driverFined) ||
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
                  newLoading
                    ? ""
                    : driverFined
                      ? fineSafetyMiles >= defaultFineSafetyMiles && Number(fineSafetyMiles)
                        ? "borderGreen"
                        : "borderRed"
                      : ""
                }`}
                id="fineSafetyMiles"
                name="fineSafetyMiles"
                type="search"
                value={fineSafetyMiles}
                maxLength={8}
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
                  ) || !driverFined
                }
              />
            </Col>
          </Form.Group>
        </Col>
      </div>
      <DriverTrailerLookup
        show={showTrailerLookup}
        handleLookupSelection={handleTrailerSelection}
        onHide={() => setShowTrailerLookup(false)}
        DOTInspection
      />
      <DriverTruckLookup
        show={showTruckLookup}
        handleLookupSelection={handleTruckSelection}
        onHide={() => setShowTruckLookup(false)}
        DOTInspection
      />
    </div>
  );
};

export default DOTNewGeneral;
