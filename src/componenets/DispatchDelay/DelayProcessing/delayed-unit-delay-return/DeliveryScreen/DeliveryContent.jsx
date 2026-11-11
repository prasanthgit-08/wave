import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setMiscDeliveryDetails,
  setReturnLocationUpdated,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import { resetSearchSettings } from "../../../../../redux/LookupScreens/MiscDealerLookupSlice";
import { setMiscDeliveryDealerSelection } from "../../../../../redux/OrderEntryFilterSlice";
import MiscDealerLookup from "../../../../LookupScreens/MiscDealer/MiscDealerLookup";
import OrderEntryService from "../../../../../services/OrderEntryService";
import DynamicTextFields from "../../../../common/AutoWrapTextFields/DynamicTextFields";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import { Formik } from "formik";
import * as yup from "yup";
import { emailRegex } from "../../../../../utils/validation/EmailRegex";
import UndispatchService from "../../../../../services/UndispatchService";
import { setMiscellaneousDealerId } from "../../../../../redux/UndispatchSlice";
import LoadingIcon from "../../../../common/LoadingIcon";

const DeliveryContent = () => {
  const miscDeliveryDetails = useSelector((state) => state.delayProcessing.miscDeliveryDetails);
  const miscDealerSelection = useSelector((state) => state.orderEntryReducer.miscDeliveryDealerSelection);
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
  const [openWed, setopenWed] = useState();
  const [openThurs, setopenThurs] = useState();
  const [openFri, setopenFri] = useState();
  const [openSat, setopenSat] = useState();
  const [driverEmailHrs, setdriverEmailHrs] = useState();
  const [driverEmailDir, setdriverEmailDir] = useState();
  const [miscellaneousDealer, setMiscellaneousDealer] = useState(null);

  const [hours1, setHours1] = useState("");
  const [hours2, setHours2] = useState("");
  const [hours3, setHours3] = useState("");
  const [directions1, setDirections1] = useState("");
  const [directions2, setDirections2] = useState("");
  const [directions3, setDirections3] = useState("");
  const [directions4, setDirections4] = useState("");
  const [directions5, setDirections5] = useState("");
  const [directions6, setDirections6] = useState("");
  const [directions7, setDirections7] = useState("");

  const [miscellaneous1, setMiscellaneous1] = useState("");
  const [miscellaneous2, setMiscellaneous2] = useState("");
  const [miscellaneous3, setMiscellaneous3] = useState("");
  const [miscellaneous4, setMiscellaneous4] = useState("");
  const [miscellaneous5, setMiscellaneous5] = useState("");
  const [miscellaneous6, setMiscellaneous6] = useState("");
  const [miscellaneous7, setMiscellaneous7] = useState("");

  const [otherText1, setOtherText1] = useState("");
  const [otherText2, setOtherText2] = useState("");
  const [otherText3, setOtherText3] = useState("");
  const [washInstructions1, setWashInstructions1] = useState("");
  const [washInstructions2, setWashInstructions2] = useState("");
  const [washInstructions3, setWashInstructions3] = useState("");
  const [washInstructions4, setWashInstructions4] = useState("");
  const [washInstructions5, setWashInstructions5] = useState("");
  const [washInstructions, setWashInstructions] = useState("");
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [loading, setLoading] = useState(false);

  const [bolTextHoursInputValues, setBolTextHoursInputValues] = useState(Array(3).fill(""));
  const [bolTextDirectionsInputValues, setBolTextDirectionsInputValues] = useState(Array(7).fill(""));
  const [bolTexMiscellaneousInputValues, setBolTexMiscellaneousInputValues] = useState(Array(7).fill(""));
  const [bolTexOtherInputValues, setBolTexOtherInputValues] = useState(Array(3).fill(""));
  const [bolTextWashInstructions, setBolTextWashInstructions] = useState(Array(5).fill(""));
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const dispatch = useDispatch();
  const stripSpaces = (value) => value?.replace(/ /g, "");

  const generalMiscDelFormData = () => {
    if (statecode !== miscDeliveryDetails?.stateCode) {
      dispatch(setReturnLocationUpdated(true));
    }
    dispatch(
      setMiscDeliveryDetails({
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
        openWednesday: openWed || 0,
        openThursday: openThurs || 0,
        openFriday: openFri || 0,
        openSaturday: openSat || 0,
        hours: driverEmailHrs,
        directions: driverEmailDir,
        hours1: bolTextHoursInputValues[0]?.trim(),
        hours2: bolTextHoursInputValues[1]?.trim(),
        hours3: bolTextHoursInputValues[2]?.trim(),
        bolTextHours: bolTextHoursInputValues,
        directions1: bolTextDirectionsInputValues[0]?.trim(),
        directions2: bolTextDirectionsInputValues[1]?.trim(),
        directions3: bolTextDirectionsInputValues[2]?.trim(),
        directions4: bolTextDirectionsInputValues[3]?.trim(),
        directions5: bolTextDirectionsInputValues[4]?.trim(),
        directions6: bolTextDirectionsInputValues[5]?.trim(),
        directions7: bolTextDirectionsInputValues[6]?.trim(),
        bolTextDirections: bolTextDirectionsInputValues,
        directions: driverEmailDir,
        bolTextMiscellaneous: bolTexMiscellaneousInputValues,

        //Col-3
        otherText1: bolTexOtherInputValues[0]?.trim(),
        otherText2: bolTexOtherInputValues[1]?.trim(),
        otherText3: bolTexOtherInputValues[2]?.trim(),
        washInstructions1: bolTextWashInstructions[0]?.trim(),
        washInstructions2: bolTextWashInstructions[1]?.trim(),
        washInstructions3: bolTextWashInstructions[2]?.trim(),
        washInstructions4: bolTextWashInstructions[3]?.trim(),
        washInstructions5: bolTextWashInstructions[4]?.trim(),
        bolText1: bolTexMiscellaneousInputValues[0]?.trim(),
        bolText2: bolTexMiscellaneousInputValues[1]?.trim(),
        bolText3: bolTexMiscellaneousInputValues[2]?.trim(),
        bolText4: bolTexMiscellaneousInputValues[3]?.trim(),
        bolText5: bolTexMiscellaneousInputValues[4]?.trim(),
        bolText6: bolTexMiscellaneousInputValues[5]?.trim(),
        bolText7: bolTexMiscellaneousInputValues[6]?.trim(),
        bolTextWashInstructions: bolTextWashInstructions,
        washInstructions: washInstructions,
        postalcodePK: postalCodePK,
      })
    );
  };

  const setMiscDelValues = (miscellaneousDealer) => {
    setMiscname(miscellaneousDealer?.Name?.trim() || miscellaneousDealer?.name?.trim() || "");
    setAddr1(miscellaneousDealer?.Address1?.trim() || miscellaneousDealer?.address1?.trim() || "");
    setAddr2(miscellaneousDealer?.Address2?.trim() || miscellaneousDealer?.address2?.trim() || "");
    setCity(miscellaneousDealer?.City?.trim() || miscellaneousDealer?.city?.trim() || "");
    setStateCode(miscellaneousDealer?.StateCode?.trim() || miscellaneousDealer?.stateCode?.trim() || "");
    setPostalCode(miscellaneousDealer?.PostalCode?.trim() || miscellaneousDealer?.postalCode?.trim() || "");
    setCanadian(miscellaneousDealer?.Canadian || miscellaneousDealer?.canadian);
    const tempphone = miscellaneousDealer?.Phone?.trim() || miscellaneousDealer?.phone || "";
    setPhone(formatPhoneNumber(tempphone || ""));
    setemail(miscellaneousDealer?.Email?.trim() || miscellaneousDealer?.email?.trim() || "");
    setcontact(
      miscellaneousDealer?.DeliveryContact?.trim() || miscellaneousDealer?.deliveryContact?.trim() || ""
    );
    const tempContactPhone =
      miscellaneousDealer?.DeliveryContactPhone || miscellaneousDealer?.deliveryContactPhone;
    setcontactphone(formatPhoneNumber(tempContactPhone) || "");
    setopenSunday(miscellaneousDealer?.OpenSunday || miscellaneousDealer?.openSunday || "");
    setopenMonday(miscellaneousDealer?.OpenMonday || miscellaneousDealer?.openMonday || "");
    setopenTuesday(miscellaneousDealer?.OpenTuesday || miscellaneousDealer?.openTuesday || "");
    setopenWed(miscellaneousDealer?.OpenWednesday || miscellaneousDealer?.openWednesday || "");
    setopenThurs(miscellaneousDealer?.OpenThursday || miscellaneousDealer?.openThursday || "");
    setopenFri(miscellaneousDealer?.OpenFriday || miscellaneousDealer?.openFriday || "");
    setopenSat(miscellaneousDealer?.OpenSaturday || miscellaneousDealer?.openSaturday || "");
    setdriverEmailHrs(miscellaneousDealer?.Hours?.trim() || miscellaneousDealer?.hours?.trim() || "");
    //Col-2
    if (miscellaneousDealer?.bolTextHours) {
      setHours1(miscellaneousDealer?.bolTextHours[0]?.trim());
      setHours2(miscellaneousDealer?.bolTextHours[1]?.trim());
      setHours3(miscellaneousDealer?.bolTextHours[2]?.trim());
    } else {
      setHours1(miscellaneousDealer?.Hours1 != null ? miscellaneousDealer?.Hours1?.trim() : "");
      setHours2(miscellaneousDealer?.Hours2 != null ? miscellaneousDealer?.Hours2?.trim() : "");
      setHours3(miscellaneousDealer?.Hours3 != null ? miscellaneousDealer?.Hours3?.trim() : "");
    }
    if (miscellaneousDealer?.bolTextMiscellaneous) {
      setMiscellaneous1(miscellaneousDealer?.bolTextMiscellaneous[0]?.trim());
      setMiscellaneous2(miscellaneousDealer?.bolTextMiscellaneous[1]?.trim());
      setMiscellaneous3(miscellaneousDealer?.bolTextMiscellaneous[2]?.trim());
      setMiscellaneous4(miscellaneousDealer?.bolTextMiscellaneous[3]?.trim());
      setMiscellaneous5(miscellaneousDealer?.bolTextMiscellaneous[4]?.trim());
      setMiscellaneous6(miscellaneousDealer?.bolTextMiscellaneous[5]?.trim());
      setMiscellaneous7(miscellaneousDealer?.bolTextMiscellaneous[6]?.trim());
    } else {
      setMiscellaneous1(miscellaneousDealer?.BOLText1 != null ? miscellaneousDealer?.BOLText1?.trim() : "");
      setMiscellaneous2(miscellaneousDealer?.BOLText2 != null ? miscellaneousDealer?.BOLText2?.trim() : "");
      setMiscellaneous3(miscellaneousDealer?.BOLText3 != null ? miscellaneousDealer?.BOLText3?.trim() : "");
      setMiscellaneous4(miscellaneousDealer?.BOLText4 != null ? miscellaneousDealer?.BOLText4?.trim() : "");
      setMiscellaneous5(miscellaneousDealer?.BOLText5 != null ? miscellaneousDealer?.BOLText5?.trim() : "");
      setMiscellaneous6(miscellaneousDealer?.BOLText6 != null ? miscellaneousDealer?.BOLText6?.trim() : "");
      setMiscellaneous7(miscellaneousDealer?.BOLText7 != null ? miscellaneousDealer?.BOLText7?.trim() : "");
    }

    if (miscellaneousDealer?.bolTextDirections) {
      setDirections1(miscellaneousDealer?.bolTextDirections[0]?.trim());
      setDirections2(miscellaneousDealer?.bolTextDirections[1]?.trim());
      setDirections3(miscellaneousDealer?.bolTextDirections[2]?.trim());
      setDirections4(miscellaneousDealer?.bolTextDirections[3]?.trim());
      setDirections5(miscellaneousDealer?.bolTextDirections[4]?.trim());
      setDirections6(miscellaneousDealer?.bolTextDirections[5]?.trim());
      setDirections7(miscellaneousDealer?.bolTextDirections[6]?.trim());
    } else {
      setDirections1(
        miscellaneousDealer?.Directions1 != null ? miscellaneousDealer?.Directions1?.trim() : ""
      );
      setDirections2(
        miscellaneousDealer?.Directions2 != null ? miscellaneousDealer?.Directions2?.trim() : ""
      );
      setDirections3(
        miscellaneousDealer?.Directions3 != null ? miscellaneousDealer?.Directions3?.trim() : ""
      );
      setDirections4(
        miscellaneousDealer?.Directions4 != null ? miscellaneousDealer?.Directions4?.trim() : ""
      );
      setDirections5(
        miscellaneousDealer?.Directions5 != null ? miscellaneousDealer?.Directions5?.trim() : ""
      );
      setDirections6(
        miscellaneousDealer?.Directions6 != null ? miscellaneousDealer?.Directions6?.trim() : ""
      );
      setDirections7(
        miscellaneousDealer?.Directions7 != null ? miscellaneousDealer?.Directions7?.trim() : ""
      );
    }
    setdriverEmailDir(
      miscellaneousDealer?.Directions?.trim() || miscellaneousDealer?.directions?.trim() || ""
    );
    //Col-3

    if (miscellaneousDealer?.bolTextMiscellaneous) {
      setOtherText1(miscellaneousDealer?.bolTextMiscellaneous[0]?.trim());
      setOtherText2(miscellaneousDealer?.bolTextMiscellaneous[1]?.trim());
      setOtherText3(miscellaneousDealer?.bolTextMiscellaneous[2]?.trim());
    } else {
      setOtherText1(miscellaneousDealer?.OtherText1 != null ? miscellaneousDealer?.OtherText1?.trim() : "");
      setOtherText2(miscellaneousDealer?.OtherText2 != null ? miscellaneousDealer?.OtherText2?.trim() : "");
      setOtherText3(miscellaneousDealer?.OtherText3 != null ? miscellaneousDealer?.OtherText3?.trim() : "");
    }

    if (miscellaneousDealer?.bolTextWashInstructions) {
      setWashInstructions1(miscellaneousDealer?.bolTextWashInstructions[0]?.trim());
      setWashInstructions2(miscellaneousDealer?.bolTextWashInstructions[1]?.trim());
      setWashInstructions3(miscellaneousDealer?.bolTextWashInstructions[2]?.trim());
      setWashInstructions4(miscellaneousDealer?.bolTextWashInstructions[3]?.trim());
      setWashInstructions5(miscellaneousDealer?.bolTextWashInstructions[4]?.trim());
    } else {
      setWashInstructions1(
        miscellaneousDealer?.WashInstructions1 != null ? miscellaneousDealer?.WashInstructions1?.trim() : ""
      );
      setWashInstructions2(
        miscellaneousDealer?.WashInstructions2 != null ? miscellaneousDealer?.WashInstructions2?.trim() : ""
      );
      setWashInstructions3(
        miscellaneousDealer?.WashInstructions3 != null ? miscellaneousDealer?.WashInstructions3?.trim() : ""
      );
      setWashInstructions4(
        miscellaneousDealer?.WashInstructions4 != null ? miscellaneousDealer?.WashInstructions4?.trim() : ""
      );
      setWashInstructions5(
        miscellaneousDealer?.WashInstructions5 != null ? miscellaneousDealer?.WashInstructions5?.trim() : ""
      );
    }
    setWashInstructions(
      miscellaneousDealer?.WashInstructions?.trim() || miscellaneousDealer?.washInstructions?.trim() || ""
    );

    initialValue[0].city = miscellaneousDealer?.City?.trim() || miscellaneousDealer?.city?.trim() || "";
    initialValue[0].statecode =
      miscellaneousDealer?.statecode?.trim() || miscellaneousDealer?.stateCode?.trim() || "";
    initialValue[0].postalcode =
      miscellaneousDealer?.Postalcode?.trim() || miscellaneousDealer?.postalCode?.trim() || "";
    setPostalValues(initialValue);
    setPostalCodePK(miscellaneousDealer?.PostalCodePK || miscellaneousDealer?.postalcodePK || postalCodePK);
  };

  useEffect(() => {
    generalMiscDelFormData();
  }, [
    miscname,
    addr1,
    addr2,
    city,
    statecode,
    postalcode,
    canadian,
    postalCodePK,
    phone,
    email,
    contact,
    contactphone,
    openSunday,
    openMonday,
    openTuesday,
    openWed,
    openThurs,
    openFri,
    openSat,
    driverEmailHrs,
    driverEmailDir,
    hours1,
    hours2,
    hours3,
    bolTextHoursInputValues,
    directions1,
    directions2,
    directions3,
    directions4,
    directions5,
    directions6,
    directions7,
    bolTextDirectionsInputValues,
    //Col-3
    otherText1,
    otherText2,
    otherText3,
    bolTexMiscellaneousInputValues,
    washInstructions1,
    washInstructions2,
    washInstructions3,
    washInstructions4,
    washInstructions5,
    miscellaneous1,
    miscellaneous2,
    miscellaneous3,
    miscellaneous4,
    miscellaneous5,
    miscellaneous6,
    miscellaneous7,
    bolTextWashInstructions,
    washInstructions,
  ]);

  useEffect(() => {
    if (!miscellaneousDealer) {
      setMiscDelValues(null);
    }
  }, [miscellaneousDealer]);

  useEffect(() => {
    setMiscDelValues(miscDeliveryDetails);
  }, []);

  const handleMiscDealerSelection = () => {
    dispatch(resetSearchSettings());
    dispatch(setMiscDeliveryDealerSelection(true));
    dispatch(resetSearchSettings());
  };

  /**
   * used for Misc Dealer selection Lookup - onClose
   */
  const miscDealerModalHide = () => {
    dispatch(setMiscDeliveryDealerSelection(false));
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
          setMiscellaneousDealer(data);
          setMiscDelValues(data);
          setPostalCodePK(data?.PostalCodePK);
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

  // edit/paste data passes to back end as array - BOL Text Hours
  useEffect(() => {
    const backendValues = [hours1, hours2, hours3];
    setBolTextHoursInputValues(backendValues);
  }, [hours1, hours2, hours3, miscellaneousDealer]);

  // edit/paste data passes to back end as array - BOL Text Directions
  useEffect(() => {
    const backendValues = [
      directions1,
      directions2,
      directions3,
      directions4,
      directions5,
      directions6,
      directions7,
    ];
    setBolTextDirectionsInputValues(backendValues);
  }, [
    directions1,
    directions2,
    directions3,
    directions4,
    directions5,
    directions6,
    directions7,
    miscellaneousDealer,
  ]);

  // edit/paste data passes to back end as array - BOL Text Miscellaneous
  useEffect(() => {
    const backendValues = [
      miscellaneous1,
      miscellaneous2,
      miscellaneous3,
      miscellaneous4,
      miscellaneous5,
      miscellaneous6,
      miscellaneous7,
    ];
    setBolTexMiscellaneousInputValues(backendValues);
  }, [
    miscellaneous1,
    miscellaneous2,
    miscellaneous3,
    miscellaneous4,
    miscellaneous5,
    miscellaneous6,
    miscellaneous7,
    miscellaneousDealer,
  ]);

  useEffect(() => {
    const backendValues = [otherText1, otherText2, otherText3];
    setBolTexOtherInputValues(backendValues);
  }, [otherText1, otherText2, otherText3, miscellaneousDealer]);

  // edit/paste data passes to back end as array - BOL Text Wash Instructions
  useEffect(() => {
    const backendValues = [
      washInstructions1,
      washInstructions2,
      washInstructions3,
      washInstructions4,
      washInstructions5,
    ];
    setBolTextWashInstructions(backendValues);
  }, [
    washInstructions1,
    washInstructions2,
    washInstructions3,
    washInstructions4,
    washInstructions5,
    miscellaneousDealer,
  ]);

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const contactPhoneFormatHandler = (e) => {
    const formattedContactPhoneNumber = formatPhoneNumber(e.target.value);
    setcontactphone(formattedContactPhoneNumber);
  };

  const validationSchema = yup.object({
    miscname: yup.string().required(),
    addr1: yup.string().required(),
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
    contact: yup.string().required(),
    phone: yup.string().matches(phoneRegex).required(),
    email: yup.string().matches(emailRegex),

    contactphone: yup.string().matches(phoneRegex).required(),
  });
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
        name: true,
        address1: true,
        city: true,
        statecode: true,
        postalcode: true,
        canadian: false,
        contact: true,
        phone: true,
        contactPhone: true,
      }}
    >
      {(formik) => (
        <div className="p-2">
          <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight">
            <Row className="m-0 p-10">
              <Col xs={6}>
                <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0 ">
                    <Form.Label className="col-form-label dealer-label">
                      {" "}
                      Miscellaneous Delivery Dealer
                    </Form.Label>
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 ">
                    <Form.Label className="col-form-label dealer-label"> </Form.Label>
                  </Col>
                  <Col xs={6} sm={6} md={6} className="p-0 ">
                    <button
                      className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 d-flex"
                      type="button"
                      name="miscCustomerSelection"
                      id="miscCustomerSelection"
                      onClick={handleMiscDealerSelection}
                    >
                      Miscellaneous Dealer Selection
                    </button>
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className={`col-form-label dealer-label`}>
                      Name
                    </Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="p-0">
                    <input
                      className={`customFormControl  ${
                        formik.errors.name === undefined && miscname?.length >= 1
                          ? "borderGreen"
                          : "borderRed"
                      }`}
                      id="name"
                      name="name"
                      type="text"
                      value={miscname}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        formik.handleChange(e);
                        setMiscname(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="address1" className={`col-form-label  dealer-label`}>
                      Address
                    </Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="p-0">
                    <input
                      className={`customFormControl  ${
                        formik.errors.address1 === undefined && addr1?.length >= 1
                          ? "borderGreen"
                          : "borderRed"
                      }`}
                      id="ad1"
                      name="ad1"
                      value={addr1}
                      type="text"
                      maxLength={30}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        formik.handleChange(e);
                        setAddr1(e.target.value);
                      }}
                      style={{
                        borderColor:
                          formik.errors.address1 === undefined && addr1?.length >= 1 ? "green" : "red",
                      }}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 mb-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="address2" className={`col-form-label  dealer-label`}></Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="p-0">
                    <input
                      className={`customFormControl `}
                      id="ad2"
                      name="ad2"
                      type="text"
                      value={addr2}
                      maxLength={30}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onInput={(e) => setAddr2(e.target.value)}
                      spellCheck={false}
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

                {/* Phone */}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={` col-form-label  dealer-label`}>Phone</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      className={`customFormControl  ${
                        phone !== "" && phone?.length === 14 ? "borderGreen" : "borderRed"
                      }`}
                      control="input"
                      name="phone"
                      value={phone}
                      maxLength={14}
                      onChange={(e) => phoneFormatHandler(e)}
                      autoComplete="off"
                      onInput={(e) => {
                        formik.handleChange(e);
                        setPhone(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      style={{
                        borderColor:
                          formik.errors.phone === undefined && phone != null && phone?.length >= 1
                            ? "green"
                            : formik.errors.phone !== undefined
                              ? "red"
                              : "",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={` col-form-label  dealer-label`}>Email</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <input
                      className={`customFormControl  ${
                        formik.errors.email === undefined && email != null && email?.length >= 1
                          ? ""
                          : formik.errors.email !== undefined
                            ? "borderRed"
                            : ""
                      }`}
                      type="email"
                      name="email"
                      maxLength={70}
                      autoComplete="off"
                      value={email}
                      onInput={(e) => {
                        formik.handleChange(e);
                        setemail(e.target.value);
                      }}
                      //aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>

                {/* Contact */}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={` col-form-label  dealer-label`}>Contact</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <input
                      className={`customFormControl  ${
                        formik.errors.contact === undefined && contact?.length >= 1
                          ? "borderGreen"
                          : "borderRed"
                      }`}
                      id="contact"
                      name="contact"
                      type="text"
                      value={contact}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        formik.handleChange(e);
                        setcontact(e.target.value);
                      }}
                      style={{
                        borderColor:
                          formik.errors.contact === undefined && contact?.length >= 1 ? "green" : "red",
                      }}
                    />
                  </Col>
                </Form.Group>

                {/* Contact Phone */}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={` col-form-label  dealer-label`}>Contact Phone</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      className={`customFormControl  ${
                        contactphone !== "" && contactphone?.length === 14 ? "borderGreen" : "borderRed"
                      }`}
                      id="contactPhone"
                      name="contactPhone"
                      type="text"
                      value={contactphone}
                      maxLength={14}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => contactPhoneFormatHandler(e)}
                      onInput={(e) => setcontactphone(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0">
                  <Col sm={12} md={12} xs={12} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> BOL Text - Miscellaneous</Form.Label>
                  </Col>
                  <Col sm={10} xs={10}>
                    <DynamicTextFields
                      numFields={7}
                      maxCharLimit={42}
                      inputValues={bolTexMiscellaneousInputValues}
                      setInputValues={setBolTexMiscellaneousInputValues}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0">
                  <Col sm={12} md={12} xs={12} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> BOL Text - Directions</Form.Label>
                  </Col>
                  <Col sm={10} xs={10}>
                    <DynamicTextFields
                      numFields={7}
                      maxCharLimit={42}
                      inputValues={bolTextDirectionsInputValues}
                      setInputValues={setBolTextDirectionsInputValues}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col xs={3}>
                <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0">
                  <Col sm={12} md={12} xs={12} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> BOL Text - Hours</Form.Label>
                  </Col>

                  <Col sm={10} xs={10}>
                    <DynamicTextFields
                      numFields={3}
                      maxCharLimit={42}
                      inputValues={bolTextHoursInputValues}
                      setInputValues={setBolTextHoursInputValues}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0">
                  <Col sm={12} md={12} xs={12} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> BOL Text - Others</Form.Label>
                  </Col>

                  <Col sm={10} xs={10}>
                    <DynamicTextFields
                      numFields={3}
                      maxCharLimit={42}
                      inputValues={bolTexOtherInputValues}
                      setInputValues={setBolTexOtherInputValues}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0">
                  <Col sm={12} md={12} xs={12} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {" "}
                      BOL Text - Wash Instructions
                    </Form.Label>
                  </Col>
                  <Col sm={10} xs={10}>
                    <DynamicTextFields
                      numFields={5}
                      maxCharLimit={42}
                      inputValues={bolTextWashInstructions}
                      setInputValues={setBolTextWashInstructions}
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
                          className={`form-check-input p-0 ${openSat || openFri || openThurs || openWed || openTuesday || openMonday || openSunday ? "" : "borderRed"}`}
                          value={openSunday}
                          checked={openSunday}
                          onChange={(e) => setopenSunday(e.target.checked)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0 w-145px">
                        <Form.Label className="col-form-label dealer-label">Open Monday</Form.Label>
                      </Col>

                      <Col xs={2} md={2} sm={2} className="p-0">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${openSat || openFri || openThurs || openWed || openTuesday || openMonday || openSunday ? "" : "borderRed"}`}
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
                          className={`form-check-input p-0 ${openSat || openFri || openThurs || openWed || openTuesday || openMonday || openSunday ? "" : "borderRed"}`}
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
                          className={`form-check-input p-0 ${openSat || openFri || openThurs || openWed || openTuesday || openMonday || openSunday ? "" : "borderRed"}`}
                          value={openWed}
                          checked={openWed}
                          onChange={(e) => setopenWed(e.target.checked)}
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
                          className={`form-check-input p-0 ${openSat || openFri || openThurs || openWed || openTuesday || openMonday || openSunday ? "" : "borderRed"}`}
                          value={openThurs}
                          checked={openThurs}
                          onChange={(e) => setopenThurs(e.target.checked)}
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
                          className={`form-check-input p-0 ${openSat || openFri || openThurs || openWed || openTuesday || openMonday || openSunday ? "" : "borderRed"}`}
                          value={openFri}
                          checked={openFri}
                          onChange={(e) => setopenFri(e.target.checked)}
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
                          className={`form-check-input p-0 ${openSat || openFri || openThurs || openWed || openTuesday || openMonday || openSunday ? "" : "borderRed"}`}
                          value={openSat}
                          checked={openSat}
                          onChange={(e) => setopenSat(e.target.checked)}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Col>

                <Col sm={3} md={3} xs={3} className="ps-lg-0 h-156px">
                  <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0 h-156px">
                    <Col sm={12} md={12} xs={12} className="p-0">
                      <label className="col-form-label dealer-label p-0 m-b-20">Drivers Email - Hours</label>
                    </Col>
                    <Col sm={12} md={12} xs={12} className="p-0">
                      <textarea
                        rows={8}
                        cols={20}
                        type="text"
                        autoComplete="off"
                        aria-autocomplete="list"
                        className="customFormControl h-100"
                        id="hours"
                        name="hours"
                        value={driverEmailHrs}
                        onInput={(e) => setdriverEmailHrs(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col sm={3} md={3} xs={3} className="ps-lg-0 h-156px">
                  <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0 h-156px">
                    <Col sm={12} md={12} xs={12} className="p-0">
                      <label className="col-form-label dealer-label p-0 m-b-20">
                        Drivers Email- Directions
                      </label>
                    </Col>
                    <Col sm={12} md={12} xs={12} className="p-0">
                      <textarea
                        rows={8}
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
                <Col sm={3} md={3} xs={3} className="ps-lg-0 h-156px">
                  <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0 h-156px">
                    <Col sm={12} md={12} xs={12} className="p-0">
                      <label className="col-form-label dealer-label p-0 m-b-20">
                        Drivers Email- Wash Instructions
                      </label>
                    </Col>
                    <Col sm={12} md={12} xs={12} className="p-0">
                      <textarea
                        rows={8}
                        cols={20}
                        type="text"
                        className="customFormControl h-100 "
                        id="directions"
                        name="directions"
                        value={washInstructions}
                        onInput={(e) => setWashInstructions(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </Row>
          </div>
          {/* MiscCustomer Lookup Modal */}

          {loading && <LoadingIcon />}
          <MiscDealerLookup
            show={miscDealerSelection}
            onHide={miscDealerModalHide}
            undispatch
            companyFK={data?.CompanyId || 0}
          />
        </div>
      )}
    </Formik>
  );
};

export default DeliveryContent;
