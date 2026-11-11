import React, { useEffect, useState } from "react";
import UserPermissionsService from "../../../../services/UserPermissionsService";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateEditData, updateField } from "../../../../redux/UserPermissionSlice";
import { t } from "i18next";
import { PermissionKeyGeneratorUtil } from "../../../../utils/PermissionKeyGeneratorUtil";
import LoadingText from "../../../common/LoadingText";

const UserPermissionListPage = ({ loading, setLoading }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;

  const pageNumber = useSelector((state) => state.userPermission.pageNumber);
  const type = useSelector((state) => state.userPermission.type);
  const listingData = useSelector((state) => state.userPermission.listingData);
  const status = useSelector((state) => state.userPermission.status);
  const category = useSelector((state) => state.userPermission.category);
  const searchCriteria = useSelector((state) => state.userPermission.searchCriteria);
  const searchTerm = useSelector((state) => state.userPermission.searchTerm);
  const sortType = useSelector((state) => state.userPermission.sortType);
  const sortValue = useSelector((state) => state.userPermission.sortValue);
  const editedList = useSelector((state) => state.userPermission.editedList);
  const isSaving = useSelector((state) => state.userPermission.isSaving);
  const selectedId = useSelector((state) => state.userPermission.selectedId);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const overridePermission = PermissionKeyGeneratorUtil("USRPR", "OVRD");

  const hasOverridePermission = deniedPermissions.includes(overridePermission);

  const fetchBrowse = () => {
    setLoading(true);
    UserPermissionsService.getBrowse(
      pageNumber,
      searchCriteria,
      searchTerm,
      sortValue,
      !sortType,
      type,
      status,
      category,
      id
    )
      .then((response) => {
        const data = response.data;
        const browseList = data.slice(0, data.length - 1);
        const paginationList = data.slice(data.length - 1);
        updateData("listingData", browseList);
        updateData("totalElements", paginationList[0].TotalElements);
        updateData("totalPages", paginationList[0].TotalPages);
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const handleUpdate = (item, type, val) => {
    dispatch(updateEditData({ item, type, val }));
  };
  const getBrowseData = (item, val) => {
    const foundObject = editedList.find((data) => data.UserPermissionPK === item.UserPermissionPK);

    if (foundObject) {
      return foundObject[val]; // Directly access the key dynamically
    } else {
      // return item[val]; // Return original value if not edited
      if (val == "Enable") {
        return item.Enabled;
      } else {
        return item.Override;
      }
    }
  };

  const onhandleNormalSort = (value, val) => {
    updateData("sortValue", value);
    updateData("sortType", val);
  };

  useEffect(() => {
    if (editedList.length > 0) {
      updateData("enableSave", true);
    }
  }, [editedList]);

  useEffect(() => {
    setLoading(true);
    fetchBrowse();
  }, [pageNumber, sortType, sortValue, searchCriteria, searchTerm, status, category]);

  return (
    <div className="fixTableHead ">
      <div>
        <table className="table table-striped f-w-600 mb-0">
          <thead>
            <tr disabled>
              <th
                className="f-w-600"
                onClick={() => {
                  onhandleNormalSort("Description", !sortType);
                }}
              >
                Description
                {sortType && sortValue === "Description" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortType && sortValue === "Description" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  onhandleNormalSort("Enabled", !sortType);
                }}
              >
                Enabled{" "}
                {sortType && sortValue === "Enabled" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortType && sortValue === "Enabled" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  onhandleNormalSort("Override", !sortType);
                }}
              >
                Overrideable{" "}
                {sortType && sortValue === "Override" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortType && sortValue === "Override" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>{" "}
          </thead>
          <tbody>
            {loading
              ? null
              : listingData.length >= 1 &&
                listingData.map((data) => (
                  <tr
                    id="rowId"
                    key={data.UserPermissionPK}
                    onClick={() => updateData("selectedId", null)}
                    onDoubleClick={() => {
                      updateData("selectedId", data.UserPermissionPK);
                    }}
                    className={selectedId === data.UserPermissionPK ? "tableSelected" : " "}
                  >
                    <td className="f-w-600">{data.Description}</td>
                    <td className="f-w-600">
                      <input
                        name="Enabled"
                        type="checkbox"
                        className={`form-check-input p-0 $`}
                        checked={getBrowseData(data, "Enable")}
                        onChange={(e) => {
                          handleUpdate(data, "Enable", e.target.checked);
                        }}
                        disabled={hasOverridePermission && !data.Override}
                      />
                    </td>
                    <td className="f-w-600">
                      <input
                        name="Override"
                        type="checkbox"
                        className={`form-check-input p-0 $`}
                        checked={getBrowseData(data, "Override")}
                        onChange={(e) => {
                          handleUpdate(data, "Override", e.target.checked);
                        }}
                        disabled
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
          {!loading && listingData.length === 0 && (
            <tr>
              <td colSpan="4" align="center">
                <h2 className="empty-list">{t("dealers.list.empty.message")}</h2>
              </td>
            </tr>
          )}
        </table>
        {isSaving && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
        {loading && <LoadingText />}
      </div>
    </div>
  );
};

export default UserPermissionListPage;
