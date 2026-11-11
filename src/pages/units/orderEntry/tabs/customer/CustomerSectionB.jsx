import { Col, Form } from "react-bootstrap";
import AutoComplete from "../../../../../components/common/autoComplete";
import { useFormContext, useWatch } from "react-hook-form";
import Checkbox from "../../../../../components/common/checkbox";
import LookupButton from "../../../../../componenets/common/LookupButton";
import { memo, useEffect, useState } from "react";
import CommonNormalLookup from "../../../../../components/lookup/commonNormalLookup";
import { fetchYardDetail } from "../../../../../utils/apiHelpers/orderEntry.helpers";
import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import CommonAdvancedLookup from "../../../../../components/lookup/commonAdvancedLookup";
import {
  PLANT_DYNAMIC_INPUT_DEFAULT,
  PLANT_DYNAMIC_INPUT_LIST,
} from "../../../../../constants/componentData.constant";
import CommonTable from "../../../../../components/common/commonTable";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentCompany } from "../../../../../utils/utils";

const CustomerSectionB = ({
  styles,
  customerPlantList,
  //selectedCustomer,
  cutomerPlantLoading,
  selectedCustomerPickupPlant,
  handlePickupCustomerPlantSelection,
  handleCustomerPlantSelection,
  handlePickupCustmrYardSelection,
  fetchCityDetails,
  handleShuttleCitySelection,
  handleDeliveryShuttleCitySelection,
  handleDeliveryPlantSelection,
  selectedPlant,
  handleDeliveryYardSelection,
  updateCustomerFields,
  selectedDeliveryPlant,
  handleInputCallBackPickupCustomerplant,
  handleInputCallBackDeliveryCustomerplant,
}) => {
  const dispatch = useDispatch();
  const [pickupPlantModal, setPickupPlantModal] = useState(false);
  const [pickupYardModal, setPickupYardModal] = useState(false);
  const [deliveryPlantModal, setDeliveryPlantModal] = useState(false);
  const [deliveryYardModal, setDeliveryYardModal] = useState(false);
  const [pickupShuttleCityModal, setPickupShuttleCityModal] = useState(false);
  const [deliveryShuttleCityModal, setDeliveryShuttleCityModal] = useState(false);

  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);
  const company = getCurrentCompany();
  const requirePlantReleases = company?.requirePlantReleases;

  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const customer = useWatch({ name: "customer" });

  return (
    <Col xs={5} className={"ps-0"}>
      {/* Plant Table */}
      <div
        className={`border border-secondary ${styles.plantNameTable} ${
          selectedCustomer.usePlants ? "" : "hide-elements"
        }`}
        style={{
          padding: "0",
          height: "250px",
          overflowY: "scroll",
        }}
      >
        {selectedCustomer.usePlants && (
          <CommonTable
            id={"customerPlantPK"}
            selecedId={customer.customerPlantId}
            disabledHead={true}
            loading={cutomerPlantLoading}
            listingData={customerPlantList}
            columns={[
              { label: "Plant Name", key: "name", className: "col-6" },
              { label: "City", key: "city", className: "col-6" },
            ]}
            handleSelect={(row) => {
              handleCustomerPlantSelection(row);
            }}
          />
        )}
      </div>

      <div className="ms-4">
        <div className={`${!customer.customerPlantId && !selectedCustomer.dpuCustomer && "hide-elements"}`}>
          <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0`}>
            <Col xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`}>Pickup At Plant</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <Checkbox
                name="customer.pickupAtPlant"
                control={control}
                disabled={false}
                onChange={(value) => {
                  updateCustomerFields({
                    pickupAtPlant: value,
                  });
                  //used to set factory release
                  setValue(
                    "unit.plantRelease",
                    selectedCustomer?.requireFactoryRelease && value && requirePlantReleases
                  );
                  if (!value) {
                  }
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
              !customer.pickupAtPlant && "hide-elements"
            }`}
          >
            <Col xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`}>Pickup Plant</Form.Label>
            </Col>

            <Col xs={6} className={`p-0 ${styles.selectContainer}`}>
              {/* Pickup Plant Autocomplete */}
              <AutoComplete
                searchString={customer.pickupCustomerPlantName}
                handleSearchString={(string) => updateCustomerFields({ pickupCustomerPlantName: string })}
                onSelect={handlePickupCustomerPlantSelection}
                selectedId={customer.pickupCustomerPlantFK}
                renderItemId={(plant) => plant.customerPlantPK}
                renderItemField={(plant) => plant.name}
                queryKey={["pickupPlant"]}
                queryFn={(term) =>
                  OrderEntryServices.getPlantDetails({
                    customerFK: customer.customerDataId,
                    isDPUCustomer: selectedCustomer.dpuCustomer,
                    billingPlant: false,
                    searchTerms: term,
                  })
                }
                className={`${errors?.customer?.pickupCustomerPlantFK ? "borderRed" : "borderGreen"}`}
                clearInputCallback={() => {
                  handleInputCallBackPickupCustomerplant();
                }}
              />
              <LookupButton
                // disabled={customerIndb === null && isPlantExist}
                onClick={() => setPickupPlantModal(true)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-3 form-group m-b-10 align-items-center row m-l-0 m-r-0
              ${
                (customer.pickupAtPlant &&
                  customer.pickupCustomerPlantFK &&
                  selectedCustomerPickupPlant?.yardFK) ||
                (customer.pickupAtPlant &&
                  selectedCustomerPickupPlant?.yardFK &&
                  (customer?.pickupShuttleCityFK ||
                    (customer.pickupYardFK && selectedCustomerPickupPlant?.selectYard)))
                  ? ""
                  : "hide-elements"
              }`}
          >
            <Col xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`}>Shuttle To Yard</Form.Label>
            </Col>

            <Col xs={7} md={5} className="p-0">
              <Checkbox
                name="customer.shuttleToYard"
                control={control}
                disabled={!customer.pickupAtPlant}
                onChange={(value) => updateCustomerFields({ shuttleToYard: value })}
              />
            </Col>
          </Form.Group>

          <div className="">
            <Form.Group
              className={`mt-3 form-group align-items-center row m-l-0 m-r-0 ${
                customer.pickupAtPlant &&
                customer.shuttleToYard &&
                (selectedCustomerPickupPlant?.yardFK || selectedCustomerPickupPlant?.selectYard)
                  ? ""
                  : "hide-elements"
              }`}
            >
              <Col xs={3} className="p-0">
                <Form.Label className={` customColFormLabel`}>Pickup Yard</Form.Label>
              </Col>

              <Col xs={7} md={6} className={`p-0 ${styles.selectContainer}`}>
                {/* Pickup Yard Autocomplete */}
                <AutoComplete
                  searchString={customer.pickupYardName}
                  handleSearchString={(string) => updateCustomerFields({ pickupYardName: string })}
                  onSelect={handlePickupCustmrYardSelection}
                  selectedId={customer.pickupYardFK}
                  renderItemId={(yard) => yard.yardPK}
                  renderItemField={(yard) => yard.description}
                  disabled={!selectedCustomerPickupPlant?.selectYard}
                  className={`${errors?.customer?.pickupYardFK ? "borderRed" : "borderGreen"}`}
                  queryKey={["yardDetails"]}
                  queryFn={(term) =>
                    fetchYardDetail({
                      customerFK: customer.customerDataId,
                      customerPlantPK: customer.customerPlantId,
                      outbound: selectedCustomerPickupPlant?.outbound,
                      reload: !selectedCustomerPickupPlant?.outbound,
                      searchTerm: term,
                    })
                  }
                  clearInputCallback={() => updateCustomerFields({ pickupYardFK: null })}
                />

                <LookupButton
                  hidden={!customer.shuttleToYard || !selectedCustomerPickupPlant?.selectYard}
                  onClick={() => setPickupYardModal(true)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              className={`mt-3 form-group align-items-center row m-l-0 m-r-0 ${
                customer.pickupAtPlant &&
                customer.shuttleToYard &&
                selectedCustomerPickupPlant?.yardFK &&
                (selectedCustomerPickupPlant?.selectShuttleCity || selectedCustomerPickupPlant?.shuttleCityFK)
                  ? ""
                  : "hide-elements"
              }`}
            >
              <Col xs={3} className="p-0">
                <Form.Label className={` customColFormLabel`}>Pickup City</Form.Label>
              </Col>

              <Col xs={7} md={6} className={`p-0 ${styles.selectContainer}`}>
                {/* Pickup City Autocomplete */}
                <AutoComplete
                  searchString={customer.pickupShuttleCityName}
                  handleSearchString={(string) => updateCustomerFields({ pickupShuttleCityName: string })}
                  onSelect={handleShuttleCitySelection}
                  selectedId={customer.pickupShuttleCityFK}
                  renderItemId={(city) => city.shuttleCityPK}
                  renderItemField={(city) => city.city}
                  disabled={!selectedCustomerPickupPlant?.selectShuttleCity}
                  className={`${errors?.customer?.pickupShuttleCityFK ? "borderRed" : "borderGreen"}`}
                  queryKey={["cityDetails"]}
                  queryFn={fetchCityDetails}
                  clearInputCallback={() => updateCustomerFields({ pickupShuttleCityFK: null })}
                />

                <LookupButton
                  hidden={!selectedCustomerPickupPlant?.selectShuttleCity}
                  onClick={() => setPickupShuttleCityModal(true)}
                />
              </Col>
            </Form.Group>

            <div>
              <Form.Group
                className={`mt-3 form-group m-b-10 align-items-center row m-l-0 m-r-0 ${
                  customer.customerDataId &&
                  customer.pickupAtPlant &&
                  customer.shuttleToYard &&
                  (selectedCustomerPickupPlant?.yardFK || selectedCustomerPickupPlant?.selectShuttleCity)
                    ? ""
                    : "hide-elements"
                }`}
              >
                <Col xs={3} className="p-0">
                  <Form.Label className={` customColFormLabel`}>No Pickup Fee</Form.Label>
                </Col>

                <Col xs={7} md={5} className="p-0">
                  <Checkbox
                    name="customer.noPickupPulloutFee"
                    control={control}
                    onChange={(value) => updateCustomerFields({ noPickupPulloutFee: value })}
                    disabled={!customer.customerDataId || !customer.shuttleToYard}
                  />
                </Col>
              </Form.Group>
            </div>
          </div>
        </div>

        <div className={`${(!customer.customerPlantId || !customer.customerDataId) && "hide-elements"}`}>
          <Form.Group
            className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 
                    `}
          >
            <Col xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`}>Deliver to Plant</Form.Label>
            </Col>
            <Col xs={7} md={5} className="p-0">
              <Checkbox
                name="customer.deliverToPlant"
                control={control}
                onChange={(value) =>
                  updateCustomerFields({
                    deliverToPlant: value,
                    shuttleFromYard:
                      value === true && Boolean(selectedPlant?.yardFK || selectedPlant?.selectYard),
                  })
                }
                disabled={!selectedCustomer.dpuCustomer && !selectedCustomer.usePlants}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
              customer.deliverToPlant ? "" : "hide-elements"
            }`}
          >
            <Col xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`}>Delivery Plant</Form.Label>
            </Col>

            <Col xs={7} md={6} className={`p-0 ${styles.selectContainer}`}>
              {/* Delivery Plant Autocomplete */}
              <AutoComplete
                towardsTop
                searchString={customer.deliveryCustomerPlantName}
                handleSearchString={(string) => updateCustomerFields({ deliveryCustomerPlantName: string })}
                onSelect={handleDeliveryPlantSelection}
                selectedId={customer.deliveryCustomerPlantFK}
                renderItemId={(plant) => plant.customerPlantPK}
                renderItemField={(plant) => plant.name}
                queryKey={["pickupPlant"]}
                queryFn={(term) =>
                  OrderEntryServices.getPlantDetails({
                    customerFK: customer.customerDataId,
                    isDPUCustomer: selectedCustomer.dpuCustomer,
                    billingPlant: false,
                    searchTerms: term,
                  })
                }
                disabled={!customer.deliverToPlant}
                className={`${errors?.customer?.deliveryCustomerPlantFK ? "borderRed" : "borderGreen"}`}
                clearInputCallback={() => {
                  updateCustomerFields({ deliveryCustomerPlantFK: null });
                  handleInputCallBackDeliveryCustomerplant();
                }}
              />

              <LookupButton onClick={() => setDeliveryPlantModal(true)} />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0
                  ${
                    customer.customerDataId &&
                    customer.deliverToPlant &&
                    customer.deliveryCustomerPlantFK &&
                    (selectedDeliveryPlant?.yardFK || selectedDeliveryPlant?.selectYard)
                      ? ""
                      : "hide-elements"
                  }`}
          >
            <Col xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`}>Shuttle From Yard</Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <Checkbox
                name="customer.shuttleFromYard"
                control={control}
                disabled={!customer.customerDataId || !customer.deliverToPlant}
                onChange={(value) => updateCustomerFields({ shuttleFromYard: value })}
              />
            </Col>
          </Form.Group>

          <div className="">
            <Form.Group
              className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
                customer.customerDataId &&
                customer.shuttleFromYard &&
                customer.deliverToPlant &&
                (selectedDeliveryPlant?.yardFK || selectedDeliveryPlant?.selectYard)
                  ? ""
                  : "hide-elements"
              }`}
            >
              <Col xs={3} className="p-0">
                <Form.Label className={` customColFormLabel`}>Delivery Yard</Form.Label>
              </Col>

              <Col xs={7} md={6} className={`p-0 ${styles.selectContainer}`}>
                {/* Delivery Yard Autocomplete */}
                <AutoComplete
                  towardsTop
                  searchString={customer.deliveryYardName}
                  handleSearchString={(string) => updateCustomerFields({ deliveryYardName: string })}
                  onSelect={handleDeliveryYardSelection}
                  selectedId={customer.deliveryYardFK}
                  renderItemId={(yard) => yard.yardPK}
                  renderItemField={(yard) => yard.description}
                  disabled={
                    !selectedDeliveryPlant?.selectYard ||
                    !customer.shuttleFromYard ||
                    !customer.customerDataId
                  }
                  queryKey={["yardDetails"]}
                  queryFn={(term) =>
                    fetchYardDetail({
                      customerFK: customer.customerDataId,
                      customerPlantPK: customer.customerPlantId,
                      outbound: selectedCustomerPickupPlant?.outbound,
                      reload: !selectedCustomerPickupPlant?.outbound,
                      searchTerm: term,
                    })
                  }
                  className={`${errors?.customer?.deliveryYardFK ? "borderRed" : "borderGreen"}`}
                  clearInputCallback={() => updateCustomerFields({ deliveryYardFK: null })}
                />

                <LookupButton onClick={() => setDeliveryYardModal(true)} />
              </Col>
            </Form.Group>
            <Form.Group
              className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
                customer.customerDataId &&
                customer.shuttleFromYard &&
                customer.deliverToPlant &&
                (selectedDeliveryPlant?.shuttleCityFK || selectedDeliveryPlant?.selectShuttleCity)
                  ? ""
                  : "hide-elements"
              }`}
            >
              <Col xs={3} className="p-0">
                <Form.Label className={` customColFormLabel`}>Delivery City</Form.Label>
              </Col>

              <Col xs={7} md={6} className={`p-0 ${styles.selectContainer}`}>
                {/* Delivery City Autocomplete */}
                <AutoComplete
                  towardsTop
                  searchString={customer.deliveryShuttleCityName}
                  handleSearchString={(string) => updateCustomerFields({ deliveryShuttleCityName: string })}
                  onSelect={handleDeliveryShuttleCitySelection}
                  selectedId={customer.deliveryShuttleCityFK}
                  renderItemId={(city) => city.shuttleCityPK}
                  renderItemField={(city) => city.city}
                  disabled={
                    !selectedDeliveryPlant?.selectShuttleCity ||
                    !customer.customerDataId ||
                    !customer.shuttleFromYard
                  }
                  className={`${
                    !customer.shuttleFromYard
                      ? ""
                      : errors?.customer?.deliveryShuttleCityFK
                        ? "borderRed"
                        : "borderGreen"
                  }`}
                  queryKey={["cityDetails"]}
                  queryFn={fetchCityDetails}
                  clearInputCallback={() => updateCustomerFields({ deliveryShuttleCityFK: null })}
                />
                <LookupButton onClick={() => setDeliveryShuttleCityModal(true)} />
              </Col>
            </Form.Group>

            <Form.Group
              className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
                customer.customerDataId &&
                customer.shuttleFromYard &&
                customer.deliverToPlant &&
                (selectedDeliveryPlant?.shuttleCityFK || selectedDeliveryPlant?.selectShuttleCity)
                  ? ""
                  : "hide-elements"
              }`}
            >
              <Col xs={3} className="p-0">
                <Form.Label className={` customColFormLabel`}>No Delivery Fee</Form.Label>
              </Col>

              <Col xs={7} md={5} className="p-0">
                <Checkbox
                  name="customer.noDeliveryPulloutFee"
                  control={control}
                  disabled={!customer.shuttleFromYard}
                  onChange={(value) => updateCustomerFields({ noDeliveryPulloutFee: value })}
                />
              </Col>
            </Form.Group>
          </div>
        </div>
      </div>

      {/* Pickup Plant Lookup Modal */}
      {pickupPlantModal && (
        <CommonAdvancedLookup
          id={"customerPlantPK"}
          show={pickupPlantModal}
          onHide={() => setPickupPlantModal(false)}
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
          handleLookupSelection={handlePickupCustomerPlantSelection}
          fetchFunction={(params) =>
            OrderEntryServices.getPlantDetails({
              customerFK: customer.customerDataId,
              isDPUCustomer: selectedCustomer.dpuCustomer,
              billingPlant: false,
              ...params,
            })
          }
        />
      )}

      {/* Pickup Yard Lookup Modal */}
      {pickupYardModal && (
        <CommonNormalLookup
          id={"yardPK"}
          show={pickupYardModal}
          onHide={() => setPickupYardModal(false)}
          lookupTitle={"Yard Selection"}
          columns={[{ label: "Description", key: "description" }]}
          handleLookupSelection={handlePickupCustmrYardSelection}
          fetchFunction={(params) =>
            fetchYardDetail({
              customerFK: customer.customerDataId,
              customerPlantPK: customer.customerPlantId,
              outbound: selectedCustomerPickupPlant?.outbound,
              reload: !selectedCustomerPickupPlant?.outbound,
              ...params,
            })
          }
        />
      )}

      {/* Delivery Yard Lookup Modal */}
      {deliveryYardModal && (
        <CommonNormalLookup
          id={"yardPK"}
          show={deliveryYardModal}
          onHide={() => setDeliveryYardModal(false)}
          lookupTitle={"Yard Selection"}
          columns={[{ label: "Description", key: "description" }]}
          handleLookupSelection={handleDeliveryYardSelection}
          fetchFunction={(params) =>
            fetchYardDetail({
              customerFK: customer.customerDataId,
              customerPlantPK: customer.customerPlantId,
              outbound: selectedCustomerPickupPlant?.outbound,
              reload: !selectedCustomerPickupPlant?.outbound,
              ...params,
            })
          }
        />
      )}

      {/* Delivery Plant Lookup Modal */}
      {deliveryPlantModal && (
        <CommonAdvancedLookup
          id={"customerPlantPK"}
          show={deliveryPlantModal}
          onHide={() => setDeliveryPlantModal(false)}
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
          handleLookupSelection={handleDeliveryPlantSelection}
          fetchFunction={(params) =>
            OrderEntryServices.getPlantDetails({
              customerFK: customer.customerDataId,
              isDPUCustomer: selectedCustomer.dpuCustomer,
              billingPlant: false,
              ...params,
            })
          }
        />
      )}

      {/* Pickup Shuttle City Lookup Modal */}
      {pickupShuttleCityModal && (
        <CommonNormalLookup
          id={"shuttleCityPK"}
          show={pickupShuttleCityModal}
          onHide={() => setPickupShuttleCityModal(false)}
          lookupTitle={"Shuttle City Selection"}
          columns={[{ label: "City", key: "city" }]}
          handleLookupSelection={handleShuttleCitySelection}
          fetchFunction={fetchCityDetails}
        />
      )}

      {/* Delivery Shuttle City Lookup Modal */}
      {deliveryShuttleCityModal && (
        <CommonNormalLookup
          id={"shuttleCityPK"}
          show={deliveryShuttleCityModal}
          onHide={() => setDeliveryShuttleCityModal(false)}
          lookupTitle={"Shuttle City Selection"}
          columns={[{ label: "City", key: "city" }]}
          handleLookupSelection={handleDeliveryShuttleCitySelection}
          fetchFunction={fetchCityDetails}
        />
      )}

      <div></div>
    </Col>
  );
};

export default memo(CustomerSectionB);
