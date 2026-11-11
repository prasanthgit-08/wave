import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import ButtonComponent from "../../../common/Button";
import { t } from "i18next";
import InputField from "../../../common/InputField";
import { RadioGroup, Radio } from "react-radio-group";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setSearchTerm,
  setSearchCriteria,
  setCustomerContactData,
  setTotalPages,
  setTotalElements,
  setViewDetail,
  setEditFormData,
  resetChanges,
} from "../../../../redux/CustomerContactSlice";
import CustomerContactService from "../../../../services/CustomerContactService";

const CCSearchFilter = () => {
  const searchTerm = useSelector((state) => state.customerContactReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.customerContactReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.customerContactReducer.pageNumber);
  const dispatch = useDispatch();
  const param = useParams();
  const customerId = param.customerId;
  const fetchTableData = () => {
    CustomerContactService.getCustomerContacts(searchTerm, searchCriteria, pageNumber)
      .then((response) => {
        const data = response.data;
        dispatch(setCustomerContactData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 100);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, searchCriteria, pageNumber]);

  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0">
            <Col md={12} sm={12} lg={12} xs={12} className="p-l-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center search-box">
                  <span className="p-r-20">
                    <ButtonComponent
                      route={"/addCustomerContacts/" + customerId + "/new-page"}
                      className="btn btn-secondary btn-sm-font-12 btn-small-width"
                      label={t("quarter.screen.new")}
                      onClick={() => {
                        dispatch(setEditFormData(undefined));
                        dispatch(resetChanges());
                        dispatch(setViewDetail(undefined));
                      }}
                    />
                  </span>
                  <span className="p-l-20">
                    <label className="f-w-600 m-r-15">{t("quarter.screen.search")}</label>

                    <InputField
                      type="text"
                      name="searchTerm"
                      value={searchTerm}
                      autoComplete="off"
                      aria-autocomplete="list"
                      className="search-input"
                      onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                      autocomplete="autocomplete_off_randString"
                    />
                  </span>
                </div>

                <div className="d-flex align-items-center">
                  <RadioGroup
                    name="searchCriteria"
                    selectedValue={searchCriteria}
                    onChange={(value) => dispatch(setSearchCriteria(value))}
                  >
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Beginning" />
                      <label className="f-w-600 m-l-5">{t("quarter.screen.beginning")}</label>
                    </div>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Contains" />
                      <label className="f-w-600 m-l-5">{t("quarter.screen.contains")}</label>
                    </div>
                  </RadioGroup>
                </div>
                <span className="m-r-10">
                  <ButtonComponent
                    route={" "}
                    className="btn btn-secondary btn-sm font-12 btn-small-width close-button"
                    label={t("quarter.screen.close")}
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

export default CCSearchFilter;
