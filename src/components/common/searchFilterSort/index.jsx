import { t } from "i18next";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import { useState } from "react";
import CustomButton from "../button";
import Input from "../input";
import RadioButton from "../radioButton";

const SearchFilterSort = ({
  /**
   * Required Props
   * **************
   */
  globalSearchTerm,
  setGlobalSearchTerm,
  selectedSearchCriteria,
  setSelectedSearchCriteria,
  setPageNumber,
  handleClose,
  /**
   * Use either Normal Search Filter or Adv Search/Sort or Both...
   */
  // Use this flag if want to use Normal Search Filter (w/o Adv Search & Sort)
  normalSearchFilter,
  // Flags & States related to Adv Search & Adv Sort
  showAdvancedSearchFlag,
  showAdvancedSortFlag,
  showAdvancedSearchState,
  showAdvancedSortState,
  handleAdvancedSearch,
  handleAdvancedSort,
  // ---------------------
  // Additional Props to conditionally modify the component
  unitType,
  unitTypeSearchCriteria,
  handleUnitTypeRadioGroup,
  editMasterExpress,

  // currently needed props
  filterData,
  setFilterData,
  setShowAdvancedSort,
  setShowAdvancedSearch,
  onHide,
  loading = false,
  handleSubmit,
  showAdvancedSearch,
}) => {
  // -----------------------------------------------
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (showAdvancedSearch) {
      setFilterData({ ...filterData, searchTerms: "" });
    }
  }, [showAdvancedSearch]);

  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col xs={12}>
          <Row className="m-0 p-0 d-flex justify-content-between">
            <Col className="d-flex align-items-center search-box mt-0 ">
              <div>
                <span className=" d-flex p-l-20">
                  <label className="f-w-600 me-1 mb-0 " style={{ marginTop: "2px" }}>
                    Search
                  </label>
                  <Input
                    type="search"
                    name={"searchTerm"}
                    placeholder="Global Search"
                    value={filterData?.searchTerms}
                    disabled={showAdvancedSearch}
                    onChange={(e) => {
                      setFilterData({ ...filterData, searchTerms: e.target.value });
                    }}
                    className={`search-input`}
                    autoComplete="off"
                  />
                </span>
              </div>
            </Col>
            <Col className="d-flex justify-content-center ">
              <div className="d-flex justify-content-center flex-column align-items-center">
                <RadioButton
                  name="searchCriteria"
                  disabled={loading}
                  defaultValue={filterData?.searchCriteria}
                  value={filterData.searchCriteria}
                  onChange={(option) => setFilterData({ ...filterData, searchCriteria: option.value })}
                  options={[
                    { value: "Beginning", label: "Beginning" },
                    { value: "Contains", label: "Contains" },
                  ]}
                  className=""
                />
              </div>
            </Col>
            {
              // !editMasterExpress &&    //  partially refactored yet
              unitType && (
                <Col className="d-flex justify-content-center mt-2">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <RadioButton
                      name="unitTypeSearchCriteria"
                      disabled={loading}
                      defaultValue={filterData?.unitTypeSearchCriteria}
                      value={filterData.unitTypeSearchCriteria}
                      onChange={(option) =>
                        setFilterData({
                          ...filterData,
                          unitTypeSearchCriteria: option.value,
                          towable: option.towable,
                        })
                      }
                      options={[
                        { value: "All", label: "All", towable: null },
                        { value: "Motorized", label: "Motorized", towable: 0 },
                        { value: "Towable", label: "Towable", towable: 1 },
                      ]}
                      className=""
                    />
                  </div>
                </Col>
              )
            }

            <Col
              className={`${!showAdvancedSortFlag ? "d-flex justify-content-end align-items-center" : ""}`}
            >
              <div className="d-flex justify-content-end advanced-search-box">
                <div className="d-flex flex-column me-1">
                  {showAdvancedSearchFlag && (
                    <span className="mb-1">
                      <CustomButton
                        type="button"
                        disabled={loading}
                        label={"Advanced Search"}
                        className={"btn-medium-with font-12 mt-0"}
                        onClick={() => setShowAdvancedSearch((prev) => !prev)}
                      />
                    </span>
                  )}
                  {showAdvancedSortFlag && (
                    <span className="mt-1">
                      <CustomButton
                        type="button"
                        disabled={loading}
                        label={"Advanced Sort"}
                        className={"font-12 mt-0 mb-0"}
                        onClick={() => setShowAdvancedSort((prev) => !prev)}
                      />
                    </span>
                  )}
                </div>
                <div className="d-flex flex-column ">
                  <span children="mb-1">
                    <CustomButton
                      type="button"
                      size="small"
                      label={"Close"}
                      className={"font-12 mt-0 btn-small-width close-button"}
                      onClick={() => onHide()}
                    />
                  </span>

                  {showAdvancedSearchFlag && handleSubmit && (
                    <span className="mt-2">
                      <CustomButton
                        type="button"
                        size="small"
                        disabled={loading}
                        label={"Submit"}
                        className={"font-12 mt-0"}
                        onClick={() => handleSubmit()}
                      />
                    </span>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SearchFilterSort;
