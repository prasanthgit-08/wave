import { parseLocalDate } from "../../../../utils/dateUtils";
import { t } from "i18next";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DriverServicesService from "../../../../services/DriverServicesService";
import EquipmentTab from "./Tabs/EquipmentTab/EquipmentTab";
import General from "./Tabs/GeneralTab/GeneralTab";
import SettingsTab from "./Tabs/SettingsTab/SettingsTab";
import {
  setActiveDriver,
  setActiveKey,
  setDeleasedDriver,
  setDriverPictureId,
} from "../../../../redux/DriverServiceSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingIcon from "../../../common/LoadingIcon";
import { setFromDate } from "../../../../redux/LoadHistorySlice";

function DriverServiceContent() {
  const dispatch = useDispatch();
  const { driverId } = useParams();
  const { activeKey } = useSelector((state) => state.driverServicesSlice);
  const isEquipmentTabValid = useSelector((state) => state.driverServicesSlice.isEquipmentTabValid);

  const [driverData, setDriverData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchDriverDetails = () => {
    setLoading(true);
    DriverServicesService.getDriverDetails(driverId)
      .then((res) => {
        setDriverData(res.data);
        dispatch(setActiveDriver(res.data.active));
        dispatch(setDeleasedDriver(res.data.deleased));
        dispatch(setDriverPictureId(res.data.pictureDocumentBLOBFK));
        dispatch(setFromDate(parseLocalDate(res.data.hireDate)));
      })

      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDriverDetails();
  }, []);
  return (
    <div className="shadow-sm rounded border threeFourthScreenFormContentHeight" /* m-t-10 m-b-10 */>
      {loading && <LoadingIcon />}
      <Tabs
        activeKey={activeKey}
        onSelect={(k) => dispatch(setActiveKey(k))}
        id="uncontrolled-tab-example"
        className="m-b-0"
      >
        <Tab eventKey="general" title={t("edit.dealer.page.general.tab.heading.general")}>
          <General driverData={driverData} disabled />
        </Tab>

        <Tab eventKey="settings" title={t("edit.dealer.page.general.tab.heading.settings")}>
          <SettingsTab driverData={driverData} disabled />
        </Tab>

        <Tab eventKey="equipment" title={"Equipment"} tabClassName={isEquipmentTabValid ? "" : "color-red"}>
          <EquipmentTab />
        </Tab>
      </Tabs>
    </div>
  );
}

export default DriverServiceContent;
