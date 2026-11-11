import React, { useState, useEffect } from "react";
import { t } from "i18next";
import { setAdvanceSortedValue } from "../../../../../redux/UserMaintenanceSearchFilterSlice";
import { useDispatch, useSelector } from "react-redux";

export const UserMaintenanceAdvanceSort = (props) => {
  const { setFirstField, setSecondField } = props;

  const [nameOptions1, setNameOptions1] = useState(false);
  const [nameOptions2, setNameOptions2] = useState(false);

  const [loginOptions1, setLoginOptions1] = useState(false);
  const [loginOptions2, setLoginOptions2] = useState(false);

  const advanceSortedValue = {
    nameOptions1,
    nameOptions2,
    loginOptions1,
    loginOptions2,
  };

  const dispatch = useDispatch();

  const advanceSortValue = useSelector((state) => state.userMaintenanceReducer.advanceSortedValue);

  useEffect(() => {
    if (null != advanceSortValue) {
      setNameOptions1(advanceSortValue.nameOptions1);
      setNameOptions2(advanceSortValue.nameOptions2);
      setLoginOptions1(advanceSortValue.loginOptions1);
      setLoginOptions2(advanceSortValue.loginOptions2);
    }
  }, []);

  useEffect(() => {
    dispatch(setAdvanceSortedValue(advanceSortedValue));
  }, [nameOptions1, nameOptions2, loginOptions1, loginOptions2]);

  return (
    <div className="col-md-12">
      <form>
        <br></br>
        <div className="form-group">
          <label>{t("dealers.list.page.table.heading.name")}</label>
        </div>
        <div className="form-group">
          {/* Name 1st */}
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
              disabled={nameOptions2 || loginOptions1}
            />
            <label className="form-check-label">{t("dealers.list.page.advanced.sort.first")}</label>
          </div>

          {/* Name 2nd */}
          {(nameOptions1 || loginOptions1) && (
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
                disabled={nameOptions1 || loginOptions2}
              />
              <label className="form-check-label">{t("dealers.list.page.advanced.sort.second")}</label>
            </div>
          )}
        </div>
        <br></br>

        <div className="form-group">
          <label>Login</label>
        </div>

        <div className="form-group">
          {/* Login 1st */}
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="loginOptions1"
              id="loginRadio1"
              checked={loginOptions1 === false ? false : true}
              value={loginOptions1}
              onClick={(e) => {
                loginOptions1 === false
                  ? setLoginOptions1(true) || setFirstField("login")
                  : setLoginOptions1(false) || setFirstField(null);
              }}
              disabled={nameOptions1 || loginOptions2}
            />
            <label className="form-check-label">{t("dealers.list.page.advanced.sort.first")}</label>
          </div>

          {/* Login 2nd */}
          {(nameOptions1 || loginOptions1) && (
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                checked={loginOptions2}
                name="dbaOptions2"
                id="dbaRadio2"
                value={loginOptions2}
                onClick={(e) => {
                  loginOptions2 === false
                    ? setLoginOptions2(true) || setSecondField("login")
                    : setLoginOptions2(false) || setSecondField(null);
                }}
                disabled={nameOptions2 || loginOptions1}
              />
              <label className="form-check-label">{t("dealers.list.page.advanced.sort.second")}</label>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserMaintenanceAdvanceSort;
