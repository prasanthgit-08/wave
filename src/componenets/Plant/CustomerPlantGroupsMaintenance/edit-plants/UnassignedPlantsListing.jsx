import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomerPlantGroupsService from "../../../../services/CustomerPlantGroupsService";
import {
  removeDeleteList,
  removeExceptList,
  removeFromSelectedList,
  removeFromUnSelectedList,
  setLeftPlantsList,
  setLeftPlantsPageno,
  setLeftPlantsSort,
  setLeftPlantsSortValue,
  setLeftPlantsTotalElements,
  setLeftPlantsTotalPages,
  setSelectedList,
  setinitialList,
  updateSaveList,
  updateSelectedList,
} from "../../../../redux/CustomerPlantGroupSlice";
import LoadingText from "../../../common/LoadingText";

const UnassignedPlantsListing = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const initialList = useSelector((state) => state.customerPlantGroup.initialList);
  const saveList = useSelector((state) => state.customerPlantGroup.saveList);
  const deleteList = useSelector((state) => state.customerPlantGroup.deleteList);
  const exceptList = useSelector((state) => state.customerPlantGroup.exceptList);
  const reverseFlag = useSelector((state) => state.customerPlantGroup.reverseFlag);

  const selectedList = useSelector((state) => state.customerPlantGroup.selectedList);
  const leftPlantsList = useSelector((state) => state.customerPlantGroup.leftPlantsList);
  const leftPlantsPageno = useSelector((state) => state.customerPlantGroup.leftPlantsPageno);
  const leftPlantsSort = useSelector((state) => state.customerPlantGroup.leftPlantsSort);
  const leftPlantsSortValue = useSelector((state) => state.customerPlantGroup.leftPlantsSortValue);
  const selectedCustomer = useSelector((state) => state.customerPlantGroup.selectedCustomer);

  const [lastClick, setLastClick] = useState();
  const [loading, setLoading] = useState(true);

  const handleClick = (event, plant) => {
    if (event.ctrlKey) {
      if (event.shiftKey) {
        const index1 = leftPlantsList.indexOf(plant);
        const index2 = leftPlantsList.indexOf(lastClick);
        var array;
        if (index1 < index2) {
          array = leftPlantsList.slice(index1, index2 + 1);
        } else {
          array = leftPlantsList.slice(index2, index1 + 1);
        }
        array.map((obj) => {
          if (!selectedList.includes(obj)) {
            dispatch(updateSelectedList(obj));
          }
        });
      } else if (selectedList.includes(plant)) {
        dispatch(removeFromSelectedList(plant));
      } else {
        dispatch(updateSelectedList(plant));
      }
      setLastClick(plant);
    } else if (event.shiftKey) {
      const index1 = leftPlantsList.indexOf(plant);
      const index2 = leftPlantsList.indexOf(lastClick);
      var array;
      if (index1 < index2) {
        array = leftPlantsList.slice(index1, index2 + 1);
      } else {
        array = leftPlantsList.slice(index2, index1 + 1);
      }
      array.map((obj) => {
        if (!selectedList.includes(obj)) {
          dispatch(updateSelectedList(obj));
        }
      });
    } else {
      const isPresent = selectedList.find((obj) => obj.customerPlantPK === plant.customerPlantPK);
      if (isPresent) {
        dispatch(removeFromSelectedList(plant));
      } else {
        dispatch(setSelectedList(plant));
      }
      setLastClick(plant);
    }
  };

  const getInitialPlants = () => {
    CustomerPlantGroupsService.getInitialPlants(id).then(({ data }) => {
      dispatch(setinitialList(data));
    });
  };

  const listAssisgnedPlants = () => {
    setLoading(true);
    CustomerPlantGroupsService.getLeftPlants(
      reverseFlag,
      leftPlantsPageno,
      initialList,
      deleteList,
      saveList,
      exceptList,
      leftPlantsSort,
      leftPlantsSortValue,
      selectedCustomer
    ).then(({ data }) => {
      dispatch(setLeftPlantsList(data.content));
      dispatch(setLeftPlantsTotalElements(data.totalElements));
      dispatch(setLeftPlantsTotalPages(data.totalPages));
      setLastClick(data.content[0]);
      if (!data.first && data.last && data.numberOfElements === 0) {
        dispatch(setLeftPlantsPageno(leftPlantsPageno - 1));
      } else {
        setLoading(false);
      }
    });
  };

  const handleDoubleClick = (plant) => {
    if (initialList.includes(plant.customerPlantPK)) {
      dispatch(removeDeleteList(plant.customerPlantPK));
    } else {
      if (exceptList.includes(plant.customerPlantPK)) {
        dispatch(removeExceptList(plant.customerPlantPK));
      } else {
        dispatch(updateSaveList(plant.customerPlantPK));
      }
    }
    dispatch(removeFromSelectedList(plant));
  };
  useEffect(() => {
    getInitialPlants();
  }, []);

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      listAssisgnedPlants();
    }, 200);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    initialList,
    saveList,
    deleteList,
    exceptList,
    reverseFlag,
    leftPlantsPageno,
    leftPlantsSort,
    leftPlantsSortValue,
    selectedCustomer,
  ]);

  return (
    <div>
      <div className="fixTableHead no-select" style={{ padding: 0, flex: 1 }}>
        {loading && <LoadingText smallerFont />}
        {
          <table className="table table-striped f-w-600">
            <thead>
              <tr disabled>
                <th
                  className="f-w-600 "
                  onClick={() => {
                    dispatch(setLeftPlantsSort());
                    dispatch(setLeftPlantsSortValue("name"));
                  }}
                >
                  Plant
                  {leftPlantsSort && leftPlantsSortValue === "name" && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {!leftPlantsSort && leftPlantsSortValue === "name" && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                leftPlantsList.length !== 0 &&
                leftPlantsList?.map((plant) => (
                  <tr
                    id="rowId"
                    key={plant.customerPlantPK}
                    onClick={(event) => {
                      handleClick(event, plant);
                    }}
                    onDoubleClick={() => {
                      handleDoubleClick(plant);
                      dispatch(removeFromUnSelectedList(plant));
                    }}
                    className={
                      selectedList.some((element) => element.customerPlantPK === plant.customerPlantPK)
                        ? "tableSelected"
                        : ""
                    }
                  >
                    <td>{plant.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        }
        {!loading && leftPlantsList.length === 0 && (
          <h2 className="noRecordsSmallerFont" align="center">
            No Records Available
          </h2>
        )}
      </div>
    </div>
  );
};

export default UnassignedPlantsListing;
