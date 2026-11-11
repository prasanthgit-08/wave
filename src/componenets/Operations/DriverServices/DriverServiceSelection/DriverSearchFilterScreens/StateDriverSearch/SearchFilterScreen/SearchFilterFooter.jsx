import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetListing,
  resetSearch,
  setInitialScreen,
  setIsStatesValid,
  setSelectedDriverId,
} from "../../../../../../../redux/DealerDriverSearchSlice";
import DriverSearchService from "../../../../../../../services/DriverSearchService";
import toast from "react-hot-toast";
import PreviewPopup from "../../../../../../common/PreviewPopup";

const SearchFilterFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialScreen = useSelector((state) => state.dealerDriverSearchSlice.initialScreen);
  const isStatesValid = useSelector((state) => state.dealerDriverSearchSlice.isStatesValid);
  const states = useSelector((state) => state.dealerDriverSearchSlice.states);
  const selectedDivison = useSelector((state) => state.dealerDriverSearchSlice.selectedDivison);
  const driverCDL = useSelector((state) => state.dealerDriverSearchSlice.driverCDL);
  const dispatcherId = useSelector((state) => state.dealerDriverSearchSlice.dispatcherId);
  const twicOnly = useSelector((state) => state.dealerDriverSearchSlice.twicOnly);
  const truckType = useSelector((state) => state.dealerDriverSearchSlice.truckType);
  const canadianOnly = useSelector((state) => state.dealerDriverSearchSlice.canadianOnly);
  const truckCodeId = useSelector((state) => state.dealerDriverSearchSlice.truckCodeId);
  const eldOnly = useSelector((state) => state.dealerDriverSearchSlice.eldOnly);
  const hasPintalHook = useSelector((state) => state.dealerDriverSearchSlice.hasPintalHook);
  const transportation = useSelector((state) => state.dealerDriverSearchSlice.transportation);
  const busQualified = useSelector((state) => state.dealerDriverSearchSlice.busQualified);
  const tractorQualified = useSelector((state) => state.dealerDriverSearchSlice.tractorQualified);
  const tenorMore38 = useSelector((state) => state.dealerDriverSearchSlice.tenorMore38);
  const hitchTowBar = useSelector((state) => state.dealerDriverSearchSlice.hitchTowBar);
  const output = useSelector((state) => state.dealerDriverSearchSlice.output);
  const miles = useSelector((state) => state.dealerDriverSearchSlice.miles);
  const searchBy = useSelector((state) => state.dealerDriverSearchSlice.searchBy);

  const [loadng, setLoadng] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState();

  const getReport = () => {
    setLoadng(true);
    const type = output === "Email PDF" ? "emailPdf" : output === "Email Excel" ? "emailExcel" : "display";
    DriverSearchService.getReport(
      selectedDivison,
      driverCDL,
      dispatcherId,
      null,
      states,
      null,
      twicOnly,
      canadianOnly,
      truckCodeId,
      eldOnly,
      hasPintalHook,
      truckType,
      transportation,
      busQualified,
      tractorQualified,
      tenorMore38,
      hitchTowBar,
      type,
      miles,
      searchBy
    )
      .then((response) => {
        setLoadng(false);
        const { data } = response;
        if (data.errorCode === 1) {
          toast.error(data.errorMessage);
        } else {
          toast.success(data.errorMessage);
          if (data.fileContent) {
            setShowPreview(true);
            setBase64PDF(data.fileContent);
          }
        }
      })
      .catch(() => {
        setLoadng(false);
      });
  };

  const isValidStates = () => {
    // Regular expression to match non-alphabet characters at the end of the string
    const regex = /[^a-zA-Z]$/;

    if (regex.test(states)) {
      dispatch(setIsStatesValid(false));
    } else {
      setLoadng(true);
      DriverSearchService.isValidStates(states)
        .then(({ data }) => {
          dispatch(setIsStatesValid(data));
          if (data) {
            if (output === "Display") {
              navigate("/state-driver-search/browse");
              dispatch(setSelectedDriverId(null));
              setLoadng(false);
            } else {
              getReport();
            }
          } else {
            setLoadng(false);
          }
        })
        .catch(() => {
          setLoadng(false);
          dispatch(setIsStatesValid(false));
        });
    }
  };

  const handleContinue = () => {
    if (initialScreen) {
      navigate("/state-driver-search/search");
      dispatch(setInitialScreen(false));
    } else {
      isValidStates();
    }
  };

  const handleCancel = () => {
    if (initialScreen) {
      navigate("/driver-service-selection");
    } else {
      navigate("/state-driver-search/initial");
    }
    dispatch(resetListing());
    dispatch(resetSearch());
  };

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap"></div>
      {loadng && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}

      <div className="d-flex align-items-center flex-wrap">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={() => handleContinue()}
          disabled={initialScreen || isStatesValid ? false : true}
        >
          Continue
        </button>
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={base64PDF} />
      </div>
    </div>
  );
};

export default SearchFilterFooter;
