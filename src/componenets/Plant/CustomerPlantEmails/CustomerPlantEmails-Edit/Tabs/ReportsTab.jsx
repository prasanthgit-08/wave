import React, { useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import {
  setDeliveredUnitsReport,
  setinvoiceDays,
  setIsReportsTabValid,
  setOnRoadReport,
  setSaveFormData,
  setUnassignedUnitsOutbound,
  setUnassignedUnitsReload,
  setUnassignedUnitsReport,
  setUnassignedUnitsShippersOnly,
  setUnassignedUnitsStorageOnly,
  setunitInventoryMaster,
  setUnreleasedUnits,
  setYardExitReport,
} from "../../../../../redux/CustomerPlantEmailSlice";

const ReportsTab = () => {
  const dispatch = useDispatch();
  const unassignedUnitsReport = useSelector((state) => state.customerPlantEmailReducer.unassignedUnitsReport);
  const unassignedUnitsOutbound = useSelector(
    (state) => state.customerPlantEmailReducer.unassignedUnitsOutbound
  );
  const unassignedUnitsReload = useSelector((state) => state.customerPlantEmailReducer.unassignedUnitsReload);
  const unassignedUnitsShippersOnly = useSelector(
    (state) => state.customerPlantEmailReducer.unassignedUnitsShippersOnly
  );
  const unassignedUnitsStorageOnly = useSelector(
    (state) => state.customerPlantEmailReducer.unassignedUnitsStorageOnly
  );
  const yardExitReport = useSelector((state) => state.customerPlantEmailReducer.yardExitReport);
  const deliveredUnitsReport = useSelector((state) => state.customerPlantEmailReducer.deliveredUnitsReport);
  const unitInventoryMaster = useSelector((state) => state.customerPlantEmailReducer.unitInventoryMaster);
  const invoiceDays = useSelector((state) => state.customerPlantEmailReducer.invoiceDays);
  const viewDetail = useSelector((state) => state.customerPlantEmailReducer.viewDetail);
  const editFormData = useSelector((state) => state.customerPlantEmailReducer.editFormData);
  const onRoadReport = useSelector((state) => state.customerPlantEmailReducer.onRoadReport);
  const unreleasedUnits = useSelector((state) => state.customerPlantEmailReducer.unreleasedUnits);
  const requirePlantRelease = useSelector((state) => state.customerPlantEmailReducer.requirePlantRelease);
  // only number function

  const isNumber = (value) => {
    if (!value) return value;

    const phoneNumber = value.replace(/[^\d]/g, "");

    if (value) return phoneNumber;
  };
  useEffect(() => {
    if (editFormData != null) {
      dispatch(
        setUnassignedUnitsReport(editFormData.unassignedUnitsReport ? editFormData.unassignedUnitsReport : "")
      );
      dispatch(
        setUnassignedUnitsOutbound(
          editFormData.unassignedUnitsOutbound ? editFormData.unassignedUnitsOutbound : ""
        )
      );
      dispatch(
        setUnassignedUnitsReload(editFormData.unassignedUnitsReload ? editFormData.unassignedUnitsReload : "")
      );
      dispatch(
        setUnassignedUnitsShippersOnly(
          editFormData.unassignedUnitsShippersOnly ? editFormData.unassignedUnitsShippersOnly : ""
        )
      );
      dispatch(
        setUnassignedUnitsStorageOnly(
          editFormData.unassignedUnitsStorageOnly ? editFormData.unassignedUnitsStorageOnly : ""
        )
      );
      dispatch(setYardExitReport(editFormData.yardExitReport ? editFormData.yardExitReport : ""));
      dispatch(
        setDeliveredUnitsReport(editFormData.deliveredUnitsReport ? editFormData.deliveredUnitsReport : "")
      );
      dispatch(setunitInventoryMaster(editFormData.allUnits ? editFormData.allUnits : ""));
      dispatch(setOnRoadReport(editFormData.onRoadReport ? editFormData.onRoadReport : false));
      dispatch(setUnreleasedUnits(editFormData.unreleasedUnits ? editFormData.unreleasedUnits : false));
      if (editFormData.allUnits === false && editFormData.deliveredUnitsReport === false) {
        dispatch(setinvoiceDays(""));
      } else {
        dispatch(setinvoiceDays(editFormData.allUnitsInvoiceDays));
      }
    }
  }, [editFormData]);
  // to backend
  const reportsTabData = () => {
    dispatch(
      setSaveFormData({
        unassignedUnitsReport,
        unassignedUnitsOutbound,
        unassignedUnitsReload,
        unassignedUnitsShippersOnly,
        unassignedUnitsStorageOnly,
        yardExitReport,
        deliveredUnitsReport,
        allUnits: unitInventoryMaster,
        allUnitsInvoiceDays: invoiceDays,
        onRoadReport,
        unreleasedUnits,
      })
    );
  };
  useEffect(() => {
    reportsTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    unassignedUnitsReport,
    unassignedUnitsOutbound,
    unassignedUnitsReload,
    unassignedUnitsShippersOnly,
    unassignedUnitsStorageOnly,
    yardExitReport,
    deliveredUnitsReport,
    unitInventoryMaster,
    invoiceDays,
    onRoadReport,
    unreleasedUnits,
  ]);
  const validationSchema = yup.object({});
  //tab validation
  useEffect(() => {
    if (
      !unassignedUnitsReport ||
      (unassignedUnitsReport && (unassignedUnitsReload || unassignedUnitsOutbound))
    ) {
      dispatch(setIsReportsTabValid(true));
    } else {
      dispatch(setIsReportsTabValid(false));
    }
  }, [unassignedUnitsReload, unassignedUnitsOutbound, unassignedUnitsReport]);

  useEffect(() => {
    if (unassignedUnitsReport === false) {
      dispatch(setUnassignedUnitsOutbound(false));
      dispatch(setUnassignedUnitsReload(false));
      dispatch(setUnassignedUnitsShippersOnly(false));
      dispatch(setUnassignedUnitsStorageOnly(false));
    }
  }, [unassignedUnitsReport]);

  useEffect(() => {
    if (unitInventoryMaster === false || deliveredUnitsReport === false) {
      dispatch(setinvoiceDays(""));
    }
  }, [unitInventoryMaster, deliveredUnitsReport]);

  return (
    <Formik
      initialValues={{}}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{}}
    >
      {(formik) => (
        <Form on={formik.handle}>
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
                      id="unassignedUnitsReport"
                      name="unassignedUnitsReport"
                      checked={unassignedUnitsReport}
                      disabled={viewDetail}
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
                      id="unassignedUnitsOutbound"
                      name="unassignedUnitsOutbound"
                      disabled={viewDetail || !unassignedUnitsReport}
                      checked={unassignedUnitsOutbound}
                      onChange={(e) => {
                        dispatch(setUnassignedUnitsOutbound(e.target.checked));
                      }}
                      className={`form-check-input p-0 ${
                        !viewDetail
                          ? unassignedUnitsOutbound
                            ? ""
                            : unassignedUnitsReport && !unassignedUnitsOutbound && !unassignedUnitsReload
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
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
                      id="unassignedUnitsReload"
                      name="unassignedUnitsReload"
                      disabled={viewDetail || !unassignedUnitsReport}
                      checked={unassignedUnitsReload}
                      onChange={(e) => {
                        dispatch(setUnassignedUnitsReload(e.target.checked));
                      }}
                      className={`form-check-input p-0 ${
                        !viewDetail
                          ? unassignedUnitsReload
                            ? ""
                            : unassignedUnitsReport && !unassignedUnitsOutbound && !unassignedUnitsReload
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
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
                      disabled={viewDetail || !unassignedUnitsReport || unassignedUnitsStorageOnly}
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
                      disabled={viewDetail || !unassignedUnitsReport || unassignedUnitsShippersOnly}
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
                      id="yardExitReport"
                      name="yardExitReport"
                      disabled={viewDetail}
                      checked={yardExitReport}
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
                      id="onRoadReport"
                      name="onRoadReport"
                      disabled={viewDetail}
                      checked={onRoadReport}
                      value={onRoadReport}
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
                      id="deliveredUnitsReport"
                      name="deliveredUnitsReport"
                      disabled={viewDetail || unitInventoryMaster}
                      checked={deliveredUnitsReport}
                      onChange={(e) => {
                        dispatch(setDeliveredUnitsReport(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={5} md={5} xs={5}>
                <Form.Group className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row  m-l-0 m-r-0">
                  <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0  me-4">
                    <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                      {t("permission.form.page.reports.tab.unit.inventory.master")}
                    </Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      disabled={viewDetail || deliveredUnitsReport}
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
                    <input
                      value={invoiceDays}
                      onChange={(e) => {
                        dispatch(setinvoiceDays(isNumber(e.target.value)));
                      }}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={viewDetail || (!unitInventoryMaster && !deliveredUnitsReport)}
                      name="invoiceDays"
                      maxLength={4}
                      className={`${QuarterScreen.formControl} `}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
                  <Col xl={6} lg={6} md={6} sm={6} xs={6} className="p-0  me-4">
                    <Form.Label
                      className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}
                      hidden={!requirePlantRelease}
                    >
                      Unreleased Units
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 d-flex">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="unreleasedUnits"
                      name="unreleasedUnits"
                      disabled={viewDetail || !requirePlantRelease}
                      hidden={!requirePlantRelease}
                      value={unreleasedUnits}
                      checked={unreleasedUnits}
                      onChange={(e) => {
                        dispatch(setUnreleasedUnits(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ReportsTab;
