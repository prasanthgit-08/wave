import React from "react";
import GroupsDetailsPageTemplate from "../../../../Templates/GroupsDetailsPageTemplate";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import PermissionList from "./PermissionList";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { useSelector } from "react-redux";
import FormFooter from "./FormFooter";
import {
  setPermissionPageNumber,
  setPermissionTotalPages,
} from "../../../../../redux/PermissionGroupMaintenanceSlice";

const DetailPageTemplate = () => {
  const viewDetail = useSelector((state) => state.permissionGroupsReducer.viewDetail);
  const permissionPageNumber = useSelector((state) => state.permissionGroupsReducer.permissionPageNumber);
  const permissionList = useSelector((state) => state.permissionGroupsReducer.permissionList);
  const permissionTotalPages = useSelector((state) => state.permissionGroupsReducer.permissionTotalPages);
  const browseLoading = useSelector((state) => state.permissionGroupsReducer.browseLoading);
  return (
    <GroupsDetailsPageTemplate
      viewDetail={viewDetail}

      FormHeaderComponent={<FormHeader />}
      FormContentComponent={<FormContent />}
      GroupsListingComponent={<PermissionList />}
      PaginationComponent={
        <PaginationComponent
          pageNumber={permissionPageNumber}
          setPageNumber={setPermissionPageNumber}
          totalPages={permissionTotalPages}
          totalElements={setPermissionTotalPages}
          listingData={permissionList}
          numberOfElements={permissionList?.length}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          hideBorderBottom
          hideBorderRight
          hideBorderTop
          loading={browseLoading}
        />
      }
      FormFooterComponent={<FormFooter />}
    />
  );
};

export default DetailPageTemplate;
