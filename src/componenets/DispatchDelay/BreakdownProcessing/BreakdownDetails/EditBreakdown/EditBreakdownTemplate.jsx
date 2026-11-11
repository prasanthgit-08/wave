import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../common/Header";
import CommonFooter from "../../../../common/CommonFooter";
import EditBreakdownContent from "./EditBreakdownContent";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ModalComponent from "../../../../common/ModalComponent";
import BreakdownProcessingService from "../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import {
  setBreakdownDetailFlag,
  setEditEmailList,
  setEditSelectedIndex,
  setEditAddFlag,
  setEditDetailFlag,
  setDelayBreakdownDocumentFiles,
  setEditView,
  resetEditEmailChanges,
  setDocumentsTabRedisKeys,
  resetBreakdowbBrowsePage,
  setRepairPlantFlag,
} from "../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
const EditBreakdownTemplate = () => {
  const { breakdownFK } = useParams();
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");
  const breakdownUnitFK = localStorage.getItem("breakdownUnitFK");
  const breakdownDriverFK = localStorage.getItem("breakdownDriverFK");
  const delayedUnitFK = localStorage.getItem("delayedUnitFK");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [saveFlag, setSaveFlag] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const editGenerlTabValid = useSelector((state) => state.delaybreakdown.editGenerlTabValid);
  const editEmailTabValid = useSelector((state) => state.delaybreakdown.editEmailTabValid);
  const editSaveFormData = useSelector((state) => state.delaybreakdown.editSaveFormData);
  const editDocumentTabValid = useSelector((state) => state.delaybreakdown.editDocumentTabValid);
  const documentsTabRedisKeys = useSelector((state) => state.delaybreakdown.documentsTabRedisKeys);

  const buttons = [
    {
      label: "Save",
      onClick: () => saveNewBreakdown(),
      disabled: saveFlag,
    },
    {
      label: "Cancel",
      onClick: () => onCancel(),
    },
  ];

  //save

  //cancel button
  const onCancel = () => {
    setCancelShow(true);
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    navigate(`/breakdown-processing/view-breakdown/${breakdownFK}`);
    dispatch(setBreakdownDetailFlag(false));
    setCancelShow(false);
    dispatch(setEditEmailList([]));
    dispatch(resetEditEmailChanges());
    dispatch(setEditView(false));
    dispatch(setEditSelectedIndex(null));
    dispatch(setEditAddFlag(false));
    dispatch(setDocumentsTabRedisKeys([]));
    dispatch(setDelayBreakdownDocumentFiles({ actionType: "clear" }));
    dispatch(setRepairPlantFlag(""));

    toast.success("Changes cancelled");
  };

  //save validation
  useEffect(() => {
    if (editGenerlTabValid && editEmailTabValid && editDocumentTabValid) {
      setSaveFlag(false);
    } else {
      setSaveFlag(true);
    }
  }, [editGenerlTabValid, editEmailTabValid, editDocumentTabValid]);

  const formatBreakdownNotes = (value) => {
    if (!value) return null;
    return value
      .split(/\n\s*\n/)
      .map((c) => `<BreakdownNotes>\n${c?.trim()}\n<BreakdownNotes>`)
      .join("\n");
  };

  //save
  const saveNewBreakdown = () => {
    setLoad(true);
    const payload = {
      ...editSaveFormData,
      redisKeys: documentsTabRedisKeys,
      customerNotes: formatBreakdownNotes(editSaveFormData?.customerNotes),
      inHouseNotes: formatBreakdownNotes(editSaveFormData?.inHouseNotes),
    };

    BreakdownProcessingService.saveBreakdown(payload)
      .then((res) => {
        setLoad(false);
        setCancelShow(false);
        dispatch(setEditEmailList([]));
        dispatch(resetEditEmailChanges());
        dispatch(setEditView(false));
        dispatch(setEditSelectedIndex(null));
        dispatch(setEditAddFlag(false));
        dispatch(setDelayBreakdownDocumentFiles({ actionType: "clear" }));
        dispatch(setDocumentsTabRedisKeys({ actionType: "clear" }));
        dispatch(setRepairPlantFlag(""));

        toast.success("Breakdown record updated");
        if (editSaveFormData?.activateUnit) {
          navigate(`/unit-activation-single-selection/${breakdownUnitFK}`);
        } else {
          navigate(
            "/breakdown/browse/" +
              breakdownCompanyName +
              "/" +
              Number(breakdownUnitFK) +
              "/" +
              Number(breakdownDriverFK) +
              "/" +
              Number(delayedUnitFK)
          );
          setTimeout(() => {
            dispatch(setBreakdownDetailFlag(false));
          }, 300);
        }
      })
      .catch((err) => {
        dispatch(setEditEmailList([]));
        dispatch(resetEditEmailChanges());
        dispatch(setEditView(false));
        dispatch(setEditSelectedIndex(null));
        dispatch(setEditAddFlag(false));
        dispatch(setDocumentsTabRedisKeys({ actionType: "clear" }));
        dispatch(setDelayBreakdownDocumentFiles({ actionType: "clear" }));
        dispatch(setRepairPlantFlag(""));

        navigate(
          "/breakdown/browse/" +
            breakdownCompanyName +
            "/" +
            Number(breakdownUnitFK) +
            "/" +
            Number(breakdownDriverFK) +
            "/" +
            Number(delayedUnitFK)
        );
        setTimeout(() => {
          dispatch(setBreakdownDetailFlag(false));
        }, 300);
        toast.error(" Falied to update Breakdown record ");
      });
  };

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header
          programName="Breakdown Processing"
          closeNavigationURL={`/delay-processing/delayed-details/${breakdownCompanyName}/${Number(breakdownUnitFK)}/${Number(breakdownDriverFK)}/${Number(
            delayedUnitFK
          )}`}
          confirmClose
          closeModalTitle="Close Breakdown Changes"
          closeModalBody="Please confirm you want to close the program without saving your changes"
          closeConfirmationHandler={() => {
            dispatch(resetBreakdowbBrowsePage());
            dispatch(setBreakdownDetailFlag(false));
            dispatch(setEditEmailList([]));
            dispatch(resetEditEmailChanges());
            dispatch(setEditView(false));
            dispatch(setEditSelectedIndex(null));
            dispatch(setEditAddFlag(false));
            dispatch(setRepairPlantFlag(""));
            dispatch(setDocumentsTabRedisKeys({ actionType: "clear" }));
            dispatch(setDelayBreakdownDocumentFiles({ actionType: "clear" }));
          }}
        />
        <EditBreakdownContent />

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
          title={"Cancel Breakdown Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
};

export default EditBreakdownTemplate;
