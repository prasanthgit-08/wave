import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import { PaginationComponent } from "../../../../../../common/PaginationComponent";
import { EditMasterUnitSelection_RecordsPerPage } from "../../../../../../../services/constants/applicationConstants";
import { setPageNumber } from "../../../../../../../redux/CustomerPlantSearchFilterSlice";
import {
  setInvoiceDetailPageNumber,
  setInvoiceDetailSortFlag,
  setInvoiceDetailSortValue,
  setInVoiceDetailTotalElements,
  setInvoiceDetailTotalPages,
} from "../../../../../../../redux/UnitStatus/UnitStatusSlice";
import UnitStatusService from "../../../../../../../services/Units/UnitStatusService";
import LoadingText from "../../../../../../common/LoadingText";
import NoRecordsMessage from "../../../../../../common/NoRecordsMessage";

function Detail({ data, activeSubTab }) {
  const dispatch = useDispatch();
  const [unitInvoiceDetailData, setUnitInvoiceDetailData] = useState(data?.data || []);
  const invoiceDetailPageNumber = useSelector((state) => state.unitStatusReducer.invoiceDetailPageNumber);
  const invoiceDetailTotalPages = useSelector((state) => state.unitStatusReducer.invoiceDetailTotalPages);
  const inVoiceDetailTotalElements = useSelector(
    (state) => state.unitStatusReducer.invoiceDetailTotalElements
  );

  const invoiceDetailSortFlag = useSelector((state) => state.unitStatusReducer.invoiceDetailSortFlag);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const invoiceDetailSortValue = useSelector((state) => state.unitStatusReducer.invoiceDetailSortValue);
  const invoicePK = useSelector((state) => state.unitStatusReducer.invoicePK);
  const [loading, setLoading] = useState(true);

  const onhandleNormalSort = (value, val) => {
    dispatch(setInvoiceDetailSortFlag(val));

    dispatch(setInvoiceDetailSortValue(value));
  };

  const getAllUnitNumbersList = () => {
    UnitStatusService.getUnitStatusDataInvoiceDetail(
      invoicePK,
      "Invoices-Detail",
      invoiceDetailPageNumber,
      12,
      invoiceDetailSortValue,
      invoiceDetailSortFlag
    )
      .then((response) => {
        const { data } = response;
        const listingData = data.filter((item) => item.Type !== "Pagination");
        const paginationData = data.find((item) => item.Type === "Pagination");
        setUnitInvoiceDetailData(listingData);
        // Dispatch pagination metadata
        if (paginationData) {
          dispatch(setInVoiceDetailTotalElements(paginationData.TotalElements));
          dispatch(setInvoiceDetailTotalPages(paginationData.TotalPages));
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
    if (selectedId && activeSubTab === "Invoices-Detail") {
      getAllUnitNumbersList();
    }
  }, [invoicePK, invoiceDetailPageNumber, invoiceDetailSortValue, invoiceDetailSortFlag, activeSubTab]);

  const paginationProps = {
    pageNumber: invoiceDetailPageNumber,
    setPageNumber: setInvoiceDetailPageNumber,
    totalPages: invoiceDetailTotalPages,
    totalElements: inVoiceDetailTotalElements,
    listingData: unitInvoiceDetailData,
  };

  return (
    <div className="p-1 ps-2">
      <Col xs={12}>
        <div className="d-flex h-500px mt-2">
          <div className="w-100 border border-2 border-dark">
            <div className="fixTableHead unitSelection" style={{ height: "500px" }}>
              <table className="table table-striped f-w-600">
                <thead>
                  <tr disabled>
                    <th
                      className="f-w-600 col-5"
                      onClick={() => {
                        onhandleNormalSort("Description", !invoiceDetailSortFlag);
                      }}
                    >
                      Description{" "}
                      {invoiceDetailSortFlag && invoiceDetailSortValue === "Description" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!invoiceDetailSortFlag && invoiceDetailSortValue === "Description" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>
                    <th
                      className="f-w-600 col-1"
                      onClick={() => {
                        onhandleNormalSort("MileageRate", !invoiceDetailSortFlag);
                      }}
                    >
                      Rate{" "}
                      {invoiceDetailSortFlag && invoiceDetailSortValue === "MileageRate" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!invoiceDetailSortFlag && invoiceDetailSortValue === "MileageRate" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>
                    <th
                      className="f-w-600 col-2"
                      onClick={() => {
                        onhandleNormalSort("Miles", !invoiceDetailSortFlag);
                      }}
                    >
                      {" "}
                      Miles{" "}
                      {invoiceDetailSortFlag && invoiceDetailSortValue === "Miles" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!invoiceDetailSortFlag && invoiceDetailSortValue === "Miles" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>
                    <th
                      className="f-w-600 col-2"
                      onClick={() => {
                        onhandleNormalSort("SubTotalAmount", !invoiceDetailSortFlag);
                      }}
                    >
                      {" "}
                      Sub Total{" "}
                      {invoiceDetailSortFlag && invoiceDetailSortValue === "SubTotalAmount" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!invoiceDetailSortFlag && invoiceDetailSortValue === "SubTotalAmount" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>
                    <th
                      className="f-w-600 col-2"
                      onClick={() => {
                        onhandleNormalSort("TotalAmount", !invoiceDetailSortFlag);
                      }}
                    >
                      {" "}
                      Total{" "}
                      {invoiceDetailSortFlag && invoiceDetailSortValue === "TotalAmount" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!invoiceDetailSortFlag && invoiceDetailSortValue === "TotalAmount" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!loading &&
                    unitInvoiceDetailData.length > 0 &&
                    unitInvoiceDetailData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.Description}</td>
                        <td>{item.MileageRate}</td>
                        <td>{item.Miles}</td>
                        <td>{item.SubTotalAmount}</td>
                        <td>{item.TotalAmount}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {loading && <LoadingText smallerFont />}
              {!loading && unitInvoiceDetailData?.length === 0 && <NoRecordsMessage />}
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

export default Detail;
