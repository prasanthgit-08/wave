import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import {
  setEmailList,
  setIsEmailClicked,
  setUser,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import { emailRegex } from "../../../../../utils/validation/EmailRegex";
import { Col, Form, Row } from "react-bootstrap";
import ButtonComponent from "../../../../common/Button";
import { setEmailDamageData } from "../../../../../redux/DispatchDelay/DelayProcessing/DelayDamageSlice";
import Emails from "./Emails";

const EmailsDamageEdit = () => {
  const unitPK = useSelector((state) => state.delayDamage.unitPK);

  const viewOnly = useSelector((state) => state.delayDamage.viewOnly);
  const emailList = useSelector((state) => state.delayDamage.emailList);
  const location = useLocation();
  const pathname = location.pathname;
  const emailDamageData = useSelector((state) => state.delayDamage.emailViewDamageData);

  const [index, setIndex] = useState();
  const [operation, setOperation] = useState();
  const [inputName, setInputName] = useState();
  const [inputEmail, setInputEmail] = useState();
  const [duplicateEmail, setDuplicateEmail] = useState();
  const [isView, setIsView] = useState(true);
  const [addFlag, setAddFlag] = useState(false);
  const [editFlag, setEditFlag] = useState(true);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const dispatch = useDispatch();
  let userId = 3;

  const id = useParams().unitfk;

  /**
   *  Delay Fetch User Emails function
   **/
  const getCurrentUserEmails = () => {
    setOperation("Add");
    DelayProcessingService.getCurrentUserEmailDetails(userId)
      .then((response) => {
        if (response?.data != null) {
          setEmailDamageData(response?.data);
          setDuplicateEmail(response?.data?.email);
          setInputName(response?.data?.name);
          setInputEmail(response?.data?.email);
          dispatch(setUser(response?.data?.name));
          setIsView(true);
          setDeleteFlag(true);
        } else {
          console.log("No Email Data Found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addEmail = () => {
    setIsView(false);
    setOperation("Add");
  };

  const saveEmail = (inputName, inputEmail) => {
    if (operation === "Add") {
      const newEmail = {
        delayedUnitEmailPK: null,
        delayedUnitFK: null,
        NAME: inputName,
        EMAIL: inputEmail,
      };
      const data = [...emailDamageData, newEmail];
      dispatch(setEmailDamageData(data));
    }

    if (operation === "Edit") {
      const updatedEmail = Array.isArray(emailDamageData) ? [...emailDamageData] : []; // Check for duplicates before updating
      const emailExists = updatedEmail?.some(
        (entry, idx) => entry.email && entry.email?.toLowerCase() === inputEmail?.toLowerCase() && idx !== index
      );

      if (!emailExists) {
        // Update the specific email and name
        updatedEmail[index] = {
          delayedUnitEmailPK: null,
          delayedUnitFK: null,
          name: inputName,
          email: inputEmail,
        };
        setErrorFlag(false);
      } else {
        setDuplicateEmail(inputEmail);
        setErrorFlag(true);
      }
      // Update state with the new array
      setEmailDamageData(updatedEmail);
    }
  };

  const emailCheck = (inputName, inputEmail) => {
    if (operation === "Edit" || operation === "Add") {
      const updatedEmail = Array.isArray(emailList) ? [...emailList] : []; // Check for duplicates before updating
      const emailExists = updatedEmail?.some(
        (entry, idx) => entry.email && entry.email?.toLowerCase() === inputEmail?.toLowerCase() && idx !== index
      );
      if (!emailExists) {
        setErrorFlag(false);
      } else {
        setDuplicateEmail(inputEmail);
        setErrorFlag(true);
      }
    }
  };

  const deleteEmail = () => {
    setOperation("Delete");
    if (inputEmail !== "" || inputName !== "") {
      const updatedEmailAfterDeletion = Array.isArray(emailList)
        ? emailList?.filter((_, idx) => idx !== index)
        : [];
      setEmailDamageData(updatedEmailAfterDeletion);
      dispatch(setEmailList(updatedEmailAfterDeletion));
    }
  };

  // Callback function to receive data from ChildComponent
  const receiveDataFromChild = (index, email, name, data) => {
    setInputName(name);
    setInputEmail(email);
    setIsView(true);
    setEditFlag(false);
    setDeleteFlag(false);
    setIndex(index);
    setEmailDamageData(data);
    setOperation("");
    setErrorFlag(false);
    setAddFlag(true);
  };

  const handleErrorFlagChange = (newFlag) => {
    setErrorFlag(newFlag);
  };

  useEffect(() => {
    setIsView(true);
    setInputEmail("");
    setInputName("");
    setErrorFlag(false);
  }, [viewOnly]);

  return (
    <div className="container-fluid table-bordered">
      <div className=" ">
        <div className="row border border-dark border-1 fit-halfScreenFormContentHeight">
          <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
            <div className="d-flex h-375px">
              <div className="w-100 scrollable-list">
                <Emails
                  userDetails={emailDamageData}
                  sendDataToParent={receiveDataFromChild}
                  action={operation}
                  setErrorFlag={handleErrorFlagChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="align-items-right " hidden={viewOnly}>
          <div className="d-flex justify h-100">
            <div className="d-flex flex-column justify-content-center">
              <span className="p-1">
                <button
                  className="btn btn-secondary font-12 btn-sm btn-medium-with"
                  type="button"
                  onClick={() => {
                    setInputEmail("");
                    setInputName("");
                    setErrorFlag(false);
                    setDeleteFlag(true);
                    setEditFlag(true);
                    addEmail();
                  }}
                  disabled={addFlag}
                >
                  Add
                </button>
              </span>
              <span className="p-1">
                <button
                  className="btn btn-secondary font-12 btn-sm btn-medium-with"
                  type="button"
                  onClick={() => {
                    setIsView(false);
                    setOperation("Edit");
                    setErrorFlag(false);
                    setDeleteFlag(true);
                  }}
                  disabled={editFlag || emailDamageData?.length === 0}
                >
                  Edit
                </button>
              </span>

              <span className="p-1">
                <button
                  className="btn btn-secondary font-12 btn-sm btn-medium-with"
                  type="button"
                  onClick={() => {
                    deleteEmail();
                    setInputEmail("");
                    setInputName("");
                    setErrorFlag(false);
                    setAddFlag(true);
                    setEditFlag(true);
                    setDeleteFlag(true);
                  }}
                  disabled={deleteFlag || emailDamageData?.length === 0}
                >
                  Delete
                </button>
              </span>

              <span className="p-1">
                <button
                  className="btn btn-secondary font-12 btn-sm btn-medium-with"
                  type="button"
                  onClick={() => {
                    setIsView(true);
                    setInputEmail("");
                    setInputName("");
                    setErrorFlag(false);
                    setAddFlag(false);
                    setDeleteFlag(true);
                    setEditFlag(true);
                    setIndex();
                    dispatch(setIsEmailClicked(false));
                  }}
                >
                  Cancel
                </button>
              </span>

              <span className="p-1">
                <button
                  className="btn btn-secondary font-12 btn-sm btn-medium-with"
                  type="button"
                  onClick={() => {
                    setErrorFlag(false);
                    setAddFlag(false);
                    setDeleteFlag(true);
                    setEditFlag(true);
                    saveEmail(inputName, inputEmail);
                    setIsView(true);
                    if (!errorFlag) {
                      setInputEmail("");
                      setInputName("");
                    }
                  }}
                  disabled={isView || !inputEmail?.match(emailRegex) || errorFlag}
                >
                  Save
                </button>
              </span>
            </div>
          </div>
        </div>

        <Form.Group className="mt-3 align-items row  m-l-0 m-r-0" hidden={viewOnly}>
          <Col sm={1} md={1} xs={1} className="p-r-0">
            <Form.Label htmlFor="bolContactName"></Form.Label>
          </Col>
          <Col sm={2} md={2} xs={2} className="align-items-right">
            <ButtonComponent
              className="btn btn-secondary btn-sm font-12 "
              label={"Add current user"}
              onClick={() => {
                getCurrentUserEmails();
                dispatch(setIsEmailClicked(false));
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-1  align-items-center row  m-l-0 m-r-0" hidden={viewOnly}>
          <Col sm={1} md={1} xs={1} className="p-0">
            <Form.Label className="col-form-label dealer-label"> Name</Form.Label>
          </Col>

          <Col sm={3} md={3} xs={3} className="">
            <input
              className={`customFormControl`}
              id="name"
              name="name"
              type="name"
              value={inputName?.trim()}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
              onInput={(e) => {
                setInputName(e.target.value);
              }}
              disabled={isView}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-1  align-items-center row  m-l-0 m-r-5" hidden={viewOnly}>
          <Col sm={1} md={1} xs={1} className="p-0">
            <Form.Label className="col-form-label dealer-label"> Email Address</Form.Label>
          </Col>

          <Col sm={6} md={6} xs={6}>
            <input
              className={`customFormControl`}
              id="email"
              name="email"
              type="email"
              value={inputEmail}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
              onInput={(e) => {
                setErrorFlag(false);
                setInputEmail(e.target.value);
              }}
              onBlur={(e) => {
                emailCheck(inputName, e.target.value);
              }}
              disabled={isView}
              style={{
                border: inputEmail
                  ? inputEmail?.match(emailRegex)
                    ? "black 1px solid"
                    : "red 2px solid"
                  : "",
              }}
            />
          </Col>
          <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0 " hidden={!errorFlag}>
            <Row className={`${!errorFlag ? "hide-elements" : ""}`}>
              <Col sm={6} md={6} xs={6} style={{ "padding-left": "90px" }}>
                <p className="mb-0 text-danger ms-2">{`'${duplicateEmail}' already exists!`?.trim()}</p>
              </Col>
            </Row>
          </Form.Group>
        </Form.Group>
      </div>
    </div>
  );
};

export default EmailsDamageEdit;
