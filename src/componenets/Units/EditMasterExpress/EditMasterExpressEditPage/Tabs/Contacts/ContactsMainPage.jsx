import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import AvailableContactListing from "./AvailableContactListing";
import AssignedContactsListing from "./AssignedContactsListing";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import {
  setDescriptionSearch,
  setBolContactNameSearch,
  setContactDescription,
  setBolContactName,
  setBolContactPhone,
  setContactEmail,
  setBolFaxNumber,
  setDisableNew,
  setDisableDelete,
  setDisableEdit,
  setDisableSave,
  setContactEditMode,
  setSelectedContact,
  setAllContactsSelectedId,
  setAssignedContactsSelectedId,
  setselectedIndex,
  setFrontendRecord,
  setContactId,
  updateAssignedContactsElement,
  addToAssigned,
  filterAssignedContacts,
  setIsManuallyAddedRecord,
  setIsContactTabValid,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

function ContactsMainPage({ styles }) {
  const dispatch = useDispatch();

  //Local States
  const [formData, setFormData] = useState(null);

  /*** States From Redux***/
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const descriptionSearch = useSelector((state) => state.editMasterExpressTabsReducer.descriptionSearch);
  const bolContactNameSearch = useSelector(
    (state) => state.editMasterExpressTabsReducer.bolContactNameSearch
  );
  const contactDescription = useSelector((state) => state.editMasterExpressTabsReducer.contactDescription);
  const bolContactName = useSelector((state) => state.editMasterExpressTabsReducer.bolContactName);
  const bolContactPhone = useSelector((state) => state.editMasterExpressTabsReducer.bolContactPhone);
  const contactEmail = useSelector((state) => state.editMasterExpressTabsReducer.contactEmail);
  const bolFaxNumber = useSelector((state) => state.editMasterExpressTabsReducer.bolFaxNumber);
  const contactEditMode = useSelector((state) => state.editMasterExpressTabsReducer.contactEditMode);
  const disableNew = useSelector((state) => state.editMasterExpressTabsReducer.disableNew);
  const disableSave = useSelector((state) => state.editMasterExpressTabsReducer.disableSave);
  const frontendRecord = useSelector((state) => state.editMasterExpressTabsReducer.frontendRecord);
  const contactId = useSelector((state) => state.editMasterExpressTabsReducer.contactId);
  const selectedIndex = useSelector((state) => state.editMasterExpressTabsReducer.selectedIndex);
  const selectedContact = useSelector((state) => state.editMasterExpressTabsReducer.selectedContact);
  const assignedContacts = useSelector((state) => state.editMasterExpressTabsReducer.assignedContacts);
  const assignedContactsSelectedId = useSelector(
    (state) => state.editMasterExpressTabsReducer.assignedContactsSelectedId
  );
  const isManuallyAddedRecord = useSelector(
    (state) => state.editMasterExpressTabsReducer.isManuallyAddedRecord
  );

  const handleSaveButton = (e) => {
    //"SAVE assignedContactsSelectedId", assignedContactsSelectedId);
    if (assignedContacts.find((contact) => contact.tempId === assignedContactsSelectedId) !== undefined) {
      // EDIT EXISTING RECORD
      dispatch(
        updateAssignedContactsElement({
          tempId: contactId,
          frontendRecord: true,
          contact: contactDescription,
          name: bolContactName,
          phone: bolContactPhone.replace(/\s+/g, ""),
          email: contactEmail,
          bolFaxNumber: bolFaxNumber.replace(/\s+/g, ""),
          fax: bolFaxNumber.replace(/\s+/g, ""),
          selectedIndex,
        })
      );
    } else {
      // ADD NEW RECORD
      setFormData({
        tempId: contactId,
        frontendRecord: true,
        contact: contactDescription,
        name: bolContactName,
        phone: bolContactPhone.replace(/\s+/g, ""),
        email: contactEmail,
        fax: bolFaxNumber.replace(/\s+/g, ""),
        bolFaxNumber: bolFaxNumber.replace(/\s+/g, ""),
      });
      dispatch(setContactId(contactId + 1));
    }

    dispatch(setselectedIndex(""));
    dispatch(setAssignedContactsSelectedId(""));
    clearForm();
  };
  // Save record in frontend
  useEffect(() => {
    if (formData !== null) {
      dispatch(addToAssigned({ ...formData, useOnBOL: false, delayContact: false }));
      clearForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useEffect(() => {
    if (selectedContact !== null) {
      dispatch(
        setContactDescription(selectedContact?.contact?.trim() || selectedContact?.description?.trim() || "")
      );
      dispatch(setBolContactName(selectedContact?.name?.trim() || ""));
      dispatch(setBolContactPhone(formatPhoneNumber(selectedContact.phone) || ""));
      dispatch(setContactEmail(selectedContact?.email?.trim() || ""));
      dispatch(
        setBolFaxNumber(
          formatPhoneNumber(selectedContact.bolFaxNumber) || formatPhoneNumber(selectedContact.fax) || ""
        )
      );
      if (selectedContact.frontendRecord) {
        dispatch(setFrontendRecord(selectedContact.frontendRecord));
      } else {
        dispatch(setFrontendRecord(false));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedContact]);

  useEffect(() => {
    if (
      bolContactName !== "" &&
      bolContactPhone !== "" &&
      bolContactPhone.match(phoneRegex) &&
      contactEmail !== "" &&
      contactEmail.match(emailRegex) &&
      (bolFaxNumber === "" || bolFaxNumber.match(phoneRegex))
    ) {
      dispatch(setDisableSave(true));
    } else {
      dispatch(setDisableSave(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bolContactName, bolContactPhone, contactEmail, bolFaxNumber]);

  //validation
  const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/gm;
  const emailRegex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-])*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setBolContactPhone(formattedPhoneNumber));
  };

  const faxNumberFormatHandler = (e) => {
    const formattedFAXNumber = formatPhoneNumber(e.target.value);
    dispatch(setBolFaxNumber(formattedFAXNumber));
  };

  const clearForm = () => {
    dispatch(setContactDescription(""));
    dispatch(setBolContactName(""));
    dispatch(setBolContactPhone(""));
    dispatch(setContactEmail(""));
    dispatch(setBolFaxNumber(""));
  };

  /**** Tab Validation - Contacts Tab ****/
  useEffect(() => {
    if (
      contactEditMode &&
      bolContactName !== "" &&
      bolContactPhone !== "" &&
      bolContactPhone.match(phoneRegex) &&
      contactEmail !== "" &&
      contactEmail.match(emailRegex) &&
      (bolFaxNumber === "" || bolFaxNumber.match(phoneRegex))
    ) {
      dispatch(setIsContactTabValid(true));
    } else {
      dispatch(setIsContactTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactEditMode, bolContactName, bolContactPhone, contactEmail, bolFaxNumber]);

  return (
    <div className="p-1 ps-2">
      {/* Available Contacts */}
      <p className="pb-0 mb-0">Available Contacts</p>
      <Row>
        <Col xs={6}>
          <Row className="mb-2">
            {/* Description */}
            <Col xs={6}>
              <Form.Group className="mt-3 align-items-center   m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label className={`customColFormLabel mb-1`}>Description</Form.Label>
                </Col>
                <Col xs={12} className="p-0 h-100">
                  <input
                    className={`customFormControl`}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    maxLength={25}
                    disabled={viewDetail}
                    value={descriptionSearch}
                    onInput={(e) => {
                      let value = e.target.value;
                      if (value !== "") {
                        if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                          value = value.substring(1);
                        }
                      }
                      dispatch(setDescriptionSearch(value));
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>
            {/**********************/}
            {/* BOL Contact Name */}
            <Col xs={5}>
              <Form.Group className="mt-3 align-items-center   m-l-0 m-r-0 ms-0">
                <Col sm={5} md={5} xs={5} className="p-0">
                  <Form.Label className={`customColFormLabel mb-1`}>BOL Contact Name</Form.Label>
                </Col>
                <Col xs={12} className="p-0 h-100">
                  <input
                    className={`customFormControl`}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    maxLength={30}
                    disabled={viewDetail}
                    value={bolContactNameSearch}
                    onInput={(e) => {
                      let value = e.target.value;
                      if (value !== "") {
                        if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                          value = value.substring(1);
                        }
                      }
                      dispatch(setBolContactNameSearch(value));
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          {/**********************/}
          {/* Available Contacts List*/}
          <AvailableContactListing />
        </Col>
        <Col xs={6}>
          <Form.Group className="mt-3 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={3} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          {/* Description */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Description</Form.Label>
            </Col>
            <Col xs={7} className="p-0">
              <input
                className={`customFormControl `}
                name="contactDescription"
                type="search"
                value={contactDescription}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  dispatch(setContactDescription(value));
                }}
                disabled={!contactEditMode}
              />
            </Col>
          </Form.Group>
          {/* BOL Contact Name */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>BOL Contact Name</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <input
                className={`customFormControl     ${
                  !contactEditMode ? "black" : bolContactName === "" ? "borderRed" : "borderGreen"
                }`}
                name="bolContactName"
                type="search"
                value={bolContactName}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  dispatch(setBolContactName(value));
                }}
                disabled={!contactEditMode}
              />
            </Col>
          </Form.Group>
          {/* BOL Contact Phone */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>BOL Contact Phone</Form.Label>
            </Col>
            <Col xs={2} className="p-0">
              <input
                className={`customFormControl  ${
                  !contactEditMode
                    ? "black"
                    : bolContactPhone === "" || !bolContactPhone.match(phoneRegex)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                name="bolContactPhone"
                type="search"
                value={bolContactPhone}
                maxLength={14}
                onChange={(e) => phoneFormatHandler(e)}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  dispatch(setBolContactPhone(e.target.value));
                }}
                disabled={!contactEditMode}
              />
            </Col>
          </Form.Group>
          {/* Email */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Email</Form.Label>
            </Col>
            <Col xs={8} className="p-0">
              <input
                className={`customFormControl  ${
                  !contactEditMode
                    ? "black"
                    : contactEmail === "" || !contactEmail.match(emailRegex)
                      ? "borderRed"
                      : "borderGreen"
                }`}
                name="contactEmail"
                type="search"
                value={contactEmail}
                maxLength={70}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^\s/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  dispatch(setContactEmail(value));
                }}
                disabled={!contactEditMode}
              />
            </Col>
          </Form.Group>
          {/* BOL FAX Number */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>BOL FAX Number</Form.Label>
            </Col>
            <Col xs={2} className="p-0">
              <input
                className={`customFormControl  ${
                  !contactEditMode
                    ? "black"
                    : bolFaxNumber === ""
                      ? ""
                      : !bolFaxNumber.match(phoneRegex)
                        ? "borderRed"
                        : ""
                }`}
                name="bolFaxNumber"
                type="search"
                value={bolFaxNumber}
                maxLength={30}
                onChange={(e) => faxNumberFormatHandler(e)}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  dispatch(setBolFaxNumber(e.target.value));
                }}
                disabled={!contactEditMode}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      {/* Assigned Contacts List*/}
      <Row className="mt-2">
        <p className="pb-0 mb-0">Assigned Contacts</p>
        <Col xs={7}>
          <AssignedContactsListing styles={styles} />
        </Col>
        <div className="col-5 d-flex flex-column align-items-end">
          <Form.Group className="mt-3 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col xs={3} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col xs={3} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
          <span className="p-1">
            <button
              className="btn btn-secondary font-12 btn-sm btn-medium-with"
              type="button"
              onClick={() => {
                dispatch(setDisableNew(true));
                clearForm();
                dispatch(setContactEditMode(true));
                dispatch(setDisableEdit(true));
                dispatch(setDisableDelete(true));
                dispatch(setSelectedContact(null));
                dispatch(setAllContactsSelectedId(""));
                dispatch(setAssignedContactsSelectedId(""));
                dispatch(setselectedIndex(""));
              }}
              disabled={disableNew || viewDetail}
            >
              New
            </button>
          </span>

          <span className="p-1">
            <button
              className="btn btn-secondary font-12 btn-sm btn-medium-with"
              type="button"
              onClick={() => {
                if (frontendRecord || isManuallyAddedRecord) {
                  dispatch(setContactEditMode(true));
                  dispatch(setDisableNew(true));
                } else {
                  dispatch(setContactEditMode(false));
                }
              }}
              disabled={
                (!frontendRecord && !isManuallyAddedRecord) ||
                contactEditMode ||
                viewDetail ||
                assignedContactsSelectedId === ""
              }
            >
              Edit
            </button>
          </span>
          <span className="p-1">
            <button
              className="btn btn-secondary font-12 btn-sm btn-medium-with"
              type="button"
              onClick={() => {
                handleSaveButton();
                dispatch(setContactEditMode(false));
                dispatch(setDisableNew(false));
                dispatch(setSelectedContact(null));
              }}
              disabled={!disableSave || !contactEditMode}
            >
              Save
            </button>
          </span>
          <span className="p-1">
            <button
              className="btn btn-secondary font-12 btn-sm btn-medium-with"
              type="button"
              onClick={() => {
                dispatch(setContactEditMode(false));
                dispatch(setDisableNew(false));
                dispatch(setFrontendRecord(false));
                dispatch(setIsManuallyAddedRecord(false));
                clearForm();
                dispatch(setSelectedContact(null));
                dispatch(setAllContactsSelectedId(""));
                dispatch(setAssignedContactsSelectedId(""));
                dispatch(setselectedIndex(""));
              }}
              disabled={!contactEditMode || viewDetail}
            >
              Cancel
            </button>
          </span>
          <span className="p-1">
            <button
              className="btn btn-secondary font-12 btn-sm btn-medium-with"
              type="button"
              disabled={
                (!frontendRecord && !isManuallyAddedRecord) ||
                contactEditMode ||
                viewDetail ||
                assignedContactsSelectedId === ""
              }
              onClick={() => {
                if (assignedContactsSelectedId) {
                  dispatch(filterAssignedContacts(assignedContactsSelectedId));
                  clearForm();
                  dispatch(setAssignedContactsSelectedId(""));
                }
              }}
            >
              Delete
            </button>
          </span>
        </div>
      </Row>
    </div>
  );
}

export default ContactsMainPage;
