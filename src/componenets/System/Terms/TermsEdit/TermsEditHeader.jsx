import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetChanges,
  setChangeColor,
  setSearchCriteria,
  setPageNumber,
  setSearchTerm,
  setId,
} from "../../../../redux/TermsSlice";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";

function TermsEditHeader({ styles }) {
  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewDetail = useSelector((state) => state.termsReducer.viewDetail);

  const handleClose = () => {
    if (viewDetail === true) {
      navigate(`/`);
      dispatch(setId(null));

      dispatch(setSearchTerm(""));
      dispatch(setSearchCriteria("Beginning"));
      dispatch(setPageNumber(0));
      dispatch(setChangeColor(false));
      dispatch(resetChanges());
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate(`/`);
    dispatch(setId(null));

    dispatch(setSearchTerm(""));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setPageNumber(0));
    dispatch(setChangeColor(false));
    toast.success("Page closed");
    dispatch(resetChanges());
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleClose}
        >
          Close
        </button>
      </div>

      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title="Close Term Changes "
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
}

export default TermsEditHeader;
