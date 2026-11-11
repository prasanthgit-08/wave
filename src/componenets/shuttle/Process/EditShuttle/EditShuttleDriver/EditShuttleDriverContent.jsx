import { parseLocalDate } from "../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import { useDispatch, useSelector } from "react-redux";
import EditShuttleService from "../../../../../services/shuttle/process/EditShuttleService";
import LookupButton from "../../../../common/LookupButton";
import {
  setDriverData,
  setDriverId,
  setDriverNameInput,
  setDriverSelection,
  setFromDate,
  setToDate,
  setIsDateValid,
} from "../../../../../redux/EditShuttleSlice";
import DateInputField from "../../../../common/DateInputField";
import DriverLookup from "../../../../LookupScreens/Driver/DriverLookup";

function EditShuttleDriverContent() {
  const dispatch = useDispatch();

  const [driverNames, setDriverNames] = useState([]);
  const [driverLoading, setDriverLoading] = useState(false);
  const [isBeginDateValid, setIsBeginDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);

  const driverSelection = useSelector((state) => state.editShuttleReducer.driverSelection);
  const driverNameInput = useSelector((state) => state.editShuttleReducer.driverNameInput);
  const driverId = useSelector((state) => state.editShuttleReducer.driverId);
  const fromDate = useSelector((state) => state.editShuttleReducer.fromDate);
  const toDate = useSelector((state) => state.editShuttleReducer.toDate);

  /**
   * used for Driver Autocomplete Dropdown - fetch
   */
  const fetchDriverByName = (string) => {
    setDriverLoading(true);
    EditShuttleService.fetchDriverDetailsByName(string)
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

  /**
   * used for Driver Autocomplete Dropdown -Selection
   */
  const handleDriverSelection = (driver) => {
    dispatch(
      setDriverNameInput(driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : ""))
    );
    dispatch(setDriverId(driver.driverPK));
    dispatch(setDriverData(driver));
  };

  /**
   * used for Driver selection Lookup - open
   */
  const handleDriverLookupModalShow = () => {
    dispatch(setDriverSelection(true));
  };

  /**
   * used for Driver selection Lookup - onSelect
   */
  const handleDriverLookupSelection = (driver) => {
    dispatch(
      setDriverNameInput(driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : ""))
    );
    dispatch(setDriverId(driver.driverPK));
    dispatch(setDriverData(driver));
    dispatch(setDriverSelection(false));
  };

  /**
   * used for Driver selection Lookup - close
   */
  const driverModalHide = () => {
    dispatch(setDriverSelection(false));
  };

  useEffect(() => {
    dispatch(setDriverNameInput(""));
    dispatch(setDriverId(null));
    dispatch(setDriverData(null));
    dispatch(setFromDate(""));
    dispatch(setToDate(""));
  }, []);

  useEffect(() => {
    if (!isBeginDateValid || !isEndDateValid) {
      dispatch(setIsDateValid(false));
    } else {
      dispatch(setIsDateValid(true));
    }
  }, [isBeginDateValid, isEndDateValid]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Col className="p-15 mt-5 mb-5" xs={7}>
              {/* Driver Selection Autocomplete */}
              <Form.Group className="my-3 form-group align-items-center row m-l-0 m-r-0">
                <Col xs={3} sm={3} md={3} className="p-0 text-end">
                  <Form.Label className="customColFormLabel me-4">Driver</Form.Label>
                </Col>
                <Col xs={6} sm={6} md={6} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={driverNames}
                    searchString={driverNameInput}
                    renderItemId={(driver) => driver.driverPK}
                    renderItemField={(driver) =>
                      driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : "")
                    }
                    selectedId={driverId}
                    loading={driverLoading}
                    handleSearchString={(string) => dispatch(setDriverNameInput(string))}
                    fetchDataBySearchString={fetchDriverByName}
                    onSelect={handleDriverSelection}
                    clearInputCallback={() => {
                      dispatch(setDriverId(null));
                    }}
                    className={`${!driverId || driverNameInput === "" ? "borderRed" : "borderGreen"}`}
                  />
                  <LookupButton onClick={handleDriverLookupModalShow} />
                </Col>
              </Form.Group>

              {/* Beginning Date */}
              <Form.Group className="my-3 align-items-center row m-l-0 m-r-0">
                <Col xs={3} sm={3} md={3} className="p-0 text-end">
                  <Form.Label htmlFor="name" className="customColFormLabel me-4">
                    Beginning Date
                  </Form.Label>
                </Col>

                <Col xs={3} sm={3} className="p-0" style={{ maxWidth: "95px" }}>
                  <DateInputField
                    date={fromDate}
                    setIsDateValid={setIsBeginDateValid}
                    reduxSetDate={(value) => dispatch(setFromDate(value))}
                    max={toDate ? parseLocalDate(toDate) : ""}
                    className={`${fromDate === "" || !isBeginDateValid ? "borderRed" : "borderGreen"}`}
                  />
                </Col>
              </Form.Group>

              {/* Ending Date */}
              <Form.Group className="my-3 align-items-center row m-l-0 m-r-0">
                <Col xs={3} sm={3} md={3} className="p-0 text-end">
                  <Form.Label htmlFor="name" className="customColFormLabel me-4">
                    Ending Date
                  </Form.Label>
                </Col>
                <Col xs={3} sm={3} className="p-0" style={{ maxWidth: "95px" }}>
                  <DateInputField
                    date={toDate}
                    setIsDateValid={setIsEndDateValid}
                    reduxSetDate={(value) => dispatch(setToDate(value))}
                    min={fromDate ? parseLocalDate(fromDate) : ""}
                    className={`${toDate === "" || !isEndDateValid ? "borderRed" : "borderGreen"}`}
                  />
                </Col>
                {/* </div> */}
              </Form.Group>
            </Col>
            <DriverLookup
              show={driverSelection}
              onHide={driverModalHide}
              renderItemId={(driver) => driver.driverPK}
              handleLookupSelection={handleDriverLookupSelection}
              EditShuttle
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditShuttleDriverContent;
