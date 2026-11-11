import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import EquipmentCheckInOutService from "../../../../../services/EquipmentCheckInOutService";
import ModalComponent from "../../../../common/ModalComponent";

const EquipmentCheckinFooter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [checkInShow, setCheckInShow] = useState("");
  const handleCancel = () => {
    navigate("/equipment-check-in-out-browse-page");
    toast.success("Changes Cancelled");
  };
  //check in
  const checkin = () => {
    setIsLoading(true);
    EquipmentCheckInOutService.checkin(id)
      .then((response) => {
        navigate("/equipment-check-in-out-browse-page");
        toast.success("Equipment Checked In");

        console.log("sucesss");
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      })

      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        navigate("/equipment-check-in-out-browse-page");
        toast.error("Something went wrong");
      });
  };
  const handleNo = () => {
    setCheckInShow(false);
  };
  const handleYes = () => {
    setCheckInShow(false);
    checkin();
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={() => {
            setCheckInShow(true);
          }}
        >
          Check In
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
      <ModalComponent
        show={checkInShow}
        onHide={handleNo}
        title={"Check In Confirmation"}
        body={"Please confirm you want to check in this equipment"}
        handleYES={handleYes}
        handleNO={handleNo}
      />
      {isLoading ? (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default EquipmentCheckinFooter;
