import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import {
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
} from "../../../../redux/CustomerContactSlice";
const CCFormHeader = () => {
  const viewDetail = useSelector((state) => state.customerContactReducer.viewDetail);
  const [closeShow, setCloseShow] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const handleClose = () => {
    if (viewDetail === true) {
      navigate("/add-customer/" + params.customerId + "/" + params.pageNumber);
      setCloseShow(false);
      dispatch(setPageNumber(0));
      dispatch(setSearchCriteria("Beginning"));
      dispatch(setSearchTerm(""));
      dispatch(setChangeColor(false));
      dispatch(setNormalSortFlag(false));
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(false));
      dispatch(setNormalSortValue(null));
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate("/add-customer/" + params.customerId + "/" + params.pageNumber);
    toast.success("Page closed");
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setChangeColor(false));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleClose}
        >
          Close
        </button>
      </div>

      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title="Close Customer Contact Changes"
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default CCFormHeader;
