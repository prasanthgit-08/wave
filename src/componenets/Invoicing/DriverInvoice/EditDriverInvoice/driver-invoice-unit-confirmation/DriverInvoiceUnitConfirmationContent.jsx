import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetFields, setInvoiceById } from "../../../../../redux/DriverInvoiceSlice";
import DateInputField from "../../../../common/DateInputField";
import { useNavigate, useParams } from "react-router-dom";
import DriverInvoiceService from "../../../../../services/DriverInvoiceService";
import { useState } from "react";

const DriverInvoiceUnitConfirmationContent = () => {
  const { unitId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  window.addEventListener("popstate", () => {
    dispatch(resetFields());
    navigate(`/driver-invoice-browse`);
  });

  const companyFK = useSelector((state) => state.driverInvoiceReducer.companyFK);
  const invoiceById = useSelector((state) => state.driverInvoiceReducer.invoiceById);
  const [loading, setLoading] = useState(false);

  const fetchRecordById = () => {
    setLoading(true);
    DriverInvoiceService.getById(unitId, companyFK)
      .then((response) => {
        const data = response?.data[0];
        dispatch(setInvoiceById(data));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (unitId && companyFK) {
      fetchRecordById(unitId);
    } else {
      navigate(`/driver-invoice-browse`);
    }
  }, [unitId]);

  useEffect(() => {
    if (companyFK === null) {
      navigate(`/driver-invoice-browse`);
    }
  }, []);

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border p-1" style={{ height: "432px" }}>
        {loading && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
        <div className="ps-3 mb-4 ">
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
                    value={invoiceById?.UnitNumber || ""}
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
                    value={invoiceById?.Model || ""}
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
                    value={invoiceById?.VIN || ""}

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
                    value={invoiceById?.UnitType || ""}
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
                    value={invoiceById?.SpecialCode || ""}
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
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="orderDate">
                    Order Date
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0" style={{ maxWidth: "85px" }}>
                  <DateInputField
                    className={`customFormControl`}
                    id="invoiceDate"
                    name="OrderDate"
                    type="date"
                    date={loading ? "" : invoiceById?.OrderDate || ""}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="orderDate">
                    Date Delivered
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0" style={{ maxWidth: "85px" }}>
                  <DateInputField
                    id="invoiceDate"
                    name="DeliveredDate"
                    type="date"
                    date={loading ? "" : invoiceById?.DeliveredDate || ""}
                    autoComplete="off"
                    aria-autocomplete="list"
                    format="MM/DD/YY"
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
                    value={invoiceById?.CustomerName?.trim() || ""}
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
                    value={invoiceById?.CustomerCity?.trim() || ""}
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
                    value={invoiceById?.CustomerState?.trim() || ""}
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
                    value={invoiceById?.PickupName?.trim() || ""}
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
                    value={invoiceById?.PickupCity?.trim() || ""}
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
                    value={invoiceById?.PickupState?.trim() || ""}
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
                    value={invoiceById?.DeliveryName?.trim() || invoiceById?.[0]?.dealerName?.trim() || ""}
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
                    value={invoiceById?.DeliveryCity?.trim() || ""}
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
                    value={invoiceById?.DeliveryState?.trim() || ""}
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

export default DriverInvoiceUnitConfirmationContent;
