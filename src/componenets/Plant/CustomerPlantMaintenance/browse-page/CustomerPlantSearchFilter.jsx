import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { t } from "i18next";
import { useParams } from "react-router-dom";
import { RadioGroup, Radio } from "react-radio-group";
import ButtonComponent from "../../../common/Button";
import InputField from "../../../common/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  setTotalElements,
  setPageNumber,
  setTotalPages,
  setBrowseNavigation,
  setSearchTerms,
  setSearchedCustomerPlant,
  setShowAdvanceSearch,
  setSelectedSearchCriteria,
  setSelectedCustomerPlantStatus,
  setSelectedStatus,
  setComplete,
  setChangeColor,
  resetAdvanceSearchSortCustomerPlant,
  resetPlantSearchFilter,
} from "../../../../redux/CustomerPlantSearchFilterSlice";

import {
  setEditPlantData,
  setPlantData,
  setViewDetail,
  resetChanges,
} from "../../../../redux/CustomerPlantMaintenanceSlice";
import CustomerPlantMaintenanceService from "../../../../services/CustomerPlantMaintenanceService";
import {
  resetAdvanceSearchSort,
  resetSearchFilter,
} from "../../../../redux/UsePlantCustomerSearchFilterSlice";

export const CustomerPlantSearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const customerId = params.customerId;
  const showAdvanceSearch = useSelector((state) => state.customerPlantSearchFilterReducer.showAdvanceSearch);
  const globalSearchTerm = useSelector((state) => state.customerPlantSearchFilterReducer.searchTerms);

  const selectedStatus = useSelector((state) => state.customerPlantSearchFilterReducer.selectedStatus);

  const pageNumber = useSelector((state) => state.customerPlantSearchFilterReducer.pageNumber);

  const searchedCustomerPlant = useSelector(
    (state) => state.customerPlantSearchFilterReducer.searchedCustomerPlant
  );

  const selectedSearchCriteria = useSelector(
    (state) => state.customerPlantSearchFilterReducer.selectedSearchCriteria
  );

  const selectedCustomerPlantStatus = useSelector(
    (state) => state.customerPlantSearchFilterReducer.selectedCustomerPlantStatus
  );

  let plantSortFlag = useSelector((state) => state.customerPlantSearchFilterReducer.plantSortFlag);
  let plantSortValue = useSelector((state) => state.customerPlantSearchFilterReducer.plantSortValue);

  const handleFirstRadioGroupOnChange = (value) => {
    dispatch(setSelectedSearchCriteria(value));
    dispatch(setPageNumber(0));
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
  const handleThirdRadioGroupOnChange = (value) => {
    dispatch(setSelectedCustomerPlantStatus(value));

    if (value === true) {
      dispatch(setComplete(false));
    } else {
      dispatch(setComplete(true));
    }

    dispatch(setComplete());
    dispatch(setPageNumber(0));
  };

  const onChangeShowAdvanceSearch = (value) => {
    if (value === true) {
      setSearchTerm("");
      dispatch(setSearchTerms(""));
    } else {
      dispatch(setSearchedCustomerPlant(null));
    }
    dispatch(setShowAdvanceSearch(value));
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      // fetchPlant();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    selectedCustomerPlantStatus,
    selectedStatus,
    selectedSearchCriteria,
    searchedCustomerPlant,
    pageNumber,
    searchTerm,
    customerId,
  ]);
  useEffect(() => {
    if (searchTerm === "" && globalSearchTerm != "") {
      setSearchTerm(globalSearchTerm);
    }
  }, []);

  const fetchPlant = async () => {
    CustomerPlantMaintenanceService.getAllPlantsByCustomer(
      selectedCustomerPlantStatus,
      selectedStatus,
      selectedSearchCriteria,
      searchedCustomerPlant,
      pageNumber,
      searchTerm,
      customerId,
      null,
      plantSortValue,
      plantSortFlag
    ).then((response) => {
      const data = response.data;

      dispatch(setPlantData(data.content));
      dispatch(setTotalElements(data.totalElements));
      dispatch(setTotalPages(data.totalPages));
      dispatch(setBrowseNavigation(data));
      dispatch(setChangeColor(true));
    });
  };

  const onClose = () => {
    dispatch(resetSearchFilter());
    dispatch(resetPlantSearchFilter());
    dispatch(resetAdvanceSearchSortCustomerPlant());
    dispatch(resetAdvanceSearchSort());
  };
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
                      route={
                        "/add-customer-plant/" + params.customerId + "/" + params.pageNumber + "/new-record"
                      }
                      className="btn btn-secondary btn-sm font-12 customButtonSmallWidth"
                      label={t("new.button")}
                      onClick={() => {
                        dispatch(setEditPlantData(undefined));
                        dispatch(setViewDetail(undefined));
                        dispatch(resetChanges(""));
                      }}
                    />
                  </span>

                  <span className="p-l-20">
                    <label className="f-w-600 m-r-15 customLabelS">
                      {t("dealers.list.page.search.button")}
                    </label>
                    <InputField
                      type="text"
                      name="searchTerm"
                      value={searchTerm}
                      autoComplete="off"
                      aria-autocomplete="list"
                      placeholder={t("dealers.list.page.global.search")}

                      onChange={(e) => {
                        globalSearchHandleChange(e);
                      }}
                      disabled={showAdvanceSearch}
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
                    selectedValue={selectedCustomerPlantStatus}
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
                </div>

                <span className="m-l-10">
                  <ButtonComponent
                    route={"/customer-plant-browse-page"}
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
