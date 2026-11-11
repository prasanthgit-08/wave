import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import YardToYardShuttleService from "../../../../services/YardToYardShuttleService";
import YardLookup from "../../../LookupScreens/Yard/YardLookup";
import OrderEntryService from "../../../../services/OrderEntryService";
import CustomerPlantsLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import EditMasterExpressService from "../../../../services/Units/EditMasterExpressService";
import { roundArrow } from "tippy.js";
import {
  setShuttleSaveData,
  setShuttleSaveFlag,
  setBolData,
  setPrinterDescription,
  setUnitData,
} from "../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import PrinterService from "../../../../services/PrinterService";
const FormContent = ({ unitPK }) => {
  //Local States
  const dispatch = useDispatch();
  const [plantsList, setPlantsList] = useState([]);
  const [pickupPlantName, setPickupPlantName] = useState("");
  const [pickupPlantLookupShow, setPickupPlantLookupShow] = useState(false);
  const [pickupPlantID, setPickupPlantID] = useState("");
  const [deliveryPlantName, setDeliveryPlantName] = useState("");
  const [deliveryPlantLookupShow, setDeliveryPlantLookupShow] = useState(false);
  const [deliveryPlantID, setDeliveryPlantID] = useState("");
  const [yardsList, setYardsList] = useState([]);
  const [pickupYardName, setPickupYardName] = useState("");
  const [pickupYardLookupShow, setPickupYardLookupShow] = useState(false);
  const [pickupYardID, setPickupYardID] = useState("");
  const [deliveryYardName, setDeliveryYardName] = useState("");
  const [deliveryYardLookupShow, setDeliveryYardLookupShow] = useState(false);
  const [deliveryYardID, setDeliveryYardID] = useState("");

  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [miles, setMiles] = useState("");
  const [driverAmount, setDriverAmount] = useState("");
  const [roundTrip, setRoundTrip] = useState(false);
  const [invoiceShuttle, setInvoiceShuttle] = useState(false);
  const [printBOL, setPrintBOL] = useState(false);
  const [printBolAtYard, setPrintBolAtYard] = useState(false);

  const [yardsWithPrinterList, setYardsWithPrinterList] = useState([]);
  const [bolYardName, setBolYardName] = useState("");
  const [bolYardLookupShow, setBolYardLookupShow] = useState(false);
  const [bolYardID, setBolYardID] = useState("");
  const [shuttleCityID, setShuttleCityID] = useState("");
  const [plantToPlantTranferId, setPlantToPlantTranferId] = useState("");
  const [isPlantToPlantCombinationExist, setIsPlantToPlantCombinationExist] = useState(false);
  const [plantToYardTranferId, setPlantToYardTranferId] = useState("");
  const [isCombinationExist, setIsCombinationExist] = useState(false);
  const [oldData, setOldData] = useState(null);
  const [isCDLUnit, setIsCDLUnit] = useState(false);

  const [loader, setLoader] = useState(false);
  const [autoLoader, setAutoLoader] = useState(false);
  /*** Redux States ***/
  // const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const unitData = useSelector((state) => state.editMasterExpressTabsReducer.unitData);
  /*** Fetch Unit Information ***/
  useEffect(() => {
    setLoader(true);
    EditMasterExpressService.getUnitInformation(unitPK)
      .then((response) => {
        const data = response?.data?.unitDetails[0];
        setLoader(false);
        dispatch(setUnitData(data));
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  }, [unitPK]);

  /****** Plant dropdown and lookup ******/
  // Fetch all the customer plants for the selected customer.
  const fetchPlantdetailsByName = (string) => {
    setAutoLoader(true);
    OrderEntryService.fetchPickupPlantdetailsByName(
      unitData?.customerfk || "",
      unitData?.dpuCustomer || false,
      string
    )
      .then((response) => {
        const data = response.data.content;
        const customerPlantsList = data?.map((plants) => ({ ...plants, name: plants.name?.trim() }));
        setPlantsList(customerPlantsList);
      })
      .catch((err) => {})
      .finally(() => {
        setAutoLoader(false);
      });
  };

  //Handle selection from pickup yard dropdown
  const handlePickupPlantSelection = (plant) => {
    setPickupPlantID(plant.customerPlantPK);
    setPickupPlantName(plant.name?.trim());
    setShuttleCityID(plant?.shuttleCityFK);
    setPickupPlantLookupShow(false);
  };

  //Enable pickup yard lookup
  const handlePickupPlantLookupModalShow = () => {
    setPickupPlantLookupShow(true);
  };

  //Disable pickup yard lookup
  const handlePickupPlantLookupModalHide = () => {
    setPickupPlantLookupShow(false);
  };

  //Handle selection from delivery yard dropdown
  const handleDeliveryPlantSelection = (plant) => {
    setDeliveryPlantID(plant.customerPlantPK);
    setDeliveryPlantName(plant.name?.trim());
    setShuttleCityID(plant?.shuttleCityFK);
    setDeliveryPlantLookupShow(false);
  };

  //Enable pickup yard lookup
  const handleDeliveryPlantLookupModalShow = () => {
    setDeliveryPlantLookupShow(true);
  };

  //Disable pickup yard lookup
  const handleDeliveryPlantLookupModalHide = () => {
    setDeliveryPlantLookupShow(false);
  };

  /***************************************************/

  /****** Yard dropdown and lookup ******/
  //Service for getting all Yards
  const fetchYardsList = (string) => {
    setAutoLoader(true);
    YardToYardShuttleService.fetchYardDetailsByName(string, 0, 1, 100, "Beginning")
      .then((response) => {
        const data = response.data.content;
        const yardsList = data?.map((yards) => ({ ...yards, description: yards.description?.trim() }));
        setYardsList(yardsList);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setAutoLoader(false);
      });
  };

  //Handle selection from delivery yard dropdown
  const handleDeliveryYardSelection = (deliveryYard) => {
    setDeliveryYardID(deliveryYard.yardPK);
    setDeliveryYardName(deliveryYard.description);
    setDeliveryYardLookupShow(false);
  };

  //Enable delivery yard lookup
  const handleDeliveryYardLookupModalShow = () => {
    setDeliveryYardLookupShow(true);
  };

  //Disable delivery yard lookup
  const handleDeliveryYardLookupModalHide = () => {
    setDeliveryYardLookupShow(false);
  };

  //Handle selection from pickup yard dropdown
  const handlePickupYardSelection = (deliveryYard) => {
    setPickupYardID(deliveryYard.yardPK);
    setPickupYardName(deliveryYard.description);
    setPickupYardLookupShow(false);
  };

  //Enable pickup yard lookup
  const handlePickupYardLookupModalShow = () => {
    setPickupYardLookupShow(true);
  };

  //Disable pickup yard lookup
  const handlePickupYardLookupModalHide = () => {
    setPickupYardLookupShow(false);
  };

  /***************************************************/

  /****** Yard dropdown and lookup ******/
  //Service for getting all Yards with printers
  const fetchYardsWithPrinterList = (string) => {
    setAutoLoader(true);
    EditMasterExpressService.fetchYardsWithPrinter(string, 0, 1, 100, "Beginning")
      .then((response) => {
        const data = response.data.content;
        const yardsList = data?.map((yards) => ({ ...yards, description: yards.description?.trim() }));
        setYardsWithPrinterList(yardsList);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setAutoLoader(false);
      });
  };

  //Handle selection from delivery yard dropdown
  const handleBOLYardSelection = (deliveryYard) => {
    setBolYardID(deliveryYard.yardPK);
    setBolYardName(deliveryYard.description);
    if (deliveryYard?.bolPrinterFK) {
      PrinterService.getPrinterById(deliveryYard?.bolPrinterFK).then((response) => {
        const data = response.data;
        dispatch(setPrinterDescription(data?.description?.trim()));
      });
    }
    setBolYardLookupShow(false);
  };

  //Enable delivery yard lookup
  const handleBOLYardLookupModalShow = () => {
    setBolYardLookupShow(true);
  };

  //Disable delivery yard lookup
  const handleBOLYardLookupModalHide = () => {
    setBolYardLookupShow(false);
  };

  //Validations
  const isNumber = (value) => {
    if (value === null || value === undefined || value === "") return "";
    if (!/^\d+$/.test(value)) return "";
    return value;
  };
  const isDecimalNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d:.]/g, "");

    if (value) return number;
  };

  useEffect(() => {
    if (unitData) {
      setDeliveryPlantID(unitData?.customerPlantPK || "");
      setDeliveryPlantName(unitData?.name?.trim() || "");
      setShuttleCityID(unitData?.shuttleCityFK || "");
    }
  }, [unitData]);

  useEffect(() => {
    if (unitData) {
      setPickupYardID(unitData?.pickupYardFK || "");
      setPickupYardName(unitData?.description?.trim() || "");
    }
  }, [unitData]);
  //***Used to check plant to plant combination exist or not* */
  const plantToPlantExistCheckForShuttle = () => {
    setLoader(true);
    EditMasterExpressService.plantToPlantExistCheckForDispatchShuttle(
      pickupPlantID,
      deliveryPlantID,
      unitData?.towable,
      unitData?.motorized,
      isCDLUnit
    )
      .then((res) => {
        const data = res.data;
        setIsCombinationExist(data.combinationExists);
        setOldData(data);

        if (data.combinationExists) {
          {
            setMiles(data?.miles);
            setPlantToPlantTranferId(data?.plantToPlantTranferId);
            if (unitData?.motorized) {
              setDriverAmount(data?.motorizedDriverFee);
              setInvoiceAmount(data?.motorizedInvoiceFee);
            }
            if (unitData?.towable && !isCDLUnit) {
              setDriverAmount(data?.towableDriverFee);
              setInvoiceAmount(data?.towableInvoiceFee);
            }
            if (isCDLUnit) {
              setDriverAmount(data?.towableCDLDriverAmount);
              setInvoiceAmount(data?.towableCDLInvoiceFee);
            }
          }
          setLoader(false);
        } else {
          setIsCombinationExist(false);
          setDriverAmount("");
          setInvoiceAmount("");
          setMiles("");
          setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.error("Error fetching shuttle dispatch data:", err);
      });
  };
  //***Used to check plant to yard combination exist or not* */
  const plantToYardExistCheckForShuttle = () => {
    setLoader(true);
    EditMasterExpressService.plantToYardExistCheckForShuttle(
      pickupPlantID,
      deliveryPlantID,
      pickupYardID,
      deliveryYardID,
      unitData?.towable,
      unitData?.motorized,
      shuttleCityID,
      isCDLUnit
    )
      .then((res) => {
        const data = res.data;
        setOldData(data);
        setIsCombinationExist(data.combinationExists);
        if (data.combinationExists) {
          {
            setMiles(data?.miles);
            setPlantToYardTranferId(data?.plantToYardTranferId);
            if (unitData?.motorized) {
              setDriverAmount(data?.motorizedDriverFee);
              setInvoiceAmount(data?.motorizedInvoiceFee);
            }
            if (unitData?.towable && !isCDLUnit) {
              setDriverAmount(data?.towableDriverFee);
              setInvoiceAmount(data?.towableInvoiceFee);
            }
            if (isCDLUnit) {
              setDriverAmount(data?.towableCDLDriverAmount);
              setInvoiceAmount(data?.towableCDLInvoiceFee);
            }
          }
          setLoader(false);
        } else {
          setIsCombinationExist(false);
          setDriverAmount("");
          setInvoiceAmount("");
          setMiles("");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching shuttle dispatch data:", err);
        setLoader(false);
      });
  };

  //***Used to check plant to yard combination exist or not -for round trip* */
  const getRoundTripData = () => {
    setLoader(true);
    EditMasterExpressService.yardToPlantRoundTrip(
      deliveryPlantID,
      pickupYardID,
      unitData?.towable,
      unitData?.motorized,
      shuttleCityID,
      isCDLUnit
    )
      .then((res) => {
        const data = res.data;
        setOldData(data);
        setIsCombinationExist(data.combinationExists);
        if (data.combinationExists) {
          {
            setMiles(data?.miles);
            setPlantToYardTranferId(data?.plantToYardTranferId);
            if (unitData?.motorized) {
              setDriverAmount(data?.motorizedDriverFee);
              setInvoiceAmount(data?.motorizedInvoiceFee);
            }
            if (unitData?.towable && !isCDLUnit) {
              setDriverAmount(data?.towableDriverFee);
              setInvoiceAmount(data?.towableInvoiceFee);
            }
            if (isCDLUnit) {
              setDriverAmount(data?.towableCDLDriverAmount);
              setInvoiceAmount(data?.towableCDLInvoiceFee);
            }
          }
          setLoader(false);
        } else {
          setIsCombinationExist(false);
          setDriverAmount("");
          setInvoiceAmount("");
          setMiles("");
          setLoader(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching shuttle dispatch data:", err);
        setLoader(false);
      });
  };
  useEffect(() => {
    if (pickupPlantID && deliveryPlantID) {
      plantToPlantExistCheckForShuttle();
    }
  }, [pickupPlantID, deliveryPlantID]);

  useEffect(() => {
    if ((pickupPlantID && deliveryYardID) || (pickupYardID && deliveryPlantID)) {
      plantToYardExistCheckForShuttle();
    }
  }, [pickupPlantID, deliveryPlantID, deliveryYardID, pickupYardID]);

  useEffect(() => {
    if (roundTrip) {
      getRoundTripData();
    }
  }, [roundTrip]);
  useEffect(() => {
    if (!printBOL) {
      setPrintBolAtYard(false);
      setBolYardID("");
      setBolYardName("");
    }
  }, [printBOL]);
  useEffect(() => {
    if (!printBolAtYard) {
      setBolYardID("");
      setBolYardName("");
    }
  }, [printBolAtYard]);

  useEffect(() => {
    if (unitData?.CDLARequired && unitData?.towable) {
      setIsCDLUnit(true);
    } else {
      setIsCDLUnit(false);
    }
  }, [unitData]);

  // to backend
  const setShuttleData = () => {
    dispatch(
      setShuttleSaveData({
        pickupPlantFK: pickupPlantID,
        deliveryPlantFK: deliveryPlantID,
        pickupYardFK: pickupYardID,
        deliveryYardFK: deliveryYardID,
        towableUnit: unitData?.towable,
        motorizedUnit: unitData?.motorized,
        shuttleCityFK: shuttleCityID,
        roundTrip: roundTrip,
        cdlUnit: isCDLUnit,
        // dispatchId: selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchPK,
        combinationExist: isCombinationExist,
        miles: miles,
        driverAmount: driverAmount,
        invoiceAmount: invoiceAmount,
        invoiceShuttle: invoiceShuttle,
        plantToPlantTransferId: plantToPlantTranferId,
        plantToYardTransferId: plantToYardTranferId,
        customerId: unitData?.customerfk,
        unitId: unitPK,
        //driverId: selectedUnitData?.editMasterExpressUnitTabDTO?.driverPK,
      })
    );
  };

  useEffect(() => {
    setShuttleData();
  }, [
    pickupPlantID,
    pickupYardID,
    deliveryPlantID,
    deliveryYardID,
    miles,
    invoiceAmount,
    driverAmount,
    roundTrip,
    invoiceShuttle,
    shuttleCityID,
    isCombinationExist,
    unitData,
    invoiceShuttle,
    plantToPlantTranferId,
    plantToYardTranferId,
    isCDLUnit,
    isCombinationExist,
    roundTrip,
    unitPK,
    shuttleCityID,
  ]);

  // to backend
  const bolData = () => {
    dispatch(
      setBolData({
        bolYardFK: bolYardID,
        printBOL: printBOL,
        isYard: printBolAtYard ? true : false,
      })
    );
  };
  useEffect(() => {
    bolData();
  }, [printBOL, printBolAtYard, bolYardID]);

  //save validation
  useEffect(() => {
    if (
      miles &&
      miles > 0 &&
      driverAmount &&
      driverAmount > 0 &&
      invoiceAmount &&
      invoiceAmount > 0 &&
      ((pickupPlantID && pickupPlantName && deliveryPlantID && deliveryPlantName) ||
        (pickupPlantID && pickupPlantName && deliveryYardID && deliveryYardName) ||
        (pickupYardID && pickupYardName && deliveryPlantID && deliveryPlantName)) &&
      (!printBolAtYard || (printBolAtYard && bolYardID && bolYardName))
    ) {
      dispatch(setShuttleSaveFlag(false));
    } else {
      dispatch(setShuttleSaveFlag(true));
    }
  }, [
    pickupPlantID,
    pickupYardID,
    deliveryPlantID,
    deliveryYardID,
    miles,
    invoiceAmount,
    driverAmount,
    deliveryPlantName,
    pickupPlantName,
    pickupYardName,
    deliveryYardName,
    printBolAtYard,
    bolYardID,
    bolYardName,
  ]);

  //used to clear states
  useEffect(() => {
    if (!pickupPlantID && !deliveryPlantID && !deliveryYardID && !pickupPlantID) {
      setInvoiceAmount("");
      setDriverAmount("");
      setMiles("");
    }
  }, [pickupPlantID, pickupYardID, deliveryPlantID, deliveryYardID]);

  useEffect(() => {
    if (deliveryPlantID) {
      setDeliveryYardID("");
      setDeliveryYardName("");
    }
  }, [deliveryPlantID]);

  useEffect(() => {
    if (pickupPlantID) {
      setPickupYardID("");
      setPickupYardName("");
    }
  }, [pickupPlantID]);

  useEffect(() => {
    if (deliveryYardID) {
      setDeliveryPlantID("");
      setDeliveryPlantName("");
    }
  }, [deliveryYardID]);

  useEffect(() => {
    if (pickupYardID) {
      setPickupPlantID("");
      setPickupPlantName("");
    }
  }, [pickupYardID]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row className="m-0 p-10">
              <Col xs={6}>
                {/* Pickup Plant */}
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Pickup Plant</Form.Label>
                  </Col>

                  <Col xs={8} className="p-0 d-flex">
                    <AutoCompleteDropdown
                      arrayList={plantsList}
                      searchString={pickupPlantName}
                      renderItemId={(plant) => plant.customerPlantPK}
                      renderItemField={(plant) => plant.name}
                      handleSearchString={(string) => setPickupPlantName(string)}
                      fetchDataBySearchString={fetchPlantdetailsByName}
                      onSelect={handlePickupPlantSelection}
                      selectedId={pickupPlantID}
                      clearInputCallback={() => {
                        setPickupPlantID("");
                        setInvoiceAmount("");
                        setDriverAmount("");
                        setMiles("");
                        setRoundTrip(false);
                        setIsCombinationExist(false);
                      }}
                      disabled={pickupYardID}
                      loading={autoLoader}
                      className={`customFormControl ${
                        pickupYardID ? "" : pickupPlantID && pickupPlantName ? "borderGreen" : "borderRed"
                      }
               `}
                    />
                    <LookupButton onClick={handlePickupPlantLookupModalShow} disabled={pickupYardID} />
                  </Col>
                </Form.Group>

                {/* Pickup Yard */}
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Pickup Yard</Form.Label>
                  </Col>
                  <Col xs={8} className="p-0 d-flex">
                    <AutoCompleteDropdown
                      arrayList={yardsList}
                      searchString={pickupYardName}
                      renderItemId={(pickupYard) => pickupYard.yardPK}
                      renderItemField={(pickupYard) => pickupYard.description}
                      handleSearchString={(string) => setPickupYardName(string)}
                      fetchDataBySearchString={fetchYardsList}
                      onSelect={handlePickupYardSelection}
                      selectedId={pickupYardID}
                      clearInputCallback={() => {
                        setPickupYardID("");
                        setInvoiceAmount("");
                        setDriverAmount("");
                        setMiles("");
                        setRoundTrip(false);
                        setIsCombinationExist(false);
                      }}
                      disabled={deliveryYardID || pickupPlantID}
                      loading={autoLoader}
                      className={`customFormControl ${
                        deliveryYardID || pickupPlantID
                          ? ""
                          : pickupYardID && pickupYardName
                            ? "borderGreen"
                            : "borderRed"
                      }
               `}
                    />
                    <LookupButton
                      onClick={handlePickupYardLookupModalShow}
                      disabled={deliveryYardID || pickupPlantID}
                    />
                  </Col>
                </Form.Group>

                {/* Invoice Amount ,Miles */}
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-5">
                  <Col xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Invoice Amount</Form.Label>
                  </Col>
                  <Col xs={2} className="p-0">
                    <input
                      className={`customFormControl ${
                        (isCombinationExist &&
                          oldData?.towableInvoiceFee !== 0 &&
                          unitData?.towable &&
                          !isCDLUnit) ||
                        (isCombinationExist && oldData?.motorizedInvoiceFee !== 0 && unitData?.motorized) ||
                        (isCombinationExist && oldData?.towableCDLInvoiceFee !== 0 && isCDLUnit)
                          ? ""
                          : (isCombinationExist &&
                                (!invoiceAmount ||
                                  isNaN(parseFloat(invoiceAmount)) ||
                                  parseFloat(invoiceAmount) === 0 ||
                                  parseFloat(invoiceAmount) < 0)) ||
                              (!isCombinationExist && (!invoiceAmount || parseFloat(invoiceAmount) === 0)) ||
                              invoiceAmount === "."
                            ? "borderRed"
                            : "borderGreen"
                      }`}
                      name="invoiceAmount"
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={invoiceAmount}
                      disabled={
                        (isCombinationExist &&
                          oldData?.towableInvoiceFee !== 0 &&
                          unitData?.towable &&
                          !isCDLUnit) ||
                        (isCombinationExist && oldData?.motorizedInvoiceFee !== 0 && unitData?.motorized) ||
                        (isCombinationExist && oldData?.towableCDLInvoiceFee !== 0 && isCDLUnit)
                      }
                      onInput={(e) => {
                        e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                          setInvoiceAmount(isDecimalNumber(e.target.value));
                      }}
                    />
                  </Col>
                  {/* Miles */}
                  <Col xs={4} className="p-0 text-end">
                    <Form.Label className="customColFormLabel pe-3">Miles</Form.Label>
                  </Col>
                  <Col xs={2} className="p-0">
                    <input
                      className={`customFormControl ${
                        isCombinationExist && miles !== 0 && oldData?.miles !== 0
                          ? ""
                          : (!isCombinationExist && ((miles && miles > 32767) || !miles)) || !miles
                            ? "borderRed"
                            : "borderGreen"
                      }`}
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={miles}
                      maxLength={5}
                      disabled={isCombinationExist && miles !== 0 && oldData?.miles !== 0}
                      onInput={(e) => {
                        if (isNumber(e.target.value) && parseInt(e.target.value) > 0) {
                          setMiles(e.target.value);
                        } else {
                          setMiles("");
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Driver Amount */}
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Driver Amount</Form.Label>
                  </Col>
                  <Col xs={2} className="p-0">
                    <input
                      className={`customFormControl ${
                        (isCombinationExist &&
                          oldData?.towableDriverFee !== 0 &&
                          unitData?.towable &&
                          !isCDLUnit) ||
                        (isCombinationExist && oldData?.motorizedDriverFee !== 0 && unitData?.motorized) ||
                        (isCombinationExist && oldData?.towableCDLDriverAmount !== 0 && isCDLUnit)
                          ? ""
                          : (isCombinationExist &&
                                (!driverAmount ||
                                  isNaN(parseFloat(driverAmount)) ||
                                  parseFloat(driverAmount) === 0 ||
                                  parseFloat(driverAmount) < 0)) ||
                              (!isCombinationExist && (!driverAmount || parseFloat(driverAmount) === 0)) ||
                              driverAmount === "."
                            ? "borderRed"
                            : "borderGreen"
                      }`}
                      name="driverAmount"
                      type="text"
                      disabled={
                        (isCombinationExist &&
                          oldData?.towableDriverFee !== 0 &&
                          unitData?.towable &&
                          !isCDLUnit) ||
                        (isCombinationExist && oldData?.motorizedDriverFee !== 0 && unitData?.motorized) ||
                        (isCombinationExist && oldData?.towableCDLDriverAmount !== 0 && isCDLUnit)
                      }
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={driverAmount}
                      onInput={(e) => {
                        e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                          setDriverAmount(isDecimalNumber(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Round Trip */}
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Round Trip</Form.Label>
                  </Col>
                  <Col xs={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      checked={roundTrip}
                      disabled={!(pickupYardID && deliveryPlantID)}
                      onChange={(e) => {
                        const value = e.target.checked;

                        setRoundTrip(value);
                        if (!value) {
                          setInvoiceAmount("");
                          setDriverAmount("");
                          setMiles("");
                          setIsCombinationExist(false);
                          plantToYardExistCheckForShuttle();
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Invoice Shuttle */}
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Invoice Shuttle</Form.Label>
                  </Col>
                  <Col xs={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      checked={invoiceShuttle}
                      onChange={(e) => {
                        {
                          setInvoiceShuttle(e.target.checked);
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Print BOL */}
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Print BOL</Form.Label>
                  </Col>
                  <Col xs={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      checked={printBOL}
                      onChange={(e) => {
                        {
                          setPrintBOL(e.target.checked);
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Print BOL At Yard */}
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Print BOL At Yard</Form.Label>
                  </Col>
                  <Col xs={1} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      name="printBolAtYard"
                      checked={printBolAtYard}
                      disabled={!printBOL}
                      onChange={(e) => {
                        {
                          setPrintBolAtYard(e.target.checked);
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* BOL Yard */}
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">BOL Yard</Form.Label>
                  </Col>
                  <Col xs={8} className="p-0 d-flex">
                    <AutoCompleteDropdown
                      arrayList={yardsWithPrinterList}
                      searchString={bolYardName}
                      renderItemId={(bolYard) => bolYard.yardPK}
                      renderItemField={(bolYard) => bolYard.description}
                      handleSearchString={(string) => setBolYardName(string)}
                      fetchDataBySearchString={fetchYardsWithPrinterList}
                      onSelect={handleBOLYardSelection}
                      selectedId={bolYardID}
                      clearInputCallback={() => {
                        setBolYardID("");
                      }}
                      towardsTop={true}
                      disabled={!printBolAtYard}
                      loading={autoLoader}
                      className={`customFormControl ${
                        !printBolAtYard ? "" : bolYardID && bolYardName ? "borderGreen" : "borderRed"
                      }
               `}
                    />
                    <LookupButton onClick={handleBOLYardLookupModalShow} disabled={!printBolAtYard} />
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={6}>
                {/* Delivery Plant */}
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Delivery Plant</Form.Label>
                  </Col>
                  <Col xs={8} className="p-0 d-flex">
                    <AutoCompleteDropdown
                      arrayList={plantsList}
                      searchString={deliveryPlantName}
                      renderItemId={(plant) => plant.customerPlantPK}
                      renderItemField={(plant) => plant.name}
                      handleSearchString={(string) => setDeliveryPlantName(string)}
                      fetchDataBySearchString={fetchPlantdetailsByName}
                      onSelect={handleDeliveryPlantSelection}
                      selectedId={deliveryPlantID}
                      clearInputCallback={() => {
                        setDeliveryPlantID("");
                        setInvoiceAmount("");
                        setDriverAmount("");
                        setMiles("");
                        setRoundTrip(false);
                        setIsCombinationExist(false);
                      }}
                      disabled={deliveryYardID}
                      loading={autoLoader}
                      className={`customFormControl ${
                        deliveryYardID
                          ? ""
                          : deliveryPlantID && deliveryPlantName
                            ? "borderGreen"
                            : "borderRed"
                      }
               `}
                    />
                    <LookupButton onClick={handleDeliveryPlantLookupModalShow} disabled={deliveryYardID} />
                  </Col>
                </Form.Group>

                {/* Delivery Yard */}
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Delivery Yard</Form.Label>
                  </Col>
                  <Col xs={8} className="p-0 d-flex">
                    <AutoCompleteDropdown
                      arrayList={yardsList}
                      searchString={deliveryYardName}
                      renderItemId={(deliveryYard) => deliveryYard.yardPK}
                      renderItemField={(deliveryYard) => deliveryYard.description}
                      handleSearchString={(string) => setDeliveryYardName(string)}
                      fetchDataBySearchString={fetchYardsList}
                      onSelect={handleDeliveryYardSelection}
                      selectedId={deliveryYardID}
                      clearInputCallback={() => {
                        setDeliveryYardID("");
                        setInvoiceAmount("");
                        setDriverAmount("");
                        setMiles("");
                        setIsCombinationExist(false);
                      }}
                      disabled={pickupYardID || deliveryPlantID}
                      loading={autoLoader}
                      className={`customFormControl ${
                        pickupYardID || deliveryPlantID
                          ? ""
                          : deliveryYardID && deliveryYardName
                            ? "borderGreen"
                            : "borderRed"
                      }
               `}
                    />
                    <LookupButton
                      onClick={handleDeliveryYardLookupModalShow}
                      disabled={pickupYardID || deliveryPlantID}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            {/* Pickup yard lookup screen */}
            <YardLookup
              show={pickupYardLookupShow}
              onHide={handlePickupYardLookupModalHide}
              renderItemId={(pickupYard) => pickupYard.yardPK}
              handleLookupSelection={handlePickupYardSelection}
              MaintenanceProgram
            />
            {/* Delivery yard lookup screen */}
            <YardLookup
              show={deliveryYardLookupShow}
              onHide={handleDeliveryYardLookupModalHide}
              renderItemId={(deliveryYard) => deliveryYard.yardPK}
              handleLookupSelection={handleDeliveryYardSelection}
              MaintenanceProgram
            />
            {/* BOL yard lookup screen */}
            <YardLookup
              show={bolYardLookupShow}
              onHide={handleBOLYardLookupModalHide}
              renderItemId={(bolYard) => bolYard.yardPK}
              handleLookupSelection={handleBOLYardSelection}
              EditMasterExpressShuttle
            />
            {/* Pickup Plant Lookup Modal */}
            <CustomerPlantsLookup
              show={pickupPlantLookupShow}
              onHide={handlePickupPlantLookupModalHide}
              renderItemId={(plant) => plant.customerPlantPK}
              handleLookupSelection={handlePickupPlantSelection}
              customerId={unitData?.customerfk || ""}
              isDPUCustomer={unitData?.dpuCustomer || false}
              EditMasterExpress
              OrderEntry
            />
            {/* Delivery Plant Lookup Modal */}
            <CustomerPlantsLookup
              show={deliveryPlantLookupShow}
              onHide={handleDeliveryPlantLookupModalHide}
              renderItemId={(plant) => plant.customerPlantPK}
              handleLookupSelection={handleDeliveryPlantSelection}
              customerId={unitData?.customerfk || ""}
              isDPUCustomer={unitData?.dpuCustomer || false}
              EditMasterExpress
              OrderEntry
            />
          </div>
          {loader && (
            <div className="fade modal-backdrop show">
              {" "}
              <div className="pos-center">
                {" "}
                <div className="loader"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormContent;
