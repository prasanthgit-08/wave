import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CommonFooter from "../../common/CommonFooter";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emailRegex } from "../../../utils/validation/EmailRegex";
import * as yup from "yup";
import { Formik } from "formik";
import ReprintBolService from "../../../services/ReprintBolService";
import {
  resetDispatchSelectionFilters,
  resetOutputconfirmationScreen,
  setActive,
  setActiveString,
  setBolFor,
  setDeleased,
  setDispatchId,
  setDriverId,
  setEmail,
  setEmailToCustomer,
  setEmailToDealer,
  setEmailToDriver,
  setEmailToPlant,
  setEmailToUser,
  setFirstName,
  setLastName,
  setPageNumber,
  setPrint,
  setPrintAtYard,
  setPrintBOLOutputData,
  setPrintYardFlag,
  setRePrintBOL,
  setSearchCriteria,
  setSortType,
  setUnitConfirmationData,
  setUnitFK,
} from "../../../redux/ReprintBolSlice";
import PreviewPopup from "../../common/PreviewPopup";
import toast from "react-hot-toast";
import { setSelectedId, resetUnitSelectionFilters } from "../../../redux/UnitStatus/UnitStatusSlice";
import ModalComponent from "../../common/ModalComponent";
import Header from "../../common/Header";

const ReprintOutputSelectionScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [miscellaneousCustomerFlag, setMiscellaneousCustomerFlag] = useState(false);
  const [emailCustomerFlag, setEmailCustomerFlag] = useState(false);
  const [emailPlantFlag, setEmailPlantFlag] = useState(false);
  const [emailDealerFlag, setEmailDealerFlag] = useState(false);

  const [disableProcess, setDisableProcess] = useState(true);
  const [showPreview, setshowPreview] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const rePrintBOL = useSelector((state) => state.reprintBolReducer.rePrintBOL);
  const bolFor = useSelector((state) => state.reprintBolReducer.bolFor);
  const driverDispatchName = useSelector((state) => state.reprintBolReducer.driverDispatchName);
  const unitFK = useSelector((state) => state.reprintBolReducer.unitFK);
  const unitConfirmationData = useSelector((state) => state.reprintBolReducer.unitConfirmationData);
  const printYardFlag = useSelector((state) => state.reprintBolReducer.printYardFlag);
  const dispatchId = useSelector((state) => state.reprintBolReducer.dispatchId);
  const printBOLOutputData = useSelector((state) => state.reprintBolReducer.printBOLOutputData);
  const email = useSelector((state) => state.reprintBolReducer.email);
  const printAtYard = useSelector((state) => state.reprintBolReducer.printAtYard);
  const print = useSelector((state) => state.reprintBolReducer.print);
  const emailToCustomer = useSelector((state) => state.reprintBolReducer.emailToCustomer);
  const emailToPlant = useSelector((state) => state.reprintBolReducer.emailToPlant);
  const emailToDealer = useSelector((state) => state.reprintBolReducer.emailToDealer);
  const emailToUser = useSelector((state) => state.reprintBolReducer.emailToUser);
  const emailToDriver = useSelector((state) => state.reprintBolReducer.emailToDriver);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;
  const [cancelShow, setCancelShow] = useState(false);

  const hasDriverName =
    driverDispatchName !== null && driverDispatchName !== undefined && driverDispatchName?.trim() !== "";

  /**************
   * Cancel Popup Handlers
   **************/
  const handleCancel = () => {
    if (rePrintBOL) {
      setCancelShow(true);
    } else {
      navigate(`/reprint-selection-screen`);
    }
  };

  const handleCancelNo = () => {
    setCancelShow(false);
  };

  useEffect(() => {
    if (!rePrintBOL) {
      navigate("/reprint-selection-screen");
    }
  }, [rePrintBOL]);

  const handleCancelYes = () => {
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
    setCancelShow(false);
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setActiveString("All"));
    dispatch(setActive(null));
    dispatch(setDeleased(null));
    dispatch(setFirstName(""));
    dispatch(setLastName(""));
    dispatch(setDriverId(null));
    dispatch(setSortType(null));
    dispatch(setPageNumber(0));
    dispatch(resetDispatchSelectionFilters());
    dispatch(setDispatchId(null));

    navigate(`/reprint-selection-screen`);
  };

  const buttons = [
    { label: "Process", onClick: () => handleProcess(), disabled: disableProcess },
    { label: "Back", onClick: () => handleBack() },
    { label: "Cancel", onClick: () => handleCancel() },
  ];

  const isEmail =
    (email && email?.trim() !== "") ||
    emailToCustomer ||
    emailToPlant ||
    emailToDealer ||
    emailToUser ||
    emailToDriver;

  const dispatchEmailObjectKey = "HRZ:DISP:NWBOL";
  const unitEmailObjectKey = "HRZ:ORD:NWBOL";
  const dispatchPrintObjectKey = "HRZ:DISP:NWBOL";
  const unitPrintObjectKey = "HRZ:ORD:NWBOL";
  const shuttleEmailObjectKey = "HRZ:SHT:NWBOL";

  /*****
   * Handle the back
   * button functionality
   ******/
  const handleBack = () => {
    if (bolFor === "shuttle" || bolFor === "Units") navigate(`/reprint-unit-confirmation-screen/${unitFK}`);
    if (bolFor === "driver" || bolFor === "Dispatches")
      navigate(`/reprint-dispatch-confirmation-screen/${dispatchId}`);
  };

  /*****
   * Get the BOL Flags to
   * enable/disable the checkboxes
   *****/
  useEffect(() => {
    if (unitFK) {
      setLoader(true);
      ReprintBolService.fetchBOLForUnits(unitFK)
        .then((response) => {
          const { data } = response;
          const unitData = data[0];
          setMiscellaneousCustomerFlag(
            unitData?.MiscellaneousCustomerFlag ? unitData?.MiscellaneousCustomerFlag : false
          );
          setEmailCustomerFlag(unitData?.EmailCustomerFlag ? unitData?.EmailCustomerFlag : false);
          setEmailPlantFlag(unitData?.EmailPlantFlag ? unitData?.EmailCustomerFlag : false);
          setEmailDealerFlag(unitData?.EmailDealerFlag ? unitData?.EmailDealerFlag : false);
          setLoader(false);
        })
        .catch((err) => {
          navigate(`/reprint-selection-screen`);
          setLoader(false);
        });
    }
  }, [unitFK]);

  /******
   * Enable or disable
   * the process button based on the Input
   ******/
  const isEmailEntered = !!email;
  const isEmailValid = !email || email.match(emailRegex); // true when email is empty OR valid

  const isAnyOptionSelected =
    printAtYard || print || emailToCustomer || emailToPlant || emailToDealer || emailToUser || emailToDriver;

  useEffect(() => {
    if (isEmailValid && (isEmailEntered || isAnyOptionSelected)) {
      setDisableProcess(false);
    } else {
      setDisableProcess(true);
    }
  }, [isEmailValid, isAnyOptionSelected, isEmailEntered]);

  /*******
   * Set the data for processing
   ******/
  useEffect(() => {
    dispatch(
      setPrintBOLOutputData({
        manualEmail: email,
        isYardPrint: printAtYard,
        isPrint: print,
        emailToCustomer: emailToCustomer,
        emailTocustomerPlant: emailToPlant,
        emailToDealer: emailToDealer,
        emailToUser: emailToUser,
        emailToDriver: emailToDriver,
        miscellaneousCustomerFlag: miscellaneousCustomerFlag,
        printYardFlag: printYardFlag,
        primaryKey:
          bolFor === "shuttle" || bolFor === "Units"
            ? unitFK
            : bolFor === "driver" || bolFor === "Dispatches"
              ? dispatchId
              : null,
        primaryKeyName: unitFK ? "UnitPK" : dispatchId ? "DispatchPK" : "DriverPK",
        entityName:
          bolFor === "shuttle" || bolFor === "Units"
            ? "Units"
            : bolFor === "driver" || bolFor === "Dispatches"
              ? "Dispatches"
              : "",
        isEmail: isEmail,

        emailObjectKeyList:
          bolFor === "shuttle" && isEmail
            ? [shuttleEmailObjectKey]
            : bolFor === "Units" && isEmail
              ? [unitEmailObjectKey]
              : (bolFor === "driver" || bolFor === "Dispatches") && isEmail
                ? [dispatchEmailObjectKey]
                : [],
        emailObjectKey:
          bolFor === "shuttle" && print
            ? shuttleEmailObjectKey
            : bolFor === "Units" && print
              ? unitPrintObjectKey
              : (bolFor === "driver" || bolFor === "Dispatches") && print
                ? dispatchPrintObjectKey
                : "",
        printObjectKey:
          bolFor === "shuttle" && print
            ? shuttleEmailObjectKey
            : bolFor === "Units" && print
              ? unitPrintObjectKey
              : (bolFor === "driver" || bolFor === "Dispatches") && print
                ? dispatchPrintObjectKey
                : "",
        documentType: "DISP_MAIL_DOCS",
        isDocumentSave: false,
        userPK: userPK,
      })
    );
  }, [
    unitFK,
    email,
    printAtYard,
    print,
    emailToCustomer,
    emailToPlant,
    emailToDealer,
    emailToUser,
    emailToDriver,
    miscellaneousCustomerFlag,
    printYardFlag,
    dispatchId,
    bolFor,
    isEmail,
    userPK,
  ]);

  /******
   * Handle the email/Print process
   *****/
  const handleProcess = () => {
    setLoader(true);
    ReprintBolService.composeEmail(printBOLOutputData)
      .then((response) => {
        const firstItem = response.data[0];
        // Now get attachments
        const attachments = firstItem.attachments;
        // Extract BOL.pdf base64
        const bolPdfBase64 = attachments["BOL.pdf"];
        // Set it to state for your PreviewPopup
        setFileContent(bolPdfBase64);
        if (print) {
          setshowPreview(true);
        }

        toast.success("BOL Generated");
        setLoader(false);
        // dispatch(setRePrintBOL(false));
        dispatch(setBolFor("driver"));
        dispatch(setUnitConfirmationData(null));
        dispatch(setUnitFK(null));
        dispatch(setDriverId(null));
        dispatch(setPrintYardFlag(false));
        dispatch(setDispatchId(null));
        dispatch(setSelectedId(null));
        dispatch(setEmail(""));
        dispatch(resetUnitSelectionFilters());
        dispatch(resetOutputconfirmationScreen());

        dispatch(setSearchCriteria("Beginning"));
        dispatch(setActiveString("All"));
        dispatch(setActive(null));
        dispatch(setDeleased(null));
        dispatch(setFirstName(""));
        dispatch(setLastName(""));
        dispatch(setDriverId(null));

        dispatch(setSortType(null));
        dispatch(setPageNumber(0));

        dispatch(resetDispatchSelectionFilters());

        dispatch(setDispatchId(null));
        if (!print) {
          navigate(`/reprint-selection-screen`);
        }
      })
      .catch((error) => {
        navigate(`/reprint-selection-screen`);
        console.error("Error processing email/print", error);
        setLoader(false);
        // dispatch(setRePrintBOL(false));
        dispatch(setBolFor("driver"));
        dispatch(setUnitConfirmationData(null));
        dispatch(setUnitFK(null));
        dispatch(setDriverId(null));
        dispatch(setEmail(""));
        dispatch(setPrintYardFlag(false));
        dispatch(setDispatchId(null));
        dispatch(setSelectedId(null));
        dispatch(resetUnitSelectionFilters());
        dispatch(resetOutputconfirmationScreen());
        dispatch(setSearchCriteria("Beginning"));
        dispatch(setActiveString("All"));
        dispatch(setActive(null));
        dispatch(setDeleased(null));
        dispatch(setFirstName(""));
        dispatch(setLastName(""));
        dispatch(setDriverId(null));

        dispatch(setSortType(null));
        dispatch(setPageNumber(0));

        dispatch(resetDispatchSelectionFilters());

        dispatch(setDispatchId(null));
      })
      .finally(() => {
        setLoader(false);
      });
  };

  /*****
   * Used to navigate to rePrintBOL
   * selection screen if it is navigated from the Reprint program
   * *****/
  useEffect(() => {
    if (!rePrintBOL) {
      navigate("/reprint-selection-screen");
    }
  }, [rePrintBOL]);

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <Header
          confirmClose
          programName="RePrint BOL"
          closeModalBody="Please confirm you want to close the program without Processing"
          closeConfirmationHandler={() => {
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
            dispatch(setSearchCriteria("Beginning"));
            dispatch(setActiveString("All"));
            dispatch(setActive(null));
            dispatch(setDeleased(null));
            dispatch(setFirstName(""));
            dispatch(setLastName(""));
            dispatch(setDriverId(null));

            dispatch(setSortType(null));
            dispatch(setPageNumber(0));

            dispatch(resetDispatchSelectionFilters());
            dispatch(resetDispatchSelectionFilters());

            dispatch(setDispatchId(null));
          }}
        />
        <div className="p-2">
          <PreviewPopup
            show={showPreview}
            onHide={() => {
              setshowPreview(false);
              dispatch(setRePrintBOL(false));
            }}
            base64PDF={fileContent}
            handleClose={() => dispatch(setRePrintBOL(false))}
          />

          {loader && (
            <div className="fade modal-backdrop show">
              <div className="pos-center">
                <div className="loader"></div>
              </div>
            </div>
          )}
          <div className="shadow-sm rounded border quarterScreenFormContentHeight">
            <div className="">
              <div className="p-15 w-100">
                <Row className="m-0">
                  <Col xs={11}>
                    <Form.Group className={`mt-5  align-items-center row  m-l-0 m-r-0`}>
                      <Col xs={2} className="p-0  ms-0 ">
                        <Form.Label className="customColFormLabel">Print At Yard</Form.Label>
                      </Col>

                      <Col xs={1} className="p-0 me-2  ms-4 ">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="printAtYard"
                          name="printAtYard"
                          checked={printAtYard}
                          onChange={(e) => dispatch(setPrintAtYard(e.target.checked))}
                          disabled={
                            bolFor === "driver" ||
                            bolFor === "Dispatches" ||
                            (bolFor === "Units" && !printYardFlag) ||
                            (bolFor === "shuttle" && !printYardFlag)
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className={`mt-3  align-items-center row  m-l-0 m-r-0`}>
                      <Col xs={2} className="p-0  ms-0 ">
                        <Form.Label className="customColFormLabel">Print</Form.Label>
                      </Col>

                      <Col xs={1} className="p-0 me-2  ms-4 ">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="print"
                          name="print"
                          checked={print}
                          onChange={(e) => dispatch(setPrint(e.target.checked))}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className={`mt-3  align-items-center row  m-l-0 m-r-0`}>
                      <Col xs={2} className="p-0  ms-0 ">
                        <Form.Label className="customColFormLabel">Email To Customer</Form.Label>
                      </Col>

                      <Col xs={1} className="p-0 me-2  ms-4 ">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="emailToCustomer"
                          name="emailToCustomer"
                          checked={emailToCustomer}
                          onChange={(e) => dispatch(setEmailToCustomer(e.target.checked))}
                          disabled={
                            bolFor === "driver" ||
                            bolFor === "shuttle" ||
                            bolFor === "Dispatches" ||
                            (bolFor === "Units" && !emailCustomerFlag)
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className={`mt-3  align-items-center row  m-l-0 m-r-0`}>
                      <Col xs={2} className="p-0  ms-0 ">
                        <Form.Label className="customColFormLabel">Email To Plant</Form.Label>
                      </Col>

                      <Col xs={1} className="p-0 me-2  ms-4 ">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="emailToPlant"
                          name="emailToPlant"
                          checked={emailToPlant}
                          onChange={(e) => dispatch(setEmailToPlant(e.target.checked))}
                          disabled={
                            bolFor === "driver" ||
                            bolFor === "shuttle" ||
                            bolFor === "Dispatches" ||
                            (bolFor === "Units" && !emailPlantFlag)
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className={`mt-3  align-items-center row  m-l-0 m-r-0`}>
                      <Col xs={2} className="p-0  ms-0 ">
                        <Form.Label className="customColFormLabel">Email To Dealer</Form.Label>
                      </Col>

                      <Col xs={1} className="p-0 me-2  ms-4 ">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="emailToDealer"
                          name="emailToDealer"
                          checked={emailToDealer}
                          onChange={(e) => dispatch(setEmailToDealer(e.target.checked))}
                          disabled={
                            bolFor === "driver" ||
                            bolFor === "shuttle" ||
                            bolFor === "Dispatches" ||
                            (bolFor === "Units" && !emailDealerFlag)
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className={`mt-3  align-items-center row  m-l-0 m-r-0`}>
                      <Col xs={2} className="p-0  ms-0 ">
                        <Form.Label className="customColFormLabel">Email To User</Form.Label>
                      </Col>

                      <Col xs={1} className="p-0 me-2  ms-4 ">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="emailToUser"
                          name="emailToUser"
                          checked={emailToUser}
                          onChange={(e) => dispatch(setEmailToUser(e.target.checked))}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className={`mt-3  align-items-center row  m-l-0 m-r-0`}>
                      <Col xs={2} className="p-0  ms-0 ">
                        <Form.Label className="customColFormLabel">Email To Driver</Form.Label>
                      </Col>

                      <Col xs={1} className="p-0 me-2  ms-4 ">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="emailToDriver"
                          name="emailToDriver"
                          checked={emailToDriver}
                          onChange={(e) => dispatch(setEmailToDriver(e.target.checked))}
                          disabled={
                            (bolFor === "Dispatches" && !hasDriverName) ||
                            bolFor === "Units" ||
                            bolFor === "shuttle"
                          }
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className={`mt-3  align-items-center row  m-l-0 m-r-0`}>
                      <Col sm={2} md={2} xs={2} className="p-0  ms-0 ">
                        <Form.Label htmlFor="name" className="customColFormLabel">
                          Email
                        </Form.Label>
                      </Col>

                      <Col xs={9} md={9} className="p-0 me-2  ms-4 ">
                        <input
                          className={`customFormControl ${
                            !email
                              ? ""
                              : email !== null && email.length > 1 && email.match(emailRegex)
                                ? ""
                                : "borderRed"
                          }`}
                          id="customer"
                          name="customer"
                          type="customer"
                          value={email}
                          maxLength={70}
                          autoComplete="off"
                          aria-autocomplete="list"
                          onInput={(e) => {
                            dispatch(setEmail(e.target.value));
                          }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Reprint BOL Changes "}
          body={"Please confirm you want to cancel changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        <CommonFooter buttons={buttons} />
      </div>
    </div>
  );
};

export default ReprintOutputSelectionScreen;
