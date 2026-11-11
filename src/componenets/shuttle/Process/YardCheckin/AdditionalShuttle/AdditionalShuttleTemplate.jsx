import React from "react";
import AdditionalShuttleContent from "./AdditionalShuttleContent";
import AdditionalShuttleFooter from "./AdditionalShuttleFooter";
import AdditionalShuttleHeader from "./AdditionalShuttleHeader";

function AdditionalShuttleTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <AdditionalShuttleHeader />
        <AdditionalShuttleContent />
        <AdditionalShuttleFooter />
      </div>
    </div>
  );
}

export default AdditionalShuttleTemplate;
