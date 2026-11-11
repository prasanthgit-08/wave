import { parseLocalDate } from "../../../../../utils/dateUtils";
import { Col, Form, Row } from "react-bootstrap";
import DynamicText from "../../../../../components/common/dynamicText";
import { memo, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import Checkbox from "../../../../../components/common/checkbox";
import Input from "../../../../../components/common/input";
import AutoComplete from "../../../../../components/common/autoComplete";
import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import DateInput from "../../../../../components/common/dateInput";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentCompany } from "../../../../../utils/utils";
import CommonModal from "../../../../../components/common/commonModal";
import { setMultiUnitPopupLoad } from "../../../../../store/slices/unit.slice";
import MultiUnitModal from "./modal/MultiUnitLoadModal";
import Loading from "../../../../../components/common/loading";

const UnitSectionC = ({
  styles,
  updateUnitFields,
  handleMultiUnitLoadSelection,
  requiredCDLAHidden,
  invalidDate,
  setInvalidDate,
  invalidDateError,
  multiUnitFilteredList,
  invalidEarliestDeliveryDate,
  setInvalidEarliestDeliveryDate,
  invalidEarliestDeliveryDateError,
  invalidLatestDeliveryDate,
  setInvalidLatestDeliveryDate,
  invalidLatestDeliveryDateError,
  invalidEarliestPickupDate,
  setInvalidEarliestPickupDate,
  invalidEarliestPickupDateError,
  invalidLatestPickupDate,
  setInvalidLatestPickupDate,
  invalidLatestPickupDateError,
  cityMaxLimit,
  setCityMaxLimit,
  showMoreInfo,
  setShowMoreInfo,
  multiUnitLoadData,
  handleCityMaxLimitClose,
  multiLoadPcMilerDistance,
  showMultiLoadDistance,
  setShowMultiLoadDistance,
  citiesWithStatecode,
  distanceConfirmationYes,
  distanceLoading,
}) => {
  const [data, setData] = useState([]);
  const [popUpLoadModal, setPopUpLoadModal] = useState(false);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const dispatch = useDispatch();

  const selectedUnitType = useSelector((state) => state.unit.selectedUnitType);
  const miscPickupID = useSelector((state) => state.unit.miscPickupID);
  const miscDeliveryID = useSelector((state) => state.unit.miscDeliveryID);

  const deliveryDealerTWICRequired = useSelector((state) => state.unit.selectedDeliveryDealer?.twicRequired);
  const customerUsePlants = useSelector((state) => state.unit.selectedCustomer.usePlants);
  const customerRequireFactoryRelease = useSelector(
    (state) => state.unit.selectedCustomer?.requireFactoryRelease
  );
  const customerOutBound = useSelector((state) => state.unit.orderEntrySchemaConditions.customer?.outBound);
  const selectedPlant = useSelector((state) => state.unit.selectedPlant);
  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);
  const selectedPickupDealer = useSelector((state) => state.unit.selectedPickupDealer);
  const selectedDeliveryDealer = useSelector((state) => state.unit.selectedDeliveryDealer);
  const customerDealerList = useSelector((state) => state.unit.customerDealerList);
  const activeDispatchValid = useSelector((state) => state.unit.activeDispatchValid);
  const isCreditCardRequired = useSelector((state) => state.unit.isCreditCardRequired);
  const calculateInvoiceLoading = useSelector((state) => state.unit.calculateInvoiceLoading);

  const unit = useWatch({ name: "unit" });
  const customerDataId = useWatch({ name: "customer.customerDataId" });
  const customerPlantId = useWatch({ name: "customer.customerPlantId" });
  const pickupCustomerPlantFK = useWatch({ name: "customer.pickupCustomerPlantFK" });
  const deliveryCustomerPlantFK = useWatch({ name: "customer.deliveryCustomerPlantFK" });
  const pickupYardFK = useWatch({ name: "customer.pickupYardFK" });
  const pickupShuttleCityFK = useWatch({ name: "customer.pickupShuttleCityFK" });
  const batchLoads = useWatch({ name: "customer.batchLoads" });
  const customerPickAtPlant = useWatch({ name: "customer.pickupAtPlant" });
  const customerDeliverToPlant = useWatch({ name: "customer.deliverToPlant" });
  const customerShuttleToYard = useWatch({ name: "customer.shuttleToYard" });
  const customerReload = useWatch({ name: "customer.reload" });
  const company = getCurrentCompany();
  let requirePlantReleases = company?.requirePlantReleases;

  // Deliver by date must be today or later, and not before the release date when one is entered
  const releaseDate = parseLocalDate(unit.dispatchReleaseDate);
  const today = new Date();
  const deliverByMinDate = releaseDate && releaseDate > today ? releaseDate : today;

  useEffect(() => {
    if (Number(unit.unitsPerDispatchUnit) > 2 || !unit.multiUnit) {
      updateUnitFields({ twoAsThree: false, requireFlatbed: false });
    }
    if (!selectedPickupDealer || !selectedDeliveryDealer) {
      updateUnitFields({ multiUnit: false, unitMultiLoadName: "" });
    }
    if (
      selectedUnitType?.allowPopup &&
      unit.unitMultiLoadName === "Add New Record" &&
      Number(unit.unitsPerDispatchUnit) >= 3
    ) {
      setPopUpLoadModal(true);
    }
  }, [
    unit.unitsPerDispatchUnit,
    unit.unitMultiLoadName,
    selectedPickupDealer,
    selectedDeliveryDealer,
    unit.multiUnit,
  ]);

  useEffect(() => {
    const value =
      unit.dealerPickup ||
      unit.storage ||
      unit.unitOnHold ||
      batchLoads ||
      unit.doNotDispatch ||
      activeDispatchValid ||
      (!unit.plantRelease && customerPickAtPlant) ||
      (pickupYardFK && pickupShuttleCityFK && customerShuttleToYard);

    if (value) {
      updateUnitFields({ activateDispatch: false });
    }
  }, [
    unit.storage,
    unit.unitOnHold,
    unit.doNotDispatch,
    unit.dealerPickup,
    unit.plantRelease,
    customerPickAtPlant,
    pickupYardFK,
    batchLoads,
    pickupShuttleCityFK,
    customerShuttleToYard,
    activeDispatchValid,
  ]);

  if (!unit.unitTypeFK) return null;
  return (
    <Col xs={5}>
      {distanceLoading && <Loading />}
      <Row>
        <Col xs={5} className={"pe-0"}>
          <Form.Group
            className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                            ${requiredCDLAHidden ? "hide-elements" : ""}`}
          >
            <Col xs={8} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="cdlaRequired">
                required CDL-A
              </Form.Label>
              {/* <TooltipWrapper fieldName={"cdlaRequired"} /> */}
            </Col>

            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.cdlaRequired"
                control={control}
                onChange={(value) => updateUnitFields({ cdlaRequired: value })}
                disabled={false}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-5 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                            ${customerReload && !selectedUnitType?.towable ? "" : "hide-elements"}`}
            //
          >
            <Col xs={8} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="tankerRequired">
                tanker{" "}
              </Form.Label>
              {/* <TooltipWrapper fieldName={"tankerRequired"} /> */}
            </Col>

            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.tankerRequired"
                control={control}
                onChange={(value) => updateUnitFields({ tankerRequired: value })}
                disabled={false}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-5 form-group  align-items-center row  m-l-0 m-r-0 ms-0  ${
              deliveryDealerTWICRequired ? "" : "hide-elements"
            }`}
          >
            <Col xs={8} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="twicRequired">
                required TWIC
              </Form.Label>
              {/* <TooltipWrapper fieldName={"twicRequired"} /> */}
            </Col>

            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.TWICRequired"
                control={control}
                onChange={(value) => updateUnitFields({ TWICRequired: value })}
                disabled={false}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-5 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                            ${selectedUnitType?.motorized ? "" : "hide-elements"}`}
          >
            <Col xs={8} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="ifta">
                required IFTA reporting
              </Form.Label>
              {/* <TooltipWrapper fieldName={"ifta"} /> */}
            </Col>
            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.ifta"
                control={control}
                disabled={unit.gvwr}
                // onChange={(value) => updateUnitFields({ ifta: value })}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0">
            <Col xs={8} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="hasDrivebys">
                has driveby's
              </Form.Label>
              {/* <TooltipWrapper fieldName={"hasDrivebys"} /> */}
            </Col>

            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.hasDrivebys"
                control={control}
                onChange={(value) => updateUnitFields({ hasDrivebys: value })}
                disabled={false}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                            ${
                              customerShuttleToYard &&
                              customerPickAtPlant &&
                              customerUsePlants &&
                              selectedPlant?.dpuPickup
                                ? ""
                                : "hide-elements"
                            }`}
          >
            <Col xs={8} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="dealerPickup">
                dealer pickup
              </Form.Label>
              {/* <TooltipWrapper fieldName={"dealerPickup"} /> */}
            </Col>

            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.dealerPickup"
                control={control}
                onChange={(value) => updateUnitFields({ dealerPickup: value })}
                disabled={unit.storage || unit.unitOnHold}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
              customerShuttleToYard && customerPickAtPlant && customerUsePlants ? "" : "hide-elements"
            }`}
          >
            <Col xs={8} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="storage">
                storage
              </Form.Label>
              {/* <TooltipWrapper fieldName={"storage"} /> */}
            </Col>

            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.storage"
                control={control}
                onChange={(value) => updateUnitFields({ storage: value })}
                disabled={unit.dealerPickup || unit.unitOnHold}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0">
            <Col xs={8} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="unitOnHold">
                on Hold
              </Form.Label>
              {/* <TooltipWrapper fieldName={"unitOnHold"} /> */}
            </Col>

            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.unitOnHold"
                control={control}
                onChange={(value) => updateUnitFields({ unitOnHold: value })}
                disabled={unit.dealerPickup}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0">
            <Col xs={8} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="noInvoice">
                do not invoice
              </Form.Label>
              {/* <TooltipWrapper fieldName={"noInvoice"} /> */}
            </Col>

            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.noInvoice"
                control={control}
                onChange={(value) => updateUnitFields({ noInvoice: value })}
                disabled={false}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                            ${
                              customerPickAtPlant && customerRequireFactoryRelease && requirePlantReleases
                                ? ""
                                : "hide-elements"
                            }`}
          >
            <Col xs={8} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="plantRelease">
                factory release
              </Form.Label>
              {/* <TooltipWrapper fieldName={"plantRelease"} /> */}
            </Col>

            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.plantRelease"
                control={control}
                onChange={(value) => updateUnitFields({ plantRelease: value })}
                disabled={false}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                            ${
                              selectedUnitType?.allowMultiUnit &&
                              !selectedUnitType?.motorized &&
                              (unit.pickupDealerFK ||
                                (customerPickAtPlant && pickupCustomerPlantFK) ||
                                miscPickupID ||
                                selectedPickupDealer) &&
                              (unit.deliveryDealerFK ||
                                (customerDeliverToPlant && deliveryCustomerPlantFK) ||
                                miscDeliveryID ||
                                selectedDeliveryDealer) &&
                              !batchLoads
                                ? ""
                                : "hide-elements"
                            }`}
          >
            <Col xs={8} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="multiUnit">
                multi unit load
              </Form.Label>
              {/* <TooltipWrapper fieldName={"multiUnit"} /> */}
            </Col>
            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.multiUnit"
                control={control}
                checked={unit.storage || unit.doNotDispatch ? false : unit.multiUnit}
                onChange={(value) => updateUnitFields({ multiUnit: value })}
                disabled={unit.dealerPickup}
                // disabled={unit.dealerPickup ||showMultiUnitLoadDiv}  have some doubt in showMultiUnitLoadDiv
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={7}>
          <p
            className={`mt-3  customColFormLabel text-capitalize`}
            style={{ marginBottom: "-6px" }}
            id="miscellaneousBOLText"
          >
            miscellaneous BOL text
            {/* <TooltipWrapper fieldName={"miscellaneousBOLText"} /> */}
          </p>
          {/* miscellaneous BOL text fields */}
          <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0">
            <Col xs={11} className="p-0">
              <DynamicText
                numFields={7}
                maxCharLimit={42}
                inputValues={unit.miscellaneousBOLText}
                setInputValues={(data) => updateUnitFields({ miscellaneousBOLText: data })}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                            ${unit.dealerPickup && selectedPlant?.promptDPUOwner ? "" : "hide-elements"}`}
          >
            <Col xs={7} className="p-0 flex-shrink-0">
              <Input
                className={`customFormControl`}
                control={control}
                name={"unit.customerDPUPickupsVO"}
                value={unit.customerDPUPickupsVO}
                maxLength={30}
                onChange={(e) => {
                  updateUnitFields({ customerDPUPickupsVO: e.target.value });
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                            ${
                              selectedUnitType?.requiresELD && selectedCustomer?.eldFee ? "" : "hide-elements"
                            }`}
          >
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="invoiceELDFee">
                invoice ELD fee
              </Form.Label>
              {/* <TooltipWrapper fieldName={"invoiceELDFee"} /> */}
            </Col>

            <Col xs={4} className="p-0 p-0 flex-shrink-0">
              <Input
                className={`customFormControl`}
                control={control}
                name={"unit.invoiceELDFee"}
                value={unit.invoiceELDFee}
                maxLength={10}
                max={2147483647}
                disabled={selectedCustomer?.invoiceELDAmount > 0}
                onChange={(e) => {
                  updateUnitFields({ invoiceELDFee: e.target.value });
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0
            ${selectedUnitType?.requiresELD && selectedCustomer?.eldFee ? "" : "hide-elements"}`}
          >
            <Col xs={5} className="p-0">
              <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="driverELDFee">
                driver ELD fee
              </Form.Label>
              {/* <TooltipWrapper fieldName={"driverELDFee"} /> */}
            </Col>

            <Col xs={4} className="p-0 p-0 flex-shrink-0">
              <Input
                className={`customFormControl`}
                control={control}
                name={"unit.driverELDFee"}
                value={unit.driverELDFee}
                maxLength={10}
                max={2147483647}
                disabled={selectedCustomer?.invoiceELDAmount > 0}
                onChange={(e) => {
                  updateUnitFields({ driverELDFee: e.target.value });
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0">
            <Col xs={5} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="doNotDispatch">
                do not dispatch
              </Form.Label>
              {/* <TooltipWrapper fieldName={"doNotDispatch"} /> */}
            </Col>

            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.doNotDispatch"
                control={control}
                checked={unit.doNotDispatch || unit.unitOnHold || unit.storage || unit.dealerPickup}
                onChange={(value) => updateUnitFields({ doNotDispatch: value })}
                disabled={false}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0">
            <Col xs={5} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="activateDispatch">
                activate dispatch
              </Form.Label>
              {/* <TooltipWrapper fieldName={"activateDispatch"} /> */}
            </Col>

            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.activateDispatch"
                control={control}
                onChange={(value) => updateUnitFields({ activateDispatch: value })}
                disabled={
                  unit.dealerPickup ||
                  unit.storage ||
                  unit.unitOnHold ||
                  unit.doNotDispatch ||
                  batchLoads ||
                  activeDispatchValid ||
                  (!unit.plantRelease && customerPickAtPlant) ||
                  (pickupYardFK && pickupShuttleCityFK && customerShuttleToYard)
                }
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                            ${!unit.multiUnit || batchLoads ? "hide-elements" : ""}`}
          >
            <Col xs={5} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="unitsPerDispatch">
                units per dispatch
              </Form.Label>
              {/* <TooltipWrapper fieldName={"unitsPerDispatch"} /> */}
            </Col>
            <Col xs={3} className="p-0">
              <Input
                className={`rounded-2`}
                control={control}
                type={"number"}
                name={"unit.unitsPerDispatchUnit"}
                value={unit.unitsPerDispatchUnit}
                min={2}
                disabled={calculateInvoiceLoading}
                max={selectedUnitType?.allowTruckCamper ? 5 : 10}
                maxLength={selectedUnitType?.allowTruckCamper ? 5 : 10}
                onChange={(e) => {
                  updateUnitFields({
                    unitsPerDispatchUnit: e.target.value,
                    unitMultiLoadName: "",
                    unitMultiLoadPK: null,
                  });
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <Col xs={9}>
        <Form.Group
          className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                            ${!unit.multiUnit || batchLoads ? "hide-elements" : ""}`}
        >
          <Col xs={4} className="p-0">
            <Form.Label className={`customColFormLabel text-capitalize`} id="unitMultiLoad">
              multi unit load
            </Form.Label>
            {/* <TooltipWrapper fieldName="unitMultiLoad"} /> */}
          </Col>

          <Col xs={7} className={` ps-3 pe-0 ${styles.selectContainer}`}>
            {/* Mutli Unit load Autocomplete */}
            <AutoComplete
              arrayList={[
                ...multiUnitFilteredList,
                {
                  unitMultiLoadPK: null,
                  city: "Add New Record",
                },
              ]}
              searchString={unit.unitMultiLoadName}
              handleSearchString={(string) => updateUnitFields({ unitMultiLoadName: string })}
              onSelect={handleMultiUnitLoadSelection}
              selectedId={unit.unitMultiLoadPK}
              // disabled={!unit.miscellaneousPickup}
              renderItemId={(multiload) => multiload.unitMultiLoadPK}
              renderItemField={(multiload) => multiload.city}
              queryKey={["multiUnitLoadDetail"]}
              // queryFn={(term) =>

              // }
              className={`${
                errors?.unit?.unitMultiLoadPK || errors?.unit?.unitMultiLoadName ? "borderRed" : "borderGreen"
              }`}
              clearInputCallback={() => {
                // delerSelection.current.pickupDealer = null;
                updateUnitFields({ unitMultiLoadPK: null });
                // updateUnitFields({ brokerType: "default" });
              }}
              checked={unit.multiUnit || unit.storage || unit.doNotDispatch}
            />
          </Col>
        </Form.Group>
      </Col>

      {cityMaxLimit && (
        <MultiUnitModal
          show={cityMaxLimit}
          onHide={handleCityMaxLimitClose}
          title={"Warning"}
          body={
            "Exceeded maximum city limit. Please select 'Add New Record' option to add this delivery location."
          }
          handleNO={handleCityMaxLimitClose}
          moreInfo={multiUnitLoadData}
          showMoreInfo={showMoreInfo}
          showOK={cityMaxLimit}
          handleToggleShowMoreInfo={() => {
            setShowMoreInfo((prev) => !prev);
          }}
        />
      )}

      {showMultiLoadDistance && (
        <MultiUnitModal
          show={showMultiLoadDistance}
          onHide={handleCityMaxLimitClose}
          title={"Warning"}
          body={
            multiLoadPcMilerDistance === null
              ? "Sorry, something went wrong.Please try again."
              : `The distance between ${selectedDeliveryDealer?.city} ,${selectedDeliveryDealer?.stateCode} and ${citiesWithStatecode?.split(",")[0] || ""}, ${citiesWithStatecode?.split(",")[1]?.substring(0, 2) || ""} is ${multiLoadPcMilerDistance} miles, which is more than the allowed 15 miles. Are you sure you want to add this location?`
          }
          handleYES={distanceConfirmationYes}
          handleNO={handleCityMaxLimitClose}
          moreInfo={multiUnitLoadData}
          showMoreInfo={showMoreInfo}
          showOK={multiLoadPcMilerDistance === null}
          multiUnitLoadError={multiLoadPcMilerDistance === null}
          handleToggleShowMoreInfo={() => setShowMoreInfo((prev) => !prev)}
        />
      )}

      <Row>
        <Col xs={5} className="pe-0">
          <Form.Group
            className={`mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                   ${unit.unitsPerDispatchUnit > 2 || !unit.multiUnit ? "hide-elements" : ""}`}
          >
            <Col xs={8} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="twoAsThree">
                invoice 2 as 3
              </Form.Label>
              {/* <TooltipWrapper fieldName={"twoAsThree"} /> */}
            </Col>

            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.twoAsThree"
                control={control}
                onChange={(value) => updateUnitFields({ twoAsThree: value })}
                disabled={unit.dealerPickup || unit.storage || unit.doNotDispatch || unit.unitMultiLoadPK}
                //        !showMultiUnitLoadDiv ||--------------add condition
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                    ${unit.multiUnit && unit.unitsPerDispatchUnit > 2 ? "hide-elements" : ""}`}
          >
            <Col xs={8} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="requireFlatbed">
                require flatbed
              </Form.Label>
              {/* <TooltipWrapper fieldName={"requireFlatbed"} /> */}
            </Col>

            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.requireFlatbed"
                control={control}
                onChange={(value) => updateUnitFields({ requireFlatbed: value })}
                disabled={false}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
              ${
                selectedCustomer?.allDealersFOD ||
                selectedCustomer?.miscellaneousCustomer ||
                (customerDealerList?.foddealer && unit.deliveryDealerFK)
                  ? ""
                  : "hide-elements"
              }`}
          >
            <Col xs={8} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="deliveryDelayContact">
                contact dealer for delay
              </Form.Label>
              {/* <TooltipWrapper fieldName={"deliveryDelayContact"} /> */}
            </Col>

            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.deliveryDelayContact"
                control={control}
                checked={selectedCustomer?.miscellaneousCustomer || unit.deliveryDelayContact}
                onChange={(value) => updateUnitFields({ deliveryDelayContact: value })}
                disabled={selectedCustomer?.miscellaneousCustomer}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-3 mb-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
            ${
              selectedCustomer?.allDealersFOD ||
              selectedCustomer?.miscellaneousCustomer ||
              (customerDealerList?.foddealer && unit.deliveryDealerFK)
                ? ""
                : "hide-elements"
            }`}
          >
            <Col xs={8} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="invoiceFODBreakdownToDealer">
                invoice dealer for breakdown
              </Form.Label>
              {/* <TooltipWrapper fieldName={"invoiceFODBreakdownToDealer"} /> */}
            </Col>

            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.invoiceFODBreakdownToDealer"
                control={control}
                checked={selectedCustomer?.miscellaneousCustomer || unit.invoiceFODBreakdownToDealer}
                onChange={(value) => updateUnitFields({ invoiceFODBreakdownToDealer: value })}
                disabled={selectedCustomer?.miscellaneousCustomer}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-5 pt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                            ${!unit.unitTypeFK || unit.brokerType === "default" || !(!selectedPickupDealer?.canadian && selectedDeliveryDealer?.canadian) ? "hide-elements" : ""}`}
          >
            <Col xs={8} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="freezePOE">
                freeze port of entry
              </Form.Label>
              {/* <TooltipWrapper fieldName={"freezePOE"} /> */}
            </Col>

            <Col xs={3} className="p-0">
              <Checkbox
                name="unit.freezePOE"
                control={control}
                onChange={(value) => updateUnitFields({ freezePOE: value })}
                disabled={false}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={7}>
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0">
            <Col xs={5} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="orderDate">
                order date
              </Form.Label>
              {/* <TooltipWrapper fieldName={"orderDate"} /> */}
            </Col>

            <Col xs={6} className="p-0" style={{ width: "95px" }}>
              <DateInput
                date={unit.orderDate}
                setDate={(date) => updateUnitFields({ orderDate: date })}
                setIsDateValid={(valid) => updateUnitFields({ orderDateValid: valid })}
                name={"unit.orderDate"}
                className={errors?.unit?.orderDateValid ? "borderRed" : ""}
                max={new Date()}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                            ${!customerPickAtPlant && customerReload ? "hide-elements" : ""}`}
          >
            <Col xs={5} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="dispatchReleaseDate">
                release date
              </Form.Label>
              {/* <TooltipWrapper fieldName={"dispatchReleaseDate"} /> */}
            </Col>

            <Col xs={6} className="p-0" style={{ width: "95px" }}>
              <DateInput
                date={unit.dispatchReleaseDate}
                setDate={(date) => {
                  const releaseDay = parseLocalDate(date)?.setHours(0, 0, 0, 0);
                  const deliverByDay = parseLocalDate(unit.deliverByDate)?.setHours(0, 0, 0, 0);
                  // DateInput only validates on typing, so re-check deliver by date against the new release date
                  updateUnitFields(
                    releaseDay && deliverByDay && deliverByDay < releaseDay
                      ? { dispatchReleaseDate: date, deliverByDateValid: false }
                      : { dispatchReleaseDate: date }
                  );
                }}
                onBlur={() => {
                  if (errors?.unit?.deliverByDateValid) {
                    updateUnitFields({ deliverByDate: "" });
                  }
                }}
                setIsDateValid={(valid) => updateUnitFields({ dispatchReleaseDateValid: valid })}
                name={"unit.dispatchReleaseDate"}
                className={errors?.unit?.dispatchReleaseDateValid ? "borderRed" : ""}
                min={new Date()}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                            ${!customerPickAtPlant && customerReload ? "hide-elements" : ""}`}
          >
            <Col xs={5} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="deliverByDate">
                delivery by date
              </Form.Label>
              {/* <TooltipWrapper fieldName={"deliverByDate"} /> */}
            </Col>

            <Col xs={6} className="p-0" style={{ width: "95px" }}>
              <DateInput
                date={unit.deliverByDate}
                setDate={(date) => updateUnitFields({ deliverByDate: date })}
                setIsDateValid={(valid) => updateUnitFields({ deliverByDateValid: valid })}
                name={"unit.deliverByDate"}
                className={errors?.unit?.deliverByDateValid ? "borderRed" : ""}
                min={deliverByMinDate}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
                             ${!customerPickAtPlant && customerReload ? "" : "hide-elements"}`}
          >
            <Col xs={5} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="minimumPickupDate">
                earliest pickup date
              </Form.Label>
              {/* <TooltipWrapper fieldName={"minimumPickupDate"} /> */}
            </Col>

            <Col xs={6} className="p-0" style={{ width: "95px" }}>
              <DateInput
                date={unit.minimumPickupDate}
                setDate={(date) => updateUnitFields({ minimumPickupDate: date })}
                setIsDateValid={(valid) => updateUnitFields({ minimumPickupDateValid: valid })}
                name={"unit.minimumPickupDate"}
                className={errors?.unit?.minimumPickupDateValid ? "borderRed" : ""}
                min={new Date()}
                max={parseLocalDate(unit.minimumDeliveryDate) || parseLocalDate(unit.maximumPickupDate)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                            ${!customerPickAtPlant && customerReload ? "" : "hide-elements"}`}
          >
            <Col xs={5} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="maximumPickupDate">
                latest pickup date
              </Form.Label>
              {/* <TooltipWrapper fieldName={"maximumPickupDate"} /> */}
            </Col>

            <Col xs={6} className="p-0 flex-shrink-0" style={{ width: "95px" }}>
              <DateInput
                date={unit.maximumPickupDate}
                setDate={(date) => updateUnitFields({ maximumPickupDate: date })}
                setIsDateValid={(valid) => updateUnitFields({ maximumPickupDateValid: valid })}
                name={"unit.maximumPickupDate"}
                className={errors?.unit?.maximumPickupDateValid ? "borderRed" : ""}
                min={unit.minimumPickupDate ? parseLocalDate(unit.minimumPickupDate) : new Date()}
                max={parseLocalDate(unit.maximumPickupDate)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                            ${!customerPickAtPlant && customerReload ? "" : "hide-elements"}`}
          >
            <Col xs={5} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="minimumDeliveryDate">
                Earliest delivery date
              </Form.Label>
              {/* <TooltipWrapper fieldName={"minimumDeliveryDate"} /> */}
            </Col>

            <Col xs={6} className="p-0 flex-shrink-0" style={{ width: "95px" }}>
              <DateInput
                date={unit.minimumDeliveryDate}
                setDate={(date) => updateUnitFields({ minimumDeliveryDate: date })}
                setIsDateValid={(valid) => updateUnitFields({ minimumDeliveryDateValid: valid })}
                name={"unit.minimumDeliveryDate"}
                className={errors?.unit?.minimumDeliveryDateValid ? "borderRed" : ""}
                min={unit.minimumPickupDate ? parseLocalDate(unit.minimumPickupDate) : new Date()}
                max={parseLocalDate(unit.maximumDeliveryDate)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 
                            ${!customerPickAtPlant && customerReload ? "" : "hide-elements"}`}
            //
          >
            <Col xs={5} className="p-0">
              <Form.Label className={`customColFormLabel text-capitalize`} id="maximumDeliveryDate">
                latest delivery date
              </Form.Label>
              {/* <TooltipWrapper fieldName={"maximumDeliveryDate"} /> */}
            </Col>

            <Col xs={6} className="p-0 flex-shrink-0" style={{ width: "95px" }}>
              <DateInput
                date={unit.maximumDeliveryDate}
                setDate={(date) => updateUnitFields({ maximumDeliveryDate: date })}
                setIsDateValid={(valid) => updateUnitFields({ maximumDeliveryDateValid: valid })}
                name={"unit.maximumDeliveryDate"}
                className={errors?.unit?.maximumDeliveryDateValid ? "borderRed" : ""}
                min={
                  parseLocalDate(unit.minimumDeliveryDate) ||
                  parseLocalDate(unit.maximumPickupDate) ||
                  new Date()
                }
              />
            </Col>
          </Form.Group>
        </Col>

        {/* Date Validation Error Modal */}
        {invalidDate && (
          <CommonModal
            show={invalidDate}
            onHide={() => {
              setInvalidDate(false);
              updateUnitFields({ deliverByDate: "" });
            }}
            title={"Warning! Invalid Date!"}
            showError={true}
            body={invalidDateError}
            closeButton
            handleClose={() => {
              setInvalidDate(false);
              updateUnitFields({ deliverByDate: "" });
            }}
          />
        )}

        {/* Date Validation Error Modal - Earliest delivery date */}
        {invalidEarliestDeliveryDate && (
          <CommonModal
            show={invalidEarliestDeliveryDate}
            title="Warning! Invalid Date!"
            showError
            body={invalidEarliestDeliveryDateError}
            closeButton
            onHide={() => {
              setInvalidEarliestDeliveryDate(false);
              updateUnitFields({ minimumDeliveryDate: "" });
            }}
            handleClose={() => {
              setInvalidEarliestDeliveryDate(false);
              updateUnitFields({ minimumDeliveryDate: "" });
            }}
          />
        )}

        {/* Date Validation Error Modal -  latest delivery date*/}
        {invalidLatestDeliveryDate && (
          <CommonModal
            show={invalidLatestDeliveryDate}
            title={"Warning! Invalid Date!"}
            showError={true}
            body={invalidLatestDeliveryDateError}
            closeButton
            onHide={() => {
              setInvalidLatestDeliveryDate(false);
              updateUnitFields({ maximumDeliveryDate: "" });
            }}
            handleClose={() => {
              setInvalidLatestDeliveryDate(false);
              updateUnitFields({ maximumDeliveryDate: "" });
            }}
          />
        )}

        {/* Date Validation Error Modal -  earliest pickup date*/}
        {invalidEarliestPickupDate && (
          <CommonModal
            show={invalidEarliestPickupDate}
            title={"Warning! Invalid Date!"}
            showError={true}
            body={invalidEarliestPickupDateError}
            closeButton
            onHide={() => {
              setInvalidEarliestPickupDate(false);
              updateUnitFields({ minimumPickupDate: "" });
            }}
            handleClose={() => {
              setInvalidEarliestPickupDate(false);
              updateUnitFields({ minimumPickupDate: "" });
            }}
          />
        )}
        {/* Date Validation Error Modal - latest pickup date*/}
        {invalidLatestPickupDate && (
          <CommonModal
            show={invalidLatestPickupDate}
            title={"Warning! Invalid Date!"}
            showError={true}
            body={invalidLatestPickupDateError}
            closeButton
            onHide={() => {
              setInvalidLatestPickupDate(false);
              updateUnitFields({ maximumPickupDate: "" });
            }}
            handleClose={() => {
              setInvalidLatestPickupDate(false);
              updateUnitFields({ maximumPickupDate: "" });
            }}
          />
        )}
        {/* Multi Unit PopUp Load Modal */}
        {popUpLoadModal && (
          <CommonModal
            show={popUpLoadModal}
            onHide={() => {
              updateUnitFields({ unitMultiLoadName: "" });
              setPopUpLoadModal(false);
            }}
            title={"Pop up Load"}
            showError={true}
            body={"Is this a pop up trailer load?"}
            handleYES={() => {
              dispatch(setMultiUnitPopupLoad(true));
              setPopUpLoadModal(false);
            }}
            handleNO={() => {
              dispatch(setMultiUnitPopupLoad(false));
              setPopUpLoadModal(false);
            }}
          />
        )}
      </Row>
    </Col>
  );
};

export default memo(UnitSectionC);
