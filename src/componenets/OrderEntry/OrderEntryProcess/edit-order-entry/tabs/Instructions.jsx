import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import CustomerService from "../../../../../services/CustomerService";
import OrderEntryService from "../../../../../services/OrderEntryService";
import {
  setInstructions,
  setSelectedCustomerAllDetails,
  setSelectedCustomerPlantDetails,
} from "../../../../../redux/OrderEntryFilterSlice";

function Instructions({ styles }) {
  const dispatch = useDispatch();

  const [customersOrderEntryInstructions, setCustomersOrderEntryInstructions] = useState(null);
  const [selectedCustomerAllData, setSelectedCustomerAllData] = useState(null);
  const [selectedCustomerPlantData, setSelectedCustomerPlantData] = useState(null);

  const selectedCustomerBillingPlantId = useSelector(
    (state) => state.orderEntryReducer.pickupCustomerPlantId
  );

  const selectedCustomerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);

  const getSelectedCustomerInstructions = (selectedCustomerId) => {
    if (selectedCustomerId !== null && selectedCustomerId !== "") {
      CustomerService.getCustomerById(selectedCustomerId)
        .then((response) => {
          const data = response.data;

          setSelectedCustomerAllData(data);
          setCustomersOrderEntryInstructions(data ? data.orderEntryInstructions : "");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getSelectedCustomerInstructionsFromCustomerPlant = (selectedCustomerBillingPlantId) => {
    if (selectedCustomerBillingPlantId !== "" && selectedCustomerBillingPlantId !== null) {
      OrderEntryService.getPlantById(selectedCustomerBillingPlantId)
        .then((response) => {
          const data = response.data;
          setSelectedCustomerPlantData(data);
          setCustomersOrderEntryInstructions(data ? data.orderInstructions : "");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (selectedCustomerId) {
      if (
        selectedCustomerBillingPlantId === "" ||
        selectedCustomerBillingPlantId === null ||
        selectedCustomerBillingPlantId === undefined
      ) {
        getSelectedCustomerInstructions(selectedCustomerId);
      } else {
        getSelectedCustomerInstructionsFromCustomerPlant(selectedCustomerBillingPlantId);
      }
    }
  }, [selectedCustomerId, customersOrderEntryInstructions, selectedCustomerBillingPlantId]);

  useEffect(() => {
    dispatch(setInstructions(customersOrderEntryInstructions));
    dispatch(setSelectedCustomerAllDetails(selectedCustomerAllData));
    dispatch(setSelectedCustomerPlantDetails(selectedCustomerPlantData));
  }, [customersOrderEntryInstructions, selectedCustomerAllData, selectedCustomerPlantData]);

  return (
    <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
      <div className="col-8 m-auto">
        <Col lg={12} xs={12}>
          <Form.Group className="mt-3 form-group row ms-2">
            <Col sm={12} xs={12} className="p-0 mt-3">
              <Form.Label className={`customColFormLabel`}>Customers Order Entry Instructions</Form.Label>
            </Col>
            <Col lg={12} xs={12} md={12} sm={12} className="p-0 mt-1">
              <textarea
                rows={10}
                cols={70}
                type="text"
                className="form-control h-400px"
                id="customersOrderEntryInstructions"
                name="customersOrderEntryInstructions"
                disabled
                value={customersOrderEntryInstructions ? customersOrderEntryInstructions : ""}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
}

export default Instructions;
