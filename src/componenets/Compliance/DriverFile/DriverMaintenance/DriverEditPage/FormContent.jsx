import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import GeneralTab from "./tabs/GeneralTab";
import SettingsTab from "./tabs/SettingsTab";
import ComplianceTab from "./tabs/ComplianceTab";
import DriverFundTab from "./tabs/DriverFundTab";
import NotesTab from "./tabs/NotesTab";
import OtherTab from "./tabs/OtherTab";
import AwardTab from "./tabs/AwardTab";
import DatesTab from "./tabs/DatesTab";
import DriverService from "../../../../../services/DriverService";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setDocumentFile,
  setEditFormData,
  setFileType,
  setIsDriverLoading,
  setViewDetail,
} from "../../../../../redux/DriverMaintenanceSlice";
import { useSelector } from "react-redux";
const FormContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [blobpk, setBlobpk] = useState("");

  const params = useParams();
  const id = params.id;

  const [recordLoaded, setRecordLoaded] = useState(!id);
  const driverAlertClear = useSelector((state) => state.driverMaintenanceReducer.driverAlertClear);
  const driverAlert = useSelector((state) => state.driverMaintenanceReducer.driverAlert);
  const isDriverLoading = useSelector((state) => state.driverMaintenanceReducer.isDriverLoading);
  const isGeneralTabValid = useSelector((state) => state.driverMaintenanceReducer.isGeneralTabValid);
  const isSettingsTabValid = useSelector((state) => state.driverMaintenanceReducer.isSettingsTabValid);
  const viewDetail = useSelector((state) => state.driverMaintenanceReducer.viewDetail);
  const isComplianceTabValid = useSelector((state) => state.driverMaintenanceReducer.isComplianceTabValid);
  const isDriverFundTabValid = useSelector((state) => state.driverMaintenanceReducer.isDriverFundTabValid);
  const isDatesTabValid = useSelector((state) => state.driverMaintenanceReducer.isDatesTabValid);
  const isOthersTabValid = useSelector((state) => state.driverMaintenanceReducer.isOthersTabValid);
  const isAwardTabValid = useSelector((state) => state.driverMaintenanceReducer.isAwardTabValid);
  const saveFormData = useSelector((state) => state.driverMaintenanceReducer.saveFormData);
  const displayFlag = useSelector((state) => state.driverMaintenanceReducer.displayFlag);
  const {
    alertClearUserLoading,
    alertUserLoading,
    checkinLoading,
    checkinUserLoading,
    yesterdayUserLoading,
    primaryLoading,
    regionLoad,
    mentoringLoading,
    recruitingLoading,
    cardLoading,
    holdLoading,
  } = useSelector((state) => state.driverMaintenanceReducer);

  const fetchRecordById = (id) => {
    if (id) {
      dispatch(setIsDriverLoading(true));
      DriverService.getDriverRecordById(id)
        .then((response) => {
          const data = response.data;
          dispatch(setEditFormData(data));

          if (displayFlag) {
            //this is used to set edit page after picture selection
            dispatch(setViewDetail(false));
          } else {
            dispatch(setViewDetail(true));
          }
          setRecordLoaded(true);
          setTimeout(() => {
            dispatch(setIsDriverLoading(false));
          }, 100);
        })
        .catch((error) => {
          console.log(error);
          navigate("/driver-maintenance");
          dispatch(setIsDriverLoading(false));
        });
    }
  };

  useEffect(() => {
    if (id) fetchRecordById(id);
  }, [id]);
  useEffect(() => {
    // clearing driverComplianceFromDriver from the localStorage for driver compliance Item
    localStorage.removeItem("driverComplianceFromDriver");
  }, []);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border " style={{ minHeight: viewDetail ? "641px" : "677px" }}>
        {recordLoaded && (
          <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="m-b-2">
            <Tab
              tabClassName={
                viewDetail || isDriverLoading ? "" : isGeneralTabValid ? "color-green" : "color-red"
              }
              eventKey="general"
              title={"General"}
            >
              <GeneralTab />
            </Tab>
            <Tab
              tabClassName={
                viewDetail || isDriverLoading ? "" : isSettingsTabValid ? "color-green" : "color-red"
              }
              eventKey="settings"
              title={"Settings"}
            >
              <SettingsTab />
            </Tab>
            <Tab
              tabClassName={
                viewDetail || isDriverLoading ? "" : isComplianceTabValid ? "color-green" : "color-red"
              }
              eventKey="compliance"
              title={"Compliance"}
            >
              <ComplianceTab />
            </Tab>
            <Tab
              tabClassName={
                viewDetail || isDriverLoading
                  ? ""
                  : isDriverFundTabValid
                    ? !saveFormData?.bondExempt ||
                      (saveFormData.bondExempt && !id && saveFormData?.prepaidBond) ||
                      saveFormData?.holdPay ||
                      saveFormData.hasDebitCard
                      ? "color-green"
                      : ""
                    : "color-red"
              }
              eventKey="driverfund"
              title={"Driver Funds"}
            >
              <DriverFundTab />
            </Tab>
            <Tab
              tabClassName={
                viewDetail || isDriverLoading ? "" : isDatesTabValid ? "color-green" : "color-red"
              }
              eventKey="dates"
              title={"Dates"}
            >
              <DatesTab />
            </Tab>
            <Tab eventKey="notes" title={"Notes"}>
              <NotesTab />
            </Tab>
            <Tab
              tabClassName={
                viewDetail || isDriverLoading
                  ? ""
                  : isOthersTabValid
                    ? driverAlert || driverAlertClear
                      ? "color-green"
                      : ""
                    : "color-red"
              }
              eventKey="others"
              title={"Other"}
            >
              <OtherTab />
            </Tab>
            <Tab
              eventKey="award"
              title={"Awards"}
              tabClassName={viewDetail || isDriverLoading ? "" : isAwardTabValid ? "" : "color-red"}
            >
              <AwardTab />
            </Tab>
          </Tabs>
        )}

        {isDriverLoading && (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormContent;
