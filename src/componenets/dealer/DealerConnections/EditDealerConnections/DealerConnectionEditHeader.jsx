import React, { useState } from "react";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../../../common/ModalComponent";
import { useNavigate } from "react-router-dom";
import {
  resetChanges,
  resetPageValues,
  setViewDetail,
} from "../../../../redux/DealerConnectionsSearchFilterSlice";
import { toast } from "react-hot-toast";
const DealerConnectionEditHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cancelShow, setCancelShow] = useState(false);

  const viewDetail = useSelector((state) => state.dealerConnectionReducer.viewDetail);

  const onHandleCloseShow = () => {
    if (!viewDetail) {
      setCancelShow(true);
    } else {
      dispatch(resetChanges());
      dispatch(resetPageValues());
      toast.success("Page Closed");
      navigate("/");
    }
  };
  const handleCloseNo = () => {
    setCancelShow(false);
  };
  const handleCloseYes = () => {
    toast.success("Page Closed");
    dispatch(resetChanges());
    dispatch(resetPageValues());
    navigate("/");
    dispatch(setViewDetail(false));
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={onHandleCloseShow}
        >
          Close
        </button>
        {
          <ModalComponent
            show={cancelShow && !viewDetail}
            onHide={handleCloseNo}
            title={"Close Dealer Connection Changes"}
            body={"Please confirm you want to close the program without saving your changes"}
            handleYES={handleCloseYes}
            handleNO={handleCloseNo}
          />
        }
      </div>
    </div>
  );
};

export default DealerConnectionEditHeader;
