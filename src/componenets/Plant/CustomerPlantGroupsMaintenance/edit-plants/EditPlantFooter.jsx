import React, { useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import {
  resetEditPlants,
  setAssignedPageNo,
  setLeftPlantsPageno,
  setPlantList,
  setReverseFlag,
  setRightPlantsPageno,
  setSaving,
  setViewDetail,
} from "../../../../redux/CustomerPlantGroupSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import CustomerPlantGroupsService from "../../../../services/CustomerPlantGroupsService";
import LoadingIcon from "../../../common/LoadingIcon";

const EditPlantFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [showCancel, setshowCancel] = useState(false);

  const initialList = useSelector((state) => state.customerPlantGroup.initialList);
  const saveList = useSelector((state) => state.customerPlantGroup.saveList);
  const deleteList = useSelector((state) => state.customerPlantGroup.deleteList);
  const exceptList = useSelector((state) => state.customerPlantGroup.exceptList);
  const reverseFlag = useSelector((state) => state.customerPlantGroup.reverseFlag);
  const selectedCustomer = useSelector((state) => state.customerPlantGroup.selectedCustomer);
  const saving = useSelector((state) => state.customerPlantGroup.saving);

  const onSave = () => {
    dispatch(setSaving(true));
    CustomerPlantGroupsService.getSavePlants(
      reverseFlag,
      initialList,
      deleteList,
      saveList,
      exceptList,
      id,
      selectedCustomer
    )
      .then(() => {
        dispatch(setAssignedPageNo(0));
        toast.success("Plants Saved");
        dispatch(setViewDetail(true));
        dispatch(resetEditPlants());
        dispatch(setSaving(false));
        navigate("/edit-plant-groups/" + id + "/" + 0);
      })
      .catch(() => {
        dispatch(setSaving(false));
      });
  };

  const onCancel = () => {
    setshowCancel(true);
  };

  const handleCancelNo = () => {
    setshowCancel(false);
  };

  const handleCancelYes = () => {
    dispatch(setLeftPlantsPageno(0));
    dispatch(setReverseFlag(false));
    dispatch(setRightPlantsPageno(0));
    dispatch(setPlantList([]));
    dispatch(setAssignedPageNo(0));
    dispatch(setViewDetail(true));
    toast.success("Changes Cancelled");
    dispatch(resetEditPlants());
    navigate("/edit-plant-groups/" + id + "/" + 0);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap">
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

        <ModalComponent
          show={showCancel}
          onHide={handleCancelNo}
          title={"Cancel Plant Selection Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
      {saving && <LoadingIcon />}
    </div>
  );
};

export default EditPlantFooter;
