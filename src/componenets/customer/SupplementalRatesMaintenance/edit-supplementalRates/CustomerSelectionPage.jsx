import { Formik } from "formik";
import React from "react";
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
  setCheckDpu,
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
} from "../../../../redux/SupplementalRatesSlice";
import SupplementalRatesService from "../../../../services/SupplementalRatesService";
import { useEffect } from "react";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantsLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import CustomerPlantGroupsLookup from "../../../LookupScreens/CustomerPlantGroups/CustomerPlantGroupsLookup";
import CustomerPlantGroupService from "../../../../services/CustomerPlantGroupService";
import CustomerGroupsLookup from "../../../LookupScreens/CustomerGroups/CustomerGroupsLookup";
import CustomerGroupService from "../../../../services/CustomerGroupService";
import CustomerPlantMaintenanceService from "../../../../services/CustomerPlantMaintenanceService";
import CustomerService from "../../../../services/CustomerService";

function CustomerSelectionPage() {
  const { supplementalRatesPK } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([]);
  const [pickupPlantDropdownData, setPickupPlantDropdownData] = useState([]);
  const [plantGroupDropdownData, setplantGroupDropdownData] = useState([]);
  const [customerGroupDropdownData, setcustomerGroupDropdownData] = useState([]);

  // Local loading states for each lookup
  const [customerLoading, setCustomerLoading] = useState(false);
  const [plantLoading, setPlantLoading] = useState(false);
  const [plantGroupLoading, setPlantGroupLoading] = useState(false);
  const [customerGroupLoading, setCustomerGroupLoading] = useState(false);

  const editFormData = useSelector((state) => state.supplementalRatesReducer.editFormData);

  const customerSelection = useSelector((state) => state.supplementalRatesReducer.customerSelection);
  const customerInput = useSelector((state) => state.supplementalRatesReducer.customerInput);
  const customerId = useSelector((state) => state.supplementalRatesReducer.customerId);
  const searchCriteria = useSelector((state) => state.supplementalRatesReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.supplementalRatesReducer.pageNumber);
  const customerPlantSelection = useSelector(
    (state) => state.supplementalRatesReducer.customerPlantSelection
  );
  const customerPlantGroupSelection = useSelector(
    (state) => state.supplementalRatesReducer.customerPlantGroupSelection
  );
  const customerPlantGroupInput = useSelector(
    (state) => state.supplementalRatesReducer.customerPlantGroupInput
  );
  const customerGroupSelection = useSelector(
    (state) => state.supplementalRatesReducer.customerGroupSelection
  );
  const customerGroupInput = useSelector((state) => state.supplementalRatesReducer.customerGroupInput);

  const viewDetail = useSelector((state) => state.supplementalRatesReducer.viewDetail);

  const customerPlantInput = useSelector((state) => state.supplementalRatesReducer.customerPlantInput);

  const customerPlantId = useSelector((state) => state.supplementalRatesReducer.customerPlantId);
  const customerGroupId = useSelector((state) => state.supplementalRatesReducer.customerGroupId);
  const customerPlantGroupId = useSelector((state) => state.supplementalRatesReducer.customerPlantGroupId);
  const checkDpu = useSelector((state) => state.supplementalRatesReducer.checkDpu);

  const pickupPlantModalHide = () => {
    dispatch(setCustomerPlantSelection(false));
  };

  const customerPlantGroupModalHide = () => {
    dispatch(setCustomerPlantGroupSelection(false));
  };
  const customerGroupModalHide = () => {
    dispatch(setCustomerGroupSelection(false));
  };

  window.addEventListener("popstate", () => {
    navigate("/supplemental-rates");
  });

  const fetchRecord = (supplementalRatesPK) => {
    SupplementalRatesService.getRecordById(supplementalRatesPK)
      .then((res) => {
        dispatch(setEditFormData(res?.data));
        dispatch(setViewDetail(true));
      })
      .catch((err) => {
        navigate("/supplemental-rates");
      });
  };

  const setCustomerValue = (customerId) => {
    if (customerId !== null) {
      setCustomerLoading(true); // Start loading
      CustomerService.getCustomerById(customerId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerInput(data?.name));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setCustomerLoading(false); // End loading
        });
    } else {
      dispatch(setCustomerInput(""));
    }
  };
  const fetchCustomerById = (customerId) => {
    if (customerId != null) {
      CustomerService.getCustomerById(customerId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCheckDpu(data?.dpuCustomer));
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {
    fetchCustomerById(customerId);
  }, [customerId, checkDpu]);

  const setPlantValue = (customerPlantId) => {
    if (customerPlantId !== null) {
      setPlantLoading(true); // Start loading
      CustomerPlantMaintenanceService.getcompleteCustomerPlantsById(customerPlantId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerPlantInput(data?.name));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPlantLoading(false); // End loading
        });
    } else {
      dispatch(setCustomerPlantInput(""));
    }
  };

  const setPlantGroupValue = (customerPlantGroupId) => {
    if (customerPlantGroupId !== null) {
      setPlantGroupLoading(true); // Start loading
      CustomerPlantGroupService.getRecord(customerPlantGroupId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerPlantGroupInput(data?.description));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPlantGroupLoading(false); // End loading
        });
    } else {
      dispatch(setCustomerPlantInput(""));
    }
  };

  const setCustomerGroupValue = (customerGroupId) => {
    if (customerGroupId !== null) {
      setCustomerGroupLoading(true); // Start loading
      CustomerGroupService.getRecord(customerGroupId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerGroupInput(data?.description));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setCustomerGroupLoading(false); // End loading
        });
    } else {
      dispatch(setCustomerPlantInput(""));
    }
  };

  const fetchCustomer = (string) => {
    setCustomerLoading(true); // Start loading
    SupplementalRatesService.fetchCustomerAutoComplete(string, searchCriteria, pageNumber)
      .then((response) => {
        const data = response?.data;
        const customerList = (data?.content || []).map((data) => ({ ...data, name: data?.name?.trim() }));
        setCustomerData(customerList);
      })
      .catch((err) => {})
      .finally(() => {
        setCustomerLoading(false); // End loading
      });
  };

  const fetchPickupPlantdetailsByName = (string) => {
    setPlantLoading(true); // Start loading
    CustomerPlantMaintenanceService.getAllPlantsByCustomerAuto(string)
      .then((response) => {
        const data = response?.data;
        const plantList = (data?.content || []).map((data) => ({ ...data, name: data?.name?.trim() }));
        setPickupPlantDropdownData(plantList);
      })
      .catch((err) => {})
      .finally(() => {
        setPlantLoading(false); // End loading
      });
  };

  const fetchPlantGroupdetailsByDes = (string) => {
    setPlantGroupLoading(true); // Start loading
    CustomerPlantGroupService.getCustomerPlantGroupForAuto(string)
      .then((response) => {
        const data = response?.data;
        const plantGroupList = (data?.content || []).map((data) => ({
          ...data,
          description: data?.description?.trim(),
        }));
        setplantGroupDropdownData(plantGroupList);
      })
      .catch((err) => {})
      .finally(() => {
        setPlantGroupLoading(false); // End loading
      });
  };

  const fetchCustomerGroupdetailsByDes = (string) => {
    setCustomerGroupLoading(true); // Start loading
    CustomerGroupService.getCustomerGroupForAuto(string)
      .then((response) => {
        const data = response?.data;
        const customerGroupList = (data?.content || []).map((data) => ({
          ...data,
          description: data?.description?.trim(),
        }));
        setcustomerGroupDropdownData(customerGroupList);
      })
      .catch((err) => {})
      .finally(() => {
        setCustomerGroupLoading(false); // End loading
      });
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
    dispatch(setCustomerInput(customer.name));
    dispatch(setCustomerId(customer.customerPK));
    dispatch(setCustomerSelection(false));
  };

  const handleCustomerPlantLookupSelection = (plant) => {
    dispatch(setCustomerPlantInput(plant.name));
    dispatch(setCustomerPlantId(plant.customerPlantPK));
    dispatch(setCustomerPlantSelection(false));
  };

  const handleCustomerPlantGroupLookupSelection = (plant) => {
    dispatch(setCustomerPlantGroupInput(plant.description));
    dispatch(setCustomerPlantGroupId(plant.customerPlantGroupPK));
    dispatch(setCustomerPlantGroupSelection(false));
  };
  const hideCustomerModel = () => {
    dispatch(setCustomerSelection(false));
  };

  const handlePlantGroupLookupSelection = (customer) => {
    dispatch(setCustomerPlantGroupInput(customer.description));
    dispatch(setCustomerPlantGroupId(customer.customerPlantGroupPK));
    dispatch(setCustomerPlantGroupSelection(false));
  };

  const handlecustomerGroupLookupSelection = (customer) => {
    dispatch(setCustomerGroupInput(customer.description));
    dispatch(setCustomerGroupId(customer.customerGroupPK));
    dispatch(setCustomerGroupSelection(false));
  };
  useEffect(() => {
    if (supplementalRatesPK) fetchRecord(supplementalRatesPK);
  }, [supplementalRatesPK, customerId]);
  useEffect(() => {
    if (editFormData === undefined) {
      dispatch(resetStates());
      dispatch(setCustomerInput(""));
      dispatch(setCustomerPlantInput(""));
      dispatch(setCustomerGroupInput(""));
      dispatch(setCustomerPlantGroupInput(""));

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

  useEffect(() => {
    dispatch(setEditFormData(undefined));
    dispatch(setCustomerInput(""));
  }, []);
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
        <div className="customContainer">
          <div
            className="add-form-component halfScreenWidth border border-dark border-2"
            style={{ margin: "1px" }}
          >
            <FormHeader />
            <div className="p-2">
              <div className="shadow-sm rounded border halfScreenFormContentHeight">
                <Col xs={6} md={6} sm={6}>
                  <Form.Group className="m-t-32  m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="ms-3 mt-5 text-start">
                      <Form.Label className=" col-form-label dealer-label m-l-0">Customer</Form.Label>
                    </Col>
                    <Col xs={7} md={5} sm={7} className="p-0  mt-5 d-flex">
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
                        selectedId={customerId}
                        disabled={viewDetail || customerPlantId || customerGroupId || customerPlantGroupId}
                        clearInputCallback={() => {
                          dispatch(setCustomerId(null));
                        }}
                        loading={customerLoading} // Pass loading state
                      />
                      <LookupButton
                        onClick={handleCustomerLookupModalShow}
                        disabled={viewDetail || customerPlantId || customerGroupId || customerPlantGroupId}
                        loading={customerLoading} // Pass loading state
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="m-t-32  m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="ms-3 mt-4 text-start">
                      <Form.Label className=" col-form-label dealer-label m-l-0">Plant</Form.Label>
                    </Col>

                    <Col xs={7} md={5} sm={7} className="p-0  mt-4 d-flex">
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
                        selectedId={customerPlantId}
                        clearInputCallback={() => {
                          dispatch(setCustomerPlantId(null));
                        }}
                        disabled={viewDetail || customerId || customerGroupId || customerPlantGroupId}
                        loading={plantLoading} // Pass loading state
                      />
                      <LookupButton
                        disabled={viewDetail || customerId || customerGroupId || customerPlantGroupId}
                        onClick={handleCustomerPlantLookupModalShow}
                        loading={plantLoading} // Pass loading state
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="m-t-32  m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="ms-3  mt-4 text-start">
                      <Form.Label className=" col-form-label dealer-label m-l-0">Plant Group</Form.Label>
                    </Col>

                    <Col xs={7} md={5} sm={7} className="p-0 mt-4 d-flex">
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
                        fetchDataBySearchString={fetchPlantGroupdetailsByDes}
                        onSelect={handleCustomerPlantGroupLookupSelection}
                        selectedId={customerPlantGroupId}
                        clearInputCallback={() => {
                          dispatch(setCustomerPlantGroupId(null));
                        }}
                        loading={plantGroupLoading} // Pass loading state
                      />
                      <LookupButton
                        onClick={handleCustomerPlantGroupLookupModalShow}
                        disabled={viewDetail || customerId || customerGroupId || customerPlantId}
                        loading={plantGroupLoading} // Pass loading state
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="m-t-32  m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="ms-3 mt-4 text-start">
                      <Form.Label className=" col-form-label dealer-label m-l-0">Customer Group</Form.Label>
                    </Col>

                    <Col xs={7} md={5} sm={7} className="p-0 mt-4 d-flex">
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
                        selectedId={customerGroupId}
                        clearInputCallback={() => {
                          dispatch(setCustomerGroupId(null));
                        }}
                        loading={customerGroupLoading} // Pass loading state
                      />
                      <LookupButton
                        onClick={handleCustomerGroupLookupModalShow}
                        disabled={viewDetail || customerId || customerPlantGroupId || customerPlantId}
                        loading={customerGroupLoading} // Pass loading state
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

                {/* Plant Lookup Modal */}
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
            <FormFooter />
          </div>
        </div>
      )}
    </Formik>
  );
}

export default CustomerSelectionPage;
