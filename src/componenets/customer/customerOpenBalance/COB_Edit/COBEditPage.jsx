import React from "react";
import COBHeader from "./COBHeader";
import { Row, Col } from "react-bootstrap";
import ButtonComponent from "../../../common/Button";
import { t } from "i18next";
import COBFooter from "./COBFooter";
import COBForm from "./COBForm";
const COBEditPage = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <COBHeader />
        <COBForm />
        <COBFooter />
      </div>
    </div>
  );
};
export default COBEditPage;
