import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useState, useEffect } from "react";
import General from "./tabs/General";
import { Tab, Tabs } from "react-bootstrap";
import Emails from "./tabs/Emails";
import Comments from "./tabs/Comments";
import DelayComments from "./tabs/DelayComments";
import Returns from "./tabs/Returns";
import DelayInstructions from "./tabs/DelayInstructions";
import Resources from "./tabs/Resources";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveKey } from "../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";

const UnitDetailsContent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });
  const viewOnly = useSelector((state) => state.delayProcessing.viewOnly);
  const activeKey = useSelector((state) => state.delayProcessing.activeKey);
  const locationPhone = useSelector((state) => state.delayProcessing.locationPhone);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const isCurrentLocEmpty = useSelector((state) => state.delayProcessing.isCurrentLocEmpty);
  const isPostal = useSelector((state) => state.delayProcessing.isPostal);
  let dealerCity = useSelector((state) => state.editDealerReducer.dealerCity);
  let dealerState = useSelector((state) => state.editDealerReducer.dealerStatecode);
  let dealerPost = useSelector((state) => state.editDealerReducer.dealerPostcode);
  const delayContactPhone = useSelector((state) => state.delayProcessing.delayContactPhone);
  const delayContactExtension = useSelector((state) => state.delayProcessing.delayContactExtension);
  const delayContactFAX = useSelector((state) => state.delayProcessing.delayContactFAX);
  const delayedUnitCode = useSelector((state) => state.delayProcessing.delayedUnitCodeFK);
  const delayDate = useSelector((state) => state.delayProcessing.delayDate);
  const reportedDate = useSelector((state) => state.delayProcessing.reported);
  const editFlag = useSelector((state) => state.delayProcessing.editFlag);
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
    if (viewOnly) {
      setIsGeneralTabValid(true);
    } else {
      if (
        (rowData?.delay && viewOnly) ||
        (locationPhone && !formatPhoneNumber(locationPhone)?.match(phoneRegex)) ||
        isCurrentLocEmpty ||
        (rowData?.delay &&
          (!formatPhoneNumber(delayContactPhone)?.match(phoneRegex) ||
            !formatPhoneNumber(delayContactFAX)?.match(phoneRegex) ||
            delayContactExtension === null ||
            delayContactExtension?.trim()?.length < 4)) ||
        delayedUnitCode === null ||
        !delayedUnitCode ||
        !isPostal ||
        (!editFlag && !locationPhone) ||
        isNaN(parseLocalDate(delayDate).getTime()) ||
        isNaN(parseLocalDate(reportedDate).getTime())
      ) {
        setIsGeneralTabValid(false);
      } else {
        setIsGeneralTabValid(true);
      }
    }
  }, [
    delayedUnitCode,
    locationPhone,
    viewOnly,
    isCurrentLocEmpty,
    isPostal,
    dealerCity,
    dealerState,
    dealerPost,
    delayContactPhone,
    delayContactFAX,
    delayContactExtension,
    delayDate,
    reportedDate,
  ]);
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
            tabClassName={!viewOnly ? (isGeneralTabValid ? "color-green" : "color-red") : ""}
          >
            <General />
          </Tab>
          {(rowData?.delay || showTab("unit-details")) && (
            <Tab eventKey="emails" title={"Emails"}>
              <Emails />
            </Tab>
          )}
          {((viewOnly && showTab("delayed-details")) || showTab("unit-details")) && (
            <Tab eventKey="comments" title={"Comments"}>
              <Comments />
            </Tab>
          )}
          {rowData?.delay && (
            <Tab eventKey="delayComments" title={"Delay Comments"}>
              <DelayComments />
            </Tab>
          )}
          {viewOnly && showTab("delayed-details") && (
            <Tab eventKey="returns" title={"Returns"}>
              <Returns />
            </Tab>
          )}
          {(showTab("unit-details") || (viewOnly && rowData?.delay)) && (
            <Tab eventKey="delayInstructions" title={"Delay Instructions"}>
              <DelayInstructions />
            </Tab>
          )}
          {((viewOnly && showTab("delayed-details")) || showTab("unit-details")) && (
            <Tab eventKey="resources" title={"Resources"}>
              <Resources />
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default UnitDetailsContent;
