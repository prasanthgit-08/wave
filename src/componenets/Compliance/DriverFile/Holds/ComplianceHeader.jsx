import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-hot-toast";
import { resetHoldsState } from "../../../../redux/DriverHoldsSlice";

function ComplianceHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const driverData = useSelector((state) => state.driverHoldsReducer.driverData);

  const { id } = useParams();

  const handleClose = () => {
    dispatch(resetHoldsState());
    navigate(`/driver-maintenance-add/${id}/0`);
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ComplianceHeader;
