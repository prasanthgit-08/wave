import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDeleteList,
  removeExcpetList,
  removeFromSelectedList,
  setChangesInDealerSelection,
  setReverseList,
  setSelectedList,
  setSort,
  setSortValue,
  updateAssignedDealerList,
  updateSaveList,
  updateSelectedList,
} from "../../../../redux/EditDealerGroupslice";
import { useState } from "react";
import LoadingText from "../../../common/LoadingText";
import LoadingIcon from "../../../common/LoadingIcon";

const TotalDealerListing = () => {
  const dispatch = useDispatch();

  const totalDealerList = useSelector((state) => state.editDealerGroupReducer.totalDealerList);
  const selectedList = useSelector((state) => state.editDealerGroupReducer.selectedList);

  const showAdvancedSort = useSelector((state) => state.editDealerGroupReducer.showAdvanceSort);
  const sort = useSelector((state) => state.editDealerGroupReducer.sort);
  const sortValue = useSelector((state) => state.editDealerGroupReducer.sortValue);
  const searchTerm = useSelector((state) => state.editDealerGroupReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.editDealerGroupReducer.searchCriteria);
  const name = useSelector((state) => state.editDealerGroupReducer.name);
  const dba = useSelector((state) => state.editDealerGroupReducer.dba);
  const state = useSelector((state) => state.editDealerGroupReducer.state);
  const city = useSelector((state) => state.editDealerGroupReducer.city);

  const initialList = useSelector((state) => state.editDealerGroupReducer.initialList);
  const exceptList = useSelector((state) => state.editDealerGroupReducer.exceptList);
  const leftLoading = useSelector((state) => state.editDealerGroupReducer.leftLoading);

  const [lastClick, setLastClick] = useState();

  const handleClick = (event, dealer) => {
    dispatch(setChangesInDealerSelection(true));
    if (event.ctrlKey) {
      if (event.shiftKey) {
        const index1 = totalDealerList.indexOf(dealer);
        const index2 = totalDealerList.indexOf(lastClick);

        if (index1 < index2) {
          dispatch(updateSelectedList(totalDealerList.slice(index1, index2 + 1)));
        } else {
          dispatch(updateSelectedList(totalDealerList.slice(index2, index1 + 1)));
        }
      } else if (selectedList.includes(dealer)) {
        dispatch(removeFromSelectedList(dealer));
      } else {
        dispatch(updateSelectedList(dealer));
      }
      setLastClick(dealer);
    } else if (event.shiftKey) {
      dispatch(setSelectedList());
      const index1 = totalDealerList.indexOf(dealer);
      const index2 = totalDealerList.indexOf(lastClick);

      if (index1 < index2) {
        dispatch(setSelectedList(totalDealerList.slice(index1, index2 + 1)));
      } else {
        dispatch(setSelectedList(totalDealerList.slice(index2, index1 + 1)));
      }
    } else {
      const isPresent = selectedList.find((obj) => obj.DealerPK === dealer.DealerPK);
      if (isPresent) {
        dispatch(removeFromSelectedList(dealer));
      } else {
        dispatch(setSelectedList(dealer));
      }
      setLastClick(dealer);
    }
  };

  const handleDoubleClick = (dealer) => {
    dispatch(setChangesInDealerSelection(true));
    const dealerpk = dealer.DealerPK;

    if (initialList.includes(dealerpk)) {
      dispatch(removeDeleteList(dealerpk));
    } else if (exceptList.includes(dealerpk)) {
      dispatch(removeExcpetList(dealerpk));
    } else {
      dispatch(updateSaveList(dealerpk));
      dispatch(updateAssignedDealerList(dealer));
    }
  };

  useEffect(() => {
    dispatch(setReverseList(false));
  }, [searchCriteria, searchTerm, name, dba, state, city]);

  useEffect(() => {
    setSortValue();
  }, []);
  return (
    <div className="fixTableHead no-select" style={{ padding: 0, flex: 1 }}>
      {!leftLoading && (
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                className="f-w-600 "
                onClick={() => {
                  if (!showAdvancedSort) {
                    dispatch(setSort(!sort));
                    dispatch(setSortValue("name"));
                  }
                }}
              >
                Dealer Name
                {showAdvancedSort !== true && sort && sortValue === "name" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {showAdvancedSort !== true && !sort && sortValue === "name" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600 "
                onClick={() => {
                  if (!showAdvancedSort) {
                    dispatch(setSortValue("dba"));
                    dispatch(setSort(!sort));
                  }
                }}
              >
                DBA
                {showAdvancedSort !== true && sort && sortValue === "dba" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {showAdvancedSort !== true && !sort && sortValue === "dba" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600 "
                onClick={() => {
                  if (!showAdvancedSort) {
                    dispatch(setSortValue("city"));
                    dispatch(setSort(!sort));
                  }
                }}
              >
                City
                {showAdvancedSort !== true && sort && sortValue === "city" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {showAdvancedSort !== true && !sort && sortValue === "city" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600 "
                onClick={() => {
                  if (!showAdvancedSort) {
                    dispatch(setSortValue("stateCode"));
                    dispatch(setSort(!sort));
                  }
                }}
              >
                State
                {showAdvancedSort !== true && sort && sortValue === "stateCode" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {showAdvancedSort !== true && !sort && sortValue === "stateCode" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {totalDealerList.length !== 0 &&
              totalDealerList.map((dealer) => (
                <tr
                  id="rowId"
                  key={dealer.DealerPK != null ? dealer.DealerPK : dealer.DealerPK}
                  onClick={(event) => {
                    handleClick(event, dealer);
                  }}
                  onDoubleClick={() => {
                    handleDoubleClick(dealer);
                    dispatch(removeFromSelectedList(dealer));
                  }}
                  className={
                    selectedList.some((element) => element.DealerPK === dealer.DealerPK)
                      ? "tableSelected"
                      : ""
                  }
                >
                  <td className="f-w-600"> {dealer.Name} </td>
                  <td className="f-w-600"> {dealer.DBA} </td>
                  <td className="f-w-600"> {dealer.City} </td>
                  <td className="f-w-600"> {dealer.StateCode} </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      {leftLoading && <LoadingText />}
      {!leftLoading && totalDealerList.length === 0 && (
        <h2 className="noRecordsSmallerFont" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};

export default TotalDealerListing;
