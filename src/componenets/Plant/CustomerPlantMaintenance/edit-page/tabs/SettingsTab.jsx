import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RadioGroup, Radio } from "react-radio-group";
import { useParams, useNavigate } from "react-router-dom";
import {
  setSettingReloadDays,
  setPlantFormData,
  setSettingInvoiceDpuPickupFee,
  setSettingMotorized,
  setSettingTowable,
  setSettingLongUnitRestriction,
  setSettingLongUnitRestrictionUnits,
  setSettingLongUnitRateUnits,
  setSettingLongUnitRate,
  setSettingLongUnitRateDescription,
  setShowUnitTypeGroupLookup,
  setUnitTypeGroupInput,
  setUnitTypeGroupFK,
  setShowPlantGroupLookup,
  setPlantGroupInput,
  setPlantGroupFK,
  setPlantLogin,
  setPlantPassword,
  setSettingInvoiceDpuPickup,
  setQualifyingUnitTypeGroupInput,
  setQualifyingUnitTypeGroupId,
  setCheckPlantCode,
  setSettingsisterPlantCode,
  setOutbound,
  setIsSettingLongUnitLoading,
  setIsSettingPlantLoading,
  setIsSettingQualifyingLongLoading,
} from "../../../../../redux/CustomerPlantMaintenanceSlice";
import CustomerPlantMaintenanceService from "../../../../../services/CustomerPlantMaintenanceService";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import UnitTypeGroupLookup from "../../../../LookupScreens/UnitTypeGroup/UnitTypeGroupLookup";
import PlantGroupLookup from "../../../../LookupScreens/PlantGroup/PlantGroupLookup";
import LookupButton from "../../../../common/LookupButton";
const SettingsTab = () => {
  const [plantPK, setPlantPK] = useState("");
  const [incompletePlantPK, setIncompletePlantPK] = useState("");
  const [motorized, setMotorized] = useState(false);
  const [radioValue, setRadioValue] = useState("motorized");
  const [towable, setTowable] = useState(false);
  const [plantNumber, setPlantNumber] = useState("");
  const [freezePOE, setFreezePOE] = useState(false);
  const [reloadDays, setReloadDays] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [dpuPickup, setDpuPickup] = useState(false);
  const [dpuPickupFee, setDpuPickupFee] = useState("");
  const [dpuInstructions, setDpuInstructions] = useState("");
  const [longUnitRestriction, setLongUnitRestriction] = useState(false);
  const [longUnitRestrictionUnits, setLongUnitRestrictionUnits] = useState("");
  const [longUnitRateUnits, setLongUnitRateUnits] = useState("");
  const [longUnitRate, setLongUnitRate] = useState("");
  const [longUnitRateDescription, setLongUnitRateDescription] = useState("");
  const [plantGroups, setPlantGroups] = useState("");
  const [longUnitUnitTypeGroup, setLongUnitUnitTypeGroup] = useState("");
  const [sisterPlantCode, setSisterPlantCode] = useState("");
  const [message, setMessage] = useState(true);
  const [UnitTypeGroupData, setUnitTypeGroupData] = useState([]);
  const [UnitTypeGroupArray, setUnitTypeGroupArray] = useState([]);
  const [plantGroupData, setPlantGroupData] = useState([]);
  const [promptDPUOwner, setPromptDPUOwner] = useState(false);
  const [restrictedDispatch, setRestrictedDispatch] = useState(false);
  const [plantGroupLoading, setPlantGroupLoading] = useState(false);
  const [qualifyingUnitTypeGroupLoading, setQualifyingUnitTypeGroupLoading] = useState(false);
  const [unitTypeGroupLoading, setUnitTypeGroupLoading] = useState(false);
  const outbound = useSelector((state) => state.customerPlantmaintanceReducer.outbound);

  //const [inputType, setInputType] = useState('text');
  const [showQualifyingUnitTypeGroupLookup, setShowQualifyingUnitTypeGroupLookup] = useState(false);
  const [qualifyingUnitTypeGroup, setQualifyingUnitTypeGroup] = useState("");
  const params = useParams();
  const customerId = params.customerId;

  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);
  const editPlantData = useSelector((state) => state.customerPlantmaintanceReducer.editPlantData);

  const showUnitTypeGroupLookup = useSelector(
    (state) => state.customerPlantmaintanceReducer.showUnitTypeGroupLookup
  );
  const unitTypeGroupInput = useSelector((state) => state.customerPlantmaintanceReducer.unitTypeGroupInput);
  const showPlantGroupLookup = useSelector(
    (state) => state.customerPlantmaintanceReducer.showPlantGroupLookup
  );

  const plantGroupInput = useSelector((state) => state.customerPlantmaintanceReducer.plantGroupInput);
  const qualifyingUnitTypeGroupInput = useSelector(
    (state) => state.customerPlantmaintanceReducer.qualifyingUnitTypeGroupInput
  );

  const checkPlantCode = useSelector((state) => state.customerPlantmaintanceReducer.checkPlantCode);
  const isCustomerPlantLoading = useSelector(
    (state) => state.customerPlantmaintanceReducer.isCustomerPlantLoading
  );

  // set value for unit type group
  const setLongUnitTypeGroupInput = (id) => {
    if (id != null) {
      dispatch(setIsSettingLongUnitLoading(true));
      CustomerPlantMaintenanceService.getUnittypeGroupsById(id)
        .then((response) => {
          const data = response.data;
          dispatch(setUnitTypeGroupInput(data.description?.trim()));
          dispatch(setIsSettingLongUnitLoading(false));
        })
        .catch((err) => {
          dispatch(setIsSettingLongUnitLoading(false));
        });
    } else {
      dispatch(setUnitTypeGroupInput(""));
    }
  };
  //set value for plant group
  const setPlantGroupValue = (id) => {
    if (id != null) {
      dispatch(setIsSettingPlantLoading(true));
      CustomerPlantMaintenanceService.getPlantGroupById(id)
        .then((response) => {
          const data = response.data;
          dispatch(setPlantGroupInput(data.description?.trim()));
          dispatch(setIsSettingPlantLoading(false));
        })
        .catch((err) => {
          dispatch(setIsSettingPlantLoading(false));
        });
    } else {
      dispatch(setPlantGroupInput(""));
    }
  };
  // set value for unit type group
  const setQualifyingUnitTypeGroupValue = (id) => {
    if (id != null) {
      dispatch(setIsSettingQualifyingLongLoading(true));
      CustomerPlantMaintenanceService.getUnittypeGroupsById(id)
        .then((response) => {
          const data = response.data;
          dispatch(setQualifyingUnitTypeGroupInput(data.description?.trim()));
          dispatch(setIsSettingQualifyingLongLoading(false));
        })
        .catch((err) => {
          dispatch(setIsSettingQualifyingLongLoading(false));
        });
    } else {
      dispatch(setQualifyingUnitTypeGroupInput(""));
    }
  };
  useEffect(() => {
    if (editPlantData != null) {
      if (null != editPlantData.incompleteCustomerPlantPK) {
        setIncompletePlantPK(editPlantData.incompleteCustomerPlantPK);
      } else if (null != editPlantData.customerPlantPK) {
        setPlantPK(editPlantData.customerPlantPK);
      }

      dispatch(setOutbound(editPlantData.outbound != null ? editPlantData.outbound : ""));
      setMotorized(editPlantData.motorized != null ? editPlantData.motorized : "");
      setTowable(editPlantData.towable != null ? editPlantData.towable : "");
      setFreezePOE(editPlantData.freezePOE != null ? editPlantData.freezePOE : "");
      setReloadDays(editPlantData.reloadDays != null ? editPlantData.reloadDays : "");
      setPlantNumber(editPlantData.plantNumber || "");
      setLongUnitRestriction(
        editPlantData.longUnitRestriction != null ? editPlantData.longUnitRestriction : ""
      );

      setLongUnitUnitTypeGroup(
        editPlantData.longUnitUnitTypeGroupFK ? editPlantData.longUnitUnitTypeGroupFK : ""
      );
      setQualifyingUnitTypeGroup(
        editPlantData.qualifyingUnitUnitTypeGroupFK ? editPlantData.qualifyingUnitUnitTypeGroupFK : ""
      );
      // set value for unit type group
      setLongUnitTypeGroupInput(editPlantData.longUnitUnitTypeGroupFK);
      setQualifyingUnitTypeGroupValue(editPlantData.qualifyingUnitUnitTypeGroupFK);
      setLongUnitRestrictionUnits(
        editPlantData.longUnitRestrictionUnits != null ? editPlantData.longUnitRestrictionUnits : ""
      );
      setLongUnitRateUnits(editPlantData.longUnitRateUnits != null ? editPlantData.longUnitRateUnits : "");

      setLongUnitRate(editPlantData.longUnitRate?.toFixed(2));
      setLongUnitRateDescription(
        editPlantData.longUnitRateDescription != null ? editPlantData.longUnitRateDescription : ""
      );
      setPlantGroups(editPlantData.customerPlantGroupFK ? editPlantData.customerPlantGroupFK : "");
      //set value for plant group
      setPlantGroupValue(editPlantData.customerPlantGroupFK);
      //

      setDpuPickup(editPlantData.dpuPickup != null ? editPlantData.dpuPickup : "");
      setDpuPickupFee(editPlantData.invoiceDPUPickupFee?.toFixed(2));
      setDpuInstructions(
        editPlantData.dealerPickupInstruction != null ? editPlantData.dealerPickupInstruction : ""
      );
      setLogin(editPlantData.login != null ? editPlantData.login : "");
      setPassword(editPlantData.password != null ? editPlantData.password : "");
      setPromptDPUOwner(editPlantData.promptDPUOwner);
      setRestrictedDispatch(
        editPlantData.forceRestrictedDispatch != null ? editPlantData.forceRestrictedDispatch : ""
      );
      setSisterPlantCode(editPlantData.sisterPlantCode != null ? editPlantData.sisterPlantCode : "");
    }
  }, [editPlantData]);

  const settingsTabFormData = () => {
    dispatch(
      setPlantFormData({
        outbound: outbound,
        motorized: motorized,
        towable: towable,
        plantNumber: plantNumber,
        freezePOE: freezePOE,
        reloadDays: reloadDays,
        longUnitRestriction: longUnitRestriction,
        longUnitUnitTypeGroupFK: longUnitUnitTypeGroup,
        longUnitRestrictionUnits: longUnitRestrictionUnits,
        longUnitRateUnits: longUnitRateUnits,
        longUnitRate: longUnitRate,
        longUnitRateDescription: longUnitRateDescription,
        login: login,
        password: password,
        customerPlantGroupFK: plantGroups,
        dpuPickup: dpuPickup,
        invoiceDPUPickupFee: dpuPickupFee,
        dealerPickupInstruction: dpuInstructions,
        promptDPUOwner: promptDPUOwner,
        forceRestrictedDispatch: restrictedDispatch,
        qualifyingUnitUnitTypeGroupFK: qualifyingUnitTypeGroup,
        sisterPlantCode: sisterPlantCode ? sisterPlantCode : null,
      })
    );
  };
  /**
   *Long Unit Type Group Lookup
   */

  const handleUnitTypeGroupLookup = () => {
    dispatch(setShowUnitTypeGroupLookup(true));
  };
  const handleUnitTypeGroupSelectionLookup = (unit) => {
    dispatch(setShowUnitTypeGroupLookup(false));
    dispatch(setUnitTypeGroupInput(unit.description?.trim()));
    setLongUnitUnitTypeGroup(unit.unitTypeGroupPK);
  };
  /**
   *Long Unit Type Group Autocomplete
   */

  const fetchQualifyingUnitTypeGroup = (string) => {
    setQualifyingUnitTypeGroupLoading(true);
    CustomerPlantMaintenanceService.getUnitTypeGroupAutocomplete(string).then((response) => {
      const data = response.data.content;
      const unittypeGroupList = data?.map((units) => ({
        ...units,
        description: units.description?.trim(),
      }));
      setUnitTypeGroupArray(unittypeGroupList);
      setQualifyingUnitTypeGroupLoading(false);
    });
  };
  const handleUnitTypeGroupSelectionAutocomplete = (unit) => {
    dispatch(setUnitTypeGroupInput(unit.description?.trim()));
    setLongUnitUnitTypeGroup(unit.unitTypeGroupPK);
  };
  /**
   *Qualifying  Unit Type Group Lookup
   */

  const handleQualifyingUnitTypeGroupLookup = () => {
    setShowQualifyingUnitTypeGroupLookup(true);
  };
  const handleQualifyingUnitTypeGroupSelectionLookup = (unit) => {
    setShowQualifyingUnitTypeGroupLookup(false);
    dispatch(setQualifyingUnitTypeGroupInput(unit.description?.trim()));
    setQualifyingUnitTypeGroup(unit.unitTypeGroupPK);
  };
  /**
   *Qualifying  Unit Type Group Autocomplete
   */

  const fetchUnitTypeGroup = (string) => {
    setUnitTypeGroupLoading(true);
    CustomerPlantMaintenanceService.getUnitTypeGroupAutocomplete(string).then((response) => {
      const data = response.data.content;
      const unittypeGroupList = data?.map((units) => ({
        ...units,
        description: units.description?.trim(),
      }));
      setUnitTypeGroupData(unittypeGroupList);
      setUnitTypeGroupLoading(false);
    });
  };

  /**
   Plant Group Lookup
   */

  const handlePlantGroupLookup = () => {
    dispatch(setShowPlantGroupLookup(true));
  };

  const handleCustomerPlantUnitTypeGroupLookupSelection = (plantgroup) => {
    dispatch(setShowPlantGroupLookup(false));
    dispatch(setPlantGroupInput(plantgroup.description?.trim()));
    setPlantGroups(plantgroup.customerPlantGroupPK);
  };
  /**
   *Plant Group Autocomplete
   */

  const fetchPlantGroup = (string) => {
    setPlantGroupLoading(true);
    CustomerPlantMaintenanceService.getPlantGroupAutocomplete(string, customerId).then((response) => {
      const data = response.data.content;
      const plantGroupList = data?.map((plantgroups) => ({
        ...plantgroups,
        description: plantgroups.description?.trim(),
      }));
      setPlantGroupData(plantGroupList);
      setPlantGroupLoading(false);
    });
  };
  const handlePlantGroupSelectionAutocomplete = (plantgroup) => {
    dispatch(setPlantGroupInput(plantgroup.description?.trim()));
    setPlantGroups(plantgroup.customerPlantGroupPK);
  };

  //message setting
  useEffect(() => {
    //
    if (
      (parseInt(longUnitRateUnits) !== "" &&
        parseInt(longUnitRateUnits) >= parseInt(longUnitRestrictionUnits)) ||
      longUnitRateUnits == 0 ||
      (longUnitRestrictionUnits == "" && longUnitRateUnits != "")
    ) {
      setMessage(false);
    } else {
      setMessage(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [longUnitRateUnits, longUnitRestrictionUnits]);
  //reset values
  useEffect(() => {
    if (longUnitRestriction === false) {
      setLongUnitRateUnits("");
      setLongUnitRate("");
      setLongUnitRateDescription("");
      setLongUnitRestrictionUnits("");
      dispatch(setUnitTypeGroupInput(""));
      setLongUnitUnitTypeGroup("");
      dispatch(setQualifyingUnitTypeGroupInput(""));
    }
  }, [longUnitRestriction]);

  useEffect(() => {
    if (longUnitRateUnits === "0") {
      setLongUnitRate("");
      setLongUnitRateDescription("");
    }
  }, [longUnitRateUnits]);
  //formdata
  useEffect(() => {
    settingsTabFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    plantGroups,
    longUnitUnitTypeGroup,
    outbound,
    motorized,
    towable,
    plantNumber,
    freezePOE,
    reloadDays,
    login,
    password,
    dpuPickup,
    dpuPickupFee,
    dpuInstructions,
    customerId,
    longUnitRestriction,
    longUnitRestrictionUnits,
    longUnitRateUnits,
    longUnitRate,
    longUnitRateDescription,
    promptDPUOwner,
    restrictedDispatch,
    qualifyingUnitTypeGroup,
    sisterPlantCode,
  ]);

  useEffect(() => {
    dispatch(setSettingInvoiceDpuPickupFee(dpuPickupFee));
    dispatch(setSettingTowable(towable));
    dispatch(setSettingMotorized(motorized));
    dispatch(setSettingLongUnitRateUnits(longUnitRateUnits));
    dispatch(setSettingLongUnitRestriction(longUnitRestriction));
    dispatch(setSettingLongUnitRestrictionUnits(longUnitRestrictionUnits));
    dispatch(setSettingLongUnitRateDescription(longUnitRateDescription));
    dispatch(setSettingLongUnitRate(longUnitRate));
    dispatch(setUnitTypeGroupFK(longUnitUnitTypeGroup));
    dispatch(setPlantGroupFK(plantGroups));
    dispatch(setSettingReloadDays(reloadDays));
    dispatch(setPlantLogin(login));
    dispatch(setPlantPassword(password));
    dispatch(setSettingInvoiceDpuPickup(dpuPickup));
    dispatch(setQualifyingUnitTypeGroupId(qualifyingUnitTypeGroup));
    dispatch(setSettingsisterPlantCode(sisterPlantCode));
  }, [
    dpuPickupFee,
    towable,
    motorized,
    longUnitRestriction,
    longUnitRestrictionUnits,
    longUnitRateUnits,
    longUnitRate,
    longUnitRateDescription,
    longUnitUnitTypeGroup,
    qualifyingUnitTypeGroup,
    plantGroups,
    reloadDays,
    login,
    password,
    dpuPickup,
    sisterPlantCode,
  ]);
  //set motorized,towable values
  useEffect(() => {
    if (customerId) {
      if (motorized) {
        setRadioValue("motorized");
      } else if (towable) {
        setRadioValue("towable");
      }
    }
  }, [motorized, towable]);

  useEffect(() => {
    if (radioValue === "motorized") {
      setMotorized(true);
      setTowable(false);
    } else if (radioValue === "towable") {
      setMotorized(false);
      setTowable(true);
    }
  }, [radioValue]);

  useEffect(() => {
    if (dpuPickup === false) {
      setPromptDPUOwner(false);
      setDpuPickupFee("");
    }
  }, [dpuPickup]);

  useEffect(() => {
    if (login === "") {
      setPassword("");
    }
  }, [login]);

  //Validation
  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d:.]/g, "");
    if (value) return number;
  };
  const isDays = (value) => {
    if (!value) return value;
    const days = value.replace(/[^\d]/g, "");
    if (value) return days;
  };
  // const unitValidation = /^\d{1,4}(\.\d{1,2})?$/

  const unitValidation = /^(\d{1,4}(\.\d{1,2})?|\.\d{1,2})$/;

  const validationSchema = yup.object({
    reloadDays: yup.number().min(1).max(32767),
    dpuPickupFee: yup.string().when("dpuPickup", {
      is: true,
      then: yup
        .string()
        .matches(/^\d{1,5}(\.\d{1,2})?$/)
        .required(),
      otherwise: yup.string(),
    }),

    longUnitRestriction: yup.boolean(),
    longUnitRestrictionUnits: yup.string().when("  longUnitRestriction", {
      is: true,
      then: yup.string().required(),
      otherwise: yup.string(),
    }),
    unitTypeGroupInput: yup.string().when("  longUnitRestriction", {
      is: true,
      then: yup.string().required(),
      otherwise: yup.string(),
    }),
    qualifyingUnitTypeGroupInput: yup.string().when("  longUnitRestriction", {
      is: true,
      then: yup.string().required(),
      otherwise: yup.string(),
    }),
    longUnitRateUnits: yup.string().required(),
    longUnitRate: yup.string().when(" longUnitRateUnits ", {
      is: (longUnitRateUnits) => {
        if (!!longUnitRateUnits && longUnitRate !== 0) {
          return true;
        } else {
          return false;
        }
      },

      then: yup.string().matches(unitValidation).required(),
      otherwise: yup.string().matches(unitValidation),
    }),

    longUnitRateDescription: yup.string().when(" longUnitRateUnits ", {
      is: (longUnitRateUnits) => {
        if (!!longUnitRateUnits && longUnitRateDescription !== 0) {
          return true;
        } else {
          return false;
        }
      },

      then: yup.string().required(),
      otherwise: yup.string(),
    }),

    password: yup.string().when("login", {
      is: (login) => login !== undefined && login.length > 0,
      then: yup.string().required(),
    }),
  });
  //Unique plantcode
  const handleSisterPlantCode = (sisterPlantCode) => {
    CustomerPlantMaintenanceService.checkPlantCode(sisterPlantCode, plantPK, incompletePlantPK)
      .then((response) => {
        const data = response.data;
        setMessage(data);
        dispatch(setCheckPlantCode(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (viewDetail || sisterPlantCode === "") {
      dispatch(setCheckPlantCode(""));
    }
  }, [viewDetail, sisterPlantCode]);
  return (
    <Formik
      initialValues={{
        dpuPickupFee,
        longUnitRate,
        longUnitRestrictionUnits,
        longUnitRateDescription,
        longUnitRestriction,
        longUnitRateUnits,
        reloadDays,
        unitTypeGroupInput,
        qualifyingUnitTypeGroupInput,
        login,
        password,
        dpuPickup,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        dpuPickupFee: true,
        longUnitRate: true,
        longUnitRestrictionUnits: true,
        longUnitRestriction: false,
        longUnitRateUnits: true,
        longUnitRateDescription: true,
        reloadDays: true,
        unitTypeGroupInput: true,
        password: true,
        dpuPickup: false,
        qualifyingUnitTypeGroupInput: true,
      }}
    >
      {(formik) => (
        <Form>
          <div className="p-15 w-100">
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Force Restricted Dispatch</Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="restrictedDispatch"
                      value={restrictedDispatch}
                      checked={restrictedDispatch}
                      disabled={viewDetail}
                      onChange={(e) => setRestrictedDispatch(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.settings.tab.outbound")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="outbound"
                      value={outbound}
                      checked={outbound}
                      disabled={viewDetail}
                      onChange={(e) => dispatch(setOutbound(e.target.checked))}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label me-3  w-50px">
                      {t("edit.customer.plant.page.settings.tab.motorized")}
                    </Form.Label>
                  </Col>
                  <Col xs={5} className="p-0">
                    <RadioGroup
                      className="d-flex"
                      name="radioValue"
                      selectedValue={radioValue}
                      onChange={(value) => {
                        setRadioValue(value);
                      }}
                    >
                      <Col xs={1} className="p-0 d-flex ">
                        <Radio value="motorized" disabled={viewDetail} />
                      </Col>
                      <Col xs={2} md={2} sm={2} className="p-0  w-30px"></Col>
                      <Col xs={12} md={12} sm={12} className="p-0 ms-5 d-flex">
                        <label>{t("edit.customer.plant.page.settings.tab.towable")}</label>
                        <Col xs={2} md={2} sm={2}></Col>
                        <Radio value="towable" disabled={viewDetail} />
                      </Col>
                    </RadioGroup>
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.settings.tab.plantNumber")}
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-92px">
                    <input
                      type="text"
                      className="customFormControl"
                      id="plantNumber"
                      name="plantNumber"
                      maxLength={10}
                      value={plantNumber}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      disabled={viewDetail}
                      onChange={(e) => setPlantNumber(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""))}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.settings.tab.freezePOE")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="freezePOE"
                      value={freezePOE}
                      checked={freezePOE}
                      disabled={viewDetail}
                      onChange={(e) => setFreezePOE(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.settings.tab.reloadDays")}
                    </Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="text"
                      id="reloadDays"
                      name="reloadDays"
                      value={reloadDays}
                      maxLength={6}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      disabled={viewDetail}
                      onInput={(e) => setReloadDays(isDays(e.target.value))}
                      className={`customFormControl ${
                        viewDetail
                          ? "black"
                          : formik.errors.reloadDays === undefined && reloadDays.length > 1
                            ? ""
                            : formik.errors.reloadDays
                              ? "borderRed"
                              : ""
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.settings.tab.longUnitRestriction")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="longUnitRestriction"
                      value={longUnitRestriction}
                      checked={longUnitRestriction}
                      disabled={viewDetail}
                      onChange={(e) => setLongUnitRestriction(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.settings.tab.longUnitUnitTypeGroup")}
                    </Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className={`p-0 d-flex`}>
                    <AutoCompleteDropdown
                      arrayList={UnitTypeGroupData}
                      searchString={unitTypeGroupInput}
                      renderItemId={(unit) => unit.unitTypeGroupPK}
                      renderItemField={(unit) => unit.description}
                      handleSearchString={(string) => dispatch(setUnitTypeGroupInput(string))}
                      fetchDataBySearchString={fetchUnitTypeGroup}
                      onSelect={handleUnitTypeGroupSelectionAutocomplete}
                      clearInputCallback={() => {
                        setLongUnitUnitTypeGroup("");
                      }}
                      selectedId={longUnitUnitTypeGroup}
                      disabled={viewDetail || longUnitRestriction == false}
                      loading={unitTypeGroupLoading}
                      className={`${
                        !viewDetail
                          ? longUnitRestriction
                            ? formik.errors.unitTypeGroupInput || longUnitUnitTypeGroup === ""
                              ? "borderRed"
                              : "borderGreen"
                            : ""
                          : ""
                      }`}
                    />
                    <LookupButton
                      disabled={viewDetail || longUnitRestriction == false}
                      onClick={handleUnitTypeGroupLookup}
                      //Unit Type Group Lookup Modal @ Bottom
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Qualifying UnitType Group</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className={`p-0 d-flex`}>
                    <AutoCompleteDropdown
                      arrayList={UnitTypeGroupArray}
                      searchString={qualifyingUnitTypeGroupInput}
                      renderItemId={(unit) => unit.unitTypeGroupPK}
                      renderItemField={(unit) => unit.description}
                      handleSearchString={(string) => dispatch(setQualifyingUnitTypeGroupInput(string))}
                      fetchDataBySearchString={fetchQualifyingUnitTypeGroup}
                      onSelect={handleQualifyingUnitTypeGroupSelectionLookup}
                      clearInputCallback={() => {
                        setQualifyingUnitTypeGroup("");
                      }}
                      selectedId={qualifyingUnitTypeGroup}
                      disabled={viewDetail || longUnitRestriction == false}
                      loading={qualifyingUnitTypeGroupLoading}
                      className={`${
                        !viewDetail
                          ? longUnitRestriction
                            ? formik.errors.unitTypeGroupInput || qualifyingUnitTypeGroup === ""
                              ? "borderRed"
                              : "borderGreen"
                            : ""
                          : ""
                      }`}
                    />
                    <LookupButton
                      disabled={viewDetail || longUnitRestriction == false}
                      onClick={handleQualifyingUnitTypeGroupLookup}
                      //Unit Type Group Lookup Modal @ Bottom
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.settings.tab.longUnitRestrictionUnits")}
                    </Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        viewDetail === true || longUnitRestriction === false
                          ? ""
                          : formik.errors.longUnitRestrictionUnits === undefined &&
                              longUnitRestrictionUnits <= 32767
                            ? "borderGreen"
                            : formik.errors.longUnitRestrictionUnits !== undefined ||
                                longUnitRestrictionUnits >= 32768
                              ? "borderRed"
                              : ""
                      }`}
                      id="longUnitRestrictionUnits"
                      name="longUnitRestrictionUnits"
                      autoComplete="off"
                      maxLength={5}
                      aria-autocomplete="list"
                      value={longUnitRestrictionUnits}
                      disabled={viewDetail || longUnitRestriction === false}
                      onInput={(e) => setLongUnitRestrictionUnits(isDays(e.target.value))}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.settings.tab.longUnitRateUnits")}
                    </Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        viewDetail || !longUnitRestriction || isCustomerPlantLoading
                          ? ""
                          : parseInt(longUnitRateUnits) === 0 ||
                              (parseInt(longUnitRateUnits) >= parseInt(longUnitRestrictionUnits) &&
                                longUnitRateUnits <= 32767)
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="longUnitRateUnits"
                      name="longUnitRateUnits"
                      maxLength={5}
                      value={longUnitRateUnits}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      disabled={viewDetail || longUnitRestriction === false}
                      onInput={(e) => setLongUnitRateUnits(isDays(e.target.value))}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>
                 
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.settings.tab.longUnitRate")}
                    </Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        viewDetail === true || longUnitRestriction === false || longUnitRateUnits === "0"
                          ? ""
                          : formik.errors.longUnitRate === undefined &&
                              longUnitRate != null &&
                              longUnitRate.length >= 1
                            ? "borderGreen"
                            : formik.errors.longUnitRate !== undefined
                              ? "borderRed"
                              : ""
                      }`}
                      id="longUnitRate"
                      name="longUnitRate"
                      value={longUnitRate}
                      maxLength={10}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      disabled={
                        viewDetail ||
                        longUnitRestriction === false ||
                        (longUnitRestriction === true && longUnitRateUnits === "0")
                      }
                      onInput={(e) =>
                        e.target.value.match(/^\d{0,2}(\.\d{0,2})?$/) &&
                        setLongUnitRate(isNumber(e.target.value))
                      }
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.settings.tab.longUnitRateDescription")}
                    </Form.Label>
                  </Col>
                  <Col sm={8} md={8} xs={8} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        viewDetail === true || longUnitRestriction === false || longUnitRateUnits === "0"
                          ? ""
                          : formik.errors.longUnitRateDescription === undefined &&
                              longUnitRateDescription != null &&
                              longUnitRateDescription.length >= 1
                            ? "borderGreen"
                            : formik.errors.longUnitRateDescription !== undefined
                              ? "borderRed"
                              : ""
                      }`}
                      maxLength={50}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      id="longUnitRateDescription"
                      name="longUnitRateDescription"
                      value={longUnitRateDescription}
                      disabled={
                        viewDetail ||
                        longUnitRestriction === false ||
                        (longUnitRestriction === true && longUnitRateUnits === "0")
                      }
                      onInput={(e) =>
                        setLongUnitRateDescription(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""))
                      }
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={6} md={6} xs={6} className="ps-lg-5">
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.settings.tab.plantGroup")}
                    </Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className={`p-0 d-flex`}>
                    <AutoCompleteDropdown
                      arrayList={plantGroupData}
                      searchString={plantGroupInput}
                      renderItemId={(item) => item.customerPlantGroupPK}
                      renderItemField={(item) => item.description}
                      handleSearchString={(string) => dispatch(setPlantGroupInput(string))}
                      fetchDataBySearchString={fetchPlantGroup}
                      onSelect={handlePlantGroupSelectionAutocomplete}
                      selectedId={plantGroups}
                      clearInputCallback={() => {
                        setPlantGroups("");
                      }}
                      disabled={viewDetail}
                      loading={plantGroupLoading}
                      className={`customFormControl ${
                        plantGroups === "" && plantGroupInput !== "" ? "borderRed" : ""
                      }`}
                    />
                    <LookupButton
                      disabled={viewDetail}
                      onClick={handlePlantGroupLookup}
                      // Plant Group Lookup Modal @ Bottom
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.settings.tab.websiteLogin")}
                    </Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className="customFormControl"
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      id="login"
                      name="login"
                      maxLength={50}
                      value={login}
                      disabled={viewDetail}
                      onInput={(e) => setLogin(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""))}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.settings.tab.WebsitePassword")}
                    </Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      className={`customFormControl ${
                        formik.errors.password === undefined && password != null && password.length > 1
                          ? ""
                          : formik.errors.password !== undefined
                            ? "borderRed"
                            : ""
                      }`}
                      id="wbPswd"
                      name="wbPswd"
                      maxLength={20}
                      aria-autocomplete="list"
                      type="password"
                      autoComplete="one-time-code"
                      spellCheck={false}
                      value={password}
                      disabled={viewDetail || login === ""}
                      onInput={(e) => setPassword(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""))}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Sister Plant Code</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-92px">
                    <input
                      className={`customFormControl ${viewDetail ? "" : checkPlantCode ? "borderRed" : ""}`}
                      type="text"
                      id="sisterPlantCode"
                      name="sisterPlantCode"
                      maxLength={10}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      value={sisterPlantCode}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setSisterPlantCode(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        dispatch(setCheckPlantCode(false));
                      }}
                      onBlur={(e) => {
                        if (e.target.value.length >= 1) {
                          handleSisterPlantCode(e.target.value);
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.settings.tab.dpuPickup")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="miscellaneousCustomer"
                      value={dpuPickup}
                      checked={dpuPickup}
                      disabled={viewDetail}
                      onChange={(e) => setDpuPickup(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Prompt DPU Owner</Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="promptDPUOwner"
                      value={promptDPUOwner}
                      checked={promptDPUOwner}
                      disabled={viewDetail || dpuPickup === false}
                      onChange={(e) => setPromptDPUOwner(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">DPU Pickup Fee</Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                    <input
                      type="text"
                      className={`customFormControl ${
                        viewDetail === true || !dpuPickup
                          ? ""
                          : formik.errors.dpuPickupFee === undefined &&
                              dpuPickupFee != null &&
                              dpuPickupFee.length >= 1
                            ? "borderGreen"
                            : formik.errors.dpuPickupFee !== undefined || dpuPickup
                              ? "borderRed"
                              : ""
                      }`}
                      id="dpuPickupFee"
                      name="dpuPickupFee"
                      value={dpuPickupFee}
                      disabled={viewDetail || !dpuPickup}
                      maxLength={10}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      onInput={(e) =>
                        e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        setDpuPickupFee(isNumber(e.target.value))
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={12} md={12} xs={12} className="p-0">
                    <label className="col-form-label dealer-label p-0 m-b-20">
                      {t("edit.customer.plant.page.settings.tab.DPUInstructions")}
                    </label>
                  </Col>
                  <Col sm={10} md={10} className="p-0">
                    <textarea
                      rows={9}
                      cols={20}
                      type="dpuInstructions"
                      className="customFormControl h-100 "
                      name="dpuInstructions"
                      value={dpuInstructions}
                      disabled={viewDetail}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      onInput={(e) => setDpuInstructions(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
          {/* UnitType Lookup Modal */}
          <UnitTypeGroupLookup
            show={showUnitTypeGroupLookup}
            onHide={() => dispatch(setShowUnitTypeGroupLookup(false))}
            renderItemId={(unit) => unit.unitTypeGroupPK}
            MaintenanceProgram
            handleLookupSelection={handleUnitTypeGroupSelectionLookup}
          />
          <UnitTypeGroupLookup
            show={showQualifyingUnitTypeGroupLookup}
            onHide={() => setShowQualifyingUnitTypeGroupLookup(false)}
            renderItemId={(unit) => unit.unitTypeGroupPK}
            MaintenanceProgram
            handleLookupSelection={handleQualifyingUnitTypeGroupSelectionLookup}
          />
          {/*plantGroup */}
          <PlantGroupLookup
            show={showPlantGroupLookup}
            onHide={() => dispatch(setShowPlantGroupLookup(false))}
            renderItemId={(item) => item.customerPlantGroupPK}
            MaintenanceProgram
            handleLookupSelection={handleCustomerPlantUnitTypeGroupLookupSelection}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SettingsTab;
