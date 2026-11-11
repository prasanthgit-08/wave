import { Col, Form, Row } from "react-bootstrap";
import useCustomer from "./useCustomer";
import ButtonLookup from "../../../../../components/common/buttonLookup";
import CustomerSectionB from "./CustomerSectionB";
import CustomerSectionC from "./CustomerSectionC";
import CustomerSectionA from "./CustomerSectionA";
import { useFormContext, useWatch } from "react-hook-form";
import { useState } from "react";
import CommonAdvancedLookup from "../../../../../components/lookup/commonAdvancedLookup";
import CustomerServices from "../../../../../service/customers/customer.services";
import AutoComplete from "../../../../../components/common/autoComplete";
import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import {
  CSTMR_DYNAMIC_INPUT_DEFAULT,
  CSTMR_DYNAMIC_INPUT_LIST,
  CSTMR_RADIO_OBJ,
  PLANT_DYNAMIC_INPUT_DEFAULT,
  PLANT_DYNAMIC_INPUT_LIST,
} from "../../../../../constants/componentData.constant";
import { setSelectedCustomer, setSelectedPlant } from "../../../../../store/slices/unit.slice";
import { useDispatch, useSelector } from "react-redux";
import { resetTabsDatas } from "../../schemas";

const Customer = ({ styles }) => {
  const dispatch = useDispatch();
  const [ctmrModal, setCtmrModal] = useState(false);
  const [plantModal, setPlantModal] = useState(false);
  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);
  const selectedPlant = useSelector((state) => state.unit.selectedPlant);

  const {
    control,
    setValue,
    watch,
    reset,
    formState: { errors, defaultValues },
  } = useFormContext();

  const customerDataName = useWatch({ name: "customer.customerDataName" });
  const customerDataId = useWatch({ name: "customer.customerDataId" });
  const customerPlantName = useWatch({ name: "customer.customerPlantName" });
  const customerPlantId = useWatch({ name: "customer.customerPlantId" });
  const {
    loading,
    tableList,
    customerPlantList,
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    cutomerPlantLoading,
    selectedCustomerPickupPlant,
    selectedDeliveryPlant,
    handleCustomerDataSelection,
    handleCustomerPlantSelection,
    handlePickupCustomerPlantSelection,
    handlePickupCustmrYardSelection,
    fetchCityDetails,
    handleShuttleCitySelection,
    handleDeliveryShuttleCitySelection,
    handleDeliveryPlantSelection,
    handleDeliveryYardSelection,
    updateCustomerFields,
    setCustomerPlantList,
    setCutomerPlantLoading,
    handleBulkInvoiceSelection,
    handleCheckBatchLoadValues,
    getBulkInvoiceDetailsLastElement,
    handleInputCallBackPickupCustomerplant,
    handleInputCallBackDeliveryCustomerplant,
  } = useCustomer();

  return (
    <div className={`px-4 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight} border-bottom `}>
      <Row>
        <Col xs={5}>
          <Form.Group className=" my-3 form-group align-items-center row  ms-2">
            <Col xs={8} className={`p-0 ${styles.selectContainer}`}>
              <Col xs={8} style={{ marginLeft: "-18px" }}>
                {/* Customer Autocomplete */}
                <AutoComplete
                  searchString={customerDataName}
                  handleSearchString={(string) => updateCustomerFields({ customerDataName: string })}
                  onSelect={handleCustomerDataSelection}
                  selectedId={customerDataId}
                  renderItemId={(customer) => customer.customerPK}
                  renderItemField={(customer) => customer.name}
                  queryKey={["CustomerDetails"]}
                  queryFn={(term) =>
                    OrderEntryServices.getCustomerData({
                      searchText: term || "",
                      pageNumber: 0,
                      pageSize: 100,
                    })
                  }
                  className={`${errors?.customer?.customerDataId ? "borderRed" : "borderGreen"}`}
                  clearInputCallback={() => {
                    if (customerDataId) resetTabsDatas(reset);

                    dispatch(setSelectedCustomer({}));
                    dispatch(setSelectedPlant(null));
                  }}
                />
              </Col>

              <ButtonLookup onClick={() => setCtmrModal(true)} />
            </Col>
          </Form.Group>
        </Col>

        <Col xs={5} className={`${!selectedCustomer.usePlants && "hide-elements"}`}>
          <Form.Group className="mt-3 form-group my-3 align-items-center row  ms-2">
            <Col xs={8} className={`p-0 ${styles.selectContainer}`}>
              <Col xs={8} className="p-0">
                <div>
                  {/* Customer Plant Autocomplete */}
                  <AutoComplete
                    searchString={customerPlantName}
                    handleSearchString={(string) => updateCustomerFields({ customerPlantName: string })}
                    onSelect={handleCustomerPlantSelection}
                    selectedId={customerPlantId}
                    renderItemId={(plant) => plant.customerPlantPK}
                    renderItemField={(plant) => plant.name}
                    onLoding={setCutomerPlantLoading}
                    getData={setCustomerPlantList}
                    queryKey={["PlantDetail"]}
                    queryFn={(term) =>
                      OrderEntryServices.getPlantDetails({
                        searchTerms: term || "",
                        customerFK: customerDataId,
                        isDPUCustomer: selectedCustomer.dpuCustomer,
                        billingPlant: true,
                        pageNumber: 0,
                        pageSize: 100,
                      })
                    }
                    className={`${errors?.customer?.customerPlantId ? "borderRed" : "borderGreen"}`}
                    clearInputCallback={() => {
                      dispatch(setSelectedPlant(null));
                      handleInputCallBackPickupCustomerplant();
                      updateCustomerFields({ customerPlantId: null, plantCode: "", batchLoads: false });
                    }}
                  />
                </div>
              </Col>
              <ButtonLookup onClick={() => setPlantModal(true)} />
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <Row className={styles.customerRowHeight}>
        {/* section 1 */}
        <CustomerSectionA
          customerList={tableList}
          loading={loading}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalPages={totalPages}
          totalElements={totalElements}
          handleCustomerDataSelection={handleCustomerDataSelection}
        />

        {/* section 2 */}
        <CustomerSectionB
          styles={styles}
          customerPlantList={customerPlantList}
          selectedCustomer={selectedCustomer}
          cutomerPlantLoading={cutomerPlantLoading}
          selectedCustomerPickupPlant={selectedCustomerPickupPlant}
          handlePickupCustomerPlantSelection={handlePickupCustomerPlantSelection}
          handleCustomerPlantSelection={handleCustomerPlantSelection}
          handlePickupCustmrYardSelection={handlePickupCustmrYardSelection}
          fetchCityDetails={fetchCityDetails}
          handleShuttleCitySelection={handleShuttleCitySelection}
          handleDeliveryShuttleCitySelection={handleDeliveryShuttleCitySelection}
          handleDeliveryPlantSelection={handleDeliveryPlantSelection}
          selectedPlant={selectedPlant}
          handleDeliveryYardSelection={handleDeliveryYardSelection}
          updateCustomerFields={updateCustomerFields}
          selectedDeliveryPlant={selectedDeliveryPlant}
          handleInputCallBackPickupCustomerplant={handleInputCallBackPickupCustomerplant}
          handleInputCallBackDeliveryCustomerplant={handleInputCallBackDeliveryCustomerplant}
        />

        {/* section 3 */}
        <CustomerSectionC
          styles={styles}
          selectedCustomerPickupPlant={selectedCustomerPickupPlant}
          handleBulkInvoiceSelection={handleBulkInvoiceSelection}
          updateCustomerFields={updateCustomerFields}
          handleCheckBatchLoadValues={handleCheckBatchLoadValues}
          getBulkInvoiceDetailsLastElement={getBulkInvoiceDetailsLastElement}
        />
      </Row>

      {/* customer lookup modal */}
      {ctmrModal && (
        <CommonAdvancedLookup
          id={"customerPK"}
          show={ctmrModal}
          onHide={() => setCtmrModal(false)}
          lookupTitle={"Customer Selection"}
          columns={[
            { label: "Name", key: "name" },
            { label: "City", key: "city" },
            { label: "State", key: "stateCode" },
          ]}
          dynamicInputTargetKey="customers"
          dynamicInputDefaultFields={CSTMR_DYNAMIC_INPUT_DEFAULT}
          dynamicInputlist={CSTMR_DYNAMIC_INPUT_LIST}
          radioOrderObj={CSTMR_RADIO_OBJ}
          showAdvancedSearchFlag
          showAdvancedSortFlag
          handleLookupSelection={handleCustomerDataSelection}
          fetchFunction={(params) =>
            CustomerServices.getAllCustomersOEDetails({ creditHold: false, ...params })
          }
        />
      )}

      {/* Billing Plant Lookup Modal */}
      {plantModal && (
        <CommonAdvancedLookup
          id={"customerPlantPK"}
          show={plantModal}
          onHide={() => setPlantModal(false)}
          lookupTitle={"Customer Plant Selection"}
          columns={[
            { label: "Name", key: "name" },
            { label: "Brand", key: "brand" },
            { label: "Product Line", key: "productLine" },
          ]}
          dynamicInputTargetKey={"customerPlants"}
          dynamicInputDefaultFields={PLANT_DYNAMIC_INPUT_DEFAULT}
          dynamicInputlist={PLANT_DYNAMIC_INPUT_LIST}
          showAdvancedSearchFlag
          handleLookupSelection={handleCustomerPlantSelection}
          fetchFunction={(params) =>
            OrderEntryServices.getPlantDetails({
              customerFK: customerDataId,
              isDPUCustomer: selectedCustomer.dpuCustomer,
              billingPlant: true,
              ...params,
            })
          }
        />
      )}
    </div>
  );
};

export default Customer;
