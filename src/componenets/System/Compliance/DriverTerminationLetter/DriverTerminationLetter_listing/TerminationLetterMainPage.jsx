import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSearch,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
} from "../../../../../redux/DriverTerminationLetterSlice";
import TerminationLetterListing from "./TerminationLetterListing";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import { PermissionKeyGeneratorUtil } from "../../../../../utils/PermissionKeyGeneratorUtil";

const TerminationLetterMainPage = () => {
  const dispatch = useDispatch();

  const [disableNew, setDisableNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const newPermission = PermissionKeyGeneratorUtil("driverTerminationLetter", "new");

  const pageNumber = useSelector((state) => state.driverTerminationLetterReducer.pageNumber);
  const searchCriteria = useSelector((state) => state.driverTerminationLetterReducer.searchCriteria);
  const searchTerm = useSelector((state) => state.driverTerminationLetterReducer.searchTerm);
  const letterListingData = useSelector((state) => state.driverTerminationLetterReducer.letterListingData);
  const totalElements = useSelector((state) => state.driverTerminationLetterReducer.totalElements);
  const totalPages = useSelector((state) => state.driverTerminationLetterReducer.totalPages);
  const paginationProps = {
    pageNumber,
    setPageNumber: setPageNumber,
    totalPages,
    totalElements,
    listingData: letterListingData,
    loading,
  };

  // Based on Permission & logged in user, set default user
  useEffect(() => {
    if (deniedPermissions) {
      setDisableNew(deniedPermissions.includes(newPermission));
    }
  }, []);

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          globalSearchTerm={searchTerm}
          firstRadioGroupValue={searchCriteria}
          pageNumber
          newButtonRoute={"/add-driver-termination-letter"}
          closeButtonRoute={"/"}
          handleCloseOnClick={() => {
            dispatch(resetSearch());
          }}
          setGlobalSearchTerm={setSearchTerm}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
          disableNew={disableNew}
        />
      }
      TableListingComponent={<TerminationLetterListing loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={QuarterScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          hideBorderTop
          hideBorderBottom
        />
      }
    />
  );
};

export default TerminationLetterMainPage;
