import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import useDebouncer from "../../../../../hooks/useDebouncer";
import { useDispatch } from "react-redux";
import { setOrderEntrySchemaConditions } from "../../../../../store/slices/unit.slice";
import { useSelector } from "react-redux";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import OrderEntryServices from "../../../../../service/orderEntry/orderEntry.service";
import { toBeRequired } from "@testing-library/jest-dom/matchers";

const useContacts = () => {
  const dispatch = useDispatch();
  const orderEntrySchemaConditions = useSelector((state) => state.unit.orderEntrySchemaConditions);
  const { watch, setValue, trigger, getValues } = useFormContext();
  const [availableContacts, setAvailableContacts] = useState([]);
  const [assignedContacts, setAssignedContacts] = useState([]);
  const [contactLoading, setContactLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [cancelFlag, setCancelFlag] = useState(false);
  const [disableSave, setDisableSave] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [contactId, setContactId] = useState("");

  const customerId = useWatch({ name: "customer.customerDataId" });
  const customerPlantId = useWatch({ name: "customer.customerPlantId" });
  const deliveryPlantId = useWatch({ name: "customer.deliveryCustomerPlantFK" });
  const pickupPlantId = useWatch({ name: "customer.pickupCustomerPlantFK" });
  const pickupDealerFK = useWatch({ name: "unit.pickupDealerFK" });
  const deliveryDealerFK = useWatch({ name: "unit.deliveryDealerFK" });
  const pickupAtPlant = useWatch({ name: "customer.pickupAtPlant" });
  const deliverToPlant = useWatch({ name: "customer.deliverToPlant" });

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;

  const [searchName, setSearchName] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [fax, setFax] = useState("");
  const [frontendRecord, setFrontendRecord] = useState(false);

  /**
   *  used to set assignedcontact array to schema
   **/
  useEffect(() => {
    const updatedContacts = assignedContacts?.map((contact) => ({
      ...contact,
      phone: contact.phone ? contact.phone.replace(/\s+/g, "") : "",
      fax: contact.fax ? contact.fax.replace(/\s+/g, "") : "",
    }));
    setValue("contacts.assignedContactsArray", updatedContacts);
  }, [assignedContacts]);

  /**
   *    double click on assined Contacts-move records from   bottom to top
   **/
  const handleDoubleClickMoveBottomToTop = (contact) => {
    if (!contact?.frontendRecord) {
      // Remove from assignedContacts
      setAssignedContacts((prev) => prev.filter((item) => item.tempId !== contact.tempId));

      // Add to availableContacts at the start
      setAvailableContacts((prev) => [contact, ...prev]);
    }
  };

  /**
   *    double click on available Contacts-move records from top to bottom
   **/
  const handleMoveToBottom = (contact) => {
    // Remove from available contacts
    setAvailableContacts((prev) => prev.filter((item) => item.tempId !== contact.tempId));

    // Add to assigned contacts at the top
    setAssignedContacts((prev) => [{ ...contact, delayContact: false, useOnBol: false }, ...prev]);
  };

  /**
   *    single click on available Contacts
   **/
  const handleContactselection = (row) => {
    const selectedItem = row;
    setName(selectedItem?.name);
    setContact(selectedItem?.contact);
    setEmail(selectedItem?.email);
    setFax(formatPhoneNumber(selectedItem?.fax));
    setPhone(formatPhoneNumber(selectedItem?.phone));
    setEditMode(false);
  };

  const fetchCustomerContactsDetails = () => {
    setContactLoading(true);

    OrderEntryServices.fetchCustomerContactsDetails({
      customerId: customerId,
      selectedCustomerBillingPlantId: customerPlantId || null,
      deliveryCustomerPlantId: deliverToPlant && deliveryPlantId ? deliveryPlantId : null,
      pickupCustomerPlantId: pickupAtPlant && pickupPlantId ? pickupPlantId : null,
      pickupDealersFK: pickupDealerFK || null,
      deliveryDealersFK: deliveryDealerFK || null,
    })
      .then((data) => {
        const assignedIds = assignedContacts?.map((c) => c.tempId) || [];
        const available = data.filter((item) => !assignedIds.includes(item.tempId));
        setAvailableContacts(available);
        let listSize = available.length;
        setContactId(listSize + 1);
        setContactLoading(false);
      })
      .catch((err) => {
        setContactLoading(false);
        console.error("Normal contact fetch error:", err);
      });
  };

  const debounceFetchCustomerContactsDetails = useDebouncer(fetchCustomerContactsDetails, 500);

  const fetchCustomerContactsDetailsBasedOnFilter = () => {
    setContactLoading(true);
    OrderEntryServices.fetchCustomerContactsDetailsBasedOnFilter(
      customerId,
      searchDescription,
      searchName,
      customerPlantId || null,
      deliveryPlantId || null,
      pickupPlantId || null,
      pickupDealerFK || null,
      deliveryDealerFK || null
    )
      .then((response) => {
        const data = response;
        const assignedIds = assignedContacts?.map((c) => c.tempId) || [];
        const available = data.filter((item) => !assignedIds.includes(item.tempId));
        setAvailableContacts(available);
        setContactLoading(false);
      })
      .catch((err) => {
        setContactLoading(false);
        console.error("Normal contact fetch error:", err);
      });
  };

  const debounceFetchCustomerContactsDetailsBasedOnFilter = useDebouncer(
    fetchCustomerContactsDetailsBasedOnFilter,
    500
  );

  /**
   *  used to save record
   **/
  const handleSave = () => {
    if (selectedIndex !== null) {
      // Edit existing item
      const updatedList = assignedContacts.map((item, index) =>
        index === selectedIndex
          ? {
              ...item,
              tempId: contactId,
              frontendRecord: true,
              contact,
              name,
              phone: phone,
              email,
              fax: fax,
            }
          : item
      );
      setAssignedContacts(updatedList);
    } else {
      const newItem = {
        tempId: contactId,
        frontendRecord: true,
        contact: contact,
        name: name,
        phone: phone,
        email: email,
        fax: fax,
        delayContact: false,
        useOnBol: false,
      };
      setContactId(contactId + 1);
      setAssignedContacts((prev) => {
        const updated = [newItem, ...prev];
        return updated;
      });
    }
    setSelectedIndex(null);
    setEditMode(false);
    handleClearRecord();
  };

  /**
   *  used to delete record from payload
   **/

  const handleDelete = () => {
    if (selectedIndex !== null) {
      const updatedList = assignedContacts.filter((_, index) => index !== selectedIndex);
      setAssignedContacts(updatedList);
      setSelectedIndex(null);
      setEditMode(false);
      handleClearRecord();
    } else {
      alert("Select a record to delete");
    }
  };

  /* On click of a contact record*/

  const handleClickNew = (data, index) => {
    setSelectedIndex(index);
    const selectedItem = data;
    setName(selectedItem?.name);
    setContact(selectedItem?.contact);
    setFax(formatPhoneNumber(selectedItem?.fax));
    setPhone(formatPhoneNumber(selectedItem?.phone));
    setEmail(selectedItem?.email);
    setFrontendRecord(selectedItem?.frontendRecord);
    setEditMode(false);
  };

  /* Clear records*/

  const handleClearRecord = (da) => {
    setSelectedIndex(null);
    setName("");
    setContact("");
    setFax("");
    setEmail("");
    setPhone("");
    setFrontendRecord("");
  };

  /**
   *    Call correct API based on conditions
   **/
  useEffect(() => {
    if (customerId) {
      if (searchName || searchDescription) {
        debounceFetchCustomerContactsDetailsBasedOnFilter();
      } else {
        if ((deliverToPlant && !deliveryPlantId) || (pickupAtPlant && !pickupPlantId)) return;
        debounceFetchCustomerContactsDetails();
      }
    }
  }, [
    customerId,
    searchDescription,
    searchName,
    deliverToPlant,
    deliveryPlantId,
    pickupAtPlant,
    pickupPlantId,
    pickupDealerFK,
    deliveryDealerFK,
  ]);

  /**
   *  used to disable inner cancel button
   **/

  useEffect(() => {
    if (
      (editMode && selectedIndex == null) ||
      (!editMode && selectedIndex != null) ||
      (editMode && selectedIndex != null)
    ) {
      setCancelFlag(true);
    } else {
      setCancelFlag(false);
    }
  }, [editMode, selectedIndex]);
  {
    /* Save Validation*/
  }
  useEffect(() => {
    if (
      name &&
      phone &&
      phone.match(phoneRegex) &&
      email &&
      email.match(emailRegex) &&
      (!fax || (fax && fax.match(phoneRegex)))
    ) {
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, phone, email, fax]);

  /* update delaycontact and  useonbol*/
  const toggleUseOnBol = (index, value) => {
    const updated = assignedContacts.map((item, i) => (i === index ? { ...item, useOnBol: value } : item));
    setAssignedContacts(updated);
  };

  const toggleDelayContact = (index, value) => {
    const updated = assignedContacts.map((item, i) =>
      i === index ? { ...item, delayContact: value } : item
    );
    setAssignedContacts(updated);
  };

  useEffect(() => {
    if (!customerId) return;
    setSearchDescription("");
    setSearchName("");
    setAssignedContacts([]);
    setAvailableContacts([]);
    handleClearRecord();
    setEditMode(false);
  }, [customerId]);

  return {
    handleContactselection,
    availableContacts,
    contactLoading,

    assignedContacts,
    handleSave,
    handleDelete,
    editMode,
    setEditMode,
    cancelFlag,
    selectedIndex,
    setSelectedIndex,
    email,
    setEmail,
    fax,
    setFax,
    name,
    setName,
    phone,
    setPhone,
    contact,
    setContact,
    searchName,
    setSearchName,
    searchDescription,
    setSearchDescription,
    handleClickNew,
    disableSave,
    handleClearRecord,
    frontendRecord,
    handleMoveToBottom,
    handleDoubleClickMoveBottomToTop,
    toggleUseOnBol,
    toggleDelayContact,
  };
};

export default useContacts;
