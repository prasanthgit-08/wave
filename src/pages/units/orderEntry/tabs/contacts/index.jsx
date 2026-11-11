import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import TextArea from "../../../../../components/common/textArea";
import { useFormContext } from "react-hook-form";
import { setOrderEntrySchemaConditions } from "../../../../../store/slices/unit.slice";
import { useDispatch, useSelector } from "react-redux";
import CommonTable from "../../../../../components/common/commonTable";
import Input from "../../../../../components/common/input";
import useContacts from "./useContacts";
import CustomButton from "../../../../../components/common/button";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";

const Contacts = ({ styles }) => {
  const { watch, setValue, trigger, getValues, control } = useFormContext();
  const {
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
  } = useContacts();

  //validation
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);

    setPhone(formattedPhoneNumber);
  };
  const faxNumberFormatHandler = (e) => {
    const formattedFAXNumber = formatPhoneNumber(e.target.value);
    setFax(formattedFAXNumber);
  };
  return (
    <div className={`px-4 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight} border-bottom `}>
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
                      value={searchDescription}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setSearchDescription(e.target.value);
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
                      value={searchName}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setSearchName(e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Col xs={12} className={"h-285px ps-0"}>
                  {/* Customer Table */}
                  <div className="d-flex h-100">
                    <div className="w-1000">
                      <div
                        className="border border-secondary h-100 "
                        style={{
                          padding: "0",
                          height: "276px",
                          overflowY: "scroll",
                        }}
                      >
                        <CommonTable
                          id={"tempId"}
                          selecedId={watch("contact.tempId")}
                          disabledHead={true}
                          loading={contactLoading}
                          listingData={availableContacts}
                          columns={[
                            { label: "Contact", key: "contact", className: "col-7" },
                            { label: "Name", key: "name", className: "col-4" },
                          ]}
                          doubleClickSelection={(row) => {
                            handleMoveToBottom(row);
                          }}
                          handleSelect={(row) => {
                            handleContactselection(row);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
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
                      id="name"
                      name="name"
                      type="text"
                      disabled={!editMode}
                      value={contact}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setContact(e.target.value);
                      }}
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
                        !editMode ? "black" : name === "" ? "borderRed" : "borderGreen"
                      }`}
                      id="name"
                      disabled={!editMode}
                      name="name"
                      type="text"
                      value={name}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setName(e.target.value);
                      }}
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
                        !editMode
                          ? "black"
                          : phone === "" || !phone.match(phoneRegex)
                            ? "borderRed"
                            : "borderGreen"
                      }`}
                      id="name"
                      disabled={!editMode}
                      name="name"
                      onChange={(e) => phoneFormatHandler(e)}
                      type="text"
                      value={phone}
                      maxLength={14}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setPhone(e.target.value);
                      }}
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
                        !editMode ? "black" : email === "" || !email.match(emailRegex) ? "borderRed" : "black"
                      }`}
                      id="name"
                      name="name"
                      disabled={!editMode}
                      type="text"
                      value={email}
                      maxLength={60}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setEmail(e.target.value);
                      }}
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
                        !editMode
                          ? "black"
                          : fax === ""
                            ? ""
                            : fax && fax.match(phoneRegex)
                              ? "black"
                              : "borderRed"
                      }`}
                      onChange={(e) => faxNumberFormatHandler(e)}
                      id="name"
                      name="name"
                      type="text"
                      value={fax}
                      maxLength={14}
                      disabled={!editMode}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        setFax(e.target.value);
                      }}
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

                <tbody>
                  {assignedContacts?.map((customerContact, index) => (
                    <tr
                      id="rowId"
                      key={customerContact.tempId}
                      onClick={() => handleClickNew(customerContact, index)}
                      onDoubleClick={() => handleDoubleClickMoveBottomToTop(customerContact, index)}
                      className={selectedIndex === index ? "tableSelected" : ""}
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
                          onChange={(e) => toggleUseOnBol(index, e.target.checked)}
                          disabled={assignedContacts.some((c) => c.useOnBol) && !customerContact.useOnBol}
                        />
                      </td>
                      <td className="f-w-600">
                        <input
                          type="checkbox"
                          className="form-check-input p-0"
                          id="delayContact"
                          name="delayContact"
                          checked={customerContact.delayContact}
                          onChange={(e) => toggleDelayContact(index, e.target.checked)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {assignedContacts == 0 && (
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
                    onClick={() => {
                      setEditMode(true);
                      handleClearRecord();
                      setSelectedIndex(null);
                    }}
                    disabled={editMode}
                  >
                    New
                  </button>
                </span>
                <span className="p-1">
                  <button
                    className="btn btn-secondary font-12 btn-sm btn-medium-with"
                    label="Edit"
                    onClick={() => {
                      setEditMode(true);
                    }}
                    disabled={selectedIndex === null || editMode || !frontendRecord}
                  >
                    Edit
                  </button>
                </span>

                <span className="p-1">
                  <button
                    className="btn btn-secondary font-12 btn-sm btn-medium-with"
                    label="Save"
                    disabled={!disableSave || !editMode}
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </span>

                <span className="p-1">
                  <button
                    className="btn btn-secondary font-12 btn-sm btn-medium-with"
                    label="Cancel"
                    onClick={() => {
                      handleClearRecord();
                      setEditMode(false);
                      setSelectedIndex(null);
                    }}
                    disabled={!editMode}
                  >
                    Cancel
                  </button>
                </span>

                <span className="p-1">
                  <button
                    className="btn btn-secondary font-12 btn-sm btn-medium-with"
                    label="Delete"
                    onClick={() => {
                      handleDelete();
                    }}
                    disabled={selectedIndex === null || editMode || !frontendRecord}
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
};

export default Contacts;
