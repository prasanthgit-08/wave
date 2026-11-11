import React from "react";
import OrderNotEnterContent from "./OrderNotEnterContent";
import OrderNotEnterFooter from "./OrderNotEnterFooter";
import OrderNotEnterHeader from "./OrderNotEnterHeader";

function OrderNotEnterTemplate() {
  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <OrderNotEnterHeader />
        <OrderNotEnterContent />
        <OrderNotEnterFooter />
      </div>
    </div>
  );
}

export default OrderNotEnterTemplate;
