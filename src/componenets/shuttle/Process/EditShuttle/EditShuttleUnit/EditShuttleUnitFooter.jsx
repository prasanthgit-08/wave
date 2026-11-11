import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPlantToPlant,
  resetPlantToYard,
  resetYardToPlant,
  resetYardToYard,
  setCompanyFK,
  setCompanyName,
  setShuttleType,
  setUnitNumberInput,
  setUnitNumberLast5,
  setUnitNumberPK,
  setUnitShuttlePK,
  toggleCancelChanges,
} from "../../../../../redux/EditShuttleSlice";

function EditShuttleUnitFooter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shuttleType = useSelector((state) => state.editShuttleReducer.shuttleType);
  const unitShuttlePK = useSelector((state) => state.editShuttleReducer.unitShuttlePK);

  const handleCancelOnClick = () => {
    dispatch(toggleCancelChanges());
    dispatch(setUnitNumberInput(""));
    dispatch(setUnitShuttlePK(null));
    dispatch(setUnitNumberPK(null));
    dispatch(setShuttleType(""));
    dispatch(setUnitNumberLast5(""));
    dispatch(setCompanyName(""));
    dispatch(setCompanyFK(null));
  };

  const handleDoneOnClick = () => {
    dispatch(setCompanyName(""));
    dispatch(setCompanyFK(null));
    dispatch(setUnitNumberInput(""));
    dispatch(setUnitShuttlePK(null));
    dispatch(setUnitNumberPK(null));
    dispatch(setUnitNumberLast5(""));
    dispatch(setShuttleType(""));
    dispatch(resetYardToPlant());
    dispatch(resetPlantToPlant());
    dispatch(resetPlantToYard());
    dispatch(resetYardToYard());
    navigate("/edit-shuttle-driver");
  };

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          onClick={() => {
            setTimeout(() => {
              if (shuttleType === "plantToYard") {
                navigate("/edit-shuttle-plant-to-yard/" + unitShuttlePK);
              } else if (shuttleType === "yardToPlant") {
                navigate("/edit-shuttle-yard-to-plant/" + unitShuttlePK);
              } else if (shuttleType === "yardToYard") {
                navigate("/edit-shuttle-yard-to-yard/" + unitShuttlePK);
              } else if (shuttleType === "plantToPlant") {
                navigate("/edit-shuttle-plant-to-plant/" + unitShuttlePK);
              }
            }, 100);
          }}
          disabled={unitShuttlePK === null}
        >
          Edit
        </button>

        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleDoneOnClick}
        >
          Done
        </button>

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

export default EditShuttleUnitFooter;
