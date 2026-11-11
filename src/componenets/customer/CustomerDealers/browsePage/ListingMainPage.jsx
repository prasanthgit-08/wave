import React from "react";
import ListingHeader from "./ListingHeader";
import ListingFooter from "./ListingFooter";
import ListingContent from "./ListingContent";

const ListingMainPage = () => {
  return (
    <div className="customContainer">
      <div
        className="add-form-component threeFourthScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <ListingHeader />
        <ListingContent />
        <ListingFooter />
      </div>
    </div>
  );
};

export default ListingMainPage;
