import React, { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setRerouteType,
  setRequestedBy,
  setDealerCustomerFK,
  setDealerCustomerName,
  setAuthorizedBy,
  setReRouteMultiUnitLoad,
  setNotes,
  setSelectedNewPickupNormalDealerData,
  setPickupNormalDealerFK,
  setNormalDealerName,
  setSelectedNewDeliveryNormalDealerData,
  setDeliveryNormalDealerFK,
  setDeliveryDealerName,
  setDriverMiles,
  setInvoiceMiles,
} from "../../../../../../../../redux/RerouteSlice";
import LookupButton from "../../../../../../../common/LookupButton";
import CustomRadioGroup from "../../../../../../../common/CustomRadioGroup";
import styles from "../../../../../../../../styles/QuarterScreen.module.css";
import RerouteService from "../../../../../../../../services/RerouteService";
import AutoCompleteDropdown from "../../../../../../../common/AutoCompleteDropdown";
import CustomerLookup from "../../../../../../../LookupScreens/Customer/CustomerLookup";

function RerouteDetailScreenContent() {
  const dispatch = useDispatch();

  const rerouteType = useSelector((state) => state.rerouteReducer.rerouteType);
  const requestedBy = useSelector((state) => state.rerouteReducer.requestedBy);
  const dealerCustomerFK = useSelector((state) => state.rerouteReducer.dealerCustomerFK);
  const dealerCustomerName = useSelector((state) => state.rerouteReducer.dealerCustomerName);
  const authorizedBy = useSelector((state) => state.rerouteReducer.authorizedBy);
  const reRouteMultiUnitLoad = useSelector((state) => state.rerouteReducer.reRouteMultiUnitLoad);
  const notes = useSelector((state) => state.rerouteReducer.notes);
  const isPartialTrip = useSelector((state) => state.rerouteReducer.isPartialTrip);
  const pickupDealerFK = useSelector((state) => state.rerouteReducer.pickupDealerFK);
  const pickupUnitAddressFK = useSelector((state) => state.rerouteReducer.pickupUnitAddressFK);
  const deliveryDealerFK = useSelector((state) => state.rerouteReducer.deliveryDealerFK);
  const deliveryUnitAddressFK = useSelector((state) => state.rerouteReducer.deliveryUnitAddressFK);
  const selectedUnitInfo = useSelector((state) => state.rerouteReducer.selectedUnitInfo);
  const companyId = useSelector((state) => state.rerouteReducer.companyId);

  const [customerLookup, setCustomerLookup] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  //Local State
  const [dealerCustomersList, setDealerCustomersList] = useState([]);

  /****** Dealer Customer dropdown and lookup ******/
  //Service for getting all dealer customers
  const fetchAllDealerCustomers = (string) => {
    setApiLoading(true);
    RerouteService.getDealerCustomerForAutocomplete(string, companyId)
      .then((response) => {
        const data = response.data;
        const dealerCustomerList = data.slice(0, data?.length - 1);
        setDealerCustomersList(dealerCustomerList);
      })
      .catch((error) => {})
      .finally(() => {
        setApiLoading(false);
      });
  };

  //Handle selection from dealer customer dropdown
  const handleDealerCustomerSelectionFromDropdown = (dealerCustomer) => {
    dispatch(setDealerCustomerFK(dealerCustomer.CustomerPK));
    dispatch(setDealerCustomerName(dealerCustomer.Name?.trim()));
  };

  //Method for handling value change in Authorized bY Text Field
  const handleChange = (event) => {
    const value = event.target.value;

    // Remove leading white spaces
    const trimmedValue = value.replace(/^\s+/, "");

    dispatch(setAuthorizedBy(trimmedValue));
  };

  useEffect(() => {
    if (requestedBy === "Customer") {
      dispatch(setDealerCustomerFK(null));
      dispatch(setDealerCustomerName(""));
    }
  }, [requestedBy]);

  const handleCustomerLookupSelection = (customer) => {
    dispatch(setDealerCustomerName(customer.Name?.trim()));
    dispatch(setDealerCustomerFK(customer.CustomerPK));
    setCustomerLookup(false);
  };

  return (
    <div className="w-100 p-2">
      <div className=" shadow-sm rounded border quarterScreenFormContentHeight border ps-3">
        <Form.Group className="mt-4 m-b-10 align-items-center row m-l-5 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            {/* Reroute */}
            <Form.Label htmlFor="type" className="col-form-label dealer-label">
              Reroute
            </Form.Label>
          </Col>
          <Col xs={9} md={9} sm={9} className={`p-0 d-flex`}>
            <div className="d-flex align-items-center me-4">
              <input
                type="radio"
                name="rerouteType"
                value="Pickup"
                checked={rerouteType === "Pickup"}
                disabled={
                  isPartialTrip === true ||
                  (pickupDealerFK === null &&
                    pickupUnitAddressFK === null &&
                    (deliveryDealerFK !== null || deliveryUnitAddressFK !== null)) ||
                  selectedUnitInfo?.pickedUp
                    ? true
                    : false
                }
                onChange={(e) => {
                  dispatch(setInvoiceMiles(""));
                  dispatch(setDriverMiles(""));
                  dispatch(setRerouteType(e.target.value));
                  dispatch(setSelectedNewPickupNormalDealerData(""));
                  dispatch(setPickupNormalDealerFK(""));
                  dispatch(setNormalDealerName(""));

                  dispatch(setSelectedNewDeliveryNormalDealerData(""));
                  dispatch(setDeliveryNormalDealerFK(""));
                  dispatch(setDeliveryDealerName(""));
                }}
              />
              <label className="ms-2" htmlFor="">
                Pickup
              </label>
            </div>
            <div className="d-flex align-items-center me-4">
              <input
                type="radio"
                name="rerouteType"
                value="Delivery"
                checked={rerouteType === "Delivery"}
                disabled={deliveryDealerFK === null && deliveryUnitAddressFK === null ? true : false}
                onChange={(e) => {
                  dispatch(setRerouteType(e.target.value));
                }}
              />
              <label className="ms-2" htmlFor="">
                Delivery
              </label>
            </div>
          </Col>
        </Form.Group>

        <Form.Group className="mt-4 m-b-10 align-items-center row m-l-5 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            {/* Requested By */}
            <Form.Label htmlFor="type" className="col-form-label dealer-label">
              Requested By
            </Form.Label>
          </Col>
          <Col xs={7} md={7} sm={7} className="p-0">
            <CustomRadioGroup
              name="requestedBy"
              horizontal
              horizontalAlignmentClassName={"me-4"}
              options={["Customer", "Dealer"]}
              selectedOption={requestedBy}
              disabled={
                selectedUnitInfo &&
                (!selectedUnitInfo.pickupCustomerPlantFK ||
                  !selectedUnitInfo.usePlants ||
                  !deliveryDealerFK ||
                  selectedUnitInfo.miscellaneousCustomer)
              }
              onChange={(selected) => {
                dispatch(setRequestedBy(selected));
              }}
            />
          </Col>
        </Form.Group>

        {/* Dealer customer */}
        <Form.Group className="mt-4 m-b-10 align-items-center row m-l-5 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label dealer-label ">Dealer customer</Form.Label>
          </Col>
          <Col xs={4} md={4} sm={4} className="d-flex align-items-center p-0">
            <AutoCompleteDropdown
              arrayList={dealerCustomersList}
              searchString={dealerCustomerName}
              renderItemId={(dealerCustomer) => dealerCustomer.CustomerPK}
              renderItemField={(dealerCustomer) => dealerCustomer.Name?.trim()}
              handleSearchString={(string) => dispatch(setDealerCustomerName(string))}
              fetchDataBySearchString={fetchAllDealerCustomers}
              loading={apiLoading}
              onSelect={handleDealerCustomerSelectionFromDropdown}
              selectedId={dealerCustomerFK}
              clearInputCallback={() => {
                dispatch(setDealerCustomerFK(null));
              }}
              className={`custom-autocomplete ${
                requestedBy === "Customer" ? "black" : !dealerCustomerFK ? "borderRed" : "borderGreen"
              }`}
              disabled={requestedBy === "Dealer" ? false : true}
            />
            <LookupButton
              onClick={() => {
                setCustomerLookup(true);
              }}
              disabled={requestedBy === "Dealer" ? false : true}
            />
            <CustomerLookup
              show={customerLookup}
              onHide={() => setCustomerLookup(false)}
              renderItemId={(customer) => customer.customerPK}
              handleLookupSelection={handleCustomerLookupSelection}
              RerouteProgram
              CompanyId={companyId}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-4 m-b-10 align-items-center row m-l-5 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            {/* Authorized By */}
            <Form.Label htmlFor="Authorized By" className="col-form-label dealer-label">
              Authorized By
            </Form.Label>
          </Col>
          <Col xs={3} md={3} className="p-0">
            <input
              className={`customFormControl ${authorizedBy === "" ? "borderRed" : "borderGreen"}`}
              id="authorizedBy"
              name="authorizedBy"
              type="text"
              value={authorizedBy}
              maxLength={40}
              disabled={false}
              autoComplete="off"
              aria-autocomplete="none"
              onInput={(e) => {
                handleChange(e);
              }}
            />
          </Col>
        </Form.Group>

        {/* Reroute Multi Unit Load */}
        <Form.Group className={`mt-2 m-b-10 align-items-center row m-l-5 m-r-0 ${styles.colFormLabel}`}>
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label dealer-label">Reroute Multi Unit Load</Form.Label>
          </Col>
          <Col xs={3} md={3} sm={3} className="p-0">
            <input
              type="checkbox"
              className="form-check-input p-0"
              name="reRouteMultiUnitLoad"
              checked={reRouteMultiUnitLoad}
              value={reRouteMultiUnitLoad}
              disabled={selectedUnitInfo && !selectedUnitInfo.multiUnit}
              onChange={(e) => {
                dispatch(setReRouteMultiUnitLoad(e.target.checked));
              }}
            />
          </Col>
        </Form.Group>

        {/* Notes */}
        <Form.Group className={`mt-1 m-b-10 align-items-center row m-l-5 m-r-0 ${styles.colFormLabel}`}>
          <Col xs={3} md={3} sm={3} className="p-0" style={{ height: "180px" }}>
            <Form.Label htmlFor="notes" style={{ marginTop: "0px" }}>
              Notes{" "}
            </Form.Label>
          </Col>
          <Col sm={7} md={7} xs={7} className="p-0">
            <textarea
              rows={8}
              cols={10}
              className="customFormControl"
              id="notes"
              name="notes"
              value={notes}
              style={{
                resize: "none",
                display: "fixed",
                minHeight: "160px",
                minWidth: "190px",
                boxShadow: "none",
                fontSize: "12px",
              }}
              onChange={(e) => {
                dispatch(setNotes(e.target.value));
              }}
            />
          </Col>
        </Form.Group>
      </div>
    </div>
  );
}

export default RerouteDetailScreenContent;
