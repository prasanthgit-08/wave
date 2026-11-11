import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setInvoiceById, setMiscellaniousFlag } from "../../../../redux/Invoicing/InvoiceInquirySlice";
import formatDatetimeToDate from "../../../../utils/formatDateTimeToDate";
import InvoiceInquiryService from "../../../../services/Invoicing/InvoiceInquiryService";
import DateInputField from "../../../common/DateInputField";
import Loading from "../../../../components/common/loading";

const InvoiceInquiryDriverConfirmationContent = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const invoicePK = useSelector((state) => state.invoiceInquiryReducer.invoicePK);
  const companyFK = useSelector((state) => state.invoiceInquiryReducer.companyFK);
  const companyName = useSelector((state) => state.invoiceInquiryReducer.companyName);
  const invoiceById = useSelector((state) => state.invoiceInquiryReducer.invoiceById);
  const miscellaniousFlag = useSelector((state) => state.invoiceInquiryReducer.miscellaniousFlag);
  const localCompany = useSelector((state) => state.invoiceInquiryReducer.localCompany);
  const fetchRecordById = (invoicePK) => {
    setLoading(true);
    InvoiceInquiryService.getDriverInvoiceById(invoicePK, localCompany === true ? -1 : companyFK, companyName)
      .then((response) => {
        const data = response?.data;
        dispatch(setInvoiceById(data));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    dispatch(setInvoiceById([]));
    if (invoicePK) {
      fetchRecordById(invoicePK);

      dispatch(setMiscellaniousFlag(false));
    }
  }, [invoicePK]);

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border p-1" style={{ height: "432px" }}>
        <div className="ps-3 mb-4 ">
          {loading && <Loading />}
          <Row>
            <Col xs={5}>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceNumber">
                    Unit Number
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="unitNumber"
                    name="unitNumber"
                    value={invoiceById?.[0]?.miscellaneousUnit || invoiceById?.[0]?.unitNumber || ""}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    maxLength={21}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                    PO Number
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="model"
                    value={invoiceById?.[0]?.poNumber || ""}
                    name="model"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    maxLength={21}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceNumber">
                    Invoice Number
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="invoiceNumber"
                    name="invoiceNumber"
                    value={invoiceById?.[0]?.invoiceNumber || ""}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    maxLength={9}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceDate">
                    Invoice Date
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <DateInputField
                    className={`customFormControl`}
                    id="invoiceDate"
                    name="invoiceDate"
                    type="date"
                    date={
                      invoiceById?.[0]?.invoiceDate ? formatDatetimeToDate(invoiceById[0].invoiceDate) : ""
                    }
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceAmount">
                    Invoice Amount
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="invoiceAmount"
                    name="invoiceAmount"
                    value={invoiceById?.[0]?.invoiceAmount || ""}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col xs={5}>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="customerName">
                    Driver
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="customerName"
                    name="customerName"
                    value={invoiceById?.[0]?.driver?.trim() || ""}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label
                    htmlFor="name"
                    className={`col-form-label  dealer-label`}
                    id="last5"
                  ></Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="last5"
                    name="last5"
                    type="text"
                    value={invoiceById?.[0]?.physicalAddress1?.trim() || ""}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label
                    htmlFor="name"
                    className={`col-form-label  dealer-label`}
                    id="last5"
                  ></Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="last5"
                    name="last5"
                    value={invoiceById?.[0]?.physicalAddress2?.trim() || ""}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className="mt-3 align-items-center row  m-l-0  ms-0 "
                style={{ marginRight: "0px" }}
              >
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label
                    htmlFor="name"
                    className={`col-form-label  dealer-label`}
                    id="last5"
                  ></Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0" style={{ width: "217px" }}>
                  <input
                    className={`customFormControl`}
                    id="last5"
                    name="last5"
                    value={invoiceById?.[0]?.physicalCity?.trim() || ""}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0 ms-2" style={{ marginRight: "0px" }}>
                  <input
                    className={`customFormControl`}
                    id="last5"
                    name="last5"
                    value={invoiceById?.[0]?.physicalStateCode?.trim() || ""}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0 ms-2" style={{ marginRight: "-100px" }}>
                  <input
                    className={`customFormControl`}
                    id="last5"
                    name="last5"
                    value={invoiceById?.[0]?.physicalPostalCode?.trim() || ""}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default InvoiceInquiryDriverConfirmationContent;
