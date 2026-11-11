import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import CommonFooter from "../../../../common/CommonFooter";
import Header from "../../../../common/Header";
import DynamicTextFields from "../../../../common/AutoWrapTextFields/DynamicTextFields";
import { useDispatch, useSelector } from "react-redux";
import {
  setCheckPrintFormData,
  setInvoiceTextInputs,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayUnitCheckRequestSlice";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../../common/ModalComponent";
import toast from "react-hot-toast";
import DelayUnitCheckRequestService from "../../../../../services/DispatchDelay/DelayProcessing/DelayUnitCheckRequestService";
import HalfScreenWrapper from "../../../../Templates/Screens/HalfScreenWrapper";

const DelayUnitCheckDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkRequestid, id, driverfk } = useParams();
  const [loader, setLoader] = useState(false);
  const [invoiceTextInputValues, setInvoiceTextInputValues] = useState(Array(14).fill(""));
  const invoiceTextInputs = useSelector((state) => state.delayCheckRequest.invoiceTextInputs);
  const accumulatedBond = useSelector((state) => state.delayCheckRequest.accumulatedBond);
  const driverAmount = useSelector((state) => state.delayCheckRequest.driverAmount);
  const checkPrintFormData = useSelector((state) => state.delayCheckRequest.checkPrintFormData);
  const postalCodePK = useSelector((state) => state.delayCheckRequest.postalCodePK);
  const [cancelShow, setCancelShow] = useState(false);

  /*****
   * edit/paste data passes to back end as array
   *  -  Invoice Text
   * *****/
  useEffect(() => {
    if (invoiceTextInputs?.length !== 0) {
      setInvoiceTextInputValues(invoiceTextInputs);
    }
  }, []);

  useEffect(() => {
    dispatch(setInvoiceTextInputs(invoiceTextInputValues));
  }, [invoiceTextInputValues]);

  /****
   * Creation Print Check Request
   * Object for the Invoice Save
   * ****/
  useEffect(() => {
    dispatch(
      setCheckPrintFormData({
        invoiceTextArray: invoiceTextInputValues,
        accumulatedBond: accumulatedBond,
        invoiceAmount: driverAmount,
        delayedUnitCheckRequestPK: checkRequestid,
        delayedUnitDamageFK: id,
        postalCodePK: postalCodePK,
      })
    );
  }, [invoiceTextInputValues, accumulatedBond, driverAmount, checkRequestid, id, postalCodePK]);

  const onCancel = () => {
    setCancelShow(true);
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    setCancelShow(false);
    navigate(`/delay-unit-check-request-formcontent/${driverfk}/${id}/${checkRequestid}`);
    dispatch(setInvoiceTextInputs([]));
    toast.success("Changes cancelled");
  };

  /******
   * Create Invoice and Email the Invoice to Driver
   * *****/
  const handlePrintCheck = () => {
    setLoader(true);
    DelayUnitCheckRequestService.checkPrintInvoice(checkPrintFormData)
      .then((response) => {
        toast.success("Invoice Created and send to Driver");
        navigate(`/delay-unit-check-request/${driverfk}/${id}`);
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error processing Invoice Creation:", error);
        navigate(`/delay-unit-check-request/${driverfk}/${id}`);
        toast.error("Failed to process Invoice Creation");
        setLoader(false);
      });
    dispatch(setInvoiceTextInputs([]));
  };

  const buttons = [
    {
      label: loader ? (
        <div className="loader-container">
          <div className="loader_YardCheckin"></div>
        </div>
      ) : (
        "Print"
      ),
      onClick: handlePrintCheck,
    },
    {
      label: "Cancel",
      onClick: () => onCancel(),
    },
  ];

  return (
    <HalfScreenWrapper>
      <Header
        programName="Delay Print Check"
        confirmClose
        closeModalTitle="Close Delay Print Check"
        closeModalBody="Please confirm you want to close the program without saving your changes"
        closeConfirmationHandler={() => {
          dispatch(setInvoiceTextInputs([]));
        }}
        closeNavigationURL={`/delay-unit-check-request-formcontent/${driverfk}/${id}/${checkRequestid}`}
      />
      {/* Form Content */}
      <div className="w-100 p-2">
        {loader && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
        <div className="shadow-sm rounded border halfScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="mt-0 mx-3">
                <Col xs={12}>
                  <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0">
                    <Col xs={2} md={2} sm={2} className="p-0">
                      <Form.Label className="col-form-label dealer-label"> Invoice Amount</Form.Label>
                    </Col>
                    <Col xs={2} md={2} sm={2} className="p-0 w-75px">
                      <input
                        type="text"
                        name="invoiceAmount"
                        id="invoiceAmount"
                        className="customFormControl"
                        maxLength={10}
                        autoComplete="new-password"
                        aria-autocomplete="list"
                        disabled
                        value={driverAmount}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0">
                    <Col xs={2} md={2} sm={2} className="p-0">
                      <Form.Label className="col-form-label dealer-label"> Accumulated Bond</Form.Label>
                    </Col>
                    <Col xs={2} md={2} sm={2} className="p-0 w-75px">
                      <input
                        type="text"
                        name="accumulatedBond"
                        id="accumulatedBond"
                        className="customFormControl"
                        maxLength={10}
                        autoComplete="new-password"
                        aria-autocomplete="list"
                        disabled
                        value={accumulatedBond}
                      />{" "}
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-1 align-items row  m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Invoice Text</Form.Label>
                    </Col>
                    <Col xs={10} sm={10} md={10} className="p-0 ">
                      <Col xs={10}>
                        <DynamicTextFields
                          numFields={14}
                          maxCharLimit={80}
                          maxLimit={80}
                          inputValues={invoiceTextInputValues}
                          setInputValues={setInvoiceTextInputValues}
                          invoice
                          disabledFields={[0]}
                          hideDisabledFields={true}
                        />
                      </Col>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <CommonFooter buttons={buttons} />
      {/* edit Cancel Confirmation Modal */}
      <ModalComponent
        show={cancelShow}
        onHide={handleCancelNo}
        title={"Cancel Delay Print Check"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
    </HalfScreenWrapper>
  );
};

export default DelayUnitCheckDetail;
