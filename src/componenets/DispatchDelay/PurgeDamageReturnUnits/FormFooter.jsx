import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNavigateByNextButton, setSelectionType } from "../../../redux/PurgeDamageReturnUnitsSlice";

const FormFooter = () => {
  const navigate = useNavigate();
  const selectedId = useSelector((state) => state.purgeDamageReturnUnits.selectedId);
  const selectionType = useSelector((state) => state.purgeDamageReturnUnits.selectionType);
  const navigateByNextButton = useSelector((state) => state.purgeDamageReturnUnits.navigateByNextButton);

  const dispatch = useDispatch();

  const handleNextClick = () => {
    // navigate('/purge-confirmation-page/${selectId}');
    dispatch(setSelectionType("OTHER"));
    dispatch(setNavigateByNextButton(true));
    navigate(`/purge-confirmation-page/${selectedId}`);
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div>
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleNextClick}
          disabled={selectedId == null}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FormFooter;
