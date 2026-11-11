import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import {
  resetChanges,
  setCustomerId,
  setCustomerInput,
  setDelimited,
  setDelimiter,
  setDescription,
  setDisableSave,
  setEditFormData,
  setHasHeaders,
  setHeaderRows,
  setIsCustomerLoading,
  setIsCustomerOrderLoading,
  setRadioValue,
  setViewDetail,
  setCustomerOrders,
  setCustomerOrdersColumnList,
  setSpecialCondition,
  setSpecialConditionsList,
} from "../../../../../redux/CustomerOrdersSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomerOrdersService from "../../../../../services/CustomerOrdersService";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import CustomerOrderColumnsService from "../../../../../services/CustomerOrderColumnsService";
import CustomerService from "../../../../../services/CustomerService";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import { Radio, RadioGroup } from "react-radio-group";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import {
  setCustomerData,
  setLoading as setLoadCustomers,
  setTotalElements as setCustomerTotalElements,
  setTotalPages as setCustomerTotalPages,
} from "../../../../../redux/LookupScreens/CustomerLookupSlice";
import CustomerLookup from "../../../../LookupScreens/Customer/CustomerLookup";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";

const General = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [customerArray, setCustomerArray] = useState([]);
  const [showCustomerLookup, setShowCustomerLookup] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);
  const description = useSelector((state) => state.customerOrdersReducer.description);
  const radioValue = useSelector((state) => state.customerOrdersReducer.radioValue);
  const delimited = useSelector((state) => state.customerOrdersReducer.delimited);
  const delimiter = useSelector((state) => state.customerOrdersReducer.delimiter);
  const hasHeaders = useSelector((state) => state.customerOrdersReducer.hasHeaders);
  const headerRows = useSelector((state) => state.customerOrdersReducer.headerRows);
  const viewDetail = useSelector((state) => state.customerOrdersReducer.viewDetail);
  const editFormData = useSelector((state) => state.customerOrdersReducer.editFormData);
  const changesCancelled = useSelector((state) => state.customerOrdersReducer.changesCancelled);
  const customerId = useSelector((state) => state.customerOrdersReducer.customerId);
  const customerInput = useSelector((state) => state.customerOrdersReducer.customerInput);
  const isCustomerOrderLoading = useSelector((state) => state.customerOrdersReducer.isCustomerOrderLoading);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;

  //Customer lookup
  const pageNo = useSelector((state) => state.customerLookupReducer.pageNo);
  const sortFlag = useSelector((state) => state.customerLookupReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.customerLookupReducer.normalSortValue);
  const searchedCustomer = useSelector((state) => state.customerLookupReducer.searchedCustomer);
  const selectedSearchCriteria = useSelector((state) => state.customerLookupReducer.selectedSearchCriteria);
  const advanceSortingOrder = useSelector((state) => state.customerLookupReducer.advanceSortingOrder);
  const searchTerms = useSelector((state) => state.customerLookupReducer.searchTerms);
  const [isDescriptionDuplicate, setIsDescriptionDuplicate] = useState(false);

  //Used for Customer Selection Lookup
  const handleCustomerLookup = () => {
    setShowCustomerLookup(true);
  };

  //Customer Lookup Selection
  const handleCustomerSelection = (item) => {
    setShowCustomerLookup(false);
    dispatch(setCustomerId(item.customerPK));
    dispatch(setCustomerInput(item.name?.trim()));
  };

  const fetchData = () => {
    CustomerOrderColumnsService.customerOrderColumnlist(id)
      .then((response) => {
        const { data } = response;

        dispatch(setCustomerOrdersColumnList({ actionType: "set", payload: data }));
      })
      .catch(() => {});
  };

  //Set the Customer Orders Data
  useEffect(() => {
    if (id) {
      dispatch(setIsCustomerOrderLoading(true));

      CustomerOrdersService.getCustomerOrdersById(id)
        .then((response) => {
          if (response?.data == "") navigate("/customer-orders");
          const { data } = response;
          dispatch(setEditFormData(data?.response?.result[0]));
          dispatch(setViewDetail(true));
          dispatch(setSpecialCondition(data?.specialCondition || ""));
          setTimeout(() => {
            dispatch(setIsCustomerOrderLoading(false));
          }, 100);
        })
        .catch((err) => {
          dispatch(setIsCustomerOrderLoading(false));
          navigate("/customer-orders");
        });
    }
  }, [id]);

  //Customer AutoComplete
  const fetchAllCustomers = (string) => {
    setCustomerLoading(true);
    CustomerOrdersService.fetchCustomerAutoComplete(string)
      .then((response) => {
        const data = response?.data?.content;
        const customerList = data?.map((customer) => ({ ...customer, name: customer.name?.trim() }));
        setCustomerArray(customerList);
      })
      .finally(() => {
        setCustomerLoading(false);
      });
  };

  //For Customer Lookup
  const getCustomerLookupValue = () => {
    CustomerOrdersService.getAllCustomersForLookup(
      pageNo,
      searchedCustomer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortFlag,
      sortValue
    )
      .then((response) => {
        const data = response?.data;
        if (data?.content === undefined) {
          dispatch(setCustomerData([]));
        } else dispatch(setCustomerData(data?.content));
        dispatch(setCustomerTotalElements(data?.totalElements));
        dispatch(setCustomerTotalPages(data?.totalPages));
        dispatch(setLoadCustomers(false));
      })
      .catch((err) => {
        dispatch(setLoadCustomers(false));
      })
      .finally(() => dispatch(setLoadCustomers(false)));
  };

  //save validation
  useEffect(() => {
    if (
      description &&
      customerId &&
      !isDescriptionDuplicate &&
      ((hasHeaders && Number(headerRows) > 0 && Number(headerRows) <= 999) || !hasHeaders)
    ) {
      dispatch(setDisableSave(false));
    } else {
      dispatch(setDisableSave(true));
    }
  }, [description, isDescriptionDuplicate, customerId, hasHeaders, headerRows]);

  //Save object for backend
  useEffect(() => {
    dispatch(
      setCustomerOrders({
        customerOrderPK: Number(id) || null,
        description: description,
        customerFK: customerId,
        fileType: radioValue,
        delimited: delimited,
        delimiter: delimiter,
        hasHeaders: hasHeaders,
        headerRows: headerRows,
        userFK: userPK,
      })
    );
  }, [
    description,
    customerId,
    radioValue,
    delimited,
    delimiter,
    hasHeaders,
    headerRows,
    id,
    editFormData,
    userPK,
  ]);

  useEffect(() => {
    if (editFormData == null || editFormData === undefined) {
      dispatch(resetChanges());
      setRadioValue("");
    }
  }, [editFormData]);

  useEffect(() => {
    if (editFormData === null) {
      dispatch(setDescription(""));
      dispatch(setCustomerId(""));
      dispatch(setCustomerInput(""));
      dispatch(setRadioValue("txtFile"));
      dispatch(setDelimited(false));
      dispatch(setDelimiter(""));
      dispatch(setHasHeaders(false));
      dispatch(setHeaderRows(""));
    }
  }, [editFormData]);

  useEffect(() => {
    if (editFormData !== null) {
      dispatch(setDescription(editFormData?.Description || ""));
      dispatch(setCustomerId(editFormData?.CustomerFK || ""));
      dispatch(setCustomerInput(editFormData?.Customer || ""));
      dispatch(setRadioValue(editFormData?.FileType));
      dispatch(setDelimited(Boolean(editFormData?.Delimited)));
      dispatch(setDelimiter(editFormData?.Delimiter || ""));
      dispatch(setHasHeaders(Boolean(editFormData?.HasHeaders)));
      dispatch(setHeaderRows(editFormData?.HeaderRows || ""));
      // Seed the Conditions tab from the fetched { Condition1, Condition2, ... } object.
      const incomingConditions = editFormData?.specialConditionsObj || {};
      const conditionsList = Object.keys(incomingConditions)
        .sort((a, b) => (parseInt(a.replace(/\D/g, ""), 10) || 0) - (parseInt(b.replace(/\D/g, ""), 10) || 0))
        .map((key) => incomingConditions[key]);
      dispatch(setSpecialConditionsList(conditionsList));
    }
  }, [editFormData, changesCancelled]);

  useEffect(() => {
    dispatch(resetChanges());
  }, []);

  //Check uniqueness of description
  const checkUniqueDescription = (description) => {
    CustomerOrdersService.checkDescriptionExist(id, description)
      .then((res) => {
        setIsDescriptionDuplicate(res?.data);
      })
      .catch((err) => {
        setIsDescriptionDuplicate(false);
      });
  };

  useEffect(() => {
    if (id) {
      if (!viewDetail) {
        setIsDescriptionDuplicate(false);
      } else {
        fetchData();
      }
    }
  }, [viewDetail]);

  //If Headers is empty Clear the Header Rows
  useEffect(() => {
    if (!viewDetail && !hasHeaders) {
      dispatch(setHeaderRows(""));
    }
  }, [viewDetail, hasHeaders]);

  //If delimited is false Clear the Delimiter
  useEffect(() => {
    if (!delimited) {
      dispatch(setDelimiter(""));
    }
  }, [delimited]);

  const isNumber = (value) => {
    if (!value) return value;
    const days = value?.replace(/[^\d]/g, "");
    if (value) return days;
  };

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Col xs={9} className="ps-3">
              <Form.Group className={`mt-5 m-b-10 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel}`}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="description" className={QuarterScreen.colFormLabel}>
                    Description
                  </Form.Label>
                </Col>
                <Col xs={7} md={7} className="p-0">
                  <input
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    maxLength={30}
                    disabled={viewDetail}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onChange={(e) => {
                      dispatch(setDescription(e.target.value));
                      setIsDescriptionDuplicate(false);
                    }}
                    onBlur={(e) => {
                      const trimmed = e.target.value?.replace(/\s+$/, "");
                      dispatch(setDescription(trimmed));
                      checkUniqueDescription(trimmed);
                    }}
                    className={`${QuarterScreen.formControl} ${
                      !viewDetail && !isCustomerOrderLoading
                        ? description && !isDescriptionDuplicate
                          ? "borderGreen"
                          : "borderRed"
                        : ""
                    }`}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="customer" className={QuarterScreen.colFormLabel}>
                    Customer
                  </Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className={`p-0 d-flex`}>
                  <AutoCompleteDropdown
                    arrayList={customerArray}
                    selectedId={customerId}
                    searchString={customerInput}
                    renderItemId={(item) => item.customerPK}
                    renderItemField={(item) => item.name}
                    handleSearchString={(string) => dispatch(setCustomerInput(string))}
                    fetchDataBySearchString={fetchAllCustomers}
                    loading={customerLoading}
                    onSelect={handleCustomerSelection}
                    clearInputCallback={() => {
                      dispatch(setCustomerId(""));
                    }}
                    disabled={viewDetail}
                    className={`${
                      !viewDetail && !isCustomerOrderLoading
                        ? !customerId || (!customerId && customerInput)
                          ? "borderRed"
                          : "borderGreen"
                        : ""
                    }`}
                  />

                  <LookupButton onClick={handleCustomerLookup} disabled={viewDetail} />
                </Col>
              </Form.Group>
              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">File Type</Form.Label>
                </Col>

                <Col xs={8} className="p-0 ">
                  <CustomRadioGroup
                    name="fileType"
                    horizontal
                    horizontalAlignmentClassName="pe-4"
                    selectedOption={radioValue}
                    disabled={viewDetail}
                    onChange={(value) => {
                      dispatch(setRadioValue(value));
                      if (!delimited) return;
                      dispatch(setDelimiter(value === "txtFile" ? "TAB" : ","));
                    }}
                    options={[
                      { value: "txtFile", label: "TXT", width: "70px" },
                      { value: "csvFile", label: "CSV", disabled: false },
                      { value: "xlsxFile", label: "XLSX", disabled: false },
                    ]}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Has Headers
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="hasHeaders"
                    name="hasHeaders"
                    checked={hasHeaders}
                    disabled={viewDetail}
                    onChange={(e) => {
                      dispatch(setHasHeaders(e.target.checked));
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className={QuarterScreen.colFormLabel}>
                    Header Rows
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} className="p-0" style={{ width: "50px" }}>
                  <input
                    id="headerRows"
                    name="headerRows"
                    type="text"
                    maxLength={3}
                    value={headerRows}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled={viewDetail || !hasHeaders}
                    onChange={(e) => {
                      dispatch(setHeaderRows(isNumber(e.target.value)));
                    }}
                    className={`${QuarterScreen.formControl} ${
                      !viewDetail
                        ? hasHeaders
                          ? headerRows > 0 && headerRows <= 999
                            ? "borderGreen"
                            : "borderRed"
                          : ""
                        : ""
                    }`}
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Delimited
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0"
                    id="delimited"
                    name="delimited"
                    checked={delimited}
                    disabled={viewDetail}
                    onChange={(e) => {
                      dispatch(setDelimited(e.target.checked));
                      if (radioValue === "txtFile" && e.target.checked) {
                        dispatch(setDelimiter("TAB"));
                      } else if (
                        (radioValue === "csvFile" || radioValue === "xlsxFile") &&
                        e.target.checked
                      ) {
                        // csvFile or xlsxFile
                        dispatch(setDelimiter(","));
                      } else {
                        dispatch(setDelimiter(""));
                      }
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Delimiter
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} className="p-0" style={{ width: "120px" }}>
                  <input
                    id="delimiter"
                    name="delimiter"
                    type="text"
                    value={delimiter}
                    maxLength={10}
                    disabled={viewDetail || !delimited}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onChange={(e) => {
                      dispatch(setDelimiter(e.target.value));
                    }}
                    className={`${QuarterScreen.formControl} ${
                      !viewDetail ? (delimited ? (delimiter ? "borderGreen" : "borderRed") : "") : ""
                    }`}
                  />
                </Col>
              </Form.Group>
            </Col>
            {/* Customer Lookup Modal */}
            <CustomerLookup
              show={showCustomerLookup}
              onHide={() => setShowCustomerLookup(false)}
              renderItemId={(item) => item.customerPK}
              handleLookupSelection={handleCustomerSelection}
              customFetchFunction={getCustomerLookupValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
