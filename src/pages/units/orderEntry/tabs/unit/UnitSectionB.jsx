import { Col, Form, Row } from "react-bootstrap";
import Loading from "../../../../../components/common/loading";
import { useFormContext, useWatch } from "react-hook-form";
import { memo, useState } from "react";
import Input from "../../../../../components/common/input";
import CustomButton from "../../../../../components/common/button";
import AutoComplete from "../../../../../components/common/autoComplete";
import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import CommonNormalLookup from "../../../../../components/lookup/commonNormalLookup";
import ButtonLookup from "../../../../../components/common/buttonLookup";
import {
  correctDecimalInputOnBlur,
  handleBeforeInputForInteger,
  handleDecimalValue,
} from "../../../../../utils/utils";
import { useSelector } from "react-redux";
import numberValidation from "../../../../../utils/validation/NumberValidation";
import FlatRateComponent from "../../flatRateComponent";

const UnitSectionB = ({
  styles,
  updateUnitFields,
  handleBrokerSelection,
  handlePortDetailsSelection,
  flaterateLoading,
  fetchCalculateRatesDebouncer,
}) => {
  const [brokerModal, setBrokerModal] = useState(false);
  const [portDetailsModal, setPortDetailsModal] = useState(false);
  const unit = useWatch({ name: "unit" });

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const orderEntryData = useSelector((state) => state.unit.orderEntrySchemaConditions);
  const askTolls = useSelector((state) => state.unit.orderEntrySchemaConditions.customer.askTolls);
  const askPermits = useSelector((state) => state.unit.orderEntrySchemaConditions.customer.askPermits);
  const pcMilerVisible = useSelector((state) => state.unit.pcMilerVisible);

  const requireBankClient = useSelector(
    (state) => state.unit.orderEntrySchemaConditions.customer.requireBankClient
  );
  const deliveryDealerTwicRequired = useSelector((state) => state.unit.selectedDeliveryDealer?.twicRequired);

  const selectedDeliveryDealer = useSelector((state) => state.unit.selectedDeliveryDealer);
  const selectedPickupDealer = useSelector((state) => state.unit.selectedPickupDealer);
  const selectedCustomer = useSelector((state) => state.unit.selectedCustomer);
  const customerDealerList = useSelector((state) => state.unit.customerDealerList);

  const pickupAtPlant = useWatch({ name: "customer.pickupAtPlant" });

  if (!unit.unitTypeFK) return null;

  const disabledBroker =
    !selectedPickupDealer?.canadian && selectedDeliveryDealer?.canadian && customerDealerList?.brokerFK;

  return (
    <Col xs={3}>
      <Form.Group className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0`}>
        <Col xs={5} className="p-0">
          <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="collectForCustomer">
            collect for customers
          </Form.Label>
          {/* <TooltipWrapper fieldName={"collectForCustomer"} /> */}
        </Col>

        <Col xs={2} className="p-0 flex-shrink-0">
          <Input
            className={`customFormControl`}
            name={"unit.collectForCustomer"}
            value={unit.collectForCustomer}
            onChange={(e) => {
              e.target.value = handleDecimalValue(e, 8);
              updateUnitFields({ collectForCustomer: e.target.value });
            }}
            maxLength={8}
          />
        </Col>
      </Form.Group>

      <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0">
        <Col xs={5} className="p-0">
          <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="poNumber">
            PO Number
          </Form.Label>
          {/* <TooltipWrapper fieldName={"poNumber"} /> */}
        </Col>

        <Col xs={7} className="p-0 flex-shrink-0">
          <Input
            className={`customFormControl`}
            name={"unit.poNumber"}
            value={unit.poNumber}
            required={selectedCustomer?.requirePO}
            maxLength={30}
            onChange={(e) => {
              updateUnitFields({ poNumber: e.target.value });
            }}
            control={control}
          />
        </Col>
      </Form.Group>

      <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0">
        <Col xs={5} className="p-0">
          <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="authorizedBy">
            authorized by
          </Form.Label>
          {/* <TooltipWrapper fieldName={"authorizedBy"} /> */}
        </Col>

        <Col xs={7} className="p-0 flex-shrink-0">
          <Input
            className={`customFormControl`}
            name={"unit.authorizedBy"}
            value={unit.authorizedBy?.trim()}
            maxLength={25}
            onChange={(e) => {
              updateUnitFields({ authorizedBy: e.target.value });
            }}
            control={control}
          />
        </Col>
      </Form.Group>

      <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0">
        <Col xs={5} className="p-0">
          <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="projectCode">
            project code
          </Form.Label>
          {/* <TooltipWrapper fieldName={"projectCode"} /> */}
        </Col>

        <Col xs={7} className="p-0 flex-shrink-0">
          <Input
            className={`customFormControl`}
            name={"unit.projectCode"}
            value={unit.projectCode}
            maxLength={30}
            onChange={(e) => {
              updateUnitFields({ projectCode: e.target.value });
            }}
            control={control}
          />
        </Col>
      </Form.Group>

      <Form.Group
        className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0 
                          ${!pickupAtPlant || !unit.deliveryDealerFK ? "hide-elements" : ""}`}
      >
        <Col xs={5} className="p-0">
          <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="plantOrderNumber">
            plant order number
          </Form.Label>
          {/* <TooltipWrapper fieldName={"plantOrderNumber"} /> */}
        </Col>

        <Col xs={7} className="p-0 flex-shrink-0">
          <Input
            className={`customFormControl`}
            name={"unit.plantOrderNumber"}
            value={unit.plantOrderNumber}
            maxLength={15}
            onChange={(e) => {
              updateUnitFields({ plantOrderNumber: e.target.value });
            }}
            control={control}
          />
        </Col>
      </Form.Group>

      <Form.Group
        className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0 
                          ${!requireBankClient ? "hide-elements" : ""}`}
      >
        <Col xs={5} className="p-0">
          {" "}
          <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="bank">
            bank
          </Form.Label>
          {/* <TooltipWrapper fieldName={"bank"} /> */}
        </Col>

        <Col xs={7} className="p-0 flex-shrink-0">
          <Input
            className={`customFormControl`}
            name={"unit.bank"}
            value={unit.bank}
            required={selectedCustomer?.requireBankClient}
            maxLength={30}
            onChange={(e) => {
              updateUnitFields({ bank: e.target.value });
            }}
            control={control}
          />
        </Col>
      </Form.Group>

      <Form.Group
        className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0 
                          ${!requireBankClient ? "hide-elements" : ""}`}
      >
        <Col xs={5} className="p-0 flex-shrink-0">
          <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="client">
            client
          </Form.Label>
          {/* <TooltipWrapper fieldName={"client"} /> */}
        </Col>

        <Col xs={7} className="p-0 flex-shrink-0">
          <Input
            className={`customFormControl`}
            name={"unit.client"}
            value={unit.client}
            maxLength={30}
            required={selectedCustomer?.requireBankClient}
            onChange={(e) => {
              updateUnitFields({ client: e.target.value });
            }}
            control={control}
          />
        </Col>
      </Form.Group>

      <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0">
        <Col xs={5} className="p-0">
          <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="gvwr">
            GVWR
          </Form.Label>
          {/* <TooltipWrapper fieldName={"gvwr"} /> */}
        </Col>

        <Col xs={2} className="p-0 flex-shrink-0" style={{ width: "70px" }}>
          <Input
            className={`customFormControl`}
            name={"unit.gvwr"}
            value={unit.gvwr}
            maxLength={10}
            onBeforeInput={(e) => handleBeforeInputForInteger(e, 2147483647)}
            onChange={(e) => updateUnitFields({ gvwr: e.target.value })}
            control={control}
          />
        </Col>
      </Form.Group>

      <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0">
        <Col xs={5} className="p-0">
          <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="shippingWeight">
            shipping weight
          </Form.Label>
          {/* <TooltipWrapper fieldName={"shippingWeight"} /> */}
        </Col>

        <Col xs={2} className="p-0  flex-shrink-0" style={{ width: "70px" }}>
          <Input
            className={`customFormControl`}
            name={"unit.shippingWeight"}
            value={unit.shippingWeight}
            maxLength={10}
            onBeforeInput={(e) => handleBeforeInputForInteger(e, 2147483647)}
            onChange={(e) => updateUnitFields({ shippingWeight: e.target.value })}
            control={control}
          />
        </Col>
      </Form.Group>

      <Form.Group
        className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0 
                        ${!askTolls ? "hide-elements" : ""}`}
      >
        <Col xs={5} className="p-0">
          <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="driverTolls">
            driver tolls
          </Form.Label>
          {/* <TooltipWrapper fieldName={"driverTolls"} /> */}
        </Col>

        <Col xs={1} className="p-0  flex-shrink-0" style={{ width: "70px" }}>
          <Input
            className={`customFormControl`}
            name={"unit.maximumTolls"}
            value={unit.maximumTolls}
            maxLength={8}
            onChange={(e) => {
              e.target.value = handleDecimalValue(e, 8);
              updateUnitFields({ maximumTolls: e.target.value });
            }}
            control={control}
          />
        </Col>
      </Form.Group>

      <Form.Group
        className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0 
                           ${!askPermits ? "hide-elements" : ""}`}
      >
        <Col xs={5} className="p-0">
          <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="driverPermits">
            driver permits
          </Form.Label>
          {/* <TooltipWrapper fieldName={"driverPermits"} /> */}
        </Col>

        <Col xs={1} className="p-0  flex-shrink-0" style={{ width: "70px" }}>
          <Input
            className={`customFormControl`}
            name={"unit.maximumPermits"}
            value={unit.maximumPermits}
            maxLength={8}
            onChange={(e) => {
              e.target.value = handleDecimalValue(e, 8);
              updateUnitFields({ maximumPermits: e.target.value });
            }}
            control={control}
          />
        </Col>
      </Form.Group>

      <Form.Group
        className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0 
                          ${deliveryDealerTwicRequired ? "" : "hide-elements"}`}
      >
        <Col xs={5} className="p-0">
          <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="invoicePortEscortFee">
            port escort fee
          </Form.Label>
          {/* <TooltipWrapper fieldName={"invoicePortEscortFee"} /> */}
        </Col>

        <Col xs={1} className="p-0 p-0 flex-shrink-0" style={{ width: "70px" }}>
          <Input
            className={`customFormControl`}
            name={"unit.invoicePortEscortFee"}
            value={unit.invoicePortEscortFee}
            maxLength={8}
            onChange={(e) => {
              e.target.value = handleDecimalValue(e, 8);
              updateUnitFields({ invoicePortEscortFee: e.target.value });
            }}
            control={control}
          />
        </Col>
      </Form.Group>

      <FlatRateComponent pcMilerVisible={pcMilerVisible} apiCall={() => fetchCalculateRatesDebouncer()} />

      <Form.Group
        className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0 ${
          unit.miscellaneousDelivery ||
          unit.miscellaneousPickup ||
          unit.commissionVisible ||
          (unit.deliveryDealerFK && unit.pickupDealerFK)
            ? ""
            : "hide-elements"
        }`}
      >
        <Col xs={5} className="p-0">
          <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="commission">
            commission
          </Form.Label>
          {/* <TooltipWrapper fieldName={"commission"} /> */}
        </Col>

        <Col xs={1} className="p-0 flex-shrink-0" style={{ width: "70px" }}>
          <Input
            className={`customFormControl`}
            name={"unit.commission"}
            value={unit.commission}
            maxLength={8}
            loading={false}
            onChange={(e) => {
              e.target.value = handleDecimalValue(e, 8);
              updateUnitFields({ commission: e.target.value });
            }}
            control={control}
          />
        </Col>
      </Form.Group>

      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          unit.brokerType === "default" ? "hide-elements" : ""
        }`}
      >
        <Col xs={5} className="p-0">
          <Form.Label className={`customColFormLabel text-capitalize`} id="broker">
            broker
          </Form.Label>
          {/* <TooltipWrapper fieldName={"broker"} /> */}
        </Col>

        <Col xs={7} className={`p-0 ${styles.selectContainer}`}>
          {/* Broker Autocomplete */}

          <AutoComplete
            searchString={unit.brokerName}
            handleSearchString={(string) => updateUnitFields({ brokerName: string })}
            onSelect={handleBrokerSelection}
            selectedId={unit.brokerFK}
            renderItemId={(broker) => broker.exportBrokerPK || broker.importBrokerPK}
            renderItemField={(broker) => broker.name}
            queryKey={["brokerDetails"]}
            queryFn={(term) =>
              OrderEntryServices.fetchBrokerDetails({
                searchTerms: term || "",
                brokerType: unit.brokerType,
              })
            }
            disabled={disabledBroker}
            className={`${errors?.unit?.brokerFK ? "borderRed" : "borderGreen"}`}
            clearInputCallback={() => {
              updateUnitFields({ brokerFK: null });
            }}
            towardsTop
          />

          <ButtonLookup disabled={disabledBroker} onClick={() => setBrokerModal(true)} />
        </Col>
      </Form.Group>

      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          unit.brokerType === "default" ? "hide-elements" : ""
        }`}
      >
        <Col xs={5} className="p-0">
          <Form.Label className={`customColFormLabel text-capitalize`} id="poe">
            port of entry
          </Form.Label>
          {/* <TooltipWrapper fieldName={"poe"} /> */}
        </Col>

        <Col xs={7} className={`p-0 ${styles.selectContainer}`}>
          {/* Port of Entry Autocomplete */}

          <AutoComplete
            searchString={unit.poeName}
            handleSearchString={(string) => updateUnitFields({ poeName: string })}
            onSelect={handlePortDetailsSelection}
            selectedId={unit.poeFK}
            renderItemId={(port) => port.poePK}
            renderItemField={(port) => port.usCity}
            queryKey={["portDetails"]}
            queryFn={(term) =>
              OrderEntryServices.fetchPortDetails({
                searchTerms: term || "",
                brokerType: unit.brokerType,
              })
            }
            className={`${errors?.unit?.poeFK ? "borderRed" : "borderGreen"}`}
            clearInputCallback={() => {
              updateUnitFields({ poeFK: null });
            }}
            towardsTop
          />

          <ButtonLookup onClick={() => setPortDetailsModal(true)} />
        </Col>
      </Form.Group>

      {/* Broker Lookup Modal */}
      {brokerModal && (
        <CommonNormalLookup
          id={`${unit.brokerType === "import" ? "importBrokerPK" : "exportBrokerPK"}`}
          show={brokerModal}
          onHide={() => setBrokerModal(false)}
          lookupTitle={`${unit.brokerType === "import" ? "Import" : "Export"} Broker Selection`}
          columns={[
            { label: "Name", key: "name" },
            { label: "Description", key: "description" },
          ]}
          handleLookupSelection={handleBrokerSelection}
          fetchFunction={(params) =>
            OrderEntryServices.fetchBrokerDetails({
              brokerType: unit.brokerType,
              ...params,
            })
          }
        />
      )}

      {portDetailsModal && (
        <CommonNormalLookup
          id={`poePK`}
          show={portDetailsModal}
          onHide={() => setPortDetailsModal(false)}
          lookupTitle={`Port of Entry Selection`}
          columns={[
            { label: "City", key: "usCity" },
            { label: "State Code", key: "stateCode" },
          ]}
          handleLookupSelection={handlePortDetailsSelection}
          fetchFunction={(params) =>
            OrderEntryServices.fetchPortDetails({
              brokerType: unit.brokerType,
              ...params,
            })
          }
        />
      )}
    </Col>
  );
};

export default memo(UnitSectionB);
