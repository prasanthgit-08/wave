import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExportBrokersService from "../../../../services/ExportBrokersService";
import { useState } from "react";
import LoadingText from "../../../common/LoadingText";
import {
  changesInPortsSelection,
  removeDeleteList,
  removeExceptList,
  removeFromSelectedList,
  setChangesInPortsSelection,
  setLeftLoading,
  setLeftPageNumber,
  setLeftTotalElements,
  setLeftTotalPages,
  setSelectedList,
  setSort,
  setSortValue,
  setleftPortsList,
  updateSaveList,
  updateSelectedList,
} from "../../../../redux/EditExportBrokersSlice";
const LeftPortsListing = () => {
  const dispatch = useDispatch();
  const leftPortsList = useSelector((state) => state.editExportBrokersReducer.leftPortsList);
  const leftPageNumber = useSelector((state) => state.editExportBrokersReducer.leftPageNumber);
  const leftTotalElements = useSelector((state) => state.editExportBrokersReducer.leftTotalElements);
  const leftTotalPages = useSelector((state) => state.editExportBrokersReducer.leftTotalPages);
  const selectedList = useSelector((state) => state.editExportBrokersReducer.selectedList);
  const initialList = useSelector((state) => state.editExportBrokersReducer.initialList);
  const saveList = useSelector((state) => state.editExportBrokersReducer.saveList);
  const deleteList = useSelector((state) => state.editExportBrokersReducer.deleteList);
  const exceptList = useSelector((state) => state.editExportBrokersReducer.exceptList);
  const sort = useSelector((state) => state.editExportBrokersReducer.sort);
  const sortValue = useSelector((state) => state.editExportBrokersReducer.sortValue);
  const reverseList = useSelector((state) => state.editExportBrokersReducer.reverseList);
  const leftLoading = useSelector((state) => state.editExportBrokersReducer.leftLoading);
  const rightLoading = useSelector((state) => state.editExportBrokersReducer.rightLoading);
  const hasInitials = useSelector((state) => state.editExportBrokersReducer.hasInitials);

  const [lastClick, setLastClick] = useState();
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(null);
  const handleClick = (event, ports) => {
    dispatch(setChangesInPortsSelection(true));
    if (event.ctrlKey) {
      if (event.shiftKey) {
        const index1 = leftPortsList.indexOf(ports);
        const index2 = leftPortsList.indexOf(lastClick);

        if (index1 < index2) {
          dispatch(updateSelectedList(leftPortsList.slice(index1, index2 + 1)));
        } else {
          dispatch(updateSelectedList(leftPortsList.slice(index2, index1 + 1)));
        }
      } else if (selectedList.includes(ports)) {
        dispatch(removeFromSelectedList(ports));
      } else {
        dispatch(updateSelectedList(ports));
      }
      setLastClick(ports);
    } else if (event.shiftKey) {
      dispatch(setSelectedList());
      const index1 = leftPortsList.indexOf(ports);
      const index2 = leftPortsList.indexOf(lastClick);

      if (index1 < index2) {
        dispatch(setSelectedList(leftPortsList.slice(index1, index2 + 1)));
      } else {
        dispatch(setSelectedList(leftPortsList.slice(index2, index1 + 1)));
      }
    } else {
      const isPresent = selectedList.find((obj) => obj.poePK === ports.poePK);
      if (isPresent) {
        dispatch(removeFromSelectedList(ports));
      } else {
        dispatch(setSelectedList(ports));
      }
      setLastClick(ports);
    }
  };
  const handleDoubleClick = (portpk) => {
    dispatch(setChangesInPortsSelection(true));
    if (initialList.includes(portpk)) {
      dispatch(removeDeleteList(portpk));
    } else {
      if (exceptList.includes(portpk)) {
        dispatch(removeExceptList(portpk));
      } else {
        dispatch(updateSaveList(portpk));
      }
    }
  };

  useEffect(() => {
    if (hasInitials) {
      dispatch(setLeftLoading(true));
      const debounceFunction = setTimeout(() => {
        ExportBrokersService.getLeftPorts(
          reverseList,
          leftPageNumber,
          0,
          initialList,
          deleteList,
          saveList,
          exceptList,
          sort,
          sortValue
        )
          .then((response) => {
            dispatch(setleftPortsList(response.data.content));
            dispatch(setLeftTotalElements(response.data.totalElements));
            dispatch(setLeftTotalPages(response.data.totalPages));
            setLastClick(response.data.content[0]);
            setIsFirstPage(response.data.first);
            setIsLastPage(response.data.last);
            setNumberOfElements(response.data.numberOfElements);
          })
          .catch(() => {
            console.error();
          })
          .finally(() => {
            dispatch(setLeftLoading(false));
          });
      }, 100); // Replace 1000 with the desired timeout duration in milliseconds

      return () => {
        clearTimeout(debounceFunction);
      };
    }
  }, [reverseList, initialList, saveList, deleteList, leftPageNumber, exceptList, sort, sortValue]);

  useEffect(() => {}, [reverseList]);

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
                  dispatch(setSort());
                  dispatch(setSortValue("usCity"));
                }}
              >
                Ports Of Entry
                {sort && sortValue === "usCity" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sort && sortValue === "usCity" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
              </th>
            </tr>
          </thead>
          <tbody>
            {!leftLoading &&
              leftPortsList.length !== 0 &&
              leftPortsList.map((ports) => (
                <tr
                  id="rowId"
                  key={ports.poePK}
                  onClick={(event) => {
                    handleClick(event, ports);
                  }}
                  onDoubleClick={() => {
                    handleDoubleClick(ports.poePK);
                    dispatch(removeFromSelectedList(ports));
                  }}
                  className={
                    selectedList.some((element) => element.poePK === ports.poePK) ? "tableSelected" : ""
                  }
                >
                  <td className="f-w-600">
                    {ports.usCity}, {ports.stateCode}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      }
      {!leftLoading && leftPortsList.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
      {(leftLoading || rightLoading) && <LoadingText smallerFont />}
    </div>
  );
};
export default LeftPortsListing;
