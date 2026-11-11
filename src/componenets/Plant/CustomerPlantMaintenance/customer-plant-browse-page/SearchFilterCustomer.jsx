import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Row, Col } from "react-bootstrap";
import { RadioGroup, Radio } from "react-radio-group";
import ButtonComponent from "../../../common/Button";
import InputField from "../../../common/InputField";
import { useSelector, useDispatch } from "react-redux";
import CustomerPlantMaintenanceService from "../../../../services/CustomerPlantMaintenanceService";
import { useNavigate } from "react-router-dom";
import {
  setSelectedSearchCriteria,
  setSelectedStatus,
  setSearchTerms,
  setSearchedCustomer,
  setChangeColor,
  setShowAdvanceSearch,
  setShowAdvanceSort,
  setNormalSortValue,
  setNormalSortFlag,
  setAdvanceSortingOrder,
  setAdvanceSortedValue,
  setTotalElements,
  setTotalPages,
  setBrowseNavigation,
  setPageNumber,
  setLoader,
  resetAdvanceSearchSort,
  resetSearchFilter,
} from "../../../../redux/UsePlantCustomerSearchFilterSlice";

import { setCustomerPlantData, setViewDetail } from "../../../../redux/CustomerPlantMaintenanceSlice";
import { Navigate } from "react-router-dom";
import {
  resetAdvanceSearchSortCustomerPlant,
  resetPlantSearchFilter,
} from "../../../../redux/CustomerPlantSearchFilterSlice";

const SearchFilterCustomer = () => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const customerPlantData = useSelector((state) => state.customerPlantmaintanceReducer.customerPlantData);

  const selectedCustomerStatus = useSelector(
    (state) => state.usePlantCustomerSearchFilterReducer.selectedCustomerStatus
  );

  const selectedStatus = useSelector((state) => state.usePlantCustomerSearchFilterReducer.selectedStatus);

  const selectedSearchCriteria = useSelector(
    (state) => state.usePlantCustomerSearchFilterReducer.selectedSearchCriteria
  );

  const showAdvanceSearch = useSelector(
    (state) => state.usePlantCustomerSearchFilterReducer.showAdvanceSearch
  );

  const showAdvanceSort = useSelector((state) => state.usePlantCustomerSearchFilterReducer.showAdvanceSort);

  const searchedCustomer = useSelector((state) => state.usePlantCustomerSearchFilterReducer.searchedCustomer);

  const pageNumber = useSelector((state) => state.usePlantCustomerSearchFilterReducer.pageNumber);

  const advanceSortingOrder = useSelector(
    (state) => state.usePlantCustomerSearchFilterReducer.advanceSortingOrder
  );

  let sortValue = useSelector((state) => state.usePlantCustomerSearchFilterReducer.normalSortValue);

  let sortFlag = useSelector((state) => state.usePlantCustomerSearchFilterReducer.normalSortFlag);

  const globalSearchTerm = useSelector((state) => state.usePlantCustomerSearchFilterReducer.searchTerms);

  const handleFirstRadioGroupOnChange = (value) => {
    dispatch(setSelectedSearchCriteria(value));
    dispatch(setPageNumber(0));
  };

  const onChangeClose = () => {
    dispatch(resetSearchFilter());
    dispatch(resetPlantSearchFilter());
    dispatch(resetAdvanceSearchSortCustomerPlant());
    dispatch(resetAdvanceSearchSort());
  };

  const handleSecondRadioGroupOnChange = (value) => {
    dispatch(setSelectedStatus(value));
    dispatch(setPageNumber(0));
  };

  const globalSearchHandleChange = (event) => {
    dispatch(setSearchTerms(event.target.value));
    setSearchTerm(event.target.value);
    dispatch(setPageNumber(0));
  };

  const onChangeShowAdvanceSearch = (value) => {
    if (value === true) {
      setSearchTerm("");
      dispatch(setSearchTerms(""));
    } else {
      dispatch(setSearchedCustomer(null));
    }
    dispatch(setShowAdvanceSearch(value));
  };

  const onChangeShowAdvanceSort = (value) => {
    if (value === true) {
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(false));
    } else {
      dispatch(setAdvanceSortingOrder(null));
      dispatch(setAdvanceSortedValue(null));
    }

    dispatch(setShowAdvanceSort(value));
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchCustomerPlant();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    selectedCustomerStatus,
    selectedStatus,
    selectedSearchCriteria,
    searchedCustomer,
    advanceSortingOrder,
    pageNumber,
    showAdvanceSort,
    searchTerm,
  ]);

  useEffect(() => {
    if (searchTerm === "" && globalSearchTerm != "") {
      setSearchTerm(globalSearchTerm);
    }
  }, []);

  const fetchCustomerPlant = async () => {
    dispatch(setLoader(true));
    CustomerPlantMaintenanceService.getAlluseplantsCustomers(
      selectedStatus,
      pageNumber,
      searchedCustomer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerm,
      sortValue,
      sortFlag,
      selectedCustomerStatus,
      setViewDetail
    )
      .then((response) => {
        const data = response.data;
        dispatch(setLoader(false));
        dispatch(setCustomerPlantData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setBrowseNavigation(data));
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };
  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0">
            <Col md={8} sm={8} lg={8} xs={8} className="p-l-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center customSearchBox">
                  <span className="p-l-20">
                    <label className="f-w-600 m-r-15 customLabel">
                      {t("dealers.list.page.search.button")}
                    </label>
                    <InputField
                      type="text"
                      name="searchTerm"
                      value={searchTerm}
                      placeholder={t("dealers.list.page.global.search")}
                      autoComplete="autocomplete_off_randString"
                      onChange={(e) => {
                        globalSearchHandleChange(e);
                      }}
                      disabled={showAdvanceSearch || (showAdvanceSort && disabled)}
                    />
                  </span>
                </div>

                <Col md={1} sm={1} xs={1}>
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
                </Col>

                <Col md={5} sm={5} xs={5}>
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
                </Col>
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
                    onClick={onChangeClose}
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

export default SearchFilterCustomer;
