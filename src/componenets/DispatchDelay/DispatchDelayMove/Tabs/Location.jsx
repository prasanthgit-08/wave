import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
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
  setMiscellaneousDealerId,
} from "../../../../redux/UndispatchSlice";
import OrderEntryService from "../../../../services/OrderEntryService";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import { Formik } from "formik";
import { emailRegex } from "../../../../utils/validation/EmailRegex";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import PostalCodeComponent from "../../../common/PostalCodeComponent";
import { resetSearchSettings } from "../../../../redux/LookupScreens/MiscDealerLookupSlice";
import MiscDealerLookup from "../../../LookupScreens/MiscDealer/MiscDealerLookup";
import {
  setMiscMoveDeliveryDetails,
  setMoveData,
} from "../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import { removeLeadingWhitespace } from "../../../../utils/utils";

const Location = () => {
  const dispatch = useDispatch();
  const [canadian, setCanadian] = useState(false);
  const [statecode, setStateCode] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState();
  const [zipIdChcek, setZipIdCheck] = useState("");
  const [miscDeliveryDealerSelection, setMiscDeliveryDealerSelection] = useState(false);
  const miscellaneousDealerId = useSelector((state) => state.undispatchReducer.miscellaneousDealerId);
  const miscellaneousDealerData = useSelector((state) => state.undispatchReducer.miscellaneousDealerData);
  const miscMoveDeliveryDetails = useSelector((state) => state.delayProcessing.miscMoveDeliveryDetails);
  const moveData = useSelector((state) => state.delayProcessing.moveData);
  const alternateLocationRedux = useSelector((state) => state.delayProcessing.alternateLocationRedux);
  //Col-1
  const [name, setName] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [contactPhone, setContactPhone] = useState("");
  const [openSunday, setOpenSunday] = useState(false);
  const [openMonday, setOpenMonday] = useState(true);
  const [openTuesday, setOpenTuesday] = useState(true);
  const [openWednesday, setOpenWednesday] = useState(true);
  const [openThursday, setOpenThursday] = useState(true);
  const [openFriday, setOpenFriday] = useState(true);
  const [openSaturday, setOpenSaturday] = useState(false);
  const [hours, setHours] = useState("");
  const [postalCodeOnChange, setPostalCodeOnChange] = useState(false);
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [directions, setDirections] = useState("");
  const [viewDetail, setViewDetail] = useState(false);
  const [resetFlag, setresetFlag] = useState(false);
  const [selectedCompanyId, setCompanyId] = useState(() => {
    // Initialize state from localStorage
    return localStorage.getItem("selectedCompanyId");
  });

  const navigate = useNavigate();
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const contactPhoneFormatHandler = (e) => {
    const formattedContactPhoneNumber = formatPhoneNumber(e.target.value);
    setContactPhone(formattedContactPhoneNumber);
  };

  /***Lookup Selection***/
  const handleMiscDealerSelection = () => {
    dispatch(resetSearchSettings());
    setMiscDeliveryDealerSelection(true);
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
      await OrderEntryService.fetchMiscDealerById(miscellaneousDealerId)
        .then((response) => {
          const data = response?.data;
          setPostalCodePK(data?.postalCodePK);
          dispatch(setMiscellaneousDealerData(data));
        })
        .catch((err) => {});
    }
  };
  useEffect(() => {
    if (city && statecode && postalcode) {
      setViewDetail(false);
    }
  }, [city, statecode, postalcode]);

  useEffect(() => {
    if (miscellaneousDealerData != null && moveData?.isAlternateLoc) {
      setName(miscellaneousDealerData?.name?.trim());
      setAddress1(miscellaneousDealerData?.address1?.trim());
      setAddress2(miscellaneousDealerData?.address2?.trim());
      setCity(miscellaneousDealerData?.city?.trim());
      setStateCode(miscellaneousDealerData?.stateCode?.trim());
      setPostalCode(miscellaneousDealerData?.postalCode?.trim());
      setCanadian(miscellaneousDealerData?.canadian || false);
      setPhone(
        miscellaneousDealerData?.phone != null ? formatPhoneNumber(miscellaneousDealerData?.phone) : ""
      );
      setEmail(miscellaneousDealerData.email?.trim());
      setContact(miscellaneousDealerData?.deliveryContact?.trim());
      setContactPhone(
        miscellaneousDealerData?.deliveryContactPhone != null
          ? formatPhoneNumber(miscellaneousDealerData?.deliveryContactPhone)
          : ""
      );
      setOpenSunday(miscellaneousDealerData?.openSunday || false);
      setOpenMonday(miscellaneousDealerData?.openMonday || false);
      setOpenTuesday(miscellaneousDealerData?.openTuesday || false);
      setOpenWednesday(miscellaneousDealerData?.openWednesday || false);
      setOpenThursday(miscellaneousDealerData?.openThursday || false);
      setOpenFriday(miscellaneousDealerData?.openFriday || false);
      setOpenSaturday(miscellaneousDealerData?.openSaturday || false);
      setHours(miscellaneousDealerData?.hours?.trim());
      setDirections(miscellaneousDealerData?.directions?.trim());

      initialValue[0].city = miscellaneousDealerData.city != null ? miscellaneousDealerData.city?.trim() : "";
      initialValue[0].statecode =
        miscellaneousDealerData.statecode != null ? miscellaneousDealerData.statecode?.trim() : "";
      initialValue[0].postalcode =
        miscellaneousDealerData.postalcode != null ? miscellaneousDealerData.postalcode?.trim() : "";
      setPostalValues(initialValue);
      setPostalCodePK(miscellaneousDealerData?.postalCodePK ? miscellaneousDealerData?.postalCodePK : null);
    } else {
      resetLoc();
    }
  }, [miscellaneousDealerData]);

  const validationSchema = yup.object({
    city: yup.string().required(),
    stateCode: yup.string().max(2).min(2).required(),
    postalCode: yup.string().required(),
    email: yup.string().matches(emailRegex),
  });

  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };

  const changePostalCode = (e) => {
    dispatch(setPostalCodeOnChange(e));
  };
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  function MiscDeliveryDealerFormData() {
    dispatch(
      setMiscMoveDeliveryDetails({
        name: name,
        address1: address1,
        address2: address2,
        city: city,
        stateCode: statecode,
        postalCode: postalcode,
        postalCodePK: postalCodePK,
        canadian: canadian,
        phone: phone?.replace(/\s+/g, ""),
        email: email,
        deliveryContact: contact,
        deliveryContactPhone: contactPhone?.replace(/\s+/g, ""),
        openSunday: openSunday,
        openMonday: openMonday,
        openTuesday: openTuesday,
        openWednesday: openWednesday,
        openThursday: openThursday,
        openFriday: openFriday,
        openSaturday: openSaturday,
        driverEmailHrs: hours,
        driverEmailDir: directions,
      })
    );
  }

  useEffect(() => {
    if (miscellaneousDealerId) {
      fetchMiscDealerById(miscellaneousDealerId);
    }
  }, [miscellaneousDealerId]);

  useEffect(() => {
    MiscDeliveryDealerFormData();
  }, [
    name,
    address1,
    address2,
    city,
    statecode,
    postalcode,
    postalCodePK,
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
    if (!miscMoveDeliveryDetails) {
      dispatch(setMiscellaneousDealerData(null));
    }
  }, [moveData?.isAlternateLoc]);

  useEffect(() => {
    dispatch(setMoveData(null));
    dispatch(setMiscellaneousDealerId(null));
    dispatch(setMiscellaneousDealerData(null));
  }, []);

  const resetLoc = () => {
    setName("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setPostalCode("");
    setStateCode("");
    setCanadian("");
    setContact("");
    setContactPhone("");
    setEmail("");
    setPhone("");
    setHours("");
    setDirections("");
    setOpenSunday(false);
    setOpenMonday(true);
    setOpenTuesday(true);
    setOpenWednesday(true);
    setOpenThursday(true);
    setOpenFriday(true);
    setOpenSaturday(false);
    initialValue[0].city = "";
    initialValue[0].statecode = "";
    initialValue[0].postalcode = "";
    setPostalValues(initialValue);
    setPostalCodePK(null);
  };

  useEffect(() => {
    if (!alternateLocationRedux) {
      resetLoc();
    }
  }, [alternateLocationRedux]);

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
          <div className="p-2" onClick={handleMouseEventMain} onFocus={handleMouseEventMain}>
            {/* <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight"> */}
            <Row className="m-0 p-10">
              <Col xs={6}>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 ">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>
                  <Col xs={6} sm={6} md={6} className="p-0 ">
                    <button
                      className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                      type="button"
                      name="miscCustomerSelection"
                      id="miscCustomerSelection"
                      onClick={handleMiscDealerSelection}

                      // MiscCustomerSelction Modal @ bottom
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
                      className={`customFormControl  ${name ? "borderGreen" : "borderRed"}`}
                      name="n"
                      type="text"
                      value={name}
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="none"
                      onInput={(e) => {
                        setName(removeLeadingWhitespace(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Address</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      className={`customFormControl  ${address1 ? "borderGreen" : "borderRed"}`}
                      id="a1"
                      name="a1"
                      type="text"
                      value={address1}
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="none"
                      onInput={(e) => {
                        setAddress1(removeLeadingWhitespace(e.target.value));
                      }}
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
                      id="a2"
                      name="a2"
                      type="text"
                      maxLength={30}
                      value={address2}
                      autoComplete="new-password"
                      aria-autocomplete="none"
                      onInput={(e) => setAddress2(removeLeadingWhitespace(e.target.value))}
                    />
                  </Col>
                </Form.Group>

                <PostalCodeComponent
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
                />

                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Phone</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      className={`customFormControl ${
                        phone !== "" && phone?.length === 14 ? "borderGreen" : "borderRed"
                      }`}
                      control="input"
                      name="ph"
                      value={formatPhoneNumber(phone)}
                      maxLength={14}
                      onChange={(e) => phoneFormatHandler(e)}
                      autoComplete="new-password"
                      aria-autocomplete="none"
                      onInput={(e) => {
                        setPhone(e.target.value);
                      }}
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
                        formik.errors.email === undefined && email !== null && email?.length > 1
                          ? "borderGreen"
                          : "borderRed"
                      }`}
                      id="cus"
                      name="cus"
                      type="customer"
                      value={email}
                      maxLength={70}
                      autoComplete="new-password"
                      aria-autocomplete="none"
                      onInput={(e) => {
                        setEmail(removeLeadingWhitespace(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Contact</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      className={`customFormControl  ${contact ? "borderGreen" : "borderRed"}`}
                      id="cc"
                      name="cc"
                      type="text"
                      value={contact}
                      maxLength={30}
                      autoComplete="new-password"
                      aria-autocomplete="none"
                      onInput={(e) => {
                        setContact(removeLeadingWhitespace(e.target.value));
                      }}
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
                        contactPhone !== "" && contactPhone?.length === 14 ? "borderGreen" : "borderRed"
                      }`}
                      control="input"
                      name="cp"
                      value={contactPhone}
                      maxLength={14}
                      onChange={(e) => contactPhoneFormatHandler(e)}
                      autoComplete="new-password"
                      aria-autocomplete="none"
                      onInput={(e) => {
                        setContactPhone(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={6} md={6} xs={6} className="ps-lg-6">
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <label className="col-form-label dealer-label p-0 m-b-20">Drivers Email- Hours</label>
                  </Col>
                  <Col sm={10} xs={10} className="p-0">
                    <textarea
                      rows={9}
                      cols={20}
                      type="text"
                      className="customFormControl h-100"
                      id="hours"
                      name="hours"
                      value={hours}
                      onInput={(e) => setHours(e.target.value)}
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
                      className="customFormControl h-100 "
                      id="directions"
                      name="directions"
                      value={directions}
                      onInput={(e) => setDirections(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={12} md={12} xs={12}>
                <Form.Group className="mt-4 align-items-center row mb-3 mr-0">
                  <Col className="p-0 d-flex ">
                    <label htmlFor="" className="ms-0 w-80px">
                      Open Sunday
                    </label>
                    <div className="d-flex align-items-center ">
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${!openSunday && !openMonday && !openTuesday && !openWednesday && !openThursday && !openFriday && !openSaturday ? "borderRed" : ""}`}
                        id="openSunday"
                        name="openSunday"
                        value={openSunday}
                        checked={openSunday}
                        onChange={(e) => setOpenSunday(e.target.checked)}
                      />
                    </div>
                    <div className="ms-4 d-flex align-items-center">
                      <label htmlFor="" className="ms-0 w-50px">
                        Monday
                      </label>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${!openSunday && !openMonday && !openTuesday && !openWednesday && !openThursday && !openFriday && !openSaturday ? "borderRed" : ""}`}
                        id="openMonday"
                        name="openMonday"
                        checked={openMonday}
                        onChange={(e) => setOpenMonday(e.target.checked)}
                      />
                    </div>

                    <div className="ms-4 d-flex align-items-center">
                      <label htmlFor="" className="ms-0 w-50px">
                        Tuesday
                      </label>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${!openSunday && !openMonday && !openTuesday && !openWednesday && !openThursday && !openFriday && !openSaturday ? "borderRed" : ""}`}
                        id="openTuesday"
                        name="openTuesday"
                        value={openTuesday}
                        checked={openTuesday}
                        onChange={(e) => setOpenTuesday(e.target.checked)}
                      />
                    </div>

                    <div className="ms-4 d-flex align-items-center">
                      <label htmlFor="" className="ms-0 w-70px">
                        Wednesday
                      </label>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${!openSunday && !openMonday && !openTuesday && !openWednesday && !openThursday && !openFriday && !openSaturday ? "borderRed" : ""}`}
                        id="openWednesday"
                        name="openWednesday"
                        value={openWednesday}
                        checked={openWednesday}
                        onChange={(e) => setOpenWednesday(e.target.checked)}
                      />
                    </div>
                    <div className="ms-4 d-flex align-items-center">
                      <label htmlFor="" className="ms-0 w-60px">
                        Thursday
                      </label>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${!openSunday && !openMonday && !openTuesday && !openWednesday && !openThursday && !openFriday && !openSaturday ? "borderRed" : ""}`}
                        id="openThursday"
                        name="openThursday"
                        value={openThursday}
                        checked={openThursday}
                        onChange={(e) => setOpenThursday(e.target.checked)}
                      />
                    </div>
                    <div className="ms-4 d-flex align-items-center">
                      <label htmlFor="" className="ms-0 w-50px">
                        Friday
                      </label>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${!openSunday && !openMonday && !openTuesday && !openWednesday && !openThursday && !openFriday && !openSaturday ? "borderRed" : ""}`}
                        id="openFriday"
                        name="openFriday"
                        value={openFriday}
                        checked={openFriday}
                        onChange={(e) => setOpenFriday(e.target.checked)}
                      />
                    </div>
                    <div className="ms-4 d-flex align-items-center">
                      <label htmlFor="" className="ms-0 w-60px">
                        Saturday
                      </label>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${!openSunday && !openMonday && !openTuesday && !openWednesday && !openThursday && !openFriday && !openSaturday ? "borderRed" : ""}`}
                        id="openSaturday"
                        name="openSaturday"
                        value={openSaturday}
                        checked={openSaturday}
                        onChange={(e) => setOpenSaturday(e.target.checked)}
                      />
                    </div>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            {/* </div> */}
            <MiscDealerLookup
              show={miscDeliveryDealerSelection}
              onHide={miscDealerModalHide}
              undispatch
              companyFK={selectedCompanyId || 0}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Location;
