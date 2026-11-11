import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSaveFormData } from "../../../../../../redux/DriverMaintenanceSlice";
import { useNavigate } from "react-router";
const NotesTab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [complianceNotes, setComplianceNotes] = useState("");
  const [driverServicesNotes, setDriverServicesNotes] = useState("");
  const [dispatchNotes, setDispatchNotes] = useState("");
  const [complianceFlag, setComplianceFlag] = useState(false);
  const [serviceFlag, setServiceFlag] = useState(false);
  const [dispatchFlag, setDispatchFlag] = useState(false);
  const [commonComment, setCommonComment] = useState("");
  const [showComment, setShowComment] = useState(true);
  const [complianceRemarks, setComplianceRemarks] = useState("");
  const [driverServicesRemarks, setDriverServicesRemarks] = useState("");
  const [dispatchRemarks, setDispatchRemarks] = useState("");
  const viewDetail = useSelector((state) => state.driverMaintenanceReducer.viewDetail);
  const editFormData = useSelector((state) => state.driverMaintenanceReducer.editFormData);
  const saveFormData = useSelector((state) => state.driverMaintenanceReducer.saveFormData);
  const displayFlag = useSelector((state) => state.driverMaintenanceReducer.displayFlag);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const getFormattedTimestamp = () => {
    const now = new Date();

    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `\n${loggedInUser?.name}\n${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  };

  // Save handler
  const handleSave = () => {
    const timestamp = getFormattedTimestamp();

    if (complianceFlag && complianceRemarks?.trim().length > 0) {
      const newEntry = `${complianceRemarks?.trim()} \n${timestamp}`;
      setComplianceNotes((prev) => (prev ? prev + "\n" : "") + newEntry + "\n");
    }

    if (dispatchFlag && dispatchRemarks?.trim().length > 0) {
      const newEntry = `${dispatchRemarks?.trim()} \n${timestamp}`;
      setDispatchNotes((prev) => (prev ? prev + "\n" : "") + newEntry + "\n");
    }
    if (serviceFlag && driverServicesRemarks?.trim().length > 0) {
      const newEntry = `${driverServicesRemarks?.trim()} \n${timestamp}`;
      setDriverServicesNotes((prev) => (prev ? prev + "\n" : "") + newEntry + "\n");
    }

    // Reset input and close comment popup
    setShowComment(true);
    setComplianceFlag(false);
    setServiceFlag(false);
    setDispatchFlag(false);
    setCommonComment("");
    setDispatchRemarks("");
    setComplianceRemarks("");
    setDriverServicesRemarks("");
  };

  const setNotesTabData = (formData) => {
    setComplianceNotes(formData?.complianceNotes || "");
    setDriverServicesNotes(formData?.driverServicesNotes || "");
    setDispatchNotes(formData?.dispatchNotes || "");
  };

  const notesTabData = () => {
    dispatch(
      setSaveFormData({
        complianceNotes: complianceNotes,
        driverServicesNotes: driverServicesNotes,
        dispatchNotes: dispatchNotes,
      })
    );
  };

  useEffect(() => {
    if (viewDetail && editFormData != null) {
      setNotesTabData(editFormData);
    }
    if (!viewDetail && saveFormData !== null && displayFlag) {
      setNotesTabData(saveFormData);
    }
  }, [editFormData, viewDetail, displayFlag]);
  useEffect(() => {
    notesTabData();
  }, [complianceNotes, driverServicesNotes, dispatchNotes]);

  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0">
        <Col xs={4} sm={4} md={4} lg={4} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-3 align-items row  m-l-0 m-r-0">
            <label className="col-form-label dealer-label p-0 m-b-20">Compliance Notes</label>

            <Col sm={10} md={10} className="p-0">
              <textarea
                rows={25}
                cols={10}
                type="dpuInstructions"
                className="customFormControl h-100 "
                name="dpuInstructions"
                value={complianceNotes}
                disabled={viewDetail || !loggedInUser?.master}
                autoComplete="newpassword"
                aria-autocomplete="none"
                onInput={(e) => {
                  setComplianceNotes(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          {/* Empty Tag for styling */}
          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 hide-elements">
            <Col xs={8} className="p-0">
              <input />
            </Col>
          </Form.Group>
          <div className="text-center">
            <button
              className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
              type="button"
              onClick={() => {
                setShowComment(false);
                setComplianceFlag(true);
                setServiceFlag(false);
                setDispatchFlag(false);
                setCommonComment("");
              }}

              disabled={viewDetail}
            >
              Edit
            </button>
          </div>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-3 align-items row  m-l-0 m-r-0">
            <label className="col-form-label dealer-label p-0 m-b-20">Driver Services Notes</label>

            <Col sm={10} md={10} className="p-0">
              <textarea
                rows={25}
                cols={10}
                type="dpuInstructions"
                className="customFormControl h-100 "
                name="dpuInstructions"
                value={driverServicesNotes}
                disabled={viewDetail || !loggedInUser?.master}

                autoComplete="newpassword"
                aria-autocomplete="none"
                onInput={(e) => {
                  setDriverServicesNotes(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          {/* Empty Tag for styling */}
          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 hide-elements">
            <Col xs={8} className="p-0">
              <input />
            </Col>
          </Form.Group>
          <div className="text-center">
            <button
              className={`btn btn-secondary  center customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
              type="button"
              onClick={() => {
                setShowComment(false);
                setComplianceFlag(false);
                setServiceFlag(true);
                setDispatchFlag(false);
                setCommonComment("");
              }}

              disabled={viewDetail}
            >
              Edit
            </button>
          </div>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-3 align-items row  m-l-0 m-r-0">
            <label className="col-form-label dealer-label p-0 m-b-20">Driver Dispatch Notes</label>

            <Col sm={10} md={10} className="p-0">
              <textarea
                rows={25}
                cols={10}
                type="dpuInstructions"
                className="customFormControl h-100 "
                name="dpuInstructions"
                value={dispatchNotes}
                disabled={viewDetail || !loggedInUser?.master}

                autoComplete="newpassword"
                aria-autocomplete="none"
                onInput={(e) => {
                  setDispatchNotes(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          {/* Empty Tag for styling */}
          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 hide-elements">
            <Col xs={8} className="p-0">
              <input />
            </Col>
          </Form.Group>
          <div className="text-center">
            <button
              className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
              type="button"
              onClick={() => {
                setShowComment(false);
                setComplianceFlag(false);
                setServiceFlag(false);
                setDispatchFlag(true);
                setCommonComment("");
              }}

              disabled={viewDetail}
            >
              Edit
            </button>
          </div>
        </Col>
      </Row>
      <Row className="m-0 p-10 popup-overlay" hidden={showComment}>
        <Col sm={12} md={12} lg={12} xl={12} xs={12} className="popup">
          <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-dark border-2">
            <button
              className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
              onClick={() => {
                setShowComment(true);
                setCommonComment("");
                setComplianceFlag(false);
                setServiceFlag(false);
                setDispatchFlag(false);
                setDispatchRemarks("");
                setComplianceRemarks("");
                setDriverServicesRemarks("");
              }}
            >
              Close
            </button>
          </div>

          <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items row m-l-0 m-r-0 ">
            <Col sm={1} md={1} xs={1} className="p-0">
              <Form.Label className="customColFormLabel">Notes</Form.Label>
            </Col>

            <Col sm={9} md={9} className="p-0">
              <textarea
                rows={18}
                cols={10}
                className="customFormControl h-100"
                name="notes"
                autoComplete="off"
                value={commonComment}
                onInput={(e) => {
                  const val = e.target.value;
                  setCommonComment(val);
                  if (complianceFlag) setComplianceRemarks(val);
                  if (serviceFlag) setDriverServicesRemarks(val);
                  if (dispatchFlag) setDispatchRemarks(val);
                }}
              />
            </Col>
          </Form.Group>
          <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap navigate(-1)border-2">
            <div className="d-flex align-items-center flex-wrap m-r-10"></div>
            <div className="d-flex align-items-center flex-wrap">
              <button
                className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
                type="button"
                onClick={handleSave}
                disabled={!commonComment}
              >
                Save
              </button>
              <button
                className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
                type="button"
                onClick={() => {
                  setShowComment(true);
                  setCommonComment("");
                  setComplianceFlag(false);
                  setServiceFlag(false);
                  setDispatchFlag(false);
                  setDispatchRemarks("");
                  setComplianceRemarks("");
                  setDriverServicesRemarks("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NotesTab;
