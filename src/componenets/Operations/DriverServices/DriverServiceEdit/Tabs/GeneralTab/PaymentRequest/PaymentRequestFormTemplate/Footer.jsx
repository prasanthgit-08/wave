import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../../../../../../common/Button";
import ModalComponent from "../../../../../../../common/ModalComponent";
import PaymentRequestService from "../../../../../../../../services/operations/PaymentRequestService";
import {
  setViewDetail,
  resetState,
  setActiveTab,
  setChangesCancelled,
} from "../../../../../../../../redux/PaymentRequestSlice";
import { PermissionKeyGeneratorUtil } from "../../../../../../../../utils/PermissionKeyGeneratorUtil";
import LoadingIcon from "../../../../../../../common/LoadingIcon";

function Footer() {
  const { driverId, id } = useParams();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);

  const activeTab = useSelector((state) => state.paymentRequestSlice.activeTab);
  const driversPayTabData = useSelector((state) => state.paymentRequestSlice.driversPayTabData);
  const driverpayTabValid = useSelector((state) => state.paymentRequestSlice.driverpayTabValid);
  const reimbursementTabValid = useSelector((state) => state.paymentRequestSlice.reimbursementTabValid);
  const unitId = useSelector((state) => state.paymentRequestSlice.unitId);
  const driverPayRequestsPK = useSelector((state) => state.paymentRequestSlice.driverPayRequestsPK);
  const dispatchId = useSelector((state) => state.paymentRequestSlice.dispatchId);
  const editFormData = useSelector((state) => state.paymentRequestSlice.editFormData);
  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("payrequest", "NEW");
  const deletePermission = PermissionKeyGeneratorUtil("payrequest", "DELETE");
  const viewDetail = useSelector((state) => state.paymentRequestSlice.viewDetail);

  const [disableEdit, setDisableEdit] = useState(false);
  const [disableDelete, setDisableDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      navigate(`/payment-requests/${driverId}`);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setChangesCancelled(true));
      dispatch(setViewDetail(true));
      navigate(`/payment-requests-detail/${driverId}/${id}`);

      toast.success("Changes Cancelled");
    } else {
      dispatch(resetState());
      setCancelShow(false);
      navigate(`/payment-requests/${driverId}`);
      toast.success("Changes Cancelled");
    }
  };

  const formData = {
    driverId: driverId,
    driverPayRequestsPK: id || null,

    driverFK: driverId,
    requestDate: driversPayTabData?.requestDate,
    dispatchFK: dispatchId,
    unitFK: unitId,
    nonUnitReason: driversPayTabData?.alternateNumber,
    invoiceFK: driversPayTabData?.invoiceFK,

    downtimeHours: driversPayTabData?.downtimeHours || 0,
    downtimeRate: driversPayTabData?.downtimeRate || 0,
    downtimeAmount: driversPayTabData?.downtimeAmount || 0,

    additionalMiles: driversPayTabData?.additionalMiles || 0,
    mileageRate: driversPayTabData?.mileageRate || 0,
    mileageAmount: driversPayTabData?.mileageAmount || 0,

    shuttleAmount: driversPayTabData?.shuttleAmount || 0,
    shuttleDescription: driversPayTabData?.shuttleDescription,

    driveByDescription: driversPayTabData?.driveByDescription,
    driveByAmount: driversPayTabData?.driveByAmount || 0,
    attemptedPickupAmount: driversPayTabData?.attemptedPickupAmount || 0,
    attemptedPickupDescription: driversPayTabData?.attemptedPickupDescription,

    otherAmount1: driversPayTabData?.otherAmount1 || 0,
    otherAmountDescription1: driversPayTabData?.otherAmountDescription1,
    otherAmount2: driversPayTabData?.otherAmount2 || 0,
    otherAmountDescription2: driversPayTabData?.otherAmountDescription2,
    notes: driversPayTabData?.notes,

    motelAmount: driversPayTabData?.motelAmount || 0,
    motelDescription: driversPayTabData?.motelDescription,
    repairAmount: driversPayTabData?.repairAmount || 0,
    repairDescription: driversPayTabData?.repairDescription,
    fuelAmount: driversPayTabData?.fuelAmount || 0,
    fuelDescription: driversPayTabData?.fuelDescription,
    tollsAmount: driversPayTabData?.tollsAmount || 0,
    tollsDescription: driversPayTabData?.tollsDescription,
    permitsAmount: driversPayTabData?.permitsAmount || 0,
    permitsDescription: driversPayTabData?.permitsDescription,

    washAmount: driversPayTabData?.washAmount || 0,
    washDescription: driversPayTabData?.washDescription,

    otherReimbursmentAmount1: driversPayTabData?.otherReimbursmentAmount1 || 0,
    otherReimbursmentDescription1: driversPayTabData?.otherReimbursmentDescription1,
    otherReimbursmentAmount2: driversPayTabData?.otherReimbursmentAmount2 || 0,
    otherReimbursmentDescription2: driversPayTabData?.otherReimbursmentDescription2,
    reimbursmentNotes: driversPayTabData?.reimbursmentNotes,

    paid: driversPayTabData?.paid || 0,
    paidDate: driversPayTabData?.paidDate,
    paidUserFK: driversPayTabData?.paidUserFK,
    denied: driversPayTabData?.denied || 0,
    deniedDate: driversPayTabData?.deniedDate,
    deniedUserFK: driversPayTabData?.deniedUserFK,
    deniedReason: driversPayTabData?.deniedReason,
    invoiceError: driversPayTabData?.invoiceError,

    recruitingBonus: driversPayTabData?.recruitingBonus || false,
    recruitingBonusAmount: driversPayTabData?.recruitingBonusAmount || 0,
    recruitedDriverFK: driversPayTabData?.recruitedDriverFK,
    addUserFK: driversPayTabData?.addUserFK,
    addDate: driversPayTabData?.addDate,
    dateEntered: driversPayTabData?.dateEntered,
    enteredBy: driversPayTabData?.enteredBy,
    datePaid: driversPayTabData?.datePaid,
    paidBy: driversPayTabData?.paidBy,
    dateDenied: driversPayTabData?.dateDenied,
    dateBy: driversPayTabData?.dateBy,
    reasonDenied: driversPayTabData?.reasonDenied,
    unitNumber: driversPayTabData?.unitNumber,
  };

  const saveRecord = () => {
    setLoading(true);
    PaymentRequestService.createOrUpdateRecord(formData)

      .then((res) => {
        navigate(`/payment-requests/${driverId}`);
        if (id) toast.success("Payment Request  Updated");
        else toast.success("Payment Request  Created");
      })
      .catch((err) => {
        navigate(`/payment-requests/${driverId}`);
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setLoading(true);
    PaymentRequestService.deleteByid(id)
      .then((response) => {
        navigate(`/payment-requests/${driverId}`);
        toast.success("Payment Request Deleted");
        dispatch(resetState());
      })
      .catch((err) => {
        navigate(`/payment-requests/${driverId}`);
        toast.error("Something went wrong");
      })
      .finally(() => setLoading(false));
    setDeleteShow(false);
  };
  useEffect(() => {
    if (driverpayTabValid && !reimbursementTabValid) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [driverpayTabValid, reimbursementTabValid]);

  useEffect(() => {
    if (deniedPermissions) {
      setDisableEdit(deniedPermissions.includes(editPermission));
      setDisableDelete(deniedPermissions.includes(deletePermission));
    }
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        {loading && <LoadingIcon />}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!id || viewDetail === false}
          onClick={() => {
            if (activeTab === "dates") dispatch(setActiveTab("driversPay"));
            dispatch(setViewDetail(false));
          }}
          disabled={disableEdit || editFormData?.Paid || editFormData?.Denied}
        >
          Edit
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={!id || viewDetail === false}
          onClick={handleDelete}

          disabled={disableDelete || editFormData?.Paid || editFormData?.Denied}
        >
          Delete
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          hidden={viewDetail}
          disabled={disableSave}
          onClick={() => saveRecord()}
        >
          Save
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          hidden={false}
          onClick={handleCancel}
        >
          Cancel
        </button>

        {/* model Active*/}

        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Payment Request Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Payment Request"}
          body={"Please confirm you want to delete this Payment Request"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
        {/* model Active*/}
      </div>
    </div>
  );
}

export default Footer;
