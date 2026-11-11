import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../../../../common/ModalComponent";
import OutstandingPaperworkService from "../../../../../../services/operations/OutstandingPaperworkService";
import QuarterScreenWrapper from "../../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../../common/Header";
import { Button, Col, Form, Row } from "react-bootstrap";
import CommonFooter from "../../../../../common/CommonFooter";

import DateInputField from "../../../../../common/DateInputField";
import HalfScreenWrapper from "../../../../../Templates/Screens/HalfScreenWrapper";
import { resetChanges, setPageNumber } from "../../../../../../redux/Reports/AvailableDriversSlice";
import AvailableDriverListService from "../../../../../../services/Reports/AvailableDriverListService";
import DriverCheckinService from "../../../../../../services/DriverCheckinService";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";

const AvaliableComments = () => {
  const { selectedDriverPK } = useSelector((state) => state.availableDriversSlice);

  const [additionalNotes, setAdditionalNotes] = useState("");
  const [cancelShow, setCancelShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [availableDate, setAvailableDate] = useState("");
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = () => {
    const hasChanges = !!(comment || city || state || notes || driverCity);
    if (hasChanges) {
      setCancelShow(true);
    } else {
      navigate(`/avaliable-driver-browse-page`);
    }
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    navigate(`/avaliable-driver-browse-page`);
    toast.success("Changes Cancelled");
  };

  window.addEventListener("popstate", () => {
    dispatch(resetChanges());
    dispatch(setPageNumber(0));
    navigate(`/avaliable-driver-browse-page`);
  });

  useEffect(() => {
    if (!selectedDriverPK) navigate(`/avaliable-driver-browse-page`);
  }, [selectedDriverPK]);
  useEffect(() => {
    if (selectedDriverPK) {
      fetchDriverComments(selectedDriverPK);
    }
  }, [selectedDriverPK]);

  const fetchDriverComments = async (driverPK) => {
    setLoading(true);

    try {
      const response = await AvailableDriverListService.getDriverComments(driverPK);
      setDriverData(response?.data?.result[0]);
      setAvailableDate(response?.data?.result[0]?.AvailableDate);
    } catch (error) {
      console.error("Error fetching driver comments:", error);
    } finally {
      setLoading(false);
    }
  };
  /*save*/

  const saveComments = async (selectedDriverPK, comment, city, state, availableDate, notes) => {
    setLoading(true);

    try {
      const date = availableDate?.split(" ")[0];

      const response = await AvailableDriverListService.saveDriverComment(
        selectedDriverPK,
        comment,
        city,
        state,
        date,
        notes
      );

      const result = response?.data?.result?.[0];

      if (result?.IsSuccess === 1) {
        toast.success("Saved successfully");

        navigate("/avaliable-driver-browse-page");
      } else {
        toast.error("Save Failed");
        navigate("/avaliable-driver-browse-page");
      }
    } catch (error) {
      navigate("/avaliable-driver-browse-page");

      console.error("Error saving driver comments:", error);
      toast.error("Save Failed");
    } finally {
      setLoading(false);
    }
  };
  const footerButtons = [
    {
      label: "Save",
      onClick: () =>
        saveComments(selectedDriverPK, comment, city ? city : driverCity, state, availableDate, notes),
      disabled:
        (!comment && !city && !notes && !availableDate && !driverCity && !state) ||
        !availableDatevalid ||
        (city && !postalCodePK) ||
        (state && !postalCodePK),
    },
    {
      label: "Cancel",
      onClick: handleCancel,
    },
  ];
  /**postalcode**/
  const handleMouseEventMain = (e) => {
    setIdValue(e.target.id);
  };

  /* this lookup answers in PascalCase, PostalCodeComponent reads camelCase rows */
  const fetchCityStateOptions = (city, stateCode) =>
    DriverCheckinService.checkCityStateCode(city, stateCode).then((response) => ({
      ...response,
      data: (response.data || []).map((location) => ({
        city: location.City?.trim(),
        stateCode: location.StateCode?.trim(),
        postalCode: location.PostalCode ?? "",
        postalCodePK: location.PostalCodePK,
      })),
    }));

  return (
    <HalfScreenWrapper>
      <Header
        closeHandler={() => dispatch(resetChanges())}
        confirmClose
        programName="Available Driver Report"
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
                    className="avaliableCommentsPostalCode"
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

      {/* //eta date Modal */}

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

export default AvaliableComments;
