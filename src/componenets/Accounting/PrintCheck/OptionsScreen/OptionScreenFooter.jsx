import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetChanges, setPrintCheckFlag, setReverseFlag } from "../../../../redux/PrintCheckSlice";

const OptionScreenFooter = () => {
  const source = useSelector((state) => state.printCheckReducer.source);
  const who = useSelector((state) => state.printCheckReducer.who);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNext = () => {
    dispatch(resetChanges());
    dispatch(setPrintCheckFlag(true));
    if (who === "Driver") {
      navigate(`/print-check-drivers-screen`);
    } else if (who === "Transport Company") {
      navigate(`/print-check-transport-company-screen`);
    } else if (who === "Miscellaneous") {
      navigate(`/print-check-miscellaneous-check-screen`);
      dispatch(setReverseFlag(false));
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"

          disabled={who === "" && source === ""}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OptionScreenFooter;
