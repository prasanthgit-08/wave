import { parseLocalDate } from "../../../../../../../../utils/dateUtils";
import React, { useEffect, useRef, useState } from "react";
import QuarterScreenWrapper from "../../../../../../../Templates/Screens/QuarterScreenWrapper";
import PostNoCheckinHeader from "../PostNoCheckinHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import PostNoCheckinService from "../../../../../../../../services/operations/PostNoCheckinService";
import {
  setActiveDispatchList,
  setDriverFK,
  setTotalElementsAdd,
  setTotalPagesAdd,
  setUnitsLoading,
  setPageNumberAdd,
  setSaveData,
  setLoader,
  setDateArrayIndex,
  setSaveDisable,
  setDispatchPK,
  resetUnitDetails,
  setPostLoading,
} from "../../../../../../../../redux/PostNoCheckinSlice";
import { PaginationComponent } from "../../../../../../../common/PaginationComponent";
import PostNoCheckinListing from "./PostNoCheckinListing";
import { Row } from "react-bootstrap";
import PostNoCheckinAddFooter from "./PostNoCheckinAddFooter";
import toast from "react-hot-toast";
import DriverTMRLogsService from "../../../../../../../../services/DriverTMRLogsService";
import { setLoginUserData, setLoginUserPK } from "../../../../../../../../redux/DriverTMRLogsSlice";
import LoadingIcon from "../../../../../../../common/LoadingIcon";
import DateInputField from "../../../../../../../common/DateInputField";

function PostNoCheckin() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to hold the selected date
  const [selectedDate, setSelectedDate] = useState("");
  const [notes, setNotes] = useState("");
  const [notesLoading, setNotesLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const pageNumberAdd = useSelector((state) => state.postNoCheckinReducer.pageNumberAdd);
  const totalPagesAdd = useSelector((state) => state.postNoCheckinReducer.totalPagesAdd);
  const totalElementsAdd = useSelector((state) => state.postNoCheckinReducer.totalElementsAdd);
  const activeDispatchList = useSelector((state) => state.postNoCheckinReducer.activeDispatchList);
  const missedDates = useSelector((state) => state.postNoCheckinReducer.missedDates);
  const dispatchPK = useSelector((state) => state.postNoCheckinReducer.dispatchPK);
  const companyName = useSelector((state) => state.postNoCheckinReducer.companyName);
  const saveData = useSelector((state) => state.postNoCheckinReducer.saveData);
  const dateArrayIndex = useSelector((state) => state.postNoCheckinReducer.dateArrayIndex);
  const postLoading = useSelector((state) => state.postNoCheckinReducer.postLoading);
  const unitsLoading = useSelector((state) => state.postNoCheckinReducer.unitsLoading);
  const driverFK = useSelector((state) => state.postNoCheckinReducer.driverFK);

  const [previousDate, setPreviousDate] = useState();
  // date just set from dateArrayIndex, whose record that effect already fetched
  const dateSetByIndexRef = useRef(null);

  const [isDirty, setIsDirty] = useState(false);

  const [originalDate, setOriginalDate] = useState(null);
  const [originalNotes, setOriginalNotes] = useState("");

  const loginUserPK = useSelector((state) => state.driverTMRLogsReducer.loginUserPK);
  const [isInvalidDate, setIsInvalidDate] = useState(false);
  const [isDateInMissedList, setIsDateInMissedList] = useState(true);

  window.addEventListener("popstate", () => {
    navigate(`/driver-service-selection/${driverFK}/form`);
  });

  const parseDate = (dateString) => {
    const [month, day, year] = dateString.split("/").map(Number);

    // Adjust year to be four digits if it's two digits
    const fullYear = year < 100 ? 2000 + year : year;

    // Create and return a new Date object
    return new Date(fullYear, month - 1, day);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    if (date) {
      const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{2}$/;

      if (dateRegex.test(date)) {
        setIsInvalidDate(false);
        const dateExists = missedDates.some((date) => date.getTime() === selectedDate.getTime());
        if (dateExists) {
          setPreviousDate(selectedDate);
        }
        setSelectedDate(parseDate(date));
      } else {
        setIsInvalidDate(true);
      }
    } else {
      setIsInvalidDate(true);
    }
  };

  const handleBlur = () => {
    // Check if the current value is a valid date

    const dateExists = missedDates.some((date) => date.getTime() === selectedDate.getTime());

    if (!dateExists && previousDate) {
      setSelectedDate(previousDate);
    } else if (!dateExists) {
      setSelectedDate(missedDates[0]);
    }
    if (!selectedDate || isNaN(parseLocalDate(selectedDate).getTime())) {
      setIsInvalidDate(true);
    } else {
      setIsInvalidDate(false);
    }
  };

  const handleKeyDown = (event) => {
    const allowedKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Delete",
      "/",
      "Enter",
    ];
    const isNumber = /^[0-9]$/;

    if (!allowedKeys.includes(event.key) && !isNumber.test(event.key)) {
      event.preventDefault();
    }
  };
  // Function to check if a date is enabled
  const isDateEnabled = (date) => {
    const targetDate = date.toLocaleDateString("en-CA");

    return missedDates?.some((missedDate) => {
      if (missedDate instanceof Date) {
        const missedLocalDate = missedDate.toLocaleDateString("en-CA");
        return missedLocalDate === targetDate;
      }
      return false;
    });
  };

  /**
   *  Used for Listing active Dispatches for a Driver.
   **/
  const getActiveDispatchForDriver = (driverId) => {
    if (driverId) {
      // dispatch(setActiveDispatchList([]));
      dispatch(setUnitsLoading(true));
      PostNoCheckinService.getActiveDispatchForDriver(driverId, pageNumberAdd)
        .then((response) => {
          const { data } = response;

          if (data) {
            const browseData = data?.slice(0, data?.length - 1); // Slice everything except the last item
            const pagination = data?.slice(data?.length - 1); // Get only the last item (or empty array if data is empty)
            dispatch(setActiveDispatchList(browseData || []));
            dispatch(setTotalElementsAdd(pagination[0].TotalElements || 0));
            dispatch(setTotalPagesAdd(pagination[0].TotalPages || 0));
          } else {
            dispatch(setActiveDispatchList([]));
            dispatch(setTotalElementsAdd(0));
            dispatch(setTotalPagesAdd(0));
          }
          dispatch(setUnitsLoading(false));
        })
        .catch((error) => {
          dispatch(setUnitsLoading(false));
        });
    }
  };

  /**
   *  get No Checkin Record for a date and dispatch.
   **/
  const getNoCheckinRecord = (driverFK, dispatchFK, date) => {
    if (driverFK) {
      setNotesLoading(true);

      PostNoCheckinService.getNoCheckinRecord(driverFK, dispatchFK, date)
        .then((response) => {
          const { data } = response;

          if (data) {
            const loadedNotes = data.notes || "";

            setNotes(loadedNotes);

            setOriginalNotes(loadedNotes);
            setOriginalDate(date);

            setIsDirty(false);

            if (data.notes !== null) {
              setUpdated(true);
            } else {
              setUpdated(false);
            }
          } else {
            setNotes("");

            setOriginalNotes("");
            setOriginalDate(date);
            setIsDirty(false);
          }
        })
        .finally(() => {
          setNotesLoading(false);
        });
    }
  };

  /**
   * Save Handler
   * Used for save DriverNoCheckin.
   **/
  const saveHandler = () => {
    dispatch(setPostLoading(true));
    if (missedDates.length) dispatch(setLoader(true));
    PostNoCheckinService.saveDriverNoCheckin(saveData)
      .then((response) => {
        if (updated === false) {
          setSelectedDate("");
          setNotes("");
          // dispatch(setDateArrayIndex(dateArrayIndex <= 0 ? missedDates.length-1 : dateArrayIndex - 1));   // Starting from end date
          dispatch(
            setDateArrayIndex(missedDates.length - 1 === dateArrayIndex ? dateArrayIndex : dateArrayIndex + 1)
          );
          navigate(`/postNoCheckin/${id}`);
          dispatch(setLoader(false));
          toast.success("No Checkin Saved");
        } else {
          setSelectedDate("");
          setNotes("");
          // dispatch(setDateArrayIndex(dateArrayIndex <= 0 ? missedDates.length-1 : dateArrayIndex - 1));      // Starting from end date
          dispatch(
            setDateArrayIndex(missedDates.length - 1 === dateArrayIndex ? dateArrayIndex : dateArrayIndex + 1)
          );
          navigate(`/postNoCheckin/${id}`);
          dispatch(setLoader(false));
          toast.success("No Checkin Updated");
        }
      })
      .catch((err) => {
        dispatch(setLoader(false));
      })
      .finally(() => {
        dispatch(setPostLoading(false));
      });
  };
  /**
   * Cancel Handler
   **/
  const cancelHandler = () => {
    dispatch(setDispatchPK(null));
    dispatch(setSaveData(null));
    dispatch(resetUnitDetails());
    toast.success("Changes Cancelled");
    navigate(`/postNoCheckinHistory/${id}`);
  };

  /********** set saveData and Save Enable **********/
  useEffect(() => {
    // set saveData
    dispatch(
      setSaveData({
        dispatchFK: dispatchPK,
        driverFK: id,
        missedDate: selectedDate,
        companyName: companyName,
        notes: notes,
        userId: loginUserPK,
      })
    );
    if (dispatchPK && selectedDate && notes && !isInvalidDate && isDateInMissedList) {
      dispatch(setSaveDisable(false));
    } else {
      dispatch(setSaveDisable(true));
    }
  }, [dispatchPK, id, selectedDate, companyName, notes, isInvalidDate, isDateInMissedList]);

  useEffect(() => {
    getActiveDispatchForDriver(id);
    dispatch(setDriverFK(id));
  }, [pageNumberAdd, id]);
  /****Fetch the user data to display the current user Name */
  const fetchCurrentLoginUser = () => {
    DriverTMRLogsService.getCurrentLoginUser().then(({ data }) => {
      // DriverDeleaseRequestsService.getCurrentLoginUser().then(({ data }) => {
      dispatch(setLoginUserData(data));
      dispatch(setLoginUserPK(data.userPK));
    });
  };
  const handleChange = (date) => {
    setSelectedDate(date);
    setIsInvalidDate(false);
  };
  useEffect(() => {
    fetchCurrentLoginUser();
  }, []);
  useEffect(() => {
    const targetDate = dateArrayIndex >= 0 ? (missedDates?.[dateArrayIndex] ?? undefined) : undefined;
    if (dispatchPK && targetDate) {
      setNotes("");
      getNoCheckinRecord(id, dispatchPK, targetDate);
      // the record for this date is already being fetched, so the selectedDate effect must not fetch it again
      if (selectedDate !== targetDate) dateSetByIndexRef.current = targetDate;
      setSelectedDate(targetDate);
    }
  }, [dateArrayIndex, dispatchPK]);

  useEffect(() => {
    let isSetByIndex = false;
    if (selectedDate && dateSetByIndexRef.current !== null) {
      isSetByIndex = dateSetByIndexRef.current === selectedDate;
      dateSetByIndexRef.current = null;
    }
    if (!selectedDate) return;
    const dateToFind = parseLocalDate(selectedDate);
    if (isNaN(dateToFind.getTime())) return;
    if (!missedDates?.length) return;
    // Compare by local date only (year/month/day) to avoid time-portion mismatch
    // between DateInputField string values and missedDates Date objects from the backend
    const index = missedDates.findIndex((d) => {
      if (!d) return false;
      const missed = parseLocalDate(d);
      if (isNaN(missed.getTime())) return false;
      return (
        missed.getFullYear() === dateToFind.getFullYear() &&
        missed.getMonth() === dateToFind.getMonth() &&
        missed.getDate() === dateToFind.getDate()
      );
    });
    if (index !== -1) {
      setIsDateInMissedList(true);
      if (index === dateArrayIndex) {
        // dateArrayIndex won't change in Redux, so the other useEffect won't re-run —
        // trigger the API call directly here
        if (dispatchPK && missedDates[index] && !isSetByIndex) {
          setNotes("");
          getNoCheckinRecord(id, dispatchPK, missedDates[index]);
        }
      } else {
        dispatch(setDateArrayIndex(index));
      }
    } else {
      // Selected date is not in the missedDates list — clear notes and disable UI
      setIsDateInMissedList(false);
      setNotes("");
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!originalDate) return;

    const dateChanged =
      selectedDate && originalDate && parseLocalDate(selectedDate).getTime() !== parseLocalDate(originalDate).getTime();

    const notesChanged = notes !== originalNotes;

    setIsDirty(dateChanged || notesChanged);
  }, [selectedDate, notes, originalDate, originalNotes]);

  const paginationProps = {
    pageNumber: pageNumberAdd,
    setPageNumber: setPageNumberAdd,
    totalPages: totalPagesAdd,
    totalElements: totalElementsAdd,
    listingData: activeDispatchList,
  };

  return (
    <QuarterScreenWrapper>
      {notesLoading && <LoadingIcon />}
      <PostNoCheckinHeader isDirty={isDirty} />
      <div className="container-fluid table-bordered ">
        <Row style={{ height: "270px" }}>
          <div className="col-12 border border-dark border-2 border-top-0 border-right-0 border-bottom-1 px-0 p-r-0 p-l-0">
            <div className="d-flex h-100">
              <div className="w-100">
                <PostNoCheckinListing />
              </div>
              <PaginationComponent
                {...paginationProps}
                loading={unitsLoading}
                firstPage
                lastPage
                singleArrowUp
                singleArrowDown
                hideBorderRight
                hideBorderBottom
                hideBorderTop
                recordsPerPage={6}
              />
            </div>
          </div>
        </Row>
      </div>
      <div className="col-12 m-2 " style={{ height: "140px" }}>
        <div className="d-flex align-items-center mt-4">
          <div className="col-2 ps-2"> Date Missed</div>
          <div className="col-2" style={{ width: "95px" }}>
            {" "}
            <DateInputField
              date={selectedDate}
              setDate={setSelectedDate}
              setIsDateValid={(isValid) => setIsInvalidDate(!isValid)}
              className={`form-controlDriverService ${isInvalidDate ? "borderRed" : ""}`}
              disabled={!dispatchPK}
              value={selectedDate}
            />
          </div>
        </div>
        <div className="d-flex align-items-top mt-3">
          <div className="col-2 ps-2"> Notes</div>
          <div className="col-9">
            {" "}
            <textarea
              name="Nts"
              id="nts"
              rows="4"
              cols="120"
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
              disabled={!selectedDate || !isDateInMissedList}
              className={` customFormControl h-100 customFocusClass ${
                !selectedDate || !isDateInMissedList || notesLoading
                  ? ""
                  : !notes
                    ? "borderRed"
                    : "borderGreen"
              }`}
              autoComplete="new-password"
              aria-autocomplete="none"
            />
            {postLoading && (
              <div className="fade modal-backdrop show">
                <div className="pos-center">
                  <div className="loader"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <PostNoCheckinAddFooter saveButton saveHandler={saveHandler} cancelButton />
    </QuarterScreenWrapper>
  );
}

export default PostNoCheckin;
