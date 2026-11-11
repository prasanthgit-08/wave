import React, { useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setEmailSubject, setIsSubjectTabValid } from "../../../../../../redux/EmailFormatsSlice";

const SubjectTab = () => {
  const dispatch = useDispatch();

  const emailSubject = useSelector((state) => state.emailFormats.emailSubject);
  const viewDetail = useSelector((state) => state.emailFormats.viewDetail);
  const isEmailFormatDataLoading = useSelector((state) => state.emailFormats.isEmailFormatDataLoading);

  useEffect(() => {
    if (emailSubject?.trim() !== "") {
      dispatch(setIsSubjectTabValid(true));
    } else {
      dispatch(setIsSubjectTabValid(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailSubject]);

  return (
    <div className="p-1 w-100">
      <Row className="m-0 p-0">
        <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
          <Col xs={12} md={12} sm={12} className="p-0">
            <textarea
              id="emailBodyFormat"
              //  className={`customFormControl h-100 textarea-height customFocusClass ${
              className={`customFormControl h-100  customFocusClass ${
                viewDetail === true || isEmailFormatDataLoading
                  ? ""
                  : emailSubject?.trim() === ""
                    ? "borderRed"
                    : "borderGreen"
              }`}
              rows={19}
              cols={20}
              name="emailBodyFormat"
              type="text"
              autoComplete="off"
              aria-autocomplete="list"
              value={emailSubject}
              disabled={viewDetail}
              onInput={(e) => {
                dispatch(setEmailSubject(e.target.value));
              }}
            />
          </Col>
        </Form.Group>
      </Row>
    </div>
  );
};

export default SubjectTab;
