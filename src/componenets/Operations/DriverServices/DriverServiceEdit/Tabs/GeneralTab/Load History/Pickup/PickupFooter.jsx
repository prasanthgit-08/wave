import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function PickupFooter() {
  const navigate = useNavigate();

  const { driverId, dispatchId } = useParams();

  const onCancel = () => {
    navigate("/load-history-detail/" + driverId + "/" + dispatchId);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={() => {
            onCancel();
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default PickupFooter;
