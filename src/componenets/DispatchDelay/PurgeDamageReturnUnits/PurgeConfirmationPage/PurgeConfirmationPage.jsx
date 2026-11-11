import React from "react";
import PurgeConfirmationHeader from "./PurgeConfirmationHeader";
import PurgeConfirmationFooter from "./PurgeConfirmationFooter";
import PageConfirmationContent from "./PageConfirmationContent";

const PurgeConfirmationPage = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <PurgeConfirmationHeader />
        <PageConfirmationContent />
        <PurgeConfirmationFooter />
      </div>
    </div>
  );
};

export default PurgeConfirmationPage;
