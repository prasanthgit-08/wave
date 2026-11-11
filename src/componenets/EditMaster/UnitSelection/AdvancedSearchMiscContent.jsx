/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../common/AutoCompleteDropdown";
import LookupButton from "../../common/LookupButton";
import {
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
import DelayProcessingService from "../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { setDelayCustomerPlantPKList } from "../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";

const AdvancedSearchMiscContent = ({
  // Pass componentType as either 'Maintenance' or 'Lookup'
  componentType,
}) => {
  const customerInput = useSelector((state) => state.unitSelection.customerInput);
  const customerPlantInput = useSelector((state) => state.unitSelection.customerPlantInput);
  const dealerInput = useSelector((state) => state.unitSelection.dealerInput);
  const customerId = useSelector((state) => state.unitSelection.customerId);
  const customerPlantId = useSelector((state) => state.unitSelection.customerPlantId);
  const dealerId = useSelector((state) => state.unitSelection.dealerId);

  const [showCustomerLookup, setShowCustomerLookup] = useState(false);
  const [customersList, setCustomersList] = useState([]);
  const [showCustomerPlantLookup, setShowCustomerPlantLookup] = useState(false);
  const [plantsList, setPlantsList] = useState([]);
  const [showDealerLookup, setShowDealerLookup] = useState(false);
  const [dealersList, setDealersList] = useState([]);
  const [delayCustomerPlant, setdelayCustomerPlant] = useState(false);
  const [delayCustomer, setdelayCustomer] = useState(false);
  const [isDPUCustomer, setIsDPUCustomer] = useState(false);
  const [usePlants, setUsePlants] = useState(false);

  const customerPKList = useSelector((state) => state.delayProcessing.delayCustomerPKList);
  const customerPlantPKList = useSelector((state) => state.delayProcessing.delayCustomerPlantPKList);
  const dealerPKList = useSelector((state) => state.delayProcessing.delayDealerPKList);
  const isDelayLocalCompany = useSelector((state) => state.delayProcessing.isDelayLocalCompany);
  const selectedCompanyName = useSelector((state) => state.unitSelection.selectedCompanyName);
  const isDelayProc = useSelector((state) => state.delayProcessing.isDelayProc);

  const [customerLoading, setCustomerLoading] = useState(false);
  const [plantLoading, setPlantLoading] = useState(false);
  const [dealerLoading, setDealerLoading] = useState(false);

  const dispatch = useDispatch();

  /**
   * Fetch all the customers.
   * Used for Customer Autocomplete
   */
  const fetchCustomerDetailsForAutocomplete = (string) => {
    setCustomerLoading(true);
    setCustomersList([]);
    CustomerService.getAllCustomerByName(string)
      .then((response) => {
        const data = response.data;
        const customerList = data.content.map((customer) => ({
          ...customer,
          name: customer.name?.trim(),
        }));
        isDelayProc && customerPKList?.length !== 0
          ? fetchCustomersForDelay(string, customerList)
          : setCustomersList(customerList);
      })

      .catch((err) => {})
      .finally(() => {
        setCustomerLoading(false);
      });
  };

  const fetchCustomersForDelay = (string, customerList) => {
    if (customerPKList) {
      if (!isDelayLocalCompany) {
        setCustomersList(customerPKList);
        if (string !== "") {
          DelayProcessingService.getAllCustomerByName(string, selectedCompanyName).then((response) => {
            const data = response.data;
            const customerList = data.content.map((customer) => ({
              ...customer,
              name: customer.name?.trim(),
            }));
            const filteredCustomers = customerList?.filter((customer) =>
              customerPKList.map((customer) => customer.customerPK)?.includes(customer?.customerPK)
            );

            setCustomersList(filteredCustomers);
          });
        }
      } else {
        const filteredCustomers = customerList?.filter((customer) =>
          customerPKList?.includes(customer?.customerPK)
        );

        setCustomersList(filteredCustomers);
      }
    }
  };

  /**
   * used for Customer Autocomplete Dropdown & Lookup - onSelect
   */
  const handleCustomerSelection = (customer) => {
    if (!customer.usePlants) {
      dispatch(setCustomerPlantInput(""));
      dispatch(setCustomerPlantId(null));
    }
    dispatch(setCustomerInput(customer.name));
    dispatch(setCustomerId(customer.customerPK));
    dispatch(setPageNumber(0));
    setShowCustomerLookup(false);
    fetchPlantdetailsByName(null, customer.customerPK);
    setdelayCustomerPlant(true);
    setIsDPUCustomer(customer.dpuCustomer);
    setUsePlants(customer.usePlants);
  };

  /**
   * Fetch all the customer plants for Autocomplete
   */
  const fetchAllPlantdetailsByName = (string) => {
    setPlantLoading(true);
    CustomerPlantMaintenanceService.getAllPlantsByCustomer(
      "Complete",
      "Active",
      "Beginning",
      null,
      0,
      string,
      customerId,
      null,
      null,
      false,
      100
    )
      .then((response) => {
        const data = response.data;
        const plantList = data.content?.map((plant) => ({
          ...plant,
          name: plant.name?.trim(),
        }));
        setPlantsList(plantList);
        setPlantLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setPlantLoading(false);
      });
  };

  const fetchPlantsForDelay = (string, plantList) => {
    if (customerPlantPKList) {
      if (!isDelayLocalCompany) {
        setPlantsList(customerPlantPKList);
        if (string !== "") {
          DelayProcessingService.fetchAllPlantdetailsByName(string, selectedCompanyName)
            .then((response) => {
              const data = response.data;
              plantList = data.content?.map((plant) => ({
                ...plant,
                name: plant.name?.trim(),
              }));
              const filteredCustomerPlants = plantList?.filter((customerplants) =>
                customerPlantPKList
                  .map((custplant) => custplant.customerPlantPK)
                  ?.includes(customerplants?.customerPlantPK)
              );

              setPlantsList(filteredCustomerPlants);
            })
            .catch((err) => {});
        }
      } else {
        const filteredCustomerPlants = plantList?.filter((customerplants) =>
          customerPlantPKList?.includes(customerplants?.customerPlantPK)
        );

        setPlantsList(filteredCustomerPlants);
      }
    }
  };

  const fetchPlantdetailsByName = (string, id) => {
    if (customerPlantPKList) {
      if (isDelayLocalCompany) {
        CustomerPlantMaintenanceService.getAllPlantsByCustomer(
          "Complete",
          "Active",
          "Beginning",
          null,
          0,
          string,
          id,
          null,
          null,
          false
        )
          .then((response) => {
            const data = response.data;
            const plantList = data.content?.map((plant) => ({
              ...plant,
              name: plant.name?.trim(),
            }));
            const filteredCustomerPlants = plantList?.filter((customerplants) =>
              customerPlantPKList?.includes(customerplants?.customerPlantPK)
            );

            setPlantsList(filteredCustomerPlants);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        DelayProcessingService.getAllPlantsByCustomer(
          "Complete",
          "Active",
          "Beginning",
          null,
          0,
          string,
          id,
          null,
          null,
          false,
          null,
          selectedCompanyName
        )
          .then((response) => {
            const data = response.data;
            const plantList = data.content?.map((plant) => ({
              ...plant,
              name: plant.name?.trim(),
            }));
            const filteredCustomerPlants = plantList?.filter((customerplants) =>
              customerPlantPKList
                .map((customerplant) => customerplant.customerPlantPK)
                ?.includes(customerplants?.customerPlantPK)
            );

            setPlantsList(filteredCustomerPlants);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
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
    setDealerLoading(true);
    DealerService.fetchAllDealerDetailsByName(string)
      .then((response) => {
        const data = response.data;
        const dealerList = data.content?.map((dealer) => ({
          ...dealer,
          name: dealer.name?.trim(),
        }));
        isDelayProc && dealerPKList?.length !== 0
          ? fetchDealerForDelay(string, dealerList)
          : setDealersList(dealerList);
      })

      .catch((err) => {})
      .finally(() => setDealerLoading(false));
  };

  const fetchDealerForDelay = (string, dealerList) => {
    if (dealerPKList) {
      if (!isDelayLocalCompany) {
        if (string !== "") {
          setDealerLoading(true);
          DelayProcessingService.fetchAllDealerDetailsByName(string, selectedCompanyName)
            .then((response) => {
              const data = response.data;
              const dealerList = data.content?.map((dealer) => ({
                ...dealer,
                name: dealer.name?.trim(),
              }));
              const filteredDealers = dealerList?.filter((dealer) =>
                dealerPKList.map((delaydealer) => delaydealer.dealerPK)?.includes(dealer.dealerPK)
              );
              setDealersList(filteredDealers);
              setDealerLoading(false);
            })

            .catch((err) => {});
          setDealerLoading(false);
        } else {
          setDealersList(dealerPKList);
        }
      } else {
        const filteredDealers = dealerList?.filter((dealer) => dealerPKList?.includes(dealer?.dealerPK));
        setDealersList(filteredDealers);
      }
    }
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
              setdelayCustomerPlant(false);
              setdelayCustomer(false);
            }}
            className={`${
              (customerId === "" || customerId === null) && customerInput !== "" ? "borderRed" : ""
            }`}
            towardsTop
            loading={customerLoading}
            // inputTextIndent="8px"
          />
          <LookupButton onClick={() => setShowCustomerLookup(true)} />
          {/* Customer Lookup Modal */}
          <CustomerLookup
            show={showCustomerLookup}
            onHide={() => setShowCustomerLookup(false)}
            renderItemId={(customer) => customer.customerPK}
            handleLookupSelection={handleCustomerSelection}
            MaintenanceProgram={isDelayLocalCompany}
            delay={!isDelayLocalCompany}
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
            handleSearchString={(string) => {
              dispatch(setCustomerPlantInput(string));
              setdelayCustomerPlant(false);
            }}
            fetchDataBySearchString={fetchAllPlantdetailsByName}
            onSelect={handleCustomerPlantSelection}
            clearInputCallback={() => {
              dispatch(setCustomerPlantId(null));
              !customerInput ? setdelayCustomerPlant(false) : setdelayCustomerPlant(true);
            }}
            className={`${
              (customerPlantId === "" || customerPlantId === null) && customerPlantInput !== ""
                ? "borderRed"
                : ""
            }`}
            towardsTop
            loading={plantLoading}
            disabled={customerId && !(isDPUCustomer || usePlants)}
            // inputTextIndent="8px"
          />
          <LookupButton
            onClick={() => setShowCustomerPlantLookup(true)}
            disabled={customerId && !(isDPUCustomer || usePlants)}
          />
          {/* Customer Plant Lookup Modal */}
          <CustomerPlantsLookup
            show={showCustomerPlantLookup}
            onHide={() => setShowCustomerPlantLookup(false)}
            renderItemId={(plant) => plant.customerPlantPK}
            handleLookupSelection={handleCustomerPlantSelection}
            MaintenanceProgram={isDelayLocalCompany}
            shuttle={!isDelayLocalCompany}
            selectedCompanyName={selectedCompanyName}
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
            }}
            className={`${(dealerId === "" || dealerId === null) && dealerInput !== "" ? "borderRed" : ""}`}
            towardsTop
            loading={dealerLoading}
          />
          <LookupButton onClick={() => setShowDealerLookup(true)} />
          {/* Dealer Lookup Modal */}
          <DealerLookup
            show={showDealerLookup}
            onHide={() => setShowDealerLookup(false)}
            renderItemId={(dealer) => dealer.dealerPK}
            handleLookupSelection={handleDealerSelection}
            MaintenanceProgram={isDelayLocalCompany}
            delay={!isDelayLocalCompany}
          />
        </Col>
      </Form.Group>
    </div>
  );
};

export default AdvancedSearchMiscContent;
