import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../../../common/ModalComponent";
import {
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
} from "../../../../../redux/DelayUnitCodesSlice";

const DelayUnitCodesEditHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [closeShow, setCloseShow] = useState(false);
  const viewDetail = useSelector((state) => state.delayedUnitCodesReducer.viewDetail);
  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate("/");
      dispatch(setPageNumber(0));
      dispatch(setSearchCriteria("Beginning"));
      dispatch(setSearchTerm(""));
      dispatch(setChangeColor(false));
      dispatch(setNormalSortFlag(false));
      dispatch(setNormalSortValue(null));
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/");
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setChangeColor(false));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    toast.success("Page Closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>

      <div className="col-xs-6">
        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Delayed Unit Code"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
};
export default DelayUnitCodesEditHeader;
