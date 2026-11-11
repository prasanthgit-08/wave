import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import BulkEmailsService from "../../../../services/operations/BulkEmailsService";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumber, updateField } from "../../../../redux/Operations/BulkEmailSlice";
import { useNavigate } from "react-router-dom";
import LoadingText from "../../../common/LoadingText";

const BrowsePageListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pageNumber = useSelector((state) => state.bulkEmails.pageNumber);
  const listingData = useSelector((state) => state.bulkEmails.listingData);
  const totalPages = useSelector((state) => state.bulkEmails.totalPages);
  const totalElements = useSelector((state) => state.bulkEmails.totalElements);
  const selectedId = useSelector((state) => state.bulkEmails.selectedId);

  const [loading, setLoading] = useState(false);
  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const fetchBrowseList = () => {
    setLoading(true);
    BulkEmailsService.getBrowseData(pageNumber)
      .then(({ data }) => {
        const paginationData = data.slice(data.length - 1);
        const browseData = data.slice(0, data.length - 1);
        updateData("listingData", browseData);
        updateData("totalPages", paginationData[0].TotalPages);
        updateData("totalElements", paginationData[0].TotalElements);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBrowseList();
  }, [pageNumber]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalElements,
    totalPages,
    listingData,
  };

  return (
    <div>
      <div className="customMaintenanceFormWidthContainer">
        <div className="add-form-component border border-dark  border-bottom-0 border-left-0">
          <div className="d-flex col-12 fit-heightDispatchBrowse" style={{ maxHeight: "440px" }}>
            <div className="flex-grow-1">
              <div className="fixTableHead h-100" style={{ display: "flex", flexDirection: "column" }}>
                <table className="table border-bottom f-w-600">
                  <thead>
                    <tr>
                      <th className="f-w-600">User</th>
                      <th className="f-w-600">Subject</th>
                      <th className="f-w-600">Driver</th>
                      <th className="f-w-600">Customer</th>
                      <th className="f-w-600">Dealer</th>
                      <th className="f-w-600">List</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <></>
                    ) : (
                      listingData.length > 0 &&
                      listingData.map((item, index) => (
                        <tr
                          id="rowId"
                          key={item.BulkEmailPK}
                          onClick={() => {
                            updateData("selectedId", null);
                          }}
                          onDoubleClick={() => {
                            updateData("selectedId", item.BulkEmailPK);
                          }}
                          className={`${item.BulkEmailPK === selectedId ? "tableSelected" : ""}`}
                        >
                          <td>{item.Name}</td>
                          <td>{item.Subject}</td>
                          <td>{item.Driver ? "Yes" : "No"}</td>
                          <td>{item.Customer || item.Plant ? "Yes" : "No"}</td>
                          <td>{item.Dealer ? "Yes" : "No"}</td>
                          <td>{item.EmailList ? "Yes" : "No"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {!loading && listingData.length === 0 && (
                  <h2 className="empty-list" align="center">
                    {t("dealers.list.empty.message")}
                  </h2>
                )}
                {loading && (
                  <div className="fade modal-backdrop show">
                    <div className="pos-center">
                      <div className="loader"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <PaginationComponent
              {...paginationProps}
              recordsPerPage={11}
              firstPage
              lastPage
              singleArrowUp
              singleArrowDown
              hideBorderBottom
              hideBorderRight
              hideBorderTop
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePageListing;
