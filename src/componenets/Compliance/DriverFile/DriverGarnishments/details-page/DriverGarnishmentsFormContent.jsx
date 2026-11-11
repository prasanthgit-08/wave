import React, { useEffect, useState } from "react";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import General from "./tabs/General";
import Check from "./tabs/Check";
import { Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DriverGarnishmentsService from "../../../../../services/DriverGarnishmentsService";
import {
  setCurrentTab,
  setDuplicateDescription,
  setGarnishmentDataById,
  setSaveLoading,
  setViewDetail,
} from "../../../../../redux/DriverGarnishmentsSlice";
import LoadingIcon from "../../../../common/LoadingIcon";

const DriverGarnishmentsFormContent = () => {
  const { id, driverGarnishmentPK } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changesCancelled = useSelector((state) => state.driverGarnishmentsReducer.changesCancelled);
  const isGeneralTabValid = useSelector((state) => state.driverGarnishmentsReducer.isGeneralTabValid);
  const isCheckTabValid = useSelector((state) => state.driverGarnishmentsReducer.isCheckTabValid);
  const currentTab = useSelector((state) => state.driverGarnishmentsReducer.currentTab);
  const viewDetail = useSelector((state) => state.driverGarnishmentsReducer.viewDetail);
  const saveLoading = useSelector((state) => state.driverGarnishmentsReducer.saveLoading);

  const [loading, setLoading] = useState(false);

  window.addEventListener("popstate", () => {
    dispatch(setDuplicateDescription(false));
  });

  const fetchRecordById = (driverGarnishmentPK) => {
    setLoading(true);
    if (driverGarnishmentPK != null || driverGarnishmentPK !== undefined || driverGarnishmentPK !== "") {
      DriverGarnishmentsService.getGarnishmentById(driverGarnishmentPK)
        .then((response) => {
          const data = response.data;
          dispatch(setViewDetail(true));
          dispatch(setGarnishmentDataById(data));
          setLoading(false);
        })
        .catch((error) => {
          navigate(`/driver-garnishment/${id}`);
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setCurrentTab("general"));
  }, []);

  useEffect(() => {
    if (driverGarnishmentPK) {
      dispatch(setViewDetail(true));
      fetchRecordById(driverGarnishmentPK);
    }
  }, [changesCancelled]);

  useEffect(() => {
    if (driverGarnishmentPK === null || driverGarnishmentPK === undefined || driverGarnishmentPK === "") {
      dispatch(setDuplicateDescription(false));
    }
  }, []);

  const handleTabSelection = (key) => {
    dispatch(setCurrentTab(key));
  };

  return (
    <QuarterScreenWrapper>
      {loading && <LoadingIcon />}
      <FormHeader />
      <div className="p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <Tabs
            defaultActiveKey="general"
            id="uncontrolled-tab-example"
            className="m-b-0"
            onSelect={handleTabSelection}
            activeKey={currentTab}
          >
            <Tab
              tabClassName={!viewDetail ? (isGeneralTabValid ? "color-green" : "color-red") : ""}
              eventKey={"general"}
              title={"General"}
            >
              <General />
            </Tab>
            <Tab
              tabClassName={!viewDetail ? (isCheckTabValid ? "color-green" : "color-red") : ""}
              eventKey={"check"}
              title={"Check"}
            >
              <Check />
            </Tab>
          </Tabs>
        </div>
      </div>
      <FormFooter />
    </QuarterScreenWrapper>
  );
};

export default DriverGarnishmentsFormContent;
