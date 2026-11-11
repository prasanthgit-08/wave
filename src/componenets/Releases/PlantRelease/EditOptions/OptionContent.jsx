import { parseLocalDate } from "../../../../utils/dateUtils";
import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { RadioGroup, Radio } from "react-radio-group";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  plantRelease,
  setBrowseData,
  setBrowseNavigation,
  setCustomerId,
  setCustomerInput,
  setDataResetFlag,
  setDate1,
  setDate2,
  setMotorized,
  setOutbound,
  setPlantId,
  setPlantInput,
  setReload,
  setSingleReleaseFormData,
  setSortByLast5,
  setTotalElements,
  setTotalPages,
  setTowable,
  setViewOnly,
  setYardId,
  setYardInput,
  setAll,
  setRadioValue,
  setReleased,
  setUnreleased,
  setPlantCustomerId,
  setPlantCustomerInput,
  setDate1Valid,
  setDate2Valid,
} from "../../../../redux/PlantReleaseSlice";

import {
  setLoading,
  setYardsData,
  setTotalElements as setTotalElementsYardLookup,
  setTotalPages as setTotalPagesYardLookup,
} from "../../../../redux/LookupScreens/YardLookupSlice";
import PlantReleaseService from "../../../../services/PlantReleaseService";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantsLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import YardLookup from "../../../LookupScreens/Yard/YardLookup";
import {
  setLoading as setLoadPlants,
  setTotalElements as setPlantTotalElements,
  setTotalPages as setPlantTotalPages,
  setCustomerPlantData,
} from "../../../../redux/LookupScreens/CustomerPlantsLookupSlice";
import {
  setCustomerData,
  setLoading as setLoadCustomers,
  setTotalElements as setCustomerTotalElements,
  setTotalPages as setCustomerTotalPages,
} from "../../../../redux/LookupScreens/CustomerLookupSlice";
import {
  setCustomerData as setPlantCustomerData,
  setLoading as setLoadPlantCustomers,
  setTotalElements as setPlantCustomerTotalElements,
  setTotalPages as setPlantCustomerTotalPages,
} from "../../../../redux/LookupScreens/CustomerLookupSlice";
import DateInputField from "../../../common/DateInputField";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
const OptionContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showYardLookup, setShowYardLookup] = useState(false);
  const [yardArray, setYardArray] = useState([]);
  const [customerArray, setCustomerArray] = useState([]);
  const [showCustomerLookup, setShowCustomerLookup] = useState(false);
  const [showPlantCustomerLookup, setShowPlantCustomerLookup] = useState(false);
  const [plantCustomerArray, setPlantCustomerArray] = useState([]);
  const [plantArray, setPlantArray] = useState([]);
  const [showPlantLookup, setShowPlantLookup] = useState(false);
  const [atleastOneErrorMessage, setAtleastOneErrorMessage] = useState(false);
  const [dataErrorMessage, setDataErrorMessage] = useState(false);
  const [totalElementsFlag, setTotalElementsFlag] = useState(false);
  const [Arrays, setArrays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [plantisLoading, setPlantLoading] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [plantCustomerLoading, setPlantCustomersLoading] = useState(false);
  const [yardLoading, setYardLoading] = useState(false);
  const [unitData, setUnitData] = useState([]);
  const browseUnits = useSelector((state) => state.plantReleaseReducer.browseUnits);
  const viewOnly = useSelector((state) => state.plantReleaseReducer.viewOnly);
  const outbound = useSelector((state) => state.plantReleaseReducer.outbound);
  const reload = useSelector((state) => state.plantReleaseReducer.reload);
  const motorized = useSelector((state) => state.plantReleaseReducer.motorized);
  const towable = useSelector((state) => state.plantReleaseReducer.towable);
  const totalElements = useSelector((state) => state.plantReleaseReducer.totalElements);
  const singleReleaseFormData = useSelector((state) => state.plantReleaseReducer.singleReleaseFormData);
  const sortByLast5 = useSelector((state) => state.plantReleaseReducer.sortByLast5);
  const customerId = useSelector((state) => state.plantReleaseReducer.customerId);
  const customerInput = useSelector((state) => state.plantReleaseReducer.customerInput);
  const plantId = useSelector((state) => state.plantReleaseReducer.plantId);
  const plantInput = useSelector((state) => state.plantReleaseReducer.plantInput);
  const yardId = useSelector((state) => state.plantReleaseReducer.yardId);

  const yardInput = useSelector((state) => state.plantReleaseReducer.yardInput);
  const plantCustomerId = useSelector((state) => state.plantReleaseReducer.plantCustomerId);
  const plantCustomerInput = useSelector((state) => state.plantReleaseReducer.plantCustomerInput);
  const date1 = useSelector((state) => state.plantReleaseReducer.date1);
  const date2 = useSelector((state) => state.plantReleaseReducer.date2);
  const pageNumber = useSelector((state) => state.plantReleaseReducer.pageNumber);
  const browseData = useSelector((state) => state.plantReleaseReducer.browseData);
  const dataResetFlag = useSelector((state) => state.plantReleaseReducer.dataResetFlag);
  const radioValue = useSelector((state) => state.plantReleaseReducer.radioValue);
  const unreleased = useSelector((state) => state.plantReleaseReducer.unreleased);
  const released = useSelector((state) => state.plantReleaseReducer.released);
  const all = useSelector((state) => state.plantReleaseReducer.all);
  const date1Valid = useSelector((state) => state.plantReleaseReducer.date1Valid);
  const date2Valid = useSelector((state) => state.plantReleaseReducer.date2Valid);

  /**
   * Yard lookup
   */
  const pageNumberYardLookup = useSelector((state) => state.yardLookupReducer.pageNumberYardLookup);
  let sortFlag = useSelector((state) => state.yardLookupReducer.normalSortFlag);
  let sortValue = useSelector((state) => state.yardLookupReducer.normalSortValue);
  const searchTerms = useSelector((state) => state.yardLookupReducer.searchTerms);
  const selectedSearchCriteria = useSelector((state) => state.yardLookupReducer.selectedSearchCriteria);
  /**
   * Plant lookup
   */
  const pageNoPlantsLookup = useSelector((state) => state.customerPlantsLookupReducer.pageNoPlantsLookup);
  let plantSortFlag = useSelector((state) => state.customerPlantsLookupReducer.normalSortFlag);
  let plantSortValue = useSelector((state) => state.customerPlantsLookupReducer.normalSortValue);
  const searchedCustomerPlant = useSelector(
    (state) => state.customerPlantsLookupReducer.searchedCustomerPlant
  );
  const selectedSearchCriteriaForPlant = useSelector(
    (state) => state.customerPlantsLookupReducer.selectedSearchCriteria
  );
  const advanceSortingOrder = useSelector((state) => state.customerPlantsLookupReducer.advanceSortingOrder);
  const searchTermsForPlant = useSelector((state) => state.customerPlantsLookupReducer.searchTerms);

  /**
   * Customer lookup
   */
  const pageNo = useSelector((state) => state.customerLookupReducer.pageNo);
  let normalSortFlag = useSelector((state) => state.customerLookupReducer.normalSortFlag);
  let normalSortValue = useSelector((state) => state.customerLookupReducer.normalSortValue);
  const searchedCustomer = useSelector((state) => state.customerLookupReducer.searchedCustomer);
  const selectedSearchCriteriaForCustomer = useSelector(
    (state) => state.customerLookupReducer.selectedSearchCriteria
  );
  const advanceSortingOrderForCustomer = useSelector(
    (state) => state.customerLookupReducer.advanceSortingOrder
  );
  const searchTermsForCustomer = useSelector((state) => state.customerLookupReducer.searchTerms);
  /**
   * Used for Fitering data
   */
  const checkMultiBrowseData = (e) => {
    PlantReleaseService.checkMulibrowseRelease(
      reload,
      outbound,
      towable,
      motorized,
      sortByLast5,
      pageNumber,
      customerId,
      plantId,
      yardId,
      date1,
      date2,
      unreleased,
      released,
      all,
      plantCustomerId
    )
      .then((response) => {
        const data = response?.data;

        if (data?.totalElements === 0) {
          dispatch(setDataResetFlag(true));
          setTotalElementsFlag(true);
          setIsLoading(false);
        } else {
          dispatch(setBrowseData(data?.content));
          setIsLoading(false);
          window.scrollTo(0, 0);
          setTotalElementsFlag(false);
          dispatch(setDataResetFlag(false));
          dispatch(setTotalElements(data.totalElements));
          dispatch(setTotalPages(data.totalPages));
          dispatch(setBrowseNavigation(data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (
      (unreleased || released || all) &&
      (pageNumber ||
        reload === true ||
        towable == true ||
        outbound == true ||
        motorized === true ||
        yardId !== "" ||
        date1 !== "" ||
        date2 !== "" ||
        plantCustomerId !== "" ||
        customerId != "" ||
        plantId != "" ||
        sortByLast5)
    ) {
      dispatch(setDataResetFlag(true));
      setIsLoading(true);
      checkMultiBrowseData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    reload,
    yardId,
    date1,
    date2,
    motorized,
    towable,
    outbound,
    pageNumber,
    customerId,
    plantId,
    unreleased,
    released,
    all,
    sortByLast5,
    plantCustomerId,
  ]);

  /**
   * used for Yard selection Lookup
   */
  const handleYardLookup = () => {
    setShowYardLookup(true);
  };
  const handleYardSelection = (item) => {
    setShowYardLookup(false);
    dispatch(setYardId(item.yardPK));
    dispatch(setYardInput(item.description?.trim()));
  };

  /**
   * Fetch all Yards
   * Used for Yard Autocomplete
   */
  const fetchAllYards = (string) => {
    setYardLoading(true);
    PlantReleaseService.getAllYards(reload, string, motorized, towable, outbound, unreleased, released)
      .then((response) => {
        setYardLoading(false);
        const data = response.data.content;
        const yardList = data?.map((yard) => ({ ...yard, description: yard.description?.trim() }));
        setYardArray(yardList);
      })
      .catch((error) => {
        setYardLoading(false);
      });
  };

  /**
   * used for Customer selection Lookup
   */
  const handleCustomerLookup = () => {
    setShowCustomerLookup(true);
  };
  const handleCustomerSelection = (item) => {
    setShowCustomerLookup(false);
    dispatch(setCustomerId(item.customerPK));
    dispatch(setCustomerInput(item.name?.trim()));
  };

  /**
   * Fetch all Customer
   * Used for Customer Autocomplete
   */

  const fetchAllCustomers = (string) => {
    setCustomerLoading(true);
    PlantReleaseService.getAllCustomerForAutocomplete(
      reload,
      motorized,
      string,
      towable,
      outbound,
      unreleased,
      released
    )
      .then((response) => {
        setCustomerLoading(false);
        const data = response.data.content;
        const customerList = data?.map((customer) => ({ ...customer, name: customer.name?.trim() }));
        setCustomerArray(customerList);
      })
      .catch((error) => {
        setCustomerLoading(false);
      });
  };

  /**
   * Fetch all Plant Customer
   * Used for Customer Autocomplete
   */

  const fetchAllPlantCustomers = (string) => {
    setPlantCustomersLoading(true);
    PlantReleaseService.getAllPlantCustomerForAutocomplete(
      reload,
      motorized,
      string,
      towable,
      outbound,
      unreleased,
      released
    )
      .then((response) => {
        setPlantCustomersLoading(false);
        const data = response.data.content;
        const PlantCustomerList = data?.map((plant) => ({ ...plant, name: plant.name?.trim() }));
        setPlantCustomerArray(PlantCustomerList);
      })
      .catch((error) => {
        setPlantCustomersLoading(false);
      });
  };
  /**
   * used for Plant selection Lookup
   */
  const handlePlantLookup = () => {
    setShowPlantLookup(true);
  };
  const handlePlantSelection = (item) => {
    setShowPlantLookup(false);
    dispatch(setPlantId(item.customerPlantPK));
    dispatch(setPlantInput(item.name?.trim()));
  };
  /**
   * used for PlantCustomer selection Lookup
   */
  const handlePlantCustomerLookup = () => {
    setShowPlantCustomerLookup(true);
  };
  const handlePlantCustomerSelection = (item) => {
    setShowPlantCustomerLookup(false);
    dispatch(setPlantCustomerId(item.customerPK));
    dispatch(setPlantCustomerInput(item.name?.trim()));
  };

  /**
   * Fetch all Plants
   * Used for PLants Autocomplete
   */

  const fetchAllPlants = (string) => {
    setPlantLoading(true);
    PlantReleaseService.getAllPlantForAutocomplete(
      reload,
      motorized,
      towable,
      string,
      outbound,
      unreleased,
      released
    )
      .then((response) => {
        setPlantLoading(false);
        const data = response.data.content;
        const PlantCustomerList = data?.map((plant) => ({ ...plant, name: plant.name?.trim() }));
        setPlantArray(PlantCustomerList);
      })
      .catch((error) => {
        setPlantLoading(false);
      });
  };
  /**
   * For Yard Lookup
   */
  const getYardLookupValue = () => {
    PlantReleaseService.getYardsForLookup(
      reload,
      pageNumberYardLookup,
      selectedSearchCriteria,
      searchTerms,
      motorized,
      sortFlag,
      sortValue,
      towable,
      outbound,
      unreleased,
      released
    )
      .then((response) => {
        const { data } = response;
        if (data.content === undefined) {
          dispatch(setYardsData([]));
        } else dispatch(setYardsData(data.content));

        dispatch(setTotalElementsYardLookup(data.totalElements));
        dispatch(setTotalPagesYardLookup(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  /**
   * For Plant-Customer Lookup
   */
  const getPlantCustomerLookupValue = () => {
    PlantReleaseService.getPlantCustomers(
      pageNo,
      searchedCustomer,
      selectedSearchCriteriaForCustomer,
      advanceSortingOrderForCustomer,
      searchTermsForCustomer,
      normalSortFlag,
      normalSortValue,
      motorized,
      reload,
      towable,
      outbound,
      unreleased,
      released
    )
      .then((response) => {
        const data = response.data;

        if (data.content === undefined) {
          dispatch(setPlantCustomerData([]));
        } else dispatch(setPlantCustomerData(data.content));
        dispatch(setPlantCustomerTotalElements(data.totalElements));
        dispatch(setPlantCustomerTotalPages(data.totalPages));
        dispatch(setLoadPlantCustomers(false));
      })
      .catch((err) => {
        dispatch(setLoadPlantCustomers(false));
      });
  };
  /**
   * For Customer Lookup
   */
  const getCustomerLookupValue = () => {
    PlantReleaseService.getCustomers(
      pageNo,
      searchedCustomer,
      selectedSearchCriteriaForCustomer,
      advanceSortingOrderForCustomer,
      searchTermsForCustomer,
      normalSortFlag,
      normalSortValue,
      motorized,
      reload,
      towable,
      outbound,
      unreleased,
      released
    )
      .then((response) => {
        const data = response.data;

        if (data.content === undefined) {
          dispatch(setCustomerData([]));
        } else dispatch(setCustomerData(data.content));
        dispatch(setCustomerTotalElements(data.totalElements));
        dispatch(setCustomerTotalPages(data.totalPages));
        dispatch(setLoadCustomers(false));
      })
      .catch((err) => {
        dispatch(setLoadCustomers(false));
      });
  };

  /**
   * For Customer Plant Lookup
   */
  const getCustomerPlantLookupValue = () => {
    PlantReleaseService.fetchCustomerPlantsLookupDetails(
      pageNoPlantsLookup,
      searchedCustomerPlant,
      selectedSearchCriteriaForPlant,
      advanceSortingOrder,
      searchTermsForPlant,
      plantSortValue,
      plantSortFlag,
      reload,
      motorized,
      towable,
      outbound,
      unreleased,
      released
    )
      .then((response) => {
        const { data } = response;

        dispatch(setCustomerPlantData(data.content));
        dispatch(setPlantTotalElements(data.totalElements));
        dispatch(setPlantTotalPages(data.totalPages));
        dispatch(setLoadPlants(false));
      })
      .catch((err) => {
        dispatch(setLoadPlants(false));
      });
  };
  /**
   * Used for Radio button selection
   */
  useEffect(() => {
    if (unreleased) {
      dispatch(setRadioValue("unreleased"));
    } else if (released) {
      dispatch(setRadioValue("released"));
    } else if (all) {
      dispatch(setRadioValue("all"));
    }
  }, [unreleased, released, all]);

  useEffect(() => {
    if (radioValue === "unreleased") {
      dispatch(setUnreleased(true));

      dispatch(setReleased(false));
      dispatch(setAll(false));
    } else if (radioValue === "released") {
      dispatch(setReleased(true));
      dispatch(setUnreleased(false));
      dispatch(setAll(false));
    } else if (radioValue === "all") {
      dispatch(setAll(true));
      dispatch(setReleased(false));
      dispatch(setUnreleased(false));
    }
  }, [radioValue]);

  /**
   * Used for reload
   */
  useEffect(() => {
    if (browseUnits === false) {
      navigate("/plant-release-selection-screen");
    }
  }, [browseUnits]);

  useEffect(() => {
    if (totalElementsFlag) {
      setDataErrorMessage(true);
    } else {
      setDataErrorMessage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalElementsFlag]);

  // Clear Values
  useEffect(() => {
    if (customerInput !== "") {
      dispatch(setPlantCustomerInput(""));
      dispatch(setYardInput(""));
      dispatch(setPlantInput(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerInput]);
  useEffect(() => {
    if (plantInput !== "") {
      dispatch(setPlantCustomerInput(""));
      dispatch(setYardInput(""));
      dispatch(setCustomerInput(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantInput]);
  useEffect(() => {
    if (yardInput !== "") {
      dispatch(setPlantCustomerInput(""));
      dispatch(setPlantInput(""));
      dispatch(setCustomerInput(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yardInput]);
  useEffect(() => {
    if (plantCustomerInput !== "") {
      dispatch(setPlantInput(""));
      dispatch(setYardInput(""));
      dispatch(setCustomerInput(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantCustomerInput]);

  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight">
        <Row className="m-0 p-10">
          <Col className="p-5 mt-2 mb-3" xs={8}>
            <Form.Group
              className={`margin-box-5 m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0 ms-0`}
            >
              <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                <Form.Label className={`${styles.colFormLabel}`}>View Only</Form.Label>
              </Col>
              <Col xs={2} sm={2} md={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="viewOnly"
                  name="viewOnly"
                  value={viewOnly}
                  checked={viewOnly}
                  onChange={(e) => dispatch(setViewOnly(e.target.checked))}
                />
              </Col>

              <Col sm={1} md={1} xs={1} className="p-0"></Col>

              <Col className="p-0 d-flex ">
                <div className="d-flex align-items-center">
                  <Form.Label className="col-form-label me-2  w-60px">Unreleased</Form.Label>
                  <input
                    type="radio"
                    className="form-check-input p-0"
                    id="unreleased"
                    name="radioGroup"
                    value="unreleased"
                    checked={radioValue === "unreleased"}
                    onChange={(e) => {
                      dispatch(setRadioValue(e.target.value));
                    }}
                  />
                </div>
                <Col sm={1} md={1} xs={1}></Col>
                <div className="d-flex align-items-center">
                  <Form.Label className="col-form-label me-2 w-50px">Released</Form.Label>

                  <input
                    type="radio"
                    className="form-check-input p-0"
                    id="released"
                    name="radioGroup"
                    value="released"
                    checked={radioValue === "released"}
                    onChange={(e) => {
                      dispatch(setRadioValue(e.target.value));
                    }}
                  />
                </div>
                <Col sm={1} md={1} xs={1}></Col>
                <div className="d-flex align-items-center">
                  <Form.Label className="col-form-label me-2 w-15px">All</Form.Label>

                  <input
                    type="radio"
                    className="form-check-input p-0 w-20px"
                    id="all"
                    name="radioGroup"
                    value="all"
                    checked={radioValue === "all"}
                    onChange={(e) => {
                      dispatch(setRadioValue(e.target.value));
                    }}
                  />
                </div>
              </Col>
            </Form.Group>
            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                <Form.Label className={`${styles.colFormLabel}`}>Outbound</Form.Label>
              </Col>
              <Col xs={2} sm={2} md={2} className="p-0">
                <input
                  type="checkbox"

                  id="outbound"
                  name="outbound"
                  value={outbound}
                  checked={outbound}
                  onChange={(e) => dispatch(setOutbound(e.target.checked))}
                  className={`form-check-input p-0 ${
                    outbound ? "" : !outbound && !reload ? "borderRed" : ""
                  }`}
                />
              </Col>
              <Col sm={1} md={1} xs={1} className="p-0"></Col>
              <Col sm={1} md={1} xs={1} className="p-0  w-68px">
                <Form.Label className={`${styles.colFormLabel}`}>Reloads</Form.Label>
              </Col>
              <input
                type="checkbox"

                id="reload"
                name="reload"
                value={reload}
                checked={reload}
                onChange={(e) => dispatch(setReload(e.target.checked))}
                className={`form-check-input p-0 ${reload ? "" : !outbound && !reload ? "borderRed" : ""}`}
              />
            </Form.Group>
            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                <Form.Label className={`${styles.colFormLabel}`}>Motorized</Form.Label>
              </Col>
              <Col xs={2} sm={2} md={2} className="p-0">
                <input
                  type="checkbox"
                  className={`form-check-input p-0 ${
                    motorized ? "" : !motorized && !towable ? "borderRed" : ""
                  }`}
                  id="motorized"
                  name="motorized"
                  value={motorized}
                  checked={motorized}
                  onChange={(e) => dispatch(setMotorized(e.target.checked))}
                />
              </Col>
              <Col sm={1} md={1} xs={1} className="p-0">
                {" "}
              </Col>
              <Col sm={1} md={1} xs={1} className="p-0  w-68px">
                <Form.Label className={`${styles.colFormLabel}`}>Towable</Form.Label>
              </Col>
              <input
                type="checkbox"
                className={`form-check-input p-0 ${towable ? "" : !motorized && !towable ? "borderRed" : ""}`}
                id="towable"
                name="towable"
                value={towable}
                checked={towable}
                onChange={(e) => dispatch(setTowable(e.target.checked))}
              />
            </Form.Group>

            <Row className={`${!dataErrorMessage && "hide-elements"} m-t-1`}>
              <Col xs={2} md={2} sm={2} className="w-150px"></Col>
              <Col style={{ paddingLeft: "7px" }}>
                <p className="mb-2 text-danger" style={{ height: "8px" }}>
                  No records available for selected filter condition
                </p>
              </Col>
            </Row>
            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                <Form.Label className={`${styles.colFormLabel}`}>Sort By Last 5</Form.Label>
              </Col>
              <Col xs={2} sm={2} md={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="sortByLast5"
                  name="browseUnits"
                  value={sortByLast5}
                  checked={sortByLast5}
                  onChange={(e) => dispatch(setSortByLast5(e.target.checked))}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                <Form.Label className={`${styles.colFormLabel}`}>Customer</Form.Label>
              </Col>
              <Col xs={6} md={6} sm={6} className="p-0 d-flex w-350">
                <AutoCompleteDropdown
                  arrayList={customerArray}
                  selectedId={customerId}
                  searchString={customerInput}
                  renderItemId={(item) => item.customerPK}
                  renderItemField={(item) => item.name}
                  is
                  handleSearchString={(string) => dispatch(setCustomerInput(string))}
                  fetchDataBySearchString={fetchAllCustomers}
                  onSelect={handleCustomerSelection}
                  clearInputCallback={() => {
                    dispatch(setCustomerId(""));
                  }}
                  disabled={plantId !== "" || yardId !== "" || plantCustomerId !== ""}
                  className={`${customerId === "" && customerInput !== "" ? "borderRed" : ""}`}
                  loading={customerLoading}
                />

                <LookupButton
                  onClick={handleCustomerLookup}
                  disabled={plantId !== "" || yardId !== "" || plantCustomerId !== ""}
                  // Customer lookup Modal @ Bottom
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                <Form.Label className={`${styles.colFormLabel}`}>Plant Customer</Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0 d-flex w-350">
                <AutoCompleteDropdown
                  arrayList={plantCustomerArray}
                  searchString={plantCustomerInput}
                  renderItemId={(item) => item.customerPK}
                  renderItemField={(item) => item.name}
                  handleSearchString={(string) => dispatch(setPlantCustomerInput(string))}
                  selectedId={plantCustomerId}
                  fetchDataBySearchString={fetchAllPlantCustomers}
                  onSelect={handlePlantCustomerSelection}
                  clearInputCallback={() => {
                    dispatch(setPlantCustomerId(""));
                  }}
                  disabled={plantId !== "" || yardId !== "" || customerId !== ""}
                  className={`${plantCustomerId === "" && plantCustomerInput != "" ? "borderRed" : ""}`}
                  loading={plantCustomerLoading}
                />

                <LookupButton
                  onClick={handlePlantCustomerLookup}
                  disabled={plantId !== "" || yardId !== "" || customerId !== ""}
                  // Yard lookup Modal @ Bottom
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                <Form.Label className={`${styles.colFormLabel}`}>Plant</Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0 d-flex w-350">
                <AutoCompleteDropdown
                  arrayList={plantArray}
                  searchString={plantInput}
                  renderItemId={(item) => item.customerPlantPK}
                  renderItemField={(item) => item.name}
                  handleSearchString={(string) => dispatch(setPlantInput(string))}
                  fetchDataBySearchString={fetchAllPlants}
                  onSelect={handlePlantSelection}
                  clearInputCallback={() => {
                    dispatch(setPlantId(""));
                  }}
                  selectedId={plantId}
                  disabled={plantCustomerId !== "" || yardId !== "" || customerId !== ""}
                  className={`${plantId === "" && plantInput != "" ? "borderRed" : ""}`}
                  loading={plantisLoading}
                />
                <LookupButton
                  onClick={handlePlantLookup}
                  disabled={plantCustomerId !== "" || yardId !== "" || customerId !== ""}

                  //Plant lookup Modal @ Bottom
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                <Form.Label className={`${styles.colFormLabel}`}>Yard</Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0 d-flex w-350">
                <AutoCompleteDropdown
                  arrayList={yardArray}
                  searchString={yardInput}
                  renderItemId={(item) => item.yardPK}
                  renderItemField={(item) => item.description}
                  handleSearchString={(string) => dispatch(setYardInput(string))}
                  fetchDataBySearchString={fetchAllYards}
                  onSelect={handleYardSelection}
                  towardsTop
                  selectedId={yardId}
                  clearInputCallback={() => {
                    dispatch(setYardId(""));
                  }}
                  disabled={plantCustomerId !== "" || plantId !== "" || customerId !== ""}
                  className={`${yardId === "" && yardInput != "" ? "borderRed" : ""}`}
                  loading={yardLoading}
                />

                <LookupButton
                  onClick={handleYardLookup}
                  disabled={plantCustomerId !== "" || plantId !== "" || customerId !== ""}
                  // Yard lookup Modal @ Bottom
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group m-t-20 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0  w-100px">
                <Form.Label className={`${styles.colFormLabel}`}>Order Date</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0  w-100px">
                <DateInputField
                  date={date1}

                  reduxSetDate={(value) => {
                    dispatch(setDate1(value));
                  }}
                  setIsDateValid={(value) => {
                    dispatch(setDate1Valid(value));
                  }}
                  max={date2 ? parseLocalDate(date2) : ""}

                  className={`customFormControl ${!date1 ? "" : date1 && date1Valid ? "" : "borderRed"}`}
                />
              </Col>

              <Col sm={1} md={1} xs={1} className="p-r-0 w-10px">
                <Form.Label className="col-form-label dealer-label w-100 text-center">To</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0  w-100px">
                <DateInputField
                  date={date2}

                  reduxSetDate={(value) => {
                    dispatch(setDate2(value));
                  }}
                  min={date1 ? parseLocalDate(date1) : ""}
                  setIsDateValid={(value) => {
                    dispatch(setDate2Valid(value));
                  }}
                  className={`customFormControl ${!date2 ? "" : date2 && date2Valid ? "" : "borderRed"}`}
                />
              </Col>
            </Form.Group>
          </Col>
          {/* Yard Lookup Modal */}
          {isLoading ? (
            <div className="fade modal-backdrop show">
              {" "}
              <div className="pos-center">
                {" "}
                <div className="loader"></div>
              </div>
            </div>
          ) : (
            ""
          )}
          <YardLookup
            show={showYardLookup}
            onHide={() => setShowYardLookup(false)}
            renderItemId={(yard) => yard.yardPK}
            handleLookupSelection={handleYardSelection}
            customFetchFunction={getYardLookupValue}
          />
          {/* Customer Lookup Modal */}
          <CustomerLookup
            show={showCustomerLookup}
            onHide={() => setShowCustomerLookup(false)}
            renderItemId={(item) => item.customerPK}
            handleLookupSelection={handleCustomerSelection}
            customFetchFunction={getCustomerLookupValue}
          />
          {/* Customer  Plant Lookup Modal */}
          <CustomerPlantsLookup
            show={showPlantLookup}
            onHide={() => setShowPlantLookup(false)}
            renderItemId={(item) => item.customerPlantPK}
            handleLookupSelection={handlePlantSelection}
            customFetchFunction={getCustomerPlantLookupValue}
          />
          {/* Customer  Plant Lookup Modal */}
          <CustomerLookup
            show={showPlantCustomerLookup}
            onHide={() => setShowPlantCustomerLookup(false)}
            renderItemId={(item) => item.customerPK}
            handleLookupSelection={handlePlantCustomerSelection}
            customFetchFunction={getPlantCustomerLookupValue}
          />
        </Row>
      </div>
    </div>
  );
};

export default OptionContent;
