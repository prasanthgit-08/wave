import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  resetChanges,
  setPrintCheckFlag,
  setReverseFlag,
  setSource,
  setWho,
} from "../../../../redux/PrintCheckSlice";
const MiscellaneousCheckFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableNext, setDisableNext] = useState(true);
  const checkPayId = useSelector((state) => state.printCheckReducer.checkPayId);
  const address1 = useSelector((state) => state.printCheckReducer.address1);
  const name = useSelector((state) => state.printCheckReducer.name);
  const reason = useSelector((state) => state.printCheckReducer.reason);
  const checkAmount = useSelector((state) => state.printCheckReducer.checkAmount);
  const checkPayFlag = useSelector((state) => state.printCheckReducer.checkPayFlag);
  const postalCodePKNew = useSelector((state) => state.printCheckReducer.postalCodePKNew);
  const printCheckFlag = useSelector((state) => state.printCheckReducer.printCheckFlag);
  const handleNext = () => {
    navigate(`/print-check-stub-screen`);
  };
  useEffect(() => {
    if (
      checkAmount &&
      checkAmount > 0 &&
      reason &&
      name &&
      address1 &&
      postalCodePKNew &&
      ((!checkPayFlag && !checkPayId) || (checkPayFlag && checkPayId))
    ) {
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }, [name, address1, postalCodePKNew, checkPayFlag, checkPayId, checkAmount, reason]);

  const onCancel = () => {
    dispatch(setReverseFlag(false));
    dispatch(resetChanges());
    dispatch(setPrintCheckFlag(false));
    navigate(`/print-check-options-screen`);
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

export default MiscellaneousCheckFooter;
