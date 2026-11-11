import React, { useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setReasonForActivationDelay } from "../../../../../../../../redux/UndispatchSlice";
import { useNavigate, useParams } from "react-router-dom";
const ActivationDelayContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dispatchId, driverId } = useParams();
  const reasonForActivationDelay = useSelector((state) => state.undispatchReducer.reasonForActivationDelay);
  const undispatchFlag = useSelector((state) => state.undispatchReducer.undispatchFlag);

  useEffect(() => {
    if (!undispatchFlag) {
      navigate(`/undispatch/${driverId}`);
    }
  }, [undispatchFlag]);
  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border quarterScreenFormContentHeight">
        <Row className="m-0 p-10">
          <Col xs={12}>
            <Form.Group className="mt-5 align-items  row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0 ">
                <label className="col-form-label dealer-label p-0 m-b-20">Reason For Activation Delay</label>
              </Col>

              <Col sm={8} md={8} className="p-0">
                <textarea
                  rows={10}
                  cols={10}
                  type="text"
                  name="notes"
                  value={reasonForActivationDelay}
                  onInput={(e) => {
                    dispatch(setReasonForActivationDelay(e.target.value.replace(/^\s+/g, "")));
                  }}
                  className={`customFormControl h-100 ${reasonForActivationDelay?.trim() ? "borderGreen" : "borderRed"} `}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ActivationDelayContent;
