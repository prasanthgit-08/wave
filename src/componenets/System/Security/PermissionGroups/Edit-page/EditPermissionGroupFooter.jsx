import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetNormalSort,
  setChangesInPermissioneSelection,
  setPermissionPageNumber,
  setReverseFlag,
  setSaveFlag,
} from "../../../../../redux/PermissionGroupMaintenanceSlice";
import { useSelector } from "react-redux";
import ModalComponent from "../../../../common/ModalComponent";
import PermissionGroupService from "../../../../../services/PermissionGroupService";
import LoadingIcon from "../../../../common/LoadingIcon";

const EditPermissionGroupFooter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCancel, setshowCancel] = useState(false);
  const [loading, setLoading] = useState(false);

  const reverseFlag = useSelector((state) => state.permissionGroupsReducer.reverseFlag);
  const initialList = useSelector((state) => state.permissionGroupsReducer.initialList);
  const saveList = useSelector((state) => state.permissionGroupsReducer.saveList);
  const deleteList = useSelector((state) => state.permissionGroupsReducer.deleteList);
  const exceptList = useSelector((state) => state.permissionGroupsReducer.exceptList);
  const pageNumber = useSelector((state) => state.permissionGroupsReducer.pageNumber);
  const modifiedPermissionList = useSelector((state) => state.permissionGroupsReducer.modifiedPermissionList);
  const onCancel = () => {
    setshowCancel(true);
  };

  const handleCancelNo = () => {
    setshowCancel(false);
  };

  const handleCancelYes = () => {
    dispatch(resetNormalSort());
    dispatch(setReverseFlag(false));
    dispatch(setPermissionPageNumber(0));
    dispatch(setChangesInPermissioneSelection(false));
    toast.success("Changes Cancelled");
    navigate("/permission-groups/" + id + "/" + pageNumber);
  };

  const onSave = () => {
    setLoading(true);
    PermissionGroupService.savePermissionsGroupMembers(
      id,
      initialList,
      deleteList,
      saveList,
      exceptList,
      modifiedPermissionList,
      reverseFlag
    )
      .then(() => {
        dispatch(resetNormalSort());
        dispatch(setPermissionPageNumber(0));
        toast.success("Permission Saved");
        dispatch(setChangesInPermissioneSelection(false));
        navigate("/permission-groups/" + id + "/" + pageNumber);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    dispatch(resetNormalSort());
  }, []);
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={onSave}
        >
          Save
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
        {/* Cancel Confirmation Modal */}
        <ModalComponent
          show={showCancel}
          onHide={handleCancelNo}
          title={"Cancel Permission Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
};

export default EditPermissionGroupFooter;
