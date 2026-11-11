import React from "react";
import { useEffect } from "react";
import DealerGroupService from "../../../../services/DealerGroupService";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setDealerListView,
  setDealerTotalElements,
  setDealerTotalPages,
  setEditDealerSort,
  setEditDealerSortValue,
} from "../../../../redux/EditDealerGroupslice";
import { useState } from "react";
import LoadingIcon from "../../../common/LoadingIcon";
import LoadingText from "../../../common/LoadingText";
import useDebouncer from "../../../../hooks/useDebouncer";

const DealerListing = () => {
  const params = useParams();
  const id = params.dealerGroupPK;
  const dispatch = useDispatch();
  const editDealerSort = useSelector((state) => state.editDealerGroupReducer.editDealerSort);
  const editDealerSortValue = useSelector((state) => state.editDealerGroupReducer.editDealerSortValue);
  const loading = useSelector((state) => state.editDealerGroupReducer.editPageLoading);
  const totalPageNumber = useSelector((state) => state.editDealerGroupReducer.totalPageNumber);
  const assignedPageNumber = useSelector((state) => state.editDealerGroupReducer.assignedPageNumber);
  const reverseList = useSelector((state) => state.editDealerGroupReducer.reverseList);

  const initialList = useSelector((state) => state.editDealerGroupReducer.initialList);
  const saveList = useSelector((state) => state.editDealerGroupReducer.saveList);
  const deleteList = useSelector((state) => state.editDealerGroupReducer.deleteList);
  const searchList = useSelector((state) => state.editDealerGroupReducer.searchList);
  const exceptList = useSelector((state) => state.editDealerGroupReducer.exceptList);

  const searchTerm = useSelector((state) => state.editDealerGroupReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.editDealerGroupReducer.searchCriteria);

  const name = useSelector((state) => state.editDealerGroupReducer.name);
  const dba = useSelector((state) => state.editDealerGroupReducer.dba);
  const state = useSelector((state) => state.editDealerGroupReducer.state);
  const city = useSelector((state) => state.editDealerGroupReducer.city);
  const isActive = useSelector((state) => state.editDealerGroupReducer.isActive);
  const dealerPageNumber = useSelector((state) => state.editDealerGroupReducer.dealerPageNumber);
  const dealerListView = useSelector((state) => state.editDealerGroupReducer.dealerListView);
  const advanceSortingOrder = useSelector((state) => state.editDealerGroupReducer.advanceSortingOrder);

  const [dealersLoading, setDealersLoading] = useState(true);

  const debounceFunction = useDebouncer(() => fetchDealers(), 200);

  const fetchDealers = () => {
    setDealersLoading(true);
    DealerGroupService.getLeftDealers(
      dealerPageNumber,
      11,
      totalPageNumber,
      11,
      searchCriteria,
      searchTerm,
      id,
      deleteList,
      saveList,
      searchList,
      exceptList,
      false,
      editDealerSort,
      "",
      editDealerSortValue,
      city,
      dba,
      state,
      name,
      advanceSortingOrder,
      isActive
    )
      .then((response) => {
        dispatch(setDealerListView(response.data.RightDealerList));
        dispatch(setDealerTotalElements(response.data?.RightPagination?.[0]?.TotalElements));
        dispatch(setDealerTotalPages(response.data?.RightPagination?.[0]?.TotalPages));
      })
      .catch((error) => {
        console.error("Error fetching left dealers:", error);
      })
      .finally(() => {
        setDealersLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      setDealersLoading(true);
      dispatch(setDealerListView([]));
      debounceFunction();
    }
  }, [
    initialList,
    saveList,
    deleteList,
    assignedPageNumber,
    searchList,
    exceptList,
    editDealerSort,
    editDealerSortValue,
    reverseList,
    dealerPageNumber,
  ]);

  return (
    <div className="fixTableHead">
      {(loading || dealersLoading) && <LoadingIcon />}
      {!loading && !dealersLoading && (
        <table className="table table-striped f-w-600">
          <thead>
            <tr>
              <th
                onClick={() => {
                  if (dealerListView.length === 0) return;
                  dispatch(setEditDealerSort(!editDealerSort));
                  dispatch(setEditDealerSortValue("name"));
                }}
                className="f-w-600"
              >
                Dealers
                {editDealerSort && editDealerSortValue === "name" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!editDealerSort && editDealerSortValue === "name" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {dealerListView.map((dealers) => (
              <tr>
                <td className="f-w-600">{dealers.Name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {(loading || dealersLoading) && <LoadingText />}
      {!(loading || dealersLoading) && dealerListView.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};

export default DealerListing;
