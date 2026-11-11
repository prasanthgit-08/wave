import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setInvoiceDetailPK,
  setInvoiceDetailsData,
} from "../../../../../redux/Invoicing/InvoiceInquirySlice";
import { useNavigate } from "react-router-dom";
import InvoiceInquiryService from "../../../../../services/Invoicing/InvoiceInquiryService";
import { t } from "i18next";
import LoadingIcon from "../../../../common/LoadingIcon";

const Details = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const viewDetail = useSelector((state) => state.invoiceInquiryReducer.viewDetail);
  const invoicePK = useSelector((state) => state.invoiceInquiryReducer.invoicePK);
  const companyFK = useSelector((state) => state.invoiceInquiryReducer.companyFK);
  const companyName = useSelector((state) => state.invoiceInquiryReducer.companyName);
  const invoiceDetailsData = useSelector((state) => state.invoiceInquiryReducer.invoiceDetailsData);
  const localCompany = useSelector((state) => state.invoiceInquiryReducer.localCompany);

  //Fetch invoice details records by invoice FK
  const fetchInvoiceDetails = (invoicePK) => {
    if (invoiceDetailsData?.length === 0) {
      setLoading(true);
      InvoiceInquiryService.getInvoiceDetailsById(
        invoicePK,
        localCompany === true ? -1 : companyFK,
        companyName
      )
        .then((response) => {
          setLoading(false);
          const data = response?.data;
          const modifiedList = data?.map((invoice) => ({
            ...invoice,
            previousDescription: invoice.description,
            previousTotalAmount: invoice.totalAmount,
            previousMiles: invoice.miles,
          }));
          dispatch(setInvoiceDetailsData(modifiedList || []));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (!invoicePK) {
      navigate(`/invoice-inquiry/invoice-unit-selection`);
    }
  }, []);

  useEffect(() => {
    if (invoicePK) {
      fetchInvoiceDetails(invoicePK);
    }
  }, [invoicePK]);

  //On click of a detail record
  const handleClick = (invoiceDetail, index) => {
    setSelectedIndex(index);
    dispatch(
      setInvoiceDetailPK(invoiceDetail.invoiceDetailPK != null ? invoiceDetail.invoiceDetailPK != null : null)
    );
  };

  return (
    <div className="m-1">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border p-1" style={{ height: "519px" }}>
        <div className="ps-1 pe-1 mb-4">
          <div className={`d-flex h-100 mt-1 ${viewDetail ? "mt-2" : "mt-1"}`}>
            <div className="w-100 border-1 border border-dark ">
              <div className="fixTableHead" style={{ overflowY: "auto", height: "491px" }}>
                <table className="table table-striped f-w-600">
                  <thead>
                    <tr>
                      <th className="f-w-600 col-7">Description </th>
                      <th className="f-w-600">Rate</th>
                      <th className="f-w-600 ">Miles</th>
                      <th className="f-w-600">Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {invoiceDetailsData?.map((invoiceDetail, index) => (
                      <tr
                        key={index}
                        className={selectedIndex === index && !viewDetail ? "tableSelected" : ""}
                        onClick={!viewDetail ? () => handleClick(invoiceDetail, index) : null}
                      >
                        <td>{invoiceDetail?.description}</td>
                        <td>{invoiceDetail?.mileageRate > 0 ? invoiceDetail?.mileageRate : " "}</td>
                        <td>{invoiceDetail?.miles > 0 ? invoiceDetail.miles : " "}</td>
                        <td>
                          {invoiceDetail?.totalAmount > 0
                            ? invoiceDetail?.totalAmount
                            : invoiceDetail?.subTotalAmount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {invoiceDetailsData?.length === 0 && (
                  <h2 className="empty-list" align="center">
                    {t("dealers.list.empty.message")}
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
