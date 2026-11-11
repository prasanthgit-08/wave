import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../EditDriverInvoice/Footer";
import DriverServicesService from "../../../../services/DriverServicesService";
import DriverSelectionContent from "./DriverSelectionContent";
import DriverInvoiceHeader from "./DriverInvoiceHeader";

import {
  setChangeColor,
  setCustomerEmail,
  setDeleasedDriver,
  setDriverData,
  setDriverInvoiceTextData,
  setFirstName,
  setInvoiceDetailsData,
  setLastName,
  setManualEntryData,
  setManualSaveFlag,
  setPageNumber,
  setSearchCriteria,
  setSearchTerms,
  setSelectedStatus,
  setSortType,
  setSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/DriverInvoiceSlice";

function DriverInvoiceSelection() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const firstName = useSelector((state) => state.driverInvoiceReducer.firstName);
  const lastName = useSelector((state) => state.driverInvoiceReducer.lastName);
  const pageNumber = useSelector((state) => state.driverInvoiceReducer.pageNumber);
  const sortValue = useSelector((state) => state.driverInvoiceReducer.sortValue);
  const sortType = useSelector((state) => state.driverInvoiceReducer.sortType);
  const driverSearchCriteria = useSelector((state) => state.driverInvoiceReducer.driverSearchCriteria);
  const active = useSelector((state) => state.driverInvoiceReducer.active);
  const activeString = useSelector((state) => state.driverInvoiceReducer.activeString);
  const deleased = useSelector((state) => state.driverInvoiceReducer.deleased);
  const searchTerm = useSelector((state) => state.driverInvoiceReducer.searchTerm);
  const selectedStatus = useSelector((state) => state.driverInvoiceReducer.selectedStatus);
  const driverId = useSelector((state) => state.driverInvoiceReducer.driverId);

  const fetchDriver = () => {
    setLoader(true);
    DriverServicesService.getInvoiceDriver(
      driverSearchCriteria,
      pageNumber,
      firstName,
      lastName,
      active,
      activeString,
      deleased,
      sortValue,
      sortType,
      selectedStatus
    )
      .then((res) => {
        dispatch(setDriverData(res?.data?.content));
        dispatch(setTotalElements(res?.data?.totalElements));
        dispatch(setTotalPages(res?.data?.totalPages));
        dispatch(setDeleasedDriver(res?.data?.content[0].deleased));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    dispatch(setManualSaveFlag(false));
    dispatch(setDriverInvoiceTextData([]));
    dispatch(setManualEntryData([]));
    dispatch(setInvoiceDetailsData([]));
  }, []);

  useEffect(() => {
    if (!driverId) {
      dispatch(setSearchTerms(""));
      dispatch(setSearchCriteria("Beginning"));
      dispatch(setSelectedStatus("All"));
      dispatch(setFirstName(""));
      dispatch(setLastName(""));
      dispatch(setPageNumber(0));
      dispatch(setSortValue(null));
      dispatch(setSortType(null));
      dispatch(setChangeColor(false));
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: "invoiceDetailsData/setInvoiceDetailsData",
      payload: {
        type: "clear",
      },
    });
  }, []);

  useEffect(() => {
    fetchDriver();
  }, [
    driverSearchCriteria,
    firstName,
    lastName,
    sortType,
    pageNumber,
    selectedStatus,
    searchTerm,
    sortValue,
  ]);
  useEffect(() => {
    dispatch(setInvoiceDetailsData({ type: "clear" }));
  }, []);

  useEffect(() => {
    dispatch(setCustomerEmail(""));
  }, []);

  return (
    <div className="add-form-component p-0 customContainer">
      <div
        className="add-form-component threeFourthScreenWidth border border-dark border-2"
        style={{ height: "830px", width: "1445px", margin: "1px" }}
      >
        <DriverInvoiceHeader />
        <DriverSelectionContent loader={loader} />
        <Footer />
      </div>
    </div>
  );
}

export default DriverInvoiceSelection;
