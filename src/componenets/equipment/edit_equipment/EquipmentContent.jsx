import { formatForApi, parseLocalDate } from "../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Col, Row } from "react-bootstrap";
import * as yup from "yup";

import {
  setActive,
  setAssignedToDriver,
  setAssignToUnit,
  setAvailable,
  setBlockDispatch,
  setDeposit,
  setDepositAmount,
  setDescription,
  setDriverFK,
  setEditFormData,
  setEquipmentNumber,
  setEquipmentPK,
  setExpirationDate,
  setIsPlate,
  setPlateState,
  setRequireReserve,
  setSerialNumber,
  setViewDetail,
  setIsPlateStateValid,
  setIsEquipmentUnique,
  setIsAnEld,
  setAssignedToUnit,
  setUnitPK,
  setUnit,
  setReserveInput,
  setReserveId,
  setExpirationDateValid,
} from "../../../redux/EquipmentsSlice";
import { useDispatch, useSelector } from "react-redux";
import EquipmentService from "../../../services/EquipmentService";
import { useNavigate, useParams } from "react-router-dom";
import DateInputField from "../../common/DateInputField";
import AutoCompleteDropdown from "../../common/AutoCompleteDropdown";
import LookupButton from "../../common/LookupButton";
import ReservesService from "../../../services/ReservesService";
import ReservesLookup from "../../LookupScreens/Reserves/ReservesLookup";
import { faSmileBeam } from "@fortawesome/free-solid-svg-icons";
import LoadingIcon from "../../common/LoadingIcon";

function EquipmentContent({ styles }) {
  const { id, pageNumber } = useParams();
  window.addEventListener("popstate", () => {
    dispatch(setIsEquipmentUnique(false));
  });
  const today = formatForApi(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const minValue = Math.min(0);
  const editFormData = useSelector((state) => state.equipmentReducer.editFormData);
  const viewDetail = useSelector((state) => state.equipmentReducer.viewDetail);
  const changesCancelled = useSelector((state) => state.equipmentReducer.changesCancelled);
  const equipmentNumber = useSelector((state) => state.equipmentReducer.equipmentNumber);
  const description = useSelector((state) => state.equipmentReducer.description);
  const serialNumber = useSelector((state) => state.equipmentReducer.serialNumber);
  const assignedToDriver = useSelector((state) => state.equipmentReducer.assignedToDriver);
  const assignedToUnit = useSelector((state) => state.equipmentReducer.assignedToUnit);
  const assignToUnit = useSelector((state) => state.equipmentReducer.assignToUnit);
  const requireReserve = useSelector((state) => state.equipmentReducer.requireReserve);
  const expirationDate = useSelector((state) => state.equipmentReducer.expirationDate);
  const blockDispatch = useSelector((state) => state.equipmentReducer.blockDispatch);
  const driverFK = useSelector((state) => state.equipmentReducer.driverFK);
  const available = useSelector((state) => state.equipmentReducer.available);
  const deposit = useSelector((state) => state.equipmentReducer.deposit);
  const depositAmount = useSelector((state) => state.equipmentReducer.depositAmount);
  const active = useSelector((state) => state.equipmentReducer.active);
  const selectedId = useSelector((state) => state.equipmentReducer.selectedId);
  const unit = useSelector((state) => state.equipmentReducer.unit);

  const [reserveList, setReserveList] = useState([]);
  const [autoCompleteLoading, setAutoCompleteLoading] = useState(false);
  const [reserveSelection, setReserveSelection] = useState(false);

  const isPlate = useSelector((state) => state.equipmentReducer.isPlate);
  const plateState = useSelector((state) => state.equipmentReducer.plateState);
  const isPlateStateValid = useSelector((state) => state.equipmentReducer.isPlateStateValid);
  const isEquipmentUnique = useSelector((state) => state.equipmentReducer.isEquipmentUnique);
  const isAnEld = useSelector((state) => state.equipmentReducer.isAnEld);
  const reserveInput = useSelector((state) => state.equipmentReducer.reserveInput);
  const reserveId = useSelector((state) => state.equipmentReducer.reserveId);
  const expirationDateValid = useSelector((state) => state.equipmentReducer.expirationDateValid);

  const [unitNumber, setUnitNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [loader, setLoader] = useState(false);

  const fetchRecord = (id) => {
    setLoader(true);
    EquipmentService.getRecord(id)
      .then((res) => {
        dispatch(setEditFormData(res.data));
        dispatch(setViewDetail(true));
        dispatch(setDepositAmount(res.data.depositAmount.toFixed(2)));
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);

        navigate(`/equipment-maintenance`);
      });
  };
  const reserveLookupSelection = (data) => {
    dispatch(setReserveId(data.id));
    dispatch(setReserveInput(data.description));

    setReserveSelection(false);
  };
  const reaserveLookupModalShow = () => {
    setReserveSelection(true);
  };

  const setReserveValue = (reserveId) => {
    if (reserveId !== null) {
      ReservesService.getReservesDataById(reserveId)
        .then((response) => {
          const data = response.data;
          dispatch(setReserveInput(data.description));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setReserveInput(""));
    }
  };
  const formattedPlateState = typeof plateState === "string" ? plateState.toUpperCase()?.trim() : "";
  // this functionality for validate plate state with state table
  const checkPlateStateValid = (value) => {
    EquipmentService.checkPlateState(value)
      .then((response) => {
        dispatch(setIsPlateStateValid(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchLeaseReserveByName = (reserveInput) => {
    setAutoCompleteLoading(true);
    ReservesService.getReservesForAutoforEquipment(reserveInput)
      .then(({ data }) => {
        setReserveList(data.content);
      })
      .catch((error) => {
        console.log("Error " + error);
      })
      .finally(() => {
        setAutoCompleteLoading(false);
      });
  };
  const hanldeCheckForm = (equipmentNumber) => {
    EquipmentService.checkEquipmentExist(equipmentNumber, id)
      .then((res) => {
        dispatch(setIsEquipmentUnique(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reserveModalHide = () => {
    setReserveSelection(false);
  };

  useEffect(() => {
    if (!isPlate) {
      dispatch(setPlateState(""));
      dispatch(setIsPlateStateValid(true));
    } else {
      dispatch(setIsPlateStateValid(false));
    }
  }, [isPlate]);

  useEffect(() => {
    if (!deposit) {
      dispatch(setDepositAmount("0.00"));
    }
  }, [deposit]);

  useEffect(() => {
    if (!requireReserve) {
      dispatch(setReserveId(null));
      dispatch(setReserveInput(""));
    }
  }, [requireReserve]);

  useEffect(() => {
    if (assignedToDriver) {
      dispatch(setActive(true));
      dispatch(setAvailable(false));
    }
  }, [id, assignedToDriver]);

  useEffect(() => {
    if (available) {
      dispatch(setAssignedToDriver(false));
      dispatch(setAssignedToUnit(false));
      setDriverName("");
      setUnitNumber("");
    }
  }, [id, available]);
  useEffect(() => {
    if (assignedToUnit) {
      dispatch(setActive(true));
      dispatch(setAvailable(false));
    }
  }, [id, assignedToUnit]);
  useEffect(() => {
    if (active === true) {
      dispatch(setAvailable(false));
    }
  }, [id]);

  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setEquipmentPK(""));
      dispatch(setEquipmentNumber(""));
      dispatch(setDescription(""));
      dispatch(setSerialNumber(""));
      dispatch(setAssignedToDriver(false));
      dispatch(setRequireReserve(false));
      dispatch(setExpirationDate(""));
      dispatch(setBlockDispatch(false));
      dispatch(setAssignToUnit(""));
      dispatch(setDriverFK(""));
      dispatch(setReserveId(null));
      dispatch(setActive(false));
      dispatch(setAvailable(false));
      dispatch(setDeposit(false));
      dispatch(setDepositAmount(0.0));
      dispatch(setIsPlate(false));
      dispatch(setPlateState(""));
      dispatch(setIsAnEld(false));
      setDriverName("");
      setUnitNumber("");
    }
  }, [editFormData, changesCancelled]);

  const validationSchema = yup.object().shape({
    equipmentNumber: yup.string().required(),
    description: yup.string().required(),
    plateState: yup.string().required(),
    depositAmount: yup.number().min(0).required(),
  });
  useEffect(() => {
    if (editFormData != null) {
      dispatch(setEquipmentPK(editFormData.equipmentPK ? editFormData.equipmentPK : ""));
      dispatch(setEquipmentNumber(editFormData.equipmentNumber ? editFormData.equipmentNumber : ""));
      dispatch(setDescription(editFormData.description ? editFormData.description : ""));
      dispatch(setSerialNumber(editFormData.serialNumber ? String(editFormData?.serialNumber)?.trim() : ""));
      dispatch(setAssignedToDriver(editFormData.assignedToDriver ? editFormData.assignedToDriver : false));
      dispatch(setRequireReserve(editFormData.requireReserve ? editFormData.requireReserve : false));
      dispatch(setExpirationDate(editFormData.expirationDate ? editFormData.expirationDate : ""));
      dispatch(setBlockDispatch(editFormData.blockDispatch ? editFormData.blockDispatch : false));
      dispatch(setAssignToUnit(editFormData.unitAssigned ? true : false));
      dispatch(setAssignedToDriver(editFormData.assignedToDriver ? true : false));
      dispatch(setDriverFK(editFormData.driverFK ? editFormData.driverFK : ""));
      dispatch(setActive(editFormData.active ? editFormData.active : false));
      dispatch(setAvailable(editFormData.available ? editFormData.available : false));
      dispatch(setDeposit(editFormData.deposit ? editFormData.deposit : false));
      dispatch(setDepositAmount(editFormData.depositAmount ? editFormData.depositAmount : 0.0));
      dispatch(setIsPlate(editFormData.isPlate ? editFormData.isPlate : false));
      dispatch(setPlateState(editFormData.plateState ? editFormData.plateState : ""));
      dispatch(setUnit(editFormData.unitNumber ? editFormData.unitNumber : null));
      dispatch(setReserveId(editFormData.reserveFK || null));
      setDriverName(editFormData.driverName ? editFormData.driverName : "");
      setUnitNumber(editFormData.unitNumber ? editFormData.unitNumber : "");
      dispatch(setIsAnEld(editFormData.isELD ? editFormData.isELD : false));
      setReserveValue(editFormData.reserveFK || null);
    }
  }, [editFormData, changesCancelled]);

  useEffect(() => {
    // Clear only when a different record is opened. Returning to the same record (e.g. from History)
    // keeps it until the refetch below lands; clearing it made the Active button flash red → black → red.
    const isSameRecord = id && String(editFormData?.equipmentPK) === String(id);
    if (!isSameRecord) dispatch(setEditFormData(null));
    const debounceFunction = setTimeout(() => {
      if (id) fetchRecord(id);
    });

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedId]);

  const isDepositAmountInvalid = (value) => {
    if (value === "." || value.toString().endsWith(".")) {
      return true;
    }
    return false;
  };

  return (
    <Formik
      initialValues={{
        equipmentNumber,
        plateState,
        description,
        depositAmount,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        equipmentNumber: true,
        description: true,
        plateState: true,
      }}
    >
      {(formik) => (
        <div className="w-100 p-2">
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="m-b-10">
              {loader && <LoadingIcon />}

              <div className="p-15 w-100">
                <Row>
                  <Col md={6} xs={6}>
                    <Form.Group
                      className={` m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label htmlFor="name" className="col-form-label dealer-label">
                          Equipment Number
                        </Form.Label>
                      </Col>

                      <Col xs={2} md={2} className="p-0">
                        <input
                          className={`${styles.formControl} ${
                            loader
                              ? ""
                              : isEquipmentUnique && !viewDetail && !id
                                ? "borderRed"
                                : equipmentNumber.length >= 1 && id
                                  ? "black"
                                  : formik.errors.equipmentNumber === undefined
                                    ? "borderGreen"
                                    : formik.errors.equipmentNumber !== undefined
                                      ? "borderRed"
                                      : ""
                          }`}
                          id="equipmentNumber"
                          name="equipmentNumber"
                          type="search"
                          value={equipmentNumber}
                          maxLength={10}
                          disabled={viewDetail || (assignedToDriver && id) || (assignToUnit && id) || id}
                          onBlur={(e) => {
                            hanldeCheckForm(e.target.value);
                          }}
                          autoComplete="off"
                          aria-autocomplete="none"
                          inputMode="search"
                          form="disable-autofill-form"
                          onInput={(e) => {
                            setEquipmentNumber(e.target.value);
                            dispatch(setEquipmentNumber(e.target.value));
                            dispatch(setIsEquipmentUnique(false));
                          }}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label htmlFor="name" className="col-form-label dealer-label">
                          Description
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0">
                        <input
                          className={`${styles.formControl} ${
                            loader
                              ? ""
                              : !viewDetail && !id && description.length === 0
                                ? "borderRed"
                                : description.length >= 1 && id
                                  ? "black"
                                  : formik.errors.description === undefined
                                    ? "borderGreen"
                                    : formik.errors.description !== undefined
                                      ? "borderRed"
                                      : ""
                          }`}
                          id="Description"
                          name="Description"
                          type="search"
                          value={description}
                          maxLength={60}
                          disabled={
                            viewDetail || (assignedToDriver && id !== "") || (assignToUnit && id !== "")
                          }
                          autoComplete="off"
                          aria-autocomplete="none"
                          inputMode="search"
                          form="disable-autofill-form"
                          onInput={(e) => {
                            setDescription(e.target.value);
                            dispatch(setDescription(e.target.value));
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label htmlFor="name" className="col-form-label dealer-label">
                          Serial Number
                        </Form.Label>
                      </Col>

                      <Col xs={4} md={4} className="p-0">
                        <input
                          className={styles.formControl}
                          id="serialNumber"
                          name="serialNumber"
                          type="search"
                          value={serialNumber}
                          maxLength={20}
                          disabled={
                            viewDetail || (assignedToDriver && id !== "") || (assignToUnit && id !== "")
                          }
                          autoComplete="off"
                          aria-autocomplete="none"
                          onInput={(e) => {
                            setSerialNumber(e.target.value);
                            dispatch(setSerialNumber(e.target.value));
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Require Reserve</Form.Label>
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="requireReserve"
                          name="requireReserve"
                          checked={requireReserve}
                          disabled={
                            viewDetail || (assignedToDriver && id !== null) || (assignToUnit && id !== null)
                          }
                          onChange={(e) => {
                            dispatch(setRequireReserve(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-0 m-b-10 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel} ${
                        !requireReserve ? "hide-elements" : ""
                      }`}
                    >
                      <Col xs={3} md={3} sm={3} className="p-0" style={{ maxWidth: "100px" }}>
                        <Form.Label className="col-form-label dealer-label m-l-0">Reserve</Form.Label>
                      </Col>
                      <Col xs={8} md={8} sm={8} className="d-flex">
                        {/* Reserve Autocomplete */}
                        <AutoCompleteDropdown
                          className={`${styles.formControl} ${
                            viewDetail || assignedToDriver || (assignToUnit && id)
                              ? ""
                              : !reserveId
                                ? "borderRed"
                                : "borderGreen"
                          }`}
                          arrayList={reserveList}
                          searchString={reserveInput}
                          renderItemId={(reserve) => reserve.id}
                          renderItemField={(reserve) => reserve.description}
                          handleSearchString={(string) => dispatch(setReserveInput(string))}
                          fetchDataBySearchString={fetchLeaseReserveByName}
                          onSelect={reserveLookupSelection}
                          selectedId={reserveId}
                          clearInputCallback={() => {
                            dispatch(setReserveId(null));
                          }}
                          disabled={viewDetail || (assignedToDriver && id) || (assignToUnit && id)}
                          loading={autoCompleteLoading}
                          maxHeight="200px"
                        />
                        <LookupButton
                          onClick={reaserveLookupModalShow}
                          disabled={viewDetail || (assignedToDriver && id) || (assignToUnit && id)}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Block Dispatch</Form.Label>
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id=" blockDispatch"
                          name=" blockDispatch"
                          checked={blockDispatch}
                          disabled={
                            viewDetail || (assignedToDriver && id !== "") || (assignToUnit && id !== "")
                          }
                          onChange={(e) => {
                            dispatch(setBlockDispatch(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col xs={3} sm={3} className="p-0">
                        <Form.Label className="col-form-label dealer-label">Expiration Date</Form.Label>
                      </Col>

                      <Col xs={3} md={3} lg={3} sm={3} className="p-0">
                        <DateInputField
                          date={expirationDate}
                          setDate={(value) => dispatch(setExpirationDate(value))}
                          onChange={(e) => {
                            dispatch(setExpirationDate(e.target.value));
                          }}
                          className={`${styles.formControl} ${
                            viewDetail
                              ? ""
                              : (blockDispatch && !expirationDate) || !expirationDateValid
                                ? "borderRed"
                                : ""
                          }`}
                          setIsDateValid={(value) => dispatch(setExpirationDateValid(value))}
                          min={expirationDate ? parseLocalDate(expirationDate) : new Date()}
                          disabled={viewDetail || (assignedToDriver && id) || (assignToUnit && id)}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Deposit Required</Form.Label>
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id=" depositRequired"
                          name=" depositRequired"
                          checked={deposit}
                          disabled={
                            viewDetail || (assignedToDriver && id !== "") || (assignToUnit && id !== "")
                          }
                          onChange={(e) => {
                            dispatch(setDeposit(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label htmlFor="name" className="col-form-label dealer-label">
                          Deposit Amount
                        </Form.Label>
                      </Col>

                      <Col xs={2} md={2} className="p-0">
                        <input
                          className={`${styles.formControl} ${
                            isDepositAmountInvalid(depositAmount) ? "borderRed" : ""
                          }`}
                          id="depositAmount"
                          name="depositAmount"
                          type="search"
                          value={depositAmount}
                          defaultValue={0.0}
                          onBeforeInput={(e) => {
                            const { value, selectionStart } = e.target;
                            if (!e.data) return;
                            if (!/[0-9.]/.test(e.data)) {
                              e.preventDefault();
                              return;
                            }
                            if (e.data === "." && value.includes(".")) {
                              e.preventDefault();
                              return;
                            }
                            if (e.data === "." && selectionStart === 0) {
                              e.preventDefault();
                              return;
                            }
                          }}

                          disabled={
                            viewDetail === true ||
                            (viewDetail === false && deposit === false) ||
                            (deposit === false && assignedToDriver && id !== "") ||
                            (assignToUnit && id !== "")
                          }
                          aria-autocomplete="list"
                          onChange={(e) => {
                            let value = e.target.value;
                            let indexOfDecimal = value.indexOf(".");

                            if (value.length === 6 && indexOfDecimal === -1) {
                              value = value.slice(0, 5);
                            } else if (indexOfDecimal !== -1) {
                              const decimalPart = value.slice(indexOfDecimal + 1);
                              value = value.slice(0, indexOfDecimal + 1) + decimalPart.slice(0, 2);
                            }
                            let maxLength;
                            if (indexOfDecimal === -1) {
                              maxLength = 5;
                            } else {
                              maxLength = 8;
                            }
                            value = value.slice(0, maxLength);

                            dispatch(setDepositAmount(value));
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col className="pt-0 p-10" xs={6} md={6}>
                    <Form.Group
                      className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Assigned To Driver</Form.Label>
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="assignToDriver"
                          name="assignToDriver"
                          checked={assignedToDriver}
                          disabled
                          onChange={(e) => {
                            dispatch(setAssignedToDriver(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label htmlFor="name" className="col-form-label dealer-label">
                          Driver{" "}
                        </Form.Label>
                      </Col>
                      <Col xs={4} md={4} className="p-0">
                        <input
                          className={styles.formControl}
                          id="driverName"
                          name="driverName"
                          type="search"
                          value={driverName}
                          maxLength={20}
                          autoComplete="off"
                          disabled
                          aria-autocomplete="list"
                          onInput={(e) => {
                            dispatch(setDriverName(e.target.value));
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Available</Form.Label>
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="available"
                          name="available"
                          checked={available}
                          disabled
                          onChange={(e) => {
                            dispatch(setAvailable(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Assigned To Unit</Form.Label>
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="assignToUnit"
                          name="assignToUnit"
                          checked={assignToUnit}
                          disabled
                          onChange={(e) => {
                            dispatch(setAssignToUnit(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label htmlFor="name" className="col-form-label dealer-label">
                          Unit{" "}
                        </Form.Label>
                      </Col>

                      <Col xs={4} md={4} className="p-0">
                        <input
                          className={styles.formControl}
                          id="unit"
                          name="unit"
                          type="search"
                          value={unitNumber}
                          maxLength={20}
                          disabled
                          autoComplete="off"
                          aria-autocomplete="list"
                          onInput={(e) => {
                            setUnitNumber(e.target.value);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Is A Plate</Form.Label>
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="isPlate"
                          name="isPlate"
                          checked={isPlate}
                          disabled={
                            viewDetail ||
                            (assignedToDriver && id !== null) ||
                            (assignToUnit && id !== null) ||
                            isAnEld
                          }
                          onChange={(e) => {
                            dispatch(setIsPlate(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      // hidden={!isPlate}
                      className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label htmlFor="name" className="col-form-label dealer-label">
                          Plate State
                        </Form.Label>
                      </Col>
                      <Col sm={1} xs={1} md={1} className="p-0">
                        <input
                          className={`${styles.formControl} ${
                            !(
                              viewDetail ||
                              !isPlate ||
                              (assignedToDriver && id !== null) ||
                              (assignToUnit && id !== null)
                            )
                              ? plateState !== ""
                                ? isPlateStateValid
                                  ? "borderGreen"
                                  : "borderRed"
                                : "borderRed"
                              : ""
                          }`}
                          id="plateState"
                          name="plateState"
                          type="text"
                          maxLength={2}
                          value={formattedPlateState}
                          disabled={
                            viewDetail ||
                            !isPlate ||
                            (assignedToDriver && id !== null) ||
                            (assignToUnit && id !== null)
                          }
                          autoComplete="off"
                          aria-autocomplete="list"
                          onInput={(e) => {
                            const upperCaseValue = e.target.value.toUpperCase();
                            setPlateState(upperCaseValue);
                            dispatch(setPlateState(upperCaseValue));
                            checkPlateStateValid(upperCaseValue);
                          }}
                          onChange={checkPlateStateValid}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Is An ELD</Form.Label>
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="isAnEld"
                          name="isAnEld"
                          checked={isAnEld}
                          disabled={
                            viewDetail ||
                            (assignedToDriver && id !== null) ||
                            (assignToUnit && id !== null) ||
                            isPlate
                          }
                          onChange={(e) => {
                            dispatch(setIsAnEld(e.target.checked));
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </div>
            <ReservesLookup
              show={reserveSelection}
              onHide={reserveModalHide}
              renderItemId={(reserve) => reserve.reservePK}
              handleLookupSelection={reserveLookupSelection}
              isEquipmentFlag
            />
          </div>
        </div>
      )}
    </Formik>
  );
}

export default EquipmentContent;
