import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import CommonFooter from "../../../common/CommonFooter";
import { Col, Form, Row } from "react-bootstrap";
import CustomDropzone from "../../../common/CustomDropzone";
import DWTComponent from "../../../../modules/dwt";
import { useDispatch, useSelector } from "react-redux";
import {
  setBreakdownInvoiceFiles,
  setBreakdownInvoicePayload,
  setFeesTabLisiting,
  setBreakdownInvoiceDetails,
  setCreditCardArrayList,
  setFeesTabNormalSortValue,
  setFeesTabNormalSortFlag,
  setTransIds,
  setBolFileAdded,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import BreakdownProcessingService from "../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import Header from "../../../common/Header";
import LoadingIcon from "../../../common/LoadingIcon";

const DelayedUnitBreakdownInvoiceScan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { breakdownFK } = useParams();
  const [isCustomerUploadActive, setIsCustomerUploadActive] = useState(false);
  const [isCustomerScanActive, setIsCustomerScanActive] = useState(false);
  const [isCompanyUploadActive, setIsCompanyUploadActive] = useState(false);
  const [isCompanyScanActive, setIsCompanyScanActive] = useState(false);
  const [disableSave, setDisableSave] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [flag, setFlag] = useState("");
  const [bolLoading, setBolLoading] = useState(false);
  const [savedCompanyName, setSavedCompanyName] = useState(() => {
    // Initialize state from localstorage
    return localStorage.getItem("selectedCompany");
  });
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceResponseList, setInvoiceResponseList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [bolFileAdded, setBolFileAdded] = useState(false);

  const breakdownInvoiceFiles = useSelector((state) => state.delaybreakdown.breakdownInvoiceFiles);
  const bolFileAdded = useSelector((state) => state.delaybreakdown.bolFileAdded);
  const { customerUploadFiles, companyUploadFiles, customerScanFiles, companyScanFiles } =
    breakdownInvoiceFiles;
  const breakdownInvoicePayload = useSelector((state) => state.delaybreakdown.breakdownInvoicePayload);
  const breakdownInvoiceDetails = useSelector((state) => state.delaybreakdown.breakdownInvoiceDetails);
  const feesTabLisiting = useSelector((state) => state.delaybreakdown.feesTabLisiting);
  const creditCardArrayList = useSelector((state) => state.delaybreakdown.creditCardArrayList);
  const unitFK = useSelector((state) => state.delaybreakdown.unitFK);
  const customerFK = useSelector((state) => state.delaybreakdown.customerFK);
  const paidFlag = useSelector((state) => state.delaybreakdown.paidFlag);
  const navigateToInvoice = useSelector((state) => state.delaybreakdown.navigateToInvoice);
  const unitFkScanInvoice = useSelector((state) => state.delaybreakdown.unitFkScanInvoice);
  const sisterUnitFk = useSelector((state) => state.delaybreakdown.sisterUnitFk);
  const transIds = useSelector((state) => state.delaybreakdown.transIds);
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");
  const BOL_FILENAME = "BOL.pdf";

  let totalDriverAmount =
    (breakdownInvoiceDetails[0]?.driverDowntimeAmount || 0) +
    (breakdownInvoiceDetails[0]?.driverAPUAmount || 0) +
    (breakdownInvoiceDetails[0]?.driverTolls || 0) +
    (breakdownInvoiceDetails[0]?.driverPermits || 0) +
    (breakdownInvoiceDetails[0]?.driverFuelCredit || 0) +
    (breakdownInvoiceDetails[0]?.additional_Driver_Amount || 0) +
    (breakdownInvoiceDetails[0]?.driverBreakdownFee || 0) +
    (breakdownInvoiceDetails[0]?.nextDriverFuelCharge || 0);

  let totalAmount =
    (breakdownInvoiceDetails[0]?.invoiceDowntimeAmount || 0) +
    (breakdownInvoiceDetails[0]?.invoiceAPUAmount || 0) +
    (breakdownInvoiceDetails[0]?.invoicePermits || 0) +
    (breakdownInvoiceDetails[0]?.invoiceTolls || 0) +
    (breakdownInvoiceDetails[0]?.additional_Inv_Amount || 0) +
    (breakdownInvoiceDetails[0]?.invoiceBreakdownFee || 0);

  // Save Validation
  useEffect(() => {
    if (isCustomerUploadActive || isCompanyUploadActive || isCustomerScanActive || isCompanyScanActive) {
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
  }, [isCustomerUploadActive, isCompanyUploadActive, isCustomerScanActive, isCompanyScanActive]);

  useEffect(() => {
    dispatch(
      setBreakdownInvoicePayload({
        customerUploadFiles,
        companyUploadFiles,
        customerScanFiles,
        companyScanFiles,
      })
    );
  }, [customerUploadFiles, companyUploadFiles, customerScanFiles, companyScanFiles]);

  let saveExpensesRequest = {
    delayedUnitBreakDownFK: breakdownFK,
    companyName: savedCompanyName,
    delayedUnitExpensesVOList: breakdownInvoiceDetails?.map((item) => ({
      delayedUnitBreakdownFK: item?.delayedUnitBreakdownFK || null,
      delayedUnitExpensePK: item?.delayedUnitExpensePK || null,
      invoiceAmount: totalAmount || 0,
      driverAmount: totalDriverAmount || 0,
      mileageRate: item?.invoiceRateSum || 0,
      totalMiles: item?.invoiceMiles || 0,
      driverTolls: item?.driverTolls || 0,
      driverPermits: item?.driverPermits || 0,
      driverDownTime: item?.driverDowntimeAmount || 0,
      driverAttemptPickUp: item?.driverAPUAmount || 0,
      driverAttitionalAmt: item?.additional_Driver_Amount || 0,
      breakDownFee: item?.driverBreakdownFee || 0,
      fuelCredit: item?.driverFuelCredit || 0,
      nextFuelCharge: item?.nextDriverFuelCharge || 0,
    })),
    delayedBreakdownFeesVOList: feesTabLisiting?.map((item) => ({
      delayedUnitFeePK: item?.delayedUnitFeePK,
      delayedUnitBreakdownFK: item?.delayedUnitBreakdownFK,
      description: item?.description,
      invoiceAmount: item?.invoiceAmount || 0,
      driverAmount: item?.driverAmount || 0,
      reimbursment: item?.reimbursment || 0,
    })),
    monetraChargesVOList: creditCardArrayList,
    unitPK: unitFK,
    customerFK: customerFK,
    transIds: transIds,
  };

  const saveBreakdownInvoice = (string) => {
    setLoading(true);
    saveExpensesRequest.flag = string;
    BreakdownProcessingService.saveBreakdownInvoice(saveExpensesRequest)
      .then((response) => {
        const { spResponse, creditCardResponse } = response?.data || {};

        if (String(creditCardResponse?.errorCode) === "1") {
          dispatch(setTransIds(creditCardResponse?.refTranID));
          dispatch(
            setCreditCardArrayList((prevList) =>
              (prevList || []).map((card) =>
                creditCardResponse?.completedCards?.includes(card?.unmaskedCardNumber)
                  ? { ...card, processed: 1 }
                  : card
              )
            )
          );
          toast.error("Error occured");
        } else {
          const payload = {
            ...breakdownInvoicePayload,
            invoicePK: spResponse?.response?.result[0]?.invoicePK,
            companyName: savedCompanyName,
            localCompany: spResponse?.response?.result[0]?.localcompanyName,
            sisterInvoicePK: spResponse?.response?.result[0]?.sisterInvoicePK
              ? spResponse?.response?.result[0]?.sisterInvoicePK
              : 0,
            delayedUnitBreakDownFK: breakdownFK,
            unitNumber: "Unit Number",
            invoiceNumber: "Invoice Number",
          };
          setInvoiceResponseList(spResponse?.response?.result);
          BreakdownProcessingService.savePDFFileList(payload)
            .then(() => {
              if (response?.data) {
                setShowInvoiceModal(true);
              } else {
                toast.error("Save Failed");
              }
            })
            .finally(() => {
              setLoading(false);
            });
        }
      })
      .catch((error) => {
        console.log("Error in saving breakdown invoice", error);
        setLoading(false);
      })
      .finally(() => {
        setFlag("");
        dispatch(setBreakdownInvoiceFiles({ actionType: "clear" }));
      });
    dispatch(setCreditCardArrayList([]));
  };

  const saveAndSettleBreakdownInvoice = (string) => {
    setLoading(true);
    saveExpensesRequest.flag = string;
    BreakdownProcessingService.saveBreakdownInvoice(saveExpensesRequest)
      .then((response) => {
        const { spResponse, creditCardResponse } = response?.data || {};

        if (String(creditCardResponse?.errorCode) === "1") {
          dispatch(setTransIds(creditCardResponse?.refTranID));
          dispatch(
            setCreditCardArrayList((prevList) =>
              (prevList || []).map((card) =>
                creditCardResponse?.completedCards?.includes(card?.unmaskedCardNumber)
                  ? { ...card, processed: 1 }
                  : card
              )
            )
          );
          toast.error("Error occured");
        } else {
          const payload = {
            ...breakdownInvoicePayload,
            invoicePK: spResponse?.response?.result[0]?.invoicePK,
            companyName: savedCompanyName,
            localCompany: spResponse?.response?.result[0]?.localcompanyName,
            sisterInvoicePK: spResponse?.response?.result[0]?.sisterInvoicePK
              ? spResponse?.response?.result[0]?.sisterInvoicePK
              : 0,
            delayedUnitBreakDownFK: breakdownFK,
            unitNumber: "Unit Number",
            invoiceNumber: "Invoice Number",
          };
          setInvoiceResponseList(spResponse?.response?.result);
          BreakdownProcessingService.savePDFFileList(payload)
            .then(() => {
              if (response?.data) {
                setShowInvoiceModal(true);
                dispatch(setFeesTabLisiting([]));
                dispatch(setBreakdownInvoiceDetails([]));
                dispatch(setBreakdownInvoiceFiles({ actionType: "clear" }));
              } else {
                dispatch(setFeesTabLisiting([]));
                dispatch(setBreakdownInvoiceDetails([]));
                dispatch(setBreakdownInvoiceFiles({ actionType: "clear" }));
                toast.error("Save Failed");
              }
              dispatch(setFeesTabNormalSortValue(""));
              dispatch(setFeesTabNormalSortFlag(true));
            })
            .catch(() => {
              toast.error("Save Failed");
            })
            .finally(() => {
              setLoading(false);
              dispatch(setBreakdownInvoiceFiles({ actionType: "clear" }));
            });
        }
      })
      .catch((error) => {
        console.log("Error in saving breakdown invoice", error);
        setLoading(false);
      })
      .finally(() => {
        setFlag("");
        dispatch(setBreakdownInvoiceFiles({ actionType: "clear" }));
      });
    dispatch(setCreditCardArrayList([]));
  };

  const handleBOL = async () => {
    try {
      setBolLoading(true);

      const response = await BreakdownProcessingService.getBOLpdf(
        unitFkScanInvoice,
        sisterUnitFk,
        breakdownCompanyName
      );

      const firstItem = response?.data?.[0];
      const bolPdfBase64 = firstItem?.attachments?.[BOL_FILENAME];
      if (!bolPdfBase64) return;

      // Convert base64 to Blob
      const byteCharacters = atob(bolPdfBase64);
      const byteArray = new Uint8Array(Array.from(byteCharacters, (char) => char.charCodeAt(0)));
      const pdfBlob = new Blob([byteArray], { type: "application/pdf" });

      // Create File object
      const bolFile = new File([pdfBlob], BOL_FILENAME, { type: "application/pdf" });

      // Inject missing fields to match manually uploaded files
      bolFile.preview = URL.createObjectURL(pdfBlob);
      bolFile.path = "./BOL.pdf";
      bolFile.relativePath = "./BOL.pdf";

      // Check for duplicates
      const alreadyExists = customerUploadFiles?.some(
        (file) => file.name === bolFile.name && file.size === bolFile.size
      );

      if (!alreadyExists) {
        dispatch(
          setBreakdownInvoiceFiles({
            actionType: "customerUploadFiles",
            payload: [...customerUploadFiles, bolFile],
          })
        );
        dispatch(setBolFileAdded(true));
        setIsCustomerUploadActive(true);
      }
    } catch (error) {
      console.error("Error fetching BOL PDF:", error);
    } finally {
      setBolLoading(false);
    }
  };

  const handleSaveAndSettle = () => {
    saveAndSettleBreakdownInvoice("Settle");
  };

  const handleSave = () => {
    saveBreakdownInvoice("Save");
  };

  const handleHeaderClose = () => {
    dispatch(setCreditCardArrayList([]));
    dispatch(setBreakdownInvoiceFiles({ actionType: "clear" }));
    dispatch(setBolFileAdded(false));
    navigate(`/breakdown-processing/view-breakdown/${breakdownFK}`);
  };

  const onCancel = () => {
    setCancelShow(true);
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    setCancelShow(false);
    toast.success("Changes cancelled");
    dispatch(setCreditCardArrayList([]));
    dispatch(setBreakdownInvoiceFiles({ actionType: "clear" }));
    navigate(`/breakdown-processing/view-breakdown/${breakdownFK}`);
  };

  const onBackClick = () => {
    navigate("/delay-unit-breakdown-invoice/" + breakdownFK);
  };

  const buttons = [
    {
      label: "Add BOL",
      onClick: () => handleBOL(),
      disabled: bolFileAdded ? true : false,
      style: {
        backgroundColor: bolFileAdded ? "#1e7e3ef1" : "",
      },
    },
    { label: "Save & Settle", onClick: () => handleSaveAndSettle(), disabled: disableSave || !paidFlag },
    { label: "Save", onClick: () => handleSave(), disabled: disableSave },
    { label: "Back", onClick: () => onBackClick() },
    { label: "Cancel", onClick: () => onCancel() },
  ];

  useEffect(() => {
    if (!navigateToInvoice) {
      dispatch(setFeesTabNormalSortValue(""));
      dispatch(setFeesTabNormalSortFlag(true));
      navigate(`/breakdown-processing/view-breakdown/${breakdownFK}`);
    }
  }, [navigateToInvoice]);

  useEffect(() => {
    const bolStillExists = customerUploadFiles?.some((file) => file.name?.includes(BOL_FILENAME));

    if (!bolStillExists) {
      dispatch(setBolFileAdded(false));
    }
  }, [customerUploadFiles]);

  return (
    <QuarterScreenWrapper>
      {(loading || bolLoading) && <LoadingIcon />}
      <Header
        programName="Delay Breakdown Invoice"
        confirmClose
        closeModalTitle="Close Delay Breakdown Invoice Changes"
        closeModalBody="Please confirm you want to close the program without saving your changes"
        closeNavigationURL={`/breakdown-processing/view-breakdown/${breakdownFK}`}
        closeConfirmationHandler={handleHeaderClose}
      />
      {/* Form Content */}
      <div className="p-2">
        <div className="shadow-sm rounded border p-2 quarterScreenFormContentHeight">
          <Row className="mx-0 p-0 mt-2">
            <Col xs={10}>
              <Form.Group className={`form-group align-items-center row m-l-0 m-r-0 mb-2`}>
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Customer Paperwork</Form.Label>
                </Col>

                <Col xs={1} className="p-0 w-150px">
                  <button
                    className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 
                    ${
                      isCustomerUploadActive
                        ? "btn-warning"
                        : customerUploadFiles?.length > 0
                          ? "btn-success"
                          : "btn-secondary"
                    }`}
                    type="button"
                    onClick={() => {
                      setIsCustomerUploadActive((state) => !state);
                    }}
                    disabled={isCompanyUploadActive || isCustomerScanActive || isCompanyScanActive}
                  >
                    <i className="fa-solid fa-cloud-arrow-up me-1" />
                    Upload
                  </button>
                </Col>
                <Col xs={2} className="p-0">
                  <button
                    className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                      isCustomerScanActive
                        ? "btn-warning"
                        : customerScanFiles?.length > 0
                          ? "btn-success"
                          : "btn-secondary"
                    }`}
                    type="button"
                    onClick={() => {
                      setIsCustomerScanActive((state) => !state);
                    }}
                    disabled={isCustomerUploadActive || isCompanyUploadActive || isCompanyScanActive}
                  >
                    <i class="fa-solid fa-expand me-2" />
                    Scan
                  </button>
                </Col>
              </Form.Group>

              <Form.Group className={`form-group align-items-center row m-l-0 m-r-0 mb-2`}>
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Company Paperwork</Form.Label>
                </Col>

                <Col xs={1} className="p-0 w-150px">
                  <button
                    className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                      isCompanyUploadActive
                        ? "btn-warning"
                        : companyUploadFiles?.length > 0
                          ? "btn-success"
                          : "btn-secondary"
                    }`}
                    type="button"
                    onClick={() => {
                      setIsCompanyUploadActive((state) => !state);
                    }}
                    disabled={isCustomerUploadActive || isCustomerScanActive || isCompanyScanActive}
                  >
                    <i className="fa-solid fa-cloud-arrow-up me-1" />
                    Upload
                  </button>
                </Col>

                <Col xs={2} className="p-0">
                  <button
                    className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 ${
                      isCompanyScanActive
                        ? "btn-warning"
                        : companyScanFiles?.length > 0
                          ? "btn-success"
                          : "btn-secondary"
                    }`}
                    type="button"
                    onClick={() => {
                      setIsCompanyScanActive((state) => !state);
                    }}
                    disabled={isCustomerUploadActive || isCompanyUploadActive || isCustomerScanActive}
                  >
                    <i class="fa-solid fa-expand me-2" />
                    Scan
                  </button>
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-0">
                <Col xs={2} className="p-0" />
                <Col xs={10}>
                  {/* Drag & Drop Component for Upload */}
                  {isCustomerUploadActive && (
                    <CustomDropzone
                      files={customerUploadFiles}
                      setFiles={(files) =>
                        dispatch(
                          setBreakdownInvoiceFiles({ actionType: "customerUploadFiles", payload: files })
                        )
                      }
                      fileType={"PDF"}
                      customDropzoneMessage={
                        customerUploadFiles?.length === 0
                          ? `Please Scan / Drag-Drop / Attach atleast one document`
                          : `Drag 'n' Drop PDF files / Attach from your computer`
                      }
                    />
                  )}
                  {/* Scan Component for scanning documents */}
                  {isCustomerScanActive && (
                    <DWTComponent
                      files={customerScanFiles}
                      setFiles={(files) =>
                        dispatch(
                          setBreakdownInvoiceFiles({ actionType: "customerScanFiles", payload: files })
                        )
                      }
                    />
                  )}

                  {isCompanyUploadActive && (
                    <CustomDropzone
                      files={companyUploadFiles}
                      setFiles={(files) =>
                        dispatch(
                          setBreakdownInvoiceFiles({ actionType: "companyUploadFiles", payload: files })
                        )
                      }
                      fileType={"PDF"}
                      customDropzoneMessage={
                        companyUploadFiles?.length === 0
                          ? `Please Scan / Drag-Drop / Attach atleast one document`
                          : `Drag 'n' Drop PDF files / Attach from your computer`
                      }
                    />
                  )}
                  {isCompanyScanActive && (
                    <DWTComponent
                      files={companyScanFiles}
                      setFiles={(files) =>
                        dispatch(setBreakdownInvoiceFiles({ actionType: "companyScanFiles", payload: files }))
                      }
                    />
                  )}
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </div>
      </div>
      <CommonFooter buttons={buttons} />
      <ModalComponent
        show={showInvoiceModal}
        onHide={() => {
          setShowInvoiceModal(false);
          navigate(`/breakdown-processing/view-breakdown/${breakdownFK}`);
        }}
        title={"Invoice Generation Completed"}
        body={
          <div>
            {invoiceResponseList?.length > 0 && (
              <div style={{ maxHeight: "150px", overflowY: "auto" }} className="mt-4">
                <table className="table table-bordered rounded">
                  <thead>
                    <tr>
                      <th className="fw-bolder">Unit Number</th>
                      <th className="fw-bolder">Invoice Number</th>
                      <th className="fw-bolder">Company</th>
                    </tr>
                  </thead>
                  <tbody className="overflow-auto">
                    <tr>
                      <td>{invoiceResponseList?.[0]?.unitNumber}</td>
                      <td>{invoiceResponseList?.[0]?.invoiceNumber}</td>
                      <td>{invoiceResponseList?.[0]?.localcompanyName}</td>
                    </tr>

                    {!!(
                      invoiceResponseList?.[0]?.unitNumber &&
                      invoiceResponseList?.[0]?.sisterInvoiceNumber &&
                      invoiceResponseList?.[0]?.sisterInvoiceNumber !== 0 &&
                      invoiceResponseList?.[0]?.sisterCompany !== "" &&
                      invoiceResponseList?.[0]?.sisterCompany?.trim()
                    ) && (
                      <tr>
                        <td>{invoiceResponseList[0].unitNumber}</td>
                        <td>{invoiceResponseList[0].sisterInvoiceNumber}</td>
                        <td>{invoiceResponseList[0].sisterCompany?.trim()}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        }
        handleOK={() => {
          setShowInvoiceModal(false);
          navigate(`/breakdown-processing/view-breakdown/${breakdownFK}`);
        }}
        showOK
      />
      {/* This is now outside the layout and will render normally */}
      <ModalComponent
        show={cancelShow}
        onHide={handleCancelNo}
        title={"Cancel Delay Breakdown Invoice Changes"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
    </QuarterScreenWrapper>
  );
};

export default DelayedUnitBreakdownInvoiceScan;
