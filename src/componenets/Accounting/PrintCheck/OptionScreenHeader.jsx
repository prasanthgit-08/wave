import React, { useEffect, useState } from "react";
import ModalComponent from "../../common/ModalComponent";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  resetChanges,
  setPrintCheckFlag,
  setReverseFlag,
  setSource,
  setWho,
} from "../../../redux/PrintCheckSlice";
const OptionScreenHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [closeShow, setCloseShow] = useState(false);
  const [disableClose, setDisableClose] = useState(true);
  const handleClose = () => {
    if (disableClose) {
      setCloseShow(true);
    } else {
      navigate("/");
      dispatch(setReverseFlag(false));
      dispatch(resetChanges());
      dispatch(setSource("Taxable"));
      dispatch(setWho("Driver"));
      dispatch(setPrintCheckFlag(false));
      toast.success("Page closed");
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate("/");
    dispatch(resetChanges());
    dispatch(setSource("Taxable"));
    dispatch(setWho("Driver"));
    toast.success("Page closed");
    dispatch(setPrintCheckFlag(false));
  };

  useEffect(() => {
    if (window.location.pathname === `/print-check-stub-screen`) {
      setDisableClose(true);
    } else {
      setDisableClose(false);
    }
  }, [window]);

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
        title="Close Print Check Changes"
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default OptionScreenHeader;
