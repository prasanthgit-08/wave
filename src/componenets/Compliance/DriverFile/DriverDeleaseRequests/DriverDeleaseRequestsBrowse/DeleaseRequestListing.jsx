import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setChangeColor,
  setDeleaseRequestData,
  setDisableDeleaseButton,
  setEditFormData,
  setId,
  setIsDeleaseProcess,
  setIsDoubleClick,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../../redux/DriverDeleaseRequestsSlice";
import DriverDeleaseRequestsService from "../../../../../services/DriverDeleaseRequestsService";
import { customFormatDate } from "../../../../../utils/validation/DateFormatUtils";
import LoadingIcon from "../../../../common/LoadingIcon";

const DeleaseRequestListing = ({ loading, setLoading }) => {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { driverId } = useParams();
  const pageNumber = useSelector((state) => state.driverDeleaseRequestsReducer.pageNumber);
  const totalElements = useSelector((state) => state.driverDeleaseRequestsReducer.totalElements);
  const totalPages = useSelector((state) => state.driverDeleaseRequestsReducer.totalPages);
  const deleaseRequestData = useSelector((state) => state.driverDeleaseRequestsReducer.deleaseRequestData);
  const searchTerms = useSelector((state) => state.driverDeleaseRequestsReducer.searchTerms);
  const selectedSearchCriteria = useSelector(
    (state) => state.driverDeleaseRequestsReducer.selectedSearchCriteria
  );
  const statusType = useSelector((state) => state.driverDeleaseRequestsReducer.statusType);
  let sortValue = useSelector((state) => state.driverDeleaseRequestsReducer.sortValue);
  let sortFlag = useSelector((state) => state.driverDeleaseRequestsReducer.sortFlag);
  const id = useSelector((state) => state.driverDeleaseRequestsReducer.id);
  const changeColor = useSelector((state) => state.driverDeleaseRequestsReducer.changeColor);

  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));
    dispatch(setSortFlag(val));

    /****Sorting logic****/
    let sortedData = [...deleaseRequestData];
    if (value === "addUserFK") {
      /*****Sort by addUserName instead of addUserFK****/
      sortedData = sortedData.sort((a, b) => {
        if (val) {
          /***Ascending order***/
          return a.addUserName.localeCompare(b.addUserName);
        } else {
          /***Descending order***/
          return b.addUserName.localeCompare(a.addUserName);
        }
      });
    } else if (value === "addDate") {
      /*****Sort by addUserName instead of addUserFK*****/
      sortedData = sortedData.sort((a, b) => {
        if (val) {
          /**Ascending order**/
          return a.addDate.localeCompare(b.addDate);
        } else {
          /**Descending order**/
          return b.addDate.localeCompare(a.addDate);
        }
      });
    }
    /**iF using Redux or local state to update the sorted data**/
    dispatch(setDeleaseRequestData(sortedData));
    /**Optionally, you can also set these locally if needed**/
    sortValue = value;
    sortFlag = val;
  };

  /****API call to fetch the driver delease request list****/
  const fetchData = () => {
    setLoading(true);
    DriverDeleaseRequestsService.getAllDriverDeleaseForMaintenance(
      searchTerms,
      statusType,
      pageNumber,
      selectedSearchCriteria,
      driverId
    )
      .then((response) => {
        const { data } = response;
        setLoader(false);
        dispatch(setDeleaseRequestData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoader(false);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    /**Always call fetchData when dependencies change**/
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchData();
    }, 500);
    /**Clear timeout when unmounting or before the next effect runs**/
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerms, statusType, pageNumber, selectedSearchCriteria, driverId]);

  /*******Determine the status of the Delease Request Record*****/
  const getStatus = (item) => {
    if (!item.reviewed && !item.processed) {
      return "New";
    } else if (item.reviewed && !item.processed && !item.canceled) {
      return "Pending";
    } else if (item.reviewed && item.processed) {
      return "Processed";
    } else if (item.reviewed && item.canceled) {
      return "Canceled";
    } else {
      return "";
    }
  };
  return (
    <div className="fixTableHead">
      {loading && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("addDate", !sortFlag);
              }}
            >
              Request Date
              {sortFlag && sortValue === "addDate" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "addDate" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("addUserFK", !sortFlag);
              }}
            >
              Request User
              {sortFlag && sortValue === "addUserFK" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "addUserFK" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th className="f-w-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {loader
            ? null
            : deleaseRequestData.map((item) => (
                <tr
                  id="rowId"
                  key={item.driverDeleaseRequestPK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setEditFormData(null));
                    dispatch(setId(item.driverDeleaseRequestPK));
                    dispatch(setChangeColor(true));
                    dispatch(setViewDetail(true));
                    dispatch(setIsDeleaseProcess(false));
                    dispatch(setDisableDeleaseButton(false));
                    dispatch(setIsDoubleClick(true));
                    setTimeout(() => {
                      navigate(`/driver-delease-requests/${driverId}/${item.driverDeleaseRequestPK}`);
                    }, 100);
                  }}
                  className={item.driverDeleaseRequestPK === id && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{customFormatDate(item.addDate)} </td>
                  <td className="f-w-600">{item.addUserName} </td>
                  <td className="f-w-600">{getStatus(item)}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader
        ? ""
        : deleaseRequestData.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
    </div>
  );
};

export default DeleaseRequestListing;
