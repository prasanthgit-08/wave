import { Col, Form, Row } from "react-bootstrap";
import AutoComplete from "../../../../../components/common/autoComplete";
import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import { useFormContext, useWatch } from "react-hook-form";
import ButtonLookup from "../../../../../components/common/buttonLookup";
import { memo, useEffect, useRef, useState } from "react";
import CommonNormalLookup from "../../../../../components/lookup/commonNormalLookup";
import Input from "../../../../../components/common/input";
import { setFormattedInputValue } from "../../../../../utils/utils";
import { useSelector } from "react-redux";
import RadioButton from "../../../../../components/common/radioButton";
import DealerServices from "../../../../../service/dealer/dealer.service";
import CommonAdvancedLookup from "../../../../../components/lookup/commonAdvancedLookup";
import {
  CSTMR_DYNAMIC_INPUT_DEFAULT,
  DEALER_DYNAMIC_INPUT_LIST,
  DEALER_RADIO_OBJ,
} from "../../../../../constants/componentData.constant";
import Checkbox from "../../../../../components/common/checkbox";
import { useDispatch } from "react-redux";
import {
  setDeliveryDealer,
  setMiscDeliveryID,
  setMiscPickupID,
  setOrderEntrySchemaConditions,
  setPickupDealer,
  setSelectedDeliveryDealer,
  setSelectedPickupDealer,
  setSelectedUnitType,
} from "../../../../../store/slices/unit.slice";

const UnitSectionA = ({
  styles,
  updateUnitFields,
  handleUnitTypeSelection,
  checkUnitNumberUniqe,
  handleSpecialCodeSelection,
  handlePickupDealerSelection,
  handleDeliveryDealerSelection,
  customerRatesList,
}) => {
  const [unitTypeModal, setUnitTypeModal] = useState(false);
  const [specialCodeModal, setSpecialCodeModal] = useState(false);
  const [pickupDealerModal, setPickupDealerModal] = useState(false);
  const [deliveryDealerModal, setDeliveryDealerModal] = useState(false);
  const [dealerSearchType, setDealerSearchType] = useState("AutocompleteByCityState");
  const [deliverydealerSearchType, setDeliveryDealerSearchType] = useState("AutocompleteByCityState");

  const dispatch = useDispatch();

  const allowMiscellaneousDealers = useSelector(
    (state) => state.unit.selectedCustomer.allowMiscellaneousDealers
  );
  const selectedPlant = useSelector((state) => state.unit.selectedPlant);
  const pickupDealer = useSelector((state) => state.unit.pickupDealer);
  const deliveryDealer = useSelector((state) => state.unit.deliveryDealer);
  const selectedUnitType = useSelector((state) => state.unit.selectedUnitType);
  const selectedPickupDealer = useSelector((state) => state.unit.selectedPickupDealer);
  const selectedDeliveryDealer = useSelector((state) => state.unit.selectedDeliveryDealer);
  const isEngineNAVisible = useSelector((state) => state.unit.isEngineNAVisible);
  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);

  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext();
  const unit = useWatch({ name: "unit" });
  const customerDataId = useWatch({ name: "customer.customerDataId" });
  const customerPlantId = useWatch({ name: "customer.customerPlantId" });
  const pickupAtPlant = useWatch({ name: "customer.pickupAtPlant" });
  const deliverToPlant = useWatch({ name: "customer.deliverToPlant" });
  const batchLoads = useWatch({ name: "customer.batchLoads" });
  const firstBatchSequence = useWatch({ name: "customer.firstBatchSequence" });
  const pickupCustomerPlantFK = useWatch({ name: "customer.pickupCustomerPlantFK" });
  const deliveryCustomerPlantFK = useWatch({ name: "customer.deliveryCustomerPlantFK" });

  useEffect(() => {
    if (!isEngineNAVisible) {
      updateUnitFields({ gas: "enginegas" });
    }
  }, [isEngineNAVisible]);

  return (
    <>
      <Col xs={4}>
        <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0">
          <Col xs={4} className="p-0">
            <Form.Label className={`customColFormLabel text-capitalize`}>Unit Type</Form.Label>
            {/* <TooltipWrapper fieldName={"unitType"} /> */}
          </Col>

          <Col xs={7} className={`p-0 ${styles.selectContainer}`}>
            {/* Unit Type Autocomplete */}
            <AutoComplete
              searchString={unit.unitTypeName}
              handleSearchString={(string) => updateUnitFields({ unitTypeName: string })}
              onSelect={handleUnitTypeSelection}
              selectedId={unit.unitTypeFK}
              renderItemId={(unitType) => unitType.unitTypePK}
              renderItemField={(unitType) => unitType.descriptionLong}
              queryKey={["unitType"]}
              queryFn={(term) =>
                // here set customerRatesList condition wise api call
                customerRatesList.length > 0
                  ? OrderEntryServices.fetchUnitTypesByCustomer({
                      searchTerm: term || "",
                      pageSize: 100,
                      hasRates: true,
                      multiUnit: unit.multiUnit,
                      customerFK: customerDataId,
                      selectedCustomerBillingPlantId: customerPlantId || null,
                      customerPlantFK: customerPlantId || null,
                    })
                  : OrderEntryServices.findAllUnitTypes({
                      searchTerm: term || "",
                      pageSize: 100,
                      hasRates: false,
                      multiUnit: unit.multiUnit,
                    })
              }
              className={`${errors?.unit?.unitTypeFK ? "borderRed" : "borderGreen"}`}
              clearInputCallback={() => {
                dispatch(setSelectedUnitType(null));
                updateUnitFields({ unitTypeFK: null });
              }}
            />

            <ButtonLookup onClick={() => setUnitTypeModal(true)} />
          </Col>
        </Form.Group>
        {unit.unitTypeFK > 0 && (
          <>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col xs={4} className="p-0">
                <Form.Label htmlFor="name" className={`customColFormLabel text-capitalize`} id="unitNumber">
                  unit number
                </Form.Label>
                {/* <TooltipWrapper fieldName={"unitNumber"} /> */}
              </Col>

              <Col xs={7} className="p-0">
                <Input
                  className={`customFormControl`}
                  name={"unit.unitNumber"}
                  required
                  autoComplete="off"
                  value={unit.unitNumber}
                  maxLength={batchLoads ? 20 - firstBatchSequence?.length : 20}
                  onChange={(e) => {
                    const unitNumber = setFormattedInputValue(e.target, e.target.value.toUpperCase());
                    dispatch(setOrderEntrySchemaConditions({ unitNumberValidity: null }));

                    updateUnitFields({ unitNumber });
                  }}
                  control={control}
                  onBlur={(e) => checkUnitNumberUniqe(e.target.value)}
                />
              </Col>
            </Form.Group>

            {
              <Row>
                <Col xs={4}></Col>
                <Col style={{ paddingLeft: "5px" }}>
                  <p className="mb-0 text-danger" style={{ height: "7px" }}>
                    {unit.unitNumber?.length > 5 && errors?.unit?.unitNumber?.message}
                  </p>
                </Col>
              </Row>
            }

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col xs={4} className="p-0">
                <Form.Label htmlFor="name" className={`customColFormLabel text-capitalize`} id="model">
                  model
                </Form.Label>
                {/* <TooltipWrapper fieldName={"model"} /> */}
              </Col>

              <Col xs={7} className="p-0 flex-shrink-0">
                <Input
                  className={`customFormControl`}
                  name={"unit.model"}
                  maxLength={21}
                  required={selectedCustomer?.requireModel}
                  value={unit.model}
                  onChange={(e) => updateUnitFields({ model: e.target.value })}
                  control={control}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col xs={4} className="p-0">
                <Form.Label htmlFor="name" className={`customColFormLabel text-capitalize`} id="modelCode">
                  model code
                </Form.Label>
                {/* <TooltipWrapper fieldName={"modelCode"} /> */}
              </Col>

              <Col xs={7} className="p-0 flex-shrink-0">
                <Input
                  className={`customFormControl`}
                  name={"unit.modelCode"}
                  maxLength={21}
                  value={unit.modelCode}
                  required={selectedCustomer?.requireModelCode}
                  onChange={(e) => updateUnitFields({ modelCode: e.target.value })}
                  control={control}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col xs={4} className="p-0">
                <Form.Label htmlFor="name" className={`customColFormLabel text-capitalize`} id="vin">
                  VIN
                </Form.Label>
                {/* <TooltipWrapper fieldName={"vin"} /> */}
              </Col>

              <Col xs={7} className="p-0 flex-shrink-0">
                <Input
                  className={`customFormControl`}
                  name={"unit.vin"}
                  maxLength={21}
                  value={unit.vin}
                  required={selectedCustomer?.requireVIN}
                  onChange={(e) => updateUnitFields({ vin: e.target.value })}
                  control={control}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col xs={4} className="p-0">
                <Form.Label htmlFor="name" className={`customColFormLabel text-capitalize`} id="serialNumber">
                  serial number
                </Form.Label>
                {/* <TooltipWrapper fieldName={"serialNumber"} /> */}
              </Col>

              <Col xs={7} className="p-0 flex-shrink-0">
                <Input
                  className={`customFormControl`}
                  name={"unit.serialNumber"}
                  maxLength={21}
                  value={unit.serialNumber}
                  required={selectedCustomer?.requireSerialNumber}
                  onChange={(e) => updateUnitFields({ serialNumber: e.target.value })}
                  control={control}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col xs={4} className="p-0">
                <Form.Label htmlFor="name" className={`customColFormLabel text-capitalize`} id="stockNumber">
                  stock number
                </Form.Label>
                {/* <TooltipWrapper fieldName={"stockNumber"} /> */}
              </Col>

              <Col xs={7} className="p-0 flex-shrink-0">
                <Input
                  className={`customFormControl`}
                  name={"unit.stockNumber"}
                  maxLength={21}
                  value={unit.stockNumber}
                  required={selectedCustomer?.requireStockNumber}
                  onChange={(e) => updateUnitFields({ stockNumber: e.target.value })}
                  control={control}
                />
              </Col>
            </Form.Group>

            <Form.Group
              className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
              ${!selectedUnitType?.motorized ? "hide-elements" : ""}`}
            >
              <Col xs={4} className="p-0">
                <Form.Label className={`customColFormLabel text-capitalize`} id="engineType">
                  engine type
                </Form.Label>
                {/* <TooltipWrapper fieldName={"engineType"} /> */}
              </Col>

              <Col xs={7} className={`p-0 ${styles.selectContainer}`}>
                <RadioButton
                  name="unit.gas" // here needed a common field name currently not so need to change after discussion
                  control={control}
                  horizontal
                  disabled={selectedUnitType?.towable}
                  defaultValue={
                    selectedUnitType?.motorized && !selectedUnitType?.towable
                      ? "enginegas"
                      : !selectedUnitType?.motorized && selectedUnitType?.towable
                        ? "enginediesel"
                        : null
                  }
                  forceCheckIf={
                    !selectedUnitType?.motorized && selectedUnitType?.towable ? "enginediesel" : null
                  }
                  onChange={(option) => updateUnitFields({ gas: option.value })}
                  options={[
                    { label: "Gas", value: "enginegas", disabled: selectedUnitType?.towable },
                    {
                      label: "Diesel",
                      value: "enginediesel",
                      hidden: !selectedUnitType?.motorized && selectedUnitType?.towable,
                    },
                    { label: "NA", value: "enginena", hidden: !isEngineNAVisible },
                  ]}
                  className=""
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0">
              <Col xs={4} className="p-0">
                <Form.Label className={`customColFormLabel text-capitalize`} id="specialCode">
                  special code
                </Form.Label>
                {/* <TooltipWrapper fieldName={"specialCode"} /> */}
              </Col>

              <Col xs={7} className={`p-0 ${styles.selectContainer}`}>
                {/* Special Code Autocomplete */}
                <AutoComplete
                  searchString={unit.specialCodeName}
                  handleSearchString={(string) => updateUnitFields({ specialCodeName: string })}
                  onSelect={handleSpecialCodeSelection}
                  selectedId={unit.specialCodeFK}
                  renderItemId={(code) => code.specialCodePK}
                  renderItemField={(code) => code.description}
                  queryKey={["specialCodeDetail"]}
                  queryFn={(term) =>
                    OrderEntryServices.fetchSpecialCodedetails({ searchTerm: term || "", isOEPP: "Lookup" })
                  }
                  clearInputCallback={() => {
                    updateUnitFields({ specialCodeFK: null });
                  }}
                />
                <ButtonLookup onClick={() => setSpecialCodeModal(true)} />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0">
              <Col xs={4} className="p-0">
                <Form.Label className={`customColFormLabel text-capitalize`} id="pickupDealer">
                  pickup dealer
                </Form.Label>
                {/* <TooltipWrapper fieldName={"pickupDealer"} /> */}
              </Col>
              {(pickupAtPlant && pickupCustomerPlantFK) || unit.miscellaneousPickup ? (
                <Col xs={7} className={`p-0 `}>
                  <Input
                    className={`customFormControl`}
                    name={"selectedPickupDealer"}
                    value={selectedPickupDealer?.name}
                    disabled
                  />
                </Col>
              ) : (
                <>
                  <Col xs={7} className={`p-0 ${styles.selectContainer}`}>
                    {/* Pickup Dealer Autocomplete */}
                    <AutoComplete
                      searchString={unit.pickupDealerName}
                      handleSearchString={(string) => updateUnitFields({ pickupDealerName: string })}
                      onSelect={handlePickupDealerSelection}
                      selectedId={unit.pickupDealerFK}
                      disabled={unit.miscellaneousPickup || pickupAtPlant}
                      renderItemId={(dealer) => dealer.dealerPK}
                      renderItemField={(dealer) => dealer.name}
                      queryKey={["dealerDetail"]}
                      queryFn={(term) =>
                        DealerServices.fetchDealers({
                          searchTerms: term || "",
                          dealerSearchType: dealerSearchType,
                        })
                      }
                      className={`${errors?.unit?.pickupDealerFK ? "borderRed" : "borderGreen"}`}
                      clearInputCallback={() => {
                        dispatch(setPickupDealer(null));
                        dispatch(setSelectedPickupDealer(null));
                        updateUnitFields({ pickupDealerFK: null });
                        updateUnitFields({ brokerType: "default" });
                      }}
                    />
                    <ButtonLookup
                      onClick={() => setPickupDealerModal(true)}
                      disabled={pickupAtPlant || unit.miscellaneousPickup}
                    />
                  </Col>
                </>
              )}
            </Form.Group>

            <Form.Group className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0`}>
              <Col
                xs={4}
                className="p-0  d-flex justify-content-end"
                style={{
                  position: "relative",
                  right: "20px",
                }}
              >
                {!(pickupAtPlant || unit.miscellaneousPickup) && (
                  <RadioButton
                    name="dealerSearchType"
                    control={control}
                    leftLabel
                    defaultValue={dealerSearchType}
                    onChange={(option) => setDealerSearchType(option.value)}
                    options={[{ label: "Search By State/City", value: "AutocompleteByCityState" }]}
                    className=""
                  />
                )}
              </Col>

              <Col xs={7} className="p-0 flex-shrink-0">
                <Input
                  className={`customFormControl`}
                  name={"selectedPickupDealer"}
                  value={selectedPickupDealer?.address1}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0">
              <Col
                xs={4}
                className="p-0  d-flex justify-content-end"
                style={{
                  position: "relative",
                  right: "20px",
                }}
              >
                {!(pickupAtPlant || unit.miscellaneousPickup) && (
                  <RadioButton
                    name="dealerSearchType"
                    control={control}
                    leftLabel
                    defaultValue={dealerSearchType}
                    onChange={(option) => setDealerSearchType(option.value)}
                    options={[{ label: "Search By Name", value: "AutocompleteByName" }]}
                    className=""
                  />
                )}
              </Col>
              <Col xs={7} className="p-0 flex-shrink-0">
                <Input
                  className={`customFormControl`}
                  name={"selectedPickupDealer"}
                  value={selectedPickupDealer?.address2}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0">
              <Col xs={4} className="p-0">
                <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`}></Form.Label>
              </Col>

              <Col xs={7} className="p-0 flex-shrink-0">
                <Input
                  className={`customFormControl`}
                  name={"selectedPickupDealer"}
                  value={`${selectedPickupDealer?.city?.trim() || ""} ${
                    selectedPickupDealer?.stateCode || ""
                  } ${selectedPickupDealer?.postalCode || ""}`}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group
              className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                        ${
                          !allowMiscellaneousDealers || pickupAtPlant || unit.pickupDealerFK
                            ? "hide-elements"
                            : ""
                        }`}
            >
              <Col xs={4} className="p-0">
                <Form.Label className={`customColFormLabel text-capitalize`} id="miscellaneousPickup">
                  Miscellaneous pickup
                </Form.Label>
                {/* <TooltipWrapper fieldName={"miscellaneousPickup"} /> */}
              </Col>

              <Col xs={7} md={5} sm={7} className="p-0">
                {!unit.pickupDealerFK && (
                  <Checkbox
                    name="unit.miscellaneousPickup"
                    control={control}
                    onChange={(value) => {
                      updateUnitFields({ miscellaneousPickup: value });
                      if (!value) {
                        dispatch(setMiscPickupID(null));
                      }
                    }}
                    disabled={false}
                  />
                )}
              </Col>
            </Form.Group>
            <Form.Group
              className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0"
              //   hidden={unitTypeFK == ''}
            >
              <Col xs={4} className="p-0">
                <Form.Label className={`customColFormLabel text-capitalize`} id="deliveryDealer">
                  delivery dealer
                </Form.Label>
                {/* <TooltipWrapper fieldName={"deliveryDealer"} /> */}
              </Col>

              {(deliverToPlant && deliveryCustomerPlantFK) || unit.miscellaneousDelivery ? (
                <Col xs={7} className={`p-0 `}>
                  <Input
                    className={`customFormControl`}
                    name={"selectedDeliveryDealer"}
                    value={selectedDeliveryDealer?.name}
                    disabled
                  />
                </Col>
              ) : (
                <>
                  <Col xs={7} className={`p-0 ${styles.selectContainer}`}>
                    {/* Delivery Dealer Autocomplete */}

                    <AutoComplete
                      searchString={unit.deliveryDealerName}
                      handleSearchString={(string) => updateUnitFields({ deliveryDealerName: string })}
                      onSelect={handleDeliveryDealerSelection}
                      selectedId={unit.deliveryDealerFK}
                      disabled={unit.miscellaneousDelivery || deliverToPlant}
                      renderItemId={(dealer) => dealer.dealerPK}
                      renderItemField={(dealer) => dealer.name}
                      queryKey={["dealerDetail"]}
                      queryFn={(term) =>
                        DealerServices.fetchDealers({
                          searchTerms: term || "",
                          dealerSearchType: deliverydealerSearchType,
                        })
                      }
                      towardsTop
                      className={`${errors?.unit?.deliveryDealerFK ? "borderRed" : "borderGreen"}`}
                      clearInputCallback={() => {
                        dispatch(setDeliveryDealer(null));
                        dispatch(setSelectedDeliveryDealer(null));
                        updateUnitFields({ deliveryDealerFK: null });
                        updateUnitFields({ brokerType: "default" });
                      }}
                    />

                    <ButtonLookup
                      onClick={() => setDeliveryDealerModal(true)}
                      disabled={unit.miscellaneousDelivery || deliverToPlant}
                    />
                  </Col>
                </>
              )}
            </Form.Group>
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0">
              <Col
                xs={4}
                className="p-0  d-flex justify-content-end"
                style={{
                  position: "relative",
                  right: "20px",
                }}
              >
                {!(unit.miscellaneousDelivery || deliverToPlant) && (
                  <RadioButton
                    name="deliveryDealerSearchType"
                    control={control}
                    leftLabel
                    defaultValue={deliverydealerSearchType}
                    onChange={(option) => setDeliveryDealerSearchType(option.value)}
                    options={[{ label: "Search By State/City", value: "AutocompleteByCityState" }]}
                    className=""
                  />
                )}
              </Col>
              <Col xs={7} className="p-0 flex-shrink-0">
                <Input
                  className={`customFormControl`}
                  name={"selectedDeliveryDealer"}
                  value={selectedDeliveryDealer?.address1}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0">
              <Col
                xs={4}
                className="p-0  d-flex justify-content-end"
                style={{
                  position: "relative",
                  right: "20px",
                }}
              >
                {!(unit.miscellaneousDelivery || deliverToPlant) && (
                  <RadioButton
                    name="deliveryDealerSearchType"
                    control={control}
                    leftLabel
                    defaultValue={deliverydealerSearchType}
                    onChange={(option) => setDeliveryDealerSearchType(option.value)}
                    options={[{ label: "Search By Name", value: "AutocompleteByName" }]}
                    className=""
                  />
                )}
              </Col>

              <Col xs={7} className="p-0 flex-shrink-0">
                <Input
                  className={`customFormControl`}
                  name={"selectedDeliveryDealer"}
                  value={selectedDeliveryDealer?.address2}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0">
              <Col xs={4} className="p-0">
                <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`}></Form.Label>
              </Col>

              <Col xs={7} className="p-0 flex-shrink-0">
                <Input
                  className={`customFormControl`}
                  name={"selectedDeliveryDealer"}
                  value={`${selectedDeliveryDealer?.city?.trim() || ""} ${
                    selectedDeliveryDealer?.stateCode || ""
                  } ${selectedDeliveryDealer?.postalCode || ""}`}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group
              className={`mt-3 form-group m-t-5 m-b-15 align-items-center row  m-l-0 m-r-0 ms-0
                        ${
                          !allowMiscellaneousDealers || deliverToPlant || unit.deliveryDealerFK
                            ? "hide-elements"
                            : ""
                        }`}
            >
              <Col xs={4} className="p-0">
                <Form.Label className={`customColFormLabel text-capitalize`} id="miscellaneousDelivery">
                  Miscellaneous delivery
                </Form.Label>
                {/* <TooltipWrapper fieldName={"miscellaneousDelivery"} /> */}
              </Col>

              <Col xs={7} md={5} sm={7} className="p-0">
                <Checkbox
                  name="unit.miscellaneousDelivery"
                  control={control}
                  onChange={(value) => {
                    updateUnitFields({ miscellaneousDelivery: value });
                    if (!value) {
                      dispatch(setMiscDeliveryID(null));
                    }
                  }}
                  disabled={false}
                />
              </Col>
            </Form.Group>
          </>
        )}
      </Col>
      {/* UnitType Lookup Modal */}
      {unitTypeModal && (
        <CommonNormalLookup
          id={"unitTypePK"}
          show={unitTypeModal}
          onHide={() => setUnitTypeModal(false)}
          unitType
          doubleArrowUp
          doubleArrowDown
          tripleArrowUp
          tripleArrowDown
          lookupTitle={"Unit Type Selection"}
          columns={[
            { label: "Unit Code", key: "unitCode" },
            { label: "Description", key: "descriptionLong" },
          ]}
          handleLookupSelection={handleUnitTypeSelection}
          fetchFunction={(params) =>
            customerRatesList.length > 0
              ? OrderEntryServices.fetchUnitTypesByCustomer({
                  searchTerm: params.searchTerms || "",
                  pageSize: 12,
                  type: "Lookup",
                  customerFK: customerDataId,
                  selectedCustomerBillingPlantId: null, /// customerPlantId,
                  customerPlantFK: customerPlantId,
                  sortFlag: params.sortType,
                  ...params,
                })
              : OrderEntryServices.findAllUnitTypes({
                  searchTerm: params.searchTerms || "",
                  pageSize: 12,
                  type: "Lookup",
                  sortFlag: params.sortType,
                  ...params,
                })
          }
        />
      )}

      {/* SpecialCode Lookup Modal */}
      {specialCodeModal && (
        <CommonNormalLookup
          id={"specialCodePK"}
          show={specialCodeModal}
          onHide={() => setSpecialCodeModal(false)}
          lookupTitle={"Special Code Selection"}
          columns={[
            { label: "Code", key: "code" },
            { label: "Description", key: "description" },
          ]}
          handleLookupSelection={handleSpecialCodeSelection}
          fetchFunction={(params) =>
            OrderEntryServices.fetchSpecialCodedetails({
              searchTerm: params.searchTerms || "",
              type: "Lookup",
              ...params,
            })
          }
        />
      )}

      {/* Pickup Dealer Lookup Modal */}
      {pickupDealerModal && (
        <CommonAdvancedLookup
          id={"dealerPK"}
          show={pickupDealerModal}
          onHide={() => setPickupDealerModal(false)}
          lookupTitle={"Dealer Selection"}
          columns={[
            { label: "Name", key: "name" },
            { label: "DBA", key: "dba" },
            { label: "City", key: "city" },
            { label: "State", key: "stateCode" },
          ]}
          dynamicInputTargetKey={"dealer"}
          dynamicInputDefaultFields={CSTMR_DYNAMIC_INPUT_DEFAULT}
          dynamicInputlist={DEALER_DYNAMIC_INPUT_LIST}
          showAdvancedSearchFlag
          showAdvancedSortFlag
          radioOrderObj={DEALER_RADIO_OBJ}
          handleLookupSelection={handlePickupDealerSelection}
          fetchFunction={(params) =>
            DealerServices.fetchDealers({
              number: params.pageNumber,
              includePostalCodePK: false,
              ...params,
            })
          }
        />
      )}
      {/* Delivery Dealer Lookup Modal */}
      {deliveryDealerModal && (
        <CommonAdvancedLookup
          id={"dealerPK"}
          show={deliveryDealerModal}
          onHide={() => setDeliveryDealerModal(false)}
          lookupTitle={"Dealer Selection"}
          columns={[
            { label: "Name", key: "name" },
            { label: "DBA", key: "dba" },
            { label: "City", key: "city" },
            { label: "State", key: "stateCode" },
          ]}
          dynamicInputTargetKey={"dealer"}
          dynamicInputDefaultFields={CSTMR_DYNAMIC_INPUT_DEFAULT}
          dynamicInputlist={DEALER_DYNAMIC_INPUT_LIST}
          showAdvancedSearchFlag
          showAdvancedSortFlag
          radioOrderObj={DEALER_RADIO_OBJ}
          handleLookupSelection={handleDeliveryDealerSelection}
          fetchFunction={(params) =>
            DealerServices.fetchDealers({
              number: params.pageNumber,
              includePostalCodePK: false,
              ...params,
            })
          }
        />
      )}
    </>
  );
};

export default memo(UnitSectionA);
