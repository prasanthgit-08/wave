import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setActiveKey,
  setDriverPictureId,
  setIsProcessedBit,
  setTrailerSearch,
  setTruckSearch,
} from "../../../../redux/DriverServiceSlice";
import Dispatch from "../../../customer/customerEmialMaintenance/FormPage/Tabs/Dispatch";

function DriverServiceFooter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { truckSearch, trailerSearch } = useSelector((state) => state.driverServicesSlice);

  return (
    <div className="d-flex  align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            navigate("/driver-service-selection");
            dispatch(setActiveKey("general"));
            dispatch(setTrailerSearch(""));
            dispatch(setTruckSearch(""));
            dispatch(setIsProcessedBit(false));
            dispatch(setDriverPictureId(null));
          }}
        >
          Cancel
        </button>

        {/* model Active*/}
        {/* <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title= {active === true ? "Deactivate Dealer":"Activate Dealer"}
          body={active === true?" Please confirm you want to Deactivate this Dealer":" Please confirm you want to Activate this Dealer"}
          handleYES={handleActiveSave}
          handleNO={handleActiveClose}
      /> */}

        {/* edit Cancel Confirmation Modal */}
      </div>
    </div>
  );
}

export default DriverServiceFooter;
