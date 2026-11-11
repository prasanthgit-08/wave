import React from "react";
import ComplianceItemsContent from "./ComplianceItemsContent";
import ComplianceItemsFooter from "./ComplianceItemsFooter";
import ComplianceItemsHeader from "./ComplianceItemsHeader";
const ComplianceItemsTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <ComplianceItemsHeader />
        <ComplianceItemsContent />
        <ComplianceItemsFooter />
      </div>
    </div>
  );
};

export default ComplianceItemsTemplate;
