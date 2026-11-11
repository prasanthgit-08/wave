import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setChangeColor,
  setId,
  setListingData,
  setSort,
  setSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/DealerGroupsSearchFilterSlice";
import DealerGroupService from "../../../../services/DealerGroupService";
import {
  setAssignedDealerList,
  setDealerListView,
  setinitialList,
  setSaveList,
  setTotalDealerList,
} from "../../../../redux/EditDealerGroupslice";
import LoadingText from "../../../common/LoadingText";

const DealerGroupsListing = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeColor = useSelector((state) => state.dealerGroupReducer.changeColor);
  const id = useSelector((state) => state.dealerGroupReducer.id);
  const dataList = useSelector((state) => state.dealerGroupReducer.listingData);
  const pageNumber = useSelector((state) => state.dealerGroupReducer.pageNumber);
  const searchCriteria = useSelector((state) => state.dealerGroupReducer.searchCriteria);
  const searchTerm = useSelector((state) => state.dealerGroupReducer.searchTerm);
  const sort = useSelector((state) => state.dealerGroupReducer.sort);
  const sortValue = useSelector((state) => state.dealerGroupReducer.sortValue);

  const handleDoubleClick = (pk) => {
    setTimeout(() => {
      navigate("/add-dealer-group/" + pk + "/" + pageNumber);
    }, 100);
  };

  const fetchDealerGroup = () => {
    setLoading(true);

    DealerGroupService.getDealerGroup(pageNumber, searchCriteria, searchTerm, sort, sortValue)
      .then((response) => {
        dispatch(setListingData(response.data.content));
        dispatch(setTotalElements(response.data.totalElements));
        dispatch(setTotalPages(response.data.totalPages));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchDealerGroup();
    }, 300);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [pageNumber, searchCriteria, searchTerm, sort, sortValue]);

  return (
    <div>
      <div className="fixTableHead">
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                className="f-w-600"
                onClick={() => {
                  dispatch(setSort());
                  dispatch(setSortValue("description"));
                }}
              >
                Description
                {sort && sortValue === "description" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sort && sortValue === "description" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              dataList.map((dealergroup) => (
                <tr
                  key={dealergroup.dealerGroupPK}
                  className={id === dealergroup.dealerGroupPK && changeColor ? "tableSelected" : ""}
                  onClick={() => {
                    dispatch(setId(dealergroup.dealerGroupPK));
                    dispatch(setChangeColor(false));
                  }}
                  onDoubleClick={() => {
                    dispatch(setChangeColor(true));
                    handleDoubleClick(dealergroup.dealerGroupPK);
                    dispatch(setDealerListView([]));
                    dispatch(setinitialList([]));
                    dispatch(setSaveList());
                    dispatch(setTotalDealerList([]));
                    dispatch(setAssignedDealerList([]));
                  }}
                >
                  <td>{dealergroup.description}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {!loading && dataList.length === 0 && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )}
        {loading && <LoadingText />}
      </div>
    </div>
  );
};

export default DealerGroupsListing;
