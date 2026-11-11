import React from "react";
import { useEffect } from "react";
import ExportBrokersService from "../../../../services/ExportBrokersService";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import LoadingText from "../../../common/LoadingText";
import {
  removeFromUnSelectedList,
  removeSaveList,
  setChangesInPortsSelection,
  setRightSort,
  setRightSortValue,
  setUnSelectedList,
  setinitialList,
  updateDeleteList,
  updateExceptList,
  updateUnSelectedList,
  setRightLoading,
  setHasInitials,
} from "../../../../redux/EditExportBrokersSlice";
import {
  setAssignedPageNumber,
  setAssignedPortsList,
  setAssignedTotalElements,
  setAssignedTotalPages,
} from "../../../../redux/ExportBrokersSlice";

const RightPortsListing = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const assignedPageNumber = useSelector((state) => state.exportBrokersReducer.assignedPageNumber);
  const assignedPortsList = useSelector((state) => state.exportBrokersReducer.assignedPortsList);
  const unSelectedList = useSelector((state) => state.editExportBrokersReducer.unSelectedList);
  const excludeList = useSelector((state) => state.exportBrokersReducer.excludeList);
  const initialList = useSelector((state) => state.editExportBrokersReducer.initialList);
  const saveList = useSelector((state) => state.editExportBrokersReducer.saveList);
  const deleteList = useSelector((state) => state.editExportBrokersReducer.deleteList);
  const exceptList = useSelector((state) => state.editExportBrokersReducer.exceptList);
  const rightSort = useSelector((state) => state.editExportBrokersReducer.rightSort);
  const rightSortValue = useSelector((state) => state.editExportBrokersReducer.rightSortValue);
  const reverseList = useSelector((state) => state.editExportBrokersReducer.reverseList);
  const rightLoading = useSelector((state) => state.editExportBrokersReducer.rightLoading);
  const hasInitials = useSelector((state) => state.editExportBrokersReducer.hasInitials);

  const [lastClick, setLastClick] = useState();
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleClick = (event, ports) => {
    dispatch(setChangesInPortsSelection(true));
    if (event.ctrlKey && event.shiftKey) {
      event.preventDefault();
      const index1 = assignedPortsList.indexOf(ports);
      const index2 = assignedPortsList.indexOf(lastClick);
      var array;
      if (index1 < index2) {
        array = assignedPortsList.slice(index1, index2 + 1);
      } else {
        array = assignedPortsList.slice(index2, index1 + 1);
      }
      array.map((obj) => {
        if (!unSelectedList.includes(obj)) {
          dispatch(assignedPortsList(obj));
        }
      });
    } else if (event.ctrlKey) {
      if (unSelectedList.includes(ports)) {
        dispatch(removeFromUnSelectedList(ports));
      } else {
        dispatch(updateUnSelectedList(ports));
      }
      setLastClick(ports);
    } else if (event.shiftKey) {
      event.preventDefault();
      const index1 = assignedPortsList.indexOf(ports);
      const index2 = assignedPortsList.indexOf(lastClick);
      var array;
      if (index1 < index2) {
        array = assignedPortsList.slice(index1, index2 + 1);
      } else {
        array = assignedPortsList.slice(index2, index1 + 1);
      }
      array.map((obj) => {
        if (!unSelectedList.includes(obj)) {
          dispatch(updateUnSelectedList(obj));
        }
      });
    } else {
      const isPresent = unSelectedList.find((obj) => obj.dealerPK === ports.poePK);
      if (isPresent) {
        dispatch(removeFromUnSelectedList(ports));
      } else {
        dispatch(setUnSelectedList(ports));
      }
      setLastClick(ports);
    }
  };
  const handleDoubleClick = (ports) => {
    dispatch(setChangesInPortsSelection(true));
    if (reverseList) {
      dispatch(updateExceptList(ports));
      if (initialList.includes(ports)) {
        dispatch(updateDeleteList(ports));
      }
    } else if (initialList.includes(ports)) {
      dispatch(updateDeleteList(ports));
    } else if (saveList.includes(ports)) {
      dispatch(removeSaveList(ports));
    } else {
      dispatch(updateExceptList(ports));
    }
  };
  const getInitialList = () => {
    ExportBrokersService.getInitialList(id).then((response) => {
      dispatch(setHasInitials(true));
      dispatch(setinitialList(response.data));
    });
  };

  useEffect(() => {
    if (hasInitials) {
      dispatch(setRightLoading(true));
      const debounceFunction = setTimeout(() => {
        ExportBrokersService.getRightPorts(
          reverseList,
          assignedPageNumber,
          20,
          initialList,
          deleteList,
          saveList,
          exceptList,
          rightSort,
          rightSortValue
        )
          .then((response) => {
            dispatch(setAssignedPortsList(response.data.content));
            dispatch(setAssignedTotalElements(response.data.totalElements));
            dispatch(setAssignedTotalPages(response.data.totalPages));
            setLastClick(response.data.content[0]);
            setIsFirstPage(response.data.first);
            setIsLastPage(response.data.last);
            setNumberOfElements(response.data.numberOfElements);
            setTimeout(() => {
              dispatch(setRightLoading(false));
            }, 100);
          })
          .catch(() => {
            dispatch(setRightLoading(false));
            console.error();
          });
      }, 200);

      return () => {
        clearTimeout(debounceFunction);
      };
    }
  }, [
    initialList,
    reverseList,
    saveList,
    deleteList,
    assignedPageNumber,
    exceptList,
    rightSort,
    rightSortValue,
  ]);

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
      {loading && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
      {
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                className="f-w-600 "
                onClick={() => {
                  dispatch(setRightSort());
                  dispatch(setRightSortValue("usCity"));
                }}
              >
                Ports Of Entry
                {rightSort && rightSortValue === "usCity" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!rightSort && rightSortValue === "usCity" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {!rightLoading &&
              assignedPortsList.length !== 0 &&
              assignedPortsList?.map((ports) => (
                <tr
                  id="rowId"
                  key={ports.poePK}
                  onClick={(event) => {
                    handleClick(event, ports);
                  }}
                  onDoubleClick={() => {
                    handleDoubleClick(ports.poePK);
                    dispatch(removeFromUnSelectedList(ports));
                  }}
                  className={
                    unSelectedList.some((element) => element.poePK === ports.poePK) ? "tableSelected" : ""
                  }
                >
                  <td>
                    {ports.usCity}, {ports.stateCode}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      }
      {!rightLoading && assignedPortsList.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};
export default RightPortsListing;
