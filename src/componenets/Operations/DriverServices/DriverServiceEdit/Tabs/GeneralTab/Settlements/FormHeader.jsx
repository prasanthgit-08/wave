import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../../../../common/ModalComponent";
import {
  setTotalFund,
  setPageNumber,
  setNormalSortValue,
  setNormalSortFlag,
} from "../../../../../../../redux/SettlementsSlice";

function FormHeader() {
  const params = useParams();
  const driverId = params.driverId;
  const [closeShow, setCloseShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewDetail = useSelector((state) => state.holidaysReducer.viewDetail);

  const onClose = async () => {
    dispatch(setNormalSortValue(""));
    dispatch(setNormalSortFlag(false));
    dispatch(setPageNumber(0));
    dispatch(setTotalFund(null));

    navigate(`/driver-service-selection/${driverId}/form`);
  };
  const handleClose = () => {
    if (viewDetail === true) {
      navigate(`/`);
      dispatch(setNormalSortValue(""));
      dispatch(setNormalSortFlag(false));
      dispatch(setPageNumber(0));
      dispatch(setTotalFund(null));

      navigate(`/driver-service-selection/${driverId}/form`);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    dispatch(setNormalSortValue(""));
    dispatch(setNormalSortFlag(false));
    dispatch(setPageNumber(0));
    dispatch(setTotalFund(null));

    navigate(`/driver-service-selection/${driverId}/form`);
    toast.success("Page closed");
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
        title="Close Settlement Changes "
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
}

export default FormHeader;
