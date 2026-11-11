import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedId,
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  setLoading,
  setListingData,
  setTotalElements,
  setTotalPages,
  setPageNumberClaimNumberLookup,
} from "../../../redux/LookupScreens/ClaimNumberLookupSlice";
import LoadingIcon from "../../common/LoadingIcon";
import useDebouncer from "../../../hooks/useDebouncer";

const TableListing = ({ onHide, renderItemId, handleLookupSelection, customFetchFunction }) => {
  const dispatch = useDispatch();
  const listingData = useSelector((state) => state.claimNumberLookupReducer.listingData);
  const changeColor = useSelector((state) => state.claimNumberLookupReducer.changeColor);
  const loading = useSelector((state) => state.claimNumberLookupReducer.loading);
  const pageNumber = useSelector((state) => state.claimNumberLookupReducer.pageNumberClaimNumberLookup);
  const sortFlag = useSelector((state) => state.claimNumberLookupReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.claimNumberLookupReducer.normalSortValue);
  const selectedSearchCriteria = useSelector(
    (state) => state.claimNumberLookupReducer.selectedSearchCriteria
  );
  const searchTerms = useSelector((state) => state.claimNumberLookupReducer.searchTerms);
  const selectedId = useSelector((state) => state.claimNumberLookupReducer.selectedId);

  const fetchFunction = () => {
    if (!customFetchFunction) {
      dispatch(setLoading(false));
      return;
    }
    dispatch(setLoading(true));
    customFetchFunction({
      pageNumber,
      pageSize: 12,
      sortValue,
      sortType: sortFlag ? 1 : 0,
      searchCriteria: selectedSearchCriteria,
      searchTerm: searchTerms,
      type: "LookUp",
    })
      .then((res) => {
        const data = res.data;
        const list = data?.slice(0, data?.length - 1);
        const Pagination = data?.slice(data?.length - 1);
        dispatch(setListingData(list));
        dispatch(setTotalElements(Pagination[0]?.TotalElements));
        dispatch(setTotalPages(Pagination[0]?.TotalPages));
        dispatch(setPageNumberClaimNumberLookup(Pagination[0]?.PageNumber));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const debounceFetch = useDebouncer(fetchFunction, 500);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    // Handle Optional Custom Fetch Function
    if (customFetchFunction) {
      debounceFetch();
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));

    if (customFetchFunction) {
      debounceFetch();
    }
  }, [selectedSearchCriteria, pageNumber, searchTerms, sortValue, sortFlag]);
  const renderStateListing = listingData?.map((item) => (
    <tr
      id="rowId"
      key={renderItemId(item)}
      onClick={(event) => {
        handleLookupSelection(item, event);
        dispatch(setSelectedId(renderItemId(item)));
        dispatch(setChangeColor(true));
        onHide();
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(item) === selectedId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {item.ClaimNumber} </td>
    </tr>
  ));

  return (
    <div className="fixTableHead">
      {loading && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("ClaimNumber", !sortFlag);
              }}
            >
              Claim Number
              {sortFlag && sortValue === "ClaimNumber" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "ClaimNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {!loading && listingData.length !== 0 && <tbody>{renderStateListing}</tbody>}
      </table>
      {!loading && listingData.length === 0 && (
        <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
