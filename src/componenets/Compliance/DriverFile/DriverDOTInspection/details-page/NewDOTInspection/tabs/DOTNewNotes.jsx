import React, { useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import { useState } from "react";
import {
  setNewNotesData,
  setSaveFormData,
} from "../../../../../../../redux/Compliance/DriverDOTInspectionSlice";
import { useDispatch, useSelector } from "react-redux";
import DriverDOTInspectionService from "../../../../../../../services/Compliance/DriverDOTInspectionService";

const DOTNewNotes = () => {
  const dispatch = useDispatch();
  const [inspectionNotes, setInspectionNotes] = useState("");

  //save
  const newNotesSaveData = () => {
    dispatch(
      setSaveFormData({
        Notes: inspectionNotes,
      })
    );
  };

  useEffect(() => {
    newNotesSaveData();
  }, [inspectionNotes]);

  return (
    <div className="p-2">
      <div className=" p-2 d-flex align-items-center mt-2">
        <Col sm={12} md={12} xs={12}>
          <Form.Group className="form-group mt-2 m-l-2  align-items-center row m-r-0">
            <Col sm={12} md={12} xs={12} className="p-0">
              <Form.Label
                className="col-form-label"
                style={{
                  marginLeft: "50px",
                  marginBottom: "20px",
                }}
              >
                Inspection Notes
              </Form.Label>
            </Col>
            <Col sm={9} md={9} xs={9} className="p-0">
              <textarea
                id="inspectionNotes"
                name="inspctnNotes"
                rows={10}
                cols={20}
                style={{
                  resize: "none",
                  display: "fixed",
                  height: "250px",
                  marginLeft: "50px",
                  marginBottom: "34px",
                }}
                className="customFormControl"
                value={inspectionNotes}
                onChange={(e) => setInspectionNotes(e.target.value)}
                autoComplete="new-password"
                aria-autocomplete="off"
              />
            </Col>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
};

export default DOTNewNotes;
