import React, { useState } from "react";
import ModalComponent from "../../../../common/ModalComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { resetDriver, setDisplayFlag, setPictureFile } from "../../../../../redux/DriverMaintenanceSlice";

const FormHeader = () => {
  const navigate = useNavigate();
  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.driverMaintenanceReducer.viewDetail);
  const handleClose = () => {
    if (viewDetail === true) {
      navigate("/");
      dispatch(resetDriver());
      dispatch(setPictureFile([]));
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate("/");
    dispatch(setDisplayFlag(false));
    dispatch(resetDriver());
    dispatch(setPictureFile([]));
    toast.success("Page closed");
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
        title="Close Driver Changes"
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default FormHeader;
