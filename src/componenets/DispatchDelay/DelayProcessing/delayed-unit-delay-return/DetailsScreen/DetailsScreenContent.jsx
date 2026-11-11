import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import DealerLookup from "../../../../LookupScreens/Dealer/DealerLookup";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import CustomerService from "../../../../../services/CustomerService";
import CustomerPlantMaintenanceService from "../../../../../services/CustomerPlantMaintenanceService";

import { Formik } from "formik";
import * as yup from "yup";
import { setPageNumber } from "../../../../../redux/EditMaster/UnitSelectionSlice";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { useParams } from "react-router-dom";
import {
  setCurrentPlantId,
  setCurrentPlantInput,
  setData,
  setDefaultDealerFK,
  setDefaultDealerInput,
  setDefaultPickupDealerFK,
  setDefaultPickupDealerInput,
  setDelayReturnByDriver,
  setIsMiscDelivery,
  setIsMiscPickup,
  setMiscDeliveryDetails,
  setMiscPickupDetails,
  setPickupPlantId,
  setPickupPlantInput,
  setReturnDetails,
  setReturnLocationUpdated,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import LoadingIcon from "../../../../common/LoadingIcon";
import RerouteService from "../../../../../services/RerouteService";

const DetailsScreenContent = () => {
  const { companyName, driverfk, unitfk, delayedUnitPK } = useParams();

  const [showDefaultDealerLookup, setShowDefaultDealerLookup] = useState(false);
  const [showDefaultPickupDealerLookup, setShowDefaultPickupDealerLookup] = useState(false);
  const [defaultDealer, setDefaultDealer] = useState([]);

  const [defaultmiscUnitAddrFK, setdefaultmiscUnitAddrFK] = useState();
  const [defaultmiscPickupUnitAddrFK, setdefaultmiscPickupUnitAddrFK] = useState();

  const [showCustomerPlantLookup, setShowCustomerPlantLookup] = useState(false);
  const [showCustomerpickupPlantLookup, setShowCustomerpickupPlantLookup] = useState(false);
  const [plantsList, setPlantsList] = useState([]);
  const [name, setName] = useState();
  const [addr1, setAddr1] = useState();
  const [addr2, setAddr2] = useState();
  const [postalcode, setPostalCode] = useState();
  const [city, setCity] = useState();
  const [statecode, setStateCode] = useState();
  const initialValue = [{ city: "", statecode: "", postalcode: "", canadian: false }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [canadian, setCanadian] = useState(false);
  const [postalCodePK, setPostalCodePK] = useState(null);

  const [pickupname, setpickupname] = useState();
  const [pickupaddress1, setpickupaddress1] = useState();
  const [pickupaddress2, setpickupaddress2] = useState();
  const [pickuppostalcode, setPickupPostalCode] = useState();
  const [pickupcity, setPickupCity] = useState();
  const [pickupstatecode, setPickupStateCode] = useState();
  const pickupInitialValue = [{ city: "", statecode: "", postalcode: "", canadian: false }];
  const [pickupPostalOptions, setPickupPostalValues] = useState(pickupInitialValue);
  const [pickupPostalCodePK, setpickupPostalCodePK] = useState(null);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);

  const [isPickupLocationChecked, setisPickupLocationChecked] = useState(false);
  const [isCurrentLocationChecked, setisCurrentLocationChecked] = useState(false);
  const [dealerRefused, setdealerRefused] = useState(false);
  const [loading, setLoading] = useState(false);

  const data = useSelector((state) => state.delayProcessing.data);
  const currentPlantInput = useSelector((state) => state.delayProcessing.currentPlantInput);
  const defaultPickupDealerInput = useSelector((state) => state.delayProcessing.defaultPickupDealerInput);
  const pickupPlantInput = useSelector((state) => state.delayProcessing.pickupPlantInput);
  const defaultDealerInput = useSelector((state) => state.delayProcessing.defaultDealerInput);
  const isMiscFromChecked = useSelector((state) => state.delayProcessing.isMiscPickup);
  const isMiscToChecked = useSelector((state) => state.delayProcessing.isMiscDelivery);
  const returnDetails = useSelector((state) => state.delayProcessing.returnDetails);
  const defaultPickupDealerFK = useSelector((state) => state.delayProcessing.defaultPickupDealerFK);
  const defaultDealerFK = useSelector((state) => state.delayProcessing.defaultDealerFK);
  const currentPlantId = useSelector((state) => state.delayProcessing.currentPlantId);
  const pickupPlantId = useSelector((state) => state.delayProcessing.pickupPlantId);
  const delayReturnByDriver = useSelector((state) => state.delayProcessing.delayReturnByDriver);
  const [isCurrentLocDealerdropdownSelected, setisCurrentLocDealerdropdownSelected] = useState(false);
  const [isCurrentLocPlantdropdownSelected, setisCurrentLocPlantdropdownSelected] = useState(false);

  const stripSpaces = (value) => value?.replace(/ /g, "");

  const dispatch = useDispatch();

  /************** Default Dealer Lookup Hide ***************/
  const hideDefaultDealerModal = () => {
    setShowDefaultDealerLookup(false);
  };

  const hideDefaultPickupDealerModal = () => {
    setShowDefaultPickupDealerLookup(false);
  };

  const fetchData = () => {
    DelayProcessingService.getData(companyName, unitfk, delayedUnitPK)
      .then(({ data }) => {
        dispatch(setData(data[0]));
      })
      .catch(() => {});
  };

  /************** Default Dealer Lookup Handle function ***************/
  const handleDefaultDealerLookupSelection = (dealer) => {
    if (defaultDealerFK !== (dealer?.dealerPK || dealer?.DealerPK)) {
      dispatch(setReturnLocationUpdated(true));
    }
    dispatch(setDefaultDealerFK(dealer?.dealerPK || dealer?.DealerPK));
    dispatch(setDefaultDealerInput(dealer?.name?.trim() || dealer?.Name?.trim()));
    setShowDefaultDealerLookup(false);
    setCurrentSelectionOfSelection(dealer);
    setisCurrentLocDealerdropdownSelected(true);
  };

  /************** Default Dealer Lookup Handle function ***************/
  const handleDefaultPickupDealerLookupSelection = (dealer) => {
    if (defaultPickupDealerFK !== (dealer?.dealerPK || dealer?.DealerPK)) {
      dispatch(setReturnLocationUpdated(true));
    }
    dispatch(setDefaultPickupDealerFK(dealer?.dealerPK || dealer?.DealerPK));
    dispatch(setDefaultPickupDealerInput(dealer?.name?.trim() || dealer?.Name?.trim()));
    setShowDefaultPickupDealerLookup(false);
    setPickupSelectionOfSelection(dealer);
  };

  /************** Default Dealer Lookup Show ***************/
  const handleDefaultDealerLookupModalshow = () => {
    setShowDefaultDealerLookup(true);
  };

  const handleDefaultPickupDealerLookupModalshow = () => {
    setShowDefaultPickupDealerLookup(true);
  };
  /************** Default Dealer Autocomplete Fetch function ***************/
  const fetchDealerByName = (string) => {
    setAutocompleteLoading(true);
    RerouteService.getDealersForLookupSP({
      active: "Active",
      pageNumber: 0,
      searchCriteria: "Beginning",
      advancedSortingOrder: null,
      searchTerm: string,
      sortValue: "",
      sortFlag: 0,
      companyId: data?.CompanyId,
      advancedSearchString: null,
    })
      .then((response) => {
        const data = response?.data;
        const browseData = data?.slice(0, data?.length - 1); // Slice everything except the last item
        const dealerList = (browseData || []).map((dealer) => ({ ...dealer, name: dealer?.Name?.trim() }));
        setDefaultDealer(dealerList);
      })
      .catch(() => {})
      .finally(() => {
        setAutocompleteLoading(false);
      });
  };

  /************** Default Dealer Autocomplete Handle function On select ***************/
  const handleDefaultDealerSelection = (dealer) => {
    if (defaultDealerFK !== (dealer?.dealerPK || dealer?.DealerPK)) {
      dispatch(setReturnLocationUpdated(true));
    }
    dispatch(setDefaultDealerFK(dealer?.DealerPK));
    dispatch(setDefaultDealerInput(dealer?.name?.trim()));
    setCurrentSelectionOfSelection(dealer);
    setisCurrentLocDealerdropdownSelected(true);
    dispatch(setMiscPickupDetails(null));
  };
  /************** Default Dealer Autocomplete Handle function On select ***************/
  const handleDefaulPickuptDealerSelection = (dealer) => {
    if (defaultPickupDealerFK !== (dealer?.dealerPK || dealer?.DealerPK)) {
      dispatch(setReturnLocationUpdated(true));
    }
    dispatch(setDefaultPickupDealerFK(dealer?.DealerPK));
    dispatch(setDefaultPickupDealerInput(dealer?.name?.trim()));
    setPickupSelectionOfSelection(dealer);
    dispatch(setMiscDeliveryDetails(null));
  };
  const setPickupSelection = (input) => {
    setpickupname(input ? input?.PickupName?.trim() : "");
    setpickupaddress1(input ? input?.PickupAddress1?.trim() : "");
    setpickupaddress2(input ? input?.PickupAddress2?.trim() : "");
    setPickupPostalCode(input ? input?.PickupPostalCode?.trim() : "");
    setpickupPostalCodePK(input ? input?.PickupPostalCode : "");
    setPickupStateCode(input ? input?.PickupStateCode?.trim() : "");
    setPickupCity(input ? input?.PickupCity?.trim() : "");
    if (isMiscToChecked) {
      setdefaultmiscPickupUnitAddrFK(input ? input?.PickupUnitAddressFK : "");
    }
  };
  const setPickupSelectionOfSelection = (input) => {
    setpickupname(input?.name?.trim() || input?.Name?.trim() || "");
    setpickupaddress1(input?.address1?.trim() || input?.Address1?.trim() || "");
    setpickupaddress2(input?.address2?.trim() || input?.Address2?.trim() || "");
    setPickupPostalCode(input?.postalCode?.trim() || input?.PostalCode?.trim() || "");
    setpickupPostalCodePK(input?.postalCode?.trim() ? null : "");
    setPickupStateCode(input?.stateCode?.trim() || input?.StateCode?.trim() || "");
    setPickupCity(input?.city?.trim() || input?.City?.trim() || "");
    if (isMiscToChecked) {
      setdefaultmiscPickupUnitAddrFK(input ? input?.unitAddressPK : "");
    }
  };

  const setCurrentSelection = (input) => {
    setName(input ? input?.DeliveryName?.trim() : "");
    setAddr1(input ? input?.DeliveryAddress1?.trim() : "");
    setAddr2(input ? input?.DeliveryAddress2?.trim() : "");
    setPostalCode(input ? input?.DeliveryPostalCode?.trim() : "");
    setCity(input ? input?.DeliveryCity?.trim() : "");
    setStateCode(input ? input?.DeliveryStateCode?.trim() : "");
    if (isMiscFromChecked) {
      setdefaultmiscUnitAddrFK(input ? input?.DeliveryUnitAddressFK : "");
    }
  };

  const setCurrentSelectionOfSelection = (input) => {
    setName(input?.name?.trim() || input?.Name?.trim() || "");
    setAddr1(input?.address1?.trim() || input?.Address1?.trim() || "");
    setAddr2(input?.address2?.trim() || input?.Address2?.trim() || "");
    setPostalCode(input?.postalCode?.trim() || input?.PostalCode?.trim() || "");
    setCity(input?.city?.trim() || input?.City?.trim() || "");
    setStateCode(input?.stateCode?.trim() || input?.StateCode?.trim() || "");
    if (isMiscFromChecked) {
      setdefaultmiscUnitAddrFK(input?.unitAddressPK || "");
    }
  };

  const fetchPlantdetailsByName = (string) => {
    setAutocompleteLoading(true);
    const requestData = {
      customerPK: data?.CustomerFK,
      pageNumber: 0,
      pageSize: 100,
      searchCriteria: "Beginning",
      searchTerms: string,
      sortValue: "",
      sortType: 1,
      type: "AutoComplete",
      FirstField: "",
      secondField: "",
      thirdField: "",
      name: "",
      brand: "",
      productline: "",
      companyName: companyName,
      unitFK: unitfk,
    };
    CustomerPlantMaintenanceService.getPlantsForReturn(requestData)
      .then(({ data }) => {
        const plantList = data?.map((plant) => ({
          ...plant,
          name: plant?.Name?.trim(),
          customerPlantPK: plant?.CustomerPlantPK,
        }));
        setPlantsList(plantList);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setAutocompleteLoading(false);
      });
  };
  /**
   * used for Plant selection Autocomplete & Lookup - onSelect
   */
  const handleCustomerPlantSelection = (plant) => {
    if (currentPlantId !== (plant?.customerPlantPK || plant?.CustomerPlantPK)) {
      dispatch(setReturnLocationUpdated(true));
    }
    dispatch(setCurrentPlantInput(plant?.name || plant?.Name));
    dispatch(setCurrentPlantId(plant?.customerPlantPK || plant?.CustomerPlantPK));
    dispatch(setPageNumber(0));
    setShowCustomerPlantLookup(false);
    setCurrentSelectionOfSelection(plant);
    setisCurrentLocPlantdropdownSelected(true);
    dispatch(setMiscPickupDetails(null));
  };
  /**
   * used for Plant selection Autocomplete & Lookup - onSelect
   */
  const handlePickupCustomerPlantSelection = (plant) => {
    if (pickupPlantId !== (plant?.customerPlantPK || plant?.CustomerPlantPK)) {
      dispatch(setReturnLocationUpdated(true));
    }
    dispatch(setPickupPlantInput(plant?.name || plant?.Name));
    dispatch(setPickupPlantId(plant?.customerPlantPK || plant?.CustomerPlantPK));
    dispatch(setPageNumber(0));
    setShowCustomerpickupPlantLookup(false);
    setPickupSelectionOfSelection(plant);
    dispatch(setDefaultPickupDealerInput(""));
    dispatch(setDefaultPickupDealerFK(null));
    dispatch(setMiscDeliveryDetails(null));
  };

  /**Validation city,state,zip */
  const validationSchema = yup.object({
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
  });

  useEffect(() => {
    if (dealerRefused) {
      if (data?.DeliveryDealerFK) {
        dispatch(setDefaultDealerInput(data?.DeliveryDealerName?.trim()));
        dispatch(setDefaultDealerFK(data?.DeliveryDealerFK));
        dispatch(setCurrentPlantInput(""));
        dispatch(setCurrentPlantId(null));
      } else if (data?.DeliveryPlantFK) {
        dispatch(setCurrentPlantInput(data?.DeliveryPlantName?.trim()));
        dispatch(setCurrentPlantId(data?.DeliveryPlantFK));
        dispatch(setDefaultDealerInput(""));
        dispatch(setDefaultDealerFK(null));
      } else {
        dispatch(setDefaultDealerInput(""));
        dispatch(setDefaultDealerFK(null));
        dispatch(setCurrentPlantInput(""));
        dispatch(setCurrentPlantId(null));
        dispatch(setIsMiscPickup(true));
      }
      setCurrentSelection(data);
    } else {
    }
  }, [dealerRefused]);

  useEffect(() => {
    if (isPickupLocationChecked) {
      if (data?.PickupDealerFK) {
        dispatch(setDefaultPickupDealerInput(data?.PickupName));
        dispatch(setDefaultPickupDealerFK(data?.PickupDealerFK));
      } else if (data?.PickupPlantFK) {
        dispatch(setPickupPlantInput(data?.PickupPlantName));
        dispatch(setDefaultPickupDealerFK(null));
        dispatch(setPickupPlantId(data?.PickupPlantFK));
      } else {
        dispatch(setPickupPlantInput(""));
        dispatch(setDefaultPickupDealerInput(""));
        dispatch(setDefaultPickupDealerFK(null));
        dispatch(setIsMiscDelivery(true));
      }
      setPickupSelection(data);
    } else {
      dispatch(setDefaultPickupDealerInput(""));
      dispatch(setIsMiscDelivery(false));
    }
  }, [isPickupLocationChecked]);

  useEffect(() => {
    if (isMiscToChecked) {
      dispatch(setIsMiscDelivery(isMiscToChecked));
    }
  }, [isMiscToChecked]);

  useEffect(() => {
    if (!dealerRefused) {
      if (isCurrentLocationChecked) {
        setLoading(true);
        DelayProcessingService.getUnitLastLocation(companyName, unitfk)
          .then((response) => {
            const lastLocation = response?.data[0];
            setName(lastLocation?.Name?.trim());
            setCity(lastLocation?.City?.trim());
            setStateCode(lastLocation?.StateCode);
            setAddr1(lastLocation?.Address1);
            setAddr2(lastLocation?.Address2);
            setPostalCode(lastLocation?.PostalCode);
            setPostalCodePK(lastLocation?.PostalCodePK ? lastLocation?.PostalCodePK : null);
            if (lastLocation.DealerFK) {
              dispatch(setDefaultDealerFK(lastLocation?.DealerFK));
              dispatch(setDefaultDealerInput(lastLocation?.DealerName?.trim()));
              setisCurrentLocDealerdropdownSelected(true);
            } else if (lastLocation.CustomerPlantFK) {
              dispatch(setCurrentPlantInput(lastLocation.PlantName?.trim()));
              dispatch(setCurrentPlantId(lastLocation?.CustomerPlantFK));
              setisCurrentLocPlantdropdownSelected(true);
            } else if (lastLocation.UnitAddressFK) {
              dispatch(setIsMiscPickup(true));
            } else if (lastLocation.YardDealerPK) {
              dispatch(setDefaultDealerFK(lastLocation?.YardDealerPK));
              dispatch(setDefaultDealerInput(lastLocation.YardName?.trim()));
              setisCurrentLocDealerdropdownSelected(true);
            } else {
              dispatch(setIsMiscPickup(true));
              dispatch(
                setMiscPickupDetails({
                  name: lastLocation?.Name?.trim(),
                  address1: lastLocation?.Address1?.trim(),
                  address2: lastLocation?.Address2?.trim(),
                  city: lastLocation?.City?.trim(),
                  stateCode: lastLocation?.StateCode,
                  postalCode: lastLocation?.PostalCode,
                  canadian: lastLocation?.Canadian || 0,
                  phone: lastLocation?.Phone ? stripSpaces(lastLocation?.Phone) : "",
                  email: "",
                  deliveryContact: lastLocation?.Contact,
                  deliveryContactPhone: "",
                  openSunday: 0,
                  openMonday: 0,
                  openTuesday: 0,
                  openWednesday: 0,
                  openThursday: 0,
                  openFriday: 0,
                  openSaturday: 0,
                  hours: "",
                  directions: "",
                  postalcodePK: lastLocation?.PostalCodePK ? lastLocation?.PostalCodePK : null,
                })
              );
            }
          })
          .catch((e) => {})
          .finally(() => {
            setLoading(false);
          });
      } else {
        setName("");
        setCity("");
        setStateCode("");
        setPostalCode("");
        setPostalCodePK("");
        setAddr1("");
        setAddr2("");
      }
    }
  }, [isCurrentLocationChecked]);

  useEffect(() => {
    generalTabFormData();
  }, [
    isCurrentLocationChecked,
    defaultDealerInput,
    currentPlantInput,
    isMiscFromChecked,
    name,
    addr1,
    addr2,
    city,
    statecode,
    postalcode,
    canadian,
    isPickupLocationChecked,
    defaultPickupDealerInput,
    pickupPlantInput,
    isMiscToChecked,
    pickupname,
    pickupaddress1,
    pickupaddress2,
    pickuppostalcode,
    pickupcity,
    pickupstatecode,
    dealerRefused,
  ]);

  const generalTabFormData = () => {
    dispatch(
      setReturnDetails({
        isCurrentLocationChecked: isCurrentLocationChecked,
        defaultDealerInput: defaultDealerInput,
        returnPickupDealerFK: defaultDealerFK,
        currentPlantInput: currentPlantInput,
        returnPickupCustomerPlantFK: currentPlantId,
        isMiscFromChecked: isMiscFromChecked,
        defaultmiscUnitAddrFK: defaultmiscUnitAddrFK,
        defaultmiscPickupUnitAddrFK: defaultmiscPickupUnitAddrFK,
        name: name,
        addr1: addr1,
        addr2: addr2,
        city: city,
        stateCode: statecode,
        postalCode: postalcode,
        canadian: canadian,
        isPickupLocationChecked: isPickupLocationChecked,
        defaultPickupDealerInput: defaultPickupDealerInput,
        returnDeliveryDealerFK: defaultPickupDealerFK,
        pickupPlantInput: pickupPlantInput,
        returnDeliveryPlantFK: pickupPlantId,
        isMiscToChecked: isMiscToChecked,
        pickupname: pickupname,
        pickupaddress1: pickupaddress1,
        pickupaddress2: pickupaddress2,
        pickuppostalcode: pickuppostalcode,
        pickupcity: pickupcity,
        pickupstatecode: pickupstatecode,
        dealerRefused: dealerRefused,
      })
    );
  };

  useEffect(() => {
    if (returnDetails) {
      dispatch(setPickupPlantInput(returnDetails?.pickupPlantInput));
      dispatch(setDefaultDealerInput(returnDetails?.defaultDealerInput));
      dispatch(setDefaultPickupDealerInput(returnDetails?.defaultPickupDealerInput));
      dispatch(setCurrentPlantInput(returnDetails?.currentPlantInput));
      setisCurrentLocationChecked(returnDetails?.isCurrentLocationChecked);
      setName(returnDetails?.name);
      setAddr1(returnDetails?.addr1);
      setAddr2(returnDetails?.addr2);
      setCity(returnDetails?.city);
      setStateCode(returnDetails?.stateCode);
      setPostalCode(returnDetails?.postalCode);
      setCanadian(returnDetails?.canadian);
      setisPickupLocationChecked(returnDetails?.isPickupLocationChecked);
      setpickupname(returnDetails?.pickupname);
      setpickupaddress1(returnDetails?.pickupaddress1);
      setpickupaddress2(returnDetails?.pickupaddress2);
      setPickupPostalCode(returnDetails?.pickuppostalcode);
      setPickupCity(returnDetails?.pickupcity);
      setPickupStateCode(returnDetails?.pickupstatecode);
      setdealerRefused(returnDetails?.dealerRefused);
    }
  }, []);

  const clearMiscPickup = () => {
    setpickupname(null);
    setpickupaddress1(null);
    setpickupaddress2(null);
    setPickupPostalCode("");
    setPickupCity("");
    setPickupStateCode("");
  };

  const clearMisc = () => {
    setName(null);
    setAddr1(null);
    setAddr2(null);
    setCity("");
    setStateCode("");
    setPostalCode("");
    setCanadian(null);
  };

  useEffect(() => {
    if (!returnDetails) {
      setisCurrentLocationChecked(false);
      dispatch(setDefaultDealerInput(""));
      dispatch(setCurrentPlantInput(""));
      setName(null);
      setAddr1(null);
      setAddr2(null);
      setCity("");
      setStateCode("");
      setPostalCode("");
      setCanadian(null);
      setisPickupLocationChecked(false);
      dispatch(setDefaultPickupDealerInput(""));
      dispatch(setPickupPlantInput(""));
      setpickupname(null);
      setpickupaddress1(null);
      setpickupaddress2(null);
      setPickupPostalCode("");
      setPickupCity("");
      setPickupStateCode("");
      setdealerRefused(false);
      dispatch(setIsMiscPickup(false));
      dispatch(setIsMiscDelivery(false));
    }
  }, [returnDetails]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Formik
      initialValues={{
        city,
        statecode,
        postalcode,
        pickupcity,
        pickupstatecode,
        pickuppostalcode,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        city: true,
        statecode: true,
        postalcode: true,
        pickupcity: true,
        pickupstatecode: true,
        pickuppostalcode: true,
      }}
    >
      {(formik) => (
        <Form on={formik.handle}>
          <div className="w-100 p-2">
            <div className="shadow-sm rounded border quarterScreenFormContentHeight">
              {loading && <LoadingIcon />}
              <div className="m-b-10">
                <div className="p-15 w-100">
                  <Row>
                    <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                      <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label">Returned By Driver</Form.Label>
                        </Col>

                        <Col xs={2} md={2} sm={2} className="p-0">
                          <input
                            type="checkbox"
                            className="form-check-input p-0 "
                            value={delayReturnByDriver}
                            checked={delayReturnByDriver}
                            onChange={(e) => {
                              dispatch(setDelayReturnByDriver(e.target.checked));
                            }}
                            disabled={data?.DriverReleased}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label">Dealer Refusal</Form.Label>
                        </Col>

                        <Col xs={2} md={2} sm={2} className="p-0">
                          <input
                            type="checkbox"
                            className="form-check-input p-0 "
                            value={dealerRefused}
                            checked={dealerRefused}
                            onChange={(e) => {
                              dispatch(setReturnLocationUpdated(true));
                              setdealerRefused(e.target.checked);
                              setisCurrentLocationChecked(false);
                              dispatch(setIsMiscPickup(false));
                              if (!e.target.checked) {
                                setName("");
                                setCity("");
                                setStateCode("");
                                setPostalCode("");
                                setPostalCodePK("");
                                setAddr1("");
                                setAddr2("");
                                dispatch(setDefaultDealerInput(""));
                                dispatch(setDefaultDealerFK(null));
                                setCurrentSelectionOfSelection("");
                                dispatch(setCurrentPlantInput(""));
                                dispatch(setCurrentPlantId(null));
                                dispatch(setIsMiscPickup(false));
                              }
                              dispatch(setMiscPickupDetails(null));
                            }}
                            disabled={false}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label">Unit Returned From:</Form.Label>
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label">Current Location</Form.Label>
                        </Col>

                        <Col xs={2} md={2} sm={2} className="p-0">
                          <input
                            type="checkbox"
                            className={`${"form-check-input p-0"} ${
                              !dealerRefused &&
                              !defaultDealerFK &&
                              !currentPlantId &&
                              !isMiscFromChecked &&
                              !isCurrentLocationChecked
                                ? "borderRed"
                                : ""
                            }`}
                            value={isCurrentLocationChecked}
                            checked={isCurrentLocationChecked}
                            disabled={dealerRefused}
                            onChange={(e) => {
                              dispatch(setReturnLocationUpdated(true));
                              setisCurrentLocationChecked(e.target.checked);
                              dispatch(setIsMiscPickup(false));
                              setCity("");
                              setStateCode("");
                              setPostalCode("");
                              setPostalCodePK("");
                              dispatch(setDefaultDealerInput(""));
                              dispatch(setCurrentPlantInput(""));
                              dispatch(setMiscPickupDetails(null));
                            }}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label">Dealer</Form.Label>
                        </Col>

                        <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
                          <AutoCompleteDropdown
                            loading={autocompleteLoading}
                            arrayList={defaultDealer}
                            searchString={defaultDealerInput}
                            customFormatSearchString={(searchString) => searchString}
                            renderItemId={(dealer) => dealer.DealerPK}
                            renderItemField={(dealer) => dealer.name}
                            handleSearchString={(string) => {
                              dispatch(setDefaultDealerInput(string));
                            }}
                            fetchDataBySearchString={fetchDealerByName}
                            onSelect={handleDefaultDealerSelection}
                            selectedId={defaultDealerFK}
                            maxHeight="200px"
                            clearInputCallback={() => {
                              dispatch(setDefaultDealerFK(null));
                              setisCurrentLocDealerdropdownSelected(!defaultDealerInput ? false : true);
                              setCurrentSelectionOfSelection("");
                              clearMisc();
                            }}
                            disabled={
                              dealerRefused ||
                              isCurrentLocPlantdropdownSelected ||
                              isCurrentLocationChecked ||
                              isMiscFromChecked
                            }
                            className={`${
                              !dealerRefused &&
                              !defaultDealerFK &&
                              !currentPlantId &&
                              !isMiscFromChecked &&
                              !isCurrentLocationChecked
                                ? "borderRed"
                                : ""
                            }`}
                          />
                          <LookupButton
                            onClick={handleDefaultDealerLookupModalshow}
                            disabled={
                              dealerRefused ||
                              isCurrentLocPlantdropdownSelected ||
                              isCurrentLocationChecked ||
                              isMiscFromChecked
                            }
                          />

                          {/* Default Dealer Lookup Modal */}
                          <DealerLookup
                            show={showDefaultDealerLookup}
                            onHide={hideDefaultDealerModal}
                            renderItemId={(dealer) => dealer.dealerPK}
                            handleLookupSelection={handleDefaultDealerLookupSelection}
                            companyId={data?.CompanyId}
                            DriverReroutes
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label">Plant</Form.Label>
                        </Col>

                        <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
                          {/* Customer Plant Autocomplete */}
                          <AutoCompleteDropdown
                            loading={autocompleteLoading}
                            arrayList={plantsList}
                            searchString={currentPlantInput}
                            renderItemId={(plant) => plant.customerPlantPK}
                            renderItemField={(plant) => plant.name}
                            selectedId={currentPlantId}
                            handleSearchString={(string) => {
                              dispatch(setCurrentPlantInput(string));
                            }}
                            fetchDataBySearchString={(searchString) => {
                              fetchPlantdetailsByName(searchString);
                            }}
                            onSelect={handleCustomerPlantSelection}
                            clearInputCallback={() => {
                              dispatch(setCurrentPlantId(null));
                              dispatch(setPageNumber(0));
                              setisCurrentLocPlantdropdownSelected(!currentPlantInput ? false : true);
                              setCurrentSelectionOfSelection("");
                              clearMisc();
                            }}
                            maxHeight="200px"
                            className={`${
                              !dealerRefused &&
                              !currentPlantId &&
                              !defaultDealerFK &&
                              !isMiscFromChecked &&
                              !isCurrentLocationChecked &&
                              (data?.UsePlants || (data?.DPUCustomer && data?.PickupPlantFK))
                                ? "borderRed"
                                : ""
                            }`}
                            disabled={
                              dealerRefused ||
                              defaultDealerFK ||
                              isCurrentLocationChecked ||
                              isMiscFromChecked ||
                              !(data?.UsePlants || (data?.DPUCustomer && data?.PickupPlantFK))
                            }
                          />
                          <LookupButton
                            onClick={() => setShowCustomerPlantLookup(true)}
                            disabled={
                              dealerRefused ||
                              isCurrentLocDealerdropdownSelected ||
                              isCurrentLocationChecked ||
                              isMiscFromChecked ||
                              !(data?.UsePlants || (data?.DPUCustomer && data?.PickupPlantFK))
                            }
                          />
                          {/* Customer Plant Lookup Modal */}
                          <CustomerPlantsLookup
                            show={showCustomerPlantLookup}
                            onHide={() => setShowCustomerPlantLookup(false)}
                            renderItemId={(plant) => plant.customerPlantPK}
                            handleLookupSelection={handleCustomerPlantSelection}
                            returnProcess
                            customerId={data?.CustomerFK}
                            companyName={companyName}
                            unitfk={unitfk}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label">Miscellaneous</Form.Label>
                        </Col>

                        <Col xs={2} md={2} sm={2} className="p-0">
                          <input
                            type="checkbox"
                            className={`${"form-check-input p-0"} ${
                              !dealerRefused &&
                              !defaultDealerFK &&
                              !currentPlantId &&
                              !isMiscFromChecked &&
                              !isCurrentLocationChecked
                                ? "borderRed"
                                : ""
                            }`}
                            value={isMiscFromChecked}
                            checked={isMiscFromChecked}
                            disabled={
                              dealerRefused || isCurrentLocationChecked || defaultDealerFK || currentPlantId
                            }
                            onChange={(e) => {
                              dispatch(setReturnLocationUpdated(true));
                              dispatch(setIsMiscPickup(e.target.checked));
                              dispatch(setMiscPickupDetails(null));
                              setCity("");
                              setStateCode("");
                              setPostalCode("");
                              setPostalCodePK("");
                              setName("");
                              setAddr1("");
                              setAddr2("");
                            }}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label"></Form.Label>
                        </Col>

                        <Col xs={5} md={5} sm={5} className="p-0">
                          <input
                            className={`customFormControl 
                     `}
                            name="name"
                            type="text"
                            value={name ? name : ""}
                            maxLength={30}
                            disabled
                            autoComplete="off"
                            aria-autocomplete="list"
                            onInput={() => {}}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label"></Form.Label>
                        </Col>

                        <Col xs={5} md={5} sm={5} className="p-0">
                          <input
                            className={`customFormControl 
          `}
                            name="ad1"
                            type="text"
                            value={addr1 ? addr1 : ""}
                            maxLength={30}
                            disabled
                            autoComplete="one-time-code"
                            aria-autocomplete="list"
                            onInput={() => {}}
                            onChange={(e) => setAddr1(e.target.value)}
                            spellCheck={false}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label"></Form.Label>
                        </Col>

                        <Col xs={5} md={5} sm={5} className="p-0">
                          <input
                            className={`customFormControl`}
                            name="ad2"
                            type="text"
                            value={addr2 ? addr2 : ""}
                            maxLength={30}
                            disabled
                            autoComplete="one-time-code"
                            aria-autocomplete="list"
                            onInput={() => {}}
                            onChange={(e) => setAddr2(e.target.value)}
                            spellCheck={false}
                          />
                        </Col>
                      </Form.Group>

                      <div style={{ marginTop: "-0.5rem" }}>
                        <PostalCodeComponent
                          disabled
                          city={city}
                          setCity={setCity}
                          stateCode={statecode}
                          setStateCode={setStateCode}
                          postalCode={postalcode}
                          setPostalCode={setPostalCode}
                          setPostalValues={setPostalValues}
                          postalOptions={postalOptions}
                          postalCodePK={postalCodePK}
                          setPostalCodePK={setPostalCodePK}
                          canadian={canadian}
                          setCanadian={setCanadian}
                          cityColNumber={5}
                          stateColNumber={2}
                          zipColNumber={2}
                          hideLabel
                        />{" "}
                      </div>
                    </Col>

                    {/* </Form.Group> */}

                    <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                      <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0 ">
                        <Col sm={3} md={3} xs={3} className="p-0" style={{ marginTop: "70px" }}>
                          <Form.Label className="col-form-label dealer-label">Unit Returned To:</Form.Label>
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label">Pickup Location</Form.Label>
                        </Col>

                        <Col xs={2} md={2} sm={2} className="p-0">
                          <input
                            type="checkbox"
                            className={`${"form-check-input p-0"} ${
                              !pickupPlantId &&
                              !isPickupLocationChecked &&
                              !defaultPickupDealerFK &&
                              !isMiscToChecked
                                ? "borderRed"
                                : ""
                            }`}
                            value={isPickupLocationChecked}
                            checked={isPickupLocationChecked}
                            onChange={(e) => {
                              dispatch(setReturnLocationUpdated(true));
                              setisPickupLocationChecked(e.target.checked);
                              dispatch(setIsMiscDelivery(false));
                              setPickupStateCode("");
                              setPickupCity("");
                              setPickupPostalCode("");
                              setpickupPostalCodePK("");
                              setpickupname("");
                              setpickupaddress1("");
                              setpickupaddress2("");
                              dispatch(setPickupPlantInput(""));
                              dispatch(setPickupPlantId(null));
                              dispatch(setDefaultPickupDealerInput(""));
                              dispatch(setDefaultPickupDealerFK(null));
                              dispatch(setMiscDeliveryDetails(null));
                            }}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label">Dealer</Form.Label>
                        </Col>

                        <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
                          <AutoCompleteDropdown
                            loading={autocompleteLoading}
                            arrayList={defaultDealer}
                            searchString={defaultPickupDealerInput}
                            customFormatSearchString={(searchString) => searchString}
                            renderItemId={(dealer) => dealer.DealerPK}
                            renderItemField={(dealer) => dealer.name}
                            handleSearchString={(string) => {
                              dispatch(setDefaultPickupDealerInput(string));
                            }}
                            fetchDataBySearchString={fetchDealerByName}
                            onSelect={handleDefaulPickuptDealerSelection}
                            selectedId={defaultPickupDealerFK}
                            clearInputCallback={() => {
                              dispatch(setDefaultPickupDealerFK(null));
                              clearMiscPickup();
                            }}
                            maxHeight="200px"
                            disabled={isPickupLocationChecked || pickupPlantId || isMiscToChecked}
                            className={`${
                              !isPickupLocationChecked &&
                              !defaultPickupDealerFK &&
                              !pickupPlantId &&
                              !isMiscToChecked
                                ? "borderRed"
                                : ""
                            }`}
                          />
                          <LookupButton
                            onClick={handleDefaultPickupDealerLookupModalshow}
                            disabled={isPickupLocationChecked || pickupPlantId || isMiscToChecked}
                          />

                          {/* Default Dealer Lookup Modal */}
                          <DealerLookup
                            show={showDefaultPickupDealerLookup}
                            onHide={hideDefaultPickupDealerModal}
                            renderItemId={(dealer) => dealer.dealerPK}
                            handleLookupSelection={handleDefaultPickupDealerLookupSelection}
                            DriverReroutes
                            companyId={data?.CompanyId}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label">Plant</Form.Label>
                        </Col>

                        <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
                          {/* Customer Plant Autocomplete */}
                          <AutoCompleteDropdown
                            loading={autocompleteLoading}
                            arrayList={plantsList}
                            searchString={pickupPlantInput}
                            renderItemId={(plant) => plant.customerPlantPK}
                            renderItemField={(plant) => plant.name}
                            selectedId={pickupPlantId}
                            handleSearchString={(string) => dispatch(setPickupPlantInput(string))}
                            fetchDataBySearchString={(searchString) => {
                              fetchPlantdetailsByName(searchString);
                            }}
                            onSelect={handlePickupCustomerPlantSelection}
                            clearInputCallback={() => {
                              dispatch(setPickupPlantId(null));
                              dispatch(setPageNumber(0));
                              if (!isPickupLocationChecked) {
                                setPickupSelection("");
                              }
                              clearMiscPickup();
                            }}
                            className={`${
                              !pickupPlantId &&
                              !isPickupLocationChecked &&
                              !defaultPickupDealerFK &&
                              !isMiscToChecked &&
                              (data?.UsePlants || (data?.DPUCustomer && data?.PickupPlantFK))
                                ? "borderRed"
                                : ""
                            }`}
                            maxHeight="200px"
                            disabled={
                              isPickupLocationChecked ||
                              defaultPickupDealerFK ||
                              isMiscToChecked ||
                              !(data?.UsePlants || (data?.DPUCustomer && data?.PickupPlantFK))
                            }
                          />
                          <LookupButton
                            onClick={() => setShowCustomerpickupPlantLookup(true)}
                            disabled={
                              isPickupLocationChecked ||
                              defaultPickupDealerFK ||
                              isMiscToChecked ||
                              !(data?.UsePlants || (data?.DPUCustomer && data?.PickupPlantFK))
                            }
                          />

                          {/* Customer Plant Lookup Modal */}
                          <CustomerPlantsLookup
                            show={showCustomerpickupPlantLookup}
                            onHide={() => setShowCustomerpickupPlantLookup(false)}
                            renderItemId={(plant) => plant.customerPlantPK}
                            handleLookupSelection={handlePickupCustomerPlantSelection}
                            returnProcess
                            customerId={data?.CustomerFK}
                            companyName={companyName}
                            unitfk={unitfk}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label">Miscellaneous</Form.Label>
                        </Col>

                        <Col xs={2} md={2} sm={2} className="p-0">
                          <input
                            type="checkbox"
                            className={`${"form-check-input p-0"} ${
                              !pickupPlantId &&
                              !isPickupLocationChecked &&
                              !defaultPickupDealerFK &&
                              !isMiscToChecked
                                ? "borderRed"
                                : ""
                            }`}
                            value={isMiscToChecked}
                            checked={isMiscToChecked}
                            disabled={isPickupLocationChecked || pickupPlantId || defaultPickupDealerFK}
                            onChange={(e) => {
                              dispatch(setReturnLocationUpdated(true));
                              dispatch(setIsMiscDelivery(e.target.checked));
                              dispatch(setMiscDeliveryDetails(null));
                              setPickupCity("");
                              setPickupStateCode("");
                              setPickupPostalCode("");
                              setpickupPostalCodePK("");
                              setpickupname("");
                              setpickupaddress1("");
                              setpickupaddress2("");
                            }}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label"></Form.Label>
                        </Col>

                        <Col xs={5} md={5} sm={5} className="p-0">
                          <input
                            className={`customFormControl 
                     `}
                            name="pickupname"
                            type="text"
                            value={pickupname ? pickupname : ""}
                            maxLength={30}
                            autoComplete="off"
                            aria-autocomplete="list"
                            onInput={() => {}}
                            disabled
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label"></Form.Label>
                        </Col>

                        <Col xs={5} md={5} sm={5} className="p-0">
                          <input
                            className={`customFormControl 
          `}
                            name="ad1"
                            type="text"
                            value={pickupaddress1 ? pickupaddress1 : ""}
                            maxLength={30}
                            disabled
                            autoComplete="one-time-code"
                            aria-autocomplete="list"
                            onInput={() => {}}
                            spellCheck={false}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className="col-form-label dealer-label"></Form.Label>
                        </Col>

                        <Col xs={5} md={5} sm={5} className="p-0">
                          <input
                            className={`customFormControl`}
                            name="ad2"
                            type="text"
                            value={pickupaddress2 ? pickupaddress2 : ""}
                            maxLength={30}
                            disabled
                            autoComplete="one-time-code"
                            aria-autocomplete="list"
                            onInput={() => {}}
                            spellCheck={false}
                          />
                        </Col>
                      </Form.Group>

                      <div style={{ marginTop: "-0.5rem" }}>
                        <PostalCodeComponent
                          disabled
                          city={pickupcity ? pickupcity : ""}
                          setCity={setPickupCity}
                          stateCode={pickupstatecode ? pickupstatecode : ""}
                          setStateCode={setPickupStateCode}
                          postalCode={pickuppostalcode ? pickuppostalcode : ""}
                          setPostalCode={setPickupPostalCode}
                          setPostalValues={setPickupPostalValues}
                          postalOptions={pickupPostalOptions}
                          postalCodePK={pickupPostalCodePK}
                          setPostalCodePK={setpickupPostalCodePK}
                          canadian={canadian}
                          setCanadian={setCanadian}
                          cityColNumber={5}
                          stateColNumber={2}
                          zipColNumber={2}
                          hideLabel
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DetailsScreenContent;
