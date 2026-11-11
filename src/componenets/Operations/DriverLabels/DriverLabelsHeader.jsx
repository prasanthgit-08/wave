import React, { useState } from "react";
import ModalComponent from "../../common/ModalComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset, setLabelBy } from "../../../redux/DriverLabelsSlice";
import toast from "react-hot-toast";

const DriverLabelsHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showCloseModal, setShowCloseModal] = useState(false);
  const handleCloseNo = () => {
    setShowCloseModal(false);
  };
  const handleCloseYes = () => {
    dispatch(reset());
    dispatch(setLabelBy("status"));
    navigate("/");
    toast.success("Page Closed");
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={() => {
            setShowCloseModal(true);
          }}
        >
          Close
        </button>
      </div>

      <div>
        <ModalComponent
          show={showCloseModal}
          onHide={handleCloseNo}
          title={"Close Driver Labels"}
          body="Please confirm you want to close the program."
          handleYES={handleCloseYes}
          handleNO={handleCloseNo}
        />
      </div>
    </div>
  );
};

export default DriverLabelsHeader;
