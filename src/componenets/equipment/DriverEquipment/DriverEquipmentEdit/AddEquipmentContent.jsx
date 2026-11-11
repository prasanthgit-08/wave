import { formatForApi, parseLocalDate } from "../../../../utils/dateUtils";
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
  setIsAnEld,
  setAssignedToUnit,
  setUnit,
  setReserveFK,
  setReserveInput,
  setReserveId,
} from "../../../../redux/DriverEquipmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EquipmentService from "../../../../services/EquipmentService";
import DateInputField from "../../../common/DateInputField";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import ReservesService from "../../../../services/ReservesService";
import LookupButton from "../../../common/LookupButton";
import ReservesLookup from "../../../LookupScreens/Reserves/ReservesLookup";
import LoadingIcon from "../../../common/LoadingIcon";
import Input from "../../../../components/common/input";

function AddEquipmentContent({ styles }) {
  const params = useParams();
  const driverId = params.driverId;
  const equipmentId = params.id;
  const today = formatForApi(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const minValue = Math.min(0);
  const [reserveList, setReserveList] = useState([]);
  const [reserveSelection, setReserveSelection] = useState(false);
  const [loader, setLoader] = useState(false);

  const editFormData = useSelector((state) => state.driverEquipmentReducer.editFormData);
  const viewDetail = useSelector((state) => state.driverEquipmentReducer.viewDetail);
  const changesCancelled = useSelector((state) => state.driverEquipmentReducer.changesCancelled);
  const equipmentNumber = useSelector((state) => state.driverEquipmentReducer.equipmentNumber);
  const description = useSelector((state) => state.driverEquipmentReducer.description);
  const serialNumber = useSelector((state) => state.driverEquipmentReducer.serialNumber);
  const assignedToDriver = useSelector((state) => state.driverEquipmentReducer.assignedToDriver);
  const assignedToUnit = useSelector((state) => state.driverEquipmentReducer.assignedToUnit);
  const assignToUnit = useSelector((state) => state.driverEquipmentReducer.assignToUnit);
  const requireReserve = useSelector((state) => state.driverEquipmentReducer.requireReserve);
  const expirationDate = useSelector((state) => state.driverEquipmentReducer.expirationDate);
  const blockDispatch = useSelector((state) => state.driverEquipmentReducer.blockDispatch);
  const driverFK = useSelector((state) => state.driverEquipmentReducer.driverFK);
  const available = useSelector((state) => state.driverEquipmentReducer.available);
  const deposit = useSelector((state) => state.driverEquipmentReducer.deposit);
  const depositAmount = useSelector((state) => state.driverEquipmentReducer.depositAmount);
  const active = useSelector((state) => state.driverEquipmentReducer.active);
  const selectedId = useSelector((state) => state.driverEquipmentReducer.selectedId);
  const unit = useSelector((state) => state.driverEquipmentReducer.unit);

  const isPlate = useSelector((state) => state.driverEquipmentReducer.isPlate);
  const plateState = useSelector((state) => state.driverEquipmentReducer.plateState);
  const isPlateStateValid = useSelector((state) => state.driverEquipmentReducer.isPlateStateValid);
  const isEquipmentUnique = useSelector((state) => state.driverEquipmentReducer.isEquipmentUnique);
  const isAnEld = useSelector((state) => state.driverEquipmentReducer.isAnEld);
  const reserveInput = useSelector((state) => state.driverEquipmentReducer.reserveInput);
  const reserveId = useSelector((state) => state.driverEquipmentReducer.reserveId);

  const [unitNumber, setUnitNumber] = useState("");
  const [driverName, setDriverName] = useState("");

  const fetchRecord = (equipmentId) => {
    setLoader(true);
    dispatch(setEditFormData(null));
    EquipmentService.getRecord(equipmentId)
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
  const formattedPlateState = typeof plateState === "string" ? plateState.toUpperCase()?.trim() : "";
  const checkPlateStateValid = (value) => {
    EquipmentService.checkPlateState(value)
      .then((response) => {
        dispatch(setIsPlateStateValid(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
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

  const reserveLookupSelection = (data) => {
    dispatch(setReserveInput(data.description));
    dispatch(setReserveId(data.reservePK));

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
    if (assignedToDriver) {
      dispatch(setActive(true));
      dispatch(setAvailable(false));
    }
  }, [equipmentId, assignedToDriver]);

  useEffect(() => {
    if (available) {
      dispatch(setAssignedToDriver(false));
      dispatch(setAssignedToUnit(false));
      setDriverName("");
      setUnitNumber("");
    }
  }, [equipmentId, available]);
  useEffect(() => {
    if (assignedToUnit) {
      dispatch(setActive(true));
      dispatch(setAvailable(false));
    }
  }, [equipmentId, assignedToUnit]);
  useEffect(() => {
    if (active === true) {
      dispatch(setAvailable(false));
    }
  }, [equipmentId]);

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

  const fetchLeaseReserveByName = (string) => {
    ReservesService.getReserveTypeAuto(string, true, false, false)
      .then(({ data }) => {
        setReserveList(data.content);
      })
      .catch((error) => {
        console.log("Error " + error);
      });
  };

  const validationSchema = yup.object().shape({
    equipmentNumber: yup.string().required(),
    description: yup.string().required(),
    plateState: yup.string().required(),
    depositAmount: yup.number().min(0).required(),
  });
  useEffect(() => {
    const {
      equipmentPK,
      equipmentNumber,
      description,
      serialNumber,
      assignedToDriver,
      requireReserve,
      expirationDate,
      blockDispatch,
      unit,
      driverFK,
      reserveFK,
      active,
      available,
      deposit,
      depositAmount,
      isPlate,
      plateState,
      isELD,
      driverName,
    } = editFormData || {};

    dispatch(setEquipmentPK(equipmentPK || null));
    dispatch(setEquipmentNumber(equipmentNumber || ""));
    dispatch(setDescription(description || ""));
    dispatch(setSerialNumber(serialNumber || ""));
    dispatch(setAssignedToDriver(assignedToDriver || false));
    dispatch(setRequireReserve(requireReserve || false));
    dispatch(setExpirationDate(expirationDate || ""));
    dispatch(setBlockDispatch(blockDispatch || false));
    dispatch(setAssignToUnit(!!unit));
    dispatch(setDriverFK(driverFK || null));
    dispatch(setReserveFK(reserveFK || null));
    dispatch(setActive(active || false));
    dispatch(setAvailable(available || false));
    dispatch(setDeposit(deposit || false));
    dispatch(setDepositAmount(depositAmount || 0.0));
    dispatch(setIsPlate(isPlate || false));
    dispatch(setPlateState(plateState || ""));
    dispatch(setUnit(unit || null));
    setDriverName(driverName || "");
    setUnitNumber(unit || "");
    dispatch(setIsAnEld(isELD || false));
    setReserveValue(reserveFK || null);
  }, [editFormData, changesCancelled]);
  const reserveModalHide = () => {
    setReserveSelection(false);
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      if (equipmentId) fetchRecord(equipmentId);
    });

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [equipmentId]);

  const isEquipmentNoDisabled =
    viewDetail || (assignedToDriver && equipmentId) || (assignToUnit && equipmentId) || equipmentId;

  const isDescriptionDisabled =
    viewDetail || (assignedToDriver && equipmentId !== "") || (assignToUnit && equipmentId !== "");

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
          {loader && <LoadingIcon />}

          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="m-b-10">
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
                        <Input
                          className={`${styles.formControl} ${
                            isEquipmentNoDisabled
                              ? ""
                              : isEquipmentUnique && !viewDetail && !equipmentId
                                ? "borderRed"
                                : equipmentNumber.length >= 1 && equipmentId
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
                          disabled={isEquipmentNoDisabled}
                          autoComplete="off"
                          aria-autocomplete="list"
                          onChnange={(e) => {
                            setEquipmentNumber(e.target.value);
                            dispatch(setEquipmentNumber(e.target.value));
                          }}
                        />
                      </Col>
                      <Row
                        className={`${
                          (viewDetail || !equipmentId) && isEquipmentUnique && !viewDetail
                            ? ""
                            : "hide-elements"
                        } m-t-1`}
                      >
                        <Col xs={3} md={3} sm={3}></Col>

                        <Col style={{ paddingLeft: "5px" }}>
                          <p className="p-0  text-danger alert" style={{ height: "3px" }}>
                            Equipment Number already exists
                          </p>
                        </Col>
                      </Row>
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
                        <Input
                          className={`${styles.formControl} ${
                            isDescriptionDisabled
                              ? ""
                              : !viewDetail && !equipmentId && description.length === 0
                                ? "borderRed"
                                : description.length >= 1 && equipmentId
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
                          disabled={isDescriptionDisabled}
                          autoComplete="off"
                          aria-autocomplete="list"
                          onChange={(e) => {
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
                        <Input
                          className={styles.formControl}
                          id="serialNumber"
                          name="serialNumber"
                          type="search"
                          value={serialNumber}
                          maxLength={20}
                          disabled={
                            viewDetail ||
                            (assignedToDriver && equipmentId !== "") ||
                            (assignToUnit && equipmentId !== "")
                          }
                          autoComplete="off"
                          aria-autocomplete="list"
                          Input={(e) => {
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
                        <Input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="requireReserve"
                          name="requireReserve"
                          checked={requireReserve}
                          disabled={
                            viewDetail ||
                            (assignedToDriver && equipmentId !== "") ||
                            (assignToUnit && equipmentId !== "")
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
                      <Col xs={6} md={6} sm={6} className="d-flex">
                        {/* Reserve Autocomplete */}
                        <AutoCompleteDropdown
                          className={`${styles.formControl}`}
                          arrayList={reserveList}
                          searchString={reserveInput}
                          renderItemId={(reserve) => reserve.reservePK}
                          renderItemField={(reserve) => reserve.description}
                          handleSearchString={(string) => dispatch(setReserveInput(string))}
                          fetchDataBySearchString={fetchLeaseReserveByName}
                          onSelect={reserveLookupSelection}
                          selectedId={reserveId}
                          clearInputCallback={() => {
                            dispatch(setReserveId(null));
                          }}
                          disabled
                        />

                        <LookupButton onClick={reaserveLookupModalShow} disabled />
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
                            viewDetail ||
                            (assignedToDriver && equipmentId !== "") ||
                            (assignToUnit && equipmentId !== "")
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
                          setDate={setExpirationDate}
                          onChange={(e) => {
                            dispatch(setExpirationDate(e.target.value));
                          }}
                          className={`${styles.formControl} ${
                            viewDetail ? "black" : blockDispatch && !expirationDate ? "borderRed" : "black"
                          }`}
                          min={expirationDate ? parseLocalDate(expirationDate) : new Date()}
                          disabled={viewDetail}
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
                          disabled
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
                        <Input
                          className={`${styles.formControl} ${
                            viewDetail
                              ? ""
                              : isPlate
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
                          disabled
                          autoComplete="off"
                          aria-autocomplete="list"
                          onChange={(e) => {
                            setPlateState(e.target.value);
                            dispatch(setPlateState(e.target.value));
                            checkPlateStateValid(e.target.value);
                            checkPlateStateValid(e.target.value);
                          }}
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
                          disabled
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
              MaintenanceProgram
            />
          </div>
        </div>
      )}
    </Formik>
  );
}

export default AddEquipmentContent;
