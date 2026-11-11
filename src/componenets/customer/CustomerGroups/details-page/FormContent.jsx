import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setCustomerGroups,
  setDisableSave,
  setFormData,
  setViewDetail,
} from "../../../../redux/CustomerGroupsSlice";
import CustomerGroupService from "../../../../services/CustomerGroupService";

const FormContent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [invoiceRates, setInvoiceRates] = useState(false);
  const [driverRates, setDriverRates] = useState(false);
  const [customerAssignable, setCustomerAssignable] = useState(false);
  const [notes, setNotes] = useState("");
  const [duplicateDescription, setDuplicateDescription] = useState(false);
  const formData = useSelector((state) => state.customerGroups.formData);
  const viewDetail = useSelector((state) => state.customerGroups.viewDetail);
  const [loading, setLoading] = useState(false);
  /**
   * API call for fetching a single record
   */

  const fetchRecordById = (id) => {
    setLoading(true);

    CustomerGroupService.getRecord(id)
      .then((res) => {
        dispatch(setFormData(res?.data));
        dispatch(setViewDetail(true));
        setLoading(false);
      })
      .catch((err) => {
        navigate(`/customer-groups`);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (id) fetchRecordById(id);
  }, [id]);

  /**
   * Populate input fields with API response
   */
  useEffect(() => {
    setDescription(formData ? formData?.description?.trim() || "" : "");
    setInvoiceRates(formData ? formData?.updateInvoiceRates || false : false);
    setDriverRates(formData ? formData?.updateDriverRates || false : false);
    setCustomerAssignable(formData ? formData?.assignToCustomer || false : false);
    setNotes(formData ? formData?.notes || "" : "");
  }, [formData, viewDetail]);

  /**
   * Update customerGroups payload object with input fields
   */
  useEffect(() => {
    dispatch(
      setCustomerGroups({
        customerGroupPK: id,
        description: description,
        updateInvoiceRates: invoiceRates,
        updateDriverRates: driverRates,
        assignToCustomer: customerAssignable,
        notes: notes,
      })
    );
  }, [description, invoiceRates, driverRates, customerAssignable, notes]);
  /*
   * Used check the Description unique or not
   */

  const checkDuplicateDescription = (description) => {
    CustomerGroupService.isDescriptionUnique(description, id)
      .then((response) => {
        setDuplicateDescription(response?.data);
      })
      .catch((err) => {
        setDuplicateDescription(false);
      });
  };

  /* Used for Save Validation*/
  useEffect(() => {
    if (
      description !== "" &&
      !duplicateDescription &&
      (!customerAssignable || (customerAssignable && (driverRates || invoiceRates)))
    ) {
      dispatch(setDisableSave(false));
    } else {
      dispatch(setDisableSave(true));
    }
  }, [description, duplicateDescription, customerAssignable, driverRates, invoiceRates]);

  /* Used for Clearing Fields*/
  useEffect(() => {
    if (!customerAssignable) {
      setInvoiceRates(false);
      setDriverRates(false);
    }
  }, [customerAssignable]);

  useEffect(() => {
    if (viewDetail) {
      setDuplicateDescription(false);
    }
  }, [viewDetail]);
  return (
    <div>
      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
        <Col xs={4} sm={4} md={4} className="p-0">
          <Form.Label className="col-form-label">Description</Form.Label>
        </Col>
        <Col xs={8} sm={8} md={8} className="p-0">
          <input
            type="text"
            id="description"
            name="description"
            className={`customFormControl ${
              !viewDetail ? (description && !duplicateDescription ? "borderGreen" : "borderRed") : ""
            }`}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value?.replace(/^\s+/g, ""));
              setDuplicateDescription(false);
            }}
            onBlur={(e) => {
              if (e.target.value) {
                checkDuplicateDescription(e.target.value);
              }
            }}
            disabled={viewDetail}
            maxLength={30}
            autoComplete="newpassword"
            aria-autocomplete="none"
          />
        </Col>
      </Form.Group>

      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
        <Col xs={4} sm={4} md={4} className="p-0">
          <Form.Label className="col-form-label dealer-label">Invoice Rates</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={5} className="p-0">
          <input
            type="checkbox"
            className={`form-check-input p-0 ${
              !viewDetail
                ? invoiceRates
                  ? ""
                  : customerAssignable && !driverRates && !invoiceRates
                    ? "borderRed"
                    : ""
                : ""
            }`}
            id="invoiceRates"
            name="invoiceRates"
            checked={invoiceRates}
            onChange={(e) => setInvoiceRates(e.target.checked)}
            disabled={viewDetail || !customerAssignable}
          />
        </Col>
      </Form.Group>

      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
        <Col xs={4} sm={4} md={4} className="p-0">
          <Form.Label className="col-form-label dealer-label">Driver Rates</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={5} className="p-0">
          <input
            type="checkbox"
            className={`form-check-input p-0 ${
              !viewDetail
                ? driverRates
                  ? ""
                  : customerAssignable && !driverRates && !invoiceRates
                    ? "borderRed"
                    : ""
                : ""
            }`}
            id="driverRates"
            name="driverRates"
            checked={driverRates}
            onChange={(e) => setDriverRates(e.target.checked)}
            disabled={viewDetail || !customerAssignable}
          />
        </Col>
      </Form.Group>

      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
        <Col xs={4} sm={4} md={4} className="p-0">
          <Form.Label className="col-form-label dealer-label">Customer Assignable</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={5} className="p-0">
          <input
            type="checkbox"
            className="form-check-input p-0"
            id="customerAssignable"
            name="customerAssignable"
            checked={customerAssignable}
            onChange={(e) => setCustomerAssignable(e.target.checked)}
            disabled={viewDetail}
          />
        </Col>
      </Form.Group>

      <Form.Group className="my-3 form-group  align-items-center row  m-l-0 m-r-0">
        <Col xs={12} sm={12} className="p-0">
          <label className="col-form-label dealer-label p-0 mb-2">Notes</label>
        </Col>
        <Col xs={12} md={12} sm={12} className="p-0">
          <textarea
            style={{
              resize: "none",
              height: "150px",
            }}
            className="w-100 customFormControl"
            id="notes"
            name="notes"
            autoComplete="newpassword"
            aria-autocomplete="none"
            value={notes}
            onInput={(e) => setNotes(e.target.value?.replace(/^\s+/g, ""))}
            disabled={viewDetail}
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
  );
};

export default FormContent;
