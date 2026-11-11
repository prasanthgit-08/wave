import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../common/LookupButton";
import { useSelector, useDispatch } from "react-redux";
import EditMasterExpressService from "../../../../../../services/Units/EditMasterExpressService";
import SpecialCodeLookup from "../../../../../LookupScreens/SpecialCode/SpecialCodeLookup";
import UnitTypeLookup from "../../../../../LookupScreens/UnitType/UnitTypeLookup";
import {
  setEditedUnitDataToSaveForUnitTab,
  setUnitTypeFKReduxValue,
  setSpecialCodeFKReduxValue,
  setGvwrReduxValue,
  setIsUnitTypeOverWidth,
  setUnitTypeELDRequired,
  setIsUnitTabTabColumn1Valid,
  setUnitNumberUniquenessCheckMsg,
  setUnitTypeLength,
  setFlagChanged,
  setUnitOverWidthLoadRequired,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import {
  setCdlRate,
  setInvoiceApportionedRate,
  setTriggeringAmountCalculation,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressInvoiceTabSlice";
import OrderEntryService from "../../../../../../services/OrderEntryService";
import {
  setDriverApportionedRate,
  setDriverCDLARate,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressDriverTabSlice";
import { updateField } from "../../../../../../redux/EditMasterExpress/EditMasterExpressDispatchDriverPayTabSlice";
import toast from "react-hot-toast";
import { getCurrentCompany } from "../../../../../../utils/utils";

const UnitTabColumn1 = ({ styles }) => {
  const dispatch = useDispatch();

  /*** States From Redux***/
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const selectedUnitId = useSelector((state) => state.editMasterExpress.selectedUnitId);
  const unitTypeFKReduxValue = useSelector(
    (state) => state.editMasterExpressTabsReducer.unitTypeFKReduxValue
  );
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);
  const unitNumberUniquenessCheckMsg = useSelector(
    (state) => state.editMasterExpressTabsReducer.unitNumberUniquenessCheckMsg
  );

  /*** Local States ***/
  const [unitNumber, setUnitNumber] = useState("");
  const [model, setModel] = useState("");
  const [modelCode, setModelCode] = useState("");
  const [vin, setVin] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [stockNumber, setStockNumber] = useState("");
  const [unitTypeList, setUnitTypeList] = useState([]);
  const [unitTypeShowLookup, setUnitTypeShowLookup] = useState(false);
  const [unitTypeInput, setUnitTypeInput] = useState("");
  const [unitType, setUnitType] = useState(null);
  const [unitTypeFK, setUnitTypeFK] = useState(null);
  const [unitTypeMotorized, setUnitTypeMotorized] = useState(false);
  const [unitTypeTowable, setUnitTypeTowable] = useState(false);
  const [allowMultiUnit, setAllowMultiUnit] = useState(false);
  const [allowPopup, setAllowPopup] = useState(false);
  const [allowTruckCamper, setAllowTruckCamper] = useState(false);
  const [unitTypeGroupFKsList, setUnitTypeGroupFKsList] = useState([]);
  const [engineType, setEngineType] = useState("NA");
  const [GVWR, setGVWR] = useState("");
  const [shippingWeight, setShippingWeight] = useState("");
  const [specialCodeList, setSpecialCodeList] = useState([]);
  const [specialCodeShowLookup, setSpecialCodeShowLookup] = useState(false);
  const [specialCodeInput, setSpecialCodeInput] = useState("");
  const [specialCodeFK, setSpecialCodeFK] = useState(null);
  const [poNumber, setPoNumber] = useState("");
  const [authorizedBy, setAuthorizedBy] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [collectForCustomers, setCollectForCustomers] = useState("");
  const [unitsLoading, setUnitsLoading] = useState(true);
  const [specialCodeLoading, setSpecialCodeLoading] = useState(true);
  const [showUnitNumberReasonModal, setShowUnitNumberReasonModal] = useState(false);
  const [unitNumberReason, setUnitNumberReason] = useState("");
  const [pendingUnitNumber, setPendingUnitNumber] = useState("");
  const originalUnitNumber = selectedUnitData?.editMasterExpressUnitTabDTO?.unitNumber?.trim() || "";

  /*** For Validations ***/
  const [selectedUnitCustomerFK, setSelectedUnitCustomerFK] = useState("");

  const currentCompany = getCurrentCompany();

  /***  Populating selected driver details ***/
  useEffect(() => {
    if (selectedUnitData != null) {
      setUnitNumber(selectedUnitData?.editMasterExpressUnitTabDTO?.unitNumber?.trim() || "");
      setModel(selectedUnitData?.editMasterExpressUnitTabDTO?.model?.trim() || "");
      setModelCode(selectedUnitData?.editMasterExpressUnitTabDTO?.modelCode?.trim() || "");
      setVin(selectedUnitData?.editMasterExpressUnitTabDTO?.vin?.trim() || "");
      setSerialNumber(selectedUnitData?.editMasterExpressUnitTabDTO?.serialNumber?.trim() || "");
      setStockNumber(selectedUnitData?.editMasterExpressUnitTabDTO?.stockNumber?.trim() || "");
      setUnitTypeFK(selectedUnitData?.editMasterExpressUnitTabDTO?.unitTypePK || "");
      dispatch(setUnitTypeFKReduxValue(selectedUnitData?.editMasterExpressUnitTabDTO?.unitTypePK || null));
      setUnitTypeInput(selectedUnitData?.editMasterExpressUnitTabDTO?.unitTypeDescription?.trim() || "");
      setUnitTypeMotorized(selectedUnitData?.editMasterExpressUnitTabDTO?.unitTypeMotorized);
      setUnitTypeTowable(selectedUnitData?.editMasterExpressUnitTabDTO?.unitTypeTowable);
      setAllowMultiUnit(selectedUnitData?.editMasterExpressUnitTabDTO?.allowMultiUnit);
      setAllowPopup(selectedUnitData?.editMasterExpressUnitTabDTO?.allowPopup);
      setAllowTruckCamper(selectedUnitData?.editMasterExpressUnitTabDTO?.allowTruckCamper);
      setUnitTypeGroupFKsList(selectedUnitData?.editMasterExpressUnitTabDTO?.unitTypeGroupIds || []);
      setEngineType(
        selectedUnitData?.editMasterExpressUnitTabDTO?.gas
          ? "gas"
          : selectedUnitData?.editMasterExpressUnitTabDTO?.diesel
            ? "diesel"
            : "NA"
      );
      setGVWR(selectedUnitData?.editMasterExpressUnitTabDTO?.gvwr || 0);
      setShippingWeight(selectedUnitData?.editMasterExpressUnitTabDTO?.shippingWeight || 0);
      setSpecialCodeFK(selectedUnitData?.editMasterExpressUnitTabDTO?.specialCodePK || null);
      dispatch(
        setSpecialCodeFKReduxValue(selectedUnitData?.editMasterExpressUnitTabDTO?.specialCodePK || null)
      );
      setSpecialCodeInput(
        selectedUnitData?.editMasterExpressUnitTabDTO?.specialCodeDescription?.trim() || ""
      );
      setPoNumber(selectedUnitData?.editMasterExpressUnitTabDTO?.poNumber?.trim() || "");
      setAuthorizedBy(selectedUnitData?.editMasterExpressUnitTabDTO?.authorizedBy?.trim() || "");
      setProjectCode(selectedUnitData?.editMasterExpressUnitTabDTO?.projectCode?.trim() || "");
      setCollectForCustomers(selectedUnitData?.editMasterExpressUnitTabDTO?.collectForCustomer || 0);

      //Validation
      setSelectedUnitCustomerFK(selectedUnitData?.editMasterExpressUnitTabDTO?.customerPK || "");
      dispatch(setIsUnitTypeOverWidth(selectedUnitData?.editMasterExpressUnitTabDTO?.overWidth || false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUnitData, viewDetail]);

  /*** AutoComplete Dropdown ***/
  /*** Unit Type Auto Complete ***/
  const fetchUnitType = (string) => {
    setUnitsLoading(true);
    EditMasterExpressService.fetchUnitType(
      string,
      unitTypeMotorized,
      unitTypeTowable,
      allowMultiUnit,
      allowPopup,
      allowTruckCamper,
      unitTypeGroupFKsList
    )
      .then((response) => {
        const data = response;
        const trimmedList = data.data.content?.map((unitType) => ({
          ...unitType,
          descriptionLong: unitType.descriptionLong?.trim(),
        }));
        setUnitTypeList(trimmedList);
      })
      .catch((err) => {})
      .finally(() => {
        setUnitsLoading(false);
      });
  };

  const handleUnitTypeSelection = (unitType) => {
    setUnitType(unitType);
    setUnitTypeInput(unitType.descriptionLong?.trim());
    setUnitTypeFK(unitType.unitTypePK);
    dispatch(setUnitTypeFKReduxValue(unitType.unitTypePK));
    dispatch(setUnitTypeELDRequired(unitType.requiresELD));
    dispatch(setUnitTypeLength(unitType.length));
    dispatch(setIsUnitTypeOverWidth(unitType?.overWidth));
    if (!unitType?.overWidth) {
      dispatch(setUnitOverWidthLoadRequired(false));
    }
    setUnitTypeShowLookup(false);
    setTimeout(() => {
      dispatch(setTriggeringAmountCalculation());
      dispatch(setFlagChanged("unitTypeChanged"));
    }, 0);
  };

  /*** Special Code Auto Complete ***/
  const fetchSpecialCodeByName = (string) => {
    setSpecialCodeLoading(true);
    EditMasterExpressService.fetchSpecialCodeByName(string)
      .then((response) => {
        const data = response.data.content;
        const trimmedList = data?.map((specialCode) => ({
          ...specialCode,
          description: specialCode.description?.trim(),
        }));
        setSpecialCodeList(trimmedList);
      })
      .catch((err) => {})
      .finally(() => {
        setSpecialCodeLoading(false);
      });
  };

  const handleSpecialCodeSelection = (code) => {
    setSpecialCodeInput(code.description?.trim());
    setSpecialCodeFK(code.specialCodePK);
    dispatch(setSpecialCodeFKReduxValue(code.specialCodePK));
    setSpecialCodeShowLookup(false);
    setTimeout(() => {
      dispatch(setTriggeringAmountCalculation());
      dispatch(setFlagChanged("specialCodeChanged"));
    }, 0);
  };

  const getCDLA = () => {
    if (
      selectedUnitData?.editMasterExpressDriverTabDTO?.driverCustomerRateFK ||
      selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceCustomerRateId ||
      1
    ) {
      OrderEntryService.getCDLARate({
        gvwr: GVWR ? GVWR : 0,
        length: selectedUnitData?.editMasterExpressUnitTabDTO?.length
          ? selectedUnitData?.editMasterExpressUnitTabDTO?.length
          : 0,
        invoiceCustomerRateFK: selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceCustomerRateId
          ? selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceCustomerRateId
          : 0,
        driverCustomerRateFK: selectedUnitData?.editMasterExpressDriverTabDTO?.driverCustomerRateFK
          ? selectedUnitData?.editMasterExpressDriverTabDTO?.driverCustomerRateFK
          : 0,
        reload: selectedUnitData?.editMasterExpressSettingsTabDTO?.reload,
        returnBit: selectedUnitData?.editMasterExpressUnitTabDTO?.isReturn || 0,
        requireCDLA: selectedUnitData?.editMasterExpressSettingsTabDTO?.requiredCDLA,
        canadian: selectedUnitData?.editMasterExpressUnitTabDTO?.isDeliveryDealerCanadian || 0,
      })
        .then(({ data }) => {
          dispatch(updateField({ field: "cDLARate", value: data?.Driver }));
          if (!selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.driverPK) {
            dispatch(setCdlRate(data?.Invoice));
            dispatch(setDriverCDLARate(data?.Driver));
          }
        })
        .catch(() => {});
    }
  };

  const getApprotioned = () => {
    if (
      selectedUnitData?.editMasterExpressDriverTabDTO?.driverCustomerRateFK ||
      selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceCustomerRateId ||
      1
    ) {
      OrderEntryService.getApportionedRate({
        shippingWeight: shippingWeight ? shippingWeight : 0,
        invoiceCustomerRateFK: selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceCustomerRateId
          ? selectedUnitData?.editMasterExpressInvoiceRatesData?.invoiceCustomerRateId
          : 0,
        driverCustomerRateFK: selectedUnitData?.editMasterExpressDriverTabDTO?.driverCustomerRateFK
          ? selectedUnitData?.editMasterExpressDriverTabDTO?.driverCustomerRateFK
          : 0,
        reload: selectedUnitData?.editMasterExpressSettingsTabDTO?.reload,
        returnBit: selectedUnitData?.editMasterExpressUnitTabDTO?.isReturn || 0,
        canadian: selectedUnitData?.editMasterExpressUnitTabDTO?.isDeliveryDealerCanadian || 0,
      })
        .then(({ data }) => {
          dispatch(updateField({ field: "apportionedRate", value: data?.Driver?.Amount }));
          if (!selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.driverPK) {
            dispatch(setInvoiceApportionedRate(data?.Invoice?.Amount));
            dispatch(setDriverApportionedRate(data?.Driver?.Amount));
          }
        })
        .catch(() => {});
    }
  };

  //Functions related validations
  /*** Unit Number***/
  const hanldeCheckUnitNumber = (unitNumber) => {
    if (unitNumber.length >= 5) {
      EditMasterExpressService.checkUnitNumberValid(unitNumber, selectedUnitCustomerFK, selectedUnitId)
        .then((res) => {
          dispatch(setUnitNumberUniquenessCheckMsg(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (unitNumber.length < 5) {
      dispatch(setUnitNumberUniquenessCheckMsg(""));
    }
  };

  useEffect(() => {
    hanldeCheckUnitNumber(unitNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitNumber]);

  /*** GVWR***/
  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d]/g, "");
    if (value) return number;
  };

  useEffect(() => {
    dispatch(setGvwrReduxValue(GVWR));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GVWR]);

  /*** Tab Validation ***/
  useEffect(() => {
    if (
      unitNumber !== "" &&
      unitNumber.length >= 5 &&
      !unitNumberUniquenessCheckMsg &&
      !(
        unitType?.towable &&
        Number(selectedUnitData?.editMasterExpressUnitTabDTO?.shippingWeight) > 0 &&
        currentCompany?.enforceScalePlateWeights &&
        !Number(shippingWeight)
      ) &&
      (!selectedUnitData?.editMasterExpressUnitTabDTO?.requireModel ||
        (selectedUnitData?.editMasterExpressUnitTabDTO?.requireModel && model !== "")) &&
      (!selectedUnitData?.editMasterExpressUnitTabDTO?.requireModelCode ||
        (selectedUnitData?.editMasterExpressUnitTabDTO?.requireModelCode && modelCode !== "")) &&
      (!selectedUnitData?.editMasterExpressUnitTabDTO?.requireVIN ||
        (selectedUnitData?.editMasterExpressUnitTabDTO?.requireVIN && vin !== "")) &&
      (!selectedUnitData?.editMasterExpressUnitTabDTO?.requireSerialNumber ||
        (selectedUnitData?.editMasterExpressUnitTabDTO?.requireSerialNumber && serialNumber !== "")) &&
      (!selectedUnitData?.editMasterExpressUnitTabDTO?.requireStockNumber ||
        (selectedUnitData?.editMasterExpressUnitTabDTO?.requireStockNumber && stockNumber !== "")) &&
      unitTypeFK &&
      (GVWR === "" || (GVWR !== "" && GVWR <= 2147483647)) &&
      (shippingWeight === "" || (shippingWeight !== "" && shippingWeight <= 2147483647)) &&
      (!selectedUnitData?.editMasterExpressUnitTabDTO?.requirePO ||
        (selectedUnitData?.editMasterExpressUnitTabDTO?.requirePO && poNumber !== "")) &&
      ((!specialCodeFK && specialCodeInput === "") || (specialCodeInput !== "" && specialCodeFK))
    ) {
      dispatch(setIsUnitTabTabColumn1Valid(true));
    } else {
      dispatch(setIsUnitTabTabColumn1Valid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    unitNumber,
    unitNumberUniquenessCheckMsg,
    model,
    modelCode,
    vin,
    serialNumber,
    stockNumber,
    unitTypeFK,
    GVWR,
    shippingWeight,
    poNumber,
    selectedUnitData,
    specialCodeInput,
    specialCodeFK,
  ]);

  /* ********************* */

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDataToSaveForUnitTab({
        unitPK: Number(selectedUnitId),
        unitNumber: unitNumber,
        model: model,
        modelCode: modelCode,
        vin: vin,
        serialNumber: serialNumber,
        stockNumber: stockNumber,
        unitTypeFK: unitTypeFK,
        gas: engineType === "gas" ? true : false,
        diesel: engineType === "diesel" ? true : false,
        gvwr: GVWR || 0,
        shippingWeight: shippingWeight || 0,
        specialCodeFK: specialCodeFK,
        PONumber: poNumber,
        authorizedBy: authorizedBy,
        projectCode: projectCode,
        collectForCustomer: collectForCustomers || 0,

        oldUnitNumber: unitNumber !== originalUnitNumber ? originalUnitNumber : "",
        newUnitNumber: unitNumber !== originalUnitNumber ? unitNumber : "",
        reason: unitNumber !== originalUnitNumber ? unitNumberReason : "",
      })
    );
  };
  const handleReasonCancel = () => {
    setShowUnitNumberReasonModal(false);
    setUnitNumber(originalUnitNumber);
    setPendingUnitNumber("");
    setUnitNumberReason("");
  };

  const handleReasonSave = () => {
    if (!unitNumberReason.trim()) {
      toast.error("Please enter a reason");
      return;
    }

    setUnitNumber(pendingUnitNumber);

    dispatch(
      setEditedUnitDataToSaveForUnitTab({
        unitPK: selectedUnitId,
        unitNumber: pendingUnitNumber,
        oldUnitNumber: originalUnitNumber,
        newUnitNumber: pendingUnitNumber,
        reason: unitNumberReason,
      })
    );

    setShowUnitNumberReasonModal(false);
    setPendingUnitNumber("");
    setUnitNumberReason("");
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedUnitId,
    unitNumber,
    model,
    modelCode,
    vin,
    serialNumber,
    stockNumber,
    unitTypeFK,
    engineType,
    GVWR,
    shippingWeight,
    specialCodeFK,
    poNumber,
    authorizedBy,
    projectCode,
    collectForCustomers,
  ]);

  /***  Determine visibility of the "NA" option ***/
  const shouldDisableNA = () => {
    if (selectedUnitData?.editMasterExpressUnitTabDTO?.isCustomerCanadian) {
      // For Canadian customers, check CN fields
      return (
        selectedUnitData?.editMasterExpressUnitTabDTO?.invoiceFuelSurchargeGasCN > 0 ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.invoiceFuelSurchargeDieselCN > 0 ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.driverFuelSurchargeGasCN > 0 ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.driverFuelSurchargeDieselCN > 0
      );
    } else {
      // For non-Canadian customers, check non-CN fields
      return (
        selectedUnitData?.editMasterExpressUnitTabDTO?.invoiceFuelSurchargeGas > 0 ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.invoiceFuelSurchargeDiesel > 0 ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.driverFuelSurchargeGas > 0 ||
        selectedUnitData?.editMasterExpressUnitTabDTO?.driverFuelSurchargeDiesel > 0
      );
    }
  };

  return (
    <Col xs={4}>
      {/* ********************* */}
      {/* Unit Number */}
      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Unit Number</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl 
    ${
      isUnitDataLoading || viewDetail
        ? ""
        : unitNumber && unitNumber.length >= 1
          ? unitNumberUniquenessCheckMsg
            ? "borderRed"
            : unitNumber.length < 5
              ? "borderRed"
              : "borderGreen"
          : "borderRed"
    }`}
            name="unitNumber"
            type="text"
            autoComplete="off"
            disabled={viewDetail}
            maxLength={21}
            value={unitNumber}
            onInput={(e) => {
              let value = e.target.value.toUpperCase();

              if (value !== "" && /^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                value = value.substring(1);
              }

              setUnitNumber(value);
            }}
            onBlur={() => {
              const edited = unitNumber.trim();

              if (edited !== "" && edited !== originalUnitNumber && !showUnitNumberReasonModal) {
                setPendingUnitNumber(edited);
                setUnitNumberReason("");
                setShowUnitNumberReasonModal(true);
              }
            }}
          />
        </Col>
      </Form.Group>

      {/* {!viewDetail && (
        <Row className={`${!unitNumberUniquenessCheckMsg && "hide-elements"}`}>
          <Col xs={4} md={4} sm={4}></Col>
          <Col style={{ paddingLeft: "5px" }}>
            <p className="mb-0 text-danger" style={{ height: "7px" }}>
              {unitNumberUniquenessCheckMsg}
            </p>
          </Col>
        </Row>
      )}  */}
      <Row className={`${!viewDetail && !unitNumberUniquenessCheckMsg ? "" : "hide-elements"}`}>
        <Col xs={4} md={4} sm={4}></Col>
        <Col style={{ paddingLeft: "5px" }}>
          <p className="p-0 text-danger alert" style={{ height: "1px" }}>
            {unitNumberUniquenessCheckMsg}
          </p>
        </Col>
      </Row>
      {/* ********************* */}

      {/* Model */}
      <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Model</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl 
            ${
              isUnitDataLoading || viewDetail
                ? ""
                : !selectedUnitData?.editMasterExpressUnitTabDTO?.requireModel
                  ? ""
                  : model || model.length >= 1
                    ? "borderGreen"
                    : "borderRed"
            }`}
            name="model"
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            disabled={viewDetail}
            maxLength={21}
            value={model}
            onInput={(e) => {
              let value = e.target.value;
              if (value !== "") {
                if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                  value = value.substring(1);
                }
              }
              setModel(value);
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Model Code */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Model Code</Form.Label>
        </Col>
        <Col xs={6} className="p-0">
          <input
            className={`customFormControl 
            ${
              isUnitDataLoading || viewDetail
                ? ""
                : !selectedUnitData?.editMasterExpressUnitTabDTO?.requireModelCode
                  ? ""
                  : modelCode || modelCode.length >= 1
                    ? "borderGreen"
                    : "borderRed"
            }`}
            name="modelCode"
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            disabled={viewDetail}
            maxLength={21}
            value={modelCode}
            onInput={(e) => {
              let value = e.target.value;
              if (value !== "") {
                if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                  value = value.substring(1);
                }
              }
              setModelCode(value);
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* VIN */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>VIN</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl 
            ${
              isUnitDataLoading || viewDetail
                ? ""
                : !selectedUnitData?.editMasterExpressUnitTabDTO?.requireVIN
                  ? ""
                  : vin || vin.length >= 1
                    ? "borderGreen"
                    : "borderRed"
            }`}
            name="vin"
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            disabled={viewDetail}
            maxLength={21}
            value={vin}
            onInput={(e) => {
              let value = e.target.value;
              if (value !== "") {
                if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                  value = value.substring(1);
                }
              }
              setVin(value);
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Serial Number */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Serial Number</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl 
            ${
              isUnitDataLoading || viewDetail
                ? ""
                : !selectedUnitData?.editMasterExpressUnitTabDTO?.requireSerialNumber
                  ? ""
                  : serialNumber || serialNumber.length >= 1
                    ? "borderGreen"
                    : "borderRed"
            }`}
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            disabled={viewDetail}
            maxLength={21}
            value={serialNumber}
            onInput={(e) => {
              let value = e.target.value;
              if (value !== "") {
                if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                  value = value.substring(1);
                }
              }
              setSerialNumber(value);
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Stock Number */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Stock Number</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl 
            ${
              isUnitDataLoading || viewDetail
                ? ""
                : !selectedUnitData?.editMasterExpressUnitTabDTO?.requireStockNumber
                  ? ""
                  : stockNumber || stockNumber.length >= 1
                    ? "borderGreen"
                    : "borderRed"
            }`}
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            disabled={viewDetail}
            maxLength={21}
            value={stockNumber}
            onInput={(e) => {
              let value = e.target.value;
              if (value !== "") {
                if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                  value = value.substring(1);
                }
              }
              setStockNumber(value);
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* unit type */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Unit Type</Form.Label>
        </Col>

        <Col xs={7} md={7} sm={7} className={`p-0 ${styles.selectContainer}`}>
          {/* Unit Type Autocomplete */}
          <AutoCompleteDropdown
            arrayList={unitTypeList}
            searchString={unitTypeInput}
            renderItemId={(code) => code.unitTypePK}
            renderItemField={(code) => code.descriptionLong}
            handleSearchString={(string) => setUnitTypeInput(string)}
            fetchDataBySearchString={fetchUnitType}
            onSelect={handleUnitTypeSelection}
            clearInputCallback={() => {
              setUnitTypeFK(null);
            }}
            selectedId={unitTypeFK}
            className={`${
              isUnitDataLoading || viewDetail
                ? ""
                : unitTypeFK === "" || unitTypeFK === null
                  ? "borderRed"
                  : "borderGreen"
            }`}
            loading={unitsLoading}
            disabled={viewDetail}
          />
          <LookupButton
            disabled={viewDetail}
            onClick={() => {
              setUnitTypeShowLookup(true);
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Engine Type */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          !selectedUnitData?.editMasterExpressUnitTabDTO?.unitTypeMotorized ? "hide-elements" : ""
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Engine Type</Form.Label>
        </Col>

        <Col xs={7} md={7} sm={7} className={`p-0 ${styles.selectContainer}`}>
          <Col className="d-flex align-items-center">
            <input
              type="radio"
              name="engineType"
              value="gas"
              checked={engineType === "gas"}
              disabled={viewDetail}
              onChange={(e) => {
                setEngineType(e.target.value);
                setTimeout(() => {
                  dispatch(setTriggeringAmountCalculation());
                  dispatch(setFlagChanged("gasChanged"));
                }, 0);
              }}
            />{" "}
            <label className="ms-2">Gas</label>{" "}
          </Col>
          <Col className="d-flex align-items-center">
            <input
              type="radio"
              name="engineType"
              value="diesel"
              checked={engineType === "diesel"}
              disabled={viewDetail}
              onChange={(e) => {
                setEngineType(e.target.value);
                setTimeout(() => {
                  dispatch(setTriggeringAmountCalculation());
                  dispatch(setFlagChanged("dieselChanged"));
                }, 0);
              }}
            />{" "}
            <label className="ms-2">Diesel</label>{" "}
          </Col>
          <Col className={`d-flex align-items-center ${shouldDisableNA() ? "hide-elements" : ""}`}>
            <input
              type="radio"
              name="engineType"
              value="NA"
              checked={engineType === "NA"}
              disabled={viewDetail}
              onChange={(e) => {
                setEngineType(e.target.value);
                setTimeout(() => {
                  dispatch(setTriggeringAmountCalculation());
                  dispatch(setFlagChanged("NAChanged"));
                }, 0);
              }}
            />{" "}
            <label className="ms-2">NA</label>{" "}
          </Col>
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* GVWR */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>GVWR</Form.Label>
        </Col>

        <Col xs={3} md={3} sm={3} className="p-0">
          <input
            className={`customFormControl ${GVWR <= 2147483647 ? "" : "borderRed"}`}
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            disabled={viewDetail}
            value={GVWR}
            maxLength={10}
            onChange={(e) => {
              setGVWR(isNumber(e.target.value));
              dispatch(setGvwrReduxValue(isNumber(e.target.value)));

              setTimeout(() => {
                dispatch(setTriggeringAmountCalculation());
                dispatch(setFlagChanged("gvwrChanged"));
              }, 0);
            }}

            onBlur={() => {
              if (!GVWR) {
                setGVWR(isNumber(0));
                dispatch(setGvwrReduxValue(isNumber(0)));
              }
              // getCDLA();
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Shipping Weight */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Shipping Weight</Form.Label>
        </Col>

        <Col xs={3} md={3} sm={3} className="p-0">
          <input
            className={`customFormControl ${shippingWeight <= 2147483647 && !(unitType?.towable && Number(selectedUnitData?.editMasterExpressUnitTabDTO?.shippingWeight) > 0 && currentCompany?.enforceScalePlateWeights && !Number(shippingWeight)) ? "" : "borderRed"}`}
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            disabled={viewDetail}
            value={shippingWeight}
            maxLength={10}
            onChange={(e) => {
              setShippingWeight(isNumber(e.target.value));

              setTimeout(() => {
                dispatch(setTriggeringAmountCalculation());
                dispatch(setFlagChanged("shippingWeightChanged"));
              }, 0);
            }}

            onBlur={() => {
              if (!shippingWeight) {
                setShippingWeight(isNumber(0));
              }
              // getApprotioned();
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Special Code */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Special Code</Form.Label>
        </Col>

        <Col xs={7} md={7} sm={7} className={`p-0 ${styles.selectContainer}`}>
          {/* Special Code Autocomplete */}
          <AutoCompleteDropdown
            arrayList={specialCodeList}
            searchString={specialCodeInput}
            renderItemId={(code) => code.specialCodePK}
            renderItemField={(code) => code.description}
            handleSearchString={(string) => setSpecialCodeInput(string)}
            fetchDataBySearchString={fetchSpecialCodeByName}
            onSelect={handleSpecialCodeSelection}
            clearInputCallback={() => {
              setSpecialCodeFK(null);
              dispatch(setSpecialCodeFKReduxValue(null));
            }}
            loading={specialCodeLoading}
            selectedId={specialCodeFK}
            className={`customFormControl ${!specialCodeFK && specialCodeInput !== "" ? "borderRed" : ""}`}
            disabled={viewDetail}
          />
          <LookupButton
            disabled={viewDetail}
            onClick={() => {
              setSpecialCodeShowLookup(true);
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* PO Number */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>PO Number</Form.Label>
        </Col>

        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl 
              ${
                isUnitDataLoading ||
                viewDetail ||
                selectedUnitData?.editMasterExpressUnitTabDTO?.bulkInvoiceUnitPONumber
                  ? ""
                  : !selectedUnitData?.editMasterExpressUnitTabDTO?.requirePO
                    ? ""
                    : poNumber || poNumber.length >= 1
                      ? "borderGreen"
                      : "borderRed"
              }`}
            name="poNumber"
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            maxLength={30}
            disabled={viewDetail || selectedUnitData?.editMasterExpressUnitTabDTO?.bulkInvoiceUnitPONumber}
            value={poNumber}
            onInput={(e) => {
              let value = e.target.value;
              if (value !== "") {
                if (/^\s/.test(value)) {
                  value = value.substring(1);
                }
              }
              setPoNumber(value);
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}

      {/* Authorized By */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Authorized By</Form.Label>
        </Col>

        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            maxLength={25}
            disabled={viewDetail}
            value={authorizedBy}
            onInput={(e) => {
              let value = e.target.value;
              if (value !== "") {
                if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                  value = value.substring(1);
                }
              }
              setAuthorizedBy(value);
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Project Code */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Project Code</Form.Label>
        </Col>

        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            maxLength={30}
            disabled={viewDetail || selectedUnitData?.editMasterExpressUnitTabDTO?.bulkInvoiceUnitProjectCode}
            value={projectCode}
            onInput={(e) => {
              let value = e.target.value;
              if (value !== "") {
                if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                  value = value.substring(1);
                }
              }
              setProjectCode(value);
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Collect for Customers */}
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${
          !selectedUnitData?.editMasterExpressUnitTabDTO?.usePlants ? "hide-elements" : ""
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Collect for Customers</Form.Label>
        </Col>
        <Col xs={3} md={3} sm={3} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            maxLength={10}
            disabled={viewDetail}
            value={collectForCustomers}
            onInput={(e) => {
              const enteredValue = e.target.value;
              if (enteredValue === "" || enteredValue.match(/^\d{0,7}(\.\d{0,2})?$/)) {
                setCollectForCustomers(enteredValue);
              }
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Entered By */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Entered By</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            disabled
            value={selectedUnitData?.editMasterExpressUnitTabDTO?.enteredBy?.trim() || ""}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* SpecialCode Lookup Modal */}
      <SpecialCodeLookup
        show={specialCodeShowLookup}
        onHide={() => {
          setSpecialCodeShowLookup(false);
        }}
        renderItemId={(codes) => codes.specialCodePK}
        handleLookupSelection={handleSpecialCodeSelection}
        MaintenanceProgram
      />

      {/* ********************* */}
      <UnitTypeLookup
        show={unitTypeShowLookup}
        onHide={() => {
          setUnitTypeShowLookup(false);
        }}
        handleLookupSelection={handleUnitTypeSelection}
        editMasterExpress
      />
      <Modal show={showUnitNumberReasonModal} onHide={handleReasonCancel} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="font-18 h-100 temp-black-color">
            Please Enter a Reason for Changing the Unit Number
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="font-14 h-100">
          <Form.Group className={`mt-0 align-items-start row m-l-0 m-r-0 ${styles.colFormLabel}`}>
            <Col xs={2} sm={2} md={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Reason</Form.Label>
            </Col>

            <Col xs={9} sm={9} md={9} className="p-0">
              <textarea
                name="unitNumberReason"
                id="unitNumberReason"
                value={unitNumberReason}
                autoComplete="off"
                onChange={(e) => setUnitNumberReason(e.target.value)}
                style={{
                  resize: "none",
                  width: "100%",
                  minHeight: "120px",
                  padding: "8px",
                  borderRadius: "4px",
                  boxShadow: "none",
                  fontSize: "12px",
                  outline: "none",
                }}
                className={`${styles.formControl} ${!unitNumberReason.trim() ? "borderRed" : "borderGreen"}`}
              />
            </Col>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" disabled={!unitNumberReason.trim()} onClick={handleReasonSave}>
            Save
          </Button>

          <Button variant="secondary" onClick={handleReasonCancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default UnitTabColumn1;
