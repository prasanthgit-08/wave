import React from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import BulkEmailsHeader from "../BulkEmailsHeader";
import BrowsePageListing from "./BrowsePageListing";
import BrowsePageFooter from "./BrowsePageFooter";

const BrowsePageTemplate = () => {
  return (
    <QuarterScreenWrapper>
      <BulkEmailsHeader />
      <BrowsePageListing />
      <BrowsePageFooter />
    </QuarterScreenWrapper>
  );
};

export default BrowsePageTemplate;
