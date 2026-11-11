import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditShuttleService from "../../../../../services/shuttle/process/EditShuttleService";
import toast from "react-hot-toast";
import {
  resetUnitDetails,
  resetYardToYard,
  setCompanyFK,
  setCompanyName,
  setCurrentCompanyFetch,
  setRestoreEditShuttleUnit,
  setUnitNumberInput,
  setUnitNumberPK,
  setUnitShuttleData,
  setUnitShuttlePK,
} from "../../../../../redux/EditShuttleSlice";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";
import ModalComponent from "../../../../common/ModalComponent";
import LoadingIcon from "../../../../common/LoadingIcon";

function EditShuttleYardToYardFooter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modalPopup, setModalPopUp] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [saveDisable, setSaveDisable] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const unitShuttlePK = useSelector((state) => state.editShuttleReducer.unitShuttlePK);
  const driverData = useSelector((state) => state.editShuttleReducer.driverData);
  const unitNumberPK = useSelector((state) => state.editShuttleReducer.unitNumberPK);
  const pickupYardId = useSelector((state) => state.editShuttleReducer.pickupYardId);
  const deliveryYardId = useSelector((state) => state.editShuttleReducer.deliveryYardId);
  const shuttleAmount = useSelector((state) => state.editShuttleReducer.shuttleAmount);
  const shuttleDate = useSelector((state) => state.editShuttleReducer.shuttleDate);
  const warningMessage = useSelector((state) => state.editShuttleReducer.warningMessage);
  const row = useSelector((state) => state.editShuttleReducer.row);
  const position = useSelector((state) => state.editShuttleReducer.position);
  const miles = useSelector((state) => state.editShuttleReducer.miles);
  const editReason = useSelector((state) => state.editShuttleReducer.editReason);
  const companyName = useSelector((state) => state.editShuttleReducer.companyName);
  const isCrossDB = useSelector((state) => state.editShuttleReducer.isCrossDB);
  const sisterUnitShuttleFK = useSelector((state) => state.editShuttleReducer.sisterUnitShuttleFK);
  const dropSisterYardCode = useSelector((state) => state.editShuttleReducer.dropSisterYardCode);
  const pickupSisterYardCode = useSelector((state) => state.editShuttleReducer.pickupSisterYardCode);
  const yardToYardCity = useSelector((state) => state.editShuttleReducer.yardToYardCity);
  const yardToYardState = useSelector((state) => state.editShuttleReducer.yardToYardState);
  const yardToYardPostCode = useSelector((state) => state.editShuttleReducer.yardToYardPostCode);
  const isShuttleDateValid = useSelector((state) => state.editShuttleReducer.isShuttleDateValid);

  const unitShuttlesVO = {
    unitShuttlePK: unitShuttlePK,
    sisterUnitShuttleFK: sisterUnitShuttleFK,
    driverFK: driverData,
    unitFK: {
      unitPK: unitNumberPK,
    },
    yardTransfer: true,
    dropYardFK: {
      yardPK: deliveryYardId,
      city: yardToYardCity,
      stateCode: yardToYardState,
      postalCode: yardToYardPostCode,
    },
    pickupYardFK: {
      yardPK: pickupYardId,
    },
    amount: shuttleAmount,
    shuttleDate: shuttleDate,
    yardRow: row,
    yardPosition: position,
    miles: miles,
    editReason: editReason,
    companyName: companyName,
    isCrossDBSave: isCrossDB,
    pickupSisterYardCode: pickupSisterYardCode,
    dropSisterYardCode: dropSisterYardCode,
  };

  const saveUnitShuttlesData = () => {
    setSaveLoading(true);
    EditShuttleService.saveUnitShuttlesData(unitShuttlesVO)
      .then((response) => {
        if (response.data !== "") {
          setModalPopUp(true);
        }
      })
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          setSaveError(true);
          setErrorMessage(err.response.data.errorMsg || "Sorry, something went wrong.Please try again.");
          setModalPopUp(true);
        } else if (err.request) {
          // The request was made but no response was received
          setSaveError(true);
          setErrorMessage("Sorry, it's unable to establish a connection to the remote service.");
          setModalPopUp(true);
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMessage(err.response.data.errorMsg || "Sorry, something went wrong.Please try again.");
        }

        setSaveError(true);
      })
      .finally(() => {
        setSaveLoading(false);
      });
  };

  const reset = () => {
    dispatch(setCurrentCompanyFetch(false));
  };

  const warningPopupModalHide = () => {
    if (saveError === true) {
      setSaveError(false);
      setErrorMessage("");
      setModalPopUp(false);
    } else {
      setModalPopUp(false);
      reset();
      dispatch(resetYardToYard());
      dispatch(resetUnitDetails());
      dispatch(setCompanyFK(null));
      dispatch(setCompanyName(""));
      navigate("/edit-shuttle-unit");
    }
  };

  const handleSaveOnClick = () => {
    saveUnitShuttlesData();
  };

  const handleCancelOnClick = () => {
    setCancelShow(true);
  };

  const handleCancelNo = () => {
    setCancelShow(false);
  };

  const handleCancelYes = () => {
    setCancelShow(false);
    reset();
    dispatch(resetYardToYard());
    navigate("/edit-shuttle-unit");
    toast.success("Changes Cancelled");
  };

  useEffect(() => {
    if (
      driverData != null &&
      unitNumberPK != null &&
      pickupYardId !== null &&
      deliveryYardId !== null &&
      shuttleDate !== "" &&
      isShuttleDateValid &&
      shuttleAmount !== "" &&
      row !== "" &&
      editReason &&
      warningMessage === ""
    ) {
      setSaveDisable(false);
    } else {
      setSaveDisable(true);
    }
  }, [
    deliveryYardId,
    driverData,
    editReason,
    pickupYardId,
    row,
    shuttleAmount,
    shuttleDate,
    unitNumberPK,
    warningMessage,
    isShuttleDateValid,
  ]);

  return (
    <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      {saveLoading && <LoadingIcon />}
      <div className="d-flex align-items-center flex-wrap">
        {/* Save */}
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 "
          type="button"
          disabled={saveDisable}
          onClick={handleSaveOnClick}
        >
          Save
        </button>

        {/* Cancel */}
        <button
          className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
          type=""
          onClick={handleCancelOnClick}
        >
          Cancel
        </button>
      </div>
      <WarningModalPopUp
        show={modalPopup}
        onHide={warningPopupModalHide}
        title={saveError === true ? "Error" : "Success"}
        body={saveError === true ? errorMessage : "Yard to Yard Shuttle Data saved Successfully."}
        handleOK={warningPopupModalHide}
        showOK={true}
        color={saveError === true ? "red" : "black"}
      />

      {/* edit Cancel Confirmation Modal */}
      <ModalComponent
        show={cancelShow}
        onHide={() => setCancelShow(false)}
        title={"Cancel Yard to Yard Shuttle Shuttle Changes"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
    </div>
  );
}

export default EditShuttleYardToYardFooter;
