import React from "react";
import DelayUnitCodesEditHeader from "./DelayUnitCodesEditHeader";
import DelayUnitCodesFooter from "./DelayUnitCodesEditFooter";
import DelayUnitCodesEditContent from "./DelayUnitCodesEditContent";

function DelayUnitCodesEditTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <DelayUnitCodesEditHeader />
        <DelayUnitCodesEditContent />
        <DelayUnitCodesFooter />
      </div>
    </div>
  );
}
export default DelayUnitCodesEditTemplate;
