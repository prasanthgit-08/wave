import React, { useState, useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../common/LookupButton";
import { useSelector, useDispatch } from "react-redux";
import OrderEntryService from "../../../../../../services/OrderEntryService";
import YardLookup from "../../../../../LookupScreens/Yard/YardLookup";
import ShuttleCityLookup from "../../../../../LookupScreens/ShuttleCity/ShuttleCityLookup";
import {
  setIsCustomerTabColumn1TabValidation,
  setEditedUnitDataToSaveForCustomerTab,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

const CustomerTabColumn1 = ({ styles }) => {
  const dispatch = useDispatch();

  //Local State
  const [pickupYardsData, setPickupYardsData] = useState([]);
  const [pickupYardInput, setPickupYardInput] = useState("");
  const [pickupYardId, setPickupYardId] = useState("");
  const [pickupYardSelection, setPickupYardSelection] = useState(false);
  const [pickupYardAddress1, setPickupYardAddress1] = useState("");
  const [pickupYardAddress2, setPickupYardAddress2] = useState("");
  const [pickupYardPostalCode, setPickupYardPostalCode] = useState("");
  const [pickupYardCity, setPickupYardCity] = useState("");
  const [pickupYardStateCode, setPickupYardStateCode] = useState("");
  const [pickUpCityData, setPickUpCityData] = useState([]);
  const [pickupCityInput, setPickupCityInput] = useState("");
  const [pickupCityId, setPickupCityId] = useState("");
  const [pickupShuttleCitySelection, setPickupShuttleCitySelection] = useState(false);
  const [pickupYardRow, setPickupYardRow] = useState("");
  const [pickupYardPosition, setPickupYardPosition] = useState("");
  const [pickupCityLoading, setpickupCityLoading] = useState(true);
  const [pickupYardLoading, setpickupYardLoading] = useState(true);

  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const editedUnitDataToSaveForSettingsTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.editedUnitDataToSaveForSettingsTab
  );
  /**
   * Fetch all Outbound/Reload Yards for the selected pickup plant.
   * Used for Pickup Yards Autocomplete
   */
  const fetchPickupYardDetailsByName = (string) => {
    setpickupYardLoading(true);
    OrderEntryService.fetchYardDetailsByName(
      selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPK,
      selectedUnitData?.editMasterExpressCustomerTabDTO?.billingPlantPK,
      !selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantOutbound,
      selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantOutbound,
      string
    )
      .then((response) => {
        const data = response.data.content;
        const yardsList = data?.map((yards) => ({ ...yards, description: yards.description?.trim() }));
        setPickupYardsData(yardsList);
      })
      .catch((err) => {})
      .finally(() => {
        setpickupYardLoading(false);
      });
  };

  /**
   * used for Pickup Yard Autocomplete Dropdown
   */
  const handlePickupYardSelection = (yard) => {
    setPickupYardId(yard.yardPK);
    setPickupYardInput(yard.description?.trim());
    setPickupYardAddress1(yard.address1?.trim());
    setPickupYardAddress2(yard.address2 !== null ? yard.address2?.trim() : "");
    setPickupYardPostalCode(yard.postalCode?.trim());
    setPickupYardCity(yard.city?.trim());
    setPickupYardStateCode(yard.stateCode?.trim());
  };

  /**
   * used for Pickup Yard selection Lookup - open
   */
  const handlePickupYardLookupModalShow = () => {
    setPickupYardSelection(true);
  };
  /**
   * used for Pickup Yard selection Lookup - onSelect
   */
  const handlePickupYardLookupSelection = (yard) => {
    setPickupYardId(yard.yardPK);
    setPickupYardInput(yard.description?.trim());
    setPickupYardAddress1(yard.address1?.trim());
    setPickupYardAddress2(yard.address2 !== null ? yard.address2?.trim() : "");
    setPickupYardPostalCode(yard.postalCode?.trim());
    setPickupYardCity(yard.city?.trim());
    setPickupYardStateCode(yard.stateCode?.trim());
    setPickupYardSelection(false);
  };

  /**
   * used for Pickup Yard selection Lookup - close
   */
  const hidePickupYardModal = () => {
    setPickupYardSelection(false);
  };

  /**
   * Fetch all Outbound/Reload Shuttle Citys for the selected pickup plant.
   * Used for Pickup Shuttle Citys Autocomplete
   */
  const fetchPickupCityDetailsByName = (string) => {
    setpickupCityLoading(true);
    OrderEntryService.fetchCityDetailsByName(
      selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPK,
      selectedUnitData?.editMasterExpressCustomerTabDTO?.billingPlantPK,
      !selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantOutbound,
      selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantOutbound,
      string
    )
      .then((response) => {
        const data = response.data.content;
        const cityList = data?.map((cities) => ({ ...cities, city: cities.city?.trim() }));
        setPickUpCityData(cityList);
      })
      .catch((err) => {})
      .finally(() => {
        setpickupCityLoading(false);
      });
  };

  /**
   * used for Pickup City Autocomplete Dropdown
   */
  const handlePickupCitySelection = (city) => {
    setPickupCityInput(city.city);
    setPickupCityId(city.shuttleCityPK);
  };

  /**
   * used for Pickup Shuttle City selection Lookup - open
   */
  const handlePickupShuttleCityLookupModalShow = () => {
    setPickupShuttleCitySelection(true);
  };
  /**
   * used for Pickup Shuttle City selection Lookup - onSelect
   */
  const handlePickupShuttleCityLookupSelection = (shuttleCity) => {
    setPickupCityId(shuttleCity.shuttleCityPK);
    setPickupCityInput(shuttleCity.city);
    setPickupShuttleCitySelection(false);
  };

  /**
   * used for Pickup Shuttle City selection Lookup - close
   */
  const pickupShuttleCityModalHide = () => {
    setPickupShuttleCitySelection(false);
  };

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData != null) {
      setPickupYardId(selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupYardPK || "");
      setPickupYardInput(
        selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupYardDescription?.trim() || ""
      );
      setPickupYardAddress1(
        selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupYardAddress1?.trim() || ""
      );
      setPickupYardAddress2(
        selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupYardAddress2?.trim() || ""
      );
      setPickupYardPostalCode(
        selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupYardPostalCode?.trim() || ""
      );
      setPickupYardCity(selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupYardCity?.trim() || "");
      setPickupYardStateCode(
        selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupYardStateCode?.trim() || ""
      );
      setPickupCityId(selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupShuttleCityPK || "");
      setPickupCityInput(
        selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupShuttleCityName?.trim() || ""
      );
      setPickupYardRow(selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupYardRow?.trim() || "");
      setPickupYardPosition(
        selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupYardPosition?.trim() || ""
      );
    }
  }, [selectedUnitData, viewDetail]);

  // Tab Validation
  useEffect(() => {
    // Same condition that shows the red border on the Pickup Yard dropdown
    const isPickupYardError =
      selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantSelectYard &&
      selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleToYard &&
      (pickupYardId === "" || pickupYardId === null || pickupYardInput === "");

    if (
      !isPickupYardError &&
      (!selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleToYard ||
        (selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleToYard &&
          selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupYardPK !== null &&
          selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupShuttleCityPK === null) ||
        (selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleToYard &&
          !editedUnitDataToSaveForSettingsTab?.inPickupYard) ||
        (selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleToYard &&
          selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupYardPK !== null &&
          pickupYardId !== "" &&
          selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupShuttleCityPK !== null &&
          pickupCityId !== "" &&
          pickupYardRow?.trim() !== ""))
    ) {
      dispatch(setIsCustomerTabColumn1TabValidation(true));
    } else {
      dispatch(setIsCustomerTabColumn1TabValidation(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedUnitData,
    pickupYardId,
    pickupYardInput,
    pickupCityId,
    pickupYardRow,
    editedUnitDataToSaveForSettingsTab?.inPickupYard,
  ]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDataToSaveForCustomerTab({
        pickupYardFK: pickupYardId,
        pickupShuttleCityFK: pickupCityId,
        pickupYardRow: pickupYardRow,
        pickupYardPosition: pickupYardPosition,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickupYardId, pickupCityId, pickupYardRow, pickupYardPosition]);

  return (
    <Col xs={5}>
      {/* ********************* */}
      {/* Miscellaneous Customer */}
      <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Miscellaneous Customer</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.miscellaneousCustomer || false}
            checked={selectedUnitData?.editMasterExpressCustomerTabDTO?.miscellaneousCustomer || false}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Customer */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Customer</Form.Label>
        </Col>

        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerName || ""}
            disabled
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/*Customer Address1 */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Address</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerAddress1 || ""}
            disabled
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/*Customer Address2 */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}></Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerAddress2 || ""}
            disabled
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Customer - City,State,Zip */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>City,State,ZIP</Form.Label>
        </Col>
        {/* Customer - City */}
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerCity || ""}
            disabled
          />
        </Col>
        {/* ********************* */}
        {/*Customer- State */}
        <div className="p-0 w-30px mx-1">
          <input
            className={`customFormControl`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerStateCode || ""}
            disabled
          />
        </div>
        {/* ********************* */}
        {/* Customer- PostalCode*/}
        <Col xs={1} md={1} sm={1} className="p-0">
          <input
            className={`customFormControl w-80px`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPostalCode || ""}
            disabled
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Pickup At Plant */}
      <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Pickup At Plant</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupAtPlant || false}
            checked={selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupAtPlant || false}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Pickup Plant */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Pickup Plant</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantName || ""}
            disabled
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/*Pickup Plant - Address1 */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Address</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantAddress1 || ""}
            disabled
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/*Pickup Plant - Address2 */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}></Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantAddress2 || ""}
            disabled
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Pickup Plant - City,State,Zip  */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>City,State,ZIP</Form.Label>
        </Col>
        {/* ********************* */}
        {/* Pickup Plant - PostalCode */}
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            disabled
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantCity || ""}
          />
        </Col>
        {/* ********************* */}
        {/* Pickup Plant - City */}
        <div className="p-0 w-30px mx-1">
          <input
            className={`customFormControl`}
            type="text"
            disabled
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantStateCode || ""}
          />
        </div>
        {/* ********************* */}
        {/* Pickup Plant - State Code */}
        <Col xs={1} md={1} sm={1} className="p-0">
          <input
            className={`customFormControl w-80px`}
            type="text"
            disabled
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantPostalCode || ""}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Shuttle To Yard */}
      <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Shuttle To Yard</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleToYard || false}
            checked={selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleToYard || false}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Pickup Yard Autocomplete */}
      <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Pickup Yard</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className={`p-0 ${styles.selectContainer}`}>
          <AutoCompleteDropdown
            arrayList={pickupYardsData}
            searchString={pickupYardInput}
            renderItemId={(code) => code.yardPK}
            renderItemField={(code) => code.description}
            handleSearchString={(string) => setPickupYardInput(string)}
            fetchDataBySearchString={fetchPickupYardDetailsByName}
            onSelect={handlePickupYardSelection}
            clearInputCallback={() => {
              setPickupYardId("");
              setPickupYardAddress1("");
              setPickupYardAddress2("");
              setPickupYardPostalCode("");
              setPickupYardCity("");
              setPickupYardStateCode("");
            }}
            selectedId={pickupYardId}
            loading={pickupYardLoading}
            className={`${
              isUnitDataLoading ||
              viewDetail ||
              !selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantSelectYard
                ? ""
                : selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleToYard
                  ? pickupYardId === "" || pickupYardId === null || pickupYardInput === ""
                    ? "borderRed"
                    : "borderGreen"
                  : ""
            }`}
            disabled={
              !selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleToYard ||
              viewDetail ||
              selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupYardPK === null ||
              !selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantSelectYard
            }
          />
          {selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantSelectYard && (
            <LookupButton
              onClick={handlePickupYardLookupModalShow}
              disabled={
                viewDetail || selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupYardPK === null
              }
            />
          )}
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Pickup Yard - Address1 */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}>
            Address
          </Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input className={`customFormControl`} type="text" value={pickupYardAddress1 || ""} disabled />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Pickup Yard - Address2 */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}></Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input className={`customFormControl`} type="text" value={pickupYardAddress2 || ""} disabled />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Pickup Yard - City,State,ZIP */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}>
            City,State,ZIP
          </Form.Label>
        </Col>
        {/* ********************* */}
        {/* Pickup Yard - City */}
        <Col xs={6} md={6} sm={6} className="p-0">
          <input className={`customFormControl`} type="text" value={pickupYardCity || ""} disabled />
        </Col>
        {/* ********************* */}
        {/* Pickup Yard - State Code */}
        <div className="p-0 w-30px mx-1">
          <input className={`customFormControl`} type="text" value={pickupYardStateCode || ""} disabled />
        </div>
        {/* ********************* */}
        {/* Pickup Yard - Postal Code*/}
        <Col xs={1} md={1} sm={1} className="p-0">
          <input
            className={`customFormControl w-80px`}
            type="text"
            value={pickupYardPostalCode || ""}
            disabled
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Pickup City */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Pickup City</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className={`p-0 ${styles.selectContainer}`}>
          {/* Pickup City Autocomplete */}
          <AutoCompleteDropdown
            arrayList={pickUpCityData}
            searchString={pickupCityInput}
            renderItemId={(city) => city.shuttleCityPK}
            renderItemField={(city) => city.city}
            selectedId={pickupCityId}
            handleSearchString={(string) => setPickupCityInput(string)}
            fetchDataBySearchString={fetchPickupCityDetailsByName}
            onSelect={handlePickupCitySelection}
            clearInputCallback={() => {
              setPickupCityId("");
            }}
            className={`${
              viewDetail ||
              isUnitDataLoading ||
              !selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantSelectShuttleCity
                ? ""
                : selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleToYard
                  ? pickupCityId === "" || pickupCityId === null || pickupCityInput === ""
                    ? "borderRed"
                    : "borderGreen"
                  : ""
            }`}
            loading={pickupCityLoading}
            disabled={
              !selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleToYard ||
              viewDetail ||
              !selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantSelectShuttleCity
            }
            towardsTop
          />
          {selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantSelectShuttleCity && (
            <LookupButton
              onClick={handlePickupShuttleCityLookupModalShow}
              disabled={
                !selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleToYard ||
                viewDetail ||
                !selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPickupPlantSelectShuttleCity
              }
            />
          )}
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Yard Row */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}>
            Yard Row
          </Form.Label>
        </Col>

        <Col xs={2} md={2} sm={2} className="p-0">
          <input
            className={`customFormControl ${
              viewDetail ||
              isUnitDataLoading ||
              pickupYardId === "" ||
              (selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleToYard &&
                selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupYardPK !== null &&
                selectedUnitData?.editMasterExpressCustomerTabDTO?.pickupShuttleCityPK === null) ||
              (selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleToYard &&
                !editedUnitDataToSaveForSettingsTab?.inPickupYard)
                ? ""
                : pickupYardRow?.trim() !== ""
                  ? "borderGreen"
                  : "borderRed"
            }`}
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            disabled={viewDetail || pickupYardId === ""}
            maxLength={4}
            value={pickupYardRow}
            onInput={(e) => {
              let value = e.target.value;
              if (value !== "") {
                if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                  value = value.substring(1);
                }
              }
              setPickupYardRow(value);
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Yard Position */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}>
            Yard Position
          </Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            disabled={viewDetail || pickupYardId === ""}
            maxLength={4}
            value={pickupYardPosition}
            onInput={(e) => {
              let value = e.target.value;
              if (value !== "") {
                if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                  value = value.substring(1);
                }
              }
              setPickupYardPosition(value);
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Pickup Yard Lookup Modal */}
      <YardLookup
        show={pickupYardSelection}
        onHide={hidePickupYardModal}
        renderItemId={(yard) => yard.yardPK}
        handleLookupSelection={handlePickupYardLookupSelection}
        EditMasterExpress
        OECustomerPickupYard={true}
      />
      {/* ********************* */}
      {/* Pickup Shuttle City Lookup Modal */}
      <ShuttleCityLookup
        show={pickupShuttleCitySelection}
        onHide={pickupShuttleCityModalHide}
        renderItemId={(shuttleCity) => shuttleCity.shuttleCityPK}
        handleLookupSelection={handlePickupShuttleCityLookupSelection}
        EditMasterExpress
        OECustomerPickupCity={true}
      />
    </Col>
  );
};

export default CustomerTabColumn1;
