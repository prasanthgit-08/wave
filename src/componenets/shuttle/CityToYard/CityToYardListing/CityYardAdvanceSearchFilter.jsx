import { t } from "i18next";
import React, { useEffect } from "react";
import ButtonComponent from "../../../common/Button";
import { RadioGroup, Radio } from "react-radio-group";
import { Row, Col } from "react-bootstrap";
import InputField from "../../../common/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  setCity,
  setDescription,
  setPageNumber,
  setSearchCity,
  setSearchDescription,
  setSearchedUser,
  setSearchingCondititon,
} from "../../../../redux/CityToYardSlice";

function CityYardAdvanceSearchFilter() {
  const dispatch = useDispatch();
  const searchingCondititon = useSelector((state) => state.cityToYardReducer.searchingCondititon);
  const city = useSelector((state) => state.cityToYardReducer.city);
  const description = useSelector((state) => state.cityToYardReducer.description);

  useEffect(() => {
    dispatch(setSearchDescription(description));
    dispatch(setSearchCity(city));
  }, [description, city]);

  useEffect(() => {
    onHandleAdvanceSearch();
  }, []);

  const onHandleAdvanceSearch = () => {
    dispatch(
      setDescription(
        description === "" && searchingCondititon !== null && searchingCondititon.description !== ""
          ? searchingCondititon.description
          : description
      )
    );

    dispatch(
      setCity(
        city === "" && searchingCondititon !== null && searchingCondititon.city !== ""
          ? searchingCondititon.city
          : city
      )
    );

    dispatch(setSearchDescription(description));
    dispatch(setSearchCity(city));
  };

  const handleAdvanceSearch = (event) => {
    dispatch(
      setSearchDescription({
        description: event.target.name === "description" ? event.target.value : description,
      })
    );
    dispatch(setSearchCity({ city: event.target.name === "city" ? event.target.value : city }));
  };
  return (
    <form>
      <Col xs={12} md={12} sm={12}>
        <div className="mt-3 form-group d-flex flex-column m-b-10">
          <label>{t("dealers.list.page.table.heading.city")}</label>
          <InputField
            type="search"
            name="city"

            maxLength={30}
            value={city}
            onInput={(e) => {
              dispatch(setCity(e.target.value));
              handleAdvanceSearch(e);
            }}
            onFocus={(e) => dispatch(setPageNumber(0))}
          />
        </div>
      </Col>
      <Col xs={12} md={12} sm={12}>
        <div className="form-group d-flex flex-column m-b-10">
          <label>{"Yard"}</label>
          <InputField
            type="search"
            name="description"
            maxLength={30}

            value={description}
            onInput={(e) => {
              dispatch(setDescription(e.target.value));
              handleAdvanceSearch(e);
            }}
            onFocus={(e) => dispatch(setPageNumber(0))}
          />
        </div>
      </Col>
    </form>
  );
}

export default CityYardAdvanceSearchFilter;
