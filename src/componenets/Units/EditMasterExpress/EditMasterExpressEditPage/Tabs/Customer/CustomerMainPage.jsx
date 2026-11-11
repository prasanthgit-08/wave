import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomerTabColumn1 from "./CustomerTabColumn1";
import CustomerTabColumn2 from "./CustomerTabColumn2";
import { Row } from "react-bootstrap";
import { setIsCustomerTabValid } from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

const CustomerMainPage = ({ styles }) => {
  const dispatch = useDispatch();

  //States From Redux *
  const isCustomerTabColumn1TabValidation = useSelector(
    (state) => state.editMasterExpressTabsReducer.isCustomerTabColumn1TabValidation
  );
  const isCustomerTabColumn2TabValidation = useSelector(
    (state) => state.editMasterExpressTabsReducer.isCustomerTabColumn2TabValidation
  );

  //Customer Tab Validation
  useEffect(() => {
    if (isCustomerTabColumn1TabValidation && isCustomerTabColumn2TabValidation) {
      dispatch(setIsCustomerTabValid(true));
    } else {
      dispatch(setIsCustomerTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCustomerTabColumn1TabValidation, isCustomerTabColumn2TabValidation]);

  return (
    <div className="p-1 ps-2">
      <Row>
        <CustomerTabColumn1 styles={styles} />
        <CustomerTabColumn2 styles={styles} />
      </Row>
    </div>
  );
};

export default CustomerMainPage;
