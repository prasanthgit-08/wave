import React from "react";
import RandomTestingHeader from "./RandomTestingHeader";
import RandomTestingContent from "./RandomTestingContent";
import RandomTestingFooter from "./RandomTestingFooter";

const RandomTestingTemplate = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <RandomTestingHeader />
        <RandomTestingContent />
        <RandomTestingFooter />
      </div>
    </div>
  );
};

export default RandomTestingTemplate;
