import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import { useFormik } from "formik";
import DateInputField from "../../../common/DateInputField";
import * as yup from "yup";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import BlockedLogReportService from "../../../../services/Reports/BlockedLogReportService";
import UserLookup from "../../../LookupScreens/User/UserLookup";
import ReportComponent from "../../../common/ReportComponent";
import UsersService from "../../../../services/UsersService";
import { useSelector } from "react-redux";
import formatDatetimeToDate from "../../../../utils/formatDateTimeToDate";

const validationSchema = yup.object().shape({
  division: yup.string(),
  source: yup.string(),
  beginningDate: yup.date(),
  endDate: yup.date(),
  printOrder: yup.string(),
  dispatcherPK: yup.string(),
  dispatcherName: yup.string(),
  dispatcherInput: yup.string(),
});

const DriverTripSummaryReport = () => {
  const [isBeginningDateValid, setIsBeginningDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  const [dispatcherLoader, setDispatcherLoader] = useState(false);
  const [dispatchUserData, setDispatchUserData] = useState([]);
  const [showDispatcherLookUp, setShowDispatcherLookUp] = useState(false);
  const [isTabValid, setIsTabValid] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;
  const DRIVER_TRIP_SUMMARY_REPORT_ID = process.env.REACT_APP_SP_DRIVER_TRIP_SUMMARY_REPORT;

  const searchTerms = useSelector((state) => state.userLookupReducer.searchTerms);

  const formik = useFormik({
    initialValues: {
      division: "ALL",
      source: "Both",
      beginningDate: new Date(),
      endDate: new Date(),
      printOrder: "Units",
      dispatcherPK: null,
      dispatcherName: "",
      dispatcherInput: "",
    },
    validationSchema: validationSchema,
  });

  const { values, setValues, setFieldValue, initialValues } = formik;

  const {
    division,
    source,
    beginningDate,
    endDate,
    printOrder,
    dispatcherPK,
    dispatcherName,
    dispatcherInput,
  } = values;

  const params = {
    Division: division,
    Source: source,
    BeginningDate: formatDatetimeToDate(beginningDate),
    EndDate: formatDatetimeToDate(endDate),
    DispatcherPK: dispatcherPK,
    PrintOrder: printOrder,
    UserFK: userPK,
  };

  const getDispatchUser = (string) => {
    setDispatcherLoader(true);
    UsersService.getAllUsers(
      "Active",
      0,
      null,
      "Beginning",
      null,
      string,
      null,
      false,
      "Actual",
      undefined,
      undefined,
      undefined,
      true
    )
      .then((response) => {
        const data = response.data?.content;
        if (data && data.length > 0 && data[0].Empty === true) {
          setDispatchUserData([]);
        } else {
          setDispatchUserData(data);
        }
      })
      .finally(() => {
        setDispatcherLoader(false);
      });
  };

  const handleDispatcherSelection = (item) => {
    setValues({
      ...values,
      dispatcherPK: item.UserPK || item.userPK,
      dispatcherName: item.Name || item.name,
      dispatcherInput: item.Name?.trim() || item.name?.trim(),
    });
    setShowDispatcherLookUp(false);
  };

  //tab validation
  useEffect(() => {
    if (
      beginningDate &&
      isBeginningDateValid &&
      endDate &&
      isEndDateValid &&
      (!dispatcherInput || dispatcherPK)
    ) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [beginningDate, isBeginningDateValid, endDate, isEndDateValid, dispatcherPK, dispatcherInput]);

  const body = (
    <>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
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
                      { value: "ALL", label: "All", width: "70px" },
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

              {/* Dispatcher */}
              <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3 mt-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Dispatcher</Form.Label>
                </Col>
                <Col xs={5} className="p-0 d-flex m-l-10 w-275px">
                  <AutoCompleteDropdown
                    arrayList={dispatchUserData}
                    searchString={dispatcherInput}
                    renderItemId={(item) => item.userPK}
                    renderItemField={(item) => item.name}
                    handleSearchString={(string) => setFieldValue("dispatcherInput", string)}
                    fetchDataBySearchString={getDispatchUser}
                    onSelect={handleDispatcherSelection}
                    selectedId={dispatcherPK}
                    clearInputCallback={() => setFieldValue("dispatcherPK", null)}
                    handleAutoCompleteClose={() => setFieldValue("dispatcherPK", null)}
                    className={dispatcherPK || !dispatcherInput ? "" : "borderRed"}
                    loading={dispatcherLoader}
                    maxHeight="200px"
                  />
                  <LookupButton
                    onClick={() => {
                      setShowDispatcherLookUp(true);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="form-group align-items-center row m-l-10 m-r-0 mb-3">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Print Order</Form.Label>
                </Col>

                <Col sm={8} md={8} xs={8} className="p-0 m-l-10">
                  <CustomRadioGroup
                    name="printOrder"
                    horizontal
                    horizontalAlignmentClassName="pe-3"
                    selectedOption={printOrder}
                    onChange={(value) => setFieldValue("printOrder", value)}
                    options={[
                      { value: "Units", label: "Units", width: "70px" },
                      { value: "Miles", label: "Miles", width: "70px" },
                      { value: "Rank", label: "Rank", disabled: false },
                      { value: "Name", label: "Name" },
                    ]}
                  />
                </Col>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
      <UserLookup
        show={showDispatcherLookUp}
        onHide={() => setShowDispatcherLookUp(false)}
        renderItemId={(user) => user.userPK}
        handleLookupSelection={handleDispatcherSelection}
        DispatchUserFilter
      />
    </>
  );
  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        setValues(initialValues);
      }}
      id={DRIVER_TRIP_SUMMARY_REPORT_ID}
      isTabValid={isTabValid}
      payload={params}
    />
  );
};

export default DriverTripSummaryReport;
