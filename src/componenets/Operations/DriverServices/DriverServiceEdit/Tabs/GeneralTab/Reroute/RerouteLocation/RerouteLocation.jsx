import { parse } from "js2xmlparser";
import React, { useEffect, useState } from "react";
import Header from "../RerouteHeader";
import QuarterScreenWrapper from "../../../../../../../Templates/Screens/QuarterScreenWrapper";
import CommonFooter from "../../../../../../../common/CommonFooter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Form } from "react-bootstrap";
import PostalCodeComponent from "../../../../../../../common/PostalCodeComponent";
import WarningModalPopUp from "../../../../../../../common/WarningModalPopUp";
import {
  resetUnitDetails,
  setIsLocationValid,
  setLastLocationRedux,
  setPreviousURL,
  setRerouteLocationRedux,
  setUnitLocation,
} from "../../../../../../../../redux/RerouteSlice";
import { setMiscDeliveryID, setMiscPickupID } from "../../../../../../../../redux/OrderEntryFilterSlice";
import toast from "react-hot-toast";
import RerouteService from "../../../../../../../../services/RerouteService";
import { date } from "yup";
import LoadingIcon from "../../../../../../../common/LoadingIcon";
import { useRerouteRefreshRedirect } from "../hooks/useRerouteRefreshRedirect";

const RerouteLocation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useRerouteRefreshRedirect();

  const [atPickup, setAtPickup] = useState(false);
  const [atLastLocation, setAtLastLocation] = useState(false);
  const [rerouteLocation, setRerouteLocation] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [canadian, setCanadian] = useState(false);
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [pickupPostalCodePK, setPickupPostalCodePK] = useState(null);
  const initialValue = [{ city: "", statecode: "", postalcode: "", canadian: false }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [customerPlantFK, setCustomerPlantFK] = useState(null);
  const [yardFK, setYardFK] = useState(null);
  const [dealerFK, setDealerFK] = useState(null);
  const [unitAddressFK, setUnitAddressFK] = useState(null);
  const [phone, setPhone] = useState(null);
  const [contact, setContact] = useState(null);
  const [cancelShow, setCancelShow] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);

  const rerouteSource = localStorage.getItem("RerouteSource");

  let miscellaneousPickup = atPickup || atLastLocation || city;

  const driverFK = localStorage.getItem("driverId");
  const unitFK = useSelector((state) => state.rerouteReducer.unitFK);
  const fromEditMasterExpress = useSelector((state) => state.rerouteReducer.fromEditMasterExpress);
  //Company Id
  const companyId = useSelector((state) => state.rerouteReducer.companyId);
  const selectedUnitInfo = useSelector((state) => state.rerouteReducer.selectedUnitInfo);
  const pickUpNormalDealerData = useSelector((state) => state.rerouteReducer.normalDealerData);
  const selectedNewPickupNormalDealerData = useSelector(
    (state) => state.rerouteReducer.selectedNewPickupNormalDealerData
  );
  const updatedPickupMiscDealerData = useSelector(
    (state) => state.rerouteReducer.updatedPickupMiscDealerData
  );

  let selectedPickupDealer = selectedNewPickupNormalDealerData || pickUpNormalDealerData;
  const rerouteLocationRedux = useSelector((state) => state.rerouteReducer.rerouteLocationRedux);
  const lastLocationRedux = useSelector((state) => state.rerouteReducer.lastLocationRedux);
  const miscellaneousDelivery = useSelector((state) => state.rerouteReducer.miscellaneousDelivery);

  const isNextDisabled = !city || !statecode || ((city || statecode) && !postalCodePK);

  const handleNext = () => {
    dispatch(setPreviousURL(`/reroute-location`));
    navigate(`/reroutes-confirmation`);
  };

  const handleBack = () => {
    if (miscellaneousDelivery) {
      navigate(`/reroute-delivery-location-miscellaneous-dealer`);
    } else {
      navigate(`/reroute-delivery-location-normal-dealer`);
    }
  };

  const handleCancel = () => {
    if (rerouteSource === "EditMaster") {
      dispatch(resetUnitDetails());
      navigate("/edit-master-express-edit-page/" + unitFK + "/" + 0);
      localStorage.removeItem("RerouteSource");
      toast.success("Changes Cancelled");
    } else if (rerouteSource === "Delay") {
      const driverfk = localStorage.getItem("driverId");
      const delayedUnitPK = localStorage.getItem("delayUnit");
      const companyName = localStorage.getItem("company");
      const unitId = localStorage.getItem("unitfk");
      navigate(`/delay-processing/delayed-details/${companyName}/${unitId}/${driverfk}/${delayedUnitPK}`);
      setTimeout(() => {
        dispatch(resetUnitDetails());
        localStorage.removeItem("RerouteSource");
      }, 0);
    } else if (rerouteSource === "Operations") {
      navigate(`/reroutes-unit-selection/${driverFK}`);
      setTimeout(() => {
        dispatch(resetUnitDetails());
        dispatch(setMiscPickupID(""));
        dispatch(setMiscDeliveryID(""));
      }, 0);
      toast.success("Changes Cancelled");
    }
  };

  const handleCancelOnClick = () => {
    if (fromEditMasterExpress) {
      dispatch(resetUnitDetails());
      navigate("/edit-master-express-edit-page/" + unitFK + "/" + 0);
    } else {
      dispatch(resetUnitDetails());
      navigate(`/reroutes-unit-selection/${driverFK}`);
      setCancelShow(false);
      toast.success("Changes Cancelled");
    }
  };

  const buttons = [
    { label: "Next", onClick: handleNext, disabled: isNextDisabled },
    { label: "Back", onClick: handleBack },
    { label: "Cancel", onClick: handleCancel },
  ];

  const getLastUnitLocationForTheUnit = (companyId, unitFK) => {
    setApiLoading(true);
    RerouteService.getLastUnitLocationForTheUnit(companyId, unitFK)
      .then((response) => {
        const { data } = response;
        if (data && data.length > 0) {
          setCustomerPlantFK(data[0].CustomerPlantFK || 0);
          setYardFK(data[0].YardFK || 0);
          setDealerFK(data[0].DealerFK || 0);
          setUnitAddressFK(data[0].UnitAddressFK || 0);
          setRerouteLocation(data[0].Name ? data[0].Name?.trim() : "");
          setAddress1(data[0].Address1 ? data[0].Address1?.trim() : "");
          setAddress2(data[0].Address2 ? data[0].Address2?.trim() : "");
          setCity(data[0].City ? data[0].City?.trim() : "");
          setStateCode(data[0].StateCode ? data[0].StateCode?.trim() : "");
          setPostalCode(data[0].PostalCode ? data[0].PostalCode?.trim() : "");
          setPostalCodePK(data[0].PostalCodePK);
          setCanadian(data[0].Canadian);
          setPhone(data[0].Phone);
          setContact(data[0].Contact);
          dispatch(setLastLocationRedux(data[0]));
        }
      })
      .catch((error) => {})
      .finally(() => {
        setApiLoading(false);
      });
  };

  useEffect(() => {
    const entries = performance.getEntriesByType("navigation");
    if (entries.length && entries[0].type === "reload" && !unitFK) {
      // 1 = reload
      navigate(`/reroutes-unit-selection/${driverFK}`);
    }
  }, [driverFK, navigate]);

  useEffect(() => {
    if (atLastLocation) {
      setRerouteLocation("");
      setAddress1("");
      setAddress2("");
      setCity("");
      setStateCode("");
      setPostalCode("");
      setPostalCodePK(null);
      setCanadian(false);
      getLastUnitLocationForTheUnit(companyId, unitFK);
    } else {
      setRerouteLocation("");
      setAddress1("");
      setAddress2("");
      setCity("");
      setStateCode("");
      setPostalCode("");
      setPostalCodePK(null);
      setCanadian(false);
      setCustomerPlantFK(0);
      setYardFK(0);
      setDealerFK(0);
      setUnitAddressFK(0);
      setContact(null);
      setPhone(null);
    }
  }, [atLastLocation]);

  useEffect(() => {
    if (atPickup) {
      setRerouteLocation(
        updatedPickupMiscDealerData?.name?.trim() ||
          selectedPickupDealer?.Name?.trim() ||
          selectedUnitInfo.pickupName?.trim() ||
          ""
      );
      setAddress1(
        updatedPickupMiscDealerData?.address1?.trim() ||
          selectedPickupDealer?.Address1?.trim() ||
          selectedUnitInfo.pickupAddress1?.trim() ||
          ""
      );
      setAddress2(
        updatedPickupMiscDealerData?.address2?.trim() ||
          selectedPickupDealer?.Address2?.trim() ||
          selectedUnitInfo.pickupAddress2?.trim() ||
          ""
      );
      setCity(
        updatedPickupMiscDealerData?.city?.trim() ||
          selectedPickupDealer?.City?.trim() ||
          selectedUnitInfo.pickupCity?.trim() ||
          ""
      );
      setStateCode(
        updatedPickupMiscDealerData?.stateCode?.trim() ||
          selectedPickupDealer?.StateCode?.trim() ||
          selectedUnitInfo.pickupStateCode?.trim() ||
          ""
      );
      setPostalCode(
        updatedPickupMiscDealerData?.postalCode?.trim() ||
          selectedPickupDealer?.PostalCode?.trim() ||
          selectedUnitInfo.pickupPostalCode?.trim() ||
          ""
      );
      setCanadian(
        updatedPickupMiscDealerData?.name?.trim() ||
          selectedPickupDealer?.Name?.trim() ||
          selectedUnitInfo.pickupLocationCanadian
      );
      setCustomerPlantFK(
        updatedPickupMiscDealerData
          ? 0
          : selectedPickupDealer
            ? 0
            : selectedUnitInfo.pickupCustomerPlantFK
              ? selectedUnitInfo.pickupCustomerPlantFK
              : 0
      );
      setYardFK(
        updatedPickupMiscDealerData
          ? 0
          : selectedPickupDealer
            ? 0
            : selectedUnitInfo.pickupCustomerPlantFK
              ? selectedUnitInfo.pickupCustomerPlantFK
              : 0
      );
      setDealerFK(
        updatedPickupMiscDealerData
          ? 0
          : selectedPickupDealer
            ? selectedPickupDealer.DealerPK
            : selectedUnitInfo.pickupDealerFK
              ? selectedUnitInfo.pickupDealerFK
              : 0
      );
      setUnitAddressFK(updatedPickupMiscDealerData ? updatedPickupMiscDealerData.unitAddressPK : 0);
      setPhone(
        updatedPickupMiscDealerData?.deliveryContactPhone ||
          selectedPickupDealer?.DeliveryPhone ||
          selectedUnitInfo.phone
      );
      setContact(
        updatedPickupMiscDealerData?.deliveryContactPhone ||
          selectedPickupDealer?.DeliveryPhone ||
          selectedUnitInfo.phone
      );
      setPostalCodePK(pickupPostalCodePK);
    } else {
      setRerouteLocation("");
      setAddress1("");
      setAddress2("");
      setCity("");
      setStateCode("");
      setPostalCode("");
      setCanadian(false);
      setCustomerPlantFK(0);
      setYardFK(0);
      setDealerFK(0);
      setUnitAddressFK(0);
      setPhone(null);
      setContact(null);
      setPostalCodePK(null);
    }
  }, [atPickup]);

  useEffect(() => {
    const unitLocation = {
      UnitLocation: {
        CustomerPlantFK: customerPlantFK,
        yardFK: yardFK,
        DealerFK: dealerFK,
        UnitAddressFK: unitAddressFK,
        Name: rerouteLocation,
        Address1: address1,
        Address2: address2,
        City: city,
        StateCode: statecode,
        PostalCode: postalcode,
        Canadian: canadian,
        Phone: phone || "",
        Contact: contact || "",
        AtPickup: atPickup ? 1 : 0,
        AtLastLocation: atLastLocation ? 1 : 0,
      },
    };
    const unitLocationXML = parse("Root", unitLocation).replace(/<\?xml.*?\?>\s*/i, "");
    dispatch(setUnitLocation(unitLocationXML));
  }, [
    rerouteLocation,
    address1,
    address2,
    city,
    statecode,
    postalcode,
    canadian,
    customerPlantFK,
    yardFK,
    dealerFK,
    unitAddressFK,
    phone,
    contact,
  ]);

  useEffect(() => {
    const unitLocationRedux = {
      atPickup,
      atLastLocation,
      rerouteLocation,
      address1,
      address2,
      city,
      statecode,
      postalcode,
      postalCodePK,
    };
    dispatch(setRerouteLocationRedux(unitLocationRedux));
  }, [
    atPickup,
    atLastLocation,
    rerouteLocation,
    address1,
    address2,
    city,
    statecode,
    postalcode,
    postalCodePK,
  ]);

  useEffect(() => {
    if (city && statecode) {
      dispatch(setIsLocationValid(true));
    } else {
      dispatch(setIsLocationValid(false));
    }
  }, [city, statecode]);

  useEffect(() => {
    const pickupStateCode =
      updatedPickupMiscDealerData?.stateCode?.trim() ||
      selectedPickupDealer?.StateCode?.trim() ||
      selectedUnitInfo?.pickupStateCode?.trim() ||
      "";
    const pickupCity =
      updatedPickupMiscDealerData?.city?.trim() ||
      selectedPickupDealer?.City?.trim() ||
      selectedUnitInfo?.pickupCity?.trim() ||
      "";
    const pickupPostalCode =
      updatedPickupMiscDealerData?.postalCode?.trim() ||
      selectedPickupDealer?.PostalCode?.trim() ||
      selectedUnitInfo?.pickupPostalCode?.trim() ||
      "";
    if (rerouteLocationRedux?.postalcode || rerouteLocationRedux?.city) {
      setApiLoading(true);
      RerouteService.getPostalCodeid({
        postalCode: rerouteLocationRedux?.postalcode,
        stateCode: rerouteLocationRedux?.statecode,
        city: rerouteLocationRedux?.city,
      })
        .then(({ data }) => {
          setApiLoading(false);
          setPostalCodePK(data?.PostalCodePK || "");
        })
        .catch((err) => {
          setApiLoading(false);
          // setLoading(false);
        })
        .finally(() => {
          // setLoading(false);
        });
    }

    if (pickupCity || pickupPostalCode) {
      setApiLoading(true);
      RerouteService.getPostalCodeid({
        postalCode: pickupPostalCode || "",
        stateCode: pickupStateCode || "",
        city: pickupCity || "",
      })
        .then(({ data }) => {
          setApiLoading(false);
          setPickupPostalCodePK(data?.PostalCodePK || "");
        })
        .catch((err) => {
          setApiLoading(false);
        })
        .finally(() => {});

      if (rerouteLocationRedux) {
        setAtPickup(rerouteLocationRedux.atPickup);
        setAtLastLocation(rerouteLocationRedux.atLastLocation);
        setRerouteLocation(rerouteLocationRedux.rerouteLocation);
        setAddress1(rerouteLocationRedux.address1);
        setAddress2(rerouteLocationRedux.address2);
        setCity(rerouteLocationRedux.city);
        setStateCode(rerouteLocationRedux.statecode);
        setPostalCode(rerouteLocationRedux?.postalcode);
        if (rerouteLocationRedux.atPickup) {
          setCanadian(
            updatedPickupMiscDealerData?.canadian?.trim() ||
              selectedPickupDealer?.Canadian?.trim() ||
              selectedUnitInfo.pickupLocationCanadian
          );
          setCustomerPlantFK(
            updatedPickupMiscDealerData
              ? 0
              : selectedPickupDealer
                ? 0
                : selectedUnitInfo.pickupCustomerPlantFK
                  ? selectedUnitInfo.pickupCustomerPlantFK
                  : 0
          );
          setYardFK(
            updatedPickupMiscDealerData
              ? 0
              : selectedPickupDealer
                ? 0
                : selectedUnitInfo.pickupCustomerPlantFK
                  ? selectedUnitInfo.pickupCustomerPlantFK
                  : 0
          );
          setDealerFK(
            updatedPickupMiscDealerData
              ? 0
              : selectedPickupDealer
                ? selectedPickupDealer.DealerPK
                : selectedUnitInfo.pickupDealerFK
                  ? selectedUnitInfo.pickupDealerFK
                  : 0
          );
          setUnitAddressFK(updatedPickupMiscDealerData ? updatedPickupMiscDealerData.unitAddressPK : 0);
          setPhone(
            updatedPickupMiscDealerData?.deliveryContactPhone ||
              selectedPickupDealer?.DeliveryPhone ||
              selectedUnitInfo.phone
          );
          setContact(
            updatedPickupMiscDealerData?.deliveryContactPhone ||
              selectedPickupDealer?.DeliveryPhone ||
              selectedUnitInfo.phone
          );
        } else {
          if (rerouteLocationRedux.atLastLocation) {
            setCustomerPlantFK(lastLocationRedux.CustomerPlantFK || 0);
            setYardFK(lastLocationRedux.YardFK || 0);
            setDealerFK(lastLocationRedux.DealerFK || 0);
            setUnitAddressFK(lastLocationRedux.UnitAddressFK || 0);
            setCanadian(lastLocationRedux.Canadian);
            setPhone(lastLocationRedux.Phone);
            setContact(lastLocationRedux.Contact);
          } else {
            setCustomerPlantFK(0);
            setYardFK(0);
            setDealerFK(0);
            setUnitAddressFK(0);
            setPhone(null);
            setContact(null);
          }
        }
      }
    }
  }, []);

  if (loading) {
    return <LoadingIcon />;
  }

  return (
    <QuarterScreenWrapper>
      <Header />
      {apiLoading && <LoadingIcon />}
      <div className="w-100 p-2">
        {/* {currentDealerLoading && <LoadingIcon />} */}
        <div className="shadow-sm rounded border quarterScreenFormContentHeight ps-3">
          <Form.Group className={`mt-2 m-b-10 align-items-center row m-l-5 m-r-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">At Pickup</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0" style={{ marginLeft: "-3px" }}>
              <input
                type="checkbox"
                className={`form-check-input p-0 ${!miscellaneousPickup ? "red-border" : ""}`}
                name="miscellaneousPickup"
                checked={atPickup}
                onChange={(e) => setAtPickup(e.target.checked)}
                disabled={atLastLocation}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-2 m-b-10 align-items-center row m-l-5 m-r-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">At Last Location</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0" style={{ marginLeft: "-3px" }}>
              <input
                type="checkbox"
                className={`form-check-input p-0 ${!miscellaneousPickup ? "red-border" : ""}`}
                name="miscellaneousPickup"
                checked={atLastLocation}
                onChange={(e) => setAtLastLocation(e.target.checked)}
                disabled={atPickup}
              />
            </Col>
          </Form.Group>

          {/* Current Delivery */}
          <Form.Group className="mt-3 align-items-center row  m-l-5 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Reroute Location</Form.Label>
            </Col>
            <Col xs={4} md={4} sm={4} className="p-0" style={{ marginLeft: "-3px", width: "275px" }}>
              <input style={{ display: "none" }} autoComplete="off" />
              <input
                className="customFormControl"
                name="m_n"
                id="m_n"
                type="text"
                value={rerouteLocation}
                maxLength={30}
                onChange={(e) => setRerouteLocation(e.target.value)}
                autoComplete="new-password"
                aria-autocomplete="none"
                disabled={atPickup || atLastLocation}
              />
            </Col>
          </Form.Group>
          {/* Address-1 */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0"></Col>
            <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "275px" }}>
              <input
                className="customFormControl"
                name="ad_1_1"
                id="ad_1_1"
                type="text"
                value={address1}
                maxLength={30}
                onChange={(e) => setAddress1(e.target.value)}
                autoComplete="new-password"
                aria-autocomplete="none"
                disabled={atPickup || atLastLocation}
              />
            </Col>
          </Form.Group>

          {/* Address-2 */}
          <Form.Group className="mt-2 mb-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0"></Col>
            <Col xs={4} md={4} sm={4} className="p-0" style={{ width: "275px" }}>
              <input
                className="customFormControl"
                name="ad_2_2"
                id="ad_2_2"
                type="text"
                value={address2}
                maxLength={30}
                onChange={(e) => setAddress2(e.target.value)}
                autoComplete="new-password"
                aria-autocomplete="none"
                disabled={atPickup || atLastLocation}
              />
            </Col>
          </Form.Group>

          <PostalCodeComponent
            hideLabel
            labelColNumber={3}
            cityColNumber={4}
            // isOptional
            isPostalcodeOptional
            stateInputWidth={"55px"}
            zipInputWidth={"115px"}
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
            disabled={atPickup || atLastLocation || apiLoading}
          />

          {/* City,State, Zip */}
          <Form.Group className="form-group align-items-center row m-0 mb-3">
            <Col sm={3} md={3} xs={3} className="p-0 text-start">
              <Form.Label htmlFor="name" className="col-form-label me-2"></Form.Label>
            </Col>
          </Form.Group>
        </div>
      </div>
      <CommonFooter buttons={buttons} />

      <WarningModalPopUp
        show={cancelShow}
        onHide={() => {
          setCancelShow(false);
        }}
        title={"Cancel Unit's Reroute Changes"}
        body={"Please confirm you want to cancel your changes."}
        showYes={true}
        handleYES={handleCancelOnClick}
        showNo={true}
        handleNO={() => {
          setCancelShow(false);
        }}
      />
    </QuarterScreenWrapper>
  );
};

export default RerouteLocation;
