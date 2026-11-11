import React from "react";
import ShuttleBonusContent from "./ShuttleBonusContent";
import ShuttleBonusFooter from "./ShuttleBonusFooter";
import ShuttleBonusHeader from "./ShuttleBonusHeader";

function ShuttleBonusTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <ShuttleBonusHeader />
        <ShuttleBonusContent />
        <ShuttleBonusFooter />
      </div>
    </div>
  );
}

export default ShuttleBonusTemplate;
