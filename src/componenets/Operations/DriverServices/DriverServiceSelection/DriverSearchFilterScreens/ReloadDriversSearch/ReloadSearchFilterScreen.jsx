import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../common/LookupButton";
import styles from "../../../../../../styles/QuarterScreen.module.css";
import Footer from "./Footer";
import Header from "./Header";
import CustomerLookup from "../../../../../LookupScreens/Customer/CustomerLookup";
import { useDispatch, useSelector } from "react-redux";
import CustomerService from "../../../../../../services/CustomerService";
import {
  setSelectedCustomerId,
  setTotalElements,
  setTotalPages,
  setUnitData,
  setMiles,
  setListOfSelectedStates,
  setIsDeliveryStatesValid,
  setDivisionStatus,
  setDriverCdlStatus,
  setSortValue,
  setSortType,
  setDriverData,
  setUnitId,
  setChangeColor,
  setPageNumberOfdriver,
  setPageNumber,
  setChangeColorofdriver,
  setCustomerNameInput,
  setDriverId,
  setSortType1,
  setSortValue1,
  setOutputType,
} from "../../../../../../redux/DriverSearchFilterSlice";
import DriverService from "../../../../../../services/DriverService";
import LoadingIcon from "../../../../../common/LoadingIcon";

function ReloadSearchFilterScreen() {
  const dispatch = useDispatch();

  const previousRoute = localStorage.getItem("previousRoute");

  window.addEventListener("popstate", () => {
    dispatch(setUnitId(null));
  });

  const [customerPKList, setCustomerPKList] = useState(null);
  const selectedCustomerId = useSelector((state) => state.driverSearchFilter.selectedCustomerId);
  const searchCriteria = useSelector((state) => state.driverSearchFilter.searchCriteria);
  const searchTerm = useSelector((state) => state.driverSearchFilter.searchTerm);
  const pageNumber = useSelector((state) => state.driverSearchFilter.pageNumber);
  const pageSize = useSelector((state) => state.driverSearchFilter.pageSize);
  const sortValue = useSelector((state) => state.driverSearchFilter.sortValue);
  const divisionStatus = useSelector((state) => state.driverSearchFilter.divisionStatus);
  const driverCdlStatus = useSelector((state) => state.driverSearchFilter.driverCdlStatus);

  const sortType = useSelector((state) => state.driverSearchFilter.sortType);
  const miles = useSelector((state) => state.driverSearchFilter.miles);
  const [stateInputValue, setStateInputValue] = useState("");
  const listOfSelectedStates = useSelector((state) => state.driverSearchFilter.listOfSelectedStates);
  const isDeliveryStatesValid = useSelector((state) => state.driverSearchFilter.isDeliveryStatesValid);
  const unitData = useSelector((state) => state.driverSearchFilter.unitData);
  const unitId = useSelector((state) => state.driverSearchFilter.unitId);
  const cancelbtn = useSelector((state) => state.driverSearchFilter.cancelbtn);
  const customerNameInput = useSelector((state) => state.driverSearchFilter.customerNameInput);
  const outputType = useSelector((state) => state.driverSearchFilter.outputType);
  const pdfLoader = useSelector((state) => state.driverSearchFilter.pdfLoader);

  const [customerData, setCustomerData] = useState([]);

  const [customerLookup, setCustomerLookup] = useState(false);
  const [customerAutocompleteLoading, setCustomerAutocompleteLoading] = useState(false);
  const handleCustomerAutoSelection = (customer) => {
    dispatch(setCustomerNameInput(customer.name?.trim()));
    dispatch(setSelectedCustomerId(customer.customerPK));
  };
  const fetchCustomerDetailsByName = (string) => {
    setCustomerAutocompleteLoading(true);
    CustomerService.getAllCustomers(
      "Active",
      0,
      null,
      "Beginning",
      null,
      string,
      null,
      sortType,
      "Complete",
      customerPKList
    )
      .then((response) => {
        const data = response?.data?.content;
        setCustomerData(data || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setCustomerAutocompleteLoading(false);
      });
  };
  const handleCustomerLookupModalShow = (e) => {
    e.stopPropagation();
    setCustomerLookup(true);
  };
  const findValidStateCodeList = (listOfSelectedStates) => {
    DriverService.findValidStateCode(listOfSelectedStates)
      .then((response) => {
        const data = response?.data;
        dispatch(setIsDeliveryStatesValid(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCustomerLookupSelection = (customer) => {
    if (customer) {
      dispatch(setCustomerNameInput(customer.name?.trim()));
      dispatch(setSelectedCustomerId(customer.customerPK));
    }
    setCustomerLookup(false);
  };

  const handleRadioChange = (value) => {
    dispatch(setDivisionStatus(value));
  };

  const handleRadioChangeforDriverCdl = (value) => {
    dispatch(setDriverCdlStatus(value));
  };

  useEffect(() => {
    if (listOfSelectedStates.length > 0) {
      dispatch(setIsDeliveryStatesValid(false));
      findValidStateCodeList(listOfSelectedStates);
    }
  }, [listOfSelectedStates?.length]);
  useEffect(() => {
    dispatch(setIsDeliveryStatesValid(false));
  }, []);

  useEffect(() => {
    dispatch(setIsDeliveryStatesValid(false));
  }, []);

  useEffect(() => {
    if (previousRoute === "/driver-service-selection") {
      dispatch(setIsDeliveryStatesValid(false));
      dispatch(setMiles(""));
      dispatch(setListOfSelectedStates([]));
      dispatch(setDivisionStatus("driveaway"));
      dispatch(setDriverCdlStatus("both"));
      dispatch(setSelectedCustomerId(0));
      dispatch(setChangeColor(false));
      dispatch(setPageNumber(0));
      dispatch(setPageNumberOfdriver(0));
      dispatch(setChangeColorofdriver(false));
      dispatch(setSortValue(null));
      dispatch(setSortType(false));
      dispatch(setSortValue1(null));
      dispatch(setSortType1(false));
      dispatch(setCustomerNameInput(""));
      dispatch(setDriverId(null));
      dispatch(setUnitId(null));
    }
  }, [previousRoute, dispatch]);

  useEffect(() => {
    dispatch(setDivisionStatus("driveaway"));
    dispatch(setDriverCdlStatus("both"));
    dispatch(setMiles("0"));
    dispatch(setListOfSelectedStates([]));
    dispatch(setOutputType("display"));
  }, []);

  useEffect(() => {
    if (listOfSelectedStates?.length === 0) {
      setStateInputValue("");
    }
  }, [listOfSelectedStates?.length]);

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        {pdfLoader && <LoadingIcon />}
        <Header />
        <div className="shadow-sm rounded border quarterScreenFormContentHeight " style={{ height: "440px" }}>
          <Form.Group className="mt-5 align-items-center row m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="pl-4">
              <Form.Label htmlFor="name" className="col-form-label dealer-label ">
                Division
              </Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <RadioGroup name="" className="d-flex">
                <div
                  className={`d-flex align-items-center me-4 m-b-5 `}
                  onClick={() => handleRadioChange("driveaway")}
                >
                  <Radio value="driveaway" checked={divisionStatus === "driveaway"} />
                  <label className="f-w-600 m-l-5">Driveaway</label>
                </div>
                <div
                  className={`d-flex align-items-center me-4 m-b-5 `}
                  onClick={() => handleRadioChange("towaway")}
                >
                  <Radio value="towaway" checked={divisionStatus === "towaway"} />
                  <label className="f-w-600 m-l-5">Towaway</label>
                </div>
                <div
                  className={`d-flex align-items-center me-4 m-b-5 `}
                  onClick={() => handleRadioChange("flatbed")}
                >
                  <Radio value="flatbed" checked={divisionStatus === "flatbed"} />
                  <label className="f-w-600 m-l-5">Flatbed</label>
                </div>
              </RadioGroup>
            </Col>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={2} md={2} xs={2} className="pl-4">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Driver CDL
              </Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <RadioGroup name="regionStatus" className="d-flex">
                <div
                  className="d-flex align-items-center me-4 m-b-5"
                  onClick={() => handleRadioChangeforDriverCdl("cdl")}
                >
                  <Radio value="cdl" checked={driverCdlStatus === "cdl"} />
                  <label className="f-w-600 m-l-5">CDL</label>
                </div>
                <div
                  className="d-flex align-items-center me-4 m-b-5"
                  style={{ marginRight: "5px" }}
                  onClick={() => handleRadioChangeforDriverCdl("noncdl")}
                >
                  <Radio
                    value="noncdl"
                    checked={driverCdlStatus === "noncdl"}
                    style={{ marginLeft: "3px" }}
                  />
                  <label className="f-w-600 m-l-5">non CDL</label>
                </div>
                <div
                  className="d-flex align-items-center me-4 m-b-5"
                  style={{ marginRight: "5px" }}
                  onClick={() => handleRadioChangeforDriverCdl("both")}
                >
                  <Radio value="both" checked={driverCdlStatus === "both"} style={{ marginLeft: "3px" }} />
                  <label className="f-w-600 m-l-5">Both</label>
                </div>
              </RadioGroup>
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}>
            <Col sm={2} md={2} xs={2} className="pl-4">
              <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0">
                Miles From Dealer
              </Form.Label>
            </Col>
            <Col sm={2} md={2} xs={2} className="p-0">
              <input
                className={`customFormControl`}
                id=""
                name="miles"
                type="search"
                maxLength={8}
                value={miles}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  const inputValue = e.target.value;
                  if (/^[0-9]*$/.test(inputValue)) {
                    dispatch(setMiles(inputValue));
                  }
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}>
            <Col sm={2} md={2} xs={2} className="pl-4">
              <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0">
                Delivery States
              </Form.Label>
            </Col>
            <Col sm={4} md={4} xs={4} className="p-0">
              <input
                className={`customFormControl ${
                  listOfSelectedStates.length > 0 ? (isDeliveryStatesValid ? "borderGreen" : "borderRed") : ""
                }`}
                type="text"
                maxLength={50}
                value={stateInputValue}
                autoComplete="off"
                aria-autocomplete="list"

                onInput={(e) => {
                  let rawValue = e.target.value.toUpperCase();

                  // allow only letters
                  rawValue = rawValue.replace(/[^A-Z]/g, "");

                  // split into chunks of 2
                  const chunks = rawValue.match(/.{1,2}/g) || [];

                  // completed codes (2 chars)
                  const completed = chunks.filter((c) => c.length === 2);

                  // incomplete tail (0 or 1 char)
                  const incomplete = chunks.find((c) => c.length === 1) || "";

                  // format display value: "SG, CD, WF" (+ partial char if exists)
                  const formattedValue =
                    completed.join(", ") + (incomplete ? (completed.length ? ", " : "") + incomplete : "");

                  setStateInputValue(formattedValue);

                  dispatch(setListOfSelectedStates(completed));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
            style={{ height: "60px" }}
          >
            <Col sm={2} md={2} xs={2} className="pl-4" style={{ width: "147px" }}>
              <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0 pl-4">
                Customer
              </Form.Label>
            </Col>
            <Col xs={5} md={5} sm={5} className="d-flex">
              <AutoCompleteDropdown
                className={`customFormControl  ${customerNameInput && !selectedCustomerId ? "borderRed" : ""}`}
                arrayList={customerData}
                searchString={customerNameInput}
                renderItemId={(customer) => customer.customerPK}
                renderItemField={(customer) => customer.name}
                handleSearchString={(string) => dispatch(setCustomerNameInput(string))}
                fetchDataBySearchString={fetchCustomerDetailsByName}
                onSelect={handleCustomerAutoSelection}
                clearInputCallback={() => {
                  dispatch(setSelectedCustomerId(0));
                }}
                loading={customerAutocompleteLoading}
                selectedId={selectedCustomerId}
                maxLength={70}
                maxHeight={"130px"}
              />
              <LookupButton onClick={handleCustomerLookupModalShow} />
            </Col>
          </Form.Group>

          <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0 ">
            <Col sm={2} md={2} xs={2} className="pl-4">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Output
              </Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <RadioGroup
                name="outputType"
                className="d-flex"
                selectedValue={outputType}
                onChange={(val) => dispatch(setOutputType(val))}
              >
                <div className="d-flex align-items-center me-4 m-b-5">
                  <Radio value="display" />
                  <label className="f-w-600 m-l-5">Display</label>
                </div>
                <div className="d-flex align-items-center me-4 m-b-5">
                  <Radio value="print" />
                  <label className="f-w-600 m-l-5">Print</label>
                </div>
                <div className="d-flex align-items-center me-4 m-b-5">
                  <Radio value="emailPdf" />
                  <label className="f-w-600 m-l-5">Email PDF</label>
                </div>
                <div className="d-flex align-items-center me-4 m-b-5">
                  <Radio value="emailExcel" />
                  <label className="f-w-600 m-l-5">Email Excel</label>
                </div>
              </RadioGroup>
            </Col>
          </Form.Group>
          {/* <Row> */}
        </div>
        <Footer />
      </div>
      <CustomerLookup
        show={customerLookup}
        onHide={() => setCustomerLookup(false)}
        renderItemId={(customer) => customer.customerPK}
        renderItemField={(customer) => customer.name}
        handleLookupSelection={handleCustomerLookupSelection}
        loading={customerAutocompleteLoading}
        DriverDispatch={customerPKList || null}
        MaintenanceProgram
      />
    </div>
  );
}

export default ReloadSearchFilterScreen;
