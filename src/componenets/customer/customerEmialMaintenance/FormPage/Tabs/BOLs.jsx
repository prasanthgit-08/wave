import React from "react";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import { t } from "i18next";
import {
  setBolAtOrderEntry,
  setBolAtOrderEntryDPU,
  setBolBatchAtExitOrderEntry,
  setbolBatchDaily,
  setbolAtDispatch,
} from "../../../../../redux/CustomerEmailMaintenanceSlice";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";

function BOLs() {
  const atOrderEntry = useSelector((state) => state.customerEmailMaintenance.bolAtOrderEntry);
  const bolAtOrderEntryDPU = useSelector((state) => state.customerEmailMaintenance.bolAtOrderEntryDPU);
  const batchAtExitOrderEntry = useSelector(
    (state) => state.customerEmailMaintenance.bolBatchAtExitOrderEntry
  );
  const batchDaily = useSelector((state) => state.customerEmailMaintenance.bolBatchDaily);
  const atDispatch = useSelector((state) => state.customerEmailMaintenance.bolAtDispatch);

  const EditMode = useSelector((state) => state.customerEmailMaintenance.editMode);

  const dispatch = useDispatch();
  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0 justify-content-start">
        <Col sm={7} md={6} lg={12} xl={12} xs={6}>
          <Form.Group className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={6} sm={5} md={5} lg={4} xl={3} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.bol.tab.at.order.entry")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={2} className="p-0 d-flex ">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="atOrderEntry"
                name="atOrderEntry"
                checked={atOrderEntry}
                disabled={EditMode}

                onChange={(e) => {
                  dispatch(setBolAtOrderEntry(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={6} sm={5} md={5} lg={4} xl={3} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                At Order Entry for DPU Customers
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={1} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="AtOrderEntryDPU"
                name="AtOrderEntryDPU"
                checked={bolAtOrderEntryDPU}
                disabled={EditMode}

                onChange={(e) => {
                  dispatch(setBolAtOrderEntryDPU(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={6} sm={5} md={5} lg={4} xl={3} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.bol.tab.batch.at.exit.order.entry")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={1} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="batchAtExitOrderEntry"
                name="batchAtExitOrderEntry"
                checked={batchAtExitOrderEntry}
                disabled={EditMode}

                onChange={(e) => {
                  dispatch(setBolBatchAtExitOrderEntry(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={6} sm={5} md={5} lg={4} xl={3} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.bol.tab.batch.daily")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="batchDaily"
                name="batchDaily"
                checked={batchDaily}
                disabled={EditMode}

                onChange={(e) => {
                  dispatch(setbolBatchDaily(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center  row  m-l-0 m-r-0">
            <Col xs={6} sm={5} md={5} lg={4} xl={3} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.bol.tab.at.dispatch")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="atDispatch"
                name="atDispatch"
                checked={atDispatch}
                disabled={EditMode}

                onChange={(e) => {
                  dispatch(setbolAtDispatch(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default BOLs;
