import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setCombinationCheck,
  setCustomerId,
  setCustomerName,
  setCustomerSelection,
  setDealerId,
  setDealerName,
  setDealerSelection,
  setNotes,
  setSpecialCodeDescription,
  setSpecialCodeId,
  setSpecialCodeSelection,
  setStateCode,
  setStateCodeName,
  setViewDetail,
} from "../../../../../../../../redux/DispatchRestrictionsSlice";
import DispatchRestrictionsService from "../../../../../../../../services/DispatchRestrictionsService";
import AutoCompleteDropdown from "../../../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../../../common/LookupButton";
import CustomerLookup from "../../../../../../../LookupScreens/Customer/CustomerLookup";
import DealerLookup from "../../../../../../../LookupScreens/Dealer/DealerLookup";
import SpecialCodeLookup from "../../../../../../../LookupScreens/SpecialCode/SpecialCodeLookup";

function NewForm({ styles }) {
  const { driverId, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([]);
  const [dealerData, setDealerData] = useState([]);
  const [specialCodeData, setSpecialCodeData] = useState([]);
  const [stateData, setStateData] = useState([]);

  const [dropdownLoading, setDropdownLoading] = useState(false);

  const viewDetail = useSelector((state) => state.dispatchRestrictionsReducer.viewDetail);
  const addDate = useSelector((state) => state.dispatchRestrictionsReducer.addDate);
  const userName = useSelector((state) => state.dispatchRestrictionsReducer.userName);
  const notes = useSelector((state) => state.dispatchRestrictionsReducer.notes);
  const editFormData = useSelector((state) => state.dispatchRestrictionsReducer.editFormData);
  const customerName = useSelector((state) => state.dispatchRestrictionsReducer.customerName);
  const allowDispatch = useSelector((state) => state.dispatchRestrictionsReducer.allowDispatch);
  const customerId = useSelector((state) => state.dispatchRestrictionsReducer.customerId);
  const customerSelection = useSelector((state) => state.dispatchRestrictionsReducer.customerSelection);
  const dealerSelection = useSelector((state) => state.dispatchRestrictionsReducer.dealerSelection);
  const specialCodeSelection = useSelector((state) => state.dispatchRestrictionsReducer.specialCodeSelection);
  const dealerName = useSelector((state) => state.dispatchRestrictionsReducer.dealerName);
  const dealerId = useSelector((state) => state.dispatchRestrictionsReducer.dealerId);
  const specialCodeId = useSelector((state) => state.dispatchRestrictionsReducer.specialCodeId);
  const specialCodeDescription = useSelector(
    (state) => state.dispatchRestrictionsReducer.specialCodeDescription
  );
  const stateCodeName = useSelector((state) => state.dispatchRestrictionsReducer.stateCodeName);
  const stateCode = useSelector((state) => state.dispatchRestrictionsReducer.stateCode);
  const combinationCheck = useSelector((state) => state.dispatchRestrictionsReducer.combinationCheck);

  const hanldeCheckcombination = (driverId, customerId, dealerId, specialCodeId, stateCode) => {
    DispatchRestrictionsService.checkCombination(driverId, customerId, dealerId, specialCodeId, stateCode)
      .then((res) => {
        dispatch(setCombinationCheck(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchStateCode = (string) => {
    setDropdownLoading(true);
    DispatchRestrictionsService.fetchPickupState(string)
      .then((response) => {
        const data = response.data;
        const stateCodeList = data.content?.map((data) => ({ ...data, stateName: data.stateName?.trim() }));

        setStateData(stateCodeList);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };

  const fetchSpecialCode = (string) => {
    setDropdownLoading(true);
    DispatchRestrictionsService.getSpecialCodeForAuto(string)
      .then((response) => {
        const data = response.data;
        const specialCodeList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));

        setSpecialCodeData(specialCodeList);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };
  const fetchCustomer = (string) => {
    setDropdownLoading(true);
    DispatchRestrictionsService.fetchCustomerAutoComplete(string)
      .then((response) => {
        const data = response.data;
        const customerList = data.content?.map((data) => ({ ...data, name: data.name?.trim() }));
        setCustomerData(customerList);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };

  const fetchDealer = (string) => {
    setDropdownLoading(true);
    DispatchRestrictionsService.fetchDealerByName(string)
      .then((response) => {
        const data = response.data;
        const dealerList = data.content?.map((data) => ({ ...data, name: data.name?.trim() }));
        setDealerData(dealerList);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };
  const hideCustomerModel = () => {
    dispatch(setCustomerSelection(false));
  };
  const hideDealerModel = () => {
    dispatch(setDealerSelection(false));
  };
  const hideSpecialModel = () => {
    dispatch(setSpecialCodeSelection(false));
  };
  const handleCustomerLookupModalShow = () => {
    dispatch(setCustomerSelection(true));
  };
  const handleDealerLookupModalShow = () => {
    dispatch(setDealerSelection(true));
  };
  const handleSpecialCodeLookupModalShow = () => {
    dispatch(setSpecialCodeSelection(true));
  };

  const handleCustomerLookupSelection = (customer) => {
    dispatch(setCustomerName(customer.name));
    dispatch(setCustomerId(customer.customerPK));
    dispatch(setCustomerSelection(false));
  };

  const handleStateLookupSelection = (s) => {
    dispatch(setStateCodeName(s.stateName));
    dispatch(setStateCode(s.stateCode));
    dispatch(setCustomerSelection(false));
  };
  const handleDealerLookupSelection = (dealer) => {
    dispatch(setDealerName(dealer.name));
    dispatch(setDealerId(dealer.dealerPK));
    dispatch(setDealerSelection(false));
  };
  const handlespecialLookupSelection = (s) => {
    dispatch(setSpecialCodeDescription(s.description));
    dispatch(setSpecialCodeId(s.specialCodePK));
    dispatch(setSpecialCodeSelection(false));
  };
  useEffect(() => {
    hanldeCheckcombination(driverId, customerId, dealerId, specialCodeId, stateCode);
  }, [customerId, specialCodeId, dealerId, stateCode]);

  useEffect(() => {
    if (dealerId) {
      dispatch(setCustomerName(""));
      dispatch(setCustomerId(null));
      dispatch(setSpecialCodeId(null));
      dispatch(setSpecialCodeDescription(""));
      dispatch(setStateCodeName(""));
      dispatch(setStateCode(""));
    } else if (customerId) {
      dispatch(setDealerName(""));
      dispatch(setDealerId(null));
      dispatch(setSpecialCodeId(null));
      dispatch(setSpecialCodeDescription(""));
      dispatch(setStateCodeName(""));
      dispatch(setStateCode(""));
    } else if (specialCodeId) {
      dispatch(setDealerName(""));
      dispatch(setDealerId(null));
      dispatch(setStateCodeName(""));
      dispatch(setStateCode(""));
      dispatch(setCustomerName(""));
      dispatch(setCustomerId(null));
    } else if (stateCode) {
      dispatch(setDealerName(""));
      dispatch(setDealerId(null));
      dispatch(setCustomerName(""));
      dispatch(setCustomerId(null));
      dispatch(setSpecialCodeId(null));
      dispatch(setSpecialCodeDescription(""));
    }
  }, [customerId, specialCodeId, dealerId, stateCode]);

  useEffect(() => {
    dispatch(setViewDetail(false));
  }, []);

  return (
    <form>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10 p-10 m-0">
            <div className="p-15 w-100">
              <Col xl={8} lg={8} md={8} sm={8} xs={8} className="m-t-25">
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-2">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label m-l-0">Dealer</Form.Label>
                  </Col>
                  <Col xs={7} md={5} sm={7} className="p-0  mt-1 d-flex" style={{ width: "300px" }}>
                    <AutoCompleteDropdown
                      className={`${
                        combinationCheck && dealerId
                          ? "borderRed"
                          : dealerId
                            ? "borderGreen"
                            : !customerId && !dealerId && !stateCode && !specialCodeId
                              ? "borderRed"
                              : ""
                      }`}
                      arrayList={dealerData}
                      searchString={dealerName}
                      handleSearchString={(string) => dispatch(setDealerName(string))}
                      fetchDataBySearchString={fetchDealer}
                      loading={dropdownLoading}
                      renderItemId={(dealer) => dealer.dealerPK}
                      renderItemField={(dealer) => dealer.name}
                      onSelect={handleDealerLookupSelection}
                      selectedId={dealerId}
                      disabled={viewDetail || specialCodeId || customerId || stateCode}
                      clearInputCallback={() => {
                        dispatch(setDealerId(null));
                      }}
                    />
                    <LookupButton
                      onClick={handleDealerLookupModalShow}
                      disabled={viewDetail || specialCodeId || customerId || stateCode}
                    />
                  </Col>
                  <Row className={`hide-elements`}>
                    <Col xs={5} md={5} sm={5} style={{ width: "140px" }}></Col>
                    <Col>
                      <p className="p-0 text-danger alert" style={{ height: "1px" }}>
                        Combination already exists!
                      </p>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-1">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label m-l-0">Customer</Form.Label>
                  </Col>
                  <Col xs={7} md={5} sm={7} className="p-0  mt-1 d-flex" style={{ width: "300px" }}>
                    <AutoCompleteDropdown
                      className={`${
                        combinationCheck && customerId
                          ? "borderRed"
                          : customerId
                            ? "borderGreen"
                            : !customerId && !dealerId && !stateCode && !specialCodeId
                              ? "borderRed"
                              : ""
                      }`}
                      arrayList={customerData}
                      searchString={customerName}
                      handleSearchString={(string) => dispatch(setCustomerName(string))}
                      fetchDataBySearchString={fetchCustomer}
                      loading={dropdownLoading}
                      renderItemId={(customer) => customer.customerPK}
                      renderItemField={(customer) => customer.name}
                      onSelect={handleCustomerLookupSelection}
                      selectedId={customerId}
                      disabled={viewDetail || dealerId || stateCode || specialCodeId}
                      clearInputCallback={() => {
                        dispatch(setCustomerId(null));
                      }}
                    />
                    <LookupButton
                      onClick={handleCustomerLookupModalShow}
                      disabled={viewDetail || dealerId || stateCode || specialCodeId}
                    />
                  </Col>
                  <Row className={`hide-elements`}>
                    <Col xs={5} md={5} sm={5} style={{ width: "140px" }}></Col>
                    <Col>
                      <p className="p-0 text-danger alert" style={{ height: "1px" }}>
                        Combination already exists!
                      </p>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-1">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label m-l-0">Special</Form.Label>
                  </Col>
                  <Col xs={7} md={5} sm={7} className="p-0  mt-1 d-flex" style={{ width: "300px" }}>
                    <AutoCompleteDropdown
                      className={`${
                        combinationCheck && specialCodeId
                          ? "borderRed"
                          : specialCodeId
                            ? "borderGreen"
                            : !customerId && !dealerId && !stateCode && !specialCodeId
                              ? "borderRed"
                              : ""
                      }`}
                      arrayList={specialCodeData}
                      searchString={specialCodeDescription}
                      handleSearchString={(string) => dispatch(setSpecialCodeDescription(string))}
                      fetchDataBySearchString={fetchSpecialCode}
                      loading={dropdownLoading}
                      renderItemId={(s) => s.specialCodePK}
                      renderItemField={(s) => s.description}
                      onSelect={handlespecialLookupSelection}
                      selectedId={specialCodeId}
                      disabled={viewDetail || dealerId || customerId || stateCode}
                      clearInputCallback={() => {
                        dispatch(setSpecialCodeId(null));
                      }}
                    />
                    <LookupButton
                      onClick={handleSpecialCodeLookupModalShow}
                      disabled={viewDetail || dealerId || customerId || stateCode}
                    />
                  </Col>
                  <Row className={`hide-elements`}>
                    <Col xs={5} md={5} sm={5} style={{ width: "140px" }}></Col>
                    <Col>
                      <p className="p-0 text-danger alert" style={{ height: "1px" }}>
                        Combination already exists!
                      </p>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-1">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label m-l-0">State</Form.Label>
                  </Col>
                  <Col xs={4} md={4} sm={4} className="p-0  mt-1 d-flex">
                    <AutoCompleteDropdown
                      className={`${
                        combinationCheck && stateCode
                          ? "borderRed"
                          : stateCode
                            ? "borderGreen"
                            : (!customerId && !dealerId && !stateCode && !specialCodeId && !stateCodeName) ||
                                (stateCodeName && !stateCode)
                              ? "borderRed"
                              : ""
                      }`}
                      onBeforeInput={(e) => {
                        if (e.target.value.length === 0 && e.data === " ") {
                          e.preventDefault();
                        }
                      }}
                      arrayList={stateData}
                      searchString={stateCodeName}
                      handleSearchString={(string) => dispatch(setStateCodeName(string))}
                      fetchDataBySearchString={fetchStateCode}
                      loading={dropdownLoading}
                      renderItemId={(s) => s.stateCode}
                      renderItemField={(s) => s.stateName}
                      onSelect={handleStateLookupSelection}
                      selectedId={stateCode}
                      maxHeight={"200px"}
                      disabled={viewDetail || dealerId || customerId || specialCodeId}
                      clearInputCallback={() => {
                        dispatch(setStateCode(""));
                      }}
                    />
                  </Col>
                  <Row className={`hide-elements`}>
                    <Col xs={5} md={5} sm={5} style={{ width: "140px" }}></Col>
                    <Col>
                      <p className="p-0 text-danger alert" style={{ height: "1px" }}>
                        Combination already exists!
                      </p>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group
                  className={`mt-1 m-b-10 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col xs={3} md={3} sm={3} className="p-0" style={{ height: "130px" }}>
                    <Form.Label htmlFor="permitInstructions" className="">
                      No Dispatch Reason
                    </Form.Label>
                  </Col>
                  <Col sm={9} md={9} xs={9} className="p-0">
                    <textarea
                      rows={10}
                      cols={25}
                      type="text"
                      className={`${notes ? "borderGreen" : "borderRed"} customFormControl`}
                      id="permitInstructions"
                      name="permitInstructions"
                      value={notes}
                      style={{
                        resize: "none",
                        minHeight: "130px",
                        minWidth: "600px",
                        fontSize: "12px",
                        outline: "none",
                      }}
                      onBeforeInput={(e) => {
                        if (e.target.value.length === 0 && e.data === " ") {
                          e.preventDefault();
                        }
                      }}
                      onInput={(e) => {
                        dispatch(setNotes(e.target.value));
                      }}
                      disabled={viewDetail}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </div>
          </div>
        </div>
        <CustomerLookup
          show={customerSelection}
          onHide={hideCustomerModel}
          renderItemId={(customer) => customer.customerPK}
          renderItemField={(customer) => customer.name}
          handleLookupSelection={handleCustomerLookupSelection}
          MaintenanceProgram
        />
        <DealerLookup
          show={dealerSelection}
          onHide={hideDealerModel}
          renderItemId={(d) => d.dealerPK}
          renderItemField={(d) => d.name}
          handleLookupSelection={handleDealerLookupSelection}
          MaintenanceProgram
        />
        <SpecialCodeLookup
          show={specialCodeSelection}
          onHide={hideSpecialModel}
          renderItemId={(s) => s.specialCodePK}
          renderItemField={(s) => s.description}
          handleLookupSelection={handlespecialLookupSelection}
          MaintenanceProgram
        />
      </div>
    </form>
  );
}

export default NewForm;
