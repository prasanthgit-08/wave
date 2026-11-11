import React from "react";
import QuarterStyles from "../../../../styles/QuarterScreen.module.css";
import DealerConnectionsEditFooter from "./DealerConnectionsEditFooter";
import DealerConnectionEditHeader from "./DealerConnectionEditHeader";
import DealerConnectionEditContent from "./DealerConnectionEditContent";
const DealerConnectionsEditForm = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <DealerConnectionEditHeader />
        <DealerConnectionEditContent />
        <DealerConnectionsEditFooter />
      </div>
    </div>
  );
};

export default DealerConnectionsEditForm;
