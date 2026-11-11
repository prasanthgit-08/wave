import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import DriverService from "../../../../../services/DriverService";
import DriverLookup from "../../../../LookupScreens/Driver/DriverLookup";
import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import ReportComponent from "../../../../common/ReportComponent";

const validationSchema = yup.object().shape({
  driver: yup.number().required(),
  driverInput: yup.string().required(),
});

const OutstandingDriverSettlementReport = () => {
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
  const [driverLoading, setDriverLoading] = useState(false);
  const OUTSTANDING_DRIVER_SETTLEMENT_REPORT_ID =
    process.env.REACT_APP_SP_OUTSTANDING_DRIVER_SETTLEMENT_REPORT;

  const { values, setValues, setFieldValue, initialValues } = formik;

  const { driver, driverInput } = values;

  const fetchDriverList = (string) => {
    setDriverLoading(true);
    const returnFormData = [
      string,
      "All",
      "All",
      "Mailing",
      0,
      "Beginning",
      null,
      null,
      null,
      false,
      "",
      {
        dba: false,
        address: false,
        ssn: false,
        phone: false,
        email: false,
        vin: false,
        licensePlate: false,
        nickName: false,
        driversLicense: false,
        notes: false,
      },
      100,
    ];
    DriverService.getAllDriversForMaintenance(...returnFormData)
      .then((response) => {
        const data = response.data.content;
        const driverList = data?.map((item) => ({
          ...item,
          name: item.name?.trim(),
          firstName: item.firstName,
          lastName: item.lastName,
        }));

        setDriverList(driverList);
      })
      .catch((err) => {})
      .finally(() => {
        setDriverLoading(false);
      });
  };

  //Lookup Selection
  const handleDriverLookupSelection = (driver) => {
    setValues({
      ...values,
      driver: driver?.DriverPK || driver?.driverPK,
      driverInput: `${driver.firstName?.trim() || ""} ${driver.lastName?.trim() || ""}`?.trim(),
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
    DriverFK: driver || null,
  };

  const body = (
    <>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-5 w-100 mt-0">
              <Form.Group className={` m-b-10 align-items-center row  m-l-100 m-r-0 m-t-75 `}>
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
                    renderItemId={(item) => item?.driverPK}
                    renderItemField={(item) =>
                      `${item.firstName?.trim() || ""} ${item.lastName?.trim() || ""}`?.trim()
                    }
                    fetchDataBySearchString={(value) => fetchDriverList(value)}
                    onSelect={handleDriverLookupSelection}
                    selectedId={driver}
                    clearInputCallback={() => {
                      setFieldValue("driver", null);
                    }}
                    loading={driverLoading}
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
        renderItemId={(driver) => driver.driverPK}
        handleLookupSelection={handleDriverLookupSelection}
        MaintenanceProgram
      />
    </>
  );
  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        setValues(initialValues);
      }}
      id={OUTSTANDING_DRIVER_SETTLEMENT_REPORT_ID}
      formik={formik}
      isTabValid={isButtonValid}
      payload={params}
    />
  );
};

export default OutstandingDriverSettlementReport;
