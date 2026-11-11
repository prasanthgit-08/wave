import { useSelector, useDispatch } from "react-redux";
import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import {
  setDriverNameInput,
  setSelectedDriver,
  setSelectedDriverID,
  setCompanyNamesForDrivers,
  setCompanyNameForDriverSelection,
  setCompanyNameFKForDriverSelection,
  setSelectedDriverCompanyDetails,
  setDriverDefaultCompanyName,
  setSelectedDriverCompanyID,
  setMotorized,
  setTowable,
  setEnablePostPay,
} from "../../../../../redux/YardCheckinSlice";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import React, { useEffect, useState } from "react";
import DriverLookup from "../../../../LookupScreens/Driver/DriverLookup";
import LoadingIcon from "../../../../common/LoadingIcon";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";

function DriverSelectionContent() {
  const dispatch = useDispatch();

  const [companyNames, setCompanyNames] = useState([]);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [companyNameFK, setCompanyNameFK] = useState("");
  const [show, setShow] = useState(false);
  const [driverNames, setDriverNames] = useState([]);
  const [selectedDriverFK, setSelectedDriverFK] = useState("");
  const [selectedDriverData, setSelectedDriverData] = useState("");
  const [driverLoading, setDriverLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);

  const driverNameInput = useSelector((state) => state.yardCheckinReducer.driverNameInput);
  const companyNameForDriverSelection = useSelector(
    (state) => state.yardCheckinReducer.companyNameForDriverSelection
  );

  /** check if selected driver has records for payment **/
  const postPayButtonCondition = (selectedCompanyName, selectedDriverFK) => {
    setPostLoading(true);
    YardCheckinService.checkPostPayStatus(selectedCompanyName, selectedDriverFK)
      .then((response) => {
        const data = response.data;
        dispatch(setEnablePostPay(data));
        setPostLoading(false);
      })
      .catch((error) => {
        setPostLoading(false);
      });
  };

  /****** Company Names dropdown******/
  //Fetch All Company Names

  const getCompanyNames = () => {
    setCompanyLoading(true);
    DelayProcessingService.getAllCompanyData()
      .then((res) => {
        if (res?.data) {
          setCompanyNames(res?.data);
          dispatch(setCompanyNamesForDrivers(res?.data));
          const value = res?.data?.find((item) => item.LocalCompany === true);
          if (!companyNameFK) {
            dispatch(setSelectedDriverCompanyID(value.CompanyPK));
            setCompanyNameFK(value.CompanyPK);
            setSelectedCompanyName(value.Name);
            dispatch(setDriverDefaultCompanyName(value.Name));
          }
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setCompanyLoading(false));
  };

  const getDriverCompanyDetails = () => {
    if (selectedCompanyName) {
      YardCheckinService.getDriverCompanyDetails(selectedCompanyName)
        .then((response) => {
          const data = response.data;
          dispatch(setSelectedDriverCompanyDetails(data));
        })
        .catch((error) => {});
    }
  };

  const fetchDriverByName = (string, selectedCompanyName) => {
    setDriverLoading(true);
    YardCheckinService.fetchDriverDetailsByName(string, selectedCompanyName)
      .then((response) => {
        const data = response.data.content;
        const driversList = data?.map((driver) => ({ ...driver, firstName: driver.firstName?.trim() }));
        setDriverNames(driversList);
        setDriverLoading(false);
      })
      .catch((error) => {
        setDriverLoading(false);
      });
  };

  const handleDriverLookupSelection = (driver) => {
    setSelectedDriverFK(driver.driverPK);
    dispatch(
      setDriverNameInput(driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : ""))
    );
    setSelectedDriverData(driver);
    setShow(false);
  };

  const handleDriverSelectionFromDropdown = (driver) => {
    setSelectedDriverFK(driver.driverPK);
    dispatch(
      setDriverNameInput(driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : ""))
    );
    setSelectedDriverData(driver);
    dispatch(setMotorized(driver ? driver.motorized : false));
    dispatch(setTowable(driver ? driver.towable : false));
  };

  const handleDriverLookupModalShow = () => {
    setShow(true);
  };

  const handleDriverLookupModalHide = () => {
    setShow(false);
  };

  useEffect(() => {
    getCompanyNames();
  }, []);

  useEffect(() => {
    if (selectedCompanyName !== "" && selectedDriverFK !== "") {
      postPayButtonCondition(selectedCompanyName, selectedDriverFK);
    }
  }, [selectedCompanyName, selectedDriverFK]);

  useEffect(() => {
    dispatch(setSelectedDriver(selectedDriverData));
    dispatch(setSelectedDriverID(selectedDriverFK));
    dispatch(setCompanyNameForDriverSelection(selectedCompanyName));
    dispatch(setCompanyNameFKForDriverSelection(companyNameFK));
  }, [selectedDriverData, selectedDriverFK, selectedCompanyName, companyNameFK]);

  useEffect(() => {
    setDriverNames([]);
    dispatch(setDriverNameInput(""));
  }, [selectedCompanyName]);

  useEffect(() => {
    getDriverCompanyDetails();
  }, [selectedDriverFK]);

  return (
    <div className="w-100 p-2">
      {(postLoading || companyLoading) && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Col className="p-15 mt-5 mb-5" xs={7}>
              {/* Driver Company */}
              <Form.Group className="margin-box-1 form-group m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Driver Company</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  <Form.Select
                    className="customFormControl p-"
                    name="companyNameFK"
                    value={`${companyNameFK}-${selectedCompanyName}`}
                    onChange={(e) => {
                      const [companyId, companyName] = e.target.value.split("-");
                      dispatch(setSelectedDriverCompanyID(companyId));
                      setCompanyNameFK(companyId);
                      setSelectedCompanyName(companyName);
                      fetchDriverByName(driverNameInput, companyName);
                    }}
                  >
                    {companyNames?.map((item) => (
                      <option key={item.CompanyPK} value={`${item.CompanyPK}-${item.Name}`}>
                        {item.Name.toUpperCase()}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              {/* Driver */}
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-start">
                  <Form.Label className="col-form-label me-4">Driver</Form.Label>
                </Col>

                <Col xl={6} lg={6} md={6} sm={6} xs={6} className={`p-0 d-flex`}>
                  <AutoCompleteDropdown
                    arrayList={driverNames}
                    searchString={driverNameInput}
                    renderItemId={(driver) => driver.driverPK}
                    loading={driverLoading}
                    renderItemField={(driver) =>
                      driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : "")
                    }
                    handleSearchString={(string) => dispatch(setDriverNameInput(string))}
                    fetchDataBySearchString={(string) => fetchDriverByName(string, selectedCompanyName)}
                    onSelect={handleDriverSelectionFromDropdown}
                    selectedId={selectedDriverFK}
                    clearInputCallback={() => {
                      setSelectedDriverFK("");
                    }}
                    className={`${selectedDriverFK === "" || driverNameInput === "" ? "borderRed" : "borderGreen"}`}
                  />
                  <LookupButton onClick={handleDriverLookupModalShow} />
                </Col>
              </Form.Group>
            </Col>

            <DriverLookup
              companyName={companyNameForDriverSelection}
              showActiveOnly
              show={show}
              onHide={handleDriverLookupModalHide}
              renderItemId={(driver) => driver.driverPK}
              handleLookupSelection={handleDriverLookupSelection}
              YardCheckin
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverSelectionContent;
