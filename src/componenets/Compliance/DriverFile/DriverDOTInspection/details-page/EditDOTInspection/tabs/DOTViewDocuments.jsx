import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setDocuemntTotalPages,
  setDocumentPageNumber,
  setDocumentsData,
  setDocumentTotalElements,
} from "../../../../../../../redux/Compliance/DriverDOTInspectionSlice";
import DriverDOTInspectionService from "../../../../../../../services/Compliance/DriverDOTInspectionService";
import LoadingText from "../../../../../../common/LoadingText";
import NoRecordsMessage from "../../../../../../common/NoRecordsMessage";
import { PaginationComponent } from "../../../../../../common/PaginationComponent";

const DOTViewDocuments = () => {
  const { driverId, dotInspectionPK } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const documentPageNumber = useSelector((state) => state.driverDOTInspection.documentPageNumber);
  const docuemntTotalPages = useSelector((state) => state.driverDOTInspection.docuemntTotalPages);
  const documentTotalElements = useSelector((state) => state.driverDOTInspection.documentTotalElements);
  const documentsData = useSelector((state) => state.driverDOTInspection.documentsData);
  const viewDetail = useSelector((state) => state.driverDOTInspection.viewDetail);

  const paginationProps = {
    pageNumber: documentPageNumber,
    setPageNumber: setDocumentPageNumber,
    totalPages: docuemntTotalPages,
    totalElements: documentTotalElements,
    listingData: documentsData,
  };

  const fetchDocumentsForViewScreen = () => {
    setLoading(true);
    DriverDOTInspectionService.getDocumentsForDotInspectionView(documentPageNumber, dotInspectionPK)
      .then((res) => {
        const { data } = res;
        const documentsList = data.slice(0, data.length - 1); // 0 to n-2
        const paginationInfo = data[data.length - 1]; // last element
        dispatch(setDocumentsData(documentsList));
        dispatch(setDocumentTotalElements(paginationInfo?.TotalElements));
        dispatch(setDocuemntTotalPages(paginationInfo?.TotalPages));
      })
      .catch((err) => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFileClick = async (blobKey) => {
    try {
      const response = await DriverDOTInspectionService.viewDotInspectionDocument(blobKey);
      const base64Data = response.data[0]?.BLOB;
      const fileName = response.data[0]?.FileName || "download";

      if (!base64Data) {
        console.error("No BLOB data found");
        return;
      }

      // Extract extension from file name (e.g., "file.pdf" → "pdf")
      const extensionMatch = fileName.match(/\.(\w+)$/);
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
      const mimeType = mimeTypes[extension.toLowerCase()] || "application/pdf";

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

  useEffect(() => {
    fetchDocumentsForViewScreen();
  }, [viewDetail, documentPageNumber]);

  return (
    <div className="p-1 ps-2">
      <Col xs={12}>
        <div className="d-flex h-100  mt-2 ">
          <div className="w-100  border border-2 border-dark ">
            <div className=" fixTableHead h-350px">
              <table className="table table-striped f-w-600 ">
                <thead>
                  <tr>
                    <th className="f-w-600 col-4">Description </th>
                    <th className="f-w-600 col-8">File Name </th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? null
                    : documentsData?.length > 0 &&
                      documentsData?.map((code) => (
                        <tr id="rowId" key={code?.DocumentPK} onDoubleClick={(event) => {}}>
                          <td className="f-w-600">{code?.Description}</td>
                          <td className="f-w-600">
                            <span
                              className="text-link"
                              onClick={() => handleFileClick(code.blobKey)}
                              style={{
                                color: "blue",
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
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
            loading={loading}
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

export default DOTViewDocuments;
