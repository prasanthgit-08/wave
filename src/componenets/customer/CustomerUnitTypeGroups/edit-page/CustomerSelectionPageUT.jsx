import { Formik } from "formik";
import React from "react";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import FormFooter from "./FormFooter";
import FormHeader from "./FormHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  resetStates,
  setCustomerGroupId,
  setCustomerGroupInput,
  setCustomerGroupSelection,
  setCustomerId,
  setCustomerInput,
  setCustomerPlantGroupId,
  setCustomerPlantGroupInput,
  setCustomerPlantGroupSelection,
  setCustomerPlantId,
  setCustomerPlantInput,
  setCustomerPlantSelection,
  setCustomerSelection,
  setEditFormData,
  setViewDetail,
} from "../../../../redux/CustomerUnitTypeGroupSlice";
import SupplementalRatesService from "../../../../services/SupplementalRatesService";
import { useEffect } from "react";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantsLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import OrderEntryService from "../../../../services/OrderEntryService";
import CustomerPlantGroupsLookup from "../../../LookupScreens/CustomerPlantGroups/CustomerPlantGroupsLookup";
import CustomerPlantGroupService from "../../../../services/CustomerPlantGroupService";
import CustomerGroupsLookup from "../../../LookupScreens/CustomerGroups/CustomerGroupsLookup";

import CustomerPlantMaintenanceService from "../../../../services/CustomerPlantMaintenanceService";
import CustomerService from "../../../../services/CustomerService";
import CustomerGroupService from "../../../../services/CustomerGroupService";

function CustomerSelectionPageUT() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([]);
  const [pickupPlantDropdownData, setPickupPlantDropdownData] = useState([]);
  const [plantGroupDropdownData, setplantGroupDropdownData] = useState([]);
  const [customerGroupDropdownData, setcustomerGroupDropdownData] = useState([]);

  const editFormData = useSelector((state) => state.customerUnitTypeGroupReducer.editFormData);

  const customerSelection = useSelector((state) => state.customerUnitTypeGroupReducer.customerSelection);
  const customerInput = useSelector((state) => state.customerUnitTypeGroupReducer.customerInput);
  const customerId = useSelector((state) => state.customerUnitTypeGroupReducer.customerId);
  const searchCriteria = useSelector((state) => state.customerUnitTypeGroupReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.customerUnitTypeGroupReducer.pageNumber);
  const customerPlantSelection = useSelector(
    (state) => state.customerUnitTypeGroupReducer.customerPlantSelection
  );
  const customerPlantGroupSelection = useSelector(
    (state) => state.customerUnitTypeGroupReducer.customerPlantGroupSelection
  );
  const customerPlantGroupInput = useSelector(
    (state) => state.customerUnitTypeGroupReducer.customerPlantGroupInput
  );
  const customerGroupSelection = useSelector(
    (state) => state.customerUnitTypeGroupReducer.customerGroupSelection
  );
  const customerGroupInput = useSelector((state) => state.customerUnitTypeGroupReducer.customerGroupInput);

  const viewDetail = useSelector((state) => state.customerUnitTypeGroupReducer.viewDetail);

  const customerPlantInput = useSelector((state) => state.customerUnitTypeGroupReducer.customerPlantInput);

  const customerPlantId = useSelector((state) => state.customerUnitTypeGroupReducer.customerPlantId);
  const customerGroupId = useSelector((state) => state.customerUnitTypeGroupReducer.customerGroupId);
  const customerPlantGroupId = useSelector(
    (state) => state.customerUnitTypeGroupReducer.customerPlantGroupId
  );

  const pickupPlantModalHide = () => {
    dispatch(setCustomerPlantSelection(false));
  };

  const customerPlantGroupModalHide = () => {
    dispatch(setCustomerPlantGroupSelection(false));
  };
  const customerGroupModalHide = () => {
    dispatch(setCustomerGroupSelection(false));
  };

  const setCustomerValue = (customerId) => {
    if (customerId !== null) {
      CustomerService.getCustomerById(customerId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerInput(data?.name?.trim()));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setCustomerInput(""));
    }
  };

  const setPlantValue = (customerPlantId) => {
    if (customerPlantId !== null) {
      CustomerPlantMaintenanceService.getcompleteCustomerPlantsById(customerPlantId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerPlantInput(data?.name?.trim()));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setCustomerPlantInput(""));
    }
  };

  const setPlantGroupValue = (customerPlantGroupId) => {
    if (customerPlantGroupId !== null) {
      CustomerPlantGroupService.getRecord(customerPlantGroupId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerPlantGroupInput(data?.description?.trim()));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setCustomerPlantInput(""));
    }
  };

  const setCustomerGroupValue = (customerGroupId) => {
    if (customerGroupId !== null) {
      CustomerGroupService.getRecord(customerGroupId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerGroupInput(data?.description?.trim()));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setCustomerGroupInput(""));
    }
  };

  const fetchCustomer = (string) => {
    SupplementalRatesService.fetchCustomerAutoComplete(string, searchCriteria, pageNumber)
      .then((response) => {
        const data = response?.data?.content;
        const customerList = data?.map((customer) => ({
          ...customer,
          description: customer.name?.trim(),
        }));
        setCustomerData(customerList);
      })
      .catch((err) => {});
  };

  const fetchPickupPlantdetailsByName = (string) => {
    CustomerPlantMaintenanceService.getAllPlantsByCustomerAuto(string)
      .then((response) => {
        const data = response?.data?.content;
        const plantList = data?.map((plant) => ({
          ...plant,
          description: plant.name?.trim(),
        }));
        setPickupPlantDropdownData(plantList);
      })
      .catch((err) => {});
  };

  const fetchPlantGroupdetailsByDes = (string) => {
    CustomerPlantGroupService.getCustomerPlantGroupForAuto(string)
      .then((response) => {
        const data = response?.data?.content;
        const plantGroupList = data?.map((plant) => ({
          ...plant,
          description: plant.description?.trim(),
        }));
        setplantGroupDropdownData(plantGroupList);
      })
      .catch((err) => {});
  };

  const fetchCustomerGroupdetailsByDes = (string) => {
    CustomerGroupService.getCustomerGroupForAuto(string)
      .then((response) => {
        const data = response?.data?.content;
        const customeGroupList = data?.map((customer) => ({
          ...customer,
          description: customer.description?.trim(),
        }));
        setcustomerGroupDropdownData(customeGroupList);
      })
      .catch((err) => {});
  };

  const handleCustomerLookupModalShow = () => {
    dispatch(setCustomerSelection(true));
  };

  const handleCustomerPlantLookupModalShow = () => {
    dispatch(setCustomerPlantSelection(true));
  };
  const handleCustomerPlantGroupLookupModalShow = () => {
    dispatch(setCustomerPlantGroupSelection(true));
  };
  const handleCustomerGroupLookupModalShow = () => {
    dispatch(setCustomerGroupSelection(true));
  };

  const handleCustomerLookupSelection = (customer) => {
    dispatch(setCustomerInput(customer.name?.trim()));
    dispatch(setCustomerId(customer.customerPK));

    dispatch(setCustomerSelection(false));
  };

  const handleCustomerPlantLookupSelection = (plant) => {
    dispatch(setCustomerPlantInput(plant.name?.trim()));
    dispatch(setCustomerPlantId(plant.customerPlantPK));

    dispatch(setCustomerPlantSelection(false));
  };

  const handleCustomerPlantGroupLookupSelection = (plant) => {
    dispatch(setCustomerPlantGroupInput(plant.description?.trim()));
    dispatch(setCustomerPlantGroupId(plant.customerPlantGroupPK));

    dispatch(setCustomerPlantGroupSelection(false));
  };

  const hideCustomerModel = () => {
    dispatch(setCustomerSelection(false));
  };

  const handlePlantGroupLookupSelection = (customer) => {
    dispatch(setCustomerPlantGroupInput(customer.description?.trim()));
    dispatch(setCustomerPlantGroupId(customer.customerPlantGroupPK));

    dispatch(setCustomerPlantGroupSelection(false));
  };

  const handlecustomerGroupLookupSelection = (customer) => {
    dispatch(setCustomerGroupInput(customer.description?.trim()));
    dispatch(setCustomerGroupId(customer.customerGroupPK));
    dispatch(setCustomerGroupSelection(false));
  };

  useEffect(() => {
    dispatch(setCustomerInput(""));
  }, []);

  useEffect(() => {
    dispatch(setEditFormData(undefined));
  }, []);
  useEffect(() => {
    if (editFormData === undefined) {
      dispatch(setCustomerInput(""));
      dispatch(setCustomerPlantInput(""));
      dispatch(setCustomerGroupInput(""));
      dispatch(setCustomerPlantGroupInput(""));
      dispatch(resetStates());
      dispatch(setCustomerId(null));
      dispatch(setCustomerPlantId(null));
      dispatch(setCustomerPlantGroupId(null));
      dispatch(setCustomerGroupId(null));
    }
    if (editFormData != null) {
      dispatch(setCustomerId(editFormData?.customerId || null));
      setCustomerValue(editFormData?.customerId);
      dispatch(setCustomerPlantId(editFormData?.customerPlantId || null));

      setPlantValue(editFormData?.customerPlantId);
      dispatch(setCustomerPlantGroupId(editFormData?.customerPlantGroupId || null));

      setPlantGroupValue(editFormData?.customerPlantGroupId);
      dispatch(setCustomerGroupId(editFormData?.customerGroupId || null));

      setCustomerGroupValue(editFormData?.customerGroupId);
    }
  }, [editFormData, viewDetail]);

  useEffect(() => {
    if (customerId != null) {
      dispatch(setCustomerPlantGroupId(null));
      dispatch(setCustomerGroupId(null));
      dispatch(setCustomerPlantId(null));
      dispatch(setCustomerPlantGroupInput(""));
      dispatch(setCustomerGroupInput(""));
      dispatch(setCustomerPlantInput(""));
    } else if (customerPlantId != null) {
      dispatch(setCustomerId(null));
      dispatch(setCustomerInput(""));
      dispatch(setCustomerPlantGroupId(null));
      dispatch(setCustomerPlantGroupInput(""));
      dispatch(setCustomerGroupId(null));
      dispatch(setCustomerGroupInput(""));
    } else if (customerPlantGroupId != null) {
      dispatch(setCustomerId(null));
      dispatch(setCustomerInput(""));
      dispatch(setCustomerPlantId(null));
      dispatch(setCustomerGroupId(null));
      dispatch(setCustomerGroupInput(""));
      dispatch(setCustomerPlantInput(""));
    } else if (customerGroupId != null) {
      dispatch(setCustomerId(null));
      dispatch(setCustomerInput(""));
      dispatch(setCustomerPlantId(null));
      dispatch(setCustomerPlantGroupId(null));
      dispatch(setCustomerPlantGroupInput(""));
      dispatch(setCustomerPlantInput(""));
    }
  }, [
    customerId,
    customerPlantId,
    customerPlantGroupId,
    customerGroupId,
    customerInput,
    customerPlantGroupInput,
    customerGroupInput,
    customerPlantInput,
  ]);
  return (
    <Formik
      initialValues={{}}
      validationSchema={""}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        miles: true,
        towableShuttleFee: true,
      }}
    >
      {(formik) => (
        <div className="table-bordered customContainer">
          <div className="border border-dark border-2 quarterScreenWidth">
            <FormHeader />
            <div className="border border-dark border-2 border-right-0 border-left-0 ">
              <div className="shadow-sm rounded border groupsMaintenanceQuarterScreenHeight">
                <div className="p-15 w-100 ">
                  <Col xs={6} md={6} sm={6}>
                    <Form.Group
                      className="margin-box-5 form-group m-t-5 m-b-10 align-items-center d-flex tabs-row m-l-0 m-r-0"
                      style={{ height: "60px" }}
                    >
                      <div className="p-0 w-225px">
                        <Form.Label className="col-form-label dealer-label m-l-0">Customer</Form.Label>
                      </div>

                      <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                        <AutoCompleteDropdown
                          className={`${
                            !viewDetail &&
                            ((!customerId && !customerPlantGroupId && !customerPlantId && !customerGroupId) ||
                              (!customerId && customerInput))
                              ? "borderRed"
                              : viewDetail || customerPlantId || customerGroupId || customerPlantGroupId
                                ? ""
                                : "borderGreen"
                          }`}
                          arrayList={customerData}
                          searchString={customerInput}
                          handleSearchString={(string) => dispatch(setCustomerInput(string))}
                          fetchDataBySearchString={fetchCustomer}
                          renderItemId={(customer) => customer.customerPK}
                          renderItemField={(customer) => customer.name}
                          onSelect={handleCustomerLookupSelection}
                          disabled={viewDetail || customerPlantId || customerGroupId || customerPlantGroupId}
                          clearInputCallback={() => {
                            dispatch(setCustomerId(null));
                          }}
                          selectedId={customerId}
                        />
                        <LookupButton
                          onClick={handleCustomerLookupModalShow}
                          disabled={viewDetail || customerPlantId || customerGroupId || customerPlantGroupId}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className="margin-box-5 form-group m-t-5 m-b-10 align-items-center d-flex tabs-row m-l-0 m-r-0"
                      style={{ height: "60px" }}
                    >
                      <div className="p-0 w-225px">
                        <Form.Label className="col-form-label dealer-label m-l-0 ">Plant</Form.Label>
                      </div>

                      <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                        {/* Plant Autocomplete */}
                        <AutoCompleteDropdown
                          className={`${
                            !viewDetail &&
                            ((!customerId && !customerPlantGroupId && !customerPlantId && !customerGroupId) ||
                              (!customerPlantId && customerPlantInput))
                              ? "borderRed"
                              : viewDetail || customerId || customerGroupId || customerPlantGroupId
                                ? ""
                                : "borderGreen"
                          }`}
                          arrayList={pickupPlantDropdownData}
                          searchString={customerPlantInput}
                          renderItemId={(plant) => plant.customerPlantPK}
                          renderItemField={(plant) => plant.name}
                          handleSearchString={(string) => dispatch(setCustomerPlantInput(string))}
                          fetchDataBySearchString={fetchPickupPlantdetailsByName}
                          onSelect={handleCustomerPlantLookupSelection}
                          clearInputCallback={() => {
                            dispatch(setCustomerPlantId(null));
                          }}
                          selectedId={customerPlantId}
                          disabled={viewDetail || customerId || customerGroupId || customerPlantGroupId}
                        />
                        <LookupButton
                          disabled={viewDetail || customerId || customerGroupId || customerPlantGroupId}
                          onClick={handleCustomerPlantLookupModalShow}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className="margin-box-5 form-group m-t-5 m-b-10 align-items-center d-flex tabs-row m-l-0 m-r-0"
                      style={{ height: "60px" }}
                    >
                      <div className="p-0 w-225px">
                        <Form.Label className="col-form-label dealer-label m-l-0">Plant Group</Form.Label>
                      </div>

                      <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                        {/* Plant Group Autocomplete */}
                        <AutoCompleteDropdown
                          className={`${
                            !viewDetail &&
                            ((!customerId && !customerPlantGroupId && !customerPlantId && !customerGroupId) ||
                              (!customerPlantGroupId && customerPlantGroupInput))
                              ? "borderRed"
                              : viewDetail || customerId || customerGroupId || customerPlantId
                                ? ""
                                : "borderGreen"
                          }`}
                          arrayList={plantGroupDropdownData}
                          searchString={customerPlantGroupInput}
                          renderItemId={(plant) => plant.customerPlantGroupPK}
                          disabled={viewDetail || customerId || customerGroupId || customerPlantId}
                          renderItemField={(plant) => plant.description}
                          handleSearchString={(string) => dispatch(setCustomerPlantGroupInput(string))}
                          selectedId={customerPlantGroupId}
                          fetchDataBySearchString={fetchPlantGroupdetailsByDes}
                          onSelect={handleCustomerPlantGroupLookupSelection}
                          clearInputCallback={() => {
                            dispatch(setCustomerPlantGroupId(null));
                          }}
                        />
                        <LookupButton
                          onClick={handleCustomerPlantGroupLookupModalShow}
                          disabled={viewDetail || customerId || customerGroupId || customerPlantId}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className="margin-box-5 form-group m-t-5 m-b-10 align-items-center d-flex tabs-row m-l-0 m-r-0"
                      style={{ height: "60px" }}
                    >
                      <div className="p-0 w-225px">
                        <Form.Label className="col-form-label dealer-label m-l-0">Customer Group</Form.Label>
                      </div>

                      <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                        {/* Customer Group Autocomplete */}
                        <AutoCompleteDropdown
                          className={`${
                            !viewDetail &&
                            ((!customerId && !customerPlantGroupId && !customerPlantId && !customerGroupId) ||
                              (!customerGroupId && customerGroupInput))
                              ? "borderRed"
                              : viewDetail || customerId || customerPlantGroupId || customerPlantId
                                ? ""
                                : "borderGreen"
                          }`}
                          arrayList={customerGroupDropdownData}
                          searchString={customerGroupInput}
                          renderItemId={(customer) => customer.customerGroupPK}
                          disabled={viewDetail || customerId || customerPlantGroupId || customerPlantId}
                          renderItemField={(customer) => customer.description}
                          handleSearchString={(string) => dispatch(setCustomerGroupInput(string))}
                          fetchDataBySearchString={fetchCustomerGroupdetailsByDes}
                          onSelect={handlecustomerGroupLookupSelection}
                          clearInputCallback={() => {
                            dispatch(setCustomerGroupId(null));
                          }}
                          selectedId={customerGroupId}
                          towardsTop
                        />
                        <LookupButton
                          onClick={handleCustomerGroupLookupModalShow}
                          disabled={viewDetail || customerId || customerPlantGroupId || customerPlantId}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <CustomerLookup
                    show={customerSelection}
                    onHide={hideCustomerModel}
                    renderItemId={(customer) => customer.customerPK}
                    renderItemField={(customer) => customer.name}
                    handleLookupSelection={handleCustomerLookupSelection}
                    MaintenanceProgram
                  />

                  {/*  Plant Lookup Modal */}
                  <CustomerPlantsLookup
                    show={customerPlantSelection}
                    onHide={pickupPlantModalHide}
                    renderItemId={(plant) => plant.customerPlantPK}
                    handleLookupSelection={handleCustomerPlantLookupSelection}
                    MaintenanceProgram
                  />
                  <CustomerPlantGroupsLookup
                    show={customerPlantGroupSelection}
                    onHide={customerPlantGroupModalHide}
                    renderItemId={(plant) => plant.customerPlantGroupPK}
                    handleLookupSelection={handlePlantGroupLookupSelection}
                    MaintenanceProgram
                  />

                  <CustomerGroupsLookup
                    show={customerGroupSelection}
                    onHide={customerGroupModalHide}
                    renderItemId={(customer) => customer.customerGroupPK}
                    handleLookupSelection={handlecustomerGroupLookupSelection}
                    MaintenanceProgram
                  />
                </div>
              </div>
            </div>
            <FormFooter />
          </div>
        </div>
      )}
    </Formik>
  );
}

export default CustomerSelectionPageUT;
