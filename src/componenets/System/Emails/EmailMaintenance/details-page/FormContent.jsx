import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import FormatTab from "./tabs/FormatTab";
import GeneralTab from "./tabs/GeneralTab";
import SubjectTab from "./tabs/SubjectTab";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
const FormContent = () => {
  const isGeneralTabValid = useSelector((state) => state.emailFormats.isGeneralTabValid);
  const isFormatTabValid = useSelector((state) => state.emailFormats.isFormatTabValid);
  const isSubjectTabValid = useSelector((state) => state.emailFormats.isSubjectTabValid);
  const viewDetail = useSelector((state) => state.emailFormats.viewDetail);
  const isEmailFormatDataLoading = useSelector((state) => state.emailFormats.isEmailFormatDataLoading);

  return (
    <div className="p-2">
      <div className={`shadow-sm rounded border quarterScreenFormContentHeight`}>
        <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="m-b-2">
          <Tab
            eventKey="general"
            title={"General"}
            tabClassName={
              viewDetail || isEmailFormatDataLoading ? "" : isGeneralTabValid ? "color-green" : "color-red"
            }
          >
            <GeneralTab />
          </Tab>
          <Tab
            eventKey="format"
            title={"Format"}
            tabClassName={
              viewDetail || isEmailFormatDataLoading ? "" : isFormatTabValid ? "color-green" : "color-red"
            }
          >
            <FormatTab />
          </Tab>

          <Tab
            eventKey="subject"
            title={"Subject"}
            tabClassName={
              viewDetail || isEmailFormatDataLoading ? "" : isSubjectTabValid ? "color-green" : "color-red"
            }
          >
            <SubjectTab />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default FormContent;
