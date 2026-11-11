import React, { useState } from "react";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import FormFooter from "./FormFooter";
import PlantList from "./PlantList";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { useSelector } from "react-redux";
import { setAssignedPageNo } from "../../../../redux/CustomerPlantGroupSlice";
import GroupsDetailsPageTemplate from "../../../Templates/GroupsDetailsPageTemplate";
const PlantGroupForm = () => {
  const viewDetail = useSelector((state) => state.customerPlantGroup.viewDetail);
  const assignedPageNo = useSelector((state) => state.customerPlantGroup.assignedPageNo);
  const plantList = useSelector((state) => state.customerPlantGroup.plantList);
  const plantTotalPages = useSelector((state) => state.customerPlantGroup.plantTotalPages);
  const plantTotalElements = useSelector((state) => state.customerPlantGroup.plantTotalElements);
  const [loading, setLoading] = useState(false);

  return (
    <GroupsDetailsPageTemplate
      viewDetail={viewDetail}
      FormHeaderComponent={<FormHeader closeRoute={"/"} />}
      FormContentComponent={<FormContent loading={loading} setLoading={setLoading} />}
      GroupsListingComponent={<PlantList />}
      PaginationComponent={
        <PaginationComponent
          pageNumber={assignedPageNo}
          setPageNumber={setAssignedPageNo}
          totalPages={plantTotalPages}
          totalElements={plantTotalElements}
          listingData={plantList}
          numberOfElements={plantList.length}
          firstPage
          lastPage
          singleArrowDown
          singleArrowUp
          hideBorderBottom
          hideBorderRight
          hideBorderTop
        />
      }
      FormFooterComponent={<FormFooter setLoading={setLoading} />}
    />
  );
};

export default PlantGroupForm;
