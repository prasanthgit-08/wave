import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetChanges, resetOrderUsers } from "../../../../redux/CustomerOrderUsersSlice";
import ModalComponent from "../../../common/ModalComponent";

const FormHeader = ({ styles }) => {
  const { customerId, customerPageNo } = useParams();

  const viewDetail = useSelector((state) => state.customerOrderUsers.viewDetail);
  const [closeShow, setCloseShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    if (viewDetail === true) {
      navigate(`/add-customer/${customerId}/${customerPageNo}`);
      setCloseShow(false);
      toast.success("Page Closed");
      dispatch(resetOrderUsers());
      dispatch(resetChanges());
    } else {
      setCloseShow(true);
    }
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate(`/add-customer/${customerId}/${customerPageNo}`);
    toast.success("Page closed");
    dispatch(resetChanges());
    dispatch(resetOrderUsers());
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
        title="Close Customer Order User"
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default FormHeader;
