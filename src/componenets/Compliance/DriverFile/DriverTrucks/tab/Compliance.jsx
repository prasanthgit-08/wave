import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DateInputField from "../../../../common/DateInputField";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDriverTrucksData,
  setDriverTruckData,
  setIsComplianceTabValid,
  setIsRequiredReserve,
} from "../../../../../redux/DriverTrucksSlice";

import LookupButton from "../../../../common/LookupButton";

import DriverTrucksService from "../../../../../services/DriverFile/DriverTrucksService";
import ReservesService from "../../../../../services/ReservesService";
import ReservesLookup from "../../../../LookupScreens/Reserves/ReservesLookup";
import EquipmentLookup from "../../../../LookupScreens/Equipment/EquipmentLookup";
import EquipmentService from "../../../../../services/EquipmentService";
import { cleanFirstChar } from "../../../../../utils/utils";
import Input from "../../../../../components/common/input";

const Compliance = ({ stateList = [] }) => {
  const dispatch = useDispatch();
  const viewDetails = useSelector((state) => state.driverTrucks.viewDetails);
  const driverTruckData = useSelector((state) => state.driverTrucks.driverTruckData);
  const isRequiredReserve = useSelector((state) => state.driverTrucks.isRequiredReserve);
  const [irpplateexpiration, setIrpPlateExpiration] = useState("");
  const [isIrpplateExpirationValidation, setIsIrpPlateExpirationValidation] = useState(true);
  const [insurancecarrier, setInsuranceCarrier] = useState("");
  const [unladeninsurancecarrier, setUnladenInsuranceCarrier] = useState("");
  const [eld, setEld] = useState(false);
  const [eldserialnumber, setEldSerialNumber] = useState("");
  const [irpplate, setirpplate] = useState(false);
  const [companyirpplate, setCompanyIrpPlate] = useState(false);
  const [irpplatenumber, setIrpplateNumber] = useState("");
  const [dotinspectionhold, setDotInspectionHold] = useState(false);
  const [dotInspectionholdreason, setDotInspectionHoldReason] = useState("");
  const [insuranceexpiration, setInsuranceExpiration] = useState("");
  const [isInsuranceExpirationValidation, setIsInsuranceExpirationValidation] = useState(true);
  const [dotinspectionexpiration, setDotInspectionExpiration] = useState("");
  const [isdotInspectionExpirationValidation, setIsDotInspectionExpirationValidation] = useState(true);
  const [unladeninsuranceexpiration, setUnladenInsuranceExpiration] = useState("");
  const [isUnladenInsuranceExpirationValidation, setIsUnladenInsuranceExpirationValidation] = useState(true);
  const [dotinspectionholddate, setDotInspectionHoldDate] = useState("");
  const [isDotInspectionHoldDateValidation, setIsDotInspectionHoldDateValidation] = useState(true);
  const [eldReserveSelection, setEldReserveSelection] = useState(false);
  const [assignedEldSelection, SetAssignedEldSelection] = useState(false);
  const [assignedIrpPlateSelection, SetAssignedIrpPlateSelection] = useState(false);
  const isTabIdentification = useSelector((state) => state.driverTrucks.isTabIdentification);
  const [irpReserveSelection, setIrpReserveSelection] = useState(false);
  const [carb, setCarb] = useState(false);
  const [carbDate, setCarbDate] = useState("");
  const [isCarbDateValidation, setIsCarbDateValidation] = useState(true);
  const [assignedeld, setAssignedEld] = useState([]);
  const [assignedeldInput, setAssignedEldInput] = useState("");
  const [eldReserve, setEldReserve] = useState([]);
  const [eldReserveFK, setEldReserveFK] = useState(null);
  const [reserveInput, setReserveInput] = useState("");
  const [irpReserve, setIrpReserve] = useState([]);
  const [irpReserveFK, setIrpReserveFK] = useState(null);
  const [irpReserveInput, setIrpReserveInput] = useState("");
  const [assignedirpplate, setAssignedIrpPlate] = useState([]);
  const [assignedirpplateInput, setAssignedIrpPlateInput] = useState("");
  const [equipmentFK, setEquipmentFK] = useState(null);
  const [irpequipmentFK, setIrpEquipmentFK] = useState(null);
  // Fetched once in TruckFormContent and shared with the General tab
  const irpPlateState = stateList;
  const [irpPlateStateInput, setIrpPlateStateInput] = useState("");
  const formData = useSelector((state) => state.driverTrucks.formData);
  const [carbExpiration, setCarbExpiration] = useState("");
  const [isCarbExpirationValidation, setIsCarbExpirationValidation] = useState(true);
  const [irpNotes, setIrpNotes] = useState("");
  const [irpPlateWeight, setIrpplateWeight] = useState("");

  const [assignedEldLoading, setAssignedEldLoading] = useState(false);
  const [eldReserveLoading, setEldReserveLoading] = useState(false);
  const [assignedIrpplateLoading, setAssignedIrpplateLoading] = useState(false);
  const [irpReserveLoading, setIrpReserveLoading] = useState(false);

  const hasLicensePlateInformation =
    !!driverTruckData?.licenseNumber || !!driverTruckData?.licenseState || !!driverTruckData?.licenseWeight;

  const complianceTabData = () => {
    dispatch(
      setDriverTruckData({
        dotInspectionExpirationDate: dotinspectionexpiration,
        insuranceExpirationDate: insuranceexpiration,
        insuranceCarrier: insurancecarrier,
        unladenInsuranceExpirationDate: unladeninsuranceexpiration,
        unladenInsuranceCarrier: unladeninsurancecarrier,
        eld: eld,
        eldEquipmentId: equipmentFK,
        irpEquipmentId: irpequipmentFK,
        eldSerialNumber: eldserialnumber,
        eldReserveId: eldReserveFK,
        irpReserveId: irpReserveFK,
        irp: irpplate,
        irpIsCompany: companyirpplate,
        irpLicenseNumber: irpplatenumber,
        irpLicenseState: irpPlateStateInput,
        irpLicenseExpirationDate: irpplateexpiration,
        dotInspectionHold: dotinspectionhold,
        dotInspectionHoldReason: dotInspectionholdreason,
        dotInspectionHoldDate: dotinspectionholddate,
        carb: carb,
        carbDate: carbDate,
        carbExpire: carbExpiration,
        irpNotes: irpNotes,
        irpLicenseWeight: irpPlateWeight || 0,
      })
    );
  };

  useEffect(() => {
    complianceTabData();
  }, [
    dotinspectionexpiration,
    insuranceexpiration,
    insurancecarrier,
    unladeninsuranceexpiration,
    unladeninsurancecarrier,
    eld,
    eldserialnumber,
    eldReserve,
    eldReserveFK,
    equipmentFK,
    irpplate,
    companyirpplate,
    irpplatenumber,
    irpPlateState,
    equipmentFK,
    irpequipmentFK,
    irpplateexpiration,
    irpReserve,
    irpReserveFK,
    dotinspectionhold,
    dotInspectionholdreason,
    dotinspectionholddate,
    carb,
    carbDate,
    irpPlateStateInput,
    carbExpiration,
    irpNotes,
    irpPlateWeight,
  ]);

  useEffect(() => {
    if (formData) {
      setDotInspectionExpiration(formData?.dotInspectionExpirationDate || "");
      setInsuranceExpiration(formData?.insuranceExpirationDate || "");
      setEquipmentFK(formData?.eldEquipmentId || null);
      fetchEldEquipment(formData?.eldEquipmentId);
      setIrpEquipmentFK(formData?.irpEquipmentId || null);
      fetchIrpEquipment(formData?.irpEquipmentId);
      setInsuranceCarrier(formData?.insuranceCarrier || "");
      setUnladenInsuranceExpiration(formData?.unladenInsuranceExpirationDate || "");
      setUnladenInsuranceCarrier(formData?.unladenInsuranceCarrier || "");
      setEld(formData?.eld || false);
      setEldSerialNumber(formData?.eldSerialNumber || "");
      setEldReserveFK(formData?.eldReserveId);
      fetchReserveInput(formData?.eldReserveId);
      setIrpReserveFK(formData?.irpReserveId);
      fetchIrpReserveInput(formData?.irpReserveId);
      setirpplate(formData?.irp || false);
      setCompanyIrpPlate(formData?.irpIsCompany || false);
      setIrpplateNumber(formData?.irpLicenseNumber || "");
      setIrpPlateExpiration(formData?.irpLicenseExpirationDate || "");
      setDotInspectionHold(formData?.dotInspectionHold || false);
      setDotInspectionHoldDate(formData?.dotInspectionHoldDate || "");
      setDotInspectionHoldReason(formData?.dotInspectionHoldReason || "");
      setIrpNotes(formData?.irpNotes || "");
      setIrpPlateStateInput(formData?.irpLicenseState?.trim());
      setCarb(formData?.carb || false);
      dispatch(setIsRequiredReserve(formData?.irpEquipmentFK?.requireReserve || false));
      setCarbDate(formData?.carbDate || "");
      setCarbExpiration(formData?.carbExpire || "");
      setIrpplateWeight(formData?.irpLicenseWeight || 0);
    }
  }, [formData, viewDetails]);

  useEffect(() => {
    const isInsuranceValid =
      isInsuranceExpirationValidation &&
      ((!insurancecarrier && !insuranceexpiration) || (insurancecarrier && insuranceexpiration));
    const areCommonConditionsMet =
      dotinspectionexpiration &&
      isdotInspectionExpirationValidation &&
      unladeninsuranceexpiration &&
      isUnladenInsuranceExpirationValidation &&
      isInsuranceValid &&
      unladeninsurancecarrier;

    const areELDConditionsMet = eld && equipmentFK && eldReserveFK;
    const areCarbConditionsMet =
      carb && carbDate && isCarbDateValidation && carbExpiration && isCarbExpirationValidation;

    const areIRPConditionsMet =
      irpplate &&
      irpplatenumber &&
      (irpPlateWeight || irpPlateWeight === 0) &&
      ((irpPlateStateInput && irpplateexpiration && isIrpplateExpirationValidation) || companyirpplate);

    const areCompanyIrpConditionsMet =
      irpplate &&
      companyirpplate &&
      irpequipmentFK &&
      ((!isRequiredReserve && !irpReserveInput) || irpReserveFK);

    dispatch(
      setIsComplianceTabValid(
        areCommonConditionsMet &&
          (!eld || areELDConditionsMet) &&
          (!carb || areCarbConditionsMet) &&
          (!irpplate || areIRPConditionsMet) &&
          isDotInspectionHoldDateValidation &&
          (!companyirpplate || areCompanyIrpConditionsMet)
      )
    );
  }, [
    dotinspectionexpiration,
    isdotInspectionExpirationValidation,
    insuranceexpiration,
    isInsuranceExpirationValidation,
    insurancecarrier,
    unladeninsuranceexpiration,
    isUnladenInsuranceExpirationValidation,
    unladeninsurancecarrier,
    eld,
    eldserialnumber,
    equipmentFK,
    eldReserveFK,
    irpplate,
    companyirpplate,
    irpReserveFK,
    irpequipmentFK,
    irpplateexpiration,
    isIrpplateExpirationValidation,
    irpplatenumber,
    irpPlateStateInput,
    irpReserveInput,
    carb,
    carbDate,
    isCarbDateValidation,
    isDotInspectionHoldDateValidation,
    isRequiredReserve,
    carbExpiration,
    isCarbExpirationValidation,
    irpPlateWeight,
  ]);

  useEffect(() => {
    if (!irpequipmentFK) {
      setIrpPlateStateInput("");
      setIrpplateNumber("");
      setIrpPlateExpiration("");
      setIrpplateWeight("");
      dispatch(setIsRequiredReserve(false));
    }
  }, [irpequipmentFK]);

  useEffect(() => {
    dispatch(resetDriverTrucksData());
  }, []);

  /**
   * Set Eld based on haulandtow and semitractor
   */

  useEffect(() => {
    if (
      driverTruckData?.haulAndTow ||
      driverTruckData?.semiTractor ||
      driverTruckData?.licenseWeight > 26000
    ) {
      setEld(true);
    } else {
      setEld(false);
    }
  }, [driverTruckData?.haulAndTow, driverTruckData?.semiTractor, driverTruckData?.licenseWeight]);
  /**
   * Set CARB based on diesel
   */

  useEffect(() => {
    if (!driverTruckData?.diesel) {
      setCarb(false);
      setCarbDate("");
      setCarbExpiration("");
    }
  }, [driverTruckData?.diesel]);

  useEffect(() => {
    dispatch(setIsRequiredReserve(false));
  }, []);

  /**
   * If the checkbox is unchecked, disable the date and reason fields
   */
  const handleDotInspectionHoldChange = (e) => {
    const isChecked = e.target.checked;
    setDotInspectionHold(isChecked);
    if (!isChecked) {
      setDotInspectionHoldDate("");
      setDotInspectionHoldReason("");
    }
  };

  const fetchEldReserveByName = (string) => {
    setEldReserveLoading(true);
    ReservesService.getReserveTypeAuto(string, false, true, false)
      .then(({ data }) => {
        setEldReserve(data.content);
      })

      .finally(() => {
        setEldReserveLoading(false);
      });
  };

  const handleEldReserveToLookupSelection = (eld) => {
    setEldReserveFK(eld.id);
    setReserveInput(eld.description);
  };

  const eldReserveModalHide = () => {
    setEldReserveSelection(false);
  };

  const assignedEldModalHide = () => {
    SetAssignedEldSelection(false);
  };

  const assignedIrpModalHide = () => {
    SetAssignedIrpPlateSelection(false);
  };

  const fetchIrpReserveByName = (string) => {
    setIrpReserveLoading(true);
    ReservesService.getReserveTypeAuto(string, false, false, true)
      .then(({ data }) => {
        setIrpReserve(data.content);
      })

      .finally(() => {
        setIrpReserveLoading(false);
      });
  };

  const handleIrpReserveToLookupSelection = (irp) => {
    setIrpReserveFK(irp.id);
    setIrpReserveInput(irp.description);
  };

  const fetchEldEquipment = (id) => {
    if (id) {
      EquipmentService.getRecord(id)
        .then((response) => {
          const data = response.data;
          setAssignedEldInput(data.description?.trim());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAssignedEldInput("");
    }
  };

  const fetchIrpEquipment = (id) => {
    if (id) {
      EquipmentService.getRecord(id)
        .then((response) => {
          const data = response.data;
          setAssignedIrpPlateInput(data.description?.trim());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAssignedIrpPlateInput("");
    }
  };

  const irpReserveModalHide = () => {
    setIrpReserveSelection(false);
  };

  const eldReserveLookUpSelection = (data) => {
    setEldReserveFK(data.id);
    setReserveInput(data.description);
    setEldReserveSelection(false);
  };

  const assignedEldLookUpSelection = (data) => {
    setEquipmentFK(data.equipmentPK);
    setAssignedEldInput(data.description);
    setEldSerialNumber(data.serialNumber);
    SetAssignedEldSelection(false);
  };

  const irpReserveLookUpSelection = (data) => {
    setIrpReserveFK(data.id);
    setIrpReserveInput(data.description);
    setIrpReserveSelection(false);
  };

  const fetchReserveInput = (id) => {
    if (id) {
      ReservesService.getReservesDataById(id)
        .then((response) => {
          const data = response.data;
          setReserveInput(data.description?.trim());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setReserveInput("");
    }
  };

  const fetchIrpReserveInput = (id) => {
    if (id) {
      ReservesService.getReservesDataById(id)
        .then((response) => {
          const data = response.data;
          setIrpReserveInput(data.description?.trim());
          setIrpReserveFK(data.reservePK);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIrpReserveInput("");
    }
  };

  /**
   * Autocomplete assigned eld
   */
  const getDescriptionForAssignedELD = (string) => {
    if (isTabIdentification === "compliance") {
      setAssignedEldLoading(true);
      DriverTrucksService.getAssignedEld(string)
        .then((response) => {
          const data = response.data;
          const assignedEldList = data.content.map((equipment) => ({
            ...equipment,
            description: equipment.description?.trim(),
          }));
          setAssignedEld(assignedEldList);
          if (assignedEldList.length === 1) {
            setEldSerialNumber(data.content.serialNumber);
          }
        })

        .finally(() => {
          setAssignedEldLoading(false);
        });
    }
  };
  /**
   * Autocomplete assigned irp plate
   */
  const getDescriptionForAssignedIrp = (string) => {
    if (isTabIdentification === "compliance") {
      setAssignedIrpplateLoading(true);
      DriverTrucksService.getAssignedIrpPlate(string)
        .then((response) => {
          const data = response.data;
          const assignedIrpList = data.content.map((equipment) => ({
            ...equipment,
            description: equipment.description?.trim(),
          }));
          setAssignedIrpPlate(assignedIrpList);
        })

        .finally(() => {
          setAssignedIrpplateLoading(false);
        });
    }
  };

  const handleAssignedEldSelection = (equipment) => {
    setEquipmentFK(equipment.equipmentPK);
    setAssignedEldInput(equipment.description?.trim());
    setEldSerialNumber(equipment.serialNumber);
  };

  const handleAssignedIrpSelection = (equipment) => {
    setIrpEquipmentFK(equipment.equipmentPK);
    setAssignedIrpPlateInput(equipment.description?.trim());
    setIrpplateNumber(equipment.equipmentNumber);
    setIrpPlateStateInput(equipment.plateState);
    setIrpPlateExpiration(equipment.expirationDate);
    dispatch(setIsRequiredReserve(equipment?.requireReserve || false));
    SetAssignedIrpPlateSelection(false);

    const weight = equipment.serialNumber;
    const isAllDigits = /^\d+$/.test(weight); // checks if it's all digits

    setIrpplateWeight(isAllDigits ? weight : "0");
  };

  useEffect(() => {
    if (!eld) {
      setAssignedEldInput("");
      setReserveInput("");
      setEldSerialNumber("");
    }
  }, [eld]);

  return (
    <div className="p-0 w-100">
      <Row className="m-0 p-0">
        <Col xs={6} style={{ minWidth: "450px" }}>
          <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"DOT Inspection Expiration"}</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <DateInputField
                date={dotinspectionexpiration}
                setDate={setDotInspectionExpiration}
                setIsDateValid={setIsDotInspectionExpirationValidation}
                className={`customFormControl ${
                  !viewDetails
                    ? dotinspectionexpiration && isdotInspectionExpirationValidation
                      ? "borderGreen"
                      : "borderRed"
                    : ""
                }`}
                disabled={viewDetails}
                value={dotinspectionexpiration}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {"Liability Insurance Expiration"}
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <DateInputField
                date={insuranceexpiration}
                setDate={setInsuranceExpiration}
                setIsDateValid={setIsInsuranceExpirationValidation}
                className={`customFormControl ${
                  !viewDetails
                    ? insuranceexpiration
                      ? isInsuranceExpirationValidation
                        ? "borderGreen"
                        : "borderRed"
                      : insurancecarrier || !isInsuranceExpirationValidation
                        ? "borderRed"
                        : ""
                    : ""
                }`}
                disabled={viewDetails}
                value={insuranceexpiration}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>{"Liability Insurance Carrier"}</Form.Label>
            </Col>
            <Col xs={4} md={4} sm={4} className="p-0">
              <Input
                className={`customFormControl ${
                  !viewDetails
                    ? insurancecarrier
                      ? "borderGreen"
                      : insuranceexpiration
                        ? "borderRed"
                        : ""
                    : ""
                }`}
                id="insurancecarrier"
                name="insurancecarrier"
                type="text"
                disabled={viewDetails}
                value={insurancecarrier}
                maxLength={30}
                onChange={(e) => {
                  const cleaned = cleanFirstChar(e.target.value);
                  setInsuranceCarrier(cleaned);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {"Unladen Insurance Expiration"}
              </Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-95px">
              <DateInputField
                date={unladeninsuranceexpiration}
                setDate={setUnladenInsuranceExpiration}
                setIsDateValid={setIsUnladenInsuranceExpirationValidation}
                className={`customFormControl ${
                  !viewDetails
                    ? unladeninsuranceexpiration && isUnladenInsuranceExpirationValidation
                      ? "borderGreen"
                      : "borderRed"
                    : ""
                }`}
                disabled={viewDetails}
                value={unladeninsuranceexpiration}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>{"Unladen Insurance Carrier"}</Form.Label>
            </Col>
            <Col xs={4} md={4} sm={4} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetails ? "" : unladeninsurancecarrier.length >= 1 ? "borderGreen" : "borderRed"
                }`}
                id="unladeninsurancecarrier"
                name="unladeninsurancecarrier"
                type="text"
                disabled={viewDetails}
                value={unladeninsurancecarrier}
                maxLength={30}
                onChange={(e) => {
                  const cleaned = cleanFirstChar(e.target.value);
                  setUnladenInsuranceCarrier(cleaned);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={5} sm={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">ELD</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 ${!viewDetails ? (eld ? "" : "") : ""}`}
                id="eld"
                name="eld"
                checked={eld}
                value={eld}
                disabled={
                  viewDetails ||
                  driverTruckData?.haulAndTow ||
                  driverTruckData?.semiTractor ||
                  driverTruckData?.licenseWeight > 26000
                }
                onChange={(e) => {
                  if (!e.target.checked) {
                    setAssignedEldInput("");
                    setReserveInput("");
                  }
                  setEld(e.target.checked);
                  setEldSerialNumber("");
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>{"Assigned ELD"}</Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0 d-flex align-items-center">
              <AutoCompleteDropdown
                arrayList={assignedeld}
                searchString={assignedeldInput}
                customFormatSearchString={(searchString) => searchString}
                renderItemId={(equipment) => {
                  return equipment.equipmentPK;
                }}
                renderItemField={(equipment) => equipment.description}
                handleSearchString={(string) => setAssignedEldInput(string)}
                fetchDataBySearchString={getDescriptionForAssignedELD}
                onSelect={handleAssignedEldSelection}
                clearInputCallback={() => {
                  setEquipmentFK(null);
                  setEldSerialNumber("");
                }}
                disabled={viewDetails || !eld}
                className={`${!viewDetails ? (eld ? (equipmentFK ? "borderGreen" : "borderRed") : "") : ""}`}
                selectedId={equipmentFK}
                loading={assignedEldLoading}
                towardsTop
              />
              <LookupButton
                onClick={() => {
                  SetAssignedEldSelection(true);
                }}
                disabled={viewDetails || !eld}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>{"ELD Serial Number"}</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <Input
                className={`customFormControl`}
                name="eldserialnumber"
                type="text"
                disabled={true}
                value={eldserialnumber}
                maxLength={20}
                onChange={(e) => {
                  setEldSerialNumber(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>{"ELD Reserve"}</Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0 d-flex align-items-center">
              <AutoCompleteDropdown
                arrayList={eldReserve}
                searchString={reserveInput}
                customFormatSearchString={(searchString) => searchString}
                renderItemId={(eld) => eld.id}
                renderItemField={(eld) => eld.description}
                handleSearchString={(string) => setReserveInput(string)}
                fetchDataBySearchString={fetchEldReserveByName}
                onSelect={handleEldReserveToLookupSelection}
                clearInputCallback={() => {
                  setEldReserveFK(null);
                }}
                selectedId={eldReserveFK}
                loading={eldReserveLoading}
                disabled={viewDetails || !eld}
                className={`${!viewDetails ? (eld ? (eldReserveFK ? "borderGreen" : "borderRed") : "") : ""}`}
                towardsTop
              />
              <LookupButton
                onClick={() => {
                  setEldReserveSelection(true);
                }}
                disabled={viewDetails || !eld}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={5} sm={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"CARB"}</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                className={`form-check-input p-0 ${!viewDetails ? (carb ? "" : "") : ""}`}
                name="carb"
                type="checkbox"
                disabled={viewDetails || !driverTruckData?.diesel}
                checked={carb}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setCarb(checked);
                  if (!checked) {
                    setCarbDate("");
                    setCarbExpiration("");
                  }
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Last CARB Inspection"}</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-95px">
              <DateInputField
                date={carbDate}
                setDate={setCarbDate}
                setIsDateValid={setIsCarbDateValidation}
                className={`customFormControl ${
                  !viewDetails
                    ? carbDate && isCarbDateValidation
                      ? "borderGreen"
                      : carb
                        ? "borderRed"
                        : ""
                    : ""
                }`}
                disabled={viewDetails || !carb}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"CARB Expiration"}</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-95px">
              <DateInputField
                date={carbExpiration}
                setDate={setCarbExpiration}
                setIsDateValid={setIsCarbExpirationValidation}
                className={`customFormControl ${
                  !viewDetails
                    ? carbExpiration && isCarbExpirationValidation
                      ? "borderGreen"
                      : carb
                        ? "borderRed"
                        : ""
                    : ""
                }`}
                disabled={viewDetails || !carb}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={5} sm={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"IRP Plate"}</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                className={`form-check-input p-0 ${!viewDetails ? (irpplate ? "" : "") : ""}`}
                name="irpplate"
                type="checkbox"
                disabled={viewDetails || !!driverTruckData?.hasLicensePlateInformation}
                checked={irpplate}
                onChange={(e) => {
                  if (!e.target.checked) {
                    setCompanyIrpPlate(false);
                    setIrpplateNumber("");
                    setIrpPlateStateInput("");
                    setIrpPlateExpiration("");
                    setAssignedIrpPlateInput("");
                    setIrpReserveInput("");
                    setIrpNotes("");
                  }

                  setIrpplateWeight("");
                  setirpplate(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={5} sm={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Company IRP Plate"}</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                className={`form-check-input p-0 ${!viewDetails ? (companyirpplate ? "" : "") : ""}`}
                type="checkbox"
                name="companyirpplate"
                disabled={viewDetails || !irpplate}
                checked={companyirpplate}
                onChange={(e) => {
                  setCompanyIrpPlate(e.target.checked);
                  setIrpplateNumber("");

                  setIrpPlateExpiration("");
                  setIrpPlateStateInput("");
                  setAssignedIrpPlateInput("");
                  setIrpReserveInput("");
                  setIrpplateWeight("");
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
            <Col xs={5} sm={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"IRP Plate Number"}</Form.Label>
            </Col>
            <Col xs={3} md={3} lg={3} sm={3} className="p-0">
              <Input
                className={`customFormControl ${
                  !viewDetails
                    ? irpplate && !companyirpplate
                      ? irpplatenumber
                        ? "borderGreen"
                        : "borderRed"
                      : ""
                    : ""
                }`}
                id="irpplatenumber"
                name="irpplatenumber"
                type="text"
                maxLength={10}
                disabled={viewDetails || !irpplate || companyirpplate} // Disable if viewDetails is true or irpplate and companyirp are false
                value={irpplatenumber}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/^\s/, ""); // Remove leading space
                  value = value.replace(/[^A-Za-z0-9 ]/g, ""); // Allow letters, numbers, and spaces only
                  value = value.toUpperCase();
                  setIrpplateNumber(value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
            <Col xs={5} sm={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"IRP Plate Weight"}</Form.Label>
            </Col>
            <Col xs={3} md={3} lg={3} sm={3} className="p-0">
              <Input
                className={`customFormControl ${
                  !viewDetails
                    ? irpplate && !companyirpplate
                      ? irpPlateWeight !== "" && irpPlateWeight !== null && irpPlateWeight !== undefined
                        ? "borderGreen"
                        : "borderRed"
                      : ""
                    : ""
                }`}
                id="irpPlateWeight"
                name="irpPlateWeight"
                type="text"
                maxLength={10}
                disabled={viewDetails || !irpplate || companyirpplate}
                value={irpPlateWeight}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9]/g, ""); // Only allow digits
                  setIrpplateWeight(value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"IRP Plate State"}</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0">
              <Form.Select
                className={`customFormControl ${
                  !viewDetails
                    ? irpplate && !companyirpplate
                      ? irpPlateStateInput
                        ? "borderGreen"
                        : "borderRed"
                      : ""
                    : ""
                }`}
                value={irpPlateStateInput}
                onChange={(e) => {
                  setIrpPlateStateInput(e.target.value);
                }}
                disabled={viewDetails || !irpplate || companyirpplate}
              >
                <option value="">--Select--</option>
                {irpPlateState?.map((irpPlateStateInput) => (
                  <option key={irpPlateStateInput.equipmentPK} value={irpPlateStateInput.stateCode}>
                    {irpPlateStateInput.stateCode}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"IRP Plate Expiration"}</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-95px">
              <DateInputField
                className={`customFormControl ${
                  !viewDetails
                    ? irpplate && !companyirpplate
                      ? irpplateexpiration && isIrpplateExpirationValidation
                        ? "borderGreen"
                        : "borderRed"
                      : ""
                    : ""
                }`}
                date={irpplateexpiration}
                setDate={setIrpPlateExpiration}
                setIsDateValid={setIsIrpPlateExpirationValidation}
                disabled={viewDetails || !irpplate || companyirpplate}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>{"Assigned IRP Plate"}</Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0 d-flex align-items-center">
              <AutoCompleteDropdown
                arrayList={assignedirpplate}
                searchString={assignedirpplateInput}
                customFormatSearchString={(searchString) => searchString}
                renderItemId={(equipment) => equipment.equipmentPK}
                renderItemField={(equipment) => equipment.description}
                handleSearchString={(string) => setAssignedIrpPlateInput(string)}
                fetchDataBySearchString={getDescriptionForAssignedIrp}
                onSelect={handleAssignedIrpSelection}
                clearInputCallback={() => {
                  setIrpEquipmentFK(null);
                }}
                disabled={viewDetails || !companyirpplate}
                className={`${
                  !viewDetails ? (companyirpplate ? (irpequipmentFK ? "borderGreen" : "borderRed") : "") : ""
                }`}
                selectedId={irpequipmentFK}
                loading={assignedIrpplateLoading}
              />
              <LookupButton
                onClick={() => {
                  SetAssignedIrpPlateSelection(true);
                }}
                disabled={viewDetails || !companyirpplate}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>{"IRP Reserve"}</Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className="p-0 d-flex align-items-center">
              <AutoCompleteDropdown
                arrayList={irpReserve}
                searchString={irpReserveInput}
                customFormatSearchString={(searchString) => searchString}
                renderItemId={(irp) => irp.id}
                renderItemField={(irp) => irp.description}
                handleSearchString={(string) => setIrpReserveInput(string)}
                fetchDataBySearchString={fetchIrpReserveByName}
                onSelect={handleIrpReserveToLookupSelection}
                clearInputCallback={() => {
                  setIrpReserveFK(null);
                }}
                selectedId={irpReserveFK}
                loading={irpReserveLoading}
                disabled={viewDetails || !companyirpplate}
                className={`${
                  !viewDetails
                    ? (isRequiredReserve || irpReserveInput) && companyirpplate
                      ? irpReserveFK
                        ? "borderGreen"
                        : "borderRed"
                      : ""
                    : ""
                }`}
              />
              <LookupButton
                onClick={() => {
                  setIrpReserveSelection(true);
                }}
                disabled={viewDetails || !companyirpplate}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
            <Col xs={5} sm={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"IRP Notes"}</Form.Label>
            </Col>
            <Col sm={1} md={1} className="p-0">
              <textarea
                rows={1}
                cols={2}
                style={{
                  resize: "none",
                  display: "fixed",
                  minHeight: "75px",
                  maxWidth: "350px",
                  boxShadow: "none",
                  fontSize: "12px",
                }}
                type="text"
                className="customFormControl h-100 textarea-height textAreaWidthTwoRow"
                id="irpNotes"
                name="irpNotes"
                disabled={!irpplate || viewDetails} // Disable if irp plate is false or viewDetails is true
                value={irpNotes}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  const cleaned = cleanFirstChar(e.target.value);
                  setIrpNotes(cleaned);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
            <Col xs={5} sm={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {"DOT Roadside Inspection Hold"}
              </Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                className={`form-check-input p-0 ${!viewDetails ? (dotinspectionhold ? "" : "") : ""}`}
                type="checkbox"
                name="dotinspectionhold"
                disabled={viewDetails}
                checked={dotinspectionhold}
                onChange={handleDotInspectionHoldChange}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Roadside Hold Date"}</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-95px">
              <DateInputField
                date={dotinspectionholddate}
                setDate={setDotInspectionHoldDate}
                setIsDateValid={setIsDotInspectionHoldDateValidation}
                disabled={!dotinspectionhold || viewDetails}
                value={dotinspectionholddate}
                className={`customFormControl  ${
                  !viewDetails ? (isDotInspectionHoldDateValidation ? "" : "borderRed") : ""
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
            <Col xs={5} sm={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">{"Roadside Hold Reason"}</Form.Label>
            </Col>
            <Col sm={1} md={1} className="p-0">
              <textarea
                rows={1}
                cols={2}
                style={{
                  resize: "none",
                  display: "fixed",
                  minHeight: "75px",
                  maxWidth: "350px",
                  boxShadow: "none",
                  fontSize: "12px",
                }}
                type="text"
                className="customFormControl h-100 textarea-height textAreaWidthTwoRow"
                id="inspectionholdreason"
                name="inspectionholdreason"
                disabled={!dotinspectionhold || viewDetails} // Disable if irp plate is false or viewDetails is true
                value={dotInspectionholdreason}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  const cleaned = cleanFirstChar(e.target.value);
                  setDotInspectionHoldReason(cleaned);
                }}
              />
            </Col>
          </Form.Group>

          <ReservesLookup
            show={eldReserveSelection}
            onHide={eldReserveModalHide}
            renderItemId={(data) => data.eldReserveFK}
            handleLookupSelection={eldReserveLookUpSelection}
            Driver
            eld
          />

          <ReservesLookup
            show={irpReserveSelection}
            onHide={irpReserveModalHide}
            renderItemId={(data) => data.irpReserveFK}
            handleLookupSelection={irpReserveLookUpSelection}
            Driver
            irp
          />

          <EquipmentLookup
            show={assignedEldSelection}
            onHide={assignedEldModalHide}
            renderItemId={(data) => data.equipmentFK}
            handleLookupSelection={assignedEldLookUpSelection}
            MaintenanceProgram
          />

          <EquipmentLookup
            show={assignedIrpPlateSelection}
            onHide={assignedIrpModalHide}
            renderItemId={(data) => data.equipmentFK}
            handleLookupSelection={handleAssignedIrpSelection}
            assignedIrp
          />
        </Col>
      </Row>
    </div>
  );
};

export default Compliance;
