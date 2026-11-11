/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllDriversData,
  setChangeColor,
  setLoader,
  setSelectedId,
  setTotalElements,
  setTotalPages,
} from "../../../redux/LookupScreens/DriverLookupSlice";
import YardCheckinService from "../../../services/shutte/process/YardCheckinService";
import EditShuttleService from "../../../services/shuttle/process/EditShuttleService";

function DriverSelectionLookupListing({
  renderItemId,
  companyName,
  handleLookupSelection,
  MaintenanceProgram,
  ShuttleProcess,
}) {
  const allDriversData = useSelector((state) => state.driverLookup.allDriversData);
  const loader = useSelector((state) => state.driverLookup.loader);
  const selectedSearchCriteria = useSelector((state) => state.driverLookup.selectedSearchCriteria);
  const firstName = useSelector((state) => state.driverLookup.firstNameFilter);
  const lastName = useSelector((state) => state.driverLookup.lastNameFilter);
  const changeColor = useSelector((state) => state.driverLookup.changeColor);
  const selectedId = useSelector((state) => state.driverLookup.selectedId);
  const pageNumber = useSelector((state) => state.driverLookup.pageNumber);

  const dispatch = useDispatch();

  const fetchDriversForMaintenance = (
    selectedSearchCriteria,
    firstName,
    lastName,
    pageNumber,
    companyName
  ) => {
    YardCheckinService.fetchDriversForLookup(
      selectedSearchCriteria,
      firstName,
      lastName,
      pageNumber,
      companyName
    )
      .then((response) => {
        const data = response.data;
        dispatch(setAllDriversData(data.content));
        dispatch(setLoader(false));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        dispatch(setLoader(false));
      });
  };

  const fetchDriversForShuttleProcess = () => {
    EditShuttleService.fetchDriversForLookup(selectedSearchCriteria, firstName, lastName, pageNumber)
      .then((response) => {
        const data = response.data;
        const driversList = data.content?.map((driver) => ({
          ...driver,
          firstName: driver.firstName?.trim(),
        }));
        dispatch(setAllDriversData(driversList));
        dispatch(setLoader(false));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        dispatch(setLoader(false));
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      if (MaintenanceProgram) {
        fetchDriversForMaintenance(selectedSearchCriteria, firstName, lastName, pageNumber, companyName);
      } else if (ShuttleProcess) {
        fetchDriversForShuttleProcess();
      }
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, firstName, lastName, pageNumber]);

  const renderDriverListingData = allDriversData?.map((driver) => (
    <tr
      id="rowId"
      key={renderItemId(driver)}
      onClick={(event) => {
        handleLookupSelection(driver, event);
        dispatch(setChangeColor(true));
        dispatch(setSelectedId(renderItemId(driver)));
      }}
      className={renderItemId(driver) === selectedId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600">{driver.firstName}</td>
      <td className="f-w-600">{driver.lastName}</td>
      <td className="f-w-600">{driver.city}</td>
      <td className="f-w-600">{driver.state}</td>
    </tr>
  ));

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>State</th>
          </tr>
        </thead>
        {!loader && allDriversData.length !== 0 && <tbody>{renderDriverListingData}</tbody>}
      </table>
      {loader ? (
        <div className="loadingStyling">
          <div className="loader"></div>
          Loading...
        </div>
      ) : (
        allDriversData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
}

export default DriverSelectionLookupListing;
