/* eslint-disable react-hooks/exhaustive-deps */
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChangeColor,
  setListingData,
  setLoading,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedId,
  setTotalElements,
  setTotalPages,
} from "../../../redux/LookupScreens/DriverLookupSlice";
import NoRecordsMessage from "../../common/NoRecordsMessage";
import EditShuttleService from "../../../services/shuttle/process/EditShuttleService";
import AscendingIcon from "../../common/AscendingIcon";
import DescendingIcon from "../../common/DescendingIcon";
import UnitSelectionService from "../../../services/EditMaster/UnitSelectionService";
import DriverService from "../../../services/DriverService";
import YardCheckinService from "../../../services/shuttle/process/YardCheckinService";
import ProcessPayService from "../../../services/ProcessPayService";
import EditYardUnitEditContent from "../../shuttle/Process/EditYardUnit/EditYardUnitEdit/EditYardUnitEditContent";
import EditYardUnitService from "../../../services/shuttle/process/EditYardUnitService";
import UnitActivationService from "../../../services/UnitActivationService";
import { FullScreenLookup_RecordsPerPage } from "../../../services/constants/applicationConstants";
import DamageReportService from "../../../services/DamageReportService";
import LoadingIcon from "../../common/LoadingIcon";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  customServiceCallback,
  showActiveOnly,
  EditShuttle,
  EditYardUnit,
  YardCheckin,
  companyName,
  UnitActivation,
  ExcludeDriver,
  excludeDriverId,
  setNameFirst,
  setNameSecond,
  recruitingDriver,
  shuttleReport,
  unitException,
  DamageReport,
  fetchFunction,
  renderCol1,
  renderCol2,
  renderCol3,
  renderCol4,
}) => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.driverLookup.loading);
  const selectedId = useSelector((state) => state.driverLookup.selectedId);
  const changeColor = useSelector((state) => state.driverLookup.changeColor);
  const listingData = useSelector((state) => state.driverLookup.listingData);
  const pageNumber = useSelector((state) => state.driverLookup.pageNumber);

  const advancedSearchObject = useSelector((state) => state.driverLookup.advancedSearchObject);
  const advancedSearchPayload = useSelector((state) => state.driverLookup.advancedSearchPayload);

  const showAdvancedSort = useSelector((state) => state.driverLookup.showAdvancedSort);
  const advancedSortingOrder = useSelector((state) => state.driverLookup.advancedSortingOrder);
  const normalSortFlag = useSelector((state) => state.driverLookup.normalSortFlag);
  const normalSortValue = useSelector((state) => state.driverLookup.normalSortValue);

  const searchTerm = useSelector((state) => state.driverLookup.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.driverLookup.selectedSearchCriteria);
  const advancedSearchString = useSelector((state) => state.driverLookup.advancedSearchString);
  const advancedSearchByInputs = useSelector((state) => state.driverLookup.advancedSearchByInputs);
  const advancedSortingCombination = useSelector((state) => state.driverLookup.advancedSortingCombination);
  const checkAllAdvancedSearchBy = useSelector((state) => state.driverLookup.checkAllAdvancedSearchBy);

  const driverType = useSelector((state) => state.driverLookup.driverType);
  const statusType = useSelector((state) => state.driverLookup.statusType);
  const cityType = useSelector((state) => state.driverLookup.cityType);

  const [sortingColumn, setSortingColumn] = useState(null);

  /**
   *  Driver Selection Browse Fetch function
   **/
  const getAllDriversForLookup = () => {
    dispatch(setLoading(true));
    DriverService.getAllDriversForLookup(
      searchTerm,
      statusType,
      driverType,
      cityType,
      pageNumber,
      selectedSearchCriteria,
      advancedSearchPayload,
      advancedSortingOrder,
      normalSortValue,
      normalSortFlag,

      advancedSearchString,
      advancedSearchByInputs
    )
      .then((response) => {
        const { data } = response;
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };

  const getAllDriversOwnerForLookup = () => {
    dispatch(setLoading(true));
    DriverService.getAllDriversForLookup(
      searchTerm,
      statusType,
      driverType,
      cityType,
      pageNumber,
      selectedSearchCriteria,
      advancedSearchPayload,
      advancedSortingOrder,
      normalSortValue,
      normalSortFlag,

      advancedSearchString,
      advancedSearchByInputs,
      excludeDriverId
    )
      .then((response) => {
        const { data } = response;
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };

  const fetchCallbackForSP = (fetchFunction) => {
    dispatch(setLoading(true));
    fetchFunction({
      type: "Lookup",
      pageSize: FullScreenLookup_RecordsPerPage,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerm,
      pageNumber: pageNumber,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      advancedSortingOrder: advancedSortingOrder,
      advancedSearchObject: advancedSearchPayload,

      driverType: driverType,
      statusType: statusType,
      cityType: cityType,
      advancedSearchString: advancedSearchString,

      all: checkAllAdvancedSearchBy,
      dba: advancedSearchByInputs?.dba,
      address: advancedSearchByInputs?.dba,
      ssnOrEin: advancedSearchByInputs?.dba,
      phone: advancedSearchByInputs?.phone,
      email: advancedSearchByInputs?.email,
      vin: advancedSearchByInputs?.vin,
      licensePlate: advancedSearchByInputs?.licensePlate,
      nickName: advancedSearchByInputs?.nickName,
      driversLicense: advancedSearchByInputs?.driversLicense,
      notes: advancedSearchByInputs?.notes,
    })
      .then((response) => {
        const { data } = response;
        const paginationData = data?.find((item) => item?.Type === "Pagination");
        const filteredList = data
          ?.filter((item) => item?.Type !== "Pagination")
          .map((item) => ({
            ...item,
            DriverName: `${item?.FirstName?.trim() || ""} ${item?.LastName?.trim() || ""}`?.trim(),
          }));
        dispatch(setListingData(filteredList || []));
        dispatch(setTotalElements(paginationData.TotalElements || 0));
        dispatch(setTotalPages(paginationData.TotalPages || 0));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };

  /**
   *  Fetch all Drivers from UnitShuttles
   **/
  const getAllUnitShuttleDriversForLookup = () => {
    dispatch(setLoading(true));
    EditShuttleService.fetchDriversForLookup(
      searchTerm,
      statusType,
      driverType,
      cityType,
      pageNumber,
      selectedSearchCriteria,
      advancedSearchPayload,
      advancedSortingOrder,
      normalSortValue,
      normalSortFlag,
      advancedSearchString,
      advancedSearchByInputs
    )
      .then((response) => {
        const { data } = response;
        const driversList = data.content?.map((driver) => ({
          ...driver,
          firstName: driver.firstName?.trim(),
        }));
        dispatch(setListingData(driversList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };

  // Fetch all drivers for YardCheckin
  const getAllDriversForLookupYardCheckin = () => {
    dispatch(setLoading(true));
    YardCheckinService.fetchDriversForLookup(
      searchTerm,
      statusType,
      driverType,
      cityType,
      pageNumber,
      selectedSearchCriteria,
      advancedSearchPayload,
      advancedSortingOrder,
      normalSortValue,
      normalSortFlag,
      advancedSearchString,
      advancedSearchByInputs,
      companyName
    )
      .then((response) => {
        const { data } = response;
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };

  const getAllDriversForEdit = () => {
    dispatch(setLoading(true));
    EditYardUnitService.getAllDriversForLookup(
      searchTerm,
      statusType,
      driverType,
      cityType,
      pageNumber,
      selectedSearchCriteria,
      advancedSearchPayload,
      advancedSortingOrder,
      normalSortValue,
      normalSortFlag,
      advancedSearchString,
      advancedSearchByInputs
    )
      .then((response) => {
        const { data } = response;
        const driversList = data.content?.map((driver) => ({
          ...driver,
          firstName: driver.firstName?.trim(),
        }));
        dispatch(setListingData(driversList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };

  const getAllDriversForUnitActivation = () => {
    dispatch(setLoading(true));
    UnitActivationService.getAllDriversForLookup(
      searchTerm,
      statusType,
      driverType,
      cityType,
      pageNumber,
      selectedSearchCriteria,
      advancedSearchPayload,
      advancedSortingOrder,
      normalSortValue,
      normalSortFlag,
      advancedSearchString,
      advancedSearchByInputs,
      companyName
    )
      .then((response) => {
        const { data } = response;
        const driversList = data.content?.map((driver) => ({
          ...driver,
          firstName: driver.firstName?.trim(),
        }));
        dispatch(setListingData(driversList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };
  const customFetchCallback = (customServiceCallback) => {
    dispatch(setLoading(true));
    customServiceCallback()
      .then((response) => {
        const { data } = response;
        const driversList = data.content?.map((driver) => ({
          ...driver,
          firstName: driver.firstName?.trim(),
        }));
        dispatch(setListingData(driversList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };

  const handleObject = (driver) => {
    const obj = {
      driverPK: driver?.DriverPK,
      driverName: driver?.DriverName?.trim(),
      firstName: driver?.FirstName?.trim(),
      lastName: driver?.LastName?.trim(),
      city: driver.City?.trim(),
      state: driver.StateCode?.trim(),
    };
    return obj;
  };

  const getAllRecruitingDriversForLookUp = () => {
    dispatch(setLoading(true));
    DriverService.getDriverForAutoAndLookUP({
      type: "Lookup",
      pageNumber,
      pageSize: FullScreenLookup_RecordsPerPage,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      searchTerm,
      searchCriteria: selectedSearchCriteria,
      unitTypeSearchCriteria: driverType,
      status: statusType,
      addressType: cityType,
      ...advancedSortingOrder,
      advancedSearchString: advancedSearchString,
      all: checkAllAdvancedSearchBy,
      ssnOrEin: advancedSearchByInputs?.ssn,
      ...advancedSearchByInputs,
      ...advancedSearchPayload,
    })
      .then((response) => {
        const { data } = response;
        const driversList = data?.slice(0, data?.length - 1).map((driver) => handleObject(driver));
        dispatch(setListingData(driversList));
        const Pagination = data?.slice(data?.length - 1);
        dispatch(setTotalElements(Pagination[0]?.TotalElements));
        dispatch(setTotalPages(Pagination[0]?.TotalPages));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };

  const getAllDriversForUnitException = () => {
    dispatch(setLoading(true));
    DriverService.getDriverForForUnitException({
      type: "Lookup",
      pageNumber,
      pageSize: FullScreenLookup_RecordsPerPage,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      searchTerm,
      searchCriteria: selectedSearchCriteria,
      unitTypeSearchCriteria: driverType,
      status: statusType,
      addressType: cityType,
      ...advancedSortingOrder,
      advancedSearchString: advancedSearchString,
      all: checkAllAdvancedSearchBy,
      ssnOrEin: advancedSearchByInputs?.ssn,
      ...advancedSearchByInputs,
      ...advancedSearchPayload,
    })
      .then((response) => {
        const { data } = response;
        const driversList = data?.slice(0, data?.length - 1).map((driver) => handleObject(driver));
        dispatch(setListingData(driversList));
        const Pagination = data?.slice(data?.length - 1);
        dispatch(setTotalElements(Pagination[0]?.TotalElements));
        dispatch(setTotalPages(Pagination[0]?.TotalPages));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };

  const getAllShuttleDriversForLookUp = (type) => {
    dispatch(setLoading(true));
    DriverService.getDriverShuttleForAutoAndLookUP({
      type: "Lookup",
      pageNumber,
      pageSize: FullScreenLookup_RecordsPerPage,
      sortValue: normalSortValue,
      sortType: normalSortFlag,
      searchTerm,
      searchCriteria: selectedSearchCriteria,
      unitTypeSearchCriteria: driverType,
      status: statusType,
      addressType: cityType,
      ...advancedSortingOrder,
      advancedSearchString: advancedSearchString,
      all: checkAllAdvancedSearchBy,
      ssnOrEin: advancedSearchByInputs?.ssn,
      ...advancedSearchByInputs,
      ...advancedSearchPayload,
    })
      .then((response) => {
        const { data } = response;
        const driversList = data?.slice(0, data?.length - 1).map((driver) => handleObject(driver));
        dispatch(setListingData(driversList));
        const Pagination = data?.slice(data?.length - 1);
        dispatch(setTotalElements(Pagination[0]?.TotalElements));
        dispatch(setTotalPages(Pagination[0]?.TotalPages));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };
  const getAllDriversForDamageReport = () => {
    dispatch(setLoading(true));
    DamageReportService.getDamgeReportDrivers({
      type: "Lookup",
      pageNumber,
      pageSize: FullScreenLookup_RecordsPerPage,
      sortType: normalSortFlag,
      sortValue: normalSortValue,
      searchTerm,
      searchCriteria: selectedSearchCriteria,
      statusType,
      driverType,
      cityType,
      ...advancedSortingOrder,
      advancedSearchString,
      all: checkAllAdvancedSearchBy,
      ssnOrEin: advancedSearchByInputs?.ssn,
      ...advancedSearchByInputs,
      ...advancedSearchPayload,
    })
      .then((res) => {
        const { data } = res;

        const driversList = data?.slice(0, data?.length - 1).map((driver) => handleObject(driver));
        dispatch(setListingData(driversList));
        const Pagination = data?.slice(data?.length - 1);
        dispatch(setTotalElements(Pagination[0]?.TotalElements));
        dispatch(setTotalPages(Pagination[0]?.TotalPages));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const onhandleNormalSort = (sortValue) => {
    if (!showAdvancedSort) {
      dispatch(setNormalSortValue(sortValue));
      dispatch(setNormalSortFlag(!normalSortFlag));
    }
  };

  //If city type is mailing, we need to give sortby mailingCity & MailingStatecode in backend

  const renderCityStateType = (type) => {
    if (type === "city") {
      return cityType === "Mailing" ? "mailingCity" : "physicalCity";
    } else if (type === "state") {
      return cityType === "Mailing" ? "mailingStateCode" : "physicalStateCode";
    }
  };
  const renderCityOrStateFromBackend = (type, driverObj) => {
    if (type === "city") {
      return cityType === "Mailing"
        ? driverObj.city
          ? driverObj.city?.trim()
          : ""
        : driverObj.physicalCity
          ? driverObj.physicalCity?.trim()
          : "";
    } else if (type === "state") {
      return cityType === "Mailing"
        ? driverObj.state
          ? driverObj.state?.trim()
          : ""
        : driverObj.physicalStateCode
          ? driverObj.physicalStateCode?.trim()
          : "";
    }
  };

  /**
   * Fetch Units conditionally for differenct cases
   */
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      if (customServiceCallback) {
        customFetchCallback(customServiceCallback);
      }
      // Fetch Units for EditMaster
      if (MaintenanceProgram) {
        getAllDriversForLookup();
      }
      // Fetch Units using Optional Custom Fetch Function
      if (customFetchFunction) {
        customFetchFunction();
      }
      // Fetch Active Drivers for Yard Checkin
      if (YardCheckin) {
        getAllDriversForLookupYardCheckin();
      }
      if (EditShuttle) {
        getAllUnitShuttleDriversForLookup();
      }
      if (EditYardUnit) {
        getAllDriversForEdit();
      }
      if (UnitActivation) {
        getAllDriversForUnitActivation();
      }
      if (ExcludeDriver) {
        getAllDriversOwnerForLookup();
      }
      if (recruitingDriver) {
        getAllRecruitingDriversForLookUp();
      }
      if (shuttleReport) {
        getAllShuttleDriversForLookUp();
      }
      if (unitException) {
        getAllDriversForUnitException();
      }
      if (DamageReport) {
        getAllDriversForDamageReport();
      }

      if (fetchFunction) {
        fetchCallbackForSP(fetchFunction);
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    searchTerm,
    statusType,
    driverType,
    cityType,
    pageNumber,
    selectedSearchCriteria,
    advancedSearchPayload,
    advancedSortingOrder,
    normalSortFlag,
    normalSortValue,

    advancedSearchString,
    advancedSearchByInputs,
    companyName,
  ]);

  useEffect(() => {
    if (cityType === "Mailing") {
      dispatch(
        setNormalSortValue(
          sortingColumn !== null ? (sortingColumn === "city" ? "mailingCity" : "mailingStateCode") : null
        )
      );
    } else if (cityType === "Physical") {
      dispatch(
        setNormalSortValue(
          sortingColumn !== null ? (sortingColumn === "city" ? "physicalCity" : "physicalStateCode") : null
        )
      );
    }
  }, [cityType]);

  useEffect(() => {
    if (normalSortValue === null) {
      setSortingColumn(null);
    }
  }, [normalSortValue]);

  return (
    <div className="fixTableHead unitSelection">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("firstName");
              }}
            >
              First Name
              {!showAdvancedSort && normalSortFlag && normalSortValue === "firstName" && <AscendingIcon />}
              {!showAdvancedSort && !normalSortFlag && normalSortValue === "firstName" && <DescendingIcon />}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("lastName");
              }}
            >
              Last Name
              {!showAdvancedSort && normalSortFlag && normalSortValue === "lastName" && <AscendingIcon />}
              {!showAdvancedSort && !normalSortFlag && normalSortValue === "lastName" && <DescendingIcon />}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                setSortingColumn("city");
                onhandleNormalSort(renderCityStateType("city"));
              }}
            >
              City
              {!showAdvancedSort && normalSortFlag && normalSortValue === renderCityStateType("city") && (
                <AscendingIcon />
              )}
              {!showAdvancedSort && !normalSortFlag && normalSortValue === renderCityStateType("city") && (
                <DescendingIcon />
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                setSortingColumn("state");
                onhandleNormalSort(renderCityStateType("state"));
              }}
            >
              State
              {!showAdvancedSort && normalSortFlag && normalSortValue === renderCityStateType("state") && (
                <AscendingIcon />
              )}
              {!showAdvancedSort && !normalSortFlag && normalSortValue === renderCityStateType("state") && (
                <DescendingIcon />
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {listingData.map((driver) => (
            <tr
              id="rowId"
              key={renderItemId ? renderItemId(driver) : driver.driverPK || driver.DriverPK}
              onClick={(event) => {
                if (setNameFirst) setNameFirst(driver.firstName || driver.FirstName);
                if (setNameSecond) setNameSecond(driver.lastName || driver.LastName);
                handleLookupSelection(driver, event);
                dispatch(
                  setSelectedId(renderItemId ? renderItemId(driver) : driver.driverPK || driver.DriverPK)
                );
              }}
              className={
                (renderItemId ? renderItemId(driver) : driver.driverPK || driver.DriverPK) === selectedId
                  ? "tableSelected"
                  : ""
              }
            >
              <td className="f-w-600">{driver.firstName || driver.FirstName}</td>
              <td className="f-w-600">{driver.lastName || driver.LastName}</td>
              <td className="f-w-600">{renderCityOrStateFromBackend("city", driver)}</td>
              <td className="f-w-600">{renderCityOrStateFromBackend("state", driver)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading ? <LoadingIcon /> : listingData?.length === 0 && <NoRecordsMessage />}
    </div>
  );
};

export default TableListing;
