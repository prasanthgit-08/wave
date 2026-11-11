import React from "react";
import { useSelector } from "react-redux";
import { PaginationComponent } from "../../../../../../common/PaginationComponent";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DriverCheckinHistoryListing from "./DriverCheckinHistoryListing";
import {
  resetClose,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
} from "../../../../../../../redux/DriverCheckinHistorySlice";

function DriverCheckinHistoryContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const driverId = params.driverId;
  const pageNumber = useSelector((state) => state.driverCheckinHistoryReducer.pageNumber);
  const totalPages = useSelector((state) => state.driverCheckinHistoryReducer.totalPages);
  const totalElements = useSelector((state) => state.driverCheckinHistoryReducer.totalElements);
  const driverCheckinHistoryData = useSelector(
    (state) => state.driverCheckinHistoryReducer.driverCheckinHistoryData
  );
  const selectedCheckinNote = useSelector((state) => state.driverCheckinHistoryReducer.selectedCheckinNote);
  const selectedRecordId = useSelector((state) => state.driverCheckinHistoryReducer.selectedRecordId);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: driverCheckinHistoryData,
  };

  const navigateToHome = () => {
    dispatch(setPageNumber(0));
    resetClose();
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    navigate(`/driver-service-selection/${driverId}/form`);
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
          <div className="row " style={{ minHeight: "500px" }}>
            <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
              <div className="d-flex h-100">
                <div className="w-100">
                  <DriverCheckinHistoryListing />
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

      <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2 border">
        <div
          className="d-flex align-items-center flex-wrap"
          style={{ flex: 1, paddingLeft: "0", paddingRight: "0" }}
        >
          <div className="form-group m-b-0 w-100" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <label
              className="col-form-label f-w-600"
              htmlFor="driverCheckinNotes"
              style={{ paddingLeft: "0" }}
            ></label>
            <div
              className="col-sm-12 p-l-0 p-r-0"
              style={{ paddingLeft: "0", paddingRight: "0", width: "100%" }}
            >
              <textarea
                className="form-control"
                id="driverCheckinNotes"
                rows="3"
                value={selectedCheckinNote || ""}
                readOnly

                style={{
                  resize: "vertical",
                  minHeight: "130px",
                  backgroundColor: "#f5f5f5",
                  width: "98%",
                  marginLeft: "12px",
                  marginRight: "5px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverCheckinHistoryContent;
