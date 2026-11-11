import React, { useState } from "react";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import FormTypesListing from "./FormTypesListing";

import {
  setListingData,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setChangeColor,
  setTotalElements,
  setTotalPages,
  setNormalSortValue,
  setNormalSortFlag,
  setEditFormData,
  resetChanges,
  setViewDetail,
  setFormTypeValid,
} from "../../../../../redux/FormTypesSlice";
import { useDispatch, useSelector } from "react-redux";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";

function FormTypesBrowse() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const pageNumber = useSelector((state) => state.formTypes.pageNumber);
  const totalPages = useSelector((state) => state.formTypes.totalPages);
  const totalElements = useSelector((state) => state.formTypes.totalElements);
  const listingData = useSelector((state) => state.formTypes.listingData);
  const searchTerm = useSelector((state) => state.formTypes.searchTerm);
  const searchCriteria = useSelector((state) => state.formTypes.searchCriteria);

  const handleClickNew = () => {
    dispatch(setEditFormData(undefined));
    dispatch(resetChanges());
    dispatch(setViewDetail(undefined));
    dispatch(setFormTypeValid(true));
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
    listingData: listingData,
    loading,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/form-types/add"}
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
      TableListingComponent={<FormTypesListing loading={loading} setLoading={setLoading} />}
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
}

export default FormTypesBrowse;
