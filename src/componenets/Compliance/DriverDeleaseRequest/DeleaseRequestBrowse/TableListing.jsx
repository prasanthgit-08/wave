import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetDeleaseRequestBrowseData,
  setDeleaseRequestData,
  setDeleaserequestPK,
  setDriverId,
  setFlagStatus,
  setId,
  setReturnFromDelease,
  setSelectedId,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/Compliance/DriverDeleaseRequestSlice";
import DriverDeleaseRequestsService from "../../../../services/DriverDeleaseRequestsService";
import { customFormatDate } from "../../../../utils/validation/DateFormatUtils";
import toast from "react-hot-toast";

const TableListing = () => {
  //const loading=false;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const searchTerms = useSelector((state) => state.deleaseRequestReducer.searchTerms);
  const selectedSearchCriteria = useSelector((state) => state.deleaseRequestReducer.selectedSearchCriteria);
  const deleaseRequestData = useSelector((state) => state.deleaseRequestReducer.deleaseRequestData);
  const pageNumber = useSelector((state) => state.deleaseRequestReducer.pageNumber);
  const totalPages = useSelector((state) => state.deleaseRequestReducer.totalPages);
  const totalElements = useSelector((state) => state.deleaseRequestReducer.totalElements);
  let sortValue = useSelector((state) => state.deleaseRequestReducer.sortValue);
  let sortFlag = useSelector((state) => state.deleaseRequestReducer.sortFlag);
  const selectedId = useSelector((state) => state.deleaseRequestReducer.selectedId);
  const driverId = useSelector((state) => state.deleaseRequestReducer.driverId);
  const deleaserequestPK = useSelector((state) => state.deleaseRequestReducer.deleaserequestPK);
  const returnFromDelease = useSelector((state) => state.deleaseRequestReducer.returnFromDelease);
  const [hasUpdatedOnce, setHasUpdatedOnce] = useState(false);

  const onhandleNormalSort = (sortValue) => {
    dispatch(setSortValue(sortValue));
    dispatch(setSortFlag(!sortFlag));
  };

  /*****
   * Fetch the Driver Delease Request listing data
   *****/
  const fetchTableData = () => {
    DriverDeleaseRequestsService.getAllDriverDeleaseForCompliance(
      searchTerms,
      pageNumber,
      selectedSearchCriteria,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        const browseData = data.response.DeleaseRequestList;
        const pagination = data.response.PageDetails[0];
        setLoading(false);
        dispatch(setDeleaseRequestData(browseData));
        dispatch(setTotalElements(pagination.TotalElements));
        dispatch(setTotalPages(pagination.TotalPages));
      })
      .catch(() => setLoading(false));
  };

  /*****
   * Update record first when coming back from delease
   *****/
  useEffect(() => {
    if (returnFromDelease === true && !hasUpdatedOnce) {
      setLoading(true); //  show loader until update finishes
      setHasUpdatedOnce(true);
      DriverDeleaseRequestsService.updateDriverDeleaseRequest(deleaserequestPK)
        .then(() => {
          fetchTableData(); //  fetch after update
          dispatch(setReturnFromDelease(false)); // reset flag
        })
        .catch(() => {
          toast.error("Failed to update the Driver Delease Request");
          dispatch(setReturnFromDelease(false));
          setLoading(false);
        });
    }
  }, [returnFromDelease]);

  /*****
   * Normal fetch for initial load and filters, BUT skip if returning from delease
   *****/
  useEffect(() => {
    // Don’t run this if we’re currently handling the update-return flow
    if (returnFromDelease || (hasUpdatedOnce && loading)) return;
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 500);

    return () => clearTimeout(debounceFunction);
  }, [searchTerms, pageNumber, selectedSearchCriteria, sortValue, sortFlag]);

  return (
    <div className="fixTableHead">
      {loading && (
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
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("AddDate", !sortFlag);
              }}
            >
              Request Date
              {sortFlag && sortValue === "AddDate" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "AddDate" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th></th>
            <th
              className="f-w-600 col-5 "
              onClick={() => {
                onhandleNormalSort("DriverNamr");
              }}
            >
              Driver
              {sortFlag && sortValue === "DriverNamr" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "DriverNamr" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? null
            : deleaseRequestData?.length >= 1 &&
              deleaseRequestData?.map((data) => (
                <tr
                  id="rowId"
                  key={data.DriverDeleaseRequestPK}
                  onDoubleClick={() => {
                    dispatch(setSelectedId(data.DriverDeleaseRequestPK));
                    dispatch(setDeleaserequestPK(data.DriverDeleaseRequestPK));
                    dispatch(setDriverId(data.DriverFK));
                    dispatch(setFlagStatus("VIEW"));
                    setTimeout(() => {
                      navigate(`/driver-requestview/${data.DriverFK}/${data.DriverDeleaseRequestPK}`);
                    }, 100);
                  }}
                  className={data.DriverDeleaseRequestPK === selectedId ? "tableSelected" : ""}
                >
                  <td className="f-w-600"> {customFormatDate(data.AddDate)} </td>
                  <td></td>
                  <td className="f-w-600"> {data.DriverNamr} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {/* {loading
        ? ""
        : deleaseRequestData?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )} */}
      {!loading && deleaseRequestData?.length === 0 && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}
    </div>
  );
};

export default TableListing;
