import React, { useEffect, useState } from "react";
import ModalComponent from "../../../../common/ModalComponent";
import {
  setEditEmailList,
  resetEditEmailChanges,
  setEditView,
  setEditSelectedIndex,
  setEditAddFlag,
  setEditDetailFlag,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import Header from "../../../../common/Header";
import CommonFooter from "../../../../common/CommonFooter";
import EditDelayContent from "./EditDelayContent";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
const EditDelayTemplate = () => {
  const { companyName, driverfk, unitfk, delayedUnitPK } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [saveFlag, setSaveFlag] = useState(false);
  const editGenerlTabValid = useSelector((state) => state.delayProcessing.editGenerlTabValid);
  const editEmailTabValid = useSelector((state) => state.delayProcessing.editEmailTabValid);
  const editSaveFormData = useSelector((state) => state.delayProcessing.editSaveFormData);
  const buttons = [
    {
      label: "Save",
      onClick: () => saveEditDelay(),
      disabled: saveFlag,
    },
    {
      label: "Cancel",
      onClick: () => onCancel(),
    },
  ];

  const formatDelayNotes = (value) => {
    if (!value) return null;
    return value
      .split(/\n\s*\n/)
      .map((c) => `<DelayNotes>\n${c?.trim()}\n<DelayNotes>`)
      .join("\n");
  };

  {
    /* Edit Delay Save */
  }
  const saveEditDelay = () => {
    setLoad(true);
    const payload = {
      ...editSaveFormData,
      delayCustomerNotes: formatDelayNotes(editSaveFormData?.delayCustomerNotes),
      delayInHouseNotes: formatDelayNotes(editSaveFormData?.delayInHouseNotes),
    };

    DelayProcessingService.saveEditDelay(payload)
      .then((res) => {
        const result = res?.data?.[0];
        if (result?.OperationStatus === true) {
          toast.success("Delay record updated");
        } else if (result?.OperationStatus === false) {
          toast.error("Failed to update Delay record");
        }
        setLoad(false);
        dispatch(setEditEmailList([]));
        dispatch(resetEditEmailChanges());
        dispatch(setEditView(false));
        dispatch(setEditSelectedIndex(null));
        dispatch(setEditAddFlag(false));
        dispatch(setEditDetailFlag(false));
        navigate("/delay-processing/delayed-unit-browse");
      })
      .catch((err) => {
        dispatch(setEditEmailList([]));
        dispatch(resetEditEmailChanges());
        dispatch(setEditView(false));
        dispatch(setEditSelectedIndex(null));
        dispatch(setEditAddFlag(false));
        dispatch(setEditDetailFlag(false));
        navigate("/delay-processing/delayed-unit-browse");
        toast.error(" Falied to update Delay record ");
      });
  };

  {
    /* Cancel Button */
  }
  const onCancel = () => {
    setCancelShow(true);
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    navigate(
      `/delay-processing/delayed-details/${companyName}/${Number(unitfk)}/${Number(driverfk)}/${Number(delayedUnitPK)}`
    );

    setCancelShow(false);
    dispatch(setEditEmailList([]));
    dispatch(resetEditEmailChanges());
    dispatch(setEditView(false));
    dispatch(setEditSelectedIndex(null));
    dispatch(setEditAddFlag(false));
    dispatch(setEditDetailFlag(false));
    toast.success("Changes cancelled");
  };

  {
    /* save validation */
  }
  useEffect(() => {
    if (editGenerlTabValid && editEmailTabValid) {
      setSaveFlag(false);
    } else {
      setSaveFlag(true);
    }
  }, [editGenerlTabValid, editEmailTabValid]);

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header
          programName="Delay Processing"
          closeNavigationURL={`/`}
          confirmClose
          closeModalTitle="Close Delay Changes"
          closeModalBody="Please confirm you want to close the program without saving your changes"
          closeConfirmationHandler={() => {
            dispatch(setEditEmailList([]));
            dispatch(resetEditEmailChanges());
            dispatch(setEditView(false));
            dispatch(setEditSelectedIndex(null));
            dispatch(setEditAddFlag(false));
            dispatch(setEditDetailFlag(false));
          }}
        />
        <EditDelayContent />
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

export default EditDelayTemplate;
