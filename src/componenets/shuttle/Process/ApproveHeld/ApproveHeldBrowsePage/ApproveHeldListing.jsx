import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setApproveHeldShuttleData,
  setId,
  setNormalSortFlag,
  setNormalSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../../redux/ApproveHeldSlice";
import ApproveHeldService from "../../../../../services/ApproveHeldService";
import { t } from "i18next";
import LoadingIcon from "../../../../common/LoadingIcon";

const ApproveHeldListing = ({ browseLoading, setBrowseLoading }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const pageNumber = useSelector((state) => state.approveHeldShuttleReducer.pageNumber);
  const searchCriteria = useSelector((state) => state.approveHeldShuttleReducer.searchCriteria);
  const id = useSelector((state) => state.approveHeldShuttleReducer.id);
  const approveHeldShuttleData = useSelector(
    (state) => state.approveHeldShuttleReducer.approveHeldShuttleData
  );
  const sortValue = useSelector((state) => state.approveHeldShuttleReducer.normalSortValue);
  const sortFlag = useSelector((state) => state.approveHeldShuttleReducer.normalSortFlag);

  const fetchApproveHeld = () => {
    setBrowseLoading(true);
    ApproveHeldService.getAllApproveHeld(searchCriteria, pageNumber, sortValue, sortFlag)
      .then(({ data }) => {
        const paginationInfo = data[data.length - 1]; // last element
        dispatch(setApproveHeldShuttleData(data.slice(0, -1)));
        dispatch(setTotalElements(paginationInfo.TotalElements));
        dispatch(setTotalPages(paginationInfo.TotalPages));
        setLoading(false);
        setBrowseLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setBrowseLoading(false);
      })
      .finally(() => {
        setBrowseLoading(false);
      });
  };

  useEffect(() => {
    setBrowseLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchApproveHeld();
    }, 500);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, pageNumber, sortValue, sortFlag]);

  const handleClick = (value) => {
    dispatch(setId(value));
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  return (
    <div>
      <div className="fixTableHead">
        {browseLoading && <LoadingIcon />}
        <table className="table  table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                className="f-w-600"
                onClick={() => {
                  onhandleNormalSort("driverName", !sortFlag);
                }}
              >
                Driver
                {sortFlag && sortValue === "driverName" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "driverName" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>

              <th
                className="f-w-600"
                onClick={() => {
                  onhandleNormalSort("pickUp", !sortFlag);
                }}
              >
                Pickup
                {sortFlag && sortValue === "pickUp" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "pickUp" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  onhandleNormalSort("delivery", !sortFlag);
                }}
              >
                Delivery
                {sortFlag && sortValue === "delivery" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "delivery" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? null
              : approveHeldShuttleData?.map((approve) => (
                  <tr
                    key={approve?.unitShuttlePK}
                    className={id === approve?.unitShuttlePK ? "tableSelected" : ""}
                    onClick={() => {
                      handleClick(approve?.unitShuttlePK);
                    }}
                  >
                    <td>{approve.driverName}</td>
                    <td>{approve.pickUp}</td>
                    <td>{approve.delivery}</td>
                  </tr>
                ))}
          </tbody>
        </table>
        {loading
          ? ""
          : approveHeldShuttleData?.length === 0 && (
              <h2 className="empty-list" align="center">
                {t("dealers.list.empty.message")}
              </h2>
            )}
      </div>
    </div>
  );
};
export default ApproveHeldListing;
