import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import FeesTab from "./FeesTab";
import GeneralTab from "./GeneralTab";
import BreakdownProcessingService from "../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import { useParams } from "react-router-dom";
import {
  setBreakdownInvoiceDetails,
  setFeesTabLisiting,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingIcon from "../../../common/LoadingIcon";

const FormContent = () => {
  const { breakdownFK } = useParams();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState(null);
  const breakdownInvoiceDetails = useSelector((state) => state.delaybreakdown.breakdownInvoiceDetails);
  const feesTabLisiting = useSelector((state) => state.delaybreakdown.feesTabLisiting);
  const defaultTab = breakdownInvoiceDetails[0]
    ? "general"
    : feesTabLisiting?.length > 0
      ? "fees"
      : "general";
  const [load, setload] = useState(false);
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");

  useEffect(() => {
    const fetchBreakdownInvoiceData = () => {
      setload(true);
      BreakdownProcessingService.getBreakdownInvoiceData(breakdownFK, breakdownCompanyName, "", false)
        .then((response) => {
          const { data } = response;
          dispatch(setBreakdownInvoiceDetails(data?.breakdownInvoiceDetails || []));
          dispatch(setFeesTabLisiting(data?.breakdownFeeList || []));
        })
        .catch(() => {
          setload(false);
        })
        .finally(() => {
          setload(false);
        });
    };
    fetchBreakdownInvoiceData();
  }, []);

  useEffect(() => {
    setCurrentTab(defaultTab);
  }, [defaultTab]);

  return (
    <div className="p-2">
      {load && <LoadingIcon />}
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <Tabs
          defaultActiveKey={defaultTab}
          id="uncontrolled-tab-example"
          className="m-b-2"
          onSelect={(key) => setCurrentTab(key)}
          activeKey={currentTab}
        >
          <Tab eventKey="general" title={"General"} tabClassName={""}>
            <GeneralTab data={breakdownInvoiceDetails[0]} />
          </Tab>

          <Tab eventKey="fees" title={"Fees"} tabClassName={""}>
            <FeesTab />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default FormContent;
