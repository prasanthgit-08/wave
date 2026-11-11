import { t } from "i18next";
import { Formik, Field } from "formik";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Col, Form, Modal, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../../../common/Button";
import { Radio, RadioGroup } from "react-radio-group";
import DynamicTextFields from "../../../../common/AutoWrapTextFields/DynamicTextFields";
import * as yup from "yup";
import { setReduxCity, setReduxState, setReduxZip } from "../../../../../redux/OEDrivesBySlice";
import OrderEntryService from "../../../../../services/OrderEntryService";
import {
  setDriveByArray,
  setItemSelected,
  deleteSeletedItem,
  setUpdateData,
  setDriveByValidationFlag,
  setInvoiceFlatrate,
  setDriverFlatrate,
  setInvoiceMiles,
  setDriverMiles,
  setDriveByAuthorised,
  setDriveByDealerSelection,
  resetDriveByArray,
  setShowDriveByLookup,
  setReduxDriverFlatRate,
  setFlatRateErrorMsg,
  setMileagedErrorMsg,
  setAllowedInvoicePercentageRedux,
  setOnCancel,
  setShowOverrideButton,
} from "../../../../../redux/OrderEntryFilterSlice";
import InputField from "../../../../common/InputField";
import PostalCode from "../../../../common/PostalCode";
import DealerLookup from "../../../../LookupScreens/Dealer/DealerLookup";
import { resetDealerLookup } from "../../../../../redux/LookupScreens/DealerLookupSlice";
import DriveBysLookup from "../../../../LookupScreens/DriveBys/DriveBysLookup";
import { resetSearchSettingsDriveBys } from "../../../../../redux/LookupScreens/DriveBysLookupSlice";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import toast from "react-hot-toast";
import ModalComponent from "../../../../common/ModalComponent";

const DriveBys = ({ styles }) => {
  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  //get values from redux

  const unitDriveByArray = useSelector((state) => state.orderEntryReducer.drivebyArray);
  //if customerid  is changed / hasdriveby in unit  is toggled, drive by has to be cleared
  const customerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);
  const hasDriveBy = useSelector((state) => state.orderEntryReducer.hasDriveBy);

  const invoiceMilesFromUnit = useSelector((state) => state.orderEntryReducer.defaultInvoiceMiles);
  const invoiceMilesNotDefault = useSelector((state) => state.orderEntryReducer.invoiceMiles);
  const driverMilesFromUnit = useSelector((state) => state.orderEntryReducer.defaultDriverMiles);
  const driverMilesNotDefault = useSelector((state) => state.orderEntryReducer.driverMiles);
  const invoiceFlatRateFromUnit = useSelector((state) => state.orderEntryReducer.invoiceFlatrate);
  const driverFlatRateFromUnit = useSelector((state) => state.orderEntryReducer.driverFlatrate);

  const selectedCustomerData = useSelector((state) => state.orderEntryReducer.customerData);
  const selectedCustomerAllData = useSelector((state) => state.orderEntryReducer.selectedCustomerAllDetails);
  const isUsePlant = useSelector((state) => state.orderEntryReducer.isPlantExist);

  const driveByDealerSelection = useSelector((state) => state.orderEntryReducer.driveByDealerSelection);
  const showDriveByLookup = useSelector((state) => state.orderEntryReducer.showDriveByLookup);
  const dataResetFlag = useSelector((state) => state.orderEntryReducer.dataReset);
  const customerRateList = useSelector((state) => state.orderEntryReducer.customerRatesList);
  const unitTypeFK = useSelector((state) => state.orderEntryReducer.unitTypesFK);
  const driverFlatRateFromRedux = useSelector((state) => state.orderEntryReducer.reduxDriverFlatRate);
  const isInvoiceFlatrateVisible = useSelector((state) => state.orderEntryReducer.isInvoiceFlatrateVisible);
  const isDriverFlatrateVisible = useSelector((state) => state.orderEntryReducer.isDriverFlatrateVisible);
  const isInvoiceMileageRateRedux = useSelector((state) => state.orderEntryReducer.isInvoiceMileageRateRedux);
  const isDriverMileageRateRedux = useSelector((state) => state.orderEntryReducer.isDriverMileageRateRedux);
  const customerRateStructureRedux = useSelector(
    (state) => state.orderEntryReducer.customerRateStructureRedux
  );
  const errorMsgFromRedux = useSelector((state) => state.orderEntryReducer.flatRateErrorMsg);
  const mileagErrorMsgFromRedux = useSelector((state) => state.orderEntryReducer.mileagedErrorMsg);
  const isDefaultDriverMiles = useSelector((state) => state.orderEntryReducer.isDefaultDriverMilesRedux);
  const isDefaultInvoiceMiles = useSelector((state) => state.orderEntryReducer.isDefaultInvoiceMilesRedux);

  const selectedPickupDealer = useSelector((state) => state.orderEntryReducer.selectedPickupDealer);
  const selectedDeliveryDealer = useSelector((state) => state.orderEntryReducer.selectedDeliveryDealer);
  const invoiceAmtRedux = useSelector((state) => state.orderEntryReducer.invoiceAmount);
  const driverAmtRedux = useSelector((state) => state.orderEntryReducer.driverAmount);
  const allowedInvoicePercentageRedux = useSelector(
    (state) => state.orderEntryReducer.allowedInvoicePercentageRedux
  );
  const onCancel = useSelector((state) => state.orderEntryReducer.onCancel);
  const showOverrideButton = useSelector((state) => state.orderEntryReducer.showOverrideButton);

  /****************************Local states**************************************** */
  const [changeColor, setChangeColor] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const [readOnly, setReadOnly] = useState(true);
  const [dealerFlag, setDealerFlag] = useState(false);

  //for UI states
  const [id, setId] = useState(0);
  const [authorizedBy, setAuthorizedBy] = useState("");
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [contact, setContact] = useState("");

  const [instruction, setInstruction] = useState(["", "", "", ""]);
  const [instruction1, setInstruction1] = useState("");
  const [instruction2, setInstruction2] = useState("");
  const [instruction3, setInstruction3] = useState("");
  const [instruction4, setInstruction4] = useState("");

  const [formData, setFormData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState("");

  //for invoice and driver miles
  const [invoiceMiles, setInvoiceMilesLocal] = useState(0);
  const [driverMiles, setDriverMilesLocal] = useState(0);
  const [invoiceFlatRate, setInvoiceFlatRate] = useState(0);
  const [driverFlatRate, setDriverFlatRate] = useState(0);
  const [allowedInvoicePercentage, setAllowedInvoicePercentage] = useState(0);
  const [unitPercentage, setUnitPercentage] = useState(0);
  const [showOverrideErrorMessage, setShowOverrideErrorMessage] = useState("");

  //Enabling and disabling buttons- start
  const [disableAll, setDisableAll] = useState(true);
  const [disableEditButton, setDisableEditButton] = useState(true);
  const [disableDeleteButton, setDisableDeleteButton] = useState(true);
  const [disableSaveButton, setDisableSaveButton] = useState(true);
  const [disableCancelButton, setDisableCancelButton] = useState(true);
  const [disableNew, setDisableNew] = useState(false); //initially new button should be enabled
  const [disableDealer, setDisableDealerButton] = useState(false);
  const [disableDriveBy, setDisableDrivebyButton] = useState(false);
  const [isCustUsePlants, setIsCustUsePlants] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [zipIdChcek, setZipIdCheck] = useState("");
  const [postalCodeOnChange, setPostalCodeOnChange] = useState(false);
  //Enabling and disabling buttons- end

  // zip codes

  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [canadian, setCanadian] = useState(false);
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState(); // zip codes

  //Flat rates modal
  const [showFlatRateModal, setShowFlatRateModal] = useState(false);
  const [showOverrideErrorModal, setShowOverrideErrorModal] = useState(false);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [showOverrideAppliedModal, setShowOverrideAppliedModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userCode, setUserCode] = useState("");
  // const [showOverrideButton, setShowOverrideButton] = useState(false);

  const [canadianDriveByError, setcanadianDriveByError] = useState(false);
  const canadianPickup = useSelector((state) => state.orderEntryReducer.canadianPickup);
  const canadianDelivery = useSelector((state) => state.orderEntryReducer.canadianDelivery);
  const isCanadian = (postalCode) => {
    const usPostalCodeRegex = /^((\d{5}-\d{4})|(\d{5}))$/;
    const canadianPostalCodeRegex = /^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/;
    if (!postalCode) return false;
    return canadianPostalCodeRegex.test(postalCode) ? true : !usPostalCodeRegex.test(postalCode) && false;
  };

  useEffect(() => {
    if (!canadianPickup && !canadianDelivery && isCanadian(postalcode?.trim())) {
      // toast.error('Cannot Add Canadian DriveBy to US Pickup & Delivery');
      setcanadianDriveByError(true);
    }
  }, [canadianPickup, canadianDelivery, postalcode]);

  /*   useEffect(() => {
    //  setInvoiceMilesLocal(digitOnlyValidation(invoiceMilesFromUnit));
    //  setInvoiceMilesLocal(invoiceMilesFromUnit);
  }, [invoiceMilesFromUnit]); */

  useEffect(() => {
    //  setInvoiceMilesLocal(digitOnlyValidation(invoiceMilesFromUnit));
    //  setInvoiceMilesLocal(digitOnlyValidation(invoiceMilesNotDefault));
    setInvoiceMilesLocal(invoiceMilesNotDefault);
  }, [invoiceMilesNotDefault]);

  useEffect(() => {
    setDriverMilesLocal(digitOnlyValidation(driverMilesNotDefault));
  }, [driverMilesNotDefault]);

  useEffect(() => {
    setInvoiceFlatRate(invoiceFlatRateFromUnit);
  }, [invoiceFlatRateFromUnit]);
  useEffect(() => {
    setDriverFlatRate(driverFlatRateFromUnit);
  }, [driverFlatRateFromUnit]);

  useEffect(() => {
    // setDriverMilesLocal(invoiceMiles);
    if (Number(invoiceMiles) >= Number(invoiceMilesFromUnit)) {
      dispatch(setInvoiceMiles(invoiceMiles));
    }
  }, [invoiceMiles]);

  useEffect(() => {
    if (Number(driverMiles) >= Number(driverMilesFromUnit)) {
      dispatch(setDriverMiles(driverMiles));
    }
  }, [driverMiles]);

  useEffect(() => {
    dispatch(setReduxDriverFlatRate(0)); //whenever invoice flat rate is changed, we need to call handleAmt popup functionality
    dispatch(setInvoiceFlatrate(invoiceFlatRate));
  }, [invoiceFlatRate]);
  useEffect(() => {
    dispatch(setDriverFlatrate(driverFlatRate));
  }, [driverFlatRate]);

  useEffect(() => {
    if (errorMsgFromRedux === null || errorMsgFromRedux === undefined || errorMsgFromRedux === "") {
      setErrorFlag(false);
    } else {
      setErrorFlag(true);
      dispatch(setDriveByValidationFlag(false));
    }
  }, [errorMsgFromRedux]);

  useEffect(() => {
    if (selectedCustomerData) {
      if (selectedCustomerData.usePlants) {
        setIsCustUsePlants(true);
      } else setIsCustUsePlants(false);
    }
  }, [selectedCustomerData]);

  useEffect(() => {
    clearForm();
    setAuthorizedBy("");
    setInvoiceMiles(0);
    setDriverMiles(0);
    setInvoiceFlatRate(0);
    setDriverFlatRate(0);
    dispatch(setReduxDriverFlatRate(0));
    dispatch(setMileagedErrorMsg(""));
    dispatch(setFlatRateErrorMsg(""));
    dispatch(setDriveByAuthorised(""));
    dispatch(resetDriveByArray());
  }, [customerId, dataResetFlag]);

  useEffect(() => {
    clearForm();
    setAuthorizedBy("");
    setReadOnly(true);
    dispatch(setDriveByAuthorised(""));
    dispatch(resetDriveByArray());
  }, [hasDriveBy]);

  useEffect(() => {
    if (!city) {
      setcityLength(0);
    } else {
      if (cityLength === undefined) {
        setcityLength();
      }
    }
  }, [city]);

  useEffect(() => {
    if (!postalcode) {
      setzipPostLenght(0);
    } else {
      setzipPostLenght();
    }
  }, [postalcode]);
  useEffect(() => {
    if (disableEditButton) {
      if (
        // Extra condition: disable if pickup & delivery are US but postal code is Canadian
        !canadianPickup &&
        !canadianDelivery &&
        isCanadian(postalcode?.trim())
      ) {
        setDisableSaveButton(true);
      } else if (contact && name && city && statecode && postalcode && address1 && instruction1) {
        if (dealerFlag) {
          setDisableSaveButton(false); //for dealers zip is not editable
        } else {
          //for invalid city, cityLength will be undefined

          if (postalCodePK) {
            setDisableSaveButton(false);
          } else {
            setDisableSaveButton(true);
          }
        }
      } else {
        //in edit mode ,save should be disabled
        setDisableSaveButton(true);
      }
    } else {
      setDisableSaveButton(true);
    }
  }, [
    contact,
    name,
    city,
    statecode,
    postalcode,
    postalCodeOnChange,
    canadian,
    address1,
    cityLength,
    instruction1,
    postalCodePK,
    canadianPickup,
    canadianDelivery,
  ]);

  useEffect(() => {
    checkInvoicePercentage();
  }, [selectedCustomerAllData]);

  const handleAmountExceedsPercentage = () => {
    if (driverAmtRedux > 0) {
      if (invoiceAmtRedux > 0) {
        let unitPercentage = driverAmtRedux / invoiceAmtRedux;
        setUnitPercentage(unitPercentage);
        if (Number(unitPercentage) > Number(allowedInvoicePercentageRedux)) {
          dispatch(setFlatRateErrorMsg("Unit Percentage exceeds Allowed percentage"));

          dispatch(setShowOverrideButton(true));
        } else {
          dispatch(setFlatRateErrorMsg(""));

          dispatch(setShowOverrideButton(false));
        }
      }
    }
  };

  useEffect(() => {
    handleAmountExceedsPercentage();
  }, [driverAmtRedux, invoiceAmtRedux]);

  const handleDriveByDealerSelection = () => {
    clearForm();
    dispatch(resetDealerLookup());
    dispatch(setDriveByDealerSelection(true));
  };

  const onHandleSelectDriveBys = () => {
    dispatch(resetSearchSettingsDriveBys());
    dispatch(setShowDriveByLookup(true));
  };

  const hideDriveByDealerModal = () => dispatch(setDriveByDealerSelection(false));

  function handleAddButton() {
    setId(id + 1);
    //right to left
    setFormData({
      id: id,
      name: name,
      address1: address1,
      address2: address2,
      contact: contact,
      instruction1: instruction1,
      instruction2: instruction2,
      instruction3: instruction3,
      instruction4: instruction4,

      city: city?.trim(),
      canadian: canadian,
      postalcode: postalcode,
      stateCode: statecode?.trim(),
      authorizedBy: authorizedBy,
      fromDealer: dealerFlag,
    });
  }
  // for adding a new record / saving the edited record
  const handleSaveButton = (e) => {
    if (
      unitDriveByArray.find((obj) => {
        return obj.id === selectedId;
      })
    ) {
      dispatch(
        setUpdateData({
          id: selectedId,
          authorizedBy: authorizedBy,
          name: name,
          address1: address1,
          address2: address2,
          contact: contact,
          city: city?.trim(),
          postalCode: postalcode,
          stateCode: statecode?.trim(),
          canadian: canadian,
          instruction1: instruction1,
          instruction2: instruction2,
          instruction3: instruction3,
          instruction4: instruction4,
          selectedIndex: selectedIndex,
        })
      );
    } else {
      handleAddButton();
    }
    //for clearing the form after saving
    setSelectedId("");
    setSelectedIndex("");
    setChangeColor(false);
    dispatch(setItemSelected(false));
    clearForm();
    setReadOnly(true); //make fields non-editable
    setDisableAll(true); // diasable save and cancelbutton
    setDisableNew(false);
    setDisableDrivebyButton(false);
    setDisableDealerButton(false);
  };

  const handleEditButton = (e) => {
    setReadOnly(false); //make fields editable
    //Enable Save and cancel buttons
    setDisableSaveButton(false);
    setDisableCancelButton(false);

    setDisableEditButton(true);
    setDisableDeleteButton(true);
    setDisableNew(true);
    setDisableDrivebyButton(true);
    setDisableDealerButton(true);
    setcityLength(1);
  };
  const handleAuthorized = (e) => {
    setAuthorizedBy(e.target.value);
    dispatch(setDriveByAuthorised(e.target.value));
  };

  const handleCancel = () => {
    setReadOnly(true);
    setDisableSaveButton(true);
    setDisableCancelButton(true);
    setDisableNew(false);
    setDisableDrivebyButton(false);
    setDisableDealerButton(false);
    if (selectedId === null || selectedId === "") setDisableEditButton(true);
    else {
      setDisableEditButton(false);
    }
    clearForm();
    setAuthorizedBy("");
    if (unitDriveByArray[selectedIndex] !== undefined) {
      setEditFormData(unitDriveByArray[selectedIndex]);
    }
  };
  const handleFlatRateCancel = () => {
    setShowFlatRateModal(false);
  };
  const handleFlatRateOK = () => {
    dispatch(setReduxDriverFlatRate(0));

    setUserName("");
    setUserCode("");
    setShowOverrideErrorMessage("");
    setShowFlatRateModal(false);
    setShowOverrideModal(true);
  };
  const handleOverrideCancel = () => {
    setShowOverrideModal(false);
  };
  const handleOverrideOK = () => {
    // To be done : get override percentage of selected user
    //if override percentage is less than customers allowed percentage , show error
    //if the entered value is more than allowed what should we do ?

    let overrideValue;

    OrderEntryService.getOverInvoiceAmt(userCode)
      .then((res) => {
        if (res.data !== null) overrideValue = res.data;
        //if no record present in the db with the given details
        if (
          overrideValue === null ||
          overrideValue === undefined ||
          overrideValue === "" ||
          overrideValue === 0
        ) {
          setShowOverrideErrorModal(true);
          setShowOverrideErrorMessage("Invalid code !!");
          setShowOverrideModal(false);
        } else {
          //record is present but, find the sum
          let newOverrideVal = overrideValue / 100 + selectedCustomerAllData.invoicePercentage;

          setAllowedInvoicePercentage(newOverrideVal);

          if (newOverrideVal < 100) {
            if (unitPercentage > newOverrideVal) {
              setShowOverrideErrorModal(true);
              setShowOverrideErrorMessage(
                "New invoice percentage is insufficient !! Please try another code."
              );
            } else {
              dispatch(setAllowedInvoicePercentageRedux(newOverrideVal));
              dispatch(setFlatRateErrorMsg(""));
              setShowOverrideModal(false);
            }
          } else {
            setShowOverrideErrorMessage("Override Percentage is greater than 100");
            setShowOverrideErrorModal(true);
            setShowOverrideModal(false);
            dispatch(setReduxDriverFlatRate(0));
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };

  const handleOverrideErrorCancel = () => {
    setShowOverrideErrorModal(false);
    dispatch(setReduxDriverFlatRate(0));
  };
  const handleOverrideAppliedCancel = () => {
    setShowOverrideAppliedModal(false);
  };
  const handleFlatRateOverride = () => {
    if (Number(invoiceMiles) > 0 && Number(driverMiles) > 0) {
      //For Flatrated units need do allowed Percentage check and Users override percentage

      if (selectedCustomerAllData !== null && selectedCustomerAllData.invoicePercentage !== 0) {
        let allowedInvoicePercentage = selectedCustomerAllData.invoicePercentage;

        if (invoiceFlatRate > 0) {
          //flat rated units
          let allowedInvoiceAmt = Number((invoiceFlatRate / 100) * allowedInvoicePercentage);

          if (
            driverFlatRate <= allowedInvoiceAmt ||
            (driverFlatRateFromRedux !== 0 && driverFlatRate <= driverFlatRateFromRedux)
          ) {
            dispatch(setFlatRateErrorMsg(""));
          } else {
            let val = driverFlatRateFromRedux !== 0 ? driverFlatRateFromRedux : allowedInvoiceAmt;
            dispatch(setFlatRateErrorMsg("Maximum value that can be given for Driver Flat Rate is " + val));
            // dont show popup if override is already applied
            if (driverFlatRateFromRedux === 0) setShowFlatRateModal(true);
            else setShowFlatRateModal(false);
          }
        }
      }
    }
  };

  const handleOverideButton = () => {
    setShowFlatRateModal(true);
  };

  const handleMilesOverride = () => {
    if (Number(invoiceMiles) > 0 && Number(driverMiles) > 0) {
      //For Mileaged units we need do allowed Percentage check and Users override percentage
      if (selectedCustomerAllData !== null && selectedCustomerAllData.invoicePercentage !== 0) {
        let allowedInvoicePercentage = selectedCustomerAllData.invoicePercentage;
        if (invoiceAmtRedux > 0) {
          var allowedInvoiceAmt = Number((invoiceAmtRedux / 100) * allowedInvoicePercentage);
          if (driverAmtRedux <= allowedInvoiceAmt) {
            dispatch(setMileagedErrorMsg(""));
          } else {
            if (isInvoiceMileageRateRedux || isDriverMileageRateRedux)
              //show error message for mileaged units only
              dispatch(
                setMileagedErrorMsg("Please adjust the miles .Driver amount exceeds the allowed percentage ")
              );
          }
        } else {
          dispatch(setMileagedErrorMsg(""));
        }
      }
    }
    setShowFlatRateModal(false);
  };

  const checkInvoicePercentage = () => {
    if (selectedCustomerAllData !== null) {
      let userInvoicePercentage = 0;
      let allowedInvoicePercentage = 0;

      OrderEntryService.getUserInvoicePercentage(12).then((res) => {
        if (res != null && res.data != "") userInvoicePercentage = res.data;
      });
      allowedInvoicePercentage = userInvoicePercentage / 100 + selectedCustomerAllData.invoicePercentage;
      setAllowedInvoicePercentage(allowedInvoicePercentage);
      dispatch(setAllowedInvoicePercentageRedux(allowedInvoicePercentage));
    }
  };

  const handleNewButton = (e) => {
    clearForm();
    setSelectedId("");
    setSelectedIndex("");
    setReadOnly(false);
    setDealerFlag(false);

    setDisableAll(false);
    setDisableEditButton(true);
    setDisableDeleteButton(true);
    setDisableCancelButton(false);
    setDisableDealerButton(true);
    setDisableDrivebyButton(true);
    setDisableNew(true);
  };
  function clearForm() {
    setName("");
    setAddress1("");
    setAddress2("");
    setContact("");
    setInstruction(["", "", "", ""]);
    setInstruction1("");
    setInstruction2("");
    setInstruction3("");
    setInstruction4("");
    setCity("");
    setStateCode("");
    setPostalCode("");
    setCanadian(false);

    setDisableNew(false);
    setDisableDealerButton(false);
    setDisableDrivebyButton(false);
    setDisableAll(true);

    setUserName("");
    setUserCode("");
    setPostalCodePK(null);
  }

  //from browse page to rightside
  const setEditFormData = (i) => {
    if (i !== null || i !== undefined) {
      setName(i.name);
      setAddress1(i.address1);
      setAddress2(i.address2);

      setContact(i.contact || "");
      setCity(i.city);
      setPostalCode(i.postalcode ? i.postalcode?.trim() : i.postalcode);
      setPostalCodePK(i.postalCodePK);
      setStateCode(i.stateCode);
      setCanadian(i.canadian);
      setInstruction1(i.instruction1 || "");
      setInstruction2(i.instruction2 || "");
      setInstruction3(i.instruction3 || "");
      setInstruction4(i.instruction4 || "");
      setInstruction([i.instruction1, i.instruction2, i.instruction3, i.instruction4]);

      if (i.fromDealer) {
        setDealerFlag(true); //for dealer record name,address , city and Zip are non editable.
      } else {
        setDealerFlag(false);
      }
    }
  };
  const handleDelete = () => {
    dispatch(deleteSeletedItem(selectedId));
    clearForm();
    setReadOnly(true); //make fields non-editable
    setDisableAll(true); // diasable save and cancelbutton

    setDisableDealerButton(false);
    setDisableDrivebyButton(false);
    setDisableNew(false);

    setSelectedId("");
  };

  const digitOnlyValidation = (value, min) => {
    let number = value.toString().replace(/[^\d]/g, "");
    return number;
  };
  const numberValidation = (value, min) => {
    let number = value.toString().replace(/[^\d]/g, "");
    if (/^00/.test(value)) {
      number = value.replace(/^0/, "");
    }

    if (number < min) return min;
    else return number;
  };
  const decimalValidation = (value) => {
    const number = value.replace(/[^\d,.]/g, "");
    if (/^00/.test(value)) {
      number = value.replace(/^00/, "0");
    }

    return number;
  };

  const isValidDecimal = (value) => {
    if (value === "" || value === "0") return true;

    // 1–5 digits with optional .xx  OR  leading dot with 1–2 digits
    const regexp = /^(?:\d{1,5}(?:\.\d{1,2})?|\.\d{1,2})$/;
    return regexp.test(value);
  };

  //For adding a new drive by
  useEffect(() => {
    if (formData !== null) {
      dispatch(setDriveByArray(formData));
      setFormData(null);
      clearForm();
    }
  }, [formData]);

  useEffect(() => {
    if (invoiceMiles == 0 && driverMiles == 0) {
      setShowOverrideErrorMessage("");
      setAllowedInvoicePercentage(0);

      setFlatRateErrorMsg("");
      setShowFlatRateModal(false);
      setUnitPercentage(0);
    }
  }, [invoiceMiles, driverMiles]);

  //for validation
  useEffect(() => {
    let invoiceMilesFlag = true;
    let invoiceFlatRateFlag = true;
    let driverFlatRateFlag = true;
    let driverMilesFlag = true;
    let authorizedFlag = true;
    let contactSetFlag = true;
    let pickAndDropFlag = true; //to confirm

    if (authorizedBy !== "" && unitDriveByArray.length !== undefined && unitDriveByArray.length > 0) {
      unitDriveByArray.forEach(function (item, index) {
        //if contact is not set tab colour should be red

        if (item.contact === null || item.contact === undefined || item.contact === "") {
          contactSetFlag = false;
        }
      });
    } else {
      authorizedFlag = false;
    }
    //miles and flate rates should be >= to normal miles and flatrates from unit

    if (
      invoiceMiles === "" ||
      (invoiceMiles !== "" && Number(invoiceMiles) === 0) ||
      Number(invoiceMiles) < Number(invoiceMilesFromUnit)
    ) {
      invoiceMilesFlag = false;
    }
    if (driverMiles === "" || (driverMiles !== "" && Number(driverMiles) === 0)) {
      driverMilesFlag = false;
    }
    if (isInvoiceFlatrateVisible && isDriverFlatrateVisible) {
      if (!isInvoiceMileageRateRedux && (invoiceFlatRate === "" || Number(invoiceFlatRate === 0))) {
        invoiceFlatRateFlag = false;
      }
      if (!isDriverMileageRateRedux && (driverFlatRate === "" || Number(driverFlatRate === 0))) {
        driverFlatRateFlag = false;
      }

      if (Number(driverAmtRedux) > Number(invoiceAmtRedux)) {
        driverFlatRateFlag = false;
      }
    }
    if (
      selectedDeliveryDealer === null ||
      selectedDeliveryDealer === undefined ||
      selectedPickupDealer === undefined ||
      selectedPickupDealer === null
    ) {
      pickAndDropFlag = false;
    }

    if (
      authorizedFlag &&
      contactSetFlag &&
      invoiceMilesFlag &&
      invoiceFlatRateFlag &&
      driverFlatRateFlag &&
      !postalCodeOnChange &&
      driverMilesFlag &&
      !errorFlag &&
      pickAndDropFlag &&
      mileagErrorMsgFromRedux === "" &&
      ((!isInvoiceMileageRateRedux && invoiceFlatRate) || isInvoiceMileageRateRedux) &&
      invoiceFlatRate !== "" &&
      isValidDecimal(invoiceFlatRate) &&
      !errorFlag &&
      ((!isDriverMileageRateRedux && driverFlatRate) || isDriverMileageRateRedux) &&
      driverFlatRate !== "" &&
      isValidDecimal(driverFlatRate) &&
      !errorFlag
    ) {
      dispatch(setDriveByValidationFlag(true));
    } else {
      dispatch(setDriveByValidationFlag(false));
    }
  }, [
    authorizedBy,
    unitDriveByArray,
    invoiceMiles,
    driverMiles,
    invoiceFlatRate,
    driverFlatRate,
    statecode,
    canadian,
    postalcode,
    errorFlag,
    mileagErrorMsgFromRedux,
    postalCodeOnChange,
  ]);
  // when flat rates are changed , need to run handleInvoiceAmt method to validate the same.

  function isRecordAlreadySelected(i) {
    var result = unitDriveByArray.find((obj) => {
      return obj.name === i.name;
    });

    if (result === undefined) {
      return false;
    } else return true;
  }

  const callHandleInvoiceAmt = () => {
    handleFlatRateOverride();
  };

  const handleDealerLookupSelection = (dealer, e) => {
    clearForm();
    setDisableNew(true);
    setDisableDealerButton(true);
    setDisableDrivebyButton(true);
    setSelectedId("");

    setDisableAll(false);
    setDisableEditButton(true);
    setDisableDeleteButton(true);
    setReadOnly(false);
    setDisableCancelButton(false);

    if (!isRecordAlreadySelected(dealer)) {
      setId(id + 1);
      setEditFormData({
        id: id,
        name: dealer.name,
        city: dealer.city,
        stateCode: dealer.stateCode,
        postalcode: dealer.postalCode,
        canadian: dealer.canadian,
        address1: dealer.address1,
        address2: dealer.address2,
        instruction1: "",
        instruction2: "",
        instruction3: "",
        instruction4: "",
        contact: "",
        authorizedBy: authorizedBy,
        fromDealer: true,
      });
    }
    dispatch(setDriveByDealerSelection(false));
  };

  const handleOEDriveByOnClick = (driveBy) => {
    clearForm();
    setSelectedId("");
    setInstruction(["", "", "", ""]);
    setDisableNew(true);
    setDisableDealerButton(true);
    setDisableDrivebyButton(true);
    setDisableAll(false);

    setDisableEditButton(true);
    setDisableDeleteButton(true);
    setDisableCancelButton(false);
    setAuthorizedBy(driveBy.authorizedBy);
    setReadOnly(false);
    if (driveBy.city && driveBy.postalCode && driveBy.stateCode) {
      setcityLength(1);
    }
    if (!isRecordAlreadySelected(driveBy)) {
      setId(id + 1);
      setEditFormData({
        id: id,
        name: driveBy.name,
        city: driveBy.city ? driveBy.city?.trim() : "",
        stateCode: driveBy.stateCode ? driveBy.stateCode?.trim() : "",
        postalcode: driveBy.postalCode ? driveBy.postalCode?.trim() : "",
        canadian: driveBy.canadian,
        address1: driveBy.address1 ? driveBy.address1?.trim() : "",
        address2: driveBy.address2 ? driveBy.address2?.trim() : "",
        contact: driveBy?.dealerContact,
        instruction1: driveBy?.comment1 || "",
        instruction2: driveBy?.comment2 || "",
        instruction3: driveBy?.comment3 || "",
        instruction4: driveBy?.comment4 || "",
        authorizedBy: driveBy?.authorizedBy,
        fromUnitDriveBy: true,
        postalCodePK: driveBy.postalCodePK,
      });
    }
  };

  const on = (values, setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };
  useEffect(() => {
    if (instruction) {
      setInstruction1(instruction[0] ? instruction[0] : "");
      setInstruction2(instruction[1] ? instruction[1] : "");
      setInstruction3(instruction[2] ? instruction[2] : "");
      setInstruction4(instruction[3] ? instruction[3] : "");
    }
  }, [instruction, instruction1, instruction2, instruction3, instruction4]);

  const renderMainData = unitDriveByArray.map((i, index) => {
    return (
      <tr
        key={i.id}
        onClick={() => {
          setSelectedId(i.id);
          setSelectedIndex(index);
          setChangeColor(true);
          dispatch(setItemSelected(true));
          setReadOnly(true);
          setEditFormData(i);

          setDisableAll(false);
          setDisableEditButton(false); //on clicking edit and delete should be active
          setDisableDeleteButton(false);
          setDisableCancelButton(true);
          setDisableDealerButton(false);
          setDisableDrivebyButton(false);
          setDisableNew(false);
        }}
        className={i.id === selectedId && changeColor ? "tableSelected" : ""}
      >
        <td>{i.name}</td>
        <td>{i.city}</td>
        <td>{i.stateCode}</td>
      </tr>
    );
  });

  const handlePaste = (index, event) => {
    event.preventDefault();
    let pasteData = event.clipboardData.getData("Text");
    if (pasteData.length > 170) {
      //42 * 4 characters
      pasteData = pasteData.substring(0, 170);
    }

    const words = pasteData.split(/\s+/); // split by any whitespace character
    const newInputValues = [...instruction];
    let currentIndex = index;
    let truncated = false; // flag to check if paste data was truncated
    let i = 0; // counter for words array
    while (i < words.length && currentIndex < inputRefs.current.length) {
      const word = words[i];

      if (newInputValues[currentIndex].length + word.length > 42) {
        // check if word can fit into next input field
        if (
          currentIndex + 1 < newInputValues.length &&
          newInputValues[currentIndex + 1].length + word.length <= 42
        ) {
          currentIndex++;
        } else {
          // word cannot fit in current or next input field, truncate it
          const truncatedWord = word.substring(0, 42 - newInputValues[currentIndex].length);
          newInputValues[currentIndex] = newInputValues[currentIndex] + " " + truncatedWord;
          truncated = true;
          break;
        }
      } else {
        newInputValues[currentIndex] = newInputValues[currentIndex]
          ? newInputValues[currentIndex] + " " + word
          : word;

        if (newInputValues[currentIndex].length === 42) {
          // move to next input field if current input is full
          if (currentIndex === 4 && i < words.length - 1) {
            // if we're on the last input field and there are still words left
            const truncatedWord = words
              .slice(i + 1)
              .join(" ")
              .substring(0, 42);
            newInputValues[currentIndex] = newInputValues[currentIndex] + " " + truncatedWord;
            truncated = true;
            break;
          }
          currentIndex++;
        } else {
        }
        i++;
      }
    }
    setInstruction(newInputValues);
    // move focus to next input field
    setTimeout(() => {
      if (
        newInputValues[currentIndex] !== undefined &&
        newInputValues[currentIndex].length === 42 &&
        currentIndex < inputRefs.current.length - 1
      ) {
        inputRefs.current[currentIndex + 1].focus();
      } else {
        if (newInputValues[currentIndex] !== undefined) inputRefs.current[currentIndex].focus();
      }
    }, 0);
  };

  function handleBeforeInputForInteger(e, maxValue) {
    const currentValue = e.target.value;
    const inputChar = e.data;

    if (inputChar !== null && !/^[0-9+e]*$/.test(inputChar)) {
      e.preventDefault();
      return;
    }

    const newValue = parseInt(currentValue + inputChar, 10);
    if (newValue > maxValue) {
      e.preventDefault();
      return;
    }
  }

  //Miscellaneous Text Fields Functionality
  const handleChange = useCallback(
    (index, event) => {
      const { value } = event.target;
      setInstruction((prevState) => {
        const newState = [...prevState];
        newState[index] = value;
        return newState;
      });

      if (value.length === 42 && index < inputRefs.current.length - 1) {
        if (value.endsWith(" ")) {
          inputRefs.current[index + 1].focus();
        } else {
          const words = value.split(" ");
          const lastWord = words.pop();
          const remainingText = words.join(" ");
          setInstruction((prevState) => {
            const newState = [...prevState];
            newState[index] = remainingText?.trim();
            return newState;
          });

          const nextIndex = index + 1;
          const nextValue = instruction[nextIndex];
          if (nextValue.length === 42) {
            if (nextValue.endsWith(" ")) {
              inputRefs.current[nextIndex + 1].focus();
            } else {
              const nextWords = nextValue.split(" ");
              const firstWord = nextWords.shift();
              const remainingSpace = 42 - lastWord.length;
              if (remainingSpace >= firstWord.length + 1) {
                nextWords.unshift(lastWord);
                setInstruction((prevState) => {
                  const newState = [...prevState];
                  newState[nextIndex] = nextWords.filter((w) => w !== "").join(" ");
                  return newState;
                });
                inputRefs.current[nextIndex].focus();
              } else {
                inputRefs.current[nextIndex].focus();
                setInstruction((prevState) => {
                  const newState = [...prevState];
                  newState[nextIndex] = lastWord?.trim();
                  return newState;
                });
              }
            }
          } else {
            inputRefs.current[nextIndex].focus();
            setInstruction((prevState) => {
              const newState = [...prevState];
              newState[nextIndex] = lastWord?.trim();
              return newState;
            });
          }
        }
      } else if (value.length === 0 && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    },
    [inputRefs, instruction, setInstruction]
  );

  // render input fields
  const renderInputFields = () => {
    return instruction.map((value, index) => {
      return (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="search"
          value={value}
          maxLength="42"
          onChange={(e) => handleChange(index, e)}
          onPaste={(e) => handlePaste(index, e)}
          style={
            index === 0
              ? {
                  whiteSpace: "pre-wrap",
                  marginBottom: "10px",
                  backgroundColor: readOnly ? "#e9ecef" : "white",
                  borderColor: readOnly
                    ? "black"
                    : instruction1 !== null && instruction1 !== undefined && instruction1.length > 0
                      ? "green"
                      : "red",
                  borderWidth: readOnly
                    ? "1px"
                    : instruction1 !== null && instruction1 !== undefined && instruction1.length > 0
                      ? "2px"
                      : "2px",
                }
              : {
                  whiteSpace: "pre-wrap",
                  marginBottom: "10px",
                  backgroundColor: readOnly ? "#e9ecef" : "white",
                }
          }
          className={`customFormControl `}
        />
      );
    });
  };

  const validationSchema = yup.object({
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
  });
  return (
    <Formik
      initialValues={{
        city,
        statecode,
        postalcode,
        canadian,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        city: true,
        statecode: true,
        postalcode: true,
        canadian: false,
      }}
    >
      {(formik) => (
        <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
          {/* ROW 1 */}
          <Row>
            {/* COL 1 - TABLE */}
            <Col sm={5} xs={5} className={styles.driveByTableHeight}>
              <div className={`border border-secondary overflow-auto h-100`}>
                <table className="table border-bottom  table-striped f-w-600">
                  <thead>
                    <tr disabled>
                      <th className={`col-8 ${styles.borderRightOrderEntry}`}>Name</th>

                      <th className={`col-3 ${styles.borderRightOrderEntry}`}>City</th>

                      <th className="col-1">State</th>
                    </tr>
                  </thead>

                  {unitDriveByArray.length !== 0 && <tbody>{renderMainData}</tbody>}
                </table>

                {unitDriveByArray.length === 0 && (
                  <p className="pt-3" align="center" style={{ fontSize: "0.8rem" }}>
                    No Records Available
                  </p>
                )}
              </div>
            </Col>

            {/* COL 2 - BUTTONS */}
            <Col sm={2} xs={2}>
              <div className="d-flex flex-column mt-3">
                <span className="p-1">
                  <button
                    className="btn btn-secondary font-12 btn-sm btn-medium-with"
                    type="button"
                    disabled={disableDealer}
                    onClick={handleDriveByDealerSelection}
                  >
                    Select Dealer
                  </button>
                </span>
                <span className="p-1">
                  <button
                    className="btn btn-secondary font-12 btn-sm btn-medium-with"
                    type="button"
                    disabled={disableDriveBy}
                    onClick={onHandleSelectDriveBys}
                  >
                    Select DriveBy
                  </button>
                </span>
                <span className="p-1"></span>
                <span className="p-1"></span>

                <span className="p-1">
                  <button
                    className="btn btn-secondary font-12 btn-sm btn-medium-with"
                    type="button"
                    onClick={handleNewButton}
                    disabled={disableNew}
                  >
                    New
                  </button>
                </span>

                <span className="p-1">
                  <button
                    className="btn btn-secondary font-12 btn-sm btn-medium-with"
                    type="button"
                    onClick={handleEditButton}
                    disabled={disableAll || disableEditButton}
                  >
                    Edit
                  </button>
                </span>
                <span className="p-1">
                  <button
                    className="btn btn-secondary font-12 btn-sm btn-medium-with"
                    type="button"
                    onClick={handleSaveButton}
                    disabled={disableAll || disableSaveButton}
                  >
                    Save DriveBy
                  </button>{" "}
                </span>
                <span className="p-1">
                  <button
                    className="btn btn-secondary font-12 btn-sm btn-medium-with"
                    type="button"
                    onClick={handleCancel}
                    disabled={disableAll || disableCancelButton}
                  >
                    Cancel
                  </button>
                </span>
                <span className="p-1">
                  <button
                    className="btn btn-secondary font-12 btn-sm btn-medium-with"
                    type="button"
                    onClick={handleDelete}
                    disabled={disableAll || disableDeleteButton}
                  >
                    Delete
                  </button>
                </span>
              </div>
            </Col>

            {/* COL 3 */}
            <Col sm={5} xs={5}>
              <Form on={formik.handle}>
                <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3} className="ps-0">
                    <Form.Label className={`customColFormLabel`}>Authorized By</Form.Label>
                  </Col>
                  <Col sm={6} xs={6} className="ps-0">
                    <input
                      className={`customFormControl  ${authorizedBy ? "borderGreen" : "borderRed"}`}
                      id="authorizedBy"
                      name="authorizedBy"
                      value={authorizedBy}
                      type="text"
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={handleAuthorized}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3} className="ps-0">
                    <Form.Label className={`customColFormLabel`}>
                      {t("edit.dealer.page.general.tab.name")}
                    </Form.Label>
                  </Col>
                  <Col sm={6} xs={6} className="ps-0">
                    <input
                      className={`customFormControl  ${
                        readOnly || dealerFlag ? "" : name ? "borderGreen" : "borderRed"
                      }`}
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={readOnly || dealerFlag}
                      onInput={(e) => setName(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3} className="ps-0">
                    <Form.Label className={`customColFormLabel`}>
                      {t("edit.dealer.page.general.tab.address")}
                    </Form.Label>
                  </Col>
                  <Col sm={6} xs={6} className="ps-0">
                    <input
                      className={`customFormControl  ${
                        readOnly || dealerFlag ? "" : address1 ? "borderGreen" : "borderRed"
                      }`}
                      id="ad1"
                      name="ad1"
                      value={address1}
                      type="text"
                      maxLength={30}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      disabled={readOnly || dealerFlag}
                      onInput={(e) => setAddress1(e.target.value)}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3} className="ps-0"></Col>
                  <Col sm={6} xs={6} className="ps-0">
                    <input
                      className={`customFormControl  `}
                      id="ad2"
                      name="ad2"
                      value={address2}
                      type="text"
                      maxLength={30}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      disabled={readOnly || dealerFlag}
                      onInput={(e) => setAddress2(e.target.value)}
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <div className=" mt-4">
                  <PostalCodeComponent
                    disabled={readOnly || dealerFlag}
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
                  />
                </div>

                <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3} className="ps-0">
                    <Form.Label className={`customColFormLabel`}>Contact</Form.Label>
                  </Col>
                  <Col sm={6} xs={6} className="ps-0">
                    <input
                      className={`customFormControl  ${
                        readOnly ? "" : contact ? "borderGreen" : "borderRed"
                      }`}
                      id="contact"
                      name="contact"
                      type="text"
                      maxLength={30}
                      value={contact}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={readOnly}
                      onInput={(e) => setContact(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-4  align-items-start row  m-l-0 m-r-0">
                  <Col sm={3} xs={3} className="ps-0">
                    <Form.Label className={`customColFormLabel`}>Drive By Instructions</Form.Label>
                  </Col>
                  <Col sm={7} xs={7} className="ps-0">
                    <div style={readOnly ? { pointerEvents: "none" } : {}}>
                      {/* {renderInputFields()} */}
                      <DynamicTextFields
                        numFields={7}
                        maxCharLimit={42}
                        inputValues={instruction}
                        setInputValues={setInstruction}
                        disabled={readOnly}
                        requireFirstField={readOnly ? false : true}
                      />
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-4  align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={3} xs={3} className="ps-0">
                    <Form.Label htmlFor="" className={`customColFormLabel`}>
                      Invoice Miles
                    </Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0 p-0 flex-shrink-0" style={{ width: "70px" }}>
                    <input
                      className={`customFormControl  ${
                        !unitDriveByArray?.length
                          ? ""
                          : Number(invoiceMiles) !== 0 &&
                              invoiceMiles !== "" &&
                              Number(invoiceMiles) >= Number(invoiceMilesFromUnit)
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="invoiceMiles"
                      name="invoiceMiles"
                      type="text"
                      value={invoiceMiles}

                      onBeforeInput={(e) => handleBeforeInputForInteger(e, 2147483647)}
                      maxLength={9}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={unitDriveByArray.length ? false : true}
                      onChange={(e) => {
                        setInvoiceMilesLocal(numberValidation(e.target.value));
                      }}
                      onBlur={(e) => {
                        handleAmountExceedsPercentage();
                        if (!invoiceMiles) {
                          setInvoiceMilesLocal(numberValidation(0));
                        }

                        if (!driverMiles && e.target.value) {
                          setDriverMilesLocal(e.target.value);
                        }
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className="mt-4  align-items-center row  m-l-0 m-r-0 ms-0"
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={3} xs={3} className="ps-0">
                    <Form.Label htmlFor="" className={`customColFormLabel`}>
                      Driver Miles
                    </Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0 p-0 flex-shrink-0" style={{ width: "70px" }}>
                    <input
                      className={`customFormControl  ${
                        !unitDriveByArray?.length
                          ? ""
                          : Number(driverMiles) !== 0 &&
                              driverMiles !== "" &&
                              Number(driverMiles) >= Number(driverMilesFromUnit)
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="driverMiles"
                      name="driverMiles"
                      type="text"
                      value={driverMiles}
                      maxLength={9}
                      autoComplete="off"
                      aria-autocomplete="list"

                      onBeforeInput={(e) => handleBeforeInputForInteger(e, 2147483647)}
                      disabled={unitDriveByArray.length ? false : true}
                      onChange={(e) => {
                        setDriverMilesLocal(numberValidation(e.target.value));
                      }}
                      onBlur={() => {
                        handleAmountExceedsPercentage();
                        if (!driverMiles) {
                          setDriverMilesLocal(numberValidation(0));
                        }
                      }}
                    />
                  </Col>
                  <Col
                    xs={3}
                    md={3}
                    sm={3}
                    className={`${showOverrideButton && errorMsgFromRedux ? "" : "hide-elements"}`}
                  >
                    <button
                      type="button"
                      className={`btn btn-secondary font-12 btn-sm w-70px `}
                      onClick={handleOverideButton}
                    >
                      Override
                    </button>
                  </Col>

                  {
                    <Row className={`${!errorMsgFromRedux && "hide-elements"}`}>
                      <Col xs={3} md={3} sm={3}></Col>
                      <Col className="p-0">
                        <p className="mb-0 text-danger" style={{ marginLeft: "5px", marginTop: "3px" }}>
                          {errorMsgFromRedux || "No Error"}
                        </p>
                      </Col>
                    </Row>
                  }

                  <Row className={`${!mileagErrorMsgFromRedux && "hide-elements"}`}>
                    <Col xs={3} md={3} sm={3}></Col>
                    <Col>
                      <p className="mb-0 text-danger" style={{ marginLeft: "5px", marginTop: "3px" }}>
                        {mileagErrorMsgFromRedux || "No Error"}
                      </p>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group
                  className={`mt-1  align-items-center row  m-l-0 m-r-0 ms-0
                ${!isInvoiceFlatrateVisible ? "hide-elements" : ""}`}
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={3} xs={3} className="ps-0">
                    <Form.Label htmlFor="" className={`customColFormLabel`}>
                      Invoice Flat Rate
                    </Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0 p-0 flex-shrink-0" style={{ width: "70px" }}>
                    <input
                      className={`customFormControl 

                      ${
                        !unitDriveByArray.length
                          ? !isValidDecimal(invoiceFlatRate)
                            ? "borderRed"
                            : ""
                          : isInvoiceMileageRateRedux
                            ? invoiceFlatRate !== "" && !isValidDecimal(invoiceFlatRate) && errorFlag
                              ? "borderRed"
                              : !isValidDecimal(invoiceFlatRate)
                                ? "borderRed"
                                : ""
                            : Number(invoiceFlatRate) !== 0 &&
                                invoiceFlatRate !== "" &&
                                isValidDecimal(invoiceFlatRate) &&
                                !errorFlag
                              ? "borderGreen"
                              : "borderRed"
                      }
                        
                        `}

                      id="invoiceFlatRate"
                      name="invoiceFlatRate"
                      type="text"
                      maxLength={8}
                      value={invoiceFlatRate}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={unitDriveByArray.length ? false : true}
                      onChange={(e) => {
                        e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                          setInvoiceFlatRate(decimalValidation(e.target.value));
                        dispatch(setInvoiceFlatrate(invoiceFlatRate));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-4  align-items-center row  m-l-0 m-r-0 ms-0
                ${!isDriverFlatrateVisible ? "hide-elements" : ""}`}
                  hidden={unitTypeFK == ""}
                >
                  <Col sm={3} xs={3} className="ps-0">
                    <Form.Label htmlFor="" className={`customColFormLabel`}>
                      Driver Flat Rate
                    </Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0 p-0 flex-shrink-0" style={{ width: "70px" }}>
                    <input
                      className={`customFormControl 
                      ${
                        !unitDriveByArray.length
                          ? !isValidDecimal(driverFlatRate)
                            ? "borderRed"
                            : ""
                          : isDriverMileageRateRedux
                            ? driverFlatRate !== "" && !isValidDecimal(driverFlatRate) && errorFlag
                              ? "borderRed"
                              : !isValidDecimal(driverFlatRate)
                                ? "borderRed"
                                : ""
                            : Number(driverFlatRate) !== 0 &&
                                driverFlatRate !== "" &&
                                isValidDecimal(driverFlatRate) &&
                                !errorFlag
                              ? "borderGreen"
                              : "borderRed"
                      }`}

                      id="driverFlatRate"
                      name="driverFlatRate"
                      type="text"
                      maxLength={8}
                      value={driverFlatRate}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled={unitDriveByArray.length ? false : true}
                      onChange={(e) => {
                        e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                          setDriverFlatRate(decimalValidation(e.target.value));
                        dispatch(setDriverFlatrate(driverFlatRate));
                      }}
                      onBlur={handleAmountExceedsPercentage}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>

          {/* NEW DRIVE BY DEALER MODAL */}

          {/* Dealer DriveBy Lookup Modal */}
          <DealerLookup
            show={driveByDealerSelection}
            onHide={hideDriveByDealerModal}
            renderItemId={(dealer) => dealer.dealerPK}
            handleLookupSelection={handleDealerLookupSelection}
            MaintenanceProgram
          />

          {/* DriveBy Lookup Modal */}
          <DriveBysLookup
            show={showDriveByLookup}
            onHide={() => dispatch(setShowDriveByLookup(false))}
            OEDriveBys={true}
            handleOEDriveByOnClick={handleOEDriveByOnClick}
            includePostalCodePK={true}
          />
          {/*Invoice flatrate modal*/}
          <Modal show={showFlatRateModal} onHide={handleFlatRateCancel} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Warning !!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">
              <p>
                <p>
                  Invoice Amount : {invoiceAmtRedux}, Driver Amount : {driverAmtRedux}{" "}
                </p>
                <p>
                  Unit Percentage : {(unitPercentage * 100).toFixed(2)}%, Allowed Percentage :{" "}
                  {(allowedInvoicePercentageRedux * 100).toFixed(2)}%
                </p>

                <p>{errorMsgFromRedux}</p>
                <p>Do you want to override the allowed percentage ? </p>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleFlatRateOK}>
                YES
              </Button>
              <Button variant="secondary" onClick={handleFlatRateCancel}>
                NO
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Override flatrate modal*/}
          <Modal show={showOverrideModal} onHide={handleOverrideCancel} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Please enter the details for overriding the rate</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">
              <p>
                <div hidden="true">
                  <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} xs={3}>
                      <Form.Label className={` col-form-label ${styles.orderLabel}`}>Name</Form.Label>
                    </Col>
                    <Col sm={6} xs={6} className="pe-0">
                      <input
                        className={`customFormControl  `}
                        id="userName"
                        name="userName"
                        type="text"
                        hidden="true"
                        value={userName}
                        maxLength={30}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => setUserName("Mark")}
                      />
                    </Col>
                  </Form.Group>
                </div>
                <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}>
                    <Form.Label className={` col-form-label ${styles.orderLabel}`}> Code</Form.Label>
                  </Col>
                  <Col sm={6} xs={6} className="pe-0">
                    <input
                      className={`customFormControl  `}
                      id="userCode"
                      name="userCode"
                      type="password"
                      value={userCode}
                      maxLength={20}
                      autoComplete="new-password"
                      aria-autocomplete="list"
                      onInput={(e) => setUserCode(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleOverrideOK}>
                OVERRIDE
              </Button>
              <Button variant="secondary" onClick={handleOverrideCancel}>
                NO
              </Button>
            </Modal.Footer>
          </Modal>
          {/*Override Error modal*/}
          <Modal
            show={showOverrideErrorModal}
            onHide={handleOverrideErrorCancel}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Warning !!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">
              <p className="mb-0 text-danger">{showOverrideErrorMessage}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleOverrideErrorCancel}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
          {/*Override Error modal*/}
          <Modal show={showOverrideAppliedModal} onHide={handleOverrideAppliedCancel}>
            <Modal.Header closeButton>
              <Modal.Title>Override Flat Rate</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">
              <p>Maximum driver flat rate after applying override code is {driverFlatRateFromRedux}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleOverrideAppliedCancel}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
          <ModalComponent
            show={canadianDriveByError}
            onHide={() => setcanadianDriveByError(false)}
            title="Warning"
            showError
            body="Cannot Add Canadian DriveBy to US Pickup & Delivery"
            okayButton
          />
        </div>
      )}
    </Formik>
  );
};

export default DriveBys;
