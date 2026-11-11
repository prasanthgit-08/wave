import React, { useEffect, useRef, useState } from "react";
import { Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AutoCompleteDropdown from "../../../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../../../common/LookupButton";
import styles from "../../../../../../../../styles/QuarterScreen.module.css";
import RerouteService from "../../../../../../../../services/RerouteService";
import {
  setCurrentDeliveryNormalDealerData,
  setCurrentDeliveryMiscellaneousDealerData,
  setDeliveryDealersList,
  setDeliveryDealerName,
  setDeliveryNormalDealerFK,
  setSelectedNewDeliveryNormalDealerData,
  setMiscellaneousDelivery,
  setDeliveryDealersearchType,
  setHasChangedDeliveryMiscDealer,
  setHasClearedDeliveryDealerAutoComplete,
  setSelectedDeliveryDealer,
  setHasSelectedDeliveryDealer,
  setInvoiceMiles,
  setDriverMiles,
  setIsInvoiceFlatrateVisible,
  setIsDriverFlatrateVisible,
  setInvoiceFlatrate,
  setDriverFlatrate,
  setHasChangedDeliveryMiscDealerStateCode,
  setUpdatedDeliveryMiscDealerData,
  setMiscDeliveryID,
  setRateObj,
} from "../../../../../../../../redux/RerouteSlice";
import DealerLookup from "../../../../../../../LookupScreens/Dealer/DealerLookup";
import LoadingIcon from "../../../../../../../common/LoadingIcon";

function RerouteDeliveryLocationNormalDealerFormContent() {
  const dispatch = useDispatch();
  const isInitialRender = useRef(true);

  const deliveryDealerFK = useSelector((state) => state.rerouteReducer.deliveryDealerFK);
  const deliveryUnitAddressFK = useSelector((state) => state.rerouteReducer.deliveryUnitAddressFK);
  const currentDeliveryNormalDealerData = useSelector(
    (state) => state.rerouteReducer.currentDeliveryNormalDealerData
  );
  const currentDeliveryMiscellaneousDealerData = useSelector(
    (state) => state.rerouteReducer.currentDeliveryMiscellaneousDealerData
  );
  const deliveryDealersList = useSelector((state) => state.rerouteReducer.deliveryDealersList);
  const deliveryDealerName = useSelector((state) => state.rerouteReducer.deliveryDealerName);
  const deliveryNormalDealerFK = useSelector((state) => state.rerouteReducer.deliveryNormalDealerFK);
  const selectedNewDeliveryNormalDealerData = useSelector(
    (state) => state.rerouteReducer.selectedNewDeliveryNormalDealerData
  );
  const miscellaneousDelivery = useSelector((state) => state.rerouteReducer.miscellaneousDelivery);
  const companyId = useSelector((state) => state.rerouteReducer.companyId);
  const deliveryDealersearchType = useSelector((state) => state.rerouteReducer.deliveryDealersearchType);
  const selectedUnitInfo = useSelector((state) => state.rerouteReducer.selectedUnitInfo);
  const hasSelectedDeliveryDealer = useSelector((state) => state.rerouteReducer.hasSelectedDeliveryDealer);

  let deliveryDealerFKLocal = !miscellaneousDelivery
    ? selectedNewDeliveryNormalDealerData.DealerPK ||
      currentDeliveryNormalDealerData.DealerPK ||
      deliveryDealerFK ||
      null
    : null;
  //Local State Declaration
  const [deliveryDealerListLoading, setDeliveryDealerListLoading] = useState(false);
  const [deliveryDealerLookup, setDeliveryDealerLookup] = useState(false);

  const [currentDealerLoading, setCurrentDealerLoading] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [loading, setLoading] = useState(false);

  //Get Delivery Dealer By Id
  const getNormalDealerById = (id, companyId) => {
    if (id) {
      setCurrentDealerLoading(true);
      RerouteService.getNormalDealerById(id, companyId)
        .then((response) => {
          const data = response.data;
          // if (id === selectedUnitInfo.deliveryDealerFK) {
          //   dispatch(setCurrentDeliveryNormalDealerData(data[0]));
          // } else {
          dispatch(setSelectedNewDeliveryNormalDealerData(data[0]));
          // }
        })
        .catch((error) => {})
        .finally(() => setCurrentDealerLoading(false));
    }
  };

  //Get Delivery Miscellaneous Dealer By Id
  const fetchMiscellaneousDealerById = (id) => {
    if (id) {
      setLoading(true);
      RerouteService.fetchMiscellaneousDealerById(id, companyId)
        .then((response) => {
          const data = response.data;
          dispatch(setCurrentDeliveryMiscellaneousDealerData(data[0]));
        })
        .catch((error) => {})
        .finally(() => setLoading(false));
    }
  };

  //Get Delivery Normal Dealer for autocomplete
  const getDeliveryNormalDealersByName = (string) => {
    setDeliveryDealerListLoading(true);
    RerouteService.fetchDealersForReroutes(string, companyId, deliveryDealersearchType)
      .then((response) => {
        const data = response.data;
        const filteredList = data
          ?.filter((item) => item?.Type !== "Pagination")
          ?.map((item) => ({ ...item, Name: item?.Name?.trim() }));
        dispatch(setDeliveryDealersList(filteredList));
        setDeliveryDealerListLoading(false);
      })
      .catch((err) => {
        setDeliveryDealerListLoading(false);
      });
  };

  //Handle selection from autocomplete dropdown
  const handleDeliveryNormalDealerSelection = (dealer) => {
    dispatch(setHasSelectedDeliveryDealer(true));
    dispatch(setDeliveryDealerName(dealer?.Name?.trim() || ""));
    dispatch(setInvoiceMiles(0));
    dispatch(setDriverMiles(0));
    dispatch(setIsInvoiceFlatrateVisible(false));
    dispatch(setIsDriverFlatrateVisible(false));
    if (deliveryNormalDealerFK === dealer?.dealerPK) {
      dispatch(setHasChangedDeliveryMiscDealer(false));
    } else {
      dispatch(setHasChangedDeliveryMiscDealer(true));
    }
    dispatch(setDeliveryNormalDealerFK(dealer?.DealerPK));
    setDeliveryDealerLookup(false);
    getNormalDealerById(dealer?.DealerPK, companyId);
    dispatch(setHasChangedDeliveryMiscDealerStateCode(true));
  };

  // Default check if miscellaneousDelivery
  useEffect(() => {
    if (deliveryNormalDealerFK) {
      dispatch(setMiscellaneousDelivery(false));
    } else if (selectedUnitInfo?.deliveryUnitAddressFK && !deliveryDealerFKLocal) {
      dispatch(setMiscellaneousDelivery(true));
    }
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    dispatch(setInvoiceMiles(0));
    dispatch(setDriverMiles(0));
    dispatch(setInvoiceFlatrate(0));
    dispatch(setDriverFlatrate(0));
  }, [deliveryDealerFKLocal, selectedUnitInfo?.deliveryCustomerPlantFK]);

  //Useeffect - service to get normal dealer by id
  useEffect(() => {
    getNormalDealerById(deliveryNormalDealerFK || deliveryDealerFK, companyId);
  }, []);

  useEffect(() => {
    if (hasSelectedDeliveryDealer === true) {
      let selectedDealer = selectedNewDeliveryNormalDealerData || currentDeliveryNormalDealerData;
      setSelectedDealer(selectedDealer);
    } else {
      setSelectedDealer(null);
    }
    dispatch(setSelectedDeliveryDealer(selectedDealer));
  }, [hasSelectedDeliveryDealer, selectedNewDeliveryNormalDealerData, currentDeliveryNormalDealerData]);

  //Useeffect - service to get miscellaneous dealer by id
  useEffect(() => {
    fetchMiscellaneousDealerById(deliveryUnitAddressFK);
  }, [deliveryUnitAddressFK]);

  useEffect(() => {
    dispatch(setHasChangedDeliveryMiscDealer(false));
    dispatch(setHasClearedDeliveryDealerAutoComplete(false));
  }, []);

  return (
    <div className="w-100 p-2">
      {(currentDealerLoading || loading) && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight ps-3">
        {/* Current Delivery */}
        <Form.Group className="mt-4 align-items-center row  m-l-5 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label dealer-label">Current Delivery</Form.Label>
          </Col>
          <Col xs={4} md={4} sm={4} className="p-0" style={{ marginLeft: "-3px", width: "275px" }}>
            <input
              className="customFormControl"
              name="ad1"
              type="text"
              value={selectedUnitInfo?.deliveryName || currentDeliveryMiscellaneousDealerData?.Name || ""}
              disabled
              autoComplete="one-time-code"
              spellCheck={false}
              aria-autocomplete="list"
            />
          </Col>
        </Form.Group>
        {/* Address-1 */}
        <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0"></Col>
          <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "275px" }}>
            <input
              className="customFormControl"
              name="ad2"
              type="text"
              value={
                selectedUnitInfo?.deliveryAddress1 || currentDeliveryMiscellaneousDealerData?.Address1 || ""
              }
              disabled
              autoComplete="one-time-code"
              spellCheck={false}
              aria-autocomplete="list"
            />
          </Col>
        </Form.Group>

        {/* Address-2 */}
        <Form.Group className="mt-2 mb-3 align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0"></Col>
          <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "275px" }}>
            <input
              className="customFormControl"
              name="ad2"
              type="text"
              value={
                selectedUnitInfo?.deliveryAddress2 || currentDeliveryMiscellaneousDealerData?.Address2 || ""
              }
              disabled
              autoComplete="one-time-code"
              spellCheck={false}
              aria-autocomplete="list"
            />
          </Col>
        </Form.Group>

        {/* City,State, Zip */}
        <Form.Group className="form-group align-items-center row m-0 mb-3">
          <Col sm={3} md={3} xs={3} className="p-0 text-start">
            <Form.Label htmlFor="name" className="col-form-label me-2"></Form.Label>
          </Col>

          {/* City */}
          <Col xs={1} md={1} sm={1} className="p-0 w-275px" style={{ marginRight: "8px" }}>
            <input
              className="customFormControl  "
              name="city"
              type="text"
              disabled
              value={selectedUnitInfo?.deliveryCity || currentDeliveryMiscellaneousDealerData?.City || ""}
            />
          </Col>
          {/* State Code */}
          <Col xs={1} md={1} sm={1} className="p-0" style={{ marginRight: "8px", width: "30px" }}>
            <input
              className="customFormControl"
              name="stateCode"
              type="text"
              disabled
              value={
                selectedUnitInfo?.deliveryStateCode || currentDeliveryMiscellaneousDealerData?.StateCode || ""
              }
            />
          </Col>

          {/* Zip */}
          <Col xs={1} md={1} sm={1} className="p-0" style={{ width: "85px" }}>
            <input
              className="customFormControl"
              name="postalCode"
              type="text"
              disabled
              value={
                selectedUnitInfo?.deliveryPostalCode ||
                currentDeliveryMiscellaneousDealerData?.PostalCode ||
                ""
              }
            />
          </Col>
        </Form.Group>

        {/* Delivery Dealer Dropdown */}
        <Form.Group className="mt-4 m-b-10 align-items-center row m-l-5 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label dealer-label ">Delivery Dealer</Form.Label>
          </Col>
          <Col xs={4} md={4} sm={4} className="d-flex align-items-center p-0" style={{ marginLeft: "-3px" }}>
            <AutoCompleteDropdown
              arrayList={deliveryDealersList}
              searchString={deliveryDealerName}
              renderItemId={(dealer) => dealer.DealerPK}
              renderItemField={(dealer) => dealer.Name}
              handleSearchString={(string) => dispatch(setDeliveryDealerName(string))}
              fetchDataBySearchString={getDeliveryNormalDealersByName}
              onSelect={handleDeliveryNormalDealerSelection}
              selectedId={deliveryNormalDealerFK}
              matchContains
              clearInputCallback={() => {
                dispatch(setHasSelectedDeliveryDealer(false));
                dispatch(setSelectedNewDeliveryNormalDealerData(""));
                dispatch(setDeliveryNormalDealerFK(""));
                dispatch(setHasClearedDeliveryDealerAutoComplete(true));
                dispatch(setHasChangedDeliveryMiscDealerStateCode(false));
              }}
              className={`${
                miscellaneousDelivery === true
                  ? "black"
                  : deliveryNormalDealerFK === ""
                    ? "borderRed"
                    : "borderGreen"
              }`}
              disabled={miscellaneousDelivery === true ? true : false}
              loading={deliveryDealerListLoading}
              maxHeight="200px"
            />
            <LookupButton
              onClick={() => {
                setDeliveryDealerLookup(true);
              }}
              disabled={miscellaneousDelivery === true ? true : false}
            />
          </Col>
        </Form.Group>

        {/* Search By State/City */}
        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0">
          <Col
            sm={3}
            md={3}
            xs={3}
            className="p-0  d-flex justify-content-end"
            style={{
              position: "relative",
              right: "20px",
            }}
          >
            <Form.Label htmlFor="" className={""}>
              Search By State/City
            </Form.Label>
            <input
              type="radio"
              name="name"
              value="searchByStateCity"
              checked={deliveryDealersearchType === "searchByStateCity"}
              onChange={(e) => {
                dispatch(setDeliveryDealerName(""));
                dispatch(setDeliveryNormalDealerFK(""));
                dispatch(setDeliveryDealersearchType(e.target.value));
              }}
              className={""}
              disabled={miscellaneousDelivery === true ? true : false}
              style={{ marginLeft: "5px" }}
            />
          </Col>
          <Col xs={3} md={3} sm={3} className="p-0 flex-shrink-0" style={{ width: "275px" }}>
            <input
              className={`customFormControl w-320px `}
              name="pickupDealerAdd1"
              value={selectedDealer?.Address1 || ""}
              disabled
              type="text"
            />
          </Col>
        </Form.Group>

        {/* Search By Name */}
        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0">
          <Col
            sm={3}
            md={3}
            xs={3}
            className="p-0  d-flex justify-content-end"
            style={{
              position: "relative",
              right: "20px",
            }}
          >
            <Form.Label htmlFor="" className={""}>
              Search By Name
            </Form.Label>
            <input
              type="radio"
              name="name"
              value="Name"
              checked={deliveryDealersearchType === "Name"}
              onChange={(e) => {
                dispatch(setDeliveryDealerName(""));
                dispatch(setDeliveryNormalDealerFK(""));
                dispatch(setDeliveryDealersearchType(e.target.value));
              }}
              className={""}
              disabled={miscellaneousDelivery === true ? true : false}
              style={{ marginLeft: "5px" }}
            />
          </Col>
          <Col xs={3} md={3} sm={3} className="p-0 flex-shrink-0" style={{ width: "275px" }}>
            <input
              className={`customFormControl  w-320px`}
              name="pickupDealerAdd2"
              value={selectedDealer?.Address2 || ""}
              disabled
              type="text"
            />
          </Col>
        </Form.Group>

        <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0 ms-0">
          <Col sm={3} md={3} xs={3} className="p-0 text-start">
            <Form.Label htmlFor="name" className="col-form-label me-4"></Form.Label>
          </Col>

          <Col xs={2} md={2} sm={2} className="p-0 w-275px">
            <input
              className="customFormControl "
              name="city"
              type="text"
              disabled
              value={selectedDealer?.City || ""}
            />
          </Col>
          <Col xs={1} md={1} sm={1} className="p-0" style={{ width: "31px", marginLeft: "8px" }}>
            <input
              className="customFormControl"
              name="stateCode"
              type="text"
              disabled
              value={selectedDealer?.StateCode || ""}
            />
          </Col>
          <Col xs={1} md={1} sm={1} className="p-0" style={{ marginLeft: "8px", width: "88px" }}>
            <input
              className="customFormControl"
              name="postalCode"
              type="text"
              disabled
              value={selectedDealer?.PostalCode || ""}
            />
          </Col>
        </Form.Group>

        {/* Miscellaneous Delivery */}
        <Form.Group className={`mt-2 m-b-10 align-items-center row m-l-5 m-r-0 ${styles.colFormLabel}`}>
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label dealer-label">Miscellaneous Delivery</Form.Label>
          </Col>
          <Col xs={3} md={3} sm={3} className="p-0" style={{ marginLeft: "-3px" }}>
            <input
              type="checkbox"
              className="form-check-input p-0"
              name="miscellaneousPickup"
              checked={miscellaneousDelivery}
              value={miscellaneousDelivery}
              onChange={(e) => {
                dispatch(setInvoiceMiles(""));
                dispatch(setDriverMiles(""));
                dispatch(setIsInvoiceFlatrateVisible(false));
                dispatch(setIsDriverFlatrateVisible(false));
                dispatch(setSelectedNewDeliveryNormalDealerData(""));
                dispatch(setDeliveryNormalDealerFK(""));
                dispatch(setDeliveryDealerName(""));
                dispatch(setDeliveryDealersearchType("searchByStateCity"));
                dispatch(setMiscellaneousDelivery(e.target.checked));
                dispatch(setHasChangedDeliveryMiscDealerStateCode(e.target.checked));
                dispatch(setRateObj(null));
                dispatch(setUpdatedDeliveryMiscDealerData(null));
                dispatch(setMiscDeliveryID(null));
              }}
            />
          </Col>
        </Form.Group>
        <DealerLookup
          show={deliveryDealerLookup}
          onHide={() => setDeliveryDealerLookup(false)}
          renderItemId={(dealer) => dealer.DealerPK}
          handleLookupSelection={handleDeliveryNormalDealerSelection}
          DriverReroutes
          companyId={companyId}
        />
      </div>
    </div>
  );
}

export default RerouteDeliveryLocationNormalDealerFormContent;
