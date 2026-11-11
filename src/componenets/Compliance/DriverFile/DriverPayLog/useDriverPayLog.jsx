import { formatForApi } from "../../../../utils/dateUtils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { axios } from "../../../../config/axiosInterceptors";
import {
  Driver_Pay_History_CrossDB_URL,
  Driver_Pay_History_URL,
} from "../../../../services/constants/applicationConstants";
import {
  resetDriverPayLog,
  setActiveTab,
  setDateRange,
  setDetailRows,
  setError,
  setFilters,
  setHiredDate,
  setLoading,
  setSelectedSummary,
  setSelectedPayee,
  setDetailPagination,
  setDetailPageNumber,
  setSummaryPagination,
  setSummaryPageNumber,
  setSummaryRows,
} from "../../../../redux/DriverPayLogSlice";

// formatForApi already yields the local calendar day as YYYY-MM-DD ("" when
// empty/invalid); the old getTimezoneOffset() hack it replaced is no longer needed.
const toDateInputValue = (value) => formatForApi(value);

const listFromResponse = (data) => (Array.isArray(data) ? data : data?.content || []);

const debitCardStatus = (row) => {
  if (!row?.debitCardDetailFK) return "";
  const detail = row.debitCardDetail || {};
  if (!detail.status) return "Not yet sent";
  return detail.status === "S" ? "Sent. Waiting on confirmation." : detail.result || "";
};

const summaryRecordsPerPage = 9;

// Set to false when the Summary API returns notToDriver and payee fields.
const USE_TEMPORARY_PAYEE_DATA = false;

const temporaryPayee = {
  name: "Test Payee",
  address1: "123 Main Street",
  address2: "Suite 100",
  city: "Wakarusa",
  stateCode: "IN",
  postalCode: "46573",
};

const useDriverPayLog = () => {
  const { id: driverId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFromDateValid, setIsFromDateValid] = useState(true);
  const [isToDateValid, setIsToDateValid] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState();
  const [isExporting, setIsExporting] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [dateRefreshKey, setDateRefreshKey] = useState(0);
  const detailRequestId = useRef(0);

  const activeTab = useSelector((state) => state.driverPayLogReducer.activeTab);
  const fromDate = useSelector((state) => state.driverPayLogReducer.fromDate);
  const toDate = useSelector((state) => state.driverPayLogReducer.toDate);
  const hiredDate = useSelector((state) => state.driverPayLogReducer.hiredDate);
  const summaryRows = useSelector((state) => state.driverPayLogReducer.summaryRows);
  const detailRows = useSelector((state) => state.driverPayLogReducer.detailRows);
  const summaryPageNumber = useSelector((state) => state.driverPayLogReducer.summaryPageNumber);
  const summaryTotalPages = useSelector((state) => state.driverPayLogReducer.summaryTotalPages);
  const summaryTotalElements = useSelector((state) => state.driverPayLogReducer.summaryTotalElements);
  const detailPageNumber = useSelector((state) => state.driverPayLogReducer.detailPageNumber);
  const detailTotalPages = useSelector((state) => state.driverPayLogReducer.detailTotalPages);
  const detailTotalElements = useSelector((state) => state.driverPayLogReducer.detailTotalElements);
  const selectedSummary = useSelector((state) => state.driverPayLogReducer.selectedSummary);
  const selectedPayee = useSelector((state) => state.driverPayLogReducer.selectedPayee);
  const loading = useSelector((state) => state.driverPayLogReducer.loading);
  const error = useSelector((state) => state.driverPayLogReducer.error);
  const filters = useSelector((state) => state.driverPayLogReducer.filters);

  const loadHiredDate = useCallback(async () => {
    if (!driverId) return;
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(`${Driver_Pay_History_URL}/getDriverHiredDate/${driverId}`);
      const hiredDate = toDateInputValue(data);
      dispatch(setHiredDate(hiredDate));
      dispatch(setDateRange({ fromDate: hiredDate, toDate: toDateInputValue(new Date()) }));
    } catch (error) {
      dispatch(setError("Unable to load the driver's hire date."));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, driverId]);

  const loadSummary = useCallback(async () => {
    // Do not touch the loading flag here: a missing date range can also mean another
    // in-flight loader (e.g. loadHiredDate on mount) is still legitimately running.
    // changeDate clears it directly for the case this guard is covering.
    if (!driverId || !fromDate || !toDate) return;
    dispatch(setLoading(true));
    dispatch(setError(""));
    try {
      const { data } = await axios.post(`${Driver_Pay_History_URL}/getCheckHeaderListForSelectedDriver`, {
        pageNumber: summaryPageNumber,
        // Summary rows are taller than Detail rows; nine keeps the table inside the quarter-screen frame.
        size: summaryRecordsPerPage,
        sortType: true,
        programType: "payLog",
        driverFK: driverId,
        fromDate: fromDate,
        toDate: toDate,
        includeDriver: filters.driver,
        includeGarnishment: filters.garnishments,
        includeClaims: filters.claims,
        includePayments: filters.payments,
      });
      dispatch(setSummaryRows(listFromResponse(data)));
      dispatch(
        setSummaryPagination({
          totalPages: data?.totalPages || 0,
          totalElements: data?.totalElements || 0,
        })
      );
    } catch (error) {
      dispatch(setSummaryRows([]));
      dispatch(setSummaryPagination({ totalPages: 0, totalElements: 0 }));
      dispatch(setError("Unable to load pay-log summary records."));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dateRefreshKey, dispatch, driverId, filters, fromDate, summaryPageNumber, toDate]);

  const loadDetail = useCallback(async () => {
    // See loadSummary: leave the loading flags alone here, changeDate clears them directly.
    if (!driverId || !fromDate || !toDate) return;
    const requestId = ++detailRequestId.current;
    setIsDetailLoading(true);
    dispatch(setLoading(true));
    dispatch(setError(""));
    try {
      const { data } = await axios.post(
        `${Driver_Pay_History_CrossDB_URL}/getCheckDetailListForSelectedDriver`,
        {
          pageNumber: detailPageNumber,
          driverFKInt: driverId,
          fromDate: fromDate,
          toDate: toDate,
          programType: "payLog",
          includeDriver: filters.driver,
          includeGarnishment: filters.garnishments,
          includeClaims: filters.claims,
          includePayments: filters.payments,
        }
      );
      if (requestId === detailRequestId.current) {
        dispatch(setDetailRows(listFromResponse(data)));
        dispatch(
          setDetailPagination({
            totalPages: data?.totalPages || 0,
            totalElements: data?.totalElements || 0,
          })
        );
      }
    } catch (error) {
      if (requestId === detailRequestId.current) {
        dispatch(setDetailRows([]));
        dispatch(setDetailPagination({ totalPages: 0, totalElements: 0 }));
        dispatch(setError("Unable to load pay-log detail records."));
      }
    } finally {
      if (requestId === detailRequestId.current) {
        setIsDetailLoading(false);
        dispatch(setLoading(false));
      }
    }
  }, [dateRefreshKey, dispatch, driverId, detailPageNumber, filters, fromDate, toDate]);

  useEffect(() => {
    dispatch(resetDriverPayLog());
    loadHiredDate();
  }, [dispatch, loadHiredDate]);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  useEffect(() => {
    if (activeTab === "detail") loadDetail();
  }, [loadDetail, activeTab]);

  const selectSummary = (row) => {
    const isNotToDriver = USE_TEMPORARY_PAYEE_DATA ? true : Boolean(row?.notToDriver);
    const payeeData = USE_TEMPORARY_PAYEE_DATA ? { ...row, ...temporaryPayee } : row;

    // Every selected Summary row remains highlighted; Paid To is conditional.
    dispatch(setSelectedSummary(row));
    dispatch(setSelectedPayee(isNotToDriver ? payeeData : null));
  };

  // nextFromDate/nextToDate let a caller that's about to change one of the dates (changeDate)
  // report the resulting range, since the redux values it reads are still the pre-change ones.
  const clearFilteredBrowseState = (nextFromDate = fromDate, nextToDate = toDate) => {
    // Only loadSummary/loadDetail's own finally block ever turns the loader back off, and they
    // only run when the range is complete. So only start the loader when a fetch will actually
    // follow to clear it - otherwise leave it off and let the empty tables show directly.
    const willFetch = Boolean(nextFromDate && nextToDate);
    detailRequestId.current += 1;
    dispatch(setLoading(willFetch));
    dispatch(setSelectedSummary(null));
    dispatch(setSelectedPayee(null));
    dispatch(setSummaryRows([]));
    dispatch(setDetailRows([]));
    dispatch(setSummaryPagination({ pageNumber: 0, totalPages: 0, totalElements: 0 }));
    dispatch(setDetailPagination({ pageNumber: 0, totalPages: 0, totalElements: 0 }));

    if (activeTab === "detail") setIsDetailLoading(willFetch);
    if (activeTab === "paidTo") dispatch(setActiveTab("summary"));
  };

  const updateFilters = (updatedFilters) => {
    clearFilteredBrowseState();
    dispatch(setFilters(updatedFilters));
  };

  const changeActiveTab = (tab) => {
    if (
      tab === "detail" &&
      activeTab !== "detail" &&
      fromDate &&
      toDate &&
      isFromDateValid &&
      isToDateValid
    ) {
      // Set before the tab changes so the table never flashes “No records found”.
      setIsDetailLoading(true);
      dispatch(setLoading(true));
    }
    dispatch(setActiveTab(tab));
  };

  const beginBrowseLoading = () => dispatch(setLoading(true));
  const beginDetailLoading = () => {
    setIsDetailLoading(true);
    dispatch(setLoading(true));
  };

  const exportPayLog = async (exportType) => {
    if (!fromDate || !toDate || !isFromDateValid || !isToDateValid) return;

    const exportUrl = activeTab === "detail" ? Driver_Pay_History_CrossDB_URL : Driver_Pay_History_URL;
    const programType = activeTab === "paidTo" ? "payLogDetail" : "payLog";

    setIsExporting(true);
    dispatch(setError(""));
    try {
      const { data } = await axios.post(`${exportUrl}/export`, {
        programType,
        fromDate: fromDate,
        toDate: toDate,
        exportType,
        driverFK: driverId,
        driverFKInt: driverId,
        includeDriver: filters.driver,
        includeGarnishment: filters.garnishments,
        includeClaims: filters.claims,
        includePayments: filters.payments,
      });

      if (data?.errorCode === 1) {
        toast.error(data.errorMessage || "Unable to export Driver Pay Log.");
        return;
      }

      toast.success(data?.errorMessage || "Driver Pay Log export requested.");
      if (data.fileContent) {
        setShowPreview(true);
        setBase64PDF(data.fileContent);
      }
    } catch (error) {
      toast.error("Unable to export Driver Pay Log.");
    } finally {
      setIsExporting(false);
    }
  };

  const changeDate = (field, value) => {
    const currentValue = field === "fromDate" ? fromDate : toDate;
    const wasCleared = value === "" || value === null || value === undefined;
    // Leave the field blank instead of snapping back to a default so the user can type a new date.
    // Defaults are only (re)applied when the page loads, refreshes, or is reopened (see loadHiredDate).
    const nextValue = wasCleared ? "" : value;
    const nextFromDate = field === "fromDate" ? nextValue : fromDate;
    const nextToDate = field === "fromDate" ? toDate : nextValue;
    clearFilteredBrowseState(nextFromDate, nextToDate);
    dispatch(setDateRange({ fromDate: fromDate, toDate: toDate, [field]: nextValue }));
    if (nextValue === currentValue && nextFromDate && nextToDate) {
      // Redux won't change since the resolved value matches what's already stored, so nothing
      // would re-trigger the fetch that clears the loading state clearFilteredBrowseState just
      // set. Force it.
      setDateRefreshKey((currentKey) => currentKey + 1);
    }
  };

  const close = () => {
    dispatch(resetDriverPayLog());
    navigate(`/driver-maintenance-add/${driverId}/0`);
    toast.success("Page Closed");
  };

  return {
    activeTab,
    fromDate,
    toDate,
    hiredDate,
    summaryRows,
    detailRows,
    summaryPageNumber,
    summaryTotalPages,
    summaryTotalElements,
    detailPageNumber,
    detailTotalPages,
    detailTotalElements,
    selectedSummary,
    selectedPayee,
    loading,
    error,
    filters,
    driverId,
    debitCardStatus,
    changeDate,
    close,
    exportPayLog,
    selectSummary,
    setActiveTab: changeActiveTab,
    setFilters: updateFilters,
    setSummaryPageNumber,
    setDetailPageNumber,
    summaryRecordsPerPage,
    isFromDateValid,
    isToDateValid,
    isDateRangeValid: Boolean(fromDate && toDate && isFromDateValid && isToDateValid),
    showPreview,
    base64PDF,
    setIsFromDateValid,
    setIsToDateValid,
    setShowPreview,
    isExporting,
    isDetailLoading,
    beginDetailLoading,
    beginBrowseLoading,
    hasActiveBrowseRecords:
      activeTab === "detail"
        ? detailRows.length > 0
        : activeTab === "paidTo"
          ? Boolean(selectedPayee) && summaryRows.length > 0
          : summaryRows.length > 0,
  };
};

export default useDriverPayLog;
