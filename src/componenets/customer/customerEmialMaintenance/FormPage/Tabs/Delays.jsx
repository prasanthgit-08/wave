import React from "react";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import { t } from "i18next";
import {
  setBreakdowns,
  setDamaged,
  setDispatchDelays,
  setShuttleDelays,
} from "../../../../../redux/CustomerEmailMaintenanceSlice";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";

function Delays() {
  const Breakdown = useSelector((state) => state.customerEmailMaintenance.breakdowns);
  const damage = useSelector((state) => state.customerEmailMaintenance.damaged);
  const dispatchDealy = useSelector((state) => state.customerEmailMaintenance.dispatchDelays);
  const shuttleDelay = useSelector((state) => state.customerEmailMaintenance.shuttleDelays);

  const EditMode = useSelector((state) => state.customerEmailMaintenance.editMode);

  const dispatch = useDispatch();

  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0 justify-content-start">
        <Col sm={6} md={6} lg={6} xl={6} xs={6}>
          <Form.Group className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.delays.tab.breakdown")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="Breakdown"
                name="Breakdown"
                checked={Breakdown}
                disabled={EditMode}

                onChange={(e) => {
                  dispatch(setBreakdowns(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.delays.tab.damage")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="damage"
                name="damage"
                checked={damage}
                disabled={EditMode}

                onChange={(e) => {
                  dispatch(setDamaged(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.delays.tab.dispatch.delay")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="dispatchDealy"
                name="dispatchDealy"
                checked={dispatchDealy}
                disabled={EditMode}

                onChange={(e) => {
                  dispatch(setDispatchDelays(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.delays.tab.shuttle.delay")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="shuttleDelay"
                name="shuttleDelay"
                checked={shuttleDelay}
                disabled={EditMode}

                onChange={(e) => {
                  dispatch(setShuttleDelays(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default Delays;
