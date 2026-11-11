import React, { useEffect, useState } from "react";
import Header from "../../../../common/Header";
import CommonFooter from "../../../../common/CommonFooter";
import { Tab, Tabs } from "react-bootstrap";
import General from "./Tabs/General";
import Claim from "./Tabs/Claim";
import DamageComments from "./Tabs/DamageComments";
import Resources from "./Tabs/Resources";
import Documents from "./Tabs/Documents";
import DamageInstructions from "./Tabs/DamageInstructions";
import Emails from "./Tabs/Emails";
import {
  resetClaimChanges,
  resetDamageBrowsePage,
  resetEditEmailChanges,
  resetGeneralChanges,
  setClaimsVO,
  setDamageDetailFlag,
  setDelayDamageDocumentFiles,
  setDocumentsTabRedisKeys,
  setEditAddFlag,
  setEditEmailList,
  setEditSelectedIndex,
  setEditView,
  setRepairPlantFlag,
  setViewDamageActiveTab,
} from "../../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EditMasterExpressShuttle from "../../../../Units/EditMasterExpress/EditMasterExpressShuttle/EditMasterExpressShuttle";
import { setShowDamageShuttle } from "../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import DelayDamageService from "../../../../../services/DispatchDelay/DelayProcessing/DelayDamageService";
import { resetChanges, setDamageSafetyFlag } from "../../../../../redux/DelayDamageSafetySlice";
import BreakdownProcessingService from "../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";
import { setReserveBondFundFK } from "../../../../../redux/DispatchDelay/DelayProcessing/DelayUnitCheckRequestSlice";

const ViewDamagePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewDamageActiveTab = useSelector((state) => state.damageReducer.viewDamageActiveTab);

  const { damageFK } = useParams();
  const damageCompanyName = localStorage.getItem("damageCompanyName");
  const damageUnitFK = localStorage.getItem("damageUnitFK");
  const damageDriverFK = localStorage.getItem("damageDriverFK");
  const delayedUnitFK = localStorage.getItem("delayedUnitFK");
  const showDamageShuttle = useSelector((state) => state.editMasterExpressTabsReducer.showDamageShuttle);
  const [unitPK, setUnitPK] = useState("");
  const [loader, setLoader] = useState(false);
  const [delayDamageData, setDelayDamageData] = useState([]);
  const [isShuttleButtonDisabled, setIsShuttleButtonDisabled] = useState(false);
  const [isSafetyButtonDisabled, setIsSafetyButtonDisabled] = useState(false);
  const [plantList, setPlantList] = useState([]);

  {
    /* Edit Button */
  }

  /********Used for getting the repair Plant Status****/
  const fetchRepairPlantStatusByName = (string) => {
    BreakdownProcessingService.geActiveRepairPlantForAutoComplete(string, damageCompanyName, damageUnitFK)
      .then((response) => {
        const data = response?.data;
        const plantEnabled = data[1].PlantEnabled;
        const listingData = data?.filter((item) => item.Type !== "Pagination" && item.Type !== "plantEnabled");
        const plantList = (listingData || []).map((plant) => ({
          ...plant,
          name: plant?.name?.trim() || "",
        }));
        if (plantEnabled) {
          dispatch(setRepairPlantFlag(plantEnabled));
        }
        setPlantList(plantList);
      })
      .catch((err) => {});
  };
  const resetClaimsVO = {
    responsiblePartyName: "",
    responsiblePartyAddress1: "",
    responsiblePartyAddress2: "",
    responsiblePartyCity: "",
    responsiblePartyStateCode: "",
    responsiblePartyPostCode: "",
    responsiblePartyPhone: "",
    responsiblePartyFax: "",
    responsiblePartyEmail: "",
    responsiblePartyContact: "",
    responsiblePartyCanadian: 0,
    insuranceCompanyName: "",
    insuranceCompanyAddress1: "",
    insuranceCompanyAddress2: "",
    insuranceCompanyCity: "",
    insuranceCompanyStateCode: "",
    insuranceCompanyPostCode: "",
    insuranceCompanyPhone: "",
    insuranceCompanyFax: "",
    insuranceCompanyEmail: "",
    insuranceCompanyContact: "",
    insuranceCompanyCanadian: 0,
  };

  const handleEdit = () => {
    navigate("/damage-processing/edit-damage/" + Number(damageFK));
    /********Used for getting the repair Plant Status****/
    fetchRepairPlantStatusByName();
    //clear edit damge states
    dispatch(setDamageDetailFlag(true));
    dispatch(setEditEmailList([]));
    dispatch(resetEditEmailChanges());
    dispatch(setEditView(false));
    dispatch(setEditSelectedIndex(null));
    dispatch(setEditAddFlag(false));
    dispatch(setDelayDamageDocumentFiles({ actionType: "clear" }));
    dispatch(setDocumentsTabRedisKeys([]));
    dispatch(resetGeneralChanges());
    dispatch(resetClaimChanges());
    dispatch(setRepairPlantFlag(""));
    dispatch(setClaimsVO(resetClaimsVO));
  };

  {
    /* Cancel Button */
  }
  const handleCancel = () => {
    navigate(
      "/damage-browse/" +
        damageCompanyName +
        "/" +
        Number(damageUnitFK) +
        "/" +
        Number(damageDriverFK) +
        "/" +
        Number(delayedUnitFK)
    );
    dispatch(setViewDamageActiveTab("general"));
  };

  // Set the initial active tab to 'general' when the component mounts
  useEffect(() => {
    dispatch(setViewDamageActiveTab("general"));
  }, []);

  const buttons = [
    {
      label: "Shuttle",
      onClick: () => {
        handleShuttleOnClick();
      },
      disabled: isShuttleButtonDisabled,
    },

    { label: "Safety", onClick: () => handleSafetyOnClick(), disabled: isSafetyButtonDisabled },

    {
      label: "Checks",
      onClick: () => {
        handleCheckOnClick();
      },
    },
    { label: "Edit", onClick: handleEdit },
    { label: "Cancel", onClick: handleCancel },
  ];

  /*********Used for Delay Damage Shuttle**********/

  const handleShuttleOnClick = () => {
    dispatch(setShowDamageShuttle(true));
  };

  useEffect(() => {
    setLoader(true);
    DelayDamageService.getDelayDamageInformation(damageFK)
      .then((response) => {
        const data = response?.data?.delayUnitDamageDetails[0];
        setDelayDamageData(data);
        setUnitPK(data?.unitfk);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  }, [damageFK]);

  //used disable shuttle button
  useEffect(() => {
    if (delayDamageData) {
      const damageNotRepaired =
        delayDamageData?.Repaired === false && delayDamageData?.FurtherRepairsRequired === false;

      if (
        !delayDamageData?.SisterUnitFK &&
        delayDamageData?.PickupCustomerPlantFK &&
        (delayDamageData?.InYard || delayDamageData?.AtPickup) &&
        damageNotRepaired &&
        !delayDamageData?.partialtrip
      ) {
        setIsShuttleButtonDisabled(false);
      } else {
        setIsShuttleButtonDisabled(true);
      }
    }
  }, [delayDamageData]);

  /*********Used for Delay Damage Safety**********/
  //disable safety button
  useEffect(() => {
    if (
      delayDamageData?.DriverFK &&
      delayDamageData.Status?.toUpperCase() === "C" &&
      (delayDamageData.DriverAtFault || delayDamageData.DriverResponcible)
    ) {
      setIsSafetyButtonDisabled(false);
    } else {
      setIsSafetyButtonDisabled(true);
    }
  }, [delayDamageData]);

  const handleSafetyOnClick = () => {
    dispatch(resetChanges());
    dispatch(setDamageSafetyFlag(true));
    navigate("/damage-processing-safety/" + damageFK);
  };

  /*********Used for Delay Damage Checks**********/
  const handleCheckOnClick = () => {
    navigate(`/delay-unit-check-request/${delayDamageData?.DriverFK}/${damageFK}`);
  };

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header
          programName="Dispatch Delays Damages"
          closeHandler={() => {
            dispatch(setViewDamageActiveTab("general"));
            dispatch(resetDamageBrowsePage());
            dispatch(setReserveBondFundFK(null));
          }}
          closeNavigationURL={`/delay-processing/delayed-details/${damageCompanyName}/${Number(
            damageUnitFK
          )}/${Number(damageDriverFK)}/${Number(delayedUnitFK)}`}
        />
        <div className="p-2">
          <div className="shadow-sm rounded border threeFourthScreenFormContentHeight">
            <Tabs
              activeKey={viewDamageActiveTab}
              onSelect={(key) => dispatch(setViewDamageActiveTab(key))}
              id="uncontrolled-tab-example"
              className="m-b-2"
            >
              <Tab eventKey="general" title={"General"}>
                <General />
              </Tab>
              <Tab eventKey="claim" title={"Claim"}>
                <Claim />
              </Tab>
              <Tab eventKey="emails" title={"Emails"}>
                <Emails />
              </Tab>
              <Tab eventKey="damageComments" title={"Damage Comments"}>
                <DamageComments />
              </Tab>
              <Tab eventKey="damageInstructions" title={"Damage Instructions"}>
                <DamageInstructions />
              </Tab>
              <Tab eventKey="resources" title={"Resources"}>
                <Resources />
              </Tab>
              <Tab eventKey="documents" title={"Documents"}>
                <Documents />
              </Tab>
            </Tabs>
          </div>
        </div>
        <CommonFooter buttons={buttons} />
        <EditMasterExpressShuttle
          show={showDamageShuttle}
          onHide={() => dispatch(setShowDamageShuttle(false))}
          unitPK={unitPK}
        />
        {loader && (
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

export default ViewDamagePage;
