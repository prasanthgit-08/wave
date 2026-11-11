import { t } from "i18next";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row } from "react-bootstrap";
import { setCustomerFormData } from "../../../../../redux/CustomerMaintenanceSlice";
import DynamicTextFields from "../../../../common/AutoWrapTextFields/DynamicTextFields";
import Input from "../../../../../components/common/input";
import { removeLeadingWhitespace } from "../../../../../utils/utils";

function BOLTextTabs(styles) {
  const dispatch = useDispatch();

  const [paperwork1, setPaperwork1] = useState("");
  const [paperwork2, setPaperwork2] = useState("");
  const [paperwork3, setPaperwork3] = useState("");
  const [paperwork4, setPaperwork4] = useState("");
  const [paperwork5, setPaperwork5] = useState("");
  const [paperwork6, setPaperwork6] = useState("");
  const [paperwork7, setPaperwork7] = useState("");
  const [paperwork8, setPaperwork8] = useState("");
  const [paperwork9, setPaperwork9] = useState("");
  const [paperwork10, setPaperwork10] = useState("");
  const [paperwork11, setPaperwork11] = useState("");
  const [paperwork12, setPaperwork12] = useState("");
  const [paperwork13, setPaperwork13] = useState("");
  const [authorizedBy, setAuthorizedBy] = useState("");

  const [customerCOD1, setCustomerCOD1] = useState("");
  const [customerCOD2, setCustomerCOD2] = useState("");
  const [customerCOD3, setCustomerCOD3] = useState("");
  const [customerCOD4, setCustomerCOD4] = useState("");
  const [customerCOD5, setCustomerCOD5] = useState("");
  const [customerCOD6, setCustomerCOD6] = useState("");
  const [customerCOD7, setCustomerCOD7] = useState("");
  const [miscellaneousText1, setMiscellaneousText1] = useState("");
  const [miscellaneousText2, setMiscellaneousText2] = useState("");
  const [miscellaneousText3, setMiscellaneousText3] = useState("");
  const [miscellaneousText4, setMiscellaneousText4] = useState("");
  const [miscellaneousText5, setMiscellaneousText5] = useState("");
  const [miscellaneousText6, setMiscellaneousText6] = useState("");
  const [miscellaneousText7, setMiscellaneousText7] = useState("");

  const [overrideDealerWashInstructions, setOverrideDealerWashInstructions] = useState("");
  const [washInstructions1, setWashInstructions1] = useState("");
  const [washInstructions2, setWashInstructions2] = useState("");
  const [washInstructions3, setWashInstructions3] = useState("");
  const [washInstructions4, setWashInstructions4] = useState("");
  const [washInstructions5, setWashInstructions5] = useState("");
  const [driverWashInstructions, setDriverWashInstructions] = useState("");

  const [bolTextPaperworkInputValues, setBolTextPaperworkInputValues] = useState(Array(13).fill(""));
  const [bolTextCustomerCODInputValues, setBolTextCustomerCODInputValues] = useState(Array(7).fill(""));
  const [bolTextMiscellaneousTextInputValues, setBolTextMiscellaneousTextInputValues] = useState(
    Array(7).fill("")
  );
  const [bolTextWashInstructionsInputValues, setBolTextWashInstructionsInputValues] = useState(
    Array(5).fill("")
  );

  var concatWashInstrcutions = null;

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);
  useEffect(() => {
    if (editCustomerData === null) {
      setPaperwork1("");
      setPaperwork2("");
      setPaperwork3("");
      setPaperwork4("");
      setPaperwork5("");
      setPaperwork6("");
      setPaperwork7("");
      setPaperwork8("");
      setPaperwork9("");
      setPaperwork10("");
      setPaperwork11("");
      setPaperwork12("");
      setPaperwork13("");
      setAuthorizedBy("");
      setBolTextPaperworkInputValues(Array(13).fill(""));

      setCustomerCOD1("");
      setCustomerCOD2("");
      setCustomerCOD3("");
      setCustomerCOD4("");
      setCustomerCOD5("");
      setCustomerCOD6("");
      setCustomerCOD7("");
      setBolTextCustomerCODInputValues(Array(7).fill(""));
      setMiscellaneousText1("");
      setMiscellaneousText2("");
      setMiscellaneousText3("");
      setMiscellaneousText4("");
      setMiscellaneousText5("");
      setMiscellaneousText6("");
      setMiscellaneousText7("");
      setBolTextMiscellaneousTextInputValues(Array(7).fill(""));

      setOverrideDealerWashInstructions("");
      setWashInstructions1("");
      setWashInstructions2("");
      setWashInstructions3("");
      setWashInstructions4("");
      setWashInstructions5("");
      setBolTextWashInstructionsInputValues(Array(5).fill(""));
      setDriverWashInstructions("");
    }
    if (editCustomerData !== null) {
      setPaperwork1(editCustomerData.paperwork1 != null ? editCustomerData.paperwork1 : "");
      setPaperwork2(editCustomerData.paperwork2 != null ? editCustomerData.paperwork2 : "");
      setPaperwork3(editCustomerData.paperwork3 != null ? editCustomerData.paperwork3 : "");
      setPaperwork4(editCustomerData.paperwork4 != null ? editCustomerData.paperwork4 : "");
      setPaperwork5(editCustomerData.paperwork5 != null ? editCustomerData.paperwork5 : "");
      setPaperwork6(editCustomerData.paperwork6 != null ? editCustomerData.paperwork6 : "");
      setPaperwork7(editCustomerData.paperwork7 != null ? editCustomerData.paperwork7 : "");
      setPaperwork8(editCustomerData.paperwork8 != null ? editCustomerData.paperwork8 : "");
      setPaperwork9(editCustomerData.paperwork9 != null ? editCustomerData.paperwork9 : "");
      setPaperwork10(editCustomerData.paperwork10 != null ? editCustomerData.paperwork10 : "");
      setPaperwork11(editCustomerData.paperwork11 != null ? editCustomerData.paperwork11 : "");
      setPaperwork12(editCustomerData.paperwork12 != null ? editCustomerData.paperwork12 : "");
      setPaperwork13(editCustomerData.paperwork13 != null ? editCustomerData.paperwork13 : "");
      setAuthorizedBy(editCustomerData.authorizedBy != null ? editCustomerData.authorizedBy : "");

      setCustomerCOD1(editCustomerData.customerCOD1 != null ? editCustomerData.customerCOD1 : "");
      setCustomerCOD2(editCustomerData.customerCOD2 != null ? editCustomerData.customerCOD2 : "");
      setCustomerCOD3(editCustomerData.customerCOD3 != null ? editCustomerData.customerCOD3 : "");
      setCustomerCOD4(editCustomerData.customerCOD4 != null ? editCustomerData.customerCOD4 : "");
      setCustomerCOD5(editCustomerData.customerCOD5 != null ? editCustomerData.customerCOD5 : "");
      setCustomerCOD6(editCustomerData.customerCOD6 != null ? editCustomerData.customerCOD6 : "");
      setCustomerCOD7(editCustomerData.customerCOD7 != null ? editCustomerData.customerCOD7 : "");
      setMiscellaneousText1(editCustomerData.miscellaneous1 != null ? editCustomerData.miscellaneous1 : "");
      setMiscellaneousText2(editCustomerData.miscellaneous2 != null ? editCustomerData.miscellaneous2 : "");
      setMiscellaneousText3(editCustomerData.miscellaneous3 != null ? editCustomerData.miscellaneous3 : "");
      setMiscellaneousText4(editCustomerData.miscellaneous4 != null ? editCustomerData.miscellaneous4 : "");
      setMiscellaneousText5(editCustomerData.miscellaneous5 != null ? editCustomerData.miscellaneous5 : "");
      setMiscellaneousText6(editCustomerData.miscellaneous6 != null ? editCustomerData.miscellaneous6 : "");
      setMiscellaneousText7(editCustomerData.miscellaneous7 != null ? editCustomerData.miscellaneous7 : "");

      setOverrideDealerWashInstructions(
        editCustomerData.overrideDealerWashInstructions != null
          ? editCustomerData.overrideDealerWashInstructions
          : ""
      );
      setWashInstructions1(
        editCustomerData.washInstructions1 != null ? editCustomerData.washInstructions1 : ""
      );
      setWashInstructions2(
        editCustomerData.washInstructions2 != null ? editCustomerData.washInstructions2 : ""
      );
      setWashInstructions3(
        editCustomerData.washInstructions3 != null ? editCustomerData.washInstructions3 : ""
      );
      setWashInstructions4(
        editCustomerData.washInstructions4 != null ? editCustomerData.washInstructions4 : ""
      );
      setWashInstructions5(
        editCustomerData.washInstructions5 != null ? editCustomerData.washInstructions5 : ""
      );
      setDriverWashInstructions(
        editCustomerData.washInstructions != null ? editCustomerData.washInstructions : ""
      );
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    bolTextFormData();
  }, [
    paperwork1,
    paperwork2,
    paperwork3,
    paperwork4,
    paperwork5,
    paperwork6,
    paperwork7,
    paperwork8,
    paperwork9,
    paperwork10,
    paperwork11,
    paperwork12,
    paperwork13,
    bolTextPaperworkInputValues,
    authorizedBy,
    customerCOD1,
    customerCOD2,
    customerCOD3,
    customerCOD4,
    customerCOD5,
    customerCOD6,
    customerCOD7,
    bolTextCustomerCODInputValues,
    miscellaneousText1,
    miscellaneousText2,
    miscellaneousText3,
    miscellaneousText4,
    miscellaneousText5,
    miscellaneousText6,
    miscellaneousText7,
    bolTextMiscellaneousTextInputValues,
    overrideDealerWashInstructions,
    washInstructions1,
    washInstructions2,
    washInstructions3,
    washInstructions4,
    washInstructions5,
    bolTextWashInstructionsInputValues,
    driverWashInstructions,
  ]);

  const bolTextFormData = () => {
    dispatch(
      setCustomerFormData({
        paperwork1: paperwork1,
        paperwork2: paperwork2,
        paperwork3: paperwork3,
        paperwork4: paperwork4,
        paperwork5: paperwork5,
        paperwork6: paperwork6,
        paperwork7: paperwork7,
        paperwork8: paperwork8,
        paperwork9: paperwork9,
        paperwork10: paperwork10,
        paperwork11: paperwork11,
        paperwork12: paperwork12,
        paperwork13: paperwork13,
        paperworkArray: bolTextPaperworkInputValues,
        authorizedBy: authorizedBy,

        customerCOD1: customerCOD1,
        customerCOD2: customerCOD2,
        customerCOD3: customerCOD3,
        customerCOD4: customerCOD4,
        customerCOD5: customerCOD5,
        customerCOD6: customerCOD6,
        customerCOD7: customerCOD7,
        customerCODArray: bolTextCustomerCODInputValues,
        miscellaneous1: miscellaneousText1,
        miscellaneous2: miscellaneousText2,
        miscellaneous3: miscellaneousText3,
        miscellaneous4: miscellaneousText4,
        miscellaneous5: miscellaneousText5,
        miscellaneous6: miscellaneousText6,
        miscellaneous7: miscellaneousText7,
        miscellaneousArray: bolTextMiscellaneousTextInputValues,

        overrideDealerWashInstructions: overrideDealerWashInstructions,
        washInstructions1: washInstructions1,
        washInstructions2: washInstructions2,
        washInstructions3: washInstructions3,
        washInstructions4: washInstructions4,
        washInstructions5: washInstructions5,
        washInstructionArray: bolTextWashInstructionsInputValues,
        washInstructions: driverWashInstructions,
      })
    );
  };

  useEffect(() => {
    const backendValues = [
      paperwork1,
      paperwork2,
      paperwork3,
      paperwork4,
      paperwork5,
      paperwork6,
      paperwork7,
      paperwork8,
      paperwork9,
      paperwork10,
      paperwork11,
      paperwork12,
      paperwork13,
    ];
    setBolTextPaperworkInputValues(backendValues);
  }, [
    paperwork1,
    paperwork2,
    paperwork3,
    paperwork4,
    paperwork5,
    paperwork6,
    paperwork7,
    paperwork8,
    paperwork9,
    paperwork10,
    paperwork11,
    paperwork12,
    paperwork13,
    editCustomerData,
  ]);

  useEffect(() => {
    const backendValues = [
      customerCOD1,
      customerCOD2,
      customerCOD3,
      customerCOD4,
      customerCOD5,
      customerCOD6,
      customerCOD7,
    ];
    setBolTextCustomerCODInputValues(backendValues);
  }, [
    customerCOD1,
    customerCOD2,
    customerCOD3,
    customerCOD4,
    customerCOD5,
    customerCOD6,
    customerCOD7,
    editCustomerData,
  ]);

  useEffect(() => {
    const backendValues = [
      miscellaneousText1,
      miscellaneousText2,
      miscellaneousText3,
      miscellaneousText4,
      miscellaneousText5,
      miscellaneousText6,
      miscellaneousText7,
    ];
    setBolTextMiscellaneousTextInputValues(backendValues);
  }, [
    miscellaneousText1,
    miscellaneousText2,
    miscellaneousText3,
    miscellaneousText4,
    miscellaneousText5,
    miscellaneousText6,
    miscellaneousText7,
    editCustomerData,
  ]);

  useEffect(() => {
    const backendValues = [
      washInstructions1?.trim(),
      washInstructions2?.trim(),
      washInstructions3?.trim(),
      washInstructions4?.trim(),
      washInstructions5?.trim(),
    ];
    setBolTextWashInstructionsInputValues(backendValues);
  }, [
    washInstructions1,
    washInstructions2,
    washInstructions3,
    washInstructions4,
    washInstructions5,
    editCustomerData,
  ]);

  return (
    <Form>
      <div className="p-2 w-100">
        <Row className="m-0 p-0">
          <Col xs={4} sm={4} md={4} lg={4} className="p-r-0 p-l-0- p-r-10-">
            <Form.Group className="mt-3 align-items-start row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">
                  {t("customer.maintanance.bol.tab.paperwork.field")}
                </Form.Label>
              </Col>
              <Col xs={7} md={7} sm={7} className="p-0 ">
                <DynamicTextFields
                  numFields={13}
                  maxCharLimit={30}
                  inputValues={bolTextPaperworkInputValues}
                  setInputValues={setBolTextPaperworkInputValues}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">
                  {t("customer.maintanance.bol.tab.authorized.by.field")}
                </Form.Label>
              </Col>
              <Col xs={7} md={7} sm={7} className="p-0">
                <Input
                  className="customFormControl"
                  name="authorizedBy"
                  type="text"
                  maxLength={30}
                  disabled={viewDetail}
                  value={authorizedBy}
                  onChange={(e) => {
                    const cleanedValue = removeLeadingWhitespace(e.target.value);
                    setAuthorizedBy(cleanedValue);
                  }}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4} className="p-r-0 p-r-10-">
            <Form.Group className="mt-3 align-items-start row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={4} className="p-0">
                <Form.Label className="customColFormLabel">
                  {t("customer.maintanance.bol.tab.customer.cod.field")}
                </Form.Label>
              </Col>
              <Col xs={7} md={7} sm={7} className="p-0">
                <DynamicTextFields
                  numFields={7}
                  maxCharLimit={20}
                  inputValues={bolTextCustomerCODInputValues}
                  setInputValues={setBolTextCustomerCODInputValues}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-start row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={4} className="p-0">
                <Form.Label className="customColFormLabel">
                  {t("customer.maintanance.bol.tab.miscellaneous.text.field")}
                </Form.Label>
              </Col>
              <Col md={7} sm={7} xs={7} className="p-0">
                <DynamicTextFields
                  numFields={7}
                  maxCharLimit={30}
                  inputValues={bolTextMiscellaneousTextInputValues}
                  setInputValues={setBolTextMiscellaneousTextInputValues}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={4} sm={4} md={4} lg={4} className="p-r-0 p-r-10-">
            <Form.Group className="margin-box-1 form-group m-t-5 mb-4 m-l-0 m-r-0">
              <div className="d-flex align-items-center">
                <Form.Label className="customColFormLabel no-wrap-label mb-0 me-2">
                  Override Dealer Wash Instructions
                </Form.Label>

                <input
                  type="checkbox"
                  className="form-check-input mt-0"
                  name="overrideDealerWashInstructions"
                  disabled={viewDetail}
                  checked={overrideDealerWashInstructions}
                  onChange={(e) => {
                    setOverrideDealerWashInstructions(e.target.checked);
                  }}
                />
              </div>
            </Form.Group>

            <Form.Group className="mt-3 align-items-start row  m-l-0 m-r-0">
              <Col xs={5} sm={4} md={4} className="p-0">
                <Form.Label className="customColFormLabel">
                  {t("customer.maintanance.bol.tab.wash.instructions.field")}
                </Form.Label>
              </Col>
              <Col xs={7} md={8} sm={8} className="p-0">
                <DynamicTextFields
                  numFields={5}
                  maxCharLimit={42}
                  inputValues={bolTextWashInstructionsInputValues}
                  setInputValues={setBolTextWashInstructionsInputValues}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group m-t-50 m-b-10 align-items-center row  m-l-0 m-r-0">
              <Col sm={12} md={12} xs={12} className="p-0">
                <label className="customColFormLabel p-0 m-b-20">
                  {t("customer.maintanance.bol.tab.driver.wash.instructions.field")}
                </label>
              </Col>

              <Col xs={12} className="p-0">
                <textarea
                  rows={10}
                  cols={20}
                  type="text"
                  className="customFormControl h-100 "
                  name="driverWashInstructions"
                  disabled={viewDetail || overrideDealerWashInstructions}
                  value={
                    overrideDealerWashInstructions === true && bolTextWashInstructionsInputValues?.length > 0
                      ? (concatWashInstrcutions =
                          bolTextWashInstructionsInputValues[0] +
                          " " +
                          bolTextWashInstructionsInputValues[1] +
                          " " +
                          bolTextWashInstructionsInputValues[2] +
                          " " +
                          bolTextWashInstructionsInputValues[3] +
                          " " +
                          bolTextWashInstructionsInputValues[4])
                      : driverWashInstructions
                  }
                  autoComplete="off"

                  onInput={(e) => {
                    const cleanedValue = removeLeadingWhitespace(e.target.value);
                    setDriverWashInstructions(cleanedValue);
                  }}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </Form>
  );
}
export default BOLTextTabs;
