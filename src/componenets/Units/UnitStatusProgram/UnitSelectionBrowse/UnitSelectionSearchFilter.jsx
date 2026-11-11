import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../../../common/Button";
import { t } from "i18next";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import { Col, Form, Row } from "react-bootstrap";
import DateInputField from "../../../common/DateInputField";
import InputField from "../../../common/InputField";
import useWindowSizeForBreakpoint from "../../../../hooks/useWindowSizeForBreakpoint";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  clearAdvancedSearch,
  resetUnitSelectionFilters,
  resetUnitStatusInnerStates,
  setAdvancedSortingCombination,
  setAdvancedSortingOrder,
  setBrowseNormalSortFlag,
  setBrowseNormalSortValue,
  setBrowsePageNumber,
  setCompanyName,
  setDateFrom,
  setDateTo,
  setDateType,
  setDeliveryBy,
  setDispatchDelayType,
  setGlobalSearchTerm,
  setOrderType,
  setPickupBy,
  setSelectedSearchCriteria,
  setUnitDelayType,
  setUnitLast5,
  setUnitOrderStatus,
  setUnitSelectionData,
  setUnitStatus,
  setUnitType,
  toggleAdvancedSearch,
  toggleAdvancedSort,
  setLoading,
} from "../../../../redux/UnitStatus/UnitStatusSlice";
import DelayProcessingService from "../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import PlantReleaseService from "../../../../services/PlantReleaseService";
import { useNavigate } from "react-router-dom";
import {
  resetOutputconfirmationScreen,
  setBolFor,
  setDriverId,
  setIsBackButtonClicked,
  setPrintBOLOutputData,
  setPrintYardFlag,
  setRePrintBOL,
  setUnitConfirmationData,
  setUnitFK,
} from "../../../../redux/ReprintBolSlice";
import LoadingIcon from "../../../common/LoadingIcon";

function UnitSelectionSearchFilter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const breakpoint = 1550;
  const isBelowBreakpoint = useWindowSizeForBreakpoint(breakpoint);

  const [companiesList, setCompaniesList] = useState([]);
  const [loader, setLoader] = useState(false);

  const companyName = useSelector((state) => state.unitStatusReducer.companyName);
  const showAdvancedSearch = useSelector((state) => state.unitStatusReducer.showAdvancedSearch);
  const showAdvancedSort = useSelector((state) => state.unitStatusReducer.showAdvancedSort);
  const globalSearchTerm = useSelector((state) => state.unitStatusReducer.globalSearchTerm);
  const selectedSearchCriteria = useSelector((state) => state.unitStatusReducer.selectedSearchCriteria);
  const unitLast5 = useSelector((state) => state.unitStatusReducer.unitLast5);
  const unitType = useSelector((state) => state.unitStatusReducer.unitType);
  const orderType = useSelector((state) => state.unitStatusReducer.orderType);
  const dateType = useSelector((state) => state.unitStatusReducer.dateType);
  const dateFrom = useSelector((state) => state.unitStatusReducer.dateFrom);
  const dateTo = useSelector((state) => state.unitStatusReducer.dateTo);
  const unitStatus = useSelector((state) => state.unitStatusReducer.unitStatus);
  const pickupBy = useSelector((state) => state.unitStatusReducer.pickupBy);
  const deliveryBy = useSelector((state) => state.unitStatusReducer.deliveryBy);
  const unitOrderStatus = useSelector((state) => state.unitStatusReducer.unitOrderStatus);
  const unitDelayType = useSelector((state) => state.unitStatusReducer.unitDelayType);
  const dispatchDelayType = useSelector((state) => state.unitStatusReducer.dispatchDelayType);
  const selectedDispatchStatus = useSelector((state) => state.unitStatusReducer.selectedDispatchStatus);
  const loading = useSelector((state) => state.unitStatusReducer.loading);
  const [isDateFromValid, setIsDateFromValid] = useState(true);
  const [isDateToValid, setIsDateToValid] = useState(true);
  const rePrintBOL = useSelector((state) => state.reprintBolReducer.rePrintBOL);

  const searchCriteriaOptions = ["Beginning", "Contains"];

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
      //onClick when Advanced Sort is hidden
      dispatch(setBrowseNormalSortValue(null));
      dispatch(setBrowseNormalSortFlag(false));
    } else {
      // onClick when Advanced Sort is shown
      dispatch(setAdvancedSortingOrder(null));
      dispatch(setAdvancedSortingCombination(null));
    }

    dispatch(toggleAdvancedSort());
  };

  const getCompanyDetails = () => {
    setLoader(true);
    PlantReleaseService.getCompanyDetails()
      .then((response) => {
        const data = response.data;
        dispatch(setCompanyName(data?.name || ""));
      })
      .catch((error) => {})
      .finally(() => {
        setLoader(false);
      });
  };
  useEffect(() => {
    getCompanyDetails();
  }, [rePrintBOL]);

  return (
    <div className={`unitSelectionSearchFilter ${isBelowBreakpoint && "zoomOut"}`}>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          {(loader || loading) && <LoadingIcon />}
          <Row className="m-0 p-0">
            <Col md={10} sm={10} lg={10} xs={10} className="p-l-0">
              <div className="d-flex align-items-center justify-content-between">
                {/* Global Search Term */}
                <div className="d-flex align-items-center customSearchBox">
                  {/* Default Case */}

                  {/* <div className="d-flex align-items-center flex-column ps-2" style={{ width: "300px" }}>
                    {" "} */}
                  <div className="d-flex flex-column">
                    <Form.Group className="form-group align-items-center row m-l-0 m-r-0 w-100">
                      {/* <Col xs={3} className="p-0 w-60px">
                        <Form.Label className="customColFormLabel">Company</Form.Label>
                      </Col> */}
                      {!rePrintBOL && (
                        <Col xs={3} className="p-0 w-60px">
                          <Form.Label className="customColFormLabel">Company</Form.Label>
                        </Col>
                      )}
                      <Col xs={6} className="p-0">
                        {/* <Form.Select name="sisterCompany" id="sisterCompany" className={`customFormControl col`}>
                          <option value=""></option>
                        </Form.Select> */}
                        <input
                          type="text"
                          name="globalSearchTerm"
                          value={companyName}
                          autoComplete="off"
                          aria-autocomplete="list"
                          disabled
                          hidden={rePrintBOL}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3 w-100">
                      <Col xs={3} className="p-0 w-60px">
                        <Form.Label className="customColFormLabel">Search</Form.Label>
                      </Col>

                      <Col xs={6} className="p-0">
                        <input
                          type="search"
                          name="globalSearchTerm"
                          value={globalSearchTerm}
                          autoComplete="off"
                          aria-autocomplete="list"
                          placeholder={t("global.search")}
                          onChange={(e) => {
                            dispatch(setGlobalSearchTerm(e.target.value));
                            dispatch(setBrowsePageNumber(0));
                          }}
                          disabled={showAdvancedSearch || false}
                          // autocomplete="autocomplete_off_randString"
                        />
                      </Col>
                    </Form.Group>
                  </div>
                </div>

                {/* SearchCriteria  */}
                <div className="d-flex align-items-center">
                  <CustomRadioGroup
                    name="searchCriteria"
                    selectedOption={selectedSearchCriteria}
                    options={searchCriteriaOptions}
                    onChange={(option) => {
                      dispatch(setSelectedSearchCriteria(option));
                      dispatch(setBrowsePageNumber(0));
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
                        dispatch(setBrowsePageNumber(0));
                      }}
                      disabled={showAdvancedSearch || false}
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
                      dispatch(setBrowsePageNumber(0));
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
                      dispatch(setBrowsePageNumber(0));
                    }}
                  />
                </div>

                {/* Date Type // Default Case*/}

                <div className="d-flex flex-column">
                  <CustomRadioGroup
                    name="dateType"
                    selectedOption={dateType}
                    options={["Entry", "Order", "Shuttle", "Dispatch", "Invoice"]}
                    onChange={(option) => {
                      dispatch(setDateType(option));
                      dispatch(setBrowsePageNumber(0));
                    }}
                  />
                </div>

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
                        setDate={(value) => {
                          dispatch(setDateFrom(value));
                          dispatch(setBrowsePageNumber(0));
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
                        setDate={(value) => {
                          dispatch(setDateTo(value));
                          dispatch(setBrowsePageNumber(0));
                        }}
                        setIsDateValid={setIsDateToValid}
                        className={!isDateToValid ? "borderRed" : ""}
                      />
                    </Col>
                  </Row>
                </div>

                {/* Default Case */}

                <div className="d-flex flex-column">
                  <CustomRadioGroup
                    name="unitStatus"
                    selectedOption={unitStatus}
                    options={["All", "Unreleased", "Active", "History", "Deleted"]}
                    onChange={(option) => {
                      dispatch(setUnitStatus(option));
                      dispatch(setBrowsePageNumber(0));
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
                          dispatch(setBrowsePageNumber(0));
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
                          dispatch(setBrowsePageNumber(0));
                        }}
                      />
                    </Col>
                  </Row>
                </div>

                {/* Default Case */}

                <div className="d-flex flex-column">
                  <CustomRadioGroup
                    name="unitOrderStatus"
                    selectedOption={unitOrderStatus}
                    options={["All", "Hold", "Storage", "DPU"]}
                    onChange={(option) => {
                      dispatch(setUnitOrderStatus(option));
                      dispatch(setBrowsePageNumber(0));
                    }}
                  />
                </div>

                {/* Default Case */}

                <div className="d-flex flex-column">
                  <CustomRadioGroup
                    name="unitDelayType"
                    selectedOption={unitDelayType}
                    options={["All", "Shuttle Delay", "Activation Delay", "Dispatch Delay"]}
                    onChange={(option) => {
                      dispatch(setUnitDelayType(option));
                      dispatch(setBrowsePageNumber(0));
                    }}
                  />
                </div>

                {/* Default Case */}

                <div
                  className={`
                    d-flex flex-column`}
                >
                  <CustomRadioGroup
                    name="dispatchDelayType"
                    selectedOption={dispatchDelayType}
                    options={["All", "Delay", "Breakdown", "Damage"]}
                    onChange={(option) => {
                      dispatch(setDispatchDelayType(option));
                      dispatch(setBrowsePageNumber(0));
                    }}
                  />
                </div>
              </div>
            </Col>

            <Col md={2} sm={2} lg={2} xs={2} className="p-l-0">
              <div className="d-flex justify-content-end advanced-search-box">
                <div className="d-flex flex-column">
                  <span className="m-b-5">
                    <button
                      className="btn btn-secondary font-12 btn-sm btn-medium-width"
                      onClick={handleAdvancedSearchOnClick}
                      //  disabled
                    >
                      {t("advanced.search.button")}
                    </button>
                  </span>

                  <span className="m-t-5">
                    <button
                      className="btn btn-secondary font-12 btn-sm btn-medium-width" /* btn-medium-width */
                      onClick={handleAdvancedSortOnClick}
                      //  disabled
                    >
                      Advanced Sort
                    </button>
                  </span>
                </div>
                <div className="d-flex flex-column">
                  <span className="m-b-5">
                    <ButtonComponent
                      route={"/"}
                      className="btn btn-secondary btn-sm font-12 customButtonSmallWidth close-button"
                      label={"Close"}
                      onClick={() => {
                        if (rePrintBOL) {
                          localStorage.removeItem("rePrint");
                          dispatch(setRePrintBOL(false));
                          dispatch(setBolFor("driver"));
                          dispatch(setUnitConfirmationData(null));
                          dispatch(setUnitFK(null));
                          dispatch(setDriverId(null));
                          dispatch(setPrintYardFlag(false));
                          dispatch(setPrintBOLOutputData(null));
                          dispatch(resetOutputconfirmationScreen());
                        } else {
                          dispatch(resetUnitSelectionFilters());
                          //to clear inner tab states
                          dispatch(resetUnitStatusInnerStates());
                          dispatch(setUnitSelectionData(""));
                        }
                      }}
                    />
                  </span>
                  <span className="m-t-5">
                    {" "}
                    <ButtonComponent
                      route={"/reprint-selection-screen"}
                      className="btn btn-secondary btn-sm font-12 customButtonSmallWidth close-button"
                      label={"Back"}
                      onClick={() => {
                        if (rePrintBOL) {
                          dispatch(setIsBackButtonClicked(true));
                          navigate(`/reprint-selection-screen`);
                        }
                      }}
                      hidden={!rePrintBOL}
                    />
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default UnitSelectionSearchFilter;
