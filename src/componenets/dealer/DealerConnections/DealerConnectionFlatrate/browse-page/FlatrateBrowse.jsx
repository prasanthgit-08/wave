import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import {
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setTotalPages,
  setTotalElements,
  setListingData,
  resetChanges,
} from "../../../../../redux/DealerFlatRateConnectionSlice";
import DealerConnectionFlatRateService from "../../../../../services/DealerConnectionFlatRateService";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import { useParams } from "react-router-dom";
import useDebouncer from "../../../../../hooks/useDebouncer";

const FlatrateBrowse = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const pageNumber = useSelector((state) => state.dealerFlatRateConnectionSReducer.pageNumber);
  const totalPages = useSelector((state) => state.dealerFlatRateConnectionSReducer.totalPages);
  const totalElements = useSelector((state) => state.dealerFlatRateConnectionSReducer.totalElements);
  const searchTerm = useSelector((state) => state.dealerFlatRateConnectionSReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.dealerFlatRateConnectionSReducer.searchCriteria);
  const resultType = useSelector((state) => state.dealerFlatRateConnectionSReducer.resultType);
  const normalSortValue = useSelector((state) => state.dealerFlatRateConnectionSReducer.normalSortValue);
  const normalSortFlag = useSelector((state) => state.dealerFlatRateConnectionSReducer.normalSortFlag);
  const listingData = useSelector((state) => state.dealerFlatRateConnectionSReducer.listingData);
  const dealerConnectionFK = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.dealerConnectionFK
  );
  const debounceFetch = useDebouncer(() => fetchData(), 400);

  const { id } = useParams();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await DealerConnectionFlatRateService.getDealerConnectionFlatRate({
        pageNumber,
        pageSize: QuarterScreen_RecordsPerPage,
        sortValue: normalSortValue,
        sortType: normalSortFlag,
        searchCriteria: searchCriteria || "Beginning",
        searchTerms: searchTerm || "",
        resultType,
        dealerConnectionFK: Number(id),
      });

      const { data } = response;
      const browseList = data?.slice(0, data?.length - 1);
      const pagination = data?.[data?.length - 1];
      dispatch(setListingData(browseList?.length > 0 ? browseList : []));
      dispatch(setTotalPages(pagination?.TotalPages || 0));
      dispatch(setTotalElements(pagination?.TotalElements || 0));
    } catch (err) {
      console.error("Error fetching flat rate data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    debounceFetch();
  }, [pageNumber, searchTerm, searchCriteria, normalSortFlag]);

  useEffect(() => {
    dispatch(resetChanges());
  }, []);

  const handleCloseOnClick = () => {
    dispatch(resetChanges());
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          newButtonRoute={`/dealer-connection-flatrate-customer-selection/${id}`}
          isNormalSearchFilter
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
          handleCloseOnClick={handleCloseOnClick}
          closeButtonRoute={`/add-dealer-connections/${id}/0`}
        />
      }
      TableListingComponent={<TableListing loading={loading} />}
      PaginationComponent={
        <PaginationComponent
          pageNumber={pageNumber}
          loading={loading}
          setPageNumber={setPageNumber}
          totalPages={totalPages}
          totalElements={totalElements}
          listingData={listingData}
          recordsPerPage={QuarterScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
};

export default FlatrateBrowse;
