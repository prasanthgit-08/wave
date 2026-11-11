import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetUnitDetails } from "../../../../../../../redux/RerouteSlice";
import ModalComponent from "../../../../../../common/ModalComponent";
import { CLOSE_MESSAGE } from "../../../../../../../constants/messages";

function RerouteHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const driverFK = localStorage.getItem("driverId");
  const delayUnit = localStorage.getItem("delayUnit");
  const company = localStorage.getItem("company");
  const rerouteSource = localStorage.getItem("RerouteSource");
  const [closeShow, setCloseShow] = useState(false);

  //Edit Master Express
  const fromEditMasterExpress = useSelector((state) => state.rerouteReducer.fromEditMasterExpress);
  const unitFK = useSelector((state) => state.rerouteReducer.unitFK);

  const handleCloseNo = () => setCloseShow(false);

  const handleCloseYes = () => {
    setCloseShow(false);
    handleClose();
  };

  const handleClose = () => {
    if (rerouteSource === "EditMaster") {
      dispatch(resetUnitDetails());
      navigate("/edit-master-express-edit-page/" + unitFK + "/" + 0);
    } else if (rerouteSource === "Delay") {
      dispatch(resetUnitDetails());
      navigate(`/delay-processing/delayed-details/${company}/${unitFK}/${driverFK}/${delayUnit}`);
    } else if (rerouteSource === "Operations") {
      dispatch(resetUnitDetails());
      navigate(`/driver-service-selection/${driverFK}/form`);
    } else {
      dispatch(resetUnitDetails());
      navigate(`/reroutes-unit-selection/${driverFK}`);
    }
    localStorage.removeItem("driverId");
    localStorage.removeItem("delayUnit");
    localStorage.removeItem("company");
    localStorage.removeItem("RerouteSource");
    localStorage.removeItem("unitfk");
    localStorage.removeItem("driverId");
    toast.success("Page Closed");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={() => {
            if (location.pathname === `/reroutes-confirmation`) {
              setCloseShow(true);
            } else {
              handleClose();
            }
          }}
        >
          Close
        </button>
      </div>

      <ModalComponent
        show={closeShow}
        onHide={handleCloseNo}
        title="Close Unit's Reroute"
        body={CLOSE_MESSAGE}
        handleYES={handleCloseYes}
        handleNO={handleCloseNo}
      />
    </div>
  );
}

export default RerouteHeader;
