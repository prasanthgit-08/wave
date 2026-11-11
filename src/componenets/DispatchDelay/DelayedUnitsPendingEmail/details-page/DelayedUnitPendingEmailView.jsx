import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import DateInputField from "../../../common/DateInputField";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import { useSelector } from "react-redux";
import EditContent from "./EditContent";

const DelayedUnitPendingEmailView = () => {
  const viewPage = useSelector((state) => state.delayedUnitsPendingEmail.viewPage);
  return (
    <div className={`add-form-component p-0 customContainer`}>
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <FormHeader />
        {viewPage ? <FormContent /> : <EditContent />}
        <FormFooter />
      </div>
    </div>
  );
};

export default DelayedUnitPendingEmailView;
