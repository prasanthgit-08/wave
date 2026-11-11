import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPrint,
  setEmailToCustomer,
  setEmailToUser,
  setIncludeCompanyDocument,
  setIncludeCustomerDocument,
  setEmailArray,
  setExportFlag,
} from "../../../../../redux/Invoicing/InvoiceInquirySlice";

const UnitExportContent = () => {
  const dispatch = useDispatch();

  const email = useSelector((state) => state.invoiceInquiryReducer.email);
  const multipleEmailRegex =
    /^(\s*|\s*[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}(,\s*[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,})*\s*)$/;
  //const isEmailValid = multipleEmailRegex.test(email);
  const print = useSelector((state) => state.invoiceInquiryReducer.print);
  const emailToCustomer = useSelector((state) => state.invoiceInquiryReducer.emailToCustomer);
  const includeCompanyDocument = useSelector((state) => state.invoiceInquiryReducer.includeCompanyDocument);
  const emailToUser = useSelector((state) => state.invoiceInquiryReducer.emailToUser);
  const includeCustomerDocument = useSelector((state) => state.invoiceInquiryReducer.includeCustomerDocument);
  const emailArray = useSelector((state) => state.invoiceInquiryReducer.emailArray);

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

    dispatch(setEmailArray(emailArray));
  };

  //DISABLE EXPORT

  useEffect(() => {
    const hasPrint = print;
    const hasEmailFlags = emailToUser || emailToCustomer;

    if (hasPrint || (hasEmailFlags && isEmailValid)) {
      dispatch(setExportFlag(false));
    } else {
      dispatch(setExportFlag(true));
    }
  }, [print, emailToUser, emailToCustomer, isEmailValid]);
  return (
    <div className="m-1">
      <div className="shadow-sm rounded border p-1" style={{ height: "432px" }}>
        <Col className="ps-3">
          <Form.Group className={`mt-5 form-group  align-items-center row  m-l-0 m-r-0 ms-0 `}>
            <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "175px" }}>
              <Form.Label className={` col-form-label dealer-label`}>Print</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                value={print}
                checked={print}
                onChange={(e) => dispatch(setPrint(e.target.checked))}
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 `}>
            <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "175px" }}>
              <Form.Label className={` col-form-label dealer-label`}>Email To Customer</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                value={emailToCustomer}
                checked={emailToCustomer}
                onChange={(e) => dispatch(setEmailToCustomer(e.target.checked))}
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 `}>
            <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "175px" }}>
              <Form.Label className={` col-form-label dealer-label`}>Include Company Documents</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                value={includeCompanyDocument}
                checked={includeCompanyDocument}
                onChange={(e) => dispatch(setIncludeCompanyDocument(e.target.checked))}
                disabled={
                  !(emailToCustomer || emailToUser || (inputValue?.trim() !== "" && isEmailValid === true))
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 `}>
            <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "175px" }}>
              <Form.Label className={` col-form-label dealer-label`}>Include Customer Documents</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                value={includeCustomerDocument}
                checked={includeCustomerDocument}
                onChange={(e) => dispatch(setIncludeCustomerDocument(e.target.checked))}
                disabled={
                  !(emailToCustomer || emailToUser || (inputValue?.trim() !== "" && isEmailValid === true))
                }
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 `}>
            <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "175px" }}>
              <Form.Label className={` col-form-label dealer-label`}>Email To User</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                value={emailToUser}
                checked={emailToUser}
                onChange={(e) => dispatch(setEmailToUser(e.target.checked))}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-start row  m-l-0 m-r-0 ms-0">
            <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "175px" }}>
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
export default UnitExportContent;
