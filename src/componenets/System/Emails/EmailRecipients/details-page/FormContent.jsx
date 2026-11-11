import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import EmailRecipientService from "../../../../../services/EmailRecipientService";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecipientUserFK,
  setRecipientFieldName,
  setName,
  setEmail,
  setEmailCondition,
  resetChanges,
  setEditFormData,
  setViewDetail,
  setEmailRecipientPK,
  setIsValidEmail,
  setIsEmailRecipientDataLoading,
} from "../../../../../redux/EmailRecipientSlice";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import { useNavigate, useParams } from "react-router-dom";
import UsersService from "../../../../../services/UsersService";
import LookupButton from "../../../../common/LookupButton";
import UserLookup from "../../../../LookupScreens/User/UserLookup";
import LoadingIcon from "../../../../common/LoadingIcon";

const FormContent = ({ setTabValidation }) => {
  const dispatch = useDispatch();
  const recipientUserFK = useSelector((state) => state.emailRecipient.recipientUserFK);
  const recipientFieldName = useSelector((state) => state.emailRecipient.recipientFieldName);
  const name = useSelector((state) => state.emailRecipient.name);
  const email = useSelector((state) => state.emailRecipient.email);
  const emailCondition = useSelector((state) => state.emailRecipient.emailCondition);
  const isValidEmail = useSelector((state) => state.emailRecipient.isValidEmail);
  const viewDetail = useSelector((state) => state.emailRecipient.viewDetail);
  const isEmailRecipientDataLoading = useSelector(
    (state) => state.emailRecipient.isEmailRecipientDataLoading
  );
  const changesCancelled = useSelector((state) => state.emailRecipient.changesCancelled);
  const editFormData = useSelector((state) => state.emailRecipient.editFormData);

  // LocalState
  const [recipientUsers, setRecipientUsers] = useState([]);
  const [userNameInput, setUserNameInput] = useState("");
  const [showUserLookUp, setShowUserLookUp] = useState(false);
  const [dropdownLoading, setDropdownLoading] = useState(false);

  const { emailMaintenanceId, id, pageNumber } = useParams();
  const navigate = useNavigate();

  const fetchRecordById = (id) => {
    dispatch(setIsEmailRecipientDataLoading(true));
    EmailRecipientService.fetchEmailRecipientById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
        dispatch(setIsEmailRecipientDataLoading(false));
      })
      .catch((error) => {
        navigate(`/email-recipients/${emailMaintenanceId}/${pageNumber}`);
      })
      .finally(() => dispatch(setIsEmailRecipientDataLoading(false)));
  };

  const userStatus = "Active";
  const usersTest = null;
  const searchCriteria = "Beginning";
  const advanceSortingOrder = null;
  const sortValue = null;
  const sortFlag = null;
  const selectedUserStatus = "Actual";
  const type = "Autocomplete";
  const userType = "emailRecipient";

  const fetchUsers = (searchString) => {
    setDropdownLoading(true);
    UsersService.getAllUsers(
      userStatus,
      0,
      usersTest,
      searchCriteria,
      advanceSortingOrder,
      searchString,
      sortValue,
      sortFlag,
      selectedUserStatus,
      type,
      userType
    )
      .then((response) => {
        const { data } = response;
        const userList = data.content?.map((user) => ({ ...user, name: user.name?.trim() }));
        setRecipientUsers(userList);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setDropdownLoading(false));
  };

  const handleRecipientUserSelection = (user) => {
    setUserNameInput(user.name?.trim());
    dispatch(setRecipientUserFK(user.userPK));
    setShowUserLookUp(false);
  };

  useEffect(() => {
    if (id) {
      fetchRecordById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, changesCancelled]);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setEmailRecipientPK(editFormData.emailRecipientPK || ""));
      dispatch(setRecipientUserFK(editFormData.recipientUserId || ""));
      setUserNameInput(editFormData.recipientUserName?.trim() || "");
      dispatch(setRecipientFieldName(editFormData.recipientFieldName?.trim() || ""));
      dispatch(setName(editFormData.name || ""));
      dispatch(setEmail(editFormData.email || ""));
      dispatch(setEmailCondition(editFormData.onlyEmailIf?.trim() || ""));
    } else if (editFormData === undefined || editFormData === null) {
      dispatch(resetChanges());
      setUserNameInput("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editFormData, viewDetail]);

  useEffect(() => {
    if (name === "") {
      dispatch(setEmail(""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    if (email.match(/^(?!\.)(?!.*\.{2})[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      ///^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      dispatch(setIsValidEmail(true));
    } else {
      dispatch(setIsValidEmail(false));
    }
  }, [email]);

  useEffect(() => {
    if (recipientUserFK || (name !== "" && email !== "" && isValidEmail) || recipientFieldName) {
      setTabValidation(true);
    } else {
      setTabValidation(false);
    }
  }, [recipientUserFK, recipientFieldName, name, email, isValidEmail]);

  return (
    <div className="p-1 w-100 ">
      {isEmailRecipientDataLoading && <LoadingIcon />}
      <Row className="m-0 p-0 ">
        <Col sm={12} md={12} lg={12} xl={12} xs={12}>
          {/* User */}
          <Form.Group className="mt-3 align-items  d-flex  m-l-0 m-r-0">
            <Col xs={2} sm={2} md={2} className="p-0">
              <Form.Label className="customColFormLabel">User</Form.Label>
            </Col>

            <Col md={4} sm={4} xs={4} className={`p-0 d-flex`}>
              <AutoCompleteDropdown
                className={`${styles.formControl} ${
                  viewDetail || name || recipientFieldName || isEmailRecipientDataLoading
                    ? ""
                    : recipientUserFK !== ""
                      ? "borderGreen"
                      : "borderRed"
                }`}
                arrayList={recipientUsers}
                searchString={userNameInput}
                renderItemId={(user) => user.userPK}
                renderItemField={(user) => user.name}
                loading={dropdownLoading}
                handleSearchString={(string) => setUserNameInput(string)}
                fetchDataBySearchString={fetchUsers}
                onSelect={handleRecipientUserSelection}
                selectedId={recipientUserFK}
                clearInputCallback={() => {
                  dispatch(setRecipientUserFK(""));
                }}
                disabled={viewDetail || name || recipientFieldName}
              />
              <LookupButton disabled={viewDetail || name !== ""} onClick={() => setShowUserLookUp(true)} />
            </Col>
          </Form.Group>

          {/* Field Name */}
          <Form.Group className="mt-3 align-items  d-flex  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="customColFormLabel">Field Name</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <textarea
                d-flexs={7}
                cols={50}
                type="text"
                style={{
                  resize: "none",
                  display: "fixed",
                  minHeight: "150px",
                  minWidth: "600px",
                  maxHeight: "150px",
                  maxWidth: "1000px",
                  boxShadow: "none",
                  fontSize: "12px",
                }}
                className={`customFormControl h-100 ${
                  viewDetail || recipientUserFK || name || userNameInput || isEmailRecipientDataLoading
                    ? ""
                    : recipientFieldName !== ""
                      ? "borderGreen"
                      : "borderRed"
                }`}
                name="recipientFieldName"
                value={recipientFieldName}
                onChange={(e) => {
                  dispatch(setRecipientFieldName(e.target.value));
                }}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail || recipientUserFK || name || userNameInput}
              />
            </Col>
          </Form.Group>
          {/* Name */}
          <Form.Group className="mt-3 align-items  d-flex  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="customColFormLabel">Name</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                name="name"
                id="name"
                type="text"
                className={`customFormControl ${
                  viewDetail ||
                  recipientUserFK ||
                  recipientFieldName ||
                  isEmailRecipientDataLoading ||
                  userNameInput
                    ? ""
                    : name !== ""
                      ? "borderGreen"
                      : "borderRed"
                }`}
                maxLength={30}
                value={name}
                disabled={viewDetail || recipientUserFK || recipientFieldName || userNameInput}
                onChange={(e) => {
                  dispatch(setName(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          {/* Email */}
          <Form.Group className="mt-3 align-items  d-flex  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className="customColFormLabel">Email</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                name="email"
                id="email"
                type="text"
                className={`customFormControl ${
                  viewDetail || name === "" || isEmailRecipientDataLoading
                    ? ""
                    : isValidEmail
                      ? "borderGreen"
                      : "borderRed"
                }`}
                maxLength={70}
                autoComplete="off"
                aria-autocomplete="list"
                value={email}
                disabled={
                  viewDetail || recipientUserFK || recipientFieldName !== "" || name === "" || userNameInput
                }
                onChange={(e) => {
                  dispatch(setEmail(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <UserLookup
        show={showUserLookUp}
        onHide={() => setShowUserLookUp(false)}
        renderItemId={(user) => user.userPK}
        handleLookupSelection={handleRecipientUserSelection}
        MaintenanceProgram
        userType
        userStatus
        selectedUserStatus
      />
    </div>
  );
};

export default FormContent;
