import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import General from "./tabs/General";
import DrugTest from "./tabs/DrugTest";
import AlcoholTest from "./tabs/AlcoholTest";
import Clinic from "./tabs/Clinic";
import { useDispatch, useSelector } from "react-redux";
import DriverDrugTestsService from "../../../../../../services/DriverDrugTestsService";
import {
  setFormData,
  setIsClinicTabValid,
  setIsTabIdentify,
  setOverWritePermission,
  setResultClicked,
  setViewDetail,
} from "../../../../../../redux/DriverDrugTestsSlice";
import { useParams } from "react-router-dom";
import { PermissionKeyGeneratorUtil } from "../../../../../../utils/PermissionKeyGeneratorUtil";
import LoadingIcon from "../../../../../common/LoadingIcon";

const FormEditContent = () => {
  const dispatch = useDispatch();
  const { driverId, id } = useParams();

  const [loading, setLoading] = useState(false);
  const drugLoading = useSelector((state) => state.driverDrugTests.drugLoading);

  const viewDetail = useSelector((state) => state.driverDrugTests.viewDetail);
  const isTabIdentify = useSelector((state) => state.driverDrugTests.isTabIdentify);
  const isGeneralTabValid = useSelector((state) => state.driverDrugTests.isGeneralTabValid);
  const isDrugTabValid = useSelector((state) => state.driverDrugTests.isDrugTabValid);
  const isAlcoholTabValid = useSelector((state) => state.driverDrugTests.isAlcoholTabValid);
  const notify = useSelector((state) => state.driverDrugTests.notify);
  const resultClicked = useSelector((state) => state.driverDrugTests.resultClicked);
  const notTestedValue = useSelector((state) => state.driverDrugTests.notTestedValue);
  const formData = useSelector((state) => state.driverDrugTests.formData);
  const overWritePermission = useSelector((state) => state.driverDrugTests.overWritePermission);
  const isAlcoholCondition = useSelector((state) => state.driverDrugTests.isAlcoholCondition);
  const isDrugCondition = useSelector((state) => state.driverDrugTests.isDrugCondition);
  const isClinicCondition = useSelector((state) => state.driverDrugTests.isClinicCondition);
  const isClinicTabValid = useSelector((state) => state.driverDrugTests.isClinicTabValid);

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const overridePermission = PermissionKeyGeneratorUtil("DRIVERDRUGTEST", "ORPR");

  const fetchRecordById = () => {
    setLoading(true);
    DriverDrugTestsService.getDriverDrugTestsById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setFormData(data));
        dispatch(setViewDetail(true));
        dispatch(setResultClicked(false));
      })
      .catch((error) => {
        console.log("Error ", error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRecordById();
  }, []);

  useEffect(() => {
    dispatch(setIsTabIdentify("general"));
  }, []);

  useEffect(() => {
    if (deniedPermissions) {
      dispatch(setOverWritePermission(!deniedPermissions.includes(overridePermission)));
    }
  }, [deniedPermissions]);

  return (
    <div className="p-2">
      {
        <div className={`shadow-sm rounded border quarterScreenFormContentHeight`}>
          <Tabs
            defaultActiveKey="general"
            activeKey={isTabIdentify}
            onSelect={(k) => {
              dispatch(setIsTabIdentify(k));
            }}
            id="uncontrolled-tab-example"
            className="m-b-2"
          >
            <Tab
              title={"General"}
              eventKey="general"
              tabClassName={
                !resultClicked && (viewDetail || !overWritePermission)
                  ? ""
                  : isGeneralTabValid
                    ? "color-green"
                    : "color-red"
              }
            >
              <General />
            </Tab>
            <Tab
              title={"Drug Test"}
              eventKey="drugTest"
              disabled={notTestedValue || !formData?.drugTest}
              tabClassName={
                overWritePermission && (!viewDetail || resultClicked)
                  ? isDrugCondition
                    ? ""
                    : isDrugTabValid
                      ? "color-green"
                      : "color-red"
                  : ""
              }
            >
              <DrugTest />
            </Tab>

            <Tab
              title={"Alcohol Test"}
              eventKey="alcoholTest"
              disabled={notTestedValue || !formData?.alcoholTest}
              tabClassName={
                overWritePermission && (!viewDetail || resultClicked)
                  ? isAlcoholCondition
                    ? ""
                    : isAlcoholTabValid
                      ? "color-green"
                      : "color-red"
                  : ""
              }
            >
              <AlcoholTest />
            </Tab>
            <Tab
              title={"Clinic"}
              eventKey="clinic"
              tabClassName={
                !viewDetail || resultClicked
                  ? isClinicCondition
                    ? ""
                    : isClinicTabValid
                      ? ""
                      : "color-red"
                  : ""
              }
            >
              <Clinic />
            </Tab>
          </Tabs>
          {loading && <LoadingIcon />}
        </div>
      }
    </div>
  );
};

export default FormEditContent;
