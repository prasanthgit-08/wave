import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "react-bootstrap";

import UnitStatusService from "../../../../../services/Units/UnitStatusService";
import { t } from "i18next";
import {
  setUnitRoutePageNumber,
  setUnitRouteSortType,
  setUnitRouteSortValue,
  setUnitRouteTotalElements,
  setUnitRouteTotalPages,
} from "../../../../../redux/UnitStatus/UnitStatusSlice";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";
import LoadingText from "../../../../common/LoadingText";

function UnitRoutes({ data }) {
  const dispatch = useDispatch();

  const unitRoutePageNumber = useSelector((state) => state.unitStatusReducer.unitRoutePageNumber);
  const unitRouteTotalElements = useSelector((state) => state.unitStatusReducer.unitRouteTotalElements);
  const unitRouteTotalPages = useSelector((state) => state.unitStatusReducer.unitRouteTotalPages);
  const [unitRouteListingData, setUnitRouteListingData] = useState(data?.data || []);

  const unitRouteSortType = useSelector((state) => state.unitStatusReducer.unitRouteSortType);
  const unitRouteSortValue = useSelector((state) => state.unitStatusReducer.unitRouteSortValue);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const activeTab = useSelector((state) => state.unitStatusReducer.activeTab);
  const [loading, setLoading] = useState(true);

  const fetchTableData = () => {
    UnitStatusService.getUnitStatusUnitRouteData(
      selectedId,
      "UnitRoute",
      unitRoutePageNumber,
      14,
      unitRouteSortType,
      unitRouteSortValue
    )
      .then((response) => {
        const { data } = response;

        // Separate the listing data and pagination metadata
        const listingData = data.filter((item) => item.Name && item.City && item.StateCode && item.Location);
        const paginationData = data.find((item) => item.Type === "Pagination");

        // Dispatch listing data
        setUnitRouteListingData(listingData);

        // Dispatch pagination metadata
        if (paginationData) {
          dispatch(setUnitRouteTotalElements(paginationData.TotalElements));
          dispatch(setUnitRouteTotalPages(paginationData.TotalPages));
          dispatch(setUnitRoutePageNumber(paginationData.PageNumber));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setUnitRouteSortValue(value));

    dispatch(setUnitRouteSortType(val));
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      if (activeTab === "UnitRoute") {
        fetchTableData();
      }
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [unitRoutePageNumber, unitRouteSortType, unitRouteSortValue, selectedId, activeTab]);

  const paginationProps = {
    pageNumber: unitRoutePageNumber,
    setPageNumber: setUnitRoutePageNumber,
    totalPages: unitRouteTotalPages,
    totalElements: unitRouteTotalElements,
    listingData: unitRouteListingData,
  };

  return (
    <div className="p-1 ps-2">
      <Col xs={6}>
        <div className="d-flex h-100">
          <div className="w-100 border border-2 border-dark">
            <div className=" fixTableHead h-550px">
              <table className="table table-striped f-w-600">
                <thead>
                  <tr>
                    <th
                      onClick={() => {
                        onhandleNormalSort("name", !unitRouteSortType);
                      }}
                      className="f-w-600"
                    >
                      Name
                      {unitRouteSortType && unitRouteSortValue === "name" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!unitRouteSortType && unitRouteSortValue === "name" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      onClick={() => {
                        onhandleNormalSort("city", !unitRouteSortType);
                      }}
                      className="f-w-600"
                    >
                      City
                      {unitRouteSortType && unitRouteSortValue === "city" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!unitRouteSortType && unitRouteSortValue === "city" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      onClick={() => {
                        onhandleNormalSort("stateCode", !unitRouteSortType);
                      }}
                      className="f-w-600"
                    >
                      State
                      {unitRouteSortType && unitRouteSortValue === "stateCode" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!unitRouteSortType && unitRouteSortValue === "stateCode" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      onClick={() => {
                        onhandleNormalSort("location", !unitRouteSortType);
                      }}
                      className="f-w-600"
                    >
                      Location
                      {unitRouteSortType && unitRouteSortValue === "location" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!unitRouteSortType && unitRouteSortValue === "location" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    unitRouteListingData?.length > 0 &&
                    unitRouteListingData.map((unit, index) => (
                      <tr key={index}>
                        <td>{unit.Name}</td>
                        <td>{unit.City}</td>
                        <td>{unit.StateCode}</td>
                        <td>{unit.Location}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {loading && <LoadingText smallerFont />}
              {!loading && unitRouteListingData?.length === 0 && <NoRecordsMessage />}
            </div>
          </div>
          <PaginationComponent
            {...paginationProps}
            recordsPerPage={10}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
          />
        </div>
      </Col>
    </div>
  );
}

export default UnitRoutes;
