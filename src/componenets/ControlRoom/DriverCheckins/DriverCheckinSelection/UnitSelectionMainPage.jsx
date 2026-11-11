import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompanyFK,
  setCompanyName,
  setDriverId,
  setFirstName,
  setInitialApiLoader,
  setLastName,
  setTotalElementsForUnit,
  setTotalPagesForUnit,
  setUnitData,
  setUnitSelectionLoader,
} from "../../../../redux/DriverCheckinSlice";
import UnitSelectionContent from "./UnitSelectionContent";
import DriverCheckinService from "../../../../services/DriverCheckinService";
import DelayProcessingService from "../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import DriverService from "../../../../services/DriverService";
import { useParams } from "react-router-dom";
import FormFooter from "../FormFooter";
import FormHeader from "../FormHeader";

function UnitSelectionMainPage() {
  const fromServiceCheckin = localStorage.getItem("fromServiceCheckin") === "true";

  const dispatch = useDispatch();
  // Start in loading state so "No Records" isn't flashed before the first fetch completes
  const [loader, setLoader] = useState(true);
  const lastPayloadRef = useRef(null);

  const sortValueOfunit = useSelector((state) => state.driverCheckinReducer.sortValueOfunit);
  const unitId = useSelector((state) => state.driverCheckinReducer.unitId);
  const companyName = useSelector((state) => state.driverCheckinReducer.companyName);
  const companyFK = useSelector((state) => state.driverCheckinReducer.companyFK);
  const firstName = useSelector((state) => state.driverCheckinReducer.firstName);
  const lastName = useSelector((state) => state.driverCheckinReducer.lastName);

  const { driverId } = useParams();

  const sortType1 = useSelector((state) => state.driverCheckinReducer.sortType1);
  const pageNumberForUnitSelection = useSelector(
    (state) => state.driverCheckinReducer.pageNumberForUnitSelection
  );

  const fetchUnitForDriver = () => {
    setLoader(true);
    dispatch(setUnitSelectionLoader(true));

    DriverCheckinService.fetchUnitSelectionData(
      pageNumberForUnitSelection,
      driverId,
      sortValueOfunit,
      sortType1,
      companyName,
      companyFK
    )
      .then((res) => {
        dispatch(setUnitData(res.data.content));
        dispatch(setTotalElementsForUnit(res.data.totalElements));
        dispatch(setTotalPagesForUnit(res.data.totalPages));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
        dispatch(setUnitSelectionLoader(false));
      });
  };

  useEffect(() => {
    if (companyFK && companyName) {
      const newPayload = {
        pageNumberForUnitSelection,
        driverId,
        sortValueOfunit,
        sortType1,
        companyName,
        companyFK,
      };

      const isSamePayload = JSON.stringify(newPayload) === JSON.stringify(lastPayloadRef.current);

      if (!isSamePayload) {
        lastPayloadRef.current = newPayload;
        fetchUnitForDriver();
      }
    }
  }, [
    companyName,
    companyFK,
    pageNumberForUnitSelection,
    sortValueOfunit,
    sortType1,
    unitId,
    driverId,
    fromServiceCheckin,
  ]);

  useEffect(() => {
    if (driverId) {
      dispatch(setDriverId(driverId));
    }
  }, [driverId]);

  // On a direct page refresh, the redux company selection is lost, which
  // otherwise leaves fetchUnitForDriver permanently blocked. Fall back to
  // the local company, same as DriverSelectionContent does on first load.
  // Skipped for the Driver Services check-in flow, where UnitSelectionContent
  // already loads the company list and sets the local company.
  useEffect(() => {
    if (!fromServiceCheckin && (!companyFK || !companyName)) {
      dispatch(setUnitSelectionLoader(true));
      const stopLoader = () => {
        setLoader(false);
        dispatch(setUnitSelectionLoader(false));
      };
      DelayProcessingService.getAllCompanyData()
        .then((res) => {
          const localCompany = res?.data?.find((item) => item.LocalCompany === true);
          if (localCompany) {
            dispatch(setCompanyFK(localCompany.CompanyPK));
            dispatch(setCompanyName(localCompany.Name));
          } else {
            stopLoader();
          }
        })
        .catch((err) => {
          console.log(err);
          stopLoader();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The driver name in redux is also lost on a page refresh; restore it from the driverId in the URL.
  useEffect(() => {
    if (!fromServiceCheckin && driverId && !firstName && !lastName) {
      DriverService.getDriverRecordById(driverId)
        .then((res) => {
          dispatch(setFirstName(res?.data?.firstName ?? ""));
          dispatch(setLastName(res?.data?.lastName ?? ""));
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driverId]);

  useEffect(() => {
    dispatch(setInitialApiLoader(false));
  }, [dispatch]);

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <FormHeader />
        <UnitSelectionContent loader={loader} />
        <FormFooter />
      </div>
    </div>
  );
}

export default UnitSelectionMainPage;
