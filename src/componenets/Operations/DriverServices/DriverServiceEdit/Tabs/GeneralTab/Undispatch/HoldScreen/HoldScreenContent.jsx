import React, { useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setHoldAuthorizedBy,
  setHoldNote,
  setHoldReason,
} from "../../../../../../../../redux/UndispatchSlice";
import { useNavigate, useParams } from "react-router-dom";
const HoldScreenContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const undispatchFlag = useSelector((state) => state.undispatchReducer.undispatchFlag);
  const { driverId } = useParams();
  const holdReason = useSelector((state) => state.undispatchReducer.holdReason);
  const holdNote = useSelector((state) => state.undispatchReducer.holdNote);
  const holdAuthorizedBy = useSelector((state) => state.undispatchReducer.holdAuthorizedBy);
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
              <Col sm={2} md={2} xs={2} className="p-0">
                <label className="col-form-label dealer-label p-0 m-b-20">Reason For Hold</label>
              </Col>

              <Col sm={5} md={5} className="p-0">
                <input
                  type="text"
                  name="holdReason"
                  value={holdReason}
                  autoComplete="new-password"
                  aria-autocomplete="none"
                  onInput={(e) => {
                    dispatch(setHoldReason(e.target.value.replace(/^\s+/g, "")));
                  }}
                  className={`customFormControl  ${holdReason?.trim() ? "borderGreen" : "borderRed"}`}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 align-items  row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <label className="col-form-label dealer-label p-0 m-b-20">Authorized By</label>
              </Col>

              <Col sm={4} md={4} className="p-0">
                <input
                  type="text"
                  name="holdAuthorizedBy"
                  value={holdAuthorizedBy}
                  autoComplete="new-password"
                  aria-autocomplete="none"
                  onInput={(e) => {
                    dispatch(setHoldAuthorizedBy(e.target.value.replace(/^\s+/g, "")));
                  }}
                  className={`customFormControl ${holdAuthorizedBy?.trim() ? "borderGreen" : "borderRed"}`}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 align-items  row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <label className="col-form-label dealer-label p-0 m-b-20">Notes</label>
              </Col>

              <Col sm={8} md={8} className="p-0">
                <textarea
                  rows={10}
                  cols={10}
                  type="text"
                  name="notes"
                  value={holdNote}
                  onInput={(e) => {
                    dispatch(setHoldNote(e.target.value.replace(/^\s+/g, "")));
                  }}
                  className={`customFormControl h-100 $   ${holdNote?.trim() ? "borderGreen" : "borderRed"}`}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HoldScreenContent;
