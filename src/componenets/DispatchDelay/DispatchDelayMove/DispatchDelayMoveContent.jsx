import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import General from "./Tabs/General";
import Location from "./Tabs/Location";

import { formatPhoneNumber } from "../../../utils/validation/Phonevalidation";
import { emailRegex } from "../../../utils/validation/EmailRegex";

import { setDelayMoveSave } from "../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";

const DispatchDelayMoveContent = () => {
  const dispatch = useDispatch();

  const moveData = useSelector((state) => state.delayProcessing.moveData);
  const miscMoveDeliveryDetails = useSelector((state) => state.delayProcessing.miscMoveDeliveryDetails);

  const [saveEnable, setSaveEnable] = useState(false);
  const [isGeneralTabValid, setIsGeneralTabValid] = useState(false);
  const [isLocTabValid, setIsLocTabValid] = useState(false);

  /**
   * -------------------------
   * LOCATION TAB VALIDATION
   * (Only for Alternate Location)
   * -------------------------
   */
  useEffect(() => {
    if (
      moveData?.isAlternateLoc &&
      miscMoveDeliveryDetails?.name &&
      miscMoveDeliveryDetails?.address1?.trim() &&
      miscMoveDeliveryDetails?.city?.trim() &&
      miscMoveDeliveryDetails?.stateCode?.trim() &&
      miscMoveDeliveryDetails?.postalCode?.trim() &&
      miscMoveDeliveryDetails?.postalCodePK &&
      formatPhoneNumber(miscMoveDeliveryDetails?.phone)?.length === 14 &&
      miscMoveDeliveryDetails?.deliveryContact?.trim() &&
      formatPhoneNumber(miscMoveDeliveryDetails?.deliveryContactPhone)?.length === 14 &&
      miscMoveDeliveryDetails?.email?.trim()?.match(emailRegex) &&
      (miscMoveDeliveryDetails?.openSunday ||
        miscMoveDeliveryDetails?.openMonday ||
        miscMoveDeliveryDetails?.openTuesday ||
        miscMoveDeliveryDetails?.openWednesday ||
        miscMoveDeliveryDetails?.openThursday ||
        miscMoveDeliveryDetails?.openFriday ||
        miscMoveDeliveryDetails?.openSaturday)
    ) {
      setSaveEnable(true);
      setIsLocTabValid(true);
    } else {
      setSaveEnable(false);
      setIsLocTabValid(false);
    }
  }, [moveData, miscMoveDeliveryDetails]);

  /**
   * -------------------------
   * GENERAL TAB VALIDATION
   * -------------------------
   */
  useEffect(() => {
    if (!moveData) {
      setIsGeneralTabValid(false);
      return;
    }

    const isRepairValid =
      !moveData.isRepairLoc ||
      (moveData.workOrderNumber &&
        moveData.nameUnder &&
        moveData.contact &&
        formatPhoneNumber(moveData.phone)?.length === 14);

    const isDealerPlantValid = moveData.isAlternateLoc ? true : moveData.dealerfk || moveData.plantfk;

    if (isRepairValid && isDealerPlantValid) {
      setIsGeneralTabValid(true);
    } else {
      setIsGeneralTabValid(false);
    }
  }, [moveData]);

  /**
   * -------------------------
   * SAVE BUTTON ENABLE / DISABLE
   * -------------------------
   */
  useEffect(() => {
    if (moveData?.isAlternateLoc) {
      dispatch(setDelayMoveSave(isGeneralTabValid && isLocTabValid));
    } else {
      dispatch(setDelayMoveSave(isGeneralTabValid));
    }
  }, [isGeneralTabValid, isLocTabValid, moveData, dispatch]);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="m-b-2">
          <Tab
            title="General"
            eventKey="general"
            tabClassName={isGeneralTabValid ? "color-green" : "color-red"}
          >
            <General />
          </Tab>

          <Tab
            title="Location"
            eventKey="location"
            disabled={!moveData?.isAlternateLoc}
            tabClassName={moveData?.isAlternateLoc ? (isLocTabValid ? "color-green" : "color-red") : ""}
          >
            <Location />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default DispatchDelayMoveContent;
