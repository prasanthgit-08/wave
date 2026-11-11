import React, { useState } from "react";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import ModalComponent from "../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { resetSearch, setViewDetail } from "../../../../redux/CustomerDealerRoutesSlice";

const RoutesEditFormHeader = () => {
  const [cancelShow, setCancelShow] = useState(false);
  const viewDetail = useSelector((state) => state.customerDealerRoutes.viewDetail);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerdealerid = params.customerdealerid;
  const group = params.group;
  const dealerId = params.dealerId;

  const handleCloseNo = () => {
    setCancelShow(false);
  };

  const onHandleCloseShow = () => {
    if (!viewDetail) {
      setCancelShow(true);
    } else {
      navigate("/edit-customer-dealer/" + group + "/" + dealerId + "/" + customerdealerid);
      dispatch(resetSearch());
      toast.success("Page Closed");
    }
  };
  const handleCloseYes = () => {
    navigate("/edit-customer-dealer/" + group + "/" + dealerId + "/" + customerdealerid);
    dispatch(resetSearch());
    dispatch(setViewDetail(true));
    toast.success("Page Closed");
  };
  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
      <button
        className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
        onClick={onHandleCloseShow}
      >
        Close
      </button>
      <ModalComponent
        show={cancelShow && !viewDetail}
        onHide={handleCloseNo}
        title={"Close Customer Dealer Route Changes"}
        body={"Please confirm you want to close the program without saving your changes"}
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
};

export default RoutesEditFormHeader;
