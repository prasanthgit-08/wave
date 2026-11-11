import { formatForApi, parseLocalDate } from "../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Form } from "react-bootstrap";
import {
  setCustomer,
  setDealer,
  setLast5,
  setMiles,
  setOrderDate,
  setPlant,
  setSpecial,
  setUnitData,
  setUnitId,
  setUnitType,
  setDealerAddress1,
  setDealerAddress2,
  setDealerState,
  setDealerCity,
  setSingleReleaseFormData,
  setRelease,
  setDelay,
  setUnitInput,
  setYard,
  setDisableFlag,
  setAlreadyDelayed,
  setAlreadyReleased,
  setUnitPk,
  setUnitNo,
  setContinueCheckFlag,
  setUnitInUse,
} from "../../../../redux/PlantReleaseSlice";
import { useNavigate } from "react-router-dom";
import PlantReleaseService from "../../../../services/PlantReleaseService";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import DateInputField from "../../../common/DateInputField";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import UnitSelectionLookup from "../../../LookupScreens/UnitSelection/UnitSelectionLookup";

const SingleContent = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [delayStore, setDelayStore] = useState(false);
  const [releaseStore, setReleaseStore] = useState(false);
  const [unitArray, setUnitArray] = useState([]);
  const [unitLoading, setUnitLoading] = useState(false);
  const last5 = useSelector((state) => state.plantReleaseReducer.last5);
  const unitId = useSelector((state) => state.plantReleaseReducer.unitId);
  const unitInput = useSelector((state) => state.plantReleaseReducer.unitInput);
  const release = useSelector((state) => state.plantReleaseReducer.release);
  const delay = useSelector((state) => state.plantReleaseReducer.delay);
  const unitType = useSelector((state) => state.plantReleaseReducer.unitType);
  const special = useSelector((state) => state.plantReleaseReducer.special);
  const orderDate = useSelector((state) => state.plantReleaseReducer.orderDate);
  const miles = useSelector((state) => state.plantReleaseReducer.miles);
  const customer = useSelector((state) => state.plantReleaseReducer.customer);
  const plant = useSelector((state) => state.plantReleaseReducer.plant);
  const yard = useSelector((state) => state.plantReleaseReducer.yard);
  const dealer = useSelector((state) => state.plantReleaseReducer.dealer);
  const unitData = useSelector((state) => state.plantReleaseReducer.unitData);
  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);

  const disableFlag = useSelector((state) => state.plantReleaseReducer.disableFlag);
  const dealerAddress1 = useSelector((state) => state.plantReleaseReducer.dealerAddress1);
  const dealerAddress2 = useSelector((state) => state.plantReleaseReducer.dealerAddress2);
  const dealerCity = useSelector((state) => state.plantReleaseReducer.dealerCity);
  const dealerState = useSelector((state) => state.plantReleaseReducer.dealerState);
  const singleUnits = useSelector((state) => state.plantReleaseReducer.singleUnits);
  const unitInUse = useSelector((state) => state.plantReleaseReducer.unitInUse);

  /**
   * Used for fetching details of selected unit
   */

  const fetchUnitDataById = (unitId) => {
    setLoad(true);
    PlantReleaseService.getUnitById(unitId)
      .then((response) => {
        const data = response.data;
        const pl = data.plantRelease;
        const dl = data.unitOnShuttleDelay;

        dispatch(setUnitData(data));
        setDelayStore(dl);
        setReleaseStore(pl);
      })
      .catch(() => {})
      .finally(() => {
        setLoad(false);
        dispatch(setUnitInUse(false));
      });
  };

  /**
   * Used for reload
   */

  useEffect(() => {
    if (singleUnits === false) {
      navigate("/plant-release-selection-screen");
    }
  }, [singleUnits]);

  /**
   * Used for taking data into input fields
   */

  useEffect(() => {
    if (unitData != null) {
      dispatch(setLast5(unitData.unitNumberLast5));
      dispatch(setUnitId(unitData.unitPK));
      dispatch(setUnitInput(unitData.unitNumber));
      dispatch(setSpecial(unitData.code ? unitData.code : ""));
      dispatch(setUnitType(unitData.descriptionLong ? unitData.descriptionLong : ""));
      dispatch(
        setOrderDate(unitData.orderDate ? formatForApi(parseLocalDate(unitData.orderDate)) : "")
      );
      dispatch(setYard(unitData.pickUpYardName ? unitData.pickUpYardName : ""));
      dispatch(setMiles(unitData.invoiceMiles));
      dispatch(setCustomer(unitData.customerName ? unitData.customerName : ""));
      dispatch(setPlant(unitData.pickupCustPlantName ? unitData.pickupCustPlantName : ""));
      dispatch(setDealer(unitData.pickupDealerName ? unitData.pickupDealerName : ""));
      dispatch(setDealerAddress1(unitData.pickupDealerAddress1 ? unitData.pickupDealerAddress1 : ""));
      dispatch(setDealerAddress2(unitData.pickupDealerAddress2 ? unitData.pickupDealerAddress2 : ""));
      dispatch(setDealerCity(unitData.city ? unitData.city : ""));
      dispatch(setDealerState(unitData.stateCode ? unitData.stateCode : ""));
      dispatch(setRelease(unitData.plantRelease));
      dispatch(setDelay(unitData.unitOnShuttleDelay));
      dispatch(setAlreadyDelayed(unitData.alreadyDelayed ? unitData.alreadyDelayed : ""));
      dispatch(setAlreadyReleased(unitData.plantRelease));
    }
  }, [unitData]);
  /**
   * Used for disable save button
   */
  useEffect(() => {
    if ((release === releaseStore && delay === delayStore) || (delay === true && delayStore === false)) {
      dispatch(setDisableFlag(true));
    } else {
      dispatch(setDisableFlag(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [release, delay, delayStore, releaseStore]);
  /**
   * Used for disable Next button
   */
  useEffect(() => {
    if (unitId && delay === true && delayStore === false) {
      dispatch(setContinueCheckFlag(false));
    } else {
      dispatch(setContinueCheckFlag(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, delayStore, unitId]);

  /**
   * Used for Clearing data
   */
  useEffect(() => {
    if (unitId == null || unitInput === "") {
      dispatch(setLast5(""));
      dispatch(setSpecial(""));
      dispatch(setUnitType(""));
      dispatch(setOrderDate(""));
      dispatch(setMiles(""));
      dispatch(setCustomer(""));
      dispatch(setPlant(""));
      dispatch(setDealer(""));
      dispatch(setDealerAddress1(""));
      dispatch(setDealerCity(""));
      dispatch(setDealerAddress2(""));
      dispatch(setDealerCity(""));
      dispatch(setYard(""));
      dispatch(setDealerState(""));
      dispatch(setDelay(false));
      dispatch(setRelease(false));
      setDelayStore(false);
      setReleaseStore(false);
    }
  }, [unitId, unitInput]);

  useEffect(() => {
    if (unitId || unitInUse) fetchUnitDataById(unitId);
  }, [unitId, unitInUse]);

  /**
   *  Unit Number Autocomplete Fetch function
   **/
  const getAllUnitNumbers = (string, last5) => {
    let unitNumberLastFive = last5;
    if (unitId) {
      unitNumberLastFive = "";
    }
    setUnitLoading(true);
    PlantReleaseService.getAllUnitNumbers(string, unitNumberLastFive, 0, 100)
      .then((response) => {
        const data = response.data.content;
        const unitsList = data?.map((unit) => ({ ...unit, unitNumber: unit.unitNumber?.trim() }));
        setUnitArray(unitsList);
        if (unitNumberLastFive?.length > 0) {
          dispatch(setUnitId(null));
          dispatch(setUnitInput(""));
        }
        setUnitLoading(false);
      })
      .catch((error) => {
        setUnitLoading(false);
      });
  };

  /**
   * Unit Number Autocomplete Handle function On select
   **/
  const handleUnitNumberSelection = (unit) => {
    dispatch(setUnitInput(unit.unitNumber));
    dispatch(setUnitId(unit.unitPK));
    dispatch(setUnitNo(unit.unitNumber));
    dispatch(setUnitPk(unit.unitPK));
    setShowUnitSelectionLookup(false);
  };

  useEffect(() => {
    if (last5 !== "") {
      getAllUnitNumbers(unitInput, last5);
    }
  }, [last5]);
  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight">
        <Row className="m-0 p-10">
          <Col xs={6}>
            <Form.Group className="form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0 w-100px">
                <Form.Label className={`${styles.colFormLabel}`}>Last 5</Form.Label>
              </Col>
              <Col xs={2} sm={2} md={2} className="p-0 w-60px">
                <input
                  type="text"
                  className={`${styles.formControl}`}
                  id="last5"
                  name="last5"
                  value={last5}
                  maxLength={5}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onInput={(e) => {
                    dispatch(setLast5(e.target.value.replace(/^\s+/g, "")));
                    dispatch(setUnitId(null));

                    dispatch(setUnitInput(""));
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0 w-100px ">
                <Form.Label className={`${styles.colFormLabel}`}>Unit</Form.Label>
              </Col>
              <Col xs={6} md={6} sm={6} className="p-0 d-flex w-300">
                <AutoCompleteDropdown
                  arrayList={unitArray}
                  searchString={unitInput}
                  handleSearchString={(string) => dispatch(setUnitInput(string))}
                  fetchDataBySearchString={(string) => getAllUnitNumbers(string, last5)}
                  renderItemId={(unit) => unit.unitPK}
                  renderItemField={(unit) => unit.unitNumber}
                  onSelect={handleUnitNumberSelection}
                  clearInputCallback={() => {
                    dispatch(setUnitId(null));
                    dispatch(setLast5(""));
                  }}
                  handleAutoCompleteClose={() => {
                    dispatch(setUnitId(null));
                    dispatch(setLast5(""));
                  }}
                  selectedId={unitId}
                  searchPlaceholder="ENTER UNIT NUMBER"
                  className={`${!unitId || unitInput === "" ? "borderRed" : "borderGreen"}`}
                  inputTextIndent="4px"
                  loading={unitLoading}
                />
                <LookupButton onClick={() => setShowUnitSelectionLookup(true)} />
              </Col>
            </Form.Group>

            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                <Form.Label className={`${styles.colFormLabel}`}>Release</Form.Label>
              </Col>
              <Col className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="release"
                  name="release"
                  value={release}
                  checked={release}
                  disabled={delay === true || !unitId}
                  onChange={(e) => {
                    dispatch(setRelease(e.target.checked));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                <Form.Label className={`${styles.colFormLabel}`}>Delay</Form.Label>
              </Col>
              <Col className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="browseUnits"
                  name="browseUnits"
                  value={delay}
                  checked={delay}
                  disabled={release === true || !unitId}
                  onChange={(e) => {
                    dispatch(setDelay(e.target.checked));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                <Form.Label className={`${styles.colFormLabel}`}>Unit Type</Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0 w-300">
                <input
                  type="text"
                  className={`${styles.formControl}`}
                  id="unitType"
                  name="unitType"
                  value={unitType}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                <Form.Label className={`${styles.colFormLabel}`}>Special</Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0 w-300">
                <input
                  type="text"
                  className={`${styles.formControl}`}
                  id="special"
                  name="special"
                  value={special}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                <Form.Label className="col-form-label dealer-label">Order Date</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0  w-100px">
                <DateInputField
                  date={orderDate}
                  reduxSetDate={(value) => {
                    dispatch(setOrderDate);
                  }}
                  disabled
                  placeholder=" "
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                <Form.Label className={`${styles.colFormLabel}`}>Miles</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0  w-100px">
                <input
                  disabled
                  type="text"
                  className={`${styles.formControl}`}
                  id="miles"
                  name="miles"
                  value={miles}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col className="ps-lg-6 100px">
            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-75px">
                <Form.Label className={`${styles.colFormLabel}`}>Customer</Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0 w-300">
                <input
                  type="text"
                  className={`${styles.formControl}`}
                  id="customer"
                  name="customer"
                  value={customer}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-75px">
                <Form.Label className={`${styles.colFormLabel}`}>Plant</Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0 w-300">
                <input
                  type="text"
                  className={`${styles.formControl}`}
                  id="plant"
                  name="plant"
                  value={plant}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-75px">
                <Form.Label className={`${styles.colFormLabel}`}>Yard</Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0 w-300">
                <input
                  type="text"
                  className={`${styles.formControl}`}
                  id="browseUnits"
                  name="browseUnits"
                  disabled
                  value={yard}
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0 w-75px">
                <Form.Label className="col-form-label dealer-label">Dealer</Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0 w-300">
                <input
                  type="text"
                  className={`${styles.formControl}`}
                  id="hours1"
                  name="hours1"
                  maxLength={42}
                  value={dealer}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0 w-75px">
                <Form.Label className={`${styles.colFormLabel}`}></Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0 w-300">
                <input
                  type="text"
                  className={`${styles.formControl}`}
                  disabled
                  id="hours2"
                  name="hours2"
                  maxLength={42}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={dealerAddress1}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0 w-75px">
                <Form.Label className={`${styles.colFormLabel}`}></Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0 w-300">
                <input
                  type="text"
                  className={`${styles.formControl}`}
                  disabled
                  id="hours2"
                  name="hours2"
                  maxLength={42}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={dealerAddress2}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-75px">
                <Form.Label className={`${styles.colFormLabel}`}></Form.Label>
              </Col>

              <Col xs={3} sm={3} md={3} className="p-l-0 w-50px">
                <input
                  type="text"
                  className={`${styles.formControl}`}
                  id="hours3"
                  name="hours3"
                  disabled
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={dealerState}
                />
              </Col>
              <Col xs={6} md={6} sm={6} className="p-0 w-275">
                <input
                  type="text"
                  className={`${styles.formControl}`}
                  id="hours3"
                  name="hours3"
                  disabled
                  maxLength={42}
                  value={dealerCity}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <UnitSelectionLookup
          show={showUnitSelectionLookup}
          onHide={() => setShowUnitSelectionLookup(false)}
          PlantRelease
          handleLookupSelection={handleUnitNumberSelection}
        />
        {load && (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleContent;
