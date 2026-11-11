import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../../common/LookupButton";
import DriverService from "../../../../../../../services/DriverService";
import DriverLookup from "../../../../../../LookupScreens/Driver/DriverLookup";
import PostalCodeComponent from "../../../../../../common/PostalCodeComponent";
import DriverServicesService from "../../../../../../../services/DriverServicesService";
import LoadingIcon from "../../../../../../common/LoadingIcon";

const FormContent = ({
  driverId,
  values,
  errors,
  handleChange,
  handleBlur,
  setValues,
  setErrors,
  setFieldValue,
  setFieldError,
}) => {
  const [driverList, setDriverList] = useState([]);
  const [showDriverLookup, setShowDriverLookup] = useState(false);
  const [currentDriverData, setCurrentDriverData] = useState(null);
  const [driverLoading, setDriverLoading] = useState(false);
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const {
    forDriver,
    driver,
    driverInput,
    recipient,
    address1,
    address2,
    thankYouText,
    city,
    stateCode,
    postalCode,
    canadian,
    postalCodePK,
  } = values;

  // Fetch Current Driver Details
  useEffect(() => {
    const fetchCurrentDriver = () => {
      setDriverLoading(true);
      DriverServicesService.getDriverDetails(driverId)
        .then((response) => {
          const { data } = response;
          setCurrentDriverData(data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setDriverLoading(false);
        });
    };

    if (driverId) {
      fetchCurrentDriver();
    }
  }, []);

  // For default setting of current driver
  useEffect(() => {
    if (values?.forDriver) {
      if (
        currentDriverData &&
        currentDriverData?.active &&
        (!currentDriverData?.deleased || !currentDriverData?.deceased)
      ) {
        setValues({
          ...values,
          driver: Number(driverId),
          driverInput: currentDriverData?.lastName
            ? `${currentDriverData?.firstName?.trim()} ${currentDriverData?.lastName?.trim()}`
            : currentDriverData?.firstName?.trim(),
        });
      }
    }
  }, [values?.forDriver]);

  /**
   * API call for fetching driverList based on search string
   * @param {*} string search string for Driver Autocomplete
   */
  const fetchDriverList = (string) => {
    DriverService.getDriverForAuto(string, true)
      .then(({ data }) => {
        const trimmedList = data.content?.map((driver) => ({
          ...driver,
          name: driver.lastName
            ? `${driver.firstName?.trim()} ${driver.lastName?.trim()}`
            : driver.firstName?.trim(),
        }));
        setDriverList(trimmedList);
      })
      .catch(() => {});
  };

  /**
   * To handle selection from AutoComplete/Lookup
   * @param {*} driver object from AutoComplete/Lookup
   */
  const handleDriverSelection = (driver) => {
    setValues({
      ...values,
      driver: driver.driverPK,
      driverInput: driver.lastName
        ? `${driver.firstName?.trim()} ${driver.lastName?.trim()}`
        : driver.firstName?.trim(),
    });
    setShowDriverLookup(false);
  };

  const handleForDriver = (e) => {
    // Clear values conditionaly when toggling forDriver
    if (e.target.checked) {
      setValues({
        ...values,
        recipient: "",
        address1: "",
        address2: "",
        city: "",
        stateCode: "",
        postalCode: "",
        postalCodePK: "",
      });
    } else {
      setValues({ ...values, driver: "", driverInput: "" });
    }
    handleChange(e);
  };

  return (
    <div className="w-100 p-2">
      {driverLoading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <Row className="mt-2 mx-3">
          <Col xs={6}>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="customColFormLabel">For Driver</Form.Label>
              </Col>

              <Col xs={1} md={1} sm={1} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="forDriver"
                  name="forDriver"
                  checked={forDriver}
                  onChange={(e) => handleForDriver(e)}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Driver</Form.Label>
              </Col>

              <Col xs={9} md={9} sm={9} className="d-flex p-0">
                <AutoCompleteDropdown
                  arrayList={driverList}
                  searchString={driverInput}
                  handleSearchString={(string) => setFieldValue("driverInput", string)}
                  renderItemId={(driver) => driver.driverPK}
                  renderItemField={(driver) =>
                    driver.lastName ? `${driver.firstName} ${driver.lastName}` : driver.firstName
                  }
                  fetchDataBySearchString={fetchDriverList}
                  onSelect={handleDriverSelection}
                  clearInputCallback={() => setFieldValue("driver", "")}
                  selectedId={driver}
                  className={!forDriver ? "" : errors.driver ? "borderRed" : "borderGreen"}
                  disabled={!forDriver}
                />
                <LookupButton onClick={() => setShowDriverLookup(true)} disabled={!forDriver} />
                <DriverLookup
                  show={showDriverLookup}
                  onHide={() => setShowDriverLookup(false)}
                  handleLookupSelection={handleDriverSelection}
                  MaintenanceProgram
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={6}>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Recipient</Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  name="recipient"
                  id="recipient"
                  type="text"
                  className={`customFormControl ${
                    forDriver ? "" : errors.recipient ? "borderRed" : "borderGreen"
                  }`}
                  value={recipient}
                  onChange={handleChange}
                  disabled={forDriver}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="customColFormLabel">Address</Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  name="address1"
                  id="ad1"
                  type="text"
                  className={`customFormControl ${forDriver ? "" : errors.address1 ? "borderRed" : "borderGreen"}`}
                  value={address1}
                  onChange={handleChange}
                  disabled={forDriver}
                  maxLength={30}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  spellCheck={false}
                />
              </Col>
            </Form.Group>
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
              <Col sm={3} md={3} xs={3} className="p-0" />

              <Col xs={7} md={7} sm={7} className="p-0">
                <input
                  name="address2"
                  id="ad2"
                  type="text"
                  className={`customFormControl`}
                  value={address2}
                  onChange={handleChange}
                  disabled={forDriver}
                  maxLength={30}
                  autoComplete="one-time-code"
                  aria-autocomplete="list"
                  spellCheck={false}
                />
              </Col>
            </Form.Group>

            <div className="">
              <PostalCodeComponent
                disabled={forDriver}
                hideLabel
                city={city}
                setCity={(value) => setFieldValue("city", value)}
                stateCode={stateCode}
                setStateCode={(value) => setFieldValue("stateCode", value)}
                postalCode={postalCode}
                setPostalCode={(value) => setFieldValue("postalCode", value)}
                setPostalValues={setPostalValues}
                postalOptions={postalOptions}
                postalCodePK={postalCodePK}
                setPostalCodePK={(value) => setFieldValue("postalCodePK", value)}
                canadian={canadian}
                setCanadian={(value) => setFieldValue("canadian", value)}
                zipInputWidth={"100px"}
                stateInputWidth={"50px"}
              />
            </div>
          </Col>
        </Row>
        <Row className="mt-3 mx-3">
          <Col xs={12}>
            <Form.Group className="form-group row m-l-0 m-r-0 mt-1">
              <Col sm={12} md={12} xs={12} className="p-0">
                <Form.Label className="customColFormLabel">Thank You Text</Form.Label>
              </Col>

              <Col xs={12} md={12} sm={12} className="p-0 mt-1">
                <textarea
                  name="thankYouText"
                  id="thankYouText"
                  style={{ width: "100%" }}
                  rows="10"
                  value={thankYouText}
                  onChange={handleChange}
                  className={`customFocusClass ${errors.thankYouText ? "borderRed" : "borderGreen"}`}
                  maxLength={300}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FormContent;
