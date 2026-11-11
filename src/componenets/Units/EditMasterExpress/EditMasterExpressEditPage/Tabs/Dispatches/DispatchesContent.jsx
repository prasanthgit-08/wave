import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import General from "./General";
import DriversPay from "./DriversPay";
import Notes from "./Notes";
import { setIsDispatchTabValid } from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import DatesMainPage from "./Dates/DatesMainPage";

function DispatchesContent({ styles }) {
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState("general");

  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);
  const isDispatchGeneralTabValid = useSelector(
    (state) => state.editMasterExpressTabsReducer.isDispatchGeneralTabValid
  );
  const isDatesTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isDatesTabValid);
  const miles = useSelector((state) => state.editMasterExpressDispatchDriverPayTabSlice.miles);
  const { driverPayTabData, deliveryBonusDeliverByDateValid } = useSelector(
    (state) => state.editMasterExpressDispatchDriverPayTabSlice
  );

  const driveByTabValid =
    (driverPayTabData?.deliveryBonus &&
      driverPayTabData?.deliveryBonusDescription &&
      driverPayTabData?.deliveryBonusDeliverByDate &&
      deliveryBonusDeliverByDateValid &&
      driverPayTabData?.invoiceDeliveryBonus &&
      driverPayTabData?.driverDeliveryBonus &&
      driverPayTabData?.invoiceDeliveryBonus != 0 &&
      driverPayTabData?.driverDeliveryBonus != 0) ||
    (!driverPayTabData?.deliveryBonus && Number(miles) > 0);
  /**** Tab Validation - Info Tab ****/
  useEffect(() => {
    if (!isDispatchGeneralTabValid || !isDatesTabValid || !driveByTabValid) {
      dispatch(setIsDispatchTabValid(false));
    } else {
      dispatch(setIsDispatchTabValid(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDispatchGeneralTabValid, isDatesTabValid, driveByTabValid]);

  return (
    <div>
      <div>
        <Tabs activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
          <Tab
            eventKey={"general"}
            title={"General"}
            tabClassName={
              isUnitDataLoading || viewDetail ? "" : isDispatchGeneralTabValid ? "color-green" : "color-red"
            }
          >
            <General styles={styles} />
          </Tab>
          <Tab
            eventKey={"driverspay"}
            title={"Drivers Pay"}
            tabClassName={`${viewDetail ? "" : driveByTabValid ? "color-green" : "color-red"}`}
          >
            <DriversPay styles={styles} />
          </Tab>
          <Tab
            eventKey={"dates"}
            title={"Dates"}

            tabClassName={viewDetail ? "" : isDatesTabValid ? "color-green" : "color-red"}
          >
            <DatesMainPage styles={styles} />
          </Tab>
          <Tab eventKey={"notes"} title={"Notes"}>
            <Notes styles={styles} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default DispatchesContent;
