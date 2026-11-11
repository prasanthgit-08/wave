import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form } from "react-bootstrap";

import {
  setBrowsePageNumber,
  setCustomerId,
  setCustomerInput,
  setCustomerPlantId,
  setCustomerPlantInput,
  setDealerId,
  setDealerInput,
  setIsInnerLookupsOpen,
} from "../../../../redux/UnitStatus/UnitStatusSlice";
import CustomerService from "../../../../services/CustomerService";
import CustomerPlantMaintenanceService from "../../../../services/CustomerPlantMaintenanceService";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantsLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import LookupButton from "../../../common/LookupButton";
import DealerLookup from "../../../LookupScreens/Dealer/DealerLookup";
import DealerService from "../../../../services/DealerService";

const UnitStatusAdvancedSearchMiscContent = ({
  // Pass componentType as either 'Maintenance' or 'Lookup'
  componentType,
}) => {
  const customerInput = useSelector((state) => state.unitStatusReducer.customerInput);
  const customerPlantInput = useSelector((state) => state.unitStatusReducer.customerPlantInput);
  const dealerInput = useSelector((state) => state.unitStatusReducer.dealerInput);
  const customerId = useSelector((state) => state.unitStatusReducer.customerId);
  const customerPlantId = useSelector((state) => state.unitStatusReducer.customerPlantId);
  const dealerId = useSelector((state) => state.unitStatusReducer.dealerId);

  const [showCustomerLookup, setShowCustomerLookup] = useState(false);
  const [customersList, setCustomersList] = useState([]);
  const [showCustomerPlantLookup, setShowCustomerPlantLookup] = useState(false);
  const [plantsList, setPlantsList] = useState([]);
  const [showDealerLookup, setShowDealerLookup] = useState(false);
  const [dealersList, setDealersList] = useState([]);

  const dispatch = useDispatch();

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
    dispatch(setBrowsePageNumber(0));
    setShowCustomerLookup(false);
  };

  /**
   * Fetch all the customer plants for Autocomplete
   */
  const fetchAllPlantdetailsByName = (string) => {
    CustomerPlantMaintenanceService.fetchAllPlantdetailsByName(string)
      .then((response) => {
        const data = response.data;
        const plantList = data.content?.map((plant) => ({
          ...plant,
          name: plant.name?.trim(),
        }));
        setPlantsList(plantList);
      })
      .catch((err) => {});
  };
  /**
   * used for Plant selection Autocomplete & Lookup - onSelect
   */
  const handleCustomerPlantSelection = (plant) => {
    dispatch(setCustomerPlantInput(plant.name));
    dispatch(setCustomerPlantId(plant.customerPlantPK));
    dispatch(setBrowsePageNumber(0));
    setShowCustomerPlantLookup(false);
  };

  /**
   * Used for Pickup Dealer selection AutoComplete
   */
  const fetchDealerByName = (string) => {
    DealerService.fetchAllDealerDetailsByName(string)
      .then((response) => {
        const data = response.data;
        const dealerList = data.content?.map((dealer) => ({
          ...dealer,
          name: dealer.name?.trim(),
        }));
        setDealersList(dealerList);
      })
      .catch((err) => {});
  };
  /**
   * used for Dealer Autocomplete Dropdown & Lookup - onSelect
   */
  const handleDealerSelection = (dealer) => {
    dispatch(setDealerInput(dealer.name));
    dispatch(setDealerId(dealer.dealerPK));
    dispatch(setBrowsePageNumber(0));
    setShowDealerLookup(false);
  };

  useEffect(() => {
    if (showCustomerLookup || showCustomerPlantLookup || showDealerLookup) {
      dispatch(setIsInnerLookupsOpen(true));
    } else {
      dispatch(setIsInnerLookupsOpen(false));
    }
  }, [showCustomerLookup, showCustomerPlantLookup, showDealerLookup]);

  return (
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
            selectedId={customerId}
            clearInputCallback={() => {
              dispatch(setCustomerId(null));
              dispatch(setBrowsePageNumber(0));
            }}
            className={`${(customerId === "" || customerId === null) && customerInput !== "" ? "borderRed" : ""}`}
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
            selectedId={customerPlantId}
            handleSearchString={(string) => dispatch(setCustomerPlantInput(string))}
            fetchDataBySearchString={fetchAllPlantdetailsByName}
            onSelect={handleCustomerPlantSelection}
            clearInputCallback={() => {
              dispatch(setCustomerPlantId(null));
              dispatch(setBrowsePageNumber(0));
            }}
            className={`${
              (customerPlantId === "" || customerPlantId === null) && customerPlantInput !== ""
                ? "borderRed"
                : ""
            }`}
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
          {/* Dealer Autocomplete */}
          <AutoCompleteDropdown
            arrayList={dealersList}
            searchString={dealerInput}
            renderItemId={(dealer) => dealer.dealerPK}
            renderItemField={(dealer) => dealer.name}
            selectedId={dealerId}
            handleSearchString={(string) => dispatch(setDealerInput(string))}
            fetchDataBySearchString={fetchDealerByName}
            onSelect={handleDealerSelection}
            clearInputCallback={() => {
              dispatch(setDealerId(null));
              dispatch(setBrowsePageNumber(0));
            }}
            className={`${(dealerId === "" || dealerId === null) && dealerInput !== "" ? "borderRed" : ""}`}
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
  );
};

export default UnitStatusAdvancedSearchMiscContent;
