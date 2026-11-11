import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DateInputField from "../../../common/DateInputField";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import DelayedUnitPendingEmailService from "../../../../services/DelayedUnitPendingEmailService";
import { updateField } from "../../../../redux/DelayedUnitsPendingEmailSlice";
import formatDatetimeToDate from "../../../../utils/formatDateTimeToDate";
const FormContent = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [selectionType, setSelectionType] = useState("All");

  const selectedId = useSelector((state) => state.delayedUnitsPendingEmail.selectedId);
  const listingData = useSelector((state) => state.delayedUnitsPendingEmail.listingData);
  const isSaveFlag = useSelector((state) => state.delayedUnitsPendingEmail.isSaveFlag);
  const tempEmailBody = useSelector((state) => state.delayedUnitsPendingEmail.tempEmailBody);
  const emailBody = useSelector((state) => state.delayedUnitsPendingEmail.emailBody);

  const [nameOfUser, setNameOfUser] = useState("");

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  useEffect(() => {
    if (isSaveFlag) {
      updateData("emailBody", tempEmailBody);
    }
  }, [isSaveFlag]);

  return (
    <div className="p-0 w-100 quarterScreenFormContentHeight">
      <Col sm={10} md={10} lg={10} xl={10} xs={10} className="m-0 p-20">
        <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
          <Col sm={2} md={2} xs={2} className="p-0 p-l-15" style={{ width: "160px" }}>
            <Form.Label className={`${styles.colFormLabel}`}>User</Form.Label>
          </Col>

          <Col xs={8} md={8} sm={8} className="p-0">
            <input
              type="text"
              className="customFormControl"
              value={listingData?.Name ? listingData.Name : ""}
              disabled
            />
          </Col>
        </Form.Group>
      </Col>
      <Row className="m-0 p-20">
        <Col sm={6} md={6} lg={6} xl={6} xs={6}>
          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Date</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "150px" }}>
              <DateInputField date={formatDatetimeToDate(listingData?.AddDate, "MM/DD/YY")} disabled />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Unit Number</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "200px" }}>
              <input
                type="text"
                className="customFormControl"
                value={listingData?.UnitNumber ? listingData.UnitNumber : ""}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Type</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "150px" }}>
              <input
                type="text"
                className="customFormControl"
                value={listingData?.Type ? listingData.Type : ""}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`${styles.colFormLabel}`}>Action</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "150px" }}>
              <input
                type="text"
                className="customFormControl"
                value={listingData?.Action ? listingData.Action : ""}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>

        <Col sm={5} md={5} lg={5} xl={5} xs={5}>
          <Form.Group className=" m-b-10 align-items row  m-l-0 m-r-0 ">
            <Col sm={1} md={1} xs={1} className="p-0">
              <Form.Label className=" col-form-label dealer-label"></Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "550px", height: "300px" }}>
              <textarea
                id="reasonNotTested"
                className={`customFormControl h-100 w-100`}
                rows={5}
                cols={6}
                name="reasonNotTested"
                type="text"
                value={emailBody}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {}}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default FormContent;
