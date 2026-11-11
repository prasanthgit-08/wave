import React, { useEffect, useState } from "react";
import HalfScreenWrapper from "../../../../../Templates/Screens/HalfScreenWrapper";
import { Tab, Tabs } from "react-bootstrap";
import CommonFooter from "../../../../../common/CommonFooter";
import Header from "../../../../../common/Header";
import DOTNewGeneral from "./tabs/DOTNewGeneral";
import DOTNewNotes from "./tabs/DOTNewNotes";
import DOTNewMaintenance from "./tabs/DOTNewMaintenance";
import DOTNewDocuments from "./tabs/DOTNewDocuments";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import DriverDOTInspectionService from "../../../../../../services/Compliance/DriverDOTInspectionService";
import {
  resetNewDocumentsTab,
  resetNewGeneralTab,
  setNewDotActiveTab,
  setNewMaintenanceTabValid,
  setUsCity,
  setStateCode,
  resetBrowseData,
} from "../../../../../../redux/Compliance/DriverDOTInspectionSlice";
import QuarterScreenWrapper from "../../../../../Templates/Screens/QuarterScreenWrapper";
import LoadingIcon from "../../../../../common/LoadingIcon";
import ModalComponent from "../../../../../common/ModalComponent";

const NewDOTInspectionContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { driverId, dotInspectionPK } = useParams();
  const [activeTab, setActiveTab] = useState("general");
  const [viewDetail, setViewDetail] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [maintenanceTabColor, setMaintenanceTabColor] = useState("");
  const [saveFlag, setSaveFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelShow, setCancelShow] = useState(false);

  const NewMaintenanceTabValid = useSelector((state) => state.driverDOTInspection.newMaintenanceTabValid);
  const NewDocumentsTabValid = useSelector((state) => state.driverDOTInspection.newDocumentsTabValid);
  const NewGeneraltabValid = useSelector((state) => state.driverDOTInspection.newGeneralTabValid);
  const maintenanceViolation = useSelector((state) => state.driverDOTInspection.maintenanceViolation);
  const saveFormData = useSelector((state) => state.driverDOTInspection.saveFormData);
  const documentRedisKeys = useSelector((state) => state.driverDOTInspection.documentsTabRedisKeys);
  const NewDotActiveTab = useSelector((state) => state.driverDOTInspection.NewDotActiveTab);
  const newLoading = useSelector((state) => state.driverDOTInspection.newLoading);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;

  const buttons = [
    {
      label: "Save",
      disabled: saveFlag,
      onClick: () => {
        saveDriverDotInspection();
      },
    },

    {
      label: "Cancel",
      onClick: () => {
        setCancelShow(true);
      },
    },
  ];

  const payload = {
    ...saveFormData,
    driverDotInspectionPK: 0,
    redisKeys: documentRedisKeys,
  };

  const saveDriverDotInspection = () => {
    setIsLoading(true);
    DriverDOTInspectionService.saveDriverDotInspectionDetails(payload)
      .then((res) => {
        if (res.data && res.data.OperationStatus) {
          sendEmail(res.data.DriverDOTInspectionPK);
          setIsLoading(false);
          navigate(`/driver-dot-inspection-browse/${driverId}`);
          toast.success("DotInspection record created");
          dispatch(resetNewGeneralTab());
          dispatch(setUsCity(""));
          dispatch(setStateCode(""));
          dispatch(setNewMaintenanceTabValid(false));
          dispatch(resetNewDocumentsTab());
        } else {
          toast.error(" Falied to add DotInspection record ");
          dispatch(resetNewGeneralTab());
          dispatch(setUsCity(""));
          dispatch(setStateCode(""));
          dispatch(setNewMaintenanceTabValid(false));
          dispatch(resetNewDocumentsTab());
        }
      })
      .catch(() => {
        toast.error(" Falied to add DotInspection record ");
        dispatch(resetNewGeneralTab());
        dispatch(setUsCity(""));
        dispatch(setStateCode(""));
        dispatch(setNewMaintenanceTabValid(false));
        dispatch(resetNewDocumentsTab());
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /**
   * Sends Email after save
   * @param {*} driverDOTInspectionPK
   */
  const sendEmail = async (driverDOTInspectionPK) => {
    try {
      let emailObjectKeyList = setObjectKey(saveFormData.driverPaid, saveFormData.driverFined);
      if (driverDOTInspectionPK) {
        DriverDOTInspectionService.sendDOTEmail(driverDOTInspectionPK, emailObjectKeyList, userPK)
          .then(() => toast.success(`Email sent successfully`))
          .catch((error) => console.error(`Failed to send DOT Email for : ${driverDOTInspectionPK}`, error));
      } else {
        toast.error("Failed to send email.");
      }
    } catch (error) {
      toast.error("An error occurred while send email");
    }
  };

  const setObjectKey = (driverPaid, driverFined) => {
    if (driverFined) return ["HRZ:DOT:BAD", "HRZ:DOT:BADSTF"];
    if (driverPaid) return ["HRZ:DOT:GOOD"];
    return ["HRZ:DOT:NEUTRAL"];
  };

  const cancelDriverDotInspection = () => {
    navigate(`/driver-dot-inspection-browse/${driverId}`);
    dispatch(resetNewGeneralTab());
    dispatch(setNewMaintenanceTabValid(false));
    dispatch(resetNewDocumentsTab());
    toast.success("Changes Cancelled");
  };

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    cancelDriverDotInspection();
  };

  const onClose = () => {
    dispatch(resetNewGeneralTab());
    dispatch(setNewMaintenanceTabValid(false));
    dispatch(resetNewDocumentsTab());
    dispatch(resetBrowseData());
  };

  // save Validation
  useEffect(() => {
    if (NewGeneraltabValid && NewDocumentsTabValid && (!maintenanceViolation || NewMaintenanceTabValid)) {
      setSaveFlag(false);
    } else {
      setSaveFlag(true);
    }
  }, [NewGeneraltabValid, NewDocumentsTabValid, maintenanceViolation, NewMaintenanceTabValid]);

  useEffect(() => {
    if (maintenanceViolation) {
      if (NewMaintenanceTabValid) {
        setMaintenanceTabColor("color-green");
      } else {
        setMaintenanceTabColor("color-red");
      }
    } else {
      setMaintenanceTabColor("");
    }
  }, [maintenanceViolation, NewMaintenanceTabValid]);

  return (
    <QuarterScreenWrapper>
      <Header
        confirmClose
        programName="Driver DOT Inspection"
        closeNavigationURL={`/driver-maintenance-add/${driverId}/0`}
        closeConfirmationHandler={onClose}
      />
      <div className="p-2 ">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <Tabs
            activeKey={NewDotActiveTab}
            onSelect={(k) => dispatch(setNewDotActiveTab(k))}
            defaultActiveKey="general"
            id="uncontrolled-tab-example"
            className=""
          >
            <Tab
              tabClassName={newLoading ? "" : NewGeneraltabValid ? "color-green" : "color-red"}
              eventKey="general"
              title={"General"}
            >
              <DOTNewGeneral />
            </Tab>
            <Tab eventKey="notes" title={"Notes"}>
              <DOTNewNotes />
            </Tab>
            <Tab
              tabClassName={maintenanceTabColor}
              eventKey="maintenance"
              title={"Maintenance"}
              disabled={!maintenanceViolation}
            >
              <DOTNewMaintenance />
            </Tab>
            <Tab
              tabClassName={NewDocumentsTabValid ? "" : "color-red"}
              eventKey="documents"
              title={"Documents"}
            >
              <DOTNewDocuments />
            </Tab>
          </Tabs>
        </div>
        {isLoading && <LoadingIcon />}
      </div>
      <CommonFooter buttons={buttons} />
      {/* Cancel Confirmation Modal */}
      <ModalComponent
        show={cancelShow}
        onHide={handleCancelNo}
        title={"Cancel Driver DOT Inspection Changes"}
        body={"Please confirm you want to cancel your changes"}
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
    </QuarterScreenWrapper>
  );
};

export default NewDOTInspectionContent;
