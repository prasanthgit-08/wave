import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

import TruncatedStringWithTooltip from "../../../../../common/TruncatedStringWithTooltip";
import {
  setBrowseList,
  setLoading,
  setSelectedDriverPK,
  setSortType,
  setSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../../../redux/Reports/AvailableDriversSlice";
import { setSelectedDriverId } from "../../../../../../redux/DealerDriverSearchSlice";
import AvailableDriverListService from "../../../../../../services/Reports/AvailableDriverListService";

const TableListing = () => {
  const {
    // Form fields passed to API

    sortType,
    sortValue,
    pageNumber,
    pageSize,
    totalPages,
    totalElements,
    selectedDriverPK,
    browseList,
    loading,
    browseFormData,
    driverDivision,
    option,
    dispatchUserId,
  } = useSelector((state) => state.availableDriversSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchBrowseData = async () => {
    dispatch(setLoading(true));

    try {
      const response = await AvailableDriverListService.avaialbleDriverListBrowse(
        driverDivision,
        option,
        dispatchUserId,
        pageNumber,
        pageSize,
        sortType,
        sortValue
      );

      if (response?.data) {
        dispatch(setBrowseList(response.data.drivers || []));

        const paginationData = response.data.pagination;

        if (paginationData) {
          dispatch(setTotalPages(paginationData[0]?.TotalPages));
          dispatch(setTotalElements(paginationData[0]?.TotalElements));
        }
      }
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchBrowseData();
  }, [driverDivision, option, dispatchUserId, pageNumber, pageSize, sortType, sortValue]);

  const handleRowClick = (row) => {
    dispatch(setSelectedDriverPK(row.DriverPK));
    //dispatch(setUnitAdditionalNotes(row.Notes ? row.Notes : ""));
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));
    dispatch(setSortType(val));
  };

  return (
    <div className="fixTableHead">
      {/* fixed layout so the header widths below are honoured instead of being sized by content */}
      <table className="table table-striped f-w-600" style={{ tableLayout: "fixed", width: "100%" }}>
        <thead>
          <tr disabled>
            <th
              onClick={() => onhandleNormalSort("Name", !sortType)}
              className="f-w-600"
              style={{ width: "16%" }}
            >
              Name
              {sortType && sortValue === "Name" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Name" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              onClick={() => onhandleNormalSort("State", !sortType)}
              style={{ width: "6%" }}
              className="f-w-600"
            >
              State
              {sortType && sortValue === "State" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "State" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              onClick={() => onhandleNormalSort("Rank", !sortType)}
              className="f-w-600"
              style={{ width: "6%" }}
            >
              Rank
              {sortType && sortValue === "Rank" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Rank" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              onClick={() => onhandleNormalSort("Cell Phone", !sortType)}
              className="f-w-600"
              style={{ width: "11%" }}
            >
              Cell Phone
              {sortType && sortValue === "Cell Phone" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Cell Phone" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => onhandleNormalSort("Last Disp", !sortType)}
              className="f-w-600"
              style={{ width: "12%" }}
            >
              Last Disp
              {sortType && sortValue === "Last Disp" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Last Disp" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => onhandleNormalSort("Available", !sortType)}
              className="f-w-600"
              style={{ width: "11%" }}
            >
              Available
              {sortType && sortValue === "Available" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Available" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => onhandleNormalSort("Passport", !sortType)}
              className="f-w-600"
              style={{ width: "5%" }}
            >
              Passport
              {sortType && sortValue === "Passport" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Passport" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              onClick={() => onhandleNormalSort("Loads", !sortType)}
              className="f-w-600"
              style={{ width: "6%" }}
            >
              Loads
              {sortType && sortValue === "Loads" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Loads" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              onClick={() => onhandleNormalSort("Entered", !sortType)}
              className="f-w-600"
              style={{ width: "6%" }}
            >
              Entered
              {sortType && sortValue === "Entered" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Entered" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              onClick={() => onhandleNormalSort("Comment", !sortType)}
              className="f-w-600"
              style={{ width: "19%" }}
            >
              Comment
              {sortType && sortValue === "Comment" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Comment" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            browseList?.map((row, index) => (
              <tr
                key={index}
                className={selectedDriverPK === row.DriverPK ? "tableSelected" : ""}
                onClick={() => handleRowClick(row)}
                onDoubleClick={(event) => {
                  setTimeout(() => {
                    navigate("/avaliable-driver-comments");
                  }, 100);
                }}
              >
                <td>
                  <TruncatedStringWithTooltip text={String(row.Name ?? "")} charLimit={15} />
                </td>
                <td className="f-w-600"> {row.State} </td>
                <td className="f-w-600"> {row.Rank} </td>
                <td className="f-w-600">{row["Cell Phone"] ?? ""}</td>
                <td className="f-w-600">{row["Last Disp"] ?? ""}</td>
                <td className="f-w-600"> {row.Available} </td>
                <td className="f-w-600"> {row.Passport} </td>
                <td className="f-w-600"> {row.Loads} </td>
                <td className="f-w-600"> {row.Entered} </td>

                <td>
                  <TruncatedStringWithTooltip text={String(row.Comment ?? "")} charLimit={7} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {!loading && browseList?.length === 0 && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}

      {loading && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableListing;
