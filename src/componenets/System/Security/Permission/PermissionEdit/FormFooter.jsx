import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setFormData,
  setIsUniqueDescription,
  setIsUniqueObjectKey,
  setViewDetail,
  toggleChangesCancelled,
} from "../../../../../redux/PermissionsMaintenanceSlice";
import toast from "react-hot-toast";
import PermissionsMaintenanceService from "../../../../../services/PermissionsMaintenanceService";
import ModalComponent from "../../../../common/ModalComponent";
import LoadingIcon from "../../../../common/LoadingIcon";

const FormFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [cancelShow, setCancelShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const viewDetail = useSelector((state) => state.permissionsMaintenance.viewDetail);
  const disableSave = useSelector((state) => state.permissionsMaintenance.disableSave);
  const permissionsPayload = useSelector((state) => state.permissionsMaintenance.permissionsPayload);
  const isUniqueObjectKey = useSelector((state) => state.permissionsMaintenance.isUniqueObjectKey);
  const isUniqueDescription = useSelector((state) => state.permissionsMaintenance.isUniqueDescription);

  const handleCancel = () => {
    if (viewDetail === false || id === undefined) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      navigate("/permissions-maintenance");
      toast.success("Changes Cancelled");
    }
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    dispatch(toggleChangesCancelled());
    dispatch(setIsUniqueDescription(true));
    dispatch(setIsUniqueObjectKey(true));
    if (id) {
      setCancelShow(false);
      dispatch(setViewDetail(true));
      toast.success("Changes Cancelled");
    } else {
      navigate("/permissions-maintenance");
      dispatch(setViewDetail(false));
      toast.success("Changes Cancelled");
    }
  };

  const checkUniqueSave = (description, objectKey) => {
    PermissionsMaintenanceService.checkUniqueSave(description, objectKey, id)
      .then((response) => {
        if (response.data) {
          save();
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        dispatch(setIsUniqueObjectKey(false));
        dispatch(setIsUniqueDescription(false));
      });
  };

  const handleDelete = () => setDeleteShow(true);
  const handleDeleteNo = () => setDeleteShow(false);
  const handleDeleteYes = () => {
    setLoading(true);
    PermissionsMaintenanceService.deletePermissionById(id)
      .then((response) => {
        toast.success("Permission Record Deleted");
        dispatch(setFormData(null));
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
        navigate(`/permissions-maintenance`);
      });
    setDeleteShow(false);
  };

  const handleSave = () => {
    setLoading(true);
    checkUniqueSave(permissionsPayload?.description, permissionsPayload?.objectKey);
  };

  const save = () => {
    PermissionsMaintenanceService.savePermission(permissionsPayload)
      .then((res) => {
        if (id) toast.success("Permission Record Updated");
        else toast.success("Permission Record Created");
        dispatch(setFormData(null));
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
        navigate("/permissions-maintenance");
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type=""
          hidden={viewDetail}
          disabled={disableSave || !isUniqueDescription || !isUniqueObjectKey}
          onClick={handleSave}
        >
          Save
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          hidden={!id || !viewDetail}
          onClick={() => dispatch(setViewDetail(false))}
        >
          Edit
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          hidden={!id || !viewDetail}
          onClick={handleDelete}
        >
          Delete
        </button>

        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Permission Record Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />

        {/*Delete confirmation Modal */}
        <ModalComponent
          show={deleteShow}
          onHide={handleDeleteNo}
          title={"Delete Permission Record"}
          body={"Please confirm you want to Delete this Permission Record"}
          handleYES={handleDeleteYes}
          handleNO={handleDeleteNo}
        />
      </div>
    </div>
  );
};

export default FormFooter;
