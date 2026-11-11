import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import { Row, Col } from "react-bootstrap";
import ButtonComponent from "../../common/Button";
import { RadioGroup, Radio } from "react-radio-group";
import InputField from "../../common/InputField";
import PrinterService from "../../../services/PrinterService";
import { useNavigate } from "react-router-dom";

import {
  setTotalElements,
  setTotalPages,
  setPageNumber,
  setSearchTerms,
  setSearchCriteria,
  setChangeColor,
  setPrinterDataList,
  setLoader,
  setSortType,
  setSortValue,
} from "../../../redux/PrinterSearchFilterSlice";
import { resetChanges } from "../../../redux/EditPrinterSlice";

export const PrinterSearchFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageNumber = useSelector((state) => state.printerSearchReducer.pageNumber);
  const searchReduxCriteria = useSelector((state) => state.printerSearchReducer.searchCriteria);
  const searchReduxTerm = useSelector((state) => state.printerSearchReducer.searchTerms);
  const [searchTerm, setFormSearchTerm] = useState(searchReduxTerm);
  const [searchFormCriteria, setSearchFormCriteria] = useState(searchReduxCriteria);
  const sortValue = useSelector((state) => state.printerSearchReducer.sortValue);
  const sortType = useSelector((state) => state.printerSearchReducer.sortType);

  const handleNewButton = () => {
    dispatch(resetChanges());
    navigate("/add-printer");
  };

  useEffect(() => {
    dispatch(setLoader(true));
    const debounceFunction = setTimeout(() => {
      fetchPrinters();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchFormCriteria, searchTerm, pageNumber, searchReduxCriteria, sortValue, sortType]);

  const navigateToHome = () => {
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerms(""));
    dispatch(setChangeColor(false));
    dispatch(setSortType(false));
    dispatch(setSortValue(""));
  };

  const fetchPrinters = () => {
    dispatch(setLoader(true));
    PrinterService.getPrinters(pageNumber, searchTerm, searchFormCriteria, sortValue, sortType)
      .then((response) => {
        const data = response.data;
        dispatch(setPrinterDataList(data.content));
        // dispatch(setChangeColor(true));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((error) => console.error(error))
      .finally(() => dispatch(setLoader(false)));
  };

  const globalSearchHandleChange = (event) => {
    dispatch(setSearchTerms(event.target.value));
    setFormSearchTerm(event.target.value);
    dispatch(setPageNumber(0));
  };
  const handleRadioGroupOnChange = (value) => {
    setSearchFormCriteria(value);
    dispatch(setSearchCriteria(value));
    dispatch(setPageNumber(0));
  };

  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0 justify-content-between">
            <Col /* md={6} sm={6} lg={5} */ xs={6} className="p-l-0">
              <div className="d-flex align-items-center justify-content-start">
                <div className="d-flex flex-nowrap col-7 align-items-center ">
                  <span className="p-r-20">
                    <ButtonComponent
                      route={"/add-printer"}
                      className="btn btn-secondary btn-sm font-12 btn-small-width"
                      label={t("dealers.list.page.new.button")}
                      onClick={handleNewButton}
                    />
                  </span>

                  <span className="p-l-20 d-flex flex-nowrap ">
                    <label className="f-w-600 m-r-15">{t("dealers.list.page.search.button")}</label>
                    <InputField
                      type="search"
                      name="searchTerms"
                      value={searchReduxTerm}
                      autoComplete="off"
                      aria-autocomplete="list"
                      placeholder={t("dealers.list.page.global.search")}
                      className=""
                      onChange={(e) => {
                        globalSearchHandleChange(e);
                      }}
                      autocomplete="autocomplete_off_randString"
                    />
                  </span>
                </div>

                <div className="d-flex align-items-center ms-5">
                  <RadioGroup
                    name="searchCriteria"
                    selectedValue={searchReduxCriteria}
                    onChange={handleRadioGroupOnChange}
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
              </div>
            </Col>

            <Col /* md={4} sm={4} lg={4} */ xs={4} className="p-l-0 text-end">
              <span className="m-l-10">
                <ButtonComponent
                  route={"/"}
                  className="btn btn-secondary btn-sm font-12 btn-small-width close-button"
                  label={t("dealers.list.page.advanced.close.button")}
                  onClick={navigateToHome}
                />
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
