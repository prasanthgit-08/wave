import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import { setPageNumber } from "../../../../../redux/YardCheckinSlice";
import {
  setAmount,
  setChangeColor,
  setDescription,
  setFlagAddorEdit,
  setIsDetailsTabValid,
  setList,
  setMiscInvoiceFormData,
  setTotalAmount,
} from "../../../../../redux/Invoicing/MiscInvoiceSlice";
import { useParams } from "react-router-dom";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";

const DetailsTab = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = useParams();
  const [records, setRecords] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null); // For tracking editing
  const [selectedRow, setSelectedRow] = useState(null); // Track the selected row
  const [isEditing, setIsEditing] = useState(false);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [itemsList, setItemsList] = useState([]);
  const [isNonUnitInvoice, setIsNonUnitInvoice] = useState(false);
  const [isCreditCard, setIsCreditCard] = useState(false);

  const [isAddOrEditClicked, setIsAddOrEditClicked] = useState(false);
  const [isRowSelected, setIsRowSelected] = useState(false);
  const customerFK = useSelector((state) => state.miscInvoiceReducer.customerFK);
  const totalAmount = useSelector((state) => state.miscInvoiceReducer.totalAmount);
  const companyName = useSelector((state) => state.miscInvoiceReducer.companyName);
  const companyFK = useSelector((state) => state.miscInvoiceReducer.companyFK);
  const amount = useSelector((state) => state.miscInvoiceReducer.amount);
  const description = useSelector((state) => state.miscInvoiceReducer.description);
  const list = useSelector((state) => state.miscInvoiceReducer.list);
  const creditCardArrayList = useSelector((state) => state.miscInvoiceReducer.creditCardArrayList);
  const transIds = useSelector((state) => state.miscInvoiceReducer.transIds);

  const isNumber = (value) => {
    if (!value) return value;
    /*** Remove non-numeric characters except for '.' and retain '-' if it is the first character ***/
    const number = value?.replace(/(?!^-)[^\d.]/g, ""); // Allow '-' only at the start
    return number;
  };

  /*****
   * Save the Record for add or edit
   * ******/
  const handleSave = () => {
    if (!amount || !description) {
      alert("Please fill in both fields");
      return;
    }

    if (isEditing && selectedRow !== null) {
      const updatedList = (list || []).map((item, index) =>
        index === selectedRow ? { amount, description } : item
      );
      dispatch(setList(updatedList));
      setIsEditing(false);
      setSelectedRow(null);
    } else {
      dispatch(setList([...list, { amount, description }]));
    }
    dispatch(setAmount(""));
    dispatch(setDescription(""));
    setIsAddOrEditClicked(false);
    setIsAddClicked(false);
  };

  /*** Handle row click for editing******/
  const handleRowClick = (index) => {
    /*** Set the selected row index***/
    setIsAddOrEditClicked(false);
    setIsRowSelected(true);
    setSelectedRow(index);
    /** Retrieve the clicked item**/
    const selectedItem = list[index];
    /** Populate the fields with the selected item's data**/
    dispatch(setAmount(selectedItem?.amount));
    dispatch(setDescription(selectedItem.description));
    /***Enable the edit mode***/
    setIsEditing(true);
    setIsAddClicked(false);
  };

  /*****Handle delete****/
  const handleDelete = () => {
    if (selectedRow !== null) {
      /**Use selectedRow to determine the selected record***/
      const updatedList = list?.filter((_, index) => index !== selectedRow); // Filter out the selected row
      dispatch(setList(updatedList)); // Update the list
      setSelectedRow(null); // Reset the selected row
      setIsEditing(false); // Disable editing mode
      dispatch(setAmount("")); // Clear the amount field
      dispatch(setDescription("")); // Clear the description field
    } else {
      alert("Select a record to delete"); // Show an alert if no record is selected
    }
  };

  /****Handle cancel****/
  const handleCancel = () => {
    dispatch(setAmount(""));
    dispatch(setDescription(""));
    setIsEditing(false);
    setSelectedIndex(null);
    setSelectedRow(null);
    setIsAddOrEditClicked(false);
    setIsAddClicked(false);
  };

  /******Add a new record to the list*****/
  const handleAdd = (index) => {
    setIsAddClicked(true);
    setIsRowSelected(false);
    setIsAddOrEditClicked(true);
    dispatch(setAmount(""));
    dispatch(setDescription(""));
    setIsEditing(false);
    setSelectedIndex(null);
    setSelectedRow(null);
  };

  /***** Edit the Record *****/
  const handleEdit = (index) => {
    if (index !== null) {
      setIsAddClicked(false);
      setIsAddOrEditClicked(true);
      setIsRowSelected(false);
      dispatch(setAmount(list[index].amount));
      dispatch(setDescription(list[index].description));
      setIsEditing(true); // Switch to edit mode
      setSelectedIndex(index); // Store the index of the item being edited
      setSelectedRow(index);
    }
  };

  /*****
   * Calculate the total amount for the amount entered in the List
   * used to enable the next button based on total amount
   * *****/
  useEffect(() => {
    const total = list?.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    dispatch(setTotalAmount(total));
  }, [list]);

  /******
   * Tab Validation for Details Tab Based on
   * description
   * *****/
  useEffect(() => {
    if (description && description?.length >= 1 && amount) {
      dispatch(setIsDetailsTabValid(true));
    } else {
      dispatch(setIsDetailsTabValid(false));
    }
  }, [description, amount]);

  /******
   * Set the Creditcard Bit to true if monetra chargesVO List contains data
   * *****/
  useEffect(() => {
    setIsCreditCard(creditCardArrayList?.length > 0);
  }, [creditCardArrayList]);
  /*****
   * Setting save Object for Details Tab
   * *****/
  const detailsTabFormData = () => {
    dispatch(
      setMiscInvoiceFormData({
        detailsList: list,
        unitPK: id,
        invoiceAmount: totalAmount,
        companyName: companyName,
        isNonUnitInvoice: id ? 0 : 1,
        companyFK: parseInt(companyFK),
        monetraChargesVOList: creditCardArrayList,
        customerId: customerFK,
        isCreditCard: isCreditCard,
        transIds: transIds || "",
      })
    );
  };
  /***Setting the save Object for the Details Tab***/
  useEffect(() => {
    detailsTabFormData();
  }, [list, id, totalAmount, companyName, creditCardArrayList, companyFK, customerFK, isCreditCard]);

  useEffect(() => {
    dispatch(setFlagAddorEdit(isAddOrEditClicked));
  }, [isAddOrEditClicked]);

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border" style={{ height: "500px" }}>
        <Row>
          <Col xs={10} className="ps-3">
            {/****Amount***/}
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="amount">
                  Amount
                </Form.Label>
              </Col>

              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <input
                  className={`customFormControl ${
                    isAddOrEditClicked
                      ? amount === "." || amount === "-" || !amount
                        ? "borderRed"
                        : "borderGreen"
                      : ""
                  }`}
                  id="amount"
                  name="amount"
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={amount}
                  disabled={!isAddOrEditClicked}
                  onBeforeInput={(e) => {
                    const newValue = e.target.value + e.data;
                  }}
                  onChange={(e) => {
                    const enteredValue = e.target.value;
                    if (enteredValue.match(/^-?\d{0,5}(\.\d{0,2})?$/)) {
                      dispatch(setAmount(isNumber(enteredValue)));
                    }
                  }}
                />
              </Col>
            </Form.Group>
            {/****Description***/}
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="description">
                  Description
                </Form.Label>
              </Col>
              <Col xs={9} md={9} sm={9} className="p-0">
                <input
                  className={`customFormControl ${
                    isAddOrEditClicked ? (description ? "borderGreen" : "borderRed") : ""
                  }`}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || value[0] !== " ") {
                      dispatch(setDescription(value));
                    }
                  }}
                  id="description"
                  name="description"
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={description}
                  maxLength={60}
                  disabled={!isAddOrEditClicked}
                />
              </Col>
            </Form.Group>
          </Col>
          <Col xs={2} className="d-block">
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5 mt-1"
              type="button"
              onClick={handleAdd}
              /***Disable Add when editing***/
              disabled={isEditing || isAddOrEditClicked}
            >
              Add
            </button>
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type="button"
              onClick={() => handleEdit(selectedRow)}
              disabled={selectedRow === null || isAddOrEditClicked} // Disable Edit if no row is selected or if already in Edit mode
            >
              Edit
            </button>
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type="button"
              onClick={handleSave}
              disabled={!amount || !description || !isAddOrEditClicked || isRowSelected || amount === "."}
            >
              Save
            </button>

            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type="button"
              onClick={() => handleDelete()}
              disabled={selectedRow === null || isAddOrEditClicked} // Disable Delete if no row is selected
            >
              Delete
            </button>
            <button
              className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
              type="button"
              onClick={handleCancel}
              disabled={!isAddClicked && selectedRow === null}
            >
              Cancel
            </button>
          </Col>
        </Row>
        <div className="d-flex h-70 mt-1">
          <div className="w-100 border-1 border border-dark border">
            <div className="fixTableHead" style={{ overflowY: "auto", height: "300px" }}>
              <table className="table table-striped f-w-500">
                <thead>
                  <tr>
                    <th className=" col-9">Description</th>
                    <th className="col-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        handleRowClick(index);
                        dispatch(setChangeColor(true));
                      }}
                      className={selectedRow === index ? "tableSelected" : ""}
                    >
                      <td>{item.description}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(!list || list?.length === 0) && <NoRecordsMessage />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTab;
