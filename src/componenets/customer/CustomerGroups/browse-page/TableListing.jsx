import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import {
  toggleSortFlag,
  setSortValue,
  setSelectedId,
  setViewDetail,
  setFormData,
  setListingData,
  setTotalElements,
  setTotalPages,
  setAssignSortValue,
  setCustomerList,
  setCustomerPageNumber,
} from "../../../../redux/CustomerGroupsSlice";
import CustomerGroupService from "../../../../services/CustomerGroupService";
import LoadingText from "../../../common/LoadingText";

const TableListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const listingData = useSelector((state) => state.customerGroups.listingData);
  const searchTerm = useSelector((state) => state.customerGroups.searchTerm);
  const searchCriteria = useSelector((state) => state.customerGroups.searchCriteria);
  const pageNumber = useSelector((state) => state.customerGroups.pageNumber);
  const selectedId = useSelector((state) => state.customerGroups.selectedId);
  const sortFlag = useSelector((state) => state.customerGroups.sortFlag);
  const sortValue = useSelector((state) => state.customerGroups.sortValue);

  const onhandleNormalSort = (sortValue) => {
    dispatch(setSortValue(sortValue));
    dispatch(toggleSortFlag());
  };
  /* for listing all Customer Group for browse page */
  const fetchTableData = () => {
    CustomerGroupService.getAllCustomerGroups(searchTerm, searchCriteria, pageNumber, sortValue, sortFlag)
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setListingData(data?.content));
        dispatch(setTotalElements(data?.totalElements));
        dispatch(setTotalPages(data?.totalPages));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, searchCriteria, pageNumber, sortValue, sortFlag]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th className="f-w-600" onClick={() => onhandleNormalSort("description")}>
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
          {loading
            ? null
            : listingData?.length >= 1 &&
              listingData?.map((data) => (
                <tr
                  id="rowId"
                  key={data?.customerGroupPK}
                  className={data?.customerGroupPK === selectedId ? "tableSelected" : ""}
                  onClick={() => dispatch(setSelectedId(null))}
                  onDoubleClick={() => {
                    dispatch(setSelectedId(data?.customerGroupPK));
                    dispatch(setViewDetail(true));
                    dispatch(setFormData(null));
                    dispatch(setAssignSortValue(null));
                    dispatch(setCustomerList([]));
                    dispatch(setCustomerPageNumber(0));
                    setTimeout(() => {
                      navigate("/customer-groups/" + data?.customerGroupPK + "/" + pageNumber);
                    }, 100);
                  }}
                >
                  <td className="f-w-600"> {data?.description} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {loading ? "" : listingData?.length === 0 && <NoRecordsMessage />}
      {loading && <LoadingText />}
    </div>
  );
};

export default TableListing;
