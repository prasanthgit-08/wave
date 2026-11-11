import { t } from "i18next";
import React from "react";
import { Col, Row } from "react-bootstrap";
import ButtonComponent from "../../../common/Button";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import InputField from "../../../common/InputField";
import { useDispatch } from "react-redux";
import {
  setCanadianCity,
  setProvence,
  setStateCode,
  setUsCity,
  setViewDetail,
} from "../../../../redux/PortsOfEntrySlice";

function PortsOfEntryFilter() {
  const searchCriteriaOptions = ["Beginning", "Contains"];

  const dispatch = useDispatch();

  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0">
            <Col md={8} sm={8} lg={8} xs={8} className="p-l-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center customSearchBox">
                  <span className="p-r-20">
                    <ButtonComponent
                      route={""}
                      className="btn btn-secondary btn-sm font-12 customButtonSmallWidth"
                      label={t("new.button")}
                      onClick={() => {
                        dispatch(setViewDetail(false));
                      }}
                    />
                  </span>

                  <span className="p-l-20">
                    <label className="f-w-600 m-r-15 customLabel">{t("search.label")}</label>
                    <InputField
                      type="text"
                      name="globalSearchTerm"
                      autoComplete="off"
                      aria-autocomplete="list"
                      autocomplete="autocomplete_off_randString"
                    />
                  </span>
                </div>

                <div className="d-flex align-items-center">
                  <CustomRadioGroup
                    name="searchCriteria"
                    selectedOption={""}
                    options={searchCriteriaOptions}
                    onChange={(option) => {}}
                  />
                </div>
              </div>
            </Col>

            <Col md={4} sm={4} lg={4} xs={4} className="p-l-0">
              <div className="d-flex justify-content-end advanced-search-box">
                <span className="m-l-10">
                  <ButtonComponent
                    route={""}
                    className={`btn btn-secondary btn-sm font-12 customButtonSmallWidth close-button `}
                    label={t("close.button")}
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

export default PortsOfEntryFilter;
