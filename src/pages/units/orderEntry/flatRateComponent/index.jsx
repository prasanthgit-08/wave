import { Col, Form, Row } from "react-bootstrap";
import { useFormContext, useWatch } from "react-hook-form";
import Input from "../../../../components/common/input";
import { handleBeforeInputForInteger, handleDecimalValue } from "../../../../utils/utils";
import CustomButton from "../../../../components/common/button";
import { useDispatch, useSelector } from "react-redux";
import useFlatRate from "./useFlatRate";
import PcMilerCalculation from "../../../../components/common/pcMilerCalculation";
import pcMilerServices from "../../../../service/pcMiler/pcMiler.service";
import { useRef } from "react";
import OverrideButton from "../../../../components/common/overrideButton";
import {
  setDriverAmount,
  setDriverFlat,
  setInvoiceAmount,
  setInvoiceFlat,
} from "../../../../store/slices/unit.slice";

const FlatRateComponent = ({ pcMilerVisible = true, apiCall }) => {
  const { updateUnitFields, debounceHandleAmountExceedsPercentage, showOverrideButton, unitPercentage } =
    useFlatRate();

  const isDriverMilesAutoFilled = useRef(false);
  const dispatch = useDispatch();

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const unit = useWatch({ name: "unit" });

  // last miles the api was called with, to skip duplicate calls on blur without changes
  const lastCalledMiles = useRef(null);

  // read latest form values (not the render closure) so both miles are current
  const callApiIfMilesFilled = () => {
    const { invoiceMiles, driverMiles } = getValues("unit") || {};
    if (!Number(invoiceMiles) || !Number(driverMiles)) return;

    const milesKey = `${Number(invoiceMiles)}-${Number(driverMiles)}`;
    if (lastCalledMiles.current === milesKey) return;

    lastCalledMiles.current = milesKey;
    apiCall && apiCall();
  };

  const selectedPickupDealer = useSelector((state) => state.unit.selectedPickupDealer);
  const selectedDeliveryDealer = useSelector((state) => state.unit.selectedDeliveryDealer);
  const allowedPercentage = useSelector((state) => state.unit.orderEntrySchemaConditions.allowedPercentage);
  const calculateInvoiceLoading = useSelector((state) => state.unit.calculateInvoiceLoading);
  const invoiceFlatRateRequired = useSelector(
    (state) => state.unit.orderEntrySchemaConditions.invoiceFlatRateRequired
  );
  const driverFlatRateRequired = useSelector(
    (state) => state.unit.orderEntrySchemaConditions.driverFlatRateRequired
  );

  return (
    <>
      <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0">
        <Col xs={5} className="p-0">
          <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="invoiceMiles">
            invoice miles
          </Form.Label>
          {/* <TooltipWrapper fieldName={"invoiceMiles"} /> */}
        </Col>

        <Col xs={2} className="p-0 p-0 flex-shrink-0" style={{ width: "70px" }}>
          <Input
            className={`customFormControl`}
            name={"unit.invoiceMiles"}
            value={unit.invoiceMiles}
            required
            maxLength={9}
            disabled={!pcMilerVisible || calculateInvoiceLoading}
            onBeforeInput={(e) => handleBeforeInputForInteger(e, 2147483647)}
            onChange={(e) => {
              updateUnitFields({ invoiceMiles: e.target.value });
            }}
            onBlur={(e) => {
              debounceHandleAmountExceedsPercentage();
              // auto-fill driver miles ONLY first time
              if (!isDriverMilesAutoFilled.current) {
                updateUnitFields({ driverMiles: e.target.value });
                isDriverMilesAutoFilled.current = true;
              }
              callApiIfMilesFilled();
            }}
            control={control}
          />
        </Col>

        <Col xs={3} className={`${pcMilerVisible ? "" : "hide-elements"}`}>
          <PcMilerCalculation
            calculateService={pcMilerServices.calculateDistance}
            className="w-70px"
            payload={{
              src: { city: selectedPickupDealer?.city, stateCode: selectedPickupDealer?.stateCode },
              dst: { city: selectedDeliveryDealer?.city, stateCode: selectedDeliveryDealer?.stateCode },
            }}
            existingMiles={unit.invoiceMiles}
            disabled={!selectedPickupDealer && !selectedDeliveryDealer}
            onSuccess={(distance) => {
              updateUnitFields({ invoiceMiles: String(distance), driverMiles: String(distance) });
              callApiIfMilesFilled();
            }}
            onError={(err) => {
              console.log("err", err);
            }}
          />
        </Col>
      </Form.Group>
      <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0 ms-0">
        <Col xs={5} className="p-0">
          <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="driverMiles">
            driver miles
          </Form.Label>
          {/* <TooltipWrapper fieldName={"driverMiles"} /> */}
        </Col>

        <Col xs={1} className="p-0 p-0 flex-shrink-0" style={{ width: "70px" }}>
          <Input
            className={`customFormControl`}
            name={"unit.driverMiles"}
            value={unit?.driverMiles}
            required
            disabled={!pcMilerVisible || calculateInvoiceLoading}
            maxLength={9}
            onBeforeInput={(e) => handleBeforeInputForInteger(e, 2147483647)}
            onChange={(e) => {
              updateUnitFields({ driverMiles: e.target.value });
            }}
            onBlur={() => {
              debounceHandleAmountExceedsPercentage();
              callApiIfMilesFilled();
            }}
            control={control}
          />
        </Col>
        <Col
          xs={3}
          className={`${
            ""
            // (showOverrideButton && errorMsgFromRedux) ? '' : 'hide-elements'
          }`}
        >
          {showOverrideButton && allowedPercentage && <OverrideButton unitPercentage={unitPercentage} />}
        </Col>
      </Form.Group>
      {
        <Row className={`${allowedPercentage ? "" : "invisible"}`}>
          <p className="mb-0 mt-1 text-danger">
            {allowedPercentage &&
            (errors?.unit?.driverFlatRate?.message || errors?.unit?.invoiceFlatRate?.message)
              ? `${errors?.unit?.driverFlatRate?.message || errors?.unit?.invoiceFlatRate?.message}`
              : ".."}
          </p>
          {/* </Col> */}
        </Row>
      }
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 
                             ${
                               unit?.invoiceFlatRateVisible ||
                               unit.miscellaneousPickup ||
                               unit.miscellaneousDelivery
                                 ? ""
                                 : "hide-elements"
                             }`}
      >
        <Col xs={5} className="p-0">
          <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="invoiceFlatRate">
            invoice flatrate
          </Form.Label>
          {/* <TooltipWrapper fieldName={"invoiceFlatRate"} /> */}
        </Col>

        <Col xs={1} className="p-0 p-0 flex-shrink-0" style={{ width: "70px" }}>
          <div className="position-relative">
            <Input
              className={`customFormControl`}
              name={"unit.invoiceFlatRate"}
              value={unit?.invoiceFlatRate}
              required={invoiceFlatRateRequired}
              maxLength={8}
              loading={calculateInvoiceLoading}
              onChange={(e) => {
                e.target.value = handleDecimalValue(e, 8);
                updateUnitFields({ invoiceFlatRate: e.target.value });
                dispatch(setInvoiceAmount(e.target.value));
                dispatch(setInvoiceFlat(Number(e.target.value)));
                debounceHandleAmountExceedsPercentage();
              }}
              control={control}
            />
          </div>
        </Col>
      </Form.Group>
      <Form.Group
        className={`mt-3  align-items-center row  m-l-0 m-r-0 ms-0 ${
          unit?.driverFlatRateVisible || unit.miscellaneousPickup || unit.miscellaneousDelivery
            ? ""
            : "hide-elements"
        }`}
      >
        <Col xs={5} className="p-0">
          <Form.Label htmlFor="" className={`customColFormLabel text-capitalize`} id="driverFlatRate">
            driver flatrate
          </Form.Label>
          {/* <TooltipWrapper fieldName={"driverFlatRate"} /> */}
        </Col>

        <Col xs={1} className="p-0 p-0 flex-shrink-0" style={{ width: "70px" }}>
          <div className="position-relative">
            <Input
              className={`customFormControl`}
              name={"unit.driverFlatRate"}
              value={unit?.driverFlatRate}
              required={driverFlatRateRequired}
              maxLength={8}
              loading={calculateInvoiceLoading}
              onChange={(e) => {
                e.target.value = handleDecimalValue(e, 8);
                updateUnitFields({ driverFlatRate: e.target.value });
                dispatch(setDriverAmount(e.target.value));
                dispatch(setDriverFlat(Number(e.target.value)));
                debounceHandleAmountExceedsPercentage();
              }}
              control={control}
            />
          </div>
        </Col>
      </Form.Group>
    </>
  );
};

export default FlatRateComponent;
