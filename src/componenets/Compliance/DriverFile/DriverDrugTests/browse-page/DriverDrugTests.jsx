import { parseLocalDate } from "../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import TableListing from "../../DriverDrugTests/browse-page/TableListing";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import DateInputField from "../../../../common/DateInputField";
import {
  resetDriverDrugTests,
  setCancelled,
  setDateFrom,
  setDateTo,
  setIsDrugTestForm,
  setPageNumber,
  setSearchCriteria,
  setSearchStatus,
  setType,
} from "../../../../../redux/DriverDrugTestsSlice";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";

const DriverDrugTests = () => {
  const { driverId } = useParams();
  const dispatch = useDispatch();

  const searchCriteria = useSelector((state) => state.driverDrugTests.searchCriteria);
  const listingData = useSelector((state) => state.driverDrugTests.listingData);
  const pageNumber = useSelector((state) => state.driverDrugTests.pageNumber);
  const totalPages = useSelector((state) => state.driverDrugTests.totalPages);
  const totalElements = useSelector((state) => state.driverDrugTests.totalElements);
  const dateFrom = useSelector((state) => state.driverDrugTests.dateFrom);
  const dateTo = useSelector((state) => state.driverDrugTests.dateTo);
  const searchStatus = useSelector((state) => state.driverDrugTests.searchStatus);
  const cancelled = useSelector((state) => state.driverDrugTests.cancelled);
  const type = useSelector((state) => state.driverDrugTests.type);
  const [isFromDateValid, SetIsFromDateValid] = useState(true);
  const [isTodateValid, setIsTodateValid] = useState(true);
  const paginationLoader = useSelector((state) => state.driverDrugTests.paginationLoader);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  const onClose = () => {
    dispatch(resetDriverDrugTests());
    dispatch(setIsDrugTestForm(false));
  };

  useEffect(() => {
    if (cancelled) {
      dispatch(setCancelled(false));
    } else {
      dispatch(setPageNumber(0));
    }
  }, [dateFrom, dateTo]);

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/driver-drugtests/add/${driverId}`}
          handleNewOnClick={() => {}}
          closeButtonRoute={`/driver-maintenance-add/${driverId}`}
          handleCloseOnClick={onClose}
          setPageNumber={setPageNumber}
          customFirstRadioGroupOptions={["All", "Drug Only", "Alcohol Only"]}
          customSecondRadioGroupOptions={["All", "Not Notified", "Not Tested"]}
          customThirdRadioGroupOptions={["All", "Normal", "Refused", "Canceled"]}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          secondRadioGroup={true}
          secondRadioGroupValue={searchStatus}
          setSecondRadioGroupValue={setSearchStatus}
          thirdRadioGroup
          thirdRadioGroupValue={type}
          setThirdRadioGroupValue={setType}
          MiscellaneousContent={
            <>
              <label className="f-w-600 m-r-15 customLabel">From</label>
              <span className="p-2" style={{ width: "112px" }}>
                <DateInputField
                  date={dateFrom}
                  setDate={(value) => dispatch(setDateFrom(value))}
                  setIsDateValid={SetIsFromDateValid}
                  reduxSetDate={(value) => setDateFrom(value)}
                  max={dateTo ? new Date(parseLocalDate(formatDatetimeToDate(dateTo))) : ""}
                  className={`customFormControl ${isFromDateValid ? "" : "borderRed"}`}
                />
              </span>
              <label className="f-w-600 m-r-15 customLabel">To</label>
              <span className="p-2" style={{ width: "112px" }}>
                <DateInputField
                  name="dateTo"
                  date={dateTo}
                  setDate={(value) => dispatch(setDateTo(value))}
                  setIsDateValid={setIsTodateValid}
                  reduxSetDate={(value) => setDateTo(value)}
                  min={dateFrom ? new Date(parseLocalDate(formatDatetimeToDate(dateFrom))) : ""}
                  className={`customFormControl ${isTodateValid ? "" : "borderRed"}`}
                />
              </span>
            </>
          }
          expandFilters
        />
      }
      TableListingComponent={<TableListing />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={QuarterScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          loading={paginationLoader}
        />
      }
    />
  );
};

export default DriverDrugTests;
