import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DriverService from "../../../../../services/DriverService";
import {
  setChangeColor,
  setDisplayFlag,
  setDocumentFile,
  setDriverLoader,
  setEditFormData,
  setFileType,
  setId,
  setListingData,
  setLoading,
  setNormalSortFlag,
  setNormalSortValue,
  setPictureFile,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../../redux/DriverMaintenanceSlice";
import { useDispatch } from "react-redux";
import AscendingIcon from "../../../../common/AscendingIcon";
import DescendingIcon from "../../../../common/DescendingIcon";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../../../common/LoadingIcon";
const DriversListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortingColumn, setSortingColumn] = useState(null);
  const [loader, setLoader] = useState(true);
  const listingData = useSelector((state) => state.driverMaintenanceReducer.listingData);
  const pageNumber = useSelector((state) => state.driverMaintenanceReducer.pageNumber);
  const totalElements = useSelector((state) => state.driverMaintenanceReducer.totalElements);
  const totalPages = useSelector((state) => state.driverMaintenanceReducer.totalPages);

  const searchTerm = useSelector((state) => state.driverMaintenanceReducer.searchTerm);
  const showAdvancedSearch = useSelector((state) => state.driverMaintenanceReducer.showAdvancedSearch);
  const showAdvancedSort = useSelector((state) => state.driverMaintenanceReducer.showAdvancedSort);
  const advancedSearchObject = useSelector((state) => state.driverMaintenanceReducer.advancedSearchObject);
  const advancedSortingOrder = useSelector((state) => state.driverMaintenanceReducer.advancedSortingOrder);
  const advancedSortingCombination = useSelector(
    (state) => state.driverMaintenanceReducer.advancedSortingCombination
  );
  const advancedSearchString = useSelector((state) => state.driverMaintenanceReducer.advancedSearchString);
  const advancedSearchByInputs = useSelector(
    (state) => state.driverMaintenanceReducer.advancedSearchByInputs
  );
  const advancedSearchPayload = useSelector((state) => state.driverMaintenanceReducer.advancedSearchPayload);

  const normalSortFlag = useSelector((state) => state.driverMaintenanceReducer.normalSortFlag);
  const normalSortValue = useSelector((state) => state.driverMaintenanceReducer.normalSortValue);

  const selectedSearchCriteria = useSelector(
    (state) => state.driverMaintenanceReducer.selectedSearchCriteria
  );
  const driverType = useSelector((state) => state.driverMaintenanceReducer.driverType);
  const statusType = useSelector((state) => state.driverMaintenanceReducer.statusType);

  const id = useSelector((state) => state.driverMaintenanceReducer.id);
  const changeColor = useSelector((state) => state.driverMaintenanceReducer.changeColor);

  const cityType = useSelector((state) => state.driverMaintenanceReducer.cityType);

  //  Driver Selection Browse Fetch function

  const getAllDrivers = () => {
    setLoader(true);
    dispatch(setDriverLoader(true));
    DriverService.getAllDriversForMaintenance(
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
        setLoader(false);
        dispatch(setDriverLoader(false));
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((error) => {
        setLoader(false);
        dispatch(setDriverLoader(false));
      });
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      setLoader(true);
      getAllDrivers();
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
  ]);
  useEffect(() => {
    if (normalSortValue === null) {
      setSortingColumn(null);
    }
  }, [normalSortValue]);
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
  return (
    <div className="fixTableHead">
      {loader && <LoadingIcon />}
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
          {loader
            ? null
            : listingData.map((driver) => (
                <tr
                  id="rowId"
                  key={driver.driverPK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setId(driver.driverPK));
                    dispatch(setChangeColor(true));
                    dispatch(setViewDetail(true));
                    dispatch(setEditFormData(null));
                    dispatch(setDocumentFile(null));
                    dispatch(setFileType(""));
                    dispatch(setPictureFile([]));
                    dispatch(setDisplayFlag(false));
                    setTimeout(() => {
                      navigate("/driver-maintenance-add/" + driver.driverPK + "/" + pageNumber);
                    }, 100);
                  }}
                  className={driver.driverPK === id && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600"> {driver.firstName} </td>
                  <td className="f-w-600"> {driver.lastName} </td>

                  <td className="f-w-600">{renderCityOrStateFromBackend("city", driver)}</td>
                  <td className="f-w-600">{renderCityOrStateFromBackend("state", driver)}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader
        ? ""
        : listingData?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
    </div>
  );
};

export default DriversListing;
