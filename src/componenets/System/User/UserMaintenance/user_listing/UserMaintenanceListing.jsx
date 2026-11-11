import { t } from "i18next";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UsersService from "../../../../../services/UsersService";
import { useSelector, useDispatch } from "react-redux";
import {
  setNormalSortValue,
  setNormalSortFlag,
  setUsersData,
  setId,
  setChangeColor,
  setLoader,
  setViewDetail,
  setTotalElements,
  setTotalPages,
  setActive,
} from "../../../../../redux/UserMaintenanceSearchFilterSlice";
import LoadingIcon from "../../../../common/LoadingIcon";
import LoadingText from "../../../../common/LoadingText";

export const UserMaintenanceListing = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userListingData, setUserListingData] = useState([]);
  const [adSort] = useState(false);
  const [type] = useState("");
  const [userType] = useState("");
  const usersData = useSelector((state) => state.userMaintenanceReducer.usersData);

  const loader = useSelector((state) => state.userMaintenanceReducer.loader);

  const showAdvanceSort = useSelector((state) => state.userMaintenanceReducer.showAdvanceSort);

  let sortFlag = useSelector((state) => state.userMaintenanceReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.userMaintenanceReducer.normalSortValue);

  const selectedStatus = useSelector((state) => state.userMaintenanceReducer.selectedStatus);

  const pageNumber = useSelector((state) => state.userMaintenanceReducer.pageNumber);

  const searchedUser = useSelector((state) => state.userMaintenanceReducer.searchedUser);

  const selectedSearchCriteria = useSelector((state) => state.userMaintenanceReducer.selectedSearchCriteria);

  const advanceSortingOrder = useSelector((state) => state.userMaintenanceReducer.advanceSortingOrder);

  const searchTerms = useSelector((state) => state.userMaintenanceReducer.searchTerms);

  const selectedUserStatus = useSelector((state) => state.userMaintenanceReducer.selectedUserStatus);

  const changeColor = useSelector((state) => state.userMaintenanceReducer.changeColor);

  const id = useSelector((state) => state.userMaintenanceReducer.id);

  const viewDetail = useSelector((state) => state.userMaintenanceReducer.viewDetail);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      getAllUsers();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    selectedUserStatus,
    selectedStatus,
    selectedSearchCriteria,
    searchedUser,
    advanceSortingOrder,
    pageNumber,
    showAdvanceSort,
    searchTerms,
    sortFlag,
    sortValue,
  ]);

  useEffect(() => {
    if (usersData != null) {
      setUserListingData(usersData);
    }
  }, [usersData, sortFlag, sortValue, viewDetail]);

  const getAllUsers = () => {
    setLoading(true);
    UsersService.getAllUsers(
      selectedStatus,
      pageNumber,
      searchedUser,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      selectedUserStatus,
      setViewDetail,
      type,
      userType
    )
      .then((response) => {
        const data = response.data;
        dispatch(setUsersData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600 col-6"
              onClick={() => {
                if (showAdvanceSort !== true)
                  if (adSort === false) {
                    onhandleNormalSort("name", !sortFlag);
                  }
              }}
            >
              Name
              {showAdvanceSort !== true && sortFlag && sortValue === "name" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {showAdvanceSort !== true && !sortFlag && sortValue === "name" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-6"
              onClick={() => {
                if (selectedUserStatus !== "Pseudo" && showAdvanceSort !== true && adSort === false) {
                  onhandleNormalSort("login", !sortFlag);
                }
              }}
              style={selectedUserStatus === "Pseudo" ? { pointerEvents: "none", opacity: 0.5 } : {}}
            >
              Login
              {selectedUserStatus !== "Pseudo" &&
                showAdvanceSort !== true &&
                sortFlag &&
                sortValue === "login" && (
                  <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
              {selectedUserStatus !== "Pseudo" &&
                showAdvanceSort !== true &&
                !sortFlag &&
                sortValue === "login" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            userListingData?.map((user) => (
              <tr
                id="rowId"
                key={user?.userPK}
                onClick={(e) => dispatch(setChangeColor(false))}
                onDoubleClick={(event) => {
                  dispatch(setId(user.userPK));
                  dispatch(setActive(user.active));
                  dispatch(setChangeColor(true));
                  dispatch(setViewDetail(true));
                  setTimeout(() => {
                    navigate("/user-maintenance/" + user.userPK);
                  }, 100);
                }}
                className={user.userPK === Number(id) && changeColor ? "tableSelected" : ""}
              >
                <td className="f-w-600"> {user.name} </td>
                <td className="f-w-600">
                  {" "}
                  {user.login?.startsWith("UNASSIGNED") ? "" : user.login?.trim()}{" "}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        userListingData?.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
};

export default UserMaintenanceListing;
