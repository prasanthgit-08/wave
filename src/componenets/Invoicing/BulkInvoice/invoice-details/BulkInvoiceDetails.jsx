import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DynamicTextFields from "../../../common/AutoWrapTextFields/DynamicTextFields";
import BulkInvoiceService from "../../../../services/Invoicing/BulkInvoiceService";
import {
  setSaveData,
  updateField,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setChargeCreditCardBit,
  setUnitPk,
  setCompanyName,
  setDispatchStatus,
} from "../../../../redux/Invoicing/BulkInvoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIcon from "../../../common/LoadingIcon";
import MiscInvoiceService from "../../../../services/Invoicing/MiscInvoiceService";

function BulkInvoiceDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unitPk = useSelector((state) => state.bulkInvoiceReducer.unitPk);
  const companyName = useSelector((state) => state.bulkInvoiceReducer.companyName);
  const dispatchStatus = useSelector((state) => state.bulkInvoiceReducer.dispatchStatus);

  window.addEventListener("popstate", () => {
    dispatch(updateField({ field: "editFormData", value: null }));
    dispatch(updateField({ field: "selectedId", value: null }));
    dispatch(updateField({ field: "sortType", value: false }));
    dispatch(updateField({ field: "sortValue", value: "" }));
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    navigate(`/bulk-invoice-unit-selection`);
  });

  const { editFormData, changesCancelled, chargeCreditCardBit } = useSelector(
    (state) => state.bulkInvoiceReducer
  );

  const updateTabEditData = (field, value) => {
    dispatch(updateField({ field, value }));
  };
  const [bulkInvoicePK, setBulkInvoicePK] = useState(null);
  const [customerFK, setCustomerFK] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [description, setDescription] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState(0);
  const [chargeCreditCard, setChargeCreditCard] = useState("");
  const [creditCardPayments, setCreditCardPayments] = useState("");
  const [chargeCreditCardCheck, setChargeCreditCardCheck] = useState(false);

  const [loading, setLoading] = useState(false);

  const [invoiceText, setInvoiceText] = useState("");
  const [invoiceTextInputValues, setInvoiceTextInputValues] = useState(Array(4).fill(""));
  const [unitFK, setUnitFK] = useState(null);

  const fetchRecord = (id) => {
    clearForm();
    setLoading(true);
    BulkInvoiceService.getById(id)
      .then((res) => {
        const data = res?.data;

        updateTabEditData("editFormData", data[0]);
        setCreditCardPayments(data[0]?.ChargeCreditCard);
        updateTabEditData("viewDetail", true);
        dispatch(setUnitPk(res?.data[0]?.UnitFK));
        dispatch(setCompanyName(res?.data[0]?.CompanyName));
      })
      .catch((err) => {
        navigate(`/bulk-invoice-unit-selection`);
      })
      .finally(() => setLoading(false));
  };

  const clearForm = () => {
    setCustomer(null);
    setDescription("");
    setPoNumber("");
    setProjectCode("");
    setInvoiceAmount(0);
    setChargeCreditCard("");
    setChargeCreditCardCheck(false);
    setInvoiceText("");
    setInvoiceTextInputValues(Array(4).fill(""));
    setBulkInvoicePK(null);
    setCustomerFK(null);
    setUnitFK(null);

    dispatch(updateField({ field: "editFormData", value: null }));
  };
  const { resetForm } = useSelector((state) => state.bulkInvoiceReducer);

  useEffect(() => {
    if (resetForm) {
      clearForm();
      dispatch(updateField({ field: "resetForm", value: false })); // Reset flag
    }
  }, [resetForm]);

  useEffect(() => {
    if (editFormData === undefined) {
      setCustomer(null);
      setDescription("");
      setPoNumber("");
      setProjectCode("");
      setInvoiceAmount(0);
      setChargeCreditCard("");
      setInvoiceText("");
      setInvoiceTextInputValues(Array(4).fill(""));
    }
    if (editFormData != null) {
      setInvoiceTextInputValues(Array(4).fill(""));
      setCustomer(editFormData.CustomerName ? editFormData.CustomerName : "");
      setDescription(editFormData.Description ? editFormData.Description?.trim() : "");
      setPoNumber(editFormData.PONumber ? editFormData.PONumber?.trim() : "");
      setProjectCode(editFormData.ProjectCode ? editFormData.ProjectCode?.trim() : "");
      setInvoiceAmount(editFormData.InvoiceAmount ? editFormData.InvoiceAmount : 0);
      setChargeCreditCard(editFormData.ChargeCreditCard ? editFormData.ChargeCreditCard : "");
      setBulkInvoicePK(editFormData?.BulkInvoicePK || null);
      setCustomerFK(editFormData?.CustomerFK || null);
      setUnitFK(editFormData?.UnitFK || null);
    }
  }, [editFormData, changesCancelled]);

  useEffect(() => {
    if (id) {
      fetchRecord(id);
    }
  }, [id]);

  useEffect(() => {
    const id = unitPk !== null ? unitPk : null;
    if (id !== null && companyName !== "") {
      MiscInvoiceService.getDispatchStatus(id, companyName).then((response) => {
        const data = response?.data;
        dispatch(setDispatchStatus(data));
      });
    }
  }, [unitPk, companyName]);

  useEffect(() => {
    dispatch(
      setSaveData({
        customer,
        description,
        poNumber,
        projectCode,
        invoiceAmount,
        chargeCreditCard: chargeCreditCardBit,
        invoiceText,
        invoiceTextInputValues,
        bulkInvoicePK,
        customerFK,
        unitFK,
        creditCardPayments,
      })
    );
  }, [
    customer,
    description,
    poNumber,
    projectCode,
    invoiceAmount,
    chargeCreditCard,
    invoiceText,
    invoiceTextInputValues,
    dispatch,
    bulkInvoicePK,
    customerFK,
    unitFK,
    chargeCreditCardCheck,
  ]);

  useEffect(() => {
    if (chargeCreditCard === "A") {
      setChargeCreditCardCheck(false);
    }
  }, [chargeCreditCard]);

  useEffect(() => {
    if (chargeCreditCard === "I") {
      dispatch(setChargeCreditCardBit(false));
    } else if (chargeCreditCard === "D" || chargeCreditCard === "V") {
      dispatch(setChargeCreditCardBit(true));
    } else {
      dispatch(setChargeCreditCardBit(chargeCreditCardCheck));
    }
  }, [chargeCreditCard, chargeCreditCardCheck]);

  return (
    <div className="p-1 ps-2">
      {loading && <LoadingIcon />}
      <Row>
        <Col xs={12}>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Customer
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                value={customer}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                onInput={(e) => {
                  setCustomer(e.target.value);
                }}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Description
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                value={description}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                onInput={(e) => {
                  setDescription(e.target.value);
                }}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                PO Number
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                value={poNumber}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                onInput={(e) => {
                  setPoNumber(e.target.value);
                }}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Project Code
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                value={projectCode}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                onInput={(e) => {
                  setProjectCode(e.target.value);
                }}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Invoice Amount
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                value={invoiceAmount}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
                onInput={(e) => {
                  setInvoiceAmount(e.target.value);
                }}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className={`mt-3 form-group align-items-center row m-l-0 m-r-0 ms-0`}>
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label
                className={`customColFormLabel ${chargeCreditCard === "I" && "invisible"} `}
                id="miscellaneousPickup"
              >
                Charge Credit Card
              </Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                checked={chargeCreditCardBit}
                onChange={(e) => {
                  if (chargeCreditCard === "A") {
                    setChargeCreditCardCheck(e.target.checked);
                    dispatch(setChargeCreditCardBit(e.target.checked));
                  }
                }}
                disabled={chargeCreditCard === "V" || chargeCreditCard === "D"}
                readOnly={chargeCreditCard === "D" || chargeCreditCard === "V" || chargeCreditCard === "I"}
                className={`form-check-input p-0 ${chargeCreditCard === "I" && "invisible"}`}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0" style={{ height: "130px" }}>
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Invoice Text
              </Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <DynamicTextFields
                numFields={4}
                maxCharLimit={58}
                maxLimit={58}
                inputValues={invoiceTextInputValues}
                invoice={true}
                setInputValues={setInvoiceTextInputValues}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default BulkInvoiceDetails;
