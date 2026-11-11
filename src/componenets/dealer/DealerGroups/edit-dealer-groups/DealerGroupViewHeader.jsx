import React, { useState } from "react";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../../../common/ModalComponent";
import {
  resetDealerSelectionSearch,
  resetData,
  resetArrays,
  resetDealerGroups,
} from "../../../../redux/EditDealerGroupslice";
import { resetSearchSettings } from "../../../../redux/DealerGroupsSearchFilterSlice";

const DealerGroupViewHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showClose, setShowClose] = useState(false);
  const edit = useSelector((state) => state.editDealerGroupReducer.edit);

  const onClose = () => {
    if (edit) {
      setShowClose(true);
    } else {
      navigate("/");
      dispatch(resetDealerGroups());
      dispatch(resetDealerSelectionSearch());
      dispatch(resetData());
      dispatch(resetArrays());
      dispatch(resetSearchSettings(false));
      toast.success("Page Closed");
    }
  };

  const handleCloseNo = () => {
    setShowClose(false);
  };
  const handleCloseYes = () => {
    navigate("/dealer-group");
    toast.success("Page Closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap">
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-6 m-r-5 m-b-6 `}
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <ModalComponent
        show={showClose}
        onHide={handleCloseNo}
        title={"Close Dealer Group Changes"}
        body={"Please confirm you want to Close this Dealer Group Changes"}
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default DealerGroupViewHeader;
