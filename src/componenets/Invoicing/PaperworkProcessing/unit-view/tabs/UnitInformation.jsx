import { parseLocalDate } from "../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DateInputField from "../../../../common/DateInputField";
import TableListing from "../../TableListing";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import {
  setUnitInformationTabValid,
  setDriverList,
  setCustomerInstructions,
  setInvoiceSaveList,
  setSelectedUnitsListIndex,
  setScanPaperworkSaveList,
  setSelectedUnit,
  setMissingPaperworkUnit,
  setMissingPaperworkObject,
  updateSelectedUnitsList,
  setDriversEmailList,
  setUnitInstructionValue,
  setInvoiceHoldReason,
  setChargeFee,
} from "../../../../../redux/Invoicing/PaperworkProcessingSlice";
import { joinString, strSeparator, trimString } from "../../../../../utils/utils";

const UnitInformation = () => {
  const dispatch = useDispatch();

  /* Local States */
  const [driver, setDriver] = useState("");
  const [unitNumber, seUnitNumber] = useState("");
  const [model, setModel] = useState("");
  const [unitType, setUnitType] = useState("");
  const [specialCode, setSpecialCode] = useState("");
  const [isDeliveryDateValid, setIsDeliveryDateValid] = useState(true);
  const [pars, setPARS] = useState("");
  const [pickup, setPickup] = useState("");
  const [delivery, setDelivery] = useState("");
  const [isPARSRequired, setIsPARSRequired] = useState(false);
  const [pickupDealerAdd2, setPickupDealerAdd2] = useState("");
  const [pickupDealerState, setPickupDealerState] = useState("");
  const [deliveryDealerAdd2, setDeliveryDealerAdd2] = useState("");
  const [deliveryDealerState, setDeliveryDealerState] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  /* Global States */
  const selectedUnitsList = useSelector((state) => state.paperworkProcessing.selectedUnitsList);
  const selectedUnitsListIndex = useSelector((state) => state.paperworkProcessing.selectedUnitsListIndex);
  const invoiceSaveList = useSelector((state) => state.paperworkProcessing.invoiceSaveList);
  const missingPaperworkUnit = useSelector((state) => state.paperworkProcessing.missingPaperworkUnit);
  const missingPaperworkObject = useSelector((state) => state.paperworkProcessing.missingPaperworkObject);
  const emailDriver = useSelector((state) => state.paperworkProcessing.emailDriver);
  const companyFK = useSelector((state) => state.paperworkProcessing.companyFK);
  const companyName = useSelector((state) => state.paperworkProcessing.companyName);
  const minDeliveryDate = useSelector((state) => state.paperworkProcessing.minimumDeliveryDate);
  const chargeFee = useSelector((state) => state.paperworkProcessing.chargeFee);
  const isDeliveryDateDefaultValue = useSelector(
    (state) => state.paperworkProcessing.isDeliveryDateDefaultValue
  );

  const [deliveryDate, setDeliveryDate] = useState(
    () =>
      invoiceSaveList?.[selectedUnitsListIndex]?.deliveredDate ||
      selectedUnitsList?.[selectedUnitsListIndex]?.deliveredDate ||
      ""
  );

  const isDeliveryDateFromBackend = !!isDeliveryDateDefaultValue?.find(
    (unit) => unit?.unitPK === selectedUnitsList?.[selectedUnitsListIndex]?.unitPK
  )?.deliveredDate;

  /* YUP VALIDATION SCHEMA */

  const validationSchema = yup.object({
    deliveryDate: yup.string().required(),
    pars: yup.string().required(),
  });

  /*Setting object with the information of the selected unit while entering the screen*/
  useEffect(() => {
    dispatch(
      setMissingPaperworkObject({
        dispatchId: selectedUnitsList?.[0]?.dispatchPK,
        driverId: selectedUnitsList?.[0]?.driverFK,
        unitId: selectedUnitsList?.[0]?.unitPK,
        companyName: companyName,
        customerId: selectedUnitsList?.[0]?.customerFK,
      })
    );
  }, []);

  /*Setting object with the information of unit selected from the table on double click.
    When the selection actually moves to a different unit, the previously edited
    Missing Paperwork fields (email text, charge efee, attach video, notes) must not
    carry over to the newly selected unit; they're only preserved when navigating
    back and forth for the SAME unit. */
  useEffect(() => {
    // Nothing has been double-clicked yet (e.g. right after mount, before the user
    // picks a row) - the initial-selection effect above already set the object.
    if (!missingPaperworkUnit) return;

    const isDifferentUnit = missingPaperworkObject?.unitId !== missingPaperworkUnit?.unitPK;
    dispatch(
      setMissingPaperworkObject({
        dispatchId: missingPaperworkUnit?.dispatchPK,
        driverId: missingPaperworkUnit?.driverFK,
        companyName: companyName,
        unitId: missingPaperworkUnit?.unitPK,
        customerId: selectedUnitsList?.[0]?.customerFK,
        ...(isDifferentUnit && {
          emailText: "",
          attachVideo: false,
          // left undefined (not false) so the Unit Information tab falls back to the
          // unit's own chargeEfee value from the API instead of forcing it off
          chargeEfee: undefined,
          notes: "",
          unitOnInvoiceHold: false,
          invoiceHoldReason: "",
        }),
      })
    );
  }, [missingPaperworkUnit]);

  /* Handler Functions*/
  const onTable3RowDoubleClick = (unit, index = 0) => {
    setSelectedId(unit?.unitPK);
    dispatch(setMissingPaperworkUnit(unit));
    dispatch(setSelectedUnitsListIndex(index));
    setDriver(joinString(strSeparator(" "), unit?.firstName, unit?.lastName));
    seUnitNumber(unit?.unitNumber);
    setModel(unit?.model?.trim());
    setUnitType(unit?.descriptionLong?.trim());
    setSpecialCode(unit?.specialCodeFK ? unit?.description?.trim() : "");
    dispatch(setUnitInstructionValue(unit?.orderEntryInstructions?.trim() || ""));
    dispatch(setInvoiceHoldReason(unit?.invoiceHoldReason?.trim() || ""));

    setDeliveryDate(
      invoiceSaveList?.[index]?.deliveredDate || selectedUnitsList?.[index]?.deliveredDate || ""
    );
    setPARS(invoiceSaveList?.[index]?.pars || selectedUnitsList?.[index]?.pars);
    setPickup(
      unit?.pickupDealerFK
        ? joinString(strSeparator(", "), unit?.pickupDealerName, unit?.pickupDealerAddress1)
        : unit?.pickupCustomerPlantFK
          ? joinString(strSeparator(", "), unit?.pickupPlantName, unit?.pickupPlantAddress1)
          : unit?.pickupUnitAddressFK
            ? joinString(strSeparator(", "), unit?.pickupUnitAddressName, unit?.pickupUnitAddress1)
            : ""
    );

    setPickupDealerAdd2(
      unit?.pickupDealerFK
        ? joinString(
            strSeparator(", "),
            unit?.pickupDealerAddress2,
            unit?.pickupDealerCity,
            unit?.pickupDealerPostalCode
          )
        : unit?.pickupCustomerPlantFK
          ? joinString(
              strSeparator(", "),
              unit?.pickupPlantAddress2,
              unit?.pickupPlantCity,
              unit?.pickupPlantPostalCode
            )
          : unit?.pickupUnitAddressFK
            ? joinString(
                strSeparator(", "),
                unit?.pickupUnitAddress2,
                unit?.pickupUnitAddressCity,
                unit?.pickupUnitAddressPostalCode
              )
            : ""
    );

    setPickupDealerState(
      unit?.pickupDealerFK
        ? trimString(unit?.pickupDealerStateCode)
        : unit?.pickupCustomerPlantFK
          ? trimString(unit?.pickupPlantStateCode)
          : unit?.pickupUnitAddressFK
            ? trimString(unit?.pickupUnitAddressStateCode)
            : ""
    );

    setDelivery(
      unit?.deliveryDealerFK
        ? joinString(strSeparator(", "), unit?.deliveryDealerName, unit?.deliveryDealerAddress1)
        : unit?.deliveryCustomerPlantFK
          ? joinString(strSeparator(", "), unit?.deliveryPlantName, unit?.deliveryPlantAddress1)
          : unit?.deliveryUnitAddressFK
            ? joinString(strSeparator(", "), unit?.deliveryUnitAddressName, unit?.deliveryUnitAddress1)
            : ""
    );

    setDeliveryDealerAdd2(
      unit?.deliveryDealerFK
        ? joinString(
            strSeparator(", "),
            unit?.deliveryDealerAddress2,
            unit?.deliveryDealerCity,
            unit?.deliveryDealerPostalCode
          )
        : unit?.deliveryCustomerPlantFK
          ? joinString(
              strSeparator(", "),
              unit?.deliveryPlantAddress2,
              unit?.deliveryPlantCity,
              unit?.deliveryPlantPostalCode
            )
          : unit?.deliveryUnitAddressFK
            ? joinString(
                strSeparator(", "),
                unit?.deliveryUnitAddress2,
                unit?.deliveryUnitAddressCity,
                unit?.deliveryUnitAddressPostalCode
              )
            : ""
    );

    setDeliveryDealerState(
      unit?.deliveryDealerFK
        ? trimString(unit?.deliveryDealerStateCode)
        : unit?.deliveryCustomerPlantFK
          ? trimString(unit?.deliveryPlantStateCode)
          : unit?.deliveryUnitAddressFK
            ? trimString(unit?.deliveryUnitAddressStateCode)
            : ""
    );
    /******for future refernce********/
    // dispatch(setCustomerInstructions(unit.invoiceInstructions));
    dispatch(
      setCustomerInstructions(
        unit?.customerPlantFK !== null
          ? unit?.plantInvoiceInstructions?.trim() || ""
          : unit?.invoiceInstructions?.trim() || ""
      )
    );
  };

  /**
   * Initialize invoiceSaveList before Unit View Screen
   */
  useEffect(() => {
    if (selectedUnitsList?.length > 0) {
      const invoiceSaveList = selectedUnitsList?.map((unit) => ({
        unitPK: unit?.unitPK,
        unitId: unit?.unitPK,
        unitNumber: unit?.unitNumber,
        multiUnit: unit?.multiUnit,
        numberOfUnits: selectedUnitsList?.length,
        vin: unit?.vin?.trim(),
        model: unit?.model?.trim(),
        dispatchId: unit?.dispatchPK,
        billingPlantId: unit?.customerPlantFK,
        driverId: unit?.driverFK,
        customerId: unit?.customerFK,
        preInvoiced: unit?.preInvoiced,
        commission: unit?.commission,
        commissionDriverFK: unit?.commissionDriverFK,
        additionalFlatRateDescription: unit?.additionalFlatRateDescription,
        additionalFlatRate: unit?.additionalFlatRate,
        invoiceAdditionalFlatRate: unit?.invoiceAdditionalFlatRate,
        delayedUnitReturnFK: unit?.delayedUnitReturnFK,
        isReturn: unit?.isReturn,
        isDeliveryDateDefault: unit?.deliveredDate !== null ? true : false,
        deliveredDate: unit?.deliveredDate || null,
        pars: unit?.pars || null,
        isPARSRequired:
          unit?.deliveryPlantCanadian || unit?.deliveryDealerCanadian || unit?.deliveryUnitAddressCanadian,
        bulkUnit: unit?.bulkUnit,
        bulkInvoiceFK: unit?.bulkInvoiceFK,
        bulkUnitInvoices: unit?.bulkUnitInvoices,
        bulkInvoiceSequence: unit?.bulkInvoiceSequence,
        isFirstUnitForDriver: false,
      }));
      const scanPaperworkSaveList = selectedUnitsList?.map((unit) => ({
        unitPK: unit?.unitPK,
        unitId: unit?.unitPK,
        unitNumber: unit?.unitNumber,
        dispatchId: unit?.dispatchPK,
        customerId: unit?.customerFK,
        isButtonsLoopingCompleted: false,
      }));

      dispatch(
        setInvoiceSaveList({
          type: "set",
          payload: invoiceSaveList,
        })
      );
      dispatch(
        setScanPaperworkSaveList({
          actionType: "set",
          payload: scanPaperworkSaveList,
        })
      );
    }
  }, [selectedUnitsList]);

  useEffect(() => {
    if (
      selectedUnitsList?.[selectedUnitsListIndex]?.deliveryPlantCanadian ||
      selectedUnitsList?.[selectedUnitsListIndex]?.deliveryDealerCanadian ||
      selectedUnitsList?.[selectedUnitsListIndex]?.deliveryUnitAddressCanadian
    )
      setIsPARSRequired(true);
    else setIsPARSRequired(false);
  }, [selectedUnitsListIndex]);

  // Populate local states with values from invoiceSaveList
  useEffect(() => {
    setDeliveryDate(
      invoiceSaveList[selectedUnitsListIndex]?.deliveredDate ||
        selectedUnitsList?.[selectedUnitsListIndex]?.deliveredDate ||
        ""
    );
    if (isPARSRequired) {
      setPARS(invoiceSaveList[selectedUnitsListIndex]?.pars || "");
    }
  }, [selectedUnitsListIndex]);

  // Update invoiceSaveList with local changes
  useEffect(() => {
    if (invoiceSaveList?.length !== 0) {
      dispatch(
        setInvoiceSaveList({
          type: "update",
          payload: {
            index: selectedUnitsListIndex,
            element: {
              deliveredDate: deliveryDate || null,
              pars: pars || "",
            },
          },
        })
      );
    }
  }, [deliveryDate, pars]);

  // Unit Information Tab Validation
  useEffect(() => {
    const isInvoiceSaveListValid = invoiceSaveList?.every(
      (element) => element.deliveredDate !== null && (!element.isPARSRequired || element.pars)
    );
    const isUnitInfromationTabValid = isInvoiceSaveListValid && isDeliveryDateValid;
    dispatch(setUnitInformationTabValid(isUnitInfromationTabValid));
  }, [invoiceSaveList, isDeliveryDateValid]);

  useEffect(() => {
    if (selectedUnitsList?.length > 0) {
      // Setting first unit as the selected unit
      onTable3RowDoubleClick(selectedUnitsList?.[selectedUnitsListIndex], selectedUnitsListIndex);

      // Setting unique driver list
      const allDrivers = new Map(selectedUnitsList?.map((element) => [element?.driverFK, element]));
      dispatch(setDriverList([...allDrivers.values()]));
    }
  }, []);

  useEffect(() => {
    dispatch(setDriversEmailList(selectedUnitsList?.filter((element) => element.emailDriver)));
  }, [selectedUnitsList]);
  useEffect(() => {
    dispatch(
      updateSelectedUnitsList({
        index: selectedUnitsListIndex,
        payload: {
          deliveredDate: deliveryDate && isDeliveryDateValid ? parseLocalDate(deliveryDate).toISOString() : null,
        },
      })
    );
  }, [isDeliveryDateValid, deliveryDate]);

  return (
    <Formik
      initialValues={{
        deliveryDate,
        pars,
      }}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <div className="p-2 w-100">
          <Row className="m-0 p-0">
            <Col xs={7}>
              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Driver</Form.Label>
                </Col>

                <Col xs={8} className="p-0">
                  <input
                    name="driver"
                    id="driver"
                    type="text"
                    className={`customFormControl`}
                    value={driver}
                    disabled={true}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Unit Number</Form.Label>
                </Col>

                <Col xs={5} className="p-0">
                  <input
                    name="unitNumber"
                    id="unitNumber"
                    type="text"
                    className={`customFormControl`}
                    value={unitNumber}
                    disabled={true}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Model</Form.Label>
                </Col>

                <Col xs={5} className="p-0">
                  <input
                    name="model"
                    id="model"
                    type="text"
                    className={`customFormControl`}
                    value={model}
                    disabled={true}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Unit Type</Form.Label>
                </Col>

                <Col xs={5} className="p-0">
                  <input
                    name="unitType"
                    id="unitType"
                    type="text"
                    className={`customFormControl`}
                    value={unitType}
                    disabled={true}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Special Code</Form.Label>
                </Col>

                <Col xs={5} className="p-0">
                  <input
                    name="specialCode"
                    id="specialCode"
                    type="text"
                    className={`customFormControl`}
                    value={specialCode}
                    disabled={true}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
                {/* Charge Fee */}
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Charge EFee</Form.Label>
                </Col>
                <Col xs={4} className="p-0">
                  <input
                    name="chargeFee"
                    id="chargeFee"
                    type="checkbox"
                    className="form-check-input p-0"
                    checked={chargeFee}
                    onChange={(e) => dispatch(setChargeFee(e.target.checked))}
                  />
                </Col>
                {/* Delivery Date */}
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Delivery Date</Form.Label>
                </Col>
                <Col xs={2} className="p-0 w-95px">
                  <DateInputField
                    className={`${
                      isDeliveryDateFromBackend
                        ? ""
                        : !deliveryDate || !isDeliveryDateValid
                          ? "borderRed"
                          : isDeliveryDateDefaultValue?.[selectedUnitsListIndex]?.deliveredDate
                            ? ""
                            : "borderGreen"
                    }`}
                    date={deliveryDate}
                    setDate={setDeliveryDate}
                    setIsDateValid={setIsDeliveryDateValid}
                    min={parseLocalDate(minDeliveryDate)}
                    max={new Date()}
                    disabled={isDeliveryDateFromBackend}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
                {/* Email Driver */}
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Email Driver</Form.Label>
                </Col>
                <Col xs={4} className="p-0">
                  <input
                    name="emailDriver"
                    id="emailDriver"
                    type="checkbox"
                    className="form-check-input p-0 "
                    checked={selectedUnitsList?.[selectedUnitsListIndex]?.emailDriver}
                    onChange={(e) => {
                      dispatch(
                        updateSelectedUnitsList({
                          index: selectedUnitsListIndex,
                          payload: {
                            emailDriver: !selectedUnitsList?.[selectedUnitsListIndex]?.emailDriver,
                          },
                        })
                      );
                    }}
                  />
                </Col>
                {/* PARS */}
                <Col xs={2} className={`p-0 ${!isPARSRequired ? "hide-elements" : ""} `}>
                  <Form.Label className="customColFormLabel">PARS</Form.Label>
                </Col>
                <Col xs={1} className={`p-0 ${!isPARSRequired ? "hide-elements" : ""} `}>
                  <input
                    name="pars"
                    id="pars"
                    type="text"
                    className={`customFormControl ${
                      isPARSRequired ? (pars !== "" && pars !== null ? "borderGreen" : "borderRed") : ""
                    }`}
                    value={pars}
                    onChange={(e) => setPARS(e.target.value)}
                    maxLength={20}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col xs={5}>
              {/* ‼️Emtpy Tag for styling */}
              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 hide-elements">
                <Col xs={2} className="p-0"></Col>
                <Col xs={6} className="p-0">
                  <input className={`customFormControl`} />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Pickup</Form.Label>
                </Col>
                <Col xs={6} className="p-0">
                  <input
                    name="pickup"
                    id="pickup"
                    type="text"
                    className={`customFormControl`}
                    value={pickup}
                    disabled={true}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
                <Col xs={2} className="p-0"></Col>
                <Col xs={6} className="p-0">
                  <input
                    name="pickup2"
                    id="pickup2"
                    type="text"
                    className={`customFormControl`}
                    value={pickupDealerAdd2}
                    disabled={true}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
                <Col xs={1} className="w-50px">
                  <input
                    name="pickup3"
                    id="pickup3"
                    type="text"
                    className={`customFormControl`}
                    value={pickupDealerState}
                    disabled={true}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>

              {/* Emtpy Tag for styling */}
              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3 hide-elements">
                <Col xs={2} className="p-0"></Col>
                <Col xs={6} className="p-0">
                  <input className={`customFormControl`} />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Delivery</Form.Label>
                </Col>
                <Col xs={6} className="p-0">
                  <input
                    name="delivery"
                    id="delivery"
                    type="text"
                    className={`customFormControl`}
                    value={delivery}
                    disabled={true}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-3">
                <Col xs={2} className="p-0"></Col>
                <Col xs={6} className="p-0">
                  <input
                    name="delivery2"
                    id="delivery2"
                    type="text"
                    className={`customFormControl`}
                    value={deliveryDealerAdd2}
                    disabled={true}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
                <Col xs={1} className="w-50px">
                  <input
                    name="delivery3"
                    id="delivery3"
                    type="text"
                    className={`customFormControl`}
                    value={deliveryDealerState}
                    disabled={true}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mx-0 p-0 mt-4">
            <Col xs={12}>
              <TableListing
                listingData={selectedUnitsList}
                onTableRowDoubleClick={onTable3RowDoubleClick}
                selectedId={selectedId}
                errorCheck={true}
              />
            </Col>
          </Row>
        </div>
      )}
    </Formik>
  );
};

export default UnitInformation;
