import { t } from "i18next";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import ButtonComponent from "../../../common/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Colors } from "../../../../styles/values/colors";
import ModalComponent from "../../../common/ModalComponent";
import {
  setViewDetail,
  setCustomerFormData,
  toggleChangesCancelled,
  setEditCustomerData,
  setIsCustomerLoading,
  setOnCancel,
  setCustomerMaintananceSpecialCondition,
} from "../../../../redux/CustomerMaintenanceSlice";
import InCompleteCustomerService from "../../../../services/InCompleteCustomerService";
import CustomerService from "../../../../services/CustomerService";
import {
  setCustomerOpenBalanceData,
  openBalanceSearchFilter,
  setCobData,
  setSelecteActiveType,
  setNormalSortFlag as openBalanceNormalSortFlag,
  setNormalSortValue as openBalanceNormalSortValue,
} from "../../../../redux/customerOpenBalanceSlice";
import {
  setSearchCriteria as customerContactSearchCriteria,
  setSearchTerm,
  setId,
  setCustomerContactData,
  setNormalSortFlag as customerContactNormalSortFlag,
  setNormalSortValue as customerContactNormalSortValue,
  setPageNumber as customerContactPageNumber,
} from "../../../../redux/CustomerContactSlice";
import {
  setListingData,
  setPageNumber,
  setSearchCriteria,
  setSearchTerms,
  setDelaySelectedId,
  setNormalSortFlag,
  setNormalSortValue,
} from "../../../../redux/CustomerDelaySlice";
import {
  setSelectedId,
  setNormalSortFlag as emailContactNormalSortFlag,
  setNormalSortValue as emailContactNormalSortValue,
} from "../../../../redux/CustomerEmailMaintenanceSlice";
import { setRadioType, setSearchType } from "../../../../redux/CustomerEmailSearchFilterSlice";
import {
  resetOrderUsers,
  resetChanges as resetOrderUserChanges,
  setPageNumber as setOrderUserPageNo,
} from "../../../../redux/CustomerOrderUsersSlice";
import { setPageNumberEmail } from "../../../../redux/CustomerEmailMaintenanceSlice";
import {
  resetChanges as resetDPUChanges,
  resetDPURestrictions,
  setPageNumber as setDPUPageNo,
} from "../../../../redux/CustomerDPURestrictionsSlice";
import {
  resetChanges as reserCreditChanges,
  setCustomerCreditCardData as setListedCustomerCreditCardData,
  resetCreditCardSearchFilter,
} from "../../../../redux/CustomerCreditCardSlice";
import {
  setSelectedIdInvoice,
  setPageNumberInvoice,
  setNormalSortFlag as InvoiceNormalSortFlag,
  setNormalSortValue as InvoiceNormalSortValue,
  setSearchCriteria as InvoiceSearchCriteria,
  setSearchTerms as InvoiceSearchTerms,
  setSelecteActiveType as InvoiceSelecteActiveType,
} from "../../../../redux/CustomerBulkInvoiceSlice";
import CustomerOrderUsersService from "../../../../services/CustomerOrderUsersService";
import { Button, Modal } from "react-bootstrap";
import DealerService from "../../../../services/DealerService";
import {
  resetCustomerDispatchUsers,
  setCustomerDispatcUserValid,
  setPageNumber as setDispatchUserPageNo,
} from "../../../../redux/CustomerDispatchUsersSlice";
import LoadingIcon from "../../../common/LoadingIcon";

function CustomerMaintananceFormFooter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const incompletecustomerPK = params.incompletecustomerPK;
  const pageNum = params.pageNumber;
  const [disableSave, setdisableSave] = useState(true);
  const [activeShow, setActiveShow] = useState(false);
  const [active, setActive] = useState("");
  const [cancelShow, setCancelShow] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [requirePDIValid, setRequirePDIValid] = useState(false);
  const [deleteErrorMsg, setDeleteErrorMsg] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleActiveShow = () => setActiveShow(true);
  const handleActiveClose = () => setActiveShow(false);
  const handleDelete = () => setDeleteCustomer(true);
  const handleDeleteNo = () => setDeleteCustomer(false);
  const [deleteCustomerPopUp, setDeleteCustomer] = useState(false);

  const IsGeneralTabValid = useSelector((state) => state.customerMaintenanceReducer.IsGeneralTabValid);
  const IsSettingsTabValid = useSelector((state) => state.customerMaintenanceReducer.IsSettingsTabValid);
  const settingNoValidation = useSelector((state) => state.customerMaintenanceReducer.settingNoValidation);
  const IsSettingsBondInfoValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsSettingsBondInfoValid
  );
  const IsOrdersDetailsTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsOrdersDetailsTabValid
  );
  const IsOrdersSettingsTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsOrdersSettingsTabValid
  );
  const IsInvoiceGeneralTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsInvoiceGeneralTabValid
  );
  const IsInvoiceSettingsATabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsInvoiceSettingsATabValid
  );
  const InvoiceSettingsATabNoValidation = useSelector(
    (state) => state.customerMaintenanceReducer.InvoiceSettingsATabNoValidation
  );
  const IsInvoiceSettingsBTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsInvoiceSettingsBTabValid
  );
  const IsInvoiceRatesTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsInvoiceRatesTabValid
  );
  const IsInvoicePaperworkTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsInvoicePaperworkTabValid
  );
  const IsInvoiceStorageTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsInvoiceStorageTabValid
  );
  const IsDelaysDelayTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsDelaysDelayTabValid
  );
  const IsDelaysBreakdownTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsDelaysBreakdownTabValid
  );
  const IsDelaysDamageTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsDelaysDamageTabValid
  );
  const IsDelaysHotlineTabValid = useSelector(
    (state) => state.customerMaintenanceReducer.IsDelaysHotlineTabValid
  );
  const delaysHotlineTabInitialColor = useSelector(
    (state) => state.customerMaintenanceReducer.delaysHotlineTabInitialColor
  );
  const ordersSettingsTabInitialColor = useSelector(
    (state) => state.customerMaintenanceReducer.ordersSettingsTabInitialColor
  );
  const ratesTabInitialColor = useSelector((state) => state.customerMaintenanceReducer.ratesTabInitialColor);
  const StorageInitailColor = useSelector((state) => state.customerMaintenanceReducer.StorageInitailColor);
  const customerFormData = useSelector((state) => state.customerMaintenanceReducer.customerFormData);
  const customerNameExistCheck = useSelector(
    (state) => state.customerMaintenanceReducer.customerNameExistCheck
  );
  const dispatchUser = useSelector((state) => state.customerMaintenanceReducer.dispatchUser);

  const onCancel = useSelector((state) => state.customerMaintenanceReducer.onCancel);

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);

  let dpuCustomer = useSelector((state) => state.customerMaintenanceReducer.dpuCustomer);
  const customerType = useSelector((state) => state.customerMaintenanceReducer.customerType);

  let customerName = useSelector((state) => state.customerMaintenanceReducer.customerName);
  const creditCardPayments = useSelector((state) => state.customerMaintenanceReducer.creditCardPayments);
  const openBalancePayments = useSelector((state) => state.customerMaintenanceReducer.openBalancePayments);
  const openBulkInvoices = useSelector((state) => state.customerMaintenanceReducer.openBulkInvoices);
  const bulkInvoices = useSelector((state) => state.customerMaintenanceReducer.bulkInvoices);
  let websiteLogin = useSelector((state) => state.customerMaintenanceReducer.websiteLogin);
  const orderEntryUsers = useSelector((state) => state.customerMaintenanceReducer.orderEntryUsers);
  const selectedCustomerStatus = useSelector(
    (state) => state.customerSearchFilterReducer.selectedCustomerStatus
  );
  const validInvoicePaymentTab = useSelector(
    (state) => state.customerMaintenanceReducer.validInvoicePaymentTab
  );
  const status = selectedCustomerStatus;
  let customerDPU = useSelector((state) => state.customerMaintenanceReducer.customerDPU);
  const customerMaintananceSpecialCondition = useSelector(
    (state) => state.customerMaintenanceReducer.customerMaintananceSpecialCondition
  );

  useEffect(() => {
    if (
      IsGeneralTabValid &&
      (IsSettingsTabValid || settingNoValidation) &&
      IsOrdersDetailsTabValid &&
      (IsOrdersSettingsTabValid || ordersSettingsTabInitialColor) &&
      IsInvoiceGeneralTabValid &&
      (IsInvoiceSettingsATabValid || InvoiceSettingsATabNoValidation) &&
      IsInvoiceRatesTabValid &&
      IsInvoicePaperworkTabValid &&
      (IsInvoiceStorageTabValid || StorageInitailColor) &&
      (delaysHotlineTabInitialColor || IsDelaysHotlineTabValid) &&
      IsDelaysBreakdownTabValid &&
      IsDelaysDamageTabValid &&
      IsDelaysDelayTabValid &&
      IsInvoiceSettingsBTabValid &&
      (validInvoicePaymentTab === true || validInvoicePaymentTab === null) &&
      (customerType !== "B" || IsSettingsBondInfoValid)
    ) {
      setdisableSave(false);
    } else {
      setdisableSave(true);
    }
  }, [
    IsGeneralTabValid,
    IsSettingsTabValid,
    settingNoValidation,
    IsOrdersDetailsTabValid,
    IsOrdersSettingsTabValid,
    ordersSettingsTabInitialColor,
    IsInvoiceGeneralTabValid,
    IsInvoiceSettingsATabValid,
    IsInvoiceRatesTabValid,
    IsInvoicePaperworkTabValid,
    IsInvoiceStorageTabValid,
    StorageInitailColor,
    delaysHotlineTabInitialColor,
    IsDelaysHotlineTabValid,
    IsDelaysDelayTabValid,
    IsDelaysBreakdownTabValid,
    IsDelaysDamageTabValid,
    IsInvoiceSettingsBTabValid,
    customerType,
    IsSettingsBondInfoValid,
    InvoiceSettingsATabNoValidation,
    validInvoicePaymentTab,
  ]);

  useEffect(() => {
    if (editCustomerData != null && null != editCustomerData.active) {
      setActive(editCustomerData.active);
    }
  }, [editCustomerData]);

  const saveOrUpdateIncompleteCustomer = (e) => {
    setLoader(true);
    InCompleteCustomerService.createCustomer(customerFormData)
      .then((response) => {
        if (incompletecustomerPK) {
          toast.success("Incomplete Customer Details Updated");
        } else {
          toast.success("Incomplete Customer Details Created");
        }
        navigate("/customer-browse-page");
      })
      .catch((error) => {
        navigate("/customer-browse-page");
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const handleActiveSave = (e) => {
    setActiveShow(false);
    if (active === true) {
      deActivateCustomer();
    } else {
      activateCustomer();
    }
  };

  const activateCustomer = () => {
    let pk = editCustomerData.customerPK;
    setLoader(true);
    CustomerService.activateCustomer(pk)
      .then(() => {
        setActiveShow(false);
        setActive(true);
        toast.success("Customer Activated");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoader(false));
  };

  const deActivateCustomer = () => {
    let pk = editCustomerData.customerPK;
    setLoader(true);
    CustomerService.deactivateCustomer(pk)
      .then(() => {
        setActiveShow(false);
        setActive(false);
        toast.success("Customer Deactivated");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => setLoader(false));
  };

  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      navigate("/customer-browse-page", {
        state: { item: id, navValue: true, navPage: pageNum },
      });
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => {
    setCancelShow(false);
    dispatch(setViewDetail(false));
  };

  const handleCancelYes = () => {
    dispatch(setViewDetail(true));
    if (id && status === "Complete") {
      setCancelShow(false);
      dispatch(setCustomerFormData(null));
      dispatch(toggleChangesCancelled());
      dispatch(setOnCancel(true));
      toast.success("Changes Cancelled");
    } else {
      navigate("/customer-browse-page");
      dispatch(setCustomerFormData(null));
      dispatch(setOnCancel(true));
      toast.success("Changes Cancelled");
    }
  };
  const getCustomerById = (id) => {
    if (id) {
      dispatch(setIsCustomerLoading(true));
      CustomerService.getCustomerMaintenanceData(id)
        .then((response) => {
          const data = response?.data;
          dispatch(setEditCustomerData(data));
          dispatch(setIsCustomerLoading(false));
          dispatch(setCustomerMaintananceSpecialCondition(data?.customerMaintananceSpecialCondition));
        })
        .catch((error) => {
          navigate("/customer-browse-page");
          dispatch(setIsCustomerLoading(false));
        });
    }
  };

  const onHandleChangeEditMode = () => {
    dispatch(setViewDetail(false));
    getCustomerById(id);
  };

  const saveOrUpdateCompleteCustomer = (e) => {
    setLoader(true);
    CustomerService.createCustomer({ ...customerFormData, customerMaintananceSpecialCondition })
      .then(() => {
        if (id) {
          toast.success("Customer Details Updated");
        } else {
          toast.success("Customer Details Created");
        }
        navigate("/customer-browse-page");
        dispatch(setViewDetail(true));
      })
      .catch((error) => {
        let errorMessage = "";
        if (error?.response) {
          errorMessage = error?.response?.data?.errorMsg;
        }
        if (errorMessage === null || errorMessage === "" || errorMessage === undefined) {
          errorMessage = "Something Went Wrong !! Failed to Save Customer Record";
        }
        setShowErrorMsg(true);
        setErrorMsg(errorMessage);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleSaveErrorModal = () => {
    setShowErrorMsg(false);
    setErrorMsg("");
    navigate("/customer-browse-page");
  };

  const handleDeleteYes = () => {
    setLoader(true);
    CustomerService.deleteCustomer(editCustomerData.customerPK)
      .then((response) => {
        navigate("/customer-browse-page");
        toast.success("Customer Deleted");
      })
      .catch((error) => {
        setDeleteErrorMsg(error?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
        setErrorShow(true);
      })
      .finally(() => setLoader(false));
    setDeleteCustomer(false);
  };

  const onHandleCustomerContact = (e) => {
    e.preventDefault(e);
    navigate("/customer-contact/" + id + "/" + pageNum);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loader && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10">
        <ButtonComponent
          route={"/contacts-page"}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={" Contacts"}
          hidden={!id || viewDetail === false || status === "InComplete"}
          onClick={(e) => {
            onHandleCustomerContact(e);
            dispatch(customerContactSearchCriteria("Beginning"));
            dispatch(setSearchTerm(""));
            dispatch(customerContactPageNumber(0));
            dispatch(setId(""));
            dispatch(setCustomerContactData([]));
            dispatch(customerContactNormalSortFlag(false));
            dispatch(customerContactNormalSortValue(null));
          }}
        />

        <ButtonComponent
          route={"/customer-delay/" + id + "/" + pageNum}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={"Resources"}
          hidden={!id || viewDetail === false || status === "InComplete"}
          onClick={() => {
            dispatch(setDelaySelectedId(""));
            dispatch(setSearchTerms(""));
            dispatch(setSearchCriteria("Beginning"));
            dispatch(setPageNumber(0));
            dispatch(setListingData([]));
            dispatch(setNormalSortFlag(false));
            dispatch(setNormalSortValue(null));
          }}
        />
        <ButtonComponent
          route={"/customer-email-maintenance/" + id + "/" + pageNum}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={" Emails"}
          hidden={!id || viewDetail === false || status === "InComplete"}
          onClick={() => {
            dispatch(setSelectedId(""));
            dispatch(setSearchType(""));
            dispatch(setRadioType("Beginning"));
            dispatch(setPageNumberEmail(0));
            dispatch(setPageNumber(0));
            dispatch(emailContactNormalSortFlag(false));
            dispatch(emailContactNormalSortValue(null));
          }}
        />

        <ButtonComponent
          route={`/customer-order-users/${id}/${pageNum}`}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={"Order Users"}
          hidden={
            !id ||
            viewDetail === false ||
            orderEntryUsers === "A" ||
            orderEntryUsers === "" ||
            status === "InComplete"
          }
          onClick={() => {
            dispatch(resetOrderUsers());
            dispatch(resetOrderUserChanges());
            dispatch(setOrderUserPageNo(0));
          }}
        />
        <ButtonComponent
          route={`/customer-dpu-restrictions/${id}/${pageNum}`}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={"DPU Restrictions"}
          hidden={!id || viewDetail === false || dpuCustomer === false || status === "InComplete"}
          onClick={() => {
            dispatch(resetDPURestrictions());
            dispatch(resetDPUChanges());
            dispatch(setDPUPageNo(0));
          }}
        />

        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={"Special Codes"}
          hidden={!id || viewDetail === false || websiteLogin === "" || status === "InComplete"}
        />

        <ButtonComponent
          route={`/customer-credit-card/${id}/${pageNum}`}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={"Credit Cards"}
          hidden={
            !id ||
            viewDetail === false ||
            creditCardPayments === "N" ||
            creditCardPayments === "" ||
            status === "InComplete"
          }
          onClick={() => {
            dispatch(resetCreditCardSearchFilter());
            dispatch(reserCreditChanges());
            dispatch(setListedCustomerCreditCardData([]));
          }}
        />

        <ButtonComponent
          route={"/bulk-invoices/" + id + "/" + pageNum}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={"Bulk Invoices"}
          hidden={
            !id ||
            viewDetail === false ||
            openBulkInvoices === true ||
            bulkInvoices === "N" ||
            bulkInvoices === "" ||
            status === "InComplete"
          }
          onClick={() => {
            dispatch(setSelectedIdInvoice(""));
            dispatch(setPageNumberInvoice(0));
            dispatch(InvoiceSearchCriteria("Beginning"));
            dispatch(InvoiceSearchTerms(""));
            dispatch(InvoiceSelecteActiveType("All"));
            dispatch(InvoiceNormalSortFlag(false));
            dispatch(InvoiceNormalSortValue(null));
          }}
        />

        <ButtonComponent
          route={`/customer-open-balance/${id}/${pageNum}`}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={"Open Balances"}
          hidden={
            !id ||
            viewDetail === false ||
            openBalancePayments === "N" ||
            openBalancePayments === "" ||
            status === "InComplete"
          }
          as={Link}
          onClick={() => {
            dispatch(openBalanceSearchFilter());
            dispatch(setCustomerOpenBalanceData([]));
            dispatch(setCobData([]));
            dispatch(openBalanceNormalSortFlag(false));
            dispatch(openBalanceNormalSortValue(null));
            dispatch(setSelecteActiveType("Active"));
          }}
        />
        <ButtonComponent
          route={`/customer-dispatch-users/${id}/${pageNum}`}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={"Dispatch Users"}
          hidden={!id || viewDetail === false || (dispatchUser !== "B" && dispatchUser !== "W")}
          onClick={() => {
            dispatch(resetCustomerDispatchUsers());
            dispatch(setCustomerDispatcUserValid(true));
            dispatch(setDispatchUserPageNo(0));
          }}
        />
      </div>

      <div className="d-flex align-items-center">
        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          label={"Active"}
          hidden={!id || status === "InComplete" || viewDetail === false}
          onClick={handleActiveShow}
          style={active === false ? { backgroundColor: Colors.red } : { backgroundColor: "" }}
        />

        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            hidden={viewDetail === true}
            disabled={
              customerName === "" ||
              (id !== undefined && status === "Complete") ||
              customerNameExistCheck !== ""
            }
            onClick={() => {
              saveOrUpdateIncompleteCustomer();
            }}
          >
            Incomplete
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            hidden={viewDetail === true}
            disabled={disableSave}
            onClick={() => {
              saveOrUpdateCompleteCustomer();
            }}
          >
            Save
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
            type="button"
            onClick={handleCancelShow}
          >
            Cancel
          </button>

          <ButtonComponent
            route={""}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
            hidden={!id || viewDetail === false || status === "InComplete"}
            onClick={onHandleChangeEditMode}
            label={"Edit"}
          />

          <ButtonComponent
            route={""}
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
            hidden={!id || viewDetail === false || status === "InComplete"}
            onClick={handleDelete}
            label={"Delete"}
          />

          {/* model Active*/}
          <ModalComponent
            show={activeShow}
            onHide={handleActiveClose}
            title={active === true ? "Deactivate Customer" : "Activate Customer"}
            body={
              active === true
                ? " Please confirm you want to Deactivate this Customer"
                : " Please confirm you want to Activate this Customer"
            }
            handleYES={handleActiveSave}
            handleNO={handleActiveClose}
          />

          {/* edit Cancel Confirmation Modal */}
          <ModalComponent
            show={cancelShow}
            onHide={handleCancelNo}
            title={"Cancel Customer Changes"}
            body={"Please confirm you want to cancel your changes"}
            handleYES={handleCancelYes}
            handleNO={handleCancelNo}
          />

          {/*Delete confirmation Modal */}
          <ModalComponent
            show={deleteCustomerPopUp}
            onHide={handleDeleteNo}
            title={"Delete Customer"}
            body={"Please confirm you want to Delete this Customer"}
            handleYES={handleDeleteYes}
            handleNO={handleDeleteNo}
          />

          {/* Save Error Modal */}
          <ModalComponent
            show={showErrorMsg}
            onHide={handleSaveErrorModal}
            title={"Warning !!"}
            body={errorMsg}
            handleYES={handleSaveErrorModal}
            showOK
            color="Red"
          />
          <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title className="font-18 h-100 temp-red-color">Delete failed!</Modal.Title>
            </Modal.Header>

            <Modal.Body className="font-14 h-100">{deleteErrorMsg}</Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={() => setErrorShow(false)}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default CustomerMaintananceFormFooter;
