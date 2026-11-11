import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedId,
  setViewDetail,
  setNormalSortValue,
  setNormalSortFlag,
  setListingData,
  setTotalElements,
  setTotalPages,
  setDriverPayRequestsPK,
  setActiveTab,
  setChangesCancelled,
  setDriverActive,
  setDriverDeleased,
} from "../../../../../../../../redux/PaymentRequestSlice";
import { useNavigate, useParams } from "react-router-dom";
import { customFormatDate } from "../../../../../../../../utils/validation/DateFormatUtils";
import PaymentRequestService from "../../../../../../../../services/operations/PaymentRequestService";
import { t } from "i18next";

const TableListing = ({ loading, setLoading }) => {
  const params = useParams();
  const driverId = params.driverId;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const selectedId = useSelector((state) => state.paymentRequestSlice.selectedId);
  const pageNumber = useSelector((state) => state.paymentRequestSlice.pageNumber);
  const searchCriteria = useSelector((state) => state.paymentRequestSlice.searchCriteria);
  const sortType = useSelector((state) => state.paymentRequestSlice.sortType);
  const searchTerms = useSelector((state) => state.paymentRequestSlice.searchTerms);
  const pageSize = useSelector((state) => state.paymentRequestSlice.pageSize);
  const normalSortValue = useSelector((state) => state.paymentRequestSlice.normalSortValue);
  const normalSortFlag = useSelector((state) => state.paymentRequestSlice.normalSortFlag);
  const listingData = useSelector((state) => state.paymentRequestSlice.listingData);
  const selectedStatus = useSelector((state) => state.paymentRequestSlice.selectedStatus);

  const fetchTableDatas = async () => {
    try {
      setLoading(true);
      const response = await PaymentRequestService.getPaymentRequestList(
        searchCriteria,
        searchTerms,
        pageNumber,
        normalSortValue,
        normalSortFlag,
        driverId,
        selectedStatus
      );
      if (response && response.data) {
        const { data } = response;
        const filteredList = data?.filter((item) => item?.Type !== "Pagination");
        dispatch(setListingData(filteredList));
        dispatch(setListingData(filteredList));
        dispatch(setDriverActive(response.data[0].Active));
        dispatch(setDriverDeleased(response.data[0].Deleased));

        const paginationData = data?.find((item) => item?.Type === "Pagination");
        if (paginationData) {
          dispatch(setTotalElements(paginationData.TotalElements));
          dispatch(setTotalPages(paginationData.TotalPages));
        }
      } else {
        console.error("Unexpected API response format:", response);
      }
    } catch (error) {
      console.error("Error fetching bulk invoice data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchTableDatas();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerms, pageNumber, normalSortFlag, normalSortValue, selectedStatus]);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600 col-3"
              onClick={() => {
                onhandleNormalSort("UnitNumber", !normalSortFlag);
              }}
            >
              Unit Number
              {normalSortFlag && normalSortValue === "UnitNumber" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "UnitNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("Amount", !normalSortFlag);
              }}
            >
              Amount
              {normalSortFlag && normalSortValue === "Amount" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "Amount" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("DateEntered", !normalSortFlag);
              }}
            >
              Date Entered
              {normalSortFlag && normalSortValue === "DateEntered" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "DateEntered" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("DatePaid", !normalSortFlag);
              }}
            >
              Date Paid
              {normalSortFlag && normalSortValue === "DatePaid" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "DatePaid" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600 col-2"
              onClick={() => {
                onhandleNormalSort("DeniedDate", !normalSortFlag);
              }}
            >
              Date Denied
              {normalSortFlag && normalSortValue === "DeniedDate" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "DeniedDate" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            listingData.length > 0 &&
            listingData.map((data) => (
              <tr
                key={data.DriverPayRequestsPK}
                onClick={() => dispatch(setSelectedId(null))}
                onDoubleClick={() => {
                  dispatch(setDriverPayRequestsPK(data.DriverPayRequestsPK));
                  dispatch(setActiveTab("driversPay"));

                  dispatch(setSelectedId(data.DriverPayRequestsPK));
                  dispatch(setViewDetail(true));
                  setTimeout(() => {
                    navigate(`/payment-requests-detail/${driverId}/${data.DriverPayRequestsPK}`);
                  }, 100);
                }}
                className={data.DriverPayRequestsPK === selectedId ? "tableSelected" : ""}
              >
                <td className="f-w-600">{data.UnitNumber}</td>
                <td className="f-w-600">{data.Amount}</td>
                <td className="f-w-600">{customFormatDate(data.DateEntered)}</td>
                <td className="f-w-600">{customFormatDate(data.DatePaid)}</td>
                <td className="f-w-600">{customFormatDate(data.DeniedDate)}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {loading ? (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        listingData.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
};

export default TableListing;
