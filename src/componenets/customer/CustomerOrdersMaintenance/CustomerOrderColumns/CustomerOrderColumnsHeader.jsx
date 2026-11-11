import React, { useState } from "react";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../../../common/ModalComponent";
import { setCustomerOrdersColumnList, setEditFormData } from "../../../../redux/CustomerOrdersSlice";

const CustomerOrderColumnsHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id, pageNumber } = useParams();
  const [closeShow, setCloseShow] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {};

  const handleCancel = () => {
    navigate(`/customer-orders/${id}/${pageNumber}`);
    dispatch(setEditFormData(null));
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap">
        <button
          className={`btn btn-secondary ${styles.btnMediumWidth} btn-sm m-l-6 m-r-5 m-b-6 `}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>

      {/* edit Cancel Confirmation Modal */}
      <ModalComponent
        show={cancelShow}
        onHide={handleCancelNo}
        title={"Cancel Customer Order Column Changes"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
    </div>
  );
};

export default CustomerOrderColumnsHeader;
