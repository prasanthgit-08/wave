import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvoiceDetailPK,
  setInvoiceDetailsData,
  setIsDetailsTabValid,
} from "../../../../../redux/Invoicing/EditInvoiceSlice";
import { useNavigate } from "react-router-dom";
import InvoiceInquiryService from "../../../../../services/Invoicing/InvoiceInquiryService";
import LoadingIcon from "../../../../common/LoadingIcon";

const Details = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [mileageRate, setMileageRate] = useState(0);
  const [miles, setMiles] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [enableSave, setEnableSave] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loader, setLoader] = useState(false);

  const viewDetail = useSelector((state) => state.editInvoiceReducer.viewDetail);
  const invoicePK = useSelector((state) => state.editInvoiceReducer.invoicePK);
  const companyFK = useSelector((state) => state.editInvoiceReducer.companyFK);
  const companyName = useSelector((state) => state.editInvoiceReducer.companyName);
  const invoiceDetailsData = useSelector((state) => state.editInvoiceReducer.invoiceDetailsData);
  const invoiceById = useSelector((state) => state.editInvoiceReducer.invoiceById);
  const selectedDetailRecord = invoiceDetailsData[selectedIndex];
  const nonUnitData = useSelector((state) => state.editInvoiceReducer.nonUnitData);

  //Fetch invoice details records by invoice FK
  const fetchInvoiceDetails = (invoicePK) => {
    if (invoiceDetailsData?.length === 0) {
      setLoader(true);
      InvoiceInquiryService.getInvoiceDetailsById(invoicePK, companyFK, companyName)
        .then((response) => {
          const data = response?.data;
          const modifiedList = data?.map((invoice) => ({
            ...invoice,
            previousDescription: invoice.description,
            previousTotalAmount: invoice.totalAmount,
            previousMiles: invoice.miles,
          }));
          dispatch(setInvoiceDetailsData(modifiedList || []));
          setLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    }
  };

  useEffect(() => {
    if (!invoicePK) {
      navigate(`/edit-invoice/invoice-unit-selection`);
    }
  }, []);

  useEffect(() => {
    if (invoicePK) {
      fetchInvoiceDetails(invoicePK);
    }
  }, [invoicePK]);

  //setting values when selecting a record from the detail list
  useEffect(() => {
    if (invoiceDetailsData && selectedIndex != null) {
      setDescription(invoiceDetailsData[selectedIndex]?.description || "");
      setMileageRate(invoiceDetailsData[selectedIndex]?.mileageRate || 0);
      setMiles(invoiceDetailsData[selectedIndex]?.miles || 0);
      setTotalAmount(invoiceDetailsData[selectedIndex]?.totalAmount || 0);
    } else {
      // Reset fields for a new record
      setDescription("");
      setMileageRate(0);
      setMiles(0);
      setTotalAmount(0);
    }
  }, [selectedIndex]);

  //On click of a detail record
  const handleClick = (invoiceDetail, index) => {
    setSelectedIndex(index);
    dispatch(
      setInvoiceDetailPK(invoiceDetail.invoiceDetailPK != null ? invoiceDetail.invoiceDetailPK != null : null)
    );
    const selectedItem = invoiceDetailsData[index]; // Retrieve the clicked item
    setTotalAmount(selectedItem.amount);
    setDescription(selectedItem.description);
    setEditMode(false);
  };

  // Handle delete
  const handleDelete = () => {
    if (selectedIndex !== null) {
      const updatedList = invoiceDetailsData?.filter((_, index) => index !== selectedIndex);
      dispatch(setInvoiceDetailsData(updatedList));
      setSelectedIndex(null);
      setEditMode(false);
      setTotalAmount(0);
      setDescription("");
    } else {
      alert("Select a record to delete");
    }
  };

  //Save a record
  const handleSave = () => {
    if (editMode && selectedIndex !== null) {
      // Update existing record with new input values if in edit mode
      const updatedList = invoiceDetailsData.map((item, index) =>
        index === selectedIndex ? { ...item, totalAmount, description, mileageRate, miles } : item
      );
      dispatch(setInvoiceDetailsData(updatedList));
      setSelectedIndex(null);
    } else {
      // Add a new record if not in edit mode
      if (mileageRate <= 0) {
        dispatch(
          setInvoiceDetailsData([
            ...invoiceDetailsData,
            { totalAmount, description, miles: 0, mileageRate: 0 },
          ])
        );
      } else {
        const index = invoiceDetailsData?.findIndex((item) => !item?.mileageRate && !item?.miles);
        let tempList = [...invoiceDetailsData];
        if (index === -1 || (mileageRate <= 0 && miles <= 0)) {
          tempList?.push({ totalAmount, description, miles, mileageRate });
          dispatch(setInvoiceDetailsData(tempList));
        } else {
          tempList?.splice(index, 0, { totalAmount, description, miles, mileageRate });
          dispatch(setInvoiceDetailsData(tempList));
        }
      }
    }

    // Reset state
    setEnableSave(false);
    setEditMode(false);
    setTotalAmount(0);
    setDescription("");
    setMileageRate(0);
    setMiles(0);
  };

  useEffect(() => {
    if (editMode) {
      const rateNum = parseFloat(mileageRate);
      const milesNum = parseFloat(miles);

      if (!isNaN(rateNum) && !isNaN(milesNum)) {
        const result = rateNum * milesNum;
        setTotalAmount(Math.round(result * 100) / 100); // rounded to 2 decimals
      } else {
        setTotalAmount(0);
      }
      //  setTotalAmount(mileageRate * miles)
      if (mileageRate > 0) {
        setMiles(invoiceDetailsData[0].miles);
      }
    }
  }, [mileageRate, miles]);

  useEffect(() => {
    if (editMode && !description) {
      dispatch(setIsDetailsTabValid(false));
    } else {
      dispatch(setIsDetailsTabValid(true));
    }
  }, [editMode]);

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border p-1" style={{ height: "500px" }}>
        <div className="ps-1 pe-1 mb-4">
          {loader && <LoadingIcon />}
          <Row hidden={viewDetail}>
            <Col xs={10} className="ps-3">
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceNumber">
                    Description
                  </Form.Label>
                </Col>

                <Col xs={9} md={9} sm={9} className="p-0">
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
                    maxLength={60}
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
                    Rate
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    className={`customFormControl ${
                      !viewDetail && editMode
                        ? selectedDetailRecord?.previousMiles > 0
                          ? mileageRate <= 0 || mileageRate === "." || String(mileageRate)?.endsWith(".")
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                        : ""
                    }`}
                    id="unitNumber"
                    name="unitNumber"
                    value={mileageRate}
                    maxLength={6}
                    onChange={(e) => {
                      e.target.value.match(/^\d{0,3}(\.\d{0,2})?$/) && setMileageRate(e.target.value);
                    }}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled={
                      invoiceDetailsData[0]?.mileageRate === 0 ||
                      !editMode ||
                      invoiceById[0]?.invoiceFlatRate > 0 ||
                      selectedDetailRecord?.previousMiles === 0
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceNumber">
                    Miles
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="unitNumber"
                    name="unitNumber"
                    value={miles}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={3} md={3} xs={3} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceNumber">
                    Amount
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    className={`customFormControl ${
                      !viewDetail &&
                      editMode &&
                      selectedDetailRecord?.previousMiles !== undefined &&
                      (selectedDetailRecord?.previousMiles <= 0
                        ? totalAmount <= 0 || String(totalAmount)?.endsWith(".")
                          ? "borderRed"
                          : "borderGreen"
                        : "")
                    }`}
                    id="unitNumber"
                    name="unitNumber"
                    value={totalAmount}
                    maxLength={8}
                    onChange={(e) => {
                      // if(mileageRate <= 0||!mileageRate){
                      e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setTotalAmount(e.target.value);
                      //  setMiles(0);
                      // }
                    }}
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled={!editMode || mileageRate > 0 || selectedDetailRecord?.previousMiles > 0}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col xs={2} className="d-block">
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type=""
                onClick={() => {
                  setEditMode(true);
                  setEnableSave(true);
                  setSelectedIndex(null);
                  setTimeout(() => {
                    setMiles(invoiceDetailsData[0]?.miles || 0);
                  }, 300);
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
                type=""
                disabled={
                  !description ||
                  totalAmount <= 0 ||
                  !totalAmount ||
                  !editMode ||
                  Number(totalAmount) >= 100000 ||
                  String(totalAmount)?.endsWith(".") ||
                  String(mileageRate)?.endsWith(".")
                }
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type=""
                disabled={
                  selectedIndex === null ||
                  editMode ||
                  (selectedIndex === 0 &&
                    (invoiceById[0].miscellaneous === null || invoiceById[0].miscellaneous === false)) ||
                  invoiceDetailsData?.length <= 1 ||
                  (nonUnitData?.length > 0 &&
                    invoiceDetailsData
                      ?.filter((data) => data?.totalAmount != null)
                      .map((data) => data?.totalAmount)
                      .reduce((sum, amount) => sum + amount, 0) === 0) ||
                  (nonUnitData?.length === 0 &&
                    invoiceDetailsData
                      ?.filter((data) => data?.totalAmount != null)
                      .map((data) => data?.totalAmount)
                      .reduce((sum, amount) => sum + amount, 0) <= 0)
                }
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type=""
                onClick={() => {
                  dispatch(setInvoiceDetailPK(null));
                  setDescription("");
                  setTotalAmount(0);
                  setMiles(0);
                  setEditMode(false);
                  setMileageRate(0);
                  setSelectedIndex(null);
                }}
                disabled={!editMode || !enableSave}
              >
                Cancel
              </button>
            </Col>
          </Row>
          <div className={`d-flex h-100 mt-1 ${viewDetail ? "mt-2" : "mt-1"}`}>
            <div className="w-100 border-1 border border-dark ">
              <div
                className="fixTableHead"
                style={{ overflowY: "auto", height: viewDetail ? "456px" : "306px" }}
              >
                <table className="table table-striped f-w-600">
                  <thead>
                    <tr>
                      <th className="f-w-600 col-7">Description </th>
                      <th className="f-w-600">Rate</th>
                      <th className="f-w-600 ">Miles</th>
                      <th className="f-w-600">Total</th>
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
                        <td>{invoiceDetail?.mileageRate > 0 ? invoiceDetail?.mileageRate : " "}</td>
                        <td>{invoiceDetail?.miles > 0 ? invoiceDetail.miles : " "}</td>
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
};

export default Details;
