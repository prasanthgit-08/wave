import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { setPageNumber } from "../../../../../../redux/DriverSearchFilterSlice";
import UnitBrowseListing from "./UnitBrowseListing";
import QuarterScreenTemplate from "../../../../../Templates/QuarterScreenTemplate";
import { PaginationComponent } from "../../../../../common/PaginationComponent";
import { ThreeForthScreen_RecordsPerPage } from "../../../../../../services/constants/applicationConstants";
import ThreeFourthScreenTemplate from "../../../../../Templates/ThreeFourthScreenTemplate";
import styles from "../../../../../../styles/ThreeQuarterScreen.module.css";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import LoadingIcon from "../../../../../common/LoadingIcon";

function UnitBrowseListingMainpage() {
  const pageNumber = useSelector((state) => state.driverSearchFilter.pageNumber);
  const selectedCustomerId = useSelector((state) => state.driverSearchFilter.selectedCustomerId);
  const totalElements = useSelector((state) => state.driverSearchFilter.totalElements);
  const sortType = useSelector((state) => state.driverSearchFilter.sortType);
  const unitData = useSelector((state) => state.driverSearchFilter.unitData);
  const pdfLoader = useSelector((state) => state.driverSearchFilter.pdfLoader);

  const totalPages = useSelector((state) => state.driverSearchFilter.totalPages);
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("reloadDriversSearch", "true");
  });
  window.addEventListener("load", () => {
    if (localStorage.getItem("reloadDriversSearch")) {
      localStorage.removeItem("reloadDriversSearch");
      window.location.href = "/reload-drivers-search";
    }
  });
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages: totalPages,
    totalElements: totalElements,
    listingData: unitData,
  };

  return (
    <div
      className={`border border-dark border-2    border-top-0 border-bottom-0${styles.threeByForthMain}`}
      style={{ height: "810px", width: "1440px" }}
    >
      {pdfLoader && <LoadingIcon />}
      <div className=" col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0 ">
        <Header />

        <div className={`d-flex ${styles.forthScreen01} `}>
          <div className="w-100">
            <UnitBrowseListing />
          </div>
          <PaginationComponent
            {...paginationProps}
            recordsPerPage={18}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
          />{" "}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default UnitBrowseListingMainpage;
