import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DynamicTextFields from "../../../../common/AutoWrapTextFields/DynamicTextFields";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetFields,
  setCustomerEmail,
  setDriverInvoiceTextData,
  setEmailFormat,
  setEmailToDriver,
  setEmaiToUser,
  setPrint,
  setTextTabDescription,
  setPoNumber,
} from "../../../../../redux/DriverInvoiceSlice";

const General = () => {
  window.addEventListener("popstate", () => {
    dispatch(resetFields());
    navigate(`/driver-invoice-browse`);
  });

  const driverId = useSelector((state) => state.driverInvoiceReducer.driverId);
  const textTabDescription = useSelector((state) => state.driverInvoiceReducer.textTabDescription);
  const manualSaveFlag = useSelector((state) => state.driverInvoiceReducer.manualSaveFlag);
  const customerEmail = useSelector((state) => state.driverInvoiceReducer.customerEmail);
  const emailFormat = useSelector((state) => state.driverInvoiceReducer.emailFormat);
  const driverInvoiceTextData = useSelector((state) => state.driverInvoiceReducer.driverInvoiceTextData);
  const changesCancelled = useSelector((state) => state.driverInvoiceReducer.changesCancelled);
  const sisterUnitFK = useSelector((state) => state.driverInvoiceReducer.sisterUnitFK);
  const selectedCompanyName = useSelector((state) => state.driverInvoiceReducer.selectedCompanyName);
  const companyName = useSelector((state) => state.driverInvoiceReducer.companyName);
  const companyFK = useSelector((state) => state.driverInvoiceReducer.companyFK);
  const isNonUnit = useSelector((state) => state.driverInvoiceReducer.isNonUnit);
  const emailToDriver = useSelector((state) => state.driverInvoiceReducer.emailToDriver);
  const emailToUser = useSelector((state) => state.driverInvoiceReducer.emailToUser);
  const print = useSelector((state) => state.driverInvoiceReducer.print);
  const poNumber = useSelector((state) => state.driverInvoiceReducer.poNumber);
  const sum = useSelector((state) => state.driverInvoiceReducer.sum);
  const params = useParams();
  const unitId = params.unitId;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (emailList) => {
    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;

    return emailList
      .split(",")
      .map((email) => email?.trim())
      .every((email) => emailRegex.test(email));
  };

  useEffect(() => {
    dispatch(
      setDriverInvoiceTextData({
        ...driverInvoiceTextData,
        PONumber: poNumber || "",
        miscellaneousUnit: textTabDescription || "",
        invoiceAmount: sum,
        emailToDriver: emailToDriver,
        emailToUser: emailToUser,
        emailToCustomer: customerEmail,
        manualSaveFlag: manualSaveFlag,
        driverId: driverId || null,
        unitFK: unitId ? unitId : 0,
        sisterUnitFK: unitId,
        companyFK: companyFK,
        print: print,
      })
    );
  }, [
    textTabDescription,
    driverId,
    sum,
    unitId,
    sisterUnitFK,
    selectedCompanyName,
    companyName,
    companyFK,
    poNumber,
    emailToDriver,
    emailToUser,
    customerEmail,
    print,
  ]);

  useEffect(() => {
    if (changesCancelled) {
      dispatch(setTextTabDescription(""));
    }
  }, [changesCancelled]);

  return (
    <Formik initialValues={{}} validateOnMount enableReinitialize={true}>
      {(formik) => (
        <Form on={formik.handle}>
          <div className="w-100 mt-2 ps-3" style={{ height: "390px" }}>
            <Row className="ps-1 pe-1 mb-4 mt-2">
              <Col sm={10} md={10} lg={10} xl={10} xs={10} className="mt-2" style={{ height: "390px" }}>
                {isNonUnit ? (
                  <>
                    <Form.Group className="mt-1 align-items-center row m-l-0 m-r-0 ms-0">
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label htmlFor="description" className="col-form-label dealer-label">
                          Description
                        </Form.Label>
                      </Col>

                      <Col xs={4} md={4} sm={4} className="p-0">
                        <input
                          className={`customFormControl ${textTabDescription ? "borderGreen" : "borderRed"}`}
                          id="description"
                          name="description"
                          type="text"
                          value={textTabDescription}
                          maxLength={21}
                          autoComplete="off"
                          aria-autocomplete="list"
                          onInput={(e) => {
                            dispatch(setTextTabDescription(e.target.value.toUpperCase()));
                          }}
                          onBeforeInput={(e) => {
                            if (e.data === " " && e.target.value?.trim().length === 0) {
                              e.preventDefault();
                            }
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0 ms-0">
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label htmlFor="poNumber" className="col-form-label dealer-label">
                          PO Number
                        </Form.Label>
                      </Col>

                      <Col xs={4} md={4} sm={4} className="p-0">
                        <input
                          className={`customFormControl`}
                          id="poNumber"
                          name="poNumber"
                          type="text"
                          value={poNumber}
                          maxLength={30}
                          autoComplete="off"
                          aria-autocomplete="list"
                          onInput={(e) => {
                            dispatch(setPoNumber(e.target.value));
                          }}
                          onBeforeInput={(e) => {
                            if (e.data === " " && e.target.value?.trim().length === 0) {
                              e.preventDefault();
                            }
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Col>
                    </Form.Group>
                  </>
                ) : (
                  <>
                    <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0 ms-0" />
                    <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0 ms-0" />
                  </>
                )}

                <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Print</Form.Label>
                  </Col>
                  <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        !print &&
                        !emailToDriver &&
                        !emailToUser &&
                        ((customerEmail !== "" && !emailFormat) || customerEmail === "")
                          ? "borderRed"
                          : customerEmail && emailFormat
                            ? ""
                            : print
                              ? "borderGreen"
                              : ""
                      }`}
                      value={print}
                      checked={print}
                      onChange={(e) => dispatch(setPrint(e.target.checked))}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Email To Driver</Form.Label>
                  </Col>
                  <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        !print &&
                        !emailToDriver &&
                        !emailToUser &&
                        ((customerEmail !== "" && !emailFormat) || customerEmail === "")
                          ? !driverId
                            ? ""
                            : "borderRed"
                          : customerEmail && emailFormat
                            ? ""
                            : emailToDriver
                              ? "borderGreen"
                              : ""
                      }`}
                      value={emailToDriver}
                      checked={emailToDriver}
                      disabled={!driverId}
                      onChange={(e) => {
                        dispatch(setEmailToDriver(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Email To User</Form.Label>
                  </Col>
                  <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        !print &&
                        !emailToDriver &&
                        !emailToUser &&
                        ((customerEmail !== "" && !emailFormat) || customerEmail === "")
                          ? "borderRed"
                          : customerEmail && emailFormat
                            ? ""
                            : emailToUser
                              ? "borderGreen"
                              : ""
                      }`}
                      value={emailToUser}
                      checked={emailToUser}
                      onChange={(e) => {
                        dispatch(setEmaiToUser(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Row className={"hide-elements"}>
                  <Col xs={2} md={2} sm={2}></Col>
                  <Col style={{ paddingLeft: "1px" }}>
                    <p className="p-0 text-danger alert" style={{ height: "1px" }}></p>
                  </Col>
                </Row>

                <Form.Group className="my-3 form-group  align-items-center row  m-l-0 m-r-0 m-t-5">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Email To</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl ${
                        !emailFormat && customerEmail !== ""
                          ? "borderRed"
                          : !print &&
                              !emailToDriver &&
                              !emailToUser &&
                              ((!emailFormat && customerEmail !== "") || customerEmail === "")
                            ? "borderRed"
                            : customerEmail
                              ? "borderGreen"
                              : ""
                      }`}
                      id="email"
                      name="email"
                      value={customerEmail}
                      maxLength={70}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        const emailValue = e.target.value;
                        const isValidEmail1 = validateEmail(emailValue);
                        dispatch(setCustomerEmail(emailValue));
                        dispatch(setEmailFormat(isValidEmail1));
                      }}
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

export default General;
