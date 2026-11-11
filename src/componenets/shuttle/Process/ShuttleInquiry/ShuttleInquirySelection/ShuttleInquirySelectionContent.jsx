import { parseLocalDate } from "../../../../../utils/dateUtils";
import { Col, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import ShuttleInquiryService from "../../../../../services/shuttle/process/ShuttleInquiryService";
import LookupButton from "../../../../common/LookupButton";
import ShuttleCitysService from "../../../../../services/ShuttleCitysService";
import YardService from "../../../../../services/YardService";
import ShuttleCityLookup from "../../../../LookupScreens/ShuttleCity/ShuttleCityLookup";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import YardLookup from "../../../../LookupScreens/Yard/YardLookup";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";

import {
  setLoader,
  setShuttleSearchObject,
  setTotalPages,
  setPageNumber,
  setSortFieldName,
  setSortFlag,
  resetChanges,
  setExportObject,
  setIsDateValid,
} from "../../../../../redux/ShuttleInquirySlice";
import UnitSelectionLookup from "../../../../LookupScreens/UnitSelection/UnitSelectionLookup";
import DriverLookup from "../../../../LookupScreens/Driver/DriverLookup";
import DateInputField from "../../../../common/DateInputField";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
import CustomerPlantMaintenanceService from "../../../../../services/CustomerPlantMaintenanceService";
import { HalfScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import CommonReportService from "../../../../../services/Reports/CommonReportService";
import toast from "react-hot-toast";
import PreviewPopup from "../../../../common/PreviewPopup";
import LoadingIcon from "../../../../common/LoadingIcon";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";

function ShuttleInquirySelectionContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [driverNames, setDriverNames] = useState([]);
  const [driverNameInput, setDriverNameInput] = useState("");
  const [selectedDriverFK, setSelectedDriverFK] = useState("");
  const [selectedDriverOjbect, setSelectedDriverOjbect] = useState(null);

  const [pickupCities, setPickupCities] = useState([]);
  const [pickupCityInput, setPickupCityInput] = useState("");
  const [selectedShuttleCityID, setSelectedShuttleCityID] = useState("");

  const [deliveryYard, setDeliveryYard] = useState([]);
  const [deliveryYardInput, setDeliveryYardInput] = useState("");
  const [selectedDeliveryYardID, setSelectedDeliveryYardID] = useState("");

  const [allPlants, setAllPlants] = useState([]);
  const [selectedPlantInput, setSelectedPlantInput] = useState("");
  const [selectedPlantID, setSelectedPlantID] = useState("");

  const [allUnitNumbers, setAllUnitNumbers] = useState([]);
  const [selectedUnitPK, setSelectedUnitPK] = useState(null);
  const [unitNumberInput, setUnitNumberInput] = useState("");
  const [unitNumberLast5, setUnitNumberLast5] = useState("");
  const [unitNumberLoading, setUnitNumberLoading] = useState(false);
  const [unitNumberPageLoading, setUnitNumberPageLoading] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [companyLoading, setCompanyLoading] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDateType, setSelectedDateType] = useState("All");

  const [cityToYard, setCityToYard] = useState(true);
  const [yardToCity, setYardToCity] = useState(true);
  const [yardToYard, setYardToYard] = useState(true);
  const [plantToPlant, setPlantToPlant] = useState(true);
  const [dryRun, setDryRun] = useState(true);
  const [bonus, setBonus] = useState(true);

  /**Look ups show/hide */
  const [driverLookUpShow, setDriverLookUpShow] = useState(false);
  const [yardLookupShow, setYardLookupShow] = useState(false);
  const [plantLookupShow, setPlantLookupShow] = useState(false);
  const [shuttleCityLookUpShow, setShuttleCityLookUpShow] = useState(false);
  const [warningPopup, setWarningPopup] = useState(false);
  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [companyFK, setCompanyFK] = useState("");
  const [currentCompanyName, setCurrentCompanyName] = useState("");
  const [showError, setShowError] = useState("");
  const [currentCompanyId, setCurrentCompanyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [driverLoading, setDriverLoading] = useState(false);
  const [yardLoading, setYardLoading] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);
  const [plantLoading, setPlantLoading] = useState(false);

  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState();
  const [exportLoading, setExportLoading] = useState(false);
  const [isBeginDateValid, setIsBeginDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);

  const pageNumber = useSelector((state) => state.shuttleInquiryReducer.pageNumber);
  const sortFieldName = useSelector((state) => state.shuttleInquiryReducer.sortFieldName);
  const sortFlag = useSelector((state) => state.shuttleInquiryReducer.sortFlag);
  const exportObject = useSelector((state) => state.shuttleInquiryReducer.exportObject);
  let shuttleSearchObjectFromRedux = useSelector((state) => state.shuttleInquiryReducer.shuttleSearchObject);

  useEffect(() => {
    getAllCompanyNames();
  }, []);

  useEffect(() => {
    if (selectedDriverFK || companyName || unitNumberLast5)
      // added this for alpha release bug fix
      getAllUnitNumbers(unitNumberInput, unitNumberLast5, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDriverFK, companyName, unitNumberLast5]);

  /**For validation in right hand side */
  useEffect(() => {
    if (cityToYard || yardToCity || yardToYard || plantToPlant || dryRun || bonus) {
      setShowError("");
    } else {
      setShowError("Select atleast one option from righthand side");
    }
  }, [cityToYard, yardToCity, yardToYard, plantToPlant, dryRun, bonus]);

  useEffect(() => {
    if (shuttleSearchObjectFromRedux) {
      setSelectedDriverFK(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.driverFK
          ? shuttleSearchObjectFromRedux.driverFK
          : ""
      );
      setDriverNameInput(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.driverNameInput
          ? shuttleSearchObjectFromRedux.driverNameInput
          : ""
      );

      setSelectedUnitPK(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.selectedUnitPK
          ? shuttleSearchObjectFromRedux.selectedUnitPK
          : ""
      );

      setUnitNumberInput(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.unitNumberInput
          ? shuttleSearchObjectFromRedux.unitNumberInput
          : ""
      );
      setUnitNumberLast5(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.unitNumberLast5
          ? shuttleSearchObjectFromRedux.unitNumberLast5
          : ""
      );

      setStartDate(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.startDate
          ? shuttleSearchObjectFromRedux.startDate
          : ""
      );
      setEndDate(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.endDate
          ? shuttleSearchObjectFromRedux.endDate
          : ""
      );
      setSelectedDateType(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.dateSelection
          ? shuttleSearchObjectFromRedux.dateSelection
          : "All"
      );

      setSelectedDeliveryYardID(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.selectedDeliveryYardID
          ? shuttleSearchObjectFromRedux.selectedDeliveryYardID
          : ""
      );
      setDeliveryYardInput(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.deliveryYardInput
          ? shuttleSearchObjectFromRedux.deliveryYardInput
          : ""
      );

      setSelectedShuttleCityID(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.selectedShuttleCityID
          ? shuttleSearchObjectFromRedux.selectedShuttleCityID
          : ""
      );
      setPickupCityInput(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.pickupCityInput
          ? shuttleSearchObjectFromRedux.pickupCityInput
          : ""
      );

      setSelectedPlantID(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.selectedPlantID
          ? shuttleSearchObjectFromRedux.selectedPlantID
          : ""
      );
      setSelectedPlantInput(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.selectedPlantInput
          ? shuttleSearchObjectFromRedux.selectedPlantInput
          : ""
      );

      setCityToYard(
        shuttleSearchObjectFromRedux
          ? shuttleSearchObjectFromRedux.cityToYard
            ? shuttleSearchObjectFromRedux.cityToYard
            : false
          : true
      );
      setYardToCity(
        shuttleSearchObjectFromRedux
          ? shuttleSearchObjectFromRedux.yardToCity
            ? shuttleSearchObjectFromRedux.yardToCity
            : false
          : true
      );
      setYardToYard(
        shuttleSearchObjectFromRedux
          ? shuttleSearchObjectFromRedux.yardToYard
            ? shuttleSearchObjectFromRedux.yardToYard
            : false
          : true
      );
      setPlantToPlant(
        shuttleSearchObjectFromRedux
          ? shuttleSearchObjectFromRedux.plantToPlant
            ? shuttleSearchObjectFromRedux.plantToPlant
            : false
          : true
      );
      setDryRun(
        shuttleSearchObjectFromRedux
          ? shuttleSearchObjectFromRedux.dryRun
            ? shuttleSearchObjectFromRedux.dryRun
            : false
          : true
      );
      setBonus(
        shuttleSearchObjectFromRedux
          ? shuttleSearchObjectFromRedux.bonus
            ? shuttleSearchObjectFromRedux.bonus
            : false
          : true
      );

      setCompanyFK(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.companyFK
          ? shuttleSearchObjectFromRedux.companyFK
          : ""
      );
      setCompanyName(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.companyName
          ? shuttleSearchObjectFromRedux.companyName
          : ""
      );
      setCurrentCompanyId(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.currentCompanyId
          ? shuttleSearchObjectFromRedux.currentCompanyId
          : ""
      );
      setCurrentCompanyName(
        shuttleSearchObjectFromRedux && shuttleSearchObjectFromRedux.currentCompanyName
          ? shuttleSearchObjectFromRedux.currentCompanyName
          : ""
      );
    }
  }, [shuttleSearchObjectFromRedux]);

  const navigateToHome = () => {
    dispatch(setPageNumber(0));
    dispatch(setTotalPages(0));
    dispatch(setPageNumber(0));
    dispatch(setSortFieldName(""));
    dispatch(setSortFlag(false));
    dispatch(resetChanges());
    setShowError("");
    navigate("/");
  };

  const resetValues = () => {
    dispatch(resetChanges());
    getAllCompanyNames();

    setDriverNameInput("");
    setSelectedDriverFK(null);
    setPickupCityInput("");
    setSelectedShuttleCityID(null);
    setDeliveryYardInput("");
    setSelectedDeliveryYardID(null);
    setSelectedPlantInput("");
    setSelectedPlantID(null);
    setSelectedUnitPK(null);
    setUnitNumberInput("");
    setStartDate("");
    setEndDate("");
    setSelectedDateType("All");
    setSelectedDriverOjbect(null);

    setCityToYard(true);
    setYardToCity(true);
    setYardToYard(true);
    setPlantToPlant(true);
    setDryRun(true);
    setBonus(true);
    setUnitNumberLast5("");

    setCurrentCompanyId("");
    setCurrentCompanyName("");
  };
  const handleCancel = () => {
    resetValues(); //reset redux  & local values
  };
  //get all the drivers which starts with the passed string
  const fetchDriverByName = (string) => {
    setDriverLoading(true);
    ShuttleInquiryService.getAllDriversForAutocomplete(string)
      .then((response) => {
        const data = response.data.content;

        setDriverNames(data);

        setDriverLoading(false);
      })
      .catch((error) => {
        setDriverLoading(false);
      });
  };

  const warningPopupModalHide = () => {
    setWarningPopup(false);
  };

  const handleDriverLookupModalShow = () => {
    setDriverLookUpShow(true);
  };

  const handleDriverLookupModalHide = () => {
    setDriverLookUpShow(false);
  };
  const handleUnitLookupModalHide = () => {
    setShowUnitSelectionLookup(false);
  };
  /**
   * used for Driver selection Lookup & AutoComplete- onSelect
   */
  const handleDriverLookupDropDownSelection = (driver) => {
    setDriverNameInput(driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : ""));
    setSelectedDriverFK(driver.driverPK);
    setSelectedDriverOjbect(driver);
    setUnitNumberInput("");
    setSelectedUnitPK("");
    setUnitNumberLast5("");
    setDriverLookUpShow(false);
  };

  /****** Pickup City dropdown and lookup ******/
  //Service for getting all Pickup Cities
  const fetchPickupCities = (string) => {
    setCityLoading(true);
    ShuttleCitysService.getShuttleCitysForAutoComplete(string)
      .then((response) => {
        const data = response.data?.content;
        const cityList = data?.map((cities) => ({ ...cities, city: cities.city?.trim() }));

        setPickupCities(cityList);
        setCityLoading(false);
      })
      .catch((error) => {
        setCityLoading(false);
      });
  };
  /**
   * used for Pickup Plant Autocomplete Dropdown
   */

  const fetchAllPlants = (searchString) => {
    setPlantLoading(true);
    CustomerPlantMaintenanceService.fetchAllPlantdetailsByName(searchString)
      .then((response) => {
        const data = response.data?.content;
        const plantList = data?.map((plant) => ({ ...plant, name: plant.name?.trim() }));

        setAllPlants(plantList);
        setPlantLoading(false);
      })
      .catch((err) => {
        setPlantLoading(false);
      });
  };

  //Handle selection from delivery yard lookup screen
  const handlePlantLookupSelection = (plant) => {
    setSelectedPlantID(plant.customerPlantPK);
    setSelectedPlantInput(plant.name);
    setPlantLookupShow(false);
  };
  //Enable Plant  lookup
  const handlePlantLookupModalShow = () => {
    setPlantLookupShow(true);
  };

  //Disable shuttle city lookup
  const handlePlantLookupModalHide = () => {
    setPlantLookupShow(false);
  };

  const handlePlantSelectionFromDropdown = (plant) => {
    setSelectedPlantID(plant.customerPlantPK);
    setSelectedPlantInput(plant.name);
  };

  //Handle selection from pickup city dropdown
  const handleShuttleCitySelectionFromDropdown = (shuttleCity) => {
    setSelectedShuttleCityID(shuttleCity.shuttleCityPK);
    setPickupCityInput(shuttleCity.city);
  };

  //Enable shuttle city lookup
  const handleShuttleCityLookupModalShow = () => {
    setShuttleCityLookUpShow(true);
  };

  //Disable shuttle city lookup
  const handleShuttleCityLookupModalHide = () => {
    setShuttleCityLookUpShow(false);
  };

  //Handle selection from shuttle city look up screen
  const handleShuttleCityLookupSelection = (shuttleCity) => {
    setSelectedShuttleCityID(shuttleCity.shuttleCityPK);
    setPickupCityInput(shuttleCity.city);
    setShuttleCityLookUpShow(false);
  };

  /****** Delivery Yard dropdown and lookup ******/
  //Service for getting all Yards
  const fetchDeliveryYard = (string) => {
    setYardLoading(true);
    YardService.getAllYardsForAutoComplete(string)

      .then((response) => {
        const data = response.data.content;
        const yardList = data?.map((yard) => ({ ...yard, description: yard.description?.trim() }));
        setDeliveryYard(yardList);
        setYardLoading(false);
      })
      .catch((error) => {
        setYardLoading(false);
      });
  };

  //Handle selection from delivery yard dropdown
  const handleDeliveryYardSelectionFromDropdown = (deliveryYard) => {
    setSelectedDeliveryYardID(deliveryYard.yardPK);
    setDeliveryYardInput(deliveryYard.description);
  };

  //Handle selection from delivery yard lookup screen
  const handleYardLookupSelection = (deliveryYard) => {
    setSelectedDeliveryYardID(deliveryYard.yardPK);
    setDeliveryYardInput(deliveryYard.description);
    setYardLookupShow(false);
  };

  //Enable delivery yard lookup
  const handleYardLookupModalShow = () => {
    setYardLookupShow(true);
  };

  //Disable delivery yard lookup
  const handleYardLookupModalHide = () => {
    setYardLookupShow(false);
  };
  //Fetch all Unit Number for Browse List
  const handleUnitNumberSelectionFromDropdown = (unit) => {
    setSelectedUnitPK(unit?.unitPK);
    setUnitNumberInput(unit?.unitNumber);
  };

  //Fetch all Unit Number for Auto Complete dropdown
  const getAllUnitNumbers = (unitNumber, last5, showPageLoader = false) => {
    setUnitNumberLoading(true);
    if (showPageLoader) setUnitNumberPageLoading(true);
    ShuttleInquiryService.getAllUnitNumbers(
      unitNumber,
      last5,
      selectedDriverFK,
      companyName,
      currentCompanyName,
      pageNumber,
      100
    )
      .then((response) => {
        const data = response.data.content;
        setAllUnitNumbers(data);

        if (last5?.length > 0) {
          if (data?.length === 1) {
            setSelectedUnitPK(data[0]?.unitPK);
          } else {
            setSelectedUnitPK(null);
            setUnitNumberInput("");
          }
        }
        setUnitNumberLoading(false);
      })
      .catch((error) => {
        dispatch(setLoader(false));
        setUnitNumberLoading(false);
      })
      .finally(() => {
        if (showPageLoader) setUnitNumberPageLoading(false);
      });
  };
  /**
   *  Fetch all companies
   **/

  const getAllCompanyNames = () => {
    setCompanyLoading(true);
    DelayProcessingService.getAllCompanyData()
      .then((res) => {
        if (res?.data) {
          setCompanyList(res?.data);

          if (!shuttleSearchObjectFromRedux) {
            const value = res?.data?.find((item) => item.LocalCompany === true);
            setCurrentCompanyName(value.Name);
            setCurrentCompanyId(value.CompanyPK);

            setCompanyFK(value.CompanyPK);
            setCompanyName(value.Name);
          }
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setCompanyLoading(false));
  };

  //do the listing
  const handleListButton = () => {
    dispatch(resetChanges());
    dispatch(
      setShuttleSearchObject({
        driverFK: selectedDriverFK,
        driverNameInput: driverNameInput,

        unitFK: selectedUnitPK,
        selectedUnitPK: selectedUnitPK,
        unitNumberLast5: unitNumberLast5,
        unitNumberInput: unitNumberInput,

        startDate: startDate,
        endDate: endDate,
        dateSelection: selectedDateType,

        yardFK: selectedDeliveryYardID,
        deliveryYardInput: deliveryYardInput,
        selectedDeliveryYardID: selectedDeliveryYardID,

        cityFK: selectedShuttleCityID,
        pickupCityInput: pickupCityInput,
        selectedShuttleCityID: selectedShuttleCityID,

        plantFK: selectedPlantID,
        selectedPlantInput: selectedPlantInput,
        selectedPlantID: selectedPlantID,

        cityToYard: cityToYard,
        yardToCity: yardToCity,
        yardToYard: yardToYard,
        plantToPlant: plantToPlant,
        dryRun: dryRun,
        bonus: bonus,

        companyName: companyName,
        companyFK: companyFK,
        currentCompanyId: currentCompanyId,
        currentCompanyName: currentCompanyName,
      })
    );

    navigate("/shuttle-inquiry-browse");
  };

  const handlePrintPdf = (type, format) => {
    dispatch(resetChanges());
    const payload = {
      DriverPK: selectedDriverFK || null,
      UnitLast5: unitNumberLast5 || null,
      UnitNumber: unitNumberInput || null,
      CompanyPK: companyFK || null,
      FromDate: startDate || null,
      ToDate: endDate || null,
      DateFilter: selectedDateType || null,
      PlantFK: selectedPlantID || null,
      YardFK: selectedDeliveryYardID || null,
      CityFK: selectedShuttleCityID || null,
      CityToYard: cityToYard,
      YardToCity: yardToCity,
      YardToYard: yardToYard,
      PlantToPlant: plantToPlant,
      DryRun: dryRun,
      Bonus: bonus,
      ExportFlag: format,
    };
    setExportLoading(true);
    CommonReportService.getReport(12, payload, type)
      .then(({ data }) => {
        if (data.errorCode === 1) {
          toast.error(data.errorMessage);
        } else {
          toast.success(data.errorMessage);
          if (data.fileContent) {
            setShowPreview(true);
            setBase64PDF(data.fileContent);
          }
        }
      })
      .finally(() => {
        setExportLoading(false);
      });
  };

  // function to handle radio button selection
  const handleOptionChange = (option) => {
    setSelectedDateType(option);
    if (option === "All") {
      setStartDate("");
      setEndDate("");
    }
  };

  /**
   * Unit Number Autocomplete & Lookup Handle function On select
   **/
  const handleUnitNumberSelection = (unit) => {
    setUnitNumberLast5("");
    setSelectedUnitPK(unit?.unitPK);
    setUnitNumberInput(unit?.unitNumber);
    setShowUnitSelectionLookup(false);
  };
  useEffect(() => {
    if (!isBeginDateValid || !isEndDateValid) {
      dispatch(setIsDateValid(false));
    } else {
      dispatch(setIsDateValid(true));
    }
  }, [isBeginDateValid, isEndDateValid]);

  return (
    <div>
      {(exportLoading || companyLoading || unitNumberPageLoading) && <LoadingIcon />}
      <div>
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={navigateToHome}
          >
            Close
          </button>
        </div>

        <div className="col-xs-6"></div>
      </div>
      <div className="p-2 ">
        <div className="shadow-sm rounded border halfScreenFormContentHeight">
          <div className="p-15 d-flex mt-5 mb-3 ">
            <Col xs={6} className="p-3 text-start">
              <Form.Group className="mt-4 form-group  align-items-left row  m-l-0 m-r-0">
                <Col xs={2} sm={2} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Driver</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={driverNames}
                    searchString={driverNameInput}
                    renderItemId={(driver) => driver.driverPK}
                    renderItemField={(driver) =>
                      driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : "")
                    }
                    handleSearchString={(string) => setDriverNameInput(string)}
                    fetchDataBySearchString={fetchDriverByName}
                    selectedId={selectedDriverFK}
                    loading={driverLoading}
                    onSelect={handleDriverLookupDropDownSelection}
                    clearInputCallback={() => {
                      setSelectedDriverFK("");
                      setSelectedDriverOjbect(null);
                    }}
                    className={`${selectedDriverFK === "" && driverNameInput !== "" ? "borderRed" : ""}`}
                  />
                  <LookupButton onClick={handleDriverLookupModalShow} />
                </Col>
              </Form.Group>

              <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
                <Col xs={2} sm={2} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    Last 5
                  </Form.Label>
                </Col>

                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    className="customFormControl"
                    name="unitNumberLast5"
                    type="text"
                    maxLength={5}
                    value={unitNumberLast5}
                    onChange={(e) => {
                      let input = e.target.value;
                      // Limit the input to a maximum of 5 characters
                      const truncatedInput = input.slice(0, 5);
                      setUnitNumberLast5(truncatedInput);
                      setSelectedUnitPK(null);
                      setUnitNumberInput("");
                    }}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled={unitNumberInput}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={2} sm={2} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Unit Number</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className="p-0 d-flex">
                  {/* Unit Number Autocomplete */}
                  <AutoCompleteDropdown
                    arrayList={allUnitNumbers}
                    searchString={unitNumberInput}
                    renderItemId={(units) => units.unitPK}
                    renderItemField={(units) => (units.unitNumber ? units.unitNumber : "")}
                    handleSearchString={(string) => setUnitNumberInput(string)}
                    fetchDataBySearchString={(string) => getAllUnitNumbers(string, "")}
                    selectedId={selectedUnitPK}
                    onSelect={handleUnitNumberSelectionFromDropdown}
                    clearInputCallback={() => {
                      setSelectedUnitPK(null);
                    }}
                    className={`${selectedUnitPK === null && unitNumberInput !== "" ? "borderRed" : ""}`}
                    loading={unitNumberLoading}
                    disabled={unitNumberLast5}
                  />
                  <LookupButton onClick={() => setShowUnitSelectionLookup(true)} />
                </Col>
              </Form.Group>
              {/* Company Dropdown */}
              <Form.Group className="my-3 form-group m-b-10 align-items-center row  m-l-0 m-r-0">
                <Col xs={2} sm={2} className="p-0">
                  <Form.Label className="customColFormLabel me-4">Company</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className="p-0 d-flex">
                  <Form.Select
                    className="customFormControl p-"
                    value={`${companyFK}-${companyName}`}
                    onChange={(e) => {
                      const [companyId, companyName] = e.target.value.split("-");

                      setCompanyFK(companyId);
                      setCompanyName(companyName);

                      setUnitNumberInput("");
                      setUnitNumberLast5("");
                      setSelectedUnitPK(null);
                    }}
                  >
                    {companyList?.map((item) => (
                      <option key={item.CompanyPK} value={`${item.CompanyPK}-${item.Name}`}>
                        {item.Name.toUpperCase()}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group className="mt-4  align-items-center d-flex  m-l-0 m-r-0">
                <Col xs={2} sm={2} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4">
                    From
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0 " style={{ width: "95px" }}>
                  <DateInputField
                    date={startDate}
                    setIsDateValid={setIsBeginDateValid}
                    reduxSetDate={(value) => setStartDate(value)}
                    disabled={selectedDateType === "All" ? true : false}
                    max={endDate ? parseLocalDate(endDate) : new Date()}
                    className={`${
                      startDate !== "" && !isBeginDateValid
                        ? "borderRed"
                        : startDate === "" && selectedDateType !== "All"
                          ? "borderRed"
                          : selectedDateType !== "All"
                            ? "borderGreen"
                            : ""
                    }`}
                  />
                </Col>

                <Col xs={1} className="text-center">
                  To
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0 " style={{ width: "95px" }}>
                  <DateInputField
                    date={endDate}
                    setIsDateValid={setIsEndDateValid}
                    reduxSetDate={(value) => setEndDate(value)}
                    disabled={selectedDateType === "All" ? true : false}
                    min={startDate ? parseLocalDate(startDate) : ""}
                    max={new Date()}
                    className={`${
                      endDate !== "" && !isEndDateValid
                        ? "borderRed"
                        : endDate === "" && selectedDateType !== "All"
                          ? "borderRed"
                          : selectedDateType !== "All"
                            ? "borderGreen"
                            : ""
                    }`}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0 ms-0">
                <Col xs={2} sm={2} className="p-0 text-start">
                  <Form.Label className={` col-form-label me-4`}>Date</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className={`p-0 d-flex`}>
                  <CustomRadioGroup
                    horizontal
                    options={["Entry", "Post", "Paid", "Shuttle", "All"]}
                    selectedOption={selectedDateType}
                    onChange={handleOptionChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={2} sm={2} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Yard</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={deliveryYard}
                    searchString={deliveryYardInput}
                    renderItemId={(deliveryYard) => deliveryYard.yardPK}
                    renderItemField={(deliveryYard) => deliveryYard.description}
                    handleSearchString={(string) => setDeliveryYardInput(string)}
                    fetchDataBySearchString={fetchDeliveryYard}
                    selectedId={selectedDeliveryYardID}
                    loading={yardLoading}
                    onSelect={handleDeliveryYardSelectionFromDropdown}
                    clearInputCallback={() => {
                      setSelectedDeliveryYardID("");
                    }}
                    towardsTop={true}
                    className={`${selectedDeliveryYardID === "" && deliveryYardInput !== "" ? "borderRed" : ""}`}
                  />
                  <LookupButton onClick={handleYardLookupModalShow} />
                </Col>
              </Form.Group>

              <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={2} sm={2} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">City</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={pickupCities}
                    searchString={pickupCityInput}
                    renderItemId={(shuttleCity) => shuttleCity.shuttleCityPK}
                    renderItemField={(shuttleCity) => shuttleCity.city}
                    handleSearchString={(string) => setPickupCityInput(string)}
                    fetchDataBySearchString={fetchPickupCities}
                    onSelect={handleShuttleCitySelectionFromDropdown}
                    selectedId={selectedShuttleCityID}
                    loading={cityLoading}
                    clearInputCallback={() => {
                      setSelectedShuttleCityID("");
                    }}
                    towardsTop={true}
                    className={`${selectedShuttleCityID === "" && pickupCityInput !== "" ? "borderRed" : ""}`}
                  />
                  <LookupButton onClick={handleShuttleCityLookupModalShow} />
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={2} sm={2} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Plant</Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={allPlants}
                    searchString={selectedPlantInput}
                    loading={plantLoading}
                    renderItemId={(plant) => plant.customerPlantPK}
                    renderItemField={(plant) => plant.name}
                    handleSearchString={(string) => setSelectedPlantInput(string)}
                    fetchDataBySearchString={fetchAllPlants}
                    onSelect={handlePlantSelectionFromDropdown}
                    selectedId={selectedPlantID}
                    clearInputCallback={() => {
                      setSelectedPlantID("");
                    }}
                    towardsTop={true}
                    className={`${selectedPlantID === "" && selectedPlantInput !== "" ? "borderRed" : ""}`}
                  />
                  <LookupButton onClick={handlePlantLookupModalShow} />
                </Col>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mt-4  invisible align-items-center row  m-l-0 m-r-0">
                <Col xs={2} sm={2} className="p-0 text-start">
                  <Form.Label htmlFor="name" className="col-form-label me-4"></Form.Label>
                </Col>

                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={1} md={1} sm={1} className="p-0 text-start">
                  <input
                    type="checkbox"
                    className={`form-check-input mt-1 p-0 ${showError ? "borderRed" : ""}`}

                    id="rtp"
                    value={cityToYard}
                    checked={cityToYard}
                    onChange={(e) => {
                      setCityToYard(e.target.checked);
                    }}
                  />
                </Col>
                <Col sm={9} md={9} xs={9} className="p-0 ">
                  <Form.Label className=" col-form-label ms-3">City To Yard</Form.Label>
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 form-group h-25px  align-items-center row  m-l-0 m-r-0">
                <Col xs={1} md={1} sm={1} className="p-0 text-start">
                  <input
                    type="checkbox"
                    className={`form-check-input p-0 ${showError ? "borderRed" : ""}`}
                    id="rtp"

                    checked={yardToCity}
                    value={yardToCity}
                    onChange={(e) => setYardToCity(e.target.checked)}
                  />
                </Col>
                <Col sm={9} md={9} xs={9} className="p-0 ">
                  <Form.Label className=" col-form-label ms-3">Yard To City</Form.Label>
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 form-group h-25px  align-items-center row  m-l-0 m-r-0">
                <Col xs={1} md={1} sm={1} className="p-0 text-start">
                  <input
                    type="checkbox"
                    className={`form-check-input p-0 ${showError ? "borderRed" : ""}`}
                    id="rtp"
                    value={yardToYard}
                    checked={yardToYard}
                    onChange={(e) => setYardToYard(e.target.checked)}
                  />
                </Col>
                <Col sm={9} md={9} xs={9} className="p-0 ">
                  <Form.Label className=" col-form-label ms-3">Yard To Yard</Form.Label>
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 form-group h-25px  align-items-center row  m-l-0 m-r-0">
                <Col xs={1} md={1} sm={1} className="p-0 text-start">
                  <input
                    type="checkbox"
                    className={`form-check-input p-0 ${showError ? "borderRed" : ""}`}

                    id="rtp"
                    value={plantToPlant}
                    checked={plantToPlant}
                    onChange={(e) => setPlantToPlant(e.target.checked)}
                  />
                </Col>
                <Col sm={9} md={9} xs={9} className="p-0 ">
                  <Form.Label className=" col-form-label ms-3">Plant To Plant</Form.Label>
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 form-group h-25px  align-items-center row  m-l-0 m-r-0">
                <Col xs={1} md={1} sm={1} className="p-0 text-start">
                  <input
                    type="checkbox"
                    className={`form-check-input p-0 ${showError ? "borderRed" : ""}`}
                    id="rtp"
                    value={dryRun}
                    checked={dryRun}
                    onChange={(e) => setDryRun(e.target.checked)}
                  />
                </Col>
                <Col sm={9} md={9} xs={9} className="p-0 ">
                  <Form.Label className=" col-form-label ms-3">Dry Run</Form.Label>
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 form-group h-25px  align-items-center row  m-l-0 m-r-0">
                <Col xs={1} md={1} sm={1} className="p-0  text-start">
                  <input
                    type="checkbox"
                    className={`form-check-input p-0 ${showError ? "borderRed" : ""}`}

                    id="rtp"
                    value={bonus}
                    checked={bonus}
                    onChange={(e) => setBonus(e.target.checked)}
                  />
                </Col>
                <Col sm={9} md={9} xs={9} className="p-0 ">
                  <Form.Label className=" col-form-label ms-3">Bonus</Form.Label>
                </Col>
              </Form.Group>
            </Col>
          </div>

          {/* Shuttle city lookup screen */}
          <ShuttleCityLookup
            show={shuttleCityLookUpShow}
            onHide={handleShuttleCityLookupModalHide}
            renderItemId={(shuttleCity) => shuttleCity.shuttleCityPK}
            handleLookupSelection={handleShuttleCityLookupSelection}
            MaintenanceProgram
          />
          {/* Shuttle yard lookup screen */}
          <YardLookup
            show={yardLookupShow}
            onHide={handleYardLookupModalHide}
            renderItemId={(deliveryYard) => deliveryYard.yardPK}
            handleLookupSelection={handleYardLookupSelection}
            MaintenanceProgram
          />
          {/* Plant Lookup Modal */}
          <CustomerPlantsLookup
            customerId={""}
            show={plantLookupShow}
            onHide={handlePlantLookupModalHide}
            renderItemId={(plant) => plant.customerPlantPK}
            handleLookupSelection={handlePlantLookupSelection}
            MaintenanceProgram
          />

          <DriverLookup
            show={driverLookUpShow}
            onHide={handleDriverLookupModalHide}
            renderItemId={(driver) => driver.driverPK}
            handleLookupSelection={handleDriverLookupDropDownSelection}
            MaintenanceProgram
          />
          <WarningModalPopUp
            show={warningPopup}
            onHide={warningPopupModalHide}
            title={"Network Error"}
            body={"Sorry, we were unable to establish a connection to the remote service."}
            handleOK={warningPopupModalHide}
            showOK={true}
            color={"red"}
          />

          <UnitSelectionLookup
            show={showUnitSelectionLookup}
            onHide={handleUnitLookupModalHide}
            renderItemId={(units) => units.unitPK}
            handleLookupSelection={handleUnitNumberSelection}
            ShuttleInquiry
            companyName={companyName}
            selectedDriverFK={selectedDriverFK}
            driverCompanyName={currentCompanyName}
          />
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={handleListButton}
            disabled={
              showError.length > 0 ||
              (selectedPlantID === "" && selectedPlantInput !== "") ||
              (selectedDeliveryYardID === "" && deliveryYardInput !== "") ||
              (selectedDeliveryYardID === "" && deliveryYardInput !== "") ||
              (selectedShuttleCityID === "" && pickupCityInput !== "") ||
              (selectedDriverFK === "" && driverNameInput !== "") ||
              (selectedUnitPK === null && unitNumberInput !== "") ||
              ((endDate === "" || startDate === "") && selectedDateType !== "All") ||
              (endDate !== "" && !isEndDateValid) ||
              (startDate !== "" && !isBeginDateValid)
            }
          >
            List
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={() => handlePrintPdf("display", "PDF")}
            disabled={
              showError.length > 0 ||
              (selectedPlantID === "" && selectedPlantInput !== "") ||
              (selectedDeliveryYardID === "" && deliveryYardInput !== "") ||
              (selectedDeliveryYardID === "" && deliveryYardInput !== "") ||
              (selectedShuttleCityID === "" && pickupCityInput !== "") ||
              (selectedDriverFK === "" && driverNameInput !== "") ||
              (selectedUnitPK === null && unitNumberInput !== "") ||
              ((endDate === "" || startDate === "") && selectedDateType !== "All") ||
              (endDate !== "" && !isEndDateValid) ||
              (startDate !== "" && !isBeginDateValid)
            }
          >
            Print PDF
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={() => handlePrintPdf("emailPdf", "PDF")}
            disabled={
              showError.length > 0 ||
              (selectedPlantID === "" && selectedPlantInput !== "") ||
              (selectedDeliveryYardID === "" && deliveryYardInput !== "") ||
              (selectedDeliveryYardID === "" && deliveryYardInput !== "") ||
              (selectedShuttleCityID === "" && pickupCityInput !== "") ||
              (selectedDriverFK === "" && driverNameInput !== "") ||
              (selectedUnitPK === null && unitNumberInput !== "") ||
              ((endDate === "" || startDate === "") && selectedDateType !== "All") ||
              (endDate !== "" && !isEndDateValid) ||
              (startDate !== "" && !isBeginDateValid)
            }
          >
            Email PDF
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={() => handlePrintPdf("emailExcel", "EXCEL")}
            disabled={
              showError.length > 0 ||
              (selectedPlantID === "" && selectedPlantInput !== "") ||
              (selectedDeliveryYardID === "" && deliveryYardInput !== "") ||
              (selectedDeliveryYardID === "" && deliveryYardInput !== "") ||
              (selectedShuttleCityID === "" && pickupCityInput !== "") ||
              (selectedDriverFK === "" && driverNameInput !== "") ||
              (selectedUnitPK === null && unitNumberInput !== "") ||
              ((endDate === "" || startDate === "") && selectedDateType !== "All") ||
              (endDate !== "" && !isEndDateValid) ||
              (startDate !== "" && !isBeginDateValid)
            }
          >
            Email Excel
          </button>

          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={handleCancel}
          >
            Cancel
          </button>
          <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={base64PDF} />
        </div>
      </div>
    </div>
  );
}

export default ShuttleInquirySelectionContent;
