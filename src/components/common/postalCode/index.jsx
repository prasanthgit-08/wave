import { useCallback, useEffect, useRef, useState } from "react";
import { Col, Modal } from "react-bootstrap";
import Loading from "../loading";
import DealerServices from "../../../service/dealer/dealer.service";
import useGroupedFocusOut from "../../../hooks/useGroupedFocusOut";
import { zipVal } from "../../../utils/validation/ZipCodeValidation";

/**
 * PostalCode
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
 * @param {number} zipColNumber - The number of columns for the ZIP input in a horizontal layout.
 * @param {number} cityColNumber - The number of columns for the City input in a horizontal layout.
 * @param {number} stateColNumber - The number of columns for the State input in a horizontal layout.
 * @param {string} zipInputWidth - The width of the ZIP input field.
 * @param {string} cityInputWidth - The width of the City input field.
 * @param {string} stateInputWidth - The width of the State input field.
 * @param {string} minLabelWidth - The minimum width of the label.
 * @param {Function} setCanadian - Function to update whether the postal code is Canadian.
 * @param {Array} id - The unique id for identifying this component.
 */

function PostalCode({
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
  zipColNumber,
  cityColNumber,
  stateColNumber,
  zipInputWidth,
  cityInputWidth,
  stateInputWidth,
  minLabelWidth,
  setCanadian,
  id,
  className,
  isOptional,
  isPostalcodeOptional = false,
}) {
  const [isPostalData, setPostalData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postalIndex, setPostalIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(20);
  const visibleOptions = postalOptions?.slice(0, visibleCount);

  const wrapperRef = useRef(null);
  const optionListRef = useRef(null);

  const onHandlePostalClick = () => {
    if (postalOptions[postalIndex].city !== null) {
      setCity(postalOptions[postalIndex].city);
    }
    if (postalOptions[postalIndex].stateCode != null) {
      setStateCode(postalOptions[postalIndex].stateCode);
    }
    if (postalOptions[postalIndex].postalCode != null) {
      setPostalCode(postalOptions[postalIndex].postalCode);
    }
    if (postalOptions[postalIndex].canadian != null) {
      setCanadian(postalOptions[postalIndex].canadian);
    }
    if (postalOptions[postalIndex].postalCodePK) {
      setPostalCodePK(postalOptions[postalIndex].postalCodePK);
    }
    onHandleCloseNo();
  };

  const getCityStateCodePostalCode = useCallback(() => {
    if (postalCodePK) return;

    var tempPostalCode = postalCode;
    if (null != tempPostalCode && tempPostalCode.match(/^(\d{5}-\d{4})$/))
      tempPostalCode = tempPostalCode.slice(0, 5);
    if (city || tempPostalCode) {
      setLoading(true);
      DealerServices.getCityStateCode({ city, stateCode, postalCode: tempPostalCode })
        .then((response) => {
          const data = response.data;

          if (data?.length === 1) {
            setPostalValues(data);
            setCity(data[0].city);
            setStateCode(data[0].stateCode);
            tempPostalCode !== data[0].postalCode && setPostalCode(data[0].postalCode);
            setCanadian(data[0].canadian);
            setPostalCodePK(data[0].postalCodePK);
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
  }, [city, stateCode, postalCode, disabled]);

  // A space over a fully selected ZIP/State doesn't reliably reach onChange, so clear the field and PK here.
  const clearOnSpaceKeyDown = (setValue) => (e) => {
    if (e.key !== " ") return;
    const { value, selectionStart, selectionEnd } = e.target;
    if (selectionStart === 0 && selectionEnd === value.length) {
      e.preventDefault();
      setValue("");
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

  // Keep the highlighted option visible while moving through a long list.
  useEffect(() => {
    if (isPostalData) optionListRef.current?.children[postalIndex]?.scrollIntoView({ block: "nearest" });
  }, [isPostalData, postalIndex, visibleCount]);

  if (isHorizontal) {
    return (
      <>
        <div className="" ref={wrapperRef}>
          <div className="m-t-15 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
            <Col xs={3} className="p-0">
              <label className={""}>City</label>
            </Col>

            <Col xs={3} className="p-0" style={{ width: "300px" }}>
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
                      : postalCodePK
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
                autoComplete="new-password"
                aria-autocomplete="none"
                onChange={(e) => {
                  if (e.target.value !== " ") {
                    setCity(e.target.value);
                  } else {
                    setCity("");
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

          <div className="m-t-15 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
            <Col xs={3} className="p-0">
              <label className={""}>State</label>
            </Col>
            <Col xs={1} className="p-0" style={{ width: "50px" }}>
              <input
                id={id ? id : "zipValidId"}
                data-id="postalCodeId"
                className={`customFormControl  ${className ? className : "postalCodeRef"}  ${
                  disabled === true || isOptional ? "black" : postalCodePK ? "borderGreen" : "borderRed"
                }
                `}
                type="statecode"
                onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                name="statecode"
                maxLength={2}
                value={stateCode?.toUpperCase()}
                disabled={disabled}
                autoComplete="new-password"
                aria-autocomplete="none"
                onKeyDown={clearOnSpaceKeyDown(setStateCode)}
                onChange={(e) => {
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
          <div className="m-t-15 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0 ">
            <Col xs={3} className="p-0">
              <label className={""}>Zip</label>
            </Col>
            <Col xs={2} className="p-0" style={{ width: "140px" }}>
              <input
                id={id ? id : "zipValidId"}
                data-id="postalCodeId"
                className={`customFormControl ${className ? className : "postalCodeRef"}  ${
                  disabled === true || isOptional
                    ? "black"
                    : postalCodePK != null
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
                autoComplete="new-password"
                aria-autocomplete="none"
                onKeyDown={clearOnSpaceKeyDown(setPostalCode)}
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
              />
            </Col>
            {loading && <Loading />}
          </div>
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
            className={`${
              labelColNumber ? "" : "margin-box-10"
            } row m-t-20 m-b-10 align-items-center row m-l-0 m-r-0`}
          >
            <Col
              xs={labelColNumber || 3}
              className="p-0"
              style={{ minWidth: `${minLabelWidth ? minLabelWidth : 0}px` }}
            >
              {!hideLabel && <label className="col-form-label dealer-label"> City, State, ZIP</label>}
            </Col>

            <Col xs={cityColNumber || 4} className="p-0" style={{ width: cityInputWidth }}>
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
                      : postalCodePK
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
                autoComplete="new-password"
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
            <Col xs={stateColNumber || 1} className="" style={{ width: stateInputWidth }}>
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
                      : postalCodePK
                        ? "borderGreen"
                        : "borderRed"
                }`}
                type="statecode"
                onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                name="statecode"
                maxLength={2}
                value={stateCode?.toUpperCase()}
                disabled={disabled}
                autoComplete="new-password"
                aria-autocomplete="none"
                onKeyDown={clearOnSpaceKeyDown(setStateCode)}
                onChange={(e) => {
                  if (e.target.value !== " ") {
                    setStateCode(e.target.value);
                  } else {
                    setStateCode("");
                  }
                  setPostalCodePK(null);
                }}
              />
            </Col>
            <Col xs={zipColNumber || 2} className="ps-0 " style={{ width: zipInputWidth }}>
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
                      : postalCodePK
                        ? "borderGreen"
                        : "borderRed"
                }`}
                type="postalCode"
                onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
                name="postalCode"
                value={postalCode?.toUpperCase()}
                maxLength={10}
                disabled={disabled}
                autoComplete="new-password"
                aria-autocomplete="none"
                onKeyDown={clearOnSpaceKeyDown(setPostalCode)}
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
            {loading && <Loading />}
          </div>
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
  }
}

export default PostalCode;
