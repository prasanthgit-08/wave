import React from "react";
import { Col, Row } from "react-bootstrap";
import InputField from "../../../common/InputField";
import { Radio, RadioGroup } from "react-radio-group";
import { t } from "i18next";
import ButtonComponent from "../../../common/Button";

const UserPermissionSearchFilter = () => {
  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0">
            <Col md={8} sm={8} lg={7} xs={8} className="p-l-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center search-box">
                  <span className="p-r-20"></span>

                  <span className="p-l-20">
                    <label className="f-w-600 m-r-15">{t("dealers.list.page.search.button")}</label>
                    <InputField
                      type="search"
                      name="searchTerm"
                      autoComplete="off"
                      aria-autocomplete="list"
                      placeholder={t("dealers.list.page.global.search")}
                      className="search-input"

                      onChange={(e) => {}}

                      autocomplete="autocomplete_off_randString"
                    />
                  </span>
                </div>

                <div className="d-flex align-items-center">
                  <RadioGroup name="searchCriteria">
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

                <div className="d-flex flex-column">
                  <RadioGroup name="status">
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="All" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.all")}</label>
                    </div>

                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Active" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.active")}</label>
                    </div>

                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Inactive" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.inactive")}</label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="d-flex flex-column">
                  <RadioGroup name="userStatus">
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="All" />
                      <label className="f-w-600 m-l-5">All</label>
                    </div>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Actual" />
                      <label className="f-w-600 m-l-5">Actual</label>
                    </div>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Pseudo" />
                      <label className="f-w-600 m-l-5">Pseudo</label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Col>

            <Col md={4} sm={4} lg={4} xs={4} className="p-l-0">
              <div className="d-flex justify-content-end advanced-search-box">
                <div className="d-flex flex-column">
                  <span className="m-b-5">
                    <ButtonComponent
                      route={""}
                      className="btn btn-secondary font-12 btn-sm btn-medium-with"
                      label={t("dealers.list.page.advanced.search.button")}
                      onClick={() => {}}
                    />
                  </span>

                  <span className="m-t-5">
                    <ButtonComponent
                      route={""}
                      className="btn btn-secondary font-12 btn-sm btn-medium-with"
                      label={t("dealers.list.page.advanced.sort.button")}
                      onClick={() => {}}
                    />
                  </span>
                </div>

                <span className="m-l-10">
                  <ButtonComponent
                    route={"/"}
                    className="btn btn-secondary btn-sm font-12 btn-small-width close-button"
                    label={t("dealers.list.page.advanced.close.button")}
                    onClick={() => {}}
                  />
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default UserPermissionSearchFilter;
