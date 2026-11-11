import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import { useDispatch, useSelector } from "react-redux";
import OrderEntryService from "../../../../../services/OrderEntryService";
import {
  setContactId,
  addToAssigned,
  addToAvailabe,
  filterAssignedContacts,
  filterAvailableContacts,
  setAvailableContacts,
  updateAssignedContactsElement,
  updateDelayContact,
  updateUseOnBOL,
  setActiveKey,
  setAssignedContacts,
} from "../../../../../redux/OrderEntryFilterSlice";

function Contacts({ styles }) {
  const [descriptionSearch, setDescriptionSearch] = useState("");
  const [bolContactNameSearch, setBolContactNameSearch] = useState("");
  const [description, setDescription] = useState("");
  const [bolContactName, setBolContactName] = useState("");
  const [bolContactPhone, setBolContactPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bolFaxNumber, setBolFaxNumber] = useState("");
  const [formData, setFormData] = useState(null);
  const [allContactsSelectedId, setAllContactsSelectedId] = useState("");
  const [assignedContactsSelectedId, setAssignedContactsSelectedId] = useState("");
  const [frontendRecord, setFrontendRecord] = useState(false);
  const [contactEditMode, setContactEditMode] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedIndex, setselectedIndex] = useState("");

  const [disableNew, setDisableNew] = useState(false);
  const [disableDelete, setDisableDelete] = useState(true);
  const [disableEdit, setDisableEdit] = useState(true);
  const [disableSave, setDisableSave] = useState(false);

  const contactId = useSelector((state) => state.orderEntryReducer.contactId);
  const selectedCustomerID = useSelector((state) => state.orderEntryReducer.selectedCustomerId);
  const availableContacts = useSelector((state) => state.orderEntryReducer.availableContacts);
  const assignedContacts = useSelector((state) => state.orderEntryReducer.assignedContacts);
  const selectedCustomerBillingPlantId = useSelector(
    (state) => state.orderEntryReducer.selectedCustomerBillingPlantId
  );
  const deliveryCustomerPlantId = useSelector((state) => state.orderEntryReducer.deliveryCustomerPlantId);
  const pickupCustomerPlantId = useSelector((state) => state.orderEntryReducer.pickupCustomerPlantId);
  const pickupDealersFK = useSelector((state) => state.orderEntryReducer.pickupDealersFK);
  const deliveryDealersFK = useSelector((state) => state.orderEntryReducer.deliveryDealersFK);
  const [loader, setLoader] = useState(true);

  //validation
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;

  const dispatch = useDispatch();

  const [timer, setTimer] = useState(null);
  const [timerForAssignedContacts, setTimerForAssignedContacts] = useState(null);

  //Single and Double Click handling of Available Contacts List
  const handleClickOfAvailableContactList = (customerContact) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
      //"double click";
      onDoubleClickAvailableContacts(customerContact);
      setAllContactsSelectedId("");
      setselectedIndex("");
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

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);

    setBolContactPhone(formattedPhoneNumber);
  };

  const faxNumberFormatHandler = (e) => {
    const formattedFAXNumber = formatPhoneNumber(e.target.value);
    setBolFaxNumber(formattedFAXNumber);
  };

  const fetchCustomerContactsDetails = async () => {
    await OrderEntryService.fetchCustomerContactsDetails(
      selectedCustomerID,
      selectedCustomerBillingPlantId,
      deliveryCustomerPlantId,
      pickupCustomerPlantId,
      pickupDealersFK,
      deliveryDealersFK
    )
      .then((response) => {
        const data = response.data;

        const assignedContactsId = assignedContacts?.map((ac) => ac.tempId); // extract id from assignedContacts
        const newAvailableContacts = data?.filter((av) => !assignedContactsId.includes(av.tempId));

        dispatch(setAvailableContacts(newAvailableContacts));
        let listSize = newAvailableContacts.length;
        dispatch(setContactId(listSize + 1));
        setLoader(false);
      })
      .catch((err) => console.log(err));
  };

  const fetchCustomerContactsDetailsBasedOnFilter = () => {
    OrderEntryService.fetchCustomerContactsDetailsBasedOnFilter(
      selectedCustomerID,
      descriptionSearch,
      bolContactNameSearch
    )
      .then((response) => {
        const { data } = response;
        if (data === "") {
          dispatch(setAvailableContacts([]));
        } else {
          const assignedContactsId = assignedContacts?.map((ac) => ac.tempId); // extract id from assignedContacts
          const newAvailableContacts = data?.filter((av) => !assignedContactsId.includes(av.tempId));
          dispatch(setAvailableContacts(newAvailableContacts));
        }
      })
      .catch((err) => console.log(err));
  };

  const moveToBottom = (id) => {
    let selectedContact = availableContacts.find((contact) => contact.tempId === id);
    dispatch(
      addToAssigned({
        ...selectedContact,
        useOnBOL: false,
        delayContact: false,
      })
    );
  };
  const moveToTop = (id) => {
    let selectedContact = assignedContacts.find((contact) => contact.tempId === id);
    dispatch(addToAvailabe(selectedContact));
  };

  const availableContactsOnClick = (customerContact) => {
    setAllContactsSelectedId(customerContact.tempId);
    setAssignedContactsSelectedId("");
    setSelectedContact(customerContact);
    setContactEditMode(false);
    setDisableDelete(true);
    setDisableEdit(true);
  };

  const onDoubleClickAvailableContacts = (customerContact) => {
    moveToBottom(customerContact.tempId);
    dispatch(filterAvailableContacts(customerContact.tempId));
    clearForm();
    setContactEditMode(false);

    setAssignedContactsSelectedId("");
    setselectedIndex("");
  };

  //Single and Double Click handling of Assigned Contacts List
  const handleClickOfAssignedContactList = (customerContact, index, e) => {
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

  const assignedContactsOnClick = (customerContact, index, event) => {
    setAssignedContactsSelectedId(customerContact.tempId);
    setAllContactsSelectedId("");
    setselectedIndex(index);
    setSelectedContact(customerContact);

    setContactEditMode(false);
    setDisableDelete(false);
    setDisableEdit(false);
  };

  const onDoubleClickAssignedContacts = (customerContact, index, event) => {
    if (event.target.id !== "useOnBOL" && event.target.id !== "delayContact") {
      if (!customerContact.frontendRecord) {
        moveToTop(customerContact.tempId);
        dispatch(filterAssignedContacts(customerContact.tempId));
      }
      clearForm();

      setSelectedContact(null);
      setAllContactsSelectedId("");
      setAssignedContactsSelectedId("");
      setselectedIndex("");

      setContactEditMode(false);
    }
  };

  const handleSaveButton = (e) => {
    //"SAVE assignedContactsSelectedId", assignedContactsSelectedId);
    let arrayElement = assignedContacts.find((contact) => contact.id === assignedContactsSelectedId);
    //"assignedContacts", assignedContacts);
    //"arrayElement", arrayElement);

    if (assignedContacts.find((contact) => contact.tempId === assignedContactsSelectedId) !== undefined) {
      // EDIT EXISTING RECORD
      dispatch(
        updateAssignedContactsElement({
          tempId: contactId,
          frontendRecord: true,
          contact: description,
          name: bolContactName,
          phone: bolContactPhone,
          email: email,
          bolFaxNumber: bolFaxNumber,
          selectedIndex,
        })
      );
    } else {
      // ADD NEW RECORD
      setFormData({
        tempId: contactId,
        frontendRecord: true,
        contact: description,
        name: bolContactName,
        phone: bolContactPhone,
        email: email,
        fax: bolFaxNumber.replace(/\s+/g, ""),
      });
      dispatch(setContactId(contactId + 1));
    }

    setselectedIndex("");
    setAssignedContactsSelectedId("");
    clearForm();
  };

  const clearForm = () => {
    setDescription("");
    setBolContactName("");
    setBolContactPhone("");
    setEmail("");
    setBolFaxNumber("");
  };

  useEffect(() => {
    if (selectedCustomerID !== null) {
      if (descriptionSearch !== "" || bolContactNameSearch !== "") {
        fetchCustomerContactsDetailsBasedOnFilter();
      } else {
        fetchCustomerContactsDetails();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedCustomerID,
    selectedCustomerBillingPlantId,
    deliveryCustomerPlantId,
    pickupCustomerPlantId,
    pickupDealersFK,
    deliveryDealersFK,
    descriptionSearch,
    bolContactNameSearch,
  ]);

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
      setDescription(selectedContact.contact || "");
      setBolContactName(selectedContact.name || "");
      setBolContactPhone(selectedContact.phone || "");
      setEmail(selectedContact.email || "");
      setBolFaxNumber(formatPhoneNumber(selectedContact.fax) || "");
      if (selectedContact.frontendRecord) {
        setFrontendRecord(selectedContact.frontendRecord);
      } else {
        setFrontendRecord(false);
      }
    }
  }, [selectedContact]);

  useEffect(() => {
    if (
      // !contactEditMode
      bolContactName !== "" &&
      bolContactPhone !== "" &&
      bolContactPhone.match(phoneRegex) &&
      email !== "" &&
      email.match(emailRegex) &&
      (bolFaxNumber === "" || bolFaxNumber.match(phoneRegex))
    ) {
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bolContactName, bolContactPhone, email, disableSave, bolFaxNumber]);

  useEffect(() => {
    dispatch(setAssignedContacts([]));
    clearForm();
    setAllContactsSelectedId("");
  }, [selectedCustomerID]);

  return (
    <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
      <div className={`px-2 `}>
        <p className="mt-3 ">Available Contacts</p>

        <Row>
          <Col xs={12} sm={12} md={12} className="p-0">
            <Row className="m-0">
              <Col className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                {/* Search Filter */}
                <Form.Group className=" my-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={6} md={6} xs={6} className="">
                    <Form.Label htmlFor="name" className={`col-form-label dealer-label  `}>
                      Description
                    </Form.Label>

                    <input
                      className={`customFormControl `}
                      id="name"
                      name="name"
                      type="text"
                      value={descriptionSearch}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setDescriptionSearch(e.target.value);
                      }}
                    />
                  </Col>

                  <Col sm={6} md={6} xs={6} className="">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label ">
                      BOL Contact Name
                    </Form.Label>

                    <input
                      className={`customFormControl `}
                      id="name"
                      name="name"
                      type="text"
                      value={bolContactNameSearch}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => setBolContactNameSearch(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                {/* All Contacts Table */}
                <div
                  className={`border border-secondary fixTableHead ${styles.plantNameTable}`}
                  style={{ overflowY: "scroll", height: "290px" }}
                >
                  <table className="table border-bottom  table-striped f-w-600">
                    <thead>
                      <tr>
                        <th className={`col-6  ${styles.borderRightOrderEntry}`}>Description</th>

                        <th className="col-6">Name</th>
                      </tr>
                    </thead>
                    {loader
                      ? ""
                      : availableContacts !== 0 && (
                          <tbody>
                            {availableContacts.map((customerContact) => (
                              <tr
                                id="rowId"
                                key={customerContact.tempId}
                                onClick={() => handleClickOfAvailableContactList(customerContact)}
                                className={
                                  customerContact.tempId === allContactsSelectedId ? "tableSelected" : ""
                                }
                              >
                                <td className="f-w-600"> {customerContact.contact} </td>
                                <td className="f-w-600"> {customerContact.name} </td>
                              </tr>
                            ))}
                          </tbody>
                        )}
                  </table>
                  {loader
                    ? ""
                    : availableContacts == 0 && (
                        <p className="pt-3" align="center" style={{ fontSize: "0.8rem" }}>
                          No Records Available
                        </p>
                      )}
                </div>
              </Col>

              <Col xs={1} sm={1} md={1} />

              {/* Contact Input fields */}
              <Col className="p-l-40 col-lg-5 col-md-5 col-sm-5 col-xs-5">
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="">
                    <Form.Label htmlFor="name" className={`customColFormLabel w-100`}>
                      Description
                    </Form.Label>
                  </Col>

                  <Col sm={6} md={6} xs={6} className="p-0">
                    <input
                      className={`customFormControl `}
                      id="description"
                      name="description"
                      type="search"
                      value={description}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setDescription(e.target.value);
                      }}

                      disabled={!contactEditMode}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="">
                    <Form.Label htmlFor="bolContactName" className={` customColFormLabel w-100 `}>
                      BOL Contact Name
                    </Form.Label>
                  </Col>

                  <Col sm={6} md={6} xs={6} className="p-0">
                    <input
                      className={`customFormControl     ${
                        !contactEditMode ? "black" : bolContactName === "" ? "borderRed" : "borderGreen"
                      }`}
                      id="bolContactName"
                      name="bolContactName"
                      type="search"
                      value={bolContactName}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setBolContactName(e.target.value);
                      }}
                      disabled={!contactEditMode}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="">
                    <Form.Label htmlFor="bolContactPhone" className={` customColFormLabel w-100 `}>
                      BOL Contact Phone
                    </Form.Label>
                  </Col>

                  <Col sm={3} md={3} xs={3} className="p-0 w-105px">
                    <input
                      className={`customFormControl  ${
                        !contactEditMode
                          ? "black"
                          : bolContactPhone === "" || !bolContactPhone.match(phoneRegex)
                            ? "borderRed"
                            : "borderGreen"
                      }`}
                      id="bolContactPhone"
                      name="bolContactPhone"
                      type="search"
                      value={bolContactPhone}
                      maxLength={14}
                      onChange={(e) => phoneFormatHandler(e)}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setBolContactPhone(e.target.value);
                      }}
                      disabled={!contactEditMode}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="">
                    <Form.Label htmlFor="name" className={` customColFormLabel w-100 `}>
                      Email
                    </Form.Label>
                  </Col>

                  <Col sm={7} md={7} xs={7} className="p-0">
                    <input
                      className={`customFormControl  ${
                        !contactEditMode
                          ? "black"
                          : email === "" || !email.match(emailRegex)
                            ? "borderRed"
                            : "borderGreen"
                      }`}
                      id="email"
                      name="email"
                      type="search"
                      value={email}
                      maxLength={60}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setEmail(e.target.value);
                      }}
                      disabled={!contactEditMode}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="">
                    <Form.Label htmlFor="bolFaxNumber" className={` customColFormLabel w-100 `}>
                      BOL FAX Number
                    </Form.Label>
                  </Col>

                  <Col sm={3} md={3} xs={3} className="p-0 w-105px">
                    <input
                      className={`customFormControl  ${
                        !contactEditMode
                          ? "black"
                          : bolFaxNumber === ""
                            ? ""
                            : !bolFaxNumber.match(phoneRegex)
                              ? "borderRed"
                              : "borderGreen"
                      }`}
                      id="bolFaxNumber"
                      name="bolFaxNumber"
                      type="search"
                      value={bolFaxNumber}
                      maxLength={30}
                      onChange={(e) => faxNumberFormatHandler(e)}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setBolFaxNumber(e.target.value);
                      }}
                      disabled={!contactEditMode}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Col>

          {/* Assigned Contacts Table */}
          <Col xs={7} sm={7} md={7} lg={7} className="">
            <p className="mt-3 ">Email Recipients</p>
            <div
              className={`border border-secondary ${styles.plantNameTable}`}
              style={{ overflowY: "scroll", height: "290px" }}
            >
              <table className="table border-bottom  table-striped f-w-600">
                <thead>
                  <tr>
                    <th className={`col-3 ${styles.borderRightOrderEntry}`}>Description</th>
                    <th className={`col-3 ${styles.borderRightOrderEntry}`}>Name</th>
                    <th className={`col-3 ${styles.borderRightOrderEntry}`}>Use On BOL</th>
                    <th className={`col-3 ${styles.borderRightOrderEntry}`}>Delay Contact</th>
                  </tr>
                </thead>
                {loader
                  ? ""
                  : assignedContacts != 0 && (
                      <tbody>
                        {assignedContacts?.map((customerContact, index) => (
                          <tr
                            id="rowId"
                            key={customerContact.tempId}

                            onClick={(e) => handleClickOfAssignedContactList(customerContact, index, e)}
                            className={
                              customerContact.tempId === assignedContactsSelectedId ? "tableSelected" : ""
                            }
                          >
                            <td className="f-w-600"> {customerContact.contact} </td>
                            <td className="f-w-600"> {customerContact.name} </td>
                            <td className="f-w-600">
                              <input
                                type="checkbox"
                                className="form-check-input p-0"
                                id="useOnBOL"
                                name="useOnBOL"
                                checked={customerContact.useOnBOL}
                                onChange={(e) => dispatch(updateUseOnBOL(index))}
                              />
                            </td>
                            <td className="f-w-600">
                              <input
                                type="checkbox"
                                className="form-check-input p-0"
                                id="delayContact"
                                name="delayContact"
                                checked={customerContact.delayContact}
                                onChange={(e) => dispatch(updateDelayContact(index))}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
              </table>
              {loader
                ? ""
                : assignedContacts == 0 && (
                    <p className="pt-3" align="center" style={{ fontSize: "0.8rem" }}>
                      No Records Available
                    </p>
                  )}
            </div>
          </Col>

          <Col xs={3} sm={3} md={3} lg={3} style={{ marginLeft: "55px" }}>
            <div className="d-flex justify-content-end h-100">
              <div className="d-flex flex-column justify-content-center">
                <span className="p-1">
                  <button
                    className="btn btn-secondary font-12 btn-sm btn-medium-with"
                    type="button"
                    onClick={() => {
                      setDisableNew(true);
                      clearForm();

                      setContactEditMode(true);
                      setDisableEdit(true);
                      setDisableDelete(true);

                      setSelectedContact(null);
                      setAllContactsSelectedId("");
                      setAssignedContactsSelectedId("");
                      setselectedIndex("");
                    }}
                    disabled={disableNew}
                  >
                    New
                  </button>
                </span>
                <span className="p-1">
                  <button
                    className="btn btn-secondary font-12 btn-sm btn-medium-with"
                    type="button"
                    onClick={() => {
                      if (frontendRecord) {
                        setContactEditMode(true);
                        setDisableNew(true);
                      } else {
                        setContactEditMode(false);
                      }
                    }}
                    disabled={!frontendRecord || contactEditMode}
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
                      setContactEditMode(false);
                      setDisableNew(false);
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
                      setContactEditMode(false);
                      setDisableNew(false);
                      setFrontendRecord(false);
                      clearForm();
                      setSelectedContact(null);
                      setAllContactsSelectedId("");
                      setAssignedContactsSelectedId("");
                      setselectedIndex("");
                    }}
                    disabled={!contactEditMode}
                  >
                    Cancel
                  </button>
                </span>

                <span className="p-1">
                  <button
                    className="btn btn-secondary font-12 btn-sm btn-medium-with"
                    type="button"
                    disabled={!frontendRecord || contactEditMode}
                    onClick={() => {
                      if (assignedContactsSelectedId) {
                        dispatch(filterAssignedContacts(assignedContactsSelectedId));

                        clearForm();
                      }
                    }}
                  >
                    Delete
                  </button>
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Contacts;
