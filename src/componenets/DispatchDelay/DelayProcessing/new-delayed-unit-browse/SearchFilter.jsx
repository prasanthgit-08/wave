/* eslint-disable react-hooks/exhaustive-deps */
import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import ButtonComponent from "../../../common/Button";
import InputField from "../../../common/InputField";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import DateInputField from "../../../common/DateInputField";
import useWindowSizeForBreakpoint from "../../../../hooks/useWindowSizeForBreakpoint";
import {
  clearAdvancedSearch,
  resetUnitSelectionFilters,
  setAdvancedSortingCombination,
  setAdvancedSortingOrder,
  setCompanyPK,
  setDateFrom,
  setDateTo,
  setDateType,
  setDelayedUnitType,
  setDeliveryBy,
  setDispatchDelayType,
  setGlobalSearchTerm,
  setOrderType,
  setPageNumber,
  setPickupBy,
  setSelectedCompanyName,
  setSelectedDispatchStatus,
  setSelectedSearchCriteria,
  setUnitDelayType,
  setUnitLast5,
  setUnitOrderStatus,
  setUnitStatus,
  setUnitType,
  toggleAdvancedSearch,
  toggleAdvancedSort,
} from "../../../../redux/DispatchDelay/DelayProcessing/NewDelayedBrowseSlice";
import { useEffect } from "react";
import DelayProcessingService from "../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { CompanyName } from "../../../../services/constants/applicationConstants";
import { setIsDelayLocalCompany } from "../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import {
  setBrowsePageNumber,
  setBrowseTotalElements,
  setBrowseTotalPages,
} from "../../../../redux/UnitStatus/UnitStatusSlice";

const SearchFilter = ({
  // Pass componentType as either 'Maintenance' or 'Lookup'
  // DelayedUnitBrowse, NewDelayedUnitBrowse
  componentType,
  onHide,
  handleClose,
  newButtonRoute,
  closeButtonRoute,
  handleNewOnClick,
}) => {
  const breakpoint = 1550;
  const isBelowBreakpoint = useWindowSizeForBreakpoint(breakpoint);

  const [companiesList, setCompaniesList] = useState([]);

  const selectedCompanyName = useSelector((state) => state.newDelayedBrowseSlice.selectedCompanyName);
  const showAdvancedSearch = useSelector((state) => state.newDelayedBrowseSlice.showAdvancedSearch);
  const showAdvancedSort = useSelector((state) => state.newDelayedBrowseSlice.showAdvancedSort);
  const globalSearchTerm = useSelector((state) => state.newDelayedBrowseSlice.globalSearchTerm);
  const selectedSearchCriteria = useSelector((state) => state.newDelayedBrowseSlice.selectedSearchCriteria);
  const unitLast5 = useSelector((state) => state.newDelayedBrowseSlice.unitLast5);
  const unitType = useSelector((state) => state.newDelayedBrowseSlice.unitType);
  const orderType = useSelector((state) => state.newDelayedBrowseSlice.orderType);
  const dateType = useSelector((state) => state.newDelayedBrowseSlice.dateType);
  const dateFrom = useSelector((state) => state.newDelayedBrowseSlice.dateFrom);
  const dateTo = useSelector((state) => state.newDelayedBrowseSlice.dateTo);
  const unitStatus = useSelector((state) => state.newDelayedBrowseSlice.unitStatus);
  const pickupBy = useSelector((state) => state.newDelayedBrowseSlice.pickupBy);
  const deliveryBy = useSelector((state) => state.newDelayedBrowseSlice.deliveryBy);
  const unitOrderStatus = useSelector((state) => state.newDelayedBrowseSlice.unitOrderStatus);
  const unitDelayType = useSelector((state) => state.newDelayedBrowseSlice.unitDelayType);
  const dispatchDelayType = useSelector((state) => state.newDelayedBrowseSlice.dispatchDelayType);
  const selectedDispatchStatus = useSelector((state) => state.newDelayedBrowseSlice.selectedDispatchStatus);

  const [isDateFromValid, setIsDateFromValid] = useState(true);
  const [isDateToValid, setIsDateToValid] = useState(true);

  const searchCriteriaOptions = ["Beginning", "Contains"];

  const dispatch = useDispatch();

  const handleAdvancedSearchOnClick = () => {
    if (!showAdvancedSearch) {
      // onClick when Advanced Search is hidden
      dispatch(setGlobalSearchTerm(""));
      dispatch(setUnitLast5(""));
    } else {
      dispatch(clearAdvancedSearch());
    }

    dispatch(toggleAdvancedSearch());
  };

  const handleAdvancedSortOnClick = () => {
    if (!showAdvancedSort) {
    } else {
      // onClick when Advanced Sort is shown
      dispatch(setAdvancedSortingOrder(null));
      dispatch(setAdvancedSortingCombination(null));
    }

    dispatch(toggleAdvancedSort());
  };

  //used for delay program
  useEffect(() => {
    const fetchCompanyNames = () => {
      if (componentType === "DelayedUnitBrowse" || componentType === "NewDelayedUnitBrowse") {
        DelayProcessingService.getAllCompanyData()
          .then((response) => {
            const { data } = response;
            setCompaniesList(data);
            const defaultCompany = data?.find((element) => element.LocalCompany === true);
            if (!selectedCompanyName) {
              dispatch(setSelectedCompanyName(defaultCompany?.Name));
              dispatch(setCompanyPK(defaultCompany?.CompanyPK));
              localStorage.setItem("selectedCompany", defaultCompany?.Name);
              localStorage.setItem("allDriversPayTaxable", defaultCompany?.AllDriversPayTaxable);
            }
          })
          .catch((err) => {});
      }
    };

    fetchCompanyNames();
  }, []);

  useEffect(() => {
    if (dateFrom === "" || dateTo === "") {
      if (componentType !== "DelayedUnitBrowse" && componentType !== "NewDelayedUnitBrowse") {
        dispatch(setPageNumber(0));
      }
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    if (componentType === "DelayedUnitBrowse") {
      if (!dispatchDelayType) {
        dispatch(setDispatchDelayType("All"));
      }
    }
  }, []);

  return (
    <div className={`unitSelectionSearchFilter ${isBelowBreakpoint && "zoomOut"}`}>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0">
            <Col md={10} sm={10} lg={10} xs={10} className="p-l-0">
              <div className="d-flex align-items-center justify-content-between">
                {/* Global Search Term */}
                <div className="d-flex align-items-center customSearchBox">
                  {componentType === "DelayedUnitBrowse" && (
                    <div className="d-flex flex-column">
                      <span className="p-r-20 pt-0 mb-2">
                        <ButtonComponent
                          route={"/delay-processing/new-delayed-unit-browse"}
                          className="btn btn-secondary btn-sm font-12 customButtonSmallWidth"
                          label={t("new.button")}
                          onClick={handleNewOnClick}
                        />
                      </span>
                      <span className="p-r-20 hide-elements">
                        <ButtonComponent
                          className="btn btn-secondary btn-sm font-12 customButtonSmallWidth"
                          label={t("new.button")}
                        />
                      </span>
                    </div>
                  )}

                  {/* Default Case */}
                  {componentType !== "DelayedUnitBrowse" && componentType !== "NewDelayedUnitBrowse" && (
                    <span className="p-l-10">
                      <label className="f-w-600 m-r-15 customLabel">{t("search.label")}</label>
                      <InputField
                        type="text"
                        name="globalSearchTerm"
                        value={globalSearchTerm}
                        autoComplete="off"
                        aria-autocomplete="list"
                        placeholder={t("global.search")}
                        onChange={(e) => {
                          dispatch(setGlobalSearchTerm(e.target.value));
                          dispatch(setPageNumber(0));
                        }}
                        disabled={showAdvancedSearch || false}
                        autocomplete="autocomplete_off_randString"
                      />
                    </span>
                  )}

                  {(componentType === "DelayedUnitBrowse" || componentType === "NewDelayedUnitBrowse") && (
                    <div className="d-flex align-items-center flex-column ps-2" style={{ width: "300px" }}>
                      <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 w-100">
                        <Col xs={3} className="p-0">
                          <Form.Label className="customColFormLabel">Search</Form.Label>
                        </Col>

                        <Col xs={9} className="p-0">
                          <input
                            name="globalSearchTerm"
                            id="globalSearchTerm"
                            placeholder={t("global.search")}
                            type="search"
                            className={`customFormControl`}
                            value={globalSearchTerm}
                            onChange={(e) => {
                              dispatch(setGlobalSearchTerm(e.target.value));
                              dispatch(setPageNumber(0));
                            }}
                            disabled={showAdvancedSearch || false}
                            autoComplete="off"
                            aria-autocomplete="new-password"
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="form-group align-items-center row m-l-0 m-r-0 w-100">
                        <Col xs={3} className="p-0">
                          <Form.Label className="customColFormLabel">Company</Form.Label>
                        </Col>

                        <Col xs={9} className="p-0">
                          <Form.Select
                            name="sisterCompany"
                            id="sisterCompany"
                            value={selectedCompanyName}
                            onChange={(e) => {
                              dispatch(setSelectedCompanyName(e.target.value));
                              dispatch(setPageNumber(0));
                              localStorage.setItem("selectedCompany", e.target.value);
                              const selectedCompany = companiesList?.find(
                                (company) => company.Name === e.target.value
                              );
                              dispatch(setIsDelayLocalCompany(selectedCompany?.LocalCompany));
                              if (selectedCompany) {
                                dispatch(setCompanyPK(selectedCompany?.CompanyPK));
                              }
                            }}
                            className={`customFormControl col`}
                          >
                            {companiesList?.map((company) => (
                              <option value={company?.Name}>{company?.Name}</option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Form.Group>
                    </div>
                  )}
                </div>

                {/* SearchCriteria  */}
                <div className="d-flex align-items-center">
                  <CustomRadioGroup
                    name="searchCriteria"
                    selectedOption={selectedSearchCriteria}
                    options={searchCriteriaOptions}
                    onChange={(option) => {
                      dispatch(setSelectedSearchCriteria(option));
                      dispatch(setPageNumber(0));
                    }}
                  />
                </div>
                {/* Last 5  */}
                <div className="d-flex align-items-center customSearchBox">
                  <span className="p-l-5">
                    <label className="f-w-600 m-r-15 customLabel">Last 5</label>
                    <InputField
                      type="text"
                      name="unitLast5"
                      width={"55px"}
                      maxLength={5}
                      value={unitLast5}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        dispatch(setUnitLast5(e.target.value));
                        dispatch(setPageNumber(0));
                      }}
                      disabled={showAdvancedSearch || false}
                      autocomplete="autocomplete_off_randString"
                    />
                  </span>
                </div>

                {componentType === "DelayedUnitBrowse" && (
                  <>
                    <div className={`d-flex flex-column`}>
                      <CustomRadioGroup
                        name="unitDelayType"
                        selectedOption={unitDelayType}
                        options={["All", "Active", "Closed"]}
                        onChange={(option) => {
                          dispatch(setUnitDelayType(option));
                          dispatch(setPageNumber(0));
                        }}
                      />
                    </div>

                    <div className={`d-flex flex-column`}>
                      <CustomRadioGroup
                        name="dispatchDelayType"
                        selectedOption={dispatchDelayType}
                        options={["All", "Delay", "Breakdown", "Damage"]}
                        onChange={(option) => {
                          dispatch(setDispatchDelayType(option));
                          dispatch(setPageNumber(0));
                        }}
                      />
                    </div>
                  </>
                )}

                {/* Unit Type */}
                <div className="d-flex flex-column">
                  <CustomRadioGroup
                    name="unitType"
                    selectedOption={unitType}
                    options={["Both", "Towable", "Motorized"]}
                    onChange={(option) => {
                      dispatch(setUnitType(option));
                      dispatch(setPageNumber(0));
                    }}
                  />
                </div>

                {/* Order Type */}
                <div className="d-flex flex-column">
                  <CustomRadioGroup
                    name="orderType"
                    selectedOption={orderType}
                    options={["Both", "Outbound", "Reload"]}
                    onChange={(option) => {
                      dispatch(setOrderType(option));
                      dispatch(setPageNumber(0));
                    }}
                  />
                </div>

                {/* Date Type // Default Case*/}
                {componentType !== "DelayedUnitBrowse" && componentType !== "EditMasterExpress" && (
                  <div className="d-flex flex-column">
                    <CustomRadioGroup
                      name="dateType"
                      selectedOption={dateType}
                      options={["Entry", "Order", "Shuttle", "Dispatch", "Invoice"]}
                      onChange={(option) => {
                        dispatch(setDateType(option));
                        dispatch(setPageNumber(0));
                      }}
                    />
                  </div>
                )}

                {componentType === "EditMasterExpress" && (
                  <div className="d-flex flex-column">
                    <CustomRadioGroup
                      name="dateType"
                      selectedOption={dateType}
                      options={["Entry", "Order", "Shuttle", "Dispatch"]}
                      onChange={(option) => {
                        dispatch(setDateType(option));
                        dispatch(setPageNumber(0));
                      }}
                    />
                  </div>
                )}

                <div className="d-flex flex-column" style={{ minWidth: "140px" }}>
                  <Row className="m-1">
                    <div className="p-0 d-flex justify-content-end mt-1 col-3">
                      <label className="f-w-600 m-r-5 customLabel">From</label>
                    </div>
                    <Col xs={3} sm={3} className="p-0" style={{ width: "95px" }}>
                      <DateInputField
                        date={dateFrom}
                        setIsDateValid={setIsDateFromValid}
                        max={dateTo ? parseLocalDate(dateTo) : ""}
                        reduxSetDate={(value) => {
                          dispatch(setDateFrom(value));
                          dispatch(setPageNumber(0));
                        }}
                        className={!isDateFromValid ? "borderRed" : ""}
                      />
                    </Col>
                  </Row>
                  <Row className="m-1">
                    <div className="p-0 d-flex justify-content-end mt-1 col-3">
                      <label className="f-w-600 m-r-5 customLabel text-left">To</label>
                    </div>

                    <Col xs={3} sm={3} className="p-0" style={{ width: "95px" }}>
                      <DateInputField
                        date={dateTo}
                        min={dateFrom ? parseLocalDate(dateFrom) : ""}
                        reduxSetDate={(value) => {
                          dispatch(setDateTo(value));
                          dispatch(setPageNumber(0));
                        }}
                        setIsDateValid={setIsDateToValid}
                        className={!isDateToValid ? "borderRed" : ""}
                      />
                    </Col>
                  </Row>
                </div>

                {/* Default Case */}
                {componentType !== "DelayedUnitBrowse" &&
                  componentType !== "NewDelayedUnitBrowse" &&
                  componentType !== "EditMasterExpress" && (
                    <div className="d-flex flex-column">
                      <CustomRadioGroup
                        name="unitStatus"
                        selectedOption={unitStatus}
                        options={["All", "Unreleased", "Active", "History", "Deleted"]}
                        onChange={(option) => {
                          dispatch(setUnitStatus(option));
                          dispatch(setPageNumber(0));
                        }}
                      />
                    </div>
                  )}

                {componentType === "NewDelayedUnitBrowse" && (
                  <div className="d-flex flex-column">
                    <CustomRadioGroup
                      name="unitStatus"
                      selectedOption={unitStatus}
                      options={["All", "Unreleased", "Active"]}
                      onChange={(option) => {
                        dispatch(setUnitStatus(option));
                        dispatch(setPageNumber(0));
                      }}
                    />
                  </div>
                )}

                <div className="d-flex flex-column mx-2">
                  <Row className="m-1">
                    <Col className="p-0 d-flex justify-content-end align-items-center">
                      <label className="f-w-600 m-r-5 customLabel">Pickup</label>
                    </Col>

                    <Col className="p-0">
                      <CustomRadioGroup
                        name="pickupBy"
                        selectedOption={pickupBy}
                        horizontal
                        horizontalAlignmentClassName={"mx-2"}
                        options={["Name", "City, ST"]}
                        onChange={(option) => {
                          dispatch(setPickupBy(option));
                          dispatch(setPageNumber(0));
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="m-1">
                    <Col className="p-0 d-flex justify-content-end align-items-center">
                      <label className="f-w-600 m-r-5 customLabel">Delivery</label>
                    </Col>

                    <Col className="p-0">
                      <CustomRadioGroup
                        name="deliveryBy"
                        selectedOption={deliveryBy}
                        horizontal
                        horizontalAlignmentClassName={"mx-2"}
                        options={["Name", "City, ST"]}
                        onChange={(option) => {
                          dispatch(setDeliveryBy(option));
                          dispatch(setPageNumber(0));
                        }}
                      />
                    </Col>
                  </Row>
                </div>

                {/* Default Case */}
                {componentType !== "DelayedUnitBrowse" && (
                  <div className="d-flex flex-column">
                    <CustomRadioGroup
                      name="unitOrderStatus"
                      selectedOption={unitOrderStatus}
                      options={["All", "Hold", "Storage", "DPU"]}
                      onChange={(option) => {
                        dispatch(setUnitOrderStatus(option));
                        dispatch(setPageNumber(0));
                      }}
                    />
                  </div>
                )}

                {/* Default Case */}
                {componentType !== "DelayedUnitBrowse" && componentType !== "NewDelayedUnitBrowse" && (
                  <div className="d-flex flex-column">
                    <CustomRadioGroup
                      name="unitDelayType"
                      selectedOption={unitDelayType}
                      options={["All", "Shuttle Delay", "Activation Delay", "Dispatch Delay"]}
                      onChange={(option) => {
                        if (option === "Dispatch Delay") {
                          dispatch(setDispatchDelayType("All"));
                        } else {
                          dispatch(setDispatchDelayType(""));
                        }
                        dispatch(setUnitDelayType(option));
                        dispatch(setPageNumber(0));
                      }}
                    />
                  </div>
                )}

                {/* Default Case */}
                {componentType !== "DelayedUnitBrowse" && componentType !== "NewDelayedUnitBrowse" && (
                  <div
                    className={`${unitDelayType !== "Dispatch Delay" ? "hide-elements" : ""} d-flex flex-column`}
                  >
                    <CustomRadioGroup
                      name="dispatchDelayType"
                      selectedOption={dispatchDelayType}
                      options={["All", "Delay", "Breakdown", "Damage"]}
                      onChange={(option) => {
                        dispatch(setDispatchDelayType(option));
                        dispatch(setPageNumber(0));
                      }}
                    />
                  </div>
                )}

                {(componentType === "DelayedUnitBrowse" || componentType === "NewDelayedUnitBrowse") && (
                  <div className="d-flex flex-column">
                    <CustomRadioGroup
                      name="selectedDispatchStatus"
                      selectedOption={selectedDispatchStatus}
                      options={["Both", "Dispatched", "In Yard"]}
                      onChange={(option) => {
                        dispatch(setSelectedDispatchStatus(option));
                        dispatch(setPageNumber(0));
                      }}
                    />
                  </div>
                )}
              </div>
            </Col>

            <Col md={2} sm={2} lg={2} xs={2} className="p-l-0">
              <div className="d-flex justify-content-end advanced-search-box">
                <div className="d-flex flex-column">
                  <span className="m-b-5">
                    <ButtonComponent
                      route={""}
                      className="btn btn-secondary font-12 btn-sm btn-medium-width"
                      label={t("advanced.search.button")}
                      onClick={() => {
                        handleAdvancedSearchOnClick();
                      }}
                    />
                  </span>

                  <span className="m-t-5">
                    <ButtonComponent
                      route={""}
                      className="btn btn-secondary font-12 btn-sm btn-medium-width"
                      label={t("advanced.sort.button")}
                      onClick={() => {
                        handleAdvancedSortOnClick();
                      }}
                    />
                  </span>
                </div>

                <span className="m-l-10">
                  <ButtonComponent
                    route={
                      closeButtonRoute ||
                      (componentType === "Maintenance" || componentType === "DelayedUnitBrowse"
                        ? "/"
                        : componentType === "NewDelayedUnitBrowse"
                          ? "/"
                          : "")
                    }
                    className="btn btn-secondary btn-sm font-12 customButtonSmallWidth close-button"
                    label={"Close"}
                    onClick={() => {
                      handleClose && handleClose();
                      dispatch(resetUnitSelectionFilters());
                      dispatch(setBrowsePageNumber(0));
                      dispatch(setBrowseTotalElements(0));
                      dispatch(setBrowseTotalPages(0));
                    }}
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

export default SearchFilter;
