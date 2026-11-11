import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setNormalSortFlag, setNormalSortValue, setSearchTerm } from "../../../../redux/YardEmailSlice";
import { setSearchCriteria } from "../../../../redux/YardEmailSlice";
import { setSelectedId } from "../../../../redux/YardEmailSlice";
import { setPageNumber } from "../../../../redux/YardEmailSlice";
import { setChangeColor } from "../../../../redux/YardEmailSlice";
import { resetChanges } from "../../../../redux/YardEmailSlice";
import ModalComponent from "../../../common/ModalComponent";

function FormHeader({ styles }) {
  const { id, yardEmailPK, pageNumber } = useParams();

  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewDetail = useSelector((state) => state.yardEmailReducer.viewDetail);

  const handleClose = () => {
    if (viewDetail === true) {
      navigate(`/add-yard-maintenance/${id}/${pageNumber}`);
      setCloseShow(false);
      dispatch(resetChanges());
      dispatch(setSelectedId(""));
      dispatch(setChangeColor(false));
      dispatch(setPageNumber(0));
      dispatch(setSearchCriteria("Beginning"));
      dispatch(setSearchTerm(""));
      dispatch(setNormalSortFlag(false));
      dispatch(setNormalSortValue(null));

      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate(`/add-yard-maintenance/${id}/${pageNumber}`);
    toast.success("Page closed");
    dispatch(resetChanges());
    dispatch(setSelectedId(""));
    dispatch(setChangeColor(false));
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
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
        title="Close Yard Email "
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
}

export default FormHeader;
