import { t } from "i18next";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { Radio, RadioGroup } from "react-radio-group";
import ButtonComponent from "../../common/Button";
import InputField from "../../common/InputField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMiscellaneousDealerId } from "../../../redux/UndispatchSlice";

const SearchFilterNSort = ({
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
}) => {
  // -----------------------------------------------
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0 d-flex justify-content-between">
            <Col md={8} sm={8} lg={7} xs={8} className="p-l-0">
              <div
                className={`d-flex align-items-center justify-content-around pt-2 ${normalSearchFilter ? "" : "mt-1 pt-2"}`}
              >
                <div className="d-flex align-items-center search-box">
                  <span className="p-l-20">
                    <label className="f-w-600 m-r-15">{t("dealers.list.page.search.button")}</label>
                    <InputField
                      type="search"
                      name="searchTerm"
                      value={globalSearchTerm}
                      autoComplete="off"
                      aria-autocomplete="list"
                      placeholder={t("dealers.list.page.global.search")}
                      className="search-input"
                      onChange={(e) => {
                        dispatch(setGlobalSearchTerm(e.target.value));
                        dispatch(setPageNumber(0));
                      }}
                      disabled={showAdvancedSearchState || (showAdvancedSortState && disabled)}
                      autocomplete="autocomplete_off_randString"
                    />
                  </span>
                </div>

                <div
                  className="d-flex align-items-center"
                  style={{ marginLeft: `${!normalSearchFilter ? "-5rem" : ""}` }}
                >
                  <RadioGroup
                    name="searchCriteria"
                    selectedValue={selectedSearchCriteria}
                    onChange={(value) => {
                      dispatch(setSelectedSearchCriteria(value));
                      dispatch(setPageNumber(0));
                    }}
                  >
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Beginning" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.begining")}</label>
                    </div>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Contains" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.contains")}</label>
                    </div>
                  </RadioGroup>
                </div>

                {!editMasterExpress && unitType && (
                  <div className="d-flex flex-column">
                    <RadioGroup
                      name="status"
                      selectedValue={unitTypeSearchCriteria}
                      onChange={handleUnitTypeRadioGroup}
                    >
                      <div className="d-flex align-items-center m-b-5">
                        <Radio value="All" />
                        <label className="f-w-600 m-l-5">All</label>
                      </div>

                      <div className="d-flex align-items-center m-b-5">
                        <Radio value="Motorized" />
                        <label className="f-w-600 m-l-5">Motorized</label>
                      </div>

                      <div className="d-flex align-items-center m-b-5">
                        <Radio value="Towable" />
                        <label className="f-w-600 m-l-5">Towable</label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
            </Col>

            <Col md={4} sm={4} lg={4} xs={4} className="p-l-0">
              <div className="d-flex justify-content-end advanced-search-box">
                <div className="d-flex flex-column">
                  {showAdvancedSearchFlag && (
                    <span className="m-b-5">
                      <ButtonComponent
                        route={""}
                        className="btn btn-secondary font-12 btn-sm btn-medium-with"
                        label={t("dealers.list.page.advanced.search.button")}
                        onClick={() => handleAdvancedSearch(!showAdvancedSearchState)}
                      />
                    </span>
                  )}

                  {showAdvancedSortFlag && (
                    <span className="m-t-5">
                      <ButtonComponent
                        route={""}
                        className="btn btn-secondary font-12 btn-sm btn-medium-with"
                        label={t("dealers.list.page.advanced.sort.button")}
                        onClick={() => handleAdvancedSort(!showAdvancedSortState)}
                      />
                    </span>
                  )}
                </div>

                <span className="m-l-10">
                  <ButtonComponent
                    route={""}
                    className={`btn btn-secondary btn-sm font-12 btn-small-width close-button ${normalSearchFilter && "m-t-15"}`}
                    label={t("dealers.list.page.advanced.close.button")}
                    onClick={() => {
                      dispatch(setMiscellaneousDealerId(null));
                      handleClose();
                    }}
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

export default SearchFilterNSort;
