import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setSearchTerm,
  setSearchCriteria,
  setListingData,
  setTotalElements,
  setTotalPages,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setPageNumber,
  setEditFormData,
  setViewDetail,
  setDriverFK,
  setDriverComplianceItemFK,
  setHistoryBlockReason,
  setChangeColorOfHistory,
  setNumber,
  setSortValue,
  setSortFlag,
  setDriverComplianceItemHistoryPK,
  setPageNumberOfdriver,
  setFormData,
} from "../../../../../redux/DriverComplianceItemsSlice";
import DriverComplianceItemsService from "../../../../../services/DriverComplianceItemsService";

function DriverComplianceListing(props) {
  const { loading, setLoading } = props;
  const { driverId, id } = useParams();
  const dispatch = useDispatch();
  const [hasLoaded, setHasLoaded] = useState(false);

  const listingData = useSelector((state) => state.DriverComplianceItemsReducer.listingData);
  const searchTerm = useSelector((state) => state.DriverComplianceItemsReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.DriverComplianceItemsReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.DriverComplianceItemsReducer.pageNumber);
  const selectedId = useSelector((state) => state.DriverComplianceItemsReducer.selectedId);
  const changeColor = useSelector((state) => state.DriverComplianceItemsReducer.changeColor);
  const selectedStatus = useSelector((state) => state.DriverComplianceItemsReducer.selectedStatus);
  const driverComplianceItemFK = useSelector(
    (state) => state.DriverComplianceItemsReducer.driverComplianceItemFK
  );

  const navigate = useNavigate();
  let sortFlag = useSelector((state) => state.DriverComplianceItemsReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.DriverComplianceItemsReducer.normalSortValue);
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;
  };

  const fetchDriverComplaintsData = () => {
    setLoading(true);
    DriverComplianceItemsService.fetchDriverComplianceItems(
      searchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag,
      driverId
    )
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setListingData(data.content));

        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((error) => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
        setHasLoaded(false);
      });
  };
  useEffect(() => {
    dispatch(setDriverFK(driverId)); // Dispatch the action to set the driverId
  }, [driverId, dispatch]);

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      setLoading(true);
      fetchDriverComplaintsData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, searchCriteria, pageNumber, selectedStatus, sortValue, sortFlag, driverId]);

  useEffect(() => {
    if (localStorage.getItem("driverComplianceFromDriver") === "true") {
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(false));
      dispatch(setChangeColorOfHistory(false));
      dispatch(setHistoryBlockReason(""));
      dispatch(setDriverComplianceItemHistoryPK(null));
      dispatch(setSearchTerm(""));
      dispatch(setSearchCriteria("Beginning"));
      dispatch(setPageNumber(0));
      dispatch(setNumber(0));
      dispatch(setChangeColorOfHistory(false));
    }
  }, []);

  useEffect(() => {
    dispatch(setChangeColorOfHistory(false));
    dispatch(setDriverComplianceItemHistoryPK(null));
    dispatch(setHistoryBlockReason(""));
    dispatch(setNumber(0));
    dispatch(setSortValue(null));
    dispatch(setSortFlag(false));
  }, []);
  useEffect(() => {
    const driverComplianceFromDriver = localStorage.getItem("driverComplianceFromDriver");
    if (driverComplianceFromDriver === "true") {
      const pageNumberForDriverComplianceItem = localStorage.getItem("pageNumberForDriverComplianceItem");
      if (pageNumberForDriverComplianceItem) {
        dispatch(setPageNumberOfdriver(pageNumberForDriverComplianceItem));
      }
    }
  }, [dispatch]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-500">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
            >
              Description{" "}
              {sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("driverDescription", !sortFlag);
              }}
            >
              Driver Description{" "}
              {sortFlag && sortValue === "driverDescription" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "driverDescription" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? ""
            : listingData.length >= 1 &&
              listingData.map((data) => (
                <tr
                  id="rowId"
                  key={data.driverComplianceItemPK}
                  onDoubleClick={() => {
                    dispatch(setChangeColor(true));
                    dispatch(setViewDetail(true));
                    dispatch(setDriverComplianceItemFK(data?.driverComplianceItemPK));
                    dispatch(setFormData([]));
                    setTimeout(() => {
                      navigate(`/driver-compliance-items-view/${driverId}/${data.driverComplianceItemPK}`);
                    }, 100);
                  }}
                  className={
                    data.driverComplianceItemPK === driverComplianceItemFK && changeColor
                      ? "tableSelected"
                      : ""
                  }
                >
                  <td className="f-w-600"> {data.description} </td>
                  <td className="f-w-600"> {data.driverDescription} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {loading
        ? ""
        : listingData.length === 0 && (
            <h2 className="empty-list" align="center">
              {t("dealers.list.empty.message")}
            </h2>
          )}

      {loading && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DriverComplianceListing;
