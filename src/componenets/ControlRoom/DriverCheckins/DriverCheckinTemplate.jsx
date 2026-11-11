import React, { useEffect } from "react";
import { useState } from "react";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import FormHeader from "./FormHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDriverId } from "../../../redux/DriverCheckinSlice";

function DriverCheckinTemplate() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  const driverId = useSelector((state) => state.driverCheckinReducer.driverId);
  useEffect(() => {
    if (!driverId) {
      const driverId = localStorage.getItem("driverId");

      if (driverId) {
        dispatch(setDriverId(driverId));
      }
    }
  }, [dispatch]);

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <FormHeader />
        <FormContent loader={loader} />
        <FormFooter />
      </div>
    </div>
  );
}

export default DriverCheckinTemplate;
