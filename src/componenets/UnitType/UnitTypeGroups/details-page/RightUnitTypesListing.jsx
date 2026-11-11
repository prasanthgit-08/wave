import React, { useEffect, useState } from "react";
import LoadingText from "../../../common/LoadingText";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  removeFromUnSelectedList,
  removeSaveList,
  setAssignedPageNumber,
  setAssignedTotalElements,
  setAssignedTotalPages,
  setAssignedUnitTypesList,
  setChangesInUnitTypeSelection,
  setinitialList,
  setUnitTypeSortFlag,
  setUnitTypeSortValue,
  setUnSelectedList,
  updateDeleteList,
  updateExceptList,
  updateUnSelectedList,
  setRightLoading,
} from "../../../../redux/UnitTypeGroupSlice";
import UnitTypeGroupsService from "../../../../services/UnitTypeGroupsService";

const RightUnitTypesListing = () => {
  const dispatch = useDispatch();
  const [lastClick, setLastClick] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(null);
  const assignedPageNumber = useSelector((state) => state.unitTypeGroupReducer.assignedPageNumber);

  const initialList = useSelector((state) => state.unitTypeGroupReducer.initialList);
  const assignedUnitTypesList = useSelector((state) => state.unitTypeGroupReducer.assignedUnitTypesList);
  const saveList = useSelector((state) => state.unitTypeGroupReducer.saveList);
  const deleteList = useSelector((state) => state.unitTypeGroupReducer.deleteList);
  const exceptList = useSelector((state) => state.unitTypeGroupReducer.exceptList);
  let unitTypeSortValue = useSelector((state) => state.unitTypeGroupReducer.unitTypeSortValue);
  let unitTypeSortFlag = useSelector((state) => state.unitTypeGroupReducer.unitTypeSortFlag);
  const reverseFlag = useSelector((state) => state.unitTypeGroupReducer.reverseFlag);
  const unSelectedList = useSelector((state) => state.unitTypeGroupReducer.unSelectedList);
  const radioValue = useSelector((state) => state.unitTypeGroupReducer.radioValue);
  const rightLoading = useSelector((state) => state.unitTypeGroupReducer.rightLoading);

  const handleClick = (event, unittype) => {
    if (event.ctrlKey && event.shiftKey) {
      event.preventDefault();
      const index1 = assignedUnitTypesList.indexOf(unittype);
      const index2 = assignedUnitTypesList.indexOf(lastClick);
      var array;
      if (index1 < index2) {
        array = assignedUnitTypesList.slice(index1, index2 + 1);
      } else {
        array = assignedUnitTypesList.slice(index2, index1 + 1);
      }
      array.map((obj) => {
        if (!unSelectedList.includes(obj)) {
          dispatch(assignedUnitTypesList(obj));
        }
      });
    } else if (event.ctrlKey) {
      if (unSelectedList.includes(unittype)) {
        dispatch(removeFromUnSelectedList(unittype));
      } else {
        dispatch(updateUnSelectedList(unittype));
      }
      setLastClick(unittype);
    } else if (event.shiftKey) {
      event.preventDefault();
      const index1 = assignedUnitTypesList.indexOf(unittype);
      const index2 = assignedUnitTypesList.indexOf(lastClick);
      var array;
      if (index1 < index2) {
        array = assignedUnitTypesList.slice(index1, index2 + 1);
      } else {
        array = assignedUnitTypesList.slice(index2, index1 + 1);
      }
      array.map((obj) => {
        if (!unSelectedList.includes(obj)) {
          dispatch(updateUnSelectedList(obj));
        }
      });
    } else {
      const isPresent = unSelectedList.find((obj) => obj.unitTypePK === unittype.unitTypePK);
      if (isPresent) {
        dispatch(removeFromUnSelectedList(unittype));
      } else {
        dispatch(setUnSelectedList(unittype));
      }
      setLastClick(unittype);
    }
  };

  const handleDoubleClick = (unittype) => {
    dispatch(setChangesInUnitTypeSelection(true));
    if (reverseFlag) {
      dispatch(updateExceptList(unittype));
    }

    if (initialList.includes(unittype)) {
      dispatch(updateDeleteList(unittype));
    } else if (saveList.includes(unittype)) {
      dispatch(removeSaveList(unittype));
    } else {
      dispatch(updateExceptList(unittype));
    }
  };

  useEffect(() => {
    // setLoading(true);
    dispatch(setRightLoading(true));
    const debounceFunction = setTimeout(() => {
      UnitTypeGroupsService.getRightUnitType(
        reverseFlag,
        assignedPageNumber,
        initialList,
        deleteList,
        saveList,
        exceptList,
        unitTypeSortFlag,
        unitTypeSortValue,
        radioValue
      )
        .then((response) => {
          const { data } = response;
          dispatch(setAssignedUnitTypesList(data.content));
          dispatch(setAssignedTotalElements(data.totalElements));
          dispatch(setAssignedTotalPages(data.totalPages));
          setLastClick(data.content[0]);
          setIsFirstPage(data.first);
          setIsLastPage(data.last);
          setNumberOfElements(data.numberOfElements);
        })
        .catch(() => {
          console.error();
        })
        .finally(() => {
          dispatch(setRightLoading(false));
        });
    }, 200);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    initialList,
    reverseFlag,
    saveList,
    deleteList,
    assignedPageNumber,
    exceptList,
    unitTypeSortFlag,
    unitTypeSortValue,
    radioValue,
  ]);
  const getInitialList = () => {
    UnitTypeGroupsService.getInitialList(id).then((response) => {
      dispatch(setinitialList(response.data));
    });
  };

  useEffect(() => {
    dispatch(setinitialList());
    getInitialList();
  }, []);
  useEffect(() => {
    if (isLastPage && !isFirstPage && numberOfElements === 0) {
      dispatch(setAssignedPageNumber(assignedPageNumber - 1));
    }
  }, [isFirstPage, isLastPage, numberOfElements]);
  return (
    <div className="fixTableHead no-select" style={{ padding: 0, flex: 1 }}>
      {
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                className="f-w-600"
                onClick={() => {
                  dispatch(setUnitTypeSortFlag());
                  dispatch(setUnitTypeSortValue("descriptionLong"));
                }}
              >
                Description
                {unitTypeSortFlag && unitTypeSortValue === "descriptionLong" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!unitTypeSortFlag && unitTypeSortValue === "descriptionLong" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {!rightLoading &&
              assignedUnitTypesList.length !== 0 &&
              assignedUnitTypesList?.map((unittype) => (
                <tr
                  id="rowId"
                  key={unittype.unitTypePK}
                  onClick={(event) => {
                    handleClick(event, unittype);
                  }}
                  onDoubleClick={() => {
                    handleDoubleClick(unittype.unitTypePK);
                    dispatch(removeFromUnSelectedList(unittype));
                  }}
                  className={
                    unSelectedList.some((element) => element.unitTypePK === unittype.unitTypePK)
                      ? "tableSelected"
                      : ""
                  }
                >
                  <td>{unittype.descriptionLong}</td>
                </tr>
              ))}
          </tbody>
        </table>
      }
      {!rightLoading && assignedUnitTypesList.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};

export default RightUnitTypesListing;
