import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../common/Header";
import CommonFooter from "../../../common/CommonFooter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";
import toast from "react-hot-toast";
import {
  clearAdvancedSearch,
  resetDelayUnitSelectionFilters,
  resetUnitSelectionFilters,
  setSelectedItem,
} from "../../../../redux/EmanifestChangeRequestSlice";

const DispatchConfirmationScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);

  const selectedItem = useSelector((state) => state.emanifestChangeRequest.selectedItem);
  const footerButtons = [
    { label: "Next", onClick: () => navigate(`/e-manifest-change-request-reason-screen`), disabled: false },
    {
      label: "Cancel",
      onClick: () => {
        handleCancelYes();
      },
    },
  ];

  const handleCancel = () => {
    setCancelShow(true);
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    setCancelShow(false);
    navigate(`/e-manifest-browse-screen`);
    toast.success("Changes Cancelled");
  };

  const clearFields = () => {
    dispatch(clearAdvancedSearch());
    dispatch(resetUnitSelectionFilters());
    dispatch(resetDelayUnitSelectionFilters());
    dispatch(setSelectedItem(null));
  };

  useEffect(() => {
    if (!selectedItem) {
      navigate(`/e-manifest-browse-screen`);
    }
  }, []);

  window.addEventListener("popstate", () => {
    navigate(`/e-manifest-browse-screen`);
  });

  return (
    <QuarterScreenWrapper>
      <Header
        closeHandler={() => {
          clearFields();
        }}
      />
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                {/* Left Column */}
                <Col xs={6}>
                  <div style={{ marginTop: "15px" }}>
                    <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                      <Col xs={4} className="p-0">
                        <Form.Label className="customColFormLabel">Driver</Form.Label>
                      </Col>
                      <Col xs={8} className="p-0">
                        <input
                          type="text"
                          className="customFormControl"
                          value={selectedItem?.Driver ? selectedItem?.Driver : ""}
                          disabled
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className="form-group align-items-center row m-l-0 m-r-0 mb-3"
                      style={{ marginTop: "2rem" }}
                    >
                      <Col xs={4} className="p-0">
                        <Form.Label className="customColFormLabel">Unit Number</Form.Label>
                      </Col>
                      <Col xs={6} className="p-0">
                        <input
                          type="text"
                          className="customFormControl"
                          value={selectedItem?.UnitNumber ? selectedItem?.UnitNumber : ""}
                          disabled
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                      <Col xs={4} className="p-0">
                        <Form.Label className="customColFormLabel">Model</Form.Label>
                      </Col>
                      <Col xs={6} className="p-0">
                        <input
                          type="text"
                          className="customFormControl"
                          value={selectedItem?.Model ? selectedItem?.Model : ""}
                          disabled
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                      <Col xs={4} className="p-0">
                        <Form.Label className="customColFormLabel">VIN</Form.Label>
                      </Col>
                      <Col xs={6} className="p-0">
                        <input
                          type="text"
                          className="customFormControl"
                          value={selectedItem?.VIN ? selectedItem?.VIN : ""}
                          disabled
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                      <Col xs={4} className="p-0">
                        <Form.Label className="customColFormLabel">Unit Type</Form.Label>
                      </Col>
                      <Col xs={6} className="p-0">
                        <input
                          type="text"
                          className="customFormControl"
                          value={selectedItem?.UnitType ? selectedItem?.UnitType : ""}
                          disabled
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                      <Col xs={4} className="p-0">
                        <Form.Label className="customColFormLabel">Special Code</Form.Label>
                      </Col>
                      <Col xs={6} className="p-0">
                        <input
                          type="text"
                          className="customFormControl"
                          value={selectedItem?.SpecialCode ? selectedItem?.SpecialCode : ""}
                          disabled
                        />
                      </Col>
                    </Form.Group>
                  </div>
                </Col>

                {/* Right Column */}
                <Col xs={6}>
                  <div style={{ marginTop: "15px" }}>
                    <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                      <Col xs={4} className="p-0">
                        <Form.Label className="customColFormLabel">Customer</Form.Label>
                      </Col>
                      <Col xs={8} className="p-0">
                        <Row>
                          <Col xs={9} className="pe-1">
                            <input
                              type="text"
                              className="customFormControl"
                              value={selectedItem?.Customer ? selectedItem?.Customer : ""}
                              disabled
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Form.Group>

                    <Form.Group className="form-group row m-l-0 m-r-0 mb-3" style={{ marginTop: "2rem" }}>
                      <Col xs={4} className="p-0">
                        <Form.Label className="customColFormLabel">Pickup</Form.Label>
                      </Col>
                      <Col xs={8} className="p-0">
                        <Row>
                          <Col xs={9} className="pe-1">
                            <input
                              type="text"
                              className="customFormControl"
                              value={selectedItem?.PickupName ? selectedItem?.PickupName : ""}
                              disabled
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Form.Group>
                    <Form.Group className="form-group row m-l-0 m-r-0 mb-3">
                      <Col xs={4} className="p-0">
                        <Form.Label className="customColFormLabel"></Form.Label>
                      </Col>
                      <Col xs={8} className="p-0">
                        <Row>
                          <Col xs={9} className="pe-1">
                            <input
                              type="text"
                              className="customFormControl"
                              value={selectedItem?.PickupCity ? selectedItem?.PickupCity : ""}
                              disabled
                            />
                          </Col>
                          <Col xs={3} className="ps-1">
                            <input
                              type="text"
                              className="customFormControl"
                              value={selectedItem?.PickupState ? selectedItem?.PickupState : ""}
                              disabled
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Form.Group>

                    <Form.Group className="form-group row m-l-0 m-r-0 mb-3">
                      <Col xs={4} className="p-0">
                        <Form.Label className="customColFormLabel">Port Of Entry</Form.Label>
                      </Col>
                      <Col xs={8} className="p-0">
                        <Row>
                          <Col xs={9} className="pe-1">
                            <input
                              type="text"
                              className="customFormControl"
                              value={selectedItem?.CanadianCrossing ? selectedItem?.CanadianCrossing : ""}
                              disabled
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Form.Group>
                    <Form.Group className="form-group row m-l-0 m-r-0 mb-3">
                      <Col xs={4} className="p-0">
                        <Form.Label className="customColFormLabel"></Form.Label>
                      </Col>
                      <Col xs={8} className="p-0">
                        <Row>
                          <Col xs={9} className="pe-1">
                            <input
                              type="text"
                              className="customFormControl"
                              value={selectedItem?.PortOfEntryCity ? selectedItem?.PortOfEntryCity : ""}
                              disabled
                            />
                          </Col>
                          <Col xs={3} className="ps-1">
                            <input
                              type="text"
                              className="customFormControl"
                              value={
                                selectedItem?.PortOfEntryStateCode ? selectedItem?.PortOfEntryStateCode : ""
                              }
                              disabled
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Form.Group>

                    <Form.Group className="form-group row m-l-0 m-r-0 mb-3">
                      <Col xs={4} className="p-0">
                        <Form.Label className="customColFormLabel">Delivery</Form.Label>
                      </Col>
                      <Col xs={8} className="p-0">
                        <Row>
                          <Col xs={9} className="pe-1">
                            <input
                              type="text"
                              className="customFormControl"
                              value={selectedItem?.DeliveryName ? selectedItem?.DeliveryName : ""}
                              disabled
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Form.Group>
                    <Form.Group className="form-group row m-l-0 m-r-0 mb-3">
                      <Col xs={4} className="p-0">
                        <Form.Label className="customColFormLabel"></Form.Label>
                      </Col>
                      <Col xs={8} className="p-0">
                        <Row>
                          <Col xs={9} className="pe-1">
                            <input
                              type="text"
                              className="customFormControl"
                              value={selectedItem?.DeliveryCity ? selectedItem?.DeliveryCity : ""}
                              disabled
                            />
                          </Col>
                          <Col xs={3} className="ps-1">
                            <input
                              type="text"
                              className="customFormControl"
                              value={selectedItem?.DeliveryState ? selectedItem?.DeliveryState : ""}
                              disabled
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Form.Group>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <ModalComponent
            show={cancelShow}
            onHide={handleCancelNo}
            title={"Cancel Changes"}
            body={"Please confirm you want to cancel  changes"}
            handleYES={handleCancelYes}
            handleNO={handleCancelNo}
          />
        </div>
      </div>
      <CommonFooter buttons={footerButtons} />
    </QuarterScreenWrapper>
  );
};

export default DispatchConfirmationScreen;
