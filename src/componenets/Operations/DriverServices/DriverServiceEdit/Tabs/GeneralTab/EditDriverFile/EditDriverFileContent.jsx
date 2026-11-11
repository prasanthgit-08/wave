import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Col, Row } from "react-bootstrap";
import { formatPhoneNumber } from "../../../../../../../utils/validation/Phonevalidation";
import PostalCode from "../../../../../../common/PostalCode";
import AutoCompleteDropdown from "../../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../../common/LookupButton";
import DateInputField from "../../../../../../common/DateInputField";
import { emailRegex } from "../../../../../../../utils/validation/EmailRegex";
import {
  setDealerCity,
  setDealerPostcode,
  setDealerStatecode,
} from "../../../../../../../redux/EditDealerSlice";
import {
  setSelectedDriverData,
  setSelectedDriverFormData,
  setPostalCodeOnChange,
  setOnCancel,
  setPhysicalPostalCodeOnChange,
  setDispatcherData,
  setEnableSave,
  setDriverDispatchHoldsData,
  setIsDriverLoading,
} from "../../../../../../../redux/EditDriverFileSlice";
import UserLookup from "../../../../../../LookupScreens/User/UserLookup";
import EditDriverService from "../../../../../../../services/EditDriverService";
import formatDatetimeToDate from "../../../../../../../utils/formatDateTimeToDate";
import PostalCodeComponent from "../../../../../../common/PostalCodeComponent";
import { PermissionKeyGeneratorUtil } from "../../../../../../../utils/PermissionKeyGeneratorUtil";
import Input from "../../../../../../../components/common/input";

const EditDriverFileContent = () => {
  const dispatch = useDispatch();

  //States from redux
  const driverId = useSelector((state) => state.editDriverFileReducer.driverId);
  const selectedDriverData = useSelector((state) => state.editDriverFileReducer.selectedDriverData);
  const isDriverLoading = useSelector((state) => state.editDriverFileReducer.isDriverLoading);
  const postalCodeOnChange = useSelector((state) => state.editDriverFileReducer.postalCodeOnChange);
  const physicalPostalCodeOnChange = useSelector(
    (state) => state.editDriverFileReducer.physicalPostalCodeOnChange
  );
  const onCancel = useSelector((state) => state.editDriverFileReducer.onCancel);
  const dispatcherData = useSelector((state) => state.editDriverFileReducer.dispatcherData);
  const driverDispatchHoldsData = useSelector((state) => state.editDriverFileReducer.driverDispatchHoldsData);

  //Local States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [physicalAddress1, setPhysicalAddress1] = useState("");
  const [physicalAddress2, setPhysicalAddress2] = useState("");
  const [physicalCity, setPhysicalCity] = useState("");
  const [physicalStateCode, setPhysicalStateCode] = useState("");
  const [physicalPostalCode, setPhysicalPostalCode] = useState("");
  const [physicalCanadian, setPhysicalCanadian] = useState(false);
  const [physicalZipPostLenght, setPhysicalZipPostLenght] = useState();
  const [physicalCityLength, setPhysicalCityLength] = useState();
  const [zipIdChcek, setZipIdCheck] = useState("");
  const [mailingAddress1, setMailingAddress1] = useState("");
  const [mailingAddress2, setMailingAddress2] = useState("");
  const [mailingCity, setMailingCity] = useState("");
  const [mailingStateCode, setMailingStateCode] = useState("");
  const [mailingPostalCode, setMailingPostalCode] = useState("");
  const [mailingCanadian, setMailingCanadian] = useState(false);
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [postalOptions2, setPostalValues2] = useState(initialValue);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState();
  const [adsPassword, setAdsPassword] = useState("");
  const [email, setEmail] = useState("");
  const [homePhone, setHomePhone] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [faxPaperWork, setFaxPaperWork] = useState(false);
  const [fax, setFax] = useState("");
  const [dispatcherShowLookup, setDispatcherShowLookup] = useState(false);
  const [dispatcherId, setDispatcherId] = useState("");
  const [dispatcherInput, setDispatcherInput] = useState("");
  const [transportation, setTransportation] = useState("");
  const [allTransportation, setAllTransportation] = useState([]);
  const [hitchTowbar, setHitchTowbar] = useState(false);
  const [militaryService, setMilitaryService] = useState("");
  const [allMilitaryService, setAllMilitaryService] = useState([]);
  const [spouseName, setSpouseName] = useState("");
  const [weddingAnniversery, setWeddingAnniversery] = useState("");
  const [isWeddingAnniverseryDateValidation, setIsWeddingAnniverseryDateValidation] = useState(true);
  const [dateWeddingAnniverseryInput, setDateWeddingAnniverseryInput] = useState("");
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [numberOfGrandKids, setNumberOfGrandKids] = useState(0);
  const [hobby, setHobby] = useState("");
  const [otherInterests, setOtherInterests] = useState("");
  const [blockDispatch, setBlockDispatch] = useState(false);
  const [dispatchBlockDate, setDispatchBlockDate] = useState("");
  const [isDispatchBlockDateValid, setIsDispatchBlockDateValid] = useState(true);
  const [dispatchBlockReason, setDispatchBlockReason] = useState("");
  const [disable, setDisable] = useState(true);
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [physicalPostalCodePK, setPhysicalPostalCodePK] = useState(null);
  const [supervisorPermissionDenied, setsupervisorPermissionDenied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const supervisorPermission = PermissionKeyGeneratorUtil("USER", "SPDIS");

  //Populating selected driver details
  useEffect(() => {
    if (selectedDriverData != null) {
      setFirstName(selectedDriverData?.firstName?.trim() || "");
      setLastName(selectedDriverData?.lastName?.trim() || "");
      setNickName(selectedDriverData?.nickName?.trim() || "");
      setMailingCity(selectedDriverData.mailingCity != null ? selectedDriverData.mailingCity?.trim() : "");
      setMailingStateCode(
        selectedDriverData.mailingStateCode != null ? selectedDriverData.mailingStateCode?.trim() : ""
      );
      setMailingPostalCode(
        selectedDriverData.mailingPostalCode != null ? selectedDriverData.mailingPostalCode?.trim() : ""
      );
      setMailingCanadian(selectedDriverData?.mailingCanadian);
      setMailingAddress1(selectedDriverData?.mailingAddress1?.trim() || "");
      setMailingAddress2(selectedDriverData?.mailingAddress2?.trim() || "");
      setPhysicalAddress1(selectedDriverData?.physicalAddress1?.trim() || "");
      setPhysicalAddress2(selectedDriverData?.physicalAddress2?.trim() || "");
      setPhysicalCity(selectedDriverData.physicalCity != null ? selectedDriverData.physicalCity?.trim() : "");
      setPhysicalStateCode(
        selectedDriverData.physicalStateCode != null ? selectedDriverData.physicalStateCode?.trim() : ""
      );
      setPhysicalPostalCode(
        selectedDriverData.physicalPostalCode != null ? selectedDriverData.physicalPostalCode?.trim() : ""
      );
      initialValue[0].city =
        selectedDriverData.mailingCity != null ? selectedDriverData.mailingCity?.trim() : "";
      initialValue[0].statecode =
        selectedDriverData.mailingStateCode != null ? selectedDriverData.mailingStateCode?.trim() : "";
      initialValue[0].postalcode =
        selectedDriverData.mailingPostalCode != null ? selectedDriverData.mailingPostalCode?.trim() : "";
      setPostalValues(initialValue);
      initialValue[0].city =
        selectedDriverData.physicalCity != null ? selectedDriverData.physicalCity?.trim() : "";
      initialValue[0].statecode =
        selectedDriverData.physicalStateCode != null ? selectedDriverData.physicalStateCode?.trim() : "";
      initialValue[0].postalcode =
        selectedDriverData.physicalPostalCode != null ? selectedDriverData.physicalPostalCode?.trim() : "";
      setPostalValues2(initialValue);
      setAdsPassword(selectedDriverData?.adsPassword?.trim() || "");
      setEmail(selectedDriverData?.email?.trim() || "");
      setHomePhone(
        selectedDriverData.homePhone != null ? formatPhoneNumber(selectedDriverData.homePhone) : ""
      );
      setCellPhone(
        selectedDriverData.cellPhone != null ? formatPhoneNumber(selectedDriverData.cellPhone) : ""
      );
      setFaxPaperWork(selectedDriverData?.faxPaperwork || false);
      setFax(selectedDriverData?.faxNumber != null ? formatPhoneNumber(selectedDriverData.faxNumber) : "");
      setDispatcherId(selectedDriverData?.dispatcherUserFK?.userPK || "");
      setDispatcherInput(selectedDriverData?.dispatcherUserFK?.name?.trim() || "");
      setTransportation(selectedDriverData?.transportation?.trim() || "");
      setHitchTowbar(selectedDriverData?.hitchTowbar || false);
      setMilitaryService(selectedDriverData?.militaryService?.trim() || "");
      setSpouseName(selectedDriverData?.spouseName?.trim());
      setWeddingAnniversery(
        selectedDriverData?.spouseName?.trim() != "" ? selectedDriverData?.weddingAnniversery : ""
      );
      setNumberOfChildren(selectedDriverData?.numberOfChildren || 0);
      setNumberOfGrandKids(selectedDriverData?.numberOfGrandKids || 0);
      setHobby(selectedDriverData?.hobby?.trim() || "");
      setOtherInterests(selectedDriverData?.otherInterests?.trim() || "");
      setPostalCodePK(selectedDriverData?.postalCodePK ? selectedDriverData?.postalCodePK : null);
      setPhysicalPostalCodePK(
        selectedDriverData?.physicalPostalCodePK ? selectedDriverData?.physicalPostalCodePK : null
      );
    }
  }, [selectedDriverData]);

  //Driver Form Data - Save
  const driverFormData = () => {
    dispatch(
      setSelectedDriverFormData({
        driverPK: driverId,
        firstName: firstName,
        lastName: lastName,
        nickName: nickName,
        mailingAddress1: mailingAddress1,
        mailingAddress2: mailingAddress2,
        mailingCity: mailingCity,
        mailingPostalCode: mailingPostalCode,
        mailingStateCode: mailingStateCode,
        physicalAddress1: physicalAddress1,
        physicalAddress2: physicalAddress2,
        physicalCity: physicalCity,
        physicalPostalCode: physicalPostalCode,
        physicalStateCode: physicalStateCode,
        adsPassword: adsPassword,
        email: email,
        homePhone: homePhone.replace(/\s+/g, ""),
        cellPhone: cellPhone.replace(/\s+/g, ""),
        faxNumber: fax.replace(/\s+/g, ""),
        faxPaperwork: faxPaperWork,
        dispatcherUserFK: { userPK: dispatcherId },
        transportation: transportation,
        hitchTowbar: hitchTowbar,
        militaryService: militaryService,
        spouseName: spouseName,
        weddingAnniversery: weddingAnniversery,
        numberOfChildren: numberOfChildren ? numberOfChildren : 0,
        numberOfGrandKids: numberOfGrandKids ? numberOfGrandKids : 0,
        hobby: hobby,
        otherInterests: otherInterests,
        hold: blockDispatch,
        holdDate: dispatchBlockDate,
        holdReason: dispatchBlockReason,
        dispatchHoldId: driverDispatchHoldsData?.dispatchHoldId,
      })
    );
  };
  useEffect(() => {
    driverFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    driverId,
    firstName,
    lastName,
    nickName,
    mailingAddress1,
    mailingAddress2,
    mailingCity,
    mailingPostalCode,
    mailingStateCode,
    physicalAddress1,
    physicalAddress2,
    physicalCity,
    physicalPostalCode,
    physicalStateCode,
    adsPassword,
    email,
    cellPhone,
    homePhone,
    faxPaperWork,
    fax,
    dispatcherId,
    transportation,
    hitchTowbar,
    militaryService,
    spouseName,
    weddingAnniversery,
    numberOfChildren,
    numberOfGrandKids,
    hobby,
    otherInterests,
    blockDispatch,
    dispatchBlockDate,
    dispatchBlockReason,
    driverDispatchHoldsData,
  ]);

  useEffect(() => {
    setsupervisorPermissionDenied(deniedPermissions?.includes(supervisorPermission));
  }, [deniedPermissions]);

  //Service Methods
  const fetchUsersForDispatcher = (string) => {
    setIsLoading(true);
    EditDriverService.getAllActiveNonPseudoUsers(string)
      .then((response) => {
        setIsLoading(false);
        const { data } = response;
        const userList = data.content?.map((user) => ({ ...user, name: user.name?.trim() }));
        dispatch(setDispatcherData(userList));
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  //Handle selection from reporting user dropdown
  const handleUserSelectionFromDispatcherDropdown = (user) => {
    setDispatcherInput(user.name?.trim());
    setDispatcherId(user.userPK);
    setDispatcherShowLookup(false);
  };

  //Get Military Service
  const getMilitaryServiceValue = () => {
    EditDriverService.getMilitaryService()
      .then((response) => {
        const data = response.data;
        setAllMilitaryService(data);
      })
      .catch((error) => {});
  };

  //Get Transportation
  const getTransportationValues = () => {
    EditDriverService.getTransportation()
      .then((response) => {
        const data = response.data;
        setAllTransportation(data);
      })
      .catch((error) => {});
  };

  //Get Driver Details
  const getDriverById = (driverId) => {
    dispatch(setSelectedDriverData(""));
    dispatch(setIsDriverLoading(true));
    EditDriverService.getDriverById(driverId)
      .then((response) => {
        const data = response.data;
        dispatch(setSelectedDriverData(data));
        setTimeout(() => {
          dispatch(setIsDriverLoading(false));
          setDisable(false);
        }, 300);
      })
      .catch((error) => {
        dispatch(setIsDriverLoading(false));
        setDisable(false);
      });
  };

  const getDriverDispatchHoldData = (driverId) => {
    EditDriverService.getDriverDispatchHoldData(driverId)
      .then((response) => {
        const data = response.data;
        dispatch(setDriverDispatchHoldsData(data));
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getMilitaryServiceValue();
    getTransportationValues();
  }, []);

  useEffect(() => {
    if (driverId !== "") {
      getDriverById(driverId);
      getDriverDispatchHoldData(driverId);
    }
  }, [driverId]);

  useEffect(() => {
    setBlockDispatch(driverDispatchHoldsData?.hold || false);
    setDispatchBlockDate(formatDatetimeToDate(driverDispatchHoldsData?.holdDate) || "");
    setDispatchBlockReason(driverDispatchHoldsData.holdReason || "");
  }, [driverDispatchHoldsData]);

  //Validation
  const changePostalCode = (e) => {
    dispatch(setPostalCodeOnChange(e));
  };

  const changePhysicalPostalCode = (e) => {
    dispatch(setPhysicalPostalCodeOnChange(e));
  };

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFax(formattedPhoneNumber);
  };

  const homePhoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setHomePhone(formattedPhoneNumber);
  };

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setCellPhone(formattedPhoneNumber);
  };

  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d]/g, "");
    if (value) return number;
  };

  const validationSchema = yup.object({
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
    email: yup.string().matches(emailRegex),
  });

  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };

  //Save validation
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  useEffect(() => {
    if (
      firstName?.trim() !== "" &&
      !firstName.startsWith(" ") &&
      lastName?.trim() !== "" &&
      !lastName.startsWith(" ") &&
      (nickName === "" || (nickName?.trim() !== "" && !nickName.startsWith(" "))) &&
      mailingAddress1?.trim() !== "" &&
      !mailingAddress1.startsWith(" ") &&
      ((mailingAddress2?.trim() !== "" && !mailingAddress2.startsWith(" ")) || mailingAddress2 === "") &&
      postalCodePK &&
      physicalAddress1?.trim() !== "" &&
      !physicalAddress1.startsWith(" ") &&
      ((physicalAddress2?.trim() !== "" && !physicalAddress2.startsWith(" ")) || physicalAddress2 === "") &&
      physicalPostalCodePK &&
      (adsPassword === "" || (adsPassword?.trim() !== "" && !adsPassword.startsWith(" "))) &&
      email !== "" &&
      email.match(emailRegex) &&
      (homePhone === "" || (homePhone !== "" && homePhone.match(phoneRegex))) &&
      cellPhone !== "" &&
      cellPhone.match(phoneRegex) &&
      ((!faxPaperWork && (fax === "" || fax.match(phoneRegex))) ||
        (faxPaperWork && fax !== "" && fax.match(phoneRegex))) &&
      dispatcherInput !== "" &&
      dispatcherId &&
      militaryService !== "" &&
      (spouseName === "" ||
        (spouseName &&
          spouseName !== "" &&
          !spouseName.startsWith(" ") &&
          weddingAnniversery !== "" &&
          isWeddingAnniverseryDateValidation)) &&
      (hobby === "" || (hobby?.trim() !== "" && !hobby.startsWith(" "))) &&
      (otherInterests === "" || (otherInterests?.trim() !== "" && !otherInterests.startsWith(" "))) &&
      ((!blockDispatch && dispatchBlockReason === "") ||
        (((blockDispatch && dispatchBlockReason?.trim() !== "" && !dispatchBlockReason.startsWith(" ")) ||
          (!blockDispatch &&
            dispatchBlockReason.length > 0 &&
            dispatchBlockReason?.trim() !== "" &&
            !dispatchBlockReason.startsWith(" "))) &&
          isDispatchBlockDateValid)) &&
      numberOfChildren <= 32767 &&
      numberOfGrandKids <= 32767
    ) {
      dispatch(setEnableSave(true));
    } else {
      dispatch(setEnableSave(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    firstName,
    lastName,
    nickName,
    postalCodeOnChange,
    zipPostLenght,
    physicalAddress1,
    physicalAddress2,
    mailingAddress1,
    mailingAddress2,
    adsPassword,
    email,
    homePhone,
    cellPhone,
    faxPaperWork,
    fax,
    dispatcherInput,
    dispatcherId,
    militaryService,
    spouseName,
    weddingAnniversery,
    isWeddingAnniverseryDateValidation,
    numberOfGrandKids,
    numberOfChildren,
    hobby,
    otherInterests,
    physicalPostalCodeOnChange,
    physicalZipPostLenght,
    blockDispatch,
    dispatchBlockDate,
    isDispatchBlockDateValid,
    dispatchBlockReason,
    postalCodePK,
    physicalPostalCodePK,
  ]);

  return (
    <Formik
      initialValues={{
        physicalCity,
        physicalPostalCode,
        physicalStateCode,
        email,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        physicalCity: true,
        physicalPostalCode: true,
        physicalStateCode: true,
        email: true,
      }}
    >
      {(formik) => (
        <Form on={formik.handle}>
          <div className="p-15 w-100" onClick={handleMouseEventMain} onFocus={handleMouseEventMain}>
            <div className="shadow-sm rounded border halfScreenFormContentHeight">
              <Row className="m-0 p-0">
                <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                  {/* Name */}
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Name</Form.Label>
                    </Col>
                    {/* First Name */}
                    <Col xs={4} md={4} sm={4} className="p-0">
                      <input
                        className={`customFormControl ${
                          isDriverLoading
                            ? ""
                            : firstName?.trim() != "" && !firstName.startsWith(" ")
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        name="firstName"
                        type="text"
                        value={firstName}
                        maxLength={30}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          setFirstName(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
                      />
                    </Col>
                    {/* Last Name */}
                    <Col xs={4} md={4} sm={4} className="p-r-0">
                      <input
                        className={`customFormControl ${
                          isDriverLoading
                            ? ""
                            : lastName?.trim() != "" && !lastName.startsWith(" ")
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        name="lastName"
                        value={lastName}
                        maxLength={30}
                        autoComplete="off"
                        aria-autocomplete="list"
                        type="text"
                        onInput={(e) => {
                          setLastName(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
                      />
                    </Col>
                  </Form.Group>

                  {/* Nick Name */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Nick Name</Form.Label>
                    </Col>
                    <Col xs={4} md={4} sm={4} className="p-0">
                      <input
                        className={`customFormControl ${
                          isDriverLoading ||
                          (nickName?.trim() !== "" && !nickName.startsWith(" ")) ||
                          nickName === ""
                            ? ""
                            : "borderRed"
                        }`}
                        name="nickName"
                        type="text"
                        value={nickName}
                        maxLength={30}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          setNickName(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
                      />
                    </Col>
                  </Form.Group>
                  {/* Mailing Address */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Mailing Address</Form.Label>
                    </Col>
                    {/* Mailing Address1 */}
                    <Col xs={4} md={4} sm={4} className="p-0">
                      <input
                        className={`customFormControl ${
                          isDriverLoading
                            ? ""
                            : mailingAddress1?.trim() !== "" && !mailingAddress1.startsWith(" ")
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        name="ad1"
                        value={mailingAddress1}
                        type="text"
                        maxLength={30}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          setMailingAddress1(e.target.value.replace(/^\s+/, ""));
                        }}
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>

                  {/* Mailing Address2*/}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label"></Form.Label>
                    </Col>
                    <Col xs={4} md={4} sm={4} className="p-0">
                      <input
                        className={`customFormControl ${
                          isDriverLoading ||
                          (mailingAddress2?.trim() !== "" && !mailingAddress2.startsWith(" ")) ||
                          mailingAddress2 === ""
                            ? ""
                            : "borderRed"
                        }`}
                        name="ad2"
                        value={mailingAddress2}
                        type="text"
                        maxLength={30}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          setMailingAddress2(e.target.value.replace(/^\s+/, ""));
                        }}
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>
                  <PostalCodeComponent
                    marginTop="0.5rem"
                    marginBottom="1.25rem"
                    hideLabel
                    disabled={disable}
                    city={mailingCity}
                    setCity={setMailingCity}
                    stateCode={mailingStateCode}
                    setStateCode={setMailingStateCode}
                    postalCode={mailingPostalCode}
                    setPostalCode={setMailingPostalCode}
                    setPostalValues={setPostalValues}
                    postalOptions={postalOptions}
                    postalCodePK={postalCodePK}
                    setPostalCodePK={setPostalCodePK}
                    canadian={mailingCanadian}
                    setCanadian={setMailingCanadian}
                  />

                  {/*Physical Address */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Physical Address</Form.Label>
                    </Col>
                    {/* Physical Address1 */}
                    <Col xs={4} md={4} sm={4} className="p-0">
                      <input
                        className={`customFormControl ${
                          isDriverLoading
                            ? ""
                            : physicalAddress1?.trim() !== "" && !physicalAddress1.startsWith(" ")
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        name="ad1"
                        type="text"
                        maxLength={30}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        value={physicalAddress1}
                        onInput={(e) => {
                          setPhysicalAddress1(e.target.value.replace(/^\s+/, ""));
                        }}
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>

                  {/* Physical Address2 */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label"></Form.Label>
                    </Col>
                    <Col xs={4} md={4} sm={4} className="p-0">
                      <input
                        className={`customFormControl ${
                          isDriverLoading ||
                          (physicalAddress2?.trim() !== "" && !physicalAddress2.startsWith(" ")) ||
                          physicalAddress2 === ""
                            ? ""
                            : "borderRed"
                        }`}
                        name="ad2"
                        type="text"
                        maxLength={30}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        value={physicalAddress2}
                        onInput={(e) => {
                          setPhysicalAddress2(e.target.value.replace(/^\s+/, ""));
                        }}
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>
                  <PostalCodeComponent
                    marginTop="0.5rem"
                    marginBottom="1.25rem"
                    disabled={disable}
                    city={physicalCity}
                    setCity={setPhysicalCity}
                    stateCode={physicalStateCode}
                    setStateCode={setPhysicalStateCode}
                    postalCode={physicalPostalCode}
                    setPostalCode={setPhysicalPostalCode}
                    canadian={physicalCanadian}
                    setCanadian={setPhysicalCanadian}
                    postalOptions={postalOptions}
                    setPostalValues={setPostalValues}
                    postalCodePK={physicalPostalCodePK}
                    setPostalCodePK={setPhysicalPostalCodePK}
                    className={"postalCodeRefSeco"}
                    hideLabel
                  />

                  {/* ADS Password */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">ADS Password</Form.Label>
                    </Col>

                    <Col xs={4} md={4} sm={4} className="p-0">
                      {/* Common Input (autoComplete="one-time-code", spellCheck/autoCorrect off) so the
                          browser doesn't offer to save this as a login password when leaving the page */}
                      <Input
                        name="adsPassword"
                        type="password"
                        maxLength={30}
                        value={adsPassword}
                        onInput={(e) => {
                          setAdsPassword(e.target.value.replace(/^\s+/, ""));
                        }}
                        className={`customFormControl ${
                          isDriverLoading ||
                          (adsPassword?.trim() !== "" && !adsPassword.startsWith(" ")) ||
                          adsPassword === ""
                            ? ""
                            : "borderRed"
                        }`}
                      />
                    </Col>
                  </Form.Group>

                  {/* Email */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Email</Form.Label>
                    </Col>

                    <Col xs={7} md={7} sm={7} className="p-0">
                      <input
                        className={`customFormControl ${
                          isDriverLoading
                            ? ""
                            : formik.errors.email === undefined && email !== null && email.length > 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        name="email"
                        type="text"
                        maxLength={70}
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={email}
                        onInput={(e) => {
                          setEmail(e.target.value.replace(/^\s+/, ""));
                        }}
                      />
                    </Col>
                  </Form.Group>

                  {/* Home Phone */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Home Phone</Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 w-115px">
                      <input
                        className={`customFormControl ${
                          isDriverLoading ? "" : !homePhone || homePhone?.length === 14 ? "" : "borderRed"
                        }`}
                        name="homePhone"
                        type="text"
                        maxLength={14}
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={homePhone}
                        onChange={(e) => homePhoneFormatHandler(e)}
                        onInput={(e) => {
                          setHomePhone(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>

                  {/* Cell Phone */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Cell Phone</Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 w-115px">
                      <input
                        className={`customFormControl ${
                          isDriverLoading
                            ? ""
                            : cellPhone !== "" && cellPhone.length === 14
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        name="cellPhone"
                        type="text"
                        maxLength={14}
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={cellPhone}
                        onChange={(e) => phoneFormatHandler(e)}
                        onInput={(e) => {
                          setCellPhone(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>

                  {/* FAX Paperwork */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">FAX Paperwork</Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        checked={faxPaperWork}
                        value={faxPaperWork}
                        onChange={(e) => {
                          setFaxPaperWork(e.target.checked);
                          if (!e.target.checked) {
                            setFax("");
                          }
                        }}
                      />
                    </Col>
                  </Form.Group>

                  {/* FAX */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">FAX</Form.Label>
                    </Col>
                    <Col xs={2} md={2} sm={2} className="p-0 w-115px">
                      <input
                        className={`customFormControl ${
                          isDriverLoading || (!faxPaperWork && fax === "")
                            ? ""
                            : (faxPaperWork === true && fax !== "" && fax.length === 14) ||
                                (!faxPaperWork && (fax === "" || fax.match(phoneRegex)))
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        name="fax"
                        type="text"
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={fax}
                        disabled={!faxPaperWork}
                        maxLength={14}
                        onChange={(e) => faxFormatHandler(e)}
                        onInput={(e) => {
                          setFax(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col sm={6} md={6} xs={6} className="ps-lg-1">
                  {/* Dispatcher */}
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Dispatcher</Form.Label>
                    </Col>
                    <Col xs={5} md={5} sm={5} className={`p-0 d-flex`}>
                      <AutoCompleteDropdown
                        arrayList={dispatcherData}
                        searchString={dispatcherInput}
                        renderItemId={(item) => item.userPK}
                        renderItemField={(item) => item.name}
                        handleSearchString={(string) => setDispatcherInput(string)}
                        fetchDataBySearchString={fetchUsersForDispatcher}
                        onSelect={handleUserSelectionFromDispatcherDropdown}
                        clearInputCallback={() => {
                          setDispatcherId(null);
                        }}
                        selectedId={dispatcherId}
                        className={`customFormControl ${
                          isDriverLoading || supervisorPermissionDenied
                            ? ""
                            : dispatcherId && dispatcherInput
                              ? "borderGreen"
                              : "borderRed"
                        }
                     `}
                        disabled={supervisorPermissionDenied}
                        loading={isLoading}
                      />
                      <LookupButton
                        disabled={supervisorPermissionDenied}
                        onClick={() => {
                          setDispatcherShowLookup(true);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  {/* Transportation */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Transportation</Form.Label>
                    </Col>
                    <Col xs={4} md={4} sm={4} className="p-0">
                      <Form.Select
                        className="customFormControl"
                        name="creditCardPayments"
                        value={transportation}
                        disabled={!selectedDriverData?.motorized}
                        onChange={(e) => {
                          setTransportation(e.target.value);
                        }}
                      >
                        <option value="">--Select--</option>
                        {allTransportation?.map((item) => (
                          <option key={item.transportationID} value={item.transportationID}>
                            {item.transportationName}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  {/* Hitch-Towbar */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Hitch-Towbar</Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        checked={hitchTowbar}
                        value={hitchTowbar}
                        disabled={!selectedDriverData?.motorized}
                        onChange={(e) => {
                          setHitchTowbar(e.target.checked);
                          if (!e.target.checked) {
                            setHitchTowbar("");
                          }
                        }}
                      />
                    </Col>
                  </Form.Group>

                  {/* Military Service */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Military Service</Form.Label>{" "}
                    </Col>

                    <Col xs={4} md={4} sm={4} className="p-0">
                      <Form.Select
                        className={`customFormControl ${
                          isDriverLoading ? "" : militaryService !== "" ? "borderGreen" : "borderRed"
                        }`}
                        name="militaryService"
                        value={militaryService}
                        onChange={(e) => {
                          setMilitaryService(e.target.value);
                        }}
                      >
                        <option value="">--Select--</option>
                        {allMilitaryService?.map((item) => (
                          <option key={item.militaryServiceID} value={item.militaryServiceID}>
                            {item.militaryServiceName}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group>

                  {/* Spouse's Name */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Spouse's Name</Form.Label>
                    </Col>

                    <Col xs={4} md={4} sm={4} className="p-0">
                      <input
                        name="spouseName"
                        type="text"
                        maxLength={20}
                        autoComplete="off"
                        aria-autocomplete="list"
                        value={spouseName}
                        onInput={(e) => {
                          let value = e.target.value;
                          setSpouseName(e.target.value.replace(/^\s+/, ""));

                          if (value === "") {
                            setWeddingAnniversery("");
                          }
                        }}
                        className={`customFormControl ${isDriverLoading}`}
                      />
                    </Col>
                  </Form.Group>
                  {/* Wedding Anniversery */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Wedding Anniversery</Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                      <DateInputField
                        date={isDriverLoading ? "" : weddingAnniversery}
                        setDate={setWeddingAnniversery}
                        disabled={spouseName?.trim() !== "" ? false : true}

                        dateInput={isDriverLoading ? "" : dateWeddingAnniverseryInput}
                        setDateInput={setDateWeddingAnniverseryInput}

                        setIsDateValid={setIsWeddingAnniverseryDateValidation}
                        max={new Date(new Date())}

                        className={`customFormControl ${
                          isDriverLoading || spouseName?.trim() === ""
                            ? ""
                            : spouseName?.trim() !== "" &&
                                weddingAnniversery &&
                                isWeddingAnniverseryDateValidation
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                      />
                    </Col>
                  </Form.Group>
                  {/* Number Of Children */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Number Of Children</Form.Label>
                    </Col>

                    <Col xs={1} md={1} sm={1} className="p-0">
                      <input
                        className={`customFormControl ${numberOfChildren <= 32767 ? "" : "borderRed"}`}
                        name="numberOfChildren"
                        type="text"
                        value={numberOfChildren}
                        maxLength={5}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onChange={(e) => {
                          setNumberOfChildren(isNumber(e.target.value));
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Number Of Grand Kids</Form.Label>
                    </Col>

                    <Col xs={1} md={1} sm={1} className="p-0">
                      <input
                        className={`customFormControl ${numberOfGrandKids <= 32767 ? "" : "borderRed"}`}
                        name="numberOfGrandKids"
                        type="text"
                        value={numberOfGrandKids}
                        maxLength={5}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onChange={(e) => {
                          setNumberOfGrandKids(isNumber(e.target.value));
                        }}
                      />
                    </Col>
                  </Form.Group>
                  {/* Hobby */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Hobby</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        name="hobby"
                        type="text"
                        value={hobby}
                        maxLength={40}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          let value = e.target.value;
                          setHobby(e.target.value.replace(/^\s+/, ""));
                        }}
                        className={`customFormControl ${
                          isDriverLoading || (hobby?.trim() !== "" && !hobby.startsWith(" ")) || hobby === ""
                            ? ""
                            : "borderRed"
                        }`}
                      />
                    </Col>
                  </Form.Group>

                  {/* Other Interests */}
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Other Interests</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        name="otherInterests"
                        type="text"
                        value={otherInterests}
                        maxLength={40}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          setOtherInterests(e.target.value.replace(/^\s+/, ""));
                        }}
                        className={`customFormControl ${
                          isDriverLoading ||
                          (otherInterests?.trim() !== "" && !otherInterests.startsWith(" ")) ||
                          otherInterests === ""
                            ? ""
                            : "borderRed"
                        }`}
                      />
                    </Col>
                  </Form.Group>
                  {/* Block Dispatch */}
                  {driverDispatchHoldsData && !isDriverLoading && (
                    <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className="col-form-label dealer-label">Block Dispatch</Form.Label>
                      </Col>

                      <Col xs={2} md={2} sm={2} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0 "
                          checked={blockDispatch}
                          value={blockDispatch}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setBlockDispatch(e.target.checked);
                            } else {
                              !supervisorPermissionDenied && setBlockDispatch(false);
                            }
                          }}
                        />
                      </Col>
                    </Form.Group>
                  )}
                  {/* Dispatch Block Date */}
                  {blockDispatch && (
                    <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className="col-form-label dealer-label">Dispatch Block Date</Form.Label>
                      </Col>

                      <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                        <DateInputField
                          date={dispatchBlockDate}
                          setDate={setDispatchBlockDate}
                          setIsDateValid={setIsDispatchBlockDateValid}
                          className={`customFormControl ${
                            isDriverLoading ? "" : isDispatchBlockDateValid ? "" : "borderRed"
                          }`}
                        />
                      </Col>
                    </Form.Group>
                  )}
                </Col>
                {/* Dispatch Block Reason */}
                {driverDispatchHoldsData && !isDriverLoading && (
                  <Col sm={12} md={12} xs={12} className="p-0">
                    <Form.Group className="mt-0 m-l-10 align-items row  m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0 m-l-370 w-150px">
                        <Form.Label className="col-form-label dealer-label">Dispatch Block Reason</Form.Label>
                      </Col>
                      <Col sm={6} md={6} xs={6} className="p-0 ">
                        <textarea
                          rows={4}
                          cols={130}
                          type="text"
                          value={dispatchBlockReason}
                          onChange={(e) => {
                            setDispatchBlockReason(e.target.value.replace(/^\s+/, ""));

                            // setDispatchBlockReason(e.target.value);
                          }}
                          className={`customFormControl h-100 ${
                            isDriverLoading || (!blockDispatch && dispatchBlockReason === "")
                              ? ""
                              : (blockDispatch &&
                                    dispatchBlockReason?.trim() !== "" &&
                                    !dispatchBlockReason.startsWith(" ")) ||
                                  (!blockDispatch &&
                                    dispatchBlockReason.length >= 1 &&
                                    dispatchBlockReason?.trim() !== "")
                                ? blockDispatch && dispatchBlockReason?.trim() !== ""
                                  ? "borderGreen"
                                  : "borderBlack"
                                : "borderRed"
                          }`}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                )}
              </Row>
              <UserLookup
                show={dispatcherShowLookup}
                onHide={() => {
                  setDispatcherShowLookup(false);
                }}
                renderItemId={(user) => user.userPK}
                handleLookupSelection={handleUserSelectionFromDispatcherDropdown}
                DriverEditFile
              />
            </div>
            {isDriverLoading && (
              <div className="fade modal-backdrop show">
                {" "}
                <div className="pos-center">
                  {" "}
                  <div className="loader"></div>
                </div>
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditDriverFileContent;
