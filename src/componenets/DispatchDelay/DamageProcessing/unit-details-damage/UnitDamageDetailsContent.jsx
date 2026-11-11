import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import GeneralDamage from "./tabs/GeneralDamage";
import EmailsDamage from "./tabs/EmailsDamage";
import CommentsDamage from "./tabs/CommentsDamage";
import DamageComments from "./tabs/DamageComments";
import ReturnsDamage from "./tabs/ReturnsDamage";
import DamageInstructions from "./tabs/DamageInstructions";
import ResourcesDamage from "./tabs/ResourcesDamage";
import { setActiveKey } from "../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
const UnitDamageDetailsContent = () => {
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
  let dealerCanadian = useSelector((state) => state.editDealerReducer.dealerCanadian);
  let dealerPost = useSelector((state) => state.editDealerReducer.dealerPostcode);
  const delayContactPhone = useSelector((state) => state.delayProcessing.delayContactPhone);
  const delayContactExtension = useSelector((state) => state.delayProcessing.delayContactExtension);
  const delayContactFAX = useSelector((state) => state.delayProcessing.delayContactFAX);
  const delayedUnitCode = useSelector((state) => state.delayProcessing.delayedUnitCodeFK);
  const damagedUnitCodeFK = useSelector((state) => state.delayProcessing.damagedUnitCodeFK);
  const postalCodeOnChange = useSelector((state) => state.editDealerReducer.postalCodeOnChange);
  const delayDate = useSelector((state) => state.delayProcessing.delayDate);
  const reportedDate = useSelector((state) => state.delayProcessing.reported);
  const editFlag = useSelector((state) => state.delayProcessing.editFlag);
  const [isGeneralTabValid, setIsGeneralTabValid] = useState(false);
  const damageSaveFlag = useSelector((state) => state.delayDamage.damageSaveFlag);

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
        (isPostal &&
          !dealerCity &&
          !dealerState &&
          !dealerPost &&
          dealerCity?.length === 0 &&
          dealerState?.length === 0 &&
          dealerPost?.length === 0) ||
        (rowData?.delay &&
          (!formatPhoneNumber(delayContactPhone)?.match(phoneRegex) ||
            !formatPhoneNumber(delayContactFAX)?.match(phoneRegex) ||
            delayContactExtension === null ||
            delayContactExtension?.trim()?.length < 4)) ||
        (postalCodeOnChange && isPostal) ||
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
            tabClassName={!viewOnly || editFlag ? (damageSaveFlag ? "color-green" : "color-red") : ""}
          >
            <GeneralDamage />
          </Tab>
          {(rowData?.delay || showTab("unit-details")) && (
            <Tab
              //  tabClassName
              eventKey="emails"
              title={"Emails"}
            >
              <EmailsDamage />
            </Tab>
          )}
          {((viewOnly && showTab("delayed-details")) || showTab("unit-details")) && (
            <Tab eventKey="comments" title={"Comments"}>
              <CommentsDamage />
            </Tab>
          )}
          {rowData?.delay && (
            <Tab eventKey="delayComments" title={"Delay Comments"}>
              <DamageComments />
            </Tab>
          )}
          {viewOnly && showTab("delayed-details") && (
            <Tab eventKey="returns" title={"Returns"}>
              <ReturnsDamage />
            </Tab>
          )}
          {(showTab("unit-details") || (viewOnly && rowData?.delay)) && (
            <Tab eventKey="damageInstructions" title={"Damage Instructions"}>
              <DamageInstructions />
            </Tab>
          )}
          {((viewOnly && showTab("delayed-details")) || showTab("unit-details")) && (
            <Tab eventKey="resources" title={"Resources"}>
              <ResourcesDamage />
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default UnitDamageDetailsContent;
