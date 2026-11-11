import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DriverSelectionContent from "./DriverSelectionContent";
import {
  setCheckinAdv,
  setCityStateCheck,
  setDriverData,
  setEpuScreen,
  setEtaScreen,
  setFormData,
  setInitialApiLoader,
  setIsCityState,
  setTotalElements,
  setTotalPages,
  setUnitId,
} from "../../../../redux/DriverCheckinSlice";
import { useState } from "react";
import FormFooter from "../FormFooter";
import FormHeader from "../FormHeader";
import DriverCheckinService from "../../../../services/DriverCheckinService";

function DriverSelectionMainPage() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const firstName = useSelector((state) => state.driverCheckinReducer.firstName);
  const lastName = useSelector((state) => state.driverCheckinReducer.lastName);
  const pageNumber = useSelector((state) => state.driverCheckinReducer.pageNumber);
  const sortValue = useSelector((state) => state.driverCheckinReducer.sortValue);
  const sortType = useSelector((state) => state.driverCheckinReducer.sortType);
  const searchCriteria = useSelector((state) => state.driverCheckinReducer.searchCriteria);
  const active = useSelector((state) => state.driverCheckinReducer.active);
  const activeString = useSelector((state) => state.driverCheckinReducer.activeString);
  const deleased = useSelector((state) => state.driverCheckinReducer.deleased);
  const companyName = useSelector((state) => state.driverCheckinReducer.companyName);
  const companyFK = useSelector((state) => state.driverCheckinReducer.companyFK);

  useEffect(() => {
    localStorage.removeItem("fromServiceCheckin");
  }, []);

  const fetchDriver = () => {
    dispatch(setInitialApiLoader(true)); // Start loader
    DriverCheckinService.getDriver(
      searchCriteria,
      pageNumber,
      firstName,
      lastName,
      active,
      activeString,
      deleased,
      sortValue,
      sortType,
      companyName,
      companyFK
    )
      .then((res) => {
        dispatch(setDriverData(res.data.content));
        dispatch(setTotalElements(res.data.totalElements));
        dispatch(setTotalPages(res.data.totalPages));
        dispatch(setInitialApiLoader(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setInitialApiLoader(false));
      });
  };

  useEffect(() => {
    dispatch(setFormData(""));
    dispatch(setIsCityState(false));
    dispatch(setCityStateCheck(false));
    dispatch(setEpuScreen(false));
    dispatch(setEtaScreen(false));
    dispatch(setUnitId(null));
    dispatch(setCheckinAdv(false));
  }, []);
  const fromServiceCheckin = localStorage.getItem("fromServiceCheckin") === "true";
  useEffect(() => {
    // will remove after testing, need to check if it is working fine with service checkin
    // if (!fromServiceCheckin && companyFK) fetchDriver();
    if (!companyFK) return;
    const debounceFetch = setTimeout(fetchDriver, 500);
    return () => clearTimeout(debounceFetch);
  }, [searchCriteria, firstName, lastName, sortType, sortValue, pageNumber, companyName, companyFK]);

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <FormHeader />
        <DriverSelectionContent loader={loader} />
        <FormFooter />
      </div>
    </div>
  );
}

export default DriverSelectionMainPage;
