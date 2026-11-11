import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import { useDispatch, useSelector } from "react-redux";
import {
  setAmount,
  setApproveData,
  setDeignedReason,
  setDelivery,
  setDriverName,
  setEditFormData,
  setPickUp,
  setReason,
  setRunType,
  setShuttleDate,
  setUnitNum,
  setWhatDelivery,
  setWhatPickUp,
} from "../../../../../redux/ApproveHeldSlice";
import { useParams } from "react-router-dom";
import ApproveHeldService from "../../../../../services/ApproveHeldService";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import DateInputField from "../../../../common/DateInputField";
import LoadingIcon from "../../../../common/LoadingIcon";

const ApproveHeldFormContent = () => {
  const { id } = useParams();
  const driverName = useSelector((state) => state.approveHeldShuttleReducer.driverName);
  const pickUp = useSelector((state) => state.approveHeldShuttleReducer.pickUp);
  const whatPickUp = useSelector((state) => state.approveHeldShuttleReducer.whatPickUp);
  const whatDelivery = useSelector((state) => state.approveHeldShuttleReducer.whatDelivery);
  const delivery = useSelector((state) => state.approveHeldShuttleReducer.delivery);
  const editFormData = useSelector((state) => state.approveHeldShuttleReducer.editFormData);
  const unitNum = useSelector((state) => state.approveHeldShuttleReducer.unitNum);
  const runType = useSelector((state) => state.approveHeldShuttleReducer.runType);
  const amount = useSelector((state) => state.approveHeldShuttleReducer.amount);
  const reason = useSelector((state) => state.approveHeldShuttleReducer.reason);
  const shuttleDate = useSelector((state) => state.approveHeldShuttleReducer.shuttleDate);
  const deignedReason = useSelector((state) => state.approveHeldShuttleReducer.deignedReason);
  const params = useParams();
  const dispatch = useDispatch();
  const unitShuttlePK = params.id;
  const [loading, setLoading] = useState(false);

  const fetchRecordById = (id) => {
    setLoading(true);
    ApproveHeldService.getApproveHeldById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setEditFormData(data));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  // form data to backend
  const getApproveHeld = () => {
    dispatch(
      setApproveData({
        unitShuttlePK: unitShuttlePK,
        deniedReason: deignedReason,
      })
    );
  };

  useEffect(() => {
    if (id) fetchRecordById(id);
  }, [id]);

  useEffect(() => {
    dispatch(setDriverName(editFormData?.driverName || ""));
    dispatch(setUnitNum(editFormData?.unitNum || ""));
    dispatch(
      setRunType(
        !editFormData?.dryRun && !editFormData?.bonus
          ? "shuttle"
          : (editFormData?.dryRun && "dryRun") || (editFormData?.bonus && "bonus")
      )
    );
    dispatch(setPickUp(editFormData?.pickUp || ""));
    dispatch(setWhatPickUp(editFormData?.whatPickUp || ""));
    dispatch(setWhatDelivery(editFormData?.whatDelivery || ""));
    dispatch(setDelivery(editFormData?.delivery || ""));
    dispatch(setAmount(editFormData?.amount || ""));
    dispatch(setReason(editFormData?.reason || ""));
    dispatch(setShuttleDate(editFormData?.shuttleDate || ""));
    dispatch(setReason(editFormData?.reason || ""));
    dispatch(setDeignedReason(editFormData?.deniedReason || ""));
  }, [editFormData]);

  // give values to change only
  useEffect(() => {
    getApproveHeld();
  }, [unitShuttlePK, deignedReason]);

  return (
    <Formik
      initialValues={{
        driverName,
        pickUp,
        whatPickUp,
        whatDelivery,
        delivery,
        unitNum,
        amount,
        reason,
        shuttleDate,
        deignedReason,
      }}
    >
      {(formik) => (
        <div className="p-2">
          {loading && <LoadingIcon />}
          <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight">
            <Col className="p-15 ms-5" xs={5}>
              <Form.Group className=" mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 me-4">
                  <Form.Label className="col-form-label dealer-label">Driver</Form.Label>
                </Col>
                <Col xs={5} md={5} sm={5} className="p-0">
                  <input
                    name={driverName}
                    className={styles.formControl}
                    type="text"
                    maxLength={61}
                    autoComplete="off"
                    value={driverName}
                    disabled
                    onInput={(e) => {
                      formik.handleChange(e);
                      dispatch(setDriverName(e.target.value));
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 me-4">
                  <Form.Label className="col-form-label dealer-label">Unit Number</Form.Label>
                </Col>
                <Col xs={5} md={5} sm={5} className="p-0">
                  <input
                    className={styles.formControl}
                    name={unitNum}
                    value={unitNum}
                    type="text"
                    maxLength={21}
                    autoComplete="off"
                    disabled
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 me-4">
                  <Form.Label className="col-form-label dealer-label">Shuttle Amount</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0 d-flex">
                  <input
                    className={styles.formControl}
                    name={amount}
                    value={amount}
                    type="text"
                    maxLength={7}
                    disabled
                    autoComplete="off"
                  />
                </Col>
                <Col xs={6} md={6} sm={6}>
                  <RadioGroup
                    name="searchCriteria"
                    className="d-flex align-items-center"
                    selectedValue={runType}
                    disabled
                  >
                    <div className="d-flex ms-3 align-items-center m-b-5">
                      <Radio value="shuttle" disabled />
                      <label className={`f-w-600 m-l-5 `}>Shuttle</label>
                    </div>
                    <div className="d-flex ms-3 align-items-center m-b-5">
                      <Radio value="dryRun" disabled />
                      <label className={`f-w-600 m-l-5 `}>Dry Run</label>
                    </div>
                    <div className="d-flex ms-3 align-items-center m-b-5">
                      <Radio value="bonus" disabled />
                      <label className={`f-w-600 m-l-5 `}>Bonus</label>
                    </div>
                  </RadioGroup>
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 me-4">
                  <Form.Label className="col-form-label dealer-label">Shuttle Date</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0 d-flex">
                  <DateInputField
                    date={shuttleDate}
                    reduxSetDate={(value) => dispatch(setShuttleDate(value))}
                    disabled
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 me-4">
                  <Form.Label className="col-form-label dealer-label">{whatPickUp || "Pickup"}</Form.Label>
                </Col>
                <Col xs={5} md={5} sm={5} className="p-0">
                  <input
                    className={styles.formControl}
                    name={pickUp}
                    type="text"
                    maxLength={61}
                    autoComplete="off"
                    value={pickUp}
                    disabled
                    onInput={(e) => {
                      formik.handleChange(e);
                      dispatch(setPickUp(e.target.value));
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0 me-4">
                  <Form.Label className="col-form-label dealer-label">
                    {whatDelivery || "Delivery"}
                  </Form.Label>
                </Col>
                <Col xs={5} md={5} sm={5} className="p-0">
                  <input
                    className={styles.formControl}
                    name={delivery}
                    value={delivery}
                    type="text"
                    maxLength={61}
                    autoComplete="off"
                    disabled
                    onInput={(e) => {
                      formik.handleChange(e);
                      dispatch(setDelivery(e.target.value));
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group mt-3 row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0  me-4">
                  <label className="col-form-label dealer-label p-0 m-b-20">Reason</label>
                </Col>

                <Col xs={7} md={7} className="p-0">
                  <textarea
                    value={reason}
                    rows={7}
                    cols={20}
                    type="text"
                    className="form-control h-100 "
                    name="reason"
                    disabled
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group mt-3 row  m-l-0 m-r-0">
                <Col sm={4} md={4} xs={4} className="p-0  me-4">
                  <label className="col-form-label dealer-label p-0 m-b-20">Reason Denied</label>
                </Col>

                <Col xs={7} md={7} className="p-0">
                  <textarea
                    rows={7}
                    cols={20}
                    type="text"
                    className="form-control h-100 "
                    name="deignedReason"
                    value={deignedReason}
                    onChange={(e) => {
                      dispatch(setDeignedReason(e.target.value));
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ApproveHeldFormContent;
