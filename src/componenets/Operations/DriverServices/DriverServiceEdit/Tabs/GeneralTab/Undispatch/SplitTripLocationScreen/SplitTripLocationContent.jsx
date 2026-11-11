import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import MiscDealerLookup from "../../../../../../../LookupScreens/MiscDealer/MiscDealerLookup";
import { useDispatch } from "react-redux";
import {
  setAddress1,
  setAddress2,
  setContact,
  setContactPhone,
  setDirections,
  setEmail,
  setHours,
  setMiscellaneousDealerData,
  setName,
  setOnCancel,
  setOpenFriday,
  setOpenMonday,
  setOpenSaturday,
  setOpenSunday,
  setOpenThursday,
  setOpenTuesday,
  setOpenWednesday,
  setPhone,
  setSplittripScreenValid,
  setPostalCodeOnChange,
  setStateCodeNew,
  setPostalCodeNew,
  setCityNew,
  setCanadian1,
  setPostalCodePK,
  setMiscellaneousFormDealerData,
  setBackButtonFlag,
  setReleaseAtPickupLocation,
  setMiscellaneousDealerId,
  setSplitTripMilesData,
  setDriverPhone,
} from "../../../../../../../../redux/UndispatchSlice";
import OrderEntryService from "../../../../../../../../services/OrderEntryService";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { formatPhoneNumber } from "../../../../../../../../utils/validation/Phonevalidation";
import { Formik } from "formik";
import { emailRegex } from "../../../../../../../../utils/validation/EmailRegex";
import { resetSearchSettings } from "../../../../../../../../redux/LookupScreens/MiscDealerLookupSlice";
import PostalCode from "../../../../../../../common/PostalCode";
import {
  setDealerCity,
  setDealerPostcode,
  setDealerStatecode,
} from "../../../../../../../../redux/EditDealerSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PostalCodeComponent from "../../../../../../../common/PostalCodeComponent";
import DelayProcessingService from "../../../../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import UndispatchService from "../../../../../../../../services/UndispatchService";
import RerouteService from "../../../../../../../../services/RerouteService";
import CompanyService from "../../../../../../../../services/CompanyService";

const SplitTripLocationContent = () => {
  const { delayedunitPK, driverId, dispatchId, companyName, unitfk } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [canadian, setCanadian] = useState(false);
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [miscDeliveryDealerSelection, setMiscDeliveryDealerSelection] = useState(false);

  const miscellaneousDealerId = useSelector((state) => state.undispatchReducer.miscellaneousDealerId);
  const miscellaneousDealerData = useSelector((state) => state.undispatchReducer.miscellaneousDealerData);
  const name = useSelector((state) => state.undispatchReducer.name);
  const address1 = useSelector((state) => state.undispatchReducer.address1);
  const address2 = useSelector((state) => state.undispatchReducer.address2);
  const phone = useSelector((state) => state.undispatchReducer.phone);
  const email = useSelector((state) => state.undispatchReducer.email);
  const contact = useSelector((state) => state.undispatchReducer.contact);
  const contactPhone = useSelector((state) => state.undispatchReducer.contactPhone);
  const hours = useSelector((state) => state.undispatchReducer.hours);
  const directions = useSelector((state) => state.undispatchReducer.directions);
  const openSunday = useSelector((state) => state.undispatchReducer.openSunday);
  const openMonday = useSelector((state) => state.undispatchReducer.openMonday);
  const openTuesday = useSelector((state) => state.undispatchReducer.openTuesday);
  const openWednesday = useSelector((state) => state.undispatchReducer.openWednesday);
  const openThursday = useSelector((state) => state.undispatchReducer.openThursday);
  const openFriday = useSelector((state) => state.undispatchReducer.openFriday);
  const openSaturday = useSelector((state) => state.undispatchReducer.openSaturday);
  const driverPhone = useSelector((state) => state.undispatchReducer.driverPhone);
  const driverName = useSelector((state) => state.undispatchReducer.driverName);

  const selectedCompanyName =
    useSelector((state) => state.unitSelection.selectedCompanyName) ||
    localStorage.getItem("selectedCompany");
  const [rowData, setRowData] = useState(() => {
    // Initialize state from localStorage
    const savedData = localStorage.getItem("storedRowData");
    return savedData ? JSON.parse(savedData) : {};
  });

  const cleanCompanyName = (name) => {
    if (!name) return "";
    return decodeURIComponent(name)
      .replace(/\+/g, " ") // Convert + to space
      .replace(/=/g, "") // Remove = symbol
      .replace(/\s+/g, " ") // Remove multiple spaces
      ?.trim();
  };
  const [loading, setLoading] = useState(false);

  const releaseAtPickupLocation = useSelector((state) => state.undispatchReducer.releaseAtPickupLocation);
  const postingCompanyFK = useSelector((state) => state.undispatchReducer.postingCompanyFK);
  const undispatchFlag = useSelector((state) => state.undispatchReducer.undispatchFlag);
  const postalCodePK = useSelector((state) => state.undispatchReducer.postalCodePK);
  const cityNew = useSelector((state) => state.undispatchReducer.cityNew);
  const stateCodeNew = useSelector((state) => state.undispatchReducer.stateCodeNew);
  const postalCodeNew = useSelector((state) => state.undispatchReducer.postalCodeNew);
  const backButtonFlag = useSelector((state) => state.undispatchReducer.backButtonFlag);
  const miscellaneousFormDealerData = useSelector(
    (state) => state.undispatchReducer.miscellaneousFormDealerData
  );
  const generalData = useSelector((state) => state.delayProcessing.generalData);
  const driverReleased = localStorage.getItem("driverRelease") === "true";
  const selectedCompanyPK = useSelector((state) => state.unitSelection.companyPK);
  const [companyPK, setCompanyPK] = useState(null);
  // /****Used to solve the issues related to close and backbutton click*****/
  window.addEventListener("popstate", () => {
    if (!driverReleased) {
    }
    // else do nothing, so back arrow stays on Delay-processing details
  });

  //uSED TO GET THE COMPANY pk
  useEffect(() => {
    const fetchCompanyPK = async () => {
      try {
        if (!driverReleased) return;
        const decodedCompanyName = cleanCompanyName(selectedCompanyName);
        const response = await CompanyService.getCompanyPKByName(decodedCompanyName);
        setCompanyPK(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompanyPK();
  }, [driverReleased, selectedCompanyName]);

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setPhone(formattedPhoneNumber));
  };

  const contactPhoneFormatHandler = (e) => {
    const formattedContactPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setContactPhone(formattedContactPhoneNumber));
  };

  /***Lookup Selection***/
  const handleMiscDealerSelection = () => {
    dispatch(resetSearchSettings());
    dispatch(setBackButtonFlag(false));
    setMiscDeliveryDealerSelection(true);
  };

  /**
   *  Delay Fetch Unit Last Location function
   **/
  const getLastLocation = () => {
    setLoading(true);

    DelayProcessingService.getAllDetailsOfUnitLastLocation(
      companyName,
      generalData ? generalData.UnitPK : unitfk
    )
      .then((response) => {
        const data = response?.data;
        if (data.unitAddress) {
          dispatch(setMiscellaneousDealerData(data.unitAddress));
        } else if (data.yard) {
          dispatch(setMiscellaneousDealerData(data.yard));
        } else if (data.unitDriveBy) {
          dispatch(setMiscellaneousDealerData(data.unitDriveBy));
        } else if (data.customerPlant) {
          dispatch(setMiscellaneousDealerData(data.customerPlant));
        } else if (data.dealer) {
          dispatch(setMiscellaneousDealerData(data.dealer));
        } else {
          dispatch(setMiscellaneousDealerData(data));
        }
        dispatch(setBackButtonFlag(false));
      })
      .catch((error) => {})
      .finally(() => setLoading(false));
  };

  const miscDealerModalHide = () => {
    setMiscDeliveryDealerSelection(false);
  };

  /***Used to fetch deatials of unit address**/
  const fetchMiscDealerById = async (miscellaneousDealerId) => {
    if (
      miscellaneousDealerId != null &&
      miscellaneousDealerId !== undefined &&
      miscellaneousDealerId !== ""
    ) {
      setLoading(true);
      await UndispatchService.fetchMiscDealerByIdCrossDB(
        miscellaneousDealerId,
        driverReleased ? companyPK : postingCompanyFK
      )
        .then((response) => {
          const data = response.data;
          dispatch(setMiscellaneousDealerData(data));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (miscellaneousDealerId !== null) {
      fetchMiscDealerById(miscellaneousDealerId);
    }
  }, [miscellaneousDealerId]);
  useEffect(() => {
    const dayallowed = (e, daytype) => {
      if (e === null || e === undefined) {
        return daytype !== "weekend";
      }
      return e;
    };
    if (miscellaneousDealerData && !backButtonFlag) {
      dispatch(setName(miscellaneousDealerData?.Name?.trim() || miscellaneousDealerData?.name?.trim() || ""));
      dispatch(
        setAddress1(
          miscellaneousDealerData?.Address1?.trim() || miscellaneousDealerData?.address1?.trim() || ""
        )
      );
      dispatch(
        setAddress2(
          miscellaneousDealerData?.Address2?.trim() || miscellaneousDealerData?.address2?.trim() || ""
        )
      );
      dispatch(
        setCityNew(miscellaneousDealerData?.City?.trim() || miscellaneousDealerData?.city?.trim() || "")
      );
      dispatch(
        setStateCodeNew(
          miscellaneousDealerData?.StateCode?.trim() || miscellaneousDealerData?.stateCode?.trim() || ""
        )
      );

      setCanadian(miscellaneousDealerData?.Canadian || miscellaneousDealerData?.canadian || false);
      dispatch(
        setPhone(
          miscellaneousDealerData?.Phone != null
            ? formatPhoneNumber(miscellaneousDealerData?.Phone)
            : "" || miscellaneousDealerData?.phone != null
              ? formatPhoneNumber(miscellaneousDealerData?.phone)
              : ""
        )
      );
      dispatch(
        setEmail(miscellaneousDealerData?.Email?.trim() || miscellaneousDealerData?.email?.trim() || "")
      );

      const conatctNew = miscellaneousDealerId
        ? miscellaneousDealerData?.DeliveryContact?.trim() ||
          miscellaneousDealerData?.DeliveryContact?.trim() ||
          ""
        : undispatchFlag
          ? driverName
          : "";
      dispatch(setContact(conatctNew));
      const phoneNew = miscellaneousDealerId
        ? formatPhoneNumber(miscellaneousDealerData?.DeliveryContactPhone?.trim()) || ""
        : undispatchFlag
          ? formatPhoneNumber(driverPhone)
          : "";
      dispatch(setContactPhone(phoneNew));
      dispatch(setOpenSunday(dayallowed(miscellaneousDealerData?.OpenSunday, "weekend")));
      dispatch(setOpenMonday(dayallowed(miscellaneousDealerData?.OpenMonday)));
      dispatch(setOpenTuesday(dayallowed(miscellaneousDealerData?.OpenTuesday)));
      dispatch(setOpenWednesday(dayallowed(miscellaneousDealerData?.OpenWednesday)));
      dispatch(setOpenThursday(dayallowed(miscellaneousDealerData?.OpenThursday)));
      dispatch(setOpenFriday(dayallowed(miscellaneousDealerData?.OpenFriday)));
      dispatch(setOpenSaturday(dayallowed(miscellaneousDealerData?.OpenSaturday, "weekend")));
      dispatch(setHours(miscellaneousDealerData?.Hours?.trim() || ""));
      dispatch(setDirections(miscellaneousDealerData?.Directions?.trim() || ""));
      dispatch(
        setPostalCodeNew(
          String(miscellaneousDealerData?.PostalCode || "")?.trim() ||
            String(miscellaneousDealerData?.postalCode || "") ||
            ""
        )
      );
      dispatch(
        setPostalCodePK(
          miscellaneousDealerData?.PostalCodePK || miscellaneousDealerData?.postalcodePK || null
        )
      );
      initialValue[0].city =
        miscellaneousDealerData.City != null
          ? miscellaneousDealerData.City?.trim()
          : "" || miscellaneousDealerData.city != null
            ? miscellaneousDealerData.city?.trim()
            : "";
      initialValue[0].statecode =
        miscellaneousDealerData.StateCode != null
          ? miscellaneousDealerData.StateCode?.trim()
          : "" || miscellaneousDealerData.stateCode != null
            ? miscellaneousDealerData.stateCode?.trim()
            : "";
      initialValue[0].postalcode =
        miscellaneousDealerData.PostalCode != null
          ? miscellaneousDealerData.PostalCode?.trim()
          : "" || miscellaneousDealerData.postalCode != null
            ? miscellaneousDealerData.postalCode?.trim()
            : "";
    } else if (miscellaneousFormDealerData) {
      dispatch(setName(miscellaneousFormDealerData?.name?.trim() || ""));
      dispatch(setAddress1(miscellaneousFormDealerData?.address1?.trim() || ""));
      dispatch(setAddress2(miscellaneousFormDealerData?.address2?.trim() || ""));
      dispatch(setCityNew(miscellaneousFormDealerData?.city?.trim() || ""));
      dispatch(setStateCodeNew(miscellaneousFormDealerData?.stateCode?.trim() || ""));

      setCanadian(miscellaneousFormDealerData?.canadian || false);
      dispatch(
        setPhone(
          miscellaneousFormDealerData?.phone != null
            ? formatPhoneNumber(miscellaneousFormDealerData?.phone)
            : ""
        )
      );
      dispatch(setEmail(miscellaneousFormDealerData?.email?.trim() || ""));
      dispatch(setContact(miscellaneousFormDealerData?.deliveryContact?.trim() || ""));
      dispatch(
        setContactPhone(
          miscellaneousFormDealerData?.deliveryContactPhone != null
            ? formatPhoneNumber(miscellaneousFormDealerData?.deliveryContactPhone)
            : ""
        )
      );
      dispatch(setOpenSunday(dayallowed(miscellaneousFormDealerData?.openSunday, "weekend")));
      dispatch(setOpenMonday(dayallowed(miscellaneousFormDealerData?.openMonday)));
      dispatch(setOpenTuesday(dayallowed(miscellaneousFormDealerData?.openTuesday)));
      dispatch(setOpenWednesday(dayallowed(miscellaneousFormDealerData?.openWednesday)));
      dispatch(setOpenThursday(dayallowed(miscellaneousFormDealerData?.openThursday)));
      dispatch(setOpenFriday(dayallowed(miscellaneousFormDealerData?.openFriday)));
      dispatch(setOpenSaturday(dayallowed(miscellaneousFormDealerData?.openSaturday, "weekend")));
      dispatch(setHours(miscellaneousFormDealerData?.hours?.trim() || ""));
      dispatch(setDirections(miscellaneousFormDealerData?.directions?.trim() || ""));
      miscellaneousFormDealerData?.postalCode &&
        dispatch(setPostalCodeNew(String(miscellaneousFormDealerData?.postalCode)?.trim() || ""));
      dispatch(setPostalCodePK(miscellaneousFormDealerData?.postalCodePK || null));
      initialValue[0].city =
        miscellaneousFormDealerData?.city != null ? miscellaneousFormDealerData?.city?.trim() : "";
      initialValue[0].statecode =
        miscellaneousFormDealerData?.statecode != null ? miscellaneousFormDealerData?.statecode?.trim() : "";
      initialValue[0].postalcode =
        miscellaneousFormDealerData?.postalcode != null
          ? miscellaneousFormDealerData?.postalcode?.trim()
          : "";
    }
  }, [miscellaneousDealerData, backButtonFlag]);

  const validationSchema = yup.object({
    city: yup.string().required(),
    stateCode: yup.string().max(2).min(2).required(),
    postalCode: yup.string().required(),
    email: yup.string().matches(emailRegex),
  });

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  //Tab Validation
  useEffect(() => {
    if (
      name !== "" &&
      address1 !== "" &&
      postalCodePK &&
      phone !== "" &&
      phone.match(phoneRegex) &&
      (email === "" || email.match(emailRegex)) &&
      contact !== "" &&
      contactPhone.match(phoneRegex) &&
      (openMonday || openSunday || openTuesday || openWednesday || openThursday || openFriday || openSaturday)
    ) {
      dispatch(setSplittripScreenValid(true));
    } else {
      dispatch(setSplittripScreenValid(false));
    }
  }, [
    name,
    address1,
    postalCodePK,
    phone,
    email,
    contact,
    contactPhone,
    openMonday,
    openSunday,
    openTuesday,
    openWednesday,
    openThursday,
    openFriday,
    openSaturday,
  ]);

  function MiscDeliveryDealerFormData() {
    if (miscellaneousDealerData != null) {
      dispatch(
        setMiscellaneousFormDealerData({
          name: name,
          address1: address1,
          address2: address2,
          city: cityNew,
          stateCode: stateCodeNew,
          postalCode: postalCodeNew,
          canadian: canadian,
          phone: phone.replace(/\s+/g, ""),
          email: email,
          deliveryContact: contact,
          deliveryContactPhone: contactPhone.replace(/\s+/g, ""),
          openSunday: openSunday,
          openMonday: openMonday,
          openTuesday: openTuesday,
          openWednesday: openWednesday,
          openThursday: openThursday,
          openFriday: openFriday,
          openSaturday: openSaturday,
          hours: hours,
          directions: directions,
          postalCodePK: postalCodePK,
        })
      );
    }
  }

  useEffect(() => {
    if (miscellaneousFormDealerData?.postalCodePK !== postalCodePK) {
      dispatch(setSplitTripMilesData(null));
    }
  }, [postalCodePK]);

  useEffect(() => {
    MiscDeliveryDealerFormData();
  }, [
    name,
    address1,
    address2,
    cityNew,
    stateCodeNew,
    postalCodePK,
    postalCodeNew,
    canadian,
    phone,
    email,
    contact,
    contactPhone,
    openSunday,
    openMonday,
    openTuesday,
    openWednesday,
    openThursday,
    openFriday,
    openSaturday,
    hours,
    directions,
  ]);

  useEffect(() => {
    if (!undispatchFlag) {
      const savedData = localStorage.getItem("storedRowData");
      if (!savedData) {
        if (driverReleased) {
          navigate(
            `/delay-processing/delayed-details/${companyName}/${Number(unitfk)}/${Number(driverId)}/${Number(delayedunitPK)}`,
            { replace: true }
          );
        } else {
          navigate("/undispatch/" + driverId);
        }
      } else {
        navigate(
          "/delay-processing/delayed-details/" +
            companyName +
            "/" +
            Number(unitfk) +
            "/" +
            Number(driverId) +
            "/" +
            Number(delayedunitPK)
        );
      }
    }
  }, [undispatchFlag]);

  useEffect(() => {
    if (releaseAtPickupLocation) {
      dispatch(setMiscellaneousDealerData({}));
    } else {
      dispatch(setMiscellaneousDealerData({}));
    }
  }, [releaseAtPickupLocation]);

  useEffect(() => {
    if (backButtonFlag) {
    }
  }, [postalCodePK]);

  return (
    <Formik
      initialValues={{
        email,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        email: true,
      }}
    >
      {(formik) => (
        <Form on={formik.handle}>
          <div className="p-2">
            <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight">
              <Row className="m-0 p-10">
                <Col xs={6}>
                  {driverReleased && (
                    <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} md={3} xs={3} className="p-0 ">
                        <Form.Label className="col-form-label dealer-label">
                          Release at Pickup Location
                        </Form.Label>
                      </Col>
                      <Col xs={4} md={4} sm={4} className="p-0">
                        <input
                          type="checkbox"
                          checked={releaseAtPickupLocation}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            dispatch(setReleaseAtPickupLocation(checked));
                            if (checked) {
                              dispatch(setName(""));
                              dispatch(setAddress1(""));
                              dispatch(setAddress2(""));
                              dispatch(setCityNew(""));
                              dispatch(setStateCodeNew(""));
                              dispatch(setPostalCodeNew(""));
                              dispatch(setPostalCodePK(null));
                              dispatch(setPhone(""));
                              dispatch(setEmail(""));
                              dispatch(setContact(""));
                              dispatch(setContactPhone(""));
                              dispatch(setHours(""));
                              dispatch(setDirections(""));
                              dispatch(setOpenSunday(false));
                              dispatch(setOpenMonday(true));
                              dispatch(setOpenTuesday(true));
                              dispatch(setOpenWednesday(true));
                              dispatch(setOpenThursday(true));
                              dispatch(setOpenFriday(true));
                              dispatch(setOpenSaturday(false));
                              dispatch(setBackButtonFlag(false));
                            }
                          }}
                        />
                      </Col>
                    </Form.Group>
                  )}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0 ">
                      <Form.Label className="col-form-label dealer-label"></Form.Label>
                    </Col>

                    <Col xs={6} sm={6} md={6} className="p-0 ">
                      {driverReleased && (
                        <button
                          className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                          type="button"
                          name="miscCustomerSelection"
                          id="miscCustomerSelection"
                          onClick={getLastLocation}
                          disabled={releaseAtPickupLocation}
                        >
                          Use Current Location
                        </button>
                      )}

                      <Col sm={3} md={3} xs={3} className="p-0 ">
                        <Form.Label className="col-form-label dealer-label"></Form.Label>
                      </Col>
                      <button
                        className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                        type="button"
                        name="miscCustomerSelection"
                        id="miscCustomerSelection"
                        onClick={handleMiscDealerSelection}
                        disabled={releaseAtPickupLocation}
                      >
                        Miscellaneous Dealer Selection
                      </button>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Name</Form.Label>
                    </Col>
                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        className={`customFormControl  ${
                          releaseAtPickupLocation ? "" : name ? "borderGreen" : "borderRed"
                        }`}
                        name="n1"
                        type="text"
                        onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                        value={name}
                        maxLength={30}
                        autoComplete="new-password"
                        autocorrect="off"
                        aria-autocomplete="none"
                        onChange={(e) => {
                          if (e.target.value === " ") {
                            dispatch(setName(""));
                          } else {
                            dispatch(setName(e.target.value));
                          }
                        }}
                        disabled={releaseAtPickupLocation}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label"> Address</Form.Label>
                    </Col>
                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        className={`customFormControl  ${
                          releaseAtPickupLocation ? "" : address1 ? "borderGreen" : "borderRed"
                        }`}
                        id="ad1"
                        name="ad1"
                        type="text"
                        onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                        value={address1}
                        maxLength={30}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          if (e.target.value === " ") {
                            dispatch(setAddress1(""));
                          } else {
                            dispatch(setAddress1(e.target.value));
                          }
                        }}
                        disabled={releaseAtPickupLocation}
                      />
                    </Col>
                  </Form.Group>

                  {/* Address Field-2 */}
                  <Form.Group className="mt-2 mb-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label"></Form.Label>
                    </Col>
                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        className={`customFormControl `}
                        id="ad2"
                        name="add2"
                        type="text"
                        onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                        maxLength={30}
                        value={address2}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          if (e.target.value === " ") {
                            dispatch(setAddress2(""));
                          } else {
                            dispatch(setAddress2(e.target.value));
                          }
                        }}
                        disabled={releaseAtPickupLocation}
                      />
                    </Col>
                  </Form.Group>

                  <PostalCodeComponent
                    city={cityNew}
                    setCity={(city) => {
                      dispatch(setCityNew(city));
                    }}
                    stateCode={stateCodeNew}
                    setStateCode={(state) => {
                      dispatch(setStateCodeNew(state));
                    }}
                    postalCode={postalCodeNew || ""}
                    setPostalCode={(postalCode) => {
                      dispatch(setPostalCodeNew(postalCode));
                    }}
                    setPostalValues={setPostalValues}
                    postalOptions={postalOptions}
                    canadian={canadian}
                    setCanadian={setCanadian}
                    postalCodePK={postalCodePK}
                    setPostalCodePK={(pk) => {
                      dispatch(setPostalCodePK(pk));
                    }}
                    disabled={releaseAtPickupLocation}
                    onPostalSelection={() => {
                      dispatch(setSplitTripMilesData(null));
                    }}
                  />
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label"> Phone</Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0">
                      <input
                        className={`customFormControl ${
                          releaseAtPickupLocation
                            ? ""
                            : phone !== "" && phone?.length === 14
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        control="input"
                        name="phone"
                        value={phone}
                        maxLength={14}
                        onChange={(e) => phoneFormatHandler(e)}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          if (e.target.value === " ") {
                            dispatch(setPhone(""));
                          } else {
                            dispatch(setPhone(e.target.value));
                          }
                        }}
                        disabled={releaseAtPickupLocation}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Email</Form.Label>
                    </Col>

                    <Col xs={7} md={7} sm={7} className="p-0">
                      <input
                        className={`customFormControl ${
                          releaseAtPickupLocation || !email
                            ? ""
                            : formik.errors.email === undefined
                              ? ""
                              : "borderRed"
                        }`}
                        id="customer"
                        name="customer"
                        type="customer"
                        value={email}
                        maxLength={70}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          if (e.target.value === " ") {
                            dispatch(setEmail(""));
                          } else {
                            dispatch(setEmail(e.target.value));
                          }
                        }}
                        disabled={releaseAtPickupLocation}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Contact</Form.Label>
                    </Col>

                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        className={`customFormControl  ${
                          releaseAtPickupLocation ? "" : contact ? "borderGreen" : "borderRed"
                        }`}
                        id="contact"
                        name="contact"
                        type="text"
                        onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                        value={contact}
                        maxLength={30}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          if (e.target.value === " ") {
                            dispatch(setContact(""));
                          } else {
                            dispatch(setContact(e.target.value));
                          }
                        }}
                        disabled={releaseAtPickupLocation}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Contact Phone</Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0">
                      <input
                        className={`customFormControl ${
                          releaseAtPickupLocation
                            ? ""
                            : contactPhone !== "" && contactPhone.length === 14
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        control="input"
                        name="contactPhone"
                        value={contactPhone}
                        maxLength={14}
                        onChange={(e) => contactPhoneFormatHandler(e)}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          if (e.target.value === " ") {
                            dispatch(setContactPhone(""));
                          } else {
                            dispatch(setContactPhone(e.target.value));
                          }
                        }}
                        disabled={releaseAtPickupLocation}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col sm={6} md={6} xs={6} className="ps-lg-6">
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <label className="col-form-label dealer-label p-0 m-b-20">Drivers Email- Hours</label>
                    </Col>
                    <Col sm={10} md={10} className="p-0">
                      <textarea
                        rows={9}
                        cols={20}
                        type="text"
                        onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                        className="customFormControl h-100"
                        id="hours"
                        name="hours"
                        value={hours}
                        disabled={releaseAtPickupLocation}
                        onInput={(e) => {
                          if (e.target.value === " ") {
                            dispatch(setHours(""));
                          } else {
                            dispatch(setHours(e.target.value));
                          }
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <label className="col-form-label dealer-label p-0 m-b-20">
                        Drivers Email- Directions
                      </label>
                    </Col>
                    <Col sm={10} md={10} className="p-0">
                      <textarea
                        rows={9}
                        cols={20}
                        type="text"
                        onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                        disabled={releaseAtPickupLocation}
                        className="customFormControl h-100 "
                        id="directions"
                        name="directions"
                        value={directions}
                        onInput={(e) => {
                          if (e.target.value === " ") {
                            dispatch(setDirections(""));
                          } else {
                            dispatch(setDirections(e.target.value));
                          }
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col sm={12} md={12} xs={12}>
                  <Form.Group
                    className="mt-5 align-items-center row mb-3 mr-0"
                    style={{ marginLeft: "40px" }}
                  >
                    <Col className="p-0 d-flex ">
                      <label htmlFor="" className="ms-0 w-80px">
                        Open Sunday
                      </label>
                      <div className="d-flex align-items-center ">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${
                            openSunday ||
                            openMonday ||
                            openTuesday ||
                            openWednesday ||
                            openThursday ||
                            openFriday ||
                            openSaturday ||
                            releaseAtPickupLocation
                              ? ""
                              : "borderRed"
                          }`}
                          id="openSunday"
                          name="openSunday"
                          value={openSunday}
                          checked={openSunday}
                          disabled={releaseAtPickupLocation}
                          onChange={(e) => dispatch(setOpenSunday(e.target.checked))}
                        />
                      </div>
                      <div className="ms-4 d-flex align-items-center">
                        <label htmlFor="" className="ms-0 w-50px">
                          Monday
                        </label>
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${
                            openSunday ||
                            openMonday ||
                            openTuesday ||
                            openWednesday ||
                            openThursday ||
                            openFriday ||
                            openSaturday ||
                            releaseAtPickupLocation
                              ? ""
                              : "borderRed"
                          }`}
                          id="openMonday"
                          name="openMonday"
                          value={openMonday}
                          disabled={releaseAtPickupLocation}
                          checked={openMonday}
                          onChange={(e) => dispatch(setOpenMonday(e.target.checked))}
                        />
                      </div>

                      <div className="ms-4 d-flex align-items-center">
                        <label htmlFor="" className="ms-0 w-50px">
                          Tuesday
                        </label>
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${
                            openSunday ||
                            openMonday ||
                            openTuesday ||
                            openWednesday ||
                            openThursday ||
                            openFriday ||
                            openSaturday ||
                            releaseAtPickupLocation
                              ? ""
                              : "borderRed"
                          }`}
                          id="openTuesday"
                          name="openTuesday"
                          value={openTuesday}
                          disabled={releaseAtPickupLocation}
                          checked={openTuesday}
                          onChange={(e) => dispatch(setOpenTuesday(e.target.checked))}
                        />
                      </div>

                      <div className="ms-4 d-flex align-items-center">
                        <label htmlFor="" className="ms-0 w-70px">
                          Wednesday
                        </label>
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${
                            openSunday ||
                            openMonday ||
                            openTuesday ||
                            openWednesday ||
                            openThursday ||
                            openFriday ||
                            openSaturday ||
                            releaseAtPickupLocation
                              ? ""
                              : "borderRed"
                          }`}
                          id="openWednesday"
                          name="openWednesday"
                          disabled={releaseAtPickupLocation}
                          value={openWednesday}
                          checked={openWednesday}
                          onChange={(e) => dispatch(setOpenWednesday(e.target.checked))}
                        />
                      </div>
                      <div className="ms-4 d-flex align-items-center">
                        <label htmlFor="" className="ms-0 w-60px">
                          Thursday
                        </label>
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${
                            openSunday ||
                            openMonday ||
                            openTuesday ||
                            openWednesday ||
                            openThursday ||
                            openFriday ||
                            openSaturday ||
                            releaseAtPickupLocation
                              ? ""
                              : "borderRed"
                          }`}
                          id="openThursday"
                          name="openThursday"
                          disabled={releaseAtPickupLocation}
                          value={openThursday}
                          checked={openThursday}
                          onChange={(e) => dispatch(setOpenThursday(e.target.checked))}
                        />
                      </div>
                      <div className="ms-4 d-flex align-items-center">
                        <label htmlFor="" className="ms-0 w-50px">
                          Friday
                        </label>
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${
                            openSunday ||
                            openMonday ||
                            openTuesday ||
                            openWednesday ||
                            openThursday ||
                            openFriday ||
                            openSaturday ||
                            releaseAtPickupLocation
                              ? ""
                              : "borderRed"
                          }`}
                          id="openFriday"
                          disabled={releaseAtPickupLocation}
                          name="openFriday"
                          value={openFriday}
                          checked={openFriday}
                          onChange={(e) => dispatch(setOpenFriday(e.target.checked))}
                        />
                      </div>
                      <div className="ms-4 d-flex align-items-center">
                        <label htmlFor="" className="ms-0 w-60px">
                          Saturday
                        </label>
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${
                            openSunday ||
                            openMonday ||
                            openTuesday ||
                            openWednesday ||
                            openThursday ||
                            openFriday ||
                            openSaturday ||
                            releaseAtPickupLocation
                              ? ""
                              : "borderRed"
                          }`}
                          id="openSaturday"
                          disabled={releaseAtPickupLocation}
                          name="openSaturday"
                          value={openSaturday}
                          checked={openSaturday}
                          onChange={(e) => dispatch(setOpenSaturday(e.target.checked))}
                        />
                      </div>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
            {loading && (
              <div className="fade modal-backdrop show">
                <div className="pos-center">
                  <div className="loader"></div>
                </div>
              </div>
            )}
            <MiscDealerLookup
              show={miscDeliveryDealerSelection}
              onHide={miscDealerModalHide}
              undispatch
              companyFK={driverReleased ? companyPK : postingCompanyFK}
              renderItemId={(dealer) => dealer.unitAddressPK || dealer.UnitAddressPK}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SplitTripLocationContent;
