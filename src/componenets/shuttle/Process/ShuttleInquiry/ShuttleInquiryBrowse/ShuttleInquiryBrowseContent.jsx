import React from "react";
import { useSelector } from "react-redux";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import ShuttleInquiryBrowseListing from "./ShuttleInquiryBrowseListing";

import { setPageNumber, resetChanges } from "../../../../../redux/ShuttleInquirySlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ShuttleInquiryBrowseContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shuttleData = useSelector((state) => state.shuttleInquiryReducer.shuttleData);
  const pageNumber = useSelector((state) => state.shuttleInquiryReducer.pageNumber);
  const totalPages = useSelector((state) => state.shuttleInquiryReducer.totalPages);
  const totalElements = useSelector((state) => state.shuttleInquiryReducer.totalElements);
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: shuttleData,
  };

  const navigateToHome = () => {
    dispatch(resetChanges());
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/shuttle-inquiry-selection");
  };
  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={navigateToHome}
          >
            Close
          </button>
        </div>

        <div className="col-xs-6"></div>
      </div>

      <div className="container-fluid table-bordered ">
        <div className=" ">
          <div className="row " style={{ minHeight: "617px" }}>
            <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
              <div className="d-flex h-100">
                <div className="w-100">
                  <ShuttleInquiryBrowseListing />
                </div>
                <PaginationComponent
                  {...paginationProps}
                  firstPage
                  lastPage
                  tripleArrowUp
                  tripleArrowDown
                  doubleArrowUp
                  doubleArrowDown
                  singleArrowUp
                  singleArrowDown
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
        <div className="d-flex align-items-center flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default ShuttleInquiryBrowseContent;
