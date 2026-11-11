import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderEntryService from "../../../../../../services/OrderEntryService";
import {
  setContactId,
  addToAssigned,
  filterAvailableContacts,
  setAvailableContacts,
  setAllContactsSelectedId,
  setAssignedContactsSelectedId,
  setContactEditMode,
  setSelectedContact,
  setselectedIndex,
  setDisableDelete,
  setDisableEdit,
  setLoader,
  setContactDescription,
  setBolContactName,
  setBolContactPhone,
  setContactEmail,
  setBolFaxNumber,
  setAssignedContacts,
  setDisableNew,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import useDebouncer from "../../../../../../hooks/useDebouncer";

function AvailableContactListing() {
  const dispatch = useDispatch();
  //Local States Declaration
  const [selectedCustomerID, SetselectedCustomerID] = useState("");
  const [selectedCustomerBillingPlantId, SetSelectedCustomerBillingPlantId] = useState("");
  const [deliveryCustomerPlantId, SetDeliveryCustomerPlantId] = useState("");
  const [pickupCustomerPlantId, SetPickupCustomerPlantId] = useState("");
  const [pickupDealersFK, SetPickupDealersFK] = useState("");
  const [deliveryDealersFK, SetDeliveryDealersFK] = useState("");

  const [timer, setTimer] = useState(null);

  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const descriptionSearch = useSelector((state) => state.editMasterExpressTabsReducer.descriptionSearch);
  const bolContactNameSearch = useSelector(
    (state) => state.editMasterExpressTabsReducer.bolContactNameSearch
  );
  const availableContacts = useSelector((state) => state.editMasterExpressTabsReducer.availableContacts);
  const allContactsSelectedId = useSelector(
    (state) => state.editMasterExpressTabsReducer.allContactsSelectedId
  );
  const assignedContacts = useSelector((state) => state.editMasterExpressTabsReducer.assignedContacts);
  const loader = useSelector((state) => state.editMasterExpressTabsReducer.loader);

  const isEqual = (a, b) => a != null && b != null && a === b;

  const fetchCustomerContactsDetails = () => {
    if (!(
      selectedCustomerID ||
      selectedCustomerBillingPlantId ||
      deliveryCustomerPlantId ||
      pickupCustomerPlantId ||
      pickupDealersFK ||
      deliveryDealersFK
    ))
      return;
    OrderEntryService.fetchCustomerContactsDetails(
      selectedCustomerID,
      selectedCustomerBillingPlantId,
      deliveryCustomerPlantId,
      pickupCustomerPlantId,
      pickupDealersFK,
      deliveryDealersFK
    )
      .then((response) => {
        const data = response.data;
        const filteredData = data.filter(
          (item) =>
            !assignedContacts.some(
              (a) =>
                isEqual(a.alternateContactPK, item.alternateContactPK) ||
                isEqual(a.customerContactPK, item.customerContactPK) ||
                isEqual(a.userContactFK, item.userContactFK)
            )
        );

        dispatch(setAvailableContacts(filteredData));
        let listSize = data.length;
        dispatch(setContactId(listSize + 1));
        dispatch(setLoader(false));
      })
      .catch((err) => console.log(err));
  };

  const fetchCustomerContactsDetailsBasedOnFilter = () => {
    OrderEntryService.fetchCustomerContactsDetailsBasedOnFilter(
      selectedCustomerID,
      descriptionSearch,
      bolContactNameSearch,
      selectedCustomerBillingPlantId,
      deliveryCustomerPlantId,
      pickupCustomerPlantId,
      pickupDealersFK,
      deliveryDealersFK
    )
      .then((response) => {
        const { data } = response;
        if (data === "") {
          dispatch(setAvailableContacts([]));
        } else {
          const filteredData = data.filter(
            (item) =>
              !assignedContacts.some(
                (a) =>
                  isEqual(a.alternateContactPK, item.alternateContactPK) ||
                  isEqual(a.customerContactPK, item.customerContactPK) ||
                  isEqual(a.userContactFK, item.userContactFK)
              )
          );

          dispatch(setAvailableContacts(filteredData));
        }
      })
      .catch((err) => console.log(err));
  };

  //Single and Double Click handling of Available Contacts List
  const handleClickOfAvailableContactList = (customerContact) => {
    dispatch(setDisableNew(false));
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
      //"double click";
      onDoubleClickAvailableContacts(customerContact);
      dispatch(setAllContactsSelectedId(""));
      dispatch(setselectedIndex(""));
    } else {
      setTimer(
        setTimeout(() => {
          //"single click";
          availableContactsOnClick(customerContact);
          setTimer(null);
        }, 300)
      );
    }
  };

  const onDoubleClickAvailableContacts = (customerContact) => {
    dispatch(setDisableNew(false));
    // dispatch(filterAvailableContacts(customerContact.tempId));
    let filterData = availableContacts.filter(
      (contact) =>
        contact.tempId !== customerContact.tempId ||
        contact.alternateContactPK !== customerContact.alternateContactPK
    );

    dispatch(setAvailableContacts(filterData));
    moveToBottom(customerContact);
    clearForm();
    dispatch(setContactEditMode(false));
    dispatch(setAssignedContactsSelectedId(""));
    dispatch(setselectedIndex(""));
    dispatch(setAllContactsSelectedId(""));
  };

  const availableContactsOnClick = (customerContact) => {
    dispatch(setAllContactsSelectedId(customerContact.tempId));
    dispatch(setAssignedContactsSelectedId(""));
    dispatch(setSelectedContact(customerContact));
    dispatch(setContactEditMode(false));
    dispatch(setDisableDelete(true));
    dispatch(setDisableEdit(true));
    dispatch(setDisableNew(false));
  };

  const moveToBottom = (selectedContact) => {
    dispatch(
      addToAssigned({
        ...selectedContact,
        useOnBOL: false,
        delayContact: false,
      })
    );
  };

  const fetchData = useDebouncer(() => {
    if (descriptionSearch !== "" || bolContactNameSearch !== "") {
      fetchCustomerContactsDetailsBasedOnFilter();
    } else {
      fetchCustomerContactsDetails();
    }
  }, 500);

  useEffect(() => {
    if (selectedUnitData?.editMaserExpressContactsTabDTOList) {
      dispatch(setAssignedContacts(selectedUnitData?.editMaserExpressContactsTabDTOList));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUnitData, viewDetail]);

  const clearForm = () => {
    dispatch(setContactDescription(""));
    dispatch(setBolContactName(""));
    dispatch(setBolContactPhone(""));
    dispatch(setContactEmail(""));
    dispatch(setBolFaxNumber(""));
  };

  useEffect(() => {
    SetselectedCustomerID(selectedUnitData?.editMasterExpressUnitTabDTO?.customerPK || "");
    SetSelectedCustomerBillingPlantId(
      selectedUnitData?.editMasterExpressCustomerTabDTO?.billingPlantPK || ""
    );
    SetPickupCustomerPlantId(selectedUnitData?.editMasterExpressUnitTabDTO?.pickupCustomerPlantPK || "");
    SetDeliveryCustomerPlantId(selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryCustomerPlantPK || "");
    SetPickupDealersFK(selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerPK || "");
    SetDeliveryDealersFK(selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerPK || "");
  }, [selectedUnitData, viewDetail]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [descriptionSearch, bolContactNameSearch, selectedCustomerID, pickupDealersFK, deliveryDealersFK]);

  return (
    <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
      <div className="d-flex h-100">
        <div className="w-100 border-2 border-right-2 border">
          <div
            className={`border border-secondary fixTableHead`}
            style={{ overflowY: "scroll", height: "255px" }}
          >
            <table className="table table-striped">
              <thead>
                <tr disabled>
                  <th className="f-w-600 col-4">Description</th>
                  <th className="f-w-600 col-4">Name</th>
                </tr>
              </thead>
              <tbody>
                {loader ? (
                  <tr>
                    <td colSpan="2" align="center">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  availableContacts.length > 0 &&
                  availableContacts.map((customerContact) => (
                    <tr
                      id="rowId"
                      key={customerContact.tempId}
                      onClick={() => !viewDetail && availableContactsOnClick(customerContact)}
                      onDoubleClick={() => !viewDetail && onDoubleClickAvailableContacts(customerContact)}
                      className={customerContact.tempId === allContactsSelectedId ? "tableSelected" : ""}
                    >
                      <td className="f-w-600">
                        {customerContact.contact?.trim() || customerContact?.description?.trim()}
                      </td>
                      <td className="f-w-600">{customerContact.name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {loader
              ? ""
              : availableContacts?.length === 0 && (
                  <p className="pt-3" align="center" style={{ fontSize: "0.8rem" }}>
                    No Records Available
                  </p>
                )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvailableContactListing;
