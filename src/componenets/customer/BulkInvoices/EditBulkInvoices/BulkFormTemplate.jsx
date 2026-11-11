import React, { useState } from "react";
import BulkFormContent from "./BulkFormContent";
import BulkFormFooter from "./BulkFormFooter";
import BulkFormHeader from "./BulkFormHeader";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";

function BulkFormTemplate() {
  const [checkDesc, setCheckDesc] = useState("");
  const [checkProjectCode, setCheckProjectCode] = useState("");

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <BulkFormHeader />

        <BulkFormContent
          setCheckDesc={setCheckDesc}
          checkDesc={checkDesc}
          checkProjectCode={checkProjectCode}
          setCheckProjectCode={setCheckProjectCode}
        />

        <BulkFormFooter
          setCheckDesc={setCheckDesc}
          checkDesc={checkDesc}
          checkProjectCode={checkProjectCode}
          setCheckProjectCode={setCheckProjectCode}
        />
      </div>
    </div>
  );
}

export default BulkFormTemplate;
