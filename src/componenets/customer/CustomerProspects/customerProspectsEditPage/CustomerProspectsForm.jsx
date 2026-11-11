import React from "react";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import CustomerProspectsContent from "./CustomerProspectsContent";
import CustomerProspectsFooter from "./CustomerProspectsFooter";
import CustomerProspectsHeader from "./CustomerProspectsHeader";
const CustomerProspectsForm = () => {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <CustomerProspectsHeader />
        <CustomerProspectsContent />
        <CustomerProspectsFooter />
      </div>
    </div>
  );
};

export default CustomerProspectsForm;
