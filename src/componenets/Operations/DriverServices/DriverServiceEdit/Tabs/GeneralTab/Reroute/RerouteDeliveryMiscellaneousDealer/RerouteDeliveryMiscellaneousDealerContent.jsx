import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import styles from "../../../../../../../../styles/QuarterScreen.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DynamicTextFields from "../../../../../../../common/AutoWrapTextFields/DynamicTextFields";
import {
  resetSearchSettings,
  setPageNumber,
  setSelectedId,
} from "../../../../../../../../redux/LookupScreens/MiscDealerLookupSlice";
import {
  setDriverFlatrate,
  setDriverMiles,
  setHasChangedDeliveryMiscDealerStateCode,
  setInvoiceFlatrate,
  setInvoiceMiles,
  setIsDriverFlatrateVisible,
  setIsInvoiceFlatrateVisible,
  setIsMiscDeliveryDealerValid,
  setMiscDeliveryID,
  setSelectedNewDeliveryMiscellneousDealerData,
  setUpdatedDeliveryMiscDealerData,
} from "../../../../../../../../redux/RerouteSlice";
import MiscDealerLookup from "../../../../../../../LookupScreens/MiscDealer/MiscDealerLookup";
import RerouteService from "../../../../../../../../services/RerouteService";
import { Formik } from "formik";
import * as yup from "yup";
import { emailRegex } from "../../../../../../../../utils/validation/EmailRegex";
import { formatPhoneNumber } from "../../../../../../../../utils/validation/Phonevalidation";
import PostalCodeComponent from "../../../../../../../common/PostalCodeComponent";
import LoadingIcon from "../../../../../../../common/LoadingIcon";

function RerouteDeliveryMiscellaneousDealerContent() {
  const dispatch = useDispatch();
  const [dealerName, setDealerName] = useState("");
  const [dealerAddress1, setDealerAddress1] = useState("");
  const [dealerAddress2, setDealerAddress2] = useState("");
  const [dealerCity, setDealerCity] = useState("");
  const [dealerStateCode, setDealerStateCode] = useState("");
  const [dealerPostalCode, setDealerPostalCode] = useState("");
  const [dealerPhone, setDealerPhone] = useState("");
  const [dealerContact, setDealerContact] = useState("");
  const [dealerContactPhone, setDealerContactPhone] = useState("");
  const [dealerEmail, setDealerEmail] = useState("");
  const [openSunday, setOpenSunday] = useState(false);
  const [openMonday, setOpenMonday] = useState(false);
  const [openTuesday, setOpenTuesday] = useState(false);
  const [openWednesday, setOpenWednesday] = useState(false);
  const [openThursday, setOpenThursday] = useState(false);
  const [openFriday, setOpenFriday] = useState(false);
  const [openSaturday, setOpenSaturday] = useState(false);
  const [hours, setHours] = useState("");
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
  const [bolText1, setBolText1] = useState("");
  const [bolText2, setBolText2] = useState("");
  const [bolText3, setBolText3] = useState("");
  const [bolText4, setBolText4] = useState("");
  const [bolText5, setBolText5] = useState("");
  const [bolText6, setBolText6] = useState("");
  const [bolText7, setBolText7] = useState("");
  const [otherText1, setOtherText1] = useState("");
  const [otherText2, setOtherText2] = useState("");
  const [otherText3, setOtherText3] = useState("");
  const [washInstructions1, setWashInstructions1] = useState("");
  const [washInstructions2, setWashInstructions2] = useState("");
  const [washInstructions3, setWashInstructions3] = useState("");
  const [washInstructions4, setWashInstructions4] = useState("");
  const [washInstructions5, setWashInstructions5] = useState("");
  const [bolTextHoursInputValues, setBolTextHoursInputValues] = useState(Array(3).fill(""));
  const [bolTextsOtherValues, setBolTextOtherInputValues] = useState(Array(3).fill(""));
  const [bolTextDirectionsInputValues, setBolTextDirectionsInputValues] = useState(Array(7).fill(""));
  const [bolTexMiscellaneousInputValues, setBolTexMiscellaneousInputValues] = useState(Array(7).fill(""));
  const [bolTextWashInstructions, setBolTextWashInstructions] = useState(Array(5).fill(""));
  const [driverEmailDirections, setDriverEmailDirections] = useState("");
  const [driverEmailWashInstructions, setDriverEmailWashInstructions] = useState("");
  const updatedDeliveryMiscDealerData = useSelector(
    (state) => state.rerouteReducer.updatedDeliveryMiscDealerData
  );
  const [loading, setLoading] = useState(false);
  const [canadian, setCanadian] = useState(false);
  const [postalCodePK, setPostalCodePK] = useState(null);
  const initialValue = [{ city: "", statecode: "", postalcode: "", canadian: false }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  const currentDeliveryMiscellaneousDealerData = useSelector(
    (state) => state.rerouteReducer.currentDeliveryMiscellaneousDealerData
  );
  const selectedUnitInfo = useSelector((state) => state.rerouteReducer.selectedUnitInfo);
  const selectedNewDeliveryMiscellneousDealerData = useSelector(
    (state) => state.rerouteReducer.selectedNewDeliveryMiscellneousDealerData
  );
  const deliveryUnitAddressFK = useSelector((state) => state.rerouteReducer.deliveryUnitAddressFK);
  //Local State Declaration
  const [deliveryMiscellaneousDealerLookupShow, setDeliveryMiscellaneousDealerLookupShow] = useState(false);
  const [selectedMiscDealer, setSelectedMiscDealer] = useState(false);
  const miscDeliveryID = useSelector((state) => state.rerouteReducer.miscDeliveryID);
  const companyId = useSelector((state) => state.rerouteReducer.companyId);

  const handleDeliveryMiscellaneousDealerSelection = (dealer) => {
    if (Number(miscDeliveryID) !== Number(dealer.unitAddressPK)) {
      dispatch(setInvoiceFlatrate(0));
      dispatch(setDriverFlatrate(0));
    }

    dispatch(setInvoiceMiles(0));
    dispatch(setDriverMiles(0));
    dispatch(setMiscDeliveryID(dealer.unitAddressPK));
    setSelectedMiscDealer(true);
    setDeliveryMiscellaneousDealerLookupShow(false);
  };

  //Get Miscellaneous Dealer By Id
  const fetchMiscellaneousDealerById = (id, companyId) => {
    if (id) {
      setLoading(true);
      RerouteService.fetchMiscellaneousDealerById(id, companyId)
        .then((response) => {
          const data = response.data;
          setHours(data[0].Hours?.trim() || "");
          setHours1(data[0].Hours1?.trim() || "");
          setHours2(data[0].Hours2?.trim() || "");
          setHours3(data[0].hours3?.trim() || "");
          setDirections1(data[0].Directions1?.trim() || "");
          setDirections2(data[0].Directions2?.trim() || "");
          setDirections3(data[0].Directions3?.trim() || "");
          setDirections4(data[0].Directions4?.trim() || "");
          setDirections5(data[0].Directions5?.trim() || "");
          setDirections6(data[0].Directions6?.trim() || "");
          setDirections7(data[0].Directions7?.trim() || "");
          //Col-3
          setOtherText1(data[0].OtherText1?.trim() || "");
          setOtherText2(data[0].OtherText2?.trim() || "");
          setOtherText3(data[0].OtherText3?.trim() || "");
          setWashInstructions1(data[0].WashInstructions1?.trim() || "");
          setWashInstructions2(data[0].WashInstructions2?.trim() || "");
          setWashInstructions3(data[0].WashInstructions3?.trim() || "");
          setWashInstructions4(data[0].WashInstructions4?.trim() || "");
          setWashInstructions5(data[0].WashInstructions5?.trim() || "");
          setDriverEmailDirections(data[0].Directions?.trim() || "");
          setDealerName(data[0].Name?.trim() || "");
          setDealerAddress1(data[0].Address1?.trim() || "");
          setDealerAddress2(data[0].Address2?.trim() || "");
          setDealerCity(data[0].City?.trim() || "");
          setDealerStateCode(data[0].StateCode?.trim() || "");
          setDealerPostalCode(data[0].PostalCode?.trim() || "");
          setDealerPhone(formatPhoneNumber(data[0].Phone?.trim()) || "");
          setDealerEmail(data[0].Email?.trim() || "");
          setDealerContact(data[0].DeliveryContact?.trim() || "");
          setDealerContactPhone(formatPhoneNumber(data[0].DeliveryContactPhone?.trim()) || "");
          setOpenSunday(data[0].OpenSunday || false);
          setOpenMonday(data[0].OpenMonday || false);
          setOpenTuesday(data[0].OpenTuesday || false);
          setOpenWednesday(data[0].OpenWednesday || false);
          setOpenThursday(data[0].OpenThursday || false);
          setOpenFriday(data[0].OpenFriday || false);
          setOpenSaturday(data[0].OpenSaturday || false);
          setDriverEmailDirections(data[0].Directions?.trim() || "");
          setDriverEmailWashInstructions(data[0].WashInstructions?.trim() || "");
          setBolText1(data[0].BOLText1);
          setBolText2(data[0].BOLText2);
          setBolText3(data[0].BOLText3);
          setBolText4(data[0].BOLText4);
          setBolText5(data[0].BOLText5);
          setBolText6(data[0].BOLText6);
          setBolText7(data[0].BOLText7);
          setPostalCodePK(data[0].PostalCodePK);
          dispatch(setSelectedNewDeliveryMiscellneousDealerData(data[0]));
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (
      selectedUnitInfo?.deliveryUnitAddressFK &&
      updatedDeliveryMiscDealerData &&
      selectedUnitInfo?.deliveryStateCode !== updatedDeliveryMiscDealerData?.stateCode
    ) {
      dispatch(setInvoiceMiles(0));
      dispatch(setDriverMiles(0));
      dispatch(setHasChangedDeliveryMiscDealerStateCode(true));
    } else {
      dispatch(setHasChangedDeliveryMiscDealerStateCode(false));
    }
  }, [updatedDeliveryMiscDealerData?.stateCode]);

  useEffect(() => {
    if (!updatedDeliveryMiscDealerData) {
      setHours(currentDeliveryMiscellaneousDealerData?.Hours?.trim() || "");
      setHours1(currentDeliveryMiscellaneousDealerData?.Hours1?.trim() || "");
      setHours2(currentDeliveryMiscellaneousDealerData?.Hours2?.trim() || "");
      setHours3(currentDeliveryMiscellaneousDealerData?.Hours3?.trim() || "");
      setDirections1(currentDeliveryMiscellaneousDealerData?.Directions1?.trim() || "");
      setDirections2(currentDeliveryMiscellaneousDealerData?.Directions2?.trim() || "");
      setDirections3(currentDeliveryMiscellaneousDealerData?.Directions3?.trim() || "");
      setDirections4(currentDeliveryMiscellaneousDealerData?.Directions4?.trim() || "");
      setDirections5(currentDeliveryMiscellaneousDealerData?.Directions5?.trim() || "");
      setDirections6(currentDeliveryMiscellaneousDealerData?.Directions6?.trim() || "");
      setDirections7(currentDeliveryMiscellaneousDealerData?.Directions7?.trim() || "");
      setBolText1(currentDeliveryMiscellaneousDealerData?.BOLText1?.trim() || "");
      setBolText2(currentDeliveryMiscellaneousDealerData?.BOLText2?.trim() || "");
      setBolText3(currentDeliveryMiscellaneousDealerData?.BOLText3?.trim() || "");
      setBolText4(currentDeliveryMiscellaneousDealerData?.BOLText4?.trim() || "");
      setBolText5(currentDeliveryMiscellaneousDealerData?.BOLText5?.trim() || "");
      setBolText6(currentDeliveryMiscellaneousDealerData?.BOLText6?.trim() || "");
      setBolText7(currentDeliveryMiscellaneousDealerData?.BOLText7?.trim() || "");
      //Col-3
      setOtherText1(currentDeliveryMiscellaneousDealerData?.OtherText1?.trim() || "");
      setOtherText2(currentDeliveryMiscellaneousDealerData?.OtherText2?.trim() || "");
      setOtherText3(currentDeliveryMiscellaneousDealerData?.OtherText3?.trim() || "");
      setWashInstructions1(currentDeliveryMiscellaneousDealerData?.WashInstructions1?.trim() || "");
      setWashInstructions2(currentDeliveryMiscellaneousDealerData?.WashInstructions2?.trim() || "");
      setWashInstructions3(currentDeliveryMiscellaneousDealerData?.WashInstructions3?.trim() || "");
      setWashInstructions4(currentDeliveryMiscellaneousDealerData?.WashInstructions4?.trim() || "");
      setWashInstructions5(currentDeliveryMiscellaneousDealerData?.WashInstructions5?.trim() || "");
      setDriverEmailDirections(currentDeliveryMiscellaneousDealerData?.Directions?.trim() || "");
      setDealerName(currentDeliveryMiscellaneousDealerData.Name?.trim() || "");
      setDealerAddress1(currentDeliveryMiscellaneousDealerData.Address1?.trim() || "");
      setDealerAddress2(currentDeliveryMiscellaneousDealerData.Address2?.trim() || "");
      setDealerCity(currentDeliveryMiscellaneousDealerData.City?.trim() || "");
      setDealerStateCode(currentDeliveryMiscellaneousDealerData.StateCode?.trim() || "");
      setDealerPostalCode(currentDeliveryMiscellaneousDealerData.PostalCode?.trim() || "");
      setDealerPhone(formatPhoneNumber(currentDeliveryMiscellaneousDealerData.Phone?.trim()) || "");
      setDealerEmail(currentDeliveryMiscellaneousDealerData.Email?.trim() || "");
      setDealerContact(currentDeliveryMiscellaneousDealerData.DeliveryContact?.trim() || "");

      setDealerContactPhone(
        formatPhoneNumber(currentDeliveryMiscellaneousDealerData.DeliveryContactPhone?.trim()) || ""
      );
      setOpenSunday(currentDeliveryMiscellaneousDealerData.OpenSunday || false);
      setOpenMonday(currentDeliveryMiscellaneousDealerData.OpenMonday || false);
      setOpenTuesday(currentDeliveryMiscellaneousDealerData.OpenTuesday || false);
      setOpenWednesday(currentDeliveryMiscellaneousDealerData.OpenWednesday || false);
      setOpenThursday(currentDeliveryMiscellaneousDealerData.OpenThursday || false);
      setOpenFriday(currentDeliveryMiscellaneousDealerData.OpenFriday || false);
      setOpenSaturday(currentDeliveryMiscellaneousDealerData.OpenSaturday || false);
      setDriverEmailDirections(currentDeliveryMiscellaneousDealerData.Directions?.trim() || "");
      setDriverEmailWashInstructions(currentDeliveryMiscellaneousDealerData.WashInstructions?.trim() || "");
      setPostalCodePK(currentDeliveryMiscellaneousDealerData.PostalCodePK);
    } else {
      setHours(updatedDeliveryMiscDealerData?.hours?.trim() || "");
      setHours1(updatedDeliveryMiscDealerData?.hours1?.trim() || "");
      setHours2(updatedDeliveryMiscDealerData?.hours2?.trim() || "");
      setHours3(updatedDeliveryMiscDealerData?.hours3?.trim() || "");
      setDirections1(updatedDeliveryMiscDealerData?.directions1?.trim() || "");
      setDirections2(updatedDeliveryMiscDealerData?.directions2?.trim() || "");
      setDirections3(updatedDeliveryMiscDealerData?.directions3?.trim() || "");
      setDirections4(updatedDeliveryMiscDealerData?.directions4?.trim() || "");
      setDirections5(updatedDeliveryMiscDealerData?.directions5?.trim() || "");
      setDirections6(updatedDeliveryMiscDealerData?.directions6?.trim() || "");
      setDirections7(updatedDeliveryMiscDealerData?.directions7?.trim() || "");
      setBolText1(updatedDeliveryMiscDealerData?.bolText1?.trim() || "");
      setBolText2(updatedDeliveryMiscDealerData?.bolText2?.trim() || "");
      setBolText3(updatedDeliveryMiscDealerData?.bolText3?.trim() || "");
      setBolText4(updatedDeliveryMiscDealerData?.bolText4?.trim() || "");
      setBolText5(updatedDeliveryMiscDealerData?.bolText5?.trim() || "");
      setBolText6(updatedDeliveryMiscDealerData?.bolText6?.trim() || "");
      setBolText7(updatedDeliveryMiscDealerData?.bolText7?.trim() || "");
      //Col-3
      setOtherText1(updatedDeliveryMiscDealerData?.otherText1?.trim() || "");
      setOtherText2(updatedDeliveryMiscDealerData?.otherText2?.trim() || "");
      setOtherText3(updatedDeliveryMiscDealerData?.otherText3?.trim() || "");
      setWashInstructions1(updatedDeliveryMiscDealerData?.washInstructions1?.trim() || "");
      setWashInstructions2(updatedDeliveryMiscDealerData?.washInstructions2?.trim() || "");
      setWashInstructions3(updatedDeliveryMiscDealerData?.washInstructions3?.trim() || "");
      setWashInstructions4(updatedDeliveryMiscDealerData?.washInstructions4?.trim() || "");
      setWashInstructions5(updatedDeliveryMiscDealerData?.washInstructions5?.trim() || "");
      setDriverEmailDirections(updatedDeliveryMiscDealerData?.directions?.trim() || "");
      setDealerName(updatedDeliveryMiscDealerData.name?.trim() || "");
      setDealerAddress1(updatedDeliveryMiscDealerData.address1?.trim() || "");
      setDealerAddress2(updatedDeliveryMiscDealerData.address2?.trim() || "");
      setDealerCity(updatedDeliveryMiscDealerData.city?.trim() || "");
      setDealerStateCode(updatedDeliveryMiscDealerData.stateCode?.trim() || "");
      setDealerPostalCode(updatedDeliveryMiscDealerData.postalCode?.trim() || "");
      setDealerPhone(formatPhoneNumber(updatedDeliveryMiscDealerData.phone?.trim()) || "");
      setDealerEmail(updatedDeliveryMiscDealerData.email?.trim() || "");
      setDealerContact(updatedDeliveryMiscDealerData.deliveryContact?.trim() || "");

      setDealerContactPhone(
        formatPhoneNumber(updatedDeliveryMiscDealerData.deliveryContactPhone?.trim()) || ""
      );
      setOpenSunday(updatedDeliveryMiscDealerData.openSunday || false);
      setOpenMonday(updatedDeliveryMiscDealerData.openMonday || false);
      setOpenTuesday(updatedDeliveryMiscDealerData.openTuesday || false);
      setOpenWednesday(updatedDeliveryMiscDealerData.openWednesday || false);
      setOpenThursday(updatedDeliveryMiscDealerData.openThursday || false);
      setOpenFriday(updatedDeliveryMiscDealerData.openFriday || false);
      setOpenSaturday(updatedDeliveryMiscDealerData.openSaturday || false);
      setDriverEmailDirections(updatedDeliveryMiscDealerData.directions?.trim() || "");
      setDriverEmailWashInstructions(updatedDeliveryMiscDealerData.washInstructions?.trim() || "");
      setPostalCodePK(updatedDeliveryMiscDealerData.postalCodePK);
    }
  }, []);
  //Useeffect - service to get miscellaneous dealer by id
  useEffect(() => {
    let id = miscDeliveryID ? miscDeliveryID : deliveryUnitAddressFK;
    // will remove this conditon after testing
    if (miscDeliveryID && (!updatedDeliveryMiscDealerData || selectedMiscDealer)) {
      fetchMiscellaneousDealerById(miscDeliveryID, companyId);
    }
  }, [miscDeliveryID]);

  useEffect(() => {
    const backendValues = [hours1, hours2, hours3];
    setBolTextHoursInputValues(backendValues);
  }, [hours1, hours2, hours3]);

  useEffect(() => {
    const backendValues = [
      bolText1 || "",
      bolText2 || "",
      bolText3 || "",
      bolText4 || "",
      bolText5 || "",
      bolText6 || "",
      bolText7 || "",
    ];
    setBolTexMiscellaneousInputValues(backendValues);
  }, [bolText1, bolText2, bolText3, bolText4, bolText5, bolText6, bolText7]);

  useEffect(() => {
    if (
      dealerName ||
      dealerAddress1 ||
      dealerAddress2 ||
      dealerCity ||
      dealerStateCode ||
      dealerPostalCode ||
      dealerPhone ||
      dealerEmail ||
      dealerContact ||
      dealerContactPhone ||
      openSunday ||
      openMonday ||
      openTuesday ||
      openWednesday ||
      openThursday ||
      openFriday ||
      openSaturday ||
      hours ||
      bolTextHoursInputValues.some((value) => value !== "") ||
      driverEmailDirections ||
      bolTextDirectionsInputValues.some((value) => value !== "") ||
      driverEmailWashInstructions ||
      bolTextWashInstructions.some((value) => value !== "") ||
      bolTextsOtherValues.some((value) => value !== "") ||
      postalCodePK
    ) {
      let updatedMiscDeliveryDealerData = {
        name: dealerName,
        address1: dealerAddress1,
        address2: dealerAddress2,
        city: dealerCity,
        stateCode: dealerStateCode,
        postalCode: dealerPostalCode,
        phone: dealerPhone,
        email: dealerEmail,
        deliveryContact: dealerContact,
        deliveryContactPhone: dealerContactPhone,
        openSunday: openSunday,
        openMonday: openMonday,
        openTuesday: openTuesday,
        openWednesday: openWednesday,
        openThursday: openThursday,
        openFriday: openFriday,
        openSaturday: openSaturday,
        bolText1: bolTexMiscellaneousInputValues[0] ? bolTexMiscellaneousInputValues[0] : "",
        bolText2: bolTexMiscellaneousInputValues[1] ? bolTexMiscellaneousInputValues[1] : "",
        bolText3: bolTexMiscellaneousInputValues[2] ? bolTexMiscellaneousInputValues[2] : "",
        bolText4: bolTexMiscellaneousInputValues[3] ? bolTexMiscellaneousInputValues[3] : "",
        bolText5: bolTexMiscellaneousInputValues[4] ? bolTexMiscellaneousInputValues[4] : "",
        bolText6: bolTexMiscellaneousInputValues[5] ? bolTexMiscellaneousInputValues[5] : "",
        bolText7: bolTexMiscellaneousInputValues[6] ? bolTexMiscellaneousInputValues[6] : "",
        hours1: bolTextHoursInputValues[0] ? bolTextHoursInputValues[0] : "",
        hours2: bolTextHoursInputValues[1] ? bolTextHoursInputValues[1] : "",
        hours3: bolTextHoursInputValues[2] ? bolTextHoursInputValues[2] : "",
        directions1: bolTextDirectionsInputValues[0] ? bolTextDirectionsInputValues[0] : "",
        directions2: bolTextDirectionsInputValues[1] ? bolTextDirectionsInputValues[1] : "",
        directions3: bolTextDirectionsInputValues[2] ? bolTextDirectionsInputValues[2] : "",
        directions4: bolTextDirectionsInputValues[3] ? bolTextDirectionsInputValues[3] : "",
        directions5: bolTextDirectionsInputValues[4] ? bolTextDirectionsInputValues[4] : "",
        directions6: bolTextDirectionsInputValues[5] ? bolTextDirectionsInputValues[5] : "",
        directions7: bolTextDirectionsInputValues[6] ? bolTextDirectionsInputValues[6] : "",
        washInstructions1: bolTextWashInstructions[0] ? bolTextWashInstructions[0] : "",
        washInstructions2: bolTextWashInstructions[1] ? bolTextWashInstructions[1] : "",
        washInstructions3: bolTextWashInstructions[2] ? bolTextWashInstructions[2] : "",
        washInstructions4: bolTextWashInstructions[3] ? bolTextWashInstructions[3] : "",
        washInstructions5: bolTextWashInstructions[4] ? bolTextWashInstructions[4] : "",
        otherText1: bolTextsOtherValues[0] ? bolTextsOtherValues[0] : "",
        otherText2: bolTextsOtherValues[1] ? bolTextsOtherValues[1] : "",
        otherText3: bolTextsOtherValues[2] ? bolTextsOtherValues[2] : "",
        directions: driverEmailDirections,
        washInstructions: driverEmailWashInstructions,
        postalCodePK: postalCodePK,
        canadian: canadian,
        hours: hours,
      };
      dispatch(setUpdatedDeliveryMiscDealerData(updatedMiscDeliveryDealerData));
    }
  }, [
    dealerName,
    dealerAddress1,
    dealerAddress2,
    dealerCity,
    dealerStateCode,
    dealerPostalCode,
    dealerPhone,
    dealerEmail,
    dealerContact,
    dealerContactPhone,
    openSunday,
    openMonday,
    openTuesday,
    openWednesday,
    openThursday,
    openFriday,
    openSaturday,
    bolTextHoursInputValues,
    bolTextDirectionsInputValues,
    bolTextWashInstructions,
    driverEmailDirections,
    driverEmailWashInstructions,
    postalCodePK,
    canadian,
    bolTexMiscellaneousInputValues,
    bolTextsOtherValues,
    hours,
  ]);

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
  }, [directions1, directions2, directions3, directions4, directions5, directions6, directions7]);

  useEffect(() => {
    const backendValues = [otherText1, otherText2, otherText3];
    setBolTextOtherInputValues(backendValues);
  }, [otherText1, otherText2, otherText3]);

  useEffect(() => {
    const backendValues = [
      washInstructions1,
      washInstructions2,
      washInstructions3,
      washInstructions4,
      washInstructions5,
    ];
    setBolTextWashInstructions(backendValues);
  }, [washInstructions1, washInstructions2, washInstructions3, washInstructions4, washInstructions5]);

  useEffect(() => {
    if (
      dealerName &&
      dealerAddress1 &&
      postalCodePK &&
      dealerPhone &&
      dealerPhone?.length === 14 &&
      (!dealerEmail || dealerEmail?.match(emailRegex)) &&
      dealerContact &&
      dealerContactPhone &&
      dealerContactPhone?.length === 14 &&
      (openSunday || openMonday || openTuesday || openWednesday || openThursday || openFriday || openSaturday)
    ) {
      dispatch(setIsMiscDeliveryDealerValid(true));
    } else {
      dispatch(setIsMiscDeliveryDealerValid(false));
    }
  }, [
    dealerName,
    dealerAddress1,
    postalCodePK,
    dealerPhone,
    dealerEmail,
    dealerContact,
    dealerContactPhone,
    openSunday,
    openMonday,
    openTuesday,
    openWednesday,
    openThursday,
    openFriday,
    openSaturday,
  ]);

  useEffect(() => {
    if (!isInitialized) {
      if (!updatedDeliveryMiscDealerData) {
        setDealerContact(currentDeliveryMiscellaneousDealerData?.DeliveryContact?.trim() || "");
        setDealerContactPhone(
          formatPhoneNumber(currentDeliveryMiscellaneousDealerData?.DeliveryContactPhone?.trim()) || ""
        );
      } else {
        setDealerContact(updatedDeliveryMiscDealerData?.deliveryContact?.trim() || "");
        setDealerContactPhone(
          formatPhoneNumber(updatedDeliveryMiscDealerData?.deliveryContactPhone?.trim()) || ""
        );
      }
      setIsInitialized(true);
    }
  }, [updatedDeliveryMiscDealerData, currentDeliveryMiscellaneousDealerData, isInitialized]);

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
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

  return (
    <Formik
      initialValues={{
        name: dealerName,
        address1: dealerAddress1,
        city: dealerCity,
        statecode: dealerStateCode,
        postalcode: dealerPostalCode,
        contact: dealerContact,
        phone: dealerPhone,
        contactPhone: dealerContactPhone,
        email: dealerEmail,
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
        contact: true,
        phone: true,
        contactPhone: true,
        email: true,
      }}
    >
      {(formik) => (
        <div className="p-2">
          {loading && <LoadingIcon />}
          <div className=" shadow-sm rounded border fullScreenFormContentHeight">
            <Row className="ps-2">
              <Col xs={6} md={6} sm={6}>
                <p className="mt-2">Miscellaneous Delivery Dealer</p>

                <div className="p-l-25">
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0 " /* style={{ marginLeft: '8px' }} */>
                      <Form.Label className="col-form-label dealer-label"></Form.Label>
                    </Col>

                    <Col xs={5} md={5} sm={5} className="p-0 mt-1" /* style={{ width: "170px" }} */>
                      <button
                        className={`customFormControl ${styles.orderLabel}`}
                        name="miscellaneousDeliveryDealerSelection"
                        style={{ background: "#e9ecef" }}
                        onClick={() => {
                          dispatch(setPageNumber(0));
                          dispatch(resetSearchSettings());
                          setDeliveryMiscellaneousDealerLookupShow(true);
                          dispatch(setSelectedId(""));
                        }}
                      >
                        Miscellaneous Dealer Selection
                      </button>
                    </Col>
                  </Form.Group>
                  {/* Name */}
                  <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                    <Col xs={3} md={3} sm={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label ">Name</Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0 mt-1">
                      <input style={{ display: "none" }} autoComplete="off" />
                      <input
                        className={`customFormControl ${dealerName ? "borderGreen" : "borderRed"} `}
                        name="no-suggest-name"
                        type="text"
                        autoComplete="new-password"
                        aria-autocomplete="none"
                        onChange={(e) => {
                          setDealerName(e.target.value);
                        }}
                        value={dealerName}
                        maxLength={30}
                      />
                    </Col>
                  </Form.Group>

                  {/* address-1 */}
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label ">Address </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0 mt-1">
                      <input
                        className={`customFormControl ${
                          formik.errors.address1 === undefined && dealerAddress1.length >= 1
                            ? "borderGreen"
                            : "borderRed"
                        }`}
                        name="ad1"
                        type="text"
                        onChange={(e) => {
                          setDealerAddress1(e.target.value);
                        }}
                        value={dealerAddress1}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        maxLength={30}
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>
                  {/* address-2 */}
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0"></Col>
                    <Col xs={6} md={6} sm={6} className="p-0 mt-1">
                      <input
                        className="customFormControl"
                        name="ad2"
                        type="text"
                        onChange={(e) => {
                          setDealerAddress2(e.target.value);
                        }}
                        value={dealerAddress2}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        maxLength={30}
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>
                  {/* City, State, Zip */}

                  <PostalCodeComponent
                    stateInputWidth={"55px"}
                    zipInputWidth={"118px"}
                    cityInputWidth={"250px"}
                    city={dealerCity}
                    setCity={setDealerCity}
                    stateCode={dealerStateCode}
                    setStateCode={setDealerStateCode}
                    postalCode={dealerPostalCode}
                    setPostalCode={setDealerPostalCode}
                    setPostalValues={setPostalValues}
                    postalOptions={postalOptions}
                    postalCodePK={postalCodePK}
                    setPostalCodePK={(val) => {
                      dispatch(setInvoiceMiles(""));
                      dispatch(setDriverMiles(""));
                      dispatch(setIsInvoiceFlatrateVisible(false));
                      dispatch(setIsDriverFlatrateVisible(false));
                      setPostalCodePK(val);
                    }}
                    canadian={canadian}
                    setCanadian={setCanadian}
                  />

                  {/* Phone */}
                  <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label ">Phone</Form.Label>
                    </Col>
                    <Col xs={2} className="p-0 w-100px">
                      <input
                        className={`customFormControl  ${
                          dealerPhone && dealerPhone?.length === 14 ? "borderGreen" : "borderRed"
                        }`}
                        name="no-suggest-phone"
                        type="text"
                        onChange={(e) => {
                          setDealerPhone(formatPhoneNumber(e.target.value));
                        }}
                        value={dealerPhone}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                      />
                    </Col>
                  </Form.Group>
                  {/* Email */}
                  <Form.Group className="mt-2 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label ">Email</Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl ${
                          !dealerEmail || dealerEmail?.match(emailRegex) ? "" : "borderRed  "
                        }`}
                        name="no-suggest-email"
                        type="text"
                        onChange={(e) => {
                          setDealerEmail(e.target.value);
                        }}
                        value={dealerEmail}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                        maxLength={70}
                      />
                    </Col>
                  </Form.Group>
                  {/* Contact */}
                  <Form.Group className="mt-2 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label ">Contact</Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className={`customFormControl ${
                          formik.errors.contact === undefined && dealerContact.length >= 1
                            ? "borderGreen"
                            : "borderRed"
                        }`}
                        name="no-suggest-contact"
                        type="text"
                        onChange={(e) => {
                          setDealerContact(e.target.value);
                        }}
                        value={dealerContact}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                        maxLength={42}
                      />
                    </Col>
                  </Form.Group>
                  {/* Contact Phone */}
                  <Form.Group className="mt-2 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label ">Contact Phone</Form.Label>
                    </Col>
                    <Col xs={2} className="p-0 w-100px">
                      <input
                        className={`customFormControl ${
                          dealerContactPhone && dealerContactPhone?.length === 14
                            ? "borderGreen"
                            : "borderRed"
                        }`}
                        name="no-suggest-contactphone"
                        type="text"
                        onChange={(e) => {
                          setDealerContactPhone(formatPhoneNumber(e.target.value));
                        }}
                        value={dealerContactPhone}
                        autoComplete="new-password"
                        aria-autocomplete="none"
                      />
                    </Col>
                  </Form.Group>
                  <Row style={{ marginTop: "156px" }}>
                    <Col xs={5} md={5} sm={5} className="p-0 mt-4" style={{ minWidth: "180px" }}>
                      {/* Open Sunday */}
                      <Form.Group className="mt-1  align-items-center row  m-l-0 m-r-0">
                        <Col sm={7} xs={7} className="p-0">
                          <Form.Label className={`  col-form-label ${styles.orderLabel} dealer-label m-l-15`}>
                            Open Sunday
                          </Form.Label>
                        </Col>
                        <Col sm={1} xs={1} className="">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${
                              openSunday
                                ? ""
                                : !openSunday &&
                                    !openMonday &&
                                    !openTuesday &&
                                    !openWednesday &&
                                    !openThursday &&
                                    !openFriday &&
                                    !openSaturday
                                  ? "borderRed"
                                  : ""
                            }`}
                            name="openSunday"
                            onChange={(e) => {
                              setOpenSunday(e.target.checked);
                            }}
                            checked={openSunday}
                          />
                        </Col>
                      </Form.Group>
                      {/* Open Monday */}
                      <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                        <Col sm={7} xs={7} className="p-0">
                          <Form.Label className={`  col-form-label ${styles.orderLabel} dealer-label m-l-15`}>
                            Open Monday
                          </Form.Label>
                        </Col>
                        <Col sm={1} xs={1} className="">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${
                              openMonday
                                ? ""
                                : !openSunday &&
                                    !openMonday &&
                                    !openTuesday &&
                                    !openWednesday &&
                                    !openThursday &&
                                    !openFriday &&
                                    !openSaturday
                                  ? "borderRed"
                                  : ""
                            }`}
                            name="openMonday"
                            onChange={(e) => {
                              setOpenMonday(e.target.checked);
                            }}
                            checked={openMonday}
                          />
                        </Col>
                      </Form.Group>
                      {/* Open Tuesday */}
                      <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                        <Col sm={7} xs={7} className="p-0">
                          <Form.Label className={`  col-form-label ${styles.orderLabel} dealer-label m-l-15`}>
                            Open Tuesday
                          </Form.Label>
                        </Col>
                        <Col sm={1} xs={1} className="">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${
                              openTuesday
                                ? ""
                                : !openSunday &&
                                    !openMonday &&
                                    !openTuesday &&
                                    !openWednesday &&
                                    !openThursday &&
                                    !openFriday &&
                                    !openSaturday
                                  ? "borderRed"
                                  : ""
                            }`}
                            name="openTuesday"
                            onChange={(e) => {
                              setOpenTuesday(e.target.checked);
                            }}
                            checked={openTuesday}
                          />
                        </Col>
                      </Form.Group>
                      {/* Open Wednesday */}
                      <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                        <Col sm={7} xs={7} className="p-0">
                          <Form.Label className={`  col-form-label ${styles.orderLabel} dealer-label m-l-15`}>
                            Open Wednesday
                          </Form.Label>
                        </Col>
                        <Col sm={1} xs={1} className="">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${
                              openWednesday
                                ? ""
                                : !openSunday &&
                                    !openMonday &&
                                    !openTuesday &&
                                    !openWednesday &&
                                    !openThursday &&
                                    !openFriday &&
                                    !openSaturday
                                  ? "borderRed"
                                  : ""
                            }`}
                            name="openWednesday"
                            onChange={(e) => {
                              setOpenWednesday(e.target.checked);
                            }}
                            checked={openWednesday}
                          />
                        </Col>
                      </Form.Group>
                      {/* Open Thursday */}
                      <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0 flex-nowrap">
                        <Col sm={7} xs={7} className="p-0 flex-shrink-0">
                          <Form.Label
                            className={`  col-form-label ${styles.orderLabel} dealer-label m-l-15 m-l-15`}
                            style={{ whiteSpace: "nowrap", minWidth: "100px" }}
                          >
                            Open Thursday
                          </Form.Label>
                        </Col>
                        <Col sm={1} xs={1} className="flex-shrink-0">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${
                              openThursday
                                ? ""
                                : !openSunday &&
                                    !openMonday &&
                                    !openTuesday &&
                                    !openWednesday &&
                                    !openThursday &&
                                    !openFriday &&
                                    !openSaturday
                                  ? "borderRed"
                                  : ""
                            }`}
                            name="openThursday"
                            onChange={(e) => {
                              setOpenThursday(e.target.checked);
                            }}
                            checked={openThursday}
                          />
                        </Col>
                      </Form.Group>
                      {/* Open Friday */}
                      <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                        <Col sm={7} xs={7} className="p-0">
                          <Form.Label className={`  col-form-label ${styles.orderLabel} dealer-label m-l-15`}>
                            Open Friday
                          </Form.Label>
                        </Col>
                        <Col sm={1} xs={1} className="">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${
                              openFriday
                                ? ""
                                : !openSunday &&
                                    !openMonday &&
                                    !openTuesday &&
                                    !openWednesday &&
                                    !openThursday &&
                                    !openFriday &&
                                    !openSaturday
                                  ? "borderRed"
                                  : ""
                            }`}
                            name="openFriday"
                            onChange={(e) => {
                              setOpenFriday(e.target.checked);
                            }}
                            checked={openFriday}
                          />
                        </Col>
                      </Form.Group>
                      {/* Open Saturday */}
                      <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                        <Col sm={7} xs={7} className="p-0">
                          <Form.Label className={`  col-form-label ${styles.orderLabel} dealer-label m-l-15`}>
                            Open Saturday
                          </Form.Label>
                        </Col>
                        <Col sm={1} xs={1} className="">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${
                              openSaturday
                                ? ""
                                : !openSunday &&
                                    !openMonday &&
                                    !openTuesday &&
                                    !openWednesday &&
                                    !openThursday &&
                                    !openFriday &&
                                    !openSaturday
                                  ? "borderRed"
                                  : ""
                            }`}
                            name="openSaturday"
                            onChange={(e) => {
                              setOpenSaturday(e.target.checked);
                            }}
                            checked={openSaturday}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    {/* Drivers Email-Hours */}
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <Form.Group
                        className={`m-b-10 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel}`}
                        style={{ marginTop: "33px" }}
                      >
                        <Form.Label htmlFor="notes" style={{ marginTop: "0px" }}>
                          Drivers Email-Hours
                        </Form.Label>
                        <Col sm={12} md={12} xs={12} className="p-0">
                          <textarea
                            rows={8}
                            cols={10}
                            className="customFormControl"
                            name="hours"
                            onChange={(e) => {
                              setHours(e.target.value);
                            }}
                            value={hours}
                            style={{
                              resize: "none",
                              display: "fixed",
                              minHeight: "153px",
                              minWidth: "260px",
                              boxShadow: "none",
                              fontSize: "12px",
                            }}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>

                {/* Miscellaneous delivery Dealer */}
              </Col>

              <Col xs={6} md={6} sm={6}>
                <Row>
                  <Col xs={6} md={6} sm={6}>
                    {/* Bol Text-Hours */}
                    <Form.Group className=" form-group mt-3  align-items-center row  m-l-0 m-r-0">
                      <Form.Label className="col-form-label dealer-label">Bol Text-Miscellaneous</Form.Label>
                      <Col xs={9} md={9} sm={9} className="p-0 mt-3">
                        <DynamicTextFields
                          numFields={7}
                          maxCharLimit={42}
                          inputValues={bolTexMiscellaneousInputValues}
                          setInputValues={setBolTexMiscellaneousInputValues}
                        />
                      </Col>
                    </Form.Group>
                    <div className="" style={{ minHeight: "10px" }}>
                      {" "}
                    </div>
                    <Form.Group className=" form-group m-t-0  align-items-center row  m-l-0 m-r-0">
                      <Form.Label className="col-form-label dealer-label">Bol Text-Directions</Form.Label>

                      <Col xs={9} md={9} sm={9} className="p-0 mt-3">
                        <DynamicTextFields
                          numFields={7}
                          maxCharLimit={42}
                          inputValues={bolTextDirectionsInputValues}
                          setInputValues={setBolTextDirectionsInputValues}
                        />
                      </Col>
                    </Form.Group>
                    {/* Drivers Email-Directions */}
                    <Col xs={12} md={12} sm={12} style={{ marginTop: "-4px" }}>
                      <Form.Group
                        className={`m-b-10 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel}`}
                      >
                        <Form.Label htmlFor="notes">Drivers Email-Directions</Form.Label>

                        <Col sm={11} md={11} xs={11} className="p-0">
                          <textarea
                            rows={8}
                            cols={10}
                            className="customFormControl"
                            name="directions"
                            onChange={(e) => {
                              setDriverEmailDirections(e.target.value);
                            }}
                            value={driverEmailDirections}
                            style={{
                              resize: "none",
                              display: "fixed",
                              minHeight: "153px",
                              minWidth: "240px",
                              boxShadow: "none",
                              fontSize: "12px",
                            }}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Col>

                  {/* Bol Text-Miscellaneous */}
                  <Col xs={6} md={6} sm={6}>
                    {/* Bol Text-Hours */}
                    <Form.Group className=" form-group mt-3  align-items-center row  m-l-0 m-r-0">
                      <Form.Label className="col-form-label dealer-label">Bol Text-Hours</Form.Label>
                      <Col xs={9} md={9} sm={9} className="p-0 mt-3">
                        <DynamicTextFields
                          numFields={3}
                          maxCharLimit={42}
                          inputValues={bolTextHoursInputValues}
                          setInputValues={setBolTextHoursInputValues}
                        />
                      </Col>
                    </Form.Group>

                    <div className="" style={{ minHeight: "10px" }}>
                      {" "}
                    </div>
                    <Form.Group className=" form-group m-t-0  align-items-center row  m-l-0 m-r-0">
                      <Form.Label className="col-form-label dealer-label">Bol Text-Other</Form.Label>
                      <Col xs={9} md={9} sm={9} className="p-0 mt-3">
                        <DynamicTextFields
                          numFields={3}
                          maxCharLimit={42}
                          inputValues={bolTextsOtherValues}
                          setInputValues={setBolTextOtherInputValues}
                        />
                      </Col>
                    </Form.Group>

                    <div className="" style={{ minHeight: "10px" }}></div>

                    {/* Bol Text-Wash instructions */}
                    <Form.Group className=" form-group m-t-0  align-items-center row  m-l-0 m-r-0">
                      <Form.Label className="col-form-label dealer-label">
                        Bol Text-Wash Instructions
                      </Form.Label>

                      <Col xs={9} md={9} sm={9} className="p-0 mt-3">
                        <DynamicTextFields
                          numFields={6}
                          maxCharLimit={42}
                          inputValues={bolTextWashInstructions}
                          setInputValues={setBolTextWashInstructions}
                        />
                      </Col>
                    </Form.Group>
                    {/* Drivers Email- Wash Instructions */}
                    <Col xs={12} md={12} sm={12} /* style={{ marginTop: "62px" }} */>
                      <Form.Group
                        className={` m-b-10 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel}`}
                        style={{ marginTop: "57px" }}
                      >
                        <Form.Label htmlFor="notes">Drivers Email- Wash Instructions</Form.Label>

                        <Col sm={11} md={11} xs={11} className="p-0">
                          <textarea
                            rows={8}
                            cols={10}
                            className="customFormControl"
                            style={{
                              resize: "none",
                              display: "fixed",
                              minHeight: "153px",
                              minWidth: "240px",
                              boxShadow: "none",
                              fontSize: "12px",
                            }}
                            onChange={(e) => {
                              setDriverEmailWashInstructions(e.target.value);
                            }}
                            value={driverEmailWashInstructions}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Col>
                </Row>
              </Col>
            </Row>
            <MiscDealerLookup
              show={deliveryMiscellaneousDealerLookupShow}
              onHide={() => setDeliveryMiscellaneousDealerLookupShow(false)}
              Reroute
              companyPK={companyId}
              renderItemId={(dealer) => dealer.unitAddressPK}
              handleLookupSelection={handleDeliveryMiscellaneousDealerSelection}
            />
          </div>
        </div>
      )}
    </Formik>
  );
}

export default RerouteDeliveryMiscellaneousDealerContent;
