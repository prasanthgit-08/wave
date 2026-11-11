import React, { useEffect, useState } from "react";
import Header from "../../../../common/Header";
import EditDamgeContent from "./EditDamgeContent";
import CommonFooter from "../../../../common/CommonFooter";
import ModalComponent from "../../../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetClaimChanges,
  resetDamageBrowsePage,
  resetEditEmailChanges,
  resetGeneralChanges,
  setClaimsVO,
  setDamageDetailFlag,
  setDelayDamageDocumentFiles,
  setDocumentsTabRedisKeys,
  setEditAddFlag,
  setEditEmailList,
  setEditSelectedIndex,
  setEditView,
  setRepairPlantFlag,
} from "../../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";
import toast from "react-hot-toast";
import DelayDamageService from "../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import { setReserveBondFundFK } from "../../../../../redux/DispatchDelay/DelayProcessing/DelayUnitCheckRequestSlice";

const EditDamageTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [saveFlag, setSaveFlag] = useState(false);
  const damageCompanyName = localStorage.getItem("damageCompanyName");
  const damageUnitFK = localStorage.getItem("damageUnitFK");
  const damageDriverFK = localStorage.getItem("damageDriverFK");
  const delayedUnitFK = localStorage.getItem("delayedUnitFK");
  const { damageFK } = useParams();
  const documentsTabRedisKeys = useSelector((state) => state.damageReducer.documentsTabRedisKeys);
  const editGenerlTabValid = useSelector((state) => state.damageReducer.editGenerlTabValid);
  const editClaimTabValid = useSelector((state) => state.damageReducer.editClaimTabValid);
  const editDocumentTabValid = useSelector((state) => state.damageReducer.editDocumentTabValid); //save validation
  const editEmailTabValid = useSelector((state) => state.damageReducer.editEmailTabValid);
  const editSaveFormData = useSelector((state) => state.damageReducer.editSaveFormData);
  const claimsVO = useSelector((state) => state.damageReducer.claimsVO);
  useEffect(() => {
    if (editGenerlTabValid && editEmailTabValid && editDocumentTabValid && editClaimTabValid) {
      setSaveFlag(false);
    } else {
      setSaveFlag(true);
    }
  }, [editGenerlTabValid, editEmailTabValid, editDocumentTabValid, editClaimTabValid]);

  const formatDamageNotes = (value) => {
    if (!value) return null;
    return value
      .split(/\n\s*\n/)
      .map((c) => `<DamageNotes>\n${c?.trim()}\n<DamageNotes>`)
      .join("\n");
  };

  const resetClaimsVO = {
    responsiblePartyName: "",
    responsiblePartyAddress1: "",
    responsiblePartyAddress2: "",
    responsiblePartyCity: "",
    responsiblePartyStateCode: "",
    responsiblePartyPostCode: "",
    responsiblePartyPhone: "",
    responsiblePartyFax: "",
    responsiblePartyEmail: "",
    responsiblePartyContact: "",
    responsiblePartyCanadian: 0,
    insuranceCompanyName: "",
    insuranceCompanyAddress1: "",
    insuranceCompanyAddress2: "",
    insuranceCompanyCity: "",
    insuranceCompanyStateCode: "",
    insuranceCompanyPostCode: "",
    insuranceCompanyPhone: "",
    insuranceCompanyFax: "",
    insuranceCompanyEmail: "",
    insuranceCompanyContact: "",
    insuranceCompanyCanadian: 0,
  };
  //  //save
  const saveEditDamage = () => {
    setLoad(true);
    const payload = {
      ...editSaveFormData,
      claimVO: claimsVO,
      redisKeys: documentsTabRedisKeys,
      customerNotes: formatDamageNotes(editSaveFormData?.customerNotes),
      inhouseNotes: formatDamageNotes(editSaveFormData?.inhouseNotes),
    };

    DelayDamageService.saveDelayDamge(payload)
      .then((res) => {
        setLoad(false);
        setCancelShow(false);
        dispatch(setEditEmailList([]));
        dispatch(resetEditEmailChanges());
        dispatch(setEditView(false));
        dispatch(setEditSelectedIndex(null));
        dispatch(setEditAddFlag(false));
        dispatch(setDelayDamageDocumentFiles({ actionType: "clear" }));
        dispatch(setDocumentsTabRedisKeys({ actionType: "clear" }));
        dispatch(resetGeneralChanges());
        dispatch(resetClaimChanges());
        dispatch(setRepairPlantFlag(""));

        toast.success("Damage record updated");
        navigate(
          "/damage-browse/" +
            damageCompanyName +
            "/" +
            Number(damageUnitFK) +
            "/" +
            Number(damageDriverFK) +
            "/" +
            Number(delayedUnitFK)
        );
        setTimeout(() => {
          dispatch(setDamageDetailFlag(false));
        }, 300);
      })
      .catch((err) => {
        setCancelShow(false);
        dispatch(setEditEmailList([]));
        dispatch(resetEditEmailChanges());
        dispatch(setEditView(false));
        dispatch(setEditSelectedIndex(null));
        dispatch(setEditAddFlag(false));
        dispatch(setDelayDamageDocumentFiles({ actionType: "clear" }));
        dispatch(setDocumentsTabRedisKeys({ actionType: "clear" }));
        dispatch(resetGeneralChanges());
        dispatch(resetClaimChanges());
        dispatch(setRepairPlantFlag(""));
        navigate(
          "/damage-browse/" +
            damageCompanyName +
            "/" +
            Number(damageUnitFK) +
            "/" +
            Number(damageDriverFK) +
            "/" +
            Number(delayedUnitFK)
        );
        setTimeout(() => {
          dispatch(setDamageDetailFlag(false));
        }, 300);
        toast.error(" Falied to update Damage record ");
      })
      .finally(() => {
        dispatch(setClaimsVO(resetClaimsVO));
      });
  };

  const buttons = [
    {
      label: "Save",
      onClick: () => saveEditDamage(),
      disabled: saveFlag,
    },
    {
      label: "Cancel",
      onClick: () => onCancel(),
    },
  ];
  const onCancel = () => {
    setCancelShow(true);
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    navigate(`/damage-processing/view-damage/${damageFK}`);
    dispatch(setDamageDetailFlag(false));
    setCancelShow(false);
    dispatch(setEditEmailList([]));
    dispatch(resetEditEmailChanges());
    dispatch(setEditView(false));
    dispatch(setEditSelectedIndex(null));
    dispatch(setEditAddFlag(false));
    dispatch(setDocumentsTabRedisKeys([]));
    dispatch(setDelayDamageDocumentFiles({ actionType: "clear" }));
    dispatch(resetGeneralChanges());
    dispatch(resetClaimChanges());
    dispatch(setRepairPlantFlag(""));
    dispatch(setClaimsVO(resetClaimsVO));
    toast.success("Changes cancelled");
  };
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header
          programName="Breakdown Processing"
          closeNavigationURL={`/delay-processing/delayed-details/${damageCompanyName}/${Number(
            damageUnitFK
          )}/${Number(damageDriverFK)}/${Number(delayedUnitFK)}`}
          confirmClose
          closeModalTitle="Close Damage Changes"
          closeModalBody="Please confirm you want to close the program without saving your changes"
          closeConfirmationHandler={() => {
            dispatch(resetDamageBrowsePage());
            dispatch(setDamageDetailFlag(false));
            dispatch(setEditEmailList([]));
            dispatch(resetEditEmailChanges());
            dispatch(setEditView(false));
            dispatch(setEditSelectedIndex(null));
            dispatch(setEditAddFlag(false));
            dispatch(setDocumentsTabRedisKeys({ actionType: "clear" }));
            dispatch(setDelayDamageDocumentFiles({ actionType: "clear" }));
            dispatch(resetGeneralChanges());
            dispatch(resetClaimChanges());
            dispatch(setRepairPlantFlag(""));
            dispatch(setReserveBondFundFK(null));
            dispatch(setClaimsVO(resetClaimsVO));
          }}
        />
        <EditDamgeContent />

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
          title={"Cancel Damage Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
      </div>
    </div>
  );
};

export default EditDamageTemplate;
