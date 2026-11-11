/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../common/InputField";
import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../common/AutoCompleteDropdown";
import LookupButton from "../../common/LookupButton";
import {
  setAdvancedSearchByInputs,
  setAdvancedSearchString,
  setCheckAllAdvancedSearchBy,
  setCustomerId,
  setCustomerInput,
  setCustomerPlantId,
  setCustomerPlantInput,
  setDealerId,
  setDealerInput,
  setIsInnerLookupsOpen,
  setPageNumber,
} from "../../../redux/EditMaster/UnitSelectionSlice";
import CustomerService from "../../../services/CustomerService";
import CustomerLookup from "../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantMaintenanceService from "../../../services/CustomerPlantMaintenanceService";
import CustomerPlantsLookup from "../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import DealerService from "../../../services/DealerService";
import DealerLookup from "../../LookupScreens/Dealer/DealerLookup";

const AdvancedSearchSidebar = ({
  // Pass componentType as either 'Maintenance' or 'Lookup'
  componentType,
}) => {
  const advancedSearchString = useSelector((state) => state.unitSelection.advancedSearchString);
  const checkAllAdvancedSearchBy = useSelector((state) => state.unitSelection.checkAllAdvancedSearchBy);
  const advancedSearchByInputs = useSelector((state) => state.unitSelection.advancedSearchByInputs);
  const customerInput = useSelector((state) => state.unitSelection.customerInput);
  const customerPlantInput = useSelector((state) => state.unitSelection.customerPlantInput);
  const dealerInput = useSelector((state) => state.unitSelection.dealerInput);

  const [showCustomerLookup, setShowCustomerLookup] = useState(false);
  const [customersList, setCustomersList] = useState([]);
  const [showCustomerPlantLookup, setShowCustomerPlantLookup] = useState(false);
  const [plantsList, setPlantsList] = useState([]);
  const [showDealerLookup, setShowDealerLookup] = useState(false);
  const [dealersList, setDealersList] = useState([]);

  const dispatch = useDispatch();

  const onChangeAdvancedSearchByInputs = (event) => {
    const { name, checked } = event.target;
    dispatch(setAdvancedSearchByInputs({ name, checked }));
  };

  /**
   * Fetch all the customers.
   * Used for Customer Autocomplete
   */
  const fetchCustomerDetailsForAutocomplete = (string) => {
    CustomerService.getAllCustomerByName(string)
      .then((response) => {
        const data = response.data;
        const customersList = data.content.map((customer) => ({
          ...customer,
          name: customer.name?.trim(),
        }));
        setCustomersList(customersList);
      })
      .catch((err) => {});
  };
  /**
   * used for Customer Autocomplete Dropdown & Lookup - onSelect
   */
  const handleCustomerSelection = (customer) => {
    dispatch(setCustomerInput(customer.name));
    dispatch(setCustomerId(customer.customerPK));
    dispatch(setPageNumber(0));
    setShowCustomerLookup(false);
  };

  /**
   * Fetch all the customer plants for Autocomplete
   */
  const fetchAllPlantdetailsByName = (string) => {
    CustomerPlantMaintenanceService.fetchAllPlantdetailsByName(string)
      .then((response) => {
        const data = response.data.content;
        setPlantsList(data);
      })
      .catch((err) => {});
  };
  /**
   * used for Plant selection Autocomplete & Lookup - onSelect
   */
  const handleCustomerPlantSelection = (plant) => {
    dispatch(setCustomerPlantInput(plant.name));
    dispatch(setCustomerPlantId(plant.customerPlantPK));
    dispatch(setPageNumber(0));
    setShowCustomerPlantLookup(false);
  };

  /**
   * Used for Pickup Dealer selection AutoComplete
   */
  const fetchDealerByName = (string) => {
    DealerService.fetchAllDealerDetailsByName(string)
      .then((response) => {
        const data = response.data.content;
        setDealersList(data);
      })
      .catch((err) => {});
  };
  /**
   * used for Dealer Autocomplete Dropdown & Lookup - onSelect
   */
  const handleDealerSelection = (dealer) => {
    dispatch(setDealerInput(dealer.name));
    dispatch(setDealerId(dealer.dealerPK));
    dispatch(setPageNumber(0));
    setShowDealerLookup(false);
  };

  /**
   * Clear search string if none of the options is selected
   */
  useEffect(() => {
    if (Object.values(advancedSearchByInputs).every((value) => value === false)) {
      dispatch(setAdvancedSearchString(""));
    }
  }, [advancedSearchByInputs]);

  useEffect(() => {
    if (showCustomerLookup || showCustomerPlantLookup || showDealerLookup) {
      dispatch(setIsInnerLookupsOpen(true));
    } else {
      dispatch(setIsInnerLookupsOpen(false));
    }
  }, [showCustomerLookup, showCustomerPlantLookup, showDealerLookup]);

  return (
    <div className="d-flex flex-column">
      <form className="col-12 m-t-15 m-b-15">
        <div className="form-group d-flex flex-column m-b-10">
          <label className="hide-elements">Common Search Field</label>
          <InputField
            type="search"
            name="name"
            maxLength={30}
            value={advancedSearchString}
            disabled={Object.values(advancedSearchByInputs).every((value) => value === false)}
            onInput={(e) => dispatch(setAdvancedSearchString(e.target.value))}
            className="form-control rounded-0 h-25px"
            onFocus={(e) => {
              dispatch(setPageNumber(0));
              e.target.setAttribute("autocomplete", "off");
            }}
          />
        </div>

        <div className="form-group d-flex margin-box-5-fix">
          <input
            type="checkbox"
            className="form-check-input"
            id="all"
            name="all"
            value={checkAllAdvancedSearchBy}
            checked={checkAllAdvancedSearchBy}
            onChange={(e) => {
              dispatch(setCheckAllAdvancedSearchBy(e.target.checked));
            }}
          />
          <label htmlFor="all" className="mx-2">
            All
          </label>
        </div>
        <div className="form-group d-flex margin-box-5-fix">
          <input
            type="checkbox"
            className="form-check-input"
            id="pars"
            name="pars"
            value={advancedSearchByInputs.pars}
            checked={advancedSearchByInputs.pars}
            disabled={checkAllAdvancedSearchBy}
            onChange={(e) => onChangeAdvancedSearchByInputs(e)}
          />
          <label htmlFor="pars" className="mx-2">
            PARS
          </label>
        </div>
        <div className="form-group d-flex margin-box-5-fix">
          <input
            type="checkbox"
            className="form-check-input"
            id="bolNumber"
            name="bolNumber"
            value={advancedSearchByInputs.bolNumber}
            checked={advancedSearchByInputs.bolNumber}
            disabled={checkAllAdvancedSearchBy}
            onChange={(e) => onChangeAdvancedSearchByInputs(e)}
          />
          <label htmlFor="bolNumber" className="mx-2">
            BOL Number
          </label>
        </div>
        <div className="form-group d-flex margin-box-5-fix">
          <input
            type="checkbox"
            className="form-check-input"
            id="vin"
            name="vin"
            value={advancedSearchByInputs.vin}
            checked={advancedSearchByInputs.vin}
            disabled={checkAllAdvancedSearchBy}
            onChange={(e) => onChangeAdvancedSearchByInputs(e)}
          />
          <label htmlFor="vin" className="mx-2">
            VIN
          </label>
        </div>
        <div className="form-group d-flex margin-box-5-fix">
          <input
            type="checkbox"
            className="form-check-input"
            id="stockNumber"
            name="stockNumber"
            value={advancedSearchByInputs.stockNumber}
            checked={advancedSearchByInputs.stockNumber}
            disabled={checkAllAdvancedSearchBy}
            onChange={(e) => onChangeAdvancedSearchByInputs(e)}
          />
          <label htmlFor="stockNumber" className="mx-2">
            Stock Number
          </label>
        </div>
        <div className="form-group d-flex margin-box-5-fix">
          <input
            type="checkbox"
            className="form-check-input"
            id="projectCode"
            name="projectCode"
            value={advancedSearchByInputs.projectCode}
            checked={advancedSearchByInputs.projectCode}
            disabled={checkAllAdvancedSearchBy}
            onChange={(e) => onChangeAdvancedSearchByInputs(e)}
          />
          <label htmlFor="projectCode" className="mx-2">
            Project Code
          </label>
        </div>
        <div className="form-group d-flex margin-box-5-fix">
          <input
            type="checkbox"
            className="form-check-input"
            id="poNumber"
            name="poNumber"
            value={advancedSearchByInputs.poNumber}
            checked={advancedSearchByInputs.poNumber}
            disabled={checkAllAdvancedSearchBy}
            onChange={(e) => onChangeAdvancedSearchByInputs(e)}
          />
          <label htmlFor="poNumber" className="mx-2">
            PO Number
          </label>
        </div>
        <div className="form-group d-flex margin-box-5-fix">
          <input
            type="checkbox"
            className="form-check-input"
            id="serialNumber"
            name="serialNumber"
            value={advancedSearchByInputs.serialNumber}
            checked={advancedSearchByInputs.serialNumber}
            disabled={checkAllAdvancedSearchBy}
            onChange={(e) => onChangeAdvancedSearchByInputs(e)}
          />
          <label htmlFor="serialNumber" className="mx-2">
            Serial Number
          </label>
        </div>
        <div className="form-group d-flex margin-box-5-fix">
          <input
            type="checkbox"
            className="form-check-input"
            id="model"
            name="model"
            value={advancedSearchByInputs.model}
            checked={advancedSearchByInputs.model}
            disabled={checkAllAdvancedSearchBy}
            onChange={(e) => onChangeAdvancedSearchByInputs(e)}
          />
          <label htmlFor="model" className="mx-2">
            Model
          </label>
        </div>

        <div className="form-group d-flex margin-box-5-fix hide-elements">
          <input
            type="checkbox"
            className="form-check-input"
            id="toBeDetermined"
            name="toBeDetermined"
            disabled
          />
          <label htmlFor="toBeDetermined" className="mx-2 disabled-op-70">
            To Be Determined
          </label>
        </div>
      </form>

      <div className="mt-5">
        <Form.Group className={`form-group m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0`}>
          <Col sm={12} md={12} xs={12} className="p-0 mb-2">
            <Form.Label className={` col-form-label dealer-label mt-1 me-2`}>Customer</Form.Label>
          </Col>
          <Col xs={12} md={12} sm={12} className={`p-0 d-flex`}>
            {/* Customer Autocomplete */}
            <AutoCompleteDropdown
              arrayList={customersList}
              searchString={customerInput}
              renderItemId={(customer) => customer.customerPK}
              renderItemField={(customer) => customer.name}
              handleSearchString={(string) => dispatch(setCustomerInput(string))}
              fetchDataBySearchString={fetchCustomerDetailsForAutocomplete}
              onSelect={handleCustomerSelection}
              // selectedId={customerId}
              clearInputCallback={() => {
                dispatch(setCustomerId(null));
                dispatch(setPageNumber(0));
              }}
              towardsTop
              // inputTextIndent="8px"
            />
            <LookupButton onClick={() => setShowCustomerLookup(true)} />
            {/* Customer Lookup Modal */}
            <CustomerLookup
              show={showCustomerLookup}
              onHide={() => setShowCustomerLookup(false)}
              renderItemId={(customer) => customer.customerPK}
              handleLookupSelection={handleCustomerSelection}
              MaintenanceProgram
            />
          </Col>
        </Form.Group>

        <Form.Group className={`form-group m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0`}>
          <Col sm={12} md={12} xs={12} className="p-0 mb-2">
            <Form.Label className={` col-form-label dealer-label mt-1 me-2`}>Plant</Form.Label>
          </Col>
          <Col xs={12} md={12} sm={12} className={`p-0 d-flex`}>
            {/* Customer Plant Autocomplete */}
            <AutoCompleteDropdown
              arrayList={plantsList}
              searchString={customerPlantInput}
              renderItemId={(plant) => plant.customerPlantPK}
              renderItemField={(plant) => plant.name}
              handleSearchString={(string) => dispatch(setCustomerPlantInput(string))}
              fetchDataBySearchString={fetchAllPlantdetailsByName}
              onSelect={handleCustomerPlantSelection}
              clearInputCallback={() => {
                dispatch(setCustomerPlantId(null));
                dispatch(setPageNumber(0));
              }}
              towardsTop
              // inputTextIndent="8px"
            />
            <LookupButton onClick={() => setShowCustomerPlantLookup(true)} />
            {/* Customer Plant Lookup Modal */}
            <CustomerPlantsLookup
              show={showCustomerPlantLookup}
              onHide={() => setShowCustomerPlantLookup(false)}
              renderItemId={(plant) => plant.customerPlantPK}
              handleLookupSelection={handleCustomerPlantSelection}
              MaintenanceProgram
            />
          </Col>
        </Form.Group>

        <Form.Group className={`form-group m-t-5 mb-3 align-items-center row tabs-row m-l-0 m-r-0`}>
          <Col sm={12} md={12} xs={12} className="p-0 mb-2">
            <Form.Label className={` col-form-label dealer-label mt-1 me-2`}>Dealer</Form.Label>
          </Col>
          <Col xs={12} md={12} sm={12} className={`p-0 d-flex`}>
            {/* Pickup Dealer Autocomplete */}
            <AutoCompleteDropdown
              arrayList={dealersList}
              searchString={dealerInput}
              renderItemId={(dealer) => dealer.dealerPK}
              renderItemField={(dealer) => dealer.name}
              handleSearchString={(string) => dispatch(setDealerInput(string))}
              fetchDataBySearchString={fetchDealerByName}
              onSelect={handleDealerSelection}
              clearInputCallback={() => {
                dispatch(setDealerId(null));
                dispatch(setPageNumber(0));
              }}
              towardsTop
            />
            <LookupButton onClick={() => setShowDealerLookup(true)} />
            {/* Dealer Lookup Modal */}
            <DealerLookup
              show={showDealerLookup}
              onHide={() => setShowDealerLookup(false)}
              renderItemId={(dealer) => dealer.dealerPK}
              handleLookupSelection={handleDealerSelection}
              MaintenanceProgram
            />
          </Col>
        </Form.Group>
      </div>
    </div>
  );
};

export default AdvancedSearchSidebar;
