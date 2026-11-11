import React, { useState } from "react";
import DamageSafetyContent from "./DamageSafetyContent";
import Header from "../../../common/Header";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import CommonFooter from "../../../common/CommonFooter";
import DelayDamageService from "../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";
import {
  setSaveData,
  resetChanges,
  setDelayDamageValue,
  setDamageSafetyFlag,
} from "../../../../redux/DelayDamageSafetySlice";
const DamageSafetyTemplate = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = params.id;
  const [cancelShow, setCancelShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const saveData = useSelector((state) => state.delayDamageSafetyReducer.saveData);
  const saveFlag = useSelector((state) => state.delayDamageSafetyReducer.saveFlag);

  const save = () => {
    setLoader(true);
    DelayDamageService.saveDamageSafety(saveData)
      .then((response) => {
        setLoader(false);
        dispatch(resetChanges());
        dispatch(setDamageSafetyFlag(false));
        navigate("/damage-processing/view-damage/" + id);
        toast.success("Damage Safety save sucessfull");
      })
      .catch((error) => {
        setLoader(false);
        dispatch(resetChanges());
        dispatch(setDamageSafetyFlag(false));
        navigate("/damage-processing/view-damage/" + id);
        toast.error(" Damage Safety  Save Failed .");
        console.log(error);
      });
  };

  const onCancel = () => {
    setCancelShow(true);
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    setCancelShow(false);
    dispatch(setDamageSafetyFlag(false));
    navigate("/damage-processing/view-damage/" + id);
    dispatch(resetChanges());

    dispatch(setSaveData(null));
    toast.success("Changes cancelled");
  };
  const buttons = [
    { label: "Save", onClick: () => save(), disabled: saveFlag },
    { label: "Cancel", onClick: () => onCancel() },
  ];

  return (
    <QuarterScreenWrapper>
      <Header
        programName="Delay Damage Safety"
        confirmClose
        closeModalTitle="Close Delay Damage Safety Changes"
        closeModalBody="Please confirm you want to close the program without saving your changes"
        closeConfirmationHandler={() => {
          dispatch(resetChanges());
          dispatch(setDamageSafetyFlag(false));
        }}
        closeNavigationURL={`/damage-processing/view-damage/${id}`}
      />

      <DamageSafetyContent />

      <CommonFooter buttons={buttons} />
      {loader && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
      {/* edit Cancel Confirmation Modal */}
      <ModalComponent
        show={cancelShow}
        onHide={handleCancelNo}
        title={"Cancel Delay Damage Safety Changes"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
    </QuarterScreenWrapper>
  );
};
export default DamageSafetyTemplate;
