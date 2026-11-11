import React, { useState } from "react";
import { toast } from "react-hot-toast";
import CheckRejectedLoadService from "../../../../services/CheckRejectedLoadService";
import { useSelector } from "react-redux";
import {
  resetChanges,
  resetSelectionList,
  setBrowseData,
  setResetFlag,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/CheckRejectedLoadsSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const CheckRejectedLoadsFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const resetList = useSelector((state) => state.checkRejectedLoadReducer.resetList);

  const process = () => {
    setLoad(true);
    CheckRejectedLoadService.resetDebitCardDetailRecords(resetList)
      .then((response) => {
        setLoad(false);
        navigate("/check-rejected-loads");
        toast.success("Debit Card Details have been reset.");
        dispatch(setResetFlag());
      })
      .catch((error) => {
        setLoad(false);
        navigate("/check-rejected-loads");
        toast.error("Failed to reset Debit Card Details.");
      })
      .finally(() => {
        setLoad(false);
        dispatch(resetSelectionList());
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          disabled={resetList.length === 0}
          onClick={process}
        >
          Process
        </button>
        {load && (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckRejectedLoadsFooter;
