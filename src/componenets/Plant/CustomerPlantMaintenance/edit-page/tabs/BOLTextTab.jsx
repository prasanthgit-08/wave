import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setPlantFormData } from "../../../../../redux/CustomerPlantMaintenanceSlice";
import DynamicTextFields from "../../../../common/AutoWrapTextFields/DynamicTextFields";

const BOLTextTab = () => {
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);
  const editPlantData = useSelector((state) => state.customerPlantmaintanceReducer.editPlantData);
  var concatWashInstrcutions = null;

  const [bolTextPaperworkInputValues, setBolTextPaperworkInputValues] = useState(Array(13).fill(""));
  const [bolTextCustomerCODInputValues, setBolTextCustomerCODInputValues] = useState(Array(7).fill(""));
  const [bolTextMiscellaneousTextInputValues, setBolTextMiscellaneousTextInputValues] = useState(
    Array(7).fill("")
  );
  const [bolTextWashInstructionsInputValues, setBolTextWashInstructionsInputValues] = useState(
    Array(5).fill("")
  );
  //1 st Column
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
  //2nd Column
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
  //3rd Column
  const [overrideDealerWashInstructions, setOverrideDealerWashInstructions] = useState("");
  const [washInstructions1, setWashInstructions1] = useState("");
  const [washInstructions2, setWashInstructions2] = useState("");
  const [washInstructions3, setWashInstructions3] = useState("");
  const [washInstructions4, setWashInstructions4] = useState("");
  const [washInstructions5, setWashInstructions5] = useState("");
  const [driverWashInstructions, setDriverWashInstructions] = useState("");
  useEffect(() => {
    if (editPlantData != null) {
      //1st Column
      setPaperwork1(editPlantData.paperwork1 != null ? editPlantData.paperwork1 : "");
      setPaperwork2(editPlantData.paperwork2 != null ? editPlantData.paperwork2 : "");
      setPaperwork3(editPlantData.paperwork3 != null ? editPlantData.paperwork3 : "");
      setPaperwork4(editPlantData.paperwork4 != null ? editPlantData.paperwork4 : "");
      setPaperwork5(editPlantData.paperwork5 != null ? editPlantData.paperwork5 : "");
      setPaperwork6(editPlantData.paperwork6 != null ? editPlantData.paperwork6 : "");
      setPaperwork7(editPlantData.paperwork7 != null ? editPlantData.paperwork7 : "");
      setPaperwork8(editPlantData.paperwork8 != null ? editPlantData.paperwork8 : "");
      setPaperwork9(editPlantData.paperwork9 != null ? editPlantData.paperwork9 : "");
      setPaperwork10(editPlantData.paperwork10 != null ? editPlantData.paperwork10 : "");
      setPaperwork11(editPlantData.paperwork11 != null ? editPlantData.paperwork11 : "");
      setPaperwork12(editPlantData.paperwork12 != null ? editPlantData.paperwork12 : "");
      setPaperwork13(editPlantData.paperwork13 != null ? editPlantData.paperwork13 : "");
      setAuthorizedBy(editPlantData.authorizedBy != null ? editPlantData.authorizedBy : "");
      //2nd Column
      setCustomerCOD1(editPlantData.customerCOD1 != null ? editPlantData.customerCOD1 : "");
      setCustomerCOD2(editPlantData.customerCOD2 != null ? editPlantData.customerCOD2 : "");
      setCustomerCOD3(editPlantData.customerCOD3 != null ? editPlantData.customerCOD3 : "");
      setCustomerCOD4(editPlantData.customerCOD4 != null ? editPlantData.customerCOD4 : "");
      setCustomerCOD5(editPlantData.customerCOD5 != null ? editPlantData.customerCOD5 : "");
      setCustomerCOD6(editPlantData.customerCOD6 != null ? editPlantData.customerCOD6 : "");
      setCustomerCOD7(editPlantData.customerCOD7 != null ? editPlantData.customerCOD7 : "");
      setMiscellaneousText1(editPlantData.miscellaneous1 != null ? editPlantData.miscellaneous1 : "");
      setMiscellaneousText2(editPlantData.miscellaneous2 != null ? editPlantData.miscellaneous2 : "");
      setMiscellaneousText3(editPlantData.miscellaneous3 != null ? editPlantData.miscellaneous3 : "");
      setMiscellaneousText4(editPlantData.miscellaneous4 != null ? editPlantData.miscellaneous4 : "");
      setMiscellaneousText5(editPlantData.miscellaneous5 != null ? editPlantData.miscellaneous5 : "");
      setMiscellaneousText6(editPlantData.miscellaneous6 != null ? editPlantData.miscellaneous6 : "");
      setMiscellaneousText7(editPlantData.miscellaneous7 != null ? editPlantData.miscellaneous7 : "");
      //3rd Column
      setOverrideDealerWashInstructions(
        editPlantData.overrideDealerWashInstructions != null
          ? editPlantData.overrideDealerWashInstructions
          : ""
      );
      setWashInstructions1(
        editPlantData.washInstructions1 != null ? editPlantData.washInstructions1?.trim() : ""
      );
      setWashInstructions2(
        editPlantData.washInstructions2 != null ? editPlantData.washInstructions2?.trim() : ""
      );
      setWashInstructions3(
        editPlantData.washInstructions != null ? editPlantData.washInstructions3?.trim() : ""
      );
      setWashInstructions4(
        editPlantData.washInstructions4 != null ? editPlantData.washInstructions4?.trim() : ""
      );
      setWashInstructions5(
        editPlantData.washInstructions5 != null ? editPlantData.washInstructions5?.trim() : ""
      );
      setDriverWashInstructions(
        editPlantData.washInstructions != null ? editPlantData.washInstructions?.trim() : ""
      );
    }
  }, [editPlantData, viewDetail]);
  useEffect(() => {
    bolTextFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setPlantFormData({
        //1st Column
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
        //2nd Column
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
        //3rd Column
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
  /***  edit/paste data passes to back end as array - BOL Text Paperwork ***/
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
    editPlantData,
  ]);

  /***  edit/paste data passes to back end as array - BOL Text CustomerCOD ***/
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
    editPlantData,
  ]);

  /***  edit/paste data passes to back end as array - BOL Text MiscellaneousText ***/
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
    editPlantData,
  ]);

  /***  edit/paste data passes to back end as array - BOL Text WashInstructions ***/
  useEffect(() => {
    const backendValues = [
      washInstructions1,
      washInstructions2,
      washInstructions3,
      washInstructions4,
      washInstructions5,
    ];
    setBolTextWashInstructionsInputValues(backendValues);
  }, [
    washInstructions1,
    washInstructions2,
    washInstructions3,
    washInstructions4,
    washInstructions5,
    editPlantData,
  ]);
  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0">
        <Col xs={4} sm={4} md={4} lg={4} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          {/*Paperwork Field-1*/}

          <Form.Group className="margin-box-5 m-t-5 m-b-10 align-items-start row tabs-row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("edit.customer.plant.page.settings.tab.paperwork")}
              </Form.Label>
            </Col>
            <Col xs={8} md={8} lg={8} className="p-0">
              <DynamicTextFields
                numFields={13}
                maxCharLimit={30}
                inputValues={bolTextPaperworkInputValues}
                setInputValues={setBolTextPaperworkInputValues}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          {/*Authorized By Field*/}

          <Form.Group className="margin-box-5 m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("edit.customer.plant.page.settings.tab.authorizedBy")}
              </Form.Label>
            </Col>
            <Col xs={8} md={8} sm={8} className="p-0">
              <input
                className="customFormControl"
                name="authorizedBy"
                type="text"
                maxLength={30}
                disabled={viewDetail}
                value={authorizedBy}
                autoComplete="newpassword"
                aria-autocomplete="none"
                onInput={(e) => {
                  setAuthorizedBy(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                }}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} className="p-r-0 p-r-10-medium-width">
          {/*Customer COD Field -1 */}
          <Form.Group className="margin-box-5 m-t-5 m-b-10 align-items- row tabs-row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("edit.customer.plant.page.settings.tab.customerCOD")}
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

          {/*Miscellaneous Text BOL Text */}
          <Form.Group className="margin-box-5 m-t-5 m-b-10 align-items row tabs-row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("edit.customer.plant.page.settings.tab.miscellaneousText")}
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

        <Col xs={4} sm={4} md={4} lg={4} className="p-r-0 p-r-10-medium-width">
          {/*Override Dealer Wash Instructions*/}
          <Form.Group className="margin-box-1 form-group m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
            <Col xs={5} sm={5} md={5} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("edit.customer.plant.page.settings.tab.overriDelaerWashInstructions")}
              </Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} lg={5} xl={5} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                name="overrideDealerWashInstructions"
                disabled={viewDetail}
                value={overrideDealerWashInstructions}
                checked={overrideDealerWashInstructions}
                onChange={(e) => {
                  setOverrideDealerWashInstructions(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          {/*Wash Instructions-1 */}
          <Form.Group className="margin-box-5 m-t-5 m-b-10 align-items row tabs-row m-l-0 m-r-0">
            <Col xs={3} sm={3} md={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">
                {t("edit.customer.plant.page.settings.tab.washInstructions")}
              </Form.Label>
            </Col>
            <Col xs={8} md={8} sm={8} className="p-0">
              <DynamicTextFields
                numFields={5}
                maxCharLimit={42}
                inputValues={bolTextWashInstructionsInputValues}
                setInputValues={setBolTextWashInstructionsInputValues}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>

          <Form.Group className="form-group m-t-50 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
            <Col sm={12} md={12} xs={12} className="p-0">
              <label className="col-form-label dealer-label p-0 m-b-20">
                {t("edit.customer.plant.page.settings.tab.driverWashInstructions")}
              </label>
            </Col>

            <Col sm={12} md={12} lg={12} xl={11} className="p-0">
              <textarea
                rows={10}
                cols={20}
                type="text"
                className="form-control h-100 "
                name="driverWashInstructions"
                disabled={viewDetail}
                value={
                  overrideDealerWashInstructions === true && bolTextWashInstructionsInputValues.length > 1
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
                  overrideDealerWashInstructions === true && concatWashInstrcutions.length > 1
                    ? setDriverWashInstructions(concatWashInstrcutions)
                    : setDriverWashInstructions(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};
export default BOLTextTab;
