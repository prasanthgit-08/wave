/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import ButtonComponent from "../../common/Button";
import InputField from "../../common/InputField";
import CustomRadioGroup from "../../common/CustomRadioGroup";
import DateInputField from "../../common/DateInputField";
import {
  clearAdvancedSearch,
  resetUnitSelectionFilters,
  setAdvancedSortingCombination,
  setAdvancedSortingOrder,
  setDateFrom,
  setDateTo,
  setDateType,
  setDeliveryBy,
  setDispatchDelayType,
  setGlobalSearchTerm,
  setNormalSortValue,
  setNormalSortFlag,
  setOrderType,
  setPageNumber,
  setPickupBy,
  setSelectedSearchCriteria,
  setUnitDelayType,
  setUnitLast5,
  setUnitOrderStatus,
  setUnitStatus,
  setUnitType,
  toggleAdvancedSearch,
  toggleAdvancedSort,
  setCompanyName,
} from "../../../redux/EditMaster/UnitSelectionSlice";
import { useEffect } from "react";
import PaperworkProcessingService from "../../../services/Invoicing/PaperworkProcessingService";

const SearchFilter = ({ onHide, handleClose, selectedCompanyFK, selectedCompanyName }) => {
  const dispatch = useDispatch();

  const showAdvancedSearch = useSelector((state) => state.unitSelection.showAdvancedSearch);
  const showAdvancedSort = useSelector((state) => state.unitSelection.showAdvancedSort);
  const globalSearchTerm = useSelector((state) => state.unitSelection.globalSearchTerm);
  const selectedSearchCriteria = useSelector((state) => state.unitSelection.selectedSearchCriteria);
  const unitLast5 = useSelector((state) => state.unitSelection.unitLast5);
  const unitType = useSelector((state) => state.unitSelection.unitType);
  const orderType = useSelector((state) => state.unitSelection.orderType);
  const dateFrom = useSelector((state) => state.unitSelection.dateFrom);
  const dateTo = useSelector((state) => state.unitSelection.dateTo);
  const pickupBy = useSelector((state) => state.unitSelection.pickupBy);
  const deliveryBy = useSelector((state) => state.unitSelection.deliveryBy);
  const companyName = useSelector((state) => state.unitSelection.companyName);

  const [companyNames, setCompanyNames] = useState([]);
  const [companyFK, setCompanyFK] = useState(null);

  //Fetch All Company Names
  const getCompanyNames = () => {
    PaperworkProcessingService.getAllCompanyNames(companyName)
      .then((response) => {
        const data = response.data;
        setCompanyNames(data);
        if (selectedCompanyFK && selectedCompanyName) {
          setCompanyFK(selectedCompanyFK);
          dispatch(setCompanyName(selectedCompanyName));
        } else {
          getCurrentCompanyName();
        }
      })
      .catch((error) => {});
  };
  const getCurrentCompanyName = () => {
    PaperworkProcessingService.getCurrentCompanyName()
      .then((response) => {
        const data = response.data;
        setCompanyFK(data.companyPK);
        dispatch(setCompanyName(data.name));
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      // onClick when Advanced Sort is hidden
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(false));
    } else {
      // onClick when Advanced Sort is shown
      dispatch(setAdvancedSortingOrder(null));
      dispatch(setAdvancedSortingCombination(null));
    }

    dispatch(toggleAdvancedSort());
  };

  useEffect(() => {
    if (dateFrom === "" || dateTo === "") {
      dispatch(setPageNumber(0));
    }
  }, [dateFrom, dateTo]);

  return (
    <div className={``}>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0">
            <Col md={10} sm={10} lg={10} xs={10} className="p-l-0">
              <div className="d-flex align-items-center justify-content-between">
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
                        // autocomplete="autocomplete_off_randString"
                        // autoComplete="new-password"
                        // aria-autocomplete="new-password"
                        aria-autocomplete="list"
                        autoComplete="off"
                        // autocomplete="autocomplete_off_randString"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 w-100">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Company</Form.Label>
                    </Col>

                    <Col xs={9} className="p-0">
                      <input
                        name="companyName"
                        id="companyName"
                        type="text"
                        className={`customFormControl`}
                        value={selectedCompanyName || companyName}
                        disabled
                        aria-autocomplete="list"
                        autoComplete="off"
                      />
                    </Col>
                  </Form.Group>
                </div>

                {/* SearchCriteria  */}
                <div className="d-flex align-items-center">
                  <CustomRadioGroup
                    name="searchCriteria"
                    selectedOption={selectedSearchCriteria}
                    options={["Beginning", "Contains"]}
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

                {/* Pickup & Delivery */}
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

                {/* Empty element for styling */}
                <div className="d-flex flex-column mx-2 hide-elements">
                  <Row className="m-1">
                    <Col className="p-0 d-flex justify-content-end align-items-center">
                      <label className="f-w-600 m-r-5 customLabel">Pickup</label>
                    </Col>

                    <Col className="p-0">
                      <CustomRadioGroup
                        horizontal
                        horizontalAlignmentClassName={"mx-2"}
                        options={["Name", "City, ST"]}
                      />
                    </Col>
                  </Row>
                  <Row className="m-1">
                    <Col className="p-0 d-flex justify-content-end align-items-center">
                      <label className="f-w-600 m-r-5 customLabel">Delivery</label>
                    </Col>

                    <Col className="p-0">
                      <CustomRadioGroup
                        horizontal
                        horizontalAlignmentClassName={"mx-2"}
                        options={["Name", "City, ST"]}
                      />
                    </Col>
                  </Row>
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

                <span className="m-l-10">
                  <ButtonComponent
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
