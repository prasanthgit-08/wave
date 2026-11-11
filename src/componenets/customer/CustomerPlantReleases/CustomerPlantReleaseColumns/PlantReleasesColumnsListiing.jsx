import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setColumnId,
  setColumnListTotalElements,
  setColumnListTotalPages,
  setColumnsEditFormData,
  setDelimitedCheck,
  setFieldName,
  setFieldWidth,
  setFinalPaginatedArray,
  setIgnore,
  setKeyField,
  setPlantReleaseColumnList,
  setUpdateField,
} from "../../../../redux/CustomerPlantReleasesSlice";
import usePagination from "../../../../hooks/usePagination";
import LoadingIcon from "../../../common/LoadingIcon";
import CustomerPlantReleaseService from "../../../../services/CustomerPlantReleaseService";

const PlantReleasesColumnsListiing = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const plantReleaseColumnList = useSelector(
    (state) => state.customerPlantReleaseReducer.plantReleaseColumnList
  );
  const assignedPageNumber = useSelector((state) => state.customerPlantReleaseReducer.assignedPageNumber);
  const columnId = useSelector((state) => state.customerPlantReleaseReducer.columnId);
  const [loader, setLoader] = useState(false);
  const [localPaginatedArray, setLocalPaginatedArray] = useState([]);

  const fetchData = () => {
    setLoader(true);
    CustomerPlantReleaseService.getPlantReleasesById({ id, flag: "COLUMNS" })
      .then((response) => {
        const { data } = response;
        setLoader(false);
        dispatch(
          setPlantReleaseColumnList({ actionType: "set", payload: data?.customerPlantReleasesColumns })
        );
        dispatch(setDelimitedCheck(data?.plantReleaseDeLimited[0]?.delimited));
      })
      .catch(() => {
        setLoader(false);
      });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list

    const newItems = Array.from(localPaginatedArray);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setLocalPaginatedArray(newItems);
    const startIndex = assignedPageNumber * 11;

    // Dispatch an action to update only the affected slice in Redux
    dispatch(
      setPlantReleaseColumnList({
        actionType: "update_current_page",
        payload: {
          pageData: newItems,
          startIndex: startIndex,
        },
      })
    );
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchData();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [id]);

  const pagination = usePagination(plantReleaseColumnList, assignedPageNumber, 11);
  const { paginatedArray, totalElements, totalPages } = pagination;

  useEffect(() => {
    setLocalPaginatedArray(paginatedArray);
  }, [paginatedArray]);

  useEffect(() => {
    dispatch(setColumnListTotalElements(totalElements));
    dispatch(setColumnListTotalPages(totalPages));
    dispatch(setFinalPaginatedArray(paginatedArray));
  }, [totalElements, totalPages, paginatedArray]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th className="f-w-600">Field Name</th>
          </tr>
        </thead>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {localPaginatedArray?.map((column, index) => (
                  <Draggable
                    key={column.columnNumber}
                    draggableId={column.columnNumber.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        id="rowId"
                        key={column.columnNumber}
                        onClick={() => {
                          dispatch(setColumnId(column.columnNumber));
                          dispatch(setColumnsEditFormData(column));
                          dispatch(setFieldName(column?.fieldName));
                          dispatch(setKeyField(column?.keyField));
                          dispatch(setUpdateField(column?.updateField));
                          dispatch(setIgnore(column?.ignore));
                          dispatch(setFieldWidth(column?.fieldWidth));
                        }}
                        className={column?.columnNumber === columnId ? "tableSelected" : ""}
                      >
                        <td className="f-w-600">{column?.FieldName || column?.fieldName || ""}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
      {!loader && paginatedArray?.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
      {loader && <LoadingIcon />}
    </div>
  );
};

export default PlantReleasesColumnsListiing;
