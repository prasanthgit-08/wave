/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RadioGroup, Radio } from "react-radio-group";
import { Row, Col } from "react-bootstrap";
import ButtonComponent from "../../common/Button";
import { useSelector, useDispatch } from "react-redux";
import DealerService from "../../../services/DealerService";
import InputField from "../../common/InputField";
import { t } from "i18next";
import {
  setSelectedDealerStatus,
  setTest,
  setSelectedStatus,
  setSelectedSearchCriteria,
  setDealerData,
  setSearchTerms,
  setShowAdvanceSearch,
  setShowAdvanceSort,
  setComplete,
  setChangeColor,
  setSearchedDealer,
  setAdvanceSortingCriteria,
  setNormalSortFlag,
  setNormalSortValue,
  setAdvanceSortedValue,
  setAdvancedSearchObject,
  setAdvancedSearchString,
  setAdvancedSearchBy,
  setCheckAllAdvancedSearchBy,
} from "../../../redux/DealerSearchFilterSlice";

import {
  setTotalElements,
  setTotalPages,
  setBrowseNavigation,
  setPageNumber,
} from "../../../redux/PaginationSlice";

import { setEditDealer, setViewDetail } from "../../../redux/EditDealerSlice";

export const DealersearchFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const globalSearchTerm = useSelector((state) => state.dealerSearchReducer.searchTerms);
  const selectedDealerStatus = useSelector((state) => state.dealerSearchReducer.selectedDealerStatus);
  const pageNumber = useSelector((state) => state.paginationReducer.pageNumber);
  const selectedStatus = useSelector((state) => state.dealerSearchReducer.selectedStatus);
  const selectedSearchCriteria = useSelector((state) => state.dealerSearchReducer.selectedSearchCriteria);
  const searchedDealer = useSelector((state) => state.dealerSearchReducer.searchedDealer);
  const advanceSortingOrder = useSelector((state) => state.dealerSearchReducer.advanceSortingOrder);
  const showAdvanceSearch = useSelector((state) => state.dealerSearchReducer.showAdvanceSearch);
  const showAdvanceSort = useSelector((state) => state.dealerSearchReducer.showAdvanceSort);
  let sortFlag = useSelector((state) => state.dealerSearchReducer.normalSortFlag);
  let sortValue = useSelector((state) => state.dealerSearchReducer.normalSortValue);

  const handleThirdRadioGroupOnChange = (value) => {
    dispatch(setSelectedDealerStatus(value));

    if (value === true) {
      dispatch(setComplete(false));
    } else {
      dispatch(setComplete(true));
    }

    dispatch(setComplete());
    dispatch(setTest(value));
    dispatch(setPageNumber(0));
  };

  const handleSecondRadioGroupOnChange = (value) => {
    dispatch(setSelectedStatus(value));
    dispatch(setPageNumber(0));
  };

  const handleFirstRadioGroupOnChange = (value) => {
    dispatch(setSelectedSearchCriteria(value));
    dispatch(setPageNumber(0));
  };

  const onChangeShowAdvanceSearch = (value) => {
    if (value === true) {
      setSearchTerm("");
      dispatch(setSearchTerms(""));
    } else {
      dispatch(setAdvancedSearchObject(null));
      dispatch(setSearchedDealer(null));

      dispatch(setAdvancedSearchString(""));
      dispatch(setAdvancedSearchBy(null));
      dispatch(setCheckAllAdvancedSearchBy(false));
    }

    dispatch(setShowAdvanceSearch(value));
  };

  const onChangeShowAdvanceSort = (value) => {
    if (value === true) {
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(false));
    } else {
      dispatch(setAdvanceSortingCriteria(null));
      dispatch(setAdvanceSortedValue(null));
    }

    dispatch(setShowAdvanceSort(value));
  };

  useEffect(() => {
    if (searchTerm === "" && globalSearchTerm != "") {
      setSearchTerm(globalSearchTerm);
    }
  }, []);

  const onClose = async () => {
    navigate(`/`);
  };

  const newButtonHandleChange = () => {
    dispatch(setEditDealer(undefined));
    dispatch(setViewDetail(undefined));
  };

  const globalSearchHandleChange = (event) => {
    dispatch(setSearchTerms(event.target.value));
    setSearchTerm(event.target.value);
    dispatch(setPageNumber(0));
  };

  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0">
            <Col md={8} sm={8} lg={7} xs={8} className="p-l-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center search-box">
                  <span className="p-r-20">
                    <ButtonComponent
                      route={"/add-dealer"}
                      className="btn btn-secondary btn-sm font-12 btn-small-width"
                      label={t("dealers.list.page.new.button")}
                      onClick={() => {
                        dispatch(setEditDealer(undefined));
                        dispatch(setViewDetail(undefined));
                      }}
                    />
                  </span>

                  <span className="p-l-20">
                    <label className="f-w-600 m-r-15">{t("dealers.list.page.search.button")}</label>
                    <InputField
                      type="text"
                      name="searchTerm"
                      value={searchTerm}
                      autoComplete="off"
                      aria-autocomplete="list"
                      placeholder={t("dealers.list.page.global.search")}
                      className="search-input"
                      onChange={(e) => {
                        globalSearchHandleChange(e);
                      }}
                      disabled={showAdvanceSearch || (showAdvanceSort && disabled)}
                      autocomplete="autocomplete_off_randString"
                    />
                  </span>
                </div>

                <div className="d-flex align-items-center">
                  <RadioGroup
                    name="searchCriteria"
                    selectedValue={selectedSearchCriteria}
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

                <div className="d-flex flex-column">
                  <RadioGroup
                    name="status"
                    selectedValue={selectedStatus}
                    onChange={handleSecondRadioGroupOnChange}
                  >
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
                  <RadioGroup
                    name="DealerStatus"
                    selectedValue={selectedDealerStatus}
                    onChange={handleThirdRadioGroupOnChange}
                  >
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Complete" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.complete")}</label>
                    </div>

                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="InComplete" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.incomplete")}</label>
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
                      onClick={() => {
                        onChangeShowAdvanceSearch(!showAdvanceSearch);
                      }}
                    />
                  </span>

                  <span className="m-t-5">
                    <ButtonComponent
                      route={""}
                      className="btn btn-secondary font-12 btn-sm btn-medium-with"
                      label={t("dealers.list.page.advanced.sort.button")}
                      onClick={() => {
                        onChangeShowAdvanceSort(!showAdvanceSort);
                      }}
                    />
                  </span>
                </div>

                <span className="m-l-10">
                  <ButtonComponent
                    route={"/"}
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
  );
};
