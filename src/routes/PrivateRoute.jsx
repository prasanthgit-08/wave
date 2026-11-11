import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useProcessExit from "../hooks/useProcessExit";
import useProcessEntry from "../hooks/useProcessEntry";
import CommonModal from "../components/common/commonModal";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
