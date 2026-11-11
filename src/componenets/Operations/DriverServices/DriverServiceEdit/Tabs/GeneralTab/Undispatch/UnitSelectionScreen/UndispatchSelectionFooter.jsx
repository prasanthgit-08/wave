import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setUndispatchFlag } from "../../../../../../../../redux/UndispatchSlice";
import { useDispatch } from "react-redux";
const UndispatchSelectionFooter = () => {
  const { driverId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedDispatch = useSelector((state) => state.undispatchReducer.selectedDispatch);
  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          disabled={!selectedDispatch}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={() => {
            dispatch(setUndispatchFlag(true));
            navigate(`/undispatch-unit-confirmation-screen/${driverId}/${selectedDispatch}`);
          }}
        >
          Next
        </button>{" "}
      </div>
    </div>
  );
};

export default UndispatchSelectionFooter;
