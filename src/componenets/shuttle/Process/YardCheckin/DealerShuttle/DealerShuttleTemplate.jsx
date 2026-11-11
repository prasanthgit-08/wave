import React from "react";
import DealerShuttleContent from "./DealerShuttleContent";
import DealerShuttleFooter from "./DealerShuttleFooter";
import DealerShuttleHeader from "./DealerShuttleHeader";

function DealerShuttleTemplate() {
  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <DealerShuttleHeader />
        <DealerShuttleContent />
        <DealerShuttleFooter />
      </div>
    </div>
  );
}

export default DealerShuttleTemplate;
