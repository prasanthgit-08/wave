import React from "react";
import DispatchHoldsContent from "./DispatchHoldsContent";
import DispatchHoldsHeader from "./DispatchHoldsHeader";
import DispatchHoldsFooter from "./DispatchHoldsFooter";
const DispatchHoldsTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <DispatchHoldsHeader />
        <DispatchHoldsContent />
        <DispatchHoldsFooter />
      </div>
    </div>
  );
};

export default DispatchHoldsTemplate;
