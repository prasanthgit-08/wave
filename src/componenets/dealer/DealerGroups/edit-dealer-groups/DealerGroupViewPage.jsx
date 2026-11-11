import React from "react";
import DealerGroupViewHeader from "./DealerGroupViewHeader";
import DealerGroupViewFooter from "./DealerGroupViewFooter";
import DealerGroupViewContent from "./DealerGroupViewContent";
import DealerListing from "./DealerListing";
import { PaginationComponent } from "../../../common/PaginationComponent";
import GroupsDetailsPageTemplate from "../../../Templates/GroupsDetailsPageTemplate";
import { useSelector } from "react-redux";
import { setDealerPageNumber } from "../../../../redux/EditDealerGroupslice";

const DealerGroupViewPage = () => {
  const dealerPageNumber = useSelector((state) => state.editDealerGroupReducer.dealerPageNumber);
  const dealerTotalElements = useSelector((state) => state.editDealerGroupReducer.dealerTotalElements);
  const dealerTotalPages = useSelector((state) => state.editDealerGroupReducer.dealerTotalPages);
  const dealerListView = useSelector((state) => state.editDealerGroupReducer.dealerListView);
  const edit = useSelector((state) => state.editDealerGroupReducer.edit);

  const unassignedpaginationProps = {
    pageNumber: dealerPageNumber,
    setPageNumber: setDealerPageNumber,
    totalPages: dealerTotalPages,
    totalElements: dealerTotalElements,
    listingData: dealerListView,
  };
  return (
    <GroupsDetailsPageTemplate
      viewDetail={!edit}
      FormHeaderComponent={<DealerGroupViewHeader />}
      FormFooterComponent={<DealerGroupViewFooter dealerListViewLength={dealerListView.length} />}
      FormContentComponent={<DealerGroupViewContent />}
      GroupsListingComponent={<DealerListing />}
      PaginationComponent={
        <PaginationComponent
          {...unassignedpaginationProps}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          hideBorderBottom
          hideBorderRight
          hideBorderTop
        />
      }
    />
  );
};

export default DealerGroupViewPage;
