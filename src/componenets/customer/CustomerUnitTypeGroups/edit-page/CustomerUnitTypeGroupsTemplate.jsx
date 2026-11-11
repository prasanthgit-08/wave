import React from "react";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import styles from "../../../../styles/QuarterScreen.module.css";
import GroupsDetailsPageTemplate from "../../../Templates/GroupsDetailsPageTemplate";
import { useSelector } from "react-redux";
import UnitTypeGroupsListing from "./UnitTypeGroupsListing";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { setPageNumberUT } from "../../../../redux/CustomerUnitTypeGroupSlice";

function CustomerUnitTypeGroupsTemplate() {
  const pageNumberUT = useSelector((state) => state.customerUnitTypeGroupReducer.pageNumberUT);
  const totalPagesUT = useSelector((state) => state.customerUnitTypeGroupReducer.totalPagesUT);
  const totalElementsUT = useSelector((state) => state.customerUnitTypeGroupReducer.totalElementsUT);
  const unitTypeGroupData = useSelector((state) => state.customerUnitTypeGroupReducer.unitTypeGroupData);
  const viewDetail = useSelector((state) => state.customerUnitTypeGroupReducer.viewDetail);
  return (
    <GroupsDetailsPageTemplate
      viewDetail={viewDetail}
      FormHeaderComponent={<FormHeader />}
      FormContentComponent={<FormContent />}
      GroupsListingComponent={<UnitTypeGroupsListing />}
      PaginationComponent={
        <PaginationComponent
          pageNumber={pageNumberUT}
          setPageNumber={setPageNumberUT}
          totalPages={totalPagesUT}
          totalElements={totalElementsUT}
          listingData={unitTypeGroupData}
          numberOfElements={unitTypeGroupData?.length}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          hideBorderBottom
          hideBorderRight
          hideBorderTop
        />
      }
      FormFooterComponent={<FormFooter type={"asdf"} />}
    />
  );
}

export default CustomerUnitTypeGroupsTemplate;
