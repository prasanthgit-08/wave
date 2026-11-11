import React, { useEffect, useState } from "react";
import HalfScreenWrapper from "../../../../../Templates/Screens/HalfScreenWrapper";

import { Tab, Tabs } from "react-bootstrap";
import CommonFooter from "../../../../../common/CommonFooter";
import DOTEditGeneral from "./tabs/DOTEditGeneral";
import DOTEditMaintenance from "./tabs/DOTEditMaintenance";
import DOTEditNotes from "./tabs/DOTEditNotes";
import DOTEditDocuments from "./tabs/DOTEditDocuments";
import Header from "../../../../../common/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  resetBrowseData,
  resetEditDocumentsTab,
  resetEditGeneralTab,
  setEditDotActiveTab,
  setEditMaintenanceTabValid,
  setViewdetail,
} from "../../../../../../redux/Compliance/DriverDOTInspectionSlice";
import DOTViewDocuments from "./tabs/DOTViewDocuments";
import QuarterScreenWrapper from "../../../../../Templates/Screens/QuarterScreenWrapper";
import { useNavigate, useParams } from "react-router-dom";
import DriverDOTInspectionService from "../../../../../../services/Compliance/DriverDOTInspectionService";
import toast from "react-hot-toast";
import LoadingIcon from "../../../../../common/LoadingIcon";
import ModalComponent from "../../../../../common/ModalComponent";

const EditDOTInspectionContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { driverId, dotInspectionPK } = useParams();
  const [maintenanceTabColor, setMaintenanceTabColor] = useState("");
  const [saveFlag, setSaveFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(false);

  const editGeneralTabValid = useSelector((state) => state.driverDOTInspection.editGeneralTabValid);
  const editMaintenanceTabValid = useSelector((state) => state.driverDOTInspection.editMaintenanceTabValid);
  const editDocumentsTabValid = useSelector((state) => state.driverDOTInspection.editDocumentsTabValid);
  const maintenanceViolation = useSelector((state) => state.driverDOTInspection.maintenanceViolation);
  const viewDetail = useSelector((state) => state.driverDOTInspection.viewDetail);
  const editDotActiveTab = useSelector((state) => state.driverDOTInspection.editDotActiveTab);
  const saveFormData = useSelector((state) => state.driverDOTInspection.saveFormData);
  const documentRedisKeys = useSelector((state) => state.driverDOTInspection.documentsTabRedisKeys);
  const [cancelShow, setCancelShow] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData"));
  const userPK = loggedInUser?.userPK;

  const buttons = viewDetail
    ? [
        {
          label: "Edit",
          onClick: () => {
            dispatch(setViewdetail(false));
          },
        },
        {
          label: "Cancel",
          onClick: () => {
            cancelDriverDotInspection();
          },
        },
      ]
    : [
        {
          label: "Save",
          disabled: saveFlag,
          onClick: () => {
            setEmailConfirm(true);
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
    driverDotInspectionPK: dotInspectionPK,
    redisKeys: documentRedisKeys,
  };

  const saveDriverDotInspection = (emailSend) => {
    setIsLoading(true);
    DriverDOTInspectionService.saveDriverDotInspectionDetails(payload)
      .then((res) => {
        if (res.data && res.data.OperationStatus) {
          if (emailSend) {
            sendEmail();
          }
          setIsLoading(false);
          dispatch(resetEditGeneralTab());
          dispatch(resetEditDocumentsTab());
          navigate(`/driver-dot-inspection-browse/${driverId}`);
          toast.success("DotInspection record updated");
        } else {
          toast.error(" Falied to add DotInspection record ");
          dispatch(resetEditGeneralTab());
          dispatch(resetEditDocumentsTab());
        }
      })
      .catch(() => {
        toast.error(" Falied to add DotInspection record ");
        dispatch(resetEditGeneralTab());
        dispatch(resetEditDocumentsTab());
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const sendEmail = async () => {
    try {
      let emailObjectKeyList = setObjectKey(saveFormData.driverPaid, saveFormData.driverFined);
      if (dotInspectionPK) {
        DriverDOTInspectionService.sendDOTEmail(dotInspectionPK, emailObjectKeyList, userPK)
          .then(() => toast.success(`Email sent successfully`))
          .catch((error) => console.error(`Failed to send DOT Email for : ${dotInspectionPK}`, error));
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

  const handleCancelNo = () => setCancelShow(false);
  const handleCancelYes = () => {
    if (dotInspectionPK) {
      setCancelShow(false);
      dispatch(resetEditGeneralTab());
      dispatch(resetEditDocumentsTab());
      dispatch(setViewdetail(true));
      toast.success("Changes Cancelled");
    } else {
      navigate(`/driver-dot-inspection-browse/${driverId}`);
      dispatch(setViewdetail(false));

      toast.success("Changes Cancelled");
    }
  };

  const cancelDriverDotInspection = () => {
    navigate(`/driver-dot-inspection-browse/${driverId}`);
    dispatch(resetEditGeneralTab());
    dispatch(setEditMaintenanceTabValid(false));
    dispatch(resetEditDocumentsTab());
  };

  const onClose = () => {
    dispatch(resetEditGeneralTab());
    dispatch(setEditMaintenanceTabValid(false));
    dispatch(resetEditDocumentsTab());
    dispatch(resetBrowseData());
  };

  // save Validation
  useEffect(() => {
    if (editGeneralTabValid && editDocumentsTabValid && (!maintenanceViolation || editMaintenanceTabValid)) {
      setSaveFlag(false);
    } else {
      setSaveFlag(true);
    }
  }, [editGeneralTabValid, editDocumentsTabValid, maintenanceViolation, editMaintenanceTabValid]);

  useEffect(() => {
    if (maintenanceViolation) {
      if (viewDetail) {
        setMaintenanceTabColor("");
      } else if (editMaintenanceTabValid) {
        setMaintenanceTabColor("color-green");
      } else {
        setMaintenanceTabColor("color-red");
      }
    } else {
      setMaintenanceTabColor("");
    }
  }, [maintenanceViolation, editMaintenanceTabValid, viewDetail]);

  return (
    <QuarterScreenWrapper>
      {isLoading && <LoadingIcon />}
      <Header
        confirmClose={!viewDetail}
        programName="Driver DOT Inspection"
        closeNavigationURL={`/driver-maintenance-add/${driverId}/0`}
        closeConfirmationHandler={onClose}
      />
      <div className="p-2 ">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <Tabs
            activeKey={editDotActiveTab}
            onSelect={(k) => dispatch(setEditDotActiveTab(k))}
            defaultActiveKey="general"
            id="uncontrolled-tab-example"
            className=""
          >
            <Tab
              tabClassName={viewDetail ? "" : editGeneralTabValid ? "color-green" : "color-red"}
              eventKey="general"
              title={"General"}
            >
              <DOTEditGeneral />
            </Tab>
            <Tab eventKey="notes" title={"Notes"}>
              <DOTEditNotes />
            </Tab>
            <Tab
              tabClassName={maintenanceTabColor}
              eventKey="maintenance"
              title={"Maintenance"}
              disabled={!maintenanceViolation}
            >
              <DOTEditMaintenance />
            </Tab>
            {viewDetail ? (
              <Tab eventKey="documents" title={"Documents"}>
                <DOTViewDocuments />
              </Tab>
            ) : (
              <Tab
                tabClassName={viewDetail ? "" : editDocumentsTabValid ? "" : "color-red"}
                eventKey="documents"
                title={"Documents"}
              >
                <DOTEditDocuments />
              </Tab>
            )}
          </Tabs>
        </div>
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

      <ModalComponent
        show={emailConfirm}
        onHide={() => setEmailConfirm(false)}
        title={"Warning!"}
        body={"Do you want to send the report email?"}
        handleYES={() => {
          saveDriverDotInspection(true);
          setEmailConfirm(false);
        }}
        handleNO={() => {
          saveDriverDotInspection(false);
          setEmailConfirm(false);
        }}
      />
    </QuarterScreenWrapper>
  );
};

export default EditDOTInspectionContent;
