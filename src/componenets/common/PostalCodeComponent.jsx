import { useEffect, useRef, useState } from "react";
import { Col, Modal } from "react-bootstrap";
import { zipVal } from "../../utils/validation/ZipCodeValidation";
import DealerService from "../../services/DealerService";
import useGroupedFocusOut from "../../hooks/useGroupedFocusOut";
import LoadingIcon from "./LoadingIcon";
import DriverDOTInspectionService from "../../services/Compliance/DriverDOTInspectionService";

/**
 * PostalCodeComponent
 *
 * This React component is designed to handle ZIP, City, and State input fields and auto-fill related data
 * based on the entered postal code or city. It also includes validation and an optional modal to show
 * multiple matching postal records for user selection.
 *
 * @param {boolean} isHorizontal - If true, aligns the component horizontally. Otherwise, displays vertically.
 * @param {boolean} disabled - Disables input fields when true.
 * @param {string} postalCode - The current postal code value.
 * @param {Function} setPostalCode - Function to update the postal code state.
 * @param {string} stateCode - The current state code value.
 * @param {Function} setStateCode - Function to update the state code.
 * @param {string} city - The current city value.
 * @param {Function} setCity - Function to update the city.
 * @param {string} postalCodePK - The primary key of the postal code, used for validation.
 * @param {Function} setPostalCodePK - Function to update the postalCodePK value.
 * @param {Array} postalOptions - Array of options containing city, state, postalCode data.
 * @param {Function} setPostalValues - Function to update postal options for multiple matches.
 * @param {number} labelColNumber - The number of columns for the label in a horizontal layout.
 * @param {boolean} hideLabel - If true, hides the ZIP, City, State label.
 * @param {boolean} hideZip - If true, renders and validates City and State only.
 * @param {string} label - The label to display for the postal fields.
 * @param {number} zipColNumber - The number of columns for the ZIP input in a horizontal layout.
 * @param {number} cityColNumber - The number of columns for the City input in a horizontal layout.
 * @param {number} stateColNumber - The number of columns for the State input in a horizontal layout.
 * @param {string} zipInputWidth - The width of the ZIP input field.
 * @param {string} cityInputWidth - The width of the City input field.
 * @param {string} stateInputWidth - The width of the State input field.
 * @param {string} minLabelWidth - The minimum width of the label.
 * @param {Function} setCanadian - Function to update whether the postal code is Canadian.
 * @param {boolean} isInvalid - Optional. Forces a red border on City/State even when the lookup matched
 *   (e.g. the city/state is already used elsewhere). Defaults to false.
 * @param {Array} id - The unique id for identifying this component.
 * @param {number|string} marginTop - Optional (vertical layout only). Overrides the default top margin
 *   (m-t-20 / margin-box-10). Numbers are treated as px. Omit to keep the default spacing.
 * @param {number|string} marginBottom - Optional (vertical layout only). Overrides the default bottom
 *   margin (m-b-10). Numbers are treated as px. Omit to keep the default spacing.
 */

function PostalCodeComponent({
  isHorizontal,
  disabled,
  postalCode,
  setPostalCode,
  stateCode,
  setStateCode,
  city,
  setCity,
  postalCodePK,
  setPostalCodePK,
  postalOptions,
  setPostalValues,
  labelColNumber,
  hideLabel = false,
  hideZip = false,
  label = "City, State, ZIP",
  zipColNumber,
  cityColNumber,
  stateColNumber,
  zipInputWidth,
  cityInputWidth,
  stateInputWidth,
  minLabelWidth,
  setCanadian,
  fetchPostalOptions,
  onPostalCodeResolved,
  id,
  className,
  isOptional,
  isPostalcodeOptional = false,
  isUSOnly,
  canadian,
  autoComplete = "one-time-code",
  spellCheck = false,
  marginTop,
  marginBottom,
  isInvalid = false,
}) {
  const [isPostalData, setPostalData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postalIndex, setPostalIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(20);
  const visibleOptions = postalOptions?.slice(0, visibleCount);

  const wrapperRef = useRef(null);
  const optionListRef = useRef(null);
  const hasCustomMarginTop = marginTop !== undefined && marginTop !== null;
  const hasCustomMarginBottom = marginBottom !== undefined && marginBottom !== null;

  const onHandlePostalClick = () => {
    const selectedPostalOption = postalOptions[postalIndex];

    if (selectedPostalOption.city !== null) {
      setCity(selectedPostalOption.city);
    }
    if (selectedPostalOption.stateCode != null) {
      setStateCode(selectedPostalOption.stateCode);
    }
    if (selectedPostalOption.postalCode != null) {
      setPostalCode(selectedPostalOption.postalCode);
    }
    if (selectedPostalOption.canadian != null) {
      setCanadian(selectedPostalOption.canadian);
    }
    setPostalCodePK(selectedPostalOption.postalCodePK ?? (hideZip ? true : null));
    onPostalCodeResolved?.(selectedPostalOption);
    onHandleCloseNo();
  };

  const getCityStateCodePostalCode = () => {
    var tempPostalCode = postalCode;
    if (null != tempPostalCode && tempPostalCode.match(/^(\d{5}-\d{4})$/))
      tempPostalCode = tempPostalCode.slice(0, 5);
    if (city || (!hideZip && tempPostalCode)) {
      setLoading(true);

      let fetchApi = fetchPostalOptions
        ? fetchPostalOptions(city, stateCode, tempPostalCode)
        : hideZip
          ? DriverDOTInspectionService.checkUSCityStateCode(city, stateCode)
          : DealerService.getCityStateCodeByPostalCode(city, stateCode, tempPostalCode);

      fetchApi
        .then((response) => {
          const data = response.data;

          if (data?.length === 1) {
            setPostalValues(data);
            setCity(data[0].city);
            setStateCode(data[0].stateCode);
            tempPostalCode !== data[0].postalCode && setPostalCode(data[0].postalCode);
            setCanadian(data[0].canadian);
            setPostalCodePK(data[0].postalCodePK ?? (hideZip ? true : null));
            onPostalCodeResolved?.(data[0]);
          }
          if (data?.length > 1) {
            setPostalValues(data);

            if (city && !disabled) {
              if (postalCode) {
                if (
                  String(data[0].city).includes(city) ||
                  String(data[0].postalCode).includes(postalCode) ||
                  data[0].stateCode !== stateCode
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
          } else if (data?.length === 0) {
            setPostalCodePK(null);
          }
        })
        .catch((err) => {
          console.error("Error fetching city/state/postal code data", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // A space over a fully selected ZIP doesn't reliably reach onChange, so clear ZIP and PK here.
  const onZipKeyDown = (e) => {
    if (e.key !== " ") return;
    const { value, selectionStart, selectionEnd } = e.target;
    if (selectionStart === 0 && selectionEnd === value.length) {
      e.preventDefault();
      setPostalCode("");
      setPostalCodePK(null);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setVisibleCount((prev) => Math.min(prev + 20, postalOptions?.length));
    }
  };

  const onHandleCloseNo = () => {
    setPostalData(false);
    setVisibleCount(20);
  };
  useGroupedFocusOut(`${className ? className : "postalCodeRef"}`, () => getCityStateCodePostalCode());

  // ArrowDown / ArrowUp move the highlight through the options (wrapping), Enter selects it.
  useEffect(() => {
    if (!isPostalData || !postalOptions?.length) return;
    const onKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const total = postalOptions.length;
        const next = (postalIndex + (e.key === "ArrowUp" ? -1 : 1) + total) % total;
        if (next >= visibleCount) setVisibleCount(Math.min(next + 20, total));
        setPostalIndex(next);
      } else if (e.key === "Enter") {
        e.preventDefault();
        onHandlePostalClick();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  // Keep the highlighted option visible while tabbing through a long list.
  useEffect(() => {
    if (isPostalData) optionListRef.current?.children[postalIndex]?.scrollIntoView({ block: "nearest" });
  }, [isPostalData, postalIndex, visibleCount]);

  if (isHorizontal) {
    return (
      <>
        <div className="" ref={wrapperRef}>
          <div className="m-t-15 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <label className={""}>City</label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "300px" }}>
              <input
                id={id ? id : "zipValidId"}
                data-id="postalCodeId"
                className={`customFormControl  ${className ? className : "postalCodeRef"}  ${
                  disabled === true
                    ? ""
                    : isOptional
                      ? !postalCodePK && city
                        ? "borderRed"
                        : ""
                      : postalCodePK && !isInvalid && (!canadian || !isUSOnly)
                        ? "borderGreen"
                        : "borderRed"
                }`}
                control="input"
                type="city"
                onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                name="city"
                maxLength={30}
                value={city}
                disabled={disabled}
                autoComplete={autoComplete}
                spellCheck={spellCheck}
                aria-autocomplete="none"
                onInput={(e) => {
                  if (e.target.value !== " ") {
                    setCity(e.target.value);
                  } else {
                    setCity("");
                  }
                  setPostalCodePK(null);
                }}
                style={{
                  borderColor:
                    disabled === true || isOptional
                      ? "black"
                      : postalCodePK && !isInvalid && (!canadian || !isUSOnly)
                        ? "borderGreen"
                        : "borderRed",
                }}
              />
            </Col>
          </div>

          <div className="m-t-15 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <label className={""}>State</label>
            </Col>
            <Col xs={1} sm={1} md={1} className="p-0" style={{ width: "50px" }}>
              <input
                id={id ? id : "zipValidId"}
                data-id="postalCodeId"
                className={`customFormControl  ${className ? className : "postalCodeRef"}  ${
                  disabled === true || isOptional
                    ? "black"
                    : postalCodePK && !isInvalid && (!canadian || !isUSOnly)
                      ? "borderGreen"
                      : "borderRed"
                }
                `}
                type="statecode"
                onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                name="statecode"
                maxLength={2}
                value={stateCode?.toUpperCase()}
                disabled={disabled}
                autoComplete={autoComplete}
                spellCheck={spellCheck}
                aria-autocomplete="none"
                onInput={(e) => {
                  if (e.target.value !== " ") {
                    setStateCode(e.target.value);
                  } else {
                    setStateCode("");
                  }
                  setPostalCodePK(null);
                }}
                style={{
                  borderColor:
                    disabled === true || isOptional ? "black" : postalCodePK ? "borderGreen" : "borderRed",
                }}
              />
            </Col>
          </div>
          {!hideZip && (
            <div className="m-t-15 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0 ">
              <Col sm={3} md={3} xs={3} className="p-0">
                <label className={""}>Zip</label>
              </Col>
              <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "140px" }}>
                <input
                  id={id ? id : "zipValidId"}
                  data-id="postalCodeId"
                  className={`customFormControl ${className ? className : "postalCodeRef"}  ${
                    disabled === true || isOptional
                      ? "black"
                      : postalCodePK != null && (!canadian || !isUSOnly)
                        ? "borderGreen"
                        : "borderRed"
                  }
              `}
                  type="postalCode"
                  onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                  name="postalCode"
                  value={postalCode?.toUpperCase()}
                  maxLength={10}
                  disabled={disabled}
                  autoComplete={autoComplete}
                  spellCheck={spellCheck}
                  aria-autocomplete="none"
                  onKeyDown={onZipKeyDown}
                  onInput={(e) => {
                    if (
                      (e.target.value.charAt(0).match(/[a-zA-Z]/) && e.target.value?.length <= 7) ||
                      !e.target.value.charAt(0).match(/[a-zA-Z]/)
                    ) {
                      if (e.target.value === " ") {
                        setPostalCode("");
                      } else {
                        setPostalCode(zipVal(e.target.value));
                      }
                      setPostalCodePK(null);
                    }
                  }}
                />
              </Col>
              {loading && <LoadingIcon />}
            </div>
          )}
        </div>
        <div className="col-xs-6">
          <Modal show={isPostalData} onHide={onHandleCloseNo} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title className="font-18 h-100">City-State-Zip Options</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14">
              <div className="d-flex mb-2">
                <div className="col-8 p-1 border border-2 shadow-sm ">
                  {`${visibleOptions?.[postalIndex]?.city} - ${visibleOptions?.[postalIndex]?.stateCode} - ${visibleOptions?.[postalIndex]?.postalCode}`}
                </div>
                <div>
                  <span className="m-l-70">
                    <button className="btn btn-secondary btn-sm" onClick={onHandlePostalClick}>
                      SELECT
                    </button>
                  </span>
                </div>
              </div>
              <div
                style={{
                  maxHeight: "500px",
                  overflowY: "auto",
                  width: "63%",
                  border: "1px solid #ccc",
                  position: "absolute",
                  top: "60px",
                  backgroundColor: "white",
                }}
                ref={optionListRef}
                onScroll={handleScroll}
              >
                {visibleOptions?.map((item, index) => (
                  <div
                    key={index}
                    className={`p-2 ${postalIndex === index ? "bg-primary text-white" : ""}`}
                    style={{
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                    onClick={() => setPostalIndex(index)}
                  >
                    {item.city} - {item.stateCode} - {item.postalCode}
                  </div>
                ))}
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <div
            className={`${hasCustomMarginTop || labelColNumber ? "" : "margin-box-10"} row ${
              hasCustomMarginTop ? "" : "m-t-20"
            } ${hasCustomMarginBottom ? "" : "m-b-10"} align-items-center row m-l-0 m-r-0`}
            style={{
              ...(hasCustomMarginTop && { marginTop }),
              ...(hasCustomMarginBottom && { marginBottom }),
            }}
          >
            <Col
              sm={labelColNumber || 3}
              md={labelColNumber || 3}
              xs={labelColNumber || 3}
              className="p-0"
              style={{ minWidth: `${minLabelWidth ? minLabelWidth : 0}px` }}
            >
              {!hideLabel && (
                <label className="col-form-label dealer-label">
                  {" "}
                  {hideZip ? label.replace(", ZIP", "") : label}
                </label>
              )}
            </Col>

            <Col
              xs={cityColNumber || 4}
              md={cityColNumber || 4}
              sm={cityColNumber || 4}
              className="p-0"
              style={{ width: cityInputWidth }}
            >
              <input
                id={id ? id : "zipValidId"}
                data-id="postalCodeId"
                className={`customFormControl  ${className ? className : "postalCodeRef"}  ${
                  disabled === true
                    ? ""
                    : isOptional
                      ? isPostalcodeOptional
                        ? !city || !stateCode
                          ? "borderRed"
                          : ""
                        : !postalCodePK && (city || stateCode || postalCode)
                          ? "borderRed"
                          : ""
                      : postalCodePK && !isInvalid && (!canadian || !isUSOnly)
                        ? "borderGreen"
                        : "borderRed"
                }`}
                control="input"
                type="city"
                onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                name="city"
                maxLength={30}
                value={city}
                disabled={disabled}
                autoComplete={autoComplete}
                spellCheck={spellCheck}
                aria-autocomplete="none"
                onInput={(e) => {
                  if (e.target.value !== " ") {
                    setCity(e.target.value);
                  } else {
                    setCity("");
                  }
                  setPostalCodePK(null);
                }}
              />
            </Col>
            <Col
              xs={stateColNumber || 1}
              sm={stateColNumber || 1}
              md={stateColNumber || 1}
              className=""
              style={{ width: stateInputWidth }}
            >
              <input
                id={id ? id : "zipValidId"}
                data-id="postalCodeId"
                className={`customFormControl  ${className ? className : "postalCodeRef"}  ${
                  disabled === true
                    ? ""
                    : isOptional
                      ? isPostalcodeOptional
                        ? !stateCode || !city
                          ? "borderRed"
                          : ""
                        : !postalCodePK && (stateCode || postalCode || city)
                          ? "borderRed"
                          : ""
                      : postalCodePK && !isInvalid && (!canadian || !isUSOnly)
                        ? "borderGreen"
                        : "borderRed"
                }`}
                type="statecode"
                onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                name="statecode"
                maxLength={2}
                value={stateCode?.toUpperCase()}
                disabled={disabled}
                autoComplete={autoComplete}
                spellCheck={spellCheck}
                aria-autocomplete="none"
                onInput={(e) => {
                  if (e.target.value !== " ") {
                    setStateCode(e.target.value);
                  } else {
                    setStateCode("");
                  }
                  setPostalCodePK(null);
                }}
              />
            </Col>
            {!hideZip && (
              <Col
                xs={zipColNumber || 2}
                sm={zipColNumber || 2}
                md={zipColNumber || 2}
                className="ps-0 "
                style={{ width: zipInputWidth }}
              >
                <input
                  id={id ? id : "zipValidId"}
                  data-id="postalCodeId"
                  className={`customFormControl  ${className ? className : "postalCodeRef"} ${
                    disabled === true || isPostalcodeOptional
                      ? ""
                      : isOptional
                        ? !postalCodePK && (postalCode || city || stateCode)
                          ? "borderRed"
                          : ""
                        : postalCodePK && (!canadian || !isUSOnly)
                          ? "borderGreen"
                          : "borderRed"
                  }`}
                  type="postalCode"
                  onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                  name="postalCode"
                  value={postalCode?.toUpperCase()}
                  maxLength={10}
                  disabled={disabled}
                  autoComplete={autoComplete}
                  spellCheck={spellCheck}
                  aria-autocomplete="none"
                  onKeyDown={onZipKeyDown}
                  onChange={(e) => {
                    if (
                      (e.target.value.charAt(0).match(/[a-zA-Z]/) && e.target.value?.length <= 7) ||
                      !e.target.value.charAt(0).match(/[a-zA-Z]/)
                    ) {
                      if (e.target.value === " ") {
                        setPostalCode("");
                      } else {
                        setPostalCode(zipVal(e.target.value));
                      }
                      setPostalCodePK(null);
                    }
                  }}
                  onBlur={(e) => {}}
                  style={{
                    borderColor: disabled === true ? "black" : "",
                  }}
                />
              </Col>
            )}
            {loading && <LoadingIcon />}
          </div>
        </div>
        <div className="col-xs-6">
          <Modal show={isPostalData} onHide={onHandleCloseNo} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title className="font-18 h-100">{`${hideZip ? "City-State" : "City-State-Zip"} Options`}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14">
              <div className="d-flex mb-2">
                <div className="col-8 p-1 border border-2 shadow-sm">
                  {`${visibleOptions?.[postalIndex]?.city} - ${visibleOptions?.[postalIndex]?.stateCode}${hideZip ? "" : " - " + visibleOptions?.[postalIndex]?.postalCode}`}
                </div>
                <div>
                  <span className="m-l-70">
                    <button className="btn btn-secondary btn-sm" onClick={onHandlePostalClick}>
                      SELECT
                    </button>
                  </span>
                </div>
              </div>
              <div
                style={{
                  maxHeight: "500px",
                  overflowY: "auto",
                  width: "63%",
                  border: "1px solid #ccc",
                  position: "absolute",
                  top: "60px",
                  backgroundColor: "white",
                }}
                ref={optionListRef}
                onScroll={handleScroll}
              >
                {visibleOptions?.map((item, index) => (
                  <div
                    key={index}
                    className={`p-2 ${postalIndex === index ? "bg-primary text-white" : ""}`}
                    style={{
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                    onClick={() => setPostalIndex(index)}
                  >
                    {item.city} - {item.stateCode}
                    {hideZip ? "" : " - " + item.postalCode}
                  </div>
                ))}
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}

export default PostalCodeComponent;
