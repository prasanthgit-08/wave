import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../common/LookupButton";
import OrderEntryService from "../../../../../../services/OrderEntryService";
import YardLookup from "../../../../../LookupScreens/Yard/YardLookup";
import ShuttleCityLookup from "../../../../../LookupScreens/ShuttleCity/ShuttleCityLookup";
import {
  setIsCustomerTabColumn2TabValidation,
  setEditedUnitDataToSaveForCustomerTab,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

const CustomerTabColumn2 = ({ styles }) => {
  const dispatch = useDispatch();

  //Local States
  const [deliveryYardsData, setDeliveryYardsData] = useState([]);
  const [deliveryYardInput, setDeliveryYardInput] = useState("");
  const [deliveryYardId, setDeliveryYardId] = useState("");
  const [deliveryYardSelection, setDeliveryYardSelection] = useState(false);
  const [deliveryYardAddress1, setDeliveryYardAddress1] = useState("");
  const [deliveryYardAddress2, setDeliveryYardAddress2] = useState("");
  const [deliveryYardPostalCode, setDeliveryYardPostalCode] = useState("");
  const [deliveryYardCity, setDeliveryYardCity] = useState("");
  const [deliveryYardStateCode, setDeliveryYardStateCode] = useState("");
  const [deliveryShuttleCityData, setDeliveryShuttleCityData] = useState([]);
  const [deliveryShuttleCityInput, setDeliveryShuttleCityInput] = useState("");
  const [deliveryShuttleCityId, setDeliveryShuttleCityId] = useState("");
  const [deliveryShuttleCitySelection, setDeliveryShuttleCitySelection] = useState(false);
  const [autoCompleteLoading, setAutoCompleteLoading] = useState(false);

  //States From Redux
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);

  /**
   * Fetch all Outbound/Reload Yards for the selected delivery plant.
   * Used for Delivery Yards Autocomplete
   */
  const fetchDeliveryYardDetailsByName = (string) => {
    setAutoCompleteLoading(true);
    OrderEntryService.fetchYardDetailsByName(
      selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPK,
      selectedUnitData?.editMasterExpressCustomerTabDTO?.billingPlantPK,
      !selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantOutbound,
      selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantOutbound,
      string
    )
      .then((response) => {
        const data = response.data.content;
        const yardsList = data?.map((yards) => ({ ...yards, description: yards.description?.trim() }));
        setDeliveryYardsData(yardsList);
      })
      .catch((err) => {})
      .finally(() => setAutoCompleteLoading(false));
  };

  /**
   * used for Delivery Yard Autocomplete Dropdown
   */
  const handleDeliveryYardSelection = (yard) => {
    setDeliveryYardId(yard.yardPK);
    setDeliveryYardInput(yard.description);
    setDeliveryYardAddress1(yard.address1?.trim());
    setDeliveryYardAddress2(yard.address2?.trim());
    setDeliveryYardPostalCode(yard.postalCode?.trim());
    setDeliveryYardCity(yard.city?.trim());
    setDeliveryYardStateCode(yard.stateCode?.trim());
  };

  /**
   * used for Delivery Yard selection Lookup - open
   */
  const handleDeliveryYardLookupModalshow = () => {
    setDeliveryYardSelection(true);
  };
  /**
   * used for Delivery Yard selection Lookup - onSelect
   */
  const handleDeliveryYardLookupSelection = (yard) => {
    setDeliveryYardId(yard.yardPK);
    setDeliveryYardInput(yard.description);
    setDeliveryYardAddress1(yard.address1?.trim());
    setDeliveryYardAddress2(yard.address2?.trim());
    setDeliveryYardPostalCode(yard.postalCode?.trim());
    setDeliveryYardCity(yard.city?.trim());
    setDeliveryYardStateCode(yard.stateCode?.trim());
    setDeliveryYardSelection(false);
  };

  /**
   * used for Delivery Yard selection Lookup - close
   */
  const hideDeliveryYardModal = () => {
    setDeliveryYardSelection(false);
  };

  /**
   * Fetch all Outbound/Reload Shuttle Citys for the selected delivery plant.
   * Used for Delivery Shuttle Citys Autocomplete
   */
  const fetchDeliveryCityDetailsByName = (string) => {
    setAutoCompleteLoading(true);
    OrderEntryService.fetchCityDetailsByName(
      selectedUnitData?.editMasterExpressCustomerTabDTO?.customerPK,
      selectedUnitData?.editMasterExpressCustomerTabDTO?.billingPlantPK,
      !selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantOutbound,
      selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantOutbound,
      string
    )
      .then((response) => {
        const data = response.data.content;
        const cityList = data?.map((cities) => ({ ...cities, city: cities.city?.trim() }));
        setDeliveryShuttleCityData(cityList);
      })
      .catch((err) => {})
      .finally(() => setAutoCompleteLoading(false));
  };

  /**
   * used for Delivery City Autocomplete Dropdown
   */
  const handleDeliveryCitySelection = (city) => {
    setDeliveryShuttleCityInput(city.city);
    setDeliveryShuttleCityId(city.shuttleCityPK);
  };

  /**
   * used for Delivery Shuttle City selection Lookup - open
   */
  const handleDeliveryShuttleCityLookupModalShow = () => {
    setDeliveryShuttleCitySelection(true);
  };
  /**
   * used for Delivery Shuttle City selection Lookup - onSelect
   */
  const handleDeliveryShuttleCityLookupSelection = (shuttleCity) => {
    setDeliveryShuttleCityId(shuttleCity.shuttleCityPK);
    setDeliveryShuttleCityInput(shuttleCity.city);
    setDeliveryShuttleCitySelection(false);
  };

  /**
   * used for Delivery Shuttle City selection Lookup - close
   */
  const deliveryShuttleCityModalHide = () => {
    setDeliveryShuttleCitySelection(false);
  };

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData != null) {
      setDeliveryYardId(selectedUnitData?.editMasterExpressCustomerTabDTO?.deliveryYardPK || "");
      setDeliveryYardInput(selectedUnitData?.editMasterExpressCustomerTabDTO?.deliveryYardDescription || "");
      setDeliveryYardAddress1(selectedUnitData?.editMasterExpressCustomerTabDTO?.deliveryYardAddress1 || "");
      setDeliveryYardAddress2(selectedUnitData?.editMasterExpressCustomerTabDTO?.deliveryYardAddress2 || "");
      setDeliveryYardPostalCode(
        selectedUnitData?.editMasterExpressCustomerTabDTO?.deliveryYardPostalCode || ""
      );
      setDeliveryYardCity(selectedUnitData?.editMasterExpressCustomerTabDTO?.deliveryYardCity || "");
      setDeliveryYardStateCode(
        selectedUnitData?.editMasterExpressCustomerTabDTO?.deliveryYardStateCode || ""
      );
      setDeliveryShuttleCityId(
        selectedUnitData?.editMasterExpressCustomerTabDTO?.deliveryShuttleCityPK || ""
      );
      setDeliveryShuttleCityInput(
        selectedUnitData?.editMasterExpressCustomerTabDTO?.deliveryShuttleCityName || ""
      );
    }
  }, [selectedUnitData, viewDetail]);

  // Tab Validation
  useEffect(() => {
    const customerTabData = selectedUnitData?.editMasterExpressCustomerTabDTO;

    // A field is mandatory only when it is shuttled from yard & the field is enabled
    const isDeliveryYardMandatory =
      customerTabData?.shuttleFromYard && customerTabData?.customerDeliveryPlantSelectYard;
    const isDeliveryShuttleCityMandatory =
      customerTabData?.shuttleFromYard && customerTabData?.customerDeliveryPlantSelectShuttleCity;

    const isDeliveryYardValid =
      !isDeliveryYardMandatory ||
      (deliveryYardId !== "" && deliveryYardId !== null && deliveryYardInput !== "");

    const isDeliveryShuttleCityValid =
      !isDeliveryShuttleCityMandatory ||
      (deliveryShuttleCityId !== "" && deliveryShuttleCityId !== null && deliveryShuttleCityInput !== "");

    dispatch(setIsCustomerTabColumn2TabValidation(isDeliveryYardValid && isDeliveryShuttleCityValid));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUnitData, deliveryYardId, deliveryYardInput, deliveryShuttleCityId, deliveryShuttleCityInput]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDataToSaveForCustomerTab({
        deliveryYardFK: deliveryYardId,
        deliveryShuttleCityFK: deliveryShuttleCityId,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryYardId, deliveryShuttleCityId]);

  return (
    <Col xs={5} className="ms-3">
      {/* ********************* */}
      <Form.Group className="mt-2 align-items-center row invisible m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}></Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input className={`customFormControl`} type="text" autoComplete="off" aria-autocomplete="list" />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Billing Plant */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Billing Plant</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.billingPlantName || ""}
            disabled
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Billing Plant - Address1 */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Address</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.billingPlantAddress1 || ""}
            disabled
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Billing Plant - Address2 */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}></Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.billingPlantAddress2 || ""}
            disabled
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Billing Plant - City,State,ZIP */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}>
            City,State,ZIP
          </Form.Label>
        </Col>
        {/* ********************* */}
        {/* Billing Plant - City */}
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.billingPlantCity || ""}
            disabled
          />
        </Col>
        {/* ********************* */}
        {/* Billing Plant - StateCode */}
        <Col className="p-0 w-30px mx-1">
          <input
            className={`customFormControl`}
            type="text"
            disabled
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.billingPlantStateCode || ""}
          />
        </Col>
        {/* ********************* */}
        {/* Billing Plant - Postal Code */}
        <Col xs={1} md={1} sm={1} className="p-0">
          <input
            className={`customFormControl w-80px`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.billingPlantPostalCode || ""}
            disabled
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Deliver To Plant */}
      <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Deliver To Plant</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.deliverToPlant || false}
            checked={selectedUnitData?.editMasterExpressCustomerTabDTO?.deliverToPlant || false}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Delivery Plant */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Delivery Plant</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantName || ""}
            disabled
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Delivery Plant - Address1 */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Address</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantAddress1 || ""}
            disabled
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Delivery Plant - Address2 */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}></Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantAddress2 || ""}
            disabled
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Delivery Plant -  City,State,ZIP */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}>
            City,State,ZIP
          </Form.Label>
        </Col>

        {/* Delivery Plant - City */}
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            disabled
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantCity || ""}
          />
        </Col>
        {/* ********************* */}
        {/* Delivery Plant - StateCode */}
        <Col className="p-0 w-30px mx-1">
          <input
            className={`customFormControl`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantStateCode || ""}
            disabled
          />
        </Col>
        {/* ********************* */}
        {/* Delivery Plant - PostalCode */}
        <Col xs={1} md={1} sm={1} className="p-0">
          <input
            className={`customFormControl w-80px`}
            type="text"
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantPostalCode || ""}
            disabled
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Shuttle From Yard */}
      <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Shuttle From Yard</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled
            value={selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleFromYard || false}
            checked={selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleFromYard || false}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Delivery Yard Autocomplete */}
      <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Delivery Yard</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className={`p-0 ${styles.selectContainer}`}>
          {/* Delivery Yard Autocomplete */}
          <AutoCompleteDropdown
            arrayList={deliveryYardsData}
            searchString={deliveryYardInput}
            renderItemId={(yard) => yard.yardPK}
            renderItemField={(yard) => yard.description}
            selectedId={deliveryYardId}
            handleSearchString={(string) => setDeliveryYardInput(string)}
            fetchDataBySearchString={fetchDeliveryYardDetailsByName}
            onSelect={handleDeliveryYardSelection}
            clearInputCallback={() => {
              setDeliveryYardId("");
              setDeliveryYardAddress1("");
              setDeliveryYardAddress2("");
              setDeliveryYardPostalCode("");
              setDeliveryYardCity("");
              setDeliveryYardStateCode("");
            }}
            loading={autoCompleteLoading}
            className={`${
              viewDetail ||
              !selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantSelectYard
                ? ""
                : selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleFromYard
                  ? deliveryYardId === "" || deliveryYardId === null || deliveryYardInput === ""
                    ? "borderRed"
                    : "borderGreen"
                  : ""
            }`}
            disabled={
              !selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleFromYard ||
              viewDetail ||
              !selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantSelectYard
            }
            towardsTop
          />
          {selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantSelectYard && (
            <LookupButton onClick={handleDeliveryYardLookupModalshow} disabled={viewDetail} />
          )}
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Delivery Yard - Address1*/}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}>
            Address
          </Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input className={`customFormControl`} type="text" value={deliveryYardAddress1 || ""} disabled />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Delivery Yard - Address2*/}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}></Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input className={`customFormControl`} type="text" value={deliveryYardAddress2 || ""} disabled />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Delivery Yard - City,State,ZIP*/}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}>
            City,State,ZIP
          </Form.Label>
        </Col>
        {/* ********************* */}
        {/* Delivery Yard - City */}
        <Col xs={6} md={6} sm={6} className="p-0">
          <input className={`customFormControl`} type="text" value={deliveryYardCity || ""} disabled />
        </Col>
        {/* ********************* */}
        {/* Delivery Yard - StateCode*/}
        <Col className="p-0 w-30px mx-1">
          <input className={`customFormControl`} type="text" value={deliveryYardStateCode || ""} disabled />
        </Col>
        {/* ********************* */}
        {/* Delivery Yard - Postal Code*/}
        <Col xs={1} md={1} sm={1} className="p-0">
          <input
            className={`customFormControl w-80px`}
            type="text"
            value={deliveryYardPostalCode || ""}
            disabled
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Delivery City Autocomplete */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Delivery City</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className={`p-0 ${styles.selectContainer}`}>
          {/* Delivery City Autocomplete */}
          <AutoCompleteDropdown
            arrayList={deliveryShuttleCityData}
            searchString={deliveryShuttleCityInput}
            renderItemId={(city) => city.shuttleCityPK}
            renderItemField={(city) => city.city}
            selectedId={deliveryShuttleCityId}
            handleSearchString={(string) => setDeliveryShuttleCityInput(string)}
            fetchDataBySearchString={fetchDeliveryCityDetailsByName}
            onSelect={handleDeliveryCitySelection}
            clearInputCallback={() => {
              setDeliveryShuttleCityId("");
            }}
            loading={autoCompleteLoading}
            className={`${
              viewDetail ||
              !selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantSelectShuttleCity
                ? ""
                : selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleFromYard
                  ? deliveryShuttleCityId === "" ||
                    deliveryShuttleCityId === null ||
                    deliveryShuttleCityInput === ""
                    ? "borderRed"
                    : "borderGreen"
                  : ""
            }`}
            disabled={
              !selectedUnitData?.editMasterExpressCustomerTabDTO?.shuttleFromYard ||
              viewDetail ||
              !selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantSelectShuttleCity
            }
            towardsTop
          />
          {selectedUnitData?.editMasterExpressCustomerTabDTO?.customerDeliveryPlantSelectShuttleCity && (
            <LookupButton onClick={handleDeliveryShuttleCityLookupModalShow} disabled={viewDetail} />
          )}
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Delivery Yard Lookup Modal */}
      <YardLookup
        show={deliveryYardSelection}
        onHide={hideDeliveryYardModal}
        renderItemId={(yard) => yard.yardPK}
        handleLookupSelection={handleDeliveryYardLookupSelection}
        EditMasterExpress
        OECustomerDeliveryYard={true}
      />
      {/* ********************* */}
      {/* Delivery Shuttle City Lookup Modal */}
      <ShuttleCityLookup
        show={deliveryShuttleCitySelection}
        onHide={deliveryShuttleCityModalHide}
        renderItemId={(shuttleCity) => shuttleCity.shuttleCityPK}
        handleLookupSelection={handleDeliveryShuttleCityLookupSelection}
        EditMasterExpress
        OECustomerDeliveryCity={true}
      />
    </Col>
  );
};

export default CustomerTabColumn2;
