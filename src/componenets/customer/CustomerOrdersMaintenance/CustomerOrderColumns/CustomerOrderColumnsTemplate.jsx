import React from "react";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import CustomerOrderColumnsHeader from "./CustomerOrderColumnsHeader";
import CustomerOrderColumnsContent from "./CustomerOrderColumnsContent";
import CustomerOrderColumnsFooter from "./CustomerOrderColumnsFooter";

const CustomerOrderColumnsTemplate = () => {
  return (
    <div className="table-bordered customContainer">
      <div className="border border-dark border-2 quarterScreenWidth">
        <CustomerOrderColumnsHeader />
        <CustomerOrderColumnsContent />
        <CustomerOrderColumnsFooter />
      </div>
    </div>
  );
};

export default CustomerOrderColumnsTemplate;
