import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Form, Col, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../common/LookupButton";
import DateInputField from "../../../../../common/DateInputField";
import {
  setDriverFlatbed,
  setDriverHireDate,
  setIsComplianceTabValid,
  setMotorizedDriver,
  setSaveFormData,
  setTowableDriver,
} from "../../../../../../redux/DriverMaintenanceSlice";
import { useParams } from "react-router-dom";
import DriverService from "../../../../../../services/DriverService";
import DriverLookup from "../../../../../LookupScreens/Driver/DriverLookup";
import formatDatetimeToDate from "../../../../../../utils/formatDateTimeToDate";
import Input from "../../../../../../components/common/input";
const ComplianceTab = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const saveFormData = useSelector((state) => state.driverMaintenanceReducer.saveFormData);
  const viewDetail = useSelector((state) => state.driverMaintenanceReducer.viewDetail);
  const editFormData = useSelector((state) => state.driverMaintenanceReducer.editFormData);
  const driverActive = useSelector((state) => state.driverMaintenanceReducer.driverActive);
  const driverDeleased = useSelector((state) => state.driverMaintenanceReducer.driverDeleased);
  const checkDriverDeleaseExist = useSelector(
    (state) => state.driverMaintenanceReducer.checkDriverDeleaseExist
  );
  const displayFlag = useSelector((state) => state.driverMaintenanceReducer.displayFlag);
  const [enterReloads, setEnterReloads] = useState(false);
  const [passport, setPassport] = useState(false);
  const [passportNumber, setPassportNumber] = useState("");
  const [backgroundCheck, setBackgroundCheck] = useState(false);
  const [quickTrackOrientation, setQuickTrackOrientation] = useState(false);
  const [recruited, setRecruited] = useState(false);
  const [hireDate, setHireDate] = useState("");
  const [isHireDateValidation, setIsHireDateValidation] = useState(true);
  const [rehiredDate, setRehiredDate] = useState("");
  const [isRehireDateValidation, setIsRehireDateValidation] = useState(true);
  const [rehireDriver, setRehireDriver] = useState(false);
  const [rehireReason, setRehireReason] = useState("");
  const [towable, setTowable] = useState();
  const [towableClass, setTowableClass] = useState("");
  const [towableRank, setTowableRank] = useState("");
  const [flatbed, setFlatbed] = useState(false);
  const [flatbedRank, setFlatbedRank] = useState("");
  const [motorized, setMotorized] = useState();
  const [motorizedClass, setMotorizedClass] = useState("");
  const [motorizedRank, setMotorizedRank] = useState("");
  const [towableShuttle, setTowableShuttle] = useState(false);
  const [driveawayShuttle, setDriveawayShuttle] = useState(false);
  const [shuttlePartTime, setShuttlePartTime] = useState(false);
  const [mentored, setMentored] = useState(false);
  const [recruitingDriverId, setRecruitingDriverId] = useState(null);
  const [recruitingDriverInput, setRecruitingDriverInput] = useState("");
  const [recruitingDriverData, setRecruitingDriverData] = useState([]);
  const [driverLookUpShow, setDriverLookUpShow] = useState(false);
  const [mentoringDriverId, setMentoringDriverId] = useState(null);
  const [mentoringDrivernput, setMentoringDriverInput] = useState("");
  const [mentoringDriverData, setMentoringDriverData] = useState([]);
  const [mentoringDriverLookUpShow, setMentoringDriverLookUpShow] = useState(false);
  const [mentorStartDate, setMentorStartDate] = useState("");
  const [isMentorStartDateValidation, setIsMentorStartDateValidation] = useState(true);
  const [mentoringDriverLoading, setMentoringDriverLoading] = useState(false);
  const [recruitingDriverLoading, setDecruitingDriverLoading] = useState(false);

  const setComplianceTabValues = (formData) => {
    setEnterReloads(formData?.enterReloads || false);
    setPassport(formData?.passport || false);
    setPassportNumber(formData?.passportNumber?.trim() || "");
    setBackgroundCheck(formData?.backgroundCheck || false);
    setQuickTrackOrientation(formData?.quickTrackOrientation || false);
    setRecruited(formData?.recruited || false);
    setHireDate(formatDatetimeToDate(formData?.hireDate) || "");
    setRehiredDate(formatDatetimeToDate(formData?.rehiredDate) || "");
    setRehireDriver(formData?.rehireDriver || false);
    setRehireReason(formData?.rehireReason || "");
    setTowable(formData?.towable || false);
    setTowableClass(formData?.towableClass || "");
    setTowableRank(formData?.towableRank || "");
    setFlatbed(formData?.flatbed || false);
    setFlatbedRank(formData?.flatbedRank || "");
    setMotorized(formData?.motorized || false);
    setMotorizedClass(formData?.motorizedClass || "");
    setMotorizedRank(formData?.motorizedRank || "");
    setTowableShuttle(formData?.towableShuttle || false);
    setDriveawayShuttle(formData?.driveawayShuttle || false);
    setShuttlePartTime(formData?.shuttlePartTime || false);
    setMentored(formData?.mentored || false);
    setMentorStartDate(formData?.mentorStartDate || "");
    setRecruitingDriverId(formData?.recruitingDriverFK || null);
    setMentoringDriverId(formData?.mentoringDriverFK || null);
  };

  useEffect(() => {
    if (viewDetail && editFormData != null) {
      setComplianceTabValues(editFormData);
      setMentoringDriverInput(editFormData?.driverFileData?.MentoringDriverName?.trim() || null);
      setRecruitingDriverInput(editFormData?.driverFileData?.RecruitingDriverName?.trim() || null);
    }
    if (!viewDetail && saveFormData !== null && displayFlag) {
      setComplianceTabValues(saveFormData);
      setMentoringDriverInput(saveFormData?.mentoringDrivernput?.trim() || null);
      setRecruitingDriverInput(saveFormData?.recruitingDriverInput?.trim() || null);
    }
  }, [editFormData, viewDetail, displayFlag]);

  const complianceTabData = () => {
    dispatch(
      setSaveFormData({
        enterReloads: enterReloads,
        passport: passport,
        passportNumber: passportNumber,
        backgroundCheck: backgroundCheck,
        quickTrackOrientation: quickTrackOrientation,
        recruited: recruited,
        hireDate: hireDate,
        rehiredDate: rehiredDate,
        rehireDriver: rehireDriver,
        rehireReason: rehireReason,
        towable: towable,
        towableClass: towableClass,
        towableRank: towableRank ? towableRank : 0,
        flatbed: flatbed,
        flatbedRank: flatbedRank ? flatbedRank : 0,
        motorized: motorized,
        motorizedClass: motorizedClass,
        motorizedRank: motorizedRank ? motorizedRank : 0,
        towableShuttle: towableShuttle,
        driveawayShuttle: driveawayShuttle,
        shuttlePartTime: shuttlePartTime,
        mentored: mentored,
        mentorStartDate: mentorStartDate,
        recruitingDriverFK: recruitingDriverId,
        mentoringDriverFK: mentoringDriverId,
        mentoringDrivernput,
        recruitingDriverInput,
      })
    );
  };
  useEffect(() => {
    complianceTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    enterReloads,
    passport,
    passportNumber,
    backgroundCheck,
    quickTrackOrientation,
    recruited,
    hireDate,
    rehiredDate,
    rehireDriver,
    rehireReason,
    towable,
    towableClass,
    towableRank,
    flatbed,
    flatbedRank,
    motorized,
    motorizedClass,
    motorizedRank,
    towableShuttle,
    driveawayShuttle,
    shuttlePartTime,
    mentored,
    mentorStartDate,
    recruitingDriverId,
    mentoringDriverId,
  ]);

  /**
   * used for Setting redux values
   */
  useEffect(() => {
    dispatch(setMotorizedDriver(motorized));
    dispatch(setTowableDriver(towable));
    dispatch(setDriverHireDate(hireDate));
    dispatch(setDriverFlatbed(flatbed));
  }, [motorized, towable, hireDate, flatbed]);

  /**
   * used for Setting Hire date for a new Driver
   */
  useEffect(() => {
    if (!id) {
      setHireDate(formatDatetimeToDate(new Date()));
    }
  }, [id]);

  const isDays = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d]/g, "");
    if (value) return number;
  };

  /**
   *  Setting RehireDate
   */
  useEffect(() => {
    if (driverActive && checkDriverDeleaseExist) {
      setRehiredDate(formatDatetimeToDate(new Date()));
    }
  }, [driverActive, checkDriverDeleaseExist]);

  /**
   *  Setting field values driverDeleased=true
   */
  useEffect(() => {
    if (driverDeleased) {
      setRecruited(false);
      setRecruitingDriverId(null);
      setRecruitingDriverInput("");
      setRehiredDate("");
    }
  }, [driverDeleased]);

  /**
   *  Setting Towable rank
   */
  useEffect(() => {
    if (towable && !id) {
      setTowableRank(0);
    }
  }, [towable, id]);

  /**
   *  Setting Flatbed rank
   */
  useEffect(() => {
    if (flatbed && !id) {
      setFlatbedRank(0);
    }
  }, [flatbed, id]);

  /**
   *  Setting Motorized rank
   */
  useEffect(() => {
    if (motorized && !id) {
      setMotorizedRank(0);
    }
  }, [motorized, id]);

  useEffect(() => {
    if (saveFormData?.motorized === false && saveFormData?.towable === false) {
      setShuttlePartTime(false);
    }
  }, [saveFormData?.motorized, saveFormData?.towable]);

  /**
   *  Setting Towable Class
   */
  const handleTowableClass = (event) => {
    const value = event.target.value;

    const sanitizedValue = value.replace(/[^1-9]/g, "").slice(0, 1);

    setTowableClass(sanitizedValue);
  };
  /**
   *  Setting Motorized Class
   */
  const handleMotorizedClass = (event) => {
    const value = event.target.value;

    const sanitizedValue = value.replace(/[^1-9]/g, "").slice(0, 1);

    setMotorizedClass(sanitizedValue);
  };

  /**
   * Fetch Recruiting Driver for Autocomplete
   **/
  const fetchDriverValues = (string) => {
    setDecruitingDriverLoading(true);
    let statusType = "Active";

    DriverService.getActiveDriverForAuto(string, statusType, id)
      .then((response) => {
        const data = response.data.content;

        const driversList = data?.map((driver) => ({
          ...driver,
          firstName: driver.firstName?.trim(),
        }));
        setRecruitingDriverData(driversList);
        setDecruitingDriverLoading(false);
      })
      .catch((err) => {
        setDecruitingDriverLoading(false);
        console.log(err);
      });
  };

  /**
   * used for Recruiting Driver Autocomplete ,Lookup-Selection
   */
  const handleDriverLookupSelection = (item) => {
    setRecruitingDriverId(item.driverPK);
    setRecruitingDriverInput(item.firstName?.trim() + (item.lastName ? " " + item.lastName?.trim() : ""));
    setDriverLookUpShow(false);
  };
  const handleDriverLookupModalShow = () => {
    setDriverLookUpShow(true);
  };
  /**
   * Fetch Mentoring Driver for Autocomplete
   **/
  const fetchMentoringDriverValues = (string) => {
    setMentoringDriverLoading(true);
    let statusType = "Active";
    DriverService.getActiveDriverForAuto(string, statusType, id)
      .then((response) => {
        const data = response.data.content;

        const driversList = data?.map((driver) => ({
          ...driver,
          firstName: driver.firstName?.trim(),
        }));
        setMentoringDriverData(driversList);
        setMentoringDriverLoading(false);
      })
      .catch((err) => {
        setMentoringDriverLoading(false);
        console.log(err);
      });
  };
  /**
   * used forMentoring Driver Autocomplete ,Lookup-Selection
   */
  const handleMentoringDriverLookupSelection = (item) => {
    setMentoringDriverId(item.driverPK);
    setMentoringDriverInput(item.firstName?.trim() + (item.lastName ? " " + item.lastName?.trim() : ""));
    setMentoringDriverLookUpShow(false);
  };
  const handleMentoringDriverModalShow = () => {
    setMentoringDriverLookUpShow(true);
  };
  /**
   *Tab Validation
   */
  useEffect(() => {
    if (
      (!passport || (passport && passportNumber)) &&
      (!recruited || (recruited && recruitingDriverId && recruitingDriverInput)) &&
      hireDate !== "" &&
      isHireDateValidation &&
      isRehireDateValidation &&
      ((towable && towableClass !== "" && !motorized) ||
        (motorized && motorizedClass != "" && !towable) ||
        (towable && towableClass !== "" && motorized && motorizedClass)) &&
      (!mentored ||
        (id &&
          mentored &&
          mentorStartDate !== "" &&
          isMentorStartDateValidation &&
          mentoringDriverId &&
          mentoringDrivernput) ||
        (!id &&
          mentored &&
          mentorStartDate !== "" &&
          isMentorStartDateValidation &&
          mentoringDriverId &&
          mentoringDrivernput &&
          ((rehiredDate && mentorStartDate >= rehiredDate) || (!rehiredDate && mentorStartDate >= hireDate))))
    ) {
      dispatch(setIsComplianceTabValid(true));
    } else {
      dispatch(setIsComplianceTabValid(false));
    }
  }, [
    passport,
    driverDeleased,
    passportNumber,
    recruited,
    recruitingDriverId,
    recruitingDriverInput,
    hireDate,
    towable,
    motorized,
    towableClass,
    motorizedClass,
    mentored,
    mentoringDriverId,
    mentoringDrivernput,
    mentorStartDate,
    rehiredDate,
    driverActive,
    isHireDateValidation,
    isMentorStartDateValidation,
    isRehireDateValidation,
  ]);

  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0">
        <Col xs={4} sm={4} md={4} lg={4} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Self Procured Reloads</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={enterReloads}
                checked={enterReloads}
                disabled={viewDetail}
                onChange={(e) => {
                  setEnterReloads(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Has Passport</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={passport}
                checked={passport}
                disabled={viewDetail}
                onChange={(e) => {
                  const value = e.target.checked;
                  setPassport(value);
                  if (!value) {
                    setPassportNumber("");
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Passport Number</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <Input
                className={`customFormControl ${
                  viewDetail === true || !passport
                    ? ""
                    : passport !== "" && passportNumber !== ""
                      ? "borderGreen"
                      : "borderRed"
                }`}
                id="customer"
                name="customer"
                type="customer"
                value={passportNumber}
                maxLength={10}
                disabled={viewDetail || !passport}
                onChange={(e) => {
                  setPassportNumber(isDays(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Background Check</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                disabled={viewDetail}
                className="form-check-input p-0 "
                value={backgroundCheck}
                checked={backgroundCheck}
                onChange={(e) => {
                  setBackgroundCheck(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Quick Track Orientation</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={quickTrackOrientation}
                disabled={viewDetail}
                checked={quickTrackOrientation}
                onChange={(e) => {
                  setQuickTrackOrientation(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Recruited</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={recruited}
                checked={recruited}
                disabled={viewDetail || driverDeleased}
                onChange={(e) => {
                  const value = e.target.checked;
                  setRecruited(value);
                  if (!value) {
                    setRecruitingDriverId(null);
                    setRecruitingDriverInput("");
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Recruiting Driver</Form.Label>
            </Col>
            <Col xs={8} md={8} sm={8} className={`p-0 d-flex`}>
              <AutoCompleteDropdown
                arrayList={recruitingDriverData}
                searchString={recruitingDriverInput}
                renderItemId={(item) => item.driverPK}
                renderItemField={(item) =>
                  item.firstName?.trim() + (item.lastName ? " " + item.lastName?.trim() : "")
                }
                handleSearchString={(string) => setRecruitingDriverInput(string)}
                fetchDataBySearchString={fetchDriverValues}
                onSelect={handleDriverLookupSelection}
                clearInputCallback={() => {
                  setRecruitingDriverId(null);
                }}
                loading={recruitingDriverLoading}
                selectedId={recruitingDriverId}
                disabled={viewDetail || !recruited || driverDeleased}
                className={`customFormControl ${
                  viewDetail || !recruited || driverDeleased
                    ? ""
                    : recruited && recruitingDriverData && recruitingDriverId
                      ? "borderGreen"
                      : "borderRed"
                }
                 `}
              />
              <LookupButton
                onClick={handleDriverLookupModalShow}
                disabled={viewDetail || !recruited || driverDeleased}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Hire Date</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={hireDate}
                setIsDateValid={setIsHireDateValidation}
                setDate={setHireDate}
                disabled={viewDetail}
                className={`customFormControl ${
                  viewDetail === true ? "" : hireDate && isHireDateValidation ? "borderGreen" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Rehire Date</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={rehiredDate}
                setDate={setRehiredDate}
                disabled={viewDetail}
                setIsDateValid={setIsRehireDateValidation}
                className={`customFormControl ${
                  viewDetail === true || !rehiredDate
                    ? ""
                    : rehiredDate && isRehireDateValidation
                      ? ""
                      : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Rehire Driver</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={rehireDriver}
                checked={rehireDriver}
                disabled={viewDetail || !driverDeleased}
                onChange={(e) => {
                  setRehireDriver(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col sm={4} md={4} xs={4} className="ps-lg-5">
          <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Towable Driver</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 ${
                  !viewDetail ? (towable ? "" : !towable && !motorized ? "borderRed" : "") : ""
                }`}
                value={towable}
                checked={towable}
                disabled={viewDetail}
                onChange={(e) => {
                  const value = e.target.checked;
                  setTowable(value);
                  if (!value) {
                    setTowableClass("");
                    setTowableShuttle(false);
                    setTowableRank("");
                    setFlatbed(false);
                    setFlatbedRank("");
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Towable Class</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-50px">
              <input
                type="number"
                className={`customFormControl ${
                  viewDetail || !towable
                    ? ""
                    : towable &&
                        towableClass &&
                        towableClass >= 1 &&
                        towableClass <= 9 &&
                        towableClass.length === 1
                      ? "borderGreen"
                      : "borderRed"
                }`}
                id=" unitClass"
                value={towableClass}
                min={1}
                max={9}
                disabled={viewDetail || !towable}
                onBeforeInput={(e) => {
                  if (e.data === "e" || e.data === "." || e.data === "-" || !/^[1-9.-]*$/.test(e.data)) {
                    e.preventDefault();
                  }
                }}
                onChange={handleTowableClass}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Towable Rank</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={towableRank}
                maxLength={30}
                disabled
                onChange={(e) => {
                  setTowableRank(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Flatbed Driver</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={flatbed}
                checked={flatbed}
                disabled={viewDetail || !towable}
                onChange={(e) => {
                  const value = e.target.checked;
                  setFlatbed(value);
                  if (!value) {
                    setFlatbedRank("");
                  }
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Flatbed Rank</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={flatbedRank}
                disabled
                onChange={(e) => {
                  setFlatbedRank(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Motorized Driver</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 ${
                  !viewDetail ? (motorized ? "" : !towable && !motorized ? "borderRed" : "") : ""
                }`}
                value={motorized}
                checked={motorized}
                disabled={viewDetail}
                onChange={(e) => {
                  const value = e.target.checked;
                  setMotorized(value);
                  if (!value) {
                    setMotorizedClass("");
                    setDriveawayShuttle(false);
                    setMotorizedRank("");
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Motorized Class</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-50px">
              <input
                type="number"
                className={`customFormControl ${
                  viewDetail || !motorized
                    ? ""
                    : motorized &&
                        motorizedClass &&
                        motorizedClass >= 1 &&
                        motorizedClass <= 9 &&
                        motorizedClass.length === 1
                      ? "borderGreen"
                      : "borderRed"
                }`}
                id=" unitClass"
                value={motorizedClass}
                min={1}
                max={9}
                disabled={viewDetail || !motorized}
                onBeforeInput={(e) => {
                  if (e.data === "e" || e.data === "." || e.data === "-" || !/^[1-9.-]*$/.test(e.data)) {
                    e.preventDefault();
                  }
                }}
                onChange={handleMotorizedClass}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Motorized Rank</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={motorizedRank}
                maxLength={30}
                disabled
                onChange={(e) => {
                  setMotorizedRank(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col
          sm={4}
          md={4}
          xs={4}
          className="ps-lg-
        4"
        >
          <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label"> Towable Shuttle Driver</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={towableShuttle}
                checked={towableShuttle}
                disabled={viewDetail || !towable}
                onChange={(e) => {
                  setTowableShuttle(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Motorized Shuttle Driver</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={driveawayShuttle}
                checked={driveawayShuttle}
                disabled={viewDetail || !motorized}
                onChange={(e) => {
                  setDriveawayShuttle(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Part Time Shuttle Driver</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={shuttlePartTime}
                checked={shuttlePartTime}
                disabled={viewDetail || (!motorized && !towable)}
                onChange={(e) => {
                  setShuttlePartTime(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Mentored</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={mentored}
                checked={mentored}
                disabled={viewDetail}
                onChange={(e) => {
                  const value = e.target.checked;
                  setMentored(value);
                  if (!value) {
                    setMentorStartDate("");
                    setMentoringDriverId(null);
                    setMentoringDriverInput("");
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Mentoring Driver</Form.Label>
            </Col>
            <Col xs={8} md={8} sm={8} className={`p-0 d-flex`}>
              <AutoCompleteDropdown
                arrayList={mentoringDriverData}
                searchString={mentoringDrivernput}
                renderItemId={(item) => item.driverPK}
                renderItemField={(item) =>
                  item.firstName?.trim() + (item.lastName ? " " + item.lastName?.trim() : "")
                }
                handleSearchString={(string) => setMentoringDriverInput(string)}
                fetchDataBySearchString={fetchMentoringDriverValues}
                onSelect={handleMentoringDriverLookupSelection}
                clearInputCallback={() => {
                  setMentoringDriverId(null);
                }}
                loading={mentoringDriverLoading}
                selectedId={mentoringDriverId}
                disabled={viewDetail || !mentored}
                className={`customFormControl ${
                  viewDetail || !mentored
                    ? ""
                    : mentored && mentoringDriverId && mentoringDrivernput
                      ? "borderGreen"
                      : "borderRed"
                }
      `}
              />
              <LookupButton onClick={handleMentoringDriverModalShow} disabled={viewDetail || !mentored} />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Mentor Start Date</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={mentorStartDate}
                setDate={setMentorStartDate}
                setIsDateValid={setIsMentorStartDateValidation}
                disabled={viewDetail || !mentored}
                className={`customFormControl ${
                  viewDetail === true || !mentored
                    ? ""
                    : (id && mentored && mentorStartDate !== "" && isMentorStartDateValidation) ||
                        (!id &&
                          mentored &&
                          mentorStartDate !== "" &&
                          isMentorStartDateValidation &&
                          ((rehiredDate && mentorStartDate >= rehiredDate) ||
                            (!rehiredDate && mentorStartDate >= hireDate)))
                      ? "borderGreen"
                      : "borderRed"
                }`}
                min={
                  !id ? (rehiredDate ? new Date(rehiredDate) : hireDate ? new Date(hireDate) : null) : null
                }
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0 w-150px">
              <label className="col-form-label dealer-label p-0 m-b-20">Rehire Notes</label>
            </Col>

            <Col sm={9} md={9} className="p-0">
              <textarea
                rows={9}
                cols={5}
                type="text"
                className="customFormControl h-100 "
                name="notes"
                value={rehireReason}
                autoComplete="newpassword"
                aria-autocomplete="none"
                disabled={viewDetail || !driverDeleased}
                onInput={(e) => setRehireReason(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <DriverLookup
        show={driverLookUpShow}
        onHide={() => setDriverLookUpShow(false)}
        renderItemId={(driver) => driver.driverPK}
        handleLookupSelection={handleDriverLookupSelection}
        showActiveOnly
        ExcludeDriver
        excludeDriverId={id}
      />
      <DriverLookup
        show={mentoringDriverLookUpShow}
        onHide={() => setMentoringDriverLookUpShow(false)}
        renderItemId={(driver) => driver.driverPK}
        handleLookupSelection={handleMentoringDriverLookupSelection}
        ExcludeDriver
        excludeDriverId={id}
        showActiveOnly
      />
    </div>
  );
};

export default ComplianceTab;
