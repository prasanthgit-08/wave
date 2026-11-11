import React, { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";

import Bonuses from "./Tabs/Bonuses";
import Default from "./Tabs/Default";
import Driver from "./Tabs/Driver";
import General from "./Tabs/General";
import Nexts from "./Tabs/Nexts";
import Switches from "./Tabs/Switches";
import Users from "./Tabs/Users";
import CompanyService from "../../../../services/CompanyService";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyData, setCurrentTab, setLoading } from "../../../../redux/CompanySlice";
import LoadingIcon from "../../../common/LoadingIcon";

function CompanyContent() {
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.companyReducer.viewDetail);
  const isGeneralTabValid = useSelector((state) => state.companyReducer.isGeneralTabValid);
  const isSwitchesTabValid = useSelector((state) => state.companyReducer.isSwitchesTabValid);
  const isDriverTabValid = useSelector((state) => state.companyReducer.isDriverTabValid);
  const isNextsTabValid = useSelector((state) => state.companyReducer.isNextsTabValid);
  const isBonusesTabValid = useSelector((state) => state.companyReducer.isBonusesTabValid);
  const isDefaultsTabValid = useSelector((state) => state.companyReducer.isDefaultsTabValid);
  const isUsersTabValid = useSelector((state) => state.companyReducer.isUsersTabValid);
  const currentTab = useSelector((state) => state.companyReducer.currentTab);
  const towableBonusProgram = useSelector((state) => state.companyReducer.towableBonusProgram);
  const haltInvoicing = useSelector((state) => state.companyReducer.haltInvoicing);
  const chargeEfee = useSelector((state) => state.companyReducer.chargeEfee);
  const loading = useSelector((state) => state.companyReducer.loading);

  const handleTabSelection = (key) => {
    dispatch(setCurrentTab(key));
  };

  useEffect(() => {
    getCompanyData();
  }, []);

  const getCompanyData = () => {
    dispatch(setLoading(true));
    CompanyService.getCompanyData()
      .then((response) => {
        const data = response.data;
        dispatch(setLoading(false));
        dispatch(setCompanyData(data));
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.log(error);
      });
  };

  return (
    <div className="p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border threeFourthScreenFormContentHeight">
        <Tabs
          defaultActiveKey="general"
          id="uncontrolled-tab-example"
          className="m-b-0"
          onSelect={handleTabSelection}
          activeKey={currentTab}
        >
          <Tab
            tabClassName={!viewDetail ? (isGeneralTabValid ? "color-green" : "color-red") : ""}
            eventKey="general"
            title={"General"}
          >
            <General />
          </Tab>

          <Tab
            tabClassName={
              viewDetail || (!haltInvoicing && !chargeEfee)
                ? ""
                : isSwitchesTabValid
                  ? "color-green"
                  : "color-red"
            }
            eventKey="switches"
            title={"Switches"}
          >
            <Switches />
          </Tab>

          <Tab
            tabClassName={!viewDetail ? (isDriverTabValid ? "color-green" : "color-red") : ""}
            eventKey="driver"
            title={"Driver"}
          >
            <Driver />
          </Tab>

          <Tab
            tabClassName={!viewDetail ? (isNextsTabValid ? "color-green" : "color-red") : ""}
            eventKey="nexts"
            title={"Nexts"}
          >
            <Nexts />
          </Tab>

          <Tab
            tabClassName={
              !viewDetail
                ? !towableBonusProgram
                  ? !isBonusesTabValid
                    ? "color-red"
                    : ""
                  : isBonusesTabValid
                    ? "color-green"
                    : "color-red"
                : ""
            }
            eventKey="bonuses"
            title={"Bonuses"}
          >
            <Bonuses />
          </Tab>

          <Tab
            tabClassName={!viewDetail ? (isDefaultsTabValid ? "color-green" : "color-red") : ""}
            eventKey="defaults"
            title={"Defaults"}
          >
            <Default />
          </Tab>

          <Tab
            tabClassName={!viewDetail ? (isUsersTabValid ? "color-green" : "color-red") : ""}
            eventKey="users"
            title={"Users"}
          >
            <Users />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default CompanyContent;
