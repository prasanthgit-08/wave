import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DynamicTextFields from "../../../../common/AutoWrapTextFields/DynamicTextFields";
import {
  resetFields,
  setCustomerEmail,
  setDriverInvoiceTextData,
  setEmailFormat,
  setEmailToDriver,
  setEmaiToUser,
  setPrint,
  setTextTabDescription,
} from "../../../../../redux/DriverInvoiceSlice";

function Text({ isNonUnit }) {
  window.addEventListener("popstate", () => {
    dispatch(resetFields());
    navigate(`/driver-invoice-browse`);
  });

  const [invoiceTextValues, setInvoiceTextValues] = useState(Array(isNonUnit ? 14 : 13).fill(""));
  const driverInvoiceTextData = useSelector((state) => state.driverInvoiceReducer.driverInvoiceTextData);
  const changesCancelled = useSelector((state) => state.driverInvoiceReducer.changesCancelled);

  const params = useParams();
  const unitId = params.unitId;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let temp = isNonUnit
      ? [driverInvoiceTextData?.miscellaneousText1 || "", driverInvoiceTextData?.miscellaneousText2 || ""]
      : [driverInvoiceTextData?.miscellaneousText2 || ""];

    const value = [
      ...temp,
      driverInvoiceTextData?.miscellaneousText3 || "",
      driverInvoiceTextData?.miscellaneousText4 || "",
      driverInvoiceTextData?.miscellaneousText5 || "",
      driverInvoiceTextData?.miscellaneousText6 || "",
      driverInvoiceTextData?.miscellaneousText7 || "",
      driverInvoiceTextData?.miscellaneousText8 || "",
      driverInvoiceTextData?.miscellaneousText9 || "",
      driverInvoiceTextData?.miscellaneousText10 || "",
      driverInvoiceTextData?.invoiceText1 || "",
      driverInvoiceTextData?.invoiceText2 || "",
      driverInvoiceTextData?.invoiceText3 || "",
      driverInvoiceTextData?.invoiceText4 || "",
    ];

    setInvoiceTextValues(value);
  }, []);

  useEffect(() => {
    let invoiceValue = [];
    if (isNonUnit) {
      invoiceValue = [...invoiceTextValues];
    } else {
      invoiceValue = [null, ...invoiceTextValues];
    }

    let obj = {
      ...driverInvoiceTextData,
      miscellaneousText1: invoiceValue[0],
      miscellaneousText2: invoiceValue[1],
      miscellaneousText3: invoiceValue[2],
      miscellaneousText4: invoiceValue[3],
      miscellaneousText5: invoiceValue[4],
      miscellaneousText6: invoiceValue[5],
      miscellaneousText7: invoiceValue[6],
      miscellaneousText8: invoiceValue[7],
      miscellaneousText9: invoiceValue[8],
      miscellaneousText10: invoiceValue[9],
      invoiceText1: invoiceValue[10],
      invoiceText2: invoiceValue[11],
      invoiceText3: invoiceValue[12],
      invoiceText4: invoiceValue[13],
    };
    dispatch(setDriverInvoiceTextData(obj));
  }, [invoiceTextValues]);

  useEffect(() => {
    if (changesCancelled) {
      setInvoiceTextValues(Array(isNonUnit ? 14 : 13).fill(""));
    }
  }, [changesCancelled]);
  return (
    <Formik initialValues={{}} validateOnMount enableReinitialize={true}>
      {(formik) => (
        <Form on={formik.handle}>
          <div className="w-100 mt-2 ps-3" style={{ height: "390px" }}>
            <Row className="ps-1 pe-1 mb-4 mt-2">
              <Col sm={10} md={10} lg={10} xl={10} xs={10} className="mt-2" style={{ height: "390px" }}>
                <Form.Group className={`form-group align-items-start row m-l-0 m-r-0 m-t-12`}>
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Invoice Text</Form.Label>
                  </Col>
                  <Col xs={8} className="p-0">
                    <DynamicTextFields
                      numFields={isNonUnit ? 14 : 13}
                      maxCharLimit={80}
                      maxLimit={80}
                      inputValues={invoiceTextValues}
                      invoice={true}
                      setInputValues={setInvoiceTextValues}
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
}
export default Text;
