import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { customFormatDate } from "../../../../../utils/validation/DateFormatUtils";
import {
  setLocationPageNumber,
  setLocationSortFlag,
  setLocationSortValue,
  setLocationTotalPages,
  setTotalElements,
  setTotalPages,
} from "../../../../../redux/UnitStatus/UnitStatusSlice";
import UnitStatusService from "../../../../../services/Units/UnitStatusService";
import { t } from "i18next";
import { useParams } from "react-router-dom";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";
import LoadingText from "../../../../common/LoadingText";

function UnitLocation({ data }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [unitData, setUnitData] = useState(data?.data || []);
  const locationPageNumber = useSelector((state) => state.unitStatusReducer.locationPageNumber);
  const locationTotalPages = useSelector((state) => state.unitStatusReducer.locationTotalPages);

  const totalElements = useSelector((state) => state.unitStatusReducer.totalElements);

  const locationSortFlag = useSelector((state) => state.unitStatusReducer.locationSortFlag);

  const locationSortValue = useSelector((state) => state.unitStatusReducer.locationSortValue);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const activeTab = useSelector((state) => state.unitStatusReducer.activeTab);
  const [loading, setLoading] = useState(true);

  const onhandleNormalSort = (value, val) => {
    dispatch(setLocationSortFlag(val));

    dispatch(setLocationSortValue(value));
  };

  const getAllUnitNumbersList = () => {
    UnitStatusService.getUnitStatusDataForUnitLocation(
      id,
      "UnitLocations",
      locationPageNumber,
      14,
      locationSortValue,
      locationSortFlag
    )
      .then((response) => {
        const { data } = response;
        // const listingData = data.filter((item) => item.Name && item.City && item.StateCode && item.Location && item.UserName);
        const listingData = data.filter((item) => item.Type !== "Pagination");
        const paginationData = data.find((item) => item.Type === "Pagination");

        setUnitData(listingData);
        // Dispatch pagination metadata
        if (paginationData) {
          dispatch(setTotalElements(paginationData.TotalElements));
          dispatch(setLocationTotalPages(paginationData.TotalPages));
        }
      })
      .catch((error) => {
        // dispatch(setUnitsLoading(false));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id && activeTab === "UnitLocations") {
      getAllUnitNumbersList();
    }
  }, [locationPageNumber, locationSortValue, locationSortFlag, activeTab]);

  // Debugging the data structure

  const paginationProps = {
    pageNumber: locationPageNumber,
    setPageNumber: setLocationPageNumber,
    totalPages: locationTotalPages,
    totalElements: totalElements,
    listingData: unitData,
  };

  return (
    <div className="p-1 ps-2">
      <Col xs={8}>
        <div className="d-flex h-100  mt-2 ">
          <div className="w-100 border border-2 border-dark ">
            <div className=" fixTableHead h-550px">
              <table className="table table-striped f-w-600 ">
                <thead>
                  <tr>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("LocationDate", !locationSortFlag);
                      }}
                    >
                      Date{" "}
                      {locationSortFlag && locationSortValue === "LocationDate" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!locationSortFlag && locationSortValue === "LocationDate" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("Name", !locationSortFlag);
                      }}
                    >
                      Name{" "}
                      {locationSortFlag && locationSortValue === "Name" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!locationSortFlag && locationSortValue === "Name" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("City", !locationSortFlag);
                      }}
                    >
                      City{" "}
                      {locationSortFlag && locationSortValue === "City" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!locationSortFlag && locationSortValue === "City" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("StateCode", !locationSortFlag);
                      }}
                    >
                      State{" "}
                      {locationSortFlag && locationSortValue === "StateCode" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!locationSortFlag && locationSortValue === "StateCode" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("Location", !locationSortFlag);
                      }}
                    >
                      Location{" "}
                      {locationSortFlag && locationSortValue === "Location" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!locationSortFlag && locationSortValue === "Location" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("UserName", !locationSortFlag);
                      }}
                    >
                      User{" "}
                      {locationSortFlag && locationSortValue === "UserName" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!locationSortFlag && locationSortValue === "UserName" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    unitData?.length > 0 &&
                    unitData.map((item, index) => (
                      <tr key={index}>
                        <td>{customFormatDate(item.LocationDate)}</td>
                        <td>{item.Name}</td>
                        <td>{item.City}</td>
                        <td>{item.StateCode}</td>
                        <td>{item.Location}</td>
                        <td>{item.UserName}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {loading && <LoadingText smallerFont />}
              {!loading && unitData?.length === 0 && <NoRecordsMessage />}
            </div>
          </div>
          <PaginationComponent
            {...paginationProps}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
            recordsPerPage={14}
          />
        </div>
      </Col>
    </div>
  );
}

export default UnitLocation;
