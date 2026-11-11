import React, { useState, useEffect } from "react";
import EmailListing from "./EmailListing";
import { useSelector, useDispatch } from "react-redux";
import ButtonComponent from "../../../../common/Button";
import { useLocation } from "react-router-dom";
import { Col, Form, Row } from "react-bootstrap";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import {
  setEmailList,
  setIsEmailClicked,
  setUser,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";

const Emails = () => {
  const viewOnly = useSelector((state) => state.delayProcessing.viewOnly);
  const emailList = useSelector((state) => state.delayProcessing.emailList);
  const location = useLocation();
  const pathname = location.pathname;
  const [emailData, setEmailData] = useState([]);
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

  const emailRegex = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,}$/;

  /**
   *  Delay Fetch User Emails function
   **/
  const getCurrentUserEmails = () => {
    setOperation("Add");
    DelayProcessingService.getCurrentUserEmailDetails()
      .then((response) => {
        if (response?.data != null) {
          setEmailData(response?.data);
          setDuplicateEmail(response?.data?.email?.trim());
          setInputName(response?.data?.name?.trim());
          setInputEmail(response?.data?.email?.trim());
          dispatch(setUser(response?.data?.name?.trim()));
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
        name: inputName?.trim(),
        email: inputEmail?.trim(),
      };
      setEmailData(newEmail);
    }

    if (operation === "Edit") {
      const updatedEmail = Array.isArray(emailData) ? [...emailData] : []; // Check for duplicates before updating
      const emailExists = updatedEmail?.some(
        (entry, idx) =>
          entry.email?.trim() &&
          entry.email?.trim()?.toLowerCase() === inputEmail?.trim()?.toLowerCase() &&
          idx !== index
      );

      if (!emailExists) {
        updatedEmail[index] = {
          delayedUnitEmailPK: null,
          delayedUnitFK: null,
          name: inputName?.trim(),
          email: inputEmail?.trim(),
        };
        setErrorFlag(false);
      } else {
        setDuplicateEmail(inputEmail?.trim());
        setErrorFlag(true);
      }
      setEmailData(updatedEmail);
    }
  };

  const emailCheck = (inputName, inputEmail) => {
    if (operation === "Edit" || operation === "Add") {
      const updatedEmail = Array.isArray(emailList) ? [...emailList] : []; // Check for duplicates before updating
      const emailExists = updatedEmail?.some(
        (entry, idx) =>
          entry.email?.trim() &&
          entry.email?.trim()?.toLowerCase() === inputEmail?.trim()?.toLowerCase() &&
          idx !== index
      );
      if (!emailExists) {
        setErrorFlag(false);
      } else {
        setDuplicateEmail(inputEmail?.trim());
        setErrorFlag(true);
      }
    }
  };

  const deleteEmail = () => {
    setOperation("Delete");
    if (inputEmail?.trim() !== "" || inputName?.trim() !== "") {
      const updatedEmailAfterDeletion = Array.isArray(emailList)
        ? emailList?.filter((_, idx) => idx !== index)
        : [];
      setEmailData(updatedEmailAfterDeletion);
      dispatch(setEmailList(updatedEmailAfterDeletion));
    }
  };

  const receiveDataFromChild = (index, email, name, data) => {
    setInputName(name?.trim());
    setInputEmail(email?.trim());
    setIsView(true);
    setEditFlag(false);
    setDeleteFlag(false);
    setIndex(index);
    setEmailData(data);
    setOperation("");
    setErrorFlag(false);
    setAddFlag(true);
  };

  const handleErrorFlagChange = (newFlag) => {
    setErrorFlag(newFlag);
  };

  useEffect(() => {
    DelayProcessingService.getCurrentUserEmailDetails()
      .then((response) => {
        if (response?.data != null) {
          dispatch(setUser(response?.data?.name?.trim()));
        } else {
          console.log("No User Data Found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
                <EmailListing
                  userDetails={emailData}
                  sendDataToParent={receiveDataFromChild}
                  action={operation}
                  setErrorFlag={handleErrorFlagChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="align-items-right " hidden={pathname?.includes("delayed-details") && viewOnly}>
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
                    addEmail(inputName, inputEmail);
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
                  disabled={editFlag || emailData?.length === 0}
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
                  disabled={deleteFlag || emailData?.length === 0}
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

        <Form.Group
          className="mt-3 align-items row  m-l-0 m-r-0"
          hidden={pathname?.includes("delayed-details") && viewOnly}
        >
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
        <Form.Group
          className="mt-1  align-items-center row  m-l-0 m-r-0"
          hidden={pathname?.includes("delayed-details") && viewOnly}
        >
          <Col sm={1} md={1} xs={1} className="align-items-right">
            <label className="col-form-label dealer-label p-0 m-b-20"> Name</label>
          </Col>

          <Col sm={4} md={4} xs={4} className="">
            <input
              className={`customFormControl`}
              id="name"
              name="name"
              type="name"
              value={inputName}
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
        <Form.Group
          className="mt-1  align-items-center row  m-l-0 m-r-5"
          hidden={pathname?.includes("delayed-details") && viewOnly}
        >
          <Col sm={1} md={1} xs={1} className="p-0">
            <Form.Label className="col-form-label dealer-label"> Email Address</Form.Label>
          </Col>

          <Col sm={6} md={6} xs={6}>
            <input
              className={`customFormControl`}
              id="email"
              name="email"
              type="email"
              value={inputEmail?.trim()}
              maxLength={70}
              autoComplete="off"
              aria-autocomplete="list"
              onInput={(e) => {
                setErrorFlag(false);
                setInputEmail(e.target.value?.trim());
              }}
              onBlur={(e) => {
                emailCheck(inputName, e.target.value?.trim());
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

export default Emails;
