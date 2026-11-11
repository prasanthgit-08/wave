import React from "react";
import DispatchDelayMoveHeader from "./DispatchDelayMoveHeader";
import DispatchDelayMoveFooter from "./DispatchDelayMoveFooter";
import DispatchDelayMoveContent from "./DispatchDelayMoveContent";

const DispatchDelayMove = () => {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <DispatchDelayMoveHeader />
        <DispatchDelayMoveContent />
        <DispatchDelayMoveFooter />
      </div>
    </div>
  );
};

export default DispatchDelayMove;
