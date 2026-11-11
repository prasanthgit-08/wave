import { t } from "i18next";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import ButtonComponent from "../../../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { resetApproveHeld, setPageNumber, setSearchCriteria } from "../../../../../redux/ApproveHeldSlice";

function ApproveHeldFilter() {
  const searchCriteria = useSelector((state) => state.approveHeldShuttleReducer.searchCriteria);
  const dispatch = useDispatch();
  const handleRadioButton = (value) => {
    dispatch(setSearchCriteria(value));
    dispatch(setPageNumber(0));
  };
  const handleOnClick = () => {
    dispatch(resetApproveHeld(true));
  };

  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10 h-60px">
        <Col md={12}>
          <Row className="m-0 p-0">
            <Col md={12} sm={12} lg={12} xs={12} className="p-l-0">
              <div className="mt-2 d-flex align-items-center ms-5 justify-content-between">
                <div className=" align-items-center">
                  <RadioGroup
                    name="searchCriteria"
                    className="d-flex"
                    selectedValue={searchCriteria}
                    onChange={handleRadioButton}
                  >
                    <div className="d-flex ms-3 align-items-center m-b-5">
                      <Radio value="both" />
                      <label className={`f-w-600 m-l-5 `}>Both</label>
                    </div>
                    <div className="d-flex ms-3 align-items-center m-b-5">
                      <Radio value="towable" />
                      <label className={`f-w-600 m-l-5 `}>Towable</label>
                    </div>
                    <div className="d-flex ms-3 align-items-center m-b-5">
                      <Radio value="motorized" />
                      <label className={`f-w-600 m-l-5 `}>Driveaway</label>
                    </div>
                  </RadioGroup>
                </div>

                <span className="m-l-10">
                  <ButtonComponent
                    route={"/"}
                    className={`btn btn-secondary btn-sm btn-medium-width  close-button`}
                    label={t("close.button")}
                    onClick={handleOnClick}
                  />
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ApproveHeldFilter;
