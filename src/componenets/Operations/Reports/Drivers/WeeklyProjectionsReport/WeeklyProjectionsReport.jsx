import { parseLocalDate } from "../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
import * as yup from "yup";
import { useFormik } from "formik";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";
import DateInputField from "../../../../common/DateInputField";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import RegionsLookup from "../../../../LookupScreens/Regions/RegionsLookup";
import DriverService from "../../../../../services/DriverService";
import ReportComponent from "../../../../common/ReportComponent";
import { date } from "zod";
import WeeklyProjectionReportService from "../../../../../services/Reports/WeeklyProjectionReportService";
import LoadingIcon from "../../../../common/LoadingIcon";
import { validateDecimalInput } from "../../../../../utils/utils";

const validationSchema = yup.object().shape({
  division: yup.string(),
  source: yup.string(),
  beginningDate: yup.date(),
  endDate: yup.date(),
  regionPK: yup.number(),
  regionInput: yup.string(),
  fuelCost: yup.number(),
  fuelMpg: yup.number(),
  liscenceType: yup.string(),
});

const WeeklyProjectionsReport = () => {
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [isFuelCostValid, setIsFuelCostValid] = useState(true);
  const [isFuelMpgValid, setIsFuelMpgValid] = useState(true);
  const [isTabValid, setIsTabValid] = useState(false);
  const [showRegionLookup, setShowRegionLookup] = useState(false);
  const [regionLoading, setRegionLoading] = useState(false);
  const [regionData, setRegionData] = useState([]);
  const [defaultFuelCost, setDefaultFuelCost] = useState(null);
  const [defaultFuelMpg, setDefaultFuelMpg] = useState(null);
  const [fuelFlag, setFuelFlag] = useState(null);
  const [loading, setloading] = useState(true);
  const WEEKLY_PROJECTION_REPORT_ID = process.env.REACT_APP_SP_WEEKLY_PROJECTION_REPORT;

  const formik = useFormik({
    initialValues: {
      division: "All",
      source: "Both",
      beginningDate: new Date(),
      endDate: new Date(),
      regionPK: null,
      regionInput: "",
      fuelCost: null,
      fuelMpg: null,
      liscenceType: "All",
    },
    validationSchema: validationSchema,
  });

  const { values, setValues, setFieldValue, initialValues } = formik;

  const { division, source, beginningDate, endDate, regionPK, regionInput, fuelCost, fuelMpg, liscenceType } =
    values;

  useEffect(() => {
    if (!division) return;

    const fuelDivision = division === "Driveaway" ? "Driveaway" : "Towaway";
    setFuelFlag(null);
    setloading(true);
    WeeklyProjectionReportService.getFuelDetails(fuelDivision)
      .then((res) => {
        const data = res?.data?.[0];
        const fuelCost = data?.TowableWeeklyFuel || data?.DriveawayWeeklyFuel;
        const fuelMpg = data?.TowableWeeklyMileage || data?.DriveawayWeeklyMileage;

        setDefaultFuelCost(fuelCost);
        setDefaultFuelMpg(fuelMpg);
        setFieldValue("fuelCost", fuelCost);
        setFieldValue("fuelMpg", fuelMpg);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setloading(false);
      });
  }, [division]);

  const fetchRegionValues = (string) => {
    setRegionLoading(true);
    DriverService.getAllRegionsByName(string)
      .then((response) => {
        const data = response.data.content;
        const regionList = data?.map((region) => ({
          ...region,
          regionCode: region.regionCode?.trim(),
        }));
        setRegionData(regionList);
        setRegionLoading(false);
      })
      .catch((err) => {
        setRegionLoading(false);
        console.log(err);
      });
  };

  const handleRegionLookupSelection = (item) => {
    setValues({
      ...values,
      regionPK: item.regionPK,
      regionInput: item.regionCode?.trim(),
    });
    setShowRegionLookup(false);
  };

  const params = {
    Division: division,
    Source: source,
    BeginingDate: formatDatetimeToDate(beginningDate),
    EndDate: formatDatetimeToDate(endDate),
    RegionPK: regionPK,
    FuelCost: fuelCost ? fuelCost : 0,
    FuelMPG: fuelMpg ? fuelMpg : 0,
    LicenseType: liscenceType,
    FuelFlag: fuelFlag,
  };

  //tab validation
  useEffect(() => {
    if (
      beginningDate &&
      isBeginningDateValid &&
      endDate &&
      isEndDateValid &&
      isFuelMpgValid &&
      isFuelCostValid &&
      (regionPK || !regionInput)
    ) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [
    beginningDate,
    isBeginningDateValid,
    endDate,
    isEndDateValid,
    isFuelMpgValid,
    isFuelCostValid,
    regionPK,
    regionInput,
  ]);

  const body = (
    <>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          {loading && <LoadingIcon />}
          <div className="m-b-10">
            <div className="p-5 w-100 mt-0 m-l-5">
              <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3 mt-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Division</Form.Label>
                </Col>

                <Col xs={8} className="p-0 m-l-10">
                  <CustomRadioGroup
                    name="division"
                    horizontal
                    horizontalAlignmentClassName="pe-4"
                    selectedOption={division}
                    onChange={(value) => setFieldValue("division", value)}
                    options={[
                      { value: "All", label: "All", width: "70px" },
                      { value: "Driveaway", label: "Driveaway", disabled: false },
                      { value: "Towaway", label: "Towaway", disabled: false },
                      { value: "Single", label: "Single", disabled: false },
                      { value: "Flatbed", label: "Flatbed", disabled: false },
                      { value: "PopUp", label: "Pop Up    ", disabled: false },
                      { value: "TruckCamper", label: "Truck Camper", disabled: false },
                    ]}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Source</Form.Label>
                </Col>

                <Col sm={8} md={8} xs={8} className="p-0 m-l-10">
                  <CustomRadioGroup
                    name="source"
                    horizontal
                    horizontalAlignmentClassName="pe-3"
                    selectedOption={source}
                    onChange={(value) => setFieldValue("source", value)}
                    options={[
                      { value: "Both", label: "Both", width: "70px" },
                      { value: "Outbound", label: "Outbound", width: "95px" },
                      { value: "Reload", label: "Reload", disabled: false },
                    ]}
                  />
                </Col>
              </Form.Group>

              <Form.Group className={` m-b-10 align-items-center row  m-l-10 m-r-0 mt-3 `}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label  ">Beginning Date</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="" style={{ maxWidth: "120px" }}>
                  <DateInputField
                    date={beginningDate}
                    max={endDate && parseLocalDate(endDate)}
                    setDate={(date) => {
                      setFieldValue("beginningDate", date);
                    }}
                    setIsDateValid={setIsBeginningDateValid}
                    className={beginningDate && isBeginningDateValid ? "borderGreen" : "borderRed"}
                  />
                </Col>
              </Form.Group>

              <Form.Group className={` m-b-10 align-items-center row  m-l-10 m-r-0 mt-3 `}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label  ">End Date</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="" style={{ maxWidth: "120px" }}>
                  <DateInputField
                    min={beginningDate && parseLocalDate(beginningDate)}
                    max={new Date()}
                    date={endDate}
                    setDate={(date) => setFieldValue("endDate", date)}
                    setIsDateValid={setIsEndDateValid}
                    className={endDate && isEndDateValid ? "borderGreen" : "borderRed"}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-10 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Region</Form.Label>
                </Col>
                <Col xs={4} md={4} sm={4} className={`p-0 d-flex m-l-10`}>
                  <AutoCompleteDropdown
                    arrayList={regionData}
                    searchString={regionInput}
                    renderItemId={(region) => region.regionPK}
                    renderItemField={(region) => region.regionCode}
                    handleSearchString={(string) => setFieldValue("regionInput", string)}
                    fetchDataBySearchString={fetchRegionValues}
                    onSelect={handleRegionLookupSelection}
                    clearInputCallback={() => {
                      setFieldValue("regionPK", null);
                    }}
                    loading={regionLoading}
                    selectedId={regionPK}
                    // disabled={}
                    className={`customFormControl ${regionPK || !regionInput ? "" : "borderRed"}`}
                  />
                  <LookupButton
                    onClick={() => {
                      setShowRegionLookup(true);
                    }}
                    //  disabled={viewDetail}
                  />
                </Col>
              </Form.Group>

              <Form.Group className={`mt-3 m-b-10 align-items-center row  m-l-10 m-r-0 mt-2`}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="fineAmount" className="col-form-label">
                    Fuel Cost
                  </Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} style={{ maxWidth: "90px" }}>
                  <input
                    className={`customFormControl  ${!isFuelCostValid ? "borderRed" : ""}`}
                    id="fuelcost"
                    name="fuelcost"
                    type="search"
                    value={fuelCost}
                    maxLength={8}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Regex (5,2)
                      if (!value.match(/^\d{0,3}(\.\d{0,2})?$/)) return;
                      // pointer validation
                      const valid = validateDecimalInput(value);
                      setIsFuelCostValid(valid);
                      setFieldValue("fuelCost", value);
                      if (valid) {
                        if (defaultFuelCost !== null && value !== String(defaultFuelCost)) {
                          setFuelFlag(true);
                        } else if (value === String(defaultFuelCost) && fuelCost === String(defaultFuelMpg)) {
                          setFuelFlag(null);
                        }
                      }
                    }}
                    // onBlur={()=>handleFineAmountBlur()}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>

              <Form.Group className={`mt-3 m-b-10 align-items-center row  m-l-10 m-r-0`}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="fuelMpg" className="col-form-label">
                    Fuel MPG
                  </Form.Label>
                </Col>
                <Col xs={3} md={3} sm={3} style={{ maxWidth: "90px" }}>
                  <input
                    className={`customFormControl ${!isFuelMpgValid ? "borderRed" : ""}`}
                    id="fuelMpg"
                    name="fuelMpg"
                    type="search"
                    value={fuelMpg}
                    maxLength={8}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Regex (5,2)
                      if (!value.match(/^\d{0,3}(\.\d{0,2})?$/)) return;
                      // pointer validation
                      const valid = validateDecimalInput(value);
                      setIsFuelMpgValid(valid);
                      setFieldValue("fuelMpg", value);
                      if (valid) {
                        if (defaultFuelMpg !== null && value !== String(defaultFuelMpg)) {
                          setFuelFlag(true);
                        } else if (value === String(defaultFuelMpg) && fuelCost === String(defaultFuelCost)) {
                          setFuelFlag(null);
                        }
                      }
                    }}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3 mt-3">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">License Type</Form.Label>
                </Col>

                <Col sm={8} md={8} xs={8} className="p-0 m-l-10">
                  <CustomRadioGroup
                    name="liscenceType"
                    horizontal
                    horizontalAlignmentClassName="pe-3"
                    selectedOption={liscenceType}
                    onChange={(value) => setFieldValue("liscenceType", value)}
                    options={[
                      { value: "All", label: "ALL", width: "70px" },
                      { value: "CDLA", label: "CDLA", width: "70px" },
                      { value: "NO CDL", label: "NO CDL", disabled: false },
                    ]}
                  />
                </Col>
              </Form.Group>

              <RegionsLookup
                show={showRegionLookup}
                onHide={() => setShowRegionLookup(false)}
                renderItemId={(regions) => regions.regionPK}
                handleLookupSelection={handleRegionLookupSelection}
                MaintenanceProgram
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        setValues(initialValues);
        setFieldValue("beginningDate", new Date());
        setFieldValue("endDate", new Date());
        setFieldValue("fuelCost", defaultFuelCost);
        setFieldValue("fuelMpg", defaultFuelMpg);
      }}
      id={WEEKLY_PROJECTION_REPORT_ID}
      isTabValid={isTabValid}
      payload={params}
    />
  );
};

export default WeeklyProjectionsReport;
