import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InvoiceInquiryService from "../../../../../services/Invoicing/InvoiceInquiryService";
import { t } from "i18next";
import { setChangeColorDocuments } from "../../../../../redux/Invoicing/InvoiceInquirySlice";
import PreviewPopup from "../../../../common/PreviewPopup";
import LoadingIcon from "../../../../common/LoadingIcon";

const Documents = () => {
  const dispatch = useDispatch();
  const [documentList, setDocumentList] = useState(null);
  const [id, setId] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [base64PDF, setBase64PDF] = useState();
  const [loading, setLoading] = useState(false);

  const viewDetail = useSelector((state) => state.invoiceInquiryReducer.viewDetail);
  const invoicePK = useSelector((state) => state.invoiceInquiryReducer.invoicePK);
  const changeColorDocuments = useSelector((state) => state.invoiceInquiryReducer.changeColorDocuments);

  /*Fetch invoice details records by invoice FK*/
  const fetchDocuments = (invoicePK) => {
    if (invoicePK) {
      setLoading(true);
      InvoiceInquiryService.getDocumentsForInvoice(invoicePK)
        .then((response) => {
          const data = response?.data?.documentList;
          setDocumentList(data || []);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  /*Fetch document blob record by document FK*/
  const fetchDocumentById = (documentFK) => {
    setLoading(true);
    InvoiceInquiryService.getDocumentsById(documentFK)
      .then((response) => {
        setLoading(false);
        setShowPreview(true);
        setBase64PDF(response?.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching document:", error);
      });
  };

  useEffect(() => {
    if (invoicePK) {
      fetchDocuments(invoicePK);
    }
  }, [invoicePK]);

  const handleDoubleClick = (value) => {
    setId(value);
    dispatch(setChangeColorDocuments(true));
    fetchDocumentById(value);
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
                      <th className="f-w-600 col-3">Document Type </th>
                      <th className="f-w-600 col-3">Description</th>
                      <th className="f-w-600 col-6">File Name</th>
                    </tr>
                  </thead>

                  <tbody>
                    {documentList?.map((invoiceDocuments, index) => (
                      <tr
                        key={index}
                        className={
                          id === invoiceDocuments?.DocumentPK && changeColorDocuments ? "tableSelected" : ""
                        }
                        onClick={() => {
                          setId(invoiceDocuments?.DocumentPK);
                        }}
                        onDoubleClick={() => {
                          handleDoubleClick(invoiceDocuments?.DocumentPK);
                        }}
                      >
                        <td>{invoiceDocuments?.DocumentTypeDescription}</td>
                        <td>{invoiceDocuments?.Description}</td>
                        <td>{invoiceDocuments?.FileName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {documentList?.length === 0 && (
                  <h2 className="empty-list" align="center">
                    {t("dealers.list.empty.message")}
                  </h2>
                )}
                <PreviewPopup show={showPreview} onHide={() => setShowPreview(false)} base64PDF={base64PDF} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
