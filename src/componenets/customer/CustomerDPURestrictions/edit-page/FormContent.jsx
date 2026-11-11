import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { t } from "i18next";
import CustomerPlantLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import {
  setPickupCustomerPlantFK,
  setNotes,
  setCustomerDPURestrictionPK,
  setCustomerPlants,
  setEditFormData,
  setViewDetail,
  setCustomers,
  setPickupCustomerFK,
  setPickupCustomerFKCopy,
  toggleChangesCancelled,
  setDuplicateCustomer,
  setDuplicatePlant,
  setDuplicateCustomerError,
  setDuplicatePlantError,
  setCustomerNameInput,
  setPageNumber,
  setSelectedCustomerId,
  setcustomerData,
  setIsPlantExist,
  setPlantNameInput,
  setSelectedPlantId,
  setplantData,
  setCustomerId,
  resetClearCustomerPlant,
  resetClearCustomer,
  setIsCustomerExist,
} from "../../../../redux/CustomerDPURestrictionsSlice";
import CustomerDPURestrictionsService from "../../../../services/CustomerDPURestrictionsService";
import dpuStyles from "../CustomerDPURestrictions.module.css";
import {
  CustomerPlants_Base_URL,
  Customers_Base_URL,
} from "../../../../services/constants/applicationConstants";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantMaintenanceService from "../../../../services/CustomerPlantMaintenanceService";
import LoadingIcon from "../../../common/LoadingIcon";
const FormContent = ({ styles }) => {
  const { customerId, customerPageNo, recordId } = useParams();
  const [customerDropdownData, setCustomerDropdownData] = useState([]);
  const [plantDropdownData, setPlantDropdownData] = useState([]);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [plantLoading, setPlantLoading] = useState(false);
  const customerNameInput = useSelector((state) => state.customerDPURestrictions.customerNameInput);
  const plantNameInput = useSelector((state) => state.customerDPURestrictions.plantNameInput);
  const selectedCustomerId = useSelector((state) => state.customerDPURestrictions.selectedCustomerId);
  const selectedPlantId = useSelector((state) => state.customerDPURestrictions.selectedPlantId);
  const pageNo = useSelector((state) => state.customerLookupReducer.pageNo);
  const [customerSelection, setCustomerSelection] = useState(false);
  const [plantSelection, setPlantSelection] = useState(false);
  const isEdit = useSelector((state) => state.customerDPURestrictions.isEdit);
  const selectedDPUId = useSelector((state) => state.customerDPURestrictions.selectedDPUId);
  const isPlantExist = useSelector((state) => state.customerDPURestrictions.isPlantExist);
  const isCustomerExist = useSelector((state) => state.customerDPURestrictions.isCustomerExist);
  const pickupCustomerFK = useSelector((state) => state.customerDPURestrictions.pickupCustomerFK);
  const pickupCustomerPlantFK = useSelector((state) => state.customerDPURestrictions.pickupCustomerPlantFK);
  const duplicateCustomerError = useSelector((state) => state.customerDPURestrictions.duplicateCustomerError);
  const duplicatePlantError = useSelector((state) => state.customerDPURestrictions.duplicatePlantError);
  const customers = useSelector((state) => state.customerDPURestrictions.customers);
  const notes = useSelector((state) => state.customerDPURestrictions.notes);
  const viewDetail = useSelector((state) => state.customerDPURestrictions.viewDetail);
  const editFormData = useSelector((state) => state.customerDPURestrictions.editFormData);
  const changesCancelled = useSelector((state) => state.customerDPURestrictions.changesCancelled);
  const [autoCustomers, setAutoCustomers] = useState([]);
  const [autoPlants, setAutoPlants] = useState([]);
  const active = true;
  const type = "Autocomplete";
  const size = 100;
  const page = 0;
  const dpuRestriction = true;
  const searchCriteria = "Beginning";
  const [selectingCustomer, setSelectingCustomer] = useState(false);
  const [selectingPlant, setSelectingPlant] = useState(false);
  const [plantId, setPlantId] = useState(null);
  const [plantName, setPlantName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const fetchRecord = (recordId) => {
    setLoading(true);
    CustomerDPURestrictionsService.getRecord(recordId)
      .then((response) => {
        const data = response.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
        dispatch(setCustomerId(customerId));
      })
      .catch((err) => {
        navigate(`/customer-dpu-restrictions/${customerId}/${customerPageNo}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchCustomers = (string) => {
    setCustomerLoading(true);
    CustomerDPURestrictionsService.getCustomersByUsePlants(string)
      .then((response) => {
        const data = response.data;
        setCustomerDropdownData(data);
        dispatch(setCustomers(data));
        const customersList = data.content.map((customer) => ({ ...customer, name: customer.name?.trim() }));
        setCustomerDropdownData(customersList);
      })
      .catch((err) => {
        setCustomerLoading(false);
      })
      .finally(() => {
        setCustomerLoading(false);
      });
  };

  useEffect(() => {
    if (recordId != null) {
      fetchRecord(recordId);
    }
  }, [recordId]);

  const fetchPlants = (searchTerm) => {
    // previous implementation for reference
    CustomerDPURestrictionsService.getCustomerPlants(
      customerId,
      searchTerm,
      active,
      type,
      size,
      page,
      dpuRestriction,
      searchCriteria
    )
      .then((response) => {
        const data = response.data;
        setPlantDropdownData(data);
      })
      .catch((error) => {
        console.error(error.response.data.errorMsg);
      });
  };
  const fetchPlantsAuto = (string) => {
    setPlantLoading(true);
    CustomerPlantMaintenanceService.getAllPlantsByCustomerAuto(string)
      .then((response) => {
        const data = response.data;
        const plantList = data.content?.map((data) => ({ ...data, name: data.name?.trim() }));
        setPlantDropdownData(plantList);
      })
      .catch((err) => {})
      .finally(() => {
        setPlantLoading(false);
      });
  };

  const handleCheckCustomer = (pickupCustomerFK) => {
    if (pickupCustomerFK === editFormData?.pickupCustomerfk?.customerPK) {
      dispatch(setDuplicateCustomer(false));
      dispatch(setDuplicateCustomerError(false));
    } else {
      CustomerDPURestrictionsService.checkPickupCustomer(
        customerId,
        pickupCustomerFK,
        selectedDPUId,
        isEdit
      ).then((response) => {
        const { data } = response;
        dispatch(setDuplicateCustomer(data || false));
        dispatch(setDuplicateCustomerError(data || false));
      });
    }
  };

  const handleCheckPlant = (pickupCustomerPlantFK) => {
    if (pickupCustomerPlantFK === editFormData?.pickupcustomerplantFK?.customerPlantPK) {
      dispatch(setDuplicatePlant(false));
      dispatch(setDuplicatePlantError(false));
    } else {
      CustomerDPURestrictionsService.checkPickupPlant(
        customerId,
        pickupCustomerPlantFK,
        selectedDPUId,
        isEdit
      ).then((response) => {
        const { data } = response;
        dispatch(setDuplicatePlant(data || false));
        dispatch(setDuplicatePlantError(data || false));
      });
    }
  };

  const handleCustomerLookupModalShow = () => {
    setCustomerSelection(true);
  };

  const handleCustomerSelection = (customer) => {
    dispatch(setCustomerNameInput(customer.name?.trim()));
    dispatch(setPickupCustomerFK(customer.customerPK));
    handleCheckCustomer(customer.customerPK);
    dispatch(resetClearCustomerPlant());
    dispatch(setIsCustomerExist(true));
    setCustomerSelection(false);
  };
  const handlePlantSelection = (customerplant) => {
    dispatch(setPlantNameInput(customerplant.name));
    dispatch(setPickupCustomerPlantFK(customerplant.customerPlantPK));
    handleCheckPlant(customerplant.customerPlantPK);
    dispatch(resetClearCustomer());
    dispatch(setIsPlantExist(true));
    setPlantSelection(false);
  };
  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setCustomerDPURestrictionPK(""));
      dispatch(setPickupCustomerFK(""));
      dispatch(setCustomerNameInput(""));
      dispatch(setPickupCustomerPlantFK(""));
      dispatch(setPlantNameInput(""));
      dispatch(setNotes(""));
    }
  }, [editFormData]);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setCustomerDPURestrictionPK(editFormData.customerDPURestrictionPK || ""));
      dispatch(setPickupCustomerFK(editFormData.pickupCustomerfk?.customerPK || ""));
      dispatch(setCustomerNameInput(editFormData.pickupCustomerfk?.name?.trim() || ""));
      dispatch(setPickupCustomerPlantFK(editFormData.pickupcustomerplantFK?.customerPlantPK || ""));
      dispatch(setPlantNameInput(editFormData.pickupcustomerplantFK?.name?.trim() || ""));
      dispatch(setNotes(editFormData.notes || ""));
    }
  }, [editFormData, changesCancelled]);

  useEffect(() => {
    dispatch(setDuplicateCustomerError(false));
    dispatch(setDuplicatePlantError(false));
  }, []);

  return (
    <div className="w-100 p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row className="m-0 p-10">
              <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                <Row
                  className={`${viewDetail || pickupCustomerPlantFK || pickupCustomerFK ? "hide-elements" : ""}`}
                >
                  <Alert variant="primary" style={{ padding: "8px", textAlign: "center" }}>
                    Please select either a Customer or a Plant
                  </Alert>
                </Row>
                <Form.Group className="m-t-10 form-group m-t-5 m-b-10 align-items-center row m-l-0 m-r-0">
                  <Col xs={2} sm={2} md={2} className="p-0">
                    <Form.Label className={styles.colFormLabel}>{t("customerDPU.customer")}</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <AutoCompleteDropdown
                      arrayList={customerDropdownData}
                      searchString={customerNameInput}
                      renderItemId={(customer) => customer.customerPK}
                      renderItemField={(customer) => customer.name}
                      handleSearchString={(string) => dispatch(setCustomerNameInput(string))}
                      fetchDataBySearchString={fetchCustomers}
                      onSelect={handleCustomerSelection}
                      selectedId={pickupCustomerFK}
                      clearInputCallback={() => {
                        dispatch(setPickupCustomerFK(null));
                        dispatch(setDuplicateCustomerError(false));
                      }}

                      className={`${
                        viewDetail || pickupCustomerPlantFK
                          ? ""
                          : !pickupCustomerFK || !customerNameInput || duplicateCustomerError
                            ? "borderRed"
                            : "borderGreen"
                      }`}

                      disabled={viewDetail || pickupCustomerPlantFK}
                      loading={customerLoading}
                    />
                  </Col>
                  <LookupButton
                    onClick={handleCustomerLookupModalShow}
                    disabled={viewDetail || pickupCustomerPlantFK ? true : false}
                  />

                  <Row
                    className={`${!viewDetail && pickupCustomerFK != null && duplicateCustomerError ? "" : "hide-elements"}`}
                  >
                    <Col xs={2} md={2} sm={2}></Col>
                    <Col style={{ paddingLeft: "5px" }}>
                      <p className="p-0 text-danger alert" style={{ height: "1px" }}>
                        {/* Customer already exists! */}
                      </p>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="m-t-15 form-group m-t-5 m-b-10 align-items-center row m-l-0 m-r-0">
                  <Col xs={2} sm={2} md={2} className="p-0 m-t-2">
                    <Form.Label className={styles.colFormLabel}>{t("customerDPU.plant")}</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    {/* Plant AutoComplete */}
                    <AutoCompleteDropdown
                      arrayList={plantDropdownData}
                      searchString={plantNameInput}
                      renderItemId={(customerplant) => customerplant.customerPlantPK}
                      renderItemField={(customerplant) => customerplant.name}
                      handleSearchString={(string) => dispatch(setPlantNameInput(string))}
                      fetchDataBySearchString={fetchPlantsAuto}
                      onSelect={handlePlantSelection}
                      selectedId={pickupCustomerPlantFK}
                      clearInputCallback={() => {
                        dispatch(setPickupCustomerPlantFK(null));
                        dispatch(setDuplicatePlantError(false));
                      }}

                      className={`${
                        viewDetail || pickupCustomerFK
                          ? ""
                          : !pickupCustomerPlantFK || !plantNameInput || duplicatePlantError
                            ? "borderRed"
                            : "borderGreen"
                      }`}

                      disabled={viewDetail || pickupCustomerFK}
                      loading={plantLoading}
                    />
                  </Col>

                  <LookupButton
                    disabled={viewDetail || pickupCustomerFK ? true : false}
                    onClick={() => setPlantSelection(true)}
                  />

                  <Row
                    className={`${!viewDetail && pickupCustomerPlantFK != null && duplicatePlantError ? "" : "hide-elements"}`}
                  >
                    <Col xs={2} md={2} sm={2}></Col>
                    <Col style={{ paddingLeft: "3px" }}>
                      <p className="p-0 text-danger alert" style={{ height: "1px" }}>
                        {/* Plant already exists! */}
                      </p>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
                  <Col sm={12} md={12} xs={12} className="p-0">
                    <label className={`${styles.colFormLabel} p-0 m-b-10`}>{t("customerDPU.notes")}</label>
                  </Col>
                  <Col sm={10} md={10} className="p-0 m-t-5">
                    <textarea
                      rows={7}
                      cols={20}
                      type="text"
                      className={`${styles.formControl} h-100`}
                      id="notes"
                      name="notes"
                      value={notes}
                      disabled={viewDetail}
                      onInput={(e) => dispatch(setNotes(e.target.value))}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <CustomerLookup
        show={customerSelection}
        onHide={() => setCustomerSelection(false)}
        renderItemId={(customer) => customer.customerPK}
        handleLookupSelection={handleCustomerSelection}

        usePlantsCustomer
      />
      <CustomerPlantLookup
        show={plantSelection}
        onHide={() => setPlantSelection(false)}
        renderItemId={(customerplant) => customerplant.customerPlantPK}
        handleLookupSelection={handlePlantSelection}
        MaintenanceProgram
      />
    </div>
  );
};

export default FormContent;
