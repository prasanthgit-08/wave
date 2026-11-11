import { t } from "i18next";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetCloseChanges,
  setChangeColor,
  setDate,
  setListingData,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedId,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../../../../../redux/DispatchRestrictionsSlice";
import { useEffect } from "react";
import { customFormatDate } from "../../../../../../../../utils/validation/DateFormatUtils";
import DispatchRestrictionsService from "../../../../../../../../services/DispatchRestrictionsService";
import LoadingIcon from "../../../../../../../common/LoadingIcon";

const TableListing = ({ setLoading, loading }) => {
  const [adSort] = useState(false);
  const params = useParams();
  const driverId = params.driverId;

  const listingData = useSelector((state) => state.dispatchRestrictionsReducer.listingData);
  const searchTerm = useSelector((state) => state.dispatchRestrictionsReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.dispatchRestrictionsReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.dispatchRestrictionsReducer.pageNumber);
  const selectedId = useSelector((state) => state.dispatchRestrictionsReducer.selectedId);
  const changeColor = useSelector((state) => state.dispatchRestrictionsReducer.changeColor);
  let sortFlag = useSelector((state) => state.dispatchRestrictionsReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.dispatchRestrictionsReducer.normalSortValue);
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchTableDatas = () => {
    setLoading(true);
    DispatchRestrictionsService.fetchDispatchRestrictionsData(
      searchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag,
      driverId
    )
      .then((response) => {
        const { data } = response;

        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchTableDatas();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerm, pageNumber, sortFlag, sortValue]);

  useEffect(() => {
    if (listingData !== null) {
      dispatch(setListingData(listingData));
    }
  }, [listingData, pageNumber, sortFlag]);

  useEffect(() => {
    dispatch(resetCloseChanges());
  }, []);

  return (
    <div className="fixTableHead">
      {loading && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              onClick={() => {
                onhandleNormalSort("dealerName", !sortFlag);
              }}
              className="f-w-600 col-3"
            >
              Dealer
              {sortFlag && sortValue === "dealerName" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "dealerName" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              onClick={() => {
                onhandleNormalSort("customerName", !sortFlag);
              }}
              className="f-w-600 col-3"
            >
              Customer
              {sortFlag && sortValue === "customerName" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "customerName" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              onClick={() => {
                onhandleNormalSort("stateCode", !sortFlag);
              }}
              className="f-w-600 col-3"
            >
              State
              {sortFlag && sortValue === "stateCode" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "stateCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              onClick={() => {
                onhandleNormalSort("specialCodeName", !sortFlag);
              }}
              className="f-w-600 col-3"
            >
              Special Code
              {sortFlag && sortValue === "specialCodeName" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "specialCodeName" && (
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
                  key={data.driverDispatchRestrictionPK}
                  onClick={() => dispatch(setChangeColor(false))}
                  onDoubleClick={() => {
                    dispatch(setSelectedId(data.driverDispatchRestrictionPK));
                    dispatch(setViewDetail(true));

                    dispatch(setChangeColor(true));
                    setTimeout(() => {
                      navigate(`/dispatch-restrictions-view/${driverId}/${data.driverDispatchRestrictionPK}`);
                    }, 100);
                  }}
                  className={`${data.driverDispatchRestrictionPK === selectedId && changeColor ? "tableSelected" : ""} `}
                >
                  <td className="f-w-600">{data.dealerName}</td>
                  <td className="f-w-600">{data.customerName}</td>
                  <td className="f-w-600">{data.stateCode}</td>

                  <td className="f-w-600">{data.specialCodeName}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {!loading && listingData?.length === 0 && (
        <h2 className="empty-list" align="center">
          {t("dealers.list.empty.message")}
        </h2>
      )}
    </div>
  );
};

export default TableListing;
