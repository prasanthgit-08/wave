import React, { useEffect, useState } from "react";
import CustomerPlantGroupsService from "../../../../services/CustomerPlantGroupsService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromUnSelectedList,
  removeSaveList,
  setRightPlantsList,
  setRightPlantsPageno,
  setRightPlantsSort,
  setRightPlantsSortValue,
  setRightPlantsTotalElements,
  setRightPlantsTotalPages,
  setUnSelectedList,
  updateDeleteList,
  updateExceptList,
  updateUnSelectedList,
} from "../../../../redux/CustomerPlantGroupSlice";
import LoadingText from "../../../common/LoadingText";

const AssignedPlantsListing = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id } = useParams();

  const [lastClick, setLastClick] = useState();
  const [loading, setLoading] = useState(true);

  const initialList = useSelector((state) => state.customerPlantGroup.initialList);
  const saveList = useSelector((state) => state.customerPlantGroup.saveList);
  const deleteList = useSelector((state) => state.customerPlantGroup.deleteList);
  const exceptList = useSelector((state) => state.customerPlantGroup.exceptList);
  const reverseFlag = useSelector((state) => state.customerPlantGroup.reverseFlag);

  const unSelectedList = useSelector((state) => state.customerPlantGroup.unSelectedList);
  const rightPlantsList = useSelector((state) => state.customerPlantGroup.rightPlantsList);
  const rightPlantsPageno = useSelector((state) => state.customerPlantGroup.rightPlantsPageno);
  const rightPlantsSort = useSelector((state) => state.customerPlantGroup.rightPlantsSort);
  const rightPlantsSortValue = useSelector((state) => state.customerPlantGroup.rightPlantsSortValue);
  const selectedCustomer = useSelector((state) => state.customerPlantGroup.selectedCustomer);

  const listAssisgnedPlants = () => {
    setLoading(true);
    CustomerPlantGroupsService.getRightPlants(
      reverseFlag,
      rightPlantsPageno,
      initialList,
      deleteList,
      saveList,
      exceptList,
      rightPlantsSort,
      rightPlantsSortValue,
      selectedCustomer
    ).then(({ data }) => {
      dispatch(setRightPlantsList(data.content));
      dispatch(setRightPlantsTotalElements(data.totalElements));
      dispatch(setRightPlantsTotalPages(data.totalPages));
      setLastClick(data.content[0]);
      if (!data.first && data.last && data.numberOfElements === 0) {
        dispatch(setRightPlantsPageno(rightPlantsPageno - 1));
      } else {
        setLoading(false);
      }
    });
  };

  const handleClick = (event, plant) => {
    if (event.ctrlKey && event.shiftKey) {
      event.preventDefault();
      const index1 = rightPlantsList.indexOf(plant);
      const index2 = rightPlantsList.indexOf(lastClick);
      var array;
      if (index1 < index2) {
        array = rightPlantsList.slice(index1, index2 + 1);
      } else {
        array = rightPlantsList.slice(index2, index1 + 1);
      }
      array.map((obj) => {
        if (!unSelectedList.includes(obj)) {
          dispatch(updateUnSelectedList(obj));
        }
      });
    } else if (event.ctrlKey) {
      if (unSelectedList.includes(plant)) {
        dispatch(removeFromUnSelectedList(plant));
      } else {
        dispatch(updateUnSelectedList(plant));
      }
      setLastClick(plant);
    } else if (event.shiftKey) {
      event.preventDefault();
      const index1 = rightPlantsList.indexOf(plant);
      const index2 = rightPlantsList.indexOf(lastClick);
      var array;
      if (index1 < index2) {
        array = rightPlantsList.slice(index1, index2 + 1);
      } else {
        array = rightPlantsList.slice(index2, index1 + 1);
      }
      array.map((obj) => {
        if (!unSelectedList.includes(obj)) {
          dispatch(updateUnSelectedList(obj));
        }
      });
    } else {
      const isPresent = unSelectedList.find((obj) => obj.customerPlantPK === plant.customerPlantPK);
      if (isPresent) {
        dispatch(removeFromUnSelectedList(plant));
      } else {
        dispatch(setUnSelectedList(plant));
      }
      setLastClick(plant);
    }
  };

  const handleDoubleClick = (plant) => {
    if (reverseFlag) {
      dispatch(updateExceptList(plant.customerPlantPK));
    }

    if (initialList.includes(plant.customerPlantPK)) {
      dispatch(updateDeleteList(plant.customerPlantPK));
    } else if (saveList.includes(plant.customerPlantPK)) {
      dispatch(removeSaveList(plant.customerPlantPK));
    } else {
      dispatch(updateExceptList(plant.customerPlantPK));
    }
  };
  useEffect(() => {
    if (!selectedCustomer) {
      navigate("/edit-plant-groups/" + id + "/" + 0);
    }
  }, [selectedCustomer]);

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
    rightPlantsSort,
    rightPlantsSortValue,
    rightPlantsPageno,
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
                    dispatch(setRightPlantsSort());
                    dispatch(setRightPlantsSortValue("name"));
                  }}
                >
                  Plant
                  {!loading && rightPlantsSort && rightPlantsSortValue === "name" && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {!loading && !rightPlantsSort && rightPlantsSortValue === "name" && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                rightPlantsList.length !== 0 &&
                rightPlantsList?.map((plant) => (
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
                      unSelectedList.some((element) => element.customerPlantPK === plant.customerPlantPK)
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
        {!loading && rightPlantsList.length === 0 && (
          <h2 className="noRecordsSmallerFont" align="center">
            No Records Available
          </h2>
        )}
      </div>
    </div>
  );
};

export default AssignedPlantsListing;
