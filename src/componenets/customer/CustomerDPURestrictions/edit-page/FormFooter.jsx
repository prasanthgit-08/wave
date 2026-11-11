import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetChanges,
  resetDPURestrictions,
  setDuplicateCustomerError,
  setDuplicatePlantError,
  setIsEdit,
  setPickupCustomerFK,
  setPickupCustomerPlantFK,
  setSelectedCustomerId,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../redux/CustomerDPURestrictionsSlice";
import CustomerDPURestrictionsService from "../../../../services/CustomerDPURestrictionsService";
import ButtonComponent from "../../../common/Button";
import ModalComponent from "../../../common/ModalComponent";
import { setSelectedCustomerPlantId } from "../../../../redux/OrderEntryFilterSlice";
import LoadingIcon from "../../../common/LoadingIcon";
const FormFooter = ({ styles }) => {
  const { customerId, customerPageNo, recordId } = useParams();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);

  const viewDetail = useSelector((state) => state.customerDPURestrictions.viewDetail);
  const customerDPURestrictionPK = useSelector(
    (state) => state.customerDPURestrictions.customerDPURestrictionPK
  );
  const isEdit = useSelector((state) => state.customerDPURestrictions.isEdit);
  const pickupCustomerFK = useSelector((state) => state.customerDPURestrictions.pickupCustomerFK);
  const pickupCustomerFKCopy = useSelector((state) => state.customerDPURestrictions.pickupCustomerFKCopy);
  const selectedPlantId = useSelector((state) => state.customerDPURestrictions.selectedPlantId);
  const pickupCustomerPlantFK = useSelector((state) => state.customerDPURestrictions.pickupCustomerPlantFK);
  const notes = useSelector((state) => state.customerDPURestrictions.notes);
  const duplicateCustomer = useSelector((state) => state.customerDPURestrictions.duplicateCustomer);
  const duplicatePlant = useSelector((state) => state.customerDPURestrictions.duplicatePlant);
  const duplicateCustomerError = useSelector((state) => state.customerDPURestrictions.duplicateCustomerError);
  const duplicatePlantError = useSelector((state) => state.customerDPURestrictions.duplicatePlantError);

  let pickupCustomerFormatted =
    pickupCustomerFKCopy != null ? pickupCustomerFKCopy : parseInt(pickupCustomerFK);

  const formData = {
    customerDPURestrictionPK: customerDPURestrictionPK,
    customerId: parseInt(customerId),
    // hide customer in view detail
    pickupCustomerFK: pickupCustomerFK,
    pickupCustomerPlantFK: pickupCustomerPlantFK,
    notes,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = () => {
    if (viewDetail === false || recordId === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setPickupCustomerFK(""));
      dispatch(setPickupCustomerPlantFK(""));
      dispatch(setViewDetail(false));
      navigate(`/customer-dpu-restrictions/${customerId}/${customerPageNo}`);
      toast.success("Changes Cancelled");
    }
  };

  const handleEdit = () => {
    dispatch(setViewDetail(false));
    dispatch(setIsEdit(true));
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (recordId) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(toggleChangesCancelled(true));
      dispatch(setDuplicateCustomerError(false));
      dispatch(setDuplicatePlantError(false));

      toast.success("Changes Cancelled");
    } else {
      navigate(`/customer-dpu-restrictions/${customerId}/${customerPageNo}`);
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };
  const [loading, setLoading] = useState(false);
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    CustomerDPURestrictionsService.deleteRecord(recordId)
      .then((response) => {
        navigate(`/customer-dpu-restrictions/${customerId}/${customerPageNo}`);
        toast.success("Customer DPU Restriction Deleted");
      })
      .catch((err) => {
        navigate(`/customer-dpu-restrictions/${customerId}/${customerPageNo}`);
        toast.error("Something went wrong");
      });
    setDeleteShow(false);
  };

  const saveRecord = () => {
    setLoading(true);
    CustomerDPURestrictionsService.createOrUpdateRecord(formData)
      .then((res) => {
        navigate(`/customer-dpu-restrictions/${customerId}/${customerPageNo}`);
        if (recordId) toast.success("Customer DPU Restriction Updated");
        else toast.success("Customer DPU Restriction Created");
      })
      .catch((err) => {
        navigate(`/customer-dpu-restrictions/${customerId}/${customerPageNo}`);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // save validation
  useEffect(() => {
    if (!duplicateCustomerError && !duplicatePlantError && (pickupCustomerFK || pickupCustomerPlantFK)) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [pickupCustomerFK, pickupCustomerPlantFK, duplicateCustomerError, duplicatePlantError, recordId]);
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type=""
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => saveRecord()}
        >
          Save
        </button>

        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!recordId || viewDetail === false}
          onClick={handleEdit}

          label={"Edit"}
        />

        <ButtonComponent
          route={""}
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!recordId || viewDetail === false}
          onClick={handleDelete}
          label={"Delete"}
        />

        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Customer DPU Restriction Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Customer DPU Restriction"}
          body={`Please confirm you want to Delete this Customer DPU Restriction`}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
      </div>
    </div>
  );
};

export default FormFooter;
