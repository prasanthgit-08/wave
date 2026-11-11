import React from "react";
import ModalComponent from "../../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  setEditUnitData,
  setShuttleSave,
  setUnitDetails,
  setUnitNumberInput,
  setUnitNumberLast5,
  setUnitNumberPK,
  setUnitsLoading,
} from "../../../../../redux/EditYardUnitSlice";

function EditYardUnitEditHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [closeShow, setCloseShow] = useState(false);

  let viewDetail = useSelector((state) => state.editYardUnitsReducer.viewDetail);

  const handleCloseOnClick = () => {
    if (viewDetail === true) {
      dispatch(setUnitNumberPK(null));
      dispatch(setUnitNumberInput(""));
      dispatch(setUnitNumberLast5(""));
      dispatch(setEditUnitData(null));
      dispatch(setShuttleSave(false));
      dispatch(setUnitDetails(null));
      dispatch(setUnitsLoading(false));
      navigate("/");
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const handleCloseNo = () => {
    setCloseShow(false);
  };

  const handleCloseYes = () => {
    setCloseShow(false);
    dispatch(setUnitNumberPK(null));
    dispatch(setUnitNumberInput(""));
    dispatch(setUnitNumberLast5(""));
    dispatch(setEditUnitData(null));
    navigate("/");
    toast.success("Page Closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleCloseOnClick}
        >
          Close
        </button>
      </div>

      <div className="col-xs-6">
        {/* Close Confirmation Modal */}
        <ModalComponent
          show={closeShow}
          onHide={() => setCloseShow(false)}
          title={"Close Edit Yard Unit Changes"}
          body={"Please confirm you want to close the program without saving your changes"}
          handleYES={handleCloseYes}
          handleNO={handleCloseNo}
        />
      </div>
    </div>
  );
}

export default EditYardUnitEditHeader;
