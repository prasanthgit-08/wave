/* eslint-disable react-hooks/exhaustive-deps */
import { t } from "i18next";
import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import OrderEntryService from "../../../../../services/OrderEntryService";
import CustomerLookup from "../../../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import YardLookup from "../../../../LookupScreens/Yard/YardLookup";
import ShuttleCityLookup from "../../../../LookupScreens/ShuttleCity/ShuttleCityLookup";
import {
  setcustomerData,
  setPlantData,
  setChangeColor,
  setSelectedCustomerId,
  setCustomerPlantData,
  setDeliverToPlant,
  setDeliveryCustomerPlantId,
  setChangeColorForPlantTable,
  setSelectedCustomerPlantId,
  setSelectedCustomerBillingPlantId,
  setShuttleFromYard,
  setShuttleToYard,
  setDeliveryCustomerShuttleCityId,
  setPickupAtPlant,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setChargeCreditCard,
  setUseOpenBalance,
  setBulkinvoices,
  setBulkUnits,
  setPickupYardSelection,
  setReload,
  setPickupYardId,
  setPickupCustomerShuttleCityId,
  setIsCustomerMisc,
  setMiscCustomerData,
  setPickupCustomerPlantId,
  setCheckPrepaid,
  setIsCustomerTabValid,
  setPickupCustomerYardId,
  setDeliveryCustomerYardId,
  setReturnRates,
  setPlantCode,
  setNoPickupPulloutFee,
  setNoDeliveryPulloutFee,
  setQuickPayCustomer,
  setDeliveryYardSelection,
  setDuplicateLoadFlag,
  setCustomerPlant,
  updateCustomerPlant,
  setIsPlantExist,
  setOutbound,
  setBillingPlantSelection,
  setPickupPlantSelection,
  setDeliveryPlantSelection,
  setIsCustomerDpu,
  setCustomerNameInput,
  setPickupPlantInput,
  setDeliveryPlantInput,
  setPickupYardInput,
  setDeliveryYardInput,
  setPickupCityInput,
  setDeliveryCityInput,
  setPickupShuttleCitySelection,
  setDeliveryShuttleCitySelection,
  setBulkInvoiceFK,
  setBulkInvoiceInput,
  setCustomerPlantName,
  setCustomerPickupPlantData,
  setCustomerDeliveryPlantData,
  setFirstBatchSequence,
  setLastBatchSequence,
  setPrintBol,
  setShowAddBulkInvoice,
  setPickupPlantOutbound,
  setDeliveryPlantOutbound,
  setMiscCustomerId,
  setCustomerDeliveryYardData,
  setCustomerPickupYardData,
  setIsMandatoryCreditCardTab,
  setTotalBatchLoadCount,
  setIsFODInvoice,
  setAppliedAmount,
  setEnableAppliedAmount,
  setInvoiceAmount,
  setRemainingAmt,
  setInvoiceMilesAdjustment,
  setDriverMilesAdjustment,
  setBOLPrinterFK,
} from "../../../../../redux/OrderEntryFilterSlice";
import {
  setPageNo,
  setCustomerSelection,
  resetSearchSettings,
} from "../../../../../redux/LookupScreens/CustomerLookupSlice";
import { setBatchLoadCustomerTab } from "../../../../../redux/OrderEntryFilterSlice";
import { setIsCanadianOeCreditCard } from "../../../../../redux/OECreditCardSlice";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import ModalComponent from "../../../../common/ModalComponent";
import AddBulkInvoice from "./misc/AddBulkInvoice";
import { last } from "lodash";
import LookupButton from "../../../../common/LookupButton";
import LoadingText from "../../../../common/LoadingText";
import useDebouncer from "../../../../../hooks/useDebouncer";

function Customer({ styles }) {
  const dispatch = useDispatch();

  /********************************************* Local variable declaration starts here *********************************************/
  const [customerAutoCompleteLoading, setCustomerAutoCompleteLoading] = useState(false);
  const [customerDropdownData, setCustomerDropdownData] = useState([]);
  const [pickupPlantDropdownData, setPickupPlantDropdownData] = useState([]);
  const [deliveryPlantDropdownData, setDeliveryPlantDropdownData] = useState([]);
  const [pickupYardsData, setPickupYardsData] = useState([]);
  const [deliveryYardsData, setDeliveryYardsData] = useState([]);
  const [pickUpCityData, setPickUpCityData] = useState([]);
  const [deliveryCityData, setDeliveryCityData] = useState([]);
  const [bulkInvoiceData, setBulkInvoiceData] = useState([]);
  const [showBulkInvoiceModal, setShowBulkInvoiceModal] = useState(false);

  const [customerData, setCustomerData] = useState([]);
  const [showCustomerPlatDiv, setShowCustomerPlatDiv] = useState(false);

  const [duplicateLoad, setDuplicateLoad] = useState(false);
  const [batchLoad, setBatchLoad] = useState(false);
  const [isBatchLoadValid, setIsBatchLoadValid] = useState(false);

  const [selectedPickupYard, setSelectedPickupYard] = useState(null);

  const [customerLoading, setCustomerLoading] = useState(true);
  const [plantsLoading, setPlantsLoading] = useState(true);

  const [totalPagesInitial, setTotalPagesInitial] = useState(0);
  const [totalElementsInitial, setTotalElementsInitial] = useState(0);
  const [pageSelected, setPageSelected] = useState(false);
  const [settingPageNo, setSettingPageNo] = useState(false);

  /********************************************* Local variable declaration ends here ***********************************************/

  /********************************************* Redux variable declaration starts here *********************************************/
  const customerNameInput = useSelector((state) => state.orderEntryReducer.customerNameInput);
  const customerIndb = useSelector((state) => state.orderEntryReducer.customerData);
  const selectedCustomerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);
  const isCustomerMisc = useSelector((state) => state.orderEntryReducer.isCustomerMisc);
  const isCustomerDpu = useSelector((state) => state.orderEntryReducer.isCustomerDpu);
  const isPlantExist = useSelector((state) => state.orderEntryReducer.isPlantExist);
  // Pagination: Customer Listing Table
  const changeColor = useSelector((state) => state.orderEntryReducer.changeColor);
  const pageNumber = useSelector((state) => state.orderEntryReducer.pageNumber);
  const totalPages = useSelector((state) => state.orderEntryReducer.totalPages);
  const totalElements = useSelector((state) => state.orderEntryReducer.totalElements);

  const customerPlantName = useSelector((state) => state.orderEntryReducer.customerPlantName);
  const customerPlant = useSelector((state) => state.orderEntryReducer.customerPlant);
  const customerPlantIndb = useSelector((state) => state.orderEntryReducer.customerPlantData);
  const selectedCustomerPlantId = useSelector((state) => state.orderEntryReducer.selectedCustomerPlantId);
  const selectedCustomerBillingPlantId = useSelector(
    (state) => state.orderEntryReducer.selectedCustomerBillingPlantId
  );
  const billingPlantSelection = useSelector((state) => state.orderEntryReducer.billingPlantSelection);
  const changeColorForPlantTable = useSelector((state) => state.orderEntryReducer.changeColorForPlantTable);

  const pickupAtPlant = useSelector((state) => state.orderEntryReducer.pickupAtPlant);
  const customerPickupPlantData = useSelector((state) => state.orderEntryReducer.customerPickupPlantData);
  const pickupCustomerPlantId = useSelector((state) => state.orderEntryReducer.pickupCustomerPlantId);
  const pickupPlantSelection = useSelector((state) => state.orderEntryReducer.pickupPlantSelection);

  const shuttleToYard = useSelector((state) => state.orderEntryReducer.shuttleToYard);
  const pickupCustomerYardId = useSelector((state) => state.orderEntryReducer.pickupCustomerYardId);
  const pickupCustomerShuttleCityId = useSelector(
    (state) => state.orderEntryReducer.pickupCustomerShuttleCityId
  );
  const pickupShuttleCitySelection = useSelector(
    (state) => state.orderEntryReducer.pickupShuttleCitySelection
  );
  const noPickupPulloutFee = useSelector((state) => state.orderEntryReducer.noPickupPulloutFee);

  const deliverToPlant = useSelector((state) => state.orderEntryReducer.deliverToPlant);
  const customerDeliveryPlantData = useSelector((state) => state.orderEntryReducer.customerDeliveryPlantData);
  const deliveryCustomerPlantId = useSelector((state) => state.orderEntryReducer.deliveryCustomerPlantId);
  const deliveryPlantSelection = useSelector((state) => state.orderEntryReducer.deliveryPlantSelection);

  const shuttleFromYard = useSelector((state) => state.orderEntryReducer.shuttleFromYard);
  const deliveryCustomerYardId = useSelector((state) => state.orderEntryReducer.deliveryCustomerYardId);
  const deliveryYardSelection = useSelector((state) => state.orderEntryReducer.deliveryYardSelection);
  const pickupYardSelection = useSelector((state) => state.orderEntryReducer.pickupYardSelection);
  const deliveryCustomerShuttleCityId = useSelector(
    (state) => state.orderEntryReducer.deliveryCustomerShuttleCityId
  );
  const deliveryShuttleCitySelection = useSelector(
    (state) => state.orderEntryReducer.deliveryShuttleCitySelection
  );
  const noDeliveryPulloutFee = useSelector((state) => state.orderEntryReducer.noDeliveryPulloutFee);

  const returnRates = useSelector((state) => state.orderEntryReducer.returnRates);
  const plantCode = useSelector((state) => state.orderEntryReducer.plantCode);
  const checkPrepaid = useSelector((state) => state.orderEntryReducer.checkPrepaid);

  const reload = useSelector((state) => state.orderEntryReducer.reload);
  const outbound = useSelector((state) => state.orderEntryReducer.outbound);
  const printBol = useSelector((state) => state.orderEntryReducer.printBol);

  const batchLoadCustomerTab = useSelector((state) => state.orderEntryReducer.batchLoadCustomerTab);
  const firstBatchSequence = useSelector((state) => state.orderEntryReducer.firstBatchSequence);
  const lastBatchSequence = useSelector((state) => state.orderEntryReducer.lastBatchSequence);

  const chargeCreditCard = useSelector((state) => state.orderEntryReducer.chargeCreditCharge);
  const useOpenBalance = useSelector((state) => state.orderEntryReducer.useOpenBalance);
  const bulkInvoiceFK = useSelector((state) => state.orderEntryReducer.bulkInvoiceFK);
  const bulkUnits = useSelector((state) => state.orderEntryReducer.bulkUnits);
  const showAddBulkInvoice = useSelector((state) => state.orderEntryReducer.showAddBulkInvoice);

  const pickupPlantInput = useSelector((state) => state.orderEntryReducer.pickupPlantInput);
  const deliveryPlantInput = useSelector((state) => state.orderEntryReducer.deliveryPlantInput);
  const pickupYardInput = useSelector((state) => state.orderEntryReducer.pickupYardInput);
  const deliveryYardInput = useSelector((state) => state.orderEntryReducer.deliveryYardInput);
  const pickupCityInput = useSelector((state) => state.orderEntryReducer.pickupCityInput);
  const deliveryCityInput = useSelector((state) => state.orderEntryReducer.deliveryCityInput);
  const bulkInvoiceInput = useSelector((state) => state.orderEntryReducer.bulkInvoiceInput);
  const pickupPlantOutbound = useSelector((state) => state.orderEntryReducer.pickupPlantOutbound);
  const deliveryPlantOutbound = useSelector((state) => state.orderEntryReducer.deliveryPlantOutbound);
  const invoiceAmount = useSelector((state) => state.orderEntryReducer.invoiceAmountForOpenBalances);
  const pageNo = useSelector((state) => state.customerLookupReducer.pageNo);
  const customerSelection = useSelector((state) => state.customerLookupReducer.customerSelection);

  const pageNoBillingPlants = useSelector((state) => state.customerPlantsLookupReducer.pageNoBillingPlants);
  const customerPlantData = useSelector((state) => state.customerPlantsLookupReducer.customerPlantData);

  const pickupYardId = useSelector((state) => state.yardLookupReducer.pickupYardId);
  const deliveryYardId = useSelector((state) => state.yardLookupReducer.deliveryYardId);

  const pickupShuttleCityId = useSelector((state) => state.shuttleCityLookupReducer.pickupShuttleCityId);
  const deliveryShuttleCityId = useSelector((state) => state.shuttleCityLookupReducer.deliveryShuttleCityId);
  const customerPickupYardData = useSelector((state) => state.orderEntryReducer.customerPickupYardData);
  const invoiceMilesAdjustment = useSelector((state) => state.orderEntryReducer.invoiceMilesAdjustment);
  const driverMilesAdjustment = useSelector((state) => state.orderEntryReducer.driverMilesAdjustment);

  // FOD Invoice
  const isFODInvoice = useSelector((state) => state.orderEntryReducer.isFODInvoice);

  const [customerTableLoading, setCustomerTableLoading] = useState(true);

  /********************************************* Redux variable declaration ends here ************************************************/

  /**********************************************  Function Definitions starts here  ***************************************************/

  /**
   * Fetch all the customers.
   * Used for Customer listing table
   */
  const fetchCustomerDetails = (string) => {
    OrderEntryService.getCustomerDetails(string, pageNumber, selectedCustomerId)
      .then((response) => {
        const data = response.data;
        const customersList = data.content?.map((customer) => ({ ...customer, name: customer.name?.trim() }));
        setCustomerData(customersList);
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setIsCanadianOeCreditCard(data.content[0].canadian));
      })
      .catch((err) => {})
      .finally(() => {
        setCustomerLoading(false);
        setCustomerTableLoading(false);
      });
  };

  const debounceFetchCustomerDetails = useDebouncer(fetchCustomerDetails, 500);

  const fetchCustomerDetailsForClear = () => {
    OrderEntryService.getCustomerDetails("", 0, null)
      .then((response) => {
        const data = response.data;
        const customersList = data.content?.map((customer) => ({ ...customer, name: customer.name?.trim() }));
        setCustomerData(customersList);
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setIsCanadianOeCreditCard(data.content[0].canadian));
      })
      .catch((err) => {})
      .finally(() => {
        setCustomerLoading(false);
        setCustomerTableLoading(false);
      });
  };

  /**
   * Fetch all the customers.
   * Used for Customer Autocomplete
   */
  const fetchCustomerDetailsForAutocomplete = (string) => {
    setCustomerAutoCompleteLoading(true);
    OrderEntryService.getCustomerDetailsForAutocomplete(string)
      .then((response) => {
        const data = response.data;
        const customersList = data.content?.map((customer) => ({ ...customer, name: customer.name?.trim() }));
        setCustomerDropdownData(customersList);
        if (string !== "" && selectedCustomerId === null) {
          dispatch(setPageNumber(0));
        }
        setCustomerLoading(false);
        dispatch(setIsCanadianOeCreditCard(data.content[0].canadian));
      })
      .catch((err) => {
        setCustomerLoading(false);
      })
      .finally(() => {
        setCustomerAutoCompleteLoading(false);
      });
  };

  /**
   * Fetch all the customer plants for the selected customer.
   * Used for Billing Plants Autocomplete and Billing Plants listing table
   */
  /* const fetchBillingPlantdetailsByName = (string) => {
    if (string !== '' && selectedCustomerBillingPlantId !== null) {
      OrderEntryService.fetchBillingPlantdetailsByName(selectedCustomerId, isCustomerDpu, '')
      .then((response) => {       
        const data = response.data.content; 
        const customerPlantsList = data?.map((plants) => ({...plants, name: plants.name?.trim()}));          
        dispatch(setCustomerPlant(customerPlantsList));
        setPlantsLoading(false);       
      })
      .catch((err) => {
        setPlantsLoading(false);
      });
    }else {
      OrderEntryService.fetchBillingPlantdetailsByName(selectedCustomerId, isCustomerDpu, (string || ''))
        .then((response) => {       
          const data = response.data.content;  
          const customerPlantsList = data?.map((plants) => ({...plants, name: plants.name?.trim()}));          
          dispatch(setCustomerPlant(customerPlantsList));
          setPlantsLoading(false);       
        })
        .catch((err) => {
          setPlantsLoading(false);
        });
    }
  }; */
  const fetchBillingPlantdetailsByNameNew = (string) => {
    if (selectedCustomerId) {
      setPlantsLoading(true);
      OrderEntryService.fetchBillingPlantdetailsByName(selectedCustomerId, isCustomerDpu, string || "")
        .then((response) => {
          const data = response.data.content;
          const customerPlantsList = data?.map((plants) => ({ ...plants, name: plants.name?.trim() }));
          dispatch(setCustomerPlant(customerPlantsList));
        })
        .catch((err) => {})
        .finally(() => {
          setPlantsLoading(false);
        });
    }
  };

  /**
   * Fetch all the customer plants for the selected customer.
   * Used for Pickup Plants Autocomplete
   */
  const fetchPickupPlantdetailsByName = (string) => {
    if (selectedCustomerId) {
      OrderEntryService.fetchPickupPlantdetailsByName(selectedCustomerId, isCustomerDpu, string)
        .then((response) => {
          const data = response.data.content;
          const customerPlantsList = data?.map((plants) => ({ ...plants, name: plants.name?.trim() }));
          setPickupPlantDropdownData(customerPlantsList);
        })
        .catch((err) => {});
    }
  };

  /**
   * Fetch all the customer plants for the selected customer.
   * Used for Delivery Plants Autocomplete
   */
  const fetchDeliveryPlantdetailsByName = (string) => {
    if (selectedCustomerId) {
      OrderEntryService.fetchPickupPlantdetailsByName(selectedCustomerId, isCustomerDpu, string, pageNumber)
        .then((response) => {
          const data = response.data.content;
          const customerPlantsList = data?.map((plants) => ({ ...plants, name: plants.name?.trim() }));
          setDeliveryPlantDropdownData(customerPlantsList);
        })
        .catch((err) => {});
    }
  };

  /**
   * Fetch all Outbound/Reload Yards for the selected pickup plant.
   * Used for Pickup Yards Autocomplete
   */
  const fetchPickupYardDetailsByName = (string) => {
    OrderEntryService.fetchYardDetailsByName(
      selectedCustomerId,
      selectedCustomerBillingPlantId,
      !pickupPlantOutbound,
      pickupPlantOutbound,
      string
    )
      .then((response) => {
        const data = response.data.content;
        const yardsList = data?.map((yards) => ({ ...yards, description: yards.description?.trim() }));
        setPickupYardsData(yardsList);
      })
      .catch((err) => {});
  };

  /**
   * Fetch all Outbound/Reload Yards for the selected delivery plant.
   * Used for Delivery Yards Autocomplete
   */
  const fetchDeliveryYardDetailsByName = (string) => {
    OrderEntryService.fetchYardDetailsByName(
      selectedCustomerId,
      selectedCustomerBillingPlantId,
      !deliveryPlantOutbound,
      deliveryPlantOutbound,
      string,
      pageNumber
    )
      .then((response) => {
        const data = response.data.content;
        const yardsList = data?.map((yards) => ({ ...yards, description: yards.description?.trim() }));
        setDeliveryYardsData(yardsList);
      })
      .catch((err) => {});
  };

  /**
   * Fetch all Outbound/Reload Shuttle Citys for the selected pickup plant.
   * Used for Pickup Shuttle Citys Autocomplete
   */
  const fetchPickupCityDetailsByName = (string) => {
    OrderEntryService.fetchCityDetailsByName(
      selectedCustomerId,
      selectedCustomerBillingPlantId,
      !pickupPlantOutbound,
      pickupPlantOutbound,
      string
    )
      .then((response) => {
        const data = response.data.content;
        const cityList = data?.map((cities) => ({ ...cities, city: cities.city?.trim() }));
        setPickUpCityData(cityList);
      })
      .catch((err) => {});
  };

  /**
   * Fetch all Outbound/Reload Shuttle Citys for the selected delivery plant.
   * Used for Delivery Shuttle Citys Autocomplete
   */
  const fetchDeliveryCityDetailsByName = (string) => {
    OrderEntryService.fetchCityDetailsByName(
      selectedCustomerId,
      selectedCustomerBillingPlantId,
      !deliveryPlantOutbound,
      deliveryPlantOutbound,
      string
    )
      .then((response) => {
        const data = response.data.content;
        const cityList = data?.map((cities) => ({ ...cities, city: cities.city?.trim() }));
        setDeliveryCityData(cityList);
      })
      .catch((err) => {});
  };

  /**
   * Fetch all Open Bulk Invoices for the selected customer.
   * Used for Bulk Invoices Autocomplete
   */
  const fetchBulkUnitdetailsByName = (string) => {
    if (selectedCustomerId) {
      OrderEntryService.fetchBulkUnitdetailsByName(selectedCustomerId, string)
        .then((response) => {
          const data = response.data.content;
          const invoiceList = data?.map((invoice) => ({
            ...invoice,
            description: invoice.description?.trim(),
          }));
          setBulkInvoiceData(invoiceList);
        })
        .catch((err) => console.log(err));
    }
  };

  /**
   * Validate Batchload Sequence Number
   */
  const validateBatchLoad = (firstBatchSequence, lastBatchSequence) => {
    OrderEntryService.validateSequence(firstBatchSequence, lastBatchSequence)
      .then((response) => {
        const { data } = response;
        if (data === true) {
          setIsBatchLoadValid(true);
        } else {
          setIsBatchLoadValid(false);
        }
      })
      .catch((err) => {
        setIsBatchLoadValid(false);
      });
  };

  /************************************************  Function Definitions ends here  ************************************************/

  /****************************************************  Handles for Evevnts starts here  ********************************************/

  /**
   * used for Customer selection Lookup - open
   */
  const handleCustomerLookupModalShow = () => {
    dispatch(setCustomerSelection(true));
  };
  /**
   * used for Customer selection Lookup - onSelect
   */
  const handleCustomerLookupSelection = (customer, event) => {
    dispatch(setcustomerData(customer));
    dispatch(setCustomerNameInput(customer.name));
    dispatch(setSelectedCustomerId(customer.customerPK));
    dispatch(setChangeColor(true));
    dispatch(setCustomerSelection(false));
  };

  /**
   * used for Customer selection Lookup - close
   */
  const customerModalHide = () => {
    dispatch(setCustomerSelection(false));
  };

  /**
   * used for Customer Billing Plant selection Lookup - open
   */
  const handleCustomerPlantLookupModalShow = () => {
    if (customerIndb !== null && customerIndb.usePlants) {
      dispatch(setBillingPlantSelection(true));
    }
  };
  /**
   * used for Customer Billing Plant selection Lookup - onSelect
   */
  const handleCustomerPlantLookupSelection = (plant) => {
    dispatch(setSelectedCustomerBillingPlantId(plant.customerPlantPK));
    dispatch(setPickupAtPlant(true));
    if (plant.yardFK !== null) dispatch(setShuttleToYard(true));
    dispatch(setPickupCustomerPlantId(plant.customerPlantPK));
    dispatch(setCustomerPlantName(plant.name));
    dispatch(setCustomerPickupPlantData(plant));
    dispatch(setCustomerPlantData(plant));
    dispatch(setChangeColorForPlantTable(true));
    dispatch(setPickupPlantOutbound(plant.outbound));
    dispatch(setDeliveryPlantOutbound(plant.outbound));
    dispatch(setBillingPlantSelection(false));
  };

  /**
   * used for Customer Billing Plant selection Lookup - close
   */
  const billingPlantModalHide = () => {
    dispatch(setBillingPlantSelection(false));
  };

  /**
   * used for Customer Pickup Plant selection Lookup - open
   */
  const handlePickupPlantLookupModalShow = () => {
    if (customerIndb !== null) {
      dispatch(setPickupPlantSelection(true));
    }
  };
  /**
   * used for Customer Pickup Plant selection Lookup - onSelect
   */
  const handlePickupPlantLookupSelection = (plant) => {
    dispatch(setPickupCustomerPlantId(plant.customerPlantPK));
    dispatch(setPickupPlantInput(plant.name));
    dispatch(setCustomerPickupPlantData(plant));
    if (plant.yardFK !== null) dispatch(setShuttleToYard(true));
    if (plant.yardFK) {
      dispatch(setPickupCustomerYardId(plant.yardFK));

      OrderEntryService.fetchYardById(plant.yardFK)
        .then((response) => {
          const { data } = response;
          dispatch(setPickupYardInput(data?.description?.trim()));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setPickupCustomerYardId(null));
      dispatch(setPickupYardInput(""));
    }
    dispatch(setPickupPlantOutbound(plant.outbound));
    dispatch(setPickupPlantSelection(false));
  };

  /**
   * used for Customer Pickup Plant selection Lookup - close
   */
  const pickupPlantModalHide = () => {
    dispatch(setPickupPlantSelection(false));
  };

  /**
   * used for Customer Delivery Plant selection Lookup - open
   */
  const handleDeliveryPlantLookupModalShow = () => {
    if (customerIndb !== null) {
      dispatch(setDeliveryPlantSelection(true));
    }
  };
  /**
   * used for Customer Delivery Plant selection Lookup - onSelect
   */
  const handleDeliveryPlantLookupSelection = (plant) => {
    dispatch(setDeliveryCustomerPlantId(plant.customerPlantPK));
    dispatch(setDeliveryPlantInput(plant.name));
    dispatch(setCustomerDeliveryPlantData(plant));
    if (plant.yardFK !== null) dispatch(setShuttleFromYard(true));
    if (plant.yardFK) {
      dispatch(setDeliveryCustomerYardId(plant.yardFK));

      OrderEntryService.fetchYardById(plant.yardFK).then((response) => {
        const { data } = response;
        dispatch(setDeliveryYardInput(data?.description?.trim()));
      });
    } else {
      dispatch(setDeliveryCustomerYardId(null));
      dispatch(setDeliveryYardInput(""));
    }
    dispatch(setDeliveryPlantOutbound(plant.outbound));
    dispatch(setDeliveryPlantSelection(false));
  };

  /**
   * used for Customer Delivery Plant selection Lookup - close
   */
  const deliveryPlantModalHide = () => {
    dispatch(setDeliveryPlantSelection(false));
  };

  /**
   * used for Pickup Yard selection Lookup - open
   */
  const handlePickupYardLookupModalShow = () => {
    if (customerIndb != null && shuttleToYard) {
      dispatch(setPickupYardSelection(true));
    }
  };
  /**
   * used for Pickup Yard selection Lookup - onSelect
   */
  const handlePickupYardLookupSelection = (yard) => {
    dispatch(setPickupCustomerYardId(yard.yardPK));
    dispatch(setPickupYardInput(yard.description));
    dispatch(setCustomerPickupYardData(yard));
    dispatch(setPickupYardSelection(false));
  };

  /**
   * used for Pickup Yard selection Lookup - close
   */
  const hidePickupYardModal = () => {
    dispatch(setPickupYardSelection(false));
  };

  /**
   * used for Delivery Yard selection Lookup - open
   */
  const handleDeliveryYardLookupModalshow = () => {
    if (customerIndb != null && shuttleFromYard) {
      dispatch(setDeliveryYardSelection(true));
    }
  };
  /**
   * used for Delivery Yard selection Lookup - onSelect
   */
  const handleDeliveryYardLookupSelection = (yard) => {
    dispatch(setDeliveryCustomerYardId(yard.yardPK));
    dispatch(setDeliveryYardInput(yard.description));
    dispatch(setCustomerDeliveryYardData(yard));
    dispatch(setDeliveryYardSelection(false));
  };

  /**
   * used for Delivery Yard selection Lookup - close
   */
  const hideDeliveryYardModal = () => {
    dispatch(setDeliveryYardSelection(false));
  };

  /**
   * used for Pickup Shuttle City selection Lookup - open
   */
  const handlePickupShuttleCityLookupModalShow = () => {
    if (customerIndb != null && shuttleToYard) {
      dispatch(setPickupShuttleCitySelection(true));
    }
  };
  /**
   * used for Pickup Shuttle City selection Lookup - onSelect
   */
  const handlePickupShuttleCityLookupSelection = (shuttleCity) => {
    dispatch(setPickupCustomerShuttleCityId(shuttleCity.shuttleCityPK));
    dispatch(setPickupCityInput(shuttleCity.city));
    dispatch(setPickupShuttleCitySelection(false));
  };

  /**
   * used for Pickup Shuttle City selection Lookup - close
   */
  const pickupShuttleCityModalHide = () => {
    dispatch(setPickupShuttleCitySelection(false));
  };

  /**
   * used for Delivery Shuttle City selection Lookup - open
   */
  const handleDeliveryShuttleCityLookupModalShow = () => {
    if (customerIndb != null && shuttleFromYard) {
      dispatch(setDeliveryShuttleCitySelection(true));
    }
  };
  /**
   * used for Delivery Shuttle City selection Lookup - onSelect
   */
  const handleDeliveryShuttleCityLookupSelection = (shuttleCity) => {
    dispatch(setDeliveryCustomerShuttleCityId(shuttleCity.shuttleCityPK));
    dispatch(setDeliveryCityInput(shuttleCity.city));
    dispatch(setDeliveryShuttleCitySelection(false));
  };

  /**
   * used for Delivery Shuttle City selection Lookup - close
   */
  const deliveryShuttleCityModalHide = () => {
    dispatch(setDeliveryShuttleCitySelection(false));
  };

  /**
   * used for Add Open Bulk Invoice
   */
  const handleBulkInvoiceModalShow = () => {
    if (customerIndb != null && bulkUnits) {
      setShowBulkInvoiceModal(true);
    }
  };
  /**
   * used for Batchload sequence validation
   */
  const handleBatchLoadOnBlur = (firstBatchSequence, lastBatchSequence) => {
    if (
      firstBatchSequence !== "" &&
      lastBatchSequence !== "" &&
      firstBatchSequence.length === lastBatchSequence.length
    ) {
      if (firstBatchSequence.length === 1 && lastBatchSequence.length === 1) {
        let firstBatchSequenceType = Number.isInteger(parseInt(firstBatchSequence)) ? "number" : "string";
        let lastBatchSequenceType = Number.isInteger(parseInt(lastBatchSequence)) ? "number" : "string";

        if (firstBatchSequenceType === lastBatchSequenceType && firstBatchSequence < lastBatchSequence) {
          setIsBatchLoadValid(true);
        } else {
          setIsBatchLoadValid(false);
        }
      } else {
        validateBatchLoad(firstBatchSequence, lastBatchSequence);
      }
    } else {
      setIsBatchLoadValid(false);
    }
  };

  /**
   * For finding the total no: of units in Batch Load
   */
  const getTotalUnitsForBatchLoad = (firstBatchSequence, lastBatchSequence) => {
    OrderEntryService.batchLoadsUnitsCount(firstBatchSequence, lastBatchSequence)
      .then((response) => {
        const data = response.data;
        dispatch(setTotalBatchLoadCount(data));
      })
      .catch((err) => {});
  };

  /**
   * used for Customer Autocomplete Dropdown
   */
  const handleCustomerSelection = (customer) => {
    dispatch(setcustomerData(customer));
    dispatch(setCustomerNameInput(customer.name));
    dispatch(setSelectedCustomerId(customer.customerPK));
    dispatch(setChangeColor(true));
    dispatch(setIsPlantExist(customer.usePlants));
  };

  /**
   * used for Billing Plant Autocomplete Dropdown
   */
  const handleCustomerPlantSelection = (plant) => {
    dispatch(setCustomerPlantName(plant.name));
    dispatch(setCustomerPlantData(plant));
    dispatch(setSelectedCustomerBillingPlantId(plant.customerPlantPK));
    dispatch(setPickupAtPlant(true));
    if (plant.yardFK !== null) dispatch(setShuttleToYard(true));
    dispatch(setPickupPlantInput(plant.name));
    dispatch(setPickupCustomerPlantId(plant.customerPlantPK));
    dispatch(setCustomerPickupPlantData(plant));
    if (deliverToPlant === true) {
      dispatch(setDeliveryPlantInput(plant.name));
      dispatch(setDeliveryCustomerPlantId(plant.customerPlantPK));
      dispatch(setCustomerDeliveryPlantData(plant));
    }
    dispatch(setSelectedCustomerPlantId(plant.customerPlantPK));

    dispatch(setChangeColorForPlantTable(true));
    dispatch(setPickupPlantOutbound(plant.outbound));
    dispatch(setDeliveryPlantOutbound(plant.outbound));
  };

  /**
   * used for Pickup Plant Autocomplete Dropdown
   */
  const handlePickupPlantSelection = (plant) => {
    dispatch(setPickupPlantInput(plant.name));
    dispatch(setPickupCustomerPlantId(plant.customerPlantPK));
    dispatch(setCustomerPickupPlantData(plant));
    dispatch(setPlantCode(plant.plantNumber));
    defaultPickupYardSetting(plant);
    defaultPickUpCitySetting(plant);
    dispatch(setPickupPlantOutbound(plant.outbound));
    if (plant.yardFK !== null) dispatch(setShuttleToYard(true));
  };

  /**
   * used for Delivery Plant Autocomplete Dropdown
   */
  const handleDeliveryPlantSelection = (plant) => {
    dispatch(setDeliveryPlantInput(plant.name));
    dispatch(setDeliveryCustomerPlantId(plant.customerPlantPK));
    dispatch(setCustomerDeliveryPlantData(plant));
    defaultDeliveryYardSetting(plant);
    defaultDeliveryCitySetting(plant);
    dispatch(setDeliveryPlantOutbound(plant.outbound));
    if (plant.yardFK !== null) dispatch(setShuttleFromYard(true));
  };

  /**
   * used for Pickup Yard Autocomplete Dropdown
   */
  const handlePickupYardSelection = (yard) => {
    dispatch(setPickupYardInput(yard.description));
    dispatch(setPickupCustomerYardId(yard.yardPK));
    dispatch(setCustomerPickupYardData(yard));
  };

  /**
   * used for Delivery Yard Autocomplete Dropdown
   */
  const handleDeliveryYardSelection = (yard) => {
    dispatch(setDeliveryYardInput(yard.description));
    dispatch(setDeliveryCustomerYardId(yard.yardPK));
    dispatch(setCustomerDeliveryYardData(yard));
  };

  /**
   * used for Pickup City Autocomplete Dropdown
   */
  const handlePickupCitySelection = (city) => {
    dispatch(setPickupCityInput(city.city));
    dispatch(setPickupCustomerShuttleCityId(city.shuttleCityPK));
  };

  /**
   * used for Delivery City Autocomplete Dropdown
   */
  const handleDeliveryCitySelection = (city) => {
    dispatch(setDeliveryCityInput(city.city));
    dispatch(setDeliveryCustomerShuttleCityId(city.shuttleCityPK));
  };

  /**
   * used for Bulk Invoice Autocomplete Dropdown
   */
  const handleBulkInvoiceSelection = (invoice) => {
    dispatch(setBulkInvoiceInput(invoice.description));
    dispatch(setBulkInvoiceFK(invoice.bulkInvoicePK));
  };

  /**
   * used to set default Pickup Yard details
   */
  const defaultPickupYardSetting = (customerPickupPlantData) => {
    if (customerPickupPlantData !== null) {
      if (customerPickupPlantData?.yardFK && pickupYardsData !== null) {
        const yardData = pickupYardsData?.find((yard) => yard.yardPK === customerPickupPlantData?.yardFK);

        if (yardData !== undefined) {
          dispatch(setPickupYardInput(yardData?.description));
          dispatch(setPickupCustomerYardId(yardData?.yardPK));
        } else {
          if (customerPickupPlantData?.yardFK) {
            dispatch(setPickupCustomerYardId(customerPickupPlantData?.yardFK));
            OrderEntryService.fetchYardById(customerPickupPlantData?.yardFK)
              .then((response) => {
                const { data } = response;
                if (pickupPlantInput !== "") {
                  dispatch(setPickupYardInput(data.description));
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            dispatch(setPickupCustomerYardId(null));
            dispatch(setPickupYardInput(""));
          }
        }
      } else {
        dispatch(setPickupCustomerYardId(null));
        dispatch(setPickupYardInput(""));
      }
    }
  };

  /**
   * used to set default Delivery Yard details
   */
  const defaultDeliveryYardSetting = (customerDeliveryPlantData) => {
    if (customerDeliveryPlantData !== null) {
      if (customerDeliveryPlantData?.yardFK && deliveryYardsData !== null) {
        const yardData = deliveryYardsData?.find((yard) => yard.yardPK === customerDeliveryPlantData?.yardFK);
        if (yardData !== undefined) {
          dispatch(setDeliveryYardInput(yardData?.description));
          dispatch(setDeliveryCustomerYardId(yardData?.yardPK));
        } else {
          if (customerDeliveryPlantData?.yardFK) {
            dispatch(setDeliveryCustomerYardId(customerDeliveryPlantData?.yardFK));
            OrderEntryService.fetchYardById(customerDeliveryPlantData?.yardFK)
              .then((response) => {
                const { data } = response;
                if (deliveryPlantInput !== "") {
                  dispatch(setDeliveryYardInput(data.description));
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            dispatch(setDeliveryCustomerYardId(null));
            dispatch(setDeliveryYardInput(""));
          }
        }
      } else {
        dispatch(setDeliveryCustomerYardId(null));
        dispatch(setDeliveryYardInput(""));
      }
    }
  };

  /**
   * used to set default Pickup City details
   */
  const defaultPickUpCitySetting = (customerPickupPlantData) => {
    if (null !== customerPickupPlantData) {
      if (customerPickupPlantData?.shuttleCityFK && pickUpCityData !== null) {
        const cityData = pickUpCityData?.find(
          (city) => city.shuttleCityPK === customerPickupPlantData?.shuttleCityFK
        );
        if (cityData !== undefined) {
          dispatch(setPickupCityInput(cityData?.city));
          dispatch(setPickupCustomerShuttleCityId(cityData?.shuttleCityPK));
        } else {
          if (customerPickupPlantData?.shuttleCityFK) {
            dispatch(setPickupCustomerShuttleCityId(customerPickupPlantData?.shuttleCityFK));
            OrderEntryService.fetchCityById(customerPickupPlantData?.shuttleCityFK)
              .then((response) => {
                const { data } = response;
                if (pickupPlantInput !== "") {
                  dispatch(setPickupCityInput(data.city));
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            dispatch(setPickupCustomerShuttleCityId(null));
            dispatch(setPickupCityInput(""));
          }
        }
      } else {
        dispatch(setPickupCustomerShuttleCityId(null));
        dispatch(setPickupCityInput(""));
      }
    }
  };

  /**
   * used to set default Delivery City details
   */
  const defaultDeliveryCitySetting = (customerDeliveryPlantData) => {
    if (null !== customerDeliveryPlantData) {
      if (customerDeliveryPlantData?.shuttleCityFK && deliveryCityData !== null) {
        const cityData = deliveryCityData?.find(
          (city) => city.shuttleCityPK === customerDeliveryPlantData?.shuttleCityFK
        );
        if (cityData !== undefined) {
          dispatch(setDeliveryCityInput(cityData?.city));
          dispatch(setDeliveryCustomerShuttleCityId(cityData?.shuttleCityPK));
        } else {
          if (customerDeliveryPlantData?.shuttleCityFK) {
            dispatch(setDeliveryCustomerShuttleCityId(customerDeliveryPlantData?.shuttleCityFK));
            OrderEntryService.fetchCityById(customerDeliveryPlantData?.shuttleCityFK)
              .then((response) => {
                const { data } = response;
                if (deliveryPlantInput !== "") {
                  dispatch(setDeliveryCityInput(data.city));
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            dispatch(setDeliveryCustomerShuttleCityId(null));
            dispatch(setDeliveryCityInput(""));
          }
        }
      } else {
        dispatch(setDeliveryCustomerShuttleCityId(null));
        dispatch(setDeliveryCityInput(""));
      }
    }
  };

  /****************************************************  Handles for Evevnts ends here  ********************************************/

  /***************************************************  UseEffects starts here  ****************************************************/
  /**
   * reset the data if the customer selection is cleared
   */
  useEffect(() => {
    setSelectedPickupYard(null);
    setBulkInvoiceData([]);
    dispatch(setPrintBol(false));
    setDuplicateLoad(false);
    setBatchLoad(false);
    dispatch(setIsPlantExist(false));
    dispatch(setSelectedCustomerBillingPlantId(null));
    dispatch(setIsCustomerMisc(false));
    dispatch(setDeliverToPlant(false));
    dispatch(setDeliveryCustomerPlantId(null));
    dispatch(setShuttleFromYard(false));
    dispatch(setDeliveryCustomerYardId(null));
    dispatch(setDeliveryCustomerShuttleCityId(null));
    dispatch(setPickupAtPlant(false));
    dispatch(setPickupCustomerPlantId(null));
    dispatch(setCustomerPlantData(null)); ///test
    dispatch(setCustomerPickupPlantData(null));
    dispatch(setCustomerPickupYardData(null));
    dispatch(setCustomerDeliveryYardData(null));
    dispatch(setInvoiceMilesAdjustment(0));
    dispatch(setDriverMilesAdjustment(0));
    dispatch(setShuttleToYard(false));
    dispatch(setPickupCustomerYardId(null));
    dispatch(setDeliveryCustomerYardId(null));
    dispatch(setPickupCustomerShuttleCityId(null));
    dispatch(setDeliveryCustomerShuttleCityId(null));
    dispatch(setReload(false));
    dispatch(setReturnRates(false));
    dispatch(setBulkUnits(false));
    dispatch(setCheckPrepaid(false));
    dispatch(setPlantCode(""));
    dispatch(setNoPickupPulloutFee(false));
    dispatch(setNoDeliveryPulloutFee(false));
    dispatch(setCustomerPlant(null));
    dispatch(setCustomerPlantName(""));
    dispatch(setBulkinvoices(null));
    dispatch(setChargeCreditCard(false));
    dispatch(setUseOpenBalance(false));
    dispatch(setPickupYardId(null));
    dispatch(setDeliveryCustomerYardId(null));
    dispatch(setIsCustomerTabValid(false));
    dispatch(setIsCustomerDpu(false));
    dispatch(setDuplicateLoadFlag(false));
    dispatch(setIsFODInvoice(false));
    dispatch(setBOLPrinterFK(0));
  }, [selectedCustomerId]);

  /**
   * reset the data if the Customer Billing Plant selection is cleared
   */
  useEffect(() => {
    dispatch(setPickupAtPlant(false));
    dispatch(setPickupPlantInput(""));
    dispatch(setPickupCustomerYardId(null));
    dispatch(setPickupCustomerShuttleCityId(null));
    dispatch(setNoPickupPulloutFee(false));
    dispatch(setPlantCode(""));
    dispatch(setDeliveryCustomerShuttleCityId(null));
    dispatch(setDeliveryCustomerYardId(null));
    dispatch(setCustomerPickupYardData(null));
    dispatch(setCustomerDeliveryYardData(null));
    dispatch(setInvoiceMilesAdjustment(0));
    dispatch(setDriverMilesAdjustment(0));
    dispatch(setDeliveryPlantInput(""));
    dispatch(setDeliverToPlant(false));
    dispatch(setNoDeliveryPulloutFee(false));
    setSelectedPickupYard(null);
    setBulkInvoiceData(null);
    dispatch(setPrintBol(false));
    dispatch(setPickupYardId(null));
    dispatch(setReturnRates(false));
  }, [selectedCustomerPlantId]);

  /**
   * Fetch Customer details when searchCustomer/pageNumber changes
   */
  useEffect(() => {
    debounceFetchCustomerDetails(customerNameInput);

    if (customerNameInput !== "") {
    } else {
      dispatch(setChangeColor(false));
    }
  }, [customerNameInput, pageNumber]);

  /**
   * used when selected customer changes
   */
  useEffect(() => {
    if (null !== customerIndb && customerIndb?.usePlants === true) {
      if (selectedCustomerId) {
        fetchBillingPlantdetailsByNameNew();
      }
    } else {
      dispatch(setCustomerPlant([]));
      setPlantsLoading(false);
      dispatch(setSelectedCustomerBillingPlantId(null));
      dispatch(setSelectedCustomerPlantId(null));
      dispatch(setCustomerPlantData(null));
    }
  }, [customerIndb, selectedCustomerId, isCustomerDpu]);

  /**
   * set default values after customer & billing plant is selected
   */
  useEffect(() => {
    if (customerPlantIndb !== null && selectedCustomerPlantId !== null) {
      dispatch(setPickupAtPlant(true));
      dispatch(setPickupPlantInput(customerPlantIndb.name));
      dispatch(setPickupCustomerPlantId(selectedCustomerPlantId));
      dispatch(setCustomerPickupPlantData(customerPlantIndb));
      if (deliverToPlant === true) {
        dispatch(setDeliveryPlantInput(customerPlantIndb.name));
        dispatch(setDeliveryCustomerPlantId(selectedCustomerPlantId));
        dispatch(setCustomerDeliveryPlantData(customerPlantIndb));
      }
      dispatch(setSelectedCustomerBillingPlantId(selectedCustomerPlantId));
    }
  }, [selectedCustomerPlantId]);

  /**
   * set flag for customer having plants
   */
  useEffect(() => {
    if (customerIndb !== null || selectedCustomerId !== null) {
      setShowCustomerPlatDiv(customerIndb?.usePlants ? customerIndb?.usePlants : false);
    } else {
      setShowCustomerPlatDiv(false);
    }
  }, [customerIndb, selectedCustomerId]);

  /**
   * set billing plant id to redux whenever billing plant changes
   */
  useEffect(() => {
    if (customerPlantIndb !== null && customerPlantIndb !== "" && customerPlantIndb !== undefined) {
      dispatch(setSelectedCustomerPlantId(customerPlantIndb.customerPlantPK));
    }
  }, [customerPlantIndb]);
  /**
   * Call function to get total number of units in batch load
   */
  useEffect(() => {
    if (
      batchLoadCustomerTab &&
      firstBatchSequence &&
      lastBatchSequence &&
      firstBatchSequence.length === lastBatchSequence.length
    ) {
      getTotalUnitsForBatchLoad(firstBatchSequence, lastBatchSequence);
    }
  }, [lastBatchSequence, firstBatchSequence, batchLoadCustomerTab, chargeCreditCard]);

  /**
   * used to set default values in Customer tabs whenever customer or billing plant changes
   */
  useEffect(() => {
    if (customerIndb != null) {
      dispatch(setCustomerNameInput(customerIndb?.name));
      dispatch(setQuickPayCustomer(customerIndb?.quickPayCustomer ? true : false));
      dispatch(setChargeCreditCard(customerIndb?.creditCardPayments === "Y" ? true : false));
      dispatch(setUseOpenBalance(customerIndb?.openBalancePayments === "Y" ? true : false));
      dispatch(
        setBulkUnits(
          (customerIndb?.bulkInvoices === "Y" || customerIndb?.bulkInvoices === "O") &&
            !customerIndb?.openBulkInvoices
            ? true
            : false
        )
      );
      dispatch(setIsCustomerMisc(customerIndb?.miscellaneousCustomer === true ? true : false));
    }
    if (customerIndb !== null && (customerIndb?.usePlants || customerIndb?.dpuCustomer)) {
      dispatch(
        setIsCustomerDpu(
          customerIndb?.usePlants === false && customerIndb?.dpuCustomer === true
            ? customerIndb?.dpuCustomer
            : false
        )
      );
    }
  }, [customerIndb]);

  useEffect(() => {
    let plantpk = customerPlantIndb !== null ? customerPlantIndb?.customerPlantPK : null;
    let outbound = customerPlantIndb !== null ? customerPlantIndb?.outbound : true;

    if (null !== plantpk || customerIndb?.customerPK !== null || customerIndb?.customerPK !== undefined) {
      fetchPickupPlantdetailsByName();
      fetchDeliveryPlantdetailsByName();
      if (shuttleToYard) {
        fetchPickupYardDetailsByName();
        fetchPickupCityDetailsByName();
      }
      if (shuttleFromYard) {
        fetchDeliveryYardDetailsByName();
        fetchDeliveryCityDetailsByName();
      }
    }
  }, [shuttleToYard, shuttleFromYard, customerIndb, customerPlantIndb, pickupPlantOutbound]);

  /**
   * used to set default values whenever pickup plant changes
   */
  useEffect(() => {
    if (null !== customerPickupPlantData) {
      dispatch(setPlantCode(customerPickupPlantData?.plantNumber));
      if (shuttleToYard) {
        defaultPickupYardSetting(customerPickupPlantData);
        defaultPickUpCitySetting(customerPickupPlantData);
      }
    }
  }, [shuttleToYard, customerPickupPlantData]);
  /**
   * used to set default values whenever delivery plant changes
   */
  useEffect(() => {
    if (null !== customerDeliveryPlantData) {
      if (shuttleFromYard) {
        defaultDeliveryYardSetting(customerDeliveryPlantData);
        defaultDeliveryCitySetting(customerDeliveryPlantData);
      }
    }
  }, [shuttleFromYard, customerDeliveryPlantData]);

  /**
   * used to set default values whenever shuttleToYard & shuttleFromYard changes
   */
  useEffect(() => {
    if (customerPlantIndb !== null && selectedCustomerId !== null) {
      //Added for pickupyard id check
      let outbound = customerPlantIndb !== null ? customerPlantIndb?.outbound : true;
      if (shuttleToYard) fetchPickupYardDetailsByName();
      if (shuttleFromYard) fetchDeliveryYardDetailsByName();
    }
  }, [shuttleToYard, shuttleFromYard, customerPlantName, customerPlantIndb, pickupPlantOutbound]);

  /**
   * used to filter values in billing plant table whenever selected billing palnt in autocomplete changes
   */
  // useless as this variable is not used anywhere
  useEffect(() => {
    if (customerPlant !== null && selectedCustomerPlantId !== null) {
      dispatch(
        setCustomerPlantData(customerPlant.find((item) => item.customerPlantPK === selectedCustomerPlantId))
      );
    }
  }, [customerPlant]);

  /**
   * used set default pickup yard values whenever pickup yard id changes
   */
  useEffect(() => {
    if (pickupCustomerYardId) {
      const yard = pickupYardsData?.find((yard) => yard.yardPK === pickupCustomerYardId);
      if (yard !== undefined) {
        setSelectedPickupYard(yard);
      }
    }
  }, [pickupCustomerYardId, pickupYardsData]);

  /**
   * clear the pickup customer plant id when input is cleared
   */
  useEffect(() => {
    if (pickupPlantInput !== "") {
      if (shuttleToYard) {
        defaultPickupYardSetting(customerPickupPlantData);
        defaultPickUpCitySetting(customerPickupPlantData);
      }
    }
  }, [shuttleToYard, pickupPlantInput]);

  /**
   * clear the delivery customer plant id when input is cleared
   */
  useEffect(() => {
    if (deliveryPlantInput !== "") {
      if (shuttleFromYard) {
        defaultDeliveryYardSetting(customerDeliveryPlantData);
        defaultDeliveryCitySetting(customerDeliveryPlantData);
      }
    }
  }, [deliveryPlantInput]);
  /**
   * default shuttle to yard setting
   */
  useEffect(() => {
    if (pickupAtPlant && customerPickupPlantData !== null) {
      if (customerPickupPlantData.yardFK !== null) {
        dispatch(setShuttleToYard(true));
      } else {
        dispatch(setShuttleToYard(false));
      }
    } else {
      dispatch(setShuttleToYard(false));
    }
  }, [pickupAtPlant, customerPickupPlantData]);

  /**
   * set default pickup plant
   */
  useEffect(() => {
    if (!pickupAtPlant) {
      dispatch(setPickupCustomerPlantId(null));
      dispatch(setPickupPlantInput(""));
      dispatch(setPlantCode(""));
    } else {
      if (customerPlantIndb !== null) {
        dispatch(setPickupCustomerPlantId(customerPlantIndb.customerPlantPK));
        dispatch(setPickupPlantInput(customerPlantIndb.name));
        dispatch(setCustomerPickupPlantData(customerPlantIndb));
        dispatch(setPickupPlantOutbound(customerPlantIndb.outbound));
      }
    }
  }, [pickupAtPlant]);
  /**
   * default shuttle from yard setting when delivery plant changes
   */
  useEffect(() => {
    if (deliverToPlant && customerDeliveryPlantData !== null) {
      if (customerDeliveryPlantData.yardFK !== null) {
        dispatch(setShuttleFromYard(true));
      } else {
        dispatch(setShuttleFromYard(false));
      }
    } else {
      dispatch(setShuttleFromYard(false));
    }
  }, [deliverToPlant, customerDeliveryPlantData]);
  /**
   * default shuttle city and yard settings when shuttle to yard changes
   */
  useEffect(() => {
    if (!shuttleToYard) {
      dispatch(setPickupYardInput(""));
      dispatch(setPickupCityInput(""));
      dispatch(setPickupCustomerYardId(null));
      dispatch(setPickupCustomerShuttleCityId(null));
      dispatch(setNoPickupPulloutFee(false));
    } else {
      defaultPickupYardSetting(customerPickupPlantData);
      defaultPickUpCitySetting(customerPickupPlantData);
    }
  }, [shuttleToYard]);
  /**
   * default shuttle city and yard settings when shuttle from yard changes
   */
  useEffect(() => {
    if (!shuttleFromYard) {
      dispatch(setDeliveryYardInput(""));
      dispatch(setDeliveryCityInput(""));
      dispatch(setDeliveryCustomerYardId(null));
      dispatch(setDeliveryCustomerShuttleCityId(null));
      dispatch(setNoDeliveryPulloutFee(false));
    } else {
      defaultDeliveryYardSetting(customerDeliveryPlantData);
      defaultDeliveryCitySetting(customerDeliveryPlantData);
    }
  }, [shuttleFromYard]);
  /**
   * default delevery plant settings when deliver to plant changes
   */
  useEffect(() => {
    if (!deliverToPlant) {
      dispatch(setDeliveryCustomerPlantId(null));
      dispatch(setDeliveryPlantInput(""));
    } else {
      // set delivery plant when deliverToPlant is checked
      if (customerPlantIndb !== null) {
        dispatch(setDeliveryCustomerPlantId(customerPlantIndb.customerPlantPK));
        dispatch(setDeliveryPlantInput(customerPlantIndb.name));
        dispatch(setCustomerDeliveryPlantData(customerPlantIndb));
        dispatch(setDeliveryPlantOutbound(customerPlantIndb.outbound));
      }
    }
  }, [deliverToPlant]);

  /**
   * If bulkUnits flag is set, fetch all the open bulk invoices of the selected customer.
   * Called whenever bulkUnits flag / selectedCustomerId is changed.
   */
  useEffect(() => {
    if (bulkUnits) {
      fetchBulkUnitdetailsByName();
    } else {
      dispatch(setBulkInvoiceInput(""));
      dispatch(setBulkInvoiceFK(""));
    }
  }, [bulkUnits, selectedCustomerId]);

  /**
   * set batchload in redux when local variable batchload changes
   */
  useEffect(() => {
    dispatch(setBatchLoadCustomerTab(batchLoad));
  }, [batchLoad]);
  /**
   * clear first and last batch sequence number when batchload changes
   */
  useEffect(() => {
    if (!batchLoad) {
      dispatch(setFirstBatchSequence(""));
      dispatch(setLastBatchSequence(""));
      setIsBatchLoadValid(false);
    }
  }, [batchLoad]);
  /**
   * sets print BOL when shuttle to yard and pickup yard changes
   */
  useEffect(() => {
    if (
      customerPickupPlantData !== null &&
      customerPickupPlantData.yardFK !== null &&
      customerPickupPlantData.shuttleCityFK !== null
    ) {
      if (shuttleToYard && selectedPickupYard !== null) {
        dispatch(
          setPrintBol(
            selectedPickupYard?.hasPrinters === true && selectedPickupYard?.bolPrinterFK !== null
              ? true
              : false
          )
        );
      } else {
        dispatch(setPrintBol(false));
      }
    }
  }, [shuttleToYard, selectedPickupYard]);

  useEffect(() => {
    if (printBol) dispatch(setBOLPrinterFK(selectedPickupYard.bolPrinterFK));
  }, [printBol]);

  /**
   * set FOD Invoice if
   * 1. customer is AllDealersFOD or
   * 2. prepaid & credit card
   * 3. Openbalance
   */
  useEffect(() => {
    if (customerIndb && selectedCustomerId) {
      if (customerIndb.allDealersFOD) {
        dispatch(setIsFODInvoice(true));
      } else {
        dispatch(setIsFODInvoice(false));
      }
    }
  }, [selectedCustomerId]);

  /**
   * Customer Tab Validation
   */
  useEffect(() => {
    // Enable Customer Tab if all conditions are satisfied
    if (
      selectedCustomerId !== null &&
      (!pickupAtPlant || pickupCustomerPlantId !== null) &&
      (!shuttleToYard ||
        (pickupCustomerYardId &&
          (((customerPickupPlantData?.shuttleCityFK !== null || customerPickupPlantData?.selectShuttleCity) &&
            pickupCustomerShuttleCityId !== null) ||
            (!(
              customerPickupPlantData?.shuttleCityFK !== null || customerPickupPlantData?.selectShuttleCity
            ) &&
              pickupCustomerShuttleCityId === null)))) &&
      (!batchLoad || isBatchLoadValid) &&
      (customerIndb?.bulkInvoices === "O" || !bulkUnits || bulkInvoiceFK !== "") &&
      // if Customer w/o Plants
      (!showCustomerPlatDiv ||
        // if Customer has Plants
        (showCustomerPlatDiv &&
          selectedCustomerBillingPlantId !== null &&
          (!deliverToPlant || deliveryCustomerPlantId !== null) &&
          (!shuttleFromYard ||
            (deliveryCustomerYardId !== null &&
              (((customerDeliveryPlantData?.shuttleCityFK !== null ||
                customerDeliveryPlantData?.selectShuttleCity) &&
                deliveryCustomerShuttleCityId !== null) ||
                (!(
                  customerDeliveryPlantData?.shuttleCityFK !== null ||
                  customerDeliveryPlantData?.selectShuttleCity
                ) &&
                  deliveryCustomerShuttleCityId === null))))))
    ) {
      dispatch(setIsCustomerTabValid(true));
    } else {
      dispatch(setIsCustomerTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedCustomerId,
    showCustomerPlatDiv,
    selectedCustomerBillingPlantId,
    pickupAtPlant,
    pickupCustomerPlantId,
    shuttleToYard,
    pickupCustomerYardId,
    pickupCustomerShuttleCityId,
    deliverToPlant,
    deliveryCustomerPlantId,
    shuttleFromYard,
    deliveryCustomerYardId,
    deliveryCustomerShuttleCityId,
    batchLoad,
    firstBatchSequence,
    lastBatchSequence,
    bulkUnits,
    bulkInvoiceFK,
    isBatchLoadValid,
    customerPickupPlantData,
    customerDeliveryPlantData,
  ]);

  useEffect(() => {
    if (customerPickupYardData !== null) {
      if (customerPickupPlantData?.yardFK !== customerPickupYardData.yardPK) {
        dispatch(setInvoiceMilesAdjustment(customerPickupYardData.invoiceMilesAdjustment));
        dispatch(setDriverMilesAdjustment(customerPickupYardData.driverMilesAdjustment));
      } else {
        dispatch(setInvoiceMilesAdjustment(0));
        dispatch(setDriverMilesAdjustment(0));
      }
    }
  }, [customerPickupYardData]);

  // Populate newly added bulk unit as default
  useEffect(() => {
    if (!showAddBulkInvoice && selectedCustomerId) {
      const fetchBulkUnitDetails = async () => {
        try {
          const response = await OrderEntryService.fetchBulkUnitdetailsByName(selectedCustomerId, "");

          const invoiceList = response?.data?.content?.map((invoice) => ({
            ...invoice,
            description: invoice.description?.trim(),
          }));
          if (invoiceList?.length) {
            const lastElement = invoiceList[invoiceList.length - 1];
            dispatch(setBulkInvoiceInput(lastElement.description));
            dispatch(setBulkInvoiceFK(lastElement.bulkInvoicePK));
            setBulkInvoiceData(invoiceList);
          }
        } catch (error) {
          // Handle errors
        }
      };

      fetchBulkUnitDetails();
    }
  }, [showAddBulkInvoice]);

  /*****************************************************  UseEffects ends here  ******************************************************/
  /**
   * For Customer Listing Pagination
   */
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: customerData,
  };

  const validationSchema = yup.object({
    selectedCustomerId: yup.string().required(),
    pickupAtPlant: yup.boolean(),
    pickupCustomerPlantId: yup.string().when("pickupAtPlant", {
      is: true,
      then: yup
        .string()
        .matches(/A-Za-z0-9{5}/)
        .required(),
      otherwise: "",
    }),
    batchLoad: yup.boolean(),
    firstBatchSequence: yup.string().when("batchLoad", {
      is: true,
      then: yup.string().required(),
      otherwise: "",
    }),
    lastBatchSequence: yup.string().when("batchLoad", {
      is: true,
      then: yup.string().required(),
      otherwise: "",
    }),
  });

  return (
    <Formik
      initialValues={{
        selectedCustomerId,
        pickupCustomerPlantId,
        batchLoad,
        firstBatchSequence,
        lastBatchSequence,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        selectedCustomerId: true,
        pickupCustomerPlantId: true,
        batchLoad: true,
        firstBatchSequence: true,
        lastBatchSequence: true,
      }}
    >
      {(formik) => (
        <div className={`px-4 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight} border-bottom `}>
          <Row>
            <Col lg={5} md={5} xs={5}>
              <Form.Group className=" my-3 form-group align-items-center row  ms-2">
                <Col xs={8} md={8} sm={8} className={`p-0 ${styles.selectContainer}`}>
                  <Col xs={8} sm={8} md={8} style={{ marginLeft: "-18px" }}>
                    {/* Customer Autocomplete */}
                    <AutoCompleteDropdown
                      arrayList={customerDropdownData}
                      searchString={customerNameInput}
                      renderItemId={(customer) => customer.customerPK}
                      renderItemField={(customer) => customer.name}
                      handleSearchString={(string) => dispatch(setCustomerNameInput(string))}
                      fetchDataBySearchString={fetchCustomerDetailsForAutocomplete}
                      loading={customerAutoCompleteLoading}
                      onSelect={handleCustomerSelection}
                      selectedId={selectedCustomerId}
                      clearInputCallback={() => {
                        dispatch(setPageNumber(0));
                        dispatch(setSelectedCustomerId(null));
                        dispatch(setcustomerData(null));
                        dispatch(setIsCustomerMisc(false));
                        dispatch(setMiscCustomerData(null));
                        dispatch(setMiscCustomerId(null));
                        dispatch(setIsPlantExist(false));
                      }}
                      handleAutoCompleteClose={() => {
                        dispatch(setSelectedCustomerId(null));
                        fetchCustomerDetailsForClear();
                      }}
                      className={`${
                        selectedCustomerId === "" || selectedCustomerId === null || customerNameInput === ""
                          ? "borderRed"
                          : "borderGreen"
                      }`}
                      inputTextIndent="8px"
                    />
                  </Col>

                  <LookupButton onClick={handleCustomerLookupModalShow} />
                </Col>
              </Form.Group>
            </Col>

            <Col
              lg={5}
              md={5}
              xs={5}
              className={`${!showCustomerPlatDiv || isCustomerDpu ? "hide-elements" : ""}`}
            >
              <Form.Group className="mt-3 form-group my-3 align-items-center row  ms-2">
                <Col xs={8} md={8} sm={8} className={`p-0 ${styles.selectContainer}`}>
                  <Col xs={8} md={8} sm={8} className="p-0">
                    <div style={!showCustomerPlatDiv ? { pointerEvents: "none" } : {}}>
                      {/* Customer Plant Autocomplete */}
                      <AutoCompleteDropdown
                        arrayList={customerPlant}
                        searchString={customerPlantName}
                        renderItemId={(plant) => plant.customerPlantPK}
                        renderItemField={(plant) => plant.name}
                        selectedId={selectedCustomerBillingPlantId}
                        handleSearchString={(string) => dispatch(setCustomerPlantName(string))}
                        fetchDataBySearchString={fetchBillingPlantdetailsByNameNew}
                        onSelect={handleCustomerPlantSelection}
                        clearInputCallback={() => {
                          dispatch(setSelectedCustomerBillingPlantId(null));
                          dispatch(setChangeColorForPlantTable(false));
                          dispatch(setCustomerPlantData(null));
                          dispatch(setPickupAtPlant(false));
                        }}
                        className={`${
                          selectedCustomerBillingPlantId === "" ||
                          selectedCustomerBillingPlantId === null ||
                          customerPlantName === ""
                            ? "borderRed"
                            : "borderGreen"
                        }`}
                        inputTextIndent="8px"
                      />
                    </div>
                  </Col>
                  <i
                    className={`fa-solid fa-magnifying-glass lookupMagnifierIcon`}
                    name="billingPlantSelection"
                    id="billingPlantSelection"
                    disabled={!showCustomerPlatDiv}
                    onClick={handleCustomerPlantLookupModalShow}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Row className={styles.customerRowHeight}>
            {/* COL 1 */}
            <Col md={5} xs={5} className={"h-100 ps-0"}>
              {/* Customer Table */}
              <div className="d-flex h-100">
                <div className="w-100">
                  <div className="border border-secondary h-100">
                    <table className="table table-striped f-w-600">
                      <thead>
                        <tr disabled>
                          <th className="col-7">Customer</th>

                          <th className="col-4">City</th>

                          <th className="col-1">State</th>
                        </tr>
                      </thead>
                      {customerLoading || settingPageNo
                        ? null
                        : customerData.length !== 0 && (
                            <tbody>
                              {customerData?.map((custmr, index) => (
                                <tr
                                  id="rowId"
                                  key={custmr.customerPK}
                                  onClick={(event) => {
                                    dispatch(setcustomerData(custmr));
                                    dispatch(setChangeColor(true));
                                    dispatch(setCustomerNameInput(custmr.name));
                                    dispatch(setSelectedCustomerId(custmr.customerPK));
                                    dispatch(setIsCustomerDpu(custmr.dpuCustomer));
                                  }}
                                  className={
                                    selectedCustomerId === custmr.customerPK && changeColor
                                      ? "tableSelected"
                                      : " "
                                  }
                                >
                                  <td className="f-w-600">{custmr.name}</td>
                                  <td className="f-w-600">{custmr.city}</td>
                                  <td className="f-w-600">{custmr.stateCode}</td>
                                </tr>
                              ))}
                            </tbody>
                          )}
                    </table>
                    {customerTableLoading
                      ? null
                      : customerData?.length === 0 && (
                          <div className="noRecordsSmallerFont">No Records Available</div>
                        )}
                  </div>
                </div>
                <PaginationComponent
                  {...paginationProps}
                  firstPage
                  lastPage
                  tripleArrowUp
                  tripleArrowDown
                  doubleArrowUp
                  doubleArrowDown
                  singleArrowUp
                  singleArrowDown
                  recordsPerPage={30}
                  orderEntryCustomer
                />
              </div>
            </Col>
            {/* COL 2 */}
            <Col md={5} xs={5} className={"ps-0"}>
              {/* Plant Table */}
              <div
                className={`border border-secondary ${styles.plantNameTable} ${
                  !showCustomerPlatDiv || isCustomerDpu ? "hide-elements" : ""
                }`}
                style={{
                  padding: "0",
                  height: "276px",
                  overflowY: "scroll",
                }}
              >
                <table className="table border-bottom  table-striped f-w-600">
                  <thead>
                    <tr>
                      <th className="col-6">Plant Name</th>
                      <th className="col-6">City</th>
                    </tr>
                  </thead>
                  {plantsLoading
                    ? null
                    : customerPlant?.length !== 0 && (
                        <tbody>
                          {customerPlant?.map((custmrPlnt, index) => (
                            <tr
                              id="rowId"
                              key={custmrPlnt.customerPlantPK}
                              onClick={(event) => {
                                dispatch(setSelectedCustomerBillingPlantId(custmrPlnt.customerPlantPK));
                                dispatch(setPickupCustomerPlantId(custmrPlnt.customerPlantPK));
                                dispatch(setCustomerPickupPlantData(custmrPlnt));
                                dispatch(setPickupAtPlant(true));
                                if (custmrPlnt.yardFK !== null) dispatch(setShuttleToYard(true));
                                dispatch(setPickupPlantInput(custmrPlnt.name));
                                if (deliverToPlant === true) {
                                  dispatch(setDeliveryCustomerPlantId(custmrPlnt.customerPlantPK));
                                  dispatch(setDeliveryPlantInput(custmrPlnt.name));
                                  dispatch(setCustomerDeliveryPlantData(custmrPlnt));
                                }
                                dispatch(setCustomerPlantName(custmrPlnt.name));
                                dispatch(setCustomerPlantData(custmrPlnt));
                                dispatch(setChangeColorForPlantTable(true));
                                dispatch(setSelectedCustomerPlantId(custmrPlnt.customerPlantPK));
                                if (custmrPlnt.plantNumber != null)
                                  dispatch(setPlantCode(custmrPlnt.plantNumber));
                                else dispatch(setPlantCode(""));
                              }}
                              className={
                                custmrPlnt.customerPlantPK === selectedCustomerBillingPlantId &&
                                changeColorForPlantTable
                                  ? "tableSelected"
                                  : ""
                              }
                            >
                              <td className="f-w-600">{custmrPlnt.name}</td>
                              <td className="f-w-600">{custmrPlnt.city}</td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                </table>
                {plantsLoading
                  ? null
                  : customerPlant?.length === 0 && (
                      <div className="noRecordsSmallerFont">No Records Available</div>
                    )}
              </div>

              <div className="ms-4">
                <div
                  className={`${
                    customerIndb === null ||
                    (customerIndb !== null && selectedCustomerBillingPlantId === null && !isCustomerDpu)
                      ? "hide-elements"
                      : ""
                  }`}
                >
                  <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0`}>
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={` customColFormLabel`}>Pickup At Plant</Form.Label>
                    </Col>
                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="pickAtPlant"
                        name="pickAtPlant"
                        value={pickupAtPlant}
                        checked={pickupAtPlant}
                        onChange={(e) => {
                          dispatch(setPickupAtPlant(e.target.checked));
                        }}
                        disabled={!showCustomerPlatDiv && !isCustomerDpu}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
                      pickupAtPlant ? "" : "hide-elements"
                    }`}
                  >
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={` customColFormLabel`}>Pickup Plant</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className={`p-0 ${styles.selectContainer}`}>
                      {/* Pickup Plant Autocomplete */}
                      <AutoCompleteDropdown
                        arrayList={pickupPlantDropdownData}
                        searchString={pickupPlantInput}
                        renderItemId={(plant) => plant.customerPlantPK}
                        renderItemField={(plant) => plant.name}
                        selectedId={pickupCustomerPlantId}
                        handleSearchString={(string) => dispatch(setPickupPlantInput(string))}
                        fetchDataBySearchString={fetchPickupPlantdetailsByName}
                        onSelect={handlePickupPlantSelection}
                        clearInputCallback={() => {
                          dispatch(setPickupCustomerPlantId(null));
                          dispatch(setPickupYardInput(""));
                          dispatch(setPickupCustomerYardId(null));
                          dispatch(setPickupCustomerShuttleCityId(null));
                          dispatch(setPickupCityInput(""));
                          dispatch(setPlantCode(""));
                          dispatch(setShuttleToYard(false));
                        }}
                        className={`${
                          pickupAtPlant
                            ? pickupCustomerPlantId === "" ||
                              pickupCustomerPlantId === null ||
                              pickupPlantInput === ""
                              ? "borderRed"
                              : "borderGreen"
                            : ""
                        }`}
                        disabled={!pickupAtPlant}
                      />
                      <LookupButton
                        disabled={customerIndb === null && isPlantExist}
                        onClick={handlePickupPlantLookupModalShow}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className={`mt-3 form-group m-b-10 align-items-center row m-l-0 m-r-0
                    ${
                      customerIndb !== null &&
                      pickupAtPlant &&
                      pickupPlantInput !== "" &&
                      pickupCustomerPlantId !== null &&
                      (customerPickupPlantData?.yardFK !== null || customerPickupPlantData?.selectYard)
                        ? ""
                        : "hide-elements"
                    }`}
                  >
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={` customColFormLabel`}>Shuttle To Yard</Form.Label>
                    </Col>

                    <Col xs={7} md={5} sm={7} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="shuttleToYard"
                        name="shuttleToYard"
                        value={shuttleToYard}
                        checked={shuttleToYard}
                        disabled={customerIndb === null || !pickupAtPlant}
                        onChange={(e) => {
                          dispatch(setShuttleToYard(e.target.checked));
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <div className="">
                    <Form.Group
                      className={`mt-3 form-group align-items-center row m-l-0 m-r-0 ${
                        customerIndb !== null &&
                        pickupAtPlant &&
                        shuttleToYard &&
                        (customerPickupPlantData?.yardFK || customerPickupPlantData?.selectYard)
                          ? ""
                          : "hide-elements"
                      }`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className={` customColFormLabel`}>Pickup Yard</Form.Label>
                      </Col>

                      <Col xs={7} md={6} sm={7} className={`p-0 ${styles.selectContainer}`}>
                        {/* Pickup Yard Autocomplete */}
                        <AutoCompleteDropdown
                          arrayList={pickupYardsData}
                          searchString={pickupYardInput}
                          renderItemId={(yard) => yard.yardPK}
                          renderItemField={(yard) => yard.description}
                          selectedId={pickupCustomerYardId}
                          handleSearchString={(string) => dispatch(setPickupYardInput(string))}
                          fetchDataBySearchString={fetchPickupYardDetailsByName}
                          onSelect={handlePickupYardSelection}
                          clearInputCallback={() => {
                            dispatch(setPickupCustomerYardId(null));
                          }}
                          className={`${
                            shuttleToYard
                              ? pickupCustomerYardId === "" ||
                                pickupCustomerYardId === null ||
                                pickupYardInput === ""
                                ? "borderRed"
                                : "borderGreen"
                              : ""
                          }`}
                          disabled={
                            customerIndb === null || !shuttleToYard || !customerPickupPlantData?.selectYard
                          }
                        />

                        <LookupButton
                          hidden={
                            customerIndb === null || !shuttleToYard || !customerPickupPlantData?.selectYard
                          }
                          onClick={handlePickupYardLookupModalShow}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-3 form-group align-items-center row m-l-0 m-r-0 ${
                        customerIndb !== null &&
                        pickupAtPlant &&
                        shuttleToYard &&
                        customerPickupPlantData?.yardFK !== null &&
                        (customerPickupPlantData?.shuttleCityFK !== null ||
                          customerPickupPlantData?.selectShuttleCity)
                          ? ""
                          : "hide-elements"
                      }`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className={` customColFormLabel`}>Pickup City</Form.Label>
                      </Col>

                      <Col xs={7} md={6} sm={7} className={`p-0 ${styles.selectContainer}`}>
                        {/* Pickup City Autocomplete */}
                        <AutoCompleteDropdown
                          arrayList={pickUpCityData}
                          searchString={pickupCityInput}
                          renderItemId={(city) => city.shuttleCityPK}
                          renderItemField={(city) => city.city}
                          selectedId={pickupCustomerShuttleCityId}
                          handleSearchString={(string) => dispatch(setPickupCityInput(string))}
                          fetchDataBySearchString={fetchPickupCityDetailsByName}
                          onSelect={handlePickupCitySelection}
                          clearInputCallback={() => {
                            dispatch(setPickupCustomerShuttleCityId(null));
                          }}
                          className={`${
                            shuttleToYard
                              ? pickupCustomerShuttleCityId === "" ||
                                pickupCustomerShuttleCityId === null ||
                                pickupCityInput === ""
                                ? "borderRed"
                                : "borderGreen"
                              : ""
                          }`}
                          disabled={
                            customerIndb === null ||
                            !shuttleToYard ||
                            !customerPickupPlantData?.selectShuttleCity
                          }
                        />
                        <i
                          className={`fa-solid fa-magnifying-glass lookupMagnifierIcon ${
                            customerIndb === null ||
                            !shuttleToYard ||
                            !customerPickupPlantData?.selectShuttleCity
                              ? "hide-elements"
                              : ""
                          }`}
                          onClick={handlePickupShuttleCityLookupModalShow}
                          style={
                            customerIndb === null ||
                            !shuttleToYard ||
                            !customerPickupPlantData?.selectShuttleCity
                              ? { pointerEvents: "none", opacity: "0.7" }
                              : {}
                          }
                        />
                      </Col>
                    </Form.Group>

                    <div>
                      <Form.Group
                        className={`mt-3 form-group m-b-10 align-items-center row m-l-0 m-r-0 ${
                          customerIndb !== null &&
                          pickupAtPlant &&
                          shuttleToYard &&
                          (customerPickupPlantData?.yardFK || customerPickupPlantData?.selectYard)
                            ? ""
                            : "hide-elements"
                        }`}
                      >
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className={` customColFormLabel`}>No Pickup Fee</Form.Label>
                        </Col>

                        <Col xs={7} md={5} sm={7} className="p-0">
                          <input
                            type="checkbox"
                            className="form-check-input p-0"
                            id="noPickupFee"
                            name="noPickupFee"
                            value={noPickupPulloutFee}
                            checked={noPickupPulloutFee}
                            onChange={(e) => {
                              dispatch(setNoPickupPulloutFee(e.target.checked));
                            }}
                            disabled={customerIndb === null || !shuttleToYard}
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                </div>

                <div
                  className={`${
                    customerIndb === null || selectedCustomerBillingPlantId === null ? "hide-elements" : ""
                  }`}
                >
                  <Form.Group
                    className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 
                    `}
                  >
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={` customColFormLabel`}>Deliver to Plant</Form.Label>
                    </Col>
                    <Col xs={7} md={5} sm={7} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="DeliveryToPlant"
                        name="DeliveryToPlant"
                        value={deliverToPlant}
                        checked={deliverToPlant}
                        onChange={(event) => {
                          dispatch(setDeliverToPlant(event.target.checked));
                        }}
                        disabled={!showCustomerPlatDiv && !isCustomerDpu}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
                      deliverToPlant ? "" : "hide-elements"
                    }`}
                  >
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={` customColFormLabel`}>Delivery Plant</Form.Label>
                    </Col>

                    <Col xs={7} md={6} sm={7} className={`p-0 ${styles.selectContainer}`}>
                      {/* Delivery Plant Autocomplete */}
                      <AutoCompleteDropdown
                        arrayList={deliveryPlantDropdownData}
                        searchString={deliveryPlantInput}
                        renderItemId={(plant) => plant.customerPlantPK}
                        renderItemField={(plant) => plant.name}
                        selectedId={deliveryCustomerPlantId}
                        handleSearchString={(string) => dispatch(setDeliveryPlantInput(string))}
                        fetchDataBySearchString={fetchDeliveryPlantdetailsByName}
                        onSelect={handleDeliveryPlantSelection}
                        clearInputCallback={() => {
                          dispatch(setDeliveryCustomerPlantId(null));
                          dispatch(setDeliveryYardInput(""));
                          dispatch(setDeliveryCustomerYardId(null));
                          dispatch(setDeliveryCustomerShuttleCityId(null));
                          dispatch(setDeliveryCityInput(""));
                          dispatch(setShuttleFromYard(false));
                        }}
                        className={`${
                          deliverToPlant
                            ? deliveryCustomerPlantId === "" ||
                              deliveryCustomerPlantId === null ||
                              deliveryPlantInput === ""
                              ? "borderRed"
                              : "borderGreen"
                            : ""
                        }`}
                        disabled={!deliverToPlant}
                      />
                      <i
                        className={`fa-solid fa-magnifying-glass lookupMagnifierIcon`}
                        name="deliveryPlantSelection"
                        id="deliveryPlantSelection"
                        onClick={handleDeliveryPlantLookupModalShow}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0
                  ${
                    customerIndb !== null &&
                    deliverToPlant &&
                    deliveryPlantInput !== "" &&
                    deliveryCustomerPlantId !== null &&
                    (customerDeliveryPlantData?.yardFK !== null || customerDeliveryPlantData?.selectYard)
                      ? ""
                      : "hide-elements"
                  }`}
                  >
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={` customColFormLabel`}>Shuttle From Yard</Form.Label>
                    </Col>

                    <Col xs={7} md={5} sm={7} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="shuttleFromYard"
                        name="shuttleFromYard"
                        value={shuttleFromYard}
                        checked={shuttleFromYard}
                        onChange={(event) => {
                          dispatch(setShuttleFromYard(event.target.checked));
                        }}
                        disabled={customerIndb === null || !deliverToPlant}
                      />
                    </Col>
                  </Form.Group>

                  <div className="">
                    <Form.Group
                      className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
                        customerIndb !== null &&
                        deliverToPlant &&
                        shuttleFromYard &&
                        (customerDeliveryPlantData?.yardFK || customerDeliveryPlantData?.selectYard)
                          ? ""
                          : "hide-elements"
                      }`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className={` customColFormLabel`}>Delivery Yard</Form.Label>
                      </Col>

                      <Col xs={7} md={6} sm={7} className={`p-0 ${styles.selectContainer}`}>
                        {/* Delivery Yard Autocomplete */}
                        <AutoCompleteDropdown
                          arrayList={deliveryYardsData}
                          searchString={deliveryYardInput}
                          renderItemId={(yard) => yard.yardPK}
                          renderItemField={(yard) => yard.description}
                          selectedId={deliveryCustomerYardId}
                          handleSearchString={(string) => dispatch(setDeliveryYardInput(string))}
                          fetchDataBySearchString={fetchDeliveryYardDetailsByName}
                          onSelect={handleDeliveryYardSelection}
                          clearInputCallback={() => {
                            dispatch(setDeliveryCustomerYardId(null));
                          }}
                          className={`${
                            shuttleFromYard
                              ? deliveryCustomerYardId === "" ||
                                deliveryCustomerYardId === null ||
                                deliveryYardInput === ""
                                ? "borderRed"
                                : "borderGreen"
                              : ""
                          }`}
                          disabled={
                            customerIndb === null ||
                            !shuttleFromYard ||
                            !customerDeliveryPlantData?.selectYard
                          }
                          towardsTop
                        />

                        <LookupButton
                          hidden={
                            customerIndb === null ||
                            !shuttleFromYard ||
                            !customerDeliveryPlantData?.selectYard
                          }
                          onClick={handleDeliveryYardLookupModalshow}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
                        customerIndb !== null &&
                        deliverToPlant &&
                        shuttleFromYard &&
                        customerDeliveryPlantData?.yardFK !== null &&
                        (customerDeliveryPlantData?.shuttleCityFK !== null ||
                          customerDeliveryPlantData?.selectShuttleCity)
                          ? ""
                          : "hide-elements"
                      }`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className={` customColFormLabel`}>Delivery City</Form.Label>
                      </Col>

                      <Col xs={7} md={6} sm={7} className={`p-0 ${styles.selectContainer}`}>
                        {/* Delivery City Autocomplete */}
                        <AutoCompleteDropdown
                          arrayList={deliveryCityData}
                          searchString={deliveryCityInput}
                          renderItemId={(city) => city.shuttleCityPK}
                          renderItemField={(city) => city.city}
                          selectedId={deliveryCustomerShuttleCityId}
                          handleSearchString={(string) => dispatch(setDeliveryCityInput(string))}
                          fetchDataBySearchString={fetchDeliveryCityDetailsByName}
                          onSelect={handleDeliveryCitySelection}
                          clearInputCallback={() => {
                            dispatch(setDeliveryCustomerShuttleCityId(null));
                          }}
                          className={`${
                            shuttleFromYard
                              ? deliveryCustomerShuttleCityId === "" ||
                                deliveryCustomerShuttleCityId === null ||
                                deliveryCityInput === ""
                                ? "borderRed"
                                : "borderGreen"
                              : ""
                          }`}
                          disabled={
                            customerIndb === null ||
                            !shuttleFromYard ||
                            !customerDeliveryPlantData?.selectShuttleCity
                          }
                          towardsTop
                        />
                        <i
                          className={`fa-solid fa-magnifying-glass lookupMagnifierIcon ${
                            customerIndb === null ||
                            !shuttleFromYard ||
                            !customerDeliveryPlantData?.selectShuttleCity
                              ? "hide-elements"
                              : ""
                          }`}
                          onClick={handleDeliveryShuttleCityLookupModalShow}
                          style={
                            customerIndb === null ||
                            !shuttleFromYard ||
                            !customerDeliveryPlantData?.selectShuttleCity
                              ? { pointerEvents: "none", opacity: "0.7" }
                              : {}
                          }
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
                        customerIndb !== null &&
                        deliverToPlant &&
                        shuttleFromYard &&
                        (customerDeliveryPlantData?.yardFK || customerDeliveryPlantData?.selectYard)
                          ? ""
                          : "hide-elements"
                      }`}
                    >
                      <Col sm={3} md={3} xs={3} className="p-0">
                        <Form.Label className={` customColFormLabel`}>No Delivery Fee</Form.Label>
                      </Col>

                      <Col xs={7} md={5} sm={7} className="p-0">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="noDeliveryFee"
                          name="noDeliveryFee"
                          value={noDeliveryPulloutFee}
                          checked={noDeliveryPulloutFee}
                          onChange={(e) => {
                            dispatch(setNoDeliveryPulloutFee(e.target.checked));
                          }}
                          disabled={!shuttleFromYard}
                        />
                      </Col>
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div></div>
            </Col>
            {/* COL 3 */}
            <Col md={2} xs={2} className={styles.lastCol}>
              <div>
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={7} md={7} xs={7} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Reload</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="reload"
                      name="reload"
                      value={reload}
                      checked={reload}
                      onChange={(e) => {
                        dispatch(setReload(e.target.checked));
                      }}
                      disabled={customerIndb === null}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
                    reload && customerIndb?.allowReturnRates ? "" : "hide-elements"
                  }`}
                >
                  <Col sm={7} md={7} xs={7} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Return Rates</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="returnRates"
                      name="returnRates"
                      value={returnRates}
                      checked={returnRates}
                      disabled={!reload}
                      onChange={(e) => {
                        dispatch(setReturnRates(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
                    customerPickupPlantData !== null &&
                    customerPickupPlantData.yardFK !== null &&
                    customerPickupPlantData.shuttleCityFK !== null &&
                    shuttleToYard &&
                    selectedPickupYard?.hasPrinters === true &&
                    selectedPickupYard?.bolPrinterFK !== null
                      ? ""
                      : "hide-elements"
                  }`}
                >
                  <Col sm={7} md={7} xs={7} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Print BOL</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="printBol"
                      name="printBol"
                      value={printBol}
                      checked={printBol}
                      onChange={(e) => {
                        dispatch(setPrintBol(e.target.checked));
                      }}
                      disabled={customerIndb === null}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={7} md={7} xs={7} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Duplicate Loads</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="duplicateLoads"
                      name="duplicateLoads"
                      value={duplicateLoad}
                      checked={duplicateLoad}
                      onClick={(event) => {
                        setBatchLoad(false);
                        setDuplicateLoad(event.target.checked);
                        dispatch(setDuplicateLoadFlag(event.target.checked));
                      }}
                      disabled={customerIndb === null}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col sm={7} md={7} xs={7} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Batch Loads</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="batchLoads"
                      name="batchLoads"
                      value={batchLoad}
                      checked={batchLoad}
                      onClick={(event) => {
                        setDuplicateLoad(false);
                        setBatchLoad(event.target.checked);
                        dispatch(setDuplicateLoadFlag(false));
                      }}
                      disabled={customerIndb === null}
                    />
                  </Col>
                </Form.Group>

                <div className={`${batchLoad ? "" : "hide-elements"}`}>
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={7} md={7} xs={7} className="p-0">
                      <Form.Label htmlFor="name" className={` customColFormLabel`}>
                        First Batch Sequence
                      </Form.Label>
                    </Col>

                    <Col xs={4} md={4} sm={4} className="p-0">
                      <input
                        className={`form-control ${styles.orderForm} ${
                          !batchLoad
                            ? "black"
                            : firstBatchSequence === "" ||
                                lastBatchSequence === "" ||
                                firstBatchSequence.length !== lastBatchSequence.length ||
                                !isBatchLoadValid
                              ? "borderRed"
                              : "borderGreen"
                        }`}
                        id="firstBatchSequence"
                        name="firstBatchSequence"
                        value={firstBatchSequence.toUpperCase()}
                        type="search"
                        maxLength={5}
                        disabled={!batchLoad}
                        onChange={(e) => {
                          dispatch(setFirstBatchSequence(e.target.value));
                          handleBatchLoadOnBlur(e.target.value, lastBatchSequence);
                          dispatch(setAppliedAmount(0));
                          dispatch(setRemainingAmt(invoiceAmount));

                          dispatch(setChangeColor(false));
                          dispatch(setEnableAppliedAmount(false));
                          if (e.target.value === "") {
                            setIsBatchLoadValid(false);
                          }
                        }}
                        onBlur={(e) => {
                          dispatch(setRemainingAmt(invoiceAmount));
                        }}
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={7} md={7} xs={7} className="p-0">
                      <Form.Label htmlFor="name" className={` customColFormLabel`}>
                        Last Batch Sequence
                      </Form.Label>
                    </Col>

                    <Col xs={4} md={4} sm={4} className="p-0">
                      <input
                        className={`form-control ${styles.orderForm} ${
                          !batchLoad
                            ? "black"
                            : firstBatchSequence === "" ||
                                lastBatchSequence === "" ||
                                firstBatchSequence.length !== lastBatchSequence.length ||
                                !isBatchLoadValid
                              ? "borderRed"
                              : "borderGreen"
                        }`}
                        id="lastBatchSequence"
                        name="lastBatchSequence"
                        value={lastBatchSequence.toUpperCase()}
                        type="search"
                        maxLength={5}
                        disabled={!batchLoad}
                        onChange={(e) => {
                          dispatch(setLastBatchSequence(e.target.value));
                          handleBatchLoadOnBlur(firstBatchSequence, e.target.value);
                          dispatch(setAppliedAmount(0));
                          dispatch(setRemainingAmt(invoiceAmount));
                          dispatch(setChangeColor(false));
                          dispatch(setEnableAppliedAmount(false));
                        }}
                        onBlur={(e) => {
                          dispatch(setRemainingAmt(invoiceAmount));
                        }}
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>
                </div>

                <Form.Group
                  className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
                    pickupAtPlant ? "" : "hide-elements"
                  }`}
                >
                  <Col sm={7} md={7} xs={7} className="p-0">
                    <Form.Label htmlFor="name" className={` customColFormLabel`}>
                      Plant Code
                    </Form.Label>
                  </Col>

                  <Col xs={4} md={5} sm={4} className="p-0">
                    <input
                      className={`customFormControl `}
                      id="plantCode"
                      name="plantCode"
                      value={plantCode}
                      type="search"
                      maxLength={10}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => dispatch(setPlantCode(e.target.value))}
                      disabled={customerIndb === null}
                    />
                  </Col>
                </Form.Group>
              </div>
              <div style={{ marginTop: "-2rem" }}>
                <Form.Group
                  className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
                    customerIndb !== null &&
                    (customerIndb?.creditCardPayments === "Y" || customerIndb?.creditCardPayments === "A")
                      ? ""
                      : "hide-elements"
                  }`}
                >
                  <Col sm={7} md={7} xs={7} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Charge Credit Card</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="chargeCreditCharge"
                      name="chargeCreditCharge"
                      value={chargeCreditCard}
                      checked={chargeCreditCard}
                      onClick={(event) => {
                        dispatch(setBulkUnits(false));
                        dispatch(setUseOpenBalance(false));

                        dispatch(setChargeCreditCard(event.target.checked));
                        dispatch(setIsMandatoryCreditCardTab(true));
                        dispatch(setCheckPrepaid(false));
                      }}
                      disabled={
                        customerIndb === null ||
                        customerIndb?.creditCardPayments === "Y" ||
                        checkPrepaid ||
                        useOpenBalance ||
                        bulkUnits
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
                    customerIndb !== null && customerIndb?.allDealersFOD ? "" : "hide-elements"
                  }`}
                >
                  <Col sm={7} md={7} xs={7} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Check Prepaid</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="checkPrepaid"
                      name="checkPrepaid"
                      value={checkPrepaid}
                      checked={checkPrepaid}
                      onChange={(e) => {
                        dispatch(setChargeCreditCard(false));
                        dispatch(setUseOpenBalance(false));
                        dispatch(setCheckPrepaid(e.target.checked));
                        dispatch(setBulkUnits(false));
                      }}
                      disabled={customerIndb === null || useOpenBalance || chargeCreditCard || bulkUnits}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
                    customerIndb !== null &&
                    (customerIndb?.openBalancePayments === "Y" || customerIndb?.openBalancePayments === "A")
                      ? ""
                      : "hide-elements"
                  }`}
                >
                  <Col sm={7} md={7} xs={7} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Use Open Balance</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="useOpenBalance"
                      name="useOpenBalance"
                      value={useOpenBalance}
                      checked={useOpenBalance}
                      onClick={(event) => {
                        dispatch(setBulkUnits(false));
                        dispatch(setChargeCreditCard(false));
                        dispatch(setCheckPrepaid(false));
                        dispatch(setUseOpenBalance(event.target.checked));
                      }}
                      disabled={
                        customerIndb === null ||
                        customerIndb?.openBalancePayments === "Y" ||
                        chargeCreditCard ||
                        checkPrepaid ||
                        bulkUnits
                      }
                    />
                  </Col>
                </Form.Group>
              </div>
              <div>
                <Form.Group
                  className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ${
                    customerIndb !== null &&
                    (customerIndb?.bulkInvoices === "Y" || customerIndb?.bulkInvoices === "A") &&
                    !customerIndb?.openBulkInvoices
                      ? ""
                      : "hide-elements"
                  }`}
                >
                  <Col sm={7} md={7} xs={7} className="p-0">
                    <Form.Label className={` customColFormLabel`}>Bulk Unit Invoice</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="bulkUnits"
                      name="bulkUnits"
                      value={bulkUnits}
                      checked={bulkUnits}
                      onClick={(event) => {
                        dispatch(setBulkUnits(event.target.checked));
                        dispatch(setChargeCreditCard(false));
                        dispatch(setUseOpenBalance(false));
                        dispatch(setCheckPrepaid(false));
                      }}
                      disabled={
                        customerIndb === null ||
                        customerIndb?.bulkInvoices === "Y" ||
                        useOpenBalance ||
                        chargeCreditCard ||
                        checkPrepaid
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-3 form-group m-t-5 m-b-5 align-items-center row  m-l-0 m-r-0 ${
                    customerIndb === null ||
                    !bulkUnits ||
                    customerIndb?.bulkInvoices === "N" ||
                    customerIndb?.bulkInvoices === "O"
                      ? "hide-elements"
                      : ""
                  }`}
                >
                  <Col xs={12} md={12} sm={12} className={`p-0 ${styles.selectContainer}`}>
                    {/* Bulk Unit Invoice Autocomplete */}
                    <AutoCompleteDropdown
                      arrayList={bulkInvoiceData}
                      searchString={bulkInvoiceInput}
                      renderItemId={(invoice) => invoice.bulkInvoicePK}
                      renderItemField={(invoice) => invoice.description}
                      selectedId={bulkInvoiceFK}
                      handleSearchString={(string) => dispatch(setBulkInvoiceInput(string))}
                      fetchDataBySearchString={fetchBulkUnitdetailsByName}
                      onSelect={handleBulkInvoiceSelection}
                      clearInputCallback={() => {
                        dispatch(setBulkInvoiceFK(""));
                      }}
                      className={`${
                        bulkUnits
                          ? bulkInvoiceFK === "" || bulkInvoiceFK === null || bulkInvoiceInput === ""
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }`}
                      disabled={!bulkUnits}
                      towardsTop
                    />
                    <i
                      className={`fa-solid fa-plus lookupMagnifierIcon ${
                        customerIndb === null ||
                        !bulkUnits ||
                        customerIndb?.bulkInvoices === "N" ||
                        customerIndb?.bulkInvoices === "O"
                          ? "hide-elements"
                          : ""
                      }`}
                      onClick={handleBulkInvoiceModalShow}
                      style={
                        customerIndb === null ||
                        !bulkUnits ||
                        customerIndb?.bulkInvoices === "N" ||
                        customerIndb?.bulkInvoices === "O"
                          ? { pointerEvents: "none", opacity: "0.7" }
                          : {}
                      }
                    />
                  </Col>
                </Form.Group>
              </div>
            </Col>
          </Row>

          {/* Customer Lookup Modal */}
          <CustomerLookup
            show={customerSelection}
            onHide={customerModalHide}
            renderItemId={(customer) => customer.customerPK}
            handleLookupSelection={handleCustomerLookupSelection}
            OrderEntry
          />

          {/* Billing Plant Lookup Modal */}
          <CustomerPlantsLookup
            customerId={selectedCustomerId}
            show={billingPlantSelection}
            onHide={billingPlantModalHide}
            renderItemId={(plant) => plant.customerPlantPK}
            handleLookupSelection={handleCustomerPlantLookupSelection}
            OrderEntry
            BillingPlant
          />

          {/* Pickup Plant Lookup Modal */}
          <CustomerPlantsLookup
            customerId={selectedCustomerId}
            show={pickupPlantSelection}
            onHide={pickupPlantModalHide}
            renderItemId={(plant) => plant.customerPlantPK}
            handleLookupSelection={handlePickupPlantLookupSelection}
            OrderEntry
          />

          {/* Delivery Plant Lookup Modal */}
          <CustomerPlantsLookup
            customerId={selectedCustomerId}
            show={deliveryPlantSelection}
            onHide={deliveryPlantModalHide}
            renderItemId={(plant) => plant.customerPlantPK}
            handleLookupSelection={handleDeliveryPlantLookupSelection}
            OrderEntry
          />

          {/* Pickup Yard Lookup Modal */}
          <YardLookup
            show={pickupYardSelection}
            onHide={hidePickupYardModal}
            renderItemId={(yard) => yard.yardPK}
            handleLookupSelection={handlePickupYardLookupSelection}
            OrderEntry
            OECustomerPickupYard={true}
          />

          {/* Delivery Yard Lookup Modal */}
          <YardLookup
            show={deliveryYardSelection}
            onHide={hideDeliveryYardModal}
            renderItemId={(yard) => yard.yardPK}
            handleLookupSelection={handleDeliveryYardLookupSelection}
            OrderEntry
            OECustomerDeliveryYard={true}
          />

          {/* Pickup Shuttle City Lookup Modal */}
          <ShuttleCityLookup
            show={pickupShuttleCitySelection}
            onHide={pickupShuttleCityModalHide}
            renderItemId={(shuttleCity) => shuttleCity.shuttleCityPK}
            handleLookupSelection={handlePickupShuttleCityLookupSelection}
            OrderEntry
            OECustomerPickupCity={true}
          />

          {/* Delivery Shuttle City Lookup Modal */}
          <ShuttleCityLookup
            show={deliveryShuttleCitySelection}
            onHide={deliveryShuttleCityModalHide}
            renderItemId={(shuttleCity) => shuttleCity.shuttleCityPK}
            handleLookupSelection={handleDeliveryShuttleCityLookupSelection}
            OrderEntry
            OECustomerDeliveryCity={true}
          />

          {/* Bulk Invoice Warning */}
          <ModalComponent
            show={showBulkInvoiceModal}
            onHide={() => setShowBulkInvoiceModal(false)}
            title={"Add Open Bulk Invoice"}
            body={"Do you want to add an Open Bulk Invoice?"}
            handleYES={() => {
              dispatch(setShowAddBulkInvoice(true));
              setShowBulkInvoiceModal(false);
            }}
            handleNO={() => setShowBulkInvoiceModal(false)}
          />
          {/* Add Bulk Invoice Modal */}
          <AddBulkInvoice show={showAddBulkInvoice} onHide={() => dispatch(setShowAddBulkInvoice(false))} />
        </div>
      )}
    </Formik>
  );
}
export default Customer;
