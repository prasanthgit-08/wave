import React, { useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerMaintananceSpecialCondition } from "../../../../../../redux/CustomerMaintenanceSlice";
import { usePermission } from "../../../../../../hooks/usePermission";
import { PROGRAMS } from "../../../../../../constants/permissionConstants";

const MaintananceCondition = () => {
  const dispatch = useDispatch();
  const { checkPermission } = usePermission();
  const viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);
  const customerMaintananceSpecialCondition = useSelector(
    (state) => state.customerMaintenanceReducer.customerMaintananceSpecialCondition
  );
  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  useEffect(() => {
    if (editCustomerData === null) {
      dispatch(setCustomerMaintananceSpecialCondition(""));
    }
    if (editCustomerData != null) {
      dispatch(
        setCustomerMaintananceSpecialCondition(
          editCustomerData.customerOrdersSpecialConditions != null
            ? editCustomerData.customerOrdersSpecialConditions
            : ""
        )
      );
    }
  }, [editCustomerData, viewDetail]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-30 w-100">
            <Col lg={12} sm={12} md={12} xs={12}>
              <Form.Group className="form-group row ms-2">
                <Col sm={12} xs={12} className="p-0">
                  <Form.Label className={`customColFormLabel`}>Customer Orders Special Conditions</Form.Label>
                </Col>
                <Col xs={10} className="p-0 mt-3">
                  <textarea
                    rows={10}
                    cols={70}
                    type="text"
                    className="form-control h-300px "
                    id="customerMaintananceSpecialCondition"
                    name="customerMaintananceSpecialCondition"
                    value={customerMaintananceSpecialCondition}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled={viewDetail || !checkPermission(PROGRAMS.CUSTOMER_ORDER_EDIT, "edit")}
                    onInput={(e) => dispatch(setCustomerMaintananceSpecialCondition(e.target.value))}
                  />
                </Col>
              </Form.Group>
            </Col>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintananceCondition;
