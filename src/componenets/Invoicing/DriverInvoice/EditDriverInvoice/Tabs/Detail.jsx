import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  setInvoiceDetailsData,
  setInvoiceDetailPK,
  setManualSaveFlag,
  setDetailAddFlag,
  setTotalAmount,
  setSum,
  setIsDetailTabValid,
  setDescriptionValid,
} from "../../../../../redux/DriverInvoiceSlice";

function Detail() {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [enableSave, setEnableSave] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [viewDetail, setViewDetail] = useState(false);
  const [saveDetails, setSaveDetails] = useState([]);
  const [addFlag, setAddFlag] = useState(false);

  const invoiceDetailsData = useSelector((state) => state.driverInvoiceReducer.invoiceDetailsData);
  const invoiceDetailPK = useSelector((state) => state.driverInvoiceReducer.invoiceDetailPK);
  const manualEntryData = useSelector((state) => state.driverInvoiceReducer.manualEntryData);
  const totalAmount = useSelector((state) => state.driverInvoiceReducer.totalAmount);
  const sum = useSelector((state) => state.driverInvoiceReducer.sum);
  const [forceRender, setForceRender] = useState(false);

  const totalAmountSum = invoiceDetailsData?.reduce(
    (sum, invoiceDetail) => sum + parseFloat(invoiceDetail.totalAmount || 0),
    0
  );

  useEffect(() => {
    const changedArray = invoiceDetailsData?.filter(
      (invoice) =>
        invoice.description !== invoice.previousDescription ||
        invoice.totalAmount !== invoice.previousTotalAmount
    );
  }, [invoiceDetailsData]);
  useEffect(() => {
    if (invoiceDetailsData && selectedIndex) {
      setDescription(invoiceDetailsData[selectedIndex]?.description || "");
      dispatch(setTotalAmount(invoiceDetailsData[selectedIndex]?.totalAmount || 0)); // Update selected PK
    } else {
      setDescription("");
      dispatch(setTotalAmount(0));
    }
  }, [selectedIndex]);

  const handleClick = (invoiceDetail, index) => {
    dispatch(setInvoiceDetailPK(invoiceDetail.invoiceDetailPK));
    setSelectedIndex(index);
    setDescription(invoiceDetail.description);
    dispatch(setTotalAmount(invoiceDetail.totalAmount));
    setEditMode(false);
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      const updatedList = invoiceDetailsData?.filter((_, index) => index !== selectedIndex);

      dispatch(setInvoiceDetailsData({ type: "set", payload: updatedList }));

      setSelectedIndex(null);
      setEditMode(false);
      setDescription("");
      dispatch(setTotalAmount(0));
    }
  };
  const handleSave = () => {
    let updatedList;
    if (editMode && selectedIndex !== null) {
      updatedList = invoiceDetailsData.map((item, index) =>
        index === selectedIndex ? { ...item, totalAmount, description } : item
      );
    } else {
      updatedList = [...invoiceDetailsData, { totalAmount, description }];
    }

    dispatch(setInvoiceDetailsData({ type: "set", payload: updatedList }));
    const totalSum = updatedList?.reduce((sum, item) => sum + (parseFloat(item.totalAmount) || 0), 0);
    dispatch(setSum(totalSum));
    setEnableSave(false);
    setEditMode(false);
    dispatch(setTotalAmount(0));
    setDescription("");
    setAddFlag(false);
  };

  const handleRemoveRecord = (idToRemove) => {
    const updatedData = invoiceDetailsData?.filter((item) => item.invoiceDetailPK !== idToRemove);
    setSaveDetails({
      ...saveDetails,
      invoiceDetails: updatedData,
    });
  };

  useEffect(() => {
    if (selectedIndex !== null && invoiceDetailsData[selectedIndex]) {
      setDescription(invoiceDetailsData[selectedIndex].description || "");
      dispatch(setTotalAmount(invoiceDetailsData[selectedIndex].totalAmount || 0));
    } else {
      setDescription("");
      dispatch(setTotalAmount(0));
    }
  }, [selectedIndex, invoiceDetailsData]);
  useEffect(() => {
    if (selectedIndex !== null && invoiceDetailsData[selectedIndex]) {
      setDescription(invoiceDetailsData[selectedIndex].description || "");
      dispatch(setTotalAmount(invoiceDetailsData[selectedIndex].totalAmount || 0));
    } else {
      setDescription("");
      dispatch(setTotalAmount(0));
    }
  }, [selectedIndex, invoiceDetailsData]);
  useEffect(() => {
    if (manualEntryData != null && manualEntryData.name !== null) {
      dispatch(setManualSaveFlag(true));
    } else {
      dispatch(setManualSaveFlag(false));
    }
  }, [manualEntryData]);
  useEffect(() => {
    dispatch(setDetailAddFlag(false));
    // dispatch(setInvoiceDetailsData({ type: "clear" }));
  }, []);
  useEffect(() => {
    if (addFlag && !description && totalAmount >= 0) {
      dispatch(setDetailAddFlag(true));
    } else {
      dispatch(setDetailAddFlag(false));
    }
  }, [description, addFlag, dispatch]);

  useEffect(() => {
    const totalSum = invoiceDetailsData?.reduce(
      (sum, invoiceDetail) => sum + (parseFloat(invoiceDetail.totalAmount) || 0),
      0
    );
    dispatch(setSum(totalSum));
  }, [invoiceDetailsData, dispatch]);

  useEffect(() => {
    if (description || sum > 0) {
      dispatch(setIsDetailTabValid(true));
    } else {
      dispatch(setIsDetailTabValid(false));
    }
  }, [description, invoiceDetailsData, sum]);

  useEffect(() => {
    setDescription("");
    dispatch(setTotalAmount(0));
    setSelectedIndex(null);
  }, []);

  useEffect(() => {
    setSelectedIndex(null);
    setDescription("");
    dispatch(setTotalAmount(0));
    setEnableSave(false);
    setEditMode(false);
    setAddFlag(false);
  }, []);

  useEffect(() => {
    setForceRender((prev) => !prev);
  }, [dispatch]);

  useEffect(() => {
    setForceRender((prev) => !prev);
  }, [dispatch]);

  useEffect(() => {
    if (editMode && !description) {
      dispatch(setDescriptionValid(false));
    } else {
      dispatch(setDescriptionValid(true));
    }
  }, [dispatch, description, editMode]);
  const handleCancel = () => {
    setDescription("");
    dispatch(setTotalAmount(0));
    setEditMode(false);
    setSelectedIndex(null);
    setAddFlag(false);
  };

  const isInvalidDecimal = (value) => {
    const trimmed = value?.toString()?.trim();

    return trimmed === "." || /^(\d+)\.$/.test(trimmed);
  };

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border" style={{ height: "500px" }}>
        <div className="ps-1 pe-1 mb-4">
          <Row hidden={viewDetail}>
            <Col xs={10} className="ps-3">
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceNumber">
                    Amount
                  </Form.Label>
                </Col>

                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    className={`customFormControl ${
                      !viewDetail && editMode
                        ? totalAmount < 0 || isInvalidDecimal(totalAmount)
                          ? "borderRed"
                          : ""
                        : ""
                    }`}
                    id="unitNumber"
                    name="unitNumber"
                    value={totalAmount}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        dispatch(setTotalAmount(e.target.value));
                    }}
                    maxLength={10}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled={!editMode}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceNumber">
                    Description
                  </Form.Label>
                </Col>

                <Col xs={5} md={5} sm={5} className="p-0">
                  <input
                    className={`customFormControl ${
                      !viewDetail && editMode ? (description === "" ? "borderRed" : "borderGreen") : ""
                    }`}
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    onBeforeInput={(e) => {
                      if (e.data === " " && e.target.value?.trim().length === 0) {
                        e.preventDefault();
                      }
                    }}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled={!editMode}
                    maxLength={60}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col xs={2} className="d-block">
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type=""
                disabled={description || totalAmount > 0 || editMode}
                onClick={() => {
                  setEditMode(true);
                  setEnableSave(true);
                  setAddFlag(true);
                  setSelectedIndex(null);
                }}
              >
                Add
              </button>
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type=""
                disabled={selectedIndex === null || editMode}
                onClick={() => {
                  setEditMode(true);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type="button"
                disabled={
                  !description ||
                  totalAmount === "" ||
                  totalAmount === null ||
                  !editMode ||
                  isInvalidDecimal(totalAmount)
                }
                onClick={handleSave}
              >
                Save
              </button>

              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type=""
                disabled={selectedIndex === null || editMode}
                onClick={() => {
                  handleRemoveRecord(invoiceDetailPK);
                  handleDelete();
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type=""
                onClick={handleCancel}
                disabled={!editMode && !addFlag && selectedIndex === null}
              >
                Cancel
              </button>
            </Col>
          </Row>
          <div className={`d-flex h-100 mt-1 ${viewDetail ? "mt-2" : "mt-1"}`}>
            <div className="w-100 border-1 border border-dark ">
              <div className="fixTableHead" style={{ overflowY: "auto", height: "300px" }}>
                <table className="table table-striped f-w-600">
                  <thead>
                    <tr>
                      <th className="f-w-600 col-7">Description </th>
                      <th className="f-w-600">Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {invoiceDetailsData?.map((invoiceDetail, index) => (
                      <tr
                        key={index}
                        className={selectedIndex === index && !viewDetail ? "tableSelected" : ""}
                        onClick={!viewDetail ? () => handleClick(invoiceDetail, index) : null}
                      >
                        <td>{invoiceDetail?.description}</td>
                        <td>{invoiceDetail?.totalAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
