import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Button, Modal } from "react-bootstrap";
import ModalComponent from "../../../common/ModalComponent";
import DriverInvoiceService from "../../../../services/DriverInvoiceService";
import {
  resetFields,
  setChangeColor,
  setChangesCancelled,
  setDocumentFiles,
  setDriverId,
  setFirstName,
  setInvoicePK,
  setLastName,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCriteria,
  setSearchTerms,
  setSelectedStatus,
  setSortType,
  setSortValue,
  setUnitFK,
  setUnitNumber,
  setUnitNumberId,
  setUnitNumberLast5,
  setUnitPageNumber,
  setSelectedId,
  setCustomerEmail,
  setIsNonUnit,
  setInvoiceData,
  setDriverSearchCriteria,
  setInvoiceNumber,
  setNonUnitData,
  setSelectedCompanyName,
  setCompanyFK,
  toggleCancelChanges,
  setPrint,
  setLoadSave,
  setDriverInvoiceFiles,
  setTextTabDescription,
  setPoNumber,
} from "../../../../redux/DriverInvoiceSlice";

function Footer() {
  const { driverId, unitId } = useParams();
  const location = useLocation();

  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);

  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [showInvoiceGenerationSuccess, setShowInvoiceGenerationSuccess] = useState(false);
  const [invoiceResponseList, setInvoiceResponseList] = useState([]);

  const [isNonUnitInvoice, setIsNonUnitInvoice] = useState(false);
  const manualEntryData = useSelector((state) => state.driverInvoiceReducer.manualEntryData);
  const driverInvoiceTextData = useSelector((state) => state.driverInvoiceReducer.driverInvoiceTextData);
  const invoiceDetailsData = useSelector((state) => state.driverInvoiceReducer.invoiceDetailsData);
  const emailFormat = useSelector((state) => state.driverInvoiceReducer.emailFormat);
  const manualPhoneValidation = useSelector((state) => state.driverInvoiceReducer.manualPhoneValidation);
  const detailAddFlag = useSelector((state) => state.driverInvoiceReducer.detailAddFlag);
  const customerEmail = useSelector((state) => state.driverInvoiceReducer.customerEmail);
  const emailToDriver = useSelector((state) => state.driverInvoiceReducer.emailToDriver);
  const emailToUser = useSelector((state) => state.driverInvoiceReducer.emailToUser);
  const unitFK = useSelector((state) => state.driverInvoiceReducer.unitFK);
  const print = useSelector((state) => state.driverInvoiceReducer.print);
  const unitNumber = useSelector((state) => state.driverInvoiceReducer.unitNumber);
  const companyName = useSelector((state) => state.driverInvoiceReducer.companyName);

  const sum = useSelector((state) => state.driverInvoiceReducer.sum);
  const uploadActive = useSelector((state) => state.driverInvoiceReducer.uploadActive);
  const documentFiles = useSelector((state) => state.driverInvoiceReducer.documentFiles);
  const selectedId = useSelector((state) => state.driverInvoiceReducer.selectedId);
  const isNonUnit = useSelector((state) => state.driverInvoiceReducer.isNonUnit);
  const descriptionValid = useSelector((state) => state.driverInvoiceReducer.descriptionValid);
  const activeDriver = useSelector((state) => state.driverInvoiceReducer.activeDriver);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveFullInvoiceWithFiles = async () => {
    const payload = {
      driverInvoiceVO: driverInvoiceTextData,
      invoiceDetailsVOList: invoiceDetailsData,
      driverInvoiceManualEntryVO:
        Array.isArray(manualEntryData) || !manualEntryData
          ? {
              name: "",
              address1: "",
              address2: "",
              city: "",
              postalCode: "",
              stateCode: "",
              phone: "",
              email: "",
              postalCodePK: null,
              canadian: false,
            }
          : manualEntryData,
    };

    dispatch(setLoadSave(true));
    try {
      const invoiceRes = await DriverInvoiceService.saveDriverInvoice(payload);

      const invoicePK = invoiceRes?.data?.[0]?.InvoicePK;

      if (!invoicePK) {
        dispatch(setSearchTerms(""));
        dispatch(setSearchCriteria("Beginning"));
        dispatch(setSelectedStatus("All"));
        dispatch(setFirstName(""));
        dispatch(setLastName(""));
        dispatch(setPageNumber(0));
        dispatch(setSortValue(null));
        dispatch(setSortType(null));
        dispatch(setChangeColor(false));
        dispatch(setDriverId(null));
        dispatch(setSelectedId(null));
        dispatch(resetFields());
        dispatch(setIsNonUnit(false));

        dispatch(setUnitFK(null));
        dispatch(setInvoiceData([]));
        dispatch(setSearchTerms(""));
        dispatch(setDriverSearchCriteria("Beginning"));
        dispatch(setUnitNumber(""));
        dispatch(setUnitNumberLast5(""));
        dispatch(setUnitNumberId(null));
        dispatch(setInvoiceNumber(""));
        dispatch(setNonUnitData([]));
        dispatch(setSortValue(null));
        dispatch(setSortType(null));
        dispatch(setUnitPageNumber(0));
        dispatch(setSelectedCompanyName(""));
        dispatch(setCompanyFK(null));
        dispatch(toggleCancelChanges());
        toast.error("Invoice Save Failed");

        navigate("/driver-invoice-browse");
        return null;
      }

      dispatch(setInvoicePK(invoicePK));

      const pdfRes = await DriverInvoiceService.savePDFFileList(
        documentFiles,
        unitFK,
        driverInvoiceTextData?.miscellaneousUnit,
        invoicePK,
        print,
        emailToDriver,
        emailToUser,
        customerEmail
      );

      dispatch(setTextTabDescription(""));
      dispatch(setPoNumber(""));

      if (pdfRes?.data) {
        setInvoiceResponseList([
          {
            unitNumber: invoiceRes?.data?.[0]?.UnitNumber,
            invoiceNumber: invoiceRes?.data?.[0]?.InvoiceNumber,
            companyName: invoiceRes?.data?.[0]?.CompanyName,
          },
        ]);
        setIsNonUnitInvoice(isNonUnit);
        setShowInvoiceGenerationSuccess(true);
        dispatch(setSearchTerms(""));
        dispatch(setSearchCriteria("Beginning"));
        dispatch(setSelectedStatus("All"));
        dispatch(setFirstName(""));
        dispatch(setLastName(""));
        dispatch(setPageNumber(0));
        dispatch(setSortValue(null));
        dispatch(setSortType(null));
        dispatch(setChangeColor(false));
        dispatch(setDriverId(null));
        dispatch(setSelectedId(null));
        dispatch(setIsNonUnit(false));

        dispatch(setUnitFK(null));
        dispatch(setInvoiceData([]));
        dispatch(setSearchTerms(""));
        dispatch(setDriverSearchCriteria("Beginning"));
        dispatch(setUnitNumber(""));
        dispatch(setUnitNumberLast5(""));
        dispatch(setUnitNumberId(null));
        dispatch(setInvoiceNumber(""));
        dispatch(setNonUnitData([]));
        dispatch(setSortValue(null));
        dispatch(setSortType(null));
        dispatch(setUnitPageNumber(0));
        dispatch(setSelectedCompanyName(""));
        dispatch(setCompanyFK(null));
        dispatch(toggleCancelChanges());

        return invoicePK;
      } else {
        toast.error("PDF File Save Failed");
        dispatch(setSearchTerms(""));
        dispatch(setSearchCriteria("Beginning"));
        dispatch(setSelectedStatus("All"));
        dispatch(setFirstName(""));
        dispatch(setLastName(""));
        dispatch(setPageNumber(0));
        dispatch(setSortValue(null));
        dispatch(setSortType(null));
        dispatch(setChangeColor(false));
        dispatch(setDriverId(null));
        dispatch(setSelectedId(null));
        dispatch(setIsNonUnit(false));

        dispatch(setUnitFK(null));
        dispatch(setInvoiceData([]));
        dispatch(setSearchTerms(""));
        dispatch(setDriverSearchCriteria("Beginning"));
        dispatch(setUnitNumber(""));
        dispatch(setUnitNumberLast5(""));
        dispatch(setUnitNumberId(null));
        dispatch(setInvoiceNumber(""));
        dispatch(setNonUnitData([]));
        dispatch(setSortValue(null));
        dispatch(setSortType(null));
        dispatch(setUnitPageNumber(0));
        dispatch(setSelectedCompanyName(""));
        dispatch(setCompanyFK(null));
        dispatch(toggleCancelChanges());
        navigate("/driver-invoice-browse");

        return null;
      }
    } catch (err) {
      console.error("Error in saving full invoice with files:", err);
      toast.error("Save Failed");
      return null;
    } finally {
      dispatch(setLoadSave(false));
      dispatch(setDriverInvoiceFiles({ actionType: "clear" }));
    }
  };

  const handleDeleteNo = () => setDeleteShow(false);

  const handleCancel = () => {
    if (location.pathname?.includes("/driver-invoice-scan")) {
      setCancelShow(true);
    } else {
      dispatch(resetFields());

      setCancelShow(false);
      navigate(`/driver-invoice-browse`);
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);

  const handleCancelYes = () => {
    if (!location.pathname?.startsWith("/driver-invoice-unit-confirmation")) {
      dispatch(resetFields());

      setCancelShow(false);

      dispatch(setChangesCancelled(true));
      navigate("/driver-invoice-browse");

      toast.success("Changes Cancelled");
    } else {
      dispatch(resetFields());
      setTimeout(() => {
        navigate("/driver-invoice-browse");
        toast.success("Changes Cancelled");
      }, 100);
    }
  };

  const isTextTabValid = () => {
    const noEmailActions = !print && !emailToDriver && !emailToUser;

    const invalidEmail = noEmailActions && ((customerEmail !== "" && !emailFormat) || customerEmail === "");

    const invalidNonUnit = noEmailActions && isNonUnit && !driverInvoiceTextData?.miscellaneousUnit;

    // If any invalid condition → false
    if (invalidEmail || invalidNonUnit || (customerEmail !== "" && !emailFormat)) return false;

    // Otherwise valid
    return true;
  };

  useEffect(() => {
    const isMiscellaneousUnitValid = !isNonUnit || driverInvoiceTextData?.miscellaneousUnit;
    const isDetailTabValid =
      isMiscellaneousUnitValid &&
      invoiceDetailsData?.length >= 1 &&
      invoiceDetailsData?.every((e) => e?.description) &&
      sum > 0 &&
      descriptionValid;

    const isTextTabValidFlag = isTextTabValid();

    if (isDetailTabValid && isTextTabValidFlag) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    invoiceDetailsData,
    driverInvoiceTextData,
    detailAddFlag,
    sum,
    isNonUnit,
    descriptionValid,
    print,
    emailToDriver,
    emailToUser,
    customerEmail,
    emailFormat,
  ]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap"></div>

      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={
            window.location.pathname?.includes("/driver-invoice-manual") ||
            window.location.pathname?.includes("/driver-invoice-detail") ||
            window.location.pathname?.includes("/driver-invoice-scan")
          }
          onClick={() => {
            dispatch(setUnitFK(0));
            dispatch(setUnitNumberId(null));
            dispatch(setUnitNumber(""));
            dispatch(setDocumentFiles([]));
            dispatch(setUnitNumberLast5(""));
            dispatch(setCustomerEmail(""));
            dispatch(setPrint(false));

            navigate(`/driver-invoice-manual`);
          }}
          disabled={selectedId && activeDriver}
        >
          Manual
        </button>

        {window.location.pathname?.includes("/driver-invoice-detail") ? (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              const path = driverId
                ? `/driver-invoice-scan/${driverId}/${unitFK}`
                : `/driver-invoice-scan/${unitFK}`;

              navigate(path);
            }}
            disabled={disableSave}
          >
            Next
          </button>
        ) : (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              dispatch(setNormalSortFlag(false));
              dispatch(setUnitPageNumber(0));
              dispatch(setNormalSortValue(""));

              const path = `/driver-invoice-unit-selection`;

              navigate(path);
            }}
            hidden={
              window.location.pathname?.includes("/driver-invoice-scan") ||
              window.location.pathname?.includes("/driver-invoice-browse")
            }
            disabled={
              !manualEntryData.postalCodePK ||
              !manualEntryData.name?.trim() ||
              !manualEntryData.address1?.trim() ||
              !manualEntryData.phone?.trim() ||
              manualEntryData.phone?.length !== 13 ||
              !manualEntryData.email?.trim() ||
              !emailFormat ||
              manualPhoneValidation
            }
          >
            Next
          </button>
        )}
        {window.location.pathname?.includes("/driver-invoice-browse") && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              dispatch(setNormalSortFlag());
              dispatch(setUnitPageNumber(0));
              dispatch(setNormalSortValue());

              const path = `/driver-invoice-unit-selection/${selectedId}`;

              navigate(path);
            }}
            disabled={!selectedId || !activeDriver}
          >
            Next
          </button>
        )}

        {window.location.pathname?.includes("/driver-invoice-scan") && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={saveFullInvoiceWithFiles}
            disabled={uploadActive === true}
          >
            Save
          </button>
        )}
        {window.location.pathname?.includes("/driver-invoice-scan") && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              const path = driverId
                ? `/driver-invoice-detail/${driverId}/${unitId}`
                : `/driver-invoice-detail/${unitId || unitFK}`;
              navigate(path);
            }}
          >
            Back
          </button>
        )}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={window.location.pathname?.includes("/driver-invoice-browse")}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Driver Invoice  Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Record"}
          body={"Please confirm you want to Delete this Driver Invoice"}
          handleYES={""}
          handleNO={handleDeleteNo}
        />

        {/* Invoice Generation Success Modal */}
        <ModalComponent
          show={showInvoiceGenerationSuccess}
          onHide={() => {
            setShowInvoiceGenerationSuccess(false);
            navigate("/driver-invoice-browse");
          }}
          title={"Invoice Generation Completed"}
          body={
            <div>
              {invoiceResponseList?.length > 0 && (
                <div style={{ maxHeight: "150px", overflowY: "auto" }} className="mt-4">
                  <table className="table table-bordered rounded">
                    <thead>
                      <tr>
                        <th className="fw-bolder">
                          {isNonUnitInvoice ? "Miscellaneous Unit Number" : "Unit Number"}
                        </th>
                        <th className="fw-bolder">Invoice Number</th>
                        <th className="fw-bolder">Company</th>
                      </tr>
                    </thead>
                    <tbody className="overflow-auto">
                      {invoiceResponseList?.map((unit, index) => (
                        <tr key={index}>
                          <td>{unit?.unitNumber}</td>
                          <td>{unit?.invoiceNumber}</td>
                          <td>{unit?.companyName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          }
          handleOK={() => {
            setShowInvoiceGenerationSuccess(false);
            navigate("/driver-invoice-browse");
          }}
          showOK
        />
        {/* model Active*/}

        <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Delete failed!</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setErrorShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Footer;
