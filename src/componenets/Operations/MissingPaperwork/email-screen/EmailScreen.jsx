import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import CommonFooter from "../../../common/CommonFooter";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../common/Header";
import ModalComponent from "../../../common/ModalComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MissingPaperworkService from "../../../../services/operations/MissingPaperworkService";
import { resetChanges, setPageNumber } from "../../../../redux/MissingPaperworkSlice";

const EmailScreen = () => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [emailObject, setEmailObject] = useState(null);
  const [emailText, setEmailText] = useState("");
  const [driver, setDriver] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [model, setModel] = useState("");
  const [unitType, setUnitType] = useState("");
  const [specialCode, setSpecialCode] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [pickupState, setPickupState] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryState, setDeliveryState] = useState("");
  const [cancelShow, setCancelShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedDispatchPK = useSelector((state) => state.missingPaperwork.selectedDispatchPK);
  const deliveryDateTo = useSelector((state) => state.missingPaperwork.deliveryDateTo);

  const fetchEmailDetails = () => {
    try {
      setLoading(true);
      MissingPaperworkService.getMissingPaperworkEmailDetails(selectedDispatchPK).then((response) => {
        if (response) {
          setLoading(false);
          const data = response.data;
          setDriver(data[0]?.Driver?.trim() || "");
          setUnitNumber(data[0]?.UnitNumber?.trim() || "");
          setModel(data[0]?.Model?.trim() || "");
          setUnitType(data[0]?.DescriptionShort?.trim() || "");
          setSpecialCode(data[0]?.SpecialCode?.trim() || "");
          setPickupAddress(data[0]?.PickupAddress?.trim() || "");
          setPickupCity(data[0]?.PickupCity?.trim() || "");
          setPickupState(data[0]?.PickupState?.trim() || "");
          setDeliveryAddress(data[0]?.DeliveryAddress?.trim() || "");
          setDeliveryCity(data[0]?.DeliveryCity?.trim() || "");
          setDeliveryState(data[0]?.DeliveryState?.trim() || "");
        }
      });
    } catch (error) {
      setLoading(false);
      console.error("Error fetching email details:", error);
    }
  };

  useEffect(() => {
    if (selectedDispatchPK !== null) {
      fetchEmailDetails();
    }
  }, []);

  useEffect(() => {
    setEmailObject({
      driver: driver,
      unitNumber: unitNumber,
      model: model,
      unitType: unitType,
      specialCode: specialCode,
      pickupAddress: pickupAddress,
      pickupCity: pickupCity,
      pickupState: pickupState,
      deliveryAddress: deliveryAddress,
      deliveryCity: deliveryCity,
      deliveryState: deliveryState,
      emailText: emailText,
      dispatchPK: selectedDispatchPK,
    });
  }, [emailText]);

  const sendMissingPaperworkEmail = () => {
    setLoading(true);
    MissingPaperworkService.sendMissingPaperworkEmail(emailObject)
      .then((response) => {
        setLoading(false);
        toast.success("Sent email successfully");
        setEmailText("");
        navigate(`/missing-paperwork-browse-screen`);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Failed to email outstanding paperwork notes to driver!");
      });
  };

  const footerButtons = [
    { label: "Send", onClick: sendMissingPaperworkEmail, disabled: emailText?.trim().length === 0 },
    { label: "Cancel", onClick: () => handleCancel() },
  ];

  const handleCancel = () => {
    setCancelShow(true);
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    navigate(`/missing-paperwork-browse-screen`);
    toast.success("Changes Cancelled");
  };
  useEffect(() => {
    if (!deliveryDateTo) {
      navigate(`/missing-paperwork-settings-screen`);
    }
  }, []);

  window.addEventListener("popstate", () => {
    dispatch(resetChanges());
    dispatch(setPageNumber(0));
    navigate(`/missing-paperwork-settings-screen`);
  });

  return (
    <QuarterScreenWrapper>
      <Header closeHandler={() => dispatch(resetChanges())} confirmClose programName="Missing Paperwork" />
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              {/* Two Column Layout */}
              <Row className="m-0 p-10">
                {/* Left Column */}
                <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={4} className="p-0">
                      <Form.Label className="customColFormLabel">Driver</Form.Label>
                    </Col>
                    <Col xs={8} className="p-0">
                      <input type="text" disabled value={driver} className="customFormControl" />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={4} className="p-0">
                      <Form.Label className="customColFormLabel">Unit Number</Form.Label>
                    </Col>
                    <Col xs={6} className="p-0">
                      <input type="text" disabled value={unitNumber} className="customFormControl" />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={4} className="p-0">
                      <Form.Label className="customColFormLabel">Model</Form.Label>
                    </Col>
                    <Col xs={6} className="p-0">
                      <input type="text" disabled value={model} className="customFormControl" />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={4} className="p-0">
                      <Form.Label className="customColFormLabel">Unit Type</Form.Label>
                    </Col>
                    <Col xs={6} className="p-0">
                      <input type="text" disabled value={unitType} className="customFormControl" />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={4} className="p-0">
                      <Form.Label className="customColFormLabel">Special Code</Form.Label>
                    </Col>
                    <Col xs={6} className="p-0">
                      <input type="text" disabled value={specialCode} className="customFormControl" />
                    </Col>
                  </Form.Group>
                </Col>

                {/* Right Column */}
                <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Pickup</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input className={`customFormControl`} type="text" disabled value={pickupAddress} />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label"></Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input className={`customFormControl`} type="text" disabled value={pickupCity} />
                    </Col>

                    <Col xs={1} md={1} sm={1} className="p-r-0 w-40px">
                      <input type="text" disabled value={pickupState} className={`customFormControl`} />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Delivery</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input className={`customFormControl`} type="text" disabled value={deliveryAddress} />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label"></Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input className={`customFormControl`} type="text" disabled value={deliveryCity} />
                    </Col>

                    <Col xs={1} md={1} sm={1} className="p-r-0 w-40px">
                      <input type="text" disabled value={deliveryState} className={`customFormControl`} />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>

              {/* Email Text Section - Full Width at Bottom */}
              <Row className="m-0 p-10">
                <Form.Group className="form-group row m-l-0 m-r-0">
                  <Col xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Email Text</Form.Label>
                  </Col>
                  <Col xs={10} className="p-0">
                    <textarea
                      rows={7}
                      cols={20}
                      value={emailText}
                      onChange={(e) => setEmailText(e.target.value)}
                      className={`customFormControl h-100 customFocusClass ${
                        !emailText?.trim() ? "borderRed" : "borderGreen"
                      } `}
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

export default EmailScreen;
