import React, { useEffect, useState } from "react";
// import Header from "./Header";
import { Col, Form, Row } from "react-bootstrap";
import Header from "../../common/Header";
import CommonFooter from "../../common/CommonFooter";
import DateInputField from "../../common/DateInputField";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReprintBolService from "../../../services/ReprintBolService";
import {
  resetOutputconfirmationScreen,
  setBolFor,
  setDispatchId,
  setDriverId,
  setPrintBOLOutputData,
  setPrintYardFlag,
  setRePrintBOL,
  setUnitConfirmationData,
  setUnitFK,
} from "../../../redux/ReprintBolSlice";
import { setSelectedId, resetUnitSelectionFilters } from "../../../redux/UnitStatus/UnitStatusSlice";

function ReprintUnitConfirmationScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const rePrintBOL = useSelector((state) => state.reprintBolReducer.rePrintBOL);
  const unitConfirmationData = useSelector((state) => state.reprintBolReducer.unitConfirmationData);
  const unitFK = useSelector((state) => state.reprintBolReducer.unitFK);
  const printYardFlag = useSelector((state) => state.reprintBolReducer.printYardFlag);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const driverId = useSelector((state) => state.reprintBolReducer.driverId);

  const buttons = [
    { label: "Next", onClick: () => handleNext(), disabled: false },
    { label: "Back", onClick: () => handleBack() },
    { label: "Cancel", onClick: () => handleCancel() },
  ];

  /*****
   * Get the Unit Confirmation Screen
   *****/
  useEffect(() => {
    if (id) {
      setLoader(true);
      ReprintBolService.fetchUnitForConfirmation(id)
        .then((response) => {
          const { data } = response;
          const unitData = data[0];
          dispatch(setUnitConfirmationData(unitData));
          dispatch(setUnitFK(unitData?.UnitPK));
          dispatch(setPrintYardFlag(unitData?.YardPrintFlag));
          setLoader(false);
        })
        .catch((err) => {
          navigate(`/reprint-selection-screen`);
          setLoader(false);
        });
    }
  }, [id]);

  /*******
   * Used to solve the issue related to solve the issue related
   *  to close and back button click
   * **** */
  window.addEventListener("popstate", () => {
    navigate(`/reprint-selection-screen`);
  });

  /******
   * Set the Delivery Date if the date is null
   * *****/
  useEffect(() => {
    if (unitConfirmationData?.DeliveryDate !== "null") {
      setDeliveryDate(unitConfirmationData?.DeliveryDate);
    } else {
      setDeliveryDate("");
    }
  }, [unitConfirmationData]);

  /******
   * Set the Invoice Date if the date is null
   * *****/
  useEffect(() => {
    if (unitConfirmationData?.InvoiceDate !== "null") {
      setInvoiceDate(unitConfirmationData?.InvoiceDate);
    } else {
      setInvoiceDate("");
    }
  }, [unitConfirmationData]);

  /***
   * Used to navigate to rePrintBOL
   * selection screen if it is navigated from the Reprint program
   ****/
  useEffect(() => {
    if (!rePrintBOL) {
      navigate("/reprint-selection-screen");
    }
  }, [rePrintBOL]);

  /*****
   * Handle the cancel
   * button functionality
   ******/
  const handleCancel = () => {
    dispatch(setRePrintBOL(false));
    dispatch(setBolFor("driver"));
    dispatch(setUnitConfirmationData(null));
    dispatch(setUnitFK(null));
    dispatch(setDriverId(null));
    dispatch(setPrintYardFlag(false));
    dispatch(setPrintBOLOutputData(null));
    dispatch(setDispatchId(null));
    dispatch(setSelectedId(null));
    dispatch(resetUnitSelectionFilters());
    dispatch(resetOutputconfirmationScreen());
    navigate(`/reprint-selection-screen`);
  };

  /*****
   * Handle the cancel
   * button functionality
   ******/
  const handleBack = () => {
    navigate(`/unit-status-selection-reprint`);
  };

  /*****
   * Handle the Next
   * button functionality
   ******/
  const handleNext = () => {
    navigate(`/reprint-output-selection-screen`);
  };
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <Header
          closeHandler={() => {
            localStorage.removeItem("rePrint");
            dispatch(setRePrintBOL(false));
            dispatch(setBolFor("driver"));
            dispatch(setUnitConfirmationData(null));
            dispatch(setUnitFK(null));
            dispatch(setDriverId(null));
            dispatch(setPrintYardFlag(false));
            dispatch(setPrintBOLOutputData(null));
            dispatch(setDispatchId(null));
            dispatch(resetOutputconfirmationScreen());
          }}
        />
        <div className="p-2">
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            {loader && (
              <div className="fade modal-backdrop show">
                <div className="pos-center">
                  <div className="loader"></div>
                </div>
              </div>
            )}
            <div className="">
              <div className="p-15 w-100">
                <Row className="m-0">
                  <Col xs={6}>
                    <Form.Group className={`mt-2  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          Unit Number
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 mt-2">
                        <input
                          name="unitNumber"
                          type="text"
                          value={unitConfirmationData?.UnitNumber}
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
                          Model
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 mt-2">
                        <input
                          name="model"
                          type="text"
                          value={unitConfirmationData?.Model}
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
                          VIN
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 mt-2">
                        <input
                          name="canadianCrossing"
                          type="text"
                          value={unitConfirmationData?.VIN}
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
                          Unit Type
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 mt-2">
                        <input
                          name="canadianCrossing"
                          type="text"
                          value={unitConfirmationData?.UnitType}
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
                          Special Code
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 mt-2">
                        <input
                          name="canadianCrossing"
                          type="text"
                          value={unitConfirmationData?.SpecialCode}
                          disabled
                          maxLength={30}
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
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
                          Order Date
                        </Form.Label>
                      </Col>

                      <Col xs={2} style={{ width: "80px" }} className="p-0 me-2  ms-4 mt-2">
                        <DateInputField
                          date={loader ? "" : unitConfirmationData?.OrderDate || ""}
                          name="orderDate"
                          className="customFormControl"
                          setDate={loader ? "" : unitConfirmationData?.OrderDate}
                          disabled
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className={`mt-2  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          Date Delivered
                        </Form.Label>
                      </Col>

                      <Col xs={2} style={{ width: "80px" }} className="p-0 me-2  ms-4 mt-2">
                        <DateInputField
                          date={loader ? "" : deliveryDate}
                          className="customFormControl"
                          setDate={loader ? "" : setDeliveryDate}
                          disabled
                        />{" "}
                      </Col>
                    </Form.Group>
                    <Form.Group className={`mt-2  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={3} md={3} xs={3} className="p-0  ms-0 mt-2">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          Date Invoiced
                        </Form.Label>
                      </Col>

                      <Col xs={2} style={{ width: "80px" }} className="p-0 me-2  ms-4 mt-2">
                        <DateInputField
                          date={loader ? "" : invoiceDate}
                          className="customFormControl"
                          setDate={loader ? "" : setInvoiceDate}
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
                          value={unitConfirmationData?.CustomerName}
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
                          value={unitConfirmationData?.CustomerCity?.trim() || ""}
                          disabled
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                      <div className="p-0  mt-2" style={{ width: "40px" }}>
                        <input
                          id="usCity"
                          name="stateCode"
                          type="text"
                          value={unitConfirmationData?.CustomerStateCode}
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
                          Pickup
                        </Form.Label>
                      </Col>

                      <Col xs={7} md={7} className="p-0 me-2  ms-4 mt-2">
                        <input
                          name="canadianCrossing"
                          type="text"
                          value={unitConfirmationData?.PickupName?.trim()}
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
                          value={unitConfirmationData?.PickupCity?.trim()}
                          disabled
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                      <div className="p-0  mt-2" style={{ width: "40px" }}>
                        <input
                          id="usCity"
                          name="stateCode"
                          type="text"
                          value={unitConfirmationData?.PickupState?.trim()}
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
                          value={unitConfirmationData?.DeliveryName?.trim()}
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
                          value={unitConfirmationData?.DeliveryCity}
                          disabled
                          autoComplete="newpassword"
                          aria-autocomplete="none"
                          className={`customFormControl`}
                        />
                      </Col>
                      <div className="p-0  mt-2" style={{ width: "40px" }}>
                        <input
                          id="usCity"
                          name="stateCode"
                          type="text"
                          value={unitConfirmationData?.DeliveryState}
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

export default ReprintUnitConfirmationScreen;
