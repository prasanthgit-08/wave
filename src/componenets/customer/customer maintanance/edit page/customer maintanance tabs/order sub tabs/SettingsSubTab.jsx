import { t } from "i18next";
import * as yup from "yup";
import { Formik } from "formik";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomerFormData,
  setOrdersSettingsTabInitialColor,
  setIsOrdersSettingsTabValid,
} from "../../../../../../redux/CustomerMaintenanceSlice";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import phoneExtension from "../../../../../../utils/validation/PhoneExtension";
import CustomerService from "../../../../../../services/CustomerService";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import Input from "../../../../../../components/common/input";
import LookupButton from "../../../../../common/LookupButton";
import DealerLookup from "../../../../../LookupScreens/Dealer/DealerLookup";
import YardLookup from "../../../../../LookupScreens/Yard/YardLookup";
import CustomerPlantGroupsLookup from "../../../../../LookupScreens/CustomerPlantGroups/CustomerPlantGroupsLookup";

function SettingsSubTab() {
  const dispatch = useDispatch();

  const [emailBolAtOrderEntry, setEmailBolAtOrderEntry] = useState(false);
  const [emailBolAtDispatch, setEmailBolAtDispatch] = useState(false);
  const [emailBolAtInvoice, setEmailBolAtInvoice] = useState(false);
  const [emailedBolAddSignature, setEmailedBolAddSignature] = useState(false);
  const [batchEmailBolAtOrderEntry, setBatchEmailBolAtOrderEntry] = useState(false);
  const [batchEmailBolDaily, setBatchEmailBolDaily] = useState(false);
  const [faxBolAtOrderEntry, setFaxBolAtOrderEntry] = useState(false);
  const [faxBolAtOrderDispatch, setFaxBolAtOrderDispatch] = useState(false);
  const [bolFaxNumber, setBolFaxNumber] = useState("");
  const [requireModel, setRequireModel] = useState(false);
  const [requireModelCode, setRequireModelCode] = useState(false);
  const [requireVIN, setRequireVIN] = useState(false);
  const [requireFullVIN, setRequireFullVIN] = useState(false);
  const [requireSerialNumber, setRequireSerialNumber] = useState(false);
  const [requireStockNumber, setRequireStockNumber] = useState(false);
  const [requirePO, setRequirePO] = useState(false);
  const [requireBankClient, setRequireBankClient] = useState(false);
  const [reloadDays, setReloadDays] = useState("");
  const [deliveryByDays, setDeliveryByDays] = useState("");
  const [requirePdi, setRequirePdi] = useState(false);
  const [requireMotorizedOutboundPDI, setRequireMotorizedOutboundPDI] = useState(false);
  const [requireMotorizedReloadPDI, setRequireMotorizedReloadPDI] = useState(false);
  const [requireTowableOutboundPDI, setRequireTowableOutboundPDI] = useState(false);
  const [requireTowableReloadPDI, setRequireTowableReloadPDI] = useState(false);
  const [PDIYardFK, setPDIYardFK] = useState(null);
  const [PDIYardInput, setPDIYardInput] = useState("");
  const [PDIYard, setPDIYard] = useState([]);
  const [PDIDealerFK, setPDIDealerFK] = useState(null);
  const [PDIDealerInput, setPDIDealerInput] = useState("");
  const [PDIDealer, setPDIDealer] = useState([]);
  const [PDIPlantGroupFK, setPDIPlantGroupFK] = useState(null);
  const [PDIPlantGroupInput, setPDIPlantGroupInput] = useState("");
  const [PDIPlantGroup, setPDIPlantGroup] = useState([]);
  const [unitNumberPrefix, setUnitNumberPrefix] = useState("");
  const [addUnitNumber, setAddUnitNumber] = useState(false);
  const [maximumHaulTowLength, setMaximumHaulTowLength] = useState(0);
  const [maximumFlatbedLength, setMaximumFlatbedLength] = useState(0);

  const [showPDIYardLookup, setShowPDIYardLookup] = useState(false);
  const [showPDIDealerLookup, setShowPDIDealerLookup] = useState(false);
  const [showPDIPlantGroupLookup, setShowPDIPlantGroupLookup] = useState(false);
  const [hasPlants, setHasPlants] = useState(false);

  const [pdiLoading, setPdiLoading] = useState(false);
  const [dealerLoading, setDealerLoading] = useState(false);
  const [pdiPlantLoading, setPdiPlantLoading] = useState(false);

  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  let dpuCustomer = useSelector((state) => state.customerMaintenanceReducer.dpuCustomer);

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);

  const regex = /^[A-Za-z0-9]{4}-?$/;

  /************** PDI Yard Autocomplete Fetch function ***************/
  const fetchYardByName = (string) => {
    setPdiLoading(true);
    CustomerService.fetchYardByName(string)
      .then((response) => {
        const data = response?.data;
        const yardList = (data?.content || []).map((yard) => ({
          ...yard,
          description: yard.description?.trim(),
        }));
        setPDIYard(yardList);
      })
      .finally(() => {
        setPdiLoading(false);
      });
  };

  /************** PDI Yard Autocomplete Default setting in Edit Mode ***************/
  /************** PDI Yard Autocomplete Handle function On select ***************/
  const handlePDIYardSelection = (yard) => {
    setPDIYardFK(yard.yardPK);
    setPDIYardInput(yard.description?.trim());
  };

  /************** PDI Yard Lookup Show ***************/
  const handlePDIYardLookupModalshow = () => {
    setShowPDIYardLookup(true);
  };

  /************** PDI Yard Lookup Handle function ***************/
  const handlePDIYardLookupSelection = (yard) => {
    setPDIYardFK(yard.yardPK);
    setPDIYardInput(yard.description?.trim());
    setShowPDIYardLookup(false);
  };

  /************** PDI Yard Lookup Hide ***************/
  const hidePDIYardModal = () => {
    setShowPDIYardLookup(false);
  };

  /************** PDI Dealer Autocomplete Fetch function ***************/
  const fetchDealerByName = (string) => {
    setDealerLoading(true);
    CustomerService.fetchDealerByName(string)
      .then((response) => {
        const data = response?.data;
        const dealerList = (data?.content || []).map((dealer) => ({ ...dealer, name: dealer.name?.trim() }));
        setPDIDealer(dealerList);
      })
      .finally(() => {
        setDealerLoading(false);
      });
  };

  /************** PDI Dealer Autocomplete Handle function On select ***************/
  const handlePDIDealerSelection = (dealer) => {
    setPDIDealerFK(dealer.dealerPK);
    setPDIDealerInput(dealer.name?.trim());
  };

  /************** PDI Dealer Lookup Show ***************/
  const handlePDIDealerLookupModalshow = () => {
    setShowPDIDealerLookup(true);
  };

  /************** PDI Dealer Lookup Handle function ***************/
  const handlePDIDealerLookupSelection = (dealer) => {
    setPDIDealerFK(dealer.dealerPK);
    setPDIDealerInput(dealer.name?.trim());
    setShowPDIDealerLookup(false);
  };

  /************** PDI Dealer Lookup Hide ***************/
  const hidePDIDealerModal = () => {
    setShowPDIDealerLookup(false);
  };

  /************** PDI Plant Group Autocomplete Fetch function ***************/
  const fetchPlantGroupByName = (string) => {
    setPdiPlantLoading(true);
    CustomerService.getAllCustomerPlantGroupsByName(string)
      .then((response) => {
        const data = response?.data;
        const plantList = (data?.content || []).map((plant) => ({
          ...plant,
          description: plant.description?.trim(),
        }));
        setPDIPlantGroup(plantList);
      })
      .finally(() => {
        setPdiPlantLoading(false);
      });
  };

  /************** PDI Plant Group Autocomplete Handle function On select ***************/
  const handlePDIPlantGroupSelection = (plantGroup) => {
    setPDIPlantGroupFK(plantGroup.customerPlantGroupPK);
    setPDIPlantGroupInput(plantGroup.description?.trim());
  };

  /************** PDI Plant Group Lookup Show ***************/
  const handlePDIPlantGroupLookupModalshow = () => {
    setShowPDIPlantGroupLookup(true);
  };

  /************** PDI PlantGroup Lookup Handle function ***************/
  const handlePDIPlantGroupLookupSelection = (plantGroup) => {
    setPDIPlantGroupFK(plantGroup.customerPlantGroupPK);
    setPDIPlantGroupInput(plantGroup.description?.trim());
    setShowPDIPlantGroupLookup(false);
  };

  /************** PDI PlantGroup Lookup Hide ***************/
  const hidePDIPlantGroupModal = () => {
    setShowPDIPlantGroupLookup(false);
  };

  useEffect(() => {
    if (editCustomerData === null) {
      setEmailBolAtOrderEntry(false);
      setEmailBolAtDispatch(false);
      setEmailBolAtInvoice(false);
      setEmailedBolAddSignature(false);
      setBatchEmailBolAtOrderEntry(false);
      setBatchEmailBolDaily(false);
      setFaxBolAtOrderEntry(false);
      setFaxBolAtOrderDispatch(false);
      setBolFaxNumber("");
      setRequireModel(false);
      setRequireModelCode(false);
      setRequireVIN(false);
      setRequireFullVIN(false);
      setRequireSerialNumber(false);
      setRequireStockNumber(false);
      setRequirePO(false);
      setRequireBankClient(false);
      setReloadDays("");
      setDeliveryByDays("");
      setRequirePdi(false);
      setPDIYardFK(null);
      setPDIYardInput("");
      setPDIDealerFK(null);
      setPDIDealerInput("");
      setPDIPlantGroupFK(null);
      setPDIPlantGroupInput("");
      setMaximumHaulTowLength(0);
      setMaximumFlatbedLength(0);
    }
    if (editCustomerData != null) {
      setEmailBolAtOrderEntry(
        editCustomerData.emailBOLAtOrderEntry != null ? editCustomerData.emailBOLAtOrderEntry : ""
      );
      setEmailBolAtDispatch(
        editCustomerData.emailBOLAtDispatch != null ? editCustomerData.emailBOLAtDispatch : ""
      );
      setEmailBolAtInvoice(
        editCustomerData.emailBOLAtInvoice != null ? editCustomerData.emailBOLAtInvoice : ""
      );
      setEmailedBolAddSignature(
        editCustomerData.emailBOLAddSignature != null ? editCustomerData.emailBOLAddSignature : ""
      );
      setMaximumHaulTowLength(
        editCustomerData.maximumLengthHaulAndTow != null ? editCustomerData.maximumLengthHaulAndTow : ""
      );

      setMaximumFlatbedLength(
        editCustomerData.maximumLengthFlatbed != null ? editCustomerData.maximumLengthFlatbed : ""
      );
      setBatchEmailBolAtOrderEntry(
        editCustomerData.batchEmailBOLAtOrderEntry != null ? editCustomerData.batchEmailBOLAtOrderEntry : ""
      );
      setBatchEmailBolDaily(
        editCustomerData.batchEmailBOLDaily != null ? editCustomerData.batchEmailBOLDaily : ""
      );
      setFaxBolAtOrderEntry(
        editCustomerData.faxBOLAtOrderEntry != null ? editCustomerData.faxBOLAtOrderEntry : ""
      );
      setHasPlants(editCustomerData.hasCustomerPlants != null ? editCustomerData.hasCustomerPlants : false);
      setFaxBolAtOrderDispatch(
        editCustomerData.faxBOLAtDispatch != null ? editCustomerData.faxBOLAtDispatch : ""
      );
      setBolFaxNumber(
        editCustomerData.bolFAXNumber != null ? formatPhoneNumber(editCustomerData.bolFAXNumber) : ""
      );
      setRequireModel(editCustomerData.requireModel != null ? editCustomerData.requireModel : "");
      setRequireModelCode(editCustomerData.requireModelCode != null ? editCustomerData.requireModelCode : "");
      setRequireVIN(editCustomerData.requireVIN != null ? editCustomerData.requireVIN : "");
      setRequireFullVIN(editCustomerData.requireFullVIN != null ? editCustomerData.requireFullVIN : "");
      setRequireSerialNumber(
        editCustomerData.requireSerialNumber != null ? editCustomerData.requireSerialNumber : ""
      );
      setRequireStockNumber(
        editCustomerData.requireStockNumber != null ? editCustomerData.requireStockNumber : ""
      );
      setRequirePO(editCustomerData.requirePO != null ? editCustomerData.requirePO : "");
      setRequireBankClient(
        editCustomerData.requireBankClient != null ? editCustomerData.requireBankClient : ""
      );
      setReloadDays(
        editCustomerData.reloadDays != null && editCustomerData.reloadDays != 0
          ? editCustomerData.reloadDays
          : ""
      );
      setDeliveryByDays(
        editCustomerData.deliverByDays != null && editCustomerData.deliverByDays != 0
          ? editCustomerData.deliverByDays
          : ""
      );
      setRequirePdi(editCustomerData.requirePDI != null ? editCustomerData.requirePDI : "");
      setPDIYardFK(editCustomerData.pdiYardFK != null ? editCustomerData.pdiYardFK : "");
      setPDIYardInput(editCustomerData.pdiYardName?.trim() || "");
      setPDIDealerFK(editCustomerData.pdiDealerFK != null ? editCustomerData.pdiDealerFK : "");
      setPDIDealerInput(editCustomerData.pdiDealerName?.trim() || "");
      setPDIPlantGroupFK(editCustomerData.pdiPlantGroupFK != null ? editCustomerData.pdiPlantGroupFK : "");
      setPDIPlantGroupInput(editCustomerData.pdiPlantGroupName?.trim() || "");
      setRequireTowableOutboundPDI(
        editCustomerData.requirePDITowableOutbound != null && editCustomerData.requirePDI === true
          ? editCustomerData.requirePDITowableOutbound
          : ""
      );
      setRequireTowableReloadPDI(
        editCustomerData.requirePDITowableReload != null && editCustomerData.requirePDI === true
          ? editCustomerData.requirePDITowableReload
          : ""
      );
      setRequireMotorizedOutboundPDI(
        editCustomerData.requirePDIMotorizedOutbound != null && editCustomerData.requirePDI === true
          ? editCustomerData.requirePDIMotorizedOutbound
          : ""
      );
      setRequireMotorizedReloadPDI(
        editCustomerData.requirePDIMotorizedReload != null && editCustomerData.requirePDI === true
          ? editCustomerData.requirePDIMotorizedReload
          : ""
      );
      setAddUnitNumber(
        editCustomerData.addPlantUnitNumberPrefix != null ? editCustomerData.addPlantUnitNumberPrefix : false
      );
      setUnitNumberPrefix(
        editCustomerData.unitNumberPrefix != null ? editCustomerData.unitNumberPrefix?.trim() : ""
      );
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    settingsSubTabFormData();
  }, [
    emailBolAtOrderEntry,
    emailBolAtDispatch,
    emailedBolAddSignature,
    maximumHaulTowLength,
    maximumFlatbedLength,
    batchEmailBolAtOrderEntry,
    batchEmailBolDaily,
    faxBolAtOrderEntry,
    faxBolAtOrderDispatch,
    bolFaxNumber,
    reloadDays,
    deliveryByDays,
    requirePdi,
    PDIYardFK,
    PDIDealerFK,
    PDIPlantGroupFK,
    requireModel,
    requireModelCode,
    requireVIN,
    requireFullVIN,
    requireSerialNumber,
    requireStockNumber,
    requirePO,
    requireBankClient,
    requireTowableOutboundPDI,
    requireTowableReloadPDI,
    requireMotorizedOutboundPDI,
    requireMotorizedReloadPDI,
    addUnitNumber,
    unitNumberPrefix,
  ]);

  const settingsSubTabFormData = () => {
    dispatch(
      setCustomerFormData({
        emailBOLAtOrderEntry: emailBolAtOrderEntry,
        emailBOLAtDispatch: emailBolAtDispatch,
        emailBOLAddSignature: emailedBolAddSignature,
        batchEmailBOLAtOrderEntry: batchEmailBolAtOrderEntry,
        batchEmailBOLDaily: batchEmailBolDaily,
        faxBOLAtOrderEntry: faxBolAtOrderEntry,
        faxBOLAtDispatch: faxBolAtOrderDispatch,
        emailBOLAtInvoice: emailBolAtInvoice,
        bolFAXNumber: bolFaxNumber.replace(/\s+/g, ""),
        requireModel: requireModel,
        requireModelCode: requireModelCode,
        requireVIN: requireVIN,
        requireFullVIN: requireFullVIN,
        requireSerialNumber: requireSerialNumber,
        requireStockNumber: requireStockNumber,
        requirePO: requirePO,
        requireBankClient: requireBankClient,
        reloadDays: reloadDays,
        deliverByDays: deliveryByDays,
        requirePDI: requirePdi,
        pdiYardFK: PDIYardFK,
        pdiDealerFK: PDIDealerFK,
        pdiPlantGroupFK: PDIPlantGroupFK,
        requirePDITowableReload: requireTowableReloadPDI,
        requirePDITowableOutbound: requireTowableOutboundPDI,
        requirePDIMotorizedReload: requireMotorizedReloadPDI,
        requirePDIMotorizedOutbound: requireMotorizedOutboundPDI,
        addPlantUnitNumberPrefix: addUnitNumber,
        unitNumberPrefix: unitNumberPrefix,
        maximumLengthHaulAndTow: maximumHaulTowLength,
        maximumLengthFlatbed: maximumFlatbedLength,
      })
    );
  };

  useEffect(() => {
    if (!(faxBolAtOrderEntry || faxBolAtOrderDispatch)) {
      setBolFaxNumber("");
    }
  }, [faxBolAtOrderEntry, faxBolAtOrderDispatch]);

  useEffect(() => {
    if (requirePdi === false) {
      setPDIDealerFK(null);
      setPDIDealerInput("");
      setPDIPlantGroupFK(null);
      setPDIPlantGroupInput("");
      setPDIYardFK(null);
      setPDIYardInput("");
      setRequireMotorizedOutboundPDI(false);
      setRequireMotorizedReloadPDI(false);
      setRequireTowableOutboundPDI(false);
      setRequireTowableReloadPDI(false);
    }
  }, [requirePdi]);

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const daysValidation = /^[0-9]*$/;

  const validationSchema = yup.object({
    faxBolAtOrderEntry: yup.boolean(),
    faxBolAtOrderDispatch: yup.boolean(),
    bolFaxNumber: yup.string().when(["faxBolAtOrderEntry", "faxBolAtOrderDispatch"], {
      is: (faxBolAtOrderEntry, faxBolAtOrderDispatch) => {
        return faxBolAtOrderEntry || faxBolAtOrderDispatch;
      },
      then: yup.string().matches(phoneRegex).required(),
      otherwise: yup.string().matches(phoneRegex),
    }),

    reloadDays: yup.string().matches(daysValidation).max(32767),
    deliveryByDays: yup.string().matches(daysValidation),
  });

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setBolFaxNumber(formattedPhoneNumber);
  };

  useEffect(() => {
    if (!dpuCustomer) {
      setAddUnitNumber(false);
    }
  }, [dpuCustomer]);

  useEffect(() => {
    if (faxBolAtOrderDispatch || faxBolAtOrderEntry || requirePdi) {
      dispatch(setOrdersSettingsTabInitialColor(false));
    } else {
      dispatch(setOrdersSettingsTabInitialColor(true));
    }
    if ((faxBolAtOrderDispatch || faxBolAtOrderEntry || bolFaxNumber) && !bolFaxNumber.match(phoneRegex)) {
      dispatch(setOrdersSettingsTabInitialColor(false));
      dispatch(setIsOrdersSettingsTabValid(false));
    } else if (requirePdi && !(PDIDealerFK && PDIYardFK && PDIPlantGroupFK)) {
      dispatch(setIsOrdersSettingsTabValid(false));
    } else {
      dispatch(setIsOrdersSettingsTabValid(true));
    }
  }, [
    faxBolAtOrderDispatch,
    faxBolAtOrderEntry,
    bolFaxNumber,
    requirePdi,
    PDIYardFK,
    PDIDealerFK,
    PDIPlantGroupFK,
  ]);

  return (
    <Formik
      initialValues={{
        faxBolAtOrderEntry,
        faxBolAtOrderDispatch,
        bolFaxNumber,
        reloadDays,
        deliveryByDays,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        faxBolAtOrderEntry: false,
        faxBolAtOrderDispatch: false,
        bolFaxNumber: true,
        reloadDays: true,
        deliveryByDays: true,
      }}
    >
      {(formik) => (
        <div className="p-2 w-100">
          <Row className="m-0 p-0">
            {/* COL 1 */}
            <Col sm={4} md={4} lg={4} xl={4} xs={4}>
              {/*Email BOL At Order Entry*/}
              <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={5} sm={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.settings.email.bol.at.order.entry.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="emailBolAtOrderEntry"
                    value={emailBolAtOrderEntry}
                    checked={emailBolAtOrderEntry}
                    disabled={viewDetail}
                    onChange={(e) => setEmailBolAtOrderEntry(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Email BOL At Dispatch*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={5} sm={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.settings.email.bol.at.dispatch.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="emailBolAtDispatch"
                    value={emailBolAtDispatch}
                    checked={emailBolAtDispatch}
                    disabled={viewDetail}
                    onChange={(e) => setEmailBolAtDispatch(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Email BOL At Invoice*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={5} sm={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.settings.email.bol.at.invoice.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="emailBolAtInvoice"
                    value={"emailBolAtInvoice"}
                    checked={emailBolAtInvoice}
                    disabled={viewDetail}
                    onChange={(e) => setEmailBolAtInvoice(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Emailed BOL Add Signature*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={5} sm={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.settings.emailed.bol.add.signature.field")}
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="emailedBolAddSignature"
                    value={emailedBolAddSignature}
                    checked={emailedBolAddSignature}
                    disabled={viewDetail}
                    onChange={(e) => setEmailedBolAddSignature(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Blank Space */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 visibility-hidden">
                <Col xs={5} sm={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label"></Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input type="checkbox" className="form-check-input p-0 " name="emailedBolAddSignature" />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 visibility-hidden">
                <Col xs={5} sm={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label"></Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input type="checkbox" className="form-check-input p-0 " name="emailedBolAddSignature" />
                </Col>
              </Form.Group>

              {/*Batch Email BOL At Order Entry*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={5} sm={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.settings.batch.email.bol.at.order.entry.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="batchEmailBolAtOrderEntry"
                    value={batchEmailBolAtOrderEntry}
                    checked={batchEmailBolAtOrderEntry}
                    disabled={viewDetail}
                    onChange={(e) => setBatchEmailBolAtOrderEntry(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*Batch Email BOL Daily*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={5} sm={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.settings.batch.email.bol.daily.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="batchEmailBolDaily"
                    value={batchEmailBolDaily}
                    checked={batchEmailBolDaily}
                    disabled={viewDetail}
                    onChange={(e) => setBatchEmailBolDaily(e.target.checked)}
                  />
                </Col>
              </Form.Group>
              {/*Blank Space */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 visibility-hidden">
                <Col xs={5} sm={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label"></Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input type="checkbox" className="form-check-input p-0 " name="emailedBolAddSignature" />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 visibility-hidden">
                <Col xs={5} sm={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label"></Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input type="checkbox" className="form-check-input p-0 " name="emailedBolAddSignature" />
                </Col>
              </Form.Group>

              {/*FAX Bol At Order Entry*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={5} sm={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.settings.fax.bol.at.order.entry.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="faxBolAtOrderEntry"
                    value={faxBolAtOrderEntry}
                    checked={faxBolAtOrderEntry}
                    disabled={viewDetail}
                    onChange={(e) => setFaxBolAtOrderEntry(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*FAX Bol At Dispatch*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={5} sm={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.settings.fax.bol.at.order.dispatch.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="faxBolAtOrderDispatch"
                    value={faxBolAtOrderDispatch}
                    checked={faxBolAtOrderDispatch}
                    disabled={viewDetail}
                    onChange={(e) => setFaxBolAtOrderDispatch(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*BOL FAX Number*/}

              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={5} md={5} sm={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.settings.bol.fax.number.field")}
                  </Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "110px" }}>
                  <Input
                    className={`customFormControl
                    ${(bolFaxNumber || faxBolAtOrderDispatch || faxBolAtOrderEntry) && !bolFaxNumber.match(phoneRegex) ? "borderRed" : faxBolAtOrderDispatch || faxBolAtOrderEntry ? "borderGreen" : "borderBlack"}
                    `}
                    name="bolFaxNumber"
                    type="fax"
                    value={bolFaxNumber}
                    disabled={viewDetail}
                    maxLength={14}
                    onChange={(e) => {
                      formik.handleChange(e);
                      faxFormatHandler(e);
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Col>
              </Form.Group>
            </Col>

            {/* COL 2 */}
            <Col xs={3} sm={3} md={3}>
              {/*  Require Model */}
              <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={6} sm={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Require Model</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="requireModel"
                    value={requireModel}
                    checked={requireModel}
                    disabled={viewDetail}
                    onChange={(e) => setRequireModel(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/* Require Model Code */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={6} sm={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Require Model Code</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="requireModelCode"
                    disabled={viewDetail}
                    value={requireModelCode}
                    checked={requireModelCode}
                    onChange={(e) => setRequireModelCode(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/* Require VIN */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={6} sm={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Require VIN</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    disabled={viewDetail}
                    name="requireVIN"
                    value={requireVIN}
                    checked={requireVIN}
                    onChange={(e) => {
                      setRequireVIN(e.target.checked);
                      setRequireFullVIN(false);
                    }}
                  />
                </Col>
              </Form.Group>

              {/* Require Full VIN */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={6} sm={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Require Full VIN</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    disabled={viewDetail}
                    name="requireFullVIN"
                    value={requireFullVIN}
                    checked={requireFullVIN}
                    onChange={(e) => {
                      setRequireFullVIN(e.target.checked);
                      setRequireVIN(false);
                    }}
                  />
                </Col>
              </Form.Group>

              {/* Require Serial Number */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={6} sm={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Require Serial Number</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    disabled={viewDetail}
                    name="requireSerialNumber"
                    value={requireSerialNumber}
                    checked={requireSerialNumber}
                    onChange={(e) => setRequireSerialNumber(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/* Require Stock Number */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={6} sm={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Require Stock Number</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    disabled={viewDetail}
                    name="requireStockNumber"
                    value={requireStockNumber}
                    checked={requireStockNumber}
                    onChange={(e) => setRequireStockNumber(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/* Require PO */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={6} sm={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Require PO</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    disabled={viewDetail}
                    name="requirePO"
                    value={requirePO}
                    checked={requirePO}
                    onChange={(e) => setRequirePO(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/* Require Bank/Client */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={6} sm={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Require Bank/Client</Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    disabled={viewDetail}
                    name="requireBankClient"
                    value={requireBankClient}
                    checked={requireBankClient}
                    onChange={(e) => setRequireBankClient(e.target.checked)}
                  />
                </Col>
              </Form.Group>
              {/******* Enhancement 29 *******/}

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 visibility-hidden">
                <Col xs={6} sm={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label"></Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0">
                  <input type="checkbox" className="form-check-input p-0 " name="emailedBolAddSignature" />
                </Col>
              </Form.Group>

              {/* Maximum Haul & Tow Length */}
              <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                <Col xs={6} md={6} sm={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Maximum Haul & Tow Length</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "75px" }}>
                  <Input
                    className="customFormControl"
                    name="maximumHaulTowLength"
                    type="number"
                    value={maximumHaulTowLength}
                    disabled={viewDetail}
                    onChange={(e) => {
                      const value = e.target.value;
                      const num = parseInt(value);

                      if (
                        value === "" ||
                        (!isNaN(num) && ((num >= -32768 && num <= 32768) || value === "-"))
                      ) {
                        setMaximumHaulTowLength(value);
                        if (value === "") {
                          setMaximumFlatbedLength("");
                        }
                      }
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Col>
              </Form.Group>

              {/* Maximum Flatbed Length */}
              <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                <Col xs={6} md={6} sm={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Maximum Flatbed Length</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "75px" }}>
                  <Input
                    className="customFormControl"
                    name="maximumFlatbedLength"
                    type="number"
                    value={maximumFlatbedLength}
                    disabled={
                      viewDetail ||
                      isNaN(parseInt(maximumHaulTowLength)) ||
                      parseInt(maximumHaulTowLength) <= 0
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      const num = parseInt(value);
                      const maxTow = parseInt(maximumHaulTowLength);

                      if (value === "" || (!isNaN(num) && num >= -32768 && num <= 32768 && num <= maxTow)) {
                        setMaximumFlatbedLength(value);
                      }
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Col>
              </Form.Group>

              {/*Unit Number Prefix*/}

              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={6} md={6} sm={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Unit Number Prefix</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "45px" }}>
                  <Input
                    className={`customFormControl }
                     `}
                    name="UnitNumberPrefix"
                    type="fax"
                    value={unitNumberPrefix}
                    disabled={viewDetail}
                    maxLength={4}
                    onChange={(e) => {
                      const value = e.target.value?.toUpperCase(); // Convert input to uppercase
                      if (/^[A-Za-z0-9]{0,3}-?$/.test(value)) {
                        setUnitNumberPrefix(value);
                      }
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Col>
              </Form.Group>

              {/* Add Plant Unit Number Prefix */}
              <Form.Group
                className="mt-3 form-group  align-items-center row  m-l-0 m-r-0"
                hidden={!(hasPlants || dpuCustomer)}
              >
                <Col xs={6} sm={6} className="p-0">
                  <Form.Label className="col-form-label dealer-label">
                    Add Plant Unit Number Prefix
                  </Form.Label>
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    disabled={viewDetail || !(hasPlants || dpuCustomer)}
                    name="requireBankClient"
                    value={addUnitNumber}
                    checked={addUnitNumber}
                    onChange={(e) => setAddUnitNumber(e.target.checked)}
                  />
                </Col>
              </Form.Group>
            </Col>

            {/* COL 3 */}
            <Col xs={5} md={5} sm={5}>
              {/*Reload Days*/}
              <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.settings.reload.days.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0">
                  <Input
                    className="customFormControl"
                    name="reloadDays"
                    value={reloadDays}
                    disabled={viewDetail}
                    maxLength={5}
                    onChange={(e) => {
                      formik.handleChange(e);
                      (e.target.value === "" ||
                        (e.target.value?.match(/^\d{0,5}?$/) && e.target.value <= 32767)) &&
                        setReloadDays(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Col>
              </Form.Group>

              {/*Deliver By Days*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.settings.delivery.by.days.field")}
                  </Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0">
                  <Input
                    className="customFormControl"
                    name="deliveryByDays"
                    value={deliveryByDays}
                    disabled={viewDetail}
                    maxLength={5}
                    onChange={(e) => {
                      formik.handleChange(e);
                      (e.target.value === "" ||
                        (e.target.value?.match(/^\d{0,5}?$/) && e.target.value <= 32767)) &&
                        setDeliveryByDays(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Col>
              </Form.Group>

              {/*Blank Space */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 visibility-hidden">
                <Col xs={5} sm={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label"></Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input type="checkbox" className="form-check-input p-0 " name="emailedBolAddSignature" />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 visibility-hidden">
                <Col xs={5} sm={5} className="p-0">
                  <Form.Label className="col-form-label dealer-label"></Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input type="checkbox" className="form-check-input p-0 " name="emailedBolAddSignature" />
                </Col>
              </Form.Group>

              {/*Require PDI*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="col-form-label dealer-label">Request PDI</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="requirePdi"
                    value={requirePdi}
                    checked={requirePdi}
                    disabled={viewDetail}
                    onChange={(e) => setRequirePdi(e.target.checked)}
                  />
                </Col>
              </Form.Group>
              {/*Require Motorized Outbound PDI*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="col-form-label dealer-label">
                    Require Motorized Outbound PDI
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="requirePdi"
                    value={requireMotorizedOutboundPDI}
                    checked={requireMotorizedOutboundPDI}
                    disabled={viewDetail || !requirePdi}
                    onChange={(e) => setRequireMotorizedOutboundPDI(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/* Require Motorized Reload PDI */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="col-form-label dealer-label">
                    Require Motorized Reload PDI
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="requirePdi"
                    value={requireMotorizedReloadPDI}
                    checked={requireMotorizedReloadPDI}
                    disabled={viewDetail || !requirePdi}
                    onChange={(e) => setRequireMotorizedReloadPDI(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/* Require Towable Outbound PDI */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="col-form-label dealer-label">
                    Require Towable Outbound PDI
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="requirePdi"
                    value={requireTowableOutboundPDI}
                    checked={requireTowableOutboundPDI}
                    disabled={viewDetail || !requirePdi}
                    onChange={(e) => setRequireTowableOutboundPDI(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/* Require Towable Reload PDI */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="col-form-label dealer-label">Require Towable Reload PDI</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={5} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    name="requirePdi"
                    value={requireTowableReloadPDI}
                    checked={requireTowableReloadPDI}
                    disabled={viewDetail || !requirePdi}
                    onChange={(e) => setRequireTowableReloadPDI(e.target.checked)}
                  />
                </Col>
              </Form.Group>

              {/*PDI Yard*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.settings.pdi.yard.field")}
                  </Form.Label>
                </Col>
                <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={PDIYard}
                    searchString={PDIYardInput}
                    customFormatSearchString={(searchString) => searchString}
                    renderItemId={(yard) => yard.yardPK}
                    renderItemField={(yard) => yard.description}
                    handleSearchString={(string) => setPDIYardInput(string)}
                    fetchDataBySearchString={fetchYardByName}
                    onSelect={handlePDIYardSelection}
                    clearInputCallback={() => {
                      setPDIYardFK(null);
                    }}
                    disabled={viewDetail || requirePdi === false}
                    className={`${
                      viewDetail || !requirePdi
                        ? ""
                        : requirePdi
                          ? !PDIYardFK || PDIYardInput === ""
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                    }`}
                    towardsTop
                    selectedId={PDIYardFK}
                    loading={pdiLoading}
                  />
                  <LookupButton
                    onClick={handlePDIYardLookupModalshow}
                    disabled={viewDetail || requirePdi === false}
                  />
                </Col>
              </Form.Group>

              {/*PDI Dealer*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.orders.sub.tab.settings.pdi.dealer.field")}
                  </Form.Label>
                </Col>
                <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={PDIDealer}
                    searchString={PDIDealerInput}
                    customFormatSearchString={(searchString) => searchString}
                    renderItemId={(dealer) => dealer.dealerPK}
                    renderItemField={(dealer) => dealer.name}
                    handleSearchString={(string) => setPDIDealerInput(string)}
                    fetchDataBySearchString={fetchDealerByName}
                    onSelect={handlePDIDealerSelection}
                    selectedId={PDIDealerFK}
                    loading={dealerLoading}
                    clearInputCallback={() => {
                      setPDIDealerFK(null);
                    }}
                    disabled={viewDetail || requirePdi === false}
                    className={`${
                      viewDetail || !requirePdi
                        ? ""
                        : requirePdi
                          ? !PDIDealerFK || PDIDealerInput === ""
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                    }`}
                    towardsTop
                  />
                  <LookupButton
                    onClick={handlePDIDealerLookupModalshow}
                    disabled={viewDetail || requirePdi === false}
                  />
                </Col>
              </Form.Group>

              {/*PDI Plant Group*/}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0" style={{ width: "200px" }}>
                  <Form.Label className="col-form-label dealer-label">
                    {t("customer.maintanance.invoice.sub.tab.pdi.plant.group.field")}
                  </Form.Label>
                </Col>
                <Col xs={7} md={7} sm={7} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={PDIPlantGroup}
                    searchString={PDIPlantGroupInput}
                    customFormatSearchString={(searchString) => searchString}
                    renderItemId={(plantGroup) => plantGroup.customerPlantGroupPK}
                    renderItemField={(plantGroup) => plantGroup.description}
                    handleSearchString={(string) => setPDIPlantGroupInput(string)}
                    fetchDataBySearchString={fetchPlantGroupByName}
                    onSelect={handlePDIPlantGroupSelection}
                    selectedId={PDIPlantGroupFK}
                    loading={pdiPlantLoading}
                    clearInputCallback={() => {
                      setPDIPlantGroupFK(null);
                    }}
                    disabled={viewDetail || requirePdi === false}
                    className={`${
                      viewDetail || !requirePdi
                        ? ""
                        : requirePdi
                          ? !PDIPlantGroupFK || PDIPlantGroupInput === ""
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                    }`}
                    towardsTop
                  />
                  <LookupButton
                    onClick={handlePDIPlantGroupLookupModalshow}
                    disabled={viewDetail || requirePdi === false}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          {/* PDI Yard Lookup Modal */}
          <YardLookup
            show={showPDIYardLookup}
            onHide={hidePDIYardModal}
            renderItemId={(yard) => yard.yardPK}
            handleLookupSelection={handlePDIYardLookupSelection}
            MaintenanceProgram
          />
          {/* PDI Dealer Lookup Modal */}
          <DealerLookup
            show={showPDIDealerLookup}
            onHide={hidePDIDealerModal}
            renderItemId={(dealer) => dealer.dealerPK}
            handleLookupSelection={handlePDIDealerLookupSelection}
            MaintenanceProgram
          />
          {/* PDI Plant Groups Lookup Modal */}
          <CustomerPlantGroupsLookup
            show={showPDIPlantGroupLookup}
            onHide={hidePDIPlantGroupModal}
            renderItemId={(plantGroup) => plantGroup.customerPlantGroupPK}
            handleLookupSelection={handlePDIPlantGroupLookupSelection}
            MaintenanceProgram
          />
        </div>
      )}
    </Formik>
  );
}
export default SettingsSubTab;
