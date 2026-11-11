import { Col, Form, Row } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";

import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDetailsandTextTabValues,
  setCustomerFK,
  setCustomerId,
  setCustomerInput,
  setCustomerSelection,
  setDealerFK,
  setDealerId,
  setDealerInput,
  setDealerSelection,
  setIsNonUnitNumberPresent,
  setIsRequirePO,
  setMiscInvoiceFormData,
  setNonUnitNumber,
  setPoNumber,
} from "../../../../redux/Invoicing/MiscInvoiceSlice";
import CustomerService from "../../../../services/CustomerService";
import MiscInvoiceService from "../../../../services/Invoicing/MiscInvoiceService";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import DealerLookup from "../../../LookupScreens/Dealer/DealerLookup";
import toast from "react-hot-toast";
import DealerService from "../../../../services/DealerService";
import { AdvancedLookupScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";

const NonUnitInvoiceContent = () => {
  const dispatch = useDispatch();
  const [customerLoading, setCustomerLoading] = useState(true);
  const [dealerLoading, setDealerLoading] = useState(true);
  const [customerDropdownData, setCustomerDropdownData] = useState([]);
  const [dealerDropdownData, setDealerDropdownData] = useState([]);
  const [isNonUnitInvoice, setIsNonUnitInvoice] = useState(false);
  const [requirePO, setRequirePO] = useState(false);
  const customerId = useSelector((state) => state.miscInvoiceReducer.customerId);
  const customerInput = useSelector((state) => state.miscInvoiceReducer.customerInput);
  const customerSelection = useSelector((state) => state.miscInvoiceReducer.customerSelection);
  const dealerId = useSelector((state) => state.miscInvoiceReducer.dealerId);
  const dealerInput = useSelector((state) => state.miscInvoiceReducer.dealerInput);
  const dealerSelection = useSelector((state) => state.miscInvoiceReducer.dealerSelection);
  const pageNumber = useSelector((state) => state.miscInvoiceReducer.pageNumber);
  const searchCriteria = useSelector((state) => state.miscInvoiceReducer.searchCriteria);
  const nonUnitNumber = useSelector((state) => state.miscInvoiceReducer.nonUnitNumber);
  const poNumber = useSelector((state) => state.miscInvoiceReducer.poNumber);
  const isNonUnitInvoiceflag = useSelector((state) => state.miscInvoiceReducer.isNonUnitInvoice);
  const isUnitInvoice = useSelector((state) => state.miscInvoiceReducer.isUnitInvoice);
  const miscInvoiceData = useSelector((state) => state.miscInvoiceReducer.miscInvoiceData);
  const invoiceSisterCustomer = useSelector((state) => state.miscInvoiceReducer.invoiceSisterCustomer);
  const isSisterCompany = useSelector((state) => state.miscInvoiceReducer.isSisterCompany);
  const id = useSelector((state) => state.miscInvoiceReducer.id);
  const customerModalHide = () => {
    dispatch(setCustomerSelection(false));
  };
  const dealerModalHide = () => {
    dispatch(setDealerSelection(false));
  };

  const nonUnitFormData = () => {
    dispatch(
      setMiscInvoiceFormData({
        invoiceSisterCustomer: false,
        isSisterCompany: false,
      })
    );
  };
  /***Setting the save Object for the Details Tab***/
  useEffect(() => {
    nonUnitFormData();
  }, [invoiceSisterCustomer, isSisterCompany]);

  /*****
   *  AutoComplete for Dealer
   * *********/
  const fetchDealer = (string) => {
    setDealerLoading(true);
    MiscInvoiceService.getDealerByName(string, customerId)
      .then((response) => {
        const data = response?.data?.content;
        const dealerList = data?.map((dealers) => ({ ...dealers, name: dealers.name?.trim() }));
        setDealerDropdownData(dealerList);
        setDealerLoading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong!!");
      });
  };

  /* AutoComplete for Customer****/
  const fetchCustomer = (string) => {
    setCustomerLoading(true);
    MiscInvoiceService.fetchCustomerAutoComplete(string, searchCriteria, pageNumber)
      .then((response) => {
        const data = response?.data;
        const customerList = data?.content?.map((data) => ({ ...data, name: data?.name?.trim() }));
        setCustomerDropdownData(customerList);
        setCustomerLoading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong!!");
        setCustomerLoading(false);
      });
  };
  /*******Set the dealer Input in Auto Completeby fetching */
  const setDealerValue = (dealerId) => {
    if (dealerId !== undefined) {
      DealerService.getDealerById(dealerId)
        .then((response) => {
          const data = response?.data;
          dispatch(setDealerInput(data?.name?.trim()));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setDealerInput(""));
    }
  };

  /*******Set the customer Input in Auto Completeby fetching */
  const setCustomerValue = (customerId) => {
    if (customerId !== undefined) {
      CustomerService.getCustomerById(customerId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerInput(data?.name?.trim()));
          setRequirePO(data?.requirePO);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setCustomerInput(""));
    }
  };
  /*****
   * USed to set the require PO for enabling and make the PO number
   *  field required.getting theb sttaus if requirePO number for customer
   * ****/
  useEffect(() => {
    if (requirePO) {
      dispatch(setIsRequirePO(true));
    }
  }, [requirePO]);

  /*******Customer Lookup Model******/
  const handleCustomerLookupModalShow = () => {
    dispatch(setCustomerSelection(true));
  };

  /*******Dealer Lookup Model******/
  const handleDealerLookupModalShow = () => {
    dispatch(setDealerSelection(true));
  };
  useEffect(() => {
    if (customerId) {
      setCustomerValue(customerId);
    }
  }, [customerId]);
  useEffect(() => {
    if (dealerId) {
      setDealerValue(dealerId);
    }
  }, [dealerId]);

  /*******
   * Look Up Selection for Miscellaneous Invoice
   * *****/
  const handleCustomerLookupSelection = (customer) => {
    dispatch(setCustomerInput(customer.name?.trim()));
    dispatch(setCustomerId(customer?.customerPK));
    dispatch(setCustomerFK(customer?.customerPK));
    dispatch(setCustomerSelection(false));
    /*****clear the dealer value if customer changed****/
    dispatch(setDealerId(null));
    dispatch(setDealerInput(""));
    setDealerDropdownData([]);
  };
  useEffect(() => {}, [customerId]);
  const handleDealerLookupSelection = (dealer) => {
    dispatch(setDealerInput(dealer.name?.trim()));
    dispatch(setDealerId(dealer?.dealerPK));
    dispatch(setDealerFK(dealer?.dealerPK));
    dispatch(setDealerSelection(false));
  };
  /******Save form data for Invoice fo Unit Unit */
  const nonUnitInvoiceFormData = () => {
    dispatch(
      setMiscInvoiceFormData({
        poNumber: poNumber,
        isNonUnitInvoice: 1,
        nonUnitUnitNumber: nonUnitNumber,
        customerId: customerId,
        dealerId: dealerId,
      })
    );
  };

  useEffect(() => {
    nonUnitInvoiceFormData();
  }, [poNumber, isNonUnitInvoice, nonUnitNumber, customerId, dealerId]);

  /******Used to enable the next button on Non Unit Number*****/
  useEffect(() => {
    if (nonUnitNumber && nonUnitNumber.length >= 5) {
      dispatch(setIsNonUnitNumberPresent(true));
    } else {
      dispatch(setIsNonUnitNumberPresent(false));
    }
  }, [nonUnitNumber]);
  useEffect(() => {
    if (miscInvoiceData?.length > 0) {
      dispatch(setMiscInvoiceFormData(null));
      dispatch(resetDetailsandTextTabValues());
    }
  }, [miscInvoiceData]);

  /*******Clear the dealer value on changing the customer id
   * prevCustomerId stores the last known customerId.
   * prevCustomerId.current = customerId; updates the reference after processing
   ******/
  const prevCustomerId = useRef(customerId);
  useEffect(() => {
    if (prevCustomerId.current !== customerId) {
      dispatch(setDealerId(null));
      dispatch(setDealerInput(""));
      prevCustomerId.current = customerId;
    }
  }, [customerId]);

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="ps-3 mb-4 ">
          <Row>
            <Col xs={7}>
              <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col xs={2} className="p-0">
                  <Form.Label htmlFor="unitNumber" className={`col-form-label  dealer-label`} id="unitNumber">
                    Unit Number
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0" style={{ width: "170px" }}>
                  <input
                    id="nonUnitNumber"
                    name="nonUnitNumber"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    maxLength={21}
                    value={nonUnitNumber} // Bind the input value to the state
                    onChange={(e) => {
                      dispatch(setNonUnitNumber(e.target.value.toUpperCase())); // Convert to uppercase before updating the state
                    }}
                    className={`customFormControl ${nonUnitNumber?.length >= 5 ? "borderGreen" : "borderRed"}`}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col xs={2} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="poNumber">
                    PO Number
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0" style={{ width: "250px" }}>
                  <input
                    className={`customFormControl ${requirePO ? (poNumber ? "borderGreen" : "borderRed") : ""}`}
                    id="poNumber"
                    name="poNumber"
                    type="text"
                    autoComplete="off"
                    value={poNumber}
                    maxLength={30}
                    aria-autocomplete="list"
                    onChange={(e) => {
                      dispatch(setPoNumber(e.target.value));
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="form-group mt-4 align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Customer</Form.Label>
                </Col>

                <Col xs={8} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={customerDropdownData}
                    searchString={customerInput}
                    renderItemId={(customer) => customer.customerPK}
                    renderItemField={(customer) => customer.name}
                    handleSearchString={(string) => dispatch(setCustomerInput(string))}
                    fetchDataBySearchString={fetchCustomer}
                    loading={customerLoading}
                    onSelect={handleCustomerLookupSelection}
                    selectedId={customerId}
                    clearInputCallback={() => {
                      dispatch(setCustomerId(null));
                      dispatch(setIsRequirePO(false));
                    }}
                    handleAutoCompleteClose={() => {
                      dispatch(setCustomerId(null));
                      dispatch(setIsRequirePO(false));
                    }}
                    className={`${!customerId ? "borderRed" : "borderGreen"}`}
                    disabled={false}
                  />

                  <LookupButton onClick={handleCustomerLookupModalShow} />
                </Col>
              </Form.Group>
              <Form.Group className="form-group mt-4 align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Dealer</Form.Label>
                </Col>

                <Col xs={8} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={dealerDropdownData}
                    searchString={dealerInput}
                    renderItemId={(dealer) => dealer.dealerPK}
                    renderItemField={(dealer) => dealer.name}
                    handleSearchString={(string) => dispatch(setDealerInput(string))}
                    fetchDataBySearchString={fetchDealer}
                    loading={dealerLoading}
                    onSelect={handleDealerLookupSelection}
                    selectedId={dealerId}
                    clearInputCallback={() => {
                      dispatch(setDealerId(null));
                    }}
                    handleAutoCompleteClose={() => {
                      dispatch(setDealerId(null));
                    }}
                    className={`${customerId ? (!dealerId ? "borderRed" : "borderGreen") : ""}`}
                    disabled={!customerId}
                  />

                  <LookupButton onClick={handleDealerLookupModalShow} disabled={!customerId} />
                </Col>
              </Form.Group>
            </Col>
            <Col xs={6}></Col>
          </Row>
          <CustomerLookup
            show={customerSelection}
            onHide={customerModalHide}
            renderItemId={(customer) => customer.customerPK}
            renderItemField={(customer) => customer.name}
            handleLookupSelection={handleCustomerLookupSelection}
            isMiscInvoice
          />
          <DealerLookup
            show={dealerSelection}
            onHide={dealerModalHide}
            renderItemId={(dealer) => dealer.dealerPK}
            renderItemField={(dealer) => dealer.name}
            handleLookupSelection={handleDealerLookupSelection}
            isMiscInvoice
            customerId={customerId}
          />
        </div>
      </div>
    </div>
  );
};

export default NonUnitInvoiceContent;
