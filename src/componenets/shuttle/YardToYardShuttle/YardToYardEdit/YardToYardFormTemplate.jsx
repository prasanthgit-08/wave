import React from "react";
import YardToYardFormContent from "./YardToYardFormContent";
import YardToYardFormFooter from "./YardToYardFormFooter";
import YardToYardFormHeader from "./YardToYardFormHeader";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import { useParams } from "react-router-dom";

function YardToYardFormTemplate() {
  const params = useParams();
  const selectedId = params.yardToYardShuttlePK;

  return (
    <div className="customContainer">
      <div
        className="add-form-component quarterScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <YardToYardFormHeader />
        <YardToYardFormContent selectedId={selectedId} />
        <YardToYardFormFooter selectedId={selectedId} />
      </div>
    </div>
  );
}

export default YardToYardFormTemplate;
