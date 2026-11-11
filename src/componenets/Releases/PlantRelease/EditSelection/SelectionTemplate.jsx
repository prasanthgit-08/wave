import React, { useEffect } from "react";
import PlantReleaseHeader from "../PlantReleaseHeader";
import SelectionContent from "./SelectionContent";
import SelectionFooter from "./SelectionFooter";

const SelectionTemplate = () => {
  useEffect(() => {
    localStorage.setItem("plantReleaseExit", true);
  }, []);

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <PlantReleaseHeader />
        <SelectionContent />
        <SelectionFooter />
      </div>
    </div>
  );
};

export default SelectionTemplate;
