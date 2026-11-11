import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Row, Col } from "react-bootstrap";
import ButtonComponent from "../../common/Button";
import { RadioGroup, Radio } from "react-radio-group";
import InputField from "../../common/InputField";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  setViewDetail,
  setEditYardData,
  setSearchTerm,
  setSelectedSearchCriteria,
  resetChanges,
  setSelectedStatus,
  setPageNumber,
  resetClose,
} from "../../../redux/YardMaintenanceSlice";
import QuarterScreen from "../../../styles/QuarterScreen.module.css";
import { Navigate } from "react-router-dom";
function YardSearchFilter() {
  const navigate = useNavigate();

  const [searchTerms, setSearchTerms] = useState("");

  const selectedSearchCriteria = useSelector((state) => state.yardMaintenanceReducer.selectedSearchCriteria);
  const editYardData = useSelector((state) => state.yardMaintenanceReducer.editYardData);
  const selectedStatus = useSelector((state) => state.yardMaintenanceReducer.selectedStatus);
  const globalSearchTerm = useSelector((state) => state.yardMaintenanceReducer.searchTerm);
  const dispatch = useDispatch();

  const handleFirstRadioGroupOnChange = (value) => {
    dispatch(setSelectedSearchCriteria(value));
    dispatch(setPageNumber(0));
  };

  const globalSearchHandleChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
    setSearchTerms(event.target.value);
    dispatch(setPageNumber(0));
  };
  const handleSecondRadioGroupOnChange = (value) => {
    dispatch(setSelectedStatus(value));
    dispatch(setPageNumber(0));
  };
  useEffect(() => {
    if (searchTerms === "" && globalSearchTerm !== "") setSearchTerms(globalSearchTerm);
  }, []);
  const onCloseNew = () => {
    dispatch(resetClose());
  };
  return (
    <Row className="border border-dark border-2 p-t-10 p-b-10">
      <Col md={12}>
        <Row className="m-0 p-0">
          <Col md={9} sm={9} lg={9} xs={9} className="p-l-0">
            <div className="d-flex align-items-center justify-content-between">
              <div className={`d-flex align-items-center ${QuarterScreen.searchBox}`}>
                <span className="p-r-20">
                  <ButtonComponent
                    route={"/add-yard-maintenance"}
                    className={`btn btn-secondary btn-sm ${QuarterScreen.btnSmallWidth} font-12`}
                    label={t("dealers.list.page.new.button")}
                    onClick={() => {
                      dispatch(setViewDetail(undefined));
                      dispatch(setEditYardData(undefined));
                      dispatch(resetChanges());
                    }}
                  />
                </span>

                <span className="p-l-20">
                  <label className={`f-w-600 m-r-15 ${QuarterScreen.label}`}>
                    {t("dealers.list.page.search.button")}
                  </label>
                  <InputField
                    type="search"
                    name="searchTerms"
                    value={searchTerms}
                    autoComplete="off"
                    aria-autocomplete="list"
                    placeholder={t("dealers.list.page.global.search")}
                    autocomplete="autocomplete_off_randString"
                    onChange={(e) => {
                      globalSearchHandleChange(e);
                    }}
                  />
                </span>
              </div>

              <div className="d-flex align-items-center">
                <RadioGroup
                  name="searchCriteria"
                  selectedValue={selectedSearchCriteria}
                  onChange={handleFirstRadioGroupOnChange}
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

              <div className="d-flex flex-column">
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
                    <Radio value="Active" />
                    <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.active")}</label>
                  </div>

                  <div className="d-flex align-items-center m-b-5">
                    <Radio value="Inactive" />
                    <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.inactive")}</label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </Col>

          <Col md={2} sm={2} lg={2} xs={2} className="p-l-0 text-end align-items-center ">
            <ButtonComponent
              route={"/"}
              className={`btn btn-secondary btn-sm ${QuarterScreen.btnSmallWidth} font-12 close-button`}
              label={t("dealers.list.page.advanced.close.button")}
              onClick={onCloseNew}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default YardSearchFilter;
