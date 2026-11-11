import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeliveryHeader = () => {
  const navigate = useNavigate();

  const { driverId, dispatchId } = useParams();

  const onHandleCloseShow = () => {
    navigate("/load-history-detail/" + driverId + "/" + dispatchId);
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DeliveryHeader;
