import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setDriverExportFlag,
  setEmailArrayDriver,
  setEmailToDriver,
  setEmailToUserDriver,
  setPrintDriver,
} from "../../../../../redux/Invoicing/InvoiceInquirySlice";

const DriverExportContent = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.invoiceInquiryReducer.email);

  const printDriver = useSelector((state) => state.invoiceInquiryReducer.printDriver);
  const emailToDriver = useSelector((state) => state.invoiceInquiryReducer.emailToDriver);
  const emailArrayDriver = useSelector((state) => state.invoiceInquiryReducer.emailArrayDriver);
  const emailToUserDriver = useSelector((state) => state.invoiceInquiryReducer.emailToUserDriver);

  const multipleEmailRegex =
    /^(\s*|\s*[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}(,\s*[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,})*\s*)$/;
  //const isEmailValid = multipleEmailRegex.test(email);
  const [inputValue, setInputValue] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Split and validate every entry
    const emails = value?.split(",").map((email) => email?.trim());
    const allValid = emails?.every((email) => email === "" || emailRegex.test(email));
    setIsEmailValid(allValid);
  };

  const handleBlurOrEnter = () => {
    const emailArray = inputValue
      .split(",")
      .map((email) => email?.trim())
      .filter((email) => emailRegex.test(email));

    dispatch(setEmailArrayDriver(emailArray));
  };

  //DISABLE EXPORT

  useEffect(() => {
    const hasPrint = printDriver;
    const hasEmailFlags = emailToUserDriver || emailToDriver;

    if (hasPrint || (hasEmailFlags && isEmailValid)) {
      dispatch(setDriverExportFlag(false));
    } else {
      dispatch(setDriverExportFlag(true));
    }
  }, [printDriver, emailToUserDriver, emailToDriver, emailArrayDriver, isEmailValid]);

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border p-1" style={{ height: "432px" }}>
        <Col className="ps-3">
          <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 `}>
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={` col-form-label dealer-label`}>Print</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                value={printDriver}
                checked={printDriver}
                onChange={(e) => dispatch(setPrintDriver(e.target.checked))}
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 `}>
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={` col-form-label dealer-label`}>Email To Driver</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                value={emailToDriver}
                checked={emailToDriver}
                onChange={(e) => dispatch(setEmailToDriver(e.target.checked))}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 `}>
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={` col-form-label dealer-label`}>Email To User</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                value={emailToUserDriver}
                checked={emailToUserDriver}
                onChange={(e) => dispatch(setEmailToUserDriver(e.target.checked))}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-start row  m-l-0 m-r-0 ms-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label htmlFor="name" className={`col-form-label  dealer-label`}>
                Email
              </Form.Label>
            </Col>

            <Col xs={9} md={9} sm={9} className="p-0">
              <input
                className={`customFormControl ${
                  inputValue?.trim() === "" ? "borderBlack" : isEmailValid ? "borderGreen" : "borderRed"
                }`}
                id="emailInput"
                name="emailInput"
                type="text"
                value={inputValue}
                onChange={handleChange}
                onBlur={handleBlurOrEnter}
                autoComplete="off"
              />
            </Col>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
};
export default DriverExportContent;
