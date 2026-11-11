import React from "react";
import { useSelector } from "react-redux";
import GroupsDetailsPageQuarterScreenTemplate from "../../../Templates/GroupsDetailsPageQuarterScreenTemplate";
import GroupFormContent from "./GroupFormContent";
import GroupFormFooter from "./GroupFormFooter";
import GroupFormHeader from "./GroupFormHeader";
import UnitTypeListing from "./UnitTypeListing";

import { PaginationComponent } from "../../../common/PaginationComponent";
import { setUnitTypePageNumber, setUnitTypeTotalElements } from "../../../../redux/UnitTypeGroupSlice";
import GroupsDetailsPageTemplate from "../../../Templates/GroupsDetailsPageTemplate";
const UnitTypeGroupsTemplate = () => {
  const viewDetail = useSelector((state) => state.unitTypeGroupReducer.viewDetail);
  const unitTypePageNumber = useSelector((state) => state.unitTypeGroupReducer.unitTypePageNumber);
  const unitTypeList = useSelector((state) => state.unitTypeGroupReducer.unitTypeList);
  const unitTypeTotalPages = useSelector((state) => state.unitTypeGroupReducer.unitTypeTotalPages);
  return (
    <GroupsDetailsPageTemplate
      viewDetail={viewDetail}
      FormHeaderComponent={<GroupFormHeader />}
      FormContentComponent={<GroupFormContent />}
      GroupsListingComponent={<UnitTypeListing />}
      PaginationComponent={
        <PaginationComponent
          pageNumber={unitTypePageNumber}
          setPageNumber={setUnitTypePageNumber}
          totalPages={unitTypeTotalPages}
          totalElements={setUnitTypeTotalElements}
          listingData={unitTypeList}
          numberOfElements={unitTypeList.length}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          hideBorderBottom
          hideBorderRight
          hideBorderTop
        />
      }
      FormFooterComponent={<GroupFormFooter />}
    />
  );
};

export default UnitTypeGroupsTemplate;
