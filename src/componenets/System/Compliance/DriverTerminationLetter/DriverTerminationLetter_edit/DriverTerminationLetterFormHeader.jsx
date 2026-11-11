import React from "react";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import ModalComponent from "../../../../common/ModalComponent";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetEdit, resetSearch } from "../../../../../redux/DriverTerminationLetterSlice";
import toast from "react-hot-toast";

const DriverTerminationLetterFormHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showClose, setShowClose] = useState(false);

  const editPage = useSelector((state) => state.driverTerminationLetterReducer.editPage);

  const onHandleCloseShow = () => {
    if (editPage) {
      setShowClose(true);
    } else {
      toast.success("Page Closed");
      navigate("/");
      dispatch(resetEdit());
      dispatch(resetSearch());
    }
  };

  const handleCloseNo = () => {
    setShowClose(false);
  };

  const handleCloseYes = () => {
    toast.success("Page Closed");
    navigate("/");
    setShowClose(false);
    dispatch(resetEdit());
    dispatch(resetSearch());
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
      <button
        className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
        onClick={onHandleCloseShow}
      >
        Close
      </button>
      <ModalComponent
        show={showClose && editPage}
        onHide={handleCloseNo}
        title={"Close Driver Termination Letter Changes"}
        body={"Please confirm you want to close the program without saving your changes"}
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default DriverTerminationLetterFormHeader;
