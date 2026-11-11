import { t } from "i18next";
import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import {
  setContact,
  setName,
  setPosition,
  setPhone,
  setFax,
  setEmail,
  setBirthday,
  setCallback,
  setLastCall,
  setEditMode,
  setContactExist,
  setNote,
  setContactExistData,
  setIsBirtdayValid,
  setIsLastCallValid,
  setIsCallBackValid,
} from "../../../../redux/DealerContacts";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DealerContacts from "../../../../services/DealerContacts";
import { useState } from "react";
import DateInputField from "../../../common/DateInputField";

function DealerContactContent() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const pagenum = params.pageNumber;
  const dcfk = params.dcfk;
  const id = params.id;
  const [load, setLoad] = useState(false);

  const contactExistData = useSelector((state) => state.dealerContacts.contactExistData);
  const isBirtdayValid = useSelector((state) => state.dealerContacts.isBirtdayValid);
  const isCallBackValid = useSelector((state) => state.dealerContacts.isCallBackValid);
  const isLastCallValid = useSelector((state) => state.dealerContacts.isLastCallValid);
  const phoneRegex = /^\([\d]{3}\)[\d]{3}-[\d]{4}$/gm;

  const {
    contact,
    name,
    position,
    phone,
    fax,
    email,
    birthday,
    callback,
    lastcall,
    note,
    editMode,
    contactExist,
    viewDetail,
  } = useSelector((state) => state.dealerContacts);

  window.addEventListener("popstate", () => {
    dispatch(setContactExist(false));
    dispatch(setContactExistData(""));
  });
  const phoneReplace = (value) => {
    if (!value) return value;

    const phoneNumber = value.replace(/[^\d]/g, "");

    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;

    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    return `(${phoneNumber.slice(0, 3)})${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  useEffect(() => {
    if (dcfk) {
      setLoad(true);
      dispatch(setEditMode(false));
      dispatch(setContactExist(false));

      DealerContacts.getDealerContacts(dcfk)
        .then((res) => {
          const data = res.data;

          dispatch(setContact(data.contact));
          dispatch(setName(data.name));
          dispatch(setPhone(data.phone));
          dispatch(setPosition(data.position));
          dispatch(setFax(data.fax));
          dispatch(setEmail(data.email));
          dispatch(setBirthday(data.birthday));
          dispatch(setCallback(data.callback));
          dispatch(setLastCall(data.lastcall));
          dispatch(setNote(data.notes));
          setLoad(false);
        })
        .catch((err) => {
          console.log(err);
          setLoad(false);
          navigation("/dealer-contacts/" + id + "/" + pagenum);
        });
    } else {
      dispatch(setEditMode(true));
      dispatch(setContact(""));
      dispatch(setName(""));
      dispatch(setPhone(""));
      dispatch(setPosition(""));
      dispatch(setFax(""));
      dispatch(setEmail(""));
      dispatch(setBirthday(""));
      dispatch(setCallback(""));
      dispatch(setLastCall(""));
      dispatch(setNote(""));
    }
  }, [dcfk]);

  const checkContactHandler = (contact) => {
    //let data = e.target.value;
    DealerContacts.checkContactExist(id, dcfk, contact)
      .then((res) => {
        if (res.data) {
          dispatch(setContactExist(true));
          dispatch(setContactExistData(res.data));
        } else {
          dispatch(setContactExist(false));
          dispatch(setContactExistData(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row>
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-start row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 text-start">
                    <Form.Label htmlFor="name" className="col-form-label me-4">
                      Contact
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <input
                      disabled={!editMode}
                      className={`${styles.formControl} ${
                        !editMode ? "" : contact ? (contactExist ? "borderRed" : "borderGreen") : "borderRed"
                      }`}
                      value={contact}
                      type="search"
                      onChange={(e) => {
                        dispatch(setContactExist(false));
                        dispatch(setContactExistData(""));
                        dispatch(setContact(e.target.value.replace(/^\s+/g, "")));
                      }}
                      onBlur={(e) => {
                        if (e.target.value) {
                          checkContactHandler(e.target.value);
                        }
                      }}
                      maxLength={30}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 text-start">
                    <Form.Label htmlFor="name" className="col-form-label me-4">
                      Name
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <input
                      className={`${styles.formControl} ${!editMode ? "" : name ? "borderGreen" : "borderRed"}`}
                      value={name}
                      disabled={!editMode}
                      type="search"
                      onChange={(e) => {
                        dispatch(setName(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                      }}
                      maxLength={30}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 text-start">
                    <Form.Label htmlFor="name" className="col-form-label me-4">
                      Position
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <input
                      disabled={!editMode}
                      className={styles.formControl}
                      onChange={(e) => {
                        dispatch(setPosition(e.target.value.replace(/^\s+/g, "")));
                      }}
                      type="search"
                      value={position}
                      maxLength={30}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 text-start">
                    <Form.Label htmlFor="name" className="col-form-label me-4">
                      Phone
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      className={`${styles.formControl} ${
                        phone ? (phone.match(phoneRegex) ? "black" : "borderRed") : "black"
                      }`}
                      value={phone}
                      type="search"
                      disabled={!editMode}
                      onChange={(e) => {
                        dispatch(setPhone(phoneReplace(e.target.value)));
                      }}
                      maxLength={30}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      style={{
                        borderColor: !editMode && "black",
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 text-start">
                    <Form.Label htmlFor="name" className="col-form-label me-4">
                      FAX
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      className={`${styles.formControl} ${
                        fax ? (fax.match(phoneRegex) ? "black" : "borderRed") : "black"
                      }`}
                      onChange={(e) => {
                        dispatch(setFax(phoneReplace(e.target.value)));
                      }}
                      type="search"
                      value={fax}
                      disabled={!editMode}
                      maxLength={30}
                      autoComplete="newpassword"
                      aria-autocomplete="none"

                      style={{
                        borderColor: !editMode && "black",
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 text-start">
                    <Form.Label htmlFor="name" className="col-form-label me-4">
                      Email
                    </Form.Label>
                  </Col>
                  <Col xs={7} md={7} sm={7} className="p-0">
                    <input
                      className={`${styles.formControl} ${
                        email
                          ? email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/)
                            ? "black"
                            : "borderRed"
                          : "black"
                      }`}
                      type="text"
                      maxLength={70}
                      disabled={!editMode}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      value={email}
                      onChange={(e) => {
                        dispatch(setEmail(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                      }}
                      style={{
                        borderColor: email
                          ? email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/)
                            ? "black"
                            : "red"
                          : "black",
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 text-start">
                    <Form.Label htmlFor="name" className="col-form-label me-4">
                      Birthday
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <DateInputField
                      date={birthday}
                      min={""}
                      reduxSetDate={(value) => dispatch(setBirthday(value))}
                      disabled={!editMode}
                      format={"MM/DD/YYYY"}
                      setIsDateValid={(value) => dispatch(setIsBirtdayValid(value))}
                      className={`customFormControl ${
                        viewDetail === true ? "" : isBirtdayValid ? "" : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 text-start">
                    <Form.Label htmlFor="name" className="col-form-label me-4">
                      Callback
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <DateInputField
                      date={callback}
                      reduxSetDate={(value) => dispatch(setCallback(value))}
                      disabled={!editMode}
                      setIsDateValid={(value) => dispatch(setIsCallBackValid(value))}
                      className={`customFormControl ${
                        viewDetail === true ? "" : isCallBackValid ? "" : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 text-start">
                    <Form.Label htmlFor="name" className="col-form-label me-4">
                      Last Call
                    </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <DateInputField
                      date={lastcall}
                      reduxSetDate={(value) => dispatch(setLastCall(value))}
                      disabled={!editMode}
                      setIsDateValid={(value) => dispatch(setIsLastCallValid(value))}
                      className={`customFormControl ${
                        viewDetail === true ? "" : isLastCallValid ? "" : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="margin-box-5 m-t-16 invisible  m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 text-start">
                    <Form.Label htmlFor="name" className="col-form-label me-4">
                      Contact
                    </Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      className={styles.formControl}
                      type="search"
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0 text-start">
                    <Form.Label htmlFor="name" className="col-form-label me-4">
                      Notes
                    </Form.Label>
                  </Col>
                </Form.Group>

                <Form.Group className="margin-box-5 m-t-16  m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col xs={9} md={9} sm={9} className="p-0 h-200px">
                    <textarea
                      className={`${styles.formControl} h-100`}
                      disabled={!editMode}
                      value={note}
                      onChange={(e) => {
                        dispatch(setNote(e.target.value.replace(/^\s+/g, "")));
                      }}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      name=""
                      id=""
                      cols="50"
                      rows="60"
                    ></textarea>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            {load && (
              <div className="fade modal-backdrop show">
                {" "}
                <div className="pos-center">
                  {" "}
                  <div className="loader"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealerContactContent;
