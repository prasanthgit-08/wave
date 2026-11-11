import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOutboundMotorized,
  setOutboundTowableMultiUnit,
  setOutboundTowableSingle,
  setReloadMotorized,
  setReloadTowableMultiUnit,
  setReloadTowableSingle,
} from "../../../../redux/InventoryStatusFlashReportSlice";
import { Col, Form } from "react-bootstrap";

const SelectionPageContent = () => {
  const dispatch = useDispatch();

  const {
    outboundTowableSingle,
    outboundTowableMultiUnit,
    outboundMotorized,
    reloadTowableSingle,
    reloadTowableMultiUnit,
    reloadMotorized,
  } = useSelector((state) => state.inventoryStatusFlashReportSlice);

  return (
    <div className="p-2">
      <div className=" shadow-sm rounded border" style={{ height: "430px" }}>
        <div className="form-group">
          <div className="d-flex gap-2 ps-2 mt-5 p-l-30 m-l-30">
            <Col xs={12} sm={12} md={12} lg={12} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Outbound Towable Single</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    id="masterDealer"
                    name="masterDealer"
                    value={outboundTowableSingle}
                    onChange={(e) => {
                      dispatch(setOutboundTowableSingle(e.target.checked));
                    }}
                    checked={outboundTowableSingle}
                    className={`${
                      reloadMotorized ||
                      reloadTowableMultiUnit ||
                      reloadTowableSingle ||
                      outboundMotorized ||
                      outboundTowableMultiUnit ||
                      outboundTowableSingle
                        ? ""
                        : "borderRed "
                    } form-check-input p-0`}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Outbound Towable MultiUnit</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    id="masterDealer"
                    name="masterDealer"
                    value={outboundTowableMultiUnit}
                    onChange={(e) => {
                      dispatch(setOutboundTowableMultiUnit(e.target.checked));
                    }}
                    checked={outboundTowableMultiUnit}
                    className={`${
                      reloadMotorized ||
                      reloadTowableMultiUnit ||
                      reloadTowableSingle ||
                      outboundMotorized ||
                      outboundTowableMultiUnit ||
                      outboundTowableSingle
                        ? ""
                        : "borderRed "
                    } form-check-input p-0`}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Outbound Motorized</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    id="masterDealer"
                    name="masterDealer"
                    value={outboundMotorized}
                    onChange={(e) => {
                      dispatch(setOutboundMotorized(e.target.checked));
                    }}
                    checked={outboundMotorized}
                    className={`${
                      reloadMotorized ||
                      reloadTowableMultiUnit ||
                      reloadTowableSingle ||
                      outboundMotorized ||
                      outboundTowableMultiUnit ||
                      outboundTowableSingle
                        ? ""
                        : "borderRed "
                    } form-check-input p-0`}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Reload Towable Single</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    id="masterDealer"
                    name="masterDealer"
                    value={reloadTowableSingle}
                    onChange={(e) => {
                      dispatch(setReloadTowableSingle(e.target.checked));
                    }}
                    checked={reloadTowableSingle}
                    className={`${
                      reloadMotorized ||
                      reloadTowableMultiUnit ||
                      reloadTowableSingle ||
                      outboundMotorized ||
                      outboundTowableMultiUnit ||
                      outboundTowableSingle
                        ? ""
                        : "borderRed "
                    } form-check-input p-0`}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Reload Towable MultiUnit</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    id="masterDealer"
                    name="masterDealer"
                    value={reloadTowableMultiUnit}
                    onChange={(e) => {
                      dispatch(setReloadTowableMultiUnit(e.target.checked));
                    }}
                    checked={reloadTowableMultiUnit}
                    className={`${
                      reloadMotorized ||
                      reloadTowableMultiUnit ||
                      reloadTowableSingle ||
                      outboundMotorized ||
                      outboundTowableMultiUnit ||
                      outboundTowableSingle
                        ? ""
                        : "borderRed "
                    } form-check-input p-0`}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Reload Motorized</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    id="masterDealer"
                    name="masterDealer"
                    value={reloadMotorized}
                    onChange={(e) => {
                      dispatch(setReloadMotorized(e.target.checked));
                    }}
                    checked={reloadMotorized}
                    className={`${
                      reloadMotorized ||
                      reloadTowableMultiUnit ||
                      reloadTowableSingle ||
                      outboundMotorized ||
                      outboundTowableMultiUnit ||
                      outboundTowableSingle
                        ? ""
                        : "borderRed "
                    } form-check-input p-0`}
                  />
                </Col>
              </Form.Group>
            </Col>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionPageContent;
