import React, { useEffect, useState } from "react";
import ReportComponent from "../../../common/ReportComponent";
import { Col, Form } from "react-bootstrap";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import * as yup from "yup";
import { useFormik } from "formik";
import LookupButton from "../../../common/LookupButton";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import CustomerService from "../../../../services/CustomerService";
import CustomerPlantsLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import CustomerPlantMaintenanceService from "../../../../services/CustomerPlantMaintenanceService";

const validationSchema = yup.object().shape({
  division: yup.string(),
  source: yup.string(),
  customerPK: yup.number(),
  customerInput: yup.string(),
  plantPK: yup.number(),
  plantInput: yup.string(),
});

const CustomerActivitySummaryReport = () => {
  const [customerList, setCustomerList] = useState([]);
  const [plantList, setPlantList] = useState([]);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [plantLoading, setPlantLoading] = useState(false);
  const [showCustomerLookUp, setshowCustomerLookUp] = useState(false);
  const [showplantLookUp, setShowplantLookUp] = useState(false);
  const [isTabValid, setIsTabValid] = useState(false);
  const CUSTOMER_ACTIVITY_SUMMARY_REPORT_ID = process.env.REACT_APP_SP_CUSTOMER_ACTIVITY_SUMMARY_REPORT;

  const formik = useFormik({
    initialValues: {
      division: "all",
      source: "both",
      customerPK: null,
      customerInput: "",
      plantPK: null,
      plantInput: "",
      buttonDisabled: false,
    },
    validationSchema: validationSchema,
  });

  const { values, setValues, setFieldValue, initialValues } = formik;

  const { division, source, customerPK, customerInput, plantPK, plantInput, buttonDisabled } = values;

  const fetchCustomersList = (string) => {
    setCustomerLoading(true);
    CustomerService.getAllCustomersForLookupReport(
      plantPK,
      "Beginning",
      string,
      0,
      null,
      false,
      "Autocomplete",
      100
    )
      .then((response) => {
        const data = response.data;
        setCustomerList(data);
      })
      .catch((err) => {})
      .finally(() => {
        setCustomerLoading(false);
      });
  };

  const handleCustomerLookupSelection = (customer) => {
    setValues({
      ...values,
      customerPK: customer?.CustomerPK,
      customerInput: customer?.Name || customer?.Description?.trim(),
      buttonDisabled: customer?.ButtonDisable,
    });
    setshowCustomerLookUp(false);
  };

  const fetchPlantsList = (string) => {
    setPlantLoading(true);
    CustomerPlantMaintenanceService.getCustomerPlantsForReport(
      customerPK,
      "Beginning",
      string,
      0,
      null,
      false,
      "Autocomplete",
      100
    )
      .then((response) => {
        const data = response.data;
        setPlantList(response?.data?.slice(0, response?.data?.length - 1));
      })
      .catch((err) => {})
      .finally(() => {
        setPlantLoading(false);
      });
  };

  const handlePlantLookupSelection = (plant) => {
    setValues({
      ...values,
      plantPK: plant?.CustomerPlantPK,
      plantInput: plant?.Name?.trim(),
    });
    setShowplantLookUp(false);
  };

  const params = {
    Division: division,
    Source: source,
    CustomerPK: customerPK,
    PlantPK: plantPK,
  };

  useEffect(() => {
    if (customerPK && (plantPK || !plantInput)) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [customerPK, plantPK, plantInput]);

  const body = (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-5 w-100 mt-0 m-l-5">
            <Form.Group className="form-group align-items-center row m-l-5 m-r-0 mb-3 mt-3">
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
                    { value: "all", label: "All", width: "70px" },
                    { value: "driveaway", label: "Driveaway", disabled: false },
                    { value: "towaway", label: "Towaway", disabled: false },
                    { value: "single", label: "Single", disabled: false },
                    { value: "flatbed", label: "Flatbed", disabled: false },
                    { value: "popUp", label: "Pop Up    ", disabled: false },
                    {
                      value: "truckCamper",
                      label: "Truck Camper",
                      disabled: false,
                    },
                  ]}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-5 m-r-0 mb-3">
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
                    { value: "both", label: "Both", width: "70px" },
                    { value: "outbound", label: "Outbound", width: "95px" },
                    { value: "reload", label: "Reload", disabled: false },
                  ]}
                />
              </Col>
            </Form.Group>

            <Form.Group className={` m-b-10 align-items-center row  m-l-5 m-r-0 m-t-3 `}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label  ">Customer</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="d-flex ">
                {/*  Autocomplete */}
                <AutoCompleteDropdown
                  className={`customFormControl ${customerPK ? "borderGreen" : "borderRed"}`}
                  arrayList={customerList}
                  searchString={customerInput}
                  handleSearchString={(string) => setFieldValue("customerInput", string)}
                  renderItemId={(item) => item.CustomerPK}
                  renderItemField={(item) => item.Description}
                  fetchDataBySearchString={(value) => fetchCustomersList(value)}
                  onSelect={handleCustomerLookupSelection}
                  selectedId={customerPK}
                  clearInputCallback={() => {
                    setFieldValue("customerPK", null);
                    setFieldValue("buttonDisabled", false);
                  }}
                  loading={customerLoading}
                />
                <LookupButton
                  onClick={() => {
                    setshowCustomerLookUp(true);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className={` m-b-10 align-items-center row  m-l-5 m-r-0 mt-3 `}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="col-form-label  ">Pickup Plant</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="d-flex ">
                {/*  Autocomplete */}
                <AutoCompleteDropdown
                  className={`customFormControl ${plantPK || !plantInput ? "" : "borderRed"}`}
                  arrayList={plantList}
                  searchString={plantInput}
                  handleSearchString={(string) => setFieldValue("plantInput", string)}
                  renderItemId={(item) => item.CustomerPlantPK}
                  renderItemField={(item) => item.Name}
                  fetchDataBySearchString={(value) => fetchPlantsList(value)}
                  onSelect={handlePlantLookupSelection}
                  selectedId={plantPK}
                  clearInputCallback={() => {
                    setFieldValue("plantPK", null);
                  }}
                  loading={plantLoading}
                  disabled={buttonDisabled}
                />
                <LookupButton
                  onClick={() => {
                    setShowplantLookUp(true);
                  }}
                  disabled={buttonDisabled}
                />
              </Col>
            </Form.Group>
          </div>
        </div>
        <CustomerLookup
          show={showCustomerLookUp}
          onHide={() => {
            setshowCustomerLookUp(false);
          }}
          renderItemId={(customer) => customer.customerPK}
          renderItemField={(customer) => customer.name}
          handleLookupSelection={handleCustomerLookupSelection}
          customerActivitySummary
          plantId={plantPK}
        />
        <CustomerPlantsLookup
          show={showplantLookUp}
          onHide={() => {
            setShowplantLookUp(false);
          }}
          renderItemId={(plant) => plant.CustomerPlantPK}
          renderItemField={(plant) => plant.Name}
          handleLookupSelection={handlePlantLookupSelection}
          customerActivitySummary
          customerId={customerPK}
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
      id={CUSTOMER_ACTIVITY_SUMMARY_REPORT_ID}
      isTabValid={isTabValid}
      payload={params}
    />
  );
};

export default CustomerActivitySummaryReport;
