import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DateInputField from "../../../../../common/DateInputField";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../common/LookupButton";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccumulatedBond,
  setCompanyAmount,
  setCompanyCheckPayToFK,
  setCompanyCheckPayToInput,
  setDelayedUnitFK,
  setDelayRequestFormData,
  setDescription,
  setDisableSave,
  setDriverAmount,
  setPostalCodePK,
  setTotalAmount,
  setUnitFK,
} from "../../../../../../redux/DispatchDelay/DelayProcessing/DelayUnitCheckRequestSlice";
import DriverBondFundService from "../../../../../../services/DriverBondFundService";
import CheckPayToService from "../../../../../../services/CheckPayToService";
import CheckPayToLookup from "../../../../../LookupScreens/CheckPayTo/CheckPayToLookup";
import DelayUnitCheckRequestService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayUnitCheckRequestService";

function General() {
  const { checkRequestid, id, driverfk } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const delayRequestRecord = useSelector((state) => state.delayCheckRequest.delayRequestRecord);
  const postalCodePK = useSelector((state) => state.delayCheckRequest.postalCodePK);
  const viewDetail = useSelector((state) => state.delayCheckRequest.viewDetail);
  const totalAmount = useSelector((state) => state.delayCheckRequest.totalAmount);
  const companyAmount = useSelector((state) => state.delayCheckRequest.companyAmount);
  const driverAmount = useSelector((state) => state.delayCheckRequest.driverAmount);
  const unitFK = useSelector((state) => state.delayCheckRequest.unitFK);
  const changesCancelled = useSelector((state) => state.delayCheckRequest.changesCancelled);
  const isCancelledClicked = useSelector((state) => state.delayCheckRequest.isCancelledClicked);
  const accumulatedBond = useSelector((state) => state.delayCheckRequest.accumulatedBond);
  const [checkDescription, setCheckDescription] = useState(false);
  const disableSave = useSelector((state) => state.delayCheckRequest.disableSave);
  const description = useSelector((state) => state.delayCheckRequest.description);
  const damageDriverFK = driverfk;
  const [isCheckDateFormat, setIsCheckDateFormat] = useState(true);
  const [repairOrderNumber, setRepairOrderNumber] = useState("");
  const [repairInvoiceNumber, setRepairInvoiceNumber] = useState("");
  const [vcb, setVcb] = useState("");
  const [companyCheckNumber, setCompanyCheckNumber] = useState("");
  const [companyCheckDate, setCompanyCheckDate] = useState("");
  const [companyCheckName, setCompanyCheckName] = useState("");
  const [companyCheckAddress1, setCompanyCheckAddress1] = useState("");
  const [companyCheckAddress2, setCompanyCheckAddress2] = useState("");
  const [companyCheckCity, setCompanyCheckCity] = useState("");
  const [companyCheckStateCode, setCompanyCheckStateCode] = useState("");
  const [companyCheckPostalCode, setCompanyCheckPostalCode] = useState("");
  const [companyCanadian, setCompanyCanadian] = useState("");

  const [driverCheckName, setDriverCheckName] = useState("");
  const [driverCheckAddress1, setDriverCheckAddress1] = useState("");
  const [driverCheckAddress2, setDriverCheckAddress2] = useState("");
  const [driverCheckCity, setDriverCheckCity] = useState("");
  const [driverCheckStateCode, setDriverCheckStateCode] = useState("");
  const [driverCheckPostalCode, setDriverCheckPostalCode] = useState("");
  const [driverCheckCanadian, setDriverCheckCanadian] = useState("");

  const [checkPayToList, setCheckPayToList] = useState([]);
  const [checkPayToFK, setCheckPayToFK] = useState(null);
  const [checkPayToInput, setCheckPayToInput] = useState("");
  const [checkPayToData, setcheckPayToData] = useState(null);
  const [showCheckPayToLookup, setShowCheckPayToLookup] = useState(false);
  const [checkPayFlag, setCheckPayFlag] = useState(false);
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);

  const [companyCheckPayToList, setCompanyCheckPayToList] = useState([]);
  const [companycheckPayToFK, setCompanyCheckPayToFK] = useState(null);
  const [companycheckPayToInput, setCompanyCheckPayToInput] = useState("");
  const [companycheckPayToData, setCompanycheckPayToData] = useState(null);
  const [showCompanyCheckPayToLookup, setShowCompanyCheckPayToLookup] = useState(false);
  const [companyPostalCodePK, setCompanyPostalCodePK] = useState(null);
  const [companyCheckPayFlag, setCompanyCheckPayFlag] = useState(false);
  const companyInitialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [companyPostalOptions, setCompanyPostalValues] = useState(initialValue);
  const [companyCheckPrinted, setCompanyCheckPrinted] = useState(false);
  const [totalAmountExceeded, setTotalAmountExceeded] = useState(false);
  const [checkpayDriverLoading, setCheckpayDriverLoading] = useState(false);
  const [checkpayCompanyLoading, setCheckpayCompanyLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const [accbond, setAccbond] = useState("");
  const [damageAmount, setDamageAmount] = useState("");
  const [reserveAmount, setReserveAmount] = useState("");

  /******Populate the data in the corresponding fields******/
  useEffect(() => {
    if (delayRequestRecord !== null) {
      dispatch(setDescription(delayRequestRecord?.Description ? delayRequestRecord.Description : ""));
      setRepairOrderNumber(delayRequestRecord?.RepairOrderNumber ? delayRequestRecord.RepairOrderNumber : "");
      setRepairInvoiceNumber(
        delayRequestRecord?.RepairInvoiceNumber ? delayRequestRecord.RepairInvoiceNumber : ""
      );
      setVcb(delayRequestRecord?.VCB ? delayRequestRecord.VCB : "");
      setCompanyCheckNumber(
        delayRequestRecord?.CompanyCheckNumber ? delayRequestRecord.CompanyCheckNumber : ""
      );
      setCompanyCheckDate(delayRequestRecord?.CompanyCheckDate ? delayRequestRecord.CompanyCheckDate : "");
      setCompanyCheckName(delayRequestRecord?.CompanyCheckName ? delayRequestRecord.CompanyCheckName : "");
      setCompanyCheckAddress1(
        delayRequestRecord?.CompanyCheckAddress1 ? delayRequestRecord.CompanyCheckAddress1 : ""
      );
      setCompanyCheckAddress2(
        delayRequestRecord?.CompanyCheckAddress2 ? delayRequestRecord.CompanyCheckAddress2 : ""
      );
      setCompanyCheckCity(delayRequestRecord?.CompanyCheckCity ? delayRequestRecord.CompanyCheckCity : "");
      setCompanyCheckStateCode(
        delayRequestRecord?.CompanyCheckStateCode ? delayRequestRecord.CompanyCheckStateCode : ""
      );
      setCompanyCheckPostalCode(
        delayRequestRecord?.CompanyCheckPostalCode ? delayRequestRecord.CompanyCheckPostalCode : ""
      );
      setDriverCheckName(delayRequestRecord?.DriverCheckName ? delayRequestRecord.DriverCheckName : "");
      setDriverCheckAddress1(
        delayRequestRecord?.DriverCheckAddress1 ? delayRequestRecord.DriverCheckAddress1 : ""
      );
      setDriverCheckAddress2(
        delayRequestRecord?.DriverCheckAddress2 ? delayRequestRecord.DriverCheckAddress2 : ""
      );
      setDriverCheckCity(delayRequestRecord?.DriverCheckCity ? delayRequestRecord.DriverCheckCity : "");
      setDriverCheckStateCode(
        delayRequestRecord?.DriverCheckStateCode ? delayRequestRecord.DriverCheckStateCode : ""
      );
      setDriverCheckPostalCode(
        delayRequestRecord?.DriverCheckPostalCode ? delayRequestRecord.DriverCheckPostalCode : ""
      );
      dispatch(
        setCompanyAmount(delayRequestRecord?.CompanyCheckAmount ? delayRequestRecord.CompanyCheckAmount : "")
      );
      dispatch(setTotalAmount(delayRequestRecord?.TotalAmount ? delayRequestRecord.TotalAmount : ""));

      dispatch(
        setDriverAmount(delayRequestRecord?.DriverCheckAmount ? delayRequestRecord.DriverCheckAmount : "")
      );
      dispatch(setUnitFK(delayRequestRecord?.UnitFK ? delayRequestRecord.UnitFK : ""));
      dispatch(setDelayedUnitFK(delayRequestRecord?.DelayedUnitFK ? delayRequestRecord.DelayedUnitFK : ""));
      dispatch(setPostalCodePK(delayRequestRecord?.PostalCodePK ? delayRequestRecord.PostalCodePK : ""));
      setCompanyPostalCodePK(
        delayRequestRecord?.CompanyPostalCodePK ? delayRequestRecord.CompanyPostalCodePK : ""
      );
      dispatch(setAccumulatedBond(delayRequestRecord?.AccumulatedBond ?? ""));
      setDamageAmount(delayRequestRecord?.DamageAmount);
      setReserveAmount(delayRequestRecord?.ReserveAmount);
    }
  }, [delayRequestRecord, changesCancelled]);

  useEffect(() => {
    if (delayRequestRecord === null) {
      dispatch(setDriverAmount(""));
      dispatch(setCompanyAmount(""));
    }
  }, [delayRequestRecord]);

  useEffect(() => {
    if (checkRequestid == null && id != null) {
      fetchDataById(id);
    }
  }, [checkRequestid, id]);

  /******fetch the data from damage if new record is creating****/
  const fetchDataById = (id) => {
    setLoader(true);
    DelayUnitCheckRequestService.getCheckRequestData(id)
      .then((response) => {
        const data = response?.data[0];
        setAccbond(data?.AccumulatedBond);
        setDamageAmount(data?.DamageAmount);
        setReserveAmount(data?.ReserveAmount);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error fetching Check Request data:", error);
        setLoader(false);
      });
  };

  useEffect(() => {
    if (isCancelledClicked && viewDetail) {
      setCompanyCheckPayToInput("");
      setCheckPayToInput("");
    }
  }, [isCancelledClicked, viewDetail]);

  /*****
   * Unique Descriptio Checking
   * ****/
  useEffect(() => {
    if (viewDetail) {
      setCheckDescription(false);
    }
  }, [viewDetail]);

  /*******Check Pay to Fetch function browse*******/
  const fetchCheckPayToByName = (string) => {
    setCheckpayDriverLoading(true);
    DriverBondFundService.fetchCheckPayToByName(string)
      .then(({ data }) => {
        setCheckPayToList(data?.content);
        setCheckpayDriverLoading(false);
      })
      .catch((error) => {
        setCheckpayDriverLoading(false);
      })
      .finally(() => {
        setCheckpayDriverLoading(false);
      });
  };

  /*******Check Pay to Fetch function browse*******/
  const fetchCompanyCheckPayToByName = (string) => {
    setCheckpayCompanyLoading(true);
    DriverBondFundService.fetchCheckPayToByName(string)
      .then(({ data }) => {
        setCompanyCheckPayToList(data?.content);
      })
      .catch((error) => {
        setCheckpayCompanyLoading(false);
      })
      .finally(() => {
        setCheckpayCompanyLoading(false);
      });
  };
  /**************Driver Check Pay To By Id ***************/
  const fetchCheckPayToById = (id) => {
    if (id) {
      CheckPayToService.getCheckPayToById(id).then(({ data }) => {
        setcheckPayToData(data);
        setCheckPayToInput(data?.description?.trim());
        setDriverCheckName(data?.name);
        setDriverCheckAddress1(data?.address1);
        setDriverCheckAddress2(data?.address2);
        setDriverCheckCanadian(data?.canadian);
        setDriverCheckCity(data?.city);
        setDriverCheckStateCode(data?.stateCode);
        setDriverCheckPostalCode(data?.postalCode);
        dispatch(setPostalCodePK(data?.postalCodePK));
      });
    }
  };

  /**************Driver Check Pay To By Id ***************/
  const fetchCompanyCheckPayToById = (id) => {
    if (id) {
      CheckPayToService.getCheckPayToById(id).then(({ data }) => {
        setCompanycheckPayToData(data);
        setCompanyCheckPayToInput(data?.description?.trim());
        setCompanyCheckName(data?.name);
        setCompanyCheckAddress1(data?.address1);
        setCompanyCheckAddress2(data?.address2);
        setCompanyCanadian(data?.canadian);
        setCompanyCheckCity(data?.city);
        setCompanyCheckStateCode(data?.stateCode);
        setCompanyCheckPostalCode(data?.postalCode);
        setCompanyPostalCodePK(data?.postalCodePK);
      });
    }
  };

  /****
   * API to fetch for Company and Driver Postal Code
   * *****/
  useEffect(() => {
    fetchCheckPayToById(checkPayToFK);
  }, [checkPayToFK]);

  useEffect(() => {
    fetchCompanyCheckPayToById(companycheckPayToFK);
  }, [companycheckPayToFK]);

  /**************Driver Check Pay To Lookup Show **************/
  const handleCheckPayToLookupModalShow = () => {
    setShowCheckPayToLookup(true);
  };
  /**************Driver Check Pay To Lookup Handle function ***************/
  const handleCheckPayToLookupSelection = (checkPayTo) => {
    setCheckPayToFK(checkPayTo.id);
    setCheckPayToInput(checkPayTo.description?.trim());
    setShowCheckPayToLookup(false);
    setCheckPayFlag(true);
  };

  /************** Driver Check Pay To Lookup Hide ***************/
  const hideCheckPayToLookup = () => {
    setShowCheckPayToLookup(false);
  };

  /**************Driver Check Pay To Lookup Show **************/
  const handleCompanyCheckPayToLookupModalShow = () => {
    setShowCompanyCheckPayToLookup(true);
  };
  /**************Driver Check Pay To Lookup Handle function ***************/
  const handleCompanyCheckPayToLookupSelection = (checkPayTo) => {
    setCompanyCheckPayToFK(checkPayTo.id);
    setCompanyCheckPayToInput(checkPayTo.description?.trim());
    setShowCompanyCheckPayToLookup(false);
    setCompanyCheckPayFlag(true);
  };

  /************** Driver Check Pay To Lookup Hide ***************/
  const hideCompanyCheckPayToLookup = () => {
    setShowCompanyCheckPayToLookup(false);
  };

  /***
   *Checking Description in unique or not
   ****/
  const handleCheckDescription = (description) => {
    DelayUnitCheckRequestService.checkValidDescription(description, checkRequestid)
      .then((res) => {
        setCheckDescription(res?.data);
      })
      .catch((err) => {
        console.log(err);
        navigate(`/delay-unit-check-request/${driverfk}/${id}`);
      });
  };
  /********
   * Used for Number Validation
   * ******/
  const isDays = (value) => {
    if (!value) return value;
    const days = value?.replace(/[^\d]/g, "");
    if (value) return days;
  };
  /******
   * Setting the Total Amount as the sum of
   * driver amount and the company amount and
   * if total amount exceeds the limit then set a flag
   * *****/
  useEffect(() => {
    const total = Number(companyAmount) + Number(driverAmount);
    dispatch(setTotalAmount(total));
    const [integerPart, decimalPart = ""] = total.toString().split(".");
    // Set validation flag
    if (integerPart?.length > 7 || decimalPart?.length > 2) {
      setTotalAmountExceeded(true);
    } else {
      setTotalAmountExceeded(false);
    }
  }, [companyAmount, driverAmount]);

  const generalTabFormData = () => {
    dispatch(
      setDelayRequestFormData({
        delayedUnitCheckRequestPK: checkRequestid,
        description: description,
        delayedUnitDamageFK: id,
        repairOrderNumber: repairOrderNumber,
        repairInvoiceNumber: repairInvoiceNumber,
        vcb: vcb,
        totalAmount: totalAmount,
        driverCheckAmount: driverAmount ? driverAmount : 0,
        driverCheckName: driverCheckName,
        driverCheckAddress1: driverCheckAddress1,
        driverCheckAddress2: driverCheckAddress2,
        driverCheckCity: driverCheckCity,
        driverCheckStateCode: driverCheckStateCode,
        driverCheckPostalCode: driverCheckPostalCode,
        companyCheckAmount: companyAmount ? companyAmount : 0,
        companyCheckNumber: companyCheckNumber,
        companyCheckDate: companyCheckDate,
        companyCheckName: companyCheckName,
        companyCheckAddress1: companyCheckAddress1,
        companyCheckAddress2: companyCheckAddress2,
        companyCheckCity: companyCheckCity,
        companyCheckStateCode: companyCheckStateCode,
        companyCheckPostalCode: companyCheckPostalCode,
        companyCheckPrinted: companyCheckNumber && companyCheckDate ? true : false,
      })
    );
  };

  /*****Save Object Data */
  useEffect(() => {
    generalTabFormData();
  }, [
    checkRequestid,
    description,
    repairOrderNumber,
    repairInvoiceNumber,
    vcb,
    totalAmount,
    driverAmount,
    driverCheckName,
    driverCheckAddress1,
    driverCheckAddress2,
    driverCheckCity,
    driverCheckStateCode,
    driverCheckPostalCode,
    companyAmount,
    companyCheckNumber,
    companyCheckDate,
    companyCheckName,
    companyCheckAddress1,
    companyCheckAddress2,
    companyCheckCity,
    companyCheckStateCode,
    companyCheckPostalCode,
    companyCheckPrinted,
    id,
  ]);

  /******
   *Save Validation of General Tab
   ********/
  useEffect(() => {
    if (
      description &&
      !checkDescription &&
      ((companyAmount && companyAmount !== ".") || (driverAmount && driverAmount !== ".")) &&
      // driver fields must be present if driverAmount is given
      (!driverAmount ||
        (driverCheckName &&
          driverCheckAddress1 &&
          postalCodePK &&
          ((!checkPayToFK && !checkPayToInput) || (checkPayToFK && checkPayToInput)))) &&
      // company fields must be present only if companyAmount is given
      (!companyAmount ||
        (companyCheckName &&
          companyCheckAddress1 &&
          companyPostalCodePK &&
          ((!companycheckPayToFK && !companycheckPayToInput) ||
            (companycheckPayToFK && companycheckPayToInput)))) &&
      ((!companyCheckNumber && !companyCheckDate) || (companyCheckNumber && companyCheckDate)) &&
      isCheckDateFormat &&
      !totalAmountExceeded
    ) {
      dispatch(setDisableSave(false));
    } else {
      dispatch(setDisableSave(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    description,
    checkDescription,
    companyAmount,
    driverAmount,
    driverCheckName,
    driverCheckAddress1,
    postalCodePK,
    companyCheckNumber,
    companyCheckDate,
    companyCheckName,
    companyCheckAddress1,
    companyPostalCodePK,
    isCheckDateFormat,
    companycheckPayToFK,
    companycheckPayToInput,
    checkPayToFK,
    checkPayToInput,
    totalAmountExceeded,
  ]);
  /****Clear the address fields if checkpay auto complete is empty */
  useEffect(() => {
    if (!delayRequestRecord && (checkPayToFK === null || checkPayToInput === "")) {
      setDriverCheckName("");
      setDriverCheckAddress1("");
      setDriverCheckAddress2("");
      setDriverCheckCity("");
      setDriverCheckPostalCode("");
      setDriverCheckStateCode("");
      dispatch(setPostalCodePK(null));
    }
  }, [checkPayToFK, checkPayToInput, delayRequestRecord]);

  /****Clear the address fields if  company checkpay auto complete is empty*****/
  useEffect(() => {
    if (!delayRequestRecord && (companycheckPayToFK === null || companycheckPayToInput)) {
      setCompanyCheckName("");
      setCompanyCheckAddress1("");
      setCompanyCheckAddress2("");
      setCompanyCheckCity("");
      setCompanyCheckPostalCode("");
      setCompanyCheckStateCode("");
      setCompanyPostalCodePK(null);
    }
  }, [companycheckPayToFK, delayRequestRecord, companycheckPayToInput]);

  /****Clear The Company Check Number and
   * Company Check date if company amount is null
   * ****/
  useEffect(() => {
    if (!companyAmount) {
      setCompanyCheckNumber("");
      setCompanyCheckDate("");
    }
  }, [companyAmount]);

  /****
   * Clear the address fields if
   *  driver amount field is cleared
   * ****/
  useEffect(() => {
    if (!driverAmount) {
      setDriverCheckName("");
      setDriverCheckAddress1("");
      setDriverCheckAddress2("");
      setDriverCheckCity("");
      setDriverCheckPostalCode("");
      setDriverCheckStateCode("");
      dispatch(setPostalCodePK(null));
      setCheckPayToFK(null);
      setCheckPayToInput("");
    }
  }, [driverAmount]);

  /****
   * Clear the address fields
   * if  company amount is cleared
   * *****/
  useEffect(() => {
    if (!companyAmount) {
      setCompanyCheckName("");
      setCompanyCheckAddress1("");
      setCompanyCheckAddress2("");
      setCompanyCheckCity("");
      setCompanyCheckPostalCode("");
      setCompanyCheckStateCode("");
      setCompanyPostalCodePK(null);
      setCompanyCheckPayToFK(null);
      setCompanyCheckPayToInput("");
    }
  }, [companyAmount]);

  return (
    <div className="w-100 p-2">
      <div className="mb-3 p-3">
        {loader && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
        <Row>
          <Col xs={5} md={5} sm={5}>
            <Form.Group className=" mt-5 mb-0 align-items-center row">
              <Col xs={4} md={4} sm={4}>
                <Form.Label className="customColFormLabel">Description</Form.Label>
              </Col>
              <Col xs={7}>
                <input
                  name="description"
                  id="description"
                  type="text"
                  className={`customFormControl ${
                    viewDetail
                      ? ""
                      : !description
                        ? "borderRed"
                        : checkDescription
                          ? "borderRed"
                          : "borderGreen"
                  }`}
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  disabled={viewDetail}
                  value={description}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || value[0] !== " ") {
                      dispatch(setDescription(value));
                      setCheckDescription(false);
                    }
                  }}
                  onBlur={(e) => handleCheckDescription(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group className=" mt-3 mb-0 align-items-center row">
              <Col xs={4} md={4} sm={4}>
                <Form.Label className="customColFormLabel">Repair Order Number</Form.Label>
              </Col>
              <Col xs={3}>
                <input
                  type="text"
                  name="repairordernumber"
                  id="repairordernumber"
                  className="customFormControl"
                  maxLength={10}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  disabled={viewDetail}
                  value={repairOrderNumber}
                  onChange={(e) => {
                    setRepairOrderNumber(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className=" mt-3 mb-0 align-items-center row">
              <Col xs={4} md={4} sm={4}>
                <Form.Label className="customColFormLabel">Repair Invoice Number</Form.Label>
              </Col>
              <Col xs={3}>
                <input
                  name="repairinvoiecnumber"
                  id="repairinvoicenumber"
                  type="text"
                  className="customFormControl"
                  maxLength={10}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  disabled={viewDetail}
                  value={repairInvoiceNumber}
                  onChange={(e) => {
                    setRepairInvoiceNumber(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className=" mt-3 mb-0 align-items-center row">
              <Col xs={4} md={4} sm={4}>
                <Form.Label className="customColFormLabel">VCB</Form.Label>
              </Col>
              <Col xs={3}>
                <input
                  name="VCB"
                  id="VCB"
                  type="text"
                  className="customFormControl"
                  maxLength={10}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  disabled={viewDetail}
                  value={vcb}
                  onChange={(e) => {
                    setVcb(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group className=" mt-3 mb-0 align-items-center row">
              <Col xs={4} md={4} sm={4}>
                <Form.Label className="customColFormLabel">Damage Amount</Form.Label>
              </Col>
              <Col xs={3}>
                <input
                  name="damageAmount"
                  id="damageAmount"
                  type="text"
                  className="customFormControl"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  disabled
                  value={damageAmount}
                />
              </Col>
            </Form.Group>
            <Form.Group className=" mt-3 mb-0 align-items-center row">
              <Col xs={4} md={4} sm={4}>
                <Form.Label className="customColFormLabel">Reserve Amount</Form.Label>
              </Col>
              <Col xs={3}>
                <input
                  name="reserveAmount"
                  id="reserveAmount"
                  type="text"
                  className="customFormControl"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  disabled
                  value={reserveAmount}
                />
              </Col>
            </Form.Group>
            <Form.Group className=" mt-3 mb-0 align-items-center row">
              <Col xs={4} md={4} sm={4}>
                <Form.Label className="customColFormLabel">Accumulated Bond</Form.Label>
              </Col>
              <Col xs={3}>
                <input
                  name="accumulatedbond"
                  id="accumulatedbond"
                  type="text"
                  className="customFormControl"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  disabled
                  value={checkRequestid == null ? accbond : accumulatedBond}
                />
              </Col>
            </Form.Group>

            <Form.Group className=" m-t-50 mb-0 align-items-center row">
              <Col xs={4} md={4} sm={4}>
                <Form.Label className="customColFormLabel">Driver Amount</Form.Label>
              </Col>
              <Col xs={3}>
                <input
                  name="driveramount"
                  id="driveramount"
                  type="text"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  disabled={
                    viewDetail ||
                    delayRequestRecord?.DriverCheckPrinted ||
                    Number(damageDriverFK) === 0 ||
                    damageDriverFK == null
                  }
                  value={driverAmount}
                  className={`customFormControl ${
                    viewDetail === true ||
                    (companyAmount && !totalAmountExceeded) ||
                    delayRequestRecord?.DriverCheckPrinted ||
                    Number(damageDriverFK) === 0
                      ? ""
                      : !driverAmount || driverAmount === "." || totalAmountExceeded
                        ? "borderRed"
                        : "borderGreen"
                  }`}
                  onChange={(e) => {
                    const enteredValue = e.target.value;
                    if (enteredValue === "" || enteredValue?.match(/^\d{0,7}(\.\d{0,2})?$/)) {
                      dispatch(setDriverAmount(enteredValue));
                    }
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className=" mt-3 mb-0 align-items-center row">
              <Col xs={4} md={4} sm={4}>
                <Form.Label className="customColFormLabel">Company Amount</Form.Label>
              </Col>
              <Col xs={3}>
                <input
                  name="companyamount"
                  id="companyamount"
                  type="text"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  disabled={viewDetail || delayRequestRecord?.CompanyCheckPrinted}
                  value={companyAmount}
                  className={`customFormControl ${
                    viewDetail === true || (driverAmount && !totalAmountExceeded)
                      ? ""
                      : !companyAmount || companyAmount === "." || totalAmountExceeded
                        ? "borderRed"
                        : "borderGreen"
                  }`}
                  onChange={(e) => {
                    const enteredValue = e.target.value;
                    if (enteredValue === "" || enteredValue?.match(/^\d{0,7}(\.\d{0,2})?$/)) {
                      dispatch(setCompanyAmount(enteredValue));
                    }
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className=" mt-3 mb-0 align-items-center row">
              <Col xs={4} md={4} sm={4}>
                <Form.Label className="customColFormLabel">Company Check Number</Form.Label>
              </Col>
              <Col xs={3}>
                <input
                  name="companychecknumber"
                  id="companychecknumber"
                  type="text"
                  className={`customFormControl ${
                    viewDetail === true
                      ? ""
                      : companyCheckNumber
                        ? companyCheckDate
                          ? "borderGreen"
                          : "borderRed"
                        : ""
                  }`}
                  maxLength={9}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  disabled={
                    viewDetail ||
                    !companyAmount ||
                    parseFloat(companyAmount) === 0 ||
                    delayRequestRecord?.CompanyCheckPrinted
                  }
                  value={companyCheckNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only non-empty digits
                    if (/^\d+$/.test(value)) {
                      setCompanyCheckNumber(value);
                    } else {
                      // If user deletes everything (i.e., value is empty), clear both
                      setCompanyCheckNumber("");
                      setCompanyCheckDate("");
                    }
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className=" mt-3 mb-0 align-items-center row">
              <Col xs={4} md={4} sm={4}>
                <Form.Label className="customColFormLabel">Company Check Date</Form.Label>
              </Col>
              <Col xs={3}>
                <DateInputField
                  date={companyCheckDate}
                  name="companyCheckDate"
                  setIsDateValid={setIsCheckDateFormat}
                  className={`customFormControl ${
                    viewDetail === true
                      ? ""
                      : companyCheckNumber
                        ? companyCheckDate && isCheckDateFormat
                          ? "borderGreen"
                          : "borderRed"
                        : ""
                  }`}
                  max={new Date()}
                  setDate={setCompanyCheckDate}
                  disabled={
                    viewDetail ||
                    !companyAmount ||
                    !companyCheckNumber ||
                    parseFloat(companyAmount) === 0 ||
                    delayRequestRecord?.CompanyCheckPrinted
                  }
                />{" "}
              </Col>
            </Form.Group>
          </Col>

          <Col xs={7} md={7} sm={7}>
            <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} md={4} className="p-0">
                <Form.Label className="col-form-label">Check Pay To</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={checkPayToList}
                  searchString={checkPayToInput}
                  customFormatSearchString={(searchString) => searchString}
                  renderItemId={(checkPayTo) => checkPayTo.id}
                  renderItemField={(checkPayTo) => checkPayTo.description}
                  handleSearchString={(string) => setCheckPayToInput(string)}
                  fetchDataBySearchString={fetchCheckPayToByName}
                  onSelect={handleCheckPayToLookupSelection}
                  loading={checkpayDriverLoading}
                  disabled={
                    !driverAmount ||
                    viewDetail ||
                    delayRequestRecord?.DriverCheckPrinted ||
                    Number(damageDriverFK) === 0
                  }
                  clearInputCallback={() => {
                    setCheckPayToFK(null);
                    setCheckPayFlag(false);
                  }}
                  className={`customFormControl ${
                    viewDetail === true ? "" : checkPayToInput ? (!checkPayToFK ? "borderRed" : "") : ""
                  }`}
                  selectedId={checkPayToFK}
                />
                <LookupButton
                  onClick={handleCheckPayToLookupModalShow}
                  disabled={viewDetail || !driverAmount || delayRequestRecord?.DriverCheckPrinted}
                />
              </Col>
            </Form.Group>

            <Form.Group className=" mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} md={4} className="p-0">
                <Form.Label className="customColFormLabel p-0">Driver Check Pay To The Order Of</Form.Label>
              </Col>

              <Col xs={5} className="p-0">
                <input
                  name="driverCheckName"
                  id="driverCheckName"
                  type="text"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  disabled={viewDetail || !driverAmount || delayRequestRecord?.DriverCheckPrinted}
                  value={driverCheckName}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || value[0] !== " ") {
                      setDriverCheckName(value);
                    }
                  }}
                  className={`customFormControl ${
                    viewDetail || delayRequestRecord?.DriverCheckPrinted
                      ? ""
                      : driverAmount
                        ? driverCheckName
                          ? "borderGreen"
                          : "borderRed"
                        : ""
                  }`}
                />
              </Col>
            </Form.Group>

            <Form.Group className=" mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} md={4} className="p-0">
                <Form.Label className="customColFormLabel p-0">Address</Form.Label>
              </Col>

              <Col xs={5} className="p-0">
                <input
                  name="ad1"
                  id="ad1"
                  type="text"
                  maxLength={30}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  disabled={viewDetail || !driverAmount || delayRequestRecord?.DriverCheckPrinted}
                  value={driverCheckAddress1}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || value[0] !== " ") {
                      setDriverCheckAddress1(e.target.value);
                    }
                  }}
                  className={`customFormControl ${
                    viewDetail || delayRequestRecord?.DriverCheckPrinted
                      ? ""
                      : driverAmount
                        ? driverCheckAddress1
                          ? "borderGreen"
                          : "borderRed"
                        : ""
                  }`}
                  spellCheck={false}
                />
              </Col>
            </Form.Group>

            <Form.Group className=" mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} md={4} className="p-0"></Col>
              <Col xs={5} className="p-0">
                <input
                  name="ad2"
                  id="ad2"
                  type="text"
                  maxLength={30}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  disabled={viewDetail || !driverAmount || delayRequestRecord?.DriverCheckPrinted}
                  value={driverCheckAddress2}
                  onChange={(e) => {
                    setDriverCheckAddress2(e.target.value);
                  }}
                  className="customFormControl"
                  spellCheck={false}
                />
              </Col>
            </Form.Group>

            <Form.Group className=" mt-0 form-group p-0  align-items-center row  m-l-0 m-r-0">
              <Col xs={12} className="p-0">
                <PostalCodeComponent
                  hideLabel={true}
                  labelColNumber={4}
                  cityColNumber={5}
                  disabled={!driverAmount || viewDetail || delayRequestRecord?.DriverCheckPrinted}
                  city={checkPayToFK ? checkPayToData?.city?.trim() : driverCheckCity}
                  setCity={setDriverCheckCity}
                  stateCode={checkPayToFK ? checkPayToData?.stateCode?.trim() : driverCheckStateCode}
                  setStateCode={setDriverCheckStateCode}
                  postalCode={checkPayToFK ? checkPayToData?.postalCode?.trim() : driverCheckPostalCode}
                  setPostalCode={setDriverCheckPostalCode}
                  setPostalValues={setPostalValues}
                  postalOptions={postalOptions}
                  postalCodePK={postalCodePK}
                  setPostalCodePK={(val) => {
                    dispatch(setPostalCodePK(val));
                  }}
                  canadian={driverCheckCanadian}
                  setCanadian={setDriverCheckCanadian}
                  stateInputWidth={"55px"}
                  zipInputWidth={"100px"}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} md={4} className="p-0">
                <Form.Label className="col-form-label">Check Pay To</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={companyCheckPayToList}
                  searchString={companycheckPayToInput}
                  customFormatSearchString={(searchString) => searchString}
                  renderItemId={(checkPayTo) => checkPayTo.id}
                  renderItemField={(checkPayTo) => checkPayTo.description}
                  handleSearchString={(string) => setCompanyCheckPayToInput(string)}
                  fetchDataBySearchString={fetchCompanyCheckPayToByName}
                  onSelect={handleCompanyCheckPayToLookupSelection}
                  disabled={!companyAmount || viewDetail || parseFloat(companyAmount) === 0}
                  clearInputCallback={() => {
                    setCompanyCheckPayToFK(null);
                    setCompanyCheckPayFlag(false);
                  }}
                  loading={checkpayCompanyLoading}
                  className={`customFormControl ${
                    viewDetail === true
                      ? ""
                      : companycheckPayToInput
                        ? !companycheckPayToFK
                          ? "borderRed"
                          : ""
                        : ""
                  }`}
                  selectedId={companycheckPayToFK}
                  towardsTop
                />
                <LookupButton
                  onClick={handleCompanyCheckPayToLookupModalShow}
                  disabled={
                    viewDetail ||
                    parseFloat(companyAmount) === 0 ||
                    !companyAmount ||
                    delayRequestRecord?.CompanyCheckPrinted
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group className=" mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} md={4} className="p-0">
                <Form.Label className="customColFormLabel p-0">Company Check Pay To The Order Of</Form.Label>
              </Col>

              <Col xs={5} className="p-0">
                <input
                  name="companyCheckName"
                  id="companyCheckName"
                  type="text"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="list"
                  disabled={
                    viewDetail ||
                    parseFloat(companyAmount) === 0 ||
                    !companyAmount ||
                    delayRequestRecord?.CompanyCheckPrinted
                  }
                  value={companyCheckName}

                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || value[0] !== " ") {
                      setCompanyCheckName(value);
                    }
                  }}
                  className={`customFormControl ${
                    viewDetail || parseFloat(companyAmount) === 0 || !companyAmount
                      ? ""
                      : companyAmount
                        ? companyCheckName
                          ? "borderGreen"
                          : "borderRed"
                        : ""
                  }`}
                />
              </Col>
            </Form.Group>

            <Form.Group className=" mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} md={4} className="p-0">
                <Form.Label className="customColFormLabel p-0">Address</Form.Label>
              </Col>

              <Col xs={5} className="p-0">
                <input
                  name="ad1"
                  id="ad1"
                  type="text"
                  maxLength={30}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  disabled={
                    viewDetail ||
                    parseFloat(companyAmount) === 0 ||
                    !companyAmount ||
                    delayRequestRecord?.CompanyCheckPrinted
                  }
                  value={companyCheckAddress1}

                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || value[0] !== " ") {
                      setCompanyCheckAddress1(value);
                    }
                  }}
                  className={`customFormControl ${
                    viewDetail || parseFloat(companyAmount) === 0 || !companyAmount
                      ? ""
                      : companyAmount
                        ? companyCheckAddress1
                          ? "borderGreen"
                          : "borderRed"
                        : ""
                  }`}
                  spellCheck={false}
                />
              </Col>
            </Form.Group>

            <Form.Group className=" mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} md={4} className="p-0"></Col>
              <Col xs={5} className="p-0">
                <input
                  name="ad2"
                  id="ad2"
                  type="text"
                  className="customFormControl"
                  maxLength={30}
                  autoComplete="one-time-code"
                  disabled={
                    viewDetail ||
                    parseFloat(companyAmount) === 0 ||
                    !companyAmount ||
                    delayRequestRecord?.CompanyCheckPrinted
                  }
                  value={companyCheckAddress2}
                  onChange={(e) => {
                    setCompanyCheckAddress2(e.target.value);
                  }}
                  spellCheck={false}
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className=" mt-0 form-group p-0  align-items-center row  m-l-0 m-r-0">
              <Col xs={12} className="p-0">
                <PostalCodeComponent
                  hideLabel={true}
                  labelColNumber={4}
                  cityColNumber={5}
                  disabled={
                    !companyAmount ||
                    parseFloat(companyAmount) === 0 ||
                    viewDetail ||
                    delayRequestRecord?.CompanyCheckPrinted
                  }
                  city={companycheckPayToFK ? companycheckPayToData?.city?.trim() : companyCheckCity}
                  setCity={setCompanyCheckCity}
                  stateCode={
                    companycheckPayToFK ? companycheckPayToData?.stateCode?.trim() : companyCheckStateCode
                  }
                  setStateCode={setCompanyCheckStateCode}
                  postalCode={
                    companycheckPayToFK ? companycheckPayToData?.postalCode?.trim() : companyCheckPostalCode
                  }
                  setPostalCode={setCompanyCheckPostalCode}
                  setPostalValues={setCompanyPostalValues}
                  postalOptions={companyPostalOptions}
                  postalCodePK={companyPostalCodePK}
                  setPostalCodePK={setCompanyPostalCodePK}
                  canadian={companyCanadian}
                  setCanadian={setCompanyCanadian}
                  stateInputWidth={"55px"}
                  zipInputWidth={"100px"}
                />{" "}
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <CheckPayToLookup
          show={showCheckPayToLookup}
          onHide={hideCheckPayToLookup}
          renderItemId={(checkPayTo) => checkPayTo.checkPayToPK}
          MaintenanceProgram
          handleLookupSelection={handleCheckPayToLookupSelection}
        />
        <CheckPayToLookup
          show={showCompanyCheckPayToLookup}
          onHide={hideCompanyCheckPayToLookup}
          renderItemId={(checkPayTo) => checkPayTo.checkPayToPK}
          MaintenanceProgram
          handleLookupSelection={handleCompanyCheckPayToLookupSelection}
        />
      </div>
    </div>
  );
}

export default General;
