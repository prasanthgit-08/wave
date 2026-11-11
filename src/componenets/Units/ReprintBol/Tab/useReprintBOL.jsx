import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useReprintBOL = () => {
  const bolFor = useSelector((state) => state.reprintBolReducer.bolFor);
  const navigate = useNavigate();
  const handleChangeTab = () => {
    switch (bolFor) {
      case "driver":
        return navigate("/reprint-driver-selection");

      case "Dispatches":
        return navigate("/reprint-dispatch-selection-screen");

      case "Units":
        return navigate("/unit-status-selection-reprint");

      case "shuttle":
        return navigate("/unit-status-selection-reprint");

      default:
        return navigate("/reprint-selection-screen");
    }
  };

  return {
    handleChangeTab,
  };
};
