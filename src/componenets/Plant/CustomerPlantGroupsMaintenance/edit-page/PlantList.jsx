import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerPlantGroupsService from "../../../../services/CustomerPlantGroupsService";
import { useParams } from "react-router-dom";
import {
  setAssignedPageNo,
  setPlantList,
  setPlantSort,
  setPlantSortValue,
  setPlantTotalElements,
  setPlantTotalPages,
  setinitialList,
} from "../../../../redux/CustomerPlantGroupSlice";
import LoadingIcon from "../../../common/LoadingIcon";
const PlantList = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const assignedPageNo = useSelector((state) => state.customerPlantGroup.assignedPageNo);
  const plantList = useSelector((state) => state.customerPlantGroup.plantList);
  const plantsort = useSelector((state) => state.customerPlantGroup.plantsort);
  const plantsortValue = useSelector((state) => state.customerPlantGroup.plantsortValue);
  const initialList = useSelector((state) => state.customerPlantGroup.initialList);
  const selectedCustomer = useSelector((state) => state.customerPlantGroup.selectedCustomer);
  const [contentLoading, setContentLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  const getInitialPlants = () => {
    CustomerPlantGroupsService.getInitialPlants(id).then(({ data }) => {
      dispatch(setinitialList(data));
      setLoading(false);
      listAssisgnedPlants(data);
    });
  };

  const listAssisgnedPlants = (data) => {
    setLoading(true);
    setContentLoading(true);
    CustomerPlantGroupsService.getRightPlants(
      false,
      assignedPageNo,
      data || initialList,
      [],
      [],
      [],
      plantsort,
      plantsortValue,
      selectedCustomer
    )
      .then(({ data }) => {
        dispatch(setPlantList(data.content));
        dispatch(setPlantTotalElements(data.totalElements));
        dispatch(setPlantTotalPages(data.totalPages));
        if (!data.first && data.last && data.numberOfElements === 0) {
          dispatch(setAssignedPageNo(assignedPageNo - 1));
        } else {
          setTimeout(() => {
            setLoading(false);
            setContentLoading(false);
          }, 100);
        }
      })
      .catch(() => {
        setLoading(false);
        setContentLoading(false);
      });
  };

  useEffect(() => {
    if (initialList?.length > 0) {
      listAssisgnedPlants();
    }
  }, [assignedPageNo, plantsort, plantsortValue, selectedCustomer]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getInitialPlants();
    }
  }, []);

  return (
    <div className="fixTableHead">
      {(loading || contentLoading) && <LoadingIcon />}

      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            {
              <th
                onClick={() => {
                  dispatch(setPlantSort());
                  dispatch(setPlantSortValue("name"));
                }}
                className="f-w-600"
              >
                Plant
                {plantsort && plantsortValue === "name" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!plantsort && plantsortValue === "name" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            }
          </tr>
        </thead>
        {!loading && plantList?.length !== 0 && (
          <tbody>
            {plantList?.map((plant) => (
              <tr id="rowId" key={plant.customerPlantPK}>
                <td className="f-w-600">{plant.name}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {!(loading || contentLoading) && plantList.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};

export default PlantList;
