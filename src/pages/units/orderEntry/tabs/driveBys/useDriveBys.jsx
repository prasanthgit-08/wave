import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setUnitRoutesListing } from "../../../../../store/slices/unit.slice";
import { useWatch } from "react-hook-form";

const useDriveBys = () => {
  const dispatch = useDispatch();
  const [authorizedBy, setAuthorizedBy] = useState("");
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [contact, setContact] = useState("");

  const [instructions, setInstructions] = useState(Array(4).fill(""));

  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [canadian, setCanadian] = useState(false);
  const [dealerPK, setDealerPK] = useState(null);
  const [driveByPK, setDriveByPK] = useState(null);
  const unitRoutesListing = useSelector((state) => state.unit.unitRoutesListing);
  const driveBysListing = useSelector((state) => state.unit.driveBysListing);

  const [invoiceMiles, setInvoiceMilesLocal] = useState(0);
  const [driverMiles, setDriverMilesLocal] = useState(0);
  const [invoiceFlatRate, setInvoiceFlatRate] = useState(0);
  const [driverFlatRate, setDriverFlatRate] = useState(0);

  const [editMode, setEditMode] = useState(false);
  const [disableSave, setDisableSave] = useState(false);
  const [showDealerLookup, setShowDealerLookup] = useState(false);
  const [showDriveBysLookup, setShowDriveBysLookup] = useState(false);
  const [isDealerRecord, setIsDealerRecord] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const hasDrivebys = useWatch({ name: "unit.hasDrivebys" });

  // TODO: add dealerFK

  const poeRecordIndex = unitRoutesListing?.findIndex((item) => item?.poeFK);
  const unitRoutesLength = unitRoutesListing?.length;
  const isCanadianPickup = unitRoutesListing[0]?.isCanadian || false;
  const isCanadianDelivery = unitRoutesListing[unitRoutesLength - 1]?.isCanadian || false;
  const usToCanada = !isCanadianPickup && isCanadianDelivery;
  const canadaToUs = isCanadianPickup && !isCanadianDelivery;
  const usDriveBy = !isCanadianPickup && !isCanadianDelivery;
  const canadianDriveBy = isCanadianPickup && isCanadianDelivery;
  // const selectedDriveBy = unitRoutesListing[selectedIndex];
  const selectedDriveBy = driveBysListing[selectedIndex];

  const disableNew = editMode;
  const disableEdit = selectedIndex === null || editMode;
  const disableDelete = selectedIndex === null; /* || editMode */
  const disableCancel = !editMode;
  const disableSelectDealer = editMode || !disableSave;
  const disableSelectDriveBy = editMode || !disableSave;

  const isCanadian = (postalCode) => {
    const usPostalCodeRegex = /^((\d{5}-\d{4})|(\d{5}))$/;
    const canadianPostalCodeRegex = /^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/;
    if (!postalCode) return false;
    return canadianPostalCodeRegex.test(postalCode) ? true : !usPostalCodeRegex.test(postalCode) && false;
  };

  const clearForm = () => {
    setName("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setStateCode("");
    setPostalCode("");
    setCanadian(false);
    setContact("");
    setDealerPK(null);
    setDriveByPK(null);
    setIsDealerRecord(false);
    setInstructions(Array(4).fill(""));
    setPostalValues(initialValue);
    setPostalCodePK(null);
  };

  const handleDealerLookupSelection = (dealer, e) => {
    if (driveBysListing?.find((item) => item?.dealerPK === dealer?.dealerPK)) {
      toast.error("Dealer already exists");
    } else {
      // setShowDealerLookup(false);
      setIsDealerRecord(true);

      setEditMode(true);
      setName(dealer?.name?.trim() || "");
      setAddress1(dealer?.address1?.trim() || "");
      setAddress2(dealer?.address2?.trim() || "");
      setCity(dealer?.city?.trim());
      setStateCode(dealer?.stateCode?.trim());
      setPostalCode(dealer?.postalCode?.trim());
      setCanadian(dealer?.canadian);
      setPostalCodePK(dealer.postalCodePK || null);
      setDealerPK(dealer?.dealerPK);
      setContact("");
      setInstructions(Array(4).fill(""));
    }
    setShowDealerLookup(false);
  };

  const handleDriveByLookupSelection = (driveBy, e) => {
    if (driveBysListing?.find((item) => item?.driveByPK === driveBy?.unitDrivebyPK)) {
      toast.error("DriveBy already exists");
    } else {
      // setShowDriveBysLookup(false);
      setIsDealerRecord(false);

      setEditMode(true);
      setName(driveBy?.name?.trim() || "");
      setAddress1(driveBy?.address1?.trim() || "");
      setAddress2(driveBy?.address2?.trim() || "");
      setCity(driveBy?.city?.trim());
      setStateCode(driveBy?.stateCode?.trim());
      setPostalCode(driveBy?.postalCode?.trim());
      setCanadian(driveBy?.canadian);
      setPostalCodePK(driveBy?.postalCodePK || null);
      setDriveByPK(driveBy?.unitDrivebyPK);
      setContact("");
      setInstructions(Array(4).fill(""));
    }
    setShowDriveBysLookup(false);
  };

  const handleNew = () => {
    clearForm();
    setEditMode(true);
    setSelectedIndex(null);
  };

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    clearForm();
    setEditMode(false);
    setSelectedIndex(null);
  };

  const handleSave = () => {
    // TODO: change left side as schema from backend
    // forntend -> backend mapping b4 saving
    const formData = {
      frontEndPK: selectedDriveBy?.frontEndPK || null,
      authorizedBy: authorizedBy || "",
      name: name || "",
      address1: address1 || "",
      address2: address2 || "",
      dealerContact: contact || "",
      city: city || "",
      stateCode: stateCode || "",
      postalCode: postalCode || "",
      postalCodePK: postalCodePK || null,
      isCanadian: isCanadian(postalCode) || false,
      isDriveBy: true,
      dealerPK: dealerPK || null,
      dealerFK: dealerPK || null,
      driveByPK: driveByPK || null,
      driveByFK: driveByPK || null,

      // TODO: need to confirm with backend payload structure
      instruction1: instructions[0],
      instruction2: instructions[1],
      instruction3: instructions[2],
      instruction4: instructions[3],
    };

    if (usDriveBy && formData?.isCanadian) {
      toast.error("Cannot Add Canadian DriveBy to US Pickup & Delivery");
    }

    if (canadianDriveBy && !formData?.isCanadian) {
      toast.error("Cannot Add US DriveBy to Canadian Pickup & Delivery");
    }

    if (
      usToCanada ||
      canadaToUs ||
      (usDriveBy && !formData?.isCanadian) ||
      (canadianDriveBy && formData?.isCanadian)
    ) {
      // Edit previously added record
      if (selectedDriveBy?.frontEndPK) {
        dispatch(
          setUnitRoutesListing({
            actionType: "edit",
            payload: {
              id: selectedDriveBy?.frontEndPK,
              formData: formData,
            },
          })
        );
      } else {
        // Add new record
        dispatch(
          setUnitRoutesListing({
            actionType: "add",
            payload: formData,
          })
        );
      }

      setEditMode(false);
      setSelectedIndex(null);
      clearForm();
    }
  };

  const populateFormFields = (row, index) => {
    setSelectedIndex(index);
    setEditMode(false);

    // TODO: Frontend - Backend data mapping
    setAuthorizedBy(row?.authorizedBy?.trim() || "");
    setName(row?.name?.trim() || "");
    setAddress1(row?.address1?.trim() || "");
    setAddress2(row?.address2?.trim() || "");
    setCity(row?.city?.trim());
    setStateCode(row?.stateCode);
    setPostalCode(row?.postalCode?.trim());
    setPostalCodePK(row?.postalCodePK || null);
    setContact(row?.contact?.trim() || "");
    setCanadian(row?.canadian || false);
    setInstructions([
      row?.instruction1?.trim() || "",
      row?.instruction2?.trim() || "",
      row?.instruction3?.trim() || "",
      row?.instruction4?.trim() || "",
    ]);
  };

  const handleDelete = () => {
    dispatch(
      setUnitRoutesListing({
        actionType: "delete",
        payload: selectedDriveBy?.frontEndPK,
      })
    );
    setSelectedIndex(null);
    clearForm();
  };

  const handleAuthorizedByOnBlur = () => {
    dispatch(
      setUnitRoutesListing({
        actionType: "updateAuthorizedBy",
        payload: authorizedBy,
      })
    );
  };

  // Save Validation
  useEffect(() => {
    if (editMode && name && authorizedBy && address1 && postalCodePK && contact && instructions[0]) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [editMode, name, authorizedBy, address1, postalCodePK, contact, instructions]);

  // Clear Authorized by
  useEffect(() => {
    if (!hasDrivebys) {
      setAuthorizedBy("");
      clearForm();
      dispatch(setUnitRoutesListing({ actionType: "clearDriveBys" }));
    }
  }, [hasDrivebys]);

  return {
    selectedIndex,
    driveBysListing,
    disableSelectDealer,
    disableSelectDriveBy,
    disableNew,
    disableEdit,
    disableSave,
    disableCancel,
    disableDelete,
    authorizedBy,
    editMode,
    isDealerRecord,
    name,
    address1,
    address2,
    city,
    stateCode,
    postalCode,
    postalOptions,
    postalCodePK,
    canadian,
    contact,
    instructions,
    showDealerLookup,
    showDriveBysLookup,
    setShowDealerLookup,
    setShowDriveBysLookup,
    setAuthorizedBy,
    setName,
    setAddress1,
    setAddress2,
    setCity,
    setStateCode,
    setPostalCode,
    setPostalValues,
    setPostalCodePK,
    setCanadian,
    setContact,
    setInstructions,
    populateFormFields,
    handleNew,
    handleEdit,
    handleSave,
    handleCancel,
    handleDelete,
    handleAuthorizedByOnBlur,
    handleDealerLookupSelection,
    handleDriveByLookupSelection,
  };
};

export default useDriveBys;
