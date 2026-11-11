import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Col, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../common/LookupButton";
import DateInputField from "../../../../../common/DateInputField";
import { useSelector } from "react-redux";

import {
  setDriverActive,
  setDriverDeleased,
  setSaveFormData,
  setPostalCodeOnChange,
  setIsGeneralTabValid,
  setCheckDriverDeleaseExist,
  setPhysicalPostalCodeOnChange,
  setDocumentFile,
  setFileType,
  setDriverSSN,
} from "../../../../../../redux/DriverMaintenanceSlice";
import { useDispatch } from "react-redux";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import DriverService from "../../../../../../services/DriverService";
import DynamicTextFields from "../../../../../common/AutoWrapTextFields/DynamicTextFields";
import { emailRegex } from "../../../../../../utils/validation/EmailRegex";
import UserLookup from "../../../../../LookupScreens/User/UserLookup";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";
import Input from "../../../../../../components/common/input";
import { parseLocalDate } from "../../../../../../utils/dateUtils";
import { getEnum } from "../../../../../../utils/enumUtils";

const GeneralTab = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [dba1, setDba1] = useState("");
  const [dba2, setDba2] = useState("");
  const [dbaInputValues, setDbaInputValues] = useState(Array(2).fill(""));
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
  const [ssn, setSsn] = useState("");
  const [checkSSN, setCheckSSN] = useState(false);
  const [ein, setEin] = useState("");
  const [email, setEmail] = useState("");
  const [homePhone, setHomePhone] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [faxPaperWork, setFaxPaperWork] = useState(false);
  const [fax, setFax] = useState("");
  const [deleased, setDeleased] = useState(false);
  const [deceased, setDeceased] = useState(false);
  const [active, setActive] = useState(true);
  const [birthday, setBirthDay] = useState("");
  const [isBirthDayDateValidation, setIsBirthDayDateValidation] = useState(true);
  const [dispatcherData, setDispatcherData] = useState([]);
  const [showLookup, setShowLookup] = useState(false);
  const [dispatcherId, setDispatcherId] = useState(null);
  const [dispatcherInput, setDispatcherInput] = useState("");
  const [gender, setGender] = useState("");
  const [militaryService, setMilitaryService] = useState("");
  const [canadianCitizen, setCanadianCitizen] = useState(false);
  const [spouseName, setSpouseName] = useState("");
  const [weddingAnniversery, setWeddingAnniversery] = useState("");
  const [isWeddingAnniverseryDateValidation, setIsWeddingAnniverseryDateValidation] = useState(true);
  const [numberOfChildren, setNumberOfChildren] = useState("");
  const [numberOfGrandKids, setNumberOfGrandKids] = useState("");
  const [hobby, setHobby] = useState("");
  const [otherInterests, setOtherInterests] = useState("");
  const [pictureFK, setPictureFK] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const viewDetail = useSelector((state) => state.driverMaintenanceReducer.viewDetail);
  const editFormData = useSelector((state) => state.driverMaintenanceReducer.editFormData);
  const checkDriverDeleaseExist = useSelector(
    (state) => state.driverMaintenanceReducer.checkDriverDeleaseExist
  );
  const postalCodeOnChange = useSelector((state) => state.driverMaintenanceReducer.postalCodeOnChange);
  const onCancel = useSelector((state) => state.driverMaintenanceReducer.onCancel);
  const isDriverLoading = useSelector((state) => state.driverMaintenanceReducer.isDriverLoading);
  const disableSave = useSelector((state) => state.driverMaintenanceReducer.disableSave);
  const isGeneralTabValid = useSelector((state) => state.driverMaintenanceReducer.isGeneralTabValid);
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [physicalPostalCodePK, setPhysicalPostalCodePK] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const physicalPostalCodeOnChange = useSelector(
    (state) => state.driverMaintenanceReducer.physicalPostalCodeOnChange
  );
  const pictureFile = useSelector((state) => state.driverMaintenanceReducer.pictureFile);

  const documentFile = useSelector((state) => state.driverMaintenanceReducer.documentFile);
  const clearFlag = useSelector((state) => state.driverMaintenanceReducer.clearFlag);
  const pictureFileName = useSelector((state) => state.driverMaintenanceReducer.pictureFileName);

  const saveFormData = useSelector((state) => state.driverMaintenanceReducer.saveFormData);
  const displayFlag = useSelector((state) => state.driverMaintenanceReducer.displayFlag);
  //used for custom userlookup
  const userLookupPageNumber = useSelector((state) => state.userLookupReducer.userLookupPageNumber);
  const searchTerms = useSelector((state) => state.userLookupReducer.searchTerms);
  const sortValue = useSelector((state) => state.userLookupReducer.normalSortValue);
  const sortFlag = useSelector((state) => state.userLookupReducer.normalSortFlag);
  const advanceSortingOrder = useSelector((state) => state.userLookupReducer.advanceSortingOrder);
  const selectedSearchCriteria = useSelector((state) => state.userLookupReducer.selectedSearchCriteria);
  const searchedUser = useSelector((state) => state.userLookupReducer.searchedUser);
  const selectedUserStatus = useSelector((state) => state.userLookupReducer.selectedUserStatus);

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setCellPhone(formattedPhoneNumber);
  };
  const homePhoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setHomePhone(formattedPhoneNumber);
  };
  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFax(formattedPhoneNumber);
  };

  const genderData = getEnum("gender");
  const militaryServiceData = getEnum("militaryServices");

  const setGeneralTabData = (formData, source) => {
    setFirstName(formData?.firstName?.trim() || "");
    setLastName(formData?.lastName?.trim() || "");
    setNickName(formData?.nickName?.trim() || "");

    if (source === "backend") {
      setDba1(formData?.dbaA?.trim() || "");
      setDba2(formData?.dbaB?.trim() || "");
    } else {
      const [dba1, dba2] = formData?.dbaArray;
      setDba1(dba1 || "");
      setDba2(dba2 || "");
    }
    setMailingCity(formData.mailingCity != null ? formData.mailingCity?.trim() : "");
    setMailingStateCode(formData.mailingStateCode != null ? formData.mailingStateCode?.trim() : "");
    setMailingPostalCode(formData.mailingPostalCode != null ? formData.mailingPostalCode?.trim() : "");
    setMailingCanadian(formData?.mailingCanadian);
    setMailingAddress1(formData?.mailingAddress1?.trim() || "");
    setMailingAddress2(formData?.mailingAddress2?.trim() || "");
    setPhysicalAddress1(formData?.physicalAddress1?.trim() || "");
    setPhysicalAddress2(formData?.physicalAddress2?.trim() || "");
    setPhysicalCity(formData.physicalCity != null ? formData.physicalCity?.trim() : "");
    setPhysicalStateCode(formData.physicalStateCode != null ? formData.physicalStateCode?.trim() : "");
    setPhysicalPostalCode(formData.physicalPostalCode != null ? formData.physicalPostalCode?.trim() : "");

    initialValue[0].city = formData.mailingCity != null ? formData.mailingCity?.trim() : "";
    initialValue[0].statecode = formData.mailingStateCode != null ? formData.mailingStateCode?.trim() : "";
    initialValue[0].postalcode = formData.mailingPostalCode != null ? formData.mailingPostalCode?.trim() : "";
    setPostalValues(initialValue);

    initialValue[0].city = formData.physicalCity != null ? formData.physicalCity?.trim() : "";
    initialValue[0].statecode = formData.physicalStateCode != null ? formData.physicalStateCode?.trim() : "";
    initialValue[0].postalcode =
      formData.physicalPostalCode != null ? formData.physicalPostalCode?.trim() : "";
    setPostalValues2(initialValue);
    setSsn(formData.ssn != null ? formatCustomFormatSSN(formData.ssn) : "");
    setEin(formatCustomFormatEIN(formData.ein));
    setEmail(formData?.email?.trim() || "");

    setHomePhone(formData.homePhone != null ? formatPhoneNumber(formData.homePhone) : "");
    setCellPhone(formData.cellPhone != null ? formatPhoneNumber(formData.cellPhone) : "");
    setFaxPaperWork(formData?.faxPaperwork || false);
    setDeleased(formData?.deleased || false);
    setFax(formData?.faxNumber != null ? formatPhoneNumber(formData.faxNumber) : "");
    setActive(formData?.active || false);
    setBirthDay(formData?.birthday || "");
    setWeddingAnniversery(formData?.weddingAnniversery || "");
    setDispatcherId(formData?.dispatcherUserFK.userPK || null);
    setDispatcherInput(formData?.dispatcherUserFK.name || "");

    setGender(formData?.gender?.trim() || "");
    setMilitaryService(formData?.militaryService?.trim() || "");
    setCanadianCitizen(formData?.canadianCitizen || false);
    setSpouseName(formData?.spouseName?.trim());

    setNumberOfChildren(formData?.numberOfChildren || "");
    setNumberOfGrandKids(formData?.numberOfGrandKids || "");
    setHobby(formData?.hobby?.trim() || "");
    setOtherInterests(formData?.otherInterests?.trim() || "");
    setDeceased(formData?.deceased || false);
    if (formData?.pictureDocumentBLOBFK) {
      setPictureFK(formData.pictureDocumentBLOBFK);
      GetDriverPicture(formData.pictureDocumentBLOBFK);
    }
    setPostalCodePK(formData?.postalCodePK ? formData?.postalCodePK : null);
    setPhysicalPostalCodePK(formData?.physicalPostalCodePK ? formData?.physicalPostalCodePK : null);
  };

  useEffect(() => {
    if (viewDetail && editFormData != null) {
      setGeneralTabData(editFormData, "backend");
    }
    if (!viewDetail && saveFormData !== null && displayFlag) {
      setGeneralTabData(saveFormData, "frontend");
    }
  }, [editFormData, viewDetail, displayFlag]);

  useEffect(() => {
    dispatch(setCheckDriverDeleaseExist(false));
  }, []);

  const generalTabData = () => {
    dispatch(
      setSaveFormData({
        driverPK: id,
        firstName: firstName,
        lastName: lastName,
        nickName: nickName,
        dbaA: dba1,
        dbaB: dba2,
        dbaArray: dbaInputValues,
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
        ssn: ssn,
        ein: ein,
        email: email,
        homePhone: homePhone.replace(/\s+/g, ""),
        cellPhone: cellPhone.replace(/\s+/g, ""),
        faxNumber: fax.replace(/\s+/g, ""),
        faxPaperwork: faxPaperWork,
        deleased: deleased,
        active: active,
        dispatcherUserFK: { userPK: dispatcherId, name: dispatcherInput },
        birthday: birthday,
        gender: gender,
        militaryService: militaryService,
        canadianCitizen: canadianCitizen,
        spouseName: spouseName,
        weddingAnniversery: weddingAnniversery,
        numberOfChildren: numberOfChildren ? numberOfChildren : 0,
        numberOfGrandKids: numberOfGrandKids ? numberOfGrandKids : 0,
        hobby: hobby,
        otherInterests: otherInterests,
        pictureFileName: pictureFileName,
        documentObjectKey: "DRIVERIMG",
        pictureDocumentBLOBFK: pictureFK ? pictureFK : "",
        deceased: deceased,
        postalCodePK: postalCodePK,
        physicalPostalCodePK: physicalPostalCodePK,
      })
    );
  };
  useEffect(() => {
    generalTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    id,
    firstName,
    lastName,
    nickName,
    physicalAddress1,
    physicalAddress2,
    physicalCity,
    physicalPostalCode,
    physicalStateCode,
    dba1,
    dba2,
    dbaInputValues,
    mailingAddress1,
    mailingAddress2,
    mailingCity,
    mailingPostalCode,
    mailingStateCode,
    ssn,
    ein,
    email,
    cellPhone,
    homePhone,
    faxPaperWork,
    fax,
    deleased,
    active,
    dispatcherId,
    gender,
    militaryService,
    birthday,
    canadianCitizen,
    spouseName,
    weddingAnniversery,
    numberOfChildren,
    numberOfGrandKids,
    hobby,
    otherInterests,
    pictureFileName,
    pictureFK,
    deceased,
    postalCodePK,
    physicalPostalCodePK,
  ]);

  const validationSchema = yup.object({
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
    email: yup.string().matches(emailRegex),
  });
  /**
   * Checking SSN in unique or not
   */
  const handleCheckssn = (description) => {
    DriverService.ssnExist(ssn, id)
      .then((res) => {
        setCheckSSN(res?.data);
      })
      .catch((err) => {
        console.log(err);
        navigate(`/driver-maintenance`);
      });
  };

  /**
   * Setting SSN Value
   */
  const formatCustomFormatSSN = (value) => {
    if (!value) return value;

    const cleanedValue = value.replace(/[^\d]/g, "");

    const valueLength = cleanedValue.length;

    if (valueLength < 4) return cleanedValue;

    if (valueLength < 6) {
      return `${cleanedValue.slice(0, 3)}-${cleanedValue.slice(3)}`;
    }

    if (valueLength < 10) {
      return `${cleanedValue.slice(0, 3)}-${cleanedValue.slice(3, 5)}-${cleanedValue.slice(5)}`;
    }

    return `${cleanedValue.slice(0, 3)}-${cleanedValue.slice(3, 5)}-${cleanedValue.slice(5, 9)}`;
  };

  const ssnFormatHandler = (e) => {
    const formattedSSSN = formatCustomFormatSSN(e.target.value);
    setSsn(formattedSSSN);
  };

  /**
   * Setting EIN Value
   */
  const formatCustomFormatEIN = (value) => {
    if (!value) return value;

    const cleanedValue = value.replace(/[^\d]/g, "");

    const valueLength = cleanedValue.length;

    if (valueLength < 3) return cleanedValue;

    if (valueLength < 10) {
      return `${cleanedValue.slice(0, 2)}-${cleanedValue.slice(2)}`;
    }

    return `${cleanedValue.slice(0, 2)}-${cleanedValue.slice(2, 9)}`;
  };

  const einFormatHandler = (e) => {
    const formattedEIN = formatCustomFormatEIN(e.target.value);
    setEin(formattedEIN);
  };

  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d]/g, "");
    if (value) return number;
  };

  useEffect(() => {
    if (deleased && id) {
      findDriverDeleaseExistOrNot();
    }
  }, [deleased, id]);

  useEffect(() => {
    dispatch(setDriverDeleased(deleased));
    dispatch(setDriverActive(active));
  }, [deleased, active]);

  useEffect(() => {
    if (viewDetail) {
      setCheckSSN(false);
    }
  }, [viewDetail]);

  /**
   *Used to check Whether there is a DriverDElease record exist for the Driver
   */
  const findDriverDeleaseExistOrNot = () => {
    DriverService.checkDriverDeleaseRecorExistOrNot(id).then((response) => {
      dispatch(setCheckDriverDeleaseExist(response.data));
    });
  };

  /**
   * Fetch all Users
   * Used for   Autocomplete
   */
  const fetchUsers = (searchString) => {
    setUserLoading(true);

    const serviceCall = deleased
      ? DriverService.getAllUserData(searchString, null)
      : DriverService.getAllUserDataForAutocompletewithDispatcherPermission(searchString);

    serviceCall
      .then((response) => {
        const data = response.data.content || [];

        const userList = data.map((user) => ({
          ...user,
          name: user.name?.trim(),
        }));

        setDispatcherData(userList);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setUserLoading(false);
      });
  };

  const handlerDispatcherLookupSelection = (item) => {
    setDispatcherId(item.userPK);
    setDispatcherInput(item.name?.trim());
    setShowLookup(false);
  };
  const handleDispatcherLookup = () => {
    setShowLookup(true);
  };

  /**
   * Setting dba values
   */
  useEffect(() => {
    const backendValues = [dba1, dba2];
    setDbaInputValues(backendValues);
  }, [dba1, dba2]);

  /**
   * Tab Validation
   */
  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      postalCodePK &&
      mailingAddress1 !== "" &&
      physicalAddress1 !== "" &&
      physicalPostalCodePK &&
      ssn !== "" &&
      !checkSSN &&
      ssn?.match(/^\d{3}-\d{2}-\d{4}/g) &&
      ((!dbaInputValues[0] && !dbaInputValues[1] && !ein) ||
        ((dbaInputValues[0] || dbaInputValues[1]) && ein !== "" && ein?.match(/^\d{2}-\d{7}/g))) &&
      email !== "" &&
      email.match(emailRegex) &&
      (homePhone === "" || (homePhone !== "" && homePhone?.match(phoneRegex))) &&
      cellPhone !== "" &&
      cellPhone?.match(phoneRegex) &&
      (!faxPaperWork || (faxPaperWork && fax !== "" && fax?.match(phoneRegex))) &&
      dispatcherInput !== "" &&
      dispatcherId &&
      birthday !== "" &&
      isBirthDayDateValidation &&
      militaryService !== "" &&
      gender !== "" &&
      (spouseName === "" ||
        (spouseName !== "" && weddingAnniversery !== "" && isWeddingAnniverseryDateValidation)) &&
      numberOfChildren <= 32767 &&
      numberOfGrandKids <= 32767 &&
      (active || deleased)
    ) {
      dispatch(setIsGeneralTabValid(true));
    } else {
      dispatch(setIsGeneralTabValid(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    firstName,
    postalCodePK,
    physicalPostalCodePK,
    lastName,
    postalCodeOnChange,
    zipPostLenght,
    physicalAddress1,
    mailingAddress1,
    ssn,
    checkSSN,
    email,
    homePhone,
    cellPhone,
    faxPaperWork,
    fax,
    dispatcherInput,
    dispatcherId,
    birthday,
    militaryService,
    gender,
    spouseName,
    weddingAnniversery,
    numberOfGrandKids,
    numberOfChildren,
    dbaInputValues,
    ein,
    active,
    deleased,
    physicalPostalCodeOnChange,
    physicalZipPostLenght,
    isBirthDayDateValidation,
    isWeddingAnniverseryDateValidation,
  ]);

  useEffect(() => {
    dispatch(setDriverSSN(ssn));
  }, [ssn]);

  /***Used to set driver image*/
  useEffect(() => {
    if (id) {
      if (pictureFile && pictureFile.length > 0) {
        setDisplayImage(renderImage(pictureFile[0]));
      } else {
        setDisplayImage(documentFile);
      }
    } else if (pictureFile && pictureFile.length > 0) {
      setDisplayImage(renderImage(pictureFile[0]));
    }
  }, [id, pictureFile, documentFile]);
  /** to create a URL for displaying an image from a file or binary data **/
  const renderImage = (file) => {
    const blob = new Blob([file], { type: "image" });
    const url = URL.createObjectURL(blob);

    if (url) return url;
    else return null;
  };
  /**Used to fetch driver image**/
  const GetDriverPicture = (id) => {
    DriverService.getDriverPicById(id)
      .then((res) => {
        const fileType = res.headers["content-type"];
        const blob = new Blob([res.data], { type: fileType });
        const url = URL.createObjectURL(blob);

        dispatch(setDocumentFile(url));
        dispatch(setFileType(fileType));
      })
      .catch((error) => {
        console.error("Error fetching driver picture:", error);
      });
  };

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
          <div className="p-15 w-100">
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Name</Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Input
                      className={`customFormControl ${
                        viewDetail === true || isDriverLoading
                          ? ""
                          : firstName != ""
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="customer"
                      name="customer"
                      type="customer"
                      value={firstName}
                      maxLength={30}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setFirstName(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                      }}
                    />
                  </Col>
                  <Col xs={4} md={4} sm={4} className="p-r-0">
                    <Input
                      name="extn"
                      value={lastName}
                      maxL
                      className={`customFormControl ${
                        viewDetail === true || isDriverLoading
                          ? ""
                          : lastName != ""
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      maxLength={30}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setLastName(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Nickname</Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Input
                      className="customFormControl"
                      id="customer"
                      name="customer"
                      type="customer"
                      value={nickName}
                      maxLength={30}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setNickName(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">DBA</Form.Label>
                  </Col>

                  <Col xs={8} md={8} sm={8} className="p-0">
                    <DynamicTextFields
                      horizontal
                      numFields={2}
                      maxCharLimit={40}
                      inputValues={dbaInputValues}
                      setInputValues={setDbaInputValues}
                      disabled={viewDetail}
                      className={`mx-2 ${
                        viewDetail === true || isDriverLoading || !ein
                          ? ""
                          : ein && (dbaInputValues[0] || dbaInputValues[1])
                            ? ""
                            : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Mailing Address</Form.Label>
                  </Col>
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Input
                      className={`customFormControl ${
                        viewDetail === true || isDriverLoading
                          ? ""
                          : mailingAddress1
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      name="ad1"
                      type="text"
                      value={mailingAddress1}
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        setMailingAddress1(e.target.value);
                      }}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                {/* Address Field-2 */}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Input
                      className="customFormControl"
                      name="ad2"
                      value={mailingAddress2}
                      type="text"
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        setMailingAddress2(e.target.value);
                      }}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>
                <PostalCodeComponent
                  marginTop="0.5rem"
                  marginBottom="1.25rem"
                  hideLabel
                  disabled={viewDetail || isDriverLoading}
                  city={viewDetail ? editFormData?.mailingCity?.trim() : mailingCity}
                  setCity={setMailingCity}
                  stateCode={viewDetail ? editFormData?.mailingStateCode?.trim() : mailingStateCode}
                  setStateCode={setMailingStateCode}
                  postalCode={viewDetail ? editFormData?.mailingPostalCode?.trim() : mailingPostalCode}
                  setPostalCode={setMailingPostalCode}
                  setPostalValues={setPostalValues}
                  postalOptions={postalOptions}
                  postalCodePK={postalCodePK}
                  setPostalCodePK={setPostalCodePK}
                  canadian={mailingCanadian}
                  setCanadian={setMailingCanadian}
                />

                {/* Address Field-1*/}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Physical Address</Form.Label>
                  </Col>
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Input
                      className={`customFormControl ${
                        viewDetail === true || isDriverLoading
                          ? ""
                          : physicalAddress1
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      name="ad2"
                      value={physicalAddress1}
                      type="text"
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        setPhysicalAddress1(e.target.value);
                      }}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                {/* Address Field-2 */}
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label"></Form.Label>
                  </Col>
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Input
                      className="customFormControl"
                      name="ad2"
                      value={physicalAddress2}
                      type="text"
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        setPhysicalAddress2(e.target.value);
                      }}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <PostalCodeComponent
                  marginTop="0.5rem"
                  marginBottom="1.25rem"
                  disabled={viewDetail || isDriverLoading}
                  city={viewDetail ? editFormData?.physicalCity : physicalCity}
                  setCity={setPhysicalCity}
                  stateCode={viewDetail ? editFormData?.physicalStateCode : physicalStateCode}
                  setStateCode={setPhysicalStateCode}
                  postalCode={viewDetail ? editFormData?.physicalPostalCode : physicalPostalCode}
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

                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">SSN</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <Input
                      className={`customFormControl ${
                        viewDetail === true || isDriverLoading
                          ? ""
                          : ssn !== "" && ssn.match(/^\d{3}-\d{2}-\d{4}/g)
                            ? checkSSN
                              ? "borderRed"
                              : "borderGreen"
                            : "borderRed"
                      }`}
                      id="customer"
                      name="customer"
                      type="customer"
                      value={ssn}
                      maxLength={11}
                      disabled={viewDetail}
                      onChange={(e) => {
                        ssnFormatHandler(e);
                        setCheckSSN(false);
                      }}
                      onBlur={(e) => {
                        const value = e.target.value?.trim();

                        if (value && /^\d{3}-\d{2}-\d{4}$/.test(value)) {
                          handleCheckssn(value);
                        }
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">EIN</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <Input
                      className={`customFormControl ${
                        viewDetail === true ||
                        isDriverLoading ||
                        (!dbaInputValues[0] && !dbaInputValues[1] && !ein)
                          ? ""
                          : ein && ein.match(/^\d{2}-\d{7}$/) && ein.length == 10
                            ? ""
                            : "borderRed"
                      }`}
                      id="customer"
                      name="customer"
                      type="customer"
                      value={ein}
                      maxLength={12}
                      disabled={viewDetail}
                      onChange={(e) => {
                        einFormatHandler(e);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Email</Form.Label>
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0">
                    <Input
                      className={`customFormControl ${
                        viewDetail === true
                          ? ""
                          : email && email.match(emailRegex)
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="customer"
                      name="customer"
                      type="customer"
                      value={email}
                      maxLength={70}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Home Phone</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <Input
                      className={`customFormControl ${
                        !viewDetail ? (!homePhone || homePhone?.length === 14 ? "" : "borderRed") : ""
                      }`}
                      id="customer"
                      name="customer"
                      type="customer"
                      value={homePhone}
                      maxLength={14}
                      disabled={viewDetail}
                      onChange={(e) => homePhoneFormatHandler(e)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Cell Phone</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <Input
                      className={`customFormControl ${
                        viewDetail === true || isDriverLoading
                          ? ""
                          : cellPhone !== "" && cellPhone.length === 14
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="customer"
                      name="customer"
                      type="customer"
                      value={cellPhone}
                      maxLength={14}
                      onChange={(e) => phoneFormatHandler(e)}
                      disabled={viewDetail}
                    />
                  </Col>
                </Form.Group>
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
                      disabled={viewDetail}
                      onChange={(e) => {
                        setFaxPaperWork(e.target.checked);
                        if (!e.target.checked) {
                          setFax("");
                        }
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label dealer-label">FAX</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <Input
                      className={`customFormControl ${
                        viewDetail === true || isDriverLoading || !faxPaperWork
                          ? ""
                          : faxPaperWork === true && fax !== "" && fax.length === 14
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="customer"
                      name="customer"
                      type="customer"
                      value={fax}
                      maxLength={14}
                      onChange={(e) => faxFormatHandler(e)}
                      disabled={viewDetail || !faxPaperWork}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={4} md={4} xs={4} className="ps-lg-1">
                <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Deleased</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      checked={deleased}
                      value={deleased}
                      disabled={viewDetail || !checkDriverDeleaseExist || !deleased || deceased}
                      onChange={(e) => {
                        setDeleased(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Active</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        viewDetail === true || isDriverLoading ? "" : !deleased && !active ? "borderRed" : ""
                      }`}
                      checked={active}
                      value={active}
                      disabled={viewDetail || deleased === true || !id || deceased}
                      onChange={(e) => {
                        setActive(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Deceased</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      checked={deceased}
                      value={deceased}
                      disabled={viewDetail || !deleased}
                      onChange={(e) => {
                        setDeceased(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Dispatcher</Form.Label>
                  </Col>
                  <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
                    <AutoCompleteDropdown
                      arrayList={dispatcherData}
                      searchString={dispatcherInput}
                      renderItemId={(item) => item.userPK}
                      renderItemField={(item) => item.name}
                      handleSearchString={(string) => setDispatcherInput(string)}
                      fetchDataBySearchString={fetchUsers}
                      onSelect={handlerDispatcherLookupSelection}
                      clearInputCallback={() => {
                        setDispatcherId(null);
                      }}
                      selectedId={dispatcherId}
                      disabled={viewDetail}
                      className={`customFormControl ${
                        viewDetail || isDriverLoading
                          ? ""
                          : dispatcherId && dispatcherInput
                            ? "borderGreen"
                            : "borderRed"
                      }
               `}
                      loading={userLoading}
                    />
                    <LookupButton onClick={handleDispatcherLookup} disabled={viewDetail} />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Birthday</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                    <DateInputField
                      date={birthday}
                      setDate={setBirthDay}
                      setIsDateValid={setIsBirthDayDateValidation}
                      disabled={viewDetail}
                      format={"MM/DD/YYYY"}
                      min={""}
                      max={parseLocalDate(new Date())}
                      className={`customFormControl ${
                        viewDetail === true || isDriverLoading
                          ? ""
                          : birthday && isBirthDayDateValidation
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Gender</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Select
                      className={`customFormControl ${
                        viewDetail === true || isDriverLoading
                          ? ""
                          : gender !== ""
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      name="creditCardPayments"
                      disabled={viewDetail}
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    >
                      <option value="">--Select--</option>
                      {genderData?.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Military Service</Form.Label>{" "}
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Select
                      className={`customFormControl ${
                        viewDetail === true || isDriverLoading
                          ? ""
                          : militaryService !== ""
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      name="creditCardPayments"
                      disabled={viewDetail}
                      value={militaryService}
                      onChange={(e) => {
                        setMilitaryService(e.target.value);
                      }}
                    >
                      <option value="">--Select--</option>

                      {militaryServiceData?.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Canadian Citizen</Form.Label>{" "}
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      checked={canadianCitizen}
                      value={canadianCitizen}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setCanadianCitizen(e.target.checked);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Spouse's Name</Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="p-0">
                    <Input
                      className="customFormControl"
                      id="customer"
                      name="customer"
                      type="customer"
                      maxLength={20}
                      disabled={viewDetail}
                      value={spouseName}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSpouseName(value);
                        if (!value) {
                          setWeddingAnniversery("");
                        }
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Wedding Anniversery</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-95px">
                    <DateInputField
                      date={weddingAnniversery}
                      setDate={setWeddingAnniversery}
                      disabled={viewDetail || !spouseName}
                      setIsDateValid={setIsWeddingAnniverseryDateValidation}
                      min={""}
                      max={parseLocalDate(new Date())}
                      className={`customFormControl ${
                        viewDetail === true || isDriverLoading || !spouseName
                          ? ""
                          : spouseName && weddingAnniversery && isWeddingAnniverseryDateValidation
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Number Of Children</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-50px">
                    <Input
                      className={`customFormControl ${
                        viewDetail === true ? "" : numberOfChildren <= 32767 ? "" : "borderRed"
                      }`}
                      id="customer"
                      name="customer"
                      type="customer"
                      value={numberOfChildren}
                      maxLength={5}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setNumberOfChildren(isNumber(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Number Of Grand Kids</Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-50px">
                    <Input
                      className={`customFormControl ${
                        viewDetail === true ? "" : numberOfGrandKids <= 32767 ? "" : "borderRed"
                      }`}
                      id="customer"
                      name="customer"
                      type="customer"
                      value={numberOfGrandKids}
                      maxLength={5}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setNumberOfGrandKids(isNumber(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Hobby</Form.Label>
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0">
                    <Input
                      className="customFormControl"
                      id="customer"
                      name="customer"
                      type="customer"
                      value={hobby}
                      maxLength={40}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setHobby(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} md={4} sm={4} className="p-0">
                    <Form.Label className="col-form-label dealer-label">Other Interests</Form.Label>
                  </Col>
                  <Col xs={7} md={7} sm={7} className="p-0">
                    <Input
                      className="customFormControl"
                      id="customer"
                      name="customer"
                      type="customer"
                      value={otherInterests}
                      maxLength={40}
                      disabled={viewDetail}
                      onChange={(e) => {
                        setOtherInterests(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={1} md={1} xs={1} className="ps-lg-0">
                <div className="text-end h-50">
                  <img className="" src={displayImage} style={{ height: "150px", maxWidth: "200px" }} />
                </div>
              </Col>
            </Row>

            <UserLookup
              show={showLookup}
              onHide={() => setShowLookup(false)}
              renderItemId={(user) => user.userPK}
              handleLookupSelection={handlerDispatcherLookupSelection}
              customServiceCallback={() =>
                !deleased
                  ? DriverService.getAllUserDataForLookupwithDispatcherPermission(
                      true,
                      userLookupPageNumber,
                      searchedUser,
                      selectedSearchCriteria,
                      advanceSortingOrder,
                      searchTerms,
                      sortValue,
                      sortFlag,
                      selectedUserStatus
                    )
                  : DriverService.getAllUserDataForLookup(
                      null,
                      userLookupPageNumber,
                      searchedUser,
                      selectedSearchCriteria,
                      advanceSortingOrder,
                      searchTerms,
                      sortValue,
                      sortFlag,
                      selectedUserStatus
                    )
              }
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default GeneralTab;
