import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setOnlyEmailIf } from "../../../../../redux/EmailAttachmentSlice";

const EmailConditionTab = () => {
  const dispatch = useDispatch();

  const onlyEmailIf = useSelector((state) => state.emailAttachmentReducer.onlyEmailIf);
  const viewDetail = useSelector((state) => state.emailAttachmentReducer.viewDetail);

  return (
    <div className="m-b-10">
      <div className="p-2 w-100">
        <Row className="m-0 p-10">
          <Col sm={12} md={12} lg={12} xl={12} xs={12}>
            <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
              <Col /* sm={2} md={2} */ xs={2} className="p-0">
                <label className="customColFormLabel p-0 m-b-20">Email Condition</label>
              </Col>

              <Col /* sm={10} md={10} */ xs={10} className="p-0">
                <textarea
                  id="onlyEmailIf"
                  name="onlyEmailIf"
                  cols={20}
                  type="text"
                  className="customFormControl "
                  style={{
                    resize: "none",
                    display: "fixed",
                    height: "200px",
                    minWidth: "610px",
                    boxShadow: "none",
                    fontSize: "12px",
                  }}
                  value={onlyEmailIf}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled={viewDetail}
                  onChange={(e) => {
                    dispatch(setOnlyEmailIf(e.target.value));
                  }}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EmailConditionTab;
