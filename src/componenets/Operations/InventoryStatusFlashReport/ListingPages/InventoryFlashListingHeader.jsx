import React, { useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../../../redux/InventoryStatusFlashReportSlice";

const InventoryFlashListingHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);

  const { keys, index } = useSelector((state) => state.inventoryStatusFlashReportSlice);

  const handleClose = () => {
    dispatch(reset());
    navigate("/");
    toast.success("Page Closed");
  };

  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    dispatch(reset());
    navigate("/");
    toast.success("Page Closed");
  };

  return (
    <div>
      <div className="  d-flex align-items-center  p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <div className=" m-l-10 justify-content-begin f-w-600 col-10 m-r-30">{keys[index]}</div>
        <div className="align-items-center justify-content-end">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>

      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title={"Close Inventory Status Flash"}
        body="Please confirm you want to close the program "
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default InventoryFlashListingHeader;
