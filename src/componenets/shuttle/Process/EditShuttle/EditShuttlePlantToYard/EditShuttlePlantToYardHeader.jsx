import React, { useState } from "react";
import ButtonComponent from "../../../../common/Button";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import { resetDriver } from "../../../../../redux/EditShuttleSlice";
import ModalComponent from "../../../../common/ModalComponent";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function EditShuttleYardToPlantHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [closeShow, setCloseShow] = useState(false);

  const handleCloseOnClick = () => {
    setCloseShow(true);
  };

  const handleCloseNo = () => {
    setCloseShow(false);
  };

  const handleCloseYes = () => {
    setCloseShow(false);
    dispatch(resetDriver());
    navigate("/");
    toast.success("Page Closed");
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleCloseOnClick}
        >
          Close
        </button>
      </div>

      <div className="col-xs-6">
        {/* Close Confirmation Modal */}
        <ModalComponent
          show={closeShow}
          onHide={() => setCloseShow(false)}
          title={"Close Edit Shuttle Changes"}
          body={"Please confirm you want to close the program without saving your changes"}
          handleYES={handleCloseYes}
          handleNO={handleCloseNo}
        />
      </div>
    </div>
  );
}

export default EditShuttleYardToPlantHeader;
