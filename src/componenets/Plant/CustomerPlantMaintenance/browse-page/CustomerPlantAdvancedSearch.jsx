import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import InputField from "../../../common/InputField";
import { setSearchedCustomerPlant, setPageNumber } from "../../../../redux/CustomerPlantSearchFilterSlice";

export const CustomerPlantAdvancedSearch = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [productLine, setProductLine] = useState("");

  const searchingCondititon = useSelector(
    (state) => state.customerPlantSearchFilterReducer.searchedCustomerPlant
  );

  useEffect(() => {
    dispatch(
      setSearchedCustomerPlant({
        name: name,
        brand: brand,
        productLine: productLine,
      })
    );
  }, [name, brand, productLine]);

  useEffect(() => {
    onHandleAdvanceSearch();
  }, []);

  const onHandleAdvanceSearch = () => {
    setName(
      name === "" && searchingCondititon != null && searchingCondititon.name != ""
        ? searchingCondititon.name
        : name
    );

    setBrand(
      brand === "" && searchingCondititon != null && searchingCondititon.brand != ""
        ? searchingCondititon.brand
        : brand
    );

    setProductLine(
      productLine === "" && searchingCondititon != null && searchingCondititon.productLine != ""
        ? searchingCondititon.productLine
        : productLine
    );

    dispatch(
      setSearchedCustomerPlant({
        name: name,
        brand: brand,
        productLine: productLine,
      })
    );
  };

  const handleAdvanceSearch = (event) => {
    dispatch(
      setSearchedCustomerPlant({
        name: event.target.name === "name" ? event.target.value : name,
        brand: event.target.name === "brand" ? event.target.value : brand,
        productLine: event.target.name === "productLine" ? event.target.value : productLine,
      })
    );
  };

  return (
    <form className="col-md-12 m-t-15 m-b-15">
      <div className="form-group d-flex flex-column m-b-10">
        <label>{t("customer.plant.list.page.table.heading.name")}</label>
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
        <label>{t("customer.plant.list.page.table.heading.brandname")}</label>
        <InputField
          type="search"
          name="dba"
          maxLength={30}
          value={brand}
          onInput={(e) => {
            handleAdvanceSearch(e);
            setBrand(e.target.value);
          }}
          className="form-control rounded-0 h-25px"
          onFocus={(e) => (dispatch(setPageNumber(0)), e.target.setAttribute("autocomplete", "off"))}
        />
      </div>

      <div className="form-group d-flex flex-column m-b-10">
        <label>{t("customer.plant.list.page.table.heading.productline")}</label>
        <InputField
          type="search"
          name="city"
          maxLength={30}
          value={productLine}
          onInput={(e) => {
            setProductLine(e.target.value);
            handleAdvanceSearch(e);
          }}
          className="form-control rounded-0 h-25px"
          onFocus={(e) => (dispatch(setPageNumber(0)), e.target.setAttribute("autocomplete", "off"))}
        />
      </div>
    </form>
  );
};
