import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import { useDispatch, useSelector } from "react-redux";
import DelayDamageService from "../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  setAccumulatedBond,
  setClaimsTabData,
  setClaimsVO,
  setCompanyAmount,
  setDamageAmount,
  setDriverAmount,
  setInsuranceAddress1,
  setInsuranceAmount,
  setInsuranceName,
  setInsuranceState,
  setIsClaimTabValid,
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
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayDamageSlice";
import ResponsibleParty from "./ResponsibleParty";
import InsuranceCompany from "./InsuranceCompany";
import DelayUnitCodeLookup from "../../../../LookupScreens/DelayUnitCode/DelayUnitCodeLookup";
const Claim = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const showResponsibleParty = useSelector((state) => state.delayDamage.showResponsibleParty);
  const showInsuranceCompany = useSelector((state) => state.delayDamage.showInsuranceCompany);

  const viewDetail = useSelector((state) => state.delayDamage.viewDetail);
  const claimsTabData = useSelector((state) => state.delayDamage.claimsTabData);
  const damageAmount = useSelector((state) => state.delayDamage.damageAmount);
  const companyAmount = useSelector((state) => state.delayDamage.companyAmount);
  const salvageAmount = useSelector((state) => state.delayDamage.salvageAmount);
  const driverAmount = useSelector((state) => state.delayDamage.driverAmount);
  const insuranceAmount = useSelector((state) => state.delayDamage.insuranceAmount);
  const responciblePartyAmount = useSelector((state) => state.delayDamage.responciblePartyAmount);
  const reserveAmount = useSelector((state) => state.delayDamage.reserveAmount);
  const maximumReserveAmount = useSelector((state) => state.delayDamage.maximumReserveAmount);
  const accumulatedBond = useSelector((state) => state.delayDamage.accumulatedBond);
  const totalBond = useSelector((state) => state.delayDamage.totalBond);
  const claimsVO = useSelector((state) => state.delayDamage.claimsVO);
  const responcibleName = useSelector((state) => state.delayDamage.responcibleName);
  const responcibleAddress1 = useSelector((state) => state.delayDamage.responcibleAddress1);
  const responcibleState = useSelector((state) => state.delayDamage.responcibleState);
  const insuranceName = useSelector((state) => state.delayDamage.insuranceName);
  const insuranceAddress1 = useSelector((state) => state.delayDamage.insuranceAddress1);
  const insuranceState = useSelector((state) => state.delayDamage.insuranceState);
  /*****Used for Weather Code Autocomplete and Lookup */
  const [weatherCodeList, setWeatherCodeList] = useState([]);
  const [weatherdelayUnitCodeSelection, setWeatherDelayUnitCodeSelection] = useState(false);
  const [weatherDelayedUnitCodeFK, setWeatherDelayedUnitCodeFK] = useState(null);
  const [weatherDelayedCodeInput, setWeatherDelayedCodeInput] = useState("");
  const [weatherDelayedCodeData, setweatherDelayedCodeData] = useState(null);
  const [showWeatherCodeLookup, setShowWeatherCodeLookup] = useState(false);
  /*****Used for Weather Code Autocomplete and Lookup */
  const [roadTypeCodeList, setRoadTypeCodeList] = useState([]);
  const [roadTypedelayUnitCodeSelection, setRoadTypeDelayUnitCodeSelection] = useState(false);
  const [roadTypeDelayedUnitCodeFK, setRoadTypeDelayedUnitCodeFK] = useState(null);
  const [roadTypeDelayedCodeInput, setRoadTypeDelayedCodeInput] = useState("");
  const [roadTypeDelayedCodeData, setRoadTypeDelayedCodeData] = useState(null);
  const [showroadTypeCodeLookup, setShowRoadTypeCodeLookup] = useState(false);
  /*****Used for Weather Code Autocomplete and Lookup */
  const [roadConditionCodeList, setRoadConditionCodeList] = useState([]);
  const [roadConditiondelayUnitCodeSelection, setRoadConditionDelayUnitCodeSelection] = useState(false);
  const [roadConditionDelayedUnitCodeFK, setRoadConditionDelayedUnitCodeFK] = useState(null);
  const [roadConditionDelayedCodeInput, setRoadConditionDelayedCodeInput] = useState("");
  const [roadConditionDelayedCodeData, setRoadConditionDelayedCodeData] = useState(null);
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
  const [insuranceCustomerAddressFK, setInsuranceCustomerAddressFK] = useState(null);
  /******Responsible Name,Address field ******/
  const [responsibleAddress2, setResponcibleAddress2] = useState("");
  const [responcibleCity, setResponcibleCity] = useState("");
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

  /*****
   * Get the Claims tab details for
   * the selected delay Unit Damage Record
   *****/
  useEffect(() => {
    if (id) {
      DelayDamageService.getClaimsTabDetails(id)
        .then((response) => {
          const { data } = response;
          const claimsTabDetails = data?.response?.damageClaimsDetails[0];
          dispatch(setClaimsTabData(claimsTabDetails));
        })
        .catch((err) => {
          //Navigate(`/delease-request`);
        });
    }
  }, [id]);

  /*****
   * Set the Responsible fields after the
   * details entered in the Responsibel Model
   * ****/
  useEffect(() => {
    if (!claimsTabData?.ResponcibleParty && !viewDetail) {
      dispatch(setResponcibleName(responcibleName));
      dispatch(setResponcibleAddress1(responcibleAddress1));
      dispatch(setResponcibleState(responcibleState));
    }
  }, [claimsTabData, viewDetail]);
  /*****
   * Set the Insurance fields after the
   * details entered in the  Model
   * ****/
  useEffect(() => {
    if (!claimsTabData?.InsuranceCompany && !viewDetail) {
      dispatch(setInsuranceName(insuranceName));
      dispatch(setInsuranceAddress1(insuranceAddress1));
      dispatch(setInsuranceState(insuranceState));
    }
  }, [claimsTabData, viewDetail]);

  /**Tab Validation***/
  useEffect(() => {
    if (
      !weatherDelayedUnitCodeFK ||
      !roadTypeDelayedUnitCodeFK ||
      !roadConditionDelayedUnitCodeFK ||
      injuries < 0 ||
      injuries > 32767 ||
      insuranceAmount === "." ||
      salvageAmount === "." ||
      damageAmount === "." ||
      responciblePartyAmount === "."
    ) {
      /**enable save if all conditions**/
      dispatch(setIsClaimTabValid(false));
    } else {
      /***disable save***/
      dispatch(setIsClaimTabValid(true));
    }
  }, [
    weatherDelayedUnitCodeFK,
    roadTypeDelayedUnitCodeFK,
    roadConditionDelayedUnitCodeFK,
    injuries,
    insuranceAmount,
    salvageAmount,
    responciblePartyAmount,
    damageAmount,
  ]);

  useEffect(() => {
    if (claimsTabData !== null && id !== null) {
      dispatch(setDamageAmount(claimsTabData?.DamageAmount ? claimsTabData?.DamageAmount : 0));
      dispatch(setDriverAmount(claimsTabData?.DriverAmount ? claimsTabData?.DriverAmount : 0));
      dispatch(setCompanyAmount(claimsTabData?.CompanyAmount ? claimsTabData?.CompanyAmount : 0));
      dispatch(setSalvageAmount(claimsTabData?.SalvageAmount ? claimsTabData?.SalvageAmount : 0));
      dispatch(setInsuranceAmount(claimsTabData?.InsuranceAmount ? claimsTabData?.InsuranceAmount : 0));
      dispatch(setReserveAmount(claimsTabData?.ReserveAmount ? claimsTabData?.ReserveAmount : 0));
      dispatch(
        setResponciblePartyAmount(
          claimsTabData?.ResponciblePartyAmount ? claimsTabData?.ResponciblePartyAmount : 0
        )
      );
      dispatch(
        setMaximumReserveAmount(claimsTabData?.MaximumReserveAmount ? claimsTabData?.MaximumReserveAmount : 0)
      );
      dispatch(setAccumulatedBond(claimsTabData?.AccumulatedBond ? claimsTabData?.AccumulatedBond : 0));
      dispatch(setTotalBond(claimsTabData?.TotalBond ? claimsTabData?.TotalBond : 0));
      setWeatherDelayedUnitCodeFK(
        claimsTabData?.WeatherDelayedUnitCodeFK ? claimsTabData?.WeatherDelayedUnitCodeFK : null
      );
      setWeatherDelayedCodeInput(claimsTabData?.Weather ? claimsTabData?.Weather : "");
      setRoadTypeDelayedUnitCodeFK(
        claimsTabData?.RoadTypeDelayedUnitCodeFK ? claimsTabData?.RoadTypeDelayedUnitCodeFK : null
      );
      setRoadTypeDelayedCodeInput(claimsTabData?.RoadType ? claimsTabData?.RoadType : "");
      setRoadConditionDelayedUnitCodeFK(
        claimsTabData?.RoadConditionDelayedUnitCodeFK ? claimsTabData?.RoadConditionDelayedUnitCodeFK : null
      );
      setRoadConditionDelayedCodeInput(claimsTabData?.RoadCondition ? claimsTabData?.RoadCondition : "");
      setDriverReported(claimsTabData?.DriverReported ? claimsTabData?.DriverReported : false);
      setDriverResponcible(claimsTabData?.DriverResponcible ? claimsTabData?.DriverResponcible : false);
      setDriverAtFault(claimsTabData?.DriverAtFault ? claimsTabData?.DriverAtFault : false);
      setDrugTest(claimsTabData?.DrugTest ? claimsTabData?.DrugTest : false);
      setAlcoholTest(claimsTabData?.AlcoholTest ? claimsTabData?.AlcoholTest : false);
      setMajorDamage(claimsTabData?.MajorDamage ? claimsTabData?.MajorDamage : false);
      setTotaled(claimsTabData?.Totaled ? claimsTabData?.Totaled : false);
      setAccident(claimsTabData?.Accident ? claimsTabData?.Accident : false);
      setPreventable(claimsTabData?.Preventable ? claimsTabData?.Preventable : false);
      setInjuries(claimsTabData?.Injuries ? claimsTabData?.Injuries : "");
      setDOTReportable(claimsTabData?.DOTReportable ? claimsTabData?.DOTReportable : false);
      setDriverRemedial(claimsTabData?.DriverRemedial ? claimsTabData?.DriverRemedial : false);
      setStoreCode(claimsTabData?.StoreCode ? claimsTabData?.StoreCode?.trim() : "");
      setAction(claimsTabData?.Action ? claimsTabData?.Action : "");
      setFactory(claimsTabData?.Factory ? claimsTabData?.Factory : false);
      setOurInsuranceLiabilityNumber(
        claimsTabData?.OurInsuranceLiabilityNumber ? claimsTabData?.OurInsuranceLiabilityNumber : ""
      );
      setResponcibleParty(claimsTabData?.ResponcibleParty ? claimsTabData?.ResponcibleParty : false);
      setResponciblePartyCustomerAddressFK(
        claimsTabData?.ResponciblePartyCustomerAddressFK
          ? claimsTabData?.ResponciblePartyCustomerAddressFK
          : ""
      );
      setInsuranceLiabilityNumber(
        claimsTabData?.TheirInsuranceLiabilityNumber ? claimsTabData?.TheirInsuranceLiabilityNumber : ""
      );
      setInsuranceCustomerAddressFK(
        claimsTabData?.InsuranceCustomerAddressFK ? claimsTabData?.InsuranceCustomerAddressFK : null
      );
      dispatch(setResponcibleName(claimsTabData?.Responsible_Name ? claimsTabData?.Responsible_Name : ""));
      dispatch(
        setResponcibleAddress1(claimsTabData?.Responsible_Address1 ? claimsTabData?.Responsible_Address1 : "")
      );
      setResponcibleCity(claimsTabData?.Responsible_City ? claimsTabData?.Responsible_City : "");
      dispatch(
        setResponcibleState(claimsTabData?.Responsible_Statecode ? claimsTabData?.Responsible_Statecode : "")
      );
      setInsuranceCompany(claimsTabData?.InsuranceCompany ? claimsTabData?.InsuranceCompany : false);
      dispatch(setInsuranceName(claimsTabData?.Insurance_Name ? claimsTabData?.Insurance_Name : ""));
      dispatch(
        setInsuranceAddress1(claimsTabData?.Insurance_Address1 ? claimsTabData?.Insurance_Address1 : "")
      );
      setInsuranceCity(claimsTabData?.Insurance_City ? claimsTabData?.Insurance_City : "");
      dispatch(
        setInsuranceState(claimsTabData?.Insurance_Statecode ? claimsTabData?.Insurance_Statecode : "")
      );
    }
  }, [claimsTabData]);

  /*****
   * Setting the data for Claims Tab
   * *****/
  const claimsTabFormData = () => {
    const data = {
      ...claimsVO,
      delayUnitDamagePK: id,
      DamageAmount: damageAmount,
      DriverAmount: driverAmount,
      SavingsAmount: salvageAmount,
      CompanyAmount: companyAmount,
      InsuranceAmount: insuranceAmount,
      ResponciblePartyAmount: responciblePartyAmount,
      MaximumReserveAmount: maximumReserveAmount ? maximumReserveAmount : 0,
      ResponcibleParty: responcibleParty ? 1 : 0,
      InsuranceCompany: insuranceCompany ? 1 : 0,
      ResponciblePartyCustomerAddressFK: responciblePartyCustomerAddressFK,
      InsuranceCustomerAddressFK: insuranceCustomerAddressFK,
      DriverResponcible: driverResponcible ? 1 : 0,
      DriverReported: driverReported ? 1 : 0,
      DriverAtFault: driverAtFault ? 1 : 0,
      DrugTest: drugTest ? 1 : 0,
      AlcoholTest: alcoholTest ? 1 : 0,
      MajorDamage: majorDamage ? 1 : 0,
      Totaled: totaled ? 1 : 0,
      Accident: accident ? 1 : 0,
      Preventable: preventable ? 1 : 0,
      Injuries: injuries ? injuries : "",
      DOTReportable: dOTReportable ? 1 : 0,
      DriverRemedial: driverRemedial ? 1 : 0,
      StoreCode: storeCode ? storeCode : "",
      Action: action ? action : "",
      Factory: factory ? 1 : 0,
      OurInsuranceLiabilityNumber: ourInsuranceLiabilityNumber,
      RoadTypeDelayedUnitCodeFK: roadTypeDelayedUnitCodeFK,
      RoadConditionDelayedUnitCodeFK: roadConditionDelayedUnitCodeFK,
      WeatherDelayedUnitCodeFK: weatherDelayedUnitCodeFK,
    };
    dispatch(setClaimsVO(data));
  };

  useEffect(() => {
    claimsTabFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    id,
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
    roadTypeDelayedUnitCodeFK,
    roadConditionDelayedUnitCodeFK,
    weatherDelayedUnitCodeFK,
  ]);

  /*******
   * Fetch the Delay Unit Damage Data
   * ******/
  const fetchDelayUnitCode = (string, filterType) => {
    DelayDamageService.getdelayUnitCodeForAutoComplete(string, 0, 100, "Beginning", "", 0, filterType)
      .then((response) => {
        const { data } = response;
        const unitCodeData = data?.response.DelayedCodeList; // Slice everything except the last item
        const pagination = data?.response.PageDetails[0]; // Get only the last item (or empty array if data is empty)
        if (filterType === "Weather") {
          setWeatherCodeList(unitCodeData);
        } else if (filterType === "RoadType") {
          setRoadTypeCodeList(unitCodeData);
        } else if (filterType === "RoadCondition") {
          setRoadConditionCodeList(unitCodeData);
        }
      })
      .catch((err) => {});
  };
  /*****Weather Delayed Unit Code******/
  const hideDelayUnitCodeModal = () => {
    setWeatherDelayUnitCodeSelection(false);
  };
  const handleDelayUnitCodeLookupModalShow = () => {
    setWeatherDelayUnitCodeSelection(true);
  };
  /****** Weather Delayed Look Up Selection*****/
  const handleWeatherUnitCodeLookupSelection = (data) => {
    setWeatherDelayedCodeInput(data?.Description);
    setWeatherDelayedUnitCodeFK(data?.DelayedUnitCodePK);
    setWeatherDelayUnitCodeSelection(false);
  };

  /*****Road Type Delayed Unit Code******/
  const hideRoadTypeDelayUnitCodeModal = () => {
    setRoadTypeDelayUnitCodeSelection(false);
  };
  const handleRoadTypeDelayUnitCodeLookupModalShow = () => {
    setRoadTypeDelayUnitCodeSelection(true);
  };
  const handleRoadTypeUnitCodeLookupSelection = (data) => {
    setRoadTypeDelayedCodeInput(data?.Description);
    setRoadTypeDelayedUnitCodeFK(data?.DelayedUnitCodePK);
    setRoadTypeDelayUnitCodeSelection(false);
  };

  /*****Road Condition Delayed Unit Code******/
  const hideRoadConditionDelayUnitCodeModal = () => {
    setRoadConditionDelayUnitCodeSelection(false);
  };
  const handleRoadConditionDelayLookupModalShow = () => {
    setRoadConditionDelayUnitCodeSelection(true);
  };
  const handleRoadConditionUnitCodeLookupSelection = (data) => {
    setRoadConditionDelayedCodeInput(data?.Description);
    setRoadConditionDelayedUnitCodeFK(data?.DelayedUnitCodePK);
    setRoadConditionDelayUnitCodeSelection(false);
  };

  /****To view the responsible and Insurance Modal Pop Up****/
  const handleResponcibleModalShow = () => {
    dispatch(setShowResponsibleParty(true));
  };
  const handleInsuranceModalShow = () => {
    dispatch(setshowInsuranceCompany(true));
  };

  useEffect(() => {
    if (!viewDetail) {
      const salvage = Number(salvageAmount);
      const insurance = Number(insuranceAmount);
      const responsible = Number(responciblePartyAmount);
      const damage = Number(damageAmount);
      const company = damage - (salvage + insurance + responsible);
      dispatch(setCompanyAmount(company));
    }
  }, [damageAmount, salvageAmount, insuranceAmount, responciblePartyAmount]);

  /*** Allow  limit to one digit****/
  const handleInputChange = (event) => {
    const value = event.target.value;
    const sanitizedValue = value?.replace(/[^0-9]/g, "")?.slice(0, 1);
    setAction(sanitizedValue);
  };

  /****Ente only number *****/
  const isNumber = (value) => {
    if (!value) return value;
    const number = value?.replace(/[^\d:.]/g, "");
    if (value) return number;
  };
  return (
    <Form /* on={formik.handle} */>
      <div className={"p-15 w-100"}>
        <Row className="m-0 p-0">
          <Col sm={4} md={4} xs={4} className="p-0">
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Damage Amount</Form.Label>
              </Col>

              <Col xs={4} md={4} sm={4} className="p-0">
                <input
                  type="text"
                  id="damageamount"
                  value={damageAmount}
                  name="damageamount"
                  maxLength={30}
                  disabled={viewDetail}
                  autoComplete="new-password"
                  className={`customFormControl ${
                    viewDetail
                      ? "borderBlack"
                      : parseFloat(damageAmount) === 0 || damageAmount === "."
                        ? "borderRed"
                        : ""
                  }`}
                  aria-autocomplete="list"
                  onChange={(e) => {
                    e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                      dispatch(setDamageAmount(isNumber(e.target.value)));
                  }}
                  onBlur={() => {
                    if (!viewDetail && (driverAtFault || driverResponcible)) {
                      const reserve = Math.min(damageAmount, maximumReserveAmount);
                      dispatch(setReserveAmount(reserve));
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

              <Col xs={4} md={4} sm={4} className="p-0">
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

              <Col xs={4} md={4} sm={4} className="p-0">
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

              <Col xs={4} md={4} sm={4} className="p-0">
                <input
                  type="text"
                  id="SalvageAmount"
                  value={salvageAmount}
                  name="SalvageAmount"
                  maxLength={30}
                  disabled={viewDetail}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  className={`customFormControl ${
                    viewDetail ? "borderBlack" : salvageAmount === "." ? "borderRed" : ""
                  }`}
                  onChange={(e) => {
                    e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                      dispatch(setSalvageAmount(isNumber(e.target.value)));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Insurance Amount</Form.Label>
              </Col>

              <Col xs={4} md={4} sm={4} className="p-0">
                <input
                  type="text"
                  id="insuranceamount"
                  value={insuranceAmount}
                  name="insuranceamount"
                  maxLength={30}
                  disabled={viewDetail || !insuranceCompany}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  className={`customFormControl ${
                    viewDetail || !insuranceCompany
                      ? "borderBlack"
                      : insuranceAmount === "."
                        ? "borderRed"
                        : ""
                  }`}
                  onChange={(e) => {
                    e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                      dispatch(setInsuranceAmount(isNumber(e.target.value)));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Responsible Party Amount</Form.Label>
              </Col>

              <Col xs={4} md={4} sm={4} className="p-0">
                <input
                  type="text"
                  id="responciblepartyamount"
                  value={responciblePartyAmount}
                  name="responciblepartyamount"
                  maxLength={30}
                  disabled={viewDetail || !responcibleParty}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  className={`customFormControl ${
                    viewDetail || !responcibleParty
                      ? "borderBlack"
                      : responciblePartyAmount === "."
                        ? "borderRed"
                        : ""
                  }`}
                  onChange={(e) => {
                    e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                      dispatch(setResponciblePartyAmount(isNumber(e.target.value)));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="m-t-65  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Reserve Amount</Form.Label>
              </Col>

              <Col xs={4} md={4} sm={4} className="p-0">
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

              <Col xs={4} md={4} sm={4} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="maxreservedamount"
                  value={maximumReserveAmount}
                  name="maxreservedamount"
                  maxLength={30}
                  disabled
                  autoComplete="new-password"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Accumulated bond</Form.Label>
              </Col>

              <Col xs={4} md={4} sm={4} className="p-0">
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

              <Col xs={4} md={4} sm={4} className="p-0">
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

              <Col
                xs={7}
                className={`p-0 d-flex`} /* hidden={shouldHideButton("delayed-details") && viewOnly} */
              >
                <AutoCompleteDropdown
                  className={`customFormControl ${
                    viewDetail === true
                      ? ""
                      : weatherDelayedUnitCodeFK && weatherDelayedCodeInput
                        ? "borderGreen"
                        : "borderRed"
                  }`}
                  arrayList={weatherCodeList}
                  searchString={weatherDelayedCodeInput}
                  renderItemId={(item) => item.DelayedUnitCodePK}
                  renderItemField={(item) => item.Description}
                  handleSearchString={(string) => {
                    setWeatherDelayedCodeInput(string);
                  }}
                  fetchDataBySearchString={(string) => fetchDelayUnitCode(string, "Weather")}
                  onSelect={handleWeatherUnitCodeLookupSelection}
                  selectedId={weatherDelayedUnitCodeFK}
                  disabled={viewDetail}
                  clearInputCallback={() => {}}
                />
                <LookupButton onClick={handleDelayUnitCodeLookupModalShow} hidden={viewDetail} />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Road Type code</Form.Label>
              </Col>

              <Col
                xs={7}
                className={`p-0 d-flex`} /* hidden={shouldHideButton("delayed-details") && viewOnly} */
              >
                <AutoCompleteDropdown
                  className={`customFormControl ${
                    viewDetail === true
                      ? ""
                      : roadTypeDelayedUnitCodeFK && roadTypeDelayedCodeInput
                        ? "borderGreen"
                        : "borderRed"
                  }`}
                  arrayList={roadTypeCodeList}
                  searchString={roadTypeDelayedCodeInput}
                  renderItemId={(item) => item.DelayedUnitCodePK}
                  renderItemField={(item) => item.Description}
                  handleSearchString={(string) => {
                    setRoadTypeDelayedCodeInput(string);
                  }}
                  fetchDataBySearchString={(string) => fetchDelayUnitCode(string, "RoadType")}
                  onSelect={handleRoadTypeUnitCodeLookupSelection}
                  selectedId={roadTypeDelayedUnitCodeFK}
                  disabled={viewDetail}
                  clearInputCallback={() => {}}
                />
                <LookupButton onClick={handleRoadTypeDelayUnitCodeLookupModalShow} hidden={viewDetail} />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Road Condition Code</Form.Label>
              </Col>

              <Col
                xs={7}
                className={`p-0 d-flex`} /* hidden={shouldHideButton("delayed-details") && viewOnly} */
              >
                <AutoCompleteDropdown
                  className={`customFormControl ${
                    viewDetail === true
                      ? ""
                      : roadConditionDelayedUnitCodeFK && roadConditionDelayedCodeInput
                        ? "borderGreen"
                        : "borderRed"
                  }`}
                  arrayList={roadConditionCodeList}
                  searchString={roadConditionDelayedCodeInput}
                  renderItemId={(item) => item.DelayedUnitCodePK}
                  renderItemField={(item) => item.Description}
                  handleSearchString={(string) => {
                    setRoadConditionDelayedCodeInput(string);
                  }}
                  fetchDataBySearchString={(string) => fetchDelayUnitCode(string, "RoadCondition")}
                  onSelect={handleRoadConditionUnitCodeLookupSelection}
                  selectedId={roadConditionDelayedUnitCodeFK}
                  disabled={viewDetail}
                  clearInputCallback={() => {}}
                />
                <LookupButton onClick={handleRoadConditionDelayLookupModalShow} hidden={viewDetail} />
              </Col>
            </Form.Group>
          </Col>

          <Col sm={3} md={3} xs={3} className="p-0 m-l-3">
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={5} md={5} xs={5} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Driver Reported</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="driverrepoted"
                  name="driverreported "
                  checked={driverReported}
                  disabled={viewDetail}
                  onChange={(e) => {
                    setDriverReported(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={5} md={5} xs={5} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Driver Responsible</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="DriverResponcible"
                  name="DriverResponcible"
                  checked={driverResponcible}
                  disabled={viewDetail || driverAtFault || responcibleParty}
                  onChange={(e) => {
                    setDriverResponcible(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={5} md={5} xs={5} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Driver At Fault</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="driveratfault"
                  name="driveratfault"
                  checked={driverAtFault}
                  disabled={viewDetail || driverResponcible || responcibleParty}
                  onChange={(e) => {
                    setDriverAtFault(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={5} md={5} xs={5} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Require Drug Test</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="rdrugtest"
                  name="requiredrugtest"
                  checked={drugTest}
                  disabled={viewDetail || claimsTabData?.DrugTest}
                  onChange={(e) => {
                    setDrugTest(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={5} md={5} xs={5} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Require Alcohol Test</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="alcoholTest"
                  name="alcoholTest"
                  checked={alcoholTest}
                  disabled={viewDetail || claimsTabData?.AlcoholTest}
                  onChange={(e) => {
                    setAlcoholTest(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={5} md={5} xs={5} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Major Damage</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="majordamage"
                  name="majordamage"
                  checked={majorDamage}
                  disabled={viewDetail || totaled}
                  onChange={(e) => {
                    setMajorDamage(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={5} md={5} xs={5} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Unit Totaled</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="unittotaled"
                  name="unittotaled"
                  checked={totaled}
                  disabled={viewDetail || majorDamage}
                  onChange={(e) => {
                    setTotaled(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={5} md={5} xs={5} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Accident</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="Accident"
                  name="Accident"
                  checked={accident}
                  disabled={viewDetail}
                  onChange={(e) => {
                    setAccident(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={5} md={5} xs={5} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Preventable</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="preventable"
                  name="preventable"
                  checked={preventable}
                  disabled={viewDetail || !accident}
                  onChange={(e) => {
                    setPreventable(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={5} md={5} xs={5} className="p-0">
                <Form.Label className="col-form-label dealer-label">Injuries</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl ${!viewDetail ? (!(injuries >= 0 && injuries <= 32767) ? "borderRed" : "") : ""}`}
                  id="Injuries"
                  value={injuries}
                  name="injuries"
                  maxLength={6}
                  disabled={viewDetail || !accident}
                  aria-autocomplete="list"
                  onChange={(e) => {
                    setInjuries(isNumber(e.target.value));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={5} md={5} xs={5} className="p-0">
                <Form.Label className=" col-form-label dealer-label">DOT Reportable</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="Dotraportable"
                  name="Dotraportable"
                  checked={dOTReportable}
                  disabled={viewDetail}
                  onChange={(e) => {
                    setDOTReportable(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={5} md={5} xs={5} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Driver Remedial</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="driverremedial"
                  name="driverremedial"
                  checked={driverRemedial}
                  disabled={viewDetail}
                  onChange={(e) => {
                    setDriverRemedial(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={5} md={5} xs={5} className="p-0">
                <Form.Label className="col-form-label dealer-label">Store Code</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="storecode"
                  value={storeCode}
                  name="storecode"
                  maxLength={4}
                  disabled={viewDetail}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    setStoreCode(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={5} md={5} xs={5} className="p-0">
                <Form.Label className="col-form-label dealer-label">Action</Form.Label>
              </Col>
              <Col xs={2} className={`p-0 d-flex`}>
                <input
                  type="number"
                  className={`customFormControl ${
                    viewDetail
                      ? ""
                      : action && action >= 0 && action <= 9 && action.toString().length === 1
                        ? ""
                        : "borderRed"
                  }`}
                  id="action"
                  value={action}
                  min={0}
                  max={9}
                  disabled={viewDetail}
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
              <Col sm={5} md={5} xs={5} className="p-0">
                <Form.Label className=" col-form-label dealer-label">Factory</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="factory"
                  name="factory"
                  checked={factory}
                  disabled={viewDetail}
                  onChange={(e) => {
                    setFactory(e.target.checked);
                  }}
                />
              </Col>
            </Form.Group>
          </Col>

          <Col sm={5} md={5} xs={5} className="p-0 m-l-">
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
                  disabled={viewDetail}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    isNumber(e.target.value);
                    setOurInsuranceLiabilityNumber(isNumber(e.target.value));
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
                  disabled={
                    viewDetail || claimsTabData?.ResponcibleParty || driverResponcible || driverAtFault
                  }
                  onChange={(e) => {
                    setResponcibleParty(e.target.checked);
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
                <LookupButton onClick={handleResponcibleModalShow} disabled={!responcibleParty} />
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
                  disabled={
                    viewDetail ||
                    claimsTabData?.InsuranceCompany ||
                    responcibleParty ||
                    driverAtFault ||
                    driverResponcible
                  }
                  onChange={(e) => {
                    setInsuranceCompany(e.target.checked);
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
                  disabled={viewDetail || claimsTabData?.InsuranceCompany}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    setInsuranceLiabilityNumber(isNumber(e.target.value));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Insurance Company</Form.Label>
              </Col>

              <Col
                xs={6}
                className={`p-0 d-flex`} /* hidden={shouldHideButton("delayed-details") && viewOnly} */
              >
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
                <LookupButton onClick={handleInsuranceModalShow} disabled={!insuranceCompany} />
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
          </Col>
        </Row>
      </div>
      <ResponsibleParty
        show={showResponsibleParty}
        onHide={() => dispatch(setShowResponsibleParty(false))}
        viewDetail={false}
      />

      <InsuranceCompany
        show={showInsuranceCompany}
        onHide={() => dispatch(setshowInsuranceCompany(false))}
        viewDetail={false}
      />
      <DelayUnitCodeLookup
        show={weatherdelayUnitCodeSelection}
        onHide={hideDelayUnitCodeModal}
        renderItemId={(data) => data?.DelayedUnitCodePK}
        renderItemField={(data) => data?.Description}
        handleLookupSelection={handleWeatherUnitCodeLookupSelection}
        weather
      />
      <DelayUnitCodeLookup
        show={roadTypedelayUnitCodeSelection}
        onHide={hideRoadTypeDelayUnitCodeModal}
        renderItemId={(data) => data?.DelayedUnitCodePK}
        renderItemField={(data) => data?.Description}
        handleLookupSelection={handleRoadTypeUnitCodeLookupSelection}
        roadType
      />
      <DelayUnitCodeLookup
        show={roadConditiondelayUnitCodeSelection}
        onHide={hideRoadConditionDelayUnitCodeModal}
        renderItemId={(data) => data?.DelayedUnitCodePK}
        renderItemField={(data) => data?.Description}
        handleLookupSelection={handleRoadConditionUnitCodeLookupSelection}
        roadCondition
      />
    </Form>
  );
};

export default Claim;
