import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuarterStyles from "../../../../../styles/QuarterScreen.module.css";
import ModalComponent from "../../../../common/ModalComponent";
import { resetSearchSettings } from "../../../../../redux/DelayResourcesSlice";

const DelayResourcesEditFormHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cancelShow, setCancelShow] = useState(false);
  const edit = useSelector((state) => state.delayResourcesFilter.edit);

  const onHandleCloseShow = () => {
    if (edit) {
      setCancelShow(true);
    } else {
      dispatch(resetSearchSettings());
      toast.success("Page Closed");
      navigate("/");
    }
  };
  const handleCloseNo = () => {
    setCancelShow(false);
  };
  const handleCloseYes = () => {
    dispatch(resetSearchSettings());
    toast.success("Page Closed");
    navigate("/");
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
      <button
        className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
        onClick={onHandleCloseShow}
      >
        Close
      </button>
      <ModalComponent
        show={cancelShow && edit}
        onHide={handleCloseNo}
        title={"Close Delay Resources Changes"}
        body={"Please confirm you want to close the program without saving your changes"}
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default DelayResourcesEditFormHeader;
