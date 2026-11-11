import React, { useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../../../redux/InventoryStatusFlashReportSlice";

const SelectionPageHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.customerPlantGroup.viewDetail);
  const [closeShow, setCloseShow] = useState(false);

  const handleClose = () => {
    dispatch(reset());
    navigate("/");
    toast.success("Page Closed");
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    dispatch(reset());
    navigate("/");
    toast.success("Page Closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
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

export default SelectionPageHeader;
