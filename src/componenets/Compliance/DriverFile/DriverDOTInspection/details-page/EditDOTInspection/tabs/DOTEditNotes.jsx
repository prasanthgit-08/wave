import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import DriverDOTInspectionService from "../../../../../../../services/Compliance/DriverDOTInspectionService";
import { setSaveFormData } from "../../../../../../../redux/Compliance/DriverDOTInspectionSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const DOTEditNotes = () => {
  const dispatch = useDispatch();
  const { driverId, dotInspectionPK } = useParams();
  const [inspectionNotes, setInspectionNotes] = useState("");
  const viewDetail = useSelector((state) => state.driverDOTInspection.viewDetail);
  const [driverDOTInspectiondata, setDriverDOTInspectiondata] = useState();

  const fetchDriverDOTInspectionDetails = () => {
    DriverDOTInspectionService.getDriverDOTInspectionDetails({
      driverDotInspectionPK: dotInspectionPK,
      tab: "Notes",
      driverFK: driverId,
    })
      .then((res) => {
        const dotInspectionData = res.data;
        setDriverDOTInspectiondata(dotInspectionData);
        setInspectionNotes(dotInspectionData?.Notes || "");
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchDriverDOTInspectionDetails();
  }, []);

  useEffect(() => {
    if (viewDetail) {
      setInspectionNotes(driverDOTInspectiondata?.Notes);
    }
  }, [viewDetail]);

  //save
  const editNotesSaveData = () => {
    dispatch(
      setSaveFormData({
        Notes: inspectionNotes,
      })
    );
  };

  useEffect(() => {
    editNotesSaveData();
  }, [inspectionNotes]);
  return (
    <div className="p-2">
      <div className=" p-2 d-flex align-items-center mt-2">
        <Col sm={12} md={12} xs={12}>
          <Form.Group className="form-group m-l-2  align-items-center row m-r-0">
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
                disabled={viewDetail}
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

export default DOTEditNotes;
