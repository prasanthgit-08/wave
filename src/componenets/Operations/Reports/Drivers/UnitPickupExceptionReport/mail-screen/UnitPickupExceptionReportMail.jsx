import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import CommonFooter from "../../../../../common/CommonFooter";
import QuarterScreenWrapper from "../../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../../common/Header";
import ModalComponent from "../../../../../common/ModalComponent";
import UnitPickupExceptionReportService from "../../../../../../services/Reports/UnitPickupExceptionReportService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetChanges, setPageNumber } from "../../../../../../redux/Reports/UnitPickupExceptionSlice";

const UnitPickupExceptionReportMail = () => {
  const [emailText, setEmailText] = useState("");
  const [cancelShow, setCancelShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Populated by the browse screen's row click — no separate fetch needed here.
  const selectedDispatchPK = useSelector((state) => state.unitPickupException.selectedDispatchPK);
  const unitNumberSubject = useSelector((state) => state.unitPickupException.unitNumber);
  const recieversEmail = useSelector((state) => state.unitPickupException.recieversEmail);
  const driver = useSelector((state) => state.unitPickupException.driverName);
  const unitNumber = useSelector((state) => state.unitPickupException.unitNumber);
  const model = useSelector((state) => state.unitPickupException.model);
  const unitType = useSelector((state) => state.unitPickupException.unitType);
  const specialCode = useSelector((state) => state.unitPickupException.specialCode);
  const pickupAddress = useSelector((state) => state.unitPickupException.pickupAddress);
  const pickupCity = useSelector((state) => state.unitPickupException.pickupCity);
  const pickupState = useSelector((state) => state.unitPickupException.pickupState);
  const deliveryAddress = useSelector((state) => state.unitPickupException.deliveryAddress);
  const deliveryCity = useSelector((state) => state.unitPickupException.deliveryCity);
  const deliveryState = useSelector((state) => state.unitPickupException.deliveryState);

  const payload = {
    receivers: recieversEmail,
    emailSubject: unitNumberSubject,
    emailBody: emailText,
  };

  useEffect(() => {
    if (!selectedDispatchPK) {
      navigate(`/unit-pickup-exception-browse-screen`, { replace: true });
    }
  }, []);

  const sendUnitPickupExceptionEmail = () => {
    setLoading(true);
    UnitPickupExceptionReportService.sendUnitPickupExceptionEmail(payload)
      .then(() => {
        toast.success("Sent email successfully");
        setEmailText("");
        navigate(-1);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to email unit pickup exception notes to driver!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const footerButtons = [
    {
      label: "Send",
      onClick: () => sendUnitPickupExceptionEmail(),
      disabled: emailText?.trim().length === 0,
    },
    { label: "Cancel", onClick: () => handleCancel() },
  ];

  const hasChanges = !!emailText?.trim();

  const goBackToBrowse = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate(`/unit-pickup-exception-browse-screen`, { replace: true });
    }
  };

  const handleCancel = () => {
    if (!hasChanges) {
      goBackToBrowse();
      return;
    }
    setCancelShow(true);
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    goBackToBrowse();
    toast.success("Changes Cancelled");
  };

  useEffect(() => {
    const handlePopState = () => {
      dispatch(resetChanges());
      dispatch(setPageNumber(0));
      /* the pop already moved off this screen, replacing avoids leaving it behind to come back to */
      navigate(`/unit-pickup-exception-browse-screen`, { replace: true });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <QuarterScreenWrapper>
      <Header
        closeHandler={() => dispatch(resetChanges())}
        confirmClose={hasChanges}
        programName="Unit Pickup Exception Report"
      />
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col xs={6}>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-2">
                    <Col xs={4} className="p-0">
                      <Form.Label className="customColFormLabel">Driver</Form.Label>
                    </Col>
                    <Col xs={8} className="p-0">
                      <input
                        name="driver"
                        id="driver"
                        type="text"
                        className="customFormControl"
                        disabled
                        value={driver}
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="m-0 p-10">
                {/* Left Column */}
                <Col xs={6}>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={4} className="p-0">
                      <Form.Label className="customColFormLabel">Unit Number</Form.Label>
                    </Col>
                    <Col xs={6} className="p-0">
                      <input
                        name="unitNumber"
                        id="unitNumber"
                        type="text"
                        className="customFormControl"
                        disabled
                        value={unitNumber}
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={4} className="p-0">
                      <Form.Label className="customColFormLabel">Model</Form.Label>
                    </Col>
                    <Col xs={6} className="p-0">
                      <input
                        name="model"
                        id="model"
                        type="text"
                        className="customFormControl"
                        disabled
                        value={model}
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={4} className="p-0">
                      <Form.Label className="customColFormLabel">Unit Type</Form.Label>
                    </Col>
                    <Col xs={6} className="p-0">
                      <input
                        name="unitType"
                        id="unitType"
                        type="text"
                        className="customFormControl"
                        disabled
                        value={unitType}
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={4} className="p-0">
                      <Form.Label className="customColFormLabel">Special Code</Form.Label>
                    </Col>
                    <Col xs={6} className="p-0">
                      <input
                        name="specialCode"
                        id="specialCode"
                        type="text"
                        className="customFormControl"
                        value={specialCode}
                        disabled
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>
                </Col>

                {/* Right Column */}
                <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                  <Form.Group className="align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Pickup</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input className="customFormControl" type="text" disabled value={pickupAddress} />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label"></Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input className="customFormControl" type="text" disabled value={pickupCity} />
                    </Col>

                    <Col xs={1} md={1} sm={1} className="p-r-0 w-40px">
                      <input type="text" disabled value={pickupState} className="customFormControl" />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-4 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Delivery</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input className="customFormControl" type="text" disabled value={deliveryAddress} />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label"></Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input className="customFormControl" type="text" disabled value={deliveryCity} />
                    </Col>

                    <Col xs={1} md={1} sm={1} className="p-r-0 w-40px">
                      <input type="text" disabled value={deliveryState} className="customFormControl" />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              {/* Email Text Section */}
              <Row className="m-0 p-10">
                <Form.Group className="form-group row m-l-0 m-r-0">
                  <Col xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Email Text</Form.Label>
                  </Col>
                  <Col xs={10} className="p-0">
                    <textarea
                      rows={7}
                      cols={20}
                      className={`customFormControl h-100 customFocusClass ${
                        !emailText?.trim() ? "borderRed" : "borderGreen"
                      }`}
                      value={emailText}
                      onChange={(e) => setEmailText(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Row>

              {loading && (
                <div className="fade modal-backdrop show">
                  <div className="pos-center">
                    <div className="loader"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <ModalComponent
        show={cancelShow}
        onHide={handleCancelNo}
        title={"Cancel Email"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />

      <CommonFooter buttons={footerButtons} />
    </QuarterScreenWrapper>
  );
};

export default UnitPickupExceptionReportMail;
