import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  setAssignedPageNo,
  setAssignSortValue,
  setChangeColor,
  setEditFormData,
  setId,
  setNormalSortFlag,
  setNormalSortValue,
  setStateGroupsData,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../redux/StateGroupsSlice";
import StateGroupsService from "../../../../services/StateGroupsService";
import LoadingText from "../../../common/LoadingText";

const StateGroupsList = ({ loader, setLoader }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.stateGroupReducer.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.stateGroupReducer.selectedSearchCriteria);
  const pageNumber = useSelector((state) => state.stateGroupReducer.pageNumber);
  const stateGroupsData = useSelector((state) => state.stateGroupReducer.stateGroupsData);
  const id = useSelector((state) => state.stateGroupReducer.id);
  const changeColor = useSelector((state) => state.stateGroupReducer.changeColor);
  let sortValue = useSelector((state) => state.stateGroupReducer.normalSortValue);
  let sortFlag = useSelector((state) => state.stateGroupReducer.normalSortFlag);
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));
  };

  const fetchTableData = () => {
    setLoader(true);
    StateGroupsService.getStateGroupForMaintenance(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        setLoader(false);
        dispatch(setStateGroupsData(data?.content));
        dispatch(setTotalElements(data?.totalElements));
        dispatch(setTotalPages(data?.totalPages));
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag]);
  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
            >
              Description
              {sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {loader
            ? ""
            : stateGroupsData?.map((item) => (
                <tr
                  id="rowId"
                  key={item.stateGroupPK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setId(item.stateGroupPK));
                    dispatch(setChangeColor(true));
                    dispatch(setViewDetail(true));
                    dispatch(setAssignSortValue(null));
                    dispatch(setAssignedPageNo(0));
                    dispatch(setEditFormData(null));
                    setTimeout(() => {
                      navigate("/state-groups-edit/" + item.stateGroupPK + "/" + pageNumber);
                    }, 100);
                  }}
                  className={item.stateGroupPK === id && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{item.description} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader
        ? ""
        : stateGroupsData?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
      {loader && <LoadingText />}
    </div>
  );
};

export default StateGroupsList;
