import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateField } from "../../../../redux/DelayedUnitsPendingEmailSlice";

const EditContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tempData, setTempData] = useState("");

  const emailBody = useSelector((state) => state.delayedUnitsPendingEmail.emailBody);
  const isSaveFlag = useSelector((state) => state.delayedUnitsPendingEmail.isSaveFlag);
  const selectedId = useSelector((state) => state.delayedUnitsPendingEmail.selectedId);
  const tempEmailBody = useSelector((state) => state.delayedUnitsPendingEmail.tempEmailBody);

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  useEffect(() => {
    updateData("tempEmailBody", emailBody);
  }, []);

  return (
    <div className="p-0 w-100 quarterScreenFormContentHeight">
      <Row className="m-0 p-3 flex-grow-1 align-items-center justify-content-center">
        <Col xs={9}>
          <Form.Group className=" mt-5 m-b-10 align-items row  m-l-0 m-r-0 ">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className=" col-form-label dealer-label"></Form.Label>
            </Col>

            <Col xs={12} md={12} sm={12} className="p-0" style={{ width: "800", height: "300px" }}>
              <textarea
                id="reasonNotTested"
                className={`customFormControl h-100 w-100`}
                rows={5}
                cols={50}
                name="reasonNotTested"
                type="text"
                value={tempEmailBody}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  updateData("tempEmailBody", e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default EditContent;
