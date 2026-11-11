import React from "react";
import YardToYardContent from "./YardToYardContent";
import YardToYardFooter from "./YardToYardFooter";
import YardToYardHeader from "./YardToYardHeader";

function YardToYardTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <YardToYardHeader />

        <YardToYardContent />
        <YardToYardFooter />
      </div>
    </div>
  );
}

export default YardToYardTemplate;
