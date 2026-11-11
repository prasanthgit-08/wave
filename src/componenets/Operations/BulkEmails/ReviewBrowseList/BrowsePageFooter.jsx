import React, { useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetDefaults } from "../../../../redux/Operations/BulkEmailSlice";

const BrowsePageFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCancelModal, setshowCancelModal] = useState(false);

  const selectedId = useSelector((state) => state.bulkEmails.selectedId);

  const handleCancelNo = () => {
    setshowCancelModal(false);
  };

  const handleCancelYes = () => {
    navigate("/bulk-emails-selection");
    dispatch(resetDefaults());
    setshowCancelModal(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => {
            navigate("/bulk-emails-selection");
          }}
          disabled={!selectedId}
        >
          Next
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => {
            handleCancelYes();
          }}
        >
          Cancel
        </button>
      </div>
      <ModalComponent
        show={showCancelModal}
        onHide={handleCancelNo}
        title={"Cancel Bulk Driver Emails"}
        body="Please confirm you want to cancel your changes."
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
    </div>
  );
};

export default BrowsePageFooter;
