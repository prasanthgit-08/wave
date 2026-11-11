import React, { useState } from "react";
import ButtonComponent from "../../../../common/Button";
import {
  setActiveDispatch,
  setCancelChanges,
  setEditUnitData,
  setPlantReturnCase,
  setSaveData,
  setShowUnitActivationScreen,
  setShuttleSave,
  setTotalElements,
  setTotalPages,
  setUnitDetails,
  setUnitShuttleDelayData,
  setViewDetail,
} from "../../../../../redux/EditYardUnitSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../../common/ModalComponent";
import EditYardUnitService from "../../../../../services/shuttle/process/EditYardUnitService";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
import { setBrowseType, setCompanyName } from "../../../../../redux/UnitActivationSlice";
import UnitActivationSingleSelectionScreenModal from "./UnitActivationSingleSelectionScreenModal";
import { useEffect } from "react";
import LoadingIcon from "../../../../common/LoadingIcon";
import PreviewPopup from "../../../../common/PreviewPopup";
import { getCurrentCompany } from "../../../../../utils/utils";

function EditYardUnitEditFooter() {
  const dispatch = useDispatch();
  const [cancelShow, setCancelShow] = useState(false);
  //Unit Activation
  const [showUnitActivateModal, setShowUnitActivateModal] = useState(false);

  const viewDetail = useSelector((state) => state.editYardUnitsReducer.viewDetail);
  const navigate = useNavigate();

  const [unitPK, setUnitPK] = useState(null);
  const [modalPopup, setModalPopUp] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveResponce, setSaveResponce] = useState([]);
  const [fileContent, setFileContent] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const saveData = useSelector((state) => state.editYardUnitsReducer.saveData);
  const activeDispatch = useSelector((state) => state.editYardUnitsReducer.activeDispatch);
  const showUnitActivationScreen = useSelector(
    (state) => state.editYardUnitsReducer.showUnitActivationScreen
  );
  const delay = useSelector((state) => state.editYardUnitsReducer.delay);
  const { saveDisable } = useSelector((state) => state.editYardUnitsReducer);
  const shuttleSave = useSelector((state) => state.editYardUnitsReducer.shuttleSave);
  const editUnitData = useSelector((state) => state.editYardUnitsReducer.editUnitData);
  const unitShuttleDelayData = useSelector((state) => state.editYardUnitsReducer.unitShuttleDelayData);
  const plantReturnCase = useSelector((state) => state.editYardUnitsReducer.plantReturnCase);
  const activeDispatchStatus = useSelector((state) => state.editYardUnitsReducer.activeDispatchStatus);

  const saveHandler = () => {
    setLoading(true);
    if (delay === "shuttle" && !shuttleSave && !unitShuttleDelayData) {
      navigate("/edit-yard-unit-shuttle-delay");
    } else {
      EditYardUnitService.saveEditYardUnit(saveData)
        .then((response) => {
          if (response?.data !== "") {
            setModalPopUp(true);
            setSaveResponce(response);
          }
        })
        .catch((error) => {
          dispatch(setShuttleSave(false));
          if (error?.response) {
            // The request was made and the server responded with a status code
            setSaveError(true);
            setErrorMessage(
              error?.response?.data?.message || "Sorry, something went wrong.Please try again."
            );
            setModalPopUp(true);
          } else if (error?.request) {
            // The request was made but no response was received
            setSaveError(true);
            setErrorMessage("Sorry, it's unable to establish a connection to the remote service.");
            setModalPopUp(true);
          } else {
            // Something happened in setting up the request that triggered an Error
            setErrorMessage(
              error?.response?.data?.message || "Sorry, something went wrong.Please try again."
            );
          }
          setSaveError(true);
        })
        .finally(() => setLoading(false));
    }
  };

  /**
   * For handling cancel
   */
  const handleCancelShow = () => {
    if (viewDetail === false || !unitPK) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      dispatch(setViewDetail(false));
      dispatch(setShuttleSave(false));
      dispatch(setUnitDetails([]));
      dispatch(setTotalElements(0));
      dispatch(setTotalPages(0));

      navigate("/edit-yard-unit-selection");
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelNo = () => {
    setCancelShow(false);
    dispatch(setViewDetail(false));
  };
  const handleCancelYes = () => {
    if (unitPK) {
      dispatch(setCancelChanges(true));
      if (
        delay === "shuttle" &&
        !unitShuttleDelayData &&
        window.location.pathname === "/edit-yard-unit-shuttle-delay"
      ) {
        navigate("/edit-yard-unit/" + unitPK);
        setCancelShow(false);
        dispatch(setViewDetail(false));
        dispatch(setShuttleSave(false));
        toast.success("Changes Cancelled");
      } else {
        setCancelShow(false);
        dispatch(setViewDetail(true));
        dispatch(setShuttleSave(false));
        dispatch(setActiveDispatch(activeDispatchStatus || false));
        toast.success("Changes Cancelled");
      }
    } else {
      navigate("/edit-yard-unit-selection");
      dispatch(setViewDetail(false));
      dispatch(setShuttleSave(false));
      dispatch(setActiveDispatch(activeDispatchStatus || false));
      toast.success("Changes Cancelled");
    }
  };

  const warningPopupModalHide = () => {
    dispatch(setShuttleSave(false));
    if (saveError === true) {
      setSaveError(false);
      setErrorMessage("");
      setModalPopUp(false);
    } else {
      setModalPopUp(false);
      dispatch(setSaveData(null));
      dispatch(setShuttleSave(false));

      if (plantReturnCase && saveResponce && saveResponce?.data) {
        const attachments = saveResponce?.data.body[0]?.attachments;

        if (attachments && typeof attachments === "object") {
          const firstFileKey = Object.keys(attachments)[0];
          const fileBase64 = attachments[firstFileKey];
          if (fileBase64) {
            setFileContent(attachments[firstFileKey]);
            setShowPreview(true);
            toast.success("Invoice generated successfully");
          } else {
            toast.error("No file content found");
          }
        }
      } else if (
        activeDispatch === true &&
        (activeDispatchStatus === false || activeDispatchStatus === null)
      ) {
        setShowUnitActivateModal(true);
        dispatch(setBrowseType("SingleUnits"));
        setPlantReturnCase(false);
      } else {
        setPlantReturnCase(false);
        navigate("/edit-yard-unit-selection");
      }
    }
  };

  useEffect(() => {
    if (editUnitData) {
      setUnitPK(editUnitData.unitPK);
    }
  }, [editUnitData]);

  const hidepopup = () => {
    setShowPreview(false);
    setPlantReturnCase(false);
    toast.success("Form generated successfully");
    if (activeDispatch && (!activeDispatchStatus || activeDispatchStatus === null)) {
      setShowUnitActivateModal(true);
      dispatch(setBrowseType("SingleUnits"));
    } else {
      navigate("/edit-yard-unit-selection");
    }
  };

  const fetchCurrentCompanyName = () => {
    EditYardUnitService.getCurrentCompanyName()
      .then((response) => {
        if (response.data !== "") {
          dispatch(setCompanyName(response.data));
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    fetchCurrentCompanyName();
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {loading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap">
        <ButtonComponent
          route={""}
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          label={"Edit"}
          onClick={() => dispatch(setViewDetail(false))}
          hidden={!viewDetail}
        />
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          route={""}
          hidden={viewDetail}
          disabled={saveDisable}
          onClick={() => {
            saveHandler();
          }}
        >
          Save
        </button>

        {/* Cancel */}
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleCancelShow}
        >
          Cancel
        </button>
        <ModalComponent
          show={cancelShow}
          onHide={handleCancelNo}
          title={"Cancel Edit Yard Unit Changes"}
          body={"Please confirm you want to cancel your changes"}
          handleYES={handleCancelYes}
          handleNO={handleCancelNo}
        />
        <PreviewPopup show={showPreview} base64PDF={fileContent} onHide={hidepopup} />

        <WarningModalPopUp
          show={modalPopup}
          onHide={warningPopupModalHide}
          title={saveError === true ? "Error" : "Success"}
          body={
            saveError === true
              ? errorMessage
              : delay === "dispatch"
                ? "Edit Yard Unit Data successfully saved. Do you want to proceed to Delay?"
                : "Edit Yard Unit Data successfully saved"
          }
          handleOK={warningPopupModalHide}
          handleNO={warningPopupModalHide}
          handleYES={() => {
            const company = getCurrentCompany();
            localStorage.setItem("editYardDelay", true);
            navigate(`/delay-processing/new-delayed-unit-confirmation/${company?.name}/${unitPK}/0`);
          }}
          showOK={!(delay === "dispatch")}
          showYes={delay === "dispatch"}
          showNo={delay === "dispatch"}
          color={saveError === true ? "red" : "black"}
        />

        {/* Unit Activation */}
        <WarningModalPopUp
          show={showUnitActivateModal}
          onHide={() => {
            setShowUnitActivateModal(false);
            navigate("/edit-yard-unit-selection");
          }}
          title={"Unit Activation"}
          body={"Do you want to activate the selected unit?"}
          showYes={true}
          handleYES={() => {
            dispatch(setShowUnitActivationScreen(true));
            setShowUnitActivateModal(false);
            dispatch(setActiveDispatch(false));
          }}
          showNo={true}
          handleNO={() => {
            setShowUnitActivateModal(false);
            navigate("/edit-yard-unit-selection");
            dispatch(setActiveDispatch(false));
          }}
        />
        <UnitActivationSingleSelectionScreenModal
          show={showUnitActivationScreen}
          onHide={() => {
            dispatch(setShowUnitActivationScreen(false));
            navigate("/edit-yard-unit-selection");
          }}
          editYardUnit
        />
      </div>
    </div>
  );
}

export default EditYardUnitEditFooter;
