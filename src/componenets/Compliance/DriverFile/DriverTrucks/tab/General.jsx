import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import DateInputField from "../../../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../../../../common/ModalComponent";
import {
  setDriverTruckData,
  setIsGeneralTabValid,
  setDescriptionUnique,
  setActive,
  setShowPrincipleModel,
} from "../../../../../redux/DriverTrucksSlice";
import { useParams } from "react-router-dom";
import LookupButton from "../../../../common/LookupButton";

import DriverService from "../../../../../services/DriverService";
import DriverTrucksService from "../../../../../services/DriverFile/DriverTrucksService";
import DriverLookup from "../../../../LookupScreens/Driver/DriverLookup";
import DriverServicesService from "../../../../../services/DriverServicesService";
import { cleanFirstChar } from "../../../../../utils/utils";
import LoadingIcon from "../../../../common/LoadingIcon";
import Input from "../../../../../components/common/input";

const MAX_INT_VALUE = 2147483647; // max 32-bit integer

const General = ({ stateList = [] }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [description, setDescription] = useState("");
  const [principletruck, setPrincipleTruck] = useState(false);
  const [isFirstTruck, setIsFirstTruck] = useState(false);
  const [showPrincipleTruckModal, setShowPrincipleTruckModal] = useState(false);
  const [halfton, setHalfTon] = useState(false);
  const [haulandtow, setHaulandTow] = useState(false);
  const [semitractor, setSemiTractor] = useState(false);
  const [diesel, setDiesel] = useState(false);
  const [haspintalhook, setHasPintalHook] = useState(false);
  const [hasSleeper, setHasSleeper] = useState(false);
  const [gvwr, setGvwr] = useState("");
  const [scaleweight, setScaleWeight] = useState("");
  const [value, setValue] = useState("");
  const [vin, setVin] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [trucktype, setTruckType] = useState("");
  const [year, setYear] = useState("");
  const [registrationexpiration, setRegistrationExpiration] = useState("");
  const [isRegistrationExpirationValidation, setIsRegistrationExpirationValidation] = useState(true);
  const [licenseplatenumber, setLicensePlateNumber] = useState("");
  const [plateweightrating, setPlateWeightRating] = useState("");
  const viewDetails = useSelector((state) => state.driverTrucks.viewDetails);
  const descriptionUnique = useSelector((state) => state.driverTrucks.descriptionUnique);
  const selectedId = useSelector((state) => state.driverTrucks.selectedId);
  const numberRegex = /^\d+$/;
  const [truckcode, setTruckCode] = useState("");
  const [truckCodeList, setTruckCodeList] = useState([]);
  const { driverId, recordId } = useParams();
  const id = recordId;
  const driverFK = driverId;
  const active = useSelector((state) => state.driverTrucks.active);
  const [codriver, setCodriver] = useState([]);
  const [coDriverFK, setCoDriverFK] = useState(null);
  const [coDriverInput, setCoDriverInput] = useState("");
  const formData = useSelector((state) => state.driverTrucks.formData);
  // Fetched once in TruckFormContent and shared with the Compliance tab
  const licensePlateState = stateList;
  const [licensePlateStateFK, setlicensePlateStateFK] = useState();
  const [licensePlateStateInput, setLicensePlateStateInput] = useState("");
  const [driverSelection, setDriverSelection] = useState(false);
  const [carb, setCarb] = useState(false);
  const [carbDate, setCarbDate] = useState("");

  const [codriverLoading, setcodriverLoading] = useState(false);
  const [loading10, setLoading10] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(true);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [loading6, setLoading6] = useState(false);
  const driverTruckData = useSelector((state) => state.driverTrucks.driverTruckData);
  const isIrpPlate = !!driverTruckData?.irp;
  const previousIsIrpPlate = useRef(isIrpPlate);

  const checkPrincileTruck = (value) => {
    if (value) {
      setLoading10(true);
      DriverTrucksService.getPrincipleTruck(driverFK)
        .then((res) => {
          if (res.data) {
            setShowPrincipleTruckModal(true);
            dispatch(setShowPrincipleModel(true));
          } else {
            setPrincipleTruck(value);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading10(false);
        });
    } else {
      setPrincipleTruck(value);
    }
  };

  const driverModalHide = () => {
    setDriverSelection(false);
  };

  const fetchCoDriverByName = (string) => {
    setcodriverLoading(true);
    DriverService.getDriverForAuto(string, null, driverId)
      .then(({ data }) => {
        setCodriver(data.content);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setcodriverLoading(false);
      });
  };

  const handleCoDriverToLookupSelection = (driver) => {
    setCoDriverFK(driver.driverPK);
    if (driver.lastName != null) {
      setCoDriverInput(driver.firstName + " " + driver.lastName);
    } else {
      setCoDriverInput(driver.firstName);
    }
    setDriverSelection(false);
  };

  const isDecimal = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d:.]/g, "");

    if (value) return number;
  };

  const checkDescriptionExist = (description) => {
    // Skip the Unique Check API when Description is empty or contains only spaces.
    if (!description?.trim()) {
      return;
    }

    DriverTrucksService.checkDescriptionExist(driverFK, description, id)
      .then((res) => {
        dispatch(setDescriptionUnique(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    setLoading3(true);
    DriverTrucksService.getIsFirstTruck(driverFK)
      .then((res) => {
        setIsFirstTruck(res.data);
        setPrincipleTruck(res.data);
      })
      .catch((err) => {
        setIsFirstTruck(false);
      })
      .finally(() => {
        setLoading3(false);
      });
  }, []);

  const fetchCoDriverInput = (id) => {
    if (id) {
      setLoading4(true);
      DriverServicesService.getDriverDetails(id)
        .then((response) => {
          const data = response.data;
          setCoDriverInput(data.name?.trim());
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading4(false);
        });
    } else {
      setCoDriverInput("");
    }
  };

  const fetchTruckCode = (halfTonFlag, haulAndTowFlag, semiTractorFlag, preferredCode = null) => {
    setLoading5(true);
    DriverTrucksService.getTruckCode(halfTonFlag, haulAndTowFlag, semiTractorFlag)
      .then((response) => {
        const { data = [] } = response || {};
        setTruckCodeList(data);

        if (data.length === 1) {
          setTruckCode(data[0].truckCodeId);
        } else if (data.length > 1) {
          setTruckCode((prev) => {
            const candidate = preferredCode ?? prev;
            const stillValid = data.some((item) => item.truckCodeId === candidate);
            return stillValid ? candidate : "";
          });
        } else {
          setTruckCode("");
        }
      })
      .catch((err) => {
        console.error(err);
        setTruckCodeList([]);
        setTruckCode("");
      })
      .finally(() => {
        setLoading5(false);
      });
  };

  useEffect(() => {
    fetchTruckCode(halfton, haulandtow, semitractor);
  }, []);

  useEffect(() => {
    if (!id) {
      setLoading6(true);
      DriverTrucksService.getPrincipleTruck(driverFK)
        .then((res) => {
          if (!res.data) {
            setPrincipleTruck(true);
          }
        })
        .finally(() => {
          setLoading6(false);
        });
    }
  }, []);

  useEffect(() => {
    if (previousIsIrpPlate.current && !isIrpPlate) {
      setLicensePlateNumber("");
      setLicensePlateStateInput("");
      setlicensePlateStateFK(null);
      setPlateWeightRating("");
    }

    previousIsIrpPlate.current = isIrpPlate;
  }, [isIrpPlate]);

  useEffect(() => {
    dispatch(
      setDriverTruckData({
        principle: principletruck,
        description: description,
        make: make,
        model: model,
        driverTruckPK: id ? id : null,
        coDriverId: coDriverFK,
        truckType: trucktype,
        truckCode: truckcode,
        vin: vin,
        year: year,
        gvwr: gvwr,
        scaleWeight: scaleweight,
        haulAndTow: haulandtow,
        halfTon: halfton,
        truckValue: value ? value : 0,
        semiTractor: semitractor,
        diesel: diesel,
        pintleHook: haspintalhook,
        hasSleeper: hasSleeper,

        licenseNumber: isIrpPlate ? "" : licenseplatenumber,
        licenseState: isIrpPlate ? "" : licensePlateStateInput,
        licenseWeight: isIrpPlate ? "" : plateweightrating,
        registrationExpirationDate: registrationexpiration,
        active: active,
        driverId: driverFK,
        hasLicensePlateInformation: isIrpPlate
          ? false
          : !!(licenseplatenumber || licensePlateStateInput || plateweightrating),
      })
    );
  }, [
    principletruck,
    description,
    make,
    model,
    coDriverFK,
    trucktype,
    truckcode,
    vin,
    year,
    gvwr,
    scaleweight,
    haulandtow,
    halfton,
    semitractor,
    haspintalhook,
    licenseplatenumber,
    licensePlateState,
    plateweightrating,
    registrationexpiration,
    value,
    active,
    diesel,
    driverFK,
    licensePlateStateInput,
    hasSleeper,
    isIrpPlate,
  ]);

  useEffect(() => {
    if (isIrpPlate) {
      setLicensePlateNumber("");
      setLicensePlateStateInput("");
      setlicensePlateStateFK(null);
      setPlateWeightRating("");
    }
  }, [isIrpPlate]);

  useEffect(() => {
    if (formData) {
      setDescription(formData?.description || "");
      dispatch(setActive(formData?.active || false));
      setCoDriverFK(formData?.coDriverId || null);
      fetchCoDriverInput(formData?.coDriverId);
      setPrincipleTruck(formData?.principle || false);
      const halfTonVal = formData?.halfTon || false;
      const haulAndTowVal = formData?.haulAndTow || false;
      const semiTractorVal = formData?.semiTractor || false;
      setHalfTon(halfTonVal);
      setHaulandTow(haulAndTowVal);
      setSemiTractor(semiTractorVal);
      setDiesel(formData?.diesel || false);
      setHasPintalHook(formData?.pintleHook || false);
      setHasSleeper(formData?.hasSleeper || false);
      setGvwr(formData?.gvwr || "");
      setScaleWeight(formData?.scaleWeight || "");
      setValue(formData?.truckValue || "");
      setVin(formData?.vin || "");
      setMake(formData?.make || "");
      setModel(formData?.model || "");
      setTruckType(formData?.truckType || "");
      setYear(formData?.year || "");

      const savedTruckCode = formData?.truckCode || "";
      setTruckCode(savedTruckCode);

      setRegistrationExpiration(formData?.registrationExpirationDate || "");

      setLicensePlateNumber(formData?.licenseNumber || "");
      setPlateWeightRating(formData?.licenseWeight || "");
      setlicensePlateStateFK(formData?.licenseState);
      setLicensePlateStateInput(formData?.licenseState || "");

      if (!active) {
        setPrincipleTruck(false);
      }

      fetchTruckCode(halfTonVal, haulAndTowVal, semiTractorVal, savedTruckCode);
    }
  }, [formData, viewDetails]);

  useEffect(() => {
    const regularLicenseConditionsMet =
      isIrpPlate ||
      (licensePlateStateInput &&
        licenseplatenumber &&
        plateweightrating > 0 &&
        plateweightrating <= MAX_INT_VALUE);
    if (
      description &&
      !descriptionUnique &&
      (coDriverInput ? coDriverFK : true) &&
      gvwr > 0 &&
      gvwr <= MAX_INT_VALUE &&
      registrationexpiration &&
      isRegistrationExpirationValidation &&
      scaleweight > 0 &&
      scaleweight <= MAX_INT_VALUE &&
      vin &&
      make &&
      model &&
      trucktype &&
      year &&
      regularLicenseConditionsMet
    ) {
      dispatch(setIsGeneralTabValid(true));
    } else {
      dispatch(setIsGeneralTabValid(false));
    }
  }, [
    description,
    coDriverFK,
    coDriverInput,
    principletruck,
    gvwr,
    registrationexpiration,
    isRegistrationExpirationValidation,
    scaleweight,
    value,
    vin,
    make,
    model,
    trucktype,
    year,
    licenseplatenumber,
    plateweightrating,
    descriptionUnique,
    licensePlateState,
    licensePlateStateFK,
    licensePlateStateInput,
    isIrpPlate,
  ]);

  return (
    <div className="p-0 w-100">
      {(loading10 || loading1 || loading2 || loading3 || loading4 || loading5 || loading6) && <LoadingIcon />}
      <Row className="m-0 p-0">
        <Col sm={6} md={6} lg={6} xl={6} xs={6} style={{ minWidth: "550px" }}>
          <Form.Group className=" form-group align-items-center row m-l-0 m-r-0 mt-3">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Description</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <Input
                type="text"
                value={description}
                maxLength={30}
                className={`customFormControl ${
                  !viewDetails ? (description && !descriptionUnique ? "borderGreen" : "borderRed") : ""
                }`}
                onChange={(e) => {
                  const cleaned = cleanFirstChar(e.target.value);
                  setDescription(cleaned);
                  dispatch(setDescriptionUnique(false));
                }}
                onBlur={(e) => checkDescriptionExist(e.target.value)}
                disabled={viewDetails}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-2">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>CoDriver</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0 d-flex">
              <AutoCompleteDropdown
                className={`customFormControl ${
                  !viewDetails
                    ? coDriverFK && coDriverInput
                      ? ""
                      : !coDriverFK && coDriverInput
                        ? "borderRed"
                        : ""
                    : ""
                }`}
                arrayList={codriver}
                searchString={coDriverInput}
                customFormatSearchString={(searchString) => searchString}
                renderItemId={(truckOwner) => truckOwner.driverPK}
                renderItemField={(truckOwner) =>
                  truckOwner.lastName != null
                    ? truckOwner.firstName + " " + truckOwner.lastName
                    : truckOwner.firstName
                }
                handleSearchString={(string) => setCoDriverInput(string)}
                fetchDataBySearchString={fetchCoDriverByName}
                onSelect={handleCoDriverToLookupSelection}
                disabled={viewDetails}
                clearInputCallback={() => {
                  setCoDriverFK(null);
                }}
                loading={codriverLoading}
                selectedId={coDriverFK}
              />

              <LookupButton
                onClick={() => {
                  setDriverSelection(true);
                }}
                disabled={viewDetails}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Principle Truck</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 ${!viewDetails ? (principletruck ? "" : "") : ""}`}
                checked={principletruck}
                onChange={(e) => {
                  checkPrincileTruck(e.target.checked);
                }}
                disabled={
                  viewDetails || isFirstTruck || formData?.principle || (!formData?.active && id != null)
                }
              />
            </Col>

            <ModalComponent
              show={showPrincipleTruckModal}
              onHide={() => {
                setShowPrincipleTruckModal(false);
                dispatch(setShowPrincipleModel(false));
              }}
              title={"Principle Truck Check"}
              body={"Do you want to make this driver truck as a Principle Truck"}
              handleYES={() => {
                setPrincipleTruck(true);
                setShowPrincipleTruckModal(false);
                dispatch(setShowPrincipleModel(false));
              }}
              handleNO={() => {
                setPrincipleTruck(false);
                setShowPrincipleTruckModal(false);
                dispatch(setShowPrincipleModel(false));
              }}
            />
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Half Ton"}</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 ${!viewDetails ? (halfton ? "" : "") : ""}`}
                name="halfton"
                checked={halfton}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setHalfTon(checked);
                  setHaulandTow(false);
                  setSemiTractor(false);
                  fetchTruckCode(checked, false, false);
                }}
                disabled={viewDetails}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
            <Col xs={4} sm={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Haul & Tow"}</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 ${!viewDetails ? (haulandtow ? "" : "") : ""}`}
                checked={haulandtow}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setHaulandTow(checked);
                  setHalfTon(false);
                  setSemiTractor(false);
                  fetchTruckCode(false, checked, false);
                }}
                name="haul&tow"
                disabled={viewDetails}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
            <Col xs={4} sm={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Semi Tractor</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 ${!viewDetails ? (semitractor ? "" : "") : ""}`}
                checked={semitractor}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSemiTractor(checked);
                  setHaulandTow(false);
                  setHalfTon(false);
                  fetchTruckCode(false, false, checked);
                }}
                name="semitractor"
                disabled={viewDetails}
              />
            </Col>
          </Form.Group>
          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
            <Col xs={4} sm={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Diesel"}</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 ${!viewDetails ? (diesel ? "" : "") : ""}`}
                checked={diesel}
                name="diesel"
                onChange={(e) => {
                  setDiesel(e.target.checked);
                  dispatch(
                    setDriverTruckData((prevState) => ({
                      ...prevState,
                      diesel: diesel,
                    }))
                  );
                  if (!diesel) {
                    setCarb(false);
                    setCarbDate(null);
                    dispatch(
                      setDriverTruckData((prevState) => ({
                        ...prevState,
                        diesel: diesel,
                        carb: carb,
                        carbDate: carbDate,
                      }))
                    );
                  }
                }}
                disabled={viewDetails}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-4">
            <Col xs={4} sm={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Has Pintal Hook"}</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 ${!viewDetails ? (haspintalhook ? "" : "") : ""}`}
                checked={haspintalhook}
                onChange={(e) => setHasPintalHook(e.target.checked)}
                name="haspintalhook"
                disabled={viewDetails}
              />
            </Col>
          </Form.Group>
          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-4">
            <Col xs={4} sm={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Has Sleeper"}</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 ${!viewDetails ? (hasSleeper ? "" : "") : ""}`}
                checked={hasSleeper}
                onChange={(e) => setHasSleeper(e.target.checked)}
                name="hasSleeper"
                disabled={viewDetails}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-4">
            <Col xs={4} sm={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"GVWR"}</Form.Label>
            </Col>

            <Col xs={1} md={1} lg={1} sm={1} className="p-0 w-80px">
              <Input
                className={`customFormControl ${
                  !viewDetails
                    ? (gvwr ? "borderGreen" : "borderRed") &&
                      (gvwr > 0 && gvwr <= MAX_INT_VALUE ? "borderGreen" : "borderRed")
                    : ""
                }`}
                id="gvwr"
                name="gvwr"
                type="text"
                disabled={viewDetails}
                value={gvwr}
                onChange={(e) => {
                  if (numberRegex.test(e.target.value) || e.target.value === "") {
                    setGvwr(e.target.value);
                  }
                }}
                maxLength={10}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-4">
            <Col xs={4} sm={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Scale Weight"}</Form.Label>
            </Col>

            <Col xs={1} md={1} lg={1} sm={1} className="p-0 w-80px">
              <Input
                className={`customFormControl ${
                  !viewDetails
                    ? (scaleweight ? "borderGreen" : "borderRed") &&
                      (scaleweight > 0 && scaleweight <= MAX_INT_VALUE ? "borderGreen" : "borderRed")
                    : ""
                }`}
                id="scaleweight"
                name="scaleweight"
                type="text"
                disabled={viewDetails}
                value={scaleweight}
                onChange={(e) => {
                  if (numberRegex.test(e.target.value) || e.target.value === "") {
                    setScaleWeight(e.target.value);
                  }
                }}
                maxLength={10}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-4">
            <Col xs={4} sm={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Value"}</Form.Label>
            </Col>

            <Col xs={1} md={1} lg={1} sm={1} className="p-0 w-80px">
              <Input
                type="text"
                value={value}
                className={`customFormControl`}
                id="value"
                name="value"
                maxLength={10}
                onChange={(e) => {
                  e.target.value != "." &&
                    e.target.value.match(/^\d{0,7}(\.\d{0,2})?$/) &&
                    setValue(isDecimal(e.target.value));
                }}
                disabled={viewDetails}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>{"VIN"}</Form.Label>
            </Col>
            <Col xs={4} md={4} sm={4} className="p-0">
              <Input
                className={`customFormControl ${viewDetails ? "" : vin.length >= 1 ? "borderGreen" : "borderRed"}`}
                id="vin"
                name="vin"
                type="text"
                disabled={viewDetails}
                value={vin}
                maxLength={21}
                onChange={(e) => {
                  const cleaned = cleanFirstChar(e.target.value);
                  setVin(cleaned);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className=" form-group align-items-center row m-l-0 m-r-0 mt-4">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>{"Make"}</Form.Label>
            </Col>
            <Col xs={4} md={4} sm={4} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetails ? "" : make.length >= 1 ? "borderGreen" : "borderRed"
                }`}
                id="make"
                name="make"
                type="text"
                disabled={viewDetails}
                value={make}
                maxLength={30}
                onChange={(e) => {
                  const cleaned = cleanFirstChar(e.target.value);
                  setMake(cleaned);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-4">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>{"Model"}</Form.Label>
            </Col>
            <Col xs={4} md={4} sm={4} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetails ? "" : model.length >= 1 ? "borderGreen" : "borderRed"
                }`}
                id="model"
                name="model"
                type="text"
                disabled={viewDetails}
                value={model}
                maxLength={30}
                onChange={(e) => {
                  const cleaned = cleanFirstChar(e.target.value);
                  setModel(cleaned);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>{"Truck Type"}</Form.Label>
            </Col>
            <Col xs={4} md={4} sm={4} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetails ? "" : trucktype.length >= 1 ? "borderGreen" : "borderRed"
                }`}
                id="trucktype"
                name="trucktype"
                type="text"
                disabled={viewDetails}
                value={trucktype}
                maxLength={30}
                onChange={(e) => {
                  const cleaned = cleanFirstChar(e.target.value);
                  setTruckType(cleaned);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Truck Code</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <Form.Select
                className={`customFormControl `}
                name="truckcode"
                id="truckcode"
                value={truckcode}
                disabled={viewDetails}
                maxLength={1}
                onChange={(e) => {
                  setTruckCode(e.target.value);
                }}
              >
                {truckCodeList?.length === 1 && (
                  <option key={truckCodeList[0].truckCodeId} value={truckCodeList[0].truckCodeId}>
                    {truckCodeList[0].truckCodeName}
                  </option>
                )}
                {truckCodeList?.length > 1 && <option value="">--Select--</option>}
                {truckCodeList?.length > 1 &&
                  truckCodeList?.map((data) => (
                    <option key={data.truckCodeId} value={data.truckCodeId}>
                      {data.truckCodeName}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Year"}</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0" maxLength="40">
              <Input
                className={`customFormControl ${
                  viewDetails ? "" : Number(year) > 1999 ? "borderGreen" : "borderRed"
                }`}
                id="year"
                name="year"
                type="text"
                disabled={viewDetails}
                value={year}
                onChange={(e) => {
                  const value = e.target.value;
                  if (numberRegex.test(value) || value === "") {
                    setYear(value);
                  }
                }}
                onBlur={(e) => {
                  if (parseInt(e.target.value) < 2000) {
                    setYear(2000);
                  }
                }}
                maxLength={4}
              />
            </Col>
          </Form.Group>
          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
            <Col xs={5} sm={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"License Plate Number"}</Form.Label>
            </Col>
            <Col xs={2} md={2} lg={2} sm={3} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetails || isIrpPlate
                    ? ""
                    : /^[A-Za-z0-9][A-Za-z0-9 ]*$/.test(licenseplatenumber)
                      ? "borderGreen"
                      : "borderRed"
                }`}
                id="licenseplatenumber"
                name="licenseplatenumber"
                type="text"
                disabled={viewDetails || isIrpPlate}
                value={licenseplatenumber}
                maxLength={10}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/^\s/, ""); // Remove leading space
                  value = value.replace(/[^A-Za-z0-9 ]/g, ""); // Allow letters, numbers, and spaces only
                  value = value.toUpperCase();
                  setLicensePlateNumber(value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>License Plate State</Form.Label>
            </Col>

            <Col xs={1} md={1} lg={1} sm={1} className="p-0 w-80px">
              <Form.Select
                className={`customFormControl ${
                  viewDetails || isIrpPlate ? "" : !licensePlateStateInput ? "borderRed" : "borderGreen"
                }`}
                name="licensePlateStateInput"
                id="licensePlateStateInput"
                value={licensePlateStateInput}
                onChange={(e) => {
                  setLicensePlateStateInput(e.target.value);
                }}
                disabled={viewDetails || isIrpPlate}
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

          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
            <Col xs={5} sm={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Plate Weight Rating"}</Form.Label>
            </Col>

            <Col xs={1} md={1} lg={1} sm={1} className="p-0 w-80px">
              <Input
                className={`customFormControl ${
                  viewDetails || isIrpPlate
                    ? ""
                    : plateweightrating > 0 && plateweightrating <= MAX_INT_VALUE
                      ? "borderGreen"
                      : "borderRed"
                }`}
                id="plateweightrating"
                name="plateweightrating"
                type="text"
                disabled={viewDetails || isIrpPlate}
                value={plateweightrating}
                onChange={(e) => {
                  if (numberRegex.test(e.target.value) || e.target.value === "") {
                    setPlateWeightRating(e.target.value);
                  }
                }}
                maxLength={10}
              />
            </Col>
          </Form.Group>
          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Registration Expiration"}</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-95px">
              <DateInputField
                date={registrationexpiration}
                setDate={setRegistrationExpiration}
                setIsDateValid={setIsRegistrationExpirationValidation}
                className={`customFormControl ${
                  !viewDetails
                    ? registrationexpiration && isRegistrationExpirationValidation
                      ? "borderGreen"
                      : "borderRed"
                    : ""
                }`}
                disabled={viewDetails}
                value={registrationexpiration}
              />
            </Col>
          </Form.Group>
        </Col>

        <DriverLookup
          show={driverSelection}
          onHide={driverModalHide}
          renderItemId={(data) => data.driverPK}
          handleLookupSelection={handleCoDriverToLookupSelection}
          MaintenanceProgram
        />
      </Row>
    </div>
  );
};

export default General;
