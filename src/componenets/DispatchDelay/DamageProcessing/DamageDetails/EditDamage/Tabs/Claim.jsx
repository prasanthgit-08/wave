import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LookupButton from "../../../../../common/LookupButton";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import DelayUnitCodeLookup from "../../../../../LookupScreens/DelayUnitCode/DelayUnitCodeLookup";
import ResponsibleParty from "./ResponsibleParty";
import InsuranceCompany from "./InsuranceCompany";
import DelayDamageService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import {
  setAccumulatedBond,
  setClaimLoading,
  setClaimsTabData,
  setClaimsVO,
  setCompanyAmount,
  setDamageAmount,
  setDriverAmount,
  setEditClaimtabValid,
  setEditSaveFormData,
  setInsuranceAddress1,
  setInsuranceAmount,
  setInsuranceName,
  setInsuranceState,
  setIsInsuranceClear,
  setIsResponcibleClear,
  setMaximumReserveAmount,
  setReserveAmount,
  setResponcibleAddress1,
  setResponcibleName,
  setResponciblePartyAmount,
  setResponcibleState,
  setSalvageAmount,
  setshowInsuranceCompany,
  setShowResponsibleParty,
  setTotalBond,
} from "../../../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";
import { PermissionKeyGeneratorUtil } from "../../../../../../utils/PermissionKeyGeneratorUtil";

const Claim = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const damageCompanyName = localStorage.getItem("damageCompanyName");
  const damageUnitFK = localStorage.getItem("damageUnitFK");
  const damageDriverFK = localStorage.getItem("damageDriverFK");
  const delayedUnitFK = localStorage.getItem("delayedUnitFK");
  const { damageFK } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const FeeValidation = /^(?:\d{1,5}(?:\.\d{1,2})?|\.\d{1,2})$/;
  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("DAMAGE", "edit");
  const [editMaxResIsDenied, seteditMaxResIsDenied] = useState(false);
  const {
    showResponsibleParty,
    showInsuranceCompany,
    damageAmount,
    companyAmount,
    salvageAmount,
    driverAmount,
    insuranceAmount,
    responciblePartyAmount,
    reserveAmount,
    maximumReserveAmount,
    accumulatedBond,
    totalBond,
    responcibleName,
    responcibleAddress1,
    responcibleState,
    insuranceName,
    insuranceAddress1,
    insuranceState,
    driverFK,
  } = useSelector((state) => state.damageReducer);
  const claimsTabData = useSelector((state) => state.damageReducer.claimsTabData);
  const claimLoading = useSelector((state) => state.damageReducer.claimLoading);
  const damageDetailFlag = useSelector((state) => state.damageReducer.damageDetailFlag);
  const claimsVO = useSelector((state) => state.damageReducer.claimsVO);
  //used for custom delay unitcode lookup
  const pageNumber = useSelector((state) => state.delayCodeUnitLookupReducer.pageNumber);
  const normalSortFlag = useSelector((state) => state.delayCodeUnitLookupReducer.normalSortFlag);
  const normalSortValue = useSelector((state) => state.delayCodeUnitLookupReducer.normalSortValue);
  const selectedSearchCriteria = useSelector(
    (state) => state.delayCodeUnitLookupReducer.selectedSearchCriteria
  );
  const searchTerms = useSelector((state) => state.delayCodeUnitLookupReducer.searchTerms);
  /*****Used for Weather Code Autocomplete and Lookup */
  const [weatherCodeID, setWeatherCodeID] = useState("");
  const [weatherCodeInput, setWeatherCodeInput] = useState("");
  const [showWeatherLookup, setShowWeatherLookup] = useState(false);
  const [weatherCodeArray, setWeatherCodeArray] = useState([]);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  /*****Used for Road Type Code Autocomplete and Lookup */
  const [roadTypeCodeID, setRoadTypeCodeID] = useState("");
  const [roadTypeCodeInput, setRoadTypeCodeInput] = useState("");
  const [showRoadTypeLookup, setShowRoadTypeLookup] = useState(false);
  const [roadTypeCodeArray, setRoadTypeCodeArray] = useState([]);
  const [isRoadTypeLoading, setIsRoadTypeLoading] = useState(false);
  /*****Used for Weather Code Autocomplete and Lookup */
  const [roadConditionCodeID, setRoadConditionCodeID] = useState("");
  const [roadConditionCodeInput, setRoadConditionCodeInput] = useState("");
  const [showRoadConditionLookup, setShowRoadConditionLookup] = useState(false);
  const [roadConditionCodeArray, setRoadConditionCodeArray] = useState([]);
  const [isRoadConditionLoading, setIsRoadConditionLoading] = useState(false);
  const [showroadConditionCodeLookup, setShowRoadConditionCodeLookup] = useState(false);
  const [driverReported, setDriverReported] = useState(false);
  const [driverAtFault, setDriverAtFault] = useState(false);
  const [drugTest, setDrugTest] = useState(false);
  const [alcoholTest, setAlcoholTest] = useState(false);
  const [majorDamage, setMajorDamage] = useState(false);
  const [totaled, setTotaled] = useState(false);
  const [accident, setAccident] = useState(false);
  const [preventable, setPreventable] = useState(false);
  const [injuries, setInjuries] = useState("");
  const [dOTReportable, setDOTReportable] = useState(false);
  const [driverResponcible, setDriverResponcible] = useState(false);
  const [driverRemedial, setDriverRemedial] = useState(false);
  const [storeCode, setStoreCode] = useState("");
  const [action, setAction] = useState("");
  const [factory, setFactory] = useState(false);
  const [ourInsuranceLiabilityNumber, setOurInsuranceLiabilityNumber] = useState("");
  const [responcibleParty, setResponcibleParty] = useState(false);
  const [responciblePartyCustomerAddressFK, setResponciblePartyCustomerAddressFK] = useState(null);
  const [insuranceCompany, setInsuranceCompany] = useState(false);
  const [insuranceLiabilityNumber, setInsuranceLiabilityNumber] = useState("");
  const [insuranceClaimNumber, setInsuranceClaimNumber] = useState("");
  const [ourInsuranceClaimNumber, setOurInsuranceClaimNumber] = useState("");
  const [insuranceCustomerAddressFK, setInsuranceCustomerAddressFK] = useState(null);
  /******Responsible Name,Address field ******/
  const [responsibleAddress2, setResponcibleAddress2] = useState("");
  const [responcibleCity, setResponcibleCity] = useState("");
  //const [responcibleState, setResponcibleState] = useState("");
  const [responciblePostal, setResponciblePostal] = useState("");
  const [responciblePhone, setResponciblePhone] = useState("");
  const [responcibleFax, setResponcibleFax] = useState("");
  const [responcibleEmail, setResponcibleEmail] = useState("");
  /******Insurance Name,Address field ******/
  const [insuranceAddress2, setInsuranceAddress2] = useState("");
  const [insuranceCity, setInsuranceCity] = useState("");
  const [insurancePostal, setInsurancePostal] = useState("");
  const [insurancePhone, setInsurancePhone] = useState("");
  const [insuranceFax, setInsuranceFax] = useState("");
  const [insuranceEmail, setInsuranceEmail] = useState("");
  const [newDamageData, setNewDamageData] = useState();

  /******
   * Permission to set the Maximum Rserve Amount
   * ****/
  useEffect(() => {
    if (deniedPermissions) {
      seteditMaxResIsDenied(deniedPermissions?.includes(editPermission));
    }
  }, [deniedPermissions, editPermission]);

  const getNewDamageData = () => {
    dispatch(setClaimLoading(true));
    DelayDamageService.getDelayDamageViewDetails(damageFK, "CLAIMS", 0, 10, null, false)
      .then((response) => {
        const data = response?.data[0];
        setNewDamageData(data);
        dispatch(setClaimsTabData(data));
        dispatch(setDamageAmount(data?.DamageAmount));
        dispatch(setDriverAmount(data?.DriverAmount));
        dispatch(setCompanyAmount(data?.CompanyAmount));
        dispatch(setSalvageAmount(data?.SalvageAmount));
        dispatch(setInsuranceAmount(data?.InsuranceAmount));
        dispatch(setReserveAmount(data?.ReserveAmount));
        dispatch(setResponciblePartyAmount(data?.ResponciblePartyAmount));
        dispatch(setMaximumReserveAmount(data?.MaximumReserveAmount));
        dispatch(setAccumulatedBond(data?.AccumulatedBond));
        dispatch(setTotalBond(data?.TotalBond));
        setWeatherCodeID(data?.WeatherDelayedUnitCodeFK);
        setWeatherCodeInput(data?.Weather);
        setRoadTypeCodeID(data?.RoadTypeDelayedUnitCodeFK);
        setRoadTypeCodeInput(data?.RoadType);
        setRoadConditionCodeID(data?.RoadConditionDelayedUnitCodeFK);
        setRoadConditionCodeInput(data?.RoadCondition);
        setDriverReported(data?.DriverReported);
        setDriverResponcible(data?.DriverResponcible);
        setDriverAtFault(data?.DriverAtFault);
        setDrugTest(data?.DrugTest);
        setAlcoholTest(data?.AlcoholTest);
        setMajorDamage(data?.MajorDamage);
        setTotaled(data?.Totaled);
        setAccident(data?.Accident);
        setPreventable(data?.Preventable);
        setInjuries(data?.Injuries);
        setDOTReportable(data?.DOTReportable);
        setDriverRemedial(data?.DriverRemedial);
        setStoreCode(data?.StoreCode?.trim());
        setAction(data?.Action);
        setFactory(data?.Factory);
        setOurInsuranceLiabilityNumber(data?.OurInsuranceLiabilityNumber);
        setResponcibleParty(data?.ResponcibleParty);
        setResponciblePartyCustomerAddressFK(data?.ResponciblePartyCustomerAddressFK);
        setInsuranceLiabilityNumber(data?.TheirInsuranceLiabilityNumber);
        setInsuranceCustomerAddressFK(data?.InsuranceCustomerAddressFK);
        dispatch(setResponcibleName(data?.Responsible_Name));
        dispatch(setResponcibleAddress1(data?.Responsible_Address1));
        setResponcibleCity(data?.Responsible_City);
        dispatch(setResponcibleState(data?.Responsible_Statecode));
        setInsuranceCompany(data?.InsuranceCompany);
        dispatch(setInsuranceName(data?.Insurance_Name));
        dispatch(setInsuranceAddress1(data?.Insurance_Address1));
        setInsuranceCity(data?.Insurance_City);
        dispatch(setInsuranceState(data?.Insurance_Statecode));
        setOurInsuranceClaimNumber(data?.OurInsuranceClaimNumber);
        setInsuranceClaimNumber(data?.TheirInsuranceClaimNumber);
        dispatch(setClaimLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setClaimLoading(false));
      });
  };

  useEffect(() => {
    if (damageFK && damageDetailFlag) {
      getNewDamageData();
    }
  }, [damageFK, damageDetailFlag]);

  /*****
   * Set the Responsible fields after the
   * details entered in the Responsibel Model
   * ****/
  useEffect(() => {
    if (!claimsTabData?.ResponcibleParty) {
      dispatch(setResponcibleName(responcibleName));
      dispatch(setResponcibleAddress1(responcibleAddress1));
      dispatch(setResponcibleState(responcibleState));
    }
  }, [claimsTabData]);
  /*****
   * Set the Insurance fields after the
   * details entered in the  Model
   * ****/
  useEffect(() => {
    if (!claimsTabData?.InsuranceCompany) {
      dispatch(setInsuranceName(insuranceName));
      dispatch(setInsuranceAddress1(insuranceAddress1));
      dispatch(setInsuranceState(insuranceState));
    }
  }, [claimsTabData]);

  /**Tab Validation***/
  useEffect(() => {
    if (
      !weatherCodeID ||
      !roadTypeCodeID ||
      !roadConditionCodeID ||
      (responcibleParty && !responcibleName) ||
      (insuranceCompany && !insuranceName) ||
      (insuranceAmount && !FeeValidation.test(insuranceAmount)) ||
      (salvageAmount && !FeeValidation.test(salvageAmount)) ||
      (damageAmount && !FeeValidation.test(damageAmount)) ||
      (responciblePartyAmount && !FeeValidation.test(responciblePartyAmount))
    ) {
      /**enable save if all conditions**/
      dispatch(setEditClaimtabValid(false));
    } else {
      /***disable save***/
      dispatch(setEditClaimtabValid(true));
    }
  }, [
    weatherCodeID,
    roadTypeCodeID,
    roadConditionCodeID,
    // injuries,
    insuranceAmount,
    salvageAmount,
    responciblePartyAmount,
    damageAmount,
    responcibleParty,
    responcibleName,
    insuranceCompany,
    insuranceName,
  ]);

  /*****
   * Setting the data for Claims Tab
   * *****/
  const claimsTabFormData = () => {
    const data = {
      ...claimsVO,
      damageAmount: damageAmount,
      driverAmount: driverAmount,
      salvageAmount: salvageAmount,
      companyAmount: companyAmount,
      insuranceAmount: insuranceAmount,
      responsiblePartyAmount: responciblePartyAmount,
      maximumReserveAmount: maximumReserveAmount,
      responsibleParty: responcibleParty ? 1 : 0,
      insuranceCompany: insuranceCompany ? 1 : 0,
      responsiblePartyCustomerAddressFK: responciblePartyCustomerAddressFK,
      insuranceCustomerAddressFK: insuranceCustomerAddressFK,
      driverResponsible: driverResponcible ? 1 : 0,
      driverReported: driverReported ? 1 : 0,
      driverAtFault: driverAtFault ? 1 : 0,
      drugTest: drugTest ? 1 : 0,
      alcoholTest: alcoholTest ? 1 : 0,
      majorDamage: majorDamage ? 1 : 0,
      totaled: totaled ? 1 : 0,
      accident: accident ? 1 : 0,
      preventable: preventable ? 1 : 0,
      injuries: injuries ? injuries : "",
      dotReportable: dOTReportable ? 1 : 0,
      driverRemedial: driverRemedial ? 1 : 0,
      storeCode: storeCode ? storeCode : "",
      action: action ? action : "",
      factory: factory ? 1 : 0,
      ourInsuranceLiabilityNumber: ourInsuranceLiabilityNumber,
      theirInsuranceLiabilityNumber: insuranceLiabilityNumber ? insuranceLiabilityNumber : "",
      roadTypeDelayedUnitCodeFK: roadTypeCodeID,
      roadConditionDelayedUnitCodeFK: roadConditionCodeID,
      weatherDelayedUnitCodeFK: weatherCodeID,
      insuranceClaimNumber: insuranceClaimNumber,
      ourInsuranceClaimNumber: ourInsuranceClaimNumber,
      editMaxResIsDenied: editMaxResIsDenied ? 1 : 0,
    };
    dispatch(setClaimsVO(data));
  };

  useEffect(() => {
    claimsTabFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    damageAmount,
    driverAmount,
    salvageAmount,
    companyAmount,
    insuranceAmount,
    responciblePartyAmount,
    maximumReserveAmount,
    responcibleParty,
    insuranceCompany,
    responciblePartyCustomerAddressFK,
    insuranceCustomerAddressFK,
    driverResponcible,
    driverReported,
    driverAtFault,
    drugTest,
    alcoholTest,
    majorDamage,
    totaled,
    accident,
    preventable,
    injuries,
    dOTReportable,
    driverRemedial,
    storeCode,
    action,
    factory,
    ourInsuranceLiabilityNumber,
    insuranceLiabilityNumber,
    roadTypeCodeID,
    roadConditionCodeID,
    weatherCodeID,
    insuranceClaimNumber,
    ourInsuranceClaimNumber,
    editMaxResIsDenied,
  ]);

  const claimTabData = () => {
    dispatch(
      setEditSaveFormData({
        majorDamage: majorDamage,
        accident: accident,
        preventable: preventable,
        injuries: injuries,
        storeCode: storeCode,
        action: action,
        factory: factory,
        totaled: totaled,
        driverResponsible: driverResponcible ? 1 : 0,
        driverReported: driverReported ? 1 : 0,
        roadTypeDelayedUnitCodeFK: roadTypeCodeID,
        roadConditionDelayedUnitCodeFK: roadConditionCodeID,
        weatherDelayedUnitCodeFK: weatherCodeID,
      })
    );
  };
  useEffect(() => {
    claimTabData();
  }, [
    majorDamage,
    accident,
    preventable,
    injuries,
    storeCode,
    action,
    factory,
    totaled,
    driverResponcible,
    driverReported,
    roadTypeCodeID,
    roadConditionCodeID,
    weatherCodeID,
  ]);

  /*****Weather Delayed Unit Code******/
  //used to set Weather Lookup and Autocomplete
  const handleWeatherCodeLookup = (delayUnitCode) => {
    setShowWeatherLookup(false);
    setWeatherCodeInput(delayUnitCode?.description?.trim());
    setWeatherCodeID(delayUnitCode?.delayedUnitCodePK);
  };

  const handleWeatherLookup = () => {
    setShowWeatherLookup(true);
  };

  /*****Road Type Delayed Unit Code******/
  //used to set Roadtype Lookup and Autocomplete
  const handleRoadTypeCodeLookup = (delayUnitCode) => {
    setShowRoadTypeLookup(false);
    setRoadTypeCodeInput(delayUnitCode?.description?.trim());
    setRoadTypeCodeID(delayUnitCode?.delayedUnitCodePK);
  };

  const handleRoadTypeLookup = () => {
    setShowRoadTypeLookup(true);
  };

  /*****Road Condition Delayed Unit Code******/
  const handleRoadConditionCodeLookup = (delayUnitCode) => {
    setShowRoadConditionLookup(false);
    setRoadConditionCodeInput(delayUnitCode?.description?.trim());
    setRoadConditionCodeID(delayUnitCode?.delayedUnitCodePK);
  };

  const handleRoadConditionLookup = () => {
    setShowRoadConditionLookup(true);
  };

  /****To view the responsible and Insurance Modal Pop Up****/
  const handleResponcibleModalShow = () => {
    dispatch(setShowResponsibleParty(true));
  };
  const handleInsuranceModalShow = () => {
    dispatch(setshowInsuranceCompany(true));
  };

  /*****calculate and Set the company amount based on the other amounts ] */
  useEffect(() => {
    const salvage = parseFloat(salvageAmount) || 0;
    const insurance = parseFloat(insuranceAmount) || 0;
    const responsible = parseFloat(responciblePartyAmount) || 0;
    const damage = parseFloat(damageAmount) || 0;
    const driver = parseFloat(driverAmount) !== 0 ? parseFloat(driverAmount) : 0;
    const company = damage - (salvage + insurance + responsible + driver);
    dispatch(setCompanyAmount(company));
  }, [damageAmount, salvageAmount, insuranceAmount, responciblePartyAmount, driverAmount]);

  /*** Allow  limit to one digit****/
  const handleInputChange = (event) => {
    const value = event.target.value;
    // Remove everything except digits 0–9
    const sanitizedValue = value?.replace(/[^0-9]/g, "");
    // Limit to only 1 digit (optional)
    const limitedValue = sanitizedValue?.slice(0, 1);
    setAction(limitedValue);
  };

  /** used to get Weather code autocomplete**/
  const fetchWeatherCode = (string) => {
    setIsWeatherLoading(true);
    DelayDamageService.getAutoCompleteForDamageCodes(string, damageCompanyName, null, "Weather")
      .then((response) => {
        const data = response?.data;
        setWeatherCodeArray(data);
        setIsWeatherLoading(false);
      })
      .catch((error) => {
        setIsWeatherLoading(false);
      });
  };

  /** used to get Roadtype code autocomplete**/
  const fetchRoadTypeCode = (string) => {
    setIsRoadTypeLoading(true);
    DelayDamageService.getAutoCompleteForDamageCodes(string, damageCompanyName, null, "ROADTYPE")
      .then((response) => {
        const data = response?.data;
        setRoadTypeCodeArray(data);
        setIsRoadTypeLoading(false);
      })
      .catch((error) => {
        setIsRoadTypeLoading(false);
      });
  };

  /** used to get Roadcondition code autocomplete**/
  const fetchRoadConditionCode = (string) => {
    setIsRoadConditionLoading(true);
    DelayDamageService.getAutoCompleteForDamageCodes(string, damageCompanyName, null, "ROADCONDITION")
      .then((response) => {
        const data = response?.data;
        setRoadConditionCodeArray(data);
        setIsRoadConditionLoading(false);
      })
      .catch((error) => {
        setIsRoadConditionLoading(false);
      });
  };

  /***
   * Set the Reserve amount to 0 if both Driver at
   * fault and Driver Responsible is unchecked.
   ***/
  useEffect(() => {
    if (driverAtFault || driverResponcible) {
      const reserve = Math.min(damageAmount, maximumReserveAmount);
      dispatch(setReserveAmount(reserve));
    } else if (!driverAtFault && !driverResponcible) {
      dispatch(setReserveAmount(0));
    }
  }, [driverAtFault, driverResponcible, damageAmount, maximumReserveAmount]);

  /***
   * Set the  MaximumReserve amount to 0 if both Driver at
   * fault and Driver Responsible is unchecked.
   ***/
  useEffect(() => {
    if (driverAtFault || driverResponcible) {
      dispatch(setMaximumReserveAmount(newDamageData?.MaximumReserveAmount));
    } else if (!driverAtFault && !driverResponcible) {
      dispatch(setMaximumReserveAmount(0));
    }
  }, [driverAtFault, driverResponcible, newDamageData]);

  /****Ente only number *****/
  const isNumber = (value) => {
    if (!value) return value;
    return value?.replace(/\D/g, ""); // remove everything that's not a digit
  };
  return (
    <Form>
      <div className={"p-15 w-100"}>
        {claimLoading && (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
          </div>
        )}
        <Row className="m-0 p-0">
          <Col xs={5} className="p-0">
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Damage Amount</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  id="damageamount"
                  value={damageAmount}
                  name="damageamount"
                  maxLength={10}
                  autoComplete="new-password"
                  className={`customFormControl ${FeeValidation.test(damageAmount) ? "" : "borderRed"}`}
                  aria-autocomplete="list"
                  onChange={(e) => {
                    e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                      dispatch(setDamageAmount(e.target.value));
                  }}
                  onBlur={() => {
                    if (driverAtFault || driverResponcible) {
                      const reserve = Math.min(damageAmount, maximumReserveAmount);
                      dispatch(setReserveAmount(reserve - driverAmount));
                    } else {
                      dispatch(setReserveAmount(0));
                    }
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Driver Amount</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="driveramount"
                  value={driverAmount}
                  name="driveramount"
                  maxLength={30}
                  disabled
                  autoComplete="new-password"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Company Amount</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="companyamount"
                  value={companyAmount}
                  name="companyamount"
                  maxLength={30}
                  disabled
                  autoComplete="new-password"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Salvage Amount</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  id="SalvageAmount"
                  value={salvageAmount}
                  name="SalvageAmount"
                  maxLength={30}
                  disabled={!damageAmount || damageAmount === 0}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  className={`customFormControl ${
                    FeeValidation.test(salvageAmount) || !salvageAmount ? "" : "borderRed"
                  }`}
                  onChange={(e) => {
                    dispatch(setSalvageAmount(e.target.value));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Insurance Amount</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  id="insuranceamount"
                  value={insuranceAmount}
                  name="insuranceamount"
                  maxLength={30}
                  disabled={!insuranceCompany || !damageAmount || damageAmount === 0}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  className={`customFormControl ${
                    !insuranceCompany || (insuranceCompany && !insuranceAmount)
                      ? "borderBlack"
                      : FeeValidation.test(insuranceAmount)
                        ? ""
                        : "borderRed"
                  }`}
                  onChange={(e) => {
                    dispatch(setInsuranceAmount(e.target.value));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Responsible Party Amount</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  id="responciblepartyamount"
                  value={responciblePartyAmount}
                  name="responciblepartyamount"
                  maxLength={30}
                  disabled={!responcibleParty || !damageAmount || damageAmount === 0}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  className={`customFormControl ${
                    !responcibleParty || (responcibleParty && !responciblePartyAmount)
                      ? "borderBlack"
                      : FeeValidation.test(responciblePartyAmount)
                        ? ""
                        : "borderRed"
                  }`}
                  onChange={(e) => {
                    dispatch(setResponciblePartyAmount(e.target.value));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="m-t-65  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Reserve Amount</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="reserveamount"
                  value={reserveAmount}
                  name="reserveamount"
                  maxLength={30}
                  disabled
                  autoComplete="new-password"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Maximum Reserve Amount</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  id="maxreservedamount"
                  value={maximumReserveAmount}
                  name="maxreservedamount"
                  maxLength={30}
                  disabled={
                    editMaxResIsDenied ||
                    !damageAmount ||
                    damageAmount === 0 ||
                    (!driverAtFault && !driverResponcible)
                  }
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  className={`customFormControl ${
                    FeeValidation.test(maximumReserveAmount) ? "" : "borderRed"
                  }`}
                  onChange={(e) => {
                    e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                      dispatch(setMaximumReserveAmount(e.target.value));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Accumulated bond</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="Accumulatedbond"
                  value={accumulatedBond}
                  name="Accumulatedbond"
                  maxLength={30}
                  disabled
                  autoComplete="new-password"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Total Bond</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="totalbond"
                  value={totalBond}
                  name="totalbond"
                  maxLength={30}
                  disabled
                  autoComplete="new-password"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="m-t-65 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Weather Code</Form.Label>
              </Col>

              <Col xs={7} className={`p-0 d-flex`}>
                <AutoCompleteDropdown
                  arrayList={weatherCodeArray}
                  searchString={weatherCodeInput}
                  renderItemId={(item) => item.delayedUnitCodePK}
                  renderItemField={(item) => item.description}
                  handleSearchString={(string) => setWeatherCodeInput(string)}
                  fetchDataBySearchString={fetchWeatherCode}
                  onSelect={handleWeatherCodeLookup}
                  selectedId={weatherCodeID}
                  clearInputCallback={() => {
                    setWeatherCodeID("");
                  }}
                  style={`pointer:true`}
                  className={`customFormControl ${
                    loading ? "" : weatherCodeInput && weatherCodeID ? "borderGreen" : "borderRed"
                  }`}
                  maxHeight="170px"
                  loading={isWeatherLoading}
                  towardsTop
                />
                <LookupButton onClick={handleWeatherLookup} />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Road Type code</Form.Label>
              </Col>

              <Col xs={7} className={`p-0 d-flex`}>
                <AutoCompleteDropdown
                  arrayList={roadTypeCodeArray}
                  searchString={roadTypeCodeInput}
                  renderItemId={(item) => item.delayedUnitCodePK}
                  renderItemField={(item) => item.description}
                  handleSearchString={(string) => setRoadTypeCodeInput(string)}
                  fetchDataBySearchString={fetchRoadTypeCode}
                  onSelect={handleRoadTypeCodeLookup}
                  selectedId={roadTypeCodeID}
                  clearInputCallback={() => {
                    setRoadTypeCodeID("");
                  }}
                  style={`pointer:true`}
                  className={`customFormControl ${
                    loading ? "" : roadTypeCodeInput && roadTypeCodeID ? "borderGreen" : "borderRed"
                  }`}
                  maxHeight="170px"
                  loading={isRoadTypeLoading}
                  towardsTop
                />
                <LookupButton onClick={handleRoadTypeLookup} />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Road Condition Code</Form.Label>
              </Col>

              <Col xs={7} className={`p-0 d-flex`}>
                <AutoCompleteDropdown
                  arrayList={roadConditionCodeArray}
                  searchString={roadConditionCodeInput}
                  renderItemId={(item) => item.delayedUnitCodePK}
                  renderItemField={(item) => item.description}
                  handleSearchString={(string) => setRoadConditionCodeInput(string)}
                  fetchDataBySearchString={fetchRoadConditionCode}
                  onSelect={handleRoadConditionCodeLookup}
                  selectedId={roadConditionCodeID}
                  clearInputCallback={() => {
                    setRoadConditionCodeID("");
                  }}
                  style={`pointer:true`}
                  className={`customFormControl ${
                    loading ? "" : roadConditionCodeInput && roadConditionCodeID ? "borderGreen" : "borderRed"
                  }`}
                  maxHeight="170px"
                  loading={isRoadConditionLoading}
                  towardsTop
                />
                <LookupButton onClick={handleRoadConditionLookup} />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={2} className="p-0 m-l-3">
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Driver Reported</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="driverrepoted"
                  name="driverreported "
                  checked={driverReported}
                  disabled={!driverFK}
                  onChange={(e) => {
                    setDriverReported(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Driver Responsible</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="DriverResponcible"
                  name="DriverResponcible"
                  checked={driverResponcible}
                  disabled={!driverFK || driverAtFault || responcibleParty || insuranceCompany}
                  onChange={(e) => {
                    setDriverResponcible(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Driver At Fault</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="driveratfault"
                  name="driveratfault"
                  checked={driverAtFault}
                  disabled={!driverFK || driverResponcible || responcibleParty || insuranceCompany}
                  onChange={(e) => {
                    setDriverAtFault(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Require Drug Test</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="rdrugtest"
                  name="requiredrugtest"
                  checked={drugTest}
                  disabled={!driverFK || claimsTabData?.DrugTest}
                  onChange={(e) => {
                    setDrugTest(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Require Alcohol Test</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="alcoholTest"
                  name="alcoholTest"
                  checked={alcoholTest}
                  disabled={!driverFK || claimsTabData?.AlcoholTest}
                  onChange={(e) => {
                    setAlcoholTest(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Major Damage</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="majordamage"
                  name="majordamage"
                  checked={majorDamage}
                  disabled={totaled}
                  onChange={(e) => {
                    setMajorDamage(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Unit Totaled</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="unittotaled"
                  name="unittotaled"
                  checked={totaled}
                  disabled={majorDamage}
                  onChange={(e) => {
                    setTotaled(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Accident</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="Accident"
                  name="Accident"
                  checked={accident}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setAccident(checked);

                    if (!checked) {
                      setPreventable(false);
                      setInjuries(0);
                    }
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Preventable</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="preventable"
                  name="preventable"
                  checked={preventable}
                  disabled={!accident}
                  onChange={(e) => {
                    setPreventable(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className="col-form-label dealer-label">Injuries</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="Injuries"
                  value={injuries}
                  name="injuries"
                  maxLength={6}
                  disabled={!accident}
                  aria-autocomplete="list"
                  onChange={(e) => {
                    setInjuries(isNumber(e.target.value));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">DOT Reportable</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="Dotraportable"
                  name="Dotraportable"
                  checked={dOTReportable}
                  disabled={!driverFK}
                  onChange={(e) => {
                    setDOTReportable(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Driver Remedial</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="driverremedial"
                  name="driverremedial"
                  checked={driverRemedial}
                  disabled={!driverFK}
                  onChange={(e) => {
                    setDriverRemedial(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className="col-form-label dealer-label">Store Code</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="text"
                  className="customFormControl"
                  id="storecode"
                  value={storeCode}
                  name="storecode"
                  maxLength={4}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  onChange={(e) => setStoreCode(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className="col-form-label dealer-label">Action</Form.Label>
              </Col>
              <Col xs={2} className={`p-0 d-flex`}>
                <input
                  type="number"
                  className={`customFormControl ${
                    !action ? "" : !(action >= 0 && action <= 9) ? "borderRed" : ""
                  }`}
                  id="action"
                  value={action}
                  min={0}
                  max={9}
                  disabled={!driverFK}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onBeforeInput={(e) => {
                    if (e.data === "e" || e.data === "." || e.data === "-" || !/^[0-9.-]*$/.test(e.data)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={handleInputChange}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col xs={7} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Factory</Form.Label>
              </Col>
              <Col xs={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="factory"
                  name="factory"
                  checked={factory}
                  onChange={(e) => {
                    setFactory(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={5} className="p-0 m-l-">
            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">
                  Our Insurance Liability Number
                </Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="insuranceliabilitynumber"
                  value={ourInsuranceLiabilityNumber}
                  name="insuranceliabilitynumber"
                  maxLength={10}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    isNumber(e.target.value);
                    setOurInsuranceLiabilityNumber(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Our Insurance Claim Number</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="ourinsuranceclaimnumber"
                  value={ourInsuranceClaimNumber}
                  name="ourinsuranceclaimnumber"
                  maxLength={10}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    isNumber(e.target.value);
                    setOurInsuranceClaimNumber(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="m-t-75 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Responsible Party</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="Responcibleparty"
                  name="Responcibleparty"
                  checked={responcibleParty}
                  disabled={claimsTabData?.ResponcibleParty || driverResponcible || driverAtFault}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setResponcibleParty(checked);
                    if (!checked) {
                      dispatch(setIsResponcibleClear(true));
                      dispatch(setResponcibleName(""));
                      dispatch(setResponcibleAddress1(""));
                      dispatch(setResponcibleState(""));
                      dispatch(setResponciblePartyAmount(0));
                    }
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label"> Responsible Party</Form.Label>
              </Col>

              <Col xs={6} className={`p-0 d-flex`}>
                <input
                  type="text"
                  className={`customFormControl`}
                  id="ResponcibleParty"
                  value={responcibleName}
                  name="ResponcibleParty"
                  maxLength={30}
                  disabled
                  autoComplete="new-password"
                  aria-autocomplete="list"
                />
                <LookupButton
                  onClick={handleResponcibleModalShow}
                  disabled={!responcibleParty || claimsTabData?.ResponcibleParty}
                  style={{
                    color:
                      !responcibleParty || claimsTabData?.ResponcibleParty
                        ? "" // icon color
                        : !claimsTabData?.ResponcibleParty && responcibleParty && responcibleName
                          ? "green"
                          : "red",
                    border: "1px solid",
                    borderColor: !responcibleParty
                      ? ""
                      : responcibleParty && responcibleName
                        ? "green"
                        : "red",
                    borderRadius: "4px",
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label"></Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0" style={{ width: "250px" }}>
                <input
                  type="text"
                  className={`customFormControl`}
                  value={responcibleAddress1}
                  id="ResponcibleParty"
                  name="ResponcibleParty"
                  maxLength={30}
                  disabled
                  autoComplete="new-password"
                  aria-autocomplete="list"
                />
              </Col>

              <Col sm={1} md={1} xs={1} className="p-r-0">
                <input
                  className="customFormControl"
                  name="ResponcibleParty"
                  value={responcibleState}
                  maxLength={4}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="m-t-75 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Insurance Company</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="InsuranceCompany"
                  name="Insurance Company"
                  checked={insuranceCompany}
                  disabled={claimsTabData?.InsuranceCompany || driverAtFault || driverResponcible}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setInsuranceCompany(checked);
                    if (!checked) {
                      dispatch(setIsInsuranceClear(true));
                      dispatch(setInsuranceName(""));
                      dispatch(setInsuranceAddress1(""));
                      dispatch(setInsuranceState(""));
                      dispatch(setInsuranceAmount(0));
                      setInsuranceLiabilityNumber("");
                      setInsuranceClaimNumber("");
                    }
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Insurance Liability Number</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="insuranceliabilitybumber"
                  value={insuranceLiabilityNumber}
                  name="insuranceliabilitynumber"
                  maxLength={10}
                  disabled={claimsTabData?.InsuranceCompany || !insuranceCompany}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    setInsuranceLiabilityNumber(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Insurance Company</Form.Label>
              </Col>

              <Col xs={6} className={`p-0 d-flex`}>
                <input
                  type="text"
                  className={`customFormControl`}
                  id="insuranceCompany"
                  value={insuranceName}
                  name="insuranceCompany"
                  maxLength={30}
                  disabled
                  autoComplete="new-password"
                  aria-autocomplete="list"
                />
                <LookupButton
                  onClick={handleInsuranceModalShow}
                  disabled={!insuranceCompany || claimsTabData?.InsuranceCompany}
                  style={{
                    color:
                      !insuranceCompany || claimsTabData?.InsuranceCompany
                        ? "" // icon color
                        : !claimsTabData?.InsuranceCompany && insuranceCompany && insuranceName
                          ? "green"
                          : "red",
                    border: "1px solid",
                    borderColor:
                      !insuranceCompany || claimsTabData?.InsuranceCompany
                        ? ""
                        : !claimsTabData?.InsuranceCompany && insuranceCompany && insuranceName
                          ? "green"
                          : "red",
                    borderRadius: "4px",
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label"></Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0" style={{ width: "250px" }}>
                <input
                  type="text"
                  className={`customFormControl`}
                  value={insuranceAddress1}
                  id="ad1"
                  name="ad1"
                  maxLength={30}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  disabled
                  spellCheck={false}
                />
              </Col>

              <Col sm={1} md={1} xs={1} className="p-r-0">
                <input
                  className="customFormControl"
                  name="insuranceState"
                  value={insuranceState}
                  maxLength={4}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Insurance Claim Number</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="insuranceclaimnumber"
                  value={insuranceClaimNumber}
                  name="insuranceclaimnumber"
                  maxLength={10}
                  disabled={claimsTabData?.InsuranceCompany || !insuranceCompany}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    setInsuranceClaimNumber(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
      <ResponsibleParty show={showResponsibleParty} onHide={() => dispatch(setShowResponsibleParty(false))} />

      <InsuranceCompany show={showInsuranceCompany} onHide={() => dispatch(setshowInsuranceCompany(false))} />
      <DelayUnitCodeLookup
        show={showWeatherLookup}
        onHide={() => setShowWeatherLookup(false)}
        renderItemId={(item) => item.delayedUnitCodePK}
        handleLookupSelection={handleWeatherCodeLookup}
        customServiceCallback={() =>
          DelayDamageService.getLookupForDamageCodes(
            selectedSearchCriteria,
            searchTerms,
            pageNumber,
            normalSortValue,
            normalSortFlag,
            damageCompanyName,
            null,
            "Weather"
          )
        }
      />
      {/* RoadTypeCode Lookup */}
      <DelayUnitCodeLookup
        show={showRoadTypeLookup}
        onHide={() => setShowRoadTypeLookup(false)}
        renderItemId={(item) => item.delayedUnitCodePK}
        handleLookupSelection={handleRoadTypeCodeLookup}
        customServiceCallback={() =>
          DelayDamageService.getLookupForDamageCodes(
            selectedSearchCriteria,
            searchTerms,
            pageNumber,
            normalSortValue,
            normalSortFlag,
            damageCompanyName,
            null,
            "ROADTYPE"
          )
        }
      />
      {/* RoadConditionCode Lookup */}
      <DelayUnitCodeLookup
        show={showRoadTypeLookup}
        onHide={() => setShowRoadTypeLookup(false)}
        renderItemId={(item) => item.delayedUnitCodePK}
        handleLookupSelection={handleRoadTypeCodeLookup}
        customServiceCallback={() =>
          DelayDamageService.getLookupForDamageCodes(
            selectedSearchCriteria,
            searchTerms,
            pageNumber,
            normalSortValue,
            normalSortFlag,
            damageCompanyName,
            null,
            "ROADTYPE"
          )
        }
      />
      {/* RoadConditionCode Lookup */}
      <DelayUnitCodeLookup
        show={showRoadConditionLookup}
        onHide={() => setShowRoadConditionLookup(false)}
        renderItemId={(item) => item.delayedUnitCodePK}
        handleLookupSelection={handleRoadConditionCodeLookup}
        customServiceCallback={() =>
          DelayDamageService.getLookupForDamageCodes(
            selectedSearchCriteria,
            searchTerms,
            pageNumber,
            normalSortValue,
            normalSortFlag,
            damageCompanyName,
            null,
            "ROADCONDITION"
          )
        }
      />
      {loading && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </Form>
  );
};

export default Claim;
