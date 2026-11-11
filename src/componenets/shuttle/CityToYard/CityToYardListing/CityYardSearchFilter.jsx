import { t } from "i18next";
import React from "react";
import ButtonComponent from "../../../common/Button";
import { RadioGroup, Radio } from "react-radio-group";
import { Row, Col } from "react-bootstrap";
import InputField from "../../../common/InputField";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  resetChanges,
  setCity,
  setDescription,
  setEditFormData,
  setListingData,
  setPageNumber,
  setSearchCity,
  setSearchCriteria,
  setSearchDescription,
  setSearchedUser,
  setSearchingCondititon,
  setSearchTerm,
  setSelectedId,
  setShowAdvanceSearch,
  setTotalElements,
  setTotalPages,
  setViewDetail,
  setNormalSortValue,
  setNormalSortFlag,
} from "../../../../redux/CityToYardSlice";
import { useEffect } from "react";

function CityYardSearchFilter() {
  const [loading, setLoading] = useState(true);
  const searchTerm = useSelector((state) => state.cityToYardReducer.searchTerm);
  const globalSearchTerm = useSelector((state) => state.cityToYardReducer.searchTerm);

  const searchCriteria = useSelector((state) => state.cityToYardReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.cityToYardReducer.pageNumber);
  const listingData = useSelector((state) => state.cityToYardReducer.listingData);
  const searchingCondititon = useSelector((state) => state.cityToYardReducer.searchingCondititon);
  const searchDescription = useSelector((state) => state.cityToYardReducer.searchDescription);

  const searchCity = useSelector((state) => state.cityToYardReducer.searchCity);

  const showAdvanceSearch = useSelector((state) => state.cityToYardReducer.showAdvanceSearch);
  const searchedUser = useSelector((state) => state.cityToYardReducer.searchedUser);

  let sortFlag = useSelector((state) => state.cityToYardReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.cityToYardReducer.normalSortValue);
  const dispatch = useDispatch();

  const globalSearchHandleChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
    dispatch(setPageNumber(0));
  };
  const onChangeShowAdvanceSearch = (value) => {
    dispatch(setSearchTerm(""));
    dispatch(setSearchDescription(""));
    dispatch(setSearchCity(""));

    if (value === true) {
      dispatch(setSearchTerm(""));
      dispatch(setSearchDescription(""));
      dispatch(setSearchCity(""));
    } else {
      dispatch(setDescription(""));
      dispatch(setCity(""));
    }
    dispatch(setShowAdvanceSearch(value));
  };

  const onClose = () => {
    dispatch(setSearchDescription(""));
    dispatch(setSearchCity(""));
    dispatch(setCity(""));
    dispatch(setDescription(""));
    dispatch(setSelectedId(null));
    dispatch(setSearchTerm(""));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setNormalSortValue(null));
    dispatch(setNormalSortFlag(false));
  };

  return (
    <div>
      <div>
        <Row className="border border-dark border-2 p-t-10 p-b-10">
          <Col md={12}>
            <Row className="m-0 p-0 ">
              <Col md={8} sm={8} lg={7} xs={8} className="p-l-0">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center customSearchBox">
                    <span className="p-r-20">
                      <ButtonComponent
                        route={"/city-to-yard/add"}
                        className="btn btn-secondary btn-sm font-12 customButtonSmallWidth"
                        label={t("dealers.list.page.new.button")}
                        onClick={() => {
                          dispatch(setEditFormData(undefined));
                          dispatch(resetChanges());
                          dispatch(setViewDetail(false));
                        }}
                      />
                    </span>

                    <span className="p-l-20">
                      <label className="f-w-600 m-r-15 customLabel">
                        {t("dealers.list.page.search.button")}
                      </label>
                      <InputField
                        type="text"
                        name="searchTerm"
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={searchTerm}
                        onChange={(e) => {
                          dispatch(setSearchTerm(e.target.value));
                          dispatch(setPageNumber(0));
                          globalSearchHandleChange(e);
                        }}
                        disabled={showAdvanceSearch}
                        placeholder={t("dealers.list.page.global.search")}
                        className="search-input"
                        autocomplete="autocomplete_off_randString"
                      />
                    </span>
                  </div>

                  <div className="d-flex ">
                    <RadioGroup
                      name="searchCriteria"
                      selectedValue={searchCriteria}
                      onChange={(value) => {
                        dispatch(setSearchCriteria(value));
                        dispatch(setPageNumber(0));
                      }}
                    >
                      <div className="d-flex  m-b-5">
                        <Radio value="Beginning" />
                        <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.begining")}</label>
                      </div>
                      <div className="d-flex  m-b-5">
                        <Radio value="Contains" />
                        <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.contains")}</label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="d-flex align-items-center">
                    <RadioGroup name="status" onChange={""}>
                      <div className="d-flex align-items-center m-b-5"></div>
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
                        onClick={() => {
                          onChangeShowAdvanceSearch(!showAdvanceSearch);
                          dispatch(setCity(""));
                          dispatch(setDescription(""));
                        }}
                        className="btn btn-secondary font-12 btn-sm btn-medium-with"
                        label={t("dealers.list.page.advanced.search.button")}
                      />
                    </span>
                  </div>

                  <span className="m-l-10">
                    <ButtonComponent
                      route={""}
                      className="btn btn-secondary btn-sm font-12 btn-small-width close-button"
                      label={t("dealers.list.page.advanced.close.button")}
                      onClick={onClose}
                    />
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CityYardSearchFilter;
