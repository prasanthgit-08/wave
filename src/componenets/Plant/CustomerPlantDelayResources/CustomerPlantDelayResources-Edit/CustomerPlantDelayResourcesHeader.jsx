import React from "react";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ModalComponent from "../../../common/ModalComponent";
import { resetClose } from "../../../../redux/CustomerPlantDelaySlice";
const CustomerPlantDelayResourcesHeader = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [closeShow, setCloseShow] = useState(false);
  const viewDetail = useSelector((state) => state.customerPlantDelayReducer.viewDetail);
  const onHandleCloseShow = () => {
    if (viewDetail === true) {
      navigate("/add-customer-plant/" + params.customerId + "/" + params.pageNumber + "/" + params.id);

      setCloseShow(false);
      dispatch(resetClose());

      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const onHandleCloseNo = () => setCloseShow(false);
  const onHandleCloseYes = () => {
    navigate("/add-customer-plant/" + params.customerId + "/" + params.pageNumber + "/" + params.id);
    dispatch(resetClose());
    toast.success("Page Closed");
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className={`btn btn-secondary ${QuarterScreen.btnMediumWidth} btn-sm m-l-5 m-r-5 m-b-5`}
          onClick={onHandleCloseShow}
        >
          Close
        </button>
      </div>

      <div>
        <ModalComponent
          show={closeShow}
          onHide={onHandleCloseNo}
          title={"Close Customer Plant Delay Resource"}
          body="Please confirm you want to close the program without saving your changes"
          handleYES={onHandleCloseYes}
          handleNO={onHandleCloseNo}
        />
      </div>
    </div>
  );
};

export default CustomerPlantDelayResourcesHeader;
