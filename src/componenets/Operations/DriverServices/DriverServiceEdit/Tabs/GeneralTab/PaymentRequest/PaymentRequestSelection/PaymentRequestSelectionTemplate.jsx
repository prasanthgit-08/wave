import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setSearchTerms,
  setSearchCriteria,
  setSelectedStatus,
  setPageNumber,
  setEditFormData,
  setDriverPayRequestsPK,
  resetState,
  setViewDetail,
  setDriverpayTabValid,
  setChangesCancelled,
} from "../../../../../../../../redux/PaymentRequestSlice";
import { PaginationComponent } from "../../../../../../../common/PaginationComponent";

import TableListing from "./TableListing";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../../../../../constants/screenSizes";
import { HalfScreen_RecordsPerPage } from "../../../../../../../../services/constants/applicationConstants";
import QuarterScreenTemplate from "../../../../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../../../../common/SearchFilterComponent";
import { useParams } from "react-router-dom";
import { PermissionKeyGeneratorUtil } from "../../../../../../../../utils/PermissionKeyGeneratorUtil";

function PaymentRequestSelectionTemplate() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { driverId, id } = useParams();

  const listingData = useSelector((state) => state.paymentRequestSlice.listingData);
  const pageNumber = useSelector((state) => state.paymentRequestSlice.pageNumber);
  const totalPages = useSelector((state) => state.paymentRequestSlice.totalPages);
  const searchTerms = useSelector((state) => state.paymentRequestSlice.searchTerms);

  const totalElements = useSelector((state) => state.paymentRequestSlice.totalElements);
  const searchCriteria = useSelector((state) => state.paymentRequestSlice.searchCriteria);
  const selectedStatus = useSelector((state) => state.paymentRequestSlice.selectedStatus);
  const driverActive = useSelector((state) => state.paymentRequestSlice.driverActive);
  const driverDealesed = useSelector((state) => state.paymentRequestSlice.driverDealesed);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("payrequest", "NEW");
  const [disableEdit, setDisableEdit] = useState(false);
  const [disableNew, setDisableNew] = useState(false);

  const onClose = async () => {
    dispatch(resetState());
  };

  useEffect(() => {
    if (deniedPermissions) {
      setDisableEdit(deniedPermissions.includes(editPermission));
    }
  }, []);

  useEffect(() => {
    if (driverDealesed) {
      setDisableNew(true);
    } else {
      setDisableNew(false);
    }
  }, [driverActive, driverDealesed]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: listingData,
  };
  return (
    <QuarterScreenTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={HALF_SCREEN_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/payment-requests-new/${driverId}`}
          handleNewOnClick={() => {
            dispatch(resetState());
            dispatch(setChangesCancelled(false));

            dispatch(setViewDetail(false));
            dispatch(setEditFormData(null));
            dispatch(setDriverPayRequestsPK(null));
          }}
          disableNew={disableEdit || disableNew}

          closeButtonRoute={`/driver-service-selection/${driverId}/form`}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          secondRadioGroup
          secondRadioGroupValue={selectedStatus}
          customSecondRadioGroupOptions={["All", "Entered", "Paid", "Denied"]}
          setSecondRadioGroupValue={setSelectedStatus}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<TableListing customerURL={``} loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={HalfScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          loading={loading}
        />
      }
    />
  );
}

export default PaymentRequestSelectionTemplate;
