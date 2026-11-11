import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { resetChanges, setPrintCheckFlag } from "../../../../redux/PrintCheckSlice";
const DriversFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableNext, setDisableNext] = useState(true);
  const source = useSelector((state) => state.printCheckReducer.source);
  const printCheckFlag = useSelector((state) => state.printCheckReducer.printCheckFlag);

  const reason = useSelector((state) => state.printCheckReducer.reason);
  const checkAmount = useSelector((state) => state.printCheckReducer.checkAmount);
  const driverId = useSelector((state) => state.printCheckReducer.driverId);
  const handleNext = () => {
    navigate(`/print-check-stub-screen`);
  };
  useEffect(() => {
    if (driverId && checkAmount && checkAmount > 0 && reason) {
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }, [checkAmount, reason, driverId]);
  const onCancel = () => {
    navigate(`/print-check-options-screen`);
    dispatch(resetChanges());
    dispatch(setPrintCheckFlag(false));
    toast.success("Changes Cancelled");
  };
  useEffect(() => {
    if (!printCheckFlag) {
      navigate(`/print-check-options-screen`);
    }
  }, [printCheckFlag]);
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          disabled={disableNext}
          onClick={handleNext}
        >
          Next
        </button>
        <button
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DriversFooter;
