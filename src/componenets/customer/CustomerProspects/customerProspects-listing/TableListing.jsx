import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setChangeColor,
  setEditFormData,
  setListingData,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedId,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../redux/CustomerProspectsSlice";
import CustomerProspectsSevice from "../../../../services/CustomerProspectsSevice";
import LoadingIcon from "../../../common/LoadingIcon";

/**
 * @param {boolean} loader - true while a list API call is pending (shared with the pagination component)
 * @param {Function} setLoader - setter for `loader`, owned by CustomerProspectsMainPage
 */
const TableListing = ({ loader, setLoader }) => {
  // Rows stay hidden only until the first response; later reloads keep them under the loader.
  const [initialLoading, setInitialLoading] = useState(true);
  const latestRequestId = useRef(0);
  const dispatch = useDispatch();

  const pageNumber = useSelector((state) => state.customerProspectsReducer.pageNumber);

  const selectedStatus = useSelector((state) => state.customerProspectsReducer.selectedStatus);
  const listingData = useSelector((state) => state.customerProspectsReducer.listingData);

  const searchCriteria = useSelector((state) => state.customerProspectsReducer.searchCriteria);

  const searchTerms = useSelector((state) => state.customerProspectsReducer.searchTerms);

  const changeColor = useSelector((state) => state.customerProspectsReducer.changeColor);

  const navigate = useNavigate();

  const selectedId = useSelector((state) => state.customerProspectsReducer.selectedId);

  const sortFlag = useSelector((state) => state.customerProspectsReducer.normalSortFlag);

  const sortValue = useSelector((state) => state.customerProspectsReducer.normalSortValue);

  const fetchTableData = () => {
    const requestId = ++latestRequestId.current;
    CustomerProspectsSevice.getCustomerProspectiveData(
      searchTerms,
      searchCriteria,
      pageNumber,
      selectedStatus,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response?.data;
        dispatch(setListingData(data?.content));
        dispatch(setTotalElements(data?.totalElements));
        dispatch(setTotalPages(data?.totalPages));
      })
      .catch(() => {})
      .finally(() => {
        // An older request finishing late must not hide the loader of a newer one.
        if (requestId !== latestRequestId.current) return;
        setInitialLoading(false);
        setLoader(false);
      });
  };

  // Only update the sort state; the debounced effect below refetches when it changes.
  // Fetching here as well caused a duplicate API call on every sort click.
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  useEffect(() => {
    // Show the loader for the whole wait (debounce + request) of search, sort and paging.
    setLoader(true);
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
    // sortFlag was missing here (sortValue was listed twice), so re-sorting the same column
    // only worked through the duplicate direct fetch above.
  }, [searchTerms, searchCriteria, pageNumber, selectedStatus, sortValue, sortFlag]);

  return (
    <div className="fixTableHead">
      {loader && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("name", !sortFlag);
              }}
            >
              Name
              {sortFlag && sortValue === "name" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "name" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("accountManagerName", !sortFlag);
              }}
            >
              Account Manager{" "}
              {sortFlag && sortValue === "accountManagerName" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "accountManagerName" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {initialLoading
            ? ""
            : listingData?.map((data) => (
                <tr
                  id="rowId"
                  key={data?.customerProspectPK}
                  onClick={() => dispatch(setChangeColor(false))}
                  onDoubleClick={() => {
                    dispatch(setEditFormData(null));
                    dispatch(setSelectedId(data?.customerProspectPK));
                    dispatch(setChangeColor(true));
                    dispatch(setViewDetail(true));

                    setTimeout(() => {
                      navigate("/customer-prospects/" + data?.customerProspectPK + "/" + pageNumber);
                    }, 100);
                  }}
                  className={data?.customerProspectPK === selectedId && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600"> {data.name} </td>
                  <td className="f-w-600"> {data.accountManagerName} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {initialLoading || loader
        ? ""
        : listingData?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
    </div>
  );
};

export default TableListing;
