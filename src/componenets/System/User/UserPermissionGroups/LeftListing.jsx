import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPermissionsGroupService from "../../../../services/UserPermissionsGroupService";
import {
  removeDeleteList,
  removeExceptList,
  removeFromSelectedLeftList,
  setSelectedLeftList,
  updateField,
  updateSaveList,
  updateSelectedLeftList,
} from "../../../../redux/UserPermissionGroupSlice";
import usePagination from "../../../../hooks/usePagination";
import LoadingText from "../../../common/LoadingText";

const LeftListing = () => {
  const dispatch = useDispatch();

  const [lastClick, setLastClick] = useState();
  const [isAscending, setIsAscending] = useState(false);
  const [sortValue, setSortValue] = useState("");
  const [loading, setLoading] = useState(false);

  const initialList = useSelector((state) => state.userPermissionGroup.initialList);
  const leftList = useSelector((state) => state.userPermissionGroup.leftList);
  const saveList = useSelector((state) => state.userPermissionGroup.saveList);
  const deleteList = useSelector((state) => state.userPermissionGroup.deleteList);
  const exceptionList = useSelector((state) => state.userPermissionGroup.exceptionList);
  const reverse = useSelector((state) => state.userPermissionGroup.reverse);
  const leftpageNumber = useSelector((state) => state.userPermissionGroup.leftpageNumber);
  const selectedListLeft = useSelector((state) => state.userPermissionGroup.selectedListLeft);
  const copyLoading = useSelector((state) => state.userPermissionGroup.loading);

  const pagination = usePagination(leftList, leftpageNumber, 14);
  const { totalElements, totalPages } = pagination;
  const paginatedArrayLeft = pagination.paginatedArray;

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const fetchLeftList = () => {
    UserPermissionsGroupService.requestData(
      "ListLeft",
      initialList,
      saveList,
      deleteList,
      reverse,
      exceptionList
    )
      .then(({ data }) => {
        setLastClick(data?.response?.data[0]?.PermissionGroupPK);
        updateData("loading", false);
        // debugger
        if (sortValue) {
          handleSort(data?.response?.data || []);
        } else {
          updateData("leftList", data?.response?.data || []);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSort = (list) => {
    if (list) {
      // Sort the list based on the flag
      const sortedList = [...list].sort((a, b) =>
        isAscending ? a.Description.localeCompare(b.Description) : b.Description.localeCompare(a.Description)
      );

      // Dispatch action to update sorted list in Redux store
      // dispatch(updateSortedList(sortedList));
      updateData("leftList", sortedList);
    }
  };

  useEffect(() => {
    updateData("leftPage", paginatedArrayLeft);
  }, [paginatedArrayLeft]);

  const handleClick = (event, element) => {
    if (event.ctrlKey && event.shiftKey) {
      event.preventDefault();
      const index1 = paginatedArrayLeft.findIndex((item) => item.PermissionGroupPK === element);
      const index2 = paginatedArrayLeft.findIndex((item) => item.PermissionGroupPK === lastClick);
      var array;
      if (index1 < index2) {
        array = paginatedArrayLeft.slice(index1, index2 + 1);
      } else {
        array = paginatedArrayLeft.slice(index2, index1 + 1);
      }
      array.map((obj) => {
        if (!selectedListLeft.includes(obj.PermissionGroupPK)) {
          dispatch(updateSelectedLeftList(obj.PermissionGroupPK));
        }
      });
    } else if (event.ctrlKey) {
      if (selectedListLeft.includes(element)) {
        dispatch(removeFromSelectedLeftList(element));
      } else {
        dispatch(updateSelectedLeftList(element));
      }
      setLastClick(element);
    } else if (event.shiftKey) {
      event.preventDefault();
      const index1 = paginatedArrayLeft.findIndex((item) => item.PermissionGroupPK === element);
      const index2 = paginatedArrayLeft.findIndex((item) => item.PermissionGroupPK === lastClick);
      var array;
      if (index1 < index2) {
        array = paginatedArrayLeft.slice(index1, index2 + 1);
      } else {
        array = paginatedArrayLeft.slice(index2, index1 + 1);
      }
      array.map((obj) => {
        if (!selectedListLeft.includes(obj.PermissionGroupPK)) {
          dispatch(updateSelectedLeftList(obj.PermissionGroupPK));
        }
      });
    } else {
      const isPresent = selectedListLeft.find((obj) => obj === element);
      if (isPresent) {
        if (selectedListLeft?.length === 1) {
          dispatch(removeFromSelectedLeftList(element));
        } else {
          dispatch(setSelectedLeftList(element));
        }
      } else {
        dispatch(setSelectedLeftList(element));
      }
      setLastClick(element);
    }
  };

  const handleDoubleClick = (element) => {
    if (initialList?.includes(element)) {
      dispatch(removeDeleteList(element));
    } else {
      if (exceptionList.includes(element)) {
        dispatch(removeExceptList(element));
      } else {
        dispatch(updateSaveList(element));
      }
    }
    updateData("disableSave", false);
  };

  useEffect(() => {
    if (!initialList) return;
    setLoading(true);
    const timer = setTimeout(() => {
      fetchLeftList();
    }, 50);
    return () => clearTimeout(timer);
  }, [initialList, saveList, deleteList, exceptionList, reverse]);

  useEffect(() => {
    updateData("leftPage", paginatedArrayLeft);
    updateData("leftTotalElements", totalElements);
    updateData("leftTotalPages", totalPages);
  }, [paginatedArrayLeft, totalElements, totalPages]);

  useEffect(() => {
    if (sortValue) {
      handleSort(leftList);
    }
  }, [sortValue, isAscending]);

  return (
    <div className="fixTableHead no-select" style={{ padding: 0, flex: 1 }}>
      {
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                className="f-w-600"
                onClick={() => {
                  setIsAscending(!isAscending);
                  setSortValue("Description");
                }}
              >
                Description
                {isAscending && sortValue === "Description" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!isAscending && sortValue === "Description" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              !copyLoading &&
              initialList &&
              paginatedArrayLeft?.length > 0 &&
              paginatedArrayLeft?.map((element) => (
                <tr
                  id="rowId"
                  key={element.PermissionGroupPK}
                  onClick={(event) => {
                    handleClick(event, element.PermissionGroupPK);
                  }}
                  onDoubleClick={() => {
                    handleDoubleClick(element.PermissionGroupPK);
                    dispatch(removeFromSelectedLeftList(element.PermissionGroupPK));
                  }}
                  className={
                    selectedListLeft.some((item) => item === element.PermissionGroupPK) ? "tableSelected" : ""
                  }
                >
                  <td className="f-w-600">{element.Description}</td>
                </tr>
              ))}
          </tbody>
        </table>
      }

      {!loading && !copyLoading && initialList && paginatedArrayLeft?.length == 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
      {(loading || !initialList || copyLoading) && <LoadingText />}
    </div>
  );
};

export default LeftListing;
