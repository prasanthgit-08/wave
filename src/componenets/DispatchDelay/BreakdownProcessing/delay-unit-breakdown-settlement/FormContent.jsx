import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import GeneralTab from "./GeneralTab";
import FeesTab from "./FeesTab";
import { useDispatch, useSelector } from "react-redux";
import SettlementDelayService from "../../../../services/DispatchDelay/BreakdownProcessing/SettlementDelayService";
import { useParams } from "react-router-dom";
import {
  setFeeData,
  setGeneralTabFormData,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/SettlementSlice";
import LoadingIcon from "../../../common/LoadingIcon";

const YourComponent = () => {
  const params = useParams();
  const breakdownFK = params.breakdownFK;
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("fees");
  const [loading, setLoading] = useState(false);
  const generalTabData = useSelector((state) => state.settlementReducer.generalTabData);
  const feeData = useSelector((state) => state.settlementReducer.feeData);
  const generalTabFormData = useSelector((state) => state.settlementReducer.generalTabFormData);
  const sortValueFeeTab = useSelector((state) => state.settlementReducer.sortValueFeeTab);
  const sortTypeFeeTab = useSelector((state) => state.settlementReducer.sortTypeFeeTab);
  const isDataLoaded = useSelector((state) => state.settlementReducer.isDataLoaded);
  const defaultTab = generalTabFormData !== null ? "general" : feeData?.length > 0 ? "fees" : "general";

  useEffect(() => {
    if (isDataLoaded) {
      if (generalTabFormData?.driverPaid === 0 && generalTabFormData?.driverFK !== null) {
        setCurrentTab("general");
      } else if (feeData?.some((item) => item.paid === 0) || generalTabFormData?.paid === 0) {
        setCurrentTab("fees");
      }
    }
  }, []);

  useEffect(() => {
    setCurrentTab(defaultTab);
  }, [defaultTab]);

  return (
    <div className="shadow-sm rounded border halfScreenFormContentHeight">
      {loading && <LoadingIcon />}
      <Tabs
        id="uncontrolled-tab-example"
        className="m-b-2"
        onSelect={(key) => setCurrentTab(key)}
        defaultActiveKey={defaultTab}
        activeKey={currentTab}
      >
        <Tab eventKey="general" title="General">
          <GeneralTab data={generalTabData} />
        </Tab>

        <Tab eventKey="fees" title="Fees">
          <FeesTab />
        </Tab>
      </Tabs>
    </div>
  );
};

export default YourComponent;
