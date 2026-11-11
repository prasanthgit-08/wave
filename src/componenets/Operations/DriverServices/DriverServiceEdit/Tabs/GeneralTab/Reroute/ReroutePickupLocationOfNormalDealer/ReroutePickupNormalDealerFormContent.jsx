import React, { useEffect, useRef, useState } from "react";
import { Form, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AutoCompleteDropdown from "../../../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../../../common/LookupButton";
import styles from "../../../../../../../../styles/QuarterScreen.module.css";
import RerouteService from "../../../../../../../../services/RerouteService";
import {
  setNormalDealerData,
  setNormalDealersList,
  setNormalDealerName,
  setPickupNormalDealerFK,
  setMiscellaneousDealerData,
  setSelectedNewPickupNormalDealerData,
  setMiscellaneousPickup,
  setSelectedNewDeliveryMiscellneousDealerData,
  setPickupDealersearchType,
  setHasChangedPickupMiscDealer,
  setHasClearedPickupDealerAutoComplete,
  setSelectedPickupDealer,
  setHasSelectedPickupDealer,
  setInvoiceMiles,
  setDriverMiles,
  setInvoiceFlatrate,
  setDriverFlatrate,
  setIsDriverFlatrateVisible,
  setIsInvoiceFlatrateVisible,
  setHasChangedPickupMiscDealerStateCode,
  setUpdatedPickupMiscDealerData,
  setMiscPickupID,
  setRateObj,
} from "../../../../../../../../redux/RerouteSlice";
import DealerLookup from "../../../../../../../LookupScreens/Dealer/DealerLookup";
import { setMiscPickup } from "../../../../../../../../redux/OrderEntryFilterSlice";
import LoadingIcon from "../../../../../../../common/LoadingIcon";

function ReroutePickupNormalDealerFormContent() {
  const dispatch = useDispatch();
  const isInitialRender = useRef(true);

  const pickupDealerFK = useSelector((state) => state.rerouteReducer.pickupNormalDealerFK);
  const pickupUnitAddressFK = useSelector((state) => state.rerouteReducer.pickupUnitAddressFK);
  const normalDealerName = useSelector((state) => state.rerouteReducer.normalDealerName);
  const normalDealersList = useSelector((state) => state.rerouteReducer.normalDealersList);
  const pickupNormalDealerFK = useSelector((state) => state.rerouteReducer.pickupNormalDealerFK);
  const normalDealerData = useSelector((state) => state.rerouteReducer.normalDealerData);
  const selectedNewPickupNormalDealerData = useSelector(
    (state) => state.rerouteReducer.selectedNewPickupNormalDealerData
  );
  const miscellaneousPickup = useSelector((state) => state.rerouteReducer.miscellaneousPickup);
  const selectedUnitInfo = useSelector((state) => state.rerouteReducer.selectedUnitInfo);
  const companyId = useSelector((state) => state.rerouteReducer.companyId);
  const pickupDealersearchType = useSelector((state) => state.rerouteReducer.pickupDealersearchType);
  const hasSelectedPickupDealer = useSelector((state) => state.rerouteReducer.hasSelectedPickupDealer);
  const pickUpNormalDealerData = useSelector((state) => state.rerouteReducer.normalDealerData);

  let pickupDealerFKLocal = !miscellaneousPickup
    ? selectedNewPickupNormalDealerData.DealerPK || pickUpNormalDealerData.DealerPK || pickupDealerFK || null
    : null;

  //Local State Declaration
  const [pickupDealerListLoading, setPickupDealerListLoading] = useState(false);
  const [pickupDealerLookup, setPickupDealerLookup] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [miscLoading, setMicsLoading] = useState(false);

  //Get Normal Dealer By Id
  const getNormalDealerById = (id, companyId) => {
    if (id) {
      setLoading(true);
      RerouteService.getNormalDealerById(id, companyId)
        .then((response) => {
          const data = response.data;
          dispatch(setSelectedNewPickupNormalDealerData(data[0]));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  //Get Miscellaneous Dealer By Id
  const fetchMiscellaneousDealerById = (id, companyId) => {
    if (id) {
      setMicsLoading(true);
      RerouteService.fetchMiscellaneousDealerById(id, companyId)
        .then((response) => {
          const data = response.data;
          dispatch(setMiscellaneousDealerData(data[0]));
        })
        .catch((error) => {})
        .finally(() => setMicsLoading(false));
    }
  };

  //Get Pickup Normal Dealer for autocomplete
  const getPickupNormalDealersByName = (string = "") => {
    setPickupDealerListLoading(true);
    RerouteService.fetchDealersForReroutes(string, companyId, pickupDealersearchType)
      .then((response) => {
        const data = response.data;

        const filteredList = data
          ?.filter((item) => item?.Type !== "Pagination")
          ?.map((item) => ({ ...item, Name: item?.Name?.trim() }));

        dispatch(setNormalDealersList(filteredList));
        setPickupDealerListLoading(false);
      })
      .catch((err) => {
        setPickupDealerListLoading(false);
      });
  };

  //Handle selection from autocomplete dropdown
  const handlePickupNormalDealerSelection = (dealer) => {
    dispatch(setHasSelectedPickupDealer(true));
    dispatch(setNormalDealerName(dealer.Name));
    dispatch(setInvoiceMiles(0));
    dispatch(setDriverMiles(0));
    dispatch(setIsInvoiceFlatrateVisible(false));
    dispatch(setIsDriverFlatrateVisible(false));
    dispatch(setHasChangedPickupMiscDealerStateCode(true));
    if (dealer.DealerPK === pickupNormalDealerFK) {
      dispatch(setHasChangedPickupMiscDealer(false));
    } else {
      dispatch(setHasChangedPickupMiscDealer(true));
    }
    dispatch(setPickupNormalDealerFK(dealer.DealerPK));
    setPickupDealerLookup(false);
    getNormalDealerById(dealer.DealerPK, companyId);
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    dispatch(setInvoiceMiles(0));
    dispatch(setDriverMiles(0));
    dispatch(setInvoiceFlatrate(0));
    dispatch(setDriverFlatrate(0));
  }, [pickupDealerFKLocal, selectedUnitInfo?.pickupCustomerPlantFK]);

  //Useeffect - service to get normal dealer by id
  useEffect(() => {
    getNormalDealerById(pickupNormalDealerFK || pickupDealerFK, companyId);
  }, []);

  useEffect(() => {
    if (hasSelectedPickupDealer === true) {
      let selectedDealer = selectedNewPickupNormalDealerData || normalDealerData;
      setSelectedDealer(selectedDealer);
    } else {
      setSelectedDealer(null);
    }
    dispatch(setSelectedPickupDealer(selectedDealer));
  }, [hasSelectedPickupDealer, selectedNewPickupNormalDealerData, normalDealerData]);

  //Useeffect - service to get miscellaneous dealer by id
  useEffect(() => {
    fetchMiscellaneousDealerById(pickupUnitAddressFK, companyId);
  }, [pickupUnitAddressFK]);

  useEffect(() => {
    if (!miscellaneousPickup) {
      dispatch(setSelectedNewDeliveryMiscellneousDealerData(""));
      dispatch(setMiscPickup(null));
    }
  }, [miscellaneousPickup]);

  useEffect(() => {
    if (selectedUnitInfo?.pickupUnitAddressFK && !pickupDealerFKLocal) {
      dispatch(setMiscellaneousPickup(true));
    }
  }, []);

  useEffect(() => {
    dispatch(setHasChangedPickupMiscDealer(false));
    dispatch(setHasClearedPickupDealerAutoComplete(false));
  }, []);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight ps-3">
        {/* Current Pickup */}
        {(loading || miscLoading) && <LoadingIcon />}

        <Form.Group className="mt-4 align-items-center row  m-l-5 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label dealer-label">Current Pickup </Form.Label>
          </Col>
          <Col xs={4} md={4} sm={4} className="p-0" style={{ marginLeft: "-3px", width: "275px" }}>
            {/* Address 1 */}
            <input
              className="customFormControl"
              name="ad1"
              type="text"
              value={selectedUnitInfo?.pickupName || ""}
              disabled
              autoComplete="one-time-code"
              spellCheck={false}
              aria-autocomplete="list"
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0"></Col>
          <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "275px" }}>
            {/* Address 2 */}
            <input
              className="customFormControl"
              name="ad2"
              type="text"
              value={selectedUnitInfo?.pickupAddress1 || ""}
              disabled
              autoComplete="one-time-code"
              spellCheck={false}
              aria-autocomplete="list"
            />
          </Col>
        </Form.Group>

        {/* Address Field-3 */}
        <Form.Group className="mt-2 mb-3 align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0"></Col>
          <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "275px" }}>
            <input
              className="customFormControl"
              name="ad2"
              value={selectedUnitInfo?.pickupAddress2 || ""}
              type="text"
              disabled
              autoComplete="one-time-code"
              spellCheck={false}
              aria-autocomplete="list"
            />
          </Col>
        </Form.Group>

        {/* City,State, Zip */}
        <Form.Group className="form-group align-items-center row m-0 mb-3">
          <Col sm={3} md={3} xs={3} className="p-0"></Col>
          {/* City */}
          <Col xs={1} md={1} sm={1} className="p-0 w-275px">
            <input
              className="customFormControl"
              name="city"
              type="text"
              disabled
              value={selectedUnitInfo?.pickupCity || ""}
            />
          </Col>

          {/* State Code */}
          <Col xs={2} md={2} sm={2} className="p-0">
            <input
              className="w-40px ms-1 customFormControl"
              name="stateCode"
              type="text"
              disabled
              value={selectedUnitInfo?.pickupStateCode || ""}
            />
          </Col>

          {/* Zip */}
          <Col xs={4} md={4} sm={4} className="p-0  w-95px" style={{ marginLeft: "-108px" }}>
            <input
              className=" customFormControl"
              name="postalCode"
              type="text"
              disabled
              value={selectedUnitInfo?.pickupPostalCode || ""}
            />
          </Col>
        </Form.Group>

        {/* Pickup Dealer Dropdown */}
        <Form.Group className="mt-4 m-b-10 align-items-center row m-l-5 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label dealer-label ">Pickup Dealer</Form.Label>
          </Col>
          <Col
            xs={5}
            md={5}
            sm={5}
            className="d-flex align-items-center p-0"
            style={{ width: "315px", marginLeft: "-3px" }}
          >
            <AutoCompleteDropdown
              arrayList={normalDealersList}
              searchString={normalDealerName}
              renderItemId={(dealer) => dealer.DealerPK}
              renderItemField={(dealer) => dealer.Name}
              handleSearchString={(string) => dispatch(setNormalDealerName(string))}
              fetchDataBySearchString={getPickupNormalDealersByName}
              onSelect={handlePickupNormalDealerSelection}
              selectedId={pickupDealerFK}
              matchContains
              clearInputCallback={() => {
                dispatch(setSelectedNewPickupNormalDealerData(""));
                dispatch(setPickupNormalDealerFK(""));
                dispatch(setHasClearedPickupDealerAutoComplete(true));
                dispatch(setHasSelectedPickupDealer(false));
                dispatch(setHasChangedPickupMiscDealerStateCode(false));
              }}
              className={`${
                miscellaneousPickup === true ? "black" : pickupNormalDealerFK ? "borderGreen" : "borderRed"
              }`}
              disabled={miscellaneousPickup === true ? true : false}
              loading={pickupDealerListLoading}
              maxHeight="200px"
            />
            <LookupButton
              onClick={() => {
                setPickupDealerLookup(true);
              }}
              disabled={miscellaneousPickup === true ? true : false}
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
              checked={pickupDealersearchType === "searchByStateCity"}
              onChange={(e) => {
                dispatch(setNormalDealerName(""));
                dispatch(setPickupNormalDealerFK(""));
                dispatch(setSelectedNewPickupNormalDealerData(""));
                dispatch(setPickupDealersearchType(e.target.value));
              }}
              className={""}
              disabled={miscellaneousPickup === true ? true : false}
              style={{ marginLeft: "5px" }}
            />
          </Col>
          <Col xs={4} md={4} sm={4} className="p-0 flex-shrink-0 w-305" style={{ width: "275px" }}>
            <input
              className={`customFormControl  `}
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
              checked={pickupDealersearchType === "Name"}
              onChange={(e) => {
                dispatch(setNormalDealerName(""));
                dispatch(setPickupNormalDealerFK(""));
                dispatch(setSelectedNewPickupNormalDealerData(""));
                dispatch(setPickupDealersearchType(e.target.value));
              }}
              className={""}
              disabled={miscellaneousPickup === true ? true : false}
              style={{ marginLeft: "5px" }}
            />
          </Col>
          <Col xs={4} md={4} sm={4} className="p-0 flex-shrink-0" style={{ width: "275px" }}>
            <input
              className={`customFormControl `}
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

          <Col xs={4} md={4} sm={4} className="p-0 w-275px">
            <input
              className="customFormControl w-95px "
              name="city"
              type="text"
              disabled
              value={selectedDealer?.City || ""}
            />
          </Col>
          <Col xs={1} md={1} sm={1} className="p-0">
            <input
              className=" w-40px customFormControl ms-1"
              name="stateCode"
              type="text"
              disabled
              value={selectedDealer?.StateCode || ""}
            />
          </Col>

          <Col xs={1} md={2} sm={1} className="p-0 " style={{ width: "100px" }}>
            <input
              className="customFormControl "
              style={{ marginLeft: "-30px" }}
              name="postalCode"
              type="text"
              disabled
              value={selectedDealer?.PostalCode || ""}
            />
          </Col>
        </Form.Group>

        {/* Miscellaneous Pickup */}
        <Form.Group className={`mt-2 m-b-10 align-items-center row m-l-5 m-r-0 ${styles.colFormLabel}`}>
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label dealer-label">Miscellaneous Pickup</Form.Label>
          </Col>
          <Col xs={3} md={3} sm={3} className="p-0" style={{ marginLeft: "-3px" }}>
            <input
              type="checkbox"
              className="form-check-input p-0"
              name="miscellaneousPickup"
              checked={miscellaneousPickup}
              value={miscellaneousPickup}
              onChange={(e) => {
                dispatch(setInvoiceMiles(""));
                dispatch(setDriverMiles(""));
                dispatch(setIsInvoiceFlatrateVisible(false));
                dispatch(setIsDriverFlatrateVisible(false));
                dispatch(setSelectedNewPickupNormalDealerData(""));
                dispatch(setPickupNormalDealerFK(""));
                dispatch(setNormalDealerName(""));
                dispatch(setPickupDealersearchType("searchByStateCity"));
                dispatch(setMiscellaneousPickup(e.target.checked));
                dispatch(setHasChangedPickupMiscDealerStateCode(!e.target.checked));
                dispatch(setUpdatedPickupMiscDealerData(null));
                dispatch(setMiscPickupID(null));
                dispatch(setRateObj(null));
              }}
            />
          </Col>
        </Form.Group>
        <DealerLookup
          show={pickupDealerLookup}
          onHide={() => setPickupDealerLookup(false)}
          renderItemId={(dealer) => dealer.DealerPK}
          handleLookupSelection={handlePickupNormalDealerSelection}
          DriverReroutes
          companyId={companyId}
        />
      </div>
    </div>
  );
}

export default ReroutePickupNormalDealerFormContent;
