/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {} from "../../../../../services/constants/applicationConstants";
import {
  setDisableSave,
  setFormData,
  setViewDetail,
  setRestricted,
  setDispatchers,
  setDriverDispatchHold,
  setDispatchLoading,
} from "../../../../../redux/DriverDispatchHoldSlice";
import DateInputField from "../../../../common/DateInputField";
import DriverDispatchHoldsService from "../../../../../services/DriverDispatchHoldsService";
import Input from "../../../../../components/common/input";

const FormContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { driverId, id } = useParams();
  const [description, setDescription] = useState("");
  const [driversDescription, setDriversDescription] = useState("");
  const [complianceNotes, setComplianceNotes] = useState("");
  const [holdDispatch, setHoldDispatch] = useState(false);
  const [holdDate, setHoldDate] = useState("");
  const [holdReason, setHoldReason] = useState("");
  const [checkHoldDate, setCheckHoldDate] = useState(false);
  const [dispatchHoldId, setDispatchHoldId] = useState("");
  const [selectionDateValid, setSelectionDateValid] = useState(true);

  const viewDetail = useSelector((state) => state.driverDispatchHold.viewDetail);
  const formData = useSelector((state) => state.driverDispatchHold.formData);
  const dispatchLoading = useSelector((state) => state.driverDispatchHold.dispatchLoading);

  const fetchRecordById = (id) => {
    dispatch(setDispatchLoading(true));
    DriverDispatchHoldsService.getDriverDispatchHoldById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setFormData(data));
        dispatch(setViewDetail(true));
        dispatch(setDispatchLoading(false));
      })
      .catch((error) => {
        if (window.location.pathname === "/driverservice/driver-dispatchhold/" + driverId + "/" + id) {
          navigate(`/driverservice/driver-dispatchhold/${driverId}`);
        } else {
          navigate(`/drivercompliance/driver-dispatchhold/${driverId}`);
        }
      })
      .finally(() => {
        dispatch(setDispatchLoading(false));
      });
  };

  useEffect(() => {
    fetchRecordById(id);
  }, []);

  useEffect(() => {
    if (formData != null) {
      setDispatchHoldId(formData?.dispatchHoldId || "");
      setDescription(formData?.description || "");
      setDriversDescription(formData?.driverDescription || "");
      setComplianceNotes(formData?.notes || "");
      setHoldDispatch(formData?.hold || false);
      setHoldDate(formData?.holdDate || "");
      setHoldReason(formData?.holdReason || "");
      setCheckHoldDate(formData?.holdDateCheck || false);
      dispatch(setRestricted(formData?.restricted || false));
      dispatch(setDispatchers(formData?.dispatchers || false));
    }
  }, [formData, viewDetail]);

  const driverDispatchData = () => {
    dispatch(
      setDriverDispatchHold({
        driverDispatchHoldPK: id,
        driverFK: driverId,
        dispatchHoldId: dispatchHoldId,
        driverDescription: driversDescription,
        holdReason: holdReason,
        holdDate: holdDate,
        hold: holdDispatch,
      })
    );
  };

  useEffect(() => {
    driverDispatchData();
  }, [holdDispatch, holdDate, holdReason]);

  useEffect(() => {
    if (holdDispatch) {
      if (holdReason && selectionDateValid) {
        dispatch(setDisableSave(true));
      } else {
        dispatch(setDisableSave(false));
      }
    } else {
      if (selectionDateValid) {
        dispatch(setDisableSave(true));
      } else {
        dispatch(setDisableSave(false));
      }
    }
  }, [holdDispatch, holdReason, selectionDateValid]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row className="m-0 p-10">
              <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                <Form.Group className=" mt-3 form-group m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Description</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "250px" }}>
                    <Input
                      name="description"
                      id="description"
                      type="text"
                      className={`customFormControl ${!viewDetail ? (description ? "" : "") : ""}`}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled
                      maxLength={30}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className=" mt-3 form-group m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Drivers Description</Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0" style={{ width: "350px" }}>
                    <Input
                      name={driversDescription}
                      type="text"
                      className={`customFormControl`}
                      maxLength={30}
                      id="tmrperiod"
                      value={driversDescription}
                      disabled
                      onChange={(e) => setDriversDescription(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className=" mt-3 m-b-10 align-items row  m-l-0 m-r-0 ">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Compliance Notes</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "600px" }}>
                    <textarea
                      id="complianceNotes"
                      className={`customFormControl h-100 `}
                      rows={5}
                      cols={12}
                      name="notes"
                      type="text"
                      value={complianceNotes}
                      disabled
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setComplianceNotes(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className=" mt-3 m-b-10 align-items row  m-l-0 m-r-0 ">
                  <Col xs={2} sm={2} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Hold Dispatch</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0`}
                      checked={holdDispatch}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setHoldDispatch(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className=" mt-3 form-group m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col xs={2} sm={2} md={2} className="p-0 ">
                    <Form.Label className="customColFormLabel">Hold Date</Form.Label>
                  </Col>
                  <Col xs={3} sm={3} className="p-0" style={{ maxWidth: "95px" }}>
                    <DateInputField
                      date={holdDate}
                      setIsDateValid={setSelectionDateValid}
                      setDate={setHoldDate}
                      disabled={viewDetail || !checkHoldDate}
                      className={`customFormControl ${
                        viewDetail ? "" : selectionDateValid ? "" : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className=" mt-3 m-b-10 align-items row  m-l-0 m-r-0 ">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Hold Reason</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "600px" }}>
                    <textarea
                      className={`customFormControl customFocusClass h-100 ${
                        !viewDetail && holdDispatch ? (!holdReason ? "borderRed" : "borderGreen") : ""
                      } `}
                      rows={5}
                      cols={12}
                      name="notes"
                      type="text"
                      value={holdReason}
                      onChange={(e) => {
                        setHoldReason(e.target.value);
                      }}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            {dispatchLoading && (
              <div className="fade modal-backdrop show">
                <div className="pos-center">
                  <div className="loader"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContent;
