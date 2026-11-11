import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingIcon from "../componenets/common/LoadingIcon";
import packageJson from "../../package.json";

const PublicRoute = () => {
  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);

  const isAppInitialized = useSelector((state) => state.userAuth.isAppInitialized);
  const isAuthenticated = (isLoggedIn || loggedIn) && localStorage.getItem("accessToken");

  if (!isAppInitialized) {
    return <LoadingIcon />;
  }

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div>
      <Outlet />;
      <span className="position-absolute bottom-0 end-0 p-3 pe-4 fw-bolder fs-6 text-secondary">
        {"v" + packageJson.version}
      </span>
    </div>
  );
};

export default PublicRoute;
