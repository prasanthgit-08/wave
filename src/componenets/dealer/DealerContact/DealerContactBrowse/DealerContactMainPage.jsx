import React, { useEffect, useRef } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import DealerContactFilter from "./DealerContactFilter";
import DealerContactListing from "./DealerContactListing";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import {
  setPageNumber,
  setDealerContactsData,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/DealerContacts";
import { useSelector } from "react-redux";
import DealerContacts from "../../../../services/DealerContacts";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ThreeForthScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";

function DealerContactMainPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;

  const [loader, setLoader] = useState(true);
  // Rows stay hidden only until the first response; later reloads keep them under the loader.
  const [initialLoading, setInitialLoading] = useState(true);
  const latestRequestId = useRef(0);

  const { pageNumber, totalPages, totalElements, searchCrit, searchTerm, sortValue, sortType } = useSelector(
    (state) => state.dealerContacts
  );
  const listingData = useSelector((state) => state.dealerContacts.dealerContactsData);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  const fetchDealerContacts = () => {
    const requestId = ++latestRequestId.current;
    // Only the latest request may update the list / loader; an older response arriving late
    // would otherwise show data that doesn't match the current sort.
    const isLatest = () => requestId === latestRequestId.current;
    DealerContacts.getAllDealerContacts(id, searchCrit, searchTerm, pageNumber, sortValue, sortType)
      .then((res) => {
        if (!isLatest()) return;
        const { data } = res;
        dispatch(setDealerContactsData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        if (!isLatest()) return;
        setInitialLoading(false);
        setLoader(false);
      });
  };

  useEffect(() => {
    // Start the loader as soon as sort/search/paging changes (not after the debounce), so the
    // sort header can't be clicked again while waiting. The 500ms debounce itself is unchanged.
    setLoader(true);
    const debounceFunction = setTimeout(() => {
      fetchDealerContacts();
    }, 500);
    return () => clearTimeout(debounceFunction);
  }, [searchCrit, searchTerm, pageNumber, sortValue, sortType]);

  return (
    <QuarterScreenTemplate
      quarterScreenBrowseHeight="473px" // comment out this if implementing common SearchFilterComponent
      SearchFilterComponent={<DealerContactFilter />}
      TableListingComponent={<DealerContactListing loader={loader} initialLoading={initialLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          loading={loader}
          recordsPerPage={ThreeForthScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
}

export default DealerContactMainPage;
