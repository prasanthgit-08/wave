import React, { useState } from "react";
import ModalComponent from "../../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetForms } from "../../../../../redux/FormsSlice";
import toast from "react-hot-toast";

function FormsEditHeader() {
  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewDetail = useSelector((state) => state.forms.viewDetail);

  const handleClose = () => {
    if (viewDetail === true) {
      navigate(`/`);
      dispatch(resetForms());
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate(`/`);
    dispatch(resetForms());
    toast.success("Page closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
      <div>
        <ModalComponent
          show={closeShow}
          onHide={handleCloseNo}
          title={"Close Form Changes"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={handleCloseYes}
          handleNO={handleCloseNo}
        />
      </div>
    </div>
  );
}

export default FormsEditHeader;
