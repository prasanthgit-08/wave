import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../../../componenets/common/Button";
import ModalComponent from "../../../../componenets/common/ModalComponent";
import {
  resetGeneralTab,
  resetLengthTab,
  resetMinimumTab,
  resetStates,
  resetSurchargesTab,
  setChangesCancelled,
  setCustomerFK,
  setCustomerGroupId,
  setCustomerId,
  setCustomerInvoicePercentage,
  setCustomerPlantGroupId,
  setCustomerPlantId,
  setCustomerUnitTypeGroupId,
  setEditFormData,
  setIsSelectedDuplicate,
  setViewDetail,
} from "../../../../redux/CustomerRatesSlice";
import { Button, Modal } from "react-bootstrap";
import CustomerRatesService from "../../../../services/CustomerRatesService";
function FormFooter() {
  const { customerRatePK, pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [disableContinue, setDisableContinue] = useState(true);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const customerRatesData = useSelector((state) => state.customerRatesReducer.customerRatesData);
  const editFormData = useSelector((state) => state.customerRatesReducer.editFormData);
  const viewDetail = useSelector((state) => state.customerRatesReducer.viewDetail);
  const customerId = useSelector((state) => state.customerRatesReducer.customerId);
  const customerPlantId = useSelector((state) => state.customerRatesReducer.customerPlantId);
  const customerPlantGroupId = useSelector((state) => state.customerRatesReducer.customerPlantGroupId);
  const customerGroupId = useSelector((state) => state.customerRatesReducer.customerGroupId);
  const customerUnitTypeGroupId = useSelector((state) => state.customerRatesReducer.customerUnitTypeGroupId);
  const isMinimumTabValid = useSelector((state) => state.customerRatesReducer.isMinimumTabValid);
  const isTiersLengthTabValid = useSelector((state) => state.customerRatesReducer.isTiersLengthTabValid);
  const isGeneralTabValid = useSelector((state) => state.customerRatesReducer.isGeneralTabValid);
  const isTiersMileageTabValid = useSelector((state) => state.customerRatesReducer.isTiersMileageTabValid);
  const isTiersFlatRateTabValid = useSelector((state) => state.customerRatesReducer.isTiersFlatRateTabValid);
  const isTiersTabValid = useSelector((state) => state.customerRatesReducer.isTiersTabValid);
  const isSurchargesTabValid = useSelector((state) => state.customerRatesReducer.isSurchargesTabValid);
  const useLengthTiers = useSelector((state) => state.customerRatesReducer.useLengthTiers);
  const useMilageTiers = useSelector((state) => state.customerRatesReducer.useMilageTiers);
  const flatRateTiers = useSelector((state) => state.customerRatesReducer.flatRateTiers);
  const customerUnitTypeGroupInput = useSelector(
    (state) => state.customerRatesReducer.customerUnitTypeGroupInput
  );
  const isSelectedDuplicate = useSelector((state) => state.customerRatesReducer.isSelectedDuplicate);
  const [loading, setLoading] = useState(false);

  const currentURL = window.location.pathname;
  /*Continue Button*/
  const handleContinue = () => {
    if (customerRatePK) {
      dispatch(setEditFormData(undefined));
    } else {
      dispatch(setEditFormData(undefined));
      dispatch(resetGeneralTab());
      dispatch(resetLengthTab());
      dispatch(resetMinimumTab());
      dispatch(resetSurchargesTab());
      navigate(`/customer-rates/new-record`);
    }
  };
  /*Save Validation*/
  useEffect(() => {
    if (
      isGeneralTabValid === true &&
      ((!flatRateTiers && !useMilageTiers) ||
        (useMilageTiers && flatRateTiers && isTiersFlatRateTabValid === true) ||
        (useMilageTiers && isTiersMileageTabValid === true)) &&
      isMinimumTabValid === true &&
      (!useLengthTiers || (useLengthTiers && isTiersLengthTabValid === true)) &&
      isSurchargesTabValid === true
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    isGeneralTabValid,
    isTiersLengthTabValid,
    isTiersFlatRateTabValid,
    isTiersMileageTabValid,
    isMinimumTabValid,
    isSurchargesTabValid,
  ]);
  /*Save Customer Rates Record*/
  const saveRecord = () => {
    setLoading(true);
    CustomerRatesService.createOrUpdateCustomerRates(customerRatesData)
      .then((response) => {
        navigate(`/customer-rates`);
        dispatch(setCustomerId(""));
        dispatch(setCustomerPlantId(""));
        dispatch(setCustomerPlantGroupId(""));
        dispatch(setCustomerGroupId(""));
        dispatch(setCustomerUnitTypeGroupId(""));
        setLoading(false);
        if (customerRatePK) {
          toast.success("Customer Rate  Updated");
        } else {
          toast.success("Customer Rate Created");
        }
      })
      .catch((error) => {
        navigate("/customer-rates");
        if (customerRatePK) {
          toast.error("Failed to Update Customer Rate");
        } else {
          toast.error("Failed to Create Customer Rate");
        }
        setLoading(false);
      });
  };
  const handleCancel = () => {
    dispatch(setCustomerFK(""));
    if (viewDetail === false || customerRatePK === undefined) {
      setCancelShow(true);
      dispatch(setChangesCancelled(true));
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate(`/customer-rates`);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (customerRatePK) {
      dispatch(setCustomerId(""));
      dispatch(setCustomerPlantId(""));
      dispatch(setCustomerPlantGroupId(""));
      dispatch(setCustomerGroupId(""));
      dispatch(setCustomerInvoicePercentage(""));
      dispatch(setCustomerUnitTypeGroupId(""));
      setCancelShow(false);
      dispatch(setChangesCancelled(true));
      dispatch(setViewDetail(true));
      dispatch(setIsSelectedDuplicate(false));
      toast.success("Changes Cancelled");
    } else {
      dispatch(setCustomerId(""));
      dispatch(setCustomerPlantId(""));
      dispatch(setCustomerPlantGroupId(""));
      dispatch(setCustomerGroupId(""));
      dispatch(setCustomerInvoicePercentage(""));
      dispatch(setCustomerUnitTypeGroupId(""));
      navigate(`/customer-rates`);
      dispatch(setViewDetail(false));
      dispatch(resetStates());
      dispatch(setIsSelectedDuplicate(false));

      toast.success("Changes Cancelled");
    }
  };
  /*Delete CUstomer Rates Record*/
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    CustomerRatesService.deleteCustomerRates(customerRatePK)
      .then((response) => {
        navigate(`/customer-rates`);
        toast.success("Customer Rate Deleted");
        dispatch(resetStates());
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };

  useEffect(() => {
    if (
      (customerId && customerUnitTypeGroupId && customerUnitTypeGroupInput) ||
      (customerPlantGroupId && customerUnitTypeGroupId && customerUnitTypeGroupInput) ||
      (customerPlantId && customerUnitTypeGroupId && customerUnitTypeGroupInput) ||
      (customerGroupId && customerUnitTypeGroupId && customerUnitTypeGroupInput) ||
      (customerId && customerUnitTypeGroupId === null && !customerUnitTypeGroupInput) ||
      (customerPlantId && customerUnitTypeGroupId === null && !customerUnitTypeGroupInput) ||
      (customerPlantGroupId && customerUnitTypeGroupId === null && !customerUnitTypeGroupInput) ||
      (customerGroupId && customerUnitTypeGroupId === null && !customerUnitTypeGroupInput)
    ) {
      setDisableContinue(false);
    } else {
      setDisableContinue(true);
    }
  }, [
    customerId,
    customerPlantGroupId,
    customerPlantId,
    customerGroupId,
    customerUnitTypeGroupId,
    customerUnitTypeGroupInput,
  ]);
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap"></div>
      {loading && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
      <div className="d-flex align-items-center flex-wrap">
        {currentURL === `/customer-rates/new-record/${customerRatePK}/${pageNumber}` ? (
          ""
        ) : (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            hidden={
              currentURL === `/customer-rates/new-record` ||
              currentURL === `/customer-rates/new-record/${customerRatePK}/${pageNumber}`
            }
            onClick={() => handleContinue()}
            disabled={disableContinue || isSelectedDuplicate}
          >
            Continue
          </button>
        )}

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail || currentURL === `/customer-rates-customer-new`}
          onClick={() => saveRecord()}
          disabled={disableSave}
        >
          Save
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={""}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Edit"}
          hidden={!viewDetail || currentURL === `/customer-rates-customer-new`}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
        />
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!viewDetail || currentURL === `/customer-rates-customer-new`}
          onClick={handleDelete}
          disabled={""}
        >
          Delete
        </button>

        {/* model Active*/}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Customer Rate Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Customer Rate"}
          body={"Please confirm you want to Delete this Customer Rate"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
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
        {/* model Active*/}
      </div>
    </div>
  );
}
export default FormFooter;
