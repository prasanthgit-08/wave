import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { setPageNumber, setRadioValue } from "../../../../../../../redux/SettlementsSlice";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../../../../common/PaginationComponent";
import TableListing from "./TableListing";
import CustomRadioGroup from "../../../../../../common/CustomRadioGroup";
import { useParams } from "react-router-dom";
import { PermissionKeyGeneratorUtil } from "../../../../../../../utils/PermissionKeyGeneratorUtil";
function SettlementFormContent({ loader }) {
  const params = useParams();
  const driverId = params.driverId;
  const dispatch = useDispatch();
  const [ischeckPermission, setIsCheckPermission] = useState(false);

  const pageNumber = useSelector((state) => state.settlementsReducer.pageNumber);

  const totalElements = useSelector((state) => state.settlementsReducer.totalElements);
  const totalPages = useSelector((state) => state.settlementsReducer.totalPages);
  const settlementData = useSelector((state) => state.settlementsReducer.settlementData);
  const totalFund = useSelector((state) => state.settlementsReducer.totalFund);
  const radioValue = useSelector((state) => state.settlementsReducer.radioValue);
  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const checkPermission = PermissionKeyGeneratorUtil("settlement", "CHECK");

  useEffect(() => {
    if (deniedPermissions) {
      setIsCheckPermission(deniedPermissions.includes(checkPermission));
    }
  }, []);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: settlementData,
  };
  return (
    <div className="p-2  quarterScreenWidth">
      <div className="p-15 shadow-sm rounded border " style={{ height: "425px" }}>
        <div className="  p-15">
          <div className="d-flex border border-1 border-dark">
            <div className="flex-grow-1">
              <TableListing loader={loader} />
            </div>

            <PaginationComponent {...paginationProps} firstPage lastPage singleArrowUp singleArrowDown />
          </div>
          <Col className="p-15 mt-1 " md={10}>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
              <Col xs={3} sm={3} className="p-0 text-end">
                <Form.Label className="col-form-label me-4">Total Funds</Form.Label>
              </Col>

              <Col xs={2} md={2} className="p-0" style={{ width: "80px" }}>
                <input
                  className={"customFormControl"}
                  id="totalFund"
                  name="totalFund"
                  type="text"
                  value={totalFund}
                  maxLength={6}
                  disabled
                  autoComplete="off"
                />
              </Col>
            </Form.Group>

            <Form.Group className={`form-group align-items-center row m-l-0 m-r-0 mb-3`}>
              <Col xs={3} sm={3} className="p-0 text-end">
                <Form.Label htmlFor="name" className="col-form-label me-4">
                  Post Funds To
                </Form.Label>
              </Col>

              <Col xs={2} md={2} className="p-0" style={{ width: "80px" }}>
                <CustomRadioGroup
                  name="Type"
                  horizontal
                  horizontalAlignmentClassName={"me-4"}
                  options={[
                    { label: "Debit Card", value: "Debit Card", disabled: totalFund <= 0 },
                    { label: "Check", value: "Check", disabled: totalFund <= 0 || ischeckPermission },
                  ]}
                  selectedOption={radioValue}
                  onChange={(option) => dispatch(setRadioValue(option))}
                />
              </Col>
            </Form.Group>
          </Col>
        </div>
      </div>
    </div>
  );
}

export default SettlementFormContent;
