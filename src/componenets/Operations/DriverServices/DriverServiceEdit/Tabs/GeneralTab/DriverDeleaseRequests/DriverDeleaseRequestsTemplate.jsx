import React from "react";

import DriverDeleaseRequestsFooter from "./DriverDeleaseRequestsFooter";
import DriverDeleaseRequestsContent from "./DriverDeleaseRequestsContent";
import DriverDeleaseRequestsHeader from "./DriverDeleaseRequestsHeader";

function DriverDeleaseRequestsTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <DriverDeleaseRequestsHeader />
        <DriverDeleaseRequestsContent />
        <DriverDeleaseRequestsFooter />
      </div>
    </div>
  );
}

export default DriverDeleaseRequestsTemplate;
