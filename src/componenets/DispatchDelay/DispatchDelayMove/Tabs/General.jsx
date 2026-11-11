import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import LookupButton from "../../../common/LookupButton";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import PostalCodeComponent from "../../../common/PostalCodeComponent";
import { useDispatch, useSelector } from "react-redux";
import DealerService from "../../../../services/DealerService";
import {
  setCustomerId,
  setCustomerInput,
  setCustomerPlantId,
  setCustomerPlantInput,
  setDealerId,
  setDealerInput,
  setIsInnerLookupsOpen,
  setPageNumber,
} from "../../../../redux/EditMaster/UnitSelectionSlice";

import DealerLookup from "../../../LookupScreens/Dealer/DealerLookup";
import CustomerPlantsLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import CustomerPlantMaintenanceService from "../../../../services/CustomerPlantMaintenanceService";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import DelayProcessingService from "../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import {
  setAlternateLocationRedux,
  setMiscMoveDeliveryDetails,
  setMoveData,
} from "../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import { setMiscellaneousDealerData, setMiscellaneousDealerId } from "../../../../redux/UndispatchSlice";
import { useLocation } from "react-router-dom";
import { removeLeadingWhitespace } from "../../../../utils/utils";
import YardCheckinService from "../../../../services/shuttle/process/YardCheckinService";
import { AdvancedLookupScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";

const General = () => {
  const location = useLocation();
  const { customerFK } = location?.state || {};
  const customerInput = useSelector((state) => state.unitSelection.customerInput);
  const customerPlantInput = useSelector((state) => state.unitSelection.customerPlantInput);
  const dealerInput = useSelector((state) => state.unitSelection.dealerInput);
  const customerId = useSelector((state) => state.unitSelection.customerId);
  const customerPlantId = useSelector((state) => state.unitSelection.customerPlantId);
  const dealerId = useSelector((state) => state.unitSelection.dealerId);
  const selectedCompanyName = useSelector((state) => state.unitSelection.selectedCompanyName);
  const moveData = useSelector((state) => state.delayProcessing.moveData);
  const alternateLocationRedux = useSelector((state) => state.delayProcessing.alternateLocationRedux);
  const miscMoveDeliveryDetails = useSelector((state) => state.delayProcessing.miscMoveDeliveryDetails);
  const delayType = useSelector((state) => state.delayProcessing.delayType);
  const damageOrBreakdownId = useSelector((state) => state.delayProcessing.damageOrBreakdownId);
  const generalData = useSelector((state) => state.delayProcessing.generalData);
  const [selectedCustomerData, setSelectedCustomerData] = useState("");

  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });

  const [showCustomerPlantLookup, setShowCustomerPlantLookup] = useState(false);
  const [plantsList, setPlantsList] = useState([]);
  const [showDealerLookup, setShowDealerLookup] = useState(false);
  const [dealersList, setDealersList] = useState([]);
  const [alternateLoc, setalternateLoc] = useState();
  const [workordernumber, setworkordernumber] = useState();
  const [nameunder, setnameunder] = useState();
  const [phone, setphone] = useState();
  const [contact, setcontact] = useState();
  const [statecode, setStateCode] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [postalCodePK, setPostalCodePK] = useState(null);
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [canadian, setCanadian] = useState(false);
  const [name, setname] = useState();
  const [address1, setaddress1] = useState();
  const [address2, setaddress2] = useState();
  const [isRepairLoc, setisRepairLoc] = useState();
  const [isCustomerDpu, setIsCustomerDpu] = useState(false);
  const [dealerLoading, setDealerLoading] = useState(false);
  const [plantLoading, setPlantLoading] = useState(false);

  const dispatch = useDispatch();

  /**
   * Used for Pickup Dealer selection AutoComplete
   */
  const fetchDealerByName = (string) => {
    setDealerLoading(true);
    DelayProcessingService.fetchAllDealerDetailsByName(
      string,
      generalData?.SisterCompanyName || selectedCompanyName
    )
      .then((response) => {
        const data = response?.data;
        const dealerList = data?.content?.map((dealer) => ({
          ...dealer,
          name: dealer?.name?.trim(),
        }));
        setDealersList(dealerList);
      })
      .finally(() => {
        setDealerLoading(false);
      });
  };

  /**
   * used for Dealer Autocomplete Dropdown & Lookup - onSelect
   */
  const handleDealerSelection = (dealer) => {
    dispatch(setDealerInput(dealer?.name || ""));
    dispatch(setDealerId(dealer?.dealerPK || ""));
    dispatch(setPageNumber(0));
    setShowDealerLookup(false);
    setname(dealer?.name || "");
    setCity(dealer?.city || "");
    setStateCode(dealer?.stateCode || "");
    setPostalCode(dealer?.postalCode || "");
    setaddress1(dealer?.address1 || "");
    setaddress2(dealer?.address2 || "");
    setalternateLoc(false);
  };

  /**
   * Fetch all the customer plants for Autocomplete
   */
  const fetchAllPlantdetailsByName = (string) => {
    setPlantLoading(true);
    YardCheckinService.fetchBillingPlantDetails({
      customerId: customerFK,
      isDPUCustomer: isCustomerDpu,
      searchPlant: string,
      companyName: generalData?.SisterCompanyName || selectedCompanyName,
    })
      .then((response) => {
        const data = response?.data;
        const plantList = data?.content?.map((plant) => ({
          ...plant,
          name: plant?.name?.trim(),
        }));
        setPlantsList(plantList);
      })
      .finally(() => {
        setPlantLoading(false);
      });
  };
  /**
   * used for Plant selection Autocomplete & Lookup - onSelect
   */
  const handleCustomerPlantSelection = (plant) => {
    dispatch(setCustomerPlantInput(plant.name || ""));
    dispatch(setCustomerPlantId(plant.customerPlantPK || ""));
    dispatch(setPageNumber(0));
    setShowCustomerPlantLookup(false);
    setname(plant?.name || "");
    setCity(plant?.city || "");
    setStateCode(plant?.stateCode || "");
    setPostalCode(plant?.postalCode || "");
    setaddress1(plant?.address1 || "");
    setaddress2(plant?.address2 || "");
    setalternateLoc(false);
  };

  const getSelectedCustomerDetails = (selectedCustomerID, selectedCompanyName) => {
    if (selectedCustomerID !== "") {
      YardCheckinService.getCustomerById(selectedCustomerID, selectedCompanyName)
        .then((response) => {
          const data = response?.data;
          setSelectedCustomerData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const generateMoveData = () => {
    dispatch(
      setMoveData({
        unitfk: rowData?.unitFK,
        delayedunitfk: rowData?.delayedUnitPK,
        name: name ? name : miscMoveDeliveryDetails?.name,
        address1: address1 ? address1?.trim() : miscMoveDeliveryDetails?.address1?.trim(),
        address2: address2 ? address2?.trim() : miscMoveDeliveryDetails?.address2?.trim(),
        city: city ? city?.trim() : miscMoveDeliveryDetails?.city?.trim(),
        stateCode: statecode ? statecode?.trim() : miscMoveDeliveryDetails?.stateCode?.trim(),
        postalCode: postalcode ? postalcode?.trim() : miscMoveDeliveryDetails?.postalCode?.trim(),
        canadian: canadian ? canadian : miscMoveDeliveryDetails?.canadian || false,
        phone: phone ? phone?.trim() : miscMoveDeliveryDetails?.phone?.trim() || null,
        contact: contact?.trim(),
        deliveryContact: miscMoveDeliveryDetails?.deliveryContact?.trim() || null,
        deliveryContactPhone: miscMoveDeliveryDetails?.deliveryContactPhone?.trim() || null,
        email: miscMoveDeliveryDetails?.email?.trim() || null,
        driverEmailHrs: miscMoveDeliveryDetails?.driverEmailHrs?.trim() || null,
        driverEmailDir: miscMoveDeliveryDetails?.driverEmailDir?.trim() || null,
        openSunday: miscMoveDeliveryDetails?.openSunday || false,
        openMonday: miscMoveDeliveryDetails?.openMonday || false,
        openTuesday: miscMoveDeliveryDetails?.openTuesday || false,
        openWednesday: miscMoveDeliveryDetails?.openWednesday || false,
        openThursday: miscMoveDeliveryDetails?.openThursday || false,
        openFriday: miscMoveDeliveryDetails?.openFriday || false,
        openSaturday: miscMoveDeliveryDetails?.openSaturday || false,
        isRepairLoc: isRepairLoc || false,
        isAlternateLoc: alternateLoc || false,
        dealerfk: dealerId || null,
        plantfk: customerPlantId || null,
        workOrderNumber: workordernumber?.trim() || null,
        nameUnder: nameunder?.trim() || null,
        delayType: delayType || null,
        damageOrBreakdownId: damageOrBreakdownId || null,
        company: selectedCompanyName,
      })
    );
  };

  useEffect(() => {
    generateMoveData();
  }, [
    name,
    address1,
    address2,
    city,
    statecode,
    postalcode,
    canadian,
    phone,
    contact,
    isRepairLoc,
    alternateLoc,
    dealerId,
    customerPlantId,
    workordernumber,
    nameunder,
    miscMoveDeliveryDetails,
    delayType,
    damageOrBreakdownId,
    selectedCompanyName,
  ]);

  useEffect(() => {
    getSelectedCustomerDetails(customerFK, generalData?.SisterCompanyName || selectedCompanyName);
  }, []);

  useEffect(() => {
    if (showCustomerPlantLookup || showDealerLookup) {
      dispatch(setIsInnerLookupsOpen(true));
    } else {
      dispatch(setIsInnerLookupsOpen(false));
    }
  }, [showCustomerPlantLookup, showDealerLookup]);

  useEffect(() => {
    if (alternateLoc) {
      resetLoc();
    } else {
      dispatch(setMiscMoveDeliveryDetails(null));
    }
    if (!isRepairLoc) {
      setworkordernumber("");
      setnameunder("");
      setphone("");
      setcontact("");
    }
  }, [alternateLoc, isRepairLoc]);

  const resetLoc = () => {
    setname("");
    setaddress1("");
    setaddress2("");
    setCity("");
    setPostalCode("");
    setStateCode("");
  };

  const resetMoveData = () => {
    resetLoc();
    dispatch(setDealerInput(""));
    dispatch(setDealerId(null));
    dispatch(setPageNumber(0));
    dispatch(setCustomerPlantInput(""));
    dispatch(setCustomerId(null));
    setisRepairLoc(false);
  };

  useEffect(() => {
    if (!moveData) {
      resetMoveData();
      dispatch(setMiscMoveDeliveryDetails(null));
    }
  }, []);

  useEffect(() => {
    resetMoveData();
  }, []);

  useEffect(() => {
    if (
      selectedCustomerData !== null &&
      (selectedCustomerData?.usePlants || selectedCustomerData?.dpuCustomer)
    ) {
      setIsCustomerDpu(
        selectedCustomerData?.usePlants === false && selectedCustomerData?.dpuCustomer === true
          ? selectedCustomerData?.dpuCustomer
          : false
      );
    }
  }, [selectedCustomerData]);

  return (
    <Formik>
      {(formik) => (
        <Form on={formik.handle}>
          <div className="p-2">
            <Row className="m-0 p-10 ">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Is Repair Location</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 `}
                      checked={isRepairLoc}
                      onChange={(e) => setisRepairLoc(e.target.checked)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group m-t-20 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Dealer</Form.Label>
                  </Col>

                  <Col xs={7} md={5} sm={7} className="p-0 d-flex" style={{ width: "275px" }}>
                    {/* Dealer Autocomplete */}
                    <AutoCompleteDropdown
                      disabled={alternateLoc || customerPlantInput}
                      arrayList={dealersList}
                      searchString={dealerInput}
                      renderItemId={(dealer) => dealer.dealerPK}
                      renderItemField={(dealer) => dealer.name}
                      selectedId={dealerId}
                      handleSearchString={(string) => dispatch(setDealerInput(string))}
                      fetchDataBySearchString={fetchDealerByName}
                      onSelect={handleDealerSelection}
                      loading={dealerLoading}
                      clearInputCallback={() => {
                        dispatch(setDealerId(null));
                        dispatch(setPageNumber(0));
                        resetLoc();
                      }}

                      className={`${
                        !alternateLoc /* && dealerId */
                          ? customerPlantId || customerPlantInput
                            ? ""
                            : !dealerId
                              ? "borderRed"
                              : "borderGreen"
                          : ""
                      }`}
                    />
                    <LookupButton
                      onClick={() => setShowDealerLookup(true)}
                      disabled={alternateLoc || customerPlantInput}
                    />
                    {/* Dealer Lookup Modal */}
                    <DealerLookup
                      show={showDealerLookup}
                      onHide={() => setShowDealerLookup(false)}
                      renderItemId={(dealer) => dealer.dealerPK}
                      handleLookupSelection={handleDealerSelection}
                      MaintenanceProgram
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
                      disabled={dealerInput || alternateLoc}
                      arrayList={plantsList}
                      searchString={customerPlantInput}
                      renderItemId={(plant) => plant.customerPlantPK}
                      renderItemField={(plant) => plant.name}
                      selectedId={customerPlantId}
                      handleSearchString={(string) => dispatch(setCustomerPlantInput(string))}
                      fetchDataBySearchString={(string) => fetchAllPlantdetailsByName(string)}
                      onSelect={handleCustomerPlantSelection}
                      loading={plantLoading}
                      clearInputCallback={() => {
                        dispatch(setCustomerPlantId(null));
                        dispatch(setPageNumber(0));
                        resetLoc();
                      }}
                      className={`${
                        !alternateLoc /* && dealerId */
                          ? dealerId || dealerInput
                            ? ""
                            : !customerPlantId
                              ? "borderRed"
                              : "borderGreen"
                          : ""
                      }`}
                    />
                    <LookupButton
                      onClick={() => setShowCustomerPlantLookup(true)}
                      disabled={dealerInput || alternateLoc}
                    />
                    {/* Customer Plant Lookup Modal */}
                    <CustomerPlantsLookup
                      show={showCustomerPlantLookup}
                      onHide={() => setShowCustomerPlantLookup(false)}
                      renderItemId={(plant) => plant.customerPlantPK}
                      handleLookupSelection={handleCustomerPlantSelection}
                      normalfetchFunction={(params) =>
                        YardCheckinService.fetchBillingPlantDetails({
                          ...params,
                          customerId: customerFK,
                          isDPUCustomer: isCustomerDpu,
                          searchPlant: params?.searchTerm || "",
                          companyName: generalData?.SisterCompanyName || selectedCompanyName,
                          size: AdvancedLookupScreen_RecordsPerPage,
                          isOEPP: "Lookup",
                        })
                      }
                      renderCol1={(plant) => plant?.name}
                      renderCol2={(plant) => plant?.brand}
                      renderCol3={(plant) => plant?.productLine}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-5 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Alternate Location</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      id="loc"
                      name="loc"
                      value={alternateLoc}
                      checked={alternateLoc}
                      onChange={(e) => {
                        setalternateLoc(e.target.checked);
                        dispatch(setAlternateLocationRedux(e.target.checked));
                      }}
                      disabled={dealerInput || customerPlantInput}
                      // class
                      style={{
                        border:
                          customerPlantInput === "" && dealerInput === ""
                            ? alternateLoc
                              ? "green 2px solid" // Green border when checked
                              : "red 2px solid" // Red border when unchecked
                            : "", // No border when customerPlantId or dealerId are present
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-5 align-items-center row m-l-0 m-r-0">
                  {" "}
                  {/* Increased margin-top */}
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Work Order Number</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "180px" }}>
                    <input
                      disabled={!isRepairLoc}
                      className={`customFormControl`}
                      value={workordernumber}
                      id="wonum"
                      name="wonum"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="none"
                      onChange={(e) => {
                        setworkordernumber(removeLeadingWhitespace(e.target.value));
                      }}
                      style={{
                        border: isRepairLoc ? (!workordernumber ? "red 2px solid" : "green 2px solid") : "",
                        width: "300px",
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-20 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Name Under</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "300px" }}>
                    <input
                      disabled={!isRepairLoc}
                      className={`customFormControl`}
                      value={nameunder}
                      id="nameunder"
                      name="nameunder"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="none"
                      onChange={(e) => {
                        setnameunder(removeLeadingWhitespace(e.target.value));
                      }}
                      style={{
                        border: isRepairLoc ? (!nameunder ? "red 2px solid" : "green 2px solid") : "",
                        width: "300px",
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-20 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Phone</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "150px" }}>
                    <input
                      disabled={!isRepairLoc}
                      type="text"
                      className={`customFormControl`}
                      id="ph"
                      name="ph"
                      value={formatPhoneNumber(phone)}
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="none"
                      onChange={(e) => {
                        setphone(removeLeadingWhitespace(e.target.value));
                      }}
                      style={{
                        border: isRepairLoc
                          ? formatPhoneNumber(phone)?.length === 14
                            ? "green 2px solid"
                            : "red 2px solid"
                          : "",
                        width: "100px",
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-20 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Contact</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "200px" }}>
                    <input
                      disabled={!isRepairLoc}
                      type="text"
                      className={`customFormControl`}
                      value={contact}
                      id="ctct"
                      name="ctct"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="none"
                      onChange={(e) => {
                        setcontact(removeLeadingWhitespace(e.target.value));
                      }}
                      style={{
                        border: isRepairLoc ? (!contact ? "red 2px solid" : "green 2px solid") : "",
                        width: "300px",
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>

              {/* SECOND COLUMN */}

              <Col sm={5} md={5} lg={5} xl={5} xs={5}>
                <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Location</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      value={name}
                      id="name"
                      name="name"
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="new-password"
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      value={address1}
                      id="ad1"
                      name="ad1"
                      maxLength={30}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      disabled
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="text"
                      className={`customFormControl`}
                      value={address2}
                      id="ad2"
                      name="ad2"
                      maxLength={30}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      disabled
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className="mt-1 align-items-center"
                  style={{ width: "595px", marginLeft: "-28px" }}
                >
                  <Col className="p-0">
                    <PostalCodeComponent
                      disabled
                      city={city}
                      setCity={setCity}
                      stateCode={statecode}
                      setStateCode={setStateCode}
                      postalCode={postalcode}
                      setPostalCode={setPostalCode}
                      setPostalValues={setPostalValues}
                      postalOptions={postalOptions}
                      postalCodePK={postalCodePK}
                      setPostalCodePK={setPostalCodePK}
                      canadian={canadian}
                      setCanadian={setCanadian}
                      hideLabel={true}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
          {/* <div style={{ minHeight: "200px" }}></div> */}
        </Form>
      )}
    </Formik>
  );
};

export default General;
