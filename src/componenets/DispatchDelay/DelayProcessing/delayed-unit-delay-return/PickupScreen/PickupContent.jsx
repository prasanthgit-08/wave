import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setMiscPickupDetails,
  setReturnLocationUpdated,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import { resetSearchSettings } from "../../../../../redux/LookupScreens/MiscDealerLookupSlice";
import { setMiscPickupDealerSelection, setMiscPickupID } from "../../../../../redux/OrderEntryFilterSlice";
import MiscDealerLookup from "../../../../LookupScreens/MiscDealer/MiscDealerLookup";
import OrderEntryService from "../../../../../services/OrderEntryService";
import { Formik } from "formik";
import { emailRegex } from "../../../../../utils/validation/EmailRegex";
import * as yup from "yup";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import { setMiscellaneousDealerId } from "../../../../../redux/UndispatchSlice";
import LoadingIcon from "../../../../common/LoadingIcon";
import UndispatchService from "../../../../../services/UndispatchService";

const PickupContent = () => {
  const miscPickupDetails = useSelector((state) => state.delayProcessing.miscPickupDetails);
  const returnDetails = useSelector((state) => state.delayProcessing.returnDetails);
  const miscDealerSelection = useSelector((state) => state.orderEntryReducer.miscPickupDealerSelection);
  const miscellaneousDealerId = useSelector((state) => state.undispatchReducer.miscellaneousDealerId);
  const data = useSelector((state) => state.delayProcessing.data);
  const [miscname, setMiscname] = useState();
  const [addr1, setAddr1] = useState();
  const [addr2, setAddr2] = useState();
  const [postalcode, setPostalCode] = useState();
  const [city, setCity] = useState();
  const [statecode, setStateCode] = useState();
  const initialValue = [{ city: "", statecode: "", postalcode: "", canadian: false }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [canadian, setCanadian] = useState(false);
  const [phone, setPhone] = useState();
  const [email, setemail] = useState();
  const [contact, setcontact] = useState();
  const [contactphone, setcontactphone] = useState();
  const [openSunday, setopenSunday] = useState();
  const [openMonday, setopenMonday] = useState();
  const [openTuesday, setopenTuesday] = useState();
  const [openWednesday, setOpenWednesday] = useState();
  const [openThursday, setOpenThursday] = useState();
  const [openFriday, setopenFriday] = useState();
  const [openSaturday, setOpenSaturday] = useState();
  const [driverEmailHrs, setdriverEmailHrs] = useState();
  const [driverEmailDir, setdriverEmailDir] = useState();
  const [viewDetail, setViewDetail] = useState(false);
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const stripSpaces = (value) => value?.replace(/ /g, "");

  const generalMiscPickupFormData = () => {
    if (statecode !== miscPickupDetails?.stateCode) {
      dispatch(setReturnLocationUpdated(true));
    }
    dispatch(
      setMiscPickupDetails({
        name: miscname,
        address1: addr1,
        address2: addr2,
        city: city,
        stateCode: statecode,
        postalCode: postalcode,
        canadian: canadian || 0,
        phone: phone ? stripSpaces(phone) : "",
        email: email,
        deliveryContact: contact,
        deliveryContactPhone: contactphone ? stripSpaces(contactphone) : "",
        openSunday: openSunday || 0,
        openMonday: openMonday || 0,
        openTuesday: openTuesday || 0,
        openWednesday: openWednesday || 0,
        openThursday: openThursday || 0,
        openFriday: openFriday || 0,
        openSaturday: openSaturday || 0,
        hours: driverEmailHrs,
        directions: driverEmailDir,
        postalcodePK: postalCodePK,
      })
    );
  };

  const setMiscPickupValues = (pickupdealer) => {
    setMiscname(pickupdealer?.Name?.trim() || pickupdealer?.name?.trim() || "");
    setAddr1(pickupdealer?.Address1?.trim() || pickupdealer?.address1?.trim() || "");
    setAddr2(pickupdealer?.Address2?.trim() || pickupdealer?.address2?.trim() || "");
    setCity(pickupdealer?.City?.trim() || pickupdealer?.city?.trim() || "");
    setStateCode(pickupdealer?.StateCode?.trim() || pickupdealer?.stateCode?.trim() || "");
    setPostalCode(pickupdealer?.PostalCode?.trim() || pickupdealer?.postalCode?.trim() || "");
    setCanadian(pickupdealer?.Canadian || pickupdealer?.canadian);
    const tempphone = pickupdealer?.Phone || pickupdealer?.phone;
    setPhone(tempphone ? formatPhoneNumber(tempphone) : "");
    setemail(pickupdealer?.Email?.trim() || pickupdealer?.email?.trim() || "");
    setcontact(pickupdealer?.DeliveryContact?.trim() || pickupdealer?.deliveryContact?.trim());
    const deliveryphone = pickupdealer?.DeliveryContactPhone || pickupdealer?.deliveryContactPhone;
    setcontactphone(deliveryphone ? formatPhoneNumber(deliveryphone) : "");
    setopenSunday(pickupdealer?.OpenSunday || pickupdealer?.openSunday);
    setopenMonday(pickupdealer?.OpenMonday || pickupdealer?.openMonday);
    setopenTuesday(pickupdealer?.OpenTuesday || pickupdealer?.openTuesday);
    setOpenWednesday(pickupdealer?.OpenWednesday || pickupdealer?.openWednesday);
    setOpenThursday(pickupdealer?.OpenThursday || pickupdealer?.openThursday);
    setopenFriday(pickupdealer?.OpenFriday || pickupdealer?.openFriday);
    setOpenSaturday(pickupdealer?.OpenSaturday || pickupdealer?.openSaturday);
    setdriverEmailHrs(pickupdealer?.Hours?.trim() || pickupdealer?.hours?.trim() || "");
    setdriverEmailDir(pickupdealer?.Directions?.trim() || pickupdealer?.directions?.trim() || "");
    setPostalCodePK(pickupdealer?.PostalCodePK || pickupdealer?.postalcodePK || postalCodePK);
  };

  useEffect(() => {
    if (!miscPickupDetails) {
      setMiscPickupValues(null);
      dispatch(setMiscPickupID(null));
    } else {
      setMiscPickupValues(miscPickupDetails);
    }
  }, []);

  useEffect(() => {
    setMiscPickupValues(miscPickupDetails);
  }, []);

  useEffect(() => {
    generalMiscPickupFormData();
  }, [
    returnDetails,
    miscname,
    addr1,
    addr2,
    city,
    statecode,
    postalcode,
    postalCodePK,
    canadian,
    phone,
    email,
    contact,
    contactphone,
    openSunday,
    openMonday,
    openTuesday,
    openWednesday,
    openThursday,
    openFriday,
    openSaturday,
    driverEmailHrs,
    driverEmailDir,
    postalCodePK,
  ]);

  const handleMiscDealerSelection = () => {
    dispatch(resetSearchSettings());
    dispatch(setMiscPickupDealerSelection(true));
    dispatch(resetSearchSettings());
  };

  /**
   * used for Misc Dealer selection Lookup - onClose
   */
  const miscDealerModalHide = () => {
    dispatch(setMiscPickupDealerSelection(false));
  };

  const fetchMiscDealerById = async (miscellaneousDealerId) => {
    if (
      miscellaneousDealerId != null &&
      miscellaneousDealerId !== undefined &&
      miscellaneousDealerId !== ""
    ) {
      setLoading(true);
      await UndispatchService.fetchMiscDealerByIdCrossDB(miscellaneousDealerId, data?.CompanyId || 0)
        .then((response) => {
          const data = response?.data;
          setMiscPickupValues(data);
          setLoading(false);
          dispatch(setMiscellaneousDealerId(null));
        })
        .catch((err) => {
          dispatch(setMiscellaneousDealerId(null));
          setLoading(false);
        });
    }
  };

  /**
   * call function Misc dealer by id
   */
  useEffect(() => {
    if (miscellaneousDealerId !== null) {
      fetchMiscDealerById(miscellaneousDealerId);
    }
  }, [miscellaneousDealerId]);

  useEffect(() => {
    if (city && statecode && postalcode) {
      setViewDetail(false);
    }
  }, [city, statecode, postalcode]);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };
  const contactPhoneFormatHandler = (e) => {
    const formattedContactPhoneNumber = formatPhoneNumber(e.target.value);
    setcontactphone(formattedContactPhoneNumber);
  };

  const validationSchema = yup.object({
    name: yup.string().required(),
    address1: yup.string().required(),
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
    contact: yup.string().required(),
    phone: yup.string().matches(phoneRegex).required(),
    email: yup.string().matches(emailRegex),
    contactPhone: yup.string().matches(phoneRegex).required(),
  });

  /***Used to fetch deatials of unit address**/

  return (
    <Formik
      initialValues={{
        miscname,
        addr1,
        city,
        statecode,
        postalcode,
        canadian,
        contact,
        phone,
        contactphone,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        miscname: true,
        addr1: true,
        city: true,
        statecode: true,
        postalcode: true,
        canadian: false,
        contact: true,
        phone: true,
        contactphone: true,
      }}
    >
      {(formik) => (
        <div className="p-2">
          <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight">
            <Row className="m-0 p-10">
              <Col xs={6}>
                <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 ">
                    <Form.Label className="col-form-label dealer-label">
                      {" "}
                      Miscellaneous Pickup Dealer
                    </Form.Label>
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 ">
                    <Form.Label className="col-form-label dealer-label"> </Form.Label>
                  </Col>
                  <Col xs={6} sm={6} md={6} className="p-0 ">
                    <button
                      className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                      type="button"
                      name="miscCustomerSelection"
                      id="miscCustomerSelection"
                      onClick={handleMiscDealerSelection}
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
                        viewDetail
                          ? "black"
                          : formik.errors.miscname === undefined && miscname?.length >= 1
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      name="miscname"
                      type="text"
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={miscname}
                      onInput={(e) => {
                        formik.handleChange(e);
                        setMiscname(e.target.value);
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
                      className={`customFormControl  ${
                        viewDetail
                          ? "black"
                          : formik.errors.addr1 === undefined && addr1?.length >= 1
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="ad1"
                      name="ad1"
                      type="text"
                      maxLength={30}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      value={addr1}
                      onInput={(e) => {
                        formik.handleChange(e);
                        setAddr1(e.target.value);
                      }}
                      style={{
                        borderColor: viewDetail
                          ? "black"
                          : formik.errors.addr1 === undefined && addr1?.length >= 1
                            ? "green"
                            : "red",
                      }}
                      spellCheck={false}
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
                      name="ad2"
                      type="text"
                      maxLength={30}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      value={addr2}
                      onInput={(e) => setAddr2(e.target.value)}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>
                <PostalCodeComponent
                  disabled={viewDetail}
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
                      className={`customFormControl  ${
                        phone !== "" && phone?.length === 14 ? "borderGreen" : "borderRed"
                      }`}
                      control="input"
                      name="phone"
                      value={phone}
                      onChange={(e) => phoneFormatHandler(e)}
                      maxLength={14}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        formik.handleChange(e);
                        setPhone(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Email</Form.Label>
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0">
                    <input
                      className={`customFormControl  ${
                        viewDetail === true
                          ? "black"
                          : formik.errors.email === undefined && email != null && email?.length >= 1
                            ? ""
                            : formik.errors.email !== undefined
                              ? "borderRed"
                              : ""
                      }`}
                      type="email"
                      name="email"
                      maxLength={70}
                      value={email}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        formik.handleChange(e);
                        setemail(e.target.value);
                      }}
                      style={{
                        borderColor:
                          viewDetail === true
                            ? "black"
                            : formik.errors.email === undefined && email != null && email?.length >= 1
                              ? ""
                              : formik.errors.email !== undefined
                                ? "red"
                                : "",
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
                      className={`customFormControl  ${
                        viewDetail
                          ? "black"
                          : formik.errors.contact === undefined && contact?.length >= 1
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      type="contact"
                      name="contact"
                      maxLength={14}
                      value={contact}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        formik.handleChange(e);
                        setcontact(e.target.value);
                      }}
                      style={{
                        borderColor: viewDetail
                          ? "black"
                          : formik.errors.contact === undefined && contact?.length >= 1
                            ? "green"
                            : "red",
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
                      className={`customFormControl  ${
                        contactphone !== "" && contactphone?.length === 14 ? "borderGreen" : "borderRed"
                      }`}
                      type="contactPhone"
                      name="contactPhone"
                      maxLength={14}
                      value={contactphone}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => contactPhoneFormatHandler(e)}
                      onInput={(e) => setcontactphone(e.target.value)}
                      style={{
                        borderColor: viewDetail
                          ? "black"
                          : formik.errors.contactphone === undefined && contactphone?.length >= 1
                            ? "green"
                            : "red",
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Row>
                <Col sm={3} md={3} lg={3} xl={3}>
                  <Col xs={12}>
                    <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} md={3} xs={3} className="p-0 w-145px">
                        <Form.Label className="col-form-label dealer-label">Open Sunday</Form.Label>
                      </Col>

                      <Col xs={2} md={2} sm={2} className="p-0">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${openSunday || openMonday || openTuesday || openWednesday || openThursday || openFriday || openSaturday ? "" : "borderRed"}`}
                          value={openSunday}
                          checked={openSunday}
                          onChange={(e) => setopenSunday(e.target.checked)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} md={3} xs={3} className="p-0 w-145px">
                        <Form.Label className="col-form-label dealer-label">Open Monday</Form.Label>
                      </Col>

                      <Col xs={2} md={2} sm={2} className="p-0">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${openSunday || openMonday || openTuesday || openWednesday || openThursday || openFriday || openSaturday ? "" : "borderRed"}`}
                          value={openMonday}
                          checked={openMonday}
                          onChange={(e) => setopenMonday(e.target.checked)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} md={3} xs={3} className="p-0 w-145px">
                        <Form.Label className="col-form-label dealer-label">Open Tuesday</Form.Label>
                      </Col>

                      <Col xs={2} md={2} sm={2} className="p-0">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${openSunday || openMonday || openTuesday || openWednesday || openThursday || openFriday || openSaturday ? "" : "borderRed"}`}
                          value={openTuesday}
                          checked={openTuesday}
                          onChange={(e) => setopenTuesday(e.target.checked)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} md={3} xs={3} className="p-0 w-145px">
                        <Form.Label className="col-form-label dealer-label">Open Wednesday</Form.Label>
                      </Col>

                      <Col xs={2} md={2} sm={2} className="p-0">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${openSunday || openMonday || openTuesday || openWednesday || openThursday || openFriday || openSaturday ? "" : "borderRed"}`}
                          value={openWednesday}
                          checked={openWednesday}
                          onChange={(e) => setOpenWednesday(e.target.checked)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} md={3} xs={3} className="p-0 w-145px">
                        <Form.Label className="col-form-label dealer-label">Open Thursday</Form.Label>
                      </Col>

                      <Col xs={2} md={2} sm={2} className="p-0">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${openSunday || openMonday || openTuesday || openWednesday || openThursday || openFriday || openSaturday ? "" : "borderRed"}`}
                          value={openThursday}
                          checked={openThursday}
                          onChange={(e) => setOpenThursday(e.target.checked)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} md={3} xs={3} className="p-0 w-145px">
                        <Form.Label className="col-form-label dealer-label">Open Friday</Form.Label>
                      </Col>

                      <Col xs={2} md={2} sm={2} className="p-0">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${openSunday || openMonday || openTuesday || openWednesday || openThursday || openFriday || openSaturday ? "" : "borderRed"}`}
                          value={openFriday}
                          checked={openFriday}
                          onChange={(e) => setopenFriday(e.target.checked)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} md={3} xs={3} className="p-0 w-145px">
                        <Form.Label className="col-form-label dealer-label">Open Saturday</Form.Label>
                      </Col>

                      <Col xs={2} md={2} sm={2} className="p-0">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${openSunday || openMonday || openTuesday || openWednesday || openThursday || openFriday || openSaturday ? "" : "borderRed"}`}
                          value={openSaturday}
                          checked={openSaturday}
                          onChange={(e) => setOpenSaturday(e.target.checked)}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Col>

                <Col xs={4}>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <label className="col-form-label dealer-label p-0 m-b-20">Drivers Email- Hours</label>
                    </Col>
                    <Col sm={10} md={10} className="p-0">
                      <textarea
                        rows={9}
                        cols={20}
                        type="text"
                        className="customFormControl h-100"
                        id="hours"
                        name="hours"
                        value={driverEmailHrs}
                        onInput={(e) => setdriverEmailHrs(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col xs={4}>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
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
                        value={driverEmailDir}
                        onInput={(e) => setdriverEmailDir(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </Row>
            <MiscDealerLookup
              show={miscDealerSelection}
              onHide={miscDealerModalHide}
              undispatch
              companyFK={data?.CompanyId || 0}
            />
            {loading && <LoadingIcon />}
          </div>
        </div>
      )}
    </Formik>
  );
};

export default PickupContent;
