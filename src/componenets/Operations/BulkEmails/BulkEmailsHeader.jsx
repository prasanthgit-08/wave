import React, { useEffect, useState } from "react";
import ModalComponent from "../../common/ModalComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { resetFields } from "../../../redux/Operations/BulkEmailSlice";

const BulkEmailsHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showCloseModal, setShowCloseModal] = useState(false);
  const handleCloseNo = () => {
    setShowCloseModal(false);
  };
  const handleCloseYes = () => {
    navigate("/");
    dispatch(resetFields());
    toast.success("Page Closed");
  };

  window.addEventListener("popstate", () => {
    dispatch(resetFields()); // Reset form fields or state
    navigate("/bulk-emails-selection");
  });

  const handleCancel = () => {
    if (window.location.pathname === "/bulk-emails-text") {
      setShowCloseModal(true);
    } else {
      handleCloseYes();
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={() => {
            handleCancel();
          }}
        >
          Close
        </button>
      </div>

      <div>
        <ModalComponent
          show={showCloseModal}
          onHide={handleCloseNo}
          title={"Close Bulk Driver Emails"}
          body="Please confirm you want to close the program."
          handleYES={handleCloseYes}
          handleNO={handleCloseNo}
        />
      </div>
    </div>
  );
};

export default BulkEmailsHeader;
