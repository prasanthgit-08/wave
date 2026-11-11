/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import { useDispatch } from "react-redux";

const AdvancedSearchComponent = ({
  /**
   * Select Required Search
   * **********************
   *    - pass the required property for getting corresponding number of input fields
   */
  twoFieldSearch,
  threeFieldSearch,
  fourFieldSearch,
  fiveFieldSearch,
  sixFieldSearch,
  // -------------
  /**
   * Pass required labels for each input field
   */
  firstFieldName,
  secondFieldName,
  thirdFieldName,
  fourthFieldName,
  fifthFieldName,
  sixthFieldName,
  /**
   * Advanced Search Object for UI
   * *****************************
   *    - pass advancedSearchObject global state and its setState function
   *    - initialize its value as null & reset to null when hiding advanced sorting
   */
  advancedSearchObject,
  setAdvancedSearchObject,
  // ---------------------
  /**
   * For updating Payload object for Advanced search API call
   */
  updateAdvancedSearchPayload,
  /**
   * For updating pageNumber on onFocus of Input Fields
   */
  setPageNumber,
  /**
   * For giving custom maxLength for the required input fields
   */
  maxLengthFirstField,
  maxLengthSecondField,
  maxLengthThirdField,
  maxLengthFourthField,
  maxLengthFifthField,
  maxLengthSixthField,
  /**
   * Custom Functions for modifying (state/format of) each fields if required
   */
  customFirstField,
  customSecondField,
  customThirdField,
  customFourthField,
  customFifthField,
  customSixthField,
  // customFourthField={(fourthField) => fourthField.toUpperCase()}
  // ---------------------------------------------------------------
  /**
   * Custom classes for styling if required
   */
  wrapperClass,
  classNameFirstField,
  classNameSecondField,
  classNameThirdField,
  classNameFourthField,
  classNameFifthField,
  classNameSixthField,
  // -----------------
  /**
   * Pass custom width for respective input fields if required
   *    - pass values in px as string
   */
  widthFirstField,
  widthSecondField,
  widthThirdField,
  widthFourthField,
  widthFifthField,
  widthSixthField,
}) => {
  const [firstField, setFirstField] = useState("");
  const [secondField, setSecondField] = useState("");
  const [thirdField, setThirdField] = useState("");
  const [fourthField, setFourthField] = useState("");
  const [fifthField, setFifthField] = useState("");
  const [sixthField, setSixthField] = useState("");

  const defaultMaxLength = 30;

  const dispatch = useDispatch();

  /**
   * Set previous input values in Advanced Search when the user comes back to the main page
   * OR when the component rerenders (after being hidden)
   */
  useEffect(() => {
    const setPreviousInputValues = () => {
      setFirstField(
        firstField === "" && advancedSearchObject !== null && advancedSearchObject?.firstField !== ""
          ? advancedSearchObject?.firstField
          : firstField
      );
      setSecondField(
        secondField === "" && advancedSearchObject !== null && advancedSearchObject?.secondField !== ""
          ? advancedSearchObject?.secondField
          : secondField
      );
      setThirdField(
        thirdField === "" && advancedSearchObject !== null && advancedSearchObject?.thirdField !== ""
          ? advancedSearchObject?.thirdField
          : thirdField
      );
      setFourthField(
        fourthField === "" && advancedSearchObject !== null && advancedSearchObject?.fourthField !== ""
          ? advancedSearchObject?.fourthField
          : fourthField
      );
      setFifthField(
        fifthField === "" && advancedSearchObject !== null && advancedSearchObject?.fifthField !== ""
          ? advancedSearchObject?.fifthField
          : fifthField
      );
      setSixthField(
        sixthField === "" && advancedSearchObject !== null && advancedSearchObject?.sixthField !== ""
          ? advancedSearchObject?.sixthField
          : sixthField
      );
    };

    setPreviousInputValues();
  }, []);

  /**
   * Update Advanced Search Object as the localstates is updated
   */
  useEffect(() => {
    if (setAdvancedSearchObject) {
      dispatch(
        setAdvancedSearchObject({
          firstField,
          secondField,
          thirdField,
          fourthField,
          fifthField,
          sixthField,
        })
      );
    }
  }, [firstField, secondField, thirdField, fourthField, fifthField, sixthField]);

  /**
   * Update Required Object for Advanced Search API call
   */
  useEffect(() => {
    if (updateAdvancedSearchPayload) {
      if (advancedSearchObject !== null) {
        updateAdvancedSearchPayload();
      }
    }
  }, [advancedSearchObject]);

  return (
    <div className={`${wrapperClass || "col-md-12 m-t-15 m-b-15"}`}>
      <form>
        {/* First Field */}
        <div className="form-group d-flex flex-column m-b-10">
          <label>{firstFieldName || "First Field"}</label>
          <InputField
            type="search"
            name="firstField"
            maxLength={maxLengthFirstField || defaultMaxLength}
            value={customFirstField ? customFirstField(firstField) : firstField}
            onInput={(e) => {
              setFirstField(e.target.value);
            }}
            className={`form-control rounded-0 h-25px ${classNameFirstField || ""}`}
            width={widthFirstField}
            onFocus={(e) => {
              if (setPageNumber) {
                dispatch(setPageNumber(0));
              }
              e.target.setAttribute("autocomplete", "off");
            }}
          />
        </div>

        {/* Second Field */}
        {(twoFieldSearch || threeFieldSearch || fourFieldSearch || fiveFieldSearch || sixFieldSearch) && (
          <div className="form-group d-flex flex-column m-b-10">
            <label>{secondFieldName || "Second Field"}</label>
            <InputField
              type="search"
              name="secondField"
              maxLength={maxLengthSecondField || defaultMaxLength}
              value={customSecondField ? customSecondField(secondField) : secondField}
              onInput={(e) => {
                setSecondField(e.target.value);
              }}
              className={`form-control rounded-0 h-25px ${classNameSecondField || ""}`}
              width={widthSecondField}
              onFocus={(e) => {
                if (setPageNumber) {
                  dispatch(setPageNumber(0));
                }
                e.target.setAttribute("autocomplete", "off");
              }}
            />
          </div>
        )}

        {/* Third Field */}
        {(threeFieldSearch || fourFieldSearch || fiveFieldSearch || sixFieldSearch) && (
          <div className="form-group d-flex flex-column m-b-10">
            <label>{thirdFieldName || "Third Field"}</label>
            <InputField
              type="search"
              name="thirdField"
              maxLength={maxLengthThirdField || defaultMaxLength}
              value={customThirdField ? customThirdField(thirdField) : thirdField}
              onInput={(e) => {
                setThirdField(e.target.value);
              }}
              className={`form-control rounded-0 h-25px ${classNameThirdField || ""}`}
              width={widthThirdField}
              onFocus={(e) => {
                if (setPageNumber) {
                  dispatch(setPageNumber(0));
                }
                e.target.setAttribute("autocomplete", "off");
              }}
            />
          </div>
        )}

        {/* Fourth Field */}
        {(fourFieldSearch || fiveFieldSearch || sixFieldSearch) && (
          <div className="form-group d-flex flex-column m-b-10">
            <label>{fourthFieldName || "Fourth Field"}</label>
            <InputField
              type="search"
              name="fourthField"
              maxLength={maxLengthFourthField || defaultMaxLength}
              value={customFourthField ? customFourthField(fourthField) : fourthField}
              onInput={(e) => {
                setFourthField(e.target.value);
              }}
              className={`form-control rounded-0 h-25px ${classNameFourthField || ""}`}
              width={widthFourthField}
              onFocus={(e) => {
                if (setPageNumber) {
                  dispatch(setPageNumber(0));
                }
                e.target.setAttribute("autocomplete", "off");
              }}
            />
          </div>
        )}

        {/* Fifth Field */}
        {(fiveFieldSearch || sixFieldSearch) && (
          <div className="form-group d-flex flex-column m-b-10">
            <label>{fifthFieldName || "Fifth Field"}</label>
            <InputField
              type="search"
              name="fifthField"
              maxLength={maxLengthFifthField || defaultMaxLength}
              value={customFifthField ? customFifthField(fifthField) : fifthField}
              onInput={(e) => {
                setFifthField(e.target.value);
              }}
              className={`form-control rounded-0 h-25px ${classNameFifthField || ""}`}
              width={widthFifthField}
              onFocus={(e) => {
                if (setPageNumber) {
                  dispatch(setPageNumber(0));
                }
                e.target.setAttribute("autocomplete", "off");
              }}
            />
          </div>
        )}

        {/* Sixth Field */}
        {sixFieldSearch && (
          <div className="form-group d-flex flex-column m-b-10">
            <label>{sixthFieldName || "Sixth Field"}</label>
            <InputField
              type="search"
              name="fifthField"
              maxLength={maxLengthSixthField || defaultMaxLength}
              value={customSixthField ? customSixthField(sixthField) : sixthField}
              onInput={(e) => {
                setSixthField(e.target.value);
              }}
              className={`form-control rounded-0 h-25px ${classNameSixthField || ""}`}
              width={widthSixthField}
              onFocus={(e) => {
                if (setPageNumber) {
                  dispatch(setPageNumber(0));
                }
                e.target.setAttribute("autocomplete", "off");
              }}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default AdvancedSearchComponent;
