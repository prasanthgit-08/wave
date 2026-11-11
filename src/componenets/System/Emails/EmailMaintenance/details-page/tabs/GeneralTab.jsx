import React, { useEffect, useState } from "react";
import LookupButton from "../../../../../common/LookupButton";
import { Form, Col, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import EmailFormatService from "../../../../../../services/EmailFormatService";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../../../../styles/ThreeQuarterScreen.module.css";
import {
  setDescription,
  setObjectKey,
  setSenderUserFK,
  setSenderTypeFK,
  setDatabaseTableName,
  setEmailBodyFormat,
  setEmailSubject,
  resetChanges,
  setEditFormData,
  setViewDetail,
  setEmailFormatPK,
  setIsGeneralTabValid,
  setIsDescriptionUnique,
  setIsObjectKeyUnique,
  setIsEmailFormatDataLoading,
  setIsTableExists,
} from "../../../../../../redux/EmailFormatsSlice";
import { useNavigate, useParams } from "react-router-dom";
import UsersService from "../../../../../../services/UsersService";
import UserLookup from "../../../../../LookupScreens/User/UserLookup";
import EmailSenderTypeLookup from "../../../../../LookupScreens/EmailSenderType/EmailSenderTypeLookup";
import EmailSenderTypesService from "../../../../../../services/EmailSenderTypesService";
import { faA } from "@fortawesome/free-solid-svg-icons";
import LoadingIcon from "../../../../../common/LoadingIcon";

const GeneralTab = () => {
  const [dropdownLoading, setDropdownLoading] = useState(false);
  const dispatch = useDispatch();
  const objectKey = useSelector((state) => state.emailFormats.objectKey);
  const description = useSelector((state) => state.emailFormats.description);
  const isDescriptionUnique = useSelector((state) => state.emailFormats.isDescriptionUnique);
  const isObjectKeyUnique = useSelector((state) => state.emailFormats.isObjectKeyUnique);
  const senderUserFK = useSelector((state) => state.emailFormats.senderUserFK);
  const senderTypeFK = useSelector((state) => state.emailFormats.senderTypeFK);
  const databaseTableName = useSelector((state) => state.emailFormats.databaseTableName);
  const viewDetail = useSelector((state) => state.emailFormats.viewDetail);
  const isEmailFormatDataLoading = useSelector((state) => state.emailFormats.isEmailFormatDataLoading);
  const changesCancelled = useSelector((state) => state.emailFormats.changesCancelled);
  const editFormData = useSelector((state) => state.emailFormats.editFormData);
  const isTableExists = useSelector((state) => state.emailFormats.isTableExists);

  // LocalState
  const [senderUsers, setSenderUsers] = useState([]);
  const [userNameInput, setUserNameInput] = useState("");
  const [showUserLookUp, setShowUserLookUp] = useState(false);
  const [senderTypes, setSenderTypes] = useState([]);
  const [senderTypeInput, setSenderTypeInput] = useState("");
  const [showSenderTypeLookUp, setShowSenderTypeLookUp] = useState(false);
  //const [tableExistsFlag, setTableExistsFlag] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchRecordById = (id) => {
    dispatch(setIsEmailFormatDataLoading(true));

    EmailFormatService.fetchEmailFormatsById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
      })
      .catch((error) => {
        navigate("/email-maintenance");
      })
      .finally(() => dispatch(setIsEmailFormatDataLoading(false)));
  };

  const userStatus = "Active";
  const usersTest = null;
  const searchCriteria = "Beginning";
  const advanceSortingOrder = null;
  const sortValue = null;
  const sortFlag = null;
  const selectedUserStatus = null;
  const type = "Autocomplete";
  const userType = "emailMaintenance";

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
        setSenderUsers(userList);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setDropdownLoading(false));
  };

  const handleSenderUserSelection = (senderUser) => {
    setUserNameInput(senderUser.name?.trim());
    dispatch(setSenderUserFK(senderUser.userPK));
    dispatch(setSenderTypeFK(""));
    setSenderTypeInput("");
    setShowUserLookUp(false);
  };

  const handleSenderTypeSelection = (senderType) => {
    setSenderTypeInput(senderType.description?.trim());
    dispatch(setSenderTypeFK(senderType.emailSenderTypePK));
    dispatch(setSenderUserFK(""));
    setUserNameInput("");
    setShowSenderTypeLookUp(false);
  };

  const FetchEmailSenderTypes = (searchString) => {
    setDropdownLoading(true);
    EmailSenderTypesService.getAll(searchString, searchCriteria, 0, sortValue, sortFlag)
      .then((response) => {
        const data = response.data;
        const senderType = data.content?.map((data) => ({ ...data, description: data.description?.trim() }));
        setSenderTypes(senderType);
      })
      .catch((error) => {})
      .finally(() => setDropdownLoading(false));
  };

  const uniqueDescriptionCheck = (description) => {
    EmailFormatService.uniqueDescriptionCheck(id, description)
      .then((res) => {
        dispatch(setIsDescriptionUnique(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uniqueObjectCheck = (objectKey) => {
    EmailFormatService.uniqueObjectKeyCheck(id, objectKey)
      .then((res) => {
        dispatch(setIsObjectKeyUnique(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const tableNameExistsCheck = (tableName) => {
    EmailFormatService.tableNameExistsCheck(tableName)
      .then((res) => {
        dispatch(setIsTableExists(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      fetchRecordById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, changesCancelled]);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setEmailFormatPK(editFormData.emailFormatPK || ""));
      dispatch(setObjectKey(editFormData.objectKey?.trim() || ""));
      dispatch(setDescription(editFormData.description?.trim() || ""));
      dispatch(setSenderUserFK(editFormData.senderUserId || ""));
      setUserNameInput(editFormData.senderUserName?.trim() || "");
      dispatch(setSenderTypeFK(editFormData.emailSenderTypeId || ""));
      setSenderTypeInput(editFormData.emailSenderTypeName?.trim() || "");
      dispatch(setDatabaseTableName(editFormData.databaseTable?.trim() || ""));
      dispatch(setEmailBodyFormat(editFormData.xmlText?.trim() || ""));
      dispatch(setEmailSubject(editFormData.subject?.trim() || ""));
    } else if (editFormData === undefined || editFormData === null) {
      dispatch(resetChanges());
      setUserNameInput("");
      setSenderTypeInput("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editFormData, viewDetail]);

  useEffect(() => {
    if (
      objectKey?.trim() !== "" &&
      isObjectKeyUnique &&
      description?.trim() !== "" &&
      isDescriptionUnique &&
      (senderUserFK !== "" || senderTypeFK !== "") &&
      databaseTableName?.trim() !== "" &&
      isTableExists
    ) {
      dispatch(setIsGeneralTabValid(true));
    } else {
      dispatch(setIsGeneralTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    objectKey,
    description,
    senderUserFK,
    senderTypeFK,
    databaseTableName,
    isObjectKeyUnique,
    isDescriptionUnique,
    isTableExists,
  ]);

  return (
    <div className="p-1 w-100 ">
      {isEmailFormatDataLoading && <LoadingIcon />}
      <Row className="m-0 p-0 ">
        <Col xs={10}>
          {/* Description */}
          <Form.Group className=" mt-0 m-b-10 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className=" col-form-label dealer-label">Description</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0 w-345">
              <input
                className={`${styles.formControl} ${
                  viewDetail === true || isEmailFormatDataLoading
                    ? ""
                    : description?.trim() !== "" && isDescriptionUnique
                      ? "borderGreen"
                      : "borderRed"
                }`}
                id="description"
                name="description"
                value={description}
                disabled={viewDetail}
                type="text"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  dispatch(setDescription(e.target.value));
                }}
                onChange={(e) => {
                  dispatch(setDescription(e.target.value));
                  dispatch(setIsDescriptionUnique(true));
                }}
                onBlur={(e) => {
                  if (e.target.value) {
                    uniqueDescriptionCheck(e.target.value);
                  }
                }}
              />
            </Col>
            <Row className={`${!viewDetail && !isDescriptionUnique ? "" : "hide-elements"}`}>
              <Col xs={2} md={2} sm={2}></Col>
              <Col style={{ paddingLeft: "5px" }}>
                <p className="p-0 text-danger alert" style={{ height: "1px" }}></p>
              </Col>
            </Row>
          </Form.Group>

          {/* Object Key */}
          <Form.Group className="mt-2 m-b-10 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className=" col-form-label dealer-label">Object Key</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0 w-345">
              <input
                name={objectKey}
                type="text"
                className={`${styles.formControl} ${
                  viewDetail === true || isEmailFormatDataLoading
                    ? ""
                    : objectKey?.trim() !== "" && isObjectKeyUnique
                      ? "borderGreen"
                      : "borderRed"
                }`}
                id="objectKey"
                value={objectKey}
                disabled={viewDetail}
                maxLength={50}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  dispatch(setObjectKey(e.target.value));
                }}
                onChange={(e) => {
                  dispatch(setObjectKey(e.target.value));
                  dispatch(setIsObjectKeyUnique(true));
                }}
                onBlur={(e) => {
                  if (e.target.value) {
                    uniqueObjectCheck(e.target.value);
                  }
                }}
              />
            </Col>
            <Row className={`${!viewDetail && !isObjectKeyUnique ? "" : "hide-elements"}`}>
              <Col xs={2} md={2} sm={2}></Col>
              <Col style={{ paddingLeft: "5px" }}>
                <p className="p-0 text-danger alert" style={{ height: "1px" }}></p>
              </Col>
            </Row>
          </Form.Group>
          {/* Sender User */}
          <Form.Group className=" mt-5 m-b-10 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} md={3} className="p-0 ">
              <Form.Label className=" col-form-label dealer-label">Sender User</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className={`p-0 d-flex`}>
              <AutoCompleteDropdown
                className={`${styles.formControl} ${
                  viewDetail || senderTypeFK || senderTypeInput || isEmailFormatDataLoading
                    ? ""
                    : senderUserFK
                      ? "borderGreen"
                      : "borderRed"
                }`}
                arrayList={senderUsers}
                searchString={userNameInput}
                renderItemId={(user) => user.userPK}
                renderItemField={(user) => user.name}
                loading={dropdownLoading}
                handleSearchString={(string) => setUserNameInput(string)}
                fetchDataBySearchString={fetchUsers}
                onSelect={handleSenderUserSelection}
                selectedId={senderUserFK}
                clearInputCallback={() => {
                  dispatch(setSenderUserFK(""));
                }}
                disabled={viewDetail || senderTypeFK || senderTypeInput ? true : false}
                maxHeight={"220px"}
              />
              <LookupButton
                disabled={viewDetail || senderTypeFK || senderTypeInput ? true : false}
                onClick={() => setShowUserLookUp(true)}
              />
            </Col>
          </Form.Group>
          {/* Sender Type */}
          <Form.Group className=" mt-2 m-b-10 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} md={3} className="p-0 ">
              <Form.Label className=" col-form-label dealer-label">Sender Type</Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className={`p-0 d-flex`}>
              <AutoCompleteDropdown
                className={`${styles.formControl} ${
                  viewDetail || senderUserFK || userNameInput || isEmailFormatDataLoading
                    ? ""
                    : senderTypeFK
                      ? "borderGreen"
                      : "borderRed"
                }`}
                arrayList={senderTypes}
                searchString={senderTypeInput}
                renderItemId={(senderType) => senderType.emailSenderTypePK}
                renderItemField={(senderType) => senderType.description}
                loading={dropdownLoading}
                handleSearchString={(string) => setSenderTypeInput(string)}
                fetchDataBySearchString={FetchEmailSenderTypes}
                onSelect={handleSenderTypeSelection}
                selectedId={senderTypeFK}
                clearInputCallback={() => {
                  dispatch(setSenderTypeFK(""));
                }}
                disabled={viewDetail || userNameInput ? true : false}
                maxHeight={"200px"}
              />
              <LookupButton
                disabled={viewDetail || userNameInput ? true : false}
                onClick={() => setShowSenderTypeLookUp(true)}
              />
            </Col>
          </Form.Group>
          {/* Database Table */}
          <Form.Group className=" mt-5 m-b-10 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className=" col-form-label dealer-label">Database Table</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <input
                className={`${styles.formControl} ${
                  viewDetail === true || isEmailFormatDataLoading
                    ? ""
                    : databaseTableName?.trim() !== "" && isTableExists
                      ? "borderGreen"
                      : "borderRed"
                }`}
                id="databaseTableName"
                name="databaseTableName"
                value={databaseTableName}
                disabled={viewDetail}
                type="text"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  dispatch(setDatabaseTableName(e.target.value));
                }}
                onChange={(e) => {
                  dispatch(setDatabaseTableName(e.target.value));
                  dispatch(setIsTableExists(true));
                }}
                onBlur={(e) => {
                  if (e.target.value) {
                    tableNameExistsCheck(e.target.value);
                  }
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
        handleLookupSelection={handleSenderUserSelection}
        EmailMaintenance
        userType
        userStatus
        selectedUserStatus
      />
      <EmailSenderTypeLookup
        show={showSenderTypeLookUp}
        onHide={() => setShowSenderTypeLookUp(false)}
        renderItemId={(senderType) => senderType.emailSenderTypePK}
        handleLookupSelection={handleSenderTypeSelection}
        MaintenanceProgram
      />
    </div>
  );
};

export default GeneralTab;
