import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import History from "./Tabs/History";
import General from "./Tabs/General";
import DriverComplianceItemsService from "../../../../../services/DriverComplianceItemsService";
import {
  setFormData,
  setHistoryBlockReason,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setViewDetail,
} from "../../../../../redux/DriverComplianceItemsSlice";
const FormContent = ({ check }) => {
  const dispatch = useDispatch();

  window.addEventListener("popstate", () => {
    dispatch(setSearchTerm(""));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setPageNumber(0));
  });

  const { driverId, id } = useParams();
  const [generalTabColor, setGeneralTabColor] = useState("");
  const [historyTabColor, setHistoryTabColor] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const viewDetail = useSelector((state) => state.DriverComplianceItemsReducer.viewDetail);
  const blockFlag = useSelector((state) => state.DriverComplianceItemsReducer.blockFlag);

  const fetchRecord = (id) => {
    setLoading(true);
    DriverComplianceItemsService.getRecord(id)
      .then((res) => {
        dispatch(setFormData(res.data));
        dispatch(setHistoryBlockReason(res.data?.blockReasonHistory));
        dispatch(setViewDetail(true));
        setLoading(false);
      })
      .catch((err) => {
        navigate(`/driver-compliance-items/${driverId}`);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (id) fetchRecord(id);
  }, [id, blockFlag, check]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        {!viewDetail ? (
          <div>
            <div style={{ marginBottom: "40px" }}></div>

            <General />
          </div>
        ) : (
          <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="m-b-2">
            <Tab
              tabClassName={generalTabColor}
              eventKey="general"
              title={t("edit.dealer.page.general.tab.heading.general")}
            >
              <General />
            </Tab>
            <Tab eventKey="history" tabClassName={historyTabColor} title={"History"}>
              <History />
            </Tab>
          </Tabs>
        )}

        {loading && (
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
