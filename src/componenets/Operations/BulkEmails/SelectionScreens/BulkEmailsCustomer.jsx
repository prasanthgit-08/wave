import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import DateInputField from "../../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../../redux/Operations/BulkEmailSlice";

const BulkEmailsCustomer = () => {
  const dispatch = useDispatch();

  const which = useSelector((state) => state.bulkEmails.which);
  const lastOrderDate = useSelector((state) => state.bulkEmails.lastOrderDate);
  const lastOrderDateValid = useSelector((state) => state.bulkEmails.lastOrderDateValid);
  const orderContact = useSelector((state) => state.bulkEmails.orderContact);
  const dispatchContact = useSelector((state) => state.bulkEmails.dispatchContact);
  const dispatcher = useSelector((state) => state.bulkEmails.dispatcher);
  const dispatchDelayContacts = useSelector((state) => state.bulkEmails.dispatchDelayContacts);
  const breakdownContacts = useSelector((state) => state.bulkEmails.breakdownContacts);
  const damageContacts = useSelector((state) => state.bulkEmails.damageContacts);
  const shuttleDelayContacts = useSelector((state) => state.bulkEmails.shuttleDelayContacts);
  const lotPointContacts = useSelector((state) => state.bulkEmails.lotPointContacts);
  const lotSupervisor = useSelector((state) => state.bulkEmails.lotSupervisor);
  const process = useSelector((state) => state.bulkEmails.process);

  const [validation, setValidation] = useState(false);

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };
  useEffect(() => {
    if (
      orderContact ||
      dispatchContact ||
      dispatcher ||
      dispatchDelayContacts ||
      breakdownContacts ||
      damageContacts ||
      shuttleDelayContacts ||
      lotPointContacts ||
      lotSupervisor
    ) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [
    orderContact,
    dispatchContact,
    dispatcher,
    dispatchDelayContacts,
    breakdownContacts,
    damageContacts,
    shuttleDelayContacts,
    lotPointContacts,
    lotSupervisor,
  ]);

  return (
    <div>
      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label p-l-15">Which</Form.Label>
        </Col>
        <Col xs={1} md={1} sm={1} className="p-0">
          <CustomRadioGroup
            name="Which"
            horizontal
            options={["Customer", "Plant"]}
            selectedOption={which}
            onChange={(value) => {
              updateData("which", value);
            }}
            disabled={process !== "New"}
          />
        </Col>
      </Form.Group>
      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-5  align-items-center row m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label p-l-15">Last Order Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "100px" }}>
          <DateInputField
            date={lastOrderDate}
            setDate={(val) => {
              updateData("lastOrderDate", val);
            }}
            setIsDateValid={(val) => {
              updateData("lastOrderDateValid", val);
            }}
            className={`customFormControl ${process !== "New" ? "" : !lastOrderDateValid || !lastOrderDate ? "borderRed" : "borderGreen"}`}
            disabled={process !== "New"}
          />
        </Col>
      </Form.Group>
      <div className="d-flex">
        <Col sm={6} md={6} lg={6} xl={6} xs={6}>
          <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label p-l-15">Dispatcher</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                className={` form-check-input  p-0  ${process !== "New" ? "" : validation ? "" : "borderRed"}`}
                type="checkbox"
                name="dispatcher"
                checked={dispatcher}
                onChange={(e) => {
                  updateData("dispatcher", e.target.checked);
                }}
                disabled={process !== "New"}
              />
            </Col>
          </Form.Group>
          <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label p-l-15">Order Contacts</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                className={` form-check-input  p-0  ${process !== "New" ? "" : validation ? "" : "borderRed"}`}
                type="checkbox"
                name="orderContact"
                checked={orderContact}
                onChange={(e) => {
                  updateData("orderContact", e.target.checked);
                }}
                disabled={process !== "New"}
              />
            </Col>
          </Form.Group>
          <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label p-l-15">Dispatch Contacts</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                className={` form-check-input  p-0  ${process !== "New" ? "" : validation ? "" : "borderRed"}`}
                type="checkbox"
                name="dispatchContact"
                checked={dispatchContact}
                onChange={(e) => {
                  updateData("dispatchContact", e.target.checked);
                }}
                disabled={process !== "New"}
              />
            </Col>
          </Form.Group>
          <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label p-l-15">Dispatch Delay Contacts</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                type="checkbox"
                className={` form-check-input  p-0  ${process !== "New" ? "" : validation ? "" : "borderRed"}`}
                name="dispatchDelayContacts"
                checked={dispatchDelayContacts}
                onChange={(e) => {
                  updateData("dispatchDelayContacts", e.target.checked);
                }}
                disabled={process !== "New"}
              />
            </Col>
          </Form.Group>
          <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label p-l-15">Breakdown Contacts</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                type="checkbox"
                className={` form-check-input  p-0  ${process !== "New" ? "" : validation ? "" : "borderRed"}`}
                name="breakdownContacts"
                checked={breakdownContacts}
                onChange={(e) => {
                  updateData("breakdownContacts", e.target.checked);
                }}
                disabled={process !== "New"}
              />
            </Col>
          </Form.Group>
          <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label p-l-15">Damage Contacts</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                type="checkbox"
                className={` form-check-input  p-0  ${process !== "New" ? "" : validation ? "" : "borderRed"}`}
                name="damageContacts"
                checked={damageContacts}
                onChange={(e) => {
                  updateData("damageContacts", e.target.checked);
                }}
                disabled={process !== "New"}
              />
            </Col>
          </Form.Group>
          <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label p-l-15">Shuttle Delay Contacts</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                type="checkbox"
                className={` form-check-input  p-0  ${process !== "New" ? "" : validation ? "" : "borderRed"}`}
                name="shuttleDelayContacts"
                checked={shuttleDelayContacts}
                onChange={(e) => {
                  updateData("shuttleDelayContacts", e.target.checked);
                }}
                disabled={process !== "New"}
              />
            </Col>
          </Form.Group>
        </Col>
        {which === "Plant" && (
          <Col sm={6} md={6} lg={6} xl={6} xs={6}>
            <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label p-l-15">Lot Point Contact</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0">
                <input
                  className={` form-check-input  p-0  ${process !== "New" ? "" : validation ? "" : "borderRed"}`}
                  type="checkbox"
                  name="lotPointContacts"
                  checked={lotPointContacts}
                  onChange={(e) => {
                    updateData("lotPointContacts", e.target.checked);
                  }}
                  disabled={process !== "New"}
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className="col-form-label dealer-label p-l-15">Lot Supervisor</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0">
                <input
                  className={` form-check-input  p-0  ${process !== "New" ? "" : validation ? "" : "borderRed"}`}
                  type="checkbox"
                  name="lotSupervisor"
                  checked={lotSupervisor}
                  onChange={(e) => {
                    updateData("lotSupervisor", e.target.checked);
                  }}
                  disabled={process !== "New"}
                />
              </Col>
            </Form.Group>
          </Col>
        )}
      </div>
    </div>
  );
};

export default BulkEmailsCustomer;
