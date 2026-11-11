import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../../../../../../../styles/QuarterScreen.module.css";
import { useNavigate, useParams } from "react-router-dom";

import formatDatetimeToDate from "../../../../../../../../utils/formatDateTimeToDate";
import DateInputField from "../../../../../../../common/DateInputField";
import PostalCodeComponent from "../../../../../../../common/PostalCodeComponent";
import EditCheckinService from "../../../../../../../../services/EditCheckinService";
import {
  resetState,
  setEditFormData,
  setFormDetails,
  setInvoiceTracking,
  setMasterUser,
  setPreInvoiced,
  setViewDetail,
  setPostalCode,
} from "../../../../../../../../redux/EditCheckinSlice";

function FormContent(loading) {
  const { id, checkinId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewDetail = useSelector((state) => state.editCheckinReducer.viewDetail);
  const editFormData = useSelector((state) => state.editCheckinReducer.editFormData);
  const changesCancelled = useSelector((state) => state.editCheckinReducer.changesCancelled);

  const [postalOptions, setPostalOptions] = useState([]);
  const [currentLocationPostalCode, setCurrentLocationPostalCode] = useState("");
  const [loader, setLoader] = useState(true);
  const [currentLocationCity, setCurrentLocationCity] = useState("");
  const [currentLocationStateCode, setCurrentLocationStateCode] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [model, setModel] = useState("");
  const [unitType, setUnitType] = useState("");
  const [specialCode, setSpecialCode] = useState("");
  const [pickupName, setPickupName] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const [pickupState, setPickupState] = useState();
  const [epuDate, setEpuDate] = useState();
  const [deliveryName, setDeliveryName] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryState, setDeliveryState] = useState("");
  const [etaDate, setEtaDate] = useState("");
  const [driverFirstName, setDriverFirstName] = useState("");
  const [driverLastName, setDriverLastName] = useState("");
  const postalCode = useSelector((state) => state.editCheckinReducer.postalCode);

  window.addEventListener("popstate", () => {
    resetState();
    navigate(`/edit-checkin-browse/${id}`);
  });

  const fetchRecord = (checkinId) => {
    setLoader(true);
    dispatch(setPostalCode(null));
    EditCheckinService.getRecord(checkinId)
      .then((res) => {
        const data = res.data;
        dispatch(setEditFormData(data[0]));
        dispatch(setViewDetail(true));
        dispatch(setPostalCode(data[0]?.PostalCodePK));
      })
      .catch((err) => {
        navigate(`/edit-checkin-browse/${id}`);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    if (checkinId) fetchRecord(checkinId);
  }, [checkinId]);

  useEffect(() => {
    if (editFormData != null) {
      setUnitNumber(editFormData.UnitNumber || "");
      setModel(editFormData.Model || "");
      setUnitType(editFormData.DescriptionShort || "");
      setSpecialCode(editFormData.Code || "");
      setPickupName(editFormData.PickupName || "");
      setPickupCity(editFormData.PickupCity || "");
      setPickupState(editFormData.PickupState || "");
      setEpuDate(editFormData.EPU != null ? formatDatetimeToDate(editFormData.EPU) : "");
      setDeliveryName(editFormData.DeliveryName || "");
      setDeliveryCity(editFormData.DeliveryCity || "");
      setDeliveryState(editFormData.DeliveryState || "");
      setEtaDate(editFormData.ETA != null ? formatDatetimeToDate(editFormData.ETA) : "");
      setDriverFirstName(editFormData.DriverName || "");
      dispatch(setInvoiceTracking(editFormData?.InvoiceTracking));
      dispatch(setPreInvoiced(editFormData?.Preinvoiced));
      dispatch(setMasterUser(editFormData?.MasterUser));

      const location = editFormData?.Location || "";
      const [cityPart, stateCode] = location.split(", ");
      const city = cityPart.split(" - ").pop(); // Get the city part after "Dispatch -"

      setCurrentLocationCity(editFormData?.CurrentCity);
      setCurrentLocationStateCode(editFormData?.CurrentState);
    }
  }, [editFormData, changesCancelled]);

  useEffect(() => {
    dispatch(
      setFormDetails({
        currentLocationCity: currentLocationCity,
        currentLocationStateCode: currentLocationStateCode,
        driverCheckInPK: checkinId,
      })
    );
  }, [currentLocationStateCode, currentLocationCity]);

  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border groupsMaintenanceQuarterScreenHeight">
        <Form>
          {loader ? (
            <div className="fade modal-backdrop show">
              <div className="pos-center">
                <div className="loader"></div>
              </div>
            </div>
          ) : (
            <div className="p-15 w-100 ">
              <Row className="m-0 p-0">
                <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                  <Form.Group
                    className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                  >
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0">
                        Driver
                      </Form.Label>
                    </Col>
                    <Col sm={6} md={6} xs={6} className="p-0">
                      <input
                        className={"customFormControl"}
                        id="driver"
                        name="driver"
                        type="text"
                        maxLength={50}
                        value={driverFirstName?.trim() + " " + driverLastName?.trim()}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          setDriverFirstName(e.target.value);
                        }}
                        disabled
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                  >
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0">
                        Unit Number
                      </Form.Label>
                    </Col>
                    <Col sm={6} md={6} xs={6} className="p-0">
                      <input
                        className={"customFormControl"}
                        id="unitNumber"
                        name="unitNumber"
                        type="text"
                        maxLength={21}
                        value={unitNumber}
                        disabled
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          setUnitNumber(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                  >
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0">
                        Model
                      </Form.Label>
                    </Col>
                    <Col sm={6} md={6} xs={6} className="p-0">
                      <input
                        className={"customFormControl"}
                        id="model"
                        name="model"
                        type="text"
                        maxLength={50}
                        value={model}
                        disabled
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          setModel(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                  >
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0">
                        Unit Type
                      </Form.Label>
                    </Col>
                    <Col sm={6} md={6} xs={6} className="p-0">
                      <input
                        className={"customFormControl"}
                        id="unitType"
                        name="unitType"
                        type="text"
                        maxLength={50}
                        value={unitType}
                        disabled
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          setUnitType(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                  >
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label m-l-0">
                        Special Code
                      </Form.Label>
                    </Col>
                    <Col sm={6} md={6} xs={6} className="p-0">
                      <input
                        className={"customFormControl"}
                        id="specialCode"
                        name="specialCode"
                        type="text"
                        maxLength={50}
                        value={specialCode}
                        disabled
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          setSpecialCode(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Row className={"hide-elements"}>
                    <Col xs={3} md={3} sm={3}></Col>
                    <Col style={{ paddingLeft: "5px" }}>
                      <p className="p-0 text-danger alert" style={{ height: "45px" }}></p>
                    </Col>
                  </Row>
                  <PostalCodeComponent
                    hideZip
                    disabled={viewDetail}
                    city={currentLocationCity}
                    setCity={setCurrentLocationCity}
                    stateCode={currentLocationStateCode}
                    setStateCode={setCurrentLocationStateCode}
                    postalCode={currentLocationPostalCode}
                    setPostalCode={setCurrentLocationPostalCode}
                    postalCodePK={postalCode}
                    setPostalCodePK={(postalCodePK) => dispatch(setPostalCode(postalCodePK))}
                    postalOptions={postalOptions}
                    setPostalValues={setPostalOptions}
                    canadian={false}
                    setCanadian={() => {}}
                    cityColNumber={7}
                    stateInputWidth={"60px"}
                    className="editCheckinPostalCode"
                  />
                </Col>
                <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                  <Form.Group
                    className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                  >
                    <Col xs={3} sm={3} md={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Pickup</Form.Label>
                    </Col>
                    <Col sm={7} md={7} xs={7} className="p-0">
                      <input
                        type="text"
                        className="customFormControl"
                        id="pickup"
                        name="pickup"
                        value={pickupName}
                        maxLength={30}
                        disabled
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          setPickupName(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                  >
                    <Col xs={3} sm={3} md={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label"></Form.Label>
                    </Col>
                    <Col sm={7} md={7} xs={7} className="p-0">
                      <input
                        type="text"
                        className="customFormControl"
                        id="pickup"
                        name="pickup"
                        value={pickupCity}
                        maxLength={30}
                        disabled
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          setPickupCity(e.target.value);
                        }}
                      />
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 d-flex" style={{ marginLeft: "10px" }}>
                      <input
                        type="text"
                        style={{ width: "30px" }}
                        className="customFormControl ml-2"
                        id="pickup"
                        name="pickup"
                        value={pickupState}
                        maxLength={30}
                        disabled
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          setPickupState(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                  >
                    <Col xs={3} sm={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">EPU</Form.Label>
                    </Col>

                    <Col xs={3} md={3} lg={3} sm={3} className="p-0" style={{ width: "95px" }}>
                      <DateInputField
                        className="customFormControl"
                        date={epuDate}
                        dateFormat="MM/dd/yy"
                        disabled
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                  >
                    <Col xs={3} sm={3} md={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Delivery</Form.Label>
                    </Col>
                    <Col sm={7} md={7} xs={7} className="p-0">
                      <input
                        type="text"
                        className="customFormControl"
                        id="delivery"
                        name="delivery"
                        value={deliveryName}
                        maxLength={30}
                        disabled
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                  >
                    <Col xs={3} sm={3} md={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label"></Form.Label>
                    </Col>
                    <Col sm={7} md={7} xs={7} className="p-0">
                      <input
                        type="text"
                        className="customFormControl"
                        id="delivery"
                        name="delivery"
                        value={deliveryCity}
                        maxLength={30}
                        disabled
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={""}
                      />
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0 d-flex" style={{ marginLeft: "10px" }}>
                      <input
                        type="text"
                        className="customFormControl ml-2"
                        id="delivery"
                        style={{ width: "30px" }}
                        name="delivery"
                        value={deliveryState}
                        maxLength={30}
                        disabled
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                  >
                    <Col xs={3} sm={3} className="p-0">
                      <Form.Label className="col-form-label dealer-label">ETA</Form.Label>
                    </Col>

                    <Col xs={3} md={3} lg={3} sm={3} className="p-0" style={{ width: "95px" }}>
                      <DateInputField
                        className="customFormControl"
                        date={etaDate}
                        dateFormat="MM/dd/yy"
                        disabled
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}

export default FormContent;
