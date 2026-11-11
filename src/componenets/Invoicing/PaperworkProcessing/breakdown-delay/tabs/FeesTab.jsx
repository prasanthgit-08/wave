import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaperworkProcessingService from "../../../../../services/Invoicing/PaperworkProcessingService";
import {
  setFeeDelayArray,
  setFeeInvoiceTotal,
  setSortTypeFeeTab,
  setSortValueFeeTab,
  setTotalElements,
  setTotalPages,
} from "../../../../../redux/Invoicing/PaperworkProcessingSlice";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";
import { Col, Row } from "react-bootstrap";
import LoadingIcon from "../../../../common/LoadingIcon";

const FeesTab = () => {
  const dispatch = useDispatch();
  const size = useSelector((state) => state.paperworkProcessing.size);
  const pageNumber = useSelector((state) => state.paperworkProcessing.pageNumber);
  const searchCriteria = useSelector((state) => state.paperworkProcessing.searchCriteria);
  const searchTerm = useSelector((state) => state.paperworkProcessing.searchTerm);
  const sortValueFeeTab = useSelector((state) => state.paperworkProcessing.sortValueFeeTab);
  const sortTypeFeeTab = useSelector((state) => state.paperworkProcessing.sortTypeFeeTab);
  const feeDelayArray = useSelector((state) => state.paperworkProcessing.feeDelayArray);
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [feesLoading, setFeesLoading] = useState(false);
  const selectedUnitsList = useSelector((state) => state.paperworkProcessing.selectedUnitsList);
  const arrayOfUnitIds = selectedUnitsList.map((unit) => unit.unitPK);
  const delayedUnitBreakdownFKInt = useSelector(
    (state) => state.paperworkProcessing.delayedUnitBreakdownFKInt
  );
  const companyName = useSelector((state) => state.paperworkProcessing.companyName);
  const selectedDelayUnitBreakdownFK = useSelector(
    (state) => state.paperworkProcessing.selectedDelayUnitBreakdownFK
  );

  useEffect(() => {
    dispatch(setSortTypeFeeTab(false));
    dispatch(setSortValueFeeTab(null));
  }, []);

  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValueFeeTab(value));
    dispatch(setSortTypeFeeTab(val));
  };

  const getFeeDelayDetails = (arrayOfUnitIds) => {
    if (arrayOfUnitIds) {
      setFeesLoading(true);
      PaperworkProcessingService.getFeesDetailsForExpense(
        arrayOfUnitIds,
        size,
        pageNumber,
        sortValueFeeTab,
        sortTypeFeeTab,
        null,
        companyName
      )

        .then((response) => {
          const data = response?.data;
          setLoader(false);
          dispatch(setFeeDelayArray(data || []));
        })
        .catch((error) => {
          setLoader(false);
        })
        .finally(() => {
          setFeesLoading(false);
        });
    }
  };

  const getTotalFeeInvoiceAmount = (arrayOfUnitIds, delayedUnitBreakdownFKInt) => {
    if (arrayOfUnitIds) {
      setLoading(true);
      PaperworkProcessingService.getFeeInvoiceTotal(arrayOfUnitIds, delayedUnitBreakdownFKInt, companyName)
        .then((response) => {
          const data = response?.data;
          dispatch(setFeeInvoiceTotal(data));
        })
        .catch((error) => {
          setLoader(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getFeeDelayDetails(arrayOfUnitIds, delayedUnitBreakdownFKInt);
      getTotalFeeInvoiceAmount(arrayOfUnitIds, delayedUnitBreakdownFKInt);
    }, 50);
  }, [size, pageNumber, searchCriteria, searchTerm]);

  return (
    <Row className="mx-0 p-0 mt-3">
      {(loading || feesLoading) && <LoadingIcon />}
      <Col xs={12}>
        <div className="fixTableHead border border-secondary h-500px" style={{ overflowY: "auto" }}>
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

            <tbody>
              {loader
                ? ""
                : feeDelayArray
                    ?.filter(
                      (delayFee) => delayFee.delayedUnitBreakdownFKInt === selectedDelayUnitBreakdownFK
                    )
                    .sort((a, b) => {
                      if (!sortValueFeeTab) return 0;

                      const direction = sortTypeFeeTab ? 1 : -1; // true => asc, false => desc

                      const getComparable = (item) => {
                        if (sortValueFeeTab === "description") {
                          return (item.description || "").toString().toLowerCase();
                        }
                        if (sortValueFeeTab === "invoiceAmount") {
                          return Number(item.invoiceAmount) || 0;
                        }
                        if (sortValueFeeTab === "driverAmount") {
                          return Number(item.driverAmount) || 0;
                        }
                        if (sortValueFeeTab === "reimbursment") {
                          return item.reimbursment ? 1 : 0;
                        }
                        return 0;
                      };

                      const aVal = getComparable(a);
                      const bVal = getComparable(b);

                      if (aVal < bVal) return -1 * direction;
                      if (aVal > bVal) return 1 * direction;
                      return 0;
                    })
                    .map((delayFee) => (
                      <tr key={delayFee.delayedUnitFeePK}>
                        <td>{delayFee.description?.trim()}</td>
                        <td>{delayFee.invoiceAmount}</td>
                        <td>{delayFee.driverAmount}</td>
                        <td>{delayFee.reimbursment ? "Yes" : "No"}</td>
                      </tr>
                    ))}
            </tbody>
          </table>
          {loader ? null : (!feeDelayArray || feeDelayArray?.length === 0) && <NoRecordsMessage />}
        </div>
      </Col>
    </Row>
  );
};

export default FeesTab;
