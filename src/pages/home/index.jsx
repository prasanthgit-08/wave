import React, { useEffect } from "react";
import horizonLogo from "../../assets/horizontransport.jpg";
import horizon40th from "../../assets/Horizon-40th.png";
import wave20th from "../../assets/Wave-20th.jpg";
import { useNavigate } from "react-router-dom";
import CompanyServices from "../../service/company/company.service";

const HorizonTransport = () => {
  const navigate = useNavigate();
  const companyName = process.env.REACT_APP_COMPANY_NAME;
  const forcePasswordChange = localStorage.getItem("forcePasswordChange");

  // Fetch Company Details after login and set in localStorage

  const getCompanyDetails = () => {
    CompanyServices.getAllCompanyData()
      .then((res) => {
        if (res?.data) {
          const value = res?.data?.find((item) => item.LocalCompany === true);
          const currentCompany = {
            companyPK: value?.CompanyPK,
            name: value?.Name,
            eldDescription: value?.eldDescription,
            localCompany: value?.LocalCompany,
            requirePlantReleases: value?.requirePlantReleases,
            allDriversPayTaxable: value?.AllDriversPayTaxable,
            nextDebitCardDriverNumber: value?.nextDebitCardDriverNumber,
            daysToNextSafety: value?.daysToNextSafety,
            bondFundPercentage: value?.bondFundPercentage,
            bondFund: value?.bondFund,
          };
          localStorage.setItem("currentCompany", JSON.stringify(currentCompany));
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    getCompanyDetails();
  }, []);

  // Navigate to foce password change
  useEffect(() => {
    if (forcePasswordChange == "true") {
      navigate("/auth/force-password-change");
    }
  }, [forcePasswordChange]);

  const renderHomepage = () => {
    switch (companyName) {
      case "Horizon":
        return (
          <img
            src={"/images/Horizon-40th.jpg"}
            alt="horizon transport"
            style={{ height: "auto", width: "35vw" }}
          />
        );
      case "Wave":
        return <img src={"/images/Wave-20th.jpg"} alt="wave" style={{ height: "auto", width: "45vw" }} />;
      default:
        return (
          <img
            src={"/images/Horizon-40th.jpg"}
            alt="horizon transport"
            style={{ height: "auto", width: "35vw" }}
          />
        );
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minWidth: "400px",
        height: "90vh",
      }}
    >
      {renderHomepage()}
    </div>
  );
};

export default HorizonTransport;
