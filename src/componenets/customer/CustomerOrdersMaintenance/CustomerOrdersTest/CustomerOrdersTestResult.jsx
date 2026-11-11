import React from "react";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import TestHeader from "./TestHeader";
import TestFooter from "./TestFooter";
import TestFileResultContent from "./TestFileResultContent";
const CustomerOrdersTestResult = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <TestHeader />
        <TestFileResultContent styles={styles} />
        <TestFooter />
      </div>
    </div>
  );
};

export default CustomerOrdersTestResult;
