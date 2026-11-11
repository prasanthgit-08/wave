/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  setUsersData,
  setTotalElements,
  setTotalPages,
  setId,
  setLoading,
} from "../../../redux/LookupScreens/UserLookupSlice";
import YardCheckinService from "../../../services/shuttle/process/YardCheckinService";
import UsersService from "../../../services/UsersService";
import EditYardUnitService from "../../../services/shuttle/process/EditYardUnitService";
import UnitActivationService from "../../../services/UnitActivationService";
import EditDriverService from "../../../services/EditDriverService";
import YardService from "../../../services/YardService";
import { AdvancedLookupScreen_RecordsPerPage } from "../../../services/constants/applicationConstants";
import LoadingText from "../../common/LoadingText";
const TableListing = ({
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  customServiceCallback,
  CustomUserPermission,
  userType,
  EmailMaintenance,
  YardCheckin,
  companyName,
  currentUserId,
  EditYardUnit,
  UnitActivation,
  DriverEditFile,
  ReportUsersList,
  DispatchUserFilter,
  DriverDispatchUser,
  fetchFunction,
  tripListing,
  renderCol1,
  renderCol2,
  renderCol3,
  unitException,
}) => {
  // -----------------------------------------------------------

  const dispatch = useDispatch();
  const typeForCustomUserPermission = "";
  const [adSort] = useState(false);

  const userLookupPageNumber = useSelector((state) => state.userLookupReducer.userLookupPageNumber);
  const usersData = useSelector((state) => state.userLookupReducer.usersData);
  const searchTerms = useSelector((state) => state.userLookupReducer.searchTerms);
  const showAdvanceSort = useSelector((state) => state.userLookupReducer.showAdvanceSort);
  const sortValue = useSelector((state) => state.userLookupReducer.normalSortValue);
  const sortFlag = useSelector((state) => state.userLookupReducer.normalSortFlag);
  const advanceSortingOrder = useSelector((state) => state.userLookupReducer.advanceSortingOrder);
  const selectedSearchCriteria = useSelector((state) => state.userLookupReducer.selectedSearchCriteria);
  const searchedUser = useSelector((state) => state.userLookupReducer.searchedUser);
  const changeColor = useSelector((state) => state.userLookupReducer.changeColor);
  const id = useSelector((state) => state.userLookupReducer.id);
  const selectedUserStatus = useSelector((state) => state.userLookupReducer.selectedUserStatus);
  const selectedStatus = useSelector((state) => state.userLookupReducer.selectedStatus);
  const loading = useSelector((state) => state.userLookupReducer.loading);

  const getAllUsersForMaintenance = () => {
    UsersService.getAllUsers(
      selectedStatus,
      userLookupPageNumber,
      searchedUser,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      selectedUserStatus,
      undefined,
      undefined,
      undefined,
      undefined,
      AdvancedLookupScreen_RecordsPerPage
    )
      .then((response) => {
        const data = response.data;
        const userList = data.content?.map((users) => ({
          ...users,
          name: users.name?.trim(),
        }));
        dispatch(setUsersData(userList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const customFetchCallback = (customServiceCallback) => {
    customServiceCallback()
      .then((response) => {
        const data = response.data;
        const userList = data.content?.map((users) => ({
          ...users,
          name: users.name?.trim(),
        }));
        dispatch(setUsersData(userList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const fetchCallbackForSP = (fetchFunction) => {
    fetchFunction({
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      pageNumber: userLookupPageNumber,
      sortValue,
      sortType: sortFlag,
      advancedSortingOrder: advanceSortingOrder,
      advancedSearchObject: searchedUser,
    })
      .then((response) => {
        const { data } = response;
        const paginationData = data?.find((item) => item?.Type === "Pagination");
        const filteredList = data?.filter((item) => item?.Type !== "Pagination");
        dispatch(setUsersData(filteredList || []));
        dispatch(setTotalElements(paginationData.TotalElements || 0));
        dispatch(setTotalPages(paginationData.TotalPages || 0));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };

  //Email Maintenance
  const getAllUsersForEmailMaintenance = () => {
    UsersService.getAllUsers(
      selectedStatus,
      userLookupPageNumber,
      searchedUser,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      null, //selecteduserstatus
      null, //type
      "emailMaintenance",
      null //currentUserId
    )
      .then((response) => {
        const data = response.data;
        const userList = data.content?.map((users) => ({
          ...users,
          name: users.name?.trim(),
        }));
        dispatch(setUsersData(userList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  //Shuttle Process, Yard Check in
  const getAllUsersForShuttleProcess = () => {
    YardCheckinService.getAllUsersForLookup(
      selectedStatus,
      userLookupPageNumber,
      searchedUser,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      selectedUserStatus,
      companyName
    )
      .then((response) => {
        const data = response.data;
        dispatch(setUsersData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const getAllUsersForEdit = () => {
    EditYardUnitService.getAllUsersForLookup(
      selectedStatus,
      userLookupPageNumber,
      searchedUser,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      selectedUserStatus,
      companyName
    )
      .then((response) => {
        const data = response.data;
        const usersList = data.content?.map((user) => ({ ...user, name: user.name?.trim() }));
        dispatch(setUsersData(usersList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const getAllUsersForUnitActivation = () => {
    UnitActivationService.getAllUsersForLookup(
      selectedStatus,
      userLookupPageNumber,
      searchedUser,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      selectedUserStatus,
      companyName
    )
      .then((response) => {
        const data = response.data;
        const usersList = data.content?.map((user) => ({ ...user, name: user.name?.trim() }));
        dispatch(setUsersData(usersList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };
  const getAllCustomUserForMaintenance = () => {
    UsersService.getAllUsers(
      selectedStatus,
      userLookupPageNumber,
      searchedUser,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      null, // used in user lookup in user maintenance to include active pseudo users.
      typeForCustomUserPermission,
      userType,
      currentUserId
    )
      .then((response) => {
        const data = response.data;
        dispatch(setUsersData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  //Operations/Driver Services/Driver Edit File
  const getAllActiveNonPseudoUsers = () => {
    EditDriverService.getAllUsersForLookup(
      userLookupPageNumber,
      searchedUser,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      selectedUserStatus
    )
      .then((response) => {
        const data = response.data;
        dispatch(setUsersData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const getAllUsersForDispatchReport = () => {
    UsersService.getAllUsers(
      selectedStatus,
      userLookupPageNumber,
      searchedUser,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      selectedUserStatus
    )
      .then((response) => {
        const data = response.data;
        const userList = data.content?.map((users) => ({
          ...users,
          name: users.name?.trim(),
        }));
        dispatch(setUsersData(userList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  //nocallinReport and Servicefleet Report
  const getAllDriverDispatchUer = () => {
    dispatch(setLoading(true));
    UsersService.getAllDispatchUser({
      searchTerm: searchTerms,
      firstField: advanceSortingOrder?.firstField || "",
      secondField: advanceSortingOrder?.secondField || "",
      searchCriteria: selectedSearchCriteria,
      name: searchedUser?.name || "",
      login: searchedUser?.login || "",
      pageNumber: userLookupPageNumber,
      type: "Lookup",
      sortType: sortFlag,
      sortValue,
      pageSize: 15,
    })
      .then((response) => {
        const data = response.data;
        const paginationData = data?.slice(data.length - 1);
        const browseData = data?.slice(0, data.length - 1);
        const userList = browseData?.map((users) => ({
          ...users,
          name: users?.Name?.trim(),
          login: users?.Login?.trim(),
        }));
        dispatch(setUsersData(userList));
        dispatch(setTotalElements(paginationData[0]?.TotalElements));
        dispatch(setTotalPages(paginationData[0]?.TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  //tripListingByCustomer Report
  const fetchAccountManager = () => {
    dispatch(setLoading(true));
    UsersService.getAllUsersForTripListing({
      searchTerm: searchTerms,
      firstField: advanceSortingOrder?.firstField || "",
      secondField: advanceSortingOrder?.secondField || "",
      searchCriteria: selectedSearchCriteria,
      name: searchedUser?.name || "",
      login: searchedUser?.login || "",
      pageNumber: userLookupPageNumber,
      type: "Lookup",
      sortType: sortFlag,
      sortValue,
      pageSize: 15,
    })
      .then((response) => {
        const data = response.data;
        const paginationData = data?.slice(data.length - 1);
        const browseData = data?.slice(0, data.length - 1);
        const userList = browseData?.map((users) => ({
          ...users,
          name: users?.Name?.trim(),
          login: users?.Login?.trim(),
        }));
        dispatch(setUsersData(userList));
        dispatch(setTotalElements(paginationData[0]?.TotalElements));
        dispatch(setTotalPages(paginationData[0]?.TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  //UnitPickupException Report
  const fetchDispatcherForUnitException = () => {
    dispatch(setLoading(true));
    UsersService.getDispatcherForUnitException({
      searchTerm: searchTerms,
      firstField: advanceSortingOrder?.firstField || "",
      secondField: advanceSortingOrder?.secondField || "",
      searchCriteria: selectedSearchCriteria,
      name: searchedUser?.name || "",
      login: searchedUser?.login || "",
      pageNumber: userLookupPageNumber,
      type: "Lookup",
      sortType: sortFlag,
      sortValue,
      pageSize: 15,
    })
      .then((response) => {
        const data = response.data;
        const paginationData = data?.slice(data.length - 1);
        const browseData = data?.slice(0, data.length - 1);
        const userList = browseData?.map((users) => ({
          ...users,
          name: users?.Name?.trim(),
          login: users?.Login?.trim(),
        }));
        dispatch(setUsersData(userList));
        dispatch(setTotalElements(paginationData[0]?.TotalElements));
        dispatch(setTotalPages(paginationData[0]?.TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  useEffect(() => {
    if (
      MaintenanceProgram ||
      customServiceCallback ||
      customFetchFunction ||
      CustomUserPermission ||
      YardCheckin ||
      ReportUsersList ||
      EditYardUnit ||
      UnitActivation ||
      DriverEditFile ||
      DriverDispatchUser ||
      DispatchUserFilter ||
      fetchFunction ||
      tripListing ||
      unitException
    ) {
      dispatch(setLoading(true));
    }
    const debounceFunction = setTimeout(() => {
      if (MaintenanceProgram) {
        getAllUsersForMaintenance();
      } else if (customServiceCallback) {
        customFetchCallback(customServiceCallback);
      } else if (customFetchFunction) {
        customFetchFunction();
      } else if (CustomUserPermission) {
        // need to change after permission is implemented
        getAllCustomUserForMaintenance();
      } else if (YardCheckin) {
        getAllUsersForShuttleProcess();
      } else if (EmailMaintenance) {
        getAllUsersForEmailMaintenance();
      } else if (ReportUsersList) {
        getAllUsersForDispatchReport();
      }
      if (EditYardUnit) {
        getAllUsersForEdit();
      }
      if (UnitActivation) {
        getAllUsersForUnitActivation();
      }
      if (DriverEditFile) {
        getAllActiveNonPseudoUsers();
      }
      if (DriverDispatchUser) {
        getAllDriverDispatchUer();
      }
      if (DispatchUserFilter) {
        customFetchCallback(() =>
          UsersService.getAllUsers(
            selectedStatus,
            userLookupPageNumber,
            searchedUser,
            selectedSearchCriteria,
            advanceSortingOrder,
            searchTerms,
            sortValue,
            sortFlag,
            selectedUserStatus,
            undefined,
            undefined,
            undefined,
            DispatchUserFilter
          )
        );
      }

      if (fetchFunction) {
        fetchCallbackForSP(fetchFunction);
      }
      if (tripListing) {
        fetchAccountManager();
      }
      if (unitException) {
        fetchDispatcherForUnitException();
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    selectedSearchCriteria,
    userLookupPageNumber,
    searchTerms,
    searchedUser,
    sortFlag,
    sortValue,
    advanceSortingOrder,
    companyName,
  ]);

  const renderUserListingData = usersData?.map((user) => (
    <tr
      id="rowId"
      key={renderItemId(user)}
      onClick={(event) => {
        handleLookupSelection(user, event);
        dispatch(setChangeColor(true));
        dispatch(setId(renderItemId(user)));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(user) === id && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {(renderCol1 && renderCol1(user)) || user.name} </td>
      <td className="f-w-600"> {(renderCol2 && renderCol2(user)) || user.login} </td>
    </tr>
  ));
  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("name", !sortFlag);
                  }
              }}
            >
              Name
              {showAdvanceSort !== true && sortFlag && sortValue === "name" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "name" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("login", !sortFlag);
                  }
              }}
            >
              Login
              {showAdvanceSort !== true && sortFlag && sortValue === "login" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "login" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {!loading && usersData?.length !== 0 && <tbody>{renderUserListingData}</tbody>}
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        usersData?.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
