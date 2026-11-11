import { parseLocalDate } from "../../../../../utils/dateUtils";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import * as yup from "yup";
import DateInputField from "../../../../common/DateInputField";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import CompanyService from "../../../../../services/CompanyService";
import LookupButton from "../../../../common/LookupButton";
import ReportComponent from "../../../../common/ReportComponent";
import DriverService from "../../../../../services/DriverService";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import DriverLookup from "../../../../LookupScreens/Driver/DriverLookup";
import YardLookup from "../../../../LookupScreens/Yard/YardLookup";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";
import LoadingIcon from "../../../../common/LoadingIcon";

const validationSchema = yup.object().shape({
  beginningDate: yup.date(),
  endDate: yup.date(),
  unitNumber: yup.number(),
  driverPK: yup.number(),
  driverInput: yup.string(),
  yardPK: yup.number(),
  yardInput: yup.string(),
});

const ShuttleReport = () => {
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [isTabValid, setIsTabValid] = useState(false);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [driverLoader, setDriverLoader] = useState(false);
  const [driverList, setDriverList] = useState([]);
  const [yardList, setYardList] = useState([]);
  const [showDriverLookUp, setShowDriverLookUp] = useState(false);
  const [showYardLookUp, setShowYardLookUp] = useState(false);
  const [yardLoading, setYardLoading] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);
  const SHUTTLE_REPORT_ID = process.env.REACT_APP_SP_SHUTTLE_REPORT;

  const fetchCompanyName = () => {
    setCompanyLoading(true);
    CompanyService.getCompanyData()
      .then((res) => {
        setSelectedCompanyName(res?.data?.name);
      })
      .catch(() => {})
      .finally(() => setCompanyLoading(false));
  };

  useEffect(() => {
    fetchCompanyName();
  }, []);

  const formik = useFormik({
    initialValues: {
      beginningDate: new Date(),
      endDate: new Date(),
      unitNumber: "",
      driverPK: null,
      driverInput: "",
      yardPK: null,
      yardInput: "",
    },
    validationSchema: validationSchema,
  });

  const { values, setValues, setFieldValue, initialValues } = formik;

  const { beginningDate, endDate, unitNumber, driverPK, driverInput, yardPK, yardInput } = values;

  const fetchDrivers = (string) => {
    setDriverLoader(true);
    DriverService.getDriverShuttleForAutoAndLookUP({
      type: "AutoComplete",
      pageNumber: 0,
      pageSize: 100,
      sortValue: "",
      sortType: false,
      searchTerm: string,
      searchCriteria: "Beginning",
      driverType: "All",
      statusType: "All",
      cityType: "Mailing",
      firstField: "",
      secondField: "",
      thirdField: "",
      fourthField: "",
      advancedSearchString: "",
      all: false,
      dba: false,
      address: false,
      ssnOrEin: false,
      phone: false,
      email: false,
      vin: false,
      licensePlate: false,
      nickName: false,
      driversLicense: false,
      notes: false,
      firstName: "",
      lastName: "",
      city: "",
      state: "",
    })
      .then((response) => {
        const data = response.data;
        const driverList = data?.map((item) => ({
          ...item,
          driverInput: data?.DriverName,
          driverPK: data?.DriverPK,
        }));

        setDriverList(driverList);
      })
      .catch((err) => {})
      .finally(() => {
        setDriverLoader(false);
      });
  };

  const handleDriverAutoSelection = (driver) => {
    setValues({
      ...values,
      driverInput: driver?.DriverName,
      driverPK: driver?.DriverPK,
    });
  };

  const handleDriverLookupSelection = (driver) => {
    setValues({
      ...values,
      driverInput: driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : ""),
      driverPK: driver?.driverPK,
    });
    setShowDriverLookUp(false);
  };

  const fetchAllYards = (string) => {
    setYardLoading(true);
    YardCheckinService.getShuttleYardByName(string, selectedCompanyName)
      .then((response) => {
        const data = response.data.content;
        const yardsList = data?.map((yards) => ({ ...yards, description: yards.description?.trim() }));
        setYardList(yardsList);
        setYardLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setYardLoading(false);
      });
  };

  const handleYardLookupSelection = (yard) => {
    setValues({
      ...values,
      yardInput: yard?.description,
      yardPK: yard?.yardPK,
    });
    setShowYardLookUp(false);
  };

  const params = {
    BeginningDate: formatDatetimeToDate(beginningDate),
    EndDate: formatDatetimeToDate(endDate),
    UnitNumber: unitNumber,
    DriverPK: driverPK,
    YardPK: yardPK,
  };

  useEffect(() => {
    if (
      beginningDate &&
      isBeginningDateValid &&
      endDate &&
      isEndDateValid &&
      (driverPK || !driverInput) &&
      (yardPK || !yardInput)
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
    driverPK,
    driverInput,
    yardPK,
    yardInput,
  ]);

  const body = (
    <div className="w-100 p-2">
      {companyLoading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-5 w-100 mt-0 m-l-5">
            <Form.Group className={` m-b-10 align-items-center row  m-l-5 m-r-0 mt-3 `}>
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

            <Form.Group className={` m-b-10 align-items-center row  m-l-5 m-r-0 mt-3 `}>
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
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-5 m-r-0 mt-3">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Unit Number</Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0 m-l-12 w-240px">
                <input
                  type="text"
                  className={`customFormControl`}
                  value={unitNumber}
                  id="unitNumber"
                  name="unitNumber"
                  maxLength={30}
                  autoComplete="new-password"
                  aria-autocomplete="new-password"
                  onChange={(e) => setFieldValue("unitNumber", e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group className={`mt-3 m-b-10 align-items-center row  m-l-5 m-r-0 `}>
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label m-l-0 ">Driver </Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="d-flex">
                {/* Driver Autocomplete */}
                <AutoCompleteDropdown
                  // className="customFormControl"
                  className={`customFormControl ${driverPK || !driverInput ? "" : "borderRed"}`}
                  arrayList={driverList}
                  searchString={driverInput}
                  renderItemId={(data) => data.DriverPK}
                  renderItemField={(data) => data?.DriverName}
                  handleSearchString={(string) => setFieldValue("driverInput", string)}
                  fetchDataBySearchString={fetchDrivers}
                  onSelect={handleDriverAutoSelection}
                  selectedId={driverPK}
                  clearInputCallback={() => {
                    setFieldValue("driverPK", null);
                  }}
                  loading={driverLoader}
                />
                <LookupButton
                  onClick={() => {
                    setShowDriverLookUp(true);
                  }}
                />
              </Col>
            </Form.Group>

            {/***  Pickup Yard ***/}
            <Form.Group className="mt-3 form-group  align-items-center row  m-l-5 m-r-0">
              <Col xs={2} sm={2} className="p-0 text-start">
                <Form.Label className="col-form-label me-4">Yard</Form.Label>
              </Col>

              <Col xs={4} md={4} sm={4} className=" d-flex">
                <AutoCompleteDropdown
                  arrayList={yardList}
                  searchString={yardInput}
                  renderItemId={(pickupYards) => pickupYards.yardPK}
                  renderItemField={(pickupYards) => pickupYards.description}
                  handleSearchString={(string) => setFieldValue("yardInput", string)}
                  fetchDataBySearchString={fetchAllYards}
                  onSelect={handleYardLookupSelection}
                  loading={yardLoading}
                  selectedId={yardPK}
                  clearInputCallback={() => {
                    setFieldValue("yardPK", null);
                  }}
                  maxHeight="200px"
                  className={`customFormControl ${yardPK || !yardInput ? "" : "borderRed"}`}
                />
                <LookupButton
                  onClick={() => {
                    setShowYardLookUp(true);
                  }}
                />
              </Col>
            </Form.Group>
          </div>
        </div>
        <DriverLookup
          show={showDriverLookUp}
          onHide={() => setShowDriverLookUp(false)}
          renderItemId={(driver) => driver.driverPK}
          handleLookupSelection={handleDriverLookupSelection}
          shuttleReport
        />
        <YardLookup
          show={showYardLookUp}
          onHide={() => setShowYardLookUp(false)}
          renderItemId={(pickupYards) => pickupYards.yardPK}
          handleLookupSelection={handleYardLookupSelection}
          shuttle
          selectedCompanyName={selectedCompanyName}
        />
      </div>
    </div>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        setValues(initialValues);
      }}
      id={SHUTTLE_REPORT_ID}
      isTabValid={isTabValid}
      payload={params}
    />
  );
};

export default ShuttleReport;
