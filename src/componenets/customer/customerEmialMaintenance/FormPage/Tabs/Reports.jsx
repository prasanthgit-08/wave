import React, { useState } from "react";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import { t } from "i18next";
import {
  setUnassignedUnitsReport,
  setUnassignedUnitsOutbound,
  setUnassignedUnitsReload,
  setUnassignedUnitsShippersOnly,
  setUnassignedUnitsStorageOnly,
  setYardExitReport,
  setDeliveredUnitsReport,
  setinvoiceDays,
  setunitInventoryMaster,
  setOnRoadReport,
} from "../../../../../redux/CustomerEmailMaintenanceSlice";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import Input from "../../../../../components/common/input";

function Reports() {
  const dispatch = useDispatch();

  const [invoice, setInvoice] = useState("");

  const unassignedUnits = useSelector((state) => state.customerEmailMaintenance.unassignedUnitsReport);
  const unassignedUnitsOutbound = useSelector(
    (state) => state.customerEmailMaintenance.unassignedUnitsOutbound
  );
  const unassignedUnitsReloads = useSelector((state) => state.customerEmailMaintenance.unassignedUnitsReload);
  const unassignedUnitsShippersOnly = useSelector(
    (state) => state.customerEmailMaintenance.unassignedUnitsShippersOnly
  );
  const unassignedUnitsStorageOnly = useSelector(
    (state) => state.customerEmailMaintenance.unassignedUnitsStorageOnly
  );
  const yardExit = useSelector((state) => state.customerEmailMaintenance.yardExitReport);
  const onRoadReport = useSelector((state) => state.customerEmailMaintenance.onRoadReport);
  const deliveredUnits = useSelector((state) => state.customerEmailMaintenance.deliveredUnitsReport);
  const unitInventoryMaster = useSelector((state) => state.customerEmailMaintenance.unitInventoryMaster);
  const invoiceDays = useSelector((state) => state.customerEmailMaintenance.invoiceDays);

  const EditMode = useSelector((state) => state.customerEmailMaintenance.editMode);

  // only number function

  const invoiceDaysNumber = (value) => {
    if (!value) return value;

    const phoneNumber = value.replace(/[^\d]/g, "");

    if (value) return phoneNumber;
  };

  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0 ">
        <Col sm={6} md={6} lg={6} xl={6} xs={6}>
          <Form.Group className="margin-box-1 form-group m-t-20 m-b-20 align-items-center justify-content-start row m-l-0 m-r-0">
            <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.reports.tab.unassigned.units")}
              </Form.Label>
            </Col>

            <Col md={2} sm={2} xs={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="unassignedUnits"
                name="unassignedUnits"
                checked={unassignedUnits}
                disabled={EditMode}
                onChange={(e) => {
                  dispatch(setUnassignedUnitsReport(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 justify-content-start form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.reports.tab.unassigned.units.outbounds")}
              </Form.Label>
            </Col>

            <Col md={2} sm={2} xs={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="unassignedUnitsOutbound"
                name="unassignedUnitsOutbound"
                disabled={EditMode}
                checked={unassignedUnitsOutbound}
                onChange={(e) => {
                  dispatch(setUnassignedUnitsOutbound(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 justify-content-start form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.reports.tab.unassigned.units.reloads")}
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="unassignedUnitsReloads"
                name="unassignedUnitsReloads"
                disabled={EditMode}
                checked={unassignedUnitsReloads}
                onChange={(e) => {
                  dispatch(setUnassignedUnitsReload(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 justify-content-start form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.reports.tab.unassigned.units.shippers.only")}
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="unassignedUnitsShippersOnly"
                name="unassignedUnitsShippersOnly"
                disabled={EditMode}
                checked={unassignedUnitsShippersOnly}
                onChange={(e) => {
                  dispatch(setUnassignedUnitsShippersOnly(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.reports.tab.unassigned.units.storage.only")}
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="unassignedUnitsStorageOnly"
                name="unassignedUnitsStorageOnly"
                disabled={EditMode}
                checked={unassignedUnitsStorageOnly}
                onChange={(e) => {
                  dispatch(setUnassignedUnitsStorageOnly(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.reports.tab.yard.exit")}
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="yardExit"
                name="yardExit"
                disabled={EditMode}
                checked={yardExit}
                onChange={(e) => {
                  dispatch(setYardExitReport(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                On Road
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="onRoad"
                name="onRoad"
                disabled={EditMode}
                checked={onRoadReport}
                onChange={(e) => {
                  dispatch(setOnRoadReport(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.reports.tab.delivered.units")}
              </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="deliveredUnits"
                name="deliveredUnits"
                disabled={EditMode}
                checked={deliveredUnits}
                onChange={(e) => {
                  dispatch(setDeliveredUnitsReport(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
        </Col>

        <Col
          sm={5}
          md={5}

          xs={5}
        >
          <Form.Group className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.reports.tab.unit.inventory.master")}
              </Form.Label>
            </Col>

            <Col xs={1} md={1} sm={2} className="p-0">
              <input
                type="checkbox"
                disabled={EditMode}
                checked={unitInventoryMaster}
                onChange={(e) => {
                  dispatch(setunitInventoryMaster(e.target.checked));
                }}
                className="form-check-input p-0 "
                id="unitInventoryMaster"
                name="unitInventoryMaster"
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.reports.tab.invoice.days")}
              </Form.Label>
            </Col>

            <Col xs={2} sm={2} md={2} className="p-0">
              <Input
                className={`${QuarterScreen.formControl} ${
                  EditMode
                    ? ""
                    : invoiceDays || invoice.length >= 1 || invoiceDays === 0
                      ? "borderGreen"
                      : "borderRed"
                }`}
                value={invoiceDays}
                onChange={(e) => {
                  let settingvalue = invoiceDaysNumber(e.target.value);
                  dispatch(setinvoiceDays(settingvalue));
                  setInvoice(settingvalue);
                }}
                maxLength={4}
                disabled={EditMode}
                name="invoiceDays"
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default Reports;
