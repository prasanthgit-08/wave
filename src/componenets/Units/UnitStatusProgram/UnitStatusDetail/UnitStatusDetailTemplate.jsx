import React from "react";
import UnitStatusDetailHeader from "./UnitStatusDetailHeader";
import UnitStatusDetailFooter from "./UnitStatusDetailFooter";
import UnitStatusDetailContent from "./UnitStatusDetailContent";

function UnitStatusDetailTemplate() {
  return (
    <div className="container-fluid table-bordered customContainer">
      <div className="row">
        <div
          className="border border-dark border-2 px-0"
          style={{
            // min width for scrollbars
            minWidth: "1480px",
          }}
        >
          <UnitStatusDetailHeader />
          <UnitStatusDetailContent />
          <UnitStatusDetailFooter />
        </div>
      </div>
    </div>
  );
}

export default UnitStatusDetailTemplate;
