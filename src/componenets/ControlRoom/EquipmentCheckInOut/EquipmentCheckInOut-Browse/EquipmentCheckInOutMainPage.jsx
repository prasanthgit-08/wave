import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import ThreeFourthScreenTemplate from "../../../Templates/ThreeFourthScreenTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import {
  setSearchTerm,
  setPageNumber,
  setSelectedSearchCriteria,
  setSelectedStatus,
  resetClose,
} from "../../../../redux/EquipmentCheckInOutSlice";
import EquipmentCheckInOutList from "./EquipmentCheckInOutList";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { ThreeForthScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
const EquipmentCheckInOutMainPage = () => {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(true);

  const pageNumber = useSelector((state) => state.equipmentCheckInOutReducer.pageNumber);
  const totalElements = useSelector((state) => state.equipmentCheckInOutReducer.totalElements);
  const totalPages = useSelector((state) => state.equipmentCheckInOutReducer.totalPages);
  const searchTerm = useSelector((state) => state.equipmentCheckInOutReducer.searchTerm);
  const selectedSearchCriteria = useSelector(
    (state) => state.equipmentCheckInOutReducer.selectedSearchCriteria
  );
  const equipmentData = useSelector((state) => state.equipmentCheckInOutReducer.equipmentData);
  const selectedStatus = useSelector((state) => state.equipmentCheckInOutReducer.selectedStatus);
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: equipmentData,
  };

  const onClose = () => {
    dispatch(resetClose());
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          secondRadioGroup

          closeButtonRoute={"/"}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          secondRadioGroupValue={selectedStatus}
          setSecondRadioGroupValue={setSelectedStatus}
          setPageNumber={setPageNumber}
          customSecondRadioGroupOptions={["All", "Checked Out", "Checked In"]}
        />
      }
      TableListingComponent={<EquipmentCheckInOutList loader={loader} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={ThreeForthScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
};

export default EquipmentCheckInOutMainPage;
