import React, { useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  resetChanges,
  resetEditPlants,
  resetGroupEdit,
  setAssignedPageNo,
  setPlantSort,
  setPlantSortValue,
} from "../../../../redux/CustomerPlantGroupSlice";

const EditPlantHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);

  const reset = () => {
    dispatch(resetChanges());
    dispatch(resetGroupEdit());
    dispatch(setAssignedPageNo(0));
    dispatch(setPlantSort(false));
    dispatch(setPlantSortValue(null));
    dispatch(resetEditPlants());
  };

  const handleClose = () => {
    setCloseShow(true);
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate("/");
    reset();
    toast.success("Page Closed");
  };
  return (
    <div>
      <div>
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={handleClose}
          >
            Close
          </button>
        </div>

        <ModalComponent
          show={closeShow}
          onHide={handleCloseNo}
          title={"Close Plants Changes"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={handleCloseYes}
          handleNO={handleCloseNo}
        />
      </div>
    </div>
  );
};

export default EditPlantHeader;
