import React from "react";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import GroupsDetailsPageTemplate from "../../../Templates/GroupsDetailsPageTemplate";
import { PaginationComponent } from "../../../common/PaginationComponent";
import CustomersListing from "./CustomersListing";
import { useSelector } from "react-redux";
import { setCustomerPageNumber, setCustomerTotalElements } from "../../../../redux/CustomerGroupsSlice";

const CustomerGroupsForm = () => {
  const viewDetail = useSelector((state) => state.customerGroups.viewDetail);
  const customerList = useSelector((state) => state.customerGroups.customerList);
  const customerPageNumber = useSelector((state) => state.customerGroups.customerPageNumber);
  const customerTotalPages = useSelector((state) => state.customerGroups.customerTotalPages);

  return (
    <GroupsDetailsPageTemplate
      viewDetail={viewDetail}
      FormHeaderComponent={<FormHeader />}
      FormContentComponent={<FormContent />}
      GroupsListingComponent={<CustomersListing />}
      PaginationComponent={
        <PaginationComponent
          pageNumber={customerPageNumber}
          setPageNumber={setCustomerPageNumber}
          totalPages={customerTotalPages}
          totalElements={setCustomerTotalElements}
          listingData={customerList}
          numberOfElements={customerList?.length}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          hideBorderBottom
          hideBorderRight
          hideBorderTop
        />
      }
      FormFooterComponent={<FormFooter showCustomersButton />}
    />
  );
};

export default CustomerGroupsForm;
