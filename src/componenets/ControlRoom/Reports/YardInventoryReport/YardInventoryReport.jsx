import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import CustomerService from "../../../../services/CustomerService";
import CustomerPlantMaintenanceService from "../../../../services/CustomerPlantMaintenanceService";
import UnitTypeService from "../../../../services/UnitTypeService";
import YardService from "../../../../services/YardService";
import { Col, Form } from "react-bootstrap";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantsLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import UnitTypeLookup from "../../../LookupScreens/UnitType/UnitTypeLookup";
import UnitTypeGroupLookup from "../../../LookupScreens/UnitTypeGroup/UnitTypeGroupLookup";
import SpecialCodeLookup from "../../../LookupScreens/SpecialCode/SpecialCodeLookup";
import YardLookup from "../../../LookupScreens/Yard/YardLookup";
import ReportComponent from "../../../common/ReportComponent";
import LoadingIcon from "../../../common/LoadingIcon";
import UnitActivationService from "../../../../services/UnitActivationService";
import { booleanToNumber, getCurrentCompany } from "../../../../utils/utils";

const validationSchema = yup.object().shape({
  division: yup.string().required(),
  source: yup.string().required(),
  customerPK: yup.number().nullable(),
  customerInput: yup.string(),
  plantPK: yup.number().nullable(),
  plantInput: yup.string(),
  unitTypePK: yup.number(),
  unitTypeInput: yup.string(),
  unitTypeGroupPK: yup.number(),
  unitTypeGroupInput: yup.string(),
  maxUnitLength: yup.number(),
  maxLength: yup.number(),
  specialCodePK: yup.number(),
  specialCodeInput: yup.string(),
  pickupYardPK: yup.number(),
  pickupYardInput: yup.string(),
  listedBy: yup.string(),
  releaseStatus: yup.string().when("includeSisterUnits", {
    is: false,
    then: yup.string().required(),
    otherwise: yup.string().notRequired(),
  }),
  includeSisterUnits: yup.boolean(),
  includeNoExit: yup.boolean(),
  includeDelayUnits: yup.boolean(),
  inYardOnly: yup.boolean(),
  vinReplaceU: yup.boolean(),
  onlyNoShuttle: yup.boolean(),
  isDpu: yup.boolean(),
  isPlant: yup.boolean(),
});

const YardInventoryReport = () => {
  const [loading, setLoading] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [showCustomerLookUp, setShowCustomerLookUp] = useState(false);
  const [plantLoading, setPlantLoading] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const [showPlantLookUp, setShowPlantLookUp] = useState(false);
  const [unitTypeLoading, setUnitTypeLoading] = useState(false);
  const [unitTypeList, setUnitTypeList] = useState([]);
  const [showUnitTypeLookUp, setShowUnitTypeLookUp] = useState(false);
  const [unitTypeGroupLoading, setUnitTypeGroupLoading] = useState(false);
  const [unitTypeGroupList, setunitTypeGroupList] = useState([]);
  const [showUnitTypeGroupLookUp, setShowUnitTypeGroupLookUp] = useState(false);
  const [specialCodeLoading, setSpecialCodeLoading] = useState(false);
  const [specialCodeList, setSpecialCodeList] = useState([]);
  const [showSpecialCodeLookUp, setShowSpecialCodeLookUp] = useState(false);
  const [pickupYardLoading, setPickupYardLoading] = useState(false);
  const [pickupYardList, setPickupYardList] = useState([]);
  const [showPickupYardlookUp, setShowPickupYardlookUp] = useState(false);
  const [disableUTG, setdisableUTG] = useState(false);
  const [isSisterCompany, setIsSisterCompany] = useState(false);
  const YARD_INVENTORY_REPORT_ID = process.env.REACT_APP_SP_REPORT_YARD_INVENTORY_REPORT;

  const releaseFlag = getCurrentCompany();

  const formik = useFormik({
    initialValues: {
      division: "all",
      source: "both",
      customerPK: null,
      customerInput: "",
      plantPK: null,
      plantInput: "",
      unitTypePK: null,
      unitTypeInput: "",
      unitTypeGroupPK: null,
      unitTypeGroupInput: "",
      maxUnitLength: "",
      maxLength: "",
      specialCodePK: null,
      specialCodeInput: "",
      pickupYardPK: null,
      pickupYardInput: "",
      listedBy: "date",
      releaseStatus: releaseFlag?.requirePlantReleases ? "released" : "both",
      includeSisterUnits: false,
      includeNoExit: true,
      includeDelayUnits: true,
      inYardOnly: true,
      vinReplaceU: false,
      onlyNoShuttle: false,
      isDpu: null,
      isPlant: null,
    },
    validationSchema: validationSchema,
  });

  const { values, setValues, setFieldValue, initialValues } = formik;

  const {
    division,
    source,
    customerPK,
    customerInput,
    plantPK,
    plantInput,
    unitTypePK,
    unitTypeInput,
    unitTypeGroupPK,
    unitTypeGroupInput,
    maxUnitLength,
    maxLength,
    specialCodePK,
    specialCodeInput,
    pickupYardPK,
    pickupYardInput,
    listedBy,
    releaseStatus,
    includeSisterUnits,
    includeNoExit,
    includeDelayUnits,
    inYardOnly,
    vinReplaceU,
    onlyNoShuttle,
    isDpu,
    isPlant,
  } = values;

  const isTabValid =
    (!customerPK && customerInput) ||
    (!plantPK && plantInput) ||
    (!unitTypePK && unitTypeInput) ||
    (!unitTypeGroupPK && unitTypeGroupInput) ||
    (!specialCodePK && specialCodeInput) ||
    (!pickupYardPK && pickupYardInput);

  //customer Api and selection handling
  const fetchCustomerList = (string) => {
    setCustomerLoading(true);
    CustomerService.getAllCustomersForCustomerSalesReport({
      plantPK: plantPK,
      searchTerms: string,
      pageSize: 100,
    })
      .then((response) => {
        const data = response?.data;
        setCustomerList(data);
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
      customerInput: customer.Name || customer.Description,
      isPlant: customer?.UsePlants,
      isDpu: customer?.DPUCustomer,
      plantInput: plantPK ? plantInput : "",
      includeSisterUnits: customer?.SisterCompany === false ? false : includeSisterUnits,
    });
    setIsSisterCompany(customer?.SisterCompany);

    setShowCustomerLookUp(false);
    if (!isPlant && !isDpu) {
      setFieldValue("plantPK", null);
      setFieldValue("plantInput", "");
    }
  };

  //CustomerPlant
  const fetchPlantList = (string) => {
    setPlantLoading(true);
    CustomerPlantMaintenanceService.getPlantsForCustomerSalesReport({
      customerPK: customerPK,
      searchTerms: string,
      pageSize: 100,
    })
      .then((response) => {
        const data = response?.data;
        setPlantList(data);
      })
      .catch((err) => {})
      .finally(() => {
        setPlantLoading(false);
      });
  };

  const handlePlantSelection = (plant) => {
    setValues({
      ...values,
      plantPK: plant.CustomerPlantPK,
      plantInput: plant.Name?.trim(),
    });
    setShowPlantLookUp(false);
  };

  //unittype Api and selection handling'
  const fetchUnitTypeList = (string) => {
    setUnitTypeLoading(true);
    UnitTypeService.fetchUnitTypeYardInventory({ searchTerms: string, resultType: 0, pageSize: 100 })
      .then((response) => {
        let data = response?.data?.slice(0, -1);
        setUnitTypeList(data);
      })
      .catch(() => {
        setUnitTypeLoading(false);
      })
      .finally(() => {
        setUnitTypeLoading(false);
      });
  };

  const handleUnitTypeSelection = (item) => {
    if (item.UnitTypeFK) {
      setLoading(true);
      CustomerPlantMaintenanceService.fetchUnitTypeGroupForYardInventory({
        searchTerms: "",
        unitTypeGroupPageNumber: 0,
        pageSize: 100,
        resultType: 0,
        unitTypePK: item.UnitTypeFK,
      })
        .then((res) => {
          let data = res?.data?.slice(0, -1);
          if (data?.length === 1) {
            setValues({
              ...values,
              unitTypeGroupPK: data[0]?.UnitTypeGroupFK,
              unitTypeGroupInput: data[0]?.UnitTypeGrpDescription?.trim(),
              unitTypePK: item.UnitTypeFK,
              unitTypeInput: item.DescriptionLong?.trim(),
              maxUnitLength: data[0]?.Length,
              includeSisterUnits: false,
            });
            setdisableUTG(true);
          } else {
            setValues({
              ...values,
              unitTypePK: item.UnitTypeFK,
              unitTypeInput: item.DescriptionLong?.trim(),
              maxUnitLength: item.Length,
              unitTypeGroupPK: null,
              unitTypeGroupInput: "",
              includeSisterUnits: false,
            });
            setdisableUTG(true);
          }
        })
        .catch(() => {
          setValues({
            ...values,
            unitTypePK: item.UnitTypeFK,
            unitTypeInput: item.DescriptionLong?.trim(),
            maxUnitLength: item.Length,
            unitTypeGroupPK: null,
            unitTypeGroupInput: "",
            includeSisterUnits: false,
          });
          setdisableUTG(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setShowUnitTypeLookUp(false);
  };

  //unittypegroup api and selection handling
  const fetchUnitTypeGroupList = (string) => {
    setUnitTypeGroupLoading(true);
    CustomerPlantMaintenanceService.fetchUnitTypeGroupForYardInventory({
      searchTerms: string,
      unitTypeGroupPageNumber: 0,
      pageSize: 100,
      resultType: 0,
      unitTypePK: unitTypePK,
    })
      .then((response) => {
        let data = response?.data?.slice(0, -1);
        setunitTypeGroupList(data || []);
      })
      .catch(() => {})
      .finally(() => setUnitTypeGroupLoading(false));
  };

  const handleUnitTypeGroupSelection = (unitTypeGroup) => {
    setValues({
      ...values,
      unitTypeGroupPK: unitTypeGroup?.UnitTypeGroupFK,
      unitTypeGroupInput: unitTypeGroup?.UnitTypeGrpDescription?.trim(),
      maxUnitLength: unitTypeGroup?.Length,
      maxLength: unitTypeGroup?.Length ?? "",
      unitTypePK: null,
      unitTypeInput: "",
      includeSisterUnits: false,
    });
    setdisableUTG(false);
    setShowUnitTypeGroupLookUp(false);
  };

  //special code Api and selection handling
  const fetchSpecialCodeList = (string) => {
    setSpecialCodeLoading(true);
    UnitActivationService.getyardInventorySpecialCodesForLookup({
      searchTerms: string,
      resultType: 0,
      pageSize: 100,
    })
      .then((response) => {
        let data = response?.data?.slice(0, -1);
        setSpecialCodeList(data || []);
      })
      .catch(() => {})
      .finally(() => setSpecialCodeLoading(false));
  };

  const handleSpecialCodeSelection = (specialCode) => {
    setValues({
      ...values,
      specialCodePK: specialCode.SpecialCodeFK,
      specialCodeInput: specialCode.SpecialCodeDescription,
      includeSisterUnits: false,
    });
    setShowSpecialCodeLookUp(false);
  };

  //pickupyard Api and selection handling
  const fetchPickupYardList = (string) => {
    setPickupYardLoading(true);
    YardService.getYardForYardInventory({ searchTerm: string, pageSize: 100, resultType: 0 })
      .then((response) => {
        let data = response?.data?.slice(0, -1);
        setPickupYardList(data || []);
      })
      .catch(() => {})
      .finally(() => setPickupYardLoading(false));
  };

  const handlePickupYardSelection = (pickupYard) => {
    setValues({
      ...values,
      pickupYardPK: pickupYard.PickUpYardFK,
      pickupYardInput: pickupYard.PickUpYardName,
    });
  };

  const params = {
    Division: division,
    Source: source,
    CustomerFK: customerPK,
    PlantFK: plantPK,
    UnitTypeFK: unitTypePK,
    UnitTypeGroupFK: unitTypeGroupPK,
    MaxUnitLength: maxUnitLength,
    SpecialCodeFK: specialCodePK,
    PickupYardFK: pickupYardPK,
    ListedBy: listedBy,
    ReleaseStatus: releaseStatus,
    IncludeSisterUnit: includeSisterUnits,
    InYardOnly: inYardOnly,
    IncludeNoExit: includeNoExit,
    VinReplaceUnit: vinReplaceU,
    IncludeDelayUnit: includeDelayUnits,
    OnlyNoShuttle: onlyNoShuttle,
  };

  const body = (
    <>
      {loading && <LoadingIcon />}
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-5 w-100 mt-0 m-l-10">
              <Col xs={6} sm={6} md={6}>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-3">
                  <Col xs={3} md={3} sm={3} className="p-0">
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
                        { value: "all", label: "All", width: "100px" },
                        { value: "driveaway", label: "Driveaway", disabled: false },
                        { value: "towaway", label: "Towaway", disabled: false },
                        { value: "single", label: "Single", disabled: false },
                        { value: "flatbed", label: "Flatbed", disabled: false },
                        { value: "popUp", label: "Pop Up    ", disabled: false },
                        { value: "truckCamper", label: "Truck Camper", disabled: false },
                      ]}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col xs={6} sm={6} md={6}>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                  <Col sm={3} md={3} xs={3} className="p-0">
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
                        { value: "both", label: "Both", width: "57px" },
                        { value: "outbound", label: "Outbound", width: "96px" },
                        { value: "reload", label: "Reload", disabled: false },
                      ]}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <div className="d-flex mt-2">
                <Col md={6} xs={6}>
                  <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 `}>
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label  ">Customer</Form.Label>
                    </Col>
                    <Col xs={9} md={9} sm={9} className="d-flex ">
                      <AutoCompleteDropdown
                        className={`customFormControl ${customerPK || !customerInput ? "" : "borderRed"} `}
                        arrayList={customerList}
                        searchString={customerInput}
                        handleSearchString={(string) => setFieldValue("customerInput", string)}
                        renderItemId={(item) => item.CustomerPK}
                        renderItemField={(item) => item.Description}
                        fetchDataBySearchString={(value) => fetchCustomerList(value)}
                        onSelect={handleCustomerSelection}
                        selectedId={customerPK}
                        clearInputCallback={() => {
                          setFieldValue("customerPK", null);
                          setFieldValue("plantPK", null);
                          setFieldValue("isSisterCompany", true);
                        }}
                        maxHeight="200px"
                        loading={customerLoading}
                      />
                      <LookupButton
                        onClick={() => {
                          setShowCustomerLookUp(true);
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col md={3} xs={3}>
                  <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0  `}>
                    <Col sm={6} md={6} xs={6} className="p-0" style={{ marginLeft: "50px" }}>
                      <Form.Label className=" col-form-label dealer-label">Include Sister Units</Form.Label>
                    </Col>

                    <Col xs={3} md={3} sm={3}>
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="includeSisterUnits"
                        name="includeSisterUnits"
                        checked={includeSisterUnits}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setFieldValue("includeSisterUnits", isChecked);
                          if (isChecked) {
                            setFieldValue("releaseStatus", "both");
                            setFieldValue("onlyNoShuttle", false);
                          } else {
                            setFieldValue("releaseStatus", "released");
                          }
                        }}
                        disabled={
                          (isSisterCompany === false && values.customerPK) ||
                          values.plantPK !== null ||
                          values.unitTypePK !== null ||
                          values.unitTypeGroupPK !== null ||
                          values.specialCodePK !== null ||
                          values.releaseStatus === "unreleased"
                        }
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col md={3} xs={3}>
                  <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0  `}>
                    <Col sm={6} md={6} xs={6} className="p-0">
                      <Form.Label className=" col-form-label">In Yard Only</Form.Label>
                    </Col>

                    <Col xs={3} md={3} sm={3}>
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="inyardonly"
                        name="inYardOnly"
                        checked={inYardOnly}
                        onChange={(e) => {
                          setFieldValue("inYardOnly", e.target.checked);
                        }}
                        disabled={values.releaseStatus === "unreleased"}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </div>

              <div className="d-flex mt-2">
                <Col md={6} xs={6}>
                  <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 `}>
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label">Plant</Form.Label>
                    </Col>

                    <Col xs={9} md={9} sm={9} className="d-flex ">
                      <AutoCompleteDropdown
                        className={`customFormControl ${plantPK || !plantInput ? "" : "borderRed"}`}
                        arrayList={plantList}
                        searchString={plantInput}
                        handleSearchString={(string) => setFieldValue("plantInput", string)}
                        renderItemId={(item) => item.CustomerPlantPK}
                        renderItemField={(item) => item.Name}
                        fetchDataBySearchString={(value) => fetchPlantList(value)}
                        onSelect={handlePlantSelection}
                        selectedId={plantPK}
                        clearInputCallback={() => {
                          setFieldValue("plantPK", null);
                        }}
                        disabled={!values.isDpu && !values.isPlant && values.customerPK}
                        loading={plantLoading}
                      />
                      <LookupButton
                        disabled={!values.isDpu && !values.isPlant && values.customerPK}
                        onClick={() => {
                          setShowPlantLookUp(true);
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col md={3} xs={3}>
                  <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0  `}>
                    <Col sm={6} md={6} xs={6} className="p-0" style={{ marginLeft: "50px" }}>
                      <Form.Label className=" col-form-label dealer-label">Include No Exit</Form.Label>
                    </Col>

                    <Col xs={3} md={3} sm={3}>
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="includeNoExit"
                        name="includeNoExit"
                        checked={includeNoExit}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setFieldValue("includeNoExit", isChecked);
                          if (isChecked) {
                            setFieldValue("onlyNoShuttle", false);
                          }
                        }}
                        disabled={values.releaseStatus === "unreleased"}
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col md={3} xs={3}>
                  <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0  `}>
                    <Col sm={6} md={6} xs={6} className="p-0">
                      <Form.Label className=" col-form-label">VIN Replace U#</Form.Label>
                    </Col>

                    <Col xs={3} md={3} sm={3}>
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="vinReplaceU"
                        name="vinReplaceU"
                        checked={vinReplaceU}
                        onChange={(e) => {
                          setFieldValue("vinReplaceU", e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </div>

              <div className="d-flex mt-2">
                <Col md={6} xs={6}>
                  <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 `}>
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="col-form-label ">Unit Type</Form.Label>
                    </Col>

                    <Col xs={9} md={9} sm={9} className="d-flex ">
                      <AutoCompleteDropdown
                        className={`customFormControl ${unitTypePK || !unitTypeInput ? "" : "borderRed"} `}
                        arrayList={unitTypeList}
                        searchString={unitTypeInput}
                        maxHeight="230px"
                        handleSearchString={(string) => setFieldValue("unitTypeInput", string)}
                        renderItemId={(item) => item.UnitTypeFK}
                        renderItemField={(item) => item.DescriptionLong}
                        fetchDataBySearchString={(value) => fetchUnitTypeList(value)}
                        onSelect={handleUnitTypeSelection}
                        selectedId={unitTypePK}
                        clearInputCallback={() => {
                          setFieldValue("unitTypePK", null);
                          setFieldValue("maxUnitLength", "");
                          setFieldValue("unitTypeGroupPK", null);
                          setFieldValue("unitTypeGroupInput", "");
                        }}
                        loading={unitTypeLoading}
                        disabled={unitTypeGroupPK && !unitTypePK}
                      />
                      <LookupButton
                        onClick={() => setShowUnitTypeLookUp(true)}
                        disabled={unitTypeGroupPK && !unitTypePK}
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col md={3} xs={3}>
                  <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0  `}>
                    <Col sm={6} md={6} xs={6} className="p-0" style={{ marginLeft: "50px" }}>
                      <Form.Label className=" col-form-label">Include Delay Units</Form.Label>
                    </Col>

                    <Col xs={3} md={3} sm={3}>
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="includedelayunits"
                        name="includedelayunits"
                        checked={includeDelayUnits}
                        onChange={(e) => {
                          setFieldValue("includeDelayUnits", e.target.checked);
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col md={3} xs={3}>
                  <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0  `}>
                    <Col sm={6} md={6} xs={6} className="p-0">
                      <Form.Label className=" col-form-label">Only No Shuttle</Form.Label>
                    </Col>

                    <Col xs={3} md={3} sm={3}>
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="onlynoshuttle"
                        name="onlynoshuttle"
                        checked={onlyNoShuttle}
                        onChange={(e) => {
                          setFieldValue("onlyNoShuttle", e.target.checked);
                        }}
                        disabled={includeSisterUnits || includeNoExit || releaseStatus === "unreleased"}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </div>

              <Col md={6} xs={6}>
                <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2 `}>
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label ">Unit Type Group</Form.Label>
                  </Col>

                  <Col xs={9} md={9} sm={9} className="d-flex ">
                    <AutoCompleteDropdown
                      className={`customFormControl ${unitTypeGroupPK || !unitTypeGroupInput ? "" : "borderRed"} `}
                      arrayList={unitTypeGroupList}
                      searchString={unitTypeGroupInput}
                      maxHeight="200px"
                      handleSearchString={(string) => setFieldValue("unitTypeGroupInput", string)}
                      renderItemId={(item) => item.UnitTypeGroupFK}
                      renderItemField={(item) => item.UnitTypeGrpDescription}
                      fetchDataBySearchString={(value) => fetchUnitTypeGroupList(value)}
                      onSelect={handleUnitTypeGroupSelection}
                      selectedId={unitTypeGroupPK}
                      clearInputCallback={() => {
                        setFieldValue("unitTypeGroupPK", null);
                        if (!unitTypePK) {
                          setFieldValue("maxUnitLength", "");
                        }
                      }}
                      disabled={values.unitTypePK && disableUTG}
                      loading={unitTypeGroupLoading}
                    />
                    <LookupButton
                      onClick={() => setShowUnitTypeGroupLookUp(true)}
                      disabled={values.unitTypePK && disableUTG}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
                <Col sm={1} md={1} xs={1} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label" style={{ minWidth: "200px" }}>
                    Max Unit Length
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} style={{ marginLeft: "40px" }}>
                  <input
                    type="input"
                    id="maxUnitLength"
                    name="maxUnitLength"
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 5);
                      if (
                        values.unitTypeGroupPK &&
                        values.maxLength &&
                        Number(value) > Number(values.maxLength)
                      ) {
                        setFieldValue("maxUnitLength", String(values.maxLength));
                      } else {
                        setFieldValue("maxUnitLength", value);
                      }
                    }}
                    value={maxUnitLength}
                    className={"customFormControl"}
                    disabled={values.unitTypePK}
                  />
                </Col>
              </Form.Group>

              <Col md={6} xs={6}>
                <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2 `}>
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label ">Special Code</Form.Label>
                  </Col>

                  <Col xs={9} md={9} sm={9} className="d-flex ">
                    <AutoCompleteDropdown
                      className={`customFormControl ${specialCodePK || !specialCodeInput ? "" : "borderRed"} `}
                      arrayList={specialCodeList}
                      searchString={specialCodeInput}
                      maxHeight="130px"
                      handleSearchString={(string) => setFieldValue("specialCodeInput", string)}
                      renderItemId={(item) => item.SpecialCodeFK}
                      renderItemField={(item) => item.SpecialCodeDescription}
                      fetchDataBySearchString={(value) => fetchSpecialCodeList(value)}
                      onSelect={handleSpecialCodeSelection}
                      selectedId={specialCodePK}
                      clearInputCallback={() => {
                        setFieldValue("specialCodePK", null);
                      }}
                      loading={specialCodeLoading}
                    />
                    <LookupButton onClick={() => setShowSpecialCodeLookUp(true)} />
                  </Col>
                </Form.Group>
              </Col>

              <Col md={6} xs={6}>
                <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2 `}>
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="col-form-label ">Pickup Yard</Form.Label>
                  </Col>

                  <Col xs={9} md={9} sm={9} className="d-flex ">
                    <AutoCompleteDropdown
                      className={`customFormControl ${pickupYardPK || !pickupYardInput ? "" : "borderRed"} `}
                      arrayList={pickupYardList}
                      searchString={pickupYardInput}
                      maxHeight="100px"
                      handleSearchString={(string) => setFieldValue("pickupYardInput", string)}
                      renderItemId={(item) => item.PickUpYardFK}
                      renderItemField={(item) => item.PickUpYardName}
                      fetchDataBySearchString={(value) => fetchPickupYardList(value)}
                      onSelect={handlePickupYardSelection}
                      selectedId={pickupYardPK}
                      clearInputCallback={() => {
                        setFieldValue("pickupYardPK", null);
                      }}
                      loading={pickupYardLoading}
                    />
                    <LookupButton onClick={() => setShowPickupYardlookUp(true)} />
                  </Col>
                </Form.Group>
              </Col>

              <Col xs={6} md={6} sm={6}>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-3">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className="customColFormLabel">Listed By</Form.Label>
                  </Col>

                  <Col sm={8} md={8} xs={8} className="p-0 m-l-10">
                    <CustomRadioGroup
                      name="listedby"
                      horizontal
                      horizontalAlignmentClassName="pe-3"
                      selectedOption={listedBy}
                      onChange={(value) => setFieldValue("listedBy", value)}
                      options={[
                        { value: "date", label: "Date", width: "70px" },
                        { value: "last4", label: "Last4", width: "95px" },
                        { value: "row", label: "Row", disabled: false },
                      ]}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col sm={6} xs={6} md={6}>
                {releaseFlag.requirePlantReleases && (
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-2">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Release Status</Form.Label>
                    </Col>

                    <Col sm={8} md={8} xs={8} className="p-0 m-l-10">
                      <CustomRadioGroup
                        name="releaseStatus"
                        horizontal
                        horizontalAlignmentClassName="pe-3"
                        selectedOption={releaseStatus}
                        onChange={(value) => {
                          setFieldValue("releaseStatus", value);
                          if (value === "unreleased") {
                            setFieldValue("includeNoExit", false);
                            setFieldValue("includeSisterUnits", false);
                            setFieldValue("onlyNoShuttle", false);
                          }
                        }}
                        options={[
                          { value: "both", label: "Both", width: "70px" },
                          { value: "released", label: "Released", width: "95px" },
                          { value: "unreleased", label: "Unreleased", disabled: inYardOnly },
                        ]}
                        disabled={values.includeSisterUnits}
                      />
                    </Col>
                  </Form.Group>
                )}
              </Col>
            </div>
          </div>
        </div>
      </div>

      <CustomerLookup
        customerSalesReport
        show={showCustomerLookUp}
        renderItemId={(item) => item.customerPK}
        renderItemField={(item) => item.name}
        onHide={() => {
          setShowCustomerLookUp(false);
        }}
        handleLookupSelection={handleCustomerSelection}
      />
      <CustomerPlantsLookup
        customerSalesReport
        show={showPlantLookUp}
        onHide={() => {
          setShowPlantLookUp(false);
        }}
        renderItemId={(plant) => plant.CustomerPlantPK}
        handleLookupSelection={handlePlantSelection}
      />
      <UnitTypeLookup
        yardInventory
        show={showUnitTypeLookUp}
        renderItemId={(item) => item.UnitTypeFK}
        renderItemField={(item) => item.DescriptionLong}
        handleLookupSelection={handleUnitTypeSelection}
        onHide={() => setShowUnitTypeLookUp(false)}
      />
      <UnitTypeGroupLookup
        show={showUnitTypeGroupLookUp}
        yardInventory
        unitTypePK={unitTypePK}
        renderItemId={(item) => item.UnitTypeGroupFK}
        renderItemField={(item) => item.UnitTypeGrpDescription}
        onHide={() => setShowUnitTypeGroupLookUp(false)}
        handleLookupSelection={handleUnitTypeGroupSelection}
      />
      <SpecialCodeLookup
        yardInventory
        show={showSpecialCodeLookUp}
        renderItemId={(item) => item.SpecialCodeFK}
        renderItemField={(item) => item.SpecialCodeDescription}
        onHide={() => setShowSpecialCodeLookUp(false)}
        handleLookupSelection={handleSpecialCodeSelection}
      />
      <YardLookup
        yardInventory
        show={showPickupYardlookUp}
        renderItemId={(item) => item.PickUpYardFK}
        renderItemField={(item) => item.PickUpYardName}
        onHide={() => setShowPickupYardlookUp(false)}
        handleLookupSelection={handlePickupYardSelection}
      />
    </>
  );
  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        setValues(initialValues);
      }}
      id={YARD_INVENTORY_REPORT_ID}
      isTabValid={!isTabValid}
      payload={booleanToNumber(params)}
    />
  );
};

export default YardInventoryReport;
