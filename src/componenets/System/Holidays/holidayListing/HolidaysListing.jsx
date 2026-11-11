import { t } from "i18next";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { customFormatDate } from "../../../../utils/validation/DateFormatUtils";
import {
  setChangeColor,
  setDate,
  setListingData,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedId,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../redux/HolidaysSlice";
import moment from "moment/moment";
import HolidaysService from "../../../../services/HolidaysService";
import { useEffect } from "react";
import LoadingText from "../../../common/LoadingText";

const HolidaysListing = ({ setLoading, loading }) => {
  const [adSort] = useState(false);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  const listingData = useSelector((state) => state.holidaysReducer.listingData);
  const searchTerm = useSelector((state) => state.holidaysReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.holidaysReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.holidaysReducer.pageNumber);
  const selectedId = useSelector((state) => state.holidaysReducer.selectedId);
  const changeColor = useSelector((state) => state.holidaysReducer.changeColor);
  const holidayPK = useSelector((state) => state.holidaysReducer.holidayPK);
  let sortFlag = useSelector((state) => state.holidaysReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.holidaysReducer.normalSortValue);
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
    HolidaysService.getHolidayData(searchCriteria, searchTerm, pageNumber, sortValue, sortFlag)
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
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchTableDatas();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerm, pageNumber, sortFlag]);

  useEffect(() => {
    if (listingData !== null) {
      dispatch(setListingData(listingData));
    }
  }, [listingData, pageNumber, sortFlag]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowEmptyMessage(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              onClick={() => {
                onhandleNormalSort("date", !sortFlag);
              }}
              className="f-w-600"
            >
              Date
              {sortFlag && sortValue === "date" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "date" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>

            <th
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
              className="f-w-600"
            >
              Holiday
              {sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th className="f-w-600">
              US
              {sortFlag && sortValue === "us" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "us" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>

            <th className="f-w-600">
              Canadian
              {sortFlag && sortValue === "canadian" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "canadian" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? null
            : listingData.length >= 1
              ? listingData.map((data) => (
                  <tr
                    id="rowId"
                    key={data.holidayPK}
                    onClick={() => dispatch(setChangeColor(false))}
                    onDoubleClick={() => {
                      dispatch(
                        setDate({
                          date: "",
                          dateInput: "",
                          isDateValid: true,
                        })
                      );
                      dispatch(setSelectedId(data.holidayPK));
                      dispatch(setViewDetail(true));
                      dispatch(setChangeColor(true));
                      setTimeout(() => {
                        navigate(`/holidays-add/${data.holidayPK}/${pageNumber}`);
                      }, 100);
                    }}
                    className={`${data.holidayPK === selectedId && changeColor ? "tableSelected" : ""}`}
                  >
                    <td className="f-w-600">{customFormatDate(data.date)}</td>
                    <td className="f-w-600">{data.description}</td>
                    <td className="f-w-600">{data.us ? "Yes" : "No"}</td>
                    <td className="f-w-600">{data.canadian ? "Yes" : "No"}</td>
                  </tr>
                ))
              : null}
        </tbody>
      </table>

      {!loading && listingData?.length === 0 && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}

      {loading && <LoadingText />}
    </div>
  );
};

export default HolidaysListing;
