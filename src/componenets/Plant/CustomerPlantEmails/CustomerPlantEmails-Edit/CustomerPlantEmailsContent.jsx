import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import PlantEmailService from "../../../../services/PlantEmailService";
import BolTab from "./Tabs/BolTab";
import DelaysTab from "./Tabs/DelaysTab";
import DetailsTab from "./Tabs/DetailsTab";
import DispatchTab from "./Tabs/DispatchTab";
import InvoiceTab from "./Tabs/InvoiceTab";
import ReportsTab from "./Tabs/ReportsTab";
import {
  setEditFormData,
  setReportsAsCSV,
  setReportsAsExcel,
  setReportsAsPDF,
  setReportsAsText,
  setRequirePlantRelease,
  setViewDetail,
} from "../../../../redux/CustomerPlantEmailSlice";

const CustomerPlantEmailsContent = () => {
  const [load, setLoad] = useState(false);
  const [companyLoad, setCompanyLoad] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const emailPK = params.emailPk;
  const [reportTabColor, setReportTabColor] = useState("");
  const [detailTabColor, setDetailTabColor] = useState("");
  const [dispatchTabColor, setDispatchTabColor] = useState("");
  const isReportsTabValid = useSelector((state) => state.customerPlantEmailReducer.isReportsTabValid);
  const isDetailsTabValid = useSelector((state) => state.customerPlantEmailReducer.isDetailsTabValid);
  const isDispatchTabValid = useSelector((state) => state.customerPlantEmailReducer.isDispatchTabValid);
  const viewDetail = useSelector((state) => state.customerPlantEmailReducer.viewDetail);
  const changesCancelled = useSelector((state) => state.customerPlantEmailReducer.changesCancelled);

  const fetchRecordById = (emailPK) => {
    setLoad(true);
    PlantEmailService.getPlantEmailById(emailPK)
      .then((response) => {
        const { data } = response;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
        dispatch(setReportsAsCSV(data.reportsAsCSV));
        dispatch(setReportsAsExcel(data.reportsAsExcel));
        dispatch(setReportsAsText(data.reportsAsText));
        dispatch(setReportsAsPDF(data.reportsAsPDF));
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
        navigate("/customer-plant-emails/" + params.customerId + "/" + params.id + "/" + params.pageNumber);
      });
  };

  const requirePlantReleaseCheck = () => {
    setCompanyLoad(true);
    PlantEmailService.getCompanyRequirePlantRelease()
      .then((response) => {
        const { data } = response;
        dispatch(setRequirePlantRelease(data));
        setCompanyLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setCompanyLoad(false);
      });
  };

  useEffect(() => {
    if (emailPK) {
      fetchRecordById(emailPK);
    }
  }, [emailPK, changesCancelled]);

  useEffect(() => {
    requirePlantReleaseCheck();
  }, []);

  useEffect(() => {
    if (emailPK === null || viewDetail === undefined || viewDetail === false) {
      if (isDetailsTabValid === true) {
        setDetailTabColor("color-green");
      } else {
        setDetailTabColor("color-red");
      }
    } else {
      setDetailTabColor("");
    }
  }, [isDetailsTabValid, viewDetail]);

  useEffect(() => {
    if (emailPK === null || viewDetail === undefined || viewDetail === false) {
      if (isReportsTabValid === true) {
        setReportTabColor("");
      } else {
        setReportTabColor("color-red");
      }
    } else {
      setReportTabColor("");
    }
  }, [isReportsTabValid, viewDetail]);

  useEffect(() => {
    if (emailPK === "" || viewDetail === undefined || viewDetail === false) {
      if (isDispatchTabValid === true) {
        setDispatchTabColor("");
      } else {
        setDispatchTabColor("color-red");
      }
    } else {
      setDispatchTabColor("");
    }
  }, [isDispatchTabValid, viewDetail]);
  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Tabs defaultActiveKey="details" id="uncontrolled-tab-example" className="m-b-2">
              <Tab tabClassName={detailTabColor} eventKey="details" title={"Details"}>
                <DetailsTab />
              </Tab>

              <Tab eventKey="reports" title={"Reports"} tabClassName={reportTabColor}>
                <ReportsTab />
              </Tab>

              <Tab eventKey="bols" title={"BOL's"}>
                <BolTab />
              </Tab>

              <Tab eventKey="dispatch" tabClassName={dispatchTabColor} title={"Dispatch"}>
                <DispatchTab />
              </Tab>
              <Tab eventKey="delay" title={"Delays"}>
                <DelaysTab />
              </Tab>
              <Tab eventKey="invoice" title={"Invoice"}>
                <InvoiceTab />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      {(companyLoad || load) && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPlantEmailsContent;
