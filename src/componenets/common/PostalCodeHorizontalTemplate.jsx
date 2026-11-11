import { Formik, Form } from "formik";
import React, { useState, useEffect } from "react";
import { Col, Modal } from "react-bootstrap";
import { t } from "i18next";
import DealerService from "../../services/DealerService";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { zipVal } from "../../utils/validation/ZipCodeValidation";

function PostalCodeHorizontalTemplate({
  city,
  setCity,
  statecode,
  setStateCode,
  postalcode,
  setPostalCode,
  canadian,
  setCanadian,
  postalOptions,
  setPostalValues,
  setReduxCity,
  setReduxStatecode,
  setReduxPostcode,
  setzipPostLenght,
  setcityLength,
  cityLength,
  formik,
  Disabled,
  id,
  zipIdChcek,
  QuarterScreen,
}) {
  const dispatch = useDispatch();

  const [isPostalData, setPostalData] = useState(false);
  const [postalIndex, setPostalIndex] = useState(0);

  const onHandleCloseNo = () => {
    setPostalData(false);
    setcityLength(0);
    setzipPostLenght(0);
  };

  const getCityStateCodePostalCode = (city, statecode, postalcode) => {
    if (null != postalcode && postalcode.match(/^(\d{5}-\d{4})$/)) postalcode = postalcode.slice(0, 5);

    DealerService.getCityStateCodeByPostalCode(city, statecode, postalcode).then((response) => {
      const data = response.data;

      if (data.length === 1) {
        setPostalValues(data);
        setPostalData(false);
        setCity(data[0].city);
        setStateCode(data[0].stateCode);
        setPostalCode(data[0].postalCode);
        setCanadian(data[0].canadian);
        if (null === postalcode) setPostalCode(data[0].postalCode);
        dispatch(setReduxCity(data[0].city));
        dispatch(setReduxStatecode(data[0].stateCode));
        if (null === postalcode) dispatch(setReduxPostcode(data[0].postalCode));
        setzipPostLenght(data.length);
        setcityLength(data.length);
      }
      if (data.length > 1) {
        setPostalValues(data);

        if (city) {
          if (postalcode) {
            if (
              data[0].city !== city ||
              data[0].postalCode !== postalcode ||
              data[0].stateCode !== statecode
            ) {
              setPostalData(true);
              setPostalIndex(0);
            } else {
              setPostalData(false);
            }
          } else {
            setPostalData(true);
            setPostalIndex(0);
          }
        } else {
          setPostalData(true);
          setPostalIndex(0);
        }

        setzipPostLenght(data.length);
        setcityLength(data.length);
      } else if (data.length === 0) {
        setzipPostLenght(data.length);
        setcityLength(data.length);
      }
    });
  };

  useEffect(() => {
    if (city !== "" || statecode !== "" || postalcode !== "") {
      getCityStateCodePostalCode(city, statecode, postalcode);
    }
  }, [id, Disabled]);

  const onHandleCityStatePostalCode = () => {
    if (postalcode.length > 0 && city.length < 1 && statecode.length < 1) {
      getCityStateCodePostalCode(null, null, postalcode);
    }
    if (postalcode.length > 0 && city.length > 0 && statecode.length < 1) {
      getCityStateCodePostalCode(city, null, postalcode);
    }
    if (postalcode.length > 0 && city.length < 1 && statecode.length > 0) {
      getCityStateCodePostalCode(null, statecode, postalcode);
    }
    if (postalcode.length > 0 && city.length > 0 && statecode.length > 0) {
      getCityStateCodePostalCode(city, statecode, postalcode);
    }
    if (postalcode.length < 1 && city.length > 0 && statecode.length < 1) {
      getCityStateCodePostalCode(city, null, null);
    }
    if (postalcode.length < 1 && city.length > 0 && statecode.length > 0) {
      getCityStateCodePostalCode(city, statecode, null);
    }
    if (postalcode.length > 0 && city.length > 0 && statecode.length < 1) {
      getCityStateCodePostalCode(city, null, postalcode);
    }
  };

  const onHandlePostalClick = () => {
    setPostalData(false);
    if (postalOptions[postalIndex].city !== null) {
      dispatch(setReduxCity(postalOptions[postalIndex].city));
      setCity(postalOptions[postalIndex].city);
    }
    if (postalOptions[postalIndex].stateCode != null) {
      dispatch(setReduxStatecode(postalOptions[postalIndex].stateCode));
      setStateCode(postalOptions[postalIndex].stateCode);
    }
    if (postalOptions[postalIndex].postalCode != null) {
      dispatch(setReduxPostcode(postalOptions[postalIndex].postalCode));
      setPostalCode(postalOptions[postalIndex].postalCode);
    }
    if (postalOptions[postalIndex].canadian != null) {
      setCanadian(postalOptions[postalIndex].canadian);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "f2") {
        if (
          (city === "" || statecode === "") &&
          (postalcode.match(/^((\d{5}-\d{4})|(\d{5}))$/) ||
            postalcode.match(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/))
        ) {
          if (postalOptions.length === 1) {
            if (postalOptions[0].city !== "") {
              setCity(postalOptions[0].city);
            }
            if (postalOptions[0].stateCode !== "") {
              setStateCode(postalOptions[0].stateCode);
            }
            if (postalOptions[0].postalCode !== "") {
              setPostalCode(postalOptions[0].postalCode);
            }
            if (postalOptions[0].city !== "") {
              dispatch(setReduxCity(postalOptions[0].city));
            }
            if (postalOptions[0].stateCode !== "") {
              dispatch(setReduxStatecode(postalOptions[0].stateCode));
            }
            if (postalOptions[0].postalCode !== "") {
              dispatch(setReduxPostcode(postalOptions[0].postalCode));
            }
          } else if (postalOptions.length > 1) {
            setPostalData(true);
          }
        } else {
          setPostalData(false);
        }
      }
    });
  }, [city, postalcode, statecode]);
  useEffect(() => {
    if (zipIdChcek === undefined) {
      onHandleCityStatePostalCode();
    } else {
      return;
    }
  }, [zipIdChcek]);

  return (
    <>
      <div>
        <div className="margin-box-10 row m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <label className={QuarterScreen.colFormLabel}>Zip</label>
          </Col>
          <Col xs={2} sm={2} md={2} className="p-0">
            <input
              className={`customFormControl ${!Disabled && cityLength === 0 ? "zipNotValid" : ""}`}
              type="postalcode"
              name="postalcode"
              value={postalcode.toUpperCase()}
              maxLength={10}
              disabled={Disabled}
              autoComplete="off"
              aria-autocomplete="list"
              onChange={(e) => {
                formik.handleChange(e);
                setPostalCode(zipVal(e.target.value));
              }}
              onBlur={(e) => {
                formik.handleBlur(e);
              }}
              style={{
                borderColor:
                  Disabled === true
                    ? "borderBlack"
                    : formik.errors.postalcode === undefined && postalcode.length > 1
                      ? "borderGreen"
                      : formik.errors.postalcode !== undefined
                        ? "borderRed"
                        : "",
              }}
            />
          </Col>
        </div>
        <div className="margin-box-10 row m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <label className={QuarterScreen.colFormLabel}>City</label>
          </Col>

          <Col xs={3} md={3} sm={3} className="p-0">
            <input
              className={`customFormControl ${!Disabled && cityLength === 0 ? "zipNotValid" : ""}`}
              control="input"
              type="city"
              name="city"
              maxLength={30}
              value={city}
              disabled={Disabled}
              autoComplete="off"
              aria-autocomplete="list"
              onInput={(e) => {
                formik.handleChange(e);
                setCity(e.target.value);
              }}
              onBlur={(e) => {
                formik.handleBlur(e);
              }}
              onClick={() => {}}
              style={{
                borderColor:
                  Disabled === true
                    ? "borderBlack"
                    : formik.errors.city === undefined && city.length > 1
                      ? "borderGreen"
                      : formik.errors.city !== undefined
                        ? "borderRed"
                        : "",
              }}
            />
          </Col>
        </div>

        <div className="m-t-15 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <label className={QuarterScreen.colFormLabel}>State</label>
          </Col>
          <Col xs={1} sm={1} md={1} className="p-0">
            <input
              className={`customFormControl ${!Disabled && cityLength === 0 ? "zipNotValid" : ""}`}
              type="statecode"
              name="statecode"
              maxLength={2}
              value={statecode?.toUpperCase()}
              disabled={Disabled}
              autoComplete="off"
              aria-autocomplete="list"
              onInput={(e) => {
                formik.handleChange(e);
                setStateCode(e.target.value);
              }}
              onBlur={(e) => {
                formik.handleBlur(e);
              }}
              style={{
                borderColor:
                  Disabled === true
                    ? "borderBlack"
                    : formik.errors.statecode === undefined && statecode.length > 1
                      ? "borderGreen"
                      : formik.errors.statecode !== undefined
                        ? "borderRed"
                        : "",
              }}
            />
          </Col>
        </div>
      </div>
      <div className="col-xs-6">
        <Modal show={isPostalData} onHide={onHandleCloseNo} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100">City-State-Zip Options</Modal.Title>
          </Modal.Header>
          <Modal.Body className="font-14 h-100">
            <select
              onChange={(e) => {
                setPostalIndex(e.target.value);
              }}
            >
              {postalOptions.map((item, index) => {
                return (
                  <option value={index} key={index}>
                    {item.city} - {item.statecode} - {item.postalcode}
                  </option>
                );
              })}
            </select>
            <span className="m-l-70 ">
              <button
                className="btn btn-secondary btn-sm font-12 btn-small-width close-button"
                onClick={onHandlePostalClick}
              >
                SELECT
              </button>
            </span>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default PostalCodeHorizontalTemplate;
