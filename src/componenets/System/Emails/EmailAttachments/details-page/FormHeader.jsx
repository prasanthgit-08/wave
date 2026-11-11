import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetEmailAttachment } from "../../../../../redux/EmailAttachmentSlice";
import toast from "react-hot-toast";
import ModalComponent from "../../../../common/ModalComponent";

export const FormHeader = () => {
  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const viewDetail = useSelector((state) => state.emailAttachmentReducer.viewDetail);

  const handleClose = () => {
    if (viewDetail === true) {
      navigate(`/email-maintenance/${params.emailMaintenanceId}/${params.pageNumber}`);
      dispatch(resetEmailAttachment());
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate(`/email-maintenance/${params.emailMaintenanceId}/${params.pageNumber}`);
    dispatch(resetEmailAttachment());
    toast.success("Page closed");
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
      <div>
        {
          <ModalComponent
            show={closeShow}
            onHide={handleCloseNo}
            title={"Close Email Attachment Changes"}
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
