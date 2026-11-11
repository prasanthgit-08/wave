import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { RadioGroup, Radio } from "react-radio-group";
import { t } from "i18next";
import ButtonComponent from "../../../common/Button";
import InputField from "../../../common/InputField";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";

const RoutesSearchFilter = (props) => {
  const {
    searchTerm,
    searchCriteria,
    pageNumber,
    addNewRoute,
    closeRoute,
    setSearchTerm,
    setSearchCriteria,
    setPageNumber,
    fetchTableData,
    handleClickNew,
    handleClickClose,
    sequenceRoute,
    handleClickSequence,
  } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, searchCriteria, pageNumber]);

  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0">
            <Col md={12} sm={12} lg={12} xs={12} className="p-l-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className={`d-flex align-items-center ${QuarterScreen.searchBox}`}>
                  <span className="p-r-20">
                    <ButtonComponent
                      route={addNewRoute}
                      className={`btn btn-secondary btn-sm ${QuarterScreen.btnSmallWidth} font-12`}
                      label={t("quarter.screen.new")}
                      onClick={handleClickNew}
                    />
                  </span>
                  <span className="p-l-20">
                    <label className={`f-w-600 m-r-15 ${QuarterScreen.label}`}>
                      {t("quarter.screen.search")}
                    </label>
                    <InputField
                      type="search"
                      name="searchTerm"
                      value={searchTerm}
                      onChange={(e) => {
                        dispatch(setSearchTerm(e.target.value));
                        dispatch(setPageNumber(0));
                      }}
                      aria-autocomplete="list"
                      autoComplete="off"
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
                      <label className={`f-w-600 m-l-5 ${QuarterScreen.label}`}>
                        {t("quarter.screen.beginning")}
                      </label>
                    </div>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Contains" />
                      <label className={`f-w-600 m-l-5 ${QuarterScreen.label}`}>
                        {t("quarter.screen.contains")}
                      </label>
                    </div>
                  </RadioGroup>
                </div>
                <span className="m-l-10">
                  <ButtonComponent
                    route={sequenceRoute}
                    className={`btn btn-secondary btn-sm ${QuarterScreen.btnSmallWidth} font-12`}
                    label={"Sequence"}
                    onClick={handleClickSequence}
                  />
                </span>

                <span className="m-l-10">
                  <ButtonComponent
                    route={closeRoute ? closeRoute : ""}
                    className={`btn btn-secondary btn-sm ${QuarterScreen.btnSmallWidth} font-12 close-button`}
                    label={t("quarter.screen.close")}
                    onClick={handleClickClose}
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

export default RoutesSearchFilter;
