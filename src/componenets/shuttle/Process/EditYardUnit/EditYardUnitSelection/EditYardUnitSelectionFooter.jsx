import { useDispatch, useSelector } from "react-redux";
import {
  setEditUnitData,
  setPageNumber,
  setShuttleSave,
  setUnitNumberInput,
  setUnitNumberLast5,
  setUnitNumberPK,
  setViewDetail,
} from "../../../../../redux/EditYardUnitSlice";
import ButtonComponent from "../../../../common/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

function EditYardUnitSelectionFooter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const unitNumberPK = useSelector((state) => state.editYardUnitsReducer.unitNumberPK);

  const handleCancelOnClick = () => {
    dispatch(setUnitNumberPK(null));
    dispatch(setUnitNumberInput(""));
    dispatch(setUnitNumberLast5(""));
    dispatch(setEditUnitData(null));
    dispatch(setShuttleSave(false));
    dispatch(setPageNumber(0));
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={() => {
            dispatch(setViewDetail(true));
            setTimeout(() => {
              navigate("/edit-yard-unit/" + unitNumberPK);
            }, 100);
          }}
          disabled={unitNumberPK === null}
        >
          View
        </button>
        {/* Cancel Button */}
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleCancelOnClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditYardUnitSelectionFooter;
