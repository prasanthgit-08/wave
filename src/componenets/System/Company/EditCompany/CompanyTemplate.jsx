import React from "react";
import CompanyContent from "./CompanyContent";
import CompanyFooter from "./CompanyFooter";
import CompanyHeader from "./CompanyHeader";

function CompanyTemplate() {
  return (
    <div className="customContainer">
      <div
        className="add-form-component threeFourthScreenWidth border border-dark border-2"
        style={{ margin: "1px", overflow: "hidden" }}
      >
        <CompanyHeader />
        <CompanyContent />
        <CompanyFooter />
      </div>
    </div>
  );
}

export default CompanyTemplate;
