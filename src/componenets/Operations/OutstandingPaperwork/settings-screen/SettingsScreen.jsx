import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";

import CommonFooter from "../../../common/CommonFooter";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import DateInputField from "../../../common/DateInputField";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import QuarterScreenWrapper from "../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../common/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  setAssignedDispatcher,
  setCompanyPK,
  setCustomer,
  setCustomerPK,
  setDeliveryDateFrom,
  setDeliveryDateTo,
  setDispatchedBy,
  setDispatcher,
  setDispatcherPK,
  setFlatbed,
  setIncludeNotes,
  setMotorized,
  setOnlyUnitsWithNotes,
  setPageNumber,
  setSelectedCompanyID,
  setSettingsAutocompleteData,
  setTowable,
  setUnitNumber,
  setUnitNumberAutocomplete,
  setUnitNumberLast5,
  setUnitNumberPK,
  setUnitsEnteredBy,
  setUnitsEnteredByPK,
} from "../../../../redux/OutstandingPaperworkSlice";
import OutstandingPaperworkService from "../../../../services/operations/OutstandingPaperworkService";
import { useNavigate } from "react-router-dom";
import UnitSelectionLookup from "../../../LookupScreens/UnitSelection/UnitSelectionLookup";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import UserLookup from "../../../LookupScreens/User/UserLookup";
import PreviewPopup from "../../../common/PreviewPopup";
import PaperworkProcessingService from "../../../../services/Invoicing/PaperworkProcessingService";
import UnitDispatchLookup from "../../../LookupScreens/UnitDispatch/UnitDispatchLookup";
import LoadingIcon from "../../../common/LoadingIcon";
import { parseLocalDate, formatDatetimeToDate } from "../../../../utils/dateUtils";

const SettingsScreen = () => {
  const pageNumber = useSelector((state) => state.outstandingPaperwork.pageNumber);
  const pageSize = useSelector((state) => state.outstandingPaperwork.pageSize);
  const unitNumber = useSelector((state) => state.outstandingPaperwork.unitNumber);
  const unitNumberPK = useSelector((state) => state.outstandingPaperwork.unitNumberPK);
  const unitNumberLast5 = useSelector((state) => state.outstandingPaperwork.unitNumberLast5);
  const customer = useSelector((state) => state.outstandingPaperwork.customer);
  const customerPK = useSelector((state) => state.outstandingPaperwork.customerPK);
  const dispatcherPK = useSelector((state) => state.outstandingPaperwork.dispatcherPK);
  const dispatcher = useSelector((state) => state.outstandingPaperwork.dispatcher);
  const deliveryDateFrom = useSelector((state) => state.outstandingPaperwork.deliveryDateFrom);
  const deliveryDateTo = useSelector((state) => state.outstandingPaperwork.deliveryDateTo);
  const assignedDispatcher = useSelector((state) => state.outstandingPaperwork.assignedDispatcher);
  const dispatchedBy = useSelector((state) => state.outstandingPaperwork.dispatchedBy);
  const onlyUnitsWithNotes = useSelector((state) => state.outstandingPaperwork.onlyUnitsWithNotes);
  const unitsEnteredBy = useSelector((state) => state.outstandingPaperwork.unitsEnteredBy);
  const unitsEnteredByPK = useSelector((state) => state.outstandingPaperwork.unitsEnteredByPK);
  const motorized = useSelector((state) => state.outstandingPaperwork.motorized);
  const towable = useSelector((state) => state.outstandingPaperwork.towable);
  const flatbed = useSelector((state) => state.outstandingPaperwork.flatbed);
  const sortValue = useSelector((state) => state.outstandingPaperwork.sortValue);
  const sortType = useSelector((state) => state.outstandingPaperwork.sortType);
  const includeNotes = useSelector((state) => state.outstandingPaperwork.includeNotes);
  const settingsAutocompleteData = useSelector(
    (state) => state.outstandingPaperwork.settingsAutocompleteData
  );

  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);
  const [showCustomerLookup, setShowCustomerLookup] = useState(false);
  const [showUnitsEnteredByLookup, setShowUnitsEnteredByLookup] = useState(false);
  const [showDispatcherLookup, setShowDispatcherLookup] = useState(false);
  const [dispatcherType, setDispatcherType] = useState("Assigned Dispatcher");
  const [unitNumberAutocompleteData, setUnitNumberAutocompleteData] = useState([]);
  const [dispatcherAutocompleteData, setDispatcherAutocompleteData] = useState([]);
  const [customerAutocompleteData, setCustomerAutocompleteData] = useState([]);
  const [unitsEnteredByAutocompleteData, setUnitsEnteredByAutocompleteData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFromDateValid, setIsFromDateValid] = useState(true);
  const [isToDateValid, setIsToDateValid] = useState(true);
  const [dispatcherLoading, setDispatcherLoading] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);
  const [unitNumberLoading, setUnitNumberLoading] = useState(false);
  const [unitByLoading, setUnitByLoading] = useState(false);

  const [lookupValidation, setLookupValidation] = useState(true);
  const driverNameInput = useSelector((state) => state.outstandingPaperwork.driverNameInput);
  const companyPK = useSelector((state) => state.outstandingPaperwork.companyPK);
  const companyName = useSelector((state) => state.outstandingPaperwork.companyName);
  const [showUnitLookup, setShowUnitLookup] = useState(false);
  const [companyNameFK, setCompanyNameFK] = useState("");
  const [companyNames, setCompanyNames] = useState([]);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");

  const [base64PDF, setBase64PDF] = useState();
  const [showPreview, setShowPreview] = useState(false);
  const buttonDisabled =
    (dispatcher && !dispatcherPK) ||
    (customer && !customerPK) ||
    (unitNumberLast5.length > 0 && unitNumberLast5.length < 5) ||
    (unitNumber && !unitNumberPK) ||
    (unitsEnteredBy && !unitsEnteredByPK) ||
    (!motorized && !towable && !flatbed) ||
    !isFromDateValid ||
    !isToDateValid ||
    !deliveryDateTo ||
    !lookupValidation;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const footerButtons = [
    {
      label: "Display",
      onClick: () => {
        handleDisplay();
      },
      disabled: buttonDisabled,
    },
    { label: "Email Excel", onClick: () => handleEmailExcelOrPDF("excel"), disabled: buttonDisabled },
    { label: "Email PDF", onClick: () => handleEmailExcelOrPDF("pdf"), disabled: buttonDisabled },
    { label: "Print", onClick: () => handleEmailExcelOrPDF("print"), disabled: buttonDisabled },
  ];

  const handleDisplay = () => {
    navigate(`/outstanding-paperwork-browse-screen`);
  };

  const handleEmailExcelOrPDF = async (emailOrPdf) => {
    setLoading(true);
    try {
      const response = await OutstandingPaperworkService.getOutstandingPaperworkBrowse(
        deliveryDateFrom,
        deliveryDateTo,
        assignedDispatcher,
        dispatchedBy,
        dispatcherPK,
        customerPK,
        unitNumberPK,
        unitNumberLast5,
        onlyUnitsWithNotes,
        unitsEnteredByPK,
        motorized,
        towable,
        flatbed,
        pageNumber,
        pageSize,
        sortValue,
        sortType,
        emailOrPdf,
        includeNotes,
        companyPK
      );

      if (response && response.data) {
        const data = response.data;

        if (data.length > 0 && data[0]?.errorCode === "1") {
          toast.error(data[0]?.errorMessage || "No records available.");
        } else {
          if (emailOrPdf === "print") {
            if (data[0]?.byteContent) {
              setBase64PDF(data[0].byteContent);
              setShowPreview(true);
              toast.success("Preview generated successfully");
            } else {
              toast.error("No printable content available");
            }
          } else {
            toast.success("Email sent successfully");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error while processing request!");
    } finally {
      setLoading(false);
    }
  };

  const fetchDataAutocomplete = (value, lookupButton, dispatcherType) => {
    setDispatcherLoading(true);
    setCustomerLoading(true);
    setUnitNumberLoading(true);
    setUnitByLoading(true);
    let dispatchedBy = dispatcherType === "Dispatched By";
    let assignedDispatcher = dispatcherType === "Assigned Dispatcher";
    if (lookupButton === "Dispatcher") {
      dispatch(setDispatchedBy(dispatchedBy));
      dispatch(setAssignedDispatcher(assignedDispatcher));
    }
    OutstandingPaperworkService.getOutstandingPaperworkSettings(
      value,
      lookupButton,
      assignedDispatcher,
      dispatchedBy,
      companyPK
    )
      .then((response) => {
        const data = response.data;

        if (lookupButton === "Dispatcher") {
          setDispatcherAutocompleteData(data || []);
        } else if (lookupButton === "Customer") {
          setCustomerAutocompleteData(data || []);
        } else if (lookupButton === "UnitNumber") {
          setUnitNumberAutocompleteData(data || []);
        } else if (lookupButton === "UnitsEnteredBy") {
          setUnitsEnteredByAutocompleteData(data || []);
        }
        setDispatcherLoading(false);
        setCustomerLoading(false);
        setUnitNumberLoading(false);
        setUnitByLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleUnitNumberSelection = (e) => {
    setShowUnitSelectionLookup(false);
    setLookupValidation(e.active && e.delivered);
    dispatch(setUnitNumber(e.unitNumber?.trim()));
    dispatch(setUnitNumberPK(e.unitPK));
    // dispatch(setCompanyPK(Number(e.companyPK)));
  };

  const getCompanyNames = () => {
    PaperworkProcessingService.getAllCompanyNames()
      .then((response) => {
        const data = response.data;
        setCompanyNames(data);
        // getCurrentCompanyName();
      })
      .catch((error) => {});
  };

  /****
   * Used for Customer Selection Lookup
   ****/
  const handleCustomerLookup = () => {
    setShowCustomerLookup(true);
  };
  /******
   * Customer Lookup Selection
   * ******/
  const handleCustomerSelection = (item) => {
    setShowCustomerLookup(false);
    dispatch(setCustomerPK(item.customerPK));
    dispatch(setCustomer(item.name?.trim()));
  };

  const getCurrentCompanyName = () => {
    setLoading(true);
    PaperworkProcessingService.getCurrentCompanyName()
      .then((response) => {
        const data = response.data;
        dispatch(setCompanyPK(data.companyPK));
        setSelectedCompanyName(data.name);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getCurrentCompanyName();
  }, []);

  /**
   * used for Units entered by user selection Lookup
   */
  const handleUnitsEnteredByLookup = () => {
    setShowUnitsEnteredByLookup(true);
  };
  const handleUnitsEnteredByLookupSelection = (item) => {
    dispatch(setUnitsEnteredByPK(item.userPK));
    dispatch(setUnitsEnteredBy(item.name?.trim() || ""));
    setShowUnitsEnteredByLookup(false);
  };

  /**
   * used for Units entered by user selection Lookup
   */
  const handleDispatcherLookup = () => {
    setShowDispatcherLookup(true);
  };
  const handleDispatcherLookupSelection = (item) => {
    dispatch(setDispatcherPK(item.userPK));
    dispatch(setDispatcher(item.name?.trim()));
    setShowDispatcherLookup(false);
  };

  useEffect(() => {
    dispatch(setDeliveryDateTo(deliveryDateTo || formatDatetimeToDate(new Date())));
    getCompanyNames();
    dispatch(setPageNumber(0));
  }, []);

  useEffect(() => {
    if (!unitNumberPK) {
      setLookupValidation(true);
    }
  }, [unitNumberPK]);

  window.addEventListener("popstate", () => {
    dispatch(resetChanges());
    dispatch(setPageNumber(0));
  });

  return (
    <QuarterScreenWrapper>
      <Header closeHandler={() => dispatch(resetChanges())} />
      {/* Form Contents */}
      <div className="w-100 p-2">
        {loading && <LoadingIcon />}
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col xs={11}>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Delivery Date From</Form.Label>
                    </Col>

                    <Col xs={1} style={{ width: "100px" }} className="p-0">
                      <DateInputField
                        date={deliveryDateFrom}
                        setDate={(value) => dispatch(setDeliveryDateFrom(value))}
                        setIsDateValid={setIsFromDateValid}
                        isDateValid={isFromDateValid}
                        className={isFromDateValid ? "" : "borderRed"}
                        max={deliveryDateTo ? parseLocalDate(deliveryDateTo) : new Date()}
                      />
                    </Col>

                    <Col xs="auto" className="d-flex align-items-center px-2">
                      <Form.Label className="customColFormLabel">To</Form.Label>{" "}
                    </Col>

                    <Col xs={1} style={{ width: "100px" }} className="p-0">
                      <DateInputField
                        date={deliveryDateTo}
                        setDate={(value) => dispatch(setDeliveryDateTo(value))}
                        setIsDateValid={setIsToDateValid}
                        className={deliveryDateTo && isToDateValid ? "borderGreen" : "borderRed"}
                        isDateValid={isToDateValid}
                        min={deliveryDateFrom ? parseLocalDate(deliveryDateFrom) : new Date()}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Dispatcher</Form.Label>
                    </Col>

                    <Col xs={4} className="p-0 d-flex">
                      <AutoCompleteDropdown
                        loading={dispatcherLoading}
                        arrayList={dispatcherAutocompleteData}
                        searchString={dispatcher}
                        renderItemId={(item) => item.UserPK}
                        renderItemField={(item) => item.Name?.trim()}
                        handleSearchString={(string) => dispatch(setDispatcher(string))}
                        fetchDataBySearchString={(val) =>
                          fetchDataAutocomplete(val, "Dispatcher", dispatcherType)
                        }
                        onSelect={(item) => {
                          dispatch(setDispatcher(item.Name?.trim()));
                          dispatch(setDispatcherPK(item.UserPK));
                        }}
                        selectedId={dispatcherPK}
                        clearInputCallback={() => dispatch(setDispatcherPK(null))}
                        className={!dispatcher || dispatcherPK ? "" : "borderRed"}
                        disabled={false}
                      />
                      <LookupButton onClick={handleDispatcherLookup} />
                    </Col>

                    <Col xs={3} className="mx-1 ">
                      <CustomRadioGroup
                        name="source"
                        horizontal
                        horizontalAlignmentClassName="pe-3"
                        options={["Assigned Dispatcher", "Dispatched By"]}
                        selectedOption={dispatcherType}
                        onChange={(value) => {
                          setDispatcherType(value);
                          fetchDataAutocomplete(dispatcher, "Dispatcher", value);
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Customer</Form.Label>
                    </Col>

                    <Col xs={4} className="p-0 d-flex">
                      <AutoCompleteDropdown
                        loading={customerLoading}
                        arrayList={customerAutocompleteData}
                        searchString={customer}
                        renderItemId={(item) => item.CustomerPK}
                        renderItemField={(item) => item.Name?.trim()}
                        handleSearchString={(string) => dispatch(setCustomer(string))}
                        fetchDataBySearchString={(val) => fetchDataAutocomplete(val, "Customer")}
                        onSelect={(item) => {
                          dispatch(setCustomer(item.Name?.trim()));
                          dispatch(setCustomerPK(item.CustomerPK));
                        }}
                        selectedId={customerPK}
                        clearInputCallback={() => dispatch(setCustomerPK(null))}
                        className={!customer || customerPK ? "" : "borderRed"}
                        disabled={false}
                      />
                      <LookupButton onClick={handleCustomerLookup} />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Company</Form.Label>
                    </Col>
                    <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                      <Form.Select
                        className="customFormControl p-"
                        name="companyPK"
                        value={`${companyPK}-${selectedCompanyName}`}
                        onChange={(e) => {
                          const values = e.target.value.split("-");
                          const companyId = values[0];
                          const companyName = values.slice(1).join("-");
                          dispatch(setSelectedCompanyID(Number(companyId)));
                          dispatch(setUnitNumber(""));
                          dispatch(setUnitNumberPK(""));
                          dispatch(setCompanyPK(Number(companyId)));
                          setSelectedCompanyName(companyName);
                        }}
                      >
                        {companyNames?.map((item) => (
                          <option key={item.companyPK} value={`${item.companyPK}-${item.name}`}>
                            {item.name || "UNKNOWN COMPANY"}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Unit Number</Form.Label>
                    </Col>

                    <Col xs={4} className="p-0 d-flex">
                      <AutoCompleteDropdown
                        loading={unitNumberLoading}
                        arrayList={unitNumberAutocompleteData}
                        searchString={unitNumber}
                        renderItemId={(item) => item.UnitPK}
                        renderItemField={(item) => item.UnitNumber?.trim()}
                        handleSearchString={(string) => dispatch(setUnitNumber(string))}
                        fetchDataBySearchString={(val) => fetchDataAutocomplete(val, "UnitNumber")}
                        onSelect={(item) => {
                          dispatch(setUnitNumber(item.UnitNumber?.trim()));
                          dispatch(setUnitNumberPK(item.UnitPK));
                          setLookupValidation(true);
                        }}
                        selectedId={unitNumberPK}
                        clearInputCallback={() => dispatch(setUnitNumberPK(null))}
                        className={!unitNumber || (unitNumberPK && lookupValidation) ? "" : "borderRed"}
                        disabled={false}
                      />
                      <LookupButton onClick={() => setShowUnitSelectionLookup(true)} />
                      <UnitDispatchLookup
                        show={showUnitSelectionLookup}
                        onHide={() => setShowUnitSelectionLookup(false)}
                        handleLookupSelection={(unit) => handleUnitNumberSelection(unit, true)}
                        MaintenanceProgram

                        selectedCompanyName={selectedCompanyName}
                        selectedCompanyFK={companyPK}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Unit Number Last 5</Form.Label>
                    </Col>

                    <Col xs={1} className="p-0">
                      <input
                        // className={`customFormControl`}
                        className={`customFormControl ${
                          unitNumberLast5.length > 0 && unitNumberLast5.length < 5
                            ? "borderRed"
                            : unitNumberLast5.length === 5
                              ? ""
                              : ""
                        }`}
                        id="unitNumberLast5"
                        name="unitNumberLast5"
                        type="text"
                        value={unitNumberLast5}
                        maxLength={5}
                        onChange={(e) => dispatch(setUnitNumberLast5(e.target.value?.toUpperCase()))}
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Only Units With Notes</Form.Label>
                    </Col>

                    <Col xs={1} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="onlyUnitsWithNotes"
                        name="onlyUnitsWithNotes"
                        checked={onlyUnitsWithNotes}
                        onChange={(e) => dispatch(setOnlyUnitsWithNotes(e.target.checked))}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Units Entered By</Form.Label>
                    </Col>

                    <Col xs={4} className="p-0 d-flex">
                      <AutoCompleteDropdown
                        loading={unitByLoading}
                        arrayList={unitsEnteredByAutocompleteData}
                        searchString={unitsEnteredBy}
                        renderItemId={(item) => item.UserPK}
                        renderItemField={(item) => item.Name?.trim()}
                        handleSearchString={(string) => dispatch(setUnitsEnteredBy(string))}
                        fetchDataBySearchString={(val) => fetchDataAutocomplete(val, "UnitsEnteredBy")}
                        onSelect={(item) => {
                          dispatch(setUnitsEnteredBy(item.Name?.trim() || ""));
                          dispatch(setUnitsEnteredByPK(item.UserPK));
                        }}
                        selectedId={unitsEnteredByPK}
                        clearInputCallback={() => dispatch(setUnitsEnteredByPK(null))}
                        className={!unitsEnteredBy || unitsEnteredByPK ? "" : "borderRed"}
                        disabled={false}
                        maxHeight={"135px"}
                      />
                      <LookupButton onClick={handleUnitsEnteredByLookup} />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel"></Form.Label>
                    </Col>

                    <Col xs={5} className="p-0">
                      <div className="d-flex gap-3">
                        <div className="">
                          <input
                            className={`form-check-input ${
                              !motorized && !towable && !flatbed ? "borderRed" : ""
                            }`}
                            type="checkbox"
                            id="motorized"
                            checked={motorized}
                            onChange={(e) => dispatch(setMotorized(e.target.checked))}
                          />
                          <label className="form-check-label ms-2" htmlFor="motorized">
                            Motorized
                          </label>
                        </div>
                        <div className="">
                          <input
                            type="checkbox"
                            className={`form-check-input ${
                              !motorized && !towable && !flatbed ? "borderRed" : ""
                            }`}
                            id="towable"
                            checked={towable}
                            onChange={(e) => dispatch(setTowable(e.target.checked))}
                          />
                          <label className="form-check-label ms-2" htmlFor="towable">
                            Towable
                          </label>
                        </div>
                        <div className="">
                          <input
                            type="checkbox"
                            className={`form-check-input ${
                              !motorized && !towable && !flatbed ? "borderRed" : ""
                            }`}
                            id="flatbed"
                            checked={flatbed}
                            onChange={(e) => dispatch(setFlatbed(e.target.checked))}
                          />
                          <label className="form-check-label ms-2" htmlFor="flatbed">
                            Flatbed
                          </label>
                        </div>
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col xs={3} className="p-0">
                      <Form.Label className="customColFormLabel">Include Notes in Reports</Form.Label>
                    </Col>

                    <Col xs={1} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0"
                        id="includeNotes"
                        name="includeNotes"
                        checked={includeNotes}
                        onChange={(e) => dispatch(setIncludeNotes(e.target.checked))}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              {loading && (
                <div className="fade modal-backdrop show">
                  <div className="pos-center">
                    <div className="loader"></div>
                  </div>
                </div>
              )}
            </div>
            <CustomerLookup
              show={showCustomerLookup}
              onHide={() => setShowCustomerLookup(false)}
              renderItemId={(customer) => customer.CustomerPK}
              renderItemField={(customer) => customer.Name}
              handleLookupSelection={handleCustomerSelection}
              MaintenanceProgram
            />
            <UserLookup
              show={showUnitsEnteredByLookup}
              onHide={() => setShowUnitsEnteredByLookup(false)}
              renderItemId={(user) => user.userPK}
              handleLookupSelection={handleUnitsEnteredByLookupSelection}
              MaintenanceProgram
            />
            <UserLookup
              show={showDispatcherLookup}
              onHide={() => setShowDispatcherLookup(false)}
              renderItemId={(user) => user.UserPK}
              handleLookupSelection={handleDispatcherLookupSelection}
              MaintenanceProgram
            />
          </div>
        </div>
      </div>
      <CommonFooter buttons={footerButtons} />

      <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={base64PDF} />
    </QuarterScreenWrapper>
  );
};

export default SettingsScreen;
