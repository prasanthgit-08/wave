import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { RadioGroup, Radio } from "react-radio-group";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../common/Button";
import InputField from "../../common/InputField";
import {
  setSearchTerms,
  setSearchCriteria,
  setPageNumber,
  setSelectedStatus,
  setTotalElements,
  setTotalPages,
  setListingData,
  resetChanges,
  setViewDetail,
  setEditFormData,
  resetEquipment,
  setActive,
} from "../../../redux/StatePermitsSlice";

function StatePermitsSearchFilter() {
  const [loading, setLoading] = useState(true);
  const searchTerms = useSelector((state) => state.statePermitsReducer.searchTerms);
  const pageNumber = useSelector((state) => state.statePermitsReducer.pageNumber);
  const searchCriteria = useSelector((state) => state.statePermitsReducer.searchCriteria);
  const selectedStatus = useSelector((state) => state.statePermitsReducer.selectedStatus);

  const dispatch = useDispatch();
  const handleSecondRadioGroupOnChange = (value) => {
    dispatch(setSelectedStatus(value));
    dispatch(setPageNumber(0));
  };
  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0 ">
            <Col md={9} sm={8} lg={8} xs={8} className="p-l-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center customSearchBox">
                  <span className="p-r-20">
                    <ButtonComponent
                      route={"/state-permits-edit"}
                      className="btn btn-secondary btn-sm font-12 customButtonSmallWidth"
                      label={t("new.button")}
                      onClick={() => {
                        dispatch(setEditFormData(undefined));
                        dispatch(resetChanges());
                        dispatch(setViewDetail(false));
                      }}
                    />
                  </span>

                  <span className="p-l-20">
                    <label className="f-w-600 m-r-15 customLabel">
                      {t("dealers.list.page.search.button")}
                    </label>
                    <InputField
                      type="text"
                      name="searchTerms"
                      value={searchTerms}
                      onChange={(e) => {
                        dispatch(setSearchTerms(e.target.value));
                        dispatch(setPageNumber(0));
                      }}
                      minWidth={"80px"}
                      autoComplete="off"
                      aria-autocomplete="list"
                      placeholder={t("dealers.list.page.global.search")}
                      className="search-input"

                      autocomplete="autocomplete_off_randString"
                    />
                  </span>
                </div>

                <div className="d-flex align-items-center">
                  <RadioGroup
                    name="searchCriteria"
                    selectedValue={searchCriteria}
                    onChange={(value) => {
                      dispatch(setSearchCriteria(value));
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

                <div className="d-flex align-items-center">
                  <RadioGroup
                    name="status"
                    selectedValue={selectedStatus}
                    onChange={handleSecondRadioGroupOnChange}
                  >
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="All" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.all")}</label>
                    </div>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Inactive" />
                      <label className="f-w-600 m-l-5">Motorized</label>
                    </div>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Active" />
                      <label className="f-w-600 m-l-5">Towable</label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Col>

            <Col md={2} sm={2} lg={2} xs={2} className="p-l-0 text-end">
              <span className="m-l-10">
                <ButtonComponent
                  route={"/"}
                  className="btn btn-secondary btn-sm font-12 btn-small-width close-button"
                  label={t("dealers.list.page.advanced.close.button")}
                  onClick={() => {
                    dispatch(setSearchTerms(""));
                    dispatch(setSearchCriteria("Beginning"));
                    dispatch(setSelectedStatus("All"));
                  }}
                />
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default StatePermitsSearchFilter;
