import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../../../../common/PaginationComponent";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setDocuemntTotalPages,
  setDocumentPageNumber,
  setDocumentsData,
  setDocumentTotalElements,
} from "../../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import BreakdownProcessingService from "../../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import { useParams } from "react-router-dom";
import NoRecordsMessage from "../../../../../common/NoRecordsMessage";
import LoadingText from "../../../../../common/LoadingText";

const Documents = () => {
  const dispatch = useDispatch();
  const { breakdownFK } = useParams();
  const [loading, setLoading] = useState(true);
  const viewBreakdownActiveTab = useSelector((state) => state.delaybreakdown.viewBreakdownActiveTab);
  const documentPageNumber = useSelector((state) => state.delaybreakdown.documentPageNumber);
  const documentsData = useSelector((state) => state.delaybreakdown.documentsData);
  const docuemntTotalPages = useSelector((state) => state.delaybreakdown.docuemntTotalPages);
  const documentTotalElements = useSelector((state) => state.delaybreakdown.documentTotalElements);

  const paginationProps = {
    pageNumber: documentPageNumber,
    setPageNumber: setDocumentPageNumber,
    totalPages: docuemntTotalPages,
    totalElements: documentTotalElements,
    listingData: documentsData,
  };

  /*****
   * Fetch the documents that matches the
   * Selected Delay Unit Damage Record
   * ***/
  const fetchDocumentsForViewScreen = () => {
    BreakdownProcessingService.getDocumentsForBreakdownView(documentPageNumber, breakdownFK)
      .then((response) => {
        setLoading(false);
        const { data } = response;
        const documentsList = data?.slice(0, data?.length - 1); // 0 to n-2
        const paginationInfo = data[data?.length - 1]; // last element
        dispatch(setDocumentsData(documentsList));
        dispatch(setDocumentTotalElements(paginationInfo?.TotalElements));
        dispatch(setDocuemntTotalPages(paginationInfo?.TotalPages));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleFileClick = async (blobKey) => {
    try {
      const response = await BreakdownProcessingService.viewBreakdownDocument(blobKey);
      const base64Data = response?.data[0]?.BLOB;
      const fileName = response?.data[0]?.FileName || "download";

      if (!base64Data) {
        console.error("No BLOB data found");
        return;
      }

      // Extract extension from file name (e.g., "file.pdf" → "pdf")
      const extensionMatch = fileName?.match(/\.(\w+)$/);
      const extension = extensionMatch ? extensionMatch[1] : "pdf";
      const mimeTypes = {
        pdf: "application/pdf",
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        gif: "image/gif",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        txt: "text/plain",
        zip: "application/zip",
      };
      const mimeType = mimeTypes[extension?.toLowerCase()] || "application/pdf";

      // Create byte array from base64 string
      const byteCharacters = atob(base64Data);
      const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);

      // Create and trigger download
      const blob = new Blob([byteArray], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to fetch or convert file", error);
    }
  };

  /*****
   * Calling the API for Documents Fetch
   * ****/
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      if (viewBreakdownActiveTab === "documents") {
        fetchDocumentsForViewScreen();
      }
    }, 100);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [viewBreakdownActiveTab, documentPageNumber, breakdownFK]);

  return (
    <div className="p-1 ps-2">
      <Col xs={12}>
        <div className="d-flex h-100  mt-2 ">
          <div className="w-100  border border-2 border-dark ">
            <div className=" fixTableHead h-620px">
              <table className="table table-striped f-w-600 ">
                <thead>
                  <tr>
                    <th className="f-w-600 col-3" onClick={() => {}}>
                      Document Type{" "}
                    </th>
                    <th className="f-w-600 col-3" onClick={() => {}}>
                      Description{" "}
                    </th>
                    <th className="f-w-600 col-6" onClick={() => {}}>
                      File Name{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? null
                    : documentsData?.length > 0 &&
                      documentsData?.map((code) => (
                        <tr id="rowId" key={code?.DocumentPK} onDoubleClick={(event) => {}}>
                          <td className="f-w-600">{code?.DocumentTypeDescription || code?.blobKey}</td>
                          <td className="f-w-600">{code?.Description}</td>

                          <td className="f-w-600">
                            <span
                              className="text-link"
                              onClick={() => handleFileClick(code.blobKey)}
                              style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                            >
                              {code?.FileName}
                            </span>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
              {loading && <LoadingText />}
              {loading ? "" : documentsData?.length === 0 && <NoRecordsMessage />}
            </div>
          </div>
          <PaginationComponent
            {...paginationProps}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
            hideBorderLeft
            recordsPerPage={14}
          />
        </div>
      </Col>
    </div>
  );
};

export default Documents;
