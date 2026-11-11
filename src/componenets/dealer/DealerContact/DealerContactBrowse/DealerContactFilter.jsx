import { t } from "i18next";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import { useParams } from "react-router-dom";
import ButtonComponent from "../../../common/Button";
import InputField from "../../../common/InputField";
import {
  setPageNumber,
  setSearchCrit,
  setSearchTerm,
  setSelectedId,
  setSortType,
  setSortValue,
} from "../../../../redux/DealerContacts";
import { useDispatch, useSelector } from "react-redux";

function DealerContactFilter() {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const pagenum = params.pageNumber;
  const { searchCrit, searchTerm } = useSelector((state) => state.dealerContacts);
  const handleFirstRadioGroupOnChange = (value) => {
    dispatch(setSearchCrit(value));
    dispatch(setPageNumber(0));
  };

  const handleSearchTerm = (e) => {
    dispatch(setSearchTerm(e.target.value));
    dispatch(setPageNumber(0));
  };

  const closeHandle = () => {
    dispatch(setPageNumber(0));
    dispatch(setSearchCrit("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setSelectedId(""));
    dispatch(setSortType(null));
    dispatch(setSortValue(null));
  };

  return (
    <Row className="border border-dark border-2 p-t-10 p-b-10">
      <Col md={12}>
        <Row className="m-0 p-0 justify-content-between align-items-center">
          <Col md={6} sm={6} lg={6} xs={6} className="p-l-0">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center ">
                <span className="p-r-20">
                  <ButtonComponent
                    route={"/dealer-contacts/" + id + "/" + pagenum + "/add"}
                    className="btn btn-secondary btn-sm font-12 w-50px"
                    label={t("dealers.list.page.new.button")}
                    onClick={() => {}}
                  />
                </span>

                <span className="p-l-20">
                  <label className="f-w-600 m-r-15">{t("dealers.list.page.search.button")}</label>
                  <InputField
                    type="search"
                    name="searchTerm"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={searchTerm}
                    placeholder={t("dealers.list.page.global.search")}
                    onChange={handleSearchTerm}
                  />
                </span>
              </div>

              <div className="d-flex align-items-center ms-5">
                <RadioGroup
                  name="searchCriteria"
                  selectedValue={searchCrit}
                  onChange={handleFirstRadioGroupOnChange}
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
                  route={"/add-dealer/" + id + "/" + pagenum}
                  className="btn btn-secondary btn-sm font-12 customButtonSmallWidth close-button "
                  label={t("dealers.list.page.advanced.close.button")}
                  onClick={closeHandle}
                />
              </span>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default DealerContactFilter;
