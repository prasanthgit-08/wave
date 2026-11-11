import React, { useState } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import UserPermissionListPage from "./UserPermissionListPage";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../constants/screenSizes";
import { useDispatch, useSelector } from "react-redux";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import {
  setSearchTerm,
  setUPSearchCriteria,
  setPageNumber,
  setStatus,
  setCategory,
  resetFields,
  updateField,
} from "../../../../redux/UserPermissionSlice";
import { useNavigate, useParams } from "react-router-dom";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import UserPermissionsService from "../../../../services/UserPermissionsService";
import toast from "react-hot-toast";

const UserPermissionBrowsePage = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const id = params.id;

  const pageNumber = useSelector((state) => state.userPermission.pageNumber);
  const totalPages = useSelector((state) => state.userPermission.totalPages);
  const totalElements = useSelector((state) => state.userPermission.totalElements);
  const listingData = useSelector((state) => state.userPermission.listingData);
  const status = useSelector((state) => state.userPermission.status);
  const category = useSelector((state) => state.userPermission.category);
  const searchCriteria = useSelector((state) => state.userPermission.searchCriteria);
  const searchTerm = useSelector((state) => state.userPermission.searchTerm);
  const editedList = useSelector((state) => state.userPermission.editedList);
  const enableSave = useSelector((state) => state.userPermission.enableSave);

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const handleSave = () => {
    updateData("isSaving", true);
    UserPermissionsService.updatePermissions(editedList).then((response) => {
      if (response) {
        navigate(`/user-maintenance/${id}`);
        dispatch(resetFields());
        toast.success("Save Successful.");
      }
    });
  };

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
    recordsPerPage: 17,
    loading,
  };

  return (
    <QuarterScreenTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={HALF_SCREEN_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={
        <SearchFilterComponent
          closeButtonRoute={`/user-maintenance/${id}`}
          handleCloseOnClick={() => {
            dispatch(resetFields());
            toast.success("Page Closed.");
          }}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setUPSearchCriteria}
          setPageNumber={setPageNumber}
          customSecondRadioGroupOptions={["All", "Enabled", "Disabled"]}
          customThirdRadioGroupOptions={["All", "Overridable", "Non Override"]}
          setSecondRadioGroupValue={setStatus}
          setThirdRadioGroupValue={setCategory}
          secondRadioGroupValue={status}
          thirdRadioGroupValue={category}
          saveButton
          handleSaveOnClick={() => {
            handleSave();
          }}
          disableSave={!enableSave}
        />
      }
      TableListingComponent={<UserPermissionListPage loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          firstPage
          lastPage
          tripleArrowUp
          tripleArrowDown
          doubleArrowUp
          doubleArrowDown
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
};

export default UserPermissionBrowsePage;
