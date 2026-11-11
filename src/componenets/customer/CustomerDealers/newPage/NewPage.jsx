import React from "react";
import NewPageHeader from "./NewPageHeader";
import NewPageContent from "./NewPageContent";
import NewPageFooter from "./NewPageFooter";

const NewPage = () => {
  return (
    <div className="customContainer">
      <div
        className="add-form-component threeFourthScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <NewPageHeader />
        <NewPageContent />
        <NewPageFooter />
      </div>
    </div>
  );
};

export default NewPage;
