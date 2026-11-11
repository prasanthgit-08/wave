import React, { useEffect, useState } from "react";
import { setSearchedDealer } from "../../../redux/LookupScreens/MiscDealerLookupSlice";
import { useDispatch, useSelector } from "react-redux";

import { t } from "i18next";
import InputField from "../../common/InputField";
import { setPageNumber } from "../../../redux/LookupScreens/MiscDealerLookupSlice";
import { Col, Row } from "react-bootstrap";

const AdvancedSearch = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");

  const searchedDealerCondititon = useSelector((state) => state.miscDealerLookupReducer.searchedDealer);

  const onHandleAdvanceSearch = () => {
    setName(
      name === "" && searchedDealerCondititon != null && searchedDealerCondititon.name != ""
        ? searchedDealerCondititon.name
        : name
    );
    setCity(
      city === "" && searchedDealerCondititon != null && searchedDealerCondititon.city != ""
        ? searchedDealerCondititon.city
        : city
    );
    setStateCode(
      stateCode === "" && searchedDealerCondititon != null && searchedDealerCondititon.stateCode != ""
        ? searchedDealerCondititon.stateCode
        : stateCode
    );
    dispatch(
      setSearchedDealer({
        name: name,
        city: city,
        stateCode: stateCode,
      })
    );
  };

  const handleAdvanceSearch = (event) => {
    dispatch(
      setSearchedDealer({
        name: event.target.name === "name" ? event.target.value : name,
        city: event.target.name === "city" ? event.target.value : city,
        stateCode: event.target.name === "stateCode" ? event.target.value : stateCode,
      })
    );
  };

  useEffect(() => {
    dispatch(
      setSearchedDealer({
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
          value={stateCode.toUpperCase()}
          onInput={(e) => {
            setStateCode(e.target.value);
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
