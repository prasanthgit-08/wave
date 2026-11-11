import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setReasonForActivationDelay } from "../../../../../redux/YardCheckinSlice";

const ActivationDelayContent = () => {
  //dispatch
  const dispatch = useDispatch();

  const unitNumberSelected = useSelector((state) => state.yardCheckinReducer.unitNumberInput);
  const reasonForActivationDelay = useSelector((state) => state.yardCheckinReducer.reasonForActivationDelay);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row className="m-0 p-10">
              <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                {/* Unit */}
                <Form.Group className=" mt-4 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Unit</Form.Label>
                  </Col>
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      className="customFormControl"
                      name="selectedUnitNumber"
                      value={unitNumberSelected}
                      disabled
                    />
                  </Col>
                </Form.Group>
                {/* Reason */}
                <Form.Group className=" mt-4 m-b-10 align-items row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Reason</Form.Label>
                  </Col>
                  <Col sm={9} md={9} xs={9} className="p-0">
                    <textarea
                      className={`customFormControl h-100  customFocusClass ${
                        reasonForActivationDelay?.trim() === "" ? "borderRed" : "borderGreen"
                      }`}
                      // className="customFormControl h-100 "
                      name="notes"
                      rows={10}
                      cols={22}
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setReasonForActivationDelay(e.target.value));
                      }}
                    ></textarea>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivationDelayContent;
