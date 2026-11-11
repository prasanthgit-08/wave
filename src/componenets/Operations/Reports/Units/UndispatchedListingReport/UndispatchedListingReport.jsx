import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import * as yup from "yup";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
import { useFormik } from "formik";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import DriverService from "../../../../../services/DriverService";
import LookupButton from "../../../../common/LookupButton";
import RegionsLookup from "../../../../LookupScreens/Regions/RegionsLookup";
import ReportComponent from "../../../../common/ReportComponent";
import CustomerService from "../../../../../services/CustomerService";
import CustomerLookup from "../../../../LookupScreens/Customer/CustomerLookup";
import UnitTypeLookup from "../../../../LookupScreens/UnitType/UnitTypeLookup";
import UnitTypeService from "../../../../../services/UnitTypeService";
import SpecialCodeLookup from "../../../../LookupScreens/SpecialCode/SpecialCodeLookup";
import YardLookup from "../../../../LookupScreens/Yard/YardLookup";
import { NormalLookupScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import UnitActivationService from "../../../../../services/UnitActivationService";
import YardService from "../../../../../services/YardService";
import RegionsService from "../../../../../services/RegionsService";

const validationSchema = yup.object().shape({
  division: yup.string(),
  source: yup.string(),
  status: yup.string(),
  regionPK: yup.number(),
  regionInput: yup.string(),
  customerPK: yup.number(),
  customerInput: yup.string(),
  unitTypePK: yup.number(),
  unitTypeInput: yup.string(),
  specialCodePK: yup.number(),
  specialCodeInput: yup.string(),
  pickupYardPK: yup.number(),
  pickupYardInput: yup.string(),
  showUndispatchReason: yup.boolean(),
});

const UndispatchedListingReport = () => {
  const [showRegionLookup, setShowRegionLookup] = useState(false);
  const [regionLoading, setRegionLoading] = useState(false);
  const [regionData, setRegionData] = useState([]);
  const [isTabValid, setIsTabValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [showCustomerLookUp, setShowCustomerLookUp] = useState(false);
  const [unitTypeData, setunitTypeData] = useState([]);
  const [unitTypeLoader, setUnitTypeLoader] = useState(false);
  const [specialCodeData, setSpecialCodeData] = useState([]);
  const [specialCodeLoader, setspecialCodeLoader] = useState(false);
  const [pickupYardData, setPickupYardData] = useState([]);
  const [pickupYardLoader, setPickupYardLoader] = useState(false);
  const [showUnitTypeLookUp, setshowUnitTypeLookUp] = useState(false);
  const [showSpecialCodeLookup, setShowSpecialCodeLookup] = useState(false);
  const [showPickupYardLookup, setShowPickupYardLookup] = useState(false);
  const UNDISPATCHED_LISTING_REPORT_ID = process.env.REACT_APP_SP_UNDISPATCHED_LISTING_REPORT;

  const formik = useFormik({
    initialValues: {
      division: "ALL",
      source: "Both",
      status: "Activated",
      regionPK: null,
      regionInput: "",
      customerPK: null,
      customerInput: "",
      unitTypeInput: "",
      unitTypePK: null,
      specialCodePK: null,
      specialCodeInput: "",
      pickupYardPK: null,
      pickupYardInput: "",
      showUndispatchReason: false,
    },
    validationSchema: validationSchema,
  });

  const { values, setValues, setFieldValue, initialValues } = formik;

  const {
    division,
    source,
    status,
    regionPK,
    regionInput,
    customerPK,
    customerInput,
    unitTypePK,
    unitTypeInput,
    specialCodePK,
    specialCodeInput,
    pickupYardPK,
    pickupYardInput,
    showUndispatchReason,
  } = values;

  //customer Api and selection handling
  const fetchCustomerList = (string) => {
    setCustomerLoading(true);
    CustomerService.getAllCustomersForUndispatchedLookup(
      "Active",
      0,
      "Beginning",
      string,
      null,
      false,
      "Autocomplete"
    )
      .then((response) => {
        const data = response?.data;
        if (data[0]?.errorCode === "1") {
          setCustomerList([]);
        } else {
          setCustomerList(data);
        }
      })
      .catch(() => {})
      .finally(() => {
        setCustomerLoading(false);
      });
  };

  const handleCustomerSelection = (customer) => {
    setValues({
      ...values,
      customerPK: customer.CustomerPK,
      customerInput: customer.Name || customer.Description?.trim(),
    });
    setShowCustomerLookUp(false);
  };

  //UnitType
  const fetchUnitTypeAuto = (string) => {
    setUnitTypeLoader(true);
    UnitTypeService.fetchUndispatchedListing("Beginning", string, 0, "All", null, false, 100, "AutoComplete")
      .then((response) => {
        const data = response?.data;
        if (data[0]?.errorCode === "1") {
          setunitTypeData([]);
        } else {
          setunitTypeData(data);
        }
      })
      .catch((err) => {})
      .finally(() => {
        setUnitTypeLoader(false);
      });
  };

  const handleUnitTypeLookupSelection = (unitType) => {
    setValues({
      ...values,
      unitTypePK: unitType.UnitTypePK,
      unitTypeInput: unitType.DescriptionLong?.trim(),
    });
    setshowUnitTypeLookUp(false);
  };

  //specialcode
  const fetchSpecialCodeByName = (string) => {
    setspecialCodeLoader(true);
    UnitActivationService.getUndispatchedSpecialCodesForLookup(
      0,
      "Beginning",
      string,
      "",
      false,
      100,
      "AutoComplete"
    )
      .then((response) => {
        const data = response.data;
        if (data[0]?.errorCode === "1") {
          setSpecialCodeData([]);
        } else {
          setSpecialCodeData(data);
        }
      })
      .catch((error) => {})
      .finally(() => {
        setspecialCodeLoader(false);
      });
  };

  const handleDefaultSpecialCodeSelection = (code) => {
    setValues({
      ...values,
      specialCodePK: code.SpecialCodePK,
      specialCodeInput: code.Description?.trim(),
    });
    setShowSpecialCodeLookup(false);
  };

  //pickup yard
  const fetchPickupYard = (string) => {
    setPickupYardLoader(true);
    YardService.getPickupYards("Beginning", string, 0, "", false, 100, "AutoComplete")
      .then((response) => {
        const data = response.data;
        if (data[0]?.errorCode === "1") {
          setPickupYardData([]);
        } else {
          setPickupYardData(data);
        }
      })
      .catch((error) => {})
      .finally(() => {
        setPickupYardLoader(false);
      });
  };

  const handlePickupYardSelection = (code) => {
    setValues({
      ...values,
      pickupYardPK: code.YardPK,
      pickupYardInput: code.Description?.trim(),
    });
    setShowPickupYardLookup(false);
  };
  //Region
  const fetchRegionValues = (string) => {
    setRegionLoading(true);
    RegionsService.fetchRegionForUndispatchedListing(0, string, "Beginning", "", false, 100, "AutoComplete")
      .then((response) => {
        const data = response.data;
        if (data[0]?.errorCode === "1") {
          setRegionData([]);
        } else {
          setRegionData(data);
        }
      })
      .catch((err) => {
        setRegionLoading(false);
      })
      .finally(() => {
        setRegionLoading(false);
      });
  };

  const handleRegionLookupSelection = (item) => {
    setValues({
      ...values,
      regionPK: item.RegionPK,
      regionInput: item?.RegionCode?.trim(),
    });
    setShowRegionLookup(false);
  };

  const params = {
    Division: division,
    Source: source,
    Status: status,
    CustomerFK: customerPK ? customerPK : null,
    UnitTypeFK: unitTypePK ? unitTypePK : null,
    SpecialCodeFK: specialCodePK ? specialCodePK : null,
    PickupYardFK: pickupYardPK ? pickupYardPK : null,
    RegionFK: regionPK ? regionPK : null,
    ShowUndispatchReason: showUndispatchReason,
  };

  useEffect(() => {
    if (
      (customerPK || !customerInput) &&
      (unitTypePK || !unitTypeInput) &&
      (specialCodePK || !specialCodeInput) &&
      (pickupYardPK || !pickupYardInput) &&
      (regionPK || !regionInput)
    ) {
      setIsTabValid(true);
    } else {
      setIsTabValid(false);
    }
  }, [
    regionPK,
    regionInput,
    customerPK,
    customerInput,
    unitTypePK,
    unitTypeInput,
    specialCodePK,
    specialCodeInput,
    pickupYardPK,
    pickupYardInput,
  ]);

  const body = (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-5 w-100 mt-0 m-l-10">
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-3">
              <Col xs={1} className="p-0 ">
                <Form.Label className="customColFormLabel">Division</Form.Label>
              </Col>

              <Col xs={9} className="p-0 m-l-10">
                <CustomRadioGroup
                  name="Division"
                  horizontal
                  horizontalAlignmentClassName="pe-4"
                  selectedOption={division}
                  onChange={(value) => setFieldValue("division", value)}
                  options={[
                    { value: "ALL", label: "All", width: "70px" },
                    { value: "Driveaway", label: "Driveaway", disabled: false },
                    { value: "Towaway", label: "Towaway", disabled: false },
                    { value: "single", label: "Single", disabled: false },
                    { value: "Flatbed", label: "Flatbed", disabled: false },
                    { value: "PopUp", label: "Pop Up    ", disabled: false },
                    { value: "TruckCamper", label: "Truck Camper", disabled: false },
                  ]}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-4">
              <Col sm={1} md={1} xs={1} className="p-0 ">
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

            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-4">
              <Col sm={1} md={1} xs={1} className="p-0 ">
                <Form.Label className="customColFormLabel">Status</Form.Label>
              </Col>

              <Col sm={8} md={8} xs={8} className="p-0 m-l-10">
                <CustomRadioGroup
                  name="status"
                  horizontal
                  horizontalAlignmentClassName="pe-3"
                  selectedOption={status}
                  onChange={(value) => setValues({ ...values, status: value, showUndispatchReason: false })}
                  options={[
                    { value: "Both", label: "Both", width: "70px" },
                    { value: "Activated", label: "Activated", width: "95px" },
                    { value: "Inactivated", label: "Inactivated" },
                  ]}
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3 `}>
              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label className="col-form-label  ">Customer</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="d-flex p-0 m-l-10">
                <AutoCompleteDropdown
                  className={`customFormControl ${customerPK || !customerInput ? "" : "borderRed"} `}
                  arrayList={customerList}
                  searchString={customerInput}
                  handleSearchString={(string) => setFieldValue("customerInput", string)}
                  renderItemId={(item) => item.CustomerPK}
                  renderItemField={(item) => item.Description}
                  fetchDataBySearchString={(value) => fetchCustomerList(value)}
                  onSelect={(customer) => {
                    handleCustomerSelection(customer);
                  }}
                  selectedId={customerPK}
                  maxHeight="180px"
                  clearInputCallback={() => {
                    setFieldValue("customerPK", null);
                  }}
                  loading={customerLoading}
                />
                <LookupButton
                  onClick={() => {
                    setShowCustomerLookUp(true);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-3 m-b-10 align-items-center row  m-l-0 m-r-0 `}>
              <Col xs={1} md={1} sm={1} className="p-0">
                <Form.Label className="col-form-label dealer-label m-l-0 ">Unit Type </Form.Label>
              </Col>

              <Col xs={4} md={4} sm={4} className="d-flex p-0 m-l-10">
                <AutoCompleteDropdown
                  className={`customFormControl ${unitTypePK || !unitTypeInput ? "" : "borderRed"} `}
                  arrayList={unitTypeData}
                  searchString={unitTypeInput}
                  renderItemId={(unitType) => unitType.UnitTypePK}
                  renderItemField={(unitType) => unitType.DescriptionLong}
                  handleSearchString={(string) => setFieldValue("unitTypeInput", string)}
                  fetchDataBySearchString={fetchUnitTypeAuto}
                  onSelect={handleUnitTypeLookupSelection}
                  selectedId={unitTypePK}
                  loading={unitTypeLoader}
                  maxHeight="180px"
                  clearInputCallback={() => {
                    setFieldValue("unitTypePK", null);
                  }}
                />
                <LookupButton
                  onClick={() => {
                    setshowUnitTypeLookUp(true);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
              <Col xs={1} md={1} sm={1} className="p-0">
                <Form.Label className="col-form-label dealer-label m-l-0 ">Special Code</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="d-flex p-0 m-l-10">
                <AutoCompleteDropdown
                  arrayList={specialCodeData}
                  searchString={specialCodeInput}
                  customFormatSearchString={(searchString) => searchString}
                  renderItemId={(code) => code.SpecialCodePK}
                  renderItemField={(code) => code.Description}
                  selectedId={specialCodePK}
                  handleSearchString={(string) => setFieldValue("specialCodeInput", string)}
                  fetchDataBySearchString={fetchSpecialCodeByName}
                  onSelect={handleDefaultSpecialCodeSelection}
                  maxHeight="180px"
                  clearInputCallback={() => {
                    setFieldValue("specialCodePK", null);
                  }}
                  loading={specialCodeLoader}
                  className={`customFormControl ${specialCodePK || !specialCodeInput ? "" : "borderRed"} `}
                />
                <LookupButton
                  onClick={() => {
                    setShowSpecialCodeLookup(true);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={1} sm={1} className="p-0">
                <Form.Label className="customColFormLabel">Pickup Yard</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0 d-flex m-l-10">
                <AutoCompleteDropdown
                  arrayList={pickupYardData}
                  searchString={pickupYardInput}
                  renderItemId={(yard) => yard.YardPK}
                  renderItemField={(yard) => yard.Description}
                  selectedId={pickupYardPK}
                  loading={pickupYardLoader}
                  handleSearchString={(string) => setFieldValue("pickupYardInput", string)}
                  fetchDataBySearchString={fetchPickupYard}
                  onSelect={handlePickupYardSelection}
                  maxHeight="175px"
                  clearInputCallback={() => {
                    setFieldValue("pickupYardPK", null);
                  }}
                  className={`customFormControl ${pickupYardPK || !pickupYardInput ? "" : "borderRed"} `}
                  towardsTop
                />
                <LookupButton
                  onClick={() => {
                    setShowPickupYardLookup(true);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label className="col-form-label dealer-label">Region</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className={`p-0 d-flex m-l-10 `}>
                <AutoCompleteDropdown
                  arrayList={regionData}
                  searchString={regionInput}
                  renderItemId={(region) => region.RegionPK}
                  renderItemField={(region) => region.RegionCode}
                  handleSearchString={(string) => setFieldValue("regionInput", string)}
                  fetchDataBySearchString={fetchRegionValues}
                  onSelect={handleRegionLookupSelection}
                  clearInputCallback={() => {
                    setFieldValue("regionPK", null);
                  }}
                  loading={regionLoading}
                  selectedId={regionPK}
                  towardsTop
                  className={`customFormControl ${regionPK || !regionInput ? "" : "borderRed"}`}
                />
                <LookupButton
                  onClick={() => {
                    setShowRegionLookup(true);
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-4">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Show Undispatch Reason</Form.Label>
              </Col>
              <Col xs={1} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="showUndispatchReason"
                  name="showUndispatchReason"
                  checked={showUndispatchReason}
                  disabled={status === "Inactivated"}
                  onChange={(e) => setFieldValue("showUndispatchReason", e.target.checked)}
                />
              </Col>
            </Form.Group>
          </div>
        </div>
      </div>

      <CustomerLookup
        show={showCustomerLookUp}
        onHide={() => {
          setShowCustomerLookUp(false);
        }}
        renderItemId={(customer) => customer.CustomerPK}
        renderItemField={(customer) => customer.Name}
        handleLookupSelection={handleCustomerSelection}
        undispatchedListing
      />

      <UnitTypeLookup
        show={showUnitTypeLookUp}
        onHide={() => {
          setshowUnitTypeLookUp(false);
        }}
        renderItemId={(unitType) => unitType.UnitTypePK}
        handleLookupSelection={handleUnitTypeLookupSelection}
        undispatchedListing
      />

      <SpecialCodeLookup
        show={showSpecialCodeLookup}
        onHide={() => {
          setShowSpecialCodeLookup(false);
        }}
        renderItemId={(code) => code.SpecialCodePK}
        handleLookupSelection={handleDefaultSpecialCodeSelection}
        UndispatchedListing
      />

      <YardLookup
        show={showPickupYardLookup}
        onHide={() => {
          setShowPickupYardLookup(false);
        }}
        renderItemId={(yard) => yard.YardPK}
        handleLookupSelection={handlePickupYardSelection}
        undispatchedListing
      />
      <RegionsLookup
        show={showRegionLookup}
        onHide={() => setShowRegionLookup(false)}
        renderItemId={(regions) => regions.RegionPK}
        handleLookupSelection={handleRegionLookupSelection}
        UndispatchedListing
      />
      {loading && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        setValues(initialValues);
      }}
      id={UNDISPATCHED_LISTING_REPORT_ID}
      isTabValid={isTabValid}
      payload={params}
      useType
    />
  );
};

export default UndispatchedListingReport;
