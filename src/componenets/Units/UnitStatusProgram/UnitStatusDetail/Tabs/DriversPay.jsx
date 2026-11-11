import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { EditMasterUnitSelection_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import { setPageNumber } from "../../../../../redux/CustomerPlantSearchFilterSlice";
import { Col } from "react-bootstrap";
import {
  setDriversPayPageNumber,
  setDriversPaySortFlag,
  setDriversPaySortValue,
  setDriversPayTotalElements,
  setDriversPayTotalPages,
} from "../../../../../redux/UnitStatus/UnitStatusSlice";
import UnitStatusService from "../../../../../services/Units/UnitStatusService";
import { useParams } from "react-router-dom";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";
import LoadingText from "../../../../common/LoadingText";

function DriversPay({ data }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const activeTab = useSelector((state) => state.unitStatusReducer.activeTab);
  const [unitDriversPayData, setUnitDriversPayData] = useState(data?.data || []);
  const driversPayPageNumber = useSelector((state) => state.unitStatusReducer.driversPayPageNumber);
  const driversPayTotalPages = useSelector((state) => state.unitStatusReducer.driversPayTotalPages);
  const driversPayTotalElements = useSelector((state) => state.unitStatusReducer.driversPayTotalElements);
  const driversPaySortFlag = useSelector((state) => state.unitStatusReducer.driversPaySortFlag);
  const driversPaySortValue = useSelector((state) => state.unitStatusReducer.driversPaySortValue);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const [loading, setLoading] = useState(true);
  const paginationProps = {
    pageNumber: driversPayPageNumber,
    setPageNumber: setDriversPayPageNumber,
    totalPages: driversPayTotalPages,
    totalElements: driversPayTotalElements,
    listingData: unitDriversPayData,
  };
  const onhandleNormalSort = (value, val) => {
    dispatch(setDriversPaySortFlag(val));
    dispatch(setDriversPaySortValue(value));
  };

  const getAllUnitNumbersList = () => {
    UnitStatusService.getUnitStatusDataForOpenBalance(
      id,
      "DriversPay",
      driversPayPageNumber,
      14,
      driversPaySortValue,
      driversPaySortFlag
    )
      .then((response) => {
        const { data } = response;
        const listingData = data.filter((item) => item.Type !== "Pagination");
        const paginationData = data.find((item) => item.Type === "Pagination");
        setUnitDriversPayData(listingData);
        if (paginationData) {
          dispatch(setDriversPayTotalElements(paginationData.TotalElements));
          dispatch(setDriversPayTotalPages(paginationData.TotalPages));
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id && activeTab === "DriversPay") {
      getAllUnitNumbersList();
    }
  }, [driversPayPageNumber, driversPaySortValue, driversPaySortFlag, activeTab]);

  return (
    <div className="p-1 ps-2">
      <Col xs={12}>
        <div className="d-flex h-550px mt-5" style={{ marginLeft: "40px", marginRight: "40px" }}>
          <div className="w-100 border border-2 border-dark">
            <div className="fixTableHead unitSelection">
              <table className="table table-striped f-w-600">
                <thead>
                  <tr disabled>
                    <th
                      className="f-w-600 col-3"
                      onClick={() => {
                        onhandleNormalSort("Driver", !driversPaySortFlag);
                      }}
                    >
                      Driver{" "}
                      {driversPaySortFlag && driversPaySortValue === "Driver" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!driversPaySortFlag && driversPaySortValue === "Driver" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600 col-4"
                      onClick={() => {
                        onhandleNormalSort("Description", !driversPaySortFlag);
                      }}
                    >
                      Description{" "}
                      {driversPaySortFlag && driversPaySortValue === "Description" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!driversPaySortFlag && driversPaySortValue === "Description" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600 "
                      onClick={() => {
                        onhandleNormalSort("Source", !driversPaySortFlag);
                      }}
                    >
                      Source{" "}
                      {driversPaySortFlag && driversPaySortValue === "Source" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!driversPaySortFlag && driversPaySortValue === "Source" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600 col-2"
                      onClick={() => {
                        onhandleNormalSort("Amount", !driversPaySortFlag);
                      }}
                    >
                      {" "}
                      Amount{" "}
                      {driversPaySortFlag && driversPaySortValue === "Amount" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!driversPaySortFlag && driversPaySortValue === "Amount" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!loading &&
                    unitDriversPayData.length > 0 &&
                    unitDriversPayData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.Driver}</td>
                        <td>{item.Description}</td>
                        <td>{item.Source}</td>
                        <td>{item.Amount}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {loading && <LoadingText smallerFont />}
              {!loading && unitDriversPayData?.length === 0 && <NoRecordsMessage />}
            </div>
          </div>
          <PaginationComponent
            {...paginationProps}
            recordsPerPage={EditMasterUnitSelection_RecordsPerPage}
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

export default DriversPay;
