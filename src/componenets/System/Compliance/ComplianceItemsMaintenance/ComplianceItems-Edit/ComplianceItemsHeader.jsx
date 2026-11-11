import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetChanges, resetClose } from "../../../../../redux/ComplianceItemsSlice";
import ModalComponent from "../../../../common/ModalComponent";
const ComplianceItemsHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);

  const viewDetail = useSelector((state) => state.complianceItemsReducer.viewDetail);
  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate("/");
      dispatch(resetClose());
      dispatch(resetChanges());
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/");
    dispatch(resetClose());
    dispatch(resetChanges());

    toast.success("Page Closed");
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>

      <ModalComponent
        show={closeShow}
        onHide={onHandleCloseNo}
        title={"Close Compliance Item"}
        body="Please confirm you want to close the program without saving your changes"
        handleYES={onHandleCloseYes}
        handleNO={onHandleCloseNo}
      />
    </div>
  );
};

export default ComplianceItemsHeader;
