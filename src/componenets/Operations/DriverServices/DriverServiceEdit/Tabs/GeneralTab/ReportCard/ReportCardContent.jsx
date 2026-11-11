import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import GeneralTab from "./Tabs/GeneralTab";
import EquipmentTab from "./Tabs/EquipmentTab";
import ReportCardService from "../../../../../../../services/ReportCardService";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEquipmentList, setFormData } from "../../../../../../../redux/DriverReportCardSlice";

const ReportCardContent = () => {
  const dispatch = useDispatch();

  const { driverId } = useParams();

  const [loading, setLoading] = useState(false);

  const getDriverReportCard = () => {
    setLoading(true);
    ReportCardService.getDriverReportCard(driverId)
      .then(({ data }) => {
        dispatch(setFormData(data));
        dispatch(setEquipmentList(data.equipmentList));
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getDriverReportCard();
  }, []);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Tabs>
              <Tab eventKey={"general"} title={"General"}>
                <GeneralTab />
              </Tab>
              <Tab eventKey={"equipment"} title={"Equipment"}>
                <EquipmentTab />
              </Tab>
            </Tabs>
          </div>
        </div>
        {loading && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportCardContent;
