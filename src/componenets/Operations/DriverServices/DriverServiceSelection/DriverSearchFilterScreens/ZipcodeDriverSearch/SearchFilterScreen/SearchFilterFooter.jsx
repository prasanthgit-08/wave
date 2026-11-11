import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetListing,
  resetSearch,
  setInitialScreen,
  setIsZipcodeValid,
  setSelectedDivison,
  setSelectedDriverId,
} from "../../../../../../../redux/DealerDriverSearchSlice";
import DriverSearchService from "../../../../../../../services/DriverSearchService";
import toast from "react-hot-toast";
import PreviewPopup from "../../../../../../common/PreviewPopup";

const SearchFilterFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialScreen = useSelector((state) => state.dealerDriverSearchSlice.initialScreen);
  const isZipcodesValid = useSelector((state) => state.dealerDriverSearchSlice.isZipcodesValid);
  const zipcode = useSelector((state) => state.dealerDriverSearchSlice.zipcode);
  const miles = useSelector((state) => state.dealerDriverSearchSlice.miles);
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
  const searchBy = useSelector((state) => state.dealerDriverSearchSlice.searchBy);

  const [loadng, setLoadng] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState();

  const isValidZipcode = () => {
    setLoadng(true);
    DriverSearchService.isValidZipcode(zipcode)
      .then(({ data }) => {
        dispatch(setIsZipcodeValid(data));
        if (data) {
          if (output === "Display") {
            navigate("/zipcode-driver-search/browse");
            dispatch(setSelectedDriverId(null));
            setLoadng(false);
          } else {
            getReport();
          }
        }
      })
      .catch(() => {
        setLoadng(false);
      })
      .finally(() => {
        setLoadng(false);
      });
  };

  const getReport = () => {
    setLoadng(true);
    const type = output === "Email PDF" ? "emailPdf" : output === "Email Excel" ? "emailExcel" : "display";
    DriverSearchService.getReport(
      selectedDivison,
      driverCDL,
      dispatcherId,
      null,
      null,
      zipcode,
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

  const handleContinue = () => {
    if (initialScreen) {
      navigate("/zipcode-driver-search/search");
      dispatch(setInitialScreen(false));
    } else {
      isValidZipcode();
    }
  };

  const handleCancel = () => {
    if (initialScreen) {
      navigate("/driver-service-selection");
    } else {
      navigate("/zipcode-driver-search/initial");
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
          disabled={!initialScreen && ((isZipcodesValid ? false : true) || miles <= 0)}
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
