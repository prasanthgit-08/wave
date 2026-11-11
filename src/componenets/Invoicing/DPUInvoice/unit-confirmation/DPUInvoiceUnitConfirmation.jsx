import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DPUInvoiceService from "../../../../services/Invoicing/DPUInvoiceService";
import { useDispatch, useSelector } from "react-redux";
import {
  setDpuInvoiceConfirmationData,
  setInputInvoiceText,
  setIsCreditCardPrepaid,
} from "../../../../redux/Invoicing/DPUInvoiceSlice";
import { customFormatDate } from "../../../../utils/validation/DateFormatUtils";
import { getCurrentCompany } from "../../../../utils/utils";
import MiscInvoiceService from "../../../../services/Invoicing/MiscInvoiceService";

const DPUInvoiceUnitConfirmation = () => {
  const dispatch = useDispatch();
  const [load, setload] = useState(false);
  const unitNumber = useSelector((state) => state.dpuInvoice.unitNumber);
  const model = useSelector((state) => state.dpuInvoice.model);
  const vin = useSelector((state) => state.dpuInvoice.vin);
  const dpuInvoiceConfirmationData = useSelector((state) => state.dpuInvoice.dpuInvoiceConfirmationData);
  const unitPK = useSelector((state) => state.dpuInvoice.unitPK);
  const currentCompany = getCurrentCompany();
  const companyName = currentCompany?.name;
  const dispatchStatus = useSelector((state) => state.dpuInvoice.dispatchStatus);

  const fetchDpuInvoiceUnitConfirmation = (unitNumber) => {
    setload(true);
    DPUInvoiceService.getDpuInvoiceUnitConfirmation(unitNumber)
      .then((response) => {
        setload(false);
        const data = response?.data;
        dispatch(setDpuInvoiceConfirmationData(data));
      })
      .catch((error) => {
        setload(false);
        console.error("Error fetching invoice unit confirmation:", error);
      });
  };

  useEffect(() => {
    fetchDpuInvoiceUnitConfirmation(unitNumber, model);
  }, [unitNumber, model]);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <Row>
          <Col xs={6}>
            <Form.Group className="mt-3 align-items-center row  m-l-10 m-r-0 ms-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="unitnumber">
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
                  disabled
                  value={dpuInvoiceConfirmationData?.[0]?.UnitNumber || " "}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row   m-l-10 m-r-0 ms-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label
                  htmlFor="name"
                  className={`col-form-label  dealer-label`}
                  id="model"
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                >
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
                  value={dpuInvoiceConfirmationData?.[0]?.Model || " "}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row   m-l-10 m-r-0 ms-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="vin">
                  VIN
                </Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  className={`customFormControl`}
                  id="vin"
                  name="last5"
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={dpuInvoiceConfirmationData?.[0]?.VIN || " "}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row   m-l-10 m-r-0 ms-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="unittype">
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
                  value={dpuInvoiceConfirmationData?.[0]?.UnitCode || " "}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row   m-l-10 m-r-0 ms-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="specialcode">
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
                  value={dpuInvoiceConfirmationData?.[0]?.SpecialCode || " "}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row invisible   m-l-10 m-r-0 ms-0">
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
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row    m-l-10 m-r-0 ms-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                  Order Date
                </Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  className={`customFormControl`}
                  id="unitNumber"
                  name="unitNumber"
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={customFormatDate(dpuInvoiceConfirmationData?.[0]?.OrderDate)}
                  disabled
                />
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
                  value={dpuInvoiceConfirmationData?.[0]?.CustomerName || " "}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5"></Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  className={`customFormControl`}
                  id="last5"
                  name="last5"
                  type="text"
                  autoComplete="off"
                  value={dpuInvoiceConfirmationData?.[0]?.CustomerCity || " "}
                  aria-autocomplete="list"
                  disabled
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
                  value={dpuInvoiceConfirmationData?.[0]?.CustomerStateCode || " "}
                  disabled
                />
              </Col>
            </Form.Group>
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
                  disabled
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
                  value={dpuInvoiceConfirmationData?.[0]?.PickUpName || " "}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col sm={3} md={3} xs={3} className="p-0">
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
                  value={dpuInvoiceConfirmationData?.[0]?.PickUpcity || " "}
                  disabled
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
                  value={dpuInvoiceConfirmationData?.[0]?.PickUpState || " "}
                  disabled
                />
              </Col>
            </Form.Group>
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
                  disabled
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
                  value={dpuInvoiceConfirmationData?.[0]?.DeliveryName || " "}
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5"></Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  className={`customFormControl`}
                  id="last5"
                  name="last5"
                  type="text"
                  autoComplete="off"
                  value={dpuInvoiceConfirmationData?.[0]?.Deliverycity || " "}
                  aria-autocomplete="list"
                  disabled
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
                  value={dpuInvoiceConfirmationData?.[0]?.DeliveryState || " "}
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

export default DPUInvoiceUnitConfirmation;
