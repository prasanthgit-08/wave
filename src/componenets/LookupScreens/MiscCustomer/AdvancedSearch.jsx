import React, { useEffect, useState } from "react";
import { setSearchedCustomer } from "../../../redux/LookupScreens/MiscCustomerLookupSlice";
import { useDispatch, useSelector } from "react-redux";

import { t } from "i18next";
import InputField from "../../common/InputField";
import { setPageNumber } from "../../../redux/LookupScreens/MiscCustomerLookupSlice";
import { Col, Row } from "react-bootstrap";

const AdvancedSearch = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");

  const searchedCustomerCondititon = useSelector((state) => state.miscCustomerLookupReducer.searchedCustomer);

  const dispatch = useDispatch();

  const onHandleAdvanceSearch = () => {
    setName(
      name === "" && searchedCustomerCondititon != null && searchedCustomerCondititon.name != ""
        ? searchedCustomerCondititon.name
        : name
    );
    setCity(
      city === "" && searchedCustomerCondititon != null && searchedCustomerCondititon.city != ""
        ? searchedCustomerCondititon.city
        : city
    );
    setStateCode(
      stateCode === "" && searchedCustomerCondititon != null && searchedCustomerCondititon.stateCode != ""
        ? searchedCustomerCondititon.stateCode
        : stateCode
    );
    dispatch(
      setSearchedCustomer({
        name: name,
        city: city,
        stateCode: stateCode,
      })
    );
  };

  const handleAdvanceSearch = (event) => {
    dispatch(
      setSearchedCustomer({
        name: event.target.name === "name" ? event.target.value : name,
        city: event.target.name === "city" ? event.target.value : city,
        stateCode: event.target.name === "stateCode" ? event.target.value : stateCode,
      })
    );
  };

  useEffect(() => {
    dispatch(
      setSearchedCustomer({
        name: name,
        city: city,
        stateCode: stateCode,
      })
    );
  }, [name, city, stateCode]);

  useEffect(() => {
    onHandleAdvanceSearch();
  }, []);

  return (
    <form>
      <div className="form-group d-flex flex-column m-b-10">
        <label>{t("dealers.list.page.table.heading.name")}</label>
        <InputField
          type="search"
          name="name"
          maxLength={30}
          value={name}
          onInput={(e) => {
            setName(e.target.value);
            handleAdvanceSearch(e);
          }}
          className="form-control rounded-0 h-25px"
          onFocus={(e) => (dispatch(setPageNumber(0)), e.target.setAttribute("autocomplete", "off"))}
        />
      </div>

      <div className="form-group d-flex flex-column m-b-10">
        <label>{t("dealers.list.page.table.heading.city")}</label>
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
      </div>

      <div className="form-group d-flex flex-column m-b-10">
        <label>{t("dealers.list.page.table.heading.state")}</label>

        <InputField
          type="search"
          name="stateCode"
          maxLength={2}
          value={stateCode}
          onInput={(e) => {
            setStateCode(e.target.value.toUpperCase());
            handleAdvanceSearch(e);
          }}
          className="form-control rounded-0 h-25px w-40px "
          onFocus={(e) => (dispatch(setPageNumber(0)), e.target.setAttribute("autocomplete", "off"))}
        />
      </div>
    </form>
  );
};

export default AdvancedSearch;
