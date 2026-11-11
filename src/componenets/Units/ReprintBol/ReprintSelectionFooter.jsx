import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDefaultsApplied, setRePrintBOL, setRePrintBOLShuttle } from "../../../redux/ReprintBolSlice";
import { resetUnitSelectionFilters, setUnitSelectionData } from "../../../redux/UnitStatus/UnitStatusSlice";

const ReprintSelectionFooter = ({ handleChangeTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bolFor = useSelector((state) => state.reprintBolReducer.bolFor);
  const isBackButtonClicked = useSelector((state) => state.reprintBolReducer.isBackButtonClicked);
  const previousBolFor = useRef(bolFor);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          onClick={(e) => {
            localStorage.setItem("rePrint", true);
            if (
              bolFor === "shuttle" ||
              bolFor === "driver" ||
              bolFor === "Dispatches" ||
              bolFor === "Units"
            ) {
              dispatch(setRePrintBOL(true));
            }
            if (previousBolFor.current !== bolFor) {
              dispatch(resetUnitSelectionFilters());
              dispatch(setUnitSelectionData({}));
              dispatch(setDefaultsApplied(false));
            }
            previousBolFor.current = bolFor;
            handleChangeTab();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReprintSelectionFooter;
