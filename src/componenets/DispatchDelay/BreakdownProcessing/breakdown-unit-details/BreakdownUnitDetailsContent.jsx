import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveKey } from "../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import GeneralBreakdown from "./breakdownTabs/GeneralBreakdown";
import EmailBreakdown from "./breakdownTabs/EmailBreakdown";
import CommentsTab from "./breakdownTabs/CommentsTab";
import BreakdownComments from "./breakdownTabs/BreakdownComments";
import BreakdownInstructions from "./breakdownTabs/BreakdownInstructions";
import BreakdownResources from "./breakdownTabs/BreakdownResources";
import BreakdownDocumentsListing from "./breakdownTabs/BreakdownDocumentsListing";
import BreakdownDocumentsEdit from "./breakdownTabs/BreakdownDocumentsEdit";

const BreakdownUnitDetailsContent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const viewOnly = useSelector((state) => state.delaybreakdown.viewOnly);
  const activeKey = useSelector((state) => state.delaybreakdown.activeKey);
  const locationPhone = useSelector((state) => state.delaybreakdown.locationPhone);
  const breakdownSaveFlag = useSelector((state) => state.delaybreakdown.breakdownSaveFlag);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const isCurrentLocEmpty = useSelector((state) => state.delaybreakdown.isCurrentLocEmpty);
  const isPostal = useSelector((state) => state.delayProcessing.isPostal);
  let dealerCity = useSelector((state) => state.editDealerReducer.dealerCity);
  let dealerState = useSelector((state) => state.editDealerReducer.dealerStatecode);
  let dealerPost = useSelector((state) => state.editDealerReducer.dealerPostcode);
  const delayContactPhone = useSelector((state) => state.delaybreakdown.delayContactPhone);
  const delayContactExtension = useSelector((state) => state.delaybreakdown.delayContactExtension);
  const delayContactFAX = useSelector((state) => state.delaybreakdown.delayContactFAX);
  const delayedUnitCode = useSelector((state) => state.delaybreakdown.delayedUnitCodeFK);
  const postalCodeOnChange = useSelector((state) => state.editDealerReducer.postalCodeOnChange);
  const delayDate = useSelector((state) => state.delaybreakdown.delayDate);
  const reportedDate = useSelector((state) => state.delaybreakdown.reported);
  const editFlag = useSelector((state) => state.delaybreakdown.editFlag);
  const emailTabVisible = useSelector((state) => state.delaybreakdown.emailTabVisible);
  const isEmailBreakdownTabValid = useSelector((state) => state.delaybreakdown.isEmailBreakdownTabValid);
  const editBrkdownOfExistingDelayUnitFlag = useSelector(
    (state) => state.delaybreakdown.editBrkdownOfExistingDelayUnitFlag
  );
  const [isGeneralTabValid, setIsGeneralTabValid] = useState(false);

  // Function to determine if a button should be displayed
  const showTab = (keyword) => pathname?.includes(keyword);

  const handleTabSelect = (key) => {
    dispatch(setActiveKey(key));
  };
  useEffect(() => {
    dispatch(setActiveKey("general"));
  }, []);

  useEffect(() => {
    if (!breakdownSaveFlag) {
      setIsGeneralTabValid(false);
    } else {
      setIsGeneralTabValid(true);
    }
  }, [breakdownSaveFlag]);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border threeFourthScreenFormContentHeight">
        <Tabs
          activeKey={activeKey}
          onSelect={handleTabSelect}
          id="uncontrolled-tab-example"
          className="m-b-2"
        >
          <Tab
            eventKey="general"
            title={"General"}
            tabClassName={
              !viewOnly || editBrkdownOfExistingDelayUnitFlag
                ? isGeneralTabValid
                  ? "color-green"
                  : "color-red"
                : ""
            }
          >
            <GeneralBreakdown />
          </Tab>
          {emailTabVisible && (
            <Tab
              eventKey="emails"
              title={"Emails"}
              tabClassName={!viewOnly ? (isEmailBreakdownTabValid ? "" : "color-red") : ""}
            >
              <EmailBreakdown />
            </Tab>
          )}

          {!showTab("view-breakdown") && (
            <Tab eventKey="comments" title={"Comments"}>
              <CommentsTab />
            </Tab>
          )}

          {!showTab("breakdown-details") && (
            <Tab eventKey="breakdownComments" title={"Breakdown Comments"}>
              <BreakdownComments />
            </Tab>
          )}

          {!editBrkdownOfExistingDelayUnitFlag && (
            <Tab eventKey="breakdownInstructions" title={"Breakdown Instructions"}>
              <BreakdownInstructions />
            </Tab>
          )}

          {!editBrkdownOfExistingDelayUnitFlag && (
            <Tab eventKey="resources" title={"Resources"}>
              <BreakdownResources />
            </Tab>
          )}

          {!showTab("breakdown-details") && (
            <Tab eventKey="documents" title={"Documents"}>
              {!editFlag && viewOnly && <BreakdownDocumentsListing />}
              {editFlag && <BreakdownDocumentsEdit />}
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default BreakdownUnitDetailsContent;
