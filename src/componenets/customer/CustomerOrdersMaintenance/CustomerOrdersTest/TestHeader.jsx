import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ModalComponent from "../../../common/ModalComponent";
import { setTestFile } from "../../../../redux/CustomerOrdersSlice";
const TestHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { id, pageNumber } = useParams();
  const fromBulkOrderEntry = state?.fromBulkOrderEntry;

  const [closeShow, setCloseShow] = useState(false);
  const handleClose = () => {
    if (fromBulkOrderEntry) {
      navigate(`/bulk-order-entry`);
    } else {
      setCloseShow(true);
    }
  };
  const handleCloseNo = () => setCloseShow(false);
  const handleCloseYes = () => {
    navigate(`/customer-orders/${id}/${pageNumber}`);
    dispatch(setTestFile([]));

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

      <div>
        <ModalComponent
          show={closeShow}
          onHide={handleCloseNo}
          title={"Close Customer Order Test Changes"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={handleCloseYes}
          handleNO={handleCloseNo}
        />
      </div>
    </div>
  );
};

export default TestHeader;
