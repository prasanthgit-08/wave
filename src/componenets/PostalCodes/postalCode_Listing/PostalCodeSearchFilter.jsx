import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup, Radio } from "react-radio-group";
import { Row, Col } from "react-bootstrap";
import ButtonComponent from "../../common/Button";
import { useSelector, useDispatch } from "react-redux";
import InputField from "../../common/InputField";
import { t } from "i18next";

import PostalCodeService from "../../../services/PostalCodeService";
import {
  resetChanges,
  setAdvanceSortedValue,
  setAdvanceSortingCriteria,
  setAdvanceSortingOrder,
  setChangeColor,
  setEditFormData,
  setListingData,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setPostalCodePK,
  setSearchCriteria,
  setSearchedPostalCode,
  setSearchTerms,
  setSelectedStatus,
  setShowAdvanceSearch,
  setShowAdvanceSort,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../redux/PostalCodeSlice";

export const PostalCodeSearchFilter = ({ setFirstField, setSecondField, setThirdField }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false);
  const searchTerms = useSelector((state) => state.postalCodeReducer.searchTerms);

  const selectedDealerStatus = useSelector((state) => state.dealerSearchReducer.selectedDealerStatus);

  const pageNumber = useSelector((state) => state.postalCodeReducer.pageNumber);

  const selectedStatus = useSelector((state) => state.postalCodeReducer.selectedStatus);

  const searchCriteria = useSelector((state) => state.postalCodeReducer.searchCriteria);

  const searchedPostalCode = useSelector((state) => state.postalCodeReducer.searchedPostalCode);

  const advanceSortingOrder = useSelector((state) => state.postalCodeReducer.advanceSortingOrder);

  const handleSecondRadioGroupOnChange = (value) => {
    dispatch(setSelectedStatus(value));
    dispatch(setPageNumber(0));
  };

  const handleFirstRadioGroupOnChange = (value) => {
    dispatch(setSearchCriteria(value));
    dispatch(setPageNumber(0));
  };

  const showAdvanceSearch = useSelector((state) => state.postalCodeReducer.showAdvanceSearch);

  const onChangeShowAdvanceSearch = (value) => {
    if (value === true) {
      dispatch(setSearchTerms(""));
    } else {
      dispatch(setSearchedPostalCode(null));
    }
    dispatch(setShowAdvanceSearch(value));
  };

  const showAdvanceSort = useSelector((state) => state.postalCodeReducer.showAdvanceSort);

  const handleClose = () => {
    navigate(`/`);
    dispatch(setChangeColor(false));
    dispatch(setNormalSortValue(null));
    dispatch(setNormalSortFlag(false));
    dispatch(setAdvanceSortingCriteria(null));
    dispatch(setAdvanceSortedValue(null));
    dispatch(setSearchTerms(""));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchedPostalCode(null));
    dispatch(setAdvanceSortedValue(null));
    dispatch(setShowAdvanceSort(false));
    dispatch(setShowAdvanceSearch(false));
    dispatch(setSelectedStatus("us"));
    dispatch(setPageNumber(0));
    dispatch(setPostalCodePK(""));
  };

  const onChangeShowAdvanceSort = (value) => {
    if (value === true) {
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(false));
    } else {
      dispatch(setAdvanceSortingCriteria(null));
      dispatch(setAdvanceSortedValue(null));
      setFirstField(null);
      setSecondField(null);
      setThirdField(null);
    }

    dispatch(setShowAdvanceSort(value));
  };

  useEffect(() => {
    if (showAdvanceSort === false) {
      setFirstField(null);
      setSecondField(null);
      setThirdField(null);
    }
  }, [showAdvanceSort]);

  const newButtonHandleChange = () => {
    dispatch(setViewDetail(undefined));
  };

  const globalSearchHandleChange = (event) => {
    dispatch(setSearchTerms(event.target.value));

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
                      route={"/postalcode-add"}
                      className="btn btn-secondary btn-sm font-12 btn-small-width"
                      label={t("dealers.list.page.new.button")}
                      onClick={() => {
                        dispatch(setEditFormData(undefined));
                        dispatch(resetChanges());
                        dispatch(setViewDetail(false));
                      }}
                    />
                  </span>
                  <span className="p-l-20">
                    <label className="f-w-600 m-r-15">{t("dealers.list.page.search.button")}</label>
                    <InputField
                      type="text"
                      name="searchTerm"
                      value={searchTerms}
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

                <div className=" d-flex align-items-left">
                  <RadioGroup
                    name="searchCriteria"
                    selectedValue={searchCriteria}
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
                    name="selectedStatus"
                    selectedValue={selectedStatus}
                    onChange={handleSecondRadioGroupOnChange}
                  >
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="all" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.all")}</label>
                    </div>

                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="us" />
                      <label className="f-w-600 m-l-5">US</label>
                    </div>

                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="canadian" />
                      <label className="f-w-600 m-l-5">Canadian</label>
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
                    onClick={handleClose}
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

export default PostalCodeSearchFilter;
