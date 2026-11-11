import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";
import {
  setPlantSortFlag,
  setPlantSortValue,
  resetPlantSearchFilter,
} from "../../../../redux/CustomerPlantSearchFilterSlice";
import { resetSearchFilter } from "../../../../redux/UsePlantCustomerSearchFilterSlice";
export const CustomerPlantHeader = () => {
  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);
  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    if (viewDetail === true) {
      navigate("/");
      dispatch(resetPlantSearchFilter());
      dispatch(resetSearchFilter());

      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate("/");
    dispatch(resetPlantSearchFilter());
    dispatch(resetSearchFilter());
    toast.success("Page closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5" onClick={handleClose}>
          Close
        </button>
      </div>

      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title="Close Customer Plant Changes"
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};
