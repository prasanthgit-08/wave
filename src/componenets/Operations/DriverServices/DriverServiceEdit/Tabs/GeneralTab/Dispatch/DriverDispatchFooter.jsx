import React from "react";
import { useState } from "react";
import ModalComponent from "../../../../../../../componenets/common/ModalComponent";
import {
  setRigionStatus,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setViewDetail,
  resetDispatches,
  setLoaderForUnitCountValidation,
} from "../../../../../../../redux/DispatchesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import DispatchesService from "../../../../../../../services/DispatchesService";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIcon from "../../../../../../common/LoadingIcon";

function DispatchFooter() {
  const { driverId } = useParams();
  const driverData = useSelector((state) => state.dispatchesReducer.driverData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  const [disable, setDisable] = useState(true);
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [showBackwardModal, setShowBackwardModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [valiatedUnitCount, setValidatedUnitCount] = useState(false);
  const currentURL = window.location.pathname;
  const [enablePopupForCodriverOrBobTailDriver, setEnablePopupForCodriverOrBobTailDriver] = useState(false);
  let hasExpiredItems = useSelector((state) => state.dispatchesReducer.hasExpiredItems);

  const regionStatus = useSelector((state) => state.dispatchesReducer.regionStatus);
  const isValidationSuccess = useSelector((state) => state.dispatchesReducer.isValidationsSuccess);
  const divisionStatus = useSelector((state) => state.dispatchesReducer.divisionStatus);
  const hasBobtaildriverComplianceExpired = useSelector(
    (state) => state.dispatchesReducer.hasBobtaildriverComplianceExpired
  );
  const hasCodriverComplianceExpired = useSelector(
    (state) => state.dispatchesReducer.hasCodriverComplianceExpired
  );
  const codriver = useSelector((state) => state.dispatchesReducer.codriver);
  const bobTaildriver = useSelector((state) => state.dispatchesReducer.bobTaildriver);
  const unitCountValidation = () => {
    setValidatedUnitCount(true);
    DispatchesService.getUnitCountValidation(divisionStatus, regionStatus, driverId)
      .then(({ data }) => {
        setLoading(false);
        if (data.canContinue && !data.giveWarning) {
          navigate(`/driver-dispatch-compliance/${driverId}`);
          setDisable(false);
        } else if (data.canContinue && data.giveWarning) {
          setMsg(
            "Driver " +
              driverData.firstName +
              " " +
              (driverData.lastName ? driverData.lastName : "") +
              " has already been assigned to " +
              data.unitCount +
              " undelivered dispatches."
          );
          setShowForwardModal(true);
        } else if (!data.canContinue && data.singleSwitch) {
          setMsg(
            "Driver " +
              driverData.firstName +
              " " +
              (driverData.lastName ? driverData.lastName : "") +
              " already has undelivered " +
              data.pendingDeliveryType +
              " dispatches."
          );
          setShowBackwardModal(true);
        } else if (!data.canContinue && !data.singleSwitch) {
          setMsg(
            "Driver " +
              driverData.firstName +
              " " +
              (driverData.lastName ? driverData.lastName : "") +
              " already has undelivered " +
              regionStatus +
              " dispatches"
          );
          setShowBackwardModal(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        setMsg(error.response.data.errorMsg ? error.response.data.errorMsg : "Something went wrong");
        setShowBackwardModal(false);
      });
  };

  const onHideUnitCountModal = () => {
    if (showForwardModal) {
      navigate(`/driver-dispatch-compliance/${driverId}`);
      setDisable(false);
    } else {
      navigate(`/driver-dispatch/${driverId}`);
      setDisable(false);
    }
    setShowBackwardModal(false);
    setShowForwardModal(false);
  };

  const handleCancel = () => {
    dispatch(setNormalSortFlag(null));
    dispatch(setNormalSortValue(null));
    dispatch(setRigionStatus("outbound"));
    dispatch(setPageNumber(0));
    if (currentURL === `/driver-dispatch/${driverId}`) {
      setCancelShow(false);
    }
    dispatch(resetDispatches());
    navigate(`/driver-dispatch/${driverId}`);
    toast.success("Changes Cancelled");
  };
  const handleContinue = () => {
    dispatch(setPageNumber(0));
    if (currentURL === `/driver-dispatch-compliance/${driverId}` && !hasExpiredItems) {
      if (hasCodriverComplianceExpired || hasBobtaildriverComplianceExpired) {
        setEnablePopupForCodriverOrBobTailDriver(true);
        let string = null;
        if (hasCodriverComplianceExpired) {
          string = "Co driver " + codriver;
        } else {
          if (hasBobtaildriverComplianceExpired) {
            string = "Bobtail driver " + bobTaildriver;
          }
        }
        setMsg(
          "Compliance For " +
            string +
            " has expired And He/She can not accompany the primary driver. Do you want to continue Dispatching?"
        );
      } else {
        if (divisionStatus === "flatbed" || divisionStatus === "popup" || divisionStatus === "truckCamper") {
          navigate(`/driver-dispatch-flatbed/${driverId}`);
        }
        if (regionStatus === "outbound") {
          if (
            divisionStatus !== "flatbed" &&
            divisionStatus !== "popup" &&
            divisionStatus !== "truckCamper"
          ) {
            navigate(`/driver-dispatch-outbound/${driverId}`);
          }
        } else {
          if (
            divisionStatus !== "flatbed" &&
            divisionStatus !== "popup" &&
            divisionStatus !== "truckCamper"
          ) {
            navigate(`/driver-dispatch-reload/${driverId}`);
          }
        }
        setDisable(false);
        dispatch(setViewDetail(true));
      }
    } else if (currentURL === `/driver-dispatch/${driverId}`) {
      unitCountValidation();
    } else if (currentURL === `/driver-dispatch-outbound/${driverId}`) {
      if (isValidationSuccess) {
        setDisable(false);
        navigate(`/outbound-unit-browse`);
      } else {
        setDisable(true);
      }
    } else if (currentURL === `/driver-dispatch-reload/${driverId}`) {
      if (isValidationSuccess) {
        setDisable(false);
        navigate(`/reload-unit-browse`);
      } else {
        setDisable(true);
      }
    } else if (currentURL === `/driver-dispatch-flatbed/${driverId}`) {
      if (isValidationSuccess) {
        setDisable(false);
        navigate(`/flatbed-unit-browse`);
      } else {
        setDisable(true);
      }
    }
  };

  const handleYESForcoDriverOrBobTailDriverPopup = () => {
    if (divisionStatus === "flatbed" || divisionStatus === "popup" || divisionStatus === "truckCamper") {
      navigate(`/driver-dispatch-flatbed/${driverId}`);
    }
    if (regionStatus === "outbound") {
      if (divisionStatus !== "flatbed" && divisionStatus !== "popup" && divisionStatus !== "truckCamper") {
        navigate(`/driver-dispatch-outbound/${driverId}`);
      }
    } else {
      if (divisionStatus !== "flatbed" && divisionStatus !== "popup" && divisionStatus !== "truckCamper") {
        navigate(`/driver-dispatch-reload/${driverId}`);
      }
    }
  };

  const handleNoForcoDriverOrBobTailDriverPopup = () => {
    setEnablePopupForCodriverOrBobTailDriver(false);
  };
  useEffect(() => {
    if (currentURL === `/driver-dispatch-compliance/${driverId}` && !hasExpiredItems) {
      setDisable(false);
    } else if (currentURL === `/driver-dispatch/${driverId}`) {
      setDisable(false);
    } else if (
      currentURL === `/driver-dispatch-outbound/${driverId}` ||
      currentURL === `/driver-dispatch-flatbed/${driverId}` ||
      currentURL === `/driver-dispatch-reload/${driverId}`
    ) {
      if (isValidationSuccess) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    } else {
      setDisable(true);
    }
  }, [currentURL, hasExpiredItems, isValidationSuccess]);

  useEffect(() => {
    if (!driverData && !(window.location.pathname == `/driver-dispatch/${driverId}`) && false) {
      navigate(`/driver-service-selection`);
    }
  }, [driverData]);

  return (
    <div className="d-flex  align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleContinue}
          disabled={disable}
        >
          Continue
        </button>

        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleCancel}
          hidden={currentURL === `/driver-dispatch/${driverId}`}
        >
          Cancel
        </button>
        {loading && valiatedUnitCount ? <LoadingIcon /> : ""}
        <ModalComponent
          show={cancelShow}
          onHide={""}

          title={"Cancel  Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={""}
          handleNO={""}
        />
        <ModalComponent
          show={showForwardModal || showBackwardModal}
          onHide={onHideUnitCountModal}
          showOK
          title={showForwardModal ? "Warning" : "Warning"}
          body={msg}
          handleYES={onHideUnitCountModal}
          showError={true}
        />
        <ModalComponent
          show={showForwardModal || showBackwardModal}
          onHide={onHideUnitCountModal}
          showOK
          title={showForwardModal ? "Warning" : "Warning"}
          body={msg}
          handleYES={onHideUnitCountModal}
          showError={true}
        />
        <ModalComponent
          show={enablePopupForCodriverOrBobTailDriver}
          onHide={handleNoForcoDriverOrBobTailDriverPopup}
          title={showForwardModal ? "Warning" : "Warning"}
          body={msg}
          handleYES={handleYESForcoDriverOrBobTailDriverPopup}
          handleNO={handleNoForcoDriverOrBobTailDriverPopup}
        />
      </div>
    </div>
  );
}

export default DispatchFooter;
