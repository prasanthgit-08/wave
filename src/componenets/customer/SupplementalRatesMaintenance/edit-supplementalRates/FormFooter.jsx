import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ButtonComponent from "../../../../componenets/common/Button";
import ModalComponent from "../../../../componenets/common/ModalComponent";
import SupplementalRatesService from "../../../../services/SupplementalRatesService";
import {
  resetStates,
  setChangesCancelled,
  setCheckDpu,
  setDescription,
  setEditFormData,
  setIsDescriptionUnique,
  setViewDetail,
} from "../../../../redux/SupplementalRatesSlice";
import { Button, Modal } from "react-bootstrap";

function FormFooter() {
  const { supplementalRatesPK, pageNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [disableContinue, setDisableContinue] = useState(true);
  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);

  const editFormData = useSelector((state) => state.supplementalRatesReducer.editFormData);
  const customerUnitTypeGroupId = useSelector(
    (state) => state.supplementalRatesReducer.customerUnitTypeGroupId
  );

  const transportCompanyId = useSelector((state) => state.supplementalRatesReducer.transportCompanyId);
  const dealerGroupId = useSelector((state) => state.supplementalRatesReducer.dealerGroupId);
  const dealerId = useSelector((state) => state.supplementalRatesReducer.dealerId);
  const driverId = useSelector((state) => state.supplementalRatesReducer.driverId);
  const stateGroupsId = useSelector((state) => state.supplementalRatesReducer.stateGroupsId);
  const specialCodeId = useSelector((state) => state.supplementalRatesReducer.specialCodeId);
  const pickupCustomerId = useSelector((state) => state.supplementalRatesReducer.pickupCustomerId);

  const description = useSelector((state) => state.supplementalRatesReducer.description);
  const outbound = useSelector((state) => state.supplementalRatesReducer.outbound);
  const reload = useSelector((state) => state.supplementalRatesReducer.reload);
  const returns = useSelector((state) => state.supplementalRatesReducer.returns);
  const inVoiceRate = useSelector((state) => state.supplementalRatesReducer.inVoiceRate);
  const invoiceFuelSurchargeRate = useSelector(
    (state) => state.supplementalRatesReducer.invoiceFuelSurchargeRate
  );
  const invoiceFullRate = useSelector((state) => state.supplementalRatesReducer.invoiceFullRate);
  const driverRate = useSelector((state) => state.supplementalRatesReducer.driverRate);
  const driverFuelSurchargeRate = useSelector(
    (state) => state.supplementalRatesReducer.driverFuelSurchargeRate
  );
  const driverFullRate = useSelector((state) => state.supplementalRatesReducer.driverFullRate);
  const additional = useSelector((state) => state.supplementalRatesReducer.additional);
  const additionalDescription = useSelector((state) => state.supplementalRatesReducer.additionalDescription);
  const viewDetail = useSelector((state) => state.supplementalRatesReducer.viewDetail);
  const customerId = useSelector((state) => state.supplementalRatesReducer.customerId);
  const customerPlantId = useSelector((state) => state.supplementalRatesReducer.customerPlantId);
  const customerGroupId = useSelector((state) => state.supplementalRatesReducer.customerGroupId);
  const customerPlantGroupId = useSelector((state) => state.supplementalRatesReducer.customerPlantGroupId);
  const isDescriptionUnique = useSelector((state) => state.supplementalRatesReducer.isDescriptionUnique);
  const pickupCustomerPlantId = useSelector((state) => state.supplementalRatesReducer.pickupCustomerPlantId);
  const unitTypeGroupId = useSelector((state) => state.supplementalRatesReducer.unitTypeGroupId);
  const customerUnitTypeGroupInput = useSelector(
    (state) => state.supplementalRatesReducer.customerUnitTypeGroupInput
  );
  const unitTypeGroupInput = useSelector((state) => state.supplementalRatesReducer.unitTypeGroupInput);
  const dealerGroupInput = useSelector((state) => state.supplementalRatesReducer.dealerGroupInput);
  const dealerInput = useSelector((state) => state.supplementalRatesReducer.dealerInput);
  const stateGroupsInput = useSelector((state) => state.supplementalRatesReducer.stateGroupsInput);
  const transportCompanyInput = useSelector((state) => state.supplementalRatesReducer.transportCompanyInput);
  const pickupCustomerInput = useSelector((state) => state.supplementalRatesReducer.pickupCustomerInput);
  const specialCodeInput = useSelector((state) => state.supplementalRatesReducer.specialCodeInput);
  const customerInput = useSelector((state) => state.supplementalRatesReducer.customerInput);
  const pickupCustomerPlantInput = useSelector(
    (state) => state.supplementalRatesReducer.pickupCustomerPlantInput
  );
  const customerPlantInput = useSelector((state) => state.supplementalRatesReducer.customerPlantInput);
  const customerPlantGroupInput = useSelector(
    (state) => state.supplementalRatesReducer.customerPlantGroupInput
  );
  const customerGroupInput = useSelector((state) => state.supplementalRatesReducer.customerGroupInput);
  const additionalFlatRate = useSelector((state) => state.supplementalRatesReducer.additionalFlatRate);
  const invoiceAdditionalFlatRate = useSelector(
    (state) => state.supplementalRatesReducer.invoiceAdditionalFlatRate
  );
  const driverAdditionalFlatRate = useSelector(
    (state) => state.supplementalRatesReducer.driverAdditionalFlatRate
  );
  const unitTypeInput = useSelector((state) => state.supplementalRatesReducer.unitTypeInput);
  const unitTypeId = useSelector((state) => state.supplementalRatesReducer.unitTypeId);
  const driverInput = useSelector((state) => state.supplementalRatesReducer.driverInput);

  const formData = {
    supplementalRatePK: supplementalRatesPK,
    description,
    invoiceRate: inVoiceRate,
    invoiceFuelSurchargeRate,
    invoiceFullRate,
    driverRate,
    driverFuelSurchargeRate,
    driverFullRate,
    additional,
    additionalDescription,
    additionalFlatRate,
    invoiceAdditionalFlatRate,
    driverAdditionalFlatRate,
    customerId: customerId,
    customerPlantId: customerPlantId,
    customerPlantGroupId: customerPlantGroupId,
    customerGroupId: customerGroupId,
    customerUnitTypeGroupFK: customerUnitTypeGroupId,
    unitTypeGroupFK: unitTypeGroupId,
    unitTypeFK: unitTypeId,
    dealerGroupFK: dealerGroupId,
    stateGroupFK: stateGroupsId,
    dealerFK: dealerId,
    driverFK: driverId,
    pickupCustomerFK: pickupCustomerId,
    pickupCustomerPlantFK: pickupCustomerPlantId,
    specialCodeFK: specialCodeId,
    transportCompanyFK: transportCompanyId,
    outbound: outbound,
    reload: reload,
    returns: returns,
  };
  const currentURL = window.location.pathname;
  //starting save funtionality
  const saveRecord = () => {
    SupplementalRatesService.createOrUpdateRecord(formData)
      .then((res) => {
        navigate(`/supplemental-rates`);
        if (supplementalRatesPK) toast.success("Supplemental Rate  Updated");
        else toast.success("Supplemental Rate Created");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };
  const handleContinue = () => {
    if (supplementalRatesPK) {
      dispatch(setEditFormData(undefined));

      navigate(`/supplemental-rates-add/${supplementalRatesPK}/${pageNumber}`);
    } else {
      dispatch(setEditFormData(undefined));

      navigate(`/supplemental-rates-new`);
      dispatch(setCheckDpu(false));
    }
  };

  const handleCancel = () => {
    if (viewDetail === false || supplementalRatesPK === undefined) {
      setCancelShow(true);
      dispatch(setChangesCancelled(true));
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate(`/supplemental-rates`);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (supplementalRatesPK) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setChangesCancelled(true));

      toast.success("Changes Cancelled");
    } else {
      navigate(`/supplemental-rates`);
      dispatch(setViewDetail(false));
      dispatch(resetStates());
      toast.success("Changes Cancelled");
    }
  };

  const hanldeCheckDescription = () => {
    return SupplementalRatesService.checkDescriptionExist(supplementalRatesPK, description)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        console.log(err);
        return true;
      });
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    SupplementalRatesService.deleteRecord(supplementalRatesPK)
      .then((response) => {
        navigate(`/supplemental-rates`);
        toast.success("Supplemental Rate Deleted");
        dispatch(resetStates());
      })
      .catch((err) => {
        setErrorShow(true);
        setErrorMsg(err?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
        console.error(err?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };

  useEffect(() => {
    if (customerId || customerPlantGroupId || customerPlantId || customerGroupId) {
      setDisableContinue(false);
    } else {
      setDisableContinue(true);
    }
  }, [customerId, customerPlantGroupId, customerPlantId, customerGroupId]);

  const isDecimalInvalid = (value) => {
    const strVal = value?.toString() || "";
    return strVal === "." || strVal === "0." || strVal?.endsWith(".");
  };

  useEffect(() => {
    const hasInvalidDecimal =
      isDecimalInvalid(inVoiceRate) ||
      isDecimalInvalid(driverRate) ||
      isDecimalInvalid(invoiceFuelSurchargeRate) ||
      isDecimalInvalid(driverFuelSurchargeRate) ||
      isDecimalInvalid(driverAdditionalFlatRate) ||
      isDecimalInvalid(invoiceAdditionalFlatRate);

    if (
      description &&
      isDescriptionUnique &&
      (outbound || reload || returns) &&
      (!additional || unitTypeGroupId || customerUnitTypeGroupId || unitTypeId) &&
      (((dealerGroupId !== null ||
        dealerId !== null ||
        stateGroupsId !== null ||
        transportCompanyId !== null ||
        specialCodeId !== null ||
        driverId ||
        pickupCustomerId !== null ||
        pickupCustomerPlantId !== null) &&
        (customerUnitTypeGroupId !== null ||
          unitTypeGroupId !== null ||
          unitTypeId !== null ||
          driverId !== null ||
          transportCompanyId !== null ||
          specialCodeId !== null)) ||
        additional) &&
      (customerId || customerPlantGroupId || customerPlantId || customerGroupId) &&
      Boolean(customerUnitTypeGroupInput) === Boolean(customerUnitTypeGroupId) &&
      Boolean(unitTypeGroupInput) === Boolean(unitTypeGroupId) &&
      Boolean(unitTypeInput) === Boolean(unitTypeId) &&
      Boolean(dealerGroupInput) === Boolean(dealerGroupId) &&
      Boolean(dealerInput) === Boolean(dealerId) &&
      Boolean(driverInput) === Boolean(driverId) &&
      Boolean(stateGroupsInput) === Boolean(stateGroupsId) &&
      Boolean(transportCompanyInput) === Boolean(transportCompanyId) &&
      Boolean(specialCodeInput) === Boolean(specialCodeId) &&
      Boolean(pickupCustomerInput) === Boolean(pickupCustomerId) &&
      Boolean(pickupCustomerPlantInput) === Boolean(pickupCustomerPlantId) &&
      Boolean(pickupCustomerPlantInput) === Boolean(pickupCustomerPlantId) &&
      Boolean(customerInput) === Boolean(customerId) &&
      Boolean(customerPlantInput) === Boolean(customerPlantId) &&
      Boolean(customerPlantInput) === Boolean(customerPlantId) &&
      Boolean(customerPlantGroupInput) === Boolean(customerPlantGroupId) &&
      Boolean(customerGroupInput) === Boolean(customerGroupId) &&
      Boolean(additional) === Boolean(additionalDescription) &&
      (!additional ||
        (additional && additionalFlatRate) ||
        (additional && (inVoiceRate > 0 || driverRate > 0))) &&
      (reload || outbound || returns) &&
      (!additionalFlatRate ||
        (parseFloat(driverAdditionalFlatRate) > 0.0 && parseFloat(invoiceAdditionalFlatRate) > 0.0)) &&
      !hasInvalidDecimal
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    description,
    isDescriptionUnique,
    outbound,
    reload,
    returns,
    additional,
    unitTypeGroupId,
    customerUnitTypeGroupId,
    transportCompanyId,
    specialCodeId,
    dealerGroupId,
    dealerId,
    stateGroupsId,
    customerUnitTypeGroupInput,
    unitTypeGroupInput,
    dealerGroupInput,
    dealerInput,
    stateGroupsInput,
    transportCompanyInput,
    specialCodeInput,
    pickupCustomerInput,
    pickupCustomerId,
    pickupCustomerPlantId,
    pickupCustomerPlantInput,
    customerInput,
    customerId,
    customerPlantId,
    customerPlantInput,
    customerPlantGroupId,
    customerPlantGroupInput,
    customerGroupInput,
    customerGroupId,
    additionalDescription,
    additionalFlatRate,
    invoiceAdditionalFlatRate,
    driverAdditionalFlatRate,
    inVoiceRate,
    driverRate,
    unitTypeId,
    unitTypeInput,
    driverId,
    driverInput,
    invoiceFuelSurchargeRate,
    driverFuelSurchargeRate,
  ]);

  const handleSaveClick = async () => {
    const isDescriptionUnique = await hanldeCheckDescription(); // directly waiting for API response
    if (isDescriptionUnique) {
      saveRecord();
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap"></div>

      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={
            currentURL === `/supplemental-rates-add/${supplementalRatesPK}/${pageNumber}` ||
            currentURL === `/supplemental-rates-new/${supplementalRatesPK}/${pageNumber}` ||
            currentURL === `/supplemental-rates-new`
          }
          onClick={() => handleContinue()}
          disabled={disableContinue}
        >
          Continue
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={
            viewDetail ||
            currentURL === `/supplemental-rates-customer-selection/${supplementalRatesPK}/${pageNumber}` ||
            currentURL === `/supplemental-rates-customer-new`
          }
          disabled={disableSave}
          onClick={handleSaveClick}
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
          hidden={
            !viewDetail ||
            currentURL === `/supplemental-rates-customer-selection/${supplementalRatesPK}/${pageNumber} `
          }
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
        />
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={
            !viewDetail ||
            currentURL === `/supplemental-rates-customer-selection/${supplementalRatesPK}/${pageNumber}`
          }
          onClick={handleDelete}
          disabled={""}
        >
          Delete
        </button>

        {/* model Active*/}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel  Supplemental Rate Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Supplemental Rate"}
          body={"Please confirm you want to Delete this Supplemental Rate"}
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
