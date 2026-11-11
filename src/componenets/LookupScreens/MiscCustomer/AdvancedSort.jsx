import { t } from "i18next";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdvanceSortedValue } from "../../../redux/LookupScreens/MiscCustomerLookupSlice";

const AdvancedSort = ({ setFirstField, setSecondField, setThirdField }) => {
  const [nameOptions1, setNameOptions1] = useState(false);
  const [nameOptions2, setNameOptions2] = useState(false);
  const [nameOptions3, setNameOptions3] = useState(false);
  const [cityOptions1, setCityOptions1] = useState(false);
  const [cityOptions2, setCityOptions2] = useState(false);
  const [cityOptions3, setCityOptions3] = useState(false);
  const [stateOptions1, setStateOptions1] = useState(false);
  const [stateOptions2, setStateOptions2] = useState(false);
  const [stateOptions3, setStateOptions3] = useState(false);
  const advanceSortedValue = {
    nameOptions1,
    nameOptions2,
    nameOptions3,
    cityOptions1,
    cityOptions2,
    cityOptions3,
    stateOptions1,
    stateOptions2,
    stateOptions3,
  };

  const dispatch = useDispatch();

  const advanceSortValue = useSelector((state) => state.miscCustomerLookupReducer.advanceSortedValue);

  useEffect(() => {
    if (null != advanceSortValue) {
      setNameOptions1(advanceSortValue.nameOptions1);
      setNameOptions2(advanceSortValue.nameOptions2);
      setNameOptions3(advanceSortValue.nameOptions3);
      setCityOptions1(advanceSortValue.cityOptions1);
      setCityOptions2(advanceSortValue.cityOptions2);
      setCityOptions3(advanceSortValue.cityOptions3);
      setStateOptions1(advanceSortValue.stateOptions1);
      setStateOptions2(advanceSortValue.stateOptions2);
      setStateOptions3(advanceSortValue.stateOptions3);
    }
  }, []);

  useEffect(() => {
    dispatch(setAdvanceSortedValue(advanceSortedValue));
  }, [
    nameOptions1,
    nameOptions2,
    nameOptions3,
    cityOptions1,
    cityOptions2,
    cityOptions3,
    stateOptions1,
    stateOptions2,
    stateOptions3,
  ]);

  return (
    <div className="col-md-12">
      <form>
        <br></br>
        <div className="form-group">
          <label>{t("dealers.list.page.table.heading.name")}</label>
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              checked={nameOptions1 === false ? false : true}
              name="nameOptions1"
              id="nameRadio1"
              value={nameOptions1}
              onClick={(e) => {
                nameOptions1 === false
                  ? setNameOptions1(true) || setFirstField("name")
                  : setNameOptions1(false) || setFirstField(null);
              }}
              disabled={cityOptions1 || stateOptions1 || nameOptions2 || nameOptions3}
              style={
                cityOptions3 || stateOptions3 || cityOptions2 || stateOptions2 === true
                  ? { pointerEvents: "none" }
                  : {}
              }
            />
            <label className="form-check-label">{t("dealers.list.page.advanced.sort.first")}</label>
          </div>

          {(nameOptions1 || cityOptions1 || stateOptions1) && (
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                checked={nameOptions2 === false ? false : true}
                name="nameOptions2"
                id="nameRadio2"
                value={nameOptions2}
                onClick={(e) => {
                  nameOptions2 === false
                    ? setNameOptions2(true) || setSecondField("name")
                    : setNameOptions2(false) || setSecondField(null);
                }}
                disabled={cityOptions2 || stateOptions2 || nameOptions1 || nameOptions3}
                style={cityOptions3 || stateOptions3 === true ? { pointerEvents: "none" } : {}}
              />
              <label className="form-check-label">{t("dealers.list.page.advanced.sort.second")}</label>
            </div>
          )}

          {(nameOptions2 || cityOptions2 || stateOptions2) && (
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                checked={nameOptions3 === false ? false : true}
                name="nameOptions3"
                id="nameRadio3"
                value={nameOptions3}
                onClick={(e) => {
                  nameOptions3 === false
                    ? setNameOptions3(true) || setThirdField("name")
                    : setNameOptions3(false) || setThirdField(null);
                }}
                disabled={cityOptions3 || stateOptions3 || nameOptions1 || nameOptions2}
                style={cityOptions3 || stateOptions3 === true ? { pointerEvents: "none" } : {}}
              />
              <label className="form-check-label">{t("dealers.list.page.advanced.sort.third")}</label>
            </div>
          )}
        </div>
        <br></br>

        <div className="form-group">
          <label>{t("dealers.list.page.table.heading.city")}</label>
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              checked={cityOptions1 === false ? false : true}
              name="cityOptions1"
              id="cityadio1"
              value={cityOptions1}
              onClick={(e) => {
                cityOptions1 === false
                  ? setCityOptions1(true) || setFirstField("city")
                  : setCityOptions1(false) || setFirstField(null);
              }}
              disabled={nameOptions1 || stateOptions1 || cityOptions2 || cityOptions3}
              style={
                stateOptions3 || nameOptions3 || nameOptions2 || stateOptions2 === true
                  ? { pointerEvents: "none" }
                  : {}
              }
            />
            <label className="form-check-label">{t("dealers.list.page.advanced.sort.first")}</label>
          </div>

          {(nameOptions1 || cityOptions1 || stateOptions1) && (
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                checked={cityOptions2 === false ? false : true}
                name="cityOptions2"
                id="cityRadio2"
                value={cityOptions2}
                onClick={(e) => {
                  cityOptions2 === false
                    ? setCityOptions2(true) || setSecondField("city")
                    : setCityOptions2(false) || setSecondField(null);
                }}
                disabled={nameOptions2 || stateOptions2 || cityOptions1 || cityOptions3}
                style={stateOptions3 || nameOptions3 === true ? { pointerEvents: "none" } : {}}
              />
              <label className="form-check-label">{t("dealers.list.page.advanced.sort.second")}</label>
            </div>
          )}

          {(nameOptions2 || cityOptions2 || stateOptions2) && (
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                checked={cityOptions3 === false ? false : true}
                name="cityOptions3"
                id="cityRadio3"
                value={cityOptions3}
                onClick={(e) => {
                  cityOptions3 === false
                    ? setCityOptions3(true) || setThirdField("city")
                    : setCityOptions3(false) || setThirdField(null);
                }}
                disabled={nameOptions3 || stateOptions3 || cityOptions1 || cityOptions2}
                style={nameOptions3 || stateOptions3 === true ? { pointerEvents: "none" } : {}}
              />
              <label className="form-check-label">{t("dealers.list.page.advanced.sort.third")}</label>
            </div>
          )}
        </div>
        <br></br>

        <div className="form-group">
          <label>{t("dealers.list.page.table.heading.state")}</label>
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              checked={stateOptions1 === false ? false : true}
              name="stateOptions1"
              id="stateRadio1"
              value={stateOptions1}
              onClick={(e) => {
                stateOptions1 === false
                  ? setStateOptions1(true) || setFirstField("stateCode")
                  : setStateOptions1(false) || setFirstField(null);
              }}
              disabled={cityOptions1 || nameOptions1 || stateOptions2 || stateOptions3}
              style={
                nameOptions3 || cityOptions3 || nameOptions2 || cityOptions2 === true
                  ? { pointerEvents: "none" }
                  : {}
              }
            />
            <label className="form-check-label">{t("dealers.list.page.advanced.sort.first")}</label>
          </div>

          {(nameOptions1 || cityOptions1 || stateOptions1) && (
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                checked={stateOptions2}
                name="stateOptions2"
                id="stateRadio2"
                value={stateOptions2}
                onClick={(e) => {
                  stateOptions2 === false
                    ? setStateOptions2(true) || setSecondField("stateCode")
                    : setStateOptions2(false) || setSecondField(null);
                }}
                disabled={cityOptions2 || nameOptions2 || stateOptions1 || stateOptions3}
                style={nameOptions3 || cityOptions3 === true ? { pointerEvents: "none" } : {}}
              />
              <label className="form-check-label">{t("dealers.list.page.advanced.sort.second")}</label>
            </div>
          )}

          {(nameOptions2 || cityOptions2 || stateOptions2) && (
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                checked={stateOptions3}
                name="stateOptions3"
                id="stateRadio3"
                value={stateOptions3}
                onClick={(e) => {
                  stateOptions3 === false
                    ? setStateOptions3(true) || setThirdField("stateCode")
                    : setStateOptions3(false) || setThirdField(null);
                }}
                disabled={cityOptions3 || nameOptions3 || stateOptions1 || stateOptions2}
                style={nameOptions3 || cityOptions3 === true ? { pointerEvents: "none" } : {}}
              />
              <label className="form-check-label">{t("dealers.list.page.advanced.sort.third")}</label>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdvancedSort;
