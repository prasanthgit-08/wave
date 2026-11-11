import React, { useEffect, useState } from "react";
import InputField from "../../common/InputField";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedUser, setUserLookupPageNumber } from "../../../redux/LookupScreens/UserLookupSlice";
const AdvancedSearch = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const dispatch = useDispatch();
  const searchedUser = useSelector((state) => state.userLookupReducer.searchedUser);

  useEffect(() => {
    dispatch(
      setSearchedUser({
        name: name,
        login: login,
      })
    );
  }, [name, login]);

  useEffect(() => {
    onHandleAdvanceSearch();
  }, []);

  const onHandleAdvanceSearch = () => {
    setName(name === "" && searchedUser != null && searchedUser.name != "" ? searchedUser.name : name);

    setLogin(login === "" && searchedUser != null && searchedUser.login != "" ? searchedUser.login : login);

    dispatch(
      setSearchedUser({
        name: name,
        login: login,
      })
    );
  };

  const handleAdvanceSearch = (event) => {
    dispatch(
      setSearchedUser({
        name: event.target.name === "name" ? event.target.value : name,
        login: event.target.login === "login" ? event.target.value : login,
      })
    );
  };
  return (
    <form>
      <div className="form-group d-flex flex-column m-b-10">
        <label>Name</label>
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
          onFocus={(e) => (
            dispatch(setUserLookupPageNumber(0)),
            e.target.setAttribute("autocomplete", "off")
          )}
        />
      </div>

      <div className="form-group d-flex flex-column m-b-10">
        <label>Login</label>
        <InputField
          type="search"
          name="login"
          maxLength={30}
          value={login}
          onInput={(e) => {
            setLogin(e.target.value);
            handleAdvanceSearch(e);
          }}
          className="form-control rounded-0 h-25px"
          onFocus={(e) => (
            dispatch(setUserLookupPageNumber(0)),
            e.target.setAttribute("autocomplete", "off")
          )}
        />
      </div>
    </form>
  );
};

export default AdvancedSearch;
