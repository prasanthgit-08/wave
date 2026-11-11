import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setCustomerFK,
  setMiscInvoiceFormData,
  setNotCrossCompany,
  setNotCrossCompanydata2,
  setSelectedOption,
} from "../../../../redux/Invoicing/MiscInvoiceSlice";
import MiscInvoiceService from "../../../../services/Invoicing/MiscInvoiceService";
import DateInputField from "../../../common/DateInputField";
import LoadingIcon from "../../../common/LoadingIcon";

const UnitConfNocrossAlternate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [unitNumber, setUnitNumber] = useState("");
  const [model, setModel] = useState("");
  const [vin, setVin] = useState("");
  const [descriptionShort, setDescriptionShort] = useState("");
  const [specialCode, setSpecialCode] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerState, setCustomerState] = useState("");
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [pickUpCity, setPickUpCity] = useState("");
  const [pickUpState, setPickUpState] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryState, setDeliveryState] = useState("");
  const notCrossCompany = useSelector((state) => state.miscInvoiceReducer.notCrossCompany);
  const notCrossCompanydata2 = useSelector((state) => state.miscInvoiceReducer.notCrossCompanydata2);
  const [loader, setLoader] = useState(false);
  const [button, setButton] = useState("Customer");
  const [selectedButton, setSelectedButton] = useState("Customer"); // Default to pickup
  const [selectedButton2, setSelectedButton2] = useState("Customer"); // Default to pickup

  const customerFK = useSelector((state) => state.miscInvoiceReducer.customerFK);
  const invoiceSisterCustomer = useSelector((state) => state.miscInvoiceReducer.invoiceSisterCustomer);

  const isSisterCompany = useSelector((state) => state.miscInvoiceReducer.isSisterCompany);
  const selectedOption = useSelector((state) => state.miscInvoiceReducer.selectedOption);
  const handleOptionChange = (event) => {
    dispatch(setSelectedOption(event.target.value));
  };
  /*******Get the record For Alternate Customer*****/
  const fetchRecord = (id) => {
    setLoader(true);
    MiscInvoiceService.getNotCrossCompanyAlternateCustomer(id)
      .then((res) => {
        const data = res?.data?.invoice;

        // Filter based on Button
        const pickupRecord = data?.find((item) => item.Button === "Pickup");
        const deliveryRecord = data?.find((item) => item.Button === "Delivery");

        dispatch(setNotCrossCompany(pickupRecord || {}));
        dispatch(setNotCrossCompanydata2(deliveryRecord || {}));
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (id) fetchRecord(id);
  }, [id]);

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

  /******Setting the different fields*****/
  useEffect(() => {
    if (selectedOption === "Pickup") {
      if (notCrossCompany?.CustomerName) {
        setCustomerName(notCrossCompany.CustomerName?.trim() || "");
        setCustomerCity(notCrossCompany.CustomerCity?.trim() || "");
        setCustomerState(notCrossCompany?.CustomerState || "");
        dispatch(setCustomerFK(notCrossCompany?.CustomerPK));
      }
    } else if (selectedOption === "Delivery") {
      if (notCrossCompanydata2?.CustomerName) {
        setCustomerName(notCrossCompanydata2.CustomerName?.trim() || "");
        setCustomerCity(notCrossCompanydata2.CustomerCity?.trim() || "");
        setCustomerState(notCrossCompanydata2?.CustomerState || "");
        dispatch(setCustomerFK(notCrossCompanydata2?.CustomerPK));
      }
    } else if (selectedOption === "Customer") {
      const customerData = notCrossCompany?.UnitCustomerName ? notCrossCompany : notCrossCompanydata2 || {};

      if (customerData.UnitCustomerName) {
        setCustomerName(customerData.UnitCustomerName?.trim() || "");
        setCustomerCity(customerData.UnitCustomerCity?.trim() || "");
        setCustomerState(customerData.UnitCustomerState || "");
        dispatch(setCustomerFK(customerData.UnitCustomerPK));
      }
    }

    const base =
      notCrossCompany && Object.keys(notCrossCompany).length > 0
        ? notCrossCompany
        : notCrossCompanydata2 || {};
    setUnitNumber(base.UnitNumber || "");
    setModel(base.Model?.trim() || "");
    setVin(base.VIN || "");
    setDescriptionShort(base.DescriptionShort?.trim() || "");
    setSpecialCode(base.SpecialCode || "");
    setOrderDate(base.OrderDate || "");
    setDeliveryDate(base.DeliveryDate || "");
    setPickUpLocation(base.PickUpLocation?.trim() || "");
    setPickUpCity(base.PickUpCity?.trim() || "");
    setPickUpState(base.PickUpState || "");
    setDeliveryLocation(base.DeliveryLocation?.trim() || "");
    setDeliveryCity(base.DeliveryCity?.trim() || "");
    setDeliveryState(base.DeliveryState || "");
    console.log("Base ", base);
  }, [notCrossCompany, notCrossCompanydata2, selectedOption]);

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
                    value={unitNumber}
                    onChange={(e) => setUnitNumber(e.target.value)}
                    disabled={true}
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
                    id="last5"
                    name="last5"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    disabled={true}
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
                    id="last5"
                    name="last5"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    disabled={true}
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
                    id="last5"
                    name="last5"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={descriptionShort}
                    onChange={(e) => setDescriptionShort(e.target.value)}
                    disabled={true}
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
                    id="last5"
                    name="last5"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={specialCode}
                    onChange={(e) => setSpecialCode(e.target.value)}
                    disabled={true}
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
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                    Order Date
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <DateInputField
                    date={orderDate}
                    name="orderDate"
                    className="customFormControl"
                    setDate={orderDate}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row   m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
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
              <Form.Group className="mt-3 align-items-center row invisible  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label
                    htmlFor="name"
                    className={`col-form-label  dealer-label`}
                    id="last5"
                  ></Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input className={`customFormControl`} autoComplete="off" aria-autocomplete="list" />
                </Col>
              </Form.Group>

              <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className={` col-form-label  dealer-label`} id="engineType">
                    Invoice To
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
                  <Col className="d-flex align-items-center">
                    <input
                      type="radio"
                      name="invoice"
                      id="Customer"
                      value="Customer"
                      checked={selectedOption === "Customer"}
                      onChange={handleOptionChange}
                    />{" "}
                    <label className="ms-2" htmlFor="">
                      Customer
                    </label>{" "}
                  </Col>
                  <Col className="d-flex align-items-center" style={{ maxWidth: "80px" }}>
                    <input
                      type="radio"
                      name="invoice"
                      id="Pickup"
                      value="Pickup"
                      checked={selectedOption === "Pickup"}
                      onChange={handleOptionChange}
                      disabled={!notCrossCompany || notCrossCompany?.Button !== "Pickup"}
                    />{" "}
                    <label className="ms-2" htmlFor="">
                      Pickup
                    </label>{" "}
                  </Col>
                  <Col className="d-flex align-items-center">
                    <input
                      type="radio"
                      name="invoice"
                      id="Delivery"
                      value="Delivery"
                      checked={selectedOption === "Delivery"}
                      onChange={handleOptionChange}
                      disabled={!notCrossCompanydata2 || notCrossCompanydata2?.Button !== "Delivery"}
                    />{" "}
                    <label className="ms-1" htmlFor="">
                      Delivery
                    </label>{" "}
                  </Col>
                </Col>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                    Customer
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="last5"
                    name="last5"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    disabled={true}
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
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    disabled={true}
                  />
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0 ms-2">
                  <input
                    className={`customFormControl`}
                    id="last5"
                    name="last5"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={customerState}
                    onChange={(e) => setCustomerState(e.target.value)}
                    disabled={true}
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
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={pickUpLocation}
                    onChange={(e) => setPickUpLocation(e.target.value)}
                    disabled={true}
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
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={pickUpCity}
                    onChange={(e) => setPickUpCity(e.target.value)}
                    disabled={true}
                  />
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0 ms-2">
                  <input
                    className={`customFormControl`}
                    id="last5"
                    name="last5"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={pickUpState}
                    onChange={(e) => setPickUpState(e.target.value)}
                    disabled={true}
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
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    disabled={true}
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
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    disabled={true}
                  />
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0 ms-2">
                  <input
                    className={`customFormControl`}
                    id="last5"
                    name="last5"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={deliveryState}
                    onChange={(e) => setDeliveryState(e.target.value)}
                    disabled={true}
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

export default UnitConfNocrossAlternate;
