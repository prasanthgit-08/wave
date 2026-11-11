/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useWindowSizeForBreakpoint from "../../hooks/useWindowSizeForBreakpoint";
/**
 * Paylood Object for Advanced Sort API call should match the bellow schema
 * ------------------------------------------------------------------------
 * {
 *   firstField: firstFieldPayload,
 *   secondField: secondFieldPayload,
 *   thirdField: thirdFieldPayload,
 *   fourthField: fourthFieldPayload,
 *   fifthField: fifthFieldPayload,
 * }
 *
 **/
const AdvancedSortComponent = ({
  /**
   * Select Required Sort
   * ********************
   *    - pass the required property for getting corresponding number of sort fields
   */
  twoFieldSort,
  threeFieldSort,
  fourFieldSort,
  fiveFieldSort,
  // -----------
  /**
   * Pass required labels for each sort field
   */
  firstFieldName,
  secondFieldName,
  thirdFieldName,
  fourthFieldName,
  fifthFieldName,
  /**
   * Payload values: set in Payload Object for API call
   */
  firstFieldPayload,
  secondFieldPayload,
  thirdFieldPayload,
  fourthFieldPayload,
  fifthFieldPayload,
  // ----------------
  /**
   * Sorting Order for API call
   * **************************
   *    - pass advancedSortingOrder global state & its setState function
   *    - initialize its value as null & reset to null when hiding advanced sorting
   */
  advancedSortingOrder,
  setAdvancedSortingOrder,
  /**
   * Sorting Combination for UI
   * **************************
   *    - pass advancedSortingCombination global state & its setState function
   *    - initialize its value as null & reset to null when hiding advanced sorting
   */
  advancedSortingCombination,
  setAdvancedSortingCombination,
  // --------------------------
  /**
   * Optional Custom function to pass different Payload Object to Backend (if required)
   */
  updateAdvancedSortPayload,
  zoomOut, // for reducing size of advance sort fields when shrinking
  // ----------------------
  label1st,
  label2nd,
  label3rd,
  label4th,
  label5th,
  wrapperClass,
  customClass,
}) => {
  // Local states for Sorting Order
  const [firstField, setFirstField] = useState(null);
  const [secondField, setSecondField] = useState(null);
  const [thirdField, setThirdField] = useState(null);
  const [fourthField, setFourthField] = useState(null);
  const [fifthField, setFifthField] = useState(null);

  // Local states for Sorting Combinations
  const [firstFieldOptions1, setFirstFieldOptions1] = useState(false);
  const [firstFieldOptions2, setFirstFieldOptions2] = useState(false);
  const [firstFieldOptions3, setFirstFieldOptions3] = useState(false);
  const [firstFieldOptions4, setFirstFieldOptions4] = useState(false);
  const [firstFieldOptions5, setFirstFieldOptions5] = useState(false);
  const [secondFieldOptions1, setSecondFieldOptions1] = useState(false);
  const [secondFieldOptions2, setSecondFieldOptions2] = useState(false);
  const [secondFieldOptions3, setSecondFieldOptions3] = useState(false);
  const [secondFieldOptions4, setSecondFieldOptions4] = useState(false);
  const [secondFieldOptions5, setSecondFieldOptions5] = useState(false);
  const [thirdFieldOptions1, setThirdFieldOptions1] = useState(false);
  const [thirdFieldOptions2, setThirdFieldOptions2] = useState(false);
  const [thirdFieldOptions3, setThirdFieldOptions3] = useState(false);
  const [thirdFieldOptions4, setThirdFieldOptions4] = useState(false);
  const [thirdFieldOptions5, setThirdFieldOptions5] = useState(false);
  const [fourthFieldOptions1, setFourthFieldOptions1] = useState(false);
  const [fourthFieldOptions2, setFourthFieldOptions2] = useState(false);
  const [fourthFieldOptions3, setFourthFieldOptions3] = useState(false);
  const [fourthFieldOptions4, setFourthFieldOptions4] = useState(false);
  const [fourthFieldOptions5, setFourthFieldOptions5] = useState(false);
  const [fifthFieldOptions1, setFifthFieldOptions1] = useState(false);
  const [fifthFieldOptions2, setFifthFieldOptions2] = useState(false);
  const [fifthFieldOptions3, setFifthFieldOptions3] = useState(false);
  const [fifthFieldOptions4, setFifthFieldOptions4] = useState(false);
  const [fifthFieldOptions5, setFifthFieldOptions5] = useState(false);

  // Breakpoint at which Five field advanced sort starts wrapping
  const breakPointExtraLargeScreen = 1710;
  const isBelowBreakpoint = useWindowSizeForBreakpoint(breakPointExtraLargeScreen);

  const dispatch = useDispatch();

  /**
   * Update Sorting Order for API call
   */
  useEffect(() => {
    if (setAdvancedSortingOrder) {
      dispatch(
        setAdvancedSortingOrder({
          firstField: firstField,
          secondField: secondField,
          thirdField: thirdField,
          fourthField: fourthField,
          fifthField: fifthField,
        })
      );
    }
  }, [firstField, secondField, thirdField, fourthField, fifthField]);

  /**
   * Set previous Sorting Order when coming back to main page
   * OR when the component rerenders (after being hidden)
   */
  useEffect(() => {
    if (advancedSortingOrder !== null) {
      setFirstField(firstField !== null ? firstField : advancedSortingOrder?.firstField);
      setSecondField(secondField !== null ? secondField : advancedSortingOrder?.secondField);
      setThirdField(thirdField !== null ? thirdField : advancedSortingOrder?.thirdField);
      setFourthField(fourthField !== null ? fourthField : advancedSortingOrder?.fourthField);
      setFifthField(fifthField !== null ? fifthField : advancedSortingOrder?.fifthField);
    }
  }, []);

  /**
   * Set previous Sorting Combination when coming back to main page
   * OR when the component rerenders (after being hidden)
   */
  useEffect(() => {
    if (advancedSortingCombination !== null) {
      setFirstFieldOptions1(advancedSortingCombination?.firstFieldOptions1);
      setFirstFieldOptions2(advancedSortingCombination?.firstFieldOptions2);
      setFirstFieldOptions3(advancedSortingCombination?.firstFieldOptions3);
      setFirstFieldOptions4(advancedSortingCombination?.firstFieldOptions4);
      setFirstFieldOptions5(advancedSortingCombination?.firstFieldOptions5);
      setSecondFieldOptions1(advancedSortingCombination?.secondFieldOptions1);
      setSecondFieldOptions2(advancedSortingCombination?.secondFieldOptions2);
      setSecondFieldOptions3(advancedSortingCombination?.secondFieldOptions3);
      setSecondFieldOptions4(advancedSortingCombination?.secondFieldOptions4);
      setSecondFieldOptions5(advancedSortingCombination?.secondFieldOptions5);
      setThirdFieldOptions1(advancedSortingCombination?.thirdFieldOptions1);
      setThirdFieldOptions2(advancedSortingCombination?.thirdFieldOptions2);
      setThirdFieldOptions3(advancedSortingCombination?.thirdFieldOptions3);
      setThirdFieldOptions4(advancedSortingCombination?.thirdFieldOptions4);
      setThirdFieldOptions5(advancedSortingCombination?.thirdFieldOptions5);
      setFourthFieldOptions1(advancedSortingCombination?.fourthFieldOptions1);
      setFourthFieldOptions2(advancedSortingCombination?.fourthFieldOptions2);
      setFourthFieldOptions3(advancedSortingCombination?.fourthFieldOptions3);
      setFourthFieldOptions4(advancedSortingCombination?.fourthFieldOptions4);
      setFourthFieldOptions5(advancedSortingCombination?.fourthFieldOptions5);
      setFifthFieldOptions1(advancedSortingCombination?.fifthFieldOptions1);
      setFifthFieldOptions2(advancedSortingCombination?.fifthFieldOptions2);
      setFifthFieldOptions3(advancedSortingCombination?.fifthFieldOptions3);
      setFifthFieldOptions4(advancedSortingCombination?.fifthFieldOptions4);
      setFifthFieldOptions5(advancedSortingCombination?.fifthFieldOptions5);
    }
  }, []);

  /**
   * Clear local states when Advanced Sort is cleared
   */
  useEffect(() => {
    if (advancedSortingCombination === null) {
      setFirstField(null);
      setSecondField(null);
      setThirdField(null);
      setFourthField(null);
      setFifthField(null);
    }
  }, [advancedSortingCombination]);

  /**
   * Update Sorting Combination as local states is updated
   */
  useEffect(() => {
    if (setAdvancedSortingCombination) {
      dispatch(
        setAdvancedSortingCombination({
          firstFieldOptions1,
          firstFieldOptions2,
          firstFieldOptions3,
          firstFieldOptions4,
          firstFieldOptions5,
          secondFieldOptions1,
          secondFieldOptions2,
          secondFieldOptions3,
          secondFieldOptions4,
          secondFieldOptions5,
          thirdFieldOptions1,
          thirdFieldOptions2,
          thirdFieldOptions3,
          thirdFieldOptions5,
          thirdFieldOptions4,
          fourthFieldOptions1,
          fourthFieldOptions2,
          fourthFieldOptions3,
          fourthFieldOptions4,
          fourthFieldOptions5,
          fifthFieldOptions1,
          fifthFieldOptions2,
          fifthFieldOptions3,
          fifthFieldOptions4,
          fifthFieldOptions5,
        })
      );
    }
  }, [
    firstFieldOptions1,
    firstFieldOptions2,
    firstFieldOptions3,
    firstFieldOptions4,
    firstFieldOptions5,
    secondFieldOptions1,
    secondFieldOptions2,
    secondFieldOptions3,
    secondFieldOptions4,
    secondFieldOptions5,
    thirdFieldOptions1,
    thirdFieldOptions2,
    thirdFieldOptions3,
    thirdFieldOptions4,
    thirdFieldOptions5,
    fourthFieldOptions1,
    fourthFieldOptions2,
    fourthFieldOptions3,
    fourthFieldOptions4,
    fourthFieldOptions5,
    fifthFieldOptions1,
    fifthFieldOptions2,
    fifthFieldOptions3,
    fifthFieldOptions4,
    fifthFieldOptions5,
  ]);

  /**
   * Update Custom Paylod Object for Advanced Sort API call
   */
  useEffect(() => {
    if (updateAdvancedSortPayload) {
      if (advancedSortingOrder !== null) {
        updateAdvancedSortPayload();
      }
    }
  }, [advancedSortingOrder]);

  return (
    <div className={`${wrapperClass || "col-md-12"}`}>
      <form className={`advancedSearch ${zoomOut && isBelowBreakpoint && "zoomOut"} ${customClass || ""}`}>
        <br></br>
        <div className="form-group">
          <label>{firstFieldName || "First Field"}</label>
        </div>
        {/* First Field */}
        <div className="form-group">
          {/* First Field 1st */}
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              checked={firstFieldOptions1 === false ? false : true}
              name="firstFieldOptions1"
              id="firstFieldOptions1"
              value={firstFieldOptions1}
              readOnly
              onClick={(e) => {
                firstFieldOptions1 === false
                  ? setFirstFieldOptions1(true) || setFirstField(firstFieldPayload)
                  : setFirstFieldOptions1(false) || setFirstField(null);
              }}
              disabled={
                firstFieldOptions2 ||
                firstFieldOptions3 ||
                firstFieldOptions4 ||
                firstFieldOptions5 ||
                secondFieldOptions1 ||
                thirdFieldOptions1 ||
                fourthFieldOptions1 ||
                fifthFieldOptions1
              }
              style={
                secondFieldOptions2 ||
                secondFieldOptions3 ||
                secondFieldOptions4 ||
                secondFieldOptions5 ||
                thirdFieldOptions2 ||
                thirdFieldOptions3 ||
                thirdFieldOptions4 ||
                thirdFieldOptions5 ||
                fourthFieldOptions2 ||
                fourthFieldOptions3 ||
                fourthFieldOptions4 ||
                fourthFieldOptions5 ||
                fifthFieldOptions2 ||
                fifthFieldOptions3 ||
                fifthFieldOptions4 ||
                fifthFieldOptions5 === true
                  ? { pointerEvents: "none" }
                  : {}
              }
            />
            <label className="form-check-label">{label1st || "1st"}</label>
          </div>

          {/* First Field 2nd */}
          {(twoFieldSort || threeFieldSort || fourFieldSort || fiveFieldSort) &&
            (firstFieldOptions1 ||
              secondFieldOptions1 ||
              thirdFieldOptions1 ||
              fourthFieldOptions1 ||
              fifthFieldOptions1) && (
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={firstFieldOptions2 === false ? false : true}
                  name="firstFieldOptions2"
                  id="firstFieldOptions2"
                  value={firstFieldOptions2}
                  readOnly
                  onClick={(e) => {
                    firstFieldOptions2 === false
                      ? setFirstFieldOptions2(true) || setSecondField(firstFieldPayload)
                      : setFirstFieldOptions2(false) || setSecondField(null);
                  }}
                  disabled={
                    firstFieldOptions1 ||
                    firstFieldOptions3 ||
                    firstFieldOptions4 ||
                    firstFieldOptions5 ||
                    secondFieldOptions2 ||
                    thirdFieldOptions2 ||
                    fourthFieldOptions2 ||
                    fifthFieldOptions2
                  }
                  style={
                    secondFieldOptions3 ||
                    secondFieldOptions4 ||
                    secondFieldOptions5 ||
                    thirdFieldOptions3 ||
                    thirdFieldOptions4 ||
                    thirdFieldOptions5 ||
                    fourthFieldOptions3 ||
                    fourthFieldOptions4 ||
                    fourthFieldOptions5 ||
                    fifthFieldOptions3 ||
                    fifthFieldOptions4 ||
                    fifthFieldOptions5 === true
                      ? { pointerEvents: "none" }
                      : {}
                  }
                />
                <label className="form-check-label">{label2nd || "2nd"}</label>
              </div>
            )}

          {/* First Field 3rd */}
          {(threeFieldSort || fourFieldSort || fiveFieldSort) &&
            (firstFieldOptions2 ||
              secondFieldOptions2 ||
              thirdFieldOptions2 ||
              fourthFieldOptions2 ||
              fifthFieldOptions2) && (
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={firstFieldOptions3 === false ? false : true}
                  name="firstFieldOptions3"
                  id="firstFieldOptions3"
                  value={firstFieldOptions3}
                  readOnly
                  onClick={(e) => {
                    firstFieldOptions3 === false
                      ? setFirstFieldOptions3(true) || setThirdField(firstFieldPayload)
                      : setFirstFieldOptions3(false) || setThirdField(null);
                  }}
                  disabled={
                    firstFieldOptions1 ||
                    firstFieldOptions2 ||
                    firstFieldOptions4 ||
                    firstFieldOptions5 ||
                    secondFieldOptions3 ||
                    thirdFieldOptions3 ||
                    fourthFieldOptions3 ||
                    fifthFieldOptions3
                  }
                  style={
                    secondFieldOptions4 ||
                    secondFieldOptions5 ||
                    thirdFieldOptions4 ||
                    thirdFieldOptions5 ||
                    fourthFieldOptions4 ||
                    fourthFieldOptions5 ||
                    fifthFieldOptions4 ||
                    fifthFieldOptions5 === true
                      ? { pointerEvents: "none" }
                      : {}
                  }
                />
                <label className="form-check-label">{label3rd || "3rd"}</label>
              </div>
            )}

          {/* First Field 4th */}
          {(fourFieldSort || fiveFieldSort) &&
            (firstFieldOptions3 ||
              secondFieldOptions3 ||
              thirdFieldOptions3 ||
              fourthFieldOptions3 ||
              fifthFieldOptions3) && (
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={firstFieldOptions4 === false ? false : true}
                  name="firstFieldOptions4"
                  id="firstFieldOptions4"
                  value={firstFieldOptions4}
                  readOnly
                  onClick={(e) => {
                    firstFieldOptions4 === false
                      ? setFirstFieldOptions4(true) || setFourthField(firstFieldPayload)
                      : setFirstFieldOptions4(false) || setFourthField(null);
                  }}
                  disabled={
                    firstFieldOptions1 ||
                    firstFieldOptions2 ||
                    firstFieldOptions3 ||
                    firstFieldOptions5 ||
                    secondFieldOptions4 ||
                    thirdFieldOptions4 ||
                    fourthFieldOptions4 ||
                    fifthFieldOptions4
                  }
                  style={
                    secondFieldOptions5 ||
                    thirdFieldOptions5 ||
                    fourthFieldOptions5 ||
                    fifthFieldOptions5 === true
                      ? { pointerEvents: "none" }
                      : {}
                  }
                />
                <label className="form-check-label">{label4th || "4th"}</label>
              </div>
            )}

          {/* First Field 5th */}
          {fiveFieldSort &&
            (firstFieldOptions4 ||
              secondFieldOptions4 ||
              thirdFieldOptions4 ||
              fourthFieldOptions4 ||
              fifthFieldOptions4) && (
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={firstFieldOptions5 === false ? false : true}
                  name="firstFieldOptions5"
                  id="firstFieldOptions5"
                  value={firstFieldOptions5}
                  readOnly
                  onClick={(e) => {
                    firstFieldOptions5 === false
                      ? setFirstFieldOptions5(true) || setFifthField(firstFieldPayload)
                      : setFirstFieldOptions5(false) || setFifthField(null);
                  }}
                  disabled={
                    firstFieldOptions1 ||
                    firstFieldOptions2 ||
                    firstFieldOptions3 ||
                    firstFieldOptions4 ||
                    secondFieldOptions5 ||
                    thirdFieldOptions5 ||
                    fourthFieldOptions5 ||
                    fifthFieldOptions5
                  }
                />
                <label className="form-check-label">{label5th || "5th"}</label>
              </div>
            )}
        </div>
        <br></br>

        {/* Second Field */}
        {(twoFieldSort || threeFieldSort || fourFieldSort || fiveFieldSort) && (
          <>
            <div className="form-group">
              <label>{secondFieldName || "Second Field"}</label>
            </div>
            <div className="form-group">
              {/* Second Field 1st */}
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="secondFieldOptions1"
                  id="secondFieldOptions1"
                  checked={secondFieldOptions1 === false ? false : true}
                  value={secondFieldOptions1}
                  readOnly
                  onClick={(e) => {
                    secondFieldOptions1 === false
                      ? setSecondFieldOptions1(true) || setFirstField(secondFieldPayload)
                      : setSecondFieldOptions1(false) || setFirstField(null);
                  }}
                  disabled={
                    secondFieldOptions2 ||
                    secondFieldOptions3 ||
                    secondFieldOptions4 ||
                    secondFieldOptions5 ||
                    firstFieldOptions1 ||
                    thirdFieldOptions1 ||
                    fourthFieldOptions1 ||
                    fifthFieldOptions1
                  }
                  style={
                    firstFieldOptions2 ||
                    firstFieldOptions3 ||
                    firstFieldOptions4 ||
                    firstFieldOptions5 ||
                    thirdFieldOptions2 ||
                    thirdFieldOptions3 ||
                    thirdFieldOptions4 ||
                    thirdFieldOptions5 ||
                    fourthFieldOptions2 ||
                    fourthFieldOptions3 ||
                    fourthFieldOptions4 ||
                    fourthFieldOptions5 ||
                    fifthFieldOptions2 ||
                    fifthFieldOptions3 ||
                    fifthFieldOptions4 ||
                    fifthFieldOptions5 === true
                      ? { pointerEvents: "none" }
                      : {}
                  }
                />
                <label className="form-check-label">{label1st || "1st"}</label>
              </div>

              {/* Second Field 2nd */}
              {(twoFieldSort || threeFieldSort || fourFieldSort || fiveFieldSort) &&
                (firstFieldOptions1 ||
                  secondFieldOptions1 ||
                  thirdFieldOptions1 ||
                  fourthFieldOptions1 ||
                  fifthFieldOptions1) && (
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={secondFieldOptions2}
                      name="secondFieldOptions2"
                      id="secondFieldOptions2"
                      value={secondFieldOptions2}
                      readOnly
                      onClick={(e) => {
                        secondFieldOptions2 === false
                          ? setSecondFieldOptions2(true) || setSecondField(secondFieldPayload)
                          : setSecondFieldOptions2(false) || setSecondField(null);
                      }}
                      disabled={
                        secondFieldOptions1 ||
                        secondFieldOptions3 ||
                        secondFieldOptions4 ||
                        secondFieldOptions5 ||
                        firstFieldOptions2 ||
                        thirdFieldOptions2 ||
                        fourthFieldOptions2 ||
                        fifthFieldOptions2
                      }
                      style={
                        firstFieldOptions3 ||
                        firstFieldOptions4 ||
                        firstFieldOptions5 ||
                        thirdFieldOptions3 ||
                        thirdFieldOptions4 ||
                        thirdFieldOptions5 ||
                        fourthFieldOptions3 ||
                        fourthFieldOptions4 ||
                        fourthFieldOptions5 ||
                        fifthFieldOptions3 ||
                        fifthFieldOptions4 ||
                        fifthFieldOptions5 === true
                          ? { pointerEvents: "none" }
                          : {}
                      }
                    />
                    <label className="form-check-label">{label2nd || "2nd"}</label>
                  </div>
                )}

              {/* Second Field 3rd */}
              {(threeFieldSort || fourFieldSort || fiveFieldSort) &&
                (firstFieldOptions2 ||
                  secondFieldOptions2 ||
                  thirdFieldOptions2 ||
                  fourthFieldOptions2 ||
                  fifthFieldOptions2) && (
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={secondFieldOptions3 === false ? false : true}
                      name="secondFieldOptions3"
                      id="secondFieldOptions3"
                      value={secondFieldOptions3}
                      readOnly
                      onClick={(e) => {
                        secondFieldOptions3 === false
                          ? setSecondFieldOptions3(true) || setThirdField(secondFieldPayload)
                          : setSecondFieldOptions3(false) || setThirdField(null);
                      }}
                      disabled={
                        secondFieldOptions1 ||
                        secondFieldOptions2 ||
                        secondFieldOptions4 ||
                        secondFieldOptions5 ||
                        firstFieldOptions3 ||
                        thirdFieldOptions3 ||
                        fourthFieldOptions3 ||
                        fifthFieldOptions3
                      }
                      style={
                        firstFieldOptions4 ||
                        firstFieldOptions5 ||
                        thirdFieldOptions4 ||
                        thirdFieldOptions5 ||
                        fourthFieldOptions4 ||
                        fourthFieldOptions5 ||
                        fifthFieldOptions4 ||
                        fifthFieldOptions5 === true
                          ? { pointerEvents: "none" }
                          : {}
                      }
                    />
                    <label className="form-check-label">{label3rd || "3rd"}</label>
                  </div>
                )}

              {/* Second Field 4th */}
              {(fourFieldSort || fiveFieldSort) &&
                (firstFieldOptions3 ||
                  secondFieldOptions3 ||
                  thirdFieldOptions3 ||
                  fourthFieldOptions3 ||
                  fifthFieldOptions3) && (
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={secondFieldOptions4 === false ? false : true}
                      name="secondFieldOptions4"
                      id="secondFieldOptions4"
                      value={secondFieldOptions4}
                      readOnly
                      onClick={(e) => {
                        secondFieldOptions4 === false
                          ? setSecondFieldOptions4(true) || setFourthField(secondFieldPayload)
                          : setSecondFieldOptions4(false) || setFourthField(null);
                      }}
                      disabled={
                        secondFieldOptions1 ||
                        secondFieldOptions2 ||
                        secondFieldOptions3 ||
                        secondFieldOptions5 ||
                        firstFieldOptions4 ||
                        thirdFieldOptions4 ||
                        fourthFieldOptions4 ||
                        fifthFieldOptions4
                      }
                      style={
                        firstFieldOptions5 ||
                        thirdFieldOptions5 ||
                        fourthFieldOptions5 ||
                        fifthFieldOptions5 === true
                          ? { pointerEvents: "none" }
                          : {}
                      }
                    />
                    <label className="form-check-label">{label4th || "4th"}</label>
                  </div>
                )}

              {/* Second Field 5th */}
              {fiveFieldSort &&
                (firstFieldOptions4 ||
                  secondFieldOptions4 ||
                  thirdFieldOptions4 ||
                  fourthFieldOptions4 ||
                  fifthFieldOptions4) && (
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={secondFieldOptions5 === false ? false : true}
                      name="secondFieldOptions5"
                      id="secondFieldOptions5"
                      value={secondFieldOptions5}
                      readOnly
                      onClick={(e) => {
                        secondFieldOptions5 === false
                          ? setSecondFieldOptions5(true) || setFifthField(secondFieldPayload)
                          : setSecondFieldOptions5(false) || setFifthField(null);
                      }}
                      disabled={
                        secondFieldOptions1 ||
                        secondFieldOptions2 ||
                        secondFieldOptions3 ||
                        secondFieldOptions4 ||
                        firstFieldOptions5 ||
                        thirdFieldOptions5 ||
                        fourthFieldOptions5 ||
                        fifthFieldOptions5
                      }
                    />
                    <label className="form-check-label">{label5th || "5th"}</label>
                  </div>
                )}
            </div>
          </>
        )}
        <br></br>

        {/* Third Field */}
        {(threeFieldSort || fourFieldSort || fiveFieldSort) && (
          <>
            <div className="form-group">
              <label>{thirdFieldName || "Third Field"}</label>
            </div>
            <div className="form-group">
              {/* Third Field 1st */}
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={thirdFieldOptions1 === false ? false : true}
                  name="thirdFieldOptions1"
                  id="thirdFieldOptions1"
                  value={thirdFieldOptions1}
                  readOnly
                  onClick={(e) => {
                    thirdFieldOptions1 === false
                      ? setThirdFieldOptions1(true) || setFirstField(thirdFieldPayload)
                      : setThirdFieldOptions1(false) || setFirstField(null);
                  }}
                  disabled={
                    thirdFieldOptions2 ||
                    thirdFieldOptions3 ||
                    thirdFieldOptions4 ||
                    thirdFieldOptions5 ||
                    firstFieldOptions1 ||
                    secondFieldOptions1 ||
                    fourthFieldOptions1 ||
                    fifthFieldOptions1
                  }
                  style={
                    firstFieldOptions2 ||
                    firstFieldOptions3 ||
                    firstFieldOptions4 ||
                    firstFieldOptions5 ||
                    secondFieldOptions2 ||
                    secondFieldOptions3 ||
                    secondFieldOptions4 ||
                    secondFieldOptions5 ||
                    fourthFieldOptions2 ||
                    fourthFieldOptions3 ||
                    fourthFieldOptions4 ||
                    fourthFieldOptions5 ||
                    fifthFieldOptions2 ||
                    fifthFieldOptions3 ||
                    fifthFieldOptions4 ||
                    fifthFieldOptions5 === true
                      ? { pointerEvents: "none" }
                      : {}
                  }
                />
                <label className="form-check-label">{label1st || "1st"}</label>
              </div>

              {/* Third Field 2nd */}
              {(twoFieldSort || threeFieldSort || fourFieldSort || fiveFieldSort) &&
                (firstFieldOptions1 ||
                  secondFieldOptions1 ||
                  thirdFieldOptions1 ||
                  fourthFieldOptions1 ||
                  fifthFieldOptions1) && (
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={thirdFieldOptions2 === false ? false : true}
                      name="thirdFieldOptions2"
                      id="thirdFieldOptions2"
                      value={thirdFieldOptions2}
                      readOnly
                      onClick={(e) => {
                        thirdFieldOptions2 === false
                          ? setThirdFieldOptions2(true) || setSecondField(thirdFieldPayload)
                          : setThirdFieldOptions2(false) || setSecondField(null);
                      }}
                      disabled={
                        thirdFieldOptions1 ||
                        thirdFieldOptions3 ||
                        thirdFieldOptions4 ||
                        thirdFieldOptions5 ||
                        firstFieldOptions2 ||
                        secondFieldOptions2 ||
                        fourthFieldOptions2 ||
                        fifthFieldOptions2
                      }
                      style={
                        firstFieldOptions3 ||
                        firstFieldOptions4 ||
                        firstFieldOptions5 ||
                        secondFieldOptions3 ||
                        secondFieldOptions4 ||
                        secondFieldOptions5 ||
                        fourthFieldOptions3 ||
                        fourthFieldOptions4 ||
                        fourthFieldOptions5 ||
                        fifthFieldOptions3 ||
                        fifthFieldOptions4 ||
                        fifthFieldOptions5 === true
                          ? { pointerEvents: "none" }
                          : {}
                      }
                    />
                    <label className="form-check-label">{label2nd || "2nd"}</label>
                  </div>
                )}

              {/* Third Field 3rd */}
              {(threeFieldSort || fourFieldSort || fiveFieldSort) &&
                (firstFieldOptions2 ||
                  secondFieldOptions2 ||
                  thirdFieldOptions2 ||
                  fourthFieldOptions2 ||
                  fifthFieldOptions2) && (
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={thirdFieldOptions3 === false ? false : true}
                      name="thirdFieldOptions3"
                      id="thirdFieldOptions3"
                      value={thirdFieldOptions3}
                      readOnly
                      onClick={(e) => {
                        thirdFieldOptions3 === false
                          ? setThirdFieldOptions3(true) || setThirdField(thirdFieldPayload)
                          : setThirdFieldOptions3(false) || setThirdField(null);
                      }}
                      disabled={
                        thirdFieldOptions1 ||
                        thirdFieldOptions2 ||
                        thirdFieldOptions4 ||
                        thirdFieldOptions5 ||
                        firstFieldOptions3 ||
                        secondFieldOptions3 ||
                        fourthFieldOptions3 ||
                        fifthFieldOptions3
                      }
                      style={
                        firstFieldOptions4 ||
                        firstFieldOptions5 ||
                        secondFieldOptions4 ||
                        secondFieldOptions5 ||
                        fourthFieldOptions4 ||
                        fourthFieldOptions5 ||
                        fifthFieldOptions4 ||
                        fifthFieldOptions5 === true
                          ? { pointerEvents: "none" }
                          : {}
                      }
                    />
                    <label className="form-check-label">{label3rd || "3rd"}</label>
                  </div>
                )}

              {/* Third Field 4th */}
              {(fourFieldSort || fiveFieldSort) &&
                (firstFieldOptions3 ||
                  secondFieldOptions3 ||
                  thirdFieldOptions3 ||
                  fourthFieldOptions3 ||
                  fifthFieldOptions3) && (
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={thirdFieldOptions4}
                      name="thirdFieldOptions4"
                      id="thirdFieldOptions4"
                      value={thirdFieldOptions4}
                      readOnly
                      onClick={(e) => {
                        thirdFieldOptions4 === false
                          ? setThirdFieldOptions4(true) || setFourthField(thirdFieldPayload)
                          : setThirdFieldOptions4(false) || setFourthField(null);
                      }}
                      disabled={
                        thirdFieldOptions1 ||
                        thirdFieldOptions2 ||
                        thirdFieldOptions3 ||
                        thirdFieldOptions5 ||
                        firstFieldOptions4 ||
                        secondFieldOptions4 ||
                        fourthFieldOptions4 ||
                        fifthFieldOptions4
                      }
                      style={
                        firstFieldOptions5 ||
                        secondFieldOptions5 ||
                        fourthFieldOptions5 ||
                        fifthFieldOptions5 === true
                          ? { pointerEvents: "none" }
                          : {}
                      }
                    />
                    <label className="form-check-label">{label4th || "4th"}</label>
                  </div>
                )}

              {/* Third Field 5th */}
              {fiveFieldSort &&
                (firstFieldOptions4 ||
                  secondFieldOptions4 ||
                  thirdFieldOptions4 ||
                  fourthFieldOptions4 ||
                  fifthFieldOptions4) && (
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={thirdFieldOptions5}
                      name="thirdFieldOptions5"
                      id="thirdFieldOptions5"
                      value={thirdFieldOptions5}
                      readOnly
                      onClick={(e) => {
                        thirdFieldOptions5 === false
                          ? setThirdFieldOptions5(true) || setFifthField(thirdFieldPayload)
                          : setThirdFieldOptions5(false) || setFifthField(null);
                      }}
                      disabled={
                        thirdFieldOptions1 ||
                        thirdFieldOptions2 ||
                        thirdFieldOptions3 ||
                        thirdFieldOptions4 ||
                        firstFieldOptions5 ||
                        secondFieldOptions5 ||
                        fourthFieldOptions5 ||
                        fifthFieldOptions5
                      }
                    />
                    <label className="form-check-label">{label5th || "5th"}</label>
                  </div>
                )}
            </div>
          </>
        )}
        <br></br>

        {/* Fourth Field */}
        {(fourFieldSort || fiveFieldSort) && (
          <>
            <div className="form-group">
              <label>{fourthFieldName || "Fourth Field"}</label>
            </div>
            <div className="form-group">
              {/* Fourth Field 1st */}
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={fourthFieldOptions1 === false ? false : true}
                  name="fourthFieldOptions1"
                  id="fourthFieldOptions1"
                  value={fourthFieldOptions1}
                  readOnly
                  onClick={(e) => {
                    fourthFieldOptions1 === false
                      ? setFourthFieldOptions1(true) || setFirstField(fourthFieldPayload)
                      : setFourthFieldOptions1(false) || setFirstField(null);
                  }}
                  disabled={
                    fourthFieldOptions2 ||
                    fourthFieldOptions3 ||
                    fourthFieldOptions4 ||
                    fourthFieldOptions5 ||
                    firstFieldOptions1 ||
                    secondFieldOptions1 ||
                    thirdFieldOptions1 ||
                    fifthFieldOptions1
                  }
                  style={
                    firstFieldOptions2 ||
                    firstFieldOptions3 ||
                    firstFieldOptions4 ||
                    firstFieldOptions5 ||
                    secondFieldOptions2 ||
                    secondFieldOptions3 ||
                    secondFieldOptions4 ||
                    secondFieldOptions5 ||
                    thirdFieldOptions2 ||
                    thirdFieldOptions3 ||
                    thirdFieldOptions4 ||
                    thirdFieldOptions5 ||
                    fifthFieldOptions2 ||
                    fifthFieldOptions3 ||
                    fifthFieldOptions4 ||
                    fifthFieldOptions5 === true
                      ? { pointerEvents: "none" }
                      : {}
                  }
                />
                <label className="form-check-label">{label1st || "1st"}</label>
              </div>

              {/* Fourth Field 2nd */}
              {(twoFieldSort || threeFieldSort || fourFieldSort || fiveFieldSort) &&
                (firstFieldOptions1 ||
                  secondFieldOptions1 ||
                  thirdFieldOptions1 ||
                  fourthFieldOptions1 ||
                  fifthFieldOptions1) && (
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={fourthFieldOptions2}
                      name="fourthFieldOptions2"
                      id="fourthFieldOptions2"
                      value={fourthFieldOptions2}
                      readOnly
                      onClick={(e) => {
                        fourthFieldOptions2 === false
                          ? setFourthFieldOptions2(true) || setSecondField(fourthFieldPayload)
                          : setFourthFieldOptions2(false) || setSecondField(null);
                      }}
                      disabled={
                        fourthFieldOptions1 ||
                        fourthFieldOptions3 ||
                        fourthFieldOptions4 ||
                        fourthFieldOptions5 ||
                        firstFieldOptions2 ||
                        secondFieldOptions2 ||
                        thirdFieldOptions2 ||
                        fifthFieldOptions2
                      }
                      style={
                        firstFieldOptions3 ||
                        firstFieldOptions4 ||
                        firstFieldOptions5 ||
                        secondFieldOptions3 ||
                        secondFieldOptions4 ||
                        secondFieldOptions5 ||
                        thirdFieldOptions3 ||
                        thirdFieldOptions4 ||
                        thirdFieldOptions5 ||
                        fifthFieldOptions3 ||
                        fifthFieldOptions4 ||
                        fifthFieldOptions5 === true
                          ? { pointerEvents: "none" }
                          : {}
                      }
                    />
                    <label className="form-check-label">{label2nd || "2nd"}</label>
                  </div>
                )}

              {/* Fourth Field 3rd */}
              {(threeFieldSort || fourFieldSort || fiveFieldSort) &&
                (firstFieldOptions2 ||
                  secondFieldOptions2 ||
                  thirdFieldOptions2 ||
                  fourthFieldOptions2 ||
                  fifthFieldOptions2) && (
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={fourthFieldOptions3}
                      name="fourthFieldOptions3"
                      id="fourthFieldOptions3"
                      value={fourthFieldOptions3}
                      readOnly
                      onClick={(e) => {
                        fourthFieldOptions3 === false
                          ? setFourthFieldOptions3(true) || setThirdField(fourthFieldPayload)
                          : setFourthFieldOptions3(false) || setThirdField(null);
                      }}
                      disabled={
                        fourthFieldOptions1 ||
                        fourthFieldOptions2 ||
                        fourthFieldOptions4 ||
                        fourthFieldOptions5 ||
                        firstFieldOptions3 ||
                        secondFieldOptions3 ||
                        thirdFieldOptions3 ||
                        fifthFieldOptions3
                      }
                      style={
                        firstFieldOptions4 ||
                        firstFieldOptions5 ||
                        secondFieldOptions4 ||
                        secondFieldOptions5 ||
                        thirdFieldOptions4 ||
                        thirdFieldOptions5 ||
                        fifthFieldOptions4 ||
                        fifthFieldOptions5 === true
                          ? { pointerEvents: "none" }
                          : {}
                      }
                    />
                    <label className="form-check-label">{label3rd || "3rd"}</label>
                  </div>
                )}

              {/* Fourth Field 4th */}
              {(fourFieldSort || fiveFieldSort) &&
                (firstFieldOptions3 ||
                  secondFieldOptions3 ||
                  thirdFieldOptions3 ||
                  fourthFieldOptions3 ||
                  fifthFieldOptions3) && (
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={fourthFieldOptions4 === false ? false : true}
                      name="fourthFieldOptions4"
                      id="fourthFieldOptions4"
                      value={fourthFieldOptions4}
                      readOnly
                      onClick={(e) => {
                        fourthFieldOptions4 === false
                          ? setFourthFieldOptions4(true) || setFourthField(fourthFieldPayload)
                          : setFourthFieldOptions4(false) || setFourthField(null);
                      }}
                      disabled={
                        fourthFieldOptions1 ||
                        fourthFieldOptions2 ||
                        fourthFieldOptions3 ||
                        fourthFieldOptions5 ||
                        firstFieldOptions4 ||
                        secondFieldOptions4 ||
                        thirdFieldOptions4 ||
                        fifthFieldOptions4
                      }
                      style={
                        firstFieldOptions5 ||
                        secondFieldOptions5 ||
                        thirdFieldOptions5 ||
                        fifthFieldOptions5 === true
                          ? { pointerEvents: "none" }
                          : {}
                      }
                    />
                    <label className="form-check-label">{label4th || "4th"}</label>
                  </div>
                )}

              {/* Fourth Field 5th */}
              {fiveFieldSort &&
                (firstFieldOptions4 ||
                  secondFieldOptions4 ||
                  thirdFieldOptions4 ||
                  fourthFieldOptions4 ||
                  fifthFieldOptions4) && (
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={fourthFieldOptions5 === false ? false : true}
                      name="fourthFieldOptions5"
                      id="fourthFieldOptions5"
                      value={fourthFieldOptions5}
                      readOnly
                      onClick={(e) => {
                        fourthFieldOptions5 === false
                          ? setFourthFieldOptions5(true) || setFifthField(fourthFieldPayload)
                          : setFourthFieldOptions5(false) || setFifthField(null);
                      }}
                      disabled={
                        fourthFieldOptions1 ||
                        fourthFieldOptions2 ||
                        fourthFieldOptions3 ||
                        fourthFieldOptions4 ||
                        firstFieldOptions5 ||
                        secondFieldOptions5 ||
                        thirdFieldOptions5 ||
                        fifthFieldOptions5
                      }
                    />
                    <label className="form-check-label">{label5th || "5th"}</label>
                  </div>
                )}
            </div>
          </>
        )}
        <br></br>

        {/* Fifth Field */}
        {fiveFieldSort && (
          <>
            <div className="form-group">
              <label>{fifthFieldName || "Fifth Field"}</label>
            </div>
            <div className="form-group">
              {/* Fifth Field 1st */}
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={fifthFieldOptions1 === false ? false : true}
                  name="fifthFieldOptions1"
                  id="fifthFieldOptions1"
                  value={fifthFieldOptions1}
                  readOnly
                  onClick={(e) => {
                    fifthFieldOptions1 === false
                      ? setFifthFieldOptions1(true) || setFirstField(fifthFieldPayload)
                      : setFifthFieldOptions1(false) || setFirstField(null);
                  }}
                  disabled={
                    fifthFieldOptions2 ||
                    fifthFieldOptions3 ||
                    fifthFieldOptions4 ||
                    fifthFieldOptions5 ||
                    firstFieldOptions1 ||
                    secondFieldOptions1 ||
                    thirdFieldOptions1 ||
                    fourthFieldOptions1
                  }
                  style={
                    firstFieldOptions2 ||
                    firstFieldOptions3 ||
                    firstFieldOptions4 ||
                    firstFieldOptions5 ||
                    secondFieldOptions2 ||
                    secondFieldOptions3 ||
                    secondFieldOptions4 ||
                    secondFieldOptions5 ||
                    thirdFieldOptions2 ||
                    thirdFieldOptions3 ||
                    thirdFieldOptions4 ||
                    thirdFieldOptions5 ||
                    fourthFieldOptions2 ||
                    fourthFieldOptions3 ||
                    fourthFieldOptions4 ||
                    fourthFieldOptions5 === true
                      ? { pointerEvents: "none" }
                      : {}
                  }
                />
                <label className="form-check-label">{label1st || "1st"}</label>
              </div>

              {/* Fifth Field 2nd */}
              {(twoFieldSort || threeFieldSort || fourFieldSort || fiveFieldSort) &&
                (firstFieldOptions1 ||
                  secondFieldOptions1 ||
                  thirdFieldOptions1 ||
                  fourthFieldOptions1 ||
                  fifthFieldOptions1) && (
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={fifthFieldOptions2}
                      name="fifthFieldOptions2"
                      id="fifthFieldOptions2"
                      value={fifthFieldOptions2}
                      readOnly
                      onClick={(e) => {
                        fifthFieldOptions2 === false
                          ? setFifthFieldOptions2(true) || setSecondField(fifthFieldPayload)
                          : setFifthFieldOptions2(false) || setSecondField(null);
                      }}
                      disabled={
                        fifthFieldOptions1 ||
                        fifthFieldOptions3 ||
                        fifthFieldOptions4 ||
                        fifthFieldOptions5 ||
                        firstFieldOptions2 ||
                        secondFieldOptions2 ||
                        thirdFieldOptions2 ||
                        fourthFieldOptions2
                      }
                      style={
                        firstFieldOptions3 ||
                        firstFieldOptions4 ||
                        firstFieldOptions5 ||
                        secondFieldOptions3 ||
                        secondFieldOptions4 ||
                        secondFieldOptions5 ||
                        thirdFieldOptions3 ||
                        thirdFieldOptions4 ||
                        thirdFieldOptions5 ||
                        fourthFieldOptions3 ||
                        fourthFieldOptions4 ||
                        fourthFieldOptions5 === true
                          ? { pointerEvents: "none" }
                          : {}
                      }
                    />
                    <label className="form-check-label">{label2nd || "2nd"}</label>
                  </div>
                )}

              {/* Fifth Field 3rd */}
              {(threeFieldSort || fourFieldSort || fiveFieldSort) &&
                (firstFieldOptions2 ||
                  secondFieldOptions2 ||
                  thirdFieldOptions2 ||
                  fourthFieldOptions2 ||
                  fifthFieldOptions2) && (
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={fifthFieldOptions3}
                      name="fifthFieldOptions3"
                      id="fifthFieldOptions3"
                      value={fifthFieldOptions3}
                      readOnly
                      onClick={(e) => {
                        fifthFieldOptions3 === false
                          ? setFifthFieldOptions3(true) || setThirdField(fifthFieldPayload)
                          : setFifthFieldOptions3(false) || setThirdField(null);
                      }}
                      disabled={
                        fifthFieldOptions1 ||
                        fifthFieldOptions2 ||
                        fifthFieldOptions4 ||
                        fifthFieldOptions5 ||
                        firstFieldOptions3 ||
                        secondFieldOptions3 ||
                        thirdFieldOptions3 ||
                        fourthFieldOptions3
                      }
                      style={
                        firstFieldOptions4 ||
                        firstFieldOptions5 ||
                        secondFieldOptions4 ||
                        secondFieldOptions5 ||
                        thirdFieldOptions4 ||
                        thirdFieldOptions5 ||
                        fourthFieldOptions4 ||
                        fourthFieldOptions5 === true
                          ? { pointerEvents: "none" }
                          : {}
                      }
                    />
                    <label className="form-check-label">{label3rd || "3rd"}</label>
                  </div>
                )}

              {/* Fifth Field 4th */}
              {(fourFieldSort || fiveFieldSort) &&
                (firstFieldOptions3 ||
                  secondFieldOptions3 ||
                  thirdFieldOptions3 ||
                  fourthFieldOptions3 ||
                  fifthFieldOptions3) && (
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={fifthFieldOptions4 === false ? false : true}
                      name="fifthFieldOptions4"
                      id="fifthFieldOptions4"
                      value={fifthFieldOptions4}
                      readOnly
                      onClick={(e) => {
                        fifthFieldOptions4 === false
                          ? setFifthFieldOptions4(true) || setFourthField(fifthFieldPayload)
                          : setFifthFieldOptions4(false) || setFourthField(null);
                      }}
                      disabled={
                        fifthFieldOptions1 ||
                        fifthFieldOptions2 ||
                        fifthFieldOptions3 ||
                        fifthFieldOptions5 ||
                        firstFieldOptions4 ||
                        secondFieldOptions4 ||
                        thirdFieldOptions4 ||
                        fourthFieldOptions4
                      }
                      style={
                        firstFieldOptions5 ||
                        secondFieldOptions5 ||
                        thirdFieldOptions5 ||
                        fourthFieldOptions5 === true
                          ? { pointerEvents: "none" }
                          : {}
                      }
                    />
                    <label className="form-check-label">{label4th || "4th"}</label>
                  </div>
                )}

              {/* Fifth Field 5th */}
              {fiveFieldSort &&
                (firstFieldOptions4 ||
                  secondFieldOptions4 ||
                  thirdFieldOptions4 ||
                  fourthFieldOptions4 ||
                  fifthFieldOptions4) && (
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={fifthFieldOptions5 === false ? false : true}
                      name="fifthFieldOptions5"
                      id="fifthFieldOptions5"
                      value={fifthFieldOptions5}
                      readOnly
                      onClick={(e) => {
                        fifthFieldOptions5 === false
                          ? setFifthFieldOptions5(true) || setFifthField(fifthFieldPayload)
                          : setFifthFieldOptions5(false) || setFifthField(null);
                      }}
                      disabled={
                        fifthFieldOptions1 ||
                        fifthFieldOptions2 ||
                        fifthFieldOptions3 ||
                        fifthFieldOptions4 ||
                        firstFieldOptions5 ||
                        secondFieldOptions5 ||
                        thirdFieldOptions5 ||
                        fourthFieldOptions5
                      }
                    />
                    <label className="form-check-label">{label5th || "5th"}</label>
                  </div>
                )}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default AdvancedSortComponent;
