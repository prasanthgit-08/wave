import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import GeneralTab from "./GeneralTab";
import EmailConditionTab from "./EmailConditionTab";
import AlternateFormTab from "./AlternateFormTab";
import { useSelector } from "react-redux";

const EmailAttachmentFormContent = () => {
  const alternateForm = useSelector((state) => state.emailAttachmentReducer.alternateForm);
  const viewDetail = useSelector((state) => state.emailAttachmentReducer.viewDetail);
  const formDescriptionId = useSelector((state) => state.emailAttachmentReducer.formDescriptionId);
  const isUniqueDescription = useSelector((state) => state.emailAttachmentReducer.isUniqueDescription);
  const documentTypeDescriptionId = useSelector(
    (state) => state.emailAttachmentReducer.documentTypeDescriptionId
  );
  const responseData = useSelector((state) => state.emailAttachmentReducer.responseData);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight" /* m-t-10 m-b-10 */>
        <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="m-b-0">
          <Tab
            tabClassName={
              !viewDetail
                ? formDescriptionId || documentTypeDescriptionId
                  ? isUniqueDescription
                    ? ""
                    : "color-red"
                  : !alternateForm && !formDescriptionId && !documentTypeDescriptionId
                    ? "color-red"
                    : ""
                : ""
            }
            eventKey="general"
            title={"General"}
            disabled={!viewDetail && alternateForm}
          >
            <GeneralTab />
          </Tab>

          <Tab eventKey="emailCondition" title={"Email Condition"}>
            <EmailConditionTab />
          </Tab>

          <Tab
            eventKey="alternateForm"
            tabClassName={
              !viewDetail
                ? alternateForm
                  ? isUniqueDescription
                    ? ""
                    : "color-red"
                  : !alternateForm && !formDescriptionId && !documentTypeDescriptionId
                    ? "color-red"
                    : ""
                : ""
            }
            title={"Alternate Form"}
            disabled={!viewDetail && (formDescriptionId || documentTypeDescriptionId)}
          >
            <AlternateFormTab />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default EmailAttachmentFormContent;
