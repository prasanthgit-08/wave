import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import EditInvoiceService from "../../../../services/Invoicing/EditInvoiceService";
import { setInvoiceById, setMiscellaniousFlag } from "../../../../redux/Invoicing/EditInvoiceSlice";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../utils/dateUtils";
import LoadingIcon from "../../../common/LoadingIcon";

const InvoiceUnitConfirmationContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const invoicePK = useSelector((state) => state.editInvoiceReducer.invoicePK);
  const companyFK = useSelector((state) => state.editInvoiceReducer.companyFK);
  const companyName = useSelector((state) => state.editInvoiceReducer.companyName);
  const invoiceById = useSelector((state) => state.editInvoiceReducer.invoiceById);
  const miscellaniousFlag = useSelector((state) => state.editInvoiceReducer.miscellaniousFlag);
  const nonUnitData = useSelector((state) => state.editInvoiceReducer.nonUnitData);

  const [loader, setLoader] = useState(false);
  const fetchRecordById = (invoicePK) => {
    if (invoiceById?.length === 0) {
      setLoader(true);
      EditInvoiceService.getInvoiceById(invoicePK, companyFK, companyName)
        .then((response) => {
          const data = response?.data;
          dispatch(setInvoiceById(data));
          setLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    }
  };

  const fetchNonUnitById = (invoicePK) => {
    if (nonUnitData?.length > 0) {
      setLoader(true);
      EditInvoiceService.getNonUnitById(invoicePK, companyFK, companyName)
        .then((response) => {
          const data = response?.data;
          dispatch(setInvoiceById(data));
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          console.error("Error fetching non-unit data:", error);
        });
    } else {
      console.log("nonUnitData already exists, skipping API call.");
    }
  };

  useEffect(() => {
    if (invoicePK) {
      if (miscellaniousFlag) {
        fetchNonUnitById(invoicePK);
      } else {
        fetchRecordById(invoicePK);
      }
      dispatch(setMiscellaniousFlag(false));
    }
  }, [invoicePK]);

  useEffect(() => {
    if (!invoicePK) {
      navigate(`/edit-invoice/invoice-unit-selection`);
    }
  }, []);

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border p-1" style={{ height: "432px" }}>
        <div className="ps-3 mb-4 ">
          {loader && <LoadingIcon />}
          <Row>
            <Col xs={6}>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceNumber">
                    Unit Number
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="unitNumber"
                    name="unitNumber"
                    value={
                      invoiceById?.[0]?.miscellaneousUnit
                        ? invoiceById?.[0]?.miscellaneousUnit
                        : invoiceById?.[0]?.unitNumber || ""
                    }
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                    Model
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="model"
                    value={invoiceById?.[0]?.model || ""}
                    name="model"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                    VIN
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="vin"
                    value={invoiceById?.[0]?.vin || ""}
                    name="vin"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                    Unit Type
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="unitType"
                    name="unitType"
                    value={invoiceById?.[0]?.descriptionLong || ""}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                    Special Code
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="specialCode"
                    name="specialCode"
                    value={invoiceById?.[0]?.specialCodeDescription || ""}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row invisible  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
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
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceNumber">
                    Invoice Number
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="invoiceNumber"
                    name="invoiceNumber"
                    value={invoiceById?.[0]?.invoiceNumber || ""}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceDate">
                    Invoice Date
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="invoiceDate"
                    name="invoiceDate"
                    type="text"
                    value={invoiceById?.[0]?.invoiceDate ? formatDate(invoiceById[0].invoiceDate) : ""}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceAmount">
                    Invoice Amount
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="invoiceAmount"
                    name="invoiceAmount"
                    value={invoiceById?.[0]?.invoiceAmount || 0}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="customerName">
                    Customer
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="customerName"
                    name="customerName"
                    value={invoiceById?.[0]?.customerName?.trim() || ""}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
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
                    value={invoiceById?.[0]?.customerCity?.trim() || ""}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0 ms-2">
                  <input
                    className={`customFormControl`}
                    id="last5"
                    name="last5"
                    value={invoiceById?.[0]?.customerState?.trim() || ""}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row invisible  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
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
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                    Pickup
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="last5"
                    name="last5"
                    value={invoiceById?.[0]?.pickupName?.trim() || ""}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
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
                    value={invoiceById?.[0]?.pickupCity?.trim() || ""}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0 ms-2">
                  <input
                    className={`customFormControl`}
                    id="last5"
                    name="last5"
                    value={invoiceById?.[0]?.pickupState?.trim() || ""}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row invisible  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
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
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                    Delivery
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="last5"
                    name="last5"
                    value={
                      nonUnitData?.length > 0
                        ? invoiceById?.[0]?.dealerName
                        : invoiceById?.[0]?.deliveryName?.trim() || ""
                    }
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
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
                    value={
                      nonUnitData?.length > 0
                        ? invoiceById?.[0]?.dealerCity
                        : invoiceById?.[0]?.deliveryCity?.trim() || ""
                    }
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0 ms-2">
                  <input
                    className={`customFormControl`}
                    id="last5"
                    name="last5"
                    value={
                      nonUnitData?.length > 0
                        ? invoiceById?.[0]?.dealerState
                        : invoiceById?.[0]?.deliveryState?.trim() || ""
                    }
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

export default InvoiceUnitConfirmationContent;
