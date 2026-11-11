/* eslint-disable react-hooks/exhaustive-deps */
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import ButtonComponent from "../../common/Button";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedSearchCriteria, setPageNumber } from "../../../redux/LookupScreens/DriverLookupSlice";

function DriverSelectionLookupFilter({ onHide }) {
  const dispatch = useDispatch();

  const selectedSearchCriteria = useSelector((state) => state.driverLookup.selectedSearchCriteria);

  const handleRadioGroupOnChange = (value) => {
    dispatch(setSelectedSearchCriteria(value));
    dispatch(setPageNumber(0));
  };

  return (
    <div>
      <div className=" border border-dark border-2 py-2">
        <Col md={12} className="">
          <Row className="m-0 p-0 justify-content-between align-items-center">
            <Col md={8} sm={8} lg={7} xs={8} className="p-l-0">
              <div className="d-flex align-items-center justify-content-end">
                <div className="d-flex align-items-center search-box">
                  <span className="p-r-20"></span>
                </div>

                <div className="d-flex align-items-center me-5">
                  <RadioGroup
                    name="searchCriteria"
                    selectedValue={selectedSearchCriteria}
                    onChange={handleRadioGroupOnChange}
                  >
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Beginning" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.begining")}</label>
                    </div>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Contains" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.contains")}</label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Col>

            <Col md={4} sm={4} lg={4} xs={4} className="p-l-0">
              <div className="d-flex justify-content-end advanced-search-box">
                <span className="m-l-10">
                  <ButtonComponent
                    route={""}
                    className="btn btn-secondary  font-12  close-button"
                    label={t("dealers.list.page.advanced.close.button")}
                    onClick={onHide}
                  />
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </div>
    </div>
  );
}

export default DriverSelectionLookupFilter;
