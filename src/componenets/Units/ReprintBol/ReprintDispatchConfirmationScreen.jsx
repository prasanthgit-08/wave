import React, { useEffect, useState } from "react";

import { Col, Form, Row } from "react-bootstrap";
import Header from "../../common/Header";
import CommonFooter from "../../common/CommonFooter";
import DateInputField from "../../common/DateInputField";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReprintBolService from "../../../services/ReprintBolService";
import {
  resetDispatchSelectionFilters,
  resetOutputconfirmationScreen,
  setBolFor,
  setDispatchConfirmationData,
  setDispatchId,
  setDriverId,
  setEmail,
  setListingData,
  setRePrintBOL,
  setSelectedId,
} from "../../../redux/ReprintBolSlice";
import LoadingIcon from "../../common/LoadingIcon";

function ReprintDispatchConfirmationScreen() {
  const { dispId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dispatchConfirmationData = useSelector((state) => state.reprintBolReducer.dispatchConfirmationData);

  const dispatchId = useSelector((state) => state.reprintBolReducer.dispatchId);
  const driverId = useSelector((state) => state.reprintBolReducer.driverId);

  const [loader, setLoader] = useState(false);
  const nextEnabled = useSelector((state) => state.reprintBolReducer.nextEnabled);
  const rePrintBOL = useSelector((state) => state.reprintBolReducer.rePrintBOL);

  useEffect(() => {
    if (dispId) {
      setLoader(true);
      dispatch(setDispatchConfirmationData(null));
      ReprintBolService.fetchDispatchForConfirmation(dispId)
        .then((response) => {
          const { data } = response;
          const dispatchData = data[0];

          dispatch(setDispatchConfirmationData(dispatchData));
          dispatch(setDispatchId(dispId));
        })
        .finally(() => {
          setLoader(false);
        });
    }
  }, [dispId]);

  useEffect(() => {
    if (!rePrintBOL) {
      navigate("/reprint-selection-screen");
    }
  }, [rePrintBOL]);

  const buttons = [
    {
      label: "Next",
      onClick: () => navigate("/reprint-output-selection-screen"),
      disabled: false,
    },

    {
      label: "Back",
      onClick: () => {
        if (driverId && nextEnabled === 1) {
          navigate("/reprint-driver-selection");
        } else if (driverId && nextEnabled === 2) {
          navigate("/reprint-dispatch-selection-screen");
        } else if (!driverId) {
          navigate("/reprint-dispatch-selection-screen");
        }
      },
    },

    {
      label: "Cancel",
      onClick: () => {
        dispatch(setRePrintBOL(false));
        dispatch(setBolFor("driver"));
        dispatch(setEmail(""));
        dispatch(resetOutputconfirmationScreen());
        dispatch(setDispatchConfirmationData(null));
        dispatch(setSelectedId(null));
        dispatch(setListingData([]));
        dispatch(resetDispatchSelectionFilters());
        dispatch(setDriverId(null));
        dispatch(setDispatchId(null));
        dispatch(setSelectedId(null));
        navigate(`/reprint-selection-screen`);
      },
    },
  ];

  return (
    <div className="add-form-component p-0 customContainer">
      {loader && <LoadingIcon />}
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <Header />
        <div className="p-2">
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="">
              <div className="p-15 w-100">
                <Row className="m-0">
                  <Col xs={6}>
                    <Form.Group className={`mt-1  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          Driver
                        </Form.Label>
                      </Col>

                      <Col xs={8} md={8} className="p-0 me-2  ms-4 mt-2">
                        <input
                          name="canadianCrossing"
                          type="text"
                          value={dispatchConfirmationData?.DriverName || ""}
                          disabled
                          className="customFormControl"
                          maxLength={30}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className={`mt-1  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          Unit Number
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4">
                        <input
                          name="canadianCrossing"
                          type="text"
                          value={dispatchConfirmationData?.UnitNumber || ""}
                          disabled
                          maxLength={30}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className={`mt-1  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          Model
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4">
                        <input
                          name="canadianCrossing"
                          type="text"
                          value={dispatchConfirmationData?.Model || ""}
                          disabled
                          maxLength={30}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className={`mt-1  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 ">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          VIN
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 ">
                        <input
                          name="canadianCrossing"
                          type="text"
                          value={dispatchConfirmationData?.VIN || ""}
                          disabled
                          maxLength={30}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className={`mt-1  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          Unit Type
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4">
                        <input
                          name="canadianCrossing"
                          type="text"
                          value={dispatchConfirmationData?.UnitType || ""}
                          disabled
                          maxLength={30}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className={`mt-1  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 ">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          Special Code
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 ">
                        <input
                          name="canadianCrossing"
                          type="text"
                          value={dispatchConfirmationData?.SpecialCode || ""}
                          disabled
                          maxLength={30}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                    </Form.Group>

                    {/* Empty Tag for Styling */}
                    <Form.Group className={`mt-1  align-items-center row  m-l-0 m-r-0 invisible`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 ">
                        <Form.Label htmlFor="name" className="customColFormLabel"></Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 ">
                        <input
                          name="canadianCrossing"
                          type="text"
                          value={dispatchConfirmationData?.UnitType || ""}
                          disabled
                          maxLength={30}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className={`mt-2  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          Dispatch Date
                        </Form.Label>
                      </Col>

                      <Col xs={2} style={{ width: "80px" }} className="p-0 me-2  ms-4 mt-2">
                        <DateInputField
                          date={dispatchConfirmationData?.DispatchDate || ""}
                          name="orderDate"
                          className="customFormControl"
                          disabled
                        />{" "}
                      </Col>
                    </Form.Group>

                    <Form.Group className={`mt-1  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          Estimated Pickup
                        </Form.Label>
                      </Col>

                      <Col xs={2} style={{ width: "80px" }} className="p-0 me-2  ms-4 mt-2">
                        <DateInputField
                          date={dispatchConfirmationData?.EstimatedPickupDate || ""}
                          name="orderDate"
                          className="customFormControl"
                          disabled
                        />{" "}
                      </Col>
                    </Form.Group>

                    <Form.Group className={`mt-1  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          Date Picked Up
                        </Form.Label>
                      </Col>

                      <Col xs={2} style={{ width: "80px" }} className="p-0 me-2  ms-4 mt-2">
                        <DateInputField
                          date={dispatchConfirmationData?.PickupDate || ""}
                          name="orderDate"
                          className="customFormControl"
                          disabled
                        />{" "}
                      </Col>
                    </Form.Group>

                    <Form.Group className={`mt-1  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          Estimated Delivery
                        </Form.Label>
                      </Col>

                      <Col xs={2} style={{ width: "80px" }} className="p-0 me-2  ms-4 mt-2">
                        <DateInputField
                          date={dispatchConfirmationData?.EstimatedDeliveryDate || ""}
                          name="orderDate"
                          className="customFormControl"
                          disabled
                        />{" "}
                      </Col>
                    </Form.Group>

                    <Form.Group className={`mt-1 align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          Date Delivered
                        </Form.Label>
                      </Col>

                      <Col xs={2} style={{ width: "80px" }} className="p-0 me-2  ms-4 mt-2">
                        <DateInputField
                          date={dispatchConfirmationData?.DeliveredDate || ""}
                          name="orderDate"
                          className="customFormControl"

                          disabled
                        />{" "}
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className={`mt-2  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          Customer
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 mt-2">
                        <input
                          name="canadianCrossing"
                          type="text"
                          value={dispatchConfirmationData?.CustomerName || ""}
                          disabled
                          maxLength={30}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className={`mt-2  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          {/* US City , State */}
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 mt-2">
                        <input
                          id="usCity"
                          data-id="2"
                          name="usCity"
                          type="text"
                          value={dispatchConfirmationData?.CustomerStateCode || ""}
                          disabled
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                      <div className="p-0  mt-2" style={{ width: "41px" }}>
                        <input
                          id="usCity"
                          name="stateCode"
                          type="text"
                          value={dispatchConfirmationData?.CustomerPostalCode || ""}
                          disabled
                          maxLength={3}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </div>
                    </Form.Group>
                    {/* Empty Tag for styling */}
                    <Form.Group className={`mt-2  align-items-center row  m-l-0 m-r-0 invisible`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel"></Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 mt-2">
                        <input
                          name="canadianCrossing"
                          type="text"
                          maxLength={30}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className={`mt-2  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          Pickup
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 mt-2">
                        <input
                          name="canadianCrossing"
                          type="text"
                          value={dispatchConfirmationData?.PickupName || ""}
                          disabled
                          maxLength={30}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className={`mt-2  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          {/* US City , State */}
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 mt-2">
                        <input
                          id="usCity"
                          data-id="2"
                          name="usCity"
                          type="text"
                          value={dispatchConfirmationData?.PickupState || ""}
                          disabled
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                      <div className="p-0  mt-2" style={{ width: "41px" }}>
                        <input
                          id="usCity"
                          name="stateCode"
                          type="text"
                          value={dispatchConfirmationData?.PickupPostalCode || ""}
                          disabled
                          maxLength={2}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </div>
                    </Form.Group>
                    {/* Empty Tag for styling */}
                    <Form.Group className={`mt-2  align-items-center row  m-l-0 m-r-0 invisible`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel"></Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 mt-2">
                        <input
                          name="canadianCrossing"
                          type="text"
                          maxLength={30}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className={`mt-2  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          Delivery
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 mt-2">
                        <input
                          name="canadianCrossing"
                          type="text"
                          value={dispatchConfirmationData?.DeliveryName || ""}
                          disabled
                          maxLength={30}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className={`mt-2  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          {/* US City , State */}
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 mt-2">
                        <input
                          id="usCity"
                          data-id="2"
                          name="usCity"
                          type="text"
                          value={dispatchConfirmationData?.DeliveryState || ""}
                          disabled
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                      <div className="p-0  mt-2" style={{ width: "41px" }}>
                        <input
                          id="usCity"
                          name="stateCode"
                          type="text"
                          value={dispatchConfirmationData?.DeliveryPostalCode || ""}
                          disabled
                          maxLength={2}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </div>
                    </Form.Group>
                    {/* Empty Tag for styling */}
                    <Form.Group className={`mt-2  align-items-center row  m-l-0 m-r-0 invisible`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel"></Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 mt-2">
                        <input
                          name="canadianCrossing"
                          type="text"
                          maxLength={30}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <CommonFooter buttons={buttons} />
      </div>
    </div>
  );
}

export default ReprintDispatchConfirmationScreen;
