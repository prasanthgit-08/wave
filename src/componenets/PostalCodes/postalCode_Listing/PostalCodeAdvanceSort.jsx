import React, { useState, useEffect } from "react";
import { t } from "i18next";
import { setAdvanceSortedValue } from "../../../redux/PostalCodeSlice";
import { useDispatch, useSelector } from "react-redux";

export const PostalCodeAdvanceSort = (props) => {
  const { setFirstField, setSecondField, setThirdField } = props;

  const [postalCodeOptions1, setPostalCodeOptions1] = useState(false);
  const [postalCodeOptions2, setPostalCodeOptions2] = useState(false);
  const [postalCodeOptions3, setPostalCodeOptions3] = useState(false);
  const [cityOptions1, setCityOptions1] = useState(false);
  const [cityOptions2, setCityOptions2] = useState(false);
  const [cityOptions3, setCityOptions3] = useState(false);
  const [stateOptions1, setStateOptions1] = useState(false);
  const [stateOptions2, setStateOptions2] = useState(false);
  const [stateOptions3, setStateOptions3] = useState(false);

  const advanceSortedValue = {
    postalCodeOptions1,
    postalCodeOptions2,
    postalCodeOptions3,
    cityOptions1,
    cityOptions2,
    cityOptions3,
    stateOptions1,
    stateOptions2,
    stateOptions3,
  };

  const dispatch = useDispatch();

  const advanceSortValue = useSelector((state) => state.postalCodeReducer.advanceSortedValue);

  useEffect(() => {
    if (null != advanceSortValue) {
      setPostalCodeOptions1(advanceSortValue.postalCodeOptions1);
      setPostalCodeOptions2(advanceSortValue.postalCodeOptions2);
      setPostalCodeOptions3(advanceSortValue.postalCodeOptions3);
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
    postalCodeOptions1,
    postalCodeOptions2,
    postalCodeOptions3,
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
          <label>Postal Code</label>
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              checked={postalCodeOptions1 === false ? false : true}
              name="postalCodeOptions1"
              id="postalCodeOptions1"
              value={postalCodeOptions1}
              onClick={(e) => {
                postalCodeOptions1 === false
                  ? setPostalCodeOptions1(true) || setFirstField("postalCode")
                  : setPostalCodeOptions1(false) || setFirstField(null);
              }}
              disabled={cityOptions1 || stateOptions1 || postalCodeOptions2 || postalCodeOptions3}
              style={
                cityOptions3 || stateOptions3 || cityOptions2 || stateOptions2 === true
                  ? { pointerEvents: "none" }
                  : {}
              }
            />
            <label className="form-check-label">{t("dealers.list.page.advanced.sort.first")}</label>
          </div>

          {(postalCodeOptions1 || cityOptions1 || stateOptions1) && (
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                checked={postalCodeOptions2 === false ? false : true}
                name="postalCodeOptions2"
                id="postalCodeOptions2"
                value={postalCodeOptions2}
                onClick={(e) => {
                  postalCodeOptions2 === false
                    ? setPostalCodeOptions2(true) || setSecondField("postalCode")
                    : setPostalCodeOptions2(false) || setSecondField(null);
                }}
                disabled={cityOptions2 || stateOptions2 || postalCodeOptions1 || postalCodeOptions3}
                style={
                  cityOptions3 || stateOptions3 || cityOptions3 || stateOptions3 === true
                    ? { pointerEvents: "none" }
                    : {}
                }
              />
              <label className="form-check-label">{t("dealers.list.page.advanced.sort.second")}</label>
            </div>
          )}

          {(postalCodeOptions2 || cityOptions2 || stateOptions2) && (
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                checked={postalCodeOptions3 === false ? false : true}
                name="postalCodeOptions3"
                id="postalCodeOptions3"
                value={postalCodeOptions3}
                onClick={(e) => {
                  postalCodeOptions3 === false
                    ? setPostalCodeOptions3(true) || setThirdField("postalCode")
                    : setPostalCodeOptions3(false) || setThirdField(null);
                }}
                disabled={cityOptions3 || stateOptions3 || postalCodeOptions1 || postalCodeOptions2}
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
              id="cityOptions1"
              value={cityOptions1}
              onClick={(e) => {
                cityOptions1 === false
                  ? setCityOptions1(true) || setFirstField("city")
                  : setCityOptions1(false) || setFirstField(null);
              }}
              disabled={postalCodeOptions1 || stateOptions1 || cityOptions2 || cityOptions3}
              style={
                postalCodeOptions3 || stateOptions3 || postalCodeOptions2 || stateOptions2 === true
                  ? { pointerEvents: "none" }
                  : {}
              }
            />
            <label className="form-check-label">{t("dealers.list.page.advanced.sort.first")}</label>
          </div>

          {(postalCodeOptions1 || cityOptions1 || stateOptions1) && (
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
                disabled={postalCodeOptions2 || stateOptions2 || cityOptions1 || cityOptions3}
                style={stateOptions3 || postalCodeOptions3 === true ? { pointerEvents: "none" } : {}}
              />
              <label className="form-check-label">{t("dealers.list.page.advanced.sort.second")}</label>
            </div>
          )}

          {(postalCodeOptions2 || cityOptions2 || stateOptions2) && (
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
                disabled={postalCodeOptions3 || stateOptions3 || cityOptions1 || cityOptions2}
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
              disabled={cityOptions1 || postalCodeOptions1 || stateOptions2 || stateOptions3}
              style={
                postalCodeOptions3 || cityOptions3 || postalCodeOptions2 || cityOptions2 === true
                  ? { pointerEvents: "none" }
                  : {}
              }
            />
            <label className="form-check-label">{t("dealers.list.page.advanced.sort.first")}</label>
          </div>

          {(postalCodeOptions1 || cityOptions1 || stateOptions1) && (
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
                disabled={cityOptions2 || postalCodeOptions2 || stateOptions1 || stateOptions3}
                style={postalCodeOptions3 || cityOptions3 === true ? { pointerEvents: "none" } : {}}
              />
              <label className="form-check-label">{t("dealers.list.page.advanced.sort.second")}</label>
            </div>
          )}

          {(postalCodeOptions2 || cityOptions2 || stateOptions2) && (
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
                disabled={cityOptions3 || postalCodeOptions3 || stateOptions1 || stateOptions2}
              />
              <label className="form-check-label">{t("dealers.list.page.advanced.sort.third")}</label>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
