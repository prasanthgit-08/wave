import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StateGroupsService from "../../../../services/StateGroupsService";
import {
  setAssignSortFlag,
  setAssignSortValue,
  setAssignedStatesLoading,
  setStateList,
  setStateTotalElements,
  setStateTotalTotalPages,
} from "../../../../redux/StateGroupsSlice";

const StatesListing = () => {
  const dispatch = useDispatch();
  const assignedPageNo = useSelector((state) => state.stateGroupReducer.assignedPageNo);
  const stateList = useSelector((state) => state.stateGroupReducer.stateList);
  const assignSortFlag = useSelector((state) => state.stateGroupReducer.assignSortFlag);
  const assignSortValue = useSelector((state) => state.stateGroupReducer.assignSortValue);

  const loading = useSelector((state) => state.stateGroupReducer.assignedStatesLoading);

  const { id } = useParams();

  const listAssignedStates = () => {
    dispatch(setAssignedStatesLoading(true));
    StateGroupsService.getAssignedStates(id, assignedPageNo, assignSortFlag, assignSortValue)
      .then((response) => {
        dispatch(setStateList(response?.data?.content));
        dispatch(setStateTotalElements(response?.data?.totalElements));
        dispatch(setStateTotalTotalPages(response?.data?.totalPages));
      })
      .catch(() => {})
      .finally(() => {
        dispatch(setAssignedStatesLoading(false));
      });
  };
  useEffect(() => {
    dispatch(setAssignedStatesLoading(true));
    const debounceFunction = setTimeout(() => {
      listAssignedStates();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [id, assignedPageNo, assignSortValue, assignSortFlag]);

  return (
    <div className="fixTableHead">
      {
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                onClick={() => {
                  dispatch(setAssignSortFlag());
                  dispatch(setAssignSortValue("stateName"));
                }}
                className="f-w-600"
              >
                State
                {assignSortFlag && assignSortValue === "stateName" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!assignSortFlag && assignSortValue === "stateName" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              stateList?.length !== 0 &&
              stateList?.map((item) => (
                <tr>
                  <td className="f-w-600">{item.stateName}</td>
                </tr>
              ))}
          </tbody>
        </table>
      }
      {!loading && stateList?.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};
export default StatesListing;
