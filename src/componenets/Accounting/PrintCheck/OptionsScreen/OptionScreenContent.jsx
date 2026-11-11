import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setCompanyData, setSource, setWho } from "../../../../redux/PrintCheckSlice";
import { useDispatch } from "react-redux";
import DriverService from "../../../../services/DriverService";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import { getCurrentCompany } from "../../../../utils/utils";

const OptionScreenContent = () => {
  const source = useSelector((state) => state.printCheckReducer.source);
  const who = useSelector((state) => state.printCheckReducer.who);
  const companyData = useSelector((state) => state.printCheckReducer.companyData);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const currentCompany = getCurrentCompany();
    if (currentCompany) {
      dispatch(setCompanyData(currentCompany));
      if (currentCompany?.allDriversPayTaxable === true) {
        dispatch(setSource("Taxable"));
      }
    }
  }, []);

  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border quarterScreenFormContentHeight">
        {
          <Row className="m-0 p-10">
            <Col xs={12}>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={1} md={1} xs={1} className="p-0">
                  <Form.Label
                    className="col-form-label dealer-label"
                    hidden={companyData?.allDriversPayTaxable}
                  >
                    Source
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <CustomRadioGroup
                    hidden={companyData?.allDriversPayTaxable}
                    name="Type1"
                    horizontal
                    horizontalAlignmentClassName={"me-4"}
                    options={["Taxable", "Reimbursement"]}
                    selectedOption={source}
                    onChange={(option) => dispatch(setSource(option))}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={1} md={1} xs={1} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Who</Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <CustomRadioGroup
                    name="Type"
                    horizontal
                    horizontalAlignmentClassName={"me-4"}
                    options={["Driver", "Transport Company", "Miscellaneous"]}
                    selectedOption={who}
                    onChange={(option) => dispatch(setWho(option))}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        }
      </div>
      {load && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionScreenContent;
