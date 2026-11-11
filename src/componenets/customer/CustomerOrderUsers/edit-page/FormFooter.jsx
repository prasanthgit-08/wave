import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetChanges,
  setViewDetail,
  setChangesCancelled,
  setDuplicateRecord,
} from "../../../../redux/CustomerOrderUsersSlice";
import CustomerOrderUsersService from "../../../../services/CustomerOrderUsersService";
import ButtonComponent from "../../../common/Button";
import ModalComponent from "../../../common/ModalComponent";
import CustomerService from "../../../../services/CustomerService";
import { setOrderEntryUsers } from "../../../../redux/CustomerMaintenanceSlice";
import LoadingIcon from "../../../common/LoadingIcon";
const FormFooter = ({ styles }) => {
  const { customerId, customerPageNo, recordId } = useParams();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const plantstatus = useSelector((state) => state.customerOrderUsers.plantstatus);
  const customerOrderUserPK = useSelector((state) => state.customerOrderUsers.customerOrderUserPK);
  const orderUserFK = useSelector((state) => state.customerOrderUsers.orderUserFK);
  const customerPlantFK = useSelector((state) => state.customerOrderUsers.customerPlantFK);
  const viewDetail = useSelector((state) => state.customerOrderUsers.viewDetail);
  const duplicateRecord = useSelector((state) => state.customerOrderUsers.duplicateRecord);
  const customerPlants = useSelector((state) => state.customerOrderUsers.customerPlants);
  const orderEntryUsers = useSelector((state) => state.customerMaintenanceReducer.orderEntryUsers);
  const pickupPlantInput = useSelector((state) => state.customerOrderUsers.pickupPlantInput);
  const [loading, setLoading] = useState(false);
  const formData = {
    customerOrderUserPK,
    customerFK: parseInt(customerId),
    orderUserFK,
    customerPlantFK,
    whitelist: orderEntryUsers === "W" ? true : false,
    blacklist: orderEntryUsers === "B" ? true : false,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = () => {
    if (viewDetail === false || recordId === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate(`/customer-order-users/${customerId}/${customerPageNo}`);
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (recordId) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      dispatch(setChangesCancelled(true));
      toast.success("Changes Cancelled");
    } else {
      navigate(`/customer-order-users/${customerId}/${customerPageNo}`);
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
    dispatch(resetChanges());
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    CustomerOrderUsersService.deleteRecord(recordId)
      .then((response) => {
        navigate(`/customer-order-users/${customerId}/${customerPageNo}`);
        toast.success("Customer Order User Deleted");
        dispatch(resetChanges());
      })
      .catch((err) => {
        navigate(`/customer-order-users/${customerId}/${customerPageNo}`);
        toast.error("Something went wrong");
      });
    setDeleteShow(false);
  };

  const saveRecord = () => {
    setLoading(true);
    CustomerOrderUsersService.createOrUpdateRecord(formData)
      .then((res) => {
        navigate(`/customer-order-users/${customerId}/${customerPageNo}`);
        if (recordId) toast.success("Customer Order User Updated");
        else toast.success("Customer Order User Created");
      })
      .catch((err) => {
        navigate(`/customer-order-users/${customerId}/${customerPageNo}`);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });

    dispatch(resetChanges());
  };

  useEffect(() => {
    if (
      !duplicateRecord &&
      ((customerPlants.length === 0 && pickupPlantInput === "" && orderUserFK) ||
        /* customerPlants.length !== 0 && */ (orderUserFK && customerPlantFK))
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [duplicateRecord, orderUserFK, customerPlantFK, customerPlants, pickupPlantInput]);

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
          onClick={() => dispatch(setViewDetail(false))}
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
          title={"Cancel Customer Order User Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Customer Order User"}
          body={"Please confirm you want to Delete this Customer Order User"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
      </div>
    </div>
  );
};

export default FormFooter;
