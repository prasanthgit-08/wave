import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { resetUnitStatusInnerStatesCancel } from "../../../../redux/UnitStatus/UnitStatusSlice";
function UnitStatusDetailFooter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCancelShow = () => {
    navigate("/unit-status-selection");
    toast.success("Changes cancelled");
    dispatch(resetUnitStatusInnerStatesCancel());
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark px-3 border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={handleCancelShow}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UnitStatusDetailFooter;
