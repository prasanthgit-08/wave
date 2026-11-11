import React, { useState } from "react";
import ButtonComponent from "../../../common/Button";
import { t } from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Modal, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import {
  setChangeColor,
  setCobData,
  setCustomerOpenBalanceData,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchTerm,
  setSelecteActiveType,
  setSelectedSearchCriteria,
} from "../../../../redux/customerOpenBalanceSlice";
export default function COBEditHeader() {
  const navigate = useNavigate();
  const params = useParams();
  const customerId = params.customerId;
  const customerPageNumber = params.customerPageNumber;
  const [closeShow, setCloseShow] = useState(false);
  const viewDetail = useSelector((state) => state.customerOpenBalanceReducer.viewDetail);
  const dispatch = useDispatch();

  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate("/add-customer/" + customerId + "/" + customerPageNumber);
      setCloseShow(false);
      dispatch(setCustomerOpenBalanceData([]));
      dispatch(setCobData([]));
      dispatch(setSelectedSearchCriteria("Beginning"));
      dispatch(setChangeColor(false));
      dispatch(setPageNumber(0));
      dispatch(setSearchTerm(""));
      dispatch(setNormalSortFlag(false));
      dispatch(setNormalSortValue(null));
      dispatch(setSelecteActiveType("Active"));
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/add-customer/" + customerId + "/" + customerPageNumber);
    dispatch(setCustomerOpenBalanceData([]));
    dispatch(setCobData([]));
    dispatch(setSelectedSearchCriteria("Beginning"));
    dispatch(setChangeColor(false));
    dispatch(setPageNumber(0));
    dispatch(setSearchTerm(""));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    dispatch(setSelecteActiveType("Active"));
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
        title={"Close Customer Open Balance"}
        body="Please confirm you want to close the program without saving your changes"
        handleYES={onHandleCloseYes}
        handleNO={onHandleCloseNo}
      />
    </div>
  );
}
