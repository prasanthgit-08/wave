import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DynamicTextFields from "../../../common/AutoWrapTextFields/DynamicTextFields";
import DPUInvoiceService from "../../../../services/Invoicing/DPUInvoiceService";
import { useDispatch, useSelector } from "react-redux";
import {
  setDpuInvoicePayload,
  setInputInvoiceText,
  setInvoiceTextData,
  setInvoiceTextInputValues,
} from "../../../../redux/Invoicing/DPUInvoiceSlice";

export const DPUInvoiceText = () => {
  const [invoiceTextInputValues, setInvoiceTextInputValues] = useState(Array(4).fill(""));
  const unitNumber = useSelector((state) => state.dpuInvoice.unitNumber);
  const inputInvoiceText = useSelector((state) => state.dpuInvoice.inputInvoiceText);
  const unitPK = useSelector((state) => state.dpuInvoice.unitPK);
  const creditCardClicked = useSelector((state) => state.dpuInvoice.creditCardClicked);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const invoiceTextData = useSelector((state) => state.dpuInvoice.invoiceTextData);

  const fetchInvoiceData = (unitNumber) => {
    setLoad(true);
    DPUInvoiceService.getDpuInvoiceTextScreen(unitNumber)
      .then((response) => {
        setLoad(false);
        const data = response?.data;
        dispatch(setInvoiceTextData(data));
      })
      .catch((error) => {
        setLoad(false);
        console.error("Failed to fetch invoice data.", error);
      });
  };

  useEffect(() => {
    invoiceTextFormData();
  }, [invoiceTextInputValues]);

  useEffect(() => {
    setInvoiceTextInputValues(inputInvoiceText);
  }, []);

  useEffect(() => {
    dispatch(
      setDpuInvoicePayload({
        invoiceText1: invoiceTextInputValues[0],
        invoiceText2: invoiceTextInputValues[1],
        invoiceText3: invoiceTextInputValues[2],
        invoiceText4: invoiceTextInputValues[3],
        invoiceAmount: invoiceTextData[0]?.InvoiceAmount || 0,
        storageFee: invoiceTextData[0]?.StorageFee,
        startAndrunFee: invoiceTextData[0]?.StartAndrunFee,
      })
    );
  }, [invoiceTextInputValues, invoiceTextData]);

  const invoiceTextFormData = () => {
    dispatch(setInputInvoiceText(invoiceTextInputValues));
  };

  useEffect(() => {
    fetchInvoiceData(unitNumber);
  }, [unitNumber]);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <Row>
          {/* Invoice Text */}

          <Form.Group
            className={`form-group align-items-start row m-l-0 m-r-0 mb-3`}
            style={{ marginTop: "10px" }}
          >
            <Col xs={1} className="p-0 mx-4 w-110px text-end">
              <Form.Label className="customColFormLabel">Invoice Text</Form.Label>
            </Col>
            <Col xs={6} className="">
              <DynamicTextFields
                numFields={4}
                maxCharLimit={58}
                maxLimit={58}
                inputValues={invoiceTextInputValues}
                setInputValues={setInvoiceTextInputValues}
              />
            </Col>
          </Form.Group>
          <Col xs={7}>
            <Form.Group className="mt-3 align-items-center row invisible  m-l-0 m-r-0 ms-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5"></Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  className={`customFormControl`}
                  id="last5"
                  name="last5"
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
              <Col sm={2} md={2} xs={2} style={{ width: "55px" }}></Col>
              <Col sm={2} md={2} xs={2} style={{ width: "115px" }} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                  Invoice Amount
                </Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  className={`customFormControl`}
                  id="invoiceAmount"
                  name="invoiceAmount"
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={invoiceTextData[0]?.InvoiceAmount || 0}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
              <Col sm={2} md={2} xs={2} style={{ width: "70px" }}></Col>
              <Col sm={4} md={4} xs={4} style={{ width: "100px" }} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                  Storage Fee
                </Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  className={`customFormControl`}
                  id="storageFee"
                  name="storageFee"
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={invoiceTextData[0]?.StorageFee}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
              <Col sm={2} md={2} xs={2} style={{ width: "55px" }}></Col>
              <Col sm={4} md={4} xs={4} style={{ width: "115px" }} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                  Start & Run Fee
                </Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  className={`customFormControl`}
                  id="startAndRun"
                  name="unitNumber"
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={invoiceTextData[0]?.StartAndrunFee}
                  disabled
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        {load && (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
