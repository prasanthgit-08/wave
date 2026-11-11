import React, { useState } from "react";
import ButtonComponent from "../../../common/Button";
import ModalComponent from "../../../common/ModalComponent";
import CustomerDispatchUsersService from "../../../../services/CustomerDispatchUsersService";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setChangesCancelled, setViewDetail } from "../../../../redux/CustomerDispatchUsersSlice";

const FormFooter = () => {
  const { customerId, customerPageNo, recordId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteShow, setDeleteShow] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);

  const addFormData = useSelector((state) => state.customerDispatchUsers.addFormData);
  const viewDetail = useSelector((state) => state.customerDispatchUsers.viewDetail);
  const disableSave = useSelector((state) => state.customerDispatchUsers.disableSave);
  const [loader, setLoader] = useState(false);

  const saveRecord = () => {
    setLoader(true);
    CustomerDispatchUsersService.createOrUpdateRecord(addFormData)
      .then((res) => {
        navigate(`/customer-dispatch-users/${customerId}/${customerPageNo}`);
        if (recordId) toast.success("Customer Dispatch User Updated");
        else toast.success("Customer Dispatch User Created");
      })
      .catch((err) => {
        setLoader(false);
        navigate(`/customer-dispatch-users/${customerId}/${customerPageNo}`);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    CustomerDispatchUsersService.deleteRecord(recordId)
      .then((response) => {
        navigate(`/customer-dispatch-users/${customerId}/${customerPageNo}`);
        toast.success("Customer Dispatch User Deleted");
      })
      .catch((err) => {
        navigate(`/customer-dispatch-users/${customerId}/${customerPageNo}`);
        toast.error("Something went wrong");
      });
    setDeleteShow(false);
  };
  const handleCancel = () => {
    if (viewDetail === false || recordId === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate(`/customer-dispatch-users/${customerId}/${customerPageNo}`);
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
      navigate(`/customer-dispatch-users/${customerId}/${customerPageNo}`);
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          hidden={viewDetail === true}
          disabled={disableSave}
          onClick={() => {
            saveRecord();
          }}
        >
          Save
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Edit"}
          hidden={!recordId || viewDetail === false}
          onClick={() => {
            dispatch(setViewDetail(false));
          }}
        />
        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Delete"}
          hidden={!recordId || viewDetail === false}
          onClick={handleDelete}
        />
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Customer Dispatch User Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Customer Dispatch User"}
          body={"Please confirm you want to Delete this Customer Dispatch User"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />

        {loader && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormFooter;
