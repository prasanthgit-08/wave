import React from "react";
import { useSelector } from "react-redux";

const UnitInstructions = () => {
  const unitInstructionValue = useSelector((state) => state.paperworkProcessing.unitInstructionValue);
  return (
    <div className="p-2">
      <div className="col-12" style={{ height: "490px" }}>
        <textarea
          placeholder="Customer invoicing instruction"
          className="w-100 h-100"
          disabled
          name="unitInstruction"
          id="unitInstruction"
          value={unitInstructionValue}
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </div>
  );
};

export default UnitInstructions;
