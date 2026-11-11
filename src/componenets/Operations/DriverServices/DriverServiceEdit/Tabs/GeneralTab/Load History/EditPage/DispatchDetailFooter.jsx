import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadHistoryService from "../../../../../../../../services/LoadHistoryService";
import { setDispatchData } from "../../../../../../../../redux/LoadHistorySlice";
import ModalComponent from "../../../../../../../common/ModalComponent";
import { Col, Form } from "react-bootstrap";

const DispatchDetailFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { driverId, dispatchId } = useParams();

  const dispatchData = useSelector((state) => state.loadHistory.dispatchData);

  const [gateCodeHidden, setGateCodeHidden] = useState(false);
  const [showSelection, setShowSelection] = useState(false);
  const [pickupGateCode, setpickupGateCode] = useState(false);
  const [deliveryGateCode, setDeliveryGateCode] = useState(false);

  const getPickupGateCode = () => {
    LoadHistoryService.getGateCode(dispatchId, driverId, "Pickup").then(({ data }) => {
      dispatch(setDispatchData({ ...dispatchData, pickupGateCode: data }));
    });
  };

  const getDeliveryGateCode = () => {
    LoadHistoryService.getGateCode(dispatchId, driverId, "Delivery").then(({ data }) => {
      dispatch(setDispatchData({ ...dispatchData, deliveryGateCode: data }));
    });
  };

  const handleOK = () => {
    if (pickupGateCode) {
      getPickupGateCode();
    } else if (deliveryGateCode) {
      getDeliveryGateCode();
    }
  };

  const pickupOnClick = () => {
    if (dispatchData?.pickupYard) {
      navigate("/pickup-yard/" + driverId + "/" + dispatchId);
    } else {
      navigate("/pickup-dealer/" + driverId + "/" + dispatchId);
    }
  };

  const deliveryOnClick = () => {
    if (dispatchData?.deliveryYard) {
      navigate("/delivery-yard/" + driverId + "/" + dispatchId);
    } else {
      navigate("/delivery-dealer/" + driverId + "/" + dispatchId);
    }
  };

  const onGateCodeClick = () => {
    if (
      dispatchData?.pickupYard &&
      !dispatchData?.pickupGateCode &&
      dispatchData?.pickupHasOpener &&
      dispatchData?.deliveryYard &&
      !dispatchData?.deliveryGateCode &&
      dispatchData?.deliveryHasOpener
    ) {
      setpickupGateCode(false);
      setpickupGateCode(false);
      setShowSelection(true);
    } else if (dispatchData?.pickupYard && !dispatchData?.pickupGateCode && dispatchData?.pickupHasOpener) {
      getPickupGateCode();
    } else if (
      dispatchData?.deliveryYard &&
      !dispatchData?.deliveryGateCode &&
      dispatchData?.deliveryHasOpener
    ) {
      getDeliveryGateCode();
    }
  };

  useEffect(() => {
    if (dispatchData?.pickupYard && !dispatchData?.pickupGateCode && dispatchData?.pickupHasOpener) {
      setGateCodeHidden(false);
    } else if (
      dispatchData?.deliveryYard &&
      !dispatchData?.deliveryGateCode &&
      dispatchData?.deliveryHasOpener
    ) {
      setGateCodeHidden(false);
    } else {
      setGateCodeHidden(true);
    }
  }, [dispatchData]);
  // dispatchData.active

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap m-r-10"></div>

        <div className="d-flex align-items-center flex-wrap">
          <button
            hidden={dispatchData?.pickupPlant}
            onClick={pickupOnClick}
            route={""}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          >
            Pickup
          </button>
          <button
            onClick={deliveryOnClick}
            hidden={dispatchData?.deliveryPlant}
            route={""}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          >
            Delivery
          </button>
          <button
            onClick={() => {
              onGateCodeClick();
            }}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            hidden={gateCodeHidden || !dispatchData?.active}
          >
            Gate Code
          </button>
          <button
            route={""}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={() => {
              /* stepping back keeps the browse page as the only entry behind this one, so the
                 browser back button still leads to the driver form instead of returning here */
              if (window.history.state?.idx > 0) {
                navigate(-1);
              } else {
                navigate("/load-history/" + driverId, { replace: true });
              }
            }}
          >
            Cancel
          </button>
        </div>
        <ModalComponent
          show={showSelection}
          okayButton
          handleOK={() => {
            handleOK();
            setShowSelection(false);
          }}
          onHide={() => {
            setShowSelection(false);
          }}
          body={
            <>
              Select which of the following gatecode to be generated.
              <div className="d-flex">
                {/* Pickup Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={6} md={6} xs={6} style={{ width: "75px" }} className="p-0">
                    Pickup
                  </Col>
                  <Col xs={3} md={3} sm={3} style={{ width: "50px" }} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 mt-2"
                      name="pickup"
                      checked={pickupGateCode}
                      onClick={() => {
                        setDeliveryGateCode(false);
                        setpickupGateCode(!pickupGateCode);
                      }}
                    />
                  </Col>
                </Form.Group>
                {/* Delivery Field*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={6} md={6} xs={6} style={{ width: "75px" }} className="p-0">
                    <Form.Label className="col-form-label dealer-label">{"Delivery"}</Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} style={{ width: "50px" }} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 mt-2"
                      name="delivery"
                      checked={deliveryGateCode}
                      onClick={() => {
                        setDeliveryGateCode(!deliveryGateCode);
                        setpickupGateCode(false);
                      }}
                    />
                  </Col>
                </Form.Group>
              </div>
            </>
          }
          title={"Select Pickup or Delivery"}
        />
      </div>
    </div>
  );
};

export default DispatchDetailFooter;
