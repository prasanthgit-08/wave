import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import ButtonComponent from "../../../common/Button";
import COBHeader from "../COB_Edit/COBHeader";
import { t } from "i18next";
import InputField from "../../../common/InputField";
import { RadioGroup, Radio } from "react-radio-group";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchTerm,
  setSelectedSearchCriteria,
  setViewDetail,
} from "../../../../redux/customerOpenBalanceSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const COBSearchFilter = () => {
  const onClose = async () => {
    window.location.reload();
  };
  const [searchTerms, setSearchTerms] = useState("");

  const selectedSearchCriteria = useSelector(
    (state) => state.customerOpenBalanceReducer.selectedSearchCriteria
  );
  const dispatch = useDispatch();

  const handleRadioGroupOnChange = (value) => {
    dispatch(setSelectedSearchCriteria(value));
  };
  const globalSearchHandleChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
    setSearchTerms(event.target.value);
  };

  useEffect(() => {}, [searchTerms]);

  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0">
            <Col md={8} sm={8} lg={7} xs={8} className="p-l-0">
              <div className="d-flex align-items-center justify-content-right">
                <div className="d-flex align-items-center search-box">
                  <span className="p-r-20">
                    <ButtonComponent
                      route={"/coustomerOpenBalanceview"}
                      className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                      label={t("customerOpenBalance.list.page.new.button")}
                      onChange={dispatch(setViewDetail(false))}
                    />
                  </span>
                  <span className="p-l-20">
                    <label className="f-w-600 m-r-15">
                      {t("customerOpenBalance.list.page.search.button")}
                    </label>

                    <InputField
                      type="text"
                      name="searchTerm"
                      autoComplete="off"
                      className="search-input"
                      onChange={(e) => {
                        globalSearchHandleChange(e);
                      }}
                    />
                  </span>

                  <div className="d-flex align-items-center">
                    <span className="p-l-20"></span>
                    <RadioGroup
                      name="searchCriteria"
                      selectedValue={selectedSearchCriteria}
                      onChange={handleRadioGroupOnChange}
                    >
                      <div className="d-flex align-items-center m-b-5">
                        <Radio value="Beginning" />
                        <label className="f-w-600 m-l-5">
                          {t("customerOpenBalance.list.page.filters.begining")}
                        </label>
                      </div>
                      <div className="d-flex align-items-center m-b-5">
                        <Radio value="Contains" />
                        <label className="f-w-600 m-l-5">
                          {t("customerOpenBalance.list.page.filters.contains")}
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={0} sm={0} lg={0} xs={0} className="p-l-20">
              <div className="d-flex justify-content-end advanced-search-box">
                <div className="d-flex flex-column">
                  <span className="m-b-5"></span>
                  <ButtonComponent
                    route={""}
                    className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                    label={t("customerOpenBalance.list.page.resources.close.button")}
                    onClick={onClose}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default COBSearchFilter;
