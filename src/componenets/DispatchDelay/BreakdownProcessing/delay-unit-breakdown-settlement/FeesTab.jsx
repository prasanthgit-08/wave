import React, { useEffect, useState } from "react";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setFeeData,
  setGeneralTabFormData,
  setIsDataLoaded,
  setSortTypeFeeTab,
  setSortValueFeeTab,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/SettlementSlice";
import SettlementDelayService from "../../../../services/DispatchDelay/BreakdownProcessing/SettlementDelayService";
import { useParams } from "react-router-dom";

const FeesTab = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const params = useParams();
  const breakdownFK = params.breakdownFK;
  const delayedUnitPK = params.delayedUnitPK;
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");

  const sortValueFeeTab = useSelector((state) => state.settlementReducer.sortValueFeeTab);
  const sortTypeFeeTab = useSelector((state) => state.settlementReducer.sortTypeFeeTab);
  const pageNumber = useSelector((state) => state.settlementReducer.pageNumber);

  const feeData = useSelector((state) => state.settlementReducer.feeData);

  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValueFeeTab(value));
    dispatch(setSortTypeFeeTab(val));
  };

  const getFeeDelayDetails = () => {
    SettlementDelayService.getFeesDetailsForExpense(
      breakdownFK,
      12,
      pageNumber,
      sortValueFeeTab,
      sortTypeFeeTab,
      breakdownCompanyName
    )
      .then((response) => {
        const data = response?.data;
        const expenseItem = data?.find((item) => item?.delayedUnitExpensePK != null);
        if (expenseItem) {
          dispatch(setGeneralTabFormData(expenseItem));
        } else {
          dispatch(setGeneralTabFormData(null));
        }

        // Fee records (all with delayedUnitFeePK)
        const feeItems = data?.filter((item) => item?.delayedUnitFeePK != null) || [];
        dispatch(setFeeData(feeItems));

        // Pagination (if present)
        const paginationData = data?.find((item) => item?.Type === "Pagination");
        if (paginationData) {
          dispatch(setTotalElements(paginationData.TotalElements));
          dispatch(setTotalPages(paginationData.TotalPages));
        }
        dispatch(setIsDataLoaded(true));
      })
      .catch((error) => {
        console.error("Error fetching fee details:", error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    getFeeDelayDetails();
  }, [sortValueFeeTab, sortTypeFeeTab]);

  return (
    <Row className="mx-0 p-0 mt-4">
      <Col xs={12}>
        <div className="fixTableHead border border-secondary h-515px" style={{ overflowY: "auto" }}>
          <table className="table table-striped f-w-600">
            <thead>
              <tr disabled>
                <th
                  className="f-w-600 "
                  onClick={() => {
                    onhandleNormalSort("description", !sortTypeFeeTab);
                  }}
                >
                  Description
                  {sortTypeFeeTab && sortValueFeeTab === "description" && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {!sortTypeFeeTab && sortValueFeeTab === "description" && (
                    <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>
                <th
                  className="f-w-600 w-200px"
                  onClick={() => {
                    onhandleNormalSort("invoiceAmount", !sortTypeFeeTab);
                  }}
                >
                  Invoice
                  {sortTypeFeeTab && sortValueFeeTab === "invoiceAmount" && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {!sortTypeFeeTab && sortValueFeeTab === "invoiceAmount" && (
                    <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>
                <th
                  className="f-w-600 w-200px"
                  onClick={() => {
                    onhandleNormalSort("driverAmount", !sortTypeFeeTab);
                  }}
                >
                  Driver
                  {sortTypeFeeTab && sortValueFeeTab === "driverAmount" && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {!sortTypeFeeTab && sortValueFeeTab === "driverAmount" && (
                    <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>

                <th
                  className="f-w-600 w-200px"
                  onClick={() => {
                    onhandleNormalSort("reimbursment", !sortTypeFeeTab);
                  }}
                >
                  Reimbursment
                  {sortTypeFeeTab && sortValueFeeTab === "reimbursment" && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {!sortTypeFeeTab && sortValueFeeTab === "reimbursment" && (
                    <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>
              </tr>
            </thead>

            {loader && (
              <div className="fade modal-backdrop show">
                <div className="pos-center">
                  <div className="loader"></div>
                </div>
              </div>
            )}

            <tbody>
              {loader
                ? null
                : feeData?.length >= 1 &&
                  feeData?.map((data) => (
                    <tr id="rowId" key={data?.delayedUnitFeePK}>
                      <td className="f-w-600"> {data?.description} </td>
                      <td className="f-w-600"> {data?.invoiceAmount} </td>
                      <td className="f-w-600"> {data?.driverAmount} </td>
                      <td className="f-w-600"> {data?.reimbursment ? "Yes" : "No"} </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {loader ? "" : feeData?.length === 0 && <NoRecordsMessage />}
        </div>
      </Col>
    </Row>
  );
};

export default FeesTab;
