import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetArrays,
  resetBrowsePage,
  resetSplitTripLocation,
  resetUndispatchDetails,
  setBackButtonFlag,
  setIsDelayBreakdown,
  setSelectedDispatch,
  setSplitTripFiles,
  setSplitTripMilesData,
  setUndispatchFlag,
} from "../../../../../../../../redux/UndispatchSlice";
import UndispatchService from "../../../../../../../../services/UndispatchService";
import toast from "react-hot-toast";
import DelayProcessingService from "../../../../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import ModalComponent from "../../../../../../../common/ModalComponent";
import { setDriverReleased } from "../../../../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import DispatchDetailHeader from "../../Load History/EditPage/DispatchDetailHeader";

const SplitTripFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { delayedunitPK, driverId, dispatchId, companyName, unitfk } = useParams();
  const dispatchData = useSelector((state) => state.undispatchReducer.dispatchData);
  const splitTripSave = useSelector((state) => state.undispatchReducer.splitTripSave);

  const driverReleased = useSelector((state) => state.delayProcessing.driverReleased);
  const driverAtFault = useSelector((state) => state.delayProcessing.driverAtFault);
  const releaseAtPickupLocation = useSelector((state) => state.undispatchReducer.releaseAtPickupLocation);
  const selectedCompanyName = useSelector((state) => state.unitSelection.selectedCompanyName);
  const generalData = useSelector((state) => state.delayProcessing.generalData);
  const isDelayBreakdown = useSelector((state) => state.undispatchReducer.isDelayBreakdown);
  const breakdown = generalData?.Breakdown;

  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });

  const [cancelShow, setCancelShow] = useState(false);
  const [saveFlag, setSaveFlag] = useState(false);
  const splitTripFiles = useSelector((state) => state.undispatchReducer.splitTripFiles);
  const {
    customerUploadFiles,
    companyUploadFiles,
    bolUploadFiles,
    dafUploadFiles,
    iftaUploadFiles,
    customerScanFiles,
    companyScanFiles,
    bolScanFiles,
    dafScanFiles,
    iftaScanFiles,
  } = splitTripFiles;

  const uploadDocument = () => {
    const customerPaperworkFiles = [...(customerUploadFiles ?? []), ...(customerScanFiles ?? [])];
    const companyPaperworkFiles = [...(companyUploadFiles ?? []), ...(companyScanFiles ?? [])];
    const bolFiles = [...(bolUploadFiles ?? []), ...(bolScanFiles ?? [])];
    const dafFiles = [...(dafUploadFiles ?? []), ...(dafScanFiles ?? [])];
    const iftaFiles = [...(iftaUploadFiles ?? []), ...(iftaScanFiles ?? [])];
    const allFilesEmpty =
      customerPaperworkFiles?.length === 0 &&
      companyPaperworkFiles?.length === 0 &&
      bolFiles?.length === 0 &&
      dafFiles?.length === 0 &&
      iftaFiles?.length === 0;
    if (!allFilesEmpty) {
      UndispatchService.saveSplitTripDocuments(
        dispatchId,
        customerPaperworkFiles,
        companyPaperworkFiles,
        bolFiles,
        dafFiles,
        iftaFiles,
        driverReleased ? releaseAtPickupLocation : false
      )
        .then(() => {
          setSaveFlag(false);
          if (!driverReleased) {
            navigate("/undispatch/" + driverId);
            toast.success("Split Done Successfully");
          } else {
            navigate(
              "/delay-processing/delayed-details/" +
                companyName +
                "/" +
                Number(unitfk) +
                "/" +
                Number(driverId) +
                "/" +
                Number(delayedunitPK)
            );
            dispatch(setDriverReleased(false));
            dispatch(setIsDelayBreakdown(false));
            localStorage.removeItem("driverRelease");
            toast.success("Driver Released Successfully");
          }
        })
        .catch(() => {
          if (!driverReleased) {
            navigate("/undispatch/" + driverId);
            toast.error("Split Failed");
          } else {
            navigate(
              "/delay-processing/delayed-details/" +
                companyName +
                "/" +
                Number(unitfk) +
                "/" +
                Number(driverId) +
                "/" +
                Number(delayedunitPK)
            );
            dispatch(setIsDelayBreakdown(false));
            dispatch(setDriverReleased(false));
            localStorage.removeItem("driverRelease");
            toast.error("Driver release failed.");
            setSaveFlag(false);
          }
        });
    } else {
      setSaveFlag(false);
      if (!driverReleased) {
        navigate("/undispatch/" + driverId);
        toast.success("Split Done Successfully");
      } else {
        navigate(
          "/delay-processing/delayed-details/" +
            companyName +
            "/" +
            Number(unitfk) +
            "/" +
            Number(driverId) +
            "/" +
            Number(delayedunitPK)
        );
        dispatch(setIsDelayBreakdown(false));
        dispatch(setDriverReleased(false));
        localStorage.removeItem("driverRelease");
        toast.success("Driver Released Successfully");
      }
    }
  };

  //location Screen
  const { miscellaneousFormDealerData } = useSelector((state) => state.undispatchReducer);

  //Miles Screen
  const {
    firstHalfDriverMiles,
    secondHalfDriverMiles,
    secondHalfActive,
    driverAbandonedUnit,

    firstHalfDriverFlatrate,
    secondHalfDriverFlatrate,
    tolls,
    permits,
    other,
    payRadioButton,
    otherDescription,
    isFlatrated,
  } = useSelector((state) => state.undispatchReducer);

  const splitTrip = () => {
    UndispatchService.onSplit(splitData)
      .then(({ data }) => {
        if (data.OperationStatus === true) {
          uploadDocument();
        } else {
          if (!driverReleased) {
            navigate("/undispatch/" + driverId);
            toast.error("Split Failed");
          } else {
            navigate(
              "/delay-processing/delayed-details/" +
                companyName +
                "/" +
                Number(unitfk) +
                "/" +
                Number(driverId) +
                "/" +
                Number(delayedunitPK)
            );
            dispatch(setIsDelayBreakdown(false));
            dispatch(setDriverReleased(false));
            localStorage.removeItem("driverRelease");
            toast.error("Driver Released Failed");
          }
        }
        dispatch(resetBrowsePage());
        dispatch(resetUndispatchDetails());
        dispatch(setSplitTripMilesData(null));
        dispatch(resetArrays());
        dispatch(setSelectedDispatch(null));
      })
      .catch(() => {
        if (!driverReleased) {
          navigate("/undispatch/" + driverId);
          toast.error("Split Failed");
        } else {
          navigate(
            "/delay-processing/delayed-details/" +
              companyName +
              "/" +
              Number(unitfk) +
              "/" +
              Number(driverId) +
              "/" +
              Number(delayedunitPK)
          );
          dispatch(setIsDelayBreakdown(false));
          dispatch(setDriverReleased(false));
          localStorage.removeItem("driverRelease");
          toast.error("Driver Released Failed");
        }
        setSaveFlag(false);
        dispatch(resetBrowsePage());
        dispatch(resetUndispatchDetails());
        dispatch(setSplitTripMilesData(null));
        dispatch(resetArrays());
      });
  };
  //location Screen

  // Combine the state into a single object
  const splitData = {
    dispatchPK: dispatchId,
    firstDriverMiles: firstHalfDriverMiles,
    secondDriverMiles: secondHalfDriverMiles,
    firstDriverFlatrate: firstHalfDriverFlatrate,
    secondDriverFlatrate: secondHalfDriverFlatrate,
    tolls,
    permits,
    other,
    payType: payRadioButton,
    otherDescription,
    driverAbandoned: driverAbandonedUnit,
    secondActive: secondHalfActive,
    flatrated: isFlatrated,
    unitAddressesVO: {
      ...miscellaneousFormDealerData,
    },
    releaseDriver: driverReleased ? true : false,
    delayedUnitPK: driverReleased ? delayedunitPK : null,
    breakdown: driverReleased ? breakdown || isDelayBreakdown : false,
  };

  const undispatchDriver = () => {
    const customerId = rowData?.customerIntFK || 0;
    const unitId = rowData?.unitPK || 0;
    const creditCardArrayList = [];
    UndispatchService.undispatchRecord(
      dispatchId,
      "None",
      secondHalfActive,
      "Next Driver",
      0,
      0,
      0,
      "Release Driver - Dispatch Delay",
      (dispatchData?.netPay || 0) - (dispatchData?.payBalance || 0),
      "", //checkinlist
      "", //reason for activa
      "", //hold authorised
      "", //hold note
      "", //hodl reason
      "", //delete reason
      firstHalfDriverFlatrate, //driver amount
      0, //invoice amount
      "", //apu authorized by
      "", //text1
      "", //text2
      "", //text3
      "", //text4
      null, //billing customerID
      true, // release driver
      delayedunitPK,
      creditCardArrayList,
      "", //transids
      null,
      "", //company,
      0, //deliveryDealerFlag,
      0, //overWidth,
      "Neither", //sisterNotification,
      0, //documentFlag,
      0, //chargeCreditCard
      0, //deleteChargeCreditCard
      driverReleased ? breakdown || isDelayBreakdown : false,
      "", //text1
      "", //text2
      "", //text3
      "", //text4
      "", //text5
      "", //text6
      "", //text7
      "", //text8
      "" //text9
    )
      .then(({ data }) => {
        uploadDocument();
        if (driverReleased) {
          navigate(
            "/delay-processing/delayed-details/" +
              companyName +
              "/" +
              Number(unitfk) +
              "/" +
              Number(driverId) +
              "/" +
              Number(delayedunitPK)
          );
          dispatch(setDriverReleased(false));
          dispatch(setIsDelayBreakdown(false));
          localStorage.removeItem("driverRelease");
        }
      })
      .catch(() => {
        setSaveFlag(false);
        toast.error("Error while Releasing Driver.");
        dispatch(setDriverReleased(false));
        dispatch(setIsDelayBreakdown(false));
        localStorage.removeItem("driverRelease");
      });
  };

  const onSplit = () => {
    setSaveFlag(true);
    if (releaseAtPickupLocation) {
      undispatchDriver();
    } else {
      splitTrip();
    }
  };

  const handleCancelYes = () => {
    if (!driverReleased) {
      navigate("/undispatch/" + driverId);
    } else {
      navigate(
        `/releasedriver-splittrip-location-screen/${driverId}/${delayedunitPK}/${dispatchId}/${unitfk}/${companyName}`
      );
      dispatch(resetUndispatchDetails());
      dispatch(setSplitTripMilesData(null));
      dispatch(setSplitTripFiles({ actionType: "clear" }));
      dispatch(resetSplitTripLocation());
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => setCancelShow(false);

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap  border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          onClick={onSplit}
          disabled={splitTripSave}
        >
          {!driverReleased ? "Split" : "Release"}
        </button>{" "}
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            if (!driverReleased) {
              navigate("/undispatch-splittrip-miles-screen/" + driverId + "/" + dispatchId);
            } else {
              if (releaseAtPickupLocation) {
                navigate(
                  `/releasedriver-splittrip-location-screen/${driverId}/${delayedunitPK}/${dispatchId}/${unitfk}/${companyName}`
                );
              } else {
                navigate(
                  `/releasedriver-splittrip-miles-screen/${driverId}/${delayedunitPK}/${dispatchId}/${unitfk}/${companyName}`
                );
              }
            }
          }}
        >
          Back
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={() => {
            if (driverReleased) {
              setCancelShow(true);
            } else {
              navigate("/undispatch/" + driverId);
              dispatch(setUndispatchFlag(false));
              dispatch(setBackButtonFlag(false));
              dispatch(resetUndispatchDetails());
              dispatch(setSplitTripMilesData(null));
              dispatch(setSplitTripFiles({ actionType: "clear" }));
              dispatch(resetSplitTripLocation());
            }
          }}
        >
          Cancel
        </button>
      </div>
      <ModalComponent
        show={cancelShow}
        onHide={handleCancelNo}
        title={"Cancel Release Driver"}
        body={"Please confirm you want to cancel Release Driver"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
      {saveFlag && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitTripFooter;
