import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MiscInvoiceService from "../../../../services/Invoicing/MiscInvoiceService";
import {
  setCustomerFK,
  setUnitRecordData,
  setViewDetail,
  setMiscInvoiceFormData,
} from "../../../../redux/Invoicing/MiscInvoiceSlice";
import DateInputField from "../../../common/DateInputField";
import LoadingIcon from "../../../common/LoadingIcon";

const UnitConfNocrossNoalternateContent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = useParams();
  const dispatch = useDispatch();
  const unitRecordData = useSelector((state) => state.miscInvoiceReducer.unitRecordData);
  const companyFK = useSelector((state) => state.miscInvoiceReducer.companyFK);
  /*****Extract the city and state to populate to the relevant fields*****/
  const customerCityState = unitRecordData?.customerCityStateCode; // Example: "Miami,FL"
  const customerCity = customerCityState?.split(",")[0]?.trim();
  const customerState = customerCityState?.split(",")[1]?.trim(); // Extracts "FL" and trims whitespace
  const pickupCityState = unitRecordData?.pickCityState; // Example: "Miami,FL"
  const pickUpCity = pickupCityState?.split(",")[0]?.trim();
  const pickUpState = pickupCityState?.split(",")[1]?.trim(); // E
  const deliveryCityState = unitRecordData?.deliveryCityState; // Example: "Miami,FL"
  const deliveryCity = deliveryCityState?.split(",")[0]?.trim();
  const deliveryState = deliveryCityState?.split(",")[1]?.trim(); // E
  const miscInvoiceFormData = useSelector((state) => state.miscInvoiceReducer.miscInvoiceFormData);
  const [deliveryDate, setDeliveryDate] = useState("");
  const invoiceSisterCustomer = useSelector((state) => state.miscInvoiceReducer.invoiceSisterCustomer);
  const isSisterCompany = useSelector((state) => state.miscInvoiceReducer.isSisterCompany);
  const notCrossCompany = useSelector((state) => state.miscInvoiceReducer.notCrossCompany);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (id && companyFK && notCrossCompany.ScreenId !== 1) {
      const updatedCompanyFK = Number(companyFK) === companyFK ? -1 : Number(companyFK);
      setLoader(true);
      MiscInvoiceService.getTheUnitDetailsById(updatedCompanyFK, id)
        .then((response) => {
          const { data } = response;
          dispatch(setUnitRecordData(data));
          dispatch(setCustomerFK(data?.customerFK));
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
          console.error("Error fetching unit details:", err);
        });
    }
  }, [id, companyFK, dispatch, notCrossCompany]);

  useEffect(() => {
    if (unitRecordData?.deliveryDate !== "null") {
      setDeliveryDate(unitRecordData?.deliveryDate || "");
    } else {
      setDeliveryDate("");
    }
  }, [unitRecordData]);

  /******Set Form data for crossDB****/
  const notCrossCompanyFormData = () => {
    dispatch(
      setMiscInvoiceFormData({
        invoiceSisterCustomer: 0,
        isSisterCompany: 0,
      })
    );
  };

  /***Setting the save Object for the Details Tab***/
  useEffect(() => {
    notCrossCompanyFormData();
  }, [invoiceSisterCustomer, isSisterCompany]);

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
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
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={unitRecordData?.unitNumber}
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
                    name="model"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={unitRecordData?.model}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="vin">
                    VIN
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="vin"
                    name="vin"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={unitRecordData?.vin}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="unitType">
                    Unit Type
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="unitType"
                    name="unitType"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={unitRecordData?.unitType}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="specialCode">
                    Special Code
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="specialCode"
                    name="specialCode"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={unitRecordData?.specialCode}
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

                <Col xs={3} md={3} sm={3} className="p-0">
                  <DateInputField
                    date={unitRecordData?.orderDate || ""}
                    name="orderDate"
                    className="customFormControl"
                    setDate={unitRecordData?.orderDate}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="deliveryDate">
                    Date Delivered
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <DateInputField
                    date={deliveryDate}
                    className="customFormControl"
                    setDate={setDeliveryDate}
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
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={unitRecordData?.customerName}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label
                    htmlFor="name"
                    className={`col-form-label  dealer-label`}
                    id="customerCity"
                  ></Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="customerCity"
                    name="customerCity"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={customerCity}
                    disabled
                  />
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0 ms-2">
                  <input
                    className={`customFormControl`}
                    id="customerState"
                    name="customerState"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={customerState}
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
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="pickUpCity">
                    Pickup
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="pickUpName"
                    name="pickUpName"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={unitRecordData?.pickUpName}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label
                    htmlFor="name"
                    className={`col-form-label  dealer-label`}
                    id="pickUpCity"
                  ></Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="pickUpCity"
                    name="pickUpCity"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={pickUpCity}
                    disabled
                  />
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0 ms-2">
                  <input
                    className={`customFormControl`}
                    id="pickUpState"
                    name="pickUpState"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={pickUpState}
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
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="deliveryName">
                    Delivery
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="deliveryName"
                    name="deliveryName"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={unitRecordData?.deliveryName}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label
                    htmlFor="name"
                    className={`col-form-label  dealer-label`}
                    id="deliveryCity"
                  ></Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="deliveryCity"
                    name="deliveryCity"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={deliveryCity}
                    disabled
                  />
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0 ms-2">
                  <input
                    className={`customFormControl`}
                    id="deliveryState"
                    name="deliveryState"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={deliveryState}
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

export default UnitConfNocrossNoalternateContent;
