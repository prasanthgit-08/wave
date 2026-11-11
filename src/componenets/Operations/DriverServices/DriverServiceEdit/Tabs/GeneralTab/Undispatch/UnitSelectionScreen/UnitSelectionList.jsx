import { parseLocalDate } from "../../../../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UndispatchService from "../../../../../../../../services/UndispatchService";
import {
  setBrowseData,
  setBrowseFlag,
  setDispatchDate,
  setDriverName,
  setDriverPhone,
  setPageNumber,
  setSelectedDispatch,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../../../../../redux/UndispatchSlice";
import LoadingText from "../../../../../../../common/LoadingText";
import { joinString, strSeparator } from "../../../../../../../../utils/utils";
const UnitSelectionList = () => {
  const dispatch = useDispatch();
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [numberOfElements, setNumberOfElements] = useState(null);
  const sortFlag = useSelector((state) => state.undispatchReducer.sortFlag);
  const sortValue = useSelector((state) => state.undispatchReducer.sortValue);
  const browseData = useSelector((state) => state.undispatchReducer.browseData);
  const pageNumber = useSelector((state) => state.undispatchReducer.pageNumber);
  const selectedDispatch = useSelector((state) => state.undispatchReducer.selectedDispatch);
  const browseFlag = useSelector((state) => state.undispatchReducer.browseFlag);
  const driverName = useSelector((state) => state.undispatchReducer.driverName);
  const { driverId } = useParams();

  const fetchUnitSelectionList = () => {
    dispatch(setBrowseFlag(true));

    UndispatchService.getUnitSelectionBrowseData(driverId, pageNumber, 11, sortValue, sortFlag)
      .then((response) => {
        const data = response.data;
        // Listing rows
        const listingData = data.filter((item) => !item.Type);
        dispatch(setBrowseData(listingData));

        // Pagination
        const paginationData = data.find((item) => item.Type === "Pagination");

        if (paginationData) {
          dispatch(setTotalElements(paginationData.TotalElements));
          dispatch(setTotalPages(paginationData.TotalPages));
          setIsFirstPage(paginationData.First);
          setIsLastPage(paginationData.Last);
          setNumberOfElements(paginationData.NumberOfElements);
        }

        dispatch(setBrowseFlag(false));
      })
      .catch((error) => {
        console.error("API error:", error);
        dispatch(setBrowseFlag(false));
      });
  };

  useEffect(() => {
    fetchUnitSelectionList();
  }, [pageNumber, sortValue, sortFlag]);
  const handleNormalSort = (val, data) => {
    dispatch(setSortValue(val));
    dispatch(setSortFlag(data));
  };

  return (
    <div className="fixTableHead">
      <div>
        <table className="table table-striped f-w-600 ">
          <thead>
            <tr>
              <th
                className="f-w-600"
                onClick={() => {
                  handleNormalSort("UnitNumber", !sortFlag);
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

              <th
                className="f-w-600"
                onClick={() => {
                  handleNormalSort("DispatchDate", !sortFlag);
                }}
              >
                Dispatch Date
                {sortFlag && sortValue === "DispatchDate" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "DispatchDate" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  handleNormalSort("Pickup", !sortFlag);
                }}
              >
                Pickup
                {sortFlag && sortValue === "Pickup" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "Pickup" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  handleNormalSort("Delivery", !sortFlag);
                }}
              >
                Delivery
                {sortFlag && sortValue === "Delivery" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "Delivery" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {!browseFlag &&
              browseData?.map((item, index) => (
                <tr
                  id="rowId"
                  key={index}
                  className={selectedDispatch === item.DispatchPK ? "tableSelected" : ""}
                  onClick={() => {
                    dispatch(setSelectedDispatch(item.DispatchPK));
                    dispatch(setDriverName(item.DriverName));
                    dispatch(setDriverPhone(item.CellPhone));
                    dispatch(setDispatchDate(item.DispatchDate));
                  }}
                >
                  <td className="f-w-600"> {item?.UnitNumber} </td>
                  <td className="f-w-600">
                    {item?.DispatchDate
                      ? parseLocalDate(item.DispatchDate).toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "2-digit",
                        })
                      : ""}
                  </td>{" "}
                  <td className="f-w-600">
                    {joinString(
                      strSeparator(", "),
                      item?.PickupCity,
                      item?.PickupStateCode,
                      item?.PickupPostalCode
                    )}
                  </td>
                  <td className="f-w-600">
                    {joinString(
                      strSeparator(", "),
                      item?.DeliveryCity,
                      item?.DeliveryStateCode,
                      item?.DeliveryPostalCode
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {browseData?.length === 0 && !browseFlag && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )}

        {browseFlag && <LoadingText />}
      </div>
    </div>
  );
};

export default UnitSelectionList;
