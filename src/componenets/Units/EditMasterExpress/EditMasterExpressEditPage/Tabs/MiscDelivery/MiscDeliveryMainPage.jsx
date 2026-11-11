import React from "react";
import { Row } from "react-bootstrap";
import MiscDeliveryTabColumn1 from "./MiscDeliveryTabColumn1";
import MiscDeliveryTabColumn2 from "./MiscDeliveryTabColumn2";
import MiscDeliveryTabColumn3 from "./MiscDeliveryTabColumn3";

export const MiscDeliveryMainPage = ({ styles }) => {
  return (
    <div>
      <Row className="justify-content-between ps-1 pt-1">
        <MiscDeliveryTabColumn1 styles={styles} />
        <MiscDeliveryTabColumn2 styles={styles} />
        <MiscDeliveryTabColumn3 styles={styles} />
      </Row>
    </div>
  );
};
