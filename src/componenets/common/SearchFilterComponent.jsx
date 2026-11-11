/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { t } from "i18next";
import InputField from "./InputField";
import ButtonComponent from "./Button";
import CustomRadioGroup from "./CustomRadioGroup";
import { useNavigate } from "react-router-dom";

const SearchFilterComponent = ({
  isNormalSearchFilter,
  hasAdvancedSearch,
  hasAdvancedSort,
  secondRadioGroup,
  thirdRadioGroup,
  fourthRadioGroup,
  fifthRadioGroup,
  fullScreen = false,
  closeButtonPosition = "",

  //Route & Handler For Add Button
  addButtonRoute,
  handleAddOnClick,

  newButtonRoute,
  closeButtonRoute,
  handleNewOnClick,
  handleCloseOnClick,
  // ----------------
  // Global search term state from Redux
  globalSearchTerm,
  setGlobalSearchTerm,
  firstRadioGroupValue,
  secondRadioGroupValue,
  thirdRadioGroupValue,
  fourthRadioGroupValue,
  fifthRadioGroupValue,
  // -------------------
  /**
   * Use either the setState functions of State variables
   * OR Custom Functions for handling Radio Group onChange
   */
  setFirstRadioGroupValue,
  setSecondRadioGroupValue,
  setThirdRadioGroupValue,
  setFourthRadioGroupValue,
  setFifthRadioGroupValue,
  // ----------------------
  // Custom Functions for handling Radio Group onChange
  customHandleFirstRadioGroupOnChange,
  customHandleSecondRadioGroupOnChange,
  customHandleThirdRadioGroupOnChange,
  customHandleFourthRadioGroupOnChange,
  customHandleFifthRadioGroupOnChange,
  showAdvancedSearch,

  showAdvancedSort,
  // ---------------------------------
  /**
   * ---------------------------------------------------------------------
   * Functions for handling Advanced Search & Advanved Sort button onClick
   * ---------------------------------------------------------------------
   * Use either of two options for Handling Advanced Search & Advanved Sort button onClick
   */
  /**
   * ----------------------------
   * Option 1: New Implementation
   * ----------------------------
   *    - leaves the logic/implementation of the onClick function upto the user
   *    - takes no arguments
   */
  onClickAdvancedSearch,
  onClickAdvancedSort,
  /**
   * ---------------------------------
   * Option 2: Previous Implementation
   * ---------------------------------
   *    - functions should be defined in a specific way as used (called) in this common SearchFilter component
   *    - showAdvancedSearch & showAdvancedSort states should be passed as argument to the respective handler functions
   */
  handleAdvancedSearchOnClick,
  handleAdvancedSortOnClick,
  // ---------------------------------------------------------------------
  // Custom options(array) for Radio Group, if not provided, default values are taken
  customFirstRadioGroupOptions,
  customSecondRadioGroupOptions,
  customThirdRadioGroupOptions,
  customFourthRadioGroupOptions,
  customFifthRadioGroupOptions,
  // --------------------------
  // For reseting pageNumber when search conditions are changed
  setPageNumber,
  // ----------------------------
  disableFirstRadioGroup = false,
  disableSecondRadioGroup = false,
  disableThirdRadioGroup = false,
  disableFourthRadioGroup = false,
  disableFifthRadioGroup = false,
  // ----------------------------
  globalSearchPlaceholder,
  preventMultipleWhitespaces,

  // To use to and from date for filteration instaed of search Terms
  MiscellaneousContent,
  MiscellaneousContent2,
  expandFilters,
  //To set Extrabutton
  saveButton,
  saveButtonRoute,
  handleSaveOnClick,
  disableSave,

  //Disable new button
  disableNew,
}) => {
  const searchCriteriaOptions = ["Beginning", "Contains"];
  const secondRadioGroupOptions = ["All", "Active", "Inactive"];
  const thirdRadioGroupOptions = ["Complete", "Incomplete"];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNameSearch = (e) => {
    let inputValue = e.target.value;
    let words = inputValue?.trim().split(/\s+/);

    // Prevent second whitespace
    if (words.length > 2 || (words.length === 2 && inputValue.endsWith(" "))) {
      return;
    }

    dispatch(setGlobalSearchTerm(inputValue));
    dispatch(setPageNumber(0));
  };

  const handleFirstRadioGroupOnChange = (option) => {
    dispatch(setFirstRadioGroupValue(option));
    dispatch(setPageNumber(0));
  };

  const handleSecondRadioGroupOnChange = (option) => {
    dispatch(setSecondRadioGroupValue(option));
    dispatch(setPageNumber(0));
  };

  const handleThirdRadioGroupOnChange = (option) => {
    dispatch(setThirdRadioGroupValue(option));
    dispatch(setPageNumber(0));
  };

  const handleFourthRadioGroupOnChange = (option) => {
    dispatch(setFourthRadioGroupValue(option));
    dispatch(setPageNumber(0));
  };

  const handleFifthRadioGroupOnChange = (option) => {
    dispatch(setFifthRadioGroupValue(option));
    dispatch(setPageNumber(0));
  };

  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0">
            <Col
              md={!expandFilters ? 8 : 10}
              sm={!expandFilters ? 8 : 10}
              lg={!expandFilters ? 8 : 10}
              xs={!expandFilters ? 8 : 10}
              className="p-l-0"
            >
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center customSearchBox">
                  {newButtonRoute || addButtonRoute ? (
                    <span className="p-r-20">
                      {newButtonRoute && (
                        <button
                          // route={newButtonRoute}
                          className="btn btn-secondary btn-sm font-12 customButtonSmallWidth"
                          label="New"
                          onClick={() => {
                            navigate(newButtonRoute);
                            handleNewOnClick && handleNewOnClick();
                          }}
                          hidden={!newButtonRoute}
                          disabled={disableNew}
                        >
                          New
                        </button>
                      )}
                      {addButtonRoute && (
                        <ButtonComponent
                          route={addButtonRoute}
                          className="btn btn-secondary btn-sm font-12 customButtonSmallWidth"
                          label="Add"
                          onClick={handleAddOnClick}
                          hidden={!addButtonRoute}
                        />
                      )}
                    </span>
                  ) : (
                    <span className="p-r-70"></span>
                  )}

                  {!MiscellaneousContent && (
                    <span className="p-l-20">
                      <label className="f-w-600 m-r-15 customLabel">{t("search.label")}</label>
                      <InputField
                        type="search"
                        name="globalSearchTerm"
                        value={globalSearchTerm}
                        autoComplete="off"
                        aria-autocomplete="list"
                        placeholder={globalSearchPlaceholder || t("global.search")}
                        onChange={(e) => {
                          if (preventMultipleWhitespaces) {
                            handleNameSearch(e);
                          } else {
                            dispatch(setGlobalSearchTerm(e.target.value));
                            dispatch(setPageNumber(0));
                          }
                        }}
                        disabled={showAdvancedSearch || false}
                        autocomplete="autocomplete_off_randString"
                      />
                    </span>
                  )}
                  {MiscellaneousContent}
                </div>

                <div className="d-flex align-items-center">
                  <CustomRadioGroup
                    name="searchCriteria"
                    selectedOption={firstRadioGroupValue}
                    options={customFirstRadioGroupOptions || searchCriteriaOptions}
                    onChange={(option) => {
                      if (customHandleFirstRadioGroupOnChange) {
                        customHandleFirstRadioGroupOnChange(option);
                      } else {
                        handleFirstRadioGroupOnChange(option);
                      }
                    }}
                    disabled={disableFirstRadioGroup}
                  />
                </div>

                {(secondRadioGroup || secondRadioGroupValue || customSecondRadioGroupOptions) && (
                  <div className="d-flex flex-column">
                    <CustomRadioGroup
                      name="secondRadioGroup"
                      selectedOption={secondRadioGroupValue}
                      options={customSecondRadioGroupOptions || secondRadioGroupOptions}
                      onChange={(option) => {
                        if (customHandleSecondRadioGroupOnChange) {
                          customHandleSecondRadioGroupOnChange(option);
                        } else {
                          handleSecondRadioGroupOnChange(option);
                        }
                      }}
                      disabled={disableSecondRadioGroup}
                    />
                  </div>
                )}

                {!secondRadioGroup && fullScreen && (
                  <div className="hide-elements d-flex flex-column">
                    <CustomRadioGroup
                      name="secondRadioGroup"
                      selectedOption={secondRadioGroupValue}
                      options={customSecondRadioGroupOptions || secondRadioGroupOptions}
                      disabled
                    />
                  </div>
                )}

                {(thirdRadioGroup || thirdRadioGroupValue || customThirdRadioGroupOptions) && (
                  <div className="d-flex flex-column">
                    <CustomRadioGroup
                      name="thirdRadioGroup"
                      selectedOption={thirdRadioGroupValue}
                      options={customThirdRadioGroupOptions || thirdRadioGroupOptions}
                      onChange={(option) => {
                        if (customHandleThirdRadioGroupOnChange) {
                          customHandleThirdRadioGroupOnChange(option);
                        } else {
                          handleThirdRadioGroupOnChange(option);
                        }
                      }}
                      disabled={disableThirdRadioGroup}
                    />
                  </div>
                )}

                {!thirdRadioGroup && fullScreen && (
                  <div className="hide-elements d-flex flex-column">
                    <CustomRadioGroup
                      name="thirdRadioGroup"
                      selectedOption={thirdRadioGroupValue}
                      options={customThirdRadioGroupOptions || thirdRadioGroupOptions}
                    />
                  </div>
                )}

                {(fourthRadioGroup || fourthRadioGroupValue || customFourthRadioGroupOptions) && (
                  <div className="d-flex flex-column">
                    <CustomRadioGroup
                      name="fourthRadioGroup"
                      selectedOption={fourthRadioGroupValue}
                      options={customFourthRadioGroupOptions}
                      onChange={(option) => {
                        if (customHandleFourthRadioGroupOnChange) {
                          customHandleFourthRadioGroupOnChange(option);
                        } else {
                          handleFourthRadioGroupOnChange(option);
                        }
                      }}
                      disabled={disableFourthRadioGroup}
                    />
                  </div>
                )}

                {(fifthRadioGroup || fifthRadioGroupValue || customFifthRadioGroupOptions) && (
                  <div className="d-flex flex-column">
                    <CustomRadioGroup
                      name="fifthRadioGroup"
                      selectedOption={fifthRadioGroupValue}
                      options={customFifthRadioGroupOptions}
                      onChange={(option) => {
                        if (customHandleFifthRadioGroupOnChange) {
                          customHandleFifthRadioGroupOnChange(option);
                        } else {
                          handleFifthRadioGroupOnChange(option);
                        }
                      }}
                      disabled={disableFifthRadioGroup}
                    />
                  </div>
                )}

                {MiscellaneousContent2 && <div className=" d-flex flex-column">{MiscellaneousContent2}</div>}
              </div>
            </Col>

            <Col
              md={!expandFilters ? 4 : 2}
              sm={!expandFilters ? 4 : 2}
              lg={!expandFilters ? 4 : 2}
              xs={!expandFilters ? 4 : 2}
              className="p-l-0"
            >
              <div className="d-flex justify-content-end advanced-search-box">
                <div className="d-flex flex-column">
                  {hasAdvancedSearch && (
                    <span className="m-b-5">
                      <ButtonComponent
                        route={""}
                        className="btn btn-secondary font-12 btn-sm btn-medium-width"
                        label={t("advanced.search.button")}
                        onClick={() => {
                          if (onClickAdvancedSearch) {
                            onClickAdvancedSearch();
                          } else if (handleAdvancedSearchOnClick) {
                            handleAdvancedSearchOnClick(!showAdvancedSearch);
                          }
                        }}
                      />
                    </span>
                  )}

                  {hasAdvancedSort && (
                    <span className="m-t-5">
                      <ButtonComponent
                        route={""}
                        className="btn btn-secondary font-12 btn-sm btn-medium-width"
                        label={t("advanced.sort.button")}
                        onClick={() => {
                          if (onClickAdvancedSort) {
                            onClickAdvancedSort();
                          } else if (handleAdvancedSortOnClick) {
                            handleAdvancedSortOnClick(!showAdvancedSort);
                          }
                        }}
                      />
                    </span>
                  )}
                </div>

                <button
                  className="btn btn-secondary btn-sm font-12 customButtonSmallWidth"
                  label="New"
                  onClick={() => {
                    navigate(saveButtonRoute);
                    handleSaveOnClick && handleSaveOnClick();
                  }}

                  hidden={!saveButton}
                  disabled={disableSave}
                >
                  Save
                </button>

                <span className={`m-l-10 ${closeButtonPosition || ""}`}>
                  <ButtonComponent
                    route={closeButtonRoute || ""}
                    className={`btn btn-secondary btn-sm font-12 customButtonSmallWidth ${
                      isNormalSearchFilter ? "" : ""
                    }`}
                    style={{
                      marginTop: isNormalSearchFilter ? "8px" : "",
                      marginLeft: "30px",
                    }}
                    label={t("close.button")}
                    onClick={handleCloseOnClick}
                  />
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SearchFilterComponent;
