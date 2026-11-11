import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  resetAll,
  resetChanges,
  setChangeColor,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setSelectedId,
} from "../../../redux/TransportCompaniesSlice";
import ModalComponent from "../../common/ModalComponent";

function FormHeader() {
  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewDetail = useSelector((state) => state.transportCompaniesReducer.viewDetail);

  const handleClose = () => {
    if (viewDetail === true) {
      dispatch(resetAll());
      navigate(`/`);
      dispatch(setSelectedId(null));

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
    dispatch(resetAll());

    navigate(`/`);

    dispatch(setSelectedId(null));

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
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={handleClose}
        >
          Close
        </button>
      </div>
      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title="Close Transport Company Changes "
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
}

export default FormHeader;
