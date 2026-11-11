import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetInner, setIndex } from "../../../../redux/InventoryStatusFlashReportSlice";

const InventoryFlashListingFooter = () => {
  const dispatch = useDispatch();

  const { keys, index } = useSelector((state) => state.inventoryStatusFlashReportSlice);

  const navigate = useNavigate();
  const handleNext = () => {
    if (index < keys.length - 1) {
      dispatch(setIndex(index + 1));
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      dispatch(setIndex(index - 1));
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Next"}
          onClick={handleNext}
          disabled={index === keys.length - 1}
        >
          Next
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={""}
          onClick={handlePrevious}
          disabled={index === 0}
        >
          Last
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Next"}
          onClick={() => {
            navigate("/inventory-status-flash-selection");
            dispatch(resetInner());
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default InventoryFlashListingFooter;
