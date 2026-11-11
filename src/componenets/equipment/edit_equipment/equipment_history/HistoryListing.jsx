import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setListingHistoryData,
  setSortFlag,
  setSortFlagofHistory,
  setSortValue,
  setSortValueofHistory,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/EquipmentsSlice";
import EquipmentService from "../../../../services/EquipmentService";
import { useParams } from "react-router-dom";
import LoadingIcon from "../../../common/LoadingIcon";
//this file is for equipment history listing for future
function HistoryListing(props) {
  const { id } = useParams();

  const { loading, setLoading } = props;

  const listingHistoryData = useSelector((state) => state.equipmentReducer.listingHistoryData);
  const pageNumber = useSelector((state) => state.equipmentReducer.pageNumberHistory);
  const sortFlag = useSelector((state) => state.equipmentReducer.sortFlag);

  const sortValue = useSelector((state) => state.equipmentReducer.sortValue);

  const [adSort] = useState(false);

  const dispatch = useDispatch();

  const onhandleNormalSort = (sortValue, sortFlag) => {
    dispatch(setSortValue(sortValue));

    dispatch(setSortFlag(sortFlag));
  };

  const fetchTableData = () => {
    setLoading(true);
    EquipmentService.getEquipmentHistoryListing(pageNumber, sortValue, sortFlag, id)
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setListingHistoryData(response.data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    });

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [pageNumber, sortFlag]);

  return (
    <div className="fixTableHead">
      {loading && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr>
            <th
              className="f-w-600 col-4"

              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("driver", !sortFlag);
                }
              }}
            >
              Driver
              {sortFlag && sortValue === "driver" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "driver" && <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>

            <th
              className="f-w-600 col-4"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("unitNumber", !sortFlag);
                }
              }}
            >
              Unit Number
              {sortFlag && sortValue === "unitNumber" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "unitNumber" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th className="f-w-600 ">Checked out</th>
            <th className="f-w-600 ">Checked In</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? null
            : listingHistoryData?.length >= 1 &&
              listingHistoryData?.map((data) => (
                <tr>
                  <td className="f-w-600"> {data.driverName != null ? data.driverName : ""} </td>
                  <td className="f-w-600"> {data?.unitNumber} </td>
                  <td className="f-w-600">{data?.checkOutDate ? "Yes" : "No"}</td>
                  <td className="f-w-600">{data?.checkInDate ? "Yes" : "No"}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryListing;
