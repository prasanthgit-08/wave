import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../common/ModalComponent";
import {
  resetChanges,
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchTerm,
  setSelectedSearchCriteria,
} from "../../../redux/SpecialCodesSlice";

const SpecialCodesFormHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);
  const viewDetail = useSelector((state) => state.specialCodesReducer.viewDetail);
  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate("/");
      setCloseShow(false);
      dispatch(setPageNumber(0));
      dispatch(setSelectedSearchCriteria("Beginning"));
      dispatch(setSearchTerm(""));
      dispatch(setChangeColor(false));
      dispatch(setNormalSortFlag(false));
      dispatch(setNormalSortValue(null));
      toast.success("Page Closed");
      dispatch(resetChanges());
    } else {
      setCloseShow(true);
    }
  };

  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/");
    dispatch(setPageNumber(0));
    dispatch(setSelectedSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setChangeColor(false));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    toast.success("Page Closed");
    dispatch(resetChanges());
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>

      <div className="col-xs-6">
        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Special Code Maintenance"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
};

export default SpecialCodesFormHeader;
