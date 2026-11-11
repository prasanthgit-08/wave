import React, { useState, useEffect } from "react";
import ButtonComponent from "../../../common/Button";
import { t } from "i18next";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {
  setViewDetail,
  resetChanges,
  toggleChangesCancelled,
  setCardNumber,
  setExpirationDate,
  setCheckCardNumber,
  setCardTest,
  setDateMessage,
  setCheckZip,
  setCardBillingZipcode,
} from "../../../../redux/CustomerCreditCardSlice";
import ModalComponent from "../../../common/ModalComponent";
import CustomerCreditCardService from "../../../../services/CustomerCreditCardService";
import CustomerService from "../../../../services/CustomerService";
import DeleteComponent from "../../../common/DeleteComponent";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import { Button, Modal } from "react-bootstrap";
import CreditCardModalService from "../../../../services/CreditCardModalService";
import { getCurrentCompany } from "../../../../utils/utils";

const CustomerCreditCardFooter = () => {
  const { id } = useParams();
  const params = useParams();
  const customerId = params.customerId;
  const customerCreditCardPK = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [enteredCreditCard, setEnteredCreditCard] = useState(null);
  const [load, setLoad] = useState(false);
  const currentCompany = getCurrentCompany();

  const customerCreditEditData = useSelector(
    (state) => state.customerCreditCardReducer.customerCreditEditData
  );
  const viewDetail = useSelector((state) => state.customerCreditCardReducer.viewDetail);
  const editCustomerCreditCardData = useSelector(
    (state) => state.customerCreditCardReducer.customerCreditCards
  );
  const checkCardNumber = useSelector((state) => state.customerCreditCardReducer.checkCardNumber);

  const dateMessage = useSelector((state) => state.customerCreditCardReducer.dateMessage);

  const nameOnCard = useSelector((state) => state.customerCreditCardReducer.nameOnCard);
  const cardBillingAddress = useSelector((state) => state.customerCreditCardReducer.cardBillingAddress);
  const cardNumber = useSelector((state) => state.customerCreditCardReducer.cardNumber);
  const expirationDate = useSelector((state) => state.customerCreditCardReducer.expirationDate);
  const cardBillingZipcode = useSelector((state) => state.customerCreditCardReducer.cardBillingZipcode);
  const primaryCard = useSelector((state) => state.customerCreditCardReducer.primaryCard);
  const checkPrimary = useSelector((state) => state.customerCreditCardReducer.checkPrimary);
  const cardTest = useSelector((state) => state.customerCreditCardReducer.cardTest);
  const checkZip = useSelector((state) => state.customerCreditCardReducer.checkZip);
  const pageNumber = useSelector((state) => state.customerCreditCardReducer.pageNumber);
  const cvv = useSelector((state) => state.customerCreditCardReducer.cvv);
  const totalElements = useSelector((state) => state.customerCreditCardReducer.totalElements);

  //save
  const saveOrUpdateCustomerCreditCard = () => {
    setLoad(true);
    CustomerCreditCardService.createCustomerCreditCards(editCustomerCreditCardData)
      .then((response) => {
        //unchecking previous primarycard before save

        if (checkPrimary !== "" && primaryCard === true) {
          cancelPrimary();
        }

        navigate("/customer-credit-card/" + customerId + "/" + pageNumber);
        if (id) {
          toast.success("Customer Credit Card Updated");
        } else {
          toast.success("Customer Credit Card Created");
        }
        setLoad(false);
      })
      .catch((err) => {
        navigate("/customer-credit-card/" + customerId + "/" + pageNumber);
        toast.error("Something went wrong");
        setLoad(false);
      });
  };

  const cancelPrimary = () => {
    CustomerCreditCardService.cancelPrimary(checkPrimary)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const [can, setCan] = useState();
  const getCanadianorUs = () =>
    CustomerService.getCustomerById(customerId).then((response) => {
      const data = response.data;
      setCan(data.canadian);
    });
  useEffect(() => {
    getCanadianorUs();
  }, []);

  const dateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/gm;
  useEffect(() => {
    if (can) {
      if (
        cardNumber !== "" &&
        nameOnCard !== "" &&
        expirationDate !== "" &&
        expirationDate.match(dateRegex) &&
        !checkCardNumber &&
        cvv?.length > 2 &&
        !dateMessage &&
        (!cardBillingZipcode ||
          (cardBillingZipcode && cardBillingZipcode.match(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/) && !checkZip))
      ) {
        setDisableSave(false);
      } else {
        setDisableSave(true);
      }
    } else {
      if (
        cardNumber !== "" &&
        nameOnCard !== "" &&
        expirationDate !== "" &&
        expirationDate.match(dateRegex) &&
        !checkCardNumber &&
        cvv?.length > 2 &&
        !dateMessage &&
        (!cardBillingZipcode ||
          (cardBillingZipcode && cardBillingZipcode.match(/^((\d{5}-\d{4})|(\d{5}))$/) && !checkZip))
      ) {
        setDisableSave(false);
      } else {
        setDisableSave(true);
      }
    }
  }, [
    cardNumber,
    nameOnCard,
    expirationDate,
    checkCardNumber,
    checkZip,
    cardBillingZipcode,
    cvv,
    dateMessage,
    checkZip,
  ]);

  //cancel
  const handleCancelShow = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/customer-credit-card/" + customerId + "/" + pageNumber);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setCheckCardNumber(""));
      dispatch(setCardTest(""));
      dispatch(setDateMessage(false));
      dispatch(setCardBillingZipcode(""));
      dispatch(setCheckZip(""));
      dispatch(toggleChangesCancelled());
      toast.success("Changes Cancelled");
    } else {
      navigate("/customer-credit-card/" + customerId + "/" + pageNumber);
      dispatch(setViewDetail(false));
      dispatch(resetChanges());
      toast.success("Changes Cancelled");
    }
  };

  //Delete customercreditcard
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setLoad(true);
    CustomerCreditCardService.deleteCustomerCreditCard(customerCreditCardPK)
      .then((response) => {
        navigate("/customer-credit-card/" + customerId + "/" + pageNumber);
        toast.success("Customer Credit Card Deleted");
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err.response.data.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(err.response.data.errorMsg);
      })
      .finally(() => setLoad(false));
    setDeleteShow(false);
  };

  // for primary card deletion

  const handleShow = () => setShow(true);
  const DeletePrimaryOk = () => {
    setShow(false);
  };

  const validateAndSave = () => {
    setLoad(true);

    CustomerCreditCardService.validateSave(customerId, cardNumber, customerCreditCardPK, cardBillingZipcode)
      .then((response) => {
        if (response.data) {
          setDisableSave(response.data);
          setLoad(false);
        } else {
          CreditCardModalService.verifyCardDetails(enteredCreditCard)

            .then((response) => {
              if (response) {
                const data = response?.data;
                if (data?.transactionResponse?.responseCode === "1") {
                  saveOrUpdateCustomerCreditCard();
                } else {
                  navigate("/customer-credit-card/" + customerId + "/" + pageNumber);
                  toast.error("CreditCard verification failed");
                  setLoad(false);
                }
              }
            })
            .catch(() => {
              console.log("Error occured during CreditCard Verification");
              setLoad(false);
            });
        }
      })
      .catch((err) => {
        console.error("Error during validation or verification:", err);
        setDisableSave(true);
        setLoad(false);
      });
  };

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
  //used for verification
  useEffect(() => {
    setEnteredCreditCard({
      creditCardNumber: cardNumber,
      expirationDate: formatExpiryDate(expirationDate),
      amount: 0,
      securityCode: cvv,
      company: currentCompany?.name,
      customerFk: customerId,
    });
  }, [cardNumber, expirationDate, cvv, customerId, currentCompany?.name]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={t("edit.CustomerCreditCard.page.resources.tab.save")}
          hidden={viewDetail === true}
          disabled={disableSave}

          onClick={validateAndSave}
        >
          Save
        </button>

        <button
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={t("edit.CustomerCreditCard.page.resources.tab.cancel")}
          type="button"
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={t("edit.CustomerCreditCard.page.resources.tab.edit")}
          hidden={!id || viewDetail === false}
          onClick={() => dispatch(setViewDetail(false))}
        />

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          label={t("edit.CustomerCreditCard.page.resources.tab.delete")}
          hidden={!id || viewDetail === false}

          onClick={() => {
            if (primaryCard === true && totalElements !== 1) {
              handleShow();
            } else if (
              (totalElements === 1 && primaryCard === true) ||
              (primaryCard !== true && totalElements !== 1)
            ) {
              handleDelete();
            }
          }}
        />
        {/* edit Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Customer Credit Card Cancel  Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Customer Credit Card"}
          body={"Please confirm you want to Delete this Customer Credit Card"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        <DeleteComponent
          show={show}
          onHide={DeletePrimaryOk}
          title={"Warning:"}
          body={"Make another card as primary to delete this card"}
          handleOK={DeletePrimaryOk}
        />
        <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Delete failed!</Modal.Title>
          </Modal.Header>

          <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={() => setErrorShow(false)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
        {load && (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerCreditCardFooter;
