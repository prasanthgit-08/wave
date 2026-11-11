import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setChangeColor,
  setChangesCancelled,
  setCheckRequestid,
  setDelayCheckRequestData,
  setDelayRequestRecord,
  setIsCancelledClicked,
  setSelectedId,
  setSortType,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayUnitCheckRequestSlice";
import DelayUnitCheckRequestService from "../../../../../services/DispatchDelay/DelayProcessing/DelayUnitCheckRequestService";

function TableListing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { id, driverfk } = useParams();
  const params = useParams();
  const [loader, setLoader] = useState(false);
  const searchTerm = useSelector((state) => state.delayCheckRequest.searchTerm);
  const searchCriteria = useSelector((state) => state.delayCheckRequest.searchCriteria);
  const delayCheckRequestData = useSelector((state) => state.delayCheckRequest.delayCheckRequestData);
  const pageNumber = useSelector((state) => state.delayCheckRequest.pageNumber);
  const totalPages = useSelector((state) => state.delayCheckRequest.totalPages);
  const totalElements = useSelector((state) => state.delayCheckRequest.totalElements);
  let sortValue = useSelector((state) => state.delayCheckRequest.sortValue);
  let sortType = useSelector((state) => state.delayCheckRequest.sortType);
  const selectedId = useSelector((state) => state.delayCheckRequest.selectedId);

  const onhandleNormalSort = (sortValue) => {
    dispatch(setSortValue(sortValue));
    dispatch(setSortType(!sortType));
  };
  /*****
   * Fetch the Driver Delease Request listing data
   * ****/
  const fetchTableData = () => {
    setLoader(true);
    DelayUnitCheckRequestService.getDelayUnitCheckRequest(
      searchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortType,
      id
    )
      .then((response) => {
        const { data } = response;
        const allRecords = data || [];
        const browseData = allRecords?.slice(0, -1); // All items except the last one
        const lastRecord = allRecords?.slice(-1)[0]; // Just the last item
        setLoading(false);
        dispatch(setDelayCheckRequestData(browseData));
        dispatch(setTotalElements(lastRecord.TotalElements));
        dispatch(setTotalPages(lastRecord.TotalPages));
        setLoader(false);
      })
      .catch((err) => {
        setLoading(false);
        setLoader(false);
      });
  };

  /****
   * Call the API to fetch the data from Delease Check Request
   ******/
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 100);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerm, pageNumber, sortValue, sortType, id]);

  return (
    <div className="fixTableHead">
      {loader && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600 col-6"
              onClick={() => {
                onhandleNormalSort("description", !sortType);
              }}
            >
              Description
              {sortType && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600 col-3 "
              onClick={() => {
                onhandleNormalSort("vCB", !sortType);
              }}
            >
              VCB
              {sortType && sortValue === "vCB" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "vCB" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? null
            : delayCheckRequestData?.length >= 1 &&
              delayCheckRequestData?.map((data) => (
                <tr
                  id="rowId"
                  key={data?.delayedUnitCheckRequestPK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setDelayRequestRecord(null));
                    dispatch(setViewDetail(true));
                    dispatch(setSelectedId(data?.delayedUnitCheckRequestPK));
                    dispatch(setCheckRequestid(data?.delayedUnitCheckRequestPK));
                    dispatch(setIsCancelledClicked(false));
                    setTimeout(() => {
                      navigate(
                        `/delay-unit-check-request-formcontent/${driverfk}/${id}/${data?.delayedUnitCheckRequestPK}`
                      );
                    }, 100);
                  }}
                  className={data?.delayedUnitCheckRequestPK === selectedId ? "tableSelected" : ""}
                >
                  <td className="f-w-600"> {data?.description} </td>

                  <td className="f-w-600"> {data?.vCB} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {loading
        ? ""
        : delayCheckRequestData?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
    </div>
  );
}

export default TableListing;
