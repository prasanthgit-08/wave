import React from "react";
import SearchFilterHeader from "./SearchFilterHeader";
import SearchFilterContent from "./SearchFilterContent";
import SearchFilterFooter from "./SearchFilterFooter";

const StateSearchFilterScreenForm = () => {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <SearchFilterHeader />
        <SearchFilterContent />
        <SearchFilterFooter />
      </div>
    </div>
  );
};

export default StateSearchFilterScreenForm;
