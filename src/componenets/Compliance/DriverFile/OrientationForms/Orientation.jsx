import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../common/Header";
import CommonFooter from "../../../common/CommonFooter";
import { Form, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import DriverTrucksService from "../../../../services/DriverFile/DriverTrucksService";
import DriverTrailersService from "../../../../services/DriverFile/DriverTrailersService";
import OrientationFormsService from "../../../../services/OrientationFormsService";
import { setOrientationFlag } from "../../../../redux/DriverMaintenanceSlice";
import { useDispatch } from "react-redux";
import PreviewPopup from "../../../common/PreviewPopup";
import LoadingIcon from "../../../common/LoadingIcon";
import { lastpointer } from "../../../../utils/utils";
import Input from "../../../../components/common/input";
const Orientation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { driverId } = useParams();
  const [contracts, setContracts] = useState(false);
  const [guts, setGuts] = useState(false);
  const [roadTests, setRoadTests] = useState(false);
  const [plateForm, setPlateForm] = useState(false);
  const [drugTestForm, setDrugTestForm] = useState(false);
  const [physical, setPhysical] = useState(false);
  const [debitCard, setDebitCard] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [arizonaPermit, setArizonaPermit] = useState(false);
  const [reinstatement, setReinstatement] = useState(false);
  const [missingItems, setMissingItems] = useState(false);
  const [safetyAlert, setSafetyAlert] = useState(false);
  const [orientationReceipt, setOrientationReceipt] = useState(false);
  const [orientationForms, setOrientationForms] = useState(false);
  const [annualReview, setAnnualReview] = useState(false);
  const [powerOfAttorney, setPowerOfAttorney] = useState(false);
  const [truckID, setTruckID] = useState(null);
  const [truckName, setTruckName] = useState("");
  const [truckData, setTruckData] = useState([]);
  const [truckLoading, setTruckLoading] = useState(false);
  const [rentalPercentage, setRentalPercentage] = useState("");
  const [minimumWeeklyFee, setMinimumWeeklyFee] = useState("");
  const [numberOfNotaries, setNumberOfNotaries] = useState("");
  const [truckMaintenanceReport, setTruckMaintenanceReport] = useState(false);
  const [trailerID, setTrailerID] = useState(null);
  const [trailerName, setTrailerName] = useState("");
  const [trailerData, setTrailerData] = useState([]);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [reportTruckID, setReportTruckID] = useState(null);
  const [reportTruckName, setReportTruckName] = useState("");
  const [reportTruckData, setReportTruckData] = useState([]);
  const [reportTruckLoading, setReportTruckLoading] = useState(false);
  const [formDateMM, setFormDateMM] = useState("");
  const [formDateYY, setFormDateYY] = useState("");
  const editFormData = useSelector((state) => state.driverMaintenanceReducer.editFormData);
  const orientationFlag = useSelector((state) => state.driverMaintenanceReducer.orientationFlag);
  const [disableFlag, setDisablFlag] = useState(false);
  const toBool = (val) => (val ? 1 : 0);
  const [fileContent, setFileContent] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [truckInitialLoading, setTruckInitialLoading] = useState(true);

  /**
   * Fetch all Active Trucks
   * Used for   Autocomplete
   */
  const fetchTruckValues = (searchString) => {
    setTruckLoading(true);
    DriverTrucksService.getActiveTrucksForAutocomplete(searchString, driverId)

      .then((response) => {
        const data = response?.data?.content || [];

        const truckList = data.map((list) => ({
          ...list,
          description: list.description?.trim(),
        }));

        setTruckData(truckList);
      })
      .catch((error) => {
        console.error("Error fetching trucks:", error);
      })
      .finally(() => {
        setTruckLoading(false);
        setTruckInitialLoading(false);
      });
  };

  const fetchReportTruckValues = (searchString) => {
    setReportTruckLoading(true);

    DriverTrucksService.getActiveTrucksForAutocomplete(searchString, driverId)

      .then((response) => {
        const data = response.data.content || [];

        const truckList = data.map((list) => ({
          ...list,
          description: list.description?.trim(),
        }));

        setReportTruckData(truckList);
      })
      .catch((error) => {
        console.error("Error fetching trucks:", error);
      })
      .finally(() => {
        setReportTruckLoading(false);
      });
  };

  const handleTruckSelection = (truck) => {
    setTruckID(truck.driverTruckPK);
    setTruckName(truck.description);
  };
  //set Report Truck
  const handleReportTruckSelection = (truck) => {
    setReportTruckID(truck.driverTruckPK);
    setReportTruckName(truck.description);
  };
  //
  const handleTrailerSelection = (truck) => {
    setTrailerID(truck.driverTrailerPK);
    setTrailerName(truck.description);
  };

  /**
   * Fetch all Active Trailer
   * Used for   Autocomplete
   */
  const fetchTrailerValues = (searchString) => {
    setTrailerLoading(true);

    DriverTrailersService.getActiveTrailersForAutocomplete(searchString, driverId)

      .then((response) => {
        const data = response.data.content || [];

        const truckList = data.map((list) => ({
          ...list,
          description: list.description?.trim(),
        }));

        setTrailerData(truckList);
      })
      .catch((error) => {
        console.error("Error fetching trailer:", error);
      })
      .finally(() => {
        setTrailerLoading(false);
      });
  };

  //validations

  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d]/g, "");
    if (value) return number;
  };

  const today = new Date();
  const fullYear = today.getFullYear();
  const twoDigitYear = String(fullYear).slice(-2);
  const month = today.getMonth() + 1;
  const allFalse =
    !contracts &&
    !guts &&
    !roadTests &&
    !plateForm &&
    !drugTestForm &&
    !physical &&
    !debitCard &&
    !welcome &&
    !arizonaPermit &&
    !reinstatement &&
    !missingItems &&
    !safetyAlert &&
    !orientationReceipt &&
    !orientationForms &&
    !annualReview &&
    !powerOfAttorney &&
    !truckMaintenanceReport;

  //Footer button Disable condition
  useEffect(() => {
    if (
      !allFalse &&
      (!powerOfAttorney ||
        (powerOfAttorney &&
          truckID &&
          truckName &&
          rentalPercentage &&
          rentalPercentage >= 0 &&
          rentalPercentage <= 100 &&
          minimumWeeklyFee &&
          minimumWeeklyFee >= 0 &&
          !lastpointer(minimumWeeklyFee) &&
          (numberOfNotaries === 1 || numberOfNotaries === 2))) &&
      (!truckMaintenanceReport ||
        (truckMaintenanceReport &&
          ((reportTruckID && reportTruckName) || (trailerID && trailerName)) &&
          formDateMM >= 1 &&
          formDateMM <= 12 &&
          formDateYY))
    ) {
      setDisablFlag(false);
    } else {
      setDisablFlag(true);
    }
  }, [
    allFalse,
    powerOfAttorney,
    truckID,
    truckName,
    rentalPercentage,
    minimumWeeklyFee,
    numberOfNotaries,
    truckMaintenanceReport,
    reportTruckID,
    reportTruckName,
    trailerID,
    trailerData,
    formDateMM,
    formDateYY,
    twoDigitYear,
  ]);

  //Footer Buttons

  const buttons = [
    {
      label: "Email Driver",
      disabled: disableFlag || loading,
      onClick: () => handleEmail("emailDriver"),
    },
    {
      label: "Email User",
      disabled: disableFlag || loading,
      onClick: () => handleEmail("emailUser"),
    },
    {
      label: "Print",
      disabled: disableFlag || loading,
      onClick: () => handleEmail("print"),
    },
  ];
  const formDate = `${formDateMM?.padStart(2, "0")}/${formDateYY}`;
  const handleEmail = (type) => {
    const payload = {
      type,
      isPrint: type === "print" ? 1 : 0,
      isEmail: type !== "print" ? 1 : 0,
      driverFK: driverId,
      beginingDate: null,
      endDate: null,
      poiTruck: truckID,
      rentalPercentage: rentalPercentage,
      maintenanceTruck: reportTruckID,
      maintenanceTrailer: trailerID,
      formDate: formDate,
      minimumWeeklyFee: minimumWeeklyFee,
      powerOfAttorney: powerOfAttorney,
      truckMaintenanceReport: truckMaintenanceReport,
      numberOfNotaries: numberOfNotaries,
      reportForms: {
        contracts: toBool(contracts),
        guts: toBool(guts),
        roadTests: toBool(roadTests),
        plateForm: toBool(plateForm),
        drugTestForm: toBool(drugTestForm),
        physical: toBool(physical),
        debitCard: toBool(debitCard),
        welcome: toBool(welcome),
        arizonaPermit: toBool(arizonaPermit),
        reinstatement: toBool(reinstatement),
        missingItems: toBool(missingItems),
        safetyAlert: toBool(safetyAlert),
        orientationReceipt: toBool(orientationReceipt),
        orientationForms: toBool(orientationForms),
        annualReview: toBool(annualReview),
      },
      towawaySheetRequired: false,
      driveawaySheetRequired: false,
      legalizationSheetRequired: false,
    };

    emailOrientationForm(payload, type);
  };

  const emailOrientationForm = (payload, type) => {
    setLoading(true);
    OrientationFormsService.saveEmailOrientationForm(payload)
      .then((res) => {
        if (res?.data?.errorCode > 0) {
          toast.error("Invalid Data");
          return;
        }
        if (type === "print") {
          const attachments = res.data.attachments;

          if (attachments && typeof attachments === "object") {
            const firstFileKey = Object.keys(attachments)[0]; // e.g. "ifta.pdf"
            const fileBase64 = attachments[firstFileKey];

            if (fileBase64) {
              setFileContent(fileBase64);
              setShowPreview(true);
              toast.success("Form generated successfully");
            } else {
              toast.error("No file content found");
            }
          } else {
            toast.error("Invalid Data");
          }
        } else {
          toast.success("Email orientation form sent successfully");
        }
      })
      .catch((err) => {
        dispatch(setOrientationFlag(false));
        toast.success("Failed to send email orientation form");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const hidepopup = () => {
    setShowPreview(false);
  };

  const formatMonth = (mm) => {
    if (mm && mm.length === 1) {
      setFormDateMM(`0${mm}`);
    }
  };

  /**
   * redirecte navigation
   **/
  useEffect(() => {
    if (orientationFlag === false) {
      navigate(`/driver-maintenance-add/${driverId}`);
    }
  }, [orientationFlag]);

  useEffect(() => {
    fetchTruckValues();
  }, []);

  return (
    <QuarterScreenWrapper>
      <Header programName="Orientation Forms" closeNavigationURL={`/driver-maintenance-add/${driverId}`} />

      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          {(loading || truckInitialLoading) && <LoadingIcon />}
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="mt-3 mx-3">
                {/* 1st Column */}
                <Col xs={3}>
                  <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                    <Col xs={6} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Contract</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${allFalse ? "borderRed" : ""}`}
                        checked={contracts}
                        onChange={(e) => {
                          setContracts(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={6} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Guts</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${allFalse ? "borderRed" : ""}`}
                        checked={guts}
                        onChange={(e) => {
                          setGuts(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={6} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Road Tests</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${allFalse ? "borderRed" : ""}`}
                        checked={roadTests}
                        onChange={(e) => {
                          setRoadTests(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={6} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Plate Form</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${allFalse ? "borderRed" : ""}`}
                        checked={plateForm}
                        onChange={(e) => {
                          setPlateForm(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={6} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Drug Test Form</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${allFalse ? "borderRed" : ""}`}
                        checked={drugTestForm}
                        onChange={(e) => {
                          setDrugTestForm(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={6} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Physical</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${allFalse ? "borderRed" : ""}`}
                        checked={physical}
                        onChange={(e) => {
                          setPhysical(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={6} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Debit Card</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${allFalse ? "borderRed" : ""}`}
                        checked={debitCard}
                        onChange={(e) => {
                          setDebitCard(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={6} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Welcome</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${allFalse ? "borderRed" : ""}`}
                        checked={welcome}
                        onChange={(e) => {
                          setWelcome(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                {/* 2nd Column */}
                <Col xs={3}>
                  <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Arizona Permit</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        className={`form-check-input p-0 ${allFalse ? "borderRed" : ""}`}
                        type="checkbox"
                        checked={arizonaPermit}
                        onChange={(e) => {
                          setArizonaPermit(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Reinstatement</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${allFalse ? "borderRed" : ""}`}
                        checked={reinstatement}
                        onChange={(e) => {
                          setReinstatement(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Missing Items</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${allFalse ? "borderRed" : ""}`}
                        checked={missingItems}
                        onChange={(e) => {
                          setMissingItems(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Safety Alert</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${allFalse ? "borderRed" : ""}`}
                        checked={safetyAlert}
                        onChange={(e) => {
                          setSafetyAlert(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Orientation Receipt</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${allFalse ? "borderRed" : ""}`}
                        checked={orientationReceipt}
                        onChange={(e) => {
                          setOrientationReceipt(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Orientation Forms</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${allFalse ? "borderRed" : ""}`}
                        checked={orientationForms}
                        onChange={(e) => {
                          setOrientationForms(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={7} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Annual Review</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${allFalse ? "borderRed" : ""}`}
                        checked={annualReview}
                        onChange={(e) => {
                          setAnnualReview(e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                {/* 3rd Column */}
                <Col xs={6}>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={5} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Power Of Attorney</Form.Label>
                    </Col>
                    <Col xs={2} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${
                          !editFormData?.towable ? "" : allFalse ? "borderRed" : ""
                        }`}
                        disabled={!editFormData?.towable || truckData.length <= 0}
                        checked={powerOfAttorney}
                        onChange={(e) => {
                          const value = e.target.checked;
                          setPowerOfAttorney(value);
                          if (!value) {
                            setRentalPercentage("");
                            setMinimumWeeklyFee("");
                            setNumberOfNotaries("");
                            setTruckID(null);
                            setTruckName("");
                          } else {
                            setMinimumWeeklyFee(100);
                            setNumberOfNotaries(1);
                          }
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={5} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Truck</Form.Label>
                    </Col>
                    <Col xs={7} className={`p-0 d-flex`}>
                      <AutoCompleteDropdown
                        arrayList={truckData}
                        searchString={truckName}
                        renderItemId={(item) => item.driverTruckPK}
                        renderItemField={(item) => item.description}
                        handleSearchString={(string) => setTruckName(string)}
                        fetchDataBySearchString={fetchTruckValues}
                        onSelect={handleTruckSelection}
                        clearInputCallback={() => {
                          setTruckID(null);
                        }}
                        selectedId={truckID}
                        loading={truckLoading}
                        disabled={!powerOfAttorney}
                        className={`customFormControl ${
                          !powerOfAttorney ? "" : truckID && truckName ? "borderGreen" : "borderRed"
                        }
                       `}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={5} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Rental Percentage</Form.Label>
                    </Col>
                    <Col xs={2} className="p-0 w-50px">
                      <Input
                        className={`customFormControl ${
                          !powerOfAttorney
                            ? ""
                            : Number(rentalPercentage) >= 0 &&
                                rentalPercentage !== "" &&
                                Number(rentalPercentage) <= 100
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        id="rntlp"
                        name="rntlprcntage"
                        type="rntlprctage"
                        value={rentalPercentage}
                        maxLength={3}
                        disabled={!powerOfAttorney}
                        autoComplete="newpassword"
                        aria-autocomplete="off"
                        onChange={(e) => {
                          setRentalPercentage(isNumber(e.target.value));
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={5} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Minimum Weekly Fee</Form.Label>
                    </Col>

                    <Col xs={2} className="p-0 w-75px">
                      <Input
                        className={`customFormControl ${
                          !powerOfAttorney
                            ? ""
                            : minimumWeeklyFee >= 0 &&
                                minimumWeeklyFee !== "" &&
                                !lastpointer(minimumWeeklyFee)
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        id="mnmweekly"
                        name="mnmweeklyfee"
                        type="mnmweekly"
                        value={minimumWeeklyFee}
                        maxLength={8}
                        disabled={!powerOfAttorney}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Allow numbers and up to one decimal point with two decimal places
                          if (/^\d*\.?\d{0,2}$/.test(value)) {
                            setMinimumWeeklyFee(value);
                          }
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={5} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Number Of Notaries</Form.Label>
                    </Col>

                    <Col xs={2} className="p-0 w-50px">
                      <Input
                        className={`customFormControl ${
                          !powerOfAttorney
                            ? ""
                            : numberOfNotaries === 1 || numberOfNotaries === 2
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        id="nofnot"
                        name="nofnotaries"
                        type="nofnot"
                        value={numberOfNotaries}
                        maxLength={1}
                        disabled={!powerOfAttorney}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^[1-2]$/.test(value)) {
                            setNumberOfNotaries(Number(value));
                          } else {
                            setNumberOfNotaries("");
                          }
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                    <Col xs={5} className="p-0">
                      <Form.Label className="col-form-label dealer-label multi-line-label">
                        Truck Maintenance Report
                      </Form.Label>
                    </Col>
                    <Col xs={7} className={`p-0 d-flex`}>
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 ${
                          !editFormData?.towable ? "" : allFalse ? "borderRed" : ""
                        }`}
                        disabled={!editFormData?.towable || truckData.length <= 0}
                        checked={truckMaintenanceReport}
                        onChange={(e) => {
                          const value = e.target.checked;
                          setTruckMaintenanceReport(value);
                          if (!value) {
                            setFormDateMM("");
                            setFormDateYY("");
                            setReportTruckID(null);
                            setReportTruckName("");
                            setTrailerID(null);
                            setTrailerName("");
                          }
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={5} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Truck</Form.Label>
                    </Col>

                    <Col xs={7} className={`p-0 d-flex`}>
                      <AutoCompleteDropdown
                        arrayList={reportTruckData}
                        searchString={reportTruckName}
                        renderItemId={(item) => item.driverTruckPK}
                        renderItemField={(item) => item.description}
                        handleSearchString={(string) => setReportTruckName(string)}
                        fetchDataBySearchString={fetchReportTruckValues}
                        onSelect={handleReportTruckSelection}
                        clearInputCallback={() => {
                          setReportTruckID(null);
                        }}
                        selectedId={reportTruckID}
                        loading={reportTruckLoading}
                        disabled={!truckMaintenanceReport || trailerID}
                        className={`customFormControl ${
                          !truckMaintenanceReport || trailerID
                            ? ""
                            : reportTruckID && reportTruckName
                              ? "borderGreen"
                              : "borderRed"
                        }
                       `}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col xs={5} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Trailer</Form.Label>
                    </Col>
                    <Col xs={7} className={`p-0 d-flex`}>
                      <AutoCompleteDropdown
                        arrayList={trailerData}
                        searchString={trailerName}
                        renderItemId={(item) => item.driverTrailerPK}
                        renderItemField={(item) => item.description}
                        handleSearchString={(string) => setTrailerName(string)}
                        fetchDataBySearchString={fetchTrailerValues}
                        onSelect={handleTrailerSelection}
                        clearInputCallback={() => {
                          setTrailerID(null);
                        }}
                        selectedId={trailerLoading}
                        loading={trailerLoading}
                        disabled={!truckMaintenanceReport || reportTruckID}
                        className={`customFormControl ${
                          !truckMaintenanceReport || reportTruckID
                            ? ""
                            : trailerID && trailerName
                              ? "borderGreen"
                              : "borderRed"
                        }
             `}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 row align-items-center m-l-0 m-r-0">
                    {/* Label */}
                    <Col xs={5} className="p-0">
                      <Form.Label className="col-form-label dealer-label">From Date</Form.Label>
                    </Col>

                    {/* MM Box */}
                    <Col xs={2} className="p-0 w-30px">
                      <Input
                        disabled={!truckMaintenanceReport}
                        className={`customFormControl ${
                          !truckMaintenanceReport
                            ? ""
                            : formDateMM >= 1 && formDateMM <= 12
                              ? "borderGreen"
                              : "borderRed"
                        }
                       `}
                        maxLength={2}
                        placeholder="MM"
                        value={formDateMM}
                        onChange={(e) => {
                          let value = e.target.value;

                          value = value.replace(/[^0-9]/g, "");

                          if (value !== "") {
                            let num = Number(value);
                            if (formDateYY < twoDigitYear || (formDateYY == twoDigitYear && num <= month)) {
                              if (num < 1) num = 1;
                              if (num > 12) num = 12;
                              setFormDateMM(num.toString());
                            }
                          } else {
                            setFormDateMM("");
                          }
                        }}
                        onBlur={(e) => {
                          formatMonth(formDateMM);
                        }}
                      />
                    </Col>

                    {/* Slash */}
                    <Col xs="auto" className="p-0 d-flex justify-content-center" style={{ width: "20px" }}>
                      <span style={{ fontSize: "18px", fontWeight: "bold" }}>/</span>
                    </Col>

                    {/* YY Box */}
                    <Col xs={2} className="p-0 w-30px">
                      <Input
                        maxLength={2}
                        disabled={!truckMaintenanceReport}
                        placeholder="YY"
                        className={`customFormControl ${
                          !truckMaintenanceReport
                            ? ""
                            : formDateYY && formDateYY <= twoDigitYear
                              ? "borderGreen"
                              : "borderRed"
                        }
                             `}
                        value={formDateYY}
                        onChange={(e) => {
                          let value = e.target.value;
                          value = value.replace(/[^0-9]/g, "");
                          if (value !== "") {
                            let num = value;
                            if (Number(num) > Number(twoDigitYear)) num = twoDigitYear;
                            if (Number(num) === Number(twoDigitYear) && Number(month) < Number(formDateMM))
                              formatMonth(month.toString());
                            setFormDateYY(num.toString());
                          } else {
                            setFormDateYY("");
                          }
                        }}
                        onBlur={(e) => {
                          if (formDateYY && formDateYY.length === 1) {
                            setFormDateYY(`0${formDateYY}`);
                          }
                        }}
                      />
                    </Col>
                    <PreviewPopup show={showPreview} base64PDF={fileContent} onHide={hidepopup} />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <CommonFooter buttons={buttons} />
    </QuarterScreenWrapper>
  );
};

export default Orientation;
