import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DriverReferralsList from "./DriverReferralsList";
import { useNavigate, useParams } from "react-router-dom";
import { PaginationComponent } from "../../../../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../../../../services/constants/applicationConstants";
import toast from "react-hot-toast";
import { resetDriverReferrals, setPageNumber } from "../../../../../../../redux/DriverReferralsSlice";

function DriverReferralsMainPage() {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.driverReferralsReducer.pageNumber);
  const totalPages = useSelector((state) => state.driverReferralsReducer.totalPages);
  const totalElements = useSelector((state) => state.driverReferralsReducer.totalElements);
  const driverReferralsData = useSelector((state) => state.driverReferralsReducer.driverReferralsData);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: driverReferralsData,
  };

  const navigateToHome = () => {
    navigate(`/driver-service-selection/${driverId}/form`);
    toast.success("Page Closed");
    dispatch(resetDriverReferrals());
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
          <div className="row" style={{ height: "quarterScreenFrmContentHeight" }}>
            <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
              <div className="d-flex h-100">
                <div className="w-100">
                  <DriverReferralsList />
                </div>
                <PaginationComponent
                  {...paginationProps}
                  recordsPerPage={QuarterScreen_RecordsPerPage}
                  firstPage
                  lastPage
                  singleArrowUp
                  singleArrowDown
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="d-flex align-items-center justify-content-end p-t-10 p-b-5 flex-wrap border-top border-dark border-2"
        style={{ height: "47px" }}
      ></div>
    </>
  );
}

export default DriverReferralsMainPage;
