import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetListing,
  resetSearch,
  setInitialScreen,
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
  const dealerId = useSelector((state) => state.dealerDriverSearchSlice.dealerId);

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

  const [loadng, setLoadng] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState();

  const handleContinue = () => {
    if (initialScreen) {
      navigate("/dealer-driver-search/search");
      dispatch(setInitialScreen(false));
    } else {
      if (output === "Display") {
        navigate("/dealer-driver-search/browse");
        dispatch(setSelectedDriverId(null));
      } else {
        getReport();
      }
    }
  };

  const handleCancel = () => {
    if (initialScreen) {
      navigate("/driver-service-selection");
    } else {
      navigate("/dealer-driver-search/initial");
    }
    dispatch(resetListing());
    dispatch(resetSearch());
  };

  const getReport = () => {
    setLoadng(true);
    const type = output === "Email PDF" ? "emailPdf" : output === "Email Excel" ? "emailExcel" : "display";
    DriverSearchService.getReport(
      selectedDivison,
      driverCDL,
      dispatcherId,
      dealerId,
      null,
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
      "Both"
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
  useEffect(() => {}, [output]);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      {loadng && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}

      <div className="d-flex align-items-center flex-wrap m-r-10">
        <button
          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
          type="button"
          onClick={() => handleContinue()}
          disabled={initialScreen || dealerId ? false : true}
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
