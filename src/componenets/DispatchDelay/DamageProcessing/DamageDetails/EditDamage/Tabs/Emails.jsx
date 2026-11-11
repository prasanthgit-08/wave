import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EmailLIsting from "./EmailLIsting";
import {
  setEditSaveFormData,
  resetEditEmailChanges,
  setEditAddFlag,
  setEditCheckEmailExist,
  setEditEmail,
  setEditEmailDeleteList,
  setEditEmailList,
  setEditEmailName,
  setEditEmailTabValid,
  setEditSelectedIndex,
  setEditView,
  setLoginUserName,
} from "../../../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";
import DelayProcessingService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { emailRegex } from "../../../../../../utils/validation/EmailRegex";
const Emails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cancelFlag, setCancelFlag] = useState(false);
  const [saveFlag, setSaveFlag] = useState(true);

  const [addButtonFlag, setAddButtonFlag] = useState(false);
  const {
    editEmail,
    editSelectedIndex,
    editCheckEmailExist,
    editEmailName,
    editView,
    editEmailList,
    editmailListData,
    breakdownDetailFlag,
  } = useSelector((state) => state.damageReducer);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));

  const setCurrentUser = () => {
    const exists = editEmailList?.some(
      (item) => item.Email?.toLowerCase() === loggedInUser?.email?.toLowerCase()
    );

    //add logined user to list
    if (exists == false) {
      const newItem = {
        Name: loggedInUser?.name,
        Email: loggedInUser?.email,
        DelayedUnitEmailPK: null,
      };

      // Add to email list
      dispatch(setEditEmailList([...editEmailList, newItem]));
    }
  };

  useEffect(() => {
    const exists = editEmailList?.some(
      (item) => item.Email?.toLowerCase() === loggedInUser?.email?.toLowerCase()
    );
    setAddButtonFlag(exists);
  }, [editEmailList]);

  // used to check email unique or not
  const emailUniqness = (editEmail) => {
    const duplicate = editEmailList?.some(
      (item, index) =>
        index !== editSelectedIndex && item.Email?.toLowerCase()?.trim() === editEmail?.toLowerCase()?.trim()
    );

    dispatch(setEditCheckEmailExist(duplicate));

    // true if duplicate exists
  };
  //used to disable inner cancel button
  useEffect(() => {
    if (
      (editView && editSelectedIndex == null) ||
      (!editView && editSelectedIndex != null) ||
      (editView && editSelectedIndex != null)
    ) {
      setCancelFlag(true);
    } else {
      setCancelFlag(false);
    }
  }, [editView, editSelectedIndex]);

  //Delete function
  const handleDelete = () => {
    if (editSelectedIndex !== null) {
      const updatedList = editEmailList?.filter((_, index) => index !== editSelectedIndex);
      dispatch(setEditEmailList(updatedList));
      dispatch(setEditSelectedIndex(null));
      dispatch(setEditView(false));
      dispatch(resetEditEmailChanges());
    } else {
      alert("Select a record to delete");
    }
  };

  //Save a record
  const handleSave = () => {
    if (editSelectedIndex !== null) {
      // Update the selected item in the list
      let isChanged = false;
      const updatedList = editEmailList?.map((item, index) =>
        index === editSelectedIndex
          ? {
              ...item,

              Name: editEmailName,
              Email: editEmail,
            }
          : item
      );
      dispatch(setEditEmailList(updatedList));
      dispatch(setEditSelectedIndex(null));
    } else {
      // Add a new item to the list

      const newItem = {
        Name: editEmailName,
        Email: editEmail,
        DelayedUnitEmailPK: null,
      };
      dispatch(setEditEmailList([...editEmailList, newItem]));
    }

    dispatch(resetEditEmailChanges());
    dispatch(setEditView(false));
  };

  //save validation
  useEffect(() => {
    if (editEmail && editEmail?.match(emailRegex) && editEmailName && !editCheckEmailExist) {
      setSaveFlag(false);
    } else {
      setSaveFlag(true);
    }
  }, [editEmail, editEmailName, editCheckEmailExist]);
  // Tab  validation
  useEffect(() => {
    if (
      (editEmail && editEmailName && !editCheckEmailExist && editView && editEmail?.match(emailRegex)) ||
      (!editEmail && !editEmailName && !editView) ||
      (editEmail && editEmailName && !editView && editEmail?.match(emailRegex))
    ) {
      dispatch(setEditEmailTabValid(true));
    } else {
      dispatch(setEditEmailTabValid(false));
    }
  }, [editEmail, editEmailName, editCheckEmailExist, editView]);

  //email payload
  useEffect(() => {
    const saveData = {
      xmlData: editEmailList,
    };
    dispatch(setEditSaveFormData(saveData));
  }, [editEmailList]);

  return (
    <div className="container-fluid table-bordered">
      <div className=" ">
        <div className="row border border-dark border-1 fit-halfScreenFormContentHeight">
          <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
            <div className="d-flex h-375px">
              <div className="w-100 scrollable-list">
                <EmailLIsting />
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
                    dispatch(setEditView(true));
                    dispatch(setEditSelectedIndex(null));
                    dispatch(setEditAddFlag(true));
                  }}
                  disabled={editView || editSelectedIndex != null}
                >
                  Add
                </button>
              </span>
              <span className="p-1">
                <button
                  className="btn btn-secondary font-12 btn-sm btn-medium-with"
                  type="button"
                  onClick={() => {
                    dispatch(setEditView(true));
                  }}
                  disabled={editSelectedIndex === null || editView}
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
                  disabled={editSelectedIndex === null || editView}
                >
                  Delete
                </button>
              </span>

              <span className="p-1">
                <button
                  className="btn btn-secondary font-12 btn-sm btn-medium-with"
                  type="button"
                  onClick={() => {
                    dispatch(resetEditEmailChanges());
                    dispatch(setEditView(false));
                    dispatch(setEditSelectedIndex(null));
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
                  disabled={saveFlag || !editView}
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
              className={`customFormControl ${!editView ? "" : editEmailName ? "borderGreen" : "borderRed"}`}

              id="name"
              name="name"
              type="name"
              value={editEmailName}
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
              onInput={(e) => {
                dispatch(setEditEmailName(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
              }}
              disabled={!editView}
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
                !editView
                  ? ""
                  : editEmail && editEmail?.match(emailRegex) && !editCheckEmailExist
                    ? "borderGreen"
                    : "borderRed"
              }`}
              id="email"
              name="email"
              type="text"
              value={editEmail}
              maxLength={70}
              autoComplete="off"
              aria-autocomplete="list"
              onChange={(e) => {
                dispatch(setEditEmail(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                dispatch(setEditCheckEmailExist(false));
              }}
              onBlur={(e) => emailUniqness(e.target.value)}
              disabled={!editView}
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
