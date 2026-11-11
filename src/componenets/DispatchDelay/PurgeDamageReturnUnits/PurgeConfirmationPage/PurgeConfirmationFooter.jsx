import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPurgeDamage, setUpdateFlag } from "../../../../redux/PurgeDamageReturnUnitsSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PurgeConfirmationFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spResponseData = useSelector((state) => state.purgeDamageReturnUnits.spResponseData);

  const updateFlag = useSelector((state) => state.purgeDamageReturnUnits.updateFlag);
  const handlePurgeClick = () => {
    dispatch(setUpdateFlag(1));
  };

  const handleClose = () => {
    navigate(`/purge-damage-return`);
    toast.success("Cancel");
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handlePurgeClick}
        >
          Purge
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PurgeConfirmationFooter;
