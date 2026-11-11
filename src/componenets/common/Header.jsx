import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ModalComponent from "./ModalComponent";

const Header = ({
  closeHandler,
  MiscellaneousContent,
  confirmClose = false,
  closeConfirmationHandler,
  closeNavigationURL = "/",
  preventNavigation = false,
  programName = "this program",
  closeModalTitle = "",
  closeModalBody = "",
  hideBorderBottom = false,
}) => {
  const navigate = useNavigate();
  const [closeShow, setCloseShow] = useState(false);

  const handleClose = () => {
    if (confirmClose) {
      setCloseShow(true);
    } else {
      handleCloseYes();
    }
    if (closeHandler) {
      closeHandler();
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    closeConfirmationHandler && closeConfirmationHandler();
    if (!preventNavigation) {
      navigate(closeNavigationURL);
      toast.success("Page closed");
    }
  };

  return (
    <div>
      <div
        className={`d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-dark border-2
          ${!hideBorderBottom ? "border-bottom" : ""}
        `}
      >
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          onClick={() => handleClose()}
        >
          Close
        </button>
      </div>

      {MiscellaneousContent}

      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title={closeModalTitle || `Close ${programName}`}
        body={closeModalBody || "Please confirm you want to close the program without saving your changes"}
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default Header;
