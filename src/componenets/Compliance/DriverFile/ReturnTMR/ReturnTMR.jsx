import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoadingIcon from "../../../common/LoadingIcon";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { setPageNumber, setTotalElements, setTotalPages } from "../../../../redux/PaginationSlice";
import { customFormatDate } from "../../../../utils/validation/DateFormatUtils";
import { QUARTER_SCREEN_HEIGHT } from "../../../../constants/screenSizes";
import ReturnTMRService from "../../../../services/Compliance/ReturnTMRService";

const RECORDS_PER_PAGE = 8;

const ReturnTMR = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userID = loggedInUser?.userPK;

  const { pageNumber, totalPages, totalElements } = useSelector((state) => state.paginationReducer);

  const [returnTMRList, setReturnTMRList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [checkedIds, setCheckedIds] = useState([]);
  const [loader, setLoader] = useState(false);
  const [notes, setNotes] = useState("");

  const getRowId = (record, index) => record?.DriverTMRLogPK ?? record?.driverTMRLogPK ?? index;
  const getDescription = (record) => record?.Description ?? record?.description;
  const getDateDue = (record) => record?.DueDate ?? record?.DueDate;
  const getPeriod = (record) => record?.TMRPeriod ?? record?.TMRPeriod;

  const lastCheckedId = checkedIds?.[checkedIds.length - 1];
  const selectedRecord = returnTMRList?.find((record, index) => getRowId(record, index) === lastCheckedId);

  const isSaveDisabled = checkedIds?.length === 0;

  const handleCheck = (rowId, isChecked) => {
    setCheckedIds((previous) => (isChecked ? [...previous, rowId] : previous.filter((id) => id !== rowId)));
  };

  const fetchTableData = () => {
    setLoader(true);
    ReturnTMRService.fetchReturnTMR({
      process: "view",
      driverPK: Number(id),
      pageNumber: pageNumber,
      pageSize: RECORDS_PER_PAGE,
      driverTMRLogPKs: null,
      userFK: userID,
    })
      .then(({ data }) => {
        const records = Array.isArray(data) ? data : [];
        const paginationData = records.slice(records.length - 1);
        const browseData = records.slice(0, records.length - 1);
        setNotes("");

        setReturnTMRList(browseData);
        dispatch(setTotalPages(paginationData?.[0]?.TotalPages || 0));
        dispatch(setTotalElements(paginationData?.[0]?.TotalElements || 0));
      })
      .catch(() => {
        setReturnTMRList([]);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleSave = () => {
    setLoader(true);
    ReturnTMRService.fetchReturnTMR({
      process: "save",
      driverPK: Number(id),
      pageNumber: pageNumber,
      pageSize: RECORDS_PER_PAGE,
      driverTMRLogPKs: checkedIds?.join(","),
      userFK: userID,
    })
      .then(() => {
        setCheckedIds([]);
        setSelectedId(null);
        setNotes("");
        toast.success("Saved Successfully");

        fetchTableData();
      })
      .catch((err) => {
        setLoader(false);
        toast.error(err?.response?.data?.errorMsg || "Something went wrong!! Failed to save!!");
      });
  };

  const handleClose = () => {
    navigate(`/driver-maintenance-add/${id}/0`);
    toast.success("Page Closed");
  };

  useEffect(() => {
    dispatch(setPageNumber(0));
  }, [dispatch]);

  useEffect(() => {
    fetchTableData();
  }, [pageNumber]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: returnTMRList,
  };

  return (
    <div className="add-form-component p-0 customContainer">
      {loader && <LoadingIcon />}

      <div
        className="border border-dark border-2 quarterScreenWidth"
        style={{ margin: "1px", height: QUARTER_SCREEN_HEIGHT }}
      >
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
          <button
            className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 m-t-5 me-2"
            type="button"
            onClick={handleClose}
          >
            Close
          </button>
        </div>

        <div className="d-flex border border-1 border-dark" style={{ height: "320px" }}>
          <div className="flex-grow-1 fixTableHead">
            <table className="table table-striped f-w-600 mb-0">
              <thead>
                <tr disabled>
                  <th className="f-w-600 col-2">Returned</th>
                  <th className="f-w-600 col-6">Description</th>
                  <th className="f-w-600 col-2">TMR Period</th>
                  <th className="f-w-600 col-2">Date Due</th>
                </tr>
              </thead>

              <tbody>
                {returnTMRList?.map((record, index) => {
                  const rowId = getRowId(record, index);

                  return (
                    <tr
                      key={rowId}
                      className={selectedId === rowId ? "tableSelected" : ""}
                      onClick={() => {
                        setSelectedId(rowId);
                        setNotes(record?.Notes);
                      }}
                    >
                      <td className="f-w-600">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="returned"
                          checked={checkedIds?.includes(rowId)}
                          onChange={(e) => handleCheck(rowId, e.target.checked)}
                        />
                      </td>
                      <td className="f-w-600">{getDescription(record)}</td>
                      <td className="f-w-600">{getPeriod(record)}</td>
                      <td className="f-w-600">
                        {getDateDue(record) ? customFormatDate(getDateDue(record)) : ""}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {!loader && returnTMRList?.length === 0 && (
              <div className="noRecordsSmallerFont">No Records Available</div>
            )}
          </div>

          <PaginationComponent
            {...paginationProps}
            recordsPerPage={RECORDS_PER_PAGE}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
            hideBorderTop
            hideBorderBottom
            hideBorderRight
            loading={loader}
          />
        </div>

        <div className="p-2">
          <textarea
            id="notes"
            className={`customFormControl h-100 w-100 `}
            rows={5}
            cols={18}
            name="notes"
            type="text"
            value={notes}
            // value={getNotes(selectedRecord) || ""}
            disabled
            autoComplete="off"
            aria-autocomplete="list"
          />
        </div>
        <div className="d-flex align-items-center justify-content-end p-t-5 p-b-5 flex-wrap border-top border-dark border-2">
          <button
            className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 m-t-5 me-2"
            type="button"
            disabled={isSaveDisabled}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnTMR;
