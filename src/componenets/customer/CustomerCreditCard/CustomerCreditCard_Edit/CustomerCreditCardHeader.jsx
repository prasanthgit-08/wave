import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import {
  resetCreditCardSearchFilter,
  setCustomerCreditCardData,
  setNormalSortFlag,
  setNormalSortValue,
} from "../../../../redux/CustomerCreditCardSlice";

const CustomerCreditCardHeader = () => {
  const params = useParams();
  const pageNumber = useSelector((state) => state.customerCreditCardReducer.pageNumber);
  const dispatch = useDispatch();
  const customerId = params.customerId;
  const navigate = useNavigate();
  const [closeShow, setCloseShow] = useState(false);
  const viewDetail = useSelector((state) => state.customerCreditCardReducer.viewDetail);

  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate("/add-customer/" + customerId + "/" + pageNumber);
      setCloseShow(false);
      dispatch(resetCreditCardSearchFilter());
      dispatch(setCustomerCreditCardData([]));
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/add-customer/" + customerId + "/" + pageNumber);
    dispatch(resetCreditCardSearchFilter());
    dispatch(setCustomerCreditCardData([]));
    toast.success("Page Closed");
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>
      <ModalComponent
        show={closeShow}
        onHide={onHandleCloseNo}
        title={"Close Customer Credit Card Changes"}
        body="Please confirm you want to close the program without saving your changes"
        handleYES={onHandleCloseYes}
        handleNO={onHandleCloseNo}
      />
    </div>
  );
};
export default CustomerCreditCardHeader;
