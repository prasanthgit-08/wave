import React from "react";
import OrderEntryContent from "./OrderEntryContent";
import OrderEntryFooter from "./OrderEntryFooter";
import OrderEntryHeader from "./OrderEntryHeader";
import styles from "../../../OrderEntry/OrderEntry.module.css";

function OrderEntryTemplate() {
  return (
    <div className={styles.mainContainer}>
      <div className="" style={{ margin: "1px" }}>
        {/* <OrderEntryHeader/> */}
        {/* <OrderEntryContent styles={styles} /> */}
        {/* <OrderEntryFooter /> */}
      </div>
    </div>
  );
}

export default OrderEntryTemplate;
