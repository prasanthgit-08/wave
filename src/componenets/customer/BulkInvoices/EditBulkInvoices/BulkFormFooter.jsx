import React, { useState, useEffect } from "react";
import ButtonComponent from "../../../common/Button";
import ModalComponent from "../../../common/ModalComponent";
import CustomerBulkInvoice from "../../../../services/CustomerBulkInvoice";
import CustomerCreditCardService from "../../../../services/CustomerCreditCardService";
import CreditCardModalService from "../../../../services/CreditCardModalService";

import { useDispatch, useSelector } from "react-redux";
import {
  setDescription,
  setPoNumber,
  setChargeCreditCard,
  setCreditCardAddress,
  setCreditCardExpirationDate,
  setCreditCardName,
  setCreditCardNumber,
  setCreditCardPostalCode,
  setProjectCode,
  setNotes,
  setEditModeRedux,
  setInvoiced,
  setCheckDesExist,
  setCheckProCodeExist,
  setCVV,
  setUnMaskedCreditCardNumber,
  setCheckZip,
  setIsInvalidDate,
  setDateErr,
} from "../../../../redux/CustomerBulkInvoiceSlice";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { setShowAddBulkInvoice } from "../../../../redux/OrderEntryFilterSlice";
import LoadingIcon from "../../../common/LoadingIcon";
import { getCurrentCompany } from "../../../../utils/utils";

const BulkFormFooter = (props) => {
  const {
    setCheckDesc,
    checkDesc,
    checkProjectCode,
    setCheckProjectCode,
    onHide,
    OECustomerTab,
    setBulkInvoiceSave,
  } = props;

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const params = useParams();
  const id = params.cpk;
  const pageNum = params.pageNumber;
  const bipk = params.bipk;
  const [disabled, setDisabled] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showDeleteDependency, setShowDeleteDependency] = useState(false);
  const [dependencyError, setDependencyError] = useState("");
  const [saveCancelModal, setSaveCancelModal] = useState(false);
  const [editSaveCancelModal, setEditSaveCancelModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSaveReady, setIsSaveReady] = useState(false);
  const [enteredCreditCard, setEnteredCreditCard] = useState(null);
  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);
  const selectedCustomerFK = useSelector((state) => state.unit.selectedCustomer.customerPK); // currently given tempororary value, will change in future
  const checkDesExist = useSelector((state) => state.orderEntryReducer.checkDesExist);
  const checkProCodeExist = useSelector((state) => state.orderEntryReducer.checkProCodeExist);
  const [load, setLoad] = useState(false);
  const {
    description,
    poNumber,
    projectCode,
    chargeCreditCard,
    notes,
    creditCardNumber,
    creditCardExpirationDate,
    creditCardName,
    creditCardAddress,
    creditCardPostalCode,
    isConfiguredCustomer,
    editModeRedux,
    checkZip,
    isNormalZipValid,
    isCanadianZipValid,

    cvv,
    unMaskedCreditCardNumber,
  } = useSelector((state) => state.customerBulkInvoice);
  const isCardValid = useSelector((state) => state.customerBulkInvoice.isCardValid);
  const isInvalidDate = useSelector((state) => state.customerBulkInvoice.isInvalidDate);

  const dateErr = useSelector((state) => state.customerBulkInvoice.dateErr);

  //used for verification
  const currentCompany = getCurrentCompany();

  const formatExpiryDate = (value) => {
    if (!value) return "";

    const match = value.match(/^(\d{2})\/(\d{2})$/);
    if (!match) return "";

    const month = match[1];
    const year = match[2];

    // basic month validation
    if (Number(month) < 1 || Number(month) > 12) return "";

    return `20${year}-${month}`;
  };
  useEffect(() => {
    setEnteredCreditCard({
      creditCardNumber: unMaskedCreditCardNumber,
      expirationDate: formatExpiryDate(creditCardExpirationDate),
      amount: 0,
      securityCode: cvv,
      company: currentCompany?.name,
      customerFk: id,
    });
  }, [unMaskedCreditCardNumber, creditCardExpirationDate, cvv, id]);

  useEffect(() => {
    const shouldDisable =
      !(description && !checkDesc && !checkProjectCode) ||
      (chargeCreditCard &&
        isConfiguredCustomer &&
        (!unMaskedCreditCardNumber ||
          !cvv ||
          cvv.length < 3 ||
          !creditCardExpirationDate ||
          (creditCardExpirationDate && (creditCardExpirationDate.length !== 5 || dateErr)) ||
          (creditCardPostalCode &&
            (creditCardPostalCode.length < 5 || checkZip || !isNormalZipValid || !isCanadianZipValid))));

    setDisabled(shouldDisable);
  }, [
    description,
    checkDesc,
    checkProjectCode,
    chargeCreditCard,
    unMaskedCreditCardNumber,
    creditCardExpirationDate,
    dateErr,
    checkZip,
    creditCardPostalCode,
    isNormalZipValid,
    isCanadianZipValid,
    cvv,
    isConfiguredCustomer,
  ]);

  const resetDatas = () => {
    dispatch(setDescription(""));
    dispatch(setPoNumber(""));
    dispatch(setProjectCode(""));
    dispatch(setUnMaskedCreditCardNumber(false));
    dispatch(setChargeCreditCard(false));
    dispatch(setNotes(""));
    dispatch(setCreditCardAddress(""));
    dispatch(setCreditCardExpirationDate(""));
    dispatch(setCreditCardName(""));
    dispatch(setCreditCardNumber(""));
    dispatch(setCreditCardPostalCode(""));
    dispatch(setEditModeRedux(false));
    dispatch(setInvoiced(""));
    dispatch(setCVV(""));
    dispatch(setIsInvalidDate(false));
  };

  useEffect(() => {
    if (!bipk) {
      resetDatas();
    }
  }, []);

  const validateAndSave = () => {
    setDisabled(true);
    const cusPK = selectedCustomer?.customerPK || id || selectedCustomerFK;
    // Check Description already exists for a customer
    CustomerBulkInvoice.checkDescriptionExist(bipk, description, cusPK)
      .then((res) => {
        if (res?.data) {
          setDisabled(true);
          dispatch(setCheckDesExist(res?.data));
        } else {
          checkProjectCodeExist();
        }
      })
      .catch((err) => {
        dispatch(setCheckDesExist(""));
      })
      .finally(() => setDisabled(false));
  };

  const checkProjectCodeExist = () => {
    // Check Project Code already exists for a customer
    if (projectCode) {
      CustomerBulkInvoice.checkProjectCodeExist(bipk, projectCode, id)
        .then((res) => {
          if (res?.data) {
            setDisabled(true);
            dispatch(setCheckProCodeExist(res?.data));
          } else {
            validateCreditCard();
          }
        })
        .catch((err) => {
          dispatch(setCheckProCodeExist(""));
          console.log(err);
        });
    } else {
      dispatch(setCheckProCodeExist(""));
      validateCreditCard();
    }
  };

  const validateCreditCard = () => {
    if (chargeCreditCard) {
      setLoad(true);
      CreditCardModalService.verifyCardDetails(enteredCreditCard)

        .then((response) => {
          if (response) {
            const data = response?.data;

            if (data?.transactionResponse?.responseCode === "1") {
              saveHandler();
            } else {
              navigation("/bulk-invoices/" + id + "/" + pageNum);
              toast.error("CreditCard verification failed");
              setLoad(false);
            }
          }
        })
        .catch(() => {
          toast.error("CreditCard verification failed");
          console.log("Error occured during CreditCard Verification");
          setLoad(false);
        });
    } else {
      saveHandler();
    }
  };

  const saveHandler = () => {
    let tempId = id;
    setBulkInvoiceSave && setBulkInvoiceSave(false);
    if (OECustomerTab) {
      tempId = selectedCustomer?.customerPK || selectedCustomerFK;
    }
    setLoading(true);
    CustomerBulkInvoice.createBulkInvoice(
      description,
      poNumber,
      projectCode,
      bipk,
      chargeCreditCard,
      notes,
      unMaskedCreditCardNumber,
      creditCardExpirationDate,
      creditCardName,
      creditCardAddress,
      creditCardPostalCode,
      tempId,
      cvv
    )
      .then((res) => {
        resetDatas();
        if (OECustomerTab) {
          dispatch(setShowAddBulkInvoice(false));
          setBulkInvoiceSave && setBulkInvoiceSave(true);
          onHide && onHide();
        } else {
          navigation("/bulk-invoices/" + id + "/" + pageNum);
        }
        if (bipk) {
          toast.success("Customer Bulk Invoice Updated");
        } else {
          toast.success("Customer Bulk Invoice Created");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteHandler = () => {
    setDeleteModal(true);
  };

  const handleDeleteNo = () => {
    setDeleteModal(false);
  };

  const handleSaveCancelYes = () => {
    navigation("/bulk-invoices/" + id + "/" + pageNum);
    toast.success("Changes Cancelled");
  };

  const handleSaveCancelNo = () => {
    setSaveCancelModal(false);
  };

  const handleEditSaveCancelNo = () => {
    setEditSaveCancelModal(false);
  };

  const handleEditSaveCancelYes = () => {
    dispatch(setEditModeRedux(true));
    setEditSaveCancelModal(false);
    if (bipk) {
      dispatch(setEditModeRedux(true));
      CustomerBulkInvoice.getBulkInvoicesEdit(bipk)
        .then((res) => {
          const data = res?.data;
          dispatch(setDescription(data?.description));
          dispatch(setPoNumber(data?.poNumber));
          dispatch(setProjectCode(data?.projectCode));
          dispatch(setChargeCreditCard(data?.chargeCreditCard));
          dispatch(setNotes(data?.notes));
          dispatch(setCreditCardExpirationDate(data?.creditCardExpirationDate));
          dispatch(setCreditCardName(data?.creditCardName));
          dispatch(setCreditCardAddress(data?.creditCardAddress));
          dispatch(setCreditCardPostalCode(data?.creditCardPostalCode));
          dispatch(setCreditCardNumber(data?.creditCardNumber?.replace(/[0-9](?=.*.{4})/gim, "X")));
          dispatch(setUnMaskedCreditCardNumber(data?.creditCardNumber));
          dispatch(setCVV(data?.creditCardSecurityCode?.trim()));
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to restore original data");
        });
    }

    toast.success("Changes cancelled");
  };

  const handleDeleteYes = () => {
    setLoading(true);
    setDeleteModal(false);
    CustomerBulkInvoice.deleteBulkInvoices(bipk)
      .then((res) => {
        resetDatas();
        navigation("/bulk-invoices/" + id + "/" + pageNum);
        toast.success("Bulk Invoice Deleted ");
      })
      .catch((err) => {
        console.log(err);
        setShowDeleteDependency(true);
        setDependencyError(err?.response?.data?.errorMsg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        {!editModeRedux && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={validateAndSave}
            disabled={disabled}
          >
            Save
          </button>
        )}

        {/* //* save cancel  */}

        {!editModeRedux && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              if (bipk) {
                setEditSaveCancelModal(true);
              } else {
                if (OECustomerTab) {
                  dispatch(setShowAddBulkInvoice(false));
                  dispatch(setIsInvalidDate(false));
                  onHide && onHide();
                } else {
                  setSaveCancelModal(true);
                }
              }
            }}
          >
            Cancel
          </button>
        )}

        {/* //* edit mode buttons   */}

        {editModeRedux && (
          <button
            className="btn  btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              resetDatas();
              toast.success("Cancelled");
              navigation("/bulk-invoices/" + id + "/" + pageNum);
            }}
          >
            {" "}
            Cancel{" "}
          </button>
        )}

        {editModeRedux && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={(e) => {
              dispatch(setEditModeRedux(false));
            }}
          >
            {" "}
            Edit{" "}
          </button>
        )}

        {editModeRedux && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={deleteHandler}
          >
            {" "}
            Delete{" "}
          </button>
        )}

        {/* edit Cancel Confirmation Modal */}

        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteModal}
          onHide={handleDeleteNo}
          title={"Delete Bulk Invoice"}
          body={"Please confirm you want to Delete this Customer Bulk Invoice"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />

        {/*Delete Dependency Modal */}
        <ModalComponent
          show={showDeleteDependency}
          onHide={() => setShowDeleteDependency(false)}
          showOK
          title={"Delete Bulk Invoice"}
          body={dependencyError}
        />

        {/* New page cancel modal  */}

        <ModalComponent
          show={saveCancelModal}
          onHide={handleSaveCancelNo}
          title={"Cancel Bulk Invoice Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleSaveCancelYes}
          handleNO={handleSaveCancelNo}
        />

        <ModalComponent
          show={editSaveCancelModal}
          onHide={handleEditSaveCancelNo}
          title={"Cancel  Bulk Invoice Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleEditSaveCancelYes}
          handleNO={handleEditSaveCancelNo}
        />
      </div>
    </div>
  );
};

export default BulkFormFooter;
