import React from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerPlantSpecialCondition } from "../../../../../../redux/CustomerPlantMaintenanceSlice";
import { usePermission } from "../../../../../../hooks/usePermission";
import { PROGRAMS } from "../../../../../../constants/permissionConstants";

const PlantConditions = () => {
  const dispatch = useDispatch();
  const { checkPermission } = usePermission();
  const customerPlantSpecialCondition = useSelector(
    (state) => state.customerPlantmaintanceReducer.customerPlantSpecialCondition
  );
  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);

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
                    id="customerPlantSpecialCondition"
                    name="customerPlantSpecialCondition"
                    value={customerPlantSpecialCondition}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled={viewDetail || !checkPermission(PROGRAMS.CUSTOMER_ORDER_EDIT, "edit")}
                    onInput={(e) => dispatch(setCustomerPlantSpecialCondition(e.target.value))}
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

export default PlantConditions;
