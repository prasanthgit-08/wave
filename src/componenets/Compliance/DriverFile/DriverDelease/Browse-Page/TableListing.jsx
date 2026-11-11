import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setChangeColor,
  setCompletedCheckFlag,
  setDriverDeleaseListingData,
  setEditFormData,
  setId,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../../redux/DriverDeleaseSlice";
import DriverDeleaseService from "../../../../../services/DriverDeleaseService";
import { t } from "i18next";
import { customFormatDate } from "../../../../../utils/validation/DateFormatUtils";
import LoadingIcon from "../../../../common/LoadingIcon";

const TableListing = ({ loading, setLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { driverId } = useParams();

  const [adSort] = useState(false);
  const pageNumber = useSelector((state) => state.driverDeleaseReducer.pageNumber);
  const searchTerms = useSelector((state) => state.driverDeleaseReducer.searchTerms);
  const searchCriteria = useSelector((state) => state.driverDeleaseReducer.searchCriteria);
  let sortValue = useSelector((state) => state.driverDeleaseReducer.sortValue);
  let sortFlag = useSelector((state) => state.driverDeleaseReducer.sortFlag);
  const driverDeleaseListingData = useSelector(
    (state) => state.driverDeleaseReducer.driverDeleaseListingData
  );
  const changeColor = useSelector((state) => state.driverDeleaseReducer.changeColor);
  const id = useSelector((state) => state.driverDeleaseReducer.id);

  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));
    dispatch(setSortFlag(val));
    sortValue = value;
    sortFlag = val;
  };
  /***Fetch the details of driver delease to display */
  const fetchDriverDeleaseData = () => {
    setLoading(true);
    DriverDeleaseService.getDriverDeleaseForDriver(
      searchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag,
      driverId
    )
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setDriverDeleaseListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })

      .catch((err) => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchDriverDeleaseData();
    }, 500);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerms, pageNumber, sortValue, sortFlag, driverId]);
  return (
    <>
      <div className="fixTableHead">
        {loading && <LoadingIcon />}
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                className="f-w-600"
                onClick={() => {
                  if (adSort === false) {
                    onhandleNormalSort("terminationDate", !sortFlag);
                  }
                }}
              >
                Delease Date
                {sortFlag && sortValue === "terminationDate" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "terminationDate" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  if (adSort === false) {
                    onhandleNormalSort("terminationReason", !sortFlag);
                  }
                }}
              >
                Reason
                {sortFlag && sortValue === "terminationReason" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "terminationReason" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          {
            <tbody>
              {loading
                ? null
                : driverDeleaseListingData.map((code) => (
                    <tr
                      id="rowId"
                      key={code.driverDeleasePK}
                      onClick={(e) => dispatch(setChangeColor(false))}
                      onDoubleClick={(event) => {
                        dispatch(setEditFormData(null));
                        dispatch(setId(code.driverDeleasePK));
                        dispatch(setChangeColor(true));
                        dispatch(setViewDetail(true));
                        dispatch(setCompletedCheckFlag(false));

                        setTimeout(() => {
                          navigate(`/driver-delease/${driverId}/${code.driverDeleasePK}`);
                        }, 100);
                      }}
                      className={code.driverDeleasePK === id && changeColor ? "tableSelected" : ""}
                    >
                      <td className="f-w-600">{customFormatDate(code.terminationDate)}</td>
                      <td className="f-w-600">{code.terminationReason}</td>
                    </tr>
                  ))}
            </tbody>
          }
        </table>
        {loading
          ? ""
          : driverDeleaseListingData.length === 0 && (
              <h2 className="empty-list" align="center">
                {t("AlternateContact.list.empty.message")}
              </h2>
            )}
      </div>
    </>
  );
};

export default TableListing;
