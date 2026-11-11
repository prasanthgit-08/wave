import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../../../common/ModalComponent";
import { resetEmailSenderTypes, setFormData } from "../../../../../redux/EmailSenderTypesSlice";

const FormHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewDetail = useSelector((state) => state.emailSenderTypes.viewDetail);
  const [closeShow, setCloseShow] = useState(false);

  const handleClose = () => {
    if (viewDetail) {
      setCloseShow(false);
      handleCloseYes();
    } else {
      setCloseShow(true);
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate("/");
    toast.success("Page closed");
    dispatch(setFormData(null));
    dispatch(resetEmailSenderTypes());
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleClose}
        >
          Close
        </button>
      </div>

      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title="Close Email Sender Type"
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default FormHeader;
