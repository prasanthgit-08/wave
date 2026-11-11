import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notes from "./InfoTabs/Notes";
import { Tab, Tabs } from "react-bootstrap";
import Holds from "./InfoTabs/Holds";
import Delay from "./InfoTabs/Delay";
import { setIsInfoTabValid } from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

function InfoContent({ styles }) {
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState("notes");

  /*** States From Redux***/
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);
  const isInfoNotesTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isInfoNotesTabValid);
  const isInfoHoldsTabValid = useSelector((state) => state.editMasterExpressTabsReducer.isInfoHoldsTabValid);
  const isInfoDelaysTabValid = useSelector(
    (state) => state.editMasterExpressTabsReducer.isInfoDelaysTabValid
  );
  const infoCancelledFlag = useSelector((state) => state.editMasterExpressTabsReducer.infoCancelledFlag);
  const infoOnInvoiceHoldFlag = useSelector(
    (state) => state.editMasterExpressTabsReducer.infoOnInvoiceHoldFlag
  );
  const infoOnUnitHold = useSelector((state) => state.editMasterExpressTabsReducer.infoOnUnitHold);
  const unitOnActivationDelay = useSelector(
    (state) => state.editMasterExpressTabsReducer.unitOnActivationDelay
  );
  const unitOnShuttleDelay = useSelector((state) => state.editMasterExpressTabsReducer.unitOnShuttleDelay);

  /**** Tab Validation - Info Tab ****/
  useEffect(() => {
    if (isInfoNotesTabValid && isInfoHoldsTabValid && isInfoDelaysTabValid) {
      dispatch(setIsInfoTabValid(true));
    } else {
      dispatch(setIsInfoTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInfoNotesTabValid, isInfoHoldsTabValid, isInfoDelaysTabValid]);

  return (
    <div>
      <div>
        <Tabs activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
          <Tab
            eventKey={"notes"}
            title={"Notes"}
            tabClassName={
              isUnitDataLoading || viewDetail || !infoCancelledFlag
                ? ""
                : isInfoNotesTabValid
                  ? "color-green"
                  : "color-red"
            }
          >
            <Notes styles={styles} />
          </Tab>
          <Tab
            eventKey={"holds"}
            title={"Holds"}
            tabClassName={
              isUnitDataLoading || viewDetail || (!infoOnInvoiceHoldFlag && !infoOnUnitHold)
                ? ""
                : isInfoHoldsTabValid
                  ? "color-green"
                  : "color-red"
            }
          >
            <Holds styles={styles} />
          </Tab>
          <Tab
            eventKey={"delays"}
            title={"Delays"}
            tabClassName={
              isUnitDataLoading ||
              viewDetail ||
              (!unitOnActivationDelay && !unitOnShuttleDelay) ||
              (selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord &&
                !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched)
                ? ""
                : isInfoDelaysTabValid
                  ? "color-green"
                  : "color-red"
            }
            disabled={
              selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord &&
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO
                ?.checkUnitHavingActiveDispatchRecord &&
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.driverPK
            }
          >
            <Delay styles={styles} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default InfoContent;
