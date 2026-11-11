import React from "react";
import SearchFilterHeader from "./SearchFilterHeader";
import SearchFilterFooter from "./SearchFilterFooter";
import SearchFilterContent from "./SearchFilterContent";

const SearchFilterScreenForm = () => {
  return (
    <div className="customContainer halfScreenWidth">
      <div className="add-form-component  border border-dark border-2" style={{ margin: "1px" }}>
        <SearchFilterHeader />
        <SearchFilterContent />
        <SearchFilterFooter />
      </div>
    </div>
  );
};

export default SearchFilterScreenForm;
