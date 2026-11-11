import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetDeleaseRequest,
  setActiveDriver,
  setDeleasedDriver,
  setEditFormData,
  setIsProcessedandCanceledBit,
  setPageNumber,
  setSearchTerms,
  setSelectedSearchCriteria,
  setStatusType,
  setViewDetail,
} from "../../../../../redux/DriverDeleaseRequestsSlice";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import DeleaseRequestListing from "./DeleaseRequestListing";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import DriverDeleaseRequestsService from "../../../../../services/DriverDeleaseRequestsService";
import DeleteComponent from "../../../../common/DeleteComponent";
import DriverService from "../../../../../services/DriverService";

const DeleaseRequestBrowse = () => {
  const { driverId } = useParams();
  const param = useParams();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [show, setShow] = useState(false);
  const [showForPending, setShowForPending] = useState(false);
  const [showForDeleased, setShowForDeleased] = useState(false);
  const [driverData, setDriverData] = useState([]);

  const navigate = useNavigate();
  const pageNumber = useSelector((state) => state.driverDeleaseRequestsReducer.pageNumber);
  const totalElements = useSelector((state) => state.driverDeleaseRequestsReducer.totalElements);
  const totalPages = useSelector((state) => state.driverDeleaseRequestsReducer.totalPages);
  const deleaseRequestData = useSelector((state) => state.driverDeleaseRequestsReducer.deleaseRequestData);
  const searchTerms = useSelector((state) => state.driverDeleaseRequestsReducer.searchTerms);
  const selectedSearchCriteria = useSelector(
    (state) => state.driverDeleaseRequestsReducer.selectedSearchCriteria
  );
  const statusType = useSelector((state) => state.driverDeleaseRequestsReducer.statusType);
  const isProcessedandCanceledBit = useSelector(
    (state) => state.driverDeleaseRequestsReducer.isProcessedandCanceledBit
  );
  const activeDriver = useSelector((state) => state.driverDeleaseRequestsReducer.activeDriver);
  const deleasedDriver = useSelector((state) => state.driverDeleaseRequestsReducer.deleasedDriver);
  const isDeleaseProcess = useSelector((state) => state.driverDeleaseRequestsReducer.isDeleaseProcess);
  const isSettingDeleaseRequestProcessed = useSelector(
    (state) => state.driverDeleaseRequestsReducer.isSettingDeleaseRequestProcessed
  );
  const [loading, setLoading] = useState(false);
  const handleShow = () => setShow(true);
  const DeletePrimaryOk = () => {
    setShow(false);
    navigate(`/driver-delease-requests/${driverId}`);
  };
  const handleShowForUnderProcess = () => setShowForPending(true);
  const DeletePrimaryOkForUnderProcess = () => {
    setShowForPending(false);
    navigate(`/driver-delease-requests/${driverId}`);
  };
  const handleShowForDeleased = () => setShowForDeleased(true);
  const DeletePrimaryForDeleased = () => {
    setShowForDeleased(false);
    navigate(`/driver-delease-requests/${driverId}`);
  };

  const onClose = () => {
    dispatch(resetDeleaseRequest());
  };
  /*****
   * Check whether any records present in
   * the Driver Delease Request Table where both
   * processed and canceled is false
   * ******/
  const checkNotProcessedAndCanceled = () => {
    DriverDeleaseRequestsService.checkNotProcessedandCanceledRecord(driverId)
      .then((response) => {
        setTimeout(() => {
          dispatch(setIsProcessedandCanceledBit(response.data));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*****API call to check the Driver Delease Request Table*****/
  useEffect(() => {
    checkNotProcessedAndCanceled();
  }, [driverId]);

  /******Check whether the driver is active or not******/
  const fetchDriverDetails = () => {
    DriverService.getById(driverId)
      .then((res) => {
        setDriverData(res.data);
        dispatch(setActiveDriver(res.data.active));
        dispatch(setDeleasedDriver(res.data.deleased));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchDriverDetails();
  }, [driverId]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: deleaseRequestData,
    recordsPerPage: QuarterScreen_RecordsPerPage,
  };
  return (
    <>
      <QuarterScreenTemplate
        SearchFilterComponent={
          <SearchFilterComponent
            isNormalSearchFilter
            secondRadioGroup
            handleNewOnClick={() => {
              if (isProcessedandCanceledBit) {
                handleShowForUnderProcess();
              } else if (!activeDriver && !deleasedDriver) {
                handleShow();
              } else if (!activeDriver && deleasedDriver) {
                handleShowForDeleased();
              }
              dispatch(setViewDetail(false));
              dispatch(setEditFormData(null));
            }}
            newButtonRoute={
              isProcessedandCanceledBit ||
              (!activeDriver && !deleasedDriver) ||
              (!activeDriver && deleasedDriver)
                ? `/driver-delease-requests/${driverId}`
                : `/driver-delease-requests/add/${driverId}`
            }
            closeButtonRoute={`/driver-maintenance-add/${driverId}`}
            handleCloseOnClick={onClose}
            globalSearchTerm={searchTerms}
            setGlobalSearchTerm={setSearchTerms}
            firstRadioGroupValue={selectedSearchCriteria}
            setFirstRadioGroupValue={setSelectedSearchCriteria}
            setPageNumber={setPageNumber}
            customSecondRadioGroupOptions={["All", "Not Processed", "Processed", "Canceled"]}
            secondRadioGroupValue={statusType}
            setSecondRadioGroupValue={setStatusType}
          />
        }
        TableListingComponent={
          <DeleaseRequestListing loading={loading} setLoading={setLoading} loader={loader} />
        }
        PaginationComponent={
          <PaginationComponent
            {...paginationProps}
            recordsPerPage={QuarterScreen_RecordsPerPage}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
            loading={loading}
          />
        }
      />

      <DeleteComponent
        show={show}
        onHide={DeletePrimaryOk}
        title={<span style={{ color: "red" }}>Warning: Driver is Inactive</span>}
        body={
          <span style={{ color: "red" }}>The driver is Inactive you can’t start a new delease request</span>
        }
        handleOK={DeletePrimaryOk}
      />

      <DeleteComponent
        show={showForPending}
        onHide={DeletePrimaryOkForUnderProcess}
        title={<span style={{ color: "red" }}>Warning:The Driver has an active Delease Request</span>}
        body={<span style={{ color: "red" }}>The driver currently has an active Delease Request</span>}
        handleOK={DeletePrimaryOkForUnderProcess}
      />
      <DeleteComponent
        show={showForDeleased}
        onHide={DeletePrimaryForDeleased}
        title={<span style={{ color: "red" }}>Warning:The Driver is Deleased</span>}
        body={
          <span style={{ color: "red" }}>The driver is Deleased you can’t start a new delease request</span>
        }
        handleOK={DeletePrimaryForDeleased}
      />
    </>
  );
};

export default DeleaseRequestBrowse;
