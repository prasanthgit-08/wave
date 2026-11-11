import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUseOnBOL,
  updateDelayContact,
  setSelectedContact,
  setAllContactsSelectedId,
  setAssignedContactsSelectedId,
  setselectedIndex,
  addToAvailabe,
  setContactEditMode,
  setDisableDelete,
  setDisableEdit,
  filterAssignedContacts,
  setContactDescription,
  setBolContactName,
  setBolContactPhone,
  setContactEmail,
  setBolFaxNumber,
  setIsManuallyAddedRecord,
  setDisableNew,
  setAssignedContacts,
  setBolContactNameSearch,
  setDescriptionSearch,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

function AssignedContactsListing({ styles }) {
  const dispatch = useDispatch();

  //Local States
  const [timerForAssignedContacts, setTimerForAssignedContacts] = useState(null);

  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const loader = useSelector((state) => state.editMasterExpressTabsReducer.loader);
  const assignedContacts = useSelector((state) => state.editMasterExpressTabsReducer.assignedContacts);
  const availableContacts = useSelector((state) => state.editMasterExpressTabsReducer.availableContacts);

  const assignedContactsSelectedId = useSelector(
    (state) => state.editMasterExpressTabsReducer.assignedContactsSelectedId
  );
  const descriptionSearch = useSelector((state) => state.editMasterExpressTabsReducer.descriptionSearch);
  const bolContactNameSearch = useSelector(
    (state) => state.editMasterExpressTabsReducer.bolContactNameSearch
  );

  const isEqual = (a, b) => a != null && b != null && a === b;

  const isUseOnBOLSelected = assignedContacts?.some?.((contact) => contact.useOnBOL === true);

  //Single and Double Click handling of Assigned Contacts List
  const handleClickOfAssignedContactList = (customerContact, index, e) => {
    dispatch(setDisableNew(false));
    if (timerForAssignedContacts) {
      clearTimeout(timerForAssignedContacts);
      setTimerForAssignedContacts(null);
      //"double click";
      onDoubleClickAssignedContacts(customerContact, index, e);
    } else {
      setTimerForAssignedContacts(
        setTimeout(() => {
          //"single click";
          assignedContactsOnClick(customerContact, index, e);
          setTimerForAssignedContacts(null);
        }, 300)
      );
    }
  };

  const onDoubleClickAssignedContacts = (customerContact, index, event) => {
    dispatch(setDisableNew(false));
    if (event.target.id !== "useOnBOL" && event.target.id !== "delayContact") {
      if (!customerContact.frontendRecord && !isManuallyAddedRecord(customerContact)) {
        moveToTop(customerContact);
        // dispatch(filterAssignedContacts(customerContact.tempId));
        let filterData = assignedContacts.filter((contact) => contact.tempId !== customerContact.tempId);
        dispatch(setAssignedContacts(filterData));
      }
      clearForm();
      dispatch(setSelectedContact(null));
      dispatch(setAllContactsSelectedId(""));
      dispatch(setAssignedContactsSelectedId(""));
      dispatch(setselectedIndex(""));
      dispatch(setContactEditMode(false));
    }
  };

  const isManuallyAddedRecord = (customerContact) => {
    return (
      customerContact.unitAlternateContactPK &&
      !customerContact.alternateContactPK &&
      !customerContact.customerContactPK &&
      !customerContact.customerPlantContactPK &&
      !customerContact.dealerContactPK &&
      !customerContact.userContactFK
    );
  };

  const moveToTop = (selectedContact) => {
    const exist = availableContacts.some(
      (item) =>
        isEqual(item.tempId, selectedContact.tempId) ||
        isEqual(item.alternateContactPK, selectedContact.alternateContactPK)
    );
    if (exist) return;
    const desc = descriptionSearch?.trim();
    const bol = bolContactNameSearch?.trim();

    if (desc || bol) {
      dispatch(setBolContactNameSearch(""));
      dispatch(setDescriptionSearch(""));
      return;
    }

    dispatch(addToAvailabe(selectedContact));
  };

  const assignedContactsOnClick = (customerContact, index, event) => {
    dispatch(setDisableNew(false));
    dispatch(setIsManuallyAddedRecord(isManuallyAddedRecord(customerContact)));
    dispatch(setAssignedContactsSelectedId(customerContact.tempId));
    dispatch(setAllContactsSelectedId(""));
    dispatch(setselectedIndex(index));
    dispatch(setSelectedContact(customerContact));
    dispatch(setContactEditMode(false));
    dispatch(setDisableDelete(false));
    dispatch(setDisableEdit(false));
  };

  const clearForm = () => {
    dispatch(setContactDescription(""));
    dispatch(setBolContactName(""));
    dispatch(setBolContactPhone(""));
    dispatch(setContactEmail(""));
    dispatch(setBolFaxNumber(""));
  };

  return (
    <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
      <div className="d-flex h-100">
        <div className="w-100 border-2 border-right-0 border">
          <div
            className={`border border-secondary fixTableHead`}
            style={{ overflowY: "scroll", height: "255px", zIndex: "5" }}
          >
            <table className="table table-striped ">
              <thead>
                <tr disabled>
                  <th className={`col-3 ${styles.borderRightOrderEntry}`}>Description</th>
                  <th className={`col-3 ${styles.borderRightOrderEntry}`}>Name</th>
                  <th className={`col-3 ${styles.borderRightOrderEntry}`}>Use On BOL</th>
                  <th className={`col-3 ${styles.borderRightOrderEntry}`}>Delay Contact</th>
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
                  assignedContacts !== 0 &&
                  assignedContacts?.map((customerContact, index) => (
                    <tr
                      id="rowId"
                      key={customerContact.tempId}
                      onClick={(e) => !viewDetail && assignedContactsOnClick(customerContact, index, e)}
                      onDoubleClick={(e) =>
                        !viewDetail && onDoubleClickAssignedContacts(customerContact, index, e)
                      }
                      className={customerContact.tempId === assignedContactsSelectedId ? "tableSelected" : ""}
                    >
                      <td className="f-w-600">
                        {customerContact?.contact?.trim() || customerContact?.description?.trim()}
                      </td>
                      <td className="f-w-600">{customerContact.name?.trim()} </td>
                      <td className="f-w-600">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="useOnBOL"
                          name="useOnBOL"
                          disabled={viewDetail || (isUseOnBOLSelected && !customerContact.useOnBOL)}
                          checked={customerContact.useOnBOL}
                          onChange={(e) => {
                            dispatch(updateUseOnBOL(index));
                          }}
                        />
                      </td>
                      <td className="f-w-600">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="delayContact"
                          name="delayContact"
                          disabled={viewDetail}
                          checked={customerContact.delayContact}
                          onChange={(e) => dispatch(updateDelayContact(index))}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {loader
              ? ""
              : assignedContacts?.length === 0 && (
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

export default AssignedContactsListing;
