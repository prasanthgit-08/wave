import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../../../../../../styles/ThreeQuarterScreen.module.css";
import {
  setCommentsClearBit,
  setCommentsData,
  setDisableSave,
} from "../../../../../../../redux/DriverCheckinSlice";
import ModalComponent from "../../../../../../common/ModalComponent";
import toast from "react-hot-toast";
import AvailableDriverListService from "../../../../../../../services/Reports/AvailableDriverListService";
import DriverCheckinService from "../../../../../../../services/DriverCheckinService";
import HalfScreenWrapper from "../../../../../../Templates/Screens/HalfScreenWrapper";
import Header from "../../../../../../common/Header";
import DateInputField from "../../../../../../common/DateInputField";
import CommonFooter from "../../../../../../common/CommonFooter";
import PostalCodeComponent from "../../../../../../common/PostalCodeComponent";

const AddComments = () => {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [cancelShow, setCancelShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [existAvailableDate, setExistAvailableDate] = useState("");

  const [notes, setNotes] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [availableDatevalid, setAvailableDatevalid] = useState(false);
  const [driverCity, setDriverCity] = useState("");
  const [driverData, setDriverData] = useState(null);

  /*postal code*/
  const [idValue, setIdValue] = useState(null);
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [postalOptions, setPostalOptions] = useState([]);

  const initialValues = useRef(null);
  // Bumped on Cancel → Yes so a city/state lookup still in flight can't refill the cleared fields.
  const cancelVersion = useRef(0);

  useEffect(() => {
    if (existAvailableDate !== undefined) {
      initialValues.current = {
        comment,
        availableDate: existAvailableDate,
        notes,
        city,
        state,
        driverCity,
      };
    }
  }, [existAvailableDate]);

  /***Check the changes made to fields */
  const hasChanges = !!(comment || city || state || notes || driverCity);

  const handleCancel = () => {
    const hasChanges =
      comment !== initialValues.current.comment ||
      availableDate !== initialValues.current.availableDate ||
      notes !== initialValues.current.notes ||
      city !== initialValues.current.city ||
      state !== initialValues.current.state ||
      driverCity !== initialValues.current.driverCity;
    if (hasChanges) {
      setCancelShow(true);
    } else {
      navigate(`/add-comments/${driverId}`);
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    cancelVersion.current += 1;
    setComment("");
    setDriverCity("");
    setCity("");
    setState("");
    setPostalCodePK(null);
    setPostalOptions([]);
    setNotes("");
    setAvailableDate(existAvailableDate);
    setCancelShow(false);
    navigate(`/add-comments/${driverId}`);
    toast.success("Changes Cancelled");
  };

  const commentsClearBit = useSelector((state) => state.driverCheckinReducer.commentsClearBit);

  useEffect(() => {
    if (!driverId) navigate(`/driver-service-selection/${driverId}/form`);
  }, [driverId]);
  useEffect(() => {
    if (driverId) {
      fetchDriverComments(driverId);
    }
  }, [driverId]);

  const fetchDriverComments = async (driverPK) => {
    setLoading(true);

    try {
      const response = await AvailableDriverListService.getDriverComments(driverPK);
      setDriverData(response?.data?.result[0]);
      setAvailableDate(response?.data?.result[0]?.AvailableDate);
      setExistAvailableDate(response?.data?.result[0]?.AvailableDate);
    } catch (error) {
      console.error("Error fetching driver comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveComments = async (driverId, comment, city, state, availableDate, notes) => {
    setLoading(true);

    try {
      const date = availableDate?.split(" ")[0];
      const response = await AvailableDriverListService.saveDriverComment(
        driverId,
        comment,
        city,
        state,
        date,
        notes
      );

      const result = response?.data?.result?.[0];

      if (result?.IsSuccess === 1) {
        toast.success("Comments saved successfully");
        navigate(`/driver-service-selection/${driverId}/form`);
      } else {
        toast.error("Failed to save comments");
        navigate(`/driver-service-selection/${driverId}/form`);
      }
    } catch (error) {
      navigate(`/driver-service-selection/${driverId}/form`);
      console.error("Error saving driver comments:", error);
      toast.error("Failed to save comments");
    } finally {
      setLoading(false);
    }
  };

  const footerButtons = [
    {
      label: "Save",
      onClick: () => saveComments(driverId, comment, city ? city : driverCity, state, availableDate, notes),
      disabled:
        (!comment && !city && !notes && !availableDate && !driverCity && !state) ||
        !availableDatevalid ||
        (city && !postalCodePK) ||
        (state && !postalCodePK),
    },
    {
      label: "Cancel",
      onClick: handleCancel,
      // Keep focus where it is on mouse-down: otherwise City/State blur, the postal lookup shows its
      // full-screen loader before mouse-up, and the click lands on the loader instead of Cancel.
      onMouseDown: (e) => e.preventDefault(),
    },
  ];

  /**postalcode**/
  const handleMouseEventMain = (e) => {
    setIdValue(e.target.id);
  };

  const fetchCityStateOptions = (city, stateCode) => {
    // The lookup fires when focus leaves City/State, e.g. when Cancel is clicked. If Cancel → Yes
    // happened meanwhile, return no options so the response doesn't refill the cleared fields.
    const requestVersion = cancelVersion.current;
    return DriverCheckinService.checkCityStateCode(city, stateCode).then((response) => ({
      ...response,
      data:
        requestVersion !== cancelVersion.current
          ? []
          : (response.data || []).map((location) => ({
              city: location.City?.trim(),
              stateCode: location.StateCode?.trim(),
              postalCode: location.PostalCode ?? "",
              postalCodePK: location.PostalCodePK,
            })),
    }));
  };

  return (
    <HalfScreenWrapper>
      <Header
        closeNavigationURL={`/driver-service-selection/${driverId}/form`}
        confirmClose={hasChanges}
        programName="Add Comments"
      />
      <div className="w-100 p-2 " onClick={handleMouseEventMain} onFocus={handleMouseEventMain}>
        <div className="shadow-sm rounded border halfScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col xs={12}>
                  <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
                    <Col sm={1} md={1} xs={1} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Driver</Form.Label>
                    </Col>
                    <Col xs={4} md={4} sm={4} className="p-0">
                      <input
                        id="customer"
                        name="customer"
                        value={driverData?.Driver}
                        disabled
                        className={`customFormControl`}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={1} md={1} xs={1} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Last Comment</Form.Label>
                    </Col>
                    <Col xs={3} md={3} sm={3} className="p-0">
                      <input
                        id="customer"
                        name="customer"
                        value={driverData?.LastComment}
                        disabled
                        className={`customFormControl`}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={1} md={1} xs={1} className="p-0">
                      <Form.Label className="col-form-label dealer-label">City, State</Form.Label>
                    </Col>
                    <Col xs={4} md={4} sm={4} className="p-0">
                      <input
                        id="customer"
                        name="customer"
                        value={driverData?.City}
                        disabled
                        className={`customFormControl`}
                      />
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-r-0 ">
                      <input
                        style={{ width: "30px" }}
                        className="customFormControl"
                        name="pickupCity"
                        type="text"
                        disabled
                        value={driverData?.State}
                      />{" "}
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-2 align-items row  m-l-0 m-r-0">
                    <Col sm={1} md={1} xs={1} className="p-0">
                      <Form.Label className="col-form-label dealer-label"> Notes</Form.Label>
                    </Col>
                    <Col xs={9} md={9} sm={9} className="p-0">
                      <textarea
                        id="customer"
                        name="customer"
                        rows={8}
                        cols={40}
                        value={driverData?.Notes}
                        disabled
                        className={`customFormControl h-100 `}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                    <Col sm={1} md={1} xs={1} className="p-0">
                      <Form.Label className="col-form-label dealer-label">Entered By</Form.Label>
                    </Col>
                    <Col xs={3} md={3} sm={3} className="p-0">
                      <input
                        id="customer"
                        name="customer"
                        value={driverData?.EnteredBy}
                        disabled
                        className={`customFormControl`}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                    <Col sm={1} md={1} xs={1} className="p-0">
                      <Form.Label className="col-form-label dealer-label"> Comment</Form.Label>
                    </Col>
                    <Col xs={3} md={3} sm={3} className="p-0">
                      <input
                        id="customer"
                        name="customer"
                        value={comment}
                        maxLength={45}
                        className={`customFormControl`}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setComment(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
                      />{" "}
                    </Col>
                    <Col xs={3} md={3} sm={3} className="p-r-0 ">
                      <input
                        className="customFormControl"
                        name="pickupCity"
                        type="text"
                        maxLength={45}
                        value={driverCity}
                        disabled={!!(city || state)}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setDriverCity(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
                      />{" "}
                    </Col>
                  </Form.Group>
                  <PostalCodeComponent
                    hideZip
                    isOptional
                    disabled={!!driverCity}
                    city={city}
                    setCity={setCity}
                    stateCode={state}
                    setStateCode={setState}
                    postalCode=""
                    setPostalCode={() => {}}
                    postalCodePK={postalCodePK}
                    setPostalCodePK={setPostalCodePK}
                    postalOptions={postalOptions}
                    setPostalValues={setPostalOptions}
                    setCanadian={() => {}}
                    fetchPostalOptions={fetchCityStateOptions}
                    labelColNumber={1}
                    cityColNumber={4}
                    stateInputWidth={"60px"}
                    className="addCommentsPostalCode"
                  />
                  <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                    <Col sm={1} md={1} xs={1} className="p-0">
                      <Form.Label className="col-form-label dealer-label"> Available</Form.Label>
                    </Col>

                    <Col xs={2} md={2} sm={2} className="p-0  w-100px">
                      <DateInputField
                        date={availableDate}
                        setDate={setAvailableDate}
                        setIsDateValid={setAvailableDatevalid}
                        className={`customFormControl ${availableDatevalid ? "" : "borderRed"}`}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Form.Group className="mt-2 align-items row  m-l-0 m-r-0">
                  <Col sm={1} md={1} xs={1} className="p-0">
                    <Form.Label className="col-form-label dealer-label"> Notes</Form.Label>
                  </Col>
                  <Col xs={9} md={9} sm={9} className="p-0">
                    <textarea
                      id="customer"
                      name="customer"
                      onInput={(e) => setNotes(e.target.value.replace(/^\s+/g, ""))}
                      rows={8}
                      cols={40}
                      value={notes}
                      className={`customFormControl h-100 `}
                    />
                  </Col>
                </Form.Group>
              </Row>
              {loading && (
                <div className="fade modal-backdrop show">
                  <div className="pos-center">
                    <div className="loader"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <ModalComponent
        show={cancelShow}
        onHide={handleCancelNo}
        title={"Cancel Comment"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />

      <CommonFooter buttons={footerButtons} />
    </HalfScreenWrapper>
  );
};

export default AddComments;
