import React, { useEffect, useState } from "react";
import { Link, NavigationType, useNavigate, useParams } from "react-router-dom";
import DealerService from "../services/DealerService";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import InCompleteDealerService from "../services/InCompleteDealerService";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-hot-toast";

const AddDealerComponent = () => {
  const [hours, setHours] = useState("");
  const [directions, setDirections] = useState("");
  const [washInstructions, setWashInstructions] = useState("");

  const [name, setName] = useState("");
  const [dba, setDba] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [canadian, setCanadian] = useState(false);
  const [pcMilerCity, setPcMilerCity] = useState("");
  const [pcMilerCounty, setPcMilerCounty] = useState("");
  const [phone, setPhone] = useState("");
  const [tollFreePhone, setTollFreePhone] = useState("");
  const [fax, setFax] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [masterDealer, setMasterDealer] = useState(false);
  const [dealerGroupFk, setDealerGroupFK] = useState("");
  const [notes, setNotes] = useState("");

  const [lastOrderDate, setLastOrderDate] = useState("");
  const [brokerfk, setBrokerfk] = useState("");
  const [rvDealer, setRvDealer] = useState(false);
  const [faxBolAtOrderEntry, setFaxBolAtOrderEntry] = useState(false);
  const [faxBolAtDispatch, setFaxBolAtDispatch] = useState(false);
  const [doNotWash, setDoNotWash] = useState(false);
  const [customerWashOverride, setCustomerWashOverride] = useState(false);
  const [payCustomerForWash, setPayCustomerForWash] = useState(false);
  const [washCustomerfk, setWashCustomerfk] = useState("");
  const [closedBeginDate, setClosedBeginDate] = useState("");
  const [closedEndDate, setClosedEndDate] = useState("");
  const [closedNotes, setClosedNotes] = useState("");
  const [twicRequired, setTwicRequired] = useState(false);
  const [storeCode, setStoreCode] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const pageNum = params.pageNumber;
  const [dealerPK, setDealerPK] = useState(id);
  const [incompletedealerPK, setincompletedealerPK] = useState(id);

  //boltext page
  const [hours1, setHours1] = useState("");
  const [hours2, setHours2] = useState("");
  const [hours3, setHours3] = useState("");
  const [directions1, setDirections1] = useState("");
  const [directions2, setDirections2] = useState("");
  const [directions3, setDirections3] = useState("");
  const [directions4, setDirections4] = useState("");
  const [directions5, setDirections5] = useState("");
  const [directions6, setDirections6] = useState("");
  const [directions7, setDirections7] = useState("");
  const [otherText1, setOtherText1] = useState("");
  const [otherText2, setOtherText2] = useState("");
  const [otherText3, setOtherText3] = useState("");
  const [washInstructions1, setWashInstructions1] = useState("");
  const [washInstructions2, setWashInstructions2] = useState("");
  const [washInstructions3, setWashInstructions3] = useState("");
  const [washInstructions4, setWashInstructions4] = useState("");
  const [washInstructions5, setWashInstructions5] = useState("");
  const [contactOnDelivery, setContactOnDelivery] = useState("");
  const [contactOnDeliveryPhone, setContactOnDeliveryPhone] = useState("");

  //Delivery

  const [deliveryAddress1, setDeliveryAddress1] = useState("");
  const [deliveryAddress2, setDeliveryAddress2] = useState("");
  const [sundayDelivery, setSundayDelivery] = useState("");
  const [mondayDelivery, setMondayDelivery] = useState("");
  const [tuesdayDelivery, setTuesdayDelivery] = useState("");
  const [wednesdayDelivery, setWednesdayDelivery] = useState("");
  const [thursdayDelivery, setThursdayDelivery] = useState("");
  const [fridayDelivery, setFridayDelivery] = useState("");
  const [saturdayDelivery, setSaturdayDelivery] = useState("");
  const [deliveryHours, setDeliveryHours] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");

  //pickup

  const [sundayPickup, setSundayPickup] = useState(false);
  const [mondayPickup, setMondayPickup] = useState(false);
  const [tuesdayPickup, setTuesdayPickup] = useState(false);
  const [wednesdayPickup, setWednesdayPickup] = useState(false);
  const [thursdayPickup, setThursdayPickup] = useState(false);
  const [fridayPickup, setFridayPickup] = useState(false);
  const [saturdayPickup, setSaturdayPickup] = useState(false);
  const [pickupContact, setPickupContact] = useState("");
  const [pickupContactPhone, setPickupContactPhone] = useState("");
  const [pickupContactEmail, setPickupContactEmail] = useState("");
  const [pickupAddress1, setPickupAddress1] = useState("");
  const [pickupAddress2, setPickupAddress2] = useState("");
  const [pickupHours, setPickupHours] = useState("");
  const [pickupNotes, setPickupNotes] = useState("");

  //resources page
  const [generalManagerContact, setGeneralManagerContact] = useState("");
  const [generalManagerPhone, setGeneralManagerPhone] = useState("");
  const [generalManagerPhoneExtn, setGeneralManagerPhoneExtn] = useState("");
  const [generalManagerEmail, setGeneralManagerEmail] = useState("");
  const [salesManagerContact, setSalesManagerContact] = useState("");
  const [salesManagerPhone, setSalesManagerPhone] = useState("");
  const [salesManagerPhoneExtn, setSalesManagerPhoneExtn] = useState("");
  const [salesManagerEmail, setSalesManagerEmail] = useState("");
  const [serviceManagerContact, setServiceManagerContact] = useState("");
  const [serviceManagerPhone, setServiceManagerPhone] = useState("");
  const [serviceManagerPhoneExtn, setServiceManagerPhoneExtn] = useState("");
  const [serviceManagerEmail, setServiceManagerEmail] = useState("");
  const [deliveryContact, setDeliveryContact] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [deliveryPhoneExtn, setDeliveryPhoneExtn] = useState("");
  const [deliveryEmail, setDeliveryEmail] = useState("");
  const [active, setActive] = React.useState("");
  const [activeShow, setActiveShow] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [incomplete, setIncomplete] = React.useState(false);
  const [complete, setComplete] = React.useState(true);
  const [deleteDealer, setDeleteDealer] = useState(false);
  const [closeShow, setCloseShow] = useState(false);

  const validationSchema = yup.object({
    generalManagerPhone: yup
      .string()
      .matches(/^\([\d]{3}\)[\d]{3}-[\d]{4}$/gm, "General Manager Phone must be a valid Phone Number"),
    generalManagerEmail: yup.string().email("General Manager Email must be a valid email"),
    salesManagerPhone: yup
      .string()
      .matches(/^\([\d]{3}\)[\d]{3}-[\d]{4}$/gm, "Sales Manager Phone  must be a valid Phone Number"),
    salesManagerEmail: yup.string().email("Sales Manager Email must be a valid email"),
    serviceManagerPhone: yup
      .string()
      .matches(/^\([\d]{3}\)[\d]{3}-[\d]{4}$/gm, "Service Manager Phone must be a valid Phone Number"),
    serviceManagerEmail: yup.string().email("Service Manager Email must be a valid email "),
    deliveryPhone: yup
      .string()
      .matches(/^\([\d]{3}\)[\d]{3}-[\d]{4}$/gm, "Delivery Phone must be a valid Phone Number"),
    deliveryEmail: yup.string().email("Delivery Email must be a valid email"),
    pickupContactPhone: yup
      .string()
      .matches(/^\([\d]{3}\)[\d]{3}-[\d]{4}$/gm, "Pickup Contact Phone must be a valid Phone Number"),
    name: yup.string().required("Please enter the Name"),
    address1: yup.string().required("Please enter the Address"),
    city: yup.string().required("Please enter the City"),
    stateCode: yup
      .string()
      .max(2)
      .min(2, "State must be at least 2 characters")
      .required("Please enter the State"),
    canadian: yup.boolean(),
    postalCode: yup
      .string()
      .required("Please enter the Postal code")
      .when("canadian", {
        is: true,
        then: yup.string().matches(/^\d[A-Z]\d\s[A-Z]\d[A-Z]$/, "Postal Code must be valid"),
        otherwise: yup.string().matches(/^((\d{5}-\d{4})|(\d{5}))$/, "Postal Code must be valid"),
      }),
    phone: yup
      .string()
      .matches(/^\([\d]{3}\)[\d]{3}-[\d]{4}$/gm, "Phone Number must be valid")
      .required("Please enter the Phone Number"),
    tollFreePhone: yup.string().matches(/^\([\d]{3}\)[\d]{3}-[\d]{4}$/gm, "Tollfree Phone must be valid"),
    fax: yup.string().matches(/^\([\d]{3}\)[\d]{3}-[\d]{4}$/gm, "Fax Must be valid"),
    contactOnDeliveryPhone: yup
      .string()
      .matches(/^\([\d]{3}\)[\d]{3}-[\d]{4}$/gm, "Contact On Delivery Phone must be valid"),
  });

  const dealer = {
    dealerPK,
    incompletedealerPK,
    hours,
    directions,
    washInstructions,
    name,
    dba,
    address1,
    address2,
    city,
    stateCode,
    postalCode,
    phone,
    canadian,
    pcMilerCity,
    pcMilerCounty,
    tollFreePhone,
    fax,
    masterDealer,
    login,
    password,
    notes,
    lastOrderDate,
    brokerfk,
    rvDealer,
    faxBolAtOrderEntry,
    faxBolAtDispatch,
    doNotWash,
    washCustomerfk,
    closedBeginDate,
    closedEndDate,
    closedNotes,
    twicRequired,
    storeCode,
    hours1,
    hours2,
    hours3,
    directions1,
    directions2,
    directions3,
    directions4,
    directions5,
    directions6,
    directions7,
    otherText1,
    otherText2,
    otherText3,
    washInstructions1,
    washInstructions2,
    washInstructions3,
    washInstructions4,
    washInstructions5,
    contactOnDelivery,
    contactOnDeliveryPhone,
    customerWashOverride,
    payCustomerForWash,
    deliveryAddress1,
    deliveryAddress2,
    sundayDelivery,
    mondayDelivery,
    tuesdayDelivery,
    wednesdayDelivery,
    thursdayDelivery,
    fridayDelivery,
    saturdayDelivery,
    deliveryHours,
    deliveryNotes,
    sundayPickup,
    mondayPickup,
    tuesdayPickup,
    wednesdayPickup,
    thursdayPickup,
    fridayPickup,
    saturdayPickup,
    pickupContact,
    pickupContactPhone,
    pickupContactEmail,
    pickupAddress1,
    pickupAddress2,
    generalManagerContact,
    generalManagerPhone,
    generalManagerPhoneExtn,
    generalManagerEmail,
    salesManagerContact,
    salesManagerPhone,
    salesManagerPhoneExtn,
    salesManagerEmail,
    serviceManagerContact,
    serviceManagerPhone,
    serviceManagerPhoneExtn,
    serviceManagerEmail,
    deliveryContact,
    deliveryPhone,
    deliveryPhoneExtn,
    deliveryEmail,
    pickupHours,
    pickupNotes,
    active,
  };

  const handleActiveClose = () => setActiveShow(false);
  const handleActiveShow = () => setActiveShow(true);
  const handleCancelNo = () => setCancelShow(false);

  const handleCancelShow = () => {
    if (viewDetail === false) {
      setCancelShow(true);
    } else {
      setCancelShow(false);
      navigate("/", { state: { item: id, navValue: true, navPage: pageNum } });
      toast.success("Changes Cancelled");
    }
  };
  const handleCloseShow = () => {
    if (viewDetail === true) {
      navigate("/");
      setCloseShow(false);
      toast.success("Page Closed");
    } else {
      setCloseShow(true);
    }
  };
  const handleCloseYes = () => {
    navigate("/");
    toast.success("Page Closed");
  };
  const handleCloseNo = () => setCloseShow(false);
  const handleDelete = () => setDeleteDealer(true);
  const handleDeleteNo = () => setDeleteDealer(false);
  //Activate and Deactivate
  const handleActiveSave = (e) => {
    e.preventDefault();

    if (active === true) {
      DealerService.deactivateDealer(dealer)
        .then((response) => {
          setActiveShow(false);
          setActive(false);
          toast.success("Dealer Deactivated");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      DealerService.activateDealer(dealer)
        .then((response) => {
          setActiveShow(false);
          setActive(true);
          toast.success("Dealer Activated");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCancelYes = () => {
    if (id && incomplete === false) {
      setCancelShow(false);
      setViewDetail(true);
      toast.success("Changes Cancelled");
    } else {
      navigate("/");
      toast.success("Changes Cancelled");
    }
  };
  const handleDeleteYes = () => {
    DealerService.deleteDealer(dealerPK);

    navigate("/", { state: { item: id, navValue: true, navPage: pageNum } });
    toast.success("Dealer Deleted");
  };
  const doEdit = () => {
    setViewDetail(false);
  };

  const on = (values, setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };

  //Save or Update Dealer
  const saveOrUpdateDealer = (e) => {
    e.preventDefault();
    if (id) {
      DealerService.updateDealer(dealer)
        .then((response) => {
          navigate("/");

          toast.success("Dealer updated");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      DealerService.createDealer(dealer)
        .then((response) => {
          navigate("/");
          setViewDetail(true);
          toast.success("Dealer created");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //Save or Update incompleteDealer
  const saveOrUpdateIncompleteDealer = (e) => {
    e.preventDefault();
    if (id) {
      InCompleteDealerService.updateDealer(dealer)
        .then((response) => {
          navigate("/");
          toast.success("IncompleteDealer updated");
        })
        .catch((error) => {});
    } else {
      InCompleteDealerService.createDealer(dealer)
        .then((response) => {
          navigate("/");
          toast.success("IncompleteDealer created");
        })
        .catch((error) => {});
    }
  };

  const getDealerById = (id) => {
    if (id) {
      setViewDetail(true);
      DealerService.getDealerById(id)
        .then((response) => {
          setActive(response.data.active);
          setDealerPK(response.data.dealerPK);
          setHours(response.data.hours);
          setDirections(response.data.directions);
          setWashInstructions(response.data.washInstructions);

          setName(response.data.name?.trim());
          setDba(response.data.dba?.trim());
          setAddress1(response.data.address1?.trim());
          setAddress2(response.data.address2?.trim());
          setCity(response.data.city?.trim());
          setStateCode(response.data.stateCode?.trim());
          setPostalCode(response.data.postalCode?.trim());
          setCanadian(response.data.canadian);
          setPcMilerCity(response.data.pcMilerCity?.trim());
          setPcMilerCounty(response.data.pcMilerCounty?.trim());
          setPhone(response.data.phone?.trim());
          setTollFreePhone(response.data.tollFreePhone?.trim());
          setFax(response.data.fax?.trim());
          setLogin(response.data.login?.trim());
          setPassword(response.data.password?.trim());
          setMasterDealer(response.data.masterDealer);
          setCanadian(response.data.canadian);
          setClosedNotes(response.data.closedNotes);
          setNotes(response.data.notes);

          setLastOrderDate(response.data.lastOrderDate);
          setBrokerfk(response.data.brokerfk);
          setRvDealer(response.data.rvDealer);
          setFaxBolAtOrderEntry(response.data.faxBolAtOrderEntry);
          setFaxBolAtDispatch(response.data.faxBolAtDispatch);
          setDoNotWash(response.data.doNotWash);
          setCustomerWashOverride(response.data.customerWashOverride);
          setPayCustomerForWash(response.data.payCustomerForWash);
          setWashCustomerfk(response.data.washCustomerfk);
          setClosedBeginDate(response.data.closedBeginDate);
          setClosedEndDate(response.data.closedEndDate);
          setTwicRequired(response.data.twicRequired);
          setStoreCode(response.data.storeCode?.trim());

          setHours1(response.data.hours1?.trim());
          setHours2(response.data.hours2?.trim());
          setHours3(response.data.hours3?.trim());
          setDirections1(response.data.directions1?.trim());
          setDirections2(response.data.directions2?.trim());
          setDirections3(response.data.directions3?.trim());
          setDirections4(response.data.directions4?.trim());
          setDirections5(response.data.directions5?.trim());
          setDirections6(response.data.directions6?.trim());
          setDirections7(response.data.directions7?.trim());
          setOtherText1(response.data.otherText1?.trim());
          setOtherText2(response.data.otherText2?.trim());
          setOtherText3(response.data.otherText3?.trim());
          setWashInstructions1(response.data.washInstructions1?.trim());
          setWashInstructions2(response.data.washInstructions2?.trim());
          setWashInstructions3(response.data.washInstructions3?.trim());
          setWashInstructions4(response.data.washInstructions4?.trim());
          setWashInstructions5(response.data.washInstructions5?.trim());
          setContactOnDelivery(response.data.contactOnDelivery?.trim());
          setContactOnDeliveryPhone(response.data.contactOnDeliveryPhone?.trim());

          setDeliveryAddress1(response.data.deliveryAddress1?.trim());
          setDeliveryAddress2(response.data.deliveryAddress2?.trim());
          setSundayDelivery(response.data.sundayDelivery);
          setMondayDelivery(response.data.mondayDelivery);
          setTuesdayDelivery(response.data.tuesdayDelivery);
          setWednesdayDelivery(response.data.wednesdayDelivery);
          setThursdayDelivery(response.data.thursdayDelivery);
          setFridayDelivery(response.data.fridayDelivery);
          setSaturdayDelivery(response.data.saturdayDelivery);
          setDeliveryHours(response.data.deliveryHours?.trim());
          setDeliveryNotes(response.data.deliveryNotes?.trim());

          setSundayPickup(response.data.sundayPickup);
          setMondayPickup(response.data.mondayPickup);
          setTuesdayPickup(response.data.tuesdayPickup);
          setWednesdayPickup(response.data.wednesdayPickup);
          setThursdayPickup(response.data.thursdayPickup);
          setFridayPickup(response.data.fridayPickup);
          setSaturdayPickup(response.data.saturdayPickup);
          setSundayPickup(response.data.sundayPickup);
          setPickupContact(response.data.pickupContact?.trim());
          setPickupContactPhone(response.data.pickupContactPhone?.trim());
          setPickupContactEmail(response.data.setPickupContactEmail);
          setPickupAddress1(response.data.pickupAddress1?.trim());
          setPickupAddress2(response.data.pickupAddress2?.trim());
          setPickupHours(response.data.pickupHours?.trim());
          setPickupNotes(response.data.pickupNotes?.trim());

          setGeneralManagerContact(response.data.generalManagerContact?.trim());
          setGeneralManagerPhone(response.data.generalManagerPhone?.trim());
          setGeneralManagerPhoneExtn(response.data.generalManagerPhoneExtn?.trim());
          setGeneralManagerEmail(response.data.generalManagerEmail?.trim());
          setSalesManagerContact(response.data.salesManagerContact?.trim());
          setSalesManagerPhone(response.data.salesManagerPhone?.trim());
          setSalesManagerPhoneExtn(response.data.salesManagerPhoneExtn?.trim());
          setSalesManagerEmail(response.data.salesManagerEmail?.trim());
          setServiceManagerContact(response.data.serviceManagerContact?.trim());
          setServiceManagerPhone(response.data.serviceManagerPhone?.trim());
          setServiceManagerPhoneExtn(response.data.serviceManagerPhoneExtn?.trim());
          setServiceManagerEmail(response.data.serviceManagerEmail?.trim());
          setDeliveryContact(response.data.deliveryContact?.trim());
          setDeliveryPhone(response.data.deliveryPhone?.trim());
          setDeliveryPhoneExtn(response.data.deliveryPhoneExtn?.trim());
          setDeliveryEmail(response.data.deliveryEmail?.trim());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getincompleteDealerById = (id) => {
    if (id) {
      InCompleteDealerService.getInCompleteDealerById(id)
        .then((response) => {
          setActive(response.data.active);
          setincompletedealerPK(response.data.incompletedealerPK);
          setHours(response.data.hours);
          setDirections(response.data.directions);
          setWashInstructions(response.data.washInstructions);

          setName(response.data.name?.trim());
          setDba(response.data.dba?.trim());
          setAddress1(response.data.address1?.trim());
          setAddress2(response.data.address2?.trim());
          setCity(response.data.city?.trim());
          setStateCode(response.data.stateCode?.trim());
          setPostalCode(response.data.postalCode?.trim());
          setCanadian(response.data.canadian);
          setPcMilerCity(response.data.pcMilerCity?.trim());
          setPcMilerCounty(response.data.pcMilerCounty?.trim());
          setPhone(response.data.phone?.trim());
          setTollFreePhone(response.data.tollFreePhone?.trim());
          setFax(response.data.fax?.trim());
          setLogin(response.data.login?.trim());
          setPassword(response.data.password?.trim());
          setMasterDealer(response.data.masterDealer);
          setCanadian(response.data.canadian);
          setClosedNotes(response.data.closedNotes);
          setNotes(response.data.notes);

          setLastOrderDate(response.data.lastOrderDate);
          setBrokerfk(response.data.brokerfk);
          setRvDealer(response.data.rvDealer);
          setFaxBolAtOrderEntry(response.data.faxBolAtOrderEntry);
          setFaxBolAtDispatch(response.data.faxBolAtDispatch);
          setDoNotWash(response.data.doNotWash);
          setCustomerWashOverride(response.data.customerWashOverride);
          setPayCustomerForWash(response.data.payCustomerForWash);
          setWashCustomerfk(response.data.washCustomerfk);
          setClosedBeginDate(response.data.closedBeginDate);
          setClosedEndDate(response.data.closedEndDate);
          setTwicRequired(response.data.twicRequired);
          setStoreCode(response.data.storeCode?.trim());

          setHours1(response.data.hours1?.trim());
          setHours2(response.data.hours2?.trim());
          setHours3(response.data.hours3?.trim());
          setDirections1(response.data.directions1?.trim());
          setDirections2(response.data.directions2?.trim());
          setDirections3(response.data.directions3?.trim());
          setDirections4(response.data.directions4?.trim());
          setDirections5(response.data.directions5?.trim());
          setDirections6(response.data.directions6?.trim());
          setDirections7(response.data.directions7?.trim());
          setOtherText1(response.data.otherText1?.trim());
          setOtherText2(response.data.otherText2?.trim());
          setOtherText3(response.data.otherText3?.trim());
          setWashInstructions1(response.data.washInstructions1?.trim());
          setWashInstructions2(response.data.washInstructions2?.trim());
          setWashInstructions3(response.data.washInstructions3?.trim());
          setWashInstructions4(response.data.washInstructions4?.trim());
          setWashInstructions5(response.data.washInstructions5?.trim());
          setContactOnDelivery(response.data.contactOnDelivery?.trim());
          setContactOnDeliveryPhone(response.data.contactOnDeliveryPhone?.trim());

          setDeliveryAddress1(response.data.deliveryAddress1?.trim());
          setDeliveryAddress2(response.data.deliveryAddress2?.trim());
          setSundayDelivery(response.data.sundayDelivery);
          setMondayDelivery(response.data.mondayDelivery);
          setTuesdayDelivery(response.data.tuesdayDelivery);
          setWednesdayDelivery(response.data.wednesdayDelivery);
          setThursdayDelivery(response.data.thursdayDelivery);
          setFridayDelivery(response.data.fridayDelivery);
          setSaturdayDelivery(response.data.saturdayDelivery);
          setDeliveryHours(response.data.deliveryHours?.trim());
          setDeliveryNotes(response.data.deliveryNotes?.trim());

          setSundayPickup(response.data.sundayPickup);
          setMondayPickup(response.data.mondayPickup);
          setTuesdayPickup(response.data.tuesdayPickup);
          setWednesdayPickup(response.data.wednesdayPickup);
          setThursdayPickup(response.data.thursdayPickup);
          setFridayPickup(response.data.fridayPickup);
          setSaturdayPickup(response.data.saturdayPickup);
          setSundayPickup(response.data.sundayPickup);
          setPickupContact(response.data.pickupContact?.trim());
          setPickupContactPhone(response.data.pickupContactPhone?.trim());
          setPickupContactEmail(response.data.setPickupContactEmail);
          setPickupAddress1(response.data.pickupAddress1?.trim());
          setPickupAddress2(response.data.pickupAddress2?.trim());
          setPickupHours(response.data.pickupHours?.trim());
          setPickupNotes(response.data.pickupNotes?.trim());

          setGeneralManagerContact(response.data.generalManagerContact?.trim());
          setGeneralManagerPhone(response.data.generalManagerPhone?.trim());
          setGeneralManagerPhoneExtn(response.data.generalManagerPhoneExtn?.trim());
          setGeneralManagerEmail(response.data.generalManagerEmail?.trim());
          setSalesManagerContact(response.data.salesManagerContact?.trim());
          setSalesManagerPhone(response.data.salesManagerPhone?.trim());
          setSalesManagerPhoneExtn(response.data.salesManagerPhoneExtn?.trim());
          setSalesManagerEmail(response.data.salesManagerEmail?.trim());
          setServiceManagerContact(response.data.serviceManagerContact?.trim());
          setServiceManagerPhone(response.data.serviceManagerPhone?.trim());
          setServiceManagerPhoneExtn(response.data.serviceManagerPhoneExtn?.trim());
          setServiceManagerEmail(response.data.serviceManagerEmail?.trim());
          setDeliveryContact(response.data.deliveryContact?.trim());
          setDeliveryPhone(response.data.deliveryPhone?.trim());
          setDeliveryPhoneExtn(response.data.deliveryPhoneExtn?.trim());
          setDeliveryEmail(response.data.deliveryEmail?.trim());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/edit-Dealer/" + dealerPK + "/" + pageNum) {
      getDealerById(id);
    }
    if (window.location.pathname === "/edit-incompleteDealer/" + incompletedealerPK + "/" + pageNum) {
      getincompleteDealerById(id);
      setIncomplete(true);
      setViewDetail(false);
    }
  }, []);

  return (
    <div className="container-fluid table-bordered dealerDiv dealerDiv">
      <div className="row" style={{ fontSize: "12px", fontFamily: "cambria,seirf", fontWeight: "bold" }}>
        <span className="border border-dark border-3" style={{ paddingTop: "20px" }}>
          <Formik
            initialValues={{
              name,
              address1,
              city,
              stateCode,
              lastOrderDate,
              phone,
              tollFreePhone,
              fax,
              contactOnDeliveryPhone,
              postalCode,
              canadian,
              generalManagerPhone,
              generalManagerEmail,
              salesManagerPhone,
              salesManagerEmail,
              serviceManagerPhone,
              serviceManagerEmail,
              deliveryPhone,
              deliveryEmail,
              pickupContactPhone,
            }}
            validationSchema={validationSchema}
            enableReinitialize={true}
            initialTouched={{
              name: true,
              address1: true,
              city: true,
              stateCode: true,
              lastOrderDate: true,
              phone: true,
              tollFreePhone: true,
              fax: true,
              contactOnDeliveryPhone: true,
              postalCode: true,
              canadian: false,
              generalManagerPhone: true,
              generalManagerEmail: true,
              salesManagerPhone: true,
              salesManagerEmail: true,
              serviceManagerPhone: true,
              serviceManagerEmail: true,
              deliveryPhone: true,
              deliveryEmail: true,
              pickupContactPhone: true,
            }}
            on={on}
          >
            {(formik) => (
              <form on={formik.handle}>
                <button
                  className="btn btn-secondary"
                  type=""
                  style={{
                    float: "right",
                    marginRight: "10px",
                    marginTop: "0px",
                    marginBottom: "5px",
                    width: "10%",
                  }}
                  onClick={handleCloseShow}
                >
                  Close
                </button>
                <div className="card col-md-12 border border-dark border-3">
                  <Tabs defaultActiveKey="first" style={{ background: "lightGray" }}>
                    {/* General Tab */}
                    <Tab eventKey="first" title="General">
                      <div className="row">
                        <div className="col-md-6">
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label" htmlFor="name">
                              Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              maxLength={30}
                              value={formik.values.name}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setName(e.target.value);
                              }}
                              className="dealer-input"
                              onBlur={formik.handleBlur}
                              style={
                                viewDetail === true
                                  ? {}
                                  : {
                                      borderColor:
                                        formik.errors.name === undefined && name.length > 1
                                          ? "green"
                                          : formik.errors.name !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                            />
                            <div style={{ marginLeft: "17%", color: "red" }}>
                              <ErrorMessage name="name"></ErrorMessage>
                            </div>
                            <div>
                              {viewDetail === false && name.length === 30 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Name must be 30 characters or less
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label" htmlFor="dba">
                              DBA
                            </label>
                            <input
                              type="text"
                              id="dba"
                              name="dba"
                              maxLength={30}
                              value={dba}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setDba(e.target.value)}
                              className="dealer-input"
                            />
                            <div>
                              {viewDetail === false && dba != null && dba.length === 30 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  DBA must be 30 characters or less
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label" htmlFor="address1">
                              Address
                            </label>
                            <input
                              type="text"
                              id="ad1"
                              name="address1"
                              maxLength={30}
                              value={formik.values.address1}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setAddress1(e.target.value);
                              }}
                              className="dealer-input"
                              onBlur={formik.handleBlur}
                              style={
                                viewDetail === true
                                  ? {}
                                  : {
                                      borderColor:
                                        formik.errors.address1 === undefined && address1.length > 1
                                          ? "green"
                                          : formik.errors.address1 !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                              autoComplete="one-time-code"
                              spellCheck={false}
                              aria-autocomplete="list"
                            />
                            <div style={{ marginLeft: "17%", color: "red" }}>
                              <ErrorMessage name="address1"></ErrorMessage>
                            </div>
                            <div>
                              {viewDetail === false && address1.length === 30 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Address1 must be 30 characters or less
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="address2"
                            ></label>
                            <input
                              type="text"
                              id="ad2"
                              name="ad2"
                              maxLength={30}
                              value={address2}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setAddress2(e.target.value)}
                              className="dealer-input"
                              autoComplete="one-time-code"
                              spellCheck={false}
                              aria-autocomplete="list"
                            />
                            <div>
                              {viewDetail === false && address2 != null && address2.length === 30 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Address2 must be 30 characters or less
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label" htmlFor="city">
                              City,State Zip
                            </label>
                            <input
                              type="text"
                              name="city"
                              maxLength={30}
                              value={formik.values.city}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setCity(e.target.value);
                              }}
                              className="dealer-input"
                              style={
                                viewDetail === true
                                  ? { marginRight: "5px" }
                                  : {
                                      marginRight: "5px",
                                      borderColor:
                                        formik.errors.city === undefined && city.length > 1
                                          ? "green"
                                          : formik.errors.city !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                              onBlur={formik.handleBlur}
                            />
                            <input
                              type="text"
                              name="stateCode"
                              maxLength={2}
                              value={formik.values.stateCode.toUpperCase()}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setStateCode(e.target.value.toUpperCase());
                              }}
                              className="dealer-input"
                              style={
                                viewDetail === true
                                  ? { width: "65px", marginRight: "5px" }
                                  : {
                                      width: "65px",
                                      marginRight: "5px",
                                      borderColor:
                                        formik.errors.stateCode === undefined && stateCode.length > 1
                                          ? "green"
                                          : formik.errors.stateCode !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                              onBlur={formik.handleBlur}
                            />
                            <input
                              type="text"
                              name="postalCode"
                              value={formik.values.postalCode}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setPostalCode(e.target.value);
                              }}
                              className="dealer-input"
                              style={
                                viewDetail === true
                                  ? { width: "65px" }
                                  : {
                                      width: "65px",
                                      borderColor:
                                        formik.errors.postalCode === undefined && postalCode.length > 1
                                          ? "green"
                                          : formik.errors.postalCode !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                              onBlur={formik.handleBlur}
                            />
                            <div style={{ marginLeft: "17%", color: "red" }}>
                              <ErrorMessage name="city"></ErrorMessage>
                            </div>
                            <div style={{ marginLeft: "75%", color: "red" }}>
                              <ErrorMessage name="stateCode"></ErrorMessage>
                            </div>
                            <div style={{ marginLeft: "75%", color: "red" }}>
                              <ErrorMessage name="postalCode"></ErrorMessage>
                            </div>
                            <div>
                              {viewDetail === false && city.length === 30 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  City must be 30 characters or less
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Canadian</label>
                            <input
                              type="checkbox"
                              style={{ width: "15px" }}
                              id="canadian"
                              name="canadian"
                              className="dealer-input"
                              disabled={viewDetail === true ? true : false}
                              value={formik.values.canadian}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setCanadian(e.target.checked);
                              }}
                              checked={canadian}
                              onBlur={formik.handleBlur}
                            />
                            <div style={{ marginLeft: "17%", color: "red" }}>
                              <ErrorMessage name="canadian"></ErrorMessage>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label" htmlFor="pcMilerCity">
                              PCMiler City
                            </label>
                            <input
                              type="text"
                              name="pcMilerCity"
                              id="pcMilerCity"
                              maxLength={30}
                              value={pcMilerCity}
                              className="dealer-input"
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setPcMilerCity(e.target.value)}
                            />
                            <div>
                              {viewDetail === false && pcMilerCity != null && pcMilerCity.length === 30 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  PC Miler City must be 30 characters or less{" "}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label" htmlFor="pcMilerCounty">
                              PCMiler County
                            </label>
                            <input
                              type="text"
                              name="pcMilerCounty"
                              id="pcMilerCounty"
                              maxLength={30}
                              value={pcMilerCounty}
                              className="dealer-input"
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setPcMilerCounty(e.target.value)}
                            />
                            <div>
                              {viewDetail === false &&
                                pcMilerCounty != null &&
                                pcMilerCounty.length === 30 && (
                                  <div style={{ marginLeft: "17%", color: "red" }}>
                                    PC Miler County must be 30 characters or less{" "}
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Phone</label>
                            <input
                              type="text"
                              id="phone"
                              name="phone"
                              maxLength={13}
                              value={formik.values.phone}
                              className="dealer-input"
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setPhone(e.target.value);
                              }}
                              onBlur={formik.handleBlur}
                              style={
                                viewDetail === true
                                  ? {}
                                  : {
                                      borderColor:
                                        formik.errors.phone === undefined && phone != null && phone.length > 1
                                          ? "green"
                                          : formik.errors.phone !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                            />
                            <div style={{ marginLeft: "17%", color: "red" }}>
                              <ErrorMessage name="phone"></ErrorMessage>
                            </div>
                            <div>
                              {viewDetail === false && phone != null && phone.length === 13 && (
                                <div style={{ marginLeft: "17%", color: "red" }}> </div>
                              )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Tollfree Phone</label>
                            <input
                              type="text"
                              id="tollFreePhone"
                              name="tollFreePhone"
                              maxLength={13}
                              value={formik.values.tollFreePhone}
                              className="dealer-input"
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setTollFreePhone(e.target.value);
                              }}
                              onBlur={formik.handleBlur}
                              style={
                                viewDetail === true
                                  ? {}
                                  : {
                                      borderColor:
                                        formik.errors.tollFreePhone === undefined &&
                                        tollFreePhone != null &&
                                        tollFreePhone.length > 1
                                          ? "green"
                                          : formik.errors.tollFreePhone !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                            />
                            <div style={{ marginLeft: "17%", color: "red" }}>
                              <ErrorMessage name="tollFreePhone"></ErrorMessage>
                            </div>
                            <div>
                              {viewDetail === false &&
                                tollFreePhone != null &&
                                tollFreePhone.length === 13 && (
                                  <div style={{ marginLeft: "17%", color: "red" }}> </div>
                                )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Fax</label>
                            <input
                              type="text"
                              id="fax"
                              name="fax"
                              maxLength={13}
                              value={formik.values.fax}
                              className="dealer-input"
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setFax(e.target.value);
                              }}
                              onBlur={formik.handleBlur}
                              style={
                                viewDetail === true
                                  ? {}
                                  : {
                                      borderColor:
                                        formik.errors.fax === undefined && fax != null && fax.length > 1
                                          ? "green"
                                          : formik.errors.fax !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                            />
                            <div style={{ marginLeft: "17%", color: "red" }}>
                              <ErrorMessage name="fax"></ErrorMessage>
                            </div>
                            <div>
                              {viewDetail === false && fax != null && fax.length === 13 && (
                                <div style={{ marginLeft: "17%", color: "red" }}> </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* col -6 */}
                        <div className="col-md-6">
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label" htmlFor="login">
                              Website Login
                            </label>
                            <input
                              type="text"
                              id="login"
                              name="login"
                              maxLength={50}
                              value={login}
                              className="dealer-input"
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setLogin(e.target.value)}
                            />
                            <div>
                              {viewDetail === false && login != null && login.length === 50 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Website Login must be 50 characters or less
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Website Password</label>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              autoComplete="new-password"
                              aria-autocomplete="list"
                              maxLength={20}
                              value={password}
                              className="dealer-input"
                              onChange={(e) => setPassword(e.target.value)}
                              disabled={login === "" || login === true || viewDetail === true ? true : false}
                            />
                            <div>
                              {viewDetail === false && password != null && password.length === 20 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Website must be 20 characters or less
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Master Dealer</label>
                            <input
                              type="checkbox"
                              id="masterDealer"
                              name="masterDealer"
                              value={masterDealer}
                              style={{ width: "15px" }}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setMasterDealer(e.target.checked)}
                              checked={masterDealer}
                              className="dealer-input"
                            />
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Group Dealer</label>
                            <select
                              name="groupDealer"
                              id="groupDealer"
                              value={dealerGroupFk}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setDealerGroupFK(e.target.value)}
                              className="dealer-input"
                              style={{ borderBlockWidth: "2px" }}
                            >
                              <option value={""}>All</option>
                              <option></option>
                              <option></option>
                              <option></option>
                            </select>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Notes</label>
                            <textarea
                              type="text"
                              id="notes"
                              name="notes"
                              value={notes}
                              className="dealer-input"
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setNotes(e.target.value)}
                              style={{
                                height: "230px",
                                width: "61%",
                                overflowY: "scroll",
                                borderColor: "black",
                                borderBlockWidth: "2px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Tab>

                    {/* Settings Tab */}
                    <Tab eventKey="second" title="Settings">
                      <div className="row">
                        <div className="col-md-6">
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Last Order Date</label>
                            <input
                              type="date"
                              className="dealer-input"
                              id="orderDate"
                              name="orderDate"
                              max="9999-12-31"
                              value={lastOrderDate}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setLastOrderDate(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Export Broker</label>
                            <select
                              name="exportBroker"
                              id="exportBroker"
                              value={brokerfk}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setBrokerfk(e.target.value)}
                              className="dealer-input"
                              style={{ borderBlockWidth: "2px" }}
                            >
                              <option value={""}>All</option>
                              <option></option>
                              <option></option>
                              <option></option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Is RV Dealer</label>
                            <input
                              type="checkbox"
                              id="isRVDealer"
                              name="isRVDealer"
                              className="dealer-input"
                              style={{ width: "15px" }}
                              value={rvDealer}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setRvDealer(e.target.checked)}
                              checked={rvDealer}
                            />
                          </div>
                          <div className="form-group">
                            {" "}
                            {twicRequired}
                            <label className="col-sm-2 col-form-label dealer-label">TWIC Required</label>
                            <input
                              type="checkbox"
                              id="twicRequired"
                              name="twicRequired"
                              className="dealer-input"
                              style={{ width: "15px" }}
                              value={twicRequired}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setTwicRequired(e.target.checked)}
                              checked={twicRequired}
                            />
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">
                              Fax BOL At Order Entry
                            </label>
                            <input
                              type="checkbox"
                              id="faxBOlAtOE"
                              name="faxBOlAtOE"
                              className="dealer-input"
                              style={{ width: "15px" }}
                              value={faxBolAtOrderEntry}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setFaxBolAtOrderEntry(e.target.checked)}
                              checked={faxBolAtOrderEntry}
                            />
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">
                              Fax BOL At Dispatch
                            </label>
                            <input
                              type="checkbox"
                              id="faxBOlAtDis"
                              name="faxBOlAtDis"
                              className="dealer-input"
                              style={{ width: "15px" }}
                              value={faxBolAtDispatch}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setFaxBolAtDispatch(e.target.checked)}
                              checked={faxBolAtDispatch}
                            />
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Do Not Wash</label>
                            <input
                              type="checkbox"
                              id="donotWash"
                              name="donotWash"
                              className="dealer-input"
                              style={{ width: "15px" }}
                              value={doNotWash}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setDoNotWash(e.target.checked)}
                              checked={doNotWash}
                            />
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">
                              Customer Wash Text Override
                            </label>
                            <input
                              type="checkbox"
                              id="customerWash"
                              name="customerWash"
                              className="dealer-input"
                              style={{ width: "15px" }}
                              value={customerWashOverride}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setCustomerWashOverride(e.target.checked)}
                              checked={customerWashOverride}
                            />
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">
                              Pay Customer For Wash{" "}
                            </label>
                            <input
                              type="checkbox"
                              id="payCustomer"
                              name="payCustomer"
                              className="dealer-input"
                              style={{ width: "15px" }}
                              value={payCustomerForWash}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setPayCustomerForWash(e.target.checked)}
                              checked={payCustomerForWash}
                            />
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Wash Customer</label>
                            <select
                              name="washCustomer"
                              id="washCustomer"
                              className="dealer-input"
                              value={washCustomerfk}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setWashCustomerfk(e.target.value)}
                              style={{ borderBlockWidth: "2px" }}
                            >
                              <option value={""}>All</option>
                              <option></option>
                              <option></option>
                              <option></option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label" htmlFor="storeCode">
                              Store Code
                            </label>
                            <input
                              type="text"
                              id="storeCode"
                              name="storeCode"
                              className="dealer-input"
                              maxLength={4}
                              value={storeCode}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setStoreCode(e.target.value.toUpperCase())}
                            />
                            <div>
                              {viewDetail === false && storeCode != null && storeCode.length === 4 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  {" "}
                                  must be 4 characters or less
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* col-6 */}
                        <div className="col-md-6">
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Closed Begin Date</label>
                            <input
                              type="date"
                              id="closedBDate"
                              name="closedBDate"
                              className="dealer-input"
                              max="9999-12-31"
                              value={closedBeginDate}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setClosedBeginDate(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Closed End Date</label>
                            <input
                              type="date"
                              id="closedEDate"
                              name="closedEDate"
                              className="dealer-input"
                              max="9999-12-31"
                              value={closedEndDate}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setClosedEndDate(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Notes</label>
                            <textarea
                              type="text"
                              id="closedNotes"
                              name="closedNotes"
                              value={closedNotes}
                              className="dealer-input"
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setClosedNotes(e.target.value)}
                              style={{
                                height: "230px",
                                width: "61%",
                                overflowY: "scroll",
                                borderColor: "black",
                                borderBlockWidth: "2px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Tab>
                    {/* BOL Text */}
                    <Tab eventKey="third" title="BOL Text">
                      <div className="row">
                        <div> Add To BOL Text Information</div>
                        <div className="col-md-6">
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Hours</label>
                            <input
                              type="text"
                              id="hours1"
                              name="hours1"
                              className="dealer-input"
                              maxLength={42}
                              value={hours1}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setHours1(e.target.value)}
                            />
                            <div>
                              {viewDetail === false && hours1 != null && hours1.length === 42 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  {" "}
                                  Hours1 must be 42 characters or less
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label" htmlFor="hours2"></label>
                            <input
                              type="text"
                              id="hours2"
                              name="hours2"
                              className="dealer-input"
                              maxLength={42}
                              value={hours2}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setHours2(e.target.value)}
                            />
                            <div>
                              {viewDetail === false && hours2 != null && hours2.length === 42 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  {" "}
                                  Hours2 must be 42 characters or less
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label" htmlFor="hours3"></label>
                            <input
                              type="text"
                              id="hours3"
                              name="hours3"
                              className="dealer-input"
                              maxLength={42}
                              value={hours3}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setHours3(e.target.value)}
                            />
                            <div>
                              {viewDetail === false && hours3 != null && hours3.length === 42 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  {" "}
                                  Hours3 must be 42 characters or less
                                </div>
                              )}
                            </div>
                          </div>

                          <br></br>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label" htmlFor="directions1">
                              Directions
                            </label>
                            <input
                              type="text"
                              id="directions1"
                              name="directions1"
                              className="dealer-input"
                              maxLength={42}
                              value={directions1}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setDirections1(e.target.value)}
                            />
                            <div>
                              {viewDetail === false && directions1 != null && directions1.length === 42 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Directions1 must be 42 characters or less
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="directions2"
                            ></label>
                            <input
                              type="text"
                              id="directions2"
                              name="directions2"
                              className="dealer-input"
                              maxLength={42}
                              value={directions2}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setDirections2(e.target.value)}
                            />
                            <div>
                              {viewDetail === false && directions2 != null && directions2.length === 42 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Directions2 must be 42 characters or less
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="directions3"
                            ></label>
                            <input
                              type="text"
                              id="directions3"
                              name="directions3"
                              className="dealer-input"
                              maxLength={42}
                              value={directions3}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setDirections3(e.target.value)}
                            />
                            <div>
                              {viewDetail === false && directions3 != null && directions3.length === 42 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  {" "}
                                  Direction3 must be 42 characters or less
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="directions4"
                            ></label>
                            <input
                              type="text"
                              id="directions4"
                              name="directions4"
                              className="dealer-input"
                              maxLength={42}
                              value={directions4}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setDirections4(e.target.value)}
                            />
                            <div>
                              {viewDetail === false && directions4 != null && directions4.length === 42 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Directions4 must be 42 characters or less
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="directions5"
                            ></label>
                            <input
                              type="text"
                              id="directions5"
                              name="directions5"
                              className="dealer-input"
                              maxLength={42}
                              value={directions5}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setDirections5(e.target.value)}
                            />
                            <div>
                              {viewDetail === false && directions5 != null && directions5.length === 42 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Directions5 must be 42 characters or less
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="directions6"
                            ></label>
                            <input
                              type="text"
                              id="directions6"
                              name="directions6"
                              className="dealer-input"
                              maxLength={42}
                              value={directions6}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setDirections6(e.target.value)}
                            />
                            <div>
                              {viewDetail === false && directions6 != null && directions6.length === 42 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Directions6 must be 42 characters or less
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="directions7"
                            ></label>
                            <input
                              type="text"
                              id="directions7"
                              name="directions7"
                              className="dealer-input"
                              maxLength={42}
                              value={directions7}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setDirections7(e.target.value)}
                            />
                            <div>
                              {viewDetail === false && directions7 != null && directions7.length === 42 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Directions7 must be 42 characters or less
                                </div>
                              )}
                            </div>{" "}
                          </div>
                          <br></br>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label" htmlFor="otherText1">
                              Other Text
                            </label>
                            <input
                              type="text"
                              id="otherText1"
                              name="otherText1"
                              className="dealer-input"
                              maxLength={42}
                              value={otherText1}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setOtherText1(e.target.value)}
                            />
                            <div>
                              {viewDetail === false && otherText1 != null && otherText1.length === 42 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  OtherText1 must be 42 characters or less
                                </div>
                              )}
                            </div>{" "}
                          </div>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="otherText2"
                            ></label>
                            <input
                              type="text"
                              id="otherText2"
                              name="otherText2"
                              className="dealer-input"
                              maxLength={42}
                              value={otherText2}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setOtherText2(e.target.value)}
                            />
                            <div>
                              {viewDetail === false && otherText2 != null && otherText2.length === 42 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  OtherText2 must be 42 characters or less
                                </div>
                              )}
                            </div>{" "}
                          </div>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="otherText3"
                            ></label>
                            <input
                              type="text"
                              id="otherText3"
                              name="otherText3"
                              className="dealer-input"
                              maxLength={42}
                              value={otherText3}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setOtherText3(e.target.value)}
                            />
                            <div>
                              {viewDetail === false && otherText3 != null && otherText3.length === 42 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  OtherText3 must be 42 characters or less
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <br></br>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="washInstructions1"
                            >
                              Wash Instructions
                            </label>
                            <input
                              type="text"
                              id="washInstructions1"
                              name="washInstructions1"
                              className="dealer-input"
                              maxLength={42}
                              value={washInstructions1}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setWashInstructions1(e.target.value)}
                            />
                            <div>
                              {viewDetail === false &&
                                washInstructions1 != null &&
                                washInstructions1.length === 42 && (
                                  <div style={{ marginLeft: "17%", color: "red" }}>
                                    Wash Instructions1 must be 42 characters or less
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="washInstructions2"
                            ></label>
                            <input
                              type="text"
                              id="washInstructions2"
                              name="washInstructions2"
                              className="dealer-input"
                              maxLength={42}
                              value={washInstructions2}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setWashInstructions2(e.target.value)}
                            />
                            <div>
                              {viewDetail === false &&
                                washInstructions2 != null &&
                                washInstructions2.length === 42 && (
                                  <div style={{ marginLeft: "17%", color: "red" }}>
                                    Wash Instructions2 must be 42 characters or less
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="washInstructions3"
                            ></label>
                            <input
                              type="text"
                              id="washInstructions3"
                              name="washInstructions3"
                              className="dealer-input"
                              maxLength={42}
                              value={washInstructions3}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setWashInstructions3(e.target.value)}
                            />
                            <div>
                              {viewDetail === false &&
                                washInstructions3 != null &&
                                washInstructions3.length === 42 && (
                                  <div style={{ marginLeft: "17%", color: "red" }}>
                                    Wash Instructions3 must be 42 characters or less
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="washInstructions4"
                            ></label>
                            <input
                              type="text"
                              id="washInstructions4"
                              name="washInstructions4"
                              className="dealer-input"
                              maxLength={42}
                              value={washInstructions4}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setWashInstructions4(e.target.value)}
                            />
                            <div>
                              {viewDetail === false &&
                                washInstructions4 != null &&
                                washInstructions4.length === 42 && (
                                  <div style={{ marginLeft: "17%", color: "red" }}>
                                    Wash Instructions4 must be 42 characters or less
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label"></label>
                            <input
                              type="text"
                              id="washInstructions5"
                              name="washInstructions5"
                              className="dealer-input"
                              maxLength={42}
                              value={washInstructions5}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setWashInstructions5(e.target.value)}
                            />
                            <div>
                              {viewDetail === false &&
                                washInstructions5 != null &&
                                washInstructions5.length === 42 && (
                                  <div style={{ marginLeft: "17%", color: "red" }}>
                                    Wash gInstructions5 must be 42 characters or less
                                  </div>
                                )}
                            </div>
                          </div>
                          <br></br>
                          <br></br>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="contactOnDelivery"
                            >
                              Contact On Delivery
                            </label>
                            <input
                              type="text"
                              id="contactOnDelivery"
                              name="contactOnDelivery"
                              className="dealer-input"
                              maxLength={30}
                              value={contactOnDelivery}
                              style={
                                viewDetail === true
                                  ? { width: "300px", marginLeft: "40px" }
                                  : { width: "300px", marginLeft: "40px" }
                              }
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setContactOnDelivery(e.target.value)}
                            />
                            <div>
                              {viewDetail === false &&
                                contactOnDelivery != null &&
                                contactOnDelivery.length === 30 && (
                                  <div style={{ marginLeft: "22.5%", color: "red" }}>
                                    Contact On Delivery must be 30 characters or less
                                  </div>
                                )}
                            </div>{" "}
                          </div>
                          <div className="form-group">
                            <label className="col-sm-3 col-form-label dealer-label">
                              Contact On Delivery Phone
                            </label>
                            <input
                              type="text"
                              id="contactOnDeliveryPhone"
                              name="contactOnDeliveryPhone"
                              className="dealer-input"
                              maxLength={13}
                              value={formik.values.contactOnDeliveryPhone}
                              style={
                                viewDetail === true
                                  ? { width: "120px", marginLeft: "-20px" }
                                  : {
                                      width: "120px",
                                      marginLeft: "-20px",
                                      borderColor:
                                        formik.errors.contactOnDeliveryPhone === undefined &&
                                        contactOnDeliveryPhone != null &&
                                        contactOnDeliveryPhone.length > 1
                                          ? "green"
                                          : formik.errors.tollFreePhone !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setContactOnDeliveryPhone(e.target.value);
                              }}
                              onBlur={formik.handleBlur}
                            />{" "}
                          </div>
                          <div style={{ marginLeft: "22.5%", color: "red" }}>
                            <ErrorMessage name="contactOnDeliveryPhone"></ErrorMessage>
                          </div>
                          <div>
                            {viewDetail === false &&
                              contactOnDeliveryPhone != null &&
                              contactOnDeliveryPhone.length === 13 && (
                                <div style={{ marginLeft: "22.5%", color: "red" }}></div>
                              )}
                          </div>
                        </div>
                      </div>
                    </Tab>
                    {/* Drivers */}
                    <Tab eventKey="fourth" title="Drivers">
                      <div className="row">
                        <div>Texrt Add To Drivers Confirmation Email</div>
                        <div className="col-md-4">
                          <div className="form-group md3">
                            <label className="form-label">Hours</label>
                            <textarea
                              type="text"
                              name="hours"
                              value={hours}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setHours(e.target.value)}
                              className="form-control"
                              style={{ height: "400px", overflowY: "scroll" }}
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="form-label">Directions</label>
                            <textarea
                              type="text"
                              name="directions"
                              value={directions}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setDirections(e.target.value)}
                              className="form-control"
                              style={{ height: "400px", overflowY: "scroll" }}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group md3">
                            <label className="form-label">Wash Instructions</label>
                            <textarea
                              type="text"
                              name="washInstructions"
                              value={washInstructions}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setWashInstructions(e.target.value)}
                              className="form-control"
                              style={{ height: "400px", overflowY: "scroll" }}
                            />
                          </div>
                        </div>
                      </div>
                    </Tab>
                    {/* Delivery */}
                    <Tab eventKey="fifth" title="Delivery">
                      <div className="row">
                        <div className="col-md-6">
                          <br></br>

                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="deliveryAddress1"
                            >
                              Delivery Address
                            </label>
                            <input
                              type="text"
                              id="ad1"
                              name="ad1"
                              maxLength={30}
                              value={deliveryAddress1}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setDeliveryAddress1(e.target.value)}
                              className="dealer-input"
                              autoComplete="one-time-code"
                              spellCheck={false}
                              aria-autocomplete="list"
                            />
                            {viewDetail === false &&
                              deliveryAddress1 != null &&
                              deliveryAddress1.length === 30 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Delivery Address1 must be 30 characters or less
                                </div>
                              )}
                          </div>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="deliveryAddress2"
                            ></label>
                            <input
                              type="text"
                              id="ad2"
                              name="ad2"
                              maxLength={30}
                              value={deliveryAddress2}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setDeliveryAddress2(e.target.value)}
                              className="dealer-input"
                              autoComplete="one-time-code"
                              spellCheck={false}
                              aria-autocomplete="list"
                            />
                            {viewDetail === false &&
                              deliveryAddress2 != null &&
                              deliveryAddress2.length === 30 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Delivery Address2 must be 30 characters or less
                                </div>
                              )}
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Delivery Contact</label>
                            <input
                              type="text"
                              name="contactOnDelivery"
                              maxLength={30}
                              value={contactOnDelivery}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setContactOnDelivery(e.target.value)}
                              className="dealer-input"
                              readOnly
                            />
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">Delivery Phone</label>
                            <input
                              type="text"
                              name="contactOnDeliveryPhone"
                              value={contactOnDeliveryPhone}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setContactOnDeliveryPhone(e.target.value)}
                              className="dealer-input"
                              readOnly
                            />
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-4 col-form-label dealer-label">
                              Days Dealers Is Open For Deliveries
                            </label>
                            <input
                              type="checkbox"
                              id="sundayDelivery"
                              name="sundayDelivery"
                              value={sundayDelivery}
                              style={{ width: "15px", float: "left" }}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setSundayDelivery(e.target.checked)}
                              checked={sundayDelivery}
                              className="dealer-input"
                            />
                            <label style={{ paddingTop: "5px", paddingLeft: "5px" }}>Sunday</label>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-4 col-form-label dealer-label"></label>
                            <input
                              type="checkbox"
                              id="mondayDelivery"
                              name="mondayDelivery"
                              value={mondayDelivery}
                              style={{ width: "15px", float: "left" }}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setMondayDelivery(e.target.checked)}
                              checked={mondayDelivery}
                              className="dealer-input"
                            />
                            <label style={{ paddingTop: "2px", paddingLeft: "5px" }}>Monday</label>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-4 col-form-label dealer-label"></label>
                            <input
                              type="checkbox"
                              id="tuesdayDelivery"
                              name="tuesdayDelivery"
                              value={tuesdayDelivery}
                              style={{ width: "15px", float: "left" }}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setTuesdayDelivery(e.target.checked)}
                              checked={tuesdayDelivery}
                              className="dealer-input"
                            />
                            <label style={{ paddingTop: "2px", paddingLeft: "5px" }}>Tuesday</label>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-4 col-form-label dealer-label"></label>
                            <input
                              type="checkbox"
                              id="wednesdayDelivery"
                              name="wednesdayDelivery"
                              value={wednesdayDelivery}
                              style={{ width: "15px", float: "left" }}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setWednesdayDelivery(e.target.checked)}
                              checked={wednesdayDelivery}
                              className="dealer-input"
                            />
                            <label style={{ paddingTop: "2px", paddingLeft: "5px" }}>Wednesday</label>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-4 col-form-label dealer-label"></label>
                            <input
                              type="checkbox"
                              id="thursdayDelivery"
                              name="thursdayDelivery"
                              value={thursdayDelivery}
                              style={{ width: "15px", float: "left" }}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setThursdayDelivery(e.target.checked)}
                              checked={thursdayDelivery}
                              className="dealer-input"
                            />
                            <label style={{ paddingTop: "2px", paddingLeft: "5px" }}>Thursday</label>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-4 col-form-label dealer-label"></label>
                            <input
                              type="checkbox"
                              id="fridayDelivery"
                              name="fridayDelivery"
                              value={fridayDelivery}
                              style={{ width: "15px", float: "left" }}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setFridayDelivery(e.target.checked)}
                              checked={fridayDelivery}
                              className="dealer-input"
                            />
                            <label style={{ paddingTop: "2px", paddingLeft: "5px" }}>Friday</label>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-4 col-form-label dealer-label"></label>
                            <input
                              type="checkbox"
                              id="saturdayDelivery"
                              name="saturdayDelivery"
                              value={saturdayDelivery}
                              style={{ width: "15px", float: "left" }}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setSaturdayDelivery(e.target.checked)}
                              checked={saturdayDelivery}
                              className="dealer-input"
                            />
                            <label style={{ paddingTop: "2px", paddingLeft: "5px" }}>Saturday</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <br></br>
                          <div className="form-group">
                            <label>
                              Additional Text Added To Drivers Confirmation Email For Delivery Hours
                            </label>
                            <textarea
                              type="text"
                              className="dealer-test"
                              id="deliveryHours"
                              name="deliveryHours"
                              value={deliveryHours}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setDeliveryHours(e.target.value)}
                              style={{
                                height: "200px",
                                width: "75%",
                                overflowY: "scroll",
                                borderBlockWidth: "2px",
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Text Added To Drivers Confirmation Email For Delivery Information</label>
                            <textarea
                              type="text"
                              id="deliveryNotes"
                              name="deliveryNotes"
                              value={deliveryNotes}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setDeliveryNotes(e.target.value)}
                              style={{
                                height: "200px",
                                width: "75%",
                                overflowY: "scroll",
                                borderBlockWidth: "2px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Tab>

                    {/* Pickup */}

                    <Tab eventKey="sixth" title="Pickup">
                      <div className="row">
                        <div className="col-md-6">
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label" htmlFor="pickupAddress1">
                              Pickup Address1
                            </label>
                            <input
                              type="text"
                              className="dealer-input"
                              id="ad1"
                              name="ad1"
                              maxLength={30}
                              value={pickupAddress1}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setPickupAddress1(e.target.value)}
                              autoComplete="one-time-code"
                              spellCheck={false}
                              aria-autocomplete="list"
                            />
                            {viewDetail === false &&
                              pickupAddress1 != null &&
                              pickupAddress1.length === 30 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Pickup Address1 must be 30 characters or less
                                </div>
                              )}
                          </div>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="pickupAddress2"
                            ></label>
                            <input
                              type="text"
                              className="dealer-input"
                              id="ad2"
                              name="ad2"
                              maxLength={30}
                              value={pickupAddress2}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setPickupAddress2(e.target.value)}
                              autoComplete="one-time-code"
                              spellCheck={false}
                              aria-autocomplete="list"
                            />
                            {viewDetail === false &&
                              pickupAddress2 != null &&
                              pickupAddress2.length === 30 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Pickup Address2 must be 30 characters or less
                                </div>
                              )}
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label" htmlFor="pickupContact">
                              Pickup Contact
                            </label>
                            <input
                              type="text"
                              className="dealer-input"
                              id="pickupContact"
                              name="pickupContact"
                              maxLength={30}
                              value={pickupContact}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setPickupContact(e.target.value)}
                            />
                            {viewDetail === false && pickupContact != null && pickupContact.length === 30 && (
                              <div style={{ marginLeft: "17%", color: "red" }}>
                                Pickup Contact must be 30 characters or less
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="pickupContactPhone"
                            >
                              Pickup Contact Phone
                            </label>
                            <input
                              type="text"
                              className="dealer-input"
                              id="pickupContactPhone"
                              name="pickupContactPhone"
                              value={formik.values.pickupContactPhone}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setPickupContactPhone(e.target.value);
                              }}
                              onBlur={formik.handleBlur}
                              style={
                                viewDetail === true
                                  ? {}
                                  : {
                                      borderColor:
                                        formik.errors.pickupContactPhone === undefined &&
                                        pickupContactPhone != null &&
                                        pickupContactPhone.length > 1
                                          ? "green"
                                          : formik.errors.pickupContactPhone !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                            />
                            <div style={{ marginLeft: "17%", color: "red" }}>
                              <ErrorMessage name="pickupContactPhone"></ErrorMessage>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-4 col-form-label dealer-label">
                              Days Dealers Is Open For Pickup
                            </label>
                            <input
                              type="checkbox"
                              className="dealer-input"
                              id="sundayPickup"
                              name="sundayPickup"
                              style={{ width: "15px", float: "left" }}
                              value={sundayPickup}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setSundayPickup(e.target.checked)}
                              checked={sundayPickup}
                            />
                            <label style={{ paddingTop: "5px", paddingLeft: "5px" }}>Sunday</label>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-4 col-form-label dealer-label"></label>
                            <input
                              type="checkbox"
                              className="dealer-input"
                              id="mondayPickup"
                              name="mondayPickup"
                              style={{ width: "15px", float: "left" }}
                              disabled={viewDetail === true ? true : false}
                              value={mondayPickup}
                              onChange={(e) => setMondayPickup(e.target.checked)}
                              checked={mondayPickup}
                            />
                            <label style={{ paddingTop: "5px", paddingLeft: "5px" }}>Monday</label>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-4 col-form-label dealer-label"></label>
                            <input
                              type="checkbox"
                              className="dealer-input"
                              id="tuesdayPickUp"
                              name="tuesdayPickup"
                              style={{ width: "15px", float: "left" }}
                              disabled={viewDetail === true ? true : false}
                              value={tuesdayPickup}
                              onChange={(e) => setTuesdayPickup(e.target.checked)}
                              checked={tuesdayPickup}
                            />
                            <label style={{ paddingTop: "5px", paddingLeft: "5px" }}>Tuesday</label>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-4 col-form-label dealer-label"></label>
                            <input
                              type="checkbox"
                              className="dealer-input"
                              id="wednesdayPickUp"
                              name="wednesdayPickup"
                              style={{ width: "15px", float: "left" }}
                              value={wednesdayPickup}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setWednesdayPickup(e.target.checked)}
                              checked={wednesdayPickup}
                            />
                            <label style={{ paddingTop: "5px", paddingLeft: "5px" }}>Wednesday</label>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-4 col-form-label dealer-label"></label>
                            <input
                              type="checkbox"
                              className="dealer-input"
                              id="thursdayPickUp"
                              name="thursdayPickup"
                              style={{ width: "15px", float: "left" }}
                              value={thursdayPickup}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setThursdayPickup(e.target.checked)}
                              checked={thursdayPickup}
                            />
                            <label style={{ paddingTop: "5px", paddingLeft: "5px" }}>Thursday</label>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-4 col-form-label dealer-label"></label>
                            <input
                              type="checkbox"
                              className="dealer-input"
                              id="fridayPickiUp"
                              name="fridayPickUp"
                              style={{ width: "15px", float: "left" }}
                              value={fridayPickup}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setFridayPickup(e.target.checked)}
                              checked={fridayPickup}
                            />
                            <label style={{ paddingTop: "5px", paddingLeft: "5px" }}>Friday</label>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-4 col-form-label dealer-label"></label>
                            <input
                              type="checkbox"
                              className="dealer-input"
                              id="saturdayPickUp"
                              name="saturdayPickUp"
                              style={{ width: "15px", float: "left" }}
                              value={saturdayPickup}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setSaturdayPickup(e.target.checked)}
                              checked={saturdayPickup}
                            />{" "}
                          </div>
                          <label style={{ paddingTop: "5px", paddingLeft: "5px" }}>Saturday</label>
                        </div>
                        <div className="col-md-6">
                          <br></br>
                          <div className="form-group">
                            <label>
                              Additional Text Added To Drivers Confirmation Email For Pickup Hours
                            </label>
                            <textarea
                              type="text"
                              className="dealer-test"
                              id="pickupHours"
                              name="pickupHours"
                              value={pickupHours}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setPickupHours(e.target.value)}
                              style={{
                                height: "200px",
                                width: "75%",
                                overflowY: "scroll",
                                borderBlockWidth: "2px",
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label>Text Added To Drivers Confirmation Email For Pickup Information</label>
                            <textarea
                              type="text"
                              className="dealer-test"
                              id="pickupNotes"
                              name="pickupNotes"
                              value={pickupNotes}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setPickupNotes(e.target.value)}
                              style={{
                                height: "200px",
                                width: "75%",
                                overflowY: "scroll",
                                borderBlockWidth: "2px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="seventh" title="Resources">
                      <div className="row">
                        <div> Add To Resources Information</div>
                        <div className="col-md-6">
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label">General Manager</label>
                            <input
                              type="text"
                              className="dealer-input"
                              id="generalManagerContact"
                              name="generalManagerContact"
                              maxLength={30}
                              value={generalManagerContact}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setGeneralManagerContact(e.target.value)}
                            />
                            {viewDetail === false &&
                              generalManagerContact != null &&
                              generalManagerContact.length === 30 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  General Manager Contact must be 30 characters or less
                                </div>
                              )}
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="generalManagerPhone"
                            >
                              Phone
                            </label>
                            <input
                              type="text"
                              id="generalManagerPhone"
                              name="generalManagerPhone"
                              className="dealer-input"
                              value={formik.values.generalManagerPhone}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setGeneralManagerPhone(e.target.value);
                              }}
                              onBlur={formik.handleBlur}
                              style={
                                viewDetail === true
                                  ? {}
                                  : {
                                      width: "180px",
                                      borderColor:
                                        formik.errors.generalManagerPhone === undefined &&
                                        generalManagerPhone != null &&
                                        generalManagerPhone.length > 1
                                          ? "green"
                                          : formik.errors.generalManagerPhone !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                            />
                            <span> </span>
                            <input
                              type="text"
                              id="generalManagerPhoneExtn"
                              name="generalManagerPhoneExtn"
                              style={{ width: "50px" }}
                              maxLength={4}
                              className="dealer-input"
                              value={generalManagerPhoneExtn}
                              onChange={(e) => setGeneralManagerPhoneExtn(e.target.value)}
                              disabled={
                                generalManagerPhone === "" ||
                                generalManagerPhone === true ||
                                viewDetail === true
                                  ? true
                                  : false
                              }
                            />
                            <div style={{ marginLeft: "17%", color: "red" }}>
                              <ErrorMessage name="generalManagerPhone"></ErrorMessage>
                            </div>
                            {viewDetail === false &&
                              generalManagerPhoneExtn != null &&
                              generalManagerPhoneExtn.length === 4 && (
                                <div style={{ marginLeft: "41%", color: "red" }}>
                                  General Manager Phone Extn must be 4 characters or less
                                </div>
                              )}
                          </div>

                          <br></br>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="generalManagerEmail"
                            >
                              Email
                            </label>
                            <input
                              type="text"
                              id="generalManagerEmail"
                              name="generalManagerEmail"
                              className="dealer-input"
                              maxLength={70}
                              value={formik.values.generalManagerEmail}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setGeneralManagerEmail(e.target.value);
                              }}
                              onBlur={formik.handleBlur}
                              style={
                                viewDetail === true
                                  ? {}
                                  : {
                                      borderColor:
                                        formik.errors.generalManagerEmail === undefined &&
                                        generalManagerEmail != null &&
                                        generalManagerEmail.length > 1
                                          ? "green"
                                          : formik.errors.generalManagerEmail !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                            />
                            <div style={{ marginLeft: "17%", color: "red" }}>
                              <ErrorMessage name="generalManagerEmail"></ErrorMessage>
                            </div>
                            {viewDetail === false &&
                              generalManagerEmail != null &&
                              generalManagerEmail.length === 70 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  General Manager Email must be 70 characters or less
                                </div>
                              )}
                          </div>
                          <br></br>
                          <br></br>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="salesManagerContact"
                            >
                              Sales Manager
                            </label>
                            <input
                              type="text"
                              id="salesManagerContact"
                              name="salesManagerContact"
                              className="dealer-input"
                              maxLength={30}
                              value={salesManagerContact}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setSalesManagerContact(e.target.value)}
                            />
                            {viewDetail === false &&
                              salesManagerContact != null &&
                              salesManagerContact.length === 30 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Sales Manager Contact must be 30 characters or less
                                </div>
                              )}
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="salesManagerPhone"
                            >
                              Phone
                            </label>
                            <input
                              type="text"
                              id="salesManagerPhone"
                              name="salesManagerPhone"
                              className="dealer-input"
                              value={formik.values.salesManagerPhone}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setSalesManagerPhone(e.target.value);
                              }}
                              onBlur={formik.handleBlur}
                              style={
                                viewDetail === true
                                  ? {}
                                  : {
                                      width: "180px",
                                      borderColor:
                                        formik.errors.salesManagerPhone === undefined &&
                                        salesManagerPhone != null &&
                                        salesManagerPhone.length > 1
                                          ? "green"
                                          : formik.errors.salesManagerPhone !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                            />
                            <span> </span>
                            <input
                              type="text"
                              id="salesManagerPhoneExtn"
                              name="salesManagerPhoneExtn"
                              style={{ width: "50px" }}
                              className="dealer-input"
                              maxLength={4}
                              value={salesManagerPhoneExtn}
                              onChange={(e) => setSalesManagerPhoneExtn(e.target.value)}
                              disabled={
                                salesManagerPhone === "" || salesManagerPhone === true || viewDetail === true
                                  ? true
                                  : false
                              }
                            />
                            <div style={{ marginLeft: "17%", color: "red" }}>
                              <ErrorMessage name="salesManagerPhone"></ErrorMessage>
                            </div>
                            {viewDetail === false &&
                              salesManagerPhoneExtn != null &&
                              salesManagerPhoneExtn.length === 4 && (
                                <div style={{ marginLeft: "41%", color: "red" }}>
                                  Sales Manager Phone Extn must be 4 characters or less
                                </div>
                              )}
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="salesManagerEmail"
                            >
                              Email
                            </label>
                            <input
                              type="text"
                              id="salesManagerEmail"
                              name="salesManagerEmail"
                              className="dealer-input"
                              maxLength={70}
                              value={formik.values.salesManagerEmail}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setSalesManagerEmail(e.target.value);
                              }}
                              onBlur={formik.handleBlur}
                              style={
                                viewDetail === true
                                  ? {}
                                  : {
                                      borderColor:
                                        formik.errors.salesManagerEmail === undefined &&
                                        salesManagerEmail != null &&
                                        salesManagerEmail.length > 1
                                          ? "green"
                                          : formik.errors.salesManagerEmail !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                            />
                            <div style={{ marginLeft: "17%", color: "red" }}>
                              <ErrorMessage name="salesManagerEmail"></ErrorMessage>
                            </div>
                            {viewDetail === false &&
                              salesManagerEmail != null &&
                              salesManagerEmail.length === 70 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Sales Manager Email must be 70 characters or less
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <br></br>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="serviceManagerContact"
                            >
                              Service Manager
                            </label>
                            <input
                              type="text"
                              id="serviceManagerContact"
                              name="serviceManagerContact"
                              className="dealer-input"
                              maxLength={30}
                              value={serviceManagerContact}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setServiceManagerContact(e.target.value)}
                            />
                            {viewDetail === false &&
                              serviceManagerContact != null &&
                              serviceManagerContact.length === 30 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Service Manager Contact must be 30 characters or less
                                </div>
                              )}
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="serviceManagerPhone"
                            >
                              Phone
                            </label>
                            <input
                              type="text"
                              id="serviceManagerPhone"
                              name="serviceManagerPhone"
                              className="dealer-input"
                              value={formik.values.serviceManagerPhone}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setServiceManagerPhone(e.target.value);
                              }}
                              onBlur={formik.handleBlur}
                              style={
                                viewDetail === true
                                  ? {}
                                  : {
                                      width: "180px",
                                      borderColor:
                                        formik.errors.serviceManagerPhone === undefined &&
                                        serviceManagerPhone != null &&
                                        serviceManagerPhone.length > 1
                                          ? "green"
                                          : formik.errors.serviceManagerPhone !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                            />
                            <span> </span>
                            <input
                              type="text"
                              id="serviceManagerPhoneExtn"
                              name="serviceManagerPhoneExtn"
                              style={{ width: "50px" }}
                              className="dealer-input"
                              maxLength={4}
                              value={serviceManagerPhoneExtn}
                              onChange={(e) => setServiceManagerPhoneExtn(e.target.value)}
                              disabled={
                                serviceManagerPhone === "" ||
                                serviceManagerPhone === true ||
                                viewDetail === true
                                  ? true
                                  : false
                              }
                            />
                            <div style={{ marginLeft: "17%", color: "red" }}>
                              <ErrorMessage name="serviceManagerPhone"></ErrorMessage>
                            </div>
                            {viewDetail === false &&
                              serviceManagerPhoneExtn != null &&
                              serviceManagerPhoneExtn.length === 4 && (
                                <div style={{ marginLeft: "41%", color: "red" }}>
                                  Service Manager Phone Extn must be 4 characters or less
                                </div>
                              )}
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label
                              className="col-sm-2 col-form-label dealer-label"
                              htmlFor="serviceManagerEmail"
                            >
                              Email
                            </label>
                            <input
                              type="text"
                              id="serviceManagerEmail"
                              name="serviceManagerEmail"
                              className="dealer-input"
                              maxLength={70}
                              value={formik.values.serviceManagerEmail}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setServiceManagerEmail(e.target.value);
                              }}
                              onBlur={formik.handleBlur}
                              style={
                                viewDetail === true
                                  ? {}
                                  : {
                                      borderColor:
                                        formik.errors.serviceManagerEmail === undefined &&
                                        serviceManagerEmail != null &&
                                        serviceManagerEmail.length > 1
                                          ? "green"
                                          : formik.errors.serviceManagerEmail !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                            />
                            <div style={{ marginLeft: "17%", color: "red" }}>
                              <ErrorMessage name="serviceManagerEmail"></ErrorMessage>
                            </div>
                            {viewDetail === false &&
                              serviceManagerEmail != null &&
                              serviceManagerEmail.length === 70 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Service Manager Email must be 70 characters or less
                                </div>
                              )}
                          </div>
                          <br></br>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label" htmlFor="deliveryContact">
                              Delivery Contact
                            </label>
                            <input
                              type="text"
                              id="deliveryContact"
                              name="deliveryContact"
                              className="dealer-input"
                              maxLength={30}
                              value={deliveryContact}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => setDeliveryContact(e.target.value)}
                            />
                            {viewDetail === false &&
                              deliveryContact != null &&
                              deliveryContact.length === 30 && (
                                <div style={{ marginLeft: "17%", color: "red" }}>
                                  Delivery Contact must be 30 characters or less
                                </div>
                              )}
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label" htmlFor="deliveryPhone">
                              Phone
                            </label>
                            <input
                              type="text"
                              id="deliveryPhone"
                              name="deliveryPhone"
                              className="dealer-input"
                              value={formik.values.deliveryPhone}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setDeliveryPhone(e.target.value);
                              }}
                              onBlur={formik.handleBlur}
                              style={
                                viewDetail === true
                                  ? {}
                                  : {
                                      width: "180px",
                                      borderColor:
                                        formik.errors.deliveryPhone === undefined &&
                                        deliveryPhone != null &&
                                        deliveryPhone.length > 1
                                          ? "green"
                                          : formik.errors.deliveryPhone !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                            />
                            <span> </span>
                            <input
                              type="text"
                              id="deliveryPhoneExtn"
                              name="deliveryPhoneExtn"
                              style={{ width: "50px" }}
                              maxLength={4}
                              className="dealer-input"
                              value={deliveryPhoneExtn}
                              onChange={(e) => setDeliveryPhoneExtn(e.target.value)}
                              disabled={
                                deliveryPhone === "" || deliveryPhone === true || viewDetail === true
                                  ? true
                                  : false
                              }
                            />
                            <div style={{ marginLeft: "17%", color: "red" }}>
                              <ErrorMessage name="deliveryPhone"></ErrorMessage>
                            </div>
                            {viewDetail === false &&
                              deliveryPhoneExtn != null &&
                              deliveryPhoneExtn.length === 4 && (
                                <div style={{ marginLeft: "41%", color: "red" }}>
                                  Delivery Phone Extn must be 4 characters or less
                                </div>
                              )}
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label className="col-sm-2 col-form-label dealer-label" htmlFor="deliveryEmail">
                              Email
                            </label>
                            <input
                              type="text"
                              id="deliveryEmail"
                              name="deliveryEmail"
                              className="dealer-input"
                              maxLength={70}
                              value={formik.values.deliveryEmail}
                              disabled={viewDetail === true ? true : false}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setDeliveryEmail(e.target.value);
                              }}
                              onBlur={formik.handleBlur}
                              style={
                                viewDetail === true
                                  ? {}
                                  : {
                                      borderColor:
                                        formik.errors.deliveryEmail === undefined &&
                                        deliveryEmail != null &&
                                        deliveryEmail.length > 1
                                          ? "green"
                                          : formik.errors.deliveryEmail !== undefined
                                            ? "red"
                                            : "",
                                    }
                              }
                            />
                            <div style={{ marginLeft: "17%", color: "red" }}>
                              <ErrorMessage name="deliveryEmail"></ErrorMessage>
                            </div>
                            {viewDetail === false && deliveryEmail != null && deliveryEmail.length === 70 && (
                              <div style={{ marginLeft: "17%", color: "red" }}>
                                Delivery Email must be 70 characters or less
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
                <div>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    style={{
                      float: "right",
                      marginRight: "10px",
                      marginTop: "15px",
                      marginBottom: "5px",
                      width: "10%",
                    }}
                    onClick={handleDelete}
                    hidden={!id || incomplete === true || viewDetail === false}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-secondary"
                    type=""
                    style={{
                      float: "right",
                      marginRight: "10px",
                      marginTop: "15px",
                      marginBottom: "5px",
                      width: "10%",
                    }}
                    disabled={name === "" || !formik.isValid}
                    hidden={viewDetail === true}
                    onClick={(e) => saveOrUpdateDealer(e)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    style={{
                      float: "right",
                      marginRight: "10px",
                      marginTop: "15px",
                      marginBottom: "5px",
                      width: "10%",
                    }}
                    onClick={doEdit}
                    hidden={!id || incomplete === true || viewDetail === false}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    style={{
                      float: "right",
                      marginRight: "10px",
                      marginTop: "15px",
                      marginBottom: "5px",
                      width: "10%",
                    }}
                    onClick={handleCancelShow}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{
                      float: "right",
                      marginRight: "10px",
                      marginTop: "15px",
                      marginBottom: "5px",
                      width: "10%",
                    }}
                    onClick={(e) => saveOrUpdateIncompleteDealer(e)}
                    disabled={name === ""}
                    hidden={viewDetail === true}
                  >
                    Incomplete
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    style={
                      active === false
                        ? {
                            backgroundColor: "red",
                            float: "right",
                            marginRight: "10px",
                            marginTop: "15px",
                            marginBottom: "5px",
                            width: "10%",
                          }
                        : {
                            backgroundColor: "",
                            float: "right",
                            marginRight: "10px",
                            marginTop: "15px",
                            marginBottom: "5px",
                            width: "10%",
                          }
                    }
                    onClick={handleActiveShow}
                    hidden={!id || incomplete === true || viewDetail === false}
                  >
                    Active
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    style={{
                      float: "left",
                      marginRight: "10px",
                      marginTop: "15px",
                      marginBottom: "5px",
                      width: "10%",
                    }}
                    hidden={!id || incomplete === true || viewDetail === false}
                  >
                    Contacts
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    style={{
                      float: "left",
                      marginRight: "10px",
                      marginTop: "15px",
                      marginBottom: "5px",
                      width: "10%",
                    }}
                    hidden={!id || incomplete === true || viewDetail === false}
                  >
                    Emails
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </span>
      </div>

      {/* Active Confirmation Modal */}
      <div className="col-xs-6">
        <Modal show={activeShow} onHide={handleActiveClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            {active === true && <Modal.Title>Deactivate Dealer</Modal.Title>}
            {active === false && <Modal.Title>Activate Dealer</Modal.Title>}
          </Modal.Header>
          {active === true && <Modal.Body>Please confirm you want to Deactivate this Dealer</Modal.Body>}
          {active === false && <Modal.Body>Please confirm you want to Activate this Dealer</Modal.Body>}
          <Modal.Footer>
            <Button variant="primary" onClick={(e) => handleActiveSave(e)}>
              Yes
            </Button>
            <Button variant="secondary" onClick={handleActiveClose}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* edit Cancel Confirmation Modal */}
      <div className="col-xs-6">
        <Modal show={cancelShow} onHide={handleCancelNo} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Cancel Dealer Changes</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please confirm you want to cancel your changes</Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleCancelYes}>
              Yes
            </Button>
            <Button variant="secondary" onClick={handleCancelNo}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/*   Delete confirmation Modal */}
      <div className="col-xs-6">
        <Modal show={deleteDealer} onHide={handleDeleteNo} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Dealer </Modal.Title>
          </Modal.Header>
          <Modal.Body>Please confirm you want to Delete this Dealer</Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleDeleteYes}>
              Yes
            </Button>
            <Button variant="secondary" onClick={handleDeleteNo}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Close confirmation Modal */}
        <Modal show={closeShow} onHide={handleCloseNo} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Close Dealer Changes</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please confirm you want to close the program without saving your changes</Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseYes}>
              Yes
            </Button>
            <Button variant="secondary" onClick={handleCloseNo}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

AddDealerComponent.propTypes = {};

export default AddDealerComponent;
