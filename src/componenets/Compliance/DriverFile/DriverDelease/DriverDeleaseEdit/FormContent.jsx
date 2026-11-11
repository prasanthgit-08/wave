import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import GeneralTab from "./Tabs/GeneralTab";
import DatesTab from "./Tabs/DatesTab";
import ItemsTabBrowse from "./Tabs/ItemsTabBrowse";
import DriverServicesService from "../../../../../services/DriverServicesService";
import { setDriverData } from "../../../../../redux/DriverDeleaseSlice";
import { setNormalSortFlag, setNormalSortValue } from "../../../../../redux/DeleaseItemsSlice";

const FormContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { driverId, id } = useParams();
  const location = useLocation();

  const isDriverDeleaseLoading = useSelector((state) => state.driverDeleaseReducer.isDriverDeleaseLoading);
  const isGeneralTabValid = useSelector((state) => state.driverDeleaseReducer.isGeneralTabValid);
  const isDatesTabValid = useSelector((state) => state.driverDeleaseReducer.isDatesTabValid);
  const invalidItemDatePKs = useSelector((state) => state.driverDeleaseReducer.invalidItemDatePKs);
  const viewDetail = useSelector((state) => state.driverDeleaseReducer.viewDetail);
  const driverDeleaseData = useSelector((state) => state.driverDeleaseReducer.driverDeleaseData);
  const isStatusChangingFromInactiveToTerminated = useSelector(
    (state) => state.driverDeleaseReducer.isStatusChangingFromInactiveToTerminated
  );
  const isDeleaseProcess = useSelector((state) => state.driverDeleaseRequestsReducer.isDeleaseProcess);
  const status = useSelector((state) => state.driverDeleaseReducer.status);
  const editFormData = useSelector((state) => state.driverDeleaseReducer.editFormData);
  const [voided, setVoided] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [terminated, setTerminated] = useState(false);
  const [inactive, setInactive] = useState(false);
  /******
   * Set Voided,Completed,terminated and inactive
   * *****/
  useEffect(() => {
    if (editFormData !== null && id !== null) {
      setCompleted(editFormData.completed ? editFormData.completed : false);
      setVoided(editFormData.voided ? editFormData.voided : false);
      setTerminated(editFormData.terminated ? editFormData.terminated : false);
      setInactive(editFormData.inactive ? editFormData.inactive : false);
    }
  }, [editFormData]);
  return (
    <div className="p-2">
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <Tabs defaultActiveKey="general" id="uncontrolled-tab-example" className="m-b-2">
          <Tab
            eventKey="general"
            title="General"
            tabClassName={
              isDriverDeleaseLoading || viewDetail ? "" : isGeneralTabValid ? "color-green" : "color-red"
            }
          >
            <GeneralTab />
          </Tab>
          <Tab
            eventKey="dates"
            title="Dates"
            tabClassName={
              driverDeleaseData
                ? viewDetail ||
                  isDeleaseProcess ||
                  (id && inactive && completed) ||
                  (!viewDetail &&
                    driverDeleaseData.notified === false &&
                    driverDeleaseData.notifiedDate === "" &&
                    driverDeleaseData.completed === false &&
                    driverDeleaseData.completedDate === "" &&
                    driverDeleaseData.voided === false &&
                    driverDeleaseData.voidedDate === "" &&
                    driverDeleaseData.voidedReason === "" &&
                    driverDeleaseData.terminationLetter === false &&
                    driverDeleaseData.terminationLetterDate === "")
                  ? ""
                  : (driverDeleaseData.notified && !driverDeleaseData.notifiedDate) ||
                      (driverDeleaseData.completed && !driverDeleaseData.completedDate) ||
                      (driverDeleaseData.terminationLetter && !driverDeleaseData.terminationLetterDate) ||
                      (driverDeleaseData.voided &&
                        (!driverDeleaseData.voidedDate || !driverDeleaseData.voidedReason))
                    ? "color-red"
                    : "color-green"
                : ""
            }
            disabled={(id && inactive && completed) || isStatusChangingFromInactiveToTerminated}
          >
            <DatesTab />
          </Tab>
          <Tab
            eventKey="items"
            title="Items"
            tabClassName={!viewDetail && invalidItemDatePKs?.length > 0 ? "color-red" : ""}
            disabled={(id && inactive && completed) || isStatusChangingFromInactiveToTerminated}
          >
            <ItemsTabBrowse />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default FormContent;
