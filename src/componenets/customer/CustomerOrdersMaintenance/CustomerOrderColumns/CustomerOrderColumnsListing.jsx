import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomerOrderColumnsService from "../../../../services/CustomerOrderColumnsService";
import {
  setColumnId,
  setColumnsEditFormData,
  setCustomerOrdersColumnList,
  setDelimitedCheck,
} from "../../../../redux/CustomerOrdersSlice";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import LoadingIcon from "../../../common/LoadingIcon";

const CustomerOrderColumnsListing = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const customerOrdersColumnList = useSelector(
    (state) => state.customerOrdersReducer.customerOrdersColumnList
  );
  const columnId = useSelector((state) => state.customerOrdersReducer.columnId);
  const [loader, setLoader] = useState(false);

  const fetchData = () => {
    setLoader(true);
    CustomerOrderColumnsService.customerOrderColumnlist(id)
      .then((response) => {
        const { data } = response;
        const listingData = data?.slice(0, data?.length - 1);
        const delimitedValue = data[data?.length - 1];
        setLoader(false);
        dispatch(setCustomerOrdersColumnList({ actionType: "set", payload: listingData }));
        dispatch(setDelimitedCheck(delimitedValue?.delimited));
      })
      .catch(() => {
        setLoader(false);
      });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list

    // Whole list is rendered (scroll, no pagination), so a row can be moved to any position
    const newItems = Array.from(customerOrdersColumnList);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    dispatch(setCustomerOrdersColumnList({ actionType: "set", payload: newItems }));
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchData();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [id]);

  return (
    <div className="fixTableHead h-100" style={{ overflowY: "auto" }}>
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
                {customerOrdersColumnList?.map((column, index) => (
                  <Draggable key={column.id} draggableId={column.id.toString()} index={index}>
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        id="rowId"
                        key={column.id}
                        onClick={() => {
                          dispatch(setColumnId(column.id));
                          dispatch(setColumnsEditFormData(column));
                        }}
                        className={column?.id === columnId ? "tableSelected" : ""}
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
      {!loader && !customerOrdersColumnList?.length && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
      {loader && <LoadingIcon />}
    </div>
  );
};
export default CustomerOrderColumnsListing;
