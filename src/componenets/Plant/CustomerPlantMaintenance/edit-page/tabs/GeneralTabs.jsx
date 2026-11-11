import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { t } from "i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";

import CustomerService from "../../../../../services/CustomerService";
import { setDealerCity, setDealerStatecode, setDealerPostcode } from "../../../../../redux/EditDealerSlice";
import {
  setPlantCheckName,
  setPlantAddress,
  setPlantName,
  setPlantCity,
  setPlantStateCode,
  setPlantCanadian,
  setPlantPostCode,
  setplantYtdunit,
  setPlantEstimateUnit,
  setPlantFormData,
  setPlantPhone,
  setPlantFax,
  setCustomerFK,
  setCustomerName,
  setViewDetail,
  setPostalCodeOnChange,
  setDealerZipPostLenght,
  setOnCancel,
  setPostalPK,
  setLastOrderDateValid,
} from "../../../../../redux/CustomerPlantMaintenanceSlice";

import CustomerPlantMaintenanceService from "../../../../../services/CustomerPlantMaintenanceService";
import PostalCode from "../../../../common/PostalCode";
import DateInputField from "../../../../common/DateInputField";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import LoadingIcon from "../../../../common/LoadingIcon";
const GeneralTabs = () => {
  const [plantPK, setPlantPK] = useState("");
  //const [message, setMessage] = useState("");
  const [incompletePlantPK, setIncompletePlantPK] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [productLine, setProductLine] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [canadian, setCanadian] = useState(false);
  const [isPostalData, setPostalData] = useState(false);
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState();
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [lastOrderDate, setLastOrderDate] = useState("");
  const [ytdunits, setYtdunits] = useState("");
  const [estimatedUnits, setEstimatedUnits] = useState("");
  const [notes, setNotes] = useState("");
  const [zipIdChcek, setZipIdCheck] = useState("");
  const [totalUnits, setTotalUnits] = useState("");
  const [isLastOrderDateFormat, setIsLastOrderDateFormat] = useState(true);
  const [totalUnitsLoading, setTotalUnitsLoading] = useState(false);
  const [customerLoading, setcustomerLoading] = useState(false);

  const params = useParams();
  const customerId = params.customerId;
  const [postalCodePK, setPostalCodePK] = useState(null);
  const postalCodeOnChange = useSelector((state) => state.customerPlantmaintanceReducer.postalCodeOnChange);
  const onCancel = useSelector((state) => state.customerPlantmaintanceReducer.onCancel);
  const dispatch = useDispatch();
  const customerFK = useSelector((state) => state.customerPlantmaintanceReducer.customerFK);
  const DealerZipPostLenght = useSelector((state) => state.customerPlantmaintanceReducer.zipPostLenght);
  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);
  const editPlantData = useSelector((state) => state.customerPlantmaintanceReducer.editPlantData);

  const customerName = useSelector((state) => state.customerPlantmaintanceReducer.customerName);
  const isCustomerPlantLoading = useSelector(
    (state) => state.customerPlantmaintanceReducer.isCustomerPlantLoading
  );
  const plantCheckName = useSelector((state) => state.customerPlantmaintanceReducer.plantCheckName);
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };
  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFax(formattedPhoneNumber);
  };
  //Customer Name
  const fetchCustomerName = (id) => {
    setcustomerLoading(true);
    CustomerService.getCustomerById(id)
      .then((response) => {
        const { data } = response;

        dispatch(setCustomerName(data.name));
      })
      .catch((err) => console.error("Failed to Fetch the customer Details"))
      .finally(() => {
        setcustomerLoading(false);
      });
  };
  //Ytd Units-from UnitsTotal
  const currentYear = new Date().getFullYear();

  const fetchYtdUnits = (plantPK, incompleteplantPK) => {
    setTotalUnitsLoading(true);
    CustomerPlantMaintenanceService.getYtdUnitsValue(currentYear, plantPK, incompleteplantPK)
      .then((response) => {
        const { data } = response;
        if (data === null || data === "" || (data === undefined && (plantPK || incompletePlantPK))) {
          setYtdunits(0);
        } else {
          setYtdunits(data.totalUnits);
        }
      })
      .catch((err) => console.error("Failed to get the YTD Units"))
      .finally(() => {
        setTotalUnitsLoading(false);
      });
  };
  //set total units
  useEffect(() => {
    if (!plantPK && !incompletePlantPK) {
      setTotalUnits(0);
      setYtdunits(0);
    }
  }, [plantPK, incompletePlantPK]);

  useEffect(() => {
    if (editPlantData != null) {
      setName(editPlantData.name != null ? editPlantData.name?.trim() : "");

      setBrand(editPlantData.brand != null ? editPlantData.brand?.trim() : "");
      setProductLine(editPlantData.productLine != null ? editPlantData.productLine?.trim() : "");
      setAddress1(editPlantData.address1 != null ? editPlantData.address1?.trim() : "");
      setAddress2(editPlantData.address2 != null ? editPlantData.address2?.trim() : "");
      setCity(editPlantData.city != null ? editPlantData.city?.trim() : "");
      setStateCode(editPlantData.stateCode != null ? editPlantData.stateCode?.trim() : "");
      setPostalCode(editPlantData.postalCode != null ? editPlantData.postalCode?.trim() : "");
      setCanadian(editPlantData.canadian != null ? editPlantData.canadian : "");
      setPhone(editPlantData.phone != null ? formatPhoneNumber(editPlantData.phone) : "");
      setFax(editPlantData.fax != null ? formatPhoneNumber(editPlantData.fax) : "");

      setEstimatedUnits(editPlantData.estimatedUnits != null ? editPlantData.estimatedUnits : "");

      setLastOrderDate(editPlantData.lastOrderDate != null ? editPlantData.lastOrderDate : "");

      setNotes(editPlantData.notes != null ? editPlantData.notes?.trim() : "");
      if (null != editPlantData.incompleteCustomerPlantPK) {
        setIncompletePlantPK(editPlantData.incompleteCustomerPlantPK);
      } else if (null != editPlantData.customerPlantPK) {
        setPlantPK(editPlantData.customerPlantPK);
      }
      initialValue[0].city = editPlantData.city != null ? editPlantData.city?.trim() : "";
      initialValue[0].statecode = editPlantData.statecode != null ? editPlantData.statecode?.trim() : "";
      initialValue[0].postalcode = editPlantData.postalcode != null ? editPlantData.postalcode?.trim() : "";
      setPostalValues(initialValue);
      setTotalUnits(editPlantData?.totalUnits);
      setPostalCodePK(editPlantData.postalCodePK ? editPlantData.postalCodePK : null);
    }
  }, [editPlantData, viewDetail]);

  const generalTabFormData = () => {
    dispatch(
      setPlantFormData({
        customerPlantPK: plantPK,
        incompleteCustomerPlantPK: incompletePlantPK,
        customerFK: customerFK,
        name: name,
        brand: brand,
        productLine: productLine,
        address1: address1,
        address2: address2,
        city: city,
        stateCode: statecode,
        postalCode: postalcode,
        canadian: canadian,
        phone: phone.replace(/\s+/g, ""),
        fax: fax.replace(/\s+/g, ""),
        notes: notes,
        lastOrderDate: lastOrderDate,

        estimatedUnits: estimatedUnits,
        totalUnits: totalUnits,
      })
    );
  };

  //Unique name
  const handleCheckName = (name) => {
    CustomerPlantMaintenanceService.checkNameExist(name, customerId, plantPK, incompletePlantPK)
      .then((response) => {
        const data = response.data;
        // setMessage(data);
        dispatch(setPlantCheckName(data));
      })
      .catch((err) => {
        console.error("Check Name Exist Failed");
      });
  };

  useEffect(() => {
    fetchYtdUnits(plantPK, incompletePlantPK);
  }, [plantPK, incompletePlantPK]);
  useEffect(() => {
    fetchCustomerName(customerId);
  }, [customerId]);

  useEffect(() => {
    dispatch(setPlantName(name));
    dispatch(setPlantAddress(address1));
    dispatch(setPlantCity(city));
    dispatch(setPlantStateCode(statecode));
    dispatch(setPlantPostCode(postalcode));
    dispatch(setPlantCanadian(canadian));
    dispatch(setDealerZipPostLenght(zipPostLenght));
    dispatch(setplantYtdunit(ytdunits));
    dispatch(setPlantEstimateUnit(estimatedUnits));
    dispatch(setPlantFax(fax));
    dispatch(setPlantPhone(phone));
    dispatch(setCustomerFK(customerId));
    dispatch(setPostalPK(postalCodePK));
  }, [
    name,
    address1,
    city,
    statecode,
    postalcode,
    canadian,
    cityLength,
    zipPostLenght,
    ytdunits,
    estimatedUnits,
    fax,
    phone,
    customerId,
    postalCodePK,
  ]);

  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };

  useEffect(() => {
    if (viewDetail || name === "") {
      // setMessage("");

      dispatch(setPlantCheckName(""));
    }
  }, [viewDetail, name]);
  const changePostalCode = (e) => {
    dispatch(setPostalCodeOnChange(e));
  };

  useEffect(() => {
    generalTabFormData();
  }, [
    plantPK,
    incompletePlantPK,
    name,
    brand,
    customerId,
    productLine,
    address1,
    address2,
    city,
    statecode,
    postalcode,
    canadian,
    phone,
    fax,
    notes,
    lastOrderDate,
    ytdunits,
    estimatedUnits,
    customerFK,
    totalUnits,
  ]);
  //Validations
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const validationSchema = yup.object({
    //name: yup.string().required(),
    address1: yup.string().required(),
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    canadian: yup.boolean(),
    postalcode: yup.string().required(),

    phone: yup.string().matches(phoneRegex).required(),

    fax: yup.string().matches(phoneRegex),

    estimatedUnits: yup.string().required(),
  });
  //number validation
  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d]/g, "");

    if (value) return number;
  };
  return (
    <Formik
      initialValues={{
        city,
        statecode,
        postalcode,
        phone,
        fax,
        estimatedUnits,
        //  name,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        //   name: true,
        address1: true,
        city: true,
        statecode: true,
        phone: true,
        fax: true,
        postalcode: true,
        ytdunits: true,
        estimatedUnits: true,
      }}
    >
      {(formik) => (
        <Form on={formik.handle}>
          <div className="p-15 w-100">
            {(totalUnitsLoading || customerLoading) && <LoadingIcon />}
            <Row className="m-0 p-0">
              <Col sm={7} md={7} lg={7} xl={7} xs={7}>
                {/* Description Field*/}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.general.tab.customer")}
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      className="customFormControl"
                      id="customer"
                      name="customer"
                      type="customer"
                      value={customerName}
                      maxLength={30}
                      disabled
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.general.tab.name")}
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      className={`customFormControl ${
                        viewDetail === true || isCustomerPlantLoading
                          ? ""
                          : name
                            ? plantCheckName
                              ? "borderRed"
                              : "borderGreen"
                            : "borderRed"
                      }`}
                      name="name"
                      value={name}
                      disabled={viewDetail}
                      maxLength={30}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      onChange={(e) => {
                        // formik.handleChange(e);
                        setName(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        //  handleCheckName(e);
                        dispatch(setPlantCheckName(""));
                      }}
                      onBlur={(e) => {
                        if (e.target.value) {
                          handleCheckName(e.target.value);
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.general.tab.brand")}
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      className={`customFormControl`}
                      id="brand"
                      name="brand"
                      type="brand"
                      value={brand}
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      onInput={(e) => {
                        setBrand(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.general.tab.productLine")}
                    </Form.Label>
                  </Col>
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      className={`customFormControl`}
                      id="productLine"
                      name="productLine"
                      type="productLine"
                      value={productLine}
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      onInput={(e) => {
                        setProductLine(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.general.tab.address")}
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      className={`customFormControl ${
                        viewDetail === true || isCustomerPlantLoading
                          ? ""
                          : formik.errors.address === undefined && address1 !== null && address1.length >= 1
                            ? "borderGreen"
                            : formik.errors.address1 !== undefined
                              ? "borderRed"
                              : ""
                      }`}
                      name="ad1"
                      type="text"
                      maxLength={30}
                      value={address1}
                      autoComplete="one-time-code"
                      spellCheck={false}
                      aria-autocomplete="list"
                      disabled={viewDetail}
                      onInput={(e) => {
                        setAddress1(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      className={`customFormControl`}
                      id="ad2"
                      name="ad2"
                      type="text"
                      value={address2}
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="one-time-code"
                      spellCheck={false}
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setAddress2(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                      }}
                    />
                  </Col>
                </Form.Group>
                <PostalCodeComponent
                  disabled={viewDetail || isCustomerPlantLoading}
                  city={viewDetail ? editPlantData?.city?.trim() : city}
                  setCity={setCity}
                  stateCode={viewDetail ? editPlantData?.stateCode?.trim() : statecode}
                  setStateCode={setStateCode}
                  postalCode={viewDetail ? editPlantData?.postalCode?.trim() : postalcode}
                  setPostalCode={setPostalCode}
                  setPostalValues={setPostalValues}
                  postalOptions={postalOptions}
                  postalCodePK={postalCodePK}
                  setPostalCodePK={setPostalCodePK}
                  canadian={canadian}
                  setCanadian={setCanadian}
                />
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.general.tab.phone")}
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-92px">
                    <input
                      className={`customFormControl ${
                        viewDetail === true || isCustomerPlantLoading
                          ? ""
                          : phone !== "" && phone.length === 14
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      control="input"
                      name="phone"
                      value={phone}
                      maxLength={14}
                      disabled={viewDetail}
                      onChange={(e) => phoneFormatHandler(e)}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      onInput={(e) => {
                        formik.handleChange(e);
                        setPhone(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.general.tab.fax")}
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-92px">
                    <input
                      style={{
                        border:
                          viewDetail || isCustomerPlantLoading
                            ? ""
                            : String(fax).match(phoneRegex) || fax === ""
                              ? "black 1px solid"
                              : "red 2px solid",
                      }}
                      className="customFormControl"
                      type="fax"
                      name="fax"
                      value={fax}
                      onChange={(e) => faxFormatHandler(e)}
                      maxLength={14}
                      disabled={viewDetail}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      onInput={(e) => {
                        formik.handleChange(e);
                        setFax(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={5} md={5} xs={5} className="ps-lg-0">
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.general.tab.lastorder")}
                    </Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                    <DateInputField
                      date={lastOrderDate}
                      //  setIsDateValid={setIsLastOrderDateFormat}

                      // setDate={setLastOrderDate}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Total Units</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                    <input
                      className={`customFormControl`}
                      id="totalUnits"
                      name="totalUnits"
                      type="totalUnits"
                      value={totalUnits}
                      maxLength={10}
                      disabled
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.general.tab.ytdunits")}
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                    <input
                      className={`customFormControl`}
                      id="ytdunits"
                      name="ytdunits"
                      type="ytdunits"
                      value={ytdunits}
                      maxLength={10}
                      disabled
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.general.tab.estimatedunits")}
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                    <input
                      className={`customFormControl ${
                        viewDetail === true || isCustomerPlantLoading
                          ? ""
                          : estimatedUnits !== "" && estimatedUnits <= 2147483647
                            ? "borderGreen"
                            : formik.errors.estimatedUnits !== undefined || estimatedUnits >= 2147483648
                              ? "borderRed"
                              : ""
                      }`}
                      id="estimatedUnits"
                      name="estimatedUnits"
                      type="estimatedUnits"
                      value={estimatedUnits}
                      maxLength={10}
                      disabled={viewDetail}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      onInput={(e) => {
                        setEstimatedUnits(isNumber(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <label className="col-form-label dealer-label p-0 m-b-20">
                      {t("edit.customer.plant.page.general.tab.notes")}
                    </label>
                  </Col>

                  <Col sm={12} md={10} className="p-0">
                    <textarea
                      rows={10}
                      cols={20}
                      type="text"
                      className="customFormControl h-100 "
                      name="notes"
                      value={notes}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      disabled={viewDetail}
                      onInput={(e) => setNotes(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default GeneralTabs;
