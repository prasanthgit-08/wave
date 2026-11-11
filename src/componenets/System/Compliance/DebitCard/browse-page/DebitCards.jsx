import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  setChangeColor,
  setEditFormData,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setViewDetail,
} from "../../../../../redux/DebitCardSlice";
import { useState } from "react";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import TableListing from "../browse-page/TableListing";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";

const DebitCards = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const pageNumber = useSelector((state) => state.debitCardReducer.pageNumber);
  const totalPages = useSelector((state) => state.debitCardReducer.totalPages);
  const totalElements = useSelector((state) => state.debitCardReducer.totalElements);
  const searchTerm = useSelector((state) => state.debitCardReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.debitCardReducer.searchCriteria);
  const debitCardData = useSelector((state) => state.debitCardReducer.debitCardData);

  const handleClickNew = () => {
    dispatch(setEditFormData(undefined));
    dispatch(resetChanges());
    dispatch(setViewDetail(undefined));
  };

  const onClose = () => {
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setChangeColor(false));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
  };

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: debitCardData,
    loading,
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/debit-card/add"}
          handleNewOnClick={handleClickNew}
          closeButtonRoute={`/`}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<TableListing loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
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
export default DebitCards;
