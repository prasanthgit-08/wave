import React from "react";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import GroupsDetailsPageTemplate from "../../../Templates/GroupsDetailsPageTemplate";
import { ThreeForthScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import { PaginationComponent } from "../../../common/PaginationComponent";
import AssignedBrokersListing from "./AssignedBrokersListing";
import { useSelector } from "react-redux";
import { setAssignedPageNumber, setBrokerPageNumber } from "../../../../redux/ExportBrokersSlice";

const ExportBrokersForm = () => {
  const viewDetail = useSelector((state) => state.exportBrokersReducer.viewDetail);
  const brokerTotalPages = useSelector((state) => state.exportBrokersReducer.brokerTotalPages);
  const brokerTotalElements = useSelector((state) => state.exportBrokersReducer.brokerTotalElements);
  const brokerPageNumber = useSelector((state) => state.exportBrokersReducer.brokerPageNumber);
  const brokerPortsList = useSelector((state) => state.exportBrokersReducer.brokerPortsList);
  return (
    <GroupsDetailsPageTemplate
      viewDetail={viewDetail}
      FormHeaderComponent={<FormHeader />}
      FormContentComponent={<FormContent />}
      GroupsListingComponent={<AssignedBrokersListing />}
      PaginationComponent={
        <PaginationComponent
          pageNumber={brokerPageNumber}
          setPageNumber={setBrokerPageNumber}
          totalPages={brokerTotalPages}
          totalElements={brokerTotalElements}
          listingData={brokerPortsList}
          numberOfElements={brokerPortsList.length}
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

export default ExportBrokersForm;
