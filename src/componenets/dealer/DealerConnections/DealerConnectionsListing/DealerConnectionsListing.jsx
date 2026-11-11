import React, { useState } from "react";
import DealerConnectionsService from "../../../../services/DealerConnectionsService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setListingData,
  setDealerConnectionsPK,
  setSearchTerm,
  setSortValue,
  setSort,
  setChangeColor,
  setDealerLoading,
} from "../../../../redux/DealerConnectionsSearchFilterSlice";
import { setTotalElements, setTotalPages } from "../../../../redux/PaginationSlice";
import { Await, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoadingText from "../../../common/LoadingText";
import LoadingIcon from "../../../common/LoadingIcon";

function DealerConnectionsListing() {
  const globalSearchTerm = useSelector((state) => state.dealerConnectionReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.dealerConnectionReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.dealerConnectionReducer.pageNumber);
  const listingData = useSelector((state) => state.dealerConnectionReducer.listingData);
  const dealerConnectionPK = useSelector((state) => state.dealerConnectionReducer.dealerConnectionsPK);
  const changeColor = useSelector((state) => state.dealerConnectionReducer.changeColor);
  const advanceSearchFK1 = useSelector((state) => state.dealerConnectionReducer.advanceSearchFK1);
  const advanceSearchFK2 = useSelector((state) => state.dealerConnectionReducer.advanceSearchFK2);
  const advanceSearch = useSelector((state) => state.dealerConnectionReducer.advanceSearch);
  const sort = useSelector((state) => state.dealerConnectionReducer.sort);
  const sortValue = useSelector((state) => state.dealerConnectionReducer.sortValue);
  const dealerLoading = useSelector((state) => state.dealerConnectionReducer.dealerLoading);

  const [load, setload] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [condition, setCondition] = useState(true);

  const fetchDealerConnections = () => {
    dispatch(setDealerLoading(true));
    DealerConnectionsService.getDealersConnections(
      pageNumber,
      globalSearchTerm,
      searchCriteria,
      advanceSearch,
      advanceSearchFK1,
      advanceSearchFK2,
      sort,
      sortValue
    )
      .then((response) => {
        dispatch(setListingData(response.data.content));
        dispatch(setTotalElements(response.data.totalElements));
        dispatch(setTotalPages(response.data.totalPages));
        dispatch(setDealerLoading(true));
      })
      .catch((response) => {
        toast.error("Something went wrong!!");
        dispatch(setDealerLoading(true));
      })
      .finally(() => dispatch(setDealerLoading(false)));
  };

  const handleDoubleClick = (value) => {
    dispatch(setChangeColor(true));
    setTimeout(() => {
      navigate("/add-dealer-connections/" + value + "/" + pageNumber);
    }, [100]);

    dispatch(setDealerConnectionsPK(value));
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchDealerConnections();
    }, 300);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [globalSearchTerm, pageNumber, searchCriteria, advanceSearchFK1, advanceSearchFK2, sort, sortValue]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              onClick={() => {
                dispatch(setSortValue("dealer1FK"));
                dispatch(setSort());
              }}
              className="f-w-600"
            >
              Dealer #1
              {sort && sortValue === "dealer1FK" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sort && sortValue === "dealer1FK" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              onClick={() => {
                dispatch(setSort());
                dispatch(setSortValue("dealer2FK"));
              }}
              className="f-w-600"
            >
              Dealer #2
              {sort && sortValue === "dealer2FK" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sort && sortValue === "dealer2FK" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>
        <tbody>
          {!dealerLoading &&
            listingData.map((dealerConnection) => (
              <tr
                id="rowID"
                key={dealerConnection.dealerConnectionPK}
                className={
                  dealerConnectionPK === dealerConnection.dealerConnectionPK && changeColor
                    ? "tableSelected"
                    : ""
                }
                onClick={() => {
                  dispatch(setChangeColor(false));
                  dispatch(setDealerConnectionsPK(dealerConnection.dealerConnectionPK));
                }}
                onDoubleClick={() => {
                  handleDoubleClick(dealerConnection.dealerConnectionPK);
                }}
              >
                <td className="f-w-600">{dealerConnection.dealerName1?.trim()}</td>
                <td className="f-w-600">{dealerConnection.dealerName2?.trim()}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {dealerLoading && <LoadingText />}
      {!dealerLoading && listingData.length === 0 && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
}

export default DealerConnectionsListing;
