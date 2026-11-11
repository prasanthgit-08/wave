import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPermissionsGroupService from "../../../../services/UserPermissionsGroupService";
import {
  removeFromSelectedRightList,
  removeSaveList,
  setSelectedRightList,
  updateDeleteList,
  updateExceptList,
  updateField,
  updateSelectedRightList,
} from "../../../../redux/UserPermissionGroupSlice";
import usePagination from "../../../../hooks/usePagination";
import LeftListing from "./LeftListing";
import LoadingText from "../../../common/LoadingText";
import { useParams } from "react-router-dom";

const RightListing = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [lastClick, setLastClick] = useState();
  const [loading, setLoading] = useState(false);

  const initialList = useSelector((state) => state.userPermissionGroup.initialList);
  const rightList = useSelector((state) => state.userPermissionGroup.rightList);
  const saveList = useSelector((state) => state.userPermissionGroup.saveList);
  const deleteList = useSelector((state) => state.userPermissionGroup.deleteList);
  const exceptionList = useSelector((state) => state.userPermissionGroup.exceptionList);
  const reverse = useSelector((state) => state.userPermissionGroup.reverse);
  const rightpageNumber = useSelector((state) => state.userPermissionGroup.rightpageNumber);
  const selectedListRight = useSelector((state) => state.userPermissionGroup.selectedListRight);
  const notedElement = useSelector((state) => state.userPermissionGroup.notedElement);
  const copyLoading = useSelector((state) => state.userPermissionGroup.loading);

  const pagination = usePagination(rightList, rightpageNumber, 14);
  const { totalElements, totalPages } = pagination;
  const paginatedArrayRight = pagination.paginatedArray;

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const fetchRightList = () => {
    UserPermissionsGroupService.requestData(
      "ListRight",
      initialList,
      saveList,
      deleteList,
      reverse,
      exceptionList,
      0,
      id
    )
      .then(({ data }) => {
        const modifiedList = mergeLists(data?.response?.data || []);
        setLastClick(modifiedList[0]?.PermissionGroupPK);
        updateData("rightList", modifiedList);
        // debugger
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const mergeLists = (data) => {
    let newList = [...data];
    if (!rightList || rightList.length === 0) {
      newList.sort((a, b) => (a.sequence ?? Infinity) - (b.sequence ?? Infinity));
      newList = newList.map((item, index) => ({
        ...item,
        sequence: index + 1,
      }));
    } else {
      const sequenceMap = new Map(rightList.map((item) => [item.PermissionGroupPK, item.sequence]));
      newList = newList.map((item) => ({
        ...item,
        sequence: sequenceMap.get(item.PermissionGroupPK) ?? null, // Retain sequence if exists, else null
      }));
      newList.sort((a, b) => (a.sequence ?? Infinity) - (b.sequence ?? Infinity));
      newList = newList.map((item, index) => ({
        ...item,
        sequence: index + 1,
      }));
    }

    return newList;
  };

  const handleClick = (event, element) => {
    if (event.ctrlKey && event.shiftKey) {
      event.preventDefault();
      const index1 = paginatedArrayRight.findIndex((item) => item.PermissionGroupPK === element);
      const index2 = paginatedArrayRight.findIndex((item) => item.PermissionGroupPK === lastClick);
      var array;
      if (index1 < index2) {
        array = paginatedArrayRight.slice(index1, index2 + 1);
      } else {
        array = paginatedArrayRight.slice(index2, index1 + 1);
      }
      array.map((obj) => {
        if (!selectedListRight.includes(obj.PermissionGroupPK)) {
          dispatch(updateSelectedRightList(obj.PermissionGroupPK));
        }
      });
    } else if (event.ctrlKey) {
      if (selectedListRight.includes(element)) {
        dispatch(removeFromSelectedRightList(element));
      } else {
        dispatch(updateSelectedRightList(element));
      }
      setLastClick(element);
    } else if (event.shiftKey) {
      event.preventDefault();
      const index1 = paginatedArrayRight.findIndex((item) => item.PermissionGroupPK === element);
      const index2 = paginatedArrayRight.findIndex((item) => item.PermissionGroupPK === lastClick);
      var array;
      if (index1 < index2) {
        array = paginatedArrayRight.slice(index1, index2 + 1);
      } else {
        array = paginatedArrayRight.slice(index2, index1 + 1);
      }
      array.map((obj) => {
        if (!selectedListRight.includes(obj.PermissionGroupPK)) {
          dispatch(updateSelectedRightList(obj.PermissionGroupPK));
        } else {
          dispatch(removeFromSelectedRightList(element));
        }
      });
    } else {
      const isPresent = selectedListRight.find((obj) => obj === element);
      if (isPresent) {
        if (selectedListRight?.length === 1) {
          dispatch(removeFromSelectedRightList(element));
        } else {
          dispatch(setSelectedRightList(element));
        }
      } else {
        dispatch(setSelectedRightList(element));
      }
      setLastClick(element);
    }
  };

  const handleDoubleClick = (customer) => {
    if (reverse) {
      dispatch(updateExceptList(customer));
    }

    if (initialList?.includes(customer)) {
      dispatch(updateDeleteList(customer));
    } else if (saveList.includes(customer)) {
      dispatch(removeSaveList(customer));
    } else {
      dispatch(updateExceptList(customer));
    }
    updateData("disableSave", false);
  };

  useEffect(() => {
    if (selectedListRight.length === 0) {
      updateData("note", "");
      updateData("notedElement", null);
    }
  }, [selectedListRight]);

  useEffect(() => {
    updateData("rightPage", paginatedArrayRight);
    updateData("rightTotalElements", totalElements);
    updateData("rightTotalPages", totalPages);
  }, [paginatedArrayRight, totalElements, totalPages]);

  useEffect(() => {
    if (!initialList) return;
    setLoading(true);
    const timer = setTimeout(() => {
      fetchRightList();
    }, 50);
    return () => clearTimeout(timer);
  }, [initialList, saveList, deleteList, exceptionList, reverse]);

  return (
    <div className="fixTableHead no-select" style={{ padding: 0, flex: 1 }}>
      {
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th className="f-w-600">Description</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              !copyLoading &&
              initialList &&
              paginatedArrayRight?.length > 0 &&
              paginatedArrayRight?.map((element) => (
                <tr
                  id="rowId"
                  key={element.PermissionGroupPK}
                  onClick={(event) => {
                    if (notedElement !== element.PermissionGroupPK) {
                      updateData("note", element.Notes);
                      updateData("notedElement", element.PermissionGroupPK);
                    } else {
                      updateData("note", "");
                      updateData("notedElement", null);
                    }
                    handleClick(event, element.PermissionGroupPK);
                  }}
                  onDoubleClick={() => {
                    updateData("note", "");
                    updateData("notedElement", null);
                    handleDoubleClick(element.PermissionGroupPK);
                    dispatch(removeFromSelectedRightList(element.PermissionGroupPK));
                  }}
                  className={
                    selectedListRight.some((item) => item === element.PermissionGroupPK)
                      ? "tableSelected"
                      : ""
                  }
                >
                  <td className="f-w-600">{element.Description}</td>
                </tr>
              ))}
          </tbody>
        </table>
      }

      {!loading && !copyLoading && initialList && paginatedArrayRight?.length == 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}

      {(loading || copyLoading || !initialList) && <LoadingText />}
    </div>
  );
};

export default RightListing;
