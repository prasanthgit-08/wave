import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";
import {
  resetCustomerGroups,
  setAssignSortFlag,
  setAssignSortValue,
  setCustomerPageNumber,
} from "../../../../redux/CustomerGroupsSlice";
import { useDispatch } from "react-redux";

const FormHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.customerGroups.viewDetail);
  const [closeShow, setCloseShow] = useState(false);

  const handleClose = () => {
    if (viewDetail) {
      navigate("/");
      setCloseShow(false);
      dispatch(setCustomerPageNumber(0));
      dispatch(setAssignSortFlag(false));
      dispatch(setAssignSortValue(null));
      dispatch(resetCustomerGroups());
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate("/");
    dispatch(resetCustomerGroups());
    toast.success("Page closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap">
        <button className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5" onClick={handleClose}>
          Close
        </button>
      </div>

      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title="Close Customer Group"
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default FormHeader;
