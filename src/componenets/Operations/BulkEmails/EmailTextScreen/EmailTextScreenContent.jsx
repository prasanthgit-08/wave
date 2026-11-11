import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../../redux/Operations/BulkEmailSlice";

const EmailTextScreenContent = () => {
  const dispatch = useDispatch();

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const subject = useSelector((state) => state.bulkEmails.subject);
  const body = useSelector((state) => state.bulkEmails.body);
  const process = useSelector((state) => state.bulkEmails.process);

  return (
    <Form>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                  <Form.Group className="form-group  form-group  m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className="col-form-label dealer-label p-l-15">Email Subject</Form.Label>
                    </Col>
                    <Col xs={8} md={8} sm={8} lg={8} xl={8} className="p-0">
                      <input
                        type="input"
                        className={`customFormControl  ${process !== "New" ? "" : subject?.trim() ? "borderGreen" : "borderRed"} `}
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={subject}
                        onChange={(e) => {
                          if (e.target.value !== " ") {
                            updateData("subject", e.target.value);
                          } else {
                            updateData("subject", "");
                          }
                        }}
                      />
                    </Col>
                  </Form.Group>

                  {/* Email Body */}
                  <Form.Group className="form-group m-t-5 m-b-15 align-items-start row m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0 d-flex flex-column align-items-start">
                      <Form.Label className="col-form-label dealer-label p-l-15">Email Body</Form.Label>
                    </Col>
                    <Col xs={8} md={8} sm={8} className="p-0">
                      <textarea
                        autoComplete="off"
                        aria-autocomplete="list"
                        cols={30}
                        rows={15}
                        type="text"
                        value={body}
                        onChange={(e) => {
                          if (e.target.value !== " ") {
                            updateData("body", e.target.value);
                          } else {
                            updateData("body", "");
                          }
                        }}
                        className={`customFormControl h-100 w-100 customFocusClass ${process !== "New" ? "" : body?.trim() ? "borderGreen" : "borderRed"}`}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default EmailTextScreenContent;
