import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  setNormalSortValue,
  setNormalSortFlag,
  setListingData,
  setTotalElements,
  setTotalPages,
  setChangeColor,
  setCheckinId,
  setViewDetail,
} from "../../../../../../../../redux/EditCheckinSlice";
import EditCheckinService from "../../../../../../../../services/EditCheckinService";
function TableListing({ unitNumber }) {
  const params = useParams();
  const driverId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const pageNumber = useSelector((state) => state.editCheckinReducer.pageNumber);
  const listingData = useSelector((state) => state.editCheckinReducer.listingData);
  const changeColor = useSelector((state) => state.editCheckinReducer.changeColor);
  const checkinId = useSelector((state) => state.editCheckinReducer.checkinId);

  let sortFlag = useSelector((state) => state.editCheckinReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.editCheckinReducer.normalSortValue);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;
  };

  const fetchEditCheckin = async () => {
    setLoading(true);
    try {
      const response = await EditCheckinService.getEditCheckinRecords(
        pageNumber,
        sortValue,
        sortFlag,
        driverId,
        unitNumber
      );
      const { data } = response;

      if (!data) {
        console.error("API response data is empty:", response);
        return;
      }

      const filteredList = data.filter((item) => item?.Type !== "Pagination");
      dispatch(setListingData(filteredList));

      const paginationData = data.find((item) => item?.Type === "Pagination");

      if (paginationData) {
        dispatch(setTotalElements(paginationData.TotalElements));
        dispatch(setTotalPages(paginationData.TotalPages));
      } else {
        console.error("Pagination data not found in API response:", response);
      }
    } catch (error) {
      console.error("Error fetching Edit Checkin records:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchEditCheckin();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [pageNumber, sortFlag, sortValue, unitNumber]);

  return (
    <div className="fixTableHead">
      <table className="table  table-striped">
        <thead>
          <tr disabled>
            <th
              className="f-w-600 col-3"
              onClick={() => {
                onhandleNormalSort("CheckInDate", !sortFlag);
              }}
            >
              Date & Time
              {sortFlag && sortValue === "CheckInDate" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "CheckInDate" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-3"
              onClick={() => {
                onhandleNormalSort("UnitNumber", !sortFlag);
              }}
            >
              Unit Number
              {sortFlag && sortValue === "UnitNumber" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "UnitNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th className="f-w-600 col-3">City, State</th>
            <th className="f-w-600 col-3">Entered By User</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? null
            : listingData.map((data) => (
                <tr
                  id="rowId"
                  key={data.DriverCheckInPK}
                  onClick={() => dispatch(setChangeColor(false))}
                  onDoubleClick={() => {
                    dispatch(setChangeColor(true));
                    dispatch(setCheckinId(data.DriverCheckInPK));
                    dispatch(setViewDetail(true));
                    setTimeout(() => {
                      navigate(`/edit-checkin-form/${driverId}/${data.DriverCheckInPK}`);
                    }, 100);
                  }}
                  className={`${data.DriverCheckInPK === checkinId && changeColor ? "tableSelected" : ""}`}
                >
                  <td className="f-w-600">
                    {data?.CheckInDate ? moment(data.CheckInDate).format("MM/DD/YY hh:mm:ss ") : ""}
                  </td>
                  <td className="f-w-600">{data.UnitNumber}</td>
                  <td className="f-w-600">{data.CityState}</td>
                  <td className="f-w-600">{data.EnteredByUser}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loading ? (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        !loading &&
        listingData?.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
}

export default TableListing;
