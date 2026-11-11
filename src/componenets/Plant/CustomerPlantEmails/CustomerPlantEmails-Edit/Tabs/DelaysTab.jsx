import React, { useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import {
  setBreakdowns,
  setDamaged,
  setDispatchDelays,
  setSaveFormData,
  setShuttleDelays,
} from "../../../../../redux/CustomerPlantEmailSlice";

const DelaysTab = () => {
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.customerPlantEmailReducer.viewDetail);
  const editFormData = useSelector((state) => state.customerPlantEmailReducer.editFormData);
  const breakdowns = useSelector((state) => state.customerPlantEmailReducer.breakdowns);
  const damaged = useSelector((state) => state.customerPlantEmailReducer.damaged);
  const dispatchDelays = useSelector((state) => state.customerPlantEmailReducer.dispatchDelays);
  const shuttleDelays = useSelector((state) => state.customerPlantEmailReducer.shuttleDelays);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setBreakdowns(editFormData.breakdowns ? editFormData.breakdowns : ""));
      dispatch(setDamaged(editFormData.damaged ? editFormData.damaged : ""));
      dispatch(setDispatchDelays(editFormData.dispatchDelays ? editFormData.dispatchDelays : ""));
      dispatch(setShuttleDelays(editFormData.shuttleDelays ? editFormData.shuttleDelays : ""));
    }
  }, [editFormData]);
  // to backend
  const DelaysTabData = () => {
    dispatch(
      setSaveFormData({
        breakdowns,
        damaged,
        dispatchDelays,
        shuttleDelays,
      })
    );
  };
  useEffect(() => {
    DelaysTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakdowns, damaged, dispatchDelays, shuttleDelays]);
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
                id="breakdowns"
                name="breakdowns"
                checked={breakdowns}
                disabled={viewDetail}
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
                id="damaged"
                name="damaged"
                checked={damaged}
                disabled={viewDetail}
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
                id="dispatchDelays"
                name="dispatchDelays"
                checked={dispatchDelays}
                disabled={viewDetail}

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
                id="shuttleDelays"
                name="shuttleDelays"
                checked={shuttleDelays}
                disabled={viewDetail}

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
};

export default DelaysTab;
