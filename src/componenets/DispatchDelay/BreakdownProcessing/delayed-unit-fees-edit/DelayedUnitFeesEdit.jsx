import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../common/Header";
import CommonFooter from "../../../common/CommonFooter";
import { Col, Form, Row } from "react-bootstrap";
import TableListing from "./TableListing";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  resetSearchFilter,
  setBrowseData,
  setCheckDescriptionExist,
  setDescription,
  setDriverAmount,
  setEditMode,
  setEnableSave,
  setInvoiceAmount,
  setRadioValue,
  setReimbursement,
  setSelectedIndex,
  setEditFlag,
  setDisableSave,
  setDisplayFlag,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownFeesSlice";
import BreakdownFeesService from "../../../../services/DispatchDelay/BreakdownProcessing/BreakdownFeesService";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../../../common/ModalComponent";
import { toast } from "react-hot-toast";

const DelayedUnitFeesEdit = () => {
  const params = useParams();
  const breakdownFK = params.breakdownFK;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);
  const [saveFlag, setSaveFlag] = useState(true);
  const [deleteList, setDeleteList] = useState([]);
  const [deleteButtonFlag, setDeleteButtonFlag] = useState(false);
  const [cancelFlag, setCancelFlag] = useState(false);
  const [changedArray, setChangedArray] = useState([]);
  const {
    browseData,
    editMode,
    description,
    driverAmount,
    invoiceAmount,
    pay,
    reimbursement,
    radioValue,
    invoiced,
    selectedIndex,
    checkDescriptionExist,
    editFlag,
    allDriversPayTaxable,
    displayFlag,
    feeData,
    feeDriverFK,
  } = useSelector((state) => state.breakdownFeesReducer);
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");

  const isNumber = (value) => {
    if (!value) return value;
    const number = value?.replace(/[^\d:.]/g, "");

    if (value) return number;
  };

  //Used to set Radio button values
  useEffect(() => {
    if (radioValue === "Pay") {
      dispatch(setReimbursement(false));
    } else if (radioValue === "Reimburse") {
      dispatch(setReimbursement(true));
    }
  }, [radioValue]);

  // Handle delete

  const handleDelete = () => {
    if (selectedIndex !== null) {
      const recordToDelete = browseData[selectedIndex];

      // If record has a primary key, store it in deletedPKs list
      if (recordToDelete?.delayedUnitFeePK) {
        setDeleteList((prev) => [...prev, recordToDelete?.delayedUnitFeePK]);
      }

      const updatedList = browseData?.filter((_, index) => index !== selectedIndex);
      dispatch(setBrowseData(updatedList));
      dispatch(setSelectedIndex(null));
      dispatch(setEditMode(false));
      dispatch(resetChanges());
      dispatch(setEditFlag(false));

      setChangedArray((prev) => {
        const exists = prev?.some((item) => item?.description === recordToDelete?.description);

        if (exists) {
          // Remove it
          return prev?.filter((item) => item?.description !== recordToDelete?.description);
        } else {
          // Add it
          return [...prev, recordToDelete];
        }
      });
    } else {
      alert("Select a record to delete");
    }
  };
  //Save a record
  const handleSave = () => {
    if (selectedIndex !== null) {
      // Update the selected item in the list
      let isChanged = false;
      if (browseData[selectedIndex]?.delayedUnitFeePK) {
        const selectedItem = feeData[selectedIndex];
        setChangedArray((prev) => [...prev, selectedItem]);
        isChanged =
          selectedItem?.description !== description ||
          Number(selectedItem?.invoiceAmount)?.toFixed(2) !== Number(invoiceAmount)?.toFixed(2) ||
          Number(selectedItem?.driverAmount)?.toFixed(2) !== Number(driverAmount)?.toFixed(2) ||
          selectedItem?.reimbursement !== reimbursement;
      }

      const updatedList = browseData?.map((item, index) =>
        index === selectedIndex
          ? {
              ...item,
              description: description,
              invoiceAmount: invoiceAmount,
              driverAmount: driverAmount,

              reimbursment: reimbursement,
              invoiced: invoiced,
              changed: isChanged ? 1 : 0,
            }
          : item
      );
      dispatch(setBrowseData(updatedList));
      dispatch(setSelectedIndex(null));
    } else {
      // Add a new item to the list

      const newItem = {
        description: description,
        invoiceAmount: invoiceAmount,
        driverAmount: driverAmount,
        paid: 0,
        reimbursment: reimbursement,
        invoiced: 0, //when adding new record invoice=0
        delayedUnitFeePK: null,
        authorizedBy: "",
        delayedUnitBreakdownFK: breakdownFK,
        driverFK: null,
        invoiceFK: null,
        dispatchFK: null,
        delayedUnitFK: browseData?.length > 0 ? browseData[0]?.delayedUnitFK : null,
        unitFK: browseData?.length > 0 ? browseData[0]?.unitFK : null,
        delayedUnitDamageFK: null,
        changed: 0,
      };
      dispatch(setBrowseData([...browseData, newItem]));
      setChangedArray((prev) => [...prev, newItem]);
    }

    dispatch(setDisableSave(true));
    dispatch(setEditFlag(false));
    dispatch(resetChanges(false));
    dispatch(setEditMode(false));
  };

  //save validation
  useEffect(() => {
    const isDecimalValid = (val) => {
      const strVal = val?.toString() || "";
      const numVal = parseFloat(strVal);

      return strVal !== "" && strVal !== "." && strVal !== "0." && !strVal?.endsWith(".") && !isNaN(numVal);
    };

    const hasInvoice = invoiceAmount?.toString()?.trim() !== "";
    const hasDriver = driverAmount?.toString()?.trim() !== "";

    const isInvValid = isDecimalValid(invoiceAmount);
    const isDrvValid = isDecimalValid(driverAmount);

    let enableSave = false;

    if (hasInvoice && hasDriver) {
      // Both entered and valid → enable save only if both valid
      enableSave = isInvValid && isDrvValid;
    } else if (hasInvoice) {
      enableSave = isInvValid;
    } else if (hasDriver) {
      enableSave = isDrvValid;
    }

    if (description && !checkDescriptionExist && enableSave) {
      setSaveFlag(false); // Enable Save
    } else {
      setSaveFlag(true); // Disable Save
    }
  }, [description, invoiceAmount, driverAmount, checkDescriptionExist]);

  const isDescriptionUnique = (newDescription) => {
    const duplicate = browseData?.some(
      (item, index) =>
        index !== selectedIndex &&
        item.description?.toLowerCase()?.trim() === newDescription?.toLowerCase()?.trim()
    );

    dispatch(setCheckDescriptionExist(duplicate));

    // true if duplicate exists
  };

  //Footer Buttons
  const buttons = [
    {
      label: "Save",
      onClick: () => onSave(),
      disabled: changedArray?.length === 0 || (editMode && saveFlag),
    },
    { label: "Cancel", onClick: () => onCancel() },
  ];

  //usede to enable delete buttton when paid=0,invoiced=0
  useEffect(() => {
    const selectedItem = browseData[selectedIndex];

    if (selectedItem) {
      if (selectedItem?.delayedUnitFeePK) {
        if (!selectedItem?.paid && !selectedItem?.invoiced) {
          setDeleteButtonFlag(true);
        } else {
          setDeleteButtonFlag(false);
        }
      } else {
        setDeleteButtonFlag(true);
      }
    }
  }, [selectedIndex, browseData]);

  //cancel button
  const onCancel = () => {
    setCancelShow(true);
  };
  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    setCancelShow(false);
    navigate("/delayed-unit-fees-view/" + breakdownFK);
    dispatch(resetChanges());
    dispatch(setSelectedIndex(null));
    setChangedArray([]);
    dispatch(setEditFlag(false));
    dispatch(setEditMode(false));
    dispatch(setDisableSave(false));
    toast.success("Changes Cancelled");
  };

  //final save
  const saveData = {
    delayedUnitBreakDownFK: breakdownFK,
    companyName: breakdownCompanyName,
    delayedBreakdownFeesVOList: browseData,
    deleteList: deleteList,
  };
  const onSave = () => {
    setLoad(true);
    BreakdownFeesService.saveBreakdownFee(saveData)
      .then((res) => {
        setLoad(false);
        const data = res?.data;
        dispatch(resetChanges());
        dispatch(setDisableSave(false));
        dispatch(setDisplayFlag(false));
        dispatch(setEditFlag(false));
        dispatch(resetChanges(false));
        dispatch(setEditMode(false));
        dispatch(setSelectedIndex(null));
        setChangedArray([]);
        navigate("/breakdown-processing/view-breakdown/" + breakdownFK);
        toast.success("Delay Breakdown Fees record added");
      })
      .catch((err) => {
        setLoad(false);
        dispatch(setDisableSave(false));
        dispatch(resetChanges());
        dispatch(setDisplayFlag(false));
        dispatch(setEditFlag(false));
        dispatch(resetChanges(false));
        dispatch(setEditMode(false));
        dispatch(setSelectedIndex(null));
        setChangedArray([]);
        navigate("/breakdown-processing/view-breakdown/" + breakdownFK);
        toast.error(" Falied to add Delay Breakdown Fees record ");
      });
  };

  useEffect(() => {
    if (editMode && !driverAmount) {
      dispatch(setDriverAmount(0.0));
    }
    if (editMode && !invoiceAmount) {
      dispatch(setInvoiceAmount(0.0));
    }
  }, []);

  useEffect(() => {
    if (!displayFlag) {
      navigate("/breakdown-processing/view-breakdown/" + breakdownFK);
    }
  }, [displayFlag]);
  //used to disable inner cancel button
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
  }, [editMode, selectedIndex, description, invoiceAmount, driverAmount]);

  const invStr = invoiceAmount?.toString() || "";
  const drvStr = driverAmount?.toString() || "";

  return (
    <QuarterScreenWrapper>
      <Header
        programName="Delay Breakdown Fee"
        confirmClose
        closeModalTitle="Close Delay Breakdown Fee Changes"
        closeModalBody="Please confirm you want to close the program without saving your changes"
        closeConfirmationHandler={() => {
          dispatch(resetSearchFilter());
          dispatch(setSelectedIndex(null));
          dispatch(setEditFlag(false));
          dispatch(setEditMode(false));
          dispatch(setDisableSave(false));
          dispatch(setDisplayFlag(false));
        }}
        closeNavigationURL={`/breakdown-processing/view-breakdown/${breakdownFK}`}
      />
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0">
                <Col sm={12} md={12} lg={12} xl={12} xs={12} className="px-0">
                  <TableListing />
                  <Row className="mt-3">
                    <Col xs={8}>
                      <Form.Group className="align-items-center row  m-l-0 m-r-0 mb-3 ps-3 mt-5">
                        <Col sm={2} md={2} xs={2} className="p-0">
                          <Form.Label className="customColFormLabel">Description</Form.Label>
                        </Col>

                        <Col xs={5} md={5} sm={5} className="p-0">
                          <input
                            name="description"
                            id="description"
                            type="text"
                            className={`customFormControl ${
                              editFlag || !editMode
                                ? ""
                                : description && !checkDescriptionExist
                                  ? "borderGreen"
                                  : "borderRed"
                            }`}
                            value={description}
                            onChange={(e) => {
                              dispatch(setDescription(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                              dispatch(setCheckDescriptionExist(false));
                            }}
                            onBlur={(e) => isDescriptionUnique(e.target.value)}
                            disabled={!editMode || editFlag}
                            maxLength={60}
                            autoComplete="off"
                            aria-autocomplete="list"
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="align-items-center row  m-l-0 m-r-0 mb-3 ps-3 mt-4">
                        <Col sm={2} md={2} xs={2} className="p-0">
                          <Form.Label className="customColFormLabel">Invoice</Form.Label>
                        </Col>

                        <Col xs={2} className="p-0 w-75px">
                          <input
                            autoComplete="off"
                            aria-autocomplete="list"
                            name="description"
                            id="description"
                            type="text"
                            className={`customFormControl ${
                              !editMode || (invoiceAmount === "" && driverAmount !== "")
                                ? ""
                                : (invoiceAmount === "" && driverAmount === "") ||
                                    (invStr && (invStr === "." || invStr === "0.")) ||
                                    invStr?.endsWith(".")
                                  ? "borderRed"
                                  : "borderGreen"
                            }`}
                            value={invoiceAmount}
                            onInput={(e) => {
                              e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                                dispatch(setInvoiceAmount(isNumber(e.target.value)));
                            }}
                            disabled={!editMode}
                            maxLength={30}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="align-items-center row  m-l-0 m-r-0 mb-3 ps-3  mt-4">
                        <Col sm={2} md={2} xs={2} className="p-0">
                          <Form.Label className="customColFormLabel">Driver</Form.Label>
                        </Col>

                        <Col xs={2} className="p-0 w-75px">
                          <input
                            name="description"
                            id="description"
                            type="text"

                            className={`customFormControl ${
                              !editMode || !feeDriverFK || (invoiceAmount && driverAmount === "") || editFlag
                                ? ""
                                : (invoiceAmount === "" && driverAmount === "") ||
                                    (drvStr && (drvStr === "." || drvStr === "0.")) ||
                                    drvStr?.endsWith(".")
                                  ? "borderRed"
                                  : "borderGreen"
                            }`}
                            value={driverAmount}
                            onInput={(e) => {
                              e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                                dispatch(setDriverAmount(isNumber(e.target.value)));
                            }}
                            disabled={!editMode || editFlag || !feeDriverFK}
                            maxLength={30}
                            autoComplete="off"
                            aria-autocomplete="list"
                          />
                        </Col>
                        <Col className="ms-3">
                          <CustomRadioGroup
                            options={["Pay", "Reimburse"]}
                            horizontal
                            selectedOption={radioValue}
                            disabled={!editMode || editFlag || !feeDriverFK}
                            hidden={allDriversPayTaxable}
                            onChange={(option) => dispatch(setRadioValue(option))}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col xs={3} sm={3} md={3} lg={3} style={{ marginLeft: "55px" }}>
                      <div className="d-flex justify-content-end h-100">
                        <div className="d-flex flex-column justify-content-center">
                          <span className="p-1">
                            <button
                              disabled={editMode || selectedIndex != null}
                              className="btn btn-secondary font-12 btn-sm btn-medium-with"
                              type="button"
                              onClick={() => {
                                dispatch(setEditMode(true));
                                dispatch(setSelectedIndex(null));
                                dispatch(setEnableSave(true));
                                dispatch(setDisableSave(false));
                              }}
                            >
                              Add
                            </button>
                          </span>
                          <span className="p-1">
                            <button
                              className="btn btn-secondary font-12 btn-sm btn-medium-with"
                              type="button"
                              disabled={
                                selectedIndex === null ||
                                editMode ||
                                (driverAmount && invoiceAmount && invoiced && pay)
                              }
                              onClick={() => {
                                dispatch(setEditMode(true));
                                dispatch(setDisableSave(false));

                                if (driverAmount && invoiceAmount && !invoiced && pay) {
                                  dispatch(setEditFlag(true));
                                }
                              }}
                            >
                              Edit
                            </button>
                          </span>

                          <span className="p-1">
                            <button
                              className="btn btn-secondary font-12 btn-sm btn-medium-with"
                              type="button"
                              saveFlag
                              onClick={() => {
                                handleDelete();
                              }}
                              disabled={
                                selectedIndex === null ||
                                editMode ||
                                (driverAmount && invoiceAmount && invoiced && pay) ||
                                !deleteButtonFlag
                              }
                            >
                              Delete
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

                          <span className="p-1">
                            <button
                              className="btn btn-secondary font-12 btn-sm btn-medium-with"
                              type="button"
                              onClick={() => {
                                dispatch(resetChanges());
                                dispatch(setEditFlag(false));
                                dispatch(setEditMode(false));
                                dispatch(setDisableSave(false));
                                dispatch(setSelectedIndex(null));
                              }}
                              disabled={!cancelFlag}
                            >
                              Cancel
                            </button>
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <CommonFooter buttons={buttons} />
      {load && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}

      <ModalComponent
        show={cancelShow}
        onHide={handleCancelNo}
        title={"Cancel Delay Breakdown Fee Changes"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
    </QuarterScreenWrapper>
  );
};

export default DelayedUnitFeesEdit;
