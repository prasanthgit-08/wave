import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import styles from "../../../../../../../styles/ThreeQuarterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setDisableSave,
  setDriverDeleaseRequests,
} from "../../../../../../../redux/DriverDeleaseRequestsSlice";
function DriverDeleaseRequestsContent() {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /**Used the slice in driver service to prevent back arrow operation */
  const isProcessedBit = useSelector((state) => state.driverServicesSlice.isProcessedBit);
  const [driverRequested, setDriverRequested] = useState(false);
  const [reason, setReason] = useState("");
  /**Navigate to driver service general tab if isprocessed bit is
   * true to prevemt unnecessary record creation */
  useEffect(() => {
    if (isProcessedBit) {
      navigate(`/driver-service-selection/${driverId}/form`);
    }
  }, []);

  /**Data to save driver delease request */
  useEffect(() => {
    dispatch(
      setDriverDeleaseRequests({
        driverFK: parseInt(driverId),
        driverRequested: driverRequested,
        reason: reason,
      })
    );
  }, [driverRequested, reason]);

  /**Save Validation */
  useEffect(() => {
    if (reason && reason.length >= 1) {
      /**Enable save */
      dispatch(setDisableSave(false));
    } else {
      /**Disable save */
      dispatch(setDisableSave(true));
    }
  }, [reason]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Col xs={12} className="ps-3">
              <div className="mt-5"> {/* Div wrapper with margin-top*/}</div>
              <Form.Group className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Driver Requested
                  </Form.Label>
                </Col>
                <Col xs={1} md={6} sm={2} className="p-0 d-flex">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    id="driverrequested"
                    name="driverrequested"
                    checked={driverRequested}
                    onChange={(e) => {
                      setDriverRequested(e.target.checked);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className={`mt-1 m-b-10 align-items-start row  m-l-0 m-r-0 ${styles.colFormLabel}`}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Reason
                  </Form.Label>
                </Col>

                <Col xs={9} md={9} className="p-0 me-2">
                  <textarea
                    rows={12}
                    cols={10}
                    type="text"
                    className={`customFormControl h-100 w-100 customFocusClass ${
                      reason && reason.length >= 1 ? "borderGreen" : "borderRed"
                    } `}

                    id="reason"
                    name="reason"
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                    }}
                    autoComplete="newpassword"
                    aria-autocomplete="none"
                  />
                </Col>
              </Form.Group>
            </Col>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DriverDeleaseRequestsContent;
