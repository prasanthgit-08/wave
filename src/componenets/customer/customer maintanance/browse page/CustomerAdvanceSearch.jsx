import React, { useEffect, useState } from "react";
import { setSearchedDealer } from "../../../../redux/DealerSearchFilterSlice";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import { setPageNumber } from "../../../../redux/PaginationSlice";
import InputField from "../../../common/InputField";
import { setSearchedCustomer } from "../../../../redux/CustomerSearchFilterSlice";

export const CustomerAdvanceSearch = () => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [dba, setDba] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");

  const searchingCondititon = useSelector((state) => state.customerSearchFilterReducer.searchedCustomer);

  useEffect(() => {
    dispatch(
      setSearchedCustomer({
        description: description,
        name: name,
        dba: dba,
        city: city,
        stateCode: stateCode,
      })
    );
  }, [description, name, dba, city, stateCode]);

  useEffect(() => {
    onHandleAdvanceSearch();
  }, []);

  const dispatch = useDispatch();

  const onHandleAdvanceSearch = () => {
    setDescription(
      description === "" && searchingCondititon != null && searchingCondititon.description != ""
        ? searchingCondititon.description
        : description
    );

    setName(
      name === "" && searchingCondititon != null && searchingCondititon.name != ""
        ? searchingCondititon.name
        : name
    );

    setDba(
      dba === "" && searchingCondititon != null && searchingCondititon.dba != ""
        ? searchingCondititon.dba
        : dba
    );

    setCity(
      city === "" && searchingCondititon != null && searchingCondititon.city != ""
        ? searchingCondititon.city
        : city
    );

    setStateCode(
      stateCode === "" && searchingCondititon != null && searchingCondititon.stateCode != ""
        ? searchingCondititon.stateCode
        : stateCode
    );

    dispatch(
      setSearchedCustomer({
        description: description,
        name: name,
        dba: dba,
        city: city,
        stateCode: stateCode,
      })
    );
  };

  const handleAdvanceSearch = (event) => {
    dispatch(
      setSearchedCustomer({
        description: event.target.name === "description" ? event.target.value : description,
        name: event.target.name === "name" ? event.target.value : name,
        dba: event.target.name === "dba" ? event.target.value : dba,

        city: event.target.name === "city" ? event.target.value : city,

        stateCode: event.target.name === "stateCode" ? event.target.value : stateCode,
      })
    );
  };

  return (
    <form>
      <div className="form-group d-flex flex-column m-b-10">
        <label>{t("customers.browse.page.table.heading.description")}</label>
        <InputField
          type="text"
          name="description"
          maxLength={30}
          value={description}
          onInput={(e) => {
            setDescription(e.target.value);
            handleAdvanceSearch(e);
          }}
          className="form-control rounded-0 h-25px"
          onFocus={(e) => dispatch(setPageNumber(0))}
        />
      </div>

      <div className="form-group d-flex flex-column m-b-10">
        <label>{t("dealers.list.page.table.heading.name")}</label>
        <InputField
          type="text"
          name="name"
          maxLength={30}
          value={name}
          onInput={(e) => {
            setName(e.target.value);
            handleAdvanceSearch(e);
          }}
          className="form-control rounded-0 h-25px"
          onFocus={(e) => dispatch(setPageNumber(0))}
        />
      </div>

      <div className="form-group d-flex flex-column m-b-10">
        <label>{t("dealers.list.page.table.heading.dba")}</label>
        <InputField
          type="text"
          name="dba"
          maxLength={30}
          value={dba}
          onInput={(e) => {
            handleAdvanceSearch(e);
            setDba(e.target.value);
          }}
          className="form-control rounded-0 h-25px"
          onFocus={(e) => dispatch(setPageNumber(0))}
        />
      </div>

      <div className="form-group d-flex flex-column m-b-10">
        <label>{t("dealers.list.page.table.heading.city")}</label>
        <InputField
          type="text"
          name="city"
          maxLength={30}
          value={city}
          onInput={(e) => {
            setCity(e.target.value);
            handleAdvanceSearch(e);
          }}
          className="form-control rounded-0 h-25px"
          onFocus={(e) => dispatch(setPageNumber(0))}
        />
      </div>

      <div className="form-group d-flex flex-column m-b-10">
        <label>{t("dealers.list.page.table.heading.state")}</label>

        <InputField
          type="text"
          name="stateCode"
          maxLength={2}
          value={stateCode?.toUpperCase()}
          onInput={(e) => {
            handleAdvanceSearch(e);
            setStateCode(e.target.value);
          }}
          className="form-control rounded-0 h-25px w-40px "
          onFocus={(e) => dispatch(setPageNumber(0))}
        />
      </div>
    </form>
  );
};
