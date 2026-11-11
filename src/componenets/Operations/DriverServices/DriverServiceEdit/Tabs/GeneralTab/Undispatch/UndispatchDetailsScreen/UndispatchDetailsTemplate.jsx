import React, { useEffect, useState } from "react";
import UndispatchHeader from "../UndispatchHeader";

import UndispatchDetailContent from "./UndispatchDetailContent";
import UnDispatchDetailFooter from "./UnDispatchDetailFooter";
import { useParams } from "react-router-dom";

const UndispatchDetailsTemplate = () => {
  const { dispatchId, driverId } = useParams();

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <UndispatchHeader />
        <UndispatchDetailContent />
        <UnDispatchDetailFooter />
      </div>
    </div>
  );
};

export default UndispatchDetailsTemplate;
