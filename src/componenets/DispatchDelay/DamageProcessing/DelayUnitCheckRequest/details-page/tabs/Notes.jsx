import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setDelayRequestFormData } from "../../../../../../redux/DispatchDelay/DelayProcessing/DelayUnitCheckRequestSlice";

function Notes() {
  const { checkRequestid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const delayRequestRecord = useSelector((state) => state.delayCheckRequest.delayRequestRecord);
  const viewDetail = useSelector((state) => state.delayCheckRequest.viewDetail);
  const changesCancelled = useSelector((state) => state.delayCheckRequest.changesCancelled);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (delayRequestRecord !== null) {
      setNotes(delayRequestRecord?.Notes ? delayRequestRecord.Notes : "");
    }
  }, [delayRequestRecord, changesCancelled]);

  const generalTabFormData = () => {
    dispatch(
      setDelayRequestFormData({
        notes: notes,
      })
    );
  };

  /*****Save Object Data */
  useEffect(() => {
    generalTabFormData();
  }, [notes]);
  return (
    <div className="w-100 p-2">
      <div className="mb-3 p-3">
        <Form.Group className="form-group mt-3  align-items-center row  m-l-55 m-r-0">
          <Col sm={12} md={12} xs={12} className="p-0">
            <textarea
              rows={10}
              cols={20}
              style={{
                resize: "none",
                display: "fixed",
                minHeight: "360px",
                minWidth: "1100px",
                boxShadow: "none",
                fontSize: "12px",
              }}
              type="text"
              className="customFormControl h-100 textarea-height textAreaWidthTwoRow"
              id="notes"
              name="notes"
              value={notes}
              disabled={viewDetail}
              onInput={(e) => setNotes(e.target.value)}
            />
          </Col>
        </Form.Group>
      </div>
    </div>
  );
}

export default Notes;
