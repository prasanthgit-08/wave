import React, { useState } from "react";
import { useSelector } from "react-redux";
import { setListingData, setPageNumberHistory } from "../../../../redux/EquipmentsSlice";
import { No_Of_Record_per_page } from "../../../../services/constants/applicationConstants";
import { PaginationComponent } from "../../../common/PaginationComponent";
import HistoryFooter from "./HistoryFooter";
import HistoryHeader from "./HistoryHeader";
import HistoryListing from "./HistoryListing";

function HistoryMainPage() {
  const [loading, setLoading] = useState(true);
  const pageNumber = useSelector((state) => state.equipmentReducer.pageNumberHistory);
  const listingHistoryData = useSelector((state) => state.equipmentReducer.listingHistoryData);
  const totalPages = useSelector((state) => state.equipmentReducer.totalPages);
  const totalElements = useSelector((state) => state.equipmentReducer.totalElements);
  const paginationProps = {
    pageNumber,
    setPageNumber: setPageNumberHistory,
    totalPages,
    totalElements,
    listingData: listingHistoryData,
  };
  return (
    <div className="container-fluid table-bordered customContainer">
      <div className="row">
        <div
          className="border border-dark border-2 quarterScreenWidth" /* quarterScreenWidth */
          style={{
            width: "960px",
            height: "540px",
          }}
        >
          {/* search filter component */}

          <HistoryHeader />

          <div className="row border  border-1 border-dark" style={{ width: "956px", height: "444px" }}>
            <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
              <div className="d-flex h-100" style={{ borderTop: "1px solid", borderBottom: "1px solid" }}>
                <div className="w-100">
                  {/* page listing  */}
                  <HistoryListing customerURL={``} loading={loading} setLoading={setLoading} />
                  <div>
                    {loading ? (
                      ""
                    ) : listingHistoryData?.length === 0 ? (
                      <h2 className="empty-list" align="center">
                        No Records Available
                      </h2>
                    ) : (
                      ""
                    )}{" "}
                  </div>
                </div>
                {/* paginanationbelow */}
                <PaginationComponent
                  {...paginationProps}
                  recordsPerPage={11}
                  firstPage
                  lastPage
                  singleArrowUp
                  singleArrowDown
                />
              </div>
            </div>
          </div>

          <HistoryFooter />
        </div>
      </div>
    </div>
  );
}

export default HistoryMainPage;
