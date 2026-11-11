import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  resetBatchChanges,
  resetChanges,
  resetImportChanges,
  setBrowseData,
  setPageNumber,
} from "../../../../redux/PlantReleaseSlice";
const SelectionFooter = ({ sendMail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const browseUnits = useSelector((state) => state.plantReleaseReducer.browseUnits);
  const singleUnits = useSelector((state) => state.plantReleaseReducer.singleUnits);
  const importList = useSelector((state) => state.plantReleaseReducer.importList);

  const onHandleNextShow = () => {
    if (browseUnits === true) {
      dispatch(setBrowseData(null));
      dispatch(resetBatchChanges(""));
      navigate("/plant-release-option-screen");
      dispatch(setPageNumber(0));
    } else if (singleUnits === true) {
      dispatch(resetChanges());
      navigate("/plant-release-single-screen");
    } else if (importList === true) {
      dispatch(resetImportChanges());
      navigate("/plant-release-importlist-screen");
    }
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 "
          disabled={!(singleUnits || browseUnits || importList)}
          onClick={onHandleNextShow}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectionFooter;
