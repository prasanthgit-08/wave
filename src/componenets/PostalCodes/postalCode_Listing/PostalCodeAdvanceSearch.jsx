import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { t } from "i18next";
import InputField from "../../common/InputField";
import { Col, Row } from "react-bootstrap";
import { setPageNumber, setSearchedPostalCode } from "../../../redux/PostalCodeSlice";

export const PostalCodeAdvanceSearch = () => {
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const searchedPostalCodeCondition = useSelector((state) => state.postalCodeReducer.searchedPostalCode);
  const advanceSortValue = useSelector((state) => state.postalCodeReducer.advanceSortValue);

  useEffect(() => {
    dispatch(
      setSearchedPostalCode({
        postalCode: postalCode,
        city: city,
        stateCode: stateCode,
      })
    );
  }, [postalCode, city, stateCode]);

  useEffect(() => {
    onHandleAdvanceSearch();
  }, []);

  const dispatch = useDispatch();

  const onHandleAdvanceSearch = () => {
    setPostalCode(
      postalCode === "" && searchedPostalCodeCondition != null && searchedPostalCodeCondition.postalCode != ""
        ? searchedPostalCodeCondition.postalCode
        : postalCode
    );

    setCity(
      city === "" && searchedPostalCodeCondition != null && searchedPostalCodeCondition.city != ""
        ? searchedPostalCodeCondition.city
        : city
    );

    setStateCode(
      stateCode === "" && searchedPostalCodeCondition != null && searchedPostalCodeCondition.stateCode != ""
        ? searchedPostalCodeCondition.stateCode
        : stateCode
    );

    dispatch(
      setSearchedPostalCode({
        postalCode: postalCode,
        city: city,
        stateCode: stateCode,
      })
    );
  };

  const handleAdvanceSearch = (event) => {
    dispatch(
      setSearchedPostalCode({
        postalCode: event.target.name === "postalCode" ? event.target.value : postalCode,

        city: event.target.name === "city" ? event.target.value : city,

        stateCode: event.target.name === "stateCode" ? event.target.value : stateCode,
      })
    );
  };

  return (
    <form>
      <div className="mt-2 form-group d-flex flex-column m-b-10">
        <label>Postal Code</label>
        <Col md={3} sm={3} lg={3} xs={3} className="p-l-0">
          <InputField
            type="search"
            name="postalcode"
            maxLength={10}
            value={postalCode}
            onInput={(e) => {
              setPostalCode(e.target.value);
              handleAdvanceSearch(e);
            }}
            className="form-control rounded-0 h-25px"
            onFocus={(e) => (dispatch(setPageNumber(0)), e.target.setAttribute("autocomplete", "off"))}
          />
        </Col>
      </div>

      <div className="form-group d-flex flex-column m-b-10">
        <label>{t("dealers.list.page.table.heading.city")}</label>
        <Col md={8} sm={8} lg={8} xs={8} className="p-l-0">
          <InputField
            type="search"
            name="city"
            maxLength={30}
            value={city}
            onInput={(e) => {
              setCity(e.target.value);
              handleAdvanceSearch(e);
            }}
            className="form-control rounded-0 h-25px"
            onFocus={(e) => (dispatch(setPageNumber(0)), e.target.setAttribute("autocomplete", "off"))}
          />
        </Col>
      </div>

      <div className="form-group d-flex flex-column m-b-10">
        <label>{t("dealers.list.page.table.heading.state")}</label>
        <Col md={2} sm={2} lg={2} xs={2} className="p-l-0">
          <InputField
            type="search"
            name="stateCode"
            maxLength={2}
            value={stateCode}
            onInput={(e) => {
              handleAdvanceSearch(e);
              setStateCode(e.target.value);
            }}
            className="form-control rounded-0 h-25px w-40px "
            onFocus={(e) => (dispatch(setPageNumber(0)), e.target.setAttribute("autocomplete", "off"))}
          />
        </Col>
      </div>
    </form>
  );
};
