import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { PaginationComponent } from "../../../common/PaginationComponent";
import PlantReleasesColumnsListiing from "./PlantReleasesColumnsListiing";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../common/Header";
import CommonFooter from "../../../common/CommonFooter";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  resetPlantReleaseColumnChanges,
  setAssignedPageNumber,
  setColumnId,
  setColumnsEditFormData,
  setColumnsEditMode,
  setColumnsSaveLoading,
  setFieldName,
  setFieldWidth,
  setIgnore,
  setKeyField,
  setPlantReleaseColumnList,
  setUpdateField,
  setViewDetail,
} from "../../../../redux/CustomerPlantReleasesSlice";
import { removeLeadingWhitespace } from "../../../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import CustomerPlantReleaseService from "../../../../services/CustomerPlantReleaseService";
import toast from "react-hot-toast";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import LoadingIcon from "../../../common/LoadingIcon";

const CustomerPlantReleasesColumns = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isFieldNameDuplicate, setIsFieldNameDuplicate] = useState(false);
  const [disableAdd, setDisableAdd] = useState(false);
  const [disableSave, setDisableSave] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateFieldName, setDuplicateFieldName] = useState("");

  const fieldName = useSelector((state) => state.customerPlantReleaseReducer.fieldName);
  const columnsEditMode = useSelector((state) => state.customerPlantReleaseReducer.columnsEditMode);
  const keyField = useSelector((state) => state.customerPlantReleaseReducer.keyField);
  const updateField = useSelector((state) => state.customerPlantReleaseReducer.updateField);
  const fieldWidth = useSelector((state) => state.customerPlantReleaseReducer.fieldWidth);
  const ignore = useSelector((state) => state.customerPlantReleaseReducer.ignore);
  const columnsEditFormData = useSelector((state) => state.customerPlantReleaseReducer.columnsEditFormData);
  const columnId = useSelector((state) => state.customerPlantReleaseReducer.columnId);
  const plantReleaseColumnList = useSelector(
    (state) => state.customerPlantReleaseReducer.plantReleaseColumnList
  );
  const assignedPageNumber = useSelector((state) => state.customerPlantReleaseReducer.assignedPageNumber);
  const columnListTotalPages = useSelector((state) => state.customerPlantReleaseReducer.columnListTotalPages);
  const columnListTotalElements = useSelector(
    (state) => state.customerPlantReleaseReducer.columnListTotalElements
  );
  const finalPaginatedArray = useSelector((state) => state.customerPlantReleaseReducer.finalPaginatedArray);
  const columnsSaveLoading = useSelector((state) => state.customerPlantReleaseReducer.columnsSaveLoading);
  const delimitedCheck = useSelector((state) => state.customerPlantReleaseReducer.delimitedCheck);

  const buttons = [
    {
      label: "Save",
      disabled: (!fieldName && disableAdd) || !plantReleaseColumnList?.length,
      onClick: () => {
        saveRecord();
      },
    },
  ];

  //to save the record in db
  const saveRecord = () => {
    dispatch(setColumnsSaveLoading(true));
    let payload = (plantReleaseColumnList || []).map((item, intex) => ({
      ...item,
      columnNumber: intex + 1,
    }));
    CustomerPlantReleaseService.savePlantReleaseColumnFields(id, payload)
      .then(() => {
        toast.success("Customer Plant Release Created");
        dispatch(resetPlantReleaseColumnChanges());
        dispatch(setViewDetail(true));
        dispatch(setColumnsEditMode(false));
        navigate(`/customer-plant-release-browse/${id}`);
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        dispatch(setColumnsSaveLoading(false));
      });
  };

  // Check if field name already exists in the column list
  const isFieldNameExists = (name, excludeColumnId = null) => {
    return plantReleaseColumnList?.some(
      (column) =>
        column.fieldName?.toLowerCase() === name?.toLowerCase() && column.columnNumber !== excludeColumnId
    );
  };

  //temporary save
  const handleSave = () => {
    // Check for duplicate field name
    if (fieldName && isFieldNameExists(fieldName, Number(columnId))) {
      setDuplicateFieldName(fieldName);
      setShowDuplicateModal(true);
      return;
    }
    if (Number(columnId)) {
      // Check if we are editing an existing column
      dispatch(
        setPlantReleaseColumnList({
          actionType: "update",
          payload: {
            columnNumber: columnId,
            fieldName: fieldName,
            keyField: keyField,
            updateField: updateField,
            ignore: ignore,
            fieldWidth: fieldWidth,
          },
        })
      );
    } else {
      // If it's a new column
      dispatch(
        setPlantReleaseColumnList({
          actionType: "add",
          payload: {
            customerPlantReleaseColumnPK: null,
            fieldName: fieldName,
            keyField: keyField,
            updateField: updateField,
            ignore: ignore,
            fieldWidth: fieldWidth,
          },
        })
      );
    }
    dispatch(setColumnId(null));
    setDisableAdd(false);
    dispatch(setColumnsEditMode(false));
    dispatch(setColumnsEditFormData(null));
    dispatch(resetPlantReleaseColumnChanges());
  };

  const handleDelete = () => {
    if (Number(columnId)) {
      dispatch(
        setPlantReleaseColumnList({
          actionType: "delete",
          payload: columnId,
        })
      );
    }
    dispatch(setColumnsEditFormData(null));
    dispatch(setColumnId(null));
    setDisableAdd(false);
  };

  const paginationProps = {
    pageNumber: assignedPageNumber,
    setPageNumber: setAssignedPageNumber,
    totalPages: columnListTotalPages,
    totalElements: columnListTotalElements,
    listingData: finalPaginatedArray,
    recordsPerPage: QuarterScreen_RecordsPerPage,
  };

  const isNumber = (value) => {
    if (!value) return value;
    const number = value?.replace(/[^\d]/g, "");

    if (value) return number;
  };

  const onClose = () => {
    // dispatch(resetChanges())
    dispatch(resetPlantReleaseColumnChanges());
    dispatch(setColumnsEditMode(false));
  };

  useEffect(() => {
    dispatch(setColumnsEditMode(false));
    // dispatch(resetChanges())
    dispatch(resetPlantReleaseColumnChanges());
  }, []);

  return (
    <QuarterScreenWrapper>
      <Header closeHandler={() => onClose()} closeNavigationURL={`/customer-plant-release-browse/${id}`} />
      {columnsSaveLoading && <LoadingIcon />}
      <div className="border border-2 border-right-0 border-left-0 ">
        <div className="">
          <div className=" w-100">
            <Row className="groupsMaintenanceQuarterScreenHeight">
              {/* Form Content */}
              <div className={`col-6`}>
                <div className="mx-3">
                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 m-t-100">
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
                        className={`customFormControl ${
                          columnsEditMode ? (!fieldName ? "borderRed" : "borderGreen") : ""
                        }`}
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                    <Col xs={3} md={3} sm={3} className="p-0">
                      <Form.Label className={"col-form-label font-13 ps-2"}> Key Field </Form.Label>
                    </Col>
                    <Col xs={3} md={3} sm={3} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="ignore"
                        name="ignore"
                        checked={keyField}
                        disabled={!columnsEditMode}
                        onChange={(e) => {
                          dispatch(setKeyField(e.target.checked));
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
                    <Col xs={3} md={3} sm={3} className="p-0">
                      <Form.Label className={"col-form-label font-13 ps-2"}> Update field </Form.Label>
                    </Col>
                    <Col xs={3} md={3} sm={3} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="ignore"
                        name="ignore"
                        checked={updateField}
                        disabled={!columnsEditMode}
                        onChange={(e) => {
                          dispatch(setUpdateField(e.target.checked));
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0 ">
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
                        className={`customFormControl 
                          `}
                        id="fieldWidth"
                        name="fieldWidth"
                        type="text"
                        value={fieldWidth}
                        maxLength={6}
                        disabled={delimitedCheck || !columnsEditMode}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          dispatch(setFieldWidth(isNumber(removeLeadingWhitespace(e.target.value))));
                        }}
                      />
                    </Col>
                  </Form.Group>
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
                      dispatch(setColumnsEditMode(true));
                    }}
                    disabled={disableAdd || columnsEditFormData}
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
                      dispatch(setColumnsEditMode(true));
                      setDisableAdd(true);
                    }}
                    disabled={!columnsEditFormData}
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
                      dispatch(resetPlantReleaseColumnChanges());
                      dispatch(setColumnsEditFormData(null));
                      dispatch(setColumnId(null));
                      setDisableAdd(false);
                      dispatch(setColumnsEditMode(false));
                    }}
                    disabled={!(columnsEditFormData || disableAdd)}
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
                    disabled={disableSave || !disableAdd || (columnsEditMode && !fieldName)}
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
                style={{}}
              >
                <div className="d-flex h-100 p-0">
                  <div className="w-100">
                    <PlantReleasesColumnsListiing
                      handleOnClick={() => {
                        setDisableAdd(false);
                        dispatch(setColumnsEditMode(false));
                      }}
                    />
                  </div>
                  <PaginationComponent
                    {...paginationProps}
                    firstPage
                    lastPage
                    singleArrowUp
                    singleArrowDown
                    hideBorderRight
                    hideBorderTop
                    hideBorderBottom
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <CommonFooter buttons={buttons} />
      {/* Duplicate Field Name Modal */}
      <Modal
        show={showDuplicateModal}
        onHide={() => setShowDuplicateModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="font-18 h-100">Duplicate Field Name</Modal.Title>
        </Modal.Header>
        <Modal.Body className="font-14 h-100">
          Field name "{duplicateFieldName}" already exists. Please use a unique field name.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowDuplicateModal(false);
              dispatch(setColumnId(null));
              setDisableAdd(false);
              dispatch(setColumnsEditMode(false));
              dispatch(resetPlantReleaseColumnChanges());
              dispatch(setColumnsEditFormData(null));
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </QuarterScreenWrapper>
  );
};

export default CustomerPlantReleasesColumns;
