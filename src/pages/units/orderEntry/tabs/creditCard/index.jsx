import { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useFormContext, useWatch } from "react-hook-form";
import useCreditCard from "./useCreditCard";
import { useSelector } from "react-redux";
import { set } from "zod";
import Loading from "../../../../../components/common/loading";
const CreditCard = ({ styles }) => {
  const { watch, setValue, trigger, getValues, control } = useFormContext();
  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);
  const {
    invoiceAmount,
    remainAmount,
    selectedIndex,
    setSelectedIndex,
    cardNumber,
    setCardNumber,
    expDate,
    setExpDate,
    billAddress,
    setBillAddress,
    billZipCode,
    setBillZipCode,
    editMode,
    setEditMode,
    unmaskedCardNumber,
    setUnMaskedCardNumber,
    HandlerExpDate,
    normalZipValidation,
    canadianZipValidation,
    normalZipValidationState,
    canadianZipValidationState,
    checkZipCodeExist,
    checkZip,
    dateErr,
    setDateErr,
    securityCode,
    setSecurityCode,

    authorizedCardDatas,
    setAuthorizedCardDatas,
    renderAuthorizedDatas,
    saveHandler,
    deleteHandler,
    cardDatas,
    defaultValue,
    setDefaultValue,
    chargeAmount,
    authorizeHandler,
    editHandler,
    disableSave,
    cancelHandler,
    setChargeAmount,
    disableChargeAmount,
    setDisableChargeAmount,
    disableUnitperCharge,
    newHandler,
    handleChargeAmount,
    cardSelectHandler,
    unitsPerCharge,
    setUnitsPerCharge,
    loading,
    handleUnitsPerCharge,
    unitsPerChargeFlag,
    isCustomerCardSelected,
  } = useCreditCard();
  const customer = useWatch({ name: "customer" });
  //selectedCustomer

  const isValidDecimal = (value) => {
    if (value === "" || value === "0") return true;

    // 1–5 digits with optional .xx  OR  leading dot with 1–2 digits
    const regexp = /^(?:\d{1,5}(?:\.\d{1,2})?|\.\d{1,2})$/;
    return regexp.test(value);
  };
  const renderDropData = cardDatas?.map((i, index) => (
    <option value={i.customerCreditCardPK} key={index}>
      {i.creditCardNumber?.replace(/[0-9](?=.*.{4})/gim, "X")}
    </option>
  ));
  return (
    <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
      <Row className={styles.creditCardTable}>
        <Col lg={5} xl={5} sm={5} md={5} xs={5} className={" ps-0 p-l-10"}>
          <p className="mt-3 ">Credit Cards Authorized</p>
          <div className={`border border-secondary overflow-auto ${styles.plantNameTable}`}>
            <table className="table border-bottom  table-striped f-w-600">
              <thead>
                <tr disabled>
                  <th className="col-6">Card Number</th>

                  <th className="col-4">Authorized Amount</th>
                </tr>
              </thead>

              <tbody>{renderAuthorizedDatas}</tbody>
            </table>
            {authorizedCardDatas?.length == 0 && (
              <p className="pt-3" align="center" style={{ fontSize: "0.8rem" }}>
                No Records Available
              </p>
            )}
          </div>
          <Row className="d-flex justify-content-between">
            <Col></Col>
            <Col className="d-flex justify-content-end">
              <div>
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <button
                      type="button"
                      className="btn btn-secondary font-12 btn-sm btn-medium-with"
                      onClick={newHandler}
                      disabled={
                        editMode ||
                        //|| Number(remainAmount) === 0
                        selectedIndex != null
                      }
                    >
                      New
                    </button>
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <button
                      type="button"
                      className="btn btn-secondary font-12 btn-sm btn-medium-with"
                      disabled={selectedIndex === null || !disableChargeAmount}
                      onClick={editHandler}
                    >
                      Edit
                    </button>
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <button
                      type="button"
                      className="btn btn-secondary font-12 btn-sm btn-medium-with"
                      disabled={
                        !(disableSave || isCustomerCardSelected) ||
                        !Number(chargeAmount) ||
                        (!disableChargeAmount && !isValidDecimal(chargeAmount))
                      }
                      onClick={saveHandler}
                    >
                      Save
                    </button>
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <button
                      type="button"
                      className="btn btn-secondary font-12 btn-sm btn-medium-with"
                      disabled={disableChargeAmount}
                      onClick={cancelHandler}
                    >
                      Cancel
                    </button>
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <button
                      type="button"
                      className="btn btn-secondary font-12 btn-sm btn-medium-with"
                      disabled={selectedIndex === null || editMode}
                      onClick={deleteHandler}
                    >
                      Delete
                    </button>
                  </Col>
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Col>

        <Col lg={5} sm={5} md={5} xs={5} className={"ps-0"}>
          <div className="ms-4">
            <div>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Invoice Amount</Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "95px" }}>
                  <input
                    className="customFormControl"
                    id="invoiceamt"
                    name="invoiceamt"
                    type="search"
                    value={Number(invoiceAmount)?.toFixed(2) ?? 0}
                    maxLength={30}
                    disabled
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Remaining Amount</Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "95px" }}>
                  <input
                    className="customFormControl"
                    id="remainamt"
                    name="remainamt"
                    type="search"
                    value={Number(remainAmount)?.toFixed(2) ?? 0}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Charge Amount</Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "95px" }}>
                  <input
                    className={`customFormControl ${
                      !editMode || disableChargeAmount
                        ? "black"
                        : !isValidDecimal(chargeAmount) || !chargeAmount
                          ? "borderRed"
                          : ""
                    }`}
                    id="chargeamt"
                    name="chargeamt"
                    type="text"
                    maxLength={10}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={chargeAmount}
                    disabled={customer.batchLoads || disableChargeAmount}
                    onChange={handleChargeAmount}
                  />
                </Col>
              </Form.Group>
              {customer.batchLoads ? (
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Units Per Charge</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      className={`customFormControl ${
                        unitsPerCharge
                          ? !unitsPerChargeFlag && !unitsPerCharge
                            ? "borderRed"
                            : unitsPerChargeFlag
                              ? ""
                              : ""
                          : ""
                      }`}
                      id="unitprchrg"
                      name="unitprchrg"
                      type="search"
                      maxLength={30}
                      value={customer.batchLoads ? unitsPerCharge : ""}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={!customer.batchLoads || disableUnitperCharge}
                      onChange={handleUnitsPerCharge}
                    />
                  </Col>
                </Form.Group>
              ) : null}
            </div>
            <div className="p-t-30">
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Customer Credit Card</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className={`p-0 `}>
                  <Form.Select
                    disabled={!editMode}
                    className="customFormControl py-0"
                    name="custcredcard"
                    id="custcredcard"
                    onChange={cardSelectHandler}
                    value={defaultValue ?? "00"}
                  >
                    {cardDatas?.[0]?.isPrimary === false && <option value="">Select Card</option>}
                    {renderDropData}
                    {/* {cardDatas?.map((card) => (
                      <option value={card.customerCreditCardPK} key={card.customerCreditCardPK}>
                        {card.creditCardNumber?.replace(/\d(?=\d{4})/g, "X")}
                      </option>
                    ))} */}

                    <option value="00">Enter Manually</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Credit Card Number</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className="p-0">
                  <input
                    className={`customFormControl     ${
                      !editMode
                        ? "black"
                        : cardNumber?.length === 16 || cardNumber?.length === 15
                          ? "borderGreen"
                          : "borderRed"
                    }`}
                    id="crecarnum"
                    name="crecarnum"
                    type="text"
                    maxLength={16}
                    autoComplete="one-time-code"
                    spellCheck={false}
                    aria-autocomplete="none"
                    value={cardNumber ?? ""}
                    onBlur={(e) => {
                      setUnMaskedCardNumber(cardNumber);
                      setCardNumber(cardNumber?.replace(/[0-9](?=.*.{4})/gim, "X"));
                    }}
                    onInput={(e) => {
                      const cardNumber = e.target.value?.replace(/[^\d:.\d{1}]/g, "");
                      setCardNumber(cardNumber);
                      setUnMaskedCardNumber(e.target.value);
                    }}
                    disabled={!editMode}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 form-group   align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Expiration Date</Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0 align-items-center d-flex">
                  <input
                    className={`customFormControl ${
                      !editMode
                        ? // ? remainAmount === 0
                          ""
                        : expDate?.length > 4
                          ? dateErr
                            ? "borderRed"
                            : "borderGreen"
                          : "borderRed"
                      //  : ""
                    }`}
                    id="expdate"
                    name="expdate"
                    type="text"
                    maxLength={5}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={expDate}
                    placeholder="mm/yy"
                    style={{ width: "55px" }}
                    disabled={!editMode}
                    onChange={HandlerExpDate}
                  />
                  {/* <p className="text-danger mb-0 ms-3 col-6 text-capitalize"> {dateErr && "card error"}</p> */}
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Billing Address</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className="p-0">
                  <input
                    className="customFormControl"
                    id="billadd"
                    name="billadd"
                    type="search"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={billAddress}
                    disabled={!editMode}
                    onChange={(e) => {
                      setBillAddress(e.target.value);
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Billing Zipcode</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    className={`customFormControl
                    ${
                      !editMode
                        ? ""
                        : !billZipCode
                          ? ""
                          : selectedCustomer?.canadian
                            ? canadianZipValidationState == null
                              ? ""
                              : canadianZipValidationState
                                ? !checkZip
                                  ? "borderRed"
                                  : "borderGreen"
                                : "borderRed"
                            : normalZipValidationState == null
                              ? ""
                              : normalZipValidationState
                                ? !checkZip
                                  ? "borderRed"
                                  : "borderGreen"
                                : "borderRed"
                    }
                    
                    }`}
                    id="billzip"
                    name="billzip"
                    type="search"
                    maxLength={selectedCustomer?.canadian ? 7 : 10}
                    autoComplete="off"
                    aria-autocomplete="list"
                    style={{ width: "77px" }}
                    value={billZipCode}
                    disabled={!editMode}
                    onBlur={checkZipCodeExist}
                    onChange={(e) => {
                      selectedCustomer?.canadian ? canadianZipValidation(e) : normalZipValidation(e);
                    }}
                    onInput={(e) => {
                      let value = e.target.value;
                      if (selectedCustomer?.canadian) {
                        value = value?.toUpperCase().replace(/[^A-Z0-9 ]/g, "");
                        if (value?.length > 3 && value.indexOf(" ") === -1) {
                          value = value.slice(0, 3) + " " + value.slice(3);
                        }
                      } else {
                        value = value?.replace(/[^0-9\-]/g, "");
                        if (value?.length > 5 && value.indexOf("-") === -1) {
                          value = value.slice(0, 5) + "-" + value.slice(5);
                        }
                      }
                      setBillZipCode(value);
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Security Code</Form.Label>
                </Col>

                <Col xs={1} md={1} sm={1} className="p-0 w-25px">
                  <input
                    className={`customFormControl     ${
                      !editMode ? "black" : securityCode?.length >= 3 ? "borderGreen" : "borderRed"
                    }`}
                    id="seccode"
                    name="seccode"
                    disabled={!editMode}
                    type="search"
                    maxLength={4}
                    style={{ width: "55px" }}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={securityCode}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setSecurityCode(value);
                      }
                    }}
                  />
                </Col>
              </Form.Group>

              {}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <button
                    type="button"
                    className="btn btn-secondary font-12 btn-sm btn-medium-with"
                    disabled={
                      (cardNumber?.length === 16 || cardNumber?.length === 15) &&
                      Number(chargeAmount) > 0 &&
                      expDate &&
                      !dateErr &&
                      securityCode?.length >= 3 &&
                      !loading &&
                      (!billZipCode || (billZipCode && checkZip)) &&
                      selectedIndex === null &&
                      !isCustomerCardSelected
                        ? // &&
                          false
                        : true
                    }
                    onClick={authorizeHandler}
                  >
                    {loading === true ? (
                      <div className="loader-container">
                        <div className="loader_YardCheckin"></div>
                      </div>
                    ) : (
                      "Authorize Card"
                    )}
                  </button>
                </Col>
              </Form.Group>
            </div>
          </div>
          <div></div>
        </Col>
      </Row>
    </div>
  );
};

export default CreditCard;
