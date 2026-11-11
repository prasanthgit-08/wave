import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";
import {
  resetChanges,
  resetEditPlants,
  resetGroupEdit,
  setAssignedPageNo,
  setPlantSort,
  setPlantSortValue,
} from "../../../../redux/CustomerPlantGroupSlice";

const FormHeader = ({ closeRoute }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.customerPlantGroup.viewDetail);
  const [closeShow, setCloseShow] = useState(false);

  const handleClose = () => {
    if (viewDetail) {
      navigate(closeRoute);
      reset();
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    reset();
    navigate(closeRoute);
    toast.success("Page Closed");
  };

  const reset = () => {
    dispatch(resetChanges());
    dispatch(resetGroupEdit());
    dispatch(setAssignedPageNo(0));
    dispatch(setPlantSort(false));
    dispatch(setPlantSortValue(null));
    dispatch(resetEditPlants());
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap ">
        <button className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5" onClick={handleClose}>
          Close
        </button>
      </div>

      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title={"Close Customer Plant Group Changes"}
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default FormHeader;
