import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import DateInputField from "../../../../common/DateInputField";
import {
  setDepositAmount,
  setDepositRequired,
  setDescription,
  setDriverId,
  setDriverInput,
  setEditFormData,
  setEquipmentNumber,
  setExpirationDate,
  setIsPlate,
  setPlateState,
  setSaveFormData,
  setSerialNumber,
  setUnitId,
  setUnitInput,
} from "../../../../../redux/EquipmentCheckInOutSlice";
import EquipmentCheckInOutService from "../../../../../services/EquipmentCheckInOutService";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import UnitSelectionLookup from "../../../../LookupScreens/UnitSelection/UnitSelectionLookup";
import DriverLookup from "../../../../LookupScreens/Driver/DriverLookup";
import DriverServicesService from "../../../../../services/DriverServicesService";
const EquipmenCheckOutViewContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [driverArray, setDriverArray] = useState([]);
  const [driverData, setDriverData] = useState(null);
  const [unitArray, setUnitArray] = useState([]);
  const [unitData, setUnitData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [driverLookUpShow, setDriverLookUpShow] = useState(false);
  const dispatch = useDispatch();
  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);
  const editFormData = useSelector((state) => state.equipmentCheckInOutReducer.editFormData);
  const description = useSelector((state) => state.equipmentCheckInOutReducer.description);
  const equipmentNumber = useSelector((state) => state.equipmentCheckInOutReducer.equipmentNumber);
  const serialNumber = useSelector((state) => state.equipmentCheckInOutReducer.serialNumber);

  const expirationDate = useSelector((state) => state.equipmentCheckInOutReducer.expirationDate);
  const depositAmount = useSelector((state) => state.equipmentCheckInOutReducer.depositAmount);
  const depositRequired = useSelector((state) => state.equipmentCheckInOutReducer.depositRequired);
  const isPlate = useSelector((state) => state.equipmentCheckInOutReducer.isPlate);
  const plateState = useSelector((state) => state.equipmentCheckInOutReducer.plateState);
  const checkDetail = useSelector((state) => state.equipmentCheckInOutReducer.checkDetail);

  const driverInput = useSelector((state) => state.equipmentCheckInOutReducer.driverInput);
  const driverId = useSelector((state) => state.equipmentCheckInOutReducer.driverId);
  const unitInput = useSelector((state) => state.equipmentCheckInOutReducer.unitInput);
  const unitId = useSelector((state) => state.equipmentCheckInOutReducer.unitId);

  //for driverlookup
  const advancedSearchPayload = useSelector((state) => state.driverLookup.advancedSearchPayload);
  const showAdvancedSort = useSelector((state) => state.driverLookup.showAdvancedSort);
  const advancedSortingOrder = useSelector((state) => state.driverLookup.advancedSortingOrder);
  const normalSortFlag = useSelector((state) => state.driverLookup.normalSortFlag);
  const normalSortValue = useSelector((state) => state.driverLookup.normalSortValue);
  const searchTerm = useSelector((state) => state.driverLookup.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.driverLookup.selectedSearchCriteria);
  const advancedSearchString = useSelector((state) => state.driverLookup.advancedSearchString);
  const advancedSearchByInputs = useSelector((state) => state.driverLookup.advancedSearchByInputs);
  const pageNumber = useSelector((state) => state.driverLookup.pageNumber);
  const driverType = useSelector((state) => state.driverLookup.driverType);
  const statusType = useSelector((state) => state.driverLookup.statusType);
  const cityType = useSelector((state) => state.driverLookup.cityType);
  const [driverLoading, setDriverLoading] = useState(false);
  const [unitLoading, setUnitLoading] = useState(false);
  useEffect(() => {
    if (editFormData != null) {
      dispatch(setDescription(editFormData.description ? editFormData.description?.trim() : ""));
      dispatch(setEquipmentNumber(editFormData.equipmentNumber ? editFormData.equipmentNumber?.trim() : ""));
      dispatch(setSerialNumber(editFormData.serialNumber ? editFormData.serialNumber?.trim() : ""));
      dispatch(setExpirationDate(editFormData.expirationDate ? editFormData.expirationDate : ""));
      dispatch(setDepositRequired(editFormData.deposit ? editFormData.deposit : ""));
      dispatch(setDepositAmount(editFormData.depositAmount?.toFixed(2)));
      dispatch(setIsPlate(editFormData.isPlate ? editFormData.isPlate : ""));
      dispatch(setPlateState(editFormData.plateState ? editFormData.plateState : ""));
      dispatch(setDriverInput(""));
      dispatch(setUnitInput(""));
    }
  }, [editFormData]);
  const handleDriverLookupModalShow = () => {
    setDriverLookUpShow(true);
  };

  const handleDriverLookupModalHide = () => {
    setDriverLookUpShow(false);
  };

  const fetchRecordById = (id) => {
    setIsLoading(true);
    EquipmentCheckInOutService.getEquipmentById(id)
      .then((response) => {
        const data = response.data;

        dispatch(setEditFormData(data));
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (id) fetchRecordById(id);
  }, [id]);

  const getSaveData = () => {
    dispatch(
      setSaveFormData({
        equipmentFK: id,
        depositAmount: depositAmount,

        driverFK: driverId,
        dispatchFK: unitId,
      })
    );
  };

  useEffect(() => {
    getSaveData();
  }, [id, depositAmount, driverId, unitId]);

  /**
   * Fetch all Drivers
   * Used for Driver Autocomplete
   */
  const fetchAllDrivers = (string) => {
    setDriverLoading(true);
    EquipmentCheckInOutService.getAllDriversForAutocomplete(string)
      .then((response) => {
        const data = response.data.content;
        const driverList = data?.map((drivers) => ({
          ...drivers,
          firstName: drivers.firstName?.trim(),
        }));

        setDriverArray(driverList);
        setDriverLoading(false);
      })
      .catch((err) => {
        setDriverLoading(false);
      });
  };
  const handleDriverLookupSelection = (item) => {
    dispatch(setDriverId(item.driverPK));
    dispatch(setDriverInput(item.firstName?.trim() + (item.lastName ? " " + item.lastName?.trim() : "")));
    setDriverData(item);
    setDriverLookUpShow(false);
  };

  /**
   * Fetch all Units
   * Used for Units Autocomplete
   */
  const fetchAllUnits = (string) => {
    setUnitLoading(true);
    EquipmentCheckInOutService.getAllUnitsForAutocomplete(string, unitId ? null : driverData)
      .then((response) => {
        const data = response.data.content;
        const unitList = data?.map((units) => ({
          ...units,
          unitNumber: units.unitNumber?.trim(),
        }));
        setUnitArray(unitList);
        setUnitLoading(false);
      })
      .catch((err) => {
        setUnitLoading(false);
      });
  };

  const handleUnitLookupSelection = (item) => {
    dispatch(setUnitId(item.dispatchPK));
    dispatch(setUnitInput(item.unitNumber?.trim()));
    setUnitData(item);

    if (!driverId) {
      setDisable(true);
    }

    if (item.driverFK != null) {
      const driverPK = item.driverFK.driverPK || item.driverFK;
      DriverServicesService.getDriverDetails(driverPK)
        .then((res) => {
          dispatch(setDriverInput(res.data.name));
          dispatch(setDriverId(res.data.driverPK));
        })
        .catch((err) => console.log(err))
        .finally(() => {});
    }

    setShowUnitSelectionLookup(false);
  };

  useEffect(() => {
    fetchAllUnits();
  }, [driverData]);

  useEffect(() => {
    if (driverId == null && driverInput === "") {
      setUnitData(null);
      dispatch(setUnitId(null));
      dispatch(setUnitInput(""));
      setDriverData(null);
      setUnitArray([]);
    }
  }, [driverId, driverInput]);

  useEffect(() => {
    if (unitId === null && unitInput === "") {
      dispatch(setDriverId(null));
      dispatch(setDriverInput(""));
      setDisable(false);
      setDriverArray([]);
    }
  }, [unitId, unitInput]);
  const validationSchema = yup.object({
    driverInput: yup.string().required(),
    unitInput: yup.string().required(),
  });

  return (
    <Formik
      initialValues={{
        driverInput,
        unitInput,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        driverInput: true,
        unitInput: true,
      }}
    >
      {(formik) => (
        <div className="w-100 p-2">
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="m-b-10">
              <div className="p-15 w-100">
                <Row className="m-0 p-10">
                  <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                    <Form.Group className="form-group form-group m-t-5 m-b- align-items-center row m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className="customColFormLabel"> Equipment Number</Form.Label>
                      </Col>

                      <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                        <input
                          id="equipmentNumber"
                          name="equipmentNumber"
                          type="text"
                          value={equipmentNumber}
                          maxLength={10}
                          disabled
                          autoComplete="off"
                          aria-autocomplete="list"
                          className={`${styles.formControl} 
                      `}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className=" mt-4 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Description</Form.Label>
                      </Col>

                      <Col xs={5} md={5} sm={5} className="p-0">
                        <input
                          id="description"
                          name="description"
                          type="text"
                          value={description}
                          maxLength={30}
                          disabled
                          autoComplete="off"
                          aria-autocomplete="list"
                          className={`${styles.formControl} 
                     `}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Serial Number</Form.Label>
                      </Col>

                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          id="serialNumber"
                          name="serialNumber"
                          type="text"
                          value={serialNumber}
                          maxLength={30}
                          disabled
                          autoComplete="off"
                          aria-autocomplete="list"
                          className={`${styles.formControl} 
                     `}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Expiration Date</Form.Label>
                      </Col>

                      <Col xs={2} md={2} sm={2} className="p-0  w-125px">
                        <DateInputField
                          date={expirationDate}
                          reduxSetDate={(value) => {
                            dispatch(setExpirationDate);
                          }}
                          disabled
                          placeholder=" "
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Deposit Required</Form.Label>
                      </Col>

                      <Col xs={5} md={5} sm={5} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="depositRequired"
                          name="depositRequired"
                          value={depositRequired}
                          checked={depositRequired}
                          disabled
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0"
                      hidden={!depositRequired}
                    >
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Deposit Amount</Form.Label>
                      </Col>

                      <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                        <input
                          id="depositAmount"
                          name="depositAmount"
                          type="text"
                          value={depositAmount}
                          maxLength={30}
                          disabled
                          autoComplete="off"
                          aria-autocomplete="list"
                          className={`${styles.formControl} 
                     `}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Is A Plate</Form.Label>
                      </Col>

                      <Col xs={5} md={5} sm={5} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="isPlate"
                          name="isPlate"
                          value={isPlate}
                          checked={isPlate}
                          disabled
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      hidden={!isPlate}
                      className=" mt-3 m-b-10 align-items-center row  m-l-0 m-r-0"
                    >
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className=" col-form-label dealer-label">Plate State</Form.Label>
                      </Col>

                      <Col xs={1} md={1} sm={1} className="p-0 w-50px">
                        <input
                          id="plateState"
                          name="plateState"
                          type="text"
                          value={plateState.toUpperCase()?.trim()}
                          maxLength={30}
                          disabled
                          autoComplete="off"
                          aria-autocomplete="list"
                          className={`${styles.formControl} 
                     `}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0"
                      hidden={!checkDetail}
                    >
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className={`${styles.colFormLabel}`}>Unit</Form.Label>
                      </Col>
                      <Col xs={6} md={6} sm={6} className="p-0 d-flex w-350">
                        <AutoCompleteDropdown
                          arrayList={unitArray}
                          searchString={unitInput}
                          renderItemId={(item) => item.dispatchPK}
                          renderItemField={(item) => item.unitNumber}
                          handleSearchString={(string) => dispatch(setUnitInput(string))}
                          selectedId={unitId}
                          fetchDataBySearchString={fetchAllUnits}
                          onSelect={handleUnitLookupSelection}
                          clearInputCallback={() => {
                            dispatch(setUnitId(null));

                            setUnitData(null);
                          }}
                          loading={unitLoading}
                          towardsTop
                          className={`${unitId !== null && unitInput !== "" ? "borderGreen" : "borderRed"}`}
                        />
                        <LookupButton
                          onClick={() => setShowUnitSelectionLookup(true)}
                          // disabled
                          // Customer lookup Modal @ Bottom
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0"
                      hidden={!checkDetail}
                    >
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className={`${styles.colFormLabel}`}>Driver</Form.Label>
                      </Col>
                      <Col xs={6} md={6} sm={6} className="p-0 d-flex w-350">
                        <AutoCompleteDropdown
                          arrayList={driverArray}
                          searchString={driverInput}
                          renderItemId={(item) => item.driverPK}
                          renderItemField={(item) =>
                            item.firstName?.trim() + (item.lastName ? " " + item.lastName?.trim() : "")
                          }
                          handleSearchString={(string) => dispatch(setDriverInput(string))}
                          fetchDataBySearchString={fetchAllDrivers}
                          onSelect={handleDriverLookupSelection}
                          clearInputCallback={() => {
                            dispatch(setDriverId(null));
                          }}
                          selectedId={driverId}
                          towardsTop
                          className={`${driverId === null && driverInput !== "" ? "borderRed" : ""}`}
                          loading={driverLoading}
                          disabled={disable}
                        />

                        <LookupButton onClick={handleDriverLookupModalShow} disabled={disable} />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              {isLoading ? (
                <div className="fade modal-backdrop show">
                  {" "}
                  <div className="pos-center">
                    {" "}
                    <div className="loader"></div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <UnitSelectionLookup
                EquipmentCheckOut
                driverFK={unitId ? null : driverData}
                show={showUnitSelectionLookup}
                onHide={() => setShowUnitSelectionLookup(false)}
                handleLookupSelection={handleUnitLookupSelection}
              />

              <DriverLookup
                show={driverLookUpShow}
                onHide={handleDriverLookupModalHide}
                renderItemId={(driver) => driver.driverPK}
                handleLookupSelection={handleDriverLookupSelection}
                customServiceCallback={() =>
                  EquipmentCheckInOutService.getAllDriversForLookup(
                    searchTerm,
                    driverType,
                    cityType,
                    pageNumber,
                    selectedSearchCriteria,
                    advancedSearchPayload,
                    advancedSortingOrder,
                    normalSortValue,
                    normalSortFlag,
                    advancedSearchString,
                    advancedSearchByInputs
                  )
                }
              />
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default EquipmenCheckOutViewContent;
