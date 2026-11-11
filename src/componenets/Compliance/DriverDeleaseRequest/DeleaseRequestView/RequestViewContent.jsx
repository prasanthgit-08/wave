import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DateInputField from "../../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DriverDeleaseRequestsService from "../../../../services/DriverDeleaseRequestsService";
import { setDeleaseRequestRecord } from "../../../../redux/Compliance/DriverDeleaseRequestSlice";
import { formatDatetimeToDate } from "../../../../utils/dateUtils";
import toast from "react-hot-toast";

function RequestViewContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { deleaserequestPK, driverId } = useParams();
  const flagStatus = useSelector((state) => state.deleaseRequestReducer.flagStatus);
  const deleaseRequestRecord = useSelector((state) => state.deleaseRequestReducer.deleaseRequestRecord);
  const [requestDate, setRequestDate] = useState("");
  const [notifiedDate, setNotifiedDate] = useState("");
  const [loader, setLoader] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);

  /*****
   * Get the Driver Delease Request Data based on the Status Flag
   *****/
  useEffect(() => {
    if (deleaserequestPK && flagStatus === "VIEW") {
      setLoader(true);
      DriverDeleaseRequestsService.processDriverDeleaseRequest(deleaserequestPK, flagStatus)
        .then((response) => {
          const { data } = response;
          const deleaserequestdata = data.response.DeleaseRequestViewEdit[0];
          dispatch(setDeleaseRequestRecord(deleaserequestdata));
          setLoader(false);
        })
        .catch((err) => {
          navigate(`/delease-request`);
          setLoader(false);
        });
    }
  }, [deleaserequestPK, flagStatus]);

  /***used to navigate to the delease request page
   * if refresh button is clicked
   * preventing the clearing of the values on load
   ****/
  useEffect(() => {
    if (flagStatus === "") {
      navigate("/delease-request");
    }
  }, [flagStatus]);

  useEffect(() => {
    if (deleaseRequestRecord !== null) {
      if (deleaseRequestRecord?.notified) {
        setNotifiedDate(formatDatetimeToDate(deleaseRequestRecord?.NotifiedDate));
      }
      setRequestDate(formatDatetimeToDate(deleaseRequestRecord?.AddDate));
    }
  }, [deleaseRequestRecord]);

  /****Used to solve the issues related to close and backbutton click*****/
  window.addEventListener("popstate", () => {
    navigate(`/delease-request`);
  });

  /****
   * SET Notified Date to
   * fill the respective fields
   * ****/
  useEffect(() => {
    if (deleaseRequestRecord !== null) {
      setNotifiedDate(formatDatetimeToDate(deleaseRequestRecord?.NotifiedDate));
    }
  }, [deleaseRequestRecord]);

  return (
    <div className="w-100 p-2">
      {loader && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row className="m-0 p-10">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Driver</Form.Label>
                  </Col>

                  <Col xs={8} md={8} sm={8} className="p-0">
                    <input
                      name="driver"
                      id="driver"
                      type="text"
                      className={"customFormControl"}
                      value={deleaseRequestRecord?.DriverName}
                      disabled
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Requested By</Form.Label>
                  </Col>
                  <Col xs={8} md={8} sm={8} className="p-0">
                    <input
                      name="requested by"
                      id="requestedby"
                      type="text"
                      className={"customFormControl"}
                      value={deleaseRequestRecord?.AddedByUser}
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 ">
                    <Form.Label className="customColFormLabel">Requested Date</Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <DateInputField
                      date={requestDate}
                      name="requestDate"
                      className="customFormControl"
                      setDate={setRequestDate}
                      disabled
                    />
                  </Col>
                </Form.Group>

                <div className="mt-2 " style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <label className="col-form-label mt-2" style={{ marginLeft: "0px" }}>
                    Driver Requested
                  </label>
                  <input
                    className="mt-2"
                    type="checkbox"
                    id="driverrequested"
                    name="driverrequested"
                    style={{ width: "15px", marginTop: "0", marginLeft: "10px" }}
                    value={deleaseRequestRecord?.DriverRequested}
                    checked={deleaseRequestRecord?.DriverRequested}
                    disabled
                  />
                </div>

                <div className="mt-5 " style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <label className="col-form-label mt-2" style={{ marginLeft: "0px" }}>
                    Driver Notified
                  </label>
                  <input
                    className="mt-2 "
                    type="checkbox"
                    id="drivernotified"
                    name="drivernotified"
                    style={{ width: "15px", marginTop: "0", marginLeft: "23px" }}
                    value={deleaseRequestRecord?.Notified}
                    checked={deleaseRequestRecord?.Notified}
                    disabled
                  />
                </div>

                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Notified By</Form.Label>
                  </Col>
                  <Col xs={8} md={8} sm={8} className="p-0">
                    <input
                      name="notifiedby"
                      id="notifiedby"
                      type="text"
                      className={"customFormControl"}
                      value={deleaseRequestRecord?.NotifiedUser}
                      disabled
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 ">
                    <Form.Label className="customColFormLabel">Notified Date</Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <DateInputField
                      date={notifiedDate}
                      name="notifiedDate"
                      className="customFormControl"
                      setDate={setNotifiedDate}
                      disabled
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                <div className="form-group d-flex flex-column mt-0 ">
                  <label className="form-label mb-1">Reason For Delease Request</label>
                  <textarea
                    type="text"
                    id="reason"
                    name="reason"
                    rows={9}
                    cols={13}
                    className={`customFormControl h-100 w-100 customFocusClass  `}
                    value={deleaseRequestRecord?.Reason}
                    disabled
                  />
                </div>

                <div className="form-group d-flex flex-column mt-2">
                  <label className="form-label mb-1">Request Notes</label>
                  <textarea
                    type="text"
                    id="requestnotes"
                    name="requestnotes"
                    rows={9}
                    cols={13}
                    className={`customFormControl h-100 w-100 customFocusClass  `}
                    value={deleaseRequestRecord?.Notes}
                    disabled
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestViewContent;
