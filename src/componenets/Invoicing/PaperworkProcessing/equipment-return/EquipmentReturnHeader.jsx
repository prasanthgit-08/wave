import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import ModalComponent from "../../../common/ModalComponent";
import { resetPaperworkProcessing } from "../../../../redux/Invoicing/PaperworkProcessingSlice";

const Header = ({
  unitSelection = false,
  unitView = false,
  missingPaperwork = false,
  driversEmail = false,
  additionalAmounts = false,
  amountsConfirmation = false,
  scanPaperwork = false,
  breakdownDelay = false,
  splitTrip = false,
  breakdown = false,
}) => {
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    if (scanPaperwork) {
      setCloseShow(true);
    } else {
      dispatch(resetPaperworkProcessing());
      navigate("/");
      toast.success("Page Closed");
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    dispatch(resetPaperworkProcessing());
    navigate("/");
    toast.success("Page closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          onClick={handleClose}
        >
          Close
        </button>
      </div>

      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title="Close Paperwork Processing"
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default Header;
