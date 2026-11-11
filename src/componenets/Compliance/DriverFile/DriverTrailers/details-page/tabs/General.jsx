import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../../../../../styles/ThreeQuarterScreen.module.css";
import DateInputField from "../../../../../common/DateInputField";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  setActive,
  setDriverTrailersData,
  setIsGeneralTabValid,
} from "../../../../../../redux/DriverTrailersSlice";
import { useParams } from "react-router-dom";
import DriverTrailersService from "../../../../../../services/DriverFile/DriverTrailersService";
import LookupButton from "../../../../../common/LookupButton";
import DriverService from "../../../../../../services/DriverService";
import StateService from "../../../../../../services/StateService";
import ModalComponent from "../../../../../common/ModalComponent";
import DriverLookup from "../../../../../LookupScreens/Driver/DriverLookup";
import { correctDecimalInputOnBlur, isOnlyDot } from "../../../../../../utils/utils";
import formatDatetimeToDate from "../../../../../../utils/formatDateTimeToDate";
import LoadingIcon from "../../../../../common/LoadingIcon";
import Input from "../../../../../../components/common/input";

const MAX_INT_VALUE = 2147483647; // max 32-bit integer

const General = () => {
  const dispatch = useDispatch();
  const { driverId, recordId } = useParams();
  const id = recordId;
  const driverFK = driverId;

  const [description, setDescription] = useState("");
  const [principleTrailer, setPrincipleTrailer] = useState(false);
  const [isFirstTrailer, setIsFirstTrailer] = useState(false);
  const [showPrincipleTrailerModal, setShowPrincipleTrailerModal] = useState(false);
  const [thirtyFiveInchTrailer, setThirtyFiveInchTrailer] = useState(false);
  const [flabedTrailer, setFlabedTrailer] = useState(false);
  const [popUpTrailer, setPopUpTrailer] = useState(false);
  const [truckCamperTrailer, setTruckCamperTrailer] = useState(false);
  const [GVWR, setGVWR] = useState("");
  const [scaleWeight, setSetscaleWeight] = useState("");
  const [values, setvalues] = useState("");
  const [vin, setVin] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [deckType, setDeckType] = useState("");
  const [deckLength, setDeckLength] = useState("");
  const [year, setYear] = useState("");
  const [licensePlateNumber, setLicensePlateNumber] = useState("");
  const [licensePlateExpiration, setLicensePlateExpiration] = useState("");
  const [isLicensePlateExpirationValid, setIsLicensePlateExpirationValid] = useState(true);
  const [plateWeightRating, setPlateWeightRating] = useState("");
  const [registrationExpiration, setRegistrationExpiration] = useState("");
  const [isRegistrationExpirationValid, setIsRegistrationExpirationValid] = useState(true);
  const [driverSelection, setDriverSelection] = useState(false);

  const viewDetail = useSelector((state) => state.driverTrailers.viewDetail);
  const formData = useSelector((state) => state.driverTrailers.formData);
  const isTabIdentify = useSelector((state) => state.driverTrailers.isTabIdentify);
  const active = useSelector((state) => state.driverTrailers.active);

  const [descriptionUnique, setDescriptionUnique] = useState(false);
  const [coDriver, setCoDriver] = useState([]);
  const [coDriverFK, setCoDriverFK] = useState();
  const [coDriverInput, setCoDriverInput] = useState("");
  const [licensePlateState, setLicensePlateState] = useState([]);
  const [licensePlateStateInput, setLicensePlateStateInput] = useState("");
  const [stateRefresh, setStateRefresh] = useState(false); // For State
  const [driverLoading, setDriverLoading] = useState(false);

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const driverModalHide = () => {
    setDriverSelection(false);
  };

  const driverLookupSelection = (data) => {
    if (data.lastName != null) {
      setCoDriverInput((data.firstName + " " + data.lastName)?.trim());
    } else {
      setCoDriverInput(data.firstName?.trim());
    }
    setCoDriverFK(data.driverPK);
    setDriverSelection(false);
  };

  /*
      checkPrincileTrailer method is used to check the driver has any principle trailer exist or note 
      arguments :- driverFK (Driver Id)
      Return :- true :If exist 
                false : If not exist
  */

  const checkPrincileTrailer = (value) => {
    if (value) {
      setLoading1(false);
      DriverTrailersService.getPrincipleTrailer(driverFK)
        .then((res) => {
          if (res.data) {
            setShowPrincipleTrailerModal(true);
          } else {
            setPrincipleTrailer(value);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading1(true));
    } else {
      setPrincipleTrailer(value);
    }
  };

  //  Code for description unique check

  const checkDescriptionExist = (description) => {
    if (isTabIdentify === "general") {
      setLoading2(false);
      DriverTrailersService.checkDescriptionExist(driverFK, description, id)
        .then((res) => {
          setDescriptionUnique(res.data);
        })
        .catch((err) => {
          setDescriptionUnique(false);
          console.log(err);
        })
        .finally(() => setLoading2(true));
    }
  };

  /*
      For checking If the first time the trailer added aganist the driver
      checkIsFirstTrailer method execute only when id==null
      fetchPickupState is used to fetch the data.
  */
  useEffect(() => {
    if (!viewDetail && !id) {
      setLoading3(false);
      DriverTrailersService.checkIsFirstTrailer(driverFK)
        .then((res) => {
          setIsFirstTrailer(res.data);
          setPrincipleTrailer(res.data);
        })
        .catch((err) => {
          setIsFirstTrailer(false);
        });
    }

    StateService.fetchPickupState(String)
      .then(({ data }) => {
        setLicensePlateState(data.content);
        setStateRefresh(false);
      })
      .catch(() => {
        setStateRefresh(false);
      })
      .finally(() => setLoading3(true));
  }, []);

  // Tab Validation for required fields
  useEffect(() => {
    if (
      description &&
      !descriptionUnique &&
      (popUpTrailer || flabedTrailer || thirtyFiveInchTrailer || truckCamperTrailer) &&
      GVWR &&
      GVWR > 0 &&
      GVWR <= MAX_INT_VALUE &&
      scaleWeight &&
      scaleWeight > 0 &&
      scaleWeight <= MAX_INT_VALUE &&
      vin &&
      make &&
      model &&
      deckType &&
      deckLength &&
      deckLength > 0 &&
      year &&
      year >= 2000 &&
      licensePlateNumber &&
      isLicensePlateExpirationValid &&
      registrationExpiration &&
      isRegistrationExpirationValid &&
      plateWeightRating &&
      plateWeightRating > 0 &&
      plateWeightRating <= MAX_INT_VALUE &&
      licensePlateStateInput &&
      (coDriverInput ? coDriverFK : true) &&
      values &&
      values > 0 &&
      !isOnlyDot(values)
    ) {
      dispatch(setIsGeneralTabValid(true));
    } else {
      dispatch(setIsGeneralTabValid(false));
    }
  }, [
    description,
    principleTrailer,
    GVWR,
    scaleWeight,
    values,
    vin,
    make,
    model,
    deckType,
    deckLength,
    year,
    licensePlateNumber,
    licensePlateState,
    isLicensePlateExpirationValid,
    registrationExpiration,
    isRegistrationExpirationValid,
    plateWeightRating,
    thirtyFiveInchTrailer,
    flabedTrailer,
    popUpTrailer,
    truckCamperTrailer,
    descriptionUnique,
    licensePlateStateInput,
    coDriverFK,
    coDriverInput,
  ]);

  const generalTabData = () => {
    dispatch(
      setDriverTrailersData({
        active: active,
        driverTrailerPK: id ? id : null,
        description: description,
        coDriverId: coDriverFK,
        principle: principleTrailer,
        thirtyFiveTrailer: thirtyFiveInchTrailer,
        lowBoyTrailer: flabedTrailer,
        popupTrailer: popUpTrailer,
        truckCamperTrailer: truckCamperTrailer,
        gvwr: GVWR,
        scaleWeight: scaleWeight,
        trailerValue: values ? values : 0,
        vin: vin,
        make: make,
        model: model,
        deckType: deckType,
        deckLength: deckLength,
        year: year,
        licenseNumber: licensePlateNumber,
        licenseState: licensePlateStateInput,
        licenseWeight: plateWeightRating,
        registrationExpirationDate: registrationExpiration,
        licenseExpirationDate: licensePlateExpiration,
        driverId: driverFK,
      })
    );
  };

  useEffect(() => {
    generalTabData();
  }, [
    id,
    active,
    description,
    coDriver,
    principleTrailer,
    thirtyFiveInchTrailer,
    flabedTrailer,
    popUpTrailer,
    truckCamperTrailer,
    GVWR,
    scaleWeight,
    values,
    coDriverFK,
    vin,
    make,
    model,
    deckType,
    deckLength,
    year,
    licensePlateNumber,
    licensePlateState,
    plateWeightRating,
    registrationExpiration,
    licensePlateExpiration,
    driverFK,
    licensePlateStateInput,
  ]);

  useEffect(() => {
    if (formData != null) {
      dispatch(setActive(formData?.active || false));
      setDescription(formData?.description || "");
      setPrincipleTrailer(formData?.principle || false);
      setThirtyFiveInchTrailer(formData?.thirtyFiveTrailer || false);
      setFlabedTrailer(formData?.lowBoyTrailer || false);
      setPopUpTrailer(formData?.popupTrailer || false);
      setTruckCamperTrailer(formData?.truckCamperTrailer || false);
      setGVWR(formData?.gvwr || ""); // Not display
      setSetscaleWeight(formData?.scaleWeight || "");
      setvalues(formData?.trailerValue || ""); // Not value
      setVin(formData?.vin || "");
      setMake(formData?.make || "");
      setModel(formData?.model || "");
      setDeckType(formData?.deckType || "");
      setDeckLength(formData?.deckLength || "");
      setYear(formData?.year || "");
      setLicensePlateNumber(formData?.licenseNumber || "");
      setLicensePlateExpiration(formatDatetimeToDate(formData?.licenseExpirationDate || ""));
      setPlateWeightRating(formData?.licenseWeight || "");
      setRegistrationExpiration(formatDatetimeToDate(formData?.registrationExpirationDate) || "");
      setCoDriverFK(formData?.coDriverId || null);
      setCoDriverInput(formData?.coDriver || "");
      setLicensePlateStateInput(formData?.licenseState);
    }
    setDescriptionUnique(false);
    if (!active) {
      setPrincipleTrailer(false);
    }
  }, [formData, viewDetail]);

  const fetchCoDriverByName = (string) => {
    if (isTabIdentify === "general") {
      setDriverLoading(true);
      DriverService.getDriverForAuto(string, null, driverId)
        .then(({ data }) => {
          setCoDriver(data.content);
          setDriverLoading(false);
        })
        .catch((error) => {
          console.log("error ", error);
        })
        .finally(() => {
          setDriverLoading(false);
        });
    }
  };

  const handleCoDriverToLookupSelection = (driver) => {
    if (driver) {
      setCoDriverFK(driver.driverPK);
      if (driver.lastName != null) {
        setCoDriverInput((driver.firstName + " " + driver.lastName)?.trim());
      } else {
        setCoDriverInput(driver.firstName?.trim());
      }
    }
  };

  //number validation
  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d]/g, "");

    if (value) return number;
  };

  const isDecimal = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d:.]/g, "");

    if (value) return number;
  };

  const handleYearChange = (e) => {
    const inputYear = parseInt(e.target.value);
    if (inputYear) {
      if (inputYear < 2000) {
        setYear(2000);
      } else {
        setYear(inputYear);
      }
    }
  };

  useEffect(() => {
    if (!id) {
      dispatch(setActive(true));
      DriverTrailersService.getPrincipleTrailer(driverFK)
        .then((res) => {
          if (!res.data) {
            setPrincipleTrailer(true);
          }
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div className="p-0 w-100">
      <Row className="m-0 p-20">
        <Col sm={7} md={7} lg={7} xl={7} xs={7}>
          <Form.Group className="mt-4 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Description</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <Input
                type="text"
                value={description}
                maxLength={30}
                className={`customFormControl ${
                  !viewDetail ? (description && !descriptionUnique ? "borderGreen" : "borderRed") : ""
                }`}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDescriptionUnique(false);
                }}
                onBlur={(e) => checkDescriptionExist(e.target.value)}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>CoDriver</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0 d-flex" style={{ width: "275px" }}>
              <AutoCompleteDropdown
                className={`customFormControl  ${
                  viewDetail || coDriverInput === "" ? "" : !coDriverFK ? "borderRed" : "borderBlack"
                }`}
                arrayList={coDriver}
                disabled={viewDetail}
                searchString={coDriverInput}
                customFormatSearchString={(searchString) => searchString}
                renderItemId={(trailerOwner) => trailerOwner.driverPK}
                renderItemField={(trailerOwner) =>
                  trailerOwner.lastName != null
                    ? trailerOwner.firstName + " " + trailerOwner.lastName
                    : trailerOwner.firstName
                }
                handleSearchString={(string) => setCoDriverInput(string)}
                fetchDataBySearchString={(string) => {
                  fetchCoDriverByName(string);
                }}
                onSelect={handleCoDriverToLookupSelection}
                clearInputCallback={() => {
                  setCoDriverFK(null);
                }}
                selectedId={coDriverFK}
                loading={driverLoading}
              />
              <LookupButton
                onClick={() => {
                  setDriverSelection(true);
                }}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Principle Trailer</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 `}
                checked={principleTrailer}
                onChange={(e) => {
                  checkPrincileTrailer(e.target.checked);
                }}
                disabled={
                  viewDetail || isFirstTrailer || formData?.principle || (!formData?.active && id != null)
                }
              />
            </Col>

            <ModalComponent
              show={showPrincipleTrailerModal}
              onHide={() => setShowPrincipleTrailerModal(false)}
              title={"Principle Trailer"}
              body={"Do you want to make this driver trailer as a Principle Trailer"}
              handleYES={() => {
                setPrincipleTrailer(true);
                setShowPrincipleTrailerModal(false);
              }}
              handleNO={() => {
                setPrincipleTrailer(false);
                setShowPrincipleTrailerModal(false);
              }}
            />
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>35' Trailer</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                checked={thirtyFiveInchTrailer}
                className={`form-check-input p-0  ${
                  !viewDetail
                    ? !flabedTrailer && !popUpTrailer && !truckCamperTrailer && !thirtyFiveInchTrailer
                      ? "borderRed form-check-input mt-0"
                      : "form-check-input mt-0"
                    : ""
                }`}
                onChange={(e) => setThirtyFiveInchTrailer(e.target.checked)}
                disabled={viewDetail || flabedTrailer || truckCamperTrailer || popUpTrailer}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Flatbed Trailer</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0  ${
                  !viewDetail
                    ? !flabedTrailer && !popUpTrailer && !truckCamperTrailer && !thirtyFiveInchTrailer
                      ? "borderRed form-check-input mt-0"
                      : "form-check-input mt-0"
                    : ""
                }`}
                checked={flabedTrailer}
                onChange={(e) => setFlabedTrailer(e.target.checked)}
                disabled={viewDetail || truckCamperTrailer || thirtyFiveInchTrailer || popUpTrailer}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Pop Up Trailer</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0  ${
                  !viewDetail
                    ? !flabedTrailer && !popUpTrailer && !truckCamperTrailer && !thirtyFiveInchTrailer
                      ? "borderRed form-check-input mt-0"
                      : "form-check-input mt-0"
                    : ""
                }`}
                checked={popUpTrailer}
                onChange={(e) => setPopUpTrailer(e.target.checked)}
                disabled={viewDetail || flabedTrailer || thirtyFiveInchTrailer || truckCamperTrailer}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Truck Camper Trailer</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0  ${
                  !viewDetail
                    ? !flabedTrailer && !popUpTrailer && !truckCamperTrailer && !thirtyFiveInchTrailer
                      ? "borderRed form-check-input mt-0"
                      : "form-check-input mt-0"
                    : ""
                }`}
                checked={truckCamperTrailer}
                onChange={(e) => setTruckCamperTrailer(e.target.checked)}
                disabled={viewDetail || flabedTrailer || thirtyFiveInchTrailer || popUpTrailer}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>GVWR</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-80px">
              <Input
                type="text"
                value={GVWR}
                className={`customFormControl ${
                  !viewDetail ? (GVWR && GVWR > 0 && GVWR <= MAX_INT_VALUE ? "borderGreen" : "borderRed") : ""
                }`}
                id="GVWR"
                name="GVWR"
                maxLength={10}

                onChange={(e) => setGVWR(isNumber(e.target.value))}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Scale Weight</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-80px">
              <Input
                type="text"
                value={scaleWeight}
                className={`customFormControl ${
                  !viewDetail
                    ? scaleWeight && scaleWeight > 0 && scaleWeight <= MAX_INT_VALUE
                      ? "borderGreen"
                      : "borderRed"
                    : ""
                }`}
                id="scaleWeight"
                name="scaleWeight"
                maxLength={10}
                onChange={(e) => setSetscaleWeight(isNumber(e.target.value))}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Value</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="m-0 p-0 w-80px">
              <Input
                type="text"
                value={values}
                className={`customFormControl ${
                  !viewDetail
                    ? values && values > 0 && !isOnlyDot(values)
                      ? "borderGreen"
                      : "borderRed"
                    : ""
                }`}
                id="values"
                name="values"
                maxLength={8}
                autoComplete="off"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.match(/^\d{0,5}(\.\d{0,2})?$/)) {
                    setvalues(isDecimal(value));
                  }
                }}
                onBlur={(e) => {
                  setvalues(correctDecimalInputOnBlur(e.target.value));
                }}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>
        </Col>

        <Col sm={5} xs={5} md={5}>
          <Form.Group className="mt-4 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Vin</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <Input
                type="text"
                className={`customFormControl ${!viewDetail ? (vin ? "borderGreen" : "borderRed") : ""}`}
                value={vin}
                maxLength={21}
                onChange={(e) => setVin(e.target.value)}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="m-t-20 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Make</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                type="text"
                className={`customFormControl ${!viewDetail ? (make ? "borderGreen" : "borderRed") : ""}`}
                value={make}
                maxLength={30}
                onChange={(e) => setMake(e.target.value)}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="m-t-20 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Model</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <Input
                type="text"
                className={`customFormControl ${!viewDetail ? (model ? "borderGreen" : "borderRed") : ""}`}
                value={model}
                maxLength={30}
                onChange={(e) => setModel(e.target.value)}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="m-t-20 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Deck Type</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <Input
                type="text"
                className={`customFormControl ${!viewDetail ? (deckType ? "borderGreen" : "borderRed") : ""}`}
                value={deckType}
                maxLength={30}
                onChange={(e) => setDeckType(e.target.value)}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="m-t-20 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Deck Length</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0" style={{ width: "25px" }}>
              <Input
                type="text"
                value={deckLength}
                className={`customFormControl ${
                  !viewDetail ? (deckLength && deckLength > 0 ? "borderGreen" : "borderRed") : ""
                }`}
                id="deckLength"
                name="deckLength"
                maxLength={2}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => setDeckLength(isNumber(e.target.value))}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="m-t-20 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Year</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0" style={{ width: "40px" }}>
              <Input
                type="text"
                value={year}
                className={`customFormControl ${
                  !viewDetail
                    ? (year ? "borderGreen" : "borderRed") && (year >= 2000 ? "borderGreen" : "borderRed")
                    : ""
                }`}
                id="year"
                name="year"
                maxLength={4}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => setYear(isNumber(e.target.value))}
                onBlur={handleYearChange}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="m-t-20 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={` col-form-label ${styles.orderLabel} dealer-label`}>
                License Plate Number
              </Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className={`p-0 `} style={{ width: "100px" }}>
              <Input
                type="text"
                className={`customFormControl  ${
                  !viewDetail ? (licensePlateNumber ? "borderGreen" : "borderRed") : ""
                }`}
                value={licensePlateNumber}
                maxLength={10}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/^\s/, ""); // Remove leading space
                  value = value.replace(/[^A-Za-z0-9 ]/g, ""); // Allow letters, numbers, and spaces only
                  value = value.toUpperCase();
                  setLicensePlateNumber(value);
                }}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="m-t-20 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>License Plate State</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0 " style={{ width: "80px" }}>
              <Form.Select
                className={`customFormControl ${
                  !viewDetail ? (!licensePlateStateInput ? "borderRed" : "borderGreen") : ""
                }`}
                name="licensePlateStateInput"
                id="licensePlateStateInput"
                value={licensePlateStateInput}
                onChange={(e) => {
                  setLicensePlateStateInput(e.target.value);
                }}
                disabled={viewDetail}
              >
                <option value="">--Select--</option>
                {licensePlateState?.map((licensePlateStateInput) => (
                  <option key={licensePlateStateInput.statesPK} value={licensePlateStateInput.stateCode}>
                    {licensePlateStateInput.stateCode}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          {/* *********     Future Use    ************* */}
          {/* <Form.Group className="m-t-20 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>License Plate Expiration</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className={`p-0 `} style={{ width: "95px" }}>
              <DateInputField
                date={licensePlateExpiration}
                setDate={setLicensePlateExpiration}
                setIsDateValid={setIsLicensePlateExpirationValid}
                disabled={viewDetail}
                className={`customFormControl  ${
                  !viewDetail
                    ? licensePlateExpiration && isLicensePlateExpirationValid
                      ? "borderGreen"
                      : "borderRed"
                    : ""
                }`}
              />
            </Col>
          </Form.Group> */}

          <Form.Group className="m-t-20 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Plate Weight Rating</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className={`p-0 d-flex w-80px`}>
              <Input
                type="text"
                value={plateWeightRating}
                className={`customFormControl ${
                  !viewDetail
                    ? (plateWeightRating ? "borderGreen" : "borderRed") &&
                      (plateWeightRating > 0 && plateWeightRating <= MAX_INT_VALUE
                        ? "borderGreen"
                        : "borderRed")
                    : ""
                }`}
                id="plateWeightRating"
                name="plateWeightRating"
                maxLength={10}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => setPlateWeightRating(isNumber(e.target.value))}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="m-t-20 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Registration Expiration</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className={`p-0 `} style={{ width: "95px" }}>
              <DateInputField
                date={registrationExpiration}
                setDate={setRegistrationExpiration}
                setIsDateValid={setIsRegistrationExpirationValid}
                disabled={viewDetail}
                className={`customFormControl  ${
                  !viewDetail
                    ? registrationExpiration && isRegistrationExpirationValid
                      ? "borderGreen"
                      : "borderRed"
                    : ""
                }`}
              />
            </Col>
          </Form.Group>
        </Col>

        {/* <DriverSelectionLookupTemplate */}
        <DriverLookup
          show={driverSelection}
          onHide={driverModalHide}
          renderItemId={(data) => data.driverPK}
          handleLookupSelection={driverLookupSelection}
          ExcludeDriver
          excludeDriverId={driverId}
        />
      </Row>
    </div>
  );
};

export default General;
