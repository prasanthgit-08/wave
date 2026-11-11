import React from "react";
import ReprintSelectionHeader from "./ReprintSelectionHeader";
import ReprintSelectionContent from "./ReprintSelectionContent";
import ReprintSelectionFooter from "./ReprintSelectionFooter";
import { useReprintBOL } from "./Tab/useReprintBOL";

const ReprintSelectionTemplate = () => {
  const { handleChangeTab } = useReprintBOL();
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <ReprintSelectionHeader />
        <ReprintSelectionContent />
        <ReprintSelectionFooter handleChangeTab={handleChangeTab} />
      </div>
    </div>
  );
};

export default ReprintSelectionTemplate;
