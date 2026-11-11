import { Formik } from "formik";
import React from "react";
import { Col, Form, FormGroup, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";

import CustomerRatesService from "../../../../services/CustomerRatesService";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantsLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import CustomerPlantGroupsLookup from "../../../LookupScreens/CustomerPlantGroups/CustomerPlantGroupsLookup";
import CustomerGroupsLookup from "../../../LookupScreens/CustomerGroups/CustomerGroupsLookup";
import CustomerUnitTypeGroupLookup from "../../../LookupScreens/CustomerUnitTypeGroup/CustomerUnitTypeGroupLookup";
import CustomerService from "../../../../services/CustomerService";
import CustomerGroupService from "../../../../services/CustomerGroupService";
import CustomerPlantGroupService from "../../../../services/CustomerPlantGroupService";
import CustomerPlantMaintenanceService from "../../../../services/CustomerPlantMaintenanceService";
import CustomerUnitTypeGroupsService from "../../../../services/CustomerUnitTypeGroupsService";
import {
  resetStates,
  setCustomerFK,
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
  setCustomerRatesData,
  setCustomerSelection,
  setCustomerUnitTypeGroupId,
  setCustomerUnitTypeGroupInput,
  setCustomerUnitTypeGroupSelection,
  setEditFormData,
  setIsCustomerRateLoading,
  setIsSelectedDuplicate,
  setViewDetail,
} from "../../../../redux/CustomerRatesSlice";
import { changeLanguage } from "i18next";
function CustomerAddSelectionPage() {
  const { customerRatePK } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customerDropdownData, setCustomerDropdownData] = useState([]);
  const [pickupPlantDropdownData, setPickupPlantDropdownData] = useState([]);
  const [plantGroupDropdownData, setplantGroupDropdownData] = useState([]);
  const [customerGroupDropdownData, setcustomerGroupDropdownData] = useState([]);
  const [customerUnitTypeGroupdata, setCustomerUnitTypeGroupdata] = useState([]);
  const [unitTypeGroupPKS, setUnitTypeGroupPKS] = useState([]);

  const viewDetail = useSelector((state) => state.customerRatesReducer.viewDetail);
  const editFormData = useSelector((state) => state.customerRatesReducer.editFormData);
  const pageNumber = useSelector((state) => state.customerRatesReducer.pageNumber);
  const searchCriteria = useSelector((state) => state.customerRatesReducer.searchCriteria);
  const customerId = useSelector((state) => state.customerRatesReducer.customerId);
  const customerInput = useSelector((state) => state.customerRatesReducer.customerInput);
  const customerSelection = useSelector((state) => state.customerRatesReducer.customerSelection);
  const customerPlantId = useSelector((state) => state.customerRatesReducer.customerPlantId);
  const customerPlantInput = useSelector((state) => state.customerRatesReducer.customerPlantInput);
  const customerPlantSelection = useSelector((state) => state.customerRatesReducer.customerPlantSelection);
  const customerPlantGroupId = useSelector((state) => state.customerRatesReducer.customerPlantGroupId);
  const customerPlantGroupInput = useSelector((state) => state.customerRatesReducer.customerPlantGroupInput);
  const customerPlantGroupSelection = useSelector(
    (state) => state.customerRatesReducer.customerPlantGroupSelection
  );
  const customerGroupSelection = useSelector((state) => state.customerRatesReducer.customerGroupSelection);
  const customerGroupId = useSelector((state) => state.customerRatesReducer.customerGroupId);
  const customerGroupInput = useSelector((state) => state.customerRatesReducer.customerGroupInput);
  const customerUnitTypeGroupSelection = useSelector(
    (state) => state.customerRatesReducer.customerUnitTypeGroupSelection
  );
  const customerUnitTypeGroupId = useSelector((state) => state.customerRatesReducer.customerUnitTypeGroupId);
  const customerUnitTypeGroupInput = useSelector(
    (state) => state.customerRatesReducer.customerUnitTypeGroupInput
  );
  const customerRatesData = useSelector((state) => state.customerRatesReducer.customerRatesData);
  const isCustomerRateLoading = useSelector((state) => state.customerRatesReducer.isCustomerRateLoading);
  const isSelectedDuplicate = useSelector((state) => state.customerRatesReducer.isSelectedDuplicate);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [plantLoading, setPlantLoading] = useState(false);
  const [plantGroupLoading, setPlantGroupLoading] = useState(false);
  const [customerGroupLoading, setCustomerGroupLoading] = useState(false);
  const [unitTypeLoading, setUnitTypeLoading] = useState(false);

  const customerModalHide = () => {
    dispatch(setCustomerSelection(false));
  };
  const pickupPlantModalHide = () => {
    dispatch(setCustomerPlantSelection(false));
  };

  const customerPlantGroupModalHide = () => {
    dispatch(setCustomerPlantGroupSelection(false));
  };
  const customerGroupModalHide = () => {
    dispatch(setCustomerGroupSelection(false));
  };
  const customerunitTypeGroupModalHide = () => {
    dispatch(setCustomerUnitTypeGroupSelection(false));
  };
  const fetchRecord = (customerRatePK) => {
    CustomerRatesService.getRecordById(customerRatePK)
      .then((res) => {
        dispatch(setEditFormData(res?.data));
        dispatch(setViewDetail(true));
      })
      .catch((err) => {
        navigate(`/customer-rates`);
      });
  };

  /* AutoComplete for Customer,Customer Plant,Customer Plant Group,Customer Group,Customer Unit Type Group */
  const fetchCustomer = (string) => {
    setCustomerLoading(true);
    CustomerRatesService.fetchCustomerAutoComplete(string, searchCriteria, pageNumber)
      .then((response) => {
        const data = response?.data;
        const customerList = (data?.content || []).map((data) => ({ ...data, name: data?.name?.trim() }));
        setCustomerDropdownData(customerList);
        setCustomerLoading(false);
      })
      .catch((err) => {
        setCustomerLoading(false);
      });
  };
  const fetchPlantdetailsByName = (string) => {
    setPlantLoading(true);
    CustomerPlantMaintenanceService.getAllPlantsByCustomerAuto(string)
      .then((response) => {
        const data = response?.data;
        const plantList = (data?.content || []).map((data) => ({ ...data, name: data?.name?.trim() }));
        setPickupPlantDropdownData(plantList);
        setPlantLoading(false);
      })
      .catch((err) => {
        setPlantLoading(false);
      });
  };
  const fetchPlantGroupdetailsByDesc = (string) => {
    setPlantGroupLoading(true);
    CustomerPlantGroupService.getCustomerPlantGroupForAuto(string)
      .then((response) => {
        const data = response?.data;
        const plantGroupList = (data?.content || []).map((data) => ({
          ...data,
          description: data?.description?.trim(),
        }));
        setplantGroupDropdownData(plantGroupList);
        setPlantGroupLoading(false);
      })
      .catch((err) => {
        setPlantGroupLoading(false);
      });
  };
  const fetchCustomerGroupdetailsByDesc = (string) => {
    setCustomerGroupLoading(true);
    CustomerGroupService.getCustomerGroupForAuto(string)
      .then((response) => {
        const data = response?.data;
        const customerGroupList = (data?.content || []).map((data) => ({
          ...data,
          description: data?.description?.trim(),
        }));
        setcustomerGroupDropdownData(customerGroupList);
        setCustomerGroupLoading(false);
      })
      .catch((err) => {
        setCustomerGroupLoading(false);
      });
  };
  const fetchCustomerUnitTypeGroup = (string) => {
    setUnitTypeLoading(true);
    CustomerUnitTypeGroupsService.getCustomerUnitTypeGroupForAuto(
      string,
      customerId,
      customerPlantId,
      customerPlantGroupId,
      customerGroupId,
      true
    )
      .then((response) => {
        const data = response?.data;
        const customerUnitTypeGroupList = (data?.content || []).map((data) => ({
          ...data,
          description: data?.description?.trim(),
        }));
        setCustomerUnitTypeGroupdata(customerUnitTypeGroupList);
        const customerunittypegroupPKs = (data?.content || []).map((item) => item.customerunittypegroupPK);
        setUnitTypeGroupPKS(customerunittypegroupPKs);
        setUnitTypeLoading(false);
      })
      .catch((err) => {
        setUnitTypeLoading(false);
      });
  };
  /******Set the Input value from the Customer,Customer Plant,
   * Plant Group,Customer Unit Type Group */

  const setCustomerValue = (customerId) => {
    if (customerId !== undefined) {
      CustomerService.getCustomerById(customerId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerInput(data?.name));
        })

        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setCustomerInput(""));
    }
  };
  const setPlantValue = (customerPlantId) => {
    if (customerPlantId !== undefined) {
      CustomerPlantMaintenanceService.getcompleteCustomerPlantsById(customerPlantId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerPlantInput(data?.name));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setCustomerPlantInput(""));
    }
  };
  const setPlantGroupValue = (customerPlantGroupId) => {
    if (customerPlantGroupId !== undefined) {
      CustomerPlantGroupService.getRecord(customerPlantGroupId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerPlantGroupInput(data?.description));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setCustomerPlantGroupInput(""));
    }
  };
  const setCustomerGroupValue = (customerGroupId) => {
    if (customerGroupId !== undefined) {
      CustomerGroupService.getRecord(customerGroupId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerGroupInput(data?.description));
        })
        .catch((err) => {});
    } else {
      dispatch(setCustomerGroupInput(""));
    }
  };
  const setCustomerUnitTypeGroupValue = (customerUnitTypeGroupId) => {
    if (customerUnitTypeGroupId !== undefined) {
      CustomerUnitTypeGroupsService.getRecord(customerUnitTypeGroupId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerUnitTypeGroupInput(data?.description));
        })
        .catch((err) => {});
    } else {
      dispatch(setCustomerUnitTypeGroupInput(""));
    }
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

  const handleCustomerUnitTypeGroupLookupModalShow = () => {
    dispatch(setCustomerUnitTypeGroupSelection(true));
  };
  /**Set the Customer,Plant,Plant Group,Customer Group,Customer Unit Type Group
   *  and also the Customer FK for finding the Invoice percentage */
  const handleCustomerLookupSelection = (customer) => {
    dispatch(setCustomerInput(customer.name));
    dispatch(setCustomerId(customer.customerPK));
    dispatch(setCustomerFK(customer.customerPK));

    dispatch(setCustomerSelection(false));
  };
  const handleCustomerPlantLookupSelection = (plant) => {
    dispatch(setCustomerPlantInput(plant.name));
    dispatch(setCustomerPlantId(plant.customerPlantPK));
    dispatch(setCustomerFK(plant.customerFK));
    dispatch(setCustomerPlantSelection(false));
  };
  const handleCustomerPlantGroupLookupSelection = (plant) => {
    dispatch(setCustomerPlantGroupInput(plant.description));
    dispatch(setCustomerPlantGroupId(plant.customerPlantGroupPK));
    dispatch(setCustomerFK(plant.customerfk.customerPK));
    dispatch(setCustomerPlantGroupSelection(false));
  };
  const handlecustomerGroupLookupSelection = (customer) => {
    dispatch(setCustomerGroupInput(customer.description));
    dispatch(setCustomerGroupId(customer.customerGroupPK));
    dispatch(setCustomerGroupSelection(false));
  };
  const handlecustomerUnitTypeGroupLookupSelection = (unitType) => {
    dispatch(setCustomerUnitTypeGroupInput(unitType.description));
    dispatch(setCustomerUnitTypeGroupId(unitType.customerunittypegroupPK));
    dispatch(setCustomerUnitTypeGroupSelection(false));
  };
  useEffect(() => {
    if (customerRatePK) fetchRecord(customerRatePK);
  }, [customerRatePK, customerId]);
  useEffect(() => {
    if (editFormData === undefined) {
      dispatch(resetStates());
      dispatch(setCustomerInput(""));
      dispatch(setCustomerPlantInput(""));
      dispatch(setCustomerGroupInput(""));
      dispatch(setCustomerPlantGroupInput(""));
      dispatch(setCustomerUnitTypeGroupInput(""));

      dispatch(setCustomerId(null));
      dispatch(setCustomerPlantId(null));
      dispatch(setCustomerPlantGroupId(null));
      dispatch(setCustomerGroupId(null));
      dispatch(setCustomerUnitTypeGroupId(null));
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
      dispatch(setCustomerUnitTypeGroupId(editFormData?.customerUnitTypeGroupId || null));
      setCustomerUnitTypeGroupValue(editFormData?.customerUnitTypeGroupId);
    }
  }, [editFormData, viewDetail]);
  useEffect(() => {
    if (customerId != null) {
      dispatch(setCustomerPlantId(null));
      dispatch(setCustomerPlantInput(""));
      dispatch(setCustomerPlantGroupId(null));
      dispatch(setCustomerPlantGroupInput(""));
      dispatch(setCustomerGroupId(null));
      dispatch(setCustomerGroupInput(""));
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
      dispatch(setCustomerPlantInput(""));
      dispatch(setCustomerGroupId(null));
      dispatch(setCustomerGroupInput(""));
    } else if (customerGroupId != null) {
      dispatch(setCustomerId(null));
      dispatch(setCustomerInput(""));
      dispatch(setCustomerPlantId(null));
      dispatch(setCustomerPlantInput(""));
      dispatch(setCustomerPlantGroupId(null));
      dispatch(setCustomerPlantGroupInput(""));
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
  /**To check whether duplicate Customer or Customer Plant or Customer
   * Plant Group or Customer Group selected without CUstomer Unit Type Group */
  useEffect(() => {
    if (customerId != null && customerUnitTypeGroupId === null) {
      CustomerRatesService.checkDuplicateCustomerExist(customerRatePK, customerId)
        .then((res) => {
          dispatch(setIsSelectedDuplicate(res?.data));
        })
        .catch((err) => {
          console.log("error");
        });
    } else if (customerPlantId != null && customerUnitTypeGroupId === null) {
      CustomerRatesService.checkDuplicateCustomerPlantExist(customerRatePK, customerPlantId)
        .then((res) => {
          dispatch(setIsSelectedDuplicate(res?.data));
        })
        .catch((err) => {
          console.log("error");
        });
    } else if (customerPlantGroupId != null && customerUnitTypeGroupId === null) {
      CustomerRatesService.checkDuplicateCustomerPlantGroupExist(customerRatePK, customerPlantGroupId)
        .then((res) => {
          dispatch(setIsSelectedDuplicate(res?.data));
        })
        .catch((err) => {
          console.log("error");
        });
    } else if (customerGroupId != null && customerUnitTypeGroupId === null) {
      CustomerRatesService.checkDuplicateCustomerGroupExist(customerRatePK, customerGroupId)
        .then((res) => {
          dispatch(setIsSelectedDuplicate(res?.data));
        })
        .catch((err) => {
          console.log("error");
        });
    }
  }, [
    customerId,
    customerPlantId,
    customerPlantGroupId,
    customerGroupId,
    customerUnitTypeGroupId,
    isSelectedDuplicate,
  ]);

  /**Set the duplicate flag false if both Customer-CustomerUnitTypeGrp or
   * plant-CustomerUnitTypeGrp or PlantGroup-CustomerUnitTypeGrp or
   * CustomerGroup-CustomerUnitTypeGrp is selected*/
  useEffect(() => {
    if (
      (customerId && customerUnitTypeGroupId) ||
      (customerPlantId && customerUnitTypeGroupId) ||
      (customerPlantGroupId && customerUnitTypeGroupId) ||
      (customerGroupId && customerUnitTypeGroupId)
    )
      dispatch(setIsSelectedDuplicate(false));
  }, [customerId, customerPlantId, customerPlantGroupId, customerGroupId, customerUnitTypeGroupId]);
  /**Set the duplicate flag false if no input  */
  useEffect(() => {
    if (!customerId && !customerPlantId && !customerPlantGroupId && !customerGroupId)
      dispatch(setIsSelectedDuplicate(false));
  }, [customerId, customerPlantId, customerPlantGroupId, customerGroupId]);

  useEffect(() => {
    dispatch(setEditFormData(undefined));
    dispatch(setCustomerInput(""));
  }, []);
  /***Fetch the Customer Unit Type group for the selected Customer,
   * Customer Plant,Customer Plant group,Customer Group */
  useEffect(() => {
    fetchCustomerUnitTypeGroup();
  }, [customerId, customerPlantId, customerPlantGroupId, customerGroupId]);

  useEffect(() => {
    dispatch(setCustomerUnitTypeGroupId(null));
    dispatch(setCustomerUnitTypeGroupInput(""));
  }, [customerId, customerPlantId, customerPlantGroupId, customerGroupId]);

  useEffect(() => {
    if (
      customerId == null ||
      customerPlantId == null ||
      customerPlantGroupId == null ||
      customerGroupId == null
    )
      dispatch(setCustomerUnitTypeGroupId(null));
    dispatch(setCustomerUnitTypeGroupInput(""));
  }, [customerId, customerPlantId, customerPlantGroupId, customerGroupId]);
  /**Setting the Customer Rates Form Data by the Id of Selected Customer,Customer Plant,
   * Customer Group,Customer Unit Type Group */
  const customerSelectionFormData = () => {
    dispatch(
      setCustomerRatesData({
        customerId: customerId,
        customerPlantId: customerPlantId,
        customerPlantGroupId: customerPlantGroupId,
        customerGroupId: customerGroupId,
        customerUnitTypeGroupFK: customerUnitTypeGroupId,
      })
    );
  };
  useEffect(() => {
    customerSelectionFormData();
  }, [customerId, customerPlantId, customerPlantGroupId, customerGroupId, customerUnitTypeGroupId]);
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
                <Col xs={8} md={8} sm={8}>
                  <Form.Group
                    className="margin-box-5 form-group m-t-5 m-b-10 align-items-center d-flex tabs-row m-l-0 m-r-0"
                    style={{ height: "60px" }}
                  >
                    <Col sm={4} md={4} xs={4} className="ms-3 mt-5 text-start">
                      <Form.Label className=" col-form-label dealer-label m-l-0">Customer</Form.Label>
                    </Col>
                    <Col xs={7} md={5} sm={7} className="p-0  mt-5 d-flex">
                      <AutoCompleteDropdown
                        className={`${
                          !viewDetail &&
                          ((!customerId && !customerPlantGroupId && !customerPlantId && !customerGroupId) ||
                            (!customerId && customerInput) ||
                            (customerId && isSelectedDuplicate && customerUnitTypeGroupdata?.length === 0))
                            ? "borderRed"
                            : viewDetail || customerPlantId || customerGroupId || customerPlantGroupId
                              ? ""
                              : "borderGreen"
                        }`}
                        arrayList={customerDropdownData}
                        searchString={customerInput}
                        handleSearchString={(string) => dispatch(setCustomerInput(string))}
                        fetchDataBySearchString={fetchCustomer}
                        renderItemId={(customer) => customer.customerPK}
                        renderItemField={(customer) => customer.name}
                        onSelect={handleCustomerLookupSelection}
                        selectedId={customerId}
                        loading={customerLoading}
                        disabled={viewDetail || customerPlantId || customerGroupId || customerPlantGroupId}
                        clearInputCallback={() => {
                          dispatch(setCustomerId(null));
                        }}
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
                    <Col sm={4} md={4} xs={4} className="ms-3 mt-4 text-start">
                      <Form.Label className=" col-form-label dealer-label m-l-0">Plant</Form.Label>
                    </Col>

                    <Col xs={7} md={5} sm={7} className="p-0  mt-4 d-flex">
                      <AutoCompleteDropdown
                        className={`${
                          !viewDetail &&
                          ((!customerId && !customerPlantGroupId && !customerPlantId && !customerGroupId) ||
                            (!customerPlantId && customerPlantInput) ||
                            (customerPlantId &&
                              isSelectedDuplicate &&
                              customerUnitTypeGroupdata?.length === 0))
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
                        fetchDataBySearchString={fetchPlantdetailsByName}
                        onSelect={handleCustomerPlantLookupSelection}
                        selectedId={customerPlantId}
                        loading={plantLoading}
                        clearInputCallback={() => {
                          dispatch(setCustomerPlantId(null));
                        }}
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
                    <Col sm={4} md={4} xs={4} className="ms-3  mt-4 text-start">
                      <Form.Label className=" col-form-label dealer-label m-l-0">Plant Group</Form.Label>
                    </Col>

                    <Col xs={7} md={5} sm={7} className="p-0 mt-4 d-flex">
                      <AutoCompleteDropdown
                        className={`${
                          !viewDetail &&
                          ((!customerId && !customerPlantGroupId && !customerPlantId && !customerGroupId) ||
                            (!customerPlantGroupId && customerPlantGroupInput) ||
                            (customerPlantGroupId &&
                              isSelectedDuplicate &&
                              customerUnitTypeGroupdata?.length === 0))
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
                        fetchDataBySearchString={fetchPlantGroupdetailsByDesc}
                        onSelect={handleCustomerPlantGroupLookupSelection}
                        loading={plantGroupLoading}
                        selectedId={customerPlantGroupId}
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
                    <Col sm={4} md={4} xs={4} className="ms-3 mt-4 text-start">
                      <Form.Label className=" col-form-label dealer-label m-l-0">Customer Group</Form.Label>
                    </Col>

                    <Col xs={7} md={5} sm={7} className="p-0 mt-4 d-flex">
                      <AutoCompleteDropdown
                        className={`${
                          !viewDetail &&
                          ((!customerId && !customerPlantGroupId && !customerPlantId && !customerGroupId) ||
                            (!customerGroupId && customerGroupInput) ||
                            (customerGroupId &&
                              isSelectedDuplicate &&
                              customerUnitTypeGroupdata?.length === 0))
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
                        fetchDataBySearchString={fetchCustomerGroupdetailsByDesc}
                        loading={customerGroupLoading}
                        onSelect={handlecustomerGroupLookupSelection}
                        selectedId={customerGroupId}
                        clearInputCallback={() => {
                          dispatch(setCustomerGroupId(null));
                        }}
                      />
                      <LookupButton
                        onClick={handleCustomerGroupLookupModalShow}
                        disabled={viewDetail || customerId || customerPlantGroupId || customerPlantId}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className="margin-box-5 form-group m-t-5 m-b-10 align-items-center d-flex tabs-row m-l-0 m-r-0"
                    style={{ height: "60px" }}
                  >
                    <Col sm={4} md={4} xs={4} className="ms-3 mt-4 text-start">
                      <Form.Label className=" col-form-label dealer-label m-l-0">
                        Customer Unit Type Group
                      </Form.Label>
                    </Col>
                    <Col xs={7} md={5} sm={7} className="p-0 mt-4 d-flex">
                      {/* customer unit Type Group Autocomplete */}

                      <AutoCompleteDropdown
                        className={`${
                          !viewDetail
                            ? !customerUnitTypeGroupInput || customerUnitTypeGroupId
                              ? isSelectedDuplicate && customerUnitTypeGroupdata?.length !== 0
                                ? "borderRed"
                                : ""
                              : "borderRed"
                            : ""
                        }`}
                        arrayList={customerUnitTypeGroupdata}
                        searchString={customerUnitTypeGroupInput}
                        renderItemId={(unitType) => unitType.customerunittypegroupPK}
                        renderItemField={(unitType) => unitType.description}
                        handleSearchString={(string) => {
                          dispatch(setCustomerUnitTypeGroupInput(string));
                        }}
                        fetchDataBySearchString={fetchCustomerUnitTypeGroup}
                        onSelect={handlecustomerUnitTypeGroupLookupSelection}
                        selectedId={customerUnitTypeGroupId}
                        loading={unitTypeLoading}
                        clearInputCallback={() => {
                          dispatch(setCustomerUnitTypeGroupId(null));
                        }}
                        disabled={
                          viewDetail ||
                          !(customerId || customerPlantGroupId || customerGroupId || customerPlantId)
                        }
                      />
                      <LookupButton
                        onClick={handleCustomerUnitTypeGroupLookupModalShow}
                        disabled={
                          viewDetail ||
                          !(customerId || customerPlantGroupId || customerGroupId || customerPlantId)
                        }
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <CustomerLookup
                  show={customerSelection}
                  onHide={customerModalHide}
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
                  handleLookupSelection={handleCustomerPlantGroupLookupSelection}
                  MaintenanceProgram
                />

                <CustomerGroupsLookup
                  show={customerGroupSelection}
                  onHide={customerGroupModalHide}
                  renderItemId={(customer) => customer.customerGroupPK}
                  handleLookupSelection={handlecustomerGroupLookupSelection}
                  MaintenanceProgram
                />
                <CustomerUnitTypeGroupLookup
                  show={customerUnitTypeGroupSelection}
                  onHide={customerunitTypeGroupModalHide}
                  renderItemId={(unitType) => unitType.customerUnitTypeGroupPK}
                  handleLookupSelection={handlecustomerUnitTypeGroupLookupSelection}
                  supplementalRates
                  customerId={customerId}
                  customerPlantId={customerPlantId}
                  customerPlantGroupId={customerPlantGroupId}
                  customerGroupId={customerGroupId}
                  customerRates
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
export default CustomerAddSelectionPage;
