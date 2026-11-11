import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import ButtonComponent from "../../common/Button";
import InputField from "../../common/InputField";
import { setRadioType, setSearchType } from "../../../redux/CustomerEmailSearchFilterSlice";

import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";

function EmailMaintenanceSearchFilter() {
  const [emailtype, setEmailtype] = useState("Beginning");

  const dispatch = useDispatch();

  const radioType = useSelector((state) => state.customerEmailSearchFilter.radioType);
  const searchType = useSelector((state) => state.customerEmailSearchFilter.searchType);
  const customerfk = useSelector((state) => state.customerEmailMaintenance.customerFK);

  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0 align-items-center col-12">
            <Col md={8} sm={8} lg={7} xs={8} className="p-l-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center search-box">
                  <span className="p-r-20">
                    <ButtonComponent
                      route={"/customer-email-maintenance/" + customerfk + "/new-page"}
                      className="btn btn-secondary btn-sm font-12 btn-small-width"
                      label={t("dealers.list.page.new.button")}
                    />
                  </span>

                  <span className="p-l-20">
                    <label className="f-w-600 m-r-15">{t("dealers.list.page.search.button")}</label>
                    <InputField
                      type="text"
                      name="searchTerm"
                      placeholder={t("dealers.list.page.global.search")}
                      className="search-input"
                      onChange={(e) => {
                        dispatch(setSearchType(e.target.value));
                      }}

                      autoComplete="off"
                    />
                  </span>
                </div>

                <div className="d-flex align-items-center">
                  <RadioGroup name="searchCriteria">
                    <div className="d-flex align-items-center m-b-5">
                      <input
                        type="radio"
                        name="types"
                        id="Beginning"
                        value="Beginning"
                        checked={radioType == "Beginning" ? true : false}
                        onClick={() => {
                          dispatch(setRadioType("Beginning"));
                        }}
                      />

                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.begining")}</label>
                    </div>
                    <div className="d-flex align-items-center m-b-5">
                      <input
                        type="radio"
                        name="types"
                        id="Contains"
                        value="Contains"
                        checked={radioType == "Contains" ? true : false}
                        onClick={() => {
                          dispatch(setRadioType("Contains"));
                        }}
                      />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.contains")}</label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Col>

            <Col md={4} sm={4} lg={5} xs={4} className="p-l-0">
              <div className="d-flex justify-content-end align-items-center ">
                <span className="m-l-10">
                  <ButtonComponent
                    route={""}
                    className="btn btn-secondary btn-sm font-12 btn-small-width close-button"
                    label={t("dealers.list.page.advanced.close.button")}
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

export default EmailMaintenanceSearchFilter;
