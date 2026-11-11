import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import NewDelayContent from "./NewDelayContent";
import CommonFooter from "../../../../common/CommonFooter";
import Header from "../../../../common/Header";
import { resetUnitSelectionFilters } from "../../../../../redux/EditMaster/UnitSelectionSlice";
import {
  resetEmailChanges,
  resetResourceList,
  setActiveKey,
  setAddFlag,
  setDelayedUnitCodeID,
  setDelayedUnitCodeInput,
  setEditMode,
  setNewEmailList,
  setNotes,
  setResourceList,
  setSelectedIndex,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../../common/ModalComponent";
import { toast } from "react-hot-toast";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { resetDelayUnitSelectionFilters } from "../../../../../redux/DispatchDelay/DelayProcessing/NewDelayedBrowseSlice";
import { resetDriverCheckinState, setDriverId } from "../../../../../redux/DriverCheckinSlice";
const NewDelayTemplate = () => {
  const { companyName, driverfk, unitfk } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [load, setLoad] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [saveFlag, setSaveFlag] = useState(false);
  const newGenerlTabValid = useSelector((state) => state.delayProcessing.newGenerlTabValid);
  const newEmailTabValid = useSelector((state) => state.delayProcessing.newEmailTabValid);
  const saveFormData = useSelector((state) => state.delayProcessing.saveFormData);

  const buttons = [
    {
      label: "Save",
      onClick: () => saveNewDelay(),
      disabled: saveFlag,
    },
    {
      label: "Cancel",
      onClick: () => onCancel(),
    },
  ];
  {
    /* New Delay Save */
  }
  const saveNewDelay = () => {
    setLoad(true);
    DelayProcessingService.saveNewDelay(saveFormData)
      .then((res) => {
        const result = res?.data?.[0];
        if (result?.OperationStatus === true) {
          toast.success("Delay record added");
        } else if (result?.OperationStatus === false) {
          toast.error("Failed to add Delay record");
        }
        setLoad(false);
        dispatch(setNewEmailList([]));
        dispatch(setResourceList([]));
        dispatch(resetEmailChanges());
        dispatch(setNotes(null));
        dispatch(setEditMode(false));
        dispatch(setSelectedIndex(null));
        dispatch(setAddFlag(false));
        dispatch(resetResourceList(false));
        dispatch(setDelayedUnitCodeID(""));
        dispatch(setDelayedUnitCodeInput(""));
        dispatch(resetUnitSelectionFilters());

        if (state?.origin === "CHECKIN") {
          dispatch(resetDriverCheckinState());
          navigate(state?.returnTo);
          return;
        } else if (localStorage.getItem("checkinDelay") === "true") {
          navigate("/driver-selection");
          dispatch(setDriverId(null));
        } else {
          navigate("/delay-processing/delayed-unit-browse");
        }
      })
      .catch((err) => {
        dispatch(setNewEmailList([]));
        dispatch(setResourceList([]));
        dispatch(resetEmailChanges());
        dispatch(setNotes(null));
        dispatch(setEditMode(false));
        dispatch(setSelectedIndex(null));
        dispatch(setAddFlag(false));
        dispatch(resetResourceList(false));
        dispatch(setDelayedUnitCodeID(""));
        dispatch(setDelayedUnitCodeInput(""));
        dispatch(resetUnitSelectionFilters());
        if (localStorage.getItem("checkinDelay") === "true") {
          navigate("/driver-selection");
          dispatch(setDriverId(null));
        } else {
          navigate("/delay-processing/delayed-unit-browse");
        }
        toast.error(" Falied to add Delay record ");
      });
  };

  {
    /* save validation */
  }
  useEffect(() => {
    if (newEmailTabValid && newGenerlTabValid) {
      setSaveFlag(false);
    } else {
      setSaveFlag(true);
    }
  }, [newEmailTabValid, newGenerlTabValid]);

  {
    /* Cancel Button */
  }
  const onCancel = () => {
    setCancelShow(true);
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    navigate(
      "/delay-processing/new-delayed-unit-confirmation/" + companyName + "/" + unitfk + "/" + driverfk
    );
    setCancelShow(false);
    dispatch(setNewEmailList([]));
    dispatch(setResourceList([]));
    dispatch(resetResourceList([]));
    dispatch(resetEmailChanges());
    dispatch(setNotes(null));
    dispatch(setEditMode(false));
    dispatch(setSelectedIndex(null));
    dispatch(setAddFlag(false));
    dispatch(setDelayedUnitCodeID(""));
    dispatch(setDelayedUnitCodeInput(""));
    toast.success("Changes cancelled");
  };

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header
          programName="Delay Processing"
          closeNavigationURL={`/delay-processing/new-delayed-unit-confirmation/${companyName}/${unitfk}/${driverfk}`}
          confirmClose
          closeModalTitle="Close Delay Changes"
          closeModalBody="Please confirm you want to close the program without saving your changes"
          closeConfirmationHandler={() => {
            dispatch(setNewEmailList([]));
            dispatch(setResourceList([]));
            dispatch(resetEmailChanges());
            dispatch(setNotes(null));
            dispatch(setEditMode(false));
            dispatch(setSelectedIndex(null));
            dispatch(setAddFlag(false));
            dispatch(resetResourceList(false));
            dispatch(setDelayedUnitCodeID(""));
            dispatch(setDelayedUnitCodeInput(""));
            dispatch(resetDelayUnitSelectionFilters());
          }}
        />
        <NewDelayContent />
        <CommonFooter buttons={buttons} />
        {load && (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
          </div>
        )}
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Delay Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
};

export default NewDelayTemplate;
