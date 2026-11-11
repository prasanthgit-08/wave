import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import * as yup from "yup";
import { useFormik } from "formik";
import DriverService from "../../../../services/DriverService";
import DriverLookup from "../../../LookupScreens/Driver/DriverLookup";
import ReportComponent from "../../../common/ReportComponent";

const validationSchema = yup.object().shape({
  driver: yup.number().required(),
  driverInput: yup.string().required(),
});

const DriverRecruitReport = () => {
  const formik = useFormik({
    initialValues: {
      driver: null,
      driverInput: "",
    },
    validationSchema: validationSchema,
  });

  const [driverList, setDriverList] = useState([]);
  const [showDriverLookup, setShowDriverLookup] = useState(false);
  const [isButtonValid, setIsButtonValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const DRIVER_RECRUIT_REPORT_ID = process.env.REACT_APP_SP_DRIVER_RECRUIT_REPORT;

  const { values, setValues, setFieldValue, initialValues } = formik;

  const { driver, driverInput } = values;

  //API for fetching driver data
  const fetchDriverList = (string) => {
    const returnFormData = {
      type: "Autocomplete",
      pageNumber: 0,
      pageSize: 20,
      sortValue: null,
      sortType: true,
      searchTerm: string,
      searchCriteria: "Beginning",
    };
    setLoading(true);
    DriverService.getDriverForAutoAndLookUP(returnFormData)
      .then((response) => {
        setDriverList(response?.data?.slice(0, response?.data?.length - 1));
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  //Lookup Selection
  const handleDriverLookupSelection = (driver) => {
    setValues({
      ...values,
      driver: driver?.DriverPK || driver?.driverPK,
      driverInput: driver?.driverName?.trim() || driver?.DriverName?.trim(),
    });
    setShowDriverLookup(false);
  };

  //buttonValidation
  useEffect(() => {
    if (driver || !driverInput) {
      setIsButtonValid(true);
    } else {
      setIsButtonValid(false);
    }
  }, [driver, driverInput]);

  const params = {
    DriverPK: driver || null,
  };

  const body = (
    <>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-5 w-100 mt-0">
              <Form.Group className={` m-b-10 align-items-center row  m-l-120 m-r-0 m-t-75 `}>
                <Col sm={1} md={1} xs={1} className="p-0">
                  <Form.Label className="col-form-label  ">Driver</Form.Label>
                </Col>
                <Col xs={5} md={5} sm={5} className="d-flex ">
                  {/*  Autocomplete */}
                  <AutoCompleteDropdown
                    className={`customFormControl ${driver || !driverInput ? "" : "borderRed"}`}
                    arrayList={driverList}
                    searchString={driverInput}
                    handleSearchString={(string) => setFieldValue("driverInput", string)}
                    renderItemId={(item) => item?.DriverPK}
                    renderItemField={(item) => item?.DriverName}
                    fetchDataBySearchString={(value) => fetchDriverList(value)}
                    onSelect={handleDriverLookupSelection}
                    selectedId={driver}
                    clearInputCallback={() => {
                      setFieldValue("driver", null);
                    }}
                    loading={loading}
                  />
                  <LookupButton
                    onClick={() => {
                      setShowDriverLookup(true);
                    }}
                  />
                </Col>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
      <DriverLookup
        show={showDriverLookup}
        onHide={() => {
          setShowDriverLookup(false);
        }}
        showActiveOnly
        renderItemId={(driver) => driver.driverPK}
        renderItemField={(driver) => driver.driverName}
        handleLookupSelection={handleDriverLookupSelection}
        recruitingDriver
      />
    </>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        setValues(initialValues);
      }}
      id={DRIVER_RECRUIT_REPORT_ID}
      formik={formik}
      isTabValid={isButtonValid}
      payload={params}
      useType={true}
    />
  );
};

export default DriverRecruitReport;
