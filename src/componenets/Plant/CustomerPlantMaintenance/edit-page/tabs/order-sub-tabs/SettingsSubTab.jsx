/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlantFormData,
  setOrderSettingsFAXBolAtOrderEntry,
  setOrderSettingsFAXbolatOrderEntryDPU,
  setOrderSettingsFAXBOLAtDispatch,
  setOrderSettingsFAXBOLAtDispatchDPU,
  setOrderSettingsBOLFaxNumber,
  setOrderSettingsPrintintBOLAtAlternateYard,
  setShowShuttleCityLookup,
  setShuttleCityInput,
  setShuttleCityFK,
  setYardLookup,
  setYardInput,
  setShowAlternateYardLookup,
  setAlternateYardInput,
  setAlternateYardFK,
  setSettingYardFK,
  setOrderEmailShuttleDelays,
} from "../../../../../../redux/CustomerPlantMaintenanceSlice";
import {
  setLoading,
  setYardsData,
  setTotalElements as setTotalElementsYardLookup,
  setTotalPages as setTotalPagesYardLookup,
} from "../../../../../../redux/LookupScreens/YardLookupSlice";

import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import CustomerPlantMaintenanceService from "../../../../../../services/CustomerPlantMaintenanceService";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import ShuttleCityLookup from "../../../../../LookupScreens/ShuttleCity/ShuttleCityLookup";
import ShuttleCitysService from "../../../../../../services/ShuttleCitysService";
import YardLookup from "../../../../../LookupScreens/Yard/YardLookup";
import LookupButton from "../../../../../common/LookupButton";
import YardService from "../../../../../../services/YardService";
import { useParams } from "react-router-dom";
const SettingsSubTab = () => {
  const params = useParams();
  const [emailBOLAtOrderEntry, setEmailBOLAtOrderEntry] = useState("");
  const [emailBOLAtOrderEntryDPU, setEmailBOLAtOrderEntryDPU] = useState("");
  const [emailBOLAtDispatch, setEmailBOLAtDispatch] = useState("");
  const [emailBOLAtDispatchDPU, setEmailBOLAtDispatchDPU] = useState("");
  const [emailBOLAddSignature, setEmailBOLAddSignature] = useState("");
  const [batchEmailBOLAtOrderEntry, setBatchEmailBOLAtOrderEntry] = useState("");
  const [batchEmailBOLDaily, setBatchEmailBOLDaily] = useState("");
  const [faxBolAtOrderEntry, setFaxBolAtOrderEntry] = useState("");
  const [faxbolatOrderEntryDPU, setFaxBolatOrderEntryDPU] = useState("");
  const [faxBOLAtDispatch, setFaxBOLAtDispatch] = useState("");
  const [faxBOLAtDispatchDPU, setFaxBOLAtDispatchDPU] = useState("");
  const [bolFaxNumber, setBolFaxNumber] = useState("");
  const [selectShuttleCity, setSelectShuttleCity] = useState("");
  const [selectYard, setSelectYard] = useState("");
  const [emailShuttleOrderEntry, setEmailShuttleOrderEntry] = useState("");
  const [printBOLAtOrderEntry, setPrintBOLAtOrderEntry] = useState("");
  const [printBOLAtOrderEntryDPU, setPrintBOLAtOrderEntryDPU] = useState("");
  const [print3PartBOL, setPrint3PartBOL] = useState("");
  const [printBOLAtAlternateYard, setPrintBOLAtAlternateYard] = useState("");
  const [shuttleCity, setShuttleCity] = useState("");
  const [yard, setYard] = useState("");
  const [alternateYardForBOL, setAlternateYardForBOL] = useState("");
  const [shuttleCityData, setshuttleCityData] = useState([]);
  const [yardData, setYardData] = useState([]);
  const [alternateYardData, setAlternateYardData] = useState([]);
  const [emailShuttleDelays, setEmailShuttleDelays] = useState("");
  const [allEmailShuttleDelays, setAllEmailShuttleDelays] = useState([]);
  const plantPK = params.id;
  const incompletePlantPK = params.incompleteplantPK;
  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);
  const editPlantData = useSelector((state) => state.customerPlantmaintanceReducer.editPlantData);
  const showShuttleCityLookup = useSelector(
    (state) => state.customerPlantmaintanceReducer.showShuttleCityLookup
  );
  const shuttleCityInput = useSelector((state) => state.customerPlantmaintanceReducer.shuttleCityInput);
  const shuttleCityFK = useSelector((state) => state.customerPlantmaintanceReducer.shuttleCityFK);
  const yardLookup = useSelector((state) => state.customerPlantmaintanceReducer.yardLookup);
  const showAlternateYardLookup = useSelector(
    (state) => state.customerPlantmaintanceReducer.showAlternateYardLookup
  );
  const yardInput = useSelector((state) => state.customerPlantmaintanceReducer.yardInput);
  const settingYardFK = useSelector((state) => state.customerPlantmaintanceReducer.settingYardFK);
  const alternateYardFK = useSelector((state) => state.customerPlantmaintanceReducer.alternateYardFK);
  const alternateYardInput = useSelector((state) => state.customerPlantmaintanceReducer.alternateYardInput);

  //yard lookup
  const pageNumberYardLookup = useSelector((state) => state.yardLookupReducer.pageNumberYardLookup);
  let yardSortFlag = useSelector((state) => state.yardLookupReducer.normalSortFlag);
  let yardSortValue = useSelector((state) => state.yardLookupReducer.normalSortValue);
  const searchTermsYard = useSelector((state) => state.yardLookupReducer.searchTerms);
  const selectedSearchCriteriaYard = useSelector((state) => state.yardLookupReducer.selectedSearchCriteria);
  const outbound = useSelector((state) => state.customerPlantmaintanceReducer.outbound);
  const [shuttleCityLoading, setShuttleCityLoading] = useState(false);
  const [yardLoading, setYardLoading] = useState(false);
  const [alternateYardLoading, setAlternateYardLoading] = useState(false);

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setBolFaxNumber(formattedPhoneNumber);
  };
  const dispatch = useDispatch();
  //set Shuttlecity value
  const setShuttleCityValue = (id) => {
    if (id != null) {
      ShuttleCitysService.getShuttleCitysById(id)
        .then((response) => {
          const { data } = response;
          dispatch(setShuttleCityInput(data.city?.trim()));
        })
        .catch((err) => {});
    } else {
      dispatch(setShuttleCityInput(""));
    }
  };
  //set Yard value
  const setYardValue = (id) => {
    if (id != null) {
      YardService.getYardById(id)
        .then((response) => {
          const { data } = response;
          dispatch(setYardInput(data.description?.trim()));
        })
        .catch((err) => {});
    } else {
      dispatch(setYardInput(""));
    }
  };
  //set Alternateyard value
  const setAlternateYardValue = (id) => {
    if (id != null) {
      YardService.getYardById(id)
        .then((response) => {
          const { data } = response;
          dispatch(setAlternateYardInput(data.description?.trim()));
        })
        .catch((err) => {});
    } else {
      dispatch(setAlternateYardInput(""));
    }
  };
  useEffect(() => {
    if (editPlantData != null) {
      setEmailBOLAtOrderEntry(
        editPlantData.emailBOLAtOrderEntry != null ? editPlantData.emailBOLAtOrderEntry : ""
      );

      setEmailBOLAtOrderEntryDPU(
        editPlantData.emailBOLAtOrderEntryDPU != null ? editPlantData.emailBOLAtOrderEntryDPU : ""
      );
      setEmailBOLAtDispatch(editPlantData.emailBOLAtDispatch != null ? editPlantData.emailBOLAtDispatch : "");
      setEmailBOLAtDispatchDPU(
        editPlantData.emailBOLAtDispatchDPU != null ? editPlantData.emailBOLAtDispatchDPU : ""
      );
      setEmailBOLAddSignature(
        editPlantData.emailBOLAddSignature != null ? editPlantData.emailBOLAddSignature : ""
      );
      setBatchEmailBOLAtOrderEntry(
        editPlantData.batchEmailBOLAtOrderEntry != null ? editPlantData.batchEmailBOLAtOrderEntry : ""
      );
      setBatchEmailBOLDaily(editPlantData.batchEmailBOLDaily != null ? editPlantData.batchEmailBOLDaily : "");
      setFaxBolAtOrderEntry(editPlantData.faxBolAtOrderEntry != null ? editPlantData.faxBolAtOrderEntry : "");
      setFaxBolatOrderEntryDPU(
        editPlantData.faxbolatOrderEntryDPU != null ? editPlantData.faxbolatOrderEntryDPU : ""
      );
      setFaxBOLAtDispatch(editPlantData.faxBOLAtDispatch != null ? editPlantData.faxBOLAtDispatch : "");
      setFaxBOLAtDispatchDPU(
        editPlantData.faxBOLAtDispatchDPU != null ? editPlantData.faxBOLAtDispatchDPU : ""
      );
      setBolFaxNumber(
        editPlantData.bolFaxNumber != null ? formatPhoneNumber(editPlantData.bolFaxNumber) : ""
      );
      setSelectShuttleCity(editPlantData.selectShuttleCity != null ? editPlantData.selectShuttleCity : "");
      setShuttleCity(editPlantData.shuttleCityFK != null ? editPlantData.shuttleCityFK : "");
      //set value for ShuttleCity
      setShuttleCityValue(editPlantData.shuttleCityFK);
      setSelectYard(editPlantData.selectYard != null ? editPlantData.selectYard : "");

      setYard(editPlantData.yardFK != null ? editPlantData.yardFK : "");
      //set value for Yard
      setYardValue(editPlantData.yardFK);
      setEmailShuttleOrderEntry(
        editPlantData.emailShuttleOrderEntry != null ? editPlantData.emailShuttleOrderEntry : ""
      );
      setPrintBOLAtOrderEntry(
        editPlantData.printBOLAtOrderEntry != null ? editPlantData.printBOLAtOrderEntry : ""
      );
      setPrintBOLAtOrderEntryDPU(
        editPlantData.printBOLAtOrderEntryDPU != null ? editPlantData.printBOLAtOrderEntryDPU : ""
      );
      setPrint3PartBOL(editPlantData.print3PartBOL != null ? editPlantData.print3PartBOL : "");
      setPrintBOLAtAlternateYard(
        editPlantData.printBOLAtAlternateYard != null ? editPlantData.printBOLAtAlternateYard : ""
      );
      setAlternateYardForBOL(editPlantData.alternateYardFK != null ? editPlantData.alternateYardFK : "");
      setEmailShuttleDelays(editPlantData.emailShuttleDelays != null ? editPlantData.emailShuttleDelays : "");
      //set value for Alternate Yard
      setAlternateYardValue(editPlantData.alternateYardFK);
    }
  }, [editPlantData, viewDetail]);

  const ordersetttingsubTab = () => {
    dispatch(
      setPlantFormData({
        emailBOLAtOrderEntry: emailBOLAtOrderEntry,
        emailBOLAtOrderEntryDPU: emailBOLAtOrderEntryDPU,
        emailBOLAtDispatch: emailBOLAtDispatch,
        emailBOLAtDispatchDPU: emailBOLAtDispatchDPU,
        emailBOLAddSignature: emailBOLAddSignature,
        batchEmailBOLAtOrderEntry: batchEmailBOLAtOrderEntry,
        batchEmailBOLDaily: batchEmailBOLDaily,
        faxBolAtOrderEntry: faxBolAtOrderEntry,
        faxbolatOrderEntryDPU: faxbolatOrderEntryDPU,
        faxBOLAtDispatch: faxBOLAtDispatch,
        faxBOLAtDispatchDPU: faxBOLAtDispatchDPU,
        bolFaxNumber: bolFaxNumber.replace(/\s+/g, ""),
        selectShuttleCity: selectShuttleCity,
        selectYard: selectYard,
        shuttleCityFK: shuttleCity,
        yardFK: yard,
        alternateYardFK: alternateYardForBOL,
        emailShuttleOrderEntry: emailShuttleOrderEntry,
        printBOLAtOrderEntry: printBOLAtOrderEntry,
        printBOLAtOrderEntryDPU: printBOLAtOrderEntryDPU,
        print3PartBOL: print3PartBOL,
        printBOLAtAlternateYard: printBOLAtAlternateYard,
        emailShuttleDelays: emailShuttleDelays,
      })
    );
  };

  /**
   *ShuttleCity Lookup
   */
  const handleShuttleCityLookup = () => {
    dispatch(setShowShuttleCityLookup(true));
  };
  const handleShuttleCityLookupSelection = (shuttleCity) => {
    dispatch(setShowShuttleCityLookup(false));
    dispatch(setShuttleCityInput(shuttleCity.city?.trim()));
    setShuttleCity(shuttleCity.shuttleCityPK);
  };
  /**
   *ShuttleCity Autocomplete
   */
  const fetchShuttleCityByName = (string) => {
    setShuttleCityLoading(true);
    CustomerPlantMaintenanceService.getShuttleCity(string, outbound)
      .then((response) => {
        const data = response.data.content;
        const cityList = data?.map((city) => ({
          ...city,
          city: city.city?.trim(),
        }));
        setshuttleCityData(cityList);
      })
      .finally(() => setShuttleCityLoading(false));
  };

  const handleShutlecitySelectionAutocomplete = (city) => {
    dispatch(setShuttleCityInput(city.city?.trim()));
    setShuttleCity(city.shuttleCityPK);
  };

  /**
   *Yard Lookup
   */
  const handleYardLookup = () => {
    dispatch(setYardLookup(true));
  };
  const handleYardSelectionLookup = (yard) => {
    dispatch(setYardLookup(false));
    dispatch(setYardInput(yard.description?.trim()));
    setYard(yard.yardPK);
  };
  /**
   *Yard Autocomplete
   */

  const fetchYard = (string) => {
    setYardLoading(true);
    CustomerPlantMaintenanceService.getAllYardsData(string).then((response) => {
      const data = response.data.content;
      const yardList = data?.map((yard) => ({
        ...yard,
        description: yard.description?.trim(),
      }));
      setYardData(yardList);
      setYardLoading(false);
    });
  };

  const handleYardAutocomplete = (item) => {
    dispatch(setYardInput(item.description?.trim()));
    setYard(item.yardPK);
  };

  /**
   *Alternate Yard Lookup
   */
  const handleAlternateYardSelectionLookup = (yard) => {
    dispatch(setShowAlternateYardLookup(false));
    dispatch(setAlternateYardInput(yard.description?.trim()));
    setAlternateYardForBOL(yard.yardPK);
  };
  const handleAlternateYardLookup = () => {
    dispatch(setShowAlternateYardLookup(true));
  };
  /**
   *Alternate Yard Autocomplete
   */

  const fetchAlternateYard = (string) => {
    setAlternateYardLoading(true);
    CustomerPlantMaintenanceService.getAllYardsWithPrinters(string).then((response) => {
      const data = response.data.content;
      const alternateYardList = data?.map((yards) => ({
        ...yards,
        description: yards.description?.trim(),
      }));
      setAlternateYardData(alternateYardList);
      setAlternateYardLoading(false);
    });
  };

  const handlAlternateYardAutocomplete = (yard) => {
    dispatch(setAlternateYardInput(yard.description?.trim()));
    setAlternateYardForBOL(yard.yardPK);
  };

  //Yard lookup -(yards having printers)-(Fieldname:alternate yard for BOL)
  const getYardLookupValue = () => {
    CustomerPlantMaintenanceService.getYardsForLookupWithPrinters(
      selectedSearchCriteriaYard,
      searchTermsYard,
      pageNumberYardLookup,
      yardSortValue,
      yardSortFlag
    )

      .then((response) => {
        const { data } = response;
        if (data.content === undefined) {
          dispatch(setYardsData([]));
        } else dispatch(setYardsData(data.content));

        dispatch(setTotalElementsYardLookup(data.totalElements));
        dispatch(setTotalPagesYardLookup(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  //form data
  useEffect(() => {
    ordersetttingsubTab();
  }, [
    emailBOLAtOrderEntry,
    emailBOLAtOrderEntryDPU,
    emailBOLAtDispatch,
    emailBOLAtDispatchDPU,
    emailBOLAddSignature,
    batchEmailBOLAtOrderEntry,
    batchEmailBOLDaily,
    faxBolAtOrderEntry,
    faxbolatOrderEntryDPU,
    faxBOLAtDispatch,
    faxBOLAtDispatchDPU,
    bolFaxNumber,
    selectShuttleCity,
    selectYard,
    emailShuttleOrderEntry,
    printBOLAtOrderEntry,
    printBOLAtOrderEntryDPU,
    print3PartBOL,
    printBOLAtAlternateYard,
    shuttleCity,
    alternateYardForBOL,
    yard,
    emailShuttleDelays,
  ]);

  useEffect(() => {
    dispatch(setOrderSettingsFAXBolAtOrderEntry(faxBolAtOrderEntry));
    dispatch(setOrderSettingsFAXbolatOrderEntryDPU(faxbolatOrderEntryDPU));
    dispatch(setOrderSettingsFAXBOLAtDispatch(faxBOLAtDispatch));
    dispatch(setOrderSettingsFAXBOLAtDispatchDPU(faxBOLAtDispatchDPU));
    dispatch(setOrderSettingsBOLFaxNumber(bolFaxNumber));
    dispatch(setOrderSettingsPrintintBOLAtAlternateYard(printBOLAtAlternateYard));
    dispatch(setShuttleCityFK(shuttleCity));
    dispatch(setSettingYardFK(yard));
    dispatch(setAlternateYardFK(alternateYardForBOL));
    dispatch(setOrderEmailShuttleDelays(emailShuttleDelays));
  }, [
    faxBolAtOrderEntry,
    bolFaxNumber,
    faxBOLAtDispatch,
    faxBOLAtDispatchDPU,
    faxbolatOrderEntryDPU,
    printBOLAtAlternateYard,
    shuttleCity,
    alternateYardForBOL,
    yard,
    emailShuttleDelays,
  ]);
  //reset values

  useEffect(() => {
    if (
      faxBOLAtDispatch === false &&
      faxBOLAtDispatchDPU === false &&
      faxBolAtOrderEntry === false &&
      faxbolatOrderEntryDPU === false
    ) {
      setBolFaxNumber("");
    }
  }, [faxBOLAtDispatch, faxBOLAtDispatchDPU, faxBolAtOrderEntry, faxbolatOrderEntryDPU]);

  useEffect(() => {
    if (printBOLAtOrderEntry === false) {
      setPrint3PartBOL(false);
      setPrintBOLAtAlternateYard(false);
      dispatch(setAlternateYardInput(""));
      setAlternateYardForBOL("");
    }
  }, [printBOLAtOrderEntry]);

  useEffect(() => {
    if (printBOLAtAlternateYard === false) {
      dispatch(setAlternateYardInput(""));
      setAlternateYardForBOL("");
    }
  }, [printBOLAtAlternateYard]);

  // //valiadtion

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const validationSchema = yup.object({
    faxBolAtOrderEntry: yup.boolean(),
    faxBOLAtDispatchDPU: yup.boolean(),
    faxbolatOrderEntryDPU: yup.boolean(),
    faxBOLAtDispatch: yup.boolean(),

    bolFaxNumber: yup
      .string()
      .when(["faxBOLAtDispatchDPU", "faxBOLAtDispatch", "faxBolAtOrderEntry", "faxbolatOrderEntryDPU"], {
        is: (faxBOLAtDispatchDPU, faxBOLAtDispatch, faxBolAtOrderEntry, faxbolatOrderEntryDPU) => {
          return faxBOLAtDispatchDPU || faxBOLAtDispatch || faxBolAtOrderEntry || faxbolatOrderEntryDPU;
        },
        then: yup.string().matches(phoneRegex).required(),
        otherwise: yup.string().matches(phoneRegex),
      }),
    alternateYardInput: yup.string().when("printBOLAtAlternateYard", {
      is: true,
      then: yup.string().required(),
      otherwise: yup.string(),
    }),
  });

  /**
   *Used for get mailShuttleDelays Values
   */
  const getEmailShuttleDelays = () => {
    CustomerPlantMaintenanceService.getEmailShuttleDelays()
      .then((response) => {
        const data = response.data;

        setAllEmailShuttleDelays(data);

        if (!plantPK && !incompletePlantPK) {
          const noneOption = data.find((item) => item.emailShuttleDelaysName === "None");

          if (noneOption) {
            setEmailShuttleDelays(noneOption.emailShuttleDelaysID);
          }
        } else {
          setEmailShuttleDelays("");
        }
      })
      .catch((error) => {
        console.error("Error fetching email shuttle delays:", error);
      });
  };

  useEffect(() => {
    getEmailShuttleDelays();
  }, []);

  return (
    <Formik
      initialValues={{
        faxBolAtOrderEntry,
        faxbolatOrderEntryDPU,
        faxBOLAtDispatch,
        faxBOLAtDispatchDPU,
        bolFaxNumber,
        alternateYardInput,
        printBOLAtAlternateYard,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        faxBolAtOrderEntry: false,
        faxbolatOrderEntryDPU: false,
        faxBOLAtDispatch: false,
        faxBOLAtDispatchDPU: false,
        bolFaxNumber: true,
        alternateYardInput: true,
        printBOLAtAlternateYard: false,
      }}
    >
      {(formik) => (
        <Form>
          <div className="p-15 w-100">
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                <Form.Group className="mt-3  align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.emailBolAtOrderEntry")}
                    </Form.Label>
                  </Col>
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="memailBOLAtOrderEntryr"
                      value={emailBOLAtOrderEntry}
                      checked={emailBOLAtOrderEntry}
                      disabled={viewDetail}
                      onChange={(e) => setEmailBOLAtOrderEntry(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.emailBolAtOrderEntryDpu")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="emailBOLAtOrderEntryDPU"
                      value={emailBOLAtOrderEntryDPU}
                      checked={emailBOLAtOrderEntryDPU}
                      disabled={viewDetail}
                      onChange={(e) => setEmailBOLAtOrderEntryDPU(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.emailBolAtDispatch")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="emailBOLAtDispatch"
                      value={emailBOLAtDispatch}
                      checked={emailBOLAtDispatch}
                      disabled={viewDetail}
                      onChange={(e) => setEmailBOLAtDispatch(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.emailBolAtDispatchDpu")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="emailBOLAtDispatchDPU"
                      value={emailBOLAtDispatchDPU}
                      checked={emailBOLAtDispatchDPU}
                      disabled={viewDetail}
                      onChange={(e) => setEmailBOLAtDispatchDPU(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.emailedBolAddSignature")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="emailBOLAddSignature"
                      value={emailBOLAddSignature}
                      checked={emailBOLAddSignature}
                      disabled={viewDetail}
                      onChange={(e) => setEmailBOLAddSignature(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.batchEmailBolAtOrderEntry")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="batchEmailBOLAtOrderEntry"
                      value={batchEmailBOLAtOrderEntry}
                      checked={batchEmailBOLAtOrderEntry}
                      disabled={viewDetail}
                      onChange={(e) => setBatchEmailBOLAtOrderEntry(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.batchEmailBolDaily")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="batchEmailBOLDaily"
                      value={batchEmailBOLDaily}
                      checked={batchEmailBOLDaily}
                      disabled={viewDetail}
                      onChange={(e) => setBatchEmailBOLDaily(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.faxBOLAtOrderEntry")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
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
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.faxBOLAtOrderEntryDPU")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="faxbolatOrderEntryDPU"
                      value={faxbolatOrderEntryDPU}
                      checked={faxbolatOrderEntryDPU}
                      disabled={viewDetail}
                      onChange={(e) => setFaxBolatOrderEntryDPU(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.faxBOLAtDispatch")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="faxBOLAtDispatchr"
                      value={faxBOLAtDispatch}
                      checked={faxBOLAtDispatch}
                      disabled={viewDetail}
                      onChange={(e) => setFaxBOLAtDispatch(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.faxBOLAtDispatchDPU")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="faxBOLAtDispatchDPU"
                      value={faxBOLAtDispatchDPU}
                      checked={faxBOLAtDispatchDPU}
                      disabled={viewDetail}
                      onChange={(e) => setFaxBOLAtDispatchDPU(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="margin-box-1 m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.BOLAFAXNumber")}
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-92px">
                    <input
                      className="customFormControl"
                      style={{
                        border: viewDetail
                          ? "black 1px solid"
                          : (faxBOLAtDispatch === true ||
                                faxBOLAtDispatchDPU === true ||
                                faxBolAtOrderEntry === true ||
                                faxbolatOrderEntryDPU === true) &&
                              bolFaxNumber !== "" &&
                              String(bolFaxNumber).match(phoneRegex)
                            ? "green 2px solid"
                            : (!String(bolFaxNumber).match(phoneRegex) && bolFaxNumber !== "") ||
                                faxBOLAtDispatch === true ||
                                faxBOLAtDispatchDPU === true ||
                                faxBolAtOrderEntry === true ||
                                faxbolatOrderEntryDPU === true
                              ? "red 2px solid"
                              : "black 1px solid",
                      }}
                      id="bolFaxNumber"
                      name="bolFaxNumber"
                      type="bolFaxNumber"
                      value={bolFaxNumber}
                      onChange={(e) => faxFormatHandler(e)}
                      maxLength={14}
                      disabled={viewDetail}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      onInput={(e) => {
                        formik.handleChange(e);
                        setBolFaxNumber(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={6} md={6} xs={6} className="ps-lg-5">
                <Form.Group className="mt-1 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.selectShuttleCity")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="selectShuttleCity"
                      value={selectShuttleCity}
                      checked={selectShuttleCity}
                      disabled={viewDetail}
                      onChange={(e) => setSelectShuttleCity(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.shuttleCity")}
                    </Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className={`p-0 d-flex`}>
                    <AutoCompleteDropdown
                      arrayList={shuttleCityData}
                      searchString={shuttleCityInput}
                      renderItemId={(item) => item.shuttleCityPK}
                      renderItemField={(item) => item.city}
                      handleSearchString={(string) => dispatch(setShuttleCityInput(string))}
                      fetchDataBySearchString={fetchShuttleCityByName}
                      onSelect={handleShutlecitySelectionAutocomplete}
                      selectedId={shuttleCity}
                      clearInputCallback={() => {
                        setShuttleCity("");
                      }}
                      disabled={viewDetail}
                      loading={shuttleCityLoading}
                      className={`${shuttleCity === "" && shuttleCityInput !== "" ? "borderRed" : ""}`}
                    />

                    <LookupButton
                      disabled={viewDetail}
                      onClick={handleShuttleCityLookup}
                      // Shuttle City Lookup Modal @ Bottom
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.shuttleYard")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="selectYard"
                      value={selectYard}
                      checked={selectYard}
                      disabled={viewDetail}
                      onChange={(e) => setSelectYard(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.yard")}
                    </Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className={`p-0 d-flex`}>
                    <AutoCompleteDropdown
                      arrayList={yardData}
                      searchString={yardInput}
                      renderItemId={(item) => item.yardPK}
                      renderItemField={(item) => item.description}
                      handleSearchString={(string) => dispatch(setYardInput(string))}
                      fetchDataBySearchString={fetchYard}
                      onSelect={handleYardAutocomplete}
                      selectedId={yard}
                      clearInputCallback={() => {
                        setYard("");
                      }}
                      disabled={viewDetail}
                      loading={yardLoading}
                      className={`${yard == "" && yardInput !== "" ? "borderRed" : ""}`}
                    />

                    <LookupButton
                      disabled={viewDetail}
                      onClick={handleYardLookup}
                      //Yard Lookup Modal @ Bottom
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.emailShuttle")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="emailShuttleOrderEntry"
                      value={emailShuttleOrderEntry}
                      checked={emailShuttleOrderEntry}
                      disabled={viewDetail}
                      onChange={(e) => setEmailShuttleOrderEntry(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Email Shuttle Delays</Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Select
                      className={`customFormControl`}
                      name="creditCardayments"
                      disabled={viewDetail}
                      value={emailShuttleDelays}
                      onChange={(e) => {
                        setEmailShuttleDelays(e.target.value);
                      }}
                    >
                      {/* <option value="">--Select--</option> */}
                      {allEmailShuttleDelays?.map((item) => (
                        <option key={item.emailShuttleDelaysID} value={item.emailShuttleDelaysID}>
                          {item.emailShuttleDelaysName}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group className="mt-5  align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.printBOLAtOrderEntry")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="printBOLAtOrderEntry"
                      value={printBOLAtOrderEntry}
                      checked={printBOLAtOrderEntry}
                      disabled={viewDetail}
                      onChange={(e) => setPrintBOLAtOrderEntry(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.printBOLAtOrderEntryDPU")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="printBOLAtOrderEntryDPU"
                      value={printBOLAtOrderEntryDPU}
                      checked={printBOLAtOrderEntryDPU}
                      disabled={viewDetail}
                      onChange={(e) => setPrintBOLAtOrderEntryDPU(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.print3PartBOL")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="print3PartBOL"
                      value={print3PartBOL}
                      checked={print3PartBOL}
                      disabled={
                        viewDetail || printBOLAtOrderEntry !== true || printBOLAtAlternateYard == true
                      }
                      onChange={(e) => setPrint3PartBOL(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.printBOLAAlternateYard")}
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      name="printBOLAtAlternateYard"
                      value={printBOLAtAlternateYard}
                      checked={printBOLAtAlternateYard}
                      disabled={viewDetail || printBOLAtOrderEntry !== true || print3PartBOL === true}
                      onChange={(e) => setPrintBOLAtAlternateYard(e.target.checked)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.settings.tab.alternateYardForBOL")}
                    </Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className={`p-0 d-flex`}>
                    <AutoCompleteDropdown
                      towardsTop
                      arrayList={alternateYardData}
                      searchString={alternateYardInput}
                      renderItemId={(item) => item.yardPK}
                      renderItemField={(item) => item.description}
                      handleSearchString={(string) => dispatch(setAlternateYardInput(string))}
                      fetchDataBySearchString={fetchAlternateYard}
                      onSelect={handlAlternateYardAutocomplete}
                      selectedId={alternateYardForBOL}
                      clearInputCallback={() => {
                        setAlternateYardForBOL("");
                      }}
                      className={`${
                        !viewDetail
                          ? printBOLAtAlternateYard
                            ? alternateYardForBOL === ""
                              ? "borderRed"
                              : "borderGreen"
                            : ""
                          : ""
                      }`}
                      disabled={
                        viewDetail ||
                        (printBOLAtOrderEntry == false && printBOLAtAlternateYard == false) ||
                        (printBOLAtOrderEntry == true && printBOLAtAlternateYard == false)
                      }
                      loading={alternateYardLoading}
                    />
                    <LookupButton
                      disabled={
                        viewDetail ||
                        (printBOLAtOrderEntry == false && printBOLAtAlternateYard == false) ||
                        (printBOLAtOrderEntry == true && printBOLAtAlternateYard == false)
                      }
                      onClick={handleAlternateYardLookup}
                      // Alternate Yard Lookup Modal @ Bottom
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Shuttle City Lookup Modal */}

          <ShuttleCityLookup
            show={showShuttleCityLookup}
            onHide={() => dispatch(setShowShuttleCityLookup(false))}
            renderItemId={(shuttleCity) => shuttleCity.shuttleCityPK}
            outbound={outbound}
            isCustomerPlantMaintenance
            handleLookupSelection={handleShuttleCityLookupSelection}
          />
          {/* Delivery Yard Lookup Modal */}
          <YardLookup
            show={yardLookup}
            MaintenanceProgram
            onHide={() => dispatch(setYardLookup(false))}
            renderItemId={(yard) => yard.yardPK}
            handleLookupSelection={handleYardSelectionLookup}
          />
          {/* Delivery Yard Lookup Modal */}
          <YardLookup
            show={showAlternateYardLookup}
            onHide={() => dispatch(setShowAlternateYardLookup(false))}
            renderItemId={(yard) => yard.yardPK}
            customFetchFunction={getYardLookupValue}
            handleLookupSelection={handleAlternateYardSelectionLookup}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SettingsSubTab;
