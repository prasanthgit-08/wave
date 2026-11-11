import React, { useState } from "react";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import { Col, Form, FormGroup, Row } from "react-bootstrap";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingText from "../../../common/LoadingText";
import CustomerOrderColumnsListing from "./CustomerOrderColumnsListing";
import {
  setColumnFooterDisableSave,
  setColumnId,
  setColumnsEditFormData,
  setCustomerOrdersColumnList,
  setDeleteList,
  setFieldName,
  setFieldWidth,
  setFromField,
  setFromValue,
  setIgnore,
  setSaveList,
  setSplitField,
  setSplitFieldSeq,
  setToField,
  setUpdateList,
  setViewDetail,
} from "../../../../redux/CustomerOrdersSlice";
import CustomerOrderColumnsService from "../../../../services/CustomerOrderColumnsService";
import { fetchData } from "./CustomerOrderColumnsListing";
import { removeLeadingWhitespace } from "../../../../utils/utils";
const CustomerOrderColumnsContent = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableAll, setDisableAll] = useState(true);
  const [disableAdd, setDisableAdd] = useState(false);
  const [disableDelete, setDisableDelete] = useState(true);
  const [disableEdit, setDisableEdit] = useState(true);
  const [disableSave, setDisableSave] = useState(false);
  const [columnsEditMode, setColumnsEditMode] = useState(false);

  //const id = params.customerOrderPK;
  const { id } = useParams();
  const pageNumber = params.pageNumber;
  const viewDetail = useSelector((state) => state.customerOrdersReducer.viewDetail);
  const loading = useSelector((state) => state.customerOrdersReducer.loading);
  const assignedCustomerOrdersList = useSelector(
    (state) => state.customerOrdersReducer.assignedCustomerOrdersList
  );
  const fieldWidth = useSelector((state) => state.customerOrdersReducer.fieldWidth);
  const fieldName = useSelector((state) => state.customerOrdersReducer.fieldName);
  const ignore = useSelector((state) => state.customerOrdersReducer.ignore);
  const fromField = useSelector((state) => state.customerOrdersReducer.fromField);
  const fromValue = useSelector((state) => state.customerOrdersReducer.fromValue);
  const toField = useSelector((state) => state.customerOrdersReducer.toField);
  const splitField = useSelector((state) => state.customerOrdersReducer.splitField);
  const splitFieldSeq = useSelector((state) => state.customerOrdersReducer.splitFieldSeq);
  const columnId = useSelector((state) => state.customerOrdersReducer.columnId);
  const columnsEditFormData = useSelector((state) => state.customerOrdersReducer.columnsEditFormData);
  const customerOrdersColumnList = useSelector(
    (state) => state.customerOrdersReducer.customerOrdersColumnList
  );
  const delimitedCheck = useSelector((state) => state.customerOrdersReducer.delimitedCheck);

  /* Type of File whether it is CSSMathValue,txt,xlsx
   */
  const radioValue = useSelector((state) => state.customerOrdersReducer.radioValue);

  const [errorMsg, setErrorMsg] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [customerOrderColumns, setCustomerOrderColumns] = useState([]);
  // const [isDuplicateFieldNameInFrontend, setIsDuplicateFieldNameInFrontend] = useState(false);
  const [isFieldNameDuplicate, setIsFieldNameDuplicate] = useState(false);
  const [isFromFieldValid, setIsFromFieldValid] = useState(true);
  const [isFromValueValid, setisFromValueValid] = useState(true);
  const [isTofieldValid, setisTofieldValid] = useState(true);
  const [isSplitFieldSequenceDuplicate, setisSplitFieldSequenceDuplicate] = useState(false);
  const [isSplitFieldseqDuplicateFront, setisSplitFieldseqDuplicateFront] = useState(false);

  /** Populate/Clear form data from selected object in Columns Table*/
  useEffect(() => {
    dispatch(setFieldName(columnsEditFormData?.FieldName || columnsEditFormData?.fieldName || ""));

    const fieldWidth =
      columnsEditFormData?.FieldWidth != null
        ? columnsEditFormData.FieldWidth
        : columnsEditFormData?.fieldWidth != null
          ? columnsEditFormData.fieldWidth
          : "";
    dispatch(setFieldWidth(fieldWidth !== "" ? fieldWidth : null));
    dispatch(setIgnore(columnsEditFormData?.Ignore || columnsEditFormData?.ignore || false));
    dispatch(setFromField(columnsEditFormData?.FromField || columnsEditFormData?.fromField || ""));
    dispatch(setFromValue(columnsEditFormData?.FromValue || columnsEditFormData?.fromValue || ""));
    dispatch(setToField(columnsEditFormData?.ToField || columnsEditFormData?.toField || ""));
    dispatch(setSplitField(columnsEditFormData?.SplitField || columnsEditFormData?.splitField || false));

    const fieldSequence =
      columnsEditFormData?.FieldSequence != null
        ? columnsEditFormData.FieldSequence
        : columnsEditFormData?.fieldSequence != null
          ? columnsEditFormData.fieldSequence
          : "";
    dispatch(setSplitFieldSeq(fieldSequence !== "" ? fieldSequence : null));
    setIsFieldNameDuplicate(false);
    setisSplitFieldSequenceDuplicate(false);
  }, [columnsEditFormData]);

  /**Receive the input of Fromfield,FromValue and Tofield*/
  const sanitizeDotInput = (value, callback) => {
    if (value === ".") {
      return "";
    }
    /**Check if the value contains more than one '.' at the last position*/
    if (value?.endsWith(".") && (value?.match(/\./g) || [])?.length > 1) {
      return; /*If more than one '.' and the last character is '.', return without doing anything*/
    }

    callback(value);
  };
  /**Check whether a valid Table and column for Fromfield,from value and Tofield */
  const validateTableColumn = (value, apiResponseCallback, invalidCallback) => {
    const tableInfo = value?.split(".");
    if (tableInfo?.length > 1) {
      CustomerOrderColumnsService.checkTableAndColumnExist(tableInfo[0], tableInfo[1])
        .then((response) => {
          apiResponseCallback(response?.data);
        })
        .catch(() => invalidCallback());
    } else {
      invalidCallback();
    }
  };

  const checkDuplicateFieldName = (fieldName, currentId, list) => {
    let isDuplicate = false;

    for (const item of list) {
      const isSameName = item.fieldName?.trim()?.toLowerCase() === fieldName?.trim()?.toLowerCase();

      if (currentId !== undefined && currentId !== null) {
        if (isSameName && item.id !== currentId) {
          isDuplicate = true;
          break;
        }
      } else {
        if (isSameName) {
          isDuplicate = true;
          break;
        }
      }
    }

    setIsFieldNameDuplicate(isDuplicate);
  };

  /**
   * Create SaveObject for SaveList and UpdateList
   */
  const handleSave = () => {
    if (customerOrdersColumnList?.length > 0 && splitField) {
      const result = customerOrdersColumnList?.some(
        (item) =>
          item.id !== columnsEditFormData?.id &&
          item.toField === toField &&
          Number(item.fieldSequence) === Number(splitFieldSeq || 0)
      );

      if (result) {
        setisSplitFieldSequenceDuplicate(true);
        return;
      }
    }

    if (Number(columnsEditFormData?.id) >= 0) {
      // Check if we are editing an existing column
      dispatch(
        setCustomerOrdersColumnList({
          actionType: "update",
          payload: {
            id: columnsEditFormData?.id,
            fieldName: fieldName,
            ignore: ignore,
            fieldWidth: fieldWidth,
            fromField: fromField,
            fromValue: fromValue,
            toField: toField,
            splitField: splitField,
            fieldSequence: splitFieldSeq,
          },
        })
      );
    } else {
      // If it's a new column, we are adding it
      dispatch(
        setCustomerOrdersColumnList({
          actionType: "add",
          payload: {
            fieldName: fieldName,
            ignore: ignore,
            fieldWidth: fieldWidth,
            fromField: fromField,
            fromValue: fromValue,
            toField: toField,
            splitField: splitField,
            fieldSequence: splitFieldSeq,
          },
        })
      );
    }

    dispatch(setColumnId(null));
    setDisableAdd(false);
    setColumnsEditMode(false);
    clearColumnsForm();
  };

  const handleDelete = () => {
    if (Number(columnId) >= 0) {
      dispatch(
        setCustomerOrdersColumnList({
          actionType: "delete",
          payload: columnId,
        })
      );
    }
    dispatch(setColumnsEditFormData(null));
    dispatch(setColumnId(null));
    setDisableAdd(false);
  };

  /*to clear the fields*/
  const clearColumnsForm = () => {
    dispatch(setFieldName(""));
    dispatch(setFieldWidth(""));
    dispatch(setIgnore(""));
    dispatch(setFromField(""));
    dispatch(setFromValue(""));
    dispatch(setToField(""));
    dispatch(setSplitField(""));
    dispatch(setSplitFieldSeq(""));
    setIsFieldNameDuplicate(false);
    setIsFromFieldValid(true);
    setisFromValueValid(true);
    setisTofieldValid(true);
    setisSplitFieldSequenceDuplicate(false);
    setisSplitFieldseqDuplicateFront(false);
  };
  /* Used to enter only number while input in the  number only fields
   */
  const isNumber = (value) => {
    if (!value) return value;
    const number = value?.replace(/[^\d]/g, "");

    if (value) return number;
  };

  // const result = customerOrdersColumnList?.some((item)=>item.toField==toField && (Number(item.fieldSequence)==(e.target.value || 0)))
  useEffect(() => {
    if (radioValue === "CSV" || radioValue === "XLSX") {
      dispatch(setFieldWidth(0));
    }
  }, [radioValue]);
  /*   clear the Split field Sequence if SplitField is false
   */
  useEffect(() => {
    if (!splitField) {
      dispatch(setSplitFieldSeq(""));
    }
  }, [splitField]);
  /*   Clear the Fromfield,FromValue and toField if ignore is true
   */
  useEffect(() => {
    if (ignore) {
      dispatch(setFromField(""));
      dispatch(setFromValue(""));
      dispatch(setToField(""));
      dispatch(setSplitField(false));
    }
  }, [ignore]);

  useEffect(() => {
    if (id && columnId) {
      if (columnsEditMode) {
        setIsFieldNameDuplicate(false);
      }
    }
  }, [columnsEditMode]);

  /*   Enable and disable save button
   */
  useEffect(() => {
    if (
      columnsEditMode &&
      fieldName !== "" &&
      !isFieldNameDuplicate &&
      (!(radioValue === "TXT") || fieldWidth !== "") &&
      ((ignore && !fromField && !fromValue && !toField) ||
        (!ignore &&
          fromField &&
          isFromFieldValid &&
          fromValue &&
          isFromValueValid &&
          toField &&
          isTofieldValid) ||
        (!ignore && !fromField && !fromValue && toField && isTofieldValid)) &&
      ((splitField && splitFieldSeq) || !splitField)
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    columnsEditMode,
    fieldName,
    isFieldNameDuplicate,
    radioValue,
    fieldWidth,
    ignore,
    fromField,
    fromValue,
    toField,
    splitField,
    splitFieldSeq,
    isFromFieldValid,
    isFromValueValid,
    isTofieldValid,
  ]);

  useEffect(() => {
    if (
      columnsEditMode &&
      (!fieldName || isFieldNameDuplicate || !toField || (splitField && !splitFieldSeq))
    ) {
      dispatch(setColumnFooterDisableSave(true));
    } else {
      dispatch(setColumnFooterDisableSave(false));
    }
  }, [columnsEditMode, fieldName, isFieldNameDuplicate, toField, splitField, splitFieldSeq]);

  return (
    <div className="border border-dark border-2 border-right-0 border-left-0 ">
      <div className="">
        <div className=" w-100">
          <Row className="groupsMaintenanceQuarterScreenHeight">
            {/* Form Content */}
            <div className={`col-6`}>
              <div className="mx-3">
                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className={"col-form-label font-13 ps-2"}>Field Name</Form.Label>
                  </Col>
                  <Col xs={8} md={8} className="p-0">
                    <input
                      id="fieldName"
                      name="fieldName"
                      type="text"
                      value={fieldName}
                      maxLength={30}
                      disabled={!columnsEditMode}
                      autoComplete="off"
                      onChange={(e) => {
                        dispatch(setFieldName(removeLeadingWhitespace(e.target.value)));
                      }}
                      onBlur={(e) => {
                        checkDuplicateFieldName(fieldName, columnId, customerOrdersColumnList);
                      }}
                      className={`customFormControl ${
                        columnsEditMode
                          ? fieldName?.length >= 1
                            ? isFieldNameDuplicate
                              ? "borderRed"
                              : "borderGreen"
                            : "borderRed"
                          : ""
                      }`}
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                  {" "}
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className={"col-form-label font-13 ps-2"}> Ignore </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="ignore"
                      name="ignore"
                      checked={ignore}
                      disabled={!columnsEditMode}
                      onChange={(e) => {
                        dispatch(setIgnore(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className={"col-form-label font-13 ps-2"}> Field Width </Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      className={`${styles.formControl} ${
                        !columnsEditMode || (radioValue === "TXT" && fieldWidth !== "")
                          ? ""
                          : fieldWidth === "" && radioValue === "TXT"
                            ? "borderRed"
                            : ""
                      }`}
                      id="fieldWidth"
                      name="fieldWidth"
                      type="text"
                      value={fieldWidth}
                      maxLength={6}

                      disabled={!columnsEditMode || ignore || !!delimitedCheck}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onInput={(e) => {
                        dispatch(setFieldWidth(isNumber(removeLeadingWhitespace(e.target.value))));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className={"col-form-label font-13 ps-2"}>From Field</Form.Label>
                  </Col>
                  <Col xs={8} md={8} className="p-0">
                    <input
                      className={`customFormControl ${
                        columnsEditMode ? (fromField ? (isFromFieldValid ? "" : "borderRed") : "") : ""
                      }`}
                      id="fromField"
                      name="fromField"
                      type="text"
                      value={fromField}
                      maxLength={30}
                      disabled={!columnsEditMode || ignore}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        sanitizeDotInput(e.target.value, (value) =>
                          dispatch(setFromField(removeLeadingWhitespace(e.target.value)))
                        );
                        setIsFromFieldValid(true);
                      }}
                      onBlur={(e) => {
                        validateTableColumn(
                          e.target.value,
                          (value) => setIsFromFieldValid(value),
                          () => setIsFromFieldValid(true)
                        );
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className={"col-form-label font-13 ps-2"}>From Value</Form.Label>
                  </Col>
                  <Col xs={8} md={8} className="p-0">
                    <input
                      className={`${styles.formControl} ${
                        columnsEditMode
                          ? !ignore && fromField
                            ? isFromFieldValid && fromValue && isFromValueValid
                              ? "borderGreen"
                              : "borderRed"
                            : "borderBlack"
                          : ""
                      }`}

                      id="fromValue"
                      name="fromValue"
                      type="text"
                      value={fromValue}
                      maxLength={30}
                      disabled={!columnsEditMode || ignore}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        sanitizeDotInput(e.target.value, (value) =>
                          dispatch(setFromValue(removeLeadingWhitespace(e.target.value)))
                        );
                        setisFromValueValid(true);
                      }}
                      onBlur={(e) => {
                        validateTableColumn(
                          e.target.value,
                          (value) => setisFromValueValid(value),
                          () => setisFromValueValid(true)
                        );
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className={"col-form-label font-13 ps-2"}>To Field</Form.Label>
                  </Col>
                  <Col xs={8} md={8} className="p-0">
                    <input
                      className={`${styles.formControl} ${
                        columnsEditMode && !ignore
                          ? !ignore && toField && isTofieldValid
                            ? "borderGreen"
                            : "borderRed"
                          : ""
                      }`}
                      id="toField"
                      name="toField"
                      type="text"
                      value={toField}
                      maxLength={30}
                      disabled={!columnsEditMode || ignore}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onBlur={(e) => {
                        validateTableColumn(
                          e.target.value,
                          (value) => setisTofieldValid(value),
                          () => setisTofieldValid(true)
                        );
                      }}
                      onChange={(e) => {
                        sanitizeDotInput(e.target.value, (value) =>
                          dispatch(setToField(removeLeadingWhitespace(e.target.value)))
                        );
                        setisTofieldValid(true);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className={"col-form-label font-13 ps-2"}> Split Field </Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="splitField"
                      name="splitField"
                      checked={splitField}
                      disabled={!columnsEditMode || ignore}
                      onChange={(e) => {
                        dispatch(setSplitField(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <Form.Label className={"col-form-label font-13 ps-2"}> Field Sequence </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <input
                      className={`${styles.formControl} ${
                        columnsEditMode
                          ? splitField
                            ? splitFieldSeq && splitFieldSeq > 0 && !isSplitFieldSequenceDuplicate
                              ? // &&!isSplitFieldseqDuplicateFront
                                "borderGreen"
                              : "borderRed"
                            : ""
                          : ""
                      }`}
                      id="splitFieldSeq"
                      name="splitFieldSeq"
                      type="text"
                      value={splitFieldSeq}
                      maxLength={6}
                      disabled={!columnsEditMode || !splitField}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        const rawValue = isNumber(removeLeadingWhitespace(e.target.value));
                        // Block typing "0" as the very first digit
                        if (rawValue === "0") {
                          return;
                        }
                        // Block any leading zero followed by more digits (e.g. "01", "007")
                        if (/^0\d+/.test(rawValue)) {
                          return;
                        }
                        dispatch(setSplitFieldSeq(rawValue));
                        setisSplitFieldSequenceDuplicate(false);
                      }}
                      onBlur={(e) => {}}
                    />
                  </Col>
                </Form.Group>
                <Row className={`${columnsEditMode && isSplitFieldSequenceDuplicate ? "" : "hide-elements"}`}>
                  <Col xs={2} md={2} sm={2}></Col>
                  <Col style={{ height: "35px" }}>
                    <p className="mb-0 text-danger">
                      {" "}
                      Field Sequence "{splitFieldSeq} "already exists for the selected Unit.
                    </p>
                  </Col>
                </Row>
              </div>
            </div>

            {/* Buttons */}
            <Col xs={2}>
              <Form.Group className="hide-elements mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <input type="text" className="customFormControl" hidden />
              </Form.Group>
              <Form.Group className="hide-elements mt-2 form-group  align-items-center row  m-l-0 m-r-0 ">
                <input type="text" className="customFormControl" />
              </Form.Group>

              <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0">
                <button
                  className="btn btn-secondary font-12 btn-sm btn-medium-with"
                  style={{ width: "80px" }}
                  type=""
                  onClick={() => {
                    dispatch(setColumnsEditFormData(null));
                    dispatch(setColumnId(null));
                    setIsFieldNameDuplicate(false);

                    setDisableAdd(true);
                    setColumnsEditMode(true);
                  }}
                  disabled={disableAdd}
                >
                  Add
                </button>
              </Form.Group>

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <button
                  className="btn btn-secondary font-12 btn-sm btn-medium-with"
                  style={{ width: "80px" }}
                  type=""
                  onClick={() => {
                    setColumnsEditMode(true);
                    setDisableAdd(true);
                  }}
                  disabled={!columnsEditFormData || columnsEditMode}
                >
                  Edit
                </button>
              </Form.Group>

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <button
                  className="btn btn-secondary font-12 btn-sm btn-medium-with"
                  style={{ width: "80px" }}
                  type=""
                  onClick={() => {
                    clearColumnsForm();
                    dispatch(setColumnsEditFormData(null));
                    dispatch(setColumnId(null));
                    setDisableAdd(false);
                    setColumnsEditMode(false);
                  }}
                  disabled={!columnsEditMode}
                >
                  Cancel
                </button>
              </Form.Group>

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <button
                  className="btn btn-secondary font-12 btn-sm btn-medium-with"
                  style={{ width: "80px" }}
                  type=""
                  onClick={handleSave}
                  disabled={disableSave}
                >
                  Save
                </button>
              </Form.Group>

              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <button
                  className="btn btn-secondary font-12 btn-sm btn-medium-with"
                  style={{ width: "80px" }}
                  type=""
                  onClick={handleDelete}
                  disabled={!columnsEditFormData || columnsEditMode}
                >
                  Delete
                </button>
              </Form.Group>
            </Col>

            {/* Table Listing */}
            <Col
              xs={4}
              className="row border border-dark border-top-0 border-bottom-0 border-right-0 p-0"
              style={{ height: "100%", overflow: "hidden" }}
            >
              <div className="d-flex h-100 p-0">
                <div className="w-100 h-100">
                  <CustomerOrderColumnsListing
                    handleOnClick={() => {
                      setDisableAdd(false);
                      setColumnsEditMode(false);
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderColumnsContent;
