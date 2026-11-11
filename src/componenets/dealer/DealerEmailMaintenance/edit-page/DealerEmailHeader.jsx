import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import {
  resetChanges,
  setId,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchTerm,
  setSelectedSearchCriteria,
  setViewDetail,
} from "../../../../redux/DealerEmailSlice";

const DealerEmailHeader = () => {
  const { id, pageNumber } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [closeShow, setCloseShow] = useState(false);
  const viewDetail = useSelector((state) => state.dealerEmailReducer.viewDetail);

  const handleClose = () => {
    if (viewDetail === true) {
      dispatch(setViewDetail(true));

      navigate("/add-dealer/" + id + "/" + pageNumber);
      setCloseShow(false);
      dispatch(resetChanges());
      dispatch(setPageNumber(0));
      dispatch(setSelectedSearchCriteria("Beginning"));
      dispatch(setSearchTerm(""));
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(null));
      dispatch(setId(null));
      dispatch(setViewDetail(true));

      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate("/add-dealer/" + id + "/" + pageNumber);
    toast.success("Page Closed");
    dispatch(resetChanges());
    dispatch(setPageNumber(0));
    dispatch(setSelectedSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setNormalSortValue(null));
    dispatch(setNormalSortFlag(null));
    dispatch(setId(null));
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleClose}
        >
          Close
        </button>
      </div>

      <div>
        <ModalComponent
          show={closeShow}
          onHide={handleCloseNo}
          title={"Close Dealer Email Maintenance"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={handleCloseYes}
          handleNO={handleCloseNo}
        />
      </div>
    </div>
  );
};

export default DealerEmailHeader;
