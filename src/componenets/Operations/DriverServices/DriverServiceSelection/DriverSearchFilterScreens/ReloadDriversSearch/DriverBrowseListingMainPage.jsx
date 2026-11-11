import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageNumber, setPageNumberOfdriver } from "../../../../../../redux/DriverSearchFilterSlice";
import UnitBrowseListing from "./UnitBrowseListing";
import QuarterScreenTemplate from "../../../../../Templates/QuarterScreenTemplate";
import { PaginationComponent } from "../../../../../common/PaginationComponent";
import { ThreeForthScreen_RecordsPerPage } from "../../../../../../services/constants/applicationConstants";
import ThreeFourthScreenTemplate from "../../../../../Templates/ThreeFourthScreenTemplate";
import styles from "../../../../../../styles/ThreeQuarterScreen.module.css";
import { Col } from "react-bootstrap";
import DriverBrowseLsiting from "./DriverBrowseLsiting";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useParams } from "react-router-dom";

function DriverBrowseListingMainPage() {
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("reloadDriversSearch", "true");
  });

  window.addEventListener("load", () => {
    if (localStorage.getItem("reloadDriversSearch")) {
      localStorage.removeItem("reloadDriversSearch");
      window.location.href = "/reload-drivers-search";
    }
  });
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sortType = useSelector((state) => state.driverSearchFilter.sortType);
  const driverData = useSelector((state) => state.driverSearchFilter.driverData);

  const totalElementsOfDriver = useSelector((state) => state.driverSearchFilter.totalElementsOfDriver);
  const totalPagesOfDriver = useSelector((state) => state.driverSearchFilter.totalPagesOfDriver);
  const pageNumberOfDriver = useSelector((state) => state.driverSearchFilter.pageNumberOfDriver);

  window.addEventListener("popstate", () => {
    navigate(`/reload-drivers-search`);
  });

  const paginationProps = {
    pageNumber: pageNumberOfDriver,
    setPageNumber: setPageNumberOfdriver,
    totalPages: totalPagesOfDriver,
    totalElements: totalElementsOfDriver,
    listingData: driverData,
  };

  return (
    <div className={` ${styles.threeByForthMain} `} style={{ height: "810px", width: "1440px" }}>
      <div
        className={`border border-dark border-2   border-top-0  ${styles.threeByForthMain}`}
        style={{ height: "810px", width: "1440px" }}
      >
        <div className=" col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0 ">
          <Header />

          <div className={`d-flex ${styles.forthScreen01} `}>
            <div className="w-100">
              <DriverBrowseLsiting />
            </div>
            <PaginationComponent
              {...paginationProps}
              recordsPerPage={20}
              firstPage
              lastPage
              singleArrowUp
              singleArrowDown
            />{" "}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default DriverBrowseListingMainPage;
