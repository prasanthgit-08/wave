import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";
import { resetChanges, resetExportBrokers, resetRightNormalSort } from "../../../../redux/ExportBrokersSlice";
import {
  resetLeftNormalSort,
  resetPortsPageNormalSort,
  setChangesInPortsSelection,
  setReverseList,
} from "../../../../redux/EditExportBrokersSlice";

const FormHeader = () => {
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.exportBrokersReducer.viewDetail);
  const [closeShow, setCloseShow] = useState(false);
  const IsCloseFlag = useSelector((state) => state.exportBrokersReducer.IsCloseFlag);

  const navigate = useNavigate();

  const handleClose = () => {
    if (viewDetail === true) {
      navigate("/");
      setCloseShow(false);
      dispatch(resetExportBrokers());
      dispatch(resetChanges());
      dispatch(resetPortsPageNormalSort());
      dispatch(resetRightNormalSort());
      dispatch(setReverseList(false));
      dispatch(setChangesInPortsSelection(false));
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate("/");
    dispatch(resetExportBrokers());
    dispatch(resetChanges());
    setCloseShow(false);
    dispatch(resetPortsPageNormalSort());
    dispatch(resetRightNormalSort());
    dispatch(setReverseList(false));
    dispatch(setChangesInPortsSelection(false));
    toast.success("Page closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap">
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          onClick={handleClose}
        >
          Close
        </button>
      </div>

      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title={"Close Export Brokers"}
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default FormHeader;
