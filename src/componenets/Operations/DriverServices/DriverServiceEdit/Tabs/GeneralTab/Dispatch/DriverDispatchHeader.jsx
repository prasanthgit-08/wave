import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetDispatches } from "../../../../../../../redux/DispatchesSlice";
import { setTrailerSearch, setTruckSearch } from "../../../../../../../redux/DriverServiceSlice";
import { toast } from "react-hot-toast";

function DispatchHeader() {
  const driverData = useSelector((state) => state.dispatchesReducer.driverData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(resetDispatches());
    navigate(`/driver-service-selection/${driverData?.driverPK}/form`);
    toast.success("Page Closed");
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

export default DispatchHeader;
