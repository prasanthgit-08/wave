import React from "react";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";

import { PaginationComponent } from "../../../common/PaginationComponent";
import { useSelector } from "react-redux";
import StatesListing from "./StatesListing";
import { setAssignedPageNo, setStateTotalElements } from "../../../../redux/StateGroupsSlice";
import GroupsDetailsPageQuarterScreenTemplate from "../../../Templates/GroupsDetailsPageQuarterScreenTemplate";
import GroupsDetailsPageTemplate from "../../../Templates/GroupsDetailsPageTemplate";

const StateGroupsForm = ({ tempFlag }) => {
  const viewDetail = useSelector((state) => state.stateGroupReducer.viewDetail);
  const stateList = useSelector((state) => state.stateGroupReducer.stateList);
  const assignedPageNo = useSelector((state) => state.stateGroupReducer.assignedPageNo);
  const stateTotalPages = useSelector((state) => state.stateGroupReducer.stateTotalPages);
  const isStateGroupLoading = useSelector((state) => state.stateGroupReducer.isStateGroupLoading);
  const assignedStatesLoading = useSelector((state) => state.stateGroupReducer.assignedStatesLoading);

  return (
    <GroupsDetailsPageTemplate
      loading={isStateGroupLoading || assignedStatesLoading}
      viewDetail={viewDetail}
      FormHeaderComponent={<FormHeader />}
      FormContentComponent={<FormContent />}
      GroupsListingComponent={<StatesListing />}
      PaginationComponent={
        <PaginationComponent
          pageNumber={assignedPageNo}
          setPageNumber={setAssignedPageNo}
          totalPages={stateTotalPages}
          totalElements={setStateTotalElements}
          listingData={stateList}
          numberOfElements={stateList?.length}
          loading={assignedStatesLoading}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          hideBorderBottom
          hideBorderRight
          hideBorderTop
        />
      }
      FormFooterComponent={<FormFooter />}
    />
  );
};

export default StateGroupsForm;
