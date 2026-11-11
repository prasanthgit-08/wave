import QuarterScreenTemplate from "../../Templates/QuarterScreenTemplate";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerms,
  setSearchCriteria,
  setPageNumber,
  resetSearchSettings,
} from "../../../redux/RegionsSearchFilterSlice";
import { QuarterScreen_RecordsPerPage } from "../../../services/constants/applicationConstants";
import { PaginationComponent } from "../../common/PaginationComponent";
import { UpdatedRegionsListing } from "./UpdatedRegionsListing";
import SearchFilterComponent from "../../common/SearchFilterComponent";
import { useState } from "react";
const UpdatedRegionsMainPage = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const regionsDataList = useSelector((state) => state.regionsSearchReducer.regionsDataList);
  const pageNumber = useSelector((state) => state.regionsSearchReducer.pageNumber);
  const totalPages = useSelector((state) => state.regionsSearchReducer.totalPages);
  const totalElements = useSelector((state) => state.regionsSearchReducer.totalElements);
  const searchTerm = useSelector((state) => state.regionsSearchReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.regionsSearchReducer.searchCriteria);
  const handleNew = () => {};
  const handleClose = () => {
    dispatch(resetSearchSettings());
  };

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: regionsDataList,
    loading,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/add-region`}
          handleNewOnClick={handleNew}
          closeButtonRoute={"/"}
          handleCloseOnClick={handleClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerms}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<UpdatedRegionsListing loading={loading} setLoading={setLoading} />}
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
export default UpdatedRegionsMainPage;
