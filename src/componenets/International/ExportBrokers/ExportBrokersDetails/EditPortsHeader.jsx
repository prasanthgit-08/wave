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
  setHasInitials,
  setLeftLoading,
  setReverseList,
  setRightLoading,
} from "../../../../redux/EditExportBrokersSlice";

const EditPortsHeader = () => {
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.customerGroups.viewDetail);
  const [closeShow, setCloseShow] = useState(false);
  const IsCloseFlag = useSelector((state) => state.exportBrokersReducer.IsCloseFlag);

  const navigate = useNavigate();

  const handleCloseNew = () => {
    setCloseShow(true);
  };
  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate("/");
    toast.success("Page closed");

    dispatch(resetExportBrokers());
    dispatch(resetChanges());
    setCloseShow(false);
    dispatch(resetPortsPageNormalSort());
    dispatch(resetRightNormalSort());
    dispatch(setReverseList(false));
    dispatch(setChangesInPortsSelection(false));
    dispatch(setHasInitials(false));
    setTimeout(() => {
      dispatch(setRightLoading(true));
      dispatch(setLeftLoading(true));
    }, 100);
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap">
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          onClick={handleCloseNew}
        >
          Close
        </button>
      </div>

      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title={"Close Ports"}
        body="Please confirm you want to close the program without saving your changes"
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default EditPortsHeader;
