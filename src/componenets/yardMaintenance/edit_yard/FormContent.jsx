import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Bol from "./tabs/Bol";
import General from "./tabs/General";
import Instructions from "./tabs/Instructions";
import Settings from "./tabs/Settings";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../../styles/ThreeQuarterScreen.module.css";
import YardService from "../../../services/YardService";
import {
  setViewDetail,
  setEditYardData,
  setYardReload,
  setYardOutbound,
  setYardLoading,
} from "../../../redux/YardMaintenanceSlice";
const FormContent = () => {
  const params = useParams();
  const { id } = useParams();
  const [generalTabColor, setGeneralTabColor] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewDetail = useSelector((state) => state.yardMaintenanceReducer.viewDetail);
  const isGeneralTabValid = useSelector((state) => state.yardMaintenanceReducer.isGeneralTabValid);
  const isSettingsTabValid = useSelector((state) => state.yardMaintenanceReducer.isSettingsTabValid);
  const isSettingsTabRequired = useSelector((state) => state.yardMaintenanceReducer.isSettingsTabRequired);
  const changesCancelled = useSelector((state) => state.yardMaintenanceReducer.changesCancelled);
  const isSettingColor = useSelector((state) => state.yardMaintenanceReducer.isSettingColor);
  const yardHasPrinter = useSelector((state) => state.yardMaintenanceReducer.yardHasPrinter);
  const yardHasOpener = useSelector((state) => state.yardMaintenanceReducer.yardHasOpener);
  const yardLoading = useSelector((state) => state.yardMaintenanceReducer.yardLoading);
  const fetchRecordById = (id) => {
    dispatch(setYardLoading(true));
    YardService.getYardById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setEditYardData(data));
        dispatch(setViewDetail(true));
        //Clear outbound,reload values
        dispatch(setYardOutbound(data.outbound));
        dispatch(setYardReload(data.reload));
        dispatch(setYardLoading(false));
      })
      .catch((error) => {
        dispatch(setYardLoading(false));
        navigate("/yard-maintenance");
        console.log(error, "error ");
      });
  };

  useEffect(() => {
    if (params.id === undefined) dispatch(setViewDetail(false));
  }, [params.id]);

  useEffect(() => {
    if (id) fetchRecordById(id);
  }, [id, changesCancelled]);

  useEffect(() => {
    if (id === null || viewDetail === undefined || viewDetail === false) {
      if (isGeneralTabValid === true) {
        setGeneralTabColor("color-green");
      } else {
        setGeneralTabColor("color-red");
      }
    } else {
      setGeneralTabColor("");
    }
  }, [isGeneralTabValid, viewDetail]);

  return (
    <div className="p-2">
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <Tabs
          defaultActiveKey="general"
          id="uncontrolled-tab-example"

          className="m-b-2"
        >
          <Tab
            tabClassName={generalTabColor}
            eventKey="general"
            title={t("edit.dealer.page.general.tab.heading.general")}
          >
            <General />
          </Tab>

          <Tab
            tabClassName={
              !viewDetail
                ? isSettingsTabValid
                  ? yardHasPrinter || yardHasOpener
                    ? "color-green"
                    : ""
                  : "color-red"
                : ""
            }
            eventKey="settings"
            title={t("edit.dealer.page.general.tab.heading.settings")}
          >
            <Settings />
          </Tab>

          <Tab eventKey="bol" title={"BOL"}>
            <Bol />
          </Tab>

          <Tab eventKey="instructions" title={"Instructions"}>
            <Instructions />
          </Tab>
        </Tabs>
        {yardLoading && (
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
