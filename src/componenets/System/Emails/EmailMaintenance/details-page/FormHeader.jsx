import React, { useState } from "react";
import ModalComponent from "../../../../common/ModalComponent";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetChanges, resetEmailFormat } from "../../../../../redux/EmailFormatsSlice";
import toast from "react-hot-toast";

const FormHeader = () => {
  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewDetail = useSelector((state) => state.emailFormats.viewDetail);

  const handleClose = () => {
    if (viewDetail === true) {
      navigate(`/`);
      dispatch(resetChanges());
      dispatch(resetEmailFormat());
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate(`/`);
    dispatch(resetChanges());
    dispatch(resetEmailFormat());
    toast.success("Page closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleClose}
        >
          Close
        </button>
      </div>
      <div>
        {
          <ModalComponent
            show={closeShow}
            onHide={handleCloseNo}
            title={"Close Email Changes"}
            body="Please confirm you want to close the program without saving your changes"
            handleYES={handleCloseYes}
            handleNO={handleCloseNo}
          />
        }
      </div>
    </div>
  );
};

export default FormHeader;
