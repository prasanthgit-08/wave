import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import {
  setDriverAddNotesData,
  setDriverServicesNotes,
} from "../../../../../../../../redux/DriverAddNotesSlice";

const Notes = () => {
  const dispatch = useDispatch();
  const { driverId } = useParams();

  const viewDetail = useSelector((state) => state.driverAddNotesReducer.viewDetail);
  const driverAddNotes = useSelector((state) => state.driverAddNotesReducer.driverAddNotes);
  const driverServicesNotes = useSelector((state) => state.driverAddNotesReducer.driverServicesNotes);

  useEffect(() => {
    dispatch(setDriverServicesNotes(""));
  }, []);

  const NotesTabData = () => {
    dispatch(
      setDriverAddNotesData({
        driverServicesNotes: driverServicesNotes,

        driverPK: driverId,
      })
    );
  };

  useEffect(() => {
    NotesTabData();
  }, [driverServicesNotes, driverId]);

  useEffect(() => {}, [driverAddNotes, viewDetail]);

  return (
    <div className="p-15 w-100" style={{ minHeight: "150px" }}>
      <Row>
        <Col xs={1} sm={1} md={1} />
        <div className="col-10">
          <Col lg={12} sm={12} md={12} xs={12}>
            <Form.Group className="form-group mt-5 align-items-center row  m-l-0 m-r-0">
              <Col lg={12} xs={12} md={12} sm={12} className="p-0">
                <textarea
                  rows={24}
                  cols={40}
                  type="text"
                  className="customFormControl "
                  name=" addnotesfield "
                  value={driverServicesNotes}
                  onChange={(e) => {
                    const trimmedValue = e.target.value.replace(/^[\s.]+/, "");
                    dispatch(setDriverServicesNotes(trimmedValue));
                  }}
                  style={{ minHeight: "250px" }}
                />
              </Col>
            </Form.Group>
          </Col>
        </div>
      </Row>
    </div>
  );
};

export default Notes;
