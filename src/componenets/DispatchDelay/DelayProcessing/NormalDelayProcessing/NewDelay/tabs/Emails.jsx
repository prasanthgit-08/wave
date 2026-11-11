import React, { useState, useEffect } from "react";
import EmailListing from "./EmailListing";
import { useSelector, useDispatch } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import DelayProcessingService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import {
  resetEmailChanges,
  setAddFlag,
  setCheckEmailExist,
  setEditMode,
  setEmail,
  setEmailName,
  setNewEmailList,
  setNewEmailTabValid,
  setSaveFormData,
  setSelectedIndex,
} from "../../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import { emailRegex } from "../../../../../../utils/validation/EmailRegex";

const Emails = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cancelFlag, setCancelFlag] = useState(false);
  const [saveFlag, setSaveFlag] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [addButtonFlag, setAddButtonFlag] = useState(false);
  const { email, selectedIndex, checkEmailExist, emailName, editMode, newEmailList, emailListData } =
    useSelector((state) => state.delayProcessing);
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
 

  /**
   *  Used to add login user to payload
   **/

  const setCurrentUser = () => {
    const exists = newEmailList?.some(
      (item) => item.email?.toLowerCase() === loggedInUser?.email?.toLowerCase()
    );

    //add logined user to list
    if (exists == false) {
      const newItem = {
        delayedUnitEmailPK: null,
        delayedUnitPK: newEmailList?.length > 0 ? newEmailList[0]?.delayedUnitPK : null,
        name: loggedInUser?.name,
        email: loggedInUser?.email,
      };

      // Add to email list
      dispatch(setNewEmailList([...newEmailList, newItem]));
    }
  };
  /**
   *  Add user button disable condition
   **/

  useEffect(() => {
    const exists = newEmailList?.some(
      (item) => item.email?.toLowerCase() === loggedInUser?.email?.toLowerCase()
    );
    setAddButtonFlag(exists);
  }, [newEmailList]);

  /**
   *  used to check email unique or not
   **/

  const emailUniqness = (email) => {
    const duplicate = newEmailList?.some(
      (item, index) =>
        index !== selectedIndex && item?.email?.toLowerCase()?.trim() === email?.toLowerCase()?.trim()
    );

    dispatch(setCheckEmailExist(duplicate));
  };

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

  /**
   *  used to delete record from payload
   **/

  const handleDelete = () => {
    if (selectedIndex !== null) {
      const updatedList = newEmailList?.filter((_, index) => index !== selectedIndex);
      dispatch(setNewEmailList(updatedList));
      dispatch(setSelectedIndex(null));
      dispatch(setEditMode(false));
      dispatch(resetEmailChanges());
    } else {
      alert("Select a record to delete");
    }
  };

  /**
   * Save a record
   **/
  const handleSave = () => {
    if (selectedIndex !== null) {
      // Update the selected item in the list

      if (newEmailList[selectedIndex]?.emailPk) {
        const selectedItem = emailListData[selectedIndex];
      }

      const updatedList = newEmailList?.map((item, index) =>
        index === selectedIndex
          ? {
              ...item,

              name: emailName,
              email: email,
            }
          : item
      );
      dispatch(setNewEmailList(updatedList));
      dispatch(setSelectedIndex(null));
    } else {
      // Add a new item to the list

      const newItem = {
        delayedUnitEmailPK: null,
        delayedUnitPK: newEmailList?.length > 0 ? newEmailList[0]?.delayedUnitPK : null,
        name: emailName,
        email: email,
      };
      dispatch(setNewEmailList([...newEmailList, newItem]));
    }

    dispatch(resetEmailChanges());
    dispatch(setEditMode(false));
  };

  /**
   * Save validation
   **/
  useEffect(() => {
    if (email && email?.match(emailRegex) && emailName && !checkEmailExist) {
      setSaveFlag(false);
    } else {
      setSaveFlag(true);
    }
  }, [email, emailName, checkEmailExist]);

  /**
   * Tab validation
   **/
  useEffect(() => {
    if (
      (email && emailName && !checkEmailExist && editMode && email?.match(emailRegex)) ||
      (!email && !emailName && !editMode) ||
      (email && emailName && !editMode && email?.match(emailRegex))
    ) {
      dispatch(setNewEmailTabValid(true));
    } else {
      dispatch(setNewEmailTabValid(false));
    }
  }, [email, emailName, checkEmailExist, editMode]);

  /**
   * Email payload
   **/
  useEffect(() => {
    const saveData = {
      delayEmailVO: newEmailList,
    };
    dispatch(setSaveFormData(saveData));
  }, [newEmailList]);

  return (
    <div className="container-fluid table-bordered">
      <div className=" ">
        <div className="row border border-dark border-1 fit-halfScreenFormContentHeight">
          <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
            <div className="d-flex h-375px">
              <div className="w-100 scrollable-list">
                <EmailListing />
              </div>
            </div>
          </div>
        </div>

        <div className="align-items-right ">
          <div className="d-flex justify h-100">
            <div className="d-flex flex-column justify-content-center">
              <span className="p-1">
                <button
                  className="btn btn-secondary font-12 btn-sm btn-medium-with"
                  type="button"
                  onClick={() => {
                    dispatch(setEditMode(true));
                    dispatch(setSelectedIndex(null));
                    dispatch(setAddFlag(true));
                  }}
                  disabled={editMode || selectedIndex != null}
                >
                  Add
                </button>
              </span>
              <span className="p-1">
                <button
                  className="btn btn-secondary font-12 btn-sm btn-medium-with"
                  type="button"
                  onClick={() => {
                    dispatch(setEditMode(true));
                  }}
                  disabled={selectedIndex === null || editMode}
                >
                  Edit
                </button>
              </span>

              <span className="p-1">
                <button
                  className="btn btn-secondary font-12 btn-sm btn-medium-with"
                  type="button"
                  onClick={() => {
                    handleDelete();
                  }}
                  disabled={selectedIndex === null || editMode}
                >
                  Delete
                </button>
              </span>

              <span className="p-1">
                <button
                  className="btn btn-secondary font-12 btn-sm btn-medium-with"
                  type="button"
                  onClick={() => {
                    dispatch(resetEmailChanges());
                    dispatch(setEditMode(false));
                    dispatch(setSelectedIndex(null));
                  }}
                  disabled={!cancelFlag}
                >
                  Cancel
                </button>
              </span>

              <span className="p-1">
                <button
                  className="btn btn-secondary font-12 btn-sm btn-medium-with"
                  type="button"
                  disabled={saveFlag || !editMode}
                  onClick={handleSave}
                >
                  Save
                </button>
              </span>
            </div>
          </div>
        </div>

        <Form.Group className="mt-3 align-items row  m-l-0 m-r-0">
          <Col sm={1} md={1} xs={1} className="p-r-0">
            <Form.Label htmlFor="bolContactName"></Form.Label>
          </Col>
          <Col sm={2} md={2} xs={2} className="align-items-right">
            <button
              className="btn btn-secondary font-12 btn-sm btn-medium-with"
              onClick={() => {
                setCurrentUser();
              }}
              disabled={addButtonFlag}
            >
              Add Current User
            </button>
          </Col>
        </Form.Group>
        <Form.Group className="mt-1  align-items-center row  m-l-0 m-r-0">
          <Col sm={1} md={1} xs={1} className="align-items-right">
            <label className="col-form-label dealer-label p-0 m-b-20"> Name</label>
          </Col>

          <Col sm={4} md={4} xs={4} className="">
            <input
              className={`customFormControl ${!editMode ? "" : emailName ? "borderGreen" : "borderRed"}`}
              id="name"
              name="name"
              type="name"
              value={emailName}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
              onInput={(e) => {
                dispatch(setEmailName(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
              }}
              disabled={!editMode}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-1  align-items-center row  m-l-0 m-r-5">
          <Col sm={1} md={1} xs={1} className="p-0">
            <Form.Label className="col-form-label dealer-label"> Email Address</Form.Label>
          </Col>

          <Col sm={6} md={6} xs={6}>
            <input
              className={`customFormControl ${
                !editMode
                  ? ""
                  : email && email?.match(emailRegex) && !checkEmailExist
                    ? "borderGreen"
                    : "borderRed"
              }`}
              id="email"
              name="email"
              type="text"
              value={email}
              maxLength={70}
              autoComplete="off"
              aria-autocomplete="list"
              onInput={(e) => {
                dispatch(setEmail(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                dispatch(setCheckEmailExist(false));
              }}
              onBlur={(e) => emailUniqness(e.target.value)}
              disabled={!editMode}
            />
          </Col>
        </Form.Group>
        {loading && (
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
  );
};

export default Emails;
