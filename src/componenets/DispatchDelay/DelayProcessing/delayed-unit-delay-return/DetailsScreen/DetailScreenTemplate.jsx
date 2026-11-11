import React from "react";
import DelayReturnHeader from "../DelayReturnHeader";
import DetailsScreenContent from "./DetailsScreenContent";
import DetailsScreenFooter from "./DetailsScreenFooter";

const DetailScreenTemplate = () => {
  return (
    <div className={`add-form-component p-0 customContainer`}>
      <div className={`border border-dark border-2 quarterScreenWidth`} style={{ margin: "1px" }}>
        <DelayReturnHeader />
        <DetailsScreenContent />
        <DetailsScreenFooter />
      </div>
    </div>
  );
};

export default DetailScreenTemplate;
