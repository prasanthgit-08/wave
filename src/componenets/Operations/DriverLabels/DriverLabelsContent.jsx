import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import DateInputField from "../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  setDivision,
  setEndDay,
  setEndFirstName,
  setEndLastName,
  setIsLastDateValid,
  setLabelBy,
  setLastDispatch,
  setMaximumAge,
  setStartDay,
  setStartFirstName,
  setStartLastName,
  setStatus,
} from "../../../redux/DriverLabelsSlice";
import formatDatetimeToDate from "../../../utils/formatDateTimeToDate";

const DriverLabelsContent = () => {
  const dispatch = useDispatch();

  const {
    labelBy,
    status,
    division,
    showStatus,
    showDivison,
    showDeleased,
    showName,
    showAnniversary,
    isThankYouCard,
    isLastDateValid,
    startDay,
    endDay,
    startFirstName,
    endFirstName,
    startLastName,
    endLastName,
    lastDispatch,
    maximumAge,
  } = useSelector((state) => state.driverLabelsSlice);

  const isOnlyNumbers = (value) => /^\d+$/.test(value);

  const isValidDate = (value) => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/; // MM/DD with day > 00
    return regex.test(value);
  };

  const isOnlyAlphabets = (value) => /^[A-Za-z\s'-]+$/.test(value);

  const handleLabelByRadioGroupOnChange = (value) => {
    dispatch(reset());
    dispatch(setLabelBy(value));
  };
  const handleStatusRadioGroupOnChange = (value) => {
    dispatch(setDivision("all"));
    dispatch(setLastDispatch());
    dispatch(setMaximumAge(0));
    dispatch(setStatus(value));
  };
  const handleDivionRadioGroupOnChange = (value) => {
    dispatch(setDivision(value));
  };

  const monthDateFormatter = (value) => {
    let input = value.replace(/[^0-9/]/g, ""); // Remove invalid characters

    // Prevent more than 5 characters (MM/DD)
    if (input.length > 5) {
      input = input.slice(0, 5);
    }
    if (input.length === 3) {
      const temp = input.slice(0, 2) + "/" + input.slice(2, 3);
      input = temp;
    }

    // Split input into month and day
    const parts = input.split("/");
    let month = parts[0] || "";
    let day = parts[1] || "";

    // Convert single-digit month to MM (e.g., "3" → "03")
    if (month.length === 1 && input.length >= 2) {
      month = "0" + month;
    }

    // Validate the month (01 to 12)
    if (month.length === 2) {
      const monthInt = parseInt(month, 10);
      if (monthInt < 1) month = "01";
      if (monthInt > 12) month = "12";
    }
    let finalValue = "";
    if (month) {
      finalValue = month.length === 2 ? `${month}` : month;
    }
    // Validate the day based on the month
    if (day) {
      const maxDays = new Date(new Date().getFullYear(), parseInt(month, 10), 0).getDate();
      if (parseInt(day, 10) > maxDays) day = maxDays.toString();
      finalValue += `/${day}`;
    } else if (input.length > 2 || String(input).includes("/")) {
      // Add "/" automatically only when typing MM (but allow backspacing)
      finalValue = month.length === 2 ? `${month}/` : month;
    }
    return finalValue;
  };

  const updateDayFormat = (value) => {
    const parts = value.split("/");
    if (value.length > 3) {
      let month = parts[0] || "";
      let day = parts[1] || "";
      if (parseInt(day) < 10) {
        day = Math.max(parseInt(day), 1);
        value = month + "/0" + day;
      }
    }
    return value;
  };

  return (
    <Form>
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                  {/* Labels By */}
                  <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className="col-form-label dealer-label p-l-15">Labels By</Form.Label>
                    </Col>
                    <Col xs={10} md={10} sm={10} className="p-0 d-flex">
                      <RadioGroup
                        disabled={showStatus || showName || showAnniversary || isThankYouCard}
                        className="d-flex"
                        selectedValue={labelBy}
                        onChange={handleLabelByRadioGroupOnChange}
                      >
                        <div className={`d-flex align-items-center me-4 m-b-5 `}>
                          <Radio
                            value="status"
                            checked={labelBy == "status"}
                            disabled={showStatus || showName || showAnniversary || isThankYouCard}
                          />
                          <label className="f-w-600 m-l-5" style={{ width: "30px" }}>
                            Status
                          </label>
                        </div>
                        <div className={`d-flex align-items-center me-4 m-b-5 `}>
                          <Radio
                            value="name"
                            checked={labelBy == "name"}
                            disabled={showStatus || showName || showAnniversary || isThankYouCard}
                          />
                          <label className="f-w-600 m-l-5" style={{ width: "30px" }}>
                            Name
                          </label>
                        </div>
                        <div className={`d-flex align-items-center me-4 m-b-5 `}>
                          <Radio
                            value="anniversary"
                            checked={labelBy == "anniversary"}
                            disabled={showStatus || showName || showAnniversary || isThankYouCard}
                          />
                          <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                            Anniversary
                          </label>
                        </div>
                        <div className={`d-flex align-items-center me-4 m-b-5 `}>
                          <Radio
                            value="birthday"
                            checked={labelBy == "birthday"}
                            disabled={showStatus || showName || showAnniversary || isThankYouCard}
                          />
                          <label className="f-w-600 m-l-5" style={{ width: "50px" }}>
                            BirthDay
                          </label>
                        </div>
                        <div className={`d-flex align-items-center me-4 m-b-5 `}>
                          <Radio
                            value="thankyouCard"
                            checked={labelBy == "thankyouCard"}
                            disabled={showStatus || showName || showAnniversary || isThankYouCard}
                          />
                          <label className="f-w-600 m-l-5 d-flex" style={{ width: "90px" }}>
                            Thank You Cards
                          </label>
                        </div>
                      </RadioGroup>
                    </Col>
                  </Form.Group>

                  {/* Status */}
                  {(showStatus || showName) && (
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className="col-form-label dealer-label p-l-15">Status</Form.Label>
                      </Col>
                      <Col xs={1} md={1} sm={1} className="p-0">
                        <RadioGroup
                          className="d-flex"
                          selectedValue={status}
                          onChange={handleStatusRadioGroupOnChange}
                        >
                          <div className={`d-flex align-items-center me-4 m-b-5 `}>
                            <Radio
                              disabled={showDeleased || showDivison}
                              value="active"
                              checked={status == "active"}
                            />
                            <label className="f-w-600 m-l-5" style={{ width: "30px" }}>
                              Active
                            </label>
                          </div>
                          <div className={`d-flex align-items-center me-4 m-b-5 `}>
                            <Radio
                              disabled={showDeleased || showDivison}
                              value="inactive"
                              checked={status == "inactive"}
                            />
                            <label className="f-w-600 m-l-5" style={{ width: "40px" }}>
                              Inactive
                            </label>
                          </div>
                          {showStatus && (
                            <div className={`d-flex align-items-center me-4 m-b-5 `}>
                              <Radio
                                disabled={showDeleased || showDivison}
                                value="deleased"
                                checked={status == "deleased"}
                              />
                              <label className="f-w-600 m-l-5" style={{ width: "50px" }}>
                                Deleased
                              </label>
                            </div>
                          )}
                          {showName && (
                            <div className={`d-flex align-items-center me-4 m-b-5 `}>
                              <Radio
                                disabled={showDeleased || showDivison}
                                value="both"
                                checked={status == "both"}
                              />
                              <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                                Both
                              </label>
                            </div>
                          )}
                        </RadioGroup>
                      </Col>
                    </Form.Group>
                  )}

                  {/* Division */}
                  {showDivison && (
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className="col-form-label dealer-label p-l-15">Division</Form.Label>
                      </Col>
                      <Col xs={1} md={1} sm={1} className="p-0">
                        <RadioGroup
                          className="d-flex"
                          selectedValue={division}
                          onChange={handleDivionRadioGroupOnChange}
                        >
                          <div className={`d-flex align-items-center me-4 m-b-5 `}>
                            <Radio value="all" checked={division === "all"} />
                            <label className="f-w-600 m-l-5" style={{ width: "20px" }}>
                              All
                            </label>
                          </div>
                          <div className={`d-flex align-items-center me-4 m-b-5 `}>
                            <Radio value="motorized" checked={division === "motorized"} />
                            <label className="f-w-600 m-l-5" style={{ width: "55px" }}>
                              Motorized
                            </label>
                          </div>
                          <div className={`d-flex align-items-center me-4 m-b-5 `}>
                            <Radio value="towaway" checked={division === "towaway"} />
                            <label className="f-w-600 m-l-5" style={{ width: "45px" }}>
                              Towaway
                            </label>
                          </div>
                          <div className={`d-flex align-items-center me-4 m-b-5 `}>
                            <Radio value="flatbed" checked={division === "flatbed"} />
                            <label className="f-w-600 m-l-5" style={{ width: "40px" }}>
                              Flatbed
                            </label>
                          </div>
                          <div className={`d-flex align-items-center me-4 m-b-5 `}>
                            <Radio value="shuttle" checked={division === "shuttle"} />
                            <label className="f-w-600 m-l-5" style={{ width: "50px" }}>
                              Shuttle
                            </label>
                          </div>
                        </RadioGroup>
                      </Col>
                    </Form.Group>
                  )}

                  {showDeleased && (
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className="col-form-label dealer-label p-l-15">Maximum Age</Form.Label>
                      </Col>
                      <Col xs={1} md={1} sm={1} className="p-0" style={{ width: "40px" }}>
                        <input
                          name="regionCode"
                          type="text"
                          autoComplete="off"
                          aria-autocomplete="list"
                          className={`customFormControl ${lastDispatch && isLastDateValid ? "" : maximumAge && maximumAge > 0 ? "borderGreen" : "borderRed"}`}
                          value={maximumAge}
                          maxLength={3}
                          onChange={(e) => {
                            const value = e.target.value;
                            (isOnlyNumbers(value) || value === "") &&
                              Number(value) <= 150 &&
                              dispatch(setMaximumAge(value));
                          }}
                        />
                      </Col>
                    </Form.Group>
                  )}

                  {showDeleased && (
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className="col-form-label dealer-label p-l-15">Last Dispatch</Form.Label>
                      </Col>
                      <Col xs={1} md={1} sm={1} className="p-0" style={{ width: "100px" }}>
                        <DateInputField
                          date={formatDatetimeToDate(lastDispatch)}
                          setDate={(value) => {
                            dispatch(setLastDispatch(value));
                          }}
                          setIsDateValid={(value) => {
                            dispatch(setIsLastDateValid(value));
                          }}
                          max={new Date()}
                          className={`customFormControl ${
                            !isLastDateValid
                              ? "borderRed"
                              : lastDispatch
                                ? "borderGreen"
                                : maximumAge && maximumAge > 0
                                  ? ""
                                  : "borderRed"
                          }`}
                        />
                      </Col>
                    </Form.Group>
                  )}
                  {showName && (
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className="col-form-label dealer-label p-l-15">Starting Name</Form.Label>
                      </Col>
                      <Col xs={3} md={3} sm={3} className="p-0 m-r-15">
                        <input
                          name="starting Name"
                          type="text"
                          autoComplete="off"
                          aria-autocomplete="list"
                          className={`customFormControl ${startFirstName?.trim() ? "borderGreen" : !endFirstName && (startLastName || endLastName) ? "" : "borderRed"}`}
                          value={startFirstName}
                          onChange={(e) => {
                            const value = e.target.value;
                            (isOnlyAlphabets(value) || value === "") &&
                              dispatch(setStartFirstName(value.replace(/^\s+/, "")));
                          }}
                        />
                      </Col>
                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          name="ending name"
                          type="text"
                          autoComplete="off"
                          aria-autocomplete="list"
                          className={`customFormControl ${endFirstName?.trim() ? "borderGreen" : !startFirstName && (startLastName || endLastName) ? "" : "borderRed"}`}
                          value={endFirstName}
                          onChange={(e) => {
                            const value = e.target.value;
                            (isOnlyAlphabets(value) || value === "") &&
                              dispatch(setEndFirstName(value.replace(/^\s+/, "")));
                          }}
                        />
                      </Col>
                    </Form.Group>
                  )}
                  {showName && (
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className="col-form-label dealer-label p-l-15">Ending Name</Form.Label>
                      </Col>
                      <Col xs={3} md={3} sm={3} className="p-0 m-r-15">
                        <input
                          name="regionCode"
                          type="text"
                          autoComplete="off"
                          aria-autocomplete="list"
                          className={`customFormControl ${startLastName?.trim() ? "borderGreen" : !endLastName && (startFirstName || endFirstName) ? "" : "borderRed"}`}
                          value={startLastName}
                          onChange={(e) => {
                            const value = e.target.value;
                            (isOnlyAlphabets(value) || value === "") &&
                              dispatch(setStartLastName(value.replace(/^\s+/, "")));
                          }}
                        />
                      </Col>
                      <Col xs={3} md={3} sm={3} className="p-0">
                        <input
                          name="regionCode"
                          type="text"
                          autoComplete="off"
                          aria-autocomplete="list"
                          className={`customFormControl ${endLastName?.trim() ? "borderGreen" : !startLastName && (startFirstName || endFirstName) ? "" : "borderRed"}`}
                          value={endLastName}
                          onChange={(e) => {
                            const value = e.target.value;
                            (isOnlyAlphabets(value) || value === "") &&
                              dispatch(setEndLastName(value.replace(/^\s+/, "")));
                          }}
                        />
                      </Col>
                    </Form.Group>
                  )}

                  {showAnniversary && (
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className="col-form-label dealer-label p-l-15">
                          Starting Month/Day
                        </Form.Label>
                      </Col>
                      <Col xs={1} md={1} sm={1} className="p-0">
                        <input
                          name="regionCode"
                          type="text"
                          autoComplete="off"
                          aria-autocomplete="list"
                          value={startDay}
                          onChange={(e) => {
                            dispatch(setStartDay(monthDateFormatter(e.target.value)));
                          }}
                          className={`customFormControl ${isValidDate(String(startDay)) ? "borderGreen" : "borderRed"}`}
                          onBlur={() => {
                            dispatch(setStartDay(updateDayFormat(startDay)));
                          }}
                        />
                      </Col>
                    </Form.Group>
                  )}
                  {showAnniversary && (
                    <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="p-0">
                        <Form.Label className="col-form-label dealer-label p-l-15">
                          Ending Month/Day
                        </Form.Label>
                      </Col>
                      <Col xs={1} md={1} sm={1} className="p-0">
                        <input
                          name="regionCode"
                          type="text"
                          autoComplete="off"
                          aria-autocomplete="list"
                          value={endDay}
                          onChange={(e) => {
                            dispatch(setEndDay(monthDateFormatter(e.target.value)));
                          }}
                          className={`customFormControl ${isValidDate(String(endDay)) ? "borderGreen" : "borderRed"}`}
                          onBlur={() => {
                            dispatch(setEndDay(updateDayFormat(endDay)));
                          }}
                        />
                      </Col>
                    </Form.Group>
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default DriverLabelsContent;
