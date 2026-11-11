import React, { useEffect, useState } from "react";
import Header from "../../../common/Header";
import FooterBreakdown from "./FooterBreakdown";
import { useDispatch, useSelector } from "react-redux";
import { resetUnitSelectionFilters } from "../../../../redux/EditMaster/UnitSelectionSlice";
import BreakdownUnitDetailsContent from "./BreakdownUnitDetailsContent";
import { useNavigate } from "react-router-dom";
import {
  setChangeColor,
  setEditBrkdownOfExistingDelayUnitFlag,
  setEmailTabVisible,
  setNavigateToMainPage,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";

const BreakdownUnitDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editFlag = useSelector((state) => state.delaybreakdown.editFlag);
  const viewOnly = useSelector((state) => state.delaybreakdown.viewOnly);
  const navigateToMainPage = useSelector((state) => state.delaybreakdown.navigateToMainPage);

  const [selectedCompanyName, setCompanyName] = useState(() => {
    // Initialize state from localStorage
    return localStorage.getItem("selectedCompany");
  });
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });

  const navigatedFrom = localStorage.getItem("navigatedFrom");

  useEffect(() => {
    if (navigateToMainPage) {
      navigate(
        `/delay-processing/new-delayed-unit-confirmation/${selectedCompanyName}/${rowData?.unitFK}/${rowData?.driverFK}`
      );
    }
  }, []);

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header
          programName="Delay Breakdown"
          confirmClose={!viewOnly || editFlag}
          closeHandler={() => {
            dispatch(resetUnitSelectionFilters());
            setTimeout(() => {
              localStorage.removeItem("navigatedFrom");
            }, 100);
            dispatch(setNavigateToMainPage(true));
            dispatch(setEditBrkdownOfExistingDelayUnitFlag(false));
            dispatch(setEmailTabVisible(true));
            dispatch(setChangeColor(false));
          }}
          closeNavigationURL={
            navigatedFrom === "newBreakdown"
              ? `/delay-processing/new-delayed-unit-confirmation/${selectedCompanyName}/${rowData?.unitFK}/${rowData?.driverFK}`
              : rowData?.unitFK
                ? "/delay-processing/delayed-details/" +
                  selectedCompanyName +
                  "/" +
                  Number(rowData?.unitFK) +
                  "/" +
                  Number(rowData?.driverFK)
                : "/delay-processing/delayed-unit-browse"
          }
        />
        <BreakdownUnitDetailsContent />
        <FooterBreakdown />
      </div>
    </div>
  );
};

export default BreakdownUnitDetails;
