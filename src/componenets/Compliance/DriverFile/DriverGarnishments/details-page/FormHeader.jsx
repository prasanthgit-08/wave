import React, { useState } from "react";
import ModalComponent from "../../../../common/ModalComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetChanges } from "../../../../../redux/DriverGarnishmentsSlice";
import toast from "react-hot-toast";

const FormHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.driverGarnishmentsReducer.viewDetail);
  const [closeShow, setCloseShow] = useState(false);
  const onHandleCloseNo = () => setCloseShow(false);
  const { id } = useParams();

  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate(`/driver-maintenance-add/${id}/0`);
      setCloseShow(false);
      toast.success("Page Closed");
      dispatch(resetChanges());
    } else {
      setCloseShow(true);
    }
  };

  const onHandleCloseYes = () => {
    navigate(`/driver-maintenance-add/${id}/0`);
    dispatch(resetChanges());
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

      <div>
        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Driver Garnishment Maintenance"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
};

export default FormHeader;
