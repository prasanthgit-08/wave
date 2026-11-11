import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../../common/Button";
import CustomerEmialMaintenanceContent from "./CustomerEmialMaintenanceContent";
import axios from "axios";
import CustomerEmailMaintenance from "../../../../services/CustomerEmailMaintenanceService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ModalComponent from "../../../common/ModalComponent";
import {
  setNameRedux,
  setEmailRedux,
  setReportsAsPDF,
  setReportsAsCSV,
  setReportsAsExcel,
  setReportsAsText,
  setUnassignedUnitsReport,
  setUnassignedUnitsOutbound,
  setUnassignedUnitsReload,
  setUnassignedUnitsShippersOnly,
  setUnassignedUnitsStorageOnly,
  setYardExitReport,
  setOnRoadReport,
  setDeliveredUnitsReport,
  setBolAtOrderEntry,
  setBolBatchAtExitOrderEntry,
  setbolBatchDaily,
  setbolAtDispatch,
  setCopyOfPAPS,
  setDispatchUpdates,
  setDeliveryOnly,
  setDispatchOnly,
  setReturnedUpdates,
  setSpecialCodeFK,
  setBreakdowns,
  setDamaged,
  setDispatchDelays,
  setShuttleDelays,
  setInvoices,
  setInvoiceBOLOnly,
  setInvoiceDAFOnly,
  setStatements,
  setCreditCardCharges,
  setEditMode,
  setunitInventoryMaster,
  setinvoiceDays,
  setDetailsTabValid,
  setReportsTabValid,
  setIsMailValid,
  setCustomerFKRedux,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumberEmail,
  setSelectedId,
  setDefaultSpecialCodeInput,
  setBolAtOrderEntryDPU,
  setCheckEmailDataValid,
} from "../../../../redux/CustomerEmailMaintenanceSlice";
import {
  setRadioType,
  setSearchType,
  setcustomerData,
} from "../../../../redux/CustomerEmailSearchFilterSlice";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import SpecialCodesService from "../../../../services/SpecialCodesService";
import LoadingIcon from "../../../common/LoadingIcon";

function CustomerEmailFromTamplate() {
  const navigate = useNavigate();
  const { cpk, cupk, pageNumber } = useParams();

  const dispatch = useDispatch();

  const [closeShow, setCloseShow] = useState(false);
  const [closeCancelShow, setCloseCancelShow] = useState(false);
  const [isEditMode, setisEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteDealerPopUp, setDeleteDealer] = useState(false);
  const [cancelEditPopUp, setcancelEditPopUp] = useState(false);
  const [specialCodeId, setSpecialCodeId] = useState(null);
  const [tabName, setTabName] = useState("details");
  const [checkEmailData, setCheckEmailData] = useState("");
  const [diabled, setdiabled] = useState(true);

  const selectedId = useSelector((state) => state.customerEmailMaintenance.selectedId);
  const editMode = useSelector((state) => state.customerEmailMaintenance.editMode);
  const customerfk = useSelector((state) => state.customerEmailMaintenance.customerFK);
  const dispatchTabValid = useSelector((state) => state.customerEmailMaintenance.dispatchTabValid);
  const defaultSpecialCodeInput = useSelector(
    (state) => state.customerEmailMaintenance.defaultSpecialCodeInput
  );
  useEffect(() => {
    if (cpk) {
      dispatch(setCustomerFKRedux(cpk));
    }
  }, [cpk]);

  const [loader, setLoader] = useState(false);
  const [emailExsist, setEmailExsist] = useState("");

  const EditMode = useSelector((state) => state.customerEmailMaintenance.editMode);

  // top close functions

  const handleDelete = () => setDeleteDealer(true);
  const handleDeleteNo = () => setDeleteDealer(false);

  const onHandleCloseNo = () => setCloseShow(false);

  const onHandleCloseShow = () => {
    setCloseShow(true);
    dispatch(setEditMode(false));
    dispatch(setcustomerData([]));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    dispatch(setSelectedId(""));
    dispatch(setPageNumberEmail(0));
    dispatch(setRadioType("Beginning"));
    dispatch(setSearchType(""));
  };

  // on view page cancel button handlers

  const onHandleCancelCloseShow = () => {
    setCloseCancelShow(true);
  };

  const handlecloseCancelNO = () => {
    setCloseCancelShow(false);
  };

  const handlecloseCancelYes = () => {
    navigate("/customer-email-maintenance/" + customerfk + "/" + pageNumber);
    toast.success("Changes Cancelled");
    dispatch(setEditMode(false));
    resetDatas();
  };

  // edit button handler

  const editHanlder = () => {
    dispatch(setEditMode(false));
  };

  // on edit mode cancel buttons

  const editCancelHandler = () => {
    setcancelEditPopUp(true);
  };

  // edit mode cancel butts pop ups
  const handleCancelNo = () => {
    setcancelEditPopUp(false);
  };
  const handleCancelYes = () => {
    dispatch(setEditMode(true));
    setcancelEditPopUp(false);
    toast.success("Changes Cancelled");
    // Reload the saved record to discard edits. editMode is no longer an effect dependency,
    // so this is the only fetch on cancel.
    if (cupk) fetchCustomerEmail();
  };

  // reseting all data function

  const resetDatas = () => {
    dispatch(setNameRedux(""));
    dispatch(setEmailRedux(""));
    dispatch(setReportsAsPDF(false));
    dispatch(setReportsAsCSV(false));
    dispatch(setReportsAsExcel(false));
    dispatch(setReportsAsText(false));
    dispatch(setUnassignedUnitsReport(false));
    dispatch(setUnassignedUnitsOutbound(false));
    dispatch(setUnassignedUnitsReload(false));
    dispatch(setUnassignedUnitsShippersOnly(false));
    dispatch(setUnassignedUnitsStorageOnly(false));
    dispatch(setYardExitReport(false));
    dispatch(setOnRoadReport(false));
    dispatch(setDeliveredUnitsReport(false));
    dispatch(setunitInventoryMaster(false));
    dispatch(setinvoiceDays(""));
    dispatch(setBolAtOrderEntry(false));
    dispatch(setBolAtOrderEntryDPU(false));
    dispatch(setBolBatchAtExitOrderEntry(false));
    dispatch(setbolBatchDaily(false));
    dispatch(setbolAtDispatch(false));
    dispatch(setCopyOfPAPS(false));
    dispatch(setDispatchUpdates(false));
    dispatch(setDeliveryOnly(false));
    dispatch(setDispatchOnly(false));
    dispatch(setReturnedUpdates(false));
    dispatch(setSpecialCodeFK(null));
    dispatch(setDefaultSpecialCodeInput(""));
    dispatch(setSpecialCodeFK(null));
    dispatch(setBreakdowns(false));
    dispatch(setDamaged(false));
    dispatch(setDispatchDelays(false));
    dispatch(setShuttleDelays(false));
    dispatch(setInvoices(false));
    dispatch(setInvoiceBOLOnly(false));
    dispatch(setInvoiceDAFOnly(false));
    dispatch(setStatements(false));
    dispatch(setCreditCardCharges(false));
    dispatch(setIsMailValid(""));
    dispatch(setEditMode(false));
  };

  // new page cancel

  const cancelHandler = () => {
    dispatch(setEditMode(false));
    toast.success("Cancelled");
    resetDatas();
  };

  const fetchInputValueforDefaultSpecialCode = (cpk) => {
    if (cpk) {
      SpecialCodesService.getSpecialCodesById(cpk)
        .then((response) => {
          const data = response.data;
          dispatch(setDefaultSpecialCodeInput(data.description?.trim()));
        })
        .catch((err) => {});
    } else {
      dispatch(setDefaultSpecialCodeInput(""));
    }
  };
  // get data on view page

  const fetchCustomerEmail = () => {
    setLoading(true);
    CustomerEmailMaintenance.getCustomerEmail(cupk)
      .then((res) => {
        const data = res.data;
        dispatch(setNameRedux(data.name?.trim()));
        dispatch(setEmailRedux(data.email?.trim()));
        dispatch(setReportsAsPDF(data.reportsAsPDF));
        dispatch(setReportsAsCSV(data.reportsAsCSV));
        dispatch(setReportsAsExcel(data.reportsAsExcel));
        dispatch(setReportsAsText(data.reportsAsText));
        dispatch(setUnassignedUnitsReport(data.unassignedUnitsReport));
        dispatch(setUnassignedUnitsOutbound(data.unassignedUnitsOutbound));
        dispatch(setUnassignedUnitsReload(data.unassignedUnitsReload));
        dispatch(setUnassignedUnitsShippersOnly(data.unassignedUnitsShippersOnly));
        dispatch(setUnassignedUnitsStorageOnly(data.unassignedUnitsStorageOnly));
        dispatch(setYardExitReport(data.yardExitReport));
        dispatch(setOnRoadReport(data.onRoadReport));
        dispatch(setDeliveredUnitsReport(data.deliveredUnitsReport));
        dispatch(setunitInventoryMaster(data.allUnits));
        dispatch(setinvoiceDays(data.allUnitsInvoiceDays));
        dispatch(setBolAtOrderEntry(data.bolAtOrderEntry));
        dispatch(setBolAtOrderEntryDPU(data.bolAtOrderEntryDpu));
        dispatch(setBolBatchAtExitOrderEntry(data.bolBatchAtExitOrderEntry));
        dispatch(setbolBatchDaily(data.bolBatchDaily));
        dispatch(setbolAtDispatch(data.bolAtDispatch));
        dispatch(setCopyOfPAPS(data.copyOfPAPS));
        dispatch(setDispatchUpdates(data.dispatchUpdates));
        dispatch(setDeliveryOnly(data.deliveryOnly));
        dispatch(setDispatchOnly(data.dispatchOnly));
        dispatch(setReturnedUpdates(data.returnedUpdates));
        dispatch(setSpecialCodeFK(data.specialCodeFK));
        fetchInputValueforDefaultSpecialCode(data.specialCodeFK);
        dispatch(setBreakdowns(data.breakdowns));
        dispatch(setDamaged(data.damaged));
        dispatch(setDispatchDelays(data.dispatchDelays));
        dispatch(setShuttleDelays(data.shuttleDelays));
        dispatch(setInvoices(data.invoices));
        dispatch(setInvoiceBOLOnly(data.invoiceBOLOnly));
        dispatch(setInvoiceDAFOnly(data.invoiceDAFOnly));
        dispatch(setStatements(data.statements));
        dispatch(setCreditCardCharges(data.creditCardCharges));
      })
      .catch((err) => {
        navigate("/customer-email-maintenance/" + customerfk + "/" + pageNumber);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Load only when the record changes; depending on editMode refetched on every Edit/Cancel click.
  useEffect(() => {
    if (cupk) {
      setisEditMode(true);
      fetchCustomerEmail();
    } else {
      resetDatas();
      setisEditMode(false);
    }
  }, [cupk]);

  // close handler

  const onHandleCloseYes = () => {
    if (cupk) {
      navigate("/add-customer/" + customerfk + "/" + pageNumber);

      dispatch(setEditMode(false));
      toast.success("Page Closed");
      dispatch(setEditMode(false));
      dispatch(setcustomerData([]));
      dispatch(setNormalSortFlag(false));
      dispatch(setNormalSortValue(null));
      dispatch(setSelectedId(""));
      dispatch(setPageNumberEmail(0));
      dispatch(setRadioType("Beginning"));
      dispatch(setSearchType(""));
    } else {
      navigate("/add-customer/" + customerfk + "/" + pageNumber);
      toast.success("Page Closed");
      dispatch(setEditMode(false));
      dispatch(setcustomerData([]));
      dispatch(setSelectedId(""));
      resetDatas();
    }
  };

  // delete function

  const handleDeleteYes = () => {
    handleDeleteNo();
    setLoading(true);
    CustomerEmailMaintenance.deleteCustomerEmail(cupk)
      .then((response) => {
        toast.success("Customer Email Deleted");
        dispatch(setEditMode(false));
        resetDatas();
        navigate("/customer-email-maintenance/" + customerfk + "/" + pageNumber);
      })
      .catch((error) => {
        toast.error("Error deleting Customer Email");
        console.log("error.............", error);
      })
      .finally(() => setLoading(false));
  };

  // redux value setting

  const name = useSelector((state) => state.customerEmailMaintenance.name);
  const email = useSelector((state) => state.customerEmailMaintenance.email);
  const reportsAsCSV = useSelector((state) => state.customerEmailMaintenance.reportsAsCSV);
  const reportsAsExcel = useSelector((state) => state.customerEmailMaintenance.reportsAsExcel);
  const reportsAsPDF = useSelector((state) => state.customerEmailMaintenance.reportsAsPDF);
  const reportsAsText = useSelector((state) => state.customerEmailMaintenance.reportsAsText);

  const unassignedUnitsReport = useSelector((state) => state.customerEmailMaintenance.unassignedUnitsReport);
  const unassignedUnitsOutbound = useSelector(
    (state) => state.customerEmailMaintenance.unassignedUnitsOutbound
  );
  const unassignedUnitsReload = useSelector((state) => state.customerEmailMaintenance.unassignedUnitsReload);
  const unassignedUnitsShippersOnly = useSelector(
    (state) => state.customerEmailMaintenance.unassignedUnitsShippersOnly
  );
  const unassignedUnitsStorageOnly = useSelector(
    (state) => state.customerEmailMaintenance.unassignedUnitsStorageOnly
  );
  const yardExitReport = useSelector((state) => state.customerEmailMaintenance.yardExitReport);
  const onRoadReport = useSelector((state) => state.customerEmailMaintenance.onRoadReport);
  const deliveredUnitsReport = useSelector((state) => state.customerEmailMaintenance.deliveredUnitsReport);

  const unitInventoryMaster = useSelector((state) => state.customerEmailMaintenance.unitInventoryMaster);
  const invoiceDays = useSelector((state) => state.customerEmailMaintenance.invoiceDays);

  const bolAtOrderEntry = useSelector((state) => state.customerEmailMaintenance.bolAtOrderEntry);

  const bolAtOrderEntryDPU = useSelector((state) => state.customerEmailMaintenance.bolAtOrderEntryDPU);

  const bolBatchAtExitOrderEntry = useSelector(
    (state) => state.customerEmailMaintenance.bolBatchAtExitOrderEntry
  );
  const bolBatchDaily = useSelector((state) => state.customerEmailMaintenance.bolBatchDaily);
  const bolAtDispatch = useSelector((state) => state.customerEmailMaintenance.bolAtDispatch);

  const copyOfPAPS = useSelector((state) => state.customerEmailMaintenance.copyOfPAPS);
  const dispatchUpdates = useSelector((state) => state.customerEmailMaintenance.dispatchUpdates);
  const deliveryOnly = useSelector((state) => state.customerEmailMaintenance.deliveryOnly);
  const dispatchOnly = useSelector((state) => state.customerEmailMaintenance.dispatchOnly);
  const returnedUpdates = useSelector((state) => state.customerEmailMaintenance.returnedUpdates);
  const specialCodeFK = useSelector((state) => state.customerEmailMaintenance.specialCodeFK);

  const breakdowns = useSelector((state) => state.customerEmailMaintenance.breakdowns);
  const damaged = useSelector((state) => state.customerEmailMaintenance.damaged);
  const dispatchDelays = useSelector((state) => state.customerEmailMaintenance.dispatchDelays);
  const shuttleDelays = useSelector((state) => state.customerEmailMaintenance.shuttleDelays);

  const invoices = useSelector((state) => state.customerEmailMaintenance.invoices);
  const invoiceBOLOnly = useSelector((state) => state.customerEmailMaintenance.invoiceBOLOnly);
  const invoiceDAFOnly = useSelector((state) => state.customerEmailMaintenance.invoiceDAFOnly);
  const statements = useSelector((state) => state.customerEmailMaintenance.statements);
  const creditCardCharges = useSelector((state) => state.customerEmailMaintenance.creditCardCharges);
  const checkEmailValid = useSelector((state) => state.customerEmailMaintenance.checkEmailDataValid);

  const validateAndSave = () => {
    setdiabled(true);
    CustomerEmailMaintenance.checkEmail(email, cupk, customerfk)
      .then((response) => {
        if (response.data) {
          setdiabled(true);
          setCheckEmailData(response.data);
          dispatch(setCheckEmailDataValid(response.data));
        } else {
          handlerSave();
        }
      })
      .catch((err) => {
        setdiabled(true);
      })
      .finally(() => setdiabled(false));
  };

  // tab color change

  useEffect(() => {
    if (
      name &&
      email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/) &&
      (reportsAsCSV || reportsAsExcel || reportsAsPDF || reportsAsText) &&
      !checkEmailValid
    ) {
      dispatch(setDetailsTabValid(true));
    } else {
      dispatch(setDetailsTabValid(false));
    }
  }, [name, email, reportsAsCSV, reportsAsExcel, reportsAsPDF, reportsAsText, checkEmailValid]);

  // second tab color change

  useEffect(() => {
    if (invoiceDays || invoiceDays === 0) {
      dispatch(setReportsTabValid(true));
    } else {
      dispatch(setReportsTabValid(false));
    }
  }, [invoiceDays]);

  // save disable section
  useEffect(() => {
    if (
      name &&
      email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/) &&
      (reportsAsCSV || reportsAsExcel || reportsAsPDF || reportsAsText) &&
      (invoiceDays || invoiceDays === 0) &&
      !checkEmailValid &&
      dispatchTabValid === true
    ) {
      setdiabled(false);
    } else {
      setdiabled(true);
    }
  }, [
    name,
    email,
    reportsAsCSV,
    reportsAsExcel,
    reportsAsPDF,
    reportsAsText,
    invoiceDays,
    checkEmailValid,
    dispatchTabValid,
  ]);

  // save handler

  const handlerSave = () => {
    setLoader(true);
    CustomerEmailMaintenance.create(
      name,
      email,
      customerfk,
      cupk,
      reportsAsText,
      reportsAsExcel,
      reportsAsPDF,
      reportsAsCSV,
      unassignedUnitsReport,
      unassignedUnitsOutbound,
      unassignedUnitsReload,
      unassignedUnitsShippersOnly,
      unassignedUnitsStorageOnly,
      yardExitReport,
      onRoadReport,
      deliveredUnitsReport,
      unitInventoryMaster,
      invoiceDays,
      bolAtOrderEntry,
      bolAtOrderEntryDPU,
      bolBatchAtExitOrderEntry,
      bolBatchDaily,
      bolAtDispatch,
      copyOfPAPS,
      dispatchUpdates,
      deliveryOnly,
      dispatchOnly,
      returnedUpdates,
      specialCodeFK,
      breakdowns,
      damaged,
      dispatchDelays,
      shuttleDelays,
      invoices,
      invoiceBOLOnly,
      invoiceDAFOnly,
      statements,
      creditCardCharges
    )
      .then((res) => {
        const data = res.data;
        if (data != "") {
          setLoader(false);
          setEmailExsist(data);
          dispatch(setIsMailValid(data));
          setTabName("details");
        } else {
          if (cupk) {
            toast.success("Customer Email Updated");
          } else {
            toast.success("Customer Email Created");
          }
          navigate("/customer-email-maintenance/" + customerfk + "/" + pageNumber);

          resetDatas();
          dispatch(setIsMailValid(data));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };

  return (
    <div className={`add-form-component p-0 ${QuarterScreen.container} `}>
      {(loader || loading) && <LoadingIcon />}
      <div className={`border border-dark border-2 ${QuarterScreen.width} `}>
        <div>
          <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
            {!EditMode && (
              <button
                className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
                type=""
                onClick={onHandleCloseShow}
              >
                Close
              </button>
            )}

            {EditMode && (
              <button
                className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
                type=""
                onClick={() => {
                  navigate("/add-customer/" + customerfk + "/" + pageNumber);
                  dispatch(setEditMode(false));
                  dispatch(setcustomerData([]));
                  toast.success("Page Closed");
                  dispatch(setNormalSortFlag(false));
                  dispatch(setNormalSortValue(null));
                  resetDatas();
                  dispatch(setSelectedId(""));
                  dispatch(setPageNumberEmail(0));
                  dispatch(setRadioType("Beginning"));
                  dispatch(setSearchType(""));
                }}
              >
                Close
              </button>
            )}
          </div>

          <div className="col-xs-6">
            <Modal show={closeShow} onHide={onHandleCloseNo} backdrop="static" keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title className="font-18 h-100">Close Customer Email Changes</Modal.Title>
              </Modal.Header>
              <Modal.Body className="font-14 h-100">
                Please confirm you want to close the program without saving your changes
              </Modal.Body>

              <Modal.Footer>
                <Button variant="primary" onClick={onHandleCloseYes}>
                  Yes
                </Button>
                <Button variant="secondary" onClick={onHandleCloseNo}>
                  No
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <div>
          <CustomerEmialMaintenanceContent tabName={tabName} setTabName={setTabName} loading={loading} />
        </div>

        <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
          <div className="d-flex align-items-center flex-wrap m-r-10"></div>
          <div className="d-flex align-items-center flex-wrap">
            {!EditMode && (
              <Button
                onClick={validateAndSave}
                className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
                disabled={diabled}
              >
                Save
              </Button>
            )}

            {EditMode && (
              <ButtonComponent
                route={"/customer-email-maintenance/" + customerfk + "/" + pageNumber}
                label={"Cancel"}
                className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
                onClick={cancelHandler}
              />
            )}

            {!EditMode && (
              <ButtonComponent
                route={""}
                hidden={!isEditMode}
                label={"Cancel"}
                className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
                onClick={editCancelHandler}
              />
            )}

            {!isEditMode && (
              <ButtonComponent
                route={""}
                label={"Cancel"}
                className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
                onClick={onHandleCancelCloseShow}
              />
            )}

            {isEditMode && (
              <ButtonComponent
                route={""}
                hidden={!EditMode}
                className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
                onClick={editHanlder}
                label={"Edit"}
              />
            )}

            {isEditMode && (
              <ButtonComponent
                route={""}
                className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
                onClick={handleDelete}
                hidden={!EditMode}
                label={"Delete"}
              />
            )}

            {/* model Active*/}

            <ModalComponent
              show={deleteDealerPopUp}
              onHide={handleDeleteNo}
              title={"Delete Customer Email"}
              body={"Please confirm you want to Delete this Customer Email"}
              handleYES={handleDeleteYes}
              handleNO={handleDeleteNo}
            />
            <ModalComponent
              show={closeCancelShow}
              onHide={handlecloseCancelNO}
              title={"Cancel Customer Email Changes"}
              body={"   Please confirm you want to cancel the program without saving your changes"}
              handleYES={handlecloseCancelYes}
              handleNO={handlecloseCancelNO}
            />

            <ModalComponent
              show={cancelEditPopUp}
              onHide={handleCancelNo}
              title={"Cancel Customer Email Changes"}
              body={"Please confirm you want to cancel your changes"}
              handleYES={handleCancelYes}
              handleNO={handleCancelNo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerEmailFromTamplate;
