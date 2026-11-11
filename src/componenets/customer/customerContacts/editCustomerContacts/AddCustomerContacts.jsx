import React from "react";
import CCFormContent from "./CCFormContent";
import CCFormFooter from "./CCFormFooter";
import CCFormHeader from "./CCFormHeader";
import { Col, Row } from "react-bootstrap";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
const AddCustomerContacts = () => {
  return (
    <div className={`add-form-component p-0 customContainer`}>
      <div className={`border border-dark border-2 quarterScreenWidth`} style={{ margin: "1px" }}>
        <CCFormHeader />
        <CCFormContent />
        <CCFormFooter />
      </div>
    </div>
  );
};
export default AddCustomerContacts;
