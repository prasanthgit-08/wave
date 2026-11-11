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
} from "../../../../redux/EmanifestChangeRequestSlice";
import { useEffect } from "react";
import DelayProcessingService from "../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { setNormalSortFlag, setNormalSortValue } from "../../../../redux/EmanifestChangeRequestSlice";

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
  const breakpoint = 1100;
  const isBelowBreakpoint = useWindowSizeForBreakpoint(breakpoint);

  const [companiesList, setCompaniesList] = useState([]);

  const selectedCompanyName = useSelector((state) => state.emanifestChangeRequest.selectedCompanyName);
  const showAdvancedSearch = useSelector((state) => state.emanifestChangeRequest.showAdvancedSearch);
  const showAdvancedSort = useSelector((state) => state.emanifestChangeRequest.showAdvancedSort);
  const globalSearchTerm = useSelector((state) => state.emanifestChangeRequest.globalSearchTerm);
  const selectedSearchCriteria = useSelector((state) => state.emanifestChangeRequest.selectedSearchCriteria);
  const unitLast5 = useSelector((state) => state.emanifestChangeRequest.unitLast5);
  const unitType = useSelector((state) => state.emanifestChangeRequest.unitType);
  const orderType = useSelector((state) => state.emanifestChangeRequest.orderType);
  const dateType = useSelector((state) => state.emanifestChangeRequest.dateType);
  const dateFrom = useSelector((state) => state.emanifestChangeRequest.dateFrom);
  const dateTo = useSelector((state) => state.emanifestChangeRequest.dateTo);
  const unitStatus = useSelector((state) => state.emanifestChangeRequest.unitStatus);
  const pickupBy = useSelector((state) => state.emanifestChangeRequest.pickupBy);
  const deliveryBy = useSelector((state) => state.emanifestChangeRequest.deliveryBy);
  const unitOrderStatus = useSelector((state) => state.emanifestChangeRequest.unitOrderStatus);
  const unitDelayType = useSelector((state) => state.emanifestChangeRequest.unitDelayType);
  const dispatchDelayType = useSelector((state) => state.emanifestChangeRequest.dispatchDelayType);
  const selectedDispatchStatus = useSelector((state) => state.emanifestChangeRequest.selectedDispatchStatus);
  const pageNumber = useSelector((state) => state.emanifestChangeRequest.pageNumber);

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
    if (showAdvancedSort) {
      dispatch(setAdvancedSortingOrder(null));
      dispatch(setAdvancedSortingCombination(null));
    }
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    dispatch(toggleAdvancedSort());
  };

  useEffect(() => {
    const fetchCompanyNames = () => {
      if (componentType === "DelayedUnitBrowse" || componentType === "NewDelayedUnitBrowse") {
        DelayProcessingService.getAllCompanyDetails()
          .then((response) => {
            const { data } = response;
            setCompaniesList(data);
            const defaultCompany = data?.find((element) => element.localCompany === true);
            dispatch(setSelectedCompanyName(defaultCompany?.name));
            localStorage.setItem("selectedCompany", defaultCompany?.name);
          })
          .catch((err) => {});
      }
    };

    fetchCompanyNames();
  }, []);

  useEffect(() => {
    if (isDateFromValid && isDateToValid) {
      dispatch(setPageNumber(0));
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
      <Row className="border border-dark border-2 p-t-10 p-b-10 ">
        <Col md={12}>
          <Row className="m-0 p-0">
            <Col md={10} sm={10} lg={10} xs={10} className="p-l-0">
              <div className="d-flex align-items-center justify-content-start">
                {/* Global Search Term */}
                <div className="d-flex align-items-center customSearchBox">
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
                </div>

                {/* SearchCriteria  */}
                <div className="d-flex align-items-center ms-5">
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
                <div className="d-flex align-items-center customSearchBox ms-5 ">
                  <span className="p-l-5 ">
                    <label className="f-w-600 m-r-15 m-l-0 customLabel">Last 5</label>
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

                {/* Unit Type */}
                <div className="d-flex flex-column ms-5 ">
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
                <div className="d-flex flex-column ms-5">
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

                <div className="d-flex flex-column mx-2 ms-5 ">
                  <Row className="m-1 me-5">
                    <Col className="p-0 d-flex justify-content-end align-items-center">
                      <label className="f-w-600 m-r-5 me-3 customLabel">Pickup</label>
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
                  <Row className="m-1 me-5 ">
                    <Col className="p-0 d-flex justify-content-end align-items-center">
                      <label className="f-w-600 m-r-5 customLabel me-2">Delivery</label>
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

                <div className="d-flex align-items-center ms--1 ">
                  <label className="f-w-600 customLabel m-r-10 m">Dispatch Date</label>
                  <div>
                    <Row className="m-2">
                      <Col xs={3} sm={3} className="p-0" style={{ width: "95px" }}>
                        <DateInputField
                          date={dateFrom}
                          setIsDateValid={setIsDateFromValid}
                          max={dateTo ? parseLocalDate(dateTo) : ""}
                          reduxSetDate={(value) => {
                            dispatch(setDateFrom(value));
                          }}
                          className={!isDateFromValid ? "borderRed" : ""}
                        />
                      </Col>
                    </Row>
                    <Row className="m-2">
                      <Col xs={3} sm={3} className="p-0" style={{ width: "95px" }}>
                        <DateInputField
                          date={dateTo}
                          min={dateFrom ? parseLocalDate(dateFrom) : ""}
                          reduxSetDate={(value) => dispatch(setDateTo(value))}
                          setIsDateValid={setIsDateToValid}
                          className={!isDateToValid ? "borderRed" : ""}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>

            <Col md={2} sm={2} lg={2} xs={2} className="p-l-0  ">
              <div className="d-flex justify-content-end advanced-search-box me-3">
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
                          ? "/delay-processing/delayed-unit-browse"
                          : "")
                    }
                    className="btn btn-secondary btn-sm font-12 customButtonSmallWidth close-button"
                    label={"Close"}
                    onClick={() => {
                      handleClose && handleClose();
                      dispatch(resetUnitSelectionFilters());
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
