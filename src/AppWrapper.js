import React, { useEffect } from "react";
import App from "./App";
import useGlobalInputTrim from "./hooks/useGlobalInputTrim";
import { useDispatch } from "react-redux";
import { checkAuthorization, setInitialized } from "./store/slices/userAuth.slice";
import { updateFavicon } from "./utils/utils";

const AppWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    updateFavicon();
  }, []);

  useEffect(() => {
    dispatch(checkAuthorization());
    dispatch(setInitialized()); //  Always mark initialized
  }, [dispatch]);

  useGlobalInputTrim();
  return <App />;
};

export default AppWrapper;
