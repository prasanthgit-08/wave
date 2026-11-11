import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetInner } from "../../../../redux/InventoryStatusFlashReportSlice";

const SelectionPageFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    outboundTowableSingle,
    outboundTowableMultiUnit,
    outboundMotorized,
    reloadTowableSingle,
    reloadTowableMultiUnit,
    reloadMotorized,
  } = useSelector((state) => state.inventoryStatusFlashReportSlice);

  const onClickNext = () => {
    dispatch(resetInner());
    navigate("/inventory-status-flash-listing");
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          onClick={onClickNext}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Next"}
          disabled={
            !(
              outboundMotorized ||
              outboundTowableMultiUnit ||
              outboundTowableSingle ||
              reloadMotorized ||
              reloadTowableMultiUnit ||
              reloadTowableSingle
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectionPageFooter;
