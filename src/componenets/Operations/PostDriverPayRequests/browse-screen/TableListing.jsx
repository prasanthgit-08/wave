import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedId,
  setViewDetail,
  setNormalSortValue,
  setNormalSortFlag,
  setListingData,
  setTotalElements,
  setTotalPages,
  setNavigateToMainPage,
} from "../../../../redux/PostPayRequestSlice";
import { useNavigate } from "react-router-dom";
import PostpayRequestService from "../../../../services/PostpayRequestService";
import { customFormatDate } from "../../../../utils/validation/DateFormatUtils";
import LoadingText from "../../../common/LoadingText";

const TableListing = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const selectedId = useSelector((state) => state.postPayRequestSlice.selectedId);
  const pageNumber = useSelector((state) => state.postPayRequestSlice.pageNumber);
  const searchCriteria = useSelector((state) => state.postPayRequestSlice.searchCriteria);
  const sortType = useSelector((state) => state.postPayRequestSlice.sortType);
  const searchTerms = useSelector((state) => state.postPayRequestSlice.searchTerm);
  const pageSize = useSelector((state) => state.postPayRequestSlice.pageSize);
  const normalSortValue = useSelector((state) => state.postPayRequestSlice.normalSortValue);
  const normalSortFlag = useSelector((state) => state.postPayRequestSlice.normalSortFlag);
  const listingData = useSelector((state) => state.postPayRequestSlice.listingData);

  const fetchDriverPayRequests = () => {
    setLoading(true);
    PostpayRequestService.getDriverPayRequests(
      pageNumber,
      normalSortValue,
      normalSortFlag,
      searchCriteria,
      searchTerms
    )
      .then((response) => {
        const { data } = response;
        const browseData = data?.slice(0, data?.length - 1);
        const pagination = data?.slice(data?.length - 1);
        setData(response.data);
        dispatch(setListingData(browseData || []));
        dispatch(setTotalPages(pagination[0]?.TotalPages));
        dispatch(setTotalElements(pagination[0]?.TotalElements));
      })
      .catch((error) => {
        console.error("Error fetching driver pay requests:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchDriverPayRequests();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [pageNumber, searchCriteria, searchTerms, normalSortValue, normalSortFlag]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600 col-3"
              onClick={() => {
                onhandleNormalSort("DriverName", !normalSortFlag);
              }}
            >
              Driver
              {normalSortFlag && normalSortValue === "DriverName" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "DriverName" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-3"
              onClick={() => {
                onhandleNormalSort("UnitNumber", !normalSortFlag);
              }}
            >
              Unit Number
              {normalSortFlag && normalSortValue === "UnitNumber" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "UnitNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-3"
              onClick={() => {
                onhandleNormalSort("Amount", !normalSortFlag);
              }}
            >
              Amount
              {normalSortFlag && normalSortValue === "Amount" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "Amount" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-3"
              onClick={() => {
                onhandleNormalSort("DateEntered", !normalSortFlag);
              }}
            >
              Date Entered
              {normalSortFlag && normalSortValue === "DateEntered" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "DateEntered" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading && listingData && listingData.length > 0
            ? listingData.map((data) => (
                <tr
                  key={data.DriverPayRequestsPK}
                  onClick={() => dispatch(setSelectedId(null))}
                  onDoubleClick={() => {
                    dispatch(setSelectedId(data.DriverPayRequestsPK));
                    dispatch(setViewDetail(true));
                    dispatch(setNavigateToMainPage(false));
                    setTimeout(() => {
                      navigate(`/post-driver-pay-requests/${data.DriverPayRequestsPK}`);
                    }, 100);
                  }}
                  className={data.DriverPayRequestsPK === selectedId ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{data.DriverName}</td>
                  <td className="f-w-600">{data.UnitNumber || ""}</td>
                  <td className="f-w-600">{data.Amount}</td>
                  <td className="f-w-600">{customFormatDate(data.DateEntered)}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>

      <div className="table-message">
        {loading ? (
          <LoadingText />
        ) : listingData.length === 0 ? (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        ) : null}
      </div>
    </div>
  );
};

export default TableListing;
