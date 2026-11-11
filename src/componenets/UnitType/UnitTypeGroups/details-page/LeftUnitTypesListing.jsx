import React, { useEffect, useState } from "react";
import LoadingText from "../../../common/LoadingText";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDeleteList,
  removeExceptList,
  removeFromSelectedList,
  setChangesInUnitTypeSelection,
  setLeftLoading,
  setLeftPageNumber,
  setLeftTotalElements,
  setLeftTotalPages,
  setLeftUnitTypeList,
  setSelectedList,
  setSortFlag,
  setSortValue,
  updateSaveList,
  updateSelectedList,
} from "../../../../redux/UnitTypeGroupSlice";
import UnitTypeGroupsService from "../../../../services/UnitTypeGroupsService";
const LeftUnitTypesListing = () => {
  const dispatch = useDispatch();
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(null);

  const leftUnitTypeList = useSelector((state) => state.unitTypeGroupReducer.leftUnitTypeList);
  const leftPageNumber = useSelector((state) => state.unitTypeGroupReducer.leftPageNumber);

  const selectedList = useSelector((state) => state.unitTypeGroupReducer.selectedList);
  const initialList = useSelector((state) => state.unitTypeGroupReducer.initialList);
  const saveList = useSelector((state) => state.unitTypeGroupReducer.saveList);
  const deleteList = useSelector((state) => state.unitTypeGroupReducer.deleteList);
  const exceptList = useSelector((state) => state.unitTypeGroupReducer.exceptList);
  const sortFlag = useSelector((state) => state.unitTypeGroupReducer.sortFlag);
  const sortValue = useSelector((state) => state.unitTypeGroupReducer.sortValue);
  const reverseFlag = useSelector((state) => state.unitTypeGroupReducer.reverseFlag);
  const radioValue = useSelector((state) => state.unitTypeGroupReducer.radioValue);
  const leftLoading = useSelector((state) => state.unitTypeGroupReducer.leftLoading);
  const rightLoading = useSelector((state) => state.unitTypeGroupReducer.rightLoading);

  const [lastClick, setLastClick] = useState();
  const [loading, setLoading] = useState(false);
  const handleClick = (event, unittype) => {
    if (event.ctrlKey) {
      if (event.shiftKey) {
        const index1 = leftUnitTypeList.indexOf(unittype);
        const index2 = leftUnitTypeList.indexOf(lastClick);

        if (index1 < index2) {
          dispatch(updateSelectedList(leftUnitTypeList.slice(index1, index2 + 1)));
        } else {
          dispatch(updateSelectedList(leftUnitTypeList.slice(index2, index1 + 1)));
        }
      } else if (selectedList.includes(unittype)) {
        dispatch(removeFromSelectedList(unittype));
      } else {
        dispatch(updateSelectedList(unittype));
      }
      setLastClick(unittype);
    } else if (event.shiftKey) {
      dispatch(setSelectedList());
      const index1 = leftUnitTypeList.indexOf(unittype);
      const index2 = leftUnitTypeList.indexOf(lastClick);

      if (index1 < index2) {
        dispatch(setSelectedList(leftUnitTypeList.slice(index1, index2 + 1)));
      } else {
        dispatch(setSelectedList(leftUnitTypeList.slice(index2, index1 + 1)));
      }
    } else {
      const isPresent = selectedList.find((obj) => obj.unitTypePK === unittype.unitTypePK);
      if (isPresent) {
        dispatch(removeFromSelectedList(unittype));
      } else {
        dispatch(setSelectedList(unittype));
      }
      setLastClick(unittype);
    }
  };

  const handleDoubleClick = (unitType) => {
    dispatch(setChangesInUnitTypeSelection(true));
    if (initialList.includes(unitType)) {
      dispatch(removeDeleteList(unitType));
    } else {
      if (exceptList.includes(unitType)) {
        dispatch(removeExceptList(unitType));
      } else {
        dispatch(updateSaveList(unitType));
      }
    }
  };
  useEffect(() => {
    dispatch(setLeftLoading(true));
    // setLoading(true);
    const debounceFunction = setTimeout(() => {
      UnitTypeGroupsService.getLeftUnitTypes(
        reverseFlag,
        leftPageNumber,
        initialList,
        deleteList,
        saveList,
        exceptList,
        sortFlag,
        sortValue,
        radioValue
      )
        .then((response) => {
          const { data } = response;
          dispatch(setLeftUnitTypeList(data.content));
          dispatch(setLeftTotalElements(data.totalElements));
          dispatch(setLeftTotalPages(data.totalPages));
          setLastClick(data.content[0]);
          setIsFirstPage(data.first);
          setIsLastPage(data.last);
          setNumberOfElements(data.numberOfElements);
        })
        .catch(() => {})
        .finally(() => {
          dispatch(setLeftLoading(false));
        });
    }, 200);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    reverseFlag,
    initialList,
    saveList,
    deleteList,
    leftPageNumber,
    exceptList,
    sortFlag,
    sortValue,
    radioValue,
  ]);
  useEffect(() => {
    if (isLastPage && !isFirstPage && numberOfElements === 0) {
      dispatch(setLeftPageNumber(leftPageNumber - 1));
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
                  dispatch(setSortFlag());
                  dispatch(setSortValue("descriptionLong"));
                }}
              >
                Description
                {sortFlag && sortValue === "descriptionLong" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "descriptionLong" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {!leftLoading &&
              leftUnitTypeList.length !== 0 &&
              leftUnitTypeList.map((unittypes) => (
                <tr
                  id="rowId"
                  key={unittypes.unitTypePK}
                  onClick={(event) => {
                    handleClick(event, unittypes);
                  }}
                  onDoubleClick={() => {
                    handleDoubleClick(unittypes.unitTypePK);
                    dispatch(removeFromSelectedList(unittypes));
                  }}
                  className={
                    selectedList.some((element) => element.unitTypePK === unittypes.unitTypePK)
                      ? "tableSelected"
                      : ""
                  }
                >
                  <td className="f-w-600">{unittypes.descriptionLong}</td>
                </tr>
              ))}
          </tbody>
        </table>
      }
      {!leftLoading && leftUnitTypeList.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
      {(leftLoading || rightLoading) && <LoadingText />}
    </div>
  );
};
export default LeftUnitTypesListing;
