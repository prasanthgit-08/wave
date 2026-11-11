import React, { useEffect } from "react";
import UnitActivationFooter from "./UnitActivationFooter";
import UnitActivationHeader from "./UnitActivationHeader";
import UnitActivationService from "../../services/UnitActivationService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  setInProgress,
  setLoader,
  setOeUnitIndex,
  setPostToSister,
  setSaveData,
  setSaveDisable,
  setSelectedCompanies,
  setSelectedUnit,
  setShowUnitActivationDelay,
  setShowUnitActivationSoftPost,
  setUnitId,
  setUnitNumber,
  setUnitNumberLastFive,
  setUnitSelected,
} from "../../redux/UnitActivationSlice";
import WarningModalPopUp from "../common/WarningModalPopUp";
import { setShowUnitActivationScreen, setStatusForPlantToYard } from "../../redux/YardCheckinSlice";
import {
  setShowUnitActivationScreen as setShowUnitActivation,
  setActiveDispatch as setActivateUnit,
  setActiveDispatch,
} from "../../redux/EditYardUnitSlice";
import { setShowSingleUnitActivation } from "../../redux/OrderEntryFilterSlice";
import { useAppNavigate } from "../../hooks/useAppNavigate";

function UnitActivationSingleSoftPost(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { goBack } = useAppNavigate();
  const { shuttleYardcheckin, editYardUnit, orderEntry } = props;
  const sessionId = localStorage.getItem("sessionId") || null;

  const {
    browseType,
    selectedUnit,
    saveData,
    saveDisable,
    activeDispatch,
    active,
    postToSister,
    selectedCompanies,
    companyName,
    oeUnitIndex,
  } = useSelector((state) => state.unitActivationReducer);
  const oeUnitData = useSelector((state) => state.orderEntryReducer.oeUnitData);

  const [sisterCompanies, setSisterCompanies] = useState([]);
  const [selected, setSelected] = useState(false);
  const [modalPopup, setModalPopUp] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [saveMessage, setSaveMessage] = useState("Data Successfully saved.");

  const fetchSisterCompany = () => {
    UnitActivationService.getAllSisterCompanies()
      .then((response) => {
        setSisterCompanies(response.data);
      })
      .catch((error) => {});
  };

  const closeHandler = () => {
    dispatch(
      setSaveData({
        ...saveData,
        selectedCompanyPKList: [],
      })
    );
    if (postToSister !== "softSelect") {
      dispatch(setSelectedCompanies([]));
      dispatch(setPostToSister("no"));
    }
    if (editYardUnit || shuttleYardcheckin || orderEntry) {
      dispatch(setShowUnitActivationSoftPost(false));
    } else {
      goBack();
    }
  };

  const saveHandler = () => {
    dispatch(setLoader(true));
    const payload = { UnitActivationVO: [saveData], SessionID: sessionId, isMultibrowse: false };

    UnitActivationService.saveUnitActivation(payload)
      .then((response) => {
        let err = response?.data?.unsavedList?.[0];
        if (err) {
          setSaveError(true);
          setErrorMessage(`${err?.UnitNumber} - ${err.failedUnits}`);
          setModalPopUp(true);
          return;
        }
        dispatch(setLoader(false));
        if (response.data !== "") {
          if (activeDispatch && active) {
            if (postToSister === "softSelect") {
              setSaveMessage("Unit activated and Soft Select Posting records added successfully");
            }
          }
          setModalPopUp(true);
        }
      })
      .catch((err) => {
        dispatch(setLoader(false));
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
        dispatch(setLoader(false));
      });
  };

  /**
   * Calls warning popup model
   * to show the status of operations
   **/
  const warningPopupModalHide = () => {
    if (saveError === true) {
      dispatch(setLoader(false));
      setSaveError(false);
      setErrorMessage("");
      setModalPopUp(false);
    } else {
      dispatch(setUnitId(null));
      dispatch(setUnitNumber(""));
      dispatch(setUnitNumberLastFive(""));
      setModalPopUp(false);
      dispatch(setSaveData(null));
      dispatch(setSelectedUnit(null));
      dispatch(setUnitSelected(null));
      dispatch(setSelectedCompanies([]));

      if (shuttleYardcheckin) {
        dispatch(setStatusForPlantToYard("inYard"));
        dispatch(setShowUnitActivationSoftPost(false));
        dispatch(setShowUnitActivationScreen(false));
        navigate("/yard-checkin-unit-selection");
      } else if (editYardUnit) {
        dispatch(setShowUnitActivationSoftPost(false));
        dispatch(setShowUnitActivation(false));
        dispatch(setActiveDispatch(false));
        dispatch(setActivateUnit(false));
        navigate("/edit-yard-unit-selection");
      } else if (orderEntry) {
        if (oeUnitIndex === oeUnitData?.length - 1) {
          dispatch(setShowUnitActivationSoftPost(false));
          dispatch(setShowSingleUnitActivation(false));
        } else {
          dispatch(setShowUnitActivationSoftPost(false));
          dispatch(setOeUnitIndex(oeUnitIndex + 1));
        }
      } else {
        navigate("/unit-activation-single-selection");
      }
    }
  };

  useEffect(() => {
    dispatch(
      setSaveData({
        ...saveData,
        selectedCompanyPKList: selectedCompanies,
      })
    );

    if (selectedCompanies.length > 0) {
      dispatch(setSaveDisable(false));
    } else {
      dispatch(setSaveDisable(true));
    }
  }, [selectedCompanies]);

  useEffect(() => {
    if (browseType === "") navigate("/unit-activation-selections");
    else if (selectedUnit === null) navigate("/unit-activation-single-selection");
    else fetchSisterCompany();
    if (selectedUnit && !selectedUnit.alreadySoftSelect) {
      dispatch(setSelectedCompanies([]));
    }
  }, []);

  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <UnitActivationHeader closeButton={true} closeHandler={closeHandler} />
        <div className="p-2">
          <div className="shadow-sm rounded border halfScreenFormContentHeight">
            <table className="table table-striped f-w-600 mb-0">
              <thead>
                <tr disabled>
                  <th className="f-w-600 col-3">Post</th>
                  <th className="f-w-600">Sister Company</th>
                </tr>
              </thead>
              <tbody>
                {sisterCompanies.length > 0 &&
                  sisterCompanies.map((sisterCompany) => (
                    <tr
                      id="rowId"
                      key={sisterCompany.companyPK}
                      className={selectedCompanies.includes(sisterCompany.companyPK) ? "tableSelected" : ""}
                    >
                      <td>
                        <input
                          type="checkbox"
                          value={selectedCompanies.includes(sisterCompany.companyPK)}
                          checked={selectedCompanies.includes(sisterCompany.companyPK) ? true : false}
                          onClick={(e) => {
                            let list = selectedCompanies.filter((key) => key !== sisterCompany.companyPK);
                            if (e.target.checked) {
                              list.push(sisterCompany.companyPK);
                            }
                            dispatch(setSelectedCompanies(list));
                          }}
                        />
                      </td>
                      <td>{sisterCompany.name}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <UnitActivationFooter saveButton={true} saveHandler={saveHandler} />

        <WarningModalPopUp
          show={modalPopup}
          onHide={warningPopupModalHide}
          title={saveError === true ? "Error" : "Success"}
          body={saveError === true ? errorMessage : saveMessage}
          handleOK={warningPopupModalHide}
          showOK={true}
          color={saveError === true ? "red" : "black"}
        />
      </div>
    </div>
  );
}

export default UnitActivationSingleSoftPost;
