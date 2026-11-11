import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantsLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  resetNewPage,
  setCustomerID,
  setCustomerName,
  setCustomerSearchString,
  setDealerAddress1,
  setDealerAddress2,
  setDealerCity,
  setDealerName,
  setDealerState,
  setDealerZip,
  setPlantGroupID,
  setPlantGroupName,
  setPlantGroupSearchString,
  setPlantID,
  setPlantName,
  setPlantSearchString,
} from "../../../../redux/CustomerDealerSlice";
import CustomerDealersService from "../../../../services/CustomerDealersService";
import CustomerPlantGroupsLookup from "../../../LookupScreens/CustomerPlantGroups/CustomerPlantGroupsLookup";
import {
  setDstCity,
  setDstStateCode,
  setDpuCustomer,
  setSelectionId,
} from "../../../../redux/EditCustomerDealerSlice";
import {
  setCustomerData,
  setLoading,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/LookupScreens/CustomerLookupSlice";
import {
  setCustomerPlantData,
  setTotalElements as setPlantTotalElements,
  setTotalPages as setPlantTotalPages,
  setLoading as setPlantLoading,
} from "../../../../redux/LookupScreens/CustomerPlantsLookupSlice";
import {
  setCustomerPlantGroupData,
  setTotalElements as setPlantGroupTotalElements,
  setTotalPages as setPlantGroupTotalPages,
  setLoading as setPlantGroupLoading,
} from "../../../../redux/LookupScreens/CustomerPlantGroupLookupSlice";

const NewPageContent = () => {
  const [showCustomerLookup, setShowCustomerLookup] = useState(false);
  const [showPlantLookup, setShowPlantLookup] = useState(false);
  const [showPlantGroupLookup, setShowPlantGroupLookup] = useState(false);
  const [customerAutoCompleteData, setCustomerAutoCompleteData] = useState([]);
  const [plantData, setPlantData] = useState([]);
  const [plantGroupData, setPlantGroupData] = useState([]);
  const [dropdownLoading, setDropdownLoading] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();

  const id = params.id;

  const name = useSelector((state) => state.customerDealersFilter.dealerName);
  const address1 = useSelector((state) => state.customerDealersFilter.dealerAddress1);
  const address2 = useSelector((state) => state.customerDealersFilter.dealerAddress2);
  const city = useSelector((state) => state.customerDealersFilter.dealerCity);
  const state = useSelector((state) => state.customerDealersFilter.dealerState);
  const zip = useSelector((state) => state.customerDealersFilter.dealerZip);
  const customerSearchString = useSelector((state) => state.customerDealersFilter.customerSearchString);
  const plantSearchString = useSelector((state) => state.customerDealersFilter.plantSearchString);
  const plantGroupSearchString = useSelector((state) => state.customerDealersFilter.plantGroupSearchString);
  const plantName = useSelector((state) => state.customerDealersFilter.plantName);
  const plantId = useSelector((state) => state.customerDealersFilter.plantId);
  const plantGroupId = useSelector((state) => state.customerDealersFilter.plantGroupId);
  const plantGroupName = useSelector((state) => state.customerDealersFilter.plantGroupName);
  const customerId = useSelector((state) => state.customerDealersFilter.customerId);
  const customerName = useSelector((state) => state.customerDealersFilter.customerName);
  const dpuCustomer = useSelector((state) => state.editcustomerDealers.dpuCustomer);

  const customerPageNo = useSelector((state) => state.customerLookupReducer.pageNo);
  const customerSearchTerm = useSelector((state) => state.customerLookupReducer.searchTerms);
  const searchedCustomer = useSelector((state) => state.customerLookupReducer.searchedCustomer);
  const customerAdvanceSortedValue = useSelector((state) => state.customerLookupReducer.advanceSortedValue);
  const customerAdvanceSortingOrder = useSelector((state) => state.customerLookupReducer.advanceSortingOrder);
  const customerSelectedSearchCriteria = useSelector(
    (state) => state.customerLookupReducer.selectedSearchCriteria
  );
  const customerNormalSortValue = useSelector((state) => state.customerLookupReducer.normalSortValue);
  const customerNormalSortFlag = useSelector((state) => state.customerLookupReducer.normalSortFlag);

  const plantSelectedSearchCriteria = useSelector(
    (state) => state.customerPlantsLookupReducer.selectedSearchCriteria
  );
  const plantSearchTerms = useSelector((state) => state.customerPlantsLookupReducer.searchTerms);
  const searchedCustomerPlant = useSelector(
    (state) => state.customerPlantsLookupReducer.searchedCustomerPlant
  );
  const pageNoPlantsLookup = useSelector((state) => state.customerPlantsLookupReducer.pageNoPlantsLookup);
  const plantSortFlag = useSelector((state) => state.customerPlantsLookupReducer.normalSortFlag);
  const plantSortValue = useSelector((state) => state.customerPlantsLookupReducer.normalSortValue);

  const plantGroupPageNumber = useSelector((state) => state.customerPlantGroupReducer.pageNumber);
  const plantGroupSelectedSearchCriteria = useSelector(
    (state) => state.customerPlantGroupReducer.selectedSearchCriteria
  );
  const plantGroupSearchTerms = useSelector((state) => state.customerPlantGroupReducer.searchTerms);
  const plantGroupSortFlag = useSelector((state) => state.customerPlantGroupReducer.normalSortFlag);
  const plantGroupSortValue = useSelector((state) => state.customerPlantGroupReducer.normalSortValue);

  const fetchCustomerLookup = () => {
    CustomerDealersService.fetchCustomerLookup(
      customerPageNo,
      customerSearchTerm,
      customerSelectedSearchCriteria,
      customerAdvanceSortingOrder,
      searchedCustomer,
      customerNormalSortFlag,
      customerNormalSortValue,
      id
    ).then((response) => {
      dispatch(setCustomerData(response?.data?.content));
      dispatch(setTotalPages(response?.data?.totalPages));
      dispatch(setTotalElements(response?.data?.totalElements));
      dispatch(setLoading(false));
    });
  };

  const fetchPlantLookup = () => {
    CustomerDealersService.fetchCustomerPlantLookup(
      pageNoPlantsLookup,
      plantSearchTerms,
      plantSelectedSearchCriteria,
      searchedCustomerPlant,
      plantSortFlag,
      plantSortValue,
      id
    ).then((response) => {
      dispatch(setCustomerPlantData(response?.data?.content));
      dispatch(setPlantTotalElements(response?.data?.totalElements));
      dispatch(setPlantTotalPages(response?.data?.totalPages));
      dispatch(setPlantLoading(false));
    });
  };
  const fetchPlantGroupLookup = () => {
    CustomerDealersService.fetchCustomerPlantGroupLookup(
      plantGroupPageNumber,
      plantGroupSearchTerms,
      plantGroupSelectedSearchCriteria,
      plantGroupSortValue,
      plantGroupSortFlag,
      id
    ).then((response) => {
      dispatch(setCustomerPlantGroupData(response?.data?.content));
      dispatch(setPlantGroupTotalElements(response?.data?.totalElements));
      dispatch(setPlantGroupTotalPages(response?.data?.totalPages));
      dispatch(setPlantGroupLoading(false));
    });
  };

  const fetchDealer = () => {
    CustomerDealersService.fetchDealerById(id).then((response) => {
      dispatch(setDealerName(response?.data?.name));
      dispatch(setDealerAddress1(response?.data?.address1));
      dispatch(setDealerAddress2(response?.data?.address2));
      dispatch(setDealerCity(response?.data?.city));
      dispatch(setDealerState(response?.data?.stateCode));
      dispatch(setDealerZip(response?.data?.postalCode));
    });
  };
  const handleCustomerSelection = (customer) => {
    dispatch(setCustomerName(customer.name?.trim()));
    dispatch(setCustomerID(customer.customerPK));
    dispatch(setCustomerSearchString(customer.name?.trim()));
    dispatch(setSelectionId(customer.customerPK));
    dispatch(setPlantGroupName(""));
    dispatch(setPlantGroupSearchString(""));
    dispatch(setPlantName(""));
    dispatch(setPlantSearchString(""));
    setShowCustomerLookup(false);
    dispatch(setDstCity(customer.city));
    dispatch(setDstStateCode(customer.stateCode));
    dispatch(setDpuCustomer(customer.dpuCustomer));
  };
  const handlePlantSelection = (plant) => {
    dispatch(setPlantName(plant.name?.trim()));
    dispatch(setPlantID(plant.customerPlantPK));
    dispatch(setPlantSearchString(plant.name?.trim()));
    dispatch(setSelectionId(plant.customerPlantPK));
    if (!dpuCustomer) {
      dispatch(setCustomerSearchString(""));
      dispatch(setCustomerName(""));
    }
    dispatch(setPlantGroupName(""));
    dispatch(setPlantGroupSearchString(""));
    setShowPlantLookup(false);
    dispatch(setDstCity(plant.city));
    dispatch(setDstStateCode(plant.stateCode));
  };
  const handlePlantGroupSelection = (plantGroup) => {
    dispatch(setPlantGroupName(plantGroup.description?.trim()));
    dispatch(setPlantGroupID(plantGroup.customerPlantGroupPK));
    dispatch(setPlantGroupSearchString(plantGroup.description?.trim()));
    dispatch(setSelectionId(plantGroup.customerPlantGroupPK));
    dispatch(setCustomerSearchString(""));
    dispatch(setCustomerName(""));
    dispatch(setPlantName(""));
    dispatch(setPlantSearchString(""));
    setShowPlantGroupLookup(false);
    dispatch(setDstCity(plantGroup?.customerfk.city));
    dispatch(setDstStateCode(plantGroup?.customerfk.stateCode));
  };

  const fetchCustomer = (string) => {
    const debounceFunction = setTimeout(
      () => {
        setDropdownLoading(true);
        CustomerDealersService.fetchCustomerAutoComplete(string, id)
          .then((response) => {
            setCustomerAutoCompleteData(response?.data?.content);
          })
          .catch((err) => {})
          .finally(() => setDropdownLoading(false));
      },

      100
    );

    return () => {
      clearTimeout(debounceFunction);
    };
  };

  const fetchPlant = (string) => {
    const debounceFunction = setTimeout(() => {
      setDropdownLoading(true);
      CustomerDealersService.fetchCustomerPlantAutoComplete(string, id)
        .then((response) => {
          setPlantData(response?.data?.content);
        })
        .catch((err) => {})
        .finally(() => setDropdownLoading(false));
    }, 150);

    return () => {
      clearTimeout(debounceFunction);
    };
  };

  const fetchPlantGroup = (string) => {
    const debounceFunction = setTimeout(() => {
      setDropdownLoading(true);
      CustomerDealersService.fetchCustomerPlantGroupAutoComplete(string, id)
        .then(({ data }) => {
          setPlantGroupData(data?.content);
        })
        .finally(() => setDropdownLoading(false));
    }, 100);
    return () => {
      clearTimeout(debounceFunction);
    };
  };
  useEffect(() => {
    dispatch(resetNewPage());

    const debounceFunction = setTimeout(() => {
      fetchDealer();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, []);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border threeFourthScreenFormContentHeight">
        <div className={`col-8 `}>
          <div className="p-15 w-100 ">
            <Row className="m-0 p-0">
              <Col sm={8} md={8} lg={8} xl={8} xs={8}>
                <Form.Group className="margin-box-1 form-group m-t-20 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "132px" }}>
                    <Form.Label className="col-form-label dealer-label">Dealer</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "400px" }}>
                    <input
                      type="text"
                      className="customFormControl"
                      id="name"
                      name="name"
                      value={name}
                      maxLength={30}
                      disabled={true}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="margin-box-1 form-group m-t-20 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "132px" }}></Col>
                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "400px" }}>
                    <input
                      type="text"
                      className="customFormControl"
                      id="ad1"
                      name="ad1"
                      value={address1}
                      maxLength={30}
                      disabled={true}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="margin-box-1 form-group m-t-20 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "132px" }}></Col>
                  <Col xs={5} md={5} sm={5} className="p-0" style={{ width: "400px" }}>
                    <input
                      type="text"
                      className="customFormControl"
                      id="ad2"
                      name="ad2"
                      value={address2}
                      maxLength={30}
                      disabled={true}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="margin-box-1 form-group m-t-20 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "132px" }}></Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      type="text"
                      className="customFormControl"
                      id="City"
                      name="City"
                      value={city}
                      maxLength={30}
                      disabled={true}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-r-0">
                    <input
                      type="text"
                      className="customFormControl"
                      id="State"
                      name="State"
                      value={state}
                      maxLength={30}
                      disabled={true}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-r-0">
                    <input
                      type="text"
                      className="customFormControl"
                      id="postalCode"
                      name="postalCode"
                      value={zip}
                      maxLength={30}
                      disabled={true}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="margin-box-1 form-group m-t-20 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "132px" }}>
                    <Form.Label className="col-form-label dealer-label">Customer</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0 d-flex" style={{ width: "400px" }}>
                    <AutoCompleteDropdown
                      arrayList={customerAutoCompleteData}
                      searchString={customerSearchString}
                      fetchDataBySearchString={fetchCustomer}
                      loading={dropdownLoading}
                      renderItemField={(customer) => customer.name}
                      renderItemId={(customer) => customer.customerPK}
                      onSelect={handleCustomerSelection}
                      handleSearchString={(string) => {
                        dispatch(setCustomerSearchString(string));
                      }}
                      clearInputCallback={() => {
                        dispatch(setCustomerID(null));
                      }}
                      selectedId={customerId}
                      disabled={(plantId && !dpuCustomer) || plantGroupId}
                      className={`${
                        (!customerId && customerSearchString) ||
                        (!customerSearchString && !plantGroupId && !plantId)
                          ? "borderRed"
                          : customerId
                            ? "borderGreen"
                            : ""
                      }`}
                    />
                    <LookupButton
                      onClick={() => {
                        setShowCustomerLookup(true);
                      }}
                      disabled={(plantId && !dpuCustomer) || plantGroupId}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="margin-box-1 form-group m-t-20 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "132px" }}>
                    <Form.Label className="col-form-label dealer-label">Plant</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0 d-flex" style={{ width: "400px" }}>
                    <AutoCompleteDropdown
                      arrayList={plantData}
                      searchString={plantSearchString}
                      fetchDataBySearchString={fetchPlant}
                      loading={dropdownLoading}
                      renderItemField={(plant) => plant.name}
                      renderItemId={(plant) => plant.customerPlantPK}
                      onSelect={handlePlantSelection}
                      handleSearchString={(string) => {
                        dispatch(setPlantSearchString(string));
                      }}
                      clearInputCallback={() => {
                        dispatch(setPlantID(null));
                      }}
                      disabled={plantGroupId || (customerId && !dpuCustomer)}
                      selectedId={plantId}
                      className={`${
                        (!plantId && plantSearchString) ||
                        (!plantSearchString && !plantGroupId && !customerId)
                          ? "borderRed"
                          : plantId
                            ? "borderGreen"
                            : ""
                      }`}
                      towardsTop
                    />
                    <LookupButton
                      onClick={() => {
                        setShowPlantLookup(true);
                      }}
                      disabled={plantGroupId || (customerId && !dpuCustomer)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="margin-box-1 form-group m-t-20 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "132px" }}>
                    <Form.Label className="col-form-label dealer-label">Plant Group</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0 d-flex" style={{ width: "400px" }}>
                    <AutoCompleteDropdown
                      arrayList={plantGroupData}
                      searchString={plantGroupSearchString}
                      fetchDataBySearchString={fetchPlantGroup}
                      loading={dropdownLoading}
                      renderItemField={(plantGroup) => plantGroup.description}
                      renderItemId={(plantGroup) => plantGroup.customerPlantGroupPK}
                      onSelect={handlePlantGroupSelection}
                      handleSearchString={(string) => {
                        dispatch(setPlantGroupSearchString(string));
                      }}
                      clearInputCallback={() => {
                        dispatch(setPlantGroupID(null));
                      }}
                      disabled={plantId || customerId}
                      selectedId={plantGroupId}
                      className={`${
                        (!plantGroupId && plantGroupSearchString) ||
                        (!plantGroupSearchString && !plantId && !customerId)
                          ? "borderRed"
                          : plantGroupId
                            ? "borderGreen"
                            : ""
                      }`}
                      towardsTop
                    />
                    <LookupButton
                      onClick={() => {
                        setShowPlantGroupLookup(true);
                      }}
                      disabled={plantId || customerId}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
          <CustomerLookup
            show={showCustomerLookup}
            handleLookupSelection={handleCustomerSelection}
            renderItemId={(customer) => customer.customerPK}
            customFetchFunction={fetchCustomerLookup}
            onHide={() => {
              setShowCustomerLookup(false);
            }}
          />
          <CustomerPlantsLookup
            show={showPlantLookup}
            handleLookupSelection={handlePlantSelection}
            renderItemId={(plant) => plant.customerPlantPK}
            onHide={() => {
              setShowPlantLookup(false);
            }}
            customFetchFunction={fetchPlantLookup}
          />
          <CustomerPlantGroupsLookup
            show={showPlantGroupLookup}
            handleLookupSelection={handlePlantGroupSelection}
            renderItemId={(plantGroup) => plantGroup.customerPlantGroupPK}
            onHide={() => {
              setShowPlantGroupLookup(false);
            }}
            customFetchFunction={fetchPlantGroupLookup}
          />
        </div>
      </div>
    </div>
  );
};

export default NewPageContent;
