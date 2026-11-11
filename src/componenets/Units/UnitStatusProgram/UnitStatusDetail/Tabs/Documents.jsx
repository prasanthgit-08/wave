import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { EditMasterUnitSelection_RecordsPerPage } from "../../../../../services/constants/applicationConstants";

import { Col } from "react-bootstrap";
import {
  setDocumentPageNumber,
  setDocumentSortFlag,
  setDocumentSortValue,
  setDocumentTotalElements,
  setDocumentTotalPages,
} from "../../../../../redux/UnitStatus/UnitStatusSlice";
import UnitStatusService from "../../../../../services/Units/UnitStatusService";
import { useParams } from "react-router-dom";
import NoRecordsMessage from "../../../../common/NoRecordsMessage";
import LoadingText from "../../../../common/LoadingText";

function Documents({ data }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const activeTab = useSelector((state) => state.unitStatusReducer.activeTab);
  const [unitDocumentData, setDocumentData] = useState(data?.data || []);
  const documentPageNumber = useSelector((state) => state.unitStatusReducer.documentPageNumber);
  const documentTotalPages = useSelector((state) => state.unitStatusReducer.documentTotalPages);
  const documentTotalElements = useSelector((state) => state.unitStatusReducer.documnetTotalElements);
  const documentSortFlag = useSelector((state) => state.unitStatusReducer.documentSortFlag);
  const documentSortValue = useSelector((state) => state.unitStatusReducer.documentSortValue);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const [loading, setLoading] = useState(true);

  const paginationProps = {
    pageNumber: documentPageNumber,
    setPageNumber: setDocumentPageNumber,
    totalPages: documentTotalPages,
    totalElements: documentTotalElements,
    listingData: unitDocumentData,
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setDocumentSortFlag(val));
    dispatch(setDocumentSortValue(value));
  };

  const getAllUnitNumbersList = () => {
    UnitStatusService.getUnitStatusDataForOpenBalance(
      selectedId,
      "Documents",
      0,
      11,
      documentSortValue,
      documentSortFlag
    )
      .then((response) => {
        const { data } = response;
        const listingData = data.filter((item) => item.Type !== "Pagination");
        setDocumentData(listingData);
        const paginationData = data.find((item) => item.Type === "Pagination");
        if (paginationData) {
          dispatch(setDocumentTotalElements(paginationData.TotalElements));
          dispatch(setDocumentTotalPages(paginationData.TotalPages));
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
    if (id && activeTab === "Documents") {
      getAllUnitNumbersList();
    }
  }, [documentPageNumber, documentSortValue, documentSortFlag, activeTab]);

  return (
    <div className="p-1 ps-2">
      <Col xs={12}>
        <div className="d-flex h-550 mt-3">
          <div className="w-100 border border-2 border-dark">
            <div className=" fixTableHead h-550px">
              <table className="table table-striped f-w-600">
                <thead>
                  <tr disabled>
                    <th
                      className="f-w-600 col-3"
                      onClick={() => {
                        onhandleNormalSort("DescriptionType", !documentSortFlag);
                      }}
                    >
                      Document Type{" "}
                      {documentSortFlag && documentSortValue === "DescriptionType" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!documentSortFlag && documentSortValue === "DescriptionType" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>
                    <th
                      className="f-w-600 col-3"
                      onClick={() => {
                        onhandleNormalSort("Description", !documentSortFlag);
                      }}
                    >
                      Description{" "}
                      {documentSortFlag && documentSortValue === "Description" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!documentSortFlag && documentSortValue === "Description" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("FileName", !documentSortFlag);
                      }}
                    >
                      {" "}
                      File Name{" "}
                      {documentSortFlag && documentSortValue === "FileName" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!documentSortFlag && documentSortValue === "FileName" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}{" "}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!loading &&
                    unitDocumentData.length > 0 &&
                    unitDocumentData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.DescriptionType}</td>
                        <td>{item.Description}</td>
                        <td>{item.FileName}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {loading && <LoadingText smallerFont />}
              {!loading && unitDocumentData?.length === 0 && <NoRecordsMessage />}
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

export default Documents;
