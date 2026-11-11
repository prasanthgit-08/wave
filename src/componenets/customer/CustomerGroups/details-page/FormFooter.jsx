import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetNormalSort,
  setAssignSortFlag,
  setAssignSortValue,
  setAssignedPageNumber,
  setCustomerPageNumber,
  setDisableSave,
  setFormData,
  setLeftPageNumber,
  setViewDetail,
} from "../../../../redux/CustomerGroupsSlice";
import CustomerGroupService from "../../../../services/CustomerGroupService";
import ButtonComponent from "../../../common/Button";
import ModalComponent from "../../../common/ModalComponent";

const FormFooter = () => {
  const { id } = useParams();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [showDeleteError, setShowDeleteError] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
  const viewDetail = useSelector((state) => state.customerGroups.viewDetail);
  const customerGroups = useSelector((state) => state.customerGroups.customerGroups);
  const disableSave = useSelector((state) => state.customerGroups.disableSave);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/customer-groups");
      dispatch(setCustomerPageNumber(0));
      dispatch(setAssignSortFlag(false));
      dispatch(setAssignSortValue(null));
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
    } else {
      navigate("/customer-groups");
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };

  /* for saving  Customer Group*/
  const handleSave = () => {
    setLoading(true);
    CustomerGroupService.saveCustomerGroup(customerGroups)
      .then((res) => {
        setLoading(false);
        navigate("/customer-groups");

        dispatch(setCustomerPageNumber(0));

        dispatch(setAssignSortValue(null));
        if (id) {
          toast.success("Customer Group Updated");
        } else toast.success("Customer Group Created");
        dispatch(setFormData(null));
      })
      .catch((err) => {
        setLoading(false);
        navigate("/customer-groups");
        toast.error("Something went wrong");
      });
  };

  /* for deleting  Customer Group*/
  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    CustomerGroupService.deleteCustomerGroup(id)
      .then((response) => {
        navigate("/customer-groups");
        toast.success("Customer Group Deleted");
        dispatch(setFormData(null));
      })
      .catch((err) => {
        setShowDeleteError(true);
        setDeleteErrorMessage(err?.response?.data?.errorMsg || "Something went wrong!! Failed to delete!!");
      });
    setDeleteShow(false);
  };

  const validateAndSave = () => {
    setLoading(true);
    CustomerGroupService.isDescriptionUnique(customerGroups.description, id)
      .then((response) => {
        if (response?.data) {
          setLoading(false);
          dispatch(setDisableSave(response?.data));
        } else {
          handleSave();
        }
      })
      .catch((err) => {
        setLoading(false);
        dispatch(setDisableSave(true));
      });
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type=""
          hidden={viewDetail}
          disabled={disableSave}
          onClick={validateAndSave}
        >
          Save
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>

        {
          <ButtonComponent
            route={`/customer-groups/edit/${id}`}
            className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
            hidden={!viewDetail}
            onClick={() => {
              dispatch(setViewDetail(false));
              dispatch(setLeftPageNumber(0));
              dispatch(setAssignedPageNumber(0));
              dispatch(resetNormalSort());
            }}
            label={"Customers"}
          />
        }

        <ButtonComponent
          route={""}
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!id || !viewDetail}
          onClick={() => dispatch(setViewDetail(false))}
          label={"Edit"}
        />

        <ButtonComponent
          route={""}
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          hidden={!id || !viewDetail}
          onClick={handleDelete}
          label={"Delete"}
        />

        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Customer Group Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Customer Group"}
          body={"Please confirm you want to Delete this Customer Group"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />

        {/* Delete Error */}
        <ModalComponent
          show={showDeleteError}
          onHide={() => setShowDeleteError(false)}
          title={"Delete failed!"}
          body={deleteErrorMessage}
          showError
          closeButton
        />
        {loading && (
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

export default FormFooter;
