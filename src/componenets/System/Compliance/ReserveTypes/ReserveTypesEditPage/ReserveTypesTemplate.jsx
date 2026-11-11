import React from "react";
import ReserveTypesFormContent from "./ReserveTypesFormContent";
import ReserveTypesFormFooter from "./ReserveTypesFormFooter";
import ReserveTypesFormHeader from "./ReserveTypesFormHeader";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";

function ReserveTypesFormTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <ReserveTypesFormHeader />
        <ReserveTypesFormContent />
        <ReserveTypesFormFooter />
      </div>
    </div>
  );
}
export default ReserveTypesFormTemplate;
