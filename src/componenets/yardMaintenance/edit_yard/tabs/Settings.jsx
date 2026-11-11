import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { t } from "i18next";
import { Formik } from "formik";
import * as yup from "yup";
import YardService from "../../../../services/YardService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";

import {
  setYardHasPrinter,
  setYardFormData,
  setPrinterFK,
  setShowPrinterLookup,
  setPrinterInput,
  setBolPrinterFK,
  setBolPrinterInput,
  setShowBolPrinterLookup,
  setShowKioskPrinterLookup,
  setKioskPrinterFK,
  setKioskPrinterInput,
  setYardDriverMilesAdjustment,
  setYardInvoiceMilesAdjustment,
  setYardAcres,
  setYardCapacity,
  setAccessGroup,
  setYardHasOpener,
} from "../../../../redux/YardMaintenanceSlice";
import PrinterLookup from "../../../LookupScreens/Printer/PrinterLookup";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import PrinterService from "../../../../services/PrinterService";
import LookupButton from "../../../common/LookupButton";
import Input from "../../../../components/common/input";
function Settings() {
  const params = useParams();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [checkboxValue, setCheckboxValue] = useState("outbound");
  const [outbound, setOutbound] = useState(false);
  const [reload, setReload] = useState(false);
  const [hasPrinter, setHasPrinter] = useState(false);
  const [yardPrinter, setYardPrinter] = useState("");
  const [bolPrinter, setBolPrinter] = useState("");
  const [kioskPrinter, setKioskPrinter] = useState("");
  const [hasOpener, setHasOpener] = useState(false);
  const [showOnApp, setShowOnApp] = useState(false);
  const [driverDoorCode, setDriverDoorCode] = useState("");
  const [yardGateCode, setYardGateCode] = useState("");
  const [openSunday, setOpenSunday] = useState(false);
  const [openMonday, setOpenMonday] = useState(true);
  const [openTuesday, setOpenTuesday] = useState(true);
  const [openWednesday, setOpenWednesday] = useState(true);
  const [openThursday, setOpenThursday] = useState(true);
  const [openFriday, setOpenFriday] = useState(true);
  const [openSaturday, setOpenSaturaday] = useState(false);
  const [onUsageReport, setOnUsageReport] = useState(false);
  const [driverMilesAdjustment, setDriverMilesAdjustment] = useState("");
  const [invoiceMilesAdjustment, setInvoiceMilesAdjustment] = useState("");
  const [capacity, setCapacity] = useState("");
  const [acres, setAcres] = useState("");
  const [yardprinterData, setYardprinterData] = useState([]);
  const [bolPrinterData, setBolPrinterData] = useState([]);
  const [kioskPrinterData, setKioskPrinterData] = useState([]);
  const [yardArray, setYardArray] = useState([]);
  const [yardprinterLoading, setYardprinterLoading] = useState(false);
  const [bolPrinterLoading, setBolPrinterLoading] = useState(false);
  const [kioskPrinterLoading, setKioskPrinterLoading] = useState(false);
  const viewDetail = useSelector((state) => state.yardMaintenanceReducer.viewDetail);

  const editYardData = useSelector((state) => state.yardMaintenanceReducer.editYardData);
  const showPrinterLookup = useSelector((state) => state.yardMaintenanceReducer.showPrinterLookup);
  const printerInput = useSelector((state) => state.yardMaintenanceReducer.printerInput);
  const printerFK = useSelector((state) => state.yardMaintenanceReducer.printerFK);
  const bolPrinterInput = useSelector((state) => state.yardMaintenanceReducer.bolPrinterInput);
  const showBolPrinterLookup = useSelector((state) => state.yardMaintenanceReducer.showBolPrinterLookup);
  const bolPrinterFK = useSelector((state) => state.yardMaintenanceReducer.bolPrinterFK);
  const showKioskPrinterLookup = useSelector((state) => state.yardMaintenanceReducer.showKioskPrinterLookup);
  const kioskPrinterInput = useSelector((state) => state.yardMaintenanceReducer.kioskPrinterInput);
  const kioskPrinterFK = useSelector((state) => state.yardMaintenanceReducer.kioskPrinterFK);
  const accessGroup = useSelector((state) => state.yardMaintenanceReducer.accessGroup);

  const isFirstRun = useRef(true);

  //Set Yard Printer
  const fetchYardPrinterValue = (id) => {
    if (id != null) {
      PrinterService.getPrinterById(id)
        .then((response) => {
          const data = response.data;
          dispatch(setPrinterInput(data.description?.trim()));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setPrinterInput(""));
    }
  };

  //Set BOL printer
  const setBolPrinterValue = (id) => {
    if (id != null) {
      PrinterService.getPrinterById(id)
        .then((response) => {
          const data = response.data;
          dispatch(setBolPrinterInput(data.description?.trim()));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setBolPrinterInput(""));
    }
  };
  //Set kiosk printer
  const setKioskPrinterValue = (id) => {
    if (id != null) {
      PrinterService.getPrinterById(id)
        .then((response) => {
          const data = response.data;
          dispatch(setKioskPrinterInput(data.description?.trim()));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setKioskPrinterInput(""));
    }
  };
  useEffect(() => {
    if (editYardData != null) {
      setOutbound(editYardData.outbound ? editYardData.outbound : "");
      setReload(editYardData.reload ? editYardData.reload : "");
      setHasPrinter(editYardData.hasPrinters ? editYardData.hasPrinters : "");

      setHasOpener(editYardData.hasOpener ? editYardData.hasOpener : "");
      setDriverDoorCode(editYardData.driverDoorCode ? editYardData.driverDoorCode?.trim() : "");
      setYardGateCode(editYardData.yardGateCode ? editYardData.yardGateCode?.trim() : "");
      dispatch(setAccessGroup(editYardData.accessGroup));
      setDriverMilesAdjustment(
        editYardData.driverMilesAdjustment != null ? editYardData.driverMilesAdjustment : ""
      );

      setInvoiceMilesAdjustment(
        editYardData.invoiceMilesAdjustment != null ? editYardData.invoiceMilesAdjustment : ""
      );
      setAcres(editYardData.acres != null ? editYardData.acres : "");
      setCapacity(editYardData.capacity != null ? editYardData.capacity : "");
      setShowOnApp(editYardData.showOnApp != null ? editYardData.showOnApp : "");
      setOnUsageReport(editYardData.onUsageReport != null ? editYardData.onUsageReport : "");
      setOpenSunday(editYardData.openSunday != null ? editYardData.openSunday : "");
      setOpenMonday(editYardData.openMonday != null ? editYardData.openMonday : "");
      setOpenTuesday(editYardData.openTuesday != null ? editYardData.openTuesday : "");
      setOpenWednesday(editYardData.openWednesday != null ? editYardData.openWednesday : "");
      setOpenThursday(editYardData.openThursday != null ? editYardData.openThursday : "");
      setOpenFriday(editYardData.openFriday != null ? editYardData.openFriday : "");
      setOpenSaturaday(editYardData.openSaturday != null ? editYardData.openSaturday : "");

      // On mount with an id, editYardData is the previous record and FormContent is refetching it,
      // so the printer lookups wait for the fresh record instead of running twice
      const isStaleRecord = isFirstRun.current && id;

      dispatch(setPrinterFK(editYardData.printerFK != null ? editYardData.printerFK : ""));
      //Set Yard Printer
      if (editYardData.printerFK && !isStaleRecord) {
        fetchYardPrinterValue(editYardData.printerFK);
      }

      dispatch(setBolPrinterFK(editYardData.bolPrinterFK ? editYardData.bolPrinterFK : ""));
      //Set Bol Printer
      if (editYardData.bolPrinterFK && !isStaleRecord) {
        setBolPrinterValue(editYardData.bolPrinterFK);
      }

      dispatch(setKioskPrinterFK(editYardData.kioskPrinterFK != null ? editYardData.kioskPrinterFK : ""));
      //Set Kiosk Printer
      if (editYardData.kioskPrinterFK && !isStaleRecord) {
        setKioskPrinterValue(editYardData.kioskPrinterFK);
      }
    }
    isFirstRun.current = false;
  }, [editYardData]);
  // to backend
  const settingsTabData = () => {
    dispatch(
      setYardFormData({
        outbound: outbound,
        reload: reload,
        hasPrinters: hasPrinter,
        hasOpener: hasOpener,
        driverDoorCode: driverDoorCode,
        yardGateCode: yardGateCode,
        driverMilesAdjustment: driverMilesAdjustment,
        invoiceMilesAdjustment: invoiceMilesAdjustment,
        acres: acres,
        capacity: capacity,
        showOnApp: showOnApp,
        onUsageReport: onUsageReport,
        openSunday: openSunday,
        openMonday: openMonday,
        openTuesday: openTuesday,
        openThursday: openThursday,
        openWednesday: openWednesday,
        openFriday: openFriday,
        openSaturday: openSaturday,
        printerFK: printerFK,
        bolPrinterFK: bolPrinterFK,
        kioskPrinterFK: kioskPrinterFK,
        accessGroup: accessGroup,
      })
    );
  };

  /**
   * Fetch all Printer
   * Used for Yard Printer Autocomplete
   */
  const fetchYardPrinter = (string) => {
    setYardprinterLoading(true);
    YardService.getAllYPrinter(string)
      .then((response) => {
        const data = response.data.content;
        const yardPrinterList = data?.map((yards) => ({ ...yards, description: yards.description?.trim() }));
        setYardprinterData(yardPrinterList);
        setYardprinterLoading(false);
      })
      .catch((err) => {
        setYardprinterLoading(false);
      });
  };
  /**
   * Fetch all Printer
   * Used for Bol Printer Autocomplete
   */
  const fetchBolPrinter = (string) => {
    setBolPrinterLoading(true);
    YardService.getAllYPrinter(string)
      .then((response) => {
        const data = response.data.content;
        const bolPrinterList = data?.map((bol) => ({ ...bol, description: bol.description?.trim() }));
        setBolPrinterData(bolPrinterList);
        setBolPrinterLoading(false);
      })
      .catch((err) => {
        setBolPrinterLoading(false);
      });
  };
  /**
   * Fetch all Printer
   * Used for Kiosk Printer Autocomplete
   */
  const fetchKioskPrinter = (string) => {
    setKioskPrinterLoading(true);
    YardService.getAllYPrinter(string)
      .then((response) => {
        const data = response.data.content;
        const kioskPrinterList = data?.map((kiosk) => ({ ...kiosk, description: kiosk.description?.trim() }));
        setKioskPrinterData(kioskPrinterList);
        setKioskPrinterLoading(false);
      })
      .catch((err) => {
        setKioskPrinterLoading(false);
      });
  };
  /**
   * used for Yard Printer selection Lookup
   */
  const handleYardPrinterLookup = (printer) => {
    dispatch(setPrinterInput(printer.description?.trim()));
    dispatch(setPrinterFK(printer.printerPK));
    dispatch(setShowPrinterLookup(false));
  };
  const handleYardPrinterLookupSelection = () => {
    dispatch(setShowPrinterLookup(true));
  };
  /**
   * used for Bol Printer selection Lookup
   */
  const handleBolPrinterLookup = (item) => {
    dispatch(setBolPrinterInput(item.description?.trim()));
    dispatch(setBolPrinterFK(item.printerPK));
    dispatch(setShowBolPrinterLookup(false));
  };
  const handleBolPrinterLookupSelection = () => {
    dispatch(setShowBolPrinterLookup(true));
  };

  /**
   * used for Kiosk Printer selection Lookup
   */
  const handleKioskPrinterLookup = (item) => {
    dispatch(setKioskPrinterInput(item.description?.trim()));
    dispatch(setKioskPrinterFK(item.printerPK));
    dispatch(setShowKioskPrinterLookup(false));
  };
  const handleKioskPrinterLookupSelection = () => {
    dispatch(setShowKioskPrinterLookup(true));
  };
  /**
   * used for Yard Printer Autocomplete
   */
  const handleYardPrinterSelection = (item) => {
    dispatch(setPrinterInput(item.description?.trim()));
    dispatch(setPrinterFK(item.printerPK));
  };
  /**
   * used for Bol Printer Autocomplete
   */

  const handleBolPrinterSelection = (item) => {
    dispatch(setBolPrinterInput(item.description?.trim()));
    dispatch(setBolPrinterFK(item.printerPK));
  };
  /**
   * used for Kiosk PrinterAutocomplete
   */

  const handleKioskPrinterSelection = (item) => {
    dispatch(setKioskPrinterInput(item.description?.trim()));
    dispatch(setKioskPrinterFK(item.printerPK));
  };
  //Setting printer values to null when hasPrinter=false
  useEffect(() => {
    if (hasPrinter === false) {
      dispatch(setPrinterInput(""));
      dispatch(setBolPrinterInput(""));
      dispatch(setKioskPrinterInput(""));
      dispatch(setBolPrinterFK(""));
      dispatch(setPrinterFK(""));
      dispatch(setKioskPrinterFK(""));
    }
  }, [hasPrinter]);

  useEffect(() => {
    if (hasOpener === true) {
      setYardGateCode("");
      setDriverDoorCode("");
    }
  }, [hasOpener, yardGateCode, driverDoorCode]);

  useEffect(() => {
    settingsTabData();
  }, [
    openMonday,
    openSaturday,
    openSunday,
    openFriday,
    openThursday,
    openTuesday,
    outbound,
    reload,
    showOnApp,
    hasOpener,
    hasPrinter,
    capacity,
    acres,
    driverMilesAdjustment,
    invoiceMilesAdjustment,
    driverDoorCode,
    yardGateCode,
    onUsageReport,
    openWednesday,
    printerFK,
    bolPrinterFK,
    kioskPrinterFK,
    accessGroup,
  ]);

  useEffect(() => {
    dispatch(setYardHasPrinter(hasPrinter));
    dispatch(setYardDriverMilesAdjustment(driverMilesAdjustment));
    dispatch(setYardInvoiceMilesAdjustment(invoiceMilesAdjustment));
    dispatch(setYardAcres(acres));
    dispatch(setYardCapacity(capacity));
    dispatch(setYardHasOpener(hasOpener));
  }, [hasPrinter, driverMilesAdjustment, invoiceMilesAdjustment, acres, capacity, hasOpener]);
  //Setting Outbound and Reload values
  useEffect(() => {
    if (id) {
      if (outbound) {
        setCheckboxValue("outbound");
      } else if (reload) {
        setCheckboxValue("reload");
      }
    }
  }, [outbound, reload]);

  useEffect(() => {
    if (checkboxValue === "outbound") {
      setOutbound(true);
      setReload(false);
    } else if (checkboxValue === "reload") {
      setReload(true);
      setOutbound(false);
    }
  }, [checkboxValue]);

  useEffect(() => {
    if (hasOpener === false) {
      dispatch(setAccessGroup(""));
    }
  }, [hasOpener]);

  //Validation
  const isNumber = (value) => {
    if (!value) return value;

    const number = value.replace(/[^\d]/g, "");

    if (value) return number;
  };
  const on = (values, setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };

  const validationSchema = yup.object({
    printerInput: yup.string().when(" hasPrinter", {
      is: true,
      then: yup.string().required(),
      otherwise: yup.string(),
    }),
    acres: yup.number().min(0).max(32767),
    capacity: yup.number().min(0).max(32767),
    invoiceMilesAdjustment: yup.number().min(0).max(32767),
    driverMilesAdjustment: yup.number().min(0).max(32767),
    accessGroup: yup.string().when("hasOpener", {
      is: true,
      then: yup.string().required(),
      otherwise: yup.string(),
    }),
  });
  return (
    <Formik
      initialValues={{
        printerInput,
        hasPrinter,
        acres,
        capacity,
        invoiceMilesAdjustment,
        driverMilesAdjustment,
        hasOpener,
        accessGroup,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        printerInput: true,
        hasPrinter: false,
        acres: true,
        capacity: true,
        invoiceMilesAdjustment: true,
        driverMilesAdjustment: true,
        hasOpener: false,
        accessGroup: true,
      }}
      on={on}
    >
      {(formik) => (
        <Form on={formik.handle}>
          <div className="p-15 w-100">
            <Row className="m-0 p-0">
              <Col sm={6} xs={6} className="ps-0">
                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">
                      {t("edit.yard.page.bol.tab.outbond")}
                    </Form.Label>
                  </Col>
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="outbound"
                      name="outbound"
                      disabled={viewDetail}
                      value="outbound"
                      checked={checkboxValue === "outbound"}
                      onChange={(e) => {
                        setCheckboxValue(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">
                      {t("edit.yard.page.bol.tab.reload")}
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="reload"
                      name="reload"
                      disabled={viewDetail}
                      value="reload"
                      checked={checkboxValue === "reload"}
                      onChange={(e) => {
                        setCheckboxValue(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group margin-box-5  m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">
                      {t("edit.yard.page.bol.tab.hasprinter")}
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="hasPrinter"
                      name="hasPrinter"
                      checked={hasPrinter}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setHasPrinter(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={6} xs={6}>
                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">
                      {t("edit.yard.page.tab.drivermilesAdjustment")}
                    </Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-60px">
                    <input
                      type="text"
                      id="driverMilesAdjustment"
                      name="driverMilesAdjustment"
                      maxLength={5}
                      value={driverMilesAdjustment}
                      disabled={viewDetail}
                      onInput={(e) => {
                        setDriverMilesAdjustment(isNumber(e.target.value));
                      }}
                      className={`${styles.formControl} ${
                        viewDetail
                          ? "black"
                          : formik.errors.driverMilesAdjustment === undefined &&
                              driverMilesAdjustment.length > 1
                            ? ""
                            : formik.errors.driverMilesAdjustment
                              ? "borderRed"
                              : ""
                      }`}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="margin-box-5 form-group m-t-6 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">
                      {t("edit.yard.page.tab.invoicemilesAdjustment")}
                    </Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0 w-60px">
                    <input
                      type="text"
                      id="invoiceMilesAdjustment"
                      name="invoiceMilesAdjustment"
                      maxLength={5}
                      value={invoiceMilesAdjustment}
                      disabled={viewDetail}
                      onInput={(e) => {
                        setInvoiceMilesAdjustment(isNumber(e.target.value));
                      }}
                      className={`${styles.formControl} ${
                        viewDetail
                          ? "black"
                          : formik.errors.invoiceMilesAdjustment === undefined &&
                              invoiceMilesAdjustment.length > 1
                            ? ""
                            : formik.errors.invoiceMilesAdjustment
                              ? "borderRed"
                              : ""
                      }`}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col xs={6}>
                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={` col-form-label  dealer-label`}>
                      {t("edit.yard.page.bol.yardprinter")}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className={`p-0 d-flex`}>
                    <AutoCompleteDropdown
                      arrayList={yardprinterData}
                      searchString={printerInput}
                      renderItemId={(item) => item.printerPK}
                      renderItemField={(item) => item.description}
                      handleSearchString={(string) => dispatch(setPrinterInput(string))}
                      fetchDataBySearchString={fetchYardPrinter}
                      onSelect={handleYardPrinterSelection}
                      selectedId={printerFK}
                      clearInputCallback={() => {
                        dispatch(setPrinterFK(""));
                      }}
                      className={`${
                        !viewDetail
                          ? hasPrinter
                            ? formik.errors.printerInput || (printerFK === "" && printerInput !== "")
                              ? "borderRed"
                              : "borderGreen"
                            : ""
                          : ""
                      }`}
                      loading={yardprinterLoading}
                      disabled={viewDetail || hasPrinter == false}
                    />

                    <LookupButton
                      onClick={handleYardPrinterLookupSelection}
                      disabled={viewDetail || hasPrinter == false}
                      // Printer lookup Modal @ Bottom
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={` col-form-label  dealer-label`}>
                      {t("edit.yard.page.bol.tab.bolprinter")}
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className={`p-0 d-flex`}>
                    {/*BolPrinter Autocomplete */}

                    <AutoCompleteDropdown
                      arrayList={bolPrinterData}
                      searchString={bolPrinterInput}
                      renderItemId={(item) => item.printerPK}
                      renderItemField={(item) => item.description}
                      handleSearchString={(string) => dispatch(setBolPrinterInput(string))}
                      fetchDataBySearchString={fetchBolPrinter}
                      onSelect={handleBolPrinterSelection}
                      selectedId={bolPrinterFK}
                      clearInputCallback={() => {
                        dispatch(setBolPrinterFK(""));
                      }}
                      disabled={viewDetail || hasPrinter == false}
                      className={`${bolPrinterFK === "" && bolPrinterInput !== "" ? "borderRed" : ""}`}
                      loading={bolPrinterLoading}
                    />

                    <LookupButton
                      onClick={handleBolPrinterLookupSelection}
                      disabled={viewDetail || hasPrinter == false}
                      // Printer lookup Modal @ Bottom
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group margin-box-5  m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={` col-form-label  dealer-label`}>
                      {t("edit.yard.page.bol.tab.kioskprinter")}
                    </Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className={`p-0 d-flex`}>
                    {/*Kiosk Printer Autocomplete */}
                    <AutoCompleteDropdown
                      arrayList={kioskPrinterData}
                      searchString={kioskPrinterInput}
                      renderItemId={(item) => item.printerPK}
                      renderItemField={(item) => item.description}
                      handleSearchString={(string) => dispatch(setKioskPrinterInput(string))}
                      fetchDataBySearchString={fetchKioskPrinter}
                      onSelect={handleKioskPrinterSelection}
                      selectedId={kioskPrinterFK}
                      clearInputCallback={() => {
                        dispatch(setKioskPrinterFK(""));
                      }}
                      disabled={viewDetail || hasPrinter == false}
                      className={`${kioskPrinterFK === "" && kioskPrinterInput !== "" ? "borderRed" : ""}`}
                      loading={kioskPrinterLoading}
                    />

                    <LookupButton
                      onClick={handleKioskPrinterLookupSelection}
                      disabled={viewDetail || hasPrinter == false}
                      // Printer lookup Modal @ Bottom
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col xs={6}>
                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">
                      {t("edit.yard.page.tab.unitCapacity")}
                    </Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0 w-60px">
                    <input
                      type="text"
                      id="capacity"
                      name="capacity"
                      maxLength={5}
                      value={capacity}
                      disabled={viewDetail}
                      onInput={(e) => {
                        setCapacity(isNumber(e.target.value));
                      }}
                      className={`${styles.formControl} ${
                        viewDetail
                          ? "black"
                          : formik.errors.capacity === undefined && capacity.length > 1
                            ? ""
                            : formik.errors.capacity
                              ? "borderRed"
                              : ""
                      }`}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="margin-box-5 form-group m-t-6 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">
                      {t("edit.yard.page.tab.acres")}
                    </Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0 w-60px">
                    <input
                      type="text"
                      id="acres"
                      name="acres"
                      maxLength={5}
                      value={acres}
                      disabled={viewDetail}
                      onInput={(e) => {
                        setAcres(isNumber(e.target.value));
                      }}
                      // eslint-disable-next-line react/jsx-no-duplicate-props
                      className={`${styles.formControl} ${
                        viewDetail
                          ? "black"
                          : formik.errors.acres === undefined && acres.length > 1
                            ? ""
                            : formik.errors.acres
                              ? "borderRed"
                              : ""
                      }`}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={6}>
                <Form.Group className="form-group m-t-15 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">
                      {t("edit.yard.page.bol.tab.hasopener")}
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="hasOpener"
                      name="hasOpener"
                      checked={hasOpener}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setHasOpener(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Access Group</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      className={`${styles.formControl} ${
                        !viewDetail
                          ? hasOpener
                            ? formik.errors.accessGroup || accessGroup >= 2147483648
                              ? "borderRed"
                              : "borderGreen"
                            : ""
                          : ""
                      }`}
                      id=" accessGroup"
                      name=" accessGroup"
                      maxLength={10}
                      value={accessGroup}
                      disabled={viewDetail || !hasOpener}
                      onInput={(e) => {
                        dispatch(setAccessGroup(isNumber(e.target.value)));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">
                      {t("edit.yard.page.bol.tab.doorLockCode")}
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      className={styles.formControl}
                      id="driverDoorCode"
                      name="driverDoorCode"
                      maxLength={6}
                      value={driverDoorCode}
                      disabled={viewDetail || hasOpener === true}
                      onInput={(e) => {
                        setDriverDoorCode(e.target.value.replace(/^\s+/g, ""));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="margin-box-5 form-group m-t-6 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">
                      {t("edit.yard.page.bol.tab.gateLockCode")}
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="text"
                      className={styles.formControl}
                      id="yardGateCode"
                      name="yardGateCode"
                      maxLength={6}
                      value={yardGateCode}
                      disabled={viewDetail || hasOpener === true}
                      onInput={(e) => {
                        setYardGateCode(e.target.value.replace(/^\s+/g, ""));
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">
                      {t("edit.yard.page.tab.showOnApp")}
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="showOnApp"
                      name="showOnApp"
                      checked={showOnApp}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setShowOnApp(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">
                      {t("edit.yard.page.tab.onUsageReport")}
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      id="onUsageReport"
                      name="onUsageReport"
                      checked={onUsageReport}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setOnUsageReport(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group className="form-group m-t-15 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                <div className="p-0" style={{ width: "143px" }}>
                  <Form.Label className=" col-form-label dealer-label">
                    {t("edit.yard.page.bol.tab.yardOpen")}
                  </Form.Label>
                </div>

                <Col className="p-0 d-flex ">
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      className=" me-2 p-0 "
                      id="openSunday"
                      name="openSunday"
                      checked={openSunday}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setOpenSunday(e.target.checked);
                      }}
                    />
                    <label htmlFor="" className="ms-0">
                      {" "}
                      {t("edit.yard.page.tab.sunday")}
                    </label>
                  </div>
                  <div className="ms-4 d-flex align-items-center">
                    <input
                      type="checkbox"
                      className=" me-2 p-0 "
                      id="openMonday"
                      name="openMonday"
                      checked={openMonday}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setOpenMonday(e.target.checked);
                      }}
                    />
                    <label htmlFor="" className="ms-0">
                      {" "}
                      {t("edit.yard.page.tab.monday")}
                    </label>
                  </div>

                  <div className="ms-4 d-flex align-items-center">
                    <input
                      type="checkbox"
                      className=" me-2 p-0 "
                      id="openTuesday"
                      name="openTuesday"
                      checked={openTuesday}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setOpenTuesday(e.target.checked);
                      }}
                    />
                    <label htmlFor="" className="ms-0">
                      {" "}
                      {t("edit.yard.page.tab.tuesday")}
                    </label>
                  </div>

                  <div className="ms-4 d-flex align-items-center">
                    <input
                      type="checkbox"
                      className=" me-2 p-0 "
                      id="openWednesday"
                      name="openWednesday"
                      checked={openWednesday}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setOpenWednesday(e.target.checked);
                      }}
                    />
                    <label htmlFor="" className="ms-0">
                      {" "}
                      {t("edit.yard.page.tab.wednesday")}
                    </label>
                  </div>
                  <div className="ms-4 d-flex align-items-center">
                    <input
                      type="checkbox"
                      className=" me-2 p-0 "
                      id="openThursday"
                      name="openThursday"
                      checked={openThursday}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setOpenThursday(e.target.checked);
                      }}
                    />
                    <label htmlFor="" className="ms-0">
                      {" "}
                      {t("edit.yard.page.tab.thursday")}
                    </label>
                  </div>
                  <div className="ms-4 d-flex align-items-center">
                    <input
                      type="checkbox"
                      className=" me-2 p-0 "
                      id="openFriday"
                      name="openFriday"
                      checked={openFriday}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setOpenFriday(e.target.checked);
                      }}
                    />
                    <label htmlFor="" className="ms-0">
                      {" "}
                      {t("edit.yard.page.tab.friday")}
                    </label>
                  </div>
                  <div className="ms-4 d-flex align-items-center">
                    <input
                      type="checkbox"
                      className=" me-2 p-0 "
                      id="openSaturday"
                      name="openSaturday"
                      checked={openSaturday}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setOpenSaturaday(e.target.checked);
                      }}
                    />
                    <label htmlFor="" className="ms-0">
                      {t("edit.yard.page.tab.saturday")}
                    </label>
                  </div>
                </Col>
              </Form.Group>
            </Row>
          </div>
          {/*Printer Lookup Modal */}
          <PrinterLookup
            show={showPrinterLookup}
            onHide={() => dispatch(setShowPrinterLookup(false))}
            renderItemId={(printer) => printer.printerPK}
            handleLookupSelection={handleYardPrinterLookup}
            MaintenanceProgram
          />
          <PrinterLookup
            show={showBolPrinterLookup}
            renderItemId={(printer) => printer.printerPK}
            onHide={() => dispatch(setShowBolPrinterLookup(false))}
            handleLookupSelection={handleBolPrinterLookup}
            MaintenanceProgram
          />
          <PrinterLookup
            show={showKioskPrinterLookup}
            onHide={() => dispatch(setShowKioskPrinterLookup(false))}
            renderItemId={(printer) => printer.printerPK}
            handleLookupSelection={handleKioskPrinterLookup}
            MaintenanceProgram
          />
        </Form>
      )}
    </Formik>
  );
}

export default Settings;
