/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import { Col, Row } from "react-bootstrap";
import BreakdownProcessingService from "../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import { useDispatch, useSelector } from "react-redux";
import {
  setBreakdownInvoiceDetails,
  setFeesTabLisiting,
  setFeesTabNormalSortFlag,
  setFeesTabNormalSortValue,
} from "../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import { useParams } from "react-router-dom";
import LoadingIcon from "../../../common/LoadingIcon";

const FeesTab = () => {
  const dispatch = useDispatch();
  const { breakdownFK } = useParams();
  const [loading, setLoading] = useState(false);
  const feesTabLisiting = useSelector((state) => state.delaybreakdown.feesTabLisiting);
  const feesTabNormalSortValue = useSelector((state) => state.delaybreakdown.feesTabNormalSortValue);
  const feesTabNormalSortFlag = useSelector((state) => state.delaybreakdown.feesTabNormalSortFlag);
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");
  const fetchBreakdownInvoiceData = () => {
    setLoading(true);
    BreakdownProcessingService.getBreakdownInvoiceData(
      breakdownFK,
      breakdownCompanyName,
      feesTabNormalSortValue,
      feesTabNormalSortFlag
    )
      .then((response) => {
        const { data } = response;
        dispatch(setBreakdownInvoiceDetails(data?.breakdownInvoiceDetails || []));
        dispatch(setFeesTabLisiting(data?.breakdownFeeList || []));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (feesTabNormalSortValue !== "") {
      fetchBreakdownInvoiceData();
    }
  }, [feesTabNormalSortValue, feesTabNormalSortFlag]);

  const onhandleNormalSort = (value, val) => {
    dispatch(setFeesTabNormalSortValue(value));
    dispatch(setFeesTabNormalSortFlag(val));
  };

  return (
    <Row className="mx-0 p-0 mt-4">
      {loading && <LoadingIcon />}
      <Col xs={12}>
        <div className="fixTableHead border border-secondary h-515px" style={{ overflowY: "auto" }}>
          <table className="table table-striped f-w-600">
            <thead>
              <tr disabled>
                <th
                  className="f-w-600 "
                  onClick={() => {
                    onhandleNormalSort("description", !feesTabNormalSortFlag);
                  }}
                >
                  Description
                  {feesTabNormalSortFlag && feesTabNormalSortValue === "description" && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {!feesTabNormalSortFlag && feesTabNormalSortValue === "description" && (
                    <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>
                <th
                  className="f-w-600 w-200px"
                  onClick={() => {
                    onhandleNormalSort("invoiceAmount", !feesTabNormalSortFlag);
                  }}
                >
                  Invoice
                  {feesTabNormalSortFlag && feesTabNormalSortValue === "invoiceAmount" && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {!feesTabNormalSortFlag && feesTabNormalSortValue === "invoiceAmount" && (
                    <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>
                <th
                  className="f-w-600 w-200px"
                  onClick={() => {
                    onhandleNormalSort("driverAmount", !feesTabNormalSortFlag);
                  }}
                >
                  Driver
                  {feesTabNormalSortFlag && feesTabNormalSortValue === "driverAmount" && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {!feesTabNormalSortFlag && feesTabNormalSortValue === "driverAmount" && (
                    <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>

                <th
                  className="f-w-600 w-200px"
                  onClick={() => {
                    onhandleNormalSort("reimbursment", !feesTabNormalSortFlag);
                  }}
                >
                  Reimbursment
                  {feesTabNormalSortFlag && feesTabNormalSortValue === "reimbursment" && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {!feesTabNormalSortFlag && feesTabNormalSortValue === "reimbursment" && (
                    <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>
              </tr>
            </thead>

            <tbody>
              {loading
                ? ""
                : feesTabLisiting?.length > 0 &&
                  feesTabLisiting?.map((item) => (
                    <tr key={item?.delayedUnitFeePK}>
                      <td>{item?.description?.trim()}</td>
                      <td>{item?.invoiceAmount}</td>
                      <td>{item?.driverAmount}</td>
                      <td>{item?.reimbursment ? "Yes" : "No"}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {loading ? null : (!feesTabLisiting || feesTabLisiting?.length === 0) && <NoRecordsMessage />}
        </div>
      </Col>
    </Row>
  );
};

export default FeesTab;
