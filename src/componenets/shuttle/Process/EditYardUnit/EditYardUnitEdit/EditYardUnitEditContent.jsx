/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setActiveDispatch,
  setActiveDispatchStatus,
  setDelay,
  setEditUnitData,
  setPlantReturnCase,
  setSaveData,
  setSaveDisable,
  setShowUnitActivationScreen,
  setShuttleSave,
  setSpecialCodeSelection,
  setUnitShuttleDelayData,
  setViewDetail,
  setYardSelection,
} from "../../../../../redux/EditYardUnitSlice";
import EditYardUnitService from "../../../../../services/shuttle/process/EditYardUnitService";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import SpecialCodeLookup from "../../../../LookupScreens/SpecialCode/SpecialCodeLookup";
import YardLookup from "../../../../LookupScreens/Yard/YardLookup";
import LoadingIcon from "../../../../common/LoadingIcon";
import { setDispatchID } from "../../../../../redux/UnitActivationSlice";
import { setInvoiceMiles } from "../../../../../redux/OrderEntryFilterSlice";

function EditYardUnitEditContent({ selectedId }) {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  /********************* Local variable declaration starts here ***********************/
  const unitPK = params.id;

  const [unitNumber, setUnitNumber] = useState("");
  const [unitType, setUnitType] = useState("");

  const [specialCodeDetails, setSpecialCodeDetails] = useState([]);
  const [specialCodeFK, setSpecialCodeFK] = useState(null);
  const [specialCodeInput, setSpecialCodeInput] = useState("");

  const [yardDetails, setYardDetails] = useState([]);
  const [yardFK, setYardFK] = useState(null);
  const [yardInput, setYardInput] = useState("");

  const [row, setRow] = useState("");
  const [position, setPosition] = useState("");
  const [GVWR, setGVWR] = useState("");
  const [canadianDelivery, setCanadianDelivery] = useState(false);
  const [PARS, setPARS] = useState("");
  const [delayDisable, setDelayDisable] = useState(false);
  const [notes, setNotes] = useState("");
  const [deliveryAddress1, setDeliveryAddress1] = useState("");
  const [deliveryAddress2, setDeliveryAddress2] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryState, setDeliveryState] = useState("");
  const [deliveryZipCode, setDeliveryZipCode] = useState("");
  const [returnDeliveryCustomerPlant, setReturnDeliveryCustomerPlant] = useState(null);

  const [unitOnHold, setUnitOnHold] = useState(false);
  const [onHoldReason, setOnHoldReason] = useState("");
  const [onHoldAuthorizedBy, setOnHoldAuthorizedBy] = useState("");
  const [onHoldNotes, setOnHoldNotes] = useState("");

  const [unitActivateStatus, setUnitActivateStatus] = useState(false);
  const [eligibleForDelayOrHold, setEligibleForDelayOrHold] = useState(false);
  const [parsVisible, setparsVisible] = useState(false);
  const [unitsData, setUnitsData] = useState(null);

  const [returnToPlant, setReturnToPlant] = useState(false);
  const [invoiceShuttle, setInvoiceShuttle] = useState(false);
  const [roundTrip, setRoundTrip] = useState(false);
  const [returnNotes, setReturnNotes] = useState("");
  const [onHoldData, setOnHoldData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [motorized, setMotorized] = useState(false);
  const [cdlaRequird, setCdlaRequird] = useState(false);

  const [plantToYardTransferPK, setPlantToYardTransferPK] = useState(0);
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [miles, setMiles] = useState(0);
  const [driverAmount, setDriverAmount] = useState(0);
  const [isPlantToYardPresent, setIsPlantToYardPresent] = useState(false);
  const [isCityToYardPresent, setIsCityToYardPresent] = useState(false);
  const [loadingReturnToPlant, setLoadingReturnToPlant] = useState(false);
  const [yardToPlantData, setYardToPlantData] = useState(null);
  const [dispatchStatus, setDispatchStatus] = useState(null);
  const [pickupCustomerPlant, setPickupCustomerPlant] = useState(null);

  /********************* Local variable declaration ends here **********************/

  /********************* Redux variable declaration starts here **********************/
  const unitNumberInput = useSelector((state) => state.editYardUnitsReducer.unitNumberInput);
  const viewDetail = useSelector((state) => state.editYardUnitsReducer.viewDetail);
  const editUnitData = useSelector((state) => state.editYardUnitsReducer.editUnitData);
  const specialCodeSelection = useSelector((state) => state.editYardUnitsReducer.specialCodeSelection);
  const yardSelection = useSelector((state) => state.editYardUnitsReducer.yardSelection);
  const saveData = useSelector((state) => state.editYardUnitsReducer.saveData);
  const activeDispatch = useSelector((state) => state.editYardUnitsReducer.activeDispatch);
  const delay = useSelector((state) => state.editYardUnitsReducer.delay);
  const cancelChanges = useSelector((state) => state.editYardUnitsReducer.cancelChanges);
  const [specialCodeLoading, setSpecialCodeLoading] = useState(false);
  const [yardLoading, setYardLoading] = useState(false);

  /*********************** Redux variable declaration ends here ************************/

  /**
   * Fetch Units By Id function
   **/
  const getUnitsById = (id) => {
    setLoading(true);
    if (id) {
      EditYardUnitService.getUnitsById(id)
        .then((response) => {
          const data = response.data;
          setUnitsData(data);
          dispatch(setActiveDispatchStatus(data?.activeDispatch || false));
          dispatch(setDispatchID(data?.dispatchPK));
          dispatch(setActiveDispatch(data?.activeDispatch || false));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    }
  };

  /**
   * Unit Activation Status
   **/
  const checkUnitActivationStatus = (id) => {
    EditYardUnitService.checkUnitActivationStatus(id)
      .then((response) => {
        const data = response.data;
        setUnitActivateStatus(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Unit Dispatch Status
   **/
  const checkDispatchStatus = (id) => {
    EditYardUnitService.checkDispatchStatus(id)
      .then((response) => {
        const data = response.data;
        setDispatchStatus(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Unit Delay Or Hold Eligibility
   **/
  const checkEligibleForDelayOrHold = (id) => {
    EditYardUnitService.checkEligibleForDelayOrHold(id)
      .then((response) => {
        const data = response.data;
        setEligibleForDelayOrHold(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Units pickup customer plant
   **/
  const fetchPickupCustomerPlant = () => {
    setLoadingReturnToPlant(true);
    EditYardUnitService.fetchPickupCustomerPlant(unitPK)
      .then((response) => {
        const data = response.data;
        setPickupCustomerPlant(data);
        fetchYardToPlantDetails(data);
      })
      .catch((error) => {
        console.log(error);
        setLoadingReturnToPlant(false);
      });
  };

  /**
   * is Pars Visible
   **/
  const isParsVisible = (id) => {
    EditYardUnitService.isParsVisible(id)
      .then((response) => {
        const data = response.data;
        setparsVisible(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Special Code Autocomplete Fetch function
   **/
  const fetchSpecialCodeByName = (string) => {
    setSpecialCodeLoading(true);
    EditYardUnitService.fetchSpecialCodeByName(string)
      .then((response) => {
        const data = response.data.content;
        const specialCodeList = data?.map((code) => ({ ...code, description: code.description?.trim() }));
        setSpecialCodeDetails(specialCodeList);
      })
      .catch((error) => {
        setSpecialCodeLoading(false);
      })
      .finally(() => {
        setSpecialCodeLoading(false);
      });
  };
  /**
   * Special Code Autocomplete Handle function On select
   **/
  const handleDefaultSpecialCodeSelection = (code) => {
    setSpecialCodeFK(code.specialCodePK);
    setSpecialCodeInput(code.description);
  };

  /**
   * Special Code Lookup Show
   **/
  const handleDefaultSpecialCodeLookupModalshow = () => {
    dispatch(setSpecialCodeSelection(true));
  };

  /**
   * Special Code Lookup Handle function On select
   **/
  const handleDefaultSpecialCodeLookupSelection = (code) => {
    setSpecialCodeFK(code.specialCodePK);
    setSpecialCodeInput(code.description);
    dispatch(setSpecialCodeSelection(false));
  };

  /**
   * Special Code Lookup Hide
   **/
  const hideDefaultSpecialCodeModal = () => {
    dispatch(setSpecialCodeSelection(false));
  };

  /**
   * Yard Autocomplete Fetch function
   **/
  const fetchYardByName = (string) => {
    setYardLoading(true);
    EditYardUnitService.fetchYardByName(string)
      .then((response) => {
        const data = response.data.content;
        const yardsList = data?.map((yards) => ({ ...yards, description: yards.description?.trim() }));
        setYardDetails(yardsList);
      })
      .catch((error) => {
        setYardLoading(false);
      })
      .finally(() => {
        setYardLoading(false);
      });
  };

  /**
   * Yard Autocomplete Handle function On select
   **/
  const handleYardSelection = (yard) => {
    setYardFK(yard.yardPK);
    setYardInput(yard.description);
    setReturnToPlant(false);
  };

  /**
   * Yard Lookup Show
   **/
  const handleYardLookupModalshow = () => {
    dispatch(setYardSelection(true));
  };

  /**
   * Yard Lookup Handle function On select
   **/
  const handleYardLookupSelection = (yard) => {
    setYardFK(yard.yardPK);
    setYardInput(yard.description);
    dispatch(setYardSelection(false));
  };

  /**
   * Yard Lookup Hide
   **/
  const hideYardModal = () => {
    dispatch(setYardSelection(false));
  };

  /**
   * Fetch Unit on Hold Details if UnitONHold is set
   **/
  const fetchUnitOnHoldDetails = (unitHoldFK) => {
    if (unitHoldFK !== null) {
      EditYardUnitService.fetchUnitOnHoldDetails(unitHoldFK.unitHoldPK)
        .then((response) => {
          const data = response.data;
          setOnHoldData(data);
          setOnHoldReason(data.reason?.trim());
          setOnHoldAuthorizedBy(data.authorizedBy?.trim());
          setOnHoldNotes(data.notes?.trim());
        })
        .catch((err) => {});
    }
  };

  /********** Intermediate cancel **********/
  const setSavedValues = (unit) => {
    setUnitNumber(unit.unitNumber);
    setUnitType(unit.unitTypeDesc);
    setCanadianDelivery(unit.canadianDelivery);
    setYardFK(unit.pickupYardFK);
    setYardInput(unit.pickupYardName);
    setSpecialCodeFK(unit.specialCodeFK);
    setSpecialCodeInput(unit.specialCodeDesc);
    setRow(unit.pickupYardRow);
    setPosition(unit.pickupYardPosition);
    setGVWR(unit.gvwr != null ? unit.gvwr : "");
    setUnitOnHold(unit.unitOnHold);
    setOnHoldReason(unit.onHoldReason);
    setOnHoldAuthorizedBy(unit.onHoldAuthorizedBy);
    setOnHoldNotes(unit.onHoldNotes);
    setDelay(unit.delay);

    setNotes(unit.delayDispatchReason);
    setDeliveryAddress1(unit.deliveryAddress1);
    setDeliveryAddress2(unit.deliveryAddress2);
    setDeliveryCity(unit.deliveryCity);
    setDeliveryState(unit.deliveryState);
    setDeliveryZipCode(unit.deliveryZipCode);
    setPARS(unit.pars);
  };

  /********** Used for Browser back **********/
  useEffect(() => {
    dispatch(setViewDetail(true));
    dispatch(setDelay("none"));
    dispatch(setUnitShuttleDelayData(null));
    dispatch(setSaveData(null));
    dispatch(setSaveDisable(true));
    dispatch(setShuttleSave(false));
    dispatch(setShowUnitActivationScreen(false));
    setReturnToPlant(false);
    setDelayDisable(false);
    dispatch(setActiveDispatch(false));
  }, []);

  useEffect(() => {
    setReturnToPlant(false);
  }, [viewDetail]);

  useEffect(() => {
    setInvoiceShuttle(false);
    setRoundTrip(false);
    setReturnNotes("");
  }, [returnToPlant]);

  /********** If no Id Disable Edit **********/
  useEffect(() => {
    if (params.id === undefined) dispatch(setViewDetail(false));
  }, [params.id]);

  /********** If selected unit, fetch unit details and activation status **********/
  useEffect(() => {
    if (editUnitData !== null) {
      getUnitsById(editUnitData?.unitPK);
      checkUnitActivationStatus(editUnitData?.unitPK);
      checkEligibleForDelayOrHold(editUnitData?.unitPK);
      isParsVisible(editUnitData?.unitPK);
      checkDispatchStatus(editUnitData?.unitPK);
    }
  }, [editUnitData]);

  /********** set unit details from either saveData or unitsData **********/
  useEffect(() => {
    if (saveData && !viewDetail) {
      setSavedValues(saveData);
    } else if (unitsData != null) {
      setUnitNumber(unitsData.unitNumber != null ? unitsData.unitNumber?.trim() : "");
      unitsData.unitTypeFK != null
        ? setUnitType(unitsData.unitTypeFK.descriptionShort?.trim())
        : setUnitType("");
      if (unitsData.specialCodeFK != null) {
        setSpecialCodeFK(unitsData.specialCodeFK.specialCodePK);
        setSpecialCodeInput(unitsData.specialCodeFK.description?.trim());
      } else {
        setSpecialCodeFK(null);
        setSpecialCodeInput("");
      }
      if (unitsData.pickupYardFK != null) {
        setYardFK(unitsData.pickupYardFK.yardPK);
        setYardInput(unitsData.pickupYardFK.description?.trim());
      } else {
        setYardFK(null);
        setYardInput("");
      }
      setRow(unitsData.pickupYardRow != null ? unitsData.pickupYardRow : "");
      setPosition(unitsData.pickupYardPosition != null ? unitsData.pickupYardPosition : "");
      setGVWR(unitsData.gvwr != null ? unitsData.gvwr : "");
      if (unitsData.canadianDelivery != null && unitsData.canadianDelivery) {
        setCanadianDelivery(true);
      }
      if (unitsData.delayDispatch) {
        dispatch(setDelay("activation"));
        setNotes(unitsData.delayDispatchReason);
      } else if (unitsData.unitOnShuttleDelay) {
        dispatch(setDelay("shuttle"));
        if (unitsData.unitShuttleDelayFK) {
          dispatch(setUnitShuttleDelayData(unitsData.unitShuttleDelayFK));
        }
      } else if (unitsData.underDelay) {
        dispatch(setDelay("dispatch"));
        setDelayDisable(true);
      } else {
        dispatch(setDelay("none"));
      }
      setDeliveryAddress1(
        unitsData.unitDeliveryAddress1 != null ? unitsData.unitDeliveryAddress1?.trim() : ""
      );
      setDeliveryAddress2(
        unitsData.unitDeliveryAddress2 != null ? unitsData.unitDeliveryAddress2?.trim() : ""
      );
      setDeliveryCity(unitsData.unitDeliveryCity != null ? unitsData.unitDeliveryCity?.trim() : "");
      setDeliveryState(unitsData.unitDeliveryState != null ? unitsData.unitDeliveryState?.trim() : "");
      setDeliveryZipCode(unitsData.unitDeliveryZipCode != null ? unitsData.unitDeliveryZipCode?.trim() : "");
      setReturnDeliveryCustomerPlant(
        unitsData.pickupCustomerPlantFk != null ? unitsData.pickupCustomerPlantFk : null
      );
      setMotorized(unitsData.motorized != null ? unitsData.motorized : false);
      setCdlaRequird(unitsData.cdlaRequird != null ? unitsData.cdlaRequird : false);
      setUnitOnHold(unitsData.unitOnHold != null ? unitsData.unitOnHold : false);
      if (unitsData.unitOnHold === true && unitsData.unitHoldFK) {
        fetchUnitOnHoldDetails(unitsData.unitHoldFK);
      }
      setPARS(unitsData.pars);
      ///returned and PARS set from backend pending/////
    }
  }, [viewDetail, unitsData]);

  /********** set saveData and Save Enable **********/
  useEffect(() => {
    // set saveData
    dispatch(
      setSaveData({
        unitPK: unitPK,
        unitNumber: unitNumberInput,
        unitTypeDesc: unitType,
        canadianDelivery: canadianDelivery,
        pickupYardFK: yardFK,
        pickupYardName: yardInput,
        specialCodeFK: specialCodeFK,
        specialCodeDesc: specialCodeInput,
        pickupYardRow: row,
        pickupYardPosition: position,
        gvwr: GVWR,
        unitOnHold: unitOnHold,
        onHoldReason: onHoldReason,
        onHoldAuthorizedBy: onHoldAuthorizedBy,
        onHoldNotes: onHoldNotes,
        delay: delay,
        delayDispatchReason: notes,
        deliveryAddress1: deliveryAddress1,
        deliveryAddress2: deliveryAddress2,
        deliveryCity: deliveryCity,
        deliveryState: deliveryState,
        deliveryZipCode: deliveryZipCode,
        pars: PARS,
        returnedToPlant: returnToPlant,
        invoiceShuttle: invoiceShuttle,
        roundTrip: roundTrip,
        returnToPlantNotes: returnNotes,
        deliveryCustomerPlantIntFK: pickupCustomerPlant,
        motorized: motorized,
        cdlaRequird: cdlaRequird,
        invoiceAmount,
        driverAmount,
        isCityToYardPresent,
        isPlantToYardPresent,
        miles,
        plantToYardTransferPK,
      })
    );

    // set save enable / disable
    if (
      unitPK !== null &&
      row !== "" &&
      (!parsVisible || (parsVisible && PARS && PARS?.trim().length === 7)) &&
      (delay === "activation" ? notes !== "" : true) &&
      (unitOnHold ? onHoldReason !== "" && onHoldAuthorizedBy !== "" && onHoldNotes !== "" : true) &&
      (specialCodeInput !== "" ? specialCodeFK !== null : true) &&
      yardFK !== null &&
      (!returnToPlant ||
        (returnToPlant &&
          returnNotes !== "" &&
          parseFloat(invoiceAmount) > 0.0 &&
          miles > 0 &&
          parseFloat(driverAmount) > 0.0 &&
          driverAmount !== "." &&
          !/^\d*\.$/.test(driverAmount) &&
          invoiceAmount !== "." &&
          !/^\d*\.$/.test(invoiceAmount) &&
          parseInt(miles) > 0 &&
          parseInt(miles) <= 32767 &&
          miles !== "" &&
          miles !== null &&
          miles !== undefined))
    ) {
      dispatch(setSaveDisable(false));
    } else {
      dispatch(setSaveDisable(true));
    }
  }, [
    GVWR,
    canadianDelivery,
    delay,
    notes,
    onHoldAuthorizedBy,
    onHoldNotes,
    onHoldReason,
    row,
    specialCodeFK,
    unitOnHold,
    unitPK,
    yardFK,
    yardInput,
    specialCodeInput,
    unitNumberInput,
    position,
    deliveryAddress1,
    deliveryAddress2,
    deliveryCity,
    deliveryState,
    deliveryZipCode,
    unitType,
    returnToPlant,
    PARS,
    invoiceShuttle,
    returnNotes,
    roundTrip,
    invoiceAmount,
    miles,
    driverAmount,
  ]);

  useEffect(() => {
    if (!unitOnHold) {
      setOnHoldReason("");
      setOnHoldAuthorizedBy("");
      setOnHoldNotes("");
    } else {
      if (onHoldData) {
        setOnHoldReason(onHoldData.reason?.trim());
        setOnHoldAuthorizedBy(onHoldData.authorizedBy?.trim());
        setOnHoldNotes(onHoldData.notes?.trim());
      }
    }
  }, [unitOnHold]);

  useEffect(() => {
    if (delay === "activation") {
      if (unitsData) setNotes(unitsData.delayDispatchReason || "");
    }
  }, [delay]);

  /**
   * If no selected unit navigate to Unit selection screen.
   * Calls when page is refreshed.
   **/
  useEffect(() => {
    if (editUnitData === null || editUnitData === undefined || editUnitData.length === 0) {
      navigate("/edit-yard-unit-selection");
    }
  }, [editUnitData]);

  useEffect(() => {
    if (!returnToPlant) {
      setInvoiceShuttle(false);
      setRoundTrip(false);
      setReturnNotes("");
    }
  }, [returnToPlant]);

  useEffect(() => {
    if (yardFK === null) {
      setReturnToPlant(false);
    }
  }, [yardFK]);

  const fetchYardToPlantDetails = (data) => {
    EditYardUnitService.fetchYardToPlantDetails(yardFK, data, motorized, roundTrip, cdlaRequird)
      .then((response) => {
        const data = response.data;
        setYardToPlantData(response.data);
        setInvoiceAmount(data.invoiceAmount);
        setDriverAmount(data.driverAmount);
        setMiles(data.miles);
        setIsCityToYardPresent(data.isCityToYardPresent);
        setIsPlantToYardPresent(data.isPlantToYardPresent);
        setLoadingReturnToPlant(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //If return to plant is true, fetch details
  useEffect(() => {
    if (returnToPlant) {
      fetchPickupCustomerPlant();
      dispatch(setPlantReturnCase(true));
    } else {
      dispatch(setPlantReturnCase(false));
      setInvoiceAmount(0);
      setInvoiceMiles(0);
      setDriverAmount(0);
    }
  }, [returnToPlant, roundTrip]);

  useEffect(() => {
    if (cancelChanges) {
      setReturnToPlant(false);
      dispatch(setActiveDispatch(unitsData?.activeDispatch || false));
    }
  }, [cancelChanges]);

  useEffect(() => {
    if (!invoiceShuttle) {
      setRoundTrip(false);
    }
  }, [invoiceShuttle]);

  const handleChange = (e) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^0-9]/g, "");
    setGVWR(sanitizedValue);
  };

  return (
    <div className="p-2">
      {(loading || loadingReturnToPlant) && <LoadingIcon />}
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <Row className="p-15 ">
          <Col xs={6}>
            {/* Unit Number */}
            <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0 mb-3">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label me-4">
                  Unit Number
                </Form.Label>
              </Col>
              <Col xs={3} /* md={3} sm={3} */ className="p-0">
                <input
                  className="customFormControl"
                  id="unitNumber"
                  name="unitNumber"
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitNumber}
                  disabled
                  readOnly
                />
              </Col>
            </Form.Group>

            {/* Unit Type */}
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label me-4">
                  Unit Type
                </Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  className="customFormControl"
                  id="unitType"
                  name="unitType"
                  type="text"
                  maxLength={30}
                  value={unitType}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                  readOnly
                />
              </Col>
            </Form.Group>

            {/* Special Code */}
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
              <Col xs={3} sm={3} className="p-0 text-start">
                <Form.Label className="col-form-label me-4">Special Code</Form.Label>
              </Col>
              <Col xs={5} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={specialCodeDetails}
                  searchString={specialCodeInput}
                  customFormatSearchString={(searchString) => searchString}
                  renderItemId={(code) => code.specialCodePK}
                  renderItemField={(code) => code.description}
                  selectedId={specialCodeFK}
                  handleSearchString={(string) => setSpecialCodeInput(string)}
                  fetchDataBySearchString={fetchSpecialCodeByName}
                  onSelect={handleDefaultSpecialCodeSelection}
                  loading={specialCodeLoading}

                  clearInputCallback={() => {
                    setSpecialCodeFK(null);
                  }}
                  disabled={viewDetail}
                  className={`${!specialCodeFK && specialCodeInput !== "" ? "borderRed" : ""}`}
                />
                <LookupButton onClick={handleDefaultSpecialCodeLookupModalshow} disabled={viewDetail} />
              </Col>
            </Form.Group>

            {/* Yard */}
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
              <Col xs={3} sm={3} className="p-0 text-start">
                <Form.Label className="col-form-label me-4">Yard</Form.Label>
              </Col>
              <Col xs={5} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={yardDetails}
                  searchString={yardInput}
                  customFormatSearchString={(searchString) => searchString}
                  renderItemId={(yard) => yard.yardPK}
                  renderItemField={(yard) => yard.description}
                  handleSearchString={(string) => setYardInput(string)}
                  fetchDataBySearchString={fetchYardByName}
                  onSelect={handleYardSelection}
                  loading={yardLoading}
                  selectedId={yardFK}
                  clearInputCallback={() => {
                    setYardFK(null);
                  }}
                  disabled={viewDetail}
                  className={`${viewDetail ? "" : !yardFK || yardInput === "" ? "borderRed" : "borderGreen"}`}
                />
                <LookupButton onClick={handleYardLookupModalshow} disabled={viewDetail} />
              </Col>
            </Form.Group>

            {/* Row / Position */}
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label me-4">
                  Row / Position
                </Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0">
                <input
                  name="row"
                  type="text"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled={viewDetail}
                  value={row}
                  onChange={(e) => {
                    // Regex pattern for 4-bit characters (letters and numbers)
                    if (/^[a-zA-Z0-9]{0,4}$/.test(e.target.value)) {
                      setRow(e.target.value);
                    } else {
                      // Remove special characters from the input value
                      const sanitizedValue = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                      e.target.value = sanitizedValue;
                    }
                  }}
                  className={`customFormControl ${
                    !viewDetail ? (row === "" || row === null ? "borderRed" : "borderGreen") : ""
                  }`}
                  style={{ width: "60px" }}
                />
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 ms-3">
                <input
                  className="customFormControl"
                  name="position"
                  type="text"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={position}
                  disabled={viewDetail}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Regex pattern for 4-bit characters (letters and numbers)
                    const regex = /^[a-zA-Z0-9]{0,4}$/;
                    if (regex.test(value)) {
                      setPosition(e.target.value);
                    } else {
                      // Remove special characters from the input value
                      const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, "");
                      e.target.value = sanitizedValue;
                    }
                  }}
                  style={{ width: "60px" }}
                />
              </Col>
            </Form.Group>
            {/* GVWR */}
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label me-4">
                  GVWR
                </Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0  w-68px">
                <input
                  className="customFormControl"
                  name="GVWR"
                  type="text"
                  maxLength={9}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={GVWR}
                  disabled={viewDetail}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            {/* PARS */}
            <Form.Group
              className={`form-group align-items-center row m-l-0 m-r-0 mb-3 
          ${parsVisible ? "" : "hide-elements"}`}
            >
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label me-4">
                  PARS
                </Form.Label>
              </Col>
              <div className="p-0 w-80px">
                <input
                  className={`customFormControl ${
                    viewDetail
                      ? ""
                      : !parsVisible && !viewDetail
                        ? ""
                        : PARS === "" || PARS === null || PARS.length < 7
                          ? "borderRed"
                          : ""
                  }`}
                  id="pars"
                  name="pars"
                  type="text"
                  maxLength={7}
                  value={PARS}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled={viewDetail}
                  onInput={(e) => setPARS(e.target.value)}
                />
              </div>
            </Form.Group>

            {/* Active Dispatch */}
            <Form.Group
              className={` form-group align-items-center row m-l-0 m-r-0 mb-3 ${
                !viewDetail ? "" : "hide-elements"
              }`}
            >
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label me-4">
                  Active Dispatch
                </Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="activeDispatch"
                  disabled={
                    viewDetail ||
                    unitOnHold ||
                    delay === "shuttle" ||
                    delay === "dispatch" ||
                    delay === "activation" ||
                    !unitActivateStatus
                  }
                  name="activeDispatch"
                  value={activeDispatch}
                  onChange={(event) => {
                    dispatch(setActiveDispatch(event.target.checked));
                  }}
                  checked={activeDispatch}
                />
              </Col>
            </Form.Group>

            {/* Delay */}
            <Form.Group className={`form-group align-items-center row m-l-0 m-r-0 mb-3`}>
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className={` col-form-label  dealer-label`}>Delay</Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
                <div className="d-flex w-80px  me-4 align-items-center">
                  <input
                    type="radio"
                    name="none"
                    id="none"
                    checked={delay === "none"}
                    onChange={(e) => {
                      dispatch(setDelay("none"));
                      setNotes("");
                      setDelayDisable(false);
                    }}
                    disabled={
                      viewDetail || activeDispatch || unitOnHold || delayDisable || !eligibleForDelayOrHold
                    }
                  />{" "}
                  <label className="ms-2" htmlFor="none">
                    None
                  </label>{" "}
                </div>
                <div className="d-flex w-80px me-4 align-items-center">
                  <input
                    type="radio"
                    name="activation"
                    id="activation"
                    checked={delay === "activation"}
                    onChange={(e) => {
                      dispatch(setDelay("activation"));
                      setUnitOnHold(false);
                      setNotes("");
                    }}
                    disabled={
                      viewDetail || activeDispatch || unitOnHold || delayDisable || !eligibleForDelayOrHold
                    }
                  />{" "}
                  <label className="ms-2" htmlFor="activation">
                    Activation
                  </label>{" "}
                </div>
                <div className={`d-flex w-80px me-3 align-items-center}`}>
                  <input
                    type="radio"
                    name="shuttle"
                    id="shuttle"
                    checked={delay === "shuttle"}
                    onChange={(e) => {
                      dispatch(setDelay("shuttle"));
                      setUnitOnHold(false);
                      setNotes("");
                    }}
                    disabled={
                      viewDetail || activeDispatch || unitOnHold || delayDisable || !eligibleForDelayOrHold
                    }
                  />{" "}
                  <label className="ms-2" htmlFor="shuttle">
                    Shuttle
                  </label>{" "}
                </div>
                <div className={`d-flex w-80px align-items-center}`}>
                  <input
                    type="radio"
                    name="dispatch"
                    id="dispatch"
                    checked={delay === "dispatch"}
                    onChange={(e) => {
                      dispatch(setDelay("dispatch"));
                      setUnitOnHold(false);
                      setNotes("");
                    }}
                    disabled={
                      viewDetail || activeDispatch || unitOnHold || delayDisable || !eligibleForDelayOrHold
                    }
                  />{" "}
                  <label className="ms-2" htmlFor="dispatch">
                    Dispatch
                  </label>{" "}
                </div>
              </Col>
            </Form.Group>

            {/* Notes */}
            <Form.Group
              className={`form-group align-items-start row m-l-0 m-r-0 mb-3
                ${
                  (viewDetail && delay === "activation") || (!viewDetail && delay === "activation")
                    ? ""
                    : "hide-elements"
                }`}
            >
              <Col xs={3} className="p-0">
                <Form.Label htmlFor="notes" className="col-form-label dealer-label">
                  Notes
                </Form.Label>
              </Col>
              <div className="p-0 col-8">
                <textarea
                  className={` customFormControl customFocusClass w-100 h-100px ${
                    viewDetail ? "" : notes === "" ? "borderRed" : "borderGreen"
                  }`}
                  type="text"
                  id="notes"
                  autoComplete="off"
                  aria-autocomplete="list"
                  maxLength={65535}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value.trimStart())}
                  disabled={viewDetail}
                />
              </div>
            </Form.Group>
          </Col>
          <Col xs={6} md={6} sm={6}>
            {/* Delivery */}
            <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0 mb-3">
              <Col sm={3} md={3} xs={3} className="ps-0">
                <Form.Label htmlFor="name" className="col-form-label me-4">
                  Delivery
                </Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0">
                <input
                  className="customFormControl"
                  id="ad1"
                  name="ad1"
                  type="text"
                  maxLength={30}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  disabled
                  value={deliveryAddress1}
                  readOnly
                  spellCheck={false}
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label me-4"></Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className=" p-0">
                <input
                  className="customFormControl"
                  id="ad2"
                  name="ad2"
                  type="text"
                  maxLength={30}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  disabled
                  value={deliveryAddress2}
                  readOnly
                  spellCheck={false}
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label me-4"></Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0">
                <input
                  className="customFormControl"
                  id="deliveryZipCode"
                  name="deliveryZipCode"
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                  value={deliveryZipCode + ",  " + deliveryCity}
                  readOnly
                />
                {"    "}
              </Col>
              <Col className=" p-0 ">
                <input
                  className="w-40px  ms-3 customFormControl"
                  id="deliveryState"
                  name="deliveryState"
                  type="text"
                  aria-autocomplete="list"
                  disabled
                  value={deliveryState}
                />
              </Col>
            </Form.Group>
            <Form.Group
              className={`form-group row align-items-center m-l-0 m-r-0 mb-3 ${viewDetail || dispatchStatus || !yardFK ? "hide-elements" : ""}`}
            >
              <div className="d-flex flex-wrap align-items-center w-100 gap-3">
                {/* Return To Plant */}
                <div className="d-flex align-items-center" style={{ marginLeft: "-12px" }}>
                  <Form.Label htmlFor="returnToPlant" className="col-form-label me-2 mb-0">
                    Return To Plant
                  </Form.Label>
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="returnToPlant"
                    disabled={viewDetail}
                    name="returnToPlant"
                    value={returnToPlant}
                    onChange={(event) => {
                      setReturnToPlant(event.target.checked);
                    }}
                    checked={returnToPlant}
                  />
                </div>

                {/* Invoice Amount */}
                <div
                  className={`d-flex align-items-center me-3 ${!viewDetail && returnToPlant ? "" : "hide-elements"}`}
                >
                  <Form.Label className="col-form-label me-2 mb-0">Invoice Amount</Form.Label>
                  <input
                    className={`customFormControl ${
                      !viewDetail || !returnToPlant
                        ? isPlantToYardPresent && yardToPlantData?.invoiceAmount > 0
                          ? ""
                          : parseFloat(invoiceAmount) <= 0.0 ||
                              invoiceAmount === "." ||
                              /^\d*\.$/.test(invoiceAmount) ||
                              !invoiceAmount
                            ? "borderRed"
                            : "borderGreen"
                        : ""
                    }`}
                    style={{ width: "50px" }}
                    name="GVWR"
                    type="text"
                    maxLength={8}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={invoiceAmount}
                    disabled={
                      viewDetail ||
                      !returnToPlant ||
                      (isPlantToYardPresent && yardToPlantData?.invoiceAmount > 0)
                    }
                    onInput={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setInvoiceAmount(e.target.value);
                    }}
                  />
                </div>

                {/* Driver Amount */}
                <div
                  className={`d-flex align-items-center me-3 ${!viewDetail && returnToPlant ? "" : "hide-elements"}`}
                >
                  <Form.Label className="col-form-label me-2 mb-0">Driver Amount</Form.Label>
                  <input
                    className={`customFormControl ${
                      !viewDetail || !returnToPlant
                        ? isCityToYardPresent && yardToPlantData?.driverAmount > 0
                          ? ""
                          : parseFloat(driverAmount) <= 0.0 ||
                              driverAmount === "." ||
                              /^\d*\.$/.test(driverAmount) ||
                              !driverAmount
                            ? "borderRed"
                            : "borderGreen"
                        : ""
                    }`}
                    style={{ width: "60px" }}
                    name="GVWR"
                    type="text"
                    maxLength={8}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={driverAmount}
                    disabled={
                      viewDetail ||
                      !returnToPlant ||
                      (isCityToYardPresent && yardToPlantData?.driverAmount > 0)
                    }
                    onInput={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setDriverAmount(e.target.value);
                    }}
                  />
                </div>

                {/* Miles */}
                <div
                  className={`d-flex align-items-center me-3 ${!viewDetail && returnToPlant ? "" : "hide-elements"}`}
                >
                  <Form.Label className="col-form-label me-2 mb-0">Miles</Form.Label>
                  <input
                    className={`customFormControl ${
                      !viewDetail || !returnToPlant
                        ? isPlantToYardPresent && yardToPlantData?.miles > 0
                          ? ""
                          : parseInt(miles) < 1 ||
                              parseInt(miles) > 32767 ||
                              miles === "" ||
                              miles === null ||
                              miles === undefined
                            ? "borderRed"
                            : "borderGreen"
                        : ""
                    }`}
                    style={{ width: "50px" }}
                    name="GVWR"
                    type="text"
                    maxLength={5}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={miles}
                    disabled={
                      viewDetail || !returnToPlant || (isPlantToYardPresent && yardToPlantData?.miles > 0)
                    }
                    onInput={(e) => {
                      setMiles(e.target.value.replace(/[^\d]/g, ""));
                    }}
                  />
                </div>
              </div>
            </Form.Group>

            <Form.Group
              className={`form-group align-items-center row m-l-0 m-r-0 mb-3 ${!viewDetail && returnToPlant ? "" : "hide-elements"}`}
            >
              {/* Invoice Shuttle */}
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label className={` col-form-label me-4`}>Invoice Shuttle</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className={`p-0 d-flex`}>
                <Col className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    className={`form-check-input p-0`}
                    id="invoiceShuttle"
                    disabled={viewDetail}
                    name="invoiceShuttle"
                    value={invoiceShuttle}
                    onChange={(event) => {
                      setInvoiceShuttle(event.target.checked);
                    }}
                    checked={invoiceShuttle}
                  />
                </Col>

                {/* Round Trip */}
                <Col className="d-flex align-items-center">
                  <Form.Label className={` col-form-label me-6`}>Round Trip</Form.Label>
                </Col>
                <Col className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="roundTrip"
                    disabled={viewDetail || !invoiceShuttle}
                    name="roundTrip"
                    value={roundTrip}
                    onChange={(event) => {
                      setRoundTrip(event.target.checked);
                    }}
                    checked={roundTrip}
                  />
                </Col>
              </Col>
            </Form.Group>

            {/* Notes */}
            <Form.Group
              className={`form-group align-items-start row m-l-0 m-r-0 mb-3 ${!viewDetail && returnToPlant ? "" : "hide-elements"}`}
            >
              <Col xs={3} className="p-0 ">
                <Form.Label htmlFor="notes" className="col-form-label dealer-label">
                  Notes
                </Form.Label>
              </Col>

              <div className="p-0 col-8">
                <textarea
                  className={`customFormControl customFocusClass w-100 h-100px ${
                    !viewDetail
                      ? returnToPlant
                        ? //retaining for future referance && invoiceShuttle
                          returnNotes === ""
                          ? "borderRed"
                          : "borderGreen"
                        : ""
                      : ""
                  }`}
                  type="text"
                  id="notes"
                  autoComplete="off"
                  aria-autocomplete="list"
                  maxLength={65535}
                  value={returnNotes}
                  onChange={(e) => setReturnNotes(e.target.value)}
                  disabled={viewDetail}
                />
              </div>
            </Form.Group>

            {/* Hold */}
            <Form.Group>
              <Form.Group className="form-group align-items-start row m-l-0 m-r-0 mb-3">
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label className=" col-form-label me-4">Hold</Form.Label>
                </Col>
                <Col xs={7} md={5} sm={7} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="unitOnHold"
                    disabled={viewDetail || activeDispatch || delay !== "none" || !eligibleForDelayOrHold}
                    name="unitOnHold"
                    value={unitOnHold}
                    onChange={(event) => {
                      setUnitOnHold(event.target.checked);
                    }}
                    checked={unitOnHold}
                  />
                </Col>
              </Form.Group>

              {/* Reason */}
              <Form.Group
                className={`form-group align-items-center row m-l-0 m-r-0 mb-3 
          ${unitOnHold ? "" : "hide-elements"}`}
              >
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Reason
                  </Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    className={`customFormControl ${
                      !viewDetail ? (unitOnHold && onHoldReason === "" ? "borderRed" : "borderGreen") : ""
                    }`}
                    id="name"
                    name="name"
                    type="text"
                    value={onHoldReason}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled={viewDetail}
                    onInput={(e) => setOnHoldReason(e.target.value)}
                  />
                </Col>
              </Form.Group>

              {/* Authorized By */}
              <Form.Group
                className={`form-group align-items-center row m-l-0 m-r-0 mb-3 
          ${unitOnHold ? "" : "hide-elements"}`}
              >
                <Col sm={3} md={3} xs={3} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Authorized By
                  </Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    className={`customFormControl ${
                      !viewDetail
                        ? unitOnHold && onHoldAuthorizedBy === ""
                          ? "borderRed"
                          : "borderGreen"
                        : ""
                    }`}
                    id="name"
                    name="name"
                    type="text"
                    maxLength={30}
                    value={onHoldAuthorizedBy}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled={viewDetail}
                    onInput={(e) => setOnHoldAuthorizedBy(e.target.value)}
                  />
                </Col>
              </Form.Group>

              {/* Notes */}
              <Form.Group
                className={`form-group align-items-start row m-l-0 m-r-0 ${unitOnHold ? "" : "hide-elements"}`}
              >
                <Col xs={3} className="p-0 ">
                  <Form.Label htmlFor="notes" className="col-form-label dealer-label">
                    Notes
                  </Form.Label>
                </Col>
                <div className="p-0 col-8">
                  <textarea
                    className={`customFormControl w-100 h-100px ${
                      viewDetail ? "" : unitOnHold && onHoldNotes === "" ? "borderRed" : "borderGreen"
                    }`}
                    type="text"
                    id="notes"
                    autoComplete="off"
                    aria-autocomplete="list"
                    maxLength={65535}
                    value={onHoldNotes}
                    onChange={(e) => setOnHoldNotes(e.target.value)}
                    disabled={viewDetail}
                  />
                </div>
              </Form.Group>
            </Form.Group>
          </Col>
        </Row>
        {/* Special Code Lookup Modal */}
        <SpecialCodeLookup
          show={specialCodeSelection}
          onHide={hideDefaultSpecialCodeModal}
          renderItemId={(code) => code.specialCodePK}
          handleLookupSelection={handleDefaultSpecialCodeLookupSelection}
          MaintenanceProgram
        />
        <YardLookup
          show={yardSelection}
          onHide={hideYardModal}
          renderItemId={(yard) => yard.yardPK}
          handleLookupSelection={handleYardLookupSelection}
          EditYardUnit
        />
      </div>
    </div>
  );
}
export default EditYardUnitEditContent;
