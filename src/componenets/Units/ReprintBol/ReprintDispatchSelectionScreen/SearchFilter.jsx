import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { t } from "i18next";
import ButtonComponent from "../../../common/Button";
import InputField from "../../../common/InputField";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import DateInputField from "../../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import {
  setDispatchSearchTerm,
  setAdvancedSearchObject,
  setAdvancedSearchPayload,
  setShowAdvancedSearch,
  setNormalSortValue,
  setNormalSortFlag,
  setAdvancedSortingCriteria,
  setAdvancedSortedValue,
  setShowAdvancedSort,
  setAdvancedSortingOrder,
  setAdvancedSortingCombination,
  setDispatchPageNumber,
  setDispatchSearchCriteria,
  setUnitLast5,
  setUnitType,
  setOrderType,
  setDateFrom,
  setDateTo,
  setUnitStatus,
  setPickupBy,
  setDeliveryBy,
  resetDispatchSelectionFilters,
  resetOutputconfirmationScreen,
  setDispatchId,
} from "../../../../redux/ReprintBolSlice";
import { Navigate, useNavigate } from "react-router-dom";

const SearchFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showAdvancedSearch = useSelector((state) => state.reprintBolReducer.showAdvancedSearch);
  const showAdvancedSort = useSelector((state) => state.reprintBolReducer.showAdvancedSort);
  const dispatchSearchTerm = useSelector((state) => state.reprintBolReducer.dispatchSearchTerm);
  const dispatchSearchCriteria = useSelector((state) => state.reprintBolReducer.dispatchSearchCriteria);
  const unitLast5 = useSelector((state) => state.reprintBolReducer.unitLast5);
  const unitType = useSelector((state) => state.reprintBolReducer.unitType);
  const orderType = useSelector((state) => state.reprintBolReducer.orderType);
  const dateFrom = useSelector((state) => state.reprintBolReducer.dateFrom);
  const dateTo = useSelector((state) => state.reprintBolReducer.dateTo);
  const unitStatus = useSelector((state) => state.reprintBolReducer.unitStatus);
  const pickupBy = useSelector((state) => state.reprintBolReducer.pickupBy);
  const deliveryBy = useSelector((state) => state.reprintBolReducer.deliveryBy);

  const [isDateFromValid, setIsDateFromValid] = useState(true);
  const [isDateToValid, setIsDateToValid] = useState(true);
  const nextEnabled = useSelector((state) => state.reprintBolReducer.nextEnabled);
  const driverId = useSelector((state) => state.reprintBolReducer.driverId);

  const rePrintBOL = useSelector((state) => state.reprintBolReducer.rePrintBOL);

  const searchCriteriaOptions = ["Beginning", "Contains"];

  const handleAdvancedSearchOnClick = () => {
    if (!showAdvancedSearch) {
      dispatch(setDispatchSearchTerm(""));
    } else {
      dispatch(setAdvancedSearchObject(null));
      dispatch(setAdvancedSearchPayload(null));
    }
    dispatch(setShowAdvancedSearch(!showAdvancedSearch));
  };

  const handleAdvancedSortOnClick = () => {
    if (!showAdvancedSort) {
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(false));
    } else {
      dispatch(setAdvancedSortingOrder(null));
      dispatch(setAdvancedSortingCombination(null));
    }
    dispatch(setShowAdvancedSort(!showAdvancedSort));
  };
  useEffect(() => {
    if (!rePrintBOL) {
      navigate("/reprint-selection-screen");
    }
  }, [rePrintBOL]);

  return (
    <div className={``}>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col xs={12}>
          <Row className="m-0 p-0">
            <Col md={10} sm={10} lg={10} xs={10} className="p-l-0">
              <div className="d-flex align-items-center justify-content-between">
                {/* Global Search Term */}
                <div className="d-flex align-items-center customSearchBox">
                  <span className="p-l-10">
                    <label className="f-w-600 m-r-15 customLabel">{t("search.label")}</label>
                    <InputField
                      type="search"
                      name="globalSearchTerm"
                      value={dispatchSearchTerm}
                      autoComplete="off"
                      aria-autocomplete="list"
                      placeholder={t("global.search")}
                      onChange={(e) => {
                        dispatch(setDispatchSearchTerm(e.target.value));
                        dispatch(setDispatchPageNumber(0));
                      }}
                      disabled={showAdvancedSearch || false}
                      autocomplete="autocomplete_off_randString"
                    />
                  </span>
                </div>

                {/* SearchCriteria  */}
                <div className="d-flex align-items-center">
                  <CustomRadioGroup
                    name="searchCriteria"
                    selectedOption={dispatchSearchCriteria}
                    options={searchCriteriaOptions}
                    onChange={(option) => {
                      dispatch(setDispatchSearchCriteria(option));
                      dispatch(setDispatchPageNumber(0));
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
                        dispatch(setDispatchPageNumber(0));
                      }}
                      autocomplete="autocomplete_off_randString"
                    />
                  </span>
                </div>

                {/* Unit Type */}
                <div className="d-flex flex-column">
                  <CustomRadioGroup
                    name="unitType"
                    selectedOption={unitType}
                    options={["Both", "Towable", "Motorized"]}
                    onChange={(option) => {
                      dispatch(setUnitType(option));
                      dispatch(setDispatchPageNumber(0));
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
                      dispatch(setDispatchPageNumber(0));
                    }}
                  />
                </div>

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
                          dispatch(setDispatchPageNumber(0));
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
                          dispatch(setDispatchPageNumber(0));
                        }}
                      />
                    </Col>
                  </Row>
                </div>

                <div className="d-flex flex-row" style={{ minWidth: "140px" }}>
                  {/* Left column: single label, centered vertically */}
                  <div
                    className="d-flex align-items-center justify-content-end col-3 me-2"
                    style={{ width: "80px" }}
                  >
                    <label className="f-w-600 m-r-5 customLabel">Dispatch Date</label>
                  </div>

                  {/* Right column: From + To stacked vertically */}
                  <div className="d-flex flex-column col-9">
                    <Row className="m-1">
                      <Col xs={3} sm={3} className="p-0" style={{ width: "95px" }}>
                        <DateInputField
                          date={dateFrom}
                          setIsDateValid={setIsDateFromValid}
                          max={dateTo ? parseLocalDate(dateTo) : ""}
                          reduxSetDate={(value) => {
                            dispatch(setDateFrom(value));
                            dispatch(setDispatchPageNumber(0));
                          }}
                          className={!isDateFromValid ? "borderRed" : ""}
                        />
                      </Col>
                    </Row>

                    <Row className="m-1">
                      <Col xs={3} sm={3} className="p-0" style={{ width: "95px" }}>
                        <DateInputField
                          date={dateTo}
                          min={dateFrom ? parseLocalDate(dateFrom) : ""}
                          reduxSetDate={(value) => {
                            dispatch(setDateTo(value));
                            dispatch(setDispatchPageNumber(0));
                          }}
                          setIsDateValid={setIsDateToValid}
                          className={!isDateToValid ? "borderRed" : ""}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="d-flex flex-column">
                  <CustomRadioGroup
                    name="unitOrderStatus"
                    selectedOption={unitStatus}
                    options={["All", "Active", "History", "Undispatched"]}
                    onChange={(option) => {
                      dispatch(setUnitStatus(option));
                      dispatch(setDispatchPageNumber(0));
                    }}
                  />
                </div>
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

                <div className="d-flex flex-column">
                  <span className="m-b-5">
                    <ButtonComponent
                      route={"/"}
                      className="btn btn-secondary btn-sm font-12 customButtonSmallWidth close-button"
                      label={"Close"}
                      onClick={() => {
                        dispatch(resetDispatchSelectionFilters());
                        dispatch(resetOutputconfirmationScreen());
                        dispatch(setDispatchId(null));
                      }}
                    />
                  </span>
                  <span className="m-t-5">
                    <button
                      className="btn btn-secondary btn-sm font-12 customButtonSmallWidth close-button"
                      onClick={() => {
                        if (driverId) {
                          navigate("/reprint-driver-selection");
                        } else {
                          navigate("/reprint-selection-screen");
                        }
                      }}
                    >
                      Back
                    </button>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SearchFilter;
