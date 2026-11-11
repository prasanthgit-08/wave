import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import {
  setOpenBalanceSortFlag,
  setOpenBalanceSortValue,
  setOpenBalanceTotalElements,
  setOpenBalanceTotalPages,
} from "../../../../../redux/UnitStatus/UnitStatusSlice";
import UnitStatusService from "../../../../../services/Units/UnitStatusService";
import { useParams } from "react-router-dom";
import LoadingText from "../../../../common/LoadingText";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";

function OpenBalance({ data }) {
  const dispatch = useDispatch();
  const [unitOpenBalanceData, setUnitOpenBalanceData] = useState(data?.data || []);

  const { id } = useParams();
  const activeTab = useSelector((state) => state.unitStatusReducer.activeTab);

  const openBalanceSortFlag = useSelector((state) => state.unitStatusReducer.openBalanceSortFlag);
  const openBalanceSortValue = useSelector((state) => state.unitStatusReducer.openBalanceSortValue);
  const openBalancePageNumber = useSelector((state) => state.unitStatusReducer.openBalancePageNumber);
  const openBalanceTotalPages = useSelector((state) => state.unitStatusReducer.openBalanceTotalPages);
  const openBalanceTotalElements = useSelector((state) => state.unitStatusReducer.openBalanceTotalElements);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const [loading, setLoading] = useState(true);

  const onhandleNormalSort = (value, val) => {
    dispatch(setOpenBalanceSortFlag(val));
    dispatch(setOpenBalanceSortValue(value));
  };

  const getAllUnitNumbersList = () => {
    UnitStatusService.getUnitStatusDataForUnitLocation(
      id,
      "OpenBalance",
      openBalancePageNumber,
      11,
      openBalanceSortValue,
      openBalanceSortFlag
    )
      .then((response) => {
        const { data } = response;
        const listingData = data.filter((item) => item.Description && item.Amount);
        const paginationData = data.find((item) => item.Type === "Pagination");
        setUnitOpenBalanceData(listingData);
        if (paginationData) {
          dispatch(setOpenBalanceTotalElements(paginationData.TotalElements));
          dispatch(setOpenBalanceTotalPages(paginationData.TotalPages + 1));
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
    if (id && activeTab === "OpenBalance") {
      getAllUnitNumbersList();
    }
  }, [openBalancePageNumber, openBalanceSortValue, openBalanceSortFlag, activeTab]);

  return (
    <div className="p-1 ps-2">
      <Col xs={5}>
        <div className="d-flex h-430px">
          <div className="w-100 border border-2 border-dark">
            <div
              className="fixTableHead unitSelection"
              style={{
                maxHeight: "415px", // Fixed height for table container
                overflowY: "auto", // Enable vertical scrolling
                overflowX: "hidden", // Prevent horizontal scrolling
              }}
            >
              <table className="table table-striped f-w-600">
                <thead>
                  <tr>
                    <th
                      className="f-w-600 col-6"
                      onClick={() => {
                        onhandleNormalSort("Description", !openBalanceSortFlag);
                      }}
                    >
                      Description{" "}
                      {openBalanceSortFlag && openBalanceSortValue === "Description" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!openBalanceSortFlag && openBalanceSortValue === "Description" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("Amount", !openBalanceSortFlag);
                      }}
                    >
                      Amount{" "}
                      {openBalanceSortFlag && openBalanceSortValue === "Amount" && (
                        <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!openBalanceSortFlag && openBalanceSortValue === "Amount" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    unitOpenBalanceData?.length > 0 &&
                    unitOpenBalanceData?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.Description}</td>
                        <td>{item.Amount || "-"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {loading && <LoadingText smallerFont />}
              {!loading && unitOpenBalanceData?.length === 0 && <NoRecordsMessage />}
            </div>
          </div>
          {/* <PaginationComponent
            {...paginationProps}
            recordsPerPage={EditMasterUnitSelection_RecordsPerPage}
            doubleArrowUp
            doubleArrowDown
            singleArrowUp
            singleArrowDown
          /> */}
        </div>
      </Col>
    </div>
  );
}

export default OpenBalance;
