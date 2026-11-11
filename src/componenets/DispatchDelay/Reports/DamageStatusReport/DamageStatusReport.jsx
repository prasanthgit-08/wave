import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import UsersService from "../../../../services/UsersService";
import CustomerService from "../../../../services/CustomerService";
import CustomerPlantMaintenanceService from "../../../../services/CustomerPlantMaintenanceService";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import DateInputField from "../../../common/DateInputField";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantsLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import UserLookup from "../../../LookupScreens/User/UserLookup";
import UnitTypeGroupsLookup from "../../../LookupScreens/UnitTypeGroups/UnitTypeGroupsLookup";
import CustomerGroupsLookup from "../../../LookupScreens/CustomerGroups/CustomerGroupsLookup";
import LoadingIcon from "../../../common/LoadingIcon";
import ReportComponent from "../../../common/ReportComponent";
import DamageCodeLookup from "../../../LookupScreens/DamageCode/DamageCodeLookup";
import DelayProcessingService from "../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { parseLocalDate, formatMonthDayToISODate } from "../../../../utils/dateUtils";
import formatDatetimeToDate from "../../../../utils/formatDateTimeToDate";

const validationSchema = yup.object().shape({
  division: yup.string(),
  open: yup.boolean(),
  close: yup.boolean(),
  dispute: yup.boolean(),
  active: yup.boolean(),
  invoice: yup.boolean(),
  responsibleParty: yup.string(),
  beginningDate: yup.string(),
  endDate: yup.string(),
  customerPK: yup.number(),
  customerInput: yup.string(),
  plantPK: yup.number(),
  plantInput: yup.string(),
  dealerPK: yup.number(),
  dealerInput: yup.string(),
  showOnlyDamageCodePK1: yup.number(),
  showOnlyDamageCodeInput1: yup.string(),
  showOnlyDamageCodePK2: yup.number(),
  showOnlyDamageCodeInput2: yup.string(),
  exCludeDamageCodePK1: yup.number(),
  excludeDamageCodeInput1: yup.string(),
  exCludeDamageCodePK2: yup.number(),
  excludeDamageCodeInput2: yup.string(),
  chargeableOnly: yup.boolean(),
  zeroDamageOnly: yup.boolean(),
  totaled: yup.boolean(),
  isPlant: yup.boolean(),
  isDpu: yup.boolean(),
});

const DamageStatusReport = () => {
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [isTabValid, setIsTabValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [showCustomerLookUp, setShowCustomerLookUp] = useState(false);
  const [plantLoading, setplantLoading] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [showPlantLookUp, setShowPlantLookUp] = useState(false);
  const [showDamageLoading1, setShowDamageLoading1] = useState(false);
  const [showDamageList1, setShowDamageList1] = useState([]);
  const [showDamageCodeLookup1, setShowDamageCodeLookup1] = useState(false);
  const [showDamageLoading2, setShowDamageLoading2] = useState(false);
  const [showDamageList2, setShowDamageList2] = useState([]);
  const [showDamageCodeLookup2, setShowDamageCodeLookup2] = useState(false);
  const [excludeDamageLoading1, setExcludeDamageLoading1] = useState(false);
  const [excludeDamageList1, setExcludeDamageList1] = useState([]);
  const [showExcludeDamageCodeLookup1, setShowExcludeDamageCodeLookup1] = useState(false);
  const [excludeDamageLoading2, setExcludeDamageLoading2] = useState(false);
  const [excludeDamageList2, setExcludeDamageList2] = useState([]);
  const [showExcludeDamageCodeLookup2, setShowExcludeDamageCodeLookup2] = useState(false);
  const DAMAGE_STATUS_REPORT_ID = process.env.REACT_APP_SP_DAMAGE_STATUS_REPORT;

  const formik = useFormik({
    initialValues: {
      division: "ALL",
      open: true,
      close: true,
      dispute: true,
      active: true,
      invoice: true,
      responsibleParty: "Both",
      beginningDate: "",
      endDate: "",
      customerPK: null,
      customerInput: "",
      plantPK: null,
      plantInput: "",
      showOnlyDamageCodePK1: null,
      showOnlyDamageCodeInput1: "",
      showOnlyDamageCodePK2: null,
      showOnlyDamageCodeInput2: "",
      exCludeDamageCodePK1: null,
      excludeDamageCodeInput1: "",
      exCludeDamageCodePK2: null,
      excludeDamageCodeInput2: "",
      chargeableOnly: false,
      zeroDamageOnly: false,
      totaled: false,
      isDpu: false,
      isPlant: false,
    },
    validationSchema: validationSchema,
  });

  const { values, setValues, setFieldValue, initialValues } = formik;

  const {
    division,
    open,
    close,
    dispute,
    active,
    invoice,
    responsibleParty,
    beginningDate,
    endDate,
    customerPK,
    customerInput,
    plantPK,
    plantInput,
    showOnlyDamageCodePK1,
    showOnlyDamageCodeInput1,
    showOnlyDamageCodePK2,
    showOnlyDamageCodeInput2,
    exCludeDamageCodePK1,
    excludeDamageCodeInput1,
    exCludeDamageCodePK2,
    excludeDamageCodeInput2,
    chargeableOnly,
    zeroDamageOnly,
    totaled,
    isPlant,
    isDpu,
  } = values;

  //showOnlyDamageCode1
  const fetchShowDamageCode1 = (string) => {
    setShowDamageLoading1(true);
    DelayProcessingService.getDamageCode({ searchTerm: string, pageSize: 100 })
      .then((response) => {
        const data = response?.data;
        setShowDamageList1(data);
      })
      .catch((error) => {})
      .finally(() => {
        setShowDamageLoading1(false);
      });
  };

  const handleDamageCodeSelection1 = (code) => {
    setValues({
      ...values,
      showOnlyDamageCodePK1: code.DelayedUnitCodePK,
      showOnlyDamageCodeInput1: code.Description?.trim(),
    });
    setShowDamageCodeLookup1(false);
    if (!exCludeDamageCodePK1) {
      setFieldValue("excludeDamageCodeInput1", "");
    }
    if (!exCludeDamageCodePK2) {
      setFieldValue("excludeDamageCodeInput2", "");
    }
  };

  //showOnlyDamageCode2
  const fetchShowDamageCode2 = (string) => {
    setShowDamageLoading2(true);
    DelayProcessingService.getDamageCode({ searchTerm: string, pageSize: 100 })
      .then((response) => {
        const data = response?.data;
        setShowDamageList2(data);
      })
      .catch((error) => {})
      .finally(() => {
        setShowDamageLoading2(false);
      });
  };

  const handleDamageCodeSelection2 = (code) => {
    setValues({
      ...values,
      showOnlyDamageCodePK2: code?.DelayedUnitCodePK,
      showOnlyDamageCodeInput2: code?.Description?.trim(),
    });
    setShowDamageCodeLookup2(false);

    if (!exCludeDamageCodePK1) {
      setFieldValue("excludeDamageCodeInput1", "");
    }
    if (!exCludeDamageCodePK2) {
      setFieldValue("excludeDamageCodeInput2", "");
    }
  };

  //ExcludeDamageCodeOnly
  const getExcludeDamageCodeOnly = (string) => {
    setExcludeDamageLoading1(true);
    DelayProcessingService.getDamageCode({ searchTerm: string, pageSize: 100 })
      .then((response) => {
        const data = response?.data;
        setExcludeDamageList1(data);
      })
      .finally(() => {
        setExcludeDamageLoading1(false);
      });
  };

  const handleExcludeDamageCodeSelection1 = (code) => {
    setValues({
      ...values,
      exCludeDamageCodePK1: code?.DelayedUnitCodePK,
      excludeDamageCodeInput1: code?.Description?.trim(),
    });
    setShowExcludeDamageCodeLookup1(false);
    if (!showOnlyDamageCodePK1) {
      setFieldValue("showOnlyDamageCodeInput1", "");
    }
    if (!showOnlyDamageCodePK2) {
      setFieldValue("showOnlyDamageCodeInput2", "");
    }

    if (!showOnlyDamageCodePK1) {
      setFieldValue("showOnlyDamageCodeInput1", "");
    }
    if (!showOnlyDamageCodePK2) {
      setFieldValue("showOnlyDamageCodeInput2", "");
    }
  };

  //ExcludeDamageCodeOnly2
  const getExcludeDamageCodeOnly2 = (string) => {
    setExcludeDamageLoading2(true);
    DelayProcessingService.getDamageCode({ searchTerm: string, pageSize: 100 })
      .then((response) => {
        const data = response?.data;
        setExcludeDamageList2(data);
      })
      .finally(() => {
        setExcludeDamageLoading2(false);
      });
  };

  const handleExcludeDamageCodeSelection2 = (code) => {
    setValues({
      ...values,
      exCludeDamageCodePK2: code?.DelayedUnitCodePK,
      excludeDamageCodeInput2: code?.Description?.trim(),
    });
    setShowExcludeDamageCodeLookup2(false);

    if (!showOnlyDamageCodePK1) {
      setFieldValue("showOnlyDamageCodeInput1", "");
    }
    if (!showOnlyDamageCodePK2) {
      setFieldValue("showOnlyDamageCodeInput2", "");
    }
  };

  //customer Api and selection handling
  const fetchCustomerList = (string) => {
    setCustomerLoading(true);
    CustomerService.getAllCustomersForCustomerSalesReport({ plantPK, searchTerms: string, pageSize: 100 })
      .then((response) => {
        const data = response?.data;
        setCustomerList(data);
      })
      .catch(() => {})
      .finally(() => {
        setCustomerLoading(false);
      });
  };

  const handleCustomerSelection = (customer) => {
    setValues({
      ...values,
      customerPK: customer?.CustomerPK,
      customerInput: customer.Name || customer.Description?.trim(),
      isPlant: customer?.UsePlants,
      isDpu: customer?.DPUCustomer,
    });
    setShowCustomerLookUp(false);
    if (!isPlant && !isDpu) {
      setFieldValue("plantPK", null);
      setFieldValue("plantInput", "");
    }
  };

  //CustomerPlant
  const fetchPickupPlantAuto = (string) => {
    setplantLoading(true);
    CustomerPlantMaintenanceService.getPlantsForCustomerSalesReport({
      customerPK: customerPK,
      searchTerms: string,
      pageSize: 100,
    })
      .then((response) => {
        const data = response?.data;
        setPlantList(data);
      })
      .catch((err) => {})
      .finally(() => {
        setplantLoading(false);
      });
  };

  const handlePickupPlantLookupSelection = (plant) => {
    setValues({
      ...values,
      plantPK: plant.CustomerPlantPK,
      plantInput: plant.Name?.trim(),
    });
    setShowPlantLookUp(false);
  };

  const params = {
    Division: division,
    OpenStatus: open,
    CloseStatus: close,
    DisputeStatus: dispute,
    ActiveStatus: active,
    InvoiceStatus: invoice,
    DamageDateFrom: formatDatetimeToDate(beginningDate),
    DamageDateTo: formatDatetimeToDate(endDate),
    ResponsibleParty: responsibleParty,
    ChargeableOnly: chargeableOnly,
    ZeroDamageOnly: zeroDamageOnly,
    ShowDamageCodeOnly1: showOnlyDamageCodePK1,
    ShowDamageCodeOnly2: showOnlyDamageCodePK2,
    ExcludeDamageCode1: exCludeDamageCodePK1,
    ExcludeDamageCode2: exCludeDamageCodePK2,
    CustomerFK: customerPK,
    PlantFK: plantPK,
    Totaled: totaled,
  };

  useEffect(() => {
    if (
      (customerPK || !customerInput) &&
      (plantPK || !plantInput) &&
      (!beginningDate || endDate) &&
      (!endDate || beginningDate) &&
      isBeginningDateValid &&
      isEndDateValid &&
      (showOnlyDamageCodePK1 || !showOnlyDamageCodeInput1) &&
      (showOnlyDamageCodePK2 || !showOnlyDamageCodeInput2) &&
      (exCludeDamageCodePK1 || !excludeDamageCodeInput1) &&
      (exCludeDamageCodePK2 || !excludeDamageCodeInput2) &&
      !(showOnlyDamageCodePK1 && showOnlyDamageCodePK2 && showOnlyDamageCodePK1 === showOnlyDamageCodePK2) &&
      !(exCludeDamageCodePK1 && exCludeDamageCodePK2 && exCludeDamageCodePK1 === exCludeDamageCodePK2) &&
      (open || close || dispute || active || invoice)
    ) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [
    customerPK,
    customerInput,
    plantPK,
    plantInput,
    beginningDate,
    isBeginningDateValid,
    endDate,
    isEndDateValid,
    showOnlyDamageCodePK1,
    showOnlyDamageCodeInput1,
    showOnlyDamageCodePK1,
    showOnlyDamageCodePK2,
    showOnlyDamageCodeInput2,
    exCludeDamageCodePK1,
    excludeDamageCodeInput1,
    exCludeDamageCodePK2,
    excludeDamageCodeInput2,
    open,
    close,
    dispute,
    active,
    invoice,
  ]);

  const body = (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        {/* {releaseLoading && <LoadingIcon/>} */}
        <div className="m-b-10">
          <div className="p-5 w-100 mt-0 m-l-10">
            <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3 mt-2">
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Division</Form.Label>
              </Col>

              <Col xs={8} className="p-0 ">
                <CustomRadioGroup
                  name="division"
                  horizontal
                  horizontalAlignmentClassName="pe-4"
                  selectedOption={division}
                  onChange={(value) => setFieldValue("division", value)}
                  options={[
                    { value: "ALL", label: "All", width: "70px" },
                    { value: "Driveaway", label: "Driveaway", disabled: false },
                    { value: "Towaway", label: "Towaway", disabled: false },
                  ]}
                />
              </Col>
            </Form.Group>
            <Form.Group className="align-items-center row m-l-10 m-r-0 mt-2">
              <Col sm={2} md={2} xs={2} className="p-0 d-flex">
                <Form.Label className="col-form-label">Status</Form.Label>
              </Col>

              {/* Checkbox Row */}
              <Col sm={10} md={10} xs={10} className="d-flex gap-4 p-0">
                <div className="d-flex align-items-center gap-1">
                  <input
                    type="checkbox"
                    className={`form-check-input ${open || close || dispute || active || invoice ? "" : "borderRed"} `}
                    name="open"
                    checked={open}
                    onChange={(e) => setFieldValue("open", e.target.checked)}
                  />
                  <Form.Label className="m-0">Open</Form.Label>
                </div>

                <div className="d-flex align-items-center gap-1">
                  <input
                    type="checkbox"
                    className={`form-check-input ${open || close || dispute || active || invoice ? "" : "borderRed"} `}
                    name="close"
                    checked={close}
                    onChange={(e) => setFieldValue("close", e.target.checked)}
                  />
                  <Form.Label className="m-0">Close</Form.Label>
                </div>

                <div className="d-flex align-items-center gap-1">
                  <input
                    type="checkbox"
                    className={`form-check-input ${open || close || dispute || active || invoice ? "" : "borderRed"} `}
                    name="dispute"
                    checked={dispute}
                    onChange={(e) => setFieldValue("dispute", e.target.checked)}
                  />
                  <Form.Label className="m-0">Dispute</Form.Label>
                </div>

                <div className="d-flex align-items-center gap-1">
                  <input
                    type="checkbox"
                    className={`form-check-input ${open || close || dispute || active || invoice ? "" : "borderRed"} `}
                    name="active"
                    checked={active}
                    onChange={(e) => setFieldValue("active", e.target.checked)}
                  />
                  <Form.Label className="m-0">Active</Form.Label>
                </div>

                <div className="d-flex align-items-center gap-1">
                  <input
                    type="checkbox"
                    className={`form-check-input ${open || close || dispute || active || invoice ? "" : "borderRed"} `}
                    name="invoice"
                    checked={invoice}
                    onChange={(e) => setFieldValue("invoice", e.target.checked)}
                  />
                  <Form.Label className="m-0">Invoice</Form.Label>
                </div>
              </Col>
            </Form.Group>
            <Row>
              <Col sm={4} md={4} xs={4}>
                <Form.Group className={` m-b-10 align-items-center row  m-l-10 m-r-0 mt-3 `}>
                  <Col sm={6} md={6} xs={6} className="p-0">
                    <Form.Label className="col-form-label  ">Damage Date From</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0 w-100px m-l-10">
                    <DateInputField
                      date={beginningDate}
                      max={endDate && parseLocalDate(endDate)}
                      setDate={(date) => {
                        setFieldValue("beginningDate", date);
                      }}
                      setIsDateValid={setIsBeginningDateValid}
                      className={
                        isBeginningDateValid ? (!beginningDate && endDate ? "borderRed" : "") : "borderRed"
                      }
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={4} md={4} xs={4}>
                <Form.Group className={` m-b-10 align-items-center row m-r-0 mt-3 `}>
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="col-form-label  ">To</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0 w-100px">
                    <DateInputField
                      min={beginningDate && parseLocalDate(beginningDate)}
                      max={new Date()}
                      date={endDate}
                      setDate={(date) => setFieldValue("endDate", date)}
                      setIsDateValid={setIsEndDateValid}
                      className={
                        isEndDateValid ? (!endDate && beginningDate ? "borderRed" : "") : "borderRed"
                      }
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3 mt-3">
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Responsible Party</Form.Label>
              </Col>

              <Col xs={8} className="p-0 ">
                <CustomRadioGroup
                  name="responsibleParty"
                  horizontal
                  horizontalAlignmentClassName="pe-4"
                  selectedOption={responsibleParty}
                  onChange={(value) => setFieldValue("responsibleParty", value)}
                  options={[
                    { value: "Both", label: "Both", width: "70px" },
                    { value: "Responsible", label: "Responsible", disabled: false },
                    { value: "NotResponsible", label: "Not Responsible", disabled: false },
                  ]}
                />
              </Col>
            </Form.Group>

            <Form.Group className={` m-b-10 align-items-center row  m-l-10 m-r-0 mt-2 `}>
              <Col sm={2} md={2} xs={2} className="p-0 d-flex">
                <Form.Label className=" col-form-label">Chargeable Only</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="chargeableOnly"
                  name="chargeableOnly"
                  checked={chargeableOnly}
                  onChange={(e) => setFieldValue("chargeableOnly", e.target.checked)}
                />
              </Col>
            </Form.Group>

            <Form.Group className={` m-b-10 align-items-center row  m-l-10 m-r-0 mt-2 `}>
              <Col sm={2} md={2} xs={2} className="p-0 d-flex">
                <Form.Label className=" col-form-label">$0 Damage Only</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="$0DamageOnly"
                  name="$0DamageOnly"
                  checked={zeroDamageOnly}
                  onChange={(e) => setFieldValue("zeroDamageOnly", e.target.checked)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-10 m-r-0">
              <Col xs={2} sm={2} className="p-0">
                <Form.Label className="customColFormLabel">Show Only Damage Code </Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={showDamageList1}
                  searchString={showOnlyDamageCodeInput1}
                  renderItemId={(yard) => yard.DelayedUnitCodePK}
                  renderItemField={(yard) => yard.Description}
                  selectedId={showOnlyDamageCodePK1}
                  loading={showDamageLoading1}
                  handleSearchString={(string) => setFieldValue("showOnlyDamageCodeInput1", string)}
                  fetchDataBySearchString={fetchShowDamageCode1}
                  onSelect={handleDamageCodeSelection1}
                  maxHeight="175px"
                  clearInputCallback={() => {
                    setFieldValue("showOnlyDamageCodePK1", null);
                  }}
                  towardsTop
                  className={
                    exCludeDamageCodePK1 || exCludeDamageCodePK2
                      ? ""
                      : (showOnlyDamageCodePK1 || !showOnlyDamageCodeInput1) &&
                          !(
                            showOnlyDamageCodePK1 &&
                            showOnlyDamageCodePK2 &&
                            showOnlyDamageCodePK1 === showOnlyDamageCodePK2
                          )
                        ? ""
                        : "borderRed"
                  }
                  disabled={exCludeDamageCodePK1 || exCludeDamageCodePK2}
                />
                <LookupButton
                  onClick={() => {
                    setShowDamageCodeLookup1(true);
                  }}
                  disabled={exCludeDamageCodePK1 || exCludeDamageCodePK2}
                />
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0 d-flex m-l-10">
                <AutoCompleteDropdown
                  arrayList={showDamageList2}
                  searchString={showOnlyDamageCodeInput2}
                  renderItemId={(yard) => yard.DelayedUnitCodePK}
                  renderItemField={(yard) => yard.Description}
                  selectedId={showOnlyDamageCodePK2}
                  loading={showDamageLoading2}
                  handleSearchString={(string) => setFieldValue("showOnlyDamageCodeInput2", string)}
                  fetchDataBySearchString={fetchShowDamageCode2}
                  onSelect={handleDamageCodeSelection2}
                  maxHeight="175px"
                  clearInputCallback={() => {
                    setFieldValue("showOnlyDamageCodePK2", null);
                  }}
                  towardsTop
                  className={
                    exCludeDamageCodePK1 || exCludeDamageCodePK2
                      ? ""
                      : (showOnlyDamageCodePK2 || !showOnlyDamageCodeInput2) &&
                          !(
                            showOnlyDamageCodePK1 &&
                            showOnlyDamageCodePK2 &&
                            showOnlyDamageCodePK1 === showOnlyDamageCodePK2
                          )
                        ? ""
                        : "borderRed"
                  }
                  disabled={exCludeDamageCodePK1 || exCludeDamageCodePK2}
                />
                <LookupButton
                  onClick={() => {
                    setShowDamageCodeLookup2(true);
                  }}
                  disabled={exCludeDamageCodePK1 || exCludeDamageCodePK2}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-10 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label dealer-label">Exclude Damage Code</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={excludeDamageList1}
                  searchString={excludeDamageCodeInput1}
                  renderItemId={(customer) => customer.DelayedUnitCodePK}
                  renderItemField={(customer) => customer.Description}
                  handleSearchString={(string) => setFieldValue("excludeDamageCodeInput1", string)}
                  fetchDataBySearchString={getExcludeDamageCodeOnly}
                  onSelect={handleExcludeDamageCodeSelection1}
                  selectedId={exCludeDamageCodePK1}
                  loading={excludeDamageLoading1}
                  clearInputCallback={() => {
                    setFieldValue("exCludeDamageCodePK1", null);
                  }}
                  towardsTop
                  // disabled={viewDetail}
                  className={
                    showOnlyDamageCodePK1 || showOnlyDamageCodePK2
                      ? ""
                      : (exCludeDamageCodePK1 || !excludeDamageCodeInput1) &&
                          !(
                            exCludeDamageCodePK1 &&
                            exCludeDamageCodePK2 &&
                            exCludeDamageCodePK1 === exCludeDamageCodePK2
                          )
                        ? ""
                        : "borderRed"
                  }
                  disabled={showOnlyDamageCodePK1 || showOnlyDamageCodePK2}
                />
                <LookupButton
                  onClick={() => {
                    setShowExcludeDamageCodeLookup1(true);
                  }}
                  disabled={showOnlyDamageCodePK1 || showOnlyDamageCodePK2}
                />
              </Col>

              <Col xs={4} md={4} sm={4} className="p-0 d-flex m-l-10">
                <AutoCompleteDropdown
                  arrayList={excludeDamageList2}
                  searchString={excludeDamageCodeInput2}
                  renderItemId={(customer) => customer.DelayedUnitCodePK}
                  renderItemField={(customer) => customer.Description}
                  handleSearchString={(string) => setFieldValue("excludeDamageCodeInput2", string)}
                  fetchDataBySearchString={getExcludeDamageCodeOnly2}
                  onSelect={handleExcludeDamageCodeSelection2}
                  selectedId={exCludeDamageCodePK2}
                  loading={excludeDamageLoading2}
                  clearInputCallback={() => {
                    setFieldValue("exCludeDamageCodePK2", null);
                  }}
                  towardsTop
                  className={
                    showOnlyDamageCodePK1 || showOnlyDamageCodePK2
                      ? ""
                      : (exCludeDamageCodePK2 || !excludeDamageCodeInput2) &&
                          !(
                            exCludeDamageCodePK1 &&
                            exCludeDamageCodePK2 &&
                            exCludeDamageCodePK1 === exCludeDamageCodePK2
                          )
                        ? ""
                        : "borderRed"
                  }
                  disabled={showOnlyDamageCodePK1 || showOnlyDamageCodePK2}
                />
                <LookupButton
                  onClick={() => {
                    setShowExcludeDamageCodeLookup2(true);
                  }}
                  disabled={showOnlyDamageCodePK1 || showOnlyDamageCodePK2}
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-10 m-r-0 mt-3 `}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label  ">Customer</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="d-flex p-0 ">
                <AutoCompleteDropdown
                  className={`customFormControl ${customerPK || !customerInput ? "" : "borderRed"} `}
                  arrayList={customerList}
                  searchString={customerInput}
                  handleSearchString={(string) => setFieldValue("customerInput", string)}
                  renderItemId={(item) => item.CustomerPK}
                  renderItemField={(item) => item.Description}
                  fetchDataBySearchString={(value) => fetchCustomerList(value)}
                  onSelect={(customer) => {
                    handleCustomerSelection(customer);
                  }}
                  selectedId={customerPK}
                  maxHeight="180px"
                  clearInputCallback={() => {
                    setFieldValue("customerPK", null);
                  }}
                  loading={customerLoading}
                  towardsTop
                />
                <LookupButton
                  onClick={() => {
                    setShowCustomerLookUp(true);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-3 m-b-10 align-items-center row  m-l-10 m-r-0 `}>
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label m-l-0 ">Plants</Form.Label>
              </Col>

              <Col xs={4} md={4} sm={4} className="d-flex p-0 ">
                <AutoCompleteDropdown
                  className={`customFormControl ${plantPK || !plantInput ? "" : "borderRed"} `}
                  arrayList={plantList}
                  searchString={plantInput}
                  renderItemId={(plant) => plant.CustomerPlantPK}
                  renderItemField={(plant) => plant.Name}
                  handleSearchString={(string) => setFieldValue("plantInput", string)}
                  fetchDataBySearchString={fetchPickupPlantAuto}
                  onSelect={handlePickupPlantLookupSelection}
                  selectedId={plantPK}
                  loading={plantLoading}
                  maxHeight="180px"
                  clearInputCallback={() => {
                    setFieldValue("plantPK", null);
                  }}
                  towardsTop
                  disabled={!!customerPK && !isPlant && !isDpu}
                />
                <LookupButton
                  onClick={() => {
                    setShowPlantLookUp(true);
                  }}
                  disabled={!!customerPK && !isPlant && !isDpu}
                />
              </Col>
            </Form.Group>

            <Form.Group className={` m-b-10 align-items-center row  m-l-10 m-r-0 mt-3 `}>
              <Col sm={2} md={2} xs={2} className="p-0 d-flex">
                <Form.Label className=" col-form-label">Totaled</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="totaled"
                  name="totaled"
                  onChange={(e) => setFieldValue("totaled", e.target.checked)}
                />
              </Col>
            </Form.Group>
          </div>
        </div>
      </div>
      {/* showOnlyDamageCode1*/}
      <DamageCodeLookup
        show={showDamageCodeLookup1}
        onHide={() => {
          setShowDamageCodeLookup1(false);
        }}
        renderItemId={(damageCode) => damageCode.DelayedUnitCodePK}
        handleLookupSelection={handleDamageCodeSelection1}
        common
      />
      {/* showOnlyDamageCode2*/}
      <DamageCodeLookup
        show={showDamageCodeLookup2}
        onHide={() => {
          setShowDamageCodeLookup2(false);
        }}
        renderItemId={(damageCode) => damageCode.DelayedUnitCodePK}
        handleLookupSelection={handleDamageCodeSelection2}
        common
      />
      {/* ExcludeDamageCode1*/}
      <DamageCodeLookup
        show={showExcludeDamageCodeLookup1}
        onHide={() => {
          setShowExcludeDamageCodeLookup1(false);
        }}
        renderItemId={(damageCode) => damageCode.DelayedUnitCodePK}
        handleLookupSelection={handleExcludeDamageCodeSelection1}
        common
      />
      {/* ExcludeDamageCode2*/}
      <DamageCodeLookup
        show={showExcludeDamageCodeLookup2}
        onHide={() => {
          setShowExcludeDamageCodeLookup2(false);
        }}
        renderItemId={(damageCode) => damageCode.DelayedUnitCodePK}
        handleLookupSelection={handleExcludeDamageCodeSelection2}
        common
      />
      <CustomerLookup
        show={showCustomerLookUp}
        onHide={() => {
          setShowCustomerLookUp(false);
        }}
        renderItemId={(customer) => customer.CustomerPK}
        renderItemField={(customer) => customer.Name}
        handleLookupSelection={handleCustomerSelection}
        customerSalesReport
        plantId={plantPK}
      />

      <CustomerPlantsLookup
        show={showPlantLookUp}
        onHide={() => setShowPlantLookUp(false)}
        renderItemId={(plant) => plant?.CustomerPlantPK}
        handleLookupSelection={handlePickupPlantLookupSelection}
        fetchFunction={(params) =>
          CustomerPlantMaintenanceService.getPlantsForCustomerSalesReport({
            ...params,
            searchTerms: params?.searchTerm,
            type: "LookUp",
            customerPK: customerPK,
            firstField: params?.advancedSortingOrder?.firstField,
            secondField: params?.advancedSortingOrder?.secondField,
            thirdField: params?.advancedSortingOrder?.thirdField,
            name: params?.advancedSearchObject?.name,
            brand: params?.advancedSearchObject?.brand,
            productLine: params?.advancedSearchObject?.productLine,
          })
        }
        renderCol1={(plant) => plant?.Name}
        renderCol2={(plant) => plant?.Brand}
        renderCol3={(plant) => plant?.ProductLine}
      />
      {loading && <LoadingIcon />}
    </div>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        setValues(initialValues);
        setFieldValue("beginningDate", "");
        setFieldValue("endDate", "");
      }}
      id={DAMAGE_STATUS_REPORT_ID}
      isTabValid={isTabValid}
      payload={params}
    />
  );
};

export default DamageStatusReport;
