import React, { useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import {
  setbolAtDispatch,
  setBolAtOrderEntry,
  setBolAtOrderEntryForDPUCustomers,
  setBolBatchAtExitOrderEntry,
  setbolBatchDaily,
  setSaveFormData,
} from "../../../../../redux/CustomerPlantEmailSlice";
const BolTab = () => {
  const dispatch = useDispatch();
  const bolAtOrderEntry = useSelector((state) => state.customerPlantEmailReducer.bolAtOrderEntry);
  const bolBatchAtExitOrderEntry = useSelector(
    (state) => state.customerPlantEmailReducer.bolBatchAtExitOrderEntry
  );
  const bolBatchDaily = useSelector((state) => state.customerPlantEmailReducer.bolBatchDaily);
  const bolAtDispatch = useSelector((state) => state.customerPlantEmailReducer.bolAtDispatch);

  const viewDetail = useSelector((state) => state.customerPlantEmailReducer.viewDetail);
  const editFormData = useSelector((state) => state.customerPlantEmailReducer.editFormData);
  const bolAtOrderEntryForDPUCustomers = useSelector(
    (state) => state.customerPlantEmailReducer.bolAtOrderEntryForDPUCustomers
  );
  useEffect(() => {
    if (editFormData != null) {
      dispatch(setBolAtOrderEntry(editFormData.bolAtOrderEntry ? editFormData.bolAtOrderEntry : ""));
      dispatch(
        setBolAtOrderEntryForDPUCustomers(
          editFormData.bolAtOrderEntryDPU ? editFormData.bolAtOrderEntryDPU : ""
        )
      );
      dispatch(
        setBolBatchAtExitOrderEntry(
          editFormData.bolBatchAtExitOrderEntry ? editFormData.bolBatchAtExitOrderEntry : ""
        )
      );

      dispatch(setbolBatchDaily(editFormData.bolBatchDaily ? editFormData.bolBatchDaily : ""));
      dispatch(setbolAtDispatch(editFormData.bolAtDispatch ? editFormData.bolAtDispatch : ""));
    }
  }, [editFormData]);
  // to backend
  const bolTabData = () => {
    dispatch(
      setSaveFormData({
        bolAtOrderEntry,
        bolBatchAtExitOrderEntry,
        bolBatchDaily,
        bolAtDispatch,
        bolAtOrderEntryDPU: bolAtOrderEntryForDPUCustomers,
      })
    );
  };
  useEffect(() => {
    bolTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    bolAtOrderEntry,
    bolBatchAtExitOrderEntry,
    bolBatchDaily,
    bolAtDispatch,
    bolAtOrderEntryForDPUCustomers,
  ]);
  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0 justify-content-start">
        <Col sm={12} md={12} lg={12} xl={12} xs={12}>
          <Form.Group className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.bol.tab.at.order.entry")}
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 d-flex ">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="bolAtOrderEntry"
                name="bolAtOrderEntry"
                checked={bolAtOrderEntry}
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setBolAtOrderEntry(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                At Order Entry for DPU Customers
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 d-flex ">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id=" bolAtOrderEntryForDPUCustomers"
                name=" bolAtOrderEntryForDPUCustomers"
                checked={bolAtOrderEntryForDPUCustomers}
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setBolAtOrderEntryForDPUCustomers(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.bol.tab.batch.at.exit.order.entry")}
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="bolBatchAtExitOrderEntry"
                name="bolBatchAtExitOrderEntry"
                checked={bolBatchAtExitOrderEntry}
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setBolBatchAtExitOrderEntry(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.bol.tab.batch.daily")}
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="bolBatchDaily"
                name="bolBatchDaily"
                checked={bolBatchDaily}
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setbolBatchDaily(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center  row  m-l-0 m-r-0">
            <Col xs={3} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.bol.tab.at.dispatch")}
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="bolAtDispatch"
                name="bolAtDispatch"
                checked={bolAtDispatch}
                disabled={viewDetail}
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
};

export default BolTab;
