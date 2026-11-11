import React from "react";

import { useSelector } from "react-redux";

const CustomerInstructions = () => {
  const customerInstructions = useSelector((state) => state.paperworkProcessing.customerInstructions);

  return (
    <div className="p-2">
      <div className="col-12" style={{ height: "490px" }}>
        <textarea
          placeholder="Customer invoicing instruction"
          className="w-100 h-100"
          disabled
          name=""
          id=""
          cols="30"
          rows="10"
          value={customerInstructions}
        ></textarea>
      </div>
    </div>
  );
};

export default CustomerInstructions;
