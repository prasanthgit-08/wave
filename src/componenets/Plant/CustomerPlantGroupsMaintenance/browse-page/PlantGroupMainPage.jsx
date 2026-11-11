import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PlantGroupList from "./PlantGroupList";
import { PaginationComponent } from "../../../common/PaginationComponent";
import {
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setEditFormData,
  resetChanges,
  setViewDetail,
  resetGroupEdit,
  resetEditPlants,
  setAssignedPageNo,
  setPlantSort,
  setPlantSortValue,
} from "../../../../redux/CustomerPlantGroupSlice";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { PermissionKeyGeneratorUtil } from "../../../../utils/PermissionKeyGeneratorUtil";
const PlantGroupMainPage = () => {
  const [disableNew, setDisableNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const newPermission = PermissionKeyGeneratorUtil("PlantGroup", "new");

  // Based on Permission & logged in user, set default user
  useEffect(() => {
    if (deniedPermissions) {
      setDisableNew(deniedPermissions.includes(newPermission));
    }
  }, []);

  const listingData = useSelector((state) => state.customerPlantGroup.listingData);
  const pageNumber = useSelector((state) => state.customerPlantGroup.pageNumber);

  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.customerPlantGroup.searchTerm);
  const searchCriteria = useSelector((state) => state.customerPlantGroup.searchCriteria);

  const totalPages = useSelector((state) => state.customerPlantGroup.totalPages);
  const totalElements = useSelector((state) => state.customerPlantGroup.totalElements);

  const handleClose = () => {
    reset();
  };
  const reset = () => {
    dispatch(resetChanges());
    dispatch(resetGroupEdit());
    dispatch(setAssignedPageNo(0));
    dispatch(setPlantSort(false));
    dispatch(setPlantSortValue(null));
    dispatch(resetEditPlants());
  };

  const handleClickNew = () => {
    dispatch(setEditFormData(undefined));
    // dispatch(resetChanges());
    dispatch(setViewDetail(undefined));
  };

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          globalSearchTerm={searchTerm}
          firstRadioGroupValue={searchCriteria}
          pageNumber
          newButtonRoute={"/add-plant-groups"}
          closeButtonRoute={"/"}
          setGlobalSearchTerm={setSearchTerm}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
          fetchTableData={() => {}}
          handleNewOnClick={handleClickNew}
          handleCloseOnClick={handleClose}
          disableNew={disableNew}
        />
      }
      TableListingComponent={<PlantGroupList loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          loading={loading}
          recordsPerPage={QuarterScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
};

export default PlantGroupMainPage;
