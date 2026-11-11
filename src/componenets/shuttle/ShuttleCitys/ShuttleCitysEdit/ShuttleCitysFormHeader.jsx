import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import {
  resetChanges,
  setShuttleCitysData,
  setId,
  setSearchCriteria,
  setSearchTerm,
  setPageNumber as shuttleCityPageNumber,
  setPageNumber,
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
} from "../../../../redux/ShuttleCitysSlice";

const ShuttleCitysFormHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);
  const viewDetail = useSelector((state) => state.shuttleCitysReducer.viewDetail);

  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate("/");

      setCloseShow(false);

      dispatch(setPageNumber(0));
      dispatch(setSearchCriteria("Beginning"));
      dispatch(setSearchTerm(""));
      dispatch(setChangeColor(false));
      dispatch(setNormalSortFlag(false));
      dispatch(setNormalSortValue(null));
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
          onClick={() => {
            onHandleCloseShow();
            dispatch(setShuttleCitysData([]));
            dispatch(setSearchCriteria("Beginning"));
            dispatch(setSearchTerm(""));
            dispatch(shuttleCityPageNumber(0));
          }}
        >
          Close
        </button>
      </div>

      <div>
        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Shuttle City"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
};

export default ShuttleCitysFormHeader;
