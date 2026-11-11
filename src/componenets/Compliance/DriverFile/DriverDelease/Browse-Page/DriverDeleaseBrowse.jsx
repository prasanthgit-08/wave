import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  setChangeColor,
  setEditFormData,
  setIsCompletedAndVoided,
  setIsInactiveNotDeleased,
  setIsInactiveOrDeleased,
  setIsProcessed,
  setPageNumber,
  setSearchCriteria,
  setSearchTerms,
  setSortFlag,
  setSortValue,
  setStatus,
  setViewDetail,
} from "../../../../../redux/DriverDeleaseSlice";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import TableListing from "./TableListing";
import DriverDeleaseService from "../../../../../services/DriverDeleaseService";
import DeleteComponent from "../../../../common/DeleteComponent";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DriverDeleaseBrowse = () => {
  const { driverId } = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showForPending, setShowForPending] = useState(false);
  const [checkedStatus, setCheckedStatus] = useState(false);
  const navigate = useNavigate();

  const pageNumber = useSelector((state) => state.driverDeleaseReducer.pageNumber);
  const totalPages = useSelector((state) => state.driverDeleaseReducer.totalPages);
  const totalElements = useSelector((state) => state.driverDeleaseReducer.totalElements);
  const driverDeleaseListingData = useSelector(
    (state) => state.driverDeleaseReducer.driverDeleaseListingData
  );
  const searchTerms = useSelector((state) => state.driverDeleaseReducer.searchTerms);
  const searchCriteria = useSelector((state) => state.driverDeleaseReducer.searchCriteria);
  const isInactiveOrDeleased = useSelector((state) => state.driverDeleaseReducer.isInactiveOrDeleased);
  const isInactiveNotDeleased = useSelector((state) => state.driverDeleaseReducer.isInactiveNotDeleased);
  const isProcessed = useSelector((state) => state.driverDeleaseReducer.isProcessed);
  const isCompletedAndVoided = useSelector((state) => state.driverDeleaseReducer.isCompletedAndVoided);
  const [loading, setLoading] = useState(false);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: driverDeleaseListingData,
  };
  const handleShow = () => setShow(true);
  const DeletePrimaryOk = () => {
    setShow(false);
    navigate(`/driver-delease/${driverId}`);
  };
  const handleShowForUnderProcess = () => setShowForPending(true);
  const DeletePrimaryOkForUnderProcess = () => {
    setShowForPending(false);
    navigate(`/driver-delease/${driverId}`);
  };
  /***Check the driver deleased or inactive ** */
  const checkDriverDeleasedorInactive = () => {
    DriverDeleaseService.checkInactiveDeleasedDriver(driverId)
      .then((response) => {
        setTimeout(() => {
          dispatch(setIsInactiveOrDeleased(response.data));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*******Check whether the driver is Not Deleased and Inactive*****/
  const checkDriverNotDeleasedAndInactive = () => {
    DriverDeleaseService.checkInactiveandNotDeleasedDriver(driverId)
      .then((response) => {
        setTimeout(() => {
          dispatch(setIsInactiveNotDeleased(response.data));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /***Used for Driver Delease to check whether the Driver Delease Request table contains records
   * where processed is false and canceled false for the selected driver */
  const checkProcessedRecord = () => {
    DriverDeleaseService.checkDeleaseRequestRecordExist(driverId)
      .then((response) => {
        setTimeout(() => {
          dispatch(setIsProcessed(response.data));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /****
   * Used for Driver Delease to check whether the table contains records
   * where completed is false and voided false for the selected driver
   * ***/
  const checkVoidedAndCompleted = () => {
    DriverDeleaseService.checkCompletedandVoided(driverId)
      .then((response) => {
        setTimeout(() => {
          dispatch(setIsCompletedAndVoided(response.data));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkDriverDeleasedorInactive();
  }, []);

  useEffect(() => {
    checkDriverNotDeleasedAndInactive();
  }, []);
  useEffect(() => {
    checkProcessedRecord();
  }, []);
  useEffect(() => {
    checkVoidedAndCompleted();
  }, []);

  return (
    <>
      <QuarterScreenTemplate
        SearchFilterComponent={
          <SearchFilterComponent
            isNormalSearchFilter
            handleNewOnClick={() => {
              if (
                (isInactiveNotDeleased && isProcessed) ||
                (isInactiveNotDeleased && isCompletedAndVoided) ||
                isProcessed
              ) {
                handleShowForUnderProcess();
              } else if (isInactiveOrDeleased) {
                handleShow();
              }

              dispatch(setViewDetail(false));
              dispatch(setEditFormData(null));
              dispatch(setStatus("inactive"));
            }}
            newButtonRoute={
              !isInactiveOrDeleased &&
              !(isInactiveNotDeleased && isProcessed) &&
              !(isInactiveNotDeleased && isCompletedAndVoided) &&
              !isProcessed
                ? `/driver-delease/add/${driverId}`
                : `/driver-delease/${driverId}`
            }
            closeButtonRoute={`/driver-maintenance-add/${driverId}`}
            handleCloseOnClick={() => {
              dispatch(setSearchTerms(""));
              dispatch(setSearchCriteria("Beginning"));
              dispatch(setPageNumber(0));
              dispatch(setChangeColor(false));
              dispatch(setSortValue(null));
              dispatch(setSortFlag(false));
            }}
            globalSearchTerm={searchTerms}
            setGlobalSearchTerm={setSearchTerms}
            firstRadioGroupValue={searchCriteria}
            setFirstRadioGroupValue={setSearchCriteria}
            setPageNumber={setPageNumber}
          />
        }
        TableListingComponent={<TableListing loading={loading} setLoading={setLoading} />}
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
        title={<span style={{ color: "red" }}>Warning: Driver is Deleased or Inactive</span>}
        body={
          <span style={{ color: "red" }}>
            The driver is currently Deleased or Inactive; you can’t start a new delease
          </span>
        }
        handleOK={DeletePrimaryOk}
      />
      <DeleteComponent
        show={showForPending}
        onHide={DeletePrimaryOkForUnderProcess}
        title={<span style={{ color: "red" }}>Warning:Driver cannot Deleased</span>}
        body={<span style={{ color: "red" }}>The driver has a Pending Delease Request</span>}
        handleOK={DeletePrimaryOkForUnderProcess}
      />
    </>
  );
};

export default DriverDeleaseBrowse;
