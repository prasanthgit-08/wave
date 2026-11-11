import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Row, Col } from "react-bootstrap";
import { RadioGroup, Radio } from "react-radio-group";
import ButtonComponent from "../../../common/Button";
import InputField from "../../../common/InputField";
import { useSelector, useDispatch } from "react-redux";
import CustomerService from "../../../../services/CustomerService";
import {
  setSelectedSearchCriteria,
  setSelectedStatus,
  setSelectedCustomerStatus,
  setComplete,
  setSearchTerms,
  setSearchedCustomer,
  setCustomerData,
  setChangeColor,
  setShowAdvanceSearch,
  setShowAdvanceSort,
  setNormalSortValue,
  setNormalSortFlag,
  setAdvanceSortingOrder,
  setAdvanceSortedValue,
  setLoader,
  setAdvancedSearchObject,
} from "../../../../redux/CustomerSearchFilterSlice";
import {
  setTotalElements,
  setTotalPages,
  setBrowseNavigation,
  setPageNumber,
} from "../../../../redux/PaginationSlice";

import { setViewDetail, setEditCustomerData } from "../../../../redux/CustomerMaintenanceSlice";

export const CustomerSearchFilter = () => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const selectedCustomerStatus = useSelector(
    (state) => state.customerSearchFilterReducer.selectedCustomerStatus
  );
  const selectedStatus = useSelector((state) => state.customerSearchFilterReducer.selectedStatus);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerSearchFilterReducer.selectedSearchCriteria
  );
  const showAdvanceSearch = useSelector((state) => state.customerSearchFilterReducer.showAdvanceSearch);
  const showAdvanceSort = useSelector((state) => state.customerSearchFilterReducer.showAdvanceSort);
  const searchedCustomer = useSelector((state) => state.customerSearchFilterReducer.searchedCustomer);
  const pageNumber = useSelector((state) => state.paginationReducer.pageNumber);
  const advanceSortingOrder = useSelector((state) => state.customerSearchFilterReducer.advanceSortingOrder);
  let sortValue = useSelector((state) => state.customerSearchFilterReducer.normalSortValue);
  let sortFlag = useSelector((state) => state.customerSearchFilterReducer.normalSortFlag);
  const globalSearchTerm = useSelector((state) => state.customerSearchFilterReducer.searchTerms);

  const handleFirstRadioGroupOnChange = (value) => {
    dispatch(setSelectedSearchCriteria(value));
    dispatch(setPageNumber(0));
  };

  const handleSecondRadioGroupOnChange = (value) => {
    dispatch(setSelectedStatus(value));
    dispatch(setPageNumber(0));
  };

  const handleThirdRadioGroupOnChange = (value) => {
    dispatch(setSelectedCustomerStatus(value));

    if (value === true) {
      dispatch(setComplete(false));
    } else {
      dispatch(setComplete(true));
    }

    dispatch(setComplete());
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
      // for clearing value in UI
      dispatch(setAdvancedSearchObject(null));
      // for clearing payload for API call
      dispatch(setSearchedCustomer(null));
    }
    dispatch(setShowAdvanceSearch(value));
  };

  const onChangeShowAdvanceSort = (value) => {
    if (value === true) {
      // show advanced sort
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(false));
    } else {
      // hide advanced sort
      dispatch(setAdvanceSortingOrder(null));
      dispatch(setAdvanceSortedValue(null));
    }

    dispatch(setShowAdvanceSort(value));
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchAllCustomers();
    }, 100);

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

  const fetchAllCustomers = async () => {
    CustomerService.getAllCustomers(
      selectedStatus,
      pageNumber,
      searchedCustomer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerm,
      sortValue,
      sortFlag,
      selectedCustomerStatus
    )
      .then((response) => {
        const data = response?.data;
        dispatch(setLoader(false));
        dispatch(setCustomerData(data?.content));
        dispatch(setTotalElements(data?.totalElements));
        dispatch(setTotalPages(data?.totalPages));
        dispatch(setBrowseNavigation(data));
        dispatch(setChangeColor(true));
      })
      .catch((err) => {
        dispatch(setLoader(false));
      });
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
                      route={"/add-customer"}
                      className="btn btn-secondary btn-sm font-12 btn-small-width"
                      label={t("dealers.list.page.new.button")}
                      onClick={() => {
                        dispatch(setViewDetail(false));
                        dispatch(setEditCustomerData(null));
                      }}
                    />
                  </span>

                  <span className="p-l-20">
                    <label className="f-w-600 m-r-15">{t("dealers.list.page.search.button")}</label>
                    <InputField
                      type="text"
                      name="searchTerm"
                      value={searchTerm}
                      placeholder={t("dealers.list.page.global.search")}
                      className="search-input"
                      autoComplete="autocomplete_off_randString"
                      onChange={(e) => {
                        globalSearchHandleChange(e);
                      }}
                      disabled={showAdvanceSearch || (showAdvanceSort && disabled)}
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
                    selectedValue={selectedCustomerStatus}
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
