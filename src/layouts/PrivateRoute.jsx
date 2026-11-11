import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingIcon from "../componenets/common/LoadingIcon";
import PrivateNavbar from "../components/common/privateNavbar";
import useProcessExit from "../hooks/useProcessExit";
import useProcessEntry from "../hooks/useProcessEntry";
import CommonModal from "../components/common/commonModal";

const PrivateRoute = () => {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);

  const isAppInitialized = useSelector((state) => state.userAuth.isAppInitialized);
  useProcessExit();
  const { error, clearError, exitUrl } = useProcessEntry();

  if (!isAppInitialized) {
    return <LoadingIcon />;
  }

  return (
    <>
      {/* <PrivateNavbar /> it is needed, but now already have header, so it will uncomment in future  */}
      {isLoggedIn || loggedIn ? (
        <>
          <Outlet />
          <CommonModal
            show={error}
            onHide={() => {
              clearError();
              navigate(exitUrl);
            }}
            title={`Warning !!`}
            body={error}
            handleOK={() => {
              clearError();
              navigate(exitUrl);
            }}
            showOK
            color={error ? "red" : ""}
          />
        </>
      ) : (
        <Navigate to="/login" />
      )}
      ;
    </>
  );
};

export default PrivateRoute;
