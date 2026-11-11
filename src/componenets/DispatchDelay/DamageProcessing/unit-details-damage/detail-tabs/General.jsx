import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DateInputField from "../../../../common/DateInputField";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DelayDamageService from "../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import {
  setAtRepairLocation,
  setClaimNumber,
  setContact,
  setCustomerDamageContact,
  setCustomerDamageFax,
  setCustomerDamagePhone,
  setDamageAtPickup,
  setDamageCode,
  setDamageData,
  setDamageDate,
  setDamagedUnitCodeFK,
  setDamagedUnitCodeID,
  setDamagedUnitCodeInput,
  setDamageInYard,
  setDamageLocation,
  setDamageTime,
  setDamageTimePeriod,
  setDeliveryTerminated,
  setDriverName,
  setFirstName,
  setFurtherRepairsRequired,
  setGeneralVO,
  setLastName,
  setNameUnder,
  setPhone,
  setRepairDate,
  setRepaired,
  setRepairLocation,
  setReportedDate,
  setReportedTime,
  setReportedTimePeriod,
  setStatus,
  setStatusComment,
  setUnitNumber,
  setVin,
  setWorkOrderNumber,
  setDamageContact,
  setDriverFK,
  setValidGeneral,
  setDamageContactFAX,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayDamageSlice";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import {
  setCustomerPlantId,
  setCustomerPlantInput,
  setDealerId,
  setDealerInput,
  setPageNumber,
} from "../../../../../redux/EditMaster/UnitSelectionSlice";
import DealerLookup from "../../../../LookupScreens/Dealer/DealerLookup";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import DriverLookup from "../../../../LookupScreens/Driver/DriverLookup";
import DriverService from "../../../../../services/DriverService";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { formatForApi, formatDatetimeToDate } from "../../../../../utils/dateUtils";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import { setReported } from "../../../../../redux/DamageProcessingSlice";

const General = () => {
  const dispatch = useDispatch();
  const [repairLocationName, setRepairLocationName] = useState();
  const [repairLocationAddress1, setRepairLocationAddress1] = useState();
  const [repairLocationAddress2, setRepairLocationAddress2] = useState();
  const [repairLocationCity, setRepairLocationCity] = useState();
  const [repairLocationState, setRepairLocationState] = useState();
  const [repairLocationPostal, setRepairLocationPostal] = useState();
  const viewDetail = useSelector((state) => state.delayDamage.viewDetail);
  const damagedUnitCodeInput = useSelector((state) => state.delayDamage.damagedUnitCodeInput);

  const [selectedCompanyName, setCompanyName] = useState(() => {
    // Initialize state from localStorage
    return localStorage.getItem("selectedCompany");
  });
  const id = useParams().id;
  const [loading, setLoading] = useState(false);

  const [repairDealerFk, setrepairDealerFk] = useState();
  const [repairCustomerPlantFk, setrepairCustomerPlantFk] = useState();
  const [damagedUnitCodeArray, setDamagedUnitCodeArray] = useState([]);

  const [showDamageCodeLookup, setShowDamageCodeLookup] = useState(false);
  const [damageCodeList, setDamageCodeList] = useState([]);
  const damageCodeInput = useSelector((state) => state.delayDamage.damageCodeInput);
  const damageCodeID = useSelector((state) => state.delayDamage.damageCodeID);

  const damagedUnitCodeID = useSelector((state) => state.delayDamage.damagedUnitCodeID);
  const handleLookup = () => {
    setShowLookup(true);
  };

  const [selectedDamageDate, setSelectedDamageDate] = useState(() => {
    const now = new Date();
    return formatForApi(now);
  });

  const [selectedDamageDateInput, setSelectedDamageDateInput] = useState("");

  const {
    claimNumber,
    damageContactFAX,
    driverName,
    unitNumber,
    vin,
    damageDate,
    damageTime,
    damageTimePeriod,
    reportedDate,
    reportedTime,
    reportedTimePeriod,
    damageCode,
    customerDamageContact,
    customerDamagePhone,
    customerDamageFax,
    repaired,
    furtherRepairsRequired,
    deliveryTerminated,
    status,
    statusComment,
    damageAtPickup,
    damageInYard,
    driverFK,
    damageLocation,
    atRepairLocation,
    repairLocation,
    nameUnder,
    workOrderNumber,
    contact,
    phone,
    repairDate,
    repairDealerID,
    repairPlantID,
    damageContact,
  } = useSelector((state) => state.delayDamage);
  const [showCustomerPlantLookup, setShowCustomerPlantLookup] = useState(false);
  const [plantsList, setPlantsList] = useState([]);
  const [showDealerLookup, setShowDealerLookup] = useState(false);
  const [dealersList, setDealersList] = useState([]);
  const generalVO = useSelector((state) => state.delayDamage.generalVO);

  const initialValue = [{ city: "", statecode: "", postalcode: "", canadian: false }];
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [zipIdChcek, setZipIdCheck] = useState("");

  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });

  const [selectedReportDate, setSelectedReportDate] = useState(() => {
    const now = new Date();
    return formatForApi(now);
  });
  const [selectedReportDateInput, setSelectedReportDateInput] = useState("");

  const [damagePeriod, setDamagePeriod] = useState("AM"); // Default to AM
  const [reportPeriod, setReportPeriod] = useState("AM"); // Default to AM

  const handleAMChange = (value) => {
    setDamagePeriod(value);
    updateDelayDateTime(selectedDamageTime, value);
  };

  const handleAM1Change = (value) => {
    setReportPeriod(value);
    updateReportedDateTime(selectedReportTime, value);
  };

  const updateDelayDateTime = (time, period) => {
    const [hour, minute] = time?.split(":")?.map(Number) || [];
    let convertedHour = hour % 12; // Convert 12-hour format to 0-11 range
    if (period === "PM") {
      if (hour === 12) {
        convertedHour = 12; // 12 PM remains 12
      } else {
        convertedHour += 12; // Convert to 24-hour format
      }
    } else if (period === "AM" && hour === 12) {
      convertedHour = 0; // Convert 12 AM to 0 hours
    }

    const formattedDate =
      selectedDamageDate +
      "T" +
      `${convertedHour < 10 ? "0" + convertedHour : convertedHour}:${minute < 10 ? "0" + minute : minute}:00`;

    dispatch(setDamageDate(formattedDate));
  };

  const updateReportedDateTime = (time, period) => {
    const [hour, minute] = time?.split(":")?.map(Number) || [];
    let convertedHour = hour % 12; // Convert 12-hour format to 0-11 range
    if (period === "PM") {
      if (hour === 12) {
        convertedHour = 12; // 12 PM remains 12
      } else {
        convertedHour += 12; // Convert to 24-hour format
      }
    } else if (period === "AM" && hour === 12) {
      convertedHour = 0; // Convert 12 AM to 0 hours
    }

    const formattedDate =
      selectedReportDate +
      "T" +
      `${convertedHour < 10 ? "0" + convertedHour : convertedHour}:${minute < 10 ? "0" + minute : minute}:00`;

    dispatch(setReported(formattedDate));
  };

  const customerPlantInput = useSelector((state) => state.unitSelection.customerPlantInput);
  const dealerInput = useSelector((state) => state.unitSelection.dealerInput);
  const customerPlantId = useSelector((state) => state.unitSelection.customerPlantId);
  const dealerId = useSelector((state) => state.unitSelection.dealerId);
  const [isSelectedDamageDateValid, setIsSelectedDamageDateValid] = useState(true);
  const [selectedDamageTime, setSelectedDamageTime] = useState(() => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  });
  const [isSelectedReportDateValid, setIsSelectedReportDateValid] = useState(true);
  const [selectedReportTime, setSelectedReportTime] = useState(() => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  });
  const [showLookup, setShowLookup] = useState(false);

  const handleDelayUnitCodeLookup = (delayUnitCode) => {
    setShowLookup(false);
    dispatch(setDamagedUnitCodeInput(delayUnitCode?.description?.trim()));
    dispatch(setDamagedUnitCodeID(delayUnitCode?.delayedUnitCodePK));
    dispatch(setDamagedUnitCodeFK(delayUnitCode?.delayedUnitCodePK));
  };

  const [showDriverLookup, setShowDriverLookup] = useState(false);
  const [driverList, setDriverList] = useState([]);
  const firstName = useSelector((state) => state.delayDamage.firstName);
  const lastName = useSelector((state) => state.delayDamage.lastName);

  // Driver lookup handlers
  const handleDriverLookupShow = () => {
    setShowDriverLookup(true);
  };

  const handleDriverLookupHide = () => {
    setShowDriverLookup(false);
  };

  const handleDriverLookupSelection = (driver) => {
    dispatch(setFirstName(driver?.firstName));
    dispatch(setLastName(driver?.lastName || ""));
    dispatch(setDriverName(`${driver?.firstName} ${driver?.lastName || ""}`?.trim()));
    setShowDriverLookup(false);
  };

  // Fetch drivers by name for autocomplete
  const fetchDriversByName = (searchString) => {
    DriverService.getDriverForAuto(searchString)
      .then((response) => {
        setDriverList(response?.data?.content);
      })
      .catch((error) => {
        console.error("Error fetching drivers:", error);
      });
  };

  const handleDriverSelection = (driver) => {
    if (driver) {
      dispatch(setDriverFK(driver.driverPK));
      dispatch(setDriverName(`${driver.firstName} ${driver.lastName || ""}`?.trim()));
    }
  };

  const handleDamageCodeLookupShow = () => {
    setShowDamageCodeLookup(true);
  };

  const handleDamageCodeLookupHide = () => {
    setShowDamageCodeLookup(false);
  };

  const handleDamageCodeLookupSelection = (code) => {
    dispatch(setDamagedUnitCodeInput(code.description?.trim() || ""));
    dispatch(setDamagedUnitCodeID(code.delayedUnitCodePK));
    setShowDamageCodeLookup(false);
  };

  // Fetch damage codes by name for autocomplete
  const fetchDamageCodesByName = (searchString) => {
    DelayProcessingService.getDelayUnitCodesForAutoComplete(searchString, "damage")
      .then((response) => {
        const data = response?.data?.content;
        const codeList = data?.map((code) => ({
          ...code,
          description: code.description?.trim(),
        }));
        setDamageCodeList(codeList);
      })
      .catch((error) => {
        console.error("Error fetching damage codes:", error);
      });
  };

  const handleDamageCodeSelection = (code) => {
    if (code) {
      dispatch(setDamagedUnitCodeInput(code.description?.trim() || ""));
      dispatch(setDamagedUnitCodeID(code.delayedUnitCodePK));
    }
  };

  useEffect(() => {
    const fetchDamageDetails = async () => {
      try {
        setLoading(true);

        const response = await DelayDamageService.editDelayDamage({
          delayedUnitDamagePK: id,
          tab: "General",
        });

        if (response?.data && response?.data?.length > 0) {
          const damageData = response?.data[0];

          // Map the data to redux store
          dispatch(setClaimNumber(damageData?.ClaimNumber));
          dispatch(setCustomerDamageContact(damageData?.DamageContact));
          dispatch(setDriverName(damageData?.DriverName));
          dispatch(setDriverFK(damageData?.DriverFK));
          dispatch(setUnitNumber(damageData?.UnitNumber));
          dispatch(setVin(damageData?.VIN));
          dispatch(setDamageDate(damageData?.DamageDate));
          dispatch(setDamageTime(damageData?.DamageTime));
          dispatch(setDamageTimePeriod(damageData?.DamageTimePeriod));
          dispatch(setReportedDate(damageData?.ReportedDate));
          dispatch(setReportedTime(damageData?.ReportedTime));
          dispatch(setReportedTimePeriod(damageData?.ReportedTimePeriod));
          dispatch(setDamagedUnitCodeInput(damageData?.DelayedUnitCodeDescription));
          dispatch(setDamagedUnitCodeFK(damageData?.DamageDelayedUnitCodeFK));
          dispatch(setDamagedUnitCodeID(damageData?.DamageDelayedUnitCodeFK));
          dispatch(setCustomerDamageContact(damageData?.CustomerDamageContact));
          dispatch(setCustomerDamagePhone(damageData?.CustomerDamagePhone));
          dispatch(setCustomerDamageFax(damageData?.CustomerDamageFax));
          dispatch(setRepaired(damageData?.Repaired));
          dispatch(setRepairDate(formatDatetimeToDate(damageData?.RepairDate)));
          dispatch(setFurtherRepairsRequired(damageData?.FurtherRepairsRequired));
          dispatch(setDeliveryTerminated(damageData?.DeliveryTerminated));
          dispatch(setStatus(damageData?.Status));
          dispatch(setStatusComment(damageData?.StatusComment));
          dispatch(setDamageAtPickup(damageData?.DamageAtPickup));
          dispatch(setDamageInYard(damageData?.DamageInYard));
          dispatch(setDamageLocation(damageData?.DamageLocation));
          dispatch(setAtRepairLocation(damageData?.AtRepairLocation));
          dispatch(setRepairLocation(damageData?.RepairLocation));
          dispatch(setNameUnder(damageData?.NameUnder));
          dispatch(setWorkOrderNumber(damageData?.WorkOrderNumber));
          dispatch(setContact(damageData?.Contact));
          dispatch(setPhone(formatPhoneNumber(damageData?.Phone)));
          dispatch(setDealerId(damageData?.RepairDealerFK));
          dispatch(setDealerInput(damageData?.RepairDealerName));
          dispatch(setCustomerPlantId(damageData?.RepairCustomerPlantFK));
          dispatch(setCustomerPlantInput(damageData?.RepairCustomerPlantName));
        }
      } catch (error) {
        console.error("Error fetching damage details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDamageDetails();
  }, [id]);

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const generalEditSave = () => {
    const data = {
      ...generalVO,
      delayUnitDamagePK: id || "",
      claimNumber: claimNumber || "",
      driverPK: driverFK || 0,
      unitNumber: unitNumber || "",
      vIN: vin || "",
      damageDate: damageDate || "",
      reportedDate: reportedDate || "",
      damageCode: damagedUnitCodeID || 0,
      customerDamageContact: customerDamageContact || "",
      customerDamagePhone: customerDamagePhone ? 1 : 0,
      customerDamageFAX: customerDamageFax || "",
      repaired: repaired ? 1 : 0,
      repairDate: repairDate || "",

      furtherRepairsRequired: furtherRepairsRequired ? 1 : 0,
      deliveryTerminated: deliveryTerminated ? 1 : 0,
      atRepairLocation: atRepairLocation ? 1 : 0,
      repairdealerFK: dealerId || 0,
      repairPlantFK: customerPlantId || 0,
      repairLocation1: atRepairLocation ? 1 : 0,

      repairLocation2: atRepairLocation ? 1 : 0,
      repairLocation3: atRepairLocation ? 1 : 0,
      repairLocation4: atRepairLocation ? 1 : 0,
      repairLocation5: atRepairLocation ? 1 : 0,
      repairLocation6: atRepairLocation ? 1 : 0,
      nameUnder: nameUnder || "",

      workOrderNumber: workOrderNumber || "",
      contact: contact || "",
      driverPK: driverFK || 0,
      phone: phone || "",
      status: status || "",
      statusComment: statusComment || "",
    };
    dispatch(setGeneralVO(data));
  };

  useEffect(() => {
    generalEditSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    id,
    claimNumber,
    unitNumber,
    vin,
    damageDate,
    reportedDate,
    customerDamageContact,
    customerDamagePhone,
    customerDamageFax,
    repaired,
    furtherRepairsRequired,
    deliveryTerminated ? 1 : 0,
    atRepairLocation ? 1 : 0,
    dealersList,
    plantsList,
    atRepairLocation ? 1 : 0,

    atRepairLocation,
    atRepairLocation ? 1 : 0,
    atRepairLocation ? 1 : 0,
    atRepairLocation,
    atRepairLocation,
    nameUnder,

    workOrderNumber,
    contact,
    phone,
    status,
    statusComment,
  ]);

  const fetchDealerByName = (string) => {
    DelayDamageService.fetchAllDealerDetailsByName(string, selectedCompanyName)
      .then((response) => {
        const data = response?.data;
        const dealerList = data?.content?.map((dealer) => ({
          ...dealer,
          name: dealer?.name?.trim(),
        }));
        setDealersList(dealerList);
      })
      .catch((err) => {});
  };

  /**
   * used for Dealer Autocomplete Dropdown & Lookup - onSelect
   */
  const handleDealerSelection = (dealer) => {
    dispatch(setDealerInput(dealer.name || ""));
    dispatch(setDealerId(dealer.dealerPK || ""));
    setrepairDealerFk(dealer.dealerPK);
    dispatch(setPageNumber(0));
    setShowDealerLookup(false);
    setRepairLocationName(dealer.name || "");
    setRepairLocationCity(dealer.city || "");
    setRepairLocationState(dealer.stateCode || "");
    setRepairLocationPostal(dealer.postalCode || "");
    setRepairLocationAddress1(dealer.address1 || "");
    setRepairLocationAddress2(dealer.address2 || "");
    setPostalCodePK(dealer.postalCodePK);
  };

  /**
   * Fetch all the customer plants for Autocomplete
   */
  const fetchAllPlantdetailsByName = (string) => {
    DelayDamageService.fetchAllPlantdetailsByName(string, selectedCompanyName)
      .then((response) => {
        const data = response?.data;
        const plantList = data?.content?.map((plant) => ({
          ...plant,
          name: plant?.name?.trim(),
        }));
        setPlantsList(plantList);
      })
      .catch((err) => {});
  };
  /**
   * used for Plant selection Autocomplete & Lookup - onSelect
   */
  const handleCustomerPlantSelection = (plant) => {
    dispatch(setCustomerPlantInput(plant?.name || ""));
    dispatch(setCustomerPlantId(plant?.customerPlantPK || ""));
    dispatch(setPageNumber(0));
    setrepairCustomerPlantFk(plant?.customerPlantPK);
    setShowCustomerPlantLookup(false);
    setRepairLocationName(plant?.name || "");
    setRepairLocationCity(plant?.city || "");
    setRepairLocationState(plant?.stateCode || "");
    setRepairLocationPostal(plant?.postalCode || "");
    setRepairLocationAddress1(plant?.address1 || "");
    setRepairLocationAddress2(plant?.address2 || "");
    setPostalCodePK(plant?.postalCodePK);
  };

  const fetchDamageUnitCode = (string, stringName) => {
    DelayProcessingService.getDelayUnitCodesForAutoComplete(string, stringName).then((response) => {
      const data = response?.data?.content;
      const delayUnitCodeList = data?.map((codeList) => ({
        ...codeList,
        description: codeList.description?.trim(),
      }));
      if (stringName === "damage") setDamagedUnitCodeArray(delayUnitCodeList);
    });
  };

  useEffect(() => {
    if (
      selectedDamageDate &&
      isSelectedDamageDateValid &&
      selectedDamageTime &&
      selectedReportDate &&
      isSelectedReportDateValid &&
      selectedReportTime &&
      damagedUnitCodeID &&
      nameUnder &&
      workOrderNumber &&
      contact &&
      phone &&
      phone?.length === 14
    ) {
      /**enable save if all conditions**/
      dispatch(setValidGeneral(true));
    } else {
      /***disable save***/
      dispatch(setValidGeneral(false));
    }
  }, [
    selectedReportDate,
    isSelectedReportDateValid,
    selectedDamageDate,
    isSelectedDamageDateValid,
    selectedDamageTime,
    selectedReportDate,
    isSelectedReportDateValid,
    selectedReportTime,
    damagedUnitCodeID,
    nameUnder,
    workOrderNumber,
    contact,
    phone,
    driverFK,
  ]);

  return (
    <Form>
      <div className={"p-15 w-100"}>
        <Row className="m-0 p-0">
          <Col sm={6} md={6} xs={6}>
            <Form.Group className="mt-1 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Claim Number</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                {/* <input
                  type="text"
                  className={`customFormControl`}
                  id="description"
                  name="description"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                /> */}

                <input
                  type="text"
                  className="customFormControl"
                  value={claimNumber}
                  onChange={(e) => dispatch(setClaimNumber(e.target.value))}
                  maxLength={30}
                  disabled={viewDetail || (!repaired && !furtherRepairsRequired)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Driver</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="d-flex p-0">
                {viewDetail ? (
                  <input
                    type="text"
                    className="customFormControl"
                    value={driverName}
                    onChange={(e) => dispatch(setDriverName(e.target.value))}
                    maxLength={30}
                    disabled={viewDetail || (!repaired && !furtherRepairsRequired)}
                  />
                ) : (
                  <>
                    <AutoCompleteDropdown
                      disabled={viewDetail || (!repaired && !furtherRepairsRequired)}
                      arrayList={driverList}
                      searchString={driverName}
                      renderItemId={(driver) => driver.driverPK}
                      renderItemField={(driver) => `${driver.firstName} ${driver.lastName || ""}`?.trim()}
                      selectedId={driverFK} // You might need to track selected driver ID
                      handleSearchString={(string) => dispatch(setDriverName(string))}
                      fetchDataBySearchString={(string) => fetchDriversByName(string)}
                      onSelect={handleDriverSelection}
                      clearInputCallback={() => {
                        dispatch(setDriverFK(null));
                      }}
                      placeholder="Search driver..."
                      className={`customFormControl ${!viewDetail && !driverFK ? "borderRed" : "borderGreen"}`}
                    />
                    {/* </Col> */}
                    <LookupButton
                      onClick={handleDriverLookupShow}
                      disabled={viewDetail || (!repaired && !furtherRepairsRequired)}
                    />
                  </>
                )}
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel"> Unit Number</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className="customFormControl"
                  value={unitNumber}
                  onChange={(e) => dispatch(setUnitNumber(e.target.value))}
                  maxLength={30}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel"> VIN</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className="customFormControl"
                  value={vin}
                  onChange={(e) => dispatch(setVin(e.target.value))}
                  maxLength={30}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="col-form-label dealer-label"> Damage Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <DateInputField
                  date={selectedDamageDate}
                  setDate={(value) => {
                    setSelectedDamageDate(value);
                    if (value) {
                      dispatch(setDamageDate(value + "T" + selectedDamageTime));
                    } else {
                      dispatch(setDamageDate(""));
                    }
                  }}
                  dateInput={selectedDamageDateInput}
                  setDateInput={(value) => {
                    setSelectedDamageDateInput(value);
                    if (!value) {
                      setSelectedDamageDate("");
                      dispatch(setDamageDate(""));
                    } else {
                      dispatch(setDamageDate(value + "T" + selectedDamageTime));
                    }
                  }}
                  setIsDateValid={(value) => {
                    if (!value) {
                      dispatch(setDamageDate(""));
                    }
                    setIsSelectedDamageDateValid(value);
                  }}
                  className={`customFormControl ${
                    selectedDamageDate && isSelectedDamageDateValid ? "borderGreen" : "borderRed"
                  }`}
                />
              </Col>
              <Col xs={2} md={2} sm={2} className="p-r-0">
                <input
                  type="text"
                  className={`customFormControl ${selectedDamageTime ? "borderGreen" : "borderRed"}`}
                  id="delayTime"
                  name="delayTime"
                  value={selectedDamageTime}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                  onChange={(e) => {
                    setSelectedDamageTime(e.target.value);
                    const [hour, minute] = e.target.value.split(":").map(Number);
                    if (isNaN(hour) || isNaN(minute) || hour < 1 || hour > 12 || minute < 0 || minute > 59) {
                      dispatch(setDamageDate(""));
                    } else {
                      setDamagePeriod(damagePeriod);
                      updateDelayDateTime(e.target.value, damagePeriod);
                    }
                  }}
                  style={{ width: "65px" }}
                  onKeyDown={(event) => {
                    if (event.key === "Backspace" || event.key === ":") {
                      return;
                    }
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  placeholder="HH:MM"
                  maxLength={5}
                />
              </Col>
              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label className="col-form-label dealer-label">
                  <input
                    type="radio"
                    name="delayAMtimePeriod"
                    value="AM"
                    checked={damagePeriod === "AM"}
                    onClick={(e) => {
                      const [hour, minute] = selectedDamageTime?.split(":")?.map(Number) || [];
                      if (
                        isNaN(hour) ||
                        isNaN(minute) ||
                        hour < 1 ||
                        hour > 12 ||
                        minute < 0 ||
                        minute > 59
                      ) {
                        dispatch(setDamageDate(""));
                      } else {
                        handleAMChange("AM");
                      }
                    }}
                    style={{ marginRight: "1px" }}
                  />
                  &nbsp;AM
                </Form.Label>
              </Col>

              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label className="col-form-label dealer-label">
                  <input
                    type="radio"
                    name="delayPMtimePeriod"
                    value="PM"
                    checked={damagePeriod === "PM"}
                    onClick={(e) => {
                      const [hour, minute] = selectedDamageTime?.split(":")?.map(Number) || [];
                      if (
                        isNaN(hour) ||
                        isNaN(minute) ||
                        hour < 1 ||
                        hour > 12 ||
                        minute < 0 ||
                        minute > 59
                      ) {
                        dispatch(setDamageDate(""));
                      } else {
                        handleAMChange("PM");
                      }
                    }}
                    style={{ marginRight: "1px" }}
                  />
                  &nbsp;PM
                </Form.Label>
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="col-form-label dealer-label">Reported Date</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="p-0">
                <DateInputField
                  date={selectedReportDate}
                  setDate={(value) => {
                    setSelectedReportDate(value);
                    if (value) {
                      dispatch(setReported(value + "T" + selectedReportTime));
                    } else {
                      dispatch(setReported(""));
                    }
                  }}
                  dateInput={selectedReportDateInput}
                  setDateInput={(value) => {
                    setSelectedReportDateInput(value);
                    if (!value) {
                      setSelectedReportDate("");
                      dispatch(setReported(""));
                    }
                  }}
                  setIsDateValid={(value) => {
                    if (!value) {
                      dispatch(setReported(""));
                    }
                    setIsSelectedReportDateValid(value);
                  }}
                  className={`customFormControl ${
                    selectedReportDate && isSelectedReportDateValid ? "borderGreen" : "borderRed"
                  }`}
                />
              </Col>
              <Col xs={2} md={2} sm={2} className="p-r-0">
                <input
                  type="text"
                  className={`customFormControl ${selectedReportTime ? "borderGreen" : "borderRed"}`}
                  id="reportedTime"
                  name="reportedTime"
                  value={selectedReportTime}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                  onChange={(e) => {
                    setSelectedReportTime(e.target.value);
                    const [hour, minute] = e.target.value.split(":")?.map(Number);
                    if (isNaN(hour) || isNaN(minute) || hour < 1 || hour > 12 || minute < 0 || minute > 59) {
                      dispatch(setReported(""));
                    } else {
                      setReportPeriod(reportPeriod);
                      updateReportedDateTime(e.target.value, reportPeriod);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Backspace" || event.key === ":") {
                      return;
                    }
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  placeholder="HH:MM"
                  style={{ width: "65px" }}
                  maxLength={5}
                />
              </Col>
              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label className="col-form-label dealer-label">
                  <input
                    type="radio"
                    name="reportedAMtimePeriod"
                    value="AM"
                    checked={reportPeriod === "AM"}
                    onClick={(e) => {
                      const [hour, minute] = selectedReportTime?.split(":")?.map(Number) || [];
                      if (
                        isNaN(hour) ||
                        isNaN(minute) ||
                        hour < 1 ||
                        hour > 12 ||
                        minute < 0 ||
                        minute > 59
                      ) {
                        dispatch(setReported(""));
                      } else {
                        handleAM1Change("AM");
                      }
                    }}
                    style={{ marginRight: "1px" }}
                  />
                  &nbsp;AM
                </Form.Label>
              </Col>
              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label className="col-form-label dealer-label">
                  <input
                    type="radio"
                    name="reportedPMtimePeriod"
                    value="PM"
                    checked={reportPeriod === "PM"}
                    onClick={(e) => {
                      const [hour, minute] = selectedReportTime?.split(":")?.map(Number) || [];
                      if (
                        isNaN(hour) ||
                        isNaN(minute) ||
                        hour < 1 ||
                        hour > 12 ||
                        minute < 0 ||
                        minute > 59
                      ) {
                        dispatch(setReported(""));
                      } else {
                        handleAM1Change("PM");
                      }
                    }}
                    style={{ marginRight: "1px" }}
                  />
                  &nbsp;PM
                </Form.Label>
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="col-form-label dealer-label"> Damage Code</Form.Label>
              </Col>

              {viewDetail && (
                <Col className={`p-0 d-flex ${!viewDetail ? "visibility-hidden" : ""}`} xs={5} md={5} sm={5}>
                  <input
                    type="text"
                    className={`customFormControl`}
                    id="unitCode"
                    name="unitCode"
                    maxLength={30}
                    value={damagedUnitCodeInput || ""}
                    autoComplete="new-password"
                    aria-autocomplete="new-password"
                    disabled
                  />
                </Col>
              )}

              {!viewDetail && (
                <Col xs={5} className={`p-0 d-flex ${viewDetail ? "visibility-hidden" : ""}`}>
                  <AutoCompleteDropdown
                    arrayList={damagedUnitCodeArray}
                    searchString={damagedUnitCodeInput}
                    renderItemId={(item) => item.delayedUnitCodePK}
                    renderItemField={(item) => item.description}
                    handleSearchString={(string) => dispatch(setDamagedUnitCodeInput(string))}
                    fetchDataBySearchString={(string) => fetchDamageUnitCode(string, "damage")}
                    onSelect={handleDelayUnitCodeLookup}
                    selectedId={damagedUnitCodeID}
                    clearInputCallback={() => {
                      setDamagedUnitCodeID("");
                      dispatch(setDamagedUnitCodeID(null));
                    }}
                    style={`pointer:true`}
                    className={`customFormControl ${
                      damagedUnitCodeID && damagedUnitCodeInput ? "borderGreen" : "borderRed"
                    }`}
                  />
                  <LookupButton onClick={handleLookup} />
                </Col>
              )}
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Customer Damage Contact</Form.Label>
              </Col>

              <Col className="p-0" xs={5}>
                <input
                  type="text"
                  className="customFormControl"
                  value={customerDamageContact}
                  onChange={(e) => dispatch(setCustomerDamageContact(e.target.value))}

                  maxLength={30}
                  disabled={viewDetail || (!repaired && !furtherRepairsRequired)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Customer Damage Phone</Form.Label>
              </Col>

              <Col className="p-0" xs={2}>
                <input
                  type="text"
                  className="customFormControl"
                  value={customerDamagePhone}
                  onChange={(e) => dispatch(setCustomerDamagePhone(e.target.value))}
                  maxLength={30}
                  disabled={viewDetail || (!repaired && !furtherRepairsRequired)}
                />
              </Col>

              <Col className="p-0 ms-2" xs={1} style={{ width: "50px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={damageContact}
                  onChange={(e) => dispatch(setCustomerDamageContact(e.target.value))}
                  maxLength={30}
                  disabled={viewDetail || (!repaired && !furtherRepairsRequired)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Customer Damage FAX</Form.Label>
              </Col>

              <Col className="p-0" xs={2}>
                <input
                  type="text"
                  className="customFormControl"
                  value={damageContactFAX}
                  onChange={(e) => dispatch(setDamageContactFAX(e.target.value))}
                  maxLength={30}
                  disabled={viewDetail || (!repaired && !furtherRepairsRequired)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Repaired</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  checked={repaired || false} // Use the Redux state, default to false if undefined
                  onChange={(e) => dispatch(setRepaired(e.target.checked))} // Update Redux state
                  disabled={viewDetail || (!repaired && !furtherRepairsRequired)} // Disable in view mode
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Repair Date</Form.Label>
              </Col>

              <Col className="p-0" xs={2}>
                <DateInputField
                  disabled={viewDetail || (!repaired && !furtherRepairsRequired)}
                  date={repairDate}
                  setDate={(value) => {
                    dispatch(setRepairDate(value));
                  }}
                  setIsDateValid={(value) => {}}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className=" customColFormLabel">Further Repairs Required</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="email"
                  name="email"
                  checked={furtherRepairsRequired || false}
                  disabled={viewDetail || (!repaired && !furtherRepairsRequired)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className=" customColFormLabel">Delivery Terminated</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  id="email"
                  name="email"
                  checked={deliveryTerminated || false}
                  disabled={viewDetail || (!repaired && !furtherRepairsRequired)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group align-items-center row m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Status</Form.Label>
              </Col>

              <Col className="p-0" xs={2}>
                <input
                  type="text"
                  className="customFormControl"
                  value={status}
                  onChange={(e) => dispatch(setStatus(e.target.value))}
                  maxLength={30}
                  disabled={!repaired && !furtherRepairsRequired}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Status Comment</Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  type="text"
                  className="customFormControl"
                  value={statusComment}
                  onChange={(e) => dispatch(setStatusComment(e.target.value))}
                  maxLength={30}
                  disabled={viewDetail || (!repaired && !furtherRepairsRequired)}
                />
              </Col>
            </Form.Group>
          </Col>

          <Col sm={6} md={6} xs={6}>
            {/* Empty Tag for Styling */}
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 invisible">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className=" customColFormLabel"></Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="driverName"
                  name="driverName"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                />
              </Col>
            </Form.Group>

            {viewDetail && (
              <>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" customColFormLabel">Damage At Pickup</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      checked={damageAtPickup || false} // Use the Redux state, default to false if undefined
                      onChange={(e) => dispatch(setDamageAtPickup(e.target.checked))} // Update Redux state
                      disabled={viewDetail || (!repaired && !furtherRepairsRequired)} // Disable in view mode
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" customColFormLabel">Damage In Yard</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      checked={damageInYard || false} // Use the Redux state, default to false if undefined
                      onChange={(e) => dispatch(setDamageInYard(e.target.checked))} // Update Redux state
                      disabled={viewDetail || (!repaired && !furtherRepairsRequired)} // Disable in view mode
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Damage Location</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="description"
                      name="description"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled={viewDetail || (!repaired && !furtherRepairsRequired)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0" />
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="description"
                      name="description"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled={viewDetail || (!repaired && !furtherRepairsRequired)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0" />

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="description"
                      name="description"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled={viewDetail || (!repaired && !furtherRepairsRequired)}
                    />
                  </Col>
                </Form.Group>

                <PostalCodeComponent hideLabel disabled />
              </>
            )}

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className=" customColFormLabel">At Repair Location</Form.Label>
              </Col>
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  disabled={viewDetail || (!repaired && !furtherRepairsRequired)}
                  onChange={(e) => {
                    const value = e.target.checked;
                    dispatch(setAtRepairLocation(value));
                    if (!value) {
                      //resttt all below fields---addd
                    }
                  }}
                />
              </Col>
            </Form.Group>

            {!viewDetail && (
              <>
                <Form.Group className="form-group m-t-20 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Dealer</Form.Label>
                  </Col>

                  <Col xs={7} md={5} sm={7} className="p-0 d-flex" style={{ width: "275px" }}>
                    {/* Dealer Autocomplete */}
                    <AutoCompleteDropdown
                      arrayList={dealersList}
                      searchString={dealerInput}
                      renderItemId={(dealer) => dealer.dealerPK}
                      renderItemField={(dealer) => dealer.name}
                      selectedId={dealerId}
                      handleSearchString={(string) => dispatch(setDealerInput(string))}
                      fetchDataBySearchString={fetchDealerByName}
                      onSelect={handleDealerSelection}
                      clearInputCallback={() => {
                        dispatch(setDealerId(null));
                        dispatch(setPageNumber(0));
                      }}
                      className={`${
                        !customerPlantId &&
                        atRepairLocation &&
                        (!repairLocationName || !repairLocationAddress1 || !postalCodePK)
                          ? (dealerId === "" || dealerId === null) && dealerInput === ""
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }`}
                      // towardsTop
                    />
                    <LookupButton
                      onClick={() => setShowDealerLookup(true)}
                      disabled={
                        customerPlantInput ||
                        !atRepairLocation ||
                        (repairLocationName && repairLocationAddress1 && postalCodePK)
                      }
                    />
                    {/* Dealer Lookup Modal */}
                    <DealerLookup
                      show={showDealerLookup}
                      onHide={() => setShowDealerLookup(false)}
                      renderItemId={(dealer) => dealer.dealerPK}
                      handleLookupSelection={handleDealerSelection}
                      delay
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-20 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Plant</Form.Label>
                  </Col>

                  <Col xs={7} md={5} sm={7} className="p-0 d-flex" style={{ width: "275px" }}>
                    {/* Customer Plant Autocomplete */}
                    <AutoCompleteDropdown
                      disabled={
                        dealerInput ||
                        !atRepairLocation ||
                        (repairLocationName && repairLocationAddress1 && postalCodePK)
                      }
                      arrayList={plantsList}
                      searchString={customerPlantInput}
                      renderItemId={(plant) => plant.customerPlantPK}
                      renderItemField={(plant) => plant.name}
                      selectedId={customerPlantId}
                      handleSearchString={(string) => dispatch(setCustomerPlantInput(string))}
                      fetchDataBySearchString={fetchAllPlantdetailsByName}
                      onSelect={handleCustomerPlantSelection}
                      clearInputCallback={() => {
                        dispatch(setCustomerPlantId(null));
                        dispatch(setPageNumber(0));
                      }}
                      className={`${
                        !dealerId &&
                        atRepairLocation &&
                        (!repairLocationName || !repairLocationAddress1 || !postalCodePK)
                          ? (customerPlantId === "" || customerPlantId === null) && customerPlantInput === ""
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }`}
                    />
                    <LookupButton
                      onClick={() => setShowCustomerPlantLookup(true)}
                      disabled={
                        dealerInput ||
                        !atRepairLocation ||
                        (repairLocationName && repairLocationAddress1 && postalCodePK)
                      }
                    />
                    {/* Customer Plant Lookup Modal */}
                    <CustomerPlantsLookup
                      show={showCustomerPlantLookup}
                      onHide={() => setShowCustomerPlantLookup(false)}
                      renderItemId={(plant) => plant.customerPlantPK}
                      handleLookupSelection={handleCustomerPlantSelection}
                      yardCheckin
                    />
                  </Col>
                </Form.Group>

                {/* Empty Tag for Styling */}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 invisible">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" customColFormLabel"></Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="driverName"
                      name="driverName"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled={viewDetail || (!repaired && !furtherRepairsRequired) || !atRepairLocation}
                    />
                  </Col>
                </Form.Group>
              </>
            )}

            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Repair Location</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="description"
                  name="description"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                  disabled={
                    viewDetail ||
                    (!repaired && !furtherRepairsRequired) ||
                    !atRepairLocation ||
                    (!repairDealerID && !repairDealerID)
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0" />
              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="description"
                  name="description"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                  disabled={
                    viewDetail ||
                    (!repaired && !furtherRepairsRequired) ||
                    !atRepairLocation ||
                    (!repairDealerID && !repairDealerID)
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0" />

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl`}
                  id="description"
                  name="description"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                  disabled={
                    viewDetail ||
                    (!repaired && !furtherRepairsRequired) ||
                    !atRepairLocation ||
                    (!repairDealerID && !repairDealerID)
                  }
                />
              </Col>
            </Form.Group>

            <PostalCodeComponent
              hideLabel
              disabled={
                viewDetail ||
                (!repaired && !furtherRepairsRequired) ||
                !atRepairLocation ||
                (!repairDealerID && !repairDealerID)
              }
            />

            {!viewDetail && (
              <>
                {/* Empty Tag for Styling */}
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 invisible">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" customColFormLabel"></Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      id="driverName"
                      name="driverName"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled={viewDetail || (!repaired && !furtherRepairsRequired) || !atRepairLocation}
                    />
                  </Col>
                </Form.Group>
              </>
            )}

            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Name Under</Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  type="text"
                  className={`customFormControl ${
                    viewDetail || (!repaired && !furtherRepairsRequired) || !atRepairLocation
                      ? ""
                      : atRepairLocation && nameUnder
                        ? "borderGreen"
                        : "borderRed"
                  }`}
                  value={nameUnder}
                  onChange={(e) => dispatch(setNameUnder(e.target.value))}
                  maxLength={30}
                  disabled={viewDetail || (!repaired && !furtherRepairsRequired) || !atRepairLocation}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Work Order Number</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl ${
                    viewDetail || (!repaired && !furtherRepairsRequired) || !atRepairLocation
                      ? ""
                      : atRepairLocation && workOrderNumber
                        ? "borderGreen"
                        : "borderRed"
                  }`}
                  value={workOrderNumber}
                  onChange={(e) => dispatch(setWorkOrderNumber(e.target.value))}
                  maxLength={30}
                  disabled={viewDetail || (!repaired && !furtherRepairsRequired) || !atRepairLocation}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Contact</Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  type="text"
                  className={`customFormControl ${
                    viewDetail || (!repaired && !furtherRepairsRequired) || !atRepairLocation
                      ? ""
                      : atRepairLocation && contact
                        ? "borderGreen"
                        : "borderRed"
                  }`}
                  value={contact}
                  onChange={(e) => dispatch(setContact(e.target.value))}
                  maxLength={30}
                  disabled={viewDetail || (!repaired && !furtherRepairsRequired) || !atRepairLocation}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group align-items-center row  m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Phone</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="text"
                  className={`customFormControl ${
                    viewDetail || (!repaired && !furtherRepairsRequired) || !atRepairLocation
                      ? ""
                      : atRepairLocation && phoneRegex.test(phone)
                        ? "borderGreen"
                        : "borderRed"
                  }`}
                  value={phone}
                  onChange={(e) => dispatch(setPhone(formatPhoneNumber(e.target.value)))}
                  maxLength={14}
                  disabled={viewDetail || (!repaired && !furtherRepairsRequired) || !atRepairLocation}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
      <DriverLookup
        show={showDriverLookup}
        onHide={handleDriverLookupHide}
        renderItemId={(driver) => driver.driverPK}
        handleLookupSelection={handleDriverLookupSelection}
        MaintenanceProgram
        showActiveOnly
      />
    </Form>
  );
};

export default General;
